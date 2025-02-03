let cols = 120;
let rows = 120;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 305, 100, 100, 100);
  noFill();
}

function draw() {
  background(0, 0, 0, 10);
  let cellW = width / cols;
  let cellH = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      let cx = x * cellW + cellW / 2;
      let cy = y * cellH + cellH / 2;
      translate(cx, cy);

      let n = noise(x * 0.1, y * 0.1, frameCount * 0.01);
      let angle = n * TWO_PI * 2;

      rotate(angle);

      let hueValue = map(n, 0, 1, 0, 360);
      stroke(hueValue, 80, 100);
      strokeWeight(2);

      rectMode(CENTER);
      let size = min(cellW, cellH) * 0.6;
      rect(0, 0, size, size);

      pop();
    }
  }
}
