import type { ReactElement } from "react";
import { HomeClient } from "./page.client";
import { getUsersQuery } from "#/lib/actions/user";
import { HydrationBoundary } from "#/lib/providers/hydration-boundary";

export default function Home(): ReactElement {
  return (
    <HydrationBoundary queries={[getUsersQuery()]}>
      <HomeClient />
    </HydrationBoundary>
  );
}