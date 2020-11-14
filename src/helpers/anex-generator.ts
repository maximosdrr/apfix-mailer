import { generateHtml } from "./html-generator";
import { generatePDF } from "./pdf-generator";
import appRoot from "app-root-path";
import fs from "fs";

export const generateOutputs = async (mailerObject: any) => {
  generatePDF(mailerObject);
  var fileName = appRoot.path + "/output/pendencias.html";
  var stream = fs.createWriteStream(fileName);

  stream.once("open", function (fd: any) {
    var html = generateHtml(mailerObject);

    stream.end(html);
  });
};
