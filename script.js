// These are our game pieces
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

// Our game scores
let currentQuestionIndex = 0;
let score = 0;

// This gets questions from the internet (like getting toys from a toy store)
async function getQuestions() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&type=multiple"
  );
  const data = await response.json();
  return data.results;
}

// This shows a question on the screen
function showQuestion(question) {
  questionElement.textContent = question.question;

  // Mix up the answers so they're not always in the same order
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  allAnswers.sort(() => Math.random() - 0.5);

  answersElement.innerHTML = "";

  allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () =>
      selectAnswer(answer === question.correct_answer)
    );
    answersElement.appendChild(button);
  });
}

// When you pick an answer
function selectAnswer(isCorrect) {
  if (isCorrect) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
  }

  // Disable all buttons after selection
  const buttons = answersElement.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === question.correct_answer) {
      button.style.backgroundColor = "#4caf50";
    } else {
      button.style.backgroundColor = "#f44336";
    }
  });

  nextButton.style.display = "block";
}

// Start the game!
async function startGame() {
  const questions = await getQuestions();

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
      nextButton.style.display = "none";
    } else {
      alert(`Game Over! Your score: ${score}/${questions.length}`);
      // Restart game
      currentQuestionIndex = 0;
      score = 0;
      scoreElement.textContent = `Score: 0`;
      showQuestion(questions[currentQuestionIndex]);
    }
  });

  showQuestion(questions[currentQuestionIndex]);
}

// Let's play!
startGame();
