import { compareSync } from "bcryptjs";
import supertest from "supertest";

import app from "../../app";
import { ILogin } from "../../interfaces/sessions";
import prisma from "../../prisma";
import { createUserPrisma } from "../../utils";
import {
  createUserLoginMock,
  updateUserMock,
  userWithManyEmailsMock,
} from "../mocks";

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
          expect.stringMatching(/^(?=.*required)(?=.*email).$/i),
          expect.stringMatching(/^(?=.*required)(?=.*password).$/i),
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
          /^(?=.*email)(?=.*password)(?=.*match).$/i
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
          /^(?=.*email)(?=.*password)(?=.*match).$/i
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
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).$/i),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("without token", async () => {
      const response = await supertest(app)
        .get("/profile")
        .set("Authorization", "Bearer");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).$/i),
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
          /^(?=.*invalid)(?=.*expired)(?=.*token).$/i
        ),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });
  });
});

describe("PATCH /profile", () => {
  test("should be able to update profile", async () => {
    const response = await supertest(app)
      .patch("/profile")
      .send(updateUserMock)
      .set("Authorization", authorization);

    expect(response.body).toEqual({
      id: expect.any(String),
      name: updateUserMock.name,
      emails: [
        ...(updateUserMock.emails as string),
        updateUserMock.accessEmail,
      ],
      phones: [updateUserMock.phones],
      isActive: true,
    });
    expect(response.status).toBe(200);

    const updatedUser = await prisma.user.findUnique({
      where: { email: updateUserMock.accessEmail },
    });
    const checkPassword = compareSync(
      updateUserMock.password!,
      updatedUser!.password
    );

    expect(checkPassword).toBe(true);
  });

  describe("should not be able to update profile", () => {
    test("without authorization", async () => {
      const response = await supertest(app).patch("/profile");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).$/i),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("without token", async () => {
      const response = await supertest(app)
        .patch("/profile")
        .set("Authorization", "Bearer");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).$/i),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .patch("/profile")
        .set("Authorization", "Bearer potato");

      expect(response.body).toEqual({
        message: expect.stringMatching(
          /^(?=.*invalid)(?=.*expired)(?=.*token).$/i
        ),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });
  });
});

describe("DELETE /profile", () => {
  test("should be able to delete profile", async () => {
    const response = await supertest(app)
      .delete("/profile")
      .set("Authorization", authorization);

    expect(response.body).toEqual({
      message: expect.stringMatching(/^(?=.*user)(?=.*delete).$/i),
    });
  });

  describe("should not be able to delete profile", () => {
    test("without authorization", async () => {
      const response = await supertest(app).delete("/profile");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).$/i),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("without token", async () => {
      const response = await supertest(app)
        .delete("/profile")
        .set("Authorization", "Bearer");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).$/i),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .delete("/profile")
        .set("Authorization", "Bearer potato");

      expect(response.body).toEqual({
        message: expect.stringMatching(
          /^(?=.*invalid)(?=.*expired)(?=.*token).$/i
        ),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });
  });
});
