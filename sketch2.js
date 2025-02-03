function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 150, 100, 100);
  background(0);
}

function draw() {
  background(0, 0, 4, 3);
  noFill();

  let lineCount = 32;
  let spacing = 50;

  for (let i = 1; i <= lineCount; i++) {
    let baseY = 400;
    stroke(map(i, 1, 30, 23, 13), 50, 255);
    strokeWeight(2);

    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let nx = x * 0.01 + frameCount * 0.02 + i * 0.1;
      let ny = i * 0.1;
      let noiseVal = noise(nx, ny) * 260;
      let wave = sin(x * 0.3 + frameCount * 0.01) * noiseVal;
      let y = baseY + wave + 5;

      curveVertex(x, y);
    }
    endShape();
  }
}
