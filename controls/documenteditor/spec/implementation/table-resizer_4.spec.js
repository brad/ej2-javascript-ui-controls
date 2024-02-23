define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../test-helper.spec", "../../src/index", "../../src/document-editor/implementation/editor/editor-helper", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, editor_helper_1, index_2, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Table Column resizing validation with selection', function () {
        var editor = undefined;
        beforeEach(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:1280px;height:500px'
            });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            editor.openBlank();
        });
        afterEach(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Resize Table Row', function () {
            console.log('Resize Table Row');
            editor.editor.insertTable(2, 2);
            var event = { offsetX: 557, offsetY: 134, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            editor.editorModule.tableResize.resizerPosition = 1;
            editor.editorModule.tableResize.resizeNode = 1;
            editor.editorModule.tableResize.startingPoint.x = 305.5;
            editor.editorModule.tableResize.startingPoint.y = 114;
            var point = new editor_helper_1.Point(305.5, 115);
            editor.editorModule.tableResize.handleResizing(point);
            event = { offsetX: 557, offsetY: 135, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            event = { offsetX: 561, offsetY: 193, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            editor.documentHelper.onMouseUpInternal(event);
            editor.editorHistory.undo();
            editor.editorHistory.redo();
        });
    });
    describe('Table Column resizing validation with selection', function () {
        var editor = undefined;
        beforeEach(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container'
            });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterEach(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Resize Table Row', function () {
            console.log('Resize Table Row');
            editor.editor.insertTable(2, 2);
            var event = { offsetX: 557, offsetY: 134, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            editor.editorModule.tableResize.resizerPosition = 1;
            editor.editorModule.tableResize.resizeNode = 1;
            editor.editorModule.tableResize.startingPoint.x = 305.5;
            editor.editorModule.tableResize.startingPoint.y = 114;
            var point = new editor_helper_1.Point(305.5, 115);
            editor.editorModule.tableResize.handleResizing(point);
            event = { offsetX: 557, offsetY: 135, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            event = { offsetX: 561, offsetY: 193, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            editor.documentHelper.onMouseUpInternal(event);
            editor.editorHistory.undo();
            editor.editorHistory.redo();
        });
    });
});
