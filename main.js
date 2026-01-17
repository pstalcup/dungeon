import { draw as mapDraw, tick as mapTick } from "./scenes/map.js"

let keys = {};

const WIDTH = 640;
const HEIGHT = 480;

window.addEventListener('keydown', (event) => {
	if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
		event.preventDefault();
		keys[event.key] = true;
	}
});
window.addEventListener('keyup', (event) => {
	if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
		event.preventDefault();
		keys[event.key] = false;
	}
});

window.onload = () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	let lastTime = 0;
	function tick(currentTime) {
		const delta = currentTime - lastTime;
		if (lastTime > 0) {
			mapTick(delta, keys);
		}
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		mapDraw(ctx);
		lastTime = currentTime;
		requestAnimationFrame(tick);
	}

	requestAnimationFrame(tick);
}

