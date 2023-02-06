class AppError {
  message: string | string[];
  name: string;
  statusCode: number;

  constructor(
    message: string | string[],
    statusCode = 400,
    name: string = "AppError"
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
  }
}

export default AppError;
