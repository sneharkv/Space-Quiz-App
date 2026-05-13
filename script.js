//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
   {
    question: "How old is the Universe?",
    answers: [
      { text: "4.5 billion years", correct: false },
      { text: "13.8 billion years", correct: true },
      { text: "100 billion years", correct: false },
      { text: "1 trillion years", correct: false },
    ],
  },
  {
    question: "What is the closest star to Earth?",
    answers: [
      { text: "Sirius", correct: false },
      { text: "Betelgeuse", correct: false },
      { text: "The Sun", correct: true },
      { text: "Proxima Centauri", correct: false },
    ],
  },
 {
    question: "What planet rains diamonds?",
    answers: [
      { text: "Saturn", correct: false },
      { text: "Neptune", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Uranus", correct: false },
    ],
  },
  

  {
    question: "How long is a day on Venus?",
    answers: [
      { text: "24 hours", correct: false },
      { text: "90 Earth days", correct: false },
      { text: "243 Earth days", correct: true },
      { text: "10 Earth hours", correct: false },
    ],
  },

  {
    question: "What is the Great Red Spot on Jupiter?",
    answers: [
      { text: "A volcano", correct: false },
      { text: "A storm that has lasted hundreds of years", correct: true },
      { text: "A giant ocean", correct: false },
      { text: "A crater from a meteor", correct: false },
    ],
  },
  
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled= false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent= quizQuestions.length;


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent= 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
};

function showQuestion(){

    console.log(quizQuestions[currentQuestionIndex]) 
    


    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex +1;

    const progressPercent = (currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent= currentQuestion.question;

    answerContainer.innerHTML= "";


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)

        answerContainer.appendChild(button);
    });

}

function selectAnswer(event){
    if(answerDisabled) return

    answerDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answerContainer.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent= score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex< quizQuestions.length){
            showQuestion()
        }else{
            showResults()
        }
    },1000)

}
function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length)*100

if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a true Space Commander! ";
} else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You're an Astronaut in training! ";
} else if (percentage >= 60) {
    resultMessage.textContent = "Not bad! You know your way around the galaxy! ";
} else if (percentage >= 40) {
    resultMessage.textContent = "Keep exploring! The universe has more to teach you! ";
} else {
    resultMessage.textContent = "Houston, we have a problem! Try again! ";
}
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz()
};







