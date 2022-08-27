(() => {


    const canvas = document.getElementById('my-house');
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;

    var cursorX;
    var cursorY;
    var points = [{x:0, y:0}]

    let count = 0;
    document.onclick = function(e){
       
        cursorX = e.pageX;
        cursorY = e.pageY;
        console.log('cursorX', cursorX)
        console.log('cursorY', cursorY)

        points.push( {x:cursorX, y:cursorY} );
        if(count > 0){
            animate(points, false)
        }else{
            animate(points, true)
        }
        count++;
    }

   
   
function animate(points, isFirstClick){
     console.log('points', points)
    let start_points_x =  points[points.length-2].x;
    let start_points_y = points[points.length-2].y;

    let end_points_x = points[points.length-1].x
    let end_points_y = points[points.length-1].y
       
    ctx.lineWidth = 5;

    // draw a red line
    if(isFirstClick){
        ctx.beginPath();
    }
    
    ctx.moveTo(start_points_x, start_points_y);
    ctx.moveTo(end_points_x, end_points_y);
    ctx.lineTo(300, 100);
    ctx.stroke();



}
  
  })(); //iif