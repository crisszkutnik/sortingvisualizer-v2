import { Bar, SortingMethod } from "../models"

class BubbleSort extends SortingMethod {
    sort(arr:Bar[]):Bar[] {
        let n = arr.length;

        for(let i = 0; i < n - 1; i++) {
            for(let j = 0; j < n - i - 1; j++) {
                if(arr[j].value > arr[j + 1].value)
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }

        return arr;
    }
}

let bubbleSort = new BubbleSort();

export default bubbleSort;