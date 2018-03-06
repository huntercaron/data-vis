
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
      var amp = 120;
      curve = 1 * amp;
      revCurve = 1 * -amp;
      sketch.stroke(sketch.map(_this.calls.length, 1, maxLength, 79, 35), sketch.map(_this.calls.length, 1, maxLength, 104, 200), sketch.map(_this.calls.length, 1, maxLength, 250, 100), 120);
      sketch.strokeWeight(0.6);
      sketch.noFill();
      sketch.push();
      var callLengths = propArray(_this.calls, 'length');
      var totalMinutes = callLengths.reduce(function (a, b) {
        return a + b
      });
      var scale = totalMinutes * 0.01 + 0.1;
      sketch.scale(sketch.map(_this.calls.length, 0, maxCalls, 0, 0.6) + 0.9);
      sketch.pop();
      for (var call in _this.calls) {
        _this.drawCall(_this.calls[call], call)
      }
    };
    this.drawCall = function (call, index) {
      var time = call.time.split(':');
      var minutes = +time[0] * 60 + +time[1];
      var amp = 120;
      curve = minutes / 1440 * amp;
      revCurve = minutes / 1440 * -amp;
      sketch.fill(sketch.map(call.length, 1, maxLength, 79, 35), sketch.map(call.length, 1, maxLength, 104, 200), sketch.map(call.length, 1, maxLength, 250, 100), 20);
      sketch.noStroke();
      sketch.push();
      var scale = sketch.map(call.length, 1, maxLength, 0, 0.6) + 0.9;
      var animThisFrames = 200 - call.length * 2;
      var animBaseFrames = index * 20;
      var mappedScale = sketch.map(sketch.frameCount, animBaseFrames, animThisFrames + animBaseFrames, 0, scale);
      if (mappedScale < 0)
        mappedScale = 0;
      sketch.scale(sketch.frameCount < animThisFrames + animBaseFrames ? mappedScale : scale);
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
    totalLengths = leaves.map(function (node) {
      return propArray(node['calls'], 'length').reduce(function (a, b) {
        return a + b
      })
    });
    maxTotalLength = Math.max.apply(Math, _toConsumableArray(totalLengths));
    minTotalLength = Math.min.apply(Math, _toConsumableArray(totalLengths));
    maxCalls = Math.max.apply(Math, _toConsumableArray(leaves.map(function (node) {
      return node.calls.length
    })));
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
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
    try {
      for (var _iterator2 = leaves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var leaf = _step2.value;
        sketch.rotate(360 / leaves.length);
        leaf.draw()
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
    if (currentNum > 50) {
      sketch.noLoop()
    }
  };
}