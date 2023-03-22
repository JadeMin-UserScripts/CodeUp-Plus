const TYPES = ["PUBLISH", "TEST"] as const;

export type BuildTypes = typeof TYPES[number] | undefined;
export type BuildTypingResult = {
	[KEY in typeof TYPES[number]]: boolean;
};



export const buildTyping = (buildArgv: BuildTypes): BuildTypingResult => {
	if(buildArgv === undefined) throw new TypeError("빌드 타입을 지정해주세요.");
	if(!TYPES.includes(buildArgv)) throw new TypeError(`"${buildArgv}"은(는) 올바른 빌드 타입이 아닙니다.`);


	//return TYPES.reduce((acc, type) => ({ ...acc, [type]: buildArgv === type }), {} as BuildTypingResult);
	const result = {} as BuildTypingResult;
	for(const type of TYPES) result[type] = (buildArgv === type);

	return result;
};

export const getCurrentType = (buildType: BuildTypingResult): BuildTypes => {
	return TYPES.find(type=> buildType[type]);
};