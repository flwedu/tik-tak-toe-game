import { range } from "lodash";
import type { GameController } from "../control/GameController";
import { renderGridButton } from "./gridButton";

export function renderGrid(
	gridHtmlDiv: HTMLDivElement,
	gameController: GameController,
) {
	const content = range(0, 9)
		.map((value) => {
			const props = gameController.getButtonProps(value);
			return renderGridButton(value, props);
		})
		.join("");

	gridHtmlDiv.innerHTML = content;
}
