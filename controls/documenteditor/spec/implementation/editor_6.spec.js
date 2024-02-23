define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/index", "../test-helper.spec", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, document_editor_1, ej2_base_1, index_1, test_helper_spec_1, index_2, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('ApplyStyle API validation - 1', function () {
        var editor = undefined;
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
        it('set ClearDirectFormatting as true', function () {
            console.log('set ClearDirectFormatting as true');
            editor.editor.insertText('Sample');
            editor.selection.selectAll();
            editor.selection.characterFormat.fontSize = 24;
            editor.selection.characterFormat.fontFamily = 'Algerian';
            editor.selection.paragraphFormat.textAlignment = 'Right';
            editor.editor.applyStyle('Heading 1', true);
            expect(editor.selection.characterFormat.fontFamily).toBe('Calibri Light');
            expect(editor.selection.characterFormat.fontSize).toBe(16);
            expect(editor.selection.paragraphFormat.textAlignment).toBe('Left');
        });
        it('undo -after applyStyle validation', function () {
            console.log('undo -after applyStyle validation');
            editor.editorHistory.undo();
            expect(editor.selection.characterFormat.fontFamily).toBe('Algerian');
            expect(editor.selection.characterFormat.fontSize).toBe(24);
            expect(editor.selection.paragraphFormat.textAlignment).toBe('Right');
        });
        it('redo -after applyStyle validation', function () {
            console.log('redo -after applyStyle validation');
            editor.editorHistory.redo();
            expect(editor.selection.characterFormat.fontFamily).toBe('Calibri Light');
            expect(editor.selection.characterFormat.fontSize).toBe(16);
            expect(editor.selection.paragraphFormat.textAlignment).toBe('Left');
        });
        it('multiple undo and redo -after applyStyle validation', function () {
            console.log('multiple undo and redo -after applyStyle validation');
            var count = 1;
            while (count <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                count++;
            }
            expect(editor.selection.characterFormat.fontFamily).toBe('Calibri Light');
            expect(editor.selection.characterFormat.fontSize).toBe(16);
            expect(editor.selection.paragraphFormat.textAlignment).toBe('Left');
        });
    });
    describe('ApplyStyle API validation - 2', function () {
        var editor = undefined;
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
        it('The paragraph already contains style and direct formatting, set ClearDirectFormatting as true', function () {
            console.log('The paragraph already contains style and direct formatting, set ClearDirectFormatting as true');
            editor.editor.insertText('Sample');
            editor.editor.applyStyle('Heading 1', true);
            editor.selection.selectAll();
            editor.selection.characterFormat.fontSize = 24;
            editor.editor.applyStyle('Heading 4', true);
            expect(editor.selection.characterFormat.italic).toBe(true);
            expect(editor.selection.characterFormat.fontSize).toBe(11);
        });
        it('undo -after applyStyle validation', function () {
            console.log('undo -after applyStyle validation');
            editor.editorHistory.undo();
            expect(editor.selection.characterFormat.italic).toBe(false);
            expect(editor.selection.characterFormat.fontSize).toBe(24);
        });
        it('redo -after applyStyle validation', function () {
            console.log('redo -after applyStyle validation');
            editor.editorHistory.redo();
            expect(editor.selection.characterFormat.italic).toBe(true);
            expect(editor.selection.characterFormat.fontSize).toBe(11);
        });
        it('multiple undo and redo -after applyStyle validation', function () {
            console.log('multiple undo and redo -after applyStyle validation');
            var count = 1;
            while (count <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                count++;
            }
            expect(editor.selection.characterFormat.italic).toBe(true);
            expect(editor.selection.characterFormat.fontSize).toBe(11);
        });
    });
    describe('ApplyStyle API validation - 2 without History', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection);
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
    });
    describe('Adding bookmark link in empty paragraph validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true, enableBookmarkDialog: true });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, index_1.BookmarkDialog);
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
    });
    describe('Apply Character format in empty selection and paragraph is Empty', function () {
        var editor = undefined;
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
        it('Apply character format value and paragraph is empty', function () {
            console.log('Apply character format value and paragraph is empty');
            editor.selection.characterFormat.bold = true;
            editor.selection.handleRightKey();
            expect(editor.selection.characterFormat.bold).toBe(true);
        });
        it('undo -after apply character format in empty selection', function () {
            console.log('undo -after apply character format in empty selection');
            editor.editorHistory.undo();
            expect(editor.selection.characterFormat.bold).toBe(false);
        });
        it('redo -after apply character format in empty selection', function () {
            console.log('redo -after apply character format in empty selection');
            editor.editorHistory.redo();
            expect(editor.selection.characterFormat.bold).toBe(true);
        });
        it('multiple undo and redo -after apply character format in empty selection', function () {
            console.log('multiple undo and redo -after apply character format in empty selection');
            var count = 1;
            while (count <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                count++;
            }
            expect(editor.selection.characterFormat.bold).toBe(true);
        });
    });
    describe('Apply Character format in empty selection and paragraph is not Empty', function () {
        var editor = undefined;
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
        it('Apply character format value and paragraph is empty', function () {
            console.log('Apply character format value and paragraph is empty');
            editor.editor.insertText('Sample');
            editor.selection.characterFormat.fontSize = 48;
            editor.selection.characterFormat.fontColor = 'Red';
            expect(editor.selection.characterFormat.fontSize).toBe(48);
            expect(editor.selection.characterFormat.fontColor).toBe('Red');
        });
        it('Enter -after apply character format and paragraph is not empty', function () {
            console.log('Enter -after apply character format and paragraph is not empty');
            editor.editor.onEnter();
            expect(editor.selection.characterFormat.fontSize).toBe(48);
            expect(editor.selection.characterFormat.fontColor).toBe('Red');
        });
        it('Undo - Enter -after apply character format and paragraph is not empty', function () {
            console.log('Undo - Enter -after apply character format and paragraph is not empty');
            editor.editorHistory.undo();
            editor.editorHistory.undo();
            expect(editor.selection.characterFormat.fontSize).toBe(11);
        });
    });
});
