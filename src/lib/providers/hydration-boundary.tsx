import type { PropsWithChildren, ReactElement } from "react";
import type { UseQueryOptions } from "@tanstack/react-query";
import { HydrationBoundary as HB, QueryClient, dehydrate } from "@tanstack/react-query";

type Props = PropsWithChildren & {
  queries: UseQueryOptions[];
}

export async function HydrationBoundary({ queries, children }: Props): Promise<ReactElement> {
  const queryClient = new QueryClient();

  await Promise.all(queries.map(query => queryClient.prefetchQuery(query)));

  return (
    <HB state={dehydrate(queryClient)}>
      {children}
    </HB>
  );
}