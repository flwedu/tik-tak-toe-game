import { renderGrid } from "./components/grid.ts";
import { GameController } from "./control/GameController.ts";
import { endGame } from "./functions/endGame.ts";
import { startGame } from "./functions/startGame";
import "./global.css";
import "./components/styles.css";

const form = document.forms.namedItem("players-customizer");
const gridHtmlDiv = document.getElementById("grid");

endGame(gridHtmlDiv, form);
renderGrid(gridHtmlDiv);

form?.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(e.target as HTMLFormElement);

	const gameController = new GameController({
		player1: {
			content: formData.get("player1Icon") as string,
		},
		player2: {
			content: formData.get("player2Icon") as string,
		},
	});

	startGame(gridHtmlDiv, form, gameController);
});
