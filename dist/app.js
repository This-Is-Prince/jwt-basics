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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
// app
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const main_1 = __importDefault(require("./routes/main"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
// port
const port = process.env.PORT || 3000;
// middleware
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./public")));
app.use(express_1.default.json());
app.use("/api/v1", main_1.default);
// error middleware
app.use(not_found_1.default);
app.use(error_handler_1.default);
// start
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
