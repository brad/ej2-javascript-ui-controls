define(["require", "exports", "../../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../test-helper.spec", "../../../src/index", "../../../src/index", "../../../src/document-editor/implementation/list/list-level", "../../../src/document-editor/implementation/editor-history/editor-history", "../../../src/document-editor/implementation/writer/sfdt-export"], function (require, exports, document_editor_1, ej2_base_1, test_helper_spec_1, index_1, index_2, list_level_1, editor_history_1, sfdt_export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('WListLevel Validation Testing', function () {
        it('List Level  Testing', function () {
            console.log('List Level  Testing');
            var list = new list_level_1.WListLevel(undefined);
            list.followCharacter = 'Tab';
            list.listLevelPattern = 'Arabic';
            list.followCharacter;
            list.listLevelPattern;
            expect('').toBe('');
        });
    });
    describe('Increase indent and Decrease Indent in list paragraph', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        var paragraph;
        it('Select all list paragraphs and add indent', function () {
            console.log('Select all list paragraphs and add indent');
            container.editor.insertText('Item 1');
            container.editor.onEnter();
            container.editor.insertText('Item 2');
            container.editor.onEnter();
            container.editor.insertText('Item 3');
            container.selection.selectAll();
            container.editor.applyNumbering('%1.', 'Arabic');
            container.editor.increaseIndent();
            container.editor.increaseIndent();
            container.selection.moveToDocumentStart();
            paragraph = container.selection.start.paragraph;
            expect(paragraph.paragraphFormat.leftIndent).toBe(108);
            expect(paragraph.paragraphFormat.listFormat.listLevel.listLevelPattern).toBe('Arabic');
            expect(paragraph.paragraphFormat.listFormat.listLevelNumber).toBe(0);
        });
        it('Decrease indent at the first List paragraph', function () {
            console.log('Decrease indent at the first List paragraph');
            container.editor.decreaseIndent();
            paragraph = container.selection.start.paragraph;
            expect(paragraph.paragraphFormat.leftIndent).toBe(72);
            expect(paragraph.paragraphFormat.listFormat.listLevel.listLevelPattern).toBe('Arabic');
            expect(paragraph.paragraphFormat.listFormat.listLevelNumber).toBe(0);
        });
        it('Adding empty paragraph inbetween the list and increase the indent', function () {
            console.log('Adding empty paragraph inbetween the list and increase the indent');
            container.selection.moveToParagraphEnd();
            container.editor.onEnter();
            container.editor.handleBackKey();
            container.selection.moveToPreviousParagraph();
            container.editor.increaseIndent();
            container.selection.moveToNextParagraph();
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(0);
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listId).toBe(-1);
        });
        it('Increase indent at the second list Paragraph', function () {
            console.log('Increase indent at the second list Paragraph');
            container.selection.moveToNextParagraph();
            container.editor.increaseIndent();
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(96);
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listLevel.listLevelPattern).toBe('LowLetter');
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listLevelNumber).toBe(1);
        });
    });
    describe('Indenting the list using Tab key', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        var paragraph;
        it('Indenting at the first list paragraph using Tab key', function () {
            console.log('Indenting at the first list paragraph using Tab key');
            container.editor.insertText('Item 1');
            container.editor.onEnter();
            container.editor.insertText('Item 2');
            container.editor.onEnter();
            container.editor.insertText('Item 3');
            container.selection.selectAll();
            container.editor.applyNumbering('%1.', 'Arabic');
            container.selection.moveToDocumentStart();
            container.selection.handleTabKey(true, false);
            paragraph = container.selection.start.paragraph;
            expect(paragraph.paragraphFormat.leftIndent).toBe(72);
            expect(paragraph.paragraphFormat.listFormat.listLevel.listLevelPattern).toBe('Arabic');
            expect(paragraph.paragraphFormat.listFormat.listLevelNumber).toBe(0);
        });
        it('Select lists except first list paragraph and handle indent using Tab key', function () {
            console.log('Select lists except first list paragraph and handle indent using Tab key');
            container.selection.handleTabKey(false, true);
            container.selection.select('0;1;0', '0;2;7');
            container.selection.handleTabKey(true, false);
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listLevelNumber).toBe(1);
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listLevel.listLevelPattern).toBe('LowLetter');
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(96);
        });
        it('Select all list paragraphs and add indent using Tab key', function () {
            console.log('Select all list paragraphs and add indent using Tab key');
            container.selection.handleTabKey(false, true);
            container.selection.selectAll();
            container.selection.handleTabKey(true, false);
            paragraph = container.selection.start.paragraph;
            expect(paragraph.paragraphFormat.leftIndent).toBe(72);
            expect(paragraph.paragraphFormat.listFormat.listLevel.listLevelPattern).toBe('Arabic');
            expect(paragraph.paragraphFormat.listFormat.listLevelNumber).toBe(0);
        });
        it('Adding empty paragraph inbetween the list and increase the indent', function () {
            console.log('Adding empty paragraph inbetween the list and increase the indent');
            container.selection.moveToDocumentStart();
            container.selection.moveToParagraphEnd();
            container.editor.onEnter();
            container.editor.handleBackKey();
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(0);
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listId).toBe(-1);
        });
        it('Increasing the indent for list paragraph after empty paragraph', function () {
            container.selection.moveToNextParagraph();
            container.selection.handleTabKey(true, false);
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(132);
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listLevel.listLevelPattern).toBe('LowLetter');
            expect(container.selection.start.paragraph.paragraphFormat.listFormat.listLevelNumber).toBe(1);
        });
    });
    describe('To check the direct formatting value is cleared while applying list', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        it('To check the direct formatting of leftIndent value is cleared while applying list', function () {
            console.log('To check the direct formatting of leftIndent value is cleared while applying list');
            container.editor.insertText('Item 1');
            container.editor.applyNumbering('%1.', 'Arabic');
            var propertyType = index_1.WUniqueFormat.getPropertyType(container.selection.start.paragraph.paragraphFormat.uniqueParagraphFormat.uniqueFormatType, 'leftIndent');
            expect(container.selection.start.paragraph.paragraphFormat.uniqueParagraphFormat.propertiesHash.containsKey(propertyType)).toBe(false);
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(container.selection.start.paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat.leftIndent);
        });
        it('To check the direct formatting of firstLineIndnet value is cleared while applying list', function () {
            console.log('To check the direct formatting of firstLineIndnet value is cleared while applying list');
            var propertyType = index_1.WUniqueFormat.getPropertyType(container.selection.start.paragraph.paragraphFormat.uniqueParagraphFormat.uniqueFormatType, 'firstLineIndent');
            expect(container.selection.start.paragraph.paragraphFormat.uniqueParagraphFormat.propertiesHash.containsKey(propertyType)).toBe(false);
            expect(container.selection.start.paragraph.paragraphFormat.firstLineIndent).toBe(container.selection.start.paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat.firstLineIndent);
        });
        it('After undo action', function () {
            console.log('After undo action');
            container.editorHistory.undo();
            expect(container.selection.start.paragraph.paragraphFormat.firstLineIndent).toBe(0);
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(0);
        });
    });
    describe('Undo and Redo validation for list', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        it('Increasing indent in list paragraph and perform undo and redo action - 1', function () {
            console.log('Incresing indent in list paragraph and perform undo action - 1');
            container.editor.insertText('Item 1');
            container.editor.onEnter();
            container.editor.insertText('Item 2');
            container.editor.onEnter();
            container.editor.insertText('Item 3');
            container.selection.selectAll();
            container.editor.applyNumbering('%1.', 'Arabic');
            container.selection.moveToDocumentStart();
            var initialLeftIndent = container.selection.start.paragraph.paragraphFormat.leftIndent;
            var initialFirstLineIndent = container.selection.start.paragraph.paragraphFormat.firstLineIndent;
            for (var i = 0; i < 5; i++) {
                container.editor.increaseIndent();
            }
            var indentedLeftIndent = container.selection.start.paragraph.paragraphFormat.leftIndent;
            var indentedFirstLineIndent = container.selection.start.paragraph.paragraphFormat.firstLineIndent;
            for (var i = 0; i < 5; i++) {
                container.editorHistory.undo();
            }
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(initialLeftIndent);
            expect(container.selection.start.paragraph.paragraphFormat.firstLineIndent).toBe(initialFirstLineIndent);
            for (var i = 0; i < 5; i++) {
                container.editorHistory.redo();
            }
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(indentedLeftIndent);
            expect(container.selection.start.paragraph.paragraphFormat.firstLineIndent).toBe(indentedFirstLineIndent);
        });
        it('Increasing indent in list paragraph and perform undo and redo action - 2', function () {
            console.log('Incresing indent in list paragraph and perform undo and redo action - 2');
            container.openBlank();
            container.editor.insertText('Item 1');
            container.editor.onEnter();
            container.editor.insertText('Item 2');
            container.editor.onEnter();
            container.editor.insertText('Item 3');
            container.selection.selectAll();
            container.editor.applyNumbering('%1.', 'Arabic');
            container.selection.moveToDocumentStart();
            var initialLeftIndent = container.selection.start.paragraph.paragraphFormat.leftIndent;
            var initialFirstLineIndent = container.selection.start.paragraph.paragraphFormat.firstLineIndent;
            container.editor.increaseIndent();
            var indentedLeftIndent = container.selection.start.paragraph.paragraphFormat.leftIndent;
            var indentedFirstLineIndent = container.selection.start.paragraph.paragraphFormat.firstLineIndent;
            container.editorHistory.undo();
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(initialLeftIndent);
            expect(container.selection.start.paragraph.paragraphFormat.firstLineIndent).toBe(initialFirstLineIndent);
            container.editorHistory.redo();
            for (var i = 0; i < 5; i++) {
                container.editorHistory.undo();
                container.editorHistory.redo();
            }
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(indentedLeftIndent);
            expect(container.selection.start.paragraph.paragraphFormat.firstLineIndent).toBe(indentedFirstLineIndent);
        });
    });
    describe('Applying and removing the list and checking the indentation value', function () {
        var container;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_2.Editor, index_1.Selection, editor_history_1.EditorHistory, sfdt_export_1.SfdtExport);
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
        it('Applying and removing the list and checking the indentation value for bulleted list', function () {
            console.log('Applying and removing the list and checking the indentation value for bulleted list');
            container.openBlank();
            container.editor.insertText('This is a bullet');
            container.editor.applyBullet('\uf0b7', 'Symbol');
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(36);
            container.editor.applyBullet('\uf0b7', 'Symbol');
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(0);
        });
        it('Applying and removing the list and checking the indentation value for numbered numbered list', function () {
            console.log('Applying and removing the list and checking the indentation value for numbered list');
            container.openBlank();
            container.openBlank();
            container.editor.insertText('This is a bullet');
            container.editor.applyNumbering('%1.', 'Arabic');
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(36);
            container.editor.applyNumbering('%1.', 'Arabic');
            expect(container.selection.start.paragraph.paragraphFormat.leftIndent).toBe(0);
        });
    });
});
