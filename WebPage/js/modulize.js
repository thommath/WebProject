function loadDoc(container, module, input=[]) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var text = this.responseText;
      for(var i = 0; i < input.length; i++){
        console.log("tolo");
        text = text.replace("{" + i + "}", input[i]);
      }
     container.innerHTML += text;
    }
  };
  xhttp.open("GET", "module/" + module + ".html", true);
  xhttp.send();
}


function setup(){
  loadDoc(document.getElementById("header"), "header");
  var body = document.getElementById("box-container");
  loadDoc(body, "box", ["Digns", "Her er mye fin info"]);
  loadDoc(body, "box", ["Dumpeditt", "Wiho lorem ipseifmdsk fdsfj dsakd easd"]);
  loadDoc(body, "box", ["Wioioioioi", "Hola hola hola"]);
}
