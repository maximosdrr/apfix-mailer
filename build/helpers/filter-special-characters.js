"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSpecialCharacters = void 0;
exports.filterSpecialCharacters = function (mailerObject) {
    mailerObject.name = mailerObject.name.replace(/[&\/\\#,+()$~%.'":*?<>{}`]/g, "");
    mailerObject.category = mailerObject.category.replace(/[&\/\\#,+()$~%.'":*?<>{}`]/g, "");
    mailerObject.period = mailerObject.period.replace(/[&\/\\#,+()$~%.'":*?<>{}`]/g, "");
    mailerObject.responsible = mailerObject.responsible.replace(/[&\/\\#,+()$~%.'":*?<>{}`]/g, "");
    mailerObject.status = mailerObject.status.replace(/[^a-zA-Z ]/g, "");
    return mailerObject;
};
