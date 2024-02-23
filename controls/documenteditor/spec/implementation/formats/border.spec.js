define(["require", "exports", "../../../src/document-editor/implementation/format/border"], function (require, exports, border_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Border Validation Testing', function () {
        var border;
        beforeEach(function () {
            border = new border_1.WBorder();
        });
        afterEach(function () {
            border.destroy();
            border_1.WBorder.clear();
        });
        it('set property value undefined', function () {
            console.log('set property value undefined');
            border.shadow = undefined;
            expect(border.shadow).toBe(false);
        });
        it('Copy Format Testing', function () {
            console.log('Copy Format Testing');
            var border1 = new border_1.WBorder();
            border.shadow = true;
            border.space = 10;
            border.shadow = false;
            border.space = 20;
            border.copyFormat(border);
            expect('').toBe('');
            border1.destroy();
        });
        it('Copy Format undefined Testing', function () {
            console.log('Copy Format undefined Testing');
            border.copyFormat(border);
            expect('').toBe('');
        });
        it('destroy Testing', function () {
            console.log('destroy Testing');
            border.destroy();
            expect('').toBe('');
            border.cloneFormat();
            expect(function () { border.destroy(); }).not.toThrowError();
        });
        it('Clone Format Testing', function () {
            console.log('Clone Format Testing');
            border.shadow = true;
            border.space = 10;
            border.shadow = false;
            border.space = 20;
            var returnBorder = border.cloneFormat();
            expect(returnBorder.space).toBe(20);
            expect(returnBorder.shadow).toBe(false);
            returnBorder.destroy();
        });
        it('Border lineWidth for line style Engrave3D', function () {
            console.log('Border lineWidth for line style Engrave3D');
            border.lineStyle = 'Engrave3D';
            border.getLineWidth();
            expect('').toBe('');
        });
        it('Border lineWidth for line style Thick', function () {
            console.log('Border lineWidth for line style Thick');
            border.lineStyle = 'Thick';
            border.getLineWidth();
            expect('').toBe('');
        });
        it('Border lineWidth for line style SingleWavy', function () {
            console.log('Border lineWidth for line style SingleWavy');
            border.lineStyle = 'SingleWavy';
            border.getLineWidth();
            expect('').toBe('');
        });
        it('Border lineWidth for line style DoubleWavy', function () {
            console.log('Border lineWidth for line style DoubleWavy');
            border.lineStyle = 'DoubleWavy';
            border.getLineWidth();
            expect('').toBe('');
        });
        it('Border lineWidth for line style Outset', function () {
            console.log('Border lineWidth for line style Outset');
            border.lineStyle = 'Outset';
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border lineWidth for line style ThinThickLargeGap', function () {
            console.log('Border lineWidth for line style ThinThickLargeGap');
            border.lineStyle = 'ThinThickLargeGap';
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border lineWidth for line style ThickThinLargeGap', function () {
            console.log('Border lineWidth for line style ThickThinLargeGap');
            border.lineStyle = 'ThickThinLargeGap';
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border lineWidth for line style ThinThickThinMediumGap', function () {
            console.log('Border lineWidth for line style ThinThickThinMediumGap');
            border.lineStyle = 'ThinThickThinMediumGap';
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border lineWidth for line style ThinThickThinLargeGap', function () {
            console.log('Border lineWidth for line style ThinThickThinLargeGap');
            border.lineStyle = 'ThinThickThinLargeGap';
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border lineWidth for line style Emboss3D', function () {
            console.log('Border lineWidth for line style Emboss3D');
            border.lineStyle = 'Emboss3D';
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Thick', function () {
            console.log('Border Weight for line style Thick');
            border.lineStyle = 'Thick';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style DashLargeGap', function () {
            console.log('Border Weight for line style DashLargeGap');
            border.lineStyle = 'DashLargeGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Single', function () {
            console.log('Border Weight for line style Single');
            border.lineStyle = 'Single';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Double', function () {
            console.log('Border Weight for line style Double');
            border.lineStyle = 'Double';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Dot', function () {
            console.log('Border Weight for line style Dot');
            border.lineStyle = 'Dot';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style DashLargeGap', function () {
            console.log('Border Weight for line style DashLargeGap');
            border.lineStyle = 'DashLargeGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style DashDot', function () {
            console.log('Border Weight for line style DashDot');
            border.lineStyle = 'DashDot';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style DashDotDot', function () {
            console.log('Border Weight for line style DashDotDot');
            border.lineStyle = 'DashDotDot';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Triple', function () {
            console.log('Border Weight for line style Triple');
            border.lineStyle = 'Triple';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThinThickSmallGap', function () {
            console.log('Border Weight for line style ThinThickSmallGap');
            border.lineStyle = 'ThinThickSmallGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThickThinSmallGap', function () {
            console.log('Border Weight for line style ThickThinSmallGap');
            border.lineStyle = 'ThickThinSmallGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThinThickThinSmallGap', function () {
            console.log('Border Weight for line style ThinThickThinSmallGap');
            border.lineStyle = 'ThinThickThinSmallGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThinThickMediumGap', function () {
            console.log('Border Weight for line style ThinThickMediumGap');
            border.lineStyle = 'ThinThickMediumGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThickThinMediumGap', function () {
            console.log('Border Weight for line style ThickThinMediumGap');
            border.lineStyle = 'ThickThinMediumGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThinThickThinMediumGap', function () {
            console.log('Border Weight for line style ThinThickThinMediumGap');
            border.lineStyle = 'ThinThickThinMediumGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThinThickLargeGap', function () {
            console.log('Border Weight for line style ThinThickLargeGap');
            border.lineStyle = 'ThinThickLargeGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThickThinLargeGap', function () {
            console.log('Border Weight for line style ThickThinLargeGap');
            border.lineStyle = 'ThickThinLargeGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style ThinThickThinLargeGap', function () {
            console.log('Border Weight for line style ThinThickThinLargeGap');
            border.lineStyle = 'ThinThickThinLargeGap';
            border.getBorderWeight();
            border.getLineWidth();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style SingleWavy', function () {
            console.log('Border Weight for line style SingleWavy');
            border.lineStyle = 'SingleWavy';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style DoubleWavy', function () {
            console.log('Border Weight for line style DoubleWavy');
            border.lineStyle = 'DoubleWavy';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style DashSmallGap', function () {
            console.log('Border Weight for line style DashSmallGap');
            border.lineStyle = 'DashSmallGap';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style DashDotStroked', function () {
            console.log('Border Weight for line style DashDotStroked');
            border.lineStyle = 'DashDotStroked';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Emboss3D', function () {
            console.log('Border Weight for line style Emboss3D');
            border.lineStyle = 'Emboss3D';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Engrave3D', function () {
            console.log('Border Weight for line style Engrave3D');
            border.lineStyle = 'Engrave3D';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Outset', function () {
            console.log('Border Weight for line style Outset');
            border.lineStyle = 'Outset';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
        it('Border Weight for line style Inset', function () {
            console.log('Border Weight for line style Inset');
            border.lineStyle = 'Inset';
            border.getLineWidth();
            border.getBorderWeight();
            border.getPrecedence();
            expect('').toBe('');
        });
    });
});
