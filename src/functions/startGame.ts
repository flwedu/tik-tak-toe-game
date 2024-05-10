import { renderGrid } from "../components/grid";
import { GameController } from "../control/GameController";
import { initClickListeners } from "./initClickListeners";

const gameController = new GameController({
	player1: {
		content: "❤️",
	},
	player2: {
		content: "✅",
	},
});

export function startGame(gridHtmlDiv: HTMLDivElement | null) {
	if (!gridHtmlDiv) return;

	renderGrid(gridHtmlDiv, gameController);
	initClickListeners(gridHtmlDiv, gameController, renderGrid);
}
