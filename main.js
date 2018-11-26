function gebid(id) {
	return document.getElementById(id);
}

function round(number, decimalsCount) {
	// return number;
	const f = Math.pow(10, decimalsCount);
	return Math.round(number*f)/f;
}

function hourDiff(date1, date2) {
	return (date2 - date1)/3600000;
}

function dayDiff(date1, date2) {
	return (date2 - date1)/(3600000*24);
}

let elDaysToLeave = gebid('days-to-leave');
let elHoursToLeave = gebid('hours-to-leave');
let elFieldDaysToLeave = gebid('field-days-to-leave');
let elDaysToMuck = gebid('days-to-muck');
let elHoursToMuck = gebid('hours-to-muck');
let elFieldDaysToMuck = gebid('field-days-to-muck');


let muckTime = new Date('2019-05-03 13:00');

let leaveStarts = [
	'2018-12-05 12:45',
	'2018-12-20 12:45',
	'2019-01-17 12:45',
	'2019-01-30 12:45',
	'2019-02-13 12:45',
	'2019-02-28 12:45',
	'2019-03-08 18:00',
	'2019-03-27 18:00',
	'2019-04-17 18:00',
].map(s => new Date(s));

let fieldDays = [
	'2018-12-14',
	'2018-12-15',
	'2018-12-16',
	'2018-12-17',
	'2019-01-09',
	'2019-01-15',
	'2019-01-23',
	'2019-01-28',
	'2019-02-04',
	'2019-02-07',
	'2019-02-08',
	'2019-02-09',
	'2019-02-10',
	'2019-02-11',
	'2019-02-20',
	'2019-02-25',
	'2019-03-16',
	'2019-03-17',
	'2019-03-18',
	'2019-03-19',
	'2019-03-20',
	'2019-03-21',
	'2019-03-22',
	'2019-03-23',
	'2019-03-24',
].map(s => new Date(s));


function tick() {
	const now = new Date();

	let nextLeaveStart = leaveStarts.find(d => d - now > 0);

	const fieldDaysToLeave = fieldDays.filter(d => {
		return d - now > 0 && d - nextLeaveStart < 0
	}).length

	const fieldDaysToMuck = fieldDays.filter(d => {
		return d - now > 0 && d - muckTime < 0
	}).length

	elDaysToMuck.innerText = Math.ceil(dayDiff(now, muckTime));
	elHoursToMuck.innerText = round(hourDiff(now, muckTime), 4);
	elFieldDaysToMuck.innerText = fieldDaysToMuck;

	elDaysToLeave.innerText = Math.ceil(dayDiff(now, nextLeaveStart))
	elHoursToLeave.innerText = round(hourDiff(now, nextLeaveStart), 4);
	elFieldDaysToLeave.innerText = fieldDaysToLeave;
}

setInterval(tick, 500);