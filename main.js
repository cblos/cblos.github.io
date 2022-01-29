// just a test commit...
// These are done before load, in order to reduce the amount of time we're on the 
// wrong color mode, i.e. to reduce the page flash-time as the javascript loads.
const BODY = document.body || document.querySelector("body");
const IMG = BODY.querySelector(".color-switch img");
const _DARK_MODE = localStorage.getItem("dark-mode");
const  DARK_MODE = _DARK_MODE == null ? "true" : _DARK_MODE;
// TODO: Somehow figure out how to temporarily disable transitions to load the user's stored theme. 
// maybe we need server side logic to do this?
if (DARK_MODE === "true") {
    // set default color scheme only meant for webkit browsers, firefox is done in CSS
    document.documentElement.style.colorScheme = "dark";

} else {
    // light theme
    BODY.classList.remove("dark-mode");
    IMG.src = "./resources/dark.svg";
}
const LOAD = () => 
{
    console.log("Page loaded.\nScripts can run now.");
    const LINKS = document.querySelectorAll(".links .link");

    const TOGGLE_LINKS = () => {
        for (link of LINKS)
            link.classList.toggle("show-menu");
    };

    // close menu once clicked
    for (link of LINKS)
        link.addEventListener("click", TOGGLE_LINKS);

    const COLOR_SWITCH = document.querySelector(".color-switch");
    const MENU = document.querySelector(".tb-menu");
    // switch color on click, and add an animation
    COLOR_SWITCH.addEventListener("click", () => {
        // change to dark mode
        BODY.classList.toggle("dark-mode");
        // spin-animate the color-switcher
        // https://stackoverflow.com/a/58353279 <- explains whatever hack this is 
        COLOR_SWITCH.classList.remove("rotate-animation");
        void COLOR_SWITCH.offsetWidth; // this hack
        COLOR_SWITCH.classList.add("rotate-animation");
        // change the image
        if (BODY.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "true");
            IMG.src = "./resources/light.svg";
            // change to dark mode (only for webkit)
            document.documentElement.style.colorScheme = "dark";
        }
        else {
            localStorage.setItem("dark-mode", "false");
            IMG.src = "./resources/dark.svg";
            // change to light mode (only for webkit)
            document.documentElement.style.colorScheme = "light";
        }
    });

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
}

window.addEventListener("load", LOAD);