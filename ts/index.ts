import bubbleSort from "./sortingMethods/bubbleSort"
import { Bar } from "./models"
import { createArray } from "./helpers"
import { drawArray } from "./canvasHelpers";
import insertionSort from "./sortingMethods/insertionSort";

let arr:Bar[] = createArray(25);
let sortingSpeed = 25;
let sortingMethod = bubbleSort;
drawArray(arr);

let selector = document.querySelector("#sortingSelect") as HTMLSelectElement;
selector?.addEventListener("change", () => {
    if(selector.value === 'bubble')
        sortingMethod = bubbleSort;
    else if(selector.value == 'insertion') {
        sortingMethod = insertionSort;
    }
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