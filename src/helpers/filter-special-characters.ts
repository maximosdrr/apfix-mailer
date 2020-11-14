import { IMailerObject } from "../models/mailerObject";

export const filterSpecialCharacters = (mailerObject: IMailerObject) => {
  mailerObject.name = mailerObject.name.replace(
    /[&\/\\#,+()$~%.'":*?<>{}`]/g,
    ""
  );
  mailerObject.category = mailerObject.category.replace(
    /[&\/\\#,+()$~%.'":*?<>{}`]/g,
    ""
  );
  mailerObject.period = mailerObject.period.replace(
    /[&\/\\#,+()$~%.'":*?<>{}`]/g,
    ""
  );
  mailerObject.responsible = mailerObject.responsible.replace(
    /[&\/\\#,+()$~%.'":*?<>{}`]/g,
    ""
  );
  mailerObject.status = mailerObject.status.replace(/[^a-zA-Z ]/g, "");
  return mailerObject;
};
