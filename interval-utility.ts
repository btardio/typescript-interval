
import { Interval } from './interval-interval';


// template<class T, class Policies> inline
// interval<T, Policies> div_non_zero(const interval<T, Policies>& x,
//                                   const interval<T, Policies>& y)
// {
//  // assert(!in_zero(y));
//  typename Policies::rounding rnd;
//  typedef interval<T, Policies> I;
//  const T& xl = x.lower();
//  const T& xu = x.upper();
//  const T& yl = y.lower();
//  const T& yu = y.upper();
//  if (::boost::numeric::interval_lib::user::is_neg(xu))
//    if (::boost::numeric::interval_lib::user::is_neg(yu))
//      return I(rnd.div_down(xu, yl), rnd.div_up(xl, yu), true);
//    else
//      return I(rnd.div_down(xl, yl), rnd.div_up(xu, yu), true);
//  else if (::boost::numeric::interval_lib::user::is_neg(xl))
//    if (::boost::numeric::interval_lib::user::is_neg(yu))
//      return I(rnd.div_down(xu, yu), rnd.div_up(xl, yu), true);
//    else
//      return I(rnd.div_down(xl, yl), rnd.div_up(xu, yl), true);
//  else
//    if (::boost::numeric::interval_lib::user::is_neg(yu))
//      return I(rnd.div_down(xu, yu), rnd.div_up(xl, yl), true);
//    else
//      return I(rnd.div_down(xl, yu), rnd.div_up(xu, yl), true);
// }

/**
 * Division for an interval that does not contain 0
 */
export function div_non_zero ( i: Interval, ii: Interval ): Interval {

  const xl = i.getStart();
  const xu = i.getEnd();
  const yl = ii.getStart();
  const yu = ii.getEnd();

  if ( xu < 0 ) {
    if ( yu < 0 ) {
      return new Interval( xu / yl, xl / yu);
    } else {
      return new Interval( xl / yl, xu / yu );
    }
  } else if ( xl < 0 ) {
    if ( yu < 0 ) {
      return ( new Interval ( xu / yu, xl / yu ) );
    } else {
      return ( new Interval( xl / yl, xu / yl ) );
    }
  } else {
    if ( yu < 0 ) {
      return ( new Interval ( xu / yu, xl / yl ) );
    } else {
      return ( new Interval ( xl / yu, xu / yl ) );
    }
  }
}


// template<class T, class Policies> inline
// interval<T, Policies> div_negative(const interval<T, Policies>& x, const T& yl)
// {
//  // assert(::boost::numeric::interval_lib::user::is_neg(yl));
//  if (::boost::numeric::interval_lib::user::is_zero(x.lower()) &&
//      ::boost::numeric::interval_lib::user::is_zero(x.upper()))
//    return x;
//  typename Policies::rounding rnd;
//  typedef interval<T, Policies> I;
//  const T& xl = x.lower();
//  const T& xu = x.upper();
//  typedef typename Policies::checking checking;
//  if (::boost::numeric::interval_lib::user::is_neg(xu))
//    return I(rnd.div_down(xu, yl), checking::pos_inf(), true);
//  else if (::boost::numeric::interval_lib::user::is_neg(xl))
//    return I(checking::neg_inf(), checking::pos_inf(), true);
//  else
//    return I(checking::neg_inf(), rnd.div_up(xl, yl), true);
// }

/**
 * Division for -,0 intervals
 */
export function div_negative( i: Interval, yl: number ): Interval {

  const xl = i.getStart();
  const xu = i.getEnd();

  if ( xl === 0 && xu === 0 ) {
    return i;
  }

  if ( xu < 0 ) {
    return ( new Interval ( xu / yl, Infinity ) );
  } else if ( xl < 0 ) {
    return ( new Interval ( -Infinity, Infinity ) );
  } else {
    return ( new Interval ( -Infinity, xl / yl ) );
  }
}


// template<class T, class Policies> inline
// interval<T, Policies> div_positive(const interval<T, Policies>& x, const T& yu)
// {
//  // assert(::boost::numeric::interval_lib::user::is_pos(yu));
//  if (::boost::numeric::interval_lib::user::is_zero(x.lower()) &&
//      ::boost::numeric::interval_lib::user::is_zero(x.upper()))
//    return x;
//  typename Policies::rounding rnd;
//  typedef interval<T, Policies> I;
//  const T& xl = x.lower();
//  const T& xu = x.upper();
//  typedef typename Policies::checking checking;
//  if (::boost::numeric::interval_lib::user::is_neg(xu))
//    return I(checking::neg_inf(), rnd.div_up(xu, yu), true);
//  else if (::boost::numeric::interval_lib::user::is_neg(xl))
//    return I(checking::neg_inf(), checking::pos_inf(), true);
//  else
//    return I(rnd.div_down(xl, yu), checking::pos_inf(), true);
// }

