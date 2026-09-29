# CONTEXTO GLOBAL DO PROJETO: VOXELCRAFT 3D (v0.9.0 — Arquitetura de Referência & Rumo à 1.0)

Este documento é a referência técnica, enciclopédica, arquitetural e de design central do **VoxelCraft 3D**. Ele foi elaborado para que qualquer inteligência artificial, agente ou desenvolvedor humano possa se orientar imediatamente, compreender o código-fonte, respeitar os padrões estabelecidos, entender a visão macro do ecossistema e evoluir o projeto com máxima solidez.

> [!IMPORTANT]
> **Filosofia de Desenvolvimento & O Ciclo da Vida do Jogo**:
> O VoxelCraft opera sobre uma visão sistêmica interconectada onde **toda nova adição deve se integrar harmonicamente às outras partes do ecossistema**.
> Nenhuma funcionalidade existe isolada: matérias-primas, ferramentas, entidades e mecânicas seguem uma cadeia lógica de causa e efeito (*bloco bruto $\rightarrow$ refinamento $\rightarrow$ ferramentas $\rightarrow$ novas capacidades $\rightarrow$ sobrevivência, automação e combate*).
> **Regra de Ouro**: A cada nova funcionalidade, refatoração ou melhoria concluída, este documento `CONTEXTO.md` **deve ser rigorosamente atualizado** com as novas estruturas, mecânicas implementadas e especificações de parâmetros. Pense antes de aplicar, elabore antes de mexer, nunca quebre o que já está funcionando!

---

## 1. Visão Geral do Projeto & Cadeia de Progressão Expandida

O **VoxelCraft** é um jogo sandbox voxel 3D no estilo Minecraft autêntico, desenvolvido para rodar com **60 FPS constantes**, estética visual pixel-art premium e zero dependências de assets externos pesados diretamente no navegador web (sintetizador de áudio procedural via Web Audio API e atlas de texturas procedurais via Canvas 2D/WebGL).

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
  - **Balde Vazio** (3 Barras de Ferro) $\rightarrow$ enche na água ou lava e verte fontes infinitas
  - Armadura Completa (+15 Pontos de Defesa / Redução de Dano)
  - Escudo Tático na Mão Secundária com Bloqueio de 100%
  - Arco de Caça (`BOW`) disparando Flechas (`ARROW`) balísticas na primeira pessoa!
        ↓
[Automação, Redstone & Detonações]:
  - Minério de Redstone ($Y \le 16$) $\rightarrow$ Fios condutores (0-15 níveis), Tochas lógicas, Alavancas e Placas de Pressão.
  - Portas de Madeira e Ferro automáticas por circuitos.
  - Detonação remota de blocos de **TNT** para mineração com crateras esféricas!
        ↓
[Era do Diamante, Nether & Encantamentos Arcanos]:
  - Mineração profunda ($Y \le 12$) $\rightarrow$ Diamantes puros & Obsidiana (Picareta de Diamante).
  - Armadura Suprema de Diamante (+20 Pontos de Defesa = 80% Mitigação de Dano).
  - Portal do Nether em Obsidiana ($4 \times 5$) aceso com Isqueiro (`Flint & Steel`) $\rightarrow$ Dimensão Netherrack, Glowstone, Areia das Almas e Quartzo.
  - Mesa de Encantamentos cercada por Estantes de Livros com Livro Místico 3D flutuante e feitiços arcanos (`Sharpness`, `Protection`, `Efficiency`, `Fire Aspect`, `Unbreaking`).
        ↓
[Sistemas Ambientais de Fluidos & Cavernas (v0.9.0)]:
  - Rios, Lagos e Mares de Lava com **fluxo contínuo agendado** (níveis 0→7) e decaimento por distância.
  - Água e Lava vertem **Obsidiana** (fonte) ou **Pedregulho** (fluxo) ao se encontrarem.
  - Correntes **empurram** o jogador e os mobs; a lava queima, afunda e proíbe o salto.
  - **Névoa subaquática** densa, hora de afogar ($6\,\text{s}$) e ambiente cavernoso com ecos e gotas procedurais.
        ↓
