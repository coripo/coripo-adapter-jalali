const adapter = require('./src/jalali.adapter.js');

exports.name = adapter.name;
exports.l10n = adapter.l10n;
exports.i18n = adapter.i18n;
exports.isValid = adapter.isValid;
exports.isLeap = adapter.isLeap;
exports.getMonthName = adapter.getMonthName;
exports.getMonthLength = adapter.getMonthLength;
