import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

export type Track =
  inferRouterOutputs<AppRouter>["spotify"]["searchTracks"][number];
