<script>
import Light from "../public/resources/light.svg";
import Dark from "../public/resources/dark.svg";

export let mode = "dark";
export let root = document.documentElement;

let img_src = Dark;
let link_class = "";

const sources = [
	{ href: "./docs/docs-landing.html",       value: "Docs", 'same-tab': true },
	{ href: "https://github.com/cblos/cblos", value: "Source" },
	{ href: "https://github.com/cblos",       value: "Contribute" },
	{ href: "https://discord.gg/UChn7QNMqY",  value: "Community" },
];

const toggle_menu = () => {
    if (link_class == "show-menu") 
        link_class = "";
    else 
        link_class = "show-menu";
};

const page_load = () => 
{
    if (mode !== "dark") img_src = Dark;
    else                 img_src = Light;
    
    const nav_bar         = document.querySelector(".navbar");

    const color_switchers     = document.querySelectorAll(".color-switch");
    const color_switch_top    = color_switchers[0];
    const color_switch_bottom = color_switchers[1];
    const menu = document.querySelector(".tb-menu");
    // switch color on click, and add an animation
    const color_switcher = function() {
        // change to dark mode
        root.classList.toggle("dark");
        // spin-animate the color-switcher
        // https://stackoverflow.com/a/58353279 <- explains whatever hack this is 
        this.classList.remove("rotate-animation");
        void color_switch_top.offsetWidth; // this hack
        this.classList.add("rotate-animation");
        // change the image
        if (root.classList.contains("dark")) {
            localStorage.setItem("dark-mode", "true");
            img_src = Light;
            // change to dark mode (only for webkit)
            root.style.colorScheme = "dark";
        } else {
            localStorage.setItem("dark-mode", "false");
            img_src = Dark;
            // change to light mode (only for webkit)
            root.style.colorScheme = "light";
        }
    };
    color_switchers.forEach(c => 
        c.addEventListener("click", color_switcher.bind(c))
    );

    menu.addEventListener("click", toggle_menu);

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
            link_class = "";
    });

    let prev_scroll = window.scrollY;
    const window_scroll = () => {
        const nav_bar_height = parseFloat(window.getComputedStyle(nav_bar).height);
        const window_scroll = window.scrollY;
        const offset = window_scroll - prev_scroll;
        if (window_scroll > nav_bar_height) {
            if (offset < 0) {
                // unhide when scrolling up
                nav_bar.classList.remove('tb-hide');
                color_switch_bottom.classList.add("hide");
            } else {
                // hide when scrolling down
                nav_bar.classList.add('tb-hide');
                // disable all links
                link_class = "";
                color_switch_bottom.classList.remove("hide");
            }
        }
        prev_scroll = window_scroll;
    };
    window_scroll();
    window.addEventListener('scroll', window_scroll);
}

window.addEventListener("load", page_load);
</script>
<div class="navbar">
    <a class="name tb-click" href="https://cblos.github.io">
        <img class="mascot" src="./resources/mascot.webp" alt="mascot">&nbsp;CBL&nbsp;<img class="mascot" src="./resources/mascot.webp" alt="mascot">S
    </a>
    <div class="links">
        <button class="tb-menu">
            <img src="./resources/menu.svg" alt="menu"/>
        </button>
        {#each sources as src}
            <a  class="tb-click {link_class}" 
                href="{src.href}" 
                on:click="{toggle_menu}"
                target="{src["same-tab"] ? "" : "_blank"}"
            >{src.value}</a>
        {/each}
    </div>
    <button class="color-switch" aria-label="color scheme switcher">
        <img src="{img_src}" alt="color scheme switcher"/>
    </button>
    <button class="color-switch down hide" aria-label="color scheme switcher">
        <img src="{img_src}" alt="color scheme switcher"/>
    </button>
</div>