/*
Kalp Patel
Start Date: 09/03/2020
Note: If you want, all the alert statments could be uncommented..
        .. to inform the user when the make a mistake.
    Extra:
        Before calling convert, check if from is hex, THEN ONLY SUPPORT LETTERS OR THROW ERROR
        Change colors to inform user of error instead of throwing alerts.
            For Example: If 'To' type not selected make that header red(#FF0000).
*/

// Check if the input has more than 2 decimal points.
// If so, it doesn't allow user to enter another decimal point.
let checkTwoDecimal = () => {
    let userInput = document.getElementById('userInput');
    let number = userInput.value
    let userInputArray = userInput.value.split('');
    let decimalCounter = 0;
    userInputArray.forEach((elt) => (elt === '.' && decimalCounter++));
    if(decimalCounter > 1) {
        number = number.substring(0,number.length - 1);
        document.getElementById('userInput').value = number;
        // alert('ERROR: Can only have one decimal point!\nPlease Retry..');
    }
}

let checkSpaces = () => {
    let userInput = document.getElementById('userInput');
    let number = userInput.value
    let userInputArray = userInput.value.split('');
    let spaceCounter = 0;
    userInputArray.forEach((elt) => (elt === ' ' && spaceCounter++));
    if(spaceCounter > 0) {
        number = number.substring(0,number.length - 1);
        document.getElementById('userInput').value = number;
        // alert('ERROR: Can only have one decimal point!\nPlease Retry..');
    }
}

// Checkes if user is trying to convert between the same number system.
// If so, it throws an alert to inform the user.
let checkSameType = (inputType, numberType) => {
    if(inputType === 'radio') {
        if(document.getElementById(`${numberType}C`).checked === true) {
            // alert('ERROR: Cannot convert between the same types!\nPlease Retry..')
            document.getElementById(`${numberType}R`).checked = false;
        }
    }
    else {
        if(document.getElementById(`${numberType}R`).checked === true) {
            //alert('ERROR: Cannot convert between the same types!\nPlease Retry..')
            document.getElementById(`${numberType}C`).checked = false;
        }
    }
}

// Unchecks all radio buttons and checkboxes
let clearSelection = () => {
    numberTypes = ['decimal', 'binary', 'octal', 'hexadecimal'];
    for(let x = 0; x < numberTypes.length; x++) {
        document.getElementById(`${numberTypes[x]}R`).checked = false;
        document.getElementById(`${numberTypes[x]}C`).checked = false;
    }
}

let convert = () => {
    let errorString = '';
    // If the name is not empty, 'From' type is selected, and 'To' type is selected
    //  THEN continue to converting.
    if(inputIsEmpty() === false && radioButtonSelected() && checkBoxSelected()) {
        let conversionRequests = [];
        let types = ['decimal', 'binary', 'octal', 'hexadecimal'];
        let inputType = '';
        for(let x = 0; x < types.length; x++) {
            if(document.getElementById(`${types[x]}R`).checked === true) {
                inputType = types[x];
                console.log(inputType)
            }
        }
        let outputType = '';
        for(let x = 0; x < types.length; x++) {
            if(document.getElementById(`${types[x]}C`).checked === true) {
                outputType = types[x];
                conversionRequests.push([inputType, outputType]);
            }
        }

        // Loop through requests and call appropriate funciton
        for(let x = 0; x < conversionRequests.length; x++) {
            if(conversionRequests[x][0] === 'decimal') {
                if(conversionRequests[x][1] === 'binary') {
                    decimalToBinary();
                }
                else if(conversionRequests[x][1] === 'octal') {
                    decimalToOctal();
                }
                else if(conversionRequests[x][1] === 'hexadecimal') {
                    decimalToHexadecimal();
                }
            }
            else if(conversionRequests[x][0] === 'binary') {
                answers = document.getElementById('answers');
                input = document.getElementById('userInput').value;
                answers.innerHTML = `Binary: ${input}<sub>2</sub><br /><br />`;
                if(conversionRequests[x][1] === 'decimal') {
                    binaryToDecimal();
                }
                else if(conversionRequests[x][1] === 'octal') {
                    binaryToOctal();
                }
                else if(conversionRequests[x][1] === 'hexadecimal') {
                    binaryToHexadecimal();
                }
            }
            else if(conversionRequests[x][0] === 'octal') {
                if(conversionRequests[x][1] === 'decimal') {
                    octalToDecimal();
                }
                else if(conversionRequests[x][1] === 'binary') {
                    octalToBinary();
                }
                else if(conversionRequests[x][1] === 'hexadecimal') {
                    octalToHexadecimal();
                }
            }
            else if(conversionRequests[x][0] === 'hexadecimal') {
                if(conversionRequests[x][1] === 'decimal') {
                    hexadecimalToDecimal();
                }
                else if(conversionRequests[x][1] === 'binary') {
                    hexadecimalToBinary();
                }
                else if(conversionRequests[x][1] === 'octal') {
                    hexadecimalToOctal();
                }
            }
        }
        

        // Present new page after program is done converting.
        //window.location.href = "./answersPage.html";
    }
    // If only the 'From' type is selected,
    //  inform user to select the 'To' type(s).
    else {
        if(inputIsEmpty()) {
            errorString += '<b>ERROR:</b> Please enter the number you want to convert! <br />';
        }
        if(checkBoxSelected() === false) {
            errorString += '<b>ERROR:</b> Please select the "From" types! <br />';
        }
        // If only the 'To' type is selected,
        //  inform user to select the 'From' type.
        if(radioButtonSelected() === false) {
            errorString += '<b>ERROR:</b> Please select the "To" type(s)! <br />';
        }
    }  
    document.getElementById('errors').innerHTML = errorString;
}

