'use strict';
import spanishWords from './module.js';

let language = localStorage.getItem('language') || 'spanish';
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
const radioButtons = document.querySelectorAll('.radio');
const title = document.querySelector('.title');
const label = document.querySelector('.label');
const footerText = document.querySelector('.footer_text');
const spanishRadio = document.getElementById('spanish_language');
const englishRadio = document.getElementById('english_language');

function printWord(listOfWords) {
    const randomNum = Math.floor(Math.random() * listOfWords.length); 
    word = listOfWords[randomNum].toUpperCase();
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

function handleMessage(text) {
    message.innerHTML = text;
}

function handleInput() {
    message.innerHTML = '';
    letter = letterInput.value.toUpperCase();
        if(letter) {
            if(saidLetters.includes(letter) || wrongLetters.includes(letter)) {
                failureCounter++;
                showHangmanParts(failureCounter);
                language === 'spanish' ?
                handleMessage(`La letra ${letter} ya la has introducido anteriormente.`)
                :
                handleMessage(`You already typed letter ${letter}`);
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
                        language === 'spanish' ? handleModal('¡Enhorabuena, has ganado!')
                            : handleModal('Congrats, you won!');
                        }
                    if(win.length === 1) {
                        language === 'spanish' ?
                        handleMessage( `¡Muy bien, la letra ${letter} está 1 vez!`)
                        :
                        handleMessage(`Great, letter ${letter} appears once!`);
                    }else {
                        language === 'spanish' ?
                        handleMessage( `¡Muy bien, la letra ${letter} está ${win.length} veces!`)
                        :
                        handleMessage(`Great, letter ${letter} appears ${win.length} times!`);
                    }
                    saidLetters.push(letter);
                    printSaidLetters();
                }else {
                    wrongLetters.push(letter);
                    saidLetters.push(letter);
                    message.innerHTML= `¡Oh, no!, la letra ${letter} no se encuentra en esta palabra.`;
                    language === 'spanish' ?
                    handleMessage( `¡Oh, no!, la letra ${letter} no se encuentra en esta palabra.`)
                    :
                    handleMessage(`Oops, letter ${letter} is not in this word!`);
                    printSaidLetters();
                    failureCounter++;
                    showHangmanParts(failureCounter);
                }
            }
        }else {
            language === 'spanish' ?
            handleMessage( `Por favor, introduce una letra.`)
            :
            handleMessage(`Please, type a letter`);
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
            language === 'spanish' ? handleModal('Lo siento, has perdido')
            : handleModal('Sorry, you lose');
        break;
    }
}

function spanishLanguage() {
    spanishRadio.checked = true;
    title.innerHTML = 'El juego del ahorcado';
    label.innerHTML = 'Introduce una letra';
    checkBtn.innerHTML = 'Comprobar';
    resetBtn.innerHTML = 'Reiniciar';
    modalButton.innerHTML = 'Jugar otra vez';
    footerText.innerHTML= 'Visítame en <a href="https://github.com/superanika" target="blank" class="link">Github</a>'
}

function englishLanguage() {
    englishRadio.checked = true;
    title.innerHTML = 'The hangman game';
    label.innerHTML = 'Type a letter';
    checkBtn.innerHTML = 'Check';
    resetBtn.innerHTML = 'Reset';
    modalButton.innerHTML = 'Play again';
    footerText.innerHTML = 'Visit me at <a href="https://github.com/superanika" target="blank" class="link">Github</a>'
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
    head.style.backgroundImage=" url('./images/face.png')";
    saidLettersWrapper.innerHTML= '';
    message.innerHTML= '';
    modalMessage.innerHTML = '';
}

function checkLanguage() {
    if (language === 'spanish') {
        reset();
        spanishLanguage();
        printWord(spanishWords);
    }else {
        reset();
        englishLanguage();
        printWord(englishWords);
    }
}

function handleCheck(event) {
    const target = event.currentTarget.value;
    language = target;
    localStorage.setItem('language', target);
    checkLanguage();
}

function newGame() {
    reset();
    checkLanguage();
    modal.classList.remove('show');
}

function handleEnter(event) {
    if (event.keyCode === 13) {
        checkBtn.click();
    }
}

function handleListeners() {
    for(let radio of radioButtons) {
        radio.addEventListener('change', handleCheck);
    }
    checkBtn.addEventListener('click', handleInput);
    letterInput.addEventListener('keypress', handleEnter);
    modalButton.addEventListener('click', newGame);
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    resetBtn.addEventListener('click', newGame);
}

checkLanguage();
handleListeners();
