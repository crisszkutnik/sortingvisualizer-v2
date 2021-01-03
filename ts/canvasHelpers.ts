import { couldStartTrivia } from "typescript";
import { Bar } from "./models"

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

export {
    drawArray,
    clearCanvas,
    ctx,
    colWidth
}