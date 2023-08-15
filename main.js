// lestrangeqq@gmail.com
// serverwind.dev@gmail.com
// 2023 - Tests script, v2

let score = 0;

document.addEventListener("DOMContentLoaded", (event) => {
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = "0.4";

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = "move";

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add("over");
  }

  function handleDragLeave(e) {
    this.classList.remove("over");
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = "1";

    items.forEach(function (item) {
      item.classList.remove("over");
    });
  }

  let items = document.querySelectorAll(".drag-q .word");
  let cols = document.querySelectorAll(".drag-q .col-1, .drag-q .col-2, .drag-q .col-3");
  let missedWords = document.querySelectorAll(".insert-word");
  items.forEach(function (item) {
    item.addEventListener("dragstart", handleDragStart, false);
    item.addEventListener("dragenter", handleDragEnter, false);
    item.addEventListener("dragover", handleDragOver, false);
    item.addEventListener("dragleave", handleDragLeave, false);
    item.addEventListener("drop", handleDrop, false);
    item.addEventListener("dragend", handleDragEnd, false);
  });

  cols.forEach(function (col) {
    col.addEventListener("dragover", handleDragOver, false);
    col.addEventListener("dragenter", handleDragEnter, false);
    col.addEventListener("dragleave", handleDragLeave, false);
    col.addEventListener("drop", handleDrop, false);
  });

  missedWords.forEach(function (word) {
    word.addEventListener("dragover", handleDragOver, false);
    word.addEventListener("dragenter", handleDragEnter, false);
    word.addEventListener("dragleave", handleDragLeave, false);
    word.addEventListener("drop", handleDrop, false);
  });
});

/* [lestrangeqq@gmail.com 2021] */

let parentElement = document.querySelector("#parent");
let allQuestions = document.querySelectorAll(".every-q");
let end = document.querySelector(".end");
let testStatus = document.getElementById("test-status");
const TESTNAME = "marlins";

const TRAINING = document.getElementById("training");
TRAINING.addEventListener("click", trainingRegime);

const EXAM = document.getElementById("exam");
EXAM.addEventListener("click", examRegime);

const HINT = document.getElementById("hint");

HINT.addEventListener("click", showAnswer);

const CHECK = document.getElementById("check-results");

//ИНТЕРАКТИВ
const REGIME = document.getElementById("regime");
const START = document.getElementById("start-test");
const H1 = document.querySelector("h1");
const TESTDESC = document.getElementById("test-desc");
const HEADER = document.querySelector("header");
const MAINAREA = document.querySelector("main");
const RESULT = document.getElementById("result");
const BODY = document.querySelector("body");
const QNUMBER = document.getElementById("q-number");
const CLOSE = document.getElementById("close");
const CURRENTQ = document.getElementById("current-q");
const TOTALQ = document.getElementById("total-q");
const NOTE = document.getElementById("note");
const TIMER = document.getElementById("q-time");
const MISC = document.getElementById("misc");
const SCORE = document.getElementById("score-points");
let minutesBlock = document.getElementById("minutes");
let secondsBlock = document.getElementById("seconds");

let amountOfQ = document.querySelectorAll(".questions");
let amountOfA = document.querySelectorAll("q-var");

CLOSE.addEventListener("click", closeTest);

let q = 0;
let finish = 0;
let s = 0;
let qNum = 1;

const POINTS = document.getElementById("points");

function checkRecords() {
  if (localStorage.getItem(TESTNAME + "_res") == null) {
    testStatus.innerHTML = '<i class="fas fa-info-circle"></i> Похоже вы в первый раз будете проходить данный тест. Удачи!';
  } else {
    testStatus.innerHTML = '<i class="fas fa-info-circle"></i> Вы уже пытались пройти этот тест, и ваш лучший результат был <b>' + localStorage.getItem(TESTNAME) + "</b> правильных ответов.";
  }
}
checkRecords();

document.querySelectorAll(".q-var").forEach((input) => input.addEventListener("click", markAnswer));

