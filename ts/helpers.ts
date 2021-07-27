import { colWidth } from "./canvasHelpers";
import { Bar } from "./models"

function createArray(amount:number):Bar[] {
    let ret = [];

    // Half of canvas width
    let bias = (1400 / 2) - Math.ceil(amount / 2) * (colWidth + 10);

    for(let i = 0; i < amount; i++)
        ret.push(
            {
                value: Math.floor(Math.random() * 650),
                center: bias + (colWidth + 10) * i
            }
        )

    return ret;
}

let alpha = 0.85;

let colours = {
    green: `rgba(58, 194, 60, ${alpha})`,
    white: `rgba(255, 255, 255, ${alpha})`,
    red:`rgba(235, 68, 68, ${alpha})`
}

const selectorManager = {
    selector: document.querySelector("#sortingSelect") as HTMLSelectElement,
    speedSelector: document.querySelector("#speedSlider") as HTMLInputElement,
    slider: document.querySelector("#arrSlider") as HTMLInputElement,
    btn: document.querySelector("#sortNow") as HTMLInputElement,
    enableSelectors: function() {
        this.selector.disabled = false;
        this.speedSelector.disabled = false;
        this.slider.disabled = false;
        this.btn.disabled = false;
    },
    disableSelectors: function() {
        this.selector.disabled = true;
        this.speedSelector.disabled = true;
        this.slider.disabled = true;
        this.btn.disabled = true;
    }
}

export {
    createArray,
    colours,
    selectorManager
};