define(["require", "exports", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/selection/selection", "../../../src/document-editor/implementation/context-menu", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/document-editor/implementation/editor/editor"], function (require, exports, document_editor_1, selection_1, context_menu_1, ej2_base_1, test_helper_spec_1, editor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Selection API', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:1100px;height:700px' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, context_menu_1.ContextMenu);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 750);
        });
        it('isTable Selected false', function () {
            console.log('isTable Selected false');
            expect(editor.selection.isTableSelected()).toBe(false);
        });
        it('isTableSelected API inside table', function () {
            console.log('isTableSelected API inside table');
            editor.editor.insertTable(2, 2);
            expect(editor.selection.isTableSelected()).toBe(false);
        });
        it('IsTableSelected API by selecting single column', function () {
            console.log('IsTableSelected API by selecting single column');
            editor.selection.selectColumn();
            expect(editor.selection.isTableSelected()).toBe(false);
        });
        it('IsTableSelected API by selecting single row', function () {
            console.log('IsTableSelected API by selecting single row');
            editor.selection.selectPosition(editor.documentStart, editor.documentStart);
            editor.selection.selectRow();
            expect(editor.selection.isTableSelected()).toBe(false);
        });
        it('IsTableSelected API by selecting whole table', function () {
            console.log('IsTableSelected API by selecting whole table');
            editor.selection.selectTable();
            expect(editor.selection.isTableSelected()).toBe(true);
        });
    });
    describe('Para mark selection validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:1100px;height:700px' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, context_menu_1.ContextMenu);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 750);
        });
    });
    describe('Bookmarks API validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:1100px;height:700px' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, context_menu_1.ContextMenu);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 750);
        });
        it('selection at end of bookmark', function () {
            console.log('selection at end of bookmark');
            editor.selection.handleEndKey();
            expect(editor.selection.bookmarks.length).toBe(0);
        });
    });
});
