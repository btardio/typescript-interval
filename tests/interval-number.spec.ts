import { TestBed, async } from '@angular/core/testing';
import { Interval } from '../interval-interval';
import { IntervalNumber } from '../interval-number';
import * as Combinatorics from 'js-combinatorics';
import { failMessage } from './TestHelperClass';
import { msg, msg_constant_A_to_c, msg_constant_c_to_A, msgtmp } from './TestHelperClass';
import { create_addition_dict, create_subtraction_dict, create_multiplication_dict, create_divide_dict, create_part1_divide_dict, create_part2_divide_dict } from './TestHelperClass'; 
import { create_divide_constants_dict, create_multiply_constants_dict, create_subtract_constants_dict, create_add_constants_dict } from './TestHelperClass';
import { Dictionary as basDictionary } from 'typescript-collections';


/**
 * TODO: 
 *   Test chaining
 *   Test sending array as argument
 */

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
    }).compileComponents();
  }));

  
 
 
  
  it('should add constant and interval, interval and constant', () => {
    
    let op = '+';
      
    const dict: basDictionary<string, string> = create_add_constants_dict();

    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let constant = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        constant.forEach(c => {            
              {   
                let A: Interval = new Interval(i,j);
              
                let ii = i;
                let jj = j;
                let cc = c;

                let cin = new IntervalNumber(c);
                
                if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }

                expect( A.add(c).length ).toEqual( 1 );
                expect( cin.add(A).length ).toEqual( 1 );
                  
                let keya = A.toString() + ' ' + op + ' ' + cin.toString();
                let keyb = cin.toString() + ' ' + op + ' ' + A.toString();
                
                failMessage(global,keya).expect ( dict.containsKey( keya ) ).toBeTruthy();
                failMessage(global,keyb).expect ( dict.containsKey( keyb ) ).toBeTruthy();
                
                failMessage(global,keya).expect ( dict.getValue( keya ) !== undefined ).toBeTruthy();
                failMessage(global,keyb).expect ( dict.getValue( keyb ) !== undefined ).toBeTruthy();
                
                
                // using number, c
            
                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.add(c)[0].toString() ).toMatch ( dict.getValue( keya ) );
                
                // using IntervalNumber, cin

                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.add(cin)[0].toString() ).toMatch ( dict.getValue( keya ) );
                failMessage(global, msg_constant_c_to_A(A,c,ii,jj,op,dict, keyb)).expect ( cin.add(A)[0].toString() ).toMatch ( dict.getValue( keyb ) );
                failMessage(global, msgtmp(dict, keyb)).expect ( cin.add(A)[0].toString() ).toMatch ( dict.getValue( keyb ) );
                expect( A.add(c)[0].hasInnerBounds() ).toBeFalsy();

              }

        });
      });
    });
  });  
  
  
  it('should subtract constant and interval, interval and constant', () => {
    
    let op = '-';
      
    const dict: basDictionary<string, string> = create_subtract_constants_dict();

    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let constant = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        constant.forEach(c => {            
              {   
                let A: Interval = new Interval(i,j);
              
                let ii = i;
                let jj = j;
                let cc = c;

                let cin = new IntervalNumber(c);
                
                if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }

                expect( A.subtract(c).length ).toEqual( 1 );
                expect( cin.subtract(A).length ).toEqual( 1 );
                  
                let keya = A.toString() + ' ' + op + ' ' + cin.toString();
                let keyb = cin.toString() + ' ' + op + ' ' + A.toString();
                
                failMessage(global,keya).expect ( dict.containsKey( keya ) ).toBeTruthy();
                failMessage(global,keyb).expect ( dict.containsKey( keyb ) ).toBeTruthy();
                
                failMessage(global,keya).expect ( dict.getValue( keya ) !== undefined ).toBeTruthy();
                failMessage(global,keyb).expect ( dict.getValue( keyb ) !== undefined ).toBeTruthy();
                
                
                // using number, c
            
                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.subtract(c)[0].toString() ).toMatch ( dict.getValue( keya ) );
                
                // using IntervalNumber, cin

                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.subtract(cin)[0].toString() ).toMatch ( dict.getValue( keya ) );
                failMessage(global, msg_constant_c_to_A(A,c,ii,jj,op,dict, keyb)).expect ( cin.subtract(A)[0].toString() ).toMatch ( dict.getValue( keyb ) );
                failMessage(global, msgtmp(dict, keyb)).expect ( cin.subtract(A)[0].toString() ).toMatch ( dict.getValue( keyb ) );
                expect( A.subtract(c)[0].hasInnerBounds() ).toBeFalsy();

              }

        });
      });
    });
  });  
     
  it('should multiply constant and interval, interval and constant', () => {
    
    let op = '*';
      
    const dict: basDictionary<string, string> = create_multiply_constants_dict();
    
    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let constant = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        constant.forEach(c => {            
              {   
                let A: Interval = new Interval(i,j);
              
                let ii = i;
                let jj = j;
                let cc = c;

                let cin = new IntervalNumber(c);
                
                if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }

                expect( A.multiply(c).length ).toEqual( 1 );
                expect( cin.multiply(A).length ).toEqual( 1 );
                  
                let keya = A.toString() + ' ' + op + ' ' + cin.toString();
                let keyb = cin.toString() + ' ' + op + ' ' + A.toString();
                
                failMessage(global,keya).expect ( dict.containsKey( keya ) ).toBeTruthy();
                failMessage(global,keyb).expect ( dict.containsKey( keyb ) ).toBeTruthy();
             
                // using number, c
            
                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.multiply(c)[0].toString() ).toMatch ( dict.getValue( keya ) );
                
                // using IntervalNumber, cin

                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.multiply(cin)[0].toString() ).toMatch ( dict.getValue( keya ) );
                failMessage(global, msg_constant_c_to_A(A,c,ii,jj,op,dict, keyb)).expect ( cin.multiply(A)[0].toString() ).toMatch ( dict.getValue( keyb ) );
                
                expect( A.multiply(c)[0].hasInnerBounds() ).toBeFalsy();

              }

        });
      });
    });
  });  
  
  it('should divide constant and interval, interval and constant', () => {
    
    let op = '/';
      
    const dict: basDictionary<string, string> = create_divide_constants_dict();
    
    const part1dict: basDictionary<string, string> = create_part1_divide_dict();
    const part2dict: basDictionary<string, string> = create_part2_divide_dict();
    
    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let constant = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        constant.forEach(c => {            
              {   
                let A: Interval = new Interval(i,j);
              
                let ii = i;
                let jj = j;
                let cc = c;

                let cin = new IntervalNumber(c);
                
                if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }

                expect( A.divide(c).length ).toEqual( 1 );
                expect( cin.divide(A).length ).toEqual( 1 );
                  
                let keya = A.toString() + ' ' + op + ' ' + cin.toString();
                let keyb = cin.toString() + ' ' + op + ' ' + A.toString();
                
                failMessage(global,keya).expect ( dict.containsKey( keya ) ).toBeTruthy();
                failMessage(global,keyb).expect ( dict.containsKey( keyb ) ).toBeTruthy();
             
                // using number, c
            
                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.divide(c)[0].toString() ).toMatch ( dict.getValue( keya ) );
                
                // using IntervalNumber, cin

                failMessage(global, msg_constant_A_to_c(A,c,ii,jj,op,dict, keya)).expect ( A.divide(cin)[0].toString() ).toMatch ( dict.getValue( keya ) );
                failMessage(global, msg_constant_c_to_A(A,c,ii,jj,op,dict, keyb)).expect ( cin.divide(A)[0].toString() ).toMatch ( dict.getValue( keyb ) );
                
                expect( A.divide(c)[0].hasInnerBounds() ).toBeFalsy();

              }
                

        });
      });
    });
  });
});












