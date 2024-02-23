define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-buttons", "../viewer/page", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_buttons_1, page_1, ej2_inputs_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CheckBoxFormFieldDialog = (function () {
        function CheckBoxFormFieldDialog(owner) {
            var _this = this;
            this.changeBidirectional = function (event) {
                if (event.value === 'exact') {
                    _this.autoButton.checked = !_this.exactButton.checked;
                    _this.exactlyNumber.enabled = true;
                }
                else {
                    _this.exactButton.checked = !_this.autoButton.checked;
                    _this.exactlyNumber.enabled = false;
                }
            };
            this.changeBidirect = function (event) {
                if (event.value === 'check') {
                    _this.notCheckedButton.checked = !_this.checkedButton.checked;
                }
                else {
                    _this.checkedButton.checked = !_this.notCheckedButton.checked;
                }
            };
            this.onCancelButtonClick = function () {
                _this.documentHelper.dialog.hide();
            };
            this.insertCheckBoxField = function () {
                _this.closeCheckBoxField();
                var checkBoxField = new page_1.CheckBoxFormField();
                checkBoxField.defaultValue = _this.checkedButton.checked;
                checkBoxField.name = ej2_base_2.SanitizeHtmlHelper.sanitize(_this.bookmarkInputText.value);
                checkBoxField.helpText = ej2_base_2.SanitizeHtmlHelper.sanitize(_this.tooltipInputText.value);
                checkBoxField.checked = checkBoxField.defaultValue;
                checkBoxField.enabled = _this.checBoxEnableElement.checked;
                if (_this.exactButton.checked) {
                    checkBoxField.sizeType = 'Exactly';
                    checkBoxField.size = _this.exactlyNumber.value;
                }
                else {
                    checkBoxField.sizeType = 'Auto';
                    checkBoxField.size = 11;
                }
                _this.owner.editor.editFormField('CheckBox', checkBoxField);
            };
            this.closeCheckBoxField = function () {
                _this.documentHelper.dialog.hide();
                _this.documentHelper.dialog.element.style.pointerEvents = '';
            };
            this.owner = owner;
        }
        Object.defineProperty(CheckBoxFormFieldDialog.prototype, "documentHelper", {
            get: function () {
                return this.owner.documentHelper;
            },
            enumerable: true,
            configurable: true
        });
        CheckBoxFormFieldDialog.prototype.getModuleName = function () {
            return 'CheckBoxFormFieldDialog';
        };
        CheckBoxFormFieldDialog.prototype.initCheckBoxDialog = function (localValue, isRtl) {
            this.target = ej2_base_1.createElement('div');
            var dialogDiv = ej2_base_1.createElement('div');
            var headingLabel = ej2_base_1.createElement('div', {
                className: 'e-de-para-dlg-heading',
                innerHTML: localValue.getConstant('Check box size')
            });
            var sizeParentDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var autoDiv = ej2_base_1.createElement('div', { className: 'e-de-ff-radio-scnd-div' });
            var exactDiv = ej2_base_1.createElement('div', { className: 'e-de-ff-radio-scnd-div' });
            var autoEle = ej2_base_1.createElement('input', { className: 'e-de-rtl-btn-div', attrs: { 'aria-label': localValue.getConstant('Auto') } });
            var exactEle = ej2_base_1.createElement('input', { className: 'e-de-rtl-btn-div', attrs: { 'aria-label': localValue.getConstant('Exactly') } });
            this.autoButton = new ej2_buttons_1.RadioButton({
                label: localValue.getConstant('Auto'), cssClass: 'e-small', change: this.changeBidirectional, checked: true,
                enableRtl: isRtl
            });
            this.exactButton = new ej2_buttons_1.RadioButton({
                label: localValue.getConstant('Exactly'), value: 'exact', cssClass: 'e-small', change: this.changeBidirectional,
                enableRtl: isRtl
            });
            this.exactNumberDiv = ej2_base_1.createElement('div', { className: 'e-de-ff-chck-exact' });
            var exactNumber = ej2_base_1.createElement('input', { attrs: { 'type': 'text', 'aria-label': localValue.getConstant('Exactly') } });
            this.exactlyNumber = new ej2_inputs_1.NumericTextBox({
                format: 'n', value: 10, min: 1, max: 1584, enablePersistence: false, enabled: false, cssClass: 'e-de-check-exactnumbr-width',
                enableRtl: isRtl
            });
            var defaultValueLabel = ej2_base_1.createElement('div', {
                className: 'e-de-para-dlg-heading',
                innerHTML: localValue.getConstant('Default value')
            });
            var defaultcheckDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var notcheckDiv = ej2_base_1.createElement('div', { className: 'e-de-ff-radio-div' });
            var checkDiv = ej2_base_1.createElement('div', { className: 'e-de-ff-radio-div' });
            var notcheckEle = ej2_base_1.createElement('input', { className: 'e-de-rtl-btn-div', attrs: { 'aria-label': localValue.getConstant('Not checked') } });
            var checkEle = ej2_base_1.createElement('input', { className: 'e-de-rtl-btn-div', attrs: { 'aria-label': localValue.getConstant('Checked') } });
            this.notCheckedButton = new ej2_buttons_1.RadioButton({
                label: localValue.getConstant('Not checked'), enableRtl: isRtl, cssClass: 'e-small', change: this.changeBidirect
            });
            this.checkedButton = new ej2_buttons_1.RadioButton({
                label: localValue.getConstant('Checked'), value: 'check', enableRtl: isRtl, cssClass: 'e-small',
                change: this.changeBidirect, checked: true
            });
            var fieldSettingsLabel = ej2_base_1.createElement('div', {
                className: 'e-de-para-dlg-heading',
                innerHTML: localValue.getConstant('Field settings')
            });
            var settingsTotalDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var totalToolTipDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            var totalBookmarkDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            this.tooltipInputText = ej2_base_1.createElement('input', { className: 'e-input e-bookmark-textbox-input', attrs: { 'aira-label': localValue.getConstant('Tooltip') } });
            this.bookmarkInputText = ej2_base_1.createElement('input', { className: 'e-input e-bookmark-textbox-input', attrs: { 'aira-label': localValue.getConstant('Name') } });
            var checkBoxEnableDiv = ej2_base_1.createElement('div');
            var checBoxEnableEle = ej2_base_1.createElement('input', { attrs: { type: 'checkbox' } });
            checBoxEnableEle.setAttribute('aria-label', localValue.getConstant('Check box enabled'));
            this.checBoxEnableElement = new ej2_buttons_1.CheckBox({
                cssClass: 'e-de-ff-dlg-check',
                label: localValue.getConstant('Check box enabled'),
                enableRtl: isRtl
            });
            if (isRtl) {
                autoDiv.classList.add('e-de-rtl');
                exactDiv.classList.add('e-de-rtl');
                this.exactNumberDiv.classList.add('e-de-rtl');
                notcheckDiv.classList.add('e-de-rtl');
                checkDiv.classList.add('e-de-rtl');
                totalToolTipDiv.classList.add('e-de-rtl');
                totalBookmarkDiv.classList.add('e-de-rtl');
            }
            this.target.appendChild(dialogDiv);
            dialogDiv.appendChild(defaultValueLabel);
            dialogDiv.appendChild(defaultcheckDiv);
            defaultcheckDiv.appendChild(notcheckDiv);
            notcheckDiv.appendChild(notcheckEle);
            this.notCheckedButton.appendTo(notcheckEle);
            defaultcheckDiv.appendChild(checkDiv);
            checkDiv.appendChild(checkEle);
            this.checkedButton.appendTo(checkEle);
            dialogDiv.appendChild(headingLabel);
            dialogDiv.appendChild(sizeParentDiv);
            sizeParentDiv.appendChild(autoDiv);
            autoDiv.appendChild(autoEle);
            this.autoButton.appendTo(autoEle);
            sizeParentDiv.appendChild(exactDiv);
            exactDiv.appendChild(exactEle);
            this.exactButton.appendTo(exactEle);
            exactDiv.appendChild(this.exactNumberDiv);
            this.exactNumberDiv.appendChild(exactNumber);
            this.exactlyNumber.appendTo(exactNumber);
            dialogDiv.appendChild(fieldSettingsLabel);
            dialogDiv.appendChild(settingsTotalDiv);
            settingsTotalDiv.appendChild(totalToolTipDiv);
            settingsTotalDiv.appendChild(totalBookmarkDiv);
            totalToolTipDiv.appendChild(this.tooltipInputText);
            totalBookmarkDiv.appendChild(this.bookmarkInputText);
            dialogDiv.appendChild(checkBoxEnableDiv);
            checkBoxEnableDiv.appendChild(checBoxEnableEle);
            this.checBoxEnableElement.appendTo(checBoxEnableEle);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('Tooltip'), floatLabelType: 'Always' }, this.tooltipInputText);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('Name'), floatLabelType: 'Always' }, this.bookmarkInputText);
        };
        CheckBoxFormFieldDialog.prototype.show = function () {
            var localObj = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localObj.setLocale(this.documentHelper.owner.locale);
            if (ej2_base_1.isNullOrUndefined(this.target)) {
                this.initCheckBoxDialog(localObj, this.documentHelper.owner.enableRtl);
            }
            this.loadCheckBoxDialog();
            this.documentHelper.dialog.header = localObj.getConstant('Check Box Form Field');
            this.documentHelper.dialog.position = { X: 'center', Y: 'center' };
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = '400px';
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.buttons = [{
                    click: this.insertCheckBoxField,
                    buttonModel: { content: localObj.getConstant('Ok'), cssClass: 'e-flat e-table-cell-margin-okay', isPrimary: true }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat e-table-cell-margin-cancel' }
                }];
            this.documentHelper.dialog.show();
        };
        CheckBoxFormFieldDialog.prototype.loadCheckBoxDialog = function () {
            var inline = this.owner.selection.getCurrentFormField();
            if (inline instanceof page_1.FieldElementBox) {
                this.fieldBegin = inline;
                var fieldData = this.fieldBegin.formFieldData;
                if (!fieldData.defaultValue) {
                    this.checkedButton.checked = false;
                    this.notCheckedButton.checked = true;
                }
                else {
                    this.checkedButton.checked = true;
                    this.notCheckedButton.checked = false;
                }
                if (fieldData.sizeType !== 'Auto') {
                    this.exactButton.checked = true;
                    this.autoButton.checked = false;
                    this.exactlyNumber.enabled = true;
                }
                else {
                    this.autoButton.checked = true;
                    this.exactButton.checked = false;
                    this.exactlyNumber.enabled = false;
                }
                if (fieldData.size) {
                    this.exactlyNumber.value = fieldData.size;
                }
                if (fieldData.enabled) {
                    this.checBoxEnableElement.checked = true;
                }
                else {
                    this.checBoxEnableElement.checked = false;
                }
                if (fieldData.name && fieldData.name !== '') {
                    this.bookmarkInputText.value = fieldData.name;
                }
                else {
                    this.bookmarkInputText.value = '';
                }
                if (fieldData.helpText && fieldData.helpText !== '') {
                    this.tooltipInputText.value = fieldData.helpText;
                }
                else {
                    this.tooltipInputText.value = '';
                }
            }
        };
        CheckBoxFormFieldDialog.prototype.destroy = function () {
            var checkBoxDialogTarget = this.target;
            if (checkBoxDialogTarget) {
                if (checkBoxDialogTarget.parentElement) {
                    checkBoxDialogTarget.parentElement.removeChild(checkBoxDialogTarget);
                }
                this.target = undefined;
            }
            this.owner = undefined;
            if (this.autoButton) {
                this.autoButton.destroy();
                this.autoButton = undefined;
            }
            if (this.exactButton) {
                this.exactButton.destroy();
                this.exactButton = undefined;
            }
            if (this.notCheckedButton) {
                this.notCheckedButton.destroy();
                this.notCheckedButton = undefined;
            }
            if (this.checkedButton) {
                this.checkedButton.destroy();
                this.checkedButton = undefined;
            }
            this.bookmarkInputText = undefined;
            this.tooltipInputText = undefined;
            if (this.checBoxEnableElement) {
                this.checBoxEnableElement.destroy();
                this.checBoxEnableElement = undefined;
            }
            if (this.exactlyNumber) {
                this.exactlyNumber.destroy();
                this.exactlyNumber = undefined;
            }
            this.exactNumberDiv = undefined;
        };
        return CheckBoxFormFieldDialog;
    }());
    exports.CheckBoxFormFieldDialog = CheckBoxFormFieldDialog;
});
