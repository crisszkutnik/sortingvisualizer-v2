import { Bar, SortingMethod, movType } from "../models"

class BubbleSort extends SortingMethod {
    sort(arr: Bar[]): Bar[] {
        this.movements = [];
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                let mov = {
                    center1: arr[j + 1].center,
                    value1: arr[j + 1].value,
                    center2: arr[j].center,
                    value2: arr[j].value,
                    type: movType.comparison,
                    reset: false
                }

                if (arr[j].value > arr[j + 1].value) {
                    mov.type = movType.swap;
                    [arr[j].center, arr[j + 1].center] = [arr[j + 1].center, arr[j].center];
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
                
                this.movements.push(mov);
            }
        }

        return arr;
    }
}

let bubbleSort = new BubbleSort();

export default bubbleSort;