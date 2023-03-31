const { evaluate } = require('mathjs');
module.exports={
    name:"calculadora",
    alias:["calc"],
    usage:`${global.prefa}calc 2+2`,
    desc:"Resolve calculos basicos  ",
    category:"Education",
    react:"📖",
    
    start:async(client,m,{command,prefix,args,text})=>{
        if (!text)  return m.reply(`*Por favor, forneça uma equação para resolver*`) 
        try{
        const calc = evaluate(text);
        await client.sendMessage(m.from,{text:`*📘 Pergunta :-* \n ${text} \n\n*💡 Resposta :-* \n ${calc}`},{quoted:m})
        } catch (err) {
        console.log(err)
        return m.reply (`*${text}* não é uma pergunta válida`)
        }}
    }
