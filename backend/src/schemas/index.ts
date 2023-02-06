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
  updatedAt: yup.string(),
  createdAt: yup.string(),
  phones: yup.array().of(yup.string()).transform(transformConnections),
  emails: yup.array().of(yup.string()).transform(transformConnections),
  name: yup.string(),
  id: yup.string(),
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
