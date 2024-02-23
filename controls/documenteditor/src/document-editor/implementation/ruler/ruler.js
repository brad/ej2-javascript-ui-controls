define(["require", "exports", "../editor/editor-helper", "../utility/size"], function (require, exports, editor_helper_1, size_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ruler = (function () {
        function Ruler(element, rulerHelper) {
            this.interval = 4;
            this.segmentWidth = 47.9988;
            this.orientation = 'Horizontal';
            this.tickAlignment = 'RightOrBottom';
            this.markerColor = 'red';
            this.thickness = 15;
            this.arrangeTick = null;
            this.length = 400;
            this.offset = 0;
            this.scale = 1;
            this.rulerStartValue = 1584;
            this.zeroPosition = editor_helper_1.HelperMethods.convertPointToPixel(1584);
            this.addSegmentWidth = false;
            this.element = element;
            this.rulerHelper = rulerHelper;
        }
        Ruler.prototype.appendTo = function () {
            this.preRender();
            this.render();
        };
        Ruler.prototype.preRender = function () {
            this.unWireEvents();
            this.wireEvents();
        };
        Ruler.prototype.render = function () {
            this.updateRulerGeometry();
        };
        Ruler.prototype.getModuleName = function () {
            return 'Ruler';
        };
        Ruler.prototype.destroy = function () {
            this.unWireEvents();
            this.element.classList.remove('e-ruler');
        };
        Ruler.prototype.showHideRuler = function (show) {
            if (show) {
                this.element.style.display = 'block';
            }
            else {
                this.element.style.display = 'none';
            }
        };
        Ruler.prototype.updateRulerGeometry = function () {
            this.element.style.textAlign = 'left';
            this.renderRulerSpace();
            this.updateRuler();
        };
        Ruler.prototype.renderRulerSpace = function () {
            var rulerGeometry = this.getRulerGeometry();
            var div = document.getElementById(this.element.id + '_ruler_space');
            if (!div) {
                div = this.rulerHelper.createHtmlElement('div', {
                    'id': this.element.id + '_ruler_space',
                    'style': 'height:' + rulerGeometry.height + 'px;width:' + rulerGeometry.width + 'px;cssFloat:' + 'left;'
                });
                this.element.appendChild(div);
            }
            return div;
        };
        Ruler.prototype.updateRuler = function () {
            var rulerSize = this.getRulerSize();
            var rulerGeometry = this.getRulerGeometry();
            var length = 0;
            var offset = 0;
            var availableSize = new size_1.Size();
            var svg = this.getRulerSVG(rulerGeometry);
            if (svg) {
                length = this.length;
                availableSize.height = rulerSize;
                offset = this.offset;
                if (length && length !== Infinity) {
                    var unitLength = length;
                    var unitOffset = offset;
                    this.updateSegments(unitOffset, (unitLength + Math.abs(unitOffset)), svg, rulerSize);
                }
            }
        };
        Ruler.prototype.updateSegments = function (start, end, svg, rulerSize) {
            var run = start;
            var trans = { trans: 0 };
            this.rulerStartValue = editor_helper_1.HelperMethods.convertPixelToPoint(this.zeroPosition);
            while (run < end) {
                var rulerSegment = this.getNewSegment(run, svg);
                if (rulerSegment) {
                    svg.appendChild(rulerSegment.segment);
                    run = this.updateSegment(start, end, rulerSegment, run, trans, rulerSize);
                }
            }
            this.addSegmentWidth = false;
        };
        Ruler.prototype.updateSegment = function (start, end, rulerSegment, run, trans, rulerSize) {
            var segWidth = this.updateSegmentWidth(this.scale);
            if (run === start) {
                this.startValue = Math.floor(start / segWidth) * segWidth / this.scale;
                this.startValue = (this.startValue % 1) !== 0 ? Number((this.startValue).toFixed(1)) : this.startValue;
                rulerSegment.label.textContent = this.rulerStartValue.toString();
                this.defStartValue = run = this.startValue * this.scale;
                if (this.orientation === 'Horizontal') {
                    this.hRulerOffset = start - run;
                }
                else {
                    this.vRulerOffset = start - run;
                }
            }
            else {
                this.startValue = editor_helper_1.HelperMethods.convertPixelToPoint(run);
                this.startValue = (this.startValue % 1) !== 0 ? Number((this.startValue).toFixed(1)) : this.startValue;
                var labeltext = void 0;
                if (this.rulerStartValue == 0) {
                    this.addSegmentWidth = true;
                }
                if (this.addSegmentWidth) {
                    labeltext = Math.abs(this.rulerStartValue + 36);
                }
                else {
                    labeltext = Math.abs(this.rulerStartValue - 36);
                }
                rulerSegment.label.textContent = (labeltext).toString();
                this.rulerStartValue = labeltext;
            }
            this.updateTickLabel(rulerSegment, rulerSize);
            var translate = (this.orientation === 'Horizontal') ? ((trans.trans + 0.5) + ',0.5') : ('0.5,' + (trans.trans + 0.5));
            rulerSegment.segment.setAttribute('transform', 'translate(' + translate + ') scale(' + 1 + ',1)');
            trans.trans += segWidth * this.scale;
            run += segWidth;
            return run;
        };
        Ruler.prototype.updateTickLabel = function (rulerSegment, rulerSize) {
            var bBox = rulerSegment.segment.lastChild.getBBox();
            var isHorizontal = (this.orientation === 'Horizontal') ? true : false;
            var isRightOrBottom = (this.tickAlignment === 'RightOrBottom') ? true : false;
            var x = isHorizontal ? -4 : 0;
            var y = isHorizontal ? (isRightOrBottom ? (rulerSize / 2 + (11 / 2) - (11 / 2)) :
                (rulerSize / 2 + (11 / 2))) : bBox.height;
            if (isHorizontal) {
                y = y + 2;
            }
            if (!isHorizontal) {
                x = x + 10;
                y = y + 2;
            }
            var translate = isRightOrBottom ? (-(bBox.width + 2) + ',' + ((rulerSize / 2) - bBox.height)) :
                (-(bBox.width + 2) + ',' + ((rulerSize / 2) - bBox.height / 2));
            var attr = isHorizontal ? { 'x': x, 'y': y } :
                { 'x': x, 'y': y, 'transform': 'rotate(270)' + 'translate(' + translate + ')' };
            this.rulerHelper.setAttributeSvg(rulerSegment.segment.lastChild, attr);
        };
        Ruler.prototype.getNewSegment = function (run, svg) {
            var segment = this.createNewTicks(run, svg);
            var label = this.createTickLabel(svg, segment);
            return { segment: segment, label: label };
        };
        Ruler.prototype.createNewTicks = function (run, svg) {
            var tick;
            var tickInterval;
            var segmentWidth = this.updateSegmentWidth(this.scale);
            var attr = { 'class': 'e-de-ruler-segment' };
            var g = this.rulerHelper.createSvgElement('g', attr);
            var rectattr = { 'class': 'e-de-ruler-segment1' };
            var rect = this.rulerHelper.createSvgElement('rect', rectattr);
            var width = this.orientation === "Horizontal" ? (segmentWidth * this.scale) : 15;
            var height = this.orientation === "Horizontal" ? 15 : segmentWidth;
            rect.setAttribute("x", "0");
            rect.setAttribute("y", "0");
            rect.setAttribute("width", width.toString());
            rect.setAttribute("height", height.toString());
            rect.setAttribute("fill", "lightgrey");
            for (var i = 0; i < this.interval; i++) {
                tickInterval = segmentWidth / this.interval;
                tick = this.createTick(svg, tickInterval, i + 1, run);
                if (tick) {
                    g.appendChild(tick);
                }
            }
            return g;
        };
        Ruler.prototype.getLinePoint = function (svg, tickInterval, length) {
            var segmentWidth = this.updateSegmentWidth(this.scale);
            var rulerSize = this.getRulerSize();
            tickInterval = tickInterval * (length - 1);
            length = ((tickInterval % segmentWidth) === 0) ? rulerSize : rulerSize * 0.3;
            return length;
        };
        Ruler.prototype.createTick = function (svg, tickInterval, length, run) {
            var ruler;
            var linePoint = this.getLinePoint(svg, tickInterval, length);
            var rulerSize = this.getRulerSize();
            var isHorizontal = (this.orientation === 'Horizontal') ? true : false;
            var isRightOrBottom = (this.tickAlignment === 'RightOrBottom') ? true : false;
            var point = tickInterval * (length - 1) * this.scale;
            var x1 = isHorizontal ? point : (isRightOrBottom ? rulerSize : 0);
            var x2 = isHorizontal ? point : (isRightOrBottom ? (rulerSize - linePoint) : (rulerSize - (rulerSize - linePoint)));
            var y1 = isHorizontal ? (isRightOrBottom ? rulerSize : (rulerSize - (rulerSize - linePoint))) : point;
            var y2 = isHorizontal ? (isRightOrBottom ? (rulerSize - linePoint) : 0) : point;
            var line;
            if (y2 !== 0) {
                y1 = y1 - 6;
                y2 = y2 - 6;
                if (!isHorizontal) {
                    x1 = x1 - 6;
                    x2 = x2 - 6;
                }
                var attr = { 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'stroke-width': '0.25', 'stroke': 'black' };
                line = this.rulerHelper.createSvgElement('line', attr);
                line.setAttribute('class', 'e-de-ruler-tick');
            }
            return line;
        };
        Ruler.prototype.createTickLabel = function (svg, segment) {
            var text;
            if (segment) {
                var attr = { 'class': 'e-de-ruler-tick-label', 'style': 'font-weight: 400' };
                text = this.rulerHelper.createSvgElement('text', attr);
                segment.appendChild(text);
            }
            return text;
        };
        Ruler.prototype.updateSegmentWidth = function (scale) {
            if (this.segmentWidth !== 100) {
                return this.segmentWidth;
            }
            var five = 25;
            var multiples = 1;
            var div;
            var fifty = 100;
            var scaleRound = Math.pow(2, Math.round(Math.log(scale) / Math.log(2)));
            div = fifty;
            div = (fifty / scaleRound);
            while (div > 100) {
                multiples /= 10;
                div /= 10;
            }
            while (div < 25) {
                multiples *= 10;
                div *= 10;
            }
            if (div >= five && div % five !== 0) {
                div = Math.round(div / five) * five;
            }
            return div * scale / multiples;
        };
        Ruler.prototype.createMarkerLine = function (rulerSvg, rulerObj, attr) {
            var line;
            if (rulerObj) {
                line = rulerSvg.getElementById(rulerObj.id + '_marker');
                if (line) {
                    line.parentNode.removeChild(line);
                }
                line = this.rulerHelper.createSvgElement('line', attr);
            }
            return line;
        };
        Ruler.prototype.drawRulerMarker = function (rulerObj, currentPoint, offset) {
            var rulerSvg;
            var rulerSize;
            var scale;
            var diff;
            var i;
            var attr;
            var line;
            var isHorizontal = this.orientation === 'Horizontal' ? true : false;
            var rulerSvgElements = rulerObj.getElementsByTagName('svg');
            for (i = 0; i < rulerSvgElements.length; i++) {
                if (rulerSvgElements[parseInt(i.toString(), 10)]) {
                    rulerSvg = rulerSvgElements[parseInt(i.toString(), 10)];
                }
                break;
            }
            if (rulerSvg) {
                rulerSize = this.getRulerSize();
                attr = {
                    'id': rulerObj.id + '_marker', 'x1': 0, 'y1': 0, 'x2': (isHorizontal ? 0 : rulerSize),
                    'y2': (isHorizontal ? rulerSize : 0), 'stroke': this.markerColor, 'stroke-width': 1.5,
                    'class': 'e-d-ruler-marker'
                };
                line = this.createMarkerLine(rulerSvg, rulerObj, attr);
                scale = this.scale;
                diff = this.offset - this.defStartValue;
                var point = isHorizontal ? currentPoint.x : currentPoint.y;
                var move = (point * scale) + offset + diff;
                line.setAttribute('transform', 'translate(' + (isHorizontal ? ((move + 0.5) + ' 0.5') : ('0.5 ' + (move + 0.5))) + ')');
                rulerSvg.appendChild(line);
            }
        };
        Ruler.prototype.getRulerGeometry = function () {
            if (this.orientation === "Horizontal") {
                return new size_1.Size(this.length, this.element ? this.element.getBoundingClientRect().height : 0);
            }
            else {
                return new size_1.Size(this.element ? this.element.getBoundingClientRect().width : 0, this.length);
            }
        };
        Ruler.prototype.getRulerSize = function () {
            return this.thickness;
        };
        Ruler.prototype.getRulerSVG = function (rulerGeometry) {
            var rulerSpace;
            var rulerSize = this.getRulerSize();
            var svg;
            if (this.element) {
                rulerSpace = document.getElementById(this.element.id + '_ruler_space');
                if (rulerSpace) {
                    var attr = {
                        'id': this.element.id + '_Ruler_svg',
                        width: this.orientation === 'Horizontal' ? this.length : rulerSize + 'px',
                        height: this.orientation === 'Horizontal' ? rulerSize : (rulerGeometry.height) + 'px',
                        style: 'position:inherit;'
                    };
                    svg = this.rulerHelper.createSvgElement('svg', attr);
                    if (rulerSpace.childNodes.length > 0) {
                        for (var i = rulerSpace.childNodes.length - 1; i >= 0; i--) {
                            rulerSpace.childNodes[parseInt(i.toString(), 10)].parentNode.removeChild(rulerSpace.childNodes[parseInt(i.toString(), 10)]);
                        }
                    }
                    rulerSpace.appendChild(svg);
                }
            }
            return svg;
        };
        Ruler.prototype.wireEvents = function () {
        };
        Ruler.prototype.unWireEvents = function () {
        };
        return Ruler;
    }());
    exports.Ruler = Ruler;
});
