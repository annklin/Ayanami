require('../../../settings')
module.exports = {
  name: "add", 
  alias: ["add", "adicionar"],
	usage:`${prefa}add @tag/citar`,
	desc: "Adiciona membros ao grupo",
	category: "Group",
	react:"✅",
  start: async(client, m, { text, prefix, isBotAdmin,isAdmin,mentionByTag}) => {
		if(!isAdmin) return client.sendMessage(m.from,{text:"Este é o comando somente admin"},{quoted:m})
		if(!isBotAdmin) return m.reply("Faça-me admin para usar este comando")
		const mention= await mentionByTag
		if(!isAdmin) return client.sendMessage(m.from,{text:"Este é o comando somente admin"},{quoted:m})
		let users = await (mention[0]) || m.msg.contextInfo.participant
		if (!users) return m.reply("❌ Não foi possível localizar nenhum ID/numero de usuário")
			await client.groupParticipantsUpdate(m.from, [users], "add")
			await client.sendMessage(m.from,{text:`User adicionado com sucesso ✅`},{quoted:m})
	},
    
}
