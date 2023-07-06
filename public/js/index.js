// game variables and constants
let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("../music/move.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const musicSound = new Audio("../music/music.mp3");
const foodSound = new Audio("../music/food.mp3");
const speed = 7;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 10, y: 15 };
let score = 0;
let highestScore = localStorage.getItem("highestScore");
let Score = document.getElementById("score");
let HighestScore = document.getElementById("highestScore");

// game functions
function main(ctime) {
   window.requestAnimationFrame(main); // recursion to refresh the screen.
   if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
   lastPaintTime = ctime;
   gameEngine();
}
const isCollide = (snake) => {
   for (let index = 1; index < snakeArr.length; index++) {
      if (snake[0].x === snakeArr[index].x && snake[0].y === snakeArr[index].y)
         return true;
   }
   if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y <= 0 ||
      snake[0].y >= 18
   )
      return true;
   return false;
};
const gameEngine = () => {
   if (inputDir.x !== 0 || inputDir.y !== 0) musicSound.play();
   //part 1: updating the snake array and food

   //if collided with walls
   if (isCollide(snakeArr)) {
      musicSound.pause();
      gameOverSound.play();
      inputDir = { x: 0, y: 0 };
      alert("Game over! Press any key to play again.");
      snakeArr = [{ x: 13, y: 15 }];
      score = 0;
   }

   //if food is eaten by the snake
   if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
      foodSound.play();
      score++;
      let x = snakeArr[0].x + inputDir.x;
      let y = snakeArr[0].y + inputDir.y;
      snakeArr.unshift({ x, y });
      const a = 3;
      const b = 15;
      food = {
         x: Math.round(a + (b - a) * Math.random()),
         y: Math.round(a + (b - a) * Math.random()),
      };
   }
   Score.innerHTML = "Score: " + score;
   highestScore = localStorage.getItem("highestScore");
   HighestScore.innerHTML = "Highest Score: " + highestScore;

   //moving snake
   for (let index = snakeArr.length - 1; index > 0; index--) {
      snakeArr[index] = { ...snakeArr[index - 1] }; // here we assgning new object equals to (index-1)th object.
   }
   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;

   //part 2: display the snake and food
   let board = document.querySelector(".board");
   board.innerHTML = "";

   //   display the snake
   snakeArr.forEach((element, index) => {
      snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = element.y;
      snakeElement.style.gridColumnStart = element.x;
      if (index === 0) snakeElement.classList.add("head");
      else snakeElement.classList.add("snake");
      board.appendChild(snakeElement);
   });
   //   display the food
   snakeArr.forEach((element, index) => {
      foodElement = document.createElement("div");
      foodElement.style.gridRowStart = food.y;
      foodElement.style.gridColumnStart = food.x;
      foodElement.classList.add("food");
      board.appendChild(foodElement);
   });

   localStorage.setItem("highestScore", Math.max(highestScore, score));
};

// logic for game
window.requestAnimationFrame(main); // used to render the animation frame again and again after refreshing during game making.
window.addEventListener("keydown", (e) => {
   //start the game
   moveSound.play();
   switch (e.key) {
      case "ArrowUp":
         inputDir.x = 0;
         inputDir.y = -1;
         break;
      case "ArrowDown":
         inputDir.x = 0;
         inputDir.y = 1;
         break;
      case "ArrowLeft":
         inputDir.x = -1;
         inputDir.y = 0;
         break;
      case "ArrowRight":
         inputDir.x = 1;
         inputDir.y = 0;
         break;

      default:
         break;
   }
});

const upBtn = document.querySelector(".upBtn");
upBtn.addEventListener("click", (event) => {
   moveSound.play();
   inputDir.x = 0;
   console.log("up");
   inputDir.y = -1;
});
const downBtn = document.querySelector(".downBtn");
downBtn.addEventListener("click", (event) => {
   moveSound.play();
   inputDir.x = 0;
   console.log("down");
   inputDir.y = 1;
});
const leftBtn = document.querySelector(".leftBtn");
leftBtn.addEventListener("click", (event) => {
   moveSound.play();
   console.log("left");
   inputDir.x = -1;
   inputDir.y = 0;
});

const rightBtn = document.querySelector(".rightBtn");
rightBtn.addEventListener("click", (event) => {
   moveSound.play();
   inputDir.x = 1;
   console.log("right");
   inputDir.y = 0;
});
