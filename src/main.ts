import { Bootstrap } from "./bootstrap";
import { CondominiumService } from "./modules/condominium/condominium.service";
import { CondominiumDutyService } from "./modules/condominium_duty/condominium_duty.service";
import { DutyService } from "./modules/duty/duty.service";
import { Factory } from "./modules/factory/factory.service";
import { FixerService } from "./modules/fixer/fixer.service";
import { MailerService } from "./modules/mailer/mailer.service";
import { MongoConnection } from "./modules/mongo/connection";
import { WriteError } from "./modules/write_error/write_erro";

export async function run() {
  const conn = await new MongoConnection().getConnection();
  const condominiumDutyService = new CondominiumDutyService(conn);
  const condominiumService = new CondominiumService(conn);
  const dutyService = new DutyService(conn);
  const fixerService = new FixerService(conn);
  const mailerService = new MailerService();
  const factory = new Factory(
    condominiumDutyService,
    dutyService,
    condominiumService,
    fixerService
  );
  const bootstrap = new Bootstrap(factory, mailerService);
  try {
    bootstrap.startApplication();
  } catch (e) {
    WriteError(e, `${__dirname.replace("src", "")}/logs/error_log.txt`);
  }
}

run();
