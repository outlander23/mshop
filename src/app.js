import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import router from "./routers/router.js";
import { globalErrorHandler, urlNotFound } from "./errors/index.js";

const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1", router);

app.all("*", urlNotFound);

app.use(globalErrorHandler);

export default app;
