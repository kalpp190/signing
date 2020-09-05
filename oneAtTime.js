let binaryToDecimal = () => {
    let inputArray = splitInput();
    let workArray = ['<b>Decimal To Binary</b><br />']
    // Convert
    // -- If the number doesn't have a decimal component
    let intTotal = divideByInt(inputArray[0], 2);
    let decimalTotal = divideByDecimal(inputArray[1], 2);
    let finalAnswer = 0;
    if(inputArray[1].length === 0) {
        finalAnswer = intTotal;
    } else {
        finalAnswer = intTotal + decimalTotal;
    }
    console.log(`Final Answer: ${finalAnswer}`);
}

let divideByInt = (arr, base) => {
    let intTotal = 0;
    for(let x = 0; x < arr.length; x++) {
        intTotal += (arr[x]) * (base ** (arr.length - (x + 1)));
    }
    return intTotal;
}

let divideByDecimal = (arr, base) => {
    let decimalTotal = 0;
    //let workArr = [`${arr.join('')}<sub>${base}</sub> = `];
    for(let x = 1; x < arr.length; x++) {
        //.push(`(${arr[x]})*(${base})<sup>${-x}</sup>`);
        decimalTotal += (arr[x]) * (base ** (-x));
    }
    document.getElementById('work').innerHTML = workArr.join('');
    return decimalTotal;
}

// Get a 2D array ([ [intVal], [.decVal] ])
let splitInput = () => {
    let inputArray = document.getElementById('num').value.split('');
    if(inputArray.includes('.')) {
        inputArray = [inputArray.splice(0, inputArray.indexOf('.')), inputArray.splice(inputArray.indexOf('.'), )]
    } else {
        inputArray = [inputArray, []]
    }
    return inputArray;
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