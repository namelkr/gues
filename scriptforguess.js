const vowels = ['A', 'E', 'I', 'O', 'U'];

const word = "NOKDENSANG";
const word_L1 = word.split('');
const n = word_L1.length;
let user_word = Array(n).fill('_');
let lives = 10;
let letters_used = [];

function guessLetter() {
  const input = document.getElementById("guessInput");
  const guess = input.value.trim().toUpperCase();

  if (guess === word) {
    showSuccessScreen();
    return;
  }

  if (guess.length !== 1) {
    showMessage("Please enter only one letter.");
    return;
  }

  const ch = guess;

  input.value = '';

  if (letters_used.includes(ch)) {
    showMessage("Letter already used. Try a different letter.");
    return;
  }

  let guessedCorrectly = false;
  for (let i = 0; i < n; i++) {
    if (ch === word_L1[i]) {
      user_word[i] = ch;
      guessedCorrectly = true;
    }
  }

  if (!guessedCorrectly) {
    if (vowels.includes(ch)) {
      lives -= 2;
    } else {
      lives -= 1;
    }
    showMessage("❌ Incorrect guess! Keep going!"); // Emoji for incorrect guess
  } else {
    showMessage("✅ Correct guess! Keep it up!"); // Emoji for correct guess
  }

  letters_used.push(ch);
  updateUI();

  if (user_word.join('') === word) {
    showSuccessScreen();
  }

  if (lives === 0) {
    showFailureScreen();
  }
}

function updateUI() {
  document.getElementById("userWord").textContent = "User Word: " + user_word.join(' ');
  document.getElementById("lives").textContent = "Lives: " + lives + " ❤️"; // Add an emoji next to lives
  document.getElementById("lettersUsed").textContent = "Letters Used: " + letters_used.join(', ');
  document.getElementById("message").textContent = "";
}

function showMessage(message, success) {
  const messageElement = document.getElementById("message");
  messageElement.innerHTML = message;
  messageElement.classList.add(success ? "success" : "failure");
}

function showSuccessScreen() {
  const messageElement = document.getElementById("message");
  messageElement.innerHTML = "<span class='success-message'>🎉 Congratulations!<br>Share the link and joy with at least 3 colleagues. 🎉<br> The name was:</span><span class='name-success'>" + word + "</span>";
  messageElement.classList.add("success");
  document.getElementById("guessButton").disabled = true;
  document.getElementById("guessInput").disabled = true;
}

function showFailureScreen() {
  const messageElement = document.getElementById("message");
  messageElement.innerHTML = "<span class='failure-message'>You could not guess the name.<br>Share the link with 10 colleagues.</span><br><span class='name-failure'>The name was: " + word + "</span>";
  messageElement.classList.add("failure");
  document.getElementById("guessButton").disabled = true;
  document.getElementById("guessInput").disabled = true;
}

updateUI();

document.getElementById("guessButton").addEventListener("click", guessLetter);

document.getElementById("guessInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    guessLetter();
  }
});
