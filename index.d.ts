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

/**
 *
 * ```js
 * Return React Component.
 * browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
 * ```
 *
 * @param defaultTime [2020, 1, 1]
 * @param getTime [2020, 1, 1]
 * @param onConfirm [2020, 1, 1]
 * @param defaultType 1: solar, 2: lunar
 * @param yearsRange [1990, 2030]
 * @returns JSX.Element
 */
export default function DatePicker({
  defaultTime,
  getTime,
  onConfirm,
  defaultType,
  yearsRange,
}: {
  defaultTime: [IYear, IMonth, IDay];
  getTime: (t: [IYear, IMonth, IDay]) => any;
  onConfirm: (t: [IYear, IMonth, IDay]) => any;
  defaultType: number;
  yearsRange?: [number, number];
}): JSX.Element;
