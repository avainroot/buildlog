import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useWorks from "@/hooks/useWorks";
import { useWorksStore } from "@/store";
import { WorkEntry } from "@/types";
import { Edit, Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const WorkTableAction = ({ dataWork }: { dataWork: WorkEntry }) => {
  const { work, deletePending } = useWorks();
  const workEdit = useWorksStore((state) => state.workEdit);

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => workEdit(dataWork)}
        size="icon"
        variant="ghost"
        disabled={deletePending}
        title="Редактировать запись"
      >
        <HugeiconsIcon icon={Edit} size={18} />
      </Button>

      <Button
        onClick={() => work.delete({ id: dataWork.id })}
        size="icon"
        variant="ghost"
        className="text-destructive"
        disabled={deletePending}
        title="Удалить запись"
      >
        {deletePending ? <Spinner /> : <HugeiconsIcon icon={Trash} size={18} />}
      </Button>
    </div>
  );
};

export default WorkTableAction;
