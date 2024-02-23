define(["require", "exports", "../../../src/document-editor/document-editor", "../../../src/index", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/dialogs/form-field-check-box-dialog"], function (require, exports, document_editor_1, index_1, ej2_base_1, test_helper_spec_1, index_2, index_3, form_field_check_box_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Form field CheckBox dialog', function () {
        var editor;
        var dialog;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, form_field_check_box_dialog_1.CheckBoxFormFieldDialog);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            dialog = editor.checkBoxFormFieldDialogModule;
            dialog.show();
            dialog.onCancelButtonClick();
        });
        beforeEach(function () {
            editor.openBlank();
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
        it('Change Bidrirectional - Form field Checkbox Dialog', function () {
            console.log('Change Bidrirectional - Form field Checkbox Dialog');
            dialog.exactButton.checked = true;
            var event = {};
            event.value = 'exact';
            dialog.changeBidirectional(event);
            expect(dialog.autoButton.checked).toBe(false);
            event.value = '';
            dialog.exactButton.checked = false;
            dialog.changeBidirectional(event);
            expect(dialog.exactButton.checked).toBe(true);
        });
    });
    describe('Check API to modify CheckBox form field name in Inline mode', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_1.EditorHistory, index_1.SfdtExport);
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
        it('Check the number of form fields', function () {
            console.log('Check the number of form fields');
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
        it('Check the names of Form Fields', function () {
            console.log('Check the names of form fields');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            container.documentEditorSettings.formFieldSettings.formFillingMode = 'Inline';
            var formFieldNames1 = container.getFormFieldNames();
            expect(formFieldNames1[0]).toEqual('CheckBox1');
            expect(formFieldNames1[1]).toEqual('CheckBox2');
            expect(formFieldNames1[2]).toEqual('CheckBox3');
            var field = container.getFormFieldInfo(formFieldNames1[1]);
            field.name = 'CheckBox3';
            container.setFormFieldInfo(formFieldNames1[1], field);
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2[0]).toEqual('CheckBox1');
            expect(formFieldNames2[1]).toEqual('CheckBox3');
            container.editor.stopProtection('123');
        });
        it('Modifying form field without modifying name', function () {
            console.log('modifying Form Field without changing name');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            container.documentEditorSettings.formFieldSettings.formFillingMode = 'Inline';
            var formFieldNames1 = container.getFormFieldNames();
            var field = container.getFormFieldInfo(formFieldNames1[1]);
            field.defaultValue = true;
            field.type = "CheckBox";
            container.setFormFieldInfo(formFieldNames1[1], field);
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2.length).toEqual(3);
            container.editor.stopProtection('123');
        });
        it('Check new name for form fields', function () {
            console.log('Check unique name for form fields');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            container.documentEditorSettings.formFieldSettings.formFillingMode = 'Inline';
            var formFieldNames1 = container.getFormFieldNames();
            var field1 = container.getFormFieldInfo(formFieldNames1[1]);
            field1.name = 'NewFormFieldName';
            container.setFormFieldInfo(formFieldNames1[1], field1);
            var field2 = container.getFormFieldInfo("NewFormFieldName");
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2).toContain("NewFormFieldName");
            expect(field2.name).toBeDefined();
            container.editor.stopProtection('123');
        });
    });
    describe('Check API to modify CheckBox form field name in popup mode', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, index_1.EditorHistory, index_1.SfdtExport);
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
        it('Check the number of form fields', function () {
            console.log('Check the number of form fields');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            var formFieldNames1 = container.getFormFieldNames();
            expect(formFieldNames1.length).toEqual(3);
            var field = container.getFormFieldInfo(formFieldNames1[1]);
            field.name = 'CheckBox3';
            container.setFormFieldInfo(formFieldNames1[1], field);
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2.length).toEqual(2);
            container.editor.stopProtection('123');
        });
        it('Check the names of Form Fields', function () {
            console.log('Check the names of form fields');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            var formFieldNames1 = container.getFormFieldNames();
            expect(formFieldNames1[0]).toEqual('CheckBox1');
            expect(formFieldNames1[1]).toEqual('CheckBox2');
            expect(formFieldNames1[2]).toEqual('CheckBox3');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            var field = container.getFormFieldInfo(formFieldNames1[1]);
            field.name = 'CheckBox3';
            container.setFormFieldInfo(formFieldNames1[1], field);
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2[0]).toEqual('CheckBox1');
            expect(formFieldNames2[1]).toEqual('CheckBox3');
            container.editor.stopProtection('123');
        });
        it('Modifying form field without modifying name', function () {
            console.log('modifying Form Field without changing name');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            var formFieldNames1 = container.getFormFieldNames();
            var field = container.getFormFieldInfo(formFieldNames1[1]);
            field.defaultValue = true;
            field.type = "CheckBox";
            container.setFormFieldInfo(formFieldNames1[1], field);
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2.length).toEqual(3);
            container.editor.stopProtection('123');
        });
        it('Check new name for form fields', function () {
            console.log('Check unique name for form fields');
            container.openBlank();
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.insertFormField('CheckBox');
            container.editor.enforceProtection('123', 'FormFieldsOnly');
            var formFieldNames1 = container.getFormFieldNames();
            var field1 = container.getFormFieldInfo(formFieldNames1[1]);
            field1.name = 'NewFormFieldName';
            container.setFormFieldInfo(formFieldNames1[1], field1);
            var field2 = container.getFormFieldInfo("NewFormFieldName");
            var formFieldNames2 = container.getFormFieldNames();
            expect(formFieldNames2).toContain("NewFormFieldName");
            expect(field2.name).toBeDefined();
            container.editor.stopProtection('123');
        });
    });
    describe('816438-CR-Bug', function () {
        var editor;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, form_field_check_box_dialog_1.CheckBoxFormFieldDialog);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        beforeEach(function () {
            editor.openBlank();
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
    });
});
