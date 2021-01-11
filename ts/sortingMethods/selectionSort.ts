import { clearHelpers } from "../dataHelpers";
import { Bar, movType, SortingMethod, Movement } from "../models";

class SelectionSort extends SortingMethod {
	sort(arr: Bar[]): Bar[] {
		clearHelpers();
		this.movements = [];
		let n = arr.length - 1;

		for (let i = 0; i < n; i++) {
			let index = i;
			for (let j = i + 1; j <= n; j++) {
				let mov: Movement = {
					center1: arr[index].center,
					value1: arr[index].value,
					center2: arr[j].center,
					value2: arr[j].value,
					type: movType.comparison,
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
				let mov: Movement = {
					center1: arr[i].center,
					value1: arr[i].value,
					center2: arr[index].center,
					value2: arr[index].value,
					type: movType.swap,
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
			this.movements[this.movements.length - 1].iteration = 1
		}
		return arr;
	}
}

let selectionSort = new SelectionSort();

export default selectionSort;
