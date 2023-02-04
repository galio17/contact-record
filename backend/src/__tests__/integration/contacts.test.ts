import supertest from "supertest";
import app from "../../app";
import { createUserPrisma } from "../../utils";
import {
  contactMock,
  createUserLoginMock,
  userWithManyEmailsMock,
} from "../mocks";

let authorization = "Bearer";

beforeAll(async () => {
  await createUserPrisma(userWithManyEmailsMock);

  const userLoginMock = createUserLoginMock(userWithManyEmailsMock);
  const response = await supertest(app).post("/login").send(userLoginMock);
  authorization += response.body.token;
});

describe("GET /contacts", () => {
  test("should be able to list own contacts", async () => {
    const response = await supertest(app)
      .get("/contacts")
      .set("Authorizaation", authorization);

    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        name: contactMock.name,
        emails: contactMock.emails,
        phones: contactMock.phones,
      },
    ]);
    expect(response.status).toBe(200);
  });

  describe("should not be able to get contacts", () => {
    test("without authorization", async () => {
      const response = await supertest(app).get("/contacts");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).$/i),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("without token", async () => {
      const response = await supertest(app)
        .get("/contacts")
        .set("Authorization", "Bearer");

      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).$/i),
        typeError: expect.any(String),
      });
      expect(response.status).toBe(401);
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .get("/contacts")
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
