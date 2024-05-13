import userEvent from "@testing-library/user-event";
import { describe, expect, it, test, vi } from "vitest";
import { getMockGameController } from "../__test__/utils.ts";
import { GRID_BUTTON_CLASS_NAME } from "../components/gridButton.ts";
import { UiController } from "./UiController.ts";

describe("UiController tests", () => {
	describe("startGame function", () => {
		it("should not proceed if gridHtmlDiv and formHtmlElement are null", () => {
			const gridDivRef = document.getElementById("grid");
			const gameController = getMockGameController();
			const uiController = new UiController({
				gameController,
				formRef: null,
				gridDivRef: null,
			});

			uiController.startGame();

			expect(gridDivRef?.classList.contains("disabled")).toBe(true);
			expect(gameController.getNextMovePlayer()).toBe("player1");
			expect(gridDivRef?.children.length).toBe(0);
		});

		it(
			'should remove "disabled" class from gridHtmlDiv and initialize the game if gridHtmlDiv' +
				" and formHtmlElement are provided",
			() => {
				const gridDivRef = document.getElementById("grid");
				const formRef = document.getElementById("form");
				const gameController = getMockGameController({
					gridDivHtml: gridDivRef,
				});
				const uiController = new UiController({
					gameController,
					formRef,
					gridDivRef,
				});

				uiController.startGame();

				expect(gridDivRef?.classList.contains("disabled")).toBe(false);
				expect(gameController.getNextMovePlayer()).toBe("player1");
				expect(gridDivRef?.children.length).toBe(9);
			},
		);
	});

	describe("initClickListeners", () => {
		test("should initialize click listeners", async () => {
			const user = userEvent.setup();
			const gridDivRef = document.getElementById("grid");
			const formRef = document.getElementById("form");
			const gameController = getMockGameController({
				gridDivHtml: gridDivRef,
			});
			const renderCallback = vi.fn();

			if (!gridDivRef) {
				throw new Error("Grid Html does not exist");
			}
			const uiController = new UiController({
				formRef,
				gridDivRef,
				gameController,
			});
			uiController.startGame();
			uiController.initClickListeners(renderCallback);

			const gridButton = document.querySelector(`.${GRID_BUTTON_CLASS_NAME}`);
			if (!gridButton) {
				throw new Error("Grid button does not exist");
			}

			await user.click(gridButton);

			expect(gridButton.textContent).toBe("");
			expect(renderCallback).toBeCalled();
		});
	});
});
