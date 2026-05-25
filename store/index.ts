import { WorkEntry } from "@/types";
import { create } from "zustand";

interface WorksStore {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  edit: WorkEntry | null;
  workEdit: (work: WorkEntry) => void;
  resetEdit: () => void;
  closeForm: () => void;
}

export const useWorksStore = create<WorksStore>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
  edit: null,
  workEdit: (work) => set({ edit: work, open: true }),
  closeForm: () => set({ open: false }),
  resetEdit: () => set({ edit: null }),
}));
