import { readFileSync, writeFileSync, unlink, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import config from './config';
import EthereumClient from '../web3/ethereumClient';
import { Metadata } from '../web3/types';


export const basePath = async (eth: EthereumClient): Promise<string> => {
  const name = await eth.name();
  return './' + path.join(config.volume.path, name);
};

export const createDir = (path: string | string[]) => {
  const fullPath = Array.isArray(path) ? path.join('/') : path;
  if (existsSync(fullPath)) return;
  console.log(
    `Creating directory: ${path}`
  );
  mkdirSync(fullPath, { recursive: true });
};

export const saveItem = (path: string, data: string) => {
  if (!path || !data) {
    console.error(
      `Invalid path or data: ${path}`);
    return;
  }
  if (existsSync(path)) {
    console.log(
      `File already exists: ${path}`);
    return;
  }

  console.log(
    `Saving file: ${path}`
  );
  writeFileSync(path, data);
};

export const getItem = (
  path: string,
  tokenId: string,
  format: string = 'json'
): Metadata|null => {
  const fullPath: string = `${[path, tokenId].join('/')}.${format}`;
  console.log('fetching...', fullPath);
  const raw = readFileSync(fullPath, 'utf8')
  return !!raw ? JSON.parse(raw) : null;
};

export const deleteItem = (path: string): boolean => {
  let isDeleted: boolean;
  if (!path || !existsSync(path)) return false;
  console.log(
    `Deleting file: ${path}`
  );
  unlink(path, (err) => {
    isDeleted = !err;
  });

  return isDeleted;
};
