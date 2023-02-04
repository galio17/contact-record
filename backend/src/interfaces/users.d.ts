import { IContactRequest } from "./contacts";

export interface IUserRequest extends IContactRequest {
  accessEmail?: string;
  password: string;
}
