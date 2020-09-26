import chai from 'chai';
import { bin2txt, txt2bin, hex2bin, bin2hex, hex2txt, txt2hex } from './task0.js';

const { expect } = chai;

describe('bin2txt', () => {    
    it('', () => {
        const binary = '010010010110110100100000011100110110111101101101011001010010000001110011011001010110001101110010011001010111010000100000011001010110111001100011011011110110010001100101011001000010000001110100011001010111100001110100';
        const expectedResult = 'Im some secret encoded text';
        const result = bin2txt(binary);
        expect(result).to.equal(expectedResult);
    });
});

describe('txt2bin', () => {    
    it('', () => {
        const text = 'Im some plain text';
        const expectedResult = '010010010110110100100000011100110110111101101101011001010010000001110000011011000110000101101001011011100010000001110100011001010111100001110100';
        const result = txt2bin(text);
        expect(result).to.equal(expectedResult);
    });
});

describe('hex2bin', () => {    
    it('', () => {
        const hex = '426f6f6d';
        const expectedResult = '01000010011011110110111101101101';
        const result = hex2bin(hex);
        expect(result).to.equal(expectedResult);
    });
});

describe('bin2hex', () => {    
    it('', () => {
        const bin = '001001111110010110101010';
        const expectedResult = '27e5aa';
        const result = bin2hex(bin);
        expect(result).to.equal(expectedResult);
    });
});

describe('hex2txt', () => {    
    it('', () => {
        const hex = '426f6f6d';
        const expectedResult = 'Boom';
        const result = hex2txt(hex);
        expect(result).to.equal(expectedResult);
    });
});

describe('txt2hex', () => {    
    it('', () => {
        const txt = 'Boom';
        const expectedResult = '426f6f6d';
        const result = txt2hex(txt);
        expect(result).to.equal(expectedResult);
    });
    it('with 2-byte characters', () => {
        const txt = '漢字';
        const expectedResult = '6f225b57';
        const result = txt2hex(txt, 2);
        expect(result).to.equal(expectedResult);
    });
});