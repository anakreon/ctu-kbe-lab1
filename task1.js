import { txt2bin, bin2hex, hex2bin, bin2txt } from './task0.js';

export function xorEncrypt (plaintext, key) {
    const binText = txt2bin(plaintext);
    const binKey = txt2bin(key);
    let result = '';
    for (var i = 0; i < binText.length; ++i) {
        result += (binText[i] ^ binKey[i % binKey.length]);
    }
    let hexResult = '';
    for (var i = 0; i < result.length; i += 4) {
        hexResult += bin2hex(result.substr(i, 4));
    }
    return hexResult;
}

export function xorDecrypt (hexciphertext, key) {
    const binKey = txt2bin(key);
    const binText = hex2bin(hexciphertext);
    let result = '';
    for (var i = 0; i < binText.length; ++i) {
        result += (binText[i] ^ binKey[i % binKey.length]);
    }
    return bin2txt(result);
}