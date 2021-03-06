import * as fs from 'fs';
import { xorDecrypt } from './task1.js';

const vocabularyFile = 'words.txt';

const keyRanges = [{
    start: 'a',
    end: 'z'
}, {
    start: 'A',
    end: 'Z'
}];

export function xorAutoDecrypt (hexciphertext) {
    const wordsData = fs.readFileSync(vocabularyFile, 'utf-8');    
    const words = wordsData.split("\n").slice(1,50);
    const rankMap = {};
    for (var i = 0; i < keyRanges.length; ++i) {
        const range = keyRanges[i];
        for (var j = range.start.charCodeAt(0); j <= range.end.charCodeAt(0); ++j) {
            const key = String.fromCharCode(j);
            const decodedText = xorDecrypt(hexciphertext, key);
            rankMap[key] = rank(decodedText, words);
        }
    }
    const key = findMaxKey(rankMap);
    return key;
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