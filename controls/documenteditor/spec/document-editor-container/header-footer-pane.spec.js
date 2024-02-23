define(["require", "exports", "../../src/document-editor-container/document-editor-container", "../../src/document-editor-container/tool-bar/tool-bar", "@syncfusion/ej2-base"], function (require, exports, document_editor_container_1, tool_bar_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Show hide header footer pane', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ showPropertiesPane: true });
            container.appendTo(element);
        });
        afterAll(function () {
            container.destroy();
            expect(element.childNodes.length).toBe(0);
            document.body.removeChild(element);
            expect(function () { container.destroy(); }).not.toThrowError();
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
        });
        it('Navigate to header and check pane display', function () {
            console.log('Navigate to header and check pane display');
            container.documentEditor.selection.goToHeader();
            expect(container.documentEditor.enableHeaderAndFooter).toBe(true);
        });
        it('Properties pane enable disable click function', function () {
            console.log('Properties pane enable disable click function');
            container.toolbarModule.showHidePropertiesPane();
            expect(container.documentEditor.enableHeaderAndFooter).toBe(true);
        });
        it('Close header pane and check pane', function () {
            console.log('Close header pane and check pane');
            container.toolbarModule.showHidePropertiesPane();
            container.headerFooterProperties.onClose();
            expect(container.documentEditor.enableHeaderAndFooter).toBe(false);
        });
    });
    describe('Show hide FormFiedld Validation In Header and Footer', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ showPropertiesPane: false });
            container.appendTo(element);
        });
        afterAll(function () {
            container.destroy();
            expect(element.childNodes.length).toBe(0);
            document.body.removeChild(element);
            expect(function () { container.destroy(); }).not.toThrowError();
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
        });
        it('Navigate to header and FormFiedld Validation ', function () {
            var editor = container.documentEditor;
            editor.selection.goToHeader();
            editor.editor.insertFormField("Text");
            expect(editor.documentHelper.formFields.length).toBe(0);
        });
    });
});
