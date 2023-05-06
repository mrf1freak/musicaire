import { type Track } from "~/types/track";
import Typewriter from "typewriter-effect";

export type SuggestionsProps = {
  comment: string;
  tracks: Track[];
};
export default function Suggestions({ comment, tracks }: SuggestionsProps) {
  return (
    <div className="flex max-w-7xl flex-col items-center gap-4">
      <div className="my-6 max-w-3xl text-center text-4xl font-medium">
        <Typewriter
          options={{ delay: 20 }}
          onInit={(tw) => {
            tw.typeString(comment).start();
          }}
        />
      </div>
      <div className="w-[35rem] divide-y">
        {tracks.map(({ id, name, album: { images }, artists }) => (
          <div className="flex items-center gap-5 py-8" key={id}>
            <img src={images[0]?.url} className="h-28 w-28" alt={name} />
            <div>
              <div className="text-2xl font-medium">{name}</div>
              <div className="font-medium opacity-50">
                {artists.map(({ name }) => name).join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
