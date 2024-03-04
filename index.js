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

console.log(image);
//I wait for the image to load before drawing it to the canvas.
image.onload = () => {
  ctx.drawImage(image, -263, -800);
  ctx.drawImage(
    playerImage,
    (playerImage.width / 56) * 1,
    0,
    playerImage.width / 56,
    playerImage.height / 20,
    canvasElm.width / 2,
    canvasElm.height / 2,
    playerImage.width / 56,
    playerImage.height / 20
  );
};