[Rumo ao The End & Batalha Final (v1.0)]:
  - Olhos de Ender $\rightarrow$ Localização de Stronghold $\rightarrow$ Portal do Fim $\rightarrow$ Dragão Ender.
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
        │       │   ├── interaction.js     # Quebra progressiva, combate com espadas/arcos, baldes, cultivo, baús e TNT
        │       │   ├── loop.js            # Game Loop (60 FPS renderização + atualização desacoplada)
        │       │   ├── raycast.js         # Raycaster DDA através da grade voxel (com detecção opcional de fluidos)
        │       │   ├── saveManager.js     # Persistência automática no LocalStorage com migração de saves
        │       │   ├── soundFx.js         # Sintetizador procedural Web Audio API (espadas, arco, fusível, passos, fluidos, cavernas)
        │       │   ├── fluidEngine.js     # Motor de fluidos: tiques agendados, gravidade, propagação e reações água/lava
        │       │   ├── redstoneEngine.js  # Motor de Redstone com propagação BFS de energia (0 a 15 níveis)
        │       │   └── enchantingSystem.js# Cálculo de XP, níveis e feitiços arcanos

│       ├── entities/
        │       │   ├── player.js          # Física AABB, Fome, Saturação, Exaustão, Vida, Dano, Voo e física de fluidos

│       │   ├── playerModel.js     # Modelo 3D em 3ª pessoa com armaduras dinâmicas
│       │   ├── hand.js            # Braço 3D em 1ª pessoa, empunhadura e animações de ataque
        │       │   ├── mobManager.js      # IA: Zumbis, Esqueletos, Aranhas, Creepers e Porcos (com queima em lava e empuxo de fluidos)

│       │   └── dropManager.js     # Entidades de drops 3D flutuantes com magnetismo ao jogador
│       ├── rendering/
│       │   ├── sceneSetup.js      # Criação de Renderer, Scene, Luzes direcionais/ambientais e Fog
│       │   ├── blockPreview.js    # Modelos 3D de blocos, espadas, picaretas, tochas e comidas segurados
│       │   ├── dynamicLighting.js # Iluminação dinâmica da tocha na mão com chama animada
        │       │   ├── particles.js       # Sistema de partículas 3D (mineração, impacto, chamas, combate e respingos de fluído)

│       │   └── textures/
│       │       ├── textureGenerator.js # Gerador procedural 16x16 de blocos e itens
│       │       ├── textureAtlas.js     # Atlas de texturas 4x16 (64 slots) e coordenadas UVs
│       │       └── mobTextures.js      # Skins HD pixel-art de mobs e monstros
│       ├── ui/
│       │   ├── uiManager.js       # Autoridade central de estados (Game State, modais e Pointer Lock)
│       │   ├── titleScreen.js     # Gerenciador da tela inicial, modais de controles e pausa
│       │   ├── hud.js             # Overlay de FPS, Coordenadas XYZ, Bioma, Relógio ☀️/🌙 e Voo
│       │   ├── health.js          # HUD Pixel-Art autêntica: 10 Armaduras, 10 Corações, 10 Pernis de Fome, XP
│       │   ├── tooltip.js         # Sistema Universal de Tooltips Contextuais flutuantes
│       │   ├── hotbar.js          # Barra rápida inferior chanfrada em pedra com destaque ativo
│       │   ├── inventory.js       # Inventário completo (27 storage + 9 hotbar), 4 slots de armadura e 2x2 crafting
│       │   ├── chest.js           # GUI interativa do Baú de 27 Slots com persistência no mundo
│       │   ├── crafting.js        # Bancada 3x3, Catálogo de Receitas e Livro de Receitas (?)
│       │   ├── furnace.js         # GUI e lógica da Fornalha (combustível, fundição de ferro, assar carnes)
│       │   ├── enchantingModal.js # Interface da Mesa de Encantamentos com Livro Místico 3D
        │       │   ├── cursorManager.js   # Cursor flutuante, divisão de pilhas e regras de empilhamento por item
        │       │   └── blockIcon.js       # Gerador raster 16x16 pixel-art de alta definição para todos os itens
        │       └── world/
        │           ├── blockTypes.js      # Blocos, durezas, drops, armaduras, dano, nutrição e metadados de fluído
        │           ├── chunk.js           # Mesh voxel com culling, tochas 3D, vegetação e malhas de fluído por nível
        │           ├── dayNightCycle.js   # Ciclo de 24h com sol/lua, paleta de céu, névoa e modo submerso
        │           └── worldManager.js    # Biomas, cavernas 3D, dungeons, Nether, remesh e API de fluidos

