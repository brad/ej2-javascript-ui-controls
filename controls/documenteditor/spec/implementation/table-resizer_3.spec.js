define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../test-helper.spec", "../../src/index", "../../src/index", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, index_2, index_3, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getTextPosition(editor, hierarchicalIndex) {
        var textPosition = new index_2.TextPosition(editor);
        textPosition.setPositionForCurrentIndex(hierarchicalIndex);
        return textPosition;
    }
    describe('Table Cell Resizing With Final Cell Selection testing', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:1280px;height:500px'
            });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_3.Editor, index_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        beforeEach(function () {
            editor.openBlank();
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
        it('Resize Table Cell in Final Row Drag Value Testing ', function () {
            console.log('Resize Table Cell in Final Row Drag Value Testing ');
            editor.editor.insertTable(2, 3);
            var startPosition = getTextPosition(editor, '0;0;0;1;1;0;0;0');
            var endPosition = getTextPosition(editor, '0;0;0;1;1;0;0;1');
            editor.selection.selectRange(startPosition, endPosition);
            var event = { offsetX: 735, offsetY: 143, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            event = { offsetX: 779, offsetY: 143, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            editor.documentHelper.onMouseUpInternal(event);
            event = { offsetX: 799, offsetY: 143, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            expect(table.childWidgets[0].childWidgets[2].columnIndex).toBe(2);
            editor.editorHistory.undo();
            editor.editorHistory.redo();
        });
        it('Resize Table Cell With Selection table cell Spacing Resizing Testing ', function () {
            console.log('Resize Table Cell With Selection table cell Spacing Resizing Testing ');
            editor.editor.insertTable(3, 3);
            var table = editor.selection.start.paragraph.associatedCell.ownerTable;
            table.tableFormat.cellSpacing = 10;
            editor.documentHelper.layout.reLayoutTable(table);
            var startPosition = getTextPosition(editor, '0;0;0;0;0;0;0;0');
            var endPosition = getTextPosition(editor, '0;0;0;0;1;0;0;1');
            editor.selection.selectRange(startPosition, endPosition);
            var event = { offsetX: 321, offsetY: 141, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            event = { offsetX: 381, offsetY: 141, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            editor.documentHelper.onMouseUpInternal(event);
            event = { offsetX: 391, offsetY: 141, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
        });
    });
    describe('Cell Width Restricting on cell Resizing testing', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:1280px;height:500px'
            });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_3.Editor, index_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        beforeEach(function () {
            editor.openBlank();
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
        it('Resize Table Without Selection on Zero index Testing', function () {
            console.log('Resize Table Without Selection on Zero index Testing');
            editor.editor.insertTable(2, 3);
            var event = { offsetX: 320, offsetY: 126, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            event = { offsetX: 360, offsetY: 126, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            editor.documentHelper.onMouseUpInternal(event);
            event = { offsetX: 370, offsetY: 126, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            var compareTable = editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            expect(compareTable.childWidgets[0].childWidgets[0].cellFormat.cellWidth).toBeGreaterThanOrEqual(116);
            expect(compareTable.childWidgets[1].childWidgets[0].cellFormat.cellWidth).toBeGreaterThanOrEqual(116);
            editor.editorHistory.undo();
            editor.editorHistory.redo();
        });
        it('Resize table without selection on middle index testing', function () {
            console.log('Resize table without selection on middle index testing');
            editor.editor.insertTable(3, 3);
            var event = { offsetX: 736, offsetY: 145, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            event = { offsetX: 766, offsetY: 145, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            editor.documentHelper.onMouseUpInternal(event);
            event = { offsetX: 776, offsetY: 145, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            editor.editorHistory.undo();
            editor.editorHistory.redo();
        });
    });
    describe('Cell Width Restricting on cell Resizing With Selection testing', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', {
                id: 'container',
                styles: 'width:1280px;height:500px'
            });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_3.Editor, index_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        beforeEach(function () {
            editor.openBlank();
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
        it('Resize Table With Selection on Zero index Testing', function () {
            console.log('Resize Table With Selection on Zero index Testing');
            editor.editor.insertTable(2, 3);
            var startPosition = getTextPosition(editor, '0;0;0;0;0;0;0;0');
            var endPosition = getTextPosition(editor, '0;0;0;0;1;0;0;1');
            editor.selection.selectRange(startPosition, endPosition);
            var event = { offsetX: 320, offsetY: 126, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            event = { offsetX: 360, offsetY: 126, preventDefault: function () { }, ctrlKey: false, which: 0 };
            editor.documentHelper.onMouseMoveInternal(event);
            editor.documentHelper.onMouseUpInternal(event);
            event = { offsetX: 370, offsetY: 126, preventDefault: function () { }, ctrlKey: false, which: 1 };
            editor.documentHelper.onMouseDownInternal(event);
            var compareTable = editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            expect(compareTable.childWidgets[0].childWidgets[0].cellFormat.cellWidth).toBeGreaterThanOrEqual(116);
            expect(compareTable.childWidgets[1].childWidgets[0].cellFormat.cellWidth).toBeGreaterThanOrEqual(116);
        });
    });
    describe('Check the backspace is working properly in table case with bookmark', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_3.Editor, index_1.Selection, editor_history_1.EditorHistory);
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
        it('Check the backspace is working properly in table case with bookmark', function () {
            console.log('Check the backspace is working properly in table case with bookmark');
            container.openBlank();
            container.editor.insertTable(1, 1);
            container.editor.insertBookmark('bookmark');
            container.editor.insertTable(1, 2);
            container.selection.moveDown();
            container.editor.insertText('hello');
            container.editor.onBackSpace();
            container.editor.onBackSpace();
            var bodyWidget = container.documentHelper.pages[0].bodyWidgets[0];
            var tableWidget = bodyWidget.childWidgets[0];
            var tableRowWidget = tableWidget.childWidgets[0];
            var tableCellWidget = tableRowWidget.childWidgets[0];
            var paragraphWidget = tableCellWidget.childWidgets[2];
            var lineWidget = paragraphWidget.childWidgets[0];
            var textElementBox = lineWidget.children[1];
            expect(textElementBox.text).toBe('hel');
        });
    });
});
