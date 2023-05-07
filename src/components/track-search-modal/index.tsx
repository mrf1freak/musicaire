import { Dialog } from "@headlessui/react";
import TrackSearch, { type TrackSearchProps } from "~/components/track-search";
import { type Track } from "~/types/track";

interface Props extends TrackSearchProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectedTracks?: Track[];
}

export default function TrackSearchModal({
  open,
  setOpen,
  onSelect,
  selectedTracks,
}: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="">
      <div className="fixed inset-0 flex w-full justify-center bg-black/20 pt-36">
        <Dialog.Panel className="mx-auto w-full max-w-xl px-6">
          <TrackSearch onSelect={onSelect} selectedTracks={selectedTracks} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
