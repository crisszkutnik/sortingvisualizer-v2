import bubbleSort from "./sortingMethods/bubbleSort"
import { Bar, Movement } from "./models"
import { createArray } from "./helpers"
import { drawArray, drawMovement } from "./canvasHelpers";

let movements:Movement[] = [];
let arr:Bar[] = createArray(25);
drawArray(arr);
[arr, movements] = bubbleSort.sort(arr);
console.log(movements);

let i = 0;

setInterval(() => {
    drawMovement(movements[i]);
    i++;
}, 500);

document.querySelector("#newArr")?.addEventListener("click", () => {
    arr = createArray(25);
    drawArray(arr);
})