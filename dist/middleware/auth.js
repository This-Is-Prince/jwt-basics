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
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("../errors");
const authenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
        throw new errors_1.UnauthenticatedError("No token provided");
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, name: username };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Not authorized to access this route");
    }
});
exports.default = authenticationMiddleware;
