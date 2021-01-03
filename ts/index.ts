import bubbleSort from "./sortingMethods/bubbleSort"
import { Bar } from "./models"
import { createArray } from "./helpers"
import { drawArray } from "./canvasHelpers";
import insertionSort from "./sortingMethods/insertionSort";

let arr:Bar[] = createArray(25);
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

document.querySelector("#newArr")?.addEventListener("click", () => {
    sortingMethod.clearActions();
    arr = createArray(25);
    drawArray(arr);
})

document.querySelector("#sortNow")?.addEventListener("click", () => {
    selector.disabled = true;
    arr = sortingMethod.sort(arr);
    sortingMethod.drawMovements();
})