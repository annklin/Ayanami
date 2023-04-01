require("../../../settings");
module.exports = {
  name: "delete",
  alias: ["del", "apagar"],
  usage: `${prefa}delete <mensagem citada>`,
  desc: "Excluir a mensagem do bot/também excluir a mensagem de outras pessoas",
  react: "✅",
  category: "Group",
  start: async (
    client,
    m,
    { command, prefix, iscreator, args, quoted, isAdmin, isBotAdmin }
  ) => {
    let key;
    if ( !iscreator && !isAdmin) return m.reply("```Somente Mod ou Admin pode excluir mensagem```")
    if (!m.quoted) return m.reply("```Por favor, mencione alguém para excluir a mensagem```")
    if (!isBotAdmin) {
      key = {
        remoteJid: m.from,
        fromMe: true,
        id: m.quoted.id,
      };
    } else {
      key = {
        remoteJid: m.from,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.sender,
      };
    }
    await client.sendMessage(m.from, { delete: key });
  },
};
