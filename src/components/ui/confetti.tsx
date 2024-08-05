"use client";

import JSConfetti from "js-confetti";
import { useEffect } from "react";

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
