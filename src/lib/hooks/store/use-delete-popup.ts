import { atom, useAtom } from "jotai";

const deletePopupOpenAtom = atom(false);

export function useConfettiStore() {
  const [open, setOpen] = useAtom(deletePopupOpenAtom);

  return {
    isOpen: open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  };
}
