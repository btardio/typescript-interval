
import { Interval } from '../interval-interval';
import { IntervalNumber } from '../interval-number';
import { Dictionary as basDictionary } from 'typescript-collections';
import { addition_list, subtraction_list, multiplication_list, divide_list, part1_divide_list, part2_divide_list } from './expectedResults';
import { multiply_constants_list, divide_constants_list, subtract_constants_list, add_constants_list } from './expectedResults';


const wrapAddExpectationResult = function(addExpectationResult: any, customMessage: string) {
  return function(passed, data) {
    data.message = customMessage;

    addExpectationResult(passed, data);
  };
};


interface JasAssertion<T> extends jasmine.Matchers<T> {

  // using ? with extended interfaces from js produced weird behavior reassigning variable
  addExpectationResult? (addExpectationResult: any, customMessage: string): void;

}

export function failMessage( global, customMessage: string ) {

  return {
    expect: ( function(actual)  {

                                  const myAssertion: JasAssertion<any> = expect(actual);

                                  // addExpectationResult is one-way assignment,
                                  // it can be reassigned to null but not set again, don't know why
                                  myAssertion.addExpectationResult = wrapAddExpectationResult(
                                     myAssertion.addExpectationResult, customMessage);

                                  return myAssertion;
                                })
  };
}


export function msg( A, B, ii, jj, kk, ll, op, dict: basDictionary<string, string> ): string {

  const key = A.toString() + ' ' + op + ' ' + B.toString();

  if ( op === '+' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + B.toString() + ' = ' + A.add(B)[0].toString() );
  } else if ( op === '-' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + B.toString() + ' = ' + A.subtract(B)[0].toString() );
  } else if ( op === '*' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + B.toString() + ' = ' + A.multiply(B)[0].toString() );
  }  else if ( op === '/' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + B.toString() + ' = ' + A.divide(B)[0].toString() );
  }

}


export function msgtmp( adict: basDictionary<string, string>, key: string ): string {

  return adict.getValue( key );

}


export function msg_constant_A_to_c( A: Interval, c: number, ii, jj, op, dict: basDictionary<string, string>, key: string ): string {

  if ( op === '+' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + c.toString() + ' = ' + A.add(c)[0].toString() );
  } else if ( op === '-' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + c.toString() + ' = ' + A.subtract(c)[0].toString() );
  } else if ( op === '*' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + c.toString() + ' = ' + A.multiply(c)[0].toString() );
  }  else if ( op === '/' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + A.toString() + ' ' + op + ' ' + c.toString() + ' = ' + A.divide(c)[0].toString() );
  }
}


export function msg_constant_c_to_A( A: Interval, c: number, ii, jj, op, dict: basDictionary<string, string>, key: string ): string {

  const cin = new IntervalNumber(c);

  if ( op === '-' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + c.toString() + ' ' + op + ' ' + A.toString() + ' = ' + cin.subtract(A)[0].toString() );
  } else if ( op === '*' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + c.toString() + ' ' + op + ' ' + A.toString() + ' = ' + cin.multiply(A)[0].toString() );
  }  else if ( op === '/' ) {
    return ('Expected: ' + dict.getValue( key ) +
                  ' Actual:' + c.toString() + ' ' + op + ' ' + A.toString() + ' = ' + cin.divide(A)[0].toString() );
  }

}

export function create_addition_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  addition_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}

export function create_subtraction_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  subtraction_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}



export function create_multiplication_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  multiplication_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}


export function create_divide_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  divide_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}




export function create_part1_divide_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  part1_divide_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}



export function create_part2_divide_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  part2_divide_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}

export function create_divide_constants_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  divide_constants_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}




export function create_multiply_constants_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  multiply_constants_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}






export function create_subtract_constants_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  subtract_constants_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}







export function create_add_constants_dict(): basDictionary<string, string> {

  const rDict = new basDictionary<string, string>();

  add_constants_list.forEach( line => {
    rDict.setValue( line[0].replace('-nan', 'nan'), line[1].replace('-nan', 'nan') );
  });

  return rDict;
}













