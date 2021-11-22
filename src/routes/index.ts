import CheckCardRoute from './CheckCardRoute';

/**
 * @module routes
 * @see module:express/App
 * @description Registra as rotas que vao ser consumidas pelo express numa array
 */

/**
 * @const {ArrayOfObjects} routes
 * @example routes.forEach((route) => {
 *   routes.setRoute(<express.Application> app);
 * });
 */
const routes = [CheckCardRoute];

export { routes };
