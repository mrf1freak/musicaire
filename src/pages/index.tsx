import { type NextPage } from "next";
import { api } from "~/trpc/api";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 750);
  const { data: tracks = [] } = api.spotify.searchTracks.useQuery(
    { query: debouncedQuery },
    { enabled: !!debouncedQuery }
  );
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {tracks.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default Home;
