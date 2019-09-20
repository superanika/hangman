'use strict';
const listOfWords = ['aguja','ascensor', 'aguila', 'avion', 'astronauta', 'alfiler', 'aguacate', 'abrazar', 'automovil',
'albañil', 'arandano', 'abejorro', 'abeja', 'almendra', 'avellana', 'ambientador', 'buho',
'bateria', 'bañador', 'bellota', 'bombon', 'burro', 'baloncesto',  'balon', 'bonito','billete', 'batido', 'bocadillo', 'cochera', 'camino', 'cacahuete',
'cantimplora', 'cielo', 'celeste', 'calamar', 'cortijo', 'colegio', 'calculadora', 'coco', 'cangrejo',
'cuchara', 'cuchillo', 'camion', 'costilla', 'cabeza', 'cadena', 'cocodrilo', 'cabra', 'conejo', 'calcetin',
'diente', 'dinero', 'donut', 'dado', 'diamante', 'dromedario', 'delantal', 'elefante', 'electricista',
'electricidad', 'estornudar', 'escuela', 'esponja', 'estrella', 'elastico', 'fiera', 'farmacia', 'fideo', 'fruta', 'fantastico', 'fabuloso',
'frigorifico', 'falda', 'frente', 'frenar', 'gato', 'grande', 'granja', 'granjero', 'gorro', 'guantes', 'garganta',
'gominola', 'gigante', 'girasol', 'gente', 'garabato','guisante', 'galletas', 'hielo', 'hiena', 'helicoptero', 'humor', 
'habichuela', 'hablar', 'horno', 'hermano', 'hamburguesa', 'helado', 'iguana', 'iglu', 'iglesia', 'ilusion', 'jirafa', 'juguete', 'jardin', 'jardinero',
'judia', 'jarron', 'jeringuilla', 'jersey', 'jarron', 'jinete', 'kiosko', 'karate', 'lampara', 'linterna', 'libro',
'libreta', 'lavadora', 'limon', 'lobo', 'lentejas', 'lavanda', 'macarrones', 'monigote', 'madre', 'mariquita', 'manta', 'merienda', 'melocoton',
'miel', 'maestro', 'miercoles', 'molino', 'mandarina', 'manzana', 'melon', 'motocicleta', 'merendero', 'mochila', 'moneda', 'maceta', 'menta', 'naranja',
'navaja', 'nublado', 'nieve', 'nariz', 'oveja', 'ovillo', 'oreja', 'osito', 'paquete', 'padre', 'paracaidas', 'papel', 
'piña', 'perro', 'peluca', 'peludo', 'papagayo', 'paloma', 'pendiente', 'pierna', 'palabra', 'piojo', 'puerta', 'pulsera',
'pajaro', 'pajarita', 'paraguas', 'pepinillo', 'pepino','planeta', 'portazo', 'puchero', 'pimiento', 'platano', 'pluma', 'pantalon', 'palmera',
'pijama', 'piruleta', 'queso', 'querer', 'raqueta', 'radio', 'radiografia', 'romero', 'ruido', 'raqueta', 'rosal',
'reir', 'raton', 'retrato', 'sabana', 'salsa', 'silbato', 'silencio', 'silla', 'salmon', 'suelo', 'sandalia', 'sillon',
'silueta', 'saltamontes', 'sardina', 'salmorejo', 'sandia', 'suerte', 'sandwich', 'tenedor', 'tambor', 'taza', 'terremoto',
'tractor', 'termita', 'tiempo', 'terraza', 'tren', 'unicornio', 'uniforme', 'viaje', 'viejo', 'volante', 'vino',
'volar', 'violin', 'vuelta', 'yema', 'zapato', 'zanahoria', 'zorro', 'zambomba'];
let word = '';
let letter = '';
let wrongLetters = [];
let saidLetters = [];
let failureCounter = 0;

const wordCointainer = document.querySelector('.word_container');
const letterInput = document.querySelector('.letter_input');
const checkBtn = document.querySelector('.check_letter');
const message= document.querySelector('.message');
const saidLettersWrapper = document.querySelector('.said_letters');
const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal_message');
const modalButton = document.querySelector('.modal_button');
const parts = document.querySelectorAll('.part');
const head = document.querySelector('.face');
const closeBtn = document.querySelector('.close_icon');
const resetBtn = document.querySelector('.reset_btn');

