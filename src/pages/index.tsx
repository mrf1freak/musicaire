import { type NextPage } from "next";
import { api } from "~/trpc/api";
import { useState } from "react";
import TrackSearch from "~/components/track-search";
import SelectedTracks from "~/components/selected-tracks";
import { type Track } from "~/types/track";
import SuggestionsContainer from "~/components/suggestions-container";

const Home: NextPage = () => {
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

  const {
    mutate,
    data: suggestions,
    isLoading: isLoadingSuggestions,
  } = api.openai.getSuggestions.useMutation();

  function addTrack(track: Track) {
    if (selectedTracks.some(({ id }) => id == track.id)) return;

    setSelectedTracks([...selectedTracks, track]);
  }

  function removeTrack(track: { id: string }) {
    setSelectedTracks(selectedTracks.filter(({ id }) => id != track.id));
  }

  return (
    <div className="mt-36 flex w-full max-w-7xl flex-col items-center justify-center px-10">
      <div className="h-14">
        <SelectedTracks tracks={selectedTracks} onRemove={removeTrack} />
      </div>
      <TrackSearch
        onSelect={addTrack}
        onSearch={() => mutate(selectedTracks)}
      />

      {isLoadingSuggestions ? (
        <div>Loading...</div>
      ) : (
        <SuggestionsContainer
          suggestions={suggestions}
          isLoading={isLoadingSuggestions}
        />
      )}
    </div>
  );
};

export default Home;
