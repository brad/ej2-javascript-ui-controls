define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-compression", "../viewer/page", "../viewer/page", "../../index"], function (require, exports, ej2_base_1, ej2_compression_1, page_1, page_2, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HelperMethods = (function () {
        function HelperMethods() {
        }
        HelperMethods.insert = function (spanText, index, text) {
            if (index >= 0) {
                return [spanText.slice(0, index) + text + spanText.slice(index)].join('');
            }
            else {
                return text + this;
            }
        };
        HelperMethods.replaceSpecialChars = function (text) {
            text = text.replace("^[\\s]*", '');
            text = text.replace("^[#@!~\\$%^&\\*\\(\\)\\-_\\+\\.=\\{\\}\\[\\]:;,<>\\?'\\\\\"\\“\\”\\//0123456789]+", '');
            text = text.replace("[#@!~\\$%^&\\*\\(\\)\\-_\\+\\.=\\{\\}\\[\\]:;,<>\\?'\\\\\"\\“\\”\\//0123456789]+$", '');
            return text;
        };
        HelperMethods.getSpellCheckData = function (text) {
            text = text.replace('\r\n', ' ');
            text = text.replace('\n', ' ');
            text = text.replace('\r', ' ');
            text = text.replace('\v', ' ');
            text = text.replace('\t', ' ');
            text = text.replace('/', ' ');
            var stringarr = text.split(' ');
            var spellColl = [];
            for (var _i = 0, stringarr_1 = stringarr; _i < stringarr_1.length; _i++) {
                var str = stringarr_1[_i];
                var spellInfo = {};
                spellInfo.Text = this.replaceSpecialChars(str);
                spellInfo.HasSpellError = false;
                spellColl.push(spellInfo);
            }
            return spellColl;
        };
        HelperMethods.checkTextFormat = function (input) {
            var romanPattern = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
            var arabicPattern = /^[0-9]+$/;
            if (romanPattern.test(input) || arabicPattern.test(input)) {
                return true;
            }
            else {
                return false;
            }
        };
        HelperMethods.sanitizeString = function (value) {
            if (ej2_base_1.isNullOrUndefined(value))
                return '';
            var sanitizedContent = ej2_base_1.SanitizeHtmlHelper.sanitize(value)
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, String.fromCharCode(160))
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<');
            return sanitizedContent;
        };
        HelperMethods.getSfdtDocument = function (json) {
            json = (json instanceof Object) ? json : JSON.parse(json);
            if (!ej2_base_1.isNullOrUndefined(json.sfdt)) {
                var zipArchive = new ej2_compression_1.ZipArchive();
                zipArchive.open(JSON.stringify(json.sfdt));
                var zipItem = zipArchive.items[0];
                var value = new Uint8Array(zipItem.data);
                var str = new TextDecoder("utf-8").decode(value);
                json = JSON.parse(str);
            }
            return json;
        };
        HelperMethods.generateUniqueId = function (lists, abstractLists) {
            var isAbstractList = !ej2_base_1.isNullOrUndefined(abstractLists) ? true : false;
            var randomNumber = Math.floor(Math.random() * 100000000);
            if (isAbstractList) {
                return this.isSameListIDExists(randomNumber, undefined, abstractLists, isAbstractList) ? this.generateUniqueId(undefined, abstractLists) : randomNumber;
            }
            else {
                return this.isSameListIDExists(randomNumber, lists) ? this.generateUniqueId(lists) : randomNumber;
            }
        };
        HelperMethods.isSameListIDExists = function (nsid, lists, abstractLists, isAbstractList) {
            if (isAbstractList) {
                for (var i = 0; i < abstractLists.length; i++) {
                    var abstractList = abstractLists[parseInt(i.toString(), 10)];
                    if (nsid == abstractList.nsid) {
                        return true;
                    }
                }
            }
            else {
                for (var j = 0; j < lists.length; j++) {
                    var list = lists[parseInt(j.toString(), 10)];
                    if (nsid == list.nsid) {
                        return true;
                    }
                }
            }
            return false;
        };
        HelperMethods.remove = function (text, index) {
            if (index === 0) {
                return text.substring(index + 1, text.length);
            }
            else {
                return text.substring(0, index) + text.substring(index + 1, text.length);
            }
        };
        HelperMethods.indexOfAny = function (text, wordSplitCharacter) {
            var index = undefined;
            for (var j = 0; j < wordSplitCharacter.length; j++) {
                var temp = text.indexOf(wordSplitCharacter[parseInt(j.toString(), 10)]);
                if (temp !== -1 && ej2_base_1.isNullOrUndefined(index)) {
                    index = temp;
                }
                else if (temp !== -1 && temp < index) {
                    index = temp;
                }
            }
            return ej2_base_1.isNullOrUndefined(index) ? -1 : index;
        };
        HelperMethods.lastIndexOfAny = function (text, wordSplitCharacter) {
            for (var i = text.length - 1; i >= 0; i--) {
                for (var j = 0; j <= wordSplitCharacter.length - 1; j++) {
                    if (text[parseInt(i.toString(), 10)] === wordSplitCharacter[parseInt(j.toString(), 10)]) {
                        return i;
                    }
                }
            }
            return -1;
        };
        HelperMethods.convertArgbToRgb = function (color) {
            if (color.length >= 8) {
                return color.substr(0, 6);
            }
            return color;
        };
        HelperMethods.convertRgbToHex = function (val) {
            var hex = Number(val).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;
            }
            return hex;
        };
        HelperMethods.getNumberFromString = function (input) {
            var numbers = [];
            var currentNumber = "";
            for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
                var char = input_1[_i];
                if (/\d|\./.test(char)) {
                    currentNumber += char;
                }
                else if (currentNumber) {
                    numbers.push(parseFloat(currentNumber));
                    currentNumber = "";
                }
            }
            if (currentNumber) {
                numbers.push(parseFloat(currentNumber));
            }
            return parseFloat(numbers.join(''));
        };
        HelperMethods.convertHexToRgb = function (colorCode) {
            var r;
            var g;
            var b;
            if (colorCode) {
                colorCode = colorCode.replace(/[^0-9A-â€Œâ€‹F]/gi, '');
                var colCodeNo = parseInt(colorCode, 16);
                if (colorCode.length === 8) {
                    r = (colCodeNo >> 32) & 255;
                    g = (colCodeNo >> 16) & 255;
                    b = (colCodeNo >> 8) & 255;
                }
                else if (colorCode.length === 6) {
                    r = (colCodeNo >> 16) & 255;
                    g = (colCodeNo >> 8) & 255;
                    b = colCodeNo & 255;
                }
                return { 'r': r, 'g': g, 'b': b };
            }
            return undefined;
        };
        HelperMethods.addCssStyle = function (css) {
            var style = document.createElement('style');
            if (style.style.cssText) {
                style.style.cssText = css;
            }
            else {
                style.appendChild(document.createTextNode(css));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
        };
        HelperMethods.convertNodeListToArray = function (nodeList) {
            var array = [];
            if (!ej2_base_1.isNullOrUndefined(nodeList)) {
                for (var i = 0; i < nodeList.length; i++) {
                    array.push(nodeList[parseInt(i.toString(), 10)]);
                }
            }
            return array;
        };
        HelperMethods.getHighlightColorCode = function (highlightColor) {
            var color = '#ffffff';
            switch (highlightColor) {
                case 'Yellow':
                    color = '#ffff00';
                    break;
                case 'BrightGreen':
                    color = '#00ff00';
                    break;
                case 'Turquoise':
                    color = '#00ffff';
                    break;
                case 'Pink':
                    color = '#ff00ff';
                    break;
                case 'Blue':
                    color = '#0000ff';
                    break;
                case 'Red':
                    color = '#ff0000';
                    break;
                case 'DarkBlue':
                    color = '#000080';
                    break;
                case 'Teal':
                    color = '#008080';
                    break;
                case 'Green':
                    color = '#008000';
                    break;
                case 'Violet':
                    color = '#800080';
                    break;
                case 'DarkRed':
                    color = '#800000';
                    break;
                case 'DarkYellow':
                    color = '#808000';
                    break;
                case 'Gray50':
                    color = '#808080';
                    break;
                case 'Gray25':
                    color = '#c0c0c0';
                    break;
                case 'Black':
                    color = '#000000';
                    break;
            }
            return color;
        };
        HelperMethods.isVeryDark = function (backColor) {
            var backgroundColor = backColor.substring(1);
            var r = parseInt(backgroundColor.substr(0, 2), 16);
            var g = parseInt(backgroundColor.substr(2, 2), 16);
            var b = parseInt(backgroundColor.substr(4, 2), 16);
            var contrast = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return contrast <= 60;
        };
        HelperMethods.getColor = function (color) {
            if (color.length > 0) {
                if (color[0] === '#') {
                    if (color.length > 7) {
                        return color.substr(0, 7);
                    }
                }
            }
            return color;
        };
        HelperMethods.getTextVerticalAlignment = function (textVerticalAlignment) {
            switch (textVerticalAlignment) {
                case 0:
                    return 'Top';
                case 1:
                    return 'Center';
                case 2:
                    return 'Bottom';
                default:
                    return textVerticalAlignment;
            }
        };
        HelperMethods.convertPointToPixel = function (point) {
            point = HelperMethods.round(point, 5);
            var pixel = HelperMethods.round((point * 96 / 72), 5);
            return pixel;
        };
        HelperMethods.convertPixelToPoint = function (pixel) {
            var point = HelperMethods.round((pixel * 72 / 96), 5);
            return point;
        };
        HelperMethods.isLinkedFieldCharacter = function (inline) {
            if (inline instanceof page_2.FieldElementBox && inline.fieldType === 0) {
                return !ej2_base_1.isNullOrUndefined(inline.fieldEnd);
            }
            else if (inline instanceof page_2.FieldElementBox && inline.fieldType === 2) {
                return !ej2_base_1.isNullOrUndefined(inline.fieldBegin) && !ej2_base_1.isNullOrUndefined(inline.fieldEnd);
            }
            else {
                return !ej2_base_1.isNullOrUndefined(inline.fieldBegin);
            }
        };
        HelperMethods.removeSpace = function (text) {
            if (!ej2_base_1.isNullOrUndefined(text) && text.length !== 0) {
                for (var i = 0; i < text.length; i++) {
                    if (text.charAt(i) === ' ') {
                        text = text.replace(' ', '');
                    }
                }
            }
            return text;
        };
        HelperMethods.trimStart = function (text) {
            var i = 0;
            for (i; i < text.length; i++) {
                if (text[parseInt(i.toString(), 10)] !== ' ') {
                    break;
                }
            }
            return text.substring(i, text.length);
        };
        HelperMethods.trimEnd = function (text) {
            var i = text.length - 1;
            for (i; i >= 0; i--) {
                if (text[parseInt(i.toString(), 10)] !== ' ') {
                    break;
                }
            }
            return text.substring(0, i + 1);
        };
        HelperMethods.endsWith = function (text) {
            if (!ej2_base_1.isNullOrUndefined(text) && text.length !== 0) {
                return text[text.length - 1] === ' ';
            }
            return false;
        };
        HelperMethods.addSpace = function (length) {
            var str = '';
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    str += ' ';
                }
            }
            return str;
        };
        HelperMethods.getBoolValue = function (value) {
            return value ? 1 : 0;
        };
        HelperMethods.getBoolInfo = function (value, keywordIndex) {
            if (keywordIndex === 1) {
                return this.getBoolValue(value);
            }
            else {
                return value;
            }
        };
        HelperMethods.parseBoolValue = function (value) {
            if (value instanceof String) {
                if (ej2_base_1.isNullOrUndefined(value) || value === "f" || value === "0" || value === "off" || value === "false") {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                if (value == 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        HelperMethods.getBaselineAlignmentEnumValue = function (baselineAlignment) {
            switch (baselineAlignment) {
                case 'Normal':
                    return 0;
                case 'Superscript':
                    return 1;
                case 'Subscript':
                    return 2;
            }
        };
        HelperMethods.getUnderlineEnumValue = function (underline) {
            switch (underline) {
                case 'None':
                    return 0;
                case 'Single':
                    return 1;
                case 'Words':
                    return 2;
                case 'Double':
                    return 3;
                case 'Dotted':
                    return 4;
                case 'Thick':
                    return 5;
                case 'Dash':
                    return 6;
                case 'DashLong':
                    return 7;
                case 'DotDash':
                    return 8;
                case 'DotDotDash':
                    return 9;
                case 'Wavy':
                    return 10;
                case 'DottedHeavy':
                    return 11;
                case 'DashHeavy':
                    return 12;
                case 'DashLongHeavy':
                    return 13;
                case 'DotDashHeavy':
                    return 14;
                case 'DotDotDashHeavy':
                    return 15;
                case 'WavyHeavy':
                    return 16;
                case 'WavyDouble':
                    return 17;
            }
        };
        HelperMethods.getStrikeThroughEnumValue = function (strikethrough) {
            switch (strikethrough) {
                case 'None':
                    return 0;
                case 'SingleStrike':
                    return 1;
                case 'DoubleStrike':
                    return 2;
            }
        };
        HelperMethods.getHighlightColorEnumValue = function (highlightColor) {
            switch (highlightColor) {
                case 'NoColor':
                    return 0;
                case 'Yellow':
                    return 1;
                case 'BrightGreen':
                    return 2;
                case 'Turquoise':
                    return 3;
                case 'Pink':
                    return 4;
                case 'Blue':
                    return 5;
                case 'Red':
                    return 6;
                case 'DarkBlue':
                    return 7;
                case 'Teal':
                    return 8;
                case 'Green':
                    return 9;
                case 'Violet':
                    return 10;
                case 'DarkRed':
                    return 11;
                case 'DarkYellow':
                    return 12;
                case 'Gray50':
                    return 13;
                case 'Gray25':
                    return 14;
                case 'Black':
                    return 15;
            }
        };
        HelperMethods.getBiDirectionalOverride = function (biDirectionalOverride) {
            switch (biDirectionalOverride) {
                case 'None':
                    return 0;
                case 'LTR':
                    return 1;
                case 'RTL':
                    return 2;
            }
        };
        HelperMethods.getBreakClearType = function (breakClearType) {
            switch (breakClearType) {
                case 'None':
                    return 0;
                case 'Left':
                    return 1;
                case 'Right':
                    return 2;
                case 'All':
                    return 3;
            }
        };
        HelperMethods.getOutlineLevelEnumValue = function (outlineLevel) {
            switch (outlineLevel) {
                case 'BodyText':
                    return 0;
                case 'Level1':
                    return 1;
                case 'Level2':
                    return 2;
                case 'Level3':
                    return 3;
                case 'Level4':
                    return 4;
                case 'Level5':
                    return 5;
                case 'Level6':
                    return 6;
                case 'Level7':
                    return 7;
                case 'Level8':
                    return 8;
                case 'Level9':
                    return 9;
            }
        };
        HelperMethods.getTextAlignmentEnumValue = function (textAlignment) {
            switch (textAlignment) {
                case 'Left':
                    return 0;
                case 'Center':
                    return 1;
                case 'Right':
                    return 2;
                case 'Justify':
                    return 3;
            }
        };
        HelperMethods.getLineStyleEnumValue = function (lineStyle) {
            switch (lineStyle) {
                case 'Single':
                    return 0;
                case 'None':
                    return 1;
                case 'Dot':
                    return 2;
                case 'DashSmallGap':
                    return 3;
                case 'DashLargeGap':
                    return 4;
                case 'DashDot':
                    return 5;
                case 'DashDotDot':
                    return 6;
                case 'Double':
                    return 7;
                case 'Triple':
                    return 8;
                case 'ThinThickSmallGap':
                    return 9;
                case 'ThickThinSmallGap':
                    return 10;
                case 'ThinThickThinSmallGap':
                    return 11;
                case 'ThinThickMediumGap':
                    return 12;
                case 'ThickThinMediumGap':
                    return 13;
                case 'ThinThickThinMediumGap':
                    return 14;
                case 'ThinThickLargeGap':
                    return 15;
                case 'ThickThinLargeGap':
                    return 16;
                case 'ThinThickThinLargeGap':
                    return 17;
                case 'SingleWavy':
                    return 18;
                case 'DoubleWavy':
                    return 19;
                case 'DashDotStroked':
                    return 20;
                case 'Emboss3D':
                    return 21;
                case 'Engrave3D':
                    return 22;
                case 'Outset':
                    return 23;
                case 'Inset':
                    return 24;
                case 'Thick':
                    return 25;
                case 'Cleared':
                    return 26;
            }
        };
        HelperMethods.getLineSpacingTypeEnumValue = function (lineSpacing) {
            switch (lineSpacing) {
                case 'Multiple':
                    return 0;
                case 'AtLeast':
                    return 1;
                case 'Exactly':
                    return 2;
            }
        };
        HelperMethods.writeBorder = function (wBorder, keywordIndex) {
            var border = {};
            border[index_1.colorProperty[keywordIndex]] = wBorder.hasValue('color') ? wBorder.color : undefined;
            border[index_1.hasNoneStyleProperty[keywordIndex]] = wBorder.hasValue('hasNoneStyle') ? HelperMethods.getBoolInfo(wBorder.hasNoneStyle, keywordIndex) : undefined;
            border[index_1.lineStyleProperty[keywordIndex]] = wBorder.hasValue('lineStyle') ?
                keywordIndex == 1 ? this.getLineStyleEnumValue(wBorder.lineStyle) : wBorder.lineStyle : undefined;
            border[index_1.lineWidthProperty[keywordIndex]] = wBorder.hasValue('lineWidth') ? wBorder.lineWidth : undefined;
            border[index_1.shadowProperty[keywordIndex]] = wBorder.hasValue('shadow') ? HelperMethods.getBoolInfo(wBorder.shadow, keywordIndex) : undefined;
            border[index_1.spaceProperty[keywordIndex]] = wBorder.hasValue('space') ? wBorder.space : undefined;
            return border;
        };
        HelperMethods.writeBorders = function (wBorders, keywordIndex) {
            var borders = {};
            borders[index_1.topProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('top'), keywordIndex);
            borders[index_1.leftProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('left'), keywordIndex);
            borders[index_1.rightProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('right'), keywordIndex);
            borders[index_1.bottomProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('bottom'), keywordIndex);
            borders[index_1.horizontalProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('horizontal'), keywordIndex);
            borders[index_1.verticalProperty[keywordIndex]] = this.writeBorder(wBorders.getBorder('vertical'), keywordIndex);
            return borders;
        };
        HelperMethods.writeParagraphFormat = function (paragraphFormat, isInline, format, keywordIndex) {
            keywordIndex = ej2_base_1.isNullOrUndefined(keywordIndex) ? 0 : keywordIndex;
            paragraphFormat[index_1.bordersProperty[keywordIndex]] = this.writeBorders(format.borders, keywordIndex);
            paragraphFormat[index_1.leftIndentProperty[keywordIndex]] = isInline ? format.leftIndent : format.getValue('leftIndent');
            paragraphFormat[index_1.rightIndentProperty[keywordIndex]] = isInline ? format.rightIndent : format.getValue('rightIndent');
            paragraphFormat[index_1.firstLineIndentProperty[keywordIndex]] = isInline ? format.firstLineIndent : format.getValue('firstLineIndent');
            paragraphFormat[index_1.textAlignmentProperty[keywordIndex]] = isInline ?
                keywordIndex == 1 ? this.getTextAlignmentEnumValue(format.textAlignment) : format.textAlignment :
                keywordIndex == 1 ? this.getTextAlignmentEnumValue(format.getValue('textAlignment')) : format.getValue('textAlignment');
            paragraphFormat[index_1.beforeSpacingProperty[keywordIndex]] = isInline ? format.beforeSpacing : format.getValue('beforeSpacing');
            paragraphFormat[index_1.afterSpacingProperty[keywordIndex]] = isInline ? format.afterSpacing : format.getValue('afterSpacing');
            paragraphFormat[index_1.spaceBeforeAutoProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.spaceBeforeAuto, keywordIndex) : format.getValue('spaceBeforeAuto');
            paragraphFormat[index_1.spaceAfterAutoProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.spaceAfterAuto, keywordIndex) : format.getValue('spaceAfterAuto');
            paragraphFormat[index_1.lineSpacingProperty[keywordIndex]] = isInline ? format.lineSpacing : format.getValue('lineSpacing');
            paragraphFormat[index_1.lineSpacingTypeProperty[keywordIndex]] = isInline ?
                keywordIndex == 1 ? this.getLineSpacingTypeEnumValue(format.lineSpacingType) : format.lineSpacingType :
                keywordIndex == 1 ? this.getLineSpacingTypeEnumValue(format.getValue('lineSpacingType')) : format.getValue('lineSpacingType');
            paragraphFormat[index_1.styleNameProperty[keywordIndex]] = !ej2_base_1.isNullOrUndefined(format.baseStyle) ? format.baseStyle.name : undefined;
            paragraphFormat[index_1.outlineLevelProperty[keywordIndex]] = isInline ?
                keywordIndex == 1 ? this.getOutlineLevelEnumValue(format.outlineLevel) : format.outlineLevel :
                keywordIndex == 1 ? this.getOutlineLevelEnumValue(format.getValue('outlineLevel')) : format.getValue('outlineLevel');
            paragraphFormat[index_1.bidiProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.bidi, keywordIndex) : format.getValue('bidi');
            paragraphFormat[index_1.keepLinesTogetherProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.keepLinesTogether, keywordIndex) : format.getValue('keepLinesTogether');
            paragraphFormat[index_1.keepWithNextProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.keepWithNext, keywordIndex) : format.getValue('keepWithNext');
            paragraphFormat[index_1.contextualSpacingProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.contextualSpacing, keywordIndex) : format.getValue('contextualSpacing');
            paragraphFormat[index_1.widowControlProperty[keywordIndex]] = isInline ? HelperMethods.getBoolInfo(format.widowControl, keywordIndex) : format.getValue('widowControl');
        };
        HelperMethods.writeCharacterFormat = function (characterFormat, isInline, format, keywordIndex, isWriteAllValues) {
            keywordIndex = ej2_base_1.isNullOrUndefined(keywordIndex) ? 0 : keywordIndex;
            characterFormat[index_1.boldProperty[keywordIndex]] = isWriteAllValues ? HelperMethods.getBoolInfo(format.bold, keywordIndex) : isInline ? HelperMethods.getBoolInfo(format.bold, keywordIndex) : format.getValue('bold');
            characterFormat[index_1.italicProperty[keywordIndex]] = isWriteAllValues ? HelperMethods.getBoolInfo(format.italic, keywordIndex) : isInline ? HelperMethods.getBoolInfo(format.italic, keywordIndex) : format.getValue('italic');
            characterFormat[index_1.fontSizeProperty[keywordIndex]] = isWriteAllValues ? format.fontSize : isInline ? this.toWriteInline(format, 'fontSize') : format.getValue('fontSize');
            characterFormat[index_1.fontFamilyProperty[keywordIndex]] = isWriteAllValues ? format.fontFamily : isInline ? this.toWriteInline(format, 'fontFamily') : format.getValue('fontFamily');
            characterFormat[index_1.underlineProperty[keywordIndex]] = isWriteAllValues ? format.underline : isInline ?
                keywordIndex == 1 ? HelperMethods.getUnderlineEnumValue(format.underline) : format.underline :
                keywordIndex == 1 ? HelperMethods.getUnderlineEnumValue(format.getValue('underline')) : format.getValue('underline');
            characterFormat[index_1.strikethroughProperty[keywordIndex]] = isWriteAllValues ? format.strikethrough : isInline ?
                keywordIndex == 1 ? HelperMethods.getStrikeThroughEnumValue(format.strikethrough) : (format.strikethrough) :
                keywordIndex == 1 ? HelperMethods.getStrikeThroughEnumValue(format.getValue('strikethrough')) : format.getValue('strikethrough');
            characterFormat[index_1.baselineAlignmentProperty[keywordIndex]] = isWriteAllValues ? format.baselineAlignment : isInline ?
                keywordIndex == 1 ? HelperMethods.getBaselineAlignmentEnumValue(format.baselineAlignment) : (format.baselineAlignment) :
                keywordIndex == 1 ? HelperMethods.getBaselineAlignmentEnumValue(format.getValue('baselineAlignment')) : format.getValue('baselineAlignment');
            characterFormat[index_1.highlightColorProperty[keywordIndex]] = isWriteAllValues ? format.highlightColor : isInline ?
                keywordIndex == 1 ? HelperMethods.getHighlightColorEnumValue(format.highlightColor) : (format.highlightColor) :
                keywordIndex == 1 ? HelperMethods.getHighlightColorEnumValue(format.getValue('highlightColor')) : format.getValue('highlightColor');
            characterFormat[index_1.fontColorProperty[keywordIndex]] = isWriteAllValues ? format.fontColor : isInline ? this.toWriteInline(format, 'fontColor') : format.getValue('fontColor');
            characterFormat[index_1.styleNameProperty[keywordIndex]] = !ej2_base_1.isNullOrUndefined(format.baseCharStyle) ? format.baseCharStyle.name : undefined;
            characterFormat[index_1.bidiProperty[keywordIndex]] = isWriteAllValues ? format.bidi : isInline ? HelperMethods.getBoolInfo(format.bidi, keywordIndex) : format.getValue('bidi');
            characterFormat[index_1.bdoProperty[keywordIndex]] = isWriteAllValues ? format.bdo : isInline ?
                keywordIndex == 1 ? HelperMethods.getBiDirectionalOverride(format.bdo) : (format.bdo) :
                keywordIndex == 1 ? HelperMethods.getBiDirectionalOverride(format.getValue('bdo')) : format.getValue('bdo');
            characterFormat[index_1.boldBidiProperty[keywordIndex]] = isWriteAllValues ? format.boldBidi : isInline ? HelperMethods.getBoolInfo(format.boldBidi, keywordIndex) : format.getValue('boldBidi');
            characterFormat[index_1.italicBidiProperty[keywordIndex]] = isWriteAllValues ? format.italicBidi : isInline ? HelperMethods.getBoolInfo(format.italicBidi, keywordIndex) : format.getValue('italicBidi');
            characterFormat[index_1.fontSizeBidiProperty[keywordIndex]] = isWriteAllValues ? format.fontSizeBidi : isInline ? format.fontSizeBidi : format.getValue('fontSizeBidi');
            characterFormat[index_1.fontFamilyBidiProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyBidi : isInline ? format.fontFamilyBidi : format.getValue('fontFamilyBidi');
            characterFormat[index_1.allCapsProperty[keywordIndex]] = isWriteAllValues ? format.allCaps : isInline ? HelperMethods.getBoolInfo(format.allCaps, keywordIndex) : format.getValue('allCaps');
            characterFormat[index_1.localeIdBidiProperty[keywordIndex]] = isWriteAllValues ? format.localeIdBidi : isInline ? format.localeIdBidi : format.getValue('localeIdBidi');
            characterFormat[index_1.complexScriptProperty[keywordIndex]] = isWriteAllValues ? format.complexScript : isInline ? HelperMethods.getBoolInfo(format.complexScript, keywordIndex) : format.getValue('complexScript');
            characterFormat[index_1.fontFamilyAsciiProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyAscii : isInline ? this.toWriteInline(format, 'fontFamilyAscii') : format.getValue('fontFamilyAscii');
            characterFormat[index_1.fontFamilyNonFarEastProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyNonFarEast : isInline ? this.toWriteInline(format, 'fontFamilyNonFarEast') : format.getValue('fontFamilyNonFarEast');
            characterFormat[index_1.fontFamilyFarEastProperty[keywordIndex]] = isWriteAllValues ? format.fontFamilyFarEast : isInline ? this.toWriteInline(format, 'fontFamilyFarEast') : format.getValue('fontFamilyFarEast');
            characterFormat[index_1.characterSpacingProperty[keywordIndex]] = isWriteAllValues ? format.characterSpacing : isInline ? this.toWriteInline(format, 'characterSpacing') : format.getValue('characterSpacing');
            characterFormat[index_1.scalingProperty[keywordIndex]] = isWriteAllValues ? format.scaling : isInline ? this.toWriteInline(format, 'scaling') : format.getValue('scaling');
            if (format.hasValue('fontFamily') || isWriteAllValues) {
                if (ej2_base_1.isNullOrUndefined(characterFormat[index_1.fontFamilyAsciiProperty[keywordIndex]])) {
                    characterFormat[index_1.fontFamilyAsciiProperty[keywordIndex]] = format.fontFamily;
                }
                if (ej2_base_1.isNullOrUndefined(characterFormat[index_1.fontFamilyNonFarEastProperty[keywordIndex]])) {
                    characterFormat[index_1.fontFamilyNonFarEastProperty[keywordIndex]] = format.fontFamily;
                }
                if (ej2_base_1.isNullOrUndefined(characterFormat[index_1.fontFamilyFarEastProperty[keywordIndex]])) {
                    characterFormat[index_1.fontFamilyFarEastProperty[keywordIndex]] = format.fontFamily;
                }
            }
        };
        HelperMethods.isThemeFont = function (fontName) {
            return (fontName == "majorAscii" || fontName == "majorBidi" || fontName == "majorEastAsia"
                || fontName == "majorHAnsi" || fontName == "minorAscii" || fontName == "minorBidi" || fontName == "minorEastAsia"
                || fontName == "minorHAnsi");
        };
        HelperMethods.toWriteInline = function (format, propertyName) {
            if (!ej2_base_1.isNullOrUndefined(format.ownerBase) && (format.ownerBase instanceof page_1.ElementBox)) {
                return format.hasValue(propertyName) ? format[propertyName] : format.getValue(propertyName);
            }
            else {
                return format[propertyName];
            }
        };
        HelperMethods.round = function (value, decimalDigits) {
            var temp = value;
            for (var i = 0; i < decimalDigits; i++) {
                temp = temp * 10;
            }
            temp = Math.round(temp);
            for (var i = 0; i < decimalDigits; i++) {
                temp = temp / 10;
            }
            return temp;
        };
        HelperMethods.removeInvalidXmlChars = function (text) {
            var invalidXMLChars = /[^\x09\x0A\x0C\x0D\v\f\r\u000E\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/ug;
            return text.replace(invalidXMLChars, '');
        };
        HelperMethods.reverseString = function (text) {
            if (!ej2_base_1.isNullOrUndefined(text) && text !== '') {
                var splitString = text.split('');
                var reverseString = splitString.reverse();
                text = reverseString.join('');
            }
            return text;
        };
        HelperMethods.formatClippedString = function (base64ImageString) {
            var extension = '';
            var formatClippedString = '';
            if (this.startsWith(base64ImageString, 'data:image/svg+xml;base64,')) {
                extension = '.svg';
                formatClippedString = base64ImageString.replace('data:image/svg+xml;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/svg+xml;utf8,')) {
                extension = '.svg';
                formatClippedString = base64ImageString.replace('data:image/svg+xml;utf8,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/bmp;base64,')) {
                extension = '.bmp';
                formatClippedString = base64ImageString.replace('data:image/bmp;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/x-emf;base64,')) {
                extension = '.emf';
                formatClippedString = base64ImageString.replace('data:image/x-emf;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/exif;base64,')) {
                extension = '.exif';
                formatClippedString = base64ImageString.replace('data:image/exif;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/gif;base64,')) {
                extension = '.gif';
                formatClippedString = base64ImageString.replace('data:image/gif;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/icon;base64,')) {
                extension = '.ico';
                formatClippedString = base64ImageString.replace('data:image/icon;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/jpeg;base64,')) {
                extension = '.jpeg';
                formatClippedString = base64ImageString.replace('data:image/jpeg;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/jpg;base64,')) {
                extension = '.jpg';
                formatClippedString = base64ImageString.replace('data:image/jpg;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/png;base64,')) {
                extension = '.png';
                formatClippedString = base64ImageString.replace('data:image/png;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/tiff;base64,')) {
                extension = '.tif';
                formatClippedString = base64ImageString.replace('data:image/tiff;base64,', '');
            }
            else if (this.startsWith(base64ImageString, 'data:image/x-wmf;base64,')) {
                extension = '.wmf';
                formatClippedString = base64ImageString.replace('data:image/x-wmf;base64,', '');
            }
            else {
                extension = '.jpeg';
            }
            return { 'extension': extension, 'formatClippedString': formatClippedString };
        };
        HelperMethods.startsWith = function (sourceString, startString) {
            return startString.length > 0 && sourceString.substring(0, startString.length) === startString;
        };
        HelperMethods.formatText = function (format, value) {
            var text = value;
            switch (format.toLowerCase()) {
                case 'uppercase':
                    text = value.toUpperCase();
                    break;
                case 'lowercase':
                    text = value.toLowerCase();
                    break;
                case 'firstlower':
                    text = this.lowerFirstChar(value);
                    break;
                case 'firstcapital':
                    text = this.capitaliseFirst(value, 'FirstCapital');
                    break;
                case 'titlecase':
                    text = this.capitaliseFirst(value, 'Titlecase');
                    break;
            }
            return text;
        };
        HelperMethods.formatNumber = function (format, value) {
            var intl = new ej2_base_1.Internationalization();
            var dotData = value.split('.');
            value = dotData[0];
            var numberValue = intl.parseNumber(value);
            if (value.toString() === 'NaN') {
                return '';
            }
            if (format === '') {
                format = '0';
            }
            var numberFormat = { format: format };
            return intl.formatNumber(numberValue, numberFormat);
        };
        HelperMethods.formatDate = function (format, value) {
            var intl = new ej2_base_1.Internationalization();
            var date = new Date(value);
            if (isNaN(date.getDate())) {
                return '';
            }
            if (format === '') {
                return value;
            }
            if (format.indexOf('am/pm') !== -1) {
                format = format.replace(/am\/pm/gi, 'a');
            }
            var dateFormat = { 'format': format };
            return intl.formatDate(date, dateFormat);
        };
        HelperMethods.capitaliseFirst = function (value, type, splitBy) {
            var text = '';
            if (type === 'Titlecase') {
                var valArry = splitBy ? value.split(splitBy) : value.split(' ');
                for (var i = 0; i < valArry.length; i++) {
                    text += splitBy ? valArry[parseInt(i.toString(), 10)].charAt(0).toUpperCase() + valArry[parseInt(i.toString(), 10)].slice(1, valArry[parseInt(i.toString(), 10)].length) : this.capitaliseFirstInternal(valArry[parseInt(i.toString(), 10)]);
                    if (valArry.length >= 0 && !splitBy) {
                        text += ' ';
                    }
                }
                if (!splitBy) {
                    text = this.capitaliseFirst(text, 'Titlecase', '\r');
                }
            }
            else if (type === 'FirstCapital') {
                text = this.capitaliseFirstInternal(value);
            }
            return text;
        };
        HelperMethods.lowerFirstChar = function (value) {
            return (value.charAt(0).toLowerCase() + value.slice(1, value.length));
        };
        HelperMethods.capitaliseFirstInternal = function (value) {
            return (value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase());
        };
        HelperMethods.getModifiedDate = function (date) {
            var modifiedDate = HelperMethods.getLocaleDate(date);
            var dateString = modifiedDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
            var time = modifiedDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
            var dateTime = dateString + ' ' + time;
            return dateTime;
        };
        HelperMethods.getUtcDate = function () {
            var now = new Date();
            return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
        };
        HelperMethods.getLocaleDate = function (date) {
            var dt = new Date(date);
            return new Date(dt.getTime() + dt.getTimezoneOffset() * 60000);
        };
        HelperMethods.getCompatibilityModeValue = function (compatibilityMode) {
            var compatValue;
            switch (compatibilityMode) {
                case 1:
                    compatValue = '11';
                    break;
                case 2:
                    compatValue = '12';
                    break;
                case 3:
                    compatValue = '14';
                    break;
                default:
                    compatValue = '15';
                    break;
            }
            return compatValue;
        };
        HelperMethods.getUniqueElementId = function () {
            return 'de_element' + Date.now().toString(36) + Math.random().toString(36).substring(2);
        };
        HelperMethods.splitSpaceInTextElementBox = function (element, fromStart) {
            var elementText = element.text;
            var emptySpace = "";
            if (fromStart) {
                while (HelperMethods.startsWith(elementText, " ")) {
                    emptySpace += ' ';
                    elementText = elementText.substring(1);
                }
            }
            else {
                while (HelperMethods.endsWith(elementText)) {
                    emptySpace += ' ';
                    elementText = elementText.slice(0, -1);
                }
            }
            if (emptySpace != "") {
                var textBox = new page_1.TextElementBox();
                textBox.characterFormat.copyFormat(element.characterFormat);
                if (element.revisions.length > 0) {
                    for (var i = 0; i < element.revisions.length; i++) {
                        var currentRevision = element.revisions[i];
                        textBox.revisions.push(currentRevision);
                        var rangeIndex = currentRevision.range.indexOf(element);
                        if (rangeIndex < 0) {
                            currentRevision.range.push(textBox);
                        }
                        else {
                            currentRevision.range.splice(rangeIndex + 1, 0, textBox);
                        }
                    }
                    textBox.isMarkedForRevision = element.isMarkedForRevision;
                }
                textBox.line = element.line;
                var lineChildren = textBox.line.children;
                if (fromStart) {
                    element.text = emptySpace;
                    textBox.text = elementText;
                }
                else {
                    element.text = elementText;
                    textBox.text = emptySpace;
                }
                lineChildren.splice(lineChildren.indexOf(element) + 1, 0, textBox);
            }
        };
        HelperMethods.getTextIndexAfterWhitespace = function (text, startIndex) {
            var length = text.length;
            var index = 0;
            index = text.indexOf(' ', startIndex) + 1;
            var nextIndex = index;
            if (nextIndex === 0 || nextIndex === length) {
                return nextIndex;
            }
            while (text[nextIndex] === ' ') {
                nextIndex++;
                if (nextIndex === length) {
                    break;
                }
            }
            return nextIndex;
        };
        HelperMethods.splitWordByMaxLength = function (textElementBox, lineWidget, isInitialParsing) {
            var text = textElementBox.text;
            var index = 0;
            var textLength = text.length;
            var maxLength = 90;
            var splittedText = '';
            var characterFormat = textElementBox.characterFormat;
            var revisions = textElementBox.revisions;
            var spanIndex = lineWidget.children.indexOf(textElementBox);
            while (index < textLength) {
                var nextIndex = index + maxLength;
                if (nextIndex > textLength) {
                    nextIndex = textLength;
                }
                var spaceIndex = HelperMethods.getTextIndexAfterWhitespace(text, nextIndex);
                if (spaceIndex === 0 || spaceIndex > textLength) {
                    spaceIndex = nextIndex;
                }
                splittedText = text.substring(index, spaceIndex);
                if (index === 0) {
                    textElementBox.text = splittedText;
                }
                else {
                    var splittedElement = new page_1.TextElementBox();
                    splittedElement.text = splittedText;
                    splittedElement.line = lineWidget;
                    splittedElement.characterFormat.copyFormat(characterFormat);
                    if (revisions.length > 0) {
                        for (var i = 0; i < revisions.length; i++) {
                            var revision = revisions[i];
                            splittedElement.revisions.push(revision);
                            var rangeIndex = revision.range.indexOf(textElementBox);
                            if (rangeIndex < 0) {
                                revision.range.push(splittedElement);
                            }
                            else {
                                revision.range.splice(rangeIndex + 1, 0, splittedElement);
                            }
                        }
                    }
                    if (isInitialParsing) {
                        lineWidget.children.push(splittedElement);
                    }
                    else {
                        lineWidget.children.splice(spanIndex + 1, 0, splittedElement);
                        spanIndex++;
                    }
                }
                index = spaceIndex;
            }
        };
        return HelperMethods;
    }());
    HelperMethods.wordBefore = '\\b';
    HelperMethods.wordAfter = '\\b';
    HelperMethods.wordSplitCharacters = [' ', ',', '.', ':', ';', '<', '>', '=',
        '+', '-', '_', '{', '}', '[', ']', '`', '~', '!', '@', '#', '$', '%', '^', '&',
        '*', '(', ')', '"', '?', '/', '|', '\\', '”', '　', '،', '؟', '؛', '’', '‘'];
    exports.HelperMethods = HelperMethods;
    var Point = (function () {
        function Point(xPosition, yPosition) {
            this.xIn = 0;
            this.yIn = 0;
            this.xIn = xPosition;
            this.yIn = yPosition;
        }
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this.xIn;
            },
            set: function (value) {
                this.xIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this.yIn;
            },
            set: function (value) {
                this.yIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Point.prototype.copy = function (point) {
            this.xIn = point.xIn;
            this.yIn = point.yIn;
        };
        Point.prototype.destroy = function () {
            this.xIn = undefined;
            this.yIn = undefined;
        };
        return Point;
    }());
    exports.Point = Point;
    var Base64 = (function () {
        function Base64() {
            this.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        }
        Base64.prototype.encodeString = function (input) {
            var output = '';
            var chr1;
            var chr2;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4;
            var i = 0;
            input = this.unicodeEncode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
            }
            return output;
        };
        Base64.prototype.unicodeEncode = function (input) {
            var tempInput = input.replace(/\r\n/g, '\n');
            var utftext = '';
            for (var n = 0; n < tempInput.length; n++) {
                var c = tempInput.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        Base64.prototype.decodeString = function (input) {
            var chr1;
            var chr2;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4;
            var i = 0;
            var resultIndex = 0;
            input = input.replace(/[^A-Za-z0-9+/=]/g, '');
            var totalLength = input.length * 3 / 4;
            if (input.charAt(input.length - 1) === this.keyStr.charAt(64)) {
                totalLength--;
            }
            if (input.charAt(input.length - 2) === this.keyStr.charAt(64)) {
                totalLength--;
            }
            if (totalLength % 1 !== 0) {
                throw new Error('Invalid base64 input, bad content length.');
            }
            var output = new Uint8Array(totalLength | 0);
            while (i < input.length) {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output[resultIndex++] = chr1;
                if (enc3 !== 64) {
                    output[resultIndex++] = chr2;
                }
                if (enc4 !== 64) {
                    output[resultIndex++] = chr3;
                }
            }
            return output;
        };
        Base64.prototype.destroy = function () {
            this.keyStr = undefined;
        };
        return Base64;
    }());
    exports.Base64 = Base64;
    var WrapPosition = (function () {
        function WrapPosition(x, width) {
            this.x = 0;
            this.width = 0;
            this.x = x;
            this.width = width;
        }
        Object.defineProperty(WrapPosition.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        return WrapPosition;
    }());
    exports.WrapPosition = WrapPosition;
});
