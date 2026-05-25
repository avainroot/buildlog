import { WorksDialog } from "@/components/Works";
import { Journal } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 py-3 px-4 bg-card/50 backdrop-blur-sm rounded-b-2xl flex justify-between items-center">
      <div className="text-xs uppercase flex items-center gap-2">
        <HugeiconsIcon icon={Journal} size={22} />
        Журнал работ
      </div>
      <WorksDialog />
    </header>
  );
};

export default Header;
