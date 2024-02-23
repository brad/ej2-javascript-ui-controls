define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WAbstractList = (function () {
        function WAbstractList() {
            this.abstractListIdIn = -1;
            this.nsid = -1;
            this.levels = [];
        }
        Object.defineProperty(WAbstractList.prototype, "abstractListId", {
            get: function () {
                return this.abstractListIdIn;
            },
            set: function (abstractListId) {
                this.abstractListIdIn = abstractListId;
            },
            enumerable: true,
            configurable: true
        });
        WAbstractList.prototype.clear = function () {
            if (!ej2_base_1.isNullOrUndefined(this.levels)) {
                for (var i = 0; i < this.levels.length; i++) {
                    var listLevel = this.levels[parseInt(i.toString(), 10)];
                    listLevel.clearFormat();
                    this.levels.splice(this.levels.indexOf(listLevel), 1);
                    i--;
                }
                this.levels = [];
            }
        };
        WAbstractList.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.levels)) {
                for (var i = 0; i < this.levels.length; i++) {
                    var listLevel = this.levels[parseInt(i.toString(), 10)];
                    listLevel.destroy();
                    this.levels.splice(this.levels.indexOf(listLevel), 1);
                    i--;
                }
                this.levels = [];
            }
            this.levels = undefined;
        };
        WAbstractList.prototype.clone = function () {
            var absList = new WAbstractList();
            for (var i = 0; i < this.levels.length; i++) {
                absList.levels.push(this.levels[parseInt(i.toString(), 10)].clone(absList));
            }
            return absList;
        };
        return WAbstractList;
    }());
    exports.WAbstractList = WAbstractList;
});
