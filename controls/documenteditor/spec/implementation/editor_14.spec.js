define(["require", "exports", "../../src/document-editor/document-editor", "../../src/document-editor/index", "@syncfusion/ej2-base", "../../src/index", "../test-helper.spec", "../../src/index"], function (require, exports, document_editor_1, index_1, ej2_base_1, index_2, test_helper_spec_1, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Empty selection check whether selection is in field', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_2.EditorHistory);
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
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('selection is in text', function () {
            console.log('selection is in text');
            editor.editor.insertText('Hello World');
            editor.selection.handleHomeKey();
            editor.selection.handleRightKey();
            expect(editor.selection.isInField).toBe(false);
        });
        it('select Field validation in text', function () {
            console.log('select Field validation in text');
            editor.selection.selectField();
            expect(editor.selection.isEmpty).toBe(true);
        });
        it('selection is in field', function () {
            console.log('selection is in field');
            editor.openBlank();
            var text = 'Lead#Email';
            editor.editor.insertField('MERGEFIELD ' + text + ' \\* MERGEFORMAT');
            editor.selection.handleHomeKey();
            editor.selection.handleRightKey();
            expect(editor.selection.isInField).toBe(true);
        });
        it('select Field validation in field', function () {
            console.log('select Field validation in field');
            editor.selection.selectField();
            expect(editor.selection.isEmpty).toBe(false);
        });
        it('Delete after select field', function () {
            console.log('Delete after select field');
            editor.editor.delete();
            expect(editor.selection.start.paragraph.isEmpty()).toBe(true);
        });
        it('Undo after select and delete field', function () {
            console.log('Undo after select and delete field');
            editor.editorHistory.undo();
            expect(editor.selection.start.paragraph.isEmpty()).toBe(false);
        });
        it('redo after select and delete field', function () {
            console.log('redo after select and delete field');
            editor.editorHistory.undo();
            expect(editor.selection.start.paragraph.isEmpty()).toBe(true);
        });
    });
    describe('Non-selection check whether selection is in field', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_2.EditorHistory);
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
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('selection is in field', function () {
            console.log('selection is in field');
            var text = 'Lead#Email';
            editor.editor.insertField('MERGEFIELD ' + text + ' \\* MERGEFORMAT');
            editor.selection.handleHomeKey();
            editor.selection.handleRightKey();
            editor.selection.handleRightKey();
            editor.selection.handleShiftRightKey();
            editor.selection.handleShiftRightKey();
            editor.selection.handleShiftRightKey();
            expect(editor.selection.isInField).toBe(true);
        });
        it('select Field validation in field', function () {
            console.log('select Field validation in field');
            editor.selection.selectField();
            expect(editor.selection.isEmpty).toBe(false);
        });
        it('Delete after select field', function () {
            console.log('Delete after select field');
            editor.editor.delete();
            expect(editor.selection.start.paragraph.isEmpty()).toBe(true);
        });
        it('Undo after select and delete field', function () {
            console.log('Undo after select and delete field');
            editor.editorHistory.undo();
            expect(editor.selection.start.paragraph.isEmpty()).toBe(false);
        });
        it('redo after select and delete field', function () {
            console.log('redo after select and delete field');
            editor.editorHistory.undo();
            expect(editor.selection.start.paragraph.isEmpty()).toBe(true);
        });
    });
    describe('Insert bookmark validaiton for splitted paragraph', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ isReadOnly: false, enableSelection: true, enableEditor: true, enableEditorHistory: true, enableSfdtExport: true });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_2.EditorHistory, index_1.SfdtExport);
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
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('insert bookmark', function () {
            console.log('insert bookmark');
            editor.selection.sectionFormat.pageWidth = 300;
            editor.selection.sectionFormat.pageHeight = 100;
            editor.editor.insertText('ert reteterterteterterterte te treteterter t ');
            editor.selection.selectAll();
            editor.editor.insertBookmark('sample');
            expect(editor.documentHelper.bookmarks.keys.length).toBe(1);
        });
        it('undo after insert bookmark splitted paragraph', function () {
            console.log('undo after insert bookmark splitted paragraph');
            editor.editorHistory.undo();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(0);
        });
        it('redo after insert bookmark splitted paragraph', function () {
            console.log('redo after insert bookmark splitted paragraph');
            editor.editorHistory.redo();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(1);
        });
        it('navigation for bookmark splitted paragraph', function () {
            console.log('navigation for bookmark splitted paragraph');
            editor.selection.navigateBookmark('sample');
            expect(editor.selection.isEmpty).toBe(false);
        });
    });
    describe('Bookmark remove validation for two paragraph', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ isReadOnly: false, enableSelection: true, enableEditor: true, enableEditorHistory: true, enableSfdtExport: true });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_2.EditorHistory, index_1.SfdtExport);
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
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('insert bookmark', function () {
            console.log('insert bookmark');
            editor.editor.onEnter();
            editor.selection.selectAll();
            editor.editor.insertBookmark('sample');
            expect(editor.documentHelper.bookmarks.keys.length).toBe(1);
        });
        it('on backspace before splitted paragraph', function () {
            console.log('on backspace before splitted paragraph');
            editor.selection.handleDownKey();
            editor.editor.onBackSpace();
            editor.editor.onBackSpace();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(0);
        });
        it('undo after on backspace before splitted paragraph', function () {
            console.log('undo after on backspace before splitted paragraph');
            editor.editorHistory.undo();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(1);
        });
        it('redo after on backspace before splitted paragraph', function () {
            console.log('redo after on backspace before splitted paragraph');
            editor.editorHistory.redo();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(0);
        });
    });
});
