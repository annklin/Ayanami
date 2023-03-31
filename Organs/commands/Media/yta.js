const YT = require('../../../lib/ytdl')
const { isUrl, fetchBuffer } = require('../../../lib/Function')
const fs=require("fs")
require ('../../../settings')
module.exports={
    name:"yta",
    alias:["ytmp3"],
    usage:`${prefa}yta youtube_link`,
    desc:"Baixa o áudio/videos através de links do youtube",
    category:"Media",
    react:"📀",
    start:async(client,m,{command,prefix,text,args})=>{
if (args.length < 1 || !isUrl(text) || !YT.isYTUrl(text)) return client.sendMessage(m.from,{text:"Onde está o link?...."},{quoted:m})
const audio=await YT.mp3(text)
await client.sendMessage(m.from,{
    audio: fs.readFileSync(audio.path),
    mimetype: 'audio/mp4',
    contextInfo:{
        externalAdReply:{
            title:audio.meta.title,
            body: "©HENRY Né",
            thumbnail: await fetchBuffer(audio.meta.image),
            mediaType:2,
            mediaUrl:text,
        }

    },
},{quoted:m})
await fs.unlinkSync(audio.path)
    }
}
