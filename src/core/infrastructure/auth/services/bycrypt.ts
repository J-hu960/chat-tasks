import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EncryptionService } from "src/core/domain/auth/CryptService";
import { Logger, LOGGER_SYMBOL } from "src/core/domain/logger.interface";


@Injectable()
export class BcryptService implements EncryptionService {
  constructor(
    @Inject(LOGGER_SYMBOL) private readonly logger:Logger
  ){}
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    this.logger.debug(`Comparing ${password} with ${hash}`)
    return await bcrypt.compare(password, hash);
  }
}
