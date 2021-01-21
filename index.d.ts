import { IYear, IMonth, IDay } from "./src/util/formatDate";

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
  yearsRange
}: {
  defaultTime: [IYear, IMonth, IDay];
  getTime: (t: [IYear, IMonth, IDay]) => any;
  onConfirm: (t: [IYear, IMonth, IDay]) => any;
  defaultType: number;
  yearsRange?: [number, number];
}): JSX.Element;
