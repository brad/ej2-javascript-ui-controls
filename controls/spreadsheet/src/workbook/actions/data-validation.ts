import { Workbook, SheetModel, CellModel, getSheet, getColumn, ColumnModel, isHiddenRow, getCell, setCell, getSheetIndex, getSheetNameFromAddress } from '../base/index';
import { cellValidation, applyCellFormat, isValidation, addHighlight, getCellAddress, validationHighlight, getSwapRange, getSheetIndexFromAddress, getSplittedAddressForColumn, getRangeFromAddress, getViewportIndexes } from '../common/index';
import { removeHighlight, InsertDeleteEventArgs, checkIsFormula, checkCellValid } from '../common/index';
import { getRangeIndexes, getUpdatedFormulaOnInsertDelete, InsertDeleteModelArgs } from '../common/index';
import { CellFormatArgs, ValidationModel, updateCell, beforeInsert, beforeDelete } from '../common/index';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';


/**
 * The `WorkbookHyperlink` module is used to handle Hyperlink action in Spreadsheet.
 */
export class WorkbookDataValidation {
    private parent: Workbook;
    /**
     * Constructor for WorkbookSort module.
     *
     * @param {Workbook} parent - Specifies the parent element.
     */
    constructor(parent: Workbook) {
        this.parent = parent;
        this.addEventListener();
    }

    /**
     * To destroy the sort module.
     *
     * @returns {void}
     */
    protected destroy(): void {
        this.removeEventListener();
        this.parent = null;
    }

    private addEventListener(): void {
        this.parent.on(cellValidation, this.validationHandler, this);
        this.parent.on(addHighlight, this.addHighlightHandler, this);
        this.parent.on(removeHighlight, this.removeHighlightHandler, this);
        this.parent.on(beforeInsert, this.beforeInsertDeleteHandler, this);
        this.parent.on(beforeDelete, this.beforeInsertDeleteHandler, this);
    }

    private removeEventListener(): void {
        if (!this.parent.isDestroyed) {
            this.parent.off(cellValidation, this.validationHandler);
            this.parent.off(addHighlight, this.addHighlightHandler);
            this.parent.off(removeHighlight, this.removeHighlightHandler);
            this.parent.off(beforeInsert, this.beforeInsertDeleteHandler);
            this.parent.off(beforeDelete, this.beforeInsertDeleteHandler);
        }
    }


    private validationHandler(
        args: { range: string, rules?: ValidationModel, isRemoveValidation?: boolean, cancel?: boolean, viewport: object }): void {
        let onlyRange: string = args.range;
        let sheetName: string = '';
        if (args.range.indexOf('!') > -1) {
            onlyRange = args.range.split('!')[1];
            sheetName = args.range.split('!')[0];
        }
        const sheet: SheetModel = getSheet(this.parent, sheetName ? getSheetIndex(this.parent, sheetName) : this.parent.activeSheetIndex);
        this.parent.dataValidationRange = (this.parent.dataValidationRange.indexOf('!') > -1 ? '' : sheet.name + '!') + this.parent.dataValidationRange + onlyRange + ',';
        const rangeInfo: { range: string, isFullCol: boolean }  = this.getRangeWhenColumnSelected(onlyRange, sheet);
        onlyRange = rangeInfo.range;
        if (!isNullOrUndefined(sheetName)) {
            args.range = sheetName + '!' + onlyRange;
        }
        args.range = args.range || sheet.selectedRange;
        const indexes: number[] = getSwapRange(getRangeIndexes(args.range));
        let cell: CellModel; let column: ColumnModel;
        let viewportIndexes: number[][];
        if (args.viewport && rangeInfo.isFullCol) {
            viewportIndexes = getViewportIndexes(this.parent, args.viewport);
        }
        if (this.parent.listSeparator !== ',' && !args.isRemoveValidation && args.rules.type === 'List' &&
            args.rules.value1.includes(this.parent.listSeparator)) {
            args.rules.value1 = args.rules.value1.split(this.parent.listSeparator).join(',');
        }
        for (let colIdx: number = indexes[1]; colIdx <= indexes[3]; colIdx++) {
            if (rangeInfo.isFullCol) {
                column = getColumn(sheet, colIdx);
                if (args.isRemoveValidation) {
                    if (column && column.validation) {
                        delete column.validation;
                        if (viewportIndexes) {
                            viewportIndexes.forEach((viewportIndex: number[]) => {
                                for (let rowIdx: number = viewportIndex[0]; rowIdx <= viewportIndex[2]; rowIdx++) {
                                    cell = getCell(rowIdx, colIdx, sheet);
                                    this.parent.notify(
                                        applyCellFormat, <CellFormatArgs>{ rowIdx: rowIdx, colIdx: colIdx, style:
                                            this.parent.getCellStyleValue(['backgroundColor', 'color'], [rowIdx, colIdx]) });
                                }
                            });
                        }
                        continue;
                    }
                } else {
                    column = getColumn(sheet, colIdx);
                    column.validation = { operator: args.rules.operator, type: args.rules.type, value1: args.rules.value1, value2:
                        args.rules.value2, inCellDropDown: args.rules.inCellDropDown, ignoreBlank: args.rules.ignoreBlank };
                    continue;
                }
            }
            for (let rowIdx: number = indexes[0]; rowIdx <= indexes[2]; rowIdx++) {
                if (args.isRemoveValidation) {
                    if (rowIdx === indexes[2]) {
                        column = getColumn(sheet, colIdx);
                        if (column && column.validation) {
                            column.validation.address = getSplittedAddressForColumn(
                                column.validation.address, [indexes[0], colIdx, indexes[2], colIdx], colIdx);
                        }
                    }
                    cell = getCell(rowIdx, colIdx, sheet);
                    if (cell && cell.validation &&
                        !updateCell(this.parent, sheet, { cell: { validation: {} }, rowIdx: rowIdx, colIdx: colIdx })) {
                        delete (cell.validation);
                        this.parent.notify(
                            applyCellFormat, <CellFormatArgs>{
                                rowIdx: rowIdx, colIdx: colIdx, style:
                                    this.parent.getCellStyleValue(['backgroundColor', 'color'], [rowIdx, colIdx])
                            });
                    }
                } else {
                    cell = { validation: Object.assign({}, args.rules) };
                    updateCell(this.parent, sheet, { cell: cell, rowIdx: rowIdx, colIdx: colIdx });
                }
            }
        }
    }

