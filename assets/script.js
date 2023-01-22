//Variables to select and access elements from the html file
var viewHighscores = document.querySelector(".score-track");
var timerEL = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var finalScore = document.querySelector(".final-score");

var scoreCounter = 0;
var timer = 60;
var timerCount;

//Selection of quiz questions
var question1 = {
    question: "Primitive types in JavaScript DO NOT include:",
    answers: ["Number", "String", "Boolean", "Variables"]
}

var question2 = {
    question: "The difference between " == " and " === " is:",
    answers: ["No difference", "First option compares only values, the second option compares values and types", "First option compares values and types, second option only compares values", "First option assigns a value to a variable"]
}

var question3 = {
    question: "Select the logical operator from the list",
    answers: ["+", "OR", "%", "="]
}

var question4 = {
    question: "What is the purpose of 'this' operator in JavaScript?",
    answers: ["It refers to the object it belongs to", "It's a magic keyword that clears the screen", "It's used in Callback", "It's a method that returns the length of a string"]
}

var question5 = {
    question: "A correct variable name in Javascript includes:",
    answers: ["Words beginning with a letter", "Words beginning with a number", "Reserved keywords", "Words starting with special characters"]
}

var quizQuestions = [];
