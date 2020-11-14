"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
exports.sleep = function (secs) {
    return new Promise(function (resolve) { return setTimeout(resolve, secs * 1000); });
};
