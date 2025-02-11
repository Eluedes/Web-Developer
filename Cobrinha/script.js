var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var box = 20;
var snake = [{ x: 10 * box, y: 10 * box }];
var food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};
var direction = "RIGHT";
var score = 0; // Variável para pontuação

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    ctx.fillStyle = "green";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    var headX = snake[0].x;
    var headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    if (headX === food.x && headY === food.y) {
        food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
        food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
        score++; // Aumenta a pontuação ao comer a comida
        document.getElementById("score").innerText = "Pontuação: " + score; // Atualiza o display da pontuação
    } else {
        snake.pop();
    }

    var newHead = { x: headX, y: headY };

    if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Reiniciando...");
        location.reload();
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
}

var game = setInterval(draw, 100);
