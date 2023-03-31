module.exports = {
  name: "mods",
  alias: ["mod"],
  usage: `${global.prefa}mods`,
  desc: "shows mods list",
  category: "General",
  react: "✅",

  start: async (client, m, {}) => {
    const mod = global.owner;
    const owner = mod.map((mod) => mod + "@s.whatsapp.net");
    let mo = `
       *🎉 EU MESMO 🎉*\n\n`;
    for (let i = 0; i < mod.length; i++) {
      const um = await client.username(mod[i] + "@s.whatsapp.net");
      mo += `\n*👑 Nome:* ${um} e uns indonésios ai\n*🎖️ Tag:* @${mod[i].split("@")[0]}\n`;
    }
    let urlll = [
      "https://static.moewalls.com/videos/preview/2022/rei-ayanami-in-the-rain-neon-genesis-evangelion-preview.mp4",
      "https://static.moewalls.com/videos/preview/2022/rei-ayanami-crying-neon-genesis-evangelion-preview.mp4",
      "https://static.moewalls.com/videos/preview/2022/rei-ayanami-neon-genesis-evangelion-preview.mp4",
    ];
    let rae = urlll[Math.floor(Math.random() * urlll.length)];
    await client.sendMessage(
      m.from,
      { video: { url: rae }, gifPlayback: true, caption: mo, mentions: owner },
      { quoted: m }
    );
  },
};
