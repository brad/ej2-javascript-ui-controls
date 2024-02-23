define(["require", "exports", "../../../src/document-editor/implementation/format/list-format"], function (require, exports, list_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Copy Format', function () {
        afterEach(function () {
            list_format_1.WListFormat.clear();
        });
        it('set property value undefined', function () {
            console.log('set property value undefined');
            var format = new list_format_1.WListFormat();
            format.listLevelNumber = undefined;
            expect(format.listLevelNumber).toBe(0);
        });
        it('Copy format default', function () {
            console.log('Copy format default');
            var format = new list_format_1.WListFormat();
            var format2 = new list_format_1.WListFormat();
            format2.copyFormat(format);
        });
        it('Copy format value', function () {
            console.log('Copy format value');
            var format = new list_format_1.WListFormat();
            format.listId = 1;
            format.listLevelNumber = 1;
            var format2 = new list_format_1.WListFormat();
            format2.copyFormat(format);
        });
        it('destroy testing', function () {
            console.log('destroy testing');
            var format = new list_format_1.WListFormat();
            format.destroy();
            expect(function () { format.destroy(); }).not.toThrowError();
        });
        it('Clear format validation', function () {
            console.log('Clear format validation');
            var format = new list_format_1.WListFormat();
            format.listId = 1;
            format.listLevelNumber = 1;
            format.clearFormat();
            expect(format.listId).toBe(-1);
            expect(format.listLevelNumber).not.toBe(1);
            expect(format.uniqueListFormat).toBeUndefined();
        });
    });
});
