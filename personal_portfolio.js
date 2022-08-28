(() => {


    const canvas = document.getElementById('my-house');
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;

    var cursorX;
    var cursorY;
    var points = [{x:0, y:0}]

    let msLineInterval = setInterval(function(){
        getRandomInRange(0, 450,1)
    }, 1)

    function generateRandHexColor(){
       
       let randColor = Math.floor(Math.random()*16777215).toString(16);
       let hexColor = '#'+randColor
       return hexColor
    }




    function getRandomInRange(from, to, fixed) {
        let rand_x = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        let rand_y = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
        generateRandPointsArr(rand_x, rand_y)
       
        // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

    function generateRandPointsArr(x, y){
        cursorX = x;
        cursorY = y;
        console.log('cursorX', cursorX)
        console.log('cursorY', cursorY)

        points.push( {x:cursorX, y:cursorY} );
        animate(points)
    }

    document.onclick = function(e){
        clearInterval(msLineInterval)
    //     getRandomInRange(180, 180, 3)
    //     cursorX = e.pageX;
    //     cursorY = e.pageY;
    //     console.log('cursorX', cursorX)
    //     console.log('cursorY', cursorY)

    //     points.push( {x:cursorX, y:cursorY} );
    //     animate(points)

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
  
  })(); //iif