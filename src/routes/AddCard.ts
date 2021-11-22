import { Request, Response, Router } from 'express';

/** Express router providing user related routes
 * @module routes/AddCardRoute
 * @requires express
 *
 * @ignore
 * @fileoverview implementar no futuro
 */

/**
 * @class
 * @name AddCardRoute
 * @description Implementa a rota que vai manejar as visualizacoes de cada
 * email com uma imagem de 1x1 pixel
 */
class AddCardRoute {
  /**
   * @public @static @name setRoutes implementa a funcao para registrar a
   * rota no express
   * @param {express.Router} app
   */
  public static setRoutes(app: Router): void {
    app.post('/addcard', (req: Request, res: Response) => {
      res.status(200).send('w00t w00t 1337 1337');
    });
  }
}

export default AddCardRoute;
