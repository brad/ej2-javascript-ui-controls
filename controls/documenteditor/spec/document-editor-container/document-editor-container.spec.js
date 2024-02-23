define(["require", "exports", "../../src/document-editor-container/document-editor-container", "../../src/document-editor-container/tool-bar/tool-bar", "@syncfusion/ej2-base"], function (require, exports, document_editor_container_1, tool_bar_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Document Editor container initialization', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ showPropertiesPane: true });
            container.appendTo(element);
        });
        it('Init container with toolbar', function () {
            console.log('Init container with toolbar');
            container.onPropertyChanged({}, {});
            expect(container.toolbarContainer.childNodes.length).toBeGreaterThan(0);
        });
        it('Get Persist Data', function () {
            console.log('Get Persist Data');
            expect(container.getPersistData()).toBe('documenteditor-container');
        });
        it('Test control destroy 1', function (done) {
            console.log('Test control destroy 1');
            var element = container.element;
            setTimeout(function () {
                expect(function () { container.destroy(); }).not.toThrowError();
                expect(element.childNodes.length).toBe(0);
                document.body.innerHTML = '';
                element = undefined;
                container = undefined;
                done();
            }, 1000);
        });
    });
    describe('Property vaidation', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ showPropertiesPane: true, enableComment: false });
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
        it('Check enable comment in DocumentEditor', function (done) {
            console.log('Check enable comment in DocumentEditor');
            setTimeout(function () {
                expect(container.documentEditor.enableComment).toBe(false);
                done();
            }, 10);
        });
        it('Properties pane enable validation', function () {
            console.log('Properties pane enable validation');
            container.documentEditor.openBlank();
            container.restrictEditing = true;
            container.showPropertiesPane = true;
            expect(container.showPropertiesPane).toBe(true);
        });
    });
    describe('Document Editor container initialization without element id', function () {
        var container;
        var container2;
        var element;
        var element2;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            element2 = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document.body.appendChild(element2);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ showPropertiesPane: false });
            container.appendTo(element);
            container2 = new document_editor_container_1.DocumentEditorContainer({ showPropertiesPane: false });
            container2.appendTo(element2);
        });
        afterAll(function () {
            container.destroy();
            container2.destroy();
            expect(element.childNodes.length).toBe(0);
            document.body.removeChild(element);
            document.body.removeChild(element2);
            expect(function () { container.destroy(); }).not.toThrowError();
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
        });
        it('Open context menu with mutiple document editor in same page', function () {
            var event = new MouseEvent('contextmenu', { clientX: 122, clientY: 156 });
            container.documentEditor.documentHelper.viewerContainer.dispatchEvent(event);
            var elements = document.getElementsByClassName('e-contextmenu-wrapper');
            for (var j = 0; j < elements.length; j++) {
                expect(elements[j].getElementsByClassName('e-de-copy').length).toBe(1);
            }
        });
    });
    describe('Show/Hide properties pane tooltip validation', function () {
        var container;
        var element;
        beforeAll(function () {
            element = ej2_base_1.createElement('div');
            document.body.appendChild(element);
            document_editor_container_1.DocumentEditorContainer.Inject(tool_bar_1.Toolbar);
            container = new document_editor_container_1.DocumentEditorContainer({ showPropertiesPane: false });
            container.appendTo(element);
        });
        it('Show/Hide properties pane tooltip validation', function () {
            console.log('Show/Hide properties pane tooltip validation');
            var element = container.toolbarContainer.childNodes[1].childNodes[0];
            expect(element.title).toBe('Show properties pane');
        });
    });
    describe('insertText API validation when restrictEditing is enabled', function () {
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
            document.body.removeChild(element);
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
        });
        it("insertText API validation when restrictEditing is enabled", function () {
            console.log("insertText API validation when restrictEditing is enabled");
            container.restrictEditing = true;
            setTimeout(function () {
                container.documentEditor.editor.insertText("Hello");
                expect(container.documentEditor.selection.start.currentWidget.children.length).toBe(0);
            });
        });
    });
});
