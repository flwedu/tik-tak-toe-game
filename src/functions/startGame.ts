import { renderGrid } from "../components/grid";
import type { GameController } from "../control/GameController";
import { initClickListeners } from "./initClickListeners";

export function startGame(
	gridHtmlDiv: HTMLElement | null,
	gameController: GameController,
) {
	if (!gridHtmlDiv) return;

	renderGrid(gridHtmlDiv, gameController);
	initClickListeners(gridHtmlDiv, gameController, renderGrid);
}
