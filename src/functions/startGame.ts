import { renderGrid } from "../components/grid";
import type { GameController } from "../control/GameController";
import { initClickListeners } from "./initClickListeners";

export function startGame(
	gridHtmlDiv: HTMLElement | null,
	formHtmlElement: HTMLElement | null,
	gameController: GameController,
) {
	if (!gridHtmlDiv || !formHtmlElement) return;

	formHtmlElement.classList.add("disabled");
	gridHtmlDiv.classList.remove("disabled");
	renderGrid(gridHtmlDiv, gameController);
	initClickListeners(gridHtmlDiv, gameController, renderGrid);
}
