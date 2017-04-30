/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const JalaliAdapter = require('../src/jalali.adapter.js').Adapter;

const jalaliAdapter = new JalaliAdapter();

describe('Jalali Adapter', () => {
  describe('id', () => {
    it('should return a string', () => {
      expect(jalaliAdapter.id).to.be.a('string');
    });
  });

  describe('name', () => {
    it('should return a string', () => {
      expect(jalaliAdapter.name).to.be.a('string');
    });
  });

  describe('description', () => {
    it('should return a string', () => {
      expect(jalaliAdapter.description).to.be.a('string');
    });
  });

  describe('l10n()', () => {
    it('should return {year: 1396, month: 1, day: 31} when (2017, 4, 20)', () => {
      const date = { year: 2017, month: 4, day: 20 };
      expect(jalaliAdapter.l10n(date)).to.deep.equal({ year: 1396, month: 1, day: 31 });
    });
    it('should return {year: 1396, month: 2, day: 1} when (2017, 4, 21)', () => {
      const date = { year: 2017, month: 4, day: 21 };
      expect(jalaliAdapter.l10n(date)).to.deep.equal({ year: 1396, month: 2, day: 1 });
    });
  });

  describe('i18n()', () => {
    it('should return {year: 2017, month: 4, day: 20} when (1396, 1, 31)', () => {
      const date = { year: 1396, month: 1, day: 31 };
      expect(jalaliAdapter.i18n(date)).to.deep.equal({ year: 2017, month: 4, day: 20 });
    });
    it('should return {year: 2017, month: 4, day: 21} when (1396, 2, 1)', () => {
      const date = { year: 1396, month: 2, day: 1 };
      expect(jalaliAdapter.i18n(date)).to.deep.equal({ year: 2017, month: 4, day: 21 });
    });
  });

  describe('isValid()', () => {
    it('should return false when input is (1394, 12, 30)', () => {
      const date = { year: 1394, month: 12, day: 30 };
      expect(jalaliAdapter.isValid(date)).to.be.false;
    });
    it('should return true when input is (1395, 12, 30)', () => {
      const date = { year: 1395, month: 12, day: 30 };
      expect(jalaliAdapter.isValid(date)).to.be.true;
    });
  });

  describe('isLeap()', () => {
    it('should return false when input is 1394', () => {
      expect(jalaliAdapter.isLeap(1394)).to.be.false;
    });
    it('should return true when input is 1395', () => {
      expect(jalaliAdapter.isLeap(1395)).to.be.true;
    });
    it('should return false when input is 1396', () => {
      expect(jalaliAdapter.isLeap(1396)).to.be.false;
    });
  });

  describe('getMonthName()', () => {
    it('should return string when number is between 1 and 12', () => {
      for (let i = 1; i <= 12; i += 1) {
        expect(jalaliAdapter.getMonthName(i)).to.be.a('string');
      }
    });
    it('should throw error when number is 0', () => {
      expect(() => { jalaliAdapter.getMonthName(0); }).to.throw(Error);
    });
    it('should throw error when number is 13', () => {
      expect(() => { jalaliAdapter.getMonthName(13); }).to.throw(Error);
    });
  });

  describe('getMonthLength()', () => {
    it('should return 31 when input is (1396, 1) to (1396, 6)', () => {
      for (let i = 1; i <= 6; i += 1) {
        expect(jalaliAdapter.getMonthLength(1396, i)).to.equal(31);
      }
    });
    it('should return 30 when input is (1396, 7) to (1396, 11)', () => {
      for (let i = 7; i <= 11; i += 1) {
        expect(jalaliAdapter.getMonthLength(1396, i)).to.equal(30);
      }
    });
    it('should return 29 when input is (1396, 12)', () => {
      expect(jalaliAdapter.getMonthLength(1396, 12)).to.equal(29);
    });
    it('should return 30 when input is (1395, 12)', () => {
      expect(jalaliAdapter.getMonthLength(1395, 12)).to.equal(30);
    });
  });
  describe('offsetYear()', () => {
    it('should return 1400', () => {
      expect(jalaliAdapter.offsetYear({ year: 1396, month: 11, day: 24 }, 4).year).to.equal(1400);
    });
    it('should return 1300', () => {
      expect(jalaliAdapter.offsetYear({ year: 1396, month: 11, day: 24 }, -96).year).to.equal(1300);
    });
  });
  describe('offsetMonth()', () => {
    it('should return increasing month', () => {
      for (let i = 1; i <= 11; i += 1) {
        const date = jalaliAdapter.offsetMonth({ year: 1396, month: 1, day: 20 }, i);
        expect(date.year).to.equal(1396);
        expect(date.month).to.equal(1 + i);
        expect(date.day).to.equal(20);
      }
    });
    it('should return increasing month and not cross month day length', () => {
      for (let i = 1; i <= 11; i += 1) {
        const date = jalaliAdapter.offsetMonth({ year: 1396, month: 1, day: 40 }, i);
        expect(date.year).to.equal(1396);
        expect(date.month).to.equal(1 + i);
        expect(date.day).to.equal(jalaliAdapter.getMonthLength(date.year, date.month));
      }
    });
    it('should return 1395/12/29', () => {
      const date = jalaliAdapter.offsetMonth({ year: 1396, month: 1, day: 31 }, -1);
      expect(date.year).to.equal(1395);
      expect(date.month).to.equal(12);
      expect(date.day).to.equal(jalaliAdapter.getMonthLength(date.year, date.month));
    });
    it('should return 1394/11/29', () => {
      const date = jalaliAdapter.offsetMonth({ year: 1396, month: 1, day: 31 }, -14);
      expect(date.year).to.equal(1394);
      expect(date.month).to.equal(11);
      expect(date.day).to.equal(jalaliAdapter.getMonthLength(date.year, date.month));
    });
  });
});
