import { Solar } from "lunar-typescript";

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

export type IMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ILunarMonth =
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
  | -1
  | -2
  | -3
  | -4
  | -5
  | -6
  | -7
  | -8
  | -9
  | -10
  | -11
  | -12;

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

export function dayToStr(day: IDay): string {
  return day < 10 ? `0${day}` : `${day}`;
}

export function monthToStr(month: IMonth): string {
  return month < 10 ? `0${month}` : `${month}`;
}
