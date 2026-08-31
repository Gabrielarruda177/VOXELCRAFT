# CONTEXTO GLOBAL DO PROJETO: VOXELCRAFT 3D (v0.8.0 — Preparação para a 1.0)

Este documento é a referência técnica, de arquitetura e de design central do **VoxelCraft 3D**. Ele foi elaborado para que qualquer inteligência artificial, agente ou desenvolvedor humano possa se orientar imediatamente, compreender o código-fonte, respeitar os padrões estabelecidos, entender a visão macro do jogo e continuar o desenvolvimento com máxima solidez.

> [!IMPORTANT]
> **Filosofia de Desenvolvimento & O Ciclo da Vida do Jogo**:
> O VoxelCraft opera sobre uma visão macro interconectada onde **toda nova adição deve se integrar harmonicamente às outras partes do ecossistema**.
> Nenhuma funcionalidade existe isolada: upgrades, matérias-primas e ferramentas seguem uma cadeia lógica de causa e efeito (*bloco bruto $\rightarrow$ refinamento $\rightarrow$ ferramentas $\rightarrow$ novas capacidades $\rightarrow$ sobrevivência e combate*).
> **Regra de Ouro**: A cada nova funcionalidade, refatoração ou melhoria concluída, este documento `CONTEXTO.md` **deve ser rigorosamente atualizado** com as novas estruturas, mecânicas implementadas e sugestões para os próximos passos. Pense antes de aplicar, elabore antes de mexer, nunca quebre o que já está funcionando!

---

## 1. Visão Geral do Projeto & Cadeia de Progressão Expandida

O **VoxelCraft** é um jogo sandbox voxel 3D no estilo Minecraft autêntico, desenvolvido para rodar com **60 FPS constantes**, estética visual pixel-art premium e zero assets externos pesados diretamente no navegador web.

### 🌳 O Ciclo Autêntico de Progressão (*Progression Loop*):
```
[Tronco de Carvalho] (Minerado com mão)
        ↓ (Crafting 2x2 ou 3x3)
[Tábuas de Madeira] ──→ [Gravetos] & [Bancada de Trabalho 3x3] & [Baú de 27 Slots]
        ↓
[Picareta & Enxada de Madeira] ──→ Arar [Terra Arada] & Minera [Pedregulho / Pedra]
        ↓
[Fornalha 3x3] (8 Pedregulhos) + [Ferramentas de Pedra] ──→ Minera [Minério de Ferro] & [Carvão]
        ↓
[Fundição na Fornalha] (Minério de Ferro + Carvão/Madeira)
        ↓
[Barra de Ferro (Lingote)] & [Bife Assado] & [Pão Dourado de Trigo]
        ↓
[Era do Ferro & Combate Avançado]: 
  - Picareta de Ferro + Espada de Ferro + Enxada de Ferro
  - Armadura Completa (+15 Pontos de Defesa / Redução de Dano)
  - Escudo Tático na Mão Secundária com Bloqueio de 100%
  - Arco de Caça (`BOW`) disparando Flechas (`ARROW`) balísticas na primeira pessoa!
        ↓
[Automação, Redstone & Detonações]:
  - Minério de Redstone ($Y \le 16$) $\rightarrow$ Fios condutores, Tochas lógicas, Alavancas e Placas de Pressão.
  - Portas de Madeira e Ferro automáticas por circuitos.
  - Detonação remota de blocos de **TNT** para mineração com crateras esféricas!
        ↓
[Era do Diamante, Nether & Encantamentos Arcanos]:
  - Mineração profunda ($Y \le 12$) $\rightarrow$ Diamantes puros.
  - Armadura Suprema de Diamante (+20 Pontos de Defesa = 80% Mitigação de Dano).
  - Mesa de Encantamentos com Livro Místico 3D flutuante e feitiços arcanos.
```

---

## 2. Estrutura de Diretórios e Módulos

