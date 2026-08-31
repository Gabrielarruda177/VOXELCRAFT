import { BlockType, ITEM_NAMES } from '../world/blockTypes.js';
import { createBlockIconCanvas } from './blockIcon.js';
import { playCraftSound, playInventorySound } from '../engine/soundFx.js';
import { addItemToInventory, getHotbarSlots, slots as inventorySlots } from './inventory.js';
import { openWindow, closeWindow, UIWindow, isWindowOpen } from './uiManager.js';
import {
  cursorItem,
  getMaxStack,
  setCursorItem,
  clearCursorItem,
  handleSlotClick,
  updateCursorVisual,
} from './cursorManager.js';
import { bindSlotTooltip } from './tooltip.js';

let craftingTableModal = null;
let recipeBookModal = null;

// 3×3 Table slots state (9 slots)
export const tableSlots = new Array(9).fill(null).map(() => ({ type: 0, count: 0 }));
// 2×2 Inventory crafting slots state (4 slots)
export const inv2x2Slots = new Array(4).fill(null).map(() => ({ type: 0, count: 0 }));

let currentTableOutput = null;

// ── Complete Catalog of Progression Recipes ──────────────────

export const RECIPE_CATALOG = [
  // ── 1. Wood Planks (Shapeless: 1 Wood Log -> 4 Planks) ──
  {
    id: 'planks',
    name: 'Tábuas de Madeira',
    category: 'Blocos',
    result: BlockType.WOOD_PLANKS,
    count: 4,
    gridSize: 2,
    layout: [BlockType.WOOD_LOG, 0, 0, 0],
    desc: 'Coloque 1 Tronco de Carvalho em qualquer espaço da grade.',
    check: (grid) => {
      const logs = grid.filter(v => v === BlockType.WOOD_LOG).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.WOOD_LOG).length;
      return logs === 1 && others === 0;
    },
  },

  // ── 2. Sticks (Vertical 2 Planks -> 4 Sticks) ──
  {
    id: 'sticks',
    name: 'Gravetos',
    category: 'Materiais',
    result: BlockType.STICK,
    count: 4,
    gridSize: 2,
    layout: [BlockType.WOOD_PLANKS, 0, BlockType.WOOD_PLANKS, 0],
    desc: 'Coloque 2 Tábuas de Madeira verticalmente.',
    check: (grid, w, h) => {
      if (w === 2 && h === 2) {
        return (
          (grid[0] === BlockType.WOOD_PLANKS && grid[2] === BlockType.WOOD_PLANKS && grid[1] === 0 && grid[3] === 0) ||
          (grid[1] === BlockType.WOOD_PLANKS && grid[3] === BlockType.WOOD_PLANKS && grid[0] === 0 && grid[2] === 0)
        );
      }
      if (w === 3 && h === 3) {
        for (let col = 0; col < 3; col++) {
          for (let row = 0; row < 2; row++) {
            const idx1 = row * 3 + col;
            const idx2 = (row + 1) * 3 + col;
            if (grid[idx1] === BlockType.WOOD_PLANKS && grid[idx2] === BlockType.WOOD_PLANKS) {
              const othersEmpty = grid.every((v, i) => (i === idx1 || i === idx2) ? true : v === 0);
              if (othersEmpty) return true;
            }
          }
        }
      }
      return false;
    },
  },

  // ── 3. Crafting Table (2×2 Planks -> 1 Crafting Table) ──
  {
    id: 'crafting_table',
    name: 'Bancada de Trabalho',
    category: 'Blocos',
    result: BlockType.CRAFTING_TABLE,
    count: 1,
    gridSize: 2,
    layout: [BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS],
    desc: 'Preencha os 4 espaços (2×2) com Tábuas de Madeira.',
    check: (grid, w, h) => {
      if (w === 2 && h === 2) {
        return grid.every(v => v === BlockType.WOOD_PLANKS);
      }
      if (w === 3 && h === 3) {
        const offsets = [0, 1, 3, 4];
        for (const off of offsets) {
          const r0c0 = off;
          const r0c1 = off + 1;
          const r1c0 = off + 3;
          const r1c1 = off + 4;
          if (
            grid[r0c0] === BlockType.WOOD_PLANKS &&
            grid[r0c1] === BlockType.WOOD_PLANKS &&
            grid[r1c0] === BlockType.WOOD_PLANKS &&
            grid[r1c1] === BlockType.WOOD_PLANKS
          ) {
            const othersEmpty = grid.every((v, i) => (i === r0c0 || i === r0c1 || i === r1c0 || i === r1c1) ? true : v === 0);
            if (othersEmpty) return true;
          }
        }
      }
      return false;
    },
  },

  // ── 4. Furnace (8 Cobblestone around center in 3x3) ──
  {
    id: 'furnace',
    name: 'Fornalha',
    category: 'Blocos',
    result: BlockType.FURNACE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.COBBLESTONE, BlockType.COBBLESTONE, BlockType.COBBLESTONE,
      BlockType.COBBLESTONE, 0,                     BlockType.COBBLESTONE,
      BlockType.COBBLESTONE, BlockType.COBBLESTONE, BlockType.COBBLESTONE,
    ],
    desc: 'Disponha 8 Pedregulhos ao redor das bordas da grade 3×3, deixando o centro vazio.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const ring = [0, 1, 2, 3, 5, 6, 7, 8];
      return ring.every(i => grid[i] === BlockType.COBBLESTONE) && grid[4] === 0;
    },
  },

  // ── 5. Chest (8 Wood Planks around center in 3x3) ──
  {
    id: 'chest',
    name: 'Baú de Madeira',
    category: 'Blocos',
    result: BlockType.CHEST,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS,
      BlockType.WOOD_PLANKS, 0,                     BlockType.WOOD_PLANKS,
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS,
    ],
    desc: 'Disponha 8 Tábuas de Madeira ao redor da grade 3×3 com centro vazio.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const ring = [0, 1, 2, 3, 5, 6, 7, 8];
      return ring.every(i => grid[i] === BlockType.WOOD_PLANKS) && grid[4] === 0;
    },
  },

  // ── 6. Torches (Coal + Stick) ──
  {
    id: 'torches',
    name: 'Tochas (4x)',
    category: 'Iluminação',
    result: BlockType.TORCH,
    count: 4,
    gridSize: 2,
    layout: [BlockType.COAL_ORE, 0, BlockType.STICK, 0],
    desc: '1 Carvão em cima e 1 Graveto logo abaixo.',
    check: (grid, w, h) => {
      if (w === 2 && h === 2) {
        return (
          (grid[0] === BlockType.COAL_ORE && grid[2] === BlockType.STICK && grid[1] === 0 && grid[3] === 0) ||
          (grid[1] === BlockType.COAL_ORE && grid[3] === BlockType.STICK && grid[0] === 0 && grid[2] === 0)
        );
      }
      if (w === 3 && h === 3) {
        for (let col = 0; col < 3; col++) {
          for (let row = 0; row < 2; row++) {
            const topIdx = row * 3 + col;
            const botIdx = (row + 1) * 3 + col;
            if (grid[topIdx] === BlockType.COAL_ORE && grid[botIdx] === BlockType.STICK) {
              const othersEmpty = grid.every((v, i) => (i === topIdx || i === botIdx) ? true : v === 0);
              if (othersEmpty) return true;
            }
          }
        }
      }
      return false;
    },
  },

  // ── 7. Wooden Pickaxe ──
  {
    id: 'wooden_pickaxe',
    name: 'Picareta de Madeira',
    category: 'Ferramentas',
    result: BlockType.WOODEN_PICKAXE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS,
      0,                     BlockType.STICK,       0,
      0,                     BlockType.STICK,       0,
    ],
    desc: '3 Tábuas no topo e 2 Gravetos no meio (grade 3×3).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.WOOD_PLANKS && grid[1] === BlockType.WOOD_PLANKS && grid[2] === BlockType.WOOD_PLANKS &&
        grid[4] === BlockType.STICK && grid[7] === BlockType.STICK &&
        grid[3] === 0 && grid[5] === 0 && grid[6] === 0 && grid[8] === 0
      );
    },
  },

  // ── 8. Wooden Sword ──
  {
    id: 'wooden_sword',
    name: 'Espada de Madeira',
    category: 'Armas',
    result: BlockType.WOODEN_SWORD,
    count: 1,
    gridSize: 3,
    layout: [
      0, BlockType.WOOD_PLANKS, 0,
      0, BlockType.WOOD_PLANKS, 0,
      0, BlockType.STICK,       0,
    ],
    desc: '2 Tábuas verticais com 1 Graveto embaixo.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      for (let col = 0; col < 3; col++) {
        const match = grid[col] === BlockType.WOOD_PLANKS && grid[3 + col] === BlockType.WOOD_PLANKS && grid[6 + col] === BlockType.STICK;
        const othersEmpty = grid.every((v, i) => (i === col || i === 3 + col || i === 6 + col) ? true : v === 0);
        if (match && othersEmpty) return true;
      }
      return false;
    },
  },

  // ── 9. Stone Pickaxe ──
  {
    id: 'stone_pickaxe',
    name: 'Picareta de Pedra',
    category: 'Ferramentas',
    result: BlockType.STONE_PICKAXE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.COBBLESTONE, BlockType.COBBLESTONE, BlockType.COBBLESTONE,
      0,                     BlockType.STICK,       0,
      0,                     BlockType.STICK,       0,
    ],
    desc: '3 Pedregulhos no topo e 2 Gravetos no meio.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.COBBLESTONE && grid[1] === BlockType.COBBLESTONE && grid[2] === BlockType.COBBLESTONE &&
        grid[4] === BlockType.STICK && grid[7] === BlockType.STICK &&
        grid[3] === 0 && grid[5] === 0 && grid[6] === 0 && grid[8] === 0
      );
    },
  },

  // ── 10. Stone Sword ──
  {
    id: 'stone_sword',
    name: 'Espada de Pedra',
    category: 'Armas',
    result: BlockType.STONE_SWORD,
    count: 1,
    gridSize: 3,
    layout: [
      0, BlockType.COBBLESTONE, 0,
      0, BlockType.COBBLESTONE, 0,
      0, BlockType.STICK,       0,
    ],
    desc: '2 Pedregulhos verticais com 1 Graveto embaixo.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      for (let col = 0; col < 3; col++) {
        const match = grid[col] === BlockType.COBBLESTONE && grid[3 + col] === BlockType.COBBLESTONE && grid[6 + col] === BlockType.STICK;
        const othersEmpty = grid.every((v, i) => (i === col || i === 3 + col || i === 6 + col) ? true : v === 0);
        if (match && othersEmpty) return true;
      }
      return false;
    },
  },

  // ── 11. Iron Pickaxe (Uses Smelted Iron Ingots!) ──
  {
    id: 'iron_pickaxe',
    name: 'Picareta de Ferro',
    category: 'Ferramentas',
    result: BlockType.IRON_PICKAXE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.IRON_INGOT, BlockType.IRON_INGOT, BlockType.IRON_INGOT,
      0,                    BlockType.STICK,      0,
      0,                    BlockType.STICK,      0,
    ],
    desc: '3 Barras de Ferro fundidas no topo e 2 Gravetos no centro.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.IRON_INGOT && grid[1] === BlockType.IRON_INGOT && grid[2] === BlockType.IRON_INGOT &&
        grid[4] === BlockType.STICK && grid[7] === BlockType.STICK &&
        grid[3] === 0 && grid[5] === 0 && grid[6] === 0 && grid[8] === 0
      );
    },
  },

  // ── 12. Iron Sword ──
  {
    id: 'iron_sword',
    name: 'Espada de Ferro',
    category: 'Armas',
    result: BlockType.IRON_SWORD,
    count: 1,
    gridSize: 3,
    layout: [
      0, BlockType.IRON_INGOT, 0,
      0, BlockType.IRON_INGOT, 0,
      0, BlockType.STICK,      0,
    ],
    desc: '2 Barras de Ferro verticais com 1 Graveto embaixo.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      for (let col = 0; col < 3; col++) {
        const match = grid[col] === BlockType.IRON_INGOT && grid[3 + col] === BlockType.IRON_INGOT && grid[6 + col] === BlockType.STICK;
        const othersEmpty = grid.every((v, i) => (i === col || i === 3 + col || i === 6 + col) ? true : v === 0);
        if (match && othersEmpty) return true;
      }
      return false;
    },
  },

  // ── 13. Iron Helmet (5 Iron Ingots) ──
  {
    id: 'iron_helmet',
    name: 'Capacete de Ferro',
    category: 'Armaduras',
    result: BlockType.IRON_HELMET,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.IRON_INGOT, BlockType.IRON_INGOT, BlockType.IRON_INGOT,
      BlockType.IRON_INGOT, 0,                    BlockType.IRON_INGOT,
      0,                    0,                    0,
    ],
    desc: '5 Barras de Ferro em arco no topo da grade 3×3 (+2 Defesa).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.IRON_INGOT && grid[1] === BlockType.IRON_INGOT && grid[2] === BlockType.IRON_INGOT &&
        grid[3] === BlockType.IRON_INGOT && grid[4] === 0 && grid[5] === BlockType.IRON_INGOT &&
        grid[6] === 0 && grid[7] === 0 && grid[8] === 0
      );
    },
  },

  // ── 14. Iron Chestplate (8 Iron Ingots) ──
  {
    id: 'iron_chestplate',
    name: 'Peitoral de Ferro',
    category: 'Armaduras',
    result: BlockType.IRON_CHESTPLATE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.IRON_INGOT, 0,                    BlockType.IRON_INGOT,
      BlockType.IRON_INGOT, BlockType.IRON_INGOT, BlockType.IRON_INGOT,
      BlockType.IRON_INGOT, BlockType.IRON_INGOT, BlockType.IRON_INGOT,
    ],
    desc: '8 Barras de Ferro em formato de colete com espaço superior central (+6 Defesa).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.IRON_INGOT && grid[1] === 0 && grid[2] === BlockType.IRON_INGOT &&
        grid[3] === BlockType.IRON_INGOT && grid[4] === BlockType.IRON_INGOT && grid[5] === BlockType.IRON_INGOT &&
        grid[6] === BlockType.IRON_INGOT && grid[7] === BlockType.IRON_INGOT && grid[8] === BlockType.IRON_INGOT
      );
    },
  },

  // ── 15. Iron Leggings (7 Iron Ingots) ──
  {
    id: 'iron_leggings',
    name: 'Calças de Ferro',
    category: 'Armaduras',
    result: BlockType.IRON_LEGGINGS,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.IRON_INGOT, BlockType.IRON_INGOT, BlockType.IRON_INGOT,
      BlockType.IRON_INGOT, 0,                    BlockType.IRON_INGOT,
      BlockType.IRON_INGOT, 0,                    BlockType.IRON_INGOT,
    ],
    desc: '7 Barras de Ferro em formato de calças (+5 Defesa).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.IRON_INGOT && grid[1] === BlockType.IRON_INGOT && grid[2] === BlockType.IRON_INGOT &&
        grid[3] === BlockType.IRON_INGOT && grid[4] === 0 && grid[5] === BlockType.IRON_INGOT &&
        grid[6] === BlockType.IRON_INGOT && grid[7] === 0 && grid[8] === BlockType.IRON_INGOT
      );
    },
  },

  // ── 16. Iron Boots (4 Iron Ingots) ──
  {
    id: 'iron_boots',
    name: 'Botas de Ferro',
    category: 'Armaduras',
    result: BlockType.IRON_BOOTS,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.IRON_INGOT, 0, BlockType.IRON_INGOT,
      BlockType.IRON_INGOT, 0, BlockType.IRON_INGOT,
      0,                    0, 0,
    ],
    desc: '4 Barras de Ferro em formato de botas (+2 Defesa).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.IRON_INGOT && grid[1] === 0 && grid[2] === BlockType.IRON_INGOT &&
        grid[3] === BlockType.IRON_INGOT && grid[4] === 0 && grid[5] === BlockType.IRON_INGOT &&
        grid[6] === 0 && grid[7] === 0 && grid[8] === 0
      );
    },
  },

  // ── 17. Bow (3 Sticks + 3 Strings) ──
  {
    id: 'bow',
    name: 'Arco de Caça',
    category: 'Armas',
    result: BlockType.BOW,
    count: 1,
    gridSize: 3,
    layout: [
      0,               BlockType.STICK, BlockType.STRING,
      BlockType.STICK, 0,               BlockType.STRING,
      0,               BlockType.STICK, BlockType.STRING,
    ],
    desc: '3 Gravetos e 3 Linhas de Teia na bancada 3×3.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const sticks = grid.filter(v => v === BlockType.STICK).length;
      const strings = grid.filter(v => v === BlockType.STRING).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.STICK && v !== BlockType.STRING).length;
      return sticks === 3 && strings === 3 && others === 0;
    },
  },

  // ── 18. Wooden Hoe ──
  {
    id: 'wooden_hoe',
    name: 'Enxada de Madeira',
    category: 'Ferramentas',
    result: BlockType.WOODEN_HOE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, 0,
      0,                     BlockType.STICK,       0,
      0,                     BlockType.STICK,       0,
    ],
    desc: '2 Tábuas no topo e 2 Gravetos verticais.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const match = (
        (grid[0] === BlockType.WOOD_PLANKS && grid[1] === BlockType.WOOD_PLANKS && grid[4] === BlockType.STICK && grid[7] === BlockType.STICK) ||
        (grid[1] === BlockType.WOOD_PLANKS && grid[2] === BlockType.WOOD_PLANKS && grid[4] === BlockType.STICK && grid[7] === BlockType.STICK)
      );
      const sticks = grid.filter(v => v === BlockType.STICK).length;
      const planks = grid.filter(v => v === BlockType.WOOD_PLANKS).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.STICK && v !== BlockType.WOOD_PLANKS).length;
      return match && sticks === 2 && planks === 2 && others === 0;
    },
  },

  // ── 19. Stone Hoe ──
  {
    id: 'stone_hoe',
    name: 'Enxada de Pedra',
    category: 'Ferramentas',
    result: BlockType.STONE_HOE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.COBBLESTONE, BlockType.COBBLESTONE, 0,
      0,                     BlockType.STICK,       0,
      0,                     BlockType.STICK,       0,
    ],
    desc: '2 Pedregulhos no topo e 2 Gravetos verticais.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const match = (
        (grid[0] === BlockType.COBBLESTONE && grid[1] === BlockType.COBBLESTONE && grid[4] === BlockType.STICK && grid[7] === BlockType.STICK) ||
        (grid[1] === BlockType.COBBLESTONE && grid[2] === BlockType.COBBLESTONE && grid[4] === BlockType.STICK && grid[7] === BlockType.STICK)
      );
      const sticks = grid.filter(v => v === BlockType.STICK).length;
      const cobble = grid.filter(v => v === BlockType.COBBLESTONE).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.STICK && v !== BlockType.COBBLESTONE).length;
      return match && sticks === 2 && cobble === 2 && others === 0;
    },
  },

  // ── 20. Iron Hoe ──
  {
    id: 'iron_hoe',
    name: 'Enxada de Ferro',
    category: 'Ferramentas',
    result: BlockType.IRON_HOE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.IRON_INGOT, BlockType.IRON_INGOT, 0,
      0,                    BlockType.STICK,      0,
      0,                    BlockType.STICK,      0,
    ],
    desc: '2 Barras de Ferro no topo e 2 Gravetos verticais.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const match = (
        (grid[0] === BlockType.IRON_INGOT && grid[1] === BlockType.IRON_INGOT && grid[4] === BlockType.STICK && grid[7] === BlockType.STICK) ||
        (grid[1] === BlockType.IRON_INGOT && grid[2] === BlockType.IRON_INGOT && grid[4] === BlockType.STICK && grid[7] === BlockType.STICK)
      );
      const sticks = grid.filter(v => v === BlockType.STICK).length;
      const iron = grid.filter(v => v === BlockType.IRON_INGOT).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.STICK && v !== BlockType.IRON_INGOT).length;
      return match && sticks === 2 && iron === 2 && others === 0;
    },
  },

  // ── 21. Bread (3 Wheat horizontally) ──
  {
    id: 'bread',
    name: 'Pão Dourado',
    category: 'Alimentação',
    result: BlockType.BREAD,
    count: 1,
    gridSize: 3,
    layout: [
      0,               0,               0,
      BlockType.WHEAT, BlockType.WHEAT, BlockType.WHEAT,
      0,               0,               0,
    ],
    desc: '3 Trigos colhidos em linha horizontal (+5 Vida).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      for (let row = 0; row < 3; row++) {
        const i0 = row * 3;
        const i1 = row * 3 + 1;
        const i2 = row * 3 + 2;
        if (grid[i0] === BlockType.WHEAT && grid[i1] === BlockType.WHEAT && grid[i2] === BlockType.WHEAT) {
          const othersEmpty = grid.every((v, i) => (i === i0 || i === i1 || i === i2) ? true : v === 0);
          if (othersEmpty) return true;
        }
      }
      return false;
    },
  },

  // ── 22. TNT (4 Sand + 5 Gunpowder) ──
  {
    id: 'tnt',
    name: 'Bloco de TNT',
    category: 'Explosivos',
    result: BlockType.TNT,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.GUNPOWDER, BlockType.SAND,      BlockType.GUNPOWDER,
      BlockType.SAND,      BlockType.GUNPOWDER, BlockType.SAND,
      BlockType.GUNPOWDER, BlockType.SAND,      BlockType.GUNPOWDER,
    ],
    desc: '5 Pólvoras (drop de Creeper) intercaladas com 4 Areias.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const gp = grid.filter(v => v === BlockType.GUNPOWDER).length;
      const sand = grid.filter(v => v === BlockType.SAND).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.GUNPOWDER && v !== BlockType.SAND).length;
      return gp === 5 && sand === 4 && others === 0;
    },
  },

  // ── 23. Diamond Sword (2 Diamonds + 1 Stick) ──
  {
    id: 'diamond_sword',
    name: 'Espada de Diamante',
    category: 'Armas',
    result: BlockType.DIAMOND_SWORD,
    count: 1,
    gridSize: 3,
    layout: [
      0, BlockType.DIAMOND, 0,
      0, BlockType.DIAMOND, 0,
      0, BlockType.STICK,   0,
    ],
    desc: '2 Diamantes verticais e 1 Graveto na base (+9 Dano).',
    check: (grid, w, h) => {
      if (w === 3 && h === 3) {
        for (let col = 0; col < 3; col++) {
          if (
            grid[col] === BlockType.DIAMOND &&
            grid[col + 3] === BlockType.DIAMOND &&
            grid[col + 6] === BlockType.STICK
          ) {
            const others = grid.filter((v, i) => (i === col || i === col + 3 || i === col + 6) ? false : v !== 0);
            if (others.length === 0) return true;
          }
        }
      }
      return false;
    },
  },

  // ── 24. Diamond Pickaxe (3 Diamonds + 2 Sticks) ──
  {
    id: 'diamond_pickaxe',
    name: 'Picareta de Diamante',
    category: 'Ferramentas',
    result: BlockType.DIAMOND_PICKAXE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.DIAMOND, BlockType.DIAMOND, BlockType.DIAMOND,
      0,                 BlockType.STICK,   0,
      0,                 BlockType.STICK,   0,
    ],
    desc: '3 Diamantes na linha superior e 2 Gravetos no centro vertical (Capaz de minerar Obsidiana).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.DIAMOND && grid[1] === BlockType.DIAMOND && grid[2] === BlockType.DIAMOND &&
        grid[3] === 0 && grid[4] === BlockType.STICK && grid[5] === 0 &&
        grid[6] === 0 && grid[7] === BlockType.STICK && grid[8] === 0
      );
    },
  },

  // ── 25. Diamond Helmet (5 Diamonds) ──
  {
    id: 'diamond_helmet',
    name: 'Capacete de Diamante',
    category: 'Armaduras',
    result: BlockType.DIAMOND_HELMET,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.DIAMOND, BlockType.DIAMOND, BlockType.DIAMOND,
      BlockType.DIAMOND, 0,                 BlockType.DIAMOND,
      0,                 0,                 0,
    ],
    desc: '5 Diamantes em formato de arco/U invertido (+3 Defesa).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.DIAMOND && grid[1] === BlockType.DIAMOND && grid[2] === BlockType.DIAMOND &&
        grid[3] === BlockType.DIAMOND && grid[4] === 0 && grid[5] === BlockType.DIAMOND &&
        grid[6] === 0 && grid[7] === 0 && grid[8] === 0
      );
    },
  },

  // ── 26. Diamond Chestplate (8 Diamonds) ──
  {
    id: 'diamond_chestplate',
    name: 'Peitoral de Diamante',
    category: 'Armaduras',
    result: BlockType.DIAMOND_CHESTPLATE,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.DIAMOND, 0,                  BlockType.DIAMOND,
      BlockType.DIAMOND, BlockType.DIAMOND,  BlockType.DIAMOND,
      BlockType.DIAMOND, BlockType.DIAMOND,  BlockType.DIAMOND,
    ],
    desc: '8 Diamantes em formato de colete com espaço superior central (+8 Defesa máxima).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.DIAMOND && grid[1] === 0 && grid[2] === BlockType.DIAMOND &&
        grid[3] === BlockType.DIAMOND && grid[4] === BlockType.DIAMOND && grid[5] === BlockType.DIAMOND &&
        grid[6] === BlockType.DIAMOND && grid[7] === BlockType.DIAMOND && grid[8] === BlockType.DIAMOND
      );
    },
  },

  // ── 27. Diamond Leggings (7 Diamonds) ──
  {
    id: 'diamond_leggings',
    name: 'Calças de Diamante',
    category: 'Armaduras',
    result: BlockType.DIAMOND_LEGGINGS,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.DIAMOND, BlockType.DIAMOND, BlockType.DIAMOND,
      BlockType.DIAMOND, 0,                 BlockType.DIAMOND,
      BlockType.DIAMOND, 0,                 BlockType.DIAMOND,
    ],
    desc: '7 Diamantes em formato de calças (+6 Defesa).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.DIAMOND && grid[1] === BlockType.DIAMOND && grid[2] === BlockType.DIAMOND &&
        grid[3] === BlockType.DIAMOND && grid[4] === 0 && grid[5] === BlockType.DIAMOND &&
        grid[6] === BlockType.DIAMOND && grid[7] === 0 && grid[8] === BlockType.DIAMOND
      );
    },
  },

  // ── 28. Diamond Boots (4 Diamonds) ──
  {
    id: 'diamond_boots',
    name: 'Botas de Diamante',
    category: 'Armaduras',
    result: BlockType.DIAMOND_BOOTS,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.DIAMOND, 0, BlockType.DIAMOND,
      BlockType.DIAMOND, 0, BlockType.DIAMOND,
      0,                 0, 0,
    ],
    desc: '4 Diamantes em formato de botas (+3 Defesa).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.DIAMOND && grid[1] === 0 && grid[2] === BlockType.DIAMOND &&
        grid[3] === BlockType.DIAMOND && grid[4] === 0 && grid[5] === BlockType.DIAMOND &&
        grid[6] === 0 && grid[7] === 0 && grid[8] === 0
      );
    },
  },

  // ── 29. Bed (3 Wool + 3 Wood Planks) ──
  {
    id: 'bed',
    name: 'Cama Confortável',
    category: 'Mobiliário',
    result: BlockType.BED,
    count: 1,
    gridSize: 3,
    layout: [
      0,                      0,                      0,
      BlockType.WOOL,         BlockType.WOOL,         BlockType.WOOL,
      BlockType.WOOD_PLANKS,  BlockType.WOOD_PLANKS,  BlockType.WOOD_PLANKS,
    ],
    desc: '3 Blocos de Lã de Ovelha sobre 3 Tábuas de Madeira (Permite dormir e pular a noite).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const matchRow1 = (
        grid[0] === BlockType.WOOL && grid[1] === BlockType.WOOL && grid[2] === BlockType.WOOL &&
        grid[3] === BlockType.WOOD_PLANKS && grid[4] === BlockType.WOOD_PLANKS && grid[5] === BlockType.WOOD_PLANKS &&
        grid[6] === 0 && grid[7] === 0 && grid[8] === 0
      );
      const matchRow2 = (
        grid[0] === 0 && grid[1] === 0 && grid[2] === 0 &&
        grid[3] === BlockType.WOOL && grid[4] === BlockType.WOOL && grid[5] === BlockType.WOOL &&
        grid[6] === BlockType.WOOD_PLANKS && grid[7] === BlockType.WOOD_PLANKS && grid[8] === BlockType.WOOD_PLANKS
      );
      return matchRow1 || matchRow2;
    },
  },

  // ── 30. Flint and Steel (1 Iron Ingot + 1 Flint) ──
  {
    id: 'flint_and_steel',
    name: 'Isqueiro de Pederneira',
    category: 'Ferramentas',
    result: BlockType.FLINT_AND_STEEL,
    count: 1,
    gridSize: 2,
    layout: [
      BlockType.IRON_INGOT, 0,
      0,                    BlockType.FLINT,
    ],
    desc: '1 Barra de Ferro e 1 Pederneira diagonalmente (Acende o Portal do Nether e Fogueiras).',
    check: (grid) => {
      const iron = grid.filter(v => v === BlockType.IRON_INGOT).length;
      const flint = grid.filter(v => v === BlockType.FLINT).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.IRON_INGOT && v !== BlockType.FLINT).length;
      return iron === 1 && flint === 1 && others === 0;
    },
  },

  // ── 31. Quartz Block (4 Quartz in 2x2) ──
  {
    id: 'quartz_block',
    name: 'Bloco de Quartzo Polido',
    category: 'Blocos',
    result: BlockType.QUARTZ_BLOCK,
    count: 1,
    gridSize: 2,
    layout: [
      BlockType.QUARTZ, BlockType.QUARTZ,
      BlockType.QUARTZ, BlockType.QUARTZ,
    ],
    desc: '4 Cristais de Quartzo do Nether dispostos em quadrado 2×2.',
    check: (grid, w, h) => {
      if (w === 2 && h === 2) {
        return grid.every(v => v === BlockType.QUARTZ);
      }
      if (w === 3 && h === 3) {
        const offsets = [0, 1, 3, 4];
        for (const off of offsets) {
          const r0c0 = off;
          const r0c1 = off + 1;
          const r1c0 = off + 3;
          const r1c1 = off + 4;
          if (
            grid[r0c0] === BlockType.QUARTZ &&
            grid[r0c1] === BlockType.QUARTZ &&
            grid[r1c0] === BlockType.QUARTZ &&
            grid[r1c1] === BlockType.QUARTZ
          ) {
            const othersEmpty = grid.every((v, i) => (i === r0c0 || i === r0c1 || i === r1c0 || i === r1c1) ? true : v === 0);
            if (othersEmpty) return true;
          }
        }
      }
      return false;
    },
  },

  // ── 32. Wooden Shield (6 Wood Planks + 1 Iron Ingot) ──
  {
    id: 'wooden_shield',
    name: 'Escudo de Carvalho',
    category: 'Armaduras',
    result: BlockType.WOODEN_SHIELD,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.WOOD_PLANKS, BlockType.IRON_INGOT,  BlockType.WOOD_PLANKS,
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS,
      0,                     BlockType.WOOD_PLANKS, 0,
    ],
    desc: '6 Tábuas de Madeira e 1 Barra de Ferro no topo central.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.WOOD_PLANKS && grid[1] === BlockType.IRON_INGOT && grid[2] === BlockType.WOOD_PLANKS &&
        grid[3] === BlockType.WOOD_PLANKS && grid[4] === BlockType.WOOD_PLANKS && grid[5] === BlockType.WOOD_PLANKS &&
        grid[6] === 0 && grid[7] === BlockType.WOOD_PLANKS && grid[8] === 0
      );
    },
  },

  // ── 33. Redstone Torch (1 Redstone Dust + 1 Stick) ──
  {
    id: 'redstone_torch',
    name: 'Tocha de Redstone',
    category: 'Redstone',
    result: BlockType.REDSTONE_TORCH,
    count: 1,
    gridSize: 2,
    layout: [BlockType.REDSTONE_DUST, 0, BlockType.STICK, 0],
    desc: '1 Pó de Redstone sobre 1 Graveto (Emite sinal constante de energia).',
    check: (grid) => {
      const red = grid.filter(v => v === BlockType.REDSTONE_DUST).length;
      const stick = grid.filter(v => v === BlockType.STICK).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.REDSTONE_DUST && v !== BlockType.STICK).length;
      return red === 1 && stick === 1 && others === 0;
    },
  },

  // ── 34. Lever (1 Stick + 1 Cobblestone) ──
  {
    id: 'lever',
    name: 'Alavanca de Redstone',
    category: 'Redstone',
    result: BlockType.LEVER,
    count: 1,
    gridSize: 2,
    layout: [BlockType.STICK, 0, BlockType.COBBLESTONE, 0],
    desc: '1 Graveto sobre 1 Pedregulho (Liga e desliga circuitos).',
    check: (grid) => {
      const stick = grid.filter(v => v === BlockType.STICK).length;
      const cobble = grid.filter(v => v === BlockType.COBBLESTONE).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.STICK && v !== BlockType.COBBLESTONE).length;
      return stick === 1 && cobble === 1 && others === 0;
    },
  },

  // ── 35. Pressure Plate (2 Stones) ──
  {
    id: 'pressure_plate',
    name: 'Placa de Pressão de Pedra',
    category: 'Redstone',
    result: BlockType.PRESSURE_PLATE,
    count: 1,
    gridSize: 2,
    layout: [BlockType.STONE, BlockType.STONE, 0, 0],
    desc: '2 Pedras lado a lado (Ativa ao pisar).',
    check: (grid) => {
      const stones = grid.filter(v => v === BlockType.STONE).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.STONE).length;
      return stones === 2 && others === 0;
    },
  },

  // ── 36. Wooden Door (6 Wood Planks in 2x3) ──
  {
    id: 'wooden_door',
    name: 'Porta de Madeira',
    category: 'Blocos',
    result: BlockType.WOODEN_DOOR_BOTTOM,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, 0,
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, 0,
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, 0,
    ],
    desc: '6 Tábuas de Madeira em duas colunas verticais.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      const col12 = (
        grid[0] === BlockType.WOOD_PLANKS && grid[1] === BlockType.WOOD_PLANKS && grid[2] === 0 &&
        grid[3] === BlockType.WOOD_PLANKS && grid[4] === BlockType.WOOD_PLANKS && grid[5] === 0 &&
        grid[6] === BlockType.WOOD_PLANKS && grid[7] === BlockType.WOOD_PLANKS && grid[8] === 0
      );
      const col23 = (
        grid[0] === 0 && grid[1] === BlockType.WOOD_PLANKS && grid[2] === BlockType.WOOD_PLANKS &&
        grid[3] === 0 && grid[4] === BlockType.WOOD_PLANKS && grid[5] === BlockType.WOOD_PLANKS &&
        grid[6] === 0 && grid[7] === BlockType.WOOD_PLANKS && grid[8] === BlockType.WOOD_PLANKS
      );
      return col12 || col23;
    },
  },

  // ── 37. Enchanting Table (1 Book + 2 Diamonds + 4 Obsidian) ──
  {
    id: 'enchanting_table',
    name: 'Mesa de Encantamentos',
    category: 'Magia',
    result: BlockType.ENCHANTING_TABLE,
    count: 1,
    gridSize: 3,
    layout: [
      0,                  BlockType.BOOK,     0,
      BlockType.DIAMOND,  BlockType.OBSIDIAN, BlockType.DIAMOND,
      BlockType.OBSIDIAN, BlockType.OBSIDIAN, BlockType.OBSIDIAN,
    ],
    desc: '1 Livro no topo central, 2 Diamantes nas laterais e 4 Obsidianas.',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === 0 && grid[1] === BlockType.BOOK && grid[2] === 0 &&
        grid[3] === BlockType.DIAMOND && grid[4] === BlockType.OBSIDIAN && grid[5] === BlockType.DIAMOND &&
        grid[6] === BlockType.OBSIDIAN && grid[7] === BlockType.OBSIDIAN && grid[8] === BlockType.OBSIDIAN
      );
    },
  },

  // ── 38. Boat (5 Wood Planks in U-shape) ──
  {
    id: 'boat',
    name: 'Barco de Carvalho',
    category: 'Veículos',
    result: BlockType.BOAT,
    count: 1,
    gridSize: 3,
    layout: [
      0,                     0,                     0,
      BlockType.WOOD_PLANKS, 0,                     BlockType.WOOD_PLANKS,
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS,
    ],
    desc: '5 Tábuas de Madeira dispostas em formato de barco (Permite navegar na água).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === 0 && grid[1] === 0 && grid[2] === 0 &&
        grid[3] === BlockType.WOOD_PLANKS && grid[4] === 0 && grid[5] === BlockType.WOOD_PLANKS &&
        grid[6] === BlockType.WOOD_PLANKS && grid[7] === BlockType.WOOD_PLANKS && grid[8] === BlockType.WOOD_PLANKS
      );
    },
  },

  // ── 39. Book (3 Papers / Wheat) ──
  {
    id: 'book',
    name: 'Livro Arcano',
    category: 'Magia',
    result: BlockType.BOOK,
    count: 1,
    gridSize: 2,
    layout: [
      BlockType.WHEAT, BlockType.WHEAT,
      BlockType.WHEAT, 0,
    ],
    desc: '3 Trigos processados em livro de couro.',
    check: (grid) => {
      const wheat = grid.filter(v => v === BlockType.WHEAT).length;
      const others = grid.filter(v => v !== 0 && v !== BlockType.WHEAT).length;
      return wheat === 3 && others === 0;
    },
  },

  // ── 40. Bookshelf (6 Wood Planks + 3 Books) ──
  {
    id: 'bookshelf',
    name: 'Estante de Livros',
    category: 'Blocos',
    result: BlockType.BOOKSHELF,
    count: 1,
    gridSize: 3,
    layout: [
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS,
      BlockType.BOOK,        BlockType.BOOK,        BlockType.BOOK,
      BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS, BlockType.WOOD_PLANKS,
    ],
    desc: '3 Livros no centro entre 6 Tábuas de Madeira (Aumenta o poder da Mesa de Encantamentos).',
    check: (grid, w, h) => {
      if (w !== 3 || h !== 3) return false;
      return (
        grid[0] === BlockType.WOOD_PLANKS && grid[1] === BlockType.WOOD_PLANKS && grid[2] === BlockType.WOOD_PLANKS &&
        grid[3] === BlockType.BOOK && grid[4] === BlockType.BOOK && grid[5] === BlockType.BOOK &&
        grid[6] === BlockType.WOOD_PLANKS && grid[7] === BlockType.WOOD_PLANKS && grid[8] === BlockType.WOOD_PLANKS
      );
    },
  },
];

