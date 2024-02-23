define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dictionary = (function () {
        function Dictionary() {
            this.keysInternal = [];
            this.valuesInternal = [];
        }
        Object.defineProperty(Dictionary.prototype, "length", {
            get: function () {
                return this.keysInternal.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "keys", {
            get: function () {
                return this.keysInternal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "values", {
            get: function () {
                return this.valuesInternal;
            },
            enumerable: true,
            configurable: true
        });
        Dictionary.prototype.add = function (key, value) {
            if (ej2_base_1.isNullOrUndefined(key)) {
                throw new ReferenceError('Provided key or value is not valid.');
            }
            var index = this.keysInternal.indexOf(key);
            if (index < 0) {
                this.keysInternal.push(key);
                this.valuesInternal.push(value);
            }
            return 1;
        };
        Dictionary.prototype.get = function (key) {
            if (ej2_base_1.isNullOrUndefined(key)) {
                throw new ReferenceError('Provided key is not valid.');
            }
            var index = this.keysInternal.indexOf(key);
            if (index < 0 || index > this.keysInternal.length - 1) {
                return undefined;
            }
            else {
                return this.valuesInternal[index];
            }
        };
        Dictionary.prototype.set = function (key, value) {
            if (ej2_base_1.isNullOrUndefined(key)) {
                throw new ReferenceError('Provided key is not valid.');
            }
            var index = this.keysInternal.indexOf(key);
            if (index < 0 || index > this.keysInternal.length - 1) {
                throw new RangeError('No item with the specified key has been added.');
            }
            else {
                this.valuesInternal[index] = value;
            }
        };
        Dictionary.prototype.remove = function (key) {
            if (ej2_base_1.isNullOrUndefined(key)) {
                throw new ReferenceError('Provided key is not valid.');
            }
            var index = this.keysInternal.indexOf(key);
            if (index < 0 || index > this.keysInternal.length - 1) {
                throw new RangeError('No item with the specified key has been added.');
            }
            else {
                this.keysInternal.splice(index, 1);
                this.valuesInternal.splice(index, 1);
                return true;
            }
        };
        Dictionary.prototype.containsKey = function (key) {
            if (ej2_base_1.isNullOrUndefined(key)) {
                throw new ReferenceError('Provided key is not valid.');
            }
            var index = this.keysInternal.indexOf(key);
            if (index < 0 || index > this.keysInternal.length - 1) {
                return false;
            }
            return true;
        };
        Dictionary.prototype.clear = function () {
            this.keysInternal = [];
            this.valuesInternal = [];
        };
        Dictionary.prototype.destroy = function () {
            this.clear();
            this.keysInternal = undefined;
            this.valuesInternal = undefined;
        };
        return Dictionary;
    }());
    exports.Dictionary = Dictionary;
});
