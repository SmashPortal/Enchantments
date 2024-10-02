window.onload = () => {
    ["npt-em", "npt-ench"].forEach(elem => {
        document.getElementById(elem).addEventListener("blur", () => {
            value()
        })
    })
}

function red(error) {
    let elem = document.getElementsByClassName("emerald")[0]
    if (!error)
        return elem.classList.remove("error")
    elem.classList.add("error")
    document.getElementById("percent-bar").title = "Error"
    document.getElementById("percent").style.width = 0
    return error
}

function value() {
    red()
    let em = document.getElementById("npt-em").value;
    if (!em) return
    if (em < 5 || 64 < em)
        throw new Error(red("Invalid price: Must be between 5 and 64."))
    let ench = document.getElementById("npt-ench").value.toUpperCase();
    if (!ench) return
    let lvl = getLevel(ench)
    let min = lvl * 3 + 2
    let max = Math.min(lvl * 13 + 6, 64)
    {["MENDING", "FROST WALKER"].forEach(tr => {
        if (ench.includes(tr)) {
            if (em % 2 == 0) {
                min *= 2
                max *= 2
            }
            else
                throw new Error(red("Invalid price for a treasure enchantment: Must be an even amount."))
        }
    })}
    if (em < min || max < em) 
        throw new Error(red(`Invalid price for a level ${lvl} enchantment: Must be in range ${min}-${max}.`))
    let val = `${Math.round((1 - (em - min) / (max - min)) * 100)}%`
    document.getElementById("percent-bar").title = val
    document.getElementById("percent").style.width = val
}

function getLevel(ench) {
    switch (ench.split(' ').slice(-1).toString()) {
        case '5': case 'V': return 5
        case '4': case "IV": return 4
        case '3': case "III": return 3
        case '2': case "II": return 2
        default: return 1
    }
}
