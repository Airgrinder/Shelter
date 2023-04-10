import json from '../json/pets.json' assert {type: "json"};

let first = document.getElementsByClassName("main-buttons-first")[0]
let previous = document.getElementsByClassName("main-buttons-previous")[0]
let next = document.getElementsByClassName("main-buttons-next")[0]
let last = document.getElementsByClassName("main-buttons-last")[0]
let cards = document.getElementsByClassName("main-cards")[0]
let page = document.getElementsByClassName("main-buttons-current")[0]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const uniqueArrays = []
while (uniqueArrays.length < 7) {
    const shuffledArray = shuffleArray([...json])
    if (!uniqueArrays.some(arr => JSON.stringify(arr) === JSON.stringify(shuffledArray))) {
        uniqueArrays.push(shuffledArray)
    }
}

function unitedArray(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(unitedArray(val)) : acc.concat(val), []);
}

let arr = unitedArray(uniqueArrays)
let numOfCards = 0
let sliderIndex = 8


export function renderCards(event) {
    cards.innerHTML = "";
    for (let i = sliderIndex; i < sliderIndex + numOfCards && i < arr.length; i++) {
        const sliderItem = document.createElement("div");
        sliderItem.classList.add('main-cards-card');
        sliderItem.innerHTML = `
            <img alt="" src="${arr[i].img}">
            <span>${arr[i].name}</span>
            <button>Learn more</button>`;
        cards.appendChild(sliderItem);
    }
    page.innerHTML = sliderIndex / numOfCards
}

function moveSliderLeft() {
    if (sliderIndex > numOfCards) {
        sliderIndex -= numOfCards;
        renderCards();
    }
}

function moveSliderRight() {
    if (sliderIndex + numOfCards < arr.length) {
        sliderIndex += numOfCards;
        renderCards();
    }
}

function moveSliderStart() {
    sliderIndex = numOfCards;
    renderCards();
}

function moveSliderEnd() {
    sliderIndex = 48;
    renderCards();
}

function checkWidth() {
    const windowWidth = window.innerWidth;

    if (windowWidth > 1279.98) {
        numOfCards = 8;
    } else if (windowWidth > 767.98) {
        numOfCards = 6;
    } else {
        numOfCards = 3;
    }
    console.log(numOfCards)
    sliderIndex = numOfCards
    renderCards()
}

window.addEventListener("resize", checkWidth);
next.addEventListener('click', moveSliderRight)
previous.addEventListener('click', moveSliderLeft)
first.addEventListener('click', moveSliderStart)
last.addEventListener('click', moveSliderEnd)

checkWidth()
renderCards()