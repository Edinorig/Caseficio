const loginInput = {
    name: '',
    list:[
        {
            title: '',
            inputType: 'text',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            placeHolder: 'login',
            validate: '',
        },
        {
            title: '',
            inputType: 'pass',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            placeHolder: 'pass',
            validate: '',
        }
    ]
}

const milkInputData = {
    name: 'Milk',
    list:[
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
            validate: '',
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
            validate: '',
        }
    ]
}

const cheeseInputData = {
    name: 'Cheese',
    list:[
        {
            title: 'Quantita',
            inputType: 'number',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: '',
        },
        {
            title: 'Staggionatura',
            inputType: 'selector',
            value: ['Cheese','latte','moloko'],
            option: '2',
            maxLenght: '',
            required: 'required',
            className: 'input-data-select',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: '',
        },
        {
            title: 'Scelta',
            inputType: 'selector',
            value: ['Cheese','latte','moloko'],
            option: '1',
            maxLenght: '',
            required: 'required',
            className: 'input-data-select',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: '',
        },
        {
            title: 'Data',
            inputType: 'date',
            value: '',
            maxLenght: '',
            required: 'required',
            className: 'input-data',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: '',
        },
        {
            title: 'Codice',
            inputType: 'text',
            value: '',
            maxLenght: '',
            required: 'readonly',
            className: 'show-data',
            identificator: 'cheese-elements',
            hideDisplay: '',
            placeHolder: '',
            validate: '',
        },
    ]
}

export {loginInput,cheeseInputData,milkInputData}