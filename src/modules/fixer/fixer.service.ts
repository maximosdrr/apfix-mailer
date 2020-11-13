import { ObjectID } from "mongodb";
import { Connection } from "mongoose";
import { IFixer } from "../../models/fixer.model";

export class FixerService {
  constructor(private db: Connection) {
    console.log("[SERVICE]: Fixer Initialized");
  }

  async findOneById(id: string): Promise<IFixer> {
    const result = await this.db
      .collection("fixers")
      .findOne({ _id: new ObjectID(id) });
    return result;
  }
}
