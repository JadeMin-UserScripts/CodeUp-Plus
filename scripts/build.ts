import type { BuildOptions } from 'esbuild';
import type { BuildTypes } from "./@types/build.js";

import { build, context } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { buildTyping, getCurrentType } from "./@types/build.js";
import { getMetaString } from "./meta.js";

const buildArgv = process.argv.slice(2)[0] as BuildTypes;
const buildType = buildTyping(buildArgv);



await build({
	entryPoints: ["./src/index.ts"],
	outfile: "./dist/index.user.js",
	charset: 'utf8',

	platform: 'browser',
	format: 'iife',

	bundle: true,
	minify: buildType.PUBLISH,
	minifySyntax: buildType.TEST,
	sourcemap: 'inline',
	treeShaking: true,
	
	banner: {
		js: getMetaString()
	},

	plugins: [
		copy({
			assets: {
				from: ["./src/README.md"],
				to: ["./"]
			}
		})
	]
});
console.log(`✅ - ${getCurrentType(buildType)} 플러그인 빌드 작업이 완료되었습니다!`);