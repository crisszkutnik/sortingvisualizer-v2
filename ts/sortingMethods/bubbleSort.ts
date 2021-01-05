import { clearHelpers } from "../dataHelpers";
import { Bar, SortingMethod, movType, Movement } from "../models"

class BubbleSort extends SortingMethod {
    sort(arr: Bar[]): Bar[] {
        clearHelpers();
        this.movements = [];
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                let mov:Movement = {
                    center1: arr[j + 1].center,
                    value1: arr[j + 1].value,
                    center2: arr[j].center,
                    value2: arr[j].value,
                    type: movType.comparison,
                    reset: false,
                    access: 0,
                    iteration: 0,
                    comp: 0
                }

                if (arr[j].value > arr[j + 1].value) {
                    mov.type = movType.swap;
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

export default bubbleSort;