define(["require", "exports", "@syncfusion/ej2-inputs", "@syncfusion/ej2-base", "@syncfusion/ej2-dropdowns", "../format/section-format"], function (require, exports, ej2_inputs_1, ej2_base_1, ej2_dropdowns_1, section_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotesDialog = (function () {
        function NotesDialog(documentHelper) {
            var _this = this;
            this.list = undefined;
            this.noteNumberFormat = undefined;
            this.sectionFormat = undefined;
            this.onCancelButtonClick = function () {
                _this.documentHelper.dialog.hide();
                _this.documentHelper.updateFocus();
                _this.unWireEventsAndBindings();
            };
            this.loadFontDialog = function () {
                _this.documentHelper.updateFocus();
                var format;
                var section;
                if (_this.sectionFormat) {
                    section = _this.sectionFormat;
                }
                else {
                    section = _this.documentHelper.owner.selection.sectionFormat;
                }
                if (_this.documentHelper.selection.isinFootnote) {
                    var footnotesFormat = section.footNoteNumberFormat;
                    var startAt = section.initialFootNoteNumber;
                    format = _this.reversetype(footnotesFormat);
                    _this.notesList.value = format;
                    _this.startValueTextBox.value = startAt;
                }
                else {
                    var endnotesFormat = section.endnoteNumberFormat;
                    format = _this.reversetype(endnotesFormat);
                    var startAt = section.initialEndNoteNumber;
                    _this.notesList.value = format;
                    _this.startValueTextBox.value = startAt;
                }
            };
            this.onInsertFootnoteClick = function () {
                var format = new section_format_1.WSectionFormat(undefined);
                if (!ej2_base_1.isNullOrUndefined(_this.notesList)) {
                    var formats = (_this.notesList.value).toString();
                    var renderFormat = _this.types(formats);
                    var startValue = _this.startValueTextBox.value;
                    if (!ej2_base_1.isNullOrUndefined(_this.notesList)) {
                        if (_this.documentHelper.selection.isinFootnote) {
                            format.footNoteNumberFormat = renderFormat;
                            format.initialFootNoteNumber = startValue;
                            _this.documentHelper.owner.editorModule.onApplySectionFormat(undefined, format);
                        }
                        else {
                            format.endnoteNumberFormat = renderFormat;
                            format.initialEndNoteNumber = startValue;
                            _this.documentHelper.owner.editorModule.onApplySectionFormat(undefined, format);
                        }
                    }
                }
                _this.documentHelper.hideDialog();
            };
            this.unWireEventsAndBindings = function () {
                _this.notesList.value = undefined;
            };
            this.documentHelper = documentHelper;
        }
        NotesDialog.prototype.getModuleName = function () {
            return 'FootNotesDialog';
        };
        NotesDialog.prototype.notesDialog = function (localValue, isRtl) {
            var idName = this.documentHelper.owner.containerId + '_insert_Footnote';
            this.target = ej2_base_1.createElement('div', { id: idName, className: 'e-de-insert-footnote' });
            var firstDiv = ej2_base_1.createElement('div');
            var startatValue = ej2_base_1.createElement('div');
            this.footCount = ej2_base_1.createElement('input', {
                attrs: { type: 'text' }, id: this.documentHelper.owner.containerId + 'row'
            });
            startatValue.appendChild(this.footCount);
            var numberFormatDiv = ej2_base_1.createElement('div', { className: 'e-de-container-row' });
            var formatType = ej2_base_1.createElement('select', {
                id: this.target.id + '_papersize', styles: 'padding-bottom: 20px;',
                innerHTML: '<option value="1, 2, 3, ...">' + localValue.getConstant('1, 2, 3, ...') +
                    '</option><option value="a, b, c, ...">' + localValue.getConstant('a, b, c, ...') +
                    '</option><option value="A, B, C, ...">' + localValue.getConstant('A, B, C, ...') +
                    '</option><option value="I, II, III, ...">' + localValue.getConstant('I, II, III, ...') +
                    '</option><option value="i, ii, iii, ...">' + localValue.getConstant('i, ii, iii, ...') + '</option>'
            });
            numberFormatDiv.appendChild(formatType);
            this.notesList = new ej2_dropdowns_1.DropDownList({
                enableRtl: isRtl, placeholder: localValue.getConstant('Start at'),
                floatLabelType: 'Always',
                htmlAttributes: { 'aria-labelledby': localValue.getConstant('Start at') }
            });
            this.notesList.appendTo(formatType);
            firstDiv.appendChild(numberFormatDiv);
            firstDiv.appendChild(startatValue);
            this.target.appendChild(firstDiv);
            this.startValueTextBox = new ej2_inputs_1.NumericTextBox({
                format: '#',
                min: 1,
                max: 99999,
                enablePersistence: false,
                placeholder: localValue.getConstant('Number format'),
                floatLabelType: 'Always'
            });
            this.startValueTextBox.appendTo(this.footCount);
            this.footCount.setAttribute('aria-labelledby', localValue.getConstant('Number format'));
        };
        NotesDialog.prototype.show = function () {
            var localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localValue.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.notesDialog(localValue);
            }
            if (this.documentHelper.selection.caret.style.display !== 'none') {
                this.documentHelper.selection.caret.style.display = 'none';
            }
            if (this.documentHelper.selection.isinFootnote) {
                this.documentHelper.dialog.header = localValue.getConstant('Footnote');
            }
            else {
                this.documentHelper.dialog.header = localValue.getConstant('Endnote');
            }
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.beforeOpen = this.loadFontDialog;
            this.documentHelper.dialog.buttons = [{
                    click: this.onInsertFootnoteClick,
                    buttonModel: { content: localValue.getConstant('Apply'), cssClass: 'e-flat e-table-ok', isPrimary: true }
                },
                {
                    click: this.onCancelButtonClick,
                    buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-table-cancel' }
                }];
            this.startValueTextBox.value = 1;
            this.documentHelper.dialog.close = this.documentHelper.updateFocus;
            this.documentHelper.dialog.dataBind();
            this.documentHelper.dialog.show();
            if (this.documentHelper.selection.isinEndnote) {
                var alignValue = this.endnoteListValue(this.list);
                this.notesList.index = alignValue;
            }
        };
        NotesDialog.prototype.types = function (type) {
            switch (type) {
                case '1, 2, 3, ...':
                    return 'Arabic';
                case 'A, B, C, ...':
                    return 'UpperCaseLetter';
                case 'a, b, c, ...':
                    return 'LowerCaseLetter';
                case 'I, II, III, ...':
                    return 'LowerCaseRoman';
                case 'i, ii, iii, ...':
                    return 'UpperCaseRoman';
                default:
                    return 'Arabic';
            }
        };
        NotesDialog.prototype.reversetype = function (type) {
            switch (type) {
                case 'Arabic':
                    return '1, 2, 3, ...';
                case 'UpperCaseLetter':
                    return 'A, B, C, ...';
                case 'LowerCaseLetter':
                    return 'a, b, c, ...';
                case 'UpperCaseRoman':
                    return 'I, II, III, ...';
                case 'LowerCaseRoman':
                    return 'i, ii, iii, ...';
                default:
                    return '1, 2, 3, ...';
            }
        };
        NotesDialog.prototype.endnoteListValue = function (listFocus) {
            var value;
            if (listFocus === 'A, B, C, ...') {
                value = 0;
            }
            else if (listFocus === '1, 2, 3, ...') {
                value = 1;
            }
            else if (listFocus === 'a, b, c, ...') {
                value = 2;
            }
            else {
                value = 3;
            }
            return value;
        };
        NotesDialog.prototype.destroy = function () {
            if (this.footCount) {
                if (this.footCount.parentElement) {
                    this.footCount.parentElement.removeChild(this.footCount);
                }
                this.footCount = undefined;
            }
            if (this.startValueTextBox) {
                this.startValueTextBox.destroy();
                this.startValueTextBox = undefined;
            }
            if (this.notesList) {
                this.notesList.destroy();
                this.notesList = undefined;
            }
            this.footCount = undefined;
            this.documentHelper = undefined;
        };
        return NotesDialog;
    }());
    exports.NotesDialog = NotesDialog;
});
