define(["require", "exports", "../../../src/document-editor/implementation/context-menu", "@syncfusion/ej2-base", "../../../src/document-editor/implementation/selection/selection", "../../../src/document-editor/implementation/editor/editor", "../../test-helper.spec", "../../../src/document-editor/implementation/spell-check/spell-checker", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/search/index", "../../../src/document-editor/implementation/dialogs/spellCheck-dialog"], function (require, exports, context_menu_1, ej2_base_1, selection_1, editor_1, test_helper_spec_1, spell_checker_1, document_editor_1, index_1, spellCheck_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Spell Checker dialog API', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:1100px;height:700px' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, context_menu_1.ContextMenu, spell_checker_1.SpellChecker, index_1.Search, spellCheck_dialog_1.SpellCheckDialog);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, enableContextMenu: true, enableSpellCheck: true, enableSearch: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Spell checker dialog module name validation', function () {
            console.log('Spell checker dialog module name validation');
            expect(editor.spellCheckDialogModule.getModuleName()).toBe('SpellCheckDialog');
        });
        it('custom header validation', function () {
            console.log('custom header validation');
            editor.openBlank();
            editor.serviceUrl = undefined;
            editor.headers = [{ "syncfusion": "true" }];
            var httpRequest = new XMLHttpRequest();
            expect(function () { editor.spellChecker.setCustomHeaders(httpRequest); }).toThrowError();
        });
    });
});
