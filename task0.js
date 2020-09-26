
export function bin2txt (input, bytesPerChar = 1) {
    let result = '';
    let bin = input.toString();
    const paddingLength = getBinaryPaddingLength(bin, bytesPerChar);
    if (paddingLength > 0) {
        bin = padWithZero(bin, bin.length + paddingLength);
    }
    for (var i = 0; i < bin.length; i += 8*bytesPerChar) {
        const charCodeBin = bin.substr(i, 8*bytesPerChar);
        const charCodeDec = parseInt(charCodeBin, 2).toString(10);
        result += String.fromCharCode(charCodeDec);
    }
    return result;
}

export function txt2bin (input, bytesPerChar = 1) {
    let result = '';
    let txt = input.toString();
    for (var i = 0; i < txt.length; ++i) {
        const charCodeDec = txt.charCodeAt(i);
        let charCodeBin = parseInt(charCodeDec, 10).toString(2);
        const paddingLength = getBinaryPaddingLength(charCodeBin, bytesPerChar);
        if (paddingLength > 0) {
            charCodeBin = padWithZero(charCodeBin, charCodeBin.length + paddingLength);
        }
        if (charCodeBin.length > 8*bytesPerChar) throw 'Char out of range (> bytes per char)';
        result += charCodeBin;
    }
    return result;
}

function padWithZero(input, targetLength) {
    return input.padStart(targetLength, '0');
}

function getBinaryPaddingLength (binaryText, bytesPerChar = 1) {
    return (8 * bytesPerChar - (binaryText.length % (8 * bytesPerChar))) % (8 * bytesPerChar);
}

export function bin2hex (input) {
    let workingInput = input;
    const paddingLength = getBinaryPaddingLength(input);
    if (paddingLength > 0) {
        workingInput = padWithZero(workingInput, workingInput.length + paddingLength);
    }
    let result = '';
    for (var i = 0; i < workingInput.length; i += 8) {
        result += parseInt(workingInput.substr(i, 8), 2).toString(16);
    }
    return result;
}

export function hex2bin (input) {
    let result = '';
    for (var i = 0; i < input.length; ++i) {
        let binary = parseInt(input[i], 16).toString(2);
        const paddingLength = getBinaryPaddingLength(binary, 1/2);
        if (paddingLength > 0) {
            binary = padWithZero(binary, binary.length + paddingLength);
        }
        result += binary;
    }
    return result;
}

export function hex2txt (input, bytesPerChar = 1) {
    const hex = input.toString();
    let result = '';
    for (var i = 0; i < hex.length; i += 2*bytesPerChar) {
        const charCodeHex = hex.substr(i, 2*bytesPerChar);
        const charCodeDec = parseInt(charCodeHex, 16).toString(10);
        result += String.fromCharCode(charCodeDec);
    }
    return result;
}

export function txt2hex (input, bytesPerChar = 1) {
    const txt = input.toString();
    let result = '';
    for (var i = 0; i < txt.length; ++i) {
        const charCodeDec = txt.charCodeAt(i);
        const charCodeHex = parseInt(charCodeDec, 10).toString(16);
        if (charCodeHex.length > 2*bytesPerChar) throw 'Char out of range (> bytes per char)';
        result += charCodeHex;
    }
    return result;
}