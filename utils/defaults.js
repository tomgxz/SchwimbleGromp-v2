function getDefaultGuildSettings() {
    return {
        "commandsUntilCooldown": {
          "work": 5,
          "crime": 5,
          "rob": 1,
          "slut": 3,
          "beg": 1,
          "withdraw": 1,
          "deposit": 1,
          "send": 1,
          "cockfight":1,
          "blackjack":1,
          "slots":1,
          "buy":1
        },
        "cooldowns": {
          "work": 14400000,
          "crime": 14400000,
          "rob": 86400000,
          "slut": 86400000,
          "beg": 10000,
          "withdraw": 20000,
          "deposit": 20000,
          "send": 360000,
          "cockfight":1000,
          "blackjack":1000,
          "slots":1000,
          "buy":0
        },
        "payouts": {
          "crime": {
            "max": 300,
            "min": 10
          },
          "work": {
            "max": 250,
            "min": 10
          },
          "slut": {
            "max": 350,
            "min": 100
          }
        },
        "failrates": {
          "crime": 50,
          "rob": 70,
          "slut": 40
        },
        "fines": {
          "crime": {
            "max": 250,
            "min": 10
          },
          "work": {
            "max": 250,
            "min": 10
          },
          "slut": {
            "max": 250,
            "min": 100
          }
        },
        "betting": {
          "max": 10000,
          "min": 100
        },
        "shop": {
          "availableItems": "chicken,nft",
          "chicken": {
            "price":250,
            "max":1
          },
          "nft": {
            "price":800,
            "max":5
          }
        },
        "wallet_max": 50000,
        "interest": 5,
        "reply": 1,
        "commandsUntilCooldownResetTime": 3600,
        "coinname": "shmeckles",
        "defaultLeaderboardEntries": 10
    }  
}

function getDefaultUserSettings() {
    return {
        "commandsUntilCooldownRemaining": {
          "work": 5,
          "crime": 5,
          "rob": 1,
          "slut": 3,
          "beg": 1,
          "withdraw": 1,
          "deposit": 1,
          "send": 1,
          "cockfight":1,
          "blackjack":1,
          "slots":1,
          "buy":1
        },
        "firstCommandExecuted": {
          "work": -1,
          "crime": -1,
          "rob": -1,
          "slut": -1,
          "beg": -1,
          "withdraw": -1,
          "deposit": -1,
          "send": -1,
          "cockfight":-1,
          "blackjack":-1,
          "slots":-1,
          "buy":-1
        },
        "cooldowns": {
          "work": -1,
          "crime": -1,
          "rob": -1,
          "slut": -1,
          "beg": -1,
          "withdraw": -1,
          "deposit": -1,
          "send": -1,
          "cockfight":-1,
          "blackjack":-1,
          "slots":-1,
          "buy":-1
        },
        "inventory": {
          "chicken": "",
          "nft": ""
        },
        "wallet": 0,
        "bank": 0,
        "winnings": 0,
        "losses": 0
      }      
}

module.exports={getDefaultGuildSettings,getDefaultUserSettings}