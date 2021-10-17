//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements   
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message'),
    hint = document.querySelector('.hint');

//Assigning the min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});


//adding our eventlistener for guess

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`please enter a number between ${min} and ${max}`, 'red')
        return setTimeout(setMessage, 2000);
    }

    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, You Win!`);

    } else {
        guessesLeft -= 1;
        if (guessesLeft === 0) {
            gameOver(false, `Game Over, you lost, the correct number was ${winningNum}`)
            guessInput.value = '';
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
        if (guess < winningNum) {
            setHint('You have gone low! Guess a higher value!');
        }
        if (guess > winningNum) {
            setHint('You have gone high! Guess a low value!');
        }
    }

    // if (guess === winNumber) {
    //     setHint('');
    // }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg)

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function setHint(msg) {
    if (max > 5) {
        hint.textContent = msg;
        hint.style.color = '#8700ff';
    }
}
