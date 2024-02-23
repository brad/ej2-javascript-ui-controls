define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-buttons", "../format/character-format", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_dropdowns_1, ej2_buttons_1, character_format_1, ej2_inputs_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FontDialog = (function () {
        function FontDialog(documentHelper) {
            var _this = this;
            this.fontStyleInternal = undefined;
            this.fontNameList = undefined;
            this.fontStyleText = undefined;
            this.fontSizeText = undefined;
            this.colorPicker = undefined;
            this.underlineDrop = undefined;
            this.strikethroughBox = undefined;
            this.doublestrikethrough = undefined;
            this.superscript = undefined;
            this.subscript = undefined;
            this.allcaps = undefined;
            this.bold = undefined;
            this.italic = undefined;
            this.underline = undefined;
            this.strikethrough = undefined;
            this.baselineAlignment = undefined;
            this.fontSize = undefined;
            this.fontFamily = undefined;
            this.fontColor = undefined;
            this.allCaps = undefined;
            this.isListDialog = false;
            this.characterFormat = undefined;
            this.loadFontDialog = function () {
                _this.documentHelper.updateFocus();
                var characterFormat;
                if (_this.characterFormat) {
                    characterFormat = _this.characterFormat;
                }
                else {
                    characterFormat = _this.documentHelper.owner.selection.characterFormat;
                }
                _this.fontNameList.value = characterFormat.fontFamily;
                _this.fontNameList.dataBind();
                if (!characterFormat.bold && !characterFormat.italic) {
                    _this.fontStyleText.value = _this.fontSizeText.value;
                    _this.fontStyleText.index = 0;
                }
                else if (characterFormat.bold && !characterFormat.italic) {
                    _this.fontStyleText.value = _this.fontSizeText.value;
                    _this.fontStyleText.index = 1;
                }
                else if (!characterFormat.bold && characterFormat.italic) {
                    _this.fontStyleText.value = _this.fontSizeText.value;
                    _this.fontStyleText.index = 2;
                }
                else if (characterFormat.bold && characterFormat.italic) {
                    _this.fontStyleText.value = _this.fontSizeText.value;
                    _this.fontStyleText.index = 3;
                }
                if (!ej2_base_1.isNullOrUndefined(characterFormat.fontSize)) {
                    _this.fontSizeText.value = characterFormat.fontSize;
                }
                if (!ej2_base_1.isNullOrUndefined(characterFormat.fontColor)) {
                    var fontColor = characterFormat.fontColor;
                    if (fontColor === 'empty' || fontColor === '#00000000') {
                        fontColor = '#000000';
                    }
                    _this.colorPicker.value = fontColor;
                }
                else {
                    _this.colorPicker.value = '#000000';
                }
                if (characterFormat.underline === 'None') {
                    _this.underlineDrop.index = 0;
                }
                else if (characterFormat.underline === 'Single') {
                    _this.underlineDrop.index = 1;
                }
                if (characterFormat.strikethrough === 'SingleStrike') {
                    _this.strikethroughBox.checked = true;
                }
                else if (characterFormat.strikethrough === 'DoubleStrike') {
                    _this.doublestrikethrough.checked = true;
                }
                else {
                    _this.strikethroughBox.checked = false;
                    _this.doublestrikethrough.checked = false;
                }
                if (characterFormat.baselineAlignment === 'Superscript') {
                    _this.superscript.checked = true;
                }
                else if (characterFormat.baselineAlignment === 'Subscript') {
                    _this.subscript.checked = true;
                }
                else {
                    _this.superscript.checked = false;
                    _this.subscript.checked = false;
                }
                if (_this.documentHelper.selection.caret.style.display !== 'none') {
                    _this.documentHelper.selection.caret.style.display = 'none';
                }
                if (characterFormat.allCaps) {
                    _this.allcaps.checked = true;
                }
                else {
                    _this.allcaps.checked = false;
                    _this.allCaps = false;
                }
            };
            this.closeFontDialog = function () {
                _this.unWireEventsAndBindings();
                _this.documentHelper.updateFocus();
            };
            this.onCancelButtonClick = function () {
                _this.documentHelper.dialog.hide();
                _this.unWireEventsAndBindings();
                _this.documentHelper.updateFocus();
            };
            this.onInsertFontFormat = function () {
                var format;
                if (_this.characterFormat) {
                    format = _this.characterFormat;
                }
                else {
                    format = new character_format_1.WCharacterFormat(undefined);
                }
                if (!ej2_base_1.isNullOrUndefined(_this.bold)) {
                    format.bold = _this.bold;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.italic)) {
                    format.italic = _this.italic;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.fontSize) && _this.fontSize > 0) {
                    format.fontSize = _this.fontSize;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.fontColor)) {
                    format.fontColor = _this.fontColor;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.baselineAlignment)) {
                    format.baselineAlignment = _this.baselineAlignment;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.strikethrough)) {
                    format.strikethrough = _this.strikethrough;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.underline)) {
                    format.underline = _this.underline;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.fontFamily)) {
                    var fontFamily = ej2_base_2.SanitizeHtmlHelper.sanitize(_this.fontFamily);
                    format.fontFamily = fontFamily;
                    format.fontFamilyAscii = fontFamily;
                    format.fontFamilyFarEast = fontFamily;
                    format.fontFamilyNonFarEast = fontFamily;
                    format.fontFamilyBidi = fontFamily;
                }
                if (!ej2_base_1.isNullOrUndefined(_this.allCaps)) {
                    format.allCaps = _this.allCaps;
                }
                if (!_this.characterFormat) {
                    _this.onCharacterFormat(_this.documentHelper.selection, format);
                }
                else {
                    if (_this.isListDialog) {
                        _this.documentHelper.owner.listDialogModule.updateCharacterFormat(format);
                    }
                    else {
                        _this.documentHelper.owner.styleDialogModule.updateCharacterFormat();
                    }
                }
                _this.documentHelper.hideDialog();
            };
            this.fontSizeUpdate = function (args) {
                _this.fontSize = args.value;
            };
            this.fontStyleUpdate = function (args) {
                _this.fontStyle = args.value;
            };
            this.fontFamilyUpdate = function (args) {
                _this.fontFamily = args.value;
            };
            this.underlineUpdate = function (args) {
                _this.underline = args.value;
            };
            this.fontColorUpdate = function (args) {
                if (!ej2_base_1.isNullOrUndefined(args.currentValue)) {
                    _this.fontColor = args.currentValue.hex;
                }
            };
            this.singleStrikeUpdate = function (args) {
                _this.enableCheckBoxProperty(args);
                if (args.checked) {
                    _this.strikethrough = 'SingleStrike';
                }
                else {
                    _this.strikethrough = 'None';
                }
            };
            this.doubleStrikeUpdate = function (args) {
                _this.enableCheckBoxProperty(args);
                if (args.checked) {
                    _this.strikethrough = 'DoubleStrike';
                }
                else {
                    _this.strikethrough = 'None';
                }
            };
            this.superscriptUpdate = function (args) {
                _this.enableCheckBoxProperty(args);
                if (args.checked) {
                    _this.baselineAlignment = 'Superscript';
                }
                else {
                    _this.baselineAlignment = 'Normal';
                }
            };
            this.subscriptUpdate = function (args) {
                _this.enableCheckBoxProperty(args);
                if (args.checked) {
                    _this.baselineAlignment = 'Subscript';
                }
                else {
                    _this.baselineAlignment = 'Normal';
                }
            };
            this.allcapsUpdate = function (args) {
                _this.enableCheckBoxProperty(args);
                if (args.checked) {
                    _this.allCaps = true;
                }
                else {
                    _this.allCaps = false;
                }
            };
            this.documentHelper = documentHelper;
        }
        Object.defineProperty(FontDialog.prototype, "fontStyle", {
            get: function () {
                return this.fontStyleInternal;
            },
            set: function (value) {
                this.fontStyleInternal = value;
                switch (this.fontStyle) {
                    case 'Bold':
                        this.bold = true;
                        this.italic = false;
                        break;
                    case 'Italic':
                        this.bold = false;
                        this.italic = true;
                        break;
                    case 'BoldItalic':
                        this.bold = true;
                        this.italic = true;
                        break;
                    case 'Regular':
                        this.bold = false;
                        this.italic = false;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        FontDialog.prototype.getModuleName = function () {
            return 'FontDialog';
        };
        FontDialog.prototype.createInputElement = function (type, id, className) {
            var element = ej2_base_1.createElement('input', {
                attrs: { type: type },
                id: id,
                className: className
            });
            return element;
        };
        FontDialog.prototype.initFontDialog = function (locale, isRtl) {
            var effectLabel;
            var strikeThroughElement;
            var superScriptElement;
            var subScriptElement;
            var doubleStrikeThroughElement;
            var allCapsElement;
            var fontEffectSubDiv1;
            var id = this.documentHelper.owner.containerId;
            this.target = ej2_base_1.createElement('div', { className: 'e-de-font-dlg' });
            var fontDiv = this.getFontDiv(locale, isRtl);
            this.target.appendChild(fontDiv);
            var sizeDiv = this.getFontSizeDiv(locale, isRtl);
            this.target.appendChild(sizeDiv);
            var colorDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            this.fontColorDiv = ej2_base_1.createElement('div', { className: 'e-de-font-dlg-display' });
            var fontColorLabel = ej2_base_1.createElement('label', {
                className: 'e-de-font-dlg-header-font-color e-de-font-color-margin',
                innerHTML: locale.getConstant('Font color')
            });
            if (isRtl) {
                fontColorLabel.classList.add('e-de-rtl');
            }
            this.fontColorDiv.appendChild(fontColorLabel);
            var fontColorElement = this.createInputElement('color', this.target.id + '_ColorDiv', 'e-de-font-dlg-color');
            this.fontColorDiv.appendChild(fontColorElement);
            colorDiv.appendChild(this.fontColorDiv);
            this.target.appendChild(colorDiv);
            var fontEffectsDiv = ej2_base_1.createElement('div');
            fontEffectSubDiv1 = ej2_base_1.createElement('div');
            effectLabel = ej2_base_1.createElement('div', {
                className: 'e-de-para-dlg-heading',
                innerHTML: locale.getConstant('Effects'),
            });
            fontEffectSubDiv1.appendChild(effectLabel);
            fontEffectsDiv.appendChild(fontEffectSubDiv1);
            this.target.appendChild(fontEffectsDiv);
            var effectsProperties = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var fontEffectSubDiv2 = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            strikeThroughElement = this.createInputElement('checkbox', this.target.id + '_strikeThrough', '');
            fontEffectSubDiv2.appendChild(strikeThroughElement);
            var checkBoxDiv = ej2_base_1.createElement('div', { className: 'e-de-font-checkbox' });
            subScriptElement = this.createInputElement('checkbox', this.target.id + '_subScript', '');
            checkBoxDiv.appendChild(subScriptElement);
            fontEffectSubDiv2.appendChild(checkBoxDiv);
            checkBoxDiv = ej2_base_1.createElement('div', { className: 'e-de-font-checkbox' });
            allCapsElement = this.createInputElement('checkbox', this.target.id + '_allCaps', '');
            checkBoxDiv.appendChild(allCapsElement);
            fontEffectSubDiv2.appendChild(checkBoxDiv);
            effectsProperties.appendChild(fontEffectSubDiv2);
            var fontEffectSubDiv3 = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            superScriptElement = this.createInputElement('checkbox', this.target.id + '_superScript', '');
            fontEffectSubDiv3.appendChild(superScriptElement);
            checkBoxDiv = ej2_base_1.createElement('div', { className: 'e-de-font-checkbox' });
            doubleStrikeThroughElement = this.createInputElement('checkbox', this.target.id + '_doubleStrikeThrough', '');
            checkBoxDiv.appendChild(doubleStrikeThroughElement);
            fontEffectSubDiv3.appendChild(checkBoxDiv);
            effectsProperties.appendChild(fontEffectSubDiv3);
            this.target.appendChild(effectsProperties);
            this.colorPicker = new ej2_inputs_1.ColorPicker({
                change: this.fontColorUpdate, value: '#000000', enableRtl: isRtl, locale: this.documentHelper.owner.locale, enableOpacity: false
            });
            this.colorPicker.appendTo(fontColorElement);
            this.strikethroughBox = new ej2_buttons_1.CheckBox({
                change: this.singleStrikeUpdate,
                cssClass: 'e-de-font-content-label',
                label: locale.getConstant('Strikethrough'),
                enableRtl: isRtl
            });
            this.strikethroughBox.appendTo(strikeThroughElement);
            this.doublestrikethrough = new ej2_buttons_1.CheckBox({
                change: this.doubleStrikeUpdate,
                label: locale.getConstant('Double strikethrough'),
                enableRtl: isRtl
            });
            this.doublestrikethrough.appendTo(doubleStrikeThroughElement);
            this.subscript = new ej2_buttons_1.CheckBox({
                label: locale.getConstant('Subscript'),
                cssClass: 'e-de-font-content-label-width',
                change: this.subscriptUpdate,
                enableRtl: isRtl
            });
            this.subscript.appendTo(subScriptElement);
            this.superscript = new ej2_buttons_1.CheckBox({
                label: locale.getConstant('Superscript'),
                cssClass: 'e-de-font-content-label', change: this.superscriptUpdate,
                enableRtl: isRtl
            });
            this.superscript.appendTo(superScriptElement);
            this.allcaps = new ej2_buttons_1.CheckBox({
                label: locale.getConstant('All caps'),
                cssClass: 'e-de-font-content-label-caps',
                change: this.allcapsUpdate,
                enableRtl: isRtl
            });
            this.allcaps.appendTo(allCapsElement);
            if (isRtl) {
                fontEffectSubDiv2.classList.add('e-de-rtl');
                fontEffectSubDiv3.classList.add('e-de-rtl');
                fontEffectSubDiv1.classList.remove('e-de-font-content-checkbox-label');
            }
        };
        FontDialog.prototype.getFontSizeDiv = function (locale, isRtl) {
            var fontSize;
            var sizeDiv;
            var id = this.documentHelper.owner.containerId;
            sizeDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var sizeSubDiv1 = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            var sizeLabel = locale.getConstant('Size');
            fontSize = ej2_base_1.createElement('select', { id: this.target.id + '_fontSize' });
            fontSize.innerHTML = '<option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>' +
                '<option>14</option><option>16</option><option>18</option><option>20</option><option>24</option><option>26</option>' +
                '<option>28</option><option>36</option><option>48</option><option>72</option><option>96</option>';
            sizeSubDiv1.appendChild(fontSize);
            sizeDiv.appendChild(sizeSubDiv1);
            var sizeSubDiv2 = ej2_base_1.createElement('div', {
                className: 'e-de-subcontainer-right',
            });
            if (isRtl) {
                sizeSubDiv2.classList.add('e-de-rtl');
            }
            var html = locale.getConstant('Underline style');
            var underlineElement;
            underlineElement = ej2_base_1.createElement('select', { id: this.target.id + '_underLine' });
            underlineElement.innerHTML = '<option value="None">' + locale.getConstant('None') + '</option><option value="Single">________</option>';
            sizeSubDiv2.appendChild(underlineElement);
            sizeDiv.appendChild(sizeSubDiv2);
            this.fontSizeText = new ej2_dropdowns_1.ComboBox({ change: this.fontSizeUpdate, allowCustom: true, showClearButton: false, enableRtl: isRtl, floatLabelType: 'Always', placeholder: sizeLabel, htmlAttributes: { 'aria-labelledby': sizeLabel } });
            this.fontSizeText.appendTo(fontSize);
            this.underlineDrop = new ej2_dropdowns_1.DropDownList({ change: this.underlineUpdate, enableRtl: isRtl, floatLabelType: 'Always', placeholder: html, htmlAttributes: { 'aria-labelledby': html } });
            this.underlineDrop.appendTo(underlineElement);
            return sizeDiv;
        };
        FontDialog.prototype.getFontDiv = function (locale, isRtl) {
            var id = this.documentHelper.owner.containerId;
            var fontDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var fontSubDiv1 = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            var fontLabel = locale.getConstant('Font');
            var fontNameValues = ej2_base_1.createElement('select', { id: this.target.id + '_fontName' });
            var fontValues = this.documentHelper.owner.documentEditorSettings.fontFamilies;
            for (var i = 0; i < fontValues.length; i++) {
                fontNameValues.innerHTML += '<option>' + fontValues[i] + '</option>';
            }
            fontSubDiv1.appendChild(fontNameValues);
            fontDiv.appendChild(fontSubDiv1);
            var fontSubDiv2;
            var fontStyleValues;
            fontSubDiv2 = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            if (isRtl) {
                fontSubDiv2.classList.add('e-de-rtl');
            }
            var fontStyleLabel = locale.getConstant('Font style');
            fontStyleValues = ej2_base_1.createElement('select', { id: this.target.id + '_fontStyle' });
            fontStyleValues.innerHTML = '<option value="Regular">' +
                locale.getConstant('Regular') + '</option><option value="Bold">' + locale.getConstant('Bold') + '</option><option value="Italic">' +
                locale.getConstant('Italic') + '</option><option value="BoldItalic">' + locale.getConstant('Bold') + locale.getConstant('Italic') + '</option>';
            fontSubDiv2.appendChild(fontStyleValues);
            fontDiv.appendChild(fontSubDiv2);
            this.fontNameList = new ej2_dropdowns_1.ComboBox({ change: this.fontFamilyUpdate, enableRtl: isRtl, floatLabelType: 'Always', placeholder: fontLabel });
            this.fontNameList.showClearButton = false;
            this.fontNameList.appendTo(fontNameValues);
            this.fontStyleText = new ej2_dropdowns_1.DropDownList({ change: this.fontStyleUpdate, enableRtl: isRtl, floatLabelType: 'Always', placeholder: fontStyleLabel });
            this.fontStyleText.appendTo(fontStyleValues);
            return fontDiv;
        };
        FontDialog.prototype.showFontDialog = function (characterFormat, isListDialog) {
            if (characterFormat) {
                this.characterFormat = characterFormat;
            }
            this.isListDialog = isListDialog;
            var locale = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            locale.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.initFontDialog(locale, this.documentHelper.owner.enableRtl);
            }
            this.documentHelper.dialog.header = locale.getConstant('Font');
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.beforeOpen = this.loadFontDialog;
            this.documentHelper.dialog.close = this.closeFontDialog;
            this.documentHelper.dialog.buttons = [{
                    click: this.onInsertFontFormat,
                    buttonModel: { content: locale.getConstant('Ok'), cssClass: 'e-flat e-font-okay', isPrimary: true }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: locale.getConstant('Cancel'), cssClass: 'e-flat e-font-cancel' }
                }];
            this.documentHelper.dialog.dataBind();
            this.documentHelper.dialog.show();
        };
        FontDialog.prototype.onCharacterFormat = function (selection, format) {
            this.documentHelper.owner.editorModule.initHistory('CharacterFormat');
            if (selection.isEmpty) {
                if (selection.start.offset === selection.getParagraphLength(selection.start.paragraph)) {
                    this.documentHelper.owner.editorModule.applyCharFormatValueInternal(selection, selection.start.paragraph.characterFormat, undefined, format);
                    this.documentHelper.owner.editorModule.reLayout(selection);
                }
                this.documentHelper.updateFocus();
                return;
            }
            else {
                this.documentHelper.owner.editorModule.setOffsetValue(this.documentHelper.selection);
                this.documentHelper.owner.editorModule.updateSelectionCharacterFormatting('CharacterFormat', format, false);
            }
        };
        FontDialog.prototype.enableCheckBoxProperty = function (args) {
            if (this.strikethroughBox.checked && this.doublestrikethrough.checked) {
                this.strikethroughBox.checked = false;
                this.doublestrikethrough.checked = false;
                if (args.event.currentTarget.id === this.target.id + '_doubleStrikeThrough') {
                    this.doublestrikethrough.checked = true;
                }
                else {
                    this.strikethroughBox.checked = true;
                }
            }
            if (this.superscript.checked && this.subscript.checked) {
                this.subscript.checked = false;
                this.superscript.checked = false;
                if (args.event.currentTarget.id === this.target.id + '_subScript') {
                    this.subscript.checked = true;
                }
                else {
                    this.superscript.checked = true;
                }
            }
        };
        FontDialog.prototype.unWireEventsAndBindings = function () {
            this.fontNameList.value = '';
            this.fontSizeText.value = '';
            this.fontStyleText.value = '';
            this.strikethroughBox.checked = false;
            this.doublestrikethrough.checked = false;
            this.superscript.checked = false;
            this.subscript.checked = false;
            this.allcaps.checked = false;
            this.bold = undefined;
            this.italic = undefined;
            this.underline = undefined;
            this.strikethrough = undefined;
            this.baselineAlignment = undefined;
            this.fontColor = undefined;
            this.fontSize = undefined;
            this.fontFamily = undefined;
        };
        FontDialog.prototype.destroy = function () {
            this.documentHelper = undefined;
            if (this.characterFormat) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.target)) {
                if (this.target.parentElement) {
                    this.target.parentElement.removeChild(this.target);
                }
                for (var m = 0; m < this.target.childNodes.length; m++) {
                    this.target.removeChild(this.target.childNodes[m]);
                    m--;
                }
                this.target = undefined;
            }
            if (this.fontNameList) {
                this.fontNameList.destroy();
            }
            this.fontNameList = undefined;
            if (this.fontStyleText) {
                this.fontStyleText.destroy();
            }
            this.fontStyleText = undefined;
            if (this.fontSizeText) {
                this.fontSizeText.destroy();
            }
            this.fontSizeText = undefined;
            if (this.colorPicker) {
                this.colorPicker.destroy();
            }
            this.colorPicker = undefined;
            if (this.underlineDrop) {
                this.underlineDrop.destroy();
            }
            this.underlineDrop = undefined;
            if (this.strikethroughBox) {
                this.strikethroughBox.destroy();
            }
            this.strikethroughBox = undefined;
            if (this.doublestrikethrough) {
                this.doublestrikethrough.destroy();
            }
            this.doublestrikethrough = undefined;
            if (this.superscript) {
                this.superscript.destroy();
            }
            this.superscript = undefined;
            if (this.subscript) {
                this.subscript.destroy();
            }
            this.subscript = undefined;
            if (this.allcaps) {
                this.allcaps.destroy();
            }
            this.allcaps = undefined;
        };
        return FontDialog;
    }());
    exports.FontDialog = FontDialog;
});
