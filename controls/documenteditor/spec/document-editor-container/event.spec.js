define(["require", "exports", "../../src/document-editor-container/document-editor-container", "../../src/document-editor-container/tool-bar/tool-bar", "@syncfusion/ej2-base"], function (require, exports, document_editor_container_1, tool_bar_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('DocumentEditorContainer Events', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer();
            container.appendTo(element);
        });
        afterAll(function () {
            expect(function () { container.destroy(); }).not.toThrowError();
            expect(element.childNodes.length).toBe(0);
            document.body.removeChild(element);
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
        });
        it('View change event', function () {
            container.documentEditor.viewChange = function (event) {
                fail();
            };
            container.contentChange = function (event) {
                fail();
            };
            container.documentEditor.layoutType = 'Continuous';
        });
        it('Comments button click', function () {
            container.contentChange = function (event) {
                fail();
            };
            container.documentEditor.editor.isUserInsert = true;
            container.documentEditor.editor.insertComment('');
            container.documentEditor.editor.isUserInsert = false;
        });
    });
});
