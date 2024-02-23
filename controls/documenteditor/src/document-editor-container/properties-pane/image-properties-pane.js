define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-inputs", "@syncfusion/ej2-buttons", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_inputs_1, ej2_buttons_1, ej2_inputs_2, ej2_base_2, ej2_base_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImageProperties = (function () {
        function ImageProperties(container, isRtl) {
            this.isWidthApply = false;
            this.isHeightApply = false;
            this.container = container;
            this.elementId = this.documentEditor.element.id;
            this.isMaintainAspectRatio = false;
            this.isRtl = isRtl;
            this.initializeImageProperties();
        }
        Object.defineProperty(ImageProperties.prototype, "documentEditor", {
            get: function () {
                return this.container.documentEditor;
            },
            enumerable: true,
            configurable: true
        });
        ImageProperties.prototype.enableDisableElements = function (enable) {
            if (enable) {
                ej2_base_1.classList(this.element, [], ['e-de-overlay']);
            }
            else {
                ej2_base_1.classList(this.element, ['e-de-overlay'], []);
            }
        };
        ImageProperties.prototype.initializeImageProperties = function () {
            this.element = ej2_base_1.createElement('div', { id: this.elementId + '_imageProperties', className: 'e-de-prop-pane' });
            this.element.style.display = 'none';
            this.container.propertiesPaneContainer.appendChild(this.element);
            this.initImageProp();
            this.initImageAltProp();
            this.wireEvents();
        };
        ImageProperties.prototype.initImageProp = function () {
            var localObj = new ej2_base_1.L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
            var imageDiv = ej2_base_1.createElement('div', { id: this.elementId + '_imageDiv', className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
            this.element.appendChild(imageDiv);
            var label = ej2_base_1.createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.textContent = localObj.getConstant('Image');
            imageDiv.appendChild(label);
            var outerDiv = ej2_base_1.createElement('div');
            imageDiv.appendChild(outerDiv);
            this.widthElement = this.createImagePropertiesDiv('_widthDiv', outerDiv, '_widthInput', localObj.getConstant('W'), localObj.getConstant('Width'));
            this.widthNumericBox = new ej2_inputs_1.NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
            this.widthNumericBox.appendTo(this.widthElement);
            this.heightElement = this.createImagePropertiesDiv('_heightDiv', outerDiv, '_heightInput', localObj.getConstant('H'), localObj.getConstant('Height'));
            this.heightNumericBox = new ej2_inputs_1.NumericTextBox({ min: 0, max: 23500, cssClass: 'e-de-image-property', showSpinButton: false, format: 'n0', decimals: 2 });
            this.heightNumericBox.appendTo(this.heightElement);
            var aspectRatioDiv = ej2_base_1.createElement('div', { id: this.elementId + '_aspectRatioDiv' });
            aspectRatioDiv.setAttribute('title', localObj.getConstant('Aspect ratio'));
            outerDiv.appendChild(aspectRatioDiv);
            var aspectRatio = ej2_base_1.createElement('input', { id: this.elementId + '_aspectRatio', className: 'e-de-ctnr-prop-label' });
            aspectRatioDiv.appendChild(aspectRatio);
            this.aspectRatioBtn = new ej2_buttons_1.CheckBox({ label: localObj.getConstant('Aspect ratio'), enableRtl: this.isRtl }, aspectRatio);
        };
        ImageProperties.prototype.initImageAltProp = function () {
            var localObj = new ej2_base_1.L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
            var AltDiv = ej2_base_1.createElement('div', { id: this.elementId + '_altDiv', className: 'e-de-cntr-pane-padding e-de-prop-separator-line' });
            this.element.appendChild(AltDiv);
            var label = ej2_base_1.createElement('label', { className: 'e-de-ctnr-prop-label' });
            label.textContent = localObj.getConstant('Alternate Text');
            AltDiv.appendChild(label);
            this.textArea = ej2_base_1.createElement('textarea', { id: this.elementId + '_textarea', className: 'e-de-ctnr-prop-label ' });
            AltDiv.appendChild(this.textArea);
            var textareaObj = new ej2_inputs_2.TextBox({
                floatLabelType: 'Never'
            });
            textareaObj.appendTo(this.textArea);
        };
        ;
        ImageProperties.prototype.createImagePropertiesDiv = function (id, outerDiv, inputId, spanContent, tooltip) {
            var divElement = ej2_base_1.createElement('div', { id: this.elementId + id, styles: 'position: relative;width: 100%;', className: 'e-de-ctnr-segment' });
            divElement.setAttribute('title', tooltip);
            outerDiv.appendChild(divElement);
            var inputElement = ej2_base_1.createElement('input', { id: this.elementId + inputId, className: 'e-textbox', styles: 'width:100%;' });
            divElement.appendChild(inputElement);
            var spanElement = ej2_base_1.createElement('span', { className: 'e-de-img-prty-span' });
            spanElement.textContent = spanContent;
            divElement.appendChild(spanElement);
            return inputElement;
        };
        ImageProperties.prototype.wireEvents = function () {
            var _this = this;
            this.aspectRatioBtn.element.addEventListener('change', this.onAspectRatioBtnClick.bind(this));
            this.widthNumericBox.element.addEventListener('click', function () {
                _this.isWidthApply = true;
            });
            this.heightNumericBox.element.addEventListener('click', function () {
                _this.isHeightApply = true;
            });
            this.widthNumericBox.element.addEventListener('keydown', this.onImageWidth.bind(this));
            this.heightNumericBox.element.addEventListener('keydown', this.onImageHeight.bind(this));
            this.widthNumericBox.element.addEventListener('blur', function () {
                _this.applyImageWidth();
                _this.isWidthApply = false;
            });
            this.heightNumericBox.element.addEventListener('blur', function () {
                _this.applyImageHeight();
                _this.isHeightApply = false;
            });
            this.textArea.addEventListener('blur', function () {
                if (_this.documentEditor.selection.imageFormat.alternateText != _this.textArea.value) {
                    _this.applyImageAlternativeText();
                }
            });
        };
        ImageProperties.prototype.applyImageAlternativeText = function () {
            var altText = ej2_base_2.SanitizeHtmlHelper.sanitize(this.textArea.value);
            if (!ej2_base_3.isNullOrUndefined(altText)) {
                this.documentEditor.selection.imageFormat.applyImageAlternativeText(altText);
            }
        };
        ImageProperties.prototype.onImageWidth = function (e) {
            var _this = this;
            if (e.keyCode === 13) {
                setTimeout(function () {
                    _this.applyImageWidth();
                    _this.isWidthApply = false;
                }, 30);
            }
        };
        ImageProperties.prototype.onImageHeight = function (e) {
            var _this = this;
            if (e.keyCode === 13) {
                setTimeout(function () {
                    _this.applyImageHeight();
                    _this.isHeightApply = false;
                }, 30);
            }
        };
        ImageProperties.prototype.applyImageWidth = function () {
            if (!this.isMaintainAspectRatio) {
                var width = this.widthNumericBox.value;
                var height = this.heightNumericBox.value;
                if (width > this.widthNumericBox.max) {
                    width = this.widthNumericBox.max;
                }
                if (height > this.heightNumericBox.max) {
                    height = this.heightNumericBox.max;
                }
                if (!(width === null || height === null)) {
                    this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
            else if (this.isMaintainAspectRatio) {
                var width = this.widthNumericBox.value;
                if (width > this.widthNumericBox.max) {
                    width = this.widthNumericBox.max;
                }
                var ratio = width / this.documentEditor.selection.imageFormat.width;
                var height = this.heightNumericBox.value * ratio;
                this.heightNumericBox.value = height;
                if (!(width === null || height === null)) {
                    this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
        };
        ImageProperties.prototype.applyImageHeight = function () {
            if (!this.isMaintainAspectRatio) {
                var width = this.widthNumericBox.value;
                var height = this.heightNumericBox.value;
                if (!(width === null || height === null)) {
                    this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
            else if (this.isMaintainAspectRatio) {
                var height = this.heightNumericBox.value;
                var ratio = height / this.documentEditor.selection.imageFormat.height;
                var width = this.widthNumericBox.value * ratio;
                this.widthNumericBox.value = width;
                if (!(width === null || height === null)) {
                    this.documentEditor.selection.imageFormat.resize(width, height);
                }
            }
        };
        ImageProperties.prototype.onAspectRatioBtnClick = function () {
            if (this.isMaintainAspectRatio) {
                this.isMaintainAspectRatio = false;
            }
            else {
                this.isMaintainAspectRatio = true;
            }
        };
        ImageProperties.prototype.showImageProperties = function (isShow) {
            if (this.element.style.display === 'block') {
                this.updateImageProperties();
            }
            if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
                return;
            }
            this.element.style.display = isShow ? 'block' : 'none';
            this.documentEditor.resize();
        };
        ImageProperties.prototype.updateImageProperties = function () {
            this.widthNumericBox.value = this.documentEditor.selection.imageFormat.width;
            this.heightNumericBox.value = this.documentEditor.selection.imageFormat.height;
            if (ej2_base_3.isNullOrUndefined(this.documentEditor.selection.imageFormat.alternateText)) {
                this.textArea.value = "";
            }
            else {
                this.textArea.value = this.documentEditor.selection.imageFormat.alternateText;
            }
        };
        ImageProperties.prototype.destroy = function () {
            this.container = undefined;
            if (this.widthNumericBox) {
                this.widthNumericBox.destroy();
            }
            this.widthNumericBox = undefined;
            if (this.heightNumericBox) {
                this.heightNumericBox.destroy();
            }
            this.heightNumericBox = undefined;
            if (this.aspectRatioBtn) {
                this.aspectRatioBtn.destroy();
            }
            this.aspectRatioBtn = undefined;
        };
        return ImageProperties;
    }());
    exports.ImageProperties = ImageProperties;
});
