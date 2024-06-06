import { atom, useAtom } from "jotai";

const confettiOpenAtom = atom(false);

export function useConfettiStore() {
  const [confetti, setConfetti] = useAtom(confettiOpenAtom);

  return {
    isOpen: confetti,
    onOpen: () => setConfetti(true),
    onClose: () => setConfetti(false),
  };
}
