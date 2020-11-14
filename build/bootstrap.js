"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
var constants_1 = require("./constants");
var anex_generator_1 = require("./helpers/anex-generator");
var sleep_1 = require("./helpers/sleep");
var Bootstrap = /** @class */ (function () {
    function Bootstrap(factory, mailerService) {
        this.factory = factory;
        this.mailerService = mailerService;
        console.log("[BOOTSTRAP]: Initialized");
    }
    Bootstrap.prototype.startApplication = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[BOOTSTRAP]: Now running the Application");
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 4];
                        console.log("A aplica\u00E7\u00E3o vai enviar os emails agora, " + 60 * 60 * constants_1.TIME + " minutos se passaram");
                        return [4 /*yield*/, this.sendMails()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, sleep_1.sleep(60 * 60 * constants_1.TIME)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bootstrap.prototype.sendMails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var condominiums, _a, _b, _i, i, mailerObject;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.factory.getCondominiuns()];
                    case 1:
                        condominiums = _c.sent();
                        _a = [];
                        for (_b in condominiums)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 11];
                        i = _a[_i];
                        if (!(condominiums[i].email != "" && condominiums[i].email != null)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.factory.createMailerObject(condominiums[i]._id || "")];
                    case 3:
                        mailerObject = _c.sent();
                        if (!(mailerObject.length == 0)) return [3 /*break*/, 4];
                        console.log(condominiums[i].email + " \n            n\u00E3o possuia pendencias, portanto o email n\u00E3o vai ser enviado");
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, anex_generator_1.generateOutputs(mailerObject)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, this.mailerService.send(condominiums[i].email)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, sleep_1.sleep(constants_1.EMAIL_DELAY)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        console.log(condominiums[i]._id + " n\u00E3o possuia email, portanto o email n\u00E3o pode ser enviado");
                        _c.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 2];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return Bootstrap;
}());
exports.Bootstrap = Bootstrap;
