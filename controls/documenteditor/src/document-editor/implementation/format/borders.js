define(["require", "exports", "./border", "@syncfusion/ej2-base", "./paragraph-format"], function (require, exports, border_1, ej2_base_1, paragraph_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WBorders = (function () {
        function WBorders(node) {
            this.leftIn = new border_1.WBorder(this);
            this.rightIn = new border_1.WBorder(this);
            this.topIn = new border_1.WBorder(this);
            this.bottomIn = new border_1.WBorder(this);
            this.horizontalIn = new border_1.WBorder(this);
            this.verticalIn = new border_1.WBorder(this);
            this.diagonalUpIn = new border_1.WBorder(this);
            this.diagonalDownIn = new border_1.WBorder(this);
            this.isParsing = false;
            this.ownerBase = node;
        }
        Object.defineProperty(WBorders.prototype, "left", {
            get: function () {
                if (this.ownerBase instanceof paragraph_format_1.WParagraphFormat) {
                    return this.getPropertyValue('left');
                }
                return this.leftIn;
            },
            set: function (value) {
                this.leftIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WBorders.prototype, "right", {
            get: function () {
                if (this.ownerBase instanceof paragraph_format_1.WParagraphFormat) {
                    return this.getPropertyValue('right');
                }
                return this.rightIn;
            },
            set: function (value) {
                this.rightIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WBorders.prototype, "top", {
            get: function () {
                if (this.ownerBase instanceof paragraph_format_1.WParagraphFormat) {
                    return this.getPropertyValue('top');
                }
                return this.topIn;
            },
            set: function (value) {
                this.topIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WBorders.prototype, "bottom", {
            get: function () {
                if (this.ownerBase instanceof paragraph_format_1.WParagraphFormat) {
                    return this.getPropertyValue('bottom');
                }
                return this.bottomIn;
            },
            set: function (value) {
                this.bottomIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WBorders.prototype, "horizontal", {
            get: function () {
                if (this.ownerBase instanceof paragraph_format_1.WParagraphFormat) {
                    return this.getPropertyValue('horizontal');
                }
                return this.horizontalIn;
            },
            set: function (value) {
                this.horizontalIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WBorders.prototype, "vertical", {
            get: function () {
                if (this.ownerBase instanceof paragraph_format_1.WParagraphFormat) {
                    return this.getPropertyValue('vertical');
                }
                return this.verticalIn;
            },
            set: function (value) {
                this.verticalIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WBorders.prototype, "diagonalUp", {
            get: function () {
                return this.diagonalUpIn;
            },
            set: function (value) {
                this.diagonalUpIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WBorders.prototype, "diagonalDown", {
            get: function () {
                return this.diagonalDownIn;
            },
            set: function (value) {
                this.diagonalDownIn = value;
            },
            enumerable: true,
            configurable: true
        });
        WBorders.prototype.getPropertyValue = function (property) {
            var border = this.getBorder(property);
            if (this.isParsing) {
                return border;
            }
            if (!border.hasValues()) {
                var baseStyle = this.ownerBase.baseStyle;
                if (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                    var currentFormat = this;
                    while (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                        var listParaFormat = void 0;
                        if (!this.ownerBase.listFormat.hasValue('listId')) {
                            listParaFormat = baseStyle.paragraphFormat.getListPargaraphFormat(property);
                        }
                        if (baseStyle.paragraphFormat.borders.getBorder(property).hasValues()) {
                            currentFormat = baseStyle.paragraphFormat.borders;
                            break;
                        }
                        else if (!ej2_base_1.isNullOrUndefined(listParaFormat) &&
                            (listParaFormat.borders.getBorder(property).hasValues())) {
                            currentFormat = listParaFormat.borders;
                            break;
                        }
                        else {
                            baseStyle = baseStyle.basedOn;
                        }
                    }
                    if (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                        return currentFormat.getBorder(property);
                    }
                }
            }
            else {
                return border;
            }
            return this.getDefaultValue(property);
        };
        WBorders.prototype.getDefaultValue = function (property) {
            var docParagraphFormat = this.documentParagraphFormat();
            var border;
            if (!ej2_base_1.isNullOrUndefined(docParagraphFormat) && !ej2_base_1.isNullOrUndefined(docParagraphFormat.borders)) {
                border = docParagraphFormat.borders.getBorder(property);
            }
            return border;
        };
        WBorders.prototype.documentParagraphFormat = function () {
            var docParagraphFormat;
            if (this.ownerBase instanceof paragraph_format_1.WParagraphFormat) {
                docParagraphFormat = this.ownerBase.getDocumentParagraphFormat();
            }
            return docParagraphFormat;
        };
        WBorders.prototype.getBorder = function (property) {
            var value = undefined;
            switch (property) {
                case 'left':
                    return this.leftIn;
                case 'right':
                    return this.rightIn;
                case 'top':
                    return this.topIn;
                case 'bottom':
                    return this.bottomIn;
                case 'vertical':
                    return this.verticalIn;
                case 'horizontal':
                    return this.horizontalIn;
            }
            return value;
        };
        WBorders.prototype.clearFormat = function () {
            if (!ej2_base_1.isNullOrUndefined(this.leftIn)) {
                this.leftIn.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.topIn)) {
                this.topIn.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomIn)) {
                this.bottomIn.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightIn)) {
                this.rightIn.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.horizontalIn)) {
                this.horizontalIn.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.verticalIn)) {
                this.verticalIn.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.diagonalDown)) {
                this.diagonalDown.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.diagonalUp)) {
                this.diagonalUp.clearFormat();
            }
        };
        WBorders.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.leftIn)) {
                this.leftIn.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.topIn)) {
                this.topIn.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomIn)) {
                this.bottomIn.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightIn)) {
                this.rightIn.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.horizontalIn)) {
                this.horizontalIn.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.verticalIn)) {
                this.verticalIn.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.diagonalDown)) {
                this.diagonalDown.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.diagonalUp)) {
                this.diagonalUp.destroy();
            }
            this.topIn = undefined;
            this.bottomIn = undefined;
            this.leftIn = undefined;
            this.rightIn = undefined;
            this.horizontalIn = undefined;
            this.verticalIn = undefined;
            this.diagonalDownIn = undefined;
            this.diagonalUpIn = undefined;
            this.ownerBase = undefined;
        };
        WBorders.prototype.cloneFormat = function () {
            var borders = new WBorders(undefined);
            borders.top = ej2_base_1.isNullOrUndefined(this.topIn) ? undefined : this.topIn.cloneFormat();
            borders.bottom = ej2_base_1.isNullOrUndefined(this.bottomIn) ? undefined : this.bottomIn.cloneFormat();
            borders.left = ej2_base_1.isNullOrUndefined(this.leftIn) ? undefined : this.leftIn.cloneFormat();
            borders.right = ej2_base_1.isNullOrUndefined(this.rightIn) ? undefined : this.rightIn.cloneFormat();
            borders.horizontal = ej2_base_1.isNullOrUndefined(this.horizontalIn) ? undefined : this.horizontalIn.cloneFormat();
            borders.vertical = ej2_base_1.isNullOrUndefined(this.verticalIn) ? undefined : this.verticalIn.cloneFormat();
            borders.diagonalUp = ej2_base_1.isNullOrUndefined(this.diagonalUp) ? undefined : this.diagonalUp.cloneFormat();
            borders.diagonalDown = ej2_base_1.isNullOrUndefined(this.diagonalDown) ? undefined : this.diagonalDown.cloneFormat();
            return borders;
        };
        WBorders.prototype.copyFormat = function (borders) {
            if (!ej2_base_1.isNullOrUndefined(borders.getBorder('left')) && borders.getBorder('left') instanceof border_1.WBorder) {
                var left = new border_1.WBorder(this);
                left.copyFormat(borders.getBorder('left'));
                this.left = left;
            }
            if (!ej2_base_1.isNullOrUndefined(borders.getBorder('right')) && borders.getBorder('right') instanceof border_1.WBorder) {
                var right = new border_1.WBorder(this);
                right.copyFormat(borders.getBorder('right'));
                this.right = right;
            }
            if (!ej2_base_1.isNullOrUndefined(borders.getBorder('top')) && borders.getBorder('top') instanceof border_1.WBorder) {
                var top_1 = new border_1.WBorder(this);
                top_1.copyFormat(borders.getBorder('top'));
                this.top = top_1;
            }
            if (!ej2_base_1.isNullOrUndefined(borders.getBorder('bottom')) && borders.getBorder('bottom') instanceof border_1.WBorder) {
                var bottom = new border_1.WBorder(this);
                bottom.copyFormat(borders.getBorder('bottom'));
                this.bottom = bottom;
            }
            if (!ej2_base_1.isNullOrUndefined(borders.getBorder('horizontal')) && borders.getBorder('horizontal') instanceof border_1.WBorder) {
                var horizontal = new border_1.WBorder(this);
                horizontal.copyFormat(borders.getBorder('horizontal'));
                this.horizontal = horizontal;
            }
            if (!ej2_base_1.isNullOrUndefined(borders.getBorder('vertical')) && borders.getBorder('vertical') instanceof border_1.WBorder) {
                var vertical = new border_1.WBorder(this);
                vertical.copyFormat(borders.getBorder('vertical'));
                this.vertical = vertical;
            }
            if (!ej2_base_1.isNullOrUndefined(borders.diagonalDown) && borders.diagonalDown instanceof border_1.WBorder) {
                this.diagonalDown = new border_1.WBorder(this);
                this.diagonalDown.copyFormat(borders.diagonalDown);
            }
            if (!ej2_base_1.isNullOrUndefined(borders.diagonalUp) && borders.diagonalUp instanceof border_1.WBorder) {
                this.diagonalUp = new border_1.WBorder(this);
                this.diagonalUp.copyFormat(borders.diagonalUp);
            }
        };
        return WBorders;
    }());
    exports.WBorders = WBorders;
});
