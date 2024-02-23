define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-lists", "@syncfusion/ej2-buttons", "@syncfusion/ej2-popups"], function (require, exports, ej2_base_1, ej2_lists_1, ej2_buttons_1, ej2_popups_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AddUserDialog = (function () {
        function AddUserDialog(documentHelper) {
            var _this = this;
            this.show = function () {
                var localObj = new ej2_base_1.L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
                localObj.setLocale(_this.documentHelper.owner.locale);
                if (!_this.target) {
                    _this.initUserDialog(localObj, _this.documentHelper.owner.enableRtl);
                }
                _this.documentHelper.dialog.header = localObj.getConstant('Add Users');
                _this.documentHelper.dialog.height = 'auto';
                _this.documentHelper.dialog.width = 'auto';
                _this.documentHelper.dialog.content = _this.target;
                _this.documentHelper.dialog.beforeOpen = _this.loadUserDetails;
                _this.documentHelper.dialog.close = _this.documentHelper.updateFocus;
                _this.documentHelper.dialog.buttons = [
                    {
                        click: _this.okButtonClick,
                        buttonModel: {
                            content: localObj.getConstant('Ok'), cssClass: 'e-flat', isPrimary: true
                        }
                    },
                    {
                        click: _this.hideDialog,
                        buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat' }
                    }, {
                        click: _this.deleteButtonClick,
                        buttonModel: { content: localObj.getConstant('Delete'), cssClass: 'e-flat e-user-delete' }
                    }
                ];
                _this.documentHelper.dialog.dataBind();
                _this.documentHelper.dialog.show();
            };
            this.loadUserDetails = function () {
                _this.userList.dataSource = _this.documentHelper.userCollection.slice();
                _this.userList.dataBind();
                _this.documentHelper.restrictEditingPane.addedUser.dataSource = _this.documentHelper.userCollection.slice();
                _this.documentHelper.restrictEditingPane.addedUser.dataBind();
            };
            this.okButtonClick = function () {
                _this.documentHelper.restrictEditingPane.isAddUser = true;
                _this.documentHelper.restrictEditingPane.showStopProtectionPane(false);
                _this.documentHelper.restrictEditingPane.addUserCollection();
                _this.documentHelper.restrictEditingPane.isAddUser = false;
                _this.documentHelper.dialog.hide();
            };
            this.hideDialog = function () {
                _this.textBoxInput.value = '';
                _this.documentHelper.dialog.hide();
            };
            this.onKeyUpOnDisplayBox = function () {
                _this.addButton.disabled = _this.textBoxInput.value === '';
            };
            this.addButtonClick = function () {
                if (_this.validateUserName(_this.textBoxInput.value)) {
                    if (_this.documentHelper.userCollection.indexOf(_this.textBoxInput.value) === -1) {
                        _this.documentHelper.userCollection.push(_this.textBoxInput.value);
                    }
                    _this.userList.dataSource = _this.documentHelper.userCollection.slice();
                    _this.userList.dataBind();
                    _this.textBoxInput.value = '';
                }
                else {
                    ej2_popups_1.DialogUtility.alert('Invalid user name');
                }
            };
            this.deleteButtonClick = function () {
                var index = _this.documentHelper.userCollection.indexOf(_this.userList.getSelectedItems().text);
                if (index > -1) {
                    _this.documentHelper.userCollection.splice(index, 1);
                    _this.userList.dataSource = _this.documentHelper.userCollection.slice();
                    _this.userList.dataBind();
                }
            };
            this.documentHelper = documentHelper;
        }
        AddUserDialog.prototype.initUserDialog = function (localValue, isRtl) {
            this.target = ej2_base_1.createElement('div', { className: 'e-de-user-dlg' });
            var headerValue = localValue.getConstant('Enter User');
            var dlgFields = ej2_base_1.createElement('div', { innerHTML: headerValue, className: 'e-bookmark-dlgfields' });
            this.target.appendChild(dlgFields);
            var commonDiv = ej2_base_1.createElement('div', { className: 'e-de-user-dlg-common' });
            this.target.appendChild(commonDiv);
            var adduserDiv = ej2_base_1.createElement('div', { className: 'e-de-user-dlg-list' });
            commonDiv.appendChild(adduserDiv);
            if (isRtl) {
                adduserDiv.classList.add('e-de-rtl');
            }
            this.textBoxInput = ej2_base_1.createElement('input', { className: 'e-input e-de-user-dlg-textbox-input', attrs: { autofocus: 'true' } });
            this.textBoxInput.setAttribute('type', 'text');
            adduserDiv.appendChild(this.textBoxInput);
            this.textBoxInput.addEventListener('keyup', this.onKeyUpOnDisplayBox);
            var addButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('Add'),
                attrs: { type: 'button' }
            });
            adduserDiv.appendChild(addButtonElement);
            addButtonElement.addEventListener('click', this.addButtonClick);
            this.addButton = new ej2_buttons_1.Button({ cssClass: 'e-de-user-add-btn' });
            this.addButton.disabled = true;
            this.addButton.appendTo(addButtonElement);
            this.addButton.addEventListener('click', this.addButtonClick);
            var userCollectionDiv = ej2_base_1.createElement('div');
            commonDiv.appendChild(userCollectionDiv);
            var userDiv = ej2_base_1.createElement('div', { innerHTML: localValue.getConstant('Users'), className: 'e-de-user-dlg-user' });
            userCollectionDiv.appendChild(userDiv);
            var listviewDiv = ej2_base_1.createElement('div');
            userCollectionDiv.appendChild(listviewDiv);
            this.userList = new ej2_lists_1.ListView({
                cssClass: 'e-de-user-listview'
            });
            this.userList.appendTo(listviewDiv);
        };
        AddUserDialog.prototype.validateUserName = function (value) {
            if (value.indexOf('@') === -1) {
                return false;
            }
            else {
                var parts = value.split('@');
                var domain = parts[1];
                if (domain.indexOf('.') === -1) {
                    return false;
                }
                else {
                    var domainParts = domain.split('.');
                    var ext = domainParts[1];
                    if (domainParts.length > 2) {
                        return false;
                    }
                    if (ext.length > 4 || ext.length < 2) {
                        return false;
                    }
                }
            }
            return true;
        };
        AddUserDialog.prototype.destroy = function () {
            if (this.textBoxInput) {
                this.textBoxInput = undefined;
            }
            if (this.addButton) {
                this.addButton.destroy();
                this.addButton = undefined;
            }
            if (this.userList) {
                this.userList.destroy();
                this.userList = undefined;
            }
            this.documentHelper = undefined;
        };
        return AddUserDialog;
    }());
    exports.AddUserDialog = AddUserDialog;
});
