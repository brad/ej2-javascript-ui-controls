define(["require", "exports", "@syncfusion/ej2-base", "../../index"], function (require, exports, ej2_base_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MajorMinorFontScheme = (function () {
        function MajorMinorFontScheme() {
            this.fntTypeface = new index_1.Dictionary();
            this.fntSchemeList = [];
            this.fntTypeface = new index_1.Dictionary();
            this.fntSchemeList = [];
        }
        Object.defineProperty(MajorMinorFontScheme.prototype, "fontTypeface", {
            get: function () {
                return this.fntTypeface;
            },
            set: function (value) {
                this.fntTypeface = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MajorMinorFontScheme.prototype, "fontSchemeList", {
            get: function () {
                return this.fntSchemeList;
            },
            set: function (value) {
                this.fntSchemeList = value;
            },
            enumerable: true,
            configurable: true
        });
        MajorMinorFontScheme.prototype.copyFormat = function (majorMinor) {
            if (!ej2_base_1.isNullOrUndefined(majorMinor)) {
                this.fntTypeface = majorMinor.fntTypeface;
                this.fntSchemeList = majorMinor.fntSchemeList;
            }
        };
        MajorMinorFontScheme.prototype.destroy = function () {
            this.fntTypeface = undefined;
            this.fntSchemeList = undefined;
        };
        return MajorMinorFontScheme;
    }());
    exports.MajorMinorFontScheme = MajorMinorFontScheme;
});
