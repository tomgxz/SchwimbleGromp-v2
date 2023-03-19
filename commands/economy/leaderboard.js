const { SlashCommandBuilder } = require("discord.js");
const { getGuildSetting,getUserBalances } = require("../../utils/database.js")
const strings = require("../../data/strings.js")
const { User,Guild } = require("../../utils/dbobjects.js")
const { client } = require("../../index.js")

module.exports={
    data : new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription(strings.LEADERBOARD_DESC)
        .setDMPermission(false)
        .addIntegerOption(option=>option
            .setName("entries")
            .setDescription("Optional, the number of users shown")
            .setMinValue(1)
            .setMaxValue(10)),

    async execute(ctx) {
        const command = "leaderboard"
        if ((await Guild.findAll({where:{discordguildid:ctx.guild.id}})).length < 1) { await ctx.reply({content:strings.SERVER_NOT_REGISTERED,ephemeral:true});return }

        await ctx.deferReply()
        
        coinname=(await getGuildSetting(ctx.guild.id,"coinname"))

        var entries = ctx.options.getInteger("entries") ?? null;
        
        if (entries==null) entries=(await getGuildSetting(ctx.guild.id,"defaultLeaderboardEntries"))
        else if (isNaN(entries)) { await ctx.editReply({content:strings.ERROR_INVALID_NUMBER.replace("%VAR%","entries")});return }
        else if (entries < 1) { await ctx.editReply({content:strings.ERROR_NUMBER_GT.replace("%VAR%","zero")});return }
        else if (entries > 10) { await ctx.editReply({content:strings.ERROR_NUMBER_LT.replace("%VAR%","10")});return }

        var lb = {}
        var total = []
        var users = await User.findAll({where:{discordguildid:ctx.guild.id.toString()}})

        if (users.length < 1) {
            await ctx.editReply({content:strings.LEADERBOARD_NO_USERS})
            return
        }

        users = users.sort((a,b)=>b-a)

        for (const user of users) {
            const balances = await getUserBalances(user.discorduserid,ctx.guild.id)
            lb[`${balances.wallet+balances.bank}`]=user.discorduserid
            total.push(balances.wallet+balances.bank)
        }

        console.log(total)

        total = total.sort((a,b)=>b-a).slice(0,parseInt(entries))

        console.log(total)

        var index=1
        var fields=[]
        var changeAmt=true
        var output = ""

        for (const amount of total) {
            console.log(amount)
            output += `\n${index}.\t${client.users.cache.get(lb[amount.toString()].toString())}\n\t\t${amount} ${coinname}`
            if (index==entries) {
                changeAmt=false
                break
            } else index++
        }

        if (changeAmt) entries=total.length

        var header = strings.LEADERBOARD_HEADER
        if (entries == 1) header = strings.LEADERBOARD_HEADER_ONE

        await ctx.editReply({content:header.replace("%N%",entries) + output})
    },

}
