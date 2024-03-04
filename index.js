const canvasElm = document.querySelector("canvas");
const ctx = canvasElm.getContext("2d");

canvasElm.width = 1150;
canvasElm.height = 760;

console.log(ctx);

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasElm.width, canvasElm.height);

//Canvas does not support images from the local file system so we need to create an image object and set the source to the image file we want to use.
const image = new Image();
image.src = "./images/hidris-office-map-200-zoomed.png";
//Create a new image object for the player
const playerImage = new Image();
playerImage.src = "./images/characters/Premade_Character_48x48_01.png";
class Sprite {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({ position: { x: -263, y: -800 }, image: image });

const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};
//There is nothing wrong with an infinite loop when it comes to this kind of animations.
//The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
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
let lastKey = "";
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
