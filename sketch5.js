let noiseOffset = 0;
let spacingX = 3;
let spacingY = 10;
let colCount, rowCount;
let amp = [];

function setup() {
  createCanvas(800, 800);
  background(0);
  stroke(250);
  strokeWeight(1);
  noFill();

  colCount = floor(width / spacingX) + 1;
  rowCount = floor(height / spacingY) + 1;

  for (let i = 0; i < colCount; i++) {
    amp[i] = [];
    for (let j = 0; j < rowCount; j++) {
      amp[i][j] = 1;
    }
  }
}

function draw() {
  background(0, 40);

  let noiseScale = 0.01;
  let threshold = 100;

  for (let i = 0; i < colCount; i++) {
    let x = i * spacingX;
    beginShape();
    for (let j = 0; j < rowCount; j++) {
      let y = j * spacingY;

      let n = noise(x * noiseScale, y * noiseScale, noiseOffset);
      let baseOffset = map(n, 0, 1, -25, 25);

      let d = dist(x + baseOffset, y, mouseX, mouseY) * 1.3;

      let targetAmplification = 1;
      if (d < threshold) {
        targetAmplification = map(d, 0, threshold, 5, 3);
      }

      amp[i][j] = lerp(amp[i][j], targetAmplification, 0.1);

      let xOffset = baseOffset * amp[i][j];

      vertex(x + xOffset, y);
    }
    endShape();
  }

  noiseOffset += 0.005;
}
