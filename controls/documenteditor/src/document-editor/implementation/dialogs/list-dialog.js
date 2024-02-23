define(["require", "exports", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../format/index", "../list/abstract-list", "../list/level-override", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-popups", "./list-view-model"], function (require, exports, ej2_inputs_1, ej2_base_1, ej2_base_2, index_1, abstract_list_1, level_override_1, ej2_dropdowns_1, ej2_popups_1, list_view_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ListDialog = (function () {
        function ListDialog(documentHelper) {
            var _this = this;
            this.dialog = undefined;
            this.target = undefined;
            this.documentHelper = undefined;
            this.viewModel = undefined;
            this.startAt = undefined;
            this.textIndent = undefined;
            this.alignedAt = undefined;
            this.listLevelElement = undefined;
            this.followNumberWith = undefined;
            this.numberStyle = undefined;
            this.numberFormat = undefined;
            this.restartBy = undefined;
            this.isListCharacterFormat = false;
            this.onTextIndentChanged = function (args) {
                if (!args.isInteracted) {
                    return;
                }
                _this.viewModel.listLevel.paragraphFormat.leftIndent = args.value;
            };
            this.onStartValueChanged = function (args) {
                if (!args.isInteracted) {
                    return;
                }
                if (!ej2_base_2.isNullOrUndefined(_this.viewModel) && !ej2_base_2.isNullOrUndefined(_this.viewModel.listLevel)) {
                    _this.viewModel.listLevel.startAt = args.value;
                }
            };
            this.onListLevelValueChanged = function (args) {
                _this.viewModel.levelNumber = parseInt(args.value.slice(args.value.length - 1), 10) - 1;
                if (ej2_base_2.isNullOrUndefined(_this.listLevel)) {
                    return;
                }
                _this.updateDialogValues();
                _this.updateRestartLevelBox();
            };
            this.onNumberFormatChanged = function (args) {
                _this.viewModel.listLevel.numberFormat = args.target.value;
            };
            this.onAlignedAtValueChanged = function (args) {
                if (!args.isInteracted) {
                    return;
                }
                _this.viewModel.listLevel.paragraphFormat.firstLineIndent = _this.alignedAt.value - _this.viewModel.listLevel.paragraphFormat.leftIndent;
            };
            this.onFollowCharacterValueChanged = function (args) {
                if (args.isInteracted) {
                    _this.viewModel.followCharacter = args.value;
                }
            };
            this.onLevelPatternValueChanged = function (args) {
                if (!args.isInteracted) {
                    return;
                }
                _this.viewModel.listLevelPattern = args.value;
                var numberFormat = '%' + (_this.levelNumber + 1).toString();
                var numberFormatTextBox = document.getElementById(_this.documentHelper.owner.containerId + '_numberFormat');
                if (_this.listLevel.listLevelPattern === 'Bullet') {
                    _this.listLevel.numberFormat = String.fromCharCode(61623);
                    numberFormatTextBox.value = _this.listLevel.numberFormat;
                }
                else {
                    if (_this.listLevel.listLevelPattern === 'None') {
                        _this.listLevel.numberFormat = '';
                    }
                    if (!_this.listLevel.numberFormat.match(numberFormat) && _this.listLevel.listLevelPattern !== 'None') {
                        _this.listLevel.numberFormat = numberFormat + '.';
                    }
                    numberFormatTextBox.value = _this.listLevel.numberFormat;
                }
            };
            this.loadListDialog = function () {
                _this.documentHelper.updateFocus();
                if (ej2_base_2.isNullOrUndefined(_this.documentHelper.owner)) {
                    return;
                }
                _this.viewModel = new list_view_model_1.ListViewModel();
                _this.viewModel.dialog = _this;
                if (_this.documentHelper.selection.paragraphFormat.listLevelNumber > 0) {
                    _this.viewModel.levelNumber = _this.documentHelper.selection.paragraphFormat.listLevelNumber;
                }
                _this.viewModel.list = _this.documentHelper.selection.paragraphFormat.getList();
                if (ej2_base_2.isNullOrUndefined(_this.listLevel)) {
                    return;
                }
                _this.updateDialogValues();
                if (_this.documentHelper.selection.caret.style.display !== 'none') {
                    _this.documentHelper.selection.caret.style.display = 'none';
                }
            };
            this.showFontDialog = function () {
                _this.documentHelper.owner.fontDialogModule.showFontDialog(_this.listLevel.characterFormat, true);
            };
            this.onApplyList = function () {
                if (!ej2_base_2.isNullOrUndefined(_this.owner)) {
                    _this.documentHelper.selection.paragraphFormat.setList(_this.list, true);
                }
                _this.documentHelper.dialog2.hide();
                _this.documentHelper.updateFocus();
            };
            this.onCancelButtonClick = function () {
                _this.disposeBindingForListUI();
                _this.documentHelper.dialog2.hide();
                _this.documentHelper.updateFocus();
                _this.isListCharacterFormat = false;
            };
            this.closeListDialog = function () {
                _this.disposeBindingForListUI();
                _this.documentHelper.updateFocus();
                _this.isListCharacterFormat = false;
            };
            this.documentHelper = documentHelper;
            this.viewModel = new list_view_model_1.ListViewModel();
        }
        Object.defineProperty(ListDialog.prototype, "listLevel", {
            get: function () {
                if (!ej2_base_2.isNullOrUndefined(this.viewModel)) {
                    return this.viewModel.listLevel;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListDialog.prototype, "list", {
            get: function () {
                if (!ej2_base_2.isNullOrUndefined(this.viewModel)) {
                    return this.viewModel.list;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListDialog.prototype, "levelNumber", {
            get: function () {
                if (this.listLevel.ownerBase instanceof level_override_1.WLevelOverride) {
                    return this.listLevel.ownerBase.levelNumber;
                }
                else if (this.listLevel.ownerBase instanceof abstract_list_1.WAbstractList && !ej2_base_2.isNullOrUndefined(this.listLevel.ownerBase.levels)) {
                    return this.listLevel.ownerBase.levels.indexOf(this.listLevel);
                }
                else {
                    return -1;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListDialog.prototype, "owner", {
            get: function () {
                return this.documentHelper.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        ListDialog.prototype.getModuleName = function () {
            return 'ListDialog';
        };
        ListDialog.prototype.showListDialog = function () {
            var locale = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            locale.setLocale(this.documentHelper.owner.locale);
            var bindEvent = false;
            if (!this.target) {
                this.initListDialog(locale, this.documentHelper.owner.enableRtl);
                bindEvent = true;
            }
            this.isListCharacterFormat = true;
            this.documentHelper.dialog2.header = locale.getConstant('Define new Multilevel list');
            this.documentHelper.dialog2.height = 'auto';
            this.documentHelper.dialog2.width = 'auto';
            this.documentHelper.dialog2.content = this.target;
            var buttonClass;
            var isRtl = this.documentHelper.owner.enableRtl;
            if (isRtl) {
                buttonClass = 'e-flat e-list-dlg-font e-de-dlg-target.e-de-rtl e-font-rtl';
            }
            else {
                buttonClass = 'e-flat e-list-dlg-font e-font';
            }
            this.documentHelper.dialog2.buttons = [{
                    click: this.showFontDialog,
                    buttonModel: { content: locale.getConstant('Font'), cssClass: buttonClass }
                }, {
                    click: this.onApplyList,
                    buttonModel: { content: locale.getConstant('Ok'), cssClass: 'e-flat e-list-dlg', isPrimary: true }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: locale.getConstant('Cancel'), cssClass: 'e-flat e-list-dlg' }
                }];
            var dialogElement = this.documentHelper.dialog2.element;
            this.documentHelper.dialog2.dataBind();
            if (bindEvent) {
                this.wireAndBindEvent(locale, isRtl);
            }
            this.documentHelper.dialog2.beforeOpen = this.loadListDialog;
            this.documentHelper.dialog2.close = this.closeListDialog;
            this.documentHelper.dialog2.position = { X: 'center', Y: 'top' };
            this.documentHelper.dialog2.show();
        };
        ListDialog.prototype.initListDialog = function (locale, isRtl) {
            var containerId = this.documentHelper.owner.containerId;
            var id = containerId + '_insert_list';
            this.target = ej2_base_1.createElement('div', { id: id, className: 'e-de-list-dlg' });
            var listLevelDiv = ej2_base_1.createElement('div', { innerHTML: '<label id="' + containerId + '_listLevellabel" style="display:block;" class=e-de-list-ddl-header-list-level>' + locale.getConstant('List level') + '</label><label id="' + containerId + '_modifyLabel" style="display:block;" class=e-de-list-ddl-subheader>' + locale.getConstant('Choose level to modify') + '</label><select style="height:20px;width:43%" id="' + containerId + '_listLevel"><option>' + locale.getConstant('Level') + ' 1' + '</option><option>' + locale.getConstant('Level') + ' 2' + '</option><option>' + locale.getConstant('Level') + ' 3' + '</option><option>' + locale.getConstant('Level') + ' 4' + '</option><option>' + locale.getConstant('Level') + ' 5' + '</option><option>' + locale.getConstant('Level') + ' 6' + '</option><option>' + locale.getConstant('Level') + ' 7' + '</option><option>' + locale.getConstant('Level') + ' 8' + '</option><option>' + locale.getConstant('Level') + ' 9' + '</option></select>' });
            this.target.appendChild(listLevelDiv);
            var div = ej2_base_1.createElement('div');
            var divStyle;
            if (isRtl) {
                divStyle = '<div style="float:right;display:block;width:241px;">';
            }
            else {
                divStyle = '<div style="float:left;display:block;">';
            }
            var numberStyleDiv = ej2_base_1.createElement('div', { innerHTML: divStyle + '<label id="' + containerId + '_numberFormatLabel" style="display:block;" class=e-de-list-ddl-header>' + locale.getConstant('Number format') + '</label><label id="' + containerId + '_numberStyleLabel" style="display:block;" class=e-de-list-ddl-subheader>' + locale.getConstant('Number style for this level') + '</label><select style="height:20px;width:100%" id="' + containerId + '_numberStyle"><option>' + locale.getConstant('Arabic') + '</option><option>' + locale.getConstant('UpRoman') + '</option><option>' + locale.getConstant('LowRoman') + '</option><option>' + locale.getConstant('UpLetter') + '</option><option>' + locale.getConstant('LowLetter') + '</option><option>' + locale.getConstant('Number') + '</option><option>' + locale.getConstant('Leading zero') + '</option><option>' + locale.getConstant('Bullet') + '</option><option>' + locale.getConstant('Ordinal') + '</option><option>' + locale.getConstant('Ordinal Text') + '</option><option>' + locale.getConstant('Special') + '</option><option>' + locale.getConstant('For East') + '</option></select><label id="' + containerId + '_startAtLabel" style="display:block;" class=e-de-list-ddl-subheaderbottom>' + locale.getConstant('Start at') + '</label><input type="text" id="' + containerId + '_startAt">' });
            div.appendChild(numberStyleDiv);
            this.numberFormatDiv = ej2_base_1.createElement('div', { className: 'e-de-list-dlg-subdiv', innerHTML: '<div><div><label id="' + containerId + '_formatLabel" style="display:inline-block;width:86%" class=e-de-list-ddl-subheader>' + locale.getConstant('Enter formatting for number') + '</label><button type="button" id="' + containerId + '_list_info" class="e-control e-btn e-primary e-de-list-format-info">i</button></div><input style=width:180px; type="text" id="' + containerId + '_numberFormat" aria-label="numberFormat" class=e-input></div><label id="' + containerId + '_restartLabel" style="display:block;" class=e-de-list-ddl-subheaderbottom>' + locale.getConstant('Restart list after') + '</label><select style="height:20px;width:100%" id="' + containerId + '_restartBy"><option>' + locale.getConstant('No Restart') + '</option></select></div>' });
            div.appendChild(this.numberFormatDiv);
            this.target.appendChild(div);
            var indentsDivLabelStyle;
            if (isRtl) {
                indentsDivLabelStyle = 'display:block;position:relative; ';
            }
            else {
                indentsDivLabelStyle = 'display:block; ';
            }
            var indentsDiv = ej2_base_1.createElement('div', { innerHTML: divStyle + '<label id="' + containerId + '_IndentsLabel" style=' + indentsDivLabelStyle + 'class=e-de-list-ddl-header>' + locale.getConstant('Position') + '</label><label id="' + containerId + '_textIndentLabel" style=' + indentsDivLabelStyle + 'class=e-de-list-ddl-subheader>' + locale.getConstant('Text indent at') + '</label><input type="text" id="' + containerId + '_textIndent"><label id="' + containerId + '_followCharacterLabel" style=' + indentsDivLabelStyle + 'class=e-de-list-ddl-subheaderbottom>' + locale.getConstant('Follow number with') + '</label><select style="height:20px;width:100%" id="' + containerId + '_followCharacter"><option>' + locale.getConstant('Tab character') + '</option><option>' + locale.getConstant('Space') + '</option><option>' + locale.getConstant('Nothing') + '</option></select></div><div id="e-de-list-dlg-div" class="e-de-list-dlg-div"><label id="' + containerId + '_alignedAtLabel" style="display:block;" class=e-de-list-ddl-subheader>' + locale.getConstant('Aligned at') + '</label><input type="text" id="' + containerId + '_alignedAt"></div>' });
            this.target.appendChild(indentsDiv);
        };
        ListDialog.prototype.wireAndBindEvent = function (locale, isRtl) {
            var containerId = this.documentHelper.owner.containerId;
            if (isRtl) {
                document.getElementById('e-de-list-dlg-div').classList.add('e-de-rtl');
                this.numberFormatDiv.classList.add('e-de-rtl');
            }
            var startAtTextBox = document.getElementById(containerId + '_startAt');
            startAtTextBox.setAttribute('aria-label', 'startAt');
            var textIndentAtTextBox = document.getElementById(containerId + '_textIndent');
            textIndentAtTextBox.setAttribute('aria-label', 'textIndent');
            var alignedAtTextBox = document.getElementById(containerId + '_alignedAt');
            alignedAtTextBox.setAttribute('aria-label', 'alignedAt');
            this.startAt = new ej2_inputs_1.NumericTextBox({
                format: '#',
                decimals: 0,
                min: 0,
                max: 50,
                width: '180px',
                enablePersistence: false
            });
            this.startAt.addEventListener('change', this.onStartValueChanged);
            this.startAt.appendTo(startAtTextBox);
            this.textIndent = new ej2_inputs_1.NumericTextBox({
                format: '#',
                decimals: 0,
                min: 0,
                max: 1584,
                width: '180px',
                step: 4,
                enablePersistence: false
            });
            this.textIndent.addEventListener('change', this.onTextIndentChanged);
            this.textIndent.appendTo(textIndentAtTextBox);
            this.alignedAt = new ej2_inputs_1.NumericTextBox({
                format: '#',
                max: 1584,
                step: 6,
                width: '180px',
                enablePersistence: false
            });
            this.alignedAt.addEventListener('change', this.onAlignedAtValueChanged);
            this.alignedAt.appendTo(alignedAtTextBox);
            var listLevel = document.getElementById(containerId + '_listLevel');
            this.listLevelElement = new ej2_dropdowns_1.DropDownList({ popupHeight: '150px', width: '180px', enableRtl: isRtl, change: this.onListLevelValueChanged });
            this.listLevelElement.appendTo(listLevel);
            var followCharacterElement = document.getElementById(containerId + '_followCharacter');
            this.followNumberWith = new ej2_dropdowns_1.DropDownList({ popupHeight: '150px', width: '180px', enableRtl: isRtl, change: this.onFollowCharacterValueChanged });
            this.followNumberWith.appendTo(followCharacterElement);
            var numberStyleEle = document.getElementById(containerId + '_numberStyle');
            this.numberStyle = new ej2_dropdowns_1.DropDownList({ popupHeight: '150px', width: '180px', enableRtl: isRtl, change: this.onLevelPatternValueChanged });
            this.numberStyle.appendTo(numberStyleEle);
            this.numberFormat = document.getElementById(containerId + '_numberFormat');
            this.numberFormat.addEventListener('change', this.onNumberFormatChanged);
            var restartElement = document.getElementById(containerId + '_restartBy');
            this.restartBy = new ej2_dropdowns_1.DropDownList({ popupHeight: '150px', width: '180px', enableRtl: isRtl });
            this.restartBy.appendTo(restartElement);
            var button = document.getElementById(containerId + '_list_info');
            this.formatInfoToolTip = new ej2_popups_1.Tooltip({ width: 200 });
            this.formatInfoToolTip.content = locale.getConstant('Number format tooltip information');
            this.formatInfoToolTip.position = 'RightTop';
            this.formatInfoToolTip.appendTo(button);
        };
        ListDialog.prototype.updateRestartLevelBox = function () {
            var containerId = this.documentHelper.owner.containerId;
            var listLevel = document.getElementById(containerId + '_listLevel');
            var restartBy = document.getElementById(containerId + '_restartBy');
            for (var i = 0; i < restartBy.options.length; i) {
                restartBy.options.remove(i);
            }
            if (listLevel.selectedIndex === 0) {
                var option = document.createElement('option');
                option.value = 'No Restart';
                option.innerHTML = 'No Restart';
                restartBy.appendChild(option);
            }
            else {
                for (var i = listLevel.selectedIndex; i > 0; i--) {
                    var option_1 = document.createElement('option');
                    option_1.value = 'Level ' + i;
                    option_1.innerHTML = 'Level ' + i;
                    restartBy.appendChild(option_1);
                }
                var option = document.createElement('option');
                option.value = 'No Restart';
                option.innerHTML = 'No Restart';
                restartBy.appendChild(option);
            }
            restartBy.selectedIndex = 0;
        };
        ListDialog.prototype.listPatternConverter = function (listLevelPattern) {
            switch (listLevelPattern) {
                case 'Arabic': return 0;
                case 'UpRoman': return 1;
                case 'LowRoman': return 2;
                case 'UpLetter': return 3;
                case 'LowLetter': return 4;
                case 'Number': return 5;
                case 'LeadingZero': return 6;
                case 'Bullet': return 7;
                case 'Ordinal': return 8;
                case 'OrdinalText': return 9;
                case 'Special': return 10;
                case 'FarEast': return 11;
                default: return 12;
            }
        };
        ListDialog.prototype.followCharacterConverter = function (followCharacter) {
            switch (followCharacter) {
                case 'Tab':
                    return 0;
                case 'Space':
                    return 1;
                default:
                    return 2;
            }
        };
        ListDialog.prototype.calculateAlignedAt = function () {
            if (this.viewModel.listLevel.paragraphFormat.firstLineIndent < 0) {
                return this.viewModel.listLevel.paragraphFormat.leftIndent + this.viewModel.listLevel.paragraphFormat.firstLineIndent;
            }
            else {
                return this.viewModel.listLevel.paragraphFormat.firstLineIndent;
            }
        };
        ListDialog.prototype.updateDialogValues = function () {
            if (ej2_base_2.isNullOrUndefined(this.listLevel.characterFormat)) {
                this.listLevel.characterFormat = new index_1.WCharacterFormat(this.viewModel.listLevel);
            }
            if (ej2_base_2.isNullOrUndefined(this.listLevel.paragraphFormat)) {
                this.listLevel.paragraphFormat = new index_1.WParagraphFormat(this.viewModel.listLevel);
            }
            if (!ej2_base_2.isNullOrUndefined(this.viewModel) && !ej2_base_2.isNullOrUndefined(this.viewModel.listLevel)) {
                this.startAt.value = this.viewModel.listLevel.startAt;
                this.textIndent.value = this.viewModel.listLevel.paragraphFormat.leftIndent;
                this.alignedAt.value = this.calculateAlignedAt();
                this.followNumberWith.index = this.followCharacterConverter(this.viewModel.followCharacter);
                this.numberFormat.value = this.viewModel.listLevel.numberFormat;
                this.numberFormat.style.fontFamily = this.viewModel.listLevel.characterFormat.fontFamily;
                this.numberStyle.index = this.listPatternConverter(this.viewModel.listLevelPattern);
                this.listLevelElement.index = this.viewModel.levelNumber;
            }
        };
        ListDialog.prototype.updateCharacterFormat = function (format) {
            this.listLevel.characterFormat.copyFormat(format);
        };
        ListDialog.prototype.disposeBindingForListUI = function () {
            this.followNumberWith.index = -1;
            this.numberFormat.value = ' ';
            this.numberStyle.index = -1;
            this.listLevelElement.index = -1;
            this.restartBy.index = -1;
            this.viewModel.destroy();
        };
        ListDialog.prototype.destroy = function () {
            if (this.alignedAt) {
                this.alignedAt.destroy();
            }
            this.alignedAt = undefined;
            this.dialog = undefined;
            if (this.followNumberWith) {
                this.followNumberWith.destroy();
            }
            this.followNumberWith = undefined;
            if (this.listLevelElement) {
                this.listLevelElement.destroy();
            }
            this.listLevelElement = undefined;
            if (this.textIndent) {
                this.textIndent.destroy();
            }
            this.textIndent = undefined;
            if (this.startAt) {
                this.startAt.destroy();
            }
            this.startAt = undefined;
            if (this.numberStyle) {
                this.numberStyle.destroy();
            }
            this.numberStyle = undefined;
            this.numberFormat = undefined;
            if (this.restartBy) {
                this.restartBy.destroy();
            }
            this.restartBy = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.target)) {
                if (this.target.parentElement) {
                    this.target.parentElement.removeChild(this.target);
                }
                for (var l = 0; l < this.target.childNodes.length; l++) {
                    this.target.removeChild(this.target.childNodes[parseInt(l.toString(), 10)]);
                    l--;
                }
                this.target = undefined;
            }
            this.documentHelper = undefined;
            this.viewModel = undefined;
        };
        return ListDialog;
    }());
    exports.ListDialog = ListDialog;
});
