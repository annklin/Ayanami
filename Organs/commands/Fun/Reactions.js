const { buffergif, fetchJson, fetchBuffer } = require('../../../lib/Function');

const suitableWords = {
  bite: 'Mordeu', blush: 'Ficou vermelho', bonk: 'De uma paulada no(a)', bully: 'Intimidado', cringe: 'Que cafona',
  cry: 'Chorei na frente do(a)', cuddle: 'Abraçou', dance: 'Dançado com', glomp: 'DEu um abraço apertado no(a)', handhold: 'Segurou as mãos de', happy: 'Está feliz com',
  highfive: 'bate aqui', hug: 'Abraçou', kick: 'Chutou', kill: 'Matou', kiss: 'Beijou', lick: 'Lambeu',
  nom: 'Está mastigando', pat: 'Acariciou', poke: 'Cutucou', slap: 'Deu uma lapada seca em', smile: 'Sorriu para', smug: 'convencido',
  wave: 'Acenou para', wink: 'Piscou para', yeet: 'Jogado em'
};

const reactions = Object.keys(suitableWords)

module.exports = {
  name: 'reaction',
  desc: "Reagir à mensagem de alguém com um gif especificado pelo usuário.",
  alias: ['r', ...reactions],
  category: 'Fun',
  usage: `${prefa}reaction`,
  react: '😗',
  start: async (client, m, { text, prefix, mentionByTag }) => {
    const command = m.body.split(' ')[0].toLowerCase().slice(prefix.length).trim()
    const capitalize = (content) => `${content.charAt(0).toUpperCase()}${content.slice(1)}`
    let flag = true
    if (command === 'r' || command === 'reaction') flag = false
    if (!flag && !text) {
      const reactionList = `🎃 *Reações disponíveis:*\n\n- ${reactions.map((reaction) => capitalize(reaction)).join('\n- ')}\n🛠️ *Como usar:* ${prefix}reaction (reação) [responda/marque] | ${prefix}(reação) [responda/marque]\nExemplo: ${prefix}beijar`
      return void (await m.reply(reactionList))
    }
    const reaction = flag ? command : text.split(' ')[0].trim().toLowerCase()
    if (!flag && !reactions.includes(reaction))
      return void m.reply(`Invalid reaction. Use *${prefix}react* to see all of the available reactions`)
    const users = mentionByTag
    if (m.quoted && !users.includes(m.quoted.sender)) users.push(m.quoted.sender)
    while (users.length < 1) users.push(m.sender)
    const reactant = users[0]
    const single = reactant === m.sender
    const { url } = await fetchJson(`https://api.waifu.pics/sfw/${reaction}`)
    const result = await fetchBuffer(url);
    const buffer = await buffergif(result);
    await client.sendMessage(m.from, {
        video: buffer,
        gifPlayback: true,
        caption: `*@${m.sender.split('@')[0]} ${suitableWords[reaction]} ${single ? '' : `@${reactant.split('@')[0]}`}*`,
        mentions: [m.sender, reactant],
    }, { quoted: m });
  }
}
