export const apiError = (error: unknown, ...conditions: [string, string][]) => {
  if (typeof error === "string") {
    error = [error];
  }

  if (Array.isArray(error)) {
    const translateMessages = error.map((message) => {
      conditions.forEach(([expectedMessage, responseMessage]) => {
        if (message === expectedMessage) {
          message = responseMessage;
        }
      });

      return message;
    });

    return translateMessages.join("\n");
  }
};
