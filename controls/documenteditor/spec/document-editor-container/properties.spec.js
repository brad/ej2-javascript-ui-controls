define(["require", "exports", "../../src/document-editor-container/document-editor-container", "../../src/document-editor-container/tool-bar/tool-bar", "@syncfusion/ej2-base"], function (require, exports, document_editor_container_1, tool_bar_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Document Editor container properties', function () {
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
            container.destroy();
            expect(element.childNodes.length).toBe(0);
            document.body.removeChild(element);
            expect(function () { container.destroy(); }).not.toThrowError();
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
        });
        it('showPropertiesPane', function () {
            console.log('showPropertiesPane');
            container.onPropertyChanged({ showPropertiesPane: false }, {});
            var ele = document.getElementsByClassName("e-de-pane")[0];
            expect(ele.style.display).toEqual("none");
            container.onPropertyChanged({ showPropertiesPane: true }, {});
            ele = document.getElementsByClassName("e-de-pane")[0];
            expect(ele.style.display).toEqual("block");
            container.onPropertyChanged({ showPropertiesPane: false }, {});
            ele = document.getElementsByClassName("e-de-pane")[0];
            expect(ele.style.display).toEqual("none");
        });
    });
});
