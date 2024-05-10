import { startGame } from "./functions/startGame";
import "./style.css";
import "./components/styles.css"

startGame(document.querySelector<HTMLDivElement>("#grid"));