    private addHighlightHandler(args: { range: string, td? : HTMLElement, isclearFormat?: boolean }): void {
        this.InvalidDataHandler(args.range, false, args.td, args.isclearFormat);
    }

    private removeHighlightHandler(args: { range: string }): void {
        this.InvalidDataHandler(args.range, true);
    }

    private getRange(range: string): string {
        const indexes: number[] = getRangeIndexes(range);
        const sheet: SheetModel = this.parent.getActiveSheet();
        const maxColCount: number = sheet.colCount;
        const maxRowCount: number = sheet.rowCount;
        if (indexes[2] === maxRowCount - 1 && indexes[0] === 0) {
            range = range.replace(/[0-9]/g, '');
        } else if (indexes[3] === maxColCount - 1 && indexes[2] === 0) {
            range = range.replace(/\D/g, '');
        }
        return range;
    }

    private InvalidDataHandler(range: string, isRemoveHighlightedData: boolean, td?: HTMLElement, isclearFormat?: boolean): void {
        const isCell: boolean = false;
        let cell: CellModel;
        let value: string;
        const sheetIdx: number = range ? getSheetIndexFromAddress(this.parent, range) : this.parent.activeSheetIndex;
        const sheet: SheetModel = getSheet(this.parent, sheetIdx);
        range = range || sheet.selectedRange;
        const sheetName: string = range.includes('!') ? getSheetNameFromAddress(range) : sheet.name;
        const rangeInfo: { range: string, isFullCol: boolean } = this.getRangeWhenColumnSelected(getRangeFromAddress(range), sheet);
        const isFullCol: boolean = rangeInfo.isFullCol;
        range = sheetName + '!' + rangeInfo.range;
        const indexes: number[] = range ? getSwapRange(getRangeIndexes(range)) : [];
        range = this.getRange(range);
        let rowIdx: number = range ? indexes[0] : 0;
        const lastRowIdx: number = range ? indexes[2] : sheet.rows.length;
        for (rowIdx; rowIdx <= lastRowIdx; rowIdx++) {
            if (sheet.rows[rowIdx as number]) {
                let colIdx: number = range ? indexes[1] : 0;
                const lastColIdx: number = range ? indexes[3] : sheet.rows[rowIdx as number].cells.length;
                for (colIdx; colIdx <= lastColIdx; colIdx++) {
                    let validation: ValidationModel;
                    if (sheet.rows[rowIdx as number].cells && sheet.rows[rowIdx as number].cells[colIdx as number]) {
                        const column: ColumnModel = getColumn(sheet, colIdx);
                        cell = sheet.rows[rowIdx as number].cells[colIdx as number];
                        if (cell && cell.validation) {
                            validation = cell.validation;
                            if (isclearFormat && !validation.isHighlighted) {
                                return;
                            }
                            if (isRemoveHighlightedData) {
                                if (validation.isHighlighted) {
                                    cell.validation.isHighlighted = false;
                                }
                            } else {
                                cell.validation.isHighlighted = true;
                            }
                        } else if (column && column.validation) {
                            validation = column.validation;
                            if (isclearFormat && !validation.isHighlighted) {
                                return;
                            }
                            if (isRemoveHighlightedData && isFullCol) {
                                if (validation.isHighlighted) {
                                    column.validation.isHighlighted = false;
                                }
                            } else if (isFullCol) {
                                column.validation.isHighlighted = true;
                            }
                        }
                        value = cell.value ? cell.value : '';
                        const range: number[] = [rowIdx, colIdx];
                        if (validation && this.parent.allowDataValidation) {
                            const validEventArgs: checkCellValid = { value, range, sheetIdx, isCell, td: td, isValid: true };
                            this.parent.notify(isValidation, validEventArgs);
                            const isValid: boolean = validEventArgs.isValid;
                            if (!isValid) {
                                if (!isHiddenRow(sheet, rowIdx) && sheetIdx === this.parent.activeSheetIndex){
                                    this.parent.notify(validationHighlight, {
                                        isRemoveHighlightedData: isRemoveHighlightedData, rowIdx: rowIdx, colIdx: colIdx, td: td
                                    });
                                }}
                        }
                    }
                }
            }
        }

    }

