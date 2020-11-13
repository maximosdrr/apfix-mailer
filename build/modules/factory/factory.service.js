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
exports.Factory = void 0;
var Factory = /** @class */ (function () {
    function Factory(condominiumDutyService, dutyService, condominiumService, fixerService) {
        this.condominiumDutyService = condominiumDutyService;
        this.dutyService = dutyService;
        this.condominiumService = condominiumService;
        this.fixerService = fixerService;
        console.log("[SERVICE]: Factory Initialized");
    }
    Factory.prototype.createMailerObject = function (condominiumId) {
        return __awaiter(this, void 0, void 0, function () {
            var mailerObject, condominiumDutys, _a, _b, _i, i, dutyId, fixerId, duty, fixer, name, period, status, nextTime, estimatedValue, responsible, lastTime, value, category, rest;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        mailerObject = [];
                        return [4 /*yield*/, this.condominiumDutyService.findByCondominium(condominiumId)];
                    case 1:
                        condominiumDutys = _c.sent();
                        _a = [];
                        for (_b in condominiumDutys)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        i = _a[_i];
                        dutyId = condominiumDutys[i].obrigacao || "";
                        fixerId = condominiumDutys[i].fixer || "";
                        return [4 /*yield*/, this.dutyService.findOne(dutyId)];
                    case 3:
                        duty = (_c.sent()) || {};
                        return [4 /*yield*/, this.fixerService.findOneById(fixerId)];
                    case 4:
                        fixer = _c.sent();
                        name = duty.nome_obrigacao || "?";
                        period = duty.periodicidade_manutencao || {
                            qtd_tempo: "?",
                            medida: "?",
                        };
                        status = condominiumDutys[i].status || "SEM STATUS";
                        nextTime = condominiumDutys[i].data_proxima_realizacao || "00/00/00";
                        estimatedValue = condominiumDutys[i].valor_estimado || 0;
                        responsible = condominiumDutys[i].nome_empresa_executante || "?";
                        lastTime = condominiumDutys[i].data_realizacao || "00/00/00";
                        value = condominiumDutys[i].valor_gasto || 0;
                        category = fixer.nome_fixer || "Sem categoria";
                        rest = {
                            name: name,
                            period: (period.qtd_tempo || "?") + " " + (period.medida || "?"),
                            status: status,
                            nextTime: nextTime,
                            estimatedValue: estimatedValue,
                            responsible: responsible,
                            lastTime: lastTime,
                            value: value,
                            category: category,
                        };
                        mailerObject.push(rest);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, mailerObject];
                }
            });
        });
    };
    Factory.prototype.createMailerList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var condominiums, mailerObjects, _a, _b, _i, i, id, mailerObject;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.condominiumService.findAll()];
                    case 1:
                        condominiums = _c.sent();
                        mailerObjects = [];
                        _a = [];
                        for (_b in condominiums)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        i = _a[_i];
                        id = condominiums[i]._id;
                        return [4 /*yield*/, this.createMailerObject(id || "")];
                    case 3:
                        mailerObject = _c.sent();
                        mailerObjects.push(mailerObject);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        console.log(mailerObjects);
                        return [2 /*return*/, mailerObjects];
                }
            });
        });
    };
    Factory.prototype.getCondominiuns = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.condominiumService.findAll()];
            });
        });
    };
    return Factory;
}());
exports.Factory = Factory;