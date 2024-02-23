define(["require", "exports", "@syncfusion/ej2-lists", "@syncfusion/ej2-buttons", "@syncfusion/ej2-base", "@syncfusion/ej2-base"], function (require, exports, ej2_lists_1, ej2_buttons_1, ej2_base_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BookmarkDialog = (function () {
        function BookmarkDialog(documentHelper) {
            var _this = this;
            this.onKeyUpOnTextBox = function () {
                _this.enableOrDisableButton();
            };
            this.addBookmark = function () {
                _this.documentHelper.owner.editorModule.insertBookmark(ej2_base_2.SanitizeHtmlHelper.sanitize(_this.textBoxInput.value));
                _this.documentHelper.hideDialog();
            };
            this.selectHandler = function (args) {
                _this.focusTextBox(args.text);
            };
            this.gotoBookmark = function () {
                _this.documentHelper.selection.selectBookmark(_this.textBoxInput.value);
            };
            this.deleteBookmark = function () {
                _this.documentHelper.owner.editorModule.deleteBookmark(_this.textBoxInput.value);
                _this.show();
            };
            this.documentHelper = documentHelper;
        }
        BookmarkDialog.prototype.getModuleName = function () {
            return 'BookmarkDialog';
        };
        BookmarkDialog.prototype.initBookmarkDialog = function (localValue, bookmarks, isRtl) {
            var id = this.documentHelper.owner.containerId + '_insert_bookmark';
            this.target = ej2_base_1.createElement('div', { id: id, className: 'e-de-bookmark' });
            var headerValue = localValue.getConstant('Bookmark name') + ':';
            var dlgFields = ej2_base_1.createElement('div', { innerHTML: headerValue, className: 'e-bookmark-dlgfields' });
            this.target.appendChild(dlgFields);
            var commonDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-common' });
            this.target.appendChild(commonDiv);
            var searchDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-list' });
            commonDiv.appendChild(searchDiv);
            if (isRtl) {
                searchDiv.classList.add('e-de-rtl');
            }
            var textBoxDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-textboxdiv' });
            searchDiv.appendChild(textBoxDiv);
            this.textBoxInput = ej2_base_1.createElement('input', { className: 'e-input e-bookmark-textbox-input', id: 'bookmark_text_box', attrs: { autofocus: 'true' } });
            this.textBoxInput.setAttribute('type', 'text');
            this.textBoxInput.setAttribute('aria-label', localValue.getConstant('Bookmark name'));
            textBoxDiv.appendChild(this.textBoxInput);
            var listviewDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-listViewDiv', id: 'bookmark_listview', attrs: { tabindex: '-1', role: 'listbox' } });
            listviewDiv.setAttribute('aria-label', localValue.getConstant('BookMarkList'));
            searchDiv.appendChild(listviewDiv);
            this.listviewInstance = new ej2_lists_1.ListView({
                dataSource: bookmarks,
                cssClass: 'e-bookmark-listview'
            });
            var hasNoBookmark = (bookmarks === undefined || bookmarks.length === 0);
            this.listviewInstance.appendTo(listviewDiv);
            this.listviewInstance.addEventListener('select', this.selectHandler);
            var buttonDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-button' });
            commonDiv.appendChild(buttonDiv);
            var addbuttonDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-addbutton' });
            buttonDiv.appendChild(addbuttonDiv);
            var addButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('Add'), id: 'add',
                attrs: { type: 'button' }
            });
            addButtonElement.setAttribute('aria-label', localValue.getConstant('Add'));
            addbuttonDiv.appendChild(addButtonElement);
            this.addButton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            this.addButton.disabled = true;
            this.addButton.appendTo(addButtonElement);
            this.textBoxInput.addEventListener('input', this.onKeyUpOnTextBox);
            this.textBoxInput.addEventListener('keyup', this.onKeyUpOnTextBox);
            addButtonElement.addEventListener('click', this.addBookmark);
            var deleteButtonDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-deletebutton' });
            buttonDiv.appendChild(deleteButtonDiv);
            var deleteButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('Delete'), id: 'delete',
                attrs: { type: 'button' }
            });
            deleteButtonElement.setAttribute('aria-label', localValue.getConstant('Delete'));
            deleteButtonDiv.appendChild(deleteButtonElement);
            this.deleteButton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            this.deleteButton.disabled = hasNoBookmark;
            this.deleteButton.appendTo(deleteButtonElement);
            deleteButtonElement.addEventListener('click', this.deleteBookmark);
            var gotoButtonDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-gotobutton' });
            buttonDiv.appendChild(gotoButtonDiv);
            var gotoButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('Go To'), id: 'goto',
                attrs: { type: 'button' }
            });
            gotoButtonElement.setAttribute('aria-label', localValue.getConstant('Go To'));
            gotoButtonDiv.appendChild(gotoButtonElement);
            this.gotoButton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            this.gotoButton.disabled = hasNoBookmark;
            this.gotoButton.appendTo(gotoButtonElement);
            gotoButtonElement.addEventListener('click', this.gotoBookmark);
        };
        BookmarkDialog.prototype.show = function () {
            var bookmarks = this.documentHelper.getBookmarks();
            var localObj = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localObj.setLocale(this.documentHelper.owner.locale);
            this.initBookmarkDialog(localObj, bookmarks, this.documentHelper.owner.enableRtl);
            this.documentHelper.dialog.header = localObj.getConstant('Bookmark');
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
            this.documentHelper.dialog.close = this.documentHelper.updateFocus;
            this.documentHelper.dialog.buttons = [{
                    click: this.removeObjects.bind(this),
                    buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
                }];
            this.documentHelper.dialog.dataBind();
            var hasNoBookmark = (bookmarks === undefined || bookmarks.length === 0);
            if (!hasNoBookmark) {
                var firstItem = bookmarks[0];
                this.listviewInstance.selectItem(firstItem);
            }
            this.documentHelper.dialog.show();
        };
        BookmarkDialog.prototype.enableOrDisableButton = function () {
            if (!ej2_base_1.isNullOrUndefined(this.addButton)) {
                this.addButton.disabled = (this.textBoxInput.value === '');
            }
        };
        BookmarkDialog.prototype.focusTextBox = function (text) {
            this.textBoxInput.value = text;
            var value = document.getElementById('bookmark_text_box');
            value.setSelectionRange(0, text.length);
            value.focus();
            this.enableOrDisableButton();
        };
        BookmarkDialog.prototype.removeObjects = function () {
            this.documentHelper.hideDialog();
        };
        BookmarkDialog.prototype.destroy = function () {
            if (this.textBoxInput) {
                this.textBoxInput.remove();
                this.textBoxInput = undefined;
            }
            if (this.listviewInstance) {
                this.listviewInstance.destroy();
                this.listviewInstance = undefined;
            }
            this.documentHelper = undefined;
        };
        return BookmarkDialog;
    }());
    exports.BookmarkDialog = BookmarkDialog;
});
