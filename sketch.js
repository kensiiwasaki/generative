import p5 from "p5";

let cols = 120;
let rows = 120;

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB, 305, 100, 100, 100);
    p.noFill();
  };

  p.draw = () => {
    p.background(0, 0, 0, 10);
    let cellW = p.width / cols;
    let cellH = p.height / rows;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        p.push();
        let cx = x * cellW + cellW / 2;
        let cy = y * cellH + cellH / 2;
        p.translate(cx, cy);

        let n = p.noise(x * 0.1, y * 0.1, p.frameCount * 0.01);
        let angle = n * p.TWO_PI * 2;

        p.rotate(angle);

        let hueValue = p.map(n, 0, 1, 0, 360);
        p.stroke(hueValue, 80, 100);
        p.strokeWeight(2);

        p.rectMode(p.CENTER);
        let size = Math.min(cellW, cellH) * 0.6;
        p.rect(0, 0, size, size);

        p.pop();
      }
    }
  };
};

new p5(sketch);
