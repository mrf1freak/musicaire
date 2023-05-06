import { type Track } from "~/types/track";
import { BiMinus } from "react-icons/bi";

export default function SelectedTracks({
  tracks,
  onRemove,
}: {
  tracks: Track[];
  onRemove: (track: Track) => void;
}) {
  return (
    <div className="fixed left-6 top-6 flex flex-col gap-4">
      {tracks.map(({ id, name, artists, album: { images } }) => (
        <div
          className="group relative flex items-center rounded-lg bg-gray-50 shadow"
          key={id}
        >
          <img
            className="h-12 w-12 object-cover"
            src={images[0]?.url}
            alt={name}
          />
          <div className="px-2 opacity-80">
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs">
              {artists.map(({ name }) => name).join(", ")}
            </div>
          </div>
          <button
            className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 opacity-0 shadow transition hover:bg-red-500 hover:text-white group-hover:opacity-100"
            onClick={() => onRemove({ id, name, artists, album: { images } })}
          >
            <BiMinus className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
