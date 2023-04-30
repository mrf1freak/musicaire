import { type NextPage } from "next";
import { api } from "~/trpc/api";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

const Home: NextPage = () => {
  type Track = (typeof tracks)[number];

  const [query, setQuery] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [debouncedQuery] = useDebouncedValue(query, 750);
  const { data: tracks = [] } = api.spotify.searchTracks.useQuery(
    { query: debouncedQuery },
    { enabled: !!debouncedQuery }
  );
  function addTrack(track: Track) {
    setSelectedTracks([...selectedTracks, track]);
  }
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {tracks.map((track) => (
        <button
          className="block"
          onClick={() => addTrack(track)}
          key={track.id}
        >
          {track.name}
        </button>
      ))}
      <div>
        Selected Tracks
        {selectedTracks.map((track) => (
          <div key={track.id}>{track.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
