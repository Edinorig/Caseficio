const loginInput = {
    name: '',
    list: [
        {
            title: '',
            inputType: 'text',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            placeHolder: 'login',
            validate: (value) => validateText(value),
        },
        {
            title: '',
            inputType: 'pass',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            placeHolder: 'pass',
            validate: (value) => validateText(value),
        }
    ]
}

const milkInputData = {
    name: 'Milk',
    list: [
        {
            title: 'Latte estratta',
            inputType: 'number',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            identificator: 'milk-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => validateNumber(value),
        },
        {
            title: 'Latte lavorato',
            inputType: 'number',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data ',
            identificator: 'milk-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => validateNumber(value),
        }
    ]
}

const cheeseInputData = {
    name: 'Cheese',
    list: [
        {
            title: 'Quantita',
            inputType: 'number',
            value: '12',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => validateNumber(value),
        },
        {
            title: 'Staggionatura',
            inputType: 'selector',
            value: ['Cheese', 'latte', 'moloko'],
            option: '2',
            maxLenght: '',
            required: 'required',
            className: 'input-data-select',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => { return true }, 
        },
        {
            title: 'Scelta',
            inputType: 'selector',
            value: ['Cheese', 'latte', 'moloko'],
            option: '1',
            maxLenght: '',
            required: 'required',
            className: 'input-data-select',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => { return true }, 
        },
        {
            title: 'Data',
            inputType: 'date',
            value: '3211f',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => { return true },
        },
        {
            title: 'Codice',
            inputType: 'text',
            value: '123123',
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: (value) => { return true },
        },
    ]
}



const validateText = (text) => {
    const textToValidate = text.toString().replace(/^\s+/, '');

    if (textToValidate.length === 0) {
        return false;
    }

    if (/[^a-zA-Z\s]/.test(textToValidate)) {
        return false;
    }

    return true;
}

function validateNumber(input) {
    return /^[0-9]+$/.test(input);
}


export { loginInput, cheeseInputData, milkInputData }