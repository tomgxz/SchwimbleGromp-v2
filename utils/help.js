const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, DiscordjsError } = require("discord.js");
const { client } = require("../index.js")
const { titleCase } = require("../utils/formatting.js")

function getDescription(category) {
    if (category=="admin") return "These commands are used to operate the mechanics of the Economy system. They all require administrator permissions."
    if (category=="economy") return "These are the core commands of the Economy system. To be able to use them, an administrator needs to register the server."
    return "These are other useful commands, such as the help command"
}

function getCommands() {
    return [...client.commands]
        .map(cmd=>cmd[1].directory)
        .filter((item, i, ar) => ar.indexOf(item) === i)
        .map((dir) => {
            const getcommands = [...client.commands]
                .filter((cmd)=>cmd[1].directory==dir)
                .map((cmd) => {
                    return {
                        name: cmd[1].data.name,
                        desc: cmd[1].data.description
                    }
                })
            return {
                directory: dir,
                commands: getcommands
            }
    })
}

async function createTopLevelHelpMenu(ctx) {

    const data = getCommands()
    var dropdownitems = []
    
    for (var dir of data) {
        x={
            label:titleCase(dir.directory.replace("\\commands\\","").replace("\\","")+" Commands"),
            value:dir.directory,
            description:"Choose a command category"
        }
        if (x.label==" Commands") x.label="Other Commands"
        dropdownitems.push(x)
    }

    const embed = new EmbedBuilder()
        .setTitle("Help menu")
        .setDescription("Choose a command category")
        .setColor("Blurple")
    const components = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("help_selectcommandcategory")
            .setPlaceholder("Select a category")
            .addOptions(
                dropdownitems
            ),
    )

    try { await ctx.editReply({embeds:[embed],components:[components]}) }
    catch (e) {
        if (e instanceof DiscordjsError) await ctx.message.edit({embeds:[embed],components:[components]})
        else throw e
    }
}

async function createSubLevelHelpMenu(ctx) {
    const data = getCommands()
    var dropdownitems = []
    
    for (var dir of data) {
        if (!(dir.directory == ctx.values[0])) continue

        for (var command of dir.commands) {
            dropdownitems.push({
                label:titleCase(command.name),
                value:command.name,
                description:command.desc
            })
        }
    }

    var embedTitle = titleCase("Help menu - "+ctx.values[0].replace("\\commands\\","").replace("\\","")+" Commands")
    if (embedTitle=="Help menu -  Commands") x.label="Help menu - Other Commands"

    const embed = new EmbedBuilder()
        .setTitle(embedTitle)
        .setDescription(getDescription(ctx.values[0].replace("\\commands\\","").replace("\\","").toLowerCase()))
        .setColor("Blurple")

    const dropdowncomponents = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("help_commandlist")
            .setPlaceholder("Select a command for more information")
            .addOptions(
                dropdownitems
            ),
    )
    
    const buttoncomponents = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("help_commandlist_back")
            .setLabel("Back")
            .setStyle(ButtonStyle.Secondary),
    )

    await ctx.message.edit({embeds:[embed],components:[dropdowncomponents,buttoncomponents]})
    await ctx.deferUpdate()

}

async function createCommandHelpDialog(ctx) {
    console.log(ctx)

    const data = getCommands()
    var command

    for (var dir of data) { // ctx.values[0] is the name of the selected command
        for (var c of dir.commands) {
            if (!(c.name == ctx.values[0])) continue
            command = c
            break
        }
    }

    console.log(command)

    if (typeof command == "undefined") return

    const embed = new EmbedBuilder()
        .setTitle("Help Menu - Command: "+titleCase(command.name))
        .setDescription(command.desc)
        .setColor("Blurple")
    
    const buttoncomponents = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("help_command_back")
            .setLabel("Back")
            .setStyle(ButtonStyle.Secondary),
    )

    await ctx.message.edit({embeds:[embed],components:[buttoncomponents]})
    await ctx.deferUpdate()
}

module.exports={createTopLevelHelpMenu,createSubLevelHelpMenu,createCommandHelpDialog}
