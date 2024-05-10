import type { GameController } from "../control/GameController";

export function initClickListeners(
	gridHtmlDiv: HTMLDivElement,
	gameController: GameController,
	renderCallback: (
		gridHtmlDiv: HTMLDivElement,
		gameController: GameController,
	) => void,
) {
	gridHtmlDiv.addEventListener("click", (e) => {
		const target = e.target as HTMLDivElement;
		if (!target.classList.contains("grid-button")) return;

		const value = target.dataset.value;
		gameController.registerMove(value);
		renderCallback(gridHtmlDiv, gameController);
	});
}
