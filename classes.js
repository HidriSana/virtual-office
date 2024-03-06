class Boundary {
  //Originally, in a  100% zoomed map, the width of the tiles is 32px. At a 200% zoom, the width is 64px. This will also be the size of my collision blocks.
  static width = 64;
  static height = 64;
  constructor(position) {
    this.position = position;
    this.width = 64;
    this.height = 64;
  }
  //Draws the boundary on the canvas. Collisions blocks are commonly red.
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Sprite {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
