define(["require", "exports", "@syncfusion/ej2-base", "./font-scheme"], function (require, exports, ej2_base_1, font_scheme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Themes = (function () {
        function Themes(node) {
            this.fntScheme = new font_scheme_1.FontScheme();
        }
        Object.defineProperty(Themes.prototype, "fontScheme", {
            get: function () {
                return this.fntScheme;
            },
            set: function (value) {
                this.fntScheme = value;
            },
            enumerable: true,
            configurable: true
        });
        Themes.prototype.copyFormat = function (themes) {
            if (!ej2_base_1.isNullOrUndefined(themes)) {
                this.fntScheme.copyFormat(themes.fntScheme);
            }
        };
        Themes.prototype.destroy = function () {
            this.fntScheme = undefined;
        };
        return Themes;
    }());
    exports.Themes = Themes;
});
