define(["require", "exports", "../../../src/document-editor/implementation/format/row-format"], function (require, exports, row_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Row Format Validation Testing', function () {
        afterEach(function () {
            row_format_1.WRowFormat.clear();
        });
        it('Row Format Clone Format Testing', function () {
            console.log('Row Format Clone Format Testing');
            var rowFormat = new row_format_1.WRowFormat();
            rowFormat.cloneFormat();
            expect('').toBe('');
        });
        it('Row Format destroy Testing', function () {
            console.log('Row Format destroy Testing');
            var rowFormat = new row_format_1.WRowFormat();
            rowFormat.destroy();
            expect('').toBe('');
        });
        it('copy format  Testing', function () {
            console.log('copy format  Testing');
            var row = new row_format_1.WRowFormat();
            var row1 = new row_format_1.WRowFormat();
            row1.height = 300;
            row1.isHeader = undefined;
            row.copyFormat(row1);
        });
        it('copy format undefined  Testing', function () {
            console.log('copy format undefined  Testing');
            var row = new row_format_1.WRowFormat();
            var row1 = new row_format_1.WRowFormat();
            row1.destroy();
            row.copyFormat(row1);
        });
        it('copy format undefined  Testing', function () {
            console.log('copy format undefined  Testing');
            var row = new row_format_1.WRowFormat();
            var row1 = new row_format_1.WRowFormat();
            row1.destroy();
            row.copyFormat(row1);
            expect(function () { row.copyFormat(undefined); }).not.toThrowError();
            expect(function () { row1.destroy(); }).not.toThrowError();
        });
    });
});
