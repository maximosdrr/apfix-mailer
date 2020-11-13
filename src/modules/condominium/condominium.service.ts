import { ObjectID } from "mongodb";
import { Connection, Mongoose } from "mongoose";
import { ICondominium } from "../../models/condominium.model";

export class CondominiumService {
  constructor(private db: Connection) {
    console.log("[SERVICE]: Condominium Initialized");
  }

  async insert(condominium: ICondominium) {
    return this.db
      .collection("condominios")
      .insertOne(condominium)
      .then((result) => {
        console.log("Condominio inserido!");
      })
      .catch((err) => {
        console.log("Erro ao inserir");
      });
  }

  async findAll(): Promise<ICondominium[]> {
    const result = await this.db.collection("condominios").find({}).toArray();
    return result;
  }

  async findOneById(id: string): Promise<ICondominium> {
    const result = await this.db
      .collection("condominios")
      .findOne({ _id: new ObjectID(id) });
    return result;
  }
}
