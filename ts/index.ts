import bubbleSort from "./sortingMethods/bubbleSort"
import { Bar } from "./models"
import { createArray } from "./helpers"
import { drawArray } from "./canvasHelpers";

let arr:Bar[] = createArray(25);
drawArray(arr);

document.querySelector("#newArr")?.addEventListener("click", () => {
    arr = createArray(25);
    drawArray(arr);
})

document.querySelector("#sortNow")?.addEventListener("click", () => {
    arr = bubbleSort.sort(arr);
    bubbleSort.drawMovements();
})