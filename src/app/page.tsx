import type { ReactElement } from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { HomeClient } from "./page.client";
import { getUsersQuery } from "#/lib/actions/user";

export default async function Home(): Promise<ReactElement> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUsersQuery);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}