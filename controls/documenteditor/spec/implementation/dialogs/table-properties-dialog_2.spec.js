define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../../src/document-editor/implementation/dialogs/table-properties-dialog", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, document_editor_1, ej2_base_1, table_properties_dialog_1, test_helper_spec_1, index_1, index_2, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Table vertical alignment - center validation', function () {
        var editor;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, table_properties_dialog_1.TablePropertiesDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableTablePropertiesDialog: true });
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
            }, 2000);
        });
        it('in 3*4 table cell table vertical alignment validation', function () {
            console.log('in 3*4 table cell table vertical alignment validation');
            editor.editor.insertTable(2, 2);
            editor.selection.tableFormat.leftIndent = 10.8;
            var tablePropertiesDialog = editor.tablePropertiesDialogModule;
            tablePropertiesDialog.show();
            tablePropertiesDialog.center.click();
            tablePropertiesDialog.applyTableProperties();
            expect(editor.selection.tableFormat.tableAlignment).toBe('Center');
            expect(editor.selection.tableFormat.leftIndent).toBe(0);
        });
        it('in 3*4 table and last column resized with minimum width', function () {
            console.log('in 3*4 table and last column resized with minimum width');
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            editor.selection.cellFormat.preferredWidth = 0;
            var tablePropertiesDialog = editor.tablePropertiesDialogModule;
            tablePropertiesDialog.show();
            tablePropertiesDialog.preferredCellWidthCheckBox.checked = false;
            tablePropertiesDialog.preferredCellWidth.value = 0;
            tablePropertiesDialog.preferCheckBox.checked = false;
            tablePropertiesDialog.rowHeightCheckBox.checked = false;
            tablePropertiesDialog.rowHeight.value = 0;
            tablePropertiesDialog.applyTableProperties();
            expect(editor.selection.tableFormat.preferredWidth).toBe(0);
        });
    });
    describe('Table direction- right to left and left to right validation', function () {
        var editor;
        var dialog;
        var event;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, table_properties_dialog_1.TablePropertiesDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableTablePropertiesDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.tablePropertiesDialogModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Table for bidi is false and left indent is 0', function () {
            console.log('Table for bidi is false and left indent is 0');
            editor.editor.insertTable(2, 2);
            editor.tablePropertiesDialogModule.show();
            event = { value: "rtl" };
            dialog.changeBidirectional(event);
            dialog.applyTableProperties();
            expect(editor.selection.tableFormat.bidi).toBe(true);
        });
        it('undo after applt rtl via dialog', function () {
            console.log('undo after applt rtl via dialog');
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.bidi).toBe(false);
        });
        it('redo after applt rtl via dialog', function () {
            console.log('redo after applt rtl via dialog');
            editor.editorHistory.redo();
            expect(editor.selection.tableFormat.bidi).toBe(true);
        });
        it('apply left to right for RTl table', function () {
            console.log('apply left to right for RTl table');
            editor.tablePropertiesDialogModule.show();
            event = { value: "ltr" };
            dialog.changeBidirectional(event);
            dialog.applyTableProperties();
            expect(editor.selection.tableFormat.bidi).toBe(false);
        });
        it('undo after apply ltr via dialog', function () {
            console.log('undo after apply ltr via dialog');
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.bidi).toBe(true);
        });
        it('redo after apply ltr via dialog', function () {
            console.log('redo after apply ltr via dialog');
            editor.editorHistory.redo();
            expect(editor.selection.tableFormat.bidi).toBe(false);
        });
    });
    describe('Rtl table change table alignment validation', function () {
        var editor;
        var dialog;
        var event;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, table_properties_dialog_1.TablePropertiesDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableTablePropertiesDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.tablePropertiesDialogModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Table for bidi is true and table alignment as left', function () {
            console.log('Table for bidi is true and table alignment as left');
            editor.editor.insertTable(2, 2);
            editor.selection.tableFormat.bidi = true;
            editor.tablePropertiesDialogModule.show();
            dialog.left.click();
            dialog.applyTableProperties();
            expect(editor.selection.tableFormat.tableAlignment).toBe('Right');
        });
        it('undo after applt rtl via dialog', function () {
            console.log('undo after applt rtl via dialog');
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.tableAlignment).toBe('Left');
        });
        it('redo after applt rtl via dialog', function () {
            console.log('redo after applt rtl via dialog');
            editor.editorHistory.redo();
            expect(editor.selection.tableFormat.tableAlignment).toBe('Right');
        });
    });
    describe('Change RTl options with table indent', function () {
        var editor;
        var dialog;
        var event;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, table_properties_dialog_1.TablePropertiesDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableTablePropertiesDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.tablePropertiesDialogModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Table for bidi is true and table alignment as left', function () {
            console.log('Table for bidi is true and table alignment as left');
            editor.editor.insertTable(2, 2);
            editor.selection.tableFormat.preferredWidthType = 'Point';
            editor.selection.tableFormat.preferredWidth = 100;
            editor.selection.tableFormat.leftIndent = 36;
            editor.tablePropertiesDialogModule.show();
            event = { value: "rtl" };
            dialog.changeBidirectional(event);
            dialog.applyTableProperties();
            expect(editor.selection.tableFormat.bidi).toBe(true);
            expect(editor.selection.tableFormat.leftIndent).toBe(0);
        });
        it('undo after applt rtl via dialog', function () {
            console.log('undo after applt rtl via dialog');
            editor.editorHistory.undo();
            expect(editor.selection.tableFormat.leftIndent).toBe(36);
        });
        it('redo after applt rtl via dialog', function () {
            console.log('redo after applt rtl via dialog');
            editor.editorHistory.redo();
            expect(editor.selection.tableFormat.leftIndent).toBe(0);
        });
    });
});