// Checks if at least one of the radio buttons is selected before converting.
let checkBoxSelected = () => {
    let atLeastOneSelected = false;
    let numberTypes = ['decimal', 'binary', 'octal', 'hexadecimal'];
    for(let x = 0; x < numberTypes.length; x++) {
        if(document.getElementById(`${numberTypes[x]}C`).checked === true) {
            atLeastOneSelected = true;
            break;
        }
    }
    return atLeastOneSelected;
}

// Checks if one of the radio buttons is selected before converting.
let radioButtonSelected = () => {
    let oneSelected = false;
    let numberTypes = ['decimal', 'binary', 'octal', 'hexadecimal'];
    for(let x = 0; x < numberTypes.length; x++) {
        if(document.getElementById(`${numberTypes[x]}R`).checked === true) {
            oneSelected = true;
            break;
        }
    }
    return oneSelected;
}

// Checks if the user input box is empty.
let inputIsEmpty = () => {
    isEmpty = false;
    if(document.getElementById('userInput').value.length === 0) {
        isEmpty = true;
    }
    return isEmpty;
}

let formatIntAndDecimal = () => {
    // Splits user input into an array
    let userInput = document.getElementById('userInput').value.split('');
    if(userInput.includes('.')) {
        let intValue = userInput.slice(0, userInput.indexOf('.'));
        let decimalValue = userInput.slice(userInput.indexOf('.'),);
        return ([intValue, decimalValue]);
    }
    else {
        return ([userInput, null]);
    }
}

let decimalToBinary = () => {
    // NO DECIMAL VALUE: console.log(r[1] === null)
    let intDecimalArray = formatIntAndDecimal();
}

let decimalToOctal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let decimalToHexadecimal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let binaryToDecimal = () => {
    let intDecimalArray = formatIntAndDecimal();
    let answers = document.getElementById('answers');
    // Has no decimal
    letAnswerAndWork = [`${document.getElementById('userInput').value}<sub>2</sub> = `, `<br />${document.getElementById('userInput').value}<sub>2</sub> = `, `<br />${document.getElementById('userInput').value}<sub>2</sub> = `];
    if(intDecimalArray[1] === null) {
        let intTotal = 0;
        console.log(intDecimalArray[0]);
        for(let x = 0; x < intDecimalArray[0].length; x++) {
            intTotal += (intDecimalArray[0][x]) * (2 ** (intDecimalArray[0].length - (x + 1)));
            console.log(intTotal);
            letAnswerAndWork[0] += `${intDecimalArray[0][x]}*(2<sup>${(intDecimalArray[0].length - (x + 1))}</sup>)`
            letAnswerAndWork[1] += `${(intDecimalArray[0][x])*(2**x)}`;
            if(x < intDecimalArray[0].length - 1) {
                letAnswerAndWork[0] += '+';
                letAnswerAndWork[1] += '+';
            }
        }
        letAnswerAndWork[2] += String(intTotal);
        answers.innerHTML += (`<b>Binary To Decimal <br /> </b> ${letAnswerAndWork.join('')}<sub>10</sub>`);
        console.log(letAnswerAndWork);
    }
}

let binaryToOctal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let binaryToHexadecimal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let octalToDecimal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let octalToBinary = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let octalToHexadecimal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let hexadecimalToDecimal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let hexadecimalToBinary = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let hexadecimalToOctal = () => {
    let intDecimalArray = formatIntAndDecimal();
}

let hexTranslater = (val) => {
    hexVal = '';
    if(val >= 0 && val < 16) {
        switch (val) {
            case 10 : hexVal = 'A';
            break;
            case 11: hexVal = 'B';
            break;
            case 12: hexVal = 'C';
            break;
            case 13: hexVal = 'D';
            break;
            case 14: hexVal = 'E';
            break;
            case 15: hexVal = 'F';
            break;
            default: hexVal = `${val}`;
        }
        return hexVal;
    } else {
        return 'ERROR: NOT A VALID HEX VALUE!';
    }
}