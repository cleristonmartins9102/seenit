export interface GetUserAccountToken {
  getToken (otp: string, idoffertask: string): Promise<string>
}
