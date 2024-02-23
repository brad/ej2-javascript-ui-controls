define(["require", "exports", "../../../src/document-editor/implementation/format/character-format", "../../../src/document-editor/implementation/format/list-format", "../../../src/document-editor/implementation/format/paragraph-format", "../../../src/document-editor/implementation/format/table-format", "../../../src/document-editor/implementation/format/row-format", "../../../src/document-editor/implementation/format/cell-format", "../../../src/document-editor/implementation/format/border", "../../../src/document-editor/implementation/format/borders", "../../../src/document-editor/implementation/format/shading", "../../../src/document-editor/implementation/format/section-format", "../../../src/document-editor/implementation/list/list"], function (require, exports, character_format_1, list_format_1, paragraph_format_1, table_format_1, row_format_1, cell_format_1, border_1, borders_1, shading_1, section_format_1, list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Text Format Testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var format = new character_format_1.WCharacterFormat();
            expect('').toBe('');
            expect(format.bold).toBe(false);
            expect(format.italic).toBe(false);
            expect(format.fontSize).toBe(11);
            expect(format.underline).toBe('None');
            expect(format.strikethrough).toBe('None');
            expect(format.baselineAlignment).toBe('Normal');
            expect(format.highlightColor).toBe('NoColor');
            expect(format.fontColor).toBe('#00000000');
            expect(format.fontFamily).toBe('Calibri');
        });
    });
    describe('character format testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var format = new character_format_1.WCharacterFormat(undefined);
            expect('').toBe('');
            expect(format.bold).toBe(false);
            expect(format.italic).toBe(false);
            expect(format.fontSize).toBe(11);
            expect(format.underline).toBe('None');
            expect(format.strikethrough).toBe('None');
            expect(format.baselineAlignment).toBe('Normal');
            expect(format.highlightColor).toBe('NoColor');
            expect(format.fontColor).toBe('#00000000');
            expect(format.fontFamily).toBe('Calibri');
        });
    });
    describe('Section format', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var sectionFormat = new section_format_1.WSectionFormat(undefined);
            expect('').toBe('');
        });
        it('Validate Section format', function () {
            console.log('Validate Section format');
            var sectionFormat = new section_format_1.WSectionFormat(undefined);
            expect(sectionFormat.headerDistance).toBe(36);
            expect(sectionFormat.footerDistance).toBe(36);
            expect(sectionFormat.differentFirstPage).toBe(false);
            expect(sectionFormat.differentOddAndEvenPages).toBe(false);
            expect(sectionFormat.pageWidth).toBe(612);
            expect(sectionFormat.pageHeight).toBe(792);
            expect(sectionFormat.leftMargin).toBe(72);
            expect(sectionFormat.topMargin).toBe(72);
            expect(sectionFormat.bottomMargin).toBe(72);
            expect(sectionFormat.rightMargin).toBe(72);
        });
    });
    describe('ParaFormat Testing', function () {
        it('List Format Validation', function () {
            console.log('List Format Validation');
            var listFormat = new list_format_1.WListFormat();
            var list = new list_1.WList();
            var listFormat2 = new list_format_1.WListFormat();
            listFormat.copyFormat(listFormat2);
        });
    });
    describe('table Format Testing', function () {
        it('Paragraph Format Validation', function () {
            console.log('Paragraph Format Validation');
            var paraFormat = new paragraph_format_1.WParagraphFormat(undefined);
            expect(paraFormat.firstLineIndent).toBe(0);
            expect(paraFormat.beforeSpacing).toBe(0);
            expect(paraFormat.afterSpacing).toBe(0);
            expect(paraFormat.lineSpacing).toBe(1);
            expect(paraFormat.lineSpacingType).toBe('Multiple');
            expect(paraFormat.textAlignment).toBe('Left');
        });
        it('Copy Paragraph Format', function () {
            console.log('Copy Paragraph Format');
            var sourceFormat = new paragraph_format_1.WParagraphFormat(undefined);
            sourceFormat.afterSpacing = undefined;
            sourceFormat.beforeSpacing = undefined;
            sourceFormat.leftIndent = undefined;
            sourceFormat.rightIndent = undefined;
            sourceFormat.firstLineIndent = undefined;
            sourceFormat.lineSpacing = undefined;
            sourceFormat.lineSpacingType = undefined;
            sourceFormat.textAlignment = undefined;
            sourceFormat.listFormat = undefined;
            var paraFormat = new paragraph_format_1.WParagraphFormat(undefined);
            paraFormat.copyFormat(sourceFormat);
            paraFormat.copyFormat(undefined);
        });
    });
    describe('Table Format Testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var tableFormat = new table_format_1.WTableFormat(undefined);
            tableFormat.borders = undefined;
            tableFormat.leftIndent = 1;
            tableFormat.shading = undefined;
            expect('').toBe('');
            expect(tableFormat.preferredWidth).not.toBe(undefined);
            expect(tableFormat.preferredWidthType).not.toBe(undefined);
            expect(tableFormat.leftIndent).toBe(1);
            expect(tableFormat.shading).toBe(undefined);
        });
    });
    describe('Row Format Testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var rowFormat = new row_format_1.WRowFormat(undefined);
            expect('').toBe('');
            rowFormat.heightType = 'AtLeast';
            rowFormat.heightType = 'Exactly';
            rowFormat.borders = new borders_1.WBorders(undefined);
        });
        it('Row Format Testing', function () {
            console.log('Row Format Testing');
            var rowFormat = new row_format_1.WRowFormat(undefined);
            expect(rowFormat.allowBreakAcrossPages).toBe(true);
            expect(rowFormat.isHeader).toBe(false);
            expect(rowFormat.height).toBe(0);
        });
    });
    describe('Cell Format Testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var cell = new cell_format_1.WCellFormat(undefined);
            expect('').toBe('');
            expect(cell.preferredWidth).toBe(0);
            expect(cell.preferredWidthType).not.toBe(undefined);
        });
        it('Cell Format Validation', function () {
            console.log('Cell Format Validation');
            var cell = new cell_format_1.WCellFormat(undefined);
            expect(cell.cellWidth).toBe(0);
            expect(cell.columnSpan).toBe(1);
            expect(cell.rowSpan).toBe(1);
            expect(cell.verticalAlignment).toBe('Top');
        });
    });
    describe('Border Testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var borderObj = new border_1.WBorder(undefined);
            borderObj.color = "#000000";
            borderObj.hasNoneStyle = true;
        });
        it('Border Class Validation', function () {
            console.log('Border Class Validation');
            var border = new border_1.WBorder(undefined);
            border.color;
            border.color = "#000000";
            expect(border.color).toBe('#000000');
            border.lineStyle = 'Dot';
            border.lineWidth = 25;
            border.lineStyle, border.lineWidth;
            border.lineStyle = 'None';
            border.getLineWidth();
            border.hasNoneStyle;
            expect(function () { border.shadow; }).not.toThrowError();
            expect(function () { border.space; }).not.toThrowError();
            expect(border.ownerBase).toBe(undefined);
        });
        it('Border Line Spacing validation', function () {
            console.log('Border Line Spacing validation');
            var border = new border_1.WBorder(undefined);
            border.lineStyle = 'Triple';
            border.getLineWidth();
            border.lineStyle = 'Double';
            border.getLineWidth();
            border.lineStyle = 'ThickThinSmallGap';
            border.getLineWidth();
            border.lineStyle = 'ThinThickSmallGap';
            border.getLineWidth();
            border.lineStyle = 'ThinThickThinSmallGap';
            border.getLineWidth();
            border.lineStyle = 'ThinThickMediumGap';
            border.getLineWidth();
            border.lineStyle = 'ThickThinMediumGap';
            border.getLineWidth();
            border.lineStyle = 'ThinThickThinSmallGap';
            border.getLineWidth();
            expect('').toBe('');
        });
    });
    describe('Shading Testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var shading = new shading_1.WShading(undefined);
            shading.backgroundColor = '#000000';
            shading.foregroundColor = '#ffffff';
            shading.textureStyle = 'Texture12Pt5Percent';
            expect(shading.backgroundColor).not.toBe(undefined);
            expect(shading.foregroundColor).not.toBe(undefined);
            expect(shading.textureStyle).not.toBe(undefined);
            expect('').toBe('');
        });
    });
    describe(' WBorders Testing', function () {
        it('constructor testing', function () {
            console.log('constructor testing');
            var bordersObj = new borders_1.WBorders(undefined);
            bordersObj.left = undefined;
            bordersObj.top = undefined;
            bordersObj.right = undefined;
            bordersObj.bottom = undefined;
            bordersObj.diagonalDown = undefined;
            bordersObj.diagonalUp = undefined;
            bordersObj.horizontal = undefined;
            bordersObj.vertical = undefined;
            expect('').toBe('');
        });
    });
});
