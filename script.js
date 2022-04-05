const audio = new Audio("assets/complete.mp3");

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var lines = [];

  for (var i = 0; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(",");
    var arr = [];
    for (var j = 0; j < data.length; j++) {
      arr.push(data[j]);
    }
    lines.push(arr);
  }
  return lines;
}

function useData(data, line) {
  audio.play();
  type = data[line][0];
  intensity = data[line][1];
  full_time = data[line][2];
  var typeElement = document.getElementById("type");
  var typeIntensity = document.getElementById("intensity");
  typeElement.textContent = type
  typeIntensity.textContent = intensity
  timer(full_time, line + 1, data);
}

function timer(time, next_line, data) {
  var timer = setInterval(function () {
    var min = parseInt(time / 60);
    var sec = time - min * 60;
    minutes = min < 10 ? "0" + min : min;
    seconds = sec < 10 ? "0" + sec : sec;
    document.getElementById("this-time").innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time <= 0) {
      clearInterval(timer);
      useData(data, next_line);
    }
  }, 1000);
}

function total_timer() {
  var total_time = 0;
  setInterval(function () {
    var min = parseInt(total_time / 60);
    var sec = total_time - min * 60;
    minutes = min < 10 ? "0" + min : min;
    seconds = sec < 10 ? "0" + sec : sec;
    document.getElementById("total-time").innerHTML = `${minutes}:${seconds}`;
    total_time++;
  }, 1000);
}

var submit_button = document.getElementById("submit");

submit_button.onclick = function (e) {
  var about = document.getElementById("about");
  var info = document.getElementById("info");
  about.style = "display: none;";
  info.style = "display: block;";
  fetch("assets/data.txt")
    .then((response) => response.text())
    .then((text) => {
      var data = processData(text);
      total_timer();
      useData(data, 0);
    });
};
var end_button = document.getElementById("end");

end_button.onclick = function (e) {
  window.location.reload();
};