export function evaluateCrafting(grid, width, height) {
  const gridTypes = grid.map(v => (v && typeof v === 'object') ? (v.type || 0) : (v || 0));
  for (const recipe of RECIPE_CATALOG) {
    if (recipe.check(gridTypes, width, height)) {
      return { result: recipe.result, count: recipe.count, name: recipe.name };
    }
  }
  return null;
}

// ── 3×3 Crafting Table UI Modal ────────────────────────────

export function initCraftingTable() {
  if (craftingTableModal) return;

  craftingTableModal = document.createElement('div');
  craftingTableModal.id = 'crafting-table-modal';
  craftingTableModal.className = 'fixed inset-0 z-[150] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none';

  craftingTableModal.innerHTML = `
    <div class="glass-panel w-full max-w-xl bg-surface/90 backdrop-blur-xl border border-outline-variant rounded-xl shadow-[0_0_30px_rgba(15,21,14,0.9)] overflow-hidden p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">construction</span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase font-bold">Bancada de Trabalho (3×3)</h2>
        </div>
        <div class="flex items-center gap-3">
          <button id="open-recipe-book-table" class="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 px-3 py-1.5 rounded-lg text-xs font-label-caps flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(120,220,119,0.2)] cursor-pointer">
            <span class="material-symbols-outlined text-sm">menu_book</span>
            <span>Receitas</span>
          </button>
          <button id="close-table-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- Crafting Matrix & Output Area -->
      <div class="flex items-center justify-center gap-6 mb-6 bg-surface-container/50 p-6 rounded-xl border border-outline-variant">
        <!-- 3×3 Grid -->
        <div id="table-craft-grid" class="grid grid-cols-3 gap-2"></div>

        <!-- Arrow -->
        <div class="flex items-center justify-center">
          <span class="material-symbols-outlined text-4xl text-primary drop-shadow-[0_0_8px_rgba(120,220,119,0.6)]">east</span>
        </div>

        <!-- Output Slot -->
        <div class="flex flex-col items-center gap-2">
          <div id="table-output-slot" class="w-20 h-20 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-[0_0_16px_rgba(120,220,119,0.5)] flex items-center justify-center cursor-pointer relative" title="Clique para coletar o produto forjado"></div>
          <span class="font-label-caps text-[11px] text-primary uppercase font-semibold">PRODUTO</span>
        </div>
      </div>

      <!-- Player Quick Hotbar Transfer -->
      <div class="pt-4 border-t border-outline-variant/60">
        <span class="font-label-caps text-xs text-secondary uppercase font-semibold block mb-2">Seu Inventário (Botão Esq: Pegar/Colocar • Botão Dir: Colocar 1)</span>
        <div id="table-hotbar-grid" class="grid grid-cols-9 gap-2"></div>
      </div>
    </div>
  `;

  document.body.appendChild(craftingTableModal);

  document.getElementById('close-table-btn').addEventListener('click', closeCraftingTable);
  document.getElementById('open-recipe-book-table').addEventListener('click', openRecipeBook);

  initRecipeBook();
  renderCraftingTableGrid();
}

