define(["require", "exports", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/dialogs/table-dialog", "../../../src/index", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/index"], function (require, exports, document_editor_1, table_dialog_1, index_1, ej2_base_1, test_helper_spec_1, editor_history_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Insert Table Dialog Test Case Validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, table_dialog_1.TableDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableTableDialog: true });
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
        it('On Insert Button testing', function () {
            console.log('On Insert Button testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            dialog.onInsertTableClick();
            dialog.destroy();
        });
        it('On Cancel Button testing', function () {
            console.log('On Cancel Button testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            dialog.onCancelButtonClick();
            dialog.destroy();
        });
        it('Insert Table using event testing', function () {
            console.log('Insert Table using event testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            var event;
            event = { keyCode: 13, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.editor.deleteTable();
            dialog.onCancelButtonClick();
            dialog.show();
            dialog.destroy();
        });
    });
    describe('Insert Table Dialog Test Case Validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Insert Table Value Null Condition testing', function () {
            console.log('Insert Table Value Null Condition testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            var event;
            event = { keyCode: 13, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            dialog.rowsCountBox.value = '';
            dialog.columnsCountBox.value = '';
            dialog.destroy();
        });
        it('Insert Table Destory Parent Element testing', function () {
            console.log('Insert Table Destory Parent Element testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            dialog.columnsCountBox = document.createElement('div');
            dialog.rowsCountBox = document.createElement('div');
            dialog.destroy();
        });
        it('Insert Table Parent Destroy Element testing', function () {
            console.log('Insert Table Parent Destroy Element testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            dialog.target = document.createElement('div');
            document.body.appendChild(dialog.target);
            dialog.destroy();
        });
    });
    describe('Insert Table Key and Destroy Test Case Validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Insert Table Diff Event Key Condition testing', function () {
            console.log('Insert Table Diff Event Key Condition testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            var event;
            event = { keyCode: 35, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            dialog.onInsertTableClick();
            dialog.destroy();
        });
        it('Insert Table Destory testing', function () {
            console.log('Insert Table Destory testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.show();
            dialog.destroy();
        });
        it('Insert Table Destory testing', function () {
            console.log('Insert Table Destory testing');
            dialog = new table_dialog_1.TableDialog(editor.documentHelper);
            dialog.target = undefined;
            dialog.show();
            dialog.destroy();
        });
    });
});
