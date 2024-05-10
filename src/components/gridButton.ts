import type { PlayerCustomData } from "../interfaces/player";

export function renderGridButton(value: number, { content, bgColor }: PlayerCustomData) {
	const button = document.createElement("div");
	button.style.setProperty("background-color", bgColor ?? null);
	button.className = "grid-button";
	button.setAttribute("data-value", value.toString());
	button.innerHTML = content;

	return button.outerHTML;
}
