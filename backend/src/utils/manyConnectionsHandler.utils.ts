export const manyConnectionsHandler = (contact: string) => ({
  connection: {
    connectOrCreate: {
      where: {
        contact,
      },
      create: { contact },
    },
  },
});
