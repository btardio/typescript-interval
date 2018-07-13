
typescript-interval

This package implements the add, subtract, multiply and divide operations for intervals. 
This is a slightly modified very minimal port of the Boost Interval library.

This implementation is currently based on the boost::numeric::interval_lib::checking_base<double>,
typedef boost::numeric::interval_lib::rounded_math<double> interval_lib policies, allowing
creation of an empty interval represented by NaN, NaN.

For wrap-around intervals, this implementation uses hasInnerBounds(): boolean, which, if true, will
provide the wrap-around interval using the function wrapAroundInterval.

Testing ranges used combinations of [-Infinity,-2,-1,0,1,2,Infinity] for two intervals and an interval and constant.

Compiling:

./node_modules/.bin/tsc interval-interval.ts
./node_modules/.bin/tsc interval-number.ts
./node_modules/.bin/tsc interval-utility.ts



Example Usage:


Using two intervals

var interval_interval = require("./interval-interval");

a = new interval_interval.Interval(5,8);
b = new interval_interval.Interval(3,1);

c = a.add(b);

c[0].getStart();

> 8


Using an interval and a constant

var interval_interval = require("./interval-interval");
var interval_number = require("./interval-number");

a = new interval_interval.Interval(-1,1);
b = new interval_number.IntervalNumber(6);
c = a.add(5);

c[0].getStart();

> 4

d = b.add(a);
d[0].getStart();

> 5


Caution

Creation of wraparound intervals is currently non-functioning.



