define(["require", "exports", "../../src/document-editor/document-editor", "../../src/document-editor/index", "@syncfusion/ej2-base", "../../src/index", "../test-helper.spec", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history"], function (require, exports, document_editor_1, index_1, ej2_base_1, index_2, test_helper_spec_1, index_3, editor_history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Paste content validation', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableEditorHistory: true, isReadOnly: false, enableLocalPaste: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, editor_history_1.EditorHistory);
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
            }, 1000);
        });
    });
    describe('Paste Text Formatting formatting option', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableEditorHistory: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, editor_history_1.EditorHistory);
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
            }, 1000);
        });
        it('Paste Text Formatting formatting option', function () {
            console.log('Paste Text Formatting formatting option');
            editor.editor.copiedTextContent = 'Welcome to the new world';
            editor.editor.copiedContent = '';
            editor.editor.pasteContents(editor.editor.copiedTextContent);
            editor.editor.applyPasteOptions('KeepSourceFormatting');
        });
    });
    describe('Toc content creation validation', function () {
        var editor = undefined;
        var tocSettings = {
            startLevel: 1,
            endLevel: 3,
            includeHyperlink: true,
            includePageNumber: true,
            rightAlign: true
        };
        var text = "welcome";
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, enableEditorHistory: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, editor_history_1.EditorHistory);
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
            }, 1000);
        });
        it('Applying style on selection including para mark and inserting Toc', function () {
            console.log('Applying style on selection including para mark and inserting Toc');
            editor.editor.insertText(text);
            editor.selection.selectAll();
            editor.editor.applyStyle('Heading 1');
            editor.selection.handleHomeKey();
            editor.editor.handleEnterKey();
            editor.selection.handleUpKey();
            editor.editor.insertTableOfContents(tocSettings);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[6].text).toBe(text);
        });
        it('Applying style on selection not including para mark and inserting Toc', function () {
            console.log('Applying style on selection not including para mark and inserting Toc');
            editor.openBlank();
            editor.editor.insertText(text);
            editor.selection.handleHomeKey();
            editor.selection.selectCurrentWord();
            editor.editor.applyStyle('Heading 1');
            editor.selection.handleHomeKey();
            editor.editor.handleEnterKey();
            editor.selection.handleUpKey();
            editor.editor.insertTableOfContents(tocSettings);
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0].childWidgets[0].children[6].text).toBe(text);
        });
    });
    describe('Paste Heading content and TOC validation', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableSelection: true, enableEditorHistory: true, isReadOnly: false, enableSfdtExport: true, enableLocalPaste: true });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, editor_history_1.EditorHistory, index_1.SfdtExport);
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
        it('Copy Paste Heading and Inserting TOC', function () {
            console.log('Copy Paste Heading and Inserting TOC');
            editor.editor.insertText('Heading1');
            editor.selection.selectAll();
            editor.editor.applyStyle('Heading 1');
            editor.selection.copy();
            editor.selection.handleRightKey();
            editor.editor.onEnter();
            editor.editor.paste();
            editor.selection.handleUpKey();
            editor.selection.handleHomeKey();
            editor.editor.onEnter();
            editor.selection.handleUpKey();
            editor.editor.insertTableOfContents();
            expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets.length).toBe(6);
        });
        it('Copy Paste word in paragraph', function () {
            console.log('Copy Paste word in paragraph');
            editor.openBlank();
            editor.editor.insertText('Hello World');
            editor.selection.selectAll();
            editor.editor.applyStyle('Heading 1');
            editor.selection.handleRightKey();
            editor.selection.handleLeftKey();
            editor.selection.handleLeftKey();
            editor.selection.selectCurrentWord();
            editor.selection.copy();
            editor.selection.handleRightKey();
            editor.editor.onEnter();
            editor.editor.paste();
            expect(editor.selection.paragraphFormat.styleName).toBe('Normal');
        });
        it('Copy Paste whole paragraph', function () {
            console.log('Copy Paste whole paragraph');
            editor.openBlank();
            editor.editor.insertText('Hello World');
            editor.selection.selectAll();
            editor.editor.applyStyle('Heading 1');
            editor.selection.copy();
            editor.selection.handleRightKey();
            editor.editor.onEnter();
            editor.editor.paste();
            expect(editor.selection.paragraphFormat.styleName).toBe('Heading 1');
        });
    });
    describe('apply list to rtl paragraph with history validation', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, enableEditorHistory: true, isReadOnly: false, enableLocalPaste: false });
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_3.Selection, editor_history_1.EditorHistory);
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
            }, 1000);
        });
        it('undo after list apply to RTL', function () {
            console.log('undo after list apply to RTL');
            editor.editorHistory.undo();
            expect(editor.selection.paragraphFormat.listLevelNumber).toBe(0);
        });
        it('Footer widgets y position validation', function () {
            console.log('Footer widgets y position validation');
            editor.openBlank();
            editor.selection.goToFooter();
            editor.editor.insertTable(2, 2);
            editor.editor.insertText('Check');
            expect(editor.documentHelper.pages[0].footerWidget.childWidgets[0].y).toBeLessThan(editor.documentHelper.pages[0].footerWidget.childWidgets[1].y);
        });
    });
});
