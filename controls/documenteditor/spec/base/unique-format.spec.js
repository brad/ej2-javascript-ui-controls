define(["require", "exports", "../../src/document-editor/base/dictionary", "../../src/document-editor/base/unique-format", "../../src/document-editor/base/unique-formats"], function (require, exports, dictionary_1, unique_format_1, unique_formats_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Unique Format validation', function () {
        it('Constructor validation', function () {
            console.log('Constructor validation');
            var unique = new unique_format_1.WUniqueFormat(20);
            var isEqual = unique.isEqual(new dictionary_1.Dictionary(), 'color', 9);
            expect(isEqual).toBe(false);
        });
    });
    describe('Unique Formats validation', function () {
        it('Constructor validation', function () {
            console.log('Constructor validation');
            var unique = new unique_formats_1.WUniqueFormats();
            unique.destroy();
            expect(unique.items).toBe(undefined);
        });
    });
});
