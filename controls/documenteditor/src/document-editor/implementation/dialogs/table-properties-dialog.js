define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-inputs", "../format/index", "@syncfusion/ej2-buttons", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-navigations", "@syncfusion/ej2-base", "../editor/editor-helper", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_inputs_1, index_1, ej2_buttons_1, ej2_dropdowns_1, ej2_navigations_1, ej2_base_2, editor_helper_1, ej2_inputs_2, ej2_base_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TablePropertiesDialog = (function () {
        function TablePropertiesDialog(documentHelper) {
            var _this = this;
            this.hasTableWidth = false;
            this.hasCellWidth = false;
            this.bidi = false;
            this.isTableBordersAndShadingUpdated = false;
            this.isCellBordersAndShadingUpdated = false;
            this.tabObj = undefined;
            this.localValue = undefined;
            this.isCellOptionsUpdated = false;
            this.isTableOptionsUpdated = false;
            this.onBeforeOpen = function () {
                _this.documentHelper.updateFocus();
                _this.loadTableProperties();
            };
            this.onCloseTablePropertyDialog = function () {
                _this.unWireEvent.bind(_this);
                _this.documentHelper.updateFocus();
            };
            this.applyTableProperties = function () {
                var selection = _this.documentHelper.selection;
                if (selection.tableFormat.title != _this.titleTextBox.value) {
                    if (!ej2_base_1.isNullOrUndefined(_this.titleTextBox.value)) {
                        _this.tableFormat.title = ej2_base_3.SanitizeHtmlHelper.sanitize((_this.titleTextBox).value);
                    }
                }
                if (selection.tableFormat.description != _this.descriptionTextBox.value) {
                    if (!ej2_base_1.isNullOrUndefined(_this.descriptionTextBox.value)) {
                        _this.tableFormat.description = ej2_base_3.SanitizeHtmlHelper.sanitize((_this.descriptionTextBox).value);
                    }
                }
                if (!_this.preferCheckBox.checked && !_this.preferCheckBox.indeterminate) {
                    if (ej2_base_1.isNullOrUndefined(selection.tableFormat.preferredWidth) || selection.tableFormat.preferredWidth !== 0) {
                        _this.tableFormat.preferredWidth = 0;
                        _this.tableFormat.preferredWidthType = 'Point';
                    }
                }
                if (_this.tableFormat.hasValue('tableAlignment') && _this.tableFormat.tableAlignment !== 'Left') {
                    if (ej2_base_1.isNullOrUndefined(selection.tableFormat.leftIndent) || selection.tableFormat.leftIndent !== 0) {
                        _this.tableFormat.leftIndent = 0;
                    }
                }
                if (!_this.rowHeightCheckBox.checked && !_this.rowHeightCheckBox.indeterminate) {
                    if (ej2_base_1.isNullOrUndefined(selection.rowFormat.height) || selection.rowFormat.height !== 0) {
                        _this.rowFormat.heightType = 'AtLeast';
                        _this.rowFormat.height = 0;
                    }
                }
                if (!_this.preferredCellWidthCheckBox.checked && !_this.preferredCellWidthCheckBox.indeterminate) {
                    if (ej2_base_1.isNullOrUndefined(selection.cellFormat.preferredWidth) || selection.cellFormat.preferredWidth !== 0) {
                        _this.cellFormat.preferredWidthType = 'Point';
                        _this.cellFormat.preferredWidth = 0;
                    }
                }
                else {
                    var ownerTable = _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable;
                    var containerWidth = ownerTable.getOwnerWidth(true);
                    var tableWidth = ownerTable.getTableClientWidth(containerWidth);
                    for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                        var rowWidget = ownerTable.childWidgets[parseInt(i.toString(), 10)];
                        for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                            var cellWidget = rowWidget.childWidgets[parseInt(j.toString(), 10)];
                            if (_this.cellFormat.preferredWidthType === 'Percent' && cellWidget.cellFormat.preferredWidthType === 'Point') {
                                cellWidget.cellFormat.preferredWidthType = 'Percent';
                                cellWidget.cellFormat.preferredWidth = cellWidget.cellFormat.preferredWidth / tableWidth * 100;
                            }
                            else if (_this.cellFormat.preferredWidthType === 'Point' && cellWidget.cellFormat.preferredWidthType === 'Percent') {
                                cellWidget.cellFormat.preferredWidthType = 'Point';
                                cellWidget.cellFormat.preferredWidth = cellWidget.cellFormat.cellWidth;
                            }
                        }
                    }
                    if (_this.cellFormat.preferredWidthType === 'Percent') {
                        if (!_this.tableFormat.hasValue('preferredWidth') && !_this.tableFormat.hasValue('preferredWidthType')
                            && _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable.tableFormat.preferredWidth === 0) {
                            var containerWidth_1 = _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable.getOwnerWidth(true);
                            var tableWidth_1 = _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable.getTableClientWidth(containerWidth_1);
                            _this.tableFormat.preferredWidthType = 'Percent';
                            _this.tableFormat.preferredWidth = tableWidth_1 / editor_helper_1.HelperMethods.convertPixelToPoint(_this.documentHelper.owner.viewer.clientArea.width) * 100;
                        }
                    }
                }
                if (_this.rowHeightValue) {
                    if (!_this.rowFormat.hasValue('heightType')
                        && selection.rowFormat.heightType !== _this.rowFormat.heightType) {
                        _this.rowFormat.heightType = selection.rowFormat.heightType;
                    }
                    _this.rowFormat.height = _this.rowHeightValue;
                }
                _this.documentHelper.owner.editorModule.initComplexHistory('TableProperties');
                _this.documentHelper.owner.editorModule.onTableFormat(_this.tableFormat);
                _this.documentHelper.owner.editorModule.onRowFormat(_this.rowFormat);
                _this.documentHelper.owner.editorModule.onCellFormat(_this.cellFormat);
                _this.documentHelper.owner.editorHistory.updateComplexHistory();
                _this.closeTablePropertiesDialog();
                _this.documentHelper.updateFocus();
            };
            this.applyTableSubProperties = function () {
                if (_this.isCellOptionsUpdated) {
                    var cellFormat = _this.documentHelper.owner.cellOptionsDialogModule.cellFormat;
                    _this.documentHelper.owner.cellOptionsDialogModule.applySubCellOptions(cellFormat);
                }
                if (_this.isTableOptionsUpdated) {
                    var tableFormat = _this.documentHelper.owner.tableOptionsDialogModule.tableFormat;
                    _this.documentHelper.owner.tableOptionsDialogModule.applySubTableOptions(tableFormat);
                }
                _this.isCellOptionsUpdated = false;
                _this.isTableOptionsUpdated = false;
            };
            this.unWireEvent = function () {
                _this.preferCheckBox.change = undefined;
                _this.tableWidthBox.change = undefined;
                _this.tableWidthType.change = undefined;
                _this.leftIndentBox.change = undefined;
                _this.rowHeightCheckBox.change = undefined;
                _this.rowHeightBox.change = undefined;
                _this.rowHeightType.change = undefined;
                _this.repeatHeader.change = undefined;
                _this.allowRowBreak.change = undefined;
                _this.preferredCellWidthCheckBox.change = undefined;
                _this.cellWidthBox.change = undefined;
                _this.cellWidthType.change = undefined;
                _this.cellFormat.destroy();
                _this.rowFormat.destroy();
                _this.tableFormat.destroy();
                _this.rowHeightValue = undefined;
                _this.documentHelper.dialog2.open = _this.documentHelper.selection.hideCaret.bind(_this.documentHelper.owner.viewer);
            };
            this.closeTablePropertiesDialog = function () {
                _this.documentHelper.dialog2.hide();
                _this.documentHelper.updateFocus();
            };
            this.changeBidirectional = function (event) {
                if (event.value === 'ltr') {
                    _this.rtlButton.checked = !_this.ltrButton.checked;
                    _this.tableFormat.bidi = false;
                }
                else {
                    _this.ltrButton.checked = !_this.rtlButton.checked;
                    _this.tableFormat.bidi = true;
                }
                if (_this.tableFormat.bidi && _this.tableFormat.tableAlignment === 'Left') {
                    _this.tableFormat.tableAlignment = 'Right';
                }
                else if (!_this.tableFormat.bidi && _this.tableFormat.tableAlignment === 'Right') {
                    _this.tableFormat.tableAlignment = 'Left';
                }
                _this.activeTableAlignment(_this.tableFormat, true);
            };
            this.changeTableCheckBox = function () {
                var enable = (_this.preferCheckBox.checked || _this.preferCheckBox.indeterminate);
                _this.tableWidthBox.enabled = enable;
                _this.tableWidthType.enabled = enable;
                if (enable) {
                    _this.tableFormat.preferredWidthType = (_this.tableWidthType.value === 'Points') ?
                        'Point' : _this.tableWidthType.value;
                }
                else {
                    _this.tableFormat.preferredWidthType = _this.documentHelper.selection.tableFormat.preferredWidthType;
                }
            };
            this.changeTableAlignment = function (event) {
                _this.updateClassForAlignmentProperties(_this.tableTab);
                var element = event.target;
                ej2_base_2.classList(element, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
                var bidi = _this.tableFormat.bidi || _this.rtlButton.checked;
                if ((element.classList.contains('e-de-table-left-alignment') && !bidi) ||
                    (element.classList.contains('e-de-table-right-alignment') && bidi)) {
                    _this.leftIndentBox.enabled = true;
                }
                else {
                    _this.leftIndentBox.enabled = false;
                }
                _this.tableFormat.tableAlignment = _this.getTableAlignment();
            };
            this.changeTableRowCheckBox = function () {
                _this.rowHeightType.enabled = _this.rowHeightCheckBox.checked;
                _this.rowHeightBox.enabled = _this.rowHeightCheckBox.checked;
                if (_this.rowHeightType.enabled) {
                    _this.rowFormat.heightType = _this.rowHeightType.value;
                }
                else {
                    _this.rowFormat.heightType = _this.documentHelper.selection.rowFormat.heightType;
                }
            };
            this.changeTableCellCheckBox = function () {
                _this.cellWidthType.enabled = _this.preferredCellWidthCheckBox.checked;
                _this.cellWidthBox.enabled = _this.preferredCellWidthCheckBox.checked;
            };
            this.changeCellAlignment = function (event) {
                _this.updateClassForCellAlignment(_this.cellTab);
                var element = event.target;
                ej2_base_2.classList(element, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
                _this.cellFormat.verticalAlignment = _this.getCellAlignment();
            };
            this.showTableOptionsDialog = function () {
                _this.documentHelper.owner.tableOptionsDialogModule.show();
                _this.documentHelper.dialog2.element.style.pointerEvents = 'none';
            };
            this.showBordersShadingsPropertiesDialog = function () {
                _this.documentHelper.owner.bordersAndShadingDialogModule.show();
                _this.documentHelper.dialog2.element.style.pointerEvents = 'none';
            };
            this.showCellOptionsDialog = function () {
                _this.documentHelper.owner.cellOptionsDialogModule.show();
                _this.documentHelper.dialog2.element.style.pointerEvents = 'none';
            };
            this.documentHelper = documentHelper;
        }
        Object.defineProperty(TablePropertiesDialog.prototype, "cellFormat", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.cellFormatIn)) {
                    return this.cellFormatIn = new index_1.WCellFormat();
                }
                return this.cellFormatIn;
            },
            set: function (value) {
                this.cellFormatIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TablePropertiesDialog.prototype, "tableFormat", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.tableFormatIn)) {
                    this.tableFormatIn = new index_1.WTableFormat();
                    return this.tableFormatIn;
                }
                return this.tableFormatIn;
            },
            set: function (value) {
                this.tableFormatIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TablePropertiesDialog.prototype, "paraFormat", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.tableFormatIn)) {
                    this.paraFormatIn = new index_1.WParagraphFormat();
                    return this.paraFormatIn;
                }
                return this.paraFormatIn;
            },
            set: function (value) {
                this.paraFormatIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TablePropertiesDialog.prototype, "rowFormat", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.rowFormatInternal)) {
                    this.rowFormatInternal = new index_1.WRowFormat();
                    return this.rowFormatInternal;
                }
                return this.rowFormatInternal;
            },
            enumerable: true,
            configurable: true
        });
        TablePropertiesDialog.prototype.getModuleName = function () {
            return 'TablePropertiesDialog';
        };
        TablePropertiesDialog.prototype.initTablePropertyDialog = function (localValue, isRtl) {
            this.localValue = localValue;
            var id = this.documentHelper.owner.containerId + '_TablePropertiesDialog';
            this.target = ej2_base_1.createElement('div', { id: id, className: 'e-de-table-properties-dlg' });
            var ejtabContainer = ej2_base_1.createElement('div', { id: this.target.id + '_TabContainer' });
            this.target.appendChild(ejtabContainer);
            this.tableTab = ej2_base_1.createElement('div', {
                id: this.target.id + '_TablePropertiesContentDialogTab', className: 'e-de-table-ppty-dlg-tabs'
            });
            this.rowTab = ej2_base_1.createElement('div', {
                id: this.target.id + '_RowPropertiesDialogTab', className: 'e-de-table-ppty-dlg-tabs'
            });
            this.cellTab = ej2_base_1.createElement('div', {
                id: this.target.id + '_CellPropertiesDialogTab', className: 'e-de-table-ppty-dlg-tabs'
            });
            this.altTab = ej2_base_1.createElement('div', {
                id: this.target.id + '_AltPropertiesDialogTab', className: 'e-de-table-ppty-dlg-tabs'
            });
            var separatorLine = ej2_base_1.createElement('div', { className: 'e-de-table-dialog-separator-line' });
            var ejtab = ej2_base_1.createElement('div', { id: this.target.id + '_TablePropertiesDialogTab', className: 'e-de-table-ppty-tab' });
            var headerContainer = ej2_base_1.createElement('div', { className: 'e-tab-header' });
            var tableHeader = ej2_base_1.createElement('div', {
                id: this.target.id + '_tableHeader', innerHTML: localValue.getConstant('Table')
            });
            var rowHeader = ej2_base_1.createElement('div', {
                id: this.target.id + '_rowHeader', innerHTML: localValue.getConstant('Row')
            });
            var cellHeader = ej2_base_1.createElement('div', {
                id: this.target.id + '_cellHeader', innerHTML: localValue.getConstant('Cell')
            });
            var altHeader = ej2_base_1.createElement('div', {
                id: this.target.id + '_altHeader', innerHTML: localValue.getConstant('Alt Text')
            });
            headerContainer.appendChild(tableHeader);
            headerContainer.appendChild(rowHeader);
            headerContainer.appendChild(cellHeader);
            headerContainer.appendChild(altHeader);
            var tableContent = ej2_base_1.createElement('div', { id: this.target.id + '_tableContent' });
            var rowContent = ej2_base_1.createElement('div', { id: this.target.id + '_rowContent' });
            var cellContent = ej2_base_1.createElement('div', { id: this.target.id + '_cellContent' });
            var altContent = ej2_base_1.createElement('div', { id: this.target.id + '_altContent' });
            var items = [
                { header: { text: tableHeader }, content: tableContent },
                { header: { text: rowHeader }, content: rowContent },
                { header: { text: cellHeader }, content: cellContent },
                { header: { text: altHeader }, content: altContent }
            ];
            tableContent.appendChild(this.tableTab);
            rowContent.appendChild(this.rowTab);
            cellContent.appendChild(this.cellTab);
            altContent.appendChild(this.altTab);
            ejtabContainer.appendChild(ejtab);
            this.initTableProperties(this.tableTab, localValue, this.documentHelper.owner.enableRtl);
            this.initTableRowProperties(this.rowTab, localValue, this.documentHelper.owner.enableRtl);
            this.initTableCellProperties(this.cellTab, localValue, this.documentHelper.owner.enableRtl);
            this.initTableAltProperties(this.altTab, localValue, this.documentHelper.owner.enableRtl);
            this.tabObj = new ej2_navigations_1.Tab({ items: items, enableRtl: isRtl }, ejtab);
            this.tabObj.isStringTemplate = true;
            this.target.appendChild(separatorLine);
            var alignMentButtons = this.tableTab.getElementsByClassName(this.tableTab.id + 'e-de-table-alignment');
            for (var i = 0; i < alignMentButtons.length; i++) {
                alignMentButtons[parseInt(i.toString(), 10)].addEventListener('click', this.changeTableAlignment);
            }
            var cellAlignment = this.cellTab.getElementsByClassName(this.cellTab.id + 'e-de-table-cell-alignment');
            for (var i = 0; i < cellAlignment.length; i++) {
                cellAlignment[parseInt(i.toString(), 10)].addEventListener('click', this.changeCellAlignment);
            }
        };
        TablePropertiesDialog.prototype.show = function () {
            var localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localValue.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.initTablePropertyDialog(localValue, this.documentHelper.owner.enableRtl);
            }
            if (this.documentHelper.selection.caret.style.display !== 'none') {
                this.documentHelper.selection.caret.style.display = 'none';
            }
            this.documentHelper.dialog2.header = localValue.getConstant('Table Properties');
            this.documentHelper.dialog2.position = { X: 'center', Y: 'center' };
            this.documentHelper.dialog2.animationSettings = { effect: 'None', duration: 400, delay: 0 };
            this.documentHelper.dialog2.width = 'auto';
            this.documentHelper.dialog2.height = 'auto';
            this.documentHelper.dialog2.content = this.target;
            this.documentHelper.dialog2.beforeOpen = this.onBeforeOpen;
            this.documentHelper.dialog2.close = this.onCloseTablePropertyDialog;
            this.documentHelper.dialog2.open = this.wireEvent.bind(this);
            this.documentHelper.dialog2.buttons = [{
                    click: this.applyTableProperties,
                    buttonModel: { content: localValue.getConstant('Ok'), cssClass: 'e-flat e-table-ppty-okay', isPrimary: true }
                },
                {
                    click: this.closeTablePropertiesDialog,
                    buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-table-ppty-cancel' }
                }];
            this.documentHelper.dialog2.dataBind();
            this.documentHelper.dialog2.show();
            var dialogElement = this.documentHelper.dialog2.element;
            if (dialogElement) {
                this.documentHelper.updateDialogTabHeight(dialogElement, this.target);
            }
        };
        TablePropertiesDialog.prototype.calculateGridValue = function (table) {
            table.isGridUpdated = false;
            table.buildTableColumns();
            table.isGridUpdated = true;
            this.documentHelper.selection.owner.isLayoutEnabled = true;
            this.documentHelper.layout.reLayoutTable(table);
            this.documentHelper.owner.editorModule.reLayout(this.documentHelper.selection);
            this.documentHelper.owner.editorModule.updateSelectionTextPosition(true);
            var history = this.documentHelper.owner.editorHistory;
            if (history && history.currentBaseHistoryInfo) {
                if (history.currentBaseHistoryInfo.modifiedProperties.length > 0) {
                    history.currentBaseHistoryInfo.updateSelection();
                }
                history.updateHistory();
            }
            this.documentHelper.owner.editorModule.fireContentChange();
        };
        TablePropertiesDialog.prototype.loadTableProperties = function () {
            this.setTableProperties();
            this.setTableRowProperties();
            this.setTableCellProperties();
            this.setTableAltProperties();
            if (!this.documentHelper.owner.bordersAndShadingDialogModule) {
                this.bordersAndShadingButton.disabled = true;
            }
            else {
                this.bordersAndShadingButton.disabled = false;
            }
            this.tableOptionButton.disabled = false;
            this.cellOptionButton.disabled = false;
        };
        TablePropertiesDialog.prototype.wireEvent = function () {
            this.documentHelper.selection.hideCaret();
            this.preferCheckBox.change = this.changeTableCheckBox.bind(this);
            this.tableWidthBox.change = this.onTableWidthChange.bind(this);
            this.tableWidthType.change = this.onTableWidthTypeChange.bind(this);
            this.leftIndentBox.change = this.onLeftIndentChange.bind(this);
            this.rowHeightCheckBox.change = this.changeTableRowCheckBox.bind(this);
            this.rowHeightBox.change = this.onRowHeightChange.bind(this);
            this.rowHeightType.change = this.onRowHeightTypeChange.bind(this);
            this.allowRowBreak.change = this.onAllowBreakAcrossPage.bind(this);
            this.repeatHeader.change = this.onRepeatHeader.bind(this);
            this.preferredCellWidthCheckBox.change = this.changeTableCellCheckBox.bind(this);
            this.cellWidthBox.change = this.onCellWidthChange.bind(this);
            this.cellWidthType.change = this.onCellWidthTypeChange.bind(this);
        };
        TablePropertiesDialog.prototype.initTableProperties = function (element, localValue, isRtl) {
            var container = ej2_base_1.createElement('div', { className: 'e-de-table-dialog-size-label' });
            var sizeHeader = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Size'),
                className: 'e-de-para-dlg-heading'
            });
            var childContainer1 = ej2_base_1.createElement('div', {
                className: 'e-de-table-ppty-options-break'
            });
            var preferCheckBox = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }
            });
            var childContainer2 = ej2_base_1.createElement('div', {
                className: 'e-de-container-row'
            });
            var preferredWidthDiv = ej2_base_1.createElement('div', {
                className: 'e-de-subcontainer-left e-de-table-dialog-row-height'
            });
            this.preferredWidth = ej2_base_1.createElement('input');
            var controlDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            var tableWidthType = ej2_base_1.createElement('select', {
                innerHTML: '<option value="Points">' + localValue.getConstant('Points') +
                    '</option><option value="Percent">' + localValue.getConstant('Percent') + '</option>'
            });
            var alignment = ej2_base_1.createElement('div', { className: 'e-de-dlg-row' });
            var alignmentContainer = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-left' });
            var alignmentHeader = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Alignment'), className: 'e-de-table-dlg-alignment-heading'
            });
            var alignmentSubContainer = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var classDivName = element.id + 'e-de-table-alignment e-de-table-dialog-alignment-icon';
            var leftDiv = ej2_base_1.createElement('div');
            var leftAlignDiv = ej2_base_1.createElement('div', { className: 'e-de-table-dia-align-div' });
            this.left = ej2_base_1.createElement('div', {
                className: 'e-icons e-de-table-properties-alignment e-de-table-left-alignment ' + classDivName,
                id: element.id + '_left_alignment'
            });
            leftAlignDiv.appendChild(this.left);
            leftAlignDiv.setAttribute('aria-label', localValue.getConstant('Left'));
            var centerAlignDiv = ej2_base_1.createElement('div', { className: 'e-de-table-dia-align-div' });
            this.center = ej2_base_1.createElement('div', {
                className: 'e-icons e-de-table-properties-alignment  e-de-table-center-alignment ' + classDivName,
                id: element.id + '_center_alignment'
            });
            centerAlignDiv.appendChild(this.center);
            centerAlignDiv.setAttribute('aria-label', localValue.getConstant('Center'));
            this.right = ej2_base_1.createElement('div', {
                className: 'e-icons e-de-table-properties-alignment  e-de-table-right-alignment ' + classDivName,
                id: element.id + '_right_alignment'
            });
            var rightAlignDiv = ej2_base_1.createElement('div', { className: 'e-de-table-dia-align-div' });
            rightAlignDiv.appendChild(this.right);
            rightAlignDiv.setAttribute('aria-label', localValue.getConstant('Right'));
            var leftlabel = ej2_base_1.createElement('label', {
                innerHTML: localValue.getConstant('Left'), className: 'e-de-table-dia-align-label'
            });
            var centerlabel = ej2_base_1.createElement('label', {
                innerHTML: localValue.getConstant('Center'), className: 'e-de-table-dia-align-label'
            });
            var rightlabel = ej2_base_1.createElement('label', {
                innerHTML: localValue.getConstant('Right'), className: 'e-de-table-dia-align-label'
            });
            var leftIndenetContainer = ej2_base_1.createElement('div', {
                className: 'e-de-subcontainer-right'
            });
            this.leftIndent = ej2_base_1.createElement('input');
            var tableDirHeader = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Table direction'), className: 'e-de-para-dlg-heading'
            });
            var tableDirContainer = ej2_base_1.createElement('div', { className: 'e-de-dlg-row' });
            var rtlDiv = ej2_base_1.createElement('div', { className: 'e-de-tbl-rtl-btn-div' });
            var rtlInputELe = ej2_base_1.createElement('input');
            rtlDiv.appendChild(rtlInputELe);
            tableDirContainer.appendChild(rtlDiv);
            var ltrDiv = ej2_base_1.createElement('div', { className: 'e-de-tbl-ltr-btn-div' });
            var ltrInputELe = ej2_base_1.createElement('input');
            ltrDiv.appendChild(ltrInputELe);
            tableDirContainer.appendChild(ltrDiv);
            this.rtlButton = new ej2_buttons_1.RadioButton({
                label: localValue.getConstant('Right-to-left'),
                value: 'rtl', cssClass: 'e-small', change: this.changeBidirectional,
                enableRtl: isRtl
            });
            this.rtlButton.appendTo(rtlInputELe);
            rtlInputELe.setAttribute('aria-label', localValue.getConstant('Right-to-left'));
            this.ltrButton = new ej2_buttons_1.RadioButton({
                label: localValue.getConstant('Left-to-right'),
                value: 'ltr', cssClass: 'e-small', change: this.changeBidirectional,
                enableRtl: isRtl
            });
            this.ltrButton.appendTo(ltrInputELe);
            ltrInputELe.setAttribute('aria-label', localValue.getConstant('Left-to-right'));
            var tableOptionContiner = ej2_base_1.createElement('div', {
                className: 'e-de-tbl-dlg-border-btn'
            });
            this.bordersAndShadingButton = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('Borders and Shading') + '...',
                className: 'e-control e-btn e-de-ok-button',
                attrs: { type: 'button' }
            });
            this.tableOptionButton = ej2_base_1.createElement('button', {
                className: 'e-control e-btn', innerHTML: localValue.getConstant('Options') + '...',
                attrs: { type: 'button' }
            });
            this.tableOptionButton.addEventListener('click', this.showTableOptionsDialog);
            this.bordersAndShadingButton.addEventListener('click', this.showBordersShadingsPropertiesDialog);
            tableOptionContiner.appendChild(this.bordersAndShadingButton);
            tableOptionContiner.appendChild(this.tableOptionButton);
            leftIndenetContainer.appendChild(this.leftIndent);
            alignmentSubContainer.appendChild(leftDiv);
            alignmentContainer.appendChild(alignmentHeader);
            leftDiv.appendChild(leftAlignDiv);
            alignmentContainer.appendChild(alignmentSubContainer);
            alignmentSubContainer.appendChild(centerAlignDiv);
            alignmentSubContainer.appendChild(rightAlignDiv);
            leftAlignDiv.appendChild(leftlabel);
            centerAlignDiv.appendChild(centerlabel);
            rightAlignDiv.appendChild(rightlabel);
            alignment.appendChild(alignmentContainer);
            container.appendChild(sizeHeader);
            element.appendChild(container);
            childContainer1.appendChild(preferCheckBox);
            container.appendChild(childContainer1);
            preferredWidthDiv.appendChild(this.preferredWidth);
            container.appendChild(childContainer2);
            controlDiv.appendChild(tableWidthType);
            alignment.appendChild(leftIndenetContainer);
            childContainer2.appendChild(preferredWidthDiv);
            childContainer2.appendChild(controlDiv);
            element.appendChild(alignment);
            element.appendChild(tableDirHeader);
            element.appendChild(tableDirContainer);
            element.appendChild(tableOptionContiner);
            this.tableWidthBox = new ej2_inputs_1.NumericTextBox({
                value: 0, decimals: 2, min: 0, max: 1584, enablePersistence: false
            });
            this.tableWidthBox.appendTo(this.preferredWidth);
            this.leftIndentBox = new ej2_inputs_1.NumericTextBox({
                value: 0, decimals: 2, min: -1584, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: localValue.getConstant('Indent from left')
            });
            this.leftIndentBox.appendTo(this.leftIndent);
            this.preferCheckBox = new ej2_buttons_1.CheckBox({
                label: localValue.getConstant('Preferred Width'), enableRtl: isRtl
            });
            this.preferCheckBox.appendTo(preferCheckBox);
            preferCheckBox.setAttribute('aria-label', localValue.getConstant('Preferred Width'));
            this.leftIndent.setAttribute('aria-labelledby', localValue.getConstant('Indent from left'));
            this.tableWidthType = new ej2_dropdowns_1.DropDownList({ enableRtl: isRtl, floatLabelType: 'Always', placeholder: localValue.getConstant('Measure in'), htmlAttributes: { 'aria-labelledby': localValue.getConstant('Measure in') } });
            this.tableWidthType.appendTo(tableWidthType);
            if (isRtl) {
                rtlDiv.classList.add('e-de-rtl');
                leftIndenetContainer.classList.add('e-de-rtl');
                tableOptionContiner.classList.add('e-de-rtl');
                leftAlignDiv.classList.add('e-de-rtl');
                centerAlignDiv.classList.add('e-de-rtl');
                rightAlignDiv.classList.add('e-de-rtl');
            }
        };
        TablePropertiesDialog.prototype.onTableWidthChange = function () {
            this.tableFormat.preferredWidth = this.tableWidthBox.value;
        };
        TablePropertiesDialog.prototype.onTableWidthTypeChange = function () {
            var value;
            var width = editor_helper_1.HelperMethods.convertPixelToPoint(this.documentHelper.owner.viewer.clientArea.width);
            if (this.tableWidthType.text === 'Percent' && this.documentHelper.selection.tableFormat.preferredWidthType !== 'Percent') {
                value = this.tableWidthBox.value / width * 100;
                this.formatNumericTextBox(this.tableWidthBox, 'Percent', value);
            }
            else if (this.tableWidthType.text === 'Points' && this.documentHelper.selection.tableFormat.preferredWidthType !== 'Point') {
                value = width / 100 * this.tableWidthBox.value;
                this.formatNumericTextBox(this.tableWidthBox, 'Point', value);
            }
            else {
                if (this.tableWidthBox.format === '#\'%\'') {
                    if (this.tableWidthType.text === 'Points') {
                        value = width / 100 * this.tableWidthBox.value;
                    }
                    else {
                        value = this.tableWidthBox.value;
                    }
                }
                else {
                    if (this.tableWidthType.text === 'Percent') {
                        value = this.tableWidthBox.value / width * 100;
                    }
                    else {
                        value = this.tableWidthBox.value;
                    }
                }
                this.formatNumericTextBox(this.tableWidthBox, (this.tableWidthType.text === 'Points') ? 'Point' : this.tableWidthType.text, value);
            }
            this.tableFormat.preferredWidthType = (this.tableWidthType.text === 'Points') ? 'Point' : this.tableWidthType.text;
        };
        TablePropertiesDialog.prototype.onLeftIndentChange = function () {
            this.tableFormat.leftIndent = this.leftIndentBox.value;
        };
        TablePropertiesDialog.prototype.setTableAltProperties = function () {
            var tableFormat = this.documentHelper.selection.tableFormat;
            if (ej2_base_1.isNullOrUndefined(tableFormat.title)) {
                this.titleTextBox.value = "";
            }
            else {
                this.titleTextBox.value = tableFormat.title;
            }
            if (ej2_base_1.isNullOrUndefined(tableFormat.description)) {
                this.descriptionTextBox.value = "";
            }
            else {
                this.descriptionTextBox.value = tableFormat.description;
            }
        };
        TablePropertiesDialog.prototype.setTableProperties = function () {
            var tableFormat = this.documentHelper.selection.tableFormat;
            var tableHasWidth = tableFormat.preferredWidth > 0;
            var preferredWidth = tableFormat.preferredWidth;
            if (ej2_base_1.isNullOrUndefined(tableFormat.preferredWidth)) {
                this.preferCheckBox.indeterminate = true;
                var startTable = this.documentHelper.selection.start.paragraph.associatedCell.ownerTable;
                var table = startTable.combineWidget(this.documentHelper.owner.viewer);
                preferredWidth = table.tableFormat.preferredWidth;
            }
            else {
                this.preferCheckBox.checked = tableHasWidth;
            }
            this.tableWidthBox.enabled = tableHasWidth;
            this.tableWidthType.enabled = tableHasWidth;
            this.formatNumericTextBox(this.tableWidthBox, tableFormat.preferredWidthType, preferredWidth);
            if (tableFormat.preferredWidthType === 'Auto' || tableFormat.preferredWidthType === 'Point') {
                this.tableWidthType.index = 0;
            }
            else {
                this.tableWidthType.index = 1;
            }
            this.activeTableAlignment(tableFormat, false);
            if (tableFormat.bidi) {
                this.rtlButton.checked = true;
                this.ltrButton.checked = false;
            }
            else {
                this.ltrButton.checked = true;
                this.rtlButton.checked = false;
            }
        };
        TablePropertiesDialog.prototype.activeTableAlignment = function (tableFormat, isChanged) {
            var tableAlignment = isChanged ? this.tableFormat.tableAlignment : undefined;
            if (ej2_base_1.isNullOrUndefined(tableAlignment)) {
                if (tableFormat.bidi) {
                    if (tableFormat.tableAlignment === 'Left') {
                        tableAlignment = 'Right';
                    }
                    else if (tableFormat.tableAlignment === 'Right') {
                        tableAlignment = 'Left';
                    }
                }
                else {
                    tableAlignment = tableFormat.tableAlignment;
                }
            }
            if (tableFormat.bidi) {
                this.leftIndentBox.enabled = tableAlignment === 'Right';
                this.leftIndentBox.placeholder = this.localValue.getConstant('Indent from right');
            }
            else {
                this.leftIndentBox.enabled = tableAlignment === 'Left';
                this.leftIndentBox.placeholder = this.localValue.getConstant('Indent from left');
            }
            this.leftIndentBox.value = tableFormat.leftIndent;
            ej2_base_2.classList(this.left, [], ['e-de-table-alignment-active']);
            ej2_base_2.classList(this.right, [], ['e-de-table-alignment-active']);
            ej2_base_2.classList(this.center, [], ['e-de-table-alignment-active']);
            if (tableAlignment === 'Left') {
                ej2_base_2.classList(this.left, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
            }
            else if (tableAlignment === 'Center') {
                ej2_base_2.classList(this.center, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
            }
            else if (tableAlignment === 'Right') {
                ej2_base_2.classList(this.right, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
            }
        };
        TablePropertiesDialog.prototype.getTableAlignment = function () {
            var id = this.tableTab.id;
            var groupButtons = this.tableTab.getElementsByClassName(id + 'e-de-table-alignment');
            for (var j = 0; j < groupButtons.length; j++) {
                var groupButton = groupButtons[parseInt(j.toString(), 10)];
                if (groupButton.classList.contains('e-de-table-alignment-active')) {
                    if (j === 0) {
                        return this.ltrButton.checked ? 'Left' : 'Right';
                    }
                    else if (j === 1) {
                        return 'Center';
                    }
                    else {
                        return this.ltrButton.checked ? 'Right' : 'Left';
                    }
                }
            }
            return undefined;
        };
        TablePropertiesDialog.prototype.updateClassForAlignmentProperties = function (element) {
            var id = element.id;
            var groupButtons = element.getElementsByClassName(id + 'e-de-table-alignment');
            for (var j = 0; j < groupButtons.length; j++) {
                var groupButton = groupButtons[parseInt(j.toString(), 10)];
                if (groupButton.classList.contains('e-de-table-alignment-active')) {
                    ej2_base_2.classList(groupButton, ['e-de-table-properties-alignment'], ['e-de-table-alignment-active']);
                }
            }
        };
        TablePropertiesDialog.prototype.initTableRowProperties = function (element, localValue, isRtl) {
            var sizeDiv = ej2_base_1.createElement('div', { className: 'e-de-table-dialog-size-label' });
            var sizeLabeldiv = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Size'),
                className: 'e-de-para-dlg-heading'
            });
            var childDiv1 = ej2_base_1.createElement('div', {
                className: 'e-de-table-ppty-options-break'
            });
            var rowHeightCheckBox = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }
            });
            var childdiv2 = ej2_base_1.createElement('div', {
                className: 'e-de-container-row'
            });
            var rowHeightDiv = ej2_base_1.createElement('div', {
                className: 'e-de-subcontainer-left e-de-table-dialog-row-height'
            });
            this.rowHeight = ej2_base_1.createElement('input', {
                attrs: { 'type': 'text' }
            });
            var controlDiv = ej2_base_1.createElement('div', { className: 'e-de-subcontainer-right' });
            var rowHeightType = ej2_base_1.createElement('select', {
                innerHTML: '<option value="AtLeast">' + localValue.getConstant('At least')
                    + '</option><option value="Exactly">' + localValue.getConstant('Exactly') + '</option>'
            });
            sizeDiv.appendChild(sizeLabeldiv);
            element.appendChild(sizeDiv);
            childDiv1.appendChild(rowHeightCheckBox);
            sizeDiv.appendChild(childDiv1);
            childdiv2.appendChild(rowHeightDiv);
            sizeDiv.appendChild(childdiv2);
            rowHeightDiv.appendChild(this.rowHeight);
            controlDiv.appendChild(rowHeightType);
            childdiv2.appendChild(controlDiv);
            var alignmentDiv = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Options') + '...',
                className: 'e-de-para-dlg-heading'
            });
            var allowRowContainer = ej2_base_1.createElement('div', { className: 'e-de-table-ppty-options-break' });
            var repeatHeaderContaniner = ej2_base_1.createElement('div', { className: 'e-de-table-ppty-options-header-row' });
            var allowRowBreak = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }
            });
            var repeatHeader = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }
            });
            allowRowContainer.appendChild(allowRowBreak);
            repeatHeaderContaniner.appendChild(repeatHeader);
            element.appendChild(alignmentDiv);
            element.appendChild(allowRowContainer);
            element.appendChild(repeatHeaderContaniner);
            this.rowHeightBox = new ej2_inputs_1.NumericTextBox({
                value: 0, decimals: 2, min: 0, max: 1584, enablePersistence: false
            });
            this.rowHeightBox.appendTo(this.rowHeight);
            this.rowHeightCheckBox = new ej2_buttons_1.CheckBox({
                label: localValue.getConstant('Specify height'),
                enableRtl: isRtl
            });
            this.rowHeightCheckBox.appendTo(rowHeightCheckBox);
            rowHeightCheckBox.setAttribute('aria-label', localValue.getConstant('Specify height'));
            this.rowHeightType = new ej2_dropdowns_1.DropDownList({ enableRtl: isRtl, floatLabelType: 'Always', placeholder: localValue.getConstant('Row height is'), htmlAttributes: { 'aria-labelledby': localValue.getConstant('Row height is') } });
            this.rowHeightType.appendTo(rowHeightType);
            this.allowRowBreak = new ej2_buttons_1.CheckBox({
                label: localValue.getConstant('Allow row to break across pages'),
                enableRtl: isRtl
            });
            this.allowRowBreak.appendTo(allowRowBreak);
            allowRowBreak.setAttribute('aria-label', localValue.getConstant('Allow row to break across pages'));
            this.repeatHeader = new ej2_buttons_1.CheckBox({
                label: localValue.getConstant('Repeat as header row at the top of each page'),
                enableRtl: isRtl
            });
            this.repeatHeader.appendTo(repeatHeader);
            repeatHeader.setAttribute('aria-label', localValue.getConstant('Repeat as header row at the top of each page'));
        };
        TablePropertiesDialog.prototype.setTableRowProperties = function () {
            var rowFormat = this.documentHelper.selection.rowFormat;
            var enableRowHeight = (rowFormat.height > 0 || rowFormat.heightType === 'Exactly');
            if (enableRowHeight) {
                this.rowHeightCheckBox.checked = true;
            }
            else {
                if (rowFormat.heightType === undefined) {
                    this.rowHeightCheckBox.indeterminate = true;
                    enableRowHeight = true;
                }
                else {
                    this.rowHeightCheckBox.checked = false;
                }
            }
            this.rowHeightBox.enabled = enableRowHeight;
            this.rowHeightType.enabled = enableRowHeight;
            var enabledHeader = this.enableRepeatHeader() ? false : true;
            if (ej2_base_1.isNullOrUndefined(this.documentHelper.selection.rowFormat.isHeader)) {
                this.repeatHeader.indeterminate = true;
                this.repeatHeader.disabled = true;
            }
            else if (this.documentHelper.selection.rowFormat.isHeader) {
                this.repeatHeader.checked = !enabledHeader;
                this.repeatHeader.indeterminate = enabledHeader;
                this.repeatHeader.disabled = enabledHeader;
            }
            else {
                this.repeatHeader.checked = false;
                this.repeatHeader.indeterminate = false;
                this.repeatHeader.disabled = enabledHeader;
            }
            if (ej2_base_1.isNullOrUndefined(rowFormat.allowBreakAcrossPages)) {
                this.allowRowBreak.indeterminate = true;
            }
            else {
                this.allowRowBreak.checked = rowFormat.allowBreakAcrossPages;
            }
            this.rowHeightBox.value = rowFormat.height;
            if (rowFormat.heightType === 'Auto' || rowFormat.heightType === 'AtLeast') {
                this.rowHeightType.index = 0;
            }
            else {
                this.rowHeightType.index = 1;
            }
        };
        TablePropertiesDialog.prototype.onRowHeightChange = function () {
            this.rowHeightValue = this.rowHeightBox.value;
        };
        TablePropertiesDialog.prototype.onRowHeightTypeChange = function () {
            this.rowFormat.heightType = this.rowHeightType.text;
        };
        TablePropertiesDialog.prototype.onAllowBreakAcrossPage = function () {
            this.rowFormat.allowBreakAcrossPages = this.allowRowBreak.checked;
        };
        TablePropertiesDialog.prototype.onRepeatHeader = function () {
            this.rowFormat.isHeader = this.repeatHeader.checked;
        };
        TablePropertiesDialog.prototype.enableRepeatHeader = function () {
            var selection = this.documentHelper.selection;
            var start = selection.start;
            var end = selection.end;
            if (!selection.isForward) {
                start = selection.end;
                end = selection.start;
            }
            var startCell = start.paragraph.associatedCell;
            var endCell = end.paragraph.associatedCell;
            return startCell.ownerRow.index === 0 && endCell.ownerTable.equals(startCell.ownerTable);
        };
        TablePropertiesDialog.prototype.initTableAltProperties = function (element, localValue, isRtl) {
            var altDiv = ej2_base_1.createElement('div', { className: 'e-de-table-dialog-size-label' });
            element.appendChild(altDiv);
            var titleDiv = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Title'), className: 'e-de-para-dlg-heading',
            });
            altDiv.appendChild(titleDiv);
            var childdiv1 = ej2_base_1.createElement('div', {
                className: 'e-de-table-ppty-options-break'
            });
            var titleTextBox1 = ej2_base_1.createElement('input', {});
            this.titleTextBox = new ej2_inputs_2.TextBox({
                floatLabelType: 'Never'
            });
            altDiv.appendChild(childdiv1);
            childdiv1.appendChild(titleTextBox1);
            this.titleTextBox.appendTo(titleTextBox1);
            var descriptionDiv = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Description'), className: 'e-de-para-dlg-heading',
            });
            altDiv.appendChild(descriptionDiv);
            var childdiv2 = ej2_base_1.createElement('div', {
                className: 'e-de-table-ppty-options-break'
            });
            var descriptionText = ej2_base_1.createElement('textarea', {});
            this.descriptionTextBox = new ej2_inputs_2.TextBox({
                floatLabelType: 'Never'
            });
            childdiv2.appendChild(descriptionText);
            this.descriptionTextBox.appendTo(descriptionText);
            altDiv.appendChild(childdiv2);
        };
        ;
        TablePropertiesDialog.prototype.initTableCellProperties = function (element, localValue, isRtl) {
            var sizeDiv = ej2_base_1.createElement('div', { className: 'e-de-table-dialog-size-label' });
            var div = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Size'), className: 'e-de-para-dlg-heading',
            });
            var childdiv1 = ej2_base_1.createElement('div', {
                className: 'e-de-table-ppty-options-break'
            });
            var preferredCellWidthCheckBox = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }
            });
            var childdiv2 = ej2_base_1.createElement('div', {
                className: 'e-de-container-row'
            });
            var preferredCellDiv = ej2_base_1.createElement('div', {
                className: 'e-de-subcontainer-left e-de-table-dialog-row-height'
            });
            this.preferredCellWidth = ej2_base_1.createElement('input', {
                attrs: { 'type': 'text' }
            });
            var controlDiv = ej2_base_1.createElement('div', {
                className: 'e-de-subcontainer-right'
            });
            var cellWidthType = ej2_base_1.createElement('select', {
                innerHTML: '<option value="Points">' + localValue.getConstant('Points') + '</option><option value="Percent">' +
                    localValue.getConstant('Percent') + '</option>'
            });
            sizeDiv.appendChild(div);
            element.appendChild(sizeDiv);
            childdiv1.appendChild(preferredCellWidthCheckBox);
            preferredCellWidthCheckBox.setAttribute('aria-label', localValue.getConstant('Preferred Width'));
            sizeDiv.appendChild(childdiv1);
            preferredCellDiv.appendChild(this.preferredCellWidth);
            sizeDiv.appendChild(childdiv2);
            childdiv2.appendChild(preferredCellDiv);
            childdiv2.appendChild(controlDiv);
            controlDiv.appendChild(cellWidthType);
            var alignmentDiv = ej2_base_1.createElement('div', {
                innerHTML: localValue.getConstant('Vertical alignment'),
                className: 'e-de-para-dlg-heading'
            });
            var classDivName = element.id + 'e-de-table-cell-alignment e-de-tablecell-dialog-alignment-icon';
            var divAlignment = ej2_base_1.createElement('div', {
                className: 'e-de-container-row'
            });
            var topDiv = ej2_base_1.createElement('div');
            var topAlignDiv = ej2_base_1.createElement('div', { className: 'e-de-tablecell-dia-align-div' });
            this.cellTopAlign = ej2_base_1.createElement('div', {
                id: element.id + '_cell_top-alignment',
                className: 'e-icons e-de-tablecell-alignment  e-de-tablecell-top-alignment ' + classDivName
            });
            topAlignDiv.appendChild(this.cellTopAlign);
            topAlignDiv.setAttribute('aria-label', localValue.getConstant('Top'));
            var centerAlignDiv = ej2_base_1.createElement('div', { className: 'e-de-tablecell-dia-align-div' });
            this.cellCenterAlign = ej2_base_1.createElement('div', {
                id: element.id + '_cell_center-alignment',
                className: 'e-icons e-de-tablecell-alignment  e-de-tablecell-center-alignment ' + classDivName
            });
            centerAlignDiv.appendChild(this.cellCenterAlign);
            centerAlignDiv.setAttribute('aria-label', localValue.getConstant('Center'));
            var bottomAlignDiv = ej2_base_1.createElement('div', { className: 'e-de-tablecell-dia-align-div' });
            this.cellBottomAlign = ej2_base_1.createElement('div', {
                id: element.id + '_cell_bottom-alignment',
                className: 'e-icons e-de-tablecell-alignment e-de-tablecell-bottom-alignment  ' + classDivName
            });
            bottomAlignDiv.appendChild(this.cellBottomAlign);
            bottomAlignDiv.setAttribute('aria-label', localValue.getConstant('Bottom'));
            var topLabel = ej2_base_1.createElement('label', {
                innerHTML: localValue.getConstant('Top'), className: 'e-de-table-dia-align-label'
            });
            var centerLabel = ej2_base_1.createElement('label', {
                innerHTML: localValue.getConstant('Center'), className: 'e-de-table-dia-align-label'
            });
            var bottomLabel = ej2_base_1.createElement('label', {
                innerHTML: localValue.getConstant('Bottom'), className: 'e-de-table-dia-align-label'
            });
            this.cellOptionButton = ej2_base_1.createElement('button', {
                innerHTML: localValue.getConstant('Options') + '...',
                className: 'e-control e-btn', attrs: { type: 'button' }
            });
            this.cellOptionButton.style.cssFloat = isRtl ? 'left' : 'right';
            divAlignment.appendChild(topDiv);
            topDiv.appendChild(topAlignDiv);
            divAlignment.appendChild(centerAlignDiv);
            divAlignment.appendChild(bottomAlignDiv);
            topAlignDiv.appendChild(topLabel);
            centerAlignDiv.appendChild(centerLabel);
            bottomAlignDiv.appendChild(bottomLabel);
            element.appendChild(alignmentDiv);
            element.appendChild(divAlignment);
            element.appendChild(this.cellOptionButton);
            this.cellOptionButton.addEventListener('click', this.showCellOptionsDialog);
            this.cellWidthBox = new ej2_inputs_1.NumericTextBox({
                value: 0, decimals: 2, min: 0, max: 1584, enablePersistence: false
            });
            this.cellWidthBox.appendTo(this.preferredCellWidth);
            this.preferredCellWidthCheckBox = new ej2_buttons_1.CheckBox({ label: localValue.getConstant('Preferred Width'), enableRtl: isRtl });
            this.preferredCellWidthCheckBox.appendTo(preferredCellWidthCheckBox);
            preferredCellWidthCheckBox.setAttribute('aria-label', localValue.getConstant('Preferred Width'));
            this.cellWidthType = new ej2_dropdowns_1.DropDownList({ enableRtl: isRtl, floatLabelType: 'Always', placeholder: localValue.getConstant('Measure in'), htmlAttributes: { 'aria-labelledby': localValue.getConstant('Measure in') } });
            this.cellWidthType.appendTo(cellWidthType);
        };
        TablePropertiesDialog.prototype.setTableCellProperties = function () {
            var cellFormat = this.documentHelper.selection.cellFormat;
            this.hasCellWidth = cellFormat.preferredWidth > 0;
            var preferredWidth = cellFormat.preferredWidth;
            if (ej2_base_1.isNullOrUndefined(cellFormat.preferredWidth)) {
                this.preferredCellWidthCheckBox.indeterminate = true;
                preferredWidth = this.documentHelper.selection.start.paragraph.associatedCell.cellFormat.preferredWidth;
            }
            else {
                this.preferredCellWidthCheckBox.checked = this.hasCellWidth;
            }
            this.cellWidthBox.enabled = this.hasCellWidth;
            this.cellWidthType.enabled = this.hasCellWidth;
            if (cellFormat.preferredWidthType === 'Auto' || cellFormat.preferredWidthType === 'Point') {
                this.cellWidthType.index = 0;
            }
            else {
                this.cellWidthType.index = 1;
            }
            this.formatNumericTextBox(this.cellWidthBox, cellFormat.preferredWidthType, preferredWidth);
            ej2_base_2.classList(this.cellTopAlign, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
            ej2_base_2.classList(this.cellCenterAlign, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
            ej2_base_2.classList(this.cellBottomAlign, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
            if (cellFormat.verticalAlignment === 'Top') {
                ej2_base_2.classList(this.cellTopAlign, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
            }
            else if (cellFormat.verticalAlignment === 'Center') {
                ej2_base_2.classList(this.cellCenterAlign, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
            }
            else if (cellFormat.verticalAlignment === 'Bottom') {
                ej2_base_2.classList(this.cellBottomAlign, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
            }
        };
        TablePropertiesDialog.prototype.updateClassForCellAlignment = function (element) {
            var cellAlignments = element.getElementsByClassName(element.id + 'e-de-table-cell-alignment');
            for (var j = 0; j < cellAlignments.length; j++) {
                var cellAlignment = cellAlignments[parseInt(j.toString(), 10)];
                if (cellAlignment.classList.contains('e-de-table-alignment-active')) {
                    ej2_base_2.classList(cellAlignment, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
                }
            }
        };
        TablePropertiesDialog.prototype.formatNumericTextBox = function (textBox, format, value) {
            if (format === 'Auto' || format === 'Point') {
                textBox.format = 'n2';
            }
            else {
                textBox.format = '#\'%\'';
            }
            textBox.step = 1;
            textBox.decimals = 2;
            textBox.value = value;
            textBox.htmlAttributes = { 'aria-label': 'cellWidth' };
        };
        TablePropertiesDialog.prototype.getCellAlignment = function () {
            var id = this.cellTab.id;
            var groupButtons = this.cellTab.getElementsByClassName(id + 'e-de-table-cell-alignment');
            for (var j = 0; j < groupButtons.length; j++) {
                var groupButton = groupButtons[parseInt(j.toString(), 10)];
                if (groupButton.classList.contains('e-de-table-alignment-active')) {
                    if (j === 0) {
                        return 'Top';
                    }
                    else if (j === 1) {
                        return 'Center';
                    }
                    else {
                        return 'Bottom';
                    }
                }
            }
            return this.documentHelper.selection.cellFormat.verticalAlignment;
        };
        TablePropertiesDialog.prototype.onCellWidthChange = function () {
            this.cellFormat.preferredWidth = this.cellWidthBox.value;
        };
        TablePropertiesDialog.prototype.onCellWidthTypeChange = function () {
            var value;
            var table = this.documentHelper.selection.start.paragraph.associatedCell.ownerTable;
            var containerWidth = table.getOwnerWidth(true);
            var tableWidth = table.getTableClientWidth(containerWidth);
            if (this.cellWidthType.text === 'Percent' && this.documentHelper.selection.cellFormat.preferredWidthType !== 'Percent') {
                value = this.cellWidthBox.value / tableWidth * 100;
                this.formatNumericTextBox(this.cellWidthBox, 'Percent', value);
            }
            else if (this.cellWidthType.text === 'Points' && this.documentHelper.selection.cellFormat.preferredWidthType !== 'Point') {
                value = tableWidth / 100 * this.cellWidthBox.value;
                this.formatNumericTextBox(this.cellWidthBox, 'Point', value);
            }
            else {
                if (this.cellWidthBox.format === '#\'%\'') {
                    if (this.cellWidthType.text === 'Points') {
                        value = tableWidth / 100 * this.cellWidthBox.value;
                    }
                    else {
                        value = this.cellWidthBox.value;
                    }
                }
                else {
                    if (this.cellWidthType.text === 'Percent') {
                        value = this.cellWidthBox.value / tableWidth * 100;
                    }
                    else {
                        value = this.cellWidthBox.value;
                    }
                }
                this.formatNumericTextBox(this.cellWidthBox, (this.cellWidthType.text === 'Points') ? 'Point' : this.cellWidthType.text, value);
            }
            this.cellFormat.preferredWidthType = (this.cellWidthType.text === 'Points') ? 'Point' : this.cellWidthType.text;
        };
        TablePropertiesDialog.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.target)) {
                if (this.target.parentElement) {
                    this.target.parentElement.removeChild(this.target);
                }
                for (var s = 0; s < this.target.childNodes.length; s++) {
                    this.target.removeChild(this.target.childNodes[parseInt(s.toString(), 10)]);
                    s--;
                }
                this.target = undefined;
            }
            this.dialog = undefined;
            this.target = undefined;
            this.cellAlignment = undefined;
            this.tableAlignment = undefined;
            this.documentHelper = undefined;
            this.preferCheckBox = undefined;
            this.tableWidthType = undefined;
            this.preferredWidth = undefined;
            this.rowHeightType = undefined;
            this.rowHeightCheckBox = undefined;
            this.rowHeight = undefined;
            this.cellWidthType = undefined;
            this.preferredCellWidthCheckBox = undefined;
            this.preferredCellWidth = undefined;
            this.tableTab = undefined;
            this.rowTab = undefined;
            this.cellTab = undefined;
            this.left = undefined;
            this.center = undefined;
            this.right = undefined;
            this.leftIndent = undefined;
            this.allowRowBreak = undefined;
            this.repeatHeader = undefined;
            this.cellTopAlign = undefined;
            this.cellCenterAlign = undefined;
            this.cellBottomAlign = undefined;
            this.titleTextBox = undefined;
            this.descriptionTextBox = undefined;
            this.altTab = undefined;
            if (this.paraFormatIn) {
                this.paraFormatIn.destroy();
                this.paraFormatIn = undefined;
            }
            if (this.tableFormatIn) {
                this.tableFormatIn.destroy();
            }
            if (this.cellFormatIn) {
                this.cellFormatIn.destroy();
            }
            this.tableFormatIn = undefined;
            this.cellFormatIn = undefined;
        };
        return TablePropertiesDialog;
    }());
    exports.TablePropertiesDialog = TablePropertiesDialog;
});
