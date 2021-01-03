import { ctx, colWidth } from "./canvasHelpers";

interface Bar {
    value: number;
    center: number;
};

enum movType {
    comparison,
    swap
}

interface Movement {
    center1: number, // Movement coords
    value1: number,
    center2: number,
    value2: number,
    type: movType, // Swap movement or comparison movement
    reset: boolean // Movement has been resetted
}

abstract class SortingMethod {
    movements: Movement[] = [];

    abstract sort(arr: Bar[]): Bar[];

    drawMovements() {
        let arr = this.movements;
        let i = 0;

        let int = setInterval(() => {
            let colour = "white";
            let func = movType.comparison === arr[i].type ? this.drawComparison : this.drawSwap;

            if(!arr[i].reset) {
                colour = movType.comparison === arr[i].type ? "red" : "green";
            }

            func(arr[i], colour);

            if(!arr[i].reset)
                arr[i].reset = true;
            else
                i++;

            if(i === arr.length)
                clearInterval(int);

        }, 25);
        this.movements = [];
    }

    drawComparison(mov:Movement, colour:string) {
        ctx.beginPath();
        ctx.rect(mov.center1, 650 - mov.value1, colWidth, mov.value1);
        ctx.rect(mov.center2, 650 - mov.value2, colWidth, mov.value2);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.closePath();
    }

    drawSwap(mov: Movement, colour:string) {
        ctx.beginPath();
        ctx.clearRect(mov.center1, 650 - mov.value1, colWidth, mov.value1);
        ctx.clearRect(mov.center2, 650 - mov.value2, colWidth, mov.value2);
        ctx.rect(mov.center2, 650 - mov.value1, colWidth, mov.value1);
        ctx.fillStyle = colour;
        ctx.rect(mov.center1, 650 - mov.value2, colWidth, mov.value2);
        ctx.fill();
        ctx.closePath();
    }
}

export {
    Bar,
    SortingMethod,
    Movement,
    movType
};