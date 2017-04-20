var expect = require('chai').expect;
var adapter = require('../src/jalali.adapter.js');

describe('Jalali Adapter', function() {
	describe('l10n', function() {
		it('should return {year: 1396, month: 1, day: 31} when (2017, 4, 20)', function() {
			var date = {year: 2017, month: 4, day: 20};
	    	expect(adapter.l10n(date)).to.deep.equal({year: 1396, month: 1, day: 31});
	    });
		it('should return {year: 1396, month: 2, day: 1} when (2017, 4, 21)', function() {
			var date = {year: 2017, month: 4, day: 21};
	    	expect(adapter.l10n(date)).to.deep.equal({year: 1396, month: 2, day: 1});
	    });
	});

	describe('i18n', function() {
		it('should return {year: 2017, month: 4, day: 20} when (1396, 1, 31)', function() {
			var date = {year: 1396, month: 1, day: 31};
	    	expect(adapter.i18n(date)).to.deep.equal({year: 2017, month: 4, day: 20});
	    });
		it('should return {year: 2017, month: 4, day: 21} when (1396, 2, 1)', function() {
			var date = {year: 1396, month: 2, day: 1};
	    	expect(adapter.i18n(date)).to.deep.equal({year: 2017, month: 4, day: 21});
	    });
	});

	describe('isValid', function() {
		it('should return false when input is (1394, 12, 30)', function() {
			var date = {year: 1394, month: 12, day: 30}; 
	    	expect(adapter.isValid(date)).to.be.false;
	    });
		it('should return true when input is (1395, 12, 30)', function() {
			var date = {year: 1395, month: 12, day: 30}; 
	    	expect(adapter.isValid(date)).to.be.true;
	    });
	});

	describe('isLeap', function() {
		it('should return false when input is 1394', function() {
	    	expect(adapter.isLeap(1394)).to.be.false;
	    });		
	    it('should return true when input is 1395', function() {
	    	expect(adapter.isLeap(1395)).to.be.true;
	    });
	    it('should return false when input is 1396', function() {
	    	expect(adapter.isLeap(1396)).to.be.false;
	    });
	});

	describe('getMonthName', function() {
		it('should return string when number is between 1 and 12', function() {
			for (var i = 1; i <= 12; i++) {
				expect(adapter.getMonthName(i)).to.be.a('string');
			}
	    });
		it('should throw error when number is 0', function() {
	    	expect(function() {adapter.getMonthName(0);}).to.throw(Error);
	    });
		it('should throw error when number is 13', function() {
	    	expect(function() {adapter.getMonthName(13);}).to.throw(Error);
	    });
	});

	describe('getMonthLength', function() {
		it('should return 31 when input is (1396, 1) to (1396, 6)', function() {
			for (var i = 1; i <= 6; i++) {
				expect(adapter.getMonthLength(1396, i)).to.equal(31);
			}
	    });
		it('should return 30 when input is (1396, 7) to (1396, 11)', function() {
			for (var i = 7; i <= 11; i++) {
				expect(adapter.getMonthLength(1396, i)).to.equal(30);
			}
	    });
		it('should return 29 when input is (1396, 12)', function() {
	    	expect(adapter.getMonthLength(1396, 12)).to.equal(29);
	    });
	    it('should return 30 when input is (1395, 12)', function() {
	    	expect(adapter.getMonthLength(1395, 12)).to.equal(30);
	    });
	});
});