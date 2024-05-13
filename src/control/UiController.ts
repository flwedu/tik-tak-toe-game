import { renderGrid } from "../components/grid.ts";
import { GRID_BUTTON_CLASS_NAME } from "../components/gridButton.ts";
import type { GameController } from "./GameController.ts";

interface UiControllerProps {
	gridDivRef: HTMLElement | null;
	formRef: HTMLElement | null;
	gameController: GameController;
}

export class UiController {
	constructor(private props: UiControllerProps) {}

	startGame() {
		const { formRef, gameController, gridDivRef } = this.props;
		if (!gridDivRef || !formRef) return;

		gridDivRef.classList.remove("disabled");
		renderGrid(gridDivRef, gameController);

		this.initClickListeners(renderGrid);
	}

	endGame() {
		const { formRef, gridDivRef } = this.props;
		gridDivRef?.classList.add("disabled");
		formRef?.classList.remove("disabled");
	}

	initClickListeners(
		renderCallback: (
			gridDivRef: HTMLElement,
			gameController: GameController,
		) => void,
	): void {
		const { gameController, gridDivRef } = this.props;
		gridDivRef?.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (!target.classList.contains(GRID_BUTTON_CLASS_NAME)) {
				return;
			}

			const value = target.dataset.value;
			gameController.registerMove(value);
			renderCallback(gridDivRef, gameController);
		});
	}
}
