import { Lunar, LunarUtil, Solar } from "lunar-typescript";

// enum MONTH {
//   Jan = "0",
//   Feb = "1",
//   Mar = "2",
//   Apr = "3",
//   May = "4",
//   Jun = "5",
//   Jul = "6",
//   Aug = "7",
//   Sep = "8",
//   Oct = "9",
//   Nov = "10",
//   Dec = "11",
// }

export type IYear = number;

export type ILunarYear = number;

export type IMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ILunarMonth =
  | IMonth
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

export type IDay =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type ILunarDay = Exclude<IDay, 31>;

export function dayToStr(day: IDay): string {
  return day < 10 ? `0${day}` : `${day}`;
}

const LunarDayStr: { [key: number]: string } = {
  1: "初一",
  2: "初二",
  3: "初三",
  4: "初四",
  5: "初五",
  6: "初六",
  7: "初七",
  8: "初八",
  9: "初九",
  10: "初十",
  11: "十一",
  12: "十二",
  13: "十三",
  14: "十四",
  15: "十五",
  16: "十六",
  17: "十七",
  18: "十八",
  19: "十九",
  20: "二十",
  21: "廿一",
  22: "廿二",
  23: "廿三",
  24: "廿四",
  25: "廿五",
  26: "廿六",
  27: "廿七",
  28: "廿八",
  29: "廿九",
  30: "三十",
};

export function lunarDayToStr(day: IDay): string {
  return `${LunarDayStr[day]}`;
}

export function monthToStr(month: IMonth): string {
  return month < 10 ? `0${month}` : `${month}`;
}

const LunarMonthStr: { [key: number]: string } = {
  1: "正",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
  10: "十",
  11: "冬",
  12: "腊",
};

export function LunarMonthToStr(lunarMonth: number): string {
  let month = lunarMonth > 12 ? lunarMonth - 12 : lunarMonth;

  let str = lunarMonth > 12 ? "闰" : "";
  str = str + LunarMonthStr[month];
  return str;
}

export const YEARS: IYear[] = [];
for (let y = 1900; y <= 2022; y++) {
  YEARS.push(y as IYear);
}

export function getRangeYears(range?: [number, number]) {
  if (range) {
    const YEARS_RANGE: IYear[] = [];
    for (let y = range[0]; y <= range[1]; y++) {
      YEARS_RANGE.push(y as IYear);
    }
    return YEARS_RANGE;
  }
  return YEARS;
}

export const LUNAR_MONTH: ILunarMonth[] = [];
for (let mon = 1; mon <= 12; mon++) {
  LUNAR_MONTH.push(mon as ILunarMonth);
}

export const LUNAR_DAYS: ILunarDay[] = [];
for (let day = 1; day <= 30; day++) {
  LUNAR_DAYS.push(day as ILunarDay);
}

export function checkLunarMonth(
  lunarYear: number,
  lunarMonth: ILunarMonth
): ILunarMonth {
  const leap = LunarUtil.getLeapMonth(lunarYear);
  if (leap === 0 || leap !== lunarMonth - 12) {
    return (lunarMonth > 12 ? lunarMonth - 12 : lunarMonth) as ILunarMonth;
  }
  return lunarMonth;
}

export function getLunarMonths(lunarYear: number) {
  const m = LunarUtil.getLeapMonth(lunarYear);
  const months = [...LUNAR_MONTH];
  m !== 0 && months.splice(m, 0, (m + 12) as ILunarMonth);
  return months;
}

function lunarLeapMonthToNum(lunarMonth: number) {
  return lunarMonth > 12 ? 12 - lunarMonth : lunarMonth;
}

export function getLunarDaysOfMonth(
  lunarYear: number,
  lunarMonth: ILunarMonth
) {
  return LunarUtil.getDaysOfMonth(lunarYear, lunarLeapMonthToNum(lunarMonth));
}

export function lunarToSolar([ly, lm, ld]: [
  ILunarYear,
  ILunarMonth,
  ILunarDay
]): [IYear, IMonth, IDay] {
  const solar = Lunar.fromYmd(ly, lunarLeapMonthToNum(lm), ld).getSolar();
  return [solar.getYear(), solar.getMonth() as IMonth, solar.getDay() as IDay];
}

export function SolarToLunar([sy, sm, sd]: [IYear, IMonth, IDay]): [
  ILunarYear,
  ILunarMonth,
  ILunarDay
] {
  const lunar = Solar.fromYmd(sy, sm, sd).getLunar();
  const m = lunar.getMonth();
  return [
    lunar.getYear(),
    (m < 0 ? Math.abs(m) + 12 : m) as ILunarMonth,
    lunar.getDay() as ILunarDay,
  ];
}
