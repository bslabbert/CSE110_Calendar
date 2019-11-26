var assert = require('chai').assert;
var cal= require('../calendar.js');

describe('invertIntervals()', function () {
  it('should invert a single interval', function() {
    var intervals = [ [500, 1000] ];
    var available = cal.invertIntervals(intervals);
    assert.deepEqual(available, [ [0, 499], [1001, 1440] ]);
  });

  it('should invert multiple intervals', function() {
    var intervals = [ [0, 250], [300, 400], [500, 1000], [1100, 1440] ];
    var available = cal.invertIntervals(intervals);
    assert.deepEqual(available, [ [251, 299], [401, 499], [1001, 1099] ]);
  });

  it('should invert undefined intervals', function() {
    var intervals;
    var available = cal.invertIntervals(intervals);
    assert.deepEqual(available, [ [0, 1440] ]);
  });

  it('should invert empty intervals', function() {
    var intervals = [];
    var available = cal.invertIntervals(intervals);
    assert.deepEqual(available, [ [0, 1440] ]);
  });
});

describe('mergeIntervals()', function () {
  it('should merge two overlapping intervals', function() {
    var intervals = [ [300, 600], [500, 1000] ];
    var available = cal.mergeIntervals(intervals);
    assert.deepEqual(available, [ [300, 1000] ]);
  });

  it('should merge three overlapping intervals', function() {
    var intervals = [ [0, 600], [500, 1000], [700, 1440] ];
    var available = cal.mergeIntervals(intervals);
    assert.deepEqual(available, [ [0, 1440] ]);
  });

  it('should not merge three non-overlapping intervals', function() {
    var intervals = [ [100, 200], [300, 1000], [1100, 1240] ];
    var available = cal.mergeIntervals(intervals);
    assert.deepEqual(available, intervals);
  });

  it('should merge overlapping and not non-overlapping intervals', function() {
    var intervals = [ [100, 200], [300, 600], [400, 800], [1100, 1240] ];
    var available = cal.mergeIntervals(intervals);
    assert.deepEqual(available, [ [100, 200], [300, 800], [1100, 1240] ]);
  });
});

describe('findAvailableTimes()', function () {
  it('should handle multiple events on a single day', function() {
    var weekAway = new Date();
    weekAway.setDate(weekAway.getDate() + 7);

    var events = [{date: weekAway, start: 660, end: 720}];
    var free = cal.findAvailableTimes(events);
    var map = new Map();
    map.set(weekAway.getMonth() + ", " + weekAway.getDate(), 
      [ [0, 659], [721, 1440] ]);
    assert.deepEqual(free, map);
  });

  // it('should merge three overlapping intervals', function() {
  //   var intervals = [ [0, 600], [500, 1000], [700, 1440] ];
  //   var available = cal.mergeIntervals(intervals);
  //   assert.deepEqual([ [0, 1440] ], available );
  // });

  // it('should not merge three non-overlapping intervals', function() {
  //   var intervals = [ [100, 200], [300, 1000], [1100, 1240] ];
  //   var available = cal.mergeIntervals(intervals);
  //   assert.deepEqual(intervals, available);
  // });

  // it('should merge overlapping and not non-overlapping intervals', function() {
  //   var intervals = [ [100, 200], [300, 600], [400, 800], [1100, 1240] ];
  //   var available = cal.mergeIntervals(intervals);
  //   assert.deepEqual([ [100, 200], [300, 800], [1100, 1240] ], available);
  // });
});
