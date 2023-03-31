const YT = require('../../../lib/ytdl')
const { isUrl, fetchBuffer } = require('../../../lib/Function')
const fs=require("fs")
const yts= require("yt-search")
require ('../../../settings')
module.exports={
    name:"playv",
    alias:["video"],
    usage:`${prefa}playv <pesquisa>`,
    desc:"Plays videos...",
    category:"Media",
    react:"📼",
    start:async(client,m,{command,prefix,text,args})=>{
               
if(!text) return client.sendMessage(m.from,{text:"O que você quer ver"},{quoted:m})
let yts = require("yt-search")
        let search = await yts(text)
        let anu = search.videos[0]
const pl= await YT.mp4(anu.url)
const ytc=`
*Titulo:* ${pl.title}
*Data:* ${pl.date}
*Duração:* ${pl.duration}
*Qualidade:* ${pl.quality}
*Descrição:* ${pl.description}`
await client.sendMessage(m.from,{
    document: {url:pl.videoUrl},
    fileName: anu.title + '.mp4',
    mimetype: 'video/mp4',
    contextInfo:{
        externalAdReply:{
            title:anu.title,
            body: "©HENRY Né",
            thumbnail: await fetchBuffer(anu.thumbnail),
            mediaType:2,
            mediaUrl:anu.url,
        }

    },
},{quoted:m})
    }
}
