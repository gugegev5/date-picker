import React, { useEffect, useState } from "react";
import css from "./Time.less";

let c = 0;

export default function Time({ defaultTime, getTime }: any) {
  const [time, setTime] = useState<any>();
  useEffect(() => {
    const i = setInterval(() => {
      const t = c++;
      setTime(t);
      getTime(t);
    }, 1000);
    return () => clearInterval(i);
  });
  useEffect(() => {
    setTime(defaultTime);
  }, [defaultTime]);
  return (
    <div>
      <div className={css.mask}></div>
      <div className={css.time}>
        <div>
          input5:
          <input
            onChange={(e) => {
              setTime(e.target.value);
              getTime(e.target.value);
            }}
          ></input>
        </div>
        <div>time4:{time}</div>
      </div>
    </div>
  );
}
