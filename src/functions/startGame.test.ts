import { beforeEach, describe, expect, it } from "vitest";
import { GameController } from "../control/GameController.ts";
import { startGame } from "./startGame";

const htmlTemplate = `<form id="form"></form><div id="grid" class="disabled"></div>`;
describe("startGame function", () => {
	beforeEach(() => {
		document.body.innerHTML = htmlTemplate;
	});

	it("should not proceed if gridHtmlDiv and formHtmlElement are null", () => {
		const gridHtmlDiv = document.getElementById("grid");
		const gameController = new GameController({
			player1: { bgColor: "red", content: "p1" },
			player2: { bgColor: "blue", content: "p2" },
		});

		startGame(null, null, gameController);

		expect(gridHtmlDiv?.classList.contains("disabled")).toBe(true);
		expect(gameController.getNextMovePlayer()).toBe("player1");
		expect(gridHtmlDiv?.children.length).toBe(0);
	});

	it(
		'should remove "disabled" class from gridHtmlDiv and initialize the game if gridHtmlDiv' +
			" and formHtmlElement are provided",
		() => {
			const gridHtmlDiv = document.getElementById("grid");
			const formHtmlElement = document.getElementById("form");
			const gameController = new GameController(
				{
					player1: { bgColor: "red", content: "p1" },
					player2: { bgColor: "blue", content: "p2" },
				},
				gridHtmlDiv,
			);

			startGame(gridHtmlDiv, formHtmlElement, gameController);

			expect(gridHtmlDiv?.classList.contains("disabled")).toBe(false);
			expect(gameController.getNextMovePlayer()).toBe("player1");
			expect(gridHtmlDiv?.children.length).toBe(9);
		},
	);
});
