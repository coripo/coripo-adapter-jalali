const jalaaliJs = require('jalaali-js');

const Adapter = function Adapter() {
  const name = 'dariush-alipour.onecalendar.adapter.jalali';

  const months = [
    { name: 'Farvardin', short: 'Farv' },
    { name: 'Ordibehesht', short: 'Ord' },
    { name: 'Khordad', short: 'Kho' },
    { name: 'Tir', short: 'Tir' },
    { name: 'Mordad', short: 'Mor' },
    { name: 'Shahrivar', short: 'Sha' },
    { name: 'Mehr', short: 'Mehr' },
    { name: 'Aban', short: 'Aban' },
    { name: 'Azar', short: 'Azar' },
    { name: 'Dey', short: 'Dey' },
    { name: 'Bahman', short: 'Bah' },
    { name: 'Esfand', short: 'Esf' },
  ];

  const l10n = (date) => {
    const newDate = jalaaliJs.toJalaali(date.year, date.month, date.day);
    const ldate = {
      year: newDate.jy,
      month: newDate.jm,
      day: newDate.jd,
    };
    return ldate;
  };
  const i18n = (ldate) => {
    const newDate = jalaaliJs.toGregorian(ldate.year, ldate.month, ldate.day);
    const date = {
      year: newDate.gy,
      month: newDate.gm,
      day: newDate.gd,
    };
    return date;
  };

  const getMonthName = (month, short) => {
    const mon = (months[month - 1]);
    if (typeof mon === 'undefined') {
      throw new Error('Invalid month number, number should be between 1 and 12');
    }
    return short ? mon.short : mon.name;
  };

  const getMonthLength = (year, month) => jalaaliJs.jalaaliMonthLength(year, month);

  const isValid = date => jalaaliJs.isValidJalaaliDate(date.year, date.month, date.day);

  const isLeap = year => jalaaliJs.isLeapJalaaliYear(year);

  return { name, l10n, i18n, isValid, isLeap, getMonthName, getMonthLength };
};

exports.Adapter = Adapter;
