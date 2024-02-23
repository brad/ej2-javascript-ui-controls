define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-buttons", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-inputs", "@syncfusion/ej2-lists"], function (require, exports, ej2_base_1, ej2_buttons_1, ej2_dropdowns_1, ej2_inputs_1, ej2_lists_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableOfContentsDialog = (function () {
        function TableOfContentsDialog(documentHelper) {
            var _this = this;
            this.loadTableofContentDialog = function () {
                _this.documentHelper.updateFocus();
                _this.pageNumber.checked = true;
                _this.rightAlign.disabled = false;
                _this.rightAlign.checked = true;
                _this.tabLeader.enabled = true;
                _this.hyperlink.checked = true;
                _this.style.checked = true;
                _this.outline.checked = true;
                _this.outline.disabled = false;
                _this.showLevel.enabled = true;
            };
            this.closeTableOfContentDialog = function () {
                _this.unWireEventsAndBindings();
                _this.documentHelper.updateFocus();
            };
            this.onCancelButtonClick = function () {
                _this.documentHelper.dialog3.hide();
                _this.unWireEventsAndBindings();
                _this.documentHelper.updateFocus();
            };
            this.selectHandler = function (args) {
                _this.textBoxInput.value = args.text;
                var value = _this.textBoxInput;
                value.setSelectionRange(0, args.text.length);
                value.focus();
            };
            this.showStyleDialog = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.documentHelper.owner.styleDialogModule)) {
                    _this.documentHelper.owner.styleDialogModule.show(_this.textBoxInput.value);
                }
            };
            this.reset = function () {
                _this.showLevel.enabled = true;
                _this.showLevel.value = 3;
                _this.outline.disabled = false;
                _this.outline.checked = true;
                var values = ['1', '2', '3', null, null, null, null, null, null];
                _this.changeByValue(values);
                _this.normal.value = null;
            };
            this.changeStyle = function (args) {
                var headingValue = args.srcElement.value;
                var value = _this.getElementValue(args.srcElement);
                if (headingValue !== value && headingValue !== '') {
                    _this.showLevel.enabled = false;
                }
                else {
                    _this.showLevel.enabled = true;
                    _this.checkLevel();
                }
            };
            this.changeHeadingStyle = function (args) {
                var headingValue = args.srcElement.value;
                if (headingValue === '') {
                    _this.showLevel.enabled = true;
                }
                else {
                    _this.showLevel.enabled = false;
                }
                if (_this.normal === args.srcElement) {
                    _this.outline.checked = false;
                    _this.outline.disabled = true;
                }
            };
            this.changePageNumberValue = function (args) {
                if (args.checked) {
                    _this.rightAlign.checked = true;
                    _this.rightAlign.disabled = false;
                    _this.tabLeader.enabled = true;
                }
                else {
                    _this.rightAlign.disabled = true;
                    _this.tabLeader.enabled = false;
                }
            };
            this.changeRightAlignValue = function (args) {
                if (args.checked) {
                    _this.tabLeader.enabled = true;
                }
                else {
                    _this.tabLeader.enabled = false;
                }
            };
            this.changeStyleValue = function (args) {
                if (args.checked) {
                    _this.heading1.disabled = false;
                    _this.heading2.disabled = false;
                    _this.heading3.disabled = false;
                    _this.heading4.disabled = false;
                    _this.heading5.disabled = false;
                    _this.heading6.disabled = false;
                    _this.heading7.disabled = false;
                    _this.heading8.disabled = false;
                    _this.heading9.disabled = false;
                    _this.normal.disabled = false;
                }
                else {
                    _this.heading1.disabled = true;
                    _this.heading2.disabled = true;
                    _this.heading3.disabled = true;
                    _this.heading4.disabled = true;
                    _this.heading5.disabled = true;
                    _this.heading6.disabled = true;
                    _this.heading7.disabled = true;
                    _this.heading8.disabled = true;
                    _this.heading9.disabled = true;
                    _this.normal.disabled = true;
                }
            };
            this.applyTableOfContentProperties = function () {
                var tocSettings = {
                    startLevel: 1,
                    endLevel: _this.showLevel.value,
                    includeHyperlink: _this.hyperlink.checked,
                    includePageNumber: _this.pageNumber.checked,
                    rightAlign: _this.rightAlign.checked,
                    tabLeader: _this.tabLeader.value,
                    includeOutlineLevels: _this.outline.checked
                };
                _this.applyLevelSetting(tocSettings);
                _this.documentHelper.owner.editorModule.insertTableOfContents(tocSettings);
                _this.documentHelper.dialog3.hide();
                _this.documentHelper.updateFocus();
            };
            this.unWireEventsAndBindings = function () {
                _this.pageNumber.checked = false;
                _this.rightAlign.checked = false;
                _this.tabLeader.value = '';
                _this.hyperlink.checked = false;
                _this.style.checked = false;
                _this.outline.checked = false;
                _this.normal.value = '';
            };
            this.documentHelper = documentHelper;
        }
        TableOfContentsDialog.prototype.getModuleName = function () {
            return 'TableOfContentsDialog';
        };
        TableOfContentsDialog.prototype.initTableOfContentDialog = function (locale, isRtl) {
            var instance = this;
            var ownerId = this.documentHelper.owner.containerId;
            var id = ownerId + '_toc_dialog';
            this.target = ej2_base_1.createElement('div', { id: id, className: 'e-de-toc-dlg-container' });
            var generalDiv = ej2_base_1.createElement('div', { id: 'general_div', className: 'e-de-toc-dlg-sub-container' });
            this.target.appendChild(generalDiv);
            var genLabel = ej2_base_1.createElement('div', { id: ownerId + '_genLabel', className: 'e-de-toc-dlg-main-heading', styles: 'margin-bottom: 13px;', innerHTML: locale.getConstant('General') });
            generalDiv.appendChild(genLabel);
            var leftGeneralDivStyles;
            var rightBottomGeneralDivStyles;
            if (isRtl) {
                leftGeneralDivStyles = 'float:right;';
                rightBottomGeneralDivStyles = 'float:left;position:relative;';
            }
            else {
                leftGeneralDivStyles = 'float:left;';
                rightBottomGeneralDivStyles = 'float:right;';
            }
            var topContainer = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var leftGeneralDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            topContainer.appendChild(leftGeneralDiv);
            var rightGeneralDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            topContainer.appendChild(rightGeneralDiv);
            generalDiv.appendChild(topContainer);
            var bottomContainer = ej2_base_1.createElement('div', { className: 'e-de-dlg-row' });
            var leftBottomGeneralDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            bottomContainer.appendChild(leftBottomGeneralDiv);
            var rightBottomGeneralDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            bottomContainer.appendChild(rightBottomGeneralDiv);
            var pageNumberDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-dlg-sub-container' });
            var pageNumber = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }, id: this.target.id + '_pageNumber'
            });
            pageNumberDiv.appendChild(pageNumber);
            var rightAlignDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-dlg-sub-container' });
            var rightAlign = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }, id: this.target.id + '_rightAlign'
            });
            rightAlignDiv.appendChild(rightAlign);
            this.pageNumber = new ej2_buttons_1.CheckBox({ label: locale.getConstant('Show page numbers'), enableRtl: isRtl, checked: true, change: this.changePageNumberValue });
            this.rightAlign = new ej2_buttons_1.CheckBox({ label: locale.getConstant('Right align page numbers'), enableRtl: isRtl, checked: true, change: this.changeRightAlignValue });
            this.pageNumber.appendTo(pageNumber);
            this.rightAlign.appendTo(rightAlign);
            var tabDivContainer = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var tabDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            var tabLeaderLabelDiv = ej2_base_1.createElement('div');
            var tabLeaderLabel = ej2_base_1.createElement('label', { className: 'e-de-toc-dlg-heading', innerHTML: locale.getConstant('Tab leader') + ':' });
            tabLeaderLabelDiv.appendChild(tabLeaderLabel);
            var tabLeaderDiv = ej2_base_1.createElement('div', { id: 'tabLeader_div' });
            var tabLeader = ej2_base_1.createElement('select', {
                id: ownerId + '_tabLeader',
                innerHTML: '<option value="None">' + '(' + locale.getConstant('None').toLocaleLowerCase() + ')' +
                    '</option><option value="Dot" selected>' + '....................' +
                    '</option><option value="Hyphen">' + '-------------------' +
                    '</option><option value="Underscore">' + '____________' + '</option>'
            });
            tabLeaderDiv.appendChild(tabLeader);
            tabDiv.appendChild(tabLeaderLabelDiv);
            tabDiv.appendChild(tabLeaderDiv);
            leftGeneralDiv.appendChild(pageNumberDiv);
            leftGeneralDiv.appendChild(rightAlignDiv);
            tabDivContainer.appendChild(tabDiv);
            this.tabLeader = new ej2_dropdowns_1.DropDownList({ enableRtl: isRtl });
            this.tabLeader.appendTo(tabLeader);
            var hyperlink = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }, id: this.target.id + '_hyperlink'
            });
            rightGeneralDiv.appendChild(hyperlink);
            this.hyperlink = new ej2_buttons_1.CheckBox({ label: locale.getConstant('Use hyperlinks instead of page numbers'), cssClass: 'e-de-toc-label', enableRtl: isRtl, checked: true });
            this.hyperlink.appendTo(hyperlink);
            var showDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            var showLevelLabelDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-dlg-show-level-div' });
            var showLevelLabel = ej2_base_1.createElement('label', { className: 'e-de-toc-dlg-heading', innerHTML: locale.getConstant('Show levels') + ':' });
            showLevelLabelDiv.appendChild(showLevelLabel);
            var showLevelDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-dlg-showlevel-div' });
            var showLevel = ej2_base_1.createElement('input', { id: ownerId + '_showLevel', attrs: { 'type': 'text', 'aria-label': 'showLevel' } });
            showLevelDiv.appendChild(showLevel);
            showDiv.appendChild(showLevelLabelDiv);
            showDiv.appendChild(showLevelDiv);
            tabDivContainer.appendChild(showDiv);
            generalDiv.appendChild(tabDivContainer);
            this.showLevel = new ej2_inputs_1.NumericTextBox({ format: '#', value: 3, min: 1, max: 9, change: this.changeShowLevelValue.bind(this) });
            this.showLevel.appendTo(showLevel);
            if (isRtl) {
                this.hyperlink.cssClass = 'e-de-toc-label-rtl';
                showLevelLabelDiv.classList.add('e-de-rtl');
                showLevelDiv.classList.add('e-de-rtl');
                rightBottomGeneralDiv.classList.add('e-de-rtl');
            }
            var buildTableLabel = ej2_base_1.createElement('div', { className: 'e-de-toc-dlg-main-heading e-de-toc-dlg-build-table', innerHTML: locale.getConstant('Build table of contents from') + ':' });
            generalDiv.appendChild(bottomContainer);
            var style = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }, id: this.target.id + '_style',
            });
            leftBottomGeneralDiv.appendChild(buildTableLabel);
            leftBottomGeneralDiv.appendChild(style);
            this.style = new ej2_buttons_1.CheckBox({ label: locale.getConstant('Styles'), enableRtl: isRtl, checked: true, change: this.changeStyleValue });
            this.style.appendTo(style);
            var table = ej2_base_1.createElement('TABLE', { styles: 'margin-top:3px;' });
            var tr1 = ej2_base_1.createElement('tr');
            var td1 = ej2_base_1.createElement('td', { styles: 'width:120px;padding-left:10px;' });
            var availableLabel = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Available styles'), className: 'e-de-toc-dlg-main-heading e-de-toc-dlg-sub-level-heading', id: this.target.id + '_availableLabel'
            });
            td1.appendChild(availableLabel);
            var td2 = ej2_base_1.createElement('td');
            var tocLabel = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('TOC level') + ':', className: 'e-de-toc-dlg-main-heading e-de-toc-dlg-sub-level-heading',
                id: this.target.id + '_tocLabel'
            });
            td2.appendChild(tocLabel);
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            table.appendChild(tr1);
            var tableDiv = ej2_base_1.createElement('div', { id: 'table_div', className: 'e-de-toc-table-div' });
            var table1 = ej2_base_1.createElement('TABLE');
            var tr2 = ej2_base_1.createElement('tr');
            var td3 = ej2_base_1.createElement('td');
            var heading1Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 1',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading1Label'
            });
            td3.appendChild(heading1Label);
            var td4 = ej2_base_1.createElement('td');
            this.heading1 = ej2_base_1.createElement('input', { id: '_heading1', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 1' } });
            this.heading1.value = '1';
            this.heading1.addEventListener('keyup', this.changeStyle);
            td4.appendChild(this.heading1);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            var tr3 = ej2_base_1.createElement('tr');
            var td5 = ej2_base_1.createElement('td');
            var heading2Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 2',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading2Label'
            });
            td5.appendChild(heading2Label);
            var td6 = ej2_base_1.createElement('td');
            this.heading2 = ej2_base_1.createElement('input', { id: '_heading2', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 2' } });
            this.heading2.value = '2';
            this.heading2.addEventListener('keyup', this.changeStyle);
            td6.appendChild(this.heading2);
            tr3.appendChild(td5);
            tr3.appendChild(td6);
            var tr4 = ej2_base_1.createElement('tr');
            var td7 = ej2_base_1.createElement('td');
            var heading3Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 3',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading3Label'
            });
            td7.appendChild(heading3Label);
            var td8 = ej2_base_1.createElement('td');
            this.heading3 = ej2_base_1.createElement('input', { id: '_heading3', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 3' } });
            this.heading3.value = '3';
            this.heading3.addEventListener('keyup', this.changeStyle);
            td8.appendChild(this.heading3);
            tr4.appendChild(td7);
            tr4.appendChild(td8);
            var tr5 = ej2_base_1.createElement('tr');
            var td9 = ej2_base_1.createElement('td');
            var heading4Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 4',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading4Label'
            });
            td9.appendChild(heading4Label);
            var td10 = ej2_base_1.createElement('td');
            this.heading4 = ej2_base_1.createElement('input', { id: '_heading4', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 4' } });
            this.heading4.addEventListener('keyup', this.changeStyle);
            td10.appendChild(this.heading4);
            tr5.appendChild(td9);
            tr5.appendChild(td10);
            var tr6 = ej2_base_1.createElement('tr');
            var td11 = ej2_base_1.createElement('td');
            var heading5Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 5',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading5Label'
            });
            td11.appendChild(heading5Label);
            var td12 = ej2_base_1.createElement('td');
            this.heading5 = ej2_base_1.createElement('input', { id: '_heading5', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 5' } });
            this.heading5.addEventListener('keyup', this.changeStyle);
            td12.appendChild(this.heading5);
            tr6.appendChild(td11);
            tr6.appendChild(td12);
            var tr7 = ej2_base_1.createElement('tr');
            var td13 = ej2_base_1.createElement('td');
            var heading6Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 6',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading6Label'
            });
            td13.appendChild(heading6Label);
            var td14 = ej2_base_1.createElement('td');
            this.heading6 = ej2_base_1.createElement('input', { id: '_heading6', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 6' } });
            this.heading6.addEventListener('keyup', this.changeStyle);
            td14.appendChild(this.heading6);
            tr7.appendChild(td13);
            tr7.appendChild(td14);
            var tr8 = ej2_base_1.createElement('tr');
            var td15 = ej2_base_1.createElement('td');
            var heading7Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 7',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading7Label'
            });
            td15.appendChild(heading7Label);
            var td16 = ej2_base_1.createElement('td');
            this.heading7 = ej2_base_1.createElement('input', { id: '_heading7', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 7' } });
            this.heading7.addEventListener('keyup', this.changeStyle);
            td16.appendChild(this.heading7);
            tr8.appendChild(td15);
            tr8.appendChild(td16);
            var tr9 = ej2_base_1.createElement('tr');
            var td17 = ej2_base_1.createElement('td');
            var heading8Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 8',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading8Label'
            });
            td17.appendChild(heading8Label);
            var td18 = ej2_base_1.createElement('td');
            this.heading8 = ej2_base_1.createElement('input', { id: '_heading8', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 8' } });
            this.heading8.addEventListener('keyup', this.changeStyle);
            td18.appendChild(this.heading8);
            tr9.appendChild(td17);
            tr9.appendChild(td18);
            var tr10 = ej2_base_1.createElement('tr');
            var td19 = ej2_base_1.createElement('td');
            var heading9Label = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Heading') + ' 9',
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading9Label'
            });
            td19.appendChild(heading9Label);
            var td20 = ej2_base_1.createElement('td');
            this.heading9 = ej2_base_1.createElement('input', { id: '_heading9', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 9' } });
            this.heading9.addEventListener('keyup', this.changeStyle);
            td20.appendChild(this.heading9);
            tr10.appendChild(td19);
            tr10.appendChild(td20);
            var tr12 = ej2_base_1.createElement('tr');
            var td23 = ej2_base_1.createElement('td');
            var normalLabel = ej2_base_1.createElement('label', {
                innerHTML: locale.getConstant('Normal'),
                className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_normalLabel'
            });
            td23.appendChild(normalLabel);
            var td24 = ej2_base_1.createElement('td');
            this.normal = ej2_base_1.createElement('input', { id: '_normal', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Normal') } });
            this.normal.addEventListener('keyup', this.changeHeadingStyle);
            td24.appendChild(this.normal);
            tr12.appendChild(td23);
            tr12.appendChild(td24);
            if (isRtl) {
                this.normal.classList.add('e-de-rtl');
                this.heading1.classList.add('e-de-rtl');
                this.heading2.classList.add('e-de-rtl');
                this.heading3.classList.add('e-de-rtl');
                this.heading4.classList.add('e-de-rtl');
                this.heading5.classList.add('e-de-rtl');
                this.heading6.classList.add('e-de-rtl');
                this.heading7.classList.add('e-de-rtl');
                this.heading8.classList.add('e-de-rtl');
                this.heading9.classList.add('e-de-rtl');
            }
            table1.appendChild(tr2);
            table1.appendChild(tr3);
            table1.appendChild(tr4);
            table1.appendChild(tr5);
            table1.appendChild(tr6);
            table1.appendChild(tr7);
            table1.appendChild(tr8);
            table1.appendChild(tr9);
            table1.appendChild(tr10);
            table1.appendChild(tr12);
            tableDiv.appendChild(table1);
            var stylesLevelDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-styles-table-div' });
            stylesLevelDiv.appendChild(table);
            stylesLevelDiv.appendChild(tableDiv);
            leftBottomGeneralDiv.appendChild(stylesLevelDiv);
            var fieldsDiv = ej2_base_1.createElement('div', { id: 'fields_div', styles: 'display: flex;' });
            leftBottomGeneralDiv.appendChild(fieldsDiv);
            var outDiv = ej2_base_1.createElement('div', { id: 'out_div' });
            var outlineDiv = ej2_base_1.createElement('div', { id: 'outline_div', className: 'e-de-toc-dlg-sub-container e-de-toc-dlg-outline-levels' });
            var outline = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }, id: '_outline'
            });
            outlineDiv.appendChild(outline);
            outDiv.appendChild(outlineDiv);
            fieldsDiv.appendChild(outDiv);
            this.outline = new ej2_buttons_1.CheckBox({
                label: locale.getConstant('Outline levels'),
                enableRtl: isRtl, checked: true, cssClass: 'e-de-outline-rtl'
            });
            this.outline.appendTo(outline);
            var resetButtonDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-reset-button' });
            fieldsDiv.appendChild(resetButtonDiv);
            var resetElement = ej2_base_1.createElement('button', {
                innerHTML: locale.getConstant('Reset'), id: 'reset',
                attrs: { type: 'button' }
            });
            resetButtonDiv.appendChild(resetElement);
            var resetButton = new ej2_buttons_1.Button({ cssClass: 'e-btn e-flat' });
            resetButton.appendTo(resetElement);
            resetElement.addEventListener('click', this.reset);
            var tocStylesLabel = ej2_base_1.createElement('div', {
                id: ownerId + '_tocStylesLabel', className: 'e-de-toc-dlg-main-heading',
                innerHTML: locale.getConstant('Styles') + ':'
            });
            rightBottomGeneralDiv.appendChild(tocStylesLabel);
            var textBoxDiv = ej2_base_1.createElement('div');
            rightBottomGeneralDiv.appendChild(textBoxDiv);
            this.textBoxInput = ej2_base_1.createElement('input', { className: 'e-input', attrs: { 'aria-label': 'Type of TOC' } });
            this.textBoxInput.setAttribute('type', 'text');
            textBoxDiv.appendChild(this.textBoxInput);
            var listViewDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-list-view' });
            var styleLocale = ['TOC 1', 'TOC 2', 'TOC 3', 'TOC 4', 'TOC 5', 'TOC 6', 'TOC 7', 'TOC 8', 'TOC 9'];
            var styleValues = this.styleLocaleValue(styleLocale, locale);
            this.listViewInstance = new ej2_lists_1.ListView({ dataSource: styleValues, cssClass: 'e-toc-list-view' });
            this.listViewInstance.appendTo(listViewDiv);
            this.listViewInstance.addEventListener('select', this.selectHandler);
            rightBottomGeneralDiv.appendChild(listViewDiv);
            var modifyButtonDiv = ej2_base_1.createElement('div', { className: 'e-de-toc-modify-button' });
            rightBottomGeneralDiv.appendChild(modifyButtonDiv);
            var modifyElement = ej2_base_1.createElement('button', {
                innerHTML: locale.getConstant('Modify') + '...', id: 'modify',
                attrs: { type: 'button' }
            });
            modifyButtonDiv.appendChild(modifyElement);
            var modifyButton = new ej2_buttons_1.Button({ cssClass: 'e-btn e-flat' });
            modifyButton.appendTo(modifyElement);
            modifyElement.addEventListener('click', this.showStyleDialog);
            if (isRtl) {
                resetButtonDiv.classList.add('e-de-rtl');
                tocStylesLabel.classList.add('e-de-rtl');
                textBoxDiv.classList.add('e-de-rtl');
                listViewDiv.classList.add('e-de-rtl');
                modifyButtonDiv.classList.add('e-de-rtl');
            }
        };
        TableOfContentsDialog.prototype.styleLocaleValue = function (styleLocale, localValue) {
            var styleName = [];
            for (var index = 0; index < styleLocale.length; index++) {
                styleName.push(localValue.getConstant(styleLocale[index]));
            }
            return styleName;
        };
        TableOfContentsDialog.prototype.show = function () {
            var localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localValue.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.initTableOfContentDialog(localValue, this.documentHelper.owner.enableRtl);
            }
            this.documentHelper.dialog3.header = localValue.getConstant('Table of Contents');
            this.documentHelper.dialog3.position = { X: 'center', Y: 'center' };
            this.documentHelper.dialog3.width = 'auto';
            this.documentHelper.dialog3.height = 'auto';
            this.documentHelper.dialog3.content = this.target;
            this.documentHelper.dialog3.beforeOpen = this.loadTableofContentDialog;
            this.documentHelper.dialog3.close = this.closeTableOfContentDialog;
            this.documentHelper.dialog3.buttons = [{
                    click: this.applyTableOfContentProperties,
                    buttonModel: { content: localValue.getConstant('Ok'), cssClass: 'e-flat e-toc-okay', isPrimary: true }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-toc-cancel' }
                }];
            this.documentHelper.dialog3.dataBind();
            this.documentHelper.dialog3.show();
        };
        TableOfContentsDialog.prototype.changeShowLevelValue = function (event) {
            var levels = event.value;
            var values = [];
            switch (levels) {
                case 1:
                    values = ['1', null, null, null, null, null, null, null, null];
                    this.changeByValue(values);
                    break;
                case 2:
                    values = ['1', '2', null, null, null, null, null, null, null];
                    this.changeByValue(values);
                    break;
                case 3:
                    values = ['1', '2', '3', null, null, null, null, null, null];
                    this.changeByValue(values);
                    break;
                case 4:
                    values = ['1', '2', '3', '4', null, null, null, null, null];
                    this.changeByValue(values);
                    break;
                case 5:
                    values = ['1', '2', '3', '4', '5', null, null, null, null];
                    this.changeByValue(values);
                    break;
                case 6:
                    values = ['1', '2', '3', '4', '5', '6', null, null, null];
                    this.changeByValue(values);
                    break;
                case 7:
                    values = ['1', '2', '3', '4', '5', '6', '7', null, null];
                    this.changeByValue(values);
                    break;
                case 8:
                    values = ['1', '2', '3', '4', '5', '6', '7', '8', null];
                    this.changeByValue(values);
                    break;
                case 9:
                    values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
                    this.changeByValue(values);
                    break;
            }
        };
        TableOfContentsDialog.prototype.changeByValue = function (headings) {
            this.heading1.value = headings[0];
            this.heading2.value = headings[1];
            this.heading3.value = headings[2];
            this.heading4.value = headings[3];
            this.heading5.value = headings[4];
            this.heading6.value = headings[5];
            this.heading7.value = headings[6];
            this.heading8.value = headings[7];
            this.heading9.value = headings[8];
        };
        TableOfContentsDialog.prototype.checkLevel = function () {
            if (this.heading1.value !== '') {
                this.showLevel.value = 1;
            }
            if (this.heading2.value !== '') {
                this.showLevel.value = 2;
            }
            if (this.heading3.value !== '') {
                this.showLevel.value = 3;
            }
            if (this.heading4.value !== '') {
                this.showLevel.value = 4;
            }
            if (this.heading5.value !== '') {
                this.showLevel.value = 5;
            }
            if (this.heading6.value !== '') {
                this.showLevel.value = 6;
            }
            if (this.heading7.value !== '') {
                this.showLevel.value = 7;
            }
            if (this.heading8.value !== '') {
                this.showLevel.value = 8;
            }
            if (this.heading9.value !== '') {
                this.showLevel.value = 9;
            }
        };
        TableOfContentsDialog.prototype.getElementValue = function (element) {
            switch (element) {
                case this.heading1:
                    return '1';
                case this.heading2:
                    return '2';
                case this.heading3:
                    return '3';
                case this.heading4:
                    return '4';
                case this.heading5:
                    return '5';
                case this.heading6:
                    return '6';
                case this.heading7:
                    return '7';
                case this.heading8:
                    return '8';
                case this.heading9:
                    return '9';
                default:
                    return '1';
            }
        };
        TableOfContentsDialog.prototype.getHeadingLevel = function (index) {
            switch (index) {
                case 1:
                    return parseInt(this.heading1.value);
                case 2:
                    return parseInt(this.heading2.value);
                case 3:
                    return parseInt(this.heading3.value);
                case 4:
                    return parseInt(this.heading4.value);
                case 5:
                    return parseInt(this.heading5.value);
                case 6:
                    return parseInt(this.heading6.value);
                case 7:
                    return parseInt(this.heading7.value);
                case 8:
                    return parseInt(this.heading8.value);
                case 9:
                    return parseInt(this.heading9.value);
                default:
                    return 0;
            }
        };
        TableOfContentsDialog.prototype.applyLevelSetting = function (tocSettings) {
            tocSettings.levelSettings = {};
            var headingPrefix = 'Heading ';
            var newStartLevel = 0;
            var newEndLevel = 0;
            var isEndLevel = false;
            for (var i = 1; i <= tocSettings.endLevel; i++) {
                var outlineLevel = this.getHeadingLevel(i);
                if (i === outlineLevel) {
                    if (newStartLevel === 0) {
                        newStartLevel = i;
                        isEndLevel = false;
                    }
                    if (!isEndLevel) {
                        newEndLevel = i;
                    }
                }
                else {
                    isEndLevel = true;
                    if (outlineLevel !== 0) {
                        var headingStyle = headingPrefix + i.toString();
                        tocSettings.levelSettings[headingStyle] = outlineLevel;
                    }
                }
            }
            tocSettings.startLevel = newStartLevel;
            tocSettings.endLevel = newEndLevel;
            if (this.normal.value !== '') {
                tocSettings.levelSettings['Normal'] = +this.normal.value;
            }
        };
        TableOfContentsDialog.prototype.destroy = function () {
            if (this.pageNumber) {
                this.pageNumber.destroy();
                this.pageNumber = undefined;
            }
            if (this.rightAlign) {
                this.rightAlign.destroy();
                this.rightAlign = undefined;
            }
            if (this.tabLeader) {
                this.tabLeader.destroy();
                this.tabLeader = undefined;
            }
            if (this.showLevel) {
                this.showLevel.destroy();
                this.showLevel = undefined;
            }
            if (this.hyperlink) {
                this.hyperlink.destroy();
                this.hyperlink = undefined;
            }
            if (this.style) {
                this.style.destroy();
                this.style = undefined;
            }
            if (this.outline) {
                this.outline.destroy();
                this.outline = undefined;
            }
            if (this.listViewInstance) {
                this.listViewInstance.destroy();
                this.listViewInstance = undefined;
            }
            this.heading1 = undefined;
            this.heading2 = undefined;
            this.heading3 = undefined;
            this.heading4 = undefined;
            this.heading5 = undefined;
            this.heading6 = undefined;
            this.heading7 = undefined;
            this.heading8 = undefined;
            this.heading9 = undefined;
            this.normal = undefined;
            this.textBoxInput = undefined;
            this.documentHelper = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.target)) {
                if (this.target.parentElement) {
                    this.target.parentElement.removeChild(this.target);
                }
                for (var count = 0; count < this.target.childNodes.length; count++) {
                    this.target.removeChild(this.target.childNodes[count]);
                    count--;
                }
                this.target = undefined;
            }
        };
        return TableOfContentsDialog;
    }());
    exports.TableOfContentsDialog = TableOfContentsDialog;
});
