import React, { useCallback, useEffect, useMemo, useState } from "react";
import merge from "classnames";
import SolarPicker from "./Solar";
import LunarPicker from "./Lunar";
import css from "./Time.less";
import { IDay, IMonth, IYear } from "../util/formatDate";

const SELECT = {
  solar: 1,
  lunar: 2,
};

export default function Time({
  defaultTime,
  getTime,
  onConfirm,
  defaultType,
}: {
  defaultTime: [IYear, IMonth, IDay];
  getTime: (t: [IYear, IMonth, IDay]) => any;
  onConfirm: (t: [IYear, IMonth, IDay]) => any;
  defaultType: number;
}) {
  const [ymd, setYMD] = useState<[IYear, IMonth, IDay]>(defaultTime);
  const setTime = useCallback((t: [IYear, IMonth, IDay]) => {
    setYMD(t);
    getTime && getTime(t);
  }, []);

  const [sel, setSel] = useState<number>(
    defaultType === SELECT.solar || defaultType === SELECT.lunar
      ? defaultType
      : SELECT.solar
  );
  useEffect(() => setSel(defaultType), [defaultType]);
  
  const selectSolar = useCallback(() => setSel(SELECT.solar), []);
  const selectLunar = useCallback(() => setSel(SELECT.lunar), []);
  const setToday = useCallback(() => {
    const date = new Date();
    setYMD([
      date.getFullYear(),
      (date.getMonth() + 1) as IMonth,
      date.getDate() as IDay,
    ]);
  }, []);

  const solarComp = useMemo(
    () => <SolarPicker defaultTime={ymd} getTime={setTime} />,
    [ymd]
  );
  const lunarComp = useMemo(
    () => <LunarPicker defaultTime={ymd} getTime={setTime} />,
    [ymd]
  );
  return (
    <div className={css.timeBg}>
      {/* <div className={css.mask}></div> */}
      <div className={css.head}>
        <div
          className={merge(css.item, { [css.selected]: sel === SELECT.solar })}
          onClick={selectSolar}
        >
          公历
        </div>
        <div
          className={merge(css.item, { [css.selected]: sel === SELECT.lunar })}
          onClick={selectLunar}
        >
          农历
        </div>
        <div className={merge(css.item, css.today)} onClick={setToday}>
          今天
        </div>
        <div
          className={merge(css.item, css.confirm)}
          onClick={() => onConfirm && onConfirm(ymd)}
        >
          确定
        </div>
      </div>
      <div className={css.time}>
        {sel === SELECT.solar && solarComp}
        {sel === SELECT.lunar && lunarComp}
      </div>
    </div>
  );
}
