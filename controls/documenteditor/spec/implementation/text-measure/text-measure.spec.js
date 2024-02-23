define(["require", "exports", "@syncfusion/ej2-base", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/editor/editor", "../../../src/document-editor/implementation/selection/selection", "../../../src/document-editor/implementation/format/character-format", "../../test-helper.spec"], function (require, exports, ej2_base_1, document_editor_1, editor_1, selection_1, character_format_1, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Text measuring logic validation', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection);
            container = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableSfdtExport: true });
            container.documentEditorSettings.enableOptimizedTextMeasuring = true;
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
        it('Initial font height validation', function () {
            var charFormat = new character_format_1.WCharacterFormat(undefined);
            container.documentHelper.textHelper.getHeight(charFormat);
            var optimizedHeight = container.documentHelper.heightInfoCollection['calibri;11'].Height;
        });
    });
});
