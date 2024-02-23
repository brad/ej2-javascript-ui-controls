define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/index", "../../src/index", "../../src/document-editor/implementation/editor-history/index", "../test-helper.spec"], function (require, exports, document_editor_1, ej2_base_1, index_1, index_2, index_3, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Selection Paragraph format line  spacing apply validation', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:100%;height:500px' });
            document.body.innerHTML = '';
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_3.EditorHistory, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true, enableEditorHistory: true });
            editor.acceptTab = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Linespacing Double apply validation', function () {
            console.log('Linespacing Double apply validation');
            editor.editor.insertText('Hello World');
            editor.selection.paragraphFormat.lineSpacingType = 'AtLeast';
            editor.selection.paragraphFormat.lineSpacing = 15;
            editor.selection.paragraphFormat.lineSpacing = 2;
            expect(editor.selection.paragraphFormat.lineSpacingType).toBe('Multiple');
            expect(editor.selection.paragraphFormat.lineSpacing).toBe(2);
        });
        it('undo after Linespacing Double apply validation', function () {
            console.log('undo after Linespacing Double apply validation');
            editor.editorHistory.undo();
            expect(editor.selection.paragraphFormat.lineSpacing).toBe(15);
            expect(editor.selection.paragraphFormat.lineSpacingType).toBe('AtLeast');
        });
        it('redo after Linespacing Double apply validation', function () {
            console.log('redo after Linespacing Double apply validation');
            editor.editorHistory.redo();
            expect(editor.selection.paragraphFormat.lineSpacingType).toBe('Multiple');
            expect(editor.selection.paragraphFormat.lineSpacing).toBe(2);
        });
    });
    describe('Selection Paragraph format line  spacing type apply validation', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:100%;height:500px' });
            document.body.innerHTML = '';
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_3.EditorHistory, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true, enableEditorHistory: true });
            editor.acceptTab = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('LinespacingType atleast apply validation', function () {
            console.log('LinespacingType atleast apply validation');
            editor.editor.insertText('Hello World');
            editor.selection.paragraphFormat.lineSpacing = 2;
            editor.selection.paragraphFormat.lineSpacingType = 'AtLeast';
            expect(editor.selection.paragraphFormat.lineSpacingType).toBe('AtLeast');
            expect(editor.selection.paragraphFormat.lineSpacing).toBe(12);
        });
        it('undo after LinespacingType atleast apply validation', function () {
            console.log('undo after LinespacingType atleast apply validation');
            editor.editorHistory.undo();
            expect(editor.selection.paragraphFormat.lineSpacing).toBe(2);
            expect(editor.selection.paragraphFormat.lineSpacingType).toBe('Multiple');
        });
        it('redo after LinespacingType atleast apply validation', function () {
            console.log('redo after LinespacingType atleast apply validation');
            editor.editorHistory.redo();
            expect(editor.selection.paragraphFormat.lineSpacingType).toBe('AtLeast');
            expect(editor.selection.paragraphFormat.lineSpacing).toBe(12);
        });
    });
    describe('Selection character format with empty paragraph inside', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:100%;height:500px' });
            document.body.innerHTML = '';
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_3.EditorHistory, index_2.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true, enableEditorHistory: true });
            editor.acceptTab = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            documentHelper = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Character format validation', function () {
            console.log('Character format validation');
            editor.editor.insertText('Hello World');
            editor.selection.selectAll();
            editor.selection.characterFormat.bold = true;
            editor.selection.handleEndKey();
            editor.editor.onEnter();
            editor.editor.onEnter();
            editor.editor.toggleBold();
            editor.editor.insertText('sample');
            expect(editor.selection.characterFormat.bold).toBe(false);
        });
        it('multipl paragraph validation', function () {
            console.log('multipl paragraph validation');
            editor.selection.handleShiftUpKey();
            editor.selection.handleShiftUpKey();
            expect(editor.selection.characterFormat.bold).toBeUndefined();
        });
        it('Character format underline validation ', function () {
            console.log('Character format underline validation ');
            editor.openBlank();
            editor.selection.selectAll();
            editor.selection.characterFormat.underline = 'Single';
            editor.selection.handleEndKey();
            editor.editor.insertText('Hello World');
            editor.editor.onEnter();
            editor.editor.toggleUnderline('None');
            editor.editor.onEnter();
            editor.editor.insertText('sample');
            expect(editor.selection.characterFormat.underline).toBe('None');
        });
        it('multipl paragraph underline validation', function () {
            console.log('multipl paragraph underline validation');
            editor.selection.handleShiftUpKey();
            editor.selection.handleShiftUpKey();
            expect(editor.selection.characterFormat.underline).toBeUndefined();
        });
        it('paragraph format different style validation', function () {
            console.log('paragraph format different style validation');
            editor.openBlank();
            editor.editor.applyStyle('Heading 1');
            editor.editor.insertText('Hello world');
            editor.editor.onEnter();
            editor.editor.applyStyle('Normal');
            editor.editor.insertText('sample');
            editor.selection.handleShiftUpKey();
            expect(editor.selection.paragraphFormat.styleName).toBeUndefined();
        });
        it('paragraph format sample style validation', function () {
            console.log('paragraph format sample style validation');
            editor.openBlank();
            editor.editor.applyStyle('Heading 1');
            editor.editor.insertText('Hello world');
            editor.editor.onEnter();
            editor.editor.applyStyle('Heading 1');
            editor.editor.insertText('sample');
            editor.selection.handleShiftUpKey();
            expect(editor.selection.paragraphFormat.styleName).toBe('Heading 1');
        });
        it('paragraph format different style with empty paragraph validation', function () {
            console.log('paragraph format different style with empty paragraph validation');
            editor.openBlank();
            editor.editor.applyStyle('Heading 1');
            editor.editor.insertText('Hello world');
            editor.editor.onEnter();
            editor.editor.onEnter();
            editor.editor.applyStyle('Normal');
            editor.editor.insertText('sample');
            editor.selection.handleShiftUpKey();
            editor.selection.handleShiftUpKey();
            expect(editor.selection.paragraphFormat.styleName).toBeUndefined();
        });
        it('Character format strikethrough validation', function () {
            console.log("'Character format strikethrough validation'");
            editor.openBlank();
            editor.editor.insertText('hello world');
            editor.editor.onEnter();
            editor.editor.insertText('hello world');
            editor.selection.selectAll();
            editor.editor.applyBullet(String.fromCharCode(61623), 'Symbol');
            expect(editor.selection.characterFormat.strikethrough).toBe('None');
            editor.editor.toggleStrikethrough();
            expect(editor.selection.characterFormat.strikethrough).toBe('SingleStrike');
            editor.editor.toggleStrikethrough();
            expect(editor.selection.characterFormat.strikethrough).toBe('None');
        });
    });
});
