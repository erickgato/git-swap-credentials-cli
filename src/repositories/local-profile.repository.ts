import { IProfile } from "../contracts/profile";
import { IProfileRepository } from "./../contracts/profile-repository";
import { readFile } from "fs/promises";
import { join } from "path";
import { find, omit, pick } from "lodash";
import { writeFileSync } from "fs";

export class LocalProfileRepository implements IProfileRepository {
  constructor(protected readonly datasourceName: string = "default") {}

  protected get file() {
    return join(
      __dirname,
      "..",
      "..",
      "credentials",
      `${this.datasourceName}.datasource.json`
    );
  }

  public async findAll(properties: Array<keyof IProfile>): Promise<IProfile[]> {
    try {
      const buffer = await readFile(this.file);

      const rawData: Record<string, any> = JSON.parse(buffer.toString());

      return Object.entries(rawData).map(([key, data]) => ({
        key,
        ...(pick(data, properties) as any),
      }));
    } catch (error) {
      return [];
    }
  }

  public async findByKey(
    key: string,
    withToken = false
  ): Promise<IProfile | null> {
    const wantedProperties: Array<keyof IProfile> = [
      "key",
      "email",
      "username",
    ];

    if (withToken) wantedProperties.push("accessToken");

    const allProfiles = await this.findAll(wantedProperties); // todo: add binary search

    const wanted = find(allProfiles, { key });

    if (!wanted) return null;

    return wanted;
  }

  protected async transaction(executor: (profiles: IProfile[]) => IProfile[]) {
    const allProfiles = await this.findAll([
      "accessToken",
      "email",
      "key",
      "username",
    ]);

    const cleaned = executor(allProfiles);

    const toPlain = cleaned.reduce(
      (accumulated, profile) => ({
        ...accumulated,
        [profile.key]: omit(profile, "key"),
      }),
      {}
    );

    writeFileSync(this.file, JSON.stringify(toPlain));
  }

  public async create(payload: IProfile): Promise<IProfile> {
    await this.transaction((profiles) => {
      profiles.push(payload);

      return profiles;
    });

    return payload;
  }

  public async delete(key: string): Promise<boolean> {
    try {
      await this.transaction((profiles) =>
        profiles.filter((profile) => profile.key !== key)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  public async update(
    key: string,
    data: Partial<Omit<IProfile, "key">>
  ): Promise<IProfile> {
    let updateResult = {} as IProfile;

    await this.transaction((profiles) => {
      return profiles.map((profile) => {
        if (profile.key === key) {
          const batch = {
            ...profile,
            ...data,
          } as IProfile;

          updateResult = batch;

          return batch;
        }

        return profile;
      });
    });

    return updateResult;
  }
}

export default new LocalProfileRepository() as IProfileRepository;
