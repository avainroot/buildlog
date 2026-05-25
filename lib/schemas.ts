import * as z from "zod";

export const WorkEntrySchema = z.object({
  date: z.string(),
  workTypeId: z.number().int().positive({ message: "Не указан тип работ" }),
  volume: z
    .number({ message: "Объём работ указывается числом" })
    .positive({ message: "Укажите объем работ" }),
  unit: z.string().min(1).max(20),
  executorName: z
    .string()
    .min(1, { message: "Укажите имя исполнителя" })
    .max(100, { message: "Имя исполнителя не должно превышать 100 символов" }),
});

export const UpdateWorkEntrySchema = WorkEntrySchema.partial().extend({
  id: z.number().int().positive(),
});

export type WorkEntryInput = z.infer<typeof WorkEntrySchema>;
export type UpdateWorkEntryInput = z.infer<typeof UpdateWorkEntrySchema>;
