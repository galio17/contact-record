import * as yup from "yup";

export const emailValidation = yup.string().email().required();

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
  id: yup.string(),
  name: yup.ref("ownContact.name"),
  emails: yup.ref("ownContact.emails"),
  phones: yup.ref("ownContact.phones"),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  ownContact: contactResponseSchema,
});
