"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
exports.formatDate = function (isoDate) {
    var date = new Date(isoDate);
    var fullDate = date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " - ";
    return fullDate
        .toString()
        .replace("NaN", "---")
        .replace("NaN/", "--")
        .replace("-NaN", "-/--")
        .replace(" ", "")
        .replace("-", "");
};
