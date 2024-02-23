define(["require", "exports", "@syncfusion/ej2-base", "../../../src/document-editor/document-editor", "../../test-helper.spec", "../../../src/index", "../../../src/index"], function (require, exports, ej2_base_1, document_editor_1, test_helper_spec_1, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('New Document - Create and Apply Style', function () {
        var editor;
        var documentHelper;
        var event;
        var currentPara = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true });
            editor.acceptTab = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            documentHelper.destroy();
            documentHelper = undefined;
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Paragraph Style', function () {
            console.log('Paragraph Style');
            editor.openBlank();
            var styleJson = '{"type":"Paragraph","name":"Style3","basedOn":"Normal","next":"Normal","characterFormat":{"bold":true,"italic":true,"underline":"Single","fontSize":24.0,"fontFamily":"Monotype Corsiva"}}';
            var style = editor.editorModule.createStyleIn(styleJson, undefined);
            editor.editorModule.insertText('Heading');
            editor.editorModule.applyStyle(style.name);
            expect(editor.selection.characterFormat.fontFamily).toBe("Monotype Corsiva");
            expect(editor.selection.characterFormat.fontSize).toBe(24.0);
            expect(editor.selection.characterFormat.bold).toBe(true);
            expect(editor.selection.characterFormat.italic).toBe(true);
            expect(editor.selection.characterFormat.underline).toBe('Single');
            expect(editor.selection.characterFormat.fontColor).toBe("#00000000");
        });
    });
});
