import supertest from "supertest";
import app from "../../app";
import { ILogin } from "../../interfaces/sessions";
import { createUserPrisma } from "../../utils";
import { createUserLoginMock, userWithManyEmailsMock } from "../mocks";

const userLoginMock = createUserLoginMock(userWithManyEmailsMock);
let authorization = "Bearer ";

beforeAll(async () => {
  await createUserPrisma(userWithManyEmailsMock);
});

describe("POST /login", () => {
  test("should be able to login", async () => {
    const response = await supertest(app).post("/login").send(userLoginMock);
    authorization += response.body.token;

    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.status).toBe(200);
  });

  describe("should not be able to login", () => {
    test("without required fields", async () => {
      const response = await supertest(app).post("/login");

      expect(response.body).toEqual({
        message: expect.arrayContaining([
          expect.stringMatching(/^(?=.*required)(?=.*email).$/),
          expect.stringMatching(/^(?=.*required)(?=.*password).$/),
        ]),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(400);
    });

    test("with wrong email", async () => {
      const wrongLogin: ILogin = {
        ...userLoginMock,
        email: "wrongEmail@test.com",
      };

      const response = await supertest(app).post("/login").send(wrongLogin);

      expect(response.body).toEqual({
        message: expect.stringMatching(
          /^(?=.*email)(?=.*password)(?=.*match).$/
        ),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("with wrong password", async () => {
      const wrongLogin: ILogin = {
        ...userLoginMock,
        password: "wrong123",
      };

      const response = await supertest(app).post("/login").send(wrongLogin);

      expect(response.body).toEqual({
        message: expect.stringMatching(
          /^(?=.*email)(?=.*password)(?=.*match).$/
        ),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });
  });
});

describe("GET /profile", () => {
  test("should be able to get profile", async () => {
    const response = await supertest(app)
      .get("/profile")
      .set("Authorization", authorization);

    expect(response.body).toEqual({
      id: expect.any(String),
      name: userWithManyEmailsMock.name,
      emails: userWithManyEmailsMock.emails,
      phones: [userWithManyEmailsMock.phones],
    });
    expect(response.status).toBe(200);
  });

  describe("should not be able to get profile", () => {
    test("without authorization", async () => {
      const response = await supertest(app).get("/profile");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).$/),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("without token", async () => {
      const response = await supertest(app)
        .get("/profile")
        .set("Authorization", "Bearer");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).$/),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .get("/profile")
        .set("Authorization", "Bearer potato");

      expect(response.body).toEqual({
        message: expect.stringMatching(
          /^(?=.*invalid)(?=.*expired)(?=.*token).$/
        ),
      });
      expect(response.status).toBe(401);
    });
  });
});
