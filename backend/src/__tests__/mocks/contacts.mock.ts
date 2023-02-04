import { IContactRequest, IContactUpdate } from "../../interfaces/contacts";

export const contactMock: IContactRequest = {
  name: "contact",
  emails: ["contact1@test.com", "contact2@test.com"],
  phones: ["+55 67 912345678", "+55 83 912345678"],
};

export const updateContactMock: IContactUpdate = {
  name: "contactUpdated",
  emails: ["updateContact@test.com"],
  phones: "+55 43 912345678",
};
