import { UserModel } from "./signup"

export type LoadUsers = () => Promise<UserModel[]>