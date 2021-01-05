import { clearHelpers } from "../dataHelpers";
import { SortingMethod, Bar, movType, Movement } from "../models";

const generateMov = (arr: Bar[], index: number): Movement => {
    return {
        center1: arr[index].center,
        value1: arr[index].value,
        center2: arr[index + 1].center,
        value2: arr[index + 1].value,
        type: movType.swap,
        reset: false,
        access: 0,
        iteration: 0,
        comp: 0
    }
}

class InsertionSort extends SortingMethod {
    sort(arr: Bar[]): Bar[] {
        clearHelpers();
        this.movements = [];
        for (let i = 1; i < arr.length; i++) {
            let j = i - 1;

            while (j >= 0 && arr[j].value > arr[j + 1].value) {
                let mov = generateMov(arr, j);
                [arr[j].center, arr[j + 1].center] = [arr[j + 1].center, arr[j].center];
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                mov.comp += 1;
                mov.access += 1 + 3; //comparison + swap access
                this.movements.push(mov);
                j--;
            }
            
            // Visual representation of last comparison. The one that ends the iteration
            let mov = generateMov(arr, j + 1);
            mov.type = movType.comparison;
            mov.comp = 1;
            mov.access = 2;
            mov.iteration = 1;
            this.movements.push(mov);
        }
        return arr;
    }
}

let insertionSort = new InsertionSort();

export default insertionSort;