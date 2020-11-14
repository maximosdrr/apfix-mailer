"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.EMAIL = exports.NODE_MAILER_CREDENTIALS = exports.EMAIL_DELAY = exports.TIME = void 0;
exports.TIME = 1; //INTERVALO EM HORAS DO ENVIO DOS EMAILS
exports.EMAIL_DELAY = 20;
exports.NODE_MAILER_CREDENTIALS = {
    user: "apfix.mailer@gmail.com",
    pass: "hfl197575",
};
exports.EMAIL = {
    html: "<h3>\n            Apfix: verifique suas pendencias no anexo abaixo\n        </h3>\n        <p>\n            Por favor baixe o arquivo pendencias.html e abra-o diretamente no navegador do\n            computador ou do celular para ver as pendencias do seu condominio que foram detectadas pelo ApFix\n        </p>\n        <h6 style=\"color: red\">Se esse email foi marcado como spam, por favor desmarque-o para recebe-lo diretamente na sua caixa de entrada do email</h6>\n        ",
    text: "Suas pendencias do condominio foram atualizadas",
    subject: "Notificando as pendências do condominio",
    from: "noreply@noreply.com",
};
exports.MONGO_URI = "mongodb://localhost:27017/apfix_dev";
