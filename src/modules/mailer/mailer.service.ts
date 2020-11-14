import { EMAIL, NODE_MAILER_CREDENTIALS } from "../../constants";
import { WriteError } from "../../helpers/write_error";
import appRoot from "app-root-path";

var nodemailer = require("nodemailer");

export class MailerService {
  async send(to: string) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODE_MAILER_CREDENTIALS.user,
        pass: NODE_MAILER_CREDENTIALS.pass,
      },
    });

    var mailOptions = {
      from: EMAIL.from,
      to: to,
      subject: EMAIL.subject,
      text: EMAIL.text,
      html: EMAIL.html,
      attachments: [
        {
          filename: "pendencias.html",
          path: appRoot.path + "/output/pendencias.html",
        },
        {
          filename: "pendencias.pdf",
          path: appRoot.path + "/output/pendencias.pdf",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log("Um erro ocorreu ao tentar enviar o email");
        WriteError(error, appRoot.path + "/logs/error_log.txt");
      } else {
        console.log("Email sent: " + to);
      }
    });
  }
}
