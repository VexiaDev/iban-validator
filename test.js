const ibans = require('./ibans')
const validator = require("./validator")

const validations = Object.entries(ibans).map(([country, iban]) => (
	{
		country,
		iban: iban.example,
		result: validator.validate(iban.example),
		sepa: iban.sepa,
		currency: iban.currency
	}
))

console.log(validations)
