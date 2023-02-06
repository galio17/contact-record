import supertest from "supertest";
import app from "../../app";
import { createUserPrisma } from "../../utils";
import {
  contactMock,
  createUserLoginMock,
  updateContactMock,
  userWithManyEmailsMock,
} from "../mocks";

let authorization = "Bearer";
let contactId: string;

beforeAll(async () => {
  await createUserPrisma(userWithManyEmailsMock);

  const userLoginMock = createUserLoginMock(userWithManyEmailsMock);
  const response = await supertest(app).post("/login").send(userLoginMock);
  authorization += response.body.token;
});

describe("POST /contacts", () => {
  test("should be able to create contact", async () => {
    const response = await supertest(app)
      .post("/contacts")
      .send(contactMock)
      .set("Authorization", authorization);
    contactId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: contactMock.name,
      emails: contactMock.emails,
      phones: contactMock.phones,
    });
  });

  describe("should not be able to create contacts", () => {
    test("without authorization", async () => {
      const response = await supertest(app).post("/contacts");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).*$/i),
        typeError: expect.any(String),
      });
    });

    test("without token", async () => {
      const response = await supertest(app)
        .post("/contacts")
        .set("Authorization", "Bearer");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).*$/i),
        typeError: expect.any(String),
      });
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .post("/contacts")
        .set("Authorization", "Bearer potato");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.any(String),
        typeError: expect.any(String),
      });
    });

    test("without required fields", async () => {
      const response = await supertest(app).post("/users");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: expect.arrayContaining([
          expect.stringMatching(/^(?=.*required)(?=.*name).*$/i),
          expect.stringMatching(/^(?=.*required)(?=.*emails).*$/i),
          expect.stringMatching(/^(?=.*required)(?=.*phones).*$/i),
        ]),
        typeError: expect.any(String),
      });
    });
  });
});

describe("GET /contacts", () => {
  test("should be able to list own contacts", async () => {
    const response = await supertest(app)
      .get("/contacts")
      .set("Authorizaation", authorization);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual([
      {
        id: contactId,
        name: contactMock.name,
        emails: contactMock.emails,
        phones: contactMock.phones,
      },
    ]);
  });

  describe("should not be able to get contacts", () => {
    test("without authorization", async () => {
      const response = await supertest(app).get("/contacts");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).*$/i),
        typeError: expect.any(String),
      });
    });

    test("without token", async () => {
      const response = await supertest(app)
        .get("/contacts")
        .set("Authorization", "Bearer");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).*$/i),
        typeError: expect.any(String),
      });
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .get("/contacts")
        .set("Authorization", "Bearer potato");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.any(String),
        typeError: expect.any(String),
      });
    });
  });
});

describe("GET /contacts/:id", () => {
  test("should be able to get one contact", async () => {
    const response = await supertest(app)
      .get(`/contacts/${contactId}`)
      .set("Authorization", authorization);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: contactId,
      name: contactMock.name,
      emails: contactMock.emails,
      phones: contactMock.phones,
    });
  });

  describe("should not be able to get contacts/id", () => {
    test("without authorization", async () => {
      const response = await supertest(app).get(`/contacts/${contactId}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).*$/i),
        typeError: expect.any(String),
      });
    });

    test("without token", async () => {
      const response = await supertest(app)
        .get(`/contacts/${contactId}`)
        .set("Authorization", "Bearer");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).*$/i),
        typeError: expect.any(String),
      });
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .get(`/contacts/${contactId}`)
        .set("Authorization", "Bearer potato");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.any(String),
        typeError: expect.any(String),
      });
    });
  });
});

describe("PATCH /contacts/:id", () => {
  test("should be able to update contact", async () => {
    const response = await supertest(app)
      .patch(`/contacts/${contactId}`)
      .send(updateContactMock)
      .set("Authorization", authorization);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: updateContactMock.name,
      emails: updateContactMock.emails,
      phones: [updateContactMock.phones],
    });
  });

  describe("should not be able to update contact", () => {
    test("without authorization", async () => {
      const response = await supertest(app).patch(`/contacts/${contactId}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).*$/i),
        typeError: expect.any(String),
      });
    });

    test("without token", async () => {
      const response = await supertest(app)
        .patch(`/contacts/${contactId}`)
        .set("Authorization", "Bearer");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).*$/i),
        typeError: expect.any(String),
      });
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .patch(`/contacts/${contactId}`)
        .set("Authorization", "Bearer potato");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.any(String),
        typeError: expect.any(String),
      });
    });
  });
});

describe("DELETE /contacts/:id", () => {
  test("should be able to delete contact", async () => {
    const response = await supertest(app)
      .delete(`/contacts/${contactId}`)
      .set("Authorization", authorization);

    expect(response.status).toBe(204);
    expect(response.body).toBe(undefined);
  });

  describe("should not be able to delete contacts/id", () => {
    test("without authorization", async () => {
      const response = await supertest(app).delete(`/contacts/${contactId}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*authorization).*$/i),
        typeError: expect.any(String),
      });
    });

    test("without token", async () => {
      const response = await supertest(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", "Bearer");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.stringMatching(/^(?=.*miss)(?=.*token).*$/i),
        typeError: expect.any(String),
      });
    });

    test("with invalid/expired token", async () => {
      const response = await supertest(app)
        .delete(`/contacts/${contactId}`)
        .set("Authorization", "Bearer potato");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: expect.any(String),
        typeError: expect.any(String),
      });
    });
  });
});
