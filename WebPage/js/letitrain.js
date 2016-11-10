/*
WRITTEN BY: Anniken Sandoey
PURPOSE: A fun little easteregg
StartDate: 1. November 2016
*/

var height = 0;
rainingPancakes = [];
var running = 0;

/* This is the main function that calls the other ones. */
function setup_letItRain(){
  document.getElementById('letitrain').onclick = function(){
    if(running == 0){
      var body = document.body,
          html= document.documentElement;
          height = Math.max(body.scrollHeight, body.offsetHeight,
                            html.clientHeight, html.scrollHeight, html.offsetHeight);

      fallingPancake();
      PancakeDrop();
      running = 1;
    }
  }
}
/* This function makes the pancake element and gives it the approperiate attributes,
it ends with a random timeout before it starts over again. A lot of the variables
have been assigned the random element in them to make the rain more dynamic. */
function PancakeDrop(){
    var pancake = document.createElement("IMG");
    pancake.setAttribute("src", "/WebProject/WebPage/img/pancake.png");
    pancake.style.maxWidth= 100+Math.random()*150 +"px";
    pancake.style.position="absolute";
    pancake.style.left=Math.random()*window.innerWidth +"px";
    pancake.rotation = 0;
    pancake.speed = 4+Math.random()*2;
    pancake.rotSpeed = Math.random()*10-5;
    pancake.top = -250;
    pancake.style.top = pancake.top + "px";
    document.body.appendChild(pancake);
    rainingPancakes.push(pancake);
    setTimeout(PancakeDrop, Math.random()*1000);
}

/* fallingPancake is where the fun stuff happens. It makes the pancakes spin and
"rain" down the screen. */
function fallingPancake(){
  rainingPancakes.forEach(function (element, i){

    element.top = element.top + element.speed;
    console.log(element.top + " " + element.speed);
    element.style.top = element.top + "px";

    if(element.y > height){
      element.parentElement.removeChild(element);
      rainingPancakes.splice(i, 1);
    }
    element.rotation += element.rotSpeed;
    element.style.transform = "rotate(" + (element.rotation) + "deg)";
  });
  setTimeout(fallingPancake, 10);
}
