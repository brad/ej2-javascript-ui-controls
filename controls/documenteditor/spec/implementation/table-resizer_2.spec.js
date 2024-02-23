define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../test-helper.spec", "../../src/index", "../../src/document-editor/implementation/editor/editor-helper", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, editor_helper_1, index_2, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Nested Table Row Resizing validation and After merge cell resize cell at middle validation', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:1000px;height:500px'
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
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Nested Table Row Resizing validation', function () {
            console.log('Nested Table Row Resizing validation');
            documentHelper = editor.documentHelper;
            editor.editor.insertTable(2, 2);
            editor.editor.insertTable(2, 2);
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            editor.editorModule.tableResize.resizeNode = 1;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 0;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(227.5, 114);
            editor.editorModule.tableResize.resizeTableRow(2);
            expect(editor.editorModule.tableResize.resizerPosition).toBe(0);
        });
        it('After merge cell resize cell at middle validation', function () {
            console.log('After merge cell resize cell at middle validation');
            documentHelper = editor.documentHelper;
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            editor.selection.handleShiftDownKey();
            editor.editor.mergeCells();
            editor.selection.handleUpKey();
            editor.selection.handleShiftRightKey();
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            editor.editorModule.tableResize.resizeNode = 0;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 1;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(408.5, 104);
            documentHelper.currentPage = documentHelper.pages[0];
            editor.editorModule.tableResize.resizeTableCellColumn(-1);
            expect(editor.editorModule.tableResize.resizerPosition).toBe(1);
        });
    });
    describe('After resize cell validation without selection', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:100%;height:100%'
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
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Resize without selection', function () {
            console.log('Resize without selection');
            documentHelper = editor.documentHelper;
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            editor.selection.handleShiftDownKey();
            editor.editor.mergeCells();
            editor.selection.handleUpKey();
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            editor.editorModule.tableResize.resizeNode = 0;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 1;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(1075, 124);
            editor.editorModule.tableResize.resizeTableCellColumn(500.5);
            expect(editor.selection.tableFormat.table.childWidgets[0].childWidgets[0].cellFormat.cellWidth).toBe(468);
        });
        it('Resize without selection and merge cell in first column', function () {
            console.log('Resize without selection and merge cell in first column');
            documentHelper = editor.documentHelper;
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            editor.selection.handleRightKey();
            editor.selection.handleShiftDownKey();
            editor.editor.mergeCells();
            editor.selection.handleUpKey();
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            editor.editorModule.tableResize.resizeNode = 0;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 1;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(407.5, 127);
            documentHelper.currentPage = documentHelper.pages[0];
            editor.editorModule.tableResize.resizeTableCellColumn(1);
            expect(editor.editorModule.tableResize.resizerPosition).toBe(1);
        });
    });
    describe('After resize cell validation with selection', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:100%;height:100%'
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
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Resize with selection', function () {
            console.log('Resize with selection');
            documentHelper = editor.documentHelper;
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            editor.selection.handleShiftDownKey();
            editor.editor.mergeCells();
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            editor.editorModule.tableResize.resizeNode = 0;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 1;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(407, 122);
            editor.editorModule.tableResize.resizeTableCellColumn(-80);
            expect(editor.editorModule.tableResize.resizerPosition).toBe(1);
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
    describe(' Table Row Resizing validation in header', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:1000px;height:500px'
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
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it(' Table Row Resizing validation in header', function () {
            console.log(' Table Row Resizing validation header');
            documentHelper = editor.documentHelper;
            documentHelper.owner.selection.goToHeader();
            editor.editor.insertTable(2, 2);
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].headerWidget.childWidgets[0];
            var height = documentHelper.pages[0].headerWidget.height;
            editor.editorModule.tableResize.resizeNode = 1;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 0;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(227.5, 114);
            editor.editorModule.tableResize.resizeTableRow(2);
            expect(documentHelper.pages[0].headerWidget.height).toBeGreaterThan(height);
        });
    });
    describe('Check the minimum width for cell', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:100%;height:100%'
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
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Check the minimum width for cell', function () {
            console.log('Check the minimum width for cell');
            documentHelper = editor.documentHelper;
            editor.openBlank();
            editor.editor.insertTable(1, 1);
            editor.selection.handleShiftDownKey();
            editor.selection.handleUpKey();
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            editor.editorModule.tableResize.resizeNode = 0;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 1;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(1075, 124);
            editor.editorModule.tableResize.resizeTableCellColumn(-608);
        });
    });
    describe('Check the cell width when preferredWidthType contain point', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:100%;height:100%'
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
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Check the cell width when preferredWidthType contain point', function () {
            console.log('Check the cell width when preferredWidthType contain point');
            documentHelper = editor.documentHelper;
            editor.openBlank();
            editor.editor.insertTable(1, 2);
            editor.selection.handleShiftDownKey();
            editor.selection.handleUpKey();
            editor.editorModule.tableResize.currentResizingTable = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            editor.editorModule.tableResize.resizeNode = 0;
            documentHelper.isRowOrCellResizing = true;
            editor.editorModule.tableResize.resizerPosition = 2;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(720, 104);
            editor.editorModule.tableResize.resizeTableCellColumn(30);
            editor.editorModule.tableResize.resizerPosition = 0;
            editor.editorModule.tableResize.startingPoint = new editor_helper_1.Point(97, 104);
            editor.editorModule.tableResize.resizeTableCellColumn(30);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].childWidgets[1].width).toBe(336.93333);
        });
    });
});
