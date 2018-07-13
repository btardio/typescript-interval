import { TestBed, async } from '@angular/core/testing';
import { Interval } from '../interval-interval';
import * as Combinatorics from 'js-combinatorics';
import { failMessage } from './TestHelperClass';
import { msg } from './TestHelperClass';
import { create_addition_dict, create_subtraction_dict, create_multiplication_dict, create_divide_dict, create_part1_divide_dict, create_part2_divide_dict } from './TestHelperClass';
import { Dictionary as basDictionary } from 'typescript-collections';


/**
 * TODO: 
 *   Test chaining
 *   Test sending array as argument
 */

// http://grouper.ieee.org/groups/1788/PositionPapers/ARITHYY.pdf

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
    }).compileComponents();
  }));

  
  
  
 
  
  it('should add two intervals', () => {
    

    let op = '+';
    
    const dict: basDictionary<string, string> = create_addition_dict();
                  
    {
        
      let ii = -Infinity;
      let jj = -Infinity;
      let kk = Infinity;
      let ll = Infinity;
      let A: Interval = new Interval(ii,jj);
      let B: Interval = new Interval(kk,ll);
      
      expect( A.add(B).length ).toEqual( 1 );     
  
      expect( A.add(B)[0].getStart() !== undefined && A.add(B)[0].getStart() !== null ).toBeTruthy();
    }
    
    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let b1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let b2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        b1range.forEach(k => {
          b2range.forEach(l => {
            
              {    
              let A: Interval = new Interval(i,j);
              let B: Interval = new Interval(k,l);
              
              let ii = i;
              let jj = j;
              let kk = k;
              let ll = l;
               
              if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }
              if ( kk > ll ) { let swap = kk; kk = ll; ll = swap; }
 
              let key = A.toString() + ' ' + op + ' ' + B.toString();
              
              failMessage(global,key).expect ( dict.containsKey( key ) ).toBeTruthy();
              
              failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect( A.add(B).length ).toEqual( 1 );
               
              expect( A.add(B)[0].getEnd() !== undefined && A.add(B)[0].getEnd() !== null ).toBeTruthy();
              failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect( A.add(B)[0] ).toEqual( new Interval(ii + kk, jj + ll) );
             
              expect ( A.add(B)[0].toString() ).toMatch ( dict.getValue( key ) );
              
              failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect( A.add(B)[0].getStart() !== undefined && A.add(B)[0].getStart() !== null ).toBeTruthy();
              failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect( A.subtract(B)[0].getStart() === Number.NaN ).toBeFalsy( );
              failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect( A.subtract(B)[0].getEnd() === Number.NaN ).toBeFalsy( );
              
              }
               
          });
        });
      });
    });

    {
    let i = 0;
    let j = -1;
    let k = -10;
    let l = 10;
    let a: Interval = new Interval(i,j);
    let b: Interval = new Interval(k,l);
    if ( i > j ) { let swap = i; i = j; j = swap; }
    if ( k > l ) { let swap = k; k = l; l = swap; }
    expect( a.add(b).length ).toEqual( 1 );
    expect( a.add(b)[0] ).toEqual( new Interval(-11,10) );
    } 
    
    {  
    let a: Interval = new Interval(1,3);
    let b: Interval = new Interval(2,5);
    
    expect( a.add(b).length ).toEqual( 1 );
    expect( a.add(b)[0] ).toEqual( new Interval(3,8) );
    }
    
    {  
    let a: Interval = new Interval(-Infinity,3);
    let b: Interval = new Interval(2,5);
    
    expect( a.add(b).length ).toEqual( 1 );
    expect( a.add(b)[0] ).toEqual( new Interval(-Infinity,8) );
    }

    {  
    let a: Interval = new Interval(-Infinity,3);
    let b: Interval = new Interval(-Infinity,Infinity);
    
    expect( a.add(b).length ).toEqual( 1 );
    expect( a.add(b)[0] ).toEqual( new Interval(-Infinity,Infinity) );
    }

  });
  
  it('should subtract two intervals', () => {
    
    let op = '-';
    
    const dict: basDictionary<string, string> = create_subtraction_dict();
    
    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let b1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let b2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        b1range.forEach(k => {
          b2range.forEach(l => {
          
              {   
                let A: Interval = new Interval(i,j);
                let B: Interval = new Interval(k,l);
                
                let ii = i;
                let jj = j;
                let kk = k;
                let ll = l;
                
                if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }
                if ( kk > ll ) { let swap = kk; kk = ll; ll = swap; }
  
                expect( A.subtract(B).length ).toEqual( 1 );
                 
                let key = A.toString() + ' ' + op + ' ' + B.toString(); 
                failMessage(global,key).expect ( dict.containsKey( key ) ).toBeTruthy();
                failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect ( A.subtract(B)[0].toString() ).toMatch ( dict.getValue( key ) );

                failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect( A.subtract(B)[0].getEnd() !== undefined && A.subtract(B)[0].getEnd() !== null ).toBeTruthy(); 
                
                failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect( A.subtract(B)[0] )
                .toEqual( new Interval(ii - ll, jj - kk) );
  
                expect( A.subtract(B)[0].getStart() !== undefined && A.subtract(B)[0].getStart() !== null ).toBeTruthy();
                expect( A.subtract(B)[0].getStart() === Number.NaN ).toBeFalsy( );
                expect( A.subtract(B)[0].getEnd() === Number.NaN ).toBeFalsy( );

                if ( A.subtract(B)[0].getStart() == (Infinity - Infinity) || A.subtract(B)[0].getEnd() == (Infinity - Infinity) ){
                  console.log( msg(A,B,ii,jj,kk,ll,op,dict) );
                } 
            } 
              
          });
        });
      });
    });
    
    {  
    let a: Interval = new Interval(1,3);
    let b: Interval = new Interval(2,5);
      
    expect( a.add(b).length ).toEqual( 1 );
    expect( a.subtract(b)[0] ).toEqual( new Interval(-4,1) );
    }
    
    {  
    let a: Interval = new Interval(-Infinity,3);
    let b: Interval = new Interval(2,5);
    
    expect( a.add(b).length ).toEqual( 1 );
    expect( a.subtract(b)[0] ).toEqual( new Interval(-Infinity,1) );
    }

    {  
    let a: Interval = new Interval(-Infinity,3);
    let b: Interval = new Interval(-Infinity,Infinity);
    
    expect( a.add(b).length ).toEqual( 1 );
    expect( a.subtract(b)[0] ).toEqual( new Interval(-Infinity,Infinity) );
    }

    
  });
     
  it('should multiply two intervals', () => {
     
    let op = '*';
      
    const dict: basDictionary<string, string> = create_multiplication_dict();
      
    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let b1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let b2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        b1range.forEach(k => {
          b2range.forEach(l => {
            
              {   
                let A: Interval = new Interval(i,j);
                let B: Interval = new Interval(k,l);
              
                let ii = i;
                let jj = j;
                let kk = k;
                let ll = l;
                 
                if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }
                if ( kk > ll ) { let swap = kk; kk = ll; ll = swap; }

                expect( A.multiply(B).length ).toEqual( 1 );
                  
                let key = A.toString() + ' ' + op + ' ' + B.toString(); 
                failMessage(global,key).expect ( dict.containsKey( key ) ).toBeTruthy();
                failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect ( A.multiply(B)[0].toString() ).toMatch ( dict.getValue( key ) );
 
              } 
                
          });
        });
      });
    });
  });
  
  it('should divide two intervals', () => {
    
    let op = '/';
      
    const dict: basDictionary<string, string> = create_divide_dict();
    
    const part1dict: basDictionary<string, string> = create_part1_divide_dict();
    const part2dict: basDictionary<string, string> = create_part2_divide_dict();
    
    let a1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let a2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    let b1range = [-Infinity,-2,-1,0,1,2,Infinity];
    let b2range = [-Infinity,-2,-1,0,1,2,Infinity];
    
    a1range.forEach(i => {
      a2range.forEach(j => {
        b1range.forEach(k => {
          b2range.forEach(l => {
            
              {   
                let A: Interval = new Interval(i,j);
                let B: Interval = new Interval(k,l);
              
                let ii = i;
                let jj = j;
                let kk = k;
                let ll = l;
                 
                if ( ii > jj ) { let swap = ii; ii = jj; jj = swap; }
                if ( kk > ll ) { let swap = kk; kk = ll; ll = swap; }

                expect( A.divide(B).length ).toEqual( 1 );
                  
                let key = A.toString() + ' ' + op + ' ' + B.toString(); 
                failMessage(global,key).expect ( dict.containsKey( key ) ).toBeTruthy();
                failMessage(global, msg(A,B,ii,jj,kk,ll,op,dict)).expect ( A.divide(B)[0].toString() ).toMatch ( dict.getValue( key ) );

                if ( A.divide(B)[0].hasInnerBounds() ) {
                  expect ( A.divide(B)[0].getStart() ).toEqual( -Infinity );
                  expect ( A.divide(B)[1].getEnd() ).toEqual( Infinity ); 
                  
                  expect( A.divide(B)[0].toString() === part1dict.getValue( key ) || A.divide(B)[1].toString() === part1dict.getValue( key ) ).toBeTruthy();
                  expect( A.divide(B)[0].toString() === part2dict.getValue( key ) || A.divide(B)[1].toString() === part2dict.getValue( key ) ).toBeTruthy();
                  
                }
                  
              } 
                
          });
        });
      });
    });
  });
});
























