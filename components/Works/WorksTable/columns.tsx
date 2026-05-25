"use client";

import { WorkEntry } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import WorkTableAction from "./WorkTableAction";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpDown } from "@hugeicons/core-free-icons";

export const columns: ColumnDef<WorkEntry>[] = [
  {
    accessorKey: "workType.name",
    header: "Тип работ",
  },
  {
    accessorKey: "executorName",
    header: "Исполнитель",
  },
  {
    id: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата
          <HugeiconsIcon icon={ArrowUpDown} size={18} />
        </Button>
      );
    },
    enableSorting: true,
    accessorFn: (row) => new Date(row.date),
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return format(date, "dd.MM.yyyy");
    },
  },
  {
    header: "Объем работ",
    cell: ({ row }) => {
      const volume = row.original.volume;
      const unit = row.original.unit;
      return `${volume} ${unit}`;
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => <WorkTableAction dataWork={row.original} />,
  },
];
