
// Set your test ID and user ID
const TEST_ID = 5539;
const USER_ID = 750035;
const AUTH_TOKEN = 'YOUR_AUTH_TOKEN_HERE'; // Replace with the real token

let currentQuestionIndex = 0;
let userAnswers = [];

// Fetch test instructions
function fetchInstructions() {
    fetch('/v1_data_model/test-series/TestSeries/test_instruction', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `user_id=${USER_ID}&test_id=${TEST_ID}`
    })
    .then(response => response.json())
    .then(data => {
        displayInstructions(data.data.instruction);
    });
}

// Display instructions on the UI
function displayInstructions(instructions) {
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });

    document.getElementById('instructions-section').style.display = 'block';
}

// Start test button
document.getElementById('start-test-btn').addEventListener('click', function () {
    fetchQuestions();
});

// Fetch test questions
function fetchQuestions() {
    fetch('/v1_data_model/test-series/TestSeries/get_test_question_data', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `user_id=${USER_ID}&test_series_id=${TEST_ID}`
    })
    .then(response => response.json())
    .then(data => {
        displayQuestion(data.questions[0]); // Display first question
        document.getElementById('instructions-section').style.display = 'none';
        document.getElementById('questions-section').style.display = 'block';
    });
}

// Display a question
function displayQuestion(question) {
    const container = document.getElementById('question-container');
    container.innerHTML = '';

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.textContent = question.question_text;

    container.appendChild(questionElement);

    const options = document.createElement('div');
    options.classList.add('options');

    question.options.forEach(option => {
        const optionElem = document.createElement('div');
        optionElem.innerHTML = `
            <input type="radio" name="answer" value="${option.id}"> ${option.text}
        `;
        options.appendChild(optionElem);
    });

    container.appendChild(options);
}

// Handle Next and Previous Buttons
document.getElementById('next-btn').addEventListener('click', function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
        displayQuestion({ 
    {
        id: 2,
        question_text: "Which planet is known as the Red Planet?",
        options: [
            {"id": "a", "text": "Earth"},
            {"id": "b", "text": "Mars"},
            {"id": "c", "text": "Jupiter"},
            {"id": "d", "text": "Saturn"}
        ]
    }
     });
    }
});

document.getElementById('prev-btn').addEventListener('click', function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }
});

// Submit Test
document.getElementById('submit-btn').addEventListener('click', function () {
    submitTest();
});

// Submit test and show results
function submitTest() {
    fetch('/v1_data_model/test-series/TestSeries/submit_test', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `user_id=${USER_ID}&test_id=${TEST_ID}`
    })
    .then(response => response.json())
    .then(data => {
        showResults(data);
    });
}

// Display results after test is submitted
function showResults(data) {
    const resultContainer = document.getElementById('results-container');
    resultContainer.innerHTML = `<p>Score: ${data.score}</p>`;
    document.getElementById('questions-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
}

// Initialize the flow
fetchInstructions();

// Adding question data into the code for demo purposes
const questionsData = [{"id": 1, "question_text": "What is the capital of France?", "options": [{"id": "a", "text": "Berlin"}, {"id": "b", "text": "Madrid"}, {"id": "c", "text": "Paris"}, {"id": "d", "text": "Rome"}]}, {"id": 2, "question_text": "Which planet is known as the Red Planet?", "options": [{"id": "a", "text": "Earth"}, {"id": "b", "text": "Mars"}, {"id": "c", "text": "Jupiter"}, {"id": "d", "text": "Saturn"}]}, {"id": 3, "question_text": "What is the largest ocean on Earth?", "options": [{"id": "a", "text": "Atlantic Ocean"}, {"id": "b", "text": "Indian Ocean"}, {"id": "c", "text": "Arctic Ocean"}, {"id": "d", "text": "Pacific Ocean"}]}, {"id": 4, "question_text": "Who wrote "Hamlet"?", "options": [{"id": "a", "text": "Charles Dickens"}, {"id": "b", "text": "Leo Tolstoy"}, {"id": "c", "text": "William Shakespeare"}, {"id": "d", "text": "Mark Twain"}]}, {"id": 5, "question_text": "What is the powerhouse of the cell?", "options": [{"id": "a", "text": "Nucleus"}, {"id": "b", "text": "Mitochondria"}, {"id": "c", "text": "Ribosome"}, {"id": "d", "text": "Endoplasmic Reticulum"}]}];

// Initializing the questions in the test flow
function fetchQuestions() {
    // Simulating fetching questions from the server
    displayQuestion(questionsData[currentQuestionIndex]); // Display first question
    document.getElementById('instructions-section').style.display = 'none';
    document.getElementById('questions-section').style.display = 'block';
}

// Modify displayQuestion function to get questions from questionsData
function displayQuestion(question) {
    const container = document.getElementById('question-container');
    container.innerHTML = '';

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.textContent = question.question_text;

    container.appendChild(questionElement);

    const options = document.createElement('div');
    options.classList.add('options');

    question.options.forEach(option => {
        const optionElem = document.createElement('div');
        optionElem.innerHTML = `
            <input type="radio" name="answer" value="${option.id}"> ${option.text}
        `;
        options.appendChild(optionElem);
    });

    container.appendChild(options);
}
