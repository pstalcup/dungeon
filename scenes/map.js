let player = {
	x: 1,
	y: 1,
};

let ACTION_SPEED = 500;
let actionTimer = 0;

const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

const WIDTH = 640;
const HEIGHT = 480;

// TODO use constants instead of hard coded width/height
const MAP_WIDTH = WIDTH / TILE_WIDTH; // 40
const MAP_HEIGHT = HEIGHT / TILE_WIDTH; // 30

const map =
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W............T.........................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"W......................................W" +
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"


function mapCell(r, c) {
	return map[r * MAP_WIDTH + c];
}

export function draw(ctx) {
	ctx.fillStyle = "#DDD";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	for (let r = 0; r < MAP_HEIGHT; r++) {
		for (let c = 0; c < MAP_WIDTH; c++) {
			if (mapCell(r, c) === "W") {
				ctx.fillStyle = "black";
				ctx.fillRect(c * TILE_WIDTH, r * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
			}
			if (mapCell(r, c) === "T") {
				ctx.fillStyle = "brown";
				ctx.fillRect(c * TILE_WIDTH, r * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
			}
		}
	}

	ctx.fillStyle = "red";
	ctx.fillRect(player.x * TILE_WIDTH, player.y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);

	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, Math.min(100, Math.floor(100 * actionTimer / ACTION_SPEED,)), 5);
}

export function tick(delta, keys) {
	if (actionTimer < ACTION_SPEED) {
		actionTimer += delta;
	}
	if (actionTimer >= ACTION_SPEED) {
		let acted = false;
		let move = {}

		if (keys['ArrowUp'] && player.y > 0) {
			move.dy = -1;
			acted = true;
		} else if (keys['ArrowDown'] && player.y < MAP_HEIGHT) {
			move.dy = 1;
			acted = true;
		} else if (keys['ArrowLeft'] && player.x > 0) {
			move.dx = -1;
			acted = true;
		} else if (keys['ArrowRight'] && player.x < MAP_WIDTH) {
			move.dx = 1;
			acted = true;
		}
		if (acted) {
			const newX = player.x + (move.dx ?? 0);
			const newY = player.y + (move.dy ?? 0);

			if (mapCell(newX, newY) !== "W") {
				player.x = newX;
				player.y = newY;
			}

			actionTimer = 0;
		}
	}
}
