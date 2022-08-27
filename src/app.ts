import "express-async-errors";
import express from "express";

// app
const app = express();

import path from "path";
import mainRouter from "./routes/main";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

// port
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());

app.use("/api/v1", mainRouter);

// error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// start
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
