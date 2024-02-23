define(["require", "exports", "@syncfusion/ej2-base", "../../base/dictionary", "../../base/unique-format", "../../base/unique-formats", "./style", "../list/list"], function (require, exports, ej2_base_1, dictionary_1, unique_format_1, unique_formats_1, style_1, list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WListFormat = (function () {
        function WListFormat(node) {
            this.uniqueListFormat = undefined;
            this.ownerBase = undefined;
            this.baseStyle = undefined;
            this.list = undefined;
            this.ownerBase = node;
        }
        Object.defineProperty(WListFormat.prototype, "nsid", {
            get: function () {
                return this.getPropertyValue('nsid');
            },
            set: function (id) {
                this.setPropertyValue('nsid', id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListFormat.prototype, "listId", {
            get: function () {
                return this.getPropertyValue('listId');
            },
            set: function (listId) {
                if (listId >= 0) {
                    if (!ej2_base_1.isNullOrUndefined(this.ownerBase)) {
                        var helper = this.ownerBase.getDocumentHelperObject();
                        if (!ej2_base_1.isNullOrUndefined(helper)) {
                            this.list = helper.getListById(listId);
                        }
                    }
                }
                else if (!ej2_base_1.isNullOrUndefined(this.list) && listId < 0) {
                    this.list = undefined;
                }
                this.setPropertyValue('listId', listId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListFormat.prototype, "listLevelNumber", {
            get: function () {
                return this.getPropertyValue('listLevelNumber');
            },
            set: function (value) {
                this.setPropertyValue('listLevelNumber', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListFormat.prototype, "listLevel", {
            get: function () {
                var list = undefined;
                if (!ej2_base_1.isNullOrUndefined(this.list)) {
                    list = this.list;
                }
                else {
                    var baseListStyle = this.baseStyle;
                    while (!ej2_base_1.isNullOrUndefined(baseListStyle) && baseListStyle instanceof style_1.WParagraphStyle) {
                        if (baseListStyle.paragraphFormat.listFormat.list) {
                            list = baseListStyle.paragraphFormat.listFormat.list;
                            break;
                        }
                        else {
                            baseListStyle = baseListStyle.basedOn;
                        }
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(list)) {
                    return list.getListLevel(this.listLevelNumber);
                }
                else {
                    return undefined;
                }
            },
            enumerable: true,
            configurable: true
        });
        WListFormat.prototype.getPropertyValue = function (property) {
            if (!this.hasValue(property)) {
                if (this.baseStyle instanceof style_1.WParagraphStyle) {
                    var baseStyle = this.baseStyle;
                    while (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                        if (baseStyle.paragraphFormat.listFormat.hasValue(property)) {
                            break;
                        }
                        else {
                            baseStyle = baseStyle.basedOn;
                        }
                    }
                    if (!ej2_base_1.isNullOrUndefined(baseStyle)) {
                        var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WListFormat.uniqueFormatType, property);
                        return baseStyle.paragraphFormat.listFormat.uniqueListFormat.propertiesHash.get(propertyType);
                    }
                }
            }
            else {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WListFormat.uniqueFormatType, property);
                if (!ej2_base_1.isNullOrUndefined(this.uniqueListFormat) && this.uniqueListFormat.propertiesHash.containsKey(propertyType)) {
                    return this.uniqueListFormat.propertiesHash.get(propertyType);
                }
            }
            return WListFormat.getPropertyDefaultValue(property);
        };
        WListFormat.prototype.setPropertyValue = function (property, value) {
            if (ej2_base_1.isNullOrUndefined(value) || value === '') {
                value = WListFormat.getPropertyDefaultValue(property);
            }
            if (ej2_base_1.isNullOrUndefined(this.uniqueListFormat)) {
                this.initializeUniqueListFormat(property, value);
            }
            else {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueListFormat.uniqueFormatType, property);
                if (this.uniqueListFormat.propertiesHash.containsKey(propertyType) &&
                    this.uniqueListFormat.propertiesHash.get(propertyType) === value) {
                    return;
                }
                this.uniqueListFormat = WListFormat.uniqueListFormats.updateUniqueFormat(this.uniqueListFormat, property, value);
            }
        };
        WListFormat.prototype.initializeUniqueListFormat = function (property, propValue) {
            var uniqueListFormatTemp = new dictionary_1.Dictionary();
            this.addUniqueListFormat('listId', property, propValue, uniqueListFormatTemp);
            this.addUniqueListFormat('listLevelNumber', property, propValue, uniqueListFormatTemp);
            this.addUniqueListFormat('nsid', property, propValue, uniqueListFormatTemp);
            this.uniqueListFormat = WListFormat.uniqueListFormats.addUniqueFormat(uniqueListFormatTemp, WListFormat.uniqueFormatType);
        };
        WListFormat.prototype.addUniqueListFormat = function (property, modifiedProperty, propValue, uniqueListFormatTemp) {
            var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WListFormat.uniqueFormatType, property);
            if (property === modifiedProperty) {
                uniqueListFormatTemp.add(propertyType, propValue);
            }
        };
        WListFormat.getPropertyDefaultValue = function (property) {
            var value = undefined;
            switch (property) {
                case 'listId':
                    value = -1;
                    break;
                case 'listLevelNumber':
                    value = 0;
                    break;
                case 'nsid':
                    value = -1;
                    break;
            }
            return value;
        };
        WListFormat.prototype.copyFormat = function (format) {
            if (!ej2_base_1.isNullOrUndefined(format)) {
                if (!ej2_base_1.isNullOrUndefined(format.uniqueListFormat)) {
                    this.listId = format.listId;
                    this.listLevelNumber = format.listLevelNumber;
                    this.nsid = format.nsid;
                }
                if (!ej2_base_1.isNullOrUndefined(format.baseStyle)) {
                    this.baseStyle = format.baseStyle;
                }
                if (!ej2_base_1.isNullOrUndefined(format.list)) {
                    this.list = format.list;
                }
            }
        };
        WListFormat.prototype.hasValue = function (property) {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueListFormat)) {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueListFormat.uniqueFormatType, property);
                return this.uniqueListFormat.propertiesHash.containsKey(propertyType);
            }
            return false;
        };
        WListFormat.prototype.clearFormat = function () {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueListFormat) && this.uniqueListFormat.referenceCount === 0) {
                WListFormat.uniqueListFormats.remove(this.uniqueListFormat);
            }
            this.uniqueListFormat = undefined;
            this.list = undefined;
        };
        WListFormat.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueListFormat)) {
                WListFormat.uniqueListFormats.remove(this.uniqueListFormat);
            }
            this.uniqueListFormat = undefined;
            this.list = undefined;
            this.ownerBase = undefined;
            this.baseStyle = undefined;
        };
        WListFormat.clear = function () {
            this.uniqueListFormats.clear();
        };
        WListFormat.prototype.applyStyle = function (baseStyle) {
            this.baseStyle = baseStyle;
        };
        WListFormat.prototype.getValue = function (property) {
            return this.hasValue(property) ? this.getPropertyValue(property) : undefined;
        };
        WListFormat.prototype.mergeFormat = function (format) {
            if (ej2_base_1.isNullOrUndefined(this.getValue('listId'))) {
                this.listId = format.getValue('listId');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('listLevelNumber'))) {
                this.listLevelNumber = format.getValue('listLevelNumber');
            }
            if (ej2_base_1.isNullOrUndefined(this.getValue('nsid'))) {
                this.nsid = format.getValue('nsid');
            }
            if (!ej2_base_1.isNullOrUndefined(format.list)) {
                if (ej2_base_1.isNullOrUndefined(this.list)) {
                    this.list = new list_1.WList();
                }
                this.list.mergeList(format.list);
            }
        };
        WListFormat.prototype.cloneListFormat = function () {
            var format = new WListFormat(undefined);
            format.list = this.list;
            format.listId = this.listId;
            format.nsid = this.nsid;
            format.baseStyle = this.baseStyle;
            format.listLevelNumber = this.listLevelNumber;
            format.uniqueListFormat = this.uniqueListFormat;
            return format;
        };
        return WListFormat;
    }());
    WListFormat.uniqueListFormats = new unique_formats_1.WUniqueFormats();
    WListFormat.uniqueFormatType = 7;
    exports.WListFormat = WListFormat;
});
