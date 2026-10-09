const r = require("raylib");

const WINDOW_WIDTH = 1700;
const WINDOW_HEIGHT = 1000;
const planets = {};

function createPlanet(x, y, radius, angle, speed, color) {
  return {
    center: {
      x: x,
      y: y,
    },
    radius: radius,
    angle: angle,
    speed: speed,
    color: color,
  };
}

const sun = createPlanet(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 70, 0, 0, {
  r: 244,
  g: 128,
  b: 55,
  a: 255,
});

planets.mercury = createPlanet(
  WINDOW_WIDTH / 2.3,
  WINDOW_HEIGHT / 2.3,
  15,
  0,
  -3,
  { r: 128, g: 128, b: 128, a: 255 },
);

planets.venus = createPlanet(
  WINDOW_WIDTH / 2.5,
  WINDOW_HEIGHT / 2.5,
  20,
  0,
  2.8,
  { r: 245, g: 145, b: 220, a: 255 },
);

planets.earth = createPlanet(
  WINDOW_WIDTH / 2.9,
  WINDOW_HEIGHT / 2.9,
  30,
  0,
  -2.5,
  { r: 43, g: 107, b: 186, a: 255 },
);

planets.mars = createPlanet(
  WINDOW_WIDTH / 3.5,
  WINDOW_HEIGHT / 3.5,
  25,
  0,
  -2.1,
  { r: 193, g: 68, b: 14, a: 255 },
);

planets.jupitar = createPlanet(
  WINDOW_WIDTH / 4.4,
  WINDOW_HEIGHT / 4.4,
  40,
  0,
  -1.8,
  { r: 186, g: 137, b: 98, a: 255 },
);

planets.saturn = createPlanet(
  WINDOW_WIDTH / 5.8,
  WINDOW_HEIGHT / 5.8,
  35,
  0,
  -1.5,
  {
    r: 226,
    g: 202,
    b: 148,
    a: 255,
  },
);

planets.uranus = createPlanet(WINDOW_WIDTH / 8, WINDOW_HEIGHT / 8, 32, 0, 1.3, {
  r: 176,
  g: 224,
  b: 230,
  a: 255,
});

planets.neptune = createPlanet(
  WINDOW_WIDTH / 13,
  WINDOW_HEIGHT / 13,
  31,
  0,
  -1,
  {
    r: 39,
    g: 87,
    b: 172,
    a: 255,
  },
);

//---------------------------------------------------------

planets.moon = createPlanet(
  planets.earth.center.x + 1.4 * planets.earth.radius,
  planets.earth.center.y + 1.4 * planets.earth.radius,
  10,
  0,
  1,
  r.WHITE,
);

planets.phobos = createPlanet(
  planets.mars.center.x + 1.4 * planets.mars.radius,
  planets.mars.center.y + 1.4 * planets.mars.radius,
  10,
  90,
  1,
  { r: 107, g: 0, b: 32, a: 255 },
);

planets.deimos = createPlanet(
  planets.mars.center.x - 1.4 * planets.mars.radius,
  planets.mars.center.y - 1.4 * planets.mars.radius,
  10,
  270,
  1,
  { r: 107, g: 0, b: 1, a: 255 },
);

planets.saturnRing = {
  center: {
    x: planets.saturn.center.x,
    y: planets.saturn.center.y,
  },
  radiusH: 42,
  radiusV: 52,
  color: r.WHITE,
};

function drawPlanets() {
  r.DrawCircleV(sun.center, sun.radius, sun.color);

  r.DrawCircleV(
    planets.mercury.center,
    planets.mercury.radius,
    planets.mercury.color,
  );

  r.DrawCircleV(
    planets.venus.center,
    planets.venus.radius,
    planets.venus.color,
  );

  r.DrawCircleV(
    planets.earth.center,
    planets.earth.radius,
    planets.earth.color,
  );

  r.DrawCircleV(planets.mars.center, planets.mars.radius, planets.mars.color);

  r.DrawCircleV(
    planets.jupitar.center,
    planets.jupitar.radius,
    planets.jupitar.color,
  );

  r.DrawCircleV(
    planets.saturn.center,
    planets.saturn.radius,
    planets.saturn.color,
  );

  r.DrawEllipseLines(
    planets.saturn.center.x,
    planets.saturn.center.y,
    planets.saturnRing.radiusH,
    planets.saturnRing.radiusV,

    planets.saturnRing.color,
  );

  r.DrawCircleV(
    planets.uranus.center,
    planets.uranus.radius,
    planets.uranus.color,
  );

  r.DrawCircleV(
    planets.neptune.center,
    planets.neptune.radius,
    planets.neptune.color,
  );

  r.DrawCircleV(planets.moon.center, planets.moon.radius, planets.moon.color);
  r.DrawCircleV(
    planets.phobos.center,
    planets.phobos.radius,
    planets.phobos.color,
  );
  r.DrawCircleV(
    planets.deimos.center,
    planets.deimos.radius,
    planets.deimos.color,
  );
}

function getDistace(x1, y1, x2, y2) {
  return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
}

function movePlanet(centerBody, movingBody) {
  let distance = getDistace(
    centerBody.center.x,
    centerBody.center.y,
    planets[movingBody].center.x,
    planets[movingBody].center.y,
  );

  planets[movingBody].angle =
    (planets[movingBody].angle + planets[movingBody].speed) % 360;

  planets[movingBody].center.x =
    centerBody.center.x +
    distance * Math.cos((planets[movingBody].angle * Math.PI) / 180);
  planets[movingBody].center.y =
    centerBody.center.y +
    distance * Math.sin((planets[movingBody].angle * Math.PI) / 180);
}

function moveSattelite(planet, sattelite) {
  planets[sattelite].center.x = planet.center.x + 1.4 * planet.radius;
  planets[sattelite].center.y = planet.center.y + 1.4 * planet.radius;
  movePlanet(planet, sattelite);
}

function movePlanets() {
  movePlanet(sun, "mercury");
  movePlanet(sun, "venus");
  movePlanet(sun, "earth");
  movePlanet(sun, "mars");
  movePlanet(sun, "jupitar");
  movePlanet(sun, "saturn");
  movePlanet(sun, "uranus");
  movePlanet(sun, "neptune");
  moveSattelite(planets.earth, "moon");
  moveSattelite(planets.mars, "phobos");
  moveSattelite(planets.mars, "deimos");
}

module.exports = {
  planets,
  drawPlanets,
  movePlanets,
};
