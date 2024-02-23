define(["require", "exports", "@syncfusion/ej2-buttons", "@syncfusion/ej2-inputs", "../index", "@syncfusion/ej2-base", "./index"], function (require, exports, ej2_buttons_1, ej2_inputs_1, index_1, ej2_base_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableOptionsDialog = (function () {
        function TableOptionsDialog(documentHelper) {
            var _this = this;
            this.applyTableCellProperties = function () {
                var tableFormat = _this.documentHelper.selection.tableFormat;
                if (!ej2_base_1.isNullOrUndefined(_this.bottomMarginBox.value || _this.leftMarginBox.value
                    || _this.rightMarginBox.value || _this.topMarginBox.value || _this.cellSpaceTextBox.value)
                    && (tableFormat.bottomMargin !== _this.bottomMarginBox.value
                        || tableFormat.leftMargin !== _this.leftMarginBox.value
                        || tableFormat.rightMargin !== _this.rightMarginBox.value
                        || tableFormat.topMargin !== _this.topMarginBox.value
                        || tableFormat.cellSpacing !== _this.cellSpaceTextBox.value)) {
                    _this.documentHelper.owner.tablePropertiesDialogModule.isTableOptionsUpdated = true;
                    _this.applyTableOptions(_this.tableFormat);
                    _this.documentHelper.owner.tablePropertiesDialogModule.applyTableSubProperties();
                }
                _this.closeCellMarginsDialog();
            };
            this.closeCellMarginsDialog = function () {
                _this.documentHelper.dialog.hide();
                _this.documentHelper.dialog.element.style.pointerEvents = '';
                _this.documentHelper.updateFocus();
            };
            this.changeAllowSpaceCheckBox = function () {
                if (_this.allowSpaceCheckBox.checked) {
                    _this.cellSpaceTextBox.enabled = true;
                }
                else {
                    _this.cellSpaceTextBox.enabled = false;
                    _this.cellSpaceTextBox.value = 0;
                }
            };
            this.removeEvents = function () {
                _this.documentHelper.dialog2.element.style.pointerEvents = '';
                _this.documentHelper.updateFocus();
            };
            this.documentHelper = documentHelper;
        }
        Object.defineProperty(TableOptionsDialog.prototype, "tableFormat", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.tableFormatIn)) {
                    return this.tableFormatIn = new index_1.WTableFormat();
                }
                return this.tableFormatIn;
            },
            enumerable: true,
            configurable: true
        });
        TableOptionsDialog.prototype.getModuleName = function () {
            return 'TableOptionsDialog';
        };
        TableOptionsDialog.prototype.initTableOptionsDialog = function (localValue, isRtl) {
            this.target = ej2_base_1.createElement('div', {
                id: this.documentHelper.owner.containerId + '_insertCellMarginsDialog', className: 'e-de-table-options-dlg'
            });
            var innerDiv = ej2_base_1.createElement('div');
            var innerDivLabel = ej2_base_1.createElement('Label', {
                id: this.target.id + '_innerDivLabel', className: 'e-de-para-dlg-heading',
                innerHTML: localValue.getConstant('Default cell margins')
            });
            innerDiv.appendChild(innerDivLabel);
            index_2.CellOptionsDialog.getCellMarginDialogElements(this, innerDiv, localValue, false);
            var div = ej2_base_1.createElement('div');
            var cellSpaceLabel = ej2_base_1.createElement('Label', {
                className: 'e-de-para-dlg-heading',
                id: this.target.id + '_cellSpaceLabel'
            });
            cellSpaceLabel.innerHTML = localValue.getConstant('Default cell spacing');
            div.appendChild(cellSpaceLabel);
            var table2 = ej2_base_1.createElement('TABLE', {
                styles: 'height: 30px;'
            });
            var tr3 = ej2_base_1.createElement('tr');
            var td5 = ej2_base_1.createElement('td');
            var allowSpaceCheckBox = ej2_base_1.createElement('input', {
                attrs: { 'type': 'checkbox' }, id: this.target.id + '_cellcheck'
            });
            var td6Padding;
            if (isRtl) {
                td6Padding = 'padding-right:25px;';
            }
            else {
                td6Padding = 'padding-left:25px;';
            }
            var td6 = ej2_base_1.createElement('td', { styles: td6Padding });
            this.cellspacingTextBox = ej2_base_1.createElement('input', {
                attrs: { 'type': 'text' }, id: this.target.id + '_cellspacing'
            });
            td5.appendChild(allowSpaceCheckBox);
            td6.appendChild(this.cellspacingTextBox);
            tr3.appendChild(td5);
            tr3.appendChild(td6);
            table2.appendChild(tr3);
            div.appendChild(table2);
            var divBtn = document.createElement('div');
            this.target.appendChild(div);
            this.target.appendChild(divBtn);
            this.cellSpaceTextBox = new ej2_inputs_1.NumericTextBox({
                value: 0, min: 0, max: 264.5, width: 174,
                decimals: 2, enablePersistence: false
            });
            this.cellSpaceTextBox.appendTo(this.cellspacingTextBox);
            this.allowSpaceCheckBox = new ej2_buttons_1.CheckBox({
                label: localValue.getConstant('Allow spacing between cells'),
                change: this.changeAllowSpaceCheckBox,
                enableRtl: isRtl,
                cssClass: 'e-de-tbl-margin-sub-header'
            });
            this.allowSpaceCheckBox.appendTo(allowSpaceCheckBox);
            allowSpaceCheckBox.setAttribute('aria-label', localValue.getConstant('Allow spacing between cells'));
            this.cellspacingTextBox.setAttribute('aria-label', 'cell spacing');
        };
        TableOptionsDialog.prototype.loadCellMarginsDialog = function () {
            var tableFormat = this.documentHelper.selection.tableFormat;
            this.cellSpaceTextBox.value = tableFormat.cellSpacing;
            this.bottomMarginBox.value = tableFormat.bottomMargin;
            this.topMarginBox.value = tableFormat.topMargin;
            this.rightMarginBox.value = tableFormat.rightMargin;
            this.leftMarginBox.value = tableFormat.leftMargin;
            if (tableFormat.cellSpacing > 0) {
                this.allowSpaceCheckBox.checked = true;
                this.cellSpaceTextBox.enabled = true;
            }
            else {
                this.allowSpaceCheckBox.checked = false;
                this.cellSpaceTextBox.enabled = false;
            }
        };
        TableOptionsDialog.prototype.applySubTableOptions = function (tableFormat, sourceTable) {
            this.documentHelper.owner.editorHistory.initComplexHistory(this.documentHelper.selection, 'TableMarginsSelection');
            this.applyTableOptionsHistory(tableFormat, sourceTable);
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.owner.editorHistory.currentHistoryInfo)) {
                this.documentHelper.owner.editorHistory.updateComplexHistory();
            }
        };
        TableOptionsDialog.prototype.applyTableOptionsHelper = function (tableFormat) {
            this.applySubTableOptionsHelper(tableFormat, undefined);
        };
        TableOptionsDialog.prototype.applyTableOptionsHistory = function (tableFormat, sourceTable) {
            this.documentHelper.owner.editorModule.initHistory('TableOptions');
            this.applySubTableOptionsHelper(tableFormat, sourceTable);
        };
        TableOptionsDialog.prototype.applySubTableOptionsHelper = function (tableFormat, ownerTable) {
            if (ej2_base_1.isNullOrUndefined(ownerTable)) {
                ownerTable = this.documentHelper.selection.start.currentWidget.paragraph.associatedCell.ownerTable;
                ownerTable = ownerTable.combineWidget(this.documentHelper.owner.viewer);
            }
            var currentTableFormat = ownerTable.tableFormat;
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.owner.editorHistory.currentBaseHistoryInfo)) {
                this.documentHelper.owner.editorHistory.currentBaseHistoryInfo.addModifiedTableOptions(currentTableFormat);
            }
            currentTableFormat.cellSpacing = tableFormat.cellSpacing;
            currentTableFormat.leftMargin = tableFormat.leftMargin;
            currentTableFormat.topMargin = tableFormat.topMargin;
            currentTableFormat.rightMargin = tableFormat.rightMargin;
            currentTableFormat.bottomMargin = tableFormat.bottomMargin;
            this.documentHelper.owner.tablePropertiesDialogModule.calculateGridValue(ownerTable);
        };
        TableOptionsDialog.prototype.applyTableOptions = function (tableFormat) {
            tableFormat.leftMargin = this.leftMarginBox.value;
            tableFormat.topMargin = this.topMarginBox.value;
            tableFormat.bottomMargin = this.bottomMarginBox.value;
            tableFormat.rightMargin = this.rightMarginBox.value;
            tableFormat.cellSpacing = this.cellSpaceTextBox.value;
        };
        TableOptionsDialog.prototype.show = function () {
            var documentLocale = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            documentLocale.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.initTableOptionsDialog(documentLocale, this.documentHelper.owner.enableRtl);
            }
            this.loadCellMarginsDialog();
            this.documentHelper.dialog.header = documentLocale.getConstant('Table Options');
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.beforeOpen = undefined;
            this.documentHelper.dialog.position = { X: 'center', Y: 'center' };
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.open = undefined;
            this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
            this.documentHelper.dialog.close = this.removeEvents;
            this.documentHelper.dialog.buttons = [{
                    click: this.applyTableCellProperties,
                    buttonModel: { content: documentLocale.getConstant('Ok'), cssClass: 'e-flat e-table-cell-okay', isPrimary: true }
                },
                {
                    click: this.closeCellMarginsDialog,
                    buttonModel: { content: documentLocale.getConstant('Cancel'), cssClass: 'e-flat e-table-cell-cancel' }
                }];
            this.documentHelper.dialog.dataBind();
            this.documentHelper.dialog.show();
        };
        TableOptionsDialog.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.target)) {
                if (this.target.parentElement) {
                    this.target.parentElement.removeChild(this.target);
                }
                for (var p = 0; p < this.target.childNodes.length; p++) {
                    this.target.removeChild(this.target.childNodes[p]);
                    p--;
                }
                this.target = undefined;
            }
            if (this.tableFormatIn) {
                this.tableFormatIn.destroy();
                this.tableFormatIn = undefined;
            }
            this.dialog = undefined;
            this.target = undefined;
            this.documentHelper = undefined;
            this.cellspacingTextBox = undefined;
            this.allowSpaceCheckBox = undefined;
        };
        return TableOptionsDialog;
    }());
    exports.TableOptionsDialog = TableOptionsDialog;
});