function markAnswer() {
  this.classList.toggle("chosen");
  // this.firstChild.classList.toggle("checked-circle");
}

CHECK.addEventListener("click", checkResults);

function checkResults() {
  finish++;

  this.parentElement.classList.add("hidden-q");
  this.parentElement.classList.add("answered-q");
  let qwrapper = document.getElementById("qWrapper");
  qwrapper.prepend(RESULT);
  RESULT.classList.remove("hidden-q");
  NOTE.classList.add("hidden-q");
  START.innerHTML = "Показать результат";
  TIMER.style.opacity = "0";
  HINT.style.display = "none";
  CHECK.style.display = "none";

  let percent = Math.round((score / 60) * 100);
  if (localStorage.getItem(TESTNAME + "_res") == null || percent > localStorage.getItem(TESTNAME + "_res")) {
    localStorage.setItem(TESTNAME + "_res", percent);
    localStorage.setItem(TESTNAME, score + " (" + percent + "%)");
  }
  checkRecords();
  scroll(0, 0);
  POINTS.innerHTML = "Вы дали " + score + " (" + percent + "%)" + " правильных ответов.";
  let answeredQ = document.querySelectorAll(".answered-q");
  let nextQbutton = document.querySelectorAll(".next-q");
  let answeredQlength = 60;

  showAnswer();

  for (i = 0; i < answeredQlength; i++) {
    answeredQ[i].classList.remove("hidden-q");
    answeredQ[i].classList.add("disable-activity");
    nextQbutton[i].classList.add("hidden-q");
  }
}

START.addEventListener("click", startTest);

function trainingRegime() {
  if (EXAM.classList.contains("choised-regime")) {
    EXAM.classList.remove("choised-regime");
  }
  this.classList.add("choised-regime");
  HINT.style.display = "inline";
  START.classList.remove("hidden-q");
}

function examRegime() {
  if (TRAINING.classList.contains("choised-regime")) {
    TRAINING.classList.remove("choised-regime");
  }
  this.classList.add("choised-regime");
  HINT.style.display = "none";
  START.classList.remove("hidden-q");
}

function startTest() {
  TRAINING.classList.add("hidden-q");
  REGIME.classList.add("hidden-q");
  EXAM.classList.add("hidden-q");
  START.classList.add("hidden-q");
  H1.classList.add("hidden-q");
  TESTDESC.classList.add("hidden-q");
  HEADER.classList.add("hidden-q");
  document.querySelector("footer").classList.add("hidden-q"); //из переменной почему то выходил null
  document.querySelector("#test-chat").classList.add("hidden-q");
  MAINAREA.classList.add("q-middle");
  BODY.classList.add("blue-screen");
  QNUMBER.classList.remove("hidden-q");
  CLOSE.classList.remove("hidden-q");
  NOTE.classList.remove("hidden-q");
  TIMER.classList.remove("hidden-q");
  TOTALQ.innerHTML = 60;

  if (qNum > 1) {
    document.querySelector(".bookmark").classList.remove("hidden-q");
    document.getElementById("q1").classList.add("hidden-q");
    document.getElementById("q1").style.display = "none";
    let checkAllQ = document.querySelector(".bookmark");
    checkAllQ.classList.remove("bookmark");
  } else {
    q++;
    document.getElementById("q1").classList.remove("hidden-q");
  }

  if (s == 0) {
    s++;

    let minLeft = 59;
    let secLeft = 59;

    let timer60 = setInterval(startTimer, 1000);

    function startTimer() {
      if (minLeft >= 0) {
        secLeft = secLeft - 1;
        if (secLeft == 0) {
          minLeft = minLeft - 1;
          secLeft = 59;
        }
      }
      if (minLeft == -1 && secLeft == 59) {
        secondsBlock.innerHTML = 0;
        minutesBlock.innerHTML = 0;
        clearInterval(timer60);
        alert("Время вышло! Нажмите ОК чтобы начать тест заново.");
        location.reload();
      } else {
        secondsBlock.innerHTML = secLeft;
        minutesBlock.innerHTML = minLeft;
      }
    }
  }

  if (finish == 0 && qNum == 1) {
    document.getElementById("q1").classList.remove("hidden-q");
    document.getElementById("q1").classList.remove("bookmark");
    START.innerHTML = "Продолжить";
  }
  if (finish > 0) {
    NOTE.classList.add("hidden-q");
    RESULT.classList.remove("hidden-q");
  }
}

