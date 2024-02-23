define(["require", "exports", "@syncfusion/ej2-base", "../index", "../../index", "../editor/editor-helper", "../../index"], function (require, exports, ej2_base_1, index_1, index_2, editor_helper_1, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextHelper = (function () {
        function TextHelper(documentHelper) {
            this.paragraphMarkInfo = {};
            this.documentHelper = documentHelper;
            if (!ej2_base_1.isNullOrUndefined(documentHelper)) {
                this.context = documentHelper.containerContext;
            }
        }
        Object.defineProperty(TextHelper.prototype, "paragraphMark", {
            get: function () {
                return '¶';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextHelper.prototype, "lineBreakMark", {
            get: function () {
                return '↲';
            },
            enumerable: true,
            configurable: true
        });
        TextHelper.prototype.getEnSpaceCharacter = function () {
            return String.fromCharCode(8194);
        };
        TextHelper.prototype.repeatChar = function (char, count) {
            var text = '';
            for (var i = 0; i < count; i++) {
                text += char;
            }
            return text;
        };
        TextHelper.prototype.getParagraphMarkWidth = function (characterFormat) {
            return this.getParagraphMarkSize(characterFormat).Width;
        };
        TextHelper.prototype.getParagraphMarkSize = function (characterFormat) {
            var format = this.getFormatText(characterFormat);
            if (this.paragraphMarkInfo["" + format]) {
                return this.paragraphMarkInfo["" + format];
            }
            var width = this.getWidth(this.paragraphMark, characterFormat);
            var textHelper = this.getHeight(characterFormat);
            var textSizeInfo = {
                'Width': width, 'Height': textHelper.Height, 'BaselineOffset': textHelper.BaselineOffset
            };
            return this.paragraphMarkInfo["" + format] = textSizeInfo;
        };
        TextHelper.prototype.getTextSize = function (elementBox, characterFormat) {
            var textTrimEndWidth = 0;
            var isRTL = characterFormat.bidi || this.isRTLText(elementBox.text);
            var text = this.setText(elementBox.text, isRTL, characterFormat.bdo);
            if (text === '\r') {
                text = String.fromCharCode(182);
            }
            textTrimEndWidth = this.getWidth(text, characterFormat, elementBox.scriptType);
            elementBox.width = textTrimEndWidth;
            var textHelper = this.getHeight(characterFormat, elementBox.scriptType);
            if (!(this.documentHelper.compatibilityMode === 'Word2003' && elementBox.isColumnBreak)) {
                elementBox.height = textHelper.Height;
            }
            elementBox.baselineOffset = textHelper.BaselineOffset;
            if (elementBox.text[elementBox.text.length - 1] === ' ') {
                textTrimEndWidth = this.getWidth(editor_helper_1.HelperMethods.trimEnd(elementBox.text), characterFormat, elementBox.scriptType);
            }
            elementBox.trimEndWidth = textTrimEndWidth;
            return textTrimEndWidth;
        };
        TextHelper.prototype.getHeight = function (characterFormat, scriptType) {
            var fontToRender = this.getFontNameToRender(scriptType, characterFormat);
            var key = this.getFormatText(characterFormat, fontToRender);
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.heightInfoCollection["" + key])) {
                return this.documentHelper.heightInfoCollection["" + key];
            }
            var sizeInfo = this.documentHelper.owner.textMeasureHelper.getHeightInternal(characterFormat, fontToRender);
            this.documentHelper.heightInfoCollection["" + key] = sizeInfo;
            return sizeInfo;
        };
        TextHelper.prototype.getFormatText = function (characterFormat, fontToRender) {
            var formatText = '';
            if (!ej2_base_1.isNullOrUndefined(fontToRender)) {
                formatText = fontToRender.toLocaleLowerCase();
            }
            else {
                formatText = characterFormat.fontFamily.toLocaleLowerCase();
            }
            formatText += ';' + characterFormat.fontSize;
            if (characterFormat.bold) {
                formatText += ';' + 'bold';
            }
            if (characterFormat.italic) {
                formatText += ';' + 'italic';
            }
            return formatText;
        };
        TextHelper.prototype.measureTextExcludingSpaceAtEnd = function (text, characterFormat, scriptType) {
            return this.getWidth(editor_helper_1.HelperMethods.trimEnd(text), characterFormat, scriptType);
        };
        TextHelper.prototype.getWidth = function (text, characterFormat, scriptType) {
            if (text.match('\v')) {
                text.replace('\v', this.lineBreakMark);
            }
            var bold = '';
            var italic = '';
            var fontFamily = '';
            var fontSize = characterFormat.fontSize;
            bold = characterFormat.bold ? 'bold' : '';
            italic = characterFormat.italic ? 'italic' : '';
            fontFamily = this.getFontNameToRender(scriptType, characterFormat);
            fontSize = fontSize === 0 ? 0.5 : fontSize / (characterFormat.baselineAlignment === 'Normal' ? 1 : 1.5);
            this.context.font = bold + ' ' + italic + ' ' + fontSize + 'pt' + ' ' + '"' + fontFamily + '"';
            this.context.letterSpacing = characterFormat.characterSpacing + 'pt';
            var scaleFactor = (characterFormat.scaling / 100);
            if (characterFormat.allCaps) {
                text = text.toUpperCase();
            }
            if (text == "\u0336") {
                text += "A";
            }
            return Math.abs(this.context.measureText(text).width * scaleFactor);
        };
        TextHelper.prototype.setText = function (textToRender, isBidi, bdo, isRender) {
            if (ej2_base_1.isNullOrUndefined(isRender)) {
                isRender = false;
            }
            if (textToRender.length === 0) {
                return '';
            }
            var isRtlText = isBidi;
            if ((!isRtlText && (bdo === 'RTL')) || (isRtlText && (bdo === 'LTR'))) {
                textToRender = editor_helper_1.HelperMethods.reverseString(textToRender);
            }
            else if (isRender && isRtlText && editor_helper_1.HelperMethods.endsWith(textToRender)) {
                var spaceCount = textToRender.length - editor_helper_1.HelperMethods.trimEnd(textToRender).length;
                textToRender = editor_helper_1.HelperMethods.addSpace(spaceCount) + editor_helper_1.HelperMethods.trimEnd(textToRender);
            }
            return textToRender;
        };
        TextHelper.prototype.measureText = function (text, characterFormat, scriptType) {
            var width = this.getWidth(text, characterFormat, scriptType);
            var textHelper = this.getHeight(characterFormat, scriptType);
            return {
                'Width': width, 'Height': textHelper.Height, 'BaselineOffset': textHelper.BaselineOffset
            };
        };
        TextHelper.prototype.updateTextSize = function (elementBox, paragraph) {
            var format = new index_1.WCharacterFormat(undefined);
            var listCharacterFormat = elementBox.listLevel.characterFormat;
            var breakCharacterFormat = paragraph.characterFormat;
            format.fontSize = listCharacterFormat.hasValue('fontSize') ? listCharacterFormat.fontSize : breakCharacterFormat.fontSize;
            format.fontFamily = listCharacterFormat.hasValue('fontFamily') ? listCharacterFormat.fontFamily : breakCharacterFormat.fontFamily;
            var bold = '';
            var italic = '';
            var baselineAlignment = listCharacterFormat.baselineAlignment === 'Normal' ?
                breakCharacterFormat.baselineAlignment : listCharacterFormat.baselineAlignment;
            bold = listCharacterFormat.hasValue('bold') ? listCharacterFormat.bold ? 'bold' : '' : breakCharacterFormat.bold ? 'bold' : '';
            italic = listCharacterFormat.hasValue('italic') ? listCharacterFormat.italic ? 'italic' : ''
                : breakCharacterFormat.italic ? 'italic' : '';
            format.baselineAlignment = baselineAlignment;
            if (bold) {
                format.bold = true;
            }
            if (italic) {
                format.italic = true;
            }
            var isRTL = format.bidi || this.isRTLText(elementBox.text);
            var text = this.setText(elementBox.text, isRTL, format.bdo);
            elementBox.width = this.getWidth(text, format);
            var textHelper = this.getHeight(format);
            elementBox.height = textHelper.Height;
            elementBox.baselineOffset = textHelper.BaselineOffset;
            format.destroy();
        };
        TextHelper.prototype.containsSpecialCharAlone = function (text) {
            var specialChars = '*|.\:[]{}-`\;()@&$#%!~?,' + ' ' + "'";
            for (var i = 0; i < text.length; i++) {
                if (specialChars.indexOf(text.charAt(i)) === -1) {
                    return false;
                }
            }
            return true;
        };
        TextHelper.prototype.containsNumberAlone = function (text) {
            var number = '0123456789';
            if (text === '') {
                return false;
            }
            for (var i = 0; i < text.length; i++) {
                if (number.indexOf(text.charAt(i)) === -1) {
                    return false;
                }
            }
            return true;
        };
        TextHelper.prototype.containsCombinationText = function (element) {
            if (element.text.match(/^[0-9]+$/) && element.paragraph.bidi) {
                return true;
            }
            else {
                return false;
            }
        };
        TextHelper.prototype.inverseCharacter = function (ch) {
            switch (ch) {
                case '(':
                    return ')';
                case ')':
                    return '(';
                case '<':
                    return '>';
                case '>':
                    return '<';
                case '{':
                    return '}';
                case '}':
                    return '{';
                case '[':
                    return ']';
                case ']':
                    return '[';
                default:
                    return ch;
            }
        };
        TextHelper.prototype.containsSpecialChar = function (text) {
            var specialChars = '*|.\:[]{}-`\;()@&$#%!~?' + ' ';
            for (var i = 0; i < text.length; i++) {
                if (specialChars.indexOf(text.charAt(i)) !== -1) {
                    return true;
                }
            }
            return false;
        };
        TextHelper.prototype.isRTLText = function (text) {
            var isRTL = false;
            if (!ej2_base_1.isNullOrUndefined(text)) {
                for (var i = 0; i < text.length; i++) {
                    var temp = text[i];
                    if ((temp >= String.fromCharCode(1424) && temp <= String.fromCharCode(1535))
                        || (temp >= String.fromCharCode(64285) && temp <= String.fromCharCode(64335))
                        || (temp >= String.fromCharCode(1536) && temp <= String.fromCharCode(1791))
                        || (temp >= String.fromCharCode(1872) && temp <= String.fromCharCode(1919))
                        || (temp >= String.fromCharCode(2208) && temp <= String.fromCharCode(2303))
                        || (temp >= String.fromCharCode(64336) && temp <= String.fromCharCode(65023))
                        || (temp >= String.fromCharCode(65136) && temp <= String.fromCharCode(65279))
                        || (temp >= String.fromCharCode(43392) && temp <= String.fromCharCode(43487))
                        || (temp >= String.fromCharCode(1792) && temp <= String.fromCharCode(1871))
                        || (temp >= String.fromCharCode(1920) && temp <= String.fromCharCode(1983))
                        || (temp >= String.fromCharCode(2112) && temp <= String.fromCharCode(2143))
                        || (temp >= String.fromCharCode(1984) && temp <= String.fromCharCode(2047))
                        || (temp >= String.fromCharCode(2048) && temp <= String.fromCharCode(2111))
                        || (temp >= String.fromCharCode(11568) && temp <= String.fromCharCode(11647))) {
                        isRTL = true;
                        break;
                    }
                }
            }
            return isRTL;
        };
        TextHelper.prototype.isUnicodeText = function (text, scriptType) {
            var isUnicode = false;
            if (!ej2_base_1.isNullOrUndefined(text)) {
                for (var i = 0; i < text.length; i++) {
                    var temp = text[i];
                    if (((temp >= '\u3000' && temp <= '\u30ff')
                        || (temp >= '\uff00' && temp <= '\uffef')
                        || (temp >= '\u4e00' && temp <= '\u9faf')
                        || (temp >= '\u3400' && temp <= '\u4dbf')
                        || (temp >= '\uac00' && temp <= '\uffef')
                        || (temp >= '\u0d80' && temp <= '\u0dff')) && scriptType !== 0) {
                        isUnicode = true;
                        break;
                    }
                }
            }
            return isUnicode;
        };
        TextHelper.prototype.getRtlLanguage = function (text) {
            if (ej2_base_1.isNullOrUndefined(text) || text === '') {
                return { isRtl: false, id: 0 };
            }
            if (text >= String.fromCharCode(1424) && text <= String.fromCharCode(1535)) {
                return { isRtl: true, id: 1 };
            }
            else if ((text >= String.fromCharCode(1536) && text <= String.fromCharCode(1791))
                || (text >= String.fromCharCode(1872) && text <= String.fromCharCode(1919))
                || (text >= String.fromCharCode(2208) && text <= String.fromCharCode(2303))
                || (text >= String.fromCharCode(64336) && text <= String.fromCharCode(65023))
                || (text >= String.fromCharCode(65136) && text <= String.fromCharCode(65279))) {
                return { isRtl: true, id: 2 };
            }
            else if (text >= String.fromCharCode(43392) && text <= String.fromCharCode(43487)) {
                return { isRtl: true, id: 3 };
            }
            else if (text >= String.fromCharCode(1792) && text <= String.fromCharCode(1871)) {
                return { isRtl: true, id: 4 };
            }
            else if (text >= String.fromCharCode(1920) && text <= String.fromCharCode(1983)) {
                return { isRtl: true, id: 5 };
            }
            else if (text >= String.fromCharCode(2112) && text <= String.fromCharCode(2143)) {
                return { isRtl: true, id: 6 };
            }
            else if (text >= String.fromCharCode(1984) && text <= String.fromCharCode(2047)) {
                return { isRtl: true, id: 7 };
            }
            else if (text >= String.fromCharCode(2048) && text <= String.fromCharCode(2111)) {
                return { isRtl: true, id: 8 };
            }
            else if (text >= String.fromCharCode(11568) && text <= String.fromCharCode(11647)) {
                return { isRtl: true, id: 9 };
            }
            return { isRtl: false, id: 0 };
        };
        TextHelper.prototype.splitTextByConsecutiveLtrAndRtl = function (text, isTextBidi, isRTLLang, characterRangeTypes, isPrevLTRText, hasRTLCharacter) {
            var charTypeIndex = characterRangeTypes.length;
            var splittedText = [];
            if (ej2_base_1.isNullOrUndefined(text) || text === '') {
                return splittedText;
            }
            var lastLtrIndex = -1;
            var ltrText = '';
            var rtlText = '';
            var wordSplitChars = '';
            var numberText = '';
            for (var i = 0; i < text.length; i++) {
                var currentCharacterType = 0;
                var separateEachWordSplitChars = false;
                if ((!ej2_base_1.isNullOrUndefined(isPrevLTRText.value) ? !isPrevLTRText.value : isTextBidi) && this.isNumber(text[i])) {
                    numberText += text[i];
                    currentCharacterType = 4;
                }
                else if (this.isWordSplitChar(text[i])) {
                    currentCharacterType = 2;
                    if (separateEachWordSplitChars = (isTextBidi || (text.charCodeAt(i) == 32 && wordSplitChars == ''))) {
                        wordSplitChars += text[i];
                    }
                    else {
                        wordSplitChars += text[i];
                    }
                }
                else if (this.isRTLText(text[i]) && !this.isNumber(text[i])) {
                    isPrevLTRText.value = false;
                    hasRTLCharacter.value = true;
                    rtlText += text[i];
                    currentCharacterType = 1;
                }
                else {
                    isPrevLTRText.value = true;
                    ltrText += text[i];
                }
                if (numberText != '' && currentCharacterType != 4) {
                    splittedText.push(numberText);
                    characterRangeTypes.push(index_3.CharacterRangeType.Number);
                    numberText = '';
                }
                if (rtlText != '' && currentCharacterType != 1) {
                    splittedText.push(rtlText);
                    characterRangeTypes.push(index_3.CharacterRangeType.RightToLeft);
                    rtlText = '';
                }
                if (ltrText != '' && currentCharacterType != 0) {
                    splittedText.push(ltrText);
                    lastLtrIndex = splittedText.length - 1;
                    characterRangeTypes.push(index_3.CharacterRangeType.LeftToRight);
                    ltrText = '';
                }
                if (wordSplitChars != '' && (currentCharacterType != 2 || separateEachWordSplitChars)) {
                    splittedText.push(wordSplitChars);
                    characterRangeTypes.push(index_3.CharacterRangeType.WordSplit);
                    wordSplitChars = '';
                }
            }
            if (numberText != '') {
                splittedText.push(numberText);
                characterRangeTypes.push(index_3.CharacterRangeType.Number);
            }
            else if (rtlText != '') {
                splittedText.push(rtlText);
                characterRangeTypes.push(index_3.CharacterRangeType.RightToLeft);
            }
            else if (ltrText != '') {
                splittedText.push(ltrText);
                lastLtrIndex = splittedText.length - 1;
                characterRangeTypes.push(index_3.CharacterRangeType.LeftToRight);
            }
            else if (wordSplitChars != '') {
                splittedText.push(wordSplitChars);
                characterRangeTypes.push(index_3.CharacterRangeType.WordSplit);
            }
            if (hasRTLCharacter.value || (!ej2_base_1.isNullOrUndefined(isPrevLTRText.value) && !isPrevLTRText.value)) {
                for (var i = 1; i < splittedText.length; i++) {
                    var charType = characterRangeTypes[i + charTypeIndex];
                    if (charType == index_3.CharacterRangeType.WordSplit && splittedText[i].length == 1
                        && i + charTypeIndex + 1 < characterRangeTypes.length
                        && characterRangeTypes[i + charTypeIndex - 1] != index_3.CharacterRangeType.WordSplit
                        && (characterRangeTypes[i + charTypeIndex - 1] != index_3.CharacterRangeType.Number
                            || TextHelper.isNumberNonReversingCharacter(splittedText[i], isTextBidi))
                        && characterRangeTypes[i + charTypeIndex - 1] == characterRangeTypes[i + charTypeIndex + 1]) {
                        splittedText[i - 1] = splittedText[i - 1] + splittedText[i] + splittedText[i + 1];
                        splittedText.splice(i, 1);
                        splittedText.splice(i, 1);
                        characterRangeTypes.splice(i + charTypeIndex, 1);
                        characterRangeTypes.splice(i + charTypeIndex, 1);
                        i--;
                    }
                }
            }
            else if (lastLtrIndex != -1) {
                if (isTextBidi) {
                    for (var i = 1; i < lastLtrIndex; i++) {
                        var charType = characterRangeTypes[i + charTypeIndex];
                        if (charType == index_3.CharacterRangeType.WordSplit && i < lastLtrIndex
                            && characterRangeTypes[i + charTypeIndex - 1] == index_3.CharacterRangeType.LeftToRight) {
                            ltrText = '';
                            for (var j = i + 1; j <= lastLtrIndex; j++) {
                                ltrText += splittedText[j];
                                splittedText.splice(j, 1);
                                characterRangeTypes.splice(j + charTypeIndex, 1);
                                j--;
                                lastLtrIndex--;
                            }
                            splittedText[i - 1] = splittedText[i - 1] + splittedText[i] + ltrText;
                            splittedText.splice(i, 1);
                            characterRangeTypes.splice(i + charTypeIndex, 1);
                            i--;
                            lastLtrIndex--;
                        }
                    }
                }
                else {
                    splittedText.length = 0;
                    splittedText.push(text);
                }
            }
            else if (!isTextBidi) {
                splittedText.length = 0;
                splittedText.push(text);
            }
            if (isTextBidi) {
                for (var i = 1; i < splittedText.length; i++) {
                    var charType = characterRangeTypes[i + charTypeIndex];
                    if (charType == index_3.CharacterRangeType.WordSplit && splittedText[i].length == 1
                        && i + charTypeIndex + 1 < characterRangeTypes.length
                        && characterRangeTypes[i + charTypeIndex - 1] != index_3.CharacterRangeType.WordSplit
                        && (characterRangeTypes[i + charTypeIndex - 1] != index_3.CharacterRangeType.Number
                            || TextHelper.isNumberNonReversingCharacter(splittedText[i], isTextBidi) || !isRTLLang)
                        && characterRangeTypes[i + charTypeIndex - 1] == characterRangeTypes[i + charTypeIndex + 1]) {
                        splittedText[i - 1] = splittedText[i - 1] + splittedText[i] + splittedText[i + 1];
                        splittedText.splice(i, 1);
                        splittedText.splice(i, 1);
                        characterRangeTypes.splice(i + charTypeIndex, 1);
                        characterRangeTypes.splice(i + charTypeIndex, 1);
                        i--;
                    }
                    else if (charType == index_3.CharacterRangeType.WordSplit
                        && characterRangeTypes[i + charTypeIndex - 1] == index_3.CharacterRangeType.Number
                        && this.isNonWordSplitCharacter(splittedText[i]) && !isRTLLang) {
                        splittedText[i - 1] = splittedText[i - 1] + splittedText[i];
                        splittedText.splice(i, 1);
                        characterRangeTypes.splice(i + charTypeIndex, 1);
                        i--;
                    }
                    else if (charType == index_3.CharacterRangeType.LeftToRight
                        && (characterRangeTypes[i + charTypeIndex - 1] == index_3.CharacterRangeType.Number
                            || characterRangeTypes[i + charTypeIndex - 1] == index_3.CharacterRangeType.LeftToRight)) {
                        splittedText[i - 1] = splittedText[i - 1] + splittedText[i];
                        characterRangeTypes[i + charTypeIndex - 1] = index_3.CharacterRangeType.LeftToRight;
                        splittedText.splice(i, 1);
                        characterRangeTypes.splice(i + charTypeIndex, 1);
                        i--;
                    }
                }
            }
            return splittedText;
        };
        TextHelper.prototype.isRightToLeftLanguage = function (lang) {
            return (lang == 14337 || lang == 15361 || lang == 5121 || lang == 3073 || lang == 2049 ||
                lang == 11265 || lang == 13313 || lang == 12289 || lang == 4097 || lang == 8193 ||
                lang == 16385 || lang == 1025 || lang == 10241 || lang == 7169 || lang == 9217 || lang == 10655);
        };
        TextHelper.prototype.isNumber = function (ch) {
            if (!isNaN(parseInt(ch, 10))) {
                return true;
            }
            else if (ch >= String.fromCharCode(1632) && ch <= String.fromCharCode(1641)) {
                return true;
            }
            else if (ch >= String.fromCharCode(1776) && ch <= String.fromCharCode(1785)) {
                return true;
            }
            else {
                return false;
            }
        };
        TextHelper.prototype.isWordSplitChar = function (character) {
            for (var i = 0; i < TextHelper.wordSplitCharacters.length; i++) {
                if (TextHelper.wordSplitCharacters[i] === character) {
                    return true;
                }
            }
            return false;
        };
        TextHelper.isNumberNonReversingCharacter = function (character, isTextBidi) {
            for (var i = 0; i < TextHelper.numberNonReversingCharacters.length; i++) {
                var ch = TextHelper.numberNonReversingCharacters[i];
                if (character[0] == ch && (ch.charCodeAt(0) == 47 ? !isTextBidi : true)) {
                    return true;
                }
            }
            return false;
        };
        TextHelper.prototype.isNonWordSplitCharacter = function (character) {
            var isNonWordSplitChar = false;
            for (var i = 0; i < character.length; i++) {
                var charCode = character.charCodeAt(i);
                if (charCode == 35 || charCode == 36 || charCode == 37) {
                    isNonWordSplitChar = true;
                }
                else {
                    isNonWordSplitChar = false;
                    break;
                }
            }
            return isNonWordSplitChar;
        };
        TextHelper.prototype.getFontNameToRender = function (scriptType, charFormat) {
            if (!ej2_base_1.isNullOrUndefined(scriptType)) {
                if (charFormat.bidi || charFormat.complexScript) {
                    return this.getFontNameBidiToRender(scriptType, charFormat);
                }
                else {
                    if (this.isEastAsiaScript(scriptType) && !ej2_base_1.isNullOrUndefined(charFormat.fontFamilyFarEast))
                        return this.getFontNameEAToRender(scriptType, charFormat);
                    else
                        return this.getFontNameAsciiToRender(scriptType, charFormat);
                }
            }
            else {
                return charFormat.fontFamily;
            }
        };
        TextHelper.prototype.isEastAsiaScript = function (scriptType) {
            return scriptType == index_3.FontScriptType.Japanese || scriptType == index_3.FontScriptType.Korean
                || scriptType == index_3.FontScriptType.Chinese;
        };
        TextHelper.prototype.getFontNameEAToRender = function (scriptType, charFormat) {
            var fontName = charFormat.fontFamilyFarEast;
            if (ej2_base_1.isNullOrUndefined(fontName) || editor_helper_1.HelperMethods.isThemeFont(fontName))
                return this.getFontNameFromTheme(charFormat, fontName, scriptType, index_3.FontHintType.EastAsia);
            else
                return fontName;
        };
        TextHelper.prototype.getFontNameAsciiToRender = function (scriptType, charFormat) {
            var fontName = charFormat.fontFamilyAscii;
            if (editor_helper_1.HelperMethods.isThemeFont(fontName))
                return this.getFontNameFromTheme(charFormat, fontName, scriptType, index_3.FontHintType.Default);
            else
                return charFormat.fontFamily;
        };
        TextHelper.prototype.getFontNameBidiToRender = function (scriptType, charFormat) {
            var fontName = charFormat.fontFamilyBidi;
            if (!ej2_base_1.isNullOrUndefined(fontName) || editor_helper_1.HelperMethods.isThemeFont(fontName))
                return this.getFontNameFromTheme(charFormat, fontName, scriptType, index_3.FontHintType.CS);
            else
                return fontName;
        };
        TextHelper.prototype.getFontNameFromTheme = function (charFormat, fontName, scriptType, hintType) {
            var fontScheme;
            if (this.documentHelper.hasThemes && !ej2_base_1.isNullOrUndefined(this.documentHelper.themes) && !ej2_base_1.isUndefined(this.documentHelper.themes.fontScheme))
                fontScheme = this.documentHelper.themes.fontScheme;
            if (fontName == "majorAscii" || fontName == "majorBidi" || fontName == "majorEastAsia" || fontName == "majorHAnsi") {
                var majorFontScheme = void 0;
                if (fontScheme != null && fontScheme.majorFontScheme != null) {
                    majorFontScheme = fontScheme.majorFontScheme;
                }
                fontName = this.updateFontNameFromTheme(charFormat, majorFontScheme, scriptType, fontName, hintType);
            }
            else if (fontName == "minorAscii" || fontName == "minorBidi" || fontName == "minorEastAsia" || fontName == "minorHAnsi") {
                var minorFontScheme = void 0;
                if (fontScheme != null && fontScheme.majorFontScheme != null) {
                    minorFontScheme = fontScheme.minorFontScheme;
                }
                fontName = this.updateFontNameFromTheme(charFormat, minorFontScheme, scriptType, fontName, hintType);
            }
            if (ej2_base_1.isNullOrUndefined(fontName) || editor_helper_1.HelperMethods.isThemeFont(fontName))
                fontName = index_2.defaultFont;
            return fontName;
        };
        TextHelper.prototype.updateFontNameFromTheme = function (charFormat, majorMinorFontScheme, scriptType, fontName, hintType) {
            var fontNameFromTheme = "";
            if (majorMinorFontScheme != null && majorMinorFontScheme.fontSchemeList != null
                && majorMinorFontScheme.fontSchemeList.length > 0) {
                majorMinorFontScheme.fontSchemeList.forEach(function (fontSchemeStruct) {
                    if (fontSchemeStruct.name == "cs" && (fontName == "majorBidi" || fontName == "minorBidi"))
                        fontNameFromTheme = fontSchemeStruct.typeface;
                    else if (fontSchemeStruct.name == "ea" && (fontName == "majorEastAsia" || fontName == "minorEastAsia"))
                        fontNameFromTheme = fontSchemeStruct.typeface;
                    else if (fontSchemeStruct.name == "latin" && (fontName == "majorAscii" || fontName == "majorHAnsi"
                        || fontName == "minorAscii" || fontName == "minorHAnsi"))
                        fontNameFromTheme = fontSchemeStruct.typeface;
                });
            }
            if (majorMinorFontScheme != null && majorMinorFontScheme.fontTypeface != null) {
                if (hintType == index_3.FontHintType.CS) {
                    if (majorMinorFontScheme.fontTypeface.containsKey('Arab')) {
                        fontNameFromTheme = majorMinorFontScheme.fontTypeface.get('Arab');
                    }
                }
                else if (hintType == index_3.FontHintType.EastAsia) {
                }
                else if (ej2_base_1.isNullOrUndefined(fontNameFromTheme) && this.documentHelper.themeFontLanguage != null && (fontName === "minorBidi" || fontName === "majorBidi")) {
                    return fontName = this.getFontNameWithFontScript(majorMinorFontScheme, this.documentHelper.themeFontLanguage.localeIdBidi, hintType);
                }
            }
            if (ej2_base_1.isNullOrUndefined(fontNameFromTheme))
                fontNameFromTheme = index_2.defaultFont;
            fontName = fontNameFromTheme;
            return fontName;
        };
        TextHelper.prototype.getFontNameWithFontScript = function (majorMinorFontScheme, localeID, hintType) {
            var fontName = null;
            var lang = localeID.toString();
            var fontTypeFaces = majorMinorFontScheme.fontTypeface;
            if ((lang == 'gu_IN' || localeID == 1095) && fontTypeFaces.containsKey("Gujr"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'hi_IN' || lang == 'mr_IN' || localeID == 1081 || localeID == 1102)
                && fontTypeFaces.containsKey("Deva"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'ko_KR' || localeID == 1042) && fontTypeFaces.containsKey("Hang"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'zh_CN' || lang == 'zh_SG' || localeID == 2052) && fontTypeFaces.containsKey("Hans"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'zh_TW' || lang == 'zh_HK' || lang == 'zh_MO')
                && fontTypeFaces.containsKey("Hant"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'ja_JP' || localeID == 1041) && fontTypeFaces.containsKey("Jpan"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'ta_IN' || localeID == 1097) && fontTypeFaces.containsKey("Taml"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'te_IN' || localeID == 1098) && fontTypeFaces.containsKey("Telu"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'he_IL' || lang == 'yi_Hebr' || localeID == 1037) && fontTypeFaces.containsKey("Hebr"))
                fontName = fontTypeFaces.get("Arab");
            else if ((lang == 'th_TH' || localeID == 1054) && fontTypeFaces.containsKey("Thai"))
                fontName = fontTypeFaces.get("Thai");
            else if (hintType == index_3.FontHintType.CS && fontTypeFaces.containsKey("Arab"))
                fontName = fontTypeFaces.get("Arab");
            return fontName;
        };
        TextHelper.prototype.destroy = function () {
            this.documentHelper = undefined;
            this.context = undefined;
            this.paragraphMarkInfo = {};
            this.paragraphMarkInfo = undefined;
        };
        return TextHelper;
    }());
    TextHelper.wordSplitCharacters = [String.fromCharCode(32), String.fromCharCode(33), String.fromCharCode(34), String.fromCharCode(35), String.fromCharCode(36), String.fromCharCode(37), String.fromCharCode(38), String.fromCharCode(39), String.fromCharCode(40), String.fromCharCode(41), String.fromCharCode(42), String.fromCharCode(43), String.fromCharCode(44), String.fromCharCode(45), String.fromCharCode(46), String.fromCharCode(47), String.fromCharCode(58), String.fromCharCode(59), String.fromCharCode(60), String.fromCharCode(61), String.fromCharCode(62), String.fromCharCode(63), String.fromCharCode(64), String.fromCharCode(91), String.fromCharCode(92), String.fromCharCode(93), String.fromCharCode(94), String.fromCharCode(95), String.fromCharCode(96), String.fromCharCode(123), String.fromCharCode(124), String.fromCharCode(125), String.fromCharCode(126), String.fromCharCode(1548), String.fromCharCode(1563), String.fromCharCode(8211), String.fromCharCode(8212), String.fromCharCode(8216), String.fromCharCode(8217), String.fromCharCode(8221), String.fromCharCode(12288), String.fromCharCode(8207)];
    TextHelper.numberNonReversingCharacters = [String.fromCharCode(44), String.fromCharCode(46), String.fromCharCode(47), String.fromCharCode(58), String.fromCharCode(1548)];
    exports.TextHelper = TextHelper;
});
