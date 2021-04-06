// variables
var start = false;
var curr = 0;
var interval = 1000;
var lvl = 0;
// Array containing all button colors
var colorArray = ["green", "red", "yellow", "blue"];

// Empty array holds game answers
var tempArray = new Array(0);
var answerArray = new Array(0);

// Get random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var n = Math.floor(Math.random() * (max - min)) + min;
  return n;
}

// Set color values into array
function setAnswerArray() {
  var r = getRandomInt(0, 4);
  answerArray.push(colorArray[r]);
}

// Copy the answer array for alterations
function copyAnswerArray() {
  tempArray = new Array(0);
  for (let i = 0; i < answerArray.length; i++) {
    tempArray[i] = answerArray[i];
  }
}

// Check user input to answer/tempArray
function checkAnswer(color, curr) {
  var check = tempArray[curr];
  if (color == check) {
    return 1;
  } else {
    return 0;
  }
}

// Play pattern for User
function previewPattern(i) {
  console.log("previewPatern");
  $(".running").css("display","block");
  $(".play").css("display","none");
  var s = answerArray[i];
  if (i == answerArray.length) {
    $(".running").css("display","none");
    $(".play").css("display","block");
    return;
  } else {
    setTimeout(function() {
      // Set the timeout for the color change
      setTimeout(function() {
        $("button." + s).toggleClass("pressed");
      }, interval);
      //set the timeout for the audio
      playSound(s);
      //recursively go to the next index
      $("button." + s).toggleClass("pressed");
      previewPattern(i + 1);
    }, interval);
  }
}

// Check if tempArray is empty FILO
function isEmpty(){
  if(curr == tempArray.length){
    return 1;
  }
  else{
    return 0;
  }
}

// User clicks on key to start games/function
$(document).on("keydown", function() {
  if(!start){
    console.log("start");
    $(".restart").css("display","none");
    $(".title").css("display", "none");
    $(".fail").css("display", "none");
    setAnswerArray();
    copyAnswerArray();
    previewPattern(0);
    start = true;
  }
});

$("button").on("click", function(event) {
  console.log("mouseEvent");
  var check = 1;
  var btn = ($(this).attr("name"));
  switch (btn) {
    case "green":
      playSound(btn);
      check = checkAnswer(btn, curr);
      curr+=1;
      break;
    case "red":
      playSound(btn);
      check = checkAnswer(btn, curr);
      curr+=1;
      break;
    case "yellow":
      playSound(btn);
      check = checkAnswer(btn, curr);
      curr+=1;
      break;
    case "blue":
      playSound(btn);
      check = checkAnswer(btn, curr);
      curr+=1;
      break;
  }
  if(answerArray.length > 0){
    if (!!(check) != true) {
      $(".fail").css("display", "block");
      $(".restart").css("display","block");
      $(".play").css("display","none");
      $(".level").css("display", "none");
      playSound("wrong");
      tempArray = new Array(0);
      answerArray = ["green", "yellow", "red"];
      lvl = 0;
      curr = 0;
      start = false;
    } else if (!!(isEmpty()) == true && !!(check)) {
      setAnswerArray();
      copyAnswerArray();
      previewPattern(0);
      $(".level").css("display", "block").text("level "+lvl);
      lvl += 1;
      curr = 0;
    }
  }
});

// User clicks on buttons and generates sounds
function playSound(c) {
  // console.log("playSound");
  var a = new Audio("sounds/" + c + ".mp3");
  a.volume = 0.1;
  a.play();
}
