-- ============================================================================
-- VoxelCraft — Esquema do banco de dados
-- MySQL 8.4+ (Laragon)  ·  utf8mb4  ·  InnoDB
--
-- O mundo é gerado proceduralmente e de forma determinística, então NUNCA
-- gravamos os chunks inteiros: gravamos apenas o *diff* (tabela block_edits).
-- Um chunk são 16x64x16 = 16.384 voxels = 32 KB entre `blocks` e `fluid`;
-- um jogador que cavou 5.000 blocos passaria de 150 MB se gravássemos tudo.
--
-- InnoDB + utf8mb4 em todas as tabelas: nomes de jogador com acentos e emoji
-- funcionam, e os endpoints de save podem usar transações de verdade.
-- ============================================================================

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `voxelcraft`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `voxelcraft`;

-- As tabelas se referenciam entre si, então desligamos a checagem enquanto
-- derrubamos as antigas (a ordem dos DROP abaixo respeita as dependências, mas
-- isso mantém o script reexecutável mesmo depois de uma falha no meio).
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `save_log`;
DROP TABLE IF EXISTS `user_settings`;
DROP TABLE IF EXISTS `containers`;
DROP TABLE IF EXISTS `block_edits`;
DROP TABLE IF EXISTS `armor_slots`;
DROP TABLE IF EXISTS `inventory_slots`;
DROP TABLE IF EXISTS `players`;
DROP TABLE IF EXISTS `worlds`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ── Usuários ───────────────────────────────────────────────────────────────
-- A senha nunca é gravada em texto puro: guardamos sal + hash scrypt.
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username`      VARCHAR(32)     NOT NULL,
  `username_ci`   VARCHAR(32)     NOT NULL COMMENT 'minúsculas, para login sem diferenciar maiúsculas',
  `password_hash` VARCHAR(255)    NOT NULL COMMENT 'scrypt$N$r$p$salt$hash em base64url',
  `created_at`    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_at` TIMESTAMP       NULL     DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_username_ci` (`username_ci`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Sessões ────────────────────────────────────────────────────────────────
-- Guardamos apenas o SHA-256 do token. Um dump do banco não permite forjar
-- sessões, porque o valor guardado não é o valor que o cliente envia.
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `token_hash`  CHAR(64)        NOT NULL COMMENT 'sha256 do token, hex',
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at`  TIMESTAMP       NOT NULL,
  `last_seen_at` TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`token_hash`),
  KEY `ix_sessions_user` (`user_id`),
  KEY `ix_sessions_expiry` (`expires_at`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Mundos ─────────────────────────────────────────────────────────────────
-- `worldgen_version` é o contrato entre o save e o gerador procedural. Se a
-- geração de terreno mudar, os diffs antigos deixam de fazer sentido (um bloco
-- editado que agora nasceria como pedra viraria um buraco), então o servidor
-- recusa a carga e sinaliza que o mundo precisa ser regerado.
DROP TABLE IF EXISTS `worlds`;
CREATE TABLE `worlds` (
  `id`               BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `owner_id`         BIGINT UNSIGNED  NOT NULL,
  `name`             VARCHAR(64)      NOT NULL DEFAULT 'Meu Mundo',
  `worldgen_version` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  `time_of_day`      DOUBLE           NOT NULL DEFAULT 0.20 COMMENT '0..1, como dayNightCycle.js',
  `weather`          VARCHAR(16)      NOT NULL DEFAULT 'sunny',
  `last_dimension`   VARCHAR(16)      NOT NULL DEFAULT 'overworld',
  `revision`         INT UNSIGNED     NOT NULL DEFAULT 0 COMMENT 'incrementado a cada save',
  `created_at`       TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_worlds_owner` (`owner_id`, `updated_at`),
  CONSTRAINT `fk_worlds_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Estado do jogador por mundo ────────────────────────────────────────────
-- Primária composta porque um servidor pode ter vários jogadores no mesmo
-- mundo; no jogo single-player atual, o dono é o único jogador.
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players` (
  `world_id`    BIGINT UNSIGNED NOT NULL,
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `x`           DOUBLE          NOT NULL DEFAULT 0.5,
  `y`           DOUBLE          NOT NULL DEFAULT 64.0,
  `z`           DOUBLE          NOT NULL DEFAULT 0.5,
  `yaw`         DOUBLE          NOT NULL DEFAULT 0.0,
  `pitch`       DOUBLE          NOT NULL DEFAULT 0.0,
  `health`      DOUBLE          NOT NULL DEFAULT 20.0,
  `max_health`  DOUBLE          NOT NULL DEFAULT 20.0,
  `hunger`      DOUBLE          NOT NULL DEFAULT 20.0,
  `xp`          DOUBLE          NOT NULL DEFAULT 0.0,
  `level`       INT             NOT NULL DEFAULT 1,
  `is_flying`   TINYINT(1)      NOT NULL DEFAULT 0,
  `camera_mode` TINYINT         NOT NULL DEFAULT 0,
  `updated_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`world_id`, `user_id`),
  CONSTRAINT `fk_players_world` FOREIGN KEY (`world_id`) REFERENCES `worlds` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_players_user`  FOREIGN KEY (`user_id`)  REFERENCES `users`  (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Inventário ─────────────────────────────────────────────────────────────
-- O item canônico do jogo é { type, count } (inventory.js:38), então isso
-- basta: não criamos colunas para o que o jogo ainda não tem (durabilidade).
-- `slot_index` cobre 0..35 (hotbar 0-8, mochila 9-35).
DROP TABLE IF EXISTS `inventory_slots`;
CREATE TABLE `inventory_slots` (
  `world_id`   BIGINT UNSIGNED  NOT NULL,
  `user_id`    BIGINT UNSIGNED  NOT NULL,
  `slot_index` TINYINT UNSIGNED NOT NULL,
  `item_type`  SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'BlockType; 0 = vazio (AIR)',
  `item_count` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`world_id`, `user_id`, `slot_index`),
  CONSTRAINT `fk_inv_world` FOREIGN KEY (`world_id`) REFERENCES `worlds` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_inv_user`  FOREIGN KEY (`user_id`)  REFERENCES `users`  (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- As 4 peças de armadura usam o mesmo formato { type, count }, mas com um
-- identificador de slot próprio, então ficam numa tabela separada e explícita.
DROP TABLE IF EXISTS `armor_slots`;
CREATE TABLE `armor_slots` (
  `world_id`   BIGINT UNSIGNED  NOT NULL,
  `user_id`    BIGINT UNSIGNED  NOT NULL,
  `slot_index` TINYINT UNSIGNED NOT NULL COMMENT '0 capacete, 1 peitoral, 2 calça, 3 botas',
  `item_type`  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `item_count` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`world_id`, `user_id`, `slot_index`),
  CONSTRAINT `fk_armor_world` FOREIGN KEY (`world_id`) REFERENCES `worlds` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_armor_user`  FOREIGN KEY (`user_id`)  REFERENCES `users`  (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Diff de blocos (o coração da persistência do mundo) ────────────────────
-- Guardamos só o que mudou em relação ao gerador procedural.
--
-- `fluid_level` é persistido junto do tipo porque é obrigatório: uma célula
-- continua sendo BlockType.WATER quando o nível muda de 0 (fonte) para 4
-- (fluxo). Um diff só por tipo perderia a superfície inteira de todo oceano.
DROP TABLE IF EXISTS `block_edits`;
CREATE TABLE `block_edits` (
  `world_id`    BIGINT UNSIGNED  NOT NULL,
  `dimension`   VARCHAR(16)      NOT NULL DEFAULT 'overworld',
  `x`           INT              NOT NULL,
  `y`           SMALLINT         NOT NULL,
  `z`           INT              NOT NULL,
  `block_type`  SMALLINT UNSIGNED NOT NULL,
  `fluid_level` TINYINT UNSIGNED  NOT NULL DEFAULT 0 COMMENT '0 fonte, 1..7 fluxo, 15 estático',
  `updated_at`  TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`world_id`, `dimension`, `x`, `y`, `z`),
  -- A primária já cobre "quais edits deste chunk?", mas um índice por chunk
  -- acelera o carregamento de mundo grande sem custo relevante de escrita.
  KEY `ix_block_edits_chunk` (`world_id`, `dimension`, `x`, `z`),
  CONSTRAINT `fk_block_edits_world` FOREIGN KEY (`world_id`) REFERENCES `worlds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Baús e fornalhas ───────────────────────────────────────────────────────
-- O estado vai como JSON em vez de colunas normalizadas: são contêineres cuja
-- forma muda quando o jogo ganha um campo, e o acesso é sempre pela
-- coordenada exata (a primária), então índices extras não comprariam nada.
DROP TABLE IF EXISTS `containers`;
CREATE TABLE `containers` (
  `world_id`   BIGINT UNSIGNED NOT NULL,
  `dimension`  VARCHAR(16)     NOT NULL DEFAULT 'overworld',
  `kind`       ENUM('chest','furnace') NOT NULL,
  `x`          INT             NOT NULL,
  `y`          SMALLINT        NOT NULL,
  `z`          INT             NOT NULL,
  `payload`    JSON            NOT NULL,
  `updated_at` TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`world_id`, `dimension`, `kind`, `x`, `y`, `z`),
  CONSTRAINT `fk_containers_world` FOREIGN KEY (`world_id`) REFERENCES `worlds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Predefinições do jogador ───────────────────────────────────────────────
-- As Configurações (Settings em titleScreen.js) nunca foram persistidas, e
-- três dos quatro sliders não tinham consumidor nenhum.
DROP TABLE IF EXISTS `user_settings`;
CREATE TABLE `user_settings` (
  `user_id`           BIGINT UNSIGNED  NOT NULL,
  `render_distance`   TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `fov`               SMALLINT UNSIGNED NOT NULL DEFAULT 75,
  `mouse_sensitivity` DECIMAL(4,2)     NOT NULL DEFAULT 1.00,
  `music_volume`      TINYINT UNSIGNED NOT NULL DEFAULT 80,
  `updated_at`        TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_settings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Histórico de saves (diagnóstico e recuperação) ─────────────────────────
DROP TABLE IF EXISTS `save_log`;
CREATE TABLE `save_log` (
  `id`           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `world_id`     BIGINT UNSIGNED NOT NULL,
  `user_id`      BIGINT UNSIGNED NOT NULL,
  `revision`     INT UNSIGNED    NOT NULL,
  `blocks_saved` INT UNSIGNED    NOT NULL DEFAULT 0,
  `duration_ms`  INT UNSIGNED    NOT NULL DEFAULT 0,
  `created_at`   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_save_log_world` (`world_id`, `created_at`),
  CONSTRAINT `fk_save_log_world` FOREIGN KEY (`world_id`) REFERENCES `worlds` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_save_log_user`  FOREIGN KEY (`user_id`)  REFERENCES `users`  (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
