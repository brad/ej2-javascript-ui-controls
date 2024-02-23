define(["require", "exports", "@syncfusion/ej2-base", "../../base/dictionary", "./borders", "../../base/unique-format", "../../base/unique-formats", "./list-format", "../viewer/page", "./style"], function (require, exports, ej2_base_1, dictionary_1, borders_1, unique_format_1, unique_formats_1, list_format_1, page_1, style_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WTabStop = (function () {
        function WTabStop() {
        }
        Object.defineProperty(WTabStop.prototype, "position", {
            get: function () {
                return this.positionIn;
            },
            set: function (value) {
                this.positionIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WTabStop.prototype, "deletePosition", {
            get: function () {
                return this.deletePositionIn;
            },
            set: function (value) {
                this.deletePositionIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WTabStop.prototype, "tabJustification", {
            get: function () {
                return this.justification;
            },
            set: function (value) {
                this.justification = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WTabStop.prototype, "tabLeader", {
            get: function () {
                return this.leader;
            },
            set: function (value) {
                this.leader = value;
            },
            enumerable: true,
            configurable: true
        });
        WTabStop.prototype.clone = function () {
            var tabStop = new WTabStop();
            tabStop.deletePosition = this.deletePosition;
            tabStop.position = this.position;
            tabStop.tabJustification = this.tabJustification;
            tabStop.tabLeader = this.tabLeader;
            return tabStop;
        };
        WTabStop.prototype.equals = function (tab) {
            if (this.position === tab.position &&
                this.deletePosition === tab.deletePosition &&
                this.tabJustification === tab.tabJustification &&
                this.tabLeader === tab.tabLeader) {
                return true;
            }
            else {
                return false;
            }
        };
        WTabStop.prototype.destroy = function () {
            this.position = undefined;
            this.deletePosition = undefined;
            this.tabJustification = undefined;
            this.leader = undefined;
        };
        return WTabStop;
    }());
    exports.WTabStop = WTabStop;
    var WParagraphFormat = (function () {
        function WParagraphFormat(node) {
            this.uniqueParagraphFormat = undefined;
            this.ownerBase = undefined;
            this.baseStyle = undefined;
            this.tabs = undefined;
            this.ownerBase = node;
            this.listFormat = new list_format_1.WListFormat(this);
            this.borders = new borders_1.WBorders(this);
            this.tabs = [];
        }
        WParagraphFormat.prototype.getUpdatedTabs = function () {
            var inTabs = [];
            var tabStops = new dictionary_1.Dictionary();
            var tabsInListFormat = this.getTabStopsFromListFormat();
            for (var _i = 0, tabsInListFormat_1 = tabsInListFormat; _i < tabsInListFormat_1.length; _i++) {
                var tabStop = tabsInListFormat_1[_i];
                if (!tabStops.containsKey(tabStop.position)) {
                    tabStops.add(tabStop.position, tabStop);
                }
            }
            if (!ej2_base_1.isNullOrUndefined(this.baseStyle) && this.baseStyle instanceof style_1.WParagraphStyle) {
                var baseStyle = this.baseStyle;
                while (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                    for (var _a = 0, _b = baseStyle.paragraphFormat.tabs; _a < _b.length; _a++) {
                        var tab = _b[_a];
                        if (!tabStops.containsKey(tab.position)) {
                            tabStops.add(tab.position, tab);
                        }
                    }
                    baseStyle = baseStyle.basedOn;
                }
                for (var _c = 0, _d = tabStops.keys; _c < _d.length; _c++) {
                    var key = _d[_c];
                    if (!this.hasTabStop(parseFloat(key.toFixed(4)))) {
                        inTabs.push(tabStops.get(key));
                    }
                }
            }
            inTabs = inTabs.concat(this.tabs.filter(function (a) { return (a.position !== 0 && a.deletePosition === 0); }));
            inTabs = inTabs.sort(function (a, b) { return a.position - b.position; });
            return inTabs;
        };
        WParagraphFormat.prototype.getTabStopsFromListFormat = function () {
            if (this.listFormat.listId > -1 && this.listFormat.listLevelNumber > -1) {
                var level = this.listFormat.listLevel;
                if (level && level.paragraphFormat) {
                    return level.paragraphFormat.tabs;
                }
            }
            return [];
        };
        WParagraphFormat.prototype.hasTabStop = function (position) {
            for (var i = 0; i < this.tabs.length; i++) {
                if (parseFloat(this.tabs[i].position.toFixed(4)) === position ||
                    parseFloat(this.tabs[i].deletePosition.toFixed(4)) === position) {
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(WParagraphFormat.prototype, "leftIndent", {
            get: function () {
                return this.getPropertyValue('leftIndent');
            },
            set: function (value) {
                this.setPropertyValue('leftIndent', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "rightIndent", {
            get: function () {
                return this.getPropertyValue('rightIndent');
            },
            set: function (value) {
                this.setPropertyValue('rightIndent', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "firstLineIndent", {
            get: function () {
                return this.getPropertyValue('firstLineIndent');
            },
            set: function (value) {
                this.setPropertyValue('firstLineIndent', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "beforeSpacing", {
            get: function () {
                return this.getPropertyValue('beforeSpacing');
            },
            set: function (value) {
                this.setPropertyValue('beforeSpacing', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "afterSpacing", {
            get: function () {
                return this.getPropertyValue('afterSpacing');
            },
            set: function (value) {
                this.setPropertyValue('afterSpacing', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "spaceBeforeAuto", {
            get: function () {
                return this.getPropertyValue('spaceBeforeAuto');
            },
            set: function (value) {
                this.setPropertyValue('spaceBeforeAuto', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "spaceAfterAuto", {
            get: function () {
                return this.getPropertyValue('spaceAfterAuto');
            },
            set: function (value) {
                this.setPropertyValue('spaceAfterAuto', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "lineSpacing", {
            get: function () {
                return this.getPropertyValue('lineSpacing');
            },
            set: function (value) {
                this.setPropertyValue('lineSpacing', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "lineSpacingType", {
            get: function () {
                return this.getPropertyValue('lineSpacingType');
            },
            set: function (value) {
                this.setPropertyValue('lineSpacingType', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "textAlignment", {
            get: function () {
                var value = this.getPropertyValue('textAlignment');
                if (this.bidi) {
                    if (value === 'Left') {
                        value = 'Right';
                    }
                    else if (value === 'Right') {
                        value = 'Left';
                    }
                }
                return value;
            },
            set: function (value) {
                this.setPropertyValue('textAlignment', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "keepWithNext", {
            get: function () {
                return this.getPropertyValue('keepWithNext');
            },
            set: function (value) {
                this.setPropertyValue('keepWithNext', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "keepLinesTogether", {
            get: function () {
                return this.getPropertyValue('keepLinesTogether');
            },
            set: function (value) {
                this.setPropertyValue('keepLinesTogether', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "widowControl", {
            get: function () {
                return this.getPropertyValue('widowControl');
            },
            set: function (value) {
                this.setPropertyValue('widowControl', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "outlineLevel", {
            get: function () {
                return this.getPropertyValue('outlineLevel');
            },
            set: function (value) {
                this.setPropertyValue('outlineLevel', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "bidi", {
            get: function () {
                return this.getPropertyValue('bidi');
            },
            set: function (value) {
                this.setPropertyValue('bidi', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WParagraphFormat.prototype, "contextualSpacing", {
            get: function () {
                return this.getPropertyValue('contextualSpacing');
            },
            set: function (value) {
                this.setPropertyValue('contextualSpacing', value);
            },
            enumerable: true,
            configurable: true
        });
        WParagraphFormat.prototype.getListFormatParagraphFormat = function (property) {
            var paragraphFormat = this.getListPargaraphFormat(property);
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat)) {
                return paragraphFormat.uniqueParagraphFormat.propertiesHash.get(unique_format_1.WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property));
            }
            return undefined;
        };
        WParagraphFormat.prototype.getListPargaraphFormat = function (property) {
            if (this.listFormat.listId > -1 && this.listFormat.listLevelNumber > -1) {
                var level = this.listFormat.listLevel;
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
                if (!ej2_base_1.isNullOrUndefined(level) && !ej2_base_1.isNullOrUndefined(level.paragraphFormat.uniqueParagraphFormat) &&
                    level.paragraphFormat.uniqueParagraphFormat.propertiesHash.containsKey(propertyType)) {
                    return level.paragraphFormat;
                }
                else {
                    return undefined;
                }
            }
            else if (this.listFormat.hasValue('listId') && this.listFormat.listId === -1
                && (property === 'leftIndent' || property === 'firstLineIndent')) {
                var paraFormat = new WParagraphFormat();
                if (!this.hasValue('leftIndent')) {
                    paraFormat.leftIndent = 0;
                }
                if (!this.hasValue('firstLineIndent')) {
                    paraFormat.firstLineIndent = 0;
                }
                return paraFormat;
            }
            return undefined;
        };
        WParagraphFormat.prototype.getPropertyValue = function (property) {
            if (!this.hasValue(property)) {
                var formatInList = this.getListFormatParagraphFormat(property);
                if (this.baseStyle instanceof style_1.WParagraphStyle) {
                    var currentFormat = this;
                    var baseStyle = this.baseStyle;
                    while (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                        var listParaFormat = void 0;
                        if (!this.listFormat.hasValue('listId')) {
                            listParaFormat = baseStyle.paragraphFormat.getListPargaraphFormat(property);
                        }
                        if (baseStyle.paragraphFormat.hasValue(property)) {
                            currentFormat = baseStyle.paragraphFormat;
                            break;
                        }
                        else if (!ej2_base_1.isNullOrUndefined(listParaFormat) && listParaFormat.hasValue(property)) {
                            currentFormat = listParaFormat;
                            break;
                        }
                        else {
                            baseStyle = baseStyle.basedOn;
                        }
                    }
                    if (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                        if (!ej2_base_1.isNullOrUndefined(formatInList) && this.listFormat.hasValue('listId')
                            && currentFormat.listFormat.listId === -1 && currentFormat.listFormat.listLevelNumber <= 1
                            || !ej2_base_1.isNullOrUndefined(formatInList) && this.listFormat.listId !== currentFormat.listFormat.listId
                                && currentFormat.listFormat.listLevelNumber <= 1) {
                            return formatInList;
                        }
                        var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
                        return currentFormat.uniqueParagraphFormat.propertiesHash.get(propertyType);
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(formatInList)) {
                    return formatInList;
                }
            }
            else {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
                if (!ej2_base_1.isNullOrUndefined(this.uniqueParagraphFormat) && this.uniqueParagraphFormat.propertiesHash.containsKey(propertyType)) {
                    return this.uniqueParagraphFormat.propertiesHash.get(propertyType);
                }
            }
            return this.getDefaultValue(property);
        };
        WParagraphFormat.prototype.getDefaultValue = function (property) {
            var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
            var docParagraphFormat = this.getDocumentParagraphFormat();
            var isInsideBodyWidget = true;
            if (this.ownerBase && this.ownerBase instanceof page_1.ParagraphWidget) {
                isInsideBodyWidget = this.ownerBase.containerWidget instanceof page_1.BlockContainer || this.ownerBase.containerWidget instanceof page_1.TextFrame ||
                    this.ownerBase.containerWidget instanceof page_1.TableCellWidget;
            }
            var isPaste = !ej2_base_1.isNullOrUndefined(this.ownerBase) && !ej2_base_1.isNullOrUndefined(this.ownerBase.bodyWidget)
                && this.ownerBase.bodyWidget.page && !ej2_base_1.isNullOrUndefined(this.ownerBase.bodyWidget.page.documentHelper) && this.ownerBase.bodyWidget.page.documentHelper.owner.editor
                && this.ownerBase.bodyWidget.page.documentHelper.owner.editor.isPaste;
            if (isInsideBodyWidget && !isPaste
                && !ej2_base_1.isNullOrUndefined(docParagraphFormat) && !ej2_base_1.isNullOrUndefined(docParagraphFormat.uniqueParagraphFormat)) {
                var propValue = docParagraphFormat.uniqueParagraphFormat.propertiesHash.get(propertyType);
                if (!ej2_base_1.isNullOrUndefined(propValue)) {
                    return propValue;
                }
            }
            return WParagraphFormat.getPropertyDefaultValue(property);
        };
        WParagraphFormat.prototype.getDocumentParagraphFormat = function () {
            var docParagraphFormat;
            if (!ej2_base_1.isNullOrUndefined(this.ownerBase)) {
                var documentHelper = this.getDocumentHelperObject();
                if (!ej2_base_1.isNullOrUndefined(documentHelper)) {
                    docParagraphFormat = documentHelper.paragraphFormat;
                }
            }
            return docParagraphFormat;
        };
        WParagraphFormat.prototype.getDocumentHelperObject = function () {
            var documentHelper;
            if (this.ownerBase instanceof page_1.ParagraphWidget) {
                var bodyWidget = this.ownerBase.bodyWidget;
                if (!ej2_base_1.isNullOrUndefined(bodyWidget) && !ej2_base_1.isNullOrUndefined(bodyWidget.page) && !ej2_base_1.isNullOrUndefined(bodyWidget.page.documentHelper)) {
                    documentHelper = bodyWidget.page.documentHelper;
                }
            }
            return documentHelper;
        };
        WParagraphFormat.prototype.setPropertyValue = function (property, value, clearProperty) {
            if (ej2_base_1.isNullOrUndefined(value) || value === '' && !clearProperty) {
                value = WParagraphFormat.getPropertyDefaultValue(property);
            }
            if (ej2_base_1.isNullOrUndefined(this.uniqueParagraphFormat)) {
                this.initializeUniqueParagraphFormat(property, value);
            }
            else {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueParagraphFormat.uniqueFormatType, property);
                if (this.uniqueParagraphFormat.propertiesHash.containsKey(propertyType) &&
                    this.uniqueParagraphFormat.propertiesHash.get(propertyType) === value) {
                    return;
                }
                this.uniqueParagraphFormat = WParagraphFormat.uniqueParagraphFormats.updateUniqueFormat(this.uniqueParagraphFormat, property, value);
            }
        };
        WParagraphFormat.prototype.initializeUniqueParagraphFormat = function (property, propValue) {
            var uniqueParaFormatTemp = new dictionary_1.Dictionary();
            this.addUniqueParaFormat('leftIndent', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('rightIndent', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('firstLineIndent', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('textAlignment', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('beforeSpacing', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('afterSpacing', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('spaceBeforeAuto', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('spaceAfterAuto', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('lineSpacing', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('lineSpacingType', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('outlineLevel', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('bidi', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('contextualSpacing', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('keepWithNext', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('keepLinesTogether', property, propValue, uniqueParaFormatTemp);
            this.addUniqueParaFormat('widowControl', property, propValue, uniqueParaFormatTemp);
            this.uniqueParagraphFormat = WParagraphFormat.uniqueParagraphFormats.addUniqueFormat(uniqueParaFormatTemp, WParagraphFormat.uniqueFormatType);
        };
        WParagraphFormat.prototype.addUniqueParaFormat = function (property, modifiedProperty, propValue, uniqueParaFormatTemp) {
            var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WParagraphFormat.uniqueFormatType, property);
            if (property === modifiedProperty) {
                uniqueParaFormatTemp.add(propertyType, propValue);
            }
        };
        WParagraphFormat.getPropertyDefaultValue = function (property) {
            var value = undefined;
            switch (property) {
                case 'leftIndent':
                    value = 0;
                    break;
                case 'rightIndent':
                    value = 0;
                    break;
                case 'firstLineIndent':
                    value = 0;
                    break;
                case 'textAlignment':
                    value = 'Left';
                    break;
                case 'beforeSpacing':
                    value = 0;
                    break;
                case 'afterSpacing':
                    value = 0;
                    break;
                case 'spaceBeforeAuto':
                    value = false;
                    break;
                case 'spaceAfterAuto':
                    value = false;
                    break;
                case 'lineSpacing':
                    value = 1;
                    break;
                case 'lineSpacingType':
                    value = 'Multiple';
                    break;
                case 'styleName':
                    value = 'Normal';
                    break;
                case 'outlineLevel':
                    value = 'BodyText';
                    break;
                case 'bidi':
                    value = false;
                    break;
                case 'contextualSpacing':
                    value = false;
                    break;
                case 'keepWithNext':
                    value = false;
                    break;
                case 'keepLinesTogether':
                    value = false;
                    break;
                case 'widowControl':
                    value = true;
                    break;
            }
            return value;
        };
        WParagraphFormat.prototype.clearIndent = function () {
            this.clearPropertyValue('leftIndent');
            this.clearPropertyValue('firstLineIndent');
        };
        WParagraphFormat.prototype.clearPropertyValue = function (property) {
            this.setPropertyValue(property, undefined, true);
            if (!ej2_base_1.isNullOrUndefined(this.uniqueParagraphFormat)) {
                var key = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueParagraphFormat.uniqueFormatType, property);
                if (this.uniqueParagraphFormat.propertiesHash.containsKey(key)) {
                    this.uniqueParagraphFormat.propertiesHash.remove(key);
                }
            }
        };
        WParagraphFormat.prototype.clearFormat = function () {
            if (!ej2_base_1.isNullOrUndefined(this.listFormat)) {
                this.listFormat.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.borders)) {
                this.borders.clearFormat();
            }
            if (!ej2_base_1.isNullOrUndefined(this.uniqueParagraphFormat) && this.uniqueParagraphFormat.referenceCount === 0) {
                WParagraphFormat.uniqueParagraphFormats.remove(this.uniqueParagraphFormat);
            }
            this.uniqueParagraphFormat = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.getDocumentHelperObject())) {
                this.baseStyle = this.getDocumentHelperObject().styles.findByName('Normal');
            }
        };
        WParagraphFormat.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueParagraphFormat)) {
                WParagraphFormat.uniqueParagraphFormats.remove(this.uniqueParagraphFormat);
            }
            this.uniqueParagraphFormat = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.listFormat)) {
                this.listFormat.destroy();
            }
            this.listFormat = undefined;
            if (this.tabs && this.tabs.length > 0) {
                for (var i = 0; i < this.tabs.length; i++) {
                    this.tabs[i].destroy();
                }
                this.tabs = [];
                this.tabs = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.borders)) {
                this.borders.destroy();
            }
            this.borders = undefined;
            this.baseStyle = undefined;
            this.ownerBase = undefined;
        };
        WParagraphFormat.prototype.copyFormat = function (format) {
            if (!ej2_base_1.isNullOrUndefined(format)) {
                if (!ej2_base_1.isNullOrUndefined(format.uniqueParagraphFormat)) {
                    this.updateUniqueParagraphFormat(format);
                }
                if (!ej2_base_1.isNullOrUndefined(format.borders)) {
                    this.borders.copyFormat(format.borders);
                }
                if (!ej2_base_1.isNullOrUndefined(format.listFormat)) {
                    this.listFormat.copyFormat(format.listFormat);
                }
                if (!ej2_base_1.isNullOrUndefined(format.baseStyle)) {
                    this.baseStyle = format.baseStyle;
                }
                if (!ej2_base_1.isNullOrUndefined(format.tabs)) {
                    for (var i = 0; i < format.tabs.length; i++) {
                        this.tabs[i] = format.tabs[i];
                    }
                }
            }
        };
        WParagraphFormat.prototype.updateUniqueParagraphFormat = function (format) {
            var hash = undefined;
            if (this.uniqueParagraphFormat) {
                hash = this.uniqueParagraphFormat.mergeProperties(format.uniqueParagraphFormat);
                if (this.uniqueParagraphFormat.referenceCount === 0) {
                    WParagraphFormat.uniqueParagraphFormats.remove(this.uniqueParagraphFormat);
                    this.uniqueParagraphFormat = undefined;
                }
            }
            this.uniqueParagraphFormat = new unique_format_1.WUniqueFormat(WParagraphFormat.uniqueFormatType);
            if (ej2_base_1.isNullOrUndefined(hash)) {
                hash = this.uniqueParagraphFormat.mergeProperties(format.uniqueParagraphFormat);
            }
            this.uniqueParagraphFormat = WParagraphFormat.uniqueParagraphFormats.addUniqueFormat(hash, WParagraphFormat.uniqueFormatType);
        };
        WParagraphFormat.prototype.cloneFormat = function () {
            var format = new WParagraphFormat(undefined);
            format.uniqueParagraphFormat = this.uniqueParagraphFormat;
            format.baseStyle = this.baseStyle;
            if (ej2_base_1.isNullOrUndefined(this.listFormat)) {
                format.listFormat = undefined;
            }
            else {
                format.listFormat = this.listFormat.cloneListFormat();
                format.listFormat.ownerBase = format;
            }
            format.borders = ej2_base_1.isNullOrUndefined(this.borders) ? undefined : this.borders.cloneFormat();
            return format;
        };
        WParagraphFormat.prototype.hasValue = function (property) {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueParagraphFormat) && !ej2_base_1.isNullOrUndefined(this.uniqueParagraphFormat.propertiesHash)) {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueParagraphFormat.uniqueFormatType, property);
                return this.uniqueParagraphFormat.propertiesHash.containsKey(propertyType);
            }
            return false;
        };
        WParagraphFormat.clear = function () {
            this.uniqueParagraphFormats.clear();
        };
        WParagraphFormat.prototype.applyStyle = function (baseStyle) {
            this.baseStyle = baseStyle;
            this.listFormat.applyStyle(this.baseStyle);
        };
        WParagraphFormat.prototype.getValue = function (property) {
            return this.hasValue(property) ? this.getPropertyValue(property) : undefined;
        };
        WParagraphFormat.prototype.mergeFormat = function (format, isStyle) {
            isStyle = ej2_base_1.isNullOrUndefined(isStyle) ? false : isStyle;
            if (ej2_base_1.isNullOrUndefined(this.getValue('leftIndent'))) {
                this.leftIndent = format.getValue('leftIndent');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('rightIndent'))) {
                this.rightIndent = format.getValue('rightIndent');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('firstLineIndent'))) {
                this.firstLineIndent = format.getValue('firstLineIndent');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('beforeSpacing'))) {
                this.beforeSpacing = format.getValue('beforeSpacing');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('afterSpacing'))) {
                this.afterSpacing = format.getValue('afterSpacing');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('spaceBeforeAuto'))) {
                this.spaceBeforeAuto = format.getValue('spaceBeforeAuto');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('spaceAfterAuto'))) {
                this.spaceAfterAuto = format.getValue('spaceAfterAuto');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('lineSpacing'))) {
                this.lineSpacing = format.getValue('lineSpacing');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('lineSpacingType'))) {
                this.lineSpacingType = format.getValue('lineSpacingType');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('textAlignment'))) {
                this.textAlignment = format.getValue('textAlignment');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('outlineLevel'))) {
                this.outlineLevel = format.getValue('outlineLevel');
            }
            if (!isStyle && ej2_base_1.isNullOrUndefined(this.getValue('bidi'))) {
                this.bidi = format.getValue('bidi');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('contextualSpacing'))) {
                this.contextualSpacing = format.getValue('contextualSpacing');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('keepWithNext'))) {
                this.keepWithNext = format.getValue('keepWithNext');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('keepLinesTogether'))) {
                this.keepLinesTogether = format.getValue('keepLinesTogether');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('widowControl'))) {
                this.widowControl = format.getValue('widowControl');
            }
            if (ej2_base_1.isNullOrUndefined(this.listFormat)) {
                this.listFormat.mergeFormat(format.listFormat);
            }
        };
        return WParagraphFormat;
    }());
    WParagraphFormat.uniqueParagraphFormats = new unique_formats_1.WUniqueFormats();
    WParagraphFormat.uniqueFormatType = 3;
    exports.WParagraphFormat = WParagraphFormat;
});
