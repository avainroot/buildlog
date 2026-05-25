import { WorkEntryModel, WorkTypeModel } from "@/app/generated/prisma/models";

export type WorkEntry = WorkEntryModel & { workType: WorkTypeModel };
