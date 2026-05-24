"use client";

import { worksOptions } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const WorksList = () => {
  const { data: works } = useSuspenseQuery(worksOptions());

  console.log(works);

  return <div className="px-2">WorksList</div>;
};

export default WorksList;
