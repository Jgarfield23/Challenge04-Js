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


var questions = [
    {
        question: "What is an array?",
        choices: ["Declares a variable", "List of elements", "A really large number", "Gives you a color"],
        answer: 1,

    },
    {
        question: "What is a query selector?",
        choices: ["gives you an variable", "a method used for searching and returning the very first element within the document that matches the given selector", "selects a question for you", "provides you with information"],
        answer: 1,
    }
]


function startGame () {
    startButton.setAttribute("style", "display: none");
    var quizContainer = document.createElement("div");
    body.appendChild(quizContainer);
    
    var questionHeader = document.createElement("h1");
    questionHeader.textContent = questions[currentQuestionIndex].question
    quizContainer.appendChild(questionHeader);
    console.log(questions[currentQuestionIndex].question);
    
    

  
}

startButton.addEventListener("click", startGame)
