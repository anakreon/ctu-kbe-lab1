import chai from 'chai';
import * as fs from 'fs';
import { getPartialText, xorKeyLenghtDecrypt } from './task5.js';
import { xorDecrypt } from './task1.js';

const taskFile = 'text2.hex';

const { expect } = chai;

xdescribe('task 5', () => {    
    it('', () => {
        const keyLength = 10;
        const data = fs.readFileSync(taskFile, 'utf-8');
        const keyResult = xorKeyLenghtDecrypt(data, keyLength);
        
        const result = xorDecrypt(data, keyResult);
        //const result = xorDecrypt(data, 'Zzaaaaaaaz'); //E R
        //console.log(getPartialText(result, 0, 10));
        console.log(result);
        expect(result).to.contain('Busta Rhymes up in the place,');
    });
});
