export interface EncryptionService{
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}

export const ENCRYPTION_SERVICE = Symbol('encryption-service')