module.exports={

    // COMMAND DESCRIPTIONS

    REGISTERSERVER_DESC: "Enables the Economy system. Required for most commands. Requires Administrator permissions.",
    SETUSERBALANCE_DESC: "Manually sets a specified user's balance. Requires Administrator permissions.",
    SETUSERCOOLDOWN_DESC: "Manually reset a specified user's cooldown for one of their commands. Requires Administrator permissions.",

    BALANCE_DESC: "Displays your balance or that of another user",
    BEG_DESC: "Earn some money the easy way",
    COOLDOWN_DESC: "See the cooldown of a command",
    CRIME_DESC: "Earn some money the evil way",
    DEPOSIT_DESC: "Move money from your wallet to your bank",
    LEADERBOARD_DESC: "Displays the total balances of the richest server users",
    ROB_DESC: "Earn some money the shneeky way",
    SEND_DESC: "Give money to someone else",
    SLUT_DESC: "Earn some money the schmexy way",
    WITHDRAW_DESC: "Move money from your bank to your wallet",
    WORK_DESC: "Earn some money the good way",

    HELP_DESC: "Shows the help menu",
    PING_DESC: "Replies with pong!",
    
    // ERROR MESSAGES

    ERROR_INVALID_NUMBER: "`%VAR%` needs to be a vaild number",
    ERROR_NUMBER_GT: "`%VAR%` needs to greater than %GT%",
    ERROR_NUMBER_LT: "`%VAR%` needs to be %LT% or less",

    LACKING_PERMISSION: "You don't have permission to use this command",

    // COOLDOWN STRINGS

    COOLDOWN_ACTIVE: "You cannot use `%COMMAND%` for `%TIME%`",

    // COMMAND-SPECIFIC STRINGS

    SERVER_ALREADY_REGISTERED: "This server has already been registered",
    SERVER_REGISTERED_SUCCESS: "This server has been registered!",
    SERVER_REGISTERED_FAILED: "There was an error when registering the server",
    SERVER_NOT_REGISTERED: "This server has not been registered. Ask an administratior to register the server in order to use this command.",

    SETUSERBALANCE_SUCCESS: "You set %USER%'s %STORE% balance to %AMOUNT% %COINNAME%",
    SETUSERCOOLDOWN_SUCCESS: "You reset %USER%'s `%COMMAND%` cooldown",

    BALANCE_WALLET: "%USER% wallet balance is %BALANCE% %COINNAME%",
    BALANCE_BANK: "%USER% bank balance is %BALANCE% %COINNAME%",

    BEG_SUCCESS: "You gained %AMOUNT% %COINNAME% from begging",
    GAVE_SUCCESS: "You gave %USER% %AMOUNT% %COINNAME%",
    COOLDOWN_SUCCESS: "You reset %USER%'s %COMMAND% cooldown",
    WITHDRAW_SUCCESS: "You withdrew %AMOUNT% %COINNAME%",
    DEPOSIT_SUCCESS: "You deposited %AMOUNT% %COINNAME%",
    SEND_SUCCESS: "You sent %AMOUNT% %COINNAME% to %USER%",
    ROB_SUCCESS: "You robbed %AMOUNT% %COINNAME% from %USER% and got away with it",

    ROB_FAIL: "You were caught by the police while robbing %USER% and were fined %AMOUNT% %COINNAME%",
    CRIME_FAIL: "You were caught by the police while committing a crime and were fined %AMOUNT% %COINNAME%",

    LEADERBOARD_HEADER: "**Top %N% richest people**",
    LEADERBOARD_HEADER_ONE: "**Richest Person**",
    LEADERBOARD_NO_USERS: "Nobody has any money!",

    DEPOSIT_DEBT: "You can't deposit while you are in debt",
    DEPOSIT_OVER: "You can't deposit more money than you have",

    WITHDRAW_DEBT: "You can't withdraw while you are in debt",
    WITHDRAW_OVER: "You can't withdraw more money than you have",

    ROB_NOT_SELF: "You can't rob yourself",
    ROB_NO_MONEY: "%USER% does not have any money on them",

    SEND_NOT_SELF: "You can't send money to yourself",
    SEND_NO_MONEY: "You can't send money if you don't have any in the bank",
    SEND_DEBT: "You can't send money while you are in debt",
    SEND_OVER: "You can't send more money than you have in the bank",
}