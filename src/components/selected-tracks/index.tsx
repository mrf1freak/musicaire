import { type Track } from "~/types/track";
import { BiMinus } from "react-icons/bi";

export default function SelectedTracks({
  tracks,
  onRemove,
}: {
  tracks: Track[];
  onRemove: (track: { id: string }) => void;
}) {
  return (
    <div className="flex gap-4">
      {tracks.map(({ id, name, album: { images } }) => (
        <div
          className="group relative flex items-center rounded-lg bg-gray-50 shadow"
          key={id}
        >
          <img
            className="h-12 w-12 overflow-hidden rounded object-cover"
            src={images[0]?.url}
            alt={name}
          />
          <button
            className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 shadow transition hover:bg-red-500 hover:text-white group-hover:opacity-100"
            onClick={() => onRemove({ id })}
          >
            <BiMinus className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
