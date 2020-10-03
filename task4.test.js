import chai from 'chai';
import { xorAutoDecrypt } from './task4.js';
import * as fs from 'fs';
import { xorDecrypt } from './task1.js';

const taskFile = 'text1.hex';

const { expect } = chai;

describe('task 4', () => {    
    it('', () => {
        const data = fs.readFileSync(taskFile, 'utf-8');
        const result = xorAutoDecrypt(data);
        expect(result).to.equal('m'); //M
    });
});
