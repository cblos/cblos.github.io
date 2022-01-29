const LOAD = () => 
{
    console.log("Page loaded.\nScripts can run now.");
    const COLOR_SWITCH = document.querySelector(".color-switch");
    const BODY = document.body || document.querySelector("body");
    COLOR_SWITCH.addEventListener("click", () => {
        BODY.classList.toggle("dark-mode");
        const IMG = BODY.querySelector("img");
        if (BODY.classList.contains("dark-mode"))
            IMG.src = "./resources/light.svg";
        else
            IMG.src = "./resources/dark.svg";
    });
}
window.addEventListener("load", LOAD);