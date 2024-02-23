define(["require", "exports", "../../../src/document-editor/implementation/format/cell-format"], function (require, exports, cell_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Cell Validation Testing', function () {
        afterEach(function () {
            cell_format_1.WCellFormat.clear();
        });
        it('margin  Testing', function () {
            console.log('margin  Testing');
            var cell = new cell_format_1.WCellFormat();
            expect(cell.containsMargins()).toBe(false);
            cell.leftMargin = undefined;
            cell.cellWidth = 20;
        });
        it('Cell format destroy Testing', function () {
            console.log('Cell format destroy Testing');
            var cell = new cell_format_1.WCellFormat();
            expect(cell.containsMargins()).toBe(false);
            cell.destroy();
        });
        it('Clone format  Testing', function () {
            console.log('Clone format  Testing');
            var cell = new cell_format_1.WCellFormat();
            expect(cell.containsMargins()).toBe(false);
            cell.cloneFormat();
        });
        it('copy format  Testing', function () {
            console.log('copy format  Testing');
            var cell = new cell_format_1.WCellFormat();
            expect(cell.containsMargins()).toBe(false);
            cell.cellWidth = 312;
            cell.preferredWidth = 300;
            cell.copyFormat(cell);
        });
        it('copy format undefined  Testing', function () {
            console.log('copy format undefined  Testing');
            var cell = new cell_format_1.WCellFormat();
            expect(cell.containsMargins()).toBe(false);
            cell.copyFormat(cell);
        });
        it('copy format validation  Testing', function () {
            console.log('copy format validation  Testing');
            var cell = new cell_format_1.WCellFormat();
            expect(function () { cell.copyFormat(undefined); }).not.toThrowError();
        });
        it('copy cell format with shading undefined testing', function () {
            console.log('copy cell format with shading undefined testing');
            var cell = new cell_format_1.WCellFormat();
            var cell2 = new cell_format_1.WCellFormat();
            cell2.destroy();
            expect(function () { cell.copyFormat(cell2); }).not.toThrowError();
        });
        it('destroy Testing', function () {
            console.log('destroy Testing');
            var cell = new cell_format_1.WCellFormat();
            cell.destroy();
            cell.cloneFormat();
            expect(function () { cell.destroy(); }).not.toThrowError();
        });
    });
});
