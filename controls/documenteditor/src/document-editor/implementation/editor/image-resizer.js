define(["require", "exports", "@syncfusion/ej2-base", "../index", "../../base/dictionary", "../selection/selection-helper", "../viewer/page", "./editor-helper", "../editor-history/base-history-info", "../../base/types"], function (require, exports, ej2_base_1, index_1, dictionary_1, selection_helper_1, page_1, editor_helper_1, base_history_info_1, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImageResizer = (function () {
        function ImageResizer(node, documentHelper) {
            this.resizeContainerDiv = undefined;
            this.topLeftRect = undefined;
            this.topMiddleRect = undefined;
            this.topRightRect = undefined;
            this.bottomLeftRect = undefined;
            this.bottomMiddleRect = undefined;
            this.bottomRightRect = undefined;
            this.leftMiddleRect = undefined;
            this.rightMiddleRect = undefined;
            this.topLeftRectParent = undefined;
            this.topMiddleRectParent = undefined;
            this.topRightRectParent = undefined;
            this.bottomLeftRectParent = undefined;
            this.bottomMiddleRectParent = undefined;
            this.bottomRightRectParent = undefined;
            this.leftMiddleRectParent = undefined;
            this.rightMiddleRectParent = undefined;
            this.resizeMarkSizeIn = 7;
            this.selectedImageWidget = undefined;
            this.baseHistoryInfo = undefined;
            this.isImageResizing = false;
            this.isImageResizerVisible = false;
            this.isImageMoveToNextPage = false;
            this.selectedResizeElement = undefined;
            this.topValue = undefined;
            this.leftValue = undefined;
            this.owner = node;
            this.selectedImageWidget = new dictionary_1.Dictionary();
            this.documentHelper = documentHelper;
            this.imageResizerPoints = new ImageResizingPoints();
            if (ej2_base_1.isNullOrUndefined(this.imageResizerDiv) && this.viewer && this.documentHelper.pageContainer) {
                this.initializeImageResizer();
            }
        }
        Object.defineProperty(ImageResizer.prototype, "currentImageElementBox", {
            get: function () {
                return this.currentImageElementBoxIn;
            },
            set: function (value) {
                this.currentImageElementBoxIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageResizer.prototype, "resizeMarkSize", {
            get: function () {
                return this.resizeMarkSizeIn;
            },
            set: function (value) {
                this.resizeMarkSizeIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageResizer.prototype, "isShapeResize", {
            get: function () {
                if (this.currentImageElementBox instanceof page_1.ShapeElementBox) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageResizer.prototype, "viewer", {
            get: function () {
                return this.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        ImageResizer.prototype.getModuleName = function () {
            return 'ImageResizer';
        };
        ImageResizer.prototype.setImageResizerPositions = function (x, y, width, height) {
            this.imageResizerDivElement.style.top = y.toString() + 'px';
            this.imageResizerDivElement.style.left = x.toString() + 'px';
            this.imageResizerDivElement.style.borderWidth = '0px';
            this.imageResizerDivElement.style.height = height + 'px';
            if (this.owner.viewer instanceof index_1.WebLayoutViewer) {
                this.imageResizerDivElement.style.width = width - x - this.documentHelper.scrollbarWidth + 'px';
            }
            else {
                this.imageResizerDivElement.style.width = width + 'px';
            }
            this.imageResizerDivElement.style.backgroundColor = 'transparent';
            this.imageResizerDivElement.style.overflow = 'hidden';
            this.imageResizerDivElement.style.position = 'absolute';
        };
        ImageResizer.prototype.initializeImageResizer = function () {
            this.imageResizerDivElement = document.createElement('div');
            this.imageResizerDivElement.style.zIndex = '1';
            this.imageResizerDivElement.style.display = 'none';
            this.documentHelper.pageContainer.appendChild(this.imageResizerDivElement);
        };
        ImageResizer.prototype.positionImageResizer = function (elementBox) {
            this.selectedImageWidget.clear();
            var resizeDiv;
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.currentPage)) {
                resizeDiv = this.imageResizerDivElement;
            }
            if (!ej2_base_1.isNullOrUndefined(resizeDiv) && !resizeDiv.contains(this.imageResizerDiv)) {
                this.imageResizerDiv = this.initResizeMarks(resizeDiv, this);
            }
            this.imageResizerDiv.style.width = (elementBox.width) + 'px';
            this.imageResizerDiv.style.height = (elementBox.height) + 'px';
            this.currentImageElementBox = elementBox;
            var lineWidget = elementBox.line;
            var top;
            var left;
            if (elementBox instanceof page_1.ImageElementBox && elementBox.textWrappingStyle !== 'Inline') {
                top = elementBox.y;
                left = elementBox.x;
            }
            else {
                top = this.documentHelper.selection.getTop(lineWidget) + elementBox.margin.top;
                left = this.documentHelper.selection.getLeftInternal(lineWidget, elementBox, 0);
            }
            var page = this.documentHelper.selection.getPage(lineWidget.paragraph);
            this.currentPage = page;
            var x = 0;
            if (!ej2_base_1.isNullOrUndefined(resizeDiv)) {
                if (this.owner.viewer instanceof index_1.WebLayoutViewer) {
                    this.imageResizerDivElement.style.width = page.boundingRectangle.width - page.boundingRectangle.x - left - this.documentHelper.scrollbarWidth + 'px';
                }
                this.imageResizerDivElement.style.display = 'block';
                if (this.owner.viewer instanceof index_1.WebLayoutViewer) {
                    resizeDiv.style.width = (page.boundingRectangle.width - this.documentHelper.scrollbarWidth - page.boundingRectangle.x - left) + 'px';
                }
                else {
                    resizeDiv.style.width = page.boundingRectangle.width + 'px';
                }
                resizeDiv.style.height = page.boundingRectangle.height + 'px';
                resizeDiv.style.left = page.boundingRectangle.x + 'px';
                resizeDiv.style.top = page.boundingRectangle.y + 'px';
                resizeDiv.style.borderWidth = '0px';
                resizeDiv.style.backgroundColor = 'transparent';
                resizeDiv.style.overflow = 'hidden';
                resizeDiv.style.position = 'absolute';
            }
            var horizontalWidth = 0;
            var pageWidth = this.documentHelper.getPageWidth(page);
            horizontalWidth = parseFloat(this.imageResizerDivElement.style.width);
            x = (this.documentHelper.visibleBounds.width - horizontalWidth * this.documentHelper.zoomFactor) / 2;
            if (x < 30) {
                x = 30;
            }
            if (pageWidth < horizontalWidth) {
                x += (horizontalWidth - pageWidth) * this.documentHelper.zoomFactor / 2;
            }
            var currentPageDiv = this.imageResizerDivElement;
            var currentPageDivWidth = parseFloat(currentPageDiv.style.width);
            var currentPageDivHeight = parseFloat(currentPageDiv.style.height);
            var imageResizerDivWidth = parseFloat(this.imageResizerDiv.style.width);
            var imageResizerDivHeight = parseFloat(this.imageResizerDiv.style.height);
            var margin = (this.resizeMarkSize - 1) / 2;
            var width = imageResizerDivWidth + 2 * margin;
            var height = imageResizerDivHeight + 2 * margin;
            if (width > (currentPageDivWidth - left) * this.documentHelper.zoomFactor + margin) {
                width = (currentPageDivWidth - left) * this.documentHelper.zoomFactor;
            }
            if (height > (currentPageDivHeight - top) * this.documentHelper.zoomFactor + margin) {
                height = (currentPageDivHeight - top) * this.documentHelper.zoomFactor;
            }
            this.imageResizerDivElement.style.width = parseInt(this.imageResizerDivElement.style.width.replace('px', ''), 10) * this.documentHelper.zoomFactor + 'px';
            this.imageResizerDivElement.style.height = parseInt(this.imageResizerDivElement.style.height.replace('px', ''), 10) * this.documentHelper.zoomFactor + 'px';
            height = this.documentHelper.render.getScaledValue(elementBox.height);
            width = this.documentHelper.render.getScaledValue(elementBox.width);
            if (elementBox instanceof page_1.ImageElementBox) {
                left = this.documentHelper.render.getScaledValue(left);
                top = this.documentHelper.render.getScaledValue(top);
            }
            else {
                left = elementBox.x * this.documentHelper.zoomFactor;
                top = elementBox.y * this.documentHelper.zoomFactor;
            }
            this.setImageResizerPosition(left, top, width, height, this);
            if (this.owner.selection.isInShape) {
                this.resizeContainerDiv.style.borderStyle = 'dashed';
            }
            else {
                this.resizeContainerDiv.style.borderStyle = 'solid';
            }
            if (!this.selectedImageWidget.containsKey(lineWidget)) {
                var selectedImageInfo = new SelectedImageInfo(elementBox.height, elementBox.width);
                this.selectedImageWidget.add(lineWidget, selectedImageInfo);
            }
        };
        ImageResizer.prototype.showImageResizer = function () {
            if (!ej2_base_1.isNullOrUndefined(this.imageResizerDivElement)) {
                this.imageResizerDivElement.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.resizeContainerDiv)) {
                this.resizeContainerDiv.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomLeftRect)) {
                this.bottomLeftRect.style.display = '';
                this.bottomLeftRectParent.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomRightRect)) {
                this.bottomRightRect.style.display = '';
                this.bottomRightRectParent.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomMiddleRect)) {
                this.bottomMiddleRect.style.display = '';
                this.bottomMiddleRectParent.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightMiddleRect)) {
                this.rightMiddleRect.style.display = '';
                this.rightMiddleRectParent.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topRightRect)) {
                this.topRightRect.style.display = '';
                this.topRightRectParent.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topLeftRect)) {
                this.topLeftRect.style.display = '';
                this.topLeftRectParent.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.leftMiddleRect)) {
                this.leftMiddleRect.style.display = '';
                this.leftMiddleRectParent.style.display = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topMiddleRect)) {
                this.topMiddleRect.style.display = '';
                this.topMiddleRectParent.style.display = '';
            }
            this.isImageResizerVisible = true;
        };
        ImageResizer.prototype.hideImageResizer = function () {
            if (!ej2_base_1.isNullOrUndefined(this.imageResizerDivElement)) {
                this.imageResizerDivElement.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.resizeContainerDiv)) {
                this.resizeContainerDiv.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomLeftRect)) {
                this.bottomLeftRect.style.display = 'none';
                this.bottomLeftRectParent.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomRightRect)) {
                this.bottomRightRect.style.display = 'none';
                this.bottomRightRectParent.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomMiddleRect)) {
                this.bottomMiddleRect.style.display = 'none';
                this.bottomMiddleRectParent.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightMiddleRect)) {
                this.rightMiddleRect.style.display = 'none';
                this.rightMiddleRectParent.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topRightRect)) {
                this.topRightRect.style.display = 'none';
                this.topRightRectParent.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topLeftRect)) {
                this.topLeftRect.style.display = 'none';
                this.topLeftRectParent.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.leftMiddleRect)) {
                this.leftMiddleRect.style.display = 'none';
                this.leftMiddleRectParent.style.display = 'none';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topMiddleRect)) {
                this.topMiddleRect.style.display = 'none';
                this.topMiddleRectParent.style.display = 'none';
            }
            this.isImageResizerVisible = false;
            this.currentPage = undefined;
        };
        ImageResizer.prototype.initResizeMarks = function (resizeDiv, imageResizer) {
            this.initResizeContainerDiv(imageResizer);
            resizeDiv.appendChild(imageResizer.resizeContainerDiv);
            imageResizer.topRightRectParent = document.createElement('div');
            imageResizer.topRightRectParent.style.cursor = 'ne-resize';
            imageResizer.topRightRectParent.id = this.documentHelper.owner.containerId + '_TopRightRectParent';
            this.applyProperties(imageResizer.topRightRectParent);
            imageResizer.topRightRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.topRightRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.topRightRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.topRightRectParent);
            imageResizer.topRightRect = document.createElement('div');
            imageResizer.topRightRect.id = this.documentHelper.owner.containerId + '_TopRightRect';
            imageResizer.topRightRect.style.cursor = 'ne-resize';
            this.applyProperties(imageResizer.topRightRect);
            resizeDiv.appendChild(imageResizer.topRightRect);
            imageResizer.topLeftRectParent = document.createElement('div');
            imageResizer.topLeftRectParent.style.cursor = 'nw-resize';
            imageResizer.topLeftRectParent.id = this.documentHelper.owner.containerId + '_TopLeftRectParent';
            this.applyProperties(imageResizer.topLeftRectParent);
            imageResizer.topLeftRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.topLeftRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.topLeftRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.topLeftRectParent);
            imageResizer.topLeftRect = document.createElement('div');
            imageResizer.topLeftRect.id = this.documentHelper.owner.containerId + '_TopLeftRect';
            imageResizer.topLeftRect.style.cursor = 'nw-resize';
            this.applyProperties(imageResizer.topLeftRect);
            resizeDiv.appendChild(imageResizer.topLeftRect);
            imageResizer.topMiddleRectParent = document.createElement('div');
            imageResizer.topMiddleRectParent.style.cursor = 'n-resize';
            imageResizer.topMiddleRectParent.id = this.documentHelper.owner.containerId + '_TopMiddleRectParent';
            this.applyProperties(imageResizer.topMiddleRectParent);
            imageResizer.topMiddleRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.topMiddleRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.topMiddleRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.topMiddleRectParent);
            imageResizer.topMiddleRect = document.createElement('div');
            imageResizer.topMiddleRect.id = this.documentHelper.owner.containerId + '_TopMiddleRect';
            imageResizer.topMiddleRect.style.cursor = 'n-resize';
            this.applyProperties(imageResizer.topMiddleRect);
            resizeDiv.appendChild(imageResizer.topMiddleRect);
            imageResizer.bottomRightRectParent = document.createElement('div');
            imageResizer.bottomRightRectParent.style.cursor = 'se-resize';
            imageResizer.bottomRightRectParent.id = this.documentHelper.owner.containerId + '_BottomRightRectParent';
            this.applyProperties(imageResizer.bottomRightRectParent);
            imageResizer.bottomRightRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.bottomRightRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.bottomRightRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.bottomRightRectParent);
            imageResizer.bottomRightRect = document.createElement('div');
            imageResizer.bottomRightRect.id = this.documentHelper.owner.containerId + '_BottomRightRect';
            imageResizer.bottomRightRect.style.cursor = 'se-resize';
            this.applyProperties(imageResizer.bottomRightRect);
            resizeDiv.appendChild(imageResizer.bottomRightRect);
            imageResizer.bottomLeftRectParent = document.createElement('div');
            imageResizer.bottomLeftRectParent.style.cursor = 'sw-resize';
            imageResizer.bottomLeftRectParent.id = this.documentHelper.owner.containerId + '_BottomLeftRectParent';
            this.applyProperties(imageResizer.bottomLeftRectParent);
            imageResizer.bottomLeftRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.bottomLeftRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.bottomLeftRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.bottomLeftRectParent);
            imageResizer.bottomLeftRect = document.createElement('div');
            imageResizer.bottomLeftRect.id = this.documentHelper.owner.containerId + '_BottomLeftRect';
            imageResizer.bottomLeftRect.style.cursor = 'sw-resize';
            this.applyProperties(imageResizer.bottomLeftRect);
            resizeDiv.appendChild(imageResizer.bottomLeftRect);
            imageResizer.bottomMiddleRectParent = document.createElement('div');
            imageResizer.bottomMiddleRectParent.style.cursor = 's-resize';
            imageResizer.bottomMiddleRectParent.id = this.documentHelper.owner.containerId + '_BottomMiddleRectParent';
            this.applyProperties(imageResizer.bottomMiddleRectParent);
            imageResizer.bottomMiddleRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.bottomMiddleRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.bottomMiddleRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.bottomMiddleRectParent);
            imageResizer.bottomMiddleRect = document.createElement('div');
            imageResizer.bottomMiddleRect.id = this.documentHelper.owner.containerId + '_BottomMiddleRect';
            imageResizer.bottomMiddleRect.style.cursor = 's-resize';
            this.applyProperties(imageResizer.bottomMiddleRect);
            resizeDiv.appendChild(imageResizer.bottomMiddleRect);
            imageResizer.rightMiddleRectParent = document.createElement('div');
            imageResizer.rightMiddleRectParent.style.cursor = 'e-resize';
            imageResizer.rightMiddleRectParent.id = this.documentHelper.owner.containerId + '_RightMiddleRectParent';
            this.applyProperties(imageResizer.rightMiddleRectParent);
            imageResizer.rightMiddleRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.rightMiddleRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.rightMiddleRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.rightMiddleRectParent);
            imageResizer.rightMiddleRect = document.createElement('div');
            imageResizer.rightMiddleRect.id = this.documentHelper.owner.containerId + '_RightMiddleRect';
            imageResizer.rightMiddleRect.style.cursor = 'e-resize';
            this.applyProperties(imageResizer.rightMiddleRect);
            resizeDiv.appendChild(imageResizer.rightMiddleRect);
            imageResizer.leftMiddleRectParent = document.createElement('div');
            imageResizer.leftMiddleRectParent.style.cursor = 'w-resize';
            imageResizer.leftMiddleRectParent.id = this.documentHelper.owner.containerId + '_LeftMiddleRectParent';
            this.applyProperties(imageResizer.leftMiddleRectParent);
            imageResizer.leftMiddleRectParent.style.width = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.leftMiddleRectParent.style.height = !this.documentHelper.isTouchInput ? '14px' : '30px';
            imageResizer.leftMiddleRectParent.style.opacity = '-1';
            resizeDiv.appendChild(imageResizer.leftMiddleRectParent);
            imageResizer.leftMiddleRect = document.createElement('div');
            imageResizer.leftMiddleRect.id = this.documentHelper.owner.containerId + '_LeftMiddleRect';
            imageResizer.leftMiddleRect.style.cursor = 'w-resize';
            this.applyProperties(imageResizer.leftMiddleRect);
            resizeDiv.appendChild(imageResizer.leftMiddleRect);
            return imageResizer.resizeContainerDiv;
        };
        ImageResizer.prototype.setImageResizerPosition = function (left, top, width, height, imageResizer) {
            imageResizer.resizeContainerDiv.style.width = width + 'px';
            imageResizer.resizeContainerDiv.style.height = height + 'px';
            imageResizer.resizeContainerDiv.style.left = left + 'px';
            imageResizer.resizeContainerDiv.style.top = top + 'px';
            imageResizer.topRightRect.style.left = ((left + width) - 5) + 'px';
            imageResizer.topRightRect.style.top = (top - 4) + 'px';
            imageResizer.topLeftRect.style.left = (left - 5) + 'px';
            imageResizer.topLeftRect.style.top = (top - 4) + 'px';
            imageResizer.topMiddleRect.style.left = ((parseFloat(imageResizer.topLeftRect.style.left) + (width / 2)) - 4) + 'px';
            imageResizer.topMiddleRect.style.top = (top - 4) + 'px';
            imageResizer.bottomRightRect.style.left = imageResizer.topRightRect.style.left;
            imageResizer.bottomRightRect.style.top = (parseFloat(imageResizer.topRightRect.style.top) + height) + 'px';
            imageResizer.bottomLeftRect.style.left = imageResizer.topLeftRect.style.left;
            imageResizer.bottomLeftRect.style.top = (parseFloat(imageResizer.topLeftRect.style.top) + height) + 'px';
            imageResizer.bottomMiddleRect.style.left = imageResizer.topMiddleRect.style.left;
            imageResizer.bottomMiddleRect.style.top = (parseFloat(imageResizer.topMiddleRect.style.top) + height) + 'px';
            imageResizer.rightMiddleRect.style.left = ((left + width) - 4) + 'px';
            imageResizer.rightMiddleRect.style.top = (parseFloat(imageResizer.topRightRect.style.top) + (height / 2)) + 'px';
            imageResizer.leftMiddleRect.style.left = imageResizer.topLeftRect.style.left;
            imageResizer.leftMiddleRect.style.top = (parseFloat(imageResizer.topLeftRect.style.top) + (height / 2)) + 'px';
            imageResizer.topRightRectParent.style.left = !this.documentHelper.isTouchInput ? ((left + width) - 8) + 'px' : ((left + width) - 15) + 'px';
            imageResizer.topRightRectParent.style.top = !this.documentHelper.isTouchInput ? (top - 7) + 'px' : (top - 15) + 'px';
            imageResizer.topLeftRectParent.style.left = !this.documentHelper.isTouchInput ? (left - 8) + 'px' : (left - 15) + 'px';
            imageResizer.topLeftRectParent.style.top = !this.documentHelper.isTouchInput ? (top - 7) + 'px' : (top - 15) + 'px';
            imageResizer.topMiddleRectParent.style.left = ((parseFloat(imageResizer.topLeftRectParent.style.left) + (width / 2)) - 4) + 'px';
            imageResizer.topMiddleRectParent.style.top = !this.documentHelper.isTouchInput ? (top - 7) + 'px' : (top - 15) + 'px';
            imageResizer.bottomRightRectParent.style.left = imageResizer.topRightRectParent.style.left;
            imageResizer.bottomRightRectParent.style.top = (parseFloat(imageResizer.topRightRectParent.style.top) + height) + 'px';
            imageResizer.bottomLeftRectParent.style.left = imageResizer.topLeftRectParent.style.left;
            imageResizer.bottomLeftRectParent.style.top = (parseFloat(imageResizer.topLeftRectParent.style.top) + height) + 'px';
            imageResizer.bottomMiddleRectParent.style.left = imageResizer.topMiddleRectParent.style.left;
            imageResizer.bottomMiddleRectParent.style.top = (parseFloat(imageResizer.topMiddleRectParent.style.top) + height) + 'px';
            imageResizer.rightMiddleRectParent.style.left = !this.documentHelper.isTouchInput ? ((left + width) - 7) + 'px' : ((left + width) - 15) + 'px';
            imageResizer.rightMiddleRectParent.style.top = (parseFloat(imageResizer.topRightRectParent.style.top) + (height / 2)) + 'px';
            imageResizer.leftMiddleRectParent.style.left = imageResizer.topLeftRectParent.style.left;
            imageResizer.leftMiddleRectParent.style.top = (parseFloat(imageResizer.topLeftRectParent.style.top) + (height / 2)) + 'px';
            this.setImageResizingPoints(imageResizer);
            if (this.documentHelper.isTouchInput) {
                this.applyPropertiesForTouch();
            }
            else {
                this.applyPropertiesForMouse();
            }
        };
        ImageResizer.prototype.setImageResizingPoints = function (imageResizer) {
            this.imageResizerPoints.resizeContainerDiv.x = parseFloat(imageResizer.resizeContainerDiv.style.left);
            this.imageResizerPoints.resizeContainerDiv.y = parseFloat(imageResizer.resizeContainerDiv.style.top);
            this.imageResizerPoints.bottomLeftRectParent.x = parseFloat(imageResizer.bottomLeftRectParent.style.left);
            this.imageResizerPoints.bottomLeftRectParent.y = parseFloat(imageResizer.bottomLeftRectParent.style.top);
            this.imageResizerPoints.bottomRightRectParent.x = parseFloat(imageResizer.bottomRightRectParent.style.left);
            this.imageResizerPoints.bottomRightRectParent.y = parseFloat(imageResizer.bottomRightRectParent.style.top);
            this.imageResizerPoints.bottomMiddleRectParent.x = parseFloat(imageResizer.bottomMiddleRectParent.style.left);
            this.imageResizerPoints.bottomMiddleRectParent.y = parseFloat(imageResizer.bottomMiddleRectParent.style.top);
            this.imageResizerPoints.topLeftRectParent.x = parseFloat(imageResizer.topLeftRectParent.style.left);
            this.imageResizerPoints.topLeftRectParent.y = parseFloat(imageResizer.topLeftRectParent.style.top);
            this.imageResizerPoints.topRightRectParent.x = parseFloat(imageResizer.topRightRectParent.style.left);
            this.imageResizerPoints.topRightRectParent.y = parseFloat(imageResizer.topRightRectParent.style.top);
            this.imageResizerPoints.topMiddleRectParent.x = parseFloat(imageResizer.topMiddleRectParent.style.left);
            this.imageResizerPoints.topMiddleRectParent.y = parseFloat(imageResizer.topMiddleRectParent.style.top);
            this.imageResizerPoints.leftMiddleRectParent.x = parseFloat(imageResizer.leftMiddleRectParent.style.left);
            this.imageResizerPoints.leftMiddleRectParent.y = parseFloat(imageResizer.leftMiddleRectParent.style.top);
            this.imageResizerPoints.rightMiddleRectParent.x = parseFloat(imageResizer.rightMiddleRectParent.style.left);
            this.imageResizerPoints.rightMiddleRectParent.y = parseFloat(imageResizer.rightMiddleRectParent.style.top);
        };
        ImageResizer.prototype.initResizeContainerDiv = function (imageResizer) {
            imageResizer.resizeContainerDiv = document.createElement('div');
            imageResizer.resizeContainerDiv.id = this.documentHelper.owner.containerId + '_ResizeDivElement';
            imageResizer.resizeContainerDiv.style.position = 'absolute';
            imageResizer.resizeContainerDiv.style.border = '1px solid #bfbfbf';
            imageResizer.resizeContainerDiv.style.zIndex = '30';
            imageResizer.resizeContainerDiv.style.backgroundColor = 'transparent';
            imageResizer.resizeContainerDiv.style.display = 'block';
        };
        ImageResizer.prototype.applyProperties = function (resizeRectElement) {
            resizeRectElement.style.position = 'absolute';
            resizeRectElement.style.width = '8px';
            resizeRectElement.style.height = '8px';
            resizeRectElement.style.fontSize = '0px';
            resizeRectElement.style.zIndex = ' 551';
            resizeRectElement.style.backgroundColor = '#ffffff';
            resizeRectElement.style.border = '1px solid #bfbfbf';
            resizeRectElement.style.boxShadow = '0 1px 2px 0 #bfbfbf 0.35';
            resizeRectElement.style.color = '#000000';
        };
        ImageResizer.prototype.handleImageResizing = function (touchPoint, prevX, prevY) {
            prevX = prevX / this.documentHelper.zoomFactor;
            prevY = prevY / this.documentHelper.zoomFactor;
            this.leftValue = ej2_base_1.isNullOrUndefined(this.leftValue) ? prevX : this.leftValue;
            this.topValue = ej2_base_1.isNullOrUndefined(this.topValue) ? prevY : this.topValue;
            var points;
            var id = this.selectedResizeElement.id.split('_');
            var currentElementId = id[id.length - 1];
            switch (currentElementId) {
                case 'TopRightRectParent':
                    points = this.topRightResizing(touchPoint);
                    prevX = points.left;
                    prevY = points.top;
                    break;
                case 'TopLeftRectParent':
                    points = this.topLeftResizing(touchPoint);
                    prevX = -points.left;
                    prevY = -points.top;
                    break;
                case 'TopMiddleRectParent':
                    prevX = 0;
                    prevY = this.topMiddleResizing(touchPoint);
                    break;
                case 'BottomRightRectParent':
                    points = this.bottomRightResizing(touchPoint);
                    prevX = points.left;
                    prevY = points.top;
                    break;
                case 'BottomLeftRectParent':
                    points = this.bottomLeftResizing(touchPoint);
                    prevX = -points.left;
                    prevY = -points.top;
                    break;
                case 'BottomMiddleRectParent':
                    prevY = touchPoint.y - prevY;
                    prevX = 0;
                    break;
                case 'RightMiddleRectParent':
                    prevX = touchPoint.x - prevX;
                    prevY = 0;
                    break;
                case 'LeftMiddleRectParent':
                    prevX = this.leftMiddleResizing(touchPoint);
                    prevY = 0;
                    break;
                default:
                    break;
            }
            if (prevX !== 0 || prevY !== 0) {
                var widget = this.currentImageElementBox.line.paragraph;
                var image = this.currentImageElementBox;
                if (!ej2_base_1.isNullOrUndefined(widget) && widget.isInsideTable) {
                    var cellWidget = widget.containerWidget;
                    if (!ej2_base_1.isNullOrUndefined(cellWidget)) {
                        var rowWidget = cellWidget.containerWidget;
                        var imageHeight = editor_helper_1.HelperMethods.convertPointToPixel(image.height);
                        var widgetHeight = rowWidget.height - imageHeight;
                        if (prevY > 0 && rowWidget.y + widgetHeight + imageHeight + prevY > this.viewer.clientArea.bottom) {
                            this.isImageMoveToNextPage = true;
                        }
                    }
                }
                if (this.owner.enableHistoryMode) {
                    this.initHistoryForImageResizer(this.currentImageElementBox);
                }
                if (!ej2_base_1.isNullOrUndefined(this.currentImageElementBox)) {
                    var width = this.currentImageElementBox.width + prevX > 10 ? this.currentImageElementBox.width + prevX : 10;
                    var height = this.currentImageElementBox.height + prevY > 10 ? this.currentImageElementBox.height + prevY : 10;
                    if (currentElementId === 'BottomRightRectParent'
                        || currentElementId === 'TopRightRectParent'
                        || currentElementId === 'BottomLeftRectParent'
                        || currentElementId === 'TopLeftRectParent') {
                        height = this.currentImageElementBox.height / this.currentImageElementBox.width * width;
                        width = this.currentImageElementBox.width / this.currentImageElementBox.height * height;
                    }
                    this.currentImageElementBox.width = width;
                    this.currentImageElementBox.height = height;
                    var owner = this.currentImageElementBox.line.paragraph;
                    this.positionImageResizer(this.currentImageElementBox);
                }
                this.isImageResizing = true;
            }
        };
        ImageResizer.prototype.handleImageResizingOnMouse = function (event) {
            if (!ej2_base_1.isNullOrUndefined(this.selectedResizeElement)) {
                var prevX = parseFloat(this.selectedResizeElement.style.left);
                var prevY = parseFloat(this.selectedResizeElement.style.top);
                var cursorPoint = new editor_helper_1.Point(event.offsetX, event.offsetY);
                var touchPoint = this.viewer.findFocusedPage(cursorPoint, true);
                this.handleImageResizing(touchPoint, prevX, prevY);
            }
        };
        ImageResizer.prototype.topMiddleResizing = function (touchPoint) {
            var prevY;
            if (this.topValue >= touchPoint.y) {
                prevY = this.topValue / touchPoint.y;
                this.topValue = touchPoint.y;
                if (this.viewer instanceof index_1.PageLayoutViewer) {
                    if (this.topValue <= this.viewer.pageGap) {
                        prevY = 1;
                    }
                }
            }
            else {
                prevY = -(touchPoint.y / this.topValue);
                this.topValue = touchPoint.y;
                if (this.topValue === 0) {
                    prevY = -1;
                }
            }
            return prevY;
        };
        ImageResizer.prototype.leftMiddleResizing = function (touchPoint) {
            var prevX;
            if (this.leftValue >= touchPoint.x) {
                prevX = this.leftValue / touchPoint.x;
                this.leftValue = touchPoint.x;
                if (this.leftValue === 0) {
                    prevX = 1;
                    this.leftValue = parseFloat(this.selectedResizeElement.style.left);
                }
            }
            else {
                prevX = -(touchPoint.x / this.leftValue);
                this.leftValue = touchPoint.x;
            }
            return prevX;
        };
        ImageResizer.prototype.topRightResizing = function (touchPoint) {
            var points;
            if (this.leftValue <= touchPoint.x && this.topValue >= touchPoint.y) {
                points = this.getOuterResizingPoint(touchPoint);
            }
            else {
                points = this.getInnerResizingPoint(touchPoint);
            }
            return points;
        };
        ImageResizer.prototype.topLeftResizing = function (touchPoint) {
            var points;
            if (this.leftValue >= touchPoint.x && this.topValue >= touchPoint.y) {
                points = this.getOuterResizingPoint(touchPoint);
            }
            else {
                points = this.getInnerResizingPoint(touchPoint);
            }
            return points;
        };
        ImageResizer.prototype.bottomRightResizing = function (touchPoint) {
            var points;
            if (this.leftValue <= touchPoint.x && this.topValue <= touchPoint.y) {
                points = this.getOuterResizingPoint(touchPoint);
            }
            else {
                points = this.getInnerResizingPoint(touchPoint);
            }
            return points;
        };
        ImageResizer.prototype.bottomLeftResizing = function (touchPoint) {
            var points;
            if (this.leftValue >= touchPoint.x && this.topValue <= touchPoint.y) {
                points = this.getOuterResizingPoint(touchPoint);
            }
            else {
                points = this.getInnerResizingPoint(touchPoint);
            }
            return points;
        };
        ImageResizer.prototype.getOuterResizingPoint = function (touchPoint) {
            var prevX;
            var prevY;
            prevX = touchPoint.x - this.leftValue;
            this.leftValue = touchPoint.x;
            prevY = touchPoint.y - this.topValue;
            this.topValue = touchPoint.y;
            return { left: prevX, top: prevY };
        };
        ImageResizer.prototype.getInnerResizingPoint = function (touchPoint) {
            var prevX;
            var prevY;
            prevX = -(this.leftValue - touchPoint.x);
            this.leftValue = touchPoint.x;
            prevY = -(this.topValue - touchPoint.y);
            this.topValue = touchPoint.y;
            return { left: prevX, top: prevY };
        };
        ImageResizer.prototype.handleImageResizingOnTouch = function (touchEvent) {
            if (!ej2_base_1.isNullOrUndefined(this.selectedResizeElement)) {
                var prevX = parseFloat(this.selectedResizeElement.style.left) + 24;
                var prevY = parseFloat(this.selectedResizeElement.style.top) + 24;
                var touch = touchEvent.touches;
                var cursorPoint = new editor_helper_1.Point(touch[0].clientX, touch[0].clientY);
                var touchPoint = this.viewer.findFocusedPage(cursorPoint, true);
                if (ej2_base_1.isNullOrUndefined(this.currentImageElementBox) || ej2_base_1.isNullOrUndefined(this.currentImageElementBox)) {
                    return;
                }
                this.handleImageResizing(touchPoint, prevX, prevY);
            }
        };
        ImageResizer.prototype.getImagePoint = function (touchPoint) {
            var x = this.documentHelper.render.getScaledValue(touchPoint.x, 1);
            var y = this.documentHelper.render.getScaledValue(touchPoint.y, 2);
            touchPoint = new editor_helper_1.Point(x, y);
            var imageResizingPoints = this.imageResizerPoints;
            var resizePosition = '';
            var selectedElement = undefined;
            var bottomMiddle = imageResizingPoints.bottomMiddleRectParent;
            var bottomRight = imageResizingPoints.bottomRightRectParent;
            var bottomLeft = imageResizingPoints.bottomLeftRectParent;
            var topMiddle = imageResizingPoints.topMiddleRectParent;
            var topRight = imageResizingPoints.topRightRectParent;
            var topLeft = imageResizingPoints.topLeftRectParent;
            var rightMiddle = imageResizingPoints.rightMiddleRectParent;
            var leftMiddle = imageResizingPoints.leftMiddleRectParent;
            if (!ej2_base_1.isNullOrUndefined(this.bottomMiddleRectParent) && this.bottomMiddleRectParent.style.display !== 'none') {
                if ((touchPoint.x > bottomMiddle.x && touchPoint.x <= bottomMiddle.x + 15) && (touchPoint.y > bottomMiddle.y && touchPoint.y <= bottomMiddle.y + 15)) {
                    selectedElement = this.bottomMiddleRectParent;
                    resizePosition = 's-resize';
                }
                else if ((touchPoint.x > bottomRight.x && touchPoint.x <= bottomRight.x + 15) && (touchPoint.y > bottomRight.y && touchPoint.y <= bottomRight.y + 15)) {
                    selectedElement = this.bottomRightRectParent;
                    resizePosition = 'se-resize';
                }
                else if ((touchPoint.x > bottomLeft.x && touchPoint.x <= bottomLeft.x + 15) && (touchPoint.y > bottomLeft.y && touchPoint.y <= bottomLeft.y + 15)) {
                    selectedElement = this.bottomLeftRectParent;
                    resizePosition = 'sw-resize';
                }
                else if ((touchPoint.x > topMiddle.x && touchPoint.x <= topMiddle.x + 15) && (touchPoint.y > topMiddle.y && touchPoint.y <= topMiddle.y + 15)) {
                    selectedElement = this.topMiddleRectParent;
                    resizePosition = 'n-resize';
                }
                else if ((touchPoint.x > topRight.x && touchPoint.x <= topRight.x + 15) && (touchPoint.y > topRight.y && touchPoint.y <= topRight.y + 15)) {
                    selectedElement = this.topRightRectParent;
                    resizePosition = 'ne-resize';
                }
                else if ((touchPoint.x > topLeft.x && touchPoint.x <= topLeft.x + 15) && (touchPoint.y > topLeft.y && touchPoint.y <= topLeft.y + 15)) {
                    selectedElement = this.topLeftRectParent;
                    resizePosition = 'nw-resize';
                }
                else if ((touchPoint.x > leftMiddle.x && touchPoint.x <= leftMiddle.x + 15) && (touchPoint.y > leftMiddle.y && touchPoint.y <= leftMiddle.y + 15)) {
                    selectedElement = this.leftMiddleRectParent;
                    resizePosition = 'w-resize';
                }
                else if ((touchPoint.x > rightMiddle.x && touchPoint.x <= rightMiddle.x + 15) && (touchPoint.y > rightMiddle.y && touchPoint.y <= rightMiddle.y + 15)) {
                    selectedElement = this.rightMiddleRectParent;
                    resizePosition = 'e-resize';
                }
                else if (!ej2_base_1.isNullOrUndefined(this.resizeContainerDiv) && (touchPoint.x > parseFloat(this.resizeContainerDiv.style.left)
                    && touchPoint.x <= (parseFloat(this.resizeContainerDiv.style.left) + parseFloat(this.resizeContainerDiv.style.width)))
                    && (touchPoint.y > parseFloat(this.resizeContainerDiv.style.top)
                        && touchPoint.y <= (parseFloat(this.resizeContainerDiv.style.top) + parseFloat(this.resizeContainerDiv.style.height)))) {
                    resizePosition = 'move';
                }
            }
            return { 'selectedElement': selectedElement, 'resizePosition': resizePosition };
        };
        ImageResizer.prototype.applyPropertiesForMouse = function () {
            if (!ej2_base_1.isNullOrUndefined(this.bottomLeftRectParent)) {
                this.bottomMiddleRectParent.style.width = '14px';
                this.bottomMiddleRectParent.style.height = '14px';
                this.bottomRightRectParent.style.width = '14px';
                this.bottomRightRectParent.style.height = '14px';
                this.bottomLeftRectParent.style.width = '14px';
                this.bottomLeftRectParent.style.height = '14px';
                this.topMiddleRectParent.style.width = '14px';
                this.topMiddleRectParent.style.height = '14px';
                this.topRightRectParent.style.width = '14px';
                this.topRightRectParent.style.height = '14px';
                this.topLeftRectParent.style.width = '14px';
                this.topLeftRectParent.style.height = '14px';
                this.leftMiddleRectParent.style.width = '14px';
                this.leftMiddleRectParent.style.height = '14px';
                this.rightMiddleRectParent.style.width = '14px';
                this.rightMiddleRectParent.style.height = '14px';
            }
        };
        ImageResizer.prototype.getImagePointOnTouch = function (touchPoints) {
            var x = this.documentHelper.render.getScaledValue(touchPoints.x, 1);
            var y = this.documentHelper.render.getScaledValue(touchPoints.y, 2);
            touchPoints = new editor_helper_1.Point(x, y);
            var imageResizingPointsOnTouch = this.imageResizerPoints;
            var resizePosition = '';
            var selectedElements = undefined;
            var bottomMiddle = imageResizingPointsOnTouch.bottomMiddleRectParent;
            var bottomRight = imageResizingPointsOnTouch.bottomRightRectParent;
            var bottomLeft = imageResizingPointsOnTouch.bottomLeftRectParent;
            var topMiddle = imageResizingPointsOnTouch.topMiddleRectParent;
            var topRight = imageResizingPointsOnTouch.topRightRectParent;
            var topLeft = imageResizingPointsOnTouch.topLeftRectParent;
            var rightMiddle = imageResizingPointsOnTouch.rightMiddleRectParent;
            var leftMiddle = imageResizingPointsOnTouch.leftMiddleRectParent;
            if (!ej2_base_1.isNullOrUndefined(this.bottomMiddleRectParent) && this.bottomMiddleRectParent.style.display !== 'none') {
                if ((touchPoints.x > bottomMiddle.x && touchPoints.x <= bottomMiddle.x + 25) && (touchPoints.y > bottomMiddle.y && touchPoints.y <= bottomMiddle.y + 25)) {
                    selectedElements = this.bottomMiddleRectParent;
                    resizePosition = 's-resize';
                }
                else if ((touchPoints.x > bottomRight.x && touchPoints.x <= bottomRight.x + 25) && (touchPoints.y > bottomRight.y && touchPoints.y <= bottomRight.y + 25)) {
                    selectedElements = this.bottomRightRectParent;
                    resizePosition = 'se-resize';
                }
                else if ((touchPoints.x > bottomLeft.x && touchPoints.x <= bottomLeft.x + 25) && (touchPoints.y > bottomLeft.y && touchPoints.y <= bottomLeft.y + 25)) {
                    selectedElements = this.bottomLeftRectParent;
                    resizePosition = 'sw-resize';
                }
                else if ((touchPoints.x > topMiddle.x && touchPoints.x <= topMiddle.x + 25) && (touchPoints.y > topMiddle.y && touchPoints.y <= topMiddle.y + 25)) {
                    selectedElements = this.topMiddleRectParent;
                    resizePosition = 'n-resize';
                }
                else if ((touchPoints.x > topRight.x && touchPoints.x <= topRight.x + 25) && (touchPoints.y > topRight.y && touchPoints.y <= topRight.y + 25)) {
                    selectedElements = this.topRightRectParent;
                    resizePosition = 'ne-resize';
                }
                else if ((touchPoints.x > topLeft.x && touchPoints.x <= topLeft.x + 25) && (touchPoints.y > topLeft.y && touchPoints.y <= topLeft.y + 25)) {
                    selectedElements = this.topLeftRectParent;
                    resizePosition = 'nw-resize';
                }
                else if ((touchPoints.x > leftMiddle.x && touchPoints.x <= leftMiddle.x + 25) && (touchPoints.y > leftMiddle.y && touchPoints.y <= leftMiddle.y + 25)) {
                    selectedElements = this.leftMiddleRectParent;
                    resizePosition = 'w-resize';
                }
                else if ((touchPoints.x > rightMiddle.x && touchPoints.x <= rightMiddle.x + 25) && (touchPoints.y > rightMiddle.y && touchPoints.y <= rightMiddle.y + 25)) {
                    selectedElements = this.rightMiddleRectParent;
                    resizePosition = 'e-resize';
                }
                else if (!ej2_base_1.isNullOrUndefined(this.resizeContainerDiv) && (touchPoints.x > parseFloat(this.resizeContainerDiv.style.left)
                    && touchPoints.x <= (parseFloat(this.resizeContainerDiv.style.left) + parseFloat(this.resizeContainerDiv.style.width)))
                    && (touchPoints.y > parseFloat(this.resizeContainerDiv.style.top)
                        && touchPoints.y <= (parseFloat(this.resizeContainerDiv.style.top) + parseFloat(this.resizeContainerDiv.style.height)))) {
                    resizePosition = 'move';
                }
            }
            return { 'selectedElement': selectedElements, 'resizePosition': resizePosition };
        };
        ImageResizer.prototype.applyPropertiesForTouch = function () {
            if (!ej2_base_1.isNullOrUndefined(this.bottomLeftRectParent)) {
                this.bottomMiddleRectParent.style.width = '30px';
                this.bottomMiddleRectParent.style.height = '30px';
                this.bottomRightRectParent.style.width = '30px';
                this.bottomRightRectParent.style.height = '30px';
                this.bottomLeftRectParent.style.width = '30px';
                this.bottomLeftRectParent.style.height = '30px';
                this.topMiddleRectParent.style.width = '30px';
                this.topMiddleRectParent.style.height = '30px';
                this.topRightRectParent.style.width = '30px';
                this.topRightRectParent.style.height = '30px';
                this.topLeftRectParent.style.width = '30px';
                this.topLeftRectParent.style.height = '30px';
                this.leftMiddleRectParent.style.width = '30px';
                this.leftMiddleRectParent.style.height = '30px';
                this.rightMiddleRectParent.style.width = '30px';
                this.rightMiddleRectParent.style.height = '30px';
            }
        };
        ImageResizer.prototype.mouseUpInternal = function () {
            this.currentImageElementBox.width = parseFloat(this.imageResizerDiv.style.width) / this.documentHelper.zoomFactor;
            this.currentImageElementBox.height = parseFloat(this.imageResizerDiv.style.height) / this.documentHelper.zoomFactor;
            this.owner.isShiftingEnabled = true;
            this.owner.editorModule.setOffsetValue(this.owner.selection);
            this.documentHelper.layout.reLayoutParagraph(this.currentImageElementBox.line.paragraph, 0, 0);
            this.updateHistoryForImageResizer();
            this.owner.editorModule.reLayout(this.owner.selection, true);
            this.viewer.updateScrollBars();
        };
        ImageResizer.prototype.initHistoryForImageResizer = function (imageContainer) {
            if (!ej2_base_1.isNullOrUndefined(this.owner) && ej2_base_1.isNullOrUndefined(this.baseHistoryInfo)) {
                this.baseHistoryInfo = new base_history_info_1.BaseHistoryInfo(this.owner);
                this.baseHistoryInfo.action = 'ImageResizing';
                this.baseHistoryInfo.updateSelection();
                this.baseHistoryInfo.modifiedProperties.push(new selection_helper_1.ImageSizeInfo(imageContainer));
            }
        };
        ImageResizer.prototype.updateHistoryForImageResizer = function () {
            if (!ej2_base_1.isNullOrUndefined(this.owner) && !ej2_base_1.isNullOrUndefined(this.baseHistoryInfo)) {
                var imageFormat = this.baseHistoryInfo.modifiedProperties[0];
                if (this.currentImageElementBox.width === imageFormat.width
                    && this.currentImageElementBox.height === imageFormat.height) {
                    this.baseHistoryInfo.modifiedProperties.pop();
                }
                else {
                    this.baseHistoryInfo.insertedText = types_1.CONTROL_CHARACTERS.Image;
                    this.baseHistoryInfo.insertedData = { width: editor_helper_1.HelperMethods.convertPixelToPoint(this.currentImageElementBox.width), height: editor_helper_1.HelperMethods.convertPixelToPoint(this.currentImageElementBox.height) };
                    this.owner.editorHistory.recordChanges(this.baseHistoryInfo);
                }
                this.baseHistoryInfo = undefined;
            }
        };
        ImageResizer.prototype.updateImageResizerPosition = function () {
            if (!ej2_base_1.isNullOrUndefined(this.currentImageElementBox)) {
                var elementBox = this.currentImageElementBox instanceof page_1.ImageElementBox ? this.currentImageElementBox : this.currentImageElementBox;
                var lineWidget = elementBox.line;
                var top_1;
                var left = void 0;
                var topValue = void 0;
                var leftValue = void 0;
                if (this.currentImageElementBox instanceof page_1.ImageElementBox) {
                    top_1 = this.documentHelper.selection.getTop(lineWidget) + elementBox.margin.top;
                    left = this.documentHelper.selection.getLeftInternal(lineWidget, elementBox, 0);
                    topValue = top_1 * this.documentHelper.zoomFactor;
                    leftValue = left * this.documentHelper.zoomFactor;
                }
                else {
                    leftValue = elementBox.x * this.documentHelper.zoomFactor;
                    topValue = elementBox.y * this.documentHelper.zoomFactor;
                }
                var height = this.documentHelper.render.getScaledValue(elementBox.height, 2);
                var width = this.documentHelper.render.getScaledValue(elementBox.width, 1);
                this.setImageResizerPosition(leftValue, topValue, width, height, this);
            }
        };
        ImageResizer.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.resizeContainerDiv)) {
                this.resizeContainerDiv.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topLeftRect)) {
                this.topLeftRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topMiddleRect)) {
                this.topMiddleRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.topRightRect)) {
                this.topRightRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomLeftRect)) {
                this.bottomLeftRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomMiddleRect)) {
                this.bottomMiddleRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.bottomRightRect)) {
                this.bottomRightRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.leftMiddleRect)) {
                this.leftMiddleRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.rightMiddleRect)) {
                this.rightMiddleRect.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.imageResizerDiv)) {
                this.imageResizerDiv.innerHTML = '';
            }
            if (!ej2_base_1.isNullOrUndefined(this.selectedImageWidget)) {
                this.selectedImageWidget.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.imageResizerDivElement)) {
                this.imageResizerDivElement.innerHTML = '';
                if (!ej2_base_1.isNullOrUndefined(this.imageResizerDivElement.parentElement)) {
                    this.imageResizerDivElement.parentElement.removeChild(this.imageResizerDivElement);
                }
            }
            this.imageResizerDivElement = undefined;
            this.resizeContainerDiv = undefined;
            this.topLeftRect = undefined;
            this.topMiddleRect = undefined;
            this.topRightRect = undefined;
            this.bottomLeftRect = undefined;
            this.bottomMiddleRect = undefined;
            this.bottomRightRect = undefined;
            this.leftMiddleRect = undefined;
            this.rightMiddleRect = undefined;
            this.imageResizerDiv = undefined;
            this.selectedImageWidget = undefined;
            this.isImageResizing = false;
            this.isImageResizerVisible = false;
            this.currentImageElementBoxIn = undefined;
            this.imageResizerPoints = undefined;
            this.resizeMarkSizeIn = undefined;
            this.currentPage = undefined;
            this.documentHelper = undefined;
            this.owner = undefined;
        };
        return ImageResizer;
    }());
    exports.ImageResizer = ImageResizer;
    var ImageResizingPoints = (function () {
        function ImageResizingPoints() {
            this.resizeContainerDiv = new editor_helper_1.Point(0, 0);
            this.topLeftRectParent = new editor_helper_1.Point(0, 0);
            this.topMiddleRectParent = new editor_helper_1.Point(0, 0);
            this.topRightRectParent = new editor_helper_1.Point(0, 0);
            this.bottomLeftRectParent = new editor_helper_1.Point(0, 0);
            this.bottomMiddleRectParent = new editor_helper_1.Point(0, 0);
            this.bottomRightRectParent = new editor_helper_1.Point(0, 0);
            this.leftMiddleRectParent = new editor_helper_1.Point(0, 0);
            this.rightMiddleRectParent = new editor_helper_1.Point(0, 0);
        }
        return ImageResizingPoints;
    }());
    exports.ImageResizingPoints = ImageResizingPoints;
    var SelectedImageInfo = (function () {
        function SelectedImageInfo(height, width) {
            this.heightIn = 0;
            this.widthIn = 0;
            this.heightIn = height;
            this.widthIn = width;
        }
        Object.defineProperty(SelectedImageInfo.prototype, "height", {
            get: function () {
                return this.heightIn;
            },
            set: function (value) {
                this.heightIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectedImageInfo.prototype, "width", {
            get: function () {
                return this.widthIn;
            },
            set: function (value) {
                this.widthIn = value;
            },
            enumerable: true,
            configurable: true
        });
        return SelectedImageInfo;
    }());
    exports.SelectedImageInfo = SelectedImageInfo;
});
