class Day {
    constructor(num, IsEmpty = false) {
        this.element = document.createElement("div");
        this.element.innerText = num;
        this.element.className = IsEmpty? "emptyDay": "day";
    }
    toHTML() {
        return this.element;
    }
}

const range = (start, stop, step = 1) => 
  Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);

class Month {
    constructor(start=0, numDays = 31, prevMonth = 31) {
        this.numDays = numDays;
        this.emptydays =  range(prevMonth - start +1, prevMonth + 1).map(i => new Day(i, true))
        this.days = range(1, numDays + 1).map(x => new Day(x));
        this.element = document.createElement("div");
        this.element.className = "month";
        for (const x of this.emptydays) {
            this.element.append(x.toHTML());
        }
        for (const x of this.days) {
            this.element.append(x.toHTML());
        }
    }
    toHTML() {
        return this.element;
    }
}
const currentYear = new Date().getFullYear(); 

const janFirst1980 = new Date(currentYear, 0, 1); // Month is 0-indexed (0 = January)
const dayOfWeek = janFirst1980.getDay()


const January = new Month(new Date(currentYear, 0, 1).getDay());
const February = new Month(new Date(currentYear, 1, 1).getDay(), numDays=28);
const March = new Month(new Date(currentYear, 2, 1).getDay());
const April = new Month(new Date(currentYear, 3, 1).getDay(),numDays=30);
const May = new Month(new Date(currentYear, 4, 1).getDay());
const June = new Month(new Date(currentYear, 5, 1).getDay(), numDays=30);
const July = new Month(new Date(currentYear, 6, 1).getDay());
const August = new Month(new Date(currentYear, 7, 1).getDay());      
const September = new Month(new Date(currentYear, 8, 1).getDay(), numDays=30); 
const October = new Month(new Date(currentYear, 9, 1).getDay());
const November = new Month(new Date(currentYear, 10, 1).getDay(), numDays=30);
const December = new Month(new Date(currentYear, 11, 1).getDay());


const Months = {
    January, February, March, April, May, June,
    July, August, September, October, November, December
};

const root = document.getElementById("root");
const selected = document.getElementById("selectedMonth");


function updateCalendar() {
    const currentMonthInstance = Months[selected.value];
    if (currentMonthInstance) {
        
        root.replaceChildren(currentMonthInstance.toHTML());
    }
}


selected.addEventListener("change", updateCalendar);
updateCalendar();
