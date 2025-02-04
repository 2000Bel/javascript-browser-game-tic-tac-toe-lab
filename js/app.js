let playerScore = 100;

const cosmonaut = document.getElementById('cosmonaut');

const scoreDisplay = document.getElementById('score');

const resetButton = document.getElementById('reset-button');

let gameInterval, asteroidInterval, powerInterval;



// Movimiento del cosmonauta

let cosmonautPosition = 50;



document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft' && cosmonautPosition > 0) {

        cosmonautPosition -= 5;

    } else if (event.key === 'ArrowRight' && cosmonautPosition < 95) {

        cosmonautPosition += 5;

    }

    cosmonaut.style.left = cosmonautPosition + '%';

});



// Crear asteroides

function createAsteroid() {

    const asteroid = document.createElement('div');

    asteroid.classList.add('asteroid');

    asteroid.style.left = Math.random() * 100 + '%';

    asteroid.style.top = '-30px';

    document.getElementById('game-container').appendChild(asteroid);



    // Mover asteroide

    let asteroidPosition = 0;

    const fallInterval = setInterval(() => {

        asteroidPosition += 5;

        asteroid.style.top = asteroidPosition + 'px';



        // Colisión con cosmonauta

        if (checkCollision(asteroid)) {

            playerScore -= getRandomPoints();

            scoreDisplay.textContent = 'Puntos: ' + playerScore;

            clearInterval(fallInterval);

            asteroid.remove();

        }



        // Eliminar asteroide si llega al fondo

        if (asteroidPosition > window.innerHeight) {

            clearInterval(fallInterval);

            asteroid.remove();

        }

    }, 50);

}



// Crear poderes

function createPower() {

    const power = document.createElement('div');

    power.classList.add('power');

    power.style.left = Math.random() * 100 + '%';

    power.style.top = '-30px';

    document.getElementById('game-container').appendChild(power);



    // Mover poder

    let powerPosition = 0;

    const fallInterval = setInterval(() => {

        powerPosition += 5;

        power.style.top = powerPosition + 'px';



        // Colisión con cosmonauta

        if (checkCollision(power)) {

            playerScore += getPowerPoints();

            scoreDisplay.textContent = 'Puntos: ' + playerScore;

            clearInterval(fallInterval);

            power.remove();

        }



        // Eliminar poder si llega al fondo

        if (powerPosition > window.innerHeight) {

            clearInterval(fallInterval);

            power.remove();

        }

    }, 50);

}



// Comprobar colisión entre el cosmonauta y un objeto

function checkCollision(object) {

    const cosmonautRect = cosmonaut.getBoundingClientRect();

    const objectRect = object.getBoundingClientRect();



    return !(cosmonautRect.right < objectRect.left ||

        cosmonautRect.left > objectRect.right ||

        cosmonautRect.bottom < objectRect.top ||

        cosmonautRect.top > objectRect.bottom);

}



// Obtener puntos aleatorios para asteroides

function getRandomPoints() {

    const points = [1, 5, 10];

    return points[Math.floor(Math.random() * points.length)];

}



// Obtener puntos de poder aleatorios

function getPowerPoints() {

    const points = [2, 10, 20];

    return points[Math.floor(Math.random() * points.length)];

}



// Iniciar el juego

function startGame() {

    playerScore = 100;

    scoreDisplay.textContent = 'Puntos: ' + playerScore;



    gameInterval = setInterval(() => {

        if (playerScore <= 0) {

            clearInterval(gameInterval);

            clearInterval(asteroidInterval);

            clearInterval(powerInterval);

            alert('¡Game Over! Has perdido.');

        } else if (playerScore >= 1000) {

            clearInterval(gameInterval);

            clearInterval(asteroidInterval);

            clearInterval(powerInterval);

            alert('¡Felicidades! Has ganado el juego.');

        }

    }, 100);



    asteroidInterval = setInterval(createAsteroid, 2000);

    powerInterval = setInterval(createPower, 4000);

}



// Función de reinicio

resetButton.addEventListener('click', () => {

    clearInterval(gameInterval);

    clearInterval(asteroidInterval);

    clearInterval(powerInterval);

    startGame();

});



// Iniciar juego al cargar la página

startGame();
