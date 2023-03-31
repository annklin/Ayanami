const Spotify = require('../../../lib/Spotify')
require ('../../../settings')
module.exports = {
    name: "spotify",
    alias: ["spotify","sp"],
    usage:`${prefa}sp [spotify_link]`,
    desc: "baixar músicas do spotify",
    category: "Media",

    start: async(client, m, { command, prefix, text, args }) => {

   if (!text) return m.reply("Onde está a url do spotify?")
        const spotify = new Spotify(text)
        const info = await spotify.getInfo()
        if ((info).error) return void m.reply('Forneça um URL válida de uma música, Baka!')
        const { name, artists, album_name, release_date, cover_url } = info
        const details = `🎧 *Titulo:* ${name || ''}\n🎤 *Artista:* ${(artists || []).join(
            ','
        )}\n💽 *Album:* ${album_name}\n📆 *Data de Lançamento:* ${release_date || ''}`
       const response = await client.sendMessage(m.from, { image: { url: cover_url }, caption: details }, { quoted: m })
        const buffer = await spotify.download()
        await client.sendMessage(m.from, { audio: buffer }, { quoted: response })
    }
}
/* 
The Copyright Of this code is belongs to AliAryanTech
*/
