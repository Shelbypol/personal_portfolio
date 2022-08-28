
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
    // =========== BALL VARS
    let randBallColor = generateRandHexColor()
    let drawBallInterval = null;
    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;

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

    console.log('rightPressed', rightPressed)
    console.log('leftPressed', leftPressed)

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
    }
    // ============== On Click Start Game
    document.getElementById('genNewGame').onclick = function(){
        document.getElementById('genNewGame').classList.remove('bg-danger')
        document.getElementById('genNewGame').classList.add('bg-info')
       
        clearGame()
        clearInterval(drawBallInterval)
        generateRandHexColor()
        // paddleEventListeners()
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

    // =============== Draw
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle()
        x += dx;
        y += dy;
        // ======== Bounce off canvas walls
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        // if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        // dy = -dy;
        // }
        if(y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            // alert("GAME OVER");
            console.log('GAME OVER')
            // document.location.reload();
            clearInterval(drawBallInterval);
            document.getElementById('genNewGame').classList.remove('bg-info')
            document.getElementById('genNewGame').classList.add('bg-danger')
            clearGame()
            // Needed for Chrome to end game
        }

        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
        }
    }
  

    
})(); //iif