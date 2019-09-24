import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Server } from 'net';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import SessionRouter from './api/routes/session.router';
import ShoppingItemsRouter from './api/routes/shoppingItems.router';
import ShopsRouter from './api/routes/shops.router';
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
    Object.assign(connectionOptions, {
      entities: [__dirname + '/**/entity/*{.js,.ts}'],
      logging: this.config.logging || 'all',
    });

    // create typeorm connection
    await createConnection(connectionOptions);
    // create and setup express app
    const app = express();
    app.use(bodyParser.json());
    this.initRoutes(app);
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

  private initRoutes(app: express.Application) {
    app.use('/users', UsersRouter);
    app.use('/session', SessionRouter);
    app.use('/shoppingItems', ShoppingItemsRouter);
    app.use('/shops', ShopsRouter);
  }
}
