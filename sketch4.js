function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
}

function draw() {
  noStroke();
  fill(0, 0, 0, 5);
  rect(0, 0, width, height);

  translate(width / 2, height / 2);

  let ringCount = 75;
  let pointsPerRing = 200;
  let maxRadius = min(width, height) * 0.25;

  strokeWeight(2);

  for (let r = 1; r <= ringCount; r++) {
    let baseRadius = map(r, 1, ringCount, maxRadius * 0.1, maxRadius);

    beginShape();
    for (let i = 0; i < pointsPerRing; i++) {
      let angle = map(i, 0, pointsPerRing, 0, TWO_PI);

      let nx = cos(angle) * 0.3 + frameCount * 0.01 + r;
      let ny = sin(angle) * 0.3 + r;
      let nVal = noise(nx, ny);

      let fluctuation = map(nVal, 0, 1, -70, 50);
      let localRadius = baseRadius + fluctuation;

      let x = cos(angle) * localRadius;
      let y = sin(angle) * localRadius;

      let hueVal = map(r, 1, ringCount, 180, 300) + map(nVal, 0, 1, -10, 10);
      stroke(hueVal % 160, 60, 100, 80);

      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
