const quizData = [
  {
    question: "What is the national flower of Bangladesh?",
    choices: ["Lotus", "Rose", "Water Lily", "Sunflower"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which river is known as the lifeline of Bangladesh?",
    choices: [ "Jamuna", "Padma", "Meghna","Karnaphuli"],
    correctAnswerIndex: 1,
  },
  {
    question: "In which year did Bangladesh gain independence?",
    choices: ["1971", "1947", "1990", "1965"],
    correctAnswerIndex: 0,
  },
  {
    question: "What is the official language of Bangladesh?",
    choices: ["Hindi", "Bengali", "English", "Urdu"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the capital city of Bangladesh?",
    choices: ["Chittagong", "Rajshahi", "Dhaka", "Sylhet"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which of the following is a famous hill district in Bangladesh?",
    choices: [ "Cox's Bazar","Bandarban", "Khulna", "Barisal"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the national animal of Bangladesh?",
    choices: ["Royal Bengal Tiger", "Elephant", "Peacock", "Leopard"],
    correctAnswerIndex: 0,
  },
  {
    question: "Which sport is most popular in Bangladesh?",
    choices: ["Football", "Cricket", "Hockey", "Badminton"],
    correctAnswerIndex: 1,
  },
  {
    question: "Which is the longest sea beach in Bangladesh?",
    choices: [
      "Kuakata Beach",
      "Patenga Beach",
      "Inani Beach",
      "Cox's Bazar Beach",
    ],
    correctAnswerIndex: 3,
  },

  {
    question:
      "Who is the Bangladeshi Nobel Peace Prize laureate known for founding Grameen Bank?",
    choices: [
      "Prof. Muhammad Yunus",
      "Begum Rokeya",
      "Kazi Nazrul Islam",
      "Sheikh Mujibur Rahman",
    ],
    correctAnswerIndex: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let timeoutId;
let intervalId;

function loadQuestion() {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  let progressBar = document.getElementById("progressbar");
  progressBar.style.display = "block";

  // question
  let allQuizData = quizData[currentQuestion];
  document.getElementById("question").innerText =
    currentQuestion + 1 + ") " + allQuizData.question;

  // option
  const choices = document.querySelectorAll(".choice");
  choices.forEach((item, index) => {
    item.innerText = allQuizData.choices[index];
  });
  document.getElementById("next-question").style.display = "none";
  countdown();
  document.getElementById("startQuizBtn").style.display = "none";
}

function countdown() {
  // we can make countdown usnig this 2 way.

  // The first way to make countdown;

  /*
    let time = 16;
    let intervle = 1000;
    let timeLeft = document.getElementById('timeLeft')


    intervalId = setInterval(() => {
      time--;
      timeLeft.innerText = `Time left: ${time} seconds`;
      if (time <= 0) {
          clearInterval(intervalId);
          timeLeft.innerText = "Time's up.";
          
          setTimeout(() => {
              nextQuestion();
          }, 3000); 
      }
  }, intervle);
  */

  // The second way to make countdown;

  let totalTime = 15000;
  let intervle = 1000;
  let count = totalTime / intervle;
  let progressBar = document.getElementById("progressbar");
  let timeLeft = document.getElementById("timeLeft");
  let initialWidth = 100;
  let currentWidth = initialWidth;

  progressBar.style.width = `${initialWidth}%`;
  updateProgressBarColor(currentWidth);
  timeLeft.style.backgroundColor = "";
  timeLeft.innerText = " ";
  timeLeft.style.color = "";

  intervalId = setInterval(() => {
    count--;
    timeLeft.innerText = `Time left ${count} seconds.`;
    currentWidth = (count / (totalTime / intervle)) * 100;
    progressBar.style.width = `${currentWidth}%`;
    updateProgressBarColor(currentWidth);
  }, intervle);

  timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    timeLeft.innerText = "Time's up.";
    timeLeft.style.backgroundColor = "red";
    timeLeft.style.color = "white";

    setTimeout(() => {
      nextQuestion();
    }, 3000);
  }, 16000);
}

function updateProgressBarColor(widthPercent) {
  // set progressbar bg color from green to red when countdown start

  let progressBar = document.getElementById("progressbar");
  let timeLeft = document.getElementById("timeLeft");
  let red = Math.min(255, Math.floor((100 - widthPercent) * 2.55));
  let green = Math.min(255, Math.floor(widthPercent * 2.55));
  let bgColor = `rgb(${red}, ${green}, 0)`;
  progressBar.style.backgroundColor = bgColor;

  // set progressbar text color light and dark;

  // if(widthPercent < 50){
  //   timeLeft.style.color = "black"
  // } else if (widthPercent > 51){
  //   timeLeft.style.color = "white"
  // }
}

function selectedQuestion(index) {
  let choice = document.querySelectorAll(".choice");
  let timeLeft = document.getElementById("timeLeft");
  let progressBar = document.getElementById("progressbar");
  let correctAnswer = quizData[currentQuestion].correctAnswerIndex;

  let exitAndNextBtnContainer = document.getElementById(
    "exitAndNextBtnContainer"
  );
  exitAndNextBtnContainer.style.display = "flex";
  exitAndNextBtnContainer.style.justifyContent = "center";
  exitAndNextBtnContainer.style.alignItems = "center";
  exitAndNextBtnContainer.style.gap = "10px";

  if (index === correctAnswer) {
    score++;
    choice[index].style.background = "#2f931a";
    timeLeft.innerText = "The answer is correct.";
    timeLeft.style.background = "rgb(0,255, 0";
    progressBar.style.display = "none";
    choice.forEach((item) => {
      item.disabled = true;
    });
  } else {
    choice[index].style.background = "#FF0000";
    choice[correctAnswer].style.background = "#2f931a";
    timeLeft.innerText = "The answer is wrong.";
    timeLeft.style.background = "rgb(255, 0, 0)";
    timeLeft.style.color = "rgb(255,255, 255)";
    progressBar.style.display = "none";
  }

  clearInterval(intervalId);
  clearTimeout(timeoutId);
  document.getElementById("next-question").style.display = "block";
}

function nextQuestion() {
  let choice = document.querySelectorAll(".choice");
  choice.forEach(function (item) {
    item.style.background = "";
    item.disabled = false;
  });

  clearInterval(intervalId);
  clearTimeout(timeoutId);

  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    scoreShit();
  }
}

function scoreShit() {
  let quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <h1 id="scoreHeading"></h1>
    <h2> Your score is: <span id="scoreStyle">${score}</span> out of ${quizData.length}!</h2> 
    <div>
      <button onclick= "playAgainBtn()" id="playAgainBtn">Play again</button>
      <button onclick="goHomeBtn()" id="goHomeBtn">Home</button>
    </div>
    `;

  // set background img of score container.

  let scorContainer = document.getElementById("quiz-container");
  scorContainer.style.background = `url("./quizImg/images.jpg")`;
  scorContainer.style.backgroundSize = "cover";

  // set style on the buttons
  let playAgainBtn = document.getElementById("playAgainBtn");

  playAgainBtn.style.padding = "10px 6px";
  playAgainBtn.style.color = "black";
  playAgainBtn.style.borderRadius = "6px";
  playAgainBtn.style.backgroundColor = "rgb(62, 214, 155)";

  let goHomeBtn = document.getElementById("goHomeBtn");

  goHomeBtn.style.padding = "10px 6px";
  goHomeBtn.style.color = "black";
  goHomeBtn.style.borderRadius = "6px";
  goHomeBtn.style.backgroundColor = "rgb(235, 71, 241)";

  // directly set style on score number.
  let scoreStyle = document.getElementById("scoreStyle");
  scoreStyle.style.fontSize = "25px";

  // set style when display viwe in a small device.
  if (window.innerWidth <= 600) {
    scorContainer.style.fontSize = "15px";
    scorContainer.style.marginTop = "100px";
  }

  let scoreHeading = document.getElementById("scoreHeading");

  // Display different messages based on score

  if (score > 7) {
    scoreHeading.innerText = "Awsome!";
    scoreStyle.style.color = "blueviolet";
  } else if (score >= 4 && score <= 7) {
    scoreHeading.innerText = "Good!";
    scoreStyle.style.color = "blue";
  } else {
    scoreHeading.innerText = "Verry Bad!";
    scoreStyle.style.color = "red";
  }
  document.getElementById("startQuizBtn").style.display = "none";
  document.getElementById("goBackBtn").style.display = "none";
}

function goHomeBtn() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz").innerHTML = `
    <div id="countdown">
                <p id="timeLeft"></p>
                <div id="progressbar"></div>
            </div>
            <div id="question"></div>
            <div class="choices">
                <button onclick="selectedQuestion(0)" class="choice">choice 1</button>
                <button onclick="selectedQuestion(1)" class="choice">choice 2</button>
                <button onclick="selectedQuestion(2)" class="choice">choice 3</button>
                <button onclick="selectedQuestion(3)" class="choice">choice 4</button>
            </div>

           <div id="exitAndNextBtnContainer">
            <button  onclick="nextQuestion()" id="next-question">Next question</button>

            <button onclick="exitBtn()" id="exitQuiz">Exit</button>
           </div>

            <div id="score-container"></div>
  `;

  let quizContainer = document.getElementById("quiz-container");
  quizContainer.style.display = "none";
  document.getElementById("startQuizBtn").style.display = "block";
  document.getElementById("goBackBtn").style.display = "block";
}

function playAgainBtn() {
  currentQuestion = 0;
  score = 0;

  let quizContainer = document.getElementById("quiz-container");
  quizContainer.style.display = "block";

  document.getElementById("quiz").innerHTML = `
    <div id="countdown">
                <p id="timeLeft"></p>
                <div id="progressbar"></div>
            </div>
            <div id="question"></div>
            <div class="choices">
                <button onclick="selectedQuestion(0)" class="choice">choice 1</button>
                <button onclick="selectedQuestion(1)" class="choice">choice 2</button>
                <button onclick="selectedQuestion(2)" class="choice">choice 3</button>
                <button onclick="selectedQuestion(3)" class="choice">choice 4</button>
            </div>

           <div id="exitAndNextBtnContainer">
            <button  onclick="nextQuestion()" id="next-question">Next question</button>

            <button onclick="exitBtn()" id="exitQuiz">Exit</button>
           </div>

            <div id="score-container"></div>
  `;
  loadQuestion();
  document.getElementById("startQuizBtn").style.display = "none";
}

function exitBtn() {
  scoreShit();
}

function goBackBtn() {
  window.location.href = "../index.html";
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  console.log("start quiz");
  let quizContainer = document.getElementById("quiz-container");
  let startQuizBtn = document.getElementById("startQuizBtn");
  let goBackBtn = document.getElementById("goBackBtn");

  quizContainer.style.display = "block";
  startQuizBtn.style.display = "none";
  goBackBtn.style.display = "none";

  loadQuestion();
}