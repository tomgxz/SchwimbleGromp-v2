const { sequelize } = require("../index.js")
const { Guild,User } = require("./dbobjects.js")

async function createGuild(guildid,s) { // "s" is the list of settings. it is called "s" as it is reffered to a lot and therefore makes code easier to read

    console.log(guildid)

    const result = await sequelize.transaction(async (t)=>{
        const guild = await Guild.create({
            discordguildid:guildid.toString(),

            commandsUntilCooldown_work:         s["commandsUntilCooldown"]["work"],
            commandsUntilCooldown_crime:        s["commandsUntilCooldown"]["crime"],
            commandsUntilCooldown_rob:          s["commandsUntilCooldown"]["rob"],
            commandsUntilCooldown_slut:         s["commandsUntilCooldown"]["slut"],
            commandsUntilCooldown_beg:          s["commandsUntilCooldown"]["beg"],
            commandsUntilCooldown_withdraw:     s["commandsUntilCooldown"]["withdraw"],
            commandsUntilCooldown_deposit:      s["commandsUntilCooldown"]["deposit"],
            commandsUntilCooldown_send:         s["commandsUntilCooldown"]["send"],
            commandsUntilCooldown_cockfight:    s["commandsUntilCooldown"]["cockfight"],
            commandsUntilCooldown_blackjack:    s["commandsUntilCooldown"]["blackjack"],
            commandsUntilCooldown_slots:        s["commandsUntilCooldown"]["slots"],
            commandsUntilCooldown_buy:          s["commandsUntilCooldown"]["buy"],
            
            cooldowns_work:     s["cooldowns"]["work"],
            cooldowns_crime:    s["cooldowns"]["crime"],
            cooldowns_rob:      s["cooldowns"]["rob"],
            cooldowns_slut:     s["cooldowns"]["slut"],
            cooldowns_beg:      s["cooldowns"]["beg"],
            cooldowns_withdraw: s["cooldowns"]["withdraw"],
            cooldowns_deposit:  s["cooldowns"]["deposit"],
            cooldowns_send:     s["cooldowns"]["send"],
            cooldowns_cockfight:s["cooldowns"]["cockfight"],
            cooldowns_blackjack:s["cooldowns"]["blackjack"],
            cooldowns_slots:    s["cooldowns"]["slots"],
            cooldowns_buy:      s["cooldowns"]["buy"],
            
            payouts_work_max:     s["payouts"]["work"]["max"],
            payouts_work_min:     s["payouts"]["work"]["min"],
            payouts_crime_max:    s["payouts"]["crime"]["max"],
            payouts_crime_min:    s["payouts"]["crime"]["min"],
            payouts_slut_max:     s["payouts"]["slut"]["max"],
            payouts_slut_min:     s["payouts"]["slut"]["min"],
            
            failrates_crime:    s["failrates"]["crime"],
            failrates_rob:      s["failrates"]["rob"],
            failrates_slut:     s["failrates"]["slut"],
            
            fines_work_max:     s["fines"]["work"]["max"],
            fines_work_min:     s["fines"]["work"]["min"],
            fines_crime_max:    s["fines"]["crime"]["max"],
            fines_crime_min:    s["fines"]["crime"]["min"],
            fines_slut_max:     s["fines"]["slut"]["max"],
            fines_slut_min:     s["fines"]["slut"]["min"],

            betting_max:        s["betting"]["max"],
            betting_min:        s["betting"]["min"],

            shop_availableItems:    s["shop"]["availableItems"],
            shop_chicken_price:    s["shop"]["chicken"]["price"],
            shop_chicken_max:    s["shop"]["chicken"]["max"],
            shop_nft_price:    s["shop"]["nft"]["price"],
            shop_nft_max:    s["shop"]["nft"]["max"],

            wallet_max:         s["wallet_max"],
            interest:           s["interest"],
            reply:              s["reply"],
            commandsUntilCooldownResetTime:     s["commandsUntilCooldownResetTime"],
            coinname:                           s["coinname"],
            defaultLeaderboardEntries:          s["defaultLeaderboardEntries"],

        },{transaction:t});
    })
}

