export const TIME = 30; //INTERVALO EM HORAS DO ENVIO DOS EMAILS
export const NODE_MAILER_CREDENTIALS = {
  user: "apfix.mailer@gmail.com",
  pass: "hfl197575",
};

export const EMAIL = {
  html: `<h3>
            Apfix: verifique suas pendencias no anexo abaixo
        </h3>
        <p>
            Por favor baixe o arquivo pendencias.html e abra-o diretamente no navegador do
            computador ou do celular para ver as pendencias do seu condominio que foram detectadas pelo ApFix
        </p>
        <h6 style="color: red">Se esse email foi marcado como spam, por favor desmarque-o para recebe-lo diretamente na sua caixa de entrada do email</h6>
        `,

  text: "Suas pendencias do condominio foram atualizadas",
  subject: "Notificando as pendências do condominio",
  from: "noreply@noreply.com",
};

export const MONGO_URI = "mongodb://localhost:27017/apfix_dev";
