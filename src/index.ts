import { config } from 'dotenv';
import App from './App';

/** @fileoverview ponto de entrada pra executar o YouSendr Mailer */

/** Carrega .env em process.env */
config();

/** Carrega PORT do .env ou entao 8888 */

const { PORT } = process.env.PORT ? process.env : { PORT: 8080 };

const { app } = new App();

if (!app) {
  throw new Error('Erro: Falhou ao inicializar express, rode `yarn install`');
}

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
