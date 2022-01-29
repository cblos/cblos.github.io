// set default color scheme (done before load, in order to reduce flicker)
// only meant for webkit browsers, firefox is done in CSS
document.documentElement.style.colorScheme = "dark";
const LOAD = () => 
{
    console.log("Page loaded.\nScripts can run now.");
    const COLOR_SWITCH = document.querySelector(".color-switch");
    const BODY = document.body || document.querySelector("body");
    const SOURCE_LINK = document.querySelector("#source");
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
        const IMG = BODY.querySelector("img");
        if (BODY.classList.contains("dark-mode")) {
            IMG.src = "./resources/light.svg";
            // change to dark mode (only for webkit)
            document.documentElement.style.colorScheme = "dark";
        }
        else {
            IMG.src = "./resources/dark.svg";
            // change to light mode (only for webkit)
            document.documentElement.style.colorScheme = "light";
        }
    });
    // add a link to the source code
    SOURCE_LINK.addEventListener("click", () => {
        window.open("https://github.com/cblos/cblos")
    });
}

window.addEventListener("load", LOAD);