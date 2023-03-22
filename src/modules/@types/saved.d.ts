export declare interface Saved {
	code: string;
	cursor: {
		row: number;
		column: number;
	};
}

export declare interface SavedWithExpires {
	value: Saved;
	expires: number;
}