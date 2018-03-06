
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
  var n = 0;
  var curve = void 0;
  var revCurve = void 0;
  var lineY = void 0;
  var radius = void 0;
  var numPoints = void 0;
  var angle = void 0;
  var leaves = [];
  var animFrames = 30;
  var currentNum = 0;
  var scaleMultiplier = 0.01;
  var scaleBase = 0.1;
  var maxLength = Math.max.apply(Math, _toConsumableArray(propArray(records, 'length')));
  var totalLengths = void 0;
  var maxTotalLength = void 0;
  var minTotalLength = void 0;
  var maxCalls = void 0;
  var Leaf = function Leaf(number, calls) {
    var _this = this;
    _classCallCheck(this, Leaf);
    this.draw = function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = _this.calls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var call = _step.value;
          _this.drawCall(call)
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
      var amp = 120;
      curve = 1 * amp;
      revCurve = 1 * -amp;
      sketch.stroke(sketch.map(_this.calls.length, 1, maxLength, 79, 35), sketch.map(_this.calls.length, 1, maxLength, 104, 200), sketch.map(_this.calls.length, 1, maxLength, 250, 100), 200);
      sketch.strokeWeight(0.6);
      sketch.noFill();
      sketch.push();
      var callLengths = propArray(_this.calls, 'length');
      var totalMinutes = callLengths.reduce(function (a, b) {
        return a + b
      });
      var scale = totalMinutes * 0.01 + 0.1;
      sketch.scale(sketch.map(totalMinutes, minTotalLength, maxTotalLength, 0, 1) + 0.5);
      sketch.beginShape();
      sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
      sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
      sketch.endShape(sketch.CLOSE);
      sketch.pop()
    };
    this.drawCall = function (call) {
      var time = call.time.split(':');
      var minutes = +time[0] * 60 + +time[1];
      var amp = 120;
      curve = minutes / 1440 * amp;
      revCurve = minutes / 1440 * -amp;
      sketch.fill(sketch.map(call.length, 1, maxLength, 79, 35), sketch.map(call.length, 1, maxLength, 104, 200), sketch.map(call.length, 1, maxLength, 250, 100), 20);
      sketch.noStroke();
      sketch.push();
      var scale = sketch.map(call.length, 1, maxLength, 0, 1) + 0.5;
      var animThisFrames = 100 + _this.calls.length / 8 * 80;
      var mappedScale = sketch.map(sketch.frameCount, 0, animThisFrames, 0, scale);
      sketch.scale(20000 < animThisFrames ? mappedScale : scale);
      sketch.beginShape();
      sketch.bezier(0, 0, radius / 4, 0 - curve, radius / 4 * 3, 0 - curve, radius, 0);
      sketch.bezier(0, 0, radius / 4, 0 - revCurve, radius / 4 * 3, 0 - revCurve, radius, 0);
      sketch.endShape(sketch.CLOSE);
      sketch.pop()
    };
    this.logInfo = function () {
    };
    this.number = number;
    this.calls = calls;
    this.radius = 0
  };
  
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }
  
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
        leaves.push(new Leaf(phoneNum, records.filter(function (r) {
          return r.phoneNum === phoneNum
        })))
      }
    };
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
    try {
      for (var _iterator2 = uniqueObj(records, 'phoneNum')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var phoneNum = _step2.value;
        _loop(phoneNum)
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
    totalLengths = leaves.map(function (node) {
      return propArray(node['calls'], 'length').reduce(function (a, b) {
        return a + b
      })
    });
    maxTotalLength = Math.max.apply(Math, _toConsumableArray(totalLengths));
    minTotalLength = Math.min.apply(Math, _toConsumableArray(totalLengths));
    maxCalls = leaves.map(function (node) {
      return node.calls.length
    });
    sketch.noFill();
    sketch.stroke(200);
    lineY = sketch.height / 2;
    radius = sketch.height * 0.4;
    numPoints = 32;
    angle = sketch.TWO_PI / numPoints
  };
  
  sketch.draw = function () {
    currentNum = sketch.frameCount / animFrames;
    sketch.background(0);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;
    try {
      for (var _iterator3 = leaves[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var leaf = _step3.value;
        sketch.rotate(360 / leaves.length);
        leaf.draw()
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return()
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3
        }
      }
    }
    sketch.noLoop()
  };
}