export function openCraftingTable() {
  if (!craftingTableModal) initCraftingTable();
  craftingTableModal.style.display = 'flex';
  openWindow(UIWindow.CRAFTING_TABLE);
  playInventorySound(true);
  updateTableCraftingOutput();
  renderCraftingTableGrid();
}

export function closeCraftingTable() {
  if (!craftingTableModal) return;
  craftingTableModal.style.display = 'none';
  closeWindow(UIWindow.CRAFTING_TABLE);
  playInventorySound(false);

  // Return floating cursor item to player inventory
  if (cursorItem.type > 0 && cursorItem.count > 0) {
    addItemToInventory(cursorItem.type, cursorItem.count);
    clearCursorItem();
  }

  // Return any remaining items in the table to player inventory
  for (let i = 0; i < 9; i++) {
    const item = tableSlots[i];
    if (item && item.type > 0 && item.count > 0) {
      addItemToInventory(item.type, item.count);
      tableSlots[i] = { type: 0, count: 0 };
    }
  }

  updateTableCraftingOutput();
}

export function isCraftingTableOpen() {
  return isWindowOpen(UIWindow.CRAFTING_TABLE);
}

export function renderCraftingTableGrid() {
  const gridEl = document.getElementById('table-craft-grid');
  const outputEl = document.getElementById('table-output-slot');
  const hotbarEl = document.getElementById('table-hotbar-grid');
  if (!gridEl || !outputEl || !hotbarEl) return;

  // 1. Render 3×3 Grid
  gridEl.innerHTML = '';
  tableSlots.forEach((slotData, idx) => {
    const slot = document.createElement('div');
    slot.className = 'slot w-14 h-14 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer relative transition-all';

    const item = slotData || { type: 0, count: 0 };
    if (item.type > 0 && item.count > 0) {
      const icon = createBlockIconCanvas(item.type, 38);
      if (icon) slot.appendChild(icon);

      if (item.count > 1) {
        const badge = document.createElement('span');
        badge.className = 'absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]';
        badge.textContent = item.count;
        slot.appendChild(badge);
      }
    }

    const slotRef = {
      get: () => tableSlots[idx] || { type: 0, count: 0 },
      set: (type, count) => {
        tableSlots[idx] = { type, count: type === 0 ? 0 : count };
        updateTableCraftingOutput();
      },
    };

    slot.addEventListener('mousedown', (e) => handleSlotClick(slotRef, e, renderCraftingTableGrid));
    slot.addEventListener('contextmenu', (e) => e.preventDefault());
    bindSlotTooltip(slot, slotRef.get);

    gridEl.appendChild(slot);
  });

  // 2. Render Output Slot
  outputEl.innerHTML = '';
  if (currentTableOutput && currentTableOutput.result > 0) {
    const icon = createBlockIconCanvas(currentTableOutput.result, 48);
    if (icon) outputEl.appendChild(icon);

    if (currentTableOutput.count > 1) {
      const badge = document.createElement('span');
      badge.className = 'absolute -top-2 -right-2 bg-primary text-on-primary font-label-caps text-xs px-2 py-0.5 rounded shadow font-bold';
      badge.textContent = currentTableOutput.count;
      outputEl.appendChild(badge);
    }
  }
  bindSlotTooltip(outputEl, () => ({ type: currentTableOutput?.result || 0, count: currentTableOutput?.count || 0 }));

  outputEl.onmousedown = (e) => {
    e.preventDefault();
    if (currentTableOutput && currentTableOutput.result > 0) {
      const resultType = currentTableOutput.result;
      const resultCount = currentTableOutput.count;

      if (e.shiftKey) {
        // Shift click: craft into inventory directly
        if (addItemToInventory(resultType, resultCount)) {
          playCraftSound();
          for (let i = 0; i < 9; i++) {
            if (tableSlots[i].count > 1) {
              tableSlots[i].count -= 1;
            } else {
              tableSlots[i] = { type: 0, count: 0 };
            }
          }
          updateTableCraftingOutput();
          renderCraftingTableGrid();
        }
      } else {
        // Normal click: pick up into cursor
        const maxStack = getMaxStack(resultType);
        if (cursorItem.type === 0) {
          setCursorItem(resultType, resultCount);
          playCraftSound();
          for (let i = 0; i < 9; i++) {
            if (tableSlots[i].count > 1) {
              tableSlots[i].count -= 1;
            } else {
              tableSlots[i] = { type: 0, count: 0 };
            }
          }
          updateTableCraftingOutput();
          renderCraftingTableGrid();
        } else if (cursorItem.type === resultType && cursorItem.count + resultCount <= maxStack) {
          cursorItem.count += resultCount;
          updateCursorVisual();
          playCraftSound();
          for (let i = 0; i < 9; i++) {
            if (tableSlots[i].count > 1) {
              tableSlots[i].count -= 1;
            } else {
              tableSlots[i] = { type: 0, count: 0 };
            }
          }
          updateTableCraftingOutput();
          renderCraftingTableGrid();
        }
      }
    }
  };
  outputEl.oncontextmenu = (e) => e.preventDefault();

  // 3. Render Quick Hotbar (Player inventory slots 0..8)
  hotbarEl.innerHTML = '';
  for (let idx = 0; idx < 9; idx++) {
    const slot = document.createElement('div');
    slot.className = 'slot w-full h-11 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer transition-all relative';

    const item = inventorySlots[idx] || { type: 0, count: 0 };
    if (item.type > 0 && item.count > 0) {
      const icon = createBlockIconCanvas(item.type, 30);
      if (icon) slot.appendChild(icon);
      slot.title = `${ITEM_NAMES[item.type] || 'Item'}`;

      if (item.count > 1) {
        const badge = document.createElement('span');
        badge.className = 'absolute bottom-0.5 right-1 font-label-caps text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]';
        badge.textContent = item.count;
        slot.appendChild(badge);
      }
    }

    const slotRef = {
      get: () => inventorySlots[idx] || { type: 0, count: 0 },
      set: (type, count) => {
        inventorySlots[idx] = { type, count: type === 0 ? 0 : count };
      },
      onShiftClick: (type, count) => {
        // Shift click from player inventory into first available 3x3 slot
        const emptyIdx = tableSlots.findIndex(s => s.type === 0 || s.count === 0);
        if (emptyIdx !== -1) {
          tableSlots[emptyIdx] = { type, count };
          inventorySlots[idx] = { type: 0, count: 0 };
          updateTableCraftingOutput();
          renderCraftingTableGrid();
        }
      },
    };

    slot.addEventListener('mousedown', (e) => handleSlotClick(slotRef, e, renderCraftingTableGrid));
    slot.addEventListener('contextmenu', (e) => e.preventDefault());
    bindSlotTooltip(slot, slotRef.get);

    hotbarEl.appendChild(slot);
  }
}

