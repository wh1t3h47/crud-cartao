import express, { Router } from 'express';
import cors from 'cors';
import { routes } from './routes';

/**
 * @fileoverview implementa a classe App, inicializa o express
 * @module express/App
 */

const appTsErro = (e : string) => {
  console.log(`App.ts erro: ${e}`);
};

/**
 * @class
 * @name App
 * @classdesc Inicializa e configura o express
 */
class App {
  // Nao podemos sobrescrever app
  /** @public @readonly @name app @description undefined if express failed */
  public readonly app : express.Application | undefined;

  /**
   * @constructor
   * @description inicializa express, middlewares e rotas
   */
  constructor() {
    try {
      this.app = express();
      if (!this.app) {
        throw new Error('express() falhou');
      }
      this.loadMiddleware();
      this.loadRoutes();
    } catch (e) {
      App.handleError(e);
    }
  }

  /**
   * @private
   * @name loadRoutes
   * @description aplique no express cada uma das rotas exportadas na array
   * de rotas do arquivo routes/index
   */
  private loadRoutes() : void {
    const apiRouter = Router();
    routes.forEach((route) => {
      route.setRoutes(apiRouter);
    });
    this.app?.use('api/v1', apiRouter);
  }

  /**
   * @private
   * @name loadMiddleware
   * @description Registra os middlewares do YouSendr Mailer
   */
  private loadMiddleware() : void {
    if (!this.app) {
      return;
    }
    const app = <express.Application> (this.app);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
  }

  /**
   * @private
   * @name handleError
   * @param {Error|object|string} e
   */
  private static handleError(e : unknown) : void {
    if (!e) {
      return;
    } // else
    if (typeof e === 'string') {
      appTsErro(e);

      return;
    } // else

    const error = <Record<string, string>>e;

    if (e instanceof Error
      /** As vezes e tem message, mas nao eh error, aproximacao duck-type */
      || typeof error === 'object'
      && typeof error.message === 'string'
    ) {
      appTsErro(error.message || 'Erro ao carregar express');
    }
  }
}

export default App;
