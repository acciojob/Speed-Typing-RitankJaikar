//your JS code here. If required.
const quoteDisplay = document.querySelector('.quote-display');
const quoteInput = document.getElementById('quoteInput');
const timer = document.querySelector('.timer');

let currentQuote = '';
let startTime;

// Fetch and display a new random quote
async function fetchNewQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  currentQuote = data.content;
  quoteDisplay.innerHTML = '';

  // Display the quote, letter by letter
  currentQuote.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    quoteDisplay.appendChild(span);
  });

  // Clear input field and reset timer
  quoteInput.value = '';
  timer.textContent = 0;
  startTime = new Date();
}

// Start the timer
function startTimer() {
  timer.textContent = Math.floor((new Date() - startTime) / 1000);
  setTimeout(startTimer, 1000);
}

// Check typing
quoteInput.addEventListener('input', () => {
  const quoteSpans = quoteDisplay.querySelectorAll('span');
  const inputValue = quoteInput.value.split('');

  let correct = true;
  quoteSpans.forEach((span, index) => {
    const char = inputValue[index];

    if (char == null) {
      span.classList.remove('correct', 'incorrect');
      correct = false;
    } else if (char === span.textContent) {
      span.classList.add('correct');
      span.classList.remove('incorrect');
    } else {
      span.classList.add('incorrect');
      span.classList.remove('correct');
      correct = false;
    }
  });

  // If the entire quote is correct
  if (correct) {
    setTimeout(() => {
      fetchNewQuote();
    }, 3000);
  }
});

// Initialize the application
fetchNewQuote();
startTimer();
