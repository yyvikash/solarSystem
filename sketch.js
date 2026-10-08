const r = require("raylib");
const p = require("./planetes");

const WINDOW_WIDTH = 1600;
const WINDOW_HEIGHT = 1000;
const FPS = 60;

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, "Solar System");
  r.SetTargetFPS(FPS);
}

function running() {
  return !r.WindowShouldClose();
}

function update() {
  p.movePlanets();
}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  p.drawPlanets();

  r.EndDrawing();
}

module.exports = {
  setup,
  running,
  draw,
  update,
};
