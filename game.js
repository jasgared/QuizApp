const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// hardcoded questions
let questions = [
    {
        question: "WHich village does Hokage belong to?",
        choice1: "Sand",
        choice2: "Mist",
        choice3: "Rain",
        choice4: "Leaf",
        answer: 4
    },
    {
        question: "Who is the third Hokage?",
        choice1: "Naruto",
        choice2: "Tobirama",
        choice3: "Hiruzen",
        choice4: "Jiraiya",
        answer: 3
    },
    {
        question: "What are uchihas?",
        choice1: "Assasins",
        choice2: "Anbu",
        choice3: "Police",
        choice4: "Doctors",
        answer: 3
    },
    {
        question: "How many tails does Kurama have?",
        choice1: "3",
        choice2: "1",
        choice3: "8",
        choice4: "9",
        answer: 4
    }

];

// Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    // changes made to the questions wont affect the availableQuestions 
    // coz of usage of spread operator(...), making a full copy from questions
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    progressBarFull.style.width = ((questionCounter / MAX_QUESTIONS) * 100) + "%";
    console.log(progressBarFull.style.width);
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        // accessing the number property of dataset so dataset['number']
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    // removing the used question from the available questions array
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);

        }

        // Add the color and remove it after a while, as the color 
        // continues to stay for later questions
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
startGame();