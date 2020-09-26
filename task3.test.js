import chai from 'chai';
import { xorDecrypt } from './task1.js';
import * as fs from 'fs';

const taskFile = 'text1.hex';

const { expect } = chai;

describe('task 3', () => {    
    it('', () => {
        const data = fs.readFileSync(taskFile, 'utf-8');
        const key = 'M';
        const result = xorDecrypt(data, key);
        console.log(result);
        expect(result).to.contain('Busta Rhymes up in the place,');
    });
});
