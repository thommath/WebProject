

function loop(){
  if(down){
    down = !down;
    arrow.style.paddingTop = "0.5em";
  }else{
    down = !down;
    arrow.style.paddingTop = "0em";
  }
  console.log(down);
  setTimeout(loop, 1000);
}
var down;
var arrow;

window.onload = function(){
  arrow = document.getElementById("arrow-down")
  down = false;
  loop();
}
