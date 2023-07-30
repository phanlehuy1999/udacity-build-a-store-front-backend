import express from "express";
import bodyParser from "body-parser";
import { initUserRoutes, initProductRoutes, initOrderRoutes } from "./routes";

const app: express.Application = express();
const {
  ENV,
} = process.env;
const address: string = `localhost:${ENV === 'dev' ? 3000 : 3001}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initUserRoutes(app);
initProductRoutes(app);
initOrderRoutes(app);

app.listen(ENV === 'dev' ? 3000 : 3001, function () {
  console.log(`starting app on: ${address}`);
});

export default app;