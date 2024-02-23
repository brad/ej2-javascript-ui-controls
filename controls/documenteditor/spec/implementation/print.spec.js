define(["require", "exports", "../../src/index", "../../src/document-editor/document-editor", "../../src/index", "@syncfusion/ej2-base", "../../src/document-editor/implementation/print", "../test-helper.spec"], function (require, exports, index_1, document_editor_1, index_2, ej2_base_1, print_1, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Print testing', function () {
        var editor;
        var documentHelper;
        var print;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enablePrint: true });
            document_editor_1.DocumentEditor.Inject(print_1.Print);
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            documentHelper = editor.documentHelper;
            print = new print_1.Print();
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
        it('print in IE validation', function (done) {
            console.log('print in IE validation');
            var win = {
                document: { write: function () { }, close: function () { } },
                close: function () { }, print: function () { }, focus: function () { }
            };
            win.ready = true;
            var browserUserAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Tablet PC 2.0; rv:11.0) like Gecko';
            print.printWindow(documentHelper, browserUserAgent, win);
            spyOn(win, 'print');
            win.ready = true;
            setTimeout(function () {
                expect(win.print).toHaveBeenCalled();
                done();
            }, 1000);
        });
        it('print in chrome validation', function (done) {
            console.log('print in chrome validation');
            var win = {
                document: { write: function () { }, close: function () { } },
                close: function () { }, print: function () { }, focus: function () { }
            };
            win.ready = true;
            print.print(documentHelper, win);
            spyOn(win, 'print');
            win.ready = false;
            setTimeout(function () {
                expect(win.print).not.toHaveBeenCalled();
                done();
            }, 1000);
        });
        it('Get Print document Width validation', function () {
            console.log('Get Print document Width validation');
            var pages = [];
            var page1 = new index_2.Page(editor.documentHelper);
            page1.boundingRectangle = new index_2.Rect(96, 96, 816, 1056);
            var page2 = new index_2.Page(editor.documentHelper);
            page1.boundingRectangle = new index_2.Rect(96, 96, 816, 1056);
            pages.push(page1);
            pages.push(page2);
            expect(print.getPageWidth(pages)).toBe(816);
            expect(print.getPageHeight(pages)).toBe(1056);
        });
        it('Generate Print Content validation', function () {
            console.log('Generate Print Content validation');
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
            var element = document.createElement('div');
            print.generatePrintContent(documentHelper, element);
            expect(element.childNodes.length).not.toBe(0);
        });
        it('Print API testing', function () {
            console.log('Print API testing');
            var win = {
                document: { write: function () { }, close: function () { } },
                close: function () { }, print: function () { }, focus: function () { }
            };
            expect(function () { editor.printModule.print(editor.documentHelper, win); }).not.toThrowError();
        });
    });
    describe('Validate the image printing', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enablePrint: true, enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, print_1.Print, index_1.Selection);
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
        it('Validate the image printing', function () {
            console.log('Validate the image printing');
            editor.openBlank();
            editor.editor.insertImage('https://cdn.syncfusion.com/content/images/Logo/Logo_150dpi.png');
            expect(editor.exportAsImage(1, 'Png')).not.toThrowError;
        });
    });
});
