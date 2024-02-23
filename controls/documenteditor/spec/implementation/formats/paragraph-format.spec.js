define(["require", "exports", "../../../src/document-editor/implementation/format/paragraph-format", "../../../src/document-editor/implementation/format/list-format", "@syncfusion/ej2-base", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/selection/selection", "../../../src/document-editor/implementation/editor/editor", "../../../src/document-editor/implementation/editor-history/editor-history", "../../test-helper.spec"], function (require, exports, paragraph_format_1, list_format_1, ej2_base_1, document_editor_1, selection_1, editor_1, editor_history_1, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Paragraph Validation Testing', function () {
        afterEach(function () {
            paragraph_format_1.WParagraphFormat.clear();
            list_format_1.WListFormat.clear();
        });
        it('Copy format setting  Testing', function () {
            console.log('Copy format setting  Testing');
            var para = new list_format_1.WListFormat();
            para.listLevelNumber = 20;
            expect('').toBe('');
        });
        it('Copy format Testing', function () {
            console.log('Copy format Testing');
            var para = new paragraph_format_1.WParagraphFormat();
            var para1 = new paragraph_format_1.WParagraphFormat();
            para.copyFormat(para1);
            expect('').toBe('');
        });
        it('Copy format undefined Testing', function () {
            console.log('Copy format undefined Testing');
            var para = new paragraph_format_1.WParagraphFormat();
            para.copyFormat(undefined);
            expect('').toBe('');
        });
        it('Clone format Testing', function () {
            console.log('Clone format Testing');
            var para = new paragraph_format_1.WParagraphFormat();
            para.cloneFormat();
            expect('').toBe('');
        });
        it('destroy Testing', function () {
            console.log('destroy Testing');
            var para = new paragraph_format_1.WParagraphFormat();
            para.destroy();
            para.cloneFormat();
            expect(function () { para.destroy(); }).not.toThrowError();
        });
        it('Clear Format validation', function () {
            console.log('Clear Format validation');
            var format = new paragraph_format_1.WParagraphFormat();
            format.leftIndent = 10;
            format.rightIndent = 12;
            format.afterSpacing = 10;
            format.listFormat.listId = 1;
            format.listFormat.listLevelNumber = 0;
            format.clearFormat();
            expect(format.uniqueParagraphFormat).toBeUndefined();
            expect(format.leftIndent).toBe(0);
            expect(format.rightIndent).toBe(0);
            expect(format.listFormat.listId).toBe(-1);
        });
        it('Text alignment right valdiation', function () {
            console.log('Text alignment right valdiation');
            var format = new paragraph_format_1.WParagraphFormat();
            format.textAlignment = 'Right';
            format.bidi = true;
            expect(format.textAlignment).toBe("Left");
        });
        it('style property default value', function () {
            console.log('style property default value');
            expect(paragraph_format_1.WParagraphFormat.getPropertyDefaultValue('styleName')).toBe('Normal');
        });
    });
    describe('Default Paragraph Format API Validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            var defaultParagraphFormat = {
                leftIndent: 30,
                afterSpacing: 20,
                textAlignment: 'Center'
            };
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.setDefaultParagraphFormat(defaultParagraphFormat);
            editor.appendTo('#container');
        });
        afterAll(function () {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
        });
        it('Check Text Alignment is center', function () {
            console.log('Check Text Alignment is center');
            expect(editor.selection.start.paragraph.paragraphFormat.textAlignment).toBe('Center');
        });
    });
    describe('Checking AutoSpacing value is appending or not', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, selection_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 500);
        });
        it('Return true if spaceBeforeAuto  is set to false', function () {
            console.log('spaceBeforeAuto');
            editor.editor.insertText('In 2000, Adventure Works Cycles bought a small manufacturing plant, Importadores Neptuno, located in Mexico. Importadores Neptuno manufactures several critical subcomponents for the Adventure Works Cycles product line. These subcomponents are shipped to the Bothell location for final product assembly.');
            expect(editor.documentHelper.paragraphFormat.spaceBeforeAuto).toBe(false);
        });
        it('Return true if spaceAfterAuto  is set to false', function () {
            console.log('spaceAfterAuto');
            expect(editor.documentHelper.paragraphFormat.spaceAfterAuto).toBe(false);
        });
        it('Return true if spaceAfterAuto value is set to true', function () {
            console.log('spaceAfterAuto');
            editor.documentHelper.paragraphFormat.spaceAfterAuto = true;
            expect(editor.documentHelper.paragraphFormat.spaceAfterAuto).toBe(true);
        });
        it('Return true if spaceBeforeAuto value is set to true', function () {
            console.log('spaceBeforeAuto');
            editor.documentHelper.paragraphFormat.spaceBeforeAuto = true;
            expect(editor.documentHelper.paragraphFormat.spaceBeforeAuto).toBe(true);
        });
        it('Return true if the spaceAfterAuto value is set to false', function () {
            console.log('spaceAfterAuto');
            editor.documentHelper.paragraphFormat.spaceAfterAuto = false;
            expect(editor.documentHelper.paragraphFormat.spaceAfterAuto).toBe(false);
        });
        it('Return true if the spaceBeforeAuto value is set to false', function () {
            console.log('spaceBeforeAuto');
            editor.documentHelper.paragraphFormat.spaceBeforeAuto = false;
            expect(editor.documentHelper.paragraphFormat.spaceBeforeAuto).toBe(false);
        });
    });
});
