import chai from 'chai';
import { xorAutoDecrypt } from './task5.js';
import * as fs from 'fs';

const taskFile = 'text1.hex';

const { expect } = chai;

describe('task 5', () => {    
    it('', () => {
        const data = fs.readFileSync(taskFile, 'utf-8');
        const result = xorAutoDecrypt(data);
        expect(result).to.equal('M');
    });
});
