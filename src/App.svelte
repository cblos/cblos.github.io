<script>
	import Footer from "./Footer.svelte";
	import Navbar from "./Navbar.svelte";
	const dark = localStorage.getItem("dark-mode");
    let mode = "dark";
	if (dark == null || dark == "true") { 
		mode = "dark";
	} else {
		mode = "light";
	};  
	const root = document.documentElement;
	root.classList.add(mode);
	root.style.colorScheme = mode;
</script>
<body>
    <Navbar mode="{mode}" {root} />
    <div class="main">
        <h1 id="title">CBLOS</h1>
        <h2 id="desc">A 32-bit Operating System for Legacy BIOS</h2>
        <!-- scrollable test -->
        <div style="height: 1000px;"></div>
    </div>
	<Footer />
</body>
