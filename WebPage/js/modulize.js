/*
WRITTEN BY: Thomas Lund Mathisen
DATE: 09.11.2016
PURPOSE: Load basic elements to the webpage
*/

let loadCounter = 0;

function fileLoaded(){
  loadCounter -= 1;
  if(loadCounter == 0){
    remove_loading_elements();
    setup_done();
    setup_letItRain();
  }
}

function loadDoc(container, module, first, input=[]) {
  loadCounter += 1;

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
      fileLoaded();
    }
  };
  xhttp.open("GET", "/WebProject/WebPage/module/" + module + ".html", true);
  xhttp.send();
}

function setup(){
  loadDoc(document.head, "head", true);
  loadDoc(document.body, "header", true);
  loadDoc(document.body, "footer", false);
}

function remove_loading_elements(){
  let del = document.getElementsByClassName("delete");
  for(var i = 0; i < del.length; i++){
    document.body.removeChild(del[i]);
  }
}

function setup_done(){}

setup();
