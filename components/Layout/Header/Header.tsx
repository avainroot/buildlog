import { Button } from "@/components/ui/button";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 py-3 px-4 bg-card backdrop-blur-sm rounded-b-2xl flex justify-between">
      <div className="text-lg font-bold">Build Log</div>
      <Button variant="outline" size="icon">
        <HugeiconsIcon icon={Add01Icon} />
      </Button>
    </header>
  );
};

export default Header;
