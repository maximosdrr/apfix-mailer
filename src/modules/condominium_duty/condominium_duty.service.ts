import { ObjectID } from "mongodb";
import { Connection } from "mongoose";
import { ICondominiumDuty } from "../../models/condominium_duty.model";

export class CondominiumDutyService {
  constructor(private db: Connection) {
    console.log("[SERVICE]: CondominiumDuty Initialized");
  }

  async insert(condominiumDuty: ICondominiumDuty) {
    await this.db
      .collection("condominio_obrigacoes")
      .insertOne(condominiumDuty)
      .then((result) => console.log("Condominio obrigação registrado"))
      .catch((e) => console.log(`${e}`));
  }

  async findAll() {
    const result = await this.db
      .collection("condominio_obrigacoes")
      .find({})
      .toArray();
    console.log(result);
    return result;
  }

  async findByCondominium(condominium: string): Promise<ICondominiumDuty[]> {
    const result = await this.db
      .collection("condominio_obrigacoes")
      .find({ id_condominio: new ObjectID(condominium), status: "PENDENTE" })
      .toArray();
    return result;
  }

  async findByDuty(duty: string) {
    const result = await this.db
      .collection("condominio_obrigacoes")
      .find({ obrigacao: new ObjectID(duty) })
      .toArray();
    return result;
  }

  async findByCondominiumAndDuty(condominium: string, duty: string) {
    const result = await this.db
      .collection("condominio_obrigacoes")
      .find({
        id_condominio: new ObjectID(condominium),
        obrigacao: new ObjectID(duty),
      })
      .toArray();
    return result;
  }

  async findOneById(id: string) {
    const result = await this.db
      .collection("condominio_obrigacoes")
      .findOne({ _id: new ObjectID(id) });
    return result;
  }
}
