/*
WRITTEN BY: Thomas Lund Mathisen
DATE: 12.11.2016
PURPOSE: Load basic elements to the webpage and loading elements defined in each file in the right order

How it works:
First the setup function is called loading the head, header and footer elements.
When these elements are loaded they are written into the body and head element before they call the callback function basicLoad.
This function finds out if all basic elements are loaded and then proceed to load each module.
LoadModules function is called and every module is loaded
After all modules are loaded the function setup_done is called and modules can safely be loaded into the website

Explaination:
This is an ineffective way to load each element, but because of the restrictions on other technologies ajax is the only way to load these modules.
With this js each module will be configured in each html file so this file doesn't need to be altered and therfore it is easier to debug and easier to understand the code.
This script loads the modules in two parts using callback functions. With the callback functions it can be customized facy in each file, while still being easy to use for simple modules.
It is a bit slower, but removes all bugs by dependencies that might occur.
It is quite easy to use but most importantly, flexible, fast and bug free.
If the user wants to create a module for a module, which is not recomended, it is possible through the callback function option.

How to use:
In each html file this file should be included so it loads every default module. Do this by adding this absolute path to the file: <script src="/martiwes/js/modulize.js" charset="utf-8"></script>
You are good to go!

To load a module you simply make a script after loading this where you override the loadModules function and call loadDoc(container, module) where you send an element as container and a string with a module name.
if the container is body you are good to go, but else you need to append the container after it is loaded by overriding the setup_done function and adding the container as a child to the parent element.

Example:
  var container = document.createElement("section");

  //@Override
  function loadModules(){
    loadDoc(container, "box", false, ["Digns", "Her er mye fin info"]);
    loadDoc(container, "box", false, ["Dumpeditt", "Wiho lorem ipseifmdsk fdsfj dsakd easd"]);
    loadDoc(container, "box", false, ["Wioioioioi", "Hola hola hola"]);
  }

  //@Override
  function setup_done(){
    document.getElementById("box-container").appendChild(container);
  }

The module box contains two textfields marked with {0} and {1}. These will be replaced with the text in the array.


The loadModules function can take in 5 parameters, container, module, first, input and callback. The first 4 is pretty basic, but the callback is where it gets exciting, With the callback function the sky is the limit. You can make your own callback function for each element telling it to do whatever you want. The most conveniant thing you can do is to load another module that dependes on the first, it is not recomended but possible! Be creative!

All the functions can be overridden, but we recomend that you don't alter the basic methods.

*/



/*
Name: basicLoad
Purpouse: Keeping track of how many basic modules that hasn't been loaded and start the module loading process when done.
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


/*
Name: moduleLoaded
Purpouse: Keeping track of how many custom modules that hasn't been loaded and call setup_done when done. All pages should have let it rain so this will also be called
*/

let moduleCounter = 1;
function moduleLoaded(){
  moduleCounter -= 1;
  if(moduleCounter == 0){
    setup_done();
    setup_letItRain();
  }
}


/*
Name: loadDoc
Purpouse: Loading and adding a module to a container
Explaination:
First tells the counting functions what kind of module it is if no custom callback.
Then it makes an ajax file request for the right module
When the file is loaded it will insert the custom text before it insterts the module into the container
Then it calls the callback function before it is done
*/

function loadDoc(container, module, first=false, input=[], callback=moduleLoaded) {
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

/*
Name: setup
Purpouse: Load basic modules
*/

function setup(){
  loadDoc(document.head, "head", true, [], basicLoad);
  loadDoc(document.body, "header", true, [], basicLoad);
  loadDoc(document.body, "footer", false, [], basicLoad);
}


/*
Name: remove_loading_elements
Purpouse: if the site has any loading screen elements these will be removed
*/

function remove_loading_elements(){
  let del = document.getElementsByClassName("delete");
  for(var i = 0; i < del.length; i++){
    document.body.removeChild(del[i]);
  }
}


/*
functions that might be overwritten in the html file
*/

function setup_done(){}
function loadModules(){}


/*
Calls the setup function to get the show started
*/

setup();
