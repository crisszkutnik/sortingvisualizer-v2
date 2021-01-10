import { colours } from "./helpers";
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
    ctx.fillStyle = colours.white;
    ctx.fill();
    ctx.closePath();
}

/*function drawMovement(mov:Movement, color1:string, color2:string) {
    ctx.beginPath();
    ctx.clearRect(mov.center1, 650 - mov.value1, colWidth, mov.value1);
    ctx.clearRect(mov.center2, 650 - mov.value2, colWidth, mov.value2);
    ctx.rect(mov.center2, 650 - mov.value1, colWidth, mov.value1);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(mov.center1, 650 - mov.value2, colWidth, mov.value2);
    ctx.fillStyle = color2;
    ctx.fill();
    ctx.closePath();
}

function drawMovement2(mov:Movement) {
    ctx.beginPath();
    ctx.clearRect(mov.center1, 650, colWidth, mov.value1);
    ctx.clearRect(mov.center2, 650, colWidth, mov.value2);
    ctx.rect(mov.center2, 650 - mov.value1, colWidth, mov.value1);
    ctx.rect(mov.center1, 650 - mov.value2, colWidth, mov.value2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

let movementHelpers = {
    compareMovement: (mov:Movement) => drawMovement(mov, "red", "green"),
    swapMovement: (mov:Movement) => drawMovement(mov, "green", "red"),
    drawWhite: (mov:Movement) => drawMovement(mov, "white", "white")
};*/

export {
    drawArray,
    clearCanvas,
    ctx,
    canvas,
    colWidth
}