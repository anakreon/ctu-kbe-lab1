import chai from 'chai';
import { xorKeyLenghtDecrypt, increment } from './task5-bruteforce.js';
import * as fs from 'fs';

const taskFile = 'text2.hex';

const { expect } = chai;

describe('task 5-bf', () => {    
    xit('', () => {
        const keyLength = 10;
        const data = fs.readFileSync(taskFile, 'utf-8');
        const result = xorKeyLenghtDecrypt(data, keyLength);
        expect(result).to.equal('M');
    });


    xdescribe('increment', () => {
        const max = 95;
        it('increment', () => {
            const permutation = [0,0,0,0,0,0];
            increment(permutation);
            expect(permutation).to.deep.equal([0,0,0,0,0,1]);
        });
        it('increment edge', () => {
            const permutation = [0,0,0,0,0,max];
            increment(permutation);
            expect(permutation).to.deep.equal([0,0,0,0,1,0]);
        });
        it('increment multiple', () => {
            const permutation = [5,7,2,3,8,4];
            increment(permutation);
            expect(permutation).to.deep.equal([5,7,2,3,8,5]);
        });
        it('increment multiple edges', () => {
            const permutation = [10,max,max,3,max,max];
            increment(permutation);
            expect(permutation).to.deep.equal([10,max,max,4,0,0]);
        });
        it('increment multiple edges 2', () => {
            const permutation = [10,max,max,max,max,max];
            increment(permutation);
            expect(permutation).to.deep.equal([11,0,0,0,0,0]);
        });
    })

});
