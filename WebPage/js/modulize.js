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
  loadDoc(document.getElementsByTagName("head")[0], "head", false);
  loadDoc(document.getElementsByTagName("body")[0], "header", true);
  loadDoc(document.getElementsByTagName("body")[0], "footer", false);
  var container = document.getElementById("box-container");
  loadDoc(container, "box", false, ["Digns", "Her er mye fin info"]);
  loadDoc(container, "box", false, ["Dumpeditt", "Wiho lorem ipseifmdsk fdsfj dsakd easd"]);
  loadDoc(container, "box", false, ["Wioioioioi", "Hola hola hola"]);
}

setup();
