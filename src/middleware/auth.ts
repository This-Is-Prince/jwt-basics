import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import CustomError from "../errors";

declare global {
  namespace Express {
    export interface Request {
      user: {
        [key: string]: string;
      };
    }
  }
}
const authenticationMiddleware: RequestHandler = async (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new CustomError("No token provided", 401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const { id, username } = decoded;
    req.user = { id, name: username };
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this route", 401);
  }
};

export default authenticationMiddleware;
