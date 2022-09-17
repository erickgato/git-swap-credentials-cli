import { IProfile } from "../contracts/profile";
import { IProfileRepository } from "./../contracts/profile-repository";
import { readFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";
import { omit } from "lodash";

export class LocalProfileRepository implements IProfileRepository {
  constructor(protected readonly datasourceName: string = "default") {}

  protected get file() {
    return join(cwd(), "credentials", `${this.datasourceName}.datasource.json`);
  }

  public async findAll(): Promise<IProfile[]> {
    try {
      const buffer = await readFile(this.file);

      const rawData: Record<string, any> = JSON.parse(buffer.toString());

      return Object.entries(rawData).map(([key, data]) => ({
        key,
        ...(omit(data, "accessToken") as any),
      }));
    } catch (error) {
      return [];
    }
  }

  findByKey(key: string): Promise<IProfile | null> {
    throw new Error("Method not implemented.");
  }
  create(params: Partial<IProfile>): Promise<IProfile> {
    throw new Error("Method not implemented.");
  }
  delete(key: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(key: string, data: Partial<Omit<IProfile, "key">>): Promise<IProfile> {
    throw new Error("Method not implemented.");
  }
}

export default new LocalProfileRepository() as IProfileRepository;
