define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-buttons", "../../implementation/format/style", "../../base/index", "./index", "@syncfusion/ej2-data", "../list/abstract-list", "@syncfusion/ej2-inputs", "@syncfusion/ej2-splitbuttons", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_dropdowns_1, ej2_buttons_1, style_1, index_1, index_2, ej2_data_1, abstract_list_1, ej2_inputs_1, ej2_splitbuttons_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StyleDialog = (function () {
        function StyleDialog(documentHelper) {
            var _this = this;
            this.target = undefined;
            this.styleType = undefined;
            this.styleBasedOn = undefined;
            this.styleParagraph = undefined;
            this.onlyThisDocument = undefined;
            this.template = undefined;
            this.fontFamily = undefined;
            this.fontSize = undefined;
            this.characterFormat = undefined;
            this.paragraphFormat = undefined;
            this.openDialog = function (args) {
                switch (args.item.id) {
                    case 'style_font':
                        _this.showFontDialog();
                        break;
                    case 'style_paragraph':
                        _this.showParagraphDialog();
                        break;
                    case 'style_numbering':
                        _this.showNumberingBulletDialog();
                        break;
                }
            };
            this.setBoldProperty = function () {
                _this.characterFormat.bold = !_this.characterFormat.bold;
                _this.fontButtonClicked();
            };
            this.setItalicProperty = function () {
                _this.characterFormat.italic = !_this.characterFormat.italic;
                _this.fontButtonClicked();
            };
            this.setUnderlineProperty = function () {
                _this.characterFormat.underline = _this.characterFormat.underline === 'None' ? 'Single' : 'None';
                _this.fontButtonClicked();
            };
            this.fontButtonClicked = function () {
                if (_this.characterFormat.bold) {
                    if (!_this.bold.classList.contains('e-active')) {
                        _this.bold.classList.add('e-active');
                    }
                }
                else {
                    if (_this.bold.classList.contains('e-active')) {
                        _this.bold.classList.remove('e-active');
                    }
                }
                if (_this.characterFormat.italic) {
                    if (!_this.italic.classList.contains('e-active')) {
                        _this.italic.classList.add('e-active');
                    }
                }
                else {
                    if (_this.italic.classList.contains('e-active')) {
                        _this.italic.classList.remove('e-active');
                    }
                }
                if (_this.characterFormat.underline !== undefined && _this.characterFormat.underline !== 'None') {
                    if (!_this.underline.classList.contains('e-active')) {
                        _this.underline.classList.add('e-active');
                        _this.characterFormat.underline = 'Single';
                    }
                }
                else {
                    if (_this.underline.classList.contains('e-active')) {
                        _this.underline.classList.remove('e-active');
                        _this.characterFormat.underline = 'None';
                    }
                }
            };
            this.fontSizeUpdate = function (args) {
                _this.characterFormat.fontSize = args.value;
            };
            this.fontFamilyChanged = function (args) {
                _this.characterFormat.fontFamily = args.value.toString();
            };
            this.fontColorUpdate = function (args) {
                _this.characterFormat.fontColor = args.currentValue.hex;
            };
            this.setLeftAlignment = function () {
                if (_this.paragraphFormat.textAlignment === 'Left') {
                    _this.paragraphFormat.textAlignment = 'Justify';
                }
                else {
                    _this.paragraphFormat.textAlignment = 'Left';
                }
                _this.updateParagraphFormat();
            };
            this.setRightAlignment = function () {
                if (_this.paragraphFormat.textAlignment === 'Right') {
                    _this.paragraphFormat.textAlignment = 'Left';
                }
                else {
                    _this.paragraphFormat.textAlignment = 'Right';
                }
                _this.updateParagraphFormat();
            };
            this.setCenterAlignment = function () {
                if (_this.paragraphFormat.textAlignment === 'Center') {
                    _this.paragraphFormat.textAlignment = 'Left';
                }
                else {
                    _this.paragraphFormat.textAlignment = 'Center';
                }
                _this.updateParagraphFormat();
            };
            this.setJustifyAlignment = function () {
                if (_this.paragraphFormat.textAlignment === 'Justify') {
                    _this.paragraphFormat.textAlignment = 'Left';
                }
                else {
                    _this.paragraphFormat.textAlignment = 'Justify';
                }
                _this.updateParagraphFormat();
            };
            this.increaseBeforeAfterSpacing = function () {
                _this.paragraphFormat.beforeSpacing += 6;
                _this.paragraphFormat.afterSpacing += 6;
            };
            this.decreaseBeforeAfterSpacing = function () {
                if (_this.paragraphFormat.beforeSpacing >= 6) {
                    _this.paragraphFormat.beforeSpacing -= 6;
                }
                else {
                    _this.paragraphFormat.beforeSpacing = 0;
                }
                if (_this.paragraphFormat.afterSpacing >= 6) {
                    _this.paragraphFormat.afterSpacing -= 6;
                }
                else {
                    _this.paragraphFormat.afterSpacing = 0;
                }
            };
            this.updateNextStyle = function (args) {
                var typedName = args.srcElement.value;
                if (_this.getTypeValue() === _this.localObj.getConstant('Paragraph') && !ej2_base_1.isNullOrUndefined(typedName) && typedName !== '' && !_this.isUserNextParaUpdated) {
                    var styles = _this.documentHelper.styles.getStyleNames(_this.getTypeValue());
                    if (_this.isEdit) {
                        styles = styles.filter(function (e) { return e !== _this.editStyleName; });
                    }
                    styles.push(typedName);
                    _this.styleParagraph.dataSource = styles;
                    _this.styleParagraph.index = null;
                    _this.styleParagraph.index = styles.indexOf(typedName);
                }
            };
            this.updateOkButton = function () {
                var styleName = _this.target.getElementsByClassName('e-input e-de-style-dlg-name-input').item(0).value;
                _this.enableOrDisableOkButton();
            };
            this.styleTypeChange = function (args) {
                if (args.isInteracted) {
                    var type = void 0;
                    if (args.value === 'Character') {
                        _this.style = new style_1.WCharacterStyle();
                        type = 'Character';
                    }
                    if (args.value === 'Paragraph' || args.value === 'Linked Style') {
                        _this.style = new style_1.WParagraphStyle();
                        type = 'Paragraph';
                    }
                    _this.toggleDisable();
                    _this.updateStyleNames(type);
                }
            };
            this.styleBasedOnChange = function () {
            };
            this.styleParagraphChange = function (args) {
                if (args.isInteracted) {
                    _this.isUserNextParaUpdated = true;
                }
            };
            this.showFontDialog = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.documentHelper.owner.fontDialogModule)) {
                    _this.documentHelper.owner.showFontDialog(_this.characterFormat);
                }
                _this.updateCharacterFormat();
            };
            this.showParagraphDialog = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.documentHelper.owner.paragraphDialogModule)) {
                    _this.documentHelper.owner.showParagraphDialog(_this.paragraphFormat);
                }
            };
            this.showNumberingBulletDialog = function () {
                _this.numberingBulletDialog = new index_2.BulletsAndNumberingDialog(_this.documentHelper);
                if (_this.style instanceof style_1.WParagraphStyle && (!ej2_base_1.isNullOrUndefined(_this.style.paragraphFormat))) {
                    _this.numberingBulletDialog.showNumberBulletDialog(_this.style.paragraphFormat.listFormat, _this.abstractList);
                }
            };
            this.onOkButtonClick = function () {
                var styleName = ej2_base_2.SanitizeHtmlHelper.sanitize(_this.styleNameElement.value);
                if (styleName.length > 0) {
                    var style = _this.documentHelper.styles.findByName(styleName);
                    var name_1;
                    if (!ej2_base_1.isNullOrUndefined(style)) {
                        _this.style.type = _this.getTypeValue();
                        _this.style.basedOn = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleBasedOn.value));
                        if (_this.styleType.value === 'Paragraph' || _this.styleType.value === 'Linked Style') {
                            _this.style.next = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleParagraph.value));
                            _this.style.characterFormat.mergeFormat(style.characterFormat);
                            _this.style.paragraphFormat.mergeFormat(style.paragraphFormat, true);
                            _this.updateList();
                            _this.style.link = (_this.styleType.value === 'Linked Style') ? _this.createLinkStyle(styleName, _this.isEdit) : undefined;
                        }
                        _this.style.name = style.name;
                        name_1 = style.name;
                        style = _this.style;
                        _this.documentHelper.owner.isShiftingEnabled = true;
                        _this.documentHelper.owner.editor.isSkipOperationsBuild = true;
                        _this.documentHelper.owner.editorModule.layoutWholeDocument();
                        _this.documentHelper.owner.editor.isSkipOperationsBuild = false;
                        _this.documentHelper.owner.isShiftingEnabled = false;
                        var listId = _this.style instanceof style_1.WParagraphStyle ? _this.style.paragraphFormat.listFormat.listId : -1;
                        _this.documentHelper.owner.getStyleData(name_1, listId);
                    }
                    else {
                        var tmpStyle = _this.getTypeValue() === 'Paragraph' ? new style_1.WParagraphStyle() : new style_1.WCharacterStyle;
                        tmpStyle.copyStyle(_this.style);
                        if (_this.getTypeValue() === 'Character') {
                            tmpStyle.characterFormat.copyFormat(_this.characterFormat);
                        }
                        var basedOn = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleBasedOn.value));
                        if (_this.styleType.value === 'Paragraph' || _this.styleType.value === 'Linked Style') {
                            if (styleName === _this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleParagraph.value)) {
                                tmpStyle.next = tmpStyle;
                            }
                            else {
                                tmpStyle.next = _this.documentHelper.styles.findByName(_this.documentHelper.owner.stylesDialogModule.getStyleName(_this.styleParagraph.value));
                            }
                            _this.updateList();
                        }
                        tmpStyle.link = (_this.styleType.value === 'Linked Style') ? _this.createLinkStyle(styleName) : undefined;
                        tmpStyle.type = _this.getTypeValue();
                        tmpStyle.name = styleName;
                        tmpStyle.basedOn = basedOn;
                        _this.documentHelper.styles.push(tmpStyle);
                        _this.documentHelper.addToStylesMap(tmpStyle);
                        name_1 = styleName;
                        var listId = _this.style instanceof style_1.WParagraphStyle ? _this.style.paragraphFormat.listFormat.listId : -1;
                        _this.documentHelper.owner.getStyleData(name_1, listId);
                        _this.documentHelper.owner.editor.isSkipOperationsBuild = _this.styleType.value === 'Character';
                        _this.documentHelper.owner.editorModule.applyStyle(name_1, true);
                        _this.documentHelper.owner.editor.isSkipOperationsBuild = false;
                        _this.documentHelper.owner.notify(index_1.internalStyleCollectionChange, {});
                    }
                    _this.documentHelper.dialog2.hide();
                    _this.documentHelper.updateFocus();
                }
                else {
                    throw new Error('Enter valid Style name');
                }
                if (_this.style) {
                }
                _this.documentHelper.updateFocus();
            };
            this.loadStyleDialog = function () {
                _this.documentHelper.updateFocus();
                _this.isUserNextParaUpdated = false;
                _this.styleNameElement = _this.target.getElementsByClassName('e-input e-de-style-dlg-name-input').item(0);
                _this.styleNameElement.value = null;
                if (!_this.isEdit) {
                    _this.styleType.index = 0;
                }
                var name;
                if (_this.isEdit) {
                    var localValue = new ej2_base_1.L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
                    localValue.setLocale(_this.documentHelper.owner.locale);
                    var styleName = localValue.getConstant(_this.editStyleName);
                    if (styleName === '') {
                        styleName = _this.editStyleName;
                    }
                    _this.styleNameElement.value = styleName;
                    name = _this.editStyleName;
                }
                _this.okButton = _this.documentHelper.dialog2.element.getElementsByClassName('e-flat e-style-okay').item(0);
                _this.enableOrDisableOkButton();
                _this.updateStyleNames(_this.getTypeValue(), name);
                _this.updateCharacterFormat(_this.style.characterFormat);
                _this.updateParagraphFormat(_this.style.paragraphFormat);
            };
            this.onCancelButtonClick = function () {
                if (!_this.isEdit && _this.style) {
                    _this.style.destroy();
                }
                _this.documentHelper.dialog2.hide();
                _this.documentHelper.updateFocus();
            };
            this.closeStyleDialog = function () {
                _this.documentHelper.updateFocus();
            };
            this.documentHelper = documentHelper;
        }
        StyleDialog.prototype.getModuleName = function () {
            return 'StyleDialog';
        };
        StyleDialog.prototype.initStyleDialog = function (localValue, isRtl) {
            var instance = this;
            this.localObj = localValue;
            this.target = ej2_base_1.createElement('div', { className: 'e-de-style-dialog' });
            var container = ej2_base_1.createElement('div');
            var properties = ej2_base_1.createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localValue.getConstant('Properties') });
            container.appendChild(properties);
            var styleNameTypeDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            container.appendChild(styleNameTypeDiv);
            var nameWholeDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            styleNameTypeDiv.appendChild(nameWholeDiv);
            var nameValue = ej2_base_1.createElement('input', { className: 'e-input e-de-style-dlg-name-input' });
            nameValue.addEventListener('keyup', this.updateOkButton);
            nameValue.addEventListener('input', this.updateOkButton);
            nameValue.addEventListener('blur', this.updateNextStyle);
            nameWholeDiv.appendChild(nameValue);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('Name') + ':', floatLabelType: 'Always' }, nameValue);
            var styleTypeWholeDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            styleNameTypeDiv.appendChild(styleTypeWholeDiv);
            var styleTypeDivElement = ej2_base_1.createElement('div');
            var styleTypeValue = ej2_base_1.createElement('select');
            styleTypeValue.innerHTML = '<option value="Paragraph">' + localValue.getConstant('Paragraph') + '</option><option value="Character">' + localValue.getConstant('Character') + '</option><option value="Linked Style">' + localValue.getConstant('Linked Style') + '</option>';
            styleTypeDivElement.appendChild(styleTypeValue);
            this.styleType = new ej2_dropdowns_1.DropDownList({
                change: this.styleTypeChange,
                popupHeight: '253px', enableRtl: isRtl,
                placeholder: localValue.getConstant('Style type') + ':', floatLabelType: 'Always'
            });
            this.styleType.appendTo(styleTypeValue);
            styleTypeWholeDiv.appendChild(styleTypeDivElement);
            var styleBasedParaDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            container.appendChild(styleBasedParaDiv);
            var styleBasedOnWholeDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            styleBasedParaDiv.appendChild(styleBasedOnWholeDiv);
            var styleBasedOnDivElement = ej2_base_1.createElement('div', { className: 'e-de-style-style-based-on-div' });
            var styleBasedOnValue = ej2_base_1.createElement('input');
            styleBasedOnDivElement.appendChild(styleBasedOnValue);
            this.styleBasedOn = new ej2_dropdowns_1.DropDownList({
                dataSource: [], select: this.styleBasedOnChange, popupHeight: '253px', enableRtl: isRtl,
                placeholder: localValue.getConstant('Style based on') + ':', floatLabelType: 'Always'
            });
            this.styleBasedOn.appendTo(styleBasedOnValue);
            styleBasedOnWholeDiv.appendChild(styleBasedOnDivElement);
            var styleParagraphWholeDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            styleBasedParaDiv.appendChild(styleParagraphWholeDiv);
            if (isRtl) {
                nameWholeDiv.classList.add('e-de-rtl');
                styleBasedOnWholeDiv.classList.add('e-de-rtl');
                styleParagraphWholeDiv.classList.add('e-de-rtl');
            }
            var styleParagraphDivElement = ej2_base_1.createElement('div');
            var styleParagraphValue = ej2_base_1.createElement('input');
            styleParagraphDivElement.appendChild(styleParagraphValue);
            this.styleParagraph = new ej2_dropdowns_1.DropDownList({
                dataSource: [], select: this.styleParagraphChange, popupHeight: '253px', enableRtl: isRtl,
                placeholder: localValue.getConstant('Style for following paragraph') + ':', floatLabelType: 'Always'
            });
            this.styleParagraph.appendTo(styleParagraphValue);
            styleParagraphWholeDiv.appendChild(styleParagraphDivElement);
            var formatting = ej2_base_1.createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: localValue.getConstant('Formatting') });
            container.appendChild(formatting);
            var optionsDiv = ej2_base_1.createElement('div', { className: 'e-de-style-options-div' });
            container.appendChild(optionsDiv);
            var fontOptionsDiv = ej2_base_1.createElement('div', { styles: 'display:flex;margin-bottom: 14px;' });
            optionsDiv.appendChild(fontOptionsDiv);
            this.createFontOptions(fontOptionsDiv, isRtl);
            var paragraphOptionsDiv = ej2_base_1.createElement('div', { styles: 'display:flex', className: 'e-style-paragraph' });
            optionsDiv.appendChild(paragraphOptionsDiv);
            this.createParagraphOptions(paragraphOptionsDiv);
            this.createFormatDropdown(container, localValue, isRtl);
            this.target.appendChild(container);
        };
        StyleDialog.prototype.createFormatDropdown = function (parentDiv, localValue, isRtl) {
            var _this = this;
            var formatBtn = ej2_base_1.createElement('button', {
                id: 'style_format_dropdown', innerHTML: localValue.getConstant('Format'),
                attrs: { type: 'button' }
            });
            formatBtn.style.height = '31px';
            parentDiv.appendChild(formatBtn);
            var items = [{ text: localValue.getConstant('Font') + '...', id: 'style_font' },
                { text: localValue.getConstant('Paragraph') + '...', id: 'style_paragraph' },
                { text: localValue.getConstant('Numbering') + '...', id: 'style_numbering' }];
            this.styleDropdwn = new ej2_splitbuttons_1.DropDownButton({
                items: items, cssClass: 'e-de-style-format-dropdwn', enableRtl: isRtl,
                beforeItemRender: function (args) {
                    if (_this.styleType.value === localValue.getConstant('Character')) {
                        if (args.item.id === "style_paragraph") {
                            args.element.classList.add('e-disabled');
                        }
                        if (args.item.id === 'style_numbering') {
                            args.element.classList.add('e-disabled');
                        }
                    }
                    else {
                        if (args.item.id === "style_paragraph") {
                            args.element.classList.remove('e-disabled');
                        }
                        if (args.item.id === 'style_numbering') {
                            args.element.classList.remove('e-disabled');
                        }
                    }
                },
            });
            this.styleDropdwn.appendTo(formatBtn);
            this.styleDropdwn.addEventListener('select', this.openDialog);
        };
        StyleDialog.prototype.createFontOptions = function (parentDiv, isRtl) {
            var _this = this;
            var fontFamilyElement = ej2_base_1.createElement('input', {
                id: this.target.id + '_fontName',
            });
            var fontStyle;
            var isStringTemplate = true;
            var itemTemplate = ej2_base_1.initializeCSPTemplate(function (data) { return "<span style=\"font-family: " + data.FontName + ";\">" + data.FontName + "</span>"; });
            parentDiv.appendChild(fontFamilyElement);
            this.fontFamily = new ej2_dropdowns_1.ComboBox({
                dataSource: fontStyle, query: new ej2_data_1.Query().select(['FontName']), fields: { text: 'FontName', value: 'value' },
                allowCustom: true, width: '123px', popupWidth: '123px',
                cssClass: 'e-style-font-fmaily-right', enableRtl: isRtl, change: this.fontFamilyChanged,
                showClearButton: false, itemTemplate: itemTemplate
            });
            this.fontFamily.appendTo(fontFamilyElement);
            this.fontFamily.isStringTemplate = isStringTemplate;
            var fontFamilyValue = this.documentHelper.owner.documentEditorSettings.fontFamilies;
            for (var i = 0; i < fontFamilyValue.length; i++) {
                var fontValue = fontFamilyValue[i];
                var fontStyleValue = { 'FontName': fontValue, 'value': fontValue };
                this.fontFamily.addItem(fontStyleValue, i);
            }
            this.fontFamily.focus = function () { _this.fontFamily.element.select(); };
            this.fontFamily.element.parentElement.setAttribute('title', this.localObj.getConstant('Font'));
            var fontSizeElement = ej2_base_1.createElement('input');
            parentDiv.appendChild(fontSizeElement);
            var sizeDataSource = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
            this.fontSize = new ej2_dropdowns_1.ComboBox({
                dataSource: sizeDataSource, width: '73px', cssClass: 'e-style-font-fmaily-right',
                enableRtl: isRtl, change: this.fontSizeUpdate
            });
            this.fontSize.showClearButton = false;
            this.fontSize.appendTo(fontSizeElement);
            var fontGroupButton = ej2_base_1.createElement('div', { className: 'e-de-style-font-group-button' });
            parentDiv.appendChild(fontGroupButton);
            this.bold = this.createButtonElement(fontGroupButton, 'e-de-bold', 'e-de-style-bold-button-size', this.documentHelper.owner.containerId + '_style_bold');
            this.bold.setAttribute('aria-label', 'bold');
            this.bold.addEventListener('click', this.setBoldProperty);
            this.italic = this.createButtonElement(fontGroupButton, 'e-de-italic', 'e-de-style-icon-button-size', this.documentHelper.owner.containerId + '_style_italic');
            this.italic.setAttribute('aria-label', 'italic');
            this.italic.addEventListener('click', this.setItalicProperty);
            this.underline = this.createButtonElement(fontGroupButton, 'e-de-underline', 'e-de-style-icon-button-size', this.documentHelper.owner.containerId + '_style_underline');
            this.underline.setAttribute('aria-label', 'underline');
            this.underline.addEventListener('click', this.setUnderlineProperty);
            var fontColorElement = ej2_base_1.createElement('input', { attrs: { type: 'color' }, className: 'e-de-style-icon-button-size' });
            parentDiv.appendChild(fontColorElement);
            this.fontColor = new ej2_inputs_1.ColorPicker({ cssClass: 'e-de-style-font-color-picker', enableRtl: isRtl, change: this.fontColorUpdate, locale: this.documentHelper.owner.locale, enableOpacity: false });
            this.fontColor.appendTo(fontColorElement);
        };
        StyleDialog.prototype.createParagraphOptions = function (parentDiv) {
            var _this = this;
            var alignmentDiv = ej2_base_1.createElement('div', { className: 'e-de-style-paragraph-group-button' });
            parentDiv.appendChild(alignmentDiv);
            this.leftAlign = this.createButtonElement(alignmentDiv, 'e-de-align-left', 'e-de-style-icon-button-size');
            this.leftAlign.setAttribute('aria-label', 'leftAlign');
            this.leftAlign.addEventListener('click', this.setLeftAlignment);
            this.centerAlign = this.createButtonElement(alignmentDiv, 'e-de-align-center', 'e-de-style-icon-button-size');
            this.centerAlign.setAttribute('aria-label', 'centerAlign');
            this.centerAlign.addEventListener('click', this.setCenterAlignment);
            this.rightAlign = this.createButtonElement(alignmentDiv, 'e-de-align-right', 'e-de-style-icon-button-size');
            this.rightAlign.setAttribute('aria-label', 'rightAlign');
            this.rightAlign.addEventListener('click', this.setRightAlignment);
            this.justify = this.createButtonElement(alignmentDiv, 'e-de-justify', 'e-de-style-icon-button-last-size');
            this.justify.setAttribute('aria-label', 'justify');
            this.justify.addEventListener('click', this.setJustifyAlignment);
            var lineSpacingDiv = ej2_base_1.createElement('div', { className: 'e-de-style-paragraph-group-button' });
            parentDiv.appendChild(lineSpacingDiv);
            this.singleLineSpacing = this.createButtonElement(lineSpacingDiv, 'e-de-single-spacing', 'e-de-style-icon-button-first-size');
            this.singleLineSpacing.setAttribute('aria-label', 'singleLineSpacing');
            this.singleLineSpacing.addEventListener('click', function () {
                _this.paragraphFormat.lineSpacing = 1;
                _this.updateParagraphFormat();
            });
            this.onePointFiveLineSpacing = this.createButtonElement(lineSpacingDiv, 'e-de-one-point-five-spacing', 'e-de-style-icon-button-size');
            this.onePointFiveLineSpacing.setAttribute('aria-label', 'onePointFiveLineSpacing');
            this.onePointFiveLineSpacing.addEventListener('click', function () {
                _this.paragraphFormat.lineSpacing = 1.5;
                _this.updateParagraphFormat();
            });
            this.doubleLineSpacing = this.createButtonElement(lineSpacingDiv, 'e-de-double-spacing', 'e-de-style-icon-button-last-size');
            this.doubleLineSpacing.setAttribute('aria-label', 'doubleLineSpacing');
            this.doubleLineSpacing.addEventListener('click', function () {
                _this.paragraphFormat.lineSpacing = 2;
                _this.updateParagraphFormat();
            });
            var spacingDiv = ej2_base_1.createElement('div', { className: 'e-de-style-paragraph-group-button' });
            parentDiv.appendChild(spacingDiv);
            var beforeSpacing = this.createButtonElement(spacingDiv, 'e-de-before-spacing', 'e-de-style-icon-button-first-size');
            beforeSpacing.setAttribute('aria-label', 'beforeSpacing');
            var afterSpacing = this.createButtonElement(spacingDiv, 'e-de-after-spacing', 'e-de-style-icon-button-last-size');
            afterSpacing.setAttribute('aria-label', 'afterSpacing');
            beforeSpacing.addEventListener('click', this.increaseBeforeAfterSpacing);
            afterSpacing.addEventListener('click', this.decreaseBeforeAfterSpacing);
            var indentingDiv = ej2_base_1.createElement('div', { className: 'e-de-style-paragraph-indent-group-button' });
            parentDiv.appendChild(indentingDiv);
            var decreaseIndent = this.createButtonElement(indentingDiv, 'e-de-indent', 'e-de-style-icon-button-first-size');
            decreaseIndent.setAttribute('aria-label', 'decreaseIndent');
            decreaseIndent.addEventListener('click', function () {
                if (_this.paragraphFormat.leftIndent >= 36) {
                    _this.paragraphFormat.leftIndent -= 36;
                }
                else {
                    _this.paragraphFormat.leftIndent = 0;
                }
            });
            var increaseindent = this.createButtonElement(indentingDiv, 'e-de-outdent', 'e-de-style-icon-button-size');
            increaseindent.setAttribute('aria-label', 'increaseindent');
            increaseindent.addEventListener('click', function () {
                _this.paragraphFormat.leftIndent += 36;
            });
        };
        StyleDialog.prototype.createButtonElement = function (parentDiv, iconCss, className, id) {
            var buttonElement = ej2_base_1.createElement('button', { attrs: { type: 'button' } });
            if (!ej2_base_1.isNullOrUndefined(id)) {
                buttonElement.id = id;
            }
            parentDiv.appendChild(buttonElement);
            var button = new ej2_buttons_1.Button({ iconCss: iconCss, cssClass: className });
            button.appendTo(buttonElement);
            return buttonElement;
        };
        StyleDialog.prototype.toggleDisable = function () {
            if (this.styleType.value === this.localObj.getConstant('Character')) {
                this.styleParagraph.enabled = false;
                this.target.getElementsByClassName('e-style-paragraph').item(0).setAttribute('style', 'display:flex;pointer-events:none;opacity:0.5');
            }
            else {
                this.styleParagraph.enabled = true;
                this.target.getElementsByClassName('e-style-paragraph').item(0).removeAttribute('style');
                this.target.getElementsByClassName('e-style-paragraph').item(0).setAttribute('style', 'display:flex');
            }
            this.styleBasedOn.enabled = true;
        };
        StyleDialog.prototype.show = function (styleName, header) {
            var localObj = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            this.isEdit = (!ej2_base_1.isNullOrUndefined(styleName) && styleName.length > 0) ? true : false;
            this.editStyleName = styleName;
            this.abstractList = new abstract_list_1.WAbstractList();
            var style = this.documentHelper.styles.findByName(styleName);
            this.style = !this.isEdit ? new style_1.WParagraphStyle() : style ? style : this.getStyle(styleName);
            localObj.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.initStyleDialog(localObj, this.documentHelper.owner.enableRtl);
            }
            if (!this.isEdit) {
                this.styleType.value = 'Paragraph';
            }
            else {
                this.styleType.value = this.style instanceof style_1.WCharacterStyle ? 'Character' : 'Paragraph';
            }
            if (ej2_base_1.isNullOrUndefined(header)) {
                header = localObj.getConstant('Create New Style');
            }
            this.documentHelper.dialog2.header = header;
            this.documentHelper.dialog2.height = 'auto';
            this.documentHelper.dialog2.width = 'auto';
            this.documentHelper.dialog2.content = this.target;
            this.documentHelper.dialog2.buttons = [{
                    click: this.onOkButtonClick,
                    buttonModel: { content: localObj.getConstant('Ok'), cssClass: 'e-flat e-style-okay', isPrimary: true }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat e-style-cancel' }
                }];
            this.toggleDisable();
            this.documentHelper.dialog2.dataBind();
            this.documentHelper.dialog2.beforeOpen = this.loadStyleDialog;
            this.documentHelper.dialog2.close = this.closeStyleDialog;
            this.documentHelper.dialog2.position = { X: 'center', Y: 'center' };
            this.documentHelper.dialog2.show();
        };
        StyleDialog.prototype.updateList = function () {
            var listId = this.style.paragraphFormat.listFormat.listId;
            if (listId > -1) {
                if (this.documentHelper.lists.filter(function (a) { return (a.listId === listId); }).length === 0) {
                    this.documentHelper.lists.push(this.style.paragraphFormat.listFormat.list);
                }
                else {
                    this.documentHelper.lists = this.documentHelper.lists.filter(function (a) { return (a.listId !== listId); });
                    this.documentHelper.lists.push(this.style.paragraphFormat.listFormat.list);
                }
            }
            if (this.abstractList.abstractListId !== -1) {
                this.documentHelper.abstractLists.push(this.abstractList);
            }
        };
        StyleDialog.prototype.createLinkStyle = function (name, isEdit) {
            var charStyle;
            if (isEdit) {
                charStyle = this.documentHelper.styles.findByName((name + ' Char'), 'Character');
            }
            else {
                charStyle = new style_1.WCharacterStyle();
            }
            charStyle.type = 'Character';
            charStyle.name = name + ' Char';
            charStyle.characterFormat = this.style.characterFormat.cloneFormat();
            charStyle.basedOn = this.style.basedOn;
            if (!isEdit) {
                this.documentHelper.styles.push(charStyle);
            }
            return this.documentHelper.styles.findByName(charStyle.name, 'Character');
        };
        StyleDialog.prototype.updateCharacterFormat = function (characterFormat) {
            if (!ej2_base_1.isNullOrUndefined(characterFormat)) {
                this.characterFormat = characterFormat;
            }
            this.fontFamily.value = this.characterFormat.fontFamily;
            this.fontSize.value = this.characterFormat.fontSize;
            var color = this.characterFormat.fontColor;
            this.fontColor.value = (color === 'empty' || color === '#00000000') ? '#000000' : color;
            this.fontButtonClicked();
        };
        StyleDialog.prototype.updateParagraphFormat = function (paragraphFOrmat) {
            if (!ej2_base_1.isNullOrUndefined(paragraphFOrmat)) {
                this.paragraphFormat = paragraphFOrmat;
            }
            if (ej2_base_1.isNullOrUndefined(this.paragraphFormat)) {
                return;
            }
            if (this.paragraphFormat.textAlignment === 'Left') {
                if (!this.leftAlign.classList.contains('e-active')) {
                    this.leftAlign.classList.add('e-active');
                }
                if (this.rightAlign.classList.contains('e-active')) {
                    this.rightAlign.classList.remove('e-active');
                }
                if (this.centerAlign.classList.contains('e-active')) {
                    this.centerAlign.classList.remove('e-active');
                }
                if (this.justify.classList.contains('e-active')) {
                    this.justify.classList.remove('e-active');
                }
            }
            else if (this.paragraphFormat.textAlignment === 'Right') {
                if (this.leftAlign.classList.contains('e-active')) {
                    this.leftAlign.classList.remove('e-active');
                }
                if (!this.rightAlign.classList.contains('e-active')) {
                    this.rightAlign.classList.add('e-active');
                }
                if (this.centerAlign.classList.contains('e-active')) {
                    this.centerAlign.classList.remove('e-active');
                }
                if (this.justify.classList.contains('e-active')) {
                    this.justify.classList.remove('e-active');
                }
            }
            else if (this.paragraphFormat.textAlignment === 'Center') {
                if (this.leftAlign.classList.contains('e-active')) {
                    this.leftAlign.classList.remove('e-active');
                }
                if (this.rightAlign.classList.contains('e-active')) {
                    this.rightAlign.classList.remove('e-active');
                }
                if (!this.centerAlign.classList.contains('e-active')) {
                    this.centerAlign.classList.add('e-active');
                }
                if (this.justify.classList.contains('e-active')) {
                    this.justify.classList.remove('e-active');
                }
            }
            else if (this.paragraphFormat.textAlignment === 'Justify') {
                if (this.leftAlign.classList.contains('e-active')) {
                    this.leftAlign.classList.remove('e-active');
                }
                if (this.rightAlign.classList.contains('e-active')) {
                    this.rightAlign.classList.remove('e-active');
                }
                if (this.centerAlign.classList.contains('e-active')) {
                    this.centerAlign.classList.remove('e-active');
                }
                if (!this.justify.classList.contains('e-active')) {
                    this.justify.classList.add('e-active');
                }
            }
            if (this.paragraphFormat.lineSpacing === 1) {
                this.singleLineSpacing.classList.add('e-active');
                this.onePointFiveLineSpacing.classList.remove('e-active');
                this.doubleLineSpacing.classList.remove('e-active');
            }
            else if (this.paragraphFormat.lineSpacing === 1.5) {
                this.singleLineSpacing.classList.remove('e-active');
                this.onePointFiveLineSpacing.classList.add('e-active');
                this.doubleLineSpacing.classList.remove('e-active');
            }
            else if (this.paragraphFormat.lineSpacing === 2) {
                this.singleLineSpacing.classList.remove('e-active');
                this.onePointFiveLineSpacing.classList.remove('e-active');
                this.doubleLineSpacing.classList.add('e-active');
            }
            else {
                this.singleLineSpacing.classList.remove('e-active');
                this.onePointFiveLineSpacing.classList.remove('e-active');
                this.doubleLineSpacing.classList.remove('e-active');
            }
        };
        StyleDialog.prototype.enableOrDisableOkButton = function () {
            if (!ej2_base_1.isNullOrUndefined(this.okButton)) {
                this.okButton.disabled = (this.styleNameElement.value === '');
            }
        };
        StyleDialog.prototype.getTypeValue = function (type) {
            var value = !ej2_base_1.isNullOrUndefined(type) ? type : this.styleType.value;
            if (value === 'Linked Style' || value === 'Paragraph') {
                return 'Paragraph';
            }
            else {
                return 'Character';
            }
        };
        StyleDialog.prototype.updateStyleNames = function (type, name) {
            var localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localValue.setLocale(this.documentHelper.owner.locale);
            var styles = this.documentHelper.styles.getStyleNames(type);
            var finalList = [];
            for (var i = 0; i < styles.length; i++) {
                var styleName = localValue.getConstant(styles[parseInt(i.toString(), 10)]);
                if (styleName === '') {
                    styleName = styles[parseInt(i.toString(), 10)];
                }
                finalList.push(styleName);
            }
            this.styleParagraph.dataSource = finalList;
            this.styleParagraph.index = null;
            if (name) {
                this.styleBasedOn.dataSource = finalList.filter(function (e) { return e !== name; });
                this.styleBasedOn.index = null;
                var style = this.getStyle(name);
                if (style.basedOn instanceof String || ej2_base_1.isNullOrUndefined(style.basedOn)) {
                    this.styleBasedOn.enabled = false;
                }
                else {
                    this.styleBasedOn.index = styles.indexOf(style.basedOn.name) > -1 ? styles.indexOf(style.basedOn.name) : 0;
                }
                if (style.type === 'Paragraph') {
                    if (!ej2_base_1.isNullOrUndefined(style.link)) {
                        this.styleType.index = 2;
                    }
                    else {
                        this.styleType.index = 0;
                    }
                }
                else {
                    this.styleType.index = 1;
                }
                if (!ej2_base_1.isNullOrUndefined(style.next)) {
                    var nxtName = style.next.name;
                    var index = 0;
                    if (styles.indexOf(nxtName) > -1) {
                        index = styles.indexOf(nxtName);
                    }
                    this.styleParagraph.index = index;
                    this.isUserNextParaUpdated = (nxtName === name) ? false : true;
                }
            }
            else {
                this.styleBasedOn.dataSource = finalList;
                this.styleBasedOn.index = null;
                var basedOnIndex = 0;
                if (this.documentHelper.owner.selectionModule) {
                    var styleName = void 0;
                    if (type === 'Character') {
                        styleName = this.documentHelper.owner.selection.characterFormat.styleName;
                    }
                    else {
                        styleName = this.documentHelper.owner.selection.paragraphFormat.styleName;
                    }
                    basedOnIndex = styles.indexOf(styleName);
                }
                this.styleBasedOn.index = basedOnIndex;
                this.styleParagraph.index = 0;
            }
            if (this.isEdit) {
                this.styleType.enabled = false;
            }
            else {
                this.styleType.enabled = true;
            }
        };
        StyleDialog.prototype.getStyle = function (styleName) {
            if (ej2_base_1.isNullOrUndefined(this.documentHelper.styles.findByName(styleName))) {
                this.documentHelper.owner.editor.createStyle(this.documentHelper.preDefinedStyles.get(styleName));
            }
            return this.documentHelper.styles.findByName(styleName);
        };
        StyleDialog.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.target)) {
                if (this.target.parentElement) {
                    this.target.parentElement.removeChild(this.target);
                }
                for (var n = 0; n < this.target.childNodes.length; n++) {
                    this.target.removeChild(this.target.childNodes[n]);
                    n--;
                }
                this.target = undefined;
            }
            if (this.characterFormat) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            if (this.paragraphFormat) {
                this.paragraphFormat.destroy();
                this.paragraphFormat = undefined;
            }
            if (this.fontColor) {
                this.fontColor.destroy();
                this.fontColor = undefined;
            }
            if (this.fontSize) {
                this.fontSize.destroy();
                this.fontSize = undefined;
            }
            if (this.fontFamily) {
                this.fontFamily.destroy();
                this.fontFamily = undefined;
            }
            if (this.styleType) {
                this.styleType.destroy();
                this.styleType = undefined;
            }
            if (this.styleBasedOn) {
                this.styleBasedOn.destroy();
                this.styleBasedOn = undefined;
            }
            if (this.styleParagraph) {
                this.styleParagraph.destroy();
                this.styleParagraph = undefined;
            }
            if (this.onlyThisDocument) {
                this.onlyThisDocument.destroy();
            }
            this.onlyThisDocument = undefined;
            if (this.template) {
                this.template.destroy();
                this.template = undefined;
            }
            if (this.style) {
                this.style.destroy();
                this.style = undefined;
            }
            if (this.abstractList) {
                this.abstractList.destroy();
                this.abstractList = undefined;
            }
            if (this.numberingBulletDialog) {
                this.numberingBulletDialog.destroy();
                this.numberingBulletDialog = undefined;
            }
            if (this.styleDropdwn) {
                this.styleDropdwn.destroy();
                this.styleDropdwn = undefined;
            }
            this.documentHelper = undefined;
        };
        return StyleDialog;
    }());
    exports.StyleDialog = StyleDialog;
});
