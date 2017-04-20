var jalaaliJs = require('jalaali-js');

var months = [
	{name: "Farvardin", short: "Farv"},
	{name: "Ordibehesht", short: "Ord"},
	{name: "Khordad", short: "Kho"},
	{name: "Tir", short: "Tir"},
	{name: "Mordad", short: "Mor"},
	{name: "Shahrivar", short: "Sha"},
	{name: "Mehr", short: "Mehr"},
	{name: "Aban", short: "Aban"},
	{name: "Azar", short: "Azar"},
	{name: "Dey", short: "Dey"},
	{name: "Bahman", short: "Bah"},
	{name: "Esfand", short: "Esf"}
]

exports.l10n = function(date) {
	var newDate = jalaaliJs.toJalaali(date.year, date.month, date.day);
	var ldate = {
		year: newDate.jy,
		month: newDate.jm,
		day: newDate.jd
	};
	return ldate;
}

exports.i18n = function(ldate) {
	var newDate = jalaaliJs.toGregorian(ldate.year, ldate.month, ldate.day);
	var date = {
		year: newDate.gy,
		month: newDate.gm,
		day: newDate.gd
	};
	return date;
}

exports.isValid = function(date) {
	return jalaaliJs.isValidJalaaliDate(date.year, date.month, date.day);
}

exports.isLeap = function(year) {
	return jalaaliJs.isLeapJalaaliYear(year);
}

exports.getMonthName = function(month, short) {
	var mon = (months[month-1]);
	if(typeof mon === "undefined") {
		throw new Error("Invalid month number, number should be between 1 and 12");
	}
	return short?mon.short:mon.name;
}

exports.getMonthLength = function(year, month) {
	return jalaaliJs.jalaaliMonthLength(year, month);
}
