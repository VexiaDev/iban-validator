# iban-validator

<h2>Validate IBAN</h2>

```js
validate("ES9121000418450200051332")
```

Result: true or false

<h2>Testing all IBANs numbers</h2>

```js
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
```

___

Swift Registry: https://www.swift.com/standards/data-standards/iban-international-bank-account-number
Iban Structure: https://www.iban.com/structure
