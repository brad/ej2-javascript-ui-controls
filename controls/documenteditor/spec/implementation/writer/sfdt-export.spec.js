define(["require", "exports", "@syncfusion/ej2-base", "../../../src/index", "../../../src/document-editor/document-editor", "../../test-helper.spec", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/index", "../../../src/document-editor/implementation/writer/sfdt-export"], function (require, exports, ej2_base_1, index_1, document_editor_1, test_helper_spec_1, editor_history_1, index_2, sfdt_export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Sfdt Export auto spacing properties', function () {
        var editor;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSfdtExport: true });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function () {
            if (editor) {
                editor.destroy();
            }
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
        });
        it("Check value is true", function () {
            editor.openBlank();
            editor.selection.start.paragraph.paragraphFormat.spaceBeforeAuto = true;
            editor.selection.start.paragraph.paragraphFormat.spaceAfterAuto = true;
            var paragraphFormat = editor.sfdtExportModule.writeParagraphFormat(editor.selection.start.paragraph.paragraphFormat);
            expect(paragraphFormat.spaceBeforeAuto).toEqual(true);
            expect(paragraphFormat.spaceAfterAuto).toEqual(true);
        });
        it("Check value is false", function () {
            editor.openBlank();
            editor.selection.start.paragraph.paragraphFormat.spaceBeforeAuto = false;
            editor.selection.start.paragraph.paragraphFormat.spaceAfterAuto = false;
            var paragraphFormat = editor.sfdtExportModule.writeParagraphFormat(editor.selection.start.paragraph.paragraphFormat);
            expect(paragraphFormat.spaceBeforeAuto).toEqual(false);
            expect(paragraphFormat.spaceAfterAuto).toEqual(false);
        });
        it("Check value is null or undefined", function () {
            editor.openBlank();
            var paragraphFormat = editor.sfdtExportModule.writeParagraphFormat(editor.selection.start.paragraph.paragraphFormat);
            expect(paragraphFormat.spaceBeforeAuto).toEqual(undefined);
            expect(paragraphFormat.spaceAfterAuto).toEqual(undefined);
        });
    });
});
