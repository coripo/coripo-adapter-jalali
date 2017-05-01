'use strict';

var jalaaliJs = require('jalaali-js');
var i18next = require('i18next');
var locales = require('../locales/index.js');

var Adapter = function Adapter() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  i18next.init({
    lng: config.locale || 'fa',
    fallbackLng: 'en',
    initImmediate: false,
    resources: locales
  });

  var id = 'coripo.coripo.adapter.jalali';
  var name = i18next.t('app.name');
  var description = i18next.t('app.description');

  var l10n = function l10n(date) {
    var newDate = jalaaliJs.toJalaali(date.year, date.month, date.day);
    var ldate = {
      year: newDate.jy,
      month: newDate.jm,
      day: newDate.jd
    };
    return ldate;
  };
  var i18n = function i18n(ldate) {
    var newDate = jalaaliJs.toGregorian(ldate.year, ldate.month, ldate.day);
    var date = {
      year: newDate.gy,
      month: newDate.gm,
      day: newDate.gd
    };
    return date;
  };

  var getMonthName = function getMonthName(month, short) {
    var shortNameKey = 'app.months.' + month + '.short';
    var fullNameKey = 'app.months.' + month + '.name';
    var string = short ? i18next.t(shortNameKey) : i18next.t(fullNameKey);
    if (string === shortNameKey || string === fullNameKey) {
      throw new Error('Invalid month number, number should be between 1 and 12');
    }
    return string;
  };

  var getMonthLength = function getMonthLength(year, month) {
    return jalaaliJs.jalaaliMonthLength(year, month);
  };

  var isValid = function isValid(date) {
    return jalaaliJs.isValidJalaaliDate(date.year, date.month, date.day);
  };

  var isLeap = function isLeap(year) {
    return jalaaliJs.isLeapJalaaliYear(year);
  };

  var offsetYear = function offsetYear(date, offset) {
    return {
      year: date.year + offset,
      month: date.month,
      day: date.day
    };
  };

  var offsetMonth = function offsetMonth(date, offset) {
    var newYear = date.year + Math.floor((offset + (date.month - 1)) / 12);
    var newOffset = offset % 12;
    var newMonth = (12 + (date.month - 1) + newOffset) % 12 + 1;
    var newDay = Math.min(date.day, getMonthLength(newYear, newMonth));
    return {
      year: newYear,
      month: newMonth,
      day: newDay
    };
  };

  var offsetDay = function offsetDay(date, offset) {
    /*
      im not sure if its 100% accurate
      should be checked
    */
    var i18nDate = i18n({
      year: date.year,
      month: date.month,
      day: date.day
    });
    var jsDate = new Date(i18nDate.year + '-' + i18nDate.month + '-' + i18nDate.day);
    jsDate.setDate(jsDate.getDate() + offset);
    return l10n({
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      day: jsDate.getDate()
    });
  };

  return {
    id: id,
    name: name,
    description: description,
    l10n: l10n,
    i18n: i18n,
    isValid: isValid,
    isLeap: isLeap,
    getMonthName: getMonthName,
    getMonthLength: getMonthLength,
    offsetYear: offsetYear,
    offsetMonth: offsetMonth,
    offsetDay: offsetDay
  };
};

exports.Adapter = Adapter;
//# sourceMappingURL=jalali.adapter.js.map