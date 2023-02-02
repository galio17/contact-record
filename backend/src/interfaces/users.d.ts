export interface IUserRequest {
  emails: string | string[];
  accessEmailPosition?: number;
  password: string;
  name: string;
  phones: string | string[];
}
