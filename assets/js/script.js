//Variables to select and access elements from the html file
var mainEl = document.getElementById("main");
var timerEL = document.querySelector(".timer-text");
var startButton = document.querySelector(".start-button");
var titleEl = document.getElementById("title");
var h2El1 = document.getElementById("completed");
var h2El2 = document.getElementById("final");
var formEl = document.querySelector("form");
var finalScore = document.getElementById("score-track");
var highScores = document.createElement("h3");
console.log("test");

var score = 0;
var scoreCounter = 0;
var timer;
var timerCount;

//Selection of quiz questions
var question1 = {
    question: "Primitive types in JavaScript DO NOT include: ",
    answers: ["Number", "String", "Boolean", "Variables"],
    correctAnswer: "Variables"
}

var question2 = {
    question: 'The difference between " == " and " === " is: ',
    answers: ["No difference", "First option compares only values, the second option compares values and types", "First option compares values and types, second option only compares values", "First option assigns a value to a variable"],
    correctAnswer: "First option compares only values, the second option compares values and types"
}

var question3 = {
    question: "Select the logical operator from the list ",
    answers: ["+", "OR", "%", "="],
    correctAnswer: "OR"
}

var question4 = {
    question: "What is the purpose of 'this' operator in JavaScript? ",
    answers: ["It refers to the object it belongs to", "It's a magic keyword that clears the screen", "It's used in Callback", "It's a method that returns the length of a string"],
    correctAnswer: "It refers to the object it belongs to"
}

var question5 = {
    question: "A correct variable name in Javascript includes: ",
    answers: ["Words beginning with a letter", "Words beginning with a number", "Reserved keywords", "Words starting with special characters"],
    correctAnswer: "Words beginning with a letter"
}

var question6 = {
    question: "What is an object? ",
    answers: ["An html element", "An attribute of an HTML element", "A collection of properties", "A selector for CSS styling"],
    correctAnswer: "A collection of properties"
}

//Arrays to create the questions displayed on the screen and store the guessed answers
var quizQuestions = [question1, question2, question3, question4, question5, question6];
var selectedQuestion;
var selectedAnswer;
var nextQuestion;

//Calling the init function when the page loads, so that this is ran first
function init() {
}

//Randomly select a question from the array to be the first question the user sees
function firstQuestion() {
    var randomQuestion = Math.floor(Math.random() * quizQuestions.length);
    selectedQuestion = quizQuestions[randomQuestion];
    quizQuestions.splice(randomQuestion, 1);
    sendMessage();
}

//Display the first question and answers block by removing the initial title and start button
//Create buttons for each answer
function sendMessage() {
    //titleEl.remove("title");
    //startButton.remove("start-button");
    titleEl.style.display = "none";
    startButton.style.display = "none";
    mainEl.append(selectedQuestion.question);

    for (var i = 0; i < selectedQuestion.answers.length; i++) {
        var answerButtons = document.createElement("button");
        answerButtons.classList.add("question-buttons");
        answerButtons.innerText = selectedQuestion.answers[i];
        mainEl.appendChild(answerButtons);
        answerButtons.onclick = function () {
            selectedAnswer = this.innerText;
            checkedAnswer();
        };
        console.log("for loop");
    }
}

//Function to verify if the answer selected by the user is correct or not. Decrement timercount by 10 if answer is incorrect
function checkedAnswer() {
    if (selectedAnswer != selectedQuestion.correctAnswer) {
        timerCount = timerCount - 10;
    };
    console.log(selectedAnswer);
    nextQuestion();
}

//Select the next question from the array, avoiding duplicates from the array
function nextQuestion() {
    var randomQuestion = Math.floor(Math.random() * quizQuestions.length);
    selectedQuestion = quizQuestions[randomQuestion];
    quizQuestions.splice(randomQuestion, 1);
    sendNextMessage();
    completeQuiz();
}

//Display the next question on screen, selected randomly from the array 
function sendNextMessage() {
    mainEl.innerHTML = "";
    mainEl.append(selectedQuestion.question);

    for (var i = 0; i < selectedQuestion.answers.length; i++) {
        var answerButtons = document.createElement("button");
        answerButtons.classList.add("question-buttons");
        answerButtons.innerText = selectedQuestion.answers[i];
        mainEl.appendChild(answerButtons);
        answerButtons.onclick = function () {
            selectedAnswer = this.innerText;
            checkedAnswer();
        };
        console.log("for loop");
    }
}

//Function to check if timer is 0 or if the user answered all the questions
function completeQuiz() {
    if (timerCount <= 0 || quizQuestions.length <= 0) {
        clearInterval(timer);
        timerEL.textContent = "Timer: " + timerCount;
        mainEl.innerHTML = "";
        h2El1.innerHTML = "All Done!";
        h2El2.innerHTML = "Your final score is " + timerCount;
        localStorage.setItem("highscore", timerCount);
        formEl.style.display = "block";
    }
}

//Update the score of the user and set it to client storage
function submittedScore() {
    var initials = document.getElementById("initials-text").value;
    h2El1.innerHTML = "";
    h2El2.innerHTML = "";
    formEl.style.display = "none";
    highScores.innerHTML = "Thank you for playing " + initials + ". Your highscore is: " + timerCount;
    mainEl.appendChild(highScores);
    console.log("all done!");
    localStorage.setItem(initials, localStorage.getItem("highscore"));
    var restartButton = document.createElement("button");
    restartButton.innerText = "Restart Quiz";
    restartButton.onclick = function () {
        formEl.style.display = "none";
        mainEl.innerHTML = "";
        startQuiz();
    };
    mainEl.appendChild(restartButton);
    quizQuestions = [question1, question2, question3, question4, question5, question6];
}

//Start the quiz when the Start Quiz button is pressed
function startQuiz() {
    score = 0;
    timerCount = 60;
    startButton.disabled = true;
    startTimer();
    firstQuestion();
    console.log("quiz start");
}

//The startTimer function starts the timer when the quiz begins
function startTimer() {
    //Sets the timer
    timer = setInterval(function () {
        timerCount--;
        timerEL.textContent = "Timer: " + timerCount;
        //If timer hits 0, finish the quiz
        if (timerCount === 0) {
            clearInterval(timer);
            completeQuiz();
        }
    }, 1000);
}

startButton.addEventListener("click", startQuiz);

init();

console.log("test");
formEl.style.display = "none";