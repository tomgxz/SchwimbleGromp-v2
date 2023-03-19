const { getGuildSetting,getUserSetting,setUserSetting } = require("./database.js")

function cooldownDiff(current,start) { return current-start }
function currentCooldownTime() { return Date.now() }

// Ran at the start of commands with cooldowns to make sure the command can be run
// Returns a 2 item tuple containing a boolean describing whether the command is currently on cooldown,
// and the number of milliseconds until the command goes off cooldown
// If the command is off cooldown, it will be (false,-1)
async function checkCooldown(ctx,command) {
    const commandsUntilCooldown = await getGuildSetting(ctx.guild.id,`commandsUntilCooldown_${command}`)
    const firstCommandExecuted = await getUserSetting(ctx.user.id,ctx.guild.id,`firstCommandExecuted_${command}`)
    const cooldownLength = (await getGuildSetting(ctx.guild.id,`cooldowns_${command}`))
    var commandsUntilCooldownRemaining = await getUserSetting(ctx.user.id,ctx.guild.id,`commandsUntilCooldownRemaining_${command}`)

    // if the cooldown is active (because the user has used all remaining command uses)
    if (commandsUntilCooldownRemaining <= 0) {
        const cooldown = await getUserSetting(ctx.user.id,ctx.guild.id,`cooldowns_${command}`)
        const cooldowndiff = cooldownDiff(currentCooldownTime(),cooldown)

        if (cooldowndiff >= cooldownLength) { // cooldown has finished since last command
            setUserSetting(ctx.user.id,ctx.guild.id,`commandsUntilCooldownRemaining_${command}`,commandsUntilCooldown)
            commandsUntilCooldownRemaining = commandsUntilCooldown
            setUserSetting(ctx.user.id,ctx.guild.id,`firstCommandExecuted_${command}`,-1)
        } else { // cooldown is active
            return [true,cooldownLength-cooldowndiff]
        }
    }

    if (!(firstCommandExecuted==-1)) { // "if there is a time for the first command execution"
        if (cooldownDiff(currentCooldownTime(),firstCommandExecuted) > (await getGuildSetting(ctx.guild.id,"commandsUntilCooldownResetTime")))
            // if the time since the first command execution is greater than the command counter reset time, clear the first command execution time
            setUserSetting(ctx.user.id,ctx.guild.id,`commandsUntilCooldownRemaining_${command}`,commandsUntilCooldown)
            setUserSetting(ctx.user.id,ctx.guild.id,`firstCommandExecuted_${command}`,-1)
    }

    return [false,-1]
}

// Ran at the end of commands with cooldowns to reduce counters / activate cooldowns.
async function triggerCooldown(ctx,command) {
    const commandsUntilCooldown = await getGuildSetting(ctx.guild.id,`commandsUntilCooldown_${command}`)
    var commandsUntilCooldownRemaining = await getUserSetting(ctx.user.id,ctx.guild.id,`commandsUntilCooldownRemaining_${command}`)

    if (commandsUntilCooldown == commandsUntilCooldownRemaining) { // if the first command has not yet been executed, set the start time for the command reset window
        setUserSetting(ctx.user.id,ctx.guild.id,`firstCommandExecuted_${command}`,currentCooldownTime())
    }

    if (commandsUntilCooldownRemaining == 1) { // if this is the last command
        setUserSetting(ctx.user.id,ctx.guild.id,`cooldowns_${command}`,currentCooldownTime())
    }
    
    // decrease the remaning commands
    setUserSetting(ctx.user.id,ctx.guild.id,`commandsUntilCooldownRemaining_${command}`,commandsUntilCooldownRemaining-1)
}

module.exports={cooldownDiff,currentCooldownTime,checkCooldown,triggerCooldown}