"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function listFormat(items, options) {
    let str = "";
    let list = items;
    function formatArray(items, length) {
        let str = "";
        const diff = items.length - length;
        for (let i = 0; i < length; i++) {
            if (items[i].length > 0) {
                if (i === 0) {
                    str += items[i];
                }
                else {
                    if (diff === 0 && i === length - 1) {
                        str += " and " + items[i];
                    }
                    else {
                        str += ", " + items[i];
                    }
                }
            }
        }
        if (diff > 0) {
            const others = (diff - 1) % 10 === 0 ? " other" : " others";
            str += " and " + diff + others;
        }
        return str;
    }
    if (options) {
        if (options.unique === true) {
            list = Array.from(new Set(items));
        }
        if (options.sorted === true) {
            list.sort();
        }
    }
    if (options?.length && options.length > 0) {
        const legthFixed = options.length <= list.length ? options.length : list.length;
        str = formatArray(list, legthFixed);
    }
    else {
        console.log(list);
        str = formatArray(list, list.length);
    }
    return str;
}
exports.default = listFormat;