function printWord() {
    const randomNum = Math.floor(Math.random() * listOfWords.length); 
    word = listOfWords[randomNum].toUpperCase();
    console.log(word);
    const wordArray = word.split('');
    checkBtn.disabled = false;
    letterInput.disabled = false;
    for (let item of wordArray) {
        const letterWrapper = document.createElement('div');
        letterWrapper.classList.add('letter_wrapper');
        
        const letterContainer = document.createElement('p');
        const letter = document.createTextNode(item);
        letterContainer.classList.add(item, 'hide', 'letter');
        
        letterContainer.appendChild(letter);
        letterWrapper.appendChild(letterContainer);
        wordCointainer.appendChild(letterWrapper);
    }
}

function printSaidLetters() {
    saidLettersWrapper.innerHTML= '';
    for(let item of saidLetters) {
        const letterContainer = document.createElement('p');
        const letter = document.createTextNode(item);
        letterContainer.appendChild(letter);
        saidLettersWrapper.appendChild(letterContainer);
    }
}

function handleModal(msg) {
    modalMessage.innerHTML = msg;
    checkBtn.disabled = true;
    letterInput.disabled = true;
}

function handleInput() {
    message.innerHTML = '';
    letter = letterInput.value.toUpperCase();
        if(letter) {
            if(saidLetters.includes(letter) || wrongLetters.includes(letter)) {
                failureCounter++;
                showHangmanParts(failureCounter);
                message.innerHTML = `La letra ${letter} ya la has introducido anteriormente.`
            }else {
                if(word.includes(letter)) {
                    const win = document.querySelectorAll(`.${letter}`);
                    for(let letter of win) {
                        letter.classList.remove('hide');
                        letter.parentElement.style.borderBottom = 'none';
                    }
                    let letters = document.querySelectorAll('.letter');
                    let arrayofletters = Array.from(letters);
                    const solved = arrayofletters.every(p => !p.classList.contains('hide'));
                    if(solved) {
                        modal.classList.add('show');
                        handleModal('¡Enhorabuena, has ganado!');
                    }
                    if(win.length === 1) {
                        message.innerHTML = `¡Muy bien, la letra ${letter} está 1 vez!`;
                        
                    }else {
                        message.innerHTML = `¡Muy bien, la letra ${letter} está ${win.length} veces!`;
                    }
                    saidLetters.push(letter);
                    printSaidLetters();
                }else {
                    wrongLetters.push(letter);
                    saidLetters.push(letter);
                    message.innerHTML= `¡Oh, no!, la letra ${letter} no se encuentra en esta palabra.`;
                    printSaidLetters();
                    failureCounter++;
                    showHangmanParts(failureCounter);
                }
            }
        }else {
            message.innerHTML = 'Por favor, introduce una letra.';
        }
    letterInput.value = ''; 
}

function showHangmanParts(failureCounter) {
    const part = document.querySelector(`.part${failureCounter}`);
    part.classList.remove('hide');
    switch(failureCounter) {
        case 6 :
            head.classList.remove('hide');
        break;
        case 7: 
            head.style.backgroundImage = 'url(./images/face2.png)';
        break;
        case 8:
            head.style.backgroundImage = 'url(./images/face3.png)';
        break;
        case 9:
            head.style.backgroundImage = 'url(./images/face4.png)';
        break;
        case 10:
            head.style.backgroundImage = 'url(./images/face5.png)';
        break;
        case 11:
            head.style.backgroundImage = 'url(./images/face6.png)';
            modal.classList.add('show');
            handleModal('Lo siento, has perdido');
        break;
    }
}

function reset() {
    wrongLetters = [];
    saidLetters = [];
    failureCounter = 0;
    wordCointainer.innerHTML = '';
    letterInput.value = ''; 
    for(let part of parts) {
        part.classList.add('hide');
    }
    head.classList.add('hide');
    saidLettersWrapper.innerHTML= '';
    message.innerHTML= '';
    modalMessage.innerHTML = '';
}

function newGame() {
    reset();
    printWord();
    modal.classList.remove('show');
}

function handleEnter(event) {
    if (event.keyCode === 13) {
        checkBtn.click();
    }
}

printWord();
checkBtn.addEventListener('click', handleInput);
letterInput.addEventListener('keypress', handleEnter);
modalButton.addEventListener('click', newGame);
closeBtn.addEventListener('click', () => modal.classList.remove('show'));
resetBtn.addEventListener('click', newGame);
