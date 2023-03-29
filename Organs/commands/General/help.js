module.exports = {
  name: "help",
  alias: ["h", "menu"],
  desc: "Todos os comandos",
  category: "General",
  react: "✅",
  start: async (client, m, { commands, args, prefix, text, toUpper }) => {
    const { pushName, sender } = m;
    if (args[0]) {
      let data = [];
      let name = args[0].toLowerCase();
      let cmd =
        commands.get(name) ||
        Array.from(commands.values()).find((v) => v.alias.includes(name));
      if (!cmd || cmd.type == "hide") return m.reply("No Command Found");
      else
        data.push(
          `*🍁Comando :* ${cmd.name.replace(/^\w/, (c) => c.toUpperCase())}`
        );
      if (cmd.alias) data.push(`*👾Alias :* ${cmd.alias.join("\n")}`);
      if (cmd.cool) data.push(`*⏱️Cooldown:* ${cmd.cool}`);
      if (cmd.desc) data.push(`*🧾Descrição :* ${cmd.desc}`);
      if (cmd.usage)
        data.push(
          `*💡Exemplo :* ${cmd.usage
            .replace(/%prefix/gi, prefix)
            .replace(/%command/gi, cmd.name)
            .replace(/%text/gi, text)}`
        );
      var buttonss = [
        {
          buttonId: `${prefix}help`,
          buttonText: { displayText: `help` },
          type: 1,
        },
      ];
      let buth = {
        text: `*ℹ️Command Info*\n\n${data.join("\n")}`,
        footer: "*©Henry Apenas*",
        buttons: buttonss,
        headerType: 1,
      };
      return client.sendMessage(m.from, buth, { quoted: m });
    } else {
      const { pushName, sender } = m;
      let cm = commands.keys();
      let category = [];

      for (let cmd of cm) {
        let info = commands.get(cmd);
        if (!cmd) continue;
        if (!info.category || info.category === "private") continue;
        /*if (
          !info?.category ||
          (info.category === "Nsfw" && !nsfw.includes(m.from))
        )
          continue;*/
        if (Object.keys(category).includes(info.category))
          category[info.category].push(info);
        else {
          category[info.category] = [];
          category[info.category].push(info);
        }
      }
      if (!nsfw.includes(m.from)) {
        var emo = ["📖","🎉", "🍁", "🍀", "🌊", "🎵", "🎟", "♨️", "🉐"];
      } else {
        var emo = ["📖","🎉", "🍁", "🍀", "🌊", "🎵", "🔞", "🎟", "♨️", "🉐"];
      }
      let txt = `*Kon'nichiwa (｡♡‿♡｡)* ${pushName} Watashiwa *Nezuko*.
                       
🧧 *Prefixo :* [ ${prefix} ]
                       
📝 Aqui estão os *Comandos* listados abaixo :\n\n`;
      const keys = Object.keys(category);
      for (const key of keys) {
        txt += `*${key.toUpperCase()} ${
          emo[keys.indexOf(key)]
        } :-*  \n${prefix}\`\`\`${category[key]
          .map((cmd) => cmd.name)
          .join("\n")}\`\`\`\n\n`;
      }
      txt += `📗 Tipo *${prefix}help* <Nome-comando> En <Command-Name> --info\n\n`;
      txt += `*©Henry apenas*`
      const Reylogo = 'https://cdn.discordapp.com/attachments/1089921848248111225/1090683775081525248/tumb.mp4'
    client.sendMessage(m.from,{video:{url:Reylogo}, gifPlayback:true, caption:txt},{quoted:m})
    }
  },
};
