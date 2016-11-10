/*
WRITTEN BY: Anniken Sandoey
PURPOSE: A fun little easteregg
StartDate: 1. November 2016
*/

var height = 0
rainingPancakes = []

/* This is the main function that calls the other ones. */
function setup(){
  var body = document.body,
  html= document.documentElement;
  height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
    fallingPancake();
    PancakeDrop();
}
/* This function makes the pancake element and gives it the approperiate attributes,
it ends with a random timeout before it starts over again. A lot of the variables
have been assigned the random element in them to make the rain more dynamic. */
function PancakeDrop(){
    var pancake = document.createElement("IMG");
    pancake.setAttribute("src", "pancake.png");
    pancake.style.maxWidth= 100+Math.random()*150 +"px";
    pancake.style.position="absolute";
    pancake.style.left=Math.random()*window.innerWidth +"px";
    pancake.rotation = 0;
    pancake.speed=4+Math.random()*2;
    pancake.rotSpeed=Math.random()*10-5;
    pancake.y = -50;
    pancake.style.top=pancake.y + "px";
    document.body.appendChild(pancake);
    rainingPancakes.push(pancake);
    setTimeout(PancakeDrop, Math.random()*1000);
}

/* fallingPancake is where the fun stuff happens. It makes the pancakes spin and
"rain" down the screen. */
function fallingPancake(){
  rainingPancakes.forEach(function (element, i){

    element.style.top=element.y + element.speed + "px";
    if(element.y > height){
      element.parentElement.removeChild(element);
      rainingPancakes.splice(i, 1);
    }
    element.rotation += element.rotSpeed;
    element.style.transform = "rotate(" + (element.rotation) + "deg)";
  });
  setTimeout(fallingPancake, 10);
}
