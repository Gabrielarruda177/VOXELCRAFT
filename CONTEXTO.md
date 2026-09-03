# CONTEXTO GLOBAL DO PROJETO: VOXELCRAFT 3D (v0.8.5 — Arquitetura de Referência & Rumo à 1.0)

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
  - Picareta de Ferro + Espada de Ferro + Enxada de Ferro + Balde
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
│       │   ├── interaction.js     # Quebra progressiva, combate com espadas/arcos, escudo, cultivo, baús e TNT
│       │   ├── loop.js            # Game Loop (60 FPS renderização + atualização desacoplada)
│       │   ├── raycast.js         # Raycaster DDA através da grade voxel
│       │   ├── saveManager.js     # Persistência automática no LocalStorage com migração de saves
│       │   ├── soundFx.js         # Sintetizador procedural Web Audio API (espadas, arco, fusível, passos, etc.)
│       │   ├── redstoneEngine.js  # Motor de Redstone com propagação BFS de energia (0 a 15 níveis)
│       │   └── enchantingSystem.js# Cálculo de XP, níveis e feitiços arcanos
│       ├── entities/
│       │   ├── player.js          # Física AABB, Fome, Saturação, Exaustão, Vida, Dano e Voo
│       │   ├── playerModel.js     # Modelo 3D em 3ª pessoa com armaduras dinâmicas
│       │   ├── hand.js            # Braço 3D em 1ª pessoa, empunhadura e animações de ataque
│       │   ├── mobManager.js      # IA: Zumbis (Skins de terror), Esqueletos, Aranhas, Creepers e Porcos
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
│       │   └── blockIcon.js       # Gerador raster 16x16 pixel-art de alta definição para todos os itens
│       └── world/
│           ├── blockTypes.js      # Dicionário de blocos, durezas, drops, dados de armadura, dano e nutrição
│           ├── chunk.js           # Mesh voxel otimizado com culling, tochas 3D e vegetação cruzada
│           └── worldManager.js    # Geração procedural, biomas, cavernas 3D, dungeons, spawner e Nether
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
- **Acoustic Profiling (*soundFx.js*)**: Sons de impacto e quebra agora diferenciam ressonâncias acústicas para Madeira, Terra/Pedregulho, Minérios Preciosos (som cristalino/snap) e Obsidiana (grave pesado).
- **Taxas de Partículas Otimizadas**: Efeitos de poeira e detritos com buffer de materiais em cache e limite de partículas ativas para evitar quedas de framerate.

---

## 5. Otimizações de Desempenho (60+ FPS Constantes)

1. **BufferGeometry com `Uint16Array` Indexing**: Geometrias de chunks utilizam arrays de índices de 16 bits quando a contagem de vértices é baixa, economizando banda de memória VRAM e acelerando chamadas de draw.
2. **Pool e Cache de Materiais em Partículas (`particles.js`)**: Evita criação/descarte contínuo de materiais WebGL no coletor de lixo (*Garbage Collector*).
3. **Flags WebGL de Alto Desempenho**: Renderizador configurado com `powerPreference: 'high-performance'` e `stencil: false`.

---

## 6. Próximos Passos & Rumo à Versão 1.0

1. **Biomas e Clima Expansivo**: Neve acumulada em biomas glaciais, tempestades e trovões volumétricos.
2. **Dimensão do Fim (The End) & Boss Dragon**: Acesso via portal do fim para a batalha final da versão 1.0.
3. **Fluidos Dinâmicos**: Física de fluxo contínuo de água e lava com geração de pedregulho/obsidiana no contato.
4. **Sons Ambiente Subterrâneos**: Ecos e gotas de água em cavernas profundas.

