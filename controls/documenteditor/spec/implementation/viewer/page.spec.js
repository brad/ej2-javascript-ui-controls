define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/document-editor/implementation/editor/editor", "../../../src/document-editor/implementation/selection/selection", "../../../src/index"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, editor_1, selection_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Numbering apply validation in different scenario', function () {
        var editor;
        beforeAll(function () {
            document.body.appendChild(ej2_base_1.createElement('div', { id: 'container' }));
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true });
            editor.acceptTab = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Get next Rendered widget validation in splitted table ', function () {
            console.log('Get next Rendered widget validation in splitted table ');
            editor.editorModule.insertTable(2, 2);
            editor.editorModule.insertText('Syncfusion');
            editor.selection.handleTabKey(true, false);
            editor.editorModule.insertText('Syncfusion');
            for (var i = 0; i < 60; i++) {
                editor.editorModule.onEnter();
            }
            editor.selection.handleTabKey(true, true);
            expect(editor.selection.start.paragraph.nextRenderedWidget).toBeUndefined();
        });
    });
    describe('Get Minimum and maximum width form cell', function () {
        var editor;
        beforeAll(function () {
            document.body.appendChild(ej2_base_1.createElement('div', { id: 'container', styles: 'width:100%;height:500px' }));
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true });
            editor.acceptTab = true;
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
                document.body.innerHTML = '';
                done();
            }, 500);
        });
        it('Get minimum and maximum width from cell', function () {
            console.log('Get minimum and maximum width from cell');
            editor.editor.insertTable(2, 2);
            editor.editor.insertText('Adventure Works Cycles, the fictitious company on which the AdventureWorks sample databases are based, is a large, multinational manufacturing company.');
            editor.editor.insertHyperlinkInternal('https://syncfusion.com', 'Syncfusion', true, false);
            var widthInfo = editor.selection.start.paragraph.associatedCell.getMinimumAndMaximumWordWidth(0, 0);
            expect(widthInfo.minimumWordWidth).toBeGreaterThan(70);
            expect(widthInfo.minimumWordWidth).toBeLessThan(78);
            expect(widthInfo.maximumWordWidth).toBeGreaterThan(738);
            expect(widthInfo.maximumWordWidth).toBeLessThan(758);
        });
        it('Get min and max width from table', function () {
            console.log('Get min and max width from table');
            editor.editor.insertTable(1, 2);
            editor.selection.start.paragraph.associatedCell.ownerTable.isGridUpdated = false;
            var widthInfo = editor.selection.start.paragraph.associatedCell.ownerTable.getMinimumAndMaximumWordWidth(0, 0);
            expect(widthInfo.maximumWordWidth).toBe(editor.selection.start.paragraph.associatedCell.ownerTable.tableHolder.getTotalWidth(0));
            expect(widthInfo.minimumWordWidth).toBe(editor.selection.start.paragraph.associatedCell.ownerTable.tableHolder.getTotalWidth(0));
        });
        it('Get min and max width from Row', function () {
            console.log('Get min and max width from Row');
            var widthInfo = editor.selection.start.paragraph.associatedCell.ownerRow.getMinimumAndMaximumWordWidth(0, 0);
            expect(widthInfo.minimumWordWidth).toBe(0);
            expect(widthInfo.maximumWordWidth).toBe(0);
        });
    });
    describe('Comment element validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, index_1.EditorHistory);
            editor.enableEditorHistory = true;
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
        it('Comment element validationn', function () {
            console.log('Comment element validation');
            editor.editor.insertBookmark('check');
            editor.editor.insertComment('hello');
            expect(function () { editor.editor.insertComment('check'); }).not.toThrowError();
        });
    });
    describe('Table width greater than container width validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, index_1.EditorHistory);
            editor.enableEditorHistory = true;
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
        it('Table width greater than container width validation', function () {
            editor.editor.insertTable(1, 1);
            var table = editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            table.tableFormat.preferredWidth = 800;
            editor.selection.selectAll();
            editor.editor.reLayout(editor.selection);
            expect(Math.round(editor.viewer.clientActiveArea.width)).toBeLessThan(table.tableFormat.preferredWidth);
        });
    });
    describe('Page number validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, index_1.EditorHistory);
            editor.enableEditorHistory = true;
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
        it('Page number validation', function () {
            editor.openBlank();
            editor.editor.insertPageBreak();
            editor.selection.goToFooter();
            editor.editor.insertPageNumber();
            expect(editor.documentHelper.pages[1].footerWidget.childWidgets[0].childWidgets[0].children[3].text).toBe("2");
        });
    });
});
