class CustomError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 200;
  }
}

export default CustomError;
