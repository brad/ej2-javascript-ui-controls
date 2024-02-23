define(["require", "exports", "../../src/document-editor/document-editor", "../../src/index", "@syncfusion/ej2-base", "../test-helper.spec", "../../src/document-editor/implementation/context-menu", "../../src/index", "../../src/document-editor/implementation/editor-history/editor-history", "../../src/index", "../../src/document-editor/implementation/dialogs/paragraph-dialog", "../../src/document-editor/implementation/dialogs/table-properties-dialog", "../../src/index"], function (require, exports, document_editor_1, index_1, ej2_base_1, test_helper_spec_1, context_menu_1, index_2, editor_history_1, index_3, paragraph_dialog_1, table_properties_dialog_1, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Context Menu Testing - 1', function () {
        var editor;
        var menu;
        var imageResizer;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection, index_4.ImageResizer);
            editor = new document_editor_1.DocumentEditor({
                enableContextMenu: true, enableEditor: true, enableImageResizer: true,
                enableSelection: true, isReadOnly: false
            });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            menu = editor.contextMenuModule;
            imageResizer = editor.imageResizerModule;
        });
        afterAll(function (done) {
            editor.destroy();
            menu.destroy();
            editor = undefined;
            menu = undefined;
            imageResizer.destroy();
            imageResizer = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Context Menu Opening Texting without selection', function () {
            console.log('Context Menu Opening Texting without selection');
            editor.editorModule.insertText('Syncfusion Software');
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                if (menu.contextMenuInstance.items[i].text === 'Cut' ||
                    menu.contextMenuInstance.items[i].text === 'Copy') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.classList.contains('e-disabled')).toBe(true);
                }
            }
            imageResizer.isImageResizing = true;
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            imageResizer.isImageResizing = false;
        });
        it('Context Menu Opening Texting with selection', function () {
            console.log('Context Menu Opening Texting with selection');
            editor.editorModule.insertText('Syncfusion Software');
            editor.selection.selectAll();
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                if (menu.contextMenuInstance.items[i].text === 'Cut' ||
                    menu.contextMenuInstance.items[i].text === 'Copy') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.classList.contains('e-disabled')).toBe(false);
                }
            }
        });
    });
    describe('Context Menu Testing - 2', function () {
        var editor;
        var menu;
        var paraDialog;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableComment: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            menu = editor.contextMenuModule;
            paraDialog = editor.paragraphDialogModule;
        });
        afterAll(function (done) {
            editor.destroy();
            menu.destroy();
            editor = undefined;
            menu = undefined;
            paraDialog.destroy();
            paraDialog = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Open Context Menu in read only mode', function () {
            console.log('Open Context Menu in read only mode');
            editor.editorModule.insertText('Syncfusion Software');
            editor.isReadOnly = true;
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                if (menu.contextMenuInstance.items[i].text === 'Cut') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.style.display).toBe('none');
                }
                if (menu.contextMenuInstance.items[i].text === 'Copy') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.style.display).toBe('');
                    break;
                }
            }
            editor.isReadOnly = false;
        });
        it('open Contextmenu in CommentOnly mode', function () {
            console.log('open Contextmenu in CommentOnly mode');
            editor.editor.addProtection('', 'CommentsOnly');
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                if (menu.contextMenuInstance.items[i].text === 'New Comment') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.style.display).toBe('block');
                    break;
                }
            }
            editor.editor.unProtectDocument();
        });
        it('open content Menu inside table', function () {
            console.log('open content Menu inside table');
            editor.editor.insertTable(2, 2);
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                var text = menu.contextMenuInstance.items[i].text;
                if (text === 'Table Properties' || text === 'Insert' || text === 'Delete') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.classList.contains('e-disabled')).toBe(false);
                }
            }
        });
        it('Open context menu in hyperlink', function () {
            console.log('Open context menu in hyperlink');
            editor.editorModule.insertHyperlinkInternal('https://syncfusion.com', 'Syncfusion Software', true);
            editor.selection.movePreviousPosition();
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.isReadOnly = true;
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            editor.isReadOnly = false;
            menu.contextMenuInstance.close();
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                var text = menu.contextMenuInstance.items[i].text;
                if (text === 'Hyperlink') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.style.display).toBe('none');
                }
            }
        });
    });
    describe('Context Menu Testing - 3 ', function () {
        var editor;
        var menu;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            menu.destroy();
            editor = undefined;
            menu = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('open context menu for with merge Cell option', function () {
            console.log('open context menu for with merge Cell option');
            editor.editor.insertTable(2, 2);
            editor.selection.handleShiftDownKey();
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                var text = menu.contextMenuInstance.items[i].text;
                if (text === 'Merge Cells') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.style.display).not.toBe('none');
                    element.click();
                }
            }
        });
        it('add custom context menu', function () {
            console.log('add custom context menu');
            var menuItems = [
                {
                    text: 'search',
                    id: '_search'
                }
            ];
            menu.enableCustomContextMenu = true;
            editor.contextMenu.addCustomMenu(menuItems, true, true);
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
            for (var i = 0; i < menu.contextMenuInstance.items.length; i++) {
                var text = menu.contextMenuInstance.items[i].text;
                if (text === 'search') {
                    var element = document.getElementById(menu.contextMenuInstance.items[i].id);
                    expect(element.style.display).not.toBe('none');
                    element.click();
                }
            }
            menu.handleContextMenuItem('container_search');
        });
    });
    describe('handle Context menu item validation-1 for editing', function () {
        var editor;
        var documentHelper;
        var menu;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.SfdtExport, context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection, table_properties_dialog_1.TablePropertiesDialog, index_4.ImageResizer);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableTablePropertiesDialog: true, enableParagraphDialog: true, enableHyperlinkDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            menu.destroy();
            editor = undefined;
            menu = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('cut,copy and paste', function () {
            console.log('cut,copy and paste');
            editor.editorModule.insertText('Adventure Works cycles');
            var event = { keyCode: 65, preventDefault: function () { }, ctrlKey: true, shiftKey: false, altKey: false, which: 0 };
            documentHelper.onKeyDownInternal(event);
            menu.handleContextMenuItem('container_contextmenu_cut');
            editor.editorHistory.undo();
            menu.handleContextMenuItem('container_contextmenu_copy');
            editor.enableLocalPaste = true;
            menu.handleContextMenuItem('container_contextmenu_paste');
        });
        it('insert and delete row', function () {
            console.log('insert and delete row');
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            menu.handleContextMenuItem('container_contextmenu_insert_above');
            editor.editorHistory.undo();
            menu.handleContextMenuItem('container_contextmenu_insert_below');
            editor.enableLocalPaste = true;
            menu.handleContextMenuItem('container_contextmenu_delete_row');
        });
        it('insert and delete column', function () {
            console.log('insert and delete column');
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            menu.handleContextMenuItem('container_contextmenu_insert_left');
            editor.editorHistory.undo();
            menu.handleContextMenuItem('container_contextmenu_insert_right');
            menu.handleContextMenuItem('container_contextmenu_delete_column');
        });
        it('table dialog open using context menu testing', function () {
            console.log('table dialog open using context menu testing');
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            menu.handleContextMenuItem('container_contextmenu_table_dialog');
        });
        it('paragraph dialog and hyperlink dilaog open using context menu', function () {
            console.log('paragraph dialog and hyperlink dilaog open using context menu');
            editor.openBlank();
            editor.editorModule.insertText('Syncfusion software');
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            editor.documentHelper.viewerContainer.dispatchEvent(event);
        });
        it('paragraph and hyperlink dialog open using contextmenu validation', function () {
            console.log('paragraph and hyperlink dialog open using contextmenu validation');
            editor.openBlank();
            editor.enableParagraphDialog = false;
            editor.enableHyperlinkDialog = false;
            menu.handleContextMenuItem('container_contextmenu_paragraph_dialog');
            menu.handleContextMenuItem('container_contextmenu_edit_hyperlink');
            menu.handleContextMenuItem('container_contextmenu_remove_hyperlink');
            editor.isReadOnly = true;
            menu.handleContextMenuItem('container_contextmenu_paste');
            editor.isReadOnly = false;
        });
    });
    describe('handle Context menu item validation-2 for editing', function () {
        var editor;
        var documentHelper;
        var menu;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection, index_1.SfdtExport);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            menu.destroy();
            editor = undefined;
            menu = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('insert and delete Table', function () {
            console.log('insert and delete Table');
            editor.openBlank();
            editor.editor.insertTable(2, 2);
            menu.handleContextMenuItem('container_contextmenu_complete_table_delete');
            editor.editorHistory.undo();
        });
        it('open and copy hyperlink', function () {
            console.log('open and copy hyperlink');
            editor.openBlank();
            editor.editorModule.insertText('www.google.com');
            editor.editorModule.onEnter();
            editor.selection.handleUpKey();
            editor.selection.handleRightKey();
            menu.handleContextMenuItem('container_contextmenu_copy_hyperlink');
            menu.handleContextMenuItem('container_contextmenu_open_hyperlink');
            menu.handleContextMenuItem('container_contextmenu_remove_hyperlink');
            var value = menu.disableBrowserContextmenu();
            expect(value).toBe(false);
        });
    });
    describe('Apply table auto fit types', function () {
        var editor;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection, index_1.SfdtExport);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Apply auto fit type fit to contents', function () {
            console.log('Apply auto fit type fit to contents');
            editor.editorModule.insertTable(2, 2);
            editor.selection.selectTable();
            editor.contextMenu.handleContextMenuItem('container_contextmenu_auto_fit_contents');
            expect(editor.selection.start.paragraph.associatedCell.ownerTable.tableFormat.allowAutoFit).toBe(true);
        });
        it('Apply auto fit type fit to window', function () {
            console.log('Apply auto fit type fit to window');
            editor.contextMenu.handleContextMenuItem('container_contextmenu_auto_fit_window');
            expect(editor.selection.start.paragraph.associatedCell.ownerTable.tableFormat.preferredWidthType).toBe('Percent');
        });
        it('Apply auto fit type fit to contents', function () {
            console.log('Apply auto fit type fit to contents');
            editor.contextMenu.handleContextMenuItem('container_contextmenu_fixed_column_width');
            expect(editor.selection.start.paragraph.associatedCell.ownerTable.tableFormat.allowAutoFit).toBe(false);
            expect(editor.selection.start.paragraph.associatedCell.ownerTable.tableFormat.preferredWidthType).toBe('Auto');
            expect(editor.selection.start.paragraph.associatedCell.cellFormat.preferredWidthType).toBe('Point');
        });
    });
    describe('Context Menu element show validation', function () {
        var editor;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection, index_1.SfdtExport, index_1.FontDialog, paragraph_dialog_1.ParagraphDialog);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableComment: true, enableFontDialog: true, enableParagraphDialog: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Show context menu with hyperlink dialog as false', function () {
            console.log('Show context menu with hyperlink dialog as false');
            editor.contextMenu.showHideElements(editor.selection);
            expect(document.getElementById(editor.element.id + '_contextmenu_hyperlink').style.display).toBe('none');
            expect(document.getElementById(editor.element.id + '_contextmenu_font_dialog').previousSibling.style.display).toBe('none');
        });
    });
    describe('Context menu notes options', function () {
        var editor;
        var documentHelper;
        var menu;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection, index_1.SfdtExport);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            menu.destroy();
            editor = undefined;
            menu = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Validating notes options', function () {
            console.log('Validating notes options');
            editor.openBlank();
            editor.editor.insertEndnote();
            menu.handleContextMenuItem('container_contextmenu_note_options');
        });
    });
    describe('Rtl context menu validation', function () {
        var editor;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection, index_1.SfdtExport);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false, enableRtl: true });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            editor = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Rtl context menu validation', function () {
            editor.editor.insertText('سشةحمث');
            editor.selection.selectAll();
            editor.contextMenu.handleContextMenuItem('container_contextmenu_copy');
            expect(editor.selection.isEmpty).toBe(false);
        });
    });
    describe('Adding custom context menu', function () {
        var editor;
        var menu;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(context_menu_1.ContextMenu, index_2.Editor, editor_history_1.EditorHistory, index_3.Selection);
            editor = new document_editor_1.DocumentEditor({ enableContextMenu: true, enableEditor: true, enableSelection: true, isReadOnly: false });
            editor.enableEditorHistory = true;
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            menu = editor.contextMenuModule;
        });
        afterAll(function (done) {
            editor.destroy();
            menu.destroy();
            editor = undefined;
            menu = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                document.body.innerHTML = '';
                done();
            }, 1000);
        });
        it('Adding custom context menu', function () {
            var menuItems = [
                {
                    text: 'Search In Google',
                    id: 'search_in_google',
                    iconCss: 'e-icons e-de-ctnr-find'
                }
            ];
            menu.enableCustomContextMenu = true;
            editor.contextMenu.addCustomMenu(menuItems, true, false);
            editor.editor.insertText("hello world");
            editor.selection.selectAll();
            var event = document.createEvent('MouseEvent');
            event.initEvent('contextmenu', true, true);
            expect(function () { editor.documentHelper.viewerContainer.dispatchEvent(event); }).not.toThrowError();
        });
    });
});
