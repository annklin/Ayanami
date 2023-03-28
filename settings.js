const fs = require("fs");
const chalk = require("chalk");
require("dotenv").config();
let gg = process.env.MODS;
if (!gg) {
  gg = "558592935452";
}

global.owner = gg.split(",");
global.mongodb = process.env.MONGODB || "mongodb+srv://Annklin:Frank123321..@annklin.1c0at2t.mongodb.net/?retryWrites=true&w=majority";
global.prefa = process.env.PREFIX || "!";
global.ggle = process.env.GOOGLE_API || "AIzaSyBAPYkmwd95zafVZAOyKlQD18mtoHwyXVc";
global.wter = process.env.WEATHER_API || "ce9162b9c8d2491781a173135232703";
global.sessionId = process.env.SESSION_ID || "AYANAMI";
global.malid = process.env.MAL_USERNAME || "PratyushOP";
global.malpass = process.env.MAL_PASSWORD || "8scv98gxDYHVBry";
global.port = process.env.PORT || 8080;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
