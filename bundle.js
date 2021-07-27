(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colWidth = exports.canvas = exports.ctx = exports.clearCanvas = exports.drawArray = void 0;
const helpers_1 = require("./helpers");
let colWidth = 12;
exports.colWidth = colWidth;
let canvas = document.querySelector("canvas");
exports.canvas = canvas;
let ctx = canvas.getContext("2d");
exports.ctx = ctx;
function clearCanvas() {
    ctx.clearRect(0, 0, 1400, 650);
}
exports.clearCanvas = clearCanvas;
function drawArray(arr) {
    ctx.beginPath();
    clearCanvas();
    arr.forEach(e => {
        ctx.rect(e.center, 650 - e.value, colWidth, e.value);
    });
    ctx.fillStyle = helpers_1.colours.white;
    ctx.fill();
    ctx.closePath();
}
exports.drawArray = drawArray;

},{"./helpers":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMov = exports.clearHelpers = exports.iterationHelper = exports.accessHelper = exports.compHelper = void 0;
const models_1 = require("./models");
class DataHelper {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.num = 0;
    }
    resetNumber() {
        this.num = 0;
        this.element.innerHTML = "0";
    }
    addNumber(amount) {
        this.num += amount;
        this.element.innerHTML = "" + this.num;
    }
}
let compHelper = new DataHelper("#compData");
exports.compHelper = compHelper;
let accessHelper = new DataHelper("#accessData");
exports.accessHelper = accessHelper;
let iterationHelper = new DataHelper("#iterationData");
exports.iterationHelper = iterationHelper;
const clearHelpers = () => {
    compHelper.resetNumber();
    iterationHelper.resetNumber();
    accessHelper.resetNumber();
};
exports.clearHelpers = clearHelpers;
const generateMov = (arr, index) => {
    return {
        center1: arr[index].center,
        value1: arr[index].value,
        center2: arr[index + 1].center,
        value2: arr[index + 1].value,
        type: models_1.movType.comparison,
        reset: false,
        access: 0,
        iteration: 0,
        comp: 0
    };
};
exports.generateMov = generateMov;

},{"./models":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectorManager = exports.colours = exports.createArray = void 0;
const canvasHelpers_1 = require("./canvasHelpers");
function createArray(amount) {
    let ret = [];
    // Half of canvas width
    let bias = (1400 / 2) - Math.ceil(amount / 2) * (canvasHelpers_1.colWidth + 10);
    for (let i = 0; i < amount; i++)
        ret.push({
            value: Math.floor(Math.random() * 650),
            center: bias + (canvasHelpers_1.colWidth + 10) * i
        });
    return ret;
}
exports.createArray = createArray;
let alpha = 0.85;
let colours = {
    green: `rgba(58, 194, 60, ${alpha})`,
    white: `rgba(255, 255, 255, ${alpha})`,
    red: `rgba(235, 68, 68, ${alpha})`
};
exports.colours = colours;
const selectorManager = {
    selector: document.querySelector("#sortingSelect"),
    speedSelector: document.querySelector("#speedSlider"),
    slider: document.querySelector("#arrSlider"),
    btn: document.querySelector("#sortNow"),
    enableSelectors: function () {
        this.selector.disabled = false;
        this.speedSelector.disabled = false;
        this.slider.disabled = false;
        this.btn.disabled = false;
    },
    disableSelectors: function () {
        this.selector.disabled = true;
        this.speedSelector.disabled = true;
        this.slider.disabled = true;
        this.btn.disabled = true;
    }
};
exports.selectorManager = selectorManager;

},{"./canvasHelpers":1}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bubbleSort_1 = __importDefault(require("./sortingMethods/bubbleSort"));
const helpers_1 = require("./helpers");
const canvasHelpers_1 = require("./canvasHelpers");
const insertionSort_1 = __importDefault(require("./sortingMethods/insertionSort"));
const responsive_1 = require("./responsive");
const selectionSort_1 = __importDefault(require("./sortingMethods/selectionSort"));
const cocktailSort_1 = __importDefault(require("./sortingMethods/cocktailSort"));
const dataHelpers_1 = require("./dataHelpers");
/* Canvas resize setup */
responsive_1.resizeCanvas();
/* End canvas resize */
let arr = helpers_1.createArray(25);
let sortingSpeed = 25;
let sortingMethod = bubbleSort_1.default;
canvasHelpers_1.drawArray(arr);
let selector = document.querySelector("#sortingSelect");
selector?.addEventListener("change", () => {
    switch (selector.value) {
        case "bubble":
            sortingMethod = bubbleSort_1.default;
            break;
        case "insertion":
            sortingMethod = insertionSort_1.default;
            break;
        case "selection":
            sortingMethod = selectionSort_1.default;
            break;
        case "cocktail":
            sortingMethod = cocktailSort_1.default;
            break;
    }
});
let speedSlider = document.querySelector("#speedSlider");
speedSlider.addEventListener("input", () => {
    let val = Number(speedSlider.value);
    let span = document.querySelector("#speedNumber");
    sortingSpeed = val;
    span.innerHTML = val + "ms";
});
let slider = document.querySelector("#arrSlider");
slider.addEventListener("input", () => {
    let val = Number(slider.value);
    sortingMethod.clearActions();
    arr = helpers_1.createArray(val);
    canvasHelpers_1.drawArray(arr);
    let span = document.querySelector("#arrNumber");
    span.innerHTML = "" + val;
});
document.querySelector("#newArr")?.addEventListener("click", () => {
    dataHelpers_1.clearHelpers();
    sortingMethod.clearActions();
    arr = helpers_1.createArray(Number(slider.value));
    canvasHelpers_1.drawArray(arr);
});
document.querySelector("#sortNow")?.addEventListener("click", () => {
    arr = sortingMethod.sort(arr);
    sortingMethod.drawMovements(sortingSpeed);
});

},{"./canvasHelpers":1,"./dataHelpers":2,"./helpers":3,"./responsive":6,"./sortingMethods/bubbleSort":7,"./sortingMethods/cocktailSort":8,"./sortingMethods/insertionSort":9,"./sortingMethods/selectionSort":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movType = exports.SortingMethod = void 0;
const canvasHelpers_1 = require("./canvasHelpers");
const dataHelpers_1 = require("./dataHelpers");
const helpers_1 = require("./helpers");
;
var movType;
(function (movType) {
    movType[movType["comparison"] = 0] = "comparison";
    movType[movType["swap"] = 1] = "swap";
})(movType || (movType = {}));
exports.movType = movType;
class SortingMethod {
    constructor() {
        this.movements = [];
        this.interval = 0;
    }
    clearActions() {
        this.movements = [];
        clearInterval(this.interval);
        helpers_1.selectorManager.enableSelectors();
    }
    drawMovements(speed) {
        helpers_1.selectorManager.disableSelectors();
        let arr = this.movements;
        let i = 0;
        this.movements = [];
        new Promise((resolve) => {
            this.interval = setInterval(() => {
                let colour = helpers_1.colours.white;
                let func = movType.comparison === arr[i].type ? this.drawComparison : this.drawSwap;
                if (!arr[i].reset) {
                    colour = movType.comparison === arr[i].type ? helpers_1.colours.red : helpers_1.colours.green;
                    dataHelpers_1.accessHelper.addNumber(arr[i].access);
                    dataHelpers_1.compHelper.addNumber(arr[i].comp);
                    dataHelpers_1.iterationHelper.addNumber(arr[i].iteration);
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
            }, speed);
        })
            .then(helpers_1.selectorManager.enableSelectors);
    }
    drawComparison(mov, colour) {
        canvasHelpers_1.ctx.beginPath();
        canvasHelpers_1.ctx.clearRect(mov.center1, 0, canvasHelpers_1.colWidth, 650);
        canvasHelpers_1.ctx.clearRect(mov.center2, 0, canvasHelpers_1.colWidth, 650);
        canvasHelpers_1.ctx.rect(mov.center1, 650 - mov.value1, canvasHelpers_1.colWidth, mov.value1);
        canvasHelpers_1.ctx.rect(mov.center2, 650 - mov.value2, canvasHelpers_1.colWidth, mov.value2);
        canvasHelpers_1.ctx.fillStyle = colour;
        canvasHelpers_1.ctx.fill();
        canvasHelpers_1.ctx.closePath();
    }
    drawSwap(mov, colour) {
        canvasHelpers_1.ctx.beginPath();
        canvasHelpers_1.ctx.clearRect(mov.center1, 0, canvasHelpers_1.colWidth, 650);
        canvasHelpers_1.ctx.clearRect(mov.center2, 0, canvasHelpers_1.colWidth, 650);
        canvasHelpers_1.ctx.rect(mov.center2, 650 - mov.value1, canvasHelpers_1.colWidth, mov.value1);
        canvasHelpers_1.ctx.fillStyle = colour;
        canvasHelpers_1.ctx.rect(mov.center1, 650 - mov.value2, canvasHelpers_1.colWidth, mov.value2);
        canvasHelpers_1.ctx.fill();
        canvasHelpers_1.ctx.closePath();
    }
}
exports.SortingMethod = SortingMethod;

},{"./canvasHelpers":1,"./dataHelpers":2,"./helpers":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeCanvas = void 0;
const canvasHelpers_1 = require("./canvasHelpers");
const resizeCanvas = () => {
    let w = window.screen.width;
    // If the device is small, let the canvas be almost all its width
    if (w > 1000)
        canvasHelpers_1.canvas.style.width = (w * 1400) / 1920 + 'px';
    else
        canvasHelpers_1.canvas.style.width = w * .95 + 'px';
};
exports.resizeCanvas = resizeCanvas;
window.addEventListener("resize", resizeCanvas);
/* Button on mobile set up */
const swapClass = (e, removedClass, addedClass) => {
    e.classList.remove(removedClass);
    e.classList.add(addedClass);
};
let btn = document.querySelector("i");
const setNav = () => {
    let dropdown = document.querySelector("#dropdown");
    // If used somewhere else, please make a function that does this
    if (dropdown?.classList.contains("showNav")) {
        swapClass(dropdown, "showNav", "hideNav");
        swapClass(btn, "fa-times", "fa-bars");
    }
    else {
        swapClass(dropdown, "hideNav", "showNav");
        swapClass(btn, "fa-bars", "fa-times");
    }
};
btn?.addEventListener("click", setNav);

},{"./canvasHelpers":1}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataHelpers_1 = require("../dataHelpers");
const models_1 = require("../models");
class BubbleSort extends models_1.SortingMethod {
    sort(arr) {
        dataHelpers_1.clearHelpers();
        this.movements = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                let mov = {
                    center1: arr[j + 1].center,
                    value1: arr[j + 1].value,
                    center2: arr[j].center,
                    value2: arr[j].value,
                    type: models_1.movType.comparison,
                    reset: false,
                    access: 0,
                    iteration: 0,
                    comp: 0
                };
                if (arr[j].value > arr[j + 1].value) {
                    mov.type = models_1.movType.swap;
                    [arr[j].center, arr[j + 1].center] = [arr[j + 1].center, arr[j].center];
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    mov.access += 3;
                    /*
                    Here we use an JS shortcut but the real bubble sort algorithm uses an
                    auxiliary variable, that is why I add 3
                    */
                }
                mov.comp = 1;
                mov.access += 2;
                this.movements.push(mov);
            }
            // Ended first iteration. Last movement of the array completes the iteration
            this.movements[this.movements.length - 1].iteration = 1;
        }
        return arr;
    }
}
let bubbleSort = new BubbleSort();
exports.default = bubbleSort;

},{"../dataHelpers":2,"../models":5}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataHelpers_1 = require("../dataHelpers");
const models_1 = require("../models");
class CocktailSort extends models_1.SortingMethod {
    sort(arr) {
        dataHelpers_1.clearHelpers();
        this.movements = [];
        let start = 0;
        let end = arr.length - 1;
        let swapped = true;
        while (swapped) {
            swapped = false;
            // Left to right
            for (let i = start; i < end; ++i) {
                let mov = dataHelpers_1.generateMov(arr, i);
                mov.access = 2;
                mov.comp = 1;
                if (arr[i].value > arr[i + 1].value) {
                    [arr[i].center, arr[i + 1].center] = [arr[i + 1].center, arr[i].center];
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    mov.access += 3;
                    mov.type = models_1.movType.swap;
                    swapped = true;
                }
                this.movements.push(mov);
            }
            // If no swap, break
            if (!swapped)
                break;
            swapped = false;
            --end;
            // Right to left
            for (let i = end; i >= start; --i) {
                let mov = dataHelpers_1.generateMov(arr, i);
                mov.access = 1;
                mov.comp = 1;
                if (arr[i].value > arr[i + 1].value) {
                    [arr[i].center, arr[i + 1].center] = [arr[i + 1].center, arr[i].center];
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    mov.access = 3;
                    mov.type = models_1.movType.swap;
                    swapped = true;
                }
                this.movements.push(mov);
            }
            start++;
            // End of iteration
            this.movements[this.movements.length - 1].iteration = 1;
        }
        return arr;
    }
}
let cocktailSort = new CocktailSort();
exports.default = cocktailSort;

},{"../dataHelpers":2,"../models":5}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataHelpers_1 = require("../dataHelpers");
const models_1 = require("../models");
class InsertionSort extends models_1.SortingMethod {
    sort(arr) {
        dataHelpers_1.clearHelpers();
        this.movements = [];
        for (let i = 1; i < arr.length; i++) {
            let j = i - 1;
            while (j >= 0 && arr[j].value > arr[j + 1].value) {
                let mov = dataHelpers_1.generateMov(arr, j);
                mov.type = models_1.movType.swap;
                [arr[j].center, arr[j + 1].center] = [arr[j + 1].center, arr[j].center];
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                mov.comp += 1;
                mov.access += 1 + 3; //comparison + swap access
                this.movements.push(mov);
                j--;
            }
            // Visual representation of last comparison. The one that ends the iteration
            let mov = dataHelpers_1.generateMov(arr, j + 1);
            mov.type = models_1.movType.comparison;
            mov.comp = 1;
            mov.access = 2;
            mov.iteration = 1;
            this.movements.push(mov);
        }
        return arr;
    }
}
let insertionSort = new InsertionSort();
exports.default = insertionSort;

},{"../dataHelpers":2,"../models":5}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataHelpers_1 = require("../dataHelpers");
const models_1 = require("../models");
class SelectionSort extends models_1.SortingMethod {
    sort(arr) {
        dataHelpers_1.clearHelpers();
        this.movements = [];
        let n = arr.length - 1;
        for (let i = 0; i < n; i++) {
            let index = i;
            for (let j = i + 1; j <= n; j++) {
                let mov = {
                    center1: arr[index].center,
                    value1: arr[index].value,
                    center2: arr[j].center,
                    value2: arr[j].value,
                    type: models_1.movType.comparison,
                    reset: false,
                    access: 2,
                    iteration: 0,
                    comp: 1,
                };
                if (arr[j].value < arr[index].value)
                    index = j;
                this.movements.push(mov);
            }
            if (index !== i) {
                let mov = {
                    center1: arr[i].center,
                    value1: arr[i].value,
                    center2: arr[index].center,
                    value2: arr[index].value,
                    type: models_1.movType.swap,
                    reset: false,
                    access: 3,
                    iteration: 0,
                    comp: 0
                };
                [arr[i].center, arr[index].center] = [arr[index].center, arr[i].center];
                [arr[i], arr[index]] = [arr[index], arr[i]];
                this.movements.push(mov);
            }
            // End of whole iteration
            this.movements[this.movements.length - 1].iteration = 1;
        }
        return arr;
    }
}
let selectionSort = new SelectionSort();
exports.default = selectionSort;

},{"../dataHelpers":2,"../models":5}]},{},[4]);
