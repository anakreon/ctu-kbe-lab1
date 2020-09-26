import * as fs from 'fs';
import { xorDecrypt } from './task1.js';

const keyRanges = [{
    start: 'a',
    end: 'z'
}, {
    start: 'A',
    end: 'Z'
}];

export function xorKeyLenghtDecrypt (hexciphertext, keyLength) {
    let rankMap;
    let foundkey = '';
    for (var k = 0; k < keyLength; ++k) {
        rankMap = {};
        console.log('k', k);
        for (var i = 0; i < keyRanges.length; ++i) {
            const range = keyRanges[i];
            for (var j = range.start.charCodeAt(0); j <= range.end.charCodeAt(0); ++j) {
                const key = foundkey + String.fromCharCode(j);
                const decodedText = xorDecrypt(hexciphertext, key);
                rankMap[key] = rank(decodedText);
            }
        }
        console.log(rankMap);
        const maxKey = findMaxKey(rankMap);
        console.log(maxKey);
        foundkey = maxKey;
    }
    return foundkey;
}

function rank (text) {
    let rank = 0;
    // alphabet more likely
    const alphamatch = text.match(/[a-zA-Z]{1}/gi); 
    if (alphamatch && alphamatch.length > 0) {
        rank += alphamatch.length * 0.5;
    }
    // words separated by spaces are likely
    const spacematch = text.match(/[a-zA-Z]\s[a-zA-Z]/gi);
    if (spacematch && spacematch.length > 0) {
        rank += spacematch.length * 0.5;
    }
    return rank;
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