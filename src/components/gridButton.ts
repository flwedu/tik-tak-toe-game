import type { PlayerCustomData } from "../interfaces/player";

export const GRID_BUTTON_CLASS_NAME = "grid-button";

export function renderGridButton(
	value: number,
	props: PlayerCustomData | undefined,
) {
	const { content, bgColor } = props ?? {};
	const button = document.createElement("div");
	button.style.setProperty("background-color", bgColor ?? null);
	button.className = GRID_BUTTON_CLASS_NAME;
	button.setAttribute("data-value", value.toString());
	button.innerHTML = content ?? "";

	return button.outerHTML;
}
