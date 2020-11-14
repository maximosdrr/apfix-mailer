import { EMAIL_DELAY, TIME } from "./constants";
import { generateOutputs } from "./helpers/anex-generator";
import { sleep } from "./helpers/sleep";
import { IMailerObject } from "./models/mailerObject";
import { Factory } from "./modules/factory/factory.service";
import { MailerService } from "./modules/mailer/mailer.service";

export class Bootstrap {
  constructor(private factory: Factory, private mailerService: MailerService) {
    console.log("[BOOTSTRAP]: Initialized");
  }

  async startApplication() {
    console.log("[BOOTSTRAP]: Now running the Application");
    while (true) {
      console.log(
        `[BOOTSTRAP]: A aplicação vai enviar os emails agora, ${
          60 * 60 * TIME
        } segundos se passaram`
      );
      await this.sendMails();
      console.log(
        `[BOOTSTRAP]: A aplicação rodará novamente em ${
          60 * 60 * TIME
        } segundos`
      );
      await sleep(60 * 60 * TIME);
    }
  }

  async sendMails() {
    const condominiums = await this.factory.getCondominiuns();
    for (const i in condominiums) {
      if (condominiums[i].email != "" && condominiums[i].email != null) {
        const mailerObject: IMailerObject[] = await this.factory.createMailerObject(
          condominiums[i]._id || ""
        );
        if (mailerObject.length == 0) {
          console.log(
            `${condominiums[i].email} 
            [BOOTSTRAP]: não possuia pendencias, portanto o email não vai ser enviado`
          );
        } else {
          await generateOutputs(mailerObject);
          await this.mailerService.send(condominiums[i].email);
          await sleep(EMAIL_DELAY);
        }
      } else {
        console.log(
          `[BOOTSTRAP]: ${condominiums[i]._id} não possuia email, portanto o email não pode ser enviado`
        );
      }
    }
  }
}
