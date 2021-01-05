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

export {
	compHelper,
	accessHelper,
	iterationHelper,
	clearHelpers
}