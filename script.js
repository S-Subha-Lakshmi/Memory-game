const images = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
    'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
    'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;
let timerInterval = null;
let timeLeft = 60; // Set game time in seconds (1 minute)

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function createCard(imageSrc) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.display = 'none'; // Initially hide the image
    card.appendChild(img);
    
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.querySelector('img').style.display = 'block'; // Show the image when flipped

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards += 2;

    if (matchedCards === images.length) {
        clearInterval(timerInterval); // Stop the timer when the game is won
        setTimeout(() => alert('You won!'), 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('img').style.display = 'none';
        secondCard.querySelector('img').style.display = 'none';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startGame() {
    document.getElementById('start-btn').style.display = 'none';
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board if a game is restarted
    shuffle(images);

    images.forEach(imageSrc => {
        const card = createCard(imageSrc);
        gameBoard.appendChild(card);
    });

    matchedCards = 0; // Reset matched cards

    // Start the timer
    timeLeft = 60; // Reset the time
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`; // Display the time
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second

    // Hide the Start Game button after starting the game
    document.getElementById('start-btn').style.display = 'none';
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval); // Stop the timer
        alert('Time is up! Game Over!');
        stopGame();
    } else {
        timeLeft--;
        document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
    }
}

function stopGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board when game stops
    document.getElementById('timer').textContent = `Time left: 0s`; // Reset the timer display
    clearInterval(timerInterval); // Stop the timer
    alert('Game Over!');
}

// Add buttons for starting and stopping the game
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('stop-btn').addEventListener('click',stopGame);