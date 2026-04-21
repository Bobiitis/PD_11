const From = document.getElementById("search-form");
const Input = document.getElementById("animal-search");
const Result = document.getElementById("search-result");
const Options = document.getElementById("quiz-options");
const quizResult = document.getElementById("quiz-result");
const Button = document.getElementById("next-question");
const Score = document.getElementById("quiz-score");

const Emoji = document.getElementById("animal-emoji");
const Name = document.getElementById("animal-name");
const Latin = document.getElementById("animal-latin");
const Location = document.getElementById("animal-location");
const Food = document.getElementById("animal-food");
const Lifespan = document.getElementById("animal-lifespan");
const Size = document.getElementById("animal-size");
const Description = document.getElementById("animal-description");
const Route = document.getElementById("animal-route");

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
    description: "Lauva ir viens no varenākajiem plēsējiem pasaulē, dzīvo baros un tiek dēvēts par dzīvnieku karali.",
    route: "No ieejas ej taisni, tad pagriezies pa labi pie ēkas. Turpini ceļu vēl 3 minūtes un lauvas aploks būs pa kreisi."
  },
  zilonis: {
    name: "Zilonis",
    latin: "(Loxodonta africana)",
    emoji: "🐘",
    location: "Āfrika un Āzija",
    food: "Zāle, lapas, augļi",
    lifespan: "60-70 gadi",
    size: "Līdz 4 m augsts",
    description: "Ziloņi ir gudri un sabiedriski dzīvnieki ar lielisku atmiņu. Tie dzīvo ciešās ģimenes grupās.",
    route: "No ieejas dodies taisni uz lielo laukumu, tad turies pa kreisi. Ziloņu māja būs pēc dažām minūtēm."
  },
  zirafe: {
    name: "Žirafe",
    latin: "(Giraffa camelopardalis)",
    emoji: "🦒",
    location: "Āfrikas savannas",
    food: "Koku lapas un dzinumi",
    lifespan: "20-25 gadi",
    size: "Līdz 5,5 m augsta",
    description: "Žirafe ir augstākais sauszemes dzīvnieks pasaulē un ar savu garo kaklu viegli sasniedz koku galotnes.",
    route: "Ej gar centrālo celiņu līdz atklātajiem aplokiem. Žirafes redzēsi labajā pusē."
  },
  nilzirgs: {
    name: "Nilzirgs",
    latin: "(Hippopotamus amphibius)",
    emoji: "🦛",
    location: "Āfrikas upes un ezeri",
    food: "Zāle",
    lifespan: "40-50 gadi",
    size: "Līdz 4,5 m garš",
    description: "Nilzirgs lielu dienas daļu pavada ūdenī un vakarā dodas baroties. Tas ir ļoti spēcīgs dzīvnieks.",
    route: "No ieejas ej uz ūdens dzīvnieku zonu. Nilzirga baseins atradīsies pie lielā dīķa."
  },
  zebra: {
    name: "Zebra",
    latin: "(Equus quagga)",
    emoji: "🦓",
    location: "Āfrikas savannas",
    food: "Zāle",
    lifespan: "20-25 gadi",
    size: "Līdz 2,4 m gara",
    description: "Zebras ir sabiedriski dzīvnieki ar raksturīgām melnbaltām svītrām, un katrai zebrai raksts ir atšķirīgs.",
    route: "Dodoties gar āra aplokiem, turies pa labi. Zebru aploks būs netālu no žirafēm."

    // Ir pievienoti tikai 5 dzīvnieki, kā piemērs kā strādātu
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
    !Emoji ||
    !Name ||
    !Latin ||
    !Location ||
    !Food ||
    !Lifespan ||
    !Size ||
    !Description ||
    !Route
  ) {
    return;
  }

  Emoji.textContent = animal.emoji;
  Name.textContent = animal.name;
  Latin.textContent = animal.latin;
  Location.textContent = animal.location;
  Food.textContent = animal.food;
  Lifespan.textContent = animal.lifespan;
  Size.textContent = animal.size;
  Description.textContent = animal.description;
  Route.textContent = animal.route;
}

if (From && Input && Result) {
  From.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = Input.value.trim();
    if (!value) {
      Result.textContent = "Ievadi dzīvnieka nosaukumu meklēšanai.";
      Result.className = "search-result error";
      return;
    }

    const animal = animals[normalizeName(value)];

    if (animal) {
      renderAnimal(animal);
      Result.textContent = `${animal.name} - ${animal.route}`;
      Result.className = "search-result success";
    } else {
      Result.textContent = `${value} - Dzīvnieks netika atrasts.`;
      Result.className = "search-result error";
    }
  });
}

function showQuestion() {
  if (!Options || !quizResult) {
    return;
  }

  const questionText = document.querySelector(".game-panel__question");
  const current = questions[currentQuestion];

  if (questionText) {
    questionText.textContent = current.question;
  }

  Options.innerHTML = "";

  for (let i = 0; i < current.answers.length; i++) {
    const answer = current.answers[i];
    Options.innerHTML += `
      <button class="quiz-card" data-answer="${answer.correct}" type="button">
        <span class="quiz-card__emoji">${answer.emoji}</span>
        <span>${answer.text}</span>
      </button>
    `;
  }

  quizResult.textContent = "Izvēlies vienu atbildi";
  quizResult.className = "quiz-result";
  answered = false;

  if (Button) {
    Button.textContent = "Tālāk";
    Button.style.display = "none";
  }

  updateScore();
}

function updateScore() {
  if (Score) {
    Score.textContent = `Pareizi: ${correctCount} | Nepareizi: ${wrongCount}`;
  }
}

function showFinalResult() {
  if (!quizResult) {
    return;
  }

  quizResult.textContent = `Spēle beigusies! Pareizi: ${correctCount}, Nepareizi: ${wrongCount}`;
  quizResult.className = "quiz-result success";

  if (Options) {
    Options.innerHTML = "";
  }

  if (Button) {
    Button.textContent = "Sākt no jauna";
    Button.style.display = "block";
  }
}

if (Options && quizResult) {
  showQuestion();

  Options.addEventListener("click", (event) => {
    const button = event.target.closest(".quiz-card");
    if (!button || answered) {
      return;
    }

    const cards = Options.querySelectorAll(".quiz-card");
    cards.forEach((card) => {
      card.classList.remove("picked", "right", "wrong");
    });

    button.classList.add("picked");

    if (button.dataset.answer === "true") {
      button.classList.add("right");
      quizResult.textContent = "Atbilde ir pareiza!";
      quizResult.className = "quiz-result success";
      correctCount++;
      answered = true;

      if (Button) {
        if (currentQuestion === questions.length - 1) {
          Button.textContent = "Skatīt rezultātu";
        } else {
          Button.textContent = "Tālāk";
        }
        Button.style.display = "block";
      }
    } else {
      button.classList.add("wrong");
      quizResult.textContent = "Nepareizi, mēģini vēlreiz!";
      quizResult.className = "quiz-result error";
      wrongCount++;
      answered = false;

      if (Button) {
        Button.style.display = "none";
      }
    }

    updateScore();
  });
}

if (Button && Options && quizResult) {
  Button.addEventListener("click", () => {
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

const timeDisplay = document.getElementById("time");

function refreshTime() {
  if (!timeDisplay) {
    return;
  }

  const dateString = new Date().toLocaleString("en-EU", { timeZone: "Europe/Riga" });
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.innerHTML = formattedString;
}

refreshTime();
setInterval(refreshTime, 1000);
