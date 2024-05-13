import { renderGrid } from "../components/grid";
import type { GameController } from "../control/GameController";
import { initClickListeners } from "./initClickListeners";

interface StartGameParams {
	gridDivRef: HTMLElement | null;
	formRef: HTMLElement | null;
	gameController: GameController;
}

export function startGame({
	gridDivRef,
	gameController,
	formRef,
}: StartGameParams) {
	if (!gridDivRef || !formRef) return;

	gridDivRef.classList.remove("disabled");
	renderGrid(gridDivRef, gameController);

	initClickListeners({
		gridDivRef,
		gameController,
		renderCallback: renderGrid,
	});
}
