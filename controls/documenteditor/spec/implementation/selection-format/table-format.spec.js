define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/editor-history/index", "../../test-helper.spec"], function (require, exports, document_editor_1, ej2_base_1, index_1, index_2, index_3, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Selection Table Format Validation', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:100%;height:500px' });
            document.body.innerHTML = '';
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_3.EditorHistory, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true, enableEditorHistory: true });
            editor.acceptTab = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Simple document with page break', function () {
            editor.editor.insertTable(2, 2);
            editor.selection.tableFormat.title = "Title";
            editor.selection.tableFormat.description = "Description";
            expect(editor.selection.tableFormat.title).toEqual("Title");
            expect(editor.selection.tableFormat.description).toEqual("Description");
        });
    });
});
