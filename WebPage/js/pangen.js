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
  color[0] += 0.6;
  color[1] += 0.6;
  color[2] += 0.6;
  ctx.strokeStyle = 'rgb(' + parseInt(color[0]) + ',' + parseInt(color[1]) + ',' + parseInt(color[2]) + ')';
  // console.log('rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
}

function mouse_move(evt){
  if(down==true && Math.pow(stroke_array[stroke_array.length-1].x-evt.clientX+8, 2)+Math.pow(stroke_array[stroke_array.length-1].y-evt.clientY+8, 2)>1000/(ctx.lineWidth)){
    stroke_array.push({x:evt.clientX-8, y:evt.clientY-8, z:ctx.lineWidth});
    draw();
  }
}

function draw(){
  let nr = 0;for (i in coor_array){for(let n = 1; n < coor_array[i].length; n++){nr++;}}for (i in stroke_array){nr++;}

  color = [255-nr*0.6, 255-nr*0.6, 200-nr*0.6];
  ctx.clearRect(0, 0, 1000, 1000);
  var temp = ctx.lineWidth;

  for (i in coor_array){
    ctx.beginPath();
    ctx.lineWidth = coor_array[i][0].z;
    ctx.moveTo(coor_array[i][0].x, coor_array[i][0].y);
    for(let n = 1; n < coor_array[i].length; n++){
      ctx.lineTo(coor_array[i][n].x, coor_array[i][n].y);
      update_color();
    }
    ctx.stroke();
  }

  if(stroke_array.length > 1){
    ctx.beginPath();
    ctx.moveTo(stroke_array[0].x, stroke_array[0].y);
    ctx.lineWidth = stroke_array[0].z;
    for (i in stroke_array){
      ctx.lineTo(stroke_array[i].x, stroke_array[i].y);
      update_color();
    }
    ctx.stroke();
  }
  ctx.lineWidth = temp;
}

del_array = [];

function undo(bamsemoms){
  del_array.push(coor_array.pop());
  draw();
}

function redo(bamse){
  coor_array.push(del_array.pop());
  draw();
}

function submit(){
  temp_arr = [];
  for (i in coor_array){
    temp_arr.push({"x":coor_array[i][0].x, "y":coor_array[i][0].y,"f":0,"t":0});
    for(let n = 1; n < coor_array[i].length; n++){
      temp_arr.push({"x":coor_array[i][n].x, "y":coor_array[i][n].y,"f":coor_array[i][n].z,"t":0});
    }
  }
  var made_for_database = JSON.stringify(temp_arr);

  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "http://panbot.atwebpages.com/submit.php");

  var hiddenField = document.createElement("input");
     hiddenField.setAttribute("type", "hidden");
     hiddenField.setAttribute("name", "name");
     hiddenField.setAttribute("value", "ygrfht"); //TODO fix it S
     form.appendChild(hiddenField);

  var hiddenField2 = document.createElement("input");
     hiddenField2.setAttribute("type", "hidden");
     hiddenField2.setAttribute("name", "commands");
     hiddenField2.setAttribute("value", made_for_database);
     form.appendChild(hiddenField2);

  document.body.appendChild(form);
  form.submit();
}
