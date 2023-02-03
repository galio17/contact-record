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

      expect(response.body).toEqual({
        id: expect.any(String),
        name: userMock.name,
        emails: [userMock.emails],
        phones: [userMock.phones],
        isActive: true,
      });
      expect(response.status).toBe(201);
    });

    test("with many emails", async () => {
      const response = await supertest(app)
        .post("/users")
        .send(userWithManyEmailsMock);

      expect(response.body).toEqual({
        id: expect.any(String),
        name: userWithManyEmailsMock.name,
        emails: userWithManyEmailsMock.emails,
        phones: [userWithManyEmailsMock.phones],
      });
      expect(response.status).toBe(201);
    });
  });

  describe("should not be able to create a user", () => {
    test("without required fields", async () => {
      const response = await supertest(app).post("/users");

      expect(response.body).toEqual({
        message: expect.arrayContaining([
          expect.stringMatching(/^(?=.*required)(?=.*name).$/),
          expect.stringMatching(/^(?=.*required)(?=.*emails).$/),
          expect.stringMatching(/^(?=.*required)(?=.*password).$/),
          expect.stringMatching(/^(?=.*required)(?=.*phones).$/),
        ]),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(400);
    });

    test("with many emails without access email", async () => {
      const response = await supertest(app)
        .post("/users")
        .send(userWithoutAccessEmailMock);

      expect(response.body).toEqual({
        message: expect.arrayContaining([
          expect.stringMatching(/^(?=.*required)(?=.*accessEmail).$/),
        ]),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(400);
    });

    test("with email already registered", async () => {
      const response = await supertest(app).post("/users").send(userMock);

      expect(response.body).toEqual({
        message: expect.any(String),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });
  });
});
