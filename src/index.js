import React from "react";
import ReactDom from "react-dom";
import W from "@gup-front/webpack_guide";

const div = document.createElement("div");
div.style = "display:block;width:100px;height:100px";
document.body.appendChild(div);
const div2 = document.createElement("div");
div2.style = "display:block;width:100px;height:100px";
document.body.appendChild(div2);
function getTime(time) {
  div2.innerHTML = time;
}
ReactDom.render(<W getTime={getTime}/>, div);
