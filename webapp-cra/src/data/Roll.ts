export const Roll = {
  D20: (count?: number) => ({ faces: 20, count: count ?? 1 }),
  D12: (count?: number) => ({ faces: 12, count: count ?? 1 }),
  D10: (count?: number) => ({ faces: 10, count: count ?? 1 }),
  D6: (count?: number) => ({ faces: 6, count: count ?? 1 }),
  D4: (count?: number) => ({ faces: 4, count: count ?? 1 }),
  Flat: (count?: number) => ({ faces: 1, count: count ?? 1 }),
};
