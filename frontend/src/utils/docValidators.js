export const cnpjMask = (cpnjNumber) => {
    // format cnpj with punctuation
    return cpnjNumber
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

export const cnpjValidation = (cnpjNumber) => {
    if (!cnpjNumber) return false

    // Accepts receiving the cnpjNumber as a string, number or array with all digits
    const isString = typeof cnpjNumber === 'string'

    // Initial filter for inputs of type string
    if (isString) {
        // Limits to a maximum of 18 characters, for formatted CNPJ
        if (cnpjNumber.length > 18) return false

        // Test Regex to see if it's a valid digits-only string
        const digitsOnly = /^\d{14}$/.test(cnpjNumber)
        // Test Regex to see if it's a valid-formatted string
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpjNumber)

        // If the format is valid, use a trick to follow the validation flow
        return digitsOnly || validFormat;
    }

    // Save an array with all digits of the cnpjNumber
    const match = cnpjNumber.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    // Validate the number of digits
    if (numbers.length !== 14) return false

    // Eliminate invalids with all digits the same
    const items = [...new Set(numbers)]
    if (items.length === 1) return false

    // Validator calculation
    const calc = (x) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0

        for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
        }

        const result = 11 - (sum % 11)

        return result > 9 ? 0 : result
    }

    // Separate the last 2 digits of checkers
    const digits = numbers.slice(12)

    // Validate 1st. verifying digit
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false

    // Validate 2st. verifying digit
    const digit1 = calc(13)
    return digit1 === digits[1]
}

export const cpfMask = (cpfNumber) => {
    let value = cpfNumber.replace(/\D/g, "")                    //Remove everything that is not a digit
    value = value.replace(/(\d{3})(\d)/, "$1.$2")       //Put a dot between the third and fourth digits
    value = value.replace(/(\d{3})(\d)/, "$1.$2")       //Put a dot between the sixth and seventh digits
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Put a hyphen between the ninth and tenth digits
    return value
}

export const dateMask = (date) => {
    // add bars in date automatically
    let value = date.replace(/\D/g, "")
    value = value.replace(/(\d{2})(\d)/, '$1/$2')
    value = value.replace(/(\d{2})(\d)/, '$1/$2')
    return value
}

export const getFlagCC = (cardNumber) => {
    let numberClean = cardNumber.replace(/ /g, "")
    // flags regex
    let patterns = {
        VIS: /^4[0-9]{12}[0-9]{3}/,
        MC: /^5[1-5][0-9]{14}/,
        AMX: /^3[47][0-9]{13}/,
        DC: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        DIS: /^6(?:011|5[0-9]{2})[0-9]{12}/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}/,
        ELO: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
        HPC: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
    };
    for (let card in patterns)
        // if number is equal to pattern, return it
        if (numberClean.match(patterns[card])) {
            return card
        }
    return null
}

export const validateCard = (cardNumber) => {
    let value = cardNumber.replaceAll(' ', '')
    const length = value.length;
    let count = 0;

    if (length % 2 === 0) {
        // Traverse the whole credit card number.
        // Starts at the beginning of the number and begins doubling from the first number.
        for (let i = 0; i < length; i++) {
            let currentDigit = parseInt(value[i]);
            if (i % 2 === 0) // I only want to double every other number, starts doubling with the second-to-last number. I don't want to double the last number.
            {
                if ((currentDigit *= 2) > 9) {
                    // Separate the number into component parts and then add them together.
                    let trailingNumber = currentDigit % 10;
                    let firstNumber = parseInt(currentDigit / 10);

                    // If currentDigit was 18 then currentDigit is now 9.
                    currentDigit = firstNumber + trailingNumber;
                }
            }

            count += currentDigit;
        }
    } else {
        // Traverse the whole credit card number.
        // Starts at the end of the number and begins doubling from the second-to-last number. This fixes the case for odd-numbered length credit card numbers, like AMEX cards.
        for (let i = length - 1; i >= 0; i--) {
            let currentDigit = parseInt(value[i]);
            if ((i - 1) % 2 === 0) // I only want to double every other number, starts doubling with the second-to-last number. I don't want to double the last number.
            {
                if ((currentDigit *= 2) > 9) {
                    // Separate the number into component parts and then add them together.
                    let trailingNumber = currentDigit % 10;
                    let firstNumber = parseInt(currentDigit / 10);

                    // If currentDigit was 18 then currentDigit is now 9.
                    currentDigit = firstNumber + trailingNumber;
                }
            }

            count += currentDigit;
        }
    }
    return (count % 10) === 0;
}

export const formatNumberCC = (ccNumber) => {

    ccNumber = ccNumber.replace(/[^0-9]/g, '');
    let typeCheck = ccNumber.substring(0, 2);
    let cType = 0;
    let block1 = '';
    let block2 = '';
    let block3 = '';
    let block4 = '';
    let formatted = '';

    if (typeCheck.length === 2) {
        typeCheck = parseInt(typeCheck);
        if (typeCheck >= 40 && typeCheck <= 49) {
            cType = 1;
        } else if (typeCheck >= 51 && typeCheck <= 55) {
            cType = 1;
        } else if ((typeCheck >= 60 && typeCheck <= 62) || (typeCheck === 64) || (typeCheck === 65)) {
            cType = 1;
        } else if (typeCheck === 34 || typeCheck === 37) {
            cType = 2;
        } else {
            cType = 0
        }
    }
    if (cType === 1) {
        // breaking card in blocks
        block1 = ccNumber.substring(0, 4);
        block2 = ccNumber.substring(4, 8);
        block3 = ccNumber.substring(8, 12);
        block4 = ccNumber.substring(12, 16);

        if (block1.length === 4 && block2.length > 1) {
            block1 = block1 + ' ';
        }
        // for 4X4 cards
        if (block2.length === 4 && block3.length > 1) {
            block2 = block2 + ' ';
        }
        if (block3.length === 4 && block4.length > 1) {
            block3 = block3 + ' ';
        }
    } else if (cType === 2) {
        // for Amex cards
        block1 = ccNumber.substring(0, 4);
        block2 = ccNumber.substring(4, 10);
        block3 = ccNumber.substring(10, 15);
        block4 = '';
        if (block1.length === 4 && block2.length > 1) {
            block1 = block1 + ' ';
        }
        if (block2.length === 6 && block3.length > 1) {
            block2 = block2 + ' ';
        }
    } else if (cType === 0) {
        block1 = typeCheck;
        block2 = '';
        block3 = '';
        block4 = '';
    }

    formatted = block1 + block2 + block3 + block4;
    return formatted
}

// this validation is necessary, because input number doesn't support maxLength
export const isNumber = (value) => {
    let number = Number(value)
    return number ? value : ''
}
