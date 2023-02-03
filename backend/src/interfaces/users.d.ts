export interface IUserRequest {
  emails: string | string[];
  accessEmail?: string;
  password: string;
  name: string;
  phones: string | string[];
}
