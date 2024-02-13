import { UserModel } from "./signup";

export type UpdateUser = (user: UserModel) => Promise<UserModel>
