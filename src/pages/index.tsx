import { type NextPage } from "next";
import { api } from "~/trpc/api";
import { useState } from "react";
import SelectedTracks from "~/components/selected-tracks";
import { type Track } from "~/types/track";
import SuggestionsContainer from "~/components/suggestions-container";
import TrackSearchModal from "~/components/track-search-modal";

const Home: NextPage = () => {
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [openTrackSearch, setOpenTrackSearch] = useState(false);

  const {
    mutate,
    data: suggestions,
    isLoading: isLoadingSuggestions,
  } = api.openai.getSuggestions.useMutation();

  function addTrack(track: Track) {
    if (selectedTracks.some(({ id }) => id == track.id)) return;

    setSelectedTracks([...selectedTracks, track]);
    setOpenTrackSearch(false);
  }

  function removeTrack(track: { id: string }) {
    setSelectedTracks(selectedTracks.filter(({ id }) => id != track.id));
  }

  return (
    <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center justify-center px-10">
      <div className="h-14">
        <SelectedTracks
          tracks={selectedTracks}
          onRemove={removeTrack}
          onAdd={() => setOpenTrackSearch(true)}
        />
      </div>
      <button
        className="my-12 rounded-lg bg-primary px-6 py-2 font-medium text-white shadow transition hover:shadow-lg"
        onClick={() => mutate(selectedTracks)}
      >
        Recommend Songs
      </button>

      {isLoadingSuggestions ? (
        <div>Loading...</div>
      ) : (
        <SuggestionsContainer
          suggestions={suggestions}
          isLoading={isLoadingSuggestions}
        />
      )}
      <TrackSearchModal
        open={openTrackSearch}
        setOpen={setOpenTrackSearch}
        onSelect={addTrack}
      />
    </div>
  );
};

export default Home;
