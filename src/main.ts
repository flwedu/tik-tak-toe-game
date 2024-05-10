import { GameController } from "./control/GameController.ts";
import { startGame } from "./functions/startGame";
import "./global.css";
import "./components/styles.css";

const gameController = new GameController({
	player1: {
		content: "❤",
	},
	player2: {
		content: "✅",
	},
});

const gridHtmlDiv = document.getElementById("grid");
startGame(gridHtmlDiv, gameController);
