/* ===============================
   FOOTER
================================= */

const year = document.getElementById("currentyear");
const modified = document.getElementById("lastModified");

if (year) year.textContent = new Date().getFullYear();
if (modified) modified.textContent = document.lastModified;


/* ===============================
   LESSON DATABASE
================================= */

const lessons = [
{
    id: 1,
    language: "german",
    title: "German A1 – Greetings",
    content: `
        <p><strong>Hallo</strong> = Hello</p>
        <p><strong>Guten Morgen</strong> = Good Morning</p>
    `,
    question: "What does 'Hallo' mean?",
    answer: "hello"
},
{
    id: 2,
    language: "german",
    title: "German A1 – Basic Verbs",
    content: `
        <p><strong>Gehen</strong> = To go</p>
        <p><strong>Kommen</strong> = To come</p>
    `,
    question: "What does 'gehen' mean?",
    answer: "to go"
},
{
    id: 3,
    language: "french",
    title: "French A1 – Greetings",
    content: `
        <p><strong>Bonjour</strong> = Hello</p>
        <p><strong>Merci</strong> = Thank you</p>
    `,
    question: "What does 'Bonjour' mean?",
    answer: "hello"
}
];


/* ===============================
   GLOBAL STATE
================================= */

let score = Number(localStorage.getItem("score")) || 0;
let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
let currentLessonId = null;


/* ===============================
   LESSON PAGE ELEMENTS
================================= */

const lessonSelector = document.getElementById("lessonSelector");
const loadLessonBtn = document.getElementById("loadLessonBtn");
const lessonContent = document.getElementById("lessonContent");

const questionText = document.getElementById("question");
const answerInput = document.getElementById("answerInput");
const resultText = document.getElementById("result");
const checkAnswerBtn = document.getElementById("checkAnswerBtn");

const languageInputs = document.querySelectorAll("input[name='language']");


/* ===============================
   UPDATE LESSON OPTIONS
================================= */

function updateLessonOptions(language) {

    if (!lessonSelector) return;

    lessonSelector.innerHTML = "";

    lessons
        .filter(l => l.language === language)
        .forEach(l => {
            const option = document.createElement("option");
            option.value = l.id;
            option.textContent = l.title;
            lessonSelector.appendChild(option);
        });

    localStorage.setItem("selectedLanguage", language);
}


/* ===============================
   LOAD LESSON
================================= */

function loadLesson(id) {

    const lesson = lessons.find(l => l.id === Number(id));
    if (!lesson || !lessonContent) return;

    currentLessonId = lesson.id;

    lessonContent.innerHTML = `
        <h3>${lesson.title}</h3>
        ${lesson.content}
    `;

    if (questionText) questionText.textContent = lesson.question;
    if (resultText) resultText.textContent = "";
    if (answerInput) answerInput.value = "";
}


/* ===============================
   CHECK ANSWER
================================= */

function checkAnswer() {

    if (!currentLessonId) return;

    const lesson = lessons.find(l => l.id === Number(currentLessonId));
    if (!lesson) return;

    const userAnswer = answerInput.value.toLowerCase().trim();

    if (userAnswer === lesson.answer) {

        score++;
        localStorage.setItem("score", score);

        // Save completed lesson as number
        if (!completedLessons.includes(Number(currentLessonId))) {
            completedLessons.push(Number(currentLessonId));
            localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
        }

        resultText.innerHTML = `<span class="success">Correct! Score: ${score}</span>`;

    } else {
        resultText.innerHTML = `<span class="alert">Incorrect. Try again.</span>`;
    }

    answerInput.value = "";
}


/* ===============================
   PROGRESS PAGE DISPLAY
================================= */

function displayProgress() {

    const totalScore = document.getElementById("totalScore");
    const lessonHistory = document.getElementById("lessonHistory");
    const savedLanguage = document.getElementById("savedLanguage");
    const lastLesson = document.getElementById("lastLesson");

    if (!lessonHistory) return; // Not on progress page

    // Score
    totalScore.textContent = score;

    // Language
    const language = localStorage.getItem("selectedLanguage");
    if (language && savedLanguage) savedLanguage.textContent = language;

    // Completed lessons
    lessonHistory.innerHTML = "";

    if (completedLessons.length === 0) {
        lessonHistory.innerHTML = "<li>No lessons completed yet.</li>";
    } else {
        completedLessons.forEach(id => {
            const lesson = lessons.find(l => l.id === Number(id));
            if (!lesson) return;

            const li = document.createElement("li");
            li.textContent = lesson.title;
            lessonHistory.appendChild(li);
        });

        const lastId = completedLessons[completedLessons.length - 1];
        const last = lessons.find(l => l.id === Number(lastId));
        if (last && lastLesson) lastLesson.textContent = last.title;
    }

    // Clear progress button
    const clearBtn = document.getElementById("clearProgressBtn");
    clearBtn?.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}


/* ===============================
   EVENT LISTENERS
================================= */

// Language selection
languageInputs.forEach(input =>
    input.addEventListener("change", e =>
        updateLessonOptions(e.target.value)
    )
);

// Load lesson button
loadLessonBtn?.addEventListener("click", () =>
    loadLesson(lessonSelector.value)
);

// Quiz check
checkAnswerBtn?.addEventListener("click", checkAnswer);

// Display progress automatically
displayProgress();
