define(["require", "exports", "../../../src/document-editor/implementation/dialogs/hyperlink-dialog", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/context-menu", "../../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, hyperlink_dialog_1, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, index_2, context_menu_1, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getDocument(editor) {
        editor.openBlank();
        editor.editorModule.insertText('sample');
    }
    describe('Insert Hyperlink Dialog validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(hyperlink_dialog_1.HyperlinkDialog, index_1.Editor, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableHyperlinkDialog: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.hyperlinkDialogModule;
            dialog.show();
            dialog.hide();
        });
        beforeEach(function () {
            editor.openBlank();
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            dialog.destroy();
            dialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it(' Url Text Box Key Up validation', function () {
            console.log(' Url Text Box Key Up validation');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'www.google.com';
            var displayTextBox = dialog.displayTextBox;
            expect(urlTextBox.value).toBe('www.google.com');
        });
        it('on keyUp Method validation', function () {
            console.log('on keyUp Method validation');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'www.google.com';
            dialog.onKeyUpOnUrlBox({ keyCode: 10 });
            expect(urlTextBox.value).toBe('http://www.google.com');
        });
        it('insert hyper link on Enter Key', function () {
            console.log('insert hyper link on Enter Key');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'www.google.com';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Google';
            dialog.onKeyUpOnUrlBox({ keyCode: 13 });
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(5);
        });
        it('Enter Key validation', function () {
            console.log('Enter Key validation');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = '';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = '';
            dialog.onKeyUpOnUrlBox({ keyCode: 13 });
            expect('').toBe('');
        });
        it('Key down with out www text', function () {
            console.log('Key down with out www text');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'bing';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = '';
            dialog.onKeyUpOnUrlBox({ keyCode: 14 });
            expect(displayTextBox.value).toBe('bing');
            dialog.onKeyUpOnUrlBox({ keyCode: 14 });
        });
    });
    describe('Hyperlink Dialog API Validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableHyperlinkDialog: true });
            document_editor_1.DocumentEditor.Inject(hyperlink_dialog_1.HyperlinkDialog, index_2.Selection, index_1.Editor, editor_history_1.EditorHistory);
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.hyperlinkDialogModule;
            dialog.show();
            dialog.hide();
        });
        beforeEach(function () {
            editor.openBlank();
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            dialog.destroy();
            dialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Key down with out www text', function () {
            console.log('Key down with out www text');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'bing';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Bing';
            dialog.onKeyUpOnDisplayBox();
            dialog.onKeyUpOnUrlBox({ keyCode: 14 });
            expect(displayTextBox.value).toBe('Bing');
        });
        it('Open Hyperlink dialog with screenTip text', function () {
            console.log('Open Hyperlink dialog with screenTip');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'http://syncfusion.com';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Click';
            var screenTipTextBox = dialog.screenTipTextBox;
            screenTipTextBox.value = 'syncfusion';
            dialog.onKeyUpOnDisplayBox();
            dialog.onKeyUpOnUrlBox({ keyCode: 14 });
            expect(screenTipTextBox.value).toBe('syncfusion');
        });
        it('Open Hyperlink dialog with empty screenTip', function () {
            console.log('Open Hyperlink dialog with empty screenTip');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'http://syncfusion.com';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Click';
            var screenTipTextBox = dialog.screenTipTextBox;
            screenTipTextBox.value = '';
            dialog.onKeyUpOnDisplayBox();
            dialog.onKeyUpOnUrlBox({ keyCode: 14 });
            expect(screenTipTextBox.value).toBe('');
        });
        it('Check after insert the hyperlink values', function () {
            console.log('Check after insert the hyperlink values');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'https://syncfusion.com';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Click';
            var screenTipTextBox = dialog.screenTipTextBox;
            screenTipTextBox.value = 'syncfusion';
            dialog.onInsertButtonClick();
            expect('').toBe('');
            dialog.hide();
        });
        it('Open Hyperlink dialog', function () {
            console.log('Open Hyperlink dialog');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'https://syncfusion.com';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Syncfusion';
            dialog.onInsertButtonClick();
            expect('').toBe('');
            dialog.hide();
        });
        it('Open Hyperlink dialog', function () {
            console.log('Open Hyperlink dialog');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'https://syncfusion.com';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Syncfusion';
            var spy = jasmine.createSpy('spy');
            dialog.closeHyperlinkDialog = spy;
            dialog.onCancelButtonClick();
            expect('').toBe('');
        });
        it('insert Empty string validation', function () {
            console.log('insert Empty string validation');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = '';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = '';
            dialog.onInsertHyperlink();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children.length).toBe(0);
        });
        it('Insert hyperlink multiple paragraph', function () {
            console.log('Insert hyperlink multiple paragraph');
            getDocument(editor);
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'https://syncfusion.com';
            editor.selection.extendToNextLine();
            editor.selection.extendToNextLine();
            dialog.show();
            dialog.onInsertHyperlink();
            dialog.hide();
        });
    });
    describe('Edit Hyperlink validation', function () {
        var editor;
        var dialog;
        var menu;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(hyperlink_dialog_1.HyperlinkDialog, index_1.Editor, index_2.Selection, context_menu_1.ContextMenu, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableContextMenu: true, enableHyperlinkDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.hyperlinkDialogModule;
            menu = editor.contextMenuModule;
            dialog.show();
            dialog.hide();
        });
        beforeEach(function () {
            editor.openBlank();
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            dialog.destroy();
            dialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Edit Hyperlink validation', function () {
            console.log('Edit Hyperlink validation');
            var urlTextBox = dialog.urlTextBox;
            urlTextBox.value = 'https://syncfusion.com';
            var displayTextBox = dialog.displayTextBox;
            displayTextBox.value = 'Syncfusion';
            dialog.onInsertHyperlink();
            var event = { keyCode: 37, ctrlKey: false, preventDefault: function () { }, shiftKey: false };
            editor.documentHelper.onKeyDownInternal(event);
            dialog.hide();
            dialog.show();
            urlTextBox.value = 'http://js.syncfusion.com';
            dialog.onInsertHyperlink();
            dialog.hide();
            event = { keyCode: 37, ctrlKey: false, preventDefault: function () { }, shiftKey: true };
            editor.documentHelper.onKeyDownInternal(event);
            editor.documentHelper.onKeyDownInternal(event);
            editor.documentHelper.onKeyDownInternal(event);
            editor.editorModule.removeHyperlink();
            expect(displayTextBox.value).not.toBe('Syncfusion');
            dialog.hide();
        });
        it('handle context menu validation', function () {
            console.log('handle context menu validation');
            menu.handleContextMenuItem('container_contextmenu_hyperlink');
            expect(function () { editor.hyperlinkDialogModule.hide(); }).not.toThrowError();
            editor.editorModule.insertText('www.google.com');
            editor.editorModule.insertText(' ');
            editor.selection.handleHomeKey();
            menu.handleContextMenuItem('container_contextmenu_edit_hyperlink');
            expect(function () { editor.hyperlinkDialogModule.hide(); }).not.toThrowError();
        });
        it('using shortcut open hyperlink dialog', function () {
            console.log('using shortcut open hyperlink dialog');
            var event = { keyCode: 75, preventDefault: function () { }, ctrlKey: true, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            expect(function () { editor.hyperlinkDialogModule.hide(); }).not.toThrowError();
        });
    });
    describe('Edit Hyperlink validation without history', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(hyperlink_dialog_1.HyperlinkDialog, index_1.Editor, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableHyperlinkDialog: true });
            editor.enableEditorHistory = false;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.hyperlinkDialogModule;
            dialog.show();
            dialog.hide();
        });
        beforeEach(function () {
            editor.openBlank();
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            dialog.destroy();
            dialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
    });
});