```
VOXELCRAFT/
├── client/
│   ├── index.html                 # Layout HTML, menu inicial premium v0.8.0, HUD, modais CSS
│   └── src/
│       ├── main.js                # Bootstrap e loop central do jogo (conecta mundo, IA, fornalha, clima e saves)
│       ├── engine/
│       │   ├── camera.js          # Câmera FPS, Pointer Lock, 3ª Pessoa (F4), sensibilidade e FOV
│       │   ├── input.js           # Gerenciador de eventos de teclado e mouse
│       │   ├── interaction.js     # Quebra progressiva, combate com espadas/arcos, escudo, cultivo, baús e TNT
│       │   ├── loop.js            # Game Loop baseado em requestAnimationFrame (60 FPS)
│       │   ├── raycast.js         # Raycaster DDA através da grade voxel
│       │   ├── saveManager.js     # Persistência automática no LocalStorage com migração de saves
│       │   ├── soundFx.js         # Sintetizador procedural Web Audio API (espadas, arco, fusível, passos, etc.)
│       │   ├── redstoneEngine.js  # Motor de Redstone com propagação de energia de 0 a 15 níveis
│       │   └── enchantingSystem.js# Cálculo de XP, níveis e feitiços arcanos
│       ├── entities/
│       │   ├── player.js          # Física AABB, Fome, Saturação, Exaustão, Vida, Dano e Voo
│       │   ├── playerModel.js     # Modelo 3D em 3ª pessoa com armaduras dinâmicas
│       │   ├── hand.js            # Braço 3D em 1ª pessoa, empunhadura e animações de ataque
│       │   ├── mobManager.js      # IA: Zumbis (Skins de terror com costelas expostas), Esqueletos, Aranhas, Creepers e Porcos
│       │   └── dropManager.js     # Entidades de drops 3D flutuantes com magnetismo ao jogador
│       ├── rendering/
│       │   ├── sceneSetup.js      # Criação de Renderer, Scene, Luzes direcionais/ambientais e Fog
│       │   ├── blockPreview.js    # Modelos 3D de blocos, espadas, picaretas, tochas e comidas segurados
│       │   ├── dynamicLighting.js # Iluminação dinâmica da tocha na mão com chama animada
│       │   ├── particles.js       # Sistema de partículas 3D (mineração, impacto, chamas e combate)
│       │   └── textures/
│       │       ├── textureGenerator.js # Gerador procedural 16x16 de blocos e itens
│       │       ├── textureAtlas.js     # Atlas de texturas 4x16 (64 slots) e coordenadas UVs
│       │       └── mobTextures.js      # Skins HD pixel-art de mobs e monstros
│       ├── ui/
│       │   ├── uiManager.js       # Autoridade central de estados (Game State, modais e Pointer Lock)
│       │   ├── titleScreen.js     # Gerenciador da tela inicial v0.8.0, modais de controles e pausa
│       │   ├── hud.js             # Overlay de FPS, Coordenadas XYZ, Bioma, Relógio ☀️/🌙 e Voo
│       │   ├── health.js          # HUD Pixel-Art autêntica: 10 Armaduras, 10 Corações, 10 Pernis de Fome, XP
│       │   ├── tooltip.js         # Sistema Universal de Tooltips Contextuais flutuantes
│       │   ├── hotbar.js          # Barra rápida inferior chanfrada em pedra com destaque ativo
│       │   ├── inventory.js       # Inventário completo (27 storage + 9 hotbar), 4 slots de armadura e 2x2 crafting
│       │   ├── chest.js           # GUI interativa do Baú de 27 Slots com persistência no mundo
│       │   ├── crafting.js        # Bancada 3x3, Catálogo de Receitas e Livro de Receitas (?)
│       │   ├── furnace.js         # GUI e lógica da Fornalha (combustível, fundição de ferro, assar carnes)
│       │   ├── enchantingModal.js # Interface da Mesa de Encantamentos com Livro Místico 3D
│       │   └── blockIcon.js       # Gerador raster 16x16 pixel-art de alta definição para todos os itens
│       └── world/
│           ├── blockTypes.js      # Dicionário de blocos, durezas, drops, dados de armadura, dano e nutrição
│           ├── chunk.js           # Mesh voxel otimizado com culling, tochas 3D corrigidas e vegetação cruzada
│           └── worldManager.js    # Geração de terreno, biomas, cavernas 3D, dungeons, spawner e Nether
```

---

## 3. Principais Sistemas e Mecânicas da v0.8.0

### 🛡 1. HUD Pixel-Art Integrada & Fisiologia do Jogador
- **Barra de Armadura (Topo Esquerdo)**: 10 peitorais pixel-art que preenchem em cinza claro com base na defesa real equipada (até 20 pontos = 80% mitigação de dano) e escuro quando vazio.
- **Barra de Vida (Base Esquerda)**: 10 corações vermelhos pixel-art com contorno escuro e brilho especular (cheios, meios e vazios).
- **Barra de Fome (Direita)**: 10 pernis de carne assada que tremem em fome crítica ($\le 3$ pernis). Ações de corrida e pulo consomem exaustão calórica.
- **Nível & XP**: Nível numérico central verde neon ("14") posicionado diretamente sobre a barra segmentada de 18 notches.
- **Cura & Inanição**: Regeneração acelerada quando $Fome \ge 18$; dano por fome quando $Fome = 0$.

### 💬 2. Sistema Universal de Tooltips Contextuais (`tooltip.js`)
- Exibição de informações flutuantes no hover de qualquer slot em todos os menus (Hotbar, Inventário, Baús, Fornalha, Bancada e Encantamento).
- Detalha Nome, Categoria, Dano de Ataque, Velocidade, Pontos de Proteção, Redução Percentual, Nutrição de Alimentos e Dicas de Teclado.

### 🕯 3. Tochas Vivas & Iluminação Inteligente (60 FPS)
- **Orientação no Chão Corrigida**: Cabo de madeira assentado na base ($y0=0.0$) e chama no topo ($y1=0.65$).
- **Chama Animada (*Flicker*)**: Variação suave de intensidade luminosa e oscilação procedural sem sobrecarga de GPU.
- **Micro-partículas de Brasas**: Partículas quentes subindo da chama.

### 🧟 4. Mobs com Skins de Terror HD Pixel-Art & Animações
- **Zumbi Aterrorizante**: Costelas e esterno expostos, olhos amarelos incandescentes em órbitas ensanguentadas, roupas rasgadas e animação de ataque descendente com os braços.
- **Creeper**: Camuflagem em mosaico de 5 tons de verde, inflação visual e piscar em branco antes de explodir o terreno voxel.
- **Esqueleto Arqueiro**: Crânio fendido, visada balística e postura de arco armado.
- **Aranha Noturna**: 8 olhos vermelhos e animação de caminhada em onda de 8 patas.
- **Hit Flash (`Flash Red`)**: Mobs atingidos piscam em vermelho vivo por $0.22s$ com recuo físico (*knockback*).

---

## 4. Próximos Passos & Rumo à Versão 1.0

1. **Biomas e Clima Expansivo**: Neve acumulada em biomas glaciais, tempestades e trovões volumétricos.
2. **Dimensão do Fim (The End) & Boss Dragon**: Acesso via portal do fim para a batalha final da versão 1.0.
3. **Sons Ambiente Subterrâneos**: Ecos e gotas de água em cavernas profundas.
