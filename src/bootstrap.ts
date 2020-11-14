import { TIME } from "./constants";
import { IMailerObject } from "./models/mailerObject";
import { Factory } from "./modules/factory/factory.service";
import { generateHtml } from "./modules/mailer/html_generator";
import { MailerService } from "./modules/mailer/mailer.service";

export class Bootstrap {
  constructor(private factory: Factory, private mailerService: MailerService) {
    console.log("[BOOTSTRAP]: Initialized");
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms * 1000));
  }

  async startApplication() {
    console.log("[BOOTSTRAP]: Now running the Application");
    while (true) {
      await this.sendMails();
      await this.sleep(60 * 60 * TIME);
    }
  }

  async sendMails() {
    const condominiums = await this.factory.getCondominiuns();
    for (const i in condominiums) {
      if (condominiums[i].email != "" && condominiums[i].email != null) {
        const mailerObject: IMailerObject = await this.factory.createMailerObject(
          condominiums[i]._id || ""
        );
        await this.mailerService.generateAnex(mailerObject);
        await this.mailerService.send(condominiums[i].email);
      } else {
        console.log(
          `${condominiums[i]._id} não possuia email, portanto não pode ser enviado`
        );
      }
      await this.sleep(20);
    }
  }
}
