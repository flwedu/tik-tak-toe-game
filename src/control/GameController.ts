import type { GameCustomData, PlayersGameData } from "../interfaces/game.ts";
import type { PlayerCustomData } from "../interfaces/player";

export interface GameEventDetailsType {
	data: PlayersGameData;
	history: number[];
	player1Turn: boolean;
}

export class GameController {
	private data: PlayersGameData;
	private history: number[];
	private player1Turn: boolean;

	public constructor(
		private customData: GameCustomData,
		private gridHtmlDiv?: HTMLElement | null,
	) {
		this.data = {
			player1: new Set(),
			player2: new Set(),
		};
		this.history = [];
		this.player1Turn = true;
	}

	resetGame() {
		this.data = {
			player1: new Set(),
			player2: new Set(),
		};
		this.history = [];
		this.player1Turn = true;
	}

	switchTurn() {
		this.player1Turn = !this.player1Turn;

		const customEvent = new CustomEvent<GameEventDetailsType>("switch-player", {
			detail: {
				data: this.data,
				player1Turn: this.player1Turn,
				history: this.history,
			},
			bubbles: true,
		});

		this.gridHtmlDiv?.dispatchEvent(customEvent);
	}

	registerMove(value: number | string | undefined) {
		const numValue = Number(value);
		if (Number.isNaN(numValue) || this.history.includes(numValue)) return;

		this.history.push(numValue);

		if (this.player1Turn) {
			this.data.player1.add(numValue);
		} else {
			this.data.player2.add(numValue);
		}
		this.switchTurn();
	}

	getNextMovePlayer() {
		if (this.player1Turn) return "player1";
		return "player2";
	}

	getButtonProps(value: number): PlayerCustomData {
		const isFromPlayer1 = this.data.player1.has(value);
		const isFromPlayer2 = this.data.player2.has(value);

		if (isFromPlayer1) {
			return this.customData.player1;
		}
		if (isFromPlayer2) {
			return this.customData.player2;
		}
		return {
			bgColor: undefined,
			content: "",
		};
	}
}
