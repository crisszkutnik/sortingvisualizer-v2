import { Bar, SortingMethod, Movement } from "../models"

class BubbleSort extends SortingMethod {
    sort(arr:Bar[]):[Bar[], Movement[]] {
        let n = arr.length;
        let movements:Movement[] = [];

        for(let i = 0; i < n - 1; i++) {
            for(let j = 0; j < n - i - 1; j++) {
                if(arr[j].value > arr[j + 1].value) {
                    // Push the movements for the animation
                    movements.push({
                        value1: arr[j].value,
                        center1: arr[j].center,
                        value2: arr[j + 1].value,
                        center2: arr[j + 1].center
                    });
                    [arr[j].center, arr[j + 1].center] = [arr[j + 1].center, arr[j].center];
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }

        return [arr, movements];
    }
}

let bubbleSort = new BubbleSort();

export default bubbleSort;