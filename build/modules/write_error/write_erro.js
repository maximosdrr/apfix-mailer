"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteError = void 0;
var fs_1 = __importDefault(require("fs"));
exports.WriteError = function (e, fileName) {
    fs_1.default.appendFile(fileName, "\n ---------------------------------------------------- \n " + e + " \n", function (err) {
        if (err)
            throw err;
        console.log("[ERROR]: NOVO ERRO REPORTADO, VERIFIQUE OS LOGS");
    });
};
