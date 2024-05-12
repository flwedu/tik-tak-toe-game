import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { getMockGameController } from "../__test__/utils.ts";
import { GRID_BUTTON_CLASS_NAME } from "../components/gridButton.ts";
import { initClickListeners } from "./initClickListeners.ts";
import { startGame } from "./startGame.ts";

describe("initClickListeners", () => {
	test("should initialize click listeners", async () => {
		const user = userEvent.setup();
		const gridHtmlDiv = document.getElementById("grid");
		const formHtmlElement = document.getElementById("form");
		const gameController = getMockGameController({
			gridDivHtml: gridHtmlDiv,
		});
		const renderCallback = vi.fn();

		if (!gridHtmlDiv) throw new Error("Grid Html does not exist");
		startGame(gridHtmlDiv, formHtmlElement, gameController);
		initClickListeners(gridHtmlDiv, gameController, renderCallback);

		const gridButton = document.querySelector(`.${GRID_BUTTON_CLASS_NAME}`);
		if (!gridButton) throw new Error("Grid button does not exist");

		await user.click(gridButton);

		expect(gridButton.textContent).toBe("");
		expect(renderCallback).toBeCalled();
	});
});
