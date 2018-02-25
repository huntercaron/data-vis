
export default function (sketch) {
  var records = require('../assets/phoneRecords.json');
  var uniqueArray = function uniqueArray(arr) {
    return [].concat(_toConsumableArray(new Set(arr)))
  };
  var propArray = function propArray(data, value) {
    return data.map(function (node) {
      return node[value]
    })
  };
  var uniqueObj = function uniqueObj(data, value) {
    return uniqueArray(propArray(data, value))
  };
  var callsByNumber = [];
  var n = 0;
  var maxLength = Math.max.apply(Math, _toConsumableArray(propArray(records, 'length')));
  
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i]
      }
      return arr2
    } else {
      return Array.from(arr)
    }
  }
  
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.height = sketch.windowHeight;
    sketch.angleMode(sketch.DEGREES);
    sketch.background(0);
    var _loop = function _loop(phoneNum) {
      if (records.filter(function (r) {
          return r.phoneNum === phoneNum
        })) {
        callsByNumber.push(records.filter(function (r) {
          return r.phoneNum === phoneNum
        }))
      }
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
    try {
      for (var _iterator = uniqueObj(records, 'phoneNum')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var phoneNum = _step.value;
        _loop(phoneNum)
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return()
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError
        }
      }
    }
    console.log(callsByNumber)
  };
  
  sketch.draw = function () {
    sketch.noFill();
    sketch.stroke(255);
    var lineY = sketch.height / 2;
    var curve = 0;
    var length = 300;
    var numPoints = 32;
    var angle = sketch.TWO_PI / numPoints;
    var number = callsByNumber[n];
    sketch.translate(20, sketch.height / 2);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
    try {
      for (var _iterator2 = number[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var call = _step2.value;
        var time = call.time.split(':');
        var minutes = +time[0] * 60 + +time[1];
        curve = (minutes - 720) * 0.6;
        sketch.stroke(255, sketch.map(call.length, 1, maxLength, 10, 255));
        length = sketch.width - 30 - callsByNumber[n].length * 20;
        sketch.stroke(sketch.map(minutes, 0, 1440, 79, 35), sketch.map(minutes, 0, 1440, 104, 200), sketch.map(minutes, 0, 1440, 250, 100), sketch.map(call.length, 1, maxLength, 50, 200));
        sketch.strokeWeight(sketch.map(call.length, 1, maxLength, 0.8, 2));
        sketch.bezier(0, 0, length / 4, 0 - curve, length / 4 * 3, 0 - curve, length, 0)
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return()
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2
        }
      }
    }
    if (n < callsByNumber.length - 1) {
      n++
    }
  };
}