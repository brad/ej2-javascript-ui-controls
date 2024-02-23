define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/index", "../../src/index", "../../src/document-editor/implementation/editor-history/index", "../test-helper.spec"], function (require, exports, document_editor_1, ej2_base_1, index_1, index_2, index_3, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Selection Table format Bidi validation in table empty selection', function () {
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
        it('For table with bidi true', function () {
            console.log('For table with bidi true');
            editor.editor.insertTable(2, 2);
            editor.editor.insertText('سشةحمث');
            editor.selection.handleTabKey(true, false);
            editor.editor.insertText('سشةحمث');
            editor.selection.handleTabKey(true, false);
            editor.editor.insertText('سشةحمث');
            editor.selection.handleTabKey(true, false);
            editor.editor.insertText('سشةحمث');
            editor.selection.tableFormat.bidi = true;
            expect(editor.selection.tableFormat.bidi).toBe(true);
        });
        it('undo after bidi for tabl format is true', function () {
            console.log('undo after bidi for tabl format is true');
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.bidi).toBe(false);
        });
        it('redo after bidi for tabl format is true', function () {
            console.log('redo after bidi for tabl format is true');
            editor.editorHistory.redo();
            expect(editor.selection.tableFormat.bidi).toBe(true);
        });
        it('Multiple undo and redo after bidi for tabl format is true', function () {
            console.log('Multiple undo and redo after bidi for tabl format is true');
            for (var i = 0; i < 5; i++) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
            }
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.bidi).toBe(false);
        });
    });
    describe('Selection Table format Bidi validation in table with non empty selection', function () {
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
        it('For table with bidi true', function () {
            console.log('For table with bidi true');
            editor.editor.insertTable(2, 2);
            editor.editor.insertText('سشةحمث');
            editor.selection.handleTabKey(true, false);
            editor.editor.insertText('سشةحمث');
            editor.selection.handleTabKey(true, false);
            editor.editor.insertText('سشةحمث');
            editor.selection.handleTabKey(true, false);
            editor.editor.insertText('سشةحمث');
            editor.selection.selectCell();
            editor.selection.tableFormat.bidi = true;
            expect(editor.selection.tableFormat.bidi).toBe(true);
        });
        it('undo after bidi for tabl format is true', function () {
            console.log('undo after bidi for tabl format is true');
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.bidi).toBe(false);
        });
        it('redo after bidi for tabl format is true', function () {
            console.log('redo after bidi for tabl format is true');
            editor.editorHistory.redo();
            expect(editor.selection.tableFormat.bidi).toBe(true);
        });
        it('Multiple undo and redo after bidi for tabl format is true', function () {
            console.log('Multiple undo and redo after bidi for tabl format is true');
            for (var i = 0; i < 5; i++) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
            }
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.bidi).toBe(false);
        });
    });
    describe('Selection Paragraph format keepWithNext validation', function () {
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
        it('undo redo for  paragraph format keepWithNext true', function () {
            console.log('undo redo for  paragraph format keepWithNext true');
            documentHelper.selection.paragraphFormat.keepWithNext = true;
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepWithNext).toBe(true);
            editor.editorHistory.undo();
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepWithNext).toBe(false);
            editor.editorHistory.redo();
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepWithNext).toBe(true);
        });
        it('Multiple undo and redo after keepWithNext for paragraph format is true', function () {
            console.log('Multiple undo and redo after keepWithNext for paragraph format is true');
            for (var i = 0; i < 5; i++) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
            }
            editor.editorHistory.undo();
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepWithNext).toBe(false);
        });
    });
    describe('Selection Paragraph format keepLinesTogether validation', function () {
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
        it('undo redo for  paragraph format keepLinesTogether true', function () {
            console.log('undo redo for  paragraph format keepLinesTogether true');
            documentHelper.selection.paragraphFormat.keepLinesTogether = true;
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepLinesTogether).toBe(true);
            editor.editorHistory.undo();
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepLinesTogether).toBe(false);
            editor.editorHistory.redo();
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepLinesTogether).toBe(true);
        });
        it('Multiple undo and redo after keepLinesTogether for paragraph format is true', function () {
            console.log('Multiple undo and redo after keepLinesTogether for paragraph format is true');
            for (var i = 0; i < 5; i++) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
            }
            editor.editorHistory.undo();
            expect(documentHelper.selection.start.paragraph.paragraphFormat.keepLinesTogether).toBe(false);
        });
    });
});
