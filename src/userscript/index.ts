import { getSaved, setSaved } from "./modules/saved.js";



(({ editor }) => {
	if(location.pathname !== "/submitpage.php") return;
	//@ts-expect-error
	const editorElement = editor.textInput.getElement() as HTMLTextAreaElement;
	const saved = getSaved();

	const onInput = (event: AceAjax.EditorChangeEvent | KeyboardEvent): void => {
		const { row, column } = editor.selection.getCursor();
		const currentCode = editor.session.getValue();

		if(row !== 0 && column !== 0) {
			setSaved({
				code: currentCode,
				cursor: {
					row: row,
					column: column
				}
			});
		}
	};


	editor.setOptions({useSoftTabs: false});
	editor.on('click', onInput);
	//editor.on('change', onInput);
	editorElement.addEventListener('keydown', onInput);

	if(saved === null) {
		const code = `#include <stdio.h>

int main() {
\t
\t
\treturn 0;
}`;
		editor.session.setValue(`${code}`);
		editor.gotoLine(4, 1);
	} else {
		editor.session.setValue(`${saved.code}`);
		editor.gotoLine(saved.cursor.row + 1, saved.cursor.column);
	}
	editor.focus();
})(unsafeWindow);