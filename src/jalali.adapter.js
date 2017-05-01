const jalaaliJs = require('jalaali-js');
const i18next = require('i18next');
const locales = require('../locales/index.js');

const Adapter = function Adapter(config = {}) {
  i18next.init({
    lng: config.locale || 'fa',
    fallbackLng: 'en',
    initImmediate: false,
    resources: locales,
  });

  const id = 'coripo.coripo.adapter.jalali';
  const name = i18next.t('app.name');
  const description = i18next.t('app.description');

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
    const shortNameKey = `app.months.${month}.short`;
    const fullNameKey = `app.months.${month}.name`;
    const string = short ? i18next.t(shortNameKey) : i18next.t(fullNameKey);
    if (string === shortNameKey || string === fullNameKey) {
      throw new Error('Invalid month number, number should be between 1 and 12');
    }
    return string;
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
    const newYear = date.year + Math.floor((offset + (date.month - 1)) / 12);
    const newOffset = offset % 12;
    const newMonth = ((12 + (date.month - 1) + newOffset) % 12) + 1;
    const newDay = Math.min(date.day, getMonthLength(newYear, newMonth));
    return {
      year: newYear,
      month: newMonth,
      day: newDay,
    };
  };

  const offsetDay = (date, offset) => {
    /*
      im not sure if its 100% accurate
      should be checked
    */
    const i18nDate = i18n({
      year: date.year,
      month: date.month,
      day: date.day,
    });
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
