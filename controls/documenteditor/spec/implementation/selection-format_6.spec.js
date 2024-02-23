define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/index", "../../src/index", "../../src/document-editor/implementation/editor-history/index", "../test-helper.spec"], function (require, exports, document_editor_1, ej2_base_1, index_1, index_2, index_3, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Selection Paragraph format auto space validation', function () {
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
            editor.editor.insertText('Hello world');
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
        it('Paragraph format space before auto apply validation', function () {
            console.log('Paragraph format space before auto  apply validation');
            editor.selection.selectAll();
            editor.selection.paragraphFormat.spaceBeforeAuto = true;
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(true);
            editor.editorHistory.undo();
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(false);
        });
        it('Paragraph format space after auto apply validation', function () {
            console.log('Paragraph format space after auto  apply validation');
            editor.selection.selectAll();
            editor.selection.paragraphFormat.spaceAfterAuto = true;
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(true);
            editor.editorHistory.undo();
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(false);
        });
        it('both space after and before apply validation', function () {
            console.log('both space after and before apply validation');
            editor.selection.selectAll();
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(false);
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(false);
            editor.selection.paragraphFormat.spaceBeforeAuto = true;
            editor.selection.paragraphFormat.spaceAfterAuto = true;
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(true);
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(true);
            editor.editorHistory.undo();
            editor.editorHistory.undo();
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(false);
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(false);
        });
        it('select multiple paragraph and apply space before auto validation', function () {
            console.log('inserting multiple paragraph and apply auto space validation');
            editor.editor.onEnter();
            editor.editor.insertText('Sample');
            editor.selection.selectParagraph();
            editor.selection.paragraphFormat.spaceBeforeAuto = true;
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(true);
            editor.selection.moveUp();
            editor.selection.selectParagraph();
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(false);
            editor.selection.selectAll();
            expect(editor.selection.paragraphFormat.spaceBeforeAuto).toBe(undefined);
            editor.editorHistory.undo();
        });
        it('select multiple paragraph and apply space after auto validation', function () {
            console.log('inserting multiple paragraph and apply auto space validation');
            editor.selection.selectParagraph();
            editor.selection.paragraphFormat.spaceAfterAuto = false;
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(false);
            editor.selection.moveUp();
            editor.selection.selectParagraph();
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(false);
            editor.selection.paragraphFormat.spaceAfterAuto = true;
            editor.selection.selectAll();
            expect(editor.selection.paragraphFormat.spaceAfterAuto).toBe(undefined);
        });
    });
});
