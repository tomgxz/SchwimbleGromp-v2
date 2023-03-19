const { Events }=require("discord.js");
const { client } = require("../index.js")
const { createTopLevelHelpMenu,createSubLevelHelpMenu,createCommandHelpDialog } = require("../utils/help.js")

module.exports={
    name:Events.InteractionCreate,
    async execute(ctx) {
        if (ctx.isChatInputCommand()) {

            const command=ctx.client.commands.get(ctx.commandName);

            if (command) {

                try {await command.execute(ctx)}
                catch (error) {
                    console.error(error);
                    try { await ctx.reply({content:"There was an error while executing this command.",ephemeral:true}); }
                    catch (e) { await ctx.editReply({content:"There was an error while executing this command.",ephemeral:true}); }
                }

            }
        }

        if (ctx.isStringSelectMenu()) {

            if (ctx.customId == "help_selectcommandcategory") 
                await createSubLevelHelpMenu(ctx)

            if (ctx.customId = "help_commandlist")
                await createCommandHelpDialog(ctx)
                
        }

        if (ctx.isButton()) {

            if (ctx.customId == "help_commandlist_back") 
                await createTopLevelHelpMenu(ctx)

            if (ctx.customId == "help_command_back") 
                await createSubLevelHelpMenu(ctx)

        }
    }
}