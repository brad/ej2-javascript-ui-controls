define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-popups", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_popups_1, ej2_inputs_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnforceProtectionDialog = (function () {
        function EnforceProtectionDialog(documentHelper, owner) {
            var _this = this;
            this.show = function () {
                _this.localeValue = new ej2_base_1.L10n('documenteditor', _this.viewer.owner.defaultLocale);
                _this.localeValue.setLocale(_this.viewer.owner.locale);
                if (!_this.target) {
                    _this.initDialog(_this.localeValue);
                }
                _this.documentHelper.dialog.header = _this.localeValue.getConstant('Start Enforcing Protection');
                _this.documentHelper.dialog.height = 'auto';
                _this.documentHelper.dialog.content = _this.target;
                _this.documentHelper.dialog.width = 'auto';
                _this.documentHelper.dialog.buttons = [{
                        click: _this.okButtonClick,
                        buttonModel: { content: _this.localeValue.getConstant('Ok'), cssClass: 'e-flat', isPrimary: true }
                    },
                    {
                        click: _this.hideDialog,
                        buttonModel: { content: _this.localeValue.getConstant('Cancel'), cssClass: 'e-flat' }
                    }];
                _this.passwordTextBox.value = '';
                _this.confirmPasswordTextBox.value = '';
                _this.documentHelper.dialog.show();
            };
            this.hideDialog = function () {
                _this.passwordTextBox.value = '';
                _this.confirmPasswordTextBox.value = '';
                _this.documentHelper.dialog.hide();
            };
            this.okButtonClick = function () {
                if (_this.passwordTextBox.value !== _this.confirmPasswordTextBox.value) {
                    ej2_popups_1.DialogUtility.alert(_this.localeValue.getConstant('Password Mismatch'));
                }
                else {
                    _this.password = ej2_base_2.SanitizeHtmlHelper.sanitize(_this.passwordTextBox.value);
                    _this.viewer.owner.editor.addProtection(_this.password, _this.owner.protectionType);
                }
            };
            this.documentHelper = documentHelper;
            this.owner = owner;
        }
        Object.defineProperty(EnforceProtectionDialog.prototype, "viewer", {
            get: function () {
                return this.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        EnforceProtectionDialog.prototype.initDialog = function (localValue) {
            this.target = ej2_base_1.createElement('div', { className: 'e-de-enforce' });
            var passwordContainer = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            this.passwordTextBox = ej2_base_1.createElement('input', { attrs: { type: 'password', autofocus: 'true' }, className: 'e-input' });
            passwordContainer.appendChild(this.passwordTextBox);
            var confirmPasswordcontainer = ej2_base_1.createElement('div');
            this.confirmPasswordTextBox = ej2_base_1.createElement('input', { attrs: { type: 'password' }, className: 'e-input' });
            confirmPasswordcontainer.appendChild(this.confirmPasswordTextBox);
            this.target.appendChild(passwordContainer);
            this.target.appendChild(confirmPasswordcontainer);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('Enter new password'), floatLabelType: 'Always', cssClass: 'e-de-enforce-dlg-input' }, this.passwordTextBox);
            new ej2_inputs_1.TextBox({ placeholder: localValue.getConstant('Reenter new password to confirm'), floatLabelType: 'Always' }, this.confirmPasswordTextBox);
        };
        EnforceProtectionDialog.prototype.destroy = function () {
            this.documentHelper = undefined;
            this.owner = undefined;
        };
        return EnforceProtectionDialog;
    }());
    exports.EnforceProtectionDialog = EnforceProtectionDialog;
    var UnProtectDocumentDialog = (function () {
        function UnProtectDocumentDialog(documentHelper, owner) {
            var _this = this;
            this.show = function () {
                _this.localObj = new ej2_base_1.L10n('documenteditor', _this.viewer.owner.defaultLocale);
                _this.localObj.setLocale(_this.viewer.owner.locale);
                if (!_this.target) {
                    _this.initDialog(_this.localObj);
                }
                _this.documentHelper.dialog.header = 'Unprotect Document';
                _this.documentHelper.dialog.height = 'auto';
                _this.documentHelper.dialog.width = 'auto';
                _this.documentHelper.dialog.content = _this.target;
                _this.documentHelper.dialog.buttons = [{
                        click: _this.okButtonClick,
                        buttonModel: { content: _this.localObj.getConstant('Ok'), cssClass: 'e-flat', isPrimary: true }
                    },
                    {
                        click: _this.hideDialog,
                        buttonModel: { content: _this.localObj.getConstant('Cancel'), cssClass: 'e-flat' }
                    }];
                _this.documentHelper.dialog.dataBind();
                _this.passwordTextBox.value = '';
                _this.documentHelper.dialog.show();
            };
            this.okButtonClick = function () {
                var password = _this.passwordTextBox.value;
                var empty = '';
                if (password.length === empty.length && password === empty) {
                    ej2_popups_1.DialogUtility.alert(_this.localObj.getConstant('The password is incorrect'));
                    return;
                }
                _this.viewer.owner.editor.stopProtection(password);
            };
            this.hideDialog = function () {
                _this.passwordTextBox.value = '';
                _this.documentHelper.dialog.hide();
            };
            this.documentHelper = documentHelper;
            this.owner = owner;
        }
        Object.defineProperty(UnProtectDocumentDialog.prototype, "viewer", {
            get: function () {
                return this.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        UnProtectDocumentDialog.prototype.initDialog = function (localValue) {
            var id = this.viewer.owner.containerId + '_enforce_protection';
            this.target = ej2_base_1.createElement('div', { id: id, className: 'e-de-enforce' });
            var container = ej2_base_1.createElement('div');
            var newPassWord = ej2_base_1.createElement('div', {
                className: 'e-de-unprotect-dlg-title',
                innerHTML: localValue.getConstant('Password')
            });
            this.passwordTextBox = ej2_base_1.createElement('input', {
                attrs: { type: 'password' },
                id: this.viewer.owner.containerId + '_display_text', className: 'e-input e-de-enforce-dlg-input'
            });
            container.appendChild(newPassWord);
            container.appendChild(this.passwordTextBox);
            this.target.appendChild(container);
        };
        UnProtectDocumentDialog.prototype.destroy = function () {
            this.documentHelper = undefined;
            this.owner = undefined;
        };
        return UnProtectDocumentDialog;
    }());
    exports.UnProtectDocumentDialog = UnProtectDocumentDialog;
});
