"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToTitle = void 0;
exports.stringToTitle = function (category) {
    return category.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
