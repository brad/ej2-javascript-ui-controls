var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./paragraph-format", "./character-format", "../editor/editor-helper", "@syncfusion/ej2-base"], function (require, exports, paragraph_format_1, character_format_1, editor_helper_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WStyle = (function () {
        function WStyle() {
        }
        return WStyle;
    }());
    exports.WStyle = WStyle;
    var WParagraphStyle = (function (_super) {
        __extends(WParagraphStyle, _super);
        function WParagraphStyle(node) {
            var _this = _super.call(this) || this;
            _this.ownerBase = node;
            _this.paragraphFormat = new paragraph_format_1.WParagraphFormat(_this);
            _this.characterFormat = new character_format_1.WCharacterFormat(_this);
            return _this;
        }
        WParagraphStyle.prototype.clear = function () {
            if (this.characterFormat) {
                this.characterFormat.clearFormat();
            }
            if (this.paragraphFormat) {
                this.paragraphFormat.clearFormat();
            }
        };
        WParagraphStyle.prototype.destroy = function () {
            if (this.characterFormat) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            if (this.paragraphFormat) {
                this.paragraphFormat.destroy();
                this.paragraphFormat = undefined;
            }
            this.ownerBase = undefined;
            this.name = undefined;
            this.next = undefined;
            this.basedOn = undefined;
            this.link = undefined;
        };
        WParagraphStyle.prototype.copyStyle = function (paraStyle) {
            this.name = paraStyle.name;
            this.ownerBase = paraStyle.ownerBase;
            this.type = paraStyle.type;
            this.next = paraStyle.next;
            this.basedOn = paraStyle.basedOn;
            this.link = paraStyle.link;
            this.characterFormat.copyFormat(paraStyle.characterFormat);
            this.paragraphFormat.copyFormat(paraStyle.paragraphFormat);
        };
        return WParagraphStyle;
    }(WStyle));
    exports.WParagraphStyle = WParagraphStyle;
    var WCharacterStyle = (function (_super) {
        __extends(WCharacterStyle, _super);
        function WCharacterStyle(node) {
            var _this = _super.call(this) || this;
            _this.ownerBase = node;
            _this.characterFormat = new character_format_1.WCharacterFormat(_this);
            return _this;
        }
        WCharacterStyle.prototype.clear = function () {
            if (this.characterFormat) {
                this.characterFormat.clearFormat();
            }
        };
        WCharacterStyle.prototype.destroy = function () {
            if (this.characterFormat) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            this.ownerBase = undefined;
            this.name = undefined;
            this.next = undefined;
            this.basedOn = undefined;
            this.link = undefined;
        };
        WCharacterStyle.prototype.copyStyle = function (charStyle) {
            this.name = charStyle.name;
            this.ownerBase = charStyle.ownerBase;
            this.type = charStyle.type;
            this.next = charStyle.next;
            this.basedOn = charStyle.basedOn;
            this.characterFormat.copyFormat(charStyle.characterFormat);
        };
        return WCharacterStyle;
    }(WStyle));
    exports.WCharacterStyle = WCharacterStyle;
    var WStyles = (function () {
        function WStyles() {
            this.collection = [];
        }
        Object.defineProperty(WStyles.prototype, "length", {
            get: function () {
                return this.collection.length;
            },
            enumerable: true,
            configurable: true
        });
        WStyles.prototype.remove = function (item) {
            this.collection = this.collection.filter(function (a) { return (a.name !== item.name); });
        };
        WStyles.prototype.push = function (item) {
            if (item != null && item !== undefined) {
                this.collection.push(item);
            }
            return 1;
        };
        WStyles.prototype.getItem = function (index) {
            if (this.collection.length > index) {
                return this.collection[parseInt(index.toString(), 10)];
            }
            return null;
        };
        WStyles.prototype.indexOf = function (item) {
            return this.collection.indexOf(item);
        };
        WStyles.prototype.contains = function (item) {
            var index = this.collection.indexOf(item);
            return index > -1 && index < this.collection.length;
        };
        WStyles.prototype.clear = function () {
            if (this.collection && this.collection.length > 0) {
                for (var i = 0; i < this.collection.length; i++) {
                    var style = this.collection[parseInt(i.toString(), 10)];
                    if (style instanceof WCharacterStyle) {
                        style.clear();
                    }
                    else {
                        style.clear();
                    }
                }
            }
            this.collection = [];
        };
        WStyles.prototype.findByName = function (name, type) {
            var returnStyle;
            for (var _i = 0, _a = this.collection; _i < _a.length; _i++) {
                var value = _a[_i];
                if (value.name === name) {
                    returnStyle = value;
                    if (!ej2_base_1.isNullOrUndefined(type)) {
                        if (value.type !== type) {
                            returnStyle = undefined;
                        }
                    }
                }
            }
            return returnStyle;
        };
        WStyles.prototype.getStyleNames = function (type) {
            return this.collection.filter(function (a) { return (a.type === type); }).map(function (a) {
                return a.name;
            });
        };
        WStyles.prototype.getStyles = function (type) {
            var styles = this.collection.filter(function (a) { return (a.type === type); }).map(function (a) {
                return a;
            });
            var styleObjects = [];
            for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
                var style = styles_1[_i];
                var returnStyle = {};
                var returnStyleObject = {};
                if (type == "Paragraph") {
                    returnStyleObject.paragraphFormat = {};
                    editor_helper_1.HelperMethods.writeParagraphFormat(returnStyleObject.paragraphFormat, true, style.paragraphFormat);
                }
                returnStyleObject.characterFormat = {};
                editor_helper_1.HelperMethods.writeCharacterFormat(returnStyleObject.characterFormat, true, style.characterFormat);
                returnStyle.name = style.name;
                returnStyle.style = JSON.stringify(returnStyleObject);
                if (!ej2_base_1.isNullOrUndefined(type)) {
                    returnStyle.type = type;
                    if (returnStyle.type == "Paragraph" && !ej2_base_1.isNullOrUndefined(style.link)) {
                        returnStyle.type = "Linked";
                    }
                }
                styleObjects.push(returnStyle);
            }
            return styleObjects;
        };
        WStyles.prototype.destroy = function () {
            if (this.collection && this.collection.length > 0) {
                for (var i = 0; i < this.collection.length; i++) {
                    var style = this.collection[parseInt(i.toString(), 10)];
                    if (style instanceof WCharacterStyle) {
                        style.destroy();
                    }
                    else {
                        style.destroy();
                    }
                }
            }
            this.collection = [];
            this.collection = undefined;
        };
        return WStyles;
    }());
    exports.WStyles = WStyles;
});
