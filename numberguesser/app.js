// FUNÇÃO DO JOGO
// O jogador escolhe entre um número mínimo e máximo.
// O jogador recebe uma certa quantidade de palpites.
// O jogo notifica o jogador do restante de palpites.
// Notifica o jogador caso a resposta seja correta.
// Opção para o jogador poder jogar novamente.

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessInput = document.querySelector("#guess-input"),
    guessBtn = document.querySelector("#guess-btn"),
    message = document.querySelector(".message");

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event
game.addEventListener("mousedown", function(e) {
    if (e.target.className === "play-again") {
        window.location.reload();
    }
});

// Listen for Guess
guessBtn.addEventListener("click", function() {
    let guess = parseInt(guessInput.value);

    // validation of input type
    if (isNaN(guess) || (guess < min) | (guess > max)) {
        setMessage(`Escolha um número valido para seu palpite`, "purple");
    } else {
        if (guess === winningNum) {
            gameOver(true, `Você acertou, parabéns`);
        } else {
            // wrong number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                gameOver(
                    false,
                    `Fim de jogo, o número correto era ${winningNum}`
                );
            } else {
                // Game continues
                // change border color
                guessInput.style.borderColor = "red";
                // Clear input
                guessInput.value = "";
                // Set message
                setMessage(
                    `${guess} está errado, você tem ${guessesLeft} palpites.`,
                    `red`
                );
            }
        }
    }

    // check if won
});

// game over
function gameOver(won, msg) {
    let color;
    won === true ? (color = "green") : (color = "false");
    // Disable input
    guessInput.disabled = true;
    // color border
    guessInput.style.borderColor = color;
    // message
    setMessage(msg, color);

    // play Again?
    guessBtn.value = "Play Again?";
    guessBtn.className += "play-again";
}

// get Winner number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// set message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}
