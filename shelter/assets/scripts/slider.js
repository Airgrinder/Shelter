import json from '../json/pets.json' assert {type: "json"};

let leftArrow = document.getElementsByClassName("arrow-left")
let rightArrow = document.getElementsByClassName("arrow-right")
let cards = document.getElementsByClassName("our-friends-cards-card")

let next = randomizer()
let current = randomizer()
let previous = randomizer()

export function slider(event) {
    let side = event.target.classList[1]
    if (side === "arrow-right") {
        previous = current
        current = next
        slideCycleRight(current)
        next = randomizer(next)
    } else {
        next = current
        current = previous
        slideCycleLeft(current)
        previous = randomizer(previous)
    }
}

previous = current
current = next
slideCycleLeft(current)
next = randomizer(next)

function slideCycleLeft(current) {
    setTimeout(() => {
        for (const card of cards) {
            card.style.left = "-100%";
            card.style.opacity = "0";
        }
    }, 10);
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            cards[i].children[0].attributes[1].value = json[current[i]].img
            cards[i].children[1].innerText = json[current[i]].name
        }
    }, 100);
    setTimeout(() => {
        for (const card of cards) {
            card.style.left = "100%";
        }
    }, 600);
    setTimeout(() => {
        for (const card of cards) {
            card.style.left = "0px";
            card.style.opacity = "1";
        }
    }, 700);
}

function slideCycleRight(current) {
    setTimeout(() => {
        for (const card of cards) {
            card.style.left = "100%";
            card.style.opacity = "0";
        }
    }, 10);
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            cards[i].children[0].attributes[1].value = json[current[i]].img
            cards[i].children[1].innerText = json[current[i]].name
        }
    }, 100);
    setTimeout(() => {
        for (const card of cards) {
            card.style.left = "-100%";
        }
    }, 600);
    setTimeout(() => {
        for (const card of cards) {
            card.style.left = "0px";
            card.style.opacity = "1";
        }
    }, 700);
}

function randomizer(avoid) {
    const numbers = avoid ? [0, 1, 2, 3, 4, 5, 6, 7].filter(num => !avoid.includes(num)) : [0, 1, 2, 3, 4, 5, 6, 7];
    const randomNumbers = [];
    while (randomNumbers.length < 3) {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        randomNumbers.push(randomNumber);
        numbers.splice(numbers.indexOf(randomNumber), 1);
    }
    return randomNumbers;
}

for (const element of rightArrow) {
    element.addEventListener("click", slider)
}

for (const element of leftArrow) {
    element.addEventListener("click", slider)
}