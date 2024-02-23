define(["require", "exports", "../../src/document-editor/document-editor", "../../src/index", "../test-helper.spec", "@syncfusion/ej2-base", "../../src/index", "../../src/index", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, document_editor_1, index_1, test_helper_spec_1, ej2_base_1, index_2, index_3, index_4, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Selection Module Unit Test script', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container', styles: 'width:100%;height:500px' });
            document.body.innerHTML = '';
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        beforeEach(function () {
            editor.openBlank();
            editor.editorModule.insertText('Adventure Works cycles');
            documentHelper.selection.selectAll();
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
    });
    describe('Selection Public APi testing ', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_3.Selection, index_1.SfdtExport, index_2.Editor, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true, enableEditorHistory: true });
            editor.enableLocalPaste = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Cut, Copy , paste validation', function () {
            console.log('Cut, Copy , paste validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selection.copy();
            expect(editor.editorModule.copiedData).not.toBe('');
            editor.editorModule.paste();
            editor.selection.selectAll();
            editor.editor.cut();
            expect(editor.selectionModule.start.paragraph.isEmpty()).toBe(true);
            editor.editorModule.insertText('Syncfusion Software');
            expect(editor.selectionModule.start.paragraph.isEmpty()).toBe(false);
        });
        it('insert hyperlink with same display text', function () {
            console.log('insert hyperlink with same display text');
            var text = editor.selection.text;
            editor.editorModule.insertHyperlinkInternal('https://syncfusion.com', text, true);
        });
        it('Insert hyperlink with different display text', function () {
            console.log('Insert hyperlink with different display text');
            editor.editorModule.insertHyperlinkInternal('https://syncfusion.com', 'Syncfusion', true);
        });
        it('Toggle text alignment', function () {
            console.log('Toggle text alignment');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.toggleTextAlignment('Center');
            expect(editor.selectionModule.paragraphFormat.textAlignment).toBe('Center');
            editor.selectionModule.toggleTextAlignment('Center');
            expect(editor.selectionModule.paragraphFormat.textAlignment).toBe('Left');
            editor.selectionModule.toggleTextAlignment('Center');
            expect(editor.selectionModule.paragraphFormat.textAlignment).toBe('Center');
            editor.editorHistory.undo();
            expect(editor.selectionModule.paragraphFormat.textAlignment).toBe('Left');
            editor.editorHistory.redo();
            expect(editor.selectionModule.paragraphFormat.textAlignment).toBe('Center');
        });
        it('Increase indent and decrease indent', function () {
            console.log('Increase indent and decrease indent');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.increaseIndent();
            expect(editor.selectionModule.paragraphFormat.leftIndent).toBeGreaterThan(0);
            editor.selectionModule.decreaseIndent();
            expect(editor.selectionModule.paragraphFormat.leftIndent).toBeGreaterThanOrEqual(0);
            editor.editorHistory.undo();
            expect(editor.selectionModule.paragraphFormat.leftIndent).toBeGreaterThan(0);
            editor.editorHistory.redo();
            expect(editor.selectionModule.paragraphFormat.leftIndent).toBeGreaterThanOrEqual(0);
        });
        it('Add selection range testing', function () {
            console.log('Add selection range testing');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.start.setPositionForCurrentIndex('0;0;0;0;5');
            expect(editor.selection.start.hierarchicalPosition).toBe('0;0;0;0;5');
            editor.selection.end.setPositionForCurrentIndex('0;0;0;0;7');
        });
    });
    describe('Selection Public APi testing - 2', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_3.Selection, index_2.Editor, editor_history_1.EditorHistory);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true, enableEditorHistory: true });
            editor.enableLocalPaste = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Toggle Bold texting', function () {
            console.log('Toggle Bold texting');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.toggleBold();
            expect(editor.selectionModule.characterFormat.bold).toBe(true);
            editor.selectionModule.toggleBold();
            expect(editor.selectionModule.characterFormat.bold).toBe(false);
            editor.selectionModule.toggleBold();
            expect(editor.selectionModule.characterFormat.bold).toBe(true);
            editor.editorHistory.undo();
            expect(editor.selectionModule.characterFormat.bold).toBe(false);
            editor.editorHistory.redo();
            expect(editor.selectionModule.characterFormat.bold).toBe(true);
        });
        it('Toggle italic validation', function () {
            console.log('Toggle italic validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.toggleItalic();
            expect(editor.selectionModule.characterFormat.italic).toBe(true);
            editor.selectionModule.toggleItalic();
            expect(editor.selectionModule.characterFormat.italic).toBe(false);
            editor.selectionModule.toggleItalic();
            expect(editor.selectionModule.characterFormat.italic).toBe(true);
            editor.editorHistory.undo();
            expect(editor.selectionModule.characterFormat.italic).toBe(false);
            editor.editorHistory.redo();
            expect(editor.selectionModule.characterFormat.italic).toBe(true);
        });
        it('Toggle Underline validation', function () {
            console.log('Toggle Underline validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.toggleUnderline('Single');
            expect(editor.selectionModule.characterFormat.underline).toBe('Single');
            editor.selectionModule.toggleUnderline('Single');
            expect(editor.selectionModule.characterFormat.underline).toBe('None');
            editor.selectionModule.toggleUnderline('Single');
            expect(editor.selectionModule.characterFormat.underline).toBe('Single');
            editor.editorHistory.undo();
            expect(editor.selectionModule.characterFormat.underline).toBe('None');
            editor.editorHistory.redo();
            expect(editor.selectionModule.characterFormat.underline).toBe('Single');
        });
        it('Toggle highlight validation', function () {
            console.log('Toggle highlight validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.toggleHighlightColor('Yellow');
            expect(editor.selectionModule.characterFormat.highlightColor).toBe('Yellow');
            editor.selectionModule.toggleHighlightColor('Yellow');
            expect(editor.selectionModule.characterFormat.highlightColor).toBe('NoColor');
            editor.selectionModule.toggleHighlightColor('Yellow');
            expect(editor.selectionModule.characterFormat.highlightColor).toBe('Yellow');
            editor.editorHistory.undo();
            expect(editor.selectionModule.characterFormat.highlightColor).toBe('NoColor');
            editor.editorHistory.redo();
            expect(editor.selectionModule.characterFormat.highlightColor).toBe('Yellow');
        });
        it('Toggle Strike through validation', function () {
            console.log('Toggle Strike through validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.toggleStrikethrough();
            expect(editor.selectionModule.characterFormat.strikethrough).toBe('SingleStrike');
            editor.selectionModule.toggleStrikethrough();
            expect(editor.selectionModule.characterFormat.strikethrough).toBe('None');
            editor.selectionModule.toggleStrikethrough('SingleStrike');
            expect(editor.selectionModule.characterFormat.strikethrough).toBe('SingleStrike');
            editor.editorHistory.undo();
            expect(editor.selectionModule.characterFormat.strikethrough).toBe('None');
            editor.editorHistory.redo();
            expect(editor.selectionModule.characterFormat.strikethrough).toBe('SingleStrike');
        });
        it('Toggle Subscript validation', function () {
            console.log('Toggle Subscript validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selection.toggleSubscript();
            expect(editor.selection.characterFormat.baselineAlignment).toBe('Subscript');
            editor.selection.toggleSubscript();
            expect(editor.selection.characterFormat.baselineAlignment).toBe('Normal');
            editor.selection.toggleSubscript();
            expect(editor.selection.characterFormat.baselineAlignment).toBe('Subscript');
            editor.editorHistory.undo();
            expect(editor.selectionModule.characterFormat.baselineAlignment).toBe('Normal');
            editor.editorHistory.redo();
            expect(editor.selectionModule.characterFormat.baselineAlignment).toBe('Subscript');
        });
        it('Toggle Superscript validation', function () {
            console.log('Toggle Superscript validation');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            editor.selectionModule.toggleSuperscript();
            expect(editor.selectionModule.characterFormat.baselineAlignment).toBe('Superscript');
            editor.selectionModule.toggleSuperscript();
            expect(editor.selectionModule.characterFormat.baselineAlignment).toBe('Normal');
            editor.selectionModule.toggleSuperscript();
            expect(editor.selectionModule.characterFormat.baselineAlignment).toBe('Superscript');
            editor.editorHistory.undo();
            expect(editor.selectionModule.characterFormat.baselineAlignment).toBe('Normal');
            editor.editorHistory.redo();
            expect(editor.selectionModule.characterFormat.baselineAlignment).toBe('Superscript');
        });
        it('Get Selected text and Move to previous paragraph end ', function () {
            console.log('Get Selected text and Move to previous paragraph end ');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion Software');
            editor.editorModule.onEnter();
            editor.editorModule.insertText('Syncfusion Software');
            var start = editor.selection.getDocumentStart();
            start.setPositionInternal(start);
            var end = new index_4.TextPosition(editor);
            end.setPositionForCurrentIndex(start.paragraph.getHierarchicalIndex('0;10'));
            editor.selectionModule.selectPosition(start, end);
            expect(editor.selectionModule.text).toBe('Syncfusion');
            editor.selectionModule.selectPosition(editor.documentEnd, editor.documentEnd);
            editor.selectionModule.start.moveToPreviousParagraph(editor.selectionModule);
        });
    });
    describe('Selection with out clearing multi selection', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_3.Selection, index_2.Editor);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true });
            editor.enableLocalPaste = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
    });
    describe('Select Current Word', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_3.Selection, index_2.Editor);
            editor = new document_editor_1.DocumentEditor({ isReadOnly: false, enableEditor: true, enableSelection: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
    });
    describe('Cut and Copy operation without SfdtExport', function () {
        var editor;
        var documentHelper;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_3.Selection, index_2.Editor);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false, enableSelection: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
    });
});
