import { xorDecrypt } from './task1.js';

const keyRanges = [{
    start: 32,
    end: 126
}];

/*
const keyRanges = [{
    start: 'a',
    end: 'z'
}, {
    start: 'A',
    end: 'Z'
}];*/

export function xorKeyLenghtDecrypt (hexciphertext, keyLength) {
    let rankMap;
    let charMap;
    let foundkey = '';
    for (var k = 0; k < keyLength; ++k) {
        rankMap = {};
        charMap = {};
        //console.log('k', k);
        for (var i = 0; i < keyRanges.length; ++i) {
            const range = keyRanges[i];
            for (var j = range.start; j <= range.end; ++j) {
                const char = String.fromCharCode(j);
                if (!isAlphanumeric(char)) {
                    continue;
                }
                let key = foundkey + char;
                let paddedKey = key.padEnd(keyLength, 'a');
                //console.log(key, paddedKey);
                const decodedText = xorDecrypt(hexciphertext, paddedKey);
                //console.warn(key);
                const partialText = getPartialText(decodedText, k, keyLength);
                //fillCharMap(partialText, k, keyLength, charMap);
                //console.warn(charMap);
                //console.warn(partialText);
                rankMap[key] = /*rankAlphabet(partialText) + rankSpaces(decodedText) +*/ getIC(partialText);
            }
        }
        console.log(rankMap);
        //break;
        const maxKey = findMaxKey(rankMap);
       // const maxKey = findMaxKey(rankMap);
        //console.log(maxKey);
        foundkey = maxKey;
    }
    return foundkey;
}

export function getPartialText (text, keyIndex, keyLength) {
    let result = '';
    for (let i = keyIndex; i < text.length; i += keyLength) {
        result += text[i];
    }
    return result;
}

function fillCharMap (text, keyIndex, keyLength, charMap) {
    for (let i = keyIndex; i < text.length; i += keyLength) {
        if (!charMap[text[i]]) {
            charMap[text[i]] = 0;
        }
        charMap[text[i]]++;
    }
}

function rankAlphabet (text) {
    let rank = 0;
    // alphabet more likely
    const alphamatch = text.match(/[a-zA-Z]{1}/gi); 
    if (alphamatch && alphamatch.length > 0) {
        rank += alphamatch.length * 0.5;
    }
    return rank;
}

function rankSpaces (text) {
    let rank = 0;
    // words separated by spaces are likely
    const spacematch = text.match(/[a-zA-Z]\s[a-zA-Z]/gi);
    if (spacematch && spacematch.length > 0) {
        rank += spacematch.length * 0.5;
    }
    return rank;
}

/*function rankCharMap (charMap) {
    const keys = Object.keys(charMap);
    let count = 0;
    let sum = 0;
    for (var i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!isAlphanumeric(key)) {
            continue;
        }
        if (charMap[key] > 1) {
            sum += (charMap[key] * (charMap[key] - 1));
        }
        count++;
    }
    const IC = sum / ((count * (count - 1)) / 26);
    const EnglishIC = 0.067;
    //console.log('keys', keys, 'count', count, 'sum', sum, 'IC', IC)
    return IC; //1 / Math.abs(IC - EnglishIC);
}*/

function getIC(str) {
    str = str.toLowerCase().replace(/[^a-z]/g, "");
    var counts = new Array(26);
    var totcount=0;
    for(var i=0; i<26; i++) counts[i] = 0;
    for(i=0; i<str.length; i++){
        counts[str.charCodeAt(i) - 97]++;
        totcount++;
    }
    var sum = 0;
    for(i=0; i<26; i++) sum = sum + counts[i]*(counts[i]-1);
    var ic = sum / (totcount*(totcount-1));
    return ic;
}

function isAlphanumeric (key) {
    const isCapitalLetter = key.charCodeAt(0) >= 65 &&  key.charCodeAt(0) <= 90;
    const isLowerCaseLetter = key.charCodeAt(0) >= 97 &&  key.charCodeAt(0) <= 122;
    return isCapitalLetter || isLowerCaseLetter;
}

function findMaxKey (rankMap) {
    let maxValue = 0;
    let maxKey = 0;
    Object.keys(rankMap).forEach((key) => {
        const value = rankMap[key];
        if (value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    });
    return maxKey;
}