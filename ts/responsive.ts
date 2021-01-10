import { canvas } from "./canvasHelpers"

const resizeCanvas = () => {
	let w = window.screen.width;

	canvas.style.width = (w * 1400) / 1920 + 'px';
}

window.addEventListener("resize", resizeCanvas);

/* Button on mobile set up */

const swapClass = (e:HTMLElement, removedClass:string, addedClass:string) => {
	e.classList.remove(removedClass);
	e.classList.add(addedClass);
}

let btn = document.querySelector("i") as HTMLElement;
const setNav = () => {
	let dropdown = document.querySelector("#dropdown") as HTMLElement;

	// If used somewhere else, please make a function that does this

	if(dropdown?.classList.contains("showNav")) {
		swapClass(dropdown, "showNav", "hideNav");
		swapClass(btn, "fa-times", "fa-bars");
	} else {
		swapClass(dropdown, "hideNav", "showNav");
		swapClass(btn, "fa-bars", "fa-times");
	}
}
btn?.addEventListener("click", setNav);

export {
	resizeCanvas
}