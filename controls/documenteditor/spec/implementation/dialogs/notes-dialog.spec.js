define(["require", "exports", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/dialogs/notes-dialog", "../../../src/index", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/index"], function (require, exports, document_editor_1, notes_dialog_1, index_1, ej2_base_1, test_helper_spec_1, editor_history_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Insert Notes Dialog Test Case Validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, notes_dialog_1.NotesDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableFootnoteAndEndnoteDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            editor = undefined;
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('On Apply Button testing', function () {
            console.log('On Apply Button testing');
            dialog = new notes_dialog_1.NotesDialog(editor.documentHelper);
            editor.editor.insertEndnote();
            dialog.show();
            dialog.onInsertFootnoteClick();
            dialog.destroy();
        });
        it('On Cancel Button testing', function () {
            console.log('On Cancel Button testing');
            dialog = new notes_dialog_1.NotesDialog(editor.documentHelper);
            dialog.show();
            dialog.onCancelButtonClick();
            dialog.destroy();
        });
    });
    describe('Changing Formats', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, notes_dialog_1.NotesDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableFootnoteAndEndnoteDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            editor = undefined;
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Changing the ENdnote Number Format', function () {
            console.log('Changing the ENdnote number Format');
            dialog = new notes_dialog_1.NotesDialog(editor.documentHelper);
            editor.openBlank();
            editor.editor.insertEndnote();
            editor.editor.insertText("Hello");
            dialog.show();
            var notesList = dialog.notesList;
            notesList.value = 'a, b, c, ...';
            dialog.onInsertFootnoteClick();
            expect(editor.documentHelper.selection.sectionFormat.endnoteNumberFormat).toBe('LowerCaseLetter');
            editor.selection.moveToDocumentStart();
            editor.editor.insertEndnote();
            dialog.show();
            var notesLists = dialog.notesList;
            notesLists.value = 'A, B, C, ...';
            dialog.onInsertFootnoteClick();
            expect(editor.documentHelper.selection.sectionFormat.endnoteNumberFormat).toBe('UpperCaseLetter');
        });
    });
    describe('History preservation of endnote and foot note numberformats', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, notes_dialog_1.NotesDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableFootnoteAndEndnoteDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            editor = undefined;
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Endnote History Preservation', function () {
            console.log('Endnote History Preservation');
            dialog = new notes_dialog_1.NotesDialog(editor.documentHelper);
            editor.openBlank();
            editor.editor.insertEndnote();
            editor.editor.insertText("Hello");
            dialog.show();
            var notesList = dialog.notesList;
            notesList.value = 'A, B, C, ...';
            dialog.onInsertFootnoteClick();
            dialog.show();
            var notesLists = dialog.notesList;
            notesLists.value = 'a, b, c, ...';
            dialog.onInsertFootnoteClick();
            editor.editorHistory.undo();
            expect(editor.documentHelper.selection.sectionFormat.endnoteNumberFormat).toBe('UpperCaseLetter');
        });
    });
});
