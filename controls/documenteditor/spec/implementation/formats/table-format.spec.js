define(["require", "exports", "../../../src/document-editor/implementation/format/table-format"], function (require, exports, table_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Table Format Validation Testing', function () {
        afterEach(function () {
            table_format_1.WTableFormat.clear();
        });
        it('Set property value undefined', function () {
            console.log('Set property value undefined');
            var tableFormat = new table_format_1.WTableFormat();
            tableFormat.cellSpacing = undefined;
            expect(tableFormat.cellSpacing).toBe(0);
        });
        it('Clone Format  Testing', function () {
            console.log('Clone Format  Testing');
            var tableFormat = new table_format_1.WTableFormat();
            tableFormat.cloneFormat();
            expect('').toBe('');
            tableFormat.destroy();
            tableFormat.cloneFormat();
            expect(function () { tableFormat.destroy(); }).not.toThrowError();
        });
        it('Copy Format  Testing', function () {
            console.log('Copy Format  Testing');
            var tableFormat = new table_format_1.WTableFormat();
            var tableFormat1 = new table_format_1.WTableFormat();
            tableFormat1.leftMargin = 12;
            tableFormat.copyFormat(tableFormat1);
            expect('').toBe('');
        });
        it('Copy Format undefined Testing', function () {
            console.log('Copy Format undefined Testing');
            var tableFormat = new table_format_1.WTableFormat();
            var tableFormat1 = new table_format_1.WTableFormat();
            tableFormat1.destroy();
            tableFormat.copyFormat(tableFormat1);
            expect('').toBe('');
        });
        it('Copy Format undefined validation', function () {
            console.log('Copy Format undefined validation');
            var tableFormat = new table_format_1.WTableFormat();
            tableFormat.copyFormat(undefined);
            expect(function () { tableFormat.copyFormat(undefined); }).not.toThrowError();
        });
        it('Has Value undefined Testing', function () {
            console.log('Has Value undefined Testing');
            var tableFormat = new table_format_1.WTableFormat();
            tableFormat.destroy();
            tableFormat.hasValue('leftMargin');
            expect('').toBe('');
        });
        it('get Property Value undefined Testing', function () {
            console.log('get Property Value undefined Testing');
            var tableFormat = new table_format_1.WTableFormat();
            tableFormat.destroy();
            tableFormat.getPropertyValue('leftMargin');
            expect('').toBe('');
        });
    });
});
