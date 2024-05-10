import { startGame } from "./functions/startGame";
import "./global.css";
import "./components/styles.css";

startGame(document.querySelector<HTMLDivElement>("#grid"));
