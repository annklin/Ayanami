const canvacord = require("canvacord");
module.exports = {
    name: "old",
    alias: ["sepia"],
    usage: `${prefa}old <mencionar>`,
    react: "🎉",
    category: "Fun",
    start: async (client, m, { command, pushName, groupName, isAdmin, iscreator, mentionByTag, prefix, text, args, quoted, mime }) => {

        if (m.quoted) {
            try {
                img = await client.profilePictureUrl(m.quoted.sender, 'image')
            } catch {
                img = "https://i.ibb.co/hc1qDm4/images.png"
            }
            result = await canvacord.Canvacord.sepia(img);
        } else if (mentionByTag) {
            try {
                ppuser = await client.profilePictureUrl(mentionByTag[0] || m.sender, 'image')
            } catch {
                ppuser = 'https://i.ibb.co/hc1qDm4/images.png'
            }
            result = await canvacord.Canvacord.sepia(ppuser);
        } 
        await client.sendMessage(m.from, { image: result }, { quoted: m });
    }
}
