import { IProfile } from "./profile";

export interface IProfileRepository {
  findAll(properties: Array<keyof IProfile>): Promise<IProfile[]>;
  findByKey(key: string, withAccessToken?: boolean): Promise<IProfile | null>;
  create(payload: IProfile): Promise<IProfile>;
  delete(key: string): Promise<boolean>;
  update(key: string, data: Partial<Omit<IProfile, "key">>): Promise<IProfile>;
}
