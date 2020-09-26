import chai from 'chai';
import { xorEncrypt, xorDecrypt } from './task1.js';

const { expect } = chai;

describe('task 1', () => {    
    it('encrypt', () => {
        const plaintext = 'everything remains raw';
        const key = 'word up';
        const expectedCiphertext = '121917165901181e01154452101d16061c1700071100';
        const result = xorEncrypt(plaintext, key);
        expect(result).to.equal(expectedCiphertext);
    });
    it('decrypt', () => {
        const ciphertext = '121917165901181e01154452101d16061c1700071100';
        const key = 'word up';
        const expectedResult = 'everything remains raw';
        const result = xorDecrypt(ciphertext, key);
        expect(result).to.equal(expectedResult);
    });
    it('encrypt 2', () => {
        const plaintext = 'the world is yours';
        const key = 'illmatic';
        const expectedCiphertext = '1d04094d161b1b0f0d4c051e410d06161b1f';
        const result = xorEncrypt(plaintext, key);
        expect(result).to.equal(expectedCiphertext);
    });
});
