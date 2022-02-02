import { DIR_STRUCTURE } from './dir-structure.js';

console.log(DIR_STRUCTURE);

const BODY = document.body || document.querySelector("body");
// const IMG = BODY.querySelector(".color-switch img");
const IMGS = BODY.querySelectorAll(".color-switch img");
if (DARK_MODE !== "true") {
    IMGS.forEach(img => img.src = "./resources/dark.svg");
}
const LOAD = () => 
{
    console.log("Page loaded.\nScripts can run now.");
    // set copyright year end to current year
    const YEAR = new Date().getFullYear();
    document.querySelector(".year").textContent = YEAR;
    const TB = document.querySelector(".titlebar");
    const LINKS = document.querySelectorAll(".links .link");

    const TOGGLE_LINKS = () => {
        for (link of LINKS)
            link.classList.toggle("show-menu");
    };

    // close menu once clicked
    for (link of LINKS)
        link.addEventListener("click", TOGGLE_LINKS);

    const COLOR_SWITCHERS = document.querySelectorAll(".color-switch");
    const COLOR_SWITCH = COLOR_SWITCHERS[0];
    const COLOR_SWITCH_DOWN = COLOR_SWITCHERS[1];
    const MENU = document.querySelector(".tb-menu");
    // switch color on click, and add an animation
    const COLOR_SCHEME_SWITCHER = function() {
        // change to dark mode
        ROOT.classList.toggle("dark-mode");
        // spin-animate the color-switcher
        // https://stackoverflow.com/a/58353279 <- explains whatever hack this is 
        this.classList.remove("rotate-animation");
        void COLOR_SWITCH.offsetWidth; // this hack
        this.classList.add("rotate-animation");
        // change the image
        if (ROOT.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "true");
            IMGS.forEach(img => img.src = "./resources/light.svg");
            // IMG.src = "./resources/light.svg";
            // change to dark mode (only for webkit)
            ROOT.style.colorScheme = "dark";
        }
        else {
            localStorage.setItem("dark-mode", "false");
            IMGS.forEach(img => img.src = "./resources/dark.svg");
            // IMG.src = "./resources/dark.svg";
            // change to light mode (only for webkit)
            ROOT.style.colorScheme = "light";
        }
    };
    COLOR_SWITCHERS.forEach(c => 
        c.addEventListener("click", COLOR_SCHEME_SWITCHER.bind(c))
    );

    MENU.addEventListener("click", TOGGLE_LINKS);

    window.addEventListener("click", (e) => {
        const E = e || window.event || event;
        let links_elem = E.target;
        let click_outside = true;
        // find parent element that's class name is `links`. if it exists, we did not 
        // click outside the links, so they must stay open if it does not exist, we must
        // close the menu because we clicked outside the menu 
        while (links_elem = links_elem.parentElement) {
            if (links_elem.classList.contains("links")){
                click_outside = false;
                break;
            }
        }
        if (click_outside)
            for (link of LINKS)
                link.classList.remove("show-menu");
    });

    let prev_scroll = window.scrollY;
    const WINDOW_SCROLL = () => {
        const TBH = parseFloat(window.getComputedStyle(TB).height);
        const WS = window.scrollY;
        const DIFF = WS - prev_scroll;
        if (WS > TBH) {
            if (DIFF < 0) {
                // unhide when scrolling up
                TB.classList.remove('tb-hide');
                COLOR_SWITCH_DOWN.classList.add("hide");
            } else {
                // hide when scrolling down
                TB.classList.add('tb-hide');
                // disable all links
                for (link of LINKS)
                    link.classList.remove("show-menu");
                COLOR_SWITCH_DOWN.classList.remove("hide");
            }
        }
        prev_scroll = WS;
    };
    WINDOW_SCROLL();
    window.addEventListener('scroll', WINDOW_SCROLL);
}

window.addEventListener("load", LOAD);