async function createUser(discorduid,guildid,s) {

    console.log("Creating new user")

    const result = await sequelize.transaction(async (t)=>{
        const user = await User.create({
            discorduserid:discorduid.toString(),
            discordguildid:guildid.toString(),

            commandsUntilCooldownRemaining_work:     s["commandsUntilCooldownRemaining"]["work"],
            commandsUntilCooldownRemaining_crime:    s["commandsUntilCooldownRemaining"]["crime"],
            commandsUntilCooldownRemaining_rob:      s["commandsUntilCooldownRemaining"]["rob"],
            commandsUntilCooldownRemaining_slut:     s["commandsUntilCooldownRemaining"]["slut"],
            commandsUntilCooldownRemaining_beg:      s["commandsUntilCooldownRemaining"]["beg"],
            commandsUntilCooldownRemaining_withdraw: s["commandsUntilCooldownRemaining"]["withdraw"],
            commandsUntilCooldownRemaining_deposit:  s["commandsUntilCooldownRemaining"]["deposit"],
            commandsUntilCooldownRemaining_send:     s["commandsUntilCooldownRemaining"]["send"],
            commandsUntilCooldownRemaining_cockfight:s["commandsUntilCooldownRemaining"]["cockfight"],
            commandsUntilCooldownRemaining_blackjack:s["commandsUntilCooldownRemaining"]["blackjack"],
            commandsUntilCooldownRemaining_slots:    s["commandsUntilCooldownRemaining"]["slots"],
            commandsUntilCooldownRemaining_buy:      s["commandsUntilCooldownRemaining"]["buy"],

            firstCommandExecuted_work:     s["firstCommandExecuted"]["work"],
            firstCommandExecuted_crime:    s["firstCommandExecuted"]["crime"],
            firstCommandExecuted_rob:      s["firstCommandExecuted"]["rob"],
            firstCommandExecuted_slut:     s["firstCommandExecuted"]["slut"],
            firstCommandExecuted_beg:      s["firstCommandExecuted"]["beg"],
            firstCommandExecuted_withdraw: s["firstCommandExecuted"]["withdraw"],
            firstCommandExecuted_deposit:  s["firstCommandExecuted"]["deposit"],
            firstCommandExecuted_send:     s["firstCommandExecuted"]["send"],
            firstCommandExecuted_cockfight:s["firstCommandExecuted"]["cockfight"],
            firstCommandExecuted_blackjack:s["firstCommandExecuted"]["blackjack"],
            firstCommandExecuted_slots:    s["firstCommandExecuted"]["slots"],
            firstCommandExecuted_buy:      s["firstCommandExecuted"]["buy"],

            cooldowns_work:     s["cooldowns"]["work"],
            cooldowns_crime:    s["cooldowns"]["crime"],
            cooldowns_rob:      s["cooldowns"]["rob"],
            cooldowns_slut:     s["cooldowns"]["slut"],
            cooldowns_beg:      s["cooldowns"]["beg"],
            cooldowns_withdraw: s["cooldowns"]["withdraw"],
            cooldowns_deposit:  s["cooldowns"]["deposit"],
            cooldowns_send:     s["cooldowns"]["send"],
            cooldowns_cockfight:s["cooldowns"]["cockfight"],
            cooldowns_blackjack:s["cooldowns"]["blackjack"],
            cooldowns_slots:    s["cooldowns"]["slots"],
            cooldowns_buy:      s["cooldowns"]["buy"],

            inventory_chicken:  s["inventory"]["chicken"],
            inventory_nft:      s["inventory"]["nft"],

            wallet:             s["wallet"],
            bank:               s["bank"],
            winnings:           s["winnings"],
            losses:             s["losses"],
            
        },{transaction:t});
    })
}

module.exports={createGuild,createUser}
