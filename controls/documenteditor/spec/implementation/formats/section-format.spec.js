define(["require", "exports", "../../../src/index", "../../../src/document-editor/document-editor", "../../../src/document-editor/implementation/editor/editor", "@syncfusion/ej2-base", "../../../src/document-editor/implementation/format/section-format", "../../test-helper.spec"], function (require, exports, index_1, document_editor_1, editor_1, ej2_base_1, section_format_1, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('TableHolder Validation Testing', function () {
        afterEach(function () {
            section_format_1.WSectionFormat.clear();
        });
        it('TableHolder destroy  Testing', function () {
            console.log('TableHolder destroy  Testing');
            var holder = new index_1.WTableHolder();
            holder.destroy();
            holder.destroy();
            expect('').toBe('');
        });
        it('Section Format Copy Format Undefined Testing', function () {
            console.log('Section Format Copy Format Undefined Testing');
            var sectionFormat = new section_format_1.WSectionFormat();
            var sectionFormat1 = new section_format_1.WSectionFormat();
            sectionFormat.copyFormat(sectionFormat1);
            expect('').toBe('');
        });
        it('Section Format Copy Format Undefined Testing', function () {
            console.log('Section Format Copy Format Undefined Testing');
            var sectionFormat = new section_format_1.WSectionFormat();
            sectionFormat.copyFormat(undefined);
            expect('').toBe('');
        });
        it('Section Format Copy Format Testing', function () {
            console.log('Section Format Copy Format Testing');
            var sectionFormat = new section_format_1.WSectionFormat();
            var sectionFormat1 = new section_format_1.WSectionFormat();
            sectionFormat1.footerDistance = 50;
            sectionFormat1.headerDistance = 50;
            sectionFormat1.differentFirstPage = true;
            sectionFormat.copyFormat(sectionFormat1);
            expect(sectionFormat.differentFirstPage).toBe(true);
        });
        it('Section Format Copy Format Testing', function () {
            console.log('Section Format Copy Format Testing');
            var sectionFormat = new section_format_1.WSectionFormat();
            var sectionFormat1 = new section_format_1.WSectionFormat();
            sectionFormat1.footerDistance = undefined;
            sectionFormat.copyFormat(sectionFormat1);
            expect(sectionFormat.footerDistance).toBe(36);
        });
        it('Section Format destroy Testing', function () {
            console.log('Section Format destroy Testing');
            var sectionFormat = new section_format_1.WSectionFormat();
            sectionFormat.destroy();
            expect('').toBe('');
        });
        it('Section Format Clone Format Testing', function () {
            console.log('Section Format Clone Format Testing');
            var sectionFormat = new section_format_1.WSectionFormat();
            sectionFormat.cloneFormat();
            expect(sectionFormat.footerDistance).toBe(36);
        });
    });
    describe('Default section Format API Validation', function () {
        var editor = undefined;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            var defaultSectionFormat = {
                headerDistance: 25,
                footerDistance: 25,
                pageWidth: 500,
                pageHeight: 500,
                topMargin: 20,
                bottomMargin: 20,
                leftMargin: 20,
                rightMargin: 20,
            };
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor({ enableEditor: true, isReadOnly: false });
            document_editor_1.DocumentEditor.Inject(editor_1.Editor, index_1.Selection);
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.setDefaultSectionFormat(defaultSectionFormat);
            editor.appendTo('#container');
        });
        afterAll(function () {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
        });
        it('check page width of the page', function () {
            console.log('check page width of the page');
            expect(editor.selection.sectionFormat.pageWidth).toBe(500);
        });
        it('check page height of the page', function () {
            console.log('check page height of the page');
            expect(editor.selection.sectionFormat.pageHeight).toBe(500);
        });
        it('check header distance', function () {
            console.log('check header distance');
            expect(editor.selection.sectionFormat.headerDistance).toBe(25);
        });
        it('check footer distance', function () {
            console.log('check footer distance');
            expect(editor.selection.sectionFormat.footerDistance).toBe(25);
        });
        it('check top margin', function () {
            console.log('check top margin');
            expect(editor.selection.sectionFormat.topMargin).toBe(20);
        });
        it('check bottom margin', function () {
            console.log('check bottom margin');
            expect(editor.selection.sectionFormat.bottomMargin).toBe(20);
        });
        it('check left margin', function () {
            console.log('check left margin');
            expect(editor.selection.sectionFormat.leftMargin).toBe(20);
        });
        it('check right margin', function () {
            console.log('check right margin');
            expect(editor.selection.sectionFormat.rightMargin).toBe(20);
        });
    });
});
