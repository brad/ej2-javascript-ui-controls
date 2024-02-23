define(["require", "exports", "@syncfusion/ej2-lists", "@syncfusion/ej2-buttons", "@syncfusion/ej2-base", "@syncfusion/ej2-inputs", "../editor/editor-helper", "../format/paragraph-format"], function (require, exports, ej2_lists_1, ej2_buttons_1, ej2_base_1, ej2_inputs_1, editor_helper_1, paragraph_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabDialog = (function () {
        function TabDialog(documentHelper) {
            var _this = this;
            this.isBarClicked = false;
            this.removedItems = [];
            this.tabStopList = [];
            this.isAddUnits = true;
            this.applyParagraphFormat = function () {
                if (_this.defaultTabStopIn.value !== _this.documentHelper.defaultTabWidth) {
                    _this.documentHelper.defaultTabWidth = _this.defaultTabStopIn.value;
                }
                if (_this.removedItems.length > 0) {
                    var values_1 = [];
                    for (var i = 0; i < _this.removedItems.length; i++) {
                        values_1.push(_this.removedItems[parseInt(i.toString(), 10)].value);
                    }
                    _this.documentHelper.owner.editor.removeTabStops(_this.documentHelper.selection.getParagraphsInSelection(), values_1);
                }
                var tab = !ej2_base_1.isNullOrUndefined(_this.selectedTabStop) ? _this.selectedTabStop.value : new paragraph_format_1.WTabStop();
                tab.deletePosition = 0;
                tab.tabJustification = _this.getTabAlignmentValue();
                tab.tabLeader = _this.getTabLeaderValue();
                var values = [];
                for (var i = 0; i < _this.tabStopList.length; i++) {
                    values.push(_this.tabStopList[parseInt(i.toString(), 10)].value);
                }
                if (ej2_base_1.isNullOrUndefined(_this.selectedTabStop)) {
                    var value = editor_helper_1.HelperMethods.getNumberFromString(_this.textBoxInput.value);
                    if (value.toString() !== 'NaN') {
                        tab.position = value;
                        values.push(tab);
                    }
                }
                _this.documentHelper.owner.editor.onApplyParagraphFormat('tabStop', values, false, false);
                _this.closeTabDialog();
            };
            this.textBoxInputChange = function (args) {
                var value = editor_helper_1.HelperMethods.getNumberFromString(_this.textBoxInput.value);
                for (var i = 0; i < _this.tabStopList.length; i++) {
                    var tabValue = editor_helper_1.HelperMethods.getNumberFromString(_this.tabStopList[parseInt(i.toString(), 10)].displayText);
                    if (tabValue === value) {
                        _this.selectedTabStop = _this.tabStopList[parseInt(i.toString(), 10)];
                        break;
                    }
                    else {
                        _this.selectedTabStop = undefined;
                    }
                }
                _this.isAddUnits = false;
                var index = _this.listviewInstance.dataSource.indexOf(_this.selectedTabStop);
                var item = index >= 0 ? _this.listviewInstance.dataSource[parseInt(index.toString(), 10)] : undefined;
                _this.listviewInstance.selectItem(item);
                _this.isAddUnits = true;
            };
            this.setButtonClick = function (args) {
                if (!ej2_base_1.isNullOrUndefined(_this.selectedTabStop)) {
                    var value = _this.selectedTabStop.value;
                    value.tabJustification = _this.getTabAlignmentValue();
                    value.tabLeader = _this.getTabLeaderValue();
                }
                else {
                    var value = parseFloat(editor_helper_1.HelperMethods.getNumberFromString(_this.textBoxInput.value).toFixed(2));
                    if (value.toString() === 'NaN') {
                        return;
                    }
                    var tabStop = new paragraph_format_1.WTabStop();
                    tabStop.position = value;
                    tabStop.tabJustification = _this.getTabAlignmentValue();
                    tabStop.tabLeader = _this.getTabLeaderValue();
                    tabStop.deletePosition = 0;
                    var tempCollection = [];
                    for (var i = 0; i < _this.tabStopList.length; i++) {
                        tempCollection.push(_this.tabStopList[parseInt(i.toString(), 10)].value);
                    }
                    var index = _this.documentHelper.owner.editor.addTabStopToCollection(tempCollection, tabStop, true);
                    var tabStopListObj = { 'displayText': parseFloat(value.toFixed(2)) + ' pt', 'value': tabStop };
                    _this.tabStopList.splice(index, 0, tabStopListObj);
                    _this.selectedTabStop = tabStopListObj;
                    _this.listviewInstance.dataSource = _this.tabStopList;
                    _this.listviewInstance.refresh();
                    _this.listviewInstance.selectItem(_this.selectedTabStop);
                }
            };
            this.clearAllButtonClick = function (args) {
                for (var i = 0; i < _this.tabStopList.length; i++) {
                    _this.removedItems.push(_this.tabStopList[parseInt(i.toString(), 10)]);
                }
                _this.displayDiv.innerText = _this.localeValue.getConstant('All');
                _this.tabStopList = [];
                _this.listviewInstance.dataSource = [];
                _this.listviewInstance.refresh();
                _this.selectedTabStop = undefined;
                _this.textBoxInput.value = '';
                _this.updateButtons();
            };
            this.clearButtonClick = function (args) {
                _this.removedItems.push(_this.selectedTabStop);
                if (_this.displayDiv.innerText !== _this.localeValue.getConstant('All')) {
                    if (_this.displayDiv.innerText !== '') {
                        _this.displayDiv.innerText += ', ';
                    }
                    _this.displayDiv.innerText += _this.selectedTabStop.displayText;
                }
                var index = _this.tabStopList.indexOf(_this.selectedTabStop);
                if (index === _this.tabStopList.length - 1) {
                    _this.tabStopList.splice(index, 1);
                    _this.selectedTabStop = _this.tabStopList[index - 1];
                }
                else if (_this.tabStopList.length === 0) {
                    _this.selectedTabStop = undefined;
                }
                else {
                    _this.tabStopList.splice(index, 1);
                    _this.selectedTabStop = _this.tabStopList[parseInt(index.toString(), 10)];
                }
                _this.listviewInstance.refresh();
                if (!ej2_base_1.isNullOrUndefined(_this.selectedTabStop)) {
                    _this.textBoxInput.value = !ej2_base_1.isNullOrUndefined(_this.selectedTabStop) && _this.tabStopList.length > 0 ? _this.selectedTabStop.displayText : '';
                }
                else {
                    _this.textBoxInput.value = '';
                }
                _this.updateButtons();
            };
            this.closeTabDialog = function () {
                _this.documentHelper.hideDialog();
            };
            this.selectHandler = function (args) {
                if (_this.isAddUnits) {
                    _this.focusTextBox(args.text);
                }
                _this.selectedTabStop = args.data;
                if (!ej2_base_1.isNullOrUndefined(_this.selectedTabStop) && _this.selectedTabStop.value.tabJustification === 'Bar') {
                    _this.isBarClicked = true;
                }
                _this.updateButtons();
            };
            this.onBarClick = function (args) {
                _this.clearTabLeaderButton();
                _this.disableOrEnableTabLeaderButton(true);
                _this.isBarClicked = true;
            };
            this.onTabAlignmentButtonClick = function (args) {
                _this.disableOrEnableTabLeaderButton(false);
                if (_this.isBarClicked) {
                    _this.updateTabLeaderButton('None');
                    _this.isBarClicked = false;
                }
            };
            this.documentHelper = documentHelper;
        }
        TabDialog.prototype.getModuleName = function () {
            return 'TabDialog';
        };
        TabDialog.prototype.initTabsDialog = function (localeValue, enableRtl) {
            var ownerId = this.documentHelper.owner.containerId;
            this.target = ej2_base_1.createElement('div', { id: ownerId + '_tab', className: 'e-de-tab' });
            var commonDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            this.target.appendChild(commonDiv);
            var tabStopLabelDiv = ej2_base_1.createElement('div', { innerHTML: localeValue.getConstant('Tab stop position') + ':', className: 'e-de-para-dlg-heading' });
            var tabStopDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            tabStopDiv.appendChild(tabStopLabelDiv);
            var tabListDiv = ej2_base_1.createElement('div', { className: 'e-tab-list' });
            tabStopDiv.appendChild(tabListDiv);
            if (enableRtl) {
                tabListDiv.classList.add('e-de-rtl');
            }
            var textBoxDiv = ej2_base_1.createElement('div', { className: 'e-bookmark-textboxdiv' });
            tabListDiv.appendChild(textBoxDiv);
            this.textBoxInput = ej2_base_1.createElement('input', { className: 'e-input e-tab-textbox-input', attrs: { autofocus: 'true' } });
            this.textBoxInput.setAttribute('type', 'text');
            this.textBoxInput.setAttribute('aria-label', localeValue.getConstant('Tab stop position'));
            textBoxDiv.appendChild(this.textBoxInput);
            textBoxDiv.addEventListener('keyup', this.textBoxInputChange);
            this.textBoxInput.value = !ej2_base_1.isNullOrUndefined(this.tabStopList) && this.tabStopList.length > 0 ? this.tabStopList[0].displayText : '';
            var listviewDiv = ej2_base_1.createElement('div', { className: 'e-tab-listViewDiv', attrs: { tabindex: '-1' } });
            listviewDiv.setAttribute('aria-label', localeValue.getConstant('TabMarkList'));
            tabListDiv.appendChild(listviewDiv);
            this.listviewInstance = new ej2_lists_1.ListView({
                dataSource: this.tabStopList,
                fields: { text: 'displayText' },
                cssClass: 'e-bookmark-listview'
            });
            this.listviewInstance.appendTo(listviewDiv);
            this.listviewInstance.addEventListener('select', this.selectHandler);
            commonDiv.appendChild(tabStopDiv);
            var defaultTablabelDiv = ej2_base_1.createElement('div', { innerHTML: localeValue.getConstant('Default tab stops') + ':', className: 'e-de-para-dlg-heading' });
            var defaultTabDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            commonDiv.appendChild(defaultTabDiv);
            var defaultTabStopDiv = ej2_base_1.createElement('div', { className: 'e-de-dlg-container' });
            var defaultTabStop = ej2_base_1.createElement('input', { attrs: { 'type': 'text' } });
            defaultTabStopDiv.appendChild(defaultTablabelDiv);
            defaultTabStopDiv.appendChild(defaultTabStop);
            defaultTabDiv.appendChild(defaultTabStopDiv);
            this.defaultTabStopIn = new ej2_inputs_1.NumericTextBox({
                format: '# pt', value: this.documentHelper.defaultTabWidth, min: 0, max: 1584, step: 1, enablePersistence: false, placeholder: localeValue.getConstant('Default tab stops'),
            });
            this.defaultTabStopIn.appendTo(defaultTabStop);
            var defaultTabWarningDiv = ej2_base_1.createElement('div', { innerHTML: localeValue.getConstant('Tab stops to be cleared') + ':', className: 'e-de-dlg-container' });
            defaultTabDiv.appendChild(defaultTabWarningDiv);
            this.displayDiv = ej2_base_1.createElement('div', { className: 'e-defaultTablabelDiv' });
            if (this.documentHelper.owner.enableRtl) {
                this.displayDiv.style.marginRight = '20px';
            }
            else {
                this.displayDiv.style.marginLeft = '20px';
            }
            defaultTabDiv.appendChild(this.displayDiv);
            var alignmentDiv = ej2_base_1.createElement('div', { className: 'e-de-dlg-container' });
            this.target.appendChild(alignmentDiv);
            var alignmentLabelDiv = ej2_base_1.createElement('div', { innerHTML: localeValue.getConstant('Alignment') + ':', className: 'e-de-para-dlg-heading' });
            alignmentDiv.appendChild(alignmentLabelDiv);
            var alignmentPropertyDiv = ej2_base_1.createElement('div', { styles: 'display: flex;' });
            alignmentDiv.appendChild(alignmentPropertyDiv);
            var alignmentPropertyDiv1 = ej2_base_1.createElement('div', { styles: 'display: flex; flex-direction: column; width: 33.33%' });
            var leftDiv = ej2_base_1.createElement('div');
            var leftRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            var decimalDiv = ej2_base_1.createElement('div');
            var decimalRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            leftDiv.appendChild(leftRadioBtn);
            decimalDiv.appendChild(decimalRadioBtn);
            alignmentPropertyDiv1.appendChild(leftDiv);
            alignmentPropertyDiv1.appendChild(decimalDiv);
            alignmentPropertyDiv.appendChild(alignmentPropertyDiv1);
            this.left = new ej2_buttons_1.RadioButton({ label: localeValue.getConstant('Left'), name: 'alignment', value: 'left', cssClass: 'e-small', checked: true, enableRtl: enableRtl, change: this.onTabAlignmentButtonClick });
            this.decimal = new ej2_buttons_1.RadioButton({ label: localeValue.getConstant('Decimal'), name: 'alignment', value: 'decimal', cssClass: 'e-small', enableRtl: enableRtl, change: this.onTabAlignmentButtonClick });
            this.left.appendTo(leftRadioBtn);
            this.decimal.appendTo(decimalRadioBtn);
            leftRadioBtn.setAttribute('aria-label', localeValue.getConstant('Left'));
            decimalRadioBtn.setAttribute('aria-label', localeValue.getConstant('Decimal'));
            var alignmentPropertyDiv2 = ej2_base_1.createElement('div', { styles: 'display: flex; flex-direction: column; width: 33.33%' });
            var centerDiv = ej2_base_1.createElement('div');
            var centerRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            var barDiv = ej2_base_1.createElement('div');
            var barRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            barDiv.appendChild(barRadioBtn);
            centerDiv.appendChild(centerRadioBtn);
            alignmentPropertyDiv2.appendChild(centerDiv);
            alignmentPropertyDiv2.appendChild(barDiv);
            this.bar = new ej2_buttons_1.RadioButton({ label: localeValue.getConstant('Bar'), name: 'alignment', value: 'bar', cssClass: 'e-small', enableRtl: enableRtl, change: this.onBarClick });
            this.center = new ej2_buttons_1.RadioButton({ label: localeValue.getConstant('Center'), name: 'alignment', value: 'center', cssClass: 'e-small', enableRtl: enableRtl, change: this.onTabAlignmentButtonClick });
            this.bar.appendTo(barRadioBtn);
            this.center.appendTo(centerRadioBtn);
            barRadioBtn.setAttribute('aria-label', localeValue.getConstant('Bar'));
            centerRadioBtn.setAttribute('aria-label', localeValue.getConstant('Center'));
            alignmentPropertyDiv.appendChild(alignmentPropertyDiv2);
            var alignmentPropertyDiv3 = ej2_base_1.createElement('div', { styles: 'display: flex; flex-direction: column;width: 33.33%' });
            var rightDiv = ej2_base_1.createElement('div');
            var rightRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            rightDiv.appendChild(rightRadioBtn);
            alignmentPropertyDiv3.appendChild(rightDiv);
            this.right = new ej2_buttons_1.RadioButton({ label: localeValue.getConstant('Right'), name: 'alignment', value: 'right', cssClass: 'e-small', enableRtl: enableRtl, change: this.onTabAlignmentButtonClick });
            this.right.appendTo(rightRadioBtn);
            rightRadioBtn.setAttribute('aria-label', localeValue.getConstant('Right'));
            alignmentPropertyDiv.appendChild(alignmentPropertyDiv3);
            var tabLeaderDiv = ej2_base_1.createElement('div', { className: 'e-de-dlg-container' });
            var tabLeaderLabelDiv = ej2_base_1.createElement('div', { innerHTML: localeValue.getConstant('Leader') + ':', className: 'e-de-para-dlg-heading' });
            tabLeaderDiv.appendChild(tabLeaderLabelDiv);
            this.target.appendChild(tabLeaderDiv);
            var tabLeaderPropertyDiv = ej2_base_1.createElement('div', { styles: 'display: flex;' });
            tabLeaderDiv.appendChild(tabLeaderPropertyDiv);
            var tabLeaderPropertyDiv1 = ej2_base_1.createElement('div', { styles: 'display: flex; flex-direction: column; width: 33.33%' });
            var noneDiv = ej2_base_1.createElement('div');
            var noneRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            var underscoreDiv = ej2_base_1.createElement('div');
            var underscoreRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            noneDiv.appendChild(noneRadioBtn);
            underscoreDiv.appendChild(underscoreRadioBtn);
            tabLeaderPropertyDiv1.appendChild(noneDiv);
            tabLeaderPropertyDiv1.appendChild(underscoreDiv);
            this.none = new ej2_buttons_1.RadioButton({ label: '1 ' + localeValue.getConstant('None'), name: 'tabLeader', value: 'none', cssClass: 'e-small', checked: true, enableRtl: enableRtl });
            this.underscore = new ej2_buttons_1.RadioButton({ label: '4 _____', name: 'tabLeader', value: 'underscore', cssClass: 'e-small', enableRtl: enableRtl });
            this.none.appendTo(noneRadioBtn);
            this.underscore.appendTo(underscoreRadioBtn);
            tabLeaderPropertyDiv.appendChild(tabLeaderPropertyDiv1);
            var tabLeaderPropertyDiv2 = ej2_base_1.createElement('div', { styles: 'display: flex; flex-direction: column; width: 33.33%' });
            var dottedDiv = ej2_base_1.createElement('div');
            var dottedRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            var singleDiv = ej2_base_1.createElement('div');
            var singleRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            dottedDiv.appendChild(dottedRadioBtn);
            singleDiv.appendChild(singleRadioBtn);
            this.dotted = new ej2_buttons_1.RadioButton({ label: '2 .......', name: 'tabLeader', value: 'dotted', cssClass: 'e-small', enableRtl: enableRtl });
            this.single = new ej2_buttons_1.RadioButton({ label: '5 -------', name: 'tabLeader', value: 'single', cssClass: 'e-small', enableRtl: enableRtl });
            this.dotted.appendTo(dottedRadioBtn);
            this.single.appendTo(singleRadioBtn);
            tabLeaderPropertyDiv2.appendChild(dottedDiv);
            tabLeaderPropertyDiv2.appendChild(singleDiv);
            tabLeaderPropertyDiv.appendChild(tabLeaderPropertyDiv2);
            var tabLeaderPropertyDiv3 = ej2_base_1.createElement('div', { styles: 'display: flex; flex-direction: column; width: 33.33%' });
            var HyphenDiv = ej2_base_1.createElement('div');
            var HyphenRadioBtn = ej2_base_1.createElement('input', {
                attrs: { 'type': 'radiobutton' }
            });
            HyphenDiv.appendChild(HyphenRadioBtn);
            tabLeaderPropertyDiv3.appendChild(HyphenDiv);
            this.Hyphen = new ej2_buttons_1.RadioButton({ label: '3 -------', name: 'tabLeader', value: 'hyphen', cssClass: 'e-small', enableRtl: enableRtl });
            this.Hyphen.appendTo(HyphenRadioBtn);
            tabLeaderPropertyDiv.appendChild(tabLeaderPropertyDiv3);
            var buttonDiv = ej2_base_1.createElement('div', { className: 'e-de-tab-button', styles: 'display: flex;' });
            this.target.appendChild(buttonDiv);
            var tableElement = ej2_base_1.createElement('table');
            buttonDiv.appendChild(tableElement);
            tableElement.style.width = '100%';
            var row = tableElement.insertRow();
            var cell = row.insertCell();
            var setbuttonDiv = ej2_base_1.createElement('div', { className: 'e-de-tab-setBtn' });
            buttonDiv.appendChild(setbuttonDiv);
            var setButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localeValue.getConstant('Set'),
                attrs: { type: 'button' }
            });
            setButtonElement.setAttribute('aria-label', localeValue.getConstant('Set'));
            setbuttonDiv.appendChild(setButtonElement);
            this.setButton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            this.setButton.appendTo(setButtonElement);
            cell.appendChild(setbuttonDiv);
            setButtonElement.addEventListener('click', this.setButtonClick);
            cell.style.width = '33.33%';
            cell.style.display = 'table-cell';
            cell = row.insertCell();
            var clearbuttonDiv = ej2_base_1.createElement('div', { className: 'e-de-tab-clearBtn' });
            buttonDiv.appendChild(clearbuttonDiv);
            var clearButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localeValue.getConstant('Clear'),
                attrs: { type: 'button' }
            });
            clearButtonElement.setAttribute('aria-label', localeValue.getConstant('Clear'));
            clearbuttonDiv.appendChild(clearButtonElement);
            this.clearButton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            this.clearButton.appendTo(clearButtonElement);
            clearButtonElement.addEventListener('click', this.clearButtonClick);
            cell.appendChild(clearbuttonDiv);
            cell.style.width = '33.33%';
            cell.style.display = 'table-cell';
            cell = row.insertCell();
            var clearAllbuttonDiv = ej2_base_1.createElement('div', { className: 'e-de-tab-clearAllBtn' });
            buttonDiv.appendChild(clearAllbuttonDiv);
            var clearAllButtonElement = ej2_base_1.createElement('button', {
                innerHTML: localeValue.getConstant('Clear All'),
                attrs: { type: 'button' }
            });
            clearAllButtonElement.setAttribute('aria-label', localeValue.getConstant('Clear All'));
            clearAllbuttonDiv.appendChild(clearAllButtonElement);
            this.clearAllButton = new ej2_buttons_1.Button({ cssClass: 'e-button-custom' });
            this.clearAllButton.appendTo(clearAllButtonElement);
            clearAllButtonElement.addEventListener('click', this.clearAllButtonClick);
            cell.appendChild(clearAllbuttonDiv);
            cell.style.width = '33.33%';
            cell.style.display = 'table-cell';
            this.selectedTabStop = !ej2_base_1.isNullOrUndefined(this.tabStopList) && this.tabStopList.length > 0 ? this.tabStopList[0] : undefined;
            this.updateButtons();
        };
        TabDialog.prototype.getTabAlignmentValue = function () {
            if (this.left.checked) {
                return 'Left';
            }
            else if (this.center.checked) {
                return 'Center';
            }
            else if (this.right.checked) {
                return 'Right';
            }
            else if (this.decimal.checked) {
                return 'Decimal';
            }
            else if (this.bar.checked) {
                return 'Bar';
            }
            return 'Left';
        };
        TabDialog.prototype.getTabLeaderValue = function () {
            if (this.none.checked) {
                return 'None';
            }
            else if (this.dotted.checked) {
                return 'Dot';
            }
            else if (this.Hyphen.checked) {
                return 'Hyphen';
            }
            else if (this.underscore.checked) {
                return 'Underscore';
            }
            else if (this.single.checked) {
                return 'Single';
            }
            return 'None';
        };
        TabDialog.prototype.updateButtons = function () {
            if (!ej2_base_1.isNullOrUndefined(this.selectedTabStop)) {
                this.updateTabAlignmentButton(this.selectedTabStop.value.tabJustification);
                this.updateTabLeaderButton(this.selectedTabStop.value.tabLeader);
            }
            else {
                this.updateTabAlignmentButton('Left');
                this.updateTabLeaderButton('None');
            }
        };
        TabDialog.prototype.updateTabLeaderButton = function (value) {
            this.clearTabLeaderButton();
            if (this.getTabAlignmentValue() === 'Bar') {
                return;
            }
            switch (value) {
                case 'None':
                    this.none.checked = true;
                    break;
                case 'Single':
                    this.single.checked = true;
                    break;
                case 'Dot':
                    this.dotted.checked = true;
                    break;
                case 'Hyphen':
                    this.Hyphen.checked = true;
                    break;
                case 'Underscore':
                    this.underscore.checked = true;
                    break;
                default:
                    this.none.checked = true;
                    break;
            }
        };
        TabDialog.prototype.updateTabAlignmentButton = function (value) {
            this.clearTabAlignmentButton();
            switch (value) {
                case 'Left':
                    this.left.checked = true;
                    break;
                case 'Center':
                    this.center.checked = true;
                    break;
                case 'Right':
                    this.right.checked = true;
                    break;
                case 'Decimal':
                    this.decimal.checked = true;
                    break;
                case 'Bar':
                    this.bar.checked = true;
                    this.clearTabLeaderButton();
                    this.disableOrEnableTabLeaderButton(true);
                    return;
                default:
                    break;
            }
            this.disableOrEnableTabLeaderButton(false);
        };
        TabDialog.prototype.clearTabLeaderButton = function () {
            this.none.checked = false;
            this.single.checked = false;
            this.dotted.checked = false;
            this.Hyphen.checked = false;
            this.underscore.checked = false;
        };
        TabDialog.prototype.disableOrEnableTabLeaderButton = function (isDisable) {
            this.none.disabled = isDisable;
            this.single.disabled = isDisable;
            this.dotted.disabled = isDisable;
            this.Hyphen.disabled = isDisable;
            this.underscore.disabled = isDisable;
        };
        TabDialog.prototype.clearTabAlignmentButton = function () {
            this.left.checked = false;
            this.center.checked = false;
            this.right.checked = false;
            this.decimal.checked = false;
            this.bar.checked = false;
        };
        TabDialog.prototype.focusTextBox = function (text) {
            this.textBoxInput.value = text;
            var value = this.textBoxInput;
            value.setSelectionRange(0, text.length);
            value.focus();
        };
        TabDialog.prototype.show = function () {
            var localObj = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localObj.setLocale(this.documentHelper.owner.locale);
            this.localeValue = localObj;
            var tabs = this.documentHelper.owner.editor.getTabsInSelection();
            this.tabStopList = [];
            for (var i = 0; i < tabs.length; i++) {
                var value = parseFloat((tabs[i].position).toFixed(2)) + ' pt';
                var objectValue = { 'displayText': value, 'value': tabs[i].clone() };
                this.tabStopList.push(objectValue);
            }
            this.initTabsDialog(localObj, this.documentHelper.owner.enableRtl);
            this.documentHelper.dialog.header = localObj.getConstant('Tabs');
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
            this.documentHelper.dialog.close = this.documentHelper.updateFocus;
            this.documentHelper.dialog.buttons = [{
                    click: this.applyParagraphFormat,
                    buttonModel: { content: localObj.getConstant('Ok'), cssClass: 'e-flat e-para-okay', isPrimary: true }
                },
                {
                    click: this.closeTabDialog,
                    buttonModel: { content: localObj.getConstant('Cancel'), cssClass: 'e-flat e-para-cancel' }
                }
            ];
            this.documentHelper.dialog.show();
        };
        TabDialog.prototype.destroy = function () {
            this.target = undefined;
            this.textBoxInput = undefined;
            this.defaultTabStopIn = undefined;
            this.left = undefined;
            this.right = undefined;
            this.center = undefined;
            this.decimal = undefined;
            this.bar = undefined;
            this.none = undefined;
            this.dotted = undefined;
            this.single = undefined;
            this.Hyphen = undefined;
            this.setButton = undefined;
            this.clearButton = undefined;
            this.clearAllButton = undefined;
            if (this.listviewInstance) {
                this.listviewInstance.destroy();
                this.listviewInstance = undefined;
            }
            this.selectedTabStop = undefined;
            this.isBarClicked = undefined;
            this.removedItems = undefined;
            this.tabStopList = undefined;
            this.localeValue = undefined;
        };
        return TabDialog;
    }());
    exports.TabDialog = TabDialog;
});
