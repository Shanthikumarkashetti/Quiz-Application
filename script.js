const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const startButton = document.getElementById("start");
const nameInput = document.getElementById("name");
const startContainer = document.getElementById("start-container");
const quizContent = document.getElementById("quiz-content");
const nameDisplay = document.getElementById("name-display");
const timerElement = document.getElementById("timer");

let currentQuiz = 0;
let score = 0;
let userName = "";
let quizTime = 180; // 3 minutes in seconds

const deselectAnswers = () => {
    answerElements.forEach((answer) => {
        answer.checked = false;
        answer.nextElementSibling.classList.remove("correct", "wrong");
    });
};

const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
        if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
};

const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
};

const startQuiz = () => {
    userName = nameInput.value;
    if (userName.trim() !== "") {
        nameDisplay.innerText = `Participant: ${userName}`;
        startContainer.style.display = "none";
        quizContent.style.display = "block";
        loadQuiz();
        startTimer();
    } else {
        alert("Please enter your name to start the quiz.");
    }
};

const startTimer = () => {
    const timerInterval = setInterval(() => {
        let minutes = Math.floor(quizTime / 60);
        let seconds = quizTime % 60;
        timerElement.innerText = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (quizTime > 0) {
            quizTime--;
        } else {
            clearInterval(timerInterval);
            showTimeoutMessage();
        }
    }, 1000);
};

const showTimeoutMessage = () => {
    quiz.innerHTML = `
        <h2>${userName}, time is up! You answered ${score}/${quizData.length} questions correctly</h2>
        <button onclick="location.reload()">Play Again</button>
    `;
};

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        const correctAnswer = quizData[currentQuiz].correct;
        const selectedLabel = document.querySelector(`label[for=${answer}]`);
        
        if (answer === correctAnswer) {
            selectedLabel.classList.add("correct");
            score++;
        } else {
            selectedLabel.classList.add("wrong");
        }

        // Show correct answer regardless of selection
        const correctLabel = document.querySelector(`label[for=${correctAnswer}]`);
        correctLabel.classList.add("correct");

        // Disable further answer selection
        answerElements.forEach((answer) => {
            answer.disabled = true;
        });

        // Move to the next question after a delay
        setTimeout(() => {
            // Remove styles before loading the next question
            answerElements.forEach((answer) => {
                answer.disabled = false;
                answer.checked = false;
                answer.nextElementSibling.classList.remove("correct", "wrong");
            });

            currentQuiz++;

            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                quiz.innerHTML = `
                    <h2>${userName}, you have completed the quiz!</h2>
                    <h3>You scored ${score}/${quizData.length}</h3>
                    <button onclick="location.reload()">Play Again</button>
                `;
            }
        }, 1000);
    }
});
