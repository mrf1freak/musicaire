import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { api } from "~/trpc/api";
import { type Track } from "~/types/track";
import { Combobox } from "@headlessui/react";
import { BiCheck } from "react-icons/bi";

export type TrackSearchProps = {
  onSelect: (track: Track) => void;
  selectedTracks?: Track[];
};

export default function TrackSearch({
  onSelect,
  selectedTracks = [],
}: TrackSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 750);
  const { data: tracks = [] } = api.spotify.searchTracks.useQuery(
    { query: debouncedQuery },
    { enabled: !!debouncedQuery }
  );
  const selectedIDs = selectedTracks.map(({ id }) => id);

  return (
    <div className="relative flex-1 rounded-lg shadow-lg">
      <Combobox
        value={query}
        onChange={(value) => onSelect(value as unknown as Track)}
      >
        <Combobox.Input
          className="w-full rounded-lg px-4 py-2 text-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tracks..."
        />
        <Combobox.Options className="absolute inset-x-0 top-11 z-10 flex flex-col rounded-b-lg bg-white shadow">
          {tracks.map((track) => (
            <Combobox.Option
              key={track.id}
              value={track}
              disabled={selectedIDs.includes(track.id)}
            >
              {({ active }) => (
                <div
                  className={`flex flex-1 cursor-pointer items-center overflow-hidden ${
                    selectedIDs.includes(track.id)
                      ? "bg-green-50"
                      : active
                      ? "bg-gray-50"
                      : ""
                  }`}
                  onClick={() => onSelect(track)}
                  key={track.id}
                >
                  <img
                    className="h-16 w-16 object-cover"
                    src={track.album.images[0]?.url}
                    alt={track.name}
                  />
                  <div className="flex-1 pl-6 text-left opacity-80">
                    <div className="text font-medium">{track.name}</div>
                    <div className="text-sm">
                      {track.artists.map(({ name }) => name).join(", ")}
                    </div>
                  </div>
                  {selectedIDs.includes(track.id) && (
                    <BiCheck className="mr-4 h-6 w-6 text-green-600" />
                  )}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
