let burger = document.getElementsByClassName("burger-menu")[0]
let burgerBG = document.getElementsByClassName("header-mobile-menu-background")[0]
let burgerMenu = document.getElementsByClassName("header-mobile-menu")[0]
let links = document.getElementsByClassName("header-mobile-menu-link");
let body = document.getElementsByTagName("body")[0]


export function showSideMenu() {
    if (burgerMenu.style.right === "0px") {
        burgerMenu.style.right = "-100%"
        burgerBG.style.right = "-100%"
        burger.style.transform = "rotate(0deg)"
        burger.style.margin = ""
        body.style.overflow = ""
    } else {
        burgerMenu.style.right = "0px"
        burgerBG.style.right = "0px"
        burger.style.transform = "rotate(90deg)"
        burger.style.margin = "30px 33px 0 0"
        body.style.overflow = "hidden"
    }
}


burgerBG.addEventListener('click', showSideMenu)
burger.addEventListener('click', showSideMenu)
for (const link of links) {
    link.addEventListener('mouseup', showSideMenu)
}
burgerBG.addEventListener('touchstart', event=>{
    event.preventDefault();
    event.stopPropagation();
    showSideMenu(event);
});
burger.addEventListener('touchstart', event=>{
    event.preventDefault();
    event.stopPropagation();
    showSideMenu(event);
});
for (const link of links) {
    link.addEventListener('touchend', event=>{
        event.preventDefault();
        event.stopPropagation();
        showSideMenu(event);
    });
}

