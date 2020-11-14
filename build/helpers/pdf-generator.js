"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = exports.PdfOptions = void 0;
var pdfkit_1 = __importDefault(require("pdfkit"));
var fs_1 = __importDefault(require("fs"));
var format_date_1 = require("../helpers/format-date");
var filter_special_characters_1 = require("../helpers/filter-special-characters");
var text_to_title_1 = require("./text-to-title");
var PdfOptions;
(function (PdfOptions) {
    PdfOptions["FONT_PATH"] = "src/assets/fonts/Lato-Regular.ttf";
    PdfOptions["FONT_BOLD_PATH"] = "src/assets/fonts/Lato-Bold.ttf";
    PdfOptions["LOGO_PATH"] = "src/assets/images/logo.png";
    PdfOptions[PdfOptions["FONT_SIZE"] = 12] = "FONT_SIZE";
    PdfOptions[PdfOptions["TITLE_FONT_SIZE"] = 16] = "TITLE_FONT_SIZE";
    PdfOptions["FONT_COLOR_BLUE"] = "#4287f5";
    PdfOptions["FONT_COLOR_NORMAL"] = "#141517";
    PdfOptions["FONT_COLOR_RED"] = "#ba362f";
    PdfOptions["FONT_COLOR_GREEN"] = "#2e9449";
    PdfOptions[PdfOptions["ITEM_PER_PAGE"] = 3] = "ITEM_PER_PAGE";
})(PdfOptions = exports.PdfOptions || (exports.PdfOptions = {}));
exports.generatePDF = function (mailerObjects) {
    var doc = new pdfkit_1.default({ size: "A4" });
    var countForNewPage = 1;
    doc.pipe(fs_1.default.createWriteStream("output/pendencias.pdf"));
    doc.image(PdfOptions.LOGO_PATH, (doc.page.width - 150) / 2, 20, {
        width: 150,
        height: 45,
    });
    doc.text("\n \n");
    if (mailerObjects.length == 0) {
        writeKeyValue("Parabéns: ", "Você não possuia nenhuma pendência :)", doc, PdfOptions.FONT_COLOR_GREEN, PdfOptions.FONT_COLOR_GREEN);
    }
    for (var i in mailerObjects) {
        mailerObjects[i] = filter_special_characters_1.filterSpecialCharacters(mailerObjects[i]);
        doc
            .font(PdfOptions.FONT_BOLD_PATH)
            .fontSize(PdfOptions.TITLE_FONT_SIZE)
            .fillColor(PdfOptions.FONT_COLOR_BLUE)
            .text("" + (mailerObjects[i].name || "Essa pendencia não possuia nome"));
        doc.text("\n");
        writeKeyValue("Categoria:", "  " + (text_to_title_1.stringToTitle(mailerObjects[i].category) || "-"), doc);
        writeKeyValue("Empresa responsavel:", " " + (mailerObjects[i].responsible || "-"), doc);
        writeKeyValue("Renova a cada:", "  " + (mailerObjects[i].period || "-"), doc);
        writeKeyValue("Valor da ultima realização:", "  R$ " + (mailerObjects[i].value || "-"), doc);
        writeKeyValue("Valor estimado da proxima realização:", "  R$ " + (mailerObjects[i].value || "-"), doc);
        writeKeyValue("Ultima Realização:", "  " + (format_date_1.formatDate(mailerObjects[i].lastTime) || "-"), doc);
        writeKeyValue("Proxima Realização:", "  " + (format_date_1.formatDate(mailerObjects[i].nextTime) || "-"), doc);
        writeKeyValue("Status:", "  " + (mailerObjects[i].status || "SEM STATUS"), doc, PdfOptions.FONT_COLOR_NORMAL, PdfOptions.FONT_COLOR_RED);
        doc.text("\n ");
        if (countForNewPage == PdfOptions.ITEM_PER_PAGE) {
            doc.addPage({ size: "A4" });
            countForNewPage = 0;
        }
        countForNewPage += 1;
    }
    doc.end();
};
var writeKeyValue = function (key, value, doc, keyColor, valueColor) {
    if (keyColor === void 0) { keyColor = PdfOptions.FONT_COLOR_NORMAL; }
    if (valueColor === void 0) { valueColor = PdfOptions.FONT_COLOR_NORMAL; }
    var result = doc
        .font(PdfOptions.FONT_PATH)
        .fontSize(PdfOptions.FONT_SIZE)
        .fillColor(keyColor)
        .text(key, { continued: true })
        .font(PdfOptions.FONT_BOLD_PATH)
        .fillColor(valueColor)
        .text("" + value);
    return result;
};
