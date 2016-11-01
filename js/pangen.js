coor_array = [];
stroke_array = [];
var ctx;

function setup(){
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.lineWidth=10;
}

var down=false;
var color = [255, 255, 200];

function thickness(elem){
  document.getElementById("thickness").innerHTML=elem.value;
  ctx.lineWidth = elem.value;
}

function mouse_down(evt){
  down = true;
  stroke_array.push({x:evt.clientX-8, y:evt.clientY-8, z:ctx.lineWidth});
}

function mouse_up(evt){
  down = false;
  if(stroke_array.length > 1){
    coor_array.push(stroke_array);
  }
  stroke_array = [];
}

function update_color(){
  color[0] -= 0.1;
  color[1] -= 0.1;
  color[2] -= 0.1;
  ctx.strokeStyle = 'rgb(' + parseInt(color[0]) + ',' + parseInt(color[1]) + ',' + parseInt(color[2]) + ')';
  console.log('rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
}

function mouse_move(evt){
  if(down==true && Math.pow(stroke_array[stroke_array.length-1].x-evt.clientX+8, 2)+Math.pow(stroke_array[stroke_array.length-1].y-evt.clientY+8, 2)>1000/(ctx.lineWidth)){
    stroke_array.push({x:evt.clientX-8, y:evt.clientY-8, z:ctx.lineWidth});
    draw();
  }
}

function draw(){
  ctx.clearRect(0, 0, 1000, 1000);
  var temp = ctx.lineWidth;

  for (i in coor_array){
    ctx.beginPath();
    ctx.lineWidth = coor_array[i][0].z;
    ctx.moveTo(coor_array[i][0].x, coor_array[i][0].y);
    for(let n = 1; n < coor_array[i].length; n++){
      ctx.lineTo(coor_array[i][n].x, coor_array[i][n].y);
    }
    ctx.stroke();
  }

  if(stroke_array.length > 1){
    ctx.beginPath();
    ctx.moveTo(stroke_array[0].x, stroke_array[0].y);
    ctx.lineWidth = stroke_array[0].z;
    for (i in stroke_array){
      ctx.lineTo(stroke_array[i].x, stroke_array[i].y);
    }
    ctx.stroke();
  }
  ctx.lineWidth = temp;
}
