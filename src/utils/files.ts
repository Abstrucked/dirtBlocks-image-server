import { readFileSync, writeFileSync, unlink, existsSync, mkdirSync } from "node:fs";

export const createDir= (path: string | string[]) => {
  const fullPath = Array.isArray(path) ? path.join('/') : path;
  if(existsSync(fullPath)) return;
  console.log(
    `Creating directory: ${path}`
  )
  mkdirSync(fullPath, { recursive: true });
}

export const saveItem = (path: string, data: string) => {
  console.log(path);
  if( !path || !data || existsSync(path)) return;

  console.log(
    `Saving file: ${path}`
  )
  writeFileSync(path, data);
};

export const getItem = (path: string, tokenId: string, format: string = 'json') => {
  const fullPath: string = `${[path, tokenId].join('/')}.${format}`;
  console.log("fetching...", fullPath);

  return JSON.parse(readFileSync(fullPath, 'utf8'));
};

export const deleteItem = (path: string): boolean => {
  let isDeleted: boolean;
  if( !path || !existsSync(path) ) return false;
  console.log(
    `Deleting file: ${path}`
  )
  unlink(path, (err) => {
    isDeleted = !err;
  })

  return isDeleted
}
