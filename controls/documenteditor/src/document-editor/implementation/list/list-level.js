define(["require", "exports", "../../base/dictionary", "../../base/unique-format", "../../base/unique-formats", "../format/character-format", "../format/paragraph-format", "./abstract-list", "@syncfusion/ej2-base"], function (require, exports, dictionary_1, unique_format_1, unique_formats_1, character_format_1, paragraph_format_1, abstract_list_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WListLevel = (function () {
        function WListLevel(node) {
            this.uniqueListLevel = undefined;
            this.paragraphFormat = undefined;
            this.characterFormat = undefined;
            if (node instanceof abstract_list_1.WAbstractList) {
                this.ownerBase = node;
            }
            else {
                this.ownerBase = node;
            }
            this.characterFormat = new character_format_1.WCharacterFormat(undefined);
            this.paragraphFormat = new paragraph_format_1.WParagraphFormat(undefined);
        }
        Object.defineProperty(WListLevel.prototype, "listLevelPattern", {
            get: function () {
                return this.getPropertyValue('listLevelPattern');
            },
            set: function (listLevelPattern) {
                this.setPropertyValue('listLevelPattern', listLevelPattern);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListLevel.prototype, "followCharacter", {
            get: function () {
                return this.getPropertyValue('followCharacter');
            },
            set: function (followCharacter) {
                this.setPropertyValue('followCharacter', followCharacter);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListLevel.prototype, "startAt", {
            get: function () {
                return this.getPropertyValue('startAt');
            },
            set: function (startAt) {
                this.setPropertyValue('startAt', startAt);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListLevel.prototype, "numberFormat", {
            get: function () {
                return this.getPropertyValue('numberFormat');
            },
            set: function (numberFormat) {
                this.setPropertyValue('numberFormat', numberFormat);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListLevel.prototype, "restartLevel", {
            get: function () {
                return this.getPropertyValue('restartLevel');
            },
            set: function (restartLevel) {
                this.setPropertyValue('restartLevel', restartLevel);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WListLevel.prototype, "isLegalStyleNumbering", {
            get: function () {
                return this.getPropertyValue('isLegalStyleNumbering');
            },
            set: function (isLegalStyleNumbering) {
                this.setPropertyValue('isLegalStyleNumbering', isLegalStyleNumbering);
            },
            enumerable: true,
            configurable: true
        });
        WListLevel.prototype.getPropertyValue = function (property) {
            var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WListLevel.uniqueFormatType, property);
            if (!ej2_base_1.isNullOrUndefined(this.uniqueListLevel) && this.uniqueListLevel.propertiesHash.containsKey(propertyType)) {
                return this.uniqueListLevel.propertiesHash.get(propertyType);
            }
            return WListLevel.getPropertyDefaultValue(property);
        };
        WListLevel.prototype.setPropertyValue = function (property, value) {
            if (ej2_base_1.isNullOrUndefined(value) || value === '') {
                value = WListLevel.getPropertyDefaultValue(property);
            }
            if (ej2_base_1.isNullOrUndefined(this.uniqueListLevel)) {
                this.initializeUniqueWListLevel(property, value);
            }
            else {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueListLevel.uniqueFormatType, property);
                if (this.uniqueListLevel.propertiesHash.containsKey(propertyType) &&
                    this.uniqueListLevel.propertiesHash.get(propertyType) === value) {
                    return;
                }
                this.uniqueListLevel = WListLevel.uniqueListLevels.updateUniqueFormat(this.uniqueListLevel, property, value);
            }
        };
        WListLevel.prototype.initializeUniqueWListLevel = function (property, propValue) {
            var uniqueListLevelTemp = new dictionary_1.Dictionary();
            this.addUniqueWListLevel('listLevelPattern', property, propValue, uniqueListLevelTemp);
            this.addUniqueWListLevel('startAt', property, propValue, uniqueListLevelTemp);
            this.addUniqueWListLevel('followCharacter', property, propValue, uniqueListLevelTemp);
            this.addUniqueWListLevel('numberFormat', property, propValue, uniqueListLevelTemp);
            this.addUniqueWListLevel('restartLevel', property, propValue, uniqueListLevelTemp);
            this.addUniqueWListLevel('isLegalStyleNumbering', property, propValue, uniqueListLevelTemp);
            this.uniqueListLevel = WListLevel.uniqueListLevels.addUniqueFormat(uniqueListLevelTemp, WListLevel.uniqueFormatType);
        };
        WListLevel.prototype.addUniqueWListLevel = function (property, modifiedProperty, propValue, uniqueCharFormatTemp) {
            var propertyType;
            propertyType = unique_format_1.WUniqueFormat.getPropertyType(WListLevel.uniqueFormatType, property);
            if (property === modifiedProperty) {
                uniqueCharFormatTemp.add(propertyType, propValue);
            }
            else {
                uniqueCharFormatTemp.add(propertyType, WListLevel.getPropertyDefaultValue(property));
            }
        };
        WListLevel.getPropertyDefaultValue = function (property) {
            var value = undefined;
            switch (property) {
                case 'listLevelPattern':
                    value = 'Arabic';
                    break;
                case 'startAt':
                    value = 0;
                    break;
                case 'followCharacter':
                    value = 'Tab';
                    break;
                case 'numberFormat':
                    value = '';
                    break;
                case 'restartLevel':
                    value = 0;
                    break;
                case 'isLegalStyleNumbering':
                    value = false;
                    break;
            }
            return value;
        };
        WListLevel.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueListLevel)) {
                WListLevel.uniqueListLevels.remove(this.uniqueListLevel);
            }
            this.uniqueListLevel = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.characterFormat)) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.paragraphFormat)) {
                this.paragraphFormat.destroy();
                this.paragraphFormat = undefined;
            }
        };
        WListLevel.prototype.clearFormat = function () {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueListLevel)) {
                WListLevel.uniqueListLevels.remove(this.uniqueListLevel);
            }
            this.uniqueListLevel = undefined;
            if (this.characterFormat) {
                this.characterFormat.clearFormat();
            }
            this.characterFormat = undefined;
            if (this.paragraphFormat) {
                this.paragraphFormat.clearFormat();
            }
            this.paragraphFormat = undefined;
        };
        WListLevel.clear = function () {
            this.uniqueListLevels.clear();
        };
        WListLevel.prototype.clone = function (node) {
            var listLevel = new WListLevel(node);
            listLevel.paragraphFormat = this.paragraphFormat.cloneFormat();
            listLevel.characterFormat = this.characterFormat.cloneFormat();
            if (this.uniqueListLevel) {
                listLevel.uniqueListLevel = this.uniqueListLevel;
                listLevel.uniqueListLevel.referenceCount++;
            }
            return listLevel;
        };
        return WListLevel;
    }());
    WListLevel.dotBullet = String.fromCharCode(61623);
    WListLevel.squareBullet = String.fromCharCode(61607);
    WListLevel.arrowBullet = String.fromCharCode(10148);
    WListLevel.circleBullet = String.fromCharCode(61551) + String.fromCharCode(32);
    WListLevel.uniqueListLevels = new unique_formats_1.WUniqueFormats();
    WListLevel.uniqueFormatType = 9;
    exports.WListLevel = WListLevel;
});
