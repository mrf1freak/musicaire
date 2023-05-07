import { Dialog } from "@headlessui/react";
import TrackSearch, { type TrackSearchProps } from "~/components/track-search";

interface Props extends TrackSearchProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function TrackSearchModal({ open, setOpen, onSelect }: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="">
      <div className="fixed inset-0 flex w-full justify-center bg-black/20 pt-36">
        <Dialog.Panel className="mx-auto w-full max-w-xl px-6">
          <TrackSearch onSelect={onSelect} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