/**
 * Division for 0,+ intervals
 */
export function div_positive( i: Interval, yu: number ) {

  const xl = i.getStart();
  const xu = i.getEnd();

  if ( xl === 0 && xu === 0 ) {
    return i;
  }

  if ( xu < 0 ) {
    return ( new Interval ( -Infinity, xu / yu ) );
  } else if ( xl < 0 ) {
    return ( new Interval ( -Infinity, Infinity ) );
  } else {
    return ( new Interval ( xl / yu, Infinity ) );
  }
}


// template<class T, class Policies> inline
// interval<T, Policies> div_zero(const interval<T, Policies>& x)
// {
//  if (::boost::numeric::interval_lib::user::is_zero(x.lower()) &&
//      ::boost::numeric::interval_lib::user::is_zero(x.upper()))
//    return x;
//  else return interval<T, Policies>::whole();
// }



/**
 * Division for -,+ intervals
 */
export function div_zero( i: Interval ): Interval {
  if ( i.getStart() === 0 && i.getEnd() === 0 ) {
    return i;
  } else {
    return new Interval(-Infinity, Infinity);
  }
}




// template<class T, class Policies> inline
// interval<T, Policies> div_non_zero(const T& x, const interval<T, Policies>& y)
// {
//  // assert(!in_zero(y));
//  typename Policies::rounding rnd;
//  typedef interval<T, Policies> I;
//  const T& yl = y.lower();
//  const T& yu = y.upper();
//  if (::boost::numeric::interval_lib::user::is_neg(x))
//    return I(rnd.div_down(x, yl), rnd.div_up(x, yu), true);
//  else
//    return I(rnd.div_down(x, yu), rnd.div_up(x, yl), true);
// }

/**
 * Division for an interval that does not contain 0 with a constant
 * Note: there is no Interval / number version of this function,
 * it is implemented directly in Interval class
 */
export function div_non_zero_constant( x: number, ii: Interval ): Interval {

  const yl = ii.getStart();
  const yu = ii.getEnd();

  if ( x < 0 ) {
    return ( new Interval ( x / yl, x / yu ) );
  } else {
    return ( new Interval ( x / yu, x / yl ) );
  }

}




// template<class T, class Policies> inline
// interval<T, Policies> div_positive(const T& x, const T& yu)
// {
//  // assert(::boost::numeric::interval_lib::user::is_pos(yu));
//  typedef interval<T, Policies> I;
//  if (::boost::numeric::interval_lib::user::is_zero(x))
//    return I(static_cast<T>(0), static_cast<T>(0), true);
//  typename Policies::rounding rnd;
//  typedef typename Policies::checking checking;
//  if (::boost::numeric::interval_lib::user::is_neg(x))
//    return I(checking::neg_inf(), rnd.div_up(x, yu), true);
//  else
//    return I(rnd.div_down(x, yu), checking::pos_inf(), true);
// }
export function div_positive_constant( x: number, yu: number ): Interval {

  if ( x === 0 ) {
    return ( new Interval ( 0, 0 ) );
  }

  if ( x < 0 ) {
    return ( new Interval ( -Infinity, x / yu ) );
  } else {
    return ( new Interval ( x / yu, Infinity ) );
  }
}



// template<class T, class Policies> inline
// interval<T, Policies> div_negative(const T& x, const T& yl)
// {
//  // assert(::boost::numeric::interval_lib::user::is_neg(yl));
//  typedef interval<T, Policies> I;
//  if (::boost::numeric::interval_lib::user::is_zero(x))
//    return I(static_cast<T>(0), static_cast<T>(0), true);
//  typename Policies::rounding rnd;
//  typedef typename Policies::checking checking;
//  if (::boost::numeric::interval_lib::user::is_neg(x))
//    return I(rnd.div_down(x, yl), checking::pos_inf(), true);
//  else
//    return I(checking::neg_inf(), rnd.div_up(x, yl), true);
// }

export function div_negative_constant( x: number, yl: number ): Interval {

  if ( x === 0 ) {
    return ( new Interval ( 0, 0 ) );
  }

  if ( x < 0 ) {
    return ( new Interval ( x / yl, Infinity ) );
  } else {
    return ( new Interval ( -Infinity, x / yl ) );
  }

}


// template<class T, class Policies> inline
// interval<T, Policies> div_zero(const T& x)
// {
//  if (::boost::numeric::interval_lib::user::is_zero(x))
//    return interval<T, Policies>(static_cast<T>(0), static_cast<T>(0), true);
//  else return interval<T, Policies>::whole();
// }

export function div_zero_constant( x: number ) {

  if ( x === 0 ) {
    return ( new Interval ( 0, 0 ) );
  } else {
    return ( new Interval ( -Infinity, Infinity ) );
  }

}

























