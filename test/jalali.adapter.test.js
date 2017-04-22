/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const adapter = require('../src/jalali.adapter.js');

describe('Jalali Adapter', () => {
  describe('name', () => {
    it('should return a string', () => {
      expect(adapter.name).to.be.a('string');
    });
  });

  describe('l10n', () => {
    it('should return {year: 1396, month: 1, day: 31} when (2017, 4, 20)', () => {
      const date = { year: 2017, month: 4, day: 20 };
      expect(adapter.l10n(date)).to.deep.equal({ year: 1396, month: 1, day: 31 });
    });
    it('should return {year: 1396, month: 2, day: 1} when (2017, 4, 21)', () => {
      const date = { year: 2017, month: 4, day: 21 };
      expect(adapter.l10n(date)).to.deep.equal({ year: 1396, month: 2, day: 1 });
    });
  });

  describe('i18n', () => {
    it('should return {year: 2017, month: 4, day: 20} when (1396, 1, 31)', () => {
      const date = { year: 1396, month: 1, day: 31 };
      expect(adapter.i18n(date)).to.deep.equal({ year: 2017, month: 4, day: 20 });
    });
    it('should return {year: 2017, month: 4, day: 21} when (1396, 2, 1)', () => {
      const date = { year: 1396, month: 2, day: 1 };
      expect(adapter.i18n(date)).to.deep.equal({ year: 2017, month: 4, day: 21 });
    });
  });

  describe('isValid', () => {
    it('should return false when input is (1394, 12, 30)', () => {
      const date = { year: 1394, month: 12, day: 30 };
      expect(adapter.isValid(date)).to.be.false;
    });
    it('should return true when input is (1395, 12, 30)', () => {
      const date = { year: 1395, month: 12, day: 30 };
      expect(adapter.isValid(date)).to.be.true;
    });
  });

  describe('isLeap', () => {
    it('should return false when input is 1394', () => {
      expect(adapter.isLeap(1394)).to.be.false;
    });
    it('should return true when input is 1395', () => {
      expect(adapter.isLeap(1395)).to.be.true;
    });
    it('should return false when input is 1396', () => {
      expect(adapter.isLeap(1396)).to.be.false;
    });
  });

  describe('getMonthName', () => {
    it('should return string when number is between 1 and 12', () => {
      for (let i = 1; i <= 12; i += 1) {
        expect(adapter.getMonthName(i)).to.be.a('string');
      }
    });
    it('should throw error when number is 0', () => {
      expect(() => { adapter.getMonthName(0); }).to.throw(Error);
    });
    it('should throw error when number is 13', () => {
      expect(() => { adapter.getMonthName(13); }).to.throw(Error);
    });
  });

  describe('getMonthLength', () => {
    it('should return 31 when input is (1396, 1) to (1396, 6)', () => {
      for (let i = 1; i <= 6; i += 1) {
        expect(adapter.getMonthLength(1396, i)).to.equal(31);
      }
    });
    it('should return 30 when input is (1396, 7) to (1396, 11)', () => {
      for (let i = 7; i <= 11; i += 1) {
        expect(adapter.getMonthLength(1396, i)).to.equal(30);
      }
    });
    it('should return 29 when input is (1396, 12)', () => {
      expect(adapter.getMonthLength(1396, 12)).to.equal(29);
    });
    it('should return 30 when input is (1395, 12)', () => {
      expect(adapter.getMonthLength(1395, 12)).to.equal(30);
    });
  });
});
