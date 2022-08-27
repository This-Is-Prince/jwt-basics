import { RequestHandler } from "express";
import CustomError from "../errors";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
config();

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  // mongo
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new CustomError("Please provide email and password", 400);
  }

  // just for demo, normally provided by DB!!!!
  const id = new Date().getTime();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!
  const token = sign({ id, username }, process.env.JWT_SECRET as string);

  res.status(200).json({ msg: "user created", token });
};

const dashboard: RequestHandler = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

export { login, dashboard };
