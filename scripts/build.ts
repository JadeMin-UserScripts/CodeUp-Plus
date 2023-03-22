import type { BuildTypes } from "./@types/build.js";

import { readFile } from 'fs/promises';
import { build, context } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { buildTyping, getCurrentType } from "./@types/build.js";

const buildArgv = process.argv.slice(2)[0] as BuildTypes;
const buildType = buildTyping(buildArgv);



await build({
	entryPoints: ["./src/index.ts"],
	outfile: "./dist/index.user.js",
	charset: 'utf8',

	platform: 'browser',
	format: 'esm',

	bundle: true,
	minify: buildType.PUBLISH,
	minifySyntax: buildType.TEST,
	sourcemap: 'inline',
	treeShaking: true,
	
	banner: {
		js: await readFile("./src/meta.ts", 'utf-8')
	},

	plugins: [
		copy({
			assets: {
				from: ["./src/.page/CNAME", "./src/.page/README.md"],
				to: ["./"]
			}
		})
	]
});
console.log(`✅ - ${getCurrentType(buildType)} 플러그인 빌드 작업이 완료되었습니다!`);