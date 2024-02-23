define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Print = (function () {
        function Print() {
            var _this = this;
            this.windowPrint = undefined;
            this.closePrintWindow = function () {
                if (_this.windowPrint && !_this.windowPrint.closed) {
                    _this.windowPrint.close();
                }
            };
        }
        Print.prototype.getModuleName = function () {
            return 'Print';
        };
        Print.prototype.print = function (documentHelper, printWindow) {
            this.printWindow(documentHelper, navigator !== undefined ? navigator.userAgent : "", printWindow);
        };
        Print.prototype.printWindow = function (documentHelper, browserUserAgent, printWindow) {
            var height = this.getPageHeight(documentHelper.pages);
            var width = this.getPageWidth(documentHelper.pages);
            var printElement = document.createElement('div');
            printElement.style.width = '100%';
            printElement.style.height = '100%';
            printElement.style.overflow = 'scroll';
            this.generatePrintContent(documentHelper, printElement);
            if (ej2_base_1.isNullOrUndefined(printWindow)) {
                printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
            }
            this.windowPrint = printWindow;
            var pageSize = width.toString() + 'px ' + height.toString() + 'px';
            if (width > height) {
                pageSize = 'landscape';
            }
            if (browserUserAgent.indexOf('Chrome') !== -1) {
                printWindow.document.write('<!DOCTYPE html>');
                printWindow.document.write('<html><head><title>' + documentHelper.owner.documentName + '</title><style>img { height: 100%; width: 100%; display: block;}img { box-sizing: border-box; }br, button { display: none; }@page{ margin: 0cm; size:' + pageSize + '; }</style></head> <body><center>');
            }
            else if (browserUserAgent.indexOf('Firefox') !== -1) {
                printWindow.document.write('<!DOCTYPE html>');
                printWindow.document.write('<html moznomarginboxes mozdisallowselectionprint><head><title>' + documentHelper.owner.documentName + '</title><style>html, body { height: 100%; } img { height: 100%; width: 100%; display: block;}img { box-sizing: border-box; }br, button { display: none; }@page{ margin: 0cm; size:' + pageSize + '; }@media print{ body { margin: 0cm; size:' + pageSize + '; }}</style></head> <body><center>');
            }
            else {
                printWindow.document.write('<html><head><title>' + documentHelper.owner.documentName + '</title><style>@page{margin:0;size:' + pageSize + ';}</style></head><body><center>');
            }
            printWindow.document.write(printElement.innerHTML + '</center><script> (function() { window.ready = true; })(); </script></body></html>');
            printElement = undefined;
            printWindow.document.close();
            printWindow.focus();
            window.addEventListener('beforeunload', this.closePrintWindow);
            var interval = setInterval(function () {
                if (printWindow.ready) {
                    printWindow.print();
                    printWindow.close();
                    clearInterval(interval);
                }
            }, 500);
        };
        Print.prototype.exportAsImage = function (documentHelper, pageNumber, imageType) {
            var image;
            if (!ej2_base_1.isNullOrUndefined(pageNumber) && pageNumber <= documentHelper.pages.length && pageNumber >= 1) {
                var printPage = documentHelper.pages[(pageNumber - 1)];
                var pgHeight = printPage.boundingRectangle.height;
                var pgWidth = printPage.boundingRectangle.width;
                documentHelper.render.isPrinting = true;
                documentHelper.render.renderWidgets(printPage, 0, 0, 0, 0);
                var imageData = documentHelper.render.pageCanvas.toDataURL(imageType, 1);
                documentHelper.render.isPrinting = false;
                image = new Image();
                image.src = imageData;
                image.setAttribute('style', 'margin:0px;display:block;width:' + pgWidth.toString() + 'px;height:' + pgHeight.toString() + 'px;');
            }
            return image;
        };
        Print.prototype.generatePrintContent = function (documentHelper, element) {
            var htmlString = '';
            for (var i = 0; i < documentHelper.pages.length; i++) {
                var page = documentHelper.pages[i];
                var pageHeight = page.boundingRectangle.height;
                var pageWidth = page.boundingRectangle.width;
                documentHelper.render.isPrinting = true;
                documentHelper.render.renderWidgets(page, 0, 0, pageWidth, 0);
                var canvasURL = documentHelper.render.pageCanvas.toDataURL();
                documentHelper.render.isPrinting = false;
                var breakstring = (i == documentHelper.pages.length - 1) ? '' : '<br/>';
                htmlString += '<div><img src=' + canvasURL + ' style="margin:0px;display:block;width: ' + pageWidth.toString() + 'px; height:' + pageHeight.toString() + 'px; "/></div>' + breakstring;
            }
            element.innerHTML = htmlString;
        };
        Print.prototype.getPageWidth = function (pages) {
            var width = 0;
            for (var i = 0; i < pages.length; i++) {
                if (width < pages[i].boundingRectangle.width) {
                    width = pages[i].boundingRectangle.width;
                }
            }
            return width;
        };
        Print.prototype.getPageHeight = function (pages) {
            var height = 0;
            for (var i = 0; i < pages.length; i++) {
                if (height < pages[i].boundingRectangle.height) {
                    height = pages[i].boundingRectangle.height;
                }
            }
            return height;
        };
        Print.prototype.destroy = function () {
            window.removeEventListener('beforeunload', this.closePrintWindow);
            this.windowPrint = undefined;
            return;
        };
        return Print;
    }());
    exports.Print = Print;
});
