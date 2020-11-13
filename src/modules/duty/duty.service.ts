import { ObjectID } from "mongodb";
import { Connection } from "mongoose";
import { IDuty } from "../../models/duty.model";

export class DutyService {
  constructor(private db: Connection) {
    console.log("[SERVICE]: Duty Initialized");
  }

  async insert(duty: IDuty) {
    this.db
      .collection("obrigacoes")
      .insertOne(duty)
      .then((result) => console.log("Obrigação adiciona"))
      .catch((e) => console.log(`${e}`));
  }

  async findAll() {
    const result = await this.db.collection("obrigacoes").find({}).toArray();
    return result;
  }

  async findOne(id: string): Promise<IDuty> {
    const result = this.db
      .collection("obrigacoes")
      .findOne({ _id: new ObjectID(id) });
    return result;
  }
}
