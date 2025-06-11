let curtainStrands = [];
let time = 0;

function setup() {
  createCanvas(900, 800);

  for (let x = 0; x < width; x += 2) {
    curtainStrands.push(new CurtainStrand(x));
  }

  background(245);
}

function draw() {
  fill(245, 60);
  noStroke();
  rect(0, 0, width, height);

  time += 0.005;

  for (let strand of curtainStrands) {
    strand.update();
    strand.display();
  }
}

class CurtainStrand {
  constructor(x) {
    this.baseX = x;
    this.points = [];
    this.numPoints = 30;
    this.waveOffset = random(1000);
    this.thickness = random(0.5, 2.5);
    this.opacity = random(20, 60);
    this.color = color(
      random(40, 80),
      random(40, 80),
      random(100, 140),
      this.opacity
    );

    for (let i = 0; i < this.numPoints; i++) {
      this.points.push({
        x: this.baseX,
        y: map(i, 0, this.numPoints - 1, 0, height),
        offsetX: 0,
        targetOffsetX: 0,
        velocity: 0,
      });
    }
  }

  update() {
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];

      // 複数の波を重ね合わせて複雑な動きを作る
      let wave1 = sin(time * 2 + i * 0.1 + this.waveOffset) * 30;
      let wave2 = sin(time * 3.5 + i * 0.15 + this.waveOffset * 1.5) * 15;
      let wave3 = cos(time * 1.2 + i * 0.08 + this.waveOffset * 0.7) * 20;

      // 下に行くほど揺れ幅を大きく
      let dampening = map(i, 0, this.points.length - 1, 0.1, 1);

      // 風の影響をシミュレート
      let windEffect = noise(this.baseX * 0.01, i * 0.05, time) * 40 - 20;

      // 基本の揺れ
      let baseOffset = (wave1 + wave2 + wave3 + windEffect) * dampening;

      // マウスとの距離を計算
      let distanceToMouse = dist(
        mouseX,
        mouseY,
        this.baseX + point.offsetX,
        point.y
      );

      // マウスが近い場合の影響
      if (distanceToMouse < 80) {
        let influence = map(distanceToMouse, 0, 80, 1, 0);
        let angle = atan2(
          point.y - mouseY,
          this.baseX + point.offsetX - mouseX
        );
        let pushForce = influence * 60 * dampening;
        point.targetOffsetX = baseOffset + cos(angle) * pushForce;
      } else {
        point.targetOffsetX = baseOffset;
      }

      // スムーズな動きのための物理シミュレーション
      let springForce = (point.targetOffsetX - point.offsetX) * 0.1;
      point.velocity += springForce;
      point.velocity *= 0.85; // 減衰
      point.offsetX += point.velocity;

      point.x = this.baseX + point.offsetX;
    }
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(this.thickness);

    beginShape();

    // 最初の点
    curveVertex(this.points[0].x, this.points[0].y);

    // 全ての点を滑らかな曲線で繋ぐ
    for (let point of this.points) {
      curveVertex(point.x, point.y);
    }

    // 最後の点
    let lastPoint = this.points[this.points.length - 1];
    curveVertex(lastPoint.x, lastPoint.y);

    endShape();

    // 追加の細い線で質感を表現
    if (random() < 0.3) {
      stroke(
        this.color.levels[0],
        this.color.levels[1],
        this.color.levels[2],
        this.opacity * 0.3
      );
      strokeWeight(this.thickness * 0.3);

      beginShape();
      for (let i = 0; i < this.points.length; i += 3) {
        let point = this.points[i];
        curveVertex(point.x + random(-2, 2), point.y);
      }
      endShape();
    }
  }
}

// マウスクリックで波紋効果
function mousePressed() {
  for (let strand of curtainStrands) {
    let distance = abs(mouseX - strand.baseX);
    if (distance < 100) {
      let influence = map(distance, 0, 190, 2, 0);
      for (let point of strand.points) {
        let pointDist = dist(mouseX, mouseY, strand.baseX, point.y);
        if (pointDist < 100) {
          let pointInfluence = map(pointDist, 0, 100, 1, 0);
          point.velocity +=
            influence *
            pointInfluence *
            random(20, 40) *
            (mouseX > strand.baseX ? 1 : -1);
        }
      }
    }
  }
}
