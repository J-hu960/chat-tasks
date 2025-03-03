import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EncryptionService } from "src/core/domain/auth/CryptService";


@Injectable()
export class BcryptService implements EncryptionService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
