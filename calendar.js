function invertIntervals(intervals = [ [0, -1] ], initialInterval = [0, 1440]) {
  return intervals.reduce((acc, curr) => {
    let prev = acc.pop();
    if (curr[0] > prev[0]) {
      acc.push([prev[0], curr[0] - 1]);
    }
    if (prev[1] > curr[1]) {
      acc.push([curr[1] + 1, prev[1]]);
    }
    return acc;
  }, [initialInterval]);
}

function hasUndefinedIntervals(intervals) {
  if (intervals) {
    for (let i = 0; i < intervals.length; i++) {
      if (typeof(intervals[i])  == 'undefined'); {
        return false;
      }
    }
  }
  else {
    return false;
  }
  return true;
}

function mergeIntervals(intervals) {
  // if hasUndefinedIntervals(intervals) {
  //   return;
  // }
  intervals.sort((a, b) => a[0] - b[0]);
  var stack = [];
  stack.push(intervals[0]);

  for (let i = 1; i < intervals.length; i++) {
    peak = stack[stack.length - 1];
    if (peak[1] < intervals[i][0]) {
      stack.push(intervals[i]);
    }
    else if (peak[1] < intervals[i][1]) {
      peak[1] = intervals[i][1];
      stack.pop();
      stack.push(peak);
    }
  }
  return stack;
}

function findAvailableTimes(events, weeks = 2) {
  const daysInWeek = 7;
  var start = new Date();
  var end = new Date();
  start.setDate(start.getDate());
  end.setDate(start.getDate() + (weeks * daysInWeek) + 1);

  var intervals = [];

  for (const e of events) {
    if (e.date.getTime() > start.getTime() && e.date.getTime() < end.getTime()) {
      intervals.push([e.start, e.end, e.date]);
    }
  }

  intervals.sort((a, b) => a[2].getTime() - b[2].getTime());

  var next = intervals[0][2].getDate();
  var prev = intervals[0][2].getDate();
  var curr = [];
  var dailyMap = new Map();

  while (intervals.length) {
    while (next && next == prev) {
      curr.push(intervals[0]);
      intervals.shift()
      next = intervals[0] ? intervals[0][2].getDate() : undefined;
    }

    var found = invertIntervals(mergeIntervals(curr));
    dailyMap.set(curr[0][2].getMonth() + ", " + curr[0][2].getDate(), [])
    for (const intr of found) {
      dailyMap.get(curr[0][2].getMonth() + ", " + curr[0][2].getDate()).push(intr);
    }
    prev = intervals[0] ? intervals[0][2].getDate() : undefined;
    curr = [];
  }
  return dailyMap;
}

module.exports = { mergeIntervals, invertIntervals, findAvailableTimes };
