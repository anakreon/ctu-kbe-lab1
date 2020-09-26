import chai from 'chai';
import { xorKeyLenghtDecrypt } from './task5.js';
import * as fs from 'fs';

const taskFile = 'text2.hex';

const { expect } = chai;

describe('task 5', () => {    
    xit('', () => {
        const keyLength = 10;
        const data = fs.readFileSync(taskFile, 'utf-8');
        const result = xorKeyLenghtDecrypt(data, keyLength);
        expect(result).to.equal('M');
    });
});
