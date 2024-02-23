define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/context-menu", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/document-editor/implementation/dialogs/bookmark-dialog", "../../../src/index"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, index_2, context_menu_1, editor_history_1, bookmark_dialog_1, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('BookMark add validation', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, bookmark_dialog_1.BookmarkDialog, context_menu_1.ContextMenu, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, enableBookmarkDialog: true, isReadOnly: false, enableContextMenu: true, enableFontDialog: true });
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
        it('Add Bookmark validation', function () {
            console.log('Add Bookmark validation');
            editor.editorModule.insertTextInternal('Sample', true);
            editor.selection.selectAll();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.addBookmark();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(3);
        });
        it('undo validation in Bookmark', function () {
            console.log('undo validation in Bookmark');
            editor.editorHistory.undo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(1);
        });
        it('redo validation in bookmark', function () {
            console.log('redo validation in bookmark');
            editor.editorHistory.redo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(3);
        });
    });
    describe('Goto and Delete BookMark validation', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, bookmark_dialog_1.BookmarkDialog, context_menu_1.ContextMenu, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, enableBookmarkDialog: true, isReadOnly: false, enableContextMenu: true, enableFontDialog: true });
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
        it('GoTo validation Bookmark validation', function () {
            console.log('GoTo validation Bookmark validation');
            editor.editorModule.insertTextInternal('Sample', true);
            editor.selection.selectAll();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.textBoxInput.value = 'first';
            editor.bookmarkDialogModule.addBookmark();
            editor.bookmarkDialogModule.show();
            var args = { text: 'first' };
            editor.bookmarkDialogModule.selectHandler(args);
            editor.bookmarkDialogModule.gotoBookmark();
            expect(editor.selection.start.offset).toBe(0);
        });
        it('Delete Bookmark', function () {
            console.log('Delete Bookmark');
            editor.bookmarkDialogModule.deleteBookmark();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(0);
            editor.bookmarkDialogModule.removeObjects();
        });
        it('undo validation', function () {
            console.log('undo validation');
            editor.editorHistory.undo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(3);
        });
        it('redo validation', function () {
            console.log('redo validation');
            editor.editorHistory.redo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(1);
        });
        it('undo and redo validation', function () {
            console.log('undo and redo validation');
            var i = 1;
            while (i <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                i++;
            }
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(1);
        });
    });
    describe('Edit validation in Bookmark', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, bookmark_dialog_1.BookmarkDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableSelection: true, enableEditor: true, isReadOnly: false, enableBookmarkDialog: true, enableEditorHistory: true });
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
        it('Book Mark insert validation', function () {
            console.log('Book Mark insert validation');
            editor.editorModule.insertText('Sample Work');
            editor.selection.selectAll();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.addBookmark();
            editor.selection.handleHomeKey();
            editor.editorModule.insertText('s');
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[1] instanceof index_3.BookmarkElementBox).toBe(true);
        });
        it('Backspace in bookmark validation', function () {
            console.log('Backspace in bookmark validation');
            editor.openBlank();
            editor.editorModule.insertText('Back');
            editor.selection.selectAll();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.addBookmark();
            editor.selection.handleEndKey();
            editor.editorModule.onBackSpace();
            editor.editorModule.onBackSpace();
            editor.editorModule.onBackSpace();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[0] instanceof index_3.BookmarkElementBox).toBe(true);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[2] instanceof index_3.BookmarkElementBox).toBe(true);
        });
        it('Backspace in bookmark validation', function () {
            console.log('Backspace in bookmark validation');
            editor.editorModule.onBackSpace();
            expect(editor.selection.start.paragraph.isEmpty()).toBe(true);
        });
    });
    describe('DeleteSelected content on backspace ', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, bookmark_dialog_1.BookmarkDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableSelection: true, enableEditor: true, isReadOnly: false, enableBookmarkDialog: true, enableEditorHistory: true });
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
        it('Book Mark insert validation', function () {
            console.log('Book Mark insert validation');
            editor.editorModule.insertText('Sample Work');
            editor.selection.selectAll();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.addBookmark();
            editor.selection.handleHomeKey();
            editor.editorModule.insertText('sample 1');
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[1] instanceof index_3.BookmarkElementBox).toBe(true);
        });
    });
    describe('DeleteSelected content on backspace at bookmar end', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, bookmark_dialog_1.BookmarkDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableSelection: true, enableEditor: true, isReadOnly: false, enableBookmarkDialog: true, enableEditorHistory: true });
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
        it('Book Mark insert validation', function () {
            console.log('Book Mark insert validation');
            editor.editorModule.insertText('Sample Work');
            editor.editorModule.insertText(' ');
            editor.editorModule.insertText('sample');
            editor.selection.handleControlLeftKey();
            editor.selection.handleRightKey();
            editor.selection.handleShiftHomeKey();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.addBookmark();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(1);
        });
        it('Backspace at bookmark start validation', function () {
            console.log('Backspace at bookmark start validation');
            editor.selection.handleRightKey();
            editor.selection.handleShiftLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.editorModule.onBackSpace();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[2].bookmarkType).toBe(1);
        });
        it('undo validation', function () {
            console.log('undo validation');
            editor.editorHistory.undo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(5);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[3].bookmarkType).toBe(1);
        });
        it('redo validation', function () {
            console.log('redo validation');
            editor.editorHistory.redo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(4);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[2].bookmarkType).toBe(1);
        });
        it('undo and redo validation', function () {
            console.log('undo and redo validation');
            var i = 1;
            while (i <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                i++;
            }
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(4);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[2].bookmarkType).toBe(1);
        });
        it('undo and redo validation', function () {
            console.log('undo and redo validation');
            var i = 1;
            while (i <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                i++;
            }
            editor.editorHistory.undo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(5);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[3].bookmarkType).toBe(1);
        });
    });
    describe('DeleteSelected content on delete at bookmark start', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, bookmark_dialog_1.BookmarkDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableSelection: true, enableEditor: true, isReadOnly: false, enableBookmarkDialog: true, enableEditorHistory: true });
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
        it('Book Mark insert validation', function () {
            console.log('Book Mark insert validation');
            editor.editorModule.insertText('Sample Work');
            editor.selection.selectAll();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.addBookmark();
            editor.selection.handleHomeKey();
            editor.editorModule.insertText('sample 1');
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[1] instanceof index_3.BookmarkElementBox).toBe(true);
        });
    });
    describe('DeleteSelected content on onDelete at bookmar end', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, bookmark_dialog_1.BookmarkDialog, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableSelection: true, enableEditor: true, isReadOnly: false, enableBookmarkDialog: true, enableEditorHistory: true });
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
        it('Book Mark insert validation', function () {
            console.log('Book Mark insert validation');
            editor.editorModule.insertText('Sample Work');
            editor.editorModule.insertText(' ');
            editor.editorModule.insertText('sample');
            editor.selection.handleControlLeftKey();
            editor.selection.handleRightKey();
            editor.selection.handleShiftHomeKey();
            editor.bookmarkDialogModule.show();
            editor.bookmarkDialogModule.addBookmark();
            expect(editor.documentHelper.bookmarks.keys.length).toBe(1);
        });
        it('Backspace at bookmark start validation', function () {
            console.log('Backspace at bookmark start validation');
            editor.selection.handleRightKey();
            editor.selection.handleShiftLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.selection.handleShiftLeftKey();
            editor.editorModule.delete();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[2].bookmarkType).toBe(1);
        });
        it('undo validation', function () {
            console.log('undo validation');
            editor.editorHistory.undo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(5);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[3].bookmarkType).toBe(1);
        });
        it('redo validation', function () {
            console.log('redo validation');
            editor.editorHistory.redo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(4);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[2].bookmarkType).toBe(1);
        });
        it('undo and redo validation', function () {
            console.log('undo and redo validation');
            var i = 1;
            while (i <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                i++;
            }
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(4);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[2].bookmarkType).toBe(1);
        });
        it('undo and redo validation', function () {
            console.log('undo and redo validation');
            var i = 1;
            while (i <= 5) {
                editor.editorHistory.undo();
                editor.editorHistory.redo();
                i++;
            }
            editor.editorHistory.undo();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(5);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[3].bookmarkType).toBe(1);
        });
    });
});
