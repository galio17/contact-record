import { IUserRequest } from "./users";

export interface ILogin extends Pick<IUserRequest, "password"> {
  email: string;
}