export function updateTableCraftingOutput() {
  currentTableOutput = evaluateCrafting(tableSlots, 3, 3);
}

// ── Interactive Recipe Book (❓ Guia de Receitas) ──────────────

export function initRecipeBook() {
  if (recipeBookModal) return;

  recipeBookModal = document.createElement('div');
  recipeBookModal.id = 'recipe-book-modal';
  recipeBookModal.className = 'fixed inset-0 z-[200] hidden items-center justify-center p-4 bg-black/70 backdrop-blur-lg select-none';

  recipeBookModal.innerHTML = `
    <div class="glass-panel w-full max-w-2xl max-h-[85vh] bg-surface/95 backdrop-blur-2xl border border-primary/40 rounded-xl shadow-[0_0_40px_rgba(120,220,119,0.2)] overflow-hidden flex flex-col p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter uppercase font-bold">Livro de Receitas (Guia de Fabricação)</h2>
        </div>
        <button id="close-recipe-book-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="font-label-caps text-xs text-on-surface-variant mb-4">
        Veja como organizar os blocos e materiais na grade para forjar cada item:
      </div>

      <!-- Recipe Cards List -->
      <div id="recipe-cards-container" class="overflow-y-auto max-h-[60vh] pr-2 flex flex-col gap-3"></div>
    </div>
  `;

  document.body.appendChild(recipeBookModal);

  document.getElementById('close-recipe-book-btn').addEventListener('click', closeRecipeBook);

  renderRecipeCards();
}

