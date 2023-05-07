import { Dialog } from "@headlessui/react";
import TrackSearch, { type TrackSearchProps } from "~/components/track-search";

interface Props extends TrackSearchProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function TrackSearchModal({ open, setOpen, onSelect }: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative">
      <div className="fixed inset-0 mt-36 flex w-full justify-center">
        <Dialog.Panel className="mx-auto w-full max-w-xl px-6">
          <TrackSearch onSelect={onSelect} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
