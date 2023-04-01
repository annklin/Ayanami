require("../../../handler/MessageHandler");
module.exports = {
  name: "enable",
  alias: ["act", "register"],
  desc: "habilita os comandos",
  cool: 3,
  react: "✅",
  category: "Group",
  start: async (
    client,
    m,
    { text, args, prefix, isBotAdmin, isAdmin, mentionByTag }
  ) => {
    if (!isAdmin)
      return client.sendMessage(
        m.from,
        { text: "Este é o comando somente admin" },
        { quoted: m }
      );
    if (!isBotAdmin) return m.reply("Faça-me admin para usar este comando");
    if (!text) return m.reply("Nenhuma opção fornecida!!");
    if (args[0] == "mod") {
      if (mods.includes(`${m.from}`))
        return m.reply("🛡 *O Mod* já está ativado");

      await db.push("mods", `${m.from}`);
      m.reply("💮 Habilitado com êxito *Mod*");
    }
    if (args[0] == "nsfw") {
      if (nsfw.includes(`${m.from}`))
        return m.reply("🛡 *Nsfw* já está habilitado");

      await db.push("nsfw", `${m.from}`);
      m.reply("💮 Habilitado com êxito *Nsfw*");
    }
    if (args[0] == "events" || args[0] == "event") {
      if (wlc.includes(`${m.from}`))
        return m.reply("🛡 *Events* já está habilitado");

      await db.push("events", `${m.from}`);
      m.reply("💮 Habilitado com êxito *Eventos*");
    }
  },
};
