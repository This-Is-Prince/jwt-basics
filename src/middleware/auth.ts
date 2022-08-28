import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import {UnauthenticatedError} from "../errors";

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
    throw new UnauthenticatedError("No token provided");
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
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authenticationMiddleware;
