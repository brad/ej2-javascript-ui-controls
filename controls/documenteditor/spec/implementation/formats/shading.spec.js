define(["require", "exports", "../../../src/document-editor/implementation/format/shading"], function (require, exports, shading_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Shading Validation Testing', function () {
        afterEach(function () {
            shading_1.WShading.clear();
        });
        it('Get Value  Testing', function () {
            console.log('Get Value  Testing');
            var shading = new shading_1.WShading();
            var foregroundColor = shading.foregroundColor;
            var backgroundColor = shading.backgroundColor;
            var textureStyle = shading.textureStyle;
            expect(backgroundColor).toBe('empty');
        });
        it('Set Value  Testing', function () {
            console.log('Set Value  Testing');
            var shading = new shading_1.WShading();
            shading.foregroundColor = 'black';
            shading.backgroundColor = 'red';
            shading.textureStyle = 'Texture5Percent';
            expect(shading.foregroundColor).toBe('black');
        });
        it('Set Invalid Value  Testing', function () {
            console.log('Set Invalid Value  Testing');
            var shading = new shading_1.WShading();
            shading.foregroundColor = '';
            shading.backgroundColor = undefined;
            shading.textureStyle = undefined;
            expect(shading.foregroundColor).toBe('empty');
        });
        it('Set Invalid Value  Testing', function () {
            console.log('Set Invalid Value  Testing');
            var shading = new shading_1.WShading();
            shading.foregroundColor = 'blue';
            shading.foregroundColor = 'blue';
            expect(shading.foregroundColor).toBe('blue');
        });
        it('copy format  Testing', function () {
            console.log('copy format  Testing');
            var shading1 = new shading_1.WShading();
            var shading = new shading_1.WShading();
            shading.backgroundColor = 'blue';
            shading1.copyFormat(shading);
            expect(shading1.backgroundColor).toBe('blue');
        });
        it('copy format undefined  Testing', function () {
            console.log('copy format undefined  Testing');
            var shading1 = new shading_1.WShading();
            var shading = new shading_1.WShading();
            shading1.copyFormat(shading);
            expect('').toBe('');
        });
        it('copy format undefined  Testing', function () {
            console.log('copy format undefined  Testing');
            var shading = new shading_1.WShading();
            shading.copyFormat(undefined);
            expect('').toBe('');
        });
    });
});
