var body = document.querySelector("body");
var timer = document.querySelector("#time");
var instructions = document.querySelector(".instructions");
var beginButtonClick = document.querySelector("#beginButton");
var questionP = document.querySelector(".question");
var choicesBlock = document.querySelector(".choices");
var result = document.querySelector(".result");
var finalScore = document.querySelector(".final-score");
var endOfGame = document.querySelector(".end-of-game");

var buttonAnswerA = document.querySelector("#answer1");
var buttonAnswerB = document.querySelector("#answer2");
var buttonAnswerC = document.querySelector("#answer3");
var buttonAnswerD = document.querySelector("#answer4");

var submitInitials = document.querySelector(".initial-form");

var currentTime = timer.textContent;
var currentQuestion = 0;

//Initialize the high score to 0 if there isn't one in local storage. 
var highScore = localStorage.getItem("highscore");
if (highScore === null) {
    localStorage.setItem("highScore", 0);
    highScore = 0;
}

var questions = [{
        ask: "Inside which HTML element do we put the JavaScript?",
        answers: ["<script>", "<javascript>", "<js>", "<scripting>"],
        correctAnswer: 0
    },
    {
        ask: "How do you create a function in JavaScript?",
        answers: ["function myFunction()", "function:myFunction()", "function = myFunction()", "func myFunction()"],
        correctAnswer: 0
    },
    {
        ask: "How do you call a function named “myFunction”?",
        answers: ["myFunction", "myFunction()", "call myFunction()", "call function myFunction()"],
        correctAnswer: 1
    },
    {
        ask: "How do you start an IF statement in JavaScript?",
        answers: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i == 5)"],
        correctAnswer: 3
    },
    {
        ask: "How do you start a FOR loop in JavaScript?",
        answers: ["for i = 1 to 5", "for (i =0; i <= 5; i++)", "for (i <= 5; i++)", "for (i = 0; i <= 5)"],
        correctAnswer: 1
    },
    {
        ask: "How can you add a comment in JavaScript?",
        answers: ["‘This is a comment", "<!--This is a comment -->", "//This is a comment", "**This is a comment**"],
        correctAnswer: 2
    },
    {
        ask: "What is the correct way to write a JavaScript array?",
        answers: ["var colors = (1:”red”, 2:”green”, 3:”blue”)", "var colors = 1 = (“red”), 2 = (“green”), 3 = (“blue”)", "var colors = “red”, ”green”, ”blue”", "var colors = [“red”, “green”, “blue”]"],
        correctAnswer: 3
    },
    {
        ask: "How do you round the number 7.25, to the nearest integer?",
        answers: ["round (7.25)", "Math.rnd(7.25)", "Math.round(7.25)", "rnd(7.25)"],
        correctAnswer: 2
    },
    {
        ask: "What event occurs when the user clicks on an HTML element?",
        answers: ["onmouseclick", "onchange", "onmouseover", "onclick"],
        correctAnswer: 3
    },
    {
        ask: "How do you declare a JavaScript variable?",
        answers: ["v carName;", "var carName;", "variable carName;", "v (carName);"],
        correctAnswer: 1
    },
    {
        ask: "Which operator is used to assign a value to a variable?",
        answers: ["x", "*", "-", "="],
        correctAnswer: 3
    }
]

function quizQuestion(timerInterval) {
    checkTime(timerInterval);

    // Checks questions have not all been answered before displaying on the page.
    if (currentQuestion < questions.length) {
        questionP.textContent = questions[currentQuestion].ask;

        buttonAnswerA.textContent = questions[currentQuestion].answers[0];
        buttonAnswerB.textContent = questions[currentQuestion].answers[1];
        buttonAnswerC.textContent = questions[currentQuestion].answers[2];
        buttonAnswerD.textContent = questions[currentQuestion].answers[3];
    } else {
        endGame();
    }
}

function checkAnswer() {
    // Remove focus on the button after clicking
    this.style.outline = "none";

    // Check the button selected to see if it is the correct answer
    if ((this.textContent) == (questions[currentQuestion].answers[questions[currentQuestion].correctAnswer])) {
        result.textContent = "CORRECT";
    } else {
        currentTime -= 10;
        result.textContent = "WRONG";
        if (currentTime < 1) {
            endGame();
        }
    }

    currentQuestion++;

    quizQuestion();
}

// Checks to make sure there is still time left.
function checkTime(timerInterval) {
    if (currentQuestion == questions.length) {
        clearInterval(timerInterval);
        endGame();
    } else if (currentTime <= 0) {
        timer.textContent = 0;
        currentTime = 0;
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    questionP.style.display = "none";
    choicesBlock.style.display = "none";
    result.style.display = "none";
    endOfGame.style.display = "block";

    // Check to see if the user's score is the new high score.
    if (currentTime > parseInt(localStorage.getItem("highScore"))) {
        finalScore.textContent = ("You have the new high score! Your final score is " + currentTime + ".");
    } else {
        finalScore.textContent = ("Your final score is " + currentTime + ".");
    }
}

// Store the user's score in local storage.
function resetGame() {
    var user_initials = document.querySelector("#user_initials").value;

    localStorage.setItem("highScore", currentTime);
    localStorage.setItem(user_initials, currentTime);
}

beginButtonClick.addEventListener("click", function () {
    var timerStart = setInterval(function () {
        currentTime--;
        timer.textContent = currentTime;
        checkTime(timerStart);
    }, 1000)

    instructions.style.display = "none";
    choicesBlock.style.display = "block";

    quizQuestion(timerStart);
})

// Assigns event listeners to all the answer choices.
var buttons = document.querySelectorAll(".answer-choice").forEach(function (item) {
    item.addEventListener("click", checkAnswer);
})