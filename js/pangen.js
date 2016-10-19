
var ctx;
var down=false;
var position;
var color = [255, 255, 200];

function setup(){
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.lineWidth=10;
  update_color();
}

function mouse_down(evt){
  down = true;
  ctx.beginPath();
}

function mouse_up(evt){
  down = false;
}

function update_color(){
  color[0] -= 0.1;
  color[1] -= 0.1;
  color[2] -= 0.1;
  ctx.strokeStyle = 'rgb(' + parseInt(color[0]) + ',' + parseInt(color[1]) + ',' + parseInt(color[2]) + ')';
  console.log('rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
}

function mouse_move(evt){
  if(down==true){
    update_color();
    ctx.lineTo(evt.clientX-8, evt.clientY-8);
    ctx.stroke();
  }
}
