import { IUserRequest } from "../../interfaces/users";

export const userMock: IUserRequest = {
  name: "userMock",
  password: "test123",
  emails: "user@test.com",
  phones: "+55 96 912345678",
};

export const userWithoutAccessEmailMock: IUserRequest = {
  ...userMock,
  emails: ["manyEmails@test.com", "otherEmail@test.com"],
};

export const userWithManyEmailsMock: IUserRequest = {
  ...userWithoutAccessEmailMock,
  accessEmail: "manyEmails@test.com",
};
