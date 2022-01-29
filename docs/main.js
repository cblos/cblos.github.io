const LOAD = () => 
{
    console.log("Page loaded.\nScripts can run now.");
    const COLOR_SWITCH = document.querySelector(".color-switch");
    const BODY = document.body || document.querySelector("body");
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
        if (BODY.classList.contains("dark-mode"))
            IMG.src = "./resources/light.svg";
        else
            IMG.src = "./resources/dark.svg";
    });
}

window.addEventListener("load", LOAD);