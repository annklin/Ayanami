const instagramGetUrl = require("instagram-url-direct");
module.exports = {
  name: "igdl",
  alias: ["instagram", "insta"],
  usage: `${global.prefa}insta <pesquisa>`,
  desc: "Baixe vídeos do Instagram diretamente...",
  category: "Media",
  react: "✅",
  start: async (client, m, { command, prefix, text, args }) => {
    if (args.length === 0)
      return m.reply(`❌ A URL está vazia! n\Enviar ${prefix}insta url`);

    let urlInsta = args[0];

    if (
      !(
        urlInsta.includes("instagram.com/p/") ||
        urlInsta.includes("instagram.com/reel/") ||
        urlInsta.includes("instagram.com/tv/")
      )
    )
      return m.reply(
        `❌ URL errada! Apenas vídeos postados no Instagram, TV e reels podem ser baixados.`
      );
    if (urlInsta.includes("?")) urlInsta = urlInsta.split("/?")[0];
    console.log(urlInsta);
    await instagramGetUrl(urlInsta)
      .then((res) => {
        if (res.results_number == 1) {
          if (res.url_list[0].includes("://media.instasupersave.com/")) {
            client.sendMessage(
              m.from,
              {
                video: { url: `${res.url_list[0]}` },
              },
              { quoted: m }
            );
          } else if (
            res.url_list[0].includes("://scontent.cdninstagram.com/")
          ) {
            client.sendMessage(
              m.from,
              {
                image: { url: `${res.url_list[0]}` },
              },
              { quoted: m }
            );
          }
        } else if (res.results_number > 1) {
          for (let i = 0; i < res.results_number; i++) {
            if (res.url_list[i].includes("://media.instasupersave.com/")) {
              client.sendMessage(
                m.from,
                {
                  image: { url: `${res.url_list[i]}` },
                },
                { quoted: m }
              );
            } else if (
              res.url_list[i].includes("://scontent.cdninstagram.com/")
            ) {
              client.sendMessage(
                m.from,
                {
                  video: { url: `${res.url_list[i]}` },
                },
                { quoted: m }
              );
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
        return m.reply(`Erro privado / não encontrado`);
      });
  },
};
