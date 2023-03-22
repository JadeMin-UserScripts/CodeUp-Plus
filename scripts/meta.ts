import META from "../meta.json";

/*const toMetaHeader = ([key, value]: [string, string]): string => {
	return ` * @${key} ${value}`;
};*/
const toMetaString = (meta: {[KEY: string]: string}) => {
	return Object.entries(meta).map(([key, value])=> ` * @${key} ${value}`).join("\n");
};



export const getMetaString = (): string => {
	return `/**\n${toMetaString(META)}\n */`;
};
export const getMeta = (headerName: keyof typeof META): typeof META[keyof typeof META] => {
	return META[headerName];
};