import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateCommentAboutTracks, generateTrackSuggestions } from "~/openai";
import { searchTracks } from "~/spotify";

export const openaiRouter = createTRPCRouter({
  getSuggestions: publicProcedure
    .input(
      z.array(
        z.object({
          name: z.string(),
          artists: z.array(z.object({ name: z.string() })),
        })
      )
    )
    .mutation(async ({ input: tracks }) => {
      const humanReadableTracks = tracks
        .map(({ name, artists }) => `${name} by ${artists[0]?.name || ""}`)
        .join("\n");
      const comment = await generateCommentAboutTracks(humanReadableTracks);

      const trackSuggestions = await generateTrackSuggestions(
        humanReadableTracks
      );
      const trackDetails = (
        await Promise.all(trackSuggestions.map(searchTracks))
      )
        .map((tracks) => tracks[0])
        .filter((track): track is Exclude<typeof track, undefined> =>
          Boolean(track)
        );
      return { comment, tracks: trackDetails };
    }),
});