```

---

## 3. Matriz Técnica de Blocos, Ferramentas, Armaduras e Itens

### ⛏️ 1. Dureza de Blocos (*Hardness*) e Velocidade de Mineração

| Bloco | Dureza (*Hardness*) | Ferramenta Adequada | Drop Padrão | Drop com Ferramenta Inadequada |
| :--- | :--- | :--- | :--- | :--- |
| **Grama / Terra / Areia / Neve** | $0.55$ | Pá / Mão | Terra / Areia / Neve | Sim |
| **Madeira / Tábuas / Baú / Bancada** | $1.40$ | Machado / Mão | O próprio bloco | Sim |
| **Pedra / Pedregulho / Fornalha** | $2.50$ | Picareta (Qualquer) | Pedregulho / Fornalha | Nenhum (Drop $0$) |
| **Minério de Ferro** | $3.50$ | Picareta (Pedra+) | Minério de Ferro | Nenhum (Drop $0$) |
| **Minério de Redstone** | $3.50$ | Picareta (Ferro+) | $4\sim5\times$ Pó de Redstone | Nenhum (Drop $0$) |
| **Minério de Diamante** | $4.50$ | Picareta (Ferro+) | Gema de Diamante | Nenhum (Drop $0$) |
| **Obsidiana** | $9.00$ | Picareta de Diamante | Obsidiana | Nenhum (Drop $0$) |
| **Rocha do Nether (Netherrack)** | $0.80$ | Picareta (Qualquer) | Rocha do Nether | Sim |
| **Glowstone** | $0.50$ | Picareta / Mão | Glowstone | Sim |
| **Folhas** | $0.15$ | Espada / Mão | Chance ($35\%$) de Folha / Maçã | Sim |
| **Trigo Maduro (Estágio 3)** | $0.15$ | Qualquer / Mão | $1\times$ Trigo $+ 1\sim3\times$ Sementes | Sim |

---

### ⚔️ 2. Armas e Ferramentas (Dano e Multiplicadores)

| Item | Dano de Ataque Base | Multiplicador de Mineração |
| :--- | :--- | :--- |
| **Mão Vazia** | $1$ ponto ($0.5$ coração) | $1.0\times$ |
| **Espada de Madeira** | $4$ pontos ($2.0$ corações) | $6.0\times$ (Folhas/Teias) |
| **Espada de Pedra** | $5$ pontos ($2.5$ corações) | $6.0\times$ (Folhas/Teias) |
| **Espada de Ferro** | $6$ pontos ($3.0$ corações) | $6.0\times$ (Folhas/Teias) |
| **Espada de Diamante** | $8$ pontos ($4.0$ corações) | $8.5\times$ (Folhas/Teias) |
| **Arco e Flecha (`Bow`)** | $6$ pontos ($3.0$ corações) | — (Projétil balístico) |
| **Picareta de Madeira** | $2$ pontos | $2.6\times$ (Pedra) |
| **Picareta de Pedra** | $3$ pontos | $4.2\times$ (Pedra/Ferro) |
| **Picareta de Ferro** | $4$ pontos | $6.5\times$ (Pedra/Ferro/Redstone/Diamante) |
| **Picareta de Diamante** | $5$ pontos | $9.5\times$ (Todos os minérios + Obsidiana) |

---

### 🛡️ 3. Sistema de Armadura e Mitigação de Dano

O cálculo de mitigação de dano segue a regra clássica onde cada ponto de armadura equivale a $4\%$ de redução de dano físico recebido:
$$\text{Redução Percentual} = \text{Pontos de Defesa} \times 4\% \quad (\text{Máximo de } 20 \text{ pontos} = 80\% \text{ redução})$$

| Peça de Armadura | Defesa (Ferro) | Defesa (Diamante) | Slot no Jogador |
| :--- | :--- | :--- | :--- |
| **Capacete** | $+2$ pontos ($8\%$) | $+3$ pontos ($12\%$) | Cabeça (Slot 0) |
| **Peitoral** | $+6$ pontos ($24\%$) | $+8$ pontos ($32\%$) | Tronco (Slot 1) |
| **Calças** | $+5$ pontos ($20\%$) | $+6$ pontos ($24\%$) | Pernas (Slot 2) |
| **Botas** | $+2$ pontos ($8\%$) | $+3$ pontos ($12\%$) | Pés (Slot 3) |
| **Conjunto Completo** | **$+15$ pontos ($60\%$ Redução)** | **$+20$ pontos ($80\%$ Redução)** | 4 Slots |

---

### 🍖 4. Alimentos, Nutrição e Saturação

| Alimento | Restauração de Fome | Corações Equivalentes | Efeito Especial |
| :--- | :--- | :--- | :--- |
| **Carne Podre (`Rotten Flesh`)** | $1$ ponto | $0.5$ coração | Risco de fome rápida |
| **Carneiro Cru (`Mutton`)** | $2$ pontos | $1.0$ coração | Alimento básico |
| **Costela de Porco Crua (`Porkchop`)** | $3$ pontos | $1.5$ corações | Alimento cru |
| **Pão Dourado (`Bread`)** | $5$ pontos | $2.5$ corações | Fácil produção via plantação de trigo |
| **Carneiro Assado (`Cooked Mutton`)** | $6$ pontos | $3.0$ corações | Cozido na fornalha |
| **Bife de Porco Assado (`Cooked Porkchop`)** | $8$ pontos | $4.0$ corações | Alta saturação |
| **Maçã Dourada Encantada (`Golden Apple`)** | $10$ pontos | $5.0$ corações | Regeneração Instantânea + Saturação Total |

---

## 4. Arquitetura dos Subsistemas

### 🌊 4. Motor de Fluidos Dinâmicos (`fluidEngine.js`) — *v0.9.0*

O sistema de fluídos é o subsistema mais exigente em desempenho do jogo. Ele roda sobre um **modelo de níveis de 8 bits** armazenado em um array paralelo por chunk (`chunk.fluid`), com malhas separadas para água e lava, para que a água tenha shader próprio sem afetar a lava.

#### Modelo de Níveis e Altura Renderizada

| Nível | Semântica | Altura Renderizada | Comportamento |
| :--- | :--- | :--- | :--- |
| `0` (`FLUID_SOURCE_LEVEL`) | **Fonte** (balde, acordada do mar) | $\tfrac{7}{8} \approx 0.875$ | Escoa infinitamente, enche os lados e cai para baixo |
| `1 \sim 7` (`FLUID_MAX_FLOW_LEVEL`) | **Fluxo** | $1 - \tfrac{n+1}{8}$ (mínimo $\tfrac{1}{9}$) | Decai 1 nível por bloco; o nível 7 não se espalha |
| `15` (`FLUID_STATIC`) | **Estático procedural** (oceanos, mares de lava) | $\tfrac{7}{8}$ | **Nunca é agendado**; renderiza e interage, mas só acorda como fonte quando um vizinho vira ar |

> A altura mínima de $\tfrac{1}{9}$ garante que o nível 7 continue visível — faces de altura zero produziriam geometria degenerada.

#### Regras de Simulação
- **Atraso por tique**: Água $0.25\,\text{s}$ e Lava $1.50\,\text{s}$ por tique (a lava é preguiçosa e deliberadamente cara).
- **Orçamento por frame**: máximo de **96 tiques** e **2 remeshes** por frame, com fila deduplicada (`Map` com chave `x,y,z`; o tempo mais cedo sempre vence).
- **Justiça da fila**: a varredura é limitada a **1536 entradas por frame** e separada do orçamento de tiques. Como cada mudança de bloco acorda até 6 vizinhos, um pico de mineração entulha a fila de no-ops; eles são descartados de graça, e só o trabalho real consome os 96 tiques. Sem isso, rajadas de água drenando podiam atrasar uma fonte de lava por vários segundos.
- **Prioridade do trabalho novo**: com a fila cheia, despeja-se a entrada **mais distante no futuro**, nunca a que acabou de ser solicitada. Um balde despejado pelo jogador sempre flui, mesmo no meio de um mundo minerado.
- **Identidade da célula manda no agendamento**: a deduplicação é por coordenada, mas um tique pendente pertence ao fluído que *estava* lá. Se a célula trocou de fluído (água drenou, lava foi despejada por cima), o tempo pendente é **descartado e recalculado** com o atraso do fluído novo, e não herdado. Sem isso a lava nova herdava o tique de $0.25\,\text{s}$ da água e se espalhava seis vezes mais rápido do que deveria.
- **Auto-cura de tiques**: se um tique é invalidado porque a célula trocou de identidade, ele é reagendado para o fluído atual em vez de ser descartado. Nenhuma célula pode ficar presa para sempre sem tique.
- **Consumo antes do tique**: a entrada é removida da fila *antes* de ser executada, para que um reagendamento feito durante o próprio tique sobreviva em vez de ser apagado pela limpeza do final do frame.
- **Alcance lateral**: $7$ blocos, com suporte vertical quando dois níveis iguais se encostam (a coluna fica suspensa como no vanilla).
- **Cantos**: fluxo descendente preenche diagonais para não deixar frestas.
- **Retração**: um bloco que perdeu o apoio e não tem saída agenda sua própria remoção (nível $n+1$ até virar ar).
- **Reação água/lava**: Lava de **fonte** $\rightarrow$ **Obsidiana**; Lava de **fluxo** $\rightarrow$ **Pedregulho**. Ambas consomem a célula de lava.
- **Substituição**: apenas ar e blocos não sólidos e transparentes (plantas, tochas, fios, portas) são substituíveis por fluído.

#### Despertar de Fluídos Inertes (Oceanos)
```
Bloco adjacente vira AIR  ──→  fluido estático vizinho vira FONTE (nível 0)  ──→  agenda tique
```
Cavar um buraco no mar, portanto, cria um vazamento real e localizado, sem inundar o mapa inteiro.

#### Baldes (Itens `WATER` / `LAVA` / `EMPTY_BUCKET`)
| Item | ID | Ação com o Botão Direito |
| :--- | :--- | :--- |
| **Balde de Água** (`WATER`) | $10$ | Verte uma **fonte de água** via `spawnFluidSource()` + respingo e som |
| **Balde de Lava** (`LAVA`) | $26$ | Verte uma **fonte de lava** (perigosa: queima) |
| **Balde Vazio** (`EMPTY_BUCKET`) | $147$ | **Enche** no fluído alvejado, removendo a célula e devolvendo o balde cheio |

- O `raycastVoxel()` agora aceita `{ includeFluids: true }` e devolve `fluidHit` (a primeira célula de água/lava atravessada) **separadamente** de `hit` (o bloco sólido). Assim o fluído pode ser alvo do balde sem nunca bloquear a mineração do bloco atrás dele.
- Baldes **não empilham** (`getMaxStack() === 1`) e possuem ícone 16×16 dedicado e modelo 3D próprio (`createBucketMesh()`).
- Receita: 3 Barras de Ferro em uma fileira (Bancada 3×3).

#### Física do Jogador em Fluídos
| Parâmetro | Valor |
| :--- | :--- |
| Gravidade na água | $0.3\times$ ($8.4$) |
| Gravidade na lava | $0.18\times$ ($5.04$) — a lava é um piche pesada |
| Velocidade de natação | $3.6\,\text{m/s}$ ($60\%$ disso na lava) |
| Empuxo da corrente | Até $3.4\,\text{m/s}$, proporcional ao desnível de nível entre a célula do corpo e a vizinha mais fraca |
| Dano contínuo na lava | $4.0$ pontos/s ($2$ corações/s), imune a regeneração |
| Dano de afogamento | $2.0$ pontos/s após $6.0\,\text{s}$ com os olhos submersos |
| Dano de queda | Anulado dentro de qualquer fluído (o impacto é absorvido) |
| Névoa submersa | `near` $35 \rightarrow 0.6$, `far` $65 \rightarrow 14$, cor $\rightarrow$ azul profundo em ~$125\text{ms}$ |

`dayNightCycle.js` expõe `setUnderwaterMode()` para que a paleta do céu **não dispute** com a névoa azul enquanto o jogador está submerso.

#### Fluídos e Mobs
- **Lava**: $4$ pontos de dano a cada $0.5\,\text{s}$ com partículas de brasa; qualquer tipo de mob.
- **Água**: Empuxo ascendente ($+34\,\text{m/s}^2$) com amortecimento, puxando o mob até a linha d'água; a velocidade vertical é limitada a $-3.5\,\text{m/s}$.

---

### ⚡ 1. Motor de Redstone (`redstoneEngine.js`)
* **Propagação BFS (Breadth-First Search)**: O sinal de redstone decai $1$ nível a cada bloco percorrido (de $15$ até $0$).
* **Fontes de Energia**: Alavancas ligadas ($15$), Placas de Pressão acionadas ($15$) e Tochas de Redstone ($15$).
* **Conectividade Vertical**: O fio de redstone sobe e desce $1$ bloco de altura adjacente automaticamente.
* **Atuadores Conectados**: Portas de Madeira e Ferro (abrem quando energizadas) e blocos de **TNT** (iniciam contagem regressiva de detonação imediata ao receber energia).

### ✨ 2. Sistema de Encantamentos Arcanos (`enchantingSystem.js`)
* **Economia de Níveis**: O jogador acumula XP por minerar minérios, matar mobs e cozinhar itens ($\text{XP Necessário} = \text{Nível} \times 25$).
* **Feitiços Disponíveis**:
  * `Afiação (Sharpness)`: $+2.5$ de dano por nível na espada com brilho azul encantado.
  * `Proteção (Protection)`: $+1.5$ ponto extra de defesa por peça de armadura.
  * `Eficiência (Efficiency)`: $+45\%$ de velocidade de quebra por nível na picareta.
  * `Aspecto Flamejante (Fire Aspect)`: Aplica chamas e dano contínuo no alvo atingido.
  * `Inquebrável (Unbreaking)`: Reduz o desgaste de durabilidade.

### 🔊 3. Sintetizador de Áudio Procedural (`soundFx.js`)
* Totalmente sintetizado com **Web Audio API** (Oscillators, Biquad Filters e White Noise Buffers):
  * **Passos Específicos por Superfície**: Filtro passa-faixa em $1100\text{Hz}$ para pedra/obsidiana, ressonância grave $320\text{Hz}$ para madeira, fricção granular $550\text{Hz}$ para areia/terra e $800\text{Hz}$ para cascalho/netherrack.
  * **Combate & Impactos**: Espadas cortando o ar, estalo de arco, flecha cravando, estalo de crítico com harmônicos agudos e gemidos graves de zumbis/mobs.
  * **Explosões**: Explosão dupla combinando ruído branco filtrado com sub-bass analógico de $120\text{Hz} \rightarrow 25\text{Hz}$.
  * **Trilha Sonora C418**: Gerador aleatório de frases pentatônicas calmas em piano procedural a cada $65\sim110$ segundos.

### ⛏️ 5. Sistema Avançado de Mineração & Quebra Progressiva
- **Animação Dinâmica de Rachaduras (*Block Breaking Cracks*)**: Implementadas 6 etapas autênticas de fratura procedural (`destroy_stage_0` a `destroy_stage_5`) mapeadas diretamente pelo atlas no cubo de sobreposição.
- **Golpes Rítmicos Contínuos na 1ª Pessoa**: O braço do jogador realiza ciclos de mineração automáticos e fluidos enquanto o botão esquerdo do mouse permanece pressionado.
- **Fluídos Não Mineráveis**: Água e Lava são capturados pelo raycast de fluído e ignorados pela quebra progressiva — só se usa um **Balde** para removê-los.
- **Acoustic Profiling (*soundFx.js*)**: Sons de impacto e quebra agora diferenciam ressonâncias acústicas para Madeira, Terra/Pedregulho, Minérios Preciosos (som cristalino/snap) e Obsidiana (grave pesado).
- **Taxas de Partículas Otimizadas**: Efeitos de poeira e detritos com buffer de materiais em cache e limite de partículas ativas para evitar quedas de framerate.

---

## 5. Otimizações de Desempenho (60+ FPS Constantes)

1. **BufferGeometry com `Uint16Array` Indexing**: Geometrias de chunks utilizam arrays de índices de 16 bits quando a contagem de vértices é baixa, economizando banda de memória VRAM e acelerando chamadas de draw.
2. **Pool e Cache de Materiais em Partículas (`particles.js`)**: Evita criação/descarte contínuo de materiais WebGL no coletor de lixo (*Garbage Collector*).
3. **Flags WebGL de Alto Desempenho**: Renderizador configurado com `powerPreference: 'high-performance'` e `stencil: false`.
4. **Remesh Diferido de Fluídos (`worldManager.js`)**: `setMeshDeferral(true)` acumula todos os chunks sujos de um frame em um único `Set`; `flushDirtyChunks()` reconstrói no máximo **2 chunks por frame**. Sem isso, um único balde de lava derrubaria o framerate ao remakejar dezenas de chunks no mesmo tick.
5. **Culling de Fluído entre Chunks (`chunk.js`)**: A malha de fluído consulta `getFluidLevelAtWorld()` dos vizinhos e só emite faces expostas, então a superfície de um oceano é mesclada em vez de duplicada na fronteira do chunk.
6. **Materiais de Fluído Reutilizados**: `sharedMaterial`, `waterMaterial` e `lavaMaterial` são instâncias de módulo (uma de cada tipo), compartilhadas por **todos** os chunks; só a geometria é recriada a cada remesh.
7. **Orçamento de Tiques Dedicado**: A fila de fluídos é limitada a **6000** entradas e consome **96 tiques por frame**, garantindo que a simulação nunca roube o orçamento do renderizador. A varredura da fila (**1536/frame**) é separada do orçamento de tiques, e entradas sem efeito são descartadas de graça, de modo que nenhuma rajada de mudanças de blocos consiga atrasar trabalho lento (a lava) nem uma fonte recém-despejada.
8. **Cooldown de Áudio de Fluído**: Sons de corrente e chiado têm cooldown global e teste de distância ao ouvinte, evitando dezenas de osciladores por segundo.
9. **Áudio Reutilizável**: `updateCavernAmbience()` reaproveita o mesmo par de osciladores e aplica a resposta de caverna por **filtro passa-baixa**, sem criar nós de áudio novos por frame.

### Custo Medido (Teste de Integração Headless, `dt = 0.05s`)

| Cenário | Custo por frame |
|---|---|
| Motor ocioso (fila vazia) | **0.0001 ms** |
| Fluxo de água ativo (113 células) | **~0.82 ms** |
| Inundação patológica de lava (pico de **5255** tiques pendentes) | **~5.30 ms** |

> Mesmo no pior caso testado, o motor de fluídos fica com menos de um terço do orçamento de $16.7\,\text{ms}$ de um frame a 60 FPS. A fila também nunca escapou do teto de 6000 entradas.

---

## 6. Próximos Passos & Rumo à Versão 1.0

1. **Biomas e Clima Expansivo**: Neve acumulada em biomas glaciais, tempestades e trovões volumétricos.
2. **Dimensão do Fim (The End) & Boss Dragon**: Acesso via portal do fim para a batalha final da versão 1.0.
3. **Persistência de Fluidos no Save**: Serializar o array `chunk.fluid` para que rios e baldes continuem onde foram deixados.
4. **Bombeamento & Irrigação**: Baldes cheios viram itens depositáveis e a água das fazendas passa a ser simulada.
5. **Peixes e Vida Aquática**: Mobs que só se movem em água, usando a flutuação já implementada em `mobManager.js`.

