const canvasElm = document.querySelector("canvas");
const ctx = canvasElm.getContext("2d");

canvasElm.width = 1150;
canvasElm.height = 760;

const collisionsMap = [];
//This is the collision map. It's a string of 0s and 26323. 0 means there is no collision and 26323 means there is a collision.
//Width of the map is 18 tiles and height is 21 tiles . So, the map is 18 x 21 tiles. Collision blocks are also tiles. So, the collision map is also 18 x 21 tiles.
for (i = 0; i < collisions.length; i += 18) {
  collisionsMap.push(collisions.slice(i, 18 + i));
}

const boundaries = [];
const offset = {
  x: -263,
  y: -800,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    //Remember? 26323 means collision. 0 is where the player will move freely. I don't want collision in every tile.
    if (symbol === 26323) {
      boundaries.push(
        new Boundary(
          (position = {
            x: j * Boundary.width + offset.x, //j refers to the column. The offset position makes the collision match the map image
            y: i * Boundary.height + offset.y, //i refers to the row. The offset position makes the collision match the map image }))
          })
        )
      );
    }
  });
});

console.log(boundaries);
//We need to fill the canvas with a white color so that the image is not transparent.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasElm.width, canvasElm.height);

//Canvas does not support images from the local file system so we need to create an image object and set the source to the image file we want to use.
const image = new Image();
image.src = "./images/hidris-office-map-200-zoomed.png";
//Create a new image object for the player
const playerImage = new Image();
playerImage.src = "./images/characters/Premade_Character_48x48_01.png";

//This is the offset for the background image. It's the same as the position of the background image.

const background = new Sprite({
  position: { x: offset.x, y: offset.y },
  image: image,
});

const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

testBoundary = new Boundary({ x: 400, y: 400 });

//There is nothing wrong with an infinite loop when it comes to this kind of animations.
//The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  testBoundary.draw();
  /*boundaries.forEach((boundary) => {
    boundary.draw();
  });*/
  ctx.drawImage(
    playerImage,
    (playerImage.width / 56) * 1, //Sprite x position (Virtual grid of the sprite sheet is  56 x 20)
    0, // Sprite y position
    playerImage.width / 56, // cropped size of character block
    playerImage.height / 20, // cropped size of character block
    canvasElm.width / 2, // x position on canvas
    canvasElm.height / 2, // y position on canvas
    playerImage.width / 56, // actual size of character block
    playerImage.height / 20 // actual size of character block
  );
  //Makes the illusion of moving player, but it's actually moving the background image.
  if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
    background.position.y += 5;
    testBoundary.position.y += 5;
  }
  if (keys.ArrowDown.pressed && lastKey === "ArrowDown") {
    background.position.y -= 5;
  }
  if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
    background.position.x += 5;
  }
  if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
    background.position.x -= 5;
  }
}

animate();
let lastKey = ""; //This is a diagonal movement fix. It will store the last key pressed.
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastKey = "ArrowUp";
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastKey = "ArrowDown";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKey = "ArrowRight";
      break;
  }
  console.log(keys);
});

//When the key is released, we set the pressed property to false.
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
});
