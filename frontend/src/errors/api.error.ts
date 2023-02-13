export const apiError = (
  error: unknown,
  ...conditions: [string | RegExp, string][]
) => {
  if (typeof error === "string") {
    error = [error];
  }

  if (Array.isArray(error)) {
    const translateMessages = error.map((message) => {
      conditions.forEach(([expectedMessage, responseMessage]) => {
        expectedMessage = new RegExp(expectedMessage);
        if (expectedMessage.test(message)) {
          message = responseMessage;
        }
      });

      return message;
    });

    return translateMessages.join("\n");
  }
};
