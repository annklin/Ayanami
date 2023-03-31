let { webp2mp4File,getRandom } = require('../../../lib/Function')
const fs=require('fs')
const { exec } = require("child_process")
require ('../../../settings')
module.exports={
    name:"toimg",
    alias:["toimg","togif","tovid"],
    usage:`${prefa}toimg <quote a sticker>`,
    desc:"Converte sticker para imagem/gif",
    category:"Utils",
    cool:5,
    react:"✅",

    start:async(client,m,{text,quoted,mime,})=>{
        if(m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
            if (!quoted) return m.reply(`❌ Não foi possível encontrar nenhum adesivo no contexto`)
  if (!/webp/.test(mime)) return m.reply(`❌ Não foi possível encontrar nenhum adesivo no contexto`)
  
  let media = await client.downloadAndSaveMediaMessage(quoted)
  let ran = await getRandom('.png')
  exec(`ffmpeg -i ${media} ${ran}`, (err) => {
      fs.unlinkSync(media)
      if (err) m.reply(err)
      let buffer = fs.readFileSync(ran)
      client.sendMessage(m.from, { image: buffer,caption:'AYANAMI hehe' }, { quoted: m })
      fs.unlinkSync(ran)
  })
} else if (m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated == true){
      if (!quoted) return m.reply(`❌ Não foi possível encontrar nenhum adesivo no contexto`)
  if (!/webp/.test(mime)) return m.reply(`❌ Não foi possível encontrar nenhum adesivo no contexto`)
  
  let media = await client.downloadAndSaveMediaMessage(quoted)
  let webpToMp4 = await webp2mp4File(media)
  await client.sendMessage(m.from, { video: { url: webpToMp4.result, caption: 'AYANAMI hehe' }, gifPlayback: true }, { quoted: m })
  await fs.unlinkSync(media)
}



    }
}
