import { GameController } from "../control/GameController.ts";

export const htmlTemplate = `<form id="form"></form><div id="grid" class="disabled"></div>`;

export function getMockGameController(props?: {
	gridDivHtml?: HTMLElement | null;
}) {
	const gameController = new GameController(
		{
			player1: { bgColor: "red", content: "p1" },
			player2: { bgColor: "blue", content: "p2" },
		},
		props?.gridDivHtml,
	);
	return gameController;
}
