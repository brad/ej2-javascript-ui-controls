define(["require", "exports", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/editor/editor", "../../../src/document-editor/implementation/selection/selection", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/document-editor/implementation/writer/sfdt-export", "../../../src/document-editor/implementation/viewer/page"], function (require, exports, ej2_base_1, test_helper_spec_1, document_editor_1, editor_1, selection_1, editor_history_1, sfdt_export_1, page_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Track changes Validation', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        it('Enabling Tracking Changes  And enabling Readonly mode', function () {
            console.log('Enabling Tracking Changes And enabling Readonly mode');
            container.currentUser = "Guest";
            container.editor.insertText("Hello");
            container.enableTrackChanges = true;
            container.editor.insertText("world");
            container.isReadOnly = true;
            container.revisions.acceptAll();
            var count = container.revisions.changes.length;
            expect(count).toBe(1);
        });
    });
    describe('Track changes Pane in RTL Validation', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
            container = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
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
        it('Track Changes Pane close button validation', function () {
            console.log('Track Changes Pane close button validation');
            var left = container.trackChangesPane.closeButton.style.left;
            var right = container.trackChangesPane.closeButton.style.right;
            expect(left).toBe('1px');
            expect(right).toBe('');
        });
    });
    describe('Track changes in Table validation', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
            container = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
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
        it('Delete Table validation when Track Changes is enabled', function () {
            console.log('Delete Table validation when Track Changes is enabled');
            container.enableTrackChanges = true;
            container.currentUser = "Guest User";
            container.editor.insertTable(2, 2);
            container.selection.moveToDocumentStart();
            container.editor.deleteTable();
            var flag = 0;
            if (!(container.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] instanceof page_1.TableWidget)) {
                flag = 1;
            }
            expect(flag).not.toBe(0);
        });
    });
    describe('Track changes Select all and replace text', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
            container = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true, enableRtl: true });
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
        it('Track changes Select all and replace text and insert new para validation', function () {
            console.log('Track changes Select all and replace text and insert new para validation');
            container.enableTrackChanges = true;
            container.editor.insertText("Hello");
            container.selection.selectAll();
            container.editor.insertText("Hello");
            container.editor.onEnter();
            container.editor.insertText("World");
            var count = container.revisions.changes.length;
            expect(count).toBe(1);
        });
    });
});
