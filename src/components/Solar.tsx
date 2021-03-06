import { SolarUtil } from "lunar-typescript";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MultiPicker from "rmc-picker/lib/MultiPicker";
import Picker from "rmc-picker/lib/Picker";
import { IMonth, IDay, IYear } from "../..";
import { dayToStr, monthToStr, getRangeYears } from "../util/formatDate";
import "./rmc-picker.css";

const MONTH: IMonth[] = [];
for (let mon = 1; mon <= 12; mon++) {
  MONTH.push(mon as IMonth);
}

const DAYS: IDay[] = [];
for (let day = 1; day <= 31; day++) {
  DAYS.push(day as IDay);
}

export default function Solar({
  defaultTime: [y, m, d],
  getTime,
  yearsRange,
}: {
  defaultTime: [y: IYear, m: IMonth, d: IDay];
  getTime: ([sy, sm, sd]: [IYear, IMonth, IDay]) => any;
  yearsRange?: [number, number];
}) {
  const [year, setYear] = useState<IYear>(2021);
  const [month, setMonth] = useState<IMonth>(2);
  const [day, setDay] = useState<IDay>(2);
  const setYMD = useCallback(
    (y, m, d) => {
      setYear(y);
      setMonth(m);
      setDay(d);
    },
    [setYear, setMonth, setDay]
  );
  const setTime = useCallback(
    ([y, m, d]) => {
      setYMD(y, m, d);
      getTime && getTime([y, m, d]);
    },
    [getTime]
  );
  useEffect(() => setTime([y, m, d]), [y, m, d]);
  const DaysOfMonth = useMemo(() => SolarUtil.getDaysOfMonth(year, month), [
    year,
    month,
  ]);

  const onChange = useCallback(
    (multi: any) => {
      console.log("onChange", multi);
      setTime(multi);
    },
    [setTime]
  );

  const Years = useMemo(
    () =>
      getRangeYears(yearsRange).map((year) => (
        <Picker.Item value={year} key={year}>{`${year}年`}</Picker.Item>
      )),
    [yearsRange]
  );
  const Month = useMemo(
    () =>
      MONTH.map((month) => (
        <Picker.Item value={month} key={month}>
          {`${monthToStr(month)}月`}
        </Picker.Item>
      )),
    [MONTH]
  );
  const Days = useMemo(
    () =>
      DAYS.map(
        (day) =>
          day <= DaysOfMonth && (
            <Picker.Item value={day} key={day}>
              {`${dayToStr(day)}日`}
            </Picker.Item>
          )
      ).filter(Boolean),
    [DaysOfMonth]
  );

  return (
    <MultiPicker selectedValue={[year, month, day]} onValueChange={onChange}>
      <Picker indicatorClassName="my-picker-indicator" key="year">
        {Years}
      </Picker>
      <Picker indicatorClassName="my-picker-indicator" key="month">
        {Month}
      </Picker>
      <Picker indicatorClassName="my-picker-indicator" key="day">
        {Days}
      </Picker>
    </MultiPicker>
  );
}
