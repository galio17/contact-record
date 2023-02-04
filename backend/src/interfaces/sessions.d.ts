import { IUserRequest } from "./users";

export interface ILogin extends Pick<IUserRequest, "password"> {
  email: string;
}

export interface IUserUpdate extends Partial<IUserRequest> {}
