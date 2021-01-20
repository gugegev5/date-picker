import React, { useEffect, useState } from "react";
// import Solar from "./Solar";
import LunarPicker from "./Lunar";
import css from "./Time.less";

export default function Time({ defaultTime, getTime }: any) {
  return (
    <div>
      <div className={css.mask}></div>
      <div className={css.time}>
        <LunarPicker defaultTime={defaultTime} getTime={getTime} />
      </div>
    </div>
  );
}
