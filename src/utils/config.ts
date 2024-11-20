import {readFileSync} from "node:fs";
import toml from "toml"

const config = loadConfig()

function loadConfig() {

  const configFile = readFileSync("config.toml", "utf8")
  return toml.parse(configFile)
}


export default config
