const jalaaliJs = require('jalaali-js');

const Adapter = function Adapter() {
  const id = 'coripo.coripo.adapter.jalali';
  const name = 'Jalali';
  const description = 'The Jalali calendar is a solar calendar that was used in Persia, variants of which today are still in use in Iran as well as Afghanistan.';

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

  const offsetYear = (date, offset) => ({
    year: date.year + offset,
    month: date.month,
    day: date.day,
  });

  const offsetMonth = (date, offset) => {
    /*
      this method is not 100% accurate enough.
      developer should write a custom month traversing function for the adapter
    */
    const i18nDate = i18n({ year: date.year, month: date.month, day: date.day });
    const jsDate = new Date(`${i18nDate.year}-${i18nDate.month}-${i18nDate.day}`);
    jsDate.setMonth(jsDate.getMonth() + offset);
    return l10n({
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      day: jsDate.getDate(),
    });
  };

  const offsetDay = (date, offset) => {
    /*
      this method is not 100% accurate enough.
      developer should write a custom day traversing function for the adapter
    */
    const i18nDate = i18n({ year: date.year, month: date.month, day: date.day });
    const jsDate = new Date(`${i18nDate.year}-${i18nDate.month}-${i18nDate.day}`);
    jsDate.setDate(jsDate.getDate() + offset);
    return l10n({
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      day: jsDate.getDate(),
    });
  };

  return {
    id,
    name,
    description,
    l10n,
    i18n,
    isValid,
    isLeap,
    getMonthName,
    getMonthLength,
    offsetYear,
    offsetMonth,
    offsetDay,
  };
};

exports.Adapter = Adapter;
