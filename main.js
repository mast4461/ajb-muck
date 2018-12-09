function gebid(id) {
	return document.getElementById(id);
}

function round(number, decimalsCount) {
	const f = Math.pow(10, decimalsCount);
	return Math.round(number*f)/f;
}

function hourDiffString(date1, date2) {
	return formatDuration(date2 - date1);
}

function dayDiff(date1, date2) {
	return (date2 - date1) / (3600000 * 24);
}

function millisToNextSecond() {
	return 1000 - Date.now() % 1000;
}

function formatDuration(millis) {
	// From https://stackoverflow.com/a/6313008 with modifications
	var sec_num = millis / 1000;
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return hours+':'+minutes+':'+seconds;
}

function dateRange(dateString1, dateString2) {
	// Quite inaccurate, but should be good enough for this scenario...
	const date1 = new Date(dateString1);
	const date2 = new Date(dateString2);
	const dayCount = dayDiff(date1, date2);

	const dates = [date1];

	for(let i = 1; i < dayCount; i++) {
		const date = new Date(date1.getTime() + i * 24 * 3600 * 1000);
		dates.push(date);
	}

	dates.push(date2);

	return dates;
}



// Comparse two dates. Returns true if date1 is before date2.
function isBefore(date1, date2) {
  return date1 - date2 < 0;
}

let elDaysToLeave = gebid('days-to-leave');
let elHoursToLeave = gebid('hours-to-leave');
let elFieldDaysToLeave = gebid('field-days-to-leave');
let elServiceDaysToLeave = gebid('service-days-to-leave');

let elDaysToMuck = gebid('days-to-muck');
let elHoursToMuck = gebid('hours-to-muck');
let elFieldDaysToMuck = gebid('field-days-to-muck');
let elServiceDaysToMuck = gebid('service-days-to-muck');

let muckTime = new Date('2019-05-03T13:00');

let leaveStarts = [
	'2018-12-05T12:45',
	'2018-12-19T12:45',
	'2019-01-17T12:45',
	'2019-01-30T12:45',
	'2019-02-13T12:45',
	'2019-02-28T12:45',
	'2019-03-08T18:00',
	'2019-03-27T18:00',
	'2019-04-17T18:00',
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

const serviceDays = [
	...dateRange('2018-11-26', '2018-12-05'),
	...dateRange('2018-12-10', '2018-12-19'),
	...dateRange('2019-01-07', '2019-01-17'),
	...dateRange('2019-01-21', '2019-01-30'),
	...dateRange('2019-02-04', '2019-02-13'),
	...dateRange('2019-02-18', '2019-02-22'),
	...dateRange('2019-02-25', '2019-03-01'),
	...dateRange('2019-03-04', '2019-03-08'),
	...dateRange('2019-03-15', '2019-03-27'),
	...dateRange('2019-04-04', '2019-04-17'),
	...dateRange('2019-04-24', '2019-05-03'),
];


function tick() {
	const now = new Date();

	let nextLeaveStart = leaveStarts.find(d => isBefore(now, d));

	const fieldDaysToLeave = fieldDays.filter(d =>
		isBefore(now, d) && isBefore(d, nextLeaveStart)
	).length

	const serviceDaysToLeave = serviceDays.filter(d =>
		isBefore(now, d) && isBefore(d, nextLeaveStart)
	).length

	const fieldDaysToMuck = fieldDays.filter(d =>
		isBefore(now, d) && isBefore(d, muckTime)
	).length

	const serviceDaysToMuck = serviceDays.filter(d =>
		isBefore(now, d) && isBefore(d, muckTime)
	).length

	elDaysToLeave.innerText = Math.ceil(dayDiff(now, nextLeaveStart))
	elHoursToLeave.innerText = hourDiffString(now, nextLeaveStart);
	elFieldDaysToLeave.innerText = fieldDaysToLeave;
	elServiceDaysToLeave.innerText = serviceDaysToLeave;
  
	elDaysToMuck.innerText = Math.ceil(dayDiff(now, muckTime));
	elHoursToMuck.innerText = hourDiffString(now, muckTime);
	elFieldDaysToMuck.innerText = fieldDaysToMuck;
	elServiceDaysToMuck.innerText = serviceDaysToMuck;

	setTimeout(tick, millisToNextSecond());
}

tick();
