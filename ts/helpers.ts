import { colWidth } from "./canvasHelpers";
import { Bar } from "./models"

function createArray(amount:number):Bar[] {
    let ret = [];

    // Half of canvas width
    let bias = (1400 / 2) - Math.ceil(amount / 2) * 15;

    for(let i = 0; i < amount; i++)
        ret.push(
            {
                value: Math.floor(Math.random() * 650),
                center: bias + (colWidth + 10) * i
            }
        )

    return ret;
}

export {
    createArray
};