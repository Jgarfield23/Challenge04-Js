//create button
//click button- click.eventlistener
//start game function- this will be called by event-listener
//specify button element by id
// create elements- document.create element
//questions should be objects
// loop through the array, looping through the choices

var timeEl = document.querySelector("#timer");
var currentQuestionIndex = 0; //reference index of the questions array
var correctAnswers = 0;
var timer = 30;
var timeInterval;
var quizContainer = document.createElement("div"); //where the questions and answers are (styling purposes)
var endContainer = document.createElement("div");
var existingScores = JSON.parse(localStorage.getItem("scores")) || [];
var scoreList = document.createElement("ul");
var highScoreContainer = document.createElement("h2");
var box = document.querySelector(".box");
box.appendChild(scoreList);
var questions = [
  {
    question: "What is an array?",
    choices: [
      "Declares a variable",
      "List of elements",
      "A really large number",
      "Gives you a color",
    ],
    answer: "List of elements",
  },
  {
    question: "What is a query selector?",
    choices: [
      "Gives you an variable",
      "A method used for searching and returning the very first element within the document that matches the given selector",
      "Selects a question for you",
      "provides you with information",
    ],
    answer:
      "A method used for searching and returning the very first element within the document that matches the given selector",
  },
  {
    question: "What is an event listener?",
    choices: [
      "Is a good listener",
      "Notifies you when something is wrong in your code",
      "A function that will be called whenever the specified event is delivered to the target",
      " connects web pages to scripts",
    ],
    answer:
      "A function that will be called whenever the specified event is delivered to the target",
  },
  {
    question: "What is a variable?",
    choices: [
      "containers that store values",
      "This is a sequence of text",
      "This can be anything",
      "This is a True/False value",
    ],
    answer: "containers that store values",
  },
]
//reset page to restart game
function homePage () {
  highScoreContainer.remove(highScoreContainer)
  var startButton = document.createElement("button");
  startButton.textContent = "Click me to start";
   box.appendChild(startButton);
   scoreList.innerHTML = "";
  startButton.addEventListener("click", function() {
    startButton.remove();
   startGame();
   
 });
}

// start game
function startGame() {
  quizContainer.removeAttribute("style", "display: none");
  currentQuestionIndex = 0;
  quizContainer.innerHTML = "";
  box.appendChild(quizContainer);
  var choicesList = document.createElement("ul"); //created an unordered list
  var timer = 30;
  timeInterval = setInterval(function () {
    timer--;
    if (timer <= 0) {
      endGame();
    }
    var timeEl = document.querySelector("#timer");
    timeEl.textContent = timer;
  }, 1000);
  function displayCurrentQuestion() {
    if (currentQuestionIndex >= questions.length) {
      endGame(); // what to do when we've reached the end of the questions list
    } else {
      var questionHeader = document.createElement("h1");
      questionHeader.textContent = questions[currentQuestionIndex].question; //displayed question
      quizContainer.appendChild(questionHeader);
      quizContainer.appendChild(choicesList);
      for (var i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = questions[currentQuestionIndex].choices[i];
        choicesList.appendChild(choice);

      }
    }
  }
  displayCurrentQuestion();

  choicesList.addEventListener("click", function (event) {
    var buttonClicked = event.target;

    if (buttonClicked.textContent === questions[currentQuestionIndex].answer) {
      correctAnswers++;
      quizContainer.innerHTML = ""; //removes question
      choicesList.innerHTML = ""; // clears choices when going to the next question
      currentQuestionIndex++; // references the question by index
      displayCurrentQuestion();
    } else {
      quizContainer.innerHTML = "";
      choicesList.innerHTML = "";
      currentQuestionIndex++;
      displayCurrentQuestion();
      timer -= 5;
    }
  });
  
}

function endGame() {

  clearInterval(timeInterval);
  timeInterval = setInterval(timer); //restarting timer
  timeEl.innerHTML = "";
  quizContainer.setAttribute("style", "display: none"); //choices and questions are hidden
  box.appendChild(endContainer);

  var endStatement = document.createElement("h2");
  endStatement.textContent = "Congratulations! The quiz has ended.";
  endContainer.appendChild(endStatement);

  var score = document.createElement("h3");
  score.textContent = "Here is your score: " + correctAnswers;
  endContainer.appendChild(score);

  var initialsHeader = document.createElement("h3");
  initialsHeader.textContent = "Enter your initials below: ";
  endContainer.appendChild(initialsHeader);

  var initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "initialsInput");
  endContainer.appendChild(initialsInput);

  var submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submitButton");
  submitButton.textContent = "Submit";
  endContainer.appendChild(submitButton);

  document
    .getElementById("submitButton")
    .addEventListener("click", function () {
    
      var scoreObj = {
        initials: initialsInput.value,
        score: correctAnswers,
      };
      existingScores.push(scoreObj);
      localStorage.setItem("scores", JSON.stringify(existingScores));
      submitButton.setAttribute("style", "display: none");
      endContainer.innerHTML = "";
      highScorePage();
      console.log(timeInterval)
    });
}

function highScorePage() {
  box.appendChild(highScoreContainer);
  highScoreContainer.textContent = "High score list!";
 
  for(var i = 0; i<existingScores.length; i++) {
    var scoreNames = document.createElement("li");
    scoreList.appendChild(scoreNames);
    scoreNames.textContent = `${existingScores[i].initials} - ${existingScores[i].score}`
  }
  var homePageButton = document.createElement("button");
  homePageButton.textContent = "Homepage";
  scoreList.appendChild(homePageButton);
  homePageButton.addEventListener("click", homePage);

 


}

homePage()
