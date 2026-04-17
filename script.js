const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("animal-search");
const quizOptions = document.getElementById("quiz-options");
const quizResult = document.getElementById("quiz-result");
const nextQuestionButton = document.getElementById("next-question");
const quizScore = document.getElementById("quiz-score");

const questions = [
  {
    question: "Kurš no dotajiem dzīvniekiem ir nilzirgs?",
    answers: [
      { text: "Nilzirgs", emoji: "🦛", correct: true },
      { text: "Alnis", emoji: "🫎", correct: false },
      { text: "Lācis", emoji: "🐻", correct: false }
    ]
  },
  {
    question: "Kurš dzīvnieks ir visgarākais?",
    answers: [
      { text: "Zilonis", emoji: "🐘", correct: false },
      { text: "Žirafe", emoji: "🦒", correct: true },
      { text: "Lauva", emoji: "🦁", correct: false }
    ]
  },
  {
    question: "Kurš dzīvnieks tiek saukts par dzīvnieku karali?",
    answers: [
      { text: "Lauva", emoji: "🦁", correct: true },
      { text: "Nilzirgs", emoji: "🦛", correct: false },
      { text: "Zebra", emoji: "🦓", correct: false }
    ]
  }
];

let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;
let answered = false;

if (searchForm && searchInput && quizResult) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = searchInput.value.trim();
    if (!value) {
      quizResult.textContent = "Ievadi dzīvnieka nosaukumu meklēšanai";
      quizResult.className = "quiz-result is-error";
      return;
    }

    quizResult.textContent = `Meklēšanas rezultāts: ${value}`;
    quizResult.className = "quiz-result is-success";
  });
}

function showQuestion() {
  if (!quizOptions || !quizResult) {
    return;
  }

  const questionText = document.querySelector(".game-panel__question");
  const current = questions[currentQuestion];

  if (questionText) {
    questionText.textContent = current.question;
  }

  quizOptions.innerHTML = "";

  for (let i = 0; i < current.answers.length; i++) {
    const answer = current.answers[i];
    quizOptions.innerHTML += `
      <button class="quiz-card" data-answer="${answer.correct}" type="button">
        <span class="quiz-card__emoji">${answer.emoji}</span>
        <span>${answer.text}</span>
      </button>
    `;
  }

  quizResult.textContent = "Izvēlies vienu atbildi";
  quizResult.className = "quiz-result";
  answered = false;
  if (nextQuestionButton) {
    nextQuestionButton.textContent = "Tālāk";
    nextQuestionButton.style.display = "none";
  }
  updateScore();
}

function updateScore() {
  if (quizScore) {
    quizScore.textContent = `Pareizi: ${correctCount} | Nepareizi: ${wrongCount}`;
  }
}

function showFinalResult() {
  if (!quizResult) {
    return;
  }

  quizResult.textContent = `Spēle beigusies! Pareizi: ${correctCount}, Nepareizi: ${wrongCount}`;
  quizResult.className = "quiz-result is-success";

  if (quizOptions) {
    quizOptions.innerHTML = "";
  }

  if (nextQuestionButton) {
    nextQuestionButton.textContent = "Sākt no jauna";
    nextQuestionButton.style.display = "block";
  }
}

if (quizOptions && quizResult) {
  showQuestion();

  quizOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".quiz-card");
    if (!button || answered) {
      return;
    }

    const cards = quizOptions.querySelectorAll(".quiz-card");
    cards.forEach((card) => {
      card.classList.remove("is-picked", "is-right", "is-wrong");
    });

    button.classList.add("is-picked");

    if (button.dataset.answer === "true") {
      button.classList.add("is-right");
      quizResult.textContent = "Atbilde ir pareiza!";
      quizResult.className = "quiz-result is-success";
      correctCount++;
      answered = true;

      if (nextQuestionButton) {
        if (currentQuestion === questions.length - 1) {
          nextQuestionButton.textContent = "Skatīt rezultātu";
        } else {
          nextQuestionButton.textContent = "Tālāk";
        }
        nextQuestionButton.style.display = "block";
      }
    } else {
      button.classList.add("is-wrong");
      quizResult.textContent = "Nepareizi, mēģini vēlreiz!";
      quizResult.className = "quiz-result is-error";
      wrongCount++;
      answered = false;

      if (nextQuestionButton) {
        nextQuestionButton.style.display = "none";
      }
    }
    updateScore();
  });
}

if (nextQuestionButton && quizOptions && quizResult) {
  nextQuestionButton.addEventListener("click", () => {
    if (quizResult.textContent.indexOf("Spēle beigusies!") !== -1) {
      currentQuestion = 0;
      correctCount = 0;
      wrongCount = 0;
      showQuestion();
      return;
    }

    if (currentQuestion < questions.length - 1 && answered) {
      currentQuestion++;
      showQuestion();
      return;
    }

    if (currentQuestion === questions.length - 1 && answered) {
      showFinalResult();
    }
  });
}



var timeDisplay = document.getElementById("time");


function refreshTime() {
  var dateString = new Date().toLocaleString("en-US", {timeZone: "Europe/Riga"});
  var formattedString = dateString.replace(", ", " - ");
  timeDisplay.innerHTML = formattedString;
}

setInterval(refreshTime, 1000);
const animalLocations = {
  "Nilzirgs": "Nilzirgs dzīvo Āfrikas upēs un ezeros.",
  "Alnis": "Alnis ir sastopams Ziemeļamerikā un Eirāzijā.",
  "Lācis": "Lācis dzīvo mežos un kalnos visā pasaulē.",
  "Zilonis": "Zilonis dzīvo Āfrikā un Āzijā.",
  "Žirafe": "Žirafe ir sastopama Āfrikas savannās.",
  "Lauva": "Lauva dzīvo Āfrikas savannās.",
  "Zebra": "Zebra ir sastopama Āfrikas savannās."
};

if (searchForm && searchInput && quizResult) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = searchInput.value.trim();
    if (!value) {
      quizResult.textContent = "Ievadi dzīvnieka nosaukumu meklēšanai";
      quizResult.className = "search-result is-error";
      return;
    }

    const location = animalLocations[value];
    if (location) {
      quizResult.textContent = `Meklēšanas rezultāts: ${value} - ${location}`;
      quizResult.className = "search-result is-success";
    } else {
      quizResult.textContent = `Dzīvnieks "${value}" netika atrasts.`;
      quizResult.className = "search-result is-error";
    }
  });
}