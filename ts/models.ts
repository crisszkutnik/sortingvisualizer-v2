import { ctx, colWidth } from "./canvasHelpers";
import { colours } from "./helpers";

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
    interval: number = 0;

    abstract sort(arr: Bar[]): Bar[];

    enableSelector() {
        let selector = document.querySelector("#sortingSelect") as HTMLSelectElement;
        selector.disabled = false;
    }

    clearActions() {
        this.movements = [];
        clearInterval(this.interval);
        this.enableSelector();
    }

    drawMovements() {
        let arr = this.movements;
        let i = 0;
        this.movements = [];

        new Promise<void>((resolve) => {
            this.interval = setInterval(() => {
                let colour = colours.white;
                let func = movType.comparison === arr[i].type ? this.drawComparison : this.drawSwap;

                if (!arr[i].reset) {
                    colour = movType.comparison === arr[i].type ? colours.red : colours.green;
                }

                func(arr[i], colour);

                if (!arr[i].reset)
                    arr[i].reset = true;
                else
                    i++;

                if (i === arr.length) {
                    clearInterval(this.interval);
                    resolve();
                }

            }, 25)
        })
        .then(this.enableSelector)
    }

    private drawComparison(mov: Movement, colour: string) {
        ctx.beginPath();
        ctx.clearRect(mov.center1, 0, colWidth, 650);
        ctx.clearRect(mov.center2, 0, colWidth, 650);
        ctx.rect(mov.center1, 650 - mov.value1, colWidth, mov.value1);
        ctx.rect(mov.center2, 650 - mov.value2, colWidth, mov.value2);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.closePath();
    }

    private drawSwap(mov: Movement, colour: string) {
        ctx.beginPath();
        ctx.clearRect(mov.center1, 0, colWidth, 650);
        ctx.clearRect(mov.center2, 0, colWidth, 650);
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