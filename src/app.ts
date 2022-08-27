import "express-async-errors";
import express from "express";
import path from "path";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(express.static(path.resolve(__dirname, "./public")));

// error middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
