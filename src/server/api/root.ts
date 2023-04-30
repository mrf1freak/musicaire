import { createTRPCRouter } from "~/server/api/trpc";
import { spotifyRouter } from "~/server/api/routers/spotify";
import { openaiRouter } from "~/server/api/routers/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  spotify: spotifyRouter,
  openai: openaiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
