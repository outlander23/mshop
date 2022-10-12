import * as dotenv from "dotenv";
dotenv.config();

import connectToMongoDB from "./db/connectToDB.js";

await connectToMongoDB();

import app from "./app.js";
import { createServer } from "http";
import { PORT } from "./utils/env.js";

const server = createServer(app);
server.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
