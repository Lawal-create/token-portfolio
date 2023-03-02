import "module-alias/register";
import "reflect-metadata";
import "./http/controllers";

import { App } from "./app";
import { Container } from "inversify";
import { CryptoCompareClient } from "./providers/cryptocompare";
import LIB_TYPES from "./internal/inversify";
import { Logger } from "./internal/logger";
import { PortfolioService } from "./portfolios/portfolios.service";
import TYPES from "./config/inversify.types";
import env from "./config/env";
import http from "http";

const start = async () => {
  const logger = new Logger({ name: env.application_name, serializers: {} });

  try {
    const container = new Container();

    // point to logger for the sake of other dependencies
    container.bind<Logger>(LIB_TYPES.Logger).toConstantValue(logger);

    container.bind<CryptoCompareClient>(TYPES.CryptoCompareClient).to(CryptoCompareClient);
    container.bind<PortfolioService>(TYPES.PortfolioService).to(PortfolioService);

    const app = new App(container, logger);
    const appServer = app.server.build();

    // start server
    const httpServer = http.createServer(appServer);
    httpServer.listen(env.port);
    httpServer.on("listening", () => logger.log(`${env.application_name} listening on ${env.port}`));

    process.on("SIGTERM", async () => {
      logger.log("exiting aplication...");


      httpServer.close(() => {
        process.exit(0);
      });
    });
  } catch (err) {
    logger.error(err);
  }
};

start();
