import * as fs from 'fs';
import { xorDecrypt } from './task1.js';

const keysAsciiRange = {
    start: 97,//32,
    end: 122//127
};

const vocabularyFile = 'words.txt';

function initialize (keyLength) {
    let iterationArray = [];
    for (var i = 0; i < keyLength; ++i) {
        iterationArray[i] = 0;
    }
    return iterationArray;
}

function canIncrement (iterationArray) {
    return !iterationArray.every((value) => value === keysAsciiRange.end);
}

function getKeyValue (iterationArray) {
    return iterationArray.map((iterationValue) => {
        const charCode = keysAsciiRange.start + iterationValue;
        return String.fromCharCode(charCode);
    }).join('');
}

export function increment (iterationArray) {
    const maxValue = keysAsciiRange.end - keysAsciiRange.start;
    for (var i = iterationArray.length - 1; i >= 0; --i) {
        if (iterationArray[i] < maxValue) {
            iterationArray[i]++;
            if (i < iterationArray.length - 1) {
                for (var j = i + 1; j < iterationArray.length; ++j) {
                    iterationArray[j] -= maxValue;
                }
            }
            break;
        }
    }
}

function createKeysIterator(keyLength) {
    const iterationArray = initialize(keyLength); //0,3,1,2

    const keyIterator = {
       next: function() {
           let result;
           if (canIncrement(iterationArray)) {
               result = { value: getKeyValue(iterationArray), done: false }
               increment(iterationArray);
               return result;
           }
           return { value: null, done: true }
       }
    };
    return keyIterator;
}

export function xorKeyLenghtDecrypt (hexciphertext, keyLength) {
    const wordsData = fs.readFileSync(vocabularyFile, 'utf-8');    
    const words = wordsData.split("\n").slice(1,50);
    const rankMap = {};

    const keysIterator = createKeysIterator(keyLength);

    let key = keysIterator.next();
    while (!key.done) {
        const decodedText = xorDecrypt(hexciphertext, key.value);
        rankMap[key.value] = rank(decodedText, words);
        key = keysIterator.next();
    }
    console.log(rankMap);
    const maxKey = findMaxKey(rankMap);
    return maxKey;
}

function rank (text, words) {
    let rank = 0;
    words.forEach((word) => {
        const match = text.match(word, 'gi'); 
        if (match && match.length > 0) {
            rank += match.length;
        }
    });
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
