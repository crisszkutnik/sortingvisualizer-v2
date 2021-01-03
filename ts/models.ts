import { colWidth, ctx } from "./canvasHelpers";

interface Bar {
    value: number;
    center: number;
};

interface Movement {
    value1: number;
    center1: number;
    value2: number;
    center2: number;
}

abstract class SortingMethod {
    abstract sort(arr:Bar[]):[Bar[], Movement[]];

    visualCompareOn(e1:Bar, e2:Bar) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(e1.center, 650 - e1.value, colWidth, e1.value);
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(e2.center, 650 - e2.value, colWidth, e2.value);
        ctx.closePath();
    }
}

export {
    Bar,
    SortingMethod,
    Movement
};