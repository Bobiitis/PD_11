const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("animal-search");
const quizOptions = document.getElementById("quiz-options");
const quizResult = document.getElementById("quiz-result");
const nextQuestionButton = document.getElementById("next-question");
const quizScore = document.getElementById("quiz-score");

const animalEmoji = document.getElementById("animal-emoji");
const animalName = document.getElementById("animal-name");
const animalLatin = document.getElementById("animal-latin");
const animalLocation = document.getElementById("animal-location");
const animalFood = document.getElementById("animal-food");
const animalLifespan = document.getElementById("animal-lifespan");
const animalSize = document.getElementById("animal-size");
const animalDescription = document.getElementById("animal-description");
const animalRoute = document.getElementById("animal-route");

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

const animals = {
  lauva: {
    name: "Lauva",
    latin: "(Panthera leo)",
    emoji: "🦁",
    location: "Āfrika un Indija",
    food: "Gaļa",
    lifespan: "10-14 gadi",
    size: "Līdz 2,5 m garš",
    description:
      "Lauva ir viens no varenākajiem plēsējiem pasaulē, dzīvo baros un tiek dēvēts par dzīvnieku karali.",
    route:
      "No ieejas ej taisni, tad pagriezies pa labi pie ēkas. Turpini ceļu vēl 3 minūtes un lauvas aploks būs pa kreisi."
  },
  zilonis: {
    name: "Zilonis",
    latin: "(Loxodonta africana)",
    emoji: "🐘",
    location: "Āfrika un Āzija",
    food: "Zāle, lapas, augļi",
    lifespan: "60-70 gadi",
    size: "Līdz 4 m augsts",
    description:
      "Ziloņi ir gudri un sabiedriski dzīvnieki ar lielisku atmiņu. Tie dzīvo ciešās ģimenes grupās.",
    route:
      "No ieejas dodies taisni uz lielo laukumu, tad turies pa kreisi. Ziloņu māja būs pēc dažām minūtēm."
  },
  zirafe: {
    name: "Žirafe",
    latin: "(Giraffa camelopardalis)",
    emoji: "🦒",
    location: "Āfrikas savannas",
    food: "Koku lapas un dzinumi",
    lifespan: "20-25 gadi",
    size: "Līdz 5,5 m augsta",
    description:
      "Žirafe ir augstākais sauszemes dzīvnieks pasaulē un ar savu garo kaklu viegli sasniedz koku galotnes.",
    route:
      "Ej gar centrālo celiņu līdz atklātajiem aplokiem. Žirafes redzēsi labajā pusē."
  },
  nilzirgs: {
    name: "Nilzirgs",
    latin: "(Hippopotamus amphibius)",
    emoji: "🦛",
    location: "Āfrikas upes un ezeri",
    food: "Zāle",
    lifespan: "40-50 gadi",
    size: "Līdz 4,5 m garš",
    description:
      "Nilzirgs lielu dienas daļu pavada ūdenī un vakarā dodas baroties. Tas ir ļoti spēcīgs dzīvnieks.",
    route:
      "No ieejas ej uz ūdens dzīvnieku zonu. Nilzirga baseins atradīsies pie lielā dīķa."
  },
  zebra: {
    name: "Zebra",
    latin: "(Equus quagga)",
    emoji: "🦓",
    location: "Āfrikas savannas",
    food: "Zāle",
    lifespan: "20-25 gadi",
    size: "Līdz 2,4 m gara",
    description:
      "Zebras ir sabiedriski dzīvnieki ar raksturīgām melnbaltām svītrām, un katrai zebrai raksts ir atšķirīgs.",
    route:
      "Dodoties gar āra aplokiem, turies pa labi. Zebru aploks būs netālu no žirafēm."
  }
};

let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;
let answered = false;

function normalizeName(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderAnimal(animal) {
  if (
    !animalEmoji ||
    !animalName ||
    !animalLatin ||
    !animalLocation ||
    !animalFood ||
    !animalLifespan ||
    !animalSize ||
    !animalDescription ||
    !animalRoute
  ) {
    return;
  }

  animalEmoji.textContent = animal.emoji;
  animalName.textContent = animal.name;
  animalLatin.textContent = animal.latin;
  animalLocation.textContent = animal.location;
  animalFood.textContent = animal.food;
  animalLifespan.textContent = animal.lifespan;
  animalSize.textContent = animal.size;
  animalDescription.textContent = animal.description;
  animalRoute.textContent = animal.route;
}

if (searchForm && searchInput && quizResult) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = searchInput.value.trim();
    if (!value) {
      quizResult.textContent = "Ievadi dzīvnieka nosaukumu meklēšanai.";
      quizResult.className = "quiz-result is-error";
      return;
    }

    const animal = animals[normalizeName(value)];

    if (!animal) {
      quizResult.textContent = "Dzīvnieks netika atrasts.";
      quizResult.className = "quiz-result is-error";
      return;
    }

    renderAnimal(animal);
    quizResult.textContent = `Atrasts: ${animal.name}`;
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
        nextQuestionButton.textContent =
          currentQuestion === questions.length - 1 ? "Skatīt rezultātu" : "Tālāk";
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
    if (quizResult.textContent.includes("Spēle beigusies!")) {
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

const timeDisplay = document.getElementById("time");

function refreshTime() {
  if (!timeDisplay) {
    return;
  }

  timeDisplay.textContent = new Date().toLocaleString("lv-LV", {
    timeZone: "Europe/Riga"
  });
}

refreshTime();
setInterval(refreshTime, 1000);
