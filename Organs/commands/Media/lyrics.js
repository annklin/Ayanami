const lyrics = require("lyric-music"); 
module.exports = {
    name: "lletra",
    alias: ["letra", "lyrics"],
    usage:`${prefa}letra <pesquisa>`,
    desc: "Encontra a letras de músicas",
    category: "Media",
    cool:3,
    start: async(client, m,{text,pushName}) => {       
if (!text) return m.reply(`❌ Nenhuma consulta fornecida!`)
try {
const lyric = await lyrics(text);
if (lyric == 'Unknow lyric.') return m.reply("")
txtt = lyric.split("_").pop()
var txt = `
*🎶 LETRA :-* \n
${lyric}
`
 console.log(lyric)
 await client.sendMessage(m.from, {text:txt},{quoted:m})
} catch (err) {
    console.log(err)
    }
  }
}
