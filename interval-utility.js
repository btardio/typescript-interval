"use strict";
exports.__esModule = true;
var interval_interval_1 = require("./interval-interval");
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
function div_non_zero(i, ii) {
    var xl = i.getStart();
    var xu = i.getEnd();
    var yl = ii.getStart();
    var yu = ii.getEnd();
    if (xu < 0) {
        if (yu < 0) {
            return new interval_interval_1.Interval(xu / yl, xl / yu);
        }
        else {
            return new interval_interval_1.Interval(xl / yl, xu / yu);
        }
    }
    else if (xl < 0) {
        if (yu < 0) {
            return (new interval_interval_1.Interval(xu / yu, xl / yu));
        }
        else {
            return (new interval_interval_1.Interval(xl / yl, xu / yl));
        }
    }
    else {
        if (yu < 0) {
            return (new interval_interval_1.Interval(xu / yu, xl / yl));
        }
        else {
            return (new interval_interval_1.Interval(xl / yu, xu / yl));
        }
    }
}
exports.div_non_zero = div_non_zero;
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
function div_negative(i, yl) {
    var xl = i.getStart();
    var xu = i.getEnd();
    if (xl === 0 && xu === 0) {
        return i;
    }
    if (xu < 0) {
        return (new interval_interval_1.Interval(xu / yl, Infinity));
    }
    else if (xl < 0) {
        return (new interval_interval_1.Interval(-Infinity, Infinity));
    }
    else {
        return (new interval_interval_1.Interval(-Infinity, xl / yl));
    }
}
exports.div_negative = div_negative;
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
function div_positive(i, yu) {
    var xl = i.getStart();
    var xu = i.getEnd();
    if (xl === 0 && xu === 0) {
        return i;
    }
    if (xu < 0) {
        return (new interval_interval_1.Interval(-Infinity, xu / yu));
    }
    else if (xl < 0) {
        return (new interval_interval_1.Interval(-Infinity, Infinity));
    }
    else {
        return (new interval_interval_1.Interval(xl / yu, Infinity));
    }
}
exports.div_positive = div_positive;
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
function div_zero(i) {
    if (i.getStart() === 0 && i.getEnd() === 0) {
        return i;
    }
    else {
        return new interval_interval_1.Interval(-Infinity, Infinity);
    }
}
exports.div_zero = div_zero;
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
function div_non_zero_constant(x, ii) {
    var yl = ii.getStart();
    var yu = ii.getEnd();
    if (x < 0) {
        return (new interval_interval_1.Interval(x / yl, x / yu));
    }
    else {
        return (new interval_interval_1.Interval(x / yu, x / yl));
    }
}
exports.div_non_zero_constant = div_non_zero_constant;
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
function div_positive_constant(x, yu) {
    if (x === 0) {
        return (new interval_interval_1.Interval(0, 0));
    }
    if (x < 0) {
        return (new interval_interval_1.Interval(-Infinity, x / yu));
    }
    else {
        return (new interval_interval_1.Interval(x / yu, Infinity));
    }
}
exports.div_positive_constant = div_positive_constant;
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
function div_negative_constant(x, yl) {
    if (x === 0) {
        return (new interval_interval_1.Interval(0, 0));
    }
    if (x < 0) {
        return (new interval_interval_1.Interval(x / yl, Infinity));
    }
    else {
        return (new interval_interval_1.Interval(-Infinity, x / yl));
    }
}
exports.div_negative_constant = div_negative_constant;
// template<class T, class Policies> inline
// interval<T, Policies> div_zero(const T& x)
// {
//  if (::boost::numeric::interval_lib::user::is_zero(x))
//    return interval<T, Policies>(static_cast<T>(0), static_cast<T>(0), true);
//  else return interval<T, Policies>::whole();
// }
function div_zero_constant(x) {
    if (x === 0) {
        return (new interval_interval_1.Interval(0, 0));
    }
    else {
        return (new interval_interval_1.Interval(-Infinity, Infinity));
    }
}
exports.div_zero_constant = div_zero_constant;
