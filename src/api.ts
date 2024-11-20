import express from 'express';
import cors from 'cors';
import EthereumClient from './web3/ethereumClient';

const eth = new EthereumClient();

export const app = express();



app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

const api = express.Router();

api.get('/hello', (req, res) => {
  res.status(200).send({ message: 'hello world' });
});


api.get('/collection', async (req, res) => {
  const name: String = await eth.name()
  res.status(200).send({ colletion: name });
});

// Version the api
app.use('/api/v1', api);
