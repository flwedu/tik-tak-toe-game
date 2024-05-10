export function endGame(
	gridHtmlDiv: HTMLElement | null,
	form: HTMLElement | null,
) {
	gridHtmlDiv?.classList.add("disabled");
	form?.classList.remove("disabled");
}
