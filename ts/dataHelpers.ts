import { Bar, movType, Movement } from "./models";

class DataHelper {
	private element;
	private num;

	constructor(selector:string) {
		this.element = document.querySelector(selector) as HTMLElement;
		this.num = 0;
	}

	resetNumber() {
		this.num = 0;
		this.element.innerHTML = "0";
	}

	addNumber(amount:number) {
		this.num += amount;
		this.element.innerHTML = "" + this.num; 
	}
}

let compHelper = new DataHelper("#compData");
let accessHelper = new DataHelper("#accessData");
let iterationHelper = new DataHelper("#iterationData");
const clearHelpers = () => {
	compHelper.resetNumber();
	iterationHelper.resetNumber();
	accessHelper.resetNumber();
}

const generateMov = (arr: Bar[], index: number): Movement => {
    return {
        center1: arr[index].center,
        value1: arr[index].value,
        center2: arr[index + 1].center,
        value2: arr[index + 1].value,
        type: movType.comparison,
        reset: false,
        access: 0,
        iteration: 0,
        comp: 0
    }
}

export {
	compHelper,
	accessHelper,
	iterationHelper,
	clearHelpers,
	generateMov
}
