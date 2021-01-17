import _ from "lodash";
import numRef from "./ref.json";
import Loader from "./components/Time";

export function numToWord(num: number): string {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ""
  );
}

export function wordToNum(word: string): number {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}

export default Loader;
