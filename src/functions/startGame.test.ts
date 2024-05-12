import { describe, expect, it } from "vitest";
import { getMockGameController } from "../__test__/utils.ts";
import { startGame } from "./startGame";

describe("startGame function", () => {
	it("should not proceed if gridHtmlDiv and formHtmlElement are null", () => {
		const gridHtmlDiv = document.getElementById("grid");
		const gameController = getMockGameController();

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
			const gameController = getMockGameController({
				gridDivHtml: gridHtmlDiv,
			});

			startGame(gridHtmlDiv, formHtmlElement, gameController);

			expect(gridHtmlDiv?.classList.contains("disabled")).toBe(false);
			expect(gameController.getNextMovePlayer()).toBe("player1");
			expect(gridHtmlDiv?.children.length).toBe(9);
		},
	);
});
