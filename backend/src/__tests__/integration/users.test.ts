import supertest from "supertest";

import app from "../../app";
import {
  userMock,
  userWithManyEmailsMock,
  userWithoutAccessEmailMock,
} from "../mocks";

describe("POST /users", () => {
  describe("should be able to create a user", () => {
    test("with one email", async () => {
      const response = await supertest(app).post("/users").send(userMock);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: userMock.name,
        emails: [userMock.emails],
        phones: [userMock.phones],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    test("with many emails", async () => {
      const response = await supertest(app)
        .post("/users")
        .send(userWithManyEmailsMock);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: userWithManyEmailsMock.name,
        emails: userWithManyEmailsMock.emails,
        phones: [userWithManyEmailsMock.phones],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe("should not be able to create a user", () => {
    test("without required fields", async () => {
      const response = await supertest(app).post("/users");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: expect.arrayContaining([
          expect.stringMatching(/^(?=.*name)(?=.*required).*$/i),
          expect.stringMatching(/^(?=.*emails)(?=.*required).*$/i),
          expect.stringMatching(/^(?=.*password)(?=.*required).*$/i),
          expect.stringMatching(/^(?=.*valid)(?=.*phone).*$/i),
        ]),
        typeError: expect.any(String),
      });
    });

    test("with many emails without access email", async () => {
      const response = await supertest(app)
        .post("/users")
        .send(userWithoutAccessEmailMock);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: expect.arrayContaining([
          expect.stringMatching(/^(?=.*required)(?=.*accessEmail).*$/i),
        ]),
        typeError: expect.any(String),
      });
    });

    test("with email already registered", async () => {
      const response = await supertest(app).post("/users").send(userMock);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        message: expect.any(String),
        typeError: expect.any(String),
      });
    });
  });
});
