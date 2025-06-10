const CORE_PER_FRAME = 6;
const OUTER_PER_FRAME = 2;
const PATH_STEPS = 160;
const STEP_LENGTH = 2.1;
const NOISE_SCALE = 0.002;
const ANGLE_VAR = 0.65;

function setup() {
  createCanvas(900, 600);
  pixelDensity(2);
  noFill();
  strokeCap(ROUND);
  blendMode(MULTIPLY);
  background(255);
}

function draw() {
  noStroke();
  fill(255, 8);
  rect(0, 0, width, height);

  stroke(20, 40);
  for (let i = 0; i < CORE_PER_FRAME; i++) {
    const s = vecFromGaussian(0, 0, 80);
    drawSmokePath(s.x, s.y, PATH_STEPS, frameCount * 0.02);
  }

  stroke(20, 12);
  for (let i = 0; i < OUTER_PER_FRAME; i++) {
    const r = random(220, 360);
    const a = random(TWO_PI);
    drawSmokePath(r * cos(a), r * sin(a), PATH_STEPS + 80, frameCount * 0.02);
  }
}

function drawSmokePath(x, y, len, z) {
  let dir = random(TWO_PI);
  beginShape();
  for (let i = 0; i < len; i++) {
    vertex(x + width * 0.5, y + height * 0.5);
    const n = noise(x * NOISE_SCALE, y * NOISE_SCALE, z + i * 0.01);
    dir += map(n, 0, 1, -ANGLE_VAR, ANGLE_VAR);
    x += cos(dir) * STEP_LENGTH;
    y += sin(dir) * STEP_LENGTH;
  }
  endShape();
}

function vecFromGaussian(cx, cy, s) {
  return createVector(randomGaussian(cx, s), randomGaussian(cy, s));
}

function mousePressed() {
  background(255);
}
