define(["require", "exports", "../../../src/document-editor/implementation/viewer/text-helper"], function (require, exports, text_helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('text-helper function validation', function () {
        var helper;
        beforeAll(function () {
            helper = new text_helper_1.TextHelper(undefined);
        });
        afterAll(function (done) {
            helper.destroy();
        });
        it('Reverse string validation open brackets', function () {
            console.log('Reverse string validation open brackets');
            var specString = '({[<.';
            expect(helper.containsSpecialChar(specString)).toBe(true);
            specString = '(';
            expect(helper.inverseCharacter(specString)).toBe(')');
            specString = '{';
            expect(helper.inverseCharacter(specString)).toBe('}');
            specString = '[';
            expect(helper.inverseCharacter(specString)).toBe(']');
            specString = '<';
            expect(helper.inverseCharacter(specString)).toBe('>');
        });
        it('Reverse string validation', function () {
            console.log('Reverse string validation');
            var specString = ')}]>,';
            expect(helper.containsSpecialChar(specString)).toBe(true);
            specString = ')';
            expect(helper.inverseCharacter(specString)).toBe('(');
            specString = '}';
            expect(helper.inverseCharacter(specString)).toBe('{');
            specString = ']';
            expect(helper.inverseCharacter(specString)).toBe('[');
            specString = '>';
            expect(helper.inverseCharacter(specString)).toBe('<');
            specString = '.';
            expect(helper.inverseCharacter(specString)).toBe('.');
        });
    });
});
