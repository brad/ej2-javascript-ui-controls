define(["require", "exports", "@syncfusion/ej2-base", "../editor/editor-helper", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-buttons", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, editor_helper_1, ej2_dropdowns_1, ej2_buttons_1, ej2_inputs_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HyperlinkDialog = (function () {
        function HyperlinkDialog(documentHelper) {
            var _this = this;
            this.displayText = '';
            this.navigationUrl = undefined;
            this.screenTipText = '';
            this.bookmarkDropdown = undefined;
            this.bookmarkCheckbox = undefined;
            this.bookmarks = [];
            this.onKeyUpOnUrlBox = function (event) {
                if (event.keyCode === 13) {
                    if (_this.displayTextBox.value !== '' && _this.urlTextBox.value !== '') {
                        _this.onInsertHyperlink();
                    }
                    return;
                }
                var urlValue = _this.urlTextBox.value;
                if (urlValue.substring(0, 4).toLowerCase() === 'www.') {
                    _this.urlTextBox.value = 'http://' + urlValue;
                }
                if (_this.displayText === '') {
                    _this.displayTextBox.value = urlValue;
                }
                _this.enableOrDisableInsertButton();
            };
            this.onKeyUpOnDisplayBox = function () {
                _this.displayText = _this.displayTextBox.value;
                _this.enableOrDisableInsertButton();
            };
            this.onScreenTipTextBox = function () {
                _this.screenTipText = _this.screenTipTextBox.value;
            };
            this.onInsertButtonClick = function () {
                _this.onInsertHyperlink();
            };
            this.onCancelButtonClick = function () {
                _this.documentHelper.dialog.hide();
                _this.clearValue();
                _this.documentHelper.updateFocus();
            };
            this.loadHyperlinkDialog = function () {
                _this.documentHelper.updateFocus();
                _this.bookmarks = [];
                for (var i = 0; i < _this.documentHelper.bookmarks.keys.length; i++) {
                    var bookmark = _this.documentHelper.bookmarks.keys[parseInt(i.toString(), 10)];
                    if (bookmark.indexOf('_') !== 0) {
                        _this.bookmarks.push(bookmark);
                    }
                }
                var fieldBegin = _this.documentHelper.selection.getHyperlinkField();
                if (!ej2_base_1.isNullOrUndefined(fieldBegin)) {
                    if (!ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                        var format = undefined;
                        var fieldObj = _this.documentHelper.selection.getHyperlinkDisplayText(fieldBegin.fieldSeparator.line.paragraph, fieldBegin.fieldSeparator, fieldBegin.fieldEnd, false, format);
                        _this.displayText = fieldObj.displayText;
                        _this.displayTextBox.disabled = fieldObj.isNestedField;
                    }
                    _this.displayTextBox.value = _this.displayText;
                    _this.screenTipTextBox.value = _this.documentHelper.selection.getLinkText(fieldBegin, false);
                    var link = _this.documentHelper.selection.getLinkText(fieldBegin, true);
                    _this.urlTextBox.value = _this.navigationUrl = link;
                    _this.documentHelper.dialog.header = _this.localObj.getConstant('Edit Hyperlink');
                }
                else {
                    _this.displayText = _this.documentHelper.selection.getText(true);
                    if (_this.displayText !== '') {
                        if (_this.displayText.indexOf(String.fromCharCode(65532)) !== -1 ||
                            _this.displayText.indexOf('\r') !== -1 && (_this.displayText.lastIndexOf('\r') !== -1 &&
                                _this.displayText.slice(0, -1).indexOf('\r') !== -1)) {
                            _this.displayTextBox.value = '<<Selection in document>>';
                            _this.displayTextBox.disabled = true;
                        }
                        else {
                            _this.displayTextBox.value = _this.displayText;
                        }
                    }
                }
                _this.bookmarkDiv.style.display = 'none';
                _this.addressText.style.display = 'block';
                _this.urlTextBox.style.display = 'block';
                _this.bookmarkCheckbox.checked = false;
                _this.bookmarkDropdown.dataSource = _this.documentHelper.bookmarks.keys;
                _this.insertButton = document.getElementsByClassName('e-hyper-insert')[0];
                _this.enableOrDisableInsertButton();
                _this.urlTextBox.focus();
                if (_this.documentHelper.selection.caret.style.display !== 'none') {
                    _this.documentHelper.selection.caret.style.display = 'none';
                }
            };
            this.closeHyperlinkDialog = function () {
                _this.clearValue();
                _this.documentHelper.updateFocus();
            };
            this.onUseBookmarkChange = function (args) {
                if (args.checked) {
                    _this.bookmarkDiv.style.display = 'block';
                    _this.bookmarkDropdown.dataSource = _this.bookmarks;
                    _this.addressText.style.display = 'none';
                    _this.urlTextBox.style.display = 'none';
                }
                else {
                    _this.bookmarkDiv.style.display = 'none';
                    _this.addressText.style.display = 'block';
                    _this.urlTextBox.style.display = 'block';
                }
                _this.enableOrDisableInsertButton();
            };
            this.onBookmarkchange = function () {
                if (_this.bookmarkDropdown.value !== '') {
                    _this.insertButton.disabled = false;
                }
            };
            this.documentHelper = documentHelper;
        }
        HyperlinkDialog.prototype.getModuleName = function () {
            return 'HyperlinkDialog';
        };
        HyperlinkDialog.prototype.initHyperlinkDialog = function (localValue, isRtl) {
            this.target = ej2_base_1.createElement('div', { className: 'e-de-hyperlink' });
            var container = ej2_base_1.createElement('div');
            var displayText = ej2_base_1.createElement('div', { className: 'e-de-dlg-container' });
            this.displayTextBox = ej2_base_1.createElement('input', { className: 'e-input' });
            this.displayTextBox.addEventListener('keyup', this.onKeyUpOnDisplayBox);
            displayText.appendChild(this.displayTextBox);
            container.appendChild(displayText);
            this.addressText = ej2_base_1.createElement('div', { className: 'e-de-dlg-container' });
            this.urlTextBox = ej2_base_1.createElement('input', { className: 'e-input', attrs: { autofocus: 'true' } });
            this.urlTextBox.addEventListener('input', this.onKeyUpOnUrlBox);
            this.urlTextBox.addEventListener('keyup', this.onKeyUpOnUrlBox);
            this.addressText.appendChild(this.urlTextBox);
            container.appendChild(this.addressText);
            var screenTipText = ej2_base_1.createElement('div', { className: 'e-de-dlg-container' });
            this.screenTipTextBox = ej2_base_1.createElement('input', { className: 'e-input' });
            this.screenTipTextBox.addEventListener('keyup', this.onScreenTipTextBox);
            screenTipText.appendChild(this.screenTipTextBox);
            container.appendChild(screenTipText);
            this.bookmarkDiv = ej2_base_1.createElement('div', { styles: 'display:none;' });
            var bookmarkText = ej2_base_1.createElement('div', { className: 'e-de-dlg-container' });
            var bookmarkValue = ej2_base_1.createElement('input');
            bookmarkText.appendChild(bookmarkValue);
            this.bookmarkDropdown = new ej2_dropdowns_1.DropDownList({
                dataSource: [], change: this.onBookmarkchange,
                noRecordsTemplate: localValue.getConstant('No bookmarks found'),
                placeholder: localValue.getConstant('Bookmark'), floatLabelType: 'Always'
            });
            this.bookmarkDropdown.appendTo(bookmarkValue);
            this.bookmarkDiv.appendChild(bookmarkText);
            container.appendChild(this.bookmarkDiv);
            var bookmarkCheckDiv = ej2_base_1.createElement('div');
            var bookmarkCheck = ej2_base_1.createElement('input', { attrs: { type: 'checkbox' } });
            bookmarkCheckDiv.appendChild(bookmarkCheck);
            this.bookmarkCheckbox = new ej2_buttons_1.CheckBox({
                label: localValue.getConstant('Use bookmarks'),
                enableRtl: isRtl, change: this.onUseBookmarkChange
            });
            this.bookmarkCheckbox.appendTo(bookmarkCheck);
            container.appendChild(bookmarkCheckDiv);
            this.target.appendChild(container);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('Text to display'), floatLabelType: 'Always' }, this.displayTextBox);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('Address'), floatLabelType: 'Always' }, this.urlTextBox);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('ScreenTip text'), floatLabelType: 'Always' }, this.screenTipTextBox);
        };
        HyperlinkDialog.prototype.show = function () {
            this.localObj = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            this.localObj.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.initHyperlinkDialog(this.localObj, this.documentHelper.owner.enableRtl);
            }
            this.documentHelper.dialog.header = this.localObj.getConstant('Insert Hyperlink');
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.buttons = [{
                    click: this.onInsertButtonClick,
                    buttonModel: { content: this.localObj.getConstant('Ok'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: this.localObj.getConstant('Cancel'), cssClass: 'e-flat e-hyper-cancel' }
                }];
            this.documentHelper.dialog.dataBind();
            this.documentHelper.dialog.beforeOpen = this.loadHyperlinkDialog;
            this.documentHelper.dialog.close = this.closeHyperlinkDialog;
            this.documentHelper.dialog.show();
        };
        HyperlinkDialog.prototype.hide = function () {
            this.closeHyperlinkDialog();
        };
        HyperlinkDialog.prototype.enableOrDisableInsertButton = function () {
            if (!ej2_base_1.isNullOrUndefined(this.insertButton)) {
                if (this.bookmarkCheckbox.checked) {
                    this.insertButton.disabled = this.bookmarkDropdown.value === '' || this.bookmarkDropdown.value == null;
                }
                else {
                    this.insertButton.disabled = this.urlTextBox.value === '' || this.displayTextBox.value === '';
                }
            }
        };
        HyperlinkDialog.prototype.onInsertHyperlink = function () {
            var displayText = ej2_base_2.SanitizeHtmlHelper.sanitize(this.displayTextBox.value.trim());
            var address = this.urlTextBox.value.trim();
            if (editor_helper_1.HelperMethods.startsWith(address, 'http://') || editor_helper_1.HelperMethods.startsWith(address, 'https://')) {
                address = ej2_base_2.SanitizeHtmlHelper.sanitize(address.replace(/\s/g, ""));
            }
            var screenTipText = ej2_base_2.SanitizeHtmlHelper.sanitize(this.screenTipTextBox.value.trim());
            var isBookmark = false;
            if (!ej2_base_1.isNullOrUndefined(this.bookmarkDropdown.value) && this.bookmarkDropdown.value !== '' && this.bookmarkCheckbox.checked === true) {
                address = this.bookmarkDropdown.value;
                isBookmark = true;
            }
            if (address === '') {
                this.documentHelper.hideDialog();
                return;
            }
            if (screenTipText !== '') {
                address = address + '\" \\o \"' + screenTipText;
            }
            if (displayText === '' && address !== '') {
                displayText = address;
            }
            else {
                displayText = this.displayTextBox.value;
            }
            if (!ej2_base_1.isNullOrUndefined(this.navigationUrl)) {
                this.documentHelper.owner.editorModule.editHyperlink(this.documentHelper.selection, address, displayText, isBookmark);
            }
            else {
                var remove = (this.documentHelper.selection.text !== displayText ||
                    this.documentHelper.selection.text.indexOf('\r') === -1) && !this.displayTextBox.disabled;
                this.documentHelper.owner.editorModule.insertHyperlinkInternal(address, displayText, remove, isBookmark);
            }
            this.documentHelper.hideDialog();
            this.navigationUrl = undefined;
        };
        HyperlinkDialog.prototype.clearValue = function () {
            this.displayTextBox.value = '';
            this.urlTextBox.value = '';
            this.screenTipText = '';
            this.screenTipTextBox.value = '';
            this.displayText = '';
            this.displayTextBox.disabled = false;
            this.bookmarks = [];
        };
        HyperlinkDialog.prototype.destroy = function () {
            if (this.displayTextBox) {
                this.displayTextBox.innerHTML = '';
                this.displayTextBox = undefined;
            }
            if (this.urlTextBox) {
                this.urlTextBox.parentElement.removeChild(this.urlTextBox);
                this.urlTextBox = undefined;
            }
            if (this.screenTipTextBox) {
                this.screenTipTextBox.parentElement.removeChild(this.screenTipTextBox);
                this.screenTipTextBox = undefined;
            }
            this.documentHelper = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.target)) {
                if (this.target.parentElement) {
                    this.target.parentElement.removeChild(this.target);
                }
                this.target.innerHTML = '';
                this.target = undefined;
            }
        };
        return HyperlinkDialog;
    }());
    exports.HyperlinkDialog = HyperlinkDialog;
});
