require ('../../../settings')
module.exports = {
	name: "remove",
	alias: ["remove", "remover"],
	usage:`${prefa}remove @tag/citar`,
	desc: "Remove membros do grupo",
	category: "Group",
	react:"✅",
	start: async(client, m, { text, prefix, isBotAdmin,isAdmin,mentionByTag}) => {
		if(!isAdmin) return client.sendMessage(m.from,{text:"Este é o comando somente para admins"},{quoted:m})
		if(!isBotAdmin) return m.reply("Faça-me admin para usar este comando")
		const mention= await mentionByTag
		if(!isAdmin) return client.sendMessage(m.from,{text:"Este é o comando somente para admins"},{quoted:m})
		let users = await (mention[0]) || m.msg.contextInfo.participant
		if (!users) return m.reply("❌ Não foi possível localizar nenhum ID/numero de usuário")
			await client.groupParticipantsUpdate(m.from, [users], "remove")
			await client.sendMessage(m.from,{text:`Foi ban te conhecer`},{quoted:m})
	},
    
}
