import bubbleSort from "./sortingMethods/bubbleSort"
import { Bar } from "./models"
import { createArray } from "./helpers"
import { drawArray } from "./canvasHelpers";
import insertionSort from "./sortingMethods/insertionSort";
import { resizeCanvas } from "./responsive";
import selectionSort from "./sortingMethods/selectionSort";
import { clearHelpers } from "./dataHelpers";

/* Canvas resize setup */

resizeCanvas();

/* End canvas resize */

let arr:Bar[] = createArray(25);
let sortingSpeed = 25;
let sortingMethod = bubbleSort;
drawArray(arr);

let selector = document.querySelector("#sortingSelect") as HTMLSelectElement;
selector?.addEventListener("change", () => {
    if(selector.value === 'bubble')
        sortingMethod = bubbleSort;
    else if(selector.value === 'insertion')
        sortingMethod = insertionSort;
    else if(selector.value === "selection")
        sortingMethod = selectionSort;
})

let speedSlider = document.querySelector("#speedSlider") as HTMLInputElement;
speedSlider.addEventListener("input", () => {
    let val = Number(speedSlider.value);
    let span = document.querySelector("#speedNumber") as HTMLElement;
    sortingSpeed = val;
    span.innerHTML = val + "ms";
})


let slider = document.querySelector("#arrSlider") as HTMLInputElement;
slider.addEventListener("input", () => {
    let val = Number(slider.value);
    sortingMethod.clearActions();
    arr = createArray(val);
    drawArray(arr);
    let span = document.querySelector("#arrNumber") as HTMLElement;
    span.innerHTML = "" + val;
})

document.querySelector("#newArr")?.addEventListener("click", () => {
    clearHelpers();
    sortingMethod.clearActions();
    arr = createArray(Number(slider.value));
    drawArray(arr);
})

document.querySelector("#sortNow")?.addEventListener("click", () => {
    selector.disabled = true;
    speedSlider.disabled = true;
    arr = sortingMethod.sort(arr);
    sortingMethod.drawMovements(sortingSpeed);
})