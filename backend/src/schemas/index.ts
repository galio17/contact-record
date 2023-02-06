import "yup-phone";

import * as yup from "yup";

export const emailValidation = yup.string().email();
export const phoneValidation = yup.string().phone("BR");

const transformConnections = (
  connections: { connection: { contact: string } }[]
) => {
  return connections.map(({ connection }) => connection.contact);
};
export const contactResponseSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  emails: yup.array().of(yup.string()).transform(transformConnections),
  phones: yup.array().of(yup.string()).transform(transformConnections),
  createdAt: yup.string(),
  updatedAt: yup.string(),
});

export const userResponseSchema = yup.object().shape({
  ownContact: contactResponseSchema,
  updatedAt: yup.string(),
  createdAt: yup.string(),
  phones: yup.ref("ownContact.phones"),
  emails: yup.ref("ownContact.emails"),
  name: yup.ref("ownContact.name"),
  id: yup.string(),
});
