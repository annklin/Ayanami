const canvacord = require("canvacord");
module.exports = {
    name: "tapa",
    alias: ["slap", "tapa"],
    usage: `${prefa}tapa <mencionar>`,
    react: "🎉",
    category: "Fun",
    start: async (client, m, { command, pushName, groupName, isAdmin, iscreator, mentionByTag, prefix, text, args, quoted, mime }) => {
    if (!m.quoted && !mentionByTag[0]) return m.reply("*❄️ Marcar alguém*")
    if (m.quoted) {
            try {
                img = await client.profilePictureUrl(m.quoted.sender, 'image')
            } catch {
                img = "https://i.ibb.co/hc1qDm4/images.png"
            }
        } else {
            try {
                img = await client.profilePictureUrl(mentionByTag[0], 'image')
            } catch {
                img = "https://i.ibb.co/hc1qDm4/images.png"
            }
        }
        try {
            ppuser = await client.profilePictureUrl(m.sender, 'image')
        } catch {
            ppuser = 'https://i.ibb.co/hc1qDm4/images.png'
        }
        result = await canvacord.Canvacord.slap(ppuser, img);
        await client.sendMessage(m.from, { image: result }, { quoted: m });
    }
}
