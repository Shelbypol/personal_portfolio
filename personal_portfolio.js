(() => {


    const canvas = document.getElementById('my-house');
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;

    var cursorX;
    var cursorY;
    var vertices = [{x:0, y:0}]

    document.onclick = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
        console.log('cursorX', cursorX)
        console.log('cursorY', cursorY)



        vertices.push( {x:cursorX, y:cursorY} );
        animate(vertices)
        
    }

   
   
function animate(points){
     
    // let last_x = points[points.length-1].x;
    // let last_y = points[points.length-1].y;

        let start_points_x =  points[points.length-2].x;
        let start_points_y = points[points.length-2].y;

        let end_points_x = points[points.length-1].x
        let end_points_y = points[points.length-1].y

    //     drawLine(ctx, [last_x, last_y], [end_points_x, end_points_y], 'green', 5);
    //     ctx.stroke();
       
    ctx.lineWidth = 5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(start_points_x, start_points_y);
    ctx.moveTo(end_points_x, end_points_y);
    ctx.lineTo(300, 100);
    ctx.stroke();



}
  
  })(); //iif