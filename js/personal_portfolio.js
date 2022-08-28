
(() => {

    const canvas = document.getElementById('my-house');
    const ctx = canvas.getContext('2d');

 
    // ============== Gen Rand Hex Color
    function generateRandHexColor(){
        let randColor = Math.floor(Math.random()*16777215).toString(16);
        let hexColor = '#'+randColor
        return hexColor
    }

    // =========== PADDLE VARS
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;

    // =========== BRICK VARs
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;
    let bricks = [];

    // =========== BALL VARS
    let randBallColor = generateRandHexColor()
    let drawBallInterval = null;
    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;

    // =========== SCORE VARS
    let score = 0;


    // ============== Clear Game
    function clearGame(){

        randBallColor = generateRandHexColor()
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        rightPressed = false;
        leftPressed = false;

        paddleX = (canvas.width - paddleWidth) / 2;
        rightPressed = false;
        leftPressed = false;

        bricks = [];

        bricks = [];
        for(var c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(var r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    // ============== Paddle Event Listeners
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        console.log('e.key', e.key)
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
            console.log('rightPressed', rightPressed)
            console.log('leftPressed', leftPressed)
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
            console.log('rightPressed', rightPressed)
            console.log('leftPressed', leftPressed)
        }
    }
        
    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }
    // ============== Brick Collision Detection
    /*
    The x position of the ball is greater than the x position of the brick.
    The x position of the ball is less than the x position of the brick plus its width.
    The y position of the ball is greater than the y position of the brick.
    The y position of the ball is less than the y position of the brick plus its height.
    */
    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
               
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    randBallColor = generateRandHexColor()
                    score++
                    if (score === brickRowCount * brickColumnCount) {
                        document.getElementById('genNewGame').innerHTML = "YOU WIN, CONGRATULATIONS!"
                        setTimeout(function(){
                            clearInterval(drawBallInterval); 
                        }, 40)
                        setTimeout(function(){
                            document.getElementById('genNewGame').innerHTML = "Play Again"
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                        }, 3000)
                        
                       
                      }
                }
            }
          }
        }
      }

    //   =========== SCORE
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(`Score: ${score}`, 8, 20);
      }
    // ============== On Click Start Game
    document.getElementById('genNewGame').onclick = function(){
        document.getElementById('genNewGame').innerHTML = 'Start Game'
        document.getElementById('genNewGame').classList.remove('bg-danger')
        document.getElementById('genNewGame').classList.add('bg-info')
       
        clearGame()
        clearInterval(drawBallInterval)
        generateRandHexColor()

        for(var c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(var r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        drawBallInterval = setInterval(function(){
            draw()
        }, 10)
    }
    

    // ============== Draw/Animate Ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = randBallColor
        ctx.fill();
        ctx.closePath();
      }
    // =============== Draw Paddle
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    // ============== Draw Bricks
    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
          }
        }
    }
    // =============== Draw
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore()
        collisionDetection();
      

        x += dx;
        y += dy;
        // ======== Bounce off canvas walls
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
 
        if(y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
              } else {
                clearInterval(drawBallInterval);
                document.getElementById('genNewGame').classList.remove('bg-info')
                document.getElementById('genNewGame').classList.add('bg-danger')
                clearGame()
              }

          
        }

        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
        }
    }
  

    
})(); //iif