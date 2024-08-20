import express from "express";
import { dbConnection } from "./dataBase/dbConnection.js";
import { bootstrap } from "./src/modules/index.routes.js";
import { globalErrorHandler } from "./src/middleware/globalErrorHandling.js";
import { AppError } from "./src/utils/AppError.js";

import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = 3000;
app.use(express.json());
app.use('/uploads', express.static('uploads'))
bootstrap(app);
dbConnection();

// handling invalid routes or endpoint errors
app.use("*", (req, res, next) => {
  next(new AppError(`not found this endPoint ${req.originalUrl}`, 404 ));
});
app.use(globalErrorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
