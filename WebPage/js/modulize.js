/*
WRITTEN BY: Thomas Lund Mathisen
PURPOSE: Load basic elements to the webpage
*/

function loadDoc(container, module, first, input=[]) {
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
    }
  };
  xhttp.open("GET", "/WebProject/WebPage/module/" + module + ".html", true);
  xhttp.send();
}

function setup(){
  loadDoc(document.head, "head", false);
  loadDoc(document.body, "header", true);
  loadDoc(document.body, "footer", false);

  setTimeout(function(){
    let del = document.getElementsByClassName("delete");
    console.log(del);
    for(var i = 0; i < del.length; i++){
      document.body.removeChild(del[i]);
    }
  }, 10);
}

setup();
