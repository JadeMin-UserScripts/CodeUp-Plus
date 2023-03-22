//@ts-expect-error
import { publish } from 'gh-pages';
import { PublishResult } from "./@types/publish.js";
const options = ["./dist", {
	branch: 'dist',
	message: "자동 업데이트 및 배포"
}];

const result: PublishResult = await publish(...options);
if(result) throw result;
console.log("성공적으로 GitHub Pages에 배포되었습니다!");