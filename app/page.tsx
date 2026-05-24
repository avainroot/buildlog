import { WorksList } from "@/components/Works";
import { worksOptions } from "@/lib/api";
import { getQueryClient } from "@/lib/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(worksOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorksList />
    </HydrationBoundary>
  );
}
