import json from '../json/pets.json' assert {type: "json"};

let popupLanding = document.getElementsByClassName("main")[0]
let body = document.getElementsByTagName("body")[0]


export function popup(event) {
    body.style.overflow = "hidden"

    let name = ''

    if (event.target.tagName === "IMG") {
        name = event.target.nextElementSibling.innerHTML
    } else if (event.target.tagName === "BUTTON") {
        name = event.target.previousElementSibling.innerHTML
    } else if (event.target.tagName === "SPAN") {
        name = event.target.innerHTML
    }
    else {
        name = event.target.children[1].innerHTML
    }
    let arr = findObj(name)[0]

    const popupElement = document.createElement('div')
    popupElement.classList.add('popup')
    popupElement.innerHTML = `
    <div class="popup-modal">
      <img src="${arr.img}" alt="" class="popup-modal-img">
      <div class="popup-modal-content">
        <h2 class="popup-modal-content-title">${name}</h2>
        <div class="popup-modal-content-subtitle">${arr.type} - ${arr.breed}</div>
        <div class="popup-modal-content-description">${arr.description}</div>
        <ul class="popup-modal-content-list">
          <li class="popup-modal-content-list-item"><span>Age: </span>${arr.age}</li>
          <li class="popup-modal-content-list-item"><span>Inoculations: </span>${arr.inoculations}</li>
          <li class="popup-modal-content-list-item"><span>Diseases: </span>${arr.diseases}</li>
          <li class="popup-modal-content-list-item"><span>Parasites: </span>${arr.parasites}</li>
        </ul>
      </div>
    </div>
    <button class="popup-button"><img class="popup-button-img" src="../assets/icons/cross.svg" alt=""></button>
    `
    popupLanding.appendChild(popupElement)

    popupElement.addEventListener('click', function(event) {
        if (event.target.classList[0] === 'popup' || event.target.classList[0] === 'popup-button' || event.target.classList[0] === 'popup-button-img') {
            popupElement.remove()
            body.style.overflow = ""
        }
    })
}

function findObj(name) {
    return json.filter(function (obj) {
        return obj.name === name;
    });
}
