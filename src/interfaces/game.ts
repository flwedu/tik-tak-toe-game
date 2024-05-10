import type { PlayerCustomData } from "./player.ts";

export interface PlayersGameData {
	player1: Set<number>;
	player2: Set<number>;
}

export interface GameCustomData {
	player1: PlayerCustomData;
	player2: PlayerCustomData;
}
