import bubbleSort from "./sortingMethods/bubbleSort"
import { Bar } from "./models"
import { createArray } from "./helpers"
import { drawArray } from "./canvasHelpers";
import insertionSort from "./sortingMethods/insertionSort";

let arr:Bar[] = createArray(25);
drawArray(arr);
console.log(insertionSort.sort(arr));

document.querySelector("#newArr")?.addEventListener("click", () => {
    arr = createArray(25);
    drawArray(arr);
})

document.querySelector("#sortNow")?.addEventListener("click", () => {
    arr = insertionSort.sort(arr);
    insertionSort.drawMovements();
})