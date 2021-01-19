const { Solar, LunarUtil, Lunar, HolidayUtil, SolarYear } = require("lunar-typescript");

// console.log(LunarUtil.nextMonth(2016,1));

// console.log();
// var d = SolarYear.fromDate(new Date());
// console.log(d.getMonths());

console.log();
var solar = Solar.fromDate(new Date());
// 转阴历
var d = solar.getLunar();
// console.log(d);
console.log(d.getMonth());
// console.log(d.toFullString());
