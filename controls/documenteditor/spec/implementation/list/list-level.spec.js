define(["require", "exports", "../../../src/document-editor/implementation/list/list-level"], function (require, exports, list_level_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('WListLevel Validation Testing', function () {
        afterEach(function () {
            list_level_1.WListLevel.clear();
        });
        it('List Level  Testing', function () {
            console.log('List Level  Testing');
            var list = new list_level_1.WListLevel(undefined);
            list.followCharacter = 'Tab';
            list.listLevelPattern = 'Arabic';
            list.followCharacter;
            list.listLevelPattern;
            expect('').toBe('');
            list.destroy();
            expect(list.characterFormat).toBe(undefined);
            expect(function () { list.destroy(); }).not.toThrowError();
        });
    });
});
