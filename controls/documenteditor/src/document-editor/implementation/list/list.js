define(["require", "exports", "@syncfusion/ej2-base", "./level-override"], function (require, exports, ej2_base_1, level_override_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WList = (function () {
        function WList() {
            this.nsid = -1;
            this.listId = -1;
            this.sourceListId = -1;
            this.abstractListId = -1;
            this.abstractList = undefined;
            this.levelOverrides = [];
        }
        WList.prototype.getListLevel = function (levelNumber) {
            var listLevel = undefined;
            var levelOverride = this.getLevelOverride(levelNumber);
            if (!ej2_base_1.isNullOrUndefined(levelOverride) && !ej2_base_1.isNullOrUndefined(levelOverride.overrideListLevel)) {
                listLevel = levelOverride.overrideListLevel;
            }
            else {
                listLevel = this.abstractList.levels[parseInt(levelNumber.toString(), 10)];
            }
            return listLevel;
        };
        WList.prototype.getLevelOverride = function (levelNumber) {
            for (var i = 0; i < this.levelOverrides.length; i++) {
                if (this.levelOverrides[parseInt(i.toString(), 10)] instanceof level_override_1.WLevelOverride) {
                    var levelOverride = this.levelOverrides[parseInt(i.toString(), 10)];
                    if (levelOverride.levelNumber === levelNumber) {
                        return levelOverride;
                    }
                }
            }
            return undefined;
        };
        WList.prototype.clear = function () {
            if (!ej2_base_1.isNullOrUndefined(this.levelOverrides)) {
                for (var i = 0; i < this.levelOverrides.length; i++) {
                    var levelOverride = this.levelOverrides[parseInt(i.toString(), 10)];
                    levelOverride.clear();
                }
                this.levelOverrides = [];
            }
            if (this.abstractList) {
                this.abstractList.clear();
            }
            this.abstractList = undefined;
        };
        WList.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.levelOverrides)) {
                for (var i = 0; i < this.levelOverrides.length; i++) {
                    var levelOverride = this.levelOverrides[parseInt(i.toString(), 10)];
                    levelOverride.destroy();
                }
                this.levelOverrides = [];
            }
            this.levelOverrides = undefined;
            if (this.abstractList) {
                this.abstractList.destroy();
                this.abstractList = undefined;
            }
            this.abstractListId = undefined;
            this.listId = undefined;
            this.sourceListId = undefined;
        };
        WList.prototype.mergeList = function (list) {
            if (!ej2_base_1.isNullOrUndefined(this.abstractListId) && this.abstractListId !== -1) {
                this.abstractListId = list.abstractListId;
            }
            if (!ej2_base_1.isNullOrUndefined(this.listId) && this.listId !== -1) {
                this.listId = list.listId;
            }
            if (!ej2_base_1.isNullOrUndefined(this.sourceListId) && this.sourceListId !== -1) {
                this.sourceListId = list.sourceListId;
            }
            if (!ej2_base_1.isNullOrUndefined(this.levelOverrides) && this.levelOverrides.length !== 0) {
                this.levelOverrides = list.levelOverrides;
            }
        };
        WList.prototype.clone = function () {
            var list = new WList();
            for (var i = 0; i < this.levelOverrides.length; i++) {
                list.levelOverrides.push(this.levelOverrides[parseInt(i.toString(), 10)].clone());
            }
            return list;
        };
        return WList;
    }());
    exports.WList = WList;
});
