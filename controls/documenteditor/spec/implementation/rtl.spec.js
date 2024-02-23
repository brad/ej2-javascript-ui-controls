define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../spec/test-helper.spec", "../../src/index", "../../src/index", "../../src/index"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, index_2, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('List Dialog testing', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_1.ListDialog);
            editor = new document_editor_1.DocumentEditor({ enableRtl: true, enableSelection: true, enableEditor: true, isReadOnly: false, enableListDialog: true });
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
            }, 1000);
        });
    });
    describe('Style dialog validation', function () {
        var editor;
        var styleDialog;
        var stylesDialog;
        var fontDialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_1.StyleDialog, index_1.StylesDialog, index_1.FontDialog, index_2.EditorHistory);
            editor = new document_editor_1.DocumentEditor({
                enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableContextMenu: true, enableStyleDialog: true, enableRtl: true, enableFontDialog: true, enableParagraphDialog: true
            });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            styleDialog = editor.styleDialogModule;
            stylesDialog = editor.stylesDialogModule;
            fontDialog = editor.fontDialogModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            styleDialog = undefined;
            stylesDialog = undefined;
            fontDialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Show style and font dialog testing in rtl view', function () {
            console.log('Show style and font dialog testing in rtl view');
            editor.showFontDialog();
            editor.showStyleDialog();
            editor.showStylesDialog();
        });
    });
    describe('TableOfContents dialog validation', function () {
        var editor;
        var tableOfContents;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.TableOfContentsDialog, index_3.Selection, index_2.Editor, index_2.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableRtl: true });
            editor.enableEditorHistory = true;
            editor.enableTableOfContentsDialog = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            tableOfContents = editor.tableOfContentsDialogModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            tableOfContents = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Show toc in rtl view', function () {
            console.log('Show toc in rtl view');
            editor.showTableOfContentsDialog();
        });
        it('Show toc in ltr view', function () {
            console.log('Show toc in ltr view');
            editor.enableRtl = false;
            editor.showTableOfContentsDialog();
        });
    });
    describe('PageSetup Dialog Test Case Validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.PageSetupDialog, index_3.Selection, index_2.Editor, index_2.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableRtl: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.enablePageSetupDialog = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.pageSetupDialogModule;
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
        it('Load PageSetup Dialog testing', function () {
            console.log('Load PageSetup Dialog testing');
            dialog.loadPageSetupDialog();
        });
    });
    describe('BookMark add validation', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_1.BookmarkDialog, index_2.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableRtl: true, enableEditor: true, enableSelection: true, enableBookmarkDialog: true, isReadOnly: false, enableContextMenu: true, enableFontDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
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
        it('Bookmark dialog testing in rtl view', function () {
            console.log('Bookmark dialog testing in rtl view');
            editor.showBookmarkDialog();
        });
    });
});
