import { renderGrid } from "./components/grid.ts";
import {
	GameController,
	type GameEventDetailsType,
} from "./control/GameController.ts";
import { UiController } from "./control/UiController.ts";
import "./global.css";
import "./components/styles.css";
import "emoji-picker-element";

const playersContentState: Record<string, string> = {
	"1": "❤",
	"2": "??",
};
const formRef = document.forms.namedItem("players-customizer");
const gridDivRef = document.getElementById("grid");
const emojiPicker = document.querySelector("emoji-picker");
const tooltip = document.querySelector<HTMLDivElement>(".tooltip");
const allPlayerFieldButtons =
	document.querySelectorAll<HTMLButtonElement>(".player-field-btn");

renderGrid(gridDivRef);

// Initialize text content for btns
for (const btn of allPlayerFieldButtons) {
	const playerNumber = btn.getAttribute("data-player") ?? "0";
	btn.textContent = playersContentState[playerNumber];
}

formRef?.addEventListener("click", (e) => {
	const target = e.target as HTMLButtonElement | null;
	if (!target || !target.classList.contains("player-field-btn")) {
		return;
	}

	const playerNumber = target.getAttribute("data-player") ?? "0";
	tooltip?.classList.toggle("shown");
	tooltip?.setAttribute("data-player", playerNumber);
});

formRef?.addEventListener("submit", (e) => {
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
		gridDivRef,
	);

	const uiControler = new UiController({
		gameController,
		formRef,
		gridDivRef,
	});

	uiControler.startGame();
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

gridDivRef?.addEventListener("switch-player", (e) => {
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
