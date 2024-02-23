define(["require", "exports", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/dialogs/list-dialog", "../../../src/document-editor/implementation/dialogs/list-view-model", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/index", "../../../src/document-editor/implementation/editor-history/editor-history", "@syncfusion/ej2-base", "../../../src/index"], function (require, exports, document_editor_1, list_dialog_1, list_view_model_1, ej2_base_1, test_helper_spec_1, index_1, editor_history_1, ej2_base_2, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createDocument(editor) {
        editor.openBlank();
        editor.editorModule.insertText('Adventure Works cycles');
    }
    describe('List dialog validation-2', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, list_dialog_1.ListDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableListDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.listDialogModule;
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
        it('followCharacter API validation', function () {
            console.log('followCharacter API validation');
            dialog.showListDialog();
            var number = dialog.followCharacterConverter('None');
            dialog.followCharacterConverter('Space');
            dialog.followCharacterConverter('Tab');
            expect(number).toBe(2);
        });
        it('List Pattern API validation', function () {
            console.log('List Pattern API validation');
            var number = dialog.listPatternConverter('Arabic');
            dialog.listPatternConverter('LowRoman');
            dialog.listPatternConverter('UpRoman');
            dialog.listPatternConverter('LowLetter');
            dialog.listPatternConverter('UpLetter');
            dialog.listPatternConverter('Number');
            dialog.listPatternConverter('LeadingZero');
            dialog.listPatternConverter('Bullet');
            dialog.listPatternConverter('Ordinal');
            dialog.listPatternConverter('OrdinalText');
            dialog.listPatternConverter('Special');
            dialog.listPatternConverter('FarEast');
            dialog.listPatternConverter('None');
            expect(number).toBe(0);
        });
        it('Applylist API validation', function () {
            console.log('Applylist API validation');
            var dialog = new list_dialog_1.ListDialog(editor.documentHelper);
            createDocument(editor);
            dialog.showListDialog();
            dialog.documentHelper = undefined;
            expect(function () { dialog.onApplyList(); }).toThrowError();
            dialog.destroy();
        });
    });
    describe('ListDialogViewModel class validation', function () {
        var editor;
        var dialog;
        var viewModel;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, list_dialog_1.ListDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = new list_dialog_1.ListDialog(editor.documentHelper);
            viewModel = dialog.viewModel;
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            dialog = undefined;
            viewModel = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('viewmodel property validation', function () {
            console.log('viewmodel property validation');
            dialog.showListDialog();
            viewModel.listLevelPattern = 'Arabic';
            expect(viewModel.listLevelPattern).not.toBe(undefined);
        });
        it('viewmodel property validation', function () {
            console.log('viewmodel property validation');
            dialog.showListDialog();
            viewModel.followCharacter = 'Space';
            expect(viewModel.followCharacter).not.toBe(undefined);
        });
        it('Create List and addListLevel API validation', function () {
            console.log('Create List and addListLevel API validation');
            dialog.showListDialog();
            var dialogview = new list_view_model_1.ListViewModel();
            dialogview.addListLevels();
        });
    });
    describe('dialog event validation-1', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, list_dialog_1.ListDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = new list_dialog_1.ListDialog(editor.documentHelper);
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 500);
        });
        it('NumberFormat event validation', function (done) {
            console.log('NumberFormat event validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.editor.applyNumbering('%1.', 'Number');
            dialog.showListDialog();
            setTimeout(function () {
                var event = { target: { value: "%0." } };
                dialog.onNumberFormatChanged(event);
                expect(dialog.viewModel.listLevel.numberFormat).toBe('%0.');
                dialog.onCancelButtonClick();
                done();
            });
        });
        it('follow character event validation', function () {
            console.log('follow character event validation');
            createDocument(editor);
            editor.editorModule.insertText('Syncfusion Software');
            editor.editor.applyBullet('\uf0b7', 'Symbol');
            var locale = new ej2_base_2.L10n('documenteditor', editor.defaultLocale);
            locale.setLocale(editor.locale);
            dialog.initListDialog(locale);
            var event = { target: { value: "Space" } };
            dialog.onFollowCharacterValueChanged(event);
            expect(dialog.viewModel.followCharacter).toBe('None');
        });
        it('follow character event validation', function () {
            console.log('follow character event validation');
            var event = { target: { value: "Tab" } };
            dialog.onFollowCharacterValueChanged(event);
            expect(dialog.viewModel.followCharacter).toBe('None');
        });
        it('follow character event validation', function () {
            console.log('follow character event validation');
            var event = { target: { value: "None" } };
            dialog.onFollowCharacterValueChanged(event);
            expect(dialog.viewModel.followCharacter).toBe('None');
        });
    });
    describe('dialog event validation', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, list_dialog_1.ListDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableListDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.listDialogModule;
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 500);
        });
        it('ListLevel event validation', function () {
            console.log('ListLevel event validation');
            createDocument(editor);
            dialog.showListDialog();
            var event = { value: 'Level 3', target: { selectedIndex: 2 } };
            expect(function () { dialog.onListLevelValueChanged(event); }).not.toThrowError();
            dialog.onApplyList();
        });
    });
    describe('dialog event validation', function () {
        var editor;
        var dialog;
        var event;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory, list_dialog_1.ListDialog);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = new list_dialog_1.ListDialog(editor.documentHelper);
            createDocument(editor);
            dialog.showListDialog();
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('LevelPattern event validation', function () {
            console.log('LevelPattern event validation');
            event = { target: { value: "UpRoman" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation', function () {
            console.log('LevelPattern event validation');
            event = { target: { value: "LowRoman" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation', function () {
            console.log('LevelPattern event validation');
            event = { target: { value: "UpLetter" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation', function () {
            console.log('LevelPattern event validation');
            event = { target: { value: "LowLetter" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation', function () {
            console.log('LevelPattern event validation');
            event = { target: { value: "Arabic" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation', function () {
            console.log('LevelPattern event validation');
            event = { target: { value: "Bullet" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation-2', function () {
            console.log('LevelPattern event validation-2');
            event = { target: { value: "Number" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation-2', function () {
            console.log('LevelPattern event validation-2');
            event = { target: { value: "LeadingZero" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation-2', function () {
            console.log('LevelPattern event validation-2');
            event = { target: { value: "Ordinal" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation-2', function () {
            console.log('LevelPattern event validation-2');
            event = { target: { value: "OrdinalText" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation-2', function () {
            console.log('LevelPattern event validation-2');
            event = { target: { value: "FarEast" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation-2', function () {
            console.log('LevelPattern event validation-2');
            event = { target: { value: "Special" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('LevelPattern event validation-2', function () {
            console.log('LevelPattern event validation-2');
            event = { target: { value: "None" } };
            expect(function () { dialog.onLevelPatternValueChanged(event); }).not.toThrowError();
        });
        it('module name validation', function () {
            console.log('module name validation');
            var name = dialog.getModuleName();
            expect(name).toBe('ListDialog');
        });
    });
    describe('List dialog event validation-3', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, list_dialog_1.ListDialog);
            document_editor_1.DocumentEditor.Inject(editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditorHistory: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = new list_dialog_1.ListDialog(editor.documentHelper);
        });
        afterAll(function (done) {
            editor.destroy();
            dialog.destroy();
            dialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 500);
        });
        it('List NumberFormat event validation', function (done) {
            console.log('List NumberFormat event validation');
            editor.openBlank();
            editor.editorModule.insertText('Hello World');
            editor.editor.applyNumbering('%1.', 'Number');
            dialog.showListDialog();
            setTimeout(function () {
                var event = { target: { value: "%2." } };
                dialog.onNumberFormatChanged(event);
                expect(dialog.viewModel.listLevel.numberFormat).toBe('%2.');
                dialog.onCancelButtonClick();
                done();
            });
        });
    });
});
