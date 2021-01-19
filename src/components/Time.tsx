import React, { useEffect, useState } from "react";
import Solar from "./Solar";
// import Lunar from "./Lunar";
import css from "./Time.less";

export default function Time({ defaultTime, getTime }: any) {
  return (
    <div>
      <div className={css.mask}></div>
      <div className={css.time}>
        <Solar defaultTime={defaultTime} getTime={getTime} />
      </div>
    </div>
  );
}
