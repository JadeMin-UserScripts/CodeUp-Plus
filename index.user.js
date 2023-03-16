// ==UserScript==
// @name         CodeUp+
// @description  CodeUp+
// @version      0.1.0
// @icon         https://icons.duckduckgo.com/ip2/codeup.kr.ico
// @updateURL    https://xn--hy1bs43ay9g.xn--wv4b36c8wd.ga/index.user.js
// @downloadURL  https://xn--hy1bs43ay9g.xn--wv4b36c8wd.ga/index.user.js
// @match        https://*.codeup.kr/*
// @run-at       document-end
// ==/UserScript==
if(location.pathname !== "/submitpage.php") return;

const { editor } = unsafeWindow;

const editorElement = editor.textInput.getElement();
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
const onChange = event => {
	const { row, column } = editor.selection.getCursor();
	const currentCode = editor.session.getValue();

	if(row !== 0 && column !== 0) {
		setSaved({
			code: removeAlert(currentCode),
			cursor: {
				row: row,
				column: column
			}
		}, 1800000);
	}
};
editor.setOptions({useSoftTabs: false});
editor.on('click', onChange);
editorElement.addEventListener('keydown', onChange);

editor.focus();
if(saved === null) {
	const code = `#include <stdio.h>

int main() {
\t
\t
\treturn 0;
}`;
	editor.session.setValue(`${code}${createAlert("Template autofilled!")}`);
	editor.gotoLine(4, 1);
} else {
	const code = removeAlert(saved.code);
	editor.session.setValue(`${code}${createAlert("Stored code autofilled!")}`);
	editor.gotoLine(saved.cursor.row + 1, saved.cursor.column);
}
