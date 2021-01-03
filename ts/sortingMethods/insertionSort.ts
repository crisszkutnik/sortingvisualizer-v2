import { SortingMethod, Bar, movType, Movement } from "../models";

const generateMov = (arr: Bar[], index: number): Movement => {
    return {
        center1: arr[index].center,
        value1: arr[index].value,
        center2: arr[index + 1].center,
        value2: arr[index + 1].value,
        type: movType.swap,
        reset: false
    }
}

class InsertionSort extends SortingMethod {
    sort(arr: Bar[]): Bar[] {
        for (let i = 1; i < arr.length; i++) {
            let j = i - 1;

            while (j >= 0 && arr[j].value > arr[j + 1].value) {
                let mov = generateMov(arr, j);
                [arr[j].center, arr[j + 1].center] = [arr[j + 1].center, arr[j].center];
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                this.movements.push(mov);
                j--;
            }
            let mov = generateMov(arr, j);
            mov.type = movType.comparison;
            this.movements.push(mov);
        }
        return arr;
    }
}

let insertionSort = new InsertionSort();

export default insertionSort;