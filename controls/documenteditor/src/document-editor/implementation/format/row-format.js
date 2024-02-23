define(["require", "exports", "@syncfusion/ej2-base", "../../base/dictionary", "../../base/unique-format", "../../base/unique-formats", "./borders", "../track-changes/track-changes"], function (require, exports, ej2_base_1, dictionary_1, unique_format_1, unique_formats_1, borders_1, track_changes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WRowFormat = (function () {
        function WRowFormat(node) {
            this.uniqueRowFormat = undefined;
            this.borders = new borders_1.WBorders(this);
            this.ownerBase = undefined;
            this.beforeWidth = 0;
            this.afterWidth = 0;
            this.revisions = [];
            this.removedIds = [];
            this.ownerBase = node;
        }
        Object.defineProperty(WRowFormat.prototype, "gridBefore", {
            get: function () {
                return this.getPropertyValue('gridBefore');
            },
            set: function (value) {
                this.setPropertyValue('gridBefore', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "gridBeforeWidth", {
            get: function () {
                return this.getPropertyValue('gridBeforeWidth');
            },
            set: function (value) {
                this.setPropertyValue('gridBeforeWidth', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "gridBeforeWidthType", {
            get: function () {
                return this.getPropertyValue('gridBeforeWidthType');
            },
            set: function (value) {
                this.setPropertyValue('gridBeforeWidthType', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "gridAfter", {
            get: function () {
                return this.getPropertyValue('gridAfter');
            },
            set: function (value) {
                this.setPropertyValue('gridAfter', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "gridAfterWidth", {
            get: function () {
                return this.getPropertyValue('gridAfterWidth');
            },
            set: function (value) {
                this.setPropertyValue('gridAfterWidth', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "gridAfterWidthType", {
            get: function () {
                return this.getPropertyValue('gridAfterWidthType');
            },
            set: function (value) {
                this.setPropertyValue('gridAfterWidthType', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "allowBreakAcrossPages", {
            get: function () {
                return this.getPropertyValue('allowBreakAcrossPages');
            },
            set: function (value) {
                this.setPropertyValue('allowBreakAcrossPages', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "isHeader", {
            get: function () {
                return this.getPropertyValue('isHeader');
            },
            set: function (value) {
                this.setPropertyValue('isHeader', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "rightMargin", {
            get: function () {
                return this.getPropertyValue('rightMargin');
            },
            set: function (value) {
                this.setPropertyValue('rightMargin', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "height", {
            get: function () {
                return this.getPropertyValue('height');
            },
            set: function (value) {
                if (value === 0 && (this.heightType === 'AtLeast' || this.heightType === 'Exactly')) {
                    value = 1;
                }
                else if (this.heightType === 'Auto') {
                    value = 0;
                }
                this.setPropertyValue('height', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "heightType", {
            get: function () {
                return this.getPropertyValue('heightType');
            },
            set: function (value) {
                if (value === 'AtLeast' || value === 'Exactly') {
                    this.height = 1;
                }
                else {
                    this.height = 0;
                }
                this.setPropertyValue('heightType', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "bottomMargin", {
            get: function () {
                return this.getPropertyValue('bottomMargin');
            },
            set: function (value) {
                this.setPropertyValue('bottomMargin', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "leftIndent", {
            get: function () {
                return this.getPropertyValue('leftIndent');
            },
            set: function (value) {
                this.setPropertyValue('leftIndent', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "topMargin", {
            get: function () {
                return this.getPropertyValue('topMargin');
            },
            set: function (value) {
                this.setPropertyValue('topMargin', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WRowFormat.prototype, "leftMargin", {
            get: function () {
                return this.getPropertyValue('leftMargin');
            },
            set: function (value) {
                this.setPropertyValue('leftMargin', value);
            },
            enumerable: true,
            configurable: true
        });
        WRowFormat.prototype.getPropertyValue = function (property) {
            var hasValue = this.hasValue(property);
            if (hasValue) {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WRowFormat.uniqueFormatType, property);
                if (!ej2_base_1.isNullOrUndefined(this.uniqueRowFormat) && this.uniqueRowFormat.propertiesHash.containsKey(propertyType)) {
                    return this.uniqueRowFormat.propertiesHash.get(propertyType);
                }
            }
            return WRowFormat.getPropertyDefaultValue(property);
        };
        WRowFormat.prototype.setPropertyValue = function (property, value) {
            if (ej2_base_1.isNullOrUndefined(value) || value === '') {
                value = WRowFormat.getPropertyDefaultValue(property);
            }
            if (ej2_base_1.isNullOrUndefined(this.uniqueRowFormat)) {
                this.initializeUniqueRowFormat(property, value);
            }
            else {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueRowFormat.uniqueFormatType, property);
                if (this.uniqueRowFormat.propertiesHash.containsKey(propertyType) &&
                    this.uniqueRowFormat.propertiesHash.get(propertyType) === value) {
                    return;
                }
                this.uniqueRowFormat = WRowFormat.uniqueRowFormats.updateUniqueFormat(this.uniqueRowFormat, property, value);
            }
        };
        WRowFormat.prototype.initializeUniqueRowFormat = function (property, propValue) {
            var uniqueRowFormatTemp = new dictionary_1.Dictionary();
            this.addUniqueRowFormat('allowBreakAcrossPages', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('isHeader', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('height', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('heightType', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('gridBefore', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('gridBeforeWidth', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('gridBeforeWidthType', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('gridAfter', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('gridAfterWidth', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('gridgridAfterWidth', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('gridBeforeWidthType', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('leftMargin', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('rightMargin', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('topMargin', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('bottomMargin', property, propValue, uniqueRowFormatTemp);
            this.addUniqueRowFormat('leftIndent', property, propValue, uniqueRowFormatTemp);
            this.uniqueRowFormat = WRowFormat.uniqueRowFormats.addUniqueFormat(uniqueRowFormatTemp, WRowFormat.uniqueFormatType);
        };
        WRowFormat.prototype.addUniqueRowFormat = function (property, modifiedProperty, propValue, uniqueRowFormatTemp) {
            var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WRowFormat.uniqueFormatType, property);
            if (property === modifiedProperty) {
                uniqueRowFormatTemp.add(propertyType, propValue);
            }
        };
        WRowFormat.getPropertyDefaultValue = function (property) {
            var value = undefined;
            switch (property) {
                case 'allowBreakAcrossPages':
                    value = true;
                    break;
                case 'isHeader':
                    value = false;
                    break;
                case 'height':
                    value = 0;
                    break;
                case 'heightType':
                    value = 'Auto';
                    break;
                case 'gridBefore':
                    value = 0;
                    break;
                case 'gridBeforeWidth':
                    value = 0;
                    break;
                case 'gridBeforeWidthType':
                    value = 'Point';
                    break;
                case 'gridAfter':
                    value = 0;
                    break;
                case 'gridAfterWidth':
                    value = 0;
                    break;
                case 'gridAfterWidthType':
                    value = 'Point';
                    break;
                case 'leftMargin':
                    value = undefined;
                    break;
                case 'topMargin':
                    value = undefined;
                    break;
                case 'bottomMargin':
                    value = undefined;
                    break;
                case 'rightMargin':
                    value = undefined;
                    break;
                case 'leftIndent':
                    value = 0;
                    break;
            }
            return value;
        };
        WRowFormat.prototype.containsMargins = function () {
            return (!ej2_base_1.isNullOrUndefined(this.leftMargin)
                || !ej2_base_1.isNullOrUndefined(this.rightMargin)
                || !ej2_base_1.isNullOrUndefined(this.bottomMargin)
                || !ej2_base_1.isNullOrUndefined(this.topMargin));
        };
        WRowFormat.prototype.cloneFormat = function () {
            var format = new WRowFormat();
            format.allowBreakAcrossPages = this.allowBreakAcrossPages;
            format.heightType = this.heightType;
            format.height = this.height;
            format.isHeader = this.isHeader;
            format.gridBefore = this.gridBefore;
            format.gridBeforeWidth = this.gridBeforeWidth;
            format.gridBeforeWidthType = this.gridBeforeWidthType;
            format.gridAfter = this.gridAfter;
            format.gridAfterWidth = this.gridAfterWidth;
            format.gridAfterWidthType = this.gridAfterWidthType;
            format.leftMargin = this.leftMargin;
            format.rightMargin = this.rightMargin;
            format.topMargin = this.topMargin;
            format.bottomMargin = this.bottomMargin;
            format.leftIndent = this.leftIndent;
            if (this.revisions.length > 0) {
                format.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
            }
            else {
                format.removedIds = this.removedIds.slice();
            }
            return format;
        };
        WRowFormat.prototype.hasValue = function (property) {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueRowFormat)) {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueRowFormat.uniqueFormatType, property);
                return this.uniqueRowFormat.propertiesHash.containsKey(propertyType);
            }
            return false;
        };
        WRowFormat.prototype.copyFormat = function (format) {
            if (!ej2_base_1.isNullOrUndefined(format)) {
                if (!ej2_base_1.isNullOrUndefined(format.uniqueRowFormat)) {
                    this.allowBreakAcrossPages = format.allowBreakAcrossPages;
                    this.isHeader = format.isHeader;
                    this.heightType = format.heightType;
                    this.height = format.height;
                    this.gridBefore = format.gridBefore;
                    this.gridBeforeWidth = format.gridBeforeWidth;
                    this.gridBeforeWidthType = format.gridBeforeWidthType;
                    this.gridAfter = format.gridAfter;
                    this.gridAfterWidth = format.gridAfterWidth;
                    this.gridAfterWidthType = format.gridAfterWidthType;
                    this.leftMargin = format.leftMargin;
                    this.topMargin = format.topMargin;
                    this.rightMargin = format.rightMargin;
                    this.bottomMargin = format.bottomMargin;
                    this.leftIndent = format.leftIndent;
                    this.revisions = format.revisions;
                }
                if (!ej2_base_1.isNullOrUndefined(format.borders)) {
                    this.borders = new borders_1.WBorders(this);
                    this.borders.ownerBase = format;
                    this.borders.copyFormat(format.borders);
                }
                if (format.revisions.length > 0) {
                    this.removedIds = track_changes_1.Revision.cloneRevisions(format.revisions);
                }
                else {
                    this.removedIds = format.removedIds.slice();
                }
            }
        };
        WRowFormat.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.borders)) {
                this.borders.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.uniqueRowFormat)) {
                WRowFormat.uniqueRowFormats.remove(this.uniqueRowFormat);
            }
            this.beforeWidth = undefined;
            this.afterWidth = undefined;
            this.borders = undefined;
            this.uniqueRowFormat = undefined;
        };
        WRowFormat.clear = function () {
            this.uniqueRowFormats.clear();
        };
        return WRowFormat;
    }());
    WRowFormat.uniqueRowFormats = new unique_formats_1.WUniqueFormats();
    WRowFormat.uniqueFormatType = 6;
    exports.WRowFormat = WRowFormat;
});
