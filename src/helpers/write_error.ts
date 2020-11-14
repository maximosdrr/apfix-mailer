import fs from "fs";

export const WriteError = (e: any, fileName: string) => {
  fs.appendFile(
    fileName,
    `\n ---------------------------------------------------- \n ${e} \n`,
    (err) => {
      if (err) throw err;
      console.log("[ERROR]: NOVO ERRO REPORTADO, VERIFIQUE OS LOGS");
    }
  );
};
