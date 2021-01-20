// import { Lunar } from "lunar-typescript/dist/lib/Lunar";
// import { LunarUtil } from "lunar-typescript/dist/lib/LunarUtil";
// import { Solar } from "lunar-typescript/dist/lib/Solar";
// import { SolarUtil } from "lunar-typescript/dist/lib/SolarUtil";
import { SolarUtil, Solar, LunarUtil, Lunar } from "lunar-typescript";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MultiPicker from "rmc-picker/lib/MultiPicker";
import Picker from "rmc-picker/lib/Picker";
import {
  ILunarMonth,
  IDay,
  IYear,
  IMonth,
  ILunarYear,
  ILunarDay,
  LunarMonthToStr,
  YEARS,
  LUNAR_DAYS,
  lunarDayToStr,
  getLunarMonths,
  lunarToSolar,
  getLunarDaysOfMonth,
  checkLunarMonth,
  SolarToLunar,
} from "../util/formatDate";
import "./rmc-picker.css";

/**
 *
 * @param sy: solar year
 * @param ly: lunar year
 */
export default function LunarPicker({
  defaultTime: [sy, sm, sd],
  getTime,
}: {
  defaultTime: [sy: IYear, sy: IMonth, sy: IDay];
  getTime: ([sy, sm, sd]: [IYear, IMonth, IDay]) => [IYear, IMonth, IDay];
}) {
  const [lunarY, lunarM, lunarD] = useMemo(() => SolarToLunar([sy, sm, sd]), [
    sy,
    sm,
    sd,
  ]);
  const [lunarYear, setYear] = useState<ILunarYear>(lunarY);
  const [lunarMonth, setMonth] = useState<ILunarMonth>(lunarM as ILunarMonth);
  const [lunarDay, setDay] = useState<ILunarDay>(lunarD as ILunarDay);
  const setYMD = useCallback(
    (ly: ILunarYear, lm: ILunarMonth, ld: ILunarDay) => {
      setYear(ly);
      setMonth(lm);
      setDay(ld);
    },
    [setYear, setMonth, setDay]
  );
  const setTime = useCallback(
    ([y, m, d]: [ILunarYear, ILunarMonth, ILunarDay]) => {
      setYMD(y, m, d);
      getTime && getTime(lunarToSolar([y, m, d]));
    },
    [getTime]
  );
  useEffect(() => setTime([lunarY, lunarM, lunarD]), [lunarY, lunarM, lunarD]);
  const DaysOfMonth = useMemo(
    () => getLunarDaysOfMonth(lunarYear, lunarMonth),
    [lunarYear, lunarMonth]
  );

  const onChange = useCallback(
    ([ly, lm, ld]: [ILunarYear, ILunarMonth, ILunarDay]) => {
      console.log("onChange", ly, lm, checkLunarMonth(ly, lm), ld);
      setTime([ly, checkLunarMonth(ly, lm), ld]);
    },
    [setTime]
  );

  //   const onScrollChange = useCallback(
  //     (value: any) => {
  //       console.log("onScrollChange", value);
  //     },
  //     [setTime]
  //   );

  const YearComponents = useMemo(
    () =>
      YEARS.map((year) => (
        <Picker.Item value={year} key={year}>{`${year}年`}</Picker.Item>
      )),
    [YEARS]
  );
  const MonthComponents = useMemo(
    () =>
      getLunarMonths(lunarYear).map((month) => (
        <Picker.Item value={month} key={month}>
          {`${LunarMonthToStr(month as any)}月`}
        </Picker.Item>
      )),
    [lunarYear]
  );
  const DayConponents = useMemo(
    () =>
      LUNAR_DAYS.map(
        (day) =>
          day <= DaysOfMonth && (
            <Picker.Item value={day} key={day}>
              {`${lunarDayToStr(day)}`}
            </Picker.Item>
          )
      ).filter(Boolean),
    [DaysOfMonth]
  );

  return (
    <MultiPicker
      selectedValue={[lunarYear, lunarMonth, lunarDay]}
      onValueChange={onChange}
      //   onScrollChange={onScrollChange}
    >
      <Picker indicatorClassName="my-picker-indicator" key="year">
        {YearComponents}
      </Picker>
      <Picker indicatorClassName="my-picker-indicator" key="month">
        {MonthComponents}
      </Picker>
      <Picker indicatorClassName="my-picker-indicator" key="day">
        {DayConponents}
      </Picker>
    </MultiPicker>
  );
}
