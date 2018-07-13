"use strict";
exports.__esModule = true;
var interval_interval_1 = require("./interval-interval");
var interval_utility_1 = require("./interval-utility");
var IntervalNumber = /** @class */ (function () {
    /**
     * Expected inputs include all real numbers, Infinity, -Infinity
     */
    function IntervalNumber(p) {
        this.p = p;
    }
    /**
     * String representation of this constant.
     */
    IntervalNumber.prototype.toString = function () {
        var rStr;
        rStr = '';
        if (this.p === Infinity) {
            rStr += 'inf';
        }
        else if (this.p === -Infinity) {
            rStr += '-inf';
        }
        else if (this.p.toString() === 'NaN') {
            rStr += 'nan';
        }
        else {
            rStr += this.p;
        }
        return rStr;
    };
    /**
     * Returns the constant as a number.
     */
    IntervalNumber.prototype.getConstant = function () {
        return this.p;
    };
    /**
     * Sets the constant.
     */
    IntervalNumber.prototype.setConstant = function (p) {
        this.p = p;
    };
    /**
     * Add this constant to an interval, returning an interval.
     */
    IntervalNumber.prototype.add = function (ii) {
        var _this = this;
        var rarray = new Array();
        if (ii instanceof interval_interval_1.Interval) {
            rarray.push(new interval_interval_1.Interval(this.p + ii.getStart(), this.p + ii.getEnd()));
        }
        else {
            ii.forEach(function (i) {
                rarray.push(new interval_interval_1.Interval(_this.p + i.getStart(), _this.p + i.getEnd()));
            });
        }
        return rarray;
    };
    /**
     * Subtracts this constant from an interval, returning an interval.
     */
    IntervalNumber.prototype.subtract = function (ii) {
        var _this = this;
        var rarray = new Array();
        if (ii instanceof interval_interval_1.Interval) {
            rarray.push(new interval_interval_1.Interval(this.p - ii.getStart(), this.p - ii.getEnd()));
        }
        else {
            ii.forEach(function (i) {
                rarray.push(new interval_interval_1.Interval(_this.p - i.getStart(), _this.p - i.getEnd()));
            });
        }
        return rarray;
    };
    IntervalNumber.prototype._multiply = function (ii) {
        if (this.p < 0) {
            return (new interval_interval_1.Interval(this.p * ii.getEnd(), this.p * ii.getStart()));
        }
        else if (this.p === 0) {
            return (new interval_interval_1.Interval(0, 0));
        }
        else {
            return (new interval_interval_1.Interval(this.p * ii.getStart(), this.p * ii.getEnd()));
        }
    };
    IntervalNumber.prototype.multiply = function (ii) {
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
        var _this = this;
        var rarray = new Array();
        if (ii instanceof interval_interval_1.Interval) {
            rarray.push(this._multiply(ii));
        }
        else {
            ii.forEach(function (i) {
                rarray.push(_this._multiply(i));
            });
        }
        return (rarray);
    };
    IntervalNumber.prototype._divide = function (ii) {
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
        if (ii.hasZero()) {
            if (!(ii.getStart() === 0)) {
                if (!(ii.getEnd() === 0)) {
                    return (interval_utility_1.div_zero_constant(this.p));
                }
                else {
                    return (interval_utility_1.div_negative_constant(this.p, ii.getStart()));
                }
            }
            else {
                if (!(ii.getEnd() === 0)) {
                    return (interval_utility_1.div_positive_constant(this.p, ii.getEnd()));
                }
                else {
                    return (new interval_interval_1.Interval(-Number.NaN, Number.NaN));
                }
            }
        }
        else {
            return (interval_utility_1.div_non_zero_constant(this.p, ii));
        }
    };
    IntervalNumber.prototype.divide = function (ii) {
        var _this = this;
        var rarray = new Array();
        if (ii instanceof interval_interval_1.Interval) {
            rarray.push(this._divide(ii));
        }
        else {
            ii.forEach(function (i) {
                rarray.push(_this._divide(i));
            });
        }
        return (rarray);
    };
    return IntervalNumber;
}());
exports.IntervalNumber = IntervalNumber;
