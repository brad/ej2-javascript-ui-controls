define(["require", "exports", "../../src/document-editor/document-editor", "../../src/index", "../../src/document-editor-container/document-editor-container", "../../src/document-editor-container/tool-bar/tool-bar", "../test-helper.spec", "@syncfusion/ej2-base", "../../src/index", "../../src/index", "../../src/document-editor/implementation/dialogs/bookmark-dialog"], function (require, exports, document_editor_1, index_1, document_editor_container_1, tool_bar_1, test_helper_spec_1, ej2_base_1, index_2, index_3, bookmark_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Select Table API validation', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Insert table cursor validation', function () {
            console.log('Insert table cursor validation');
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            expect(editor.selection.start.hierarchicalPosition).toBe("0;0;0;0;0;0;0;0");
            expect(editor.selection.start.paragraph.associatedCell).toBe(table.childWidgets[0].childWidgets[0]);
        });
        it('Nested insert Table cursor validation', function () {
            console.log('Nested insert Table cursor validation');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            editor.editorModule.insertTable(2, 2);
            expect(editor.selection.start.hierarchicalPosition).toBe("0;0;0;0;0;0;0;0;0;0;0");
        });
        it('Select Table in Forward selection', function () {
            console.log('Select Table in Forward selection');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.lastChild.lastChild;
            editor.selection.selectTable();
            expect(editor.selection.start.paragraph.associatedCell).toBe(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toBe(lastCell);
        });
        it('Select Table in Backward selection', function () {
            console.log('Select Table in Backward selection');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.lastChild.lastChild;
            editor.selection.moveDown();
            editor.selection.handleRightKey();
            editor.selection.selectTable();
            expect(editor.selection.start.paragraph.associatedCell).toBe(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toBe(lastCell);
        });
        it('Select Table if selection is not inside table', function () {
            console.log('Select Table if selection is not inside table');
            editor.openBlank();
            editor.selection.selectTable();
            expect(editor.selection.start.paragraph.isInsideTable).toBe(false);
        });
        it('Select Table in nested Table case', function () {
            console.log('Select Table in nested Table case');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0].firstChild.firstChild.childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.lastChild.lastChild;
            editor.selection.selectTable();
            expect(editor.selection.start.paragraph.associatedCell).toBe(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toBe(lastCell);
        });
        it('Select Table if selection is not empty', function () {
            console.log('Select Table if selection is not empty');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.lastChild.lastChild;
            editor.selection.selectCell();
            expect(editor.selection.start.paragraph.associatedCell).toEqual(editor.selection.end.paragraph.associatedCell);
            editor.selection.selectTable();
            expect(editor.selection.start.paragraph.associatedCell).toBe(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toBe(lastCell);
        });
    });
    describe('Select Row API validation', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Select Row in Forward selection', function () {
            console.log('Select Row in Forward selection');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.firstChild.lastChild;
            editor.selection.selectRow();
            expect(editor.selection.start.paragraph.associatedCell).toBe(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toBe(lastCell);
            expect(editor.selection.start.paragraph.associatedCell.ownerRow).toEqual(editor.selection.end.paragraph.associatedCell.ownerRow);
        });
        it('Select Row in Backward selection', function () {
            console.log('Select Row in Backward selection');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            editor.selection.handleRightKey();
            editor.selection.selectRow();
            expect(editor.selection.start.paragraph.associatedCell.ownerRow).toEqual(editor.selection.end.paragraph.associatedCell.ownerRow);
        });
        it('Select Row if selection is not inside table', function () {
            console.log('Select Row if selection is not inside table');
            editor.openBlank();
            editor.selection.selectRow();
            expect(editor.selection.start.paragraph.isInsideTable).toBe(false);
        });
        it('Select Row in nested Table case', function () {
            console.log('Select Row in nested Table case');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            editor.editorModule.insertTable(2, 2);
            editor.selection.selectRow();
            expect(editor.selection.start.paragraph.associatedCell.ownerRow).toEqual(editor.selection.end.paragraph.associatedCell.ownerRow);
        });
        it('Select Row if selection is not empty', function () {
            console.log('Select Row if selection is not empty');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            editor.selection.handleRightKey();
            editor.selection.selectColumn();
            expect(editor.selection.start.paragraph.associatedCell).not.toEqual(editor.selection.end.paragraph.associatedCell);
            editor.selection.selectRow();
            expect(editor.selection.start.paragraph.associatedCell.ownerRow).not.toEqual(editor.selection.end.paragraph.associatedCell.ownerRow);
        });
    });
    describe('Select Cell API validation', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Select Cell in Forward selection', function () {
            console.log('Select Cell in Forward selection');
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            editor.selection.selectCell();
            expect(editor.selection.start.paragraph.associatedCell).toEqual(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toEqual(firstCell);
        });
        it('Select Cell in Nested Table', function () {
            console.log('Select Cell in Nested Table');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            editor.editorModule.insertTable(2, 2);
            editor.selection.selectTable();
            editor.selection.selectCell();
            expect(editor.selection.start.paragraph.associatedCell).not.toEqual(editor.selection.end.paragraph.associatedCell);
        });
        it('Select Cell if selection is not inside table', function () {
            console.log('Select Cell if selection is not inside table');
            editor.openBlank();
            editor.selection.selectCell();
            expect(editor.selection.start.paragraph.isInsideTable).toBe(false);
        });
        it('Select Cell if selection is not empty', function () {
            console.log('Select Cell if selection is not empty');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstRow = table.firstChild;
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.firstChild.lastChild;
            editor.selection.selectRow();
            expect(editor.selection.start.paragraph.associatedCell.ownerRow).toEqual(firstRow);
            expect(editor.selection.end.paragraph.associatedCell.ownerRow).toEqual(firstRow);
            editor.selection.selectCell();
            expect(editor.selection.start.paragraph.associatedCell).toEqual(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toEqual(lastCell);
        });
    });
    describe('Select Column API validation', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Select Cell if selection is not inside table', function () {
            console.log('Select Cell if selection is not inside table');
            editor.openBlank();
            editor.selection.selectColumn();
            expect(editor.selection.start.paragraph.isInsideTable).toBe(false);
        });
        it('Select Cell if selection is not empty', function () {
            console.log('Select Cell if selection is not empty');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.lastChild.lastChild;
            editor.selection.selectRow();
            expect(editor.selection.start.paragraph.associatedCell.ownerRow).toEqual(editor.selection.end.paragraph.associatedCell.ownerRow);
            editor.selection.selectColumn();
            expect(editor.selection.start.paragraph.associatedCell).toEqual(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toEqual(lastCell);
        });
        it('Select Column in Forward selection', function () {
            console.log('Select Column in Forward selection');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            var table = documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            var firstCell = table.firstChild.firstChild;
            var lastCell = table.lastChild.firstChild;
            editor.selection.selectColumn();
            expect(editor.selection.start.paragraph.associatedCell).toBe(firstCell);
            expect(editor.selection.end.paragraph.associatedCell).toBe(lastCell);
        });
        it('Select Column in nested table', function () {
            console.log('Select Column in nested table');
            editor.openBlank();
            editor.editorModule.insertTable(2, 2);
            editor.editorModule.insertTable(2, 2);
            editor.selection.moveDown();
            editor.selection.moveDown();
            editor.selection.selectColumn();
            expect(editor.selection.start.paragraph.associatedCell.ownerRow).not.toEqual(editor.selection.end.paragraph.associatedCell.ownerRow);
            editor.selection.selectCell();
        });
    });
    describe('BookMark validation in double tap', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, bookmark_dialog_1.BookmarkDialog);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false, enableBookmarkDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('In bookmark element select current word validation', function () {
            console.log('In bookmark element select current word validation');
            editor.selection.selectCurrentWord();
        });
        it('start of line selection containing Bookmark element-select current word validation', function () {
            console.log('start of line selection containing Bookmark element-select current word validation');
            editor.selection.handleHomeKey();
            editor.selection.selectCurrentWord();
            expect(editor.selection.start.offset).toBe(0);
        });
    });
    describe('BookMark validation in double tap', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, bookmark_dialog_1.BookmarkDialog);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false, enableBookmarkDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('In bookmark element select current word validation', function () {
            console.log('In bookmark element select current word validation');
            editor.selection.handleEndKey();
            editor.selection.handleLeftKey();
            editor.selection.selectCurrentWord();
        });
        it('start of line selection containing Bookmark element-select current word validation', function () {
            console.log('start of line selection containing Bookmark element-select current word validation');
            editor.selection.handleHomeKey();
            editor.selection.selectCurrentWord();
            expect(editor.selection.start.offset).toBe(0);
        });
    });
    describe('Nested Table copy validation', function () {
        var editor = undefined;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'height: 500px' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, bookmark_dialog_1.BookmarkDialog, index_1.SfdtExport);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, enableSfdtExport: true, isReadOnly: false, enableBookmarkDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('copy nested table', function () {
            console.log('copy nested table');
            editor.editorModule.insertTable(2, 2);
            editor.editorModule.insertTable(2, 2);
            editor.selection.selectTable();
            expect(function () { editor.selection.copy(); }).not.toThrowError();
        });
    });
    describe('selection table row navigation', function () {
        var container = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'height: 500px' });
            document.body.appendChild(ele);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ enableToolbar: true });
            container.appendTo('#container');
        });
        afterAll(function (done) {
            document.body.removeChild(document.getElementById('container'));
            container.destroy();
            container = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it("selection table row forward navigation", function () {
            container.onPropertyChanged({ showPropertiesPane: true }, {});
            var element = document.getElementsByClassName("e-de-pane")[0];
            expect(element.style.display).toEqual("block");
            container.documentEditor.editor.insertTable(2, 2);
            expect(container.documentEditor.selection.start.paragraph.isInsideTable).toBe(true);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(0);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(0);
            container.documentEditor.selection.handleTabKey(true, false);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(1);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(0);
            container.documentEditor.selection.handleTabKey(true, false);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(0);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(1);
            container.documentEditor.selection.handleTabKey(true, false);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(1);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(1);
        });
        it("selection table row backward navigation", function () {
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(1);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(1);
            container.documentEditor.selection.handleTabKey(true, true);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(0);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(1);
            container.documentEditor.selection.handleTabKey(true, true);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(1);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(0);
            container.documentEditor.selection.handleTabKey(true, true);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.columnIndex).toBe(0);
            expect(container.documentEditor.selection.start.paragraph.associatedCell.rowIndex).toBe(0);
        });
        it("selection table navigation", function () {
            container.documentEditor.selection.handleTabKey(true, false);
            container.documentEditor.selection.handleTabKey(true, false);
            container.documentEditor.selection.handleTabKey(true, false);
            container.documentEditor.selection.moveToNextParagraph();
            expect(container.documentEditor.selection.start.paragraph.isInsideTable).toBe(false);
        });
    });
});
