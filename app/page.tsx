import { WorksList } from "@/components/Works";
import { worksOptions, worksTypeOptions } from "@/lib/api";
import { getQueryClient } from "@/lib/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(worksTypeOptions());
  void queryClient.prefetchQuery(worksOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorksList />
    </HydrationBoundary>
  );
}
