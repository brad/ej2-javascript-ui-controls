define(["require", "exports", "../../../src/document-editor/implementation/format/borders"], function (require, exports, borders_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Border Validation Testing', function () {
        afterEach(function () {
        });
        ;
        it('Borders destroy Testing', function () {
            console.log('Borders destroy Testing');
            var borders = new borders_1.WBorders();
            borders.destroy();
            expect('').toBe('');
            borders.cloneFormat();
            expect(function () { borders.destroy(); }).not.toThrowError();
        });
        it('Borders clone format Testing', function () {
            console.log('Borders clone format Testing');
            var borders = new borders_1.WBorders();
            borders.cloneFormat();
            borders.destroy();
            borders.cloneFormat();
            expect('').toBe('');
        });
        it('Borders copy format Testing', function () {
            console.log('Borders copy format Testing');
            var borders = new borders_1.WBorders();
            borders.copyFormat(borders);
            expect('').toBe('');
        });
        it('Borders copy format undefined Testing', function () {
            console.log('Borders copy format undefined Testing');
            var borders = new borders_1.WBorders(undefined);
            borders.left = undefined;
            borders.top = undefined;
            borders.right = undefined;
            borders.bottom = undefined;
            borders.diagonalDown = undefined;
            borders.diagonalUp = undefined;
            borders.vertical = undefined;
            borders.horizontal = undefined;
            borders.copyFormat(borders);
            expect('').toBe('');
        });
    });
});
