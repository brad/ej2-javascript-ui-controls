define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        Size.prototype.isEmpty = function () {
            return this.height === 0 && this.width === 0;
        };
        Size.prototype.clone = function () {
            return new Size(this.width, this.height);
        };
        return Size;
    }());
    exports.Size = Size;
});