    private beforeInsertDeleteHandler(args: InsertDeleteEventArgs): void {
        if (args.modelType === 'Sheet') {
            return;
        }
        let cell: CellModel;
        let sheet: SheetModel;
        for (let i: number = 0, sheetLen: number = this.parent.sheets.length; i < sheetLen; i++) {
            sheet = this.parent.sheets[i as number];
            for (let j: number = 0, rowLen: number = sheet.rows.length; j < rowLen; j++) {
                if (sheet.rows[j as number] && sheet.rows[j as number].cells) {
                    for (let k: number = 0, cellLen: number = sheet.rows[j as number].cells.length; k < cellLen; k++) {
                        cell = sheet.rows[j as number].cells[k as number];
                        if (cell && cell.validation) {
                            const isInsert: boolean = (args as { name: string }).name === 'beforeInsert';
                            const endIndex: number = args.index + (args.model.length - 1);
                            const isNewlyInsertedModel: boolean = args.modelType === 'Row' ? (j >= args.index && j <= endIndex) : (k >= args.index && k <= endIndex);
                            let eventArgs: { insertDeleteArgs: InsertDeleteEventArgs, cell?: CellModel, row: number, col: number,
                                sheetIdx: number };
                            if (isInsert) {
                                eventArgs = {
                                    insertDeleteArgs: {
                                        startIndex: args.index, endIndex: args.index + args.model.length - 1, modelType: args.modelType,
                                        isInsert: true, sheet: getSheet(this.parent, args.activeSheetIndex)
                                    }, row: j, col: k, sheetIdx: i };
                            } else {
                                eventArgs = { insertDeleteArgs: {
                                    startIndex: (args as InsertDeleteModelArgs).start as number, modelType: args.modelType,
                                    endIndex: (args as InsertDeleteModelArgs).end, sheet: args.model as SheetModel
                                }, row: j, col: k, sheetIdx: i };
                            }
                            if (checkIsFormula(cell.validation.value1) && !isNewlyInsertedModel) {
                                eventArgs.cell = { formula: cell.validation.value1 };
                                this.parent.notify(getUpdatedFormulaOnInsertDelete, eventArgs);
                                cell.validation.value1 = eventArgs.cell.formula;
                            }
                            if (checkIsFormula(cell.validation.value2) && !isNewlyInsertedModel) {
                                eventArgs.cell = { formula: cell.validation.value2 };
                                this.parent.notify(getUpdatedFormulaOnInsertDelete, eventArgs);
                                cell.validation.value2 = eventArgs.cell.formula;
                            }
                            if (args.activeSheetIndex === i && isInsert) {
                                this.updateValidationForInsertedModel(args, sheet, j, k, cell.validation);
                            }
                        }
                    }
                }
            }
        }
    }

    private getRangeWhenColumnSelected(range: string, sheet: SheetModel): { range: string, isFullCol: boolean } {
        let isFullCol: boolean;
        const colNames: string[] = range.split(':');
        if (range.match(/\D/g) && !range.match(/[0-9]/g)) {
            colNames[0] += 1;
            colNames[1] += sheet.rowCount;
            range = colNames[0] + ':' + colNames[1];
            isFullCol = true;
        } else if (!range.match(/\D/g) && range.match(/[0-9]/g)) {
            colNames[0] = 'A' + colNames[0];
            colNames[1] = getCellAddress(0, sheet.colCount - 1).replace(/[0-9]/g, '') + colNames[1];
            range = colNames[0] + ':' + colNames[1];
        }
        return { range: range, isFullCol: isFullCol };
    }

    private updateValidationForInsertedModel(
        args: InsertDeleteEventArgs, sheet: SheetModel, rowIndex: number, colIndex: number, validation: ValidationModel): void {
        const endIndex: number = args.index + (args.model.length - 1);
        if (args.modelType === 'Column') {
            if ((args.insertType === 'before' && endIndex === colIndex - 1) || (args.insertType === 'after' && args.index - 1 === colIndex)) {
                for (let l: number = args.index; l <= endIndex; l++) {
                    setCell(rowIndex, l, sheet, { validation: extend({}, validation) }, true);
                }
            }
        } else if (args.modelType === 'Row') {
            if ((args.insertType === 'above' && endIndex === rowIndex - 1) || (args.insertType === 'below' && args.index - 1 === rowIndex)) {
                for (let l: number = args.index; l <= endIndex; l++) {
                    setCell(l, colIndex, sheet, { validation: extend({}, validation) }, true);
                }
            }
        }
    }

    /**
     * Gets the module name.
     *
     * @returns {string} string
     */
    protected getModuleName(): string {
        return 'workbookDataValidation';
    }
}
