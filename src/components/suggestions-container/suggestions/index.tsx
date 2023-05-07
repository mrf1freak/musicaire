import { type Track } from "~/types/track";
import Typewriter from "typewriter-effect";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";

export type SuggestionsProps = {
  comment: string;
  tracks: Track[];
};
export default function Suggestions({ comment, tracks }: SuggestionsProps) {
  return (
    <div className="flex max-w-7xl flex-col items-center gap-4">
      <div className="my-6 max-w-5xl text-center text-4xl font-medium">
        <Typewriter
          options={{ delay: 20 }}
          onInit={(tw) => {
            tw.typeString(comment).start();
          }}
        />
      </div>
      <div className="w-full max-w-2xl divide-y">
        {tracks.map(
          ({
            id,
            name,
            album: { images },
            artists,
            external_urls: { spotify },
          }) => (
            <div className="flex items-center gap-5 py-8" key={id}>
              <img src={images[0]?.url} className="h-28 w-28" alt={name} />
              <div className="flex-1">
                <div className="text-2xl font-medium">{name}</div>
                <div className="font-medium opacity-50">
                  {artists.map(({ name }) => name).join(", ")}
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <a
                  href={`https://www.google.com/search?q=${`${name} by ${artists
                    .map(({ name }) => name)
                    .join(", ")}`}`}
                  target="_blank"
                >
                  <AiOutlineGoogle className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURI(
                    `${name} by ${artists.map(({ name }) => name).join(", ")}`
                  )}`}
                  target="_blank"
                >
                  <BsYoutube className="h-4 w-4" />
                </a>
                <a href={spotify} target="_blank">
                  <BsSpotify className="h-4 w-4" />
                </a>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
