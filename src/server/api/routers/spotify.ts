import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { searchTracks } from "~/spotify";

export const spotifyRouter = createTRPCRouter({
  searchTracks: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      return await searchTracks(input.query);
    }),
});
