define(["require", "exports", "../../../src/document-editor/implementation/list/abstract-list"], function (require, exports, abstract_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('WAbstractList Validation Testing', function () {
        it('Abstract List  Testing', function () {
            console.log('Abstract List  Testing');
            var abstractList = new abstract_list_1.WAbstractList();
            expect(abstractList.levels.length).toBe(0);
        });
    });
});
