import { clearHelpers, generateMov } from "../dataHelpers";
import { SortingMethod, Bar, movType } from "../models";

class CocktailSort extends SortingMethod {
    sort(arr:Bar[]): Bar[] {
        clearHelpers();
        this.movements = [];
        let start = 0;
        let end = arr.length - 1;

        let swapped = true;
        while(swapped) {
            swapped = false;

            // Left to right
            for(let i = start; i < end; ++i) {
               let mov = generateMov(arr, i);
               mov.access = 2;
               mov.comp = 1;

               if(arr[i].value > arr[i + 1].value) {
                   [arr[i].center, arr[i + 1].center] = [arr[i + 1].center, arr[i].center];
                   [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                   mov.access += 3;
                   mov.type = movType.swap;
                   swapped = true;
               }
               this.movements.push(mov);
            }

            // If no swap, break
            if(!swapped)
                break;

            swapped = false;
            --end;

            // Right to left
            for(let i = end; i >= start; --i) {
                let mov = generateMov(arr, i);
                mov.access = 1;
                mov.comp = 1;

                if(arr[i].value > arr[i + 1].value) {
                    [arr[i].center, arr[i + 1].center] = [arr[i + 1].center, arr[i].center];
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    mov.access = 3;
                    mov.type = movType.swap;
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

export default cocktailSort;
