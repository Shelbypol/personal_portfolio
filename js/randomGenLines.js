
(() => {

    const canvas = document.getElementById('my-house');
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;

    var cursorX;
    var cursorY;
    var points = [{x:0, y:0}]

    let msLineInterval;

    // ============== Gen rand lines btn
    document.getElementById('genRandLines').onclick = function(){
        clearInterval(msLineInterval)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        msLineInterval = setInterval(function(){
            getRandomInRangePoints(0, 450,1)
        }, 1)
    }     
    
    // ============== Gen Rand Hex Color
    function generateRandHexColor(){
       let randColor = Math.floor(Math.random()*16777215).toString(16);
       let hexColor = '#'+randColor
       return hexColor
    }

    function getRandomInRangePoints(from, to, fixed) {
        let rand_x = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        let rand_y = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        generateRandPointsArr(rand_x, rand_y)
    }

    function generateRandPointsArr(x, y){
        cursorX = x;
        cursorY = y;
        console.log('cursorX', cursorX)
        console.log('cursorY', cursorY)

        points.push( {x:cursorX, y:cursorY} );
        animate(points)
    }


    function animate(points){
        let start_points_x =  points[points.length-2].x;
        let start_points_y = points[points.length-2].y;

        let end_points_x = points[points.length-1].x
        let end_points_y = points[points.length-1].y
        
        ctx.lineWidth = 5;
        ctx.beginPath();
        
        ctx.moveTo(start_points_x, start_points_y);
        ctx.lineTo(end_points_x, end_points_y);
    
        ctx.strokeStyle = generateRandHexColor()
        ctx.stroke();

    }


       // ctx.lineWidth = 1;

    // var cursorX;
    // var cursorY;
    // var points = [{x:0, y:0}]

    // let msLineInterval;

    // ============== On Click Gen rand lines btn
    // document.getElementById('genRandLines').onclick = function(){
    //     clearInterval(msLineInterval)
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     msLineInterval = setInterval(function(){
    //         getRandomInRangePoints(0, 450,1)
    //     }, 1)
    // }     

    // // ============== Gen Rand {x, y} 
    // function getRandomInRangePoints(from, to, fixed) {
    //     let rand_x = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    //     let rand_y = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    //     generatePointsArr(rand_x, rand_y)
    // }

    // // ============== Gen Points Arr  = [{x, y}, {x, y}] 
    // function generatePointsArr(x, y){
    //     cursorX = x;
    //     cursorY = y;
    //     console.log('cursorX', cursorX)
    //     console.log('cursorY', cursorY)

    //     points.push( {x:cursorX, y:cursorY} );
    //     animate(points)
    // }

        // =============== Animate Line
    // function animate(points){
    //     let start_points_x =  points[points.length-2].x;
    //     let start_points_y = points[points.length-2].y;

    //     let end_points_x = points[points.length-1].x
    //     let end_points_y = points[points.length-1].y
        
    //     ctx.lineWidth = 5;
    //     ctx.beginPath();
        
    //     ctx.moveTo(start_points_x, start_points_y);
    //     ctx.lineTo(end_points_x, end_points_y);
    
    //     ctx.strokeStyle = generateRandHexColor()
    //     ctx.stroke();

    // }

    
})(); //iif