define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/index", "../test-helper.spec", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history", "../../src/document-editor/implementation/dialogs/hyperlink-dialog"], function (require, exports, document_editor_1, ej2_base_1, index_1, test_helper_spec_1, index_2, editor_history_1, hyperlink_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('insert hyperlink validation', function () {
        var editor;
        var event;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('In backward selection edit hyperlink validation', function () {
            console.log('In backward selection edit hyperlink validation');
            editor.openBlank();
            editor.editorModule.insertText('sample');
            editor.selection.handleLeftKey();
            editor.selection.handleLeftKey();
            editor.selection.handleLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.editorModule.insertHyperlinkInternal('www.google.com', editor.selection.text, false);
            editor.selection.handleLeftKey();
            expect(editor.selection.getHyperlinkField()).not.toBeUndefined();
            var fieldBegin = editor.selection.getHyperlinkField();
            expect(editor.selection.getFieldCode(fieldBegin)).toBe('HYPERLINK "www.google.com"');
        });
    });
    describe('Edit hyperlink validation', function () {
        var editor;
        var event;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableHyperlinkDialog: true });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, editor_history_1.EditorHistory, hyperlink_dialog_1.HyperlinkDialog);
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('In backward selection insert hyperlink validation in Multiple paragraph', function () {
            console.log('In backward selection insert hyperlink validation in Multiple paragraph');
            editor.openBlank();
            editor.editorModule.insertText('sample');
            editor.editorModule.onEnter();
            editor.editorModule.insertText('sample');
            editor.editorModule.onEnter();
            editor.editorModule.insertText('sample');
            editor.selection.handleLeftKey();
            editor.selection.handleLeftKey();
            editor.selection.handleLeftKey();
            editor.selection.handleShiftUpKey();
            editor.selection.handleShiftUpKey();
            editor.editorModule.insertHyperlinkInternal('s', editor.selection.text, false);
            editor.selection.handleLeftKey();
            expect(editor.selection.getHyperlinkField()).not.toBeUndefined();
            var fieldBegin = editor.selection.getHyperlinkField();
            expect(editor.selection.getFieldCode(fieldBegin)).toBe('HYPERLINK "s"');
        });
        it('In backward selection edit hyperlink validation in Multiple paragraph', function () {
            console.log('In backward selection edit hyperlink validation in Multiple paragraph');
            editor.hyperlinkDialogModule.show();
            editor.hyperlinkDialogModule.urlTextBox.value = 'ss';
            editor.hyperlinkDialogModule.onInsertButtonClick();
            editor.selection.handleUpKey();
            expect(editor.selection.getHyperlinkField()).not.toBeUndefined();
            var fieldBegin = editor.selection.getHyperlinkField();
            expect(editor.selection.getFieldCode(fieldBegin)).toBe('HYPERLINK "ss"');
        });
    });
    describe('Remove Hyperlink valdiation', function () {
        var editor;
        var event;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableHyperlinkDialog: true });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, editor_history_1.EditorHistory, hyperlink_dialog_1.HyperlinkDialog);
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Hyerplink using enter', function () {
            console.log('Hyerplink using enter');
            editor.openBlank();
            editor.editorModule.insertText('www.google.com');
            editor.editorModule.onEnter();
            editor.selection.handleUpKey();
            editor.selection.handleRightKey();
            expect(editor.selection.getHyperlinkField()).not.toBeUndefined();
            var fieldBegin = editor.selection.getHyperlinkField();
            expect(editor.selection.getFieldCode(fieldBegin)).not.toBeUndefined();
        });
        it('remove Hyperlink validation', function () {
            console.log('remove Hyperlink validation');
            editor.editor.removeHyperlink();
            expect(editor.selection.start.paragraph.childWidgets[0].children.length).toBe(1);
        });
        it('redo after remove Hyperlink validation', function () {
            console.log('redo after remove Hyperlink validation');
            editor.editorHistory.redo();
            expect(editor.selection.start.paragraph.childWidgets[0].children.length).toBe(1);
        });
        it('Multiple undo and redo after remove Hyperlink validation', function () {
            console.log('Multiple undo and redo after remove Hyperlink validation');
            var i = 1;
            while (i <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                i++;
            }
            expect(editor.selection.start.paragraph.childWidgets[0].children.length).toBe(1);
        });
    });
});