function renderRecipeCards() {
  const container = document.getElementById('recipe-cards-container');
  if (!container) return;

  container.innerHTML = '';

  RECIPE_CATALOG.forEach(r => {
    const card = document.createElement('div');
    card.className = 'flex items-center justify-between bg-surface-container/60 p-3.5 rounded-xl border border-outline-variant hover:border-primary/50 transition-all';

    // Left: Result Icon + Name + Description
    const leftDiv = document.createElement('div');
    leftDiv.className = 'flex items-center gap-3.5 max-w-[340px]';

    const resultBox = document.createElement('div');
    resultBox.className = 'w-12 h-12 rounded-xl bg-surface-container-lowest border-2 border-primary flex items-center justify-center relative shrink-0 shadow-[0_0_8px_rgba(120,220,119,0.3)]';
    const resultIcon = createBlockIconCanvas(r.result, 36);
    resultBox.appendChild(resultIcon);
    if (r.count > 1) {
      const countTag = document.createElement('span');
      countTag.className = 'absolute -bottom-1 -right-1 bg-primary text-on-primary font-label-caps text-[10px] font-bold px-1 rounded';
      countTag.textContent = r.count;
      resultBox.appendChild(countTag);
    }
    leftDiv.appendChild(resultBox);

    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
      <div class="font-headline-lg-mobile text-sm font-bold text-on-surface">${r.name}</div>
      <div class="font-label-caps text-[10px] font-semibold text-primary uppercase mb-0.5">${r.category}</div>
      <div class="font-body-md text-xs text-on-surface-variant leading-snug">${r.desc}</div>
    `;
    leftDiv.appendChild(infoDiv);

    // Right: Visual Grid Layout (2×2 or 3×3)
    const rightDiv = document.createElement('div');
    rightDiv.className = 'flex flex-col items-center gap-1 shrink-0';

    const gridLabel = document.createElement('span');
    gridLabel.className = 'font-label-caps text-[9px] font-bold text-on-surface-variant uppercase tracking-wider';
    gridLabel.textContent = `Grade ${r.gridSize}×${r.gridSize}`;
    rightDiv.appendChild(gridLabel);

    const miniGrid = document.createElement('div');
    const cols = r.gridSize;
    miniGrid.className = `grid grid-cols-${cols} gap-1 bg-surface-container-lowest p-1.5 rounded-lg border border-outline-variant`;
    miniGrid.style.gridTemplateColumns = `repeat(${cols}, 28px)`;

    r.layout.forEach(itemType => {
      const miniSlot = document.createElement('div');
      miniSlot.className = 'w-7 h-7 rounded bg-surface-container/80 border border-outline-variant/60 flex items-center justify-center';
      if (itemType > 0) {
        const miniIcon = createBlockIconCanvas(itemType, 22);
        miniSlot.appendChild(miniIcon);
        miniSlot.title = ITEM_NAMES[itemType] || '';
      }
      miniGrid.appendChild(miniSlot);
    });

    rightDiv.appendChild(miniGrid);

    card.appendChild(leftDiv);
    card.appendChild(rightDiv);
    container.appendChild(card);
  });
}

export function openRecipeBook() {
  if (!recipeBookModal) initRecipeBook();
  recipeBookModal.style.display = 'flex';
  openWindow(UIWindow.RECIPE_BOOK);
}

export function closeRecipeBook() {
  if (!recipeBookModal) return;
  recipeBookModal.style.display = 'none';
  closeWindow(UIWindow.RECIPE_BOOK);
}

