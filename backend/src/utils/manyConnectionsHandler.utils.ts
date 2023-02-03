export const manyConnectionsHandler = (contact: string) => ({
  connection: {
    create: { contact },
  },
});
