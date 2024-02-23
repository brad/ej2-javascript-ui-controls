define(["require", "exports", "@syncfusion/ej2-base", "./major-minor-font-scheme"], function (require, exports, ej2_base_1, major_minor_font_scheme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FontScheme = (function () {
        function FontScheme(node) {
            this.majFontScheme = new major_minor_font_scheme_1.MajorMinorFontScheme();
            this.minFontScheme = new major_minor_font_scheme_1.MajorMinorFontScheme();
        }
        Object.defineProperty(FontScheme.prototype, "fontSchemeName", {
            get: function () {
                return this.schemeName;
            },
            set: function (value) {
                this.schemeName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontScheme.prototype, "majorFontScheme", {
            get: function () {
                return this.majFontScheme;
            },
            set: function (value) {
                this.majFontScheme = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontScheme.prototype, "minorFontScheme", {
            get: function () {
                return this.minFontScheme;
            },
            set: function (value) {
                this.minFontScheme = value;
            },
            enumerable: true,
            configurable: true
        });
        FontScheme.prototype.copyFormat = function (fontScheme) {
            if (!ej2_base_1.isNullOrUndefined(fontScheme)) {
                this.schemeName = fontScheme.schemeName;
                this.majFontScheme.copyFormat(fontScheme.majFontScheme);
                this.minFontScheme.copyFormat(fontScheme.minFontScheme);
            }
        };
        FontScheme.prototype.destroy = function () {
            this.schemeName = undefined;
            this.majFontScheme = undefined;
            this.minFontScheme = undefined;
        };
        return FontScheme;
    }());
    exports.FontScheme = FontScheme;
    var FontSchemeStruct = (function () {
        function FontSchemeStruct() {
        }
        Object.defineProperty(FontSchemeStruct.prototype, "name", {
            get: function () {
                return this.fontName;
            },
            set: function (value) {
                this.fontName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontSchemeStruct.prototype, "typeface", {
            get: function () {
                return this.fontTypeface;
            },
            set: function (value) {
                this.fontTypeface = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FontSchemeStruct.prototype, "panose", {
            get: function () {
                return this.pnose;
            },
            set: function (value) {
                this.pnose = value;
            },
            enumerable: true,
            configurable: true
        });
        FontSchemeStruct.prototype.copyFormat = function (fontSchemeStructure) {
            if (!ej2_base_1.isNullOrUndefined(fontSchemeStructure)) {
                this.fontName = fontSchemeStructure.fontName;
                this.fontTypeface = fontSchemeStructure.fontTypeface;
                this.pnose = fontSchemeStructure.panose;
            }
        };
        FontSchemeStruct.prototype.destroy = function () {
            this.fontName = undefined;
            this.fontTypeface = undefined;
            this.pnose = undefined;
        };
        return FontSchemeStruct;
    }());
    exports.FontSchemeStruct = FontSchemeStruct;
});
