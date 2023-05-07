import { type NextPage } from "next";
import { api } from "~/trpc/api";
import { useState } from "react";
import SelectedTracks from "~/components/selected-tracks";
import { type Track } from "~/types/track";
import SuggestionsContainer from "~/components/suggestions-container";
import TrackSearchModal from "~/components/track-search-modal";
import { CgSpinnerTwo } from "react-icons/cg";
import Logo from "~/components/logo";
import { scroller } from "react-scroll";

const Home: NextPage = () => {
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [openTrackSearch, setOpenTrackSearch] = useState(false);

  const {
    mutate,
    data: suggestions,
    isLoading: isLoadingSuggestions,
    isSuccess,
  } = api.openai.getSuggestions.useMutation({
    onSuccess: () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      scroller.scrollTo("suggestions_scroll_point", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      }),
  });

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
      <Logo className="xs:w-96 w-64 sm:w-auto" />
      <div className="mb-12 mt-6 text-center text-lg font-medium">
        <p>Discover new music for your library with our AI recommendations.</p>
        <p>Select up to 5 tracks below and search for recommendations</p>
      </div>
      <div className="h-14">
        <SelectedTracks
          tracks={selectedTracks}
          onRemove={removeTrack}
          onAdd={() => setOpenTrackSearch(true)}
        />
      </div>
      <button
        className="mb-12 mt-6 rounded-lg bg-primary px-6 py-2 font-medium text-white shadow transition hover:shadow-lg disabled:opacity-50"
        disabled={isLoadingSuggestions || selectedTracks.length == 0}
        onClick={() => mutate(selectedTracks)}
      >
        {isLoadingSuggestions ? (
          <CgSpinnerTwo className="h-5 w-5 animate-spin" />
        ) : (
          <>Recommend Songs</>
        )}
      </button>

      <div id="suggestions_scroll_point" />
      {!isLoadingSuggestions && isSuccess && (
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
