import express from "express";
import bodyParser from "body-parser";
import { initUserRoutes, initProductRoutes, initOrderRoutes } from "./routes";

const app: express.Application = express();
const address: string = "localhost:3000";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initUserRoutes(app);
initProductRoutes(app);
initOrderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
