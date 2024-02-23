define(["require", "exports", "@syncfusion/ej2-base", "../../base/unique-format", "../../base/unique-formats", "../../base/dictionary"], function (require, exports, ej2_base_1, unique_format_1, unique_formats_1, dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WShading = (function () {
        function WShading(node) {
            this.uniqueShadingFormat = undefined;
            this.ownerBase = undefined;
            this.ownerBase = node;
        }
        Object.defineProperty(WShading.prototype, "backgroundColor", {
            get: function () {
                return this.getPropertyValue('backgroundColor');
            },
            set: function (value) {
                this.setPropertyValue('backgroundColor', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WShading.prototype, "foregroundColor", {
            get: function () {
                return this.getPropertyValue('foregroundColor');
            },
            set: function (value) {
                this.setPropertyValue('foregroundColor', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WShading.prototype, "textureStyle", {
            get: function () {
                return this.getPropertyValue('textureStyle');
            },
            set: function (value) {
                this.setPropertyValue('textureStyle', value);
            },
            enumerable: true,
            configurable: true
        });
        WShading.prototype.getPropertyValue = function (property) {
            var hasValue = this.hasValue(property);
            if (hasValue) {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WShading.uniqueFormatType, property);
                if (!ej2_base_1.isNullOrUndefined(this.uniqueShadingFormat) && this.uniqueShadingFormat.propertiesHash.containsKey(propertyType)) {
                    return this.uniqueShadingFormat.propertiesHash.get(propertyType);
                }
            }
            return WShading.getPropertyDefaultValue(property);
        };
        WShading.prototype.setPropertyValue = function (property, value) {
            if (ej2_base_1.isNullOrUndefined(value) || value === '') {
                value = WShading.getPropertyDefaultValue(property);
            }
            if (ej2_base_1.isNullOrUndefined(this.uniqueShadingFormat)) {
                this.initializeUniqueShading(property, value);
            }
            else {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueShadingFormat.uniqueFormatType, property);
                if (this.uniqueShadingFormat.propertiesHash.containsKey(propertyType) &&
                    this.uniqueShadingFormat.propertiesHash.get(propertyType) === value) {
                    return;
                }
                this.uniqueShadingFormat = WShading.uniqueShadingFormats.updateUniqueFormat(this.uniqueShadingFormat, property, value);
            }
        };
        WShading.getPropertyDefaultValue = function (property) {
            var value = undefined;
            switch (property) {
                case 'backgroundColor':
                    value = 'empty';
                    break;
                case 'foregroundColor':
                    value = 'empty';
                    break;
                case 'textureStyle':
                    value = 'TextureNone';
                    break;
            }
            return value;
        };
        WShading.prototype.initializeUniqueShading = function (property, propValue) {
            var uniqueShadingTemp = new dictionary_1.Dictionary();
            this.addUniqueShading('backgroundColor', property, propValue, uniqueShadingTemp);
            this.addUniqueShading('foregroundColor', property, propValue, uniqueShadingTemp);
            this.addUniqueShading('textureStyle', property, propValue, uniqueShadingTemp);
            this.uniqueShadingFormat = WShading.uniqueShadingFormats.addUniqueFormat(uniqueShadingTemp, WShading.uniqueFormatType);
        };
        WShading.prototype.addUniqueShading = function (property, modifiedProperty, propValue, uniqueShadingTemp) {
            var propertyType = unique_format_1.WUniqueFormat.getPropertyType(WShading.uniqueFormatType, property);
            if (property === modifiedProperty) {
                uniqueShadingTemp.add(propertyType, propValue);
            }
            else {
                uniqueShadingTemp.add(propertyType, WShading.getPropertyDefaultValue(property));
            }
        };
        WShading.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueShadingFormat)) {
                WShading.uniqueShadingFormats.remove(this.uniqueShadingFormat);
            }
            this.uniqueShadingFormat = undefined;
        };
        WShading.prototype.cloneFormat = function () {
            var shading = new WShading(undefined);
            shading.backgroundColor = this.backgroundColor;
            shading.foregroundColor = this.foregroundColor;
            shading.textureStyle = this.textureStyle;
            return shading;
        };
        WShading.prototype.copyFormat = function (shading) {
            if (!ej2_base_1.isNullOrUndefined(shading) && !ej2_base_1.isNullOrUndefined(shading.uniqueShadingFormat)) {
                this.backgroundColor = shading.backgroundColor;
                this.foregroundColor = shading.foregroundColor;
                this.textureStyle = shading.textureStyle;
            }
        };
        WShading.prototype.hasValue = function (property) {
            if (!ej2_base_1.isNullOrUndefined(this.uniqueShadingFormat)) {
                var propertyType = unique_format_1.WUniqueFormat.getPropertyType(this.uniqueShadingFormat.uniqueFormatType, property);
                return this.uniqueShadingFormat.propertiesHash.containsKey(propertyType);
            }
            return false;
        };
        WShading.clear = function () {
            this.uniqueShadingFormats.clear();
        };
        return WShading;
    }());
    WShading.uniqueShadingFormats = new unique_formats_1.WUniqueFormats();
    WShading.uniqueFormatType = 5;
    exports.WShading = WShading;
});
