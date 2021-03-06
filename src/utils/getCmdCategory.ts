import { EmbedFieldData, Message } from "discord.js"
import { helpCategories } from "./embeds"
import { commandsHelp }  from "../core/commandHandler"
import getFiles from "../core/getFiles"

type CategoryIntro = keyof typeof CATEGORY_INTRO
const suffix = __filename.substring(__filename.length - 3)
const CATEGORY_INTRO = 
{
  "economy" : (msg : Message) => `隆Bienvenido ${msg.author}, este es el sistema de **Econom铆a**! \n A continuaci贸n te mostramos los diferentes comandos 馃 : `,
  "funny" : (msg : Message) => `隆Bienvenido ${msg.author}, este es el sistema de **Reacci贸n**! \n A continuaci贸n te mostramos los diferentes comandos 馃槏 : `,
  "moderation" : (msg : Message) => `隆Bienvenido ${msg.author}, este es el sistema de **Moderaci贸n**! \n A continuaci贸n te mostramos los diferentes comandos 馃槑 : `,
  "nations" : (msg : Message) => `Bienvenido ${msg.author}, este es el sistema de **Naciones**! \n A continuaci贸n te mostramos los diferentes comandos.`
}

const EMOJIS = { economy : "馃挼" , funny : "馃槉" , moderation : "馃懏鈥嶁檧锔?" , nations :  "馃椇锔?" }

const getCmdCategory = (msg : Message , argument : string) => 
{
  const categoryIntro = CATEGORY_INTRO[ argument as CategoryIntro ]
  const embed = helpCategories()
  const commandHelp = commandsHelp.get(argument)
  
  if(categoryIntro === undefined && !commandHelp)
    return embed.setDescription("La categor铆a o comando que acabas de mencionar no existe. 馃槶")
  
  const emoji = EMOJIS[ argument as CategoryIntro ]

  if(!commandHelp && categoryIntro)
  {
    const commandsDir = __dirname.replace("\\utils" , "").concat(`\\commands\\${argument}`)
    const commandsCategory = getFiles(commandsDir , suffix).map(command => {
      const commandNameIndex = command.lastIndexOf("\\") + 1
      const commandName = command.substring(commandNameIndex).replace(suffix , "")

      return `**( ${emoji} )** \`z!${commandName}\` `
    }).join("\n")
    
    embed.setDescription(`${categoryIntro(msg)}
    
    ${commandsCategory}`)
      .setFooter({ text : "Para averiguar una descripci贸n de cada comando, puedes usar z!help [Nombre del comando]" })
  
    return embed
  }

  embed.setDescription(`**( <a:Diamond2:969254860639834132> )** \`z!${argument}\`
  
  ${commandHelp}`)

  return embed
}

export default getCmdCategory 