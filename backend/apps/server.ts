import express from "express";
import bodyParser from "body-parser";

import routes from "./routes";

const app: express.Application = express();
const port: string = process.env["PORT"] || "8000";

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
