import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { worksTypeOptions } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const WorksType = ({
  value,
  onChange,
  error,
}: {
  value?: number | null;
  onChange: (value: number | null) => void;
  error?: boolean;
}) => {
  const { data } = useSuspenseQuery(worksTypeOptions());

  const items = useMemo(() => {
    return data ? data.map(({ id, name }) => ({ value: id, label: name })) : [];
  }, [data]);

  return (
    <Select items={items} value={value} onValueChange={onChange}>
      <SelectTrigger
        id="works-work-type"
        className="w-full"
        aria-invalid={error}
      >
        <SelectValue placeholder="Выберите тип работ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WorksType;
