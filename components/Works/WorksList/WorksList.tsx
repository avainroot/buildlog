"use client";

import { worksOptions } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import WorksTable from "../WorksTable/WorksTable";

const WorksList = () => {
  const { data: works } = useSuspenseQuery(worksOptions());

  if (!works?.length) {
    return (
      <div className="text-muted-foreground text-center py-4">Нет данных</div>
    );
  }

  return <WorksTable data={works} />;
};

export default WorksList;
