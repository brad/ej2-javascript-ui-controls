define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inMB = function (n) { return n / 1000000; };
    function runningAverage(arr, newVal, oldAvg) {
        return ((oldAvg * (arr.length - 1) + newVal) / arr.length);
    }
    ;
    exports.profile = {
        samples: [],
        diffs: [],
        averageUsage: 0,
        averageChange: 0,
        sample: function () {
            var newSample = exports.getMemoryProfile();
            this.samples.push(newSample);
            this.averageUsage = runningAverage(this.samples, newSample, this.averageUsage);
            var sampleLen = this.samples.length;
            if (sampleLen >= 2) {
                var newDiff = this.samples[sampleLen - 1] - this.samples[sampleLen - 2];
                this.diffs.push(newDiff);
                this.averageChange = runningAverage(this.diffs, newDiff, this.averageChange);
            }
        }
    };
    exports.getMemoryProfile = function () {
        return window.performance.memory.usedJSHeapSize;
    };
});
