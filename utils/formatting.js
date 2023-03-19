const humanize = require("humanize")
const customhumanize = require("./humanize.js")

function humanizeNumber(n) {
    if (n < 11) return customhumanize.apnumber(n)
    return customhumanize.intWord(n,"%.2f")
}

function humanizeMS(n,min="seconds") {
    var s = Math.floor(n/1000)
    var ms = n - s*1000
    var m =  Math.floor(s/60)
    s = s - m*60
    var h =  Math.floor(m/60)
    m = m - h*60
    var d =  Math.floor(h/24)
    h = h - d*24
    
    ms = `${ms} miliseconds, `
    s = `${s} seconds, `
    m = `${m} minutes, `
    h = `${h} hours, `
    d = `${d} days, `

    if (parseInt(ms.split(" ")[0]) == 1) ms=ms.slice(0,-3) + ", "
    if (parseInt(s.split(" ")[0]) == 1) s=s.slice(0,-3) + ", "
    if (parseInt(m.split(" ")[0]) == 1) m=m.slice(0,-3) + ", "
    if (parseInt(h.split(" ")[0]) == 1) h=h.slice(0,-3) + ", "
    if (parseInt(d.split(" ")[0]) == 1) d=d.slice(0,-3) + ", "

    if (parseInt(ms.split(" ")[0]) < 1) ms=""
    if (parseInt(s.split(" ")[0]) < 1) s=""
    if (parseInt(m.split(" ")[0]) < 1) m=""
    if (parseInt(h.split(" ")[0]) < 1) h=""
    if (parseInt(d.split(" ")[0]) < 1) d=""

    if (min=="seconds") return (d+h+m+s).slice(0,-2)
    if (min="minutes") return (d+h+m).slice(0,-2)
    if (min="hours") return (d+h).slice(0,-2)
    if (min="days") return (d).slice(0,-2)
    return (d+h+m+s+ms).slice(0,-2)
}

function titleCase(str) {
    if (typeof str == "undefined") return "undefined"
    str = str.toLowerCase();
    str = str.split(' ');

    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    
    return str.join(' ');
  }

module.exports={humanizeNumber,humanizeMS,titleCase}