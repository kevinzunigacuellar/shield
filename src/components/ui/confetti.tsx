"use client";

import { useEffect } from "react";
import JSConfetti from "js-confetti";

export function Confetti() {
  useEffect(() => {
    const confetti = new JSConfetti();
    confetti.addConfetti();
    return () => {
      confetti.clearCanvas();
    };
  }, []);

  return null;
}
