import bubbleSort from "./sorting/bubbleSort"
import { Bar } from "./models"
import { createArray } from "./helpers"
import { drawArray } from "./canvasHelpers";

let arr:Bar[] = createArray(25);
drawArray(arr);

document.querySelector("#newArr")?.addEventListener("click", () => {
    arr = createArray(25);
    drawArray(arr);
})