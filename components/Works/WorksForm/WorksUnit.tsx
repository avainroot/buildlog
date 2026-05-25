import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORK_UNIT_ITEMS } from "@/lib/constants";

const WorksUnit = ({
  value,
  onChange,
  error,
}: {
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: boolean;
}) => {
  return (
    <Select items={WORK_UNIT_ITEMS} value={value} onValueChange={onChange}>
      <SelectTrigger id="works-work-type" className="w-20" aria-invalid={error}>
        <SelectValue placeholder="Выберите тип работ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {WORK_UNIT_ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WorksUnit;