function closeTest() {
  if (finish == 0) {
    if (qNum == 1) {
      document.getElementById("q1").classList.add("hidden-q");
      document.getElementById("q1").classList.add("bookmark");
    } else {
      let hideThisQ = document.querySelector(".every-q:not(.hidden-q)");
      hideThisQ.classList.add("hidden-q");
      hideThisQ.classList.add("bookmark");
    }
  } else {
    START.classList.remove("hidden-q");
    H1.classList.remove("hidden-q");
    TESTDESC.classList.remove("hidden-q");
    HEADER.classList.remove("hidden-q");
    document.querySelector("footer").classList.remove("hidden-q"); //из переменной почему то выходил null
    document.querySelector("#test-chat").classList.remove("hidden-q");
    MAINAREA.classList.remove("q-middle");
    BODY.classList.remove("blue-screen");
    QNUMBER.classList.add("hidden-q");
    CLOSE.classList.add("hidden-q");
    NOTE.classList.add("hidden-q");
    TIMER.classList.add("hidden-q");
    //q--;
  }

  if (finish == 1) {
    RESULT.style.display = "block";
    START.style.display = "none";
  }

  START.classList.remove("hidden-q");
  H1.classList.remove("hidden-q");
  TESTDESC.classList.remove("hidden-q");
  HEADER.classList.remove("hidden-q");
  document.querySelector("footer").classList.remove("hidden-q"); //из переменной почему то выходил null
  document.querySelector("#test-chat").classList.remove("hidden-q");
  MAINAREA.classList.remove("q-middle");
  BODY.classList.remove("blue-screen");
  QNUMBER.classList.add("hidden-q");
  CLOSE.classList.add("hidden-q");
  NOTE.classList.add("hidden-q");
  RESULT.classList.add("hidden-q");
  TIMER.classList.add("hidden-q");
}

function nextQ() {
  //q++;
  qNum++;
  this.parentElement.classList.add("hidden-q");
  this.parentElement.nextElementSibling.classList.remove("hidden-q");
  this.parentElement.classList.add("answered-q");
  CURRENTQ.innerHTML = qNum;

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;

  HINT.classList.remove("active");
  let answers = document.querySelectorAll(".right-answer");
  answers.forEach((item) => {
    item.style.display = "none";
  });
}

function showAnswer() {
  HINT.classList.add("active");
  let answers = document.querySelectorAll(".right-answer");
  answers.forEach((item) => {
    item.style.display = "inline";
  });
}

////////
////////

// check correct composed sentence

document.querySelectorAll(".check-drag").forEach((input) => input.addEventListener("click", check));

function check() {
  let parent = this.parentNode;
  let childs = Array.from(parent.children);
  childs.shift(); //удаляем q-desc
  childs.pop(); //удаляем кнопку
  let childsLen = childs.length;
  let answer = "";

  for (let i = 0; i < childsLen; i++) {
    answer += childs[i].innerHTML;
  }

  parent.setAttribute("answ-data", answer);

  if (parent.getAttribute("data") == parent.getAttribute("answ-data")) {
    score++;
    console.log("yes, +1 text one word");
  }

  qNum++;
  this.parentElement.classList.add("hidden-q");
  this.parentElement.nextElementSibling.classList.remove("hidden-q");
  this.parentElement.classList.add("answered-q");
  CURRENTQ.innerHTML = qNum;

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}

// check sentence (where only 1 word need to drag inside)

document.querySelectorAll(".check-sentence").forEach((input) => input.addEventListener("click", checkSentence));

