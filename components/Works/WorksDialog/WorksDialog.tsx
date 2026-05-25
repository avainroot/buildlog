"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import WorksForm from "../WorksForm/WorksForm";
import { useWorksStore } from "@/store";

const WorksDialog = () => {
  const { open, onOpenChange, edit, resetEdit } = useWorksStore();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={() => !open && resetEdit()}
    >
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" size="icon">
            <HugeiconsIcon icon={Add01Icon} />
          </Button>
        )}
      />
      <DialogContent>
        <WorksForm workEdit={edit} />
      </DialogContent>
    </Dialog>
  );
};

export default WorksDialog;
