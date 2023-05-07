import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { api } from "~/trpc/api";
import { type Track } from "~/types/track";
import { Combobox } from "@headlessui/react";

export type TrackSearchProps = {
  onSelect: (track: Track) => void;
};

export default function TrackSearch({ onSelect }: TrackSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 750);
  const { data: tracks = [] } = api.spotify.searchTracks.useQuery(
    { query: debouncedQuery },
    { enabled: !!debouncedQuery }
  );

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
            <Combobox.Option key={track.id} value={track}>
              {({ active }) => (
                <div
                  className={`flex flex-1 items-center overflow-hidden ${
                    active ? "bg-gray-50" : ""
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
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
