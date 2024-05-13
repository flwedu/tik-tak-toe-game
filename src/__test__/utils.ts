import type { EventEmitter } from "../control/EventEmitter.ts";
import { GameController } from "../control/GameController.ts";
import type { GameEventsType } from "../interfaces/events.ts";

export const htmlTemplate = `<form id="form"></form><div id="grid" class="disabled"></div>`;

export function getMockGameController(
	eventEmitter: EventEmitter<GameEventsType>,
) {
	return new GameController(
		{
			player1: {
				bgColor: "red",
				content: "p1",
			},
			player2: {
				bgColor: "blue",
				content: "p2",
			},
		},
		eventEmitter,
	);
}
