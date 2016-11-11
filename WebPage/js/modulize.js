/*
WRITTEN BY: Thomas Lund Mathisen
DATE: 09.11.2016
PURPOSE: Load basic elements to the webpage
*/

let basicCounter = 0;

function basicLoad(){
  basicCounter -= 1;
  if(basicCounter == 0){
    remove_loading_elements();
    loadModules();
    moduleLoaded();
  }
}

let moduleCounter = 1;
function moduleLoaded(){
  moduleCounter -= 1;
  if(moduleCounter == 0){
    setup_done();
    setup_letItRain();
  }
}

function loadDoc(container, module, first, input=[], callback=moduleLoaded) {
  if(callback == basicLoad){
    basicCounter += 1;
  }else if(callback == moduleLoaded){
    moduleCounter += 1;
  }

  console.log("Started " + module);

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      for(var i = 0; i < input.length; i++){
        text = text.replace("{" + i + "}", input[i]);
      }

      if(first){
        container.innerHTML = text + container.innerHTML;
      }else{
        container.innerHTML += text;
      }
      console.log("Done " + module);
      callback();
    }
  };
  xhttp.open("GET", "/martiwes/module/" + module + ".html", true);
  xhttp.send();
}

function setup(){
  loadDoc(document.head, "head", true, [], basicLoad);
  loadDoc(document.body, "header", true, [], basicLoad);
  loadDoc(document.body, "footer", false, [], basicLoad);
}

function remove_loading_elements(){
  let del = document.getElementsByClassName("delete");
  for(var i = 0; i < del.length; i++){
    document.body.removeChild(del[i]);
  }
}

function setup_done(){}
function loadModules(){}
setup();
