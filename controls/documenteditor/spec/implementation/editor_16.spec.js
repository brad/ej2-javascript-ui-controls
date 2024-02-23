define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/index", "../test-helper.spec", "../../src/index"], function (require, exports, document_editor_1, ej2_base_1, index_1, test_helper_spec_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Restart Numbering List validation - 1', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, index_1.EditorHistory);
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
        it('Apply restart numbering with different numberformat', function () {
            console.log('Apply restart numbering with different numberformat');
            editor.editor.insertText('Sample');
            editor.editor.onEnter();
            editor.editor.insertText('Sample');
            editor.editor.onEnter();
            editor.editor.insertText('Sample');
            editor.selection.selectAll();
            editor.editor.applyNumbering('.%1', 'Arabic');
            editor.selection.handleUpKey();
            editor.selection.handleDownKey();
            editor.editor.applyRestartNumbering(editor.selection);
            expect(editor.selection.start.currentWidget.children[0].text).toBe('.1');
        });
        it('undo after restart numbering list', function () {
            console.log('undo after restart numbering list');
            editor.editorHistory.undo();
            expect(editor.selection.start.currentWidget.children[0].text).toBe('.2');
        });
        it('redo after restart numbering list', function () {
            console.log('redo after restart numbering list');
            editor.editorHistory.redo();
            expect(editor.selection.start.currentWidget.children[0].text).toBe('.1');
        });
    });
    describe('Restart Numbering List validation - 2', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, index_1.EditorHistory);
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
        it('Ensuring multiple list level for restart numbering', function () {
            console.log('Ensuring multiple list level for restart numbering');
            editor.editor.insertText('Sample');
            editor.editor.onEnter();
            editor.editor.insertText('Sample');
            editor.editor.onEnter();
            editor.editor.insertText('Sample');
            editor.selection.selectAll();
            editor.editor.applyNumbering('.%1', 'Arabic');
            editor.selection.handleDownKey();
            editor.selection.handleHomeKey();
            editor.selection.handleTabKey(true, false);
            editor.editor.applyBullet('\uf0b7', 'Symbol');
            editor.selection.handleUpKey();
            editor.editor.applyRestartNumbering(editor.selection);
            expect(editor.selection.start.currentWidget.children[0].text).toBe('.1');
            editor.selection.handleDownKey();
            expect(editor.selection.start.currentWidget.children[0].text).not.toBe('.1');
        });
        it('undo after multiple list level for restart numbering list', function () {
            console.log('undo after multiple list level for restart numbering list');
            editor.editorHistory.undo();
            expect(editor.selection.start.currentWidget.children[0].text).toBe('.2');
        });
        it('redo after multiple list level for restart numbering list', function () {
            console.log('redo after multiple list level for restart numbering list');
            editor.editorHistory.redo();
            expect(editor.selection.start.currentWidget.children[0].text).toBe('.1');
        });
    });
    describe('Page break revision validation', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, index_1.EditorHistory);
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
        it('Page break revision validation', function () {
            editor.openBlank();
            editor.editor.insertText('hello');
            editor.editor.onEnter();
            expect(editor.revisions.length).toBe(0);
        });
    });
    describe('Pargrapgh indent on table creation validtaion', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true });
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
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Pargrapgh indent on table creation validtaion', function () {
            editor.editor.insertText('hello');
            editor.selection.selectAll();
            editor.editor.onApplyParagraphFormat('leftIndent', 200, true, false);
            editor.selection.handleHomeKey();
            editor.editor.insertTable(2, 2);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets.length).toBeGreaterThan(0);
        });
    });
    describe('Character format preservation for paste', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, index_1.EditorHistory);
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
        it('Text only paste', function () {
            editor.openBlank();
            editor.selection.characterFormat.bold = true;
            editor.editorModule.insertText('Syncfusion');
            editor.editorModule.onEnter();
            editor.editor.pasteContents('Software');
            editor.editor.applyPasteOptions('KeepTextOnly');
            expect(editor.selection.characterFormat.bold).toBe(true);
        });
    });
    describe('Validate the inserted form fields order', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, index_1.EditorHistory);
            container = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true });
            container.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            container.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            container.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            container.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            container.appendTo('#container');
        });
        afterAll(function (done) {
            container.destroy();
            document.body.removeChild(document.getElementById('container'));
            container = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Check the order of Form Fields', function () {
            console.log('Check the order of Form Fields');
            container.openBlank();
            container.editor.insertText("First Paragraph");
            container.editor.onEnter();
            container.editor.insertText("Second Paragraph");
            container.editor.insertFormField('CheckBox');
            container.selection.moveToLineStart();
            container.editor.insertFormField('Text');
            var formFieldNames = container.getFormFieldNames();
            expect(formFieldNames[0]).toEqual('Text1');
            expect(formFieldNames[1]).toEqual('CheckBox1');
        });
    });
    describe('remove a table cell with bookmark Element', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, index_1.EditorHistory);
            container = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true });
            container.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            container.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            container.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            container.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            container.appendTo('#container');
        });
        afterAll(function (done) {
            container.destroy();
            document.body.removeChild(document.getElementById('container'));
            container = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Remove the row', function () {
            console.log('Remove the row with bookmark inside.');
            container.openBlank();
            container.editor.insertTable(2, 2);
            container.selection.select("0;0;0;0;0;0", "0;0;1;1;0;0");
            container.editor.insertBookmark("bookmark1");
            container.selection.select("0;0;1;1;0;0", "0;0;1;1;0;0");
            container.editor.deleteRow();
            expect(container.documentHelper.bookmarks.keys.length).toEqual(0);
        });
        it('Remove the column', function () {
            console.log('Remove the column with bookmark inside.');
            container.openBlank();
            container.editor.insertTable(2, 2);
            container.selection.select("0;0;0;0;0;0", "0;0;1;1;0;0");
            container.editor.insertBookmark("bookmark1");
            container.selection.select("0;0;1;1;0;0", "0;0;1;1;0;0");
            container.editor.deleteColumn();
            expect(container.documentHelper.bookmarks.keys.length).toEqual(0);
        });
    });
});
