export default interface AuthServiceInterface {
  getAcessToken(username: string, password: string): Promise<string>
}
