// ==UserScript==
// @name         CodeUp+
// @description  CodeUp+
// @version      0.0.4
// @icon         https://icons.duckduckgo.com/ip2/codeup.kr.ico
// @updateURL    https://github.com/JadeMin-UserScripts/CodeUp-Plus/raw/main/index.user.js
// @downloadURL  https://github.com/JadeMin-UserScripts/CodeUp-Plus/raw/main/index.user.js
// @match        https://www.codeup.kr/*
// @run-at       document-end
// ==/UserScript==
if(location.pathname !== "/submitpage.php") return;

const { editor } = unsafeWindow;

const rid = document.querySelector("input#rid").value;
const storageName = `last_edit_${rid}`;
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
const createAlert = (message) => {
	return '';

	const title = "CodeUp-Plus";
	return `\n\n\n\n#!${title}: ${message}`;
};
const removeAlert = (code) => {
	return code;

	const re = /\n*(\#\!.*)\n*$/i;
	return code.replace(re, '');
};
const saved = getSaved();



editor.setOptions({useSoftTabs: false});
editor.session.on('change', (event, _editor) => {
	const { row, column } = editor.selection.getCursor();

	setSaved({
		code: removeAlert(editor.session.getValue()),
		cursor: {
			row: row,
			column: column
		}
	}, 1800000);
});


if(saved === null) {
	const code = `#include <stdio.h>

int main() {
\t
\t
\treturn 0;
};`;
	editor.session.setValue(`${code}${createAlert("Template autofilled!")}`);
} else {
	const code = removeAlert(saved.code);
	editor.session.setValue(`${code}${createAlert("Stored code autofilled!")}`);
}
editor.gotoLine(4, 1);
