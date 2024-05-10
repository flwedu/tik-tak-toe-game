import { renderGrid } from "./components/grid.ts";
import {
	GameController,
	type GameEventDetailsType,
} from "./control/GameController.ts";
import { endGame } from "./functions/endGame.ts";
import { startGame } from "./functions/startGame";
import "./global.css";
import "./components/styles.css";
import "emoji-picker-element";

const playersContentState: Record<string, string> = {
	"1": "❤",
	"2": "??",
};
const form = document.forms.namedItem("players-customizer");
const gridHtmlDiv = document.getElementById("grid");
const emojiPicker = document.querySelector("emoji-picker");
const tooltip = document.querySelector<HTMLDivElement>(".tooltip");
const allPlayerFieldButtons =
	document.querySelectorAll<HTMLButtonElement>(".player-field-btn");

endGame(gridHtmlDiv, form);
renderGrid(gridHtmlDiv);

// Initialize text content for btns
for (const btn of allPlayerFieldButtons) {
	const playerNumber = btn.getAttribute("data-player") ?? "0";
	btn.textContent = playersContentState[playerNumber];
}

form?.addEventListener("click", (e) => {
	const target = e.target as HTMLButtonElement | null;
	if (!target || !target.classList.contains("player-field-btn")) {
		return;
	}

	const playerNumber = target.getAttribute("data-player") ?? "0";
	tooltip?.classList.toggle("shown");
	tooltip?.setAttribute("data-player", playerNumber);
});

form?.addEventListener("submit", (e) => {
	e.preventDefault();

	const gameController = new GameController(
		{
			player1: {
				content: playersContentState["1"],
			},
			player2: {
				content: playersContentState["2"],
			},
		},
		gridHtmlDiv,
	);

	startGame(gridHtmlDiv, form, gameController);
});

emojiPicker?.addEventListener("emoji-click", (event) => {
	const playerNumber = tooltip?.getAttribute("data-player") ?? "0";
	const unicode = event.detail.unicode ?? "";

	playersContentState[playerNumber] = unicode;
	tooltip?.classList.remove("shown");

	const btn = document.querySelector<HTMLButtonElement>(
		`.player-field-btn[data-player="${playerNumber}"]`,
	);
	if (!btn) {
		return;
	}
	btn.textContent = unicode;
});

gridHtmlDiv?.addEventListener("switch-player", (e) => {
	const detail = e.detail as GameEventDetailsType;
	const btnPlayer1 = document.querySelector<HTMLButtonElement>(
		`.player-field[data-player="1"]`,
	);
	const btnPlayer2 = document.querySelector<HTMLButtonElement>(
		`.player-field[data-player="2"]`,
	);
	if (detail.player1Turn) {
		btnPlayer1?.classList.add("active");
		btnPlayer2?.classList.remove("active");
		return;
	}
	btnPlayer2?.classList.add("active");
	btnPlayer1?.classList.remove("active");
});
