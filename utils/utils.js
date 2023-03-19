function wrapQuotes(a) {return `"${a}"`}
function csvToList(a) {return a.split(",")}

function listToCsv(a) {
    y=""
    for (x in a) y=`${y},${x}`
    return x
}

function removeAll(l,terms=[]) {
    for (x in l) {if (x in terms) {l.removeAll(x)}}
    return l
}

module.exports={wrapQuotes,csvToList,listToCsv,removeAll}