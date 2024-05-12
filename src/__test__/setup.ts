import { beforeEach } from "vitest";
import { htmlTemplate } from "./utils.ts";

beforeEach(() => {
	document.body.innerHTML = htmlTemplate;
});
