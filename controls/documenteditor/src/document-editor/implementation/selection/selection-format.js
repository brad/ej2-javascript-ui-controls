define(["require", "exports", "../../base/types", "../format/index", "../index", "@syncfusion/ej2-base", "../list/list", "../list/abstract-list", "../list/list-level"], function (require, exports, types_1, index_1, index_2, ej2_base_1, list_1, abstract_list_1, list_level_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SelectionCharacterFormat = (function () {
        function SelectionCharacterFormat(selection) {
            this.boldIn = undefined;
            this.italicIn = undefined;
            this.underlineIn = undefined;
            this.strikeThroughIn = undefined;
            this.baselineAlignmentIn = undefined;
            this.highlightColorIn = undefined;
            this.fontSizeIn = 0;
            this.scriptType = types_1.FontScriptType.English;
            this.fontColorIn = undefined;
            this.allCapsIn = undefined;
            this.boldBidi = undefined;
            this.italicBidi = undefined;
            this.fontSizeBidi = 0;
            this.bidi = undefined;
            this.bdo = undefined;
            this.selection = selection;
        }
        Object.defineProperty(SelectionCharacterFormat.prototype, "fontSize", {
            get: function () {
                return this.fontSizeIn;
            },
            set: function (value) {
                if (value === this.fontSizeIn) {
                    return;
                }
                this.fontSizeIn = value;
                this.notifyPropertyChanged('fontSize');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "renderedFontFamily", {
            get: function () {
                return this.renderedFontFamilyIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "fontFamily", {
            get: function () {
                return this.fontFamilyIn;
            },
            set: function (value) {
                if (value === this.fontFamilyIn) {
                    return;
                }
                this.fontFamilyIn = this.renderedFontFamilyIn = value;
                this.notifyPropertyChanged('fontFamily');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "fontColor", {
            get: function () {
                return this.fontColorIn;
            },
            set: function (value) {
                if (value === this.fontColorIn) {
                    return;
                }
                this.fontColorIn = value;
                this.notifyPropertyChanged('fontColor');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "bold", {
            get: function () {
                return this.boldIn;
            },
            set: function (value) {
                if (value === this.boldIn) {
                    return;
                }
                this.boldIn = value;
                this.notifyPropertyChanged('bold');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "italic", {
            get: function () {
                return this.italicIn;
            },
            set: function (value) {
                if (value === this.italic) {
                    return;
                }
                this.italicIn = value;
                this.notifyPropertyChanged('italic');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "strikethrough", {
            get: function () {
                return this.strikeThroughIn;
            },
            set: function (value) {
                if (value === this.strikeThroughIn) {
                    return;
                }
                this.strikeThroughIn = value;
                this.notifyPropertyChanged('strikethrough');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "baselineAlignment", {
            get: function () {
                return this.baselineAlignmentIn;
            },
            set: function (value) {
                if (value === this.baselineAlignmentIn) {
                    return;
                }
                this.baselineAlignmentIn = value;
                this.notifyPropertyChanged('baselineAlignment');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "underline", {
            get: function () {
                return this.underlineIn;
            },
            set: function (value) {
                if (value === this.underlineIn) {
                    return;
                }
                this.underlineIn = value;
                this.notifyPropertyChanged('underline');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "highlightColor", {
            get: function () {
                return this.highlightColorIn;
            },
            set: function (value) {
                if (value === this.highlightColorIn && value !== "NoColor") {
                    return;
                }
                this.highlightColorIn = value;
                this.notifyPropertyChanged('highlightColor');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCharacterFormat.prototype, "allCaps", {
            get: function () {
                return this.allCapsIn;
            },
            set: function (value) {
                if (value === this.allCapsIn) {
                    return;
                }
                this.allCapsIn = value;
                this.notifyPropertyChanged('allCaps');
            },
            enumerable: true,
            configurable: true
        });
        SelectionCharacterFormat.prototype.getPropertyValue = function (property) {
            switch (property) {
                case 'bold':
                    return this.bold;
                case 'italic':
                    return this.italic;
                case 'fontSize':
                    if (this.fontSize >= 1) {
                        return this.fontSize;
                    }
                    return undefined;
                case 'fontFamily':
                    return this.fontFamily;
                case 'strikethrough':
                    return this.strikethrough;
                case 'baselineAlignment':
                    return this.baselineAlignment;
                case 'highlightColor':
                    return this.highlightColor;
                case 'underline':
                    return this.underline;
                case 'fontColor':
                    return this.fontColor;
                case 'allCaps':
                    return this.allCaps;
                default:
                    return undefined;
            }
        };
        SelectionCharacterFormat.prototype.notifyPropertyChanged = function (propertyName) {
            if (!ej2_base_1.isNullOrUndefined(this.selection) && (this.selection.isCleared || (this.selection.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) ||
                !this.selection.owner.isDocumentLoaded || this.selection.owner.isPastingContent) && !this.selection.isRetrieveFormatting) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(this.selection) && !ej2_base_1.isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
                var propertyValue = this.getPropertyValue(propertyName);
                if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                    this.selection.owner.editorModule.onApplyCharacterFormat(propertyName, propertyValue);
                }
            }
        };
        SelectionCharacterFormat.prototype.copyFormat = function (format, renderFontFamily) {
            this.styleName = !ej2_base_1.isNullOrUndefined(format.baseCharStyle) ? format.baseCharStyle.name : 'Default Paragraph Font';
            this.fontSize = format.fontSize;
            this.renderedFontFamilyIn = renderFontFamily;
            this.fontFamily = format.fontFamily;
            this.bold = format.bold;
            this.italic = format.italic;
            this.baselineAlignment = format.baselineAlignment;
            this.underline = format.underline;
            this.fontColor = format.fontColor;
            this.highlightColor = format.highlightColor;
            this.strikethrough = format.strikethrough;
            this.bidi = format.bidi;
            this.bdo = format.bdo;
            this.boldBidi = format.boldBidi;
            this.italicBidi = format.italicBidi;
            this.fontFamilyBidi = format.fontFamilyBidi;
            this.fontSizeBidi = format.fontSizeBidi;
            this.allCaps = format.allCaps;
        };
        SelectionCharacterFormat.prototype.combineFormat = function (format, renderFontFamily) {
            if (!ej2_base_1.isNullOrUndefined(this.bold) && this.bold !== format.bold) {
                this.bold = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.italic) && this.italic !== format.italic) {
                this.italic = undefined;
            }
            if (this.fontSize !== 0 && this.fontSize !== format.fontSize) {
                this.fontSize = 0;
            }
            if (!ej2_base_1.isNullOrUndefined(this.renderedFontFamily) && this.renderedFontFamily !== renderFontFamily) {
                this.renderedFontFamilyIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.fontFamily) && this.fontFamily !== format.fontFamily) {
                this.fontFamily = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.highlightColor) && this.highlightColor !== format.highlightColor) {
                this.highlightColor = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.baselineAlignment) && this.baselineAlignment !== format.baselineAlignment) {
                this.baselineAlignment = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.fontColor) && (this.fontColor !== format.fontColor)) {
                this.fontColor = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.underline) && this.underline !== format.underline) {
                this.underline = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.strikethrough) && this.strikethrough !== format.strikethrough) {
                this.strikethrough = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.boldBidi) && this.boldBidi !== format.boldBidi) {
                this.boldBidi = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.italicBidi) && this.italicBidi !== format.italicBidi) {
                this.italicBidi = undefined;
            }
            if (this.fontSizeBidi !== 0 && this.fontSizeBidi !== format.fontSizeBidi) {
                this.fontSizeBidi = 0;
            }
            if (!ej2_base_1.isNullOrUndefined(this.fontFamilyBidi) && this.fontFamilyBidi !== format.fontFamilyBidi) {
                this.fontFamilyBidi = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.bidi) && this.bidi !== format.bidi) {
                this.bidi = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.bdo) && this.bdo !== format.bdo) {
                this.bdo = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.allCaps) && this.allCaps !== format.allCaps) {
                this.allCaps = undefined;
            }
        };
        SelectionCharacterFormat.prototype.canRetrieveNextCharacterFormat = function () {
            if (ej2_base_1.isNullOrUndefined(this.bold) && ej2_base_1.isNullOrUndefined(this.italic) && this.fontSize === 0 && ej2_base_1.isNullOrUndefined(this.fontFamily) && ej2_base_1.isNullOrUndefined(this.highlightColor)
                && ej2_base_1.isNullOrUndefined(this.baselineAlignment) && ej2_base_1.isNullOrUndefined(this.fontColor) && ej2_base_1.isNullOrUndefined(this.underline) && ej2_base_1.isNullOrUndefined(this.strikethrough) && ej2_base_1.isNullOrUndefined(this.boldBidi)
                && ej2_base_1.isNullOrUndefined(this.italicBidi) && this.fontSizeBidi === 0 && ej2_base_1.isNullOrUndefined(this.fontFamilyBidi) && ej2_base_1.isNullOrUndefined(this.bdo) && ej2_base_1.isNullOrUndefined(this.allCaps)) {
                return false;
            }
            return true;
        };
        SelectionCharacterFormat.prototype.cloneFormat = function (selectionCharacterFormat) {
            this.bold = selectionCharacterFormat.bold;
            this.italic = selectionCharacterFormat.italic;
            this.underline = selectionCharacterFormat.underline;
            this.strikethrough = selectionCharacterFormat.strikethrough;
            this.baselineAlignment = selectionCharacterFormat.baselineAlignment;
            this.highlightColor = selectionCharacterFormat.highlightColor;
            this.fontSize = selectionCharacterFormat.fontSize;
            this.fontFamily = selectionCharacterFormat.fontFamily;
            this.fontColor = selectionCharacterFormat.fontColor;
            this.styleName = selectionCharacterFormat.styleName;
            this.bidi = selectionCharacterFormat.bidi;
            this.bdo = selectionCharacterFormat.bdo;
            this.boldBidi = selectionCharacterFormat.boldBidi;
            this.italicBidi = selectionCharacterFormat.italicBidi;
            this.fontSizeBidi = selectionCharacterFormat.fontSizeBidi;
            this.fontFamilyBidi = selectionCharacterFormat.fontFamilyBidi;
            this.allCaps = selectionCharacterFormat.allCaps;
        };
        SelectionCharacterFormat.prototype.isEqualFormat = function (format) {
            return (this.fontSize === format.fontSize
                && this.strikethrough === format.strikethrough
                && this.bold === format.bold
                && this.fontFamily === format.fontFamily
                && this.underline === format.underline
                && this.highlightColor === format.highlightColor
                && this.italic === format.italic
                && this.baselineAlignment === format.baselineAlignment
                && this.fontColor === format.fontColor
                && this.allCaps === format.allCaps);
        };
        SelectionCharacterFormat.prototype.clearFormat = function () {
            this.fontSizeIn = 0;
            this.boldIn = undefined;
            this.italicIn = undefined;
            this.fontFamilyIn = undefined;
            this.fontColorIn = undefined;
            this.underlineIn = undefined;
            this.strikeThroughIn = undefined;
            this.highlightColorIn = undefined;
            this.baselineAlignmentIn = undefined;
            this.styleName = undefined;
            this.bidi = undefined;
            this.bdo = undefined;
            this.boldBidi = undefined;
            this.italicBidi = undefined;
            this.fontFamilyBidi = undefined;
            this.fontSizeBidi = undefined;
            this.allCapsIn = undefined;
        };
        SelectionCharacterFormat.prototype.destroy = function () {
            this.fontSizeIn = undefined;
            this.boldIn = undefined;
            this.italicIn = undefined;
            this.fontFamilyIn = undefined;
            this.fontColorIn = undefined;
            this.underlineIn = undefined;
            this.strikeThroughIn = undefined;
            this.baselineAlignmentIn = undefined;
            this.highlightColorIn = undefined;
            this.selection = undefined;
            this.styleName = undefined;
            this.bidi = undefined;
            this.bdo = undefined;
            this.boldBidi = undefined;
            this.italicBidi = undefined;
            this.fontFamilyBidi = undefined;
            this.fontSizeBidi = undefined;
            this.allCapsIn = undefined;
        };
        return SelectionCharacterFormat;
    }());
    exports.SelectionCharacterFormat = SelectionCharacterFormat;
    var SelectionBorder = (function () {
        function SelectionBorder(selection, borderType, node) {
            this.colorIn = undefined;
            this.lineStyleIn = undefined;
            this.lineWidthIn = undefined;
            this.shadowIn = undefined;
            this.spaceIn = undefined;
            this.borderType = borderType;
            this.ownerBase = node;
            this.selection = selection;
        }
        Object.defineProperty(SelectionBorder.prototype, "color", {
            get: function () {
                return this.colorIn;
            },
            set: function (value) {
                if (value === this.colorIn) {
                    return;
                }
                this.colorIn = value;
                this.notifyPropertyChanged("color");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorder.prototype, "lineStyle", {
            get: function () {
                return this.lineStyleIn;
            },
            set: function (value) {
                if (value === this.lineStyleIn) {
                    return;
                }
                this.lineStyleIn = value;
                this.notifyPropertyChanged("lineStyle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorder.prototype, "lineWidth", {
            get: function () {
                return this.lineWidthIn;
            },
            set: function (value) {
                if (value === this.lineWidthIn) {
                    return;
                }
                this.lineWidthIn = value;
                this.notifyPropertyChanged("lineWidth");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorder.prototype, "shadow", {
            get: function () {
                return this.shadowIn;
            },
            set: function (value) {
                if (value === this.shadowIn) {
                    return;
                }
                this.shadowIn = value;
                this.notifyPropertyChanged("shadow");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorder.prototype, "space", {
            get: function () {
                return this.spaceIn;
            },
            set: function (value) {
                if (value === this.spaceIn) {
                    return;
                }
                this.spaceIn = value;
                this.notifyPropertyChanged('space');
            },
            enumerable: true,
            configurable: true
        });
        SelectionBorder.prototype.copyFormat = function (border) {
            this.color = border.color;
            this.lineStyle = border.lineStyle;
            this.lineWidth = border.lineWidth;
            this.shadow = border.shadow;
            this.space = border.space;
        };
        SelectionBorder.prototype.combineFormat = function (border) {
            if (!ej2_base_1.isNullOrUndefined(this.color) && this.color !== border.color) {
                this.color = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.lineStyle) && this.lineStyle !== border.lineStyle) {
                this.lineStyle = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.lineWidth) && this.lineWidth !== border.lineWidth) {
                this.lineWidth = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.shadow) && this.shadow !== border.shadow) {
                this.shadow = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.space) && this.space !== border.space) {
                this.space = undefined;
            }
        };
        SelectionBorder.prototype.getPropertyValue = function (property) {
            switch (property) {
                case 'color':
                    return this.color;
                case 'lineStyle':
                    return this.lineStyle;
                case 'lineWidth':
                    return this.lineWidth;
                case 'space':
                    return this.space;
                case 'shadow':
                    return this.shadow;
            }
            return undefined;
        };
        SelectionBorder.prototype.notifyPropertyChanged = function (propertyName) {
            if (!ej2_base_1.isNullOrUndefined(this.selection) &&
                ((this.selection.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) || !this.selection.owner.isDocumentLoaded)
                && !this.selection.isRetrieveFormatting) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(this.selection) && !ej2_base_1.isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
                var editor = this.selection.owner.editorModule;
                var propertyValue = this.getPropertyValue(propertyName);
                if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                    editor.applyParagraphBorders(propertyName, this.borderType, propertyValue);
                }
            }
        };
        SelectionBorder.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.colorIn)) {
                this.colorIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.lineStyleIn)) {
                this.lineStyleIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.lineWidthIn)) {
                this.lineWidthIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.spaceIn)) {
                this.spaceIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.shadowIn)) {
                this.shadowIn = undefined;
            }
        };
        return SelectionBorder;
    }());
    exports.SelectionBorder = SelectionBorder;
    var SelectionBorders = (function () {
        function SelectionBorders(selection, node) {
            this.ownerBase = undefined;
            this.ownerBase = node;
            this.selection = selection;
            this.topIn = new SelectionBorder(this.selection, 'topBorder', this);
            this.bottomIn = new SelectionBorder(this.selection, 'bottomBorder', this);
            this.rightIn = new SelectionBorder(this.selection, 'rightBorder', this);
            this.leftIn = new SelectionBorder(this.selection, 'leftBorder', this);
            this.horizontalIn = new SelectionBorder(this.selection, 'horizontalBorder', this);
            this.verticalIn = new SelectionBorder(this.selection, 'verticalBorder', this);
        }
        Object.defineProperty(SelectionBorders.prototype, "top", {
            get: function () {
                return this.topIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorders.prototype, "bottom", {
            get: function () {
                return this.bottomIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorders.prototype, "left", {
            get: function () {
                return this.leftIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorders.prototype, "right", {
            get: function () {
                return this.rightIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorders.prototype, "horizontal", {
            get: function () {
                return this.horizontalIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionBorders.prototype, "vertical", {
            get: function () {
                return this.verticalIn;
            },
            enumerable: true,
            configurable: true
        });
        SelectionBorders.prototype.copyFormat = function (borders) {
            this.top.copyFormat(borders.top);
            this.bottom.copyFormat(borders.bottom);
            this.left.copyFormat(borders.left);
            this.right.copyFormat(borders.right);
            this.horizontal.copyFormat(borders.horizontal);
            this.vertical.copyFormat(borders.vertical);
        };
        SelectionBorders.prototype.combineFormat = function (borders) {
            this.top.combineFormat(borders.top);
            this.bottom.combineFormat(borders.bottom);
            this.left.combineFormat(borders.left);
            this.right.combineFormat(borders.right);
            this.vertical.combineFormat(borders.vertical);
            this.horizontal.combineFormat(borders.horizontal);
        };
        SelectionBorders.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.topIn)) {
                this.topIn.destroy();
                this.topIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.topIn)) {
                this.bottomIn.destroy();
                this.bottomIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.leftIn)) {
                this.leftIn.destroy();
                this.leftIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightIn)) {
                this.rightIn.destroy();
                this.rightIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.horizontalIn)) {
                this.horizontalIn.destroy();
                this.horizontalIn = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.verticalIn)) {
                this.verticalIn.destroy();
                this.verticalIn = undefined;
            }
        };
        return SelectionBorders;
    }());
    exports.SelectionBorders = SelectionBorders;
    var SelectionParagraphFormat = (function () {
        function SelectionParagraphFormat(selection, documentHelper) {
            this.leftIndentIn = 0;
            this.rightIndentIn = 0;
            this.beforeSpacingIn = 0;
            this.afterSpacingIn = 0;
            this.spaceAfterAutoIn = undefined;
            this.spaceBeforeAutoIn = undefined;
            this.textAlignmentIn = undefined;
            this.outlineLevelIn = undefined;
            this.firstLineIndentIn = 0;
            this.lineSpacingIn = 1;
            this.lineSpacingTypeIn = undefined;
            this.bidiIn = undefined;
            this.keepWithNextIn = undefined;
            this.keepLinesTogetherIn = undefined;
            this.widowControlIn = undefined;
            this.contextualSpacingIn = undefined;
            this.listLevelNumberIn = -1;
            this.selection = selection;
            this.documentHelper = documentHelper;
            this.bordersIn = new SelectionBorders(this.selection, this);
        }
        Object.defineProperty(SelectionParagraphFormat.prototype, "borders", {
            get: function () {
                return this.bordersIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "leftIndent", {
            get: function () {
                return this.leftIndentIn;
            },
            set: function (value) {
                if (value === this.leftIndentIn) {
                    return;
                }
                this.leftIndentIn = value;
                this.notifyPropertyChanged('leftIndent');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "rightIndent", {
            get: function () {
                return this.rightIndentIn;
            },
            set: function (value) {
                if (value === this.rightIndentIn) {
                    return;
                }
                this.rightIndentIn = value;
                this.notifyPropertyChanged('rightIndent');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "firstLineIndent", {
            get: function () {
                return this.firstLineIndentIn;
            },
            set: function (value) {
                if (value === this.firstLineIndentIn) {
                    return;
                }
                this.firstLineIndentIn = value;
                this.notifyPropertyChanged('firstLineIndent');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "textAlignment", {
            get: function () {
                return this.textAlignmentIn;
            },
            set: function (value) {
                if (value === this.textAlignmentIn) {
                    return;
                }
                this.textAlignmentIn = value;
                this.notifyPropertyChanged('textAlignment');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "outlineLevel", {
            get: function () {
                return this.outlineLevelIn;
            },
            set: function (value) {
                if (value === this.outlineLevelIn) {
                    return;
                }
                this.outlineLevelIn = value;
                this.notifyPropertyChanged('outlineLevel');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "afterSpacing", {
            get: function () {
                return this.afterSpacingIn;
            },
            set: function (value) {
                if (value === this.afterSpacingIn) {
                    return;
                }
                this.afterSpacingIn = value;
                this.notifyPropertyChanged('afterSpacing');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "beforeSpacing", {
            get: function () {
                return this.beforeSpacingIn;
            },
            set: function (value) {
                if (value === this.beforeSpacingIn) {
                    return;
                }
                this.beforeSpacingIn = value;
                this.notifyPropertyChanged('beforeSpacing');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "spaceAfterAuto", {
            get: function () {
                return this.spaceAfterAutoIn;
            },
            set: function (value) {
                if (value === this.spaceAfterAutoIn) {
                    return;
                }
                this.spaceAfterAutoIn = value;
                this.notifyPropertyChanged('spaceAfterAuto');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "spaceBeforeAuto", {
            get: function () {
                return this.spaceBeforeAutoIn;
            },
            set: function (value) {
                if (value === this.spaceBeforeAutoIn) {
                    return;
                }
                this.spaceBeforeAutoIn = value;
                this.notifyPropertyChanged('spaceBeforeAuto');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "lineSpacing", {
            get: function () {
                return this.lineSpacingIn;
            },
            set: function (value) {
                if (value === this.lineSpacingIn) {
                    return;
                }
                this.lineSpacingIn = value;
                this.notifyPropertyChanged('lineSpacing');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "lineSpacingType", {
            get: function () {
                return this.lineSpacingTypeIn;
            },
            set: function (value) {
                if (value === this.lineSpacingTypeIn) {
                    return;
                }
                this.lineSpacingTypeIn = value;
                this.notifyPropertyChanged('lineSpacingType');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "listLevelNumber", {
            get: function () {
                return this.listLevelNumberIn;
            },
            set: function (value) {
                if (value === this.listLevelNumberIn) {
                    return;
                }
                this.listLevelNumberIn = value;
                this.notifyPropertyChanged('listLevelNumber');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "bidi", {
            get: function () {
                return this.bidiIn;
            },
            set: function (value) {
                this.bidiIn = value;
                this.notifyPropertyChanged('bidi');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "keepWithNext", {
            get: function () {
                return this.keepWithNextIn;
            },
            set: function (value) {
                this.keepWithNextIn = value;
                this.notifyPropertyChanged('keepWithNext');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "keepLinesTogether", {
            get: function () {
                return this.keepLinesTogetherIn;
            },
            set: function (value) {
                this.keepLinesTogetherIn = value;
                this.notifyPropertyChanged('keepLinesTogether');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "widowControl", {
            get: function () {
                return this.widowControlIn;
            },
            set: function (value) {
                this.widowControlIn = value;
                this.notifyPropertyChanged('widowControl');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionParagraphFormat.prototype, "contextualSpacing", {
            get: function () {
                return this.contextualSpacingIn;
            },
            set: function (value) {
                this.contextualSpacingIn = value;
                this.notifyPropertyChanged('contextualSpacing');
            },
            enumerable: true,
            configurable: true
        });
        SelectionParagraphFormat.prototype.validateLineSpacing = function () {
            if (this.lineSpacingType !== 'Multiple' && this.lineSpacingIn < 12) {
                return true;
            }
            return false;
        };
        Object.defineProperty(SelectionParagraphFormat.prototype, "listText", {
            get: function () {
                var listFormat = undefined;
                var list = this.documentHelper.getListById(this.listId);
                if (list instanceof list_1.WList && this.listLevelNumberIn > -1 && this.listLevelNumberIn < 9) {
                    var listLevel = list.getListLevel(this.listLevelNumber);
                    if (listLevel instanceof list_level_1.WListLevel) {
                        if (listLevel.listLevelPattern === 'Bullet') {
                            listFormat = listLevel.numberFormat;
                        }
                        else {
                            listFormat = listLevel.numberFormat;
                            for (var i = 0; i < 9; i++) {
                                var levelPattern = '%' + (i + 1);
                                if (listFormat.indexOf(levelPattern) > -1) {
                                    var level = i === this.listLevelNumberIn ? listLevel : list.getListLevel(i);
                                    var listTextElement = this.selection.getListTextElementBox(this.selection.start.paragraph);
                                    var listText = listTextElement ? listTextElement.text : '';
                                    listFormat = listText;
                                }
                            }
                        }
                    }
                }
                return listFormat;
            },
            enumerable: true,
            configurable: true
        });
        SelectionParagraphFormat.prototype.getPropertyValue = function (property) {
            switch (property) {
                case 'leftIndent':
                    return this.leftIndent;
                case 'rightIndent':
                    return this.rightIndent;
                case 'firstLineIndent':
                    return this.firstLineIndent;
                case 'beforeSpacing':
                    return this.beforeSpacing;
                case 'afterSpacing':
                    return this.afterSpacing;
                case 'spaceAfterAuto':
                    return this.spaceAfterAuto;
                case 'spaceBeforeAuto':
                    return this.spaceBeforeAuto;
                case 'textAlignment':
                    return this.textAlignment;
                case 'lineSpacing':
                    return this.lineSpacing;
                case 'lineSpacingType':
                    return this.lineSpacingType;
                case 'bidi':
                    return this.bidi;
                case 'contextualSpacing':
                    return this.contextualSpacing;
                case 'keepWithNext':
                    return this.keepWithNext;
                case 'keepLinesTogether':
                    return this.keepLinesTogether;
                case 'widowControl':
                    return this.widowControl;
                case 'outlineLevel':
                    return this.outlineLevel;
                default:
                    return undefined;
            }
        };
        SelectionParagraphFormat.prototype.notifyPropertyChanged = function (propertyName) {
            if (!ej2_base_1.isNullOrUndefined(this.selection) &&
                ((this.selection.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) || !this.selection.owner.isDocumentLoaded)
                && !this.selection.isRetrieveFormatting) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(this.selection) && !ej2_base_1.isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
                var editorModule = this.selection.owner.editorModule;
                if (propertyName === 'lineSpacing' || propertyName === 'lineSpacingType') {
                    var editorHistory = this.selection.owner.editorHistory;
                    if (!(editorHistory && (editorHistory.isUndoing || editorHistory.isRedoing)) && this.validateLineSpacing()) {
                        this.selection.owner.editorHistory.initComplexHistory(this.selection, 'LineSpacing');
                        if (propertyName === 'lineSpacing') {
                            this.lineSpacingTypeIn = 'Multiple';
                            var value_1 = this.getPropertyValue('lineSpacingType');
                            editorModule.onApplyParagraphFormat('lineSpacingType', value_1, false, false);
                            editorModule.onApplyParagraphFormat(propertyName, this.getPropertyValue(propertyName), false, false);
                        }
                        else {
                            editorModule.onApplyParagraphFormat(propertyName, this.getPropertyValue(propertyName), false, false);
                            this.lineSpacingIn = 12;
                            editorModule.onApplyParagraphFormat('lineSpacing', this.getPropertyValue('lineSpacing'), false, false);
                        }
                        this.selection.owner.editorHistory.updateComplexHistory();
                        return;
                    }
                }
                var value = this.getPropertyValue(propertyName);
                if ((propertyName === 'leftIndent' || propertyName === 'rightIndent' || propertyName === 'firstLineIndent')
                    && !(value >= -1056 && value < 1056)) {
                    return;
                }
                if (propertyName === 'listLevelNumber') {
                    editorModule.onApplyListInternal(this.documentHelper.getListById(this.listId), this.listLevelNumber);
                }
                else {
                    editorModule.onApplyParagraphFormat(propertyName, value, propertyName === 'textAlignment' ? true : false, false);
                }
            }
        };
        SelectionParagraphFormat.prototype.copyFormat = function (format) {
            this.styleName = !ej2_base_1.isNullOrUndefined(format.baseStyle) ? format.baseStyle.name : 'Normal';
            this.leftIndent = format.leftIndent;
            this.rightIndent = format.rightIndent;
            this.firstLineIndent = format.firstLineIndent;
            this.afterSpacing = format.afterSpacing;
            this.beforeSpacing = format.beforeSpacing;
            this.spaceAfterAuto = format.spaceAfterAuto;
            this.spaceBeforeAuto = format.spaceBeforeAuto;
            this.lineSpacing = format.lineSpacing;
            this.lineSpacingType = format.lineSpacingType;
            this.textAlignment = format.textAlignment;
            this.outlineLevel = format.outlineLevel;
            this.bidi = format.bidi;
            this.keepLinesTogether = format.keepLinesTogether;
            this.keepWithNext = format.keepWithNext;
            this.widowControl = format.widowControl;
            this.contextualSpacing = format.contextualSpacing;
            this.borders.copyFormat(format.borders);
            if (!ej2_base_1.isNullOrUndefined(format.listFormat) && !ej2_base_1.isNullOrUndefined(format.listFormat.listId)) {
                this.listId = format.listFormat.listId;
                this.listLevelNumber = format.listFormat.listLevelNumber;
            }
            else {
                this.listId = undefined;
                this.listLevelNumber = 0;
            }
        };
        SelectionParagraphFormat.prototype.copyToFormat = function (format) {
            if (ej2_base_1.isNullOrUndefined(format)) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(this.afterSpacing)) {
                format.afterSpacing = this.afterSpacing;
            }
            if (!ej2_base_1.isNullOrUndefined(this.beforeSpacing)) {
                format.beforeSpacing = this.beforeSpacing;
            }
            if (!ej2_base_1.isNullOrUndefined(this.spaceAfterAuto)) {
                format.spaceAfterAuto = this.spaceAfterAuto;
            }
            if (!ej2_base_1.isNullOrUndefined(this.spaceBeforeAuto)) {
                format.spaceBeforeAuto = this.spaceBeforeAuto;
            }
            if (!ej2_base_1.isNullOrUndefined(this.leftIndent)) {
                format.leftIndent = this.leftIndent;
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightIndent)) {
                format.rightIndent = this.rightIndent;
            }
            if (!ej2_base_1.isNullOrUndefined(this.textAlignment)) {
                format.textAlignment = this.textAlignment;
            }
            if (!ej2_base_1.isNullOrUndefined(this.outlineLevel)) {
                format.outlineLevel = this.outlineLevel;
            }
            if (!ej2_base_1.isNullOrUndefined(this.lineSpacing)) {
                format.lineSpacing = this.lineSpacing;
            }
            if (!ej2_base_1.isNullOrUndefined(this.lineSpacingType)) {
                format.lineSpacingType = this.lineSpacingType;
            }
            if (!ej2_base_1.isNullOrUndefined(this.firstLineIndent)) {
                format.firstLineIndent = this.firstLineIndent;
            }
            if (!ej2_base_1.isNullOrUndefined(this.bidi)) {
                format.bidi = this.bidi;
            }
            if (!ej2_base_1.isNullOrUndefined(this.keepWithNext)) {
                format.keepWithNext = this.keepWithNext;
            }
            if (!ej2_base_1.isNullOrUndefined(this.keepLinesTogether)) {
                format.keepLinesTogether = this.keepLinesTogether;
            }
            if (!ej2_base_1.isNullOrUndefined(this.widowControl)) {
                format.widowControl = this.widowControl;
            }
            if (!ej2_base_1.isNullOrUndefined(this.contextualSpacing)) {
                format.contextualSpacing = this.contextualSpacing;
            }
        };
        SelectionParagraphFormat.prototype.combineFormat = function (format) {
            if (!ej2_base_1.isNullOrUndefined(this.leftIndent) && this.leftIndent !== format.leftIndent) {
                this.leftIndent = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightIndent) && this.rightIndent !== format.rightIndent) {
                this.rightIndent = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.firstLineIndent) && this.firstLineIndent !== format.firstLineIndent) {
                this.firstLineIndent = undefined;
            }
            if (this.lineSpacing !== 0 && this.lineSpacing !== format.lineSpacing) {
                this.lineSpacing = 0;
            }
            if (this.beforeSpacing !== -1 && this.beforeSpacing !== format.beforeSpacing) {
                this.beforeSpacing = -1;
            }
            if (this.afterSpacing !== -1 && this.afterSpacing !== format.afterSpacing) {
                this.afterSpacing = -1;
            }
            if (!ej2_base_1.isNullOrUndefined(this.spaceAfterAuto) && this.spaceAfterAuto !== format.spaceAfterAuto) {
                this.spaceAfterAuto = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.spaceBeforeAuto) && this.spaceBeforeAuto !== format.spaceBeforeAuto) {
                this.spaceBeforeAuto = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.lineSpacingType) && this.lineSpacingType !== format.lineSpacingType) {
                this.lineSpacingType = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.textAlignment) && this.textAlignment !== format.textAlignment) {
                this.textAlignment = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.outlineLevel) && this.outlineLevel !== format.outlineLevel) {
                this.outlineLevel = undefined;
            }
            if (this.listLevelNumber >= 0 && !ej2_base_1.isNullOrUndefined(this.listId) && (ej2_base_1.isNullOrUndefined(format.listFormat) || format.listFormat.listLevelNumber !== this.listLevelNumber)) {
                this.listLevelNumber = -1;
            }
            if (ej2_base_1.isNullOrUndefined(format.listFormat) || ej2_base_1.isNullOrUndefined(format.listFormat.listId) || (!ej2_base_1.isNullOrUndefined(this.listId) && this.listId !== format.listFormat.listId)) {
                this.listId = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.bidi) && this.bidi !== format.bidi) {
                this.bidi = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.keepLinesTogether) && this.keepLinesTogether !== format.keepLinesTogether) {
                this.keepLinesTogether = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.keepWithNext) && this.keepWithNext !== format.keepWithNext) {
                this.keepWithNext = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.widowControl) && this.widowControl !== format.widowControl) {
                this.widowControl = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.contextualSpacing) && this.contextualSpacing !== format.contextualSpacing) {
                this.contextualSpacing = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.styleName) && format.baseStyle && this.styleName !== format.baseStyle.name) {
                this.styleName = undefined;
            }
            this.borders.combineFormat(format.borders);
        };
        SelectionParagraphFormat.prototype.clearFormat = function () {
            this.leftIndent = 0;
            this.rightIndent = 0;
            this.beforeSpacing = 0;
            this.afterSpacing = 0;
            this.spaceAfterAuto = undefined;
            this.spaceBeforeAuto = undefined;
            this.firstLineIndent = 0;
            this.lineSpacing = 1;
            this.textAlignment = undefined;
            this.lineSpacingType = undefined;
            this.listId = undefined;
            this.listLevelNumber = -1;
            this.styleName = undefined;
            this.bidi = undefined;
            this.contextualSpacing = undefined;
        };
        SelectionParagraphFormat.prototype.getList = function () {
            var list = this.documentHelper.getListById(this.listId);
            if (!ej2_base_1.isNullOrUndefined(list)) {
                var listAdv = new list_1.WList();
                var abstractList = new abstract_list_1.WAbstractList();
                var currentAbstractList = this.documentHelper.getAbstractListById(list.abstractListId);
                var editor = this.selection.owner.editorModule;
                if (!ej2_base_1.isNullOrUndefined(currentAbstractList)) {
                    for (var i = 0; i < currentAbstractList.levels.length; i++) {
                        var level = editor.cloneListLevel(currentAbstractList.levels[i]);
                        abstractList.levels.push(level);
                        level.ownerBase = abstractList;
                    }
                }
                else {
                    abstractList.levels.push(new list_level_1.WListLevel(abstractList));
                }
                if (!ej2_base_1.isNullOrUndefined(list.levelOverrides)) {
                    for (var i = 0; i < list.levelOverrides.length; i++) {
                        var levelOverride = editor.cloneLevelOverride(list.levelOverrides[i]);
                        listAdv.levelOverrides.push(levelOverride);
                    }
                }
                listAdv.abstractList = abstractList;
                listAdv.abstractListId = abstractList.abstractListId;
                listAdv.sourceListId = list.listId;
                return listAdv;
            }
            return undefined;
        };
        SelectionParagraphFormat.prototype.setList = function (listAdv, isListDialog) {
            if ((this.documentHelper.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) || !this.documentHelper.owner.isDocumentLoaded) {
                return;
            }
            var list = this.documentHelper.getListById(this.listId);
            var collection = undefined;
            var currentAbstractList = listAdv ? this.documentHelper.getAbstractListById(listAdv.abstractListId) : undefined;
            if (!ej2_base_1.isNullOrUndefined(list) && !ej2_base_1.isNullOrUndefined(listAdv)
                && !ej2_base_1.isNullOrUndefined(currentAbstractList) && listAdv.sourceListId === list.listId) {
                var history_1 = this.documentHelper.owner.editorHistory;
                var listLevel = this.documentHelper.layout.getListLevel(list, 1);
                this.selection.owner.isLayoutEnabled = false;
                this.documentHelper.owner.editorModule.setOffsetValue(this.selection);
                if (history_1) {
                    collection = history_1.updateListChangesInHistory(currentAbstractList, list);
                }
                this.documentHelper.owner.editorModule.updateListParagraphs();
                if (history_1) {
                    history_1.applyListChanges(this.selection, collection);
                }
                this.selection.owner.isLayoutEnabled = true;
                this.documentHelper.renderedLists.clear();
                this.documentHelper.renderedLevelOverrides = [];
                if (isListDialog) {
                    this.documentHelper.layout.clearInvalidList(listAdv);
                }
                this.documentHelper.owner.editorModule.layoutWholeDocument();
                this.documentHelper.owner.editorModule.updateSelectionTextPosition(false);
                if (history_1 && history_1.currentBaseHistoryInfo) {
                    if (history_1.currentBaseHistoryInfo.modifiedProperties.length > 0) {
                        history_1.currentBaseHistoryInfo.updateSelection();
                    }
                    history_1.updateHistory();
                }
                this.documentHelper.owner.editorModule.fireContentChange();
            }
            else if (!ej2_base_1.isNullOrUndefined(listAdv)) {
                this.selection.owner.isLayoutEnabled = false;
                if (!ej2_base_1.isNullOrUndefined(currentAbstractList) && this.documentHelper.abstractLists.indexOf(currentAbstractList) === -1) {
                    this.documentHelper.abstractLists.push(currentAbstractList);
                }
                if (this.documentHelper.lists.indexOf(listAdv) === -1) {
                    this.documentHelper.lists.push(listAdv);
                }
                this.selection.owner.isLayoutEnabled = true;
                this.selection.owner.editorModule.onApplyList(listAdv);
            }
            else {
                this.selection.owner.editorModule.onApplyList(undefined);
            }
        };
        SelectionParagraphFormat.prototype.destroy = function () {
            this.leftIndentIn = undefined;
            this.rightIndentIn = undefined;
            this.beforeSpacingIn = undefined;
            this.afterSpacingIn = undefined;
            this.spaceBeforeAutoIn = undefined;
            this.spaceAfterAutoIn = undefined;
            this.firstLineIndentIn = undefined;
            this.lineSpacingIn = undefined;
            this.textAlignmentIn = undefined;
            this.lineSpacingTypeIn = undefined;
            this.listId = undefined;
            this.listLevelNumberIn = undefined;
            this.documentHelper = undefined;
            this.selection = undefined;
            this.styleName = undefined;
            this.bidi = undefined;
            this.contextualSpacing = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.bordersIn)) {
                this.bordersIn.destroy();
                this.bordersIn = undefined;
            }
        };
        return SelectionParagraphFormat;
    }());
    exports.SelectionParagraphFormat = SelectionParagraphFormat;
    var SelectionHeaderFooter = (function () {
        function SelectionHeaderFooter(selection) {
            this.linkToPreviousIn = true;
            this.selection = selection;
        }
        Object.defineProperty(SelectionHeaderFooter.prototype, "linkToPrevious", {
            get: function () {
                return this.linkToPreviousIn;
            },
            set: function (value) {
                this.linkToPreviousIn = value;
                this.notifyPropertyChanged('linkToPrevious');
            },
            enumerable: true,
            configurable: true
        });
        SelectionHeaderFooter.prototype.notifyPropertyChanged = function (propertyName) {
            var selection = this.selection;
            if (!ej2_base_1.isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isPastingContent
                || selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded)
                && !selection.isRetrieveFormatting) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(selection) && !ej2_base_1.isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
                var value = this.getPropertyvalue(propertyName);
                if (!ej2_base_1.isNullOrUndefined(value)) {
                    var headerFooterWidget = selection.start.paragraph.bodyWidget;
                    var sectionIndex = headerFooterWidget.sectionIndex;
                    var headerFooterType = headerFooterWidget.headerFooterType;
                    selection.owner.editorModule.removeInlineHeaderFooterWidget(sectionIndex, headerFooterType, propertyName, value);
                }
            }
        };
        SelectionHeaderFooter.prototype.getPropertyvalue = function (propertyName) {
            if (propertyName == "linkToPrevious") {
                if (!ej2_base_1.isNullOrUndefined(this.linkToPrevious)) {
                    return this.linkToPrevious;
                }
            }
            return undefined;
        };
        return SelectionHeaderFooter;
    }());
    exports.SelectionHeaderFooter = SelectionHeaderFooter;
    var SelectionSectionFormat = (function () {
        function SelectionSectionFormat(selection) {
            this.differentFirstPageIn = undefined;
            this.differentOddAndEvenPagesIn = undefined;
            this.bidi = undefined;
            this.selection = selection;
            this.firstPageHeaderIn = new SelectionHeaderFooter(selection);
            this.firstPageFooterIn = new SelectionHeaderFooter(selection);
            this.oddPageHeaderIn = new SelectionHeaderFooter(selection);
            this.oddPageFooterIn = new SelectionHeaderFooter(selection);
            this.evenPageHeaderIn = new SelectionHeaderFooter(selection);
            this.evenPageFooterIn = new SelectionHeaderFooter(selection);
        }
        Object.defineProperty(SelectionSectionFormat.prototype, "pageHeight", {
            get: function () {
                return this.pageHeightIn;
            },
            set: function (value) {
                this.pageHeightIn = value;
                this.notifyPropertyChanged('pageHeight');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "pageWidth", {
            get: function () {
                return this.pageWidthIn;
            },
            set: function (value) {
                this.pageWidthIn = value;
                this.notifyPropertyChanged('pageWidth');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "leftMargin", {
            get: function () {
                return this.leftMarginIn;
            },
            set: function (value) {
                this.leftMarginIn = value;
                this.notifyPropertyChanged('leftMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "bottomMargin", {
            get: function () {
                return this.bottomMarginIn;
            },
            set: function (value) {
                this.bottomMarginIn = value;
                this.notifyPropertyChanged('bottomMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "topMargin", {
            get: function () {
                return this.topMarginIn;
            },
            set: function (value) {
                this.topMarginIn = value;
                this.notifyPropertyChanged('topMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "rightMargin", {
            get: function () {
                return this.rightMarginIn;
            },
            set: function (value) {
                this.rightMarginIn = value;
                this.notifyPropertyChanged('rightMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "headerDistance", {
            get: function () {
                return this.headerDistanceIn;
            },
            set: function (value) {
                this.headerDistanceIn = value;
                this.notifyPropertyChanged('headerDistance');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "firstPageHeader", {
            get: function () {
                return this.firstPageHeaderIn;
            },
            set: function (value) {
                this.firstPageHeaderIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "firstPageFooter", {
            get: function () {
                return this.firstPageFooterIn;
            },
            set: function (value) {
                this.firstPageFooterIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "oddPageHeader", {
            get: function () {
                return this.oddPageHeaderIn;
            },
            set: function (value) {
                this.oddPageHeaderIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "oddPageFooter", {
            get: function () {
                return this.oddPageFooterIn;
            },
            set: function (value) {
                this.oddPageFooterIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "evenPageHeader", {
            get: function () {
                return this.evenPageHeaderIn;
            },
            set: function (value) {
                this.evenPageHeaderIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "evenPageFooter", {
            get: function () {
                return this.evenPageFooterIn;
            },
            set: function (value) {
                this.evenPageFooterIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "pageStartingNumber", {
            get: function () {
                return this.pageStartingNumberIn;
            },
            set: function (value) {
                this.pageStartingNumberIn = value;
                this.notifyPropertyChanged('pageStartingNumber');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "restartPageNumbering", {
            get: function () {
                return this.restartPageNumberingIn;
            },
            set: function (value) {
                this.restartPageNumberingIn = value;
                this.notifyPropertyChanged('restartPageNumbering');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "footerDistance", {
            get: function () {
                return this.footerDistanceIn;
            },
            set: function (value) {
                this.footerDistanceIn = value;
                this.notifyPropertyChanged('footerDistance');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "differentFirstPage", {
            get: function () {
                return this.differentFirstPageIn;
            },
            set: function (value) {
                this.differentFirstPageIn = value;
                this.notifyPropertyChanged('differentFirstPage');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "differentOddAndEvenPages", {
            get: function () {
                return this.differentOddAndEvenPagesIn;
            },
            set: function (value) {
                this.differentOddAndEvenPagesIn = value;
                this.notifyPropertyChanged('differentOddAndEvenPages');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "endnoteNumberFormat", {
            get: function () {
                return this.endnoteNumberFormatIn;
            },
            set: function (value) {
                this.endnoteNumberFormatIn = value;
                this.notifyPropertyChanged('endnoteNumberFormat');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "footNoteNumberFormat", {
            get: function () {
                return this.footNoteNumberFormatIn;
            },
            set: function (value) {
                this.footNoteNumberFormatIn = value;
                this.notifyPropertyChanged('footNoteNumberFormat');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "initialFootNoteNumber", {
            get: function () {
                return this.initialFootNoteNumberIn;
            },
            set: function (value) {
                this.initialFootNoteNumberIn = value;
                this.notifyPropertyChanged('initialFootNoteNumber');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "initialEndNoteNumber", {
            get: function () {
                return this.initialEndNoteNumberIn;
            },
            set: function (value) {
                this.initialEndNoteNumberIn = value;
                this.notifyPropertyChanged('initialEndNoteNumber');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "restartIndexForFootnotes", {
            get: function () {
                return this.restartIndexForFootnotesIn;
            },
            set: function (value) {
                this.restartIndexForFootnotesIn = value;
                this.notifyPropertyChanged('restartIndexForFootnotes');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "restartIndexForEndnotes", {
            get: function () {
                return this.restartIndexForEndnotesIn;
            },
            set: function (value) {
                this.restartIndexForEndnotesIn = value;
                this.notifyPropertyChanged('restartIndexForEndnotes');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "numberOfColumns", {
            get: function () {
                return this.columns.length == 0 ? 1 : this.columns.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "equalWidth", {
            get: function () {
                return this.equalWidthIn;
            },
            set: function (value) {
                this.equalWidthIn = value;
                this.notifyPropertyChanged('equalWidth');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "lineBetweenColumns", {
            get: function () {
                return this.lineBetweenColumnsIn;
            },
            set: function (value) {
                this.lineBetweenColumnsIn = value;
                this.notifyPropertyChanged('lineBetweenColumns');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "columns", {
            get: function () {
                return this.columnsIn;
            },
            set: function (value) {
                this.columnsIn = value;
                var selection = this.selection;
                if (!ej2_base_1.isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isPastingContent
                    || selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded)
                    && !selection.isRetrieveFormatting) {
                    return;
                }
                if (!ej2_base_1.isNullOrUndefined(selection) && !ej2_base_1.isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
                    this.selection.owner.editorModule.onApplyColumnFormat('columns', value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionSectionFormat.prototype, "breakCode", {
            get: function () {
                return this.breakCodeIn;
            },
            set: function (value) {
                this.breakCodeIn = value;
                this.notifyPropertyChanged('breakCode');
            },
            enumerable: true,
            configurable: true
        });
        SelectionSectionFormat.prototype.copyFormat = function (format) {
            this.pageHeight = format.pageHeight;
            this.pageWidth = format.pageWidth;
            this.leftMargin = format.leftMargin;
            this.topMargin = format.topMargin;
            this.rightMargin = format.rightMargin;
            this.bottomMargin = format.bottomMargin;
            this.headerDistance = format.headerDistance;
            this.footerDistance = format.footerDistance;
            this.differentFirstPage = format.differentFirstPage;
            this.differentOddAndEvenPages = format.differentOddAndEvenPages;
            this.bidi = format.bidi;
            this.pageStartingNumber = format.pageStartingNumber;
            this.restartPageNumbering = format.restartPageNumbering;
            this.endnoteNumberFormat = format.endnoteNumberFormat;
            this.footNoteNumberFormat = format.footNoteNumberFormat;
            this.restartIndexForEndnotes = format.restartIndexForEndnotes;
            this.restartIndexForFootnotes = format.restartIndexForFootnotes;
            this.initialEndNoteNumber = format.initialEndNoteNumber;
            this.initialFootNoteNumber = format.initialFootNoteNumber;
            this.equalWidth = format.equalWidth;
            this.lineBetweenColumns = format.lineBetweenColumns;
            this.columns = [];
            for (var _i = 0, _a = format.columns; _i < _a.length; _i++) {
                var col = _a[_i];
                var selectCol = new SelectionColumnFormat(this.selection);
                selectCol.width = index_2.HelperMethods.convertPixelToPoint(col.width);
                selectCol.space = index_2.HelperMethods.convertPixelToPoint(col.space);
                this.columns.push(selectCol);
            }
            this.breakCode = format.breakCode;
            if (this.selection.owner.enableHeaderAndFooter) {
                var headerFootersColletion = this.selection.documentHelper.headersFooters;
                var headerFooterWidget = this.selection.start.paragraph.containerWidget;
                var sectionIndex = headerFooterWidget.sectionIndex;
                var headerFooterType = headerFooterWidget.headerFooterType;
                var isLinkedToPrevious = false;
                if (sectionIndex == 0) {
                    this.oddPageHeader.linkToPrevious = false;
                    this.oddPageFooter.linkToPrevious = false;
                    this.evenPageHeader.linkToPrevious = false;
                    this.evenPageFooter.linkToPrevious = false;
                    this.firstPageHeader.linkToPrevious = false;
                    this.firstPageFooter.linkToPrevious = false;
                }
                else if (headerFootersColletion[sectionIndex]) {
                    var index = this.selection.viewer.getHeaderFooter(headerFooterType);
                    var headerFooterWidget_1 = headerFootersColletion[sectionIndex][index];
                    if (ej2_base_1.isNullOrUndefined(headerFooterWidget_1)) {
                        isLinkedToPrevious = true;
                    }
                    if (!ej2_base_1.isNullOrUndefined(headerFooterWidget_1) || isLinkedToPrevious) {
                        switch (headerFooterType) {
                            case "OddHeader":
                                if (isLinkedToPrevious) {
                                    this.oddPageHeader.linkToPrevious = true;
                                }
                                else {
                                    this.oddPageHeader.linkToPrevious = false;
                                }
                                break;
                            case "OddFooter":
                                if (isLinkedToPrevious) {
                                    this.oddPageFooter.linkToPrevious = true;
                                }
                                else {
                                    this.oddPageFooter.linkToPrevious = false;
                                }
                                break;
                            case "EvenHeader":
                                if (isLinkedToPrevious) {
                                    this.evenPageHeader.linkToPrevious = true;
                                }
                                else {
                                    this.evenPageHeader.linkToPrevious = false;
                                }
                                break;
                            case "EvenFooter":
                                if (isLinkedToPrevious) {
                                    this.evenPageFooter.linkToPrevious = true;
                                }
                                else {
                                    this.evenPageFooter.linkToPrevious = false;
                                }
                                break;
                            case "FirstPageHeader":
                                if (isLinkedToPrevious) {
                                    this.firstPageHeader.linkToPrevious = true;
                                }
                                else {
                                    this.firstPageHeader.linkToPrevious = false;
                                }
                                break;
                            case "FirstPageFooter":
                                if (isLinkedToPrevious) {
                                    this.firstPageFooter.linkToPrevious = true;
                                }
                                else {
                                    this.firstPageFooter.linkToPrevious = false;
                                }
                                break;
                        }
                    }
                }
            }
        };
        SelectionSectionFormat.prototype.applyColumnFormat = function () {
        };
        SelectionSectionFormat.prototype.notifyPropertyChanged = function (propertyName) {
            var selection = this.selection;
            if (!ej2_base_1.isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isPastingContent
                || selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded)
                && !selection.isRetrieveFormatting) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(selection) && !ej2_base_1.isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
                var value = this.getPropertyvalue(propertyName);
                if (!ej2_base_1.isNullOrUndefined(value)) {
                    selection.owner.editorModule.onApplySectionFormat(propertyName, value);
                }
            }
        };
        SelectionSectionFormat.prototype.getPropertyvalue = function (propertyName) {
            switch (propertyName) {
                case 'pageHeight':
                    if (this.pageHeight > 0) {
                        return this.pageHeight;
                    }
                    return undefined;
                case 'pageWidth':
                    if (this.pageWidth > 0) {
                        return this.pageWidth;
                    }
                    return undefined;
                case 'leftMargin':
                    if (this.leftMargin >= 0) {
                        return this.leftMargin;
                    }
                    return undefined;
                case 'rightMargin':
                    if (this.rightMargin >= 0) {
                        return this.rightMargin;
                    }
                    return undefined;
                case 'topMargin':
                    if (this.topMargin >= 0) {
                        return this.topMargin;
                    }
                    return undefined;
                case 'bottomMargin':
                    if (this.bottomMargin >= 0) {
                        return this.bottomMargin;
                    }
                    return undefined;
                case 'differentFirstPage':
                    if (!ej2_base_1.isNullOrUndefined(this.differentFirstPage)) {
                        return this.differentFirstPage;
                    }
                    return undefined;
                case 'differentOddAndEvenPages':
                    if (!ej2_base_1.isNullOrUndefined(this.differentOddAndEvenPages)) {
                        return this.differentOddAndEvenPages;
                    }
                    return undefined;
                case 'headerDistance':
                    return this.headerDistanceIn;
                case 'footerDistance':
                    return this.footerDistance;
                case 'pageStartingNumber':
                    if (!ej2_base_1.isNullOrUndefined(this.pageStartingNumber)) {
                        return this.pageStartingNumber;
                    }
                    return undefined;
                case 'restartPageNumbering':
                    if (!ej2_base_1.isNullOrUndefined(this.restartPageNumbering)) {
                        return this.restartPageNumbering;
                    }
                    return undefined;
                case 'endnoteNumberFormat':
                    return this.endnoteNumberFormatIn;
                case 'restartIndexForEndnotes':
                    return this.restartIndexForEndnotesIn;
                case 'restartIndexForFootnotes':
                    return this.restartIndexForFootnotesIn;
                case 'footNoteNumberFormat':
                    return this.footNoteNumberFormatIn;
                case 'initialFootNoteNumber':
                    return this.initialFootNoteNumber;
                case 'initialEndNoteNumber':
                    return this.initialEndNoteNumber;
                case 'equalWidth':
                    return this.equalWidthIn;
                case 'lineBetweenColumns':
                    return this.lineBetweenColumnsIn;
                case 'columns':
                    return this.columnsIn;
                case 'breakCode':
                    return this.breakCodeIn;
                default:
                    return undefined;
            }
        };
        SelectionSectionFormat.prototype.combineFormat = function (format) {
            if (this.pageHeight > 0 && this.pageHeight !== format.pageHeight) {
                this.pageHeight = 0;
            }
            if (this.pageWidth > 0 && this.pageWidth !== format.pageWidth) {
                this.pageWidth = 0;
            }
            if (this.leftMargin > -1 && this.leftMargin !== format.leftMargin) {
                this.leftMargin = -1;
            }
            if (this.topMargin > -1 && this.topMargin !== format.topMargin) {
                this.topMargin = -1;
            }
            if (this.rightMargin > -1 && this.rightMargin !== format.rightMargin) {
                this.rightMargin = -1;
            }
            if (this.bottomMargin > -1 && this.bottomMargin !== format.bottomMargin) {
                this.bottomMargin = -1;
            }
            if (this.headerDistance !== 0 && this.headerDistance !== format.headerDistance) {
                this.headerDistance = 0;
            }
            if (this.footerDistance !== 0 && this.footerDistance !== format.footerDistance) {
                this.footerDistance = 0;
            }
            if (!ej2_base_1.isNullOrUndefined(this.differentFirstPage) && this.differentFirstPage !== format.differentFirstPage) {
                this.differentFirstPage = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.pageStartingNumber) && this.pageStartingNumber !== format.pageStartingNumber) {
                this.pageStartingNumber = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.restartPageNumbering) && this.restartPageNumbering !== format.restartPageNumbering) {
                this.restartPageNumbering = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.differentOddAndEvenPages) && this.differentOddAndEvenPages !== format.differentOddAndEvenPages) {
                this.differentOddAndEvenPages = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.bidi) && this.bidi !== format.bidi) {
                this.bidi = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.endnoteNumberFormat) && this.endnoteNumberFormat !== format.endnoteNumberFormat) {
                this.endnoteNumberFormat = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.restartIndexForEndnotes) && this.restartIndexForEndnotes !== format.restartIndexForEndnotes) {
                this.restartIndexForEndnotes = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.restartIndexForFootnotes) && this.restartIndexForFootnotes !== format.restartIndexForFootnotes) {
                this.restartIndexForFootnotes = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.footNoteNumberFormat) && this.footNoteNumberFormat !== format.footNoteNumberFormat) {
                this.footNoteNumberFormat = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.initialFootNoteNumber) && this.initialFootNoteNumber !== format.initialFootNoteNumber) {
                this.initialFootNoteNumber = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.initialEndNoteNumber) && this.initialEndNoteNumber !== format.initialEndNoteNumber) {
                this.initialEndNoteNumber = undefined;
            }
        };
        SelectionSectionFormat.prototype.clearFormat = function () {
            this.headerDistance = 0;
            this.footerDistance = 0;
            this.pageHeight = 0;
            this.pageWidth = 0;
            this.leftMargin = -1;
            this.rightMargin = -1;
            this.topMargin = -1;
            this.bottomMargin = -1;
            this.differentFirstPage = undefined;
            this.differentOddAndEvenPages = undefined;
            this.bidi = undefined;
            this.pageStartingNumber = undefined;
            this.restartPageNumbering = undefined;
            this.endnoteNumberFormat = undefined;
            this.footNoteNumberFormat = undefined;
            this.restartIndexForFootnotes = undefined;
            this.restartIndexForEndnotes = undefined;
            this.initialFootNoteNumber = 1;
            this.initialEndNoteNumber = 1;
        };
        SelectionSectionFormat.prototype.destroy = function () {
            this.headerDistanceIn = undefined;
            this.footerDistanceIn = undefined;
            this.pageHeightIn = undefined;
            this.pageWidthIn = undefined;
            this.leftMarginIn = undefined;
            this.rightMarginIn = undefined;
            this.topMarginIn = undefined;
            this.bottomMarginIn = undefined;
            this.differentFirstPageIn = undefined;
            this.differentOddAndEvenPagesIn = undefined;
            this.selection = undefined;
            this.bidi = undefined;
            this.pageStartingNumberIn = undefined;
            this.restartPageNumberingIn = undefined;
            this.endnoteNumberFormatIn = undefined;
            this.footNoteNumberFormatIn = undefined;
            this.restartIndexForFootnotesIn = undefined;
            this.restartIndexForEndnotesIn = undefined;
            this.initialEndNoteNumber = undefined;
            this.initialFootNoteNumber = undefined;
            this.firstPageHeaderIn = undefined;
            this.firstPageFooterIn = undefined;
            this.oddPageHeaderIn = undefined;
            this.oddPageFooterIn = undefined;
            this.evenPageHeaderIn = undefined;
            this.evenPageFooterIn = undefined;
        };
        return SelectionSectionFormat;
    }());
    exports.SelectionSectionFormat = SelectionSectionFormat;
    var SelectionTableFormat = (function () {
        function SelectionTableFormat(selection) {
            this.leftIndentIn = 0;
            this.backgroundIn = undefined;
            this.tableAlignmentIn = undefined;
            this.cellSpacingIn = 0;
            this.leftMarginIn = 0;
            this.rightMarginIn = 0;
            this.topMarginIn = 0;
            this.bottomMarginIn = 0;
            this.preferredWidthIn = 0;
            this.bidiIn = undefined;
            this.selection = selection;
        }
        Object.defineProperty(SelectionTableFormat.prototype, "table", {
            get: function () {
                return this.tableIn;
            },
            set: function (value) {
                this.tableIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "title", {
            get: function () {
                return this.titleIn;
            },
            set: function (value) {
                if (ej2_base_1.isNullOrUndefined(this.table)) {
                    return;
                }
                this.titleIn = value;
                this.notifyPropertyChanged('title');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "description", {
            get: function () {
                return this.descriptionIn;
            },
            set: function (value) {
                if (ej2_base_1.isNullOrUndefined(this.table)) {
                    return;
                }
                this.descriptionIn = value;
                this.notifyPropertyChanged('description');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "leftIndent", {
            get: function () {
                return this.leftIndentIn;
            },
            set: function (value) {
                if (value === this.leftIndentIn) {
                    return;
                }
                this.leftIndentIn = value;
                this.notifyPropertyChanged('leftIndent');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "topMargin", {
            get: function () {
                return this.topMarginIn;
            },
            set: function (value) {
                if (value === this.topMarginIn) {
                    return;
                }
                this.topMarginIn = value;
                this.notifyPropertyChanged('topMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "background", {
            get: function () {
                return this.backgroundIn;
            },
            set: function (value) {
                if (value === this.backgroundIn) {
                    return;
                }
                this.backgroundIn = value;
                this.notifyPropertyChanged('background');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "tableAlignment", {
            get: function () {
                return this.tableAlignmentIn;
            },
            set: function (value) {
                if (value === this.tableAlignmentIn) {
                    return;
                }
                this.tableAlignmentIn = value;
                this.notifyPropertyChanged('tableAlignment');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "leftMargin", {
            get: function () {
                return this.leftMarginIn;
            },
            set: function (value) {
                if (value === this.leftMarginIn) {
                    return;
                }
                this.leftMarginIn = value;
                this.notifyPropertyChanged('leftMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "bottomMargin", {
            get: function () {
                return this.bottomMarginIn;
            },
            set: function (value) {
                if (value === this.bottomMarginIn) {
                    return;
                }
                this.bottomMarginIn = value;
                this.notifyPropertyChanged('bottomMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "cellSpacing", {
            get: function () {
                return this.cellSpacingIn;
            },
            set: function (value) {
                if (value === this.cellSpacingIn) {
                    return;
                }
                this.cellSpacingIn = value;
                this.notifyPropertyChanged('cellSpacing');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "rightMargin", {
            get: function () {
                return this.rightMarginIn;
            },
            set: function (value) {
                if (value === this.rightMarginIn) {
                    return;
                }
                this.rightMarginIn = value;
                this.notifyPropertyChanged('rightMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "preferredWidth", {
            get: function () {
                return this.preferredWidthIn;
            },
            set: function (value) {
                if (value === this.preferredWidthIn) {
                    return;
                }
                this.preferredWidthIn = value;
                this.notifyPropertyChanged('preferredWidth');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "preferredWidthType", {
            get: function () {
                return this.preferredWidthTypeIn;
            },
            set: function (value) {
                if (value === this.preferredWidthTypeIn) {
                    return;
                }
                this.preferredWidthTypeIn = value;
                this.notifyPropertyChanged('preferredWidthType');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionTableFormat.prototype, "bidi", {
            get: function () {
                return this.bidiIn;
            },
            set: function (value) {
                this.bidiIn = value;
                this.notifyPropertyChanged('bidi');
            },
            enumerable: true,
            configurable: true
        });
        SelectionTableFormat.prototype.getPropertyValue = function (propertyName) {
            switch (propertyName) {
                case 'tableAlignment':
                    return this.tableAlignment;
                case 'leftIndent':
                    return this.leftIndent;
                case 'cellSpacing':
                    return this.cellSpacing;
                case 'leftMargin':
                    return this.leftMargin;
                case 'rightMargin':
                    return this.rightMargin;
                case 'topMargin':
                    return this.topMargin;
                case 'bottomMargin':
                    return this.bottomMargin;
                case 'background':
                    var shading = new index_1.WShading();
                    shading.backgroundColor = this.background;
                    return shading;
                case 'preferredWidth':
                    return this.preferredWidth;
                case 'preferredWidthType':
                    return this.preferredWidthType;
                case 'bidi':
                    return this.bidi;
                case 'title':
                    return this.title;
                case 'description':
                    return this.description;
                default:
                    return undefined;
            }
        };
        SelectionTableFormat.prototype.notifyPropertyChanged = function (propertyName) {
            if (!ej2_base_1.isNullOrUndefined(this.selection) && (this.selection.isCleared
                || !this.selection.owner.isDocumentLoaded || this.selection.owner.isReadOnlyMode
                || this.selection.owner.isPastingContent) && !this.selection.isRetrieveFormatting) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(this.selection) && !ej2_base_1.isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
                var value = this.getPropertyValue(propertyName);
                if (propertyName === 'background') {
                    propertyName = 'shading';
                }
                if (!ej2_base_1.isNullOrUndefined(value)) {
                    this.selection.owner.editorModule.onApplyTableFormat(propertyName, value);
                }
            }
        };
        SelectionTableFormat.prototype.copyFormat = function (format) {
            this.leftIndent = format.leftIndent;
            this.background = format.shading.backgroundColor;
            this.tableAlignment = format.tableAlignment;
            this.leftMargin = format.leftMargin;
            this.rightMargin = format.rightMargin;
            this.topMargin = format.topMargin;
            this.bottomMargin = format.bottomMargin;
            this.cellSpacing = format.cellSpacing;
            this.preferredWidth = format.preferredWidth;
            this.preferredWidthType = format.preferredWidthType;
            this.bidi = format.bidi;
            this.title = format.title;
            this.description = format.description;
        };
        SelectionTableFormat.prototype.clearFormat = function () {
            this.table = undefined;
            this.leftIndent = 0;
            this.background = undefined;
            this.leftIndent = 0;
            this.leftMargin = 0;
            this.rightMargin = 0;
            this.topMargin = 0;
            this.bottomMargin = 0;
            this.cellSpacing = 0;
            this.tableAlignment = undefined;
            this.bidi = undefined;
        };
        SelectionTableFormat.prototype.destroy = function () {
            this.leftIndentIn = undefined;
            this.backgroundIn = undefined;
            this.leftIndentIn = undefined;
            this.leftMarginIn = undefined;
            this.rightMarginIn = undefined;
            this.topMarginIn = undefined;
            this.bottomMarginIn = undefined;
            this.cellSpacingIn = undefined;
            this.tableAlignmentIn = undefined;
            this.tableIn = undefined;
            this.selection = undefined;
            this.bidi = undefined;
        };
        return SelectionTableFormat;
    }());
    exports.SelectionTableFormat = SelectionTableFormat;
    var SelectionCellFormat = (function () {
        function SelectionCellFormat(selection) {
            this.verticalAlignmentIn = undefined;
            this.leftMarginIn = 0;
            this.rightMarginIn = 0;
            this.topMarginIn = 0;
            this.bottomMarginIn = 0;
            this.backgroundIn = undefined;
            this.preferredWidthTypeIn = undefined;
            this.selection = selection;
        }
        Object.defineProperty(SelectionCellFormat.prototype, "verticalAlignment", {
            get: function () {
                return this.verticalAlignmentIn;
            },
            set: function (value) {
                if (value === this.verticalAlignmentIn) {
                    return;
                }
                this.verticalAlignmentIn = value;
                this.notifyPropertyChanged('verticalAlignment');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCellFormat.prototype, "leftMargin", {
            get: function () {
                return this.leftMarginIn;
            },
            set: function (value) {
                if (value === this.leftMarginIn) {
                    return;
                }
                this.leftMarginIn = value;
                this.notifyPropertyChanged('leftMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCellFormat.prototype, "rightMargin", {
            get: function () {
                return this.rightMarginIn;
            },
            set: function (value) {
                if (value === this.rightMarginIn) {
                    return;
                }
                this.rightMarginIn = value;
                this.notifyPropertyChanged('rightMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCellFormat.prototype, "topMargin", {
            get: function () {
                return this.topMarginIn;
            },
            set: function (value) {
                if (value === this.topMarginIn) {
                    return;
                }
                this.topMarginIn = value;
                this.notifyPropertyChanged('topMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCellFormat.prototype, "bottomMargin", {
            get: function () {
                return this.bottomMarginIn;
            },
            set: function (value) {
                if (value === this.bottomMarginIn) {
                    return;
                }
                this.bottomMarginIn = value;
                this.notifyPropertyChanged('bottomMargin');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCellFormat.prototype, "background", {
            get: function () {
                return this.backgroundIn;
            },
            set: function (value) {
                if (value === this.backgroundIn) {
                    return;
                }
                this.backgroundIn = value;
                this.notifyPropertyChanged('background');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCellFormat.prototype, "preferredWidthType", {
            get: function () {
                return this.preferredWidthTypeIn;
            },
            set: function (value) {
                if (value === this.preferredWidthTypeIn) {
                    return;
                }
                this.preferredWidthTypeIn = value;
                this.notifyPropertyChanged('preferredWidthType');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionCellFormat.prototype, "preferredWidth", {
            get: function () {
                return this.preferredWidthIn;
            },
            set: function (value) {
                if (value === this.preferredWidthIn) {
                    return;
                }
                this.preferredWidthIn = value;
                this.notifyPropertyChanged('preferredWidth');
            },
            enumerable: true,
            configurable: true
        });
        SelectionCellFormat.prototype.notifyPropertyChanged = function (propertyName) {
            var selection = this.selection;
            if (!ej2_base_1.isNullOrUndefined(selection)) {
                if ((selection.isCleared || !selection.owner.isDocumentLoaded
                    || selection.owner.isReadOnlyMode || selection.owner.isPastingContent) && !selection.isRetrieveFormatting) {
                    return;
                }
                if (!ej2_base_1.isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
                    var value = this.getPropertyValue(propertyName);
                    if (propertyName === 'background') {
                        propertyName = 'shading';
                    }
                    if (!ej2_base_1.isNullOrUndefined(value)) {
                        this.selection.owner.editorModule.onApplyTableCellFormat(propertyName, value);
                    }
                }
            }
        };
        SelectionCellFormat.prototype.getPropertyValue = function (propertyName) {
            switch (propertyName) {
                case 'verticalAlignment':
                    return this.verticalAlignment;
                case 'leftMargin':
                    return this.leftMargin;
                case 'rightMargin':
                    return this.rightMargin;
                case 'topMargin':
                    return this.topMargin;
                case 'bottomMargin':
                    return this.bottomMargin;
                case 'preferredWidth':
                    return this.preferredWidth;
                case 'preferredWidthType':
                    return this.preferredWidthType;
                case 'background':
                    var shading = new index_1.WShading();
                    shading.backgroundColor = this.background;
                    return shading;
                default:
                    return undefined;
            }
        };
        SelectionCellFormat.prototype.copyFormat = function (format) {
            this.leftMargin = format.leftMargin;
            this.rightMargin = format.rightMargin;
            this.topMargin = format.topMargin;
            this.bottomMargin = format.bottomMargin;
            this.background = format.shading.backgroundColor;
            this.verticalAlignment = format.verticalAlignment;
            this.preferredWidth = format.preferredWidth;
            this.preferredWidthType = format.preferredWidthType;
        };
        SelectionCellFormat.prototype.clearCellFormat = function () {
            this.leftMargin = undefined;
            this.rightMargin = undefined;
            this.topMargin = undefined;
            this.bottomMargin = undefined;
            this.background = undefined;
            this.verticalAlignment = undefined;
        };
        SelectionCellFormat.prototype.combineFormat = function (format) {
            if (!ej2_base_1.isNullOrUndefined(this.leftMargin) && this.leftMargin !== format.leftMargin) {
                this.leftMargin = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.topMargin) && this.topMargin !== format.topMargin) {
                this.topMargin = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightMargin) && this.rightMargin !== format.rightMargin) {
                this.rightMargin = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomMargin) && this.bottomMargin !== format.bottomMargin) {
                this.bottomMargin = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.background) && this.background !== format.shading.backgroundColor) {
                this.background = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.verticalAlignment) && this.verticalAlignment !== format.verticalAlignment) {
                this.verticalAlignment = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.preferredWidth) && this.preferredWidth !== format.preferredWidth) {
                this.preferredWidth = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.preferredWidthType) && this.preferredWidthType !== format.preferredWidthType) {
                this.preferredWidthType = undefined;
            }
        };
        SelectionCellFormat.prototype.clearFormat = function () {
            this.background = undefined;
            this.bottomMargin = 0;
            this.leftMargin = 0;
            this.rightMargin = 0;
            this.topMargin = 0;
            this.verticalAlignment = undefined;
        };
        SelectionCellFormat.prototype.destroy = function () {
            this.backgroundIn = undefined;
            this.verticalAlignmentIn = undefined;
            this.bottomMarginIn = undefined;
            this.leftMarginIn = undefined;
            this.rightMarginIn = undefined;
            this.topMarginIn = undefined;
            this.selection = undefined;
        };
        return SelectionCellFormat;
    }());
    exports.SelectionCellFormat = SelectionCellFormat;
    var SelectionRowFormat = (function () {
        function SelectionRowFormat(selection) {
            this.heightIn = undefined;
            this.heightTypeIn = undefined;
            this.isHeaderIn = undefined;
            this.allowRowBreakAcrossPagesIn = undefined;
            this.selection = selection;
        }
        Object.defineProperty(SelectionRowFormat.prototype, "height", {
            get: function () {
                return this.heightIn;
            },
            set: function (value) {
                if (value === this.heightIn) {
                    return;
                }
                this.heightIn = value;
                this.notifyPropertyChanged('height');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionRowFormat.prototype, "heightType", {
            get: function () {
                return this.heightTypeIn;
            },
            set: function (value) {
                if (value === this.heightTypeIn) {
                    return;
                }
                this.heightTypeIn = value;
                this.notifyPropertyChanged('heightType');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionRowFormat.prototype, "isHeader", {
            get: function () {
                return this.isHeaderIn;
            },
            set: function (value) {
                if (value === this.isHeaderIn) {
                    return;
                }
                this.isHeaderIn = value;
                this.notifyPropertyChanged('isHeader');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionRowFormat.prototype, "allowBreakAcrossPages", {
            get: function () {
                return this.allowRowBreakAcrossPagesIn;
            },
            set: function (value) {
                if (value === this.allowRowBreakAcrossPagesIn) {
                    return;
                }
                this.allowRowBreakAcrossPagesIn = value;
                this.notifyPropertyChanged('allowBreakAcrossPages');
            },
            enumerable: true,
            configurable: true
        });
        SelectionRowFormat.prototype.notifyPropertyChanged = function (propertyName) {
            var selection = this.selection;
            if (!ej2_base_1.isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isReadOnlyMode
                || !selection.owner.isDocumentLoaded || selection.owner.isPastingContent) && !selection.isRetrieveFormatting) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(selection) && !ej2_base_1.isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
                var value = this.getPropertyValue(propertyName);
                if (!ej2_base_1.isNullOrUndefined(value)) {
                    selection.owner.editorModule.onApplyTableRowFormat(propertyName, value);
                }
            }
        };
        SelectionRowFormat.prototype.getPropertyValue = function (propertyName) {
            switch (propertyName) {
                case 'height':
                    return this.height;
                case 'heightType':
                    return this.heightType;
                case 'isHeader':
                    return this.isHeader;
                case 'allowBreakAcrossPages':
                    return this.allowBreakAcrossPages;
                default:
                    return undefined;
            }
        };
        SelectionRowFormat.prototype.copyFormat = function (format) {
            this.height = format.height;
            this.heightType = format.heightType;
            this.allowBreakAcrossPages = format.allowBreakAcrossPages;
            this.isHeader = format.isHeader;
        };
        SelectionRowFormat.prototype.combineFormat = function (format) {
            if (!ej2_base_1.isNullOrUndefined(this.height) && this.height !== format.height) {
                this.height = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.heightType) && this.heightType !== format.heightType) {
                this.heightType = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.allowBreakAcrossPages) && this.allowBreakAcrossPages !== format.allowBreakAcrossPages) {
                this.allowBreakAcrossPages = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.isHeader) && this.isHeader !== format.isHeader) {
                this.isHeader = undefined;
            }
        };
        SelectionRowFormat.prototype.clearRowFormat = function () {
            this.height = undefined;
            this.heightType = undefined;
            this.allowBreakAcrossPages = undefined;
            this.isHeader = undefined;
        };
        SelectionRowFormat.prototype.clearFormat = function () {
            this.height = 0;
            this.heightType = undefined;
            this.allowBreakAcrossPages = undefined;
            this.isHeader = undefined;
        };
        SelectionRowFormat.prototype.destroy = function () {
            this.heightIn = undefined;
            this.heightTypeIn = undefined;
            this.allowRowBreakAcrossPagesIn = undefined;
            this.isHeaderIn = undefined;
            this.selection = undefined;
        };
        return SelectionRowFormat;
    }());
    exports.SelectionRowFormat = SelectionRowFormat;
    var SelectionImageFormat = (function () {
        function SelectionImageFormat(selection) {
            this.selection = selection;
        }
        Object.defineProperty(SelectionImageFormat.prototype, "width", {
            get: function () {
                if (this.image) {
                    return this.image.width;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionImageFormat.prototype, "height", {
            get: function () {
                if (this.image) {
                    return this.image.height;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionImageFormat.prototype, "alternateText", {
            get: function () {
                if (this.image) {
                    return this.image.alternateText;
                }
                return null;
            },
            set: function (value) {
                if (value === this.alternateText) {
                    return;
                }
                this.image.alternateText = value;
            },
            enumerable: true,
            configurable: true
        });
        SelectionImageFormat.prototype.resize = function (width, height) {
            this.updateImageFormat(width, height, this.alternateText);
        };
        SelectionImageFormat.prototype.applyImageAlternativeText = function (alternateText) {
            this.updateImageFormat(this.width, this.height, alternateText);
        };
        SelectionImageFormat.prototype.updateImageFormat = function (width, height, alternateText) {
            if (this.image) {
                if (this.selection.owner.editorModule) {
                    this.selection.owner.editorModule.onImageFormat(this.image, width, height, alternateText);
                }
            }
        };
        SelectionImageFormat.prototype.copyImageFormat = function (image) {
            this.image = image;
        };
        SelectionImageFormat.prototype.clearImageFormat = function () {
            this.image = undefined;
        };
        return SelectionImageFormat;
    }());
    exports.SelectionImageFormat = SelectionImageFormat;
    var SelectionColumnFormat = (function () {
        function SelectionColumnFormat(selection) {
            this.widthIn = 0;
            this.spaceIn = 0;
            this.selection = selection;
        }
        SelectionColumnFormat.prototype.copyFormat = function (format) {
            this.width = format.width;
            this.space = format.space;
        };
        Object.defineProperty(SelectionColumnFormat.prototype, "width", {
            get: function () {
                return this.widthIn;
            },
            set: function (value) {
                if (value === this.widthIn) {
                    return;
                }
                this.widthIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectionColumnFormat.prototype, "space", {
            get: function () {
                return this.spaceIn;
            },
            set: function (value) {
                if (value === this.spaceIn) {
                    return;
                }
                this.spaceIn = value;
            },
            enumerable: true,
            configurable: true
        });
        SelectionColumnFormat.prototype.getPropertyValue = function (property) {
            switch (property) {
                case 'space':
                    return this.space;
                case 'width':
                    return this.width;
                default:
                    return undefined;
            }
        };
        SelectionColumnFormat.prototype.notifyPropertyChanged = function (propertyName) {
            var selection = this.selection;
            if (!ej2_base_1.isNullOrUndefined(selection)) {
                this.selection.owner.editorModule.onApplyColumnFormat('columns', this.selection.sectionFormat.columns);
            }
        };
        SelectionColumnFormat.prototype.clearFormat = function () {
            this.widthIn = 0;
            this.spaceIn = 0;
        };
        SelectionColumnFormat.prototype.destroy = function () {
            this.widthIn = undefined;
            this.spaceIn = undefined;
        };
        return SelectionColumnFormat;
    }());
    exports.SelectionColumnFormat = SelectionColumnFormat;
});
