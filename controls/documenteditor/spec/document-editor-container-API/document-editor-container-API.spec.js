define(["require", "exports", "@syncfusion/ej2-base", "../test-helper.spec", "../../src/document-editor/document-editor", "../../src/document-editor/implementation/editor/editor", "../../src/document-editor/implementation/selection/selection", "../../src/document-editor/implementation/editor-history/editor-history", "../../src/document-editor/implementation/writer/sfdt-export"], function (require, exports, ej2_base_1, test_helper_spec_1, document_editor_1, editor_1, selection_1, editor_history_1, sfdt_export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('CurrentuserAPI', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        it('CurrentuserAPI', function () {
            console.log('CurrentuserAPI');
            container.currentUser = "vijay";
            container.editor.insertText("Hello");
            container.enableTrackChanges = true;
            container.editor.insertText("world");
            expect(container.currentUser).toEqual("vijay");
        });
    });
    describe('documentEditorSettingsAPI', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        it('documentEditorSettingsAPI', function () {
            console.log('documentEditorSettingsAPI');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            container.documentEditorSettings.formFieldSettings.formFillingMode = 'Inline';
            var formFieldNames1 = container.getFormFieldNames();
            expect(formFieldNames1.length).toEqual(3);
            var field = container.getFormFieldInfo(formFieldNames1[1]);
            field.name = 'CheckBox3';
            container.setFormFieldInfo(formFieldNames1[1], field);
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2.length).toEqual(2);
            container.editor.stopProtection('123');
        });
    });
    describe('Script error throws whenever using refresh API,', function () {
        var documentEditor;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            documentEditor = new document_editor_1.DocumentEditor();
            documentEditor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            documentEditor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            documentEditor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            documentEditor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            documentEditor.appendTo("#container");
        });
        afterAll(function (done) {
            documentEditor.destroy();
            document.body.removeChild(document.getElementById('container'));
            documentEditor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
    });
    describe('isDocumentEmptyAPI', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        it('isDocumentEmpty API Checking with document Body', function () {
            console.log('isDocumentEmpty API Checking with document Body');
            container.openBlank();
            expect(container.isDocumentEmpty).toBeTruthy();
            container.editor.insertText("Hello");
            expect(container.isDocumentEmpty).toBeFalsy();
            container.selection.selectAll();
            container.editor.delete();
            expect(container.isDocumentEmpty).toBeTruthy();
        });
        it('isDocumentEmpty API Checking with document Header', function () {
            console.log('isDocumentEmpty API Checking with document Header');
            container.openBlank();
            expect(container.isDocumentEmpty).toBeTruthy();
            container.selection.goToHeader();
            container.editor.insertText("Header");
            expect(container.isDocumentEmpty).toBeFalsy();
            container.selection.selectAll();
            container.editor.delete();
            expect(container.isDocumentEmpty).toBeTruthy();
        });
        it('isDocumentEmpty API Checking with document Footer', function () {
            console.log('isDocumentEmpty API Checking with document Footer');
            container.openBlank();
            expect(container.isDocumentEmpty).toBeTruthy();
            container.selection.goToFooter();
            container.editor.insertText("Footer");
            expect(container.isDocumentEmpty).toBeFalsy();
            container.selection.selectAll();
            container.editor.delete();
            expect(container.isDocumentEmpty).toBeTruthy();
        });
    });
});
