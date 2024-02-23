define(["require", "exports", "@syncfusion/ej2-base", "./unique-format"], function (require, exports, ej2_base_1, unique_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WUniqueFormats = (function () {
        function WUniqueFormats() {
            this.items = [];
        }
        WUniqueFormats.prototype.addUniqueFormat = function (format, type) {
            var matchedFormat = undefined;
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].isEqual(format, undefined, undefined)) {
                    matchedFormat = this.items[i];
                    break;
                }
            }
            if (ej2_base_1.isNullOrUndefined(matchedFormat)) {
                matchedFormat = new unique_format_1.WUniqueFormat(type);
                matchedFormat.propertiesHash = format;
                matchedFormat.referenceCount = 1;
                this.items.push(matchedFormat);
            }
            else {
                matchedFormat.referenceCount++;
            }
            return matchedFormat;
        };
        WUniqueFormats.prototype.updateUniqueFormat = function (uniqueFormat, property, value) {
            var matchedFormat = undefined;
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].isEqual(uniqueFormat.propertiesHash, property, value)) {
                    matchedFormat = this.items[i];
                    break;
                }
            }
            if (ej2_base_1.isNullOrUndefined(matchedFormat)) {
                matchedFormat = new unique_format_1.WUniqueFormat(uniqueFormat.uniqueFormatType);
                matchedFormat.cloneItems(uniqueFormat, property, value, uniqueFormat.uniqueFormatType);
                matchedFormat.referenceCount = 1;
                this.items.push(matchedFormat);
            }
            else {
                matchedFormat.referenceCount++;
            }
            this.remove(uniqueFormat);
            return matchedFormat;
        };
        WUniqueFormats.prototype.remove = function (uniqueFormat) {
            uniqueFormat.referenceCount--;
            if (uniqueFormat.referenceCount <= 0) {
                this.items.splice(this.items.indexOf(uniqueFormat), 1);
                uniqueFormat.destroy();
                uniqueFormat = undefined;
            }
        };
        WUniqueFormats.prototype.clear = function () {
            if (ej2_base_1.isNullOrUndefined(this.items)) {
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].destroy();
                }
            }
            this.items = [];
        };
        WUniqueFormats.prototype.destroy = function () {
            this.clear();
            this.items = undefined;
        };
        return WUniqueFormats;
    }());
    exports.WUniqueFormats = WUniqueFormats;
});
