define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/document-editor/implementation/dialogs/columns-dialog"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, index_2, editor_history_1, columns_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Column Dialog Test Case Validation - 1', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(columns_dialog_1.ColumnsDialog, index_2.Selection, index_1.Editor, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.enableColumnsDialog = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.columnsDialogModule;
            dialog.show();
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
        it('On open Button testing', function () {
            console.log('On Open Button testing');
            dialog.openColumnsDialog();
        });
        it('On OK Button testing', function () {
            console.log('On OK Button testing');
            dialog.applyColumnDialog();
        });
        it('On Cancel Button testing', function () {
            console.log('On Cancel Button testing');
            dialog.closeDialog();
        });
    });
    describe('Column Dialog Test Case Validation - 2', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(columns_dialog_1.ColumnsDialog, index_2.Selection, index_1.Editor, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.enableColumnsDialog = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.columnsDialogModule;
            dialog.show();
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
        it('Column Dialog Test Case Validation - 2', function () {
            console.log('Column Dialog Test Case Validation - 2');
            dialog.numberOfColumns = 3;
            dialog.equalCheckbox.checked = true;
            dialog.lineCheckbox.checked = false;
            var event = {};
            event.previousValue = 1;
            event.value = 3;
            dialog.createTextBox(event);
            dialog.applyColumnDialog();
            expect(editor.selection.sectionFormat.numberOfColumns).toBe(3);
        });
    });
    describe('Undo validation after applied column value', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(columns_dialog_1.ColumnsDialog, index_2.Selection, index_1.Editor, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.enableColumnsDialog = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.columnsDialogModule;
            dialog.show();
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
        it('Undo validation after applied column value', function () {
            console.log('Undo validation after applied column value');
            dialog.numberOfColumns = 3;
            dialog.equalCheckbox.checked = true;
            dialog.lineCheckbox.checked = false;
            var event = {};
            event.previousValue = 1;
            event.value = 3;
            dialog.createTextBox(event);
            dialog.applyColumnDialog();
            expect(editor.selection.sectionFormat.numberOfColumns).toBe(3);
            editor.editorHistory.undo();
            expect(editor.selection.sectionFormat.numberOfColumns).toBe(1);
        });
    });
    describe('Column Dialog Test Case Validation - 3', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(columns_dialog_1.ColumnsDialog, index_2.Selection, index_1.Editor, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.enableColumnsDialog = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.columnsDialogModule;
            dialog.show();
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
        it('Left presets Column Dialog Test Case Validation', function (done) {
            console.log('Left presets Column Dialog Test Case Validation');
            editor.openBlank();
            dialog.openColumnsDialog();
            dialog.lineCheckbox.checked = false;
            dialog.leftDiv.click();
            dialog.applyColumnDialog();
            setTimeout(function () {
                if (!ej2_base_1.isNullOrUndefined(editor) && !ej2_base_1.isNullOrUndefined(editor.selection)) {
                    expect(editor.selection.sectionFormat.numberOfColumns).toBe(2);
                }
            }, 50);
            done();
        }, 10);
        it('Right presets Column Dialog Test Case Validation', function (done) {
            console.log('Right presets Column Dialog Test Case Validation');
            editor.openBlank();
            dialog.openColumnsDialog();
            dialog.lineCheckbox.checked = false;
            dialog.rightDiv.click();
            dialog.applyColumnDialog();
            setTimeout(function () {
                if (!ej2_base_1.isNullOrUndefined(editor) && !ej2_base_1.isNullOrUndefined(editor.selection)) {
                    expect(editor.selection.sectionFormat.numberOfColumns).toBe(2);
                }
            }, 50);
            done();
        }, 10);
        it('Two presets Column Dialog Test Case Validation', function (done) {
            console.log('Two presets Column Dialog Test Case Validation');
            editor.openBlank();
            dialog.openColumnsDialog();
            dialog.lineCheckbox.checked = false;
            dialog.twoDiv.click();
            dialog.applyColumnDialog();
            setTimeout(function () {
                if (!ej2_base_1.isNullOrUndefined(editor) && !ej2_base_1.isNullOrUndefined(editor.selection)) {
                    expect(editor.selection.sectionFormat.numberOfColumns).toBe(2);
                    expect(editor.selection.sectionFormat.columns[0].width).toBe(216);
                    expect(editor.selection.sectionFormat.columns[1].width).toBe(216);
                }
            }, 50);
            done();
        }, 10);
    });
});
