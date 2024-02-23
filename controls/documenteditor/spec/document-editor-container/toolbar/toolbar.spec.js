define(["require", "exports", "../../../src/document-editor-container/tool-bar/tool-bar", "../../../src/document-editor-container/document-editor-container", "@syncfusion/ej2-base"], function (require, exports, tool_bar_1, document_editor_container_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Initialize toolbar ', function () {
        it('without container component', function () {
        });
    });
    describe('Customm toolbar validation', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ enableToolbar: false });
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
        it('inject custom toolbar validation', function () {
            console.log('inject custom toolbar validation');
            expect(container.toolbarModule).toBeUndefined();
            container.enableToolbar = true;
        }, 200);
    });
    describe('Custom Toolbar with Desroy Validatio', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ enableToolbar: true });
            container.appendTo(element);
        });
        afterAll(function () {
            expect(element.childNodes.length).toBe(0);
            document.body.removeChild(element);
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
        });
    });
    describe('updating the custom toolbar validation', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ enableToolbar: false });
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
        it('updating the custom toolbar', function () {
            console.log('updating the custom toolbar');
            expect(container.toolbarItems = ['Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'Separator', 'Comments',
                'TrackChanges']).not.toThrowError;
        }, 500);
    });
});
