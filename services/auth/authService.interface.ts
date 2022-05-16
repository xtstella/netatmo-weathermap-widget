export default interface AuthServiceInterface {
  getAcessToken(clientId: string, clientSecret: string, username: string, password: string): Promise<string>
}
