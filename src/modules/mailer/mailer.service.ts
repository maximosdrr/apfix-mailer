import { EMAIL, NODE_MAILER_CREDENTIALS } from "../../constants";
import { generateHtml } from "./html_generator";

var nodemailer = require("nodemailer");
var fs = require("fs");

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
          path: __dirname + "/output.html",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        throw error;
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  async generateAnex(mailerObject: any) {
    var fileName = __dirname + "/output.html";
    var stream = fs.createWriteStream(fileName);

    stream.once("open", function (fd: any) {
      var html = generateHtml(mailerObject);

      stream.end(html);
    });
  }

  async deleteAnex() {
    var fileName = __dirname + "/output.html";
    await fs.unlink(fileName, (err: any) => {
      if (err) throw err;
    });
  }
}
