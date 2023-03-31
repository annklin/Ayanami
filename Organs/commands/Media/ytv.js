const YT = require('../../../lib/ytdl')
const { isUrl, fetchBuffer } = require('../../../lib/Function')
const fs=require("fs")
require ('../../../settings')
module.exports={
    name:"ytv",
    alias:["ytmp4"],
    usage:`${prefa}yta youtube_link`,
    desc:"Baixa vídeos do youtube através de links",
    category:"Media",
    react:"🎞",
    start:async(client,m,{command,prefix,text,args})=>{
if (args.length < 1 || !isUrl(text) || !YT.isYTUrl(text)) return client.sendMessage(m.from,{text:"Cadê a url do video?...."},{quoted:m})
const vid=await YT.mp4(text)
const ytc=`
*Titulo:* ${vid.title}
*Data:* ${vid.date}
*Duração:* ${vid.duration}
*Qualidade:* ${vid.quality}`
await client.sendMessage(m.from,{
    video: {url:vid.videoUrl},
    caption: ytc
},{quoted:m})

    }
}
