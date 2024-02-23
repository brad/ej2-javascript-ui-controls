define(["require", "exports", "../../../src/document-editor/implementation/list/list-level", "../../../src/document-editor/implementation/list/level-override"], function (require, exports, list_level_1, level_override_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('WLevelOverride Validation Testing', function () {
        it('Level Override  Testing', function () {
            console.log('Level Override  Testing');
            var levelOverride = new level_override_1.WLevelOverride();
            levelOverride.startAt = 6;
            expect(levelOverride.startAt).toBe(6);
            levelOverride.destroy();
            expect(levelOverride.overrideListLevel).toBe(undefined);
            expect(function () { levelOverride.destroy(); }).not.toThrowError();
        });
        it('Level Override  Clone validation', function () {
            console.log('Level Override  Clone validation');
            var levelOverride = new level_override_1.WLevelOverride();
            levelOverride.startAt = 6;
            levelOverride.overrideListLevel = new list_level_1.WListLevel(levelOverride);
            var clonedOverride = levelOverride.clone();
            expect(clonedOverride.overrideListLevel).not.toBe(undefined);
        });
    });
});
