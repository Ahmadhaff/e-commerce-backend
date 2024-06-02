import Role, { RoleModel } from '../model/Role';

export default class RoleRepo {
  public static findByCode(code: string): Promise<Role | null> {
    return RoleModel.findOne({ code: code }).lean<Role>().exec();
  }
}
