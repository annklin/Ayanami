const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
module.exports = {
    name: "sticker",
    alias: ["sticker","s"],
    desc: "faz adesivo de imagens / vídeos / gifs",
    category: "Utils",
    react:"✅",

    start: async(client, m,{pushName,body,quoted,mime,text,args,flags}) => {
       if(!quoted) return await client.sendMessage(m.from,{text:"Responder/marcar uma imagem/vídeo"})
       flags.forEach((flag) => (text = text.replace(flag, '')))
 
       pack = 'AYANAMI'
       author = '@annklin_k'
        
       
           
        if (/image/.test(mime)) {
    
            let media = await quoted.download()
       
        let sticker = new Sticker(media, {
            pack: pack, // The pack name
            author: author, // The author name
            type: flags.includes('-c') || flags.includes('-cortar') || flags.includes('-cortada')
            ? 'crop'
            : flags.includes('-e') || flags.includes('-esticar') || flags.includes('--esticado')
            ? 'default'
            : flags.includes('-circulo')
            ? 'circle'
            : 'full' ,
            categories: ['🤩', '🎉'], // The sticker category
            id: '12345', // The sticker id
            quality: 75, // The quality of the output file
            background: 'transparent' // The sticker background color (only for full stickers)
        })
       
        const buffer = await sticker.toBuffer()
        client.sendMessage(m.from, {sticker: buffer}, {quoted: m})
    
        } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 20) return client.sendMessage(m.from,{text:'🕐 Não é possível criar com vídeos com mais de *11 segundos*'})
            let media = await quoted.download()
        let sticker = new Sticker(media, {
            pack: pack, // The pack name
            author: author, // The author name
            type: body.includes("-c")|| body.includes("-cortar")? StickerTypes.CROPPED: StickerTypes.FULL, // The sticker type
            categories: ['🤩', '🎉'], // The sticker category
            id: '12345', // The sticker id
            quality: 30, // The quality of the output file
            background: 'transparent' // The sticker background color (only for full stickers)
        })
    
        const stikk = await sticker.toBuffer()
    
    
        client.sendMessage(m.from, {sticker: stikk}, {quoted: m})
        } else {
            client.sendMessage(m.from,{text:"❌ Não foi possível encontrar nenhuma imagem/vídeo no contexto"},{quoted:m})
            }
    }
}
