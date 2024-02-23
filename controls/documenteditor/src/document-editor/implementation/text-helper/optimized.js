define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Optimized = (function () {
        function Optimized(documentHelper) {
            this.documentHelper = documentHelper;
            this.optimizedHeightCollection = {};
        }
        Optimized.prototype.getModuleName = function () {
            return 'Optimized';
        };
        Optimized.prototype.getkeyFromCharFormat = function (characterFormat) {
            var formatText = characterFormat.fontFamily.toLocaleLowerCase();
            if (characterFormat.bold) {
                formatText += ';' + 'bold';
            }
            if (characterFormat.italic) {
                formatText += ';' + 'italic';
            }
            return formatText;
        };
        Optimized.prototype.getFontInfo = function (characterFormat) {
            var iframe = ej2_base_1.createElement('iframe');
            document.body.appendChild(iframe);
            var innerHtml = '<!DOCTYPE html>'
                + '<html><head></head>'
                + '<body>'
                + '</body>'
                + '</html>';
            if (!ej2_base_1.isNullOrUndefined(iframe.contentDocument)) {
                iframe.contentDocument.open();
                iframe.contentDocument.write(innerHtml);
                iframe.contentDocument.close();
            }
            var container = document.createElement('div');
            container.setAttribute('style', 'position:absolute;top:-1000px;left:-1000px;opacity:0;font-size:0px;line-height:normal;');
            var maxFontHeight = 288;
            var factor = 1.0 / window.devicePixelRatio;
            container.style.transform = 'scale(' + factor.toString() + ',' + factor.toString() + ')';
            container.innerHTML = '<span class="e-de-font-info" style="font-size:0; font-family: ' + characterFormat.fontFamily + '; display: inline-block;">m</span><span class="e-de-font-info" style="font-size:' + maxFontHeight + 'pt; font-family: ' + characterFormat.fontFamily + ';' + ((characterFormat.bold) ? 'font-weight:bold;' : '') + ((characterFormat.italic) ? 'font-style:italic;' : '') + ' display: inline-block;">m</span>';
            iframe.contentDocument.body.appendChild(container);
            var baseLineFactor = container.firstChild.offsetTop / container.lastChild.offsetHeight;
            var heightFactor = parseFloat((container.lastChild.offsetHeight / maxFontHeight).toFixed(2));
            document.body.removeChild(iframe);
            return { HeightFactor: heightFactor, BaselineFactor: baseLineFactor };
        };
        Optimized.prototype.getHeightInternal = function (characterFormat) {
            var key = this.getkeyFromCharFormat(characterFormat);
            if (ej2_base_1.isNullOrUndefined(this.optimizedHeightCollection["" + key])) {
                var fontInfo = this.getFontInfo(characterFormat);
                this.optimizedHeightCollection["" + key] = fontInfo;
                var fontHeight = fontInfo.HeightFactor * characterFormat.fontSize;
                return { Height: fontHeight, BaselineOffset: fontInfo.BaselineFactor * fontHeight };
            }
            else {
                var fontSizeInfo = this.optimizedHeightCollection["" + key];
                var fontHeight = fontSizeInfo.HeightFactor * characterFormat.fontSize;
                return { Height: fontHeight, BaselineOffset: fontSizeInfo.BaselineFactor * fontHeight };
            }
        };
        Optimized.prototype.destroy = function () {
            this.documentHelper = undefined;
            this.optimizedHeightCollection = undefined;
        };
        return Optimized;
    }());
    exports.Optimized = Optimized;
});
