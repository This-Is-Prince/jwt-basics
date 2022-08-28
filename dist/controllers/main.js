"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const errors_1 = require("../errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // mongo
    // Joi
    // check in the controller
    if (!username || !password) {
        throw new errors_1.BadError("Please provide email and password");
    }
    // just for demo, normally provided by DB!!!!
    const id = new Date().getTime();
    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!
    const token = (0, jsonwebtoken_1.sign)({ id, username }, process.env.JWT_SECRET);
    res.status(200).json({ msg: "user created", token });
});
exports.login = login;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.name}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
});
exports.dashboard = dashboard;
