<script type="text/javascript">
function checkTime() {
  var d, hours, mins, day;
     d = new Date(); // current time
     hours = d.getHours(),
     mins = d.getMinutes();
     day = d.getDay();
     console.log(hours);
     console.log(mins);
    if (hours < 10) { //Making the clock display properly
      if (mins < 10) {
        document.getElementById("time").innerHTML = "0" + hours + ":" + "0" + mins;
      }
      else {
        document.getElementById("time").innerHTML = "0" + hours + ":" + mins;
      }
    }
    else {
      if (mins < 10) {
      document.getElementById("time").innerHTML = hours + ":" + "0" + mins;
      }
      else {
        document.getElementById("time").innerHTML = hours + ":" + mins;
       }
      }
    var greetingMorning, greetingLunch, greetingDinner, greetingNight;
    var adviceMorning, adviceLunch, adviceDinner, adviceNight;
    greetingMorning = "Nei god morgen kjære medmenneske! Opp og si god morgen Norge!";
    greetingLunch = "Nå nærmer det seg midt på dagen, kanskje hører du klangen fra magen?";
    greetingDinner = "På tide å finne noe å ete, kanskje noe med mjølk og hvete?";
    greetingNight = "På nattestid, kaldt og rått. Gå inn på kjøkkenet og lag deg noe godt!";
    adviceMorning = "PANNEKAKER";
    adviceLunch = "PANNEKAKER";
    adviceDinner = "PANNEKAKER";
    adviceNight = "PANNEKAKER";
    if (6 < hours  && hours < 10) { //Morning
      document.getElementById("greeting").innerHTML = greetingMorning;
      document.getElementById("advice").innerHTML = adviceMorning;
    }
    else if (10 <= hours && hours < 14) { //Lunch
      document.getElementById("greeting").innerHTML = greetingLunch;
      document.getElementById("advice").innerHTML = adviceLunch;
    }
    else if (14 <= hours && hours <= 20) { // Dinner
      document.getElementById("greeting").innerHTML = greetingDinner;
      document.getElementById("advice").innerHTML = adviceDinner;
    }
    else {                                //Nightsnack
      document.getElementById("greeting").innerHTML = greetingNight;
      document.getElementById("advice").innerHTML = adviceNight;
    }
    setInterval(checkTime, 1000);
}
 </script>
