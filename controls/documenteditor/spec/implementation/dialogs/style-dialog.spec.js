define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../../src/document-editor/implementation/dialogs/style-dialog", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/context-menu", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/document-editor/implementation/dialogs/font-dialog", "../../../src/document-editor/implementation/dialogs/paragraph-dialog", "../../../src/document-editor/implementation/dialogs/styles-dialog"], function (require, exports, document_editor_1, ej2_base_1, style_dialog_1, test_helper_spec_1, index_1, index_2, context_menu_1, editor_history_1, font_dialog_1, paragraph_dialog_1, styles_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createDocument(editor) {
        editor.openBlank();
        editor.editorModule.insertText('Adventure Works cycles');
    }
    describe('Style dialog validation', function () {
        var editor;
        var styleDialog;
        var fontDialog;
        var paragraphDialog;
        var numBulletDialog;
        var menu;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, style_dialog_1.StyleDialog, font_dialog_1.FontDialog, paragraph_dialog_1.ParagraphDialog, context_menu_1.ContextMenu, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({
                enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableContextMenu: true, enableStyleDialog: true,
                enableFontDialog: true, enableParagraphDialog: true
            });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            styleDialog = editor.styleDialogModule;
            fontDialog = editor.fontDialogModule;
            paragraphDialog = editor.paragraphDialogModule;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            styleDialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('module name validation', function () {
            console.log('module name validation');
            var name = styleDialog.getModuleName();
            expect(name).toBe('StyleDialog');
        });
        it('Show Dialog Diable Ok', function () {
            console.log('Show Dialog Diable Ok');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            styleDialog.show();
            expect(styleDialog.okButton.disabled).toBe(true);
            styleDialog.styleNameElement.value = 'style 1';
            var blurEvent = new Event('blur');
            styleDialog.styleNameElement.dispatchEvent(blurEvent);
            styleDialog.styleNameElement.dispatchEvent(new Event('keyup'));
            expect(styleDialog.okButton.disabled).toBe(false);
            styleDialog.styleNameElement.value = null;
            styleDialog.styleNameElement.dispatchEvent(new Event('keyup'));
            expect(styleDialog.okButton.disabled).toBe(true);
            styleDialog.closeStyleDialog();
        });
        it('Show Font dialog', function () {
            console.log('Show Font dialog');
            createDocument(editor);
            styleDialog.show();
            styleDialog.showFontDialog();
            fontDialog.closeFontDialog();
            styleDialog.closeStyleDialog();
        });
        it('Show Paragrph dialog', function () {
            console.log('Show Paragrph dialog');
            createDocument(editor);
            styleDialog.show();
            styleDialog.showParagraphDialog();
            paragraphDialog.closeParagraphDialog();
            styleDialog.closeStyleDialog();
        });
        it('Show NumberingBullet dialog', function () {
            console.log('Show NumberingBullet dialog');
            createDocument(editor);
            styleDialog.show();
            styleDialog.showNumberingBulletDialog();
            styleDialog.numberingBulletDialog.closeNumberingBulletDialog();
            styleDialog.closeStyleDialog();
        });
        it('Click Cancel', function () {
            console.log('Click Cancel');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            styleDialog.show();
            styleDialog.onCancelButtonClick();
        });
        it('StyleType change', function () {
            console.log('StyleType change');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            styleDialog.show();
            var downEventArgs = { preventDefault: function () { }, action: 'down' };
            styleDialog.styleType.keyActionHandler(downEventArgs);
            expect(styleDialog.styleParagraph.enabled).toBe(false);
            styleDialog.styleType.keyActionHandler(downEventArgs);
            expect(styleDialog.styleParagraph.enabled).toBe(true);
            var upEventArgs = { preventDefault: function () { }, action: 'up' };
            styleDialog.styleType.keyActionHandler(upEventArgs);
            expect(styleDialog.styleParagraph.enabled).toBe(false);
            styleDialog.styleType.keyActionHandler(upEventArgs);
            expect(styleDialog.styleParagraph.enabled).toBe(true);
            styleDialog.closeStyleDialog();
        });
    });
    describe('Style dialog validation create', function () {
        var editor;
        var styleDialog;
        var fontDialog;
        var paragraphDialog;
        var numBulletDialog;
        var menu;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, style_dialog_1.StyleDialog, font_dialog_1.FontDialog, paragraph_dialog_1.ParagraphDialog, context_menu_1.ContextMenu, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({
                enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableContextMenu: true, enableStyleDialog: true,
                enableFontDialog: true, enableParagraphDialog: true
            });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            styleDialog = editor.styleDialogModule;
            fontDialog = editor.fontDialogModule;
            paragraphDialog = editor.paragraphDialogModule;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            styleDialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
    });
    describe('Style dialog validation create - Next Different', function () {
        var editor;
        var styleDialog;
        var stylesDialog;
        var fontDialog;
        var paragraphDialog;
        var numBulletDialog;
        var menu;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, style_dialog_1.StyleDialog, font_dialog_1.FontDialog, paragraph_dialog_1.ParagraphDialog, context_menu_1.ContextMenu, editor_history_1.EditorHistory, styles_dialog_1.StylesDialog);
            editor = new document_editor_1.DocumentEditor({
                enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableContextMenu: true, enableStyleDialog: true,
                enableFontDialog: true, enableParagraphDialog: true
            });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            styleDialog = editor.styleDialogModule;
            stylesDialog = editor.stylesDialogModule;
            fontDialog = editor.fontDialogModule;
            paragraphDialog = editor.paragraphDialogModule;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            styleDialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
    });
    describe('Style dialog validation create', function () {
        var editor;
        var styleDialog;
        var fontDialog;
        var paragraphDialog;
        var numBulletDialog;
        var menu;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, style_dialog_1.StyleDialog, font_dialog_1.FontDialog, paragraph_dialog_1.ParagraphDialog, context_menu_1.ContextMenu, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({
                enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableContextMenu: true, enableStyleDialog: true,
                enableFontDialog: true, enableParagraphDialog: true
            });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            styleDialog = editor.styleDialogModule;
            fontDialog = editor.fontDialogModule;
            paragraphDialog = editor.paragraphDialogModule;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            styleDialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
    });
    describe('Modify Styles for Heading 1 validation', function () {
        var editor;
        var styleDialog;
        var fontDialog;
        var paragraphDialog;
        var numBulletDialog;
        var menu;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, style_dialog_1.StyleDialog, font_dialog_1.FontDialog, paragraph_dialog_1.ParagraphDialog, context_menu_1.ContextMenu, editor_history_1.EditorHistory, styles_dialog_1.StylesDialog);
            editor = new document_editor_1.DocumentEditor({
                enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableContextMenu: true, enableStyleDialog: true,
                enableFontDialog: true, enableParagraphDialog: true
            });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            styleDialog = editor.styleDialogModule;
            fontDialog = editor.fontDialogModule;
            paragraphDialog = editor.paragraphDialogModule;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            styleDialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('Modify heading 1 style validation', function () {
            console.log('Modify heading 1 style validation');
            editor.editor.insertText('Heading 1');
            editor.editor.applyStyle('Heading 1');
            editor.styleDialogModule.show('Heading 1');
            editor.styleDialogModule.onOkButtonClick();
            expect(editor.selection.paragraphFormat.textAlignment).toBe('Left');
        });
        it('Open Paragraph dialog validation', function () {
            console.log('Open Paragraph dialog validation');
            editor.openBlank();
            editor.editor.insertText('Heading 1');
            editor.editor.applyStyle('Heading 1');
            editor.styleDialogModule.show('Heading 1');
            styleDialog.showParagraphDialog();
            paragraphDialog.closeParagraphDialog();
            styleDialog.closeStyleDialog();
        });
    });
});
