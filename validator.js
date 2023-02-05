const ibans = require("./ibans")

function mod97(str) {
    let res = 0

    for (let i = 0; i < str.length; i++) {
        res = (res * 10 + parseInt(str[i], 10)) % 97
    }

    return res
}

function buildRegex(format) {
    const pattern = format
    	.replace(/^([A-Z]{2})(.*)$/, "([A-Z]{2})$2")
    	.replace(/([0-9]+)!a/g, "([A-Z]{$1})")
    	.replace(/([0-9]+)!n/g, "([0-9]{$1})")
    	.replace(/([0-9]+)!c/g, "([A-Z0-9]{$1})")

    return new RegExp('^' + pattern + "$", "i")
}

function validate(iban) {
	if (!iban?.length) return false

	const countryCode = iban.slice(0, 2)
	const checkDigits = iban.slice(2, 4)
	const number = iban.slice(4)

	if (!Object.keys(ibans).includes(countryCode) || ibans[countryCode].length !== iban.length) {
		return false
	}

	if (ibans[countryCode].format.length > 0) {
		const regex = buildRegex(ibans[countryCode].format)

		if (!regex.test(iban)) {
			return false
		}
	}

	const digits = (number + countryCode + checkDigits).replace(/[A-Z]/g, (letter) => (
        letter.charCodeAt(0) - 55
    ))

    return mod97(digits) === 1
}



module.exports = {
	validate
}
