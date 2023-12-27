import * as dotenv from "dotenv";
dotenv.config();
import { createConnection } from "typeorm";
import { App } from "./app";
import { Log } from "./helpers/logger";

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

// create logger
const logger = Log.getLogger();

const expr = new App();

// connect to database
createConnection().then(connection => {
  expr.app.listen(PORT, () => {
    logger.info(
      `The server is running in port localhost: ${PORT} &&
          The connection established: ${connection.isConnected.toString()}`
    );
  });
}).catch(err => {
  if (err instanceof Error) {
    logger.error(`orm database connection error: ${err.message}`);
  } else {
    logger.error('orm database connection error');
  }
});