import chai from 'chai';
import { xorDecrypt } from './task1.js';

const { expect } = chai;

describe('task 2', () => {    
    it('decrypt', () => {
        const ciphertext = '404b48484504404b48484504464d4848045d4b';
        const key = '$';
        const expectedResult = 'dolla dolla bill yo';
        const result = xorDecrypt(ciphertext, key);
        expect(result).to.equal(expectedResult);
    });
});
