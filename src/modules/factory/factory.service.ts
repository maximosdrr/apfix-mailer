import { ICondominium } from "../../models/condominium.model";
import { IMailerObject } from "../../models/mailerObject";
import { CondominiumService } from "../condominium/condominium.service";
import { CondominiumDutyService } from "../condominium_duty/condominium_duty.service";
import { DutyService } from "../duty/duty.service";
import { FixerService } from "../fixer/fixer.service";

export class Factory {
  constructor(
    private condominiumDutyService: CondominiumDutyService,
    private dutyService: DutyService,
    private condominiumService: CondominiumService,
    private fixerService: FixerService
  ) {
    console.log("[SERVICE]: Factory Initialized");
  }
  async createMailerObject(condominiumId: string): Promise<IMailerObject> {
    const mailerObject: any = [];

    const condominiumDutys = await this.condominiumDutyService.findByCondominium(
      condominiumId
    );

    for (let i in condominiumDutys) {
      //Recupera objetos
      const dutyId = condominiumDutys[i].obrigacao || "";
      const fixerId = condominiumDutys[i].fixer || "";
      const duty = (await this.dutyService.findOne(dutyId)) || {};
      const fixer = await this.fixerService.findOneById(fixerId);
      // Fim recupera objetos

      //RECUPERA VARIAVEIS
      const name = duty.nome_obrigacao || "?";
      const period = duty.periodicidade_manutencao || {
        qtd_tempo: "?",
        medida: "?",
      };
      const status = condominiumDutys[i].status || "SEM STATUS";
      const nextTime =
        condominiumDutys[i].data_proxima_realizacao || "00/00/00";
      const estimatedValue = condominiumDutys[i].valor_estimado || 0;
      const responsible = condominiumDutys[i].nome_empresa_executante || "?";
      const lastTime = condominiumDutys[i].data_realizacao || "00/00/00";
      const value = condominiumDutys[i].valor_gasto || 0;
      const category = fixer.nome_fixer || "Sem categoria";
      const rest: IMailerObject = {
        name,
        period: `${period.qtd_tempo || "?"} ${period.medida || "?"}`,
        status,
        nextTime,
        estimatedValue,
        responsible,
        lastTime,
        value,
        category,
      };
      mailerObject.push(rest);
    }
    return mailerObject;
  }

  async createMailerList(): Promise<IMailerObject[]> {
    const condominiums = await this.condominiumService.findAll();
    const mailerObjects: IMailerObject[] = [];
    for (const i in condominiums) {
      const id = condominiums[i]._id;
      const mailerObject = await this.createMailerObject(id || "");
      mailerObjects.push(mailerObject);
    }

    console.log(mailerObjects);
    return mailerObjects;
  }

  async getCondominiuns(): Promise<ICondominium[]> {
    return this.condominiumService.findAll();
  }
}
