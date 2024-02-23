define(["require", "exports", "@syncfusion/ej2-lists", "@syncfusion/ej2-buttons", "@syncfusion/ej2-base"], function (require, exports, ej2_lists_1, ej2_buttons_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StylesDialog = (function () {
        function StylesDialog(documentHelper) {
            var _this = this;
            this.modifyStyles = function () {
                _this.documentHelper.dialog.hide();
                _this.documentHelper.owner.styleDialogModule.show(_this.styleName, _this.localValue.getConstant('Modify Style'));
            };
            this.selectHandler = function (args) {
                _this.styleName = _this.getStyleName(args.text);
            };
            this.addNewStyles = function () {
                _this.documentHelper.dialog.hide();
                _this.documentHelper.owner.styleDialogModule.show();
            };
            this.documentHelper = documentHelper;
        }
        StylesDialog.prototype.getModuleName = function () {
            return 'StylesDialog';
        };
        StylesDialog.prototype.initStylesDialog = function (localValue, styles, isRtl) {
            var id = this.documentHelper.owner.containerId + '_insert_styles';
            this.target = ej2_base_1.createElement('div', { id: id, className: 'e-de-styles' });
            var headerValue = localValue.getConstant('Styles');
            var dlgFields = ej2_base_1.createElement('div', { innerHTML: headerValue, className: 'e-de-para-dlg-heading' });
            this.target.appendChild(dlgFields);
            var commonDiv = ej2_base_1.createElement('div', { className: 'e-styles-common' });
            this.target.appendChild(commonDiv);
            var searchDiv = ej2_base_1.createElement('div', { className: 'e-styles-list' });
            commonDiv.appendChild(searchDiv);
            if (isRtl) {
                searchDiv.classList.add('e-de-rtl');
            }
            var listviewDiv = ej2_base_1.createElement('div', { className: 'e-styles-listViewDiv', id: 'styles_listview' });
            searchDiv.appendChild(listviewDiv);
            this.listviewInstance = new ej2_lists_1.ListView({
                dataSource: styles,
                cssClass: 'e-styles-listview',
                fields: { text: 'StyleName', iconCss: 'IconClass' },
                showIcon: true
            });
            this.listviewInstance.appendTo(listviewDiv);
            this.listviewInstance.addEventListener('select', this.selectHandler);
            var buttonDiv = ej2_base_1.createElement('div', { className: 'e-styles-button' });
            commonDiv.appendChild(buttonDiv);
            var newButtonDiv = ej2_base_1.createElement('div', { className: 'e-styles-addbutton' });
            buttonDiv.appendChild(newButtonDiv);
            var newButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('New') + '...', id: 'new',
                attrs: { type: 'button' }
            });
            newButtonDiv.appendChild(newButtonElement);
            var newbutton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            newbutton.appendTo(newButtonElement);
            newButtonElement.addEventListener('click', this.addNewStyles);
            var modifybuttonDiv = ej2_base_1.createElement('div', { className: 'e-styles-addbutton' });
            buttonDiv.appendChild(modifybuttonDiv);
            var modifyButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('Modify') + '...', id: 'modify',
                attrs: { type: 'button' }
            });
            modifybuttonDiv.appendChild(modifyButtonElement);
            var addbutton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            addbutton.appendTo(modifyButtonElement);
            modifyButtonElement.addEventListener('click', this.modifyStyles);
        };
        StylesDialog.prototype.show = function () {
            var localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localValue.setLocale(this.documentHelper.owner.locale);
            var paraStyles = this.updateStyleNames('Paragraph').filter(function (obj) { return obj.Type == "Paragraph"; });
            var linkedStyles = this.updateStyleNames('Paragraph').filter(function (obj) { return obj.Type == "Linked"; });
            var charStyles = this.updateStyleNames('Character').filter(function (obj) { return obj.Type == "Character"; });
            for (var _i = 0, linkedStyles_1 = linkedStyles; _i < linkedStyles_1.length; _i++) {
                var linkedStyle = linkedStyles_1[_i];
                for (var _a = 0, charStyles_1 = charStyles; _a < charStyles_1.length; _a++) {
                    var charStyle = charStyles_1[_a];
                    if (linkedStyle["StyleName"] + " Char" === charStyle["StyleName"]) {
                        charStyles.splice(charStyles.indexOf(charStyle), 1);
                        break;
                    }
                }
            }
            var styles = paraStyles.concat(linkedStyles, charStyles);
            this.localValue = localValue;
            this.initStylesDialog(localValue, styles, this.documentHelper.owner.enableRtl);
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
            this.documentHelper.dialog.close = this.documentHelper.updateFocus;
            this.documentHelper.dialog.header = localValue.getConstant('Styles');
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.buttons = [{
                    click: this.hideObjects.bind(this),
                    buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-hyper-insert', isPrimary: true }
                }];
            this.documentHelper.dialog.dataBind();
            this.documentHelper.dialog.show();
        };
        StylesDialog.prototype.updateStyleNames = function (type) {
            var localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localValue.setLocale(this.documentHelper.owner.locale);
            var collection = this.documentHelper.owner.documentHelper.styles.getStyles(type);
            var paraIcon = 'e-de-listview-icon e-de-e-paragraph-style-mark e-icons';
            var charIcon = 'e-de-listview-icon e-de-e-character-style-mark e-icons';
            var linkedIcon = 'e-de-listview-icon e-de-e-linked-style-mark e-icons';
            var finalList = [];
            for (var i = 0; i < collection.length; i++) {
                var styleName = localValue.getConstant(collection[parseInt(i.toString(), 10)].name);
                if (styleName === '') {
                    styleName = collection[parseInt(i.toString(), 10)].name;
                }
                if (collection[parseInt(i.toString(), 10)].type == 'Paragraph') {
                    finalList.push({ StyleName: styleName, IconClass: paraIcon, Type: collection[parseInt(i.toString(), 10)].type });
                }
                else if (collection[parseInt(i.toString(), 10)].type == 'Character') {
                    finalList.push({ StyleName: styleName, IconClass: charIcon, Type: collection[parseInt(i.toString(), 10)].type });
                }
                else {
                    finalList.push({ StyleName: styleName, IconClass: linkedIcon, Type: collection[parseInt(i.toString(), 10)].type });
                }
            }
            return finalList;
        };
        StylesDialog.prototype.defaultStyleName = function (styleNames) {
            var styleName = [];
            for (var index = 0; index < styleNames.length; index++) {
                styleName.push(styleNames[parseInt(index.toString(), 10)]);
            }
            return styleName;
        };
        StylesDialog.prototype.getStyleName = function (styleName) {
            var localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localValue.setLocale(this.documentHelper.owner.locale);
            if (localValue.getConstant('Heading 1') === styleName) {
                styleName = 'Heading 1';
            }
            else if (localValue.getConstant('Heading 2') === styleName) {
                styleName = 'Heading 2';
            }
            else if (localValue.getConstant('Heading 3') === styleName) {
                styleName = 'Heading 3';
            }
            else if (localValue.getConstant('Heading 4') === styleName) {
                styleName = 'Heading 4';
            }
            else if (localValue.getConstant('Heading 5') === styleName) {
                styleName = 'Heading 5';
            }
            else if (localValue.getConstant('Heading 6') === styleName) {
                styleName = 'Heading 6';
            }
            else if (localValue.getConstant('Normal') === styleName) {
                styleName = 'Normal';
            }
            else if (localValue.getConstant('Header') === styleName) {
                styleName = 'Header';
            }
            else if (localValue.getConstant('Footer') === styleName) {
                styleName = 'Footer';
            }
            return styleName;
        };
        StylesDialog.prototype.hideObjects = function () {
            this.documentHelper.dialog.hide();
            this.documentHelper.updateFocus();
        };
        StylesDialog.prototype.destroy = function () {
            if (this.listviewInstance) {
                this.listviewInstance.destroy();
                this.listviewInstance = undefined;
            }
            this.documentHelper = undefined;
            this.styleName = undefined;
            this.localValue = undefined;
            this.target = undefined;
        };
        return StylesDialog;
    }());
    exports.StylesDialog = StylesDialog;
});
