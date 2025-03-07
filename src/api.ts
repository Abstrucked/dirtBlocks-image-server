import express from 'express';
import cors from 'cors';
import EthereumClient from './web3/ethereumClient';
import fetchCollection from './utils/fetchCollection';
import { createDir, getItem, basePath } from './utils/files';

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
  const name: string = await eth.name()
  res.status(200).send({ colletion: name });
});

api.get('/item/:tokenId', async (req, res) => {
  const path: string = await basePath(eth)
  const tokenId: string = req.params.tokenId;
  // res.status(200).send({path, tokenId})
  const item = getItem(path, tokenId);// Pass the tokenId to getItem or use as needed
  if(!item) {
    res.status(404).send({ error: "Item not found" });
    return;
  }
  res.status(200).send({ item });
})

api.get('/item/image/:tokenId', async (req, res) => {
  const path = await basePath(eth);
  const tokenId = req.params.tokenId;
  const item = getItem(path, tokenId);

  if (!item || !item.image) {
    res.status(404).send({ error: "Image not found" });
    return;
  }

  const base64Image = item.image;

  // Extract the base64 data and the MIME type
  const matches = base64Image.match(/^data:(.*);base64,(.*)$/);

  if (!matches) {
    res.status(400).send({ error: "Invalid image format" });
    return;
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  // Decode the base64 image data
  const img = Buffer.from(base64Data, 'base64');

  // Set the Content-Type to specify it's an image with the correct MIME type
  res.setHeader('Content-Type', mimeType);
  res.status(200).send(img);
});

api.get('/item/animation/:tokenId', async (req, res) => {
  const path = await basePath(eth);
  const tokenId = req.params.tokenId;
  const item = getItem(path, tokenId);

  if (!item || !item.animation_url) {
    res.status(404).send({ error: "Animation not found" });
    return;
  }

  const base64Html = item.animation_url;

  // Extract the base64 data from the data URL scheme
  const matches = base64Html.match(/^data:text\/html;base64,(.*)$/);

  if (!matches) {
    res.status(400).send({ error: "Invalid HTML format" });
    return;
  }

  const base64Data = matches[1];

  // Decode the base64 HTML data
  const html = Buffer.from(base64Data, 'base64').toString('utf-8');

  // Set the Content-Type to specify it's an HTML
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
});

api.post('/save-items', async (req, res) => {
  console.log("fetching and saving items")

  const path = await basePath(eth)
  createDir(path);
  await fetchCollection(eth)

  res.status(200).send({ message: 'ok' });
})
// Version the api
app.use('/api/v1', api);
