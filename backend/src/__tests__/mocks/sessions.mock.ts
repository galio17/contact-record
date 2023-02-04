import { ILogin, IUserUpdate } from "../../interfaces/sessions";
import { IUserRequest } from "../../interfaces/users";

export const createUserLoginMock = ({
  emails,
  accessEmail,
  password,
}: IUserRequest): ILogin => {
  if (!Array.isArray(emails)) {
    accessEmail = emails;
    emails = [emails];
  }

  if (!accessEmail) {
    accessEmail = emails[0];
  }

  return { email: accessEmail, password };
};

export const updateUserMock: IUserUpdate = {
  accessEmail: "newEmail@test.com",
  password: "update123",
  name: "userMockUpdated",
  phones: "+55 91 912345678",
};
