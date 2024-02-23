define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/index", "../test-helper.spec", "../../src/index"], function (require, exports, document_editor_1, ej2_base_1, index_1, test_helper_spec_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Rtl text editing validation', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection);
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
    describe('Rtl text editing validation- combination of hebrew and arabic text', function () {
        var editor = undefined;
        beforeAll(function () {
            document.body.innerHTML = '';
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(index_1.Editor, index_2.Selection);
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
    describe('Text helper getRTLlanguage() method validation', function () {
        var textHelper = undefined;
        beforeAll(function () {
            textHelper = new index_1.TextHelper(undefined);
        });
        afterAll(function () {
            textHelper = undefined;
        });
        it('input text is undefined', function () {
            console.log('input text is undefined');
            var text = textHelper.getRtlLanguage(undefined);
            expect(text.isRtl).toBe(false);
            expect(text.id).toBe(0);
        });
        it('input text is empty', function () {
            console.log('input text is empty');
            var text = textHelper.getRtlLanguage('');
            expect(text.isRtl).toBe(false);
            expect(text.id).toBe(0);
        });
        it('input text is normal text', function () {
            console.log('input text is normal text');
            var text = textHelper.getRtlLanguage('Sample');
            expect(text.isRtl).toBe(false);
            expect(text.id).toBe(0);
        });
        it('input text is hebrew', function () {
            console.log('input text is hebrew');
            var text = textHelper.getRtlLanguage('דשצפךק');
            expect(text.isRtl).toBe(true);
            expect(text.id).toBe(1);
        });
        it('input text is arabic', function () {
            console.log('input text is arabic');
            var text = textHelper.getRtlLanguage('سشةحمث');
            expect(text.isRtl).toBe(true);
            expect(text.id).toBe(2);
        });
        it('input text is Syriac', function () {
            console.log('input text is Syriac');
            var text = textHelper.getRtlLanguage('ܨܨܨ');
            expect(text.isRtl).toBe(true);
            expect(text.id).toBe(4);
        });
        it('input text is NKo', function () {
            console.log('input text is NKo');
            var text = textHelper.getRtlLanguage('ߍߍߍ');
            expect(text.isRtl).toBe(true);
            expect(text.id).toBe(7);
        });
        it('input text is tifinagh', function () {
            console.log('input text is tifinagh');
            var text = textHelper.getRtlLanguage('ⵙⵇ,ⵃⵍⴻ');
            expect(text.isRtl).toBe(true);
            expect(text.id).toBe(9);
        });
    });
});
