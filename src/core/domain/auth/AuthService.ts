export interface AuthTokenService{
    generateToken(userId: string): Promise<string>;
    verifyToken(token: string): Promise<any> ;

}