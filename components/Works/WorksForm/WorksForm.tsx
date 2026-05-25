import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WorkEntryInput, WorkEntrySchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useController,
} from "react-hook-form";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import WorksType from "./WorksType";
import WorksUnit from "./WorksUnit";
import { WORK_UNIT } from "@/lib/constants";
import useWorks from "@/hooks/useWorks";
import { WorkEntry } from "@/types";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WorksForm = ({ workEdit }: { workEdit: WorkEntry | null }) => {
  const currentDay = new Date().toISOString();

  const form = useForm<WorkEntryInput>({
    defaultValues: workEdit
      ? {
          ...workEdit,
          ...{ date: String(workEdit.date) },
        }
      : {
          date: currentDay,
          workTypeId: 0,
          volume: 0,
          unit: WORK_UNIT.M3,
          executorName: "",
        },
    resolver: zodResolver(WorkEntrySchema),
  });

  const {
    field: { onChange: volumeFieldOnChange, ...volumeField },
    fieldState: volumeFieldState,
  } = useController({
    name: "volume",
    control: form.control,
  });
  const { field: unitField, fieldState: unitFieldState } = useController({
    name: "unit",
    control: form.control,
  });

  const { work, addPending, savePending } = useWorks();

  const onSubmit: SubmitHandler<WorkEntryInput> = (data) => {
    if (workEdit) {
      work.save({ id: workEdit.id, data });
    } else {
      work.add(data);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {workEdit
            ? "Редактировать запись в журнале"
            : "Добавить запись в журнал"}
        </DialogTitle>
        <DialogDescription>
          Форма для создания/редактирования записи в журнале строительных работ.
          Здесь вы можете указать дату, тип работы, объем и единицу измерения.
        </DialogDescription>
      </DialogHeader>
      <form id="works-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="workTypeId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="works-work-type">
                  Наименование работ
                </FieldLabel>
                <WorksType
                  value={field.value || null}
                  onChange={field.onChange}
                  error={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="date"
            control={form.control}
            render={({ field: { value, onChange }, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="works-date">
                    Дата выполнения работ
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      id="works-date"
                      render={
                        <Button
                          variant="outline"
                          data-empty={!value}
                          className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                        />
                      }
                    >
                      <HugeiconsIcon icon={CalendarIcon} className="mr-2" />
                      {value ? (
                        format(value, "PPP", { locale: ru })
                      ) : (
                        <span>Укажите дату</span>
                      )}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        defaultMonth={value ? new Date(value) : undefined}
                        onSelect={(e) =>
                          onChange(e ? e.toISOString() : undefined)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              );
            }}
          />

          <Field data-invalid={volumeFieldState.invalid}>
            <FieldLabel htmlFor="works-volume">
              Объем и единица измерения
            </FieldLabel>
            <div className="flex items-center gap-2">
              <Input
                {...volumeField}
                id="works-volume"
                aria-invalid={volumeFieldState.invalid}
                placeholder="Объем работ"
                onChange={(e) =>
                  volumeFieldOnChange(Number(e.target.value) || 0)
                }
                autoComplete="off"
                className="flex-1"
              />
              <WorksUnit
                value={unitField.value || null}
                onChange={unitField.onChange}
                error={unitFieldState.invalid}
              />
            </div>
            {volumeFieldState.invalid && (
              <FieldError errors={[volumeFieldState.error]} />
            )}
          </Field>

          <Controller
            name="executorName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="works-executor-name">
                  Исполнитель
                </FieldLabel>
                <Input
                  {...field}
                  id="works-executor-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="ФИО исполнителя"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Field orientation="horizontal" className="justify-end">
          {workEdit ? (
            <Button type="submit" className="mt-4" disabled={savePending}>
              Сохранить изменения
            </Button>
          ) : (
            <Button type="submit" className="mt-4" disabled={addPending}>
              Добавить запись
            </Button>
          )}
        </Field>
      </form>
    </>
  );
};

export default WorksForm;
