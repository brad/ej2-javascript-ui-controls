define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WLevelOverride = (function () {
        function WLevelOverride() {
        }
        WLevelOverride.prototype.clear = function () {
            if (!ej2_base_1.isNullOrUndefined(this.overrideListLevel)) {
                this.overrideListLevel.clearFormat();
            }
            this.overrideListLevel = undefined;
        };
        WLevelOverride.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.overrideListLevel)) {
                this.overrideListLevel.destroy();
            }
            this.levelNumber = undefined;
            this.startAt = undefined;
            this.overrideListLevel = undefined;
        };
        WLevelOverride.prototype.clone = function () {
            var levelOverride = new WLevelOverride();
            levelOverride.startAt = this.startAt;
            levelOverride.levelNumber = this.levelNumber;
            if (!ej2_base_1.isNullOrUndefined(this.overrideListLevel)) {
                levelOverride.overrideListLevel = this.overrideListLevel.clone(levelOverride);
            }
            return levelOverride;
        };
        return WLevelOverride;
    }());
    exports.WLevelOverride = WLevelOverride;
});
