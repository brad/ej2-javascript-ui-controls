define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/context-menu", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/document-editor/implementation/dialogs/index"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, index_2, context_menu_1, editor_history_1, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createDocument(editor) {
        editor.openBlank();
        editor.editorModule.insertText('Adventure Works cycles');
    }
    describe('NumberBullet dialog', function () {
        var editor;
        var numBulletDialog;
        var menu;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, context_menu_1.ContextMenu, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({
                enableEditor: true, enableEditorHistory: true, enableSelection: true, isReadOnly: false, enableContextMenu: true
            });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            numBulletDialog = new index_3.BulletsAndNumberingDialog(editor.documentHelper);
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            numBulletDialog.destroy();
            numBulletDialog = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 2000);
        });
        it('module name validation', function () {
            console.log('module name validation');
            var name = numBulletDialog.getModuleName();
            expect(name).toBe('BulletsAndNumberingDialog');
        });
        it('Select bullet style tab', function (done) {
            console.log('Select bullet style tab');
            createDocument(editor);
            var event;
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.tabObj.select(1);
            setTimeout(function () {
                expect(numBulletDialog.bulletListDiv.style.display).not.toBe("none");
                done();
            }, 10);
        });
        it('Select number style tab', function (done) {
            console.log('Select number style tab');
            createDocument(editor);
            var event;
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.tabObj.select(0);
            setTimeout(function () {
                expect(numBulletDialog.numberListDiv.style.display).not.toBe("none");
                done();
            }, 10);
        });
        it('Show & Cancel', function () {
            console.log('Show & Cancel');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.onCancelButtonClick();
        });
        it('Show & Close', function () {
            console.log('Show & Close');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.closeNumberingBulletDialog();
        });
        it('numbered-none', function () {
            console.log('numbered-none');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-list-numbered-none').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-numbered-number-dot', function () {
            console.log('e-de-list-numbered-number-dot');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-list-numbered-number-dot').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-numbered-number-brace', function () {
            console.log('e-de-list-numbered-number-brace');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-list-numbered-number-brace').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-numbered-up-roman', function () {
            console.log('e-de-list-numbered-up-roman');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-list-numbered-up-roman').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-numbered-up-letter', function () {
            console.log('e-de-list-numbered-up-letter');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-list-numbered-up-letter').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-numbered-low-letter-brace', function () {
            console.log('e-de-list-numbered-low-letter-brace');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-list-numbered-low-letter-brace').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-numbered-low-letter-dot', function () {
            console.log('e-de-numbered-low-letter-dot');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-numbered-low-letter-dot').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-numbered-low-roman', function () {
            console.log('e-de-list-numbered-low-roman');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            editor.documentHelper.dialog.element.getElementsByClassName('e-de-list-numbered-low-roman').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-bullet-dot', function () {
            console.log('e-de-list-bullet-dot');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.bulletListDiv.getElementsByClassName('e-de-icon-bullet-list-dot').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-bullet-circle', function () {
            console.log('e-de-list-bullet-circle');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.bulletListDiv.getElementsByClassName('e-de-icon-bullet-list-circle').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-bullet-square', function () {
            console.log('e-de-list-bullet-square');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.bulletListDiv.getElementsByClassName('e-de-icon-bullet-list-square').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-bullet-flower', function () {
            console.log('e-de-list-bullet-flower');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.bulletListDiv.getElementsByClassName('e-de-icon-bullet-list-flower').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-list-bullet-arrow', function () {
            console.log('e-de-list-bullet-arrow');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.bulletListDiv.getElementsByClassName('e-de-icon-bullet-list-arrow').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
        it('e-de-icon-bullet-list-tick', function () {
            console.log('e-de-icon-bullet-list-tick');
            createDocument(editor);
            var event;
            event = { keyCode: 36, preventDefault: function () { }, ctrlKey: false, shiftKey: false, which: 0 };
            editor.documentHelper.onKeyDownInternal(event);
            numBulletDialog.showNumberBulletDialog(undefined, undefined);
            numBulletDialog.bulletListDiv.getElementsByClassName('e-de-icon-bullet-list-tick').item(0).dispatchEvent(new Event('click'));
            numBulletDialog.onOkButtonClick();
        });
    });
});
