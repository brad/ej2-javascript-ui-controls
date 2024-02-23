define(["require", "exports", "@syncfusion/ej2-base", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/editor/editor", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/index", "../../test-helper.spec"], function (require, exports, ej2_base_1, document_editor_1, editor_1, editor_history_1, index_1, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Automatic text color', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            var defaultCharacterFormat = {
                fontColor: "Empty",
                fontFamily: 'Times New Roman',
                fontSize: 8,
                backgroundColor: "#000000"
            };
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, index_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.setDefaultCharacterFormat(defaultCharacterFormat);
            editor.appendTo('#container');
        });
        afterAll(function () {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
        });
        it('text color', function () {
            console.log('text color');
            expect(editor.selection.start.paragraph.characterFormat.fontColor).toBe("Empty");
        });
    });
});
