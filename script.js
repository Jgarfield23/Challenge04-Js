//create button
//click button- click.eventlistener
//start game function- this will be called by event-listener
//specify button element by id
// create elements- document.create element
//questions should be objects
// loop through the array, looping through the choices
var body = document.querySelector("body")
var startButton = document.createElement("button") 
startButton.textContent = "Click me to start"
body.appendChild(startButton);
var currentQuestionIndex = 0;
var correctAnswers = 0;
var timer = 8;
var timeInterval;
var quizContainer = document.createElement("div"); //where the questions and answers are (styling purposes)

var questions = [
    {
        question: "What is an array?",
        choices: ["Declares a variable", "List of elements", "A really large number", "Gives you a color"],
        answer: "List of elements",

    },
    {
        question: "What is a query selector?",
        choices: ["Gives you an variable", "A method used for searching and returning the very first element within the document that matches the given selector", "Selects a question for you", "provides you with information"],
        answer:  "a method used for searching and returning the very first element within the document that matches the given selector" ,
    },
    {
        question: "What is an event listener?",
        choices: ["Is a good listener", "Notifies you when something is wrong in your code", "A function that will be called whenever the specified event is delivered to the target", " connects web pages to scripts"],
        answer: "a function that will be called whenever the specified event is delivered to the target",
    },
    {
        question: "What is a variable?",
        choices: ["containers that store values", "This is a sequence of text", "This can be anything", "This is a True/False value"],
        answer: "containers that store values",
    }
]


function startGame () {
    startButton.setAttribute("style", "display: none"); //hide button
    body.appendChild(quizContainer);
    var choicesList = document.createElement("ul"); //created an unordered list
    timeInterval = setInterval (function(){
        timer--;
        if (timer <= 0) {
            endGame();
        }
        var timeEl = document.querySelector("#timer")
        timeEl.textContent = timer;
    }, 1000) 
    function displayCurrentQuestion () {
        if (currentQuestionIndex >= questions.length) { 
            endGame(); // what to do when we've reached the end of the questions list
        }
        var questionHeader = document.createElement("h1");
        questionHeader.textContent = questions[currentQuestionIndex].question; //displayed question 
        quizContainer.appendChild(questionHeader);
        quizContainer.appendChild(choicesList);
        for(var i=0; i<questions[currentQuestionIndex].choices.length; i++) {
            var choice = document.createElement("button");
            choice.textContent = questions[currentQuestionIndex].choices[i];
            choicesList.appendChild(choice);
            
        }


    }
    displayCurrentQuestion();
   
    choicesList.addEventListener("click", function(event){
        var buttonClicked = event.target
       
        if (buttonClicked.textContent === questions[currentQuestionIndex].answer){
            correctAnswers ++ 
            quizContainer.innerHTML = "";
            choicesList.innerHTML = "";
            currentQuestionIndex ++
            displayCurrentQuestion();
        }
        else {
            quizContainer.innerHTML = "";
            choicesList.innerHTML = "";
            currentQuestionIndex ++
            displayCurrentQuestion();
           
        }
    } )
    

    

  
}

function endGame() {
    clearInterval(timeInterval);
    quizContainer.setAttribute("style", "display: none"); //hide button

}

startButton.addEventListener("click", startGame)
