import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export async function chatCompletionReplyFromPrompt(prompt: string) {
  const {
    data: { choices },
  } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt },
    ],
  });
  return choices[0]?.message?.content || "";
}

export async function generateCommentAboutTracks(
  humanReadableTracks: string
): Promise<string> {
  const prompt = `Based on the user's chosen songs below, tell the user about their taste in music in one line. Make it sound friendly and informative\n\n${humanReadableTracks}`;
  return (await chatCompletionReplyFromPrompt(prompt)) || "";
}

export async function generateTrackSuggestions(
  humanReadableTracks: string
): Promise<string[]> {
  const prompt = `Based on the user's chosen songs below, recommend 5 tracks that the user will like. Give one track per line. Format it like this: "TrackName - ArtistName". Do not add your own opinions or comments, reply with only the list of tracks and nothing else.\n\n${humanReadableTracks}`;
  const tracks = await chatCompletionReplyFromPrompt(prompt);
  return tracks
    .split("\n")
    .map((line) => line.split(". ").pop())
    .filter((item: string | undefined): item is string => Boolean(item));
}
