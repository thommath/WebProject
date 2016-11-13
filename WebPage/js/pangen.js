/*
Name: Maria Ivashentseva and Thomas Lund Mathissen
Purpose: Adding functionality to the PanGen canvas element.

Requirements:
The user should be able to draw lines on the canvas to get an image up.
The drawing should be sent to the panbot server as a list of commands on the format [{x: , y: , f: , t: }, ...] as a json string with a post request.

How it works:
When the user moves the mouse over the pangen the mouse_move will be triggered. This function will check if the mouse button is down and add a line to the canvas if the line long enough to minimize number of commands required.
When the user clicks the mouse button down it will start a new line in a temp array called stroke_array and it will remeber that the button is down.
When the user releases the button the mouse_up will be triggered and the stroke will be saved as an array in coor_array
Each time one of these function is called the draw function is called updating the canvas with the new strokes.
*/

/*
Creating global variables
*/
var coor_array = [];
var stroke_array = [];
var del_array = [];
var ctx;
var down = false;
let defaultColor = [229, 160, 50];
var color = defaultColor;

/*
Logging the stroke elements for debugging Purposes
*/
setInterval(function () {
  console.log(coor_array);
}, 5000)

/*
Name: setup_pangen
Purpose: Get elements and set default values + draw a greeting message on the canvas
*/
function setup_pangen(){
  ctx = document.getElementById('canvas').getContext('2d');
  ctx.font="50px Georgia";
  ctx.fillText("PanGen", 10, 120);
  ctx.font="12px Georgia";
  ctx.fillText("Start drawing and press submit to print your own pancake!", 30, 150);
  ctx.lineWidth=10;
  console.log("Canvas setup done");
}


/*
Name: mouse_down
Purpose: remember that the mouse button is pressed and save the first element in the temp array relative to the canvas.
*/
function mouse_down(evt){
  down = true;
  stroke_array.push(getPoint(evt.clientX, evt.clientY));

}

/*
Name: mouse_up
Purpose: remember mouse button is released, pushing the last stroke to the array if it is a line and not just a point before clearing the temp array
*/
function mouse_up(evt){
  down = false;
  if(stroke_array.length > 1){
    coor_array.push(stroke_array);
  }
  stroke_array = [];
}

/*
Name: update_color
Purpose: Make the color a bit lighter for each time the function is called
*/
function update_color(){
  color[0] += 0.5;
  color[1] += 0.5;
  color[2] += 0.5;
  ctx.strokeStyle = 'rgb(' + parseInt(color[0]) + ',' + parseInt(color[1]) + ',' + parseInt(color[2]) + ')';
}

/*
Name: mouse_move
Purpose: Save the current relative position if the mouse is pressed and long enough away from last point
*/
function mouse_move(evt){
  if(down==true && Math.pow(stroke_array[stroke_array.length-1].x-(evt.clientX-offsetX()), 2)+ Math.pow(stroke_array[stroke_array.length-1].y-(evt.clientY-offsetY()), 2)>1000/(ctx.lineWidth)){
    stroke_array.push(getPoint(evt.clientX, evt.clientY));
    draw();
  }
}

/*
Name: draw
Purpose: Draw each line on the canvas with the right width and color, including the temp line
*/
function draw(){
  //Counting the length of each stroke in coor array and stroke array to Calculate the starting color for the pancake
  let nr = 0;
  for (i in coor_array){
    for(let n = 1; n < coor_array[i].length; n++){nr++;}
  }

  for (i in stroke_array){nr++;}

  //Setting start color and empyting the canvas
  color = [defaultColor[0]-nr*0.5, defaultColor[1]-nr*0.5, defaultColor[2]-nr*0.5];
  ctx.clearRect(0, 0, 1000, 1000);

  //Saving the line width
  var temp = ctx.lineWidth;

  //Looping through each line and drawing them as one stroke each to maximize design and minimize resources needed
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

  //Drawing the temp line if there is one
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

  //Setting back the line width
  ctx.lineWidth = temp;
}


/*
Name: undo
Purpose: Remove the last element in coor_array and adding it to a list of deleted strokes
*/
function undo(bamsemoms){
  del_array.push(coor_array.pop());
  draw();
}

/*
Name: redo
Purpose: Remove the last element in deleted strokes and adding to coor_array
*/
function redo(bamse){
  coor_array.push(del_array.pop());
  draw();
}

/*
Name: thickness
Purpose: update the thickness of the brush when the slider is changed
*/
function thickness(elem){
  document.getElementById("thickness").innerHTML=elem.value;
  ctx.lineWidth = elem.value;
}

/*
Name: getPoint
Purpose: returns a point relative to the canvas
*/

function getPoint(mouseX, mouseY){
  return {x:mouseX-offsetX(), y:mouseY-offsetY(), z:ctx.lineWidth};
}

/*
Name: offsetX
Purpose: get the offset from canvas to the left side
*/
function offsetX(){
  return (window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth)/2-250;
}

/*
Name: offsetY
Purpose: get the offset from canvas to the top
*/
function offsetY(){
  if(document.getElementById('heightHeader')){
    return document.getElementById('heightHeader').offsetHeight + 74;
  }
  return 74;
}

/*
Name: submit
Purpose: Converting the data to the right format and send them to the server
*/
function submit(){
  //Adding each stroke to temp_arr on the right format, only points and how thick the stroke is (0 for only moving)
  temp_arr = [];
  for (i in coor_array){
    temp_arr.push({"x":coor_array[i][0].x, "y":coor_array[i][0].y,"f":0,"t":0});
    for(let n = 1; n < coor_array[i].length; n++){
      temp_arr.push({"x":coor_array[i][n].x, "y":coor_array[i][n].y,"f":coor_array[i][n].z,"t":0});
    }
  }
  //Convert commands to json string
  var made_for_database = JSON.stringify(temp_arr);

  //Creating a form to send to the server
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "http://panbot.atwebpages.com/submit.php");

  //Adding name to the beautful drawing
  var hiddenField = document.createElement("input");
     hiddenField.setAttribute("type", "hidden");
     hiddenField.setAttribute("name", "name");
     hiddenField.setAttribute("value", "value_draw");
     form.appendChild(hiddenField);

  //Adding the json to the form
  var hiddenField2 = document.createElement("input");
     hiddenField2.setAttribute("type", "hidden");
     hiddenField2.setAttribute("name", "commands");
     hiddenField2.setAttribute("value", made_for_database);
     form.appendChild(hiddenField2);

  //Append and submit the form
  document.body.appendChild(form);
  form.submit();
}
