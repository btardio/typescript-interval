import { Interval } from './interval-interval';
import { div_non_zero_constant, div_negative_constant, div_positive_constant, div_zero_constant } from './interval-utility';

export class IntervalNumber {

  protected p: number;

  /**
   * Expected inputs include all real numbers, Infinity, -Infinity
   */
  constructor( p: number ) {
    this.p = p;
  }

  /**
   * String representation of this constant.
   */
  toString(): string {

    let rStr: string;
    rStr = '';
    if ( this.p === Infinity ) { rStr += 'inf';
    } else if ( this.p === -Infinity ) { rStr += '-inf';
    } else if ( this.p.toString() === 'NaN' ) { rStr += 'nan';
    } else { rStr += this.p; }

    return rStr;
  }

  /**
   * Returns the constant as a number.
   */
  getConstant(): number {
    return this.p;
  }

  /**
   * Sets the constant.
   */
  setConstant( p: number ): void {
    this.p = p;
  }


  /**
   * Add this constant to an interval, returning an interval.
   */
  add ( ii: Interval | Array<Interval> ): Array<Interval> {

    const rarray: Array<Interval> = new Array<Interval>();

    if ( ii instanceof Interval ) {
      rarray.push( new Interval( this.p + ii.getStart(), this.p + ii.getEnd() ) );
    } else {
      ii.forEach( i => {
        rarray.push( new Interval( this.p + i.getStart(), this.p + i.getEnd() ) );
      });
    }

    return rarray;

  }

  /**
   * Subtracts this constant from an interval, returning an interval.
   */
  subtract ( ii: Interval | Array<Interval> ): Array<Interval> {

    const rarray: Array<Interval> = new Array<Interval>();

    if ( ii instanceof Interval ) {
      rarray.push( new Interval( this.p - ii.getStart(), this.p - ii.getEnd() ) );
    } else {
      ii.forEach( i => {
        rarray.push( new Interval( this.p - i.getStart(), this.p - i.getEnd() ) );
      });
    }

    return rarray;

  }

  private _multiply ( ii: Interval ): Interval {

    if ( this.p < 0 ) {
      return( new Interval( this.p * ii.getEnd(), this.p * ii.getStart() ) );
    } else if ( this.p === 0 ) {
      return( new Interval( 0, 0 ) );
    } else {
      return( new Interval( this.p * ii.getStart(), this.p * ii.getEnd() ) );
    }
  }

  multiply ( ii: Interval | Array<Interval> ): Array<Interval> {

    // template<class T, class Policies> inline
    // interval<T, Policies> operator*(const T& x, const interval<T, Policies>& y)
    // {
    //  typedef interval<T, Policies> I;
    //  if (interval_lib::detail::test_input(x, y))
    //    return I::empty();
    //  typename Policies::rounding rnd;
    //  const T& yl = y.lower();
    //  const T& yu = y.upper();
    //  // x is supposed not to be infinite
    //  if (interval_lib::user::is_neg(x))
    //    return I(rnd.mul_down(x, yu), rnd.mul_up(x, yl), true);
    //  else if (interval_lib::user::is_zero(x))
    //    return I(static_cast<T>(0), static_cast<T>(0), true);
    //  else
    //    return I(rnd.mul_down(x, yl), rnd.mul_up(x, yu), true);
    // }

    const rarray = new Array<Interval>();

    if ( ii instanceof Interval ) {
      rarray.push( this._multiply ( ii ) );
    } else {
      ii.forEach( i => {
        rarray.push( this._multiply ( i ) );
      });
    }

    return ( rarray );

  }




  private _divide ( ii: Interval ): Interval {

    // template<class T, class Policies> inline
    // interval<T, Policies> operator/(const T& x, const interval<T, Policies>& y)
    // {
    //  if (interval_lib::detail::test_input(x, y))
    //    return interval<T, Policies>::empty();
    //  if (zero_in(y))
    //    if (!interval_lib::user::is_zero(y.lower()))
    //      if (!interval_lib::user::is_zero(y.upper()))
    //        return interval_lib::detail::div_zero<T, Policies>(x);
    //      else
    //        return interval_lib::detail::div_negative<T, Policies>(x, y.lower());
    //    else
    //      if (!interval_lib::user::is_zero(y.upper()))
    //        return interval_lib::detail::div_positive<T, Policies>(x, y.upper());
    //      else
    //        return interval<T, Policies>::empty();
    //  else
    //    return interval_lib::detail::div_non_zero(x, y);
    // }

    if ( ii.hasZero() ) {
      if ( ! ( ii.getStart() === 0 ) ) {
        if ( ! ( ii.getEnd() === 0 ) ) {
          return( div_zero_constant( this.p ) );
        } else {
          return( div_negative_constant( this.p, ii.getStart() ) );
        }
      } else {
        if ( ! ( ii.getEnd() === 0 ) ) {
          return( div_positive_constant( this.p, ii.getEnd() ) );
        } else {
          return( new Interval( -Number.NaN, Number.NaN ) );
        }
      }
    } else {
      return( div_non_zero_constant( this.p, ii ) );
    }

  }

  divide ( ii: Interval | Array<Interval> ): Array<Interval> {

    const rarray = new Array<Interval>();

    if ( ii instanceof Interval ) {
      rarray.push( this._divide ( ii ) );
    } else {
      ii.forEach( i => {
        rarray.push( this._divide ( i ) );
      });
    }

    return ( rarray );
  }
}





