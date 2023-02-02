import { IUserRequest } from "../../interfaces/users";

export const userMock: IUserRequest = {
  name: "user",
  password: "test123",
  emails: "user@test.com",
  phones: "+55 96 984141178",
};

export const userWithoutAccessEmail: IUserRequest = {
  ...userMock,
  emails: ["manyEmails", userMock.emails as string],
};

export const userWithManyEmailsMock: IUserRequest = {
  ...userWithoutAccessEmail,
  accessEmailPosition: 0,
};
