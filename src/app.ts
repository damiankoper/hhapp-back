import * as bodyParser from 'body-parser';
import * as express from 'express';
import { createConnection, getConnection } from 'typeorm';
import UsersRouter from './api/routes/users.router';

export default class App {
  private port: number;
  public constructor(port: number) {
    this.port = port;
  }

  public async run() {
    // create typeorm connection
    const connection = await createConnection();
    // create and setup express app
    const app = express();
    app.use(bodyParser.json());
    app.use('/users', UsersRouter);
    app.listen(this.port);

    process.on('SIGINT', async () => {
      await connection.close();
      process.exit();
    });

    return app;
  }

  public async destroy() {
    await getConnection().close();
  }
}
