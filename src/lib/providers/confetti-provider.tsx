"use client";

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/lib/hooks/store/use-confetti";
import useWindowSize from "@/lib/hooks/use-window-size";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();
  const {
    windowSize: { width, height },
  } = useWindowSize();

  if (!confetti || !width) return null;

  const confettiWindowSizeProps = width && height ? { width, height } : {};

  return (
    <ReactConfetti
      {...confettiWindowSizeProps}
      run={confetti.isOpen}
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      // recycle={true}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};