function checkSentence() {
  let parent = this.parentNode;
  let insertWords = parent.querySelectorAll(".insert-word");
  let right = "";

  insertWords.forEach(function (insertWord) {
    if (insertWord.getAttribute("data") == insertWord.innerHTML) {
      right = true;
    }
  });

  if (right == true) {
    score++;
    console.log("yes, +1 text one word");
  }

  qNum++;
  this.parentElement.classList.add("hidden-q");
  this.parentElement.nextElementSibling.classList.remove("hidden-q");
  this.parentElement.classList.add("answered-q");
  CURRENTQ.innerHTML = qNum;

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}

// check text

document.querySelectorAll(".check-text").forEach((input) => input.addEventListener("click", checkText));

function checkText() {
  let parent = this.parentNode;
  let correctAnsw = parent.getAttribute("data");
  let answers = parent.querySelectorAll(".select-word");
  let answersLen = answers.length;
  let selected = "";

  for (let i = 0; i < answersLen; i++) {
    selected += answers[i].value;
  }

  if (correctAnsw == selected) {
    score++;
    console.log("yes, +1 text");
  }

  qNum++;
  this.parentElement.classList.add("hidden-q");
  this.parentElement.nextElementSibling.classList.remove("hidden-q");
  this.parentElement.classList.add("answered-q");
  CURRENTQ.innerHTML = qNum;

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}

// check for tables

document.querySelectorAll(".check-tables").forEach((input) => input.addEventListener("click", checkTables));

function checkTables() {
  let parent = this.parentNode;
  let correctAnsw = parent.getAttribute("data");
  let answers = parent.querySelectorAll(".select-word");
  let answersLen = answers.length;
  let selected = "";

  for (let i = 0; i < answersLen; i++) {
    selected += answers[i].value;
  }

  if (correctAnsw == selected) {
    score++;
    console.log("yes, +1 table");
  }

  qNum++;
  this.parentElement.classList.add("hidden-q");
  this.parentElement.nextElementSibling.classList.remove("hidden-q");
  this.parentElement.classList.add("answered-q");
  CURRENTQ.innerHTML = qNum;

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}

// check for img

document.querySelectorAll(".check-img").forEach((input) => input.addEventListener("click", checkImg));

function checkImg() {
  let parent = this.parentNode;
  let correctAnsw = parent.getAttribute("data");
  let answers = parent.querySelectorAll(".word");
  let answersLen = answers.length;
  let selected = "";

  for (let i = 0; i < answersLen; i++) {
    selected += answers[i].innerHTML;
  }

  if (correctAnsw == selected) {
    score++;
    console.log("yes, +1 img");
  }

  qNum++;
  this.parentElement.classList.add("hidden-q");
  this.parentElement.nextElementSibling.classList.remove("hidden-q");
  this.parentElement.classList.add("answered-q");
  CURRENTQ.innerHTML = qNum;

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}

// check basic questions

document.querySelectorAll(".check-basic").forEach((input) => input.addEventListener("click", checkBasic));

function checkBasic() {
  let parent = this.parentNode;
  let childs = parent.querySelectorAll(".q-var");
  let childsLen = childs.length;
  let rightAnswers = parent.querySelectorAll(".right-answer").length;
  let chosenAnswers = parent.querySelectorAll(".chosen").length;
  let userScore = 0;

  for (let i = 0; i < childsLen; i++) {
    let childNodes = childs[i].querySelectorAll(".right-answer");
    childNodes.forEach(function (child) {
      if (child.parentNode != undefined && child.parentNode.classList.contains("chosen")) {
        userScore++;
      }
    });
  }

  if (rightAnswers == userScore && rightAnswers == chosenAnswers) {
    score++;
    console.log("yes, +1 basic");
    console.log(chosenAnswers);
    console.log(userScore);
  }

  qNum++;
  this.parentElement.classList.add("hidden-q");
  this.parentElement.nextElementSibling.classList.remove("hidden-q");
  this.parentElement.classList.add("answered-q");
  CURRENTQ.innerHTML = qNum;

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}
