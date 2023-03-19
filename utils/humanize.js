// function for handling infinite and NaN cases
function _format_not_finite(value) {
    if (isNaN(value)) {
        return "NaN"
    } else if (value == Number.POSITIVE_INFINITY) {
        return "+Inf"
    } else if (value == Number.NEGATIVE_INFINITY) {
        return "-Inf"
    }
}

function _ngettext(message,plural,num) {
    if (num > 1) return plural
    return message
}

// function to mark two strings as pluralized translateions without translating them
function _ngettext_noop(singular,plural) {
    return [singular,plural]
}

var powers = []
for (var x of [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 100]) {
    powers.push(10**x)
}

human_powers = [
    _ngettext_noop("thousand", "thousand"),
    _ngettext_noop("million", "million"),
    _ngettext_noop("billion", "billion"),
    _ngettext_noop("trillion", "trillion"),
    _ngettext_noop("quadrillion", "quadrillion"),
    _ngettext_noop("quintillion", "quintillion"),
    _ngettext_noop("sextillion", "sextillion"),
    _ngettext_noop("septillion", "septillion"),
    _ngettext_noop("octillion", "octillion"),
    _ngettext_noop("nonillion", "nonillion"),
    _ngettext_noop("decillion", "decillion"),
    _ngettext_noop("googol", "googol"),
]

function intWord(value,format="%.1f") {
    try {
        if (!(isFinite(parseFloat(value)))) return _format_not_finite(parseFloat(value))
        value = parseInt(value)
    } catch (e) {
        if (e instanceof TypeError) return value.toString()
        throw e
    }

    var negativeprefix = ""
    if (value < 0) {
        value*=-1
        negativeprefix = "-"
    }

    if (value < powers[0]) return negativeprefix + value.toString()

    for (var [ordinal,power] of powers.slice(1).entries()) {
        ordinal++
        console.log(ordinal,power)
        if (value < power) {
            var chopped = value / parseFloat(powers[ordinal-1])
            var powersdifference = powers[ordinal]/powers[ordinal-1]

            if (parseFloat(format % chopped) == powersdifference) {
                chopped = value / parseFloat(powers[ordinal])
                var [singular,plural] = human_powers[ordinal]
                if (chopped.toString().includes("."))
                chopped = chopped.toString().split(".")[0] + "." + chopped.toString().split(".")[1].slice(0,parseInt(format.split(".")[1].replace("f",""))+1)
            
                return (
                    negativeprefix +
                    //" ".join([format,_ngettext(singular,plural,Math.ceil(chopped))])
                    [chopped,_ngettext(singular,plural,Math.ceil(chopped))].join(" ")
                )
            }

            var [singular,plural] = human_powers[ordinal-1]

            if (chopped.toString().includes("."))
                chopped = chopped.toString().split(".")[0] + "." + chopped.toString().split(".")[1].slice(0,parseInt(format.split(".")[1].replace("f",""))+1)
            
            return (
                negativeprefix +
                [chopped,_ngettext(singular,plural,Math.ceil(chopped))].join(" ")
            )
        }
    }

    return negativeprefix + value.toString()
}

function apnumber(value) {
    try {
        if (!(isFinite(parseFloat(value)))) return _format_not_finite(parseFloat(value))
        value = parseInt(value)
    } catch (e) {
        if (e instanceof TypeError) return value.toString()
        throw e
    }

    if (!(0 <= value < 10)) return value.toString()

    var negativeprefix = ""

    if (-9 <= value < 0) {
        value*=-1
        negativeprefix = "minus "
    }

    return negativeprefix + {
        0:"zero",
        1:"one",
        2:"two",
        3:"three",
        4:"four",
        5:"five",
        6:"six",
        7:"seven",
        8:"eight",
        9:"nine",
    }[value]
}

module.exports={intWord,apnumber}