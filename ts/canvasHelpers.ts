import { Bar, Movement } from "./models"

let colWidth = 12;
let canvas = document.querySelector("canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function clearCanvas() {
    ctx.clearRect(0, 0, 1400, 650);
}

function drawArray(arr:Bar[]) {
    ctx.beginPath();
    clearCanvas();
    arr.forEach(e => {
        ctx.rect(e.center, 650 - e.value, colWidth, e.value);
    })
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawMovement(mov:Movement) {
    ctx.beginPath();
    ctx.clearRect(mov.center1, 650 - mov.value1, colWidth, mov.value1);
    ctx.clearRect(mov.center2, 650 - mov.value2, colWidth, mov.value2);
    ctx.rect(mov.center2, 650 - mov.value1, colWidth, mov.value1);
    ctx.rect(mov.center1, 650 - mov.value2, colWidth, mov.value2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

export {
    drawArray,
    clearCanvas,
    drawMovement,
    ctx,
    colWidth
}