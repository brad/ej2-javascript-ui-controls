define(["require", "exports", "../../../src/document-editor/implementation/format/character-format", "@syncfusion/ej2-base", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/editor/editor", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/index", "../../test-helper.spec"], function (require, exports, character_format_1, ej2_base_1, document_editor_1, editor_1, editor_history_1, index_1, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Character Format Testing', function () {
        afterEach(function () {
            character_format_1.WCharacterFormat.clear();
        });
        it('Copy Format Testing', function () {
            console.log('Copy Format Testing');
            var charFormat = new character_format_1.WCharacterFormat();
            var charFormat1 = new character_format_1.WCharacterFormat();
            charFormat.bold = true;
            charFormat.fontSize = 12;
            charFormat1.copyFormat(charFormat);
            expect(charFormat1.fontSize).toBe(12);
        });
        it('Copy Format undefined Testing', function () {
            console.log('Copy Format undefined Testing');
            var charFormat = new character_format_1.WCharacterFormat();
            charFormat.copyFormat(undefined);
        });
        it('destroy Testing', function () {
            console.log('destroy Testing');
            var charFormat = new character_format_1.WCharacterFormat();
            charFormat.destroy();
            charFormat.cloneFormat();
            expect(function () { charFormat.destroy(); }).not.toThrowError();
        });
        it('Clone Format Testing', function () {
            console.log('Clone Format Testing');
            var charFormat = new character_format_1.WCharacterFormat();
            charFormat.cloneFormat();
        });
        it('Character Format Equal Format Testing', function () {
            console.log('Character Format Equal Format Testing');
            var charFormat = new character_format_1.WCharacterFormat();
            charFormat.isEqualFormat(charFormat);
            expect(charFormat.bold).toBe(false);
        });
        it('Default Value Testing', function () {
            console.log('Default Value Testing');
            var charFormat = new character_format_1.WCharacterFormat();
            expect(charFormat.bold).toBe(false);
        });
        it('set Property Value Testing', function () {
            console.log('set Property Value Testing');
            var charFormat = new character_format_1.WCharacterFormat();
            charFormat.bold = undefined;
            expect(charFormat.bold).toBe(false);
        });
        it('Clear Format validation', function () {
            console.log('Clear Format validation');
            var characterFormat = new character_format_1.WCharacterFormat();
            characterFormat.bold = true;
            characterFormat.italic = true;
            characterFormat.fontSize = 12;
            characterFormat.clearFormat();
            expect(characterFormat.uniqueCharacterFormat).toBeUndefined();
            expect(characterFormat.bold).toBe(false);
            expect(characterFormat.italic).toBe(false);
        });
        it('Character format Boldbidi validation', function () {
            console.log('Character format Boldbidi validation');
            var characterFormat = new character_format_1.WCharacterFormat();
            characterFormat.boldBidi = true;
            expect(characterFormat.boldBidi).toBe(true);
        });
        it('Character format Italicbidi validation', function () {
            console.log('Character format Italicbidi validation');
            var characterFormat = new character_format_1.WCharacterFormat();
            characterFormat.italicBidi = true;
            expect(characterFormat.italicBidi).toBe(true);
        });
        it('Character format FontFamily validation', function () {
            console.log('Character format FontFamily validation');
            var characterFormat = new character_format_1.WCharacterFormat();
            characterFormat.fontFamilyBidi = 'Arial';
            expect(characterFormat.fontFamilyBidi).toBe('Arial');
        });
        it('Character format FontSize validation', function () {
            console.log('Character format FontSize validation');
            var characterFormat = new character_format_1.WCharacterFormat();
            characterFormat.fontSizeBidi = 22;
            expect(characterFormat.fontSizeBidi).toBe(22);
        });
        it('Default value validation of bidi properties', function () {
            console.log('Default value validation of bidi properties');
            var characterFormat = new character_format_1.WCharacterFormat();
            expect(characterFormat.boldBidi).toBe(false);
            expect(characterFormat.italicBidi).toBe(false);
            expect(characterFormat.fontSizeBidi).toBe(11);
            expect(characterFormat.fontFamilyBidi).toBe('Calibri');
        });
    });
    describe('Default Character Format API Validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            var defaultCharacterFormat = {
                bold: true,
                italic: false,
                baselineAlignment: 'Normal',
                underline: 'Single',
                fontColor: "#000000",
                fontFamily: 'Times New Roman',
                fontSize: 8
            };
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, index_1.Selection, editor_history_1.EditorHistory);
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.setDefaultCharacterFormat(defaultCharacterFormat);
            editor.appendTo('#container');
        });
        afterAll(function () {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
        });
        it('Check bold is true', function () {
            console.log('Check bold is true');
            expect(editor.selection.start.paragraph.characterFormat.bold).toBe(true);
        });
    });
    describe('Check the characterFormat for arbic format apply', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, index_1.Selection, editor_history_1.EditorHistory, index_1.SfdtExport);
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
        it('Check the arbic fontFamily ', function () {
            console.log('apply the font family for arial');
            container.openBlank();
            container.editor.insertText("اثممخ");
            container.selection.select('0;0;0', '0;0;4');
            container.editorModule.onApplyCharacterFormat('fontFamily', 'Arial');
            expect(container.selection.characterFormat.fontFamilyBidi).toBe('Arial');
        });
    });
});
