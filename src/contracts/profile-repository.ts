import { IProfile } from "./profile";

export interface IProfileRepository {
  findAll(): Promise<IProfile[]>;
  findByKey(key: string): Promise<IProfile | null>;
  create(params: Partial<IProfile>): Promise<IProfile>;
  delete(key: string): Promise<boolean>;
  update(key: string, data: Partial<Omit<IProfile, "key">>): Promise<IProfile>;
}
