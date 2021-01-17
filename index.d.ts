/**
 * Return string of num.
 *
 * ```js
 * browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
 * ```
 *
 * @param num 0,1,2,3,4
 * @returns one,two,three,four,five
 */
export declare function numToWord(num: number): string;

/**
 * Return number of string.
 *
 * ```js
 * browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
 * ```
 *
 * @param one,two,three,four,five
 * @returns num 0,1,2,3,4
 */
export declare function wordToNum(num: string): number;
