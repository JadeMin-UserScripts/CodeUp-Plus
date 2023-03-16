// ==UserScript==
// @name         CodeUp+
// @description  CodeUp+
// @version      0.1.3
// @icon         https://icons.duckduckgo.com/ip2/codeup.kr.ico
// @updateURL    https://github.com/JadeMin-UserScripts/CodeUp-Plus/raw/main/index.user.js
// @downloadURL  https://github.com/JadeMin-UserScripts/CodeUp-Plus/raw/main/index.user.js
// @match        https://*.codeup.kr/*
// @run-at       document-end
// ==/UserScript==
if(location.pathname !== "/submitpage.php") return;
const { editor } = unsafeWindow;

const editorElement = editor.textInput.getElement();
const rid = document.querySelector("input#rid").value;
const storageName = `editor_${rid}`;
const getSaved = () => {
	const saved = JSON.parse(localStorage.getItem(storageName));
	if(saved === null) return null;
	if(Date.now() > saved.expires) {
		localStorage.removeItem(storageName);
		return null;
	}

	return saved.value;
};
const setSaved = (obj, expireDate) => {
	const saved = JSON.parse(localStorage.getItem(storageName));

	return localStorage.setItem(storageName, JSON.stringify({
		value: obj,
		expires: Date.now() + expireDate
	}));
};
//unsafeWindow.clearSaved = ()=> localStorage.clear();
/*const createAlert = (message) => {
	const title = "CodeUp-Plus";
	return `\n\n\n\n#!${title}: ${message}`;
};
const removeAlert = (code) => {
	const re = /\n*(\#\!.*)\n*$/i;
	return code.replace(re, '');
};*/



const saved = getSaved();
const onInput = event => {
	const { row, column } = editor.selection.getCursor();
	const currentCode = editor.session.getValue();

	if(row !== 0 && column !== 0) {
		setSaved({
			code: currentCode,
			cursor: {
				row: row,
				column: column
			}
		}, 1800000);
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
