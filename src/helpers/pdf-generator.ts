import pdfkit from "pdfkit";
import fs from "fs";
import { formatDate } from "../helpers/format-date";
import { filterSpecialCharacters } from "../helpers/filter-special-characters";
import { IMailerObject } from "../models/mailerObject";
import { stringToTitle } from "./text-to-title";
import appRoot from "app-root-path";

export const PdfOptions = {
  FONT_PATH: `${appRoot.path}/src/assets/fonts/Lato-Regular.ttf`,
  FONT_BOLD_PATH: `${appRoot.path}/src/assets/fonts/Lato-Bold.ttf`,
  LOGO_PATH: `${appRoot.path}/src/assets/images/logo.png`,
  FONT_SIZE: 12,
  TITLE_FONT_SIZE: 16,
  FONT_COLOR_BLUE: "#4287f5",
  FONT_COLOR_NORMAL: "#141517",
  FONT_COLOR_RED: "#ba362f",
  FONT_COLOR_GREEN: "#2e9449",
  ITEM_PER_PAGE: 3,
};

export const generatePDF = (mailerObjects: IMailerObject[]) => {
  const doc = new pdfkit({ size: "A4" });
  let countForNewPage = 1;

  doc.pipe(fs.createWriteStream(appRoot.path + "/output/pendencias.pdf"));

  doc.image(PdfOptions.LOGO_PATH, (doc.page.width - 150) / 2, 20, {
    width: 150,
    height: 45,
  });

  doc.text("\n \n");

  if (mailerObjects.length == 0) {
    writeKeyValue(
      "Parabéns: ",
      "Você não possuia nenhuma pendência :)",
      doc,
      PdfOptions.FONT_COLOR_GREEN,
      PdfOptions.FONT_COLOR_GREEN
    );
  }

  for (const i in mailerObjects) {
    mailerObjects[i] = filterSpecialCharacters(mailerObjects[i]);
    doc
      .font(PdfOptions.FONT_BOLD_PATH)
      .fontSize(PdfOptions.TITLE_FONT_SIZE)
      .fillColor(PdfOptions.FONT_COLOR_BLUE)
      .text(`${mailerObjects[i].name || "Essa pendencia não possuia nome"}`);
    doc.text("\n");
    writeKeyValue(
      "Categoria:",
      `  ${stringToTitle(mailerObjects[i].category) || "-"}`,
      doc
    );

    writeKeyValue(
      "Empresa responsavel:",
      ` ${mailerObjects[i].responsible || "-"}`,
      doc
    );
    writeKeyValue("Renova a cada:", `  ${mailerObjects[i].period || "-"}`, doc);
    writeKeyValue(
      "Valor da ultima realização:",
      `  R$ ${mailerObjects[i].value || "-"}`,
      doc
    );
    writeKeyValue(
      "Valor estimado da proxima realização:",
      `  R$ ${mailerObjects[i].value || "-"}`,
      doc
    );
    writeKeyValue(
      "Ultima Realização:",
      `  ${formatDate(mailerObjects[i].lastTime) || "-"}`,
      doc
    );
    writeKeyValue(
      "Proxima Realização:",
      `  ${formatDate(mailerObjects[i].nextTime) || "-"}`,
      doc
    );
    writeKeyValue(
      "Status:",
      `  ${mailerObjects[i].status || "SEM STATUS"}`,
      doc,
      PdfOptions.FONT_COLOR_NORMAL,
      PdfOptions.FONT_COLOR_RED
    );

    doc.text("\n ");
    if (countForNewPage == PdfOptions.ITEM_PER_PAGE) {
      doc.addPage({ size: "A4" });
      countForNewPage = 0;
    }
    countForNewPage += 1;
  }
  doc.end();
};

const writeKeyValue = (
  key: string,
  value: string,
  doc: PDFKit.PDFDocument,
  keyColor: string = PdfOptions.FONT_COLOR_NORMAL,
  valueColor: string = PdfOptions.FONT_COLOR_NORMAL
) => {
  const result = doc
    .font(PdfOptions.FONT_PATH)
    .fontSize(PdfOptions.FONT_SIZE)
    .fillColor(keyColor)
    .text(key, { continued: true })
    .font(PdfOptions.FONT_BOLD_PATH)
    .fillColor(valueColor)
    .text(`${value}`);

  return result;
};
