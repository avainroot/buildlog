export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const WORK_UNIT = {
  M3: "м³",
  TONS: "т",
  HOURS: "ч",
  PIECES: "шт",
};

export const WORK_UNIT_ITEMS = Object.values(WORK_UNIT).map((unit) => ({
  value: unit,
  label: unit,
}));
