import { GRID_BUTTON_CLASS_NAME } from "../components/gridButton";
import type { GameController } from "../control/GameController";

export function initClickListeners(
	gridHtmlDiv: HTMLElement,
	gameController: GameController,
	renderCallback: (
		gridHtmlDiv: HTMLElement,
		gameController: GameController,
	) => void,
) {
	gridHtmlDiv.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		if (!target.classList.contains(GRID_BUTTON_CLASS_NAME)) return;

		const value = target.dataset.value;
		gameController.registerMove(value);
		renderCallback(gridHtmlDiv, gameController);
	});
}
