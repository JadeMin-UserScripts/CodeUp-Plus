import type { Saved } from "./@types/saved.js";



const problemNumber = (document.querySelector("input#problem_id") as HTMLInputElement).value;
export const expireDate = 1000 * 60 * 30; // 1800000ms == 30분
export const storageNS = "editor";
export const storageName = `${storageNS}_${problemNumber}`;
export const _initStorage = (value?: number): void => {
	const _storageName = `${storageNS}_EXPIRES`;

	if(value !== undefined) {
		localStorage.setItem(_storageName, value.toString());
	} else {
		const expires = localStorage.getItem(_storageName);
		if(expires === null) return;

		if(Date.now() > +expires) localStorage.clear();
	}
};
export const getSaved = (): Saved | null => JSON.parse(localStorage.getItem(storageName)!);
export const setSaved = (obj: Saved): void => {
	_initStorage(Date.now() + expireDate);
	localStorage.setItem(storageName, JSON.stringify(obj));
};

// 만료된 데이터 정리
console.log(_initStorage());