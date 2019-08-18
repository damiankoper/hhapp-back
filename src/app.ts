import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Server } from 'net';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import UsersRouter from './api/routes/users.router';

interface IAppConfig {
  logging?: boolean | 'all' | string[] | undefined;
  port: number;
}

export default class App {
  private http!: Server;
  private config: IAppConfig;
  public constructor(config: IAppConfig) {
    this.config = config;
  }

  public async run() {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, { logging: this.config.logging || 'all' });

    // create typeorm connection
    await createConnection(connectionOptions);
    // create and setup express app
    const app = express();
    app.use(bodyParser.json());
    app.use('/users', UsersRouter);
    const http: Server = app.listen(this.config.port);

    this.http = http;

    process.on('SIGINT', async () => {
      this.destroy();
      process.exit();
    });
    return app;
  }

  public async destroy() {
    await getConnection().close();
    await this.http.close();
  }
}
