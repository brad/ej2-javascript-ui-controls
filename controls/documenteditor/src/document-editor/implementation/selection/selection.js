define(["require", "exports", "../viewer/page", "../editor/editor-helper", "./selection-format", "../index", "@syncfusion/ej2-base", "../../base/dictionary", "../../base/index", "../index", "../writer/html-export", "@syncfusion/ej2-popups", "./selection-helper", "@syncfusion/ej2-splitbuttons"], function (require, exports, page_1, editor_helper_1, selection_format_1, index_1, ej2_base_1, dictionary_1, index_2, index_3, html_export_1, ej2_popups_1, selection_helper_1, ej2_splitbuttons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Selection = (function () {
        function Selection(documentEditor) {
            var _this = this;
            this.upDownSelectionLength = 0;
            this.isSkipLayouting = false;
            this.isImageSelected = false;
            this.contextTypeInternal = undefined;
            this.caret = undefined;
            this.isRetrieveFormatting = false;
            this.skipFormatRetrieval = false;
            this.isModifyingSelectionInternally = false;
            this.isMoveDownOrMoveUp = false;
            this.isEndOffset = false;
            this.isViewPasteOptions = false;
            this.skipEditRangeRetrieval = false;
            this.selectedWidgets = undefined;
            this.isHighlightEditRegionIn = false;
            this.isHighlightFormFields = false;
            this.isHightlightEditRegionInternal = false;
            this.isCurrentUser = false;
            this.isHighlightNext = false;
            this.isWebLayout = false;
            this.editRegionHighlighters = undefined;
            this.formFieldHighlighters = undefined;
            this.isSelectList = false;
            this.previousSelectedFormField = undefined;
            this.isFormatUpdated = false;
            this.isCellPrevSelected = false;
            this.currentFormField = undefined;
            this.pasteOptions = function (event) {
                var locale = new ej2_base_1.L10n('documenteditor', _this.owner.defaultLocale);
                locale.setLocale(_this.owner.locale);
                if (event.item.text === locale.getConstant('Keep source formatting')) {
                    _this.owner.editor.applyPasteOptions('KeepSourceFormatting');
                }
                else if (event.item.text === locale.getConstant('Match destination formatting')) {
                    _this.owner.editor.applyPasteOptions('MergeWithExistingFormatting');
                }
                else if (event.item.text === locale.getConstant('NestTable')) {
                    _this.owner.editor.applyTablePasteOptions('NestTable');
                }
                else if (event.item.text === locale.getConstant('InsertAsRows')) {
                    _this.owner.editor.applyTablePasteOptions('InsertAsRows');
                }
                else if (event.item.text === locale.getConstant('InsertAsColumns')) {
                    _this.owner.editor.applyTablePasteOptions('InsertAsColumns');
                }
                else if (event.item.text === locale.getConstant('OverwriteCells')) {
                    _this.owner.editor.applyTablePasteOptions('OverwriteCells');
                }
                else {
                    _this.owner.editor.applyPasteOptions('KeepTextOnly');
                }
            };
            this.hideCaret = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.caret)) {
                    _this.caret.style.display = 'none';
                }
            };
            this.owner = documentEditor;
            this.documentHelper = this.owner.documentHelper;
            this.start = new selection_helper_1.TextPosition(this.owner);
            this.end = new selection_helper_1.TextPosition(this.owner);
            this.selectedWidgets = new dictionary_1.Dictionary();
            this.characterFormatIn = new selection_format_1.SelectionCharacterFormat(this);
            this.paragraphFormatIn = new selection_format_1.SelectionParagraphFormat(this, this.documentHelper);
            this.sectionFormatIn = new selection_format_1.SelectionSectionFormat(this);
            this.rowFormatIn = new selection_format_1.SelectionRowFormat(this);
            this.cellFormatIn = new selection_format_1.SelectionCellFormat(this);
            this.tableFormatIn = new selection_format_1.SelectionTableFormat(this);
            this.imageFormatInternal = new selection_format_1.SelectionImageFormat(this);
            this.editRangeCollection = [];
            this.editRegionHighlighters = new dictionary_1.Dictionary();
            this.formFieldHighlighters = new dictionary_1.Dictionary();
        }
        Object.defineProperty(Selection.prototype, "isHighlightEditRegion", {
            get: function () {
                return this.isHighlightEditRegionIn;
            },
            set: function (value) {
                this.isHighlightEditRegionIn = value;
                this.onHighlight();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "htmlWriter", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.htmlWriterIn)) {
                    this.htmlWriterIn = new html_export_1.HtmlExport();
                }
                return this.htmlWriterIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "start", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.owner) && !ej2_base_1.isNullOrUndefined(this.viewer)) {
                    if (ej2_base_1.isNullOrUndefined(this.startInternal)) {
                        this.startInternal = this.owner.documentStart;
                    }
                    return this.startInternal;
                }
                return undefined;
            },
            set: function (value) {
                this.startInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "characterFormat", {
            get: function () {
                return this.characterFormatIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "paragraphFormat", {
            get: function () {
                return this.paragraphFormatIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "sectionFormat", {
            get: function () {
                return this.sectionFormatIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "tableFormat", {
            get: function () {
                return this.tableFormatIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "cellFormat", {
            get: function () {
                return this.cellFormatIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "rowFormat", {
            get: function () {
                return this.rowFormatIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "imageFormat", {
            get: function () {
                return this.imageFormatInternal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "end", {
            get: function () {
                return this.endInternal;
            },
            set: function (value) {
                this.endInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "startPage", {
            get: function () {
                if (!this.owner.isDocumentLoaded || ej2_base_1.isNullOrUndefined(this.viewer)
                    || this.viewer instanceof index_1.WebLayoutViewer || ej2_base_1.isNullOrUndefined(this.documentHelper.selectionStartPage)) {
                    return 1;
                }
                return this.documentHelper.pages.indexOf(this.documentHelper.selectionStartPage) + 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "endPage", {
            get: function () {
                if (!this.owner.isDocumentLoaded || ej2_base_1.isNullOrUndefined(this.viewer)
                    || this.viewer instanceof index_1.WebLayoutViewer || ej2_base_1.isNullOrUndefined(this.documentHelper.selectionEndPage)) {
                    return 1;
                }
                return this.documentHelper.pages.indexOf(this.documentHelper.selectionEndPage) + 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "isForward", {
            get: function () {
                return this.start.isExistBefore(this.end);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "isinFootnote", {
            get: function () {
                var container = this.getContainerWidget(this.start.paragraph);
                if (container instanceof page_1.FootNoteWidget && container.footNoteType === 'Footnote') {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "isinEndnote", {
            get: function () {
                var container = this.getContainerWidget(this.start.paragraph);
                if (container instanceof page_1.FootNoteWidget && container.footNoteType === 'Endnote') {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "isEmpty", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.start)) {
                    return true;
                }
                return this.start.isAtSamePosition(this.end);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "startOffset", {
            get: function () {
                return this.getHierarchicalIndexByPosition(this.start);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "endOffset", {
            get: function () {
                return this.getHierarchicalIndexByPosition(this.end);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "isInShape", {
            get: function () {
                var container = this.start.paragraph.containerWidget;
                do {
                    if (container instanceof page_1.TextFrame) {
                        return true;
                    }
                    if (container) {
                        container = container.containerWidget;
                    }
                } while (container);
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "text", {
            get: function () {
                return this.getText(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "contextType", {
            get: function () {
                return this.contextTypeInternal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "bookmarks", {
            get: function () {
                return this.getSelBookmarks(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "sfdt", {
            get: function () {
                if (this.owner.editorModule && (this.start.offset !== this.end.offset)) {
                    return JSON.stringify(this.writeSfdt());
                }
                else {
                    return undefined;
                }
            },
            enumerable: true,
            configurable: true
        });
        Selection.prototype.getBookmarks = function (includeHidden) {
            return this.getSelBookmarks(includeHidden);
        };
        Object.defineProperty(Selection.prototype, "isCleared", {
            get: function () {
                return ej2_base_1.isNullOrUndefined(this.end);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Selection.prototype, "isInField", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.getHyperlinkField(true))) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Selection.prototype.getFieldInfo = function () {
            var field = this.getHyperlinkField(true);
            if (!ej2_base_1.isNullOrUndefined(field)) {
                var code = this.getFieldCode(field);
                var result = this.owner.editorModule.getFieldResultText(field);
                return {
                    code: code,
                    result: result
                };
            }
            return undefined;
        };
        Selection.prototype.getSelBookmarks = function (includeHidden) {
            var bookmarkCln = [];
            var bookmarks = this.documentHelper.bookmarks;
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            var bookmrkStart;
            var bookmrkEnd;
            var isCellSelected = false;
            var selectedCells = this.getSelectedCells();
            for (var i = 0; i < bookmarks.length; i++) {
                if (includeHidden || !includeHidden && bookmarks.keys[i].indexOf('_') !== 0) {
                    bookmrkStart = bookmarks.get(bookmarks.keys[i]);
                    bookmrkEnd = bookmrkStart.reference;
                    if (ej2_base_1.isNullOrUndefined(bookmrkEnd)) {
                        continue;
                    }
                    var bmStartPos = this.getElementPosition(bookmrkStart).startPosition;
                    var bmEndPos = this.getElementPosition(bookmrkEnd, true).startPosition;
                    if (bmStartPos.paragraph.isInsideTable || bmEndPos.paragraph.isInsideTable) {
                        if (selectedCells.length > 0) {
                            if (selectedCells.indexOf(bmStartPos.paragraph.associatedCell) >= 0
                                || selectedCells.indexOf(bmEndPos.paragraph.associatedCell) >= 0) {
                                isCellSelected = true;
                            }
                            else {
                                isCellSelected = false;
                                if (selectedCells.indexOf(bmStartPos.paragraph.associatedCell) < 0
                                    || selectedCells.indexOf(bmEndPos.paragraph.associatedCell) < 0) {
                                    var endCell = end.paragraph.isInsideTable && end.paragraph.associatedCell;
                                    var bmEndPosCell = bmEndPos.paragraph.associatedCell;
                                    if (endCell && bmEndPosCell && endCell.ownerTable.equals(bmEndPosCell.ownerTable) &&
                                        !(endCell.ownerTable
                                            && selectedCells.indexOf(this.getCellInTable(endCell.ownerTable, bmEndPosCell)) >= 0)) {
                                        continue;
                                    }
                                }
                            }
                        }
                        else {
                            isCellSelected = false;
                        }
                    }
                    else {
                        isCellSelected = false;
                    }
                    if ((start.isExistAfter(bmStartPos) || start.isAtSamePosition(bmStartPos))
                        && (end.isExistBefore(bmEndPos) || end.isAtSamePosition(bmEndPos)) ||
                        ((bmStartPos.isExistAfter(start) || bmStartPos.isAtSamePosition(start))
                            && (bmEndPos.isExistBefore(end) || bmEndPos.isAtSamePosition(end))) ||
                        (bmStartPos.isExistAfter(start) && bmStartPos.isExistBefore(end)
                            && (end.isExistAfter(bmEndPos) || end.isExistBefore(bmEndPos))) ||
                        (bmEndPos.isExistBefore(end) && bmEndPos.isExistAfter(start)
                            && (start.isExistBefore(bmStartPos) || start.isExistAfter(bmStartPos))) || isCellSelected) {
                        bookmarkCln.push(bookmrkStart.name);
                    }
                }
            }
            return bookmarkCln;
        };
        Object.defineProperty(Selection.prototype, "viewer", {
            get: function () {
                return this.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        Selection.prototype.getModuleName = function () {
            return 'Selection';
        };
        Selection.prototype.checkLayout = function () {
            if (this.owner.layoutType === 'Continuous') {
                this.isWebLayout = true;
                this.documentHelper.isHeaderFooter = true;
                this.owner.layoutType = 'Pages';
                this.owner.viewer.destroy();
                this.owner.viewer = new index_1.PageLayoutViewer(this.owner);
                this.owner.editor.layoutWholeDocument();
            }
        };
        Selection.prototype.goToHeader = function () {
            this.checkLayout();
            this.owner.enableHeaderAndFooter = true;
            this.enableHeadersFootersRegion(this.start.paragraph.bodyWidget.page.headerWidget, this.start.paragraph.bodyWidget.page);
            this.isWebLayout = false;
        };
        Selection.prototype.goToFooter = function () {
            this.checkLayout();
            this.owner.enableHeaderAndFooter = true;
            this.enableHeadersFootersRegion(this.start.paragraph.bodyWidget.page.footerWidget, this.start.paragraph.bodyWidget.page);
            this.isWebLayout = false;
        };
        Selection.prototype.closeHeaderFooter = function () {
            this.disableHeaderFooter();
            if (this.documentHelper.isHeaderFooter && this.owner.layoutType === 'Pages') {
                this.owner.layoutType = 'Continuous';
                this.documentHelper.isHeaderFooter = false;
            }
        };
        Selection.prototype.goToPage = function (pageNumber) {
            this.owner.scrollToPage(pageNumber);
            if (pageNumber >= 1 && pageNumber <= this.owner.documentHelper.pages.length) {
                var page = this.owner.documentHelper.pages[pageNumber - 1];
                this.updateTextPositionForBlockContainer(page.bodyWidgets[0]);
            }
        };
        Selection.prototype.selectTable = function () {
            if (!this.owner.enableSelection) {
                return;
            }
            this.selectTableInternal();
        };
        Selection.prototype.selectRow = function () {
            if (!this.owner.enableSelection) {
                return;
            }
            this.selectTableRow();
        };
        Selection.prototype.selectColumn = function () {
            if (!this.owner.enableSelection) {
                return;
            }
            this.selectColumnInternal();
        };
        Selection.prototype.selectCell = function () {
            if (!this.owner.enableSelection) {
                return;
            }
            this.selectTableCell();
        };
        Selection.prototype.select = function (selectionSettings, startOrEnd) {
            if (typeof (selectionSettings) === 'string') {
                var startPosition = this.getTextPosBasedOnLogicalIndex(selectionSettings);
                var endPosition = this.getTextPosBasedOnLogicalIndex(startOrEnd);
                this.selectPosition(startPosition, endPosition);
            }
            else {
                var point = new editor_helper_1.Point(selectionSettings.x, selectionSettings.y);
                var pageCoordinates = this.viewer.findFocusedPage(point, true);
                if (selectionSettings.extend) {
                    this.moveTextPosition(pageCoordinates, this.end);
                }
                else {
                    this.documentHelper.updateTextPositionForSelection(pageCoordinates, 1);
                }
            }
        };
        Selection.prototype.selectByHierarchicalIndex = function (start, end) {
            var startPosition = this.getTextPosBasedOnLogicalIndex(start);
            var endPosition = this.getTextPosBasedOnLogicalIndex(end);
            this.selectPosition(startPosition, endPosition);
        };
        Selection.prototype.selectField = function (fieldStart) {
            if (this.isInField || !ej2_base_1.isNullOrUndefined(fieldStart)) {
                if (ej2_base_1.isNullOrUndefined(fieldStart)) {
                    fieldStart = this.getHyperlinkField(true);
                }
                this.selectFieldInternal(fieldStart);
            }
        };
        Selection.prototype.selectFieldInternal = function (fieldStart, isKeyBoardEvent, isReplacingFormResult) {
            if (fieldStart) {
                var formFillingMode = this.documentHelper.isFormFillProtectedMode || isReplacingFormResult;
                var fieldEnd = fieldStart.fieldEnd;
                if (formFillingMode) {
                    fieldStart = fieldStart.fieldSeparator;
                }
                var offset = fieldStart.line.getOffset(fieldStart, formFillingMode ? 1 : 0);
                var startPosition = new selection_helper_1.TextPosition(this.owner);
                startPosition.setPositionParagraph(fieldStart.line, offset);
                var isBookmark = fieldStart.nextNode instanceof page_1.BookmarkElementBox;
                if (isBookmark && !formFillingMode && fieldStart.nextElement.reference) {
                    fieldEnd = fieldStart.nextElement.reference;
                }
                var endoffset = fieldEnd.line.getOffset(fieldEnd, formFillingMode ? 0 : 1);
                var endPosition = new selection_helper_1.TextPosition(this.owner);
                endPosition.setPositionParagraph(fieldEnd.line, endoffset);
                this.documentHelper.selection.selectRange(startPosition, endPosition);
                if (!isReplacingFormResult) {
                    this.triggerFormFillEvent(isKeyBoardEvent);
                }
            }
        };
        Selection.prototype.selectShape = function (shape) {
            if (shape) {
                var offset = shape.line.getOffset(shape, 0);
                var startPosition = new selection_helper_1.TextPosition(this.owner);
                startPosition.setPositionParagraph(shape.line, offset);
                var endoffset = shape.line.getOffset(shape, 1);
                var endPosition = new selection_helper_1.TextPosition(this.owner);
                endPosition.setPositionParagraph(shape.line, endoffset);
                this.documentHelper.selection.selectRange(startPosition, endPosition);
            }
        };
        Selection.prototype.toggleBold = function () {
            if (this.owner.editorModule) {
                this.owner.editorModule.toggleBold();
            }
        };
        Selection.prototype.toggleItalic = function () {
            if (this.owner.editorModule) {
                this.owner.editorModule.toggleItalic();
            }
        };
        Selection.prototype.toggleAllCaps = function () {
            if (this.owner.editorModule) {
                this.owner.editorModule.toggleAllCaps();
            }
        };
        Selection.prototype.toggleUnderline = function (underline) {
            if (this.owner.editor) {
                this.owner.editor.toggleUnderline(underline);
            }
        };
        Selection.prototype.toggleStrikethrough = function (strikethrough) {
            if (this.owner.editor) {
                this.owner.editor.toggleStrikethrough(strikethrough);
            }
        };
        Selection.prototype.toggleHighlightColor = function (highlightColor) {
            if (this.owner.editor) {
                this.owner.editor.toggleHighlightColor(highlightColor);
            }
        };
        Selection.prototype.toggleSubscript = function () {
            if (this.owner.editor) {
                this.owner.editor.toggleSubscript();
            }
        };
        Selection.prototype.toggleSuperscript = function () {
            if (this.owner.editor) {
                this.owner.editor.toggleSuperscript();
            }
        };
        Selection.prototype.toggleTextAlignment = function (textAlignment) {
            if (this.owner.editor) {
                this.owner.editor.toggleTextAlignment(textAlignment);
            }
        };
        Selection.prototype.increaseIndent = function () {
            if (this.owner.editor) {
                this.owner.editor.increaseIndent();
            }
        };
        Selection.prototype.decreaseIndent = function () {
            if (this.owner.editor) {
                this.owner.editor.decreaseIndent();
            }
        };
        Selection.prototype.navigateHyperlink = function () {
            var fieldBegin = this.getHyperlinkField();
            if (fieldBegin) {
                this.fireRequestNavigate(fieldBegin);
            }
        };
        Selection.prototype.fireRequestNavigate = function (fieldBegin) {
            var code = this.getFieldCode(fieldBegin);
            if (code.toLowerCase().indexOf('ref ') === 0 && !code.match('\\h')) {
                return;
            }
            var hyperlink = new selection_helper_1.Hyperlink(fieldBegin, this);
            var eventArgs = {
                isHandled: false,
                navigationLink: hyperlink.navigationLink,
                linkType: hyperlink.linkType,
                localReference: hyperlink.localReference,
                source: this.owner
            };
            this.owner.trigger(index_2.requestNavigateEvent, eventArgs);
            if (!eventArgs.isHandled) {
                this.documentHelper.selection.navigateBookmark(hyperlink.localReference, true);
            }
        };
        Selection.prototype.copyHyperlink = function () {
            var hyperLinkField = this.getHyperlinkField();
            var linkText = this.getLinkText(hyperLinkField, true);
            this.copyToClipboard(linkText);
        };
        Selection.prototype.isHideSelection = function (paragraph) {
            var bodyWgt = paragraph.bodyWidget;
            var sectionFormat = bodyWgt.sectionFormat;
            var pageHt = sectionFormat.pageHeight - sectionFormat.footerDistance;
            var headerFooterHt = bodyWgt.page.boundingRectangle.height / 100 * 40;
            return this.contextType.indexOf('Footer') >= 0
                && (paragraph.y + paragraph.height > editor_helper_1.HelperMethods.convertPointToPixel(pageHt))
                || this.contextType.indexOf('Header') >= 0 && paragraph.y + paragraph.height > headerFooterHt;
        };
        Selection.prototype.highlightSelection = function (isSelectionChanged, isBookmark) {
            if (this.owner.enableImageResizerMode) {
                this.owner.imageResizerModule.hideImageResizer();
            }
            if (this.isEmpty) {
                if (!this.isInShape && this.isHideSelection(this.start.paragraph)) {
                    this.hideCaret();
                    return;
                }
                if (this.isInShape) {
                    this.showResizerForShape();
                }
                this.updateCaretPosition();
            }
            else {
                if (this.isForward) {
                    this.highlightSelectedContent(this.start, this.end);
                }
                else {
                    this.highlightSelectedContent(this.end, this.start);
                }
                if (this.documentHelper.isComposingIME) {
                    this.updateCaretPosition();
                }
            }
            this.documentHelper.updateTouchMarkPosition();
            if (isSelectionChanged) {
                this.documentHelper.scrollToPosition(this.start, this.end, undefined, isBookmark);
            }
        };
        Selection.prototype.createHighlightBorder = function (lineWidget, width, left, top, isElementBoxHighlight) {
            if (width < 0) {
                width = 0;
            }
            var paragraph = lineWidget.paragraph;
            var floatingItems = [];
            if (paragraph.floatingElements.length > 0) {
                for (var k = 0; k < paragraph.floatingElements.length; k++) {
                    var shapeElement = paragraph.floatingElements[k];
                    if (shapeElement.line === lineWidget) {
                        var startTextPos = this.start;
                        var endTextPos = this.end;
                        if (!this.isForward) {
                            startTextPos = this.end;
                            endTextPos = this.start;
                        }
                        var offset = shapeElement.line.getOffset(shapeElement, 0);
                        if ((startTextPos.currentWidget !== lineWidget && endTextPos.currentWidget !== lineWidget) ||
                            (startTextPos.currentWidget === lineWidget && startTextPos.offset <= offset
                                && (endTextPos.currentWidget === lineWidget && endTextPos.offset >= offset + 1
                                    || endTextPos.currentWidget !== lineWidget)) || (startTextPos.currentWidget !== lineWidget
                            && endTextPos.currentWidget === lineWidget && endTextPos.offset >= offset)) {
                            floatingItems.push(shapeElement);
                        }
                    }
                }
            }
            var page = this.getPage(lineWidget.paragraph);
            var height = lineWidget.height;
            var widgets = this.selectedWidgets;
            var selectionWidget = undefined;
            var selectionWidgetCollection = undefined;
            if (this.isHightlightEditRegionInternal) {
                this.addEditRegionHighlight(lineWidget, left, width);
                return;
            }
            else if (this.isHighlightFormFields) {
                this.addFormFieldHighlight(lineWidget, left, width);
                return;
            }
            else {
                if (widgets.containsKey(lineWidget)) {
                    if (widgets.get(lineWidget) instanceof selection_helper_1.SelectionWidgetInfo) {
                        selectionWidget = widgets.get(lineWidget);
                        if (isElementBoxHighlight) {
                            widgets.remove(lineWidget);
                            selectionWidgetCollection = [];
                            widgets.add(lineWidget, selectionWidgetCollection);
                        }
                    }
                    else {
                        selectionWidgetCollection = widgets.get(lineWidget);
                    }
                }
                else {
                    if (isElementBoxHighlight) {
                        selectionWidgetCollection = [];
                        widgets.add(lineWidget, selectionWidgetCollection);
                    }
                    else {
                        var wrapPosition = this.getWrapPosition(lineWidget, paragraph);
                        if (wrapPosition.length > 0) {
                            var selectionWidgetInfos = this.splitSelectionHighlightPosition(left, width, wrapPosition);
                            if (selectionWidgetInfos.length > 0) {
                                selectionWidgetInfos[0].floatingItems = floatingItems;
                                widgets.add(lineWidget, selectionWidgetInfos);
                                this.renderHighlight(page, lineWidget, selectionWidgetInfos, top, floatingItems);
                                return;
                            }
                            else {
                                selectionWidget = new selection_helper_1.SelectionWidgetInfo(left, width);
                                selectionWidget.floatingItems = floatingItems;
                                widgets.add(lineWidget, selectionWidget);
                            }
                        }
                        else {
                            selectionWidget = new selection_helper_1.SelectionWidgetInfo(left, width);
                            selectionWidget.floatingItems = floatingItems;
                            widgets.add(lineWidget, selectionWidget);
                        }
                    }
                }
                if (selectionWidget === undefined) {
                    selectionWidget = new selection_helper_1.SelectionWidgetInfo(left, width);
                    selectionWidget.floatingItems = floatingItems;
                    widgets.add(lineWidget, selectionWidget);
                }
            }
            this.renderHighlight(page, lineWidget, [selectionWidget], top, floatingItems);
            if (isElementBoxHighlight) {
                selectionWidgetCollection.push(selectionWidget);
            }
        };
        Selection.prototype.renderHighlight = function (page, lineWidget, selectionWidget, top, floatingItems) {
            var documentHelper = this.owner.documentHelper;
            var pageTop = this.getPageTop(page);
            var pageLeft = page.boundingRectangle.x;
            var height = lineWidget.height;
            if (this.viewer.containerTop <= pageTop
                || pageTop < this.viewer.containerTop + documentHelper.selectionCanvas.height) {
                var zoomFactor = documentHelper.zoomFactor;
                this.clipSelection(page, pageTop);
                for (var i = 0; i < selectionWidget.length; i++) {
                    var selectedWidget = selectionWidget[i];
                    var left = selectedWidget.left;
                    var width = selectedWidget.width;
                    if (this.documentHelper.isComposingIME) {
                        this.renderDashLine(documentHelper.selectionContext, page, lineWidget, (pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, top, width * zoomFactor, height);
                    }
                    else {
                        this.documentHelper.selectionContext.fillStyle = 'gray';
                        documentHelper.selectionContext.globalAlpha = 0.4;
                        documentHelper.selectionContext.fillRect((pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, (pageTop + (top * zoomFactor)) - this.viewer.containerTop, width * zoomFactor, height * zoomFactor);
                    }
                }
                if (floatingItems.length > 0) {
                    for (var z = 0; z < floatingItems.length; z++) {
                        var left = floatingItems[z].x;
                        var shapeTop = floatingItems[z].y;
                        var shapeWidth = floatingItems[z].width;
                        var shapeHeight = floatingItems[z].height;
                        documentHelper.selectionContext.fillRect((pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, (pageTop + (shapeTop * zoomFactor)) - this.viewer.containerTop, shapeWidth * zoomFactor, shapeHeight * zoomFactor);
                    }
                }
                documentHelper.selectionContext.restore();
            }
        };
        Selection.prototype.getWrapPosition = function (lineWidget, paragraph) {
            var bodyWidget = paragraph.bodyWidget;
            if (!ej2_base_1.isNullOrUndefined(bodyWidget) && bodyWidget.floatingElements.length > 0 && lineWidget.children.length > 0) {
                var startLeft = this.getLeftInternal(lineWidget, lineWidget.children[0], 0);
                var width = 0;
                var wrapPos = [];
                var isStarted = false;
                for (var z = 0; z < lineWidget.children.length; z++) {
                    var element = lineWidget.children[z];
                    if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline') {
                        continue;
                    }
                    if (element.padding.left > 0) {
                        if (wrapPos.length === 1 && wrapPos[0].end === 0) {
                            wrapPos[0].end = wrapPos[0].start - paragraph.x;
                            wrapPos[0].start = paragraph.x;
                            startLeft = paragraph.x;
                        }
                        var clipInfo = {};
                        clipInfo.start = startLeft + width;
                        clipInfo.end = 0;
                        if (isStarted) {
                            clipInfo.end = startLeft + width + element.padding.left;
                        }
                        wrapPos.push(clipInfo);
                    }
                    width += element.padding.left + element.width;
                    if (element instanceof page_1.TextElementBox) {
                        isStarted = true;
                    }
                }
                if (wrapPos.length === 1 && wrapPos[0].end === 0) {
                    wrapPos[0].end = wrapPos[0].start - paragraph.x;
                    wrapPos[0].start = paragraph.x;
                }
                return wrapPos;
            }
            return [];
        };
        Selection.prototype.splitSelectionHighlightPosition = function (left, width, clipInfo) {
            var selectedWidget = [];
            for (var m = 0; m < clipInfo.length; m++) {
                var info = clipInfo[m];
                if ((left < info.start && left + width < info.end) || left > (info.end)) {
                    continue;
                }
                if (left < info.start && left + width > info.end) {
                    selectedWidget.push(new selection_helper_1.SelectionWidgetInfo(left, info.start - left));
                    width = (left + width) - info.end;
                    left = info.end;
                }
                else if (left === info.start) {
                    left += info.end;
                    width = width - info.end;
                }
                if (m === clipInfo.length - 1) {
                    selectedWidget.push(new selection_helper_1.SelectionWidgetInfo(left, width));
                }
            }
            return selectedWidget;
        };
        Selection.prototype.addEditRegionHighlight = function (lineWidget, left, width) {
            var highlighters = undefined;
            var collection = this.editRegionHighlighters;
            if (collection.containsKey(lineWidget)) {
                highlighters = collection.get(lineWidget);
            }
            else {
                highlighters = [];
                collection.add(lineWidget, highlighters);
            }
            var editRegionHighlight = new selection_helper_1.SelectionWidgetInfo(left, width);
            if (this.isCurrentUser) {
                editRegionHighlight.color = this.owner.userColor !== '' ? this.owner.userColor : '#FFFF00';
            }
            highlighters.push(editRegionHighlight);
            return editRegionHighlight;
        };
        Selection.prototype.addFormFieldHighlight = function (lineWidget, left, width) {
            var highlighters = undefined;
            var collection = this.formFieldHighlighters;
            if (collection.containsKey(lineWidget)) {
                highlighters = collection.get(lineWidget);
            }
            else {
                highlighters = [];
                collection.add(lineWidget, highlighters);
            }
            var formFieldHighlight = new selection_helper_1.SelectionWidgetInfo(left, width);
            highlighters.push(formFieldHighlight);
        };
        Selection.prototype.createHighlightBorderInsideTable = function (cellWidget) {
            var page = this.getPage(cellWidget);
            var selectionWidget = undefined;
            var left = cellWidget.x - cellWidget.margin.left + cellWidget.leftBorderWidth;
            var width = cellWidget.width + cellWidget.margin.left
                + cellWidget.margin.right - cellWidget.leftBorderWidth - cellWidget.rightBorderWidth;
            var top = cellWidget.y;
            var height = cellWidget.height;
            var pageTop = this.getPageTop(page);
            var pageLeft = page.boundingRectangle.x;
            var isVisiblePage = this.documentHelper.isPageInVisibleBound(page, pageTop);
            var widgets = this.selectedWidgets;
            if (!this.isHightlightEditRegionInternal && !this.isHighlightFormFields) {
                if (widgets.containsKey(cellWidget) && widgets.get(cellWidget) instanceof selection_helper_1.SelectionWidgetInfo) {
                    selectionWidget = widgets.get(cellWidget);
                    if (isVisiblePage) {
                        this.documentHelper.selectionContext.clearRect((pageLeft + (selectionWidget.left * this.documentHelper.zoomFactor) - this.viewer.containerLeft), (pageTop + (top * this.documentHelper.zoomFactor)) - this.viewer.containerTop, selectionWidget.width * this.documentHelper.zoomFactor, height * this.documentHelper.zoomFactor);
                    }
                }
                else {
                    selectionWidget = new selection_helper_1.SelectionWidgetInfo(left, width);
                    if (widgets.containsKey(cellWidget)) {
                        widgets.remove(widgets.get(cellWidget));
                    }
                    widgets.add(cellWidget, selectionWidget);
                }
            }
            if (isVisiblePage) {
                this.documentHelper.selectionContext.fillStyle = 'gray';
                this.documentHelper.selectionContext.globalAlpha = 0.4;
                var zoomFactor = this.documentHelper.zoomFactor;
                this.clipSelection(page, pageTop);
                this.documentHelper.selectionContext.fillRect((pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, (pageTop + (top * zoomFactor)) - this.viewer.containerTop, width * zoomFactor, height * zoomFactor);
                this.documentHelper.selectionContext.restore();
            }
        };
        Selection.prototype.clipSelection = function (page, pageTop) {
            var documentHelper = this.owner.documentHelper;
            var width;
            var height;
            if (this.viewer instanceof index_1.WebLayoutViewer && this.documentHelper.zoomFactor < 1) {
                width = page.boundingRectangle.width / this.documentHelper.zoomFactor;
                height = page.boundingRectangle.height / this.documentHelper.zoomFactor;
            }
            else {
                width = page.boundingRectangle.width * this.documentHelper.zoomFactor;
                height = page.boundingRectangle.height * this.documentHelper.zoomFactor;
            }
            var left = page.boundingRectangle.x;
            documentHelper.selectionContext.beginPath();
            documentHelper.selectionContext.save();
            documentHelper.selectionContext.rect(left - this.viewer.containerLeft, pageTop - this.viewer.containerTop, width, height);
            documentHelper.selectionContext.clip();
        };
        Selection.prototype.addSelectionHighlight = function (canvasContext, widget, top, page) {
            if (this.selectedWidgets.containsKey(widget)) {
                var height = this.documentHelper.render.getScaledValue(widget.height);
                var widgetInfo = this.selectedWidgets.get(widget);
                var widgetInfoCollection = undefined;
                if (widgetInfo instanceof selection_helper_1.SelectionWidgetInfo) {
                    widgetInfoCollection = [];
                    widgetInfoCollection.push(widgetInfo);
                }
                else {
                    widgetInfoCollection = widgetInfo;
                }
                if (!ej2_base_1.isNullOrUndefined(widgetInfoCollection)) {
                    for (var i = 0; i < widgetInfoCollection.length; i++) {
                        var selectedWidgetInfo = widgetInfoCollection[i];
                        var width = this.documentHelper.render.getScaledValue(widgetInfoCollection[i].width);
                        var left = this.documentHelper.render.getScaledValue(widgetInfoCollection[i].left, 1);
                        if (ej2_base_1.isNullOrUndefined(page)) {
                            page = this.owner.selection.getPage(widget.paragraph);
                        }
                        this.owner.selection.clipSelection(page, this.owner.selection.getPageTop(page));
                        if (this.documentHelper.isComposingIME) {
                            this.renderDashLine(canvasContext, page, widget, left, top, width, height);
                        }
                        else {
                            canvasContext.globalAlpha = 0.4;
                            canvasContext.fillStyle = 'gray';
                            canvasContext.fillRect(left, this.documentHelper.render.getScaledValue(top, 2), width, height);
                            if (selectedWidgetInfo.floatingItems && selectedWidgetInfo.floatingItems.length > 0) {
                                for (var j = 0; j < selectedWidgetInfo.floatingItems.length; j++) {
                                    var shape = selectedWidgetInfo.floatingItems[j];
                                    width = this.documentHelper.render.getScaledValue(shape.width);
                                    left = this.documentHelper.render.getScaledValue(shape.x, 1);
                                    var shapeTop = this.documentHelper.render.getScaledValue(shape.y, 2);
                                    canvasContext.fillRect(left, shapeTop, width, this.documentHelper.render.getScaledValue(shape.height));
                                }
                            }
                        }
                        canvasContext.restore();
                    }
                }
            }
        };
        Selection.prototype.renderDashLine = function (ctx, page, widget, left, top, width, height) {
            var fontColor = this.characterFormat.fontColor;
            var fillColor = fontColor ? editor_helper_1.HelperMethods.getColor(fontColor) : '#000000';
            ctx.globalAlpha = 1;
            var format = this.owner.editor.copyInsertFormat(new index_3.WCharacterFormat(), false);
            var heightInfo = this.documentHelper.textHelper.getHeight(format);
            var pageTop = this.getPageTop(page);
            var descent = heightInfo.Height - heightInfo.BaselineOffset;
            top = this.documentHelper.render.getUnderlineYPosition(widget) + top + 4 - descent;
            this.documentHelper.render.renderDashLine(ctx, left, (pageTop - this.viewer.containerTop) + (top * this.documentHelper.zoomFactor), width, fillColor, true);
        };
        Selection.prototype.addSelectionHighlightTable = function (canvasContext, tableCellWidget, page) {
            if (this.selectedWidgets.containsKey(tableCellWidget)) {
                var selectedWidgetInfo = this.selectedWidgets.get(tableCellWidget);
                var selectedWidgetInfoCollection = undefined;
                if (selectedWidgetInfo instanceof selection_helper_1.SelectionWidgetInfo) {
                    selectedWidgetInfoCollection = [];
                    selectedWidgetInfoCollection.push(selectedWidgetInfo);
                }
                else {
                    selectedWidgetInfoCollection = selectedWidgetInfo;
                }
                if (!ej2_base_1.isNullOrUndefined(selectedWidgetInfoCollection)) {
                    for (var i = 0; i < selectedWidgetInfoCollection.length; i++) {
                        var left = this.documentHelper.render.getScaledValue(selectedWidgetInfoCollection[i].left, 1);
                        var top_1 = this.documentHelper.render.getScaledValue(tableCellWidget.y, 2);
                        var width = this.documentHelper.render.getScaledValue(selectedWidgetInfoCollection[i].width);
                        var height = this.documentHelper.render.getScaledValue(tableCellWidget.height);
                        canvasContext.fillStyle = 'gray';
                        if (ej2_base_1.isNullOrUndefined(page)) {
                            page = this.owner.selection.getPage(tableCellWidget);
                        }
                        this.owner.selection.clipSelection(page, this.owner.selection.getPageTop(page));
                        canvasContext.fillRect(left, top_1, width, height);
                        canvasContext.restore();
                    }
                }
            }
        };
        Selection.prototype.removeSelectionHighlight = function (widget) {
            var left = 0;
            var top = 0;
            var width = 0;
            var height = 0;
            var page = undefined;
            if (widget instanceof page_1.LineWidget) {
                var lineWidget = widget;
                var currentParaWidget = lineWidget.paragraph;
                page = !ej2_base_1.isNullOrUndefined(currentParaWidget) ?
                    this.getPage((lineWidget.paragraph)) : undefined;
                if (ej2_base_1.isNullOrUndefined(page)) {
                    return;
                }
                top = this.getTop(lineWidget);
                height = lineWidget.height;
            }
            else if (widget instanceof page_1.TableCellWidget) {
                page = !ej2_base_1.isNullOrUndefined(widget) ?
                    this.getPage(widget) : undefined;
                if (ej2_base_1.isNullOrUndefined(page)) {
                    return;
                }
                top = widget.y;
                height = widget.height;
            }
            if (ej2_base_1.isNullOrUndefined(page)) {
                return;
            }
            var selectedWidget = this.selectedWidgets.get(widget);
            var selectedWidgetCollection = undefined;
            if (selectedWidget instanceof selection_helper_1.SelectionWidgetInfo) {
                selectedWidgetCollection = [];
                selectedWidgetCollection.push(selectedWidget);
            }
            else {
                selectedWidgetCollection = selectedWidget;
            }
            if (!ej2_base_1.isNullOrUndefined(selectedWidgetCollection)) {
                for (var i = 0; i < selectedWidgetCollection.length; i++) {
                    width = selectedWidgetCollection[i].width;
                    left = selectedWidgetCollection[i].left;
                    var pageRect = page.boundingRectangle;
                    var pageIndex = this.documentHelper.pages.indexOf(page);
                    var pageGap = this.viewer.pageGap;
                    var pageTop = (pageRect.y - pageGap * (pageIndex + 1)) * this.documentHelper.zoomFactor + pageGap * (pageIndex + 1);
                    var pageLeft = pageRect.x;
                    var zoomFactor = this.documentHelper.zoomFactor;
                    if (this.viewer.containerTop <= pageTop
                        || pageTop < this.viewer.containerTop + this.documentHelper.selectionCanvas.height) {
                        this.documentHelper.selectionContext.clearRect((pageLeft + (left * zoomFactor) - this.viewer.containerLeft) - 0.5, (pageTop + (top * zoomFactor)) - this.viewer.containerTop - 0.5, width * zoomFactor + 0.5, height * zoomFactor + 0.5);
                    }
                }
            }
        };
        Selection.prototype.selectCurrentWord = function (excludeSpace) {
            var startPosition = this.start.clone();
            var endPosition = this.end.clone();
            this.selectCurrentWordRange(startPosition, endPosition, excludeSpace ? excludeSpace : false);
            this.selectRange(startPosition, endPosition);
        };
        Selection.prototype.selectParagraph = function () {
            if (!ej2_base_1.isNullOrUndefined(this.start)) {
                this.start.paragraphStartInternal(this, false);
                this.end.moveToParagraphEndInternal(this, false);
                this.upDownSelectionLength = this.end.location.x;
                this.fireSelectionChanged(true);
            }
        };
        Selection.prototype.selectLine = function () {
            if (!ej2_base_1.isNullOrUndefined(this.start)) {
                this.moveToLineStart();
                this.handleShiftEndKey();
            }
        };
        Selection.prototype.moveToDocumentStart = function () {
            this.handleControlHomeKey();
        };
        Selection.prototype.moveToDocumentEnd = function () {
            this.handleControlEndKey();
        };
        Selection.prototype.moveToParagraphStart = function () {
            if (this.isForward) {
                this.start.paragraphStartInternal(this, false);
                this.end.setPositionInternal(this.start);
                this.upDownSelectionLength = this.end.location.x;
            }
            else {
                this.end.paragraphStartInternal(this, false);
                this.start.setPositionInternal(this.end);
                this.upDownSelectionLength = this.start.location.x;
            }
            this.fireSelectionChanged(true);
        };
        Selection.prototype.moveToParagraphEnd = function () {
            if (this.isForward) {
                this.start.moveToParagraphEndInternal(this, false);
                this.end.setPositionInternal(this.start);
                this.upDownSelectionLength = this.end.location.x;
            }
            else {
                this.end.moveToParagraphEndInternal(this, false);
                this.start.setPositionInternal(this.end);
                this.upDownSelectionLength = this.start.location.x;
            }
            this.fireSelectionChanged(true);
        };
        Selection.prototype.moveToNextLine = function () {
            this.moveDown();
        };
        Selection.prototype.moveToPreviousLine = function () {
            this.moveUp();
        };
        Selection.prototype.moveToNextCharacter = function () {
            this.handleRightKey();
        };
        Selection.prototype.moveToPreviousCharacter = function () {
            this.handleLeftKey();
        };
        Selection.prototype.selectCurrentWordRange = function (startPosition, endPosition, excludeSpace) {
            if (!ej2_base_1.isNullOrUndefined(startPosition)) {
                if (startPosition.offset > 0) {
                    var wordStart = startPosition.clone();
                    var indexInInline = 0;
                    var inlineObj = startPosition.currentWidget.getInline(startPosition.offset, indexInInline);
                    var inline = inlineObj.element;
                    indexInInline = inlineObj.index;
                    if (!ej2_base_1.isNullOrUndefined(inline) && inline instanceof page_1.FieldElementBox && inline.fieldType === 1) {
                        if (startPosition.offset > 2 && (!ej2_base_1.isNullOrUndefined(inline.fieldSeparator) || ej2_base_1.isNullOrUndefined(inline.fieldBegin))) {
                            wordStart.setPositionParagraph(wordStart.currentWidget, startPosition.offset - 2);
                            wordStart.moveToWordEndInternal(0, false);
                            if (!(wordStart.paragraph === startPosition.paragraph && wordStart.offset === startPosition.offset - 1)) {
                                startPosition.moveToWordStartInternal(2);
                            }
                        }
                        else if (startPosition.offset > 3 && ej2_base_1.isNullOrUndefined(inline.fieldSeparator)) {
                            wordStart.setPositionParagraph(wordStart.currentWidget, startPosition.offset - 3);
                            wordStart.moveToWordEndInternal(0, false);
                            if (!(wordStart.paragraph === startPosition.paragraph && wordStart.offset === startPosition.offset)) {
                                startPosition.moveToWordStartInternal(2);
                            }
                        }
                    }
                    else {
                        wordStart.setPositionParagraph(wordStart.currentWidget, startPosition.offset - 1);
                        wordStart.moveToWordEndInternal(0, false);
                        if (!(wordStart.paragraph === startPosition.paragraph && wordStart.offset === startPosition.offset)) {
                            startPosition.moveToWordStartInternal(2);
                        }
                    }
                }
                endPosition.moveToWordEndInternal(2, excludeSpace);
            }
        };
        Selection.prototype.extendToParagraphStart = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.paragraphStartInternal(this, true);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendToParagraphEnd = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.moveToParagraphEndInternal(this, true);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.moveNextPosition = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            if (this.isEmpty) {
                this.start.moveNextPosition();
                this.end.setPositionInternal(this.start);
            }
            this.updateForwardSelection();
            this.upDownSelectionLength = this.start.location.x;
            this.fireSelectionChanged(true);
            if (this.documentHelper.isFormFillProtectedMode) {
                var formField = this.getCurrentFormField();
                if (!formField) {
                    formField = this.getFormFieldInFormFillMode();
                    this.selectPrevNextFormField(true, formField);
                }
            }
        };
        Selection.prototype.moveToNextParagraph = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.moveToNextParagraphStartInternal();
            this.start.setPositionInternal(this.end);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.nextFootnote = function () {
            if (this.isinFootnote) {
                var footNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
                var colLength = this.documentHelper.footnoteCollection.length;
                var indexCount = this.documentHelper.footnoteCollection.indexOf(footNoteElement);
                var nextFootnoteElement = this.documentHelper.footnoteCollection[indexCount + 1];
                if (ej2_base_1.isNullOrUndefined(nextFootnoteElement)) {
                    nextFootnoteElement = footNoteElement;
                }
                var start = this.start.clone();
                var end = this.end.clone();
                for (var i = 0; i < this.documentHelper.pages.length; i++) {
                    var referenceElement = this.documentHelper.pages[i].footnoteWidget;
                    for (var j = 1; j < referenceElement.bodyWidgets.length; j++) {
                        var element = (referenceElement.bodyWidgets[j]).footNoteReference;
                        if (element === nextFootnoteElement) {
                            start.setPositionParagraph(referenceElement.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                            end.setPositionInternal(start);
                            this.selectRange(start, end);
                        }
                    }
                }
            }
        };
        Selection.prototype.previousFootnote = function () {
            if (this.isinFootnote) {
                var footNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
                var colLength = this.documentHelper.footnoteCollection.length;
                var indexCount = this.documentHelper.footnoteCollection.indexOf(footNoteElement);
                var previousFootnote = this.documentHelper.footnoteCollection[indexCount - 1];
                if (ej2_base_1.isNullOrUndefined(previousFootnote)) {
                    previousFootnote = footNoteElement;
                }
                var startPosition = this.start.clone();
                var endPosition = this.end.clone();
                for (var i = 0; i < this.documentHelper.pages.length; i++) {
                    var footnote = this.documentHelper.pages[i].footnoteWidget;
                    for (var j = 1; j < footnote.bodyWidgets.length; j++) {
                        var element = (footnote.bodyWidgets[j]).footNoteReference;
                        if (element === previousFootnote) {
                            startPosition.setPositionParagraph(footnote.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                            endPosition.setPositionInternal(startPosition);
                            this.selectRange(startPosition, endPosition);
                        }
                    }
                }
            }
        };
        Selection.prototype.nextEndnote = function () {
            if (this.isinEndnote) {
                var endNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
                var indexCount = this.documentHelper.endnoteCollection.indexOf(endNoteElement);
                var nextEndnote = this.documentHelper.endnoteCollection[indexCount + 1];
                if (ej2_base_1.isNullOrUndefined(nextEndnote)) {
                    nextEndnote = endNoteElement;
                }
                var startPosition = this.start.clone();
                var endPosition = this.end.clone();
                var endnoteElement = this.documentHelper.pages[this.endPage - 1].endnoteWidget;
                for (var j = 0; j < endnoteElement.childWidgets.length; j++) {
                    var element = (endnoteElement.bodyWidgets[j]).footNoteReference;
                    if (element === nextEndnote) {
                        startPosition.setPositionParagraph(endnoteElement.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                        endPosition.setPositionInternal(startPosition);
                        this.selectRange(startPosition, endPosition);
                    }
                }
            }
        };
        Selection.prototype.previousEndnote = function () {
            if (this.isinEndnote) {
                var endNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
                var indexCount = this.documentHelper.endnoteCollection.indexOf(endNoteElement);
                var inline = this.documentHelper.endnoteCollection[indexCount - 1];
                if (ej2_base_1.isNullOrUndefined(inline)) {
                    inline = endNoteElement;
                }
                var startPosition = this.start.clone();
                var endPosition = this.end.clone();
                var referenceElement = this.documentHelper.pages[this.endPage - 1].endnoteWidget;
                for (var j = 0; j < referenceElement.childWidgets.length; j++) {
                    var element = (referenceElement.bodyWidgets[j]).footNoteReference;
                    if (element === inline) {
                        startPosition.setPositionParagraph(referenceElement.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                        endPosition.setPositionInternal(startPosition);
                        this.selectRange(startPosition, endPosition);
                    }
                }
            }
        };
        Selection.prototype.movePreviousPosition = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            if (this.isEmpty) {
                this.start.movePreviousPosition();
                this.end.setPositionInternal(this.start);
            }
            this.updateBackwardSelection();
            this.upDownSelectionLength = this.start.location.x;
            this.fireSelectionChanged(true);
            if (this.documentHelper.isFormFillProtectedMode) {
                var formField = this.getCurrentFormField();
                if (!formField) {
                    formField = this.getFormFieldInFormFillMode();
                    this.selectPrevNextFormField(false, formField);
                }
            }
        };
        Selection.prototype.moveToPreviousParagraph = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.moveToPreviousParagraph(this);
            this.start.setPositionInternal(this.end);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendToPreviousLine = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.moveToPreviousLine(this, this.upDownSelectionLength);
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendToLineEnd = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.moveToLineEndInternal(this, true);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendToLineStart = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.moveToLineStartInternal(this, true);
            this.upDownSelectionLength = this.end.location.x;
            if (this.start.paragraph === this.end.paragraph && this.start.offset === this.start.currentWidget.getEndOffset()
                && this.isParagraphLastLine(this.start.currentWidget) && this.isParagraphFirstLine(this.end.currentWidget)) {
                this.start.setPositionParagraph(this.start.currentWidget, this.start.offset + 1);
            }
            this.fireSelectionChanged(true);
        };
        Selection.prototype.moveUp = function () {
            if (this.documentHelper.isFormFillProtectedMode) {
                this.selectPrevNextFormField(false);
                return;
            }
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            if (!this.isEmpty) {
                if (this.isForward) {
                    this.end.setPositionInternal(this.start);
                }
                else {
                    this.start.setPositionInternal(this.end);
                }
                this.upDownSelectionLength = this.start.location.x;
            }
            this.upDownSelectionLength = this.start.location.x;
            var beforeUp = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
            var isMultiColumn = this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 ? true : false;
            var beforeIndex = this.start.currentWidget.paragraph.bodyWidget.index;
            this.start.moveUp(this, this.upDownSelectionLength);
            isMultiColumn = this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 ? true : false;
            var afterUp = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
            if (isMultiColumn) {
                if (beforeUp === afterUp || beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1) {
                    this.end.setPositionInternal(this.start);
                }
                else {
                    do {
                        if (ej2_base_1.isNullOrUndefined(this.start.currentWidget.paragraph.previousRenderedWidget) || (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1)) {
                            break;
                        }
                        if (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 && beforeUp > this.start.currentWidget.paragraph.bodyWidget.columnIndex) {
                            break;
                        }
                        this.start.moveUp(this, this.upDownSelectionLength);
                    } while (beforeUp !== this.start.currentWidget.paragraph.bodyWidget.columnIndex);
                }
            }
            this.end.setPositionInternal(this.start);
            this.fireSelectionChanged(true);
        };
        Selection.prototype.moveDown = function () {
            if (this.documentHelper.isFormFillProtectedMode) {
                this.selectPrevNextFormField(true);
                return;
            }
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            if (!this.isEmpty) {
                if (this.isForward) {
                    this.start.setPositionInternal(this.end);
                }
                else {
                    this.end.setPositionInternal(this.start);
                }
                this.upDownSelectionLength = this.start.location.x;
            }
            this.upDownSelectionLength = this.start.location.x;
            var beforeDown = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
            var beforeIndex = this.start.currentWidget.paragraph.bodyWidget.index;
            var isMultiColumn = this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 ? true : false;
            this.start.moveDown(this, this.upDownSelectionLength);
            var afterDown = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
            if (isMultiColumn) {
                if (beforeDown === afterDown || beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1) {
                    this.end.setPositionInternal(this.start);
                }
                else {
                    do {
                        if (ej2_base_1.isNullOrUndefined(this.start.currentWidget.paragraph.nextRenderedWidget) || (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1)) {
                            break;
                        }
                        if (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 && this.documentHelper.layout.getBodyWidget(this.start.currentWidget.paragraph.bodyWidget, false) === this.start.currentWidget.paragraph.bodyWidget) {
                            break;
                        }
                        this.start.moveDown(this, this.upDownSelectionLength);
                    } while (beforeDown !== this.start.currentWidget.paragraph.bodyWidget.columnIndex);
                }
            }
            this.end.setPositionInternal(this.start);
            this.fireSelectionChanged(true);
        };
        Selection.prototype.updateForwardSelection = function () {
            if (!this.isEmpty) {
                if (this.isForward) {
                    this.start.setPositionInternal(this.end);
                }
                else {
                    this.end.setPositionInternal(this.start);
                }
            }
        };
        Selection.prototype.updateBackwardSelection = function () {
            if (!this.isEmpty) {
                if (this.isForward) {
                    this.end.setPositionInternal(this.start);
                }
                else {
                    this.start.setPositionInternal(this.end);
                }
            }
        };
        Selection.prototype.getFirstBlockInFirstCell = function (table) {
            if (table.childWidgets.length > 0) {
                var firstrow = table.childWidgets[0];
                if (firstrow.childWidgets.length > 0) {
                    var firstcell = firstrow.childWidgets[0];
                    if (firstcell.childWidgets.length === 0) {
                        return undefined;
                    }
                    return firstcell.childWidgets[0];
                }
            }
            return undefined;
        };
        Selection.prototype.getFirstCellInRegion = function (row, startCell, selectionLength, isMovePrevious) {
            var cellStart = this.getCellLeft(row, startCell);
            var cellEnd = cellStart + startCell.cellFormat.cellWidth;
            var flag = true;
            if (cellStart <= selectionLength && selectionLength < cellEnd) {
                for (var k = 0; k < row.childWidgets.length; k++) {
                    var left = this.getCellLeft(row, row.childWidgets[k]);
                    if (editor_helper_1.HelperMethods.round(cellStart, 2) <= editor_helper_1.HelperMethods.round(left, 2) &&
                        editor_helper_1.HelperMethods.round(left, 2) < editor_helper_1.HelperMethods.round(cellEnd, 2)) {
                        flag = false;
                        return row.childWidgets[k];
                    }
                }
            }
            else {
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cellLeft = this.getCellLeft(row, row.childWidgets[j]);
                    if (cellLeft <= selectionLength && cellLeft +
                        row.childWidgets[j].cellFormat.cellWidth > selectionLength) {
                        flag = false;
                        return row.childWidgets[j];
                    }
                }
            }
            if (flag) {
                if (!ej2_base_1.isNullOrUndefined(row.previousRenderedWidget) && isMovePrevious) {
                    var previousWidget = row.previousRenderedWidget;
                    return this.getFirstCellInRegion(previousWidget, startCell, selectionLength, isMovePrevious);
                }
                else if (!ej2_base_1.isNullOrUndefined(row.nextRenderedWidget) && !isMovePrevious) {
                    return this.getFirstCellInRegion(row.nextRenderedWidget, startCell, selectionLength, isMovePrevious);
                }
            }
            return row.childWidgets[0];
        };
        Selection.prototype.getFirstParagraph = function (tableCell) {
            while (tableCell.previousSplitWidget) {
                tableCell = tableCell.previousSplitWidget;
            }
            var firstBlock = tableCell.firstChild;
            return this.documentHelper.getFirstParagraphBlock(firstBlock);
        };
        Selection.prototype.getLastBlockInLastCell = function (table) {
            if (table.childWidgets.length > 0) {
                var lastRow = table.childWidgets[table.childWidgets.length - 1];
                var lastCell = lastRow.childWidgets[lastRow.childWidgets.length - 1];
                while (lastCell.childWidgets.length === 0 && !ej2_base_1.isNullOrUndefined(lastCell.previousSplitWidget)) {
                    lastCell = lastCell.previousSplitWidget;
                }
                return lastCell.childWidgets[lastCell.childWidgets.length - 1];
            }
            return undefined;
        };
        Selection.prototype.moveToLineStart = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.updateBackwardSelection();
            this.start.moveToLineStartInternal(this, false);
            this.end.setPositionInternal(this.start);
            this.upDownSelectionLength = this.start.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.moveToLineEnd = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.updateForwardSelection();
            this.start.moveToLineEndInternal(this, false);
            this.end.setPositionInternal(this.start);
            this.upDownSelectionLength = this.start.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.getPageTop = function (page) {
            return (page.boundingRectangle.y - this.viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1)) * this.documentHelper.zoomFactor + this.viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1);
        };
        Selection.prototype.moveTextPosition = function (cursorPoint, textPosition, isMouseLeave) {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            var widget = this.documentHelper.getLineWidgetInternal(cursorPoint, true);
            if (!ej2_base_1.isNullOrUndefined(widget)) {
                this.updateTextPositionWidget(widget, cursorPoint, textPosition, true);
            }
            this.upDownSelectionLength = textPosition.location.x;
            var selectionStartIndex = this.start.getHierarchicalIndexInternal();
            var selectionEndIndex = this.end.getHierarchicalIndexInternal();
            if (selectionStartIndex !== selectionEndIndex && !isMouseLeave) {
                if (selection_helper_1.TextPosition.isForwardSelection(selectionStartIndex, selectionEndIndex)) {
                    textPosition.validateForwardFieldSelection(selectionStartIndex, selectionEndIndex);
                }
                else {
                    textPosition.validateBackwardFieldSelection(selectionStartIndex, selectionEndIndex);
                }
            }
            this.fireSelectionChanged(true);
        };
        Selection.prototype.getDocumentStart = function () {
            var textPosition = undefined;
            var block = this.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            return this.setPositionForBlock(block, true);
        };
        Selection.prototype.getDocumentEnd = function () {
            var textPosition = undefined;
            var documentStart = this.owner.documentStart;
            var lastPage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
            if (!ej2_base_1.isNullOrUndefined(documentStart) && lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1].childWidgets.length > 0) {
                var block = undefined;
                var section = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
                var blocks = section.childWidgets;
                var lastBlkItem = blocks.length - 1;
                var lastBlock = blocks[lastBlkItem];
                if (lastBlock instanceof page_1.BlockWidget) {
                    block = lastBlock;
                }
                textPosition = this.setPositionForBlock(block, false);
            }
            return textPosition;
        };
        Selection.prototype.handleControlEndKey = function () {
            var documentEnd = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.owner.documentEnd)) {
                documentEnd = this.owner.documentEnd;
            }
            if (!ej2_base_1.isNullOrUndefined(documentEnd)) {
                this.owner.selection.selectContent(documentEnd, true);
            }
            if (this.owner.enableAutoFocus) {
                this.checkForCursorVisibility();
            }
        };
        Selection.prototype.handleControlHomeKey = function () {
            var documentStart = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.owner.documentStart)) {
                documentStart = this.owner.documentStart;
            }
            if (!ej2_base_1.isNullOrUndefined(documentStart)) {
                this.owner.selection.selectContent(documentStart, true);
            }
            if (this.owner.enableAutoFocus) {
                this.checkForCursorVisibility();
            }
        };
        Selection.prototype.handleControlLeftKey = function () {
            this.extendToWordStartInternal(true);
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlRightKey = function () {
            this.extendToWordEndInternal(true);
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlDownKey = function () {
            this.moveToNextParagraph();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlUpKey = function () {
            this.moveToPreviousParagraph();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleShiftLeftKey = function () {
            this.extendBackward();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleShiftUpKey = function () {
            this.extendToPreviousLine();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleShiftRightKey = function () {
            this.extendForward();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleShiftDownKey = function () {
            this.extendToNextLine();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlShiftLeftKey = function () {
            var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
            if (isForward) {
                this.extendToWordEndInternal(false);
            }
            else {
                this.extendToWordStartInternal(false);
            }
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlShiftUpKey = function () {
            this.extendToParagraphStart();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlShiftRightKey = function () {
            var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
            if (isForward) {
                this.extendToWordStartInternal(false);
            }
            else {
                this.extendToWordEndInternal(false);
            }
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlShiftDownKey = function () {
            this.extendToParagraphEnd();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleLeftKey = function () {
            if (this.end.isCurrentParaBidi) {
                this.moveNextPosition();
            }
            else {
                this.movePreviousPosition();
            }
            if (this.owner.enableAutoFocus) {
                this.checkForCursorVisibility();
            }
        };
        Selection.prototype.handleUpKey = function () {
            this.isMoveDownOrMoveUp = true;
            this.moveUp();
            this.isMoveDownOrMoveUp = false;
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleRightKey = function () {
            if (this.end.isCurrentParaBidi) {
                this.movePreviousPosition();
            }
            else {
                this.moveNextPosition();
            }
            if (this.owner.enableAutoFocus) {
                this.checkForCursorVisibility();
            }
        };
        Selection.prototype.handleEndKey = function () {
            this.moveToLineEnd();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleHomeKey = function () {
            this.moveToLineStart();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleDownKey = function () {
            this.isMoveDownOrMoveUp = true;
            this.moveDown();
            this.isMoveDownOrMoveUp = false;
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleShiftEndKey = function () {
            this.extendToLineEnd();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleShiftHomeKey = function () {
            this.extendToLineStart();
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlShiftEndKey = function () {
            var documentEnd = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.owner.documentEnd)) {
                documentEnd = this.owner.documentEnd;
            }
            if (!ej2_base_1.isNullOrUndefined(documentEnd)) {
                this.end.setPosition(documentEnd.currentWidget, false);
                this.fireSelectionChanged(true);
            }
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleControlShiftHomeKey = function () {
            var documentStart = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.owner.documentStart)) {
                documentStart = this.owner.documentStart;
            }
            if (!ej2_base_1.isNullOrUndefined(documentStart)) {
                this.end.setPositionInternal(documentStart);
                this.fireSelectionChanged(true);
            }
            this.checkForCursorVisibility();
        };
        Selection.prototype.handleSpaceBarKey = function () {
            if (this.owner.documentHelper.isDocumentProtected && this.owner.documentHelper.protectionType === 'FormFieldsOnly'
                && this.getFormFieldType() === 'CheckBox') {
                this.owner.editor.toggleCheckBoxFormField(this.getCurrentFormField());
            }
        };
        Selection.prototype.handleTabKey = function (isNavigateInCell, isShiftTab) {
            var start = this.start;
            var isCursorAtParaStart = false;
            var isCursorAtLineStart = false;
            if (ej2_base_1.isNullOrUndefined(start)) {
                return;
            }
            if (start.offset === 0 && start.paragraph.paragraphFormat.listFormat.listId == -1) {
                if (start.currentWidget.isFirstLine()) {
                    isCursorAtParaStart = true;
                }
                isCursorAtLineStart = true;
            }
            if (start.paragraph.isInsideTable && this.end.paragraph.isInsideTable && (isNavigateInCell || isShiftTab)) {
                if (!this.owner.documentHelper.isDocumentProtected && !(this.documentHelper.protectionType === 'FormFieldsOnly')) {
                    if (isShiftTab) {
                        this.selectPreviousCell();
                    }
                    else {
                        this.selectNextCell();
                    }
                }
            }
            else if ((isNavigateInCell || isShiftTab) && !ej2_base_1.isNullOrUndefined(start) && start.offset === this.getStartOffset(start.paragraph)
                && !ej2_base_1.isNullOrUndefined(start.paragraph.paragraphFormat) && !ej2_base_1.isNullOrUndefined(start.paragraph.paragraphFormat.listFormat)
                && start.paragraph.paragraphFormat.listFormat.listId !== -1 && !this.owner.isReadOnlyMode) {
                var selection = this.documentHelper.selection;
                var currentPara = start.paragraph;
                var isFirstParaForList = false;
                if (!selection.isForward) {
                    currentPara = selection.end.paragraph;
                }
                isFirstParaForList = this.owner.editorModule.isFirstParaForList(selection, currentPara);
                if (isFirstParaForList) {
                    if (isShiftTab) {
                        this.owner.editorModule.updateListLevelIndent(-this.documentHelper.defaultTabWidth, currentPara);
                    }
                    else {
                        this.owner.editorModule.updateListLevelIndent(this.documentHelper.defaultTabWidth, currentPara);
                    }
                }
                else {
                    this.owner.editorModule.updateListLevel(isShiftTab ? false : true);
                }
            }
            else if (!this.owner.isReadOnlyMode && !this.documentHelper.isFormFillProtectedMode) {
                if (isCursorAtParaStart && start.paragraph.paragraphFormat.firstLineIndent < this.documentHelper.defaultTabWidth) {
                    this.documentHelper.owner.editorModule.onApplyParagraphFormat('firstLineIndent', this.documentHelper.defaultTabWidth, true, false);
                }
                else if (isCursorAtLineStart) {
                    if (isShiftTab) {
                        this.owner.editorModule.decreaseIndent();
                    }
                    else {
                        if (editor_helper_1.HelperMethods.convertPointToPixel(start.paragraph.paragraphFormat.firstLineIndent + start.paragraph.paragraphFormat.leftIndent) < this.documentHelper.viewer.clientArea.width) {
                            this.owner.editorModule.increaseIndent();
                        }
                    }
                }
                else {
                    this.owner.editorModule.handleTextInput('\t');
                }
            }
            if (this.documentHelper.protectionType === 'FormFieldsOnly' && this.documentHelper.formFields.length > 0) {
                this.selectPrevNextFormField(!isShiftTab);
            }
            this.checkForCursorVisibility();
        };
        Selection.prototype.handlePageUpPageDownKey = function (isPageDown, shiftKey) {
            var _this = this;
            var offsetX = this.end.location.x;
            var offsetY = this.end.location.y;
            var page = this.end.paragraph.bodyWidget.page;
            var pageTop = this.getPageTop(page);
            var previousScrollTop = this.documentHelper.viewerContainer.scrollTop;
            offsetY = (offsetY * this.documentHelper.zoomFactor) + (pageTop - previousScrollTop);
            offsetX = (offsetX * this.documentHelper.zoomFactor) + page.boundingRectangle.x;
            if (isPageDown) {
                this.documentHelper.viewerContainer.scrollTop += this.documentHelper.visibleBounds.height;
            }
            else {
                this.documentHelper.viewerContainer.scrollTop -= this.documentHelper.visibleBounds.height;
            }
            var isSameScrollTop = false;
            if (previousScrollTop === this.documentHelper.viewerContainer.scrollTop) {
                isSameScrollTop = true;
            }
            if (shiftKey) {
                this.documentHelper.skipScrollToPosition = true;
            }
            setTimeout(function () {
                if (isSameScrollTop) {
                    if (!shiftKey) {
                        if (isPageDown)
                            _this.moveToDocumentEnd();
                        else
                            _this.moveToDocumentStart();
                    }
                    else {
                        var position = void 0;
                        if (isPageDown) {
                            position = _this.getDocumentEnd();
                        }
                        else {
                            position = _this.getDocumentStart();
                        }
                        _this.end.setPositionForLineWidget(position.currentWidget, position.offset);
                        _this.fireSelectionChanged(true);
                    }
                }
                else {
                    _this.select({ x: offsetX, y: offsetY, extend: shiftKey });
                }
            }, 0);
        };
        Selection.prototype.getFormFieldInFormFillMode = function () {
            var currentStart = this.owner.selection.start;
            var formField;
            for (var i = (this.documentHelper.formFields.length - 1); i >= 0; i--) {
                if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                    continue;
                }
                var paraIndex = this.getElementPosition(this.documentHelper.formFields[i]).startPosition;
                if (paraIndex.isExistBefore(currentStart)) {
                    formField = this.documentHelper.formFields[i];
                    break;
                }
                else if (i === 0) {
                    formField = this.documentHelper.formFields[(this.documentHelper.formFields.length - 1)];
                }
            }
            return formField;
        };
        Selection.prototype.selectPrevNextFormField = function (forward, formField) {
            if (this.documentHelper.isFormFillProtectedMode) {
                if (!formField) {
                    formField = this.getCurrentFormField();
                }
                var index = this.documentHelper.formFields.indexOf(formField);
                if (forward) {
                    for (var i = index;; i++) {
                        if (i === (this.documentHelper.formFields.length - 1)) {
                            i = 0;
                        }
                        else {
                            i = i + 1;
                        }
                        if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                            i = i - 1;
                            continue;
                        }
                        this.selectFieldInternal(this.documentHelper.formFields[i], true);
                        break;
                    }
                }
                else {
                    for (var i = index;; i--) {
                        if (i === 0) {
                            i = (this.documentHelper.formFields.length - 1);
                        }
                        else {
                            i = i - 1;
                        }
                        if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                            i = i + 1;
                            continue;
                        }
                        this.selectFieldInternal(this.documentHelper.formFields[i], true);
                        break;
                    }
                }
            }
        };
        Selection.prototype.navigateToNextFormField = function () {
            var currentStart = this.owner.selection.end;
            var currentFormField;
            for (var i = 0; i < this.documentHelper.formFields.length; i++) {
                currentFormField = this.documentHelper.formFields[i];
                if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                    continue;
                }
                var paraIndex = this.getElementPosition(this.documentHelper.formFields[i]).startPosition;
                if (paraIndex.isExistAfter(currentStart)) {
                    if (currentFormField.formFieldData instanceof page_1.TextFormField && currentFormField.formFieldData.type === 'Text' &&
                        this.documentHelper.isInlineFormFillProtectedMode) {
                        this.selectTextElementStartOfField(this.documentHelper.formFields[i]);
                    }
                    else {
                        this.selectFieldInternal(this.documentHelper.formFields[i]);
                    }
                    break;
                }
                else if (i === (this.documentHelper.formFields.length - 1)) {
                    currentFormField = this.documentHelper.formFields[0];
                    if (currentFormField.formFieldData instanceof page_1.TextFormField && currentFormField.formFieldData.type === 'Text' &&
                        this.documentHelper.isInlineFormFillProtectedMode) {
                        this.selectTextElementStartOfField(this.documentHelper.formFields[0]);
                    }
                    else {
                        this.selectFieldInternal(this.documentHelper.formFields[0]);
                    }
                }
            }
        };
        Selection.prototype.selectTextElementStartOfField = function (formField) {
            var fieldSeparator = formField.fieldSeparator;
            var element = fieldSeparator.nextElement;
            if (element) {
                while (!(element instanceof page_1.TextElementBox)) {
                    element = element.nextElement;
                }
                var offset = formField.line.getOffset(element, 0);
                var point = this.getPhysicalPositionInternal(formField.line, offset, false);
                this.selectInternal(formField.line, element, 0, point);
            }
        };
        Selection.prototype.triggerFormFillEvent = function (isKeyBoardNavigation) {
            var previousField = this.previousSelectedFormField;
            var currentField = this.currentFormField;
            var previousFieldData;
            var currentFieldData;
            if (currentField !== previousField && previousField && previousField.formFieldData instanceof page_1.TextFormField
                && previousField.formFieldData.type === 'Text') {
                if (previousField.formFieldData.format !== '' && !this.isFormatUpdated) {
                    this.owner.editor.applyFormTextFormat(previousField);
                    if (!ej2_base_1.isNullOrUndefined(this.previousSelectedFormField)) {
                        previousField = this.previousSelectedFormField;
                    }
                }
                previousFieldData = { 'fieldName': previousField.formFieldData.name, 'value': this.owner.editorModule.getFieldResultText(previousField) };
                this.owner.trigger(index_2.afterFormFieldFillEvent, previousFieldData);
            }
            if (currentField !== previousField && currentField && ((currentField.formFieldData instanceof page_1.TextFormField
                && currentField.formFieldData.type === 'Text' && isKeyBoardNavigation == undefined) || (((currentField.formFieldData instanceof page_1.TextFormField && this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Inline') || (currentField.formFieldData instanceof page_1.CheckBoxFormField)) && isKeyBoardNavigation))) {
                currentFieldData = { 'fieldName': currentField.formFieldData.name, 'value': this.owner.editorModule.getFieldResultText(currentField) };
                this.owner.trigger(index_2.beforeFormFieldFillEvent, currentFieldData);
            }
        };
        Selection.prototype.selectPreviousCell = function () {
            var tableCell = this.start.paragraph.associatedCell;
            var tableRow = tableCell.ownerRow;
            var tableAdv = tableRow.ownerTable;
            if (ej2_base_1.isNullOrUndefined(tableCell.previousWidget)) {
                if (!ej2_base_1.isNullOrUndefined(tableRow.previousRenderedWidget)) {
                    var prevRow = undefined;
                    if (tableRow.previousRenderedWidget instanceof page_1.TableRowWidget) {
                        prevRow = tableRow.previousRenderedWidget;
                    }
                    this.selectTableCellInternal(prevRow.childWidgets[prevRow.childWidgets.length - 1], true);
                }
            }
            else {
                var prevCell = undefined;
                if (tableCell.previousWidget instanceof page_1.TableCellWidget) {
                    prevCell = tableCell.previousWidget;
                }
                this.selectTableCellInternal(prevCell, true);
            }
        };
        Selection.prototype.selectNextCell = function () {
            var tableCell = this.start.paragraph.associatedCell;
            var tableRow = tableCell.ownerRow;
            var tableAdv = tableRow.ownerTable;
            if (ej2_base_1.isNullOrUndefined(tableCell.nextWidget)) {
                if (ej2_base_1.isNullOrUndefined(tableRow.nextRenderedWidget) && !this.owner.isReadOnlyMode) {
                    this.owner.editorModule.insertRow(false);
                }
                else {
                    var nextRow = undefined;
                    if (tableRow.nextRenderedWidget instanceof page_1.TableRowWidget) {
                        nextRow = tableRow.nextRenderedWidget;
                    }
                    this.selectTableCellInternal(nextRow.childWidgets[0], true);
                }
            }
            else {
                var nextCell = undefined;
                if (tableCell.nextRenderedWidget instanceof page_1.TableCellWidget) {
                    nextCell = tableCell.nextRenderedWidget;
                }
                this.selectTableCellInternal(nextCell, true);
            }
        };
        Selection.prototype.selectTableCellInternal = function (tableCell, clearMultiSelection) {
            var firstParagraph = this.getFirstParagraph(tableCell);
            var lastParagraph = this.getLastParagraph(tableCell);
            if (firstParagraph === lastParagraph && lastParagraph.isEmpty()) {
                this.selectParagraphInternal(lastParagraph, true);
            }
            else {
                var firstLineWidget = lastParagraph.childWidgets[0];
                this.start.setPosition(firstParagraph.childWidgets[0], true);
                this.end.setPositionParagraph(firstLineWidget, firstLineWidget.getEndOffset());
                this.fireSelectionChanged(true);
            }
        };
        Selection.prototype.selectTableInternal = function () {
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            if (!ej2_base_1.isNullOrUndefined(start) && !ej2_base_1.isNullOrUndefined(end) && !ej2_base_1.isNullOrUndefined(this.getTable(start, end))) {
                var containerCell = this.getContainerCellOf(start.paragraph.associatedCell, end.paragraph.associatedCell);
                var table = containerCell.ownerTable;
                var firstPara = this.documentHelper.getFirstParagraphBlock(table);
                var lastPara = this.documentHelper.getLastParagraphBlock(table);
                var offset = lastPara.lastChild.getEndOffset();
                this.start.setPosition(firstPara.childWidgets[0], true);
                this.end.setPositionParagraph(lastPara.lastChild, offset + 1);
            }
            this.selectPosition(this.start, this.end);
        };
        Selection.prototype.getTableRevision = function () {
            var start = this.start.clone();
            var end = this.end.clone();
            if (!this.isForward) {
                start = this.end.clone();
                end = this.start.clone();
            }
            if (!ej2_base_1.isNullOrUndefined(start) && !ej2_base_1.isNullOrUndefined(end) && !ej2_base_1.isNullOrUndefined(this.getTable(start, end))) {
                var containerCell = this.getContainerCellOf(start.paragraph.associatedCell, end.paragraph.associatedCell);
                var table = containerCell.ownerTable;
                var firstPara = this.documentHelper.getFirstParagraphBlock(table);
                var lastPara = this.documentHelper.getLastParagraphBlock(table);
                var offset = lastPara.lastChild.getEndOffset();
                start.setPosition(firstPara.childWidgets[0], true);
                end.setPositionParagraph(lastPara.lastChild, offset + 1);
            }
            var startIndex = this.getAbsolutePositionFromRelativePosition(start);
            var endIndex = this.getAbsolutePositionFromRelativePosition(end);
            return Math.abs(endIndex - startIndex);
        };
        Selection.prototype.selectColumnInternal = function () {
            var startTextPos = this.start;
            var endTextPos = this.end;
            if (!this.isForward) {
                startTextPos = this.end;
                endTextPos = this.start;
            }
            if (!ej2_base_1.isNullOrUndefined(startTextPos) && !ej2_base_1.isNullOrUndefined(endTextPos) && !ej2_base_1.isNullOrUndefined(this.getTable(startTextPos, endTextPos))) {
                var containerCell = this.getContainerCellOf(startTextPos.paragraph.associatedCell, endTextPos.paragraph.associatedCell);
                if (containerCell.ownerTable.contains(endTextPos.paragraph.associatedCell)) {
                    var startCell = this.getSelectedCell(startTextPos.paragraph.associatedCell, containerCell);
                    var endCell = this.getSelectedCell(endTextPos.paragraph.associatedCell, containerCell);
                    if (this.containsCell(containerCell, endTextPos.paragraph.associatedCell)) {
                        var row = startCell.ownerRow;
                        var columnCells = containerCell.ownerTable.getColumnCellsForSelection(containerCell, containerCell);
                        if (columnCells.length > 0) {
                            var firstPara = this.getFirstParagraph(columnCells[0]);
                            var lastPara = this.getLastParagraph(columnCells[columnCells.length - 1]);
                            this.start.setPosition(firstPara.firstChild, true);
                            var lastLine = lastPara.lastChild;
                            this.end.setPositionParagraph(lastLine, lastLine.getEndOffset() + 1);
                        }
                    }
                    else {
                        var startCellColumnCells = containerCell.ownerTable.getColumnCellsForSelection(startCell, startCell);
                        var endCellColumnCells = containerCell.ownerTable.getColumnCellsForSelection(endCell, endCell);
                        if (startCellColumnCells.length > 0 && endCellColumnCells.length > 0) {
                            var firstPara = this.getFirstParagraph(startCellColumnCells[0]);
                            var lastPara = this.getLastParagraph(endCellColumnCells[endCellColumnCells.length - 1]);
                            this.start.setPosition(firstPara.firstChild, true);
                            var lastLine = lastPara.lastChild;
                            this.end.setPositionParagraph(lastLine, lastLine.getEndOffset() + 1);
                        }
                    }
                }
            }
            this.selectPosition(this.start, this.end);
        };
        Selection.prototype.selectTableRow = function () {
            var startPos = this.start;
            var endPos = this.end;
            if (!this.isForward) {
                startPos = this.end;
                endPos = this.start;
            }
            if (!ej2_base_1.isNullOrUndefined(startPos) && !ej2_base_1.isNullOrUndefined(endPos) && !ej2_base_1.isNullOrUndefined(this.getTable(startPos, endPos))) {
                var containerCell = void 0;
                containerCell = this.getContainerCellOf(startPos.paragraph.associatedCell, endPos.paragraph.associatedCell);
                if (containerCell.ownerTable.contains(endPos.paragraph.associatedCell)) {
                    var startCell = this.getSelectedCell(startPos.paragraph.associatedCell, containerCell);
                    var endCell = this.getSelectedCell(endPos.paragraph.associatedCell, containerCell);
                    if (this.containsCell(containerCell, endPos.paragraph.associatedCell)) {
                        var row = startCell.ownerRow;
                        var firstPara = this.getFirstParagraph(row.childWidgets[0]);
                        var lastPara = this.getLastParagraph(row.childWidgets[row.childWidgets.length - 1]);
                        this.start.setPosition(firstPara.firstChild, true);
                        this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                    }
                    else {
                        var firstPara = this.getFirstParagraph(startCell.ownerRow.childWidgets[0]);
                        var lastPara = void 0;
                        lastPara = this.getLastParagraph(endCell.ownerRow.childWidgets[endCell.ownerRow.childWidgets.length - 1]);
                        this.start.setPosition(firstPara.firstChild, true);
                        this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                    }
                }
            }
            this.selectPosition(this.start, this.end);
        };
        Selection.prototype.selectTableCell = function () {
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            if (ej2_base_1.isNullOrUndefined(this.getTable(start, end))) {
                return;
            }
            if (this.isEmpty) {
                if (start.paragraph.isInsideTable && !ej2_base_1.isNullOrUndefined(start.paragraph.associatedCell)) {
                    var firstPara = this.getFirstParagraph(start.paragraph.associatedCell);
                    var lastPara = this.getLastParagraph(end.paragraph.associatedCell);
                    if (firstPara === lastPara) {
                        this.start.setPosition(lastPara.firstChild, true);
                        this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                    }
                    else {
                        this.start.setPosition(firstPara.firstChild, true);
                        this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                    }
                }
            }
            else {
                var containerCell = this.getContainerCell(start.paragraph.associatedCell);
                if (this.containsCell(containerCell, start.paragraph.associatedCell) && this.containsCell(containerCell, end.paragraph.associatedCell)) {
                    var firstPara = this.getFirstParagraph(containerCell);
                    var lastPara = this.getLastParagraph(containerCell);
                    if (!ej2_base_1.isNullOrUndefined(firstPara) && !ej2_base_1.isNullOrUndefined(lastPara)) {
                        this.start.setPosition(firstPara.firstChild, true);
                        this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                    }
                }
            }
            this.selectPosition(this.start, this.end);
        };
        Selection.prototype.selectAll = function () {
            var documentStart;
            var documentEnd;
            this.documentHelper.skipScrollToPosition = true;
            var container = this.getContainerWidget(this.start.paragraph);
            if (this.owner.enableHeaderAndFooter) {
                var headerFooter = this.getContainerWidget(this.start.paragraph);
                documentStart = this.setPositionForBlock(headerFooter.firstChild, true);
                documentEnd = this.setPositionForBlock(headerFooter.lastChild, false);
            }
            else if (this.isInShape) {
                var textFrame = this.getCurrentTextFrame();
                documentStart = this.setPositionForBlock(textFrame.firstChild, true);
                documentEnd = this.setPositionForBlock(textFrame.lastChild, false);
            }
            else if (container instanceof page_1.FootNoteWidget && container.footNoteType === 'Footnote') {
                var i = void 0;
                var j = void 0;
                var pageLength = this.documentHelper.pages.length;
                for (i = 0; i <= pageLength - 1; i++) {
                    if (ej2_base_1.isNullOrUndefined(this.documentHelper.pages[i].footnoteWidget)) {
                        continue;
                    }
                    else {
                        documentStart = this.setPositionForBlock(this.documentHelper.pages[i].footnoteWidget.bodyWidgets[0].firstChild, true);
                        break;
                    }
                }
                for (j = pageLength - 1; j >= 0; j--) {
                    if (ej2_base_1.isNullOrUndefined(this.documentHelper.pages[j].footnoteWidget)) {
                        continue;
                    }
                    else {
                        var child = this.documentHelper.pages[j].footnoteWidget.bodyWidgets.length;
                        var lastChild = this.documentHelper.pages[j].footnoteWidget.bodyWidgets[child - 1].childWidgets.length;
                        documentEnd = this.setPositionForBlock(this.documentHelper.pages[j].footnoteWidget.bodyWidgets[child - 1].childWidgets[lastChild - 1], false);
                        break;
                    }
                }
            }
            else if (container instanceof page_1.FootNoteWidget && container.footNoteType === 'Endnote') {
                var endNotes = this.getContainerWidget(this.start.paragraph);
                documentStart = this.setPositionForBlock(endNotes.bodyWidgets[0].firstChild, true);
                documentEnd = this.setPositionForBlock(endNotes.bodyWidgets[endNotes.bodyWidgets.length - 1].firstChild, false);
            }
            else {
                documentStart = this.owner.documentStart;
                documentEnd = this.owner.documentEnd;
            }
            if (!ej2_base_1.isNullOrUndefined(documentStart)) {
                this.start.setPositionInternal(documentStart);
                this.end.setPositionParagraph(documentEnd.currentWidget, documentEnd.offset + 1);
                this.upDownSelectionLength = this.end.location.x;
                this.fireSelectionChanged(true);
            }
        };
        Selection.prototype.extendBackward = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
            if (isForward) {
                this.end.moveForward();
            }
            else {
                this.end.moveBackward();
            }
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendForward = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
            if (isForward) {
                this.end.moveBackward();
            }
            else {
                this.end.moveForward();
            }
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendToWordStartEnd = function () {
            if ((this.start.paragraph.isInsideTable || this.end.paragraph.isInsideTable)
                && (this.start.paragraph.associatedCell !== this.end.paragraph.associatedCell
                    || this.isCellSelected(this.start.paragraph.associatedCell, this.start, this.end))) {
                return true;
            }
            return false;
        };
        Selection.prototype.extendToWordStart = function () {
            this.extendToWordStartInternal(false);
        };
        Selection.prototype.extendToWordEnd = function () {
            this.extendToWordEndInternal(false);
        };
        Selection.prototype.extendToWordStartInternal = function (isNavigation) {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            var isCellSelected = this.extendToWordStartEnd();
            if (isCellSelected) {
                this.end.moveToPreviousParagraphInTable(this);
            }
            else {
                if (isNavigation && this.end.isCurrentParaBidi) {
                    this.end.moveToWordEndInternal(isNavigation ? 0 : 1, false);
                }
                else {
                    this.end.moveToWordStartInternal(isNavigation ? 0 : 1);
                }
            }
            if (isNavigation) {
                this.start.setPositionInternal(this.end);
            }
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendToWordEndInternal = function (isNavigation) {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            var isCellSelect = this.extendToWordStartEnd();
            if (isCellSelect) {
                this.end.moveToNextParagraphInTable();
            }
            else {
                if (isNavigation && this.end.isCurrentParaBidi) {
                    this.end.moveToWordStartInternal(isNavigation ? 0 : 1);
                }
                else {
                    this.end.moveToWordEndInternal(isNavigation ? 0 : 1, false);
                }
            }
            if (isNavigation) {
                this.start.setPositionInternal(this.end);
            }
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.extendToNextLine = function () {
            if (ej2_base_1.isNullOrUndefined(this.start)) {
                return;
            }
            this.end.moveToNextLine(this.upDownSelectionLength);
            this.fireSelectionChanged(true);
        };
        Selection.prototype.getTextPosition = function (hierarchicalIndex) {
            var textPosition = new selection_helper_1.TextPosition(this.owner);
            textPosition.setPositionForCurrentIndex(hierarchicalIndex);
            return textPosition;
        };
        Selection.prototype.getText = function (includeObject) {
            if (ej2_base_1.isNullOrUndefined(this.start) || ej2_base_1.isNullOrUndefined(this.end)
                || ej2_base_1.isNullOrUndefined(this.start.paragraph) || ej2_base_1.isNullOrUndefined(this.end.paragraph)) {
                return undefined;
            }
            var startPosition = this.start;
            var endPosition = this.end;
            if (startPosition.isAtSamePosition(endPosition)) {
                return '';
            }
            return this.getTextInternal(startPosition, endPosition, includeObject);
        };
        Selection.prototype.getTextInternal = function (start, end, includeObject) {
            if (start.isExistAfter(end)) {
                var temp = end;
                end = start;
                start = temp;
            }
            var startPosition = start;
            var endPosition = end;
            if (!ej2_base_1.isNullOrUndefined(start) && !ej2_base_1.isNullOrUndefined(end) && !ej2_base_1.isNullOrUndefined(start.paragraph) && !ej2_base_1.isNullOrUndefined(end.paragraph)) {
                var startIndex = 0;
                var endIndex = 0;
                var startOffset = start.offset;
                var endOffset = end.offset;
                var startInlineObj = start.currentWidget.getInline(startOffset, startIndex);
                startIndex = startInlineObj.index;
                var inline = startInlineObj.element;
                if (inline instanceof page_1.FieldElementBox && !ej2_base_1.isNullOrUndefined(inline.fieldEnd)) {
                    var elementInfo = this.getRenderedInline(inline, startIndex);
                    inline = elementInfo.element;
                    startIndex = elementInfo.index;
                }
                var endInlineObj = end.currentWidget.getInline(endOffset, endIndex);
                var endInline = endInlineObj.element;
                endIndex = endInlineObj.index;
                var text = '';
                if (inline instanceof page_1.ImageElementBox && includeObject && startIndex === 0) {
                    text = page_1.ElementBox.objectCharacter;
                }
                else if (inline instanceof page_1.TextElementBox) {
                    text = ((ej2_base_1.isNullOrUndefined(inline.text)) || (inline.text) === '') || inline.text.length < startIndex ? text : inline.text.substring(startIndex);
                }
                if (startPosition.paragraph === endPosition.paragraph) {
                    if (inline instanceof page_1.ElementBox) {
                        if (inline === endInline && inline instanceof page_1.TextElementBox) {
                            text = text.length < endIndex - startIndex ? text : text.substring(0, endIndex - startIndex);
                        }
                        else if (inline.nextNode instanceof page_1.ElementBox) {
                            text = text + this.getTextInline(inline.nextNode, endPosition.paragraph, endInline, endIndex, includeObject);
                        }
                    }
                }
                else {
                    if (inline instanceof page_1.ElementBox && inline.nextNode instanceof page_1.ElementBox) {
                        text = text + this.getTextInline(inline.nextNode, endPosition.paragraph, endInline, endIndex, includeObject);
                    }
                    else {
                        var nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(startPosition.paragraph);
                        text = text + '\r';
                        while (!ej2_base_1.isNullOrUndefined(nextParagraphWidget) && nextParagraphWidget.isEmpty()) {
                            text = text + '\r';
                            if (nextParagraphWidget === endPosition.paragraph) {
                                return text;
                            }
                            nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(nextParagraphWidget);
                        }
                        if (!ej2_base_1.isNullOrUndefined(nextParagraphWidget) && !nextParagraphWidget.isEmpty()) {
                            text = text + this.getTextInline(nextParagraphWidget.childWidgets[0].children[0], endPosition.paragraph, endInline, endIndex, includeObject);
                        }
                    }
                }
                if (endOffset === (endPosition.currentWidget).getEndOffset() + 1) {
                    text = text + '\r';
                }
                return text;
            }
            return undefined;
        };
        Selection.prototype.getHierarchicalIndex = function (block, offset) {
            var index;
            if (block) {
                if (block instanceof page_1.HeaderFooterWidget) {
                    var hfString = block.headerFooterType.indexOf('Header') !== -1 ? 'H' : 'F';
                    var pageIndex = block.page.index.toString();
                    var sectionIndex = block.page.sectionIndex;
                    index = sectionIndex + ';' + hfString + ';' + pageIndex + ';' + offset;
                }
                else {
                    if (block instanceof page_1.BodyWidget && !ej2_base_1.isNullOrUndefined(block.containerWidget) && block.containerWidget instanceof page_1.FootNoteWidget) {
                        var ind = block.containerWidget.bodyWidgets.indexOf(block);
                        index = ind + ';' + offset;
                    }
                    else {
                        index = block.index + ';' + offset;
                    }
                }
                if (block instanceof page_1.TextFrame) {
                    var indexInOwner = block.containerShape.line.getOffset(block.containerShape, 1);
                    index = 'S' + ';' + indexInOwner + ';' + offset;
                    return this.getHierarchicalIndex(block.containerShape.paragraph, index);
                }
                if (block instanceof page_1.FootNoteWidget) {
                    var hfString = block.footNoteType === 'Footnote' ? 'FN' : 'EN';
                    var pageIndex = block.page.index.toString();
                    var sectionIndex = block.page.sectionIndex;
                    index = sectionIndex + ';' + hfString + ';' + pageIndex + ';' + offset;
                }
                if (block.containerWidget) {
                    if (block instanceof page_1.TableCellWidget && block.rowIndex !== block.containerWidget.index) {
                        index = block.rowIndex + ';' + index;
                        block = block.containerWidget;
                    }
                    return this.getHierarchicalIndex(block.containerWidget, index);
                }
            }
            return index;
        };
        Selection.prototype.getHierarchicalIndexByPosition = function (position) {
            var info = this.getParagraphInfo(position);
            return this.getHierarchicalIndex(info.paragraph, info.offset.toString());
        };
        Selection.prototype.getTextPosBasedOnLogicalIndex = function (hierarchicalIndex) {
            var textPosition = new selection_helper_1.TextPosition(this.owner);
            var blockInfo = this.getParagraph({ index: hierarchicalIndex });
            var lineInfo = this.getLineInfoBasedOnParagraph(blockInfo.paragraph, blockInfo.offset);
            textPosition.setPositionForLineWidget(lineInfo.line, lineInfo.offset);
            return textPosition;
        };
        Selection.prototype.getLineInfoBasedOnParagraph = function (paragraph, offset) {
            var position = undefined;
            var element = undefined;
            var length = this.getParagraphLength(paragraph);
            var next = paragraph.nextSplitWidget;
            if (offset > length + 1 && ej2_base_1.isNullOrUndefined(next)) {
                offset = length;
            }
            while (offset > length && next instanceof page_1.ParagraphWidget) {
                offset -= length;
                paragraph = next;
                length = this.getParagraphLength(paragraph);
                next = paragraph.nextSplitWidget;
            }
            return this.getLineInfo(paragraph, offset);
        };
        Selection.prototype.getParagraph = function (position) {
            var paragraph = this.getParagraphInternal(this.getBodyWidget(position), position);
            return { paragraph: paragraph, offset: parseInt(position.index, 10) };
        };
        Selection.prototype.getBodyWidget = function (position) {
            var index = position.index.indexOf(';');
            var value = position.index.substring(0, index);
            position.index = position.index.substring(index).replace(';', '');
            var sectionIndex = parseInt(value, 10);
            index = parseInt(value, 10);
            index = position.index.indexOf(';');
            value = position.index.substring(0, index);
            if (value === 'H' || value === 'F') {
                return this.getHeaderFooterWidget(position);
            }
            else if (value === 'FN' || value === 'EN') {
                return this.getFootNoteWidget(position);
            }
            index = parseInt(value, 10);
            return this.getBodyWidgetInternal(sectionIndex, index);
        };
        Selection.prototype.getFootNoteWidget = function (position) {
            var index1 = position.index.indexOf(';');
            var value1 = position.index.substring(0, index1);
            position.index = position.index.substring(index1).replace(';', '');
            var footNote = value1 === 'FN';
            index1 = position.index.indexOf(';');
            value1 = position.index.substring(0, index1);
            position.index = position.index.substring(index1).replace(';', '');
            index1 = parseInt(value1, 10);
            var page = this.documentHelper.pages[index1];
            index1 = position.index.indexOf(';');
            value1 = position.index.substring(0, index1);
            position.index = position.index.substring(index1).replace(';', '');
            index1 = parseInt(value1, 10);
            if (footNote) {
                return page.footnoteWidget.bodyWidgets[index1];
            }
            else {
                return page.endnoteWidget.bodyWidgets[index1];
            }
        };
        Selection.prototype.getHeaderFooterWidget = function (position) {
            var index = position.index.indexOf(';');
            var value = position.index.substring(0, index);
            position.index = position.index.substring(index).replace(';', '');
            var isHeader = value === 'H';
            index = position.index.indexOf(';');
            value = position.index.substring(0, index);
            position.index = position.index.substring(index).replace(';', '');
            index = parseInt(value, 10);
            var page = this.documentHelper.pages[index];
            var headerFooterWidget;
            if (isHeader) {
                headerFooterWidget = page.headerWidget;
            }
            else {
                headerFooterWidget = page.footerWidget;
            }
            if (!ej2_base_1.isNullOrUndefined(headerFooterWidget)) {
                headerFooterWidget.page = page;
            }
            return headerFooterWidget;
        };
        Selection.prototype.getBodyWidgetInternal = function (sectionIndex, blockIndex) {
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                for (var j = 0; j < this.documentHelper.pages[i].bodyWidgets.length; j++) {
                    var bodyWidget = this.documentHelper.pages[i].bodyWidgets[j];
                    if (bodyWidget.index === sectionIndex) {
                        if (bodyWidget.childWidgets.length > 0 && bodyWidget.firstChild.index <= blockIndex &&
                            bodyWidget.lastChild.index >= blockIndex) {
                            return bodyWidget;
                        }
                    }
                    if (bodyWidget.index > sectionIndex) {
                        break;
                    }
                }
            }
            return undefined;
        };
        Selection.prototype.getParagraphInternal = function (container, position) {
            if (ej2_base_1.isNullOrUndefined(position.index)) {
                return undefined;
            }
            var index = position.index.indexOf(';');
            var value = '0';
            if (index >= 0) {
                value = position.index.substring(0, index);
                position.index = position.index.substring(index).replace(';', '');
            }
            index = parseInt(value, 10);
            if (container instanceof page_1.TableRowWidget && index >= container.childWidgets.length) {
                position.index = '0;0';
                index = container.childWidgets.length - 1;
            }
            var childWidget = this.getBlockByIndex(container, index);
            if (childWidget) {
                value = position.index.substring(0, 1);
                if (value === 'S') {
                    position.index = position.index.substring(1).replace(';', '');
                    var indexInOwner = position.index.substring(0, position.index.indexOf(';'));
                    position.index = position.index.substring(position.index.indexOf(';')).replace(';', '');
                    var paraIndex = position.index.substring(0, position.index.indexOf(';'));
                    position.index = position.index.substring(position.index.indexOf(';')).replace(';', '');
                    var shape = childWidget.getInline(parseInt(indexInOwner), 0).element;
                    childWidget = shape.textFrame.childWidgets[paraIndex];
                }
                var child = childWidget;
                if (child instanceof page_1.ParagraphWidget) {
                    if (position.index.indexOf(';') > 0) {
                        position.index = '0';
                    }
                    return child;
                }
                if (child instanceof page_1.Widget) {
                    if (position.index.indexOf(';') > 0) {
                        return this.getParagraphInternal(child, position);
                    }
                    else {
                        if (child instanceof page_1.TableWidget) {
                            return this.documentHelper.getFirstParagraphInFirstCell(child);
                        }
                        return undefined;
                    }
                }
            }
            else if (container) {
                var nextWidget = container.getSplitWidgets().pop().nextRenderedWidget;
                if (nextWidget instanceof page_1.Widget) {
                    position.index = '0';
                    if (nextWidget instanceof page_1.TableWidget) {
                        return this.documentHelper.getFirstParagraphInFirstCell(nextWidget);
                    }
                    return nextWidget;
                }
            }
            return undefined;
        };
        Selection.prototype.getBlockByIndex = function (container, blockIndex) {
            var childWidget;
            if (container) {
                for (var j = 0; j < container.childWidgets.length; j++) {
                    if (container.childWidgets[j].index === blockIndex) {
                        childWidget = container.childWidgets[j];
                        break;
                    }
                }
                if (!childWidget && !(container instanceof page_1.HeaderFooterWidget)) {
                    return this.getBlockByIndex(container.nextSplitWidget, blockIndex);
                }
            }
            return childWidget;
        };
        Selection.prototype.getParagraphInfo = function (position) {
            return this.getParagraphInfoInternal(position.currentWidget, position.offset);
        };
        Selection.prototype.getCellFromSelection = function (type) {
            var cell;
            var selectedCells = this.getSelectedCells();
            if (this.hasMergedCells()) {
                return undefined;
            }
            if (type == 0 && selectedCells.length > 0) {
                if (!(this.selectedWidgets.keys[0] instanceof page_1.TableCellWidget)) {
                    return undefined;
                }
                cell = selectedCells[0];
                var rowIndex = cell.rowIndex;
                var colIndex = cell.columnIndex;
                var tableIndex = cell.ownerTable.index;
                for (var i = 0; i < selectedCells.length; i++) {
                    var widget = selectedCells[i];
                    if (widget.rowIndex < rowIndex) {
                        rowIndex = widget.rowIndex;
                    }
                    if (widget.columnIndex < colIndex) {
                        colIndex = widget.columnIndex;
                    }
                    if (widget.ownerTable.index < tableIndex) {
                        tableIndex = widget.ownerTable.index;
                    }
                }
                for (var i = 0; i < selectedCells.length; i++) {
                    var widget = selectedCells[i];
                    if (rowIndex == widget.rowIndex && colIndex == widget.columnIndex && tableIndex == widget.ownerTable.index) {
                        cell = widget;
                    }
                }
            }
            else if (type == 1 && selectedCells.length > 0) {
                if (!(this.selectedWidgets.keys[this.selectedWidgets.length - 1] instanceof page_1.TableCellWidget)) {
                    return undefined;
                }
                cell = selectedCells[selectedCells.length - 1];
                var rowIndex = cell.rowIndex;
                var colIndex = cell.columnIndex;
                var tableIndex = cell.ownerTable.index;
                for (var i = selectedCells.length - 1; i >= 0; i--) {
                    var widget = selectedCells[i];
                    if (widget.rowIndex > rowIndex) {
                        rowIndex = widget.rowIndex;
                    }
                    if (widget.columnIndex > colIndex) {
                        colIndex = widget.columnIndex;
                    }
                    if (widget.ownerTable.index > tableIndex) {
                        tableIndex = widget.ownerTable.index;
                    }
                }
                for (var i = 0; i < selectedCells.length; i++) {
                    var widget = selectedCells[i];
                    if (rowIndex == widget.rowIndex && colIndex == widget.columnIndex && tableIndex == widget.ownerTable.index) {
                        cell = widget;
                    }
                }
            }
            return (cell instanceof page_1.TableCellWidget) ? cell : undefined;
        };
        Selection.prototype.getCellFromSelectionInTable = function (type) {
            var cell;
            var selectedCells = this.getSelectedCells();
            var bounds = this.getCellBoundsInfo();
            var sortedRowIndexArray = [];
            var sortedColumnIndexArray = [];
            for (var i = 0; i < selectedCells.length; i++) {
                var widget = selectedCells[i];
                sortedRowIndexArray.push(widget.rowIndex);
                sortedColumnIndexArray.push(widget.columnIndex);
            }
            sortedRowIndexArray.sort();
            sortedColumnIndexArray.sort();
            var requiredRow;
            var requiredCol;
            if (type == 1) {
                requiredRow = bounds.row.rowLast;
                requiredCol = bounds.column.colLast;
                var isRequiredCellExist = false;
                while (!isRequiredCellExist && ej2_base_1.isNullOrUndefined(cell)) {
                    for (var i = 0; i < selectedCells.length; i++) {
                        var widget_1 = selectedCells[i];
                        if (widget_1.rowIndex == requiredRow && widget_1.columnIndex == requiredCol) {
                            isRequiredCellExist = true;
                            cell = widget_1;
                            break;
                        }
                    }
                    if (!isRequiredCellExist) {
                        requiredRow -= 1;
                    }
                }
            }
            else if (type == 0) {
                requiredRow = bounds.row.rowFirst;
                requiredCol = bounds.column.colFirst;
                var isRequiredCellExist = false;
                while (!isRequiredCellExist && ej2_base_1.isNullOrUndefined(cell)) {
                    for (var i = 0; i < selectedCells.length; i++) {
                        var widget_2 = selectedCells[i];
                        if (widget_2.rowIndex == requiredRow && widget_2.columnIndex == requiredCol) {
                            isRequiredCellExist = true;
                            cell = widget_2;
                            break;
                        }
                    }
                    if (!isRequiredCellExist) {
                        requiredCol += 1;
                    }
                }
            }
            return cell;
        };
        Selection.prototype.getActualOffset = function (cell, type) {
            var offset;
            if (type == 0) {
                var paraElement = this.getFirstParagraph(cell);
                offset = this.getHierarchicalIndex(paraElement, this.getStartOffset(paraElement).toString());
            }
            else if (type == 1) {
                var paraElement = this.getLastParagraph(cell);
                var lastLine = paraElement.lastChild;
                var length_1 = this.getParagraphLength(paraElement, lastLine) + this.getLineLength(lastLine) + 1;
                offset = this.getHierarchicalIndex(paraElement, length_1.toString());
            }
            return offset;
        };
        Selection.prototype.getBookmarkProperties = function (bookmark) {
            var selectedWidgets = this.selectedWidgets.keys;
            if (bookmark.bookmarkType == 0) {
                if (!(selectedWidgets[0] instanceof page_1.TableCellWidget)) {
                    return undefined;
                }
                var bounds = this.getCellBoundsInfo();
                if (!ej2_base_1.isNullOrUndefined(bounds)) {
                    return {
                        'columnFirst': bounds.column.colFirst.toString(),
                        'columnLast': bounds.column.colLast.toString()
                    };
                }
            }
            if (bookmark.bookmarkType == 1) {
                if (selectedWidgets[selectedWidgets.length - 1] instanceof page_1.TableCellWidget) {
                    return undefined;
                }
                var properties = {};
                if (this.isParagraphMarkSelected()) {
                    properties.isAfterParagraphMark = true;
                }
                var bookmarkStart = bookmark.reference;
                var selectedCells = this.getSelectedCells();
                if (bookmarkStart && !ej2_base_1.isNullOrUndefined(bookmarkStart.properties)) {
                    if (selectedCells.length == 1) {
                        if (this.isCellSelected(selectedCells[0], this.start, this.end)) {
                            properties.isAfterCellMark = true;
                            delete properties.isAfterParagraphMark;
                        }
                    }
                }
                if (this.isTableSelected()) {
                    properties.isAfterTableMark = true;
                }
                if (this.isRowSelected()) {
                    properties.isAfterRowMark = true;
                }
                if (!ej2_base_1.isNullOrUndefined(properties.isAfterParagraphMark) || !ej2_base_1.isNullOrUndefined(properties.isAfterCellMark)) {
                    return properties;
                }
            }
            return undefined;
        };
        Selection.prototype.isParagraphMarkSelected = function () {
            var line = this.end.currentWidget;
            var paraElement;
            if (line instanceof page_1.LineWidget) {
                paraElement = line.paragraph;
            }
            var paraLength = this.getParagraphLength(paraElement);
            var endIndices = this.endOffset.split(';');
            var endIndex = parseInt(endIndices[endIndices.length - 1]);
            if (endIndex > paraLength) {
                return true;
            }
            return false;
        };
        Selection.prototype.isRowSelected = function () {
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            if (ej2_base_1.isNullOrUndefined(start.paragraph.associatedCell) ||
                ej2_base_1.isNullOrUndefined(end.paragraph.associatedCell)) {
                return false;
            }
            var row = end.paragraph.associatedCell.ownerRow.getSplitWidgets();
            var firstParagraph;
            var firstcell;
            if (row[0].childWidgets.length > 0) {
                firstcell = row[0].childWidgets[0];
                if (firstcell.childWidgets.length === 0) {
                    return undefined;
                }
                firstParagraph = firstcell.childWidgets[0];
            }
            var lastParagraph;
            var lastRow = row[row.length - 1];
            var lastCell = lastRow.childWidgets[lastRow.childWidgets.length - 1];
            while (lastCell.childWidgets.length === 0 && !ej2_base_1.isNullOrUndefined(lastCell.previousSplitWidget)) {
                lastCell = lastCell.previousSplitWidget;
            }
            lastParagraph = lastCell.childWidgets[lastCell.childWidgets.length - 1];
            return firstcell.equals(firstParagraph.associatedCell) &&
                end.paragraph.associatedCell.equals(lastParagraph.associatedCell)
                && (!firstParagraph.associatedCell.equals(lastParagraph.associatedCell) || (start.offset === 0
                    && end.offset === this.getLineLength(lastParagraph.lastChild) + 1));
        };
        Selection.prototype.getCellBoundsInfo = function () {
            var selectedWidgets = this.getSelectedCells();
            if (selectedWidgets.length > 0) {
                var colFirst = selectedWidgets[0].columnIndex;
                var colLast = selectedWidgets[selectedWidgets.length - 1].columnIndex;
                var rowFirst = selectedWidgets[0].rowIndex;
                var rowLast = selectedWidgets[selectedWidgets.length - 1].rowIndex;
                for (var i = 0; i < selectedWidgets.length; i++) {
                    var widget = selectedWidgets[i];
                    if (widget.columnIndex < colFirst) {
                        colFirst = widget.columnIndex;
                    }
                    if (widget.columnIndex > colLast) {
                        colLast = widget.columnIndex;
                    }
                    if (widget.rowIndex < rowFirst) {
                        rowFirst = widget.rowIndex;
                    }
                    if (widget.rowIndex > rowLast) {
                        rowLast = widget.rowIndex;
                    }
                }
                return { 'column': {
                        'colFirst': colFirst,
                        'colLast': colLast
                    },
                    'row': {
                        'rowFirst': rowFirst,
                        'rowLast': rowLast
                    }
                };
            }
            return undefined;
        };
        Selection.prototype.hasMergedCells = function () {
            var selectedCells = this.getSelectedCells();
            for (var i = 0; i < selectedCells.length; i++) {
                var widget = selectedCells[i];
                if (widget.cellFormat.rowSpan > 1 || widget.cellFormat.columnSpan > 1) {
                    return true;
                }
            }
            return false;
        };
        Selection.prototype.getParagraphInfoInternal = function (line, lineOffset) {
            var paragraph = line.paragraph;
            var offset = this.getParagraphLength(paragraph, line) + lineOffset;
            var previous = paragraph.previousSplitWidget;
            while (previous instanceof page_1.ParagraphWidget) {
                paragraph = previous;
                offset += this.documentHelper.selection.getParagraphLength(paragraph);
                previous = paragraph.previousSplitWidget;
            }
            return { 'paragraph': paragraph, 'offset': offset };
        };
        Selection.prototype.getListTextElementBox = function (paragarph) {
            if (ej2_base_1.isNullOrUndefined(paragarph)) {
                return undefined;
            }
            var listTextElement;
            if (!paragarph.isEmpty()) {
                var lineWidget = paragarph.childWidgets[0];
                if (lineWidget.children.length > 1) {
                    if (lineWidget.children[0] instanceof page_1.ListTextElementBox) {
                        listTextElement = lineWidget.children[0];
                    }
                }
            }
            return listTextElement;
        };
        Selection.prototype.getListLevel = function (paragraph) {
            var currentList = undefined;
            var listLevelNumber = 0;
            if (!ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat) && !ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
                currentList = this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
                listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
            }
            if (!ej2_base_1.isNullOrUndefined(currentList) &&
                !ej2_base_1.isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId))
                && !ej2_base_1.isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId).levels)) {
                return this.documentHelper.layout.getListLevel(currentList, listLevelNumber);
            }
            return undefined;
        };
        Selection.prototype.getTextInline = function (inlineElement, endParagraphWidget, endInline, endIndex, includeObject) {
            var text = '';
            do {
                if (inlineElement === endInline) {
                    if (inlineElement instanceof page_1.TextElementBox) {
                        var span = inlineElement;
                        if (!(ej2_base_1.isNullOrUndefined(span.text) || span.text === '')) {
                            if (span.text.length < endIndex) {
                                text = text + span.text;
                            }
                            else {
                                text = text + span.text.substring(0, endIndex);
                            }
                        }
                    }
                    else if (inlineElement instanceof page_1.ImageElementBox && includeObject && endIndex === inlineElement.length) {
                        text = text + page_1.ElementBox.objectCharacter;
                    }
                    return text;
                }
                if (inlineElement instanceof page_1.TextElementBox) {
                    text = text + inlineElement.text;
                }
                else if (inlineElement instanceof page_1.ImageElementBox && includeObject) {
                    text = text + page_1.ElementBox.objectCharacter;
                }
                else if (inlineElement instanceof page_1.FieldElementBox && !ej2_base_1.isNullOrUndefined(inlineElement.fieldEnd)) {
                    if (!ej2_base_1.isNullOrUndefined(inlineElement.fieldSeparator)) {
                        inlineElement = inlineElement.fieldSeparator;
                    }
                    else {
                        inlineElement = inlineElement.fieldEnd;
                    }
                }
                if (ej2_base_1.isNullOrUndefined(inlineElement.nextNode)) {
                    break;
                }
                inlineElement = inlineElement.nextNode;
            } while (!ej2_base_1.isNullOrUndefined(inlineElement));
            if (endParagraphWidget === inlineElement.line.paragraph) {
                return text;
            }
            var nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(inlineElement.line.paragraph);
            while (!ej2_base_1.isNullOrUndefined(nextParagraphWidget) && nextParagraphWidget.isEmpty()) {
                text = text + '\r';
                if (nextParagraphWidget === endParagraphWidget) {
                    return text;
                }
                nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(nextParagraphWidget);
            }
            if (!ej2_base_1.isNullOrUndefined(nextParagraphWidget) && !nextParagraphWidget.isEmpty()) {
                var lineWidget = nextParagraphWidget.childWidgets[0];
                text = text + '\r' + this.getTextInline(lineWidget.children[0], endParagraphWidget, endInline, endIndex, includeObject);
            }
            return text;
        };
        Selection.prototype.getFieldCode = function (fieldBegin, isSkipTrim) {
            var fieldCode = '';
            if (!ej2_base_1.isNullOrUndefined(fieldBegin) && !(fieldBegin.fieldEnd instanceof page_1.FieldElementBox)) {
                return fieldCode;
            }
            var paragraph = fieldBegin.paragraph;
            var endParagraph = fieldBegin.fieldEnd.paragraph;
            if (fieldBegin.fieldSeparator instanceof page_1.FieldElementBox) {
                endParagraph = fieldBegin.fieldSeparator.paragraph;
            }
            var startLineIndex = fieldBegin.line.indexInOwner;
            var startIndex = fieldBegin.indexInOwner;
            do {
                fieldCode += this.getFieldCodeInternal(paragraph, startLineIndex, startIndex);
                if (paragraph === endParagraph) {
                    break;
                }
                paragraph = this.getNextParagraphBlock(paragraph);
                startLineIndex = 0;
                startIndex = 0;
            } while (paragraph instanceof page_1.ParagraphWidget);
            return isSkipTrim ? fieldCode : fieldCode.trim();
        };
        Selection.prototype.getFieldCodeInternal = function (paragraph, startLineIndex, inlineIndex) {
            var fieldCode = '';
            for (var i = startLineIndex; i < paragraph.childWidgets.length; i++) {
                var line = paragraph.childWidgets[i];
                for (var i_1 = inlineIndex; i_1 < line.children.length; i_1++) {
                    var element = line.children[i_1];
                    if (element instanceof page_1.TextElementBox) {
                        fieldCode += element.text;
                    }
                    if (element instanceof page_1.FieldElementBox
                        && (element.fieldType === 2 || element.fieldType === 1)) {
                        return fieldCode;
                    }
                }
                inlineIndex = 0;
            }
            return fieldCode;
        };
        Selection.prototype.getTocFieldInternal = function () {
            var paragraph = this.start.paragraph;
            if (!this.isEmpty && !this.isForward) {
                paragraph = this.end.paragraph;
            }
            while (paragraph instanceof page_1.ParagraphWidget && paragraph.childWidgets.length > 0) {
                var line = paragraph.firstChild;
                if (line.children.length > 0) {
                    var element = line.children[0];
                    var nextElement = element.nextNode;
                    if (element instanceof page_1.FieldElementBox && element.fieldType === 0 && nextElement instanceof page_1.TextElementBox
                        && nextElement.text.trim().toLowerCase().indexOf('toc') === 0) {
                        return element;
                    }
                }
                paragraph = paragraph.previousRenderedWidget;
            }
            return undefined;
        };
        Selection.prototype.getNextParagraph = function (section) {
            if (section.nextRenderedWidget instanceof page_1.BodyWidget) {
                var block = section.nextRenderedWidget.childWidgets[0];
                return this.documentHelper.getFirstParagraphBlock(block);
            }
            return undefined;
        };
        Selection.prototype.getPreviousParagraph = function (section) {
            if (section.previousRenderedWidget instanceof page_1.BodyWidget) {
                var bodyWidget = section.previousRenderedWidget;
                var block = bodyWidget.childWidgets[bodyWidget.childWidgets.length - 1];
                return this.documentHelper.getLastParagraphBlock(block);
            }
            return undefined;
        };
        Selection.prototype.getNextStartInline = function (line, offset) {
            var indexInInline = 0;
            var inlineObj = line.getInline(offset, indexInInline);
            var inline = inlineObj.element;
            indexInInline = inlineObj.index;
            if ((!ej2_base_1.isNullOrUndefined(inline) && indexInInline === inline.length && inline.nextNode instanceof page_1.FieldElementBox)
                || inline instanceof page_1.ShapeElementBox) {
                var nextValidInline = this.getNextValidElement(inline.nextNode);
                if (nextValidInline instanceof page_1.FieldElementBox && nextValidInline.fieldType === 0) {
                    inline = nextValidInline;
                }
            }
            return inline;
        };
        Selection.prototype.getPreviousTextInline = function (inline) {
            if (inline.previousNode instanceof page_1.TextElementBox) {
                return inline.previousNode;
            }
            if (inline.previousNode instanceof page_1.FieldElementBox && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline.previousNode)) {
                if (inline.previousNode.fieldType === 0 || inline.previousNode.fieldType === 1) {
                    return inline.previousNode;
                }
                return inline.previousNode.fieldBegin;
            }
            if (!ej2_base_1.isNullOrUndefined(inline.previousNode)) {
                return this.getPreviousTextInline((inline.previousNode));
            }
            return undefined;
        };
        Selection.prototype.getNextTextInline = function (inline) {
            if (inline.nextNode instanceof page_1.TextElementBox) {
                return inline.nextNode;
            }
            if (inline.nextNode instanceof page_1.FieldElementBox && (editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline.nextNode))) {
                if (inline.nextNode.fieldType === 1 || inline.nextNode.fieldType === 0) {
                    return inline.nextNode;
                }
                return inline.nextNode.fieldEnd;
            }
            if (!ej2_base_1.isNullOrUndefined(inline.nextNode)) {
                return this.getNextTextInline((inline.nextNode));
            }
            return undefined;
        };
        Selection.prototype.getContainerTable = function (block) {
            if (block.isInsideTable) {
                if (block.associatedCell.ownerTable.isInsideTable) {
                    block = this.getContainerTable(block.associatedCell.ownerTable);
                }
                else {
                    block = block.associatedCell.ownerTable;
                }
            }
            if (block instanceof page_1.TableWidget) {
                return block;
            }
            return undefined;
        };
        Selection.prototype.isElementInSelection = function (element, isStart) {
            var offset = element.line.getOffset(element, isStart ? 0 : 1);
            var elemPosition = new selection_helper_1.TextPosition(this.owner);
            elemPosition.setPositionParagraph(element.line, offset);
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            return ((elemPosition.isExistAfter(start) || elemPosition.isAtSamePosition(start))
                && (elemPosition.isExistBefore(end) || elemPosition.isAtSamePosition(end)));
        };
        Selection.prototype.isSelectionInsideElement = function (element) {
            if (this.isEmpty) {
                var startOffset = element.line.getOffset(element, 0);
                var startPosition = new selection_helper_1.TextPosition(this.owner);
                startPosition.setPositionParagraph(element.line, startOffset);
                var endOffset = element.line.getOffset(element, element.length);
                var endPosition = new selection_helper_1.TextPosition(this.owner);
                endPosition.setPositionParagraph(element.line, endOffset);
                return ((this.start.isExistAfter(startPosition) || this.start.isAtSamePosition(startPosition))
                    && (this.start.isExistBefore(endPosition) || this.start.isAtSamePosition(endPosition)));
            }
            return false;
        };
        Selection.prototype.isExistBefore = function (start, block) {
            if (start.isInsideTable) {
                var cell1 = start.associatedCell;
                if (block.isInsideTable) {
                    var cell2 = block.associatedCell;
                    if (cell1 === cell2) {
                        return cell1.childWidgets.indexOf(start) < cell1.childWidgets.indexOf(block);
                    }
                    if (cell1.ownerRow === cell2.ownerRow) {
                        return cell1.cellIndex < cell2.cellIndex;
                    }
                    if (cell1.ownerTable === cell2.ownerTable) {
                        return cell1.ownerRow.rowIndex < cell2.ownerRow.rowIndex;
                    }
                    var containerCell = this.getContainerCellOf(cell1, cell2);
                    if (containerCell.ownerTable.contains(cell2)) {
                        cell1 = this.getSelectedCell(cell1, containerCell);
                        cell2 = this.getSelectedCell(cell2, containerCell);
                        if (cell1 === containerCell) {
                            return this.isExistBefore(start, cell2.ownerTable);
                        }
                        if (cell2 === containerCell) {
                            return this.isExistBefore(cell1.ownerTable, block);
                        }
                        if (containerCell.ownerRow === cell2.ownerRow) {
                            return containerCell.cellIndex < cell2.cellIndex;
                        }
                        if (containerCell.ownerTable === cell2.ownerTable) {
                            return containerCell.ownerRow.rowIndex < cell2.ownerRow.rowIndex;
                        }
                        return this.isExistBefore(cell1.ownerTable, cell2.ownerTable);
                    }
                    return this.isExistBefore(containerCell.ownerTable, this.getContainerTable(cell2.ownerTable));
                }
                else {
                    var ownerTable = this.getContainerTable(start);
                    return this.isExistBefore(ownerTable, block);
                }
            }
            else if (block.isInsideTable) {
                var ownerTable = this.getContainerTable(block);
                return this.isExistBefore(start, ownerTable);
            }
            else {
                {
                    if (start.containerWidget === block.containerWidget) {
                        return start.index <
                            block.index;
                    }
                    if ((start.containerWidget instanceof page_1.BodyWidget && block.containerWidget instanceof page_1.BodyWidget)) {
                        var startPage = this.documentHelper.pages.indexOf(start.containerWidget.page);
                        var endPage = this.documentHelper.pages.indexOf(block.containerWidget.page);
                        if (startPage === endPage) {
                            return start.containerWidget.indexInOwner < block.containerWidget.indexInOwner;
                        }
                        if (startPage === endPage && start.containerWidget.containerWidget instanceof page_1.FootNoteWidget && block.containerWidget.containerWidget instanceof page_1.FootNoteWidget) {
                            var startindex = this.documentHelper.pages[startPage].footnoteWidget.bodyWidgets.indexOf(start.containerWidget);
                            var endindex = this.documentHelper.pages[endPage].footnoteWidget.bodyWidgets.indexOf(block.containerWidget);
                            return startindex < endindex;
                        }
                        else if (startPage === endPage && start.containerWidget.index !== block.containerWidget.index) {
                            var startindex = this.documentHelper.pages[startPage].bodyWidgets.indexOf(start.containerWidget);
                            var endindex = this.documentHelper.pages[endPage].bodyWidgets.indexOf(block.containerWidget);
                            return startindex < endindex;
                        }
                        else {
                            return startPage < endPage;
                        }
                    }
                }
            }
            return false;
        };
        Selection.prototype.isExistAfter = function (start, block) {
            if (start.isInsideTable) {
                var cell1 = start.associatedCell;
                if (block.isInsideTable) {
                    var cell2 = block.associatedCell;
                    if (cell1 === cell2) {
                        return cell1.childWidgets.indexOf(start) > cell1.childWidgets.indexOf(block);
                    }
                    if (cell1.ownerRow === cell2.ownerRow) {
                        return cell1.cellIndex > cell2.cellIndex;
                    }
                    if (cell1.ownerTable === cell2.ownerTable) {
                        return cell1.ownerRow.rowIndex > cell2.ownerRow.rowIndex;
                    }
                    var containerCell = this.getContainerCellOf(cell1, cell2);
                    if (containerCell.ownerTable.contains(cell2)) {
                        cell1 = this.getSelectedCell(cell1, containerCell);
                        cell2 = this.getSelectedCell(cell2, containerCell);
                        if (cell1 === containerCell) {
                            return this.isExistAfter(start, cell2.ownerTable);
                        }
                        if (cell2 === containerCell) {
                            return this.isExistAfter(cell1.ownerTable, block);
                        }
                        if (containerCell.ownerRow === cell2.ownerRow) {
                            return containerCell.cellIndex > cell2.cellIndex;
                        }
                        if (containerCell.ownerTable === cell2.ownerTable) {
                            return containerCell.ownerRow.rowIndex > cell2.ownerRow.rowIndex;
                        }
                        return this.isExistAfter(cell1.ownerTable, cell2.ownerTable);
                    }
                    return this.isExistAfter(containerCell.ownerTable, this.getContainerTable(cell2.ownerTable));
                }
                else {
                    var ownerTable = this.getContainerTable(start);
                    return this.isExistAfter(ownerTable, block);
                }
            }
            else if (block.isInsideTable) {
                var ownerTable = this.getContainerTable(block);
                return this.isExistAfter(start, ownerTable);
            }
            else {
                if (start.containerWidget === block.containerWidget) {
                    return start.index >
                        block.index;
                }
                if ((start.containerWidget instanceof page_1.BodyWidget && block.containerWidget instanceof page_1.BodyWidget) || (start.containerWidget instanceof page_1.FootNoteWidget && block.containerWidget instanceof page_1.FootNoteWidget)) {
                    var startPage = this.documentHelper.pages.indexOf(start.containerWidget.page);
                    var endPage = this.documentHelper.pages.indexOf(block.containerWidget.page);
                    return startPage > endPage;
                }
            }
            return false;
        };
        Selection.prototype.isExistBeforeInline = function (currentInline, inline) {
            if (currentInline.line === inline.line) {
                return currentInline.line.children.indexOf(currentInline) <=
                    inline.line.children.indexOf(inline);
            }
            if (currentInline.line.paragraph === inline.line.paragraph) {
                return currentInline.line.paragraph.childWidgets.indexOf(currentInline.line)
                    < inline.line.paragraph.childWidgets.indexOf(inline.line);
            }
            var startParagraph = currentInline.line.paragraph;
            var endParagraph = inline.line.paragraph;
            if (startParagraph.containerWidget === endParagraph.containerWidget) {
                if (startParagraph.isInsideTable) {
                    return startParagraph.associatedCell.childWidgets.indexOf(startParagraph) <
                        endParagraph.associatedCell.childWidgets.indexOf(endParagraph);
                }
                else if (startParagraph.containerWidget instanceof page_1.HeaderFooterWidget) {
                }
                else {
                    return startParagraph.containerWidget.childWidgets.indexOf(startParagraph) <
                        endParagraph.containerWidget.childWidgets.indexOf(endParagraph);
                }
            }
            return this.isExistBefore(startParagraph, endParagraph);
        };
        Selection.prototype.isExistAfterInline = function (currentInline, inline, isRetrieve) {
            if (currentInline.line === inline.line) {
                var selection = this.documentHelper.selection;
                if (isRetrieve) {
                    return currentInline.line.children.indexOf(currentInline) >=
                        inline.line.children.indexOf(inline);
                }
                else if (currentInline === inline && selection.start.offset !== selection.end.offset) {
                    return currentInline.line.children.indexOf(currentInline) ===
                        inline.line.children.indexOf(inline);
                }
                else {
                    return currentInline.line.children.indexOf(currentInline) >
                        inline.line.children.indexOf(inline);
                }
            }
            if (currentInline.line.paragraph === inline.line.paragraph) {
                return currentInline.line.paragraph.childWidgets.indexOf(currentInline.line)
                    > inline.line.paragraph.childWidgets.indexOf(inline.line);
            }
            var startParagraph = currentInline.line.paragraph;
            var endParagraph = inline.line.paragraph;
            if (startParagraph.containerWidget === endParagraph.containerWidget) {
                if (startParagraph.isInsideTable) {
                    return startParagraph.associatedCell.childWidgets.indexOf(startParagraph) >
                        endParagraph.associatedCell.childWidgets.indexOf(endParagraph);
                }
                else if (startParagraph.containerWidget instanceof page_1.HeaderFooterWidget) {
                }
                else {
                    return startParagraph.containerWidget.childWidgets.indexOf(startParagraph) >
                        endParagraph.containerWidget.childWidgets.indexOf(endParagraph);
                }
            }
            return this.isExistAfter(startParagraph, endParagraph);
        };
        Selection.prototype.getNextRenderedBlock = function (block) {
            if (ej2_base_1.isNullOrUndefined(block.nextWidget)) {
                return block.nextRenderedWidget;
            }
            return block.nextWidget;
        };
        Selection.prototype.getPreviousRenderedBlock = function (block) {
            if (ej2_base_1.isNullOrUndefined(block.previousWidget)) {
                return block.previousRenderedWidget;
            }
            return block.previousWidget;
        };
        Selection.prototype.getNextParagraphBlock = function (block) {
            if (block.nextRenderedWidget instanceof page_1.ParagraphWidget) {
                return block.nextRenderedWidget;
            }
            else if (block.nextRenderedWidget instanceof page_1.TableWidget) {
                return this.documentHelper.getFirstParagraphInFirstCell(block.nextRenderedWidget);
            }
            if (block.containerWidget instanceof page_1.TableCellWidget) {
                return this.getNextParagraphCell(block.containerWidget);
            }
            else if (block.containerWidget instanceof page_1.BodyWidget) {
                var bodyWidget = block.containerWidget;
                return this.getNextParagraph(block.containerWidget);
            }
            else if (block.containerWidget instanceof page_1.HeaderFooterWidget && this.isMoveDownOrMoveUp) {
                return this.getFirstBlockInNextHeaderFooter(block);
            }
            return undefined;
        };
        Selection.prototype.getFirstBlockInNextHeaderFooter = function (block) {
            var headerFooter = block.containerWidget;
            var nextBlock;
            if (headerFooter.headerFooterType.indexOf('Header') !== -1) {
                nextBlock = headerFooter.page.footerWidget.firstChild;
            }
            else if (headerFooter.page.nextPage) {
                var nextPage = headerFooter.page.nextPage;
                var headerWidget = nextPage.headerWidget;
                headerWidget.page = nextPage;
                if (nextPage.footerWidget) {
                    nextPage.footerWidget.page = nextPage;
                }
                nextBlock = headerWidget.firstChild;
            }
            else {
                return undefined;
            }
            if (nextBlock instanceof page_1.ParagraphWidget) {
                return nextBlock;
            }
            else {
                return this.getFirstBlockInFirstCell(nextBlock);
            }
        };
        Selection.prototype.getLastBlockInPreviousHeaderFooter = function (block) {
            var headerFooter = block.containerWidget;
            var previousBlock;
            if (headerFooter.headerFooterType.indexOf('Footer') !== -1) {
                previousBlock = headerFooter.page.headerWidget.lastChild;
            }
            else if (headerFooter.page.previousPage) {
                var previousPage = headerFooter.page.previousPage;
                var footerWidget = previousPage.footerWidget;
                footerWidget.page = previousPage;
                if (previousPage.headerWidget) {
                    previousPage.headerWidget.page = previousPage;
                }
                previousBlock = footerWidget.lastChild;
            }
            else {
                return undefined;
            }
            if (previousBlock instanceof page_1.ParagraphWidget) {
                return previousBlock;
            }
            else {
                return this.getFirstBlockInFirstCell(previousBlock);
            }
        };
        Selection.prototype.getPreviousParagraphBlock = function (block, isAutoList) {
            if (block.previousRenderedWidget instanceof page_1.ParagraphWidget) {
                return block.previousRenderedWidget;
            }
            else if (block.previousRenderedWidget instanceof page_1.TableWidget) {
                return this.documentHelper.getLastParagraphInLastCell((block.previousRenderedWidget));
            }
            if (block.containerWidget instanceof page_1.TableCellWidget) {
                return this.getPreviousParagraphCell((block.containerWidget));
            }
            else if (block.containerWidget instanceof page_1.BodyWidget) {
                return this.getPreviousParagraph(block.containerWidget);
            }
            else if (block.containerWidget instanceof page_1.HeaderFooterWidget && this.isMoveDownOrMoveUp && !isAutoList) {
                return this.getLastBlockInPreviousHeaderFooter(block);
            }
            return undefined;
        };
        Selection.prototype.hasValidInline = function (paragraph, start, end) {
            var index = paragraph.childWidgets.indexOf(start.line);
            for (var i = index; i < paragraph.childWidgets.length; i++) {
                for (var j = 0; j < paragraph.childWidgets[i].children.length; j++) {
                    var inline = paragraph.childWidgets[i].children[j];
                    if (inline.length === 0) {
                        continue;
                    }
                    if (inline === end) {
                        return false;
                    }
                    if (inline instanceof page_1.TextElementBox || inline instanceof page_1.ImageElementBox
                        || (inline instanceof page_1.FieldElementBox && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline))) {
                        return true;
                    }
                }
            }
            return false;
        };
        Selection.prototype.getParagraphLength = function (paragraph, endLine, elementInfo, includeShape) {
            var length = 0;
            if (!ej2_base_1.isNullOrUndefined(paragraph)) {
                for (var j = 0; j < paragraph.childWidgets.length; j++) {
                    var line = paragraph.childWidgets[j];
                    if (endLine instanceof page_1.LineWidget && endLine === line) {
                        if (elementInfo) {
                            length += this.getLineLength(line, elementInfo, includeShape);
                        }
                        break;
                    }
                    length += this.getLineLength(line, undefined, includeShape);
                }
            }
            return length;
        };
        Selection.prototype.getLineLength = function (line, elementInfo, includeShape) {
            var length = 0;
            var bidi = line.paragraph.bidi;
            for (var i = !bidi ? 0 : line.children.length - 1; bidi ? i > -1 : i < line.children.length; bidi ? i-- : i++) {
                var element = line.children[i];
                if (element instanceof page_1.ListTextElementBox) {
                    continue;
                }
                if (includeShape) {
                    if (element instanceof page_1.ShapeElementBox) {
                        for (var m = 0; m < element.textFrame.childWidgets.length; m++) {
                            var para = element.textFrame.childWidgets[m];
                            length += this.getParagraphLength(para) + 1;
                        }
                    }
                    else if (element instanceof page_1.FootnoteElementBox) {
                        for (var m = 0; m < element.bodyWidget.childWidgets.length; m++) {
                            var para = element.bodyWidget.childWidgets[m];
                            length += this.getParagraphLength(para) + 1;
                        }
                    }
                }
                if (elementInfo && elementInfo.element instanceof page_1.ElementBox && elementInfo.element === element) {
                    length += elementInfo.index;
                    break;
                }
                length += element.length;
            }
            return length;
        };
        Selection.prototype.getLineInfo = function (paragraph, offset) {
            var line = undefined;
            var length = 0;
            var childLength = paragraph.childWidgets.length;
            for (var j = 0; j < childLength; j++) {
                line = paragraph.childWidgets[j];
                length = this.getLineLength(line);
                if (offset <= length || j === childLength - 1) {
                    break;
                }
                else {
                    offset = offset - length;
                }
            }
            return { 'line': line, 'offset': offset };
        };
        Selection.prototype.getElementInfo = function (line, offset) {
            var index = 0;
            var element = undefined;
            for (var i = 0; i < line.children.length; i++) {
                element = line.children[i];
                if (element instanceof page_1.ListTextElementBox) {
                    continue;
                }
                if (offset > element.length
                    && (!(offset === element.length + 1 && ej2_base_1.isNullOrUndefined(element.nextNode)))) {
                    offset = offset - element.length;
                }
                else {
                    break;
                }
            }
            return { 'element': element, 'index': offset };
        };
        Selection.prototype.getStartOffset = function (paragraph) {
            var startOffset = 0;
            if (paragraph.childWidgets.length > 0) {
                var childWidgets = paragraph.childWidgets[0];
                return this.getStartLineOffset(childWidgets);
            }
            return startOffset;
        };
        Selection.prototype.getStartLineOffset = function (line) {
            var startOffset = 0;
            for (var i = 0; i < line.children.length; i++) {
                var inline = line.children[i];
                if (inline.length === 0) {
                    continue;
                }
                if (inline instanceof page_1.TextElementBox || inline instanceof page_1.ImageElementBox || inline instanceof page_1.BookmarkElementBox
                    || inline instanceof page_1.ShapeElementBox || inline instanceof page_1.EditRangeStartElementBox
                    || inline instanceof page_1.EditRangeEndElementBox || inline instanceof page_1.CommentCharacterElementBox
                    || (inline instanceof page_1.FieldElementBox && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline))
                    || inline instanceof page_1.ContentControl) {
                    return startOffset;
                }
                if (inline instanceof page_1.ListTextElementBox) {
                    continue;
                }
                startOffset += inline.length;
            }
            return startOffset;
        };
        Selection.prototype.getPreviousSelectionCell = function (cell) {
            if (!ej2_base_1.isNullOrUndefined(cell.previousRenderedWidget)) {
                if (!this.isForward) {
                    var block = cell.previousRenderedWidget.childWidgets[0];
                    if (block instanceof page_1.ParagraphWidget) {
                        return block;
                    }
                    else {
                        return this.documentHelper.getFirstParagraphInLastRow(block);
                    }
                }
                else {
                    var widgets = cell.previousRenderedWidget.childWidgets;
                    var block = widgets[widgets.length - 1];
                    if (block instanceof page_1.ParagraphWidget) {
                        return block;
                    }
                    else {
                        return this.getPreviousParagraphSelection(block.childWidgets[block.childWidgets.length - 1]);
                    }
                }
            }
            return this.getPreviousSelectionRow(cell.ownerRow);
        };
        Selection.prototype.getPreviousSelectionRow = function (row) {
            if (!ej2_base_1.isNullOrUndefined(row.previousRenderedWidget)) {
                if (!this.isForward) {
                    var cell = row.previousRenderedWidget.childWidgets[0];
                    var block = cell.childWidgets[0];
                    return this.documentHelper.getFirstParagraphBlock(block);
                }
                else {
                    return this.getPreviousParagraphSelection(row.previousRenderedWidget);
                }
            }
            return this.getPreviousSelectionBlock(row.ownerTable);
        };
        Selection.prototype.getNextSelectionBlock = function (block) {
            if (block.nextRenderedWidget instanceof page_1.ParagraphWidget) {
                return block.nextRenderedWidget;
            }
            else if (block.nextRenderedWidget instanceof page_1.TableWidget) {
                if (this.isEmpty || this.isForward) {
                    return this.documentHelper.getLastParagraphInFirstRow(block.nextRenderedWidget);
                }
                else {
                    return this.getNextParagraphSelection(block.nextRenderedWidget.childWidgets[0]);
                }
            }
            if (block.containerWidget instanceof page_1.TableCellWidget) {
                return this.getNextSelectionCell(block.containerWidget);
            }
            else if (block.containerWidget instanceof page_1.BodyWidget) {
                return this.getNextSelection(block.containerWidget);
            }
            return undefined;
        };
        Selection.prototype.getNextSelectionCell = function (cell) {
            if (!ej2_base_1.isNullOrUndefined(cell.nextRenderedWidget)) {
                if (this.isEmpty || this.isForward) {
                    var block = cell.nextRenderedWidget.childWidgets[cell.nextRenderedWidget.childWidgets.length - 1];
                    return this.documentHelper.getLastParagraphBlock(block);
                }
                else {
                    var block = cell.nextRenderedWidget.childWidgets[0];
                    if (block instanceof page_1.ParagraphWidget) {
                        return block;
                    }
                    else {
                        return this.getNextParagraphSelection(block.childWidgets[0]);
                    }
                }
            }
            return this.getNextSelectionRow(cell.ownerRow);
        };
        Selection.prototype.getNextSelectionRow = function (row) {
            if (!ej2_base_1.isNullOrUndefined(row.nextRenderedWidget)) {
                var isForwardSelection = this.isEmpty || this.isForward;
                if (isForwardSelection) {
                    var cell = row.nextRenderedWidget.childWidgets[row.nextRenderedWidget.childWidgets.length - 1];
                    var block = cell.childWidgets[cell.childWidgets.length - 1];
                    return this.documentHelper.getLastParagraphBlock(block);
                }
                else {
                    return this.getNextParagraphSelection(row.nextRenderedWidget);
                }
            }
            return this.getNextSelectionBlock(row.ownerTable);
        };
        Selection.prototype.getNextSelection = function (section) {
            if (section.nextRenderedWidget instanceof page_1.BodyWidget) {
                var block = section.nextRenderedWidget.childWidgets[0];
                if (block instanceof page_1.ParagraphWidget) {
                    return block;
                }
                else {
                    if (this.isEmpty || this.isForward) {
                        return this.documentHelper.getLastParagraphInFirstRow(block);
                    }
                    else {
                        return this.getNextParagraphSelection(block.childWidgets[0]);
                    }
                }
            }
            return undefined;
        };
        Selection.prototype.getNextParagraphSelection = function (row) {
            var cell = row.childWidgets[0];
            if (this.start.paragraph.isInsideTable
                && row.ownerTable.contains(this.start.paragraph.associatedCell)) {
                var startCell = this.getCellInTable(row.ownerTable, this.start.paragraph.associatedCell);
                cell = this.getFirstCellInRegion(row, startCell, this.upDownSelectionLength, false);
            }
            var block = cell.childWidgets[0];
            return this.documentHelper.getFirstParagraphBlock(block);
        };
        Selection.prototype.getPreviousSelectionBlock = function (block) {
            if (block.previousRenderedWidget instanceof page_1.ParagraphWidget) {
                return block.previousRenderedWidget;
            }
            else if (block.previousRenderedWidget instanceof page_1.TableWidget) {
                if (!this.isForward) {
                    return this.documentHelper.getFirstParagraphInLastRow(block.previousRenderedWidget);
                }
                else {
                    return this.getPreviousParagraphSelection(block.previousRenderedWidget.childWidgets[block.previousRenderedWidget.childWidgets.length - 1]);
                }
            }
            if (block.containerWidget instanceof page_1.TableCellWidget) {
                return this.getPreviousSelectionCell(block.containerWidget);
            }
            else if (block.containerWidget instanceof page_1.BodyWidget) {
                return this.getPreviousSelection(block.containerWidget);
            }
            return undefined;
        };
        Selection.prototype.getPreviousSelection = function (section) {
            if (section.previousRenderedWidget instanceof page_1.BodyWidget) {
                var prevBodyWidget = section.previousRenderedWidget;
                var block = prevBodyWidget.childWidgets[prevBodyWidget.childWidgets.length - 1];
                if (block instanceof page_1.ParagraphWidget) {
                    return block;
                }
                else {
                    if (!this.isForward) {
                        return this.documentHelper.getFirstParagraphInLastRow(block);
                    }
                    else {
                        var tableWidget = block;
                        return this.getPreviousParagraphSelection(tableWidget.childWidgets[tableWidget.childWidgets.length - 1]);
                    }
                }
            }
            return undefined;
        };
        Selection.prototype.getPreviousParagraphSelection = function (row) {
            var cell = row.childWidgets[row.childWidgets.length - 1];
            if (this.start.paragraph.isInsideTable
                && row.ownerTable.contains(this.start.paragraph.associatedCell)) {
                var startCell = this.getCellInTable(row.ownerTable, this.start.paragraph.associatedCell);
                cell = this.getLastCellInRegion(row, startCell, this.upDownSelectionLength, true);
            }
            var block = cell.childWidgets[cell.childWidgets.length - 1];
            return this.documentHelper.getLastParagraphBlock(block);
        };
        Selection.prototype.getLastCellInRegion = function (row, startCell, selLength, isMovePrev) {
            var start = this.getCellLeft(row, startCell);
            var end = start + startCell.cellFormat.cellWidth;
            var flag = true;
            if (start <= selLength && selLength < end) {
                for (var i = row.childWidgets.length - 1; i >= 0; i--) {
                    var left = this.getCellLeft(row, row.childWidgets[i]);
                    if (editor_helper_1.HelperMethods.round(start, 2) <= editor_helper_1.HelperMethods.round(left, 2) &&
                        editor_helper_1.HelperMethods.round(left, 2) < editor_helper_1.HelperMethods.round(end, 2)) {
                        flag = false;
                        return row.childWidgets[i];
                    }
                }
            }
            else {
                for (var i = row.childWidgets.length - 1; i >= 0; i--) {
                    var left = this.getCellLeft(row, row.childWidgets[i]);
                    if (left <= selLength && left + row.childWidgets[i].cellFormat.cellWidth > selLength) {
                        flag = false;
                        return row.childWidgets[i];
                    }
                }
            }
            if (flag) {
                if (!ej2_base_1.isNullOrUndefined(row.previousRenderedWidget) && isMovePrev) {
                    return this.getLastCellInRegion(row.previousRenderedWidget, startCell, selLength, isMovePrev);
                }
                else if (!ej2_base_1.isNullOrUndefined(row.nextRenderedWidget) && !isMovePrev) {
                    return this.getLastCellInRegion(row.nextRenderedWidget, startCell, selLength, isMovePrev);
                }
            }
            return row.childWidgets[row.childWidgets.length - 1];
        };
        Selection.prototype.getCellInTable = function (table, tableCell) {
            while (tableCell.ownerTable.isInsideTable) {
                if (table.equals(tableCell.ownerTable)) {
                    return tableCell;
                }
                tableCell = tableCell.ownerTable.associatedCell;
            }
            return tableCell;
        };
        Selection.prototype.getPreviousValidOffset = function (paragraph, offset) {
            if (offset === 0) {
                return 0;
            }
            var validOffset = 0;
            var count = 0;
            var value = 0;
            var bidi = paragraph.paragraphFormat.bidi;
            for (var i = 0; i < paragraph.childWidgets.length; i++) {
                var lineWidget = paragraph.childWidgets[i];
                for (var j = 0; j < lineWidget.children.length; j++) {
                    var inline = lineWidget.children[j];
                    if (inline.length === 0 || inline instanceof page_1.ListTextElementBox) {
                        continue;
                    }
                    if (offset <= count + inline.length) {
                        return offset - 1 === count ? validOffset : offset - 1;
                    }
                    if (inline instanceof page_1.TextElementBox || inline instanceof page_1.ImageElementBox || inline instanceof page_1.BookmarkElementBox
                        || (inline instanceof page_1.FieldElementBox && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline))) {
                        validOffset = count + inline.length;
                    }
                    count += inline.length;
                }
            }
            return offset - 1 === count ? validOffset : offset - 1;
        };
        Selection.prototype.getNextValidOffset = function (line, offset) {
            var count = 0;
            for (var i = 0; i < line.children.length; i++) {
                var inline = line.children[i];
                if (inline.length === 0 || inline instanceof page_1.ListTextElementBox) {
                    continue;
                }
                if (offset < count + inline.length) {
                    if (inline instanceof page_1.TextElementBox || inline instanceof page_1.ImageElementBox
                        || (inline instanceof page_1.FieldElementBox && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline))) {
                        return (offset > count ? offset : count) + 1;
                    }
                }
                if (offset === count + inline.length && inline instanceof page_1.FieldElementBox &&
                    inline.fieldType === 1 && inline.previousNode instanceof page_1.ImageElementBox) {
                    return offset;
                }
                count += inline.length;
            }
            return offset;
        };
        Selection.prototype.getParagraphMarkSize = function (paragraph, topMargin, bottomMargin) {
            var size = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat);
            var baselineOffset = size.BaselineOffset;
            var maxHeight = size.Height;
            var maxBaselineOffset = baselineOffset;
            if (paragraph instanceof page_1.ParagraphWidget) {
                if (paragraph.childWidgets.length > 0) {
                    var lineWidget = paragraph.childWidgets[0];
                }
                var lineSpacing = this.documentHelper.layout.getLineSpacing(paragraph, maxHeight);
                var beforeSpacing = this.documentHelper.layout.getBeforeSpacing(paragraph);
                topMargin = maxBaselineOffset - baselineOffset;
                bottomMargin = maxHeight - maxBaselineOffset - (size.Height - baselineOffset);
                var lineSpacingType = paragraph.paragraphFormat.lineSpacingType;
                if (lineSpacingType === 'Multiple') {
                    if (lineSpacing > maxHeight) {
                        bottomMargin += lineSpacing - maxHeight;
                    }
                    else {
                        topMargin += lineSpacing - maxHeight;
                    }
                }
                else if (lineSpacingType === 'Exactly') {
                    topMargin += lineSpacing - (topMargin + size.Height + bottomMargin);
                }
                else if (lineSpacing > topMargin + size.Height + bottomMargin) {
                    topMargin += lineSpacing - (topMargin + size.Height + bottomMargin);
                }
                topMargin += beforeSpacing;
                bottomMargin += this.documentHelper.layout.getAfterSpacing(paragraph);
            }
            return { 'width': size.Width, 'height': size.Height, 'topMargin': topMargin, 'bottomMargin': bottomMargin };
        };
        Selection.prototype.getPhysicalPositionInternal = function (line, offset, moveNextLine) {
            if (line.paragraph.isEmpty()) {
                var paragraphWidget = line.paragraph;
                var left = paragraphWidget.x;
                if (paragraphWidget.childWidgets.length > 0) {
                    var lineWidget = paragraphWidget.childWidgets[0];
                    left = this.getLeft(lineWidget);
                }
                var topMargin = 0;
                var bottomMargin = 0;
                var size = this.getParagraphMarkSize(line.paragraph, topMargin, bottomMargin);
                if (offset > 0 || (offset === 0 && paragraphWidget.isEmpty() && paragraphWidget.bidi)) {
                    left += size.width;
                }
                return new editor_helper_1.Point(left, paragraphWidget.y + size.topMargin);
            }
            else {
                var indexInInline = 0;
                var inlineObj = line.getInline(offset, indexInInline, line.paragraph.bidi);
                var inline = inlineObj.element;
                indexInInline = inlineObj.index;
                return this.getPhysicalPositionInline(inline, indexInInline, moveNextLine);
            }
        };
        Selection.prototype.highlightSelectedContent = function (start, end) {
            if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
                || (!start.paragraph.associatedCell.equals(end.paragraph.associatedCell))
                || (!this.documentHelper.isSelectionChangedOnMouseMoved && this.isCellSelected(start.paragraph.associatedCell, start, end))
                || this.isCellPrevSelected)) {
                this.highlightCell(start.paragraph.associatedCell, this, start, end);
                this.isCellPrevSelected = true;
            }
            else {
                var inline = undefined;
                var index = 0;
                if (!this.owner.isReadOnlyMode && start.paragraph === end.paragraph) {
                    if (start.offset + 1 === end.offset) {
                        var inlineObj = end.currentWidget.getInline(end.offset, index);
                        inline = inlineObj.element;
                        index = inlineObj.index;
                        if (inline instanceof page_1.ImageElementBox || inline instanceof page_1.ShapeElementBox) {
                            var startOffset = start.currentWidget.getOffset(inline, 0);
                            if (startOffset !== start.offset) {
                                inline = undefined;
                            }
                        }
                    }
                    else {
                        var indexInInline = 0;
                        var startInlineObj = start.currentWidget.getInline(start.offset, indexInInline);
                        var startInline = startInlineObj.element;
                        indexInInline = startInlineObj.index;
                        if (indexInInline === startInline.length) {
                            startInline = this.getNextRenderedElementBox(startInline, indexInInline);
                        }
                        var endInlineObj = end.currentWidget.getInline(end.offset, indexInInline);
                        var endInline = endInlineObj.element;
                        indexInInline = endInlineObj.index;
                        if (startInline instanceof page_1.FieldElementBox && endInline instanceof page_1.FieldElementBox && !ej2_base_1.isNullOrUndefined(startInline.fieldSeparator)) {
                            var fieldValue = startInline.fieldSeparator.nextNode;
                            if (fieldValue instanceof page_1.ImageElementBox && fieldValue.nextNode === endInline) {
                                inline = fieldValue;
                            }
                        }
                    }
                }
                if (!this.owner.isReadOnlyMode && this.owner.isDocumentLoaded && (inline instanceof page_1.ImageElementBox || inline instanceof page_1.ShapeElementBox)) {
                    var elementBoxObj = this.getElementBoxInternal(inline, index);
                    var elementBox = elementBoxObj.element;
                    index = elementBoxObj.index;
                    if (this.owner.enableImageResizerMode) {
                        this.owner.imageResizerModule.positionImageResizer(elementBox);
                        this.owner.imageResizerModule.showImageResizer();
                    }
                    if (this.documentHelper.isTouchInput) {
                        this.documentHelper.touchStart.style.display = 'none';
                        this.documentHelper.touchEnd.style.display = 'none';
                    }
                }
                else {
                    if (start.paragraph.isInsideTable
                        && start.paragraph.associatedCell.equals(end.paragraph.associatedCell)
                        && end.paragraph.equals(this.getLastParagraph(end.paragraph.associatedCell))
                        && (this.getParagraphLength(end.paragraph) + 1) == end.offset) {
                        end.offset--;
                    }
                    this.highlight(start.paragraph, start, end);
                    if (this.isHighlightNext) {
                        this.highlightNextBlock(this.hightLightNextParagraph, start, end);
                        this.isHighlightNext = false;
                        this.hightLightNextParagraph = undefined;
                    }
                }
                if (this.isInShape) {
                    this.showResizerForShape();
                }
            }
        };
        Selection.prototype.showResizerForShape = function () {
            var shape = this.getCurrentTextFrame().containerShape;
            this.owner.imageResizerModule.positionImageResizer(shape);
            this.owner.imageResizerModule.showImageResizer();
        };
        Selection.prototype.highlight = function (paragraph, start, end) {
            var selectionStartIndex = 0;
            var selectionEndIndex = 0;
            var startElement = undefined;
            var endElement = undefined;
            var startLineWidget = undefined;
            var endLineWidget = undefined;
            var startLineObj = this.getStartLineWidget(paragraph, start, startElement, selectionStartIndex);
            startElement = startLineObj.element;
            if (ej2_base_1.isNullOrUndefined(startElement)) {
                startLineWidget = paragraph.childWidgets[0];
            }
            else {
                startLineWidget = startElement.line;
            }
            selectionStartIndex = startLineObj.index;
            var endLineObj = this.getEndLineWidget(end, endElement, selectionEndIndex);
            endElement = endLineObj.element;
            if (endElement) {
                endLineWidget = endElement.line;
            }
            else {
                endLineWidget = end.paragraph.childWidgets[end.paragraph.childWidgets.length - 1];
            }
            selectionEndIndex = endLineObj.index;
            var top = 0;
            var left = 0;
            if (!ej2_base_1.isNullOrUndefined(startLineWidget)) {
                top = this.getTop(startLineWidget);
                left = this.getLeftInternal(startLineWidget, startElement, selectionStartIndex);
            }
            if (!ej2_base_1.isNullOrUndefined(startLineWidget) && startLineWidget === endLineWidget) {
                var right = this.getLeftInternal(endLineWidget, endElement, selectionEndIndex);
                var width = 0;
                var isRtlText = false;
                if (endElement instanceof page_1.TextElementBox) {
                    isRtlText = endElement.isRightToLeft;
                }
                if (!isRtlText && startElement instanceof page_1.TextElementBox) {
                    isRtlText = startElement.isRightToLeft;
                }
                width = Math.abs(right - left);
                if (isRtlText || paragraph.bidi) {
                    var elementBoxCollection = this.getElementsForward(startLineWidget, startElement, endElement, paragraph.bidi);
                    if (elementBoxCollection && elementBoxCollection.length > 1) {
                        for (var i = 0; i < elementBoxCollection.length; i++) {
                            var element = elementBoxCollection[i];
                            var elementIsRTL = false;
                            var index = element instanceof page_1.TextElementBox ? element.length : 1;
                            if (element === startElement) {
                                left = this.getLeftInternal(startLineWidget, element, selectionStartIndex);
                                right = this.getLeftInternal(startLineWidget, element, index);
                            }
                            else if (element === endElement) {
                                left = this.getLeftInternal(startLineWidget, element, 0);
                                right = this.getLeftInternal(startLineWidget, element, selectionEndIndex);
                            }
                            else {
                                left = this.getLeftInternal(startLineWidget, element, 0);
                                right = this.getLeftInternal(startLineWidget, element, index);
                            }
                            if (element instanceof page_1.TextElementBox) {
                                elementIsRTL = element.isRightToLeft;
                            }
                            width = Math.abs(right - left);
                            if (element === endElement && element instanceof page_1.TextElementBox
                                && selectionEndIndex > element.length) {
                                var charFormat = element.line.paragraph.characterFormat;
                                var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(charFormat).Width;
                                if (paragraph.bidi && !elementIsRTL) {
                                    width -= paragraphMarkWidth;
                                    this.createHighlightBorder(startLineWidget, width, left, top, true);
                                    left = this.getLineStartLeft(startLineWidget) - paragraphMarkWidth;
                                    this.createHighlightBorder(startLineWidget, paragraphMarkWidth, left, top, true);
                                    continue;
                                }
                            }
                            this.createHighlightBorder(startLineWidget, width, elementIsRTL ? right : left, top, true);
                        }
                    }
                    else {
                        if (endElement instanceof page_1.TextElementBox && selectionEndIndex > endElement.length) {
                            var charFormat = endElement.line.paragraph.characterFormat;
                            var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(charFormat).Width;
                            if (!paragraph.bidi && isRtlText) {
                                right += paragraphMarkWidth;
                                width -= paragraphMarkWidth;
                                this.createHighlightBorder(startLineWidget, width, right, top, true);
                                right += endElement.width;
                                this.createHighlightBorder(startLineWidget, paragraphMarkWidth, right, top, true);
                            }
                            else if (paragraph.bidi && !isRtlText) {
                                width -= paragraphMarkWidth;
                                this.createHighlightBorder(startLineWidget, width, left, top, true);
                                left = this.getLineStartLeft(startLineWidget) - paragraphMarkWidth;
                                this.createHighlightBorder(startLineWidget, paragraphMarkWidth, left, top, true);
                            }
                            else {
                                this.createHighlightBorder(startLineWidget, width, isRtlText ? right : left, top, false);
                            }
                        }
                        else {
                            this.createHighlightBorder(startLineWidget, width, isRtlText ? right : left, top, false);
                        }
                    }
                }
                else {
                    this.createHighlightBorder(startLineWidget, width, paragraph.bidi ? right : left, top, false);
                }
            }
            else {
                if (!ej2_base_1.isNullOrUndefined(startLineWidget)) {
                    var x = startLineWidget.paragraph.x;
                    if (paragraph !== startLineWidget.paragraph) {
                        paragraph = startLineWidget.paragraph;
                    }
                    var width = this.getWidth(startLineWidget, true) - (left - startLineWidget.paragraph.x);
                    if (paragraph.bidi || (startElement instanceof page_1.TextElementBox && startElement.isRightToLeft)) {
                        var right = 0;
                        var elementCollection = this.getElementsForward(startLineWidget, startElement, endElement, paragraph.bidi);
                        if (elementCollection) {
                            var elementIsRTL = false;
                            for (var i = 0; i < elementCollection.length; i++) {
                                var element = elementCollection[i];
                                elementIsRTL = false;
                                if (element === startElement) {
                                    left = this.getLeftInternal(startLineWidget, element, selectionStartIndex);
                                }
                                else {
                                    left = this.getLeftInternal(startLineWidget, element, 0);
                                }
                                var index = element instanceof page_1.TextElementBox ? element.length : 1;
                                right = this.getLeftInternal(startLineWidget, element, index);
                                if (element instanceof page_1.TextElementBox) {
                                    elementIsRTL = element.isRightToLeft;
                                }
                                width = Math.abs(right - left);
                                this.createHighlightBorder(startLineWidget, width, elementIsRTL ? right : left, top, true);
                            }
                            if (startLineWidget.isLastLine()) {
                                var charFormat = elementCollection[elementCollection.length - 1].line.paragraph.characterFormat;
                                var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(charFormat).Width;
                                if (paragraph.bidi) {
                                    left = this.getLineStartLeft(startLineWidget) - paragraphMarkWidth;
                                }
                                else {
                                    left = elementIsRTL ? startLineWidget.paragraph.x + this.getWidth(startLineWidget, false) : right;
                                }
                                this.createHighlightBorder(startLineWidget, paragraphMarkWidth, left, top, true);
                            }
                        }
                        else {
                            this.createHighlightBorder(startLineWidget, width, left, top, false);
                        }
                    }
                    else {
                        this.createHighlightBorder(startLineWidget, width, left, top, false);
                    }
                    var lineIndex = startLineWidget.paragraph.childWidgets.indexOf(startLineWidget);
                    this.highlightParagraph(paragraph, lineIndex + 1, endLineWidget, endElement, selectionEndIndex);
                    if (paragraph.childWidgets.indexOf(end.currentWidget) !== -1) {
                        return;
                    }
                }
                if (this.isHideSelection(paragraph)) {
                    this.isHighlightNext = false;
                    return;
                }
                this.isHighlightNext = true;
                this.hightLightNextParagraph = paragraph;
            }
        };
        Selection.prototype.highlightNextBlock = function (paragraph, start, end) {
            var block = paragraph.nextRenderedWidget;
            if (!ej2_base_1.isNullOrUndefined(block)) {
                if (block instanceof page_1.ParagraphWidget) {
                    this.isHighlightNext = false;
                    this.highlight(block, start, end);
                    if (this.isHighlightNext) {
                        this.highlightNextBlock(this.hightLightNextParagraph, start, end);
                        this.isHighlightNext = false;
                        this.hightLightNextParagraph = undefined;
                    }
                }
                else {
                    this.highlightTable(block, start, end);
                }
            }
        };
        Selection.prototype.getStartLineWidget = function (paragraph, start, startElement, selectionStartIndex) {
            var offset = paragraph === start.paragraph ? start.offset : this.getStartOffset(paragraph);
            var startInlineObj = undefined;
            if (paragraph === start.paragraph) {
                startInlineObj = start.currentWidget.getInline(offset, selectionStartIndex);
            }
            else {
                startInlineObj = paragraph.firstChild.getInline(offset, selectionStartIndex);
            }
            startElement = startInlineObj.element;
            selectionStartIndex = startInlineObj.index;
            if (startElement instanceof page_1.FieldElementBox) {
                var inlineInfo = this.getRenderedInline(startElement, selectionStartIndex);
                startElement = inlineInfo.element;
                selectionStartIndex = inlineInfo.index;
            }
            if (offset === this.getParagraphLength(start.paragraph) + 1) {
                selectionStartIndex++;
            }
            return {
                'index': selectionStartIndex, 'element': startElement
            };
        };
        Selection.prototype.getEndLineWidget = function (end, endElement, selectionEndIndex) {
            var endInlineObj = end.currentWidget.getInline(end.offset, selectionEndIndex);
            endElement = endInlineObj.element;
            selectionEndIndex = endInlineObj.index;
            if (endElement instanceof page_1.FieldElementBox) {
                var inlineInfo = this.getRenderedInline(endElement, selectionEndIndex);
                endElement = inlineInfo.element;
                selectionEndIndex = inlineInfo.index;
            }
            var lineIndex = end.paragraph.childWidgets.indexOf(end.currentWidget);
            if (lineIndex === end.paragraph.childWidgets.length - 1 && end.offset === this.getLineLength(end.currentWidget) + 1) {
                selectionEndIndex = endElement ? endElement.length + 1 : 1;
            }
            return { 'index': selectionEndIndex, 'element': endElement };
        };
        Selection.prototype.getLineWidgetInternal = function (line, offset, moveToNextLine) {
            var lineWidget = undefined;
            if (line.children.length === 0 && line instanceof page_1.LineWidget) {
                lineWidget = line;
            }
            else {
                var indexInInline = 0;
                var inlineInfo = line.getInline(offset, indexInInline);
                var inline = inlineInfo.element;
                indexInInline = inlineInfo.index;
                lineWidget = inline instanceof page_1.ElementBox ? inline.line
                    : this.getLineWidgetInternalInline(inline, indexInInline, moveToNextLine);
            }
            return lineWidget;
        };
        Selection.prototype.getLineWidgetParagraph = function (offset, line) {
            var linewidget = undefined;
            if (line.children.length === 0) {
                linewidget = line;
            }
            else {
                var indexInInline = 0;
                var inlineInfo = line.getInline(offset, indexInInline);
                var inline = inlineInfo.element;
                indexInInline = inlineInfo.index;
                linewidget = this.getLineWidget(inline, indexInInline);
            }
            return linewidget;
        };
        Selection.prototype.highlightCells = function (table, startCell, endCell) {
            var start = this.getCellLeft(startCell.ownerRow, startCell);
            var end = start + startCell.cellFormat.cellWidth;
            var endCellLeft = this.getCellLeft(endCell.ownerRow, endCell);
            var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
            if (start > endCellLeft) {
                start = endCellLeft;
            }
            if (end < endCellRight) {
                end = endCellRight;
            }
            if (start > this.upDownSelectionLength) {
                start = this.upDownSelectionLength;
            }
            if (end < this.upDownSelectionLength) {
                end = this.upDownSelectionLength;
            }
            var tableWidgetCollection = table.getSplitWidgets();
            var startTableIndex = tableWidgetCollection.indexOf(startCell.ownerRow.ownerTable);
            var endTableIndex = tableWidgetCollection.indexOf(endCell.ownerRow.ownerTable);
            if (startTableIndex === endTableIndex) {
                var count = table.childWidgets.indexOf(endCell.ownerRow);
                for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
                    this.highlightRow(table.childWidgets[i], start, end);
                }
            }
            else {
                var startRowIndex = 0;
                var endRowIndex = 0;
                for (var i = startTableIndex; i <= endTableIndex; i++) {
                    table = tableWidgetCollection[i];
                    if (i === startTableIndex) {
                        startRowIndex = table.childWidgets.indexOf(startCell.ownerRow);
                    }
                    else {
                        startRowIndex = 0;
                    }
                    if (i === endTableIndex) {
                        endRowIndex = table.childWidgets.indexOf(endCell.ownerRow);
                    }
                    else {
                        endRowIndex = table.childWidgets.length - 1;
                    }
                    for (var j = startRowIndex; j <= endRowIndex; j++) {
                        this.highlightRow(table.childWidgets[j], start, end);
                    }
                }
            }
        };
        Selection.prototype.highlightTable = function (table, start, end) {
            this.highlightInternal(table.childWidgets[0], start, end);
            if (!end.paragraph.isInsideTable
                || !table.contains(end.paragraph.associatedCell)) {
                this.highlightNextBlock(table, start, end);
            }
        };
        Selection.prototype.getCellLeft = function (row, cell) {
            var left = 0;
            left += cell.x - cell.margin.left;
            return left;
        };
        Selection.prototype.getNextParagraphRow = function (row) {
            if (!ej2_base_1.isNullOrUndefined(row.nextRenderedWidget)) {
                var cell = row.nextRenderedWidget.childWidgets[0];
                var block = cell.childWidgets[0];
                return this.documentHelper.getFirstParagraphBlock(block);
            }
            return this.getNextParagraphBlock(row.ownerTable);
        };
        Selection.prototype.getPreviousParagraphRow = function (row) {
            if (!ej2_base_1.isNullOrUndefined(row.previousRenderedWidget)) {
                var cell = row.previousRenderedWidget.lastChild;
                var block = cell.lastChild ? cell.lastChild : (cell.previousSplitWidget).lastChild;
                return this.documentHelper.getLastParagraphBlock(block);
            }
            return this.getPreviousParagraphBlock(row.ownerTable);
        };
        Selection.prototype.containsRow = function (row, tableCell) {
            if (row.childWidgets.indexOf(tableCell) !== -1) {
                return true;
            }
            while (tableCell.ownerTable.isInsideTable) {
                if (row.childWidgets.indexOf(tableCell) !== -1) {
                    return true;
                }
                tableCell = tableCell.ownerTable.associatedCell;
            }
            return row.childWidgets.indexOf(tableCell) !== -1;
        };
        Selection.prototype.highlightRow = function (row, start, end) {
            for (var i = 0; i < row.childWidgets.length; i++) {
                var left = this.getCellLeft(row, row.childWidgets[i]);
                if (editor_helper_1.HelperMethods.round(start, 2) <= editor_helper_1.HelperMethods.round(left, 2) &&
                    editor_helper_1.HelperMethods.round(left, 2) < editor_helper_1.HelperMethods.round(end, 2)) {
                    this.highlightCellWidget(row.childWidgets[i]);
                }
            }
        };
        Selection.prototype.highlightInternal = function (row, start, end) {
            for (var i = 0; i < row.childWidgets.length; i++) {
                this.highlightCellWidget(row.childWidgets[i]);
            }
            if (end.paragraph.isInsideTable && this.containsRow(row, end.paragraph.associatedCell)) {
                return;
            }
            else if (row.nextRenderedWidget instanceof page_1.TableRowWidget) {
                this.highlightInternal(row.nextRenderedWidget, start, end);
            }
        };
        Selection.prototype.getLastParagraph = function (cell) {
            while (cell.nextSplitWidget) {
                if (cell.nextSplitWidget.childWidgets.length > 0) {
                    cell = cell.nextSplitWidget;
                }
                else {
                    break;
                }
            }
            var lastBlock;
            if (cell.childWidgets.length > 0) {
                lastBlock = cell.lastChild;
            }
            else {
                lastBlock = cell.previousSplitWidget.lastChild;
            }
            return this.documentHelper.getLastParagraphBlock(lastBlock);
        };
        Selection.prototype.containsCell = function (sourceCell, cell) {
            if (sourceCell.equals(cell)) {
                return true;
            }
            while (cell.ownerTable.isInsideTable) {
                if (sourceCell.equals(cell.ownerTable.associatedCell)) {
                    return true;
                }
                cell = cell.ownerTable.associatedCell;
            }
            return false;
        };
        Selection.prototype.isCellSelected = function (cell, startPosition, endPosition) {
            var lastParagraph = this.getLastParagraph(cell);
            var isAtCellEnd = lastParagraph === endPosition.paragraph && endPosition.offset === this.getParagraphLength(lastParagraph) + 1;
            return isAtCellEnd || (!this.containsCell(cell, startPosition.paragraph.associatedCell) ||
                !this.containsCell(cell, endPosition.paragraph.associatedCell));
        };
        Selection.prototype.getContainerCellOf = function (cell, tableCell) {
            while (cell.ownerTable.isInsideTable) {
                if (cell.ownerTable.contains(tableCell)) {
                    return cell;
                }
                cell = cell.ownerTable.associatedCell;
            }
            return cell;
        };
        Selection.prototype.getSelectedCell = function (cell, containerCell) {
            if (cell.ownerTable.equals(containerCell.ownerTable)) {
                return cell;
            }
            while (cell.ownerTable.isInsideTable) {
                if (cell.ownerTable.associatedCell.equals(containerCell)) {
                    return cell;
                }
                cell = cell.ownerTable.associatedCell;
            }
            return cell;
        };
        Selection.prototype.getSelectedCells = function () {
            var cells = [];
            for (var i = 0; i < this.selectedWidgets.keys.length; i++) {
                var widget = this.selectedWidgets.keys[i];
                if (widget instanceof page_1.TableCellWidget) {
                    cells.push(widget);
                }
            }
            return cells;
        };
        Selection.prototype.getLevelFormatNumber = function () {
            var numberFormat = '%';
            numberFormat = numberFormat + (((this.paragraphFormat.listLevelNumber <= 0) ? 0 : this.paragraphFormat.listLevelNumber) + 1) + '.';
            return numberFormat;
        };
        Selection.prototype.getNextParagraphCell = function (cell) {
            if (cell.nextRenderedWidget && cell.nextRenderedWidget instanceof page_1.TableCellWidget) {
                cell = cell.nextRenderedWidget;
                if (cell.getSplitWidgets()[0] instanceof page_1.TableCellWidget) {
                    cell = cell.getSplitWidgets()[0];
                }
                var block = cell.firstChild;
                if (block) {
                    return this.documentHelper.getFirstParagraphBlock(block);
                }
                else {
                    return this.getNextParagraphCell(cell);
                }
            }
            else if (cell.nextSplitWidget && cell.nextSplitWidget.childWidgets.length === 0) {
                cell = cell.getSplitWidgets().pop();
            }
            return this.getNextParagraphRow(cell.containerWidget);
        };
        Selection.prototype.getPreviousParagraphCell = function (cell) {
            if (!ej2_base_1.isNullOrUndefined(cell.previousRenderedWidget) && cell.previousRenderedWidget instanceof page_1.TableCellWidget) {
                cell = cell.previousRenderedWidget;
                var block = cell.lastChild;
                return this.documentHelper.getLastParagraphBlock(block);
            }
            return this.getPreviousParagraphRow(cell.ownerRow);
        };
        Selection.prototype.getContainerCell = function (cell) {
            while (!ej2_base_1.isNullOrUndefined(cell.ownerTable) && cell.ownerTable.isInsideTable) {
                cell = cell.ownerTable.associatedCell;
            }
            return cell;
        };
        Selection.prototype.highlightCell = function (cell, selection, start, end) {
            if (end.paragraph.isInsideTable) {
                var containerCell = this.getContainerCellOf(cell, end.paragraph.associatedCell);
                if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                    var startCell = this.getSelectedCell(cell, containerCell);
                    var endCell = this.getSelectedCell(end.paragraph.associatedCell, containerCell);
                    if (this.containsCell(containerCell, end.paragraph.associatedCell)) {
                        if (this.isCellSelected(containerCell, start, end)) {
                            this.highlightCellWidget(containerCell);
                        }
                        else {
                            if (startCell === containerCell) {
                                this.highlight(start.paragraph, start, end);
                                if (this.isHighlightNext) {
                                    this.highlightNextBlock(this.hightLightNextParagraph, start, end);
                                    this.isHighlightNext = false;
                                    this.hightLightNextParagraph = undefined;
                                }
                            }
                            else {
                                this.highlightContainer(startCell, start, end);
                            }
                        }
                    }
                    else {
                        this.highlightCellWidget(containerCell);
                        if (containerCell.ownerRow.equals(endCell.ownerRow)) {
                            startCell = containerCell;
                            while (!ej2_base_1.isNullOrUndefined(startCell.nextRenderedWidget)) {
                                startCell = startCell.nextRenderedWidget;
                                this.highlightCellWidget(startCell);
                                if (startCell === endCell) {
                                    break;
                                }
                            }
                        }
                        else {
                            this.highlightCells(containerCell.ownerTable, containerCell, endCell);
                        }
                    }
                }
                else {
                    this.highlightContainer(containerCell, start, end);
                }
            }
            else {
                var cell1 = this.getContainerCell(cell);
                this.highlightContainer(cell1, start, end);
            }
        };
        Selection.prototype.highlightContainer = function (cell, start, end) {
            this.highlightInternal(cell.containerWidget, start, end);
            this.highlightNextBlock(cell.ownerTable.getSplitWidgets().pop(), start, end);
        };
        Selection.prototype.getPreviousValidElement = function (inline) {
            var previousValidInline = undefined;
            if (this.documentHelper.isFormFillProtectedMode && inline.fieldType === 2) {
                return inline;
            }
            while (inline instanceof page_1.FieldElementBox) {
                if (editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline)) {
                    if (inline instanceof page_1.FieldElementBox && inline.fieldType === 0) {
                        previousValidInline = inline;
                    }
                    else if (inline instanceof page_1.FieldElementBox && inline.fieldType === 1) {
                        previousValidInline = inline;
                        if (ej2_base_1.isNullOrUndefined(inline.fieldSeparator)) {
                            inline = inline.fieldBegin;
                            previousValidInline = inline;
                        }
                    }
                    else {
                        inline = inline.fieldBegin;
                        previousValidInline = inline;
                    }
                }
                inline = inline.previousNode;
            }
            return ej2_base_1.isNullOrUndefined(previousValidInline) ? inline : previousValidInline;
        };
        Selection.prototype.getNextValidElement = function (inline) {
            var nextValidInline = undefined;
            if (inline instanceof page_1.BookmarkElementBox && inline.bookmarkType === 1) {
                return inline;
            }
            while (inline instanceof page_1.FieldElementBox) {
                if (inline.fieldType === 0 && !ej2_base_1.isNullOrUndefined(inline.fieldEnd)) {
                    return ej2_base_1.isNullOrUndefined(nextValidInline) ? inline : nextValidInline;
                }
                else if (inline.fieldType === 1 && !ej2_base_1.isNullOrUndefined(inline.fieldBegin)) {
                    nextValidInline = inline;
                }
                inline = inline.nextNode;
            }
            return (ej2_base_1.isNullOrUndefined(nextValidInline) ? inline : nextValidInline);
        };
        Selection.prototype.validateTextPosition = function (inline, index) {
            var nextNode = inline.nextNode;
            if (inline.length === index && (nextNode instanceof page_1.FieldElementBox
                || (!(inline instanceof page_1.ImageElementBox) && (nextNode instanceof page_1.BookmarkElementBox || nextNode instanceof page_1.CommentCharacterElementBox)))) {
                var nextInline = this.getNextValidElement(inline.nextNode);
                if ((nextInline instanceof page_1.FieldElementBox && nextInline.fieldType === 1)
                    || (nextInline instanceof page_1.BookmarkElementBox && nextInline.bookmarkType === 1)
                    || (nextInline instanceof page_1.CommentCharacterElementBox && nextInline.commentType === 1)) {
                    inline = nextInline;
                    index = this.documentHelper.isFormFillProtectedMode ? 0 : 1;
                }
            }
            else if (index === 0 && inline.previousNode instanceof page_1.FieldElementBox) {
                var prevInline = this.getPreviousValidElement(inline.previousNode);
                inline = prevInline;
                index = inline instanceof page_1.FieldElementBox ? 0 : inline.length;
                if (inline instanceof page_1.FieldElementBox && inline.fieldType === 1) {
                    index++;
                }
            }
            return { 'element': inline, 'index': index };
        };
        Selection.prototype.getPhysicalPositionInline = function (inline, index, moveNextLine) {
            var element = undefined;
            element = this.getElementBox(inline, index, moveNextLine).element;
            var lineWidget = undefined;
            if (ej2_base_1.isNullOrUndefined(element) || ej2_base_1.isNullOrUndefined(element.line)) {
                if (inline instanceof page_1.FieldElementBox && inline.fieldType === 1) {
                    element = inline;
                }
                else {
                    if (inline instanceof page_1.FieldElementBox || inline instanceof page_1.BookmarkElementBox || inline instanceof page_1.CommentCharacterElementBox) {
                        return this.getFieldCharacterPosition(inline);
                    }
                    return new editor_helper_1.Point(0, 0);
                }
            }
            var margin = element.margin;
            var top = 0;
            var left = 0;
            if (element instanceof page_1.TextElementBox && element.text === '\v' && ej2_base_1.isNullOrUndefined(inline.nextNode) && !this.owner.editor.handledEnter) {
                lineWidget = this.getNextLineWidget(element.line.paragraph, element);
                index = 0;
            }
            else {
                lineWidget = element.line;
            }
            top = this.getTop(lineWidget);
            if (element instanceof page_1.ImageElementBox && element.textWrappingStyle === 'Inline') {
                var format = element.line.paragraph.characterFormat;
                var previousInline = this.getPreviousTextElement(inline);
                if (!ej2_base_1.isNullOrUndefined(previousInline)) {
                    format = previousInline.characterFormat;
                }
                else {
                    var nextInline = this.getNextTextElement(inline);
                    if (!ej2_base_1.isNullOrUndefined(nextInline)) {
                        format = nextInline.characterFormat;
                    }
                }
                var measureObj = this.documentHelper.textHelper.getHeight(format);
                if (element.margin.top + element.height - measureObj.BaselineOffset > 0) {
                    top += element.margin.top + element.height - measureObj.BaselineOffset;
                }
            }
            else if (!(element instanceof page_1.FieldElementBox)) {
                top += margin.top > 0 ? margin.top : 0;
            }
            left = (ej2_base_1.isNullOrUndefined(element) || ej2_base_1.isNullOrUndefined(lineWidget)) ? 0 : this.getLeftInternal(lineWidget, element, index);
            return new editor_helper_1.Point(left, top);
        };
        Selection.prototype.getFieldCharacterPosition = function (firstInline) {
            var nextValidInline = this.getNextValidElementForField(firstInline);
            if (ej2_base_1.isNullOrUndefined(nextValidInline)) {
                var nextParagraph = firstInline.line.paragraph;
                return this.getEndPosition(nextParagraph);
            }
            else {
                return this.getPhysicalPositionInline(nextValidInline, 0, true);
            }
        };
        Selection.prototype.isRenderBookmarkAtEnd = function (bookmark) {
            var bookmarkElement;
            if (bookmark.bookmarkType == 1) {
                bookmarkElement = bookmark.reference;
            }
            else {
                bookmarkElement = bookmark;
            }
            if (bookmarkElement && ej2_base_1.isNullOrUndefined(bookmarkElement.properties)) {
                var endCell = bookmarkElement.reference ? bookmarkElement.reference.paragraph.associatedCell : undefined;
                if (ej2_base_1.isNullOrUndefined(endCell)) {
                    return false;
                }
                var lastRow = bookmarkElement.reference ? bookmarkElement.reference.paragraph.associatedCell.ownerRow : undefined;
                var lastCell = lastRow ? lastRow.childWidgets[lastRow.childWidgets.length - 1] : undefined;
                if (ej2_base_1.isNullOrUndefined(lastCell)) {
                    return false;
                }
                if (endCell == lastCell) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        };
        Selection.prototype.getNextValidElementForField = function (firstInline) {
            if (firstInline instanceof page_1.FieldElementBox && firstInline.fieldType === 0
                && editor_helper_1.HelperMethods.isLinkedFieldCharacter(firstInline)) {
                var fieldBegin = firstInline;
                if (ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                    firstInline = fieldBegin.fieldEnd;
                }
                else {
                    firstInline = fieldBegin.fieldSeparator;
                }
            }
            var nextValidInline = undefined;
            if (!ej2_base_1.isNullOrUndefined(firstInline.nextNode)) {
                nextValidInline = this.getNextValidElement(firstInline.nextNode);
            }
            return nextValidInline;
        };
        Selection.prototype.getEndPosition = function (widget) {
            var left = widget.x;
            var top = widget.y;
            var lineWidget = undefined;
            if (widget.childWidgets.length > 0) {
                lineWidget = widget.childWidgets[widget.childWidgets.length - 1];
                left += this.getWidth(lineWidget, false);
            }
            if (!ej2_base_1.isNullOrUndefined(lineWidget)) {
                top = this.getTop(lineWidget);
            }
            var topMargin = 0;
            var bottomMargin = 0;
            var size = this.getParagraphMarkSize(widget, topMargin, bottomMargin);
            return new editor_helper_1.Point(left, top + size.topMargin);
        };
        Selection.prototype.getElementBox = function (currentInline, index, moveToNextLine) {
            var elementBox = undefined;
            if (!(currentInline instanceof page_1.FieldElementBox || currentInline instanceof page_1.BookmarkElementBox || currentInline instanceof page_1.CommentCharacterElementBox)) {
                elementBox = currentInline;
            }
            return { 'element': elementBox, 'index': index };
        };
        Selection.prototype.getPreviousTextElement = function (inline) {
            if (inline.previousNode instanceof page_1.TextElementBox) {
                return inline.previousNode;
            }
            if (!ej2_base_1.isNullOrUndefined(inline.previousNode)) {
                return this.getPreviousTextElement(inline.previousNode);
            }
            return undefined;
        };
        Selection.prototype.getNextTextElement = function (inline) {
            if (inline.nextNode instanceof page_1.TextElementBox) {
                return inline.nextNode;
            }
            if (!ej2_base_1.isNullOrUndefined(inline.nextNode)) {
                return this.getNextTextElement(inline.nextNode);
            }
            return undefined;
        };
        Selection.prototype.getNextRenderedElementBox = function (inline, indexInInline) {
            if (inline instanceof page_1.FieldElementBox) {
                var fieldBegin = inline;
                if (fieldBegin.fieldType === 0) {
                    inline = this.getRenderedField(fieldBegin);
                    if (fieldBegin === inline) {
                        return fieldBegin;
                    }
                }
                indexInInline = 1;
            }
            while (!ej2_base_1.isNullOrUndefined(inline) && indexInInline === inline.length && inline.nextNode instanceof page_1.FieldElementBox) {
                var nextValidInline = this.getNextValidElement((inline.nextNode));
                if (nextValidInline instanceof page_1.FieldElementBox && nextValidInline.fieldType === 0) {
                    var fieldBegin = nextValidInline;
                    inline = this.getRenderedField(fieldBegin);
                    if (!ej2_base_1.isNullOrUndefined(inline) && fieldBegin === inline) {
                        return fieldBegin;
                    }
                    indexInInline = 1;
                }
                else {
                    inline = nextValidInline;
                }
            }
            return inline;
        };
        Selection.prototype.getElementBoxInternal = function (inline, index) {
            var element = undefined;
            element = inline;
            return {
                'element': element, 'index': index
            };
        };
        Selection.prototype.getLineWidget = function (inline, index) {
            return this.getLineWidgetInternalInline(inline, index, true);
        };
        Selection.prototype.getLineWidgetInternalInline = function (inline, index, moveToNextLine) {
            var elementObj = this.getElementBox(inline, index, moveToNextLine);
            var element = elementObj.element;
            index = elementObj.index;
            if (!ej2_base_1.isNullOrUndefined(element)) {
                if (moveToNextLine && element instanceof page_1.TextElementBox && element.text === '\v' && index === 1) {
                    return this.getNextLineWidget(element.line.paragraph, element);
                }
                else {
                    return element.line;
                }
            }
            var startInline = inline;
            var nextValidInline = this.getNextValidElementForField(startInline);
            if (ej2_base_1.isNullOrUndefined(nextValidInline)) {
                var lineWidget = undefined;
                var widget = startInline.line.paragraph;
                if (widget.childWidgets.length > 0) {
                    lineWidget = widget.childWidgets[widget.childWidgets.length - 1];
                }
                return lineWidget;
            }
            else {
                return this.getLineWidget(nextValidInline, 0);
            }
        };
        Selection.prototype.getNextLineWidget = function (paragraph, element) {
            var lineWidget = undefined;
            var widget = paragraph;
            if (widget.childWidgets.length > 0) {
                var widgetIndex = widget.childWidgets.indexOf(element.line);
                if (widgetIndex === widget.childWidgets.length - 1) {
                    widget = paragraph;
                    widgetIndex = -1;
                }
                else if (widgetIndex > widget.childWidgets.length - 1) {
                    widget = this.getNextParagraphBlock(paragraph);
                    widgetIndex = -1;
                }
                else if (widgetIndex < 0) {
                    widget = paragraph;
                    widgetIndex = widget.childWidgets.indexOf(element.line);
                }
                lineWidget = widget.childWidgets[widgetIndex + 1];
            }
            return lineWidget;
        };
        Selection.prototype.getCaretHeight = function (inline, index, format, isEmptySelection, topMargin, isItalic) {
            var elementBoxInfo = this.getElementBox(inline, index, false);
            var element = elementBoxInfo.element;
            var currentInline = inline;
            if (ej2_base_1.isNullOrUndefined(element)) {
                if (currentInline instanceof page_1.FieldElementBox) {
                    return this.getFieldCharacterHeight(currentInline, format, isEmptySelection, topMargin, isItalic);
                }
                return { 'height': this.documentHelper.textHelper.getHeight(format).Height, 'topMargin': topMargin, 'isItalic': isItalic };
            }
            var margin = element.margin;
            var heightElement = element.height;
            var maxLineHeight = 0;
            if (element instanceof page_1.ImageElementBox) {
                var previousInline = this.getPreviousTextElement(inline);
                var nextInline = this.getNextTextElement(inline);
                if (ej2_base_1.isNullOrUndefined(previousInline) && ej2_base_1.isNullOrUndefined(nextInline)) {
                    var top_2 = 0;
                    var bottom = 0;
                    var paragarph = inline.line.paragraph;
                    var sizeInfo = this.getParagraphMarkSize(paragarph, top_2, bottom);
                    top_2 = sizeInfo.topMargin;
                    bottom = sizeInfo.bottomMargin;
                    maxLineHeight = sizeInfo.height;
                    isItalic = paragarph.characterFormat.italic;
                    if (!isEmptySelection) {
                        maxLineHeight += this.documentHelper.layout.getAfterSpacing(paragarph);
                    }
                }
                else if (ej2_base_1.isNullOrUndefined(previousInline)) {
                    isItalic = nextInline.characterFormat.italic;
                    return this.getCaretHeight(nextInline, 0, nextInline.characterFormat, isEmptySelection, topMargin, isItalic);
                }
                else {
                    if (!ej2_base_1.isNullOrUndefined(nextInline) && element instanceof page_1.ImageElementBox) {
                        var textSizeInfo = this.documentHelper.textHelper.getHeight(element.characterFormat);
                        var charHeight = textSizeInfo.Height;
                        var baselineOffset = textSizeInfo.BaselineOffset;
                        maxLineHeight = (element.margin.top < 0 && baselineOffset > element.margin.top + element.height) ? element.margin.top + element.height + charHeight - baselineOffset : charHeight;
                        if (!isEmptySelection) {
                            maxLineHeight += element.margin.bottom;
                        }
                    }
                    else {
                        isItalic = previousInline.characterFormat.italic;
                        return this.getCaretHeight(previousInline, previousInline.length, previousInline.characterFormat, isEmptySelection, topMargin, isItalic);
                    }
                }
            }
            else {
                var baselineAlignment = format.baselineAlignment;
                var elementHeight = heightElement;
                if (baselineAlignment !== 'Normal' && isEmptySelection) {
                    elementHeight = elementHeight / 1.5;
                    if (baselineAlignment === 'Subscript') {
                        topMargin = heightElement - elementHeight;
                    }
                }
                maxLineHeight = (margin.top < 0 ? margin.top : 0) + elementHeight;
                if (!isEmptySelection) {
                    maxLineHeight += margin.bottom;
                }
            }
            if (!isEmptySelection) {
                return { 'height': maxLineHeight, 'topMargin': topMargin, 'isItalic': isItalic };
            }
            var height = this.documentHelper.textHelper.getHeight(format).Height;
            if (height > maxLineHeight) {
                height = maxLineHeight;
            }
            return { 'height': height, 'topMargin': topMargin, 'isItalic': isItalic };
        };
        Selection.prototype.getFieldCharacterHeight = function (startInline, format, isEmptySelection, topMargin, isItalic) {
            var nextValidInline = this.getNextValidElementForField(startInline);
            if (ej2_base_1.isNullOrUndefined(nextValidInline)) {
                var nextParagraph = startInline.line.paragraph;
                var height = this.documentHelper.textHelper.getParagraphMarkSize(format).Height;
                var top_3 = 0;
                var bottom = 0;
                var sizeInfo = this.getParagraphMarkSize(nextParagraph, top_3, bottom);
                var maxLineHeight = sizeInfo.height;
                top_3 = sizeInfo.topMargin;
                bottom = sizeInfo.bottomMargin;
                if (!isEmptySelection) {
                    maxLineHeight += bottom;
                    return { 'height': maxLineHeight, 'topMargin': topMargin, 'isItalic': isItalic };
                }
                if (height > maxLineHeight) {
                    height = maxLineHeight;
                }
                return { 'height': height, 'topMargin': topMargin, 'isItalic': isItalic };
            }
            else {
                return this.getCaretHeight(nextValidInline, 0, format, isEmptySelection, topMargin, isItalic);
            }
        };
        Selection.prototype.getRenderedInline = function (inline, inlineIndex) {
            if (this.documentHelper.isFormFillProtectedMode && inline.fieldType === 2) {
                return { 'element': inline, 'index': inlineIndex };
            }
            var prevInline = this.getPreviousValidElement(inline);
            while (prevInline instanceof page_1.FieldElementBox) {
                prevInline = this.getPreviousTextElement(prevInline);
                if (prevInline instanceof page_1.FieldElementBox) {
                    prevInline = prevInline.previousNode;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(prevInline)) {
                inlineIndex = prevInline.length;
                return { 'element': prevInline, 'index': inlineIndex };
            }
            inlineIndex = 0;
            var nextInline = this.getNextRenderedElementBox(inline, 0);
            if (nextInline instanceof page_1.FieldElementBox && nextInline.fieldType === 0) {
                nextInline = nextInline.fieldSeparator;
                nextInline = nextInline.nextNode;
                while (nextInline instanceof page_1.FieldElementBox) {
                    if (nextInline instanceof page_1.FieldElementBox && nextInline.fieldType === 0
                        && editor_helper_1.HelperMethods.isLinkedFieldCharacter(nextInline)) {
                        if (ej2_base_1.isNullOrUndefined(nextInline.fieldSeparator)) {
                            nextInline = nextInline.fieldEnd;
                        }
                        else {
                            nextInline = nextInline.fieldSeparator;
                        }
                    }
                    nextInline = nextInline.nextNode;
                }
            }
            return { 'element': nextInline, 'index': inlineIndex };
        };
        Selection.prototype.getRenderedField = function (fieldBegin) {
            var inline = fieldBegin;
            if (ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                inline = fieldBegin.fieldEnd;
            }
            else {
                inline = fieldBegin.fieldSeparator;
                var paragraph = inline.line.paragraph;
                if (paragraph === fieldBegin.fieldEnd.line.paragraph
                    && !this.hasValidInline(paragraph, inline, fieldBegin.fieldEnd)) {
                    inline = fieldBegin.fieldEnd;
                }
                else {
                    return inline;
                }
            }
            return inline;
        };
        Selection.prototype.isLastRenderedInline = function (inline, index) {
            while (index === inline.length && inline.nextNode instanceof page_1.FieldElementBox) {
                var nextValidInline = this.getNextValidElement(inline.nextNode);
                index = 0;
                if (nextValidInline instanceof page_1.FieldElementBox && nextValidInline.fieldType === 0) {
                    inline = nextValidInline;
                }
                if (inline instanceof page_1.FieldElementBox && inline.fieldType === 0 && !ej2_base_1.isNullOrUndefined(inline.fieldEnd)) {
                    var fieldBegin = inline;
                    if (ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                        inline = fieldBegin.fieldEnd;
                        index = 1;
                    }
                    else {
                        inline = fieldBegin.fieldSeparator;
                        var paragraph = inline.line.paragraph;
                        index = 1;
                        if (paragraph === fieldBegin.fieldEnd.line.paragraph
                            && !this.hasValidInline(paragraph, inline, fieldBegin.fieldEnd)) {
                            inline = fieldBegin.fieldEnd;
                        }
                        else {
                            break;
                        }
                    }
                }
            }
            return index === inline.length && ej2_base_1.isNullOrUndefined(inline.nextNode);
        };
        Selection.prototype.getPage = function (widget) {
            var page = undefined;
            if (widget.containerWidget instanceof page_1.TextFrame) {
                var shape = widget.containerWidget.containerShape;
                if (shape.line) {
                    page = this.getPage(shape.line.paragraph);
                }
            }
            else if (widget.containerWidget instanceof page_1.BlockContainer) {
                var bodyWidget = widget.containerWidget;
                page = widget.containerWidget.page;
            }
            else if (!ej2_base_1.isNullOrUndefined(widget.containerWidget)) {
                page = this.getPage(widget.containerWidget);
            }
            return page;
        };
        Selection.prototype.clearSelectionHighlightInSelectedWidgets = function () {
            var isNonEmptySelection = false;
            var widgets = this.selectedWidgets.keys;
            if (!this.viewer.documentHelper.isDragStarted) {
                for (var i = 0; i < widgets.length; i++) {
                    this.removeSelectionHighlight(widgets[i]);
                    isNonEmptySelection = true;
                }
                this.selectedWidgets.clear();
            }
            return isNonEmptySelection;
        };
        Selection.prototype.clearChildSelectionHighlight = function (widget) {
            for (var i = 0; i < widget.childWidgets.length; i++) {
                if (widget.childWidgets[i] instanceof page_1.LineWidget) {
                    this.clearSelectionHighlightLineWidget(widget.childWidgets[i]);
                }
                else if (widget.childWidgets[i] instanceof page_1.TableCellWidget) {
                    this.clearSelectionHighlight(widget.childWidgets[i]);
                }
                else if (widget.childWidgets[i] instanceof page_1.Widget) {
                    this.clearChildSelectionHighlight(widget.childWidgets[i]);
                }
            }
        };
        Selection.prototype.getLineWidgetBodyWidget = function (widget, point, isGetFirstChild) {
            isGetFirstChild = ej2_base_1.isNullOrUndefined(isGetFirstChild) ? true : isGetFirstChild;
            var bodyWgt = widget;
            if (bodyWgt instanceof page_1.BlockContainer) {
                for (var x = 0; x < bodyWgt.floatingElements.length; x++) {
                    var floatWidget = bodyWgt.floatingElements[x];
                    if (floatWidget instanceof page_1.TableWidget) {
                        var floatWidgetWidth = floatWidget.getTableCellWidth();
                        if (point.x <= floatWidget.x + floatWidgetWidth && point.x >= floatWidget.x
                            && point.y <= floatWidget.y + floatWidget.height && point.y >= floatWidget.y) {
                            return this.getLineWidgetTableWidget(floatWidget, point);
                        }
                    }
                    else if (floatWidget instanceof page_1.ShapeBase && floatWidget.x <= point.x && (floatWidget.x + floatWidget.width) >= point.x
                        && floatWidget.y <= point.y && (floatWidget.y + floatWidget.height) >= point.y) {
                        return floatWidget.line;
                    }
                }
            }
            if (widget instanceof page_1.FootNoteWidget) {
                var selectionBody = void 0;
                var isFit = false;
                for (var j = 0; j < widget.bodyWidgets.length; j++) {
                    if (widget.sectionFormat.columns.length <= 1) {
                        for (var k = 0; k < widget.bodyWidgets[j].childWidgets.length; k++) {
                            var footChild = widget.bodyWidgets[j].childWidgets[k];
                            if (footChild instanceof page_1.Widget && footChild.y <= point.y
                                && (footChild.y + footChild.height) >= point.y) {
                                if (footChild instanceof page_1.ParagraphWidget) {
                                    return this.getLineWidgetParaWidget(footChild, point);
                                }
                                else {
                                    return this.getLineWidgetTableWidget(footChild, point);
                                }
                            }
                        }
                    }
                    else {
                        var bodyWidget = widget.bodyWidgets[j];
                        if (bodyWidget.firstChild.x + bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].width >= point.x && bodyWidget.firstChild.x <= point.x && bodyWidget.firstChild.y <= point.y && this.documentHelper.layout.getNextWidgetHeight(bodyWidget) >= point.y) {
                            selectionBody = bodyWidget;
                        }
                        else if (bodyWidget.firstChild.x + bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].width < point.x && bodyWidget.firstChild.y <= point.y && this.documentHelper.layout.getNextWidgetHeight(bodyWidget) >= point.y) {
                            selectionBody = bodyWidget;
                        }
                        else if (widget.x > point.x && bodyWidget.firstChild.y <= point.y && this.documentHelper.layout.getNextWidgetHeight(bodyWidget) >= point.y && !isFit) {
                            selectionBody = bodyWidget;
                            isFit = true;
                        }
                        if (j === widget.bodyWidgets.length - 1 && !ej2_base_1.isNullOrUndefined(selectionBody)) {
                            for (var k = 0; k < selectionBody.childWidgets.length; k++) {
                                var footChild = selectionBody.childWidgets[k];
                                if (footChild instanceof page_1.Widget && footChild.y <= point.y
                                    && (footChild.y + footChild.height) >= point.y) {
                                    if (footChild instanceof page_1.ParagraphWidget) {
                                        return this.getLineWidgetParaWidget(footChild, point);
                                    }
                                    else {
                                        return this.getLineWidgetTableWidget(footChild, point);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var childWidget = widget.childWidgets[i];
                if (childWidget instanceof page_1.FootNoteWidget) {
                    return childWidget[i];
                }
                else {
                    if (childWidget instanceof page_1.Widget && childWidget.y <= point.y
                        && (childWidget.y + childWidget.height) >= point.y) {
                        if (childWidget instanceof page_1.ParagraphWidget) {
                            return this.getLineWidgetParaWidget(childWidget, point);
                        }
                        else {
                            var table = childWidget;
                            if (table.wrapTextAround) {
                                continue;
                            }
                            return this.getLineWidgetTableWidget(table, point);
                        }
                    }
                }
            }
            var line = undefined;
            if (isGetFirstChild) {
                if (widget.childWidgets.length > 0) {
                    var firstChild = widget.childWidgets[0];
                    if (firstChild instanceof page_1.Widget && firstChild.y <= point.y) {
                        if (widget.childWidgets[widget.childWidgets.length - 1] instanceof page_1.ParagraphWidget) {
                            for (var i = 0; i < widget.childWidgets.length; i++) {
                                line = this.getLineWidgetParaWidget(widget.childWidgets[i], point);
                            }
                        }
                        else {
                            for (var i = 0; i < widget.childWidgets.length; i++) {
                                line = this.getLineWidgetTableWidget(widget.childWidgets[i], point);
                            }
                        }
                    }
                    else {
                        var childWidget = undefined;
                        if (firstChild instanceof page_1.Widget) {
                            childWidget = firstChild;
                        }
                        if (!ej2_base_1.isNullOrUndefined(childWidget)) {
                            if (childWidget instanceof page_1.ParagraphWidget) {
                                line = this.getLineWidgetParaWidget(firstChild, point);
                            }
                            else {
                                line = this.getLineWidgetTableWidget(firstChild, point);
                            }
                        }
                    }
                }
            }
            return line;
        };
        Selection.prototype.getLineWidgetParaWidget = function (widget, point) {
            var childWidgets = widget.childWidgets;
            var top = widget.y;
            for (var i = 0; i < childWidgets.length; i++) {
                var line = childWidgets[i];
                top += line.marginTop;
                var lineTotalHeight = line.height;
                if (line.nextLine && line.nextLine.marginTop > 0) {
                    lineTotalHeight += line.nextLine.marginTop;
                }
                if (top <= point.y
                    && (top + lineTotalHeight) >= point.y) {
                    return line;
                }
                top += line.height;
            }
            var lineWidget = undefined;
            if (childWidgets.length > 0) {
                if (widget.y <= point.y) {
                    lineWidget = childWidgets[childWidgets.length - 1];
                }
                else {
                    lineWidget = childWidgets[0];
                }
            }
            return lineWidget;
        };
        Selection.prototype.highlightParagraph = function (widget, startIndex, endLine, endElement, endIndex) {
            var top = 0;
            var width = 0;
            var isRtlText = false;
            if (widget.paragraphFormat.bidi && endLine.children.indexOf(endElement) > 0) {
                endElement = endLine.children[0];
            }
            for (var i = startIndex; i < widget.childWidgets.length; i++) {
                var line = widget.childWidgets[i];
                if (i === startIndex) {
                    top = this.getTop(line);
                }
                else {
                    top += line.marginTop;
                }
                if (endElement instanceof page_1.TextElementBox) {
                    isRtlText = endElement.isRightToLeft;
                }
                var left = this.getLeft(line);
                if (line === endLine) {
                    var right = 0;
                    if (isRtlText || widget.bidi) {
                        var elementBoxCollection = this.getElementsBackward(line, endElement, endElement, widget.bidi);
                        for (var i_2 = 0; i_2 < elementBoxCollection.length; i_2++) {
                            var element = elementBoxCollection[i_2];
                            var elementIsRTL = false;
                            if (element === endElement) {
                                right = this.getLeftInternal(line, element, element.length);
                            }
                            else {
                                var index = element instanceof page_1.TextElementBox ? element.length : 1;
                                right = this.getLeftInternal(line, element, index);
                            }
                            left = this.getLeftInternal(line, element, 0);
                            if (element instanceof page_1.TextElementBox) {
                                elementIsRTL = element.isRightToLeft;
                            }
                            width = Math.abs(right - left);
                            if (element === endElement && element instanceof page_1.TextElementBox && endIndex > element.length) {
                                var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(element.line.paragraph.characterFormat).Width;
                                if (!widget.bidi && elementIsRTL) {
                                    right += paragraphMarkWidth;
                                }
                                else if (widget.bidi && !elementIsRTL) {
                                    width -= paragraphMarkWidth;
                                    this.createHighlightBorder(line, width, left, top, true);
                                    left = this.getLineStartLeft(line) - paragraphMarkWidth;
                                    this.createHighlightBorder(line, paragraphMarkWidth, left, top, true);
                                    continue;
                                }
                            }
                            this.createHighlightBorder(line, width, elementIsRTL ? right : left, top, true);
                        }
                        return;
                    }
                    else {
                        right = this.getLeftInternal(endLine, endElement, endIndex);
                        width = Math.abs(right - left);
                        this.createHighlightBorder(line, width, isRtlText ? right : left, top, false);
                        return;
                    }
                }
                else {
                    width = this.getWidth(line, true) - (left - widget.x);
                    if (widget.bidi && line.isLastLine()) {
                        left -= this.documentHelper.textHelper.getParagraphMarkSize(widget.characterFormat).Width;
                    }
                    this.createHighlightBorder(line, width, left, top, false);
                    top += line.height;
                }
            }
        };
        Selection.prototype.getLineWidgetTableWidget = function (widget, point) {
            var lineWidget = undefined;
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var childWidget = widget.childWidgets[i];
                if (childWidget instanceof page_1.TableRowWidget && childWidget.y <= point.y) {
                    if (childWidget.rowFormat.heightType === 'Exactly' &&
                        (childWidget.y + editor_helper_1.HelperMethods.convertPointToPixel(childWidget.rowFormat.height) < point.y)) {
                        continue;
                    }
                    lineWidget = this.getLineWidgetRowWidget(childWidget, point);
                    var cellWidget = undefined;
                    if (!ej2_base_1.isNullOrUndefined(lineWidget) && lineWidget.paragraph.containerWidget instanceof page_1.TableCellWidget) {
                        cellWidget = lineWidget.paragraph.containerWidget;
                    }
                    var cellSpacing = 0;
                    var rowSpan = 0;
                    if (!ej2_base_1.isNullOrUndefined(cellWidget)) {
                        var tableWidget = cellWidget.ownerRow.containerWidget;
                        cellSpacing = editor_helper_1.HelperMethods.convertPointToPixel(tableWidget.tableFormat.cellSpacing);
                        rowSpan = cellWidget.cellFormat.rowSpan;
                    }
                    var leftCellSpacing = 0;
                    var rightCellSpacing = 0;
                    var topCellSpacing = 0;
                    var bottomCellSpacing = 0;
                    if (cellSpacing > 0) {
                        leftCellSpacing = cellWidget.cellIndex === 0 ? cellSpacing : cellSpacing / 2;
                        rightCellSpacing = cellWidget.cellIndex === cellWidget.ownerRow.childWidgets.length - 1 ? cellSpacing : cellSpacing / 2;
                        var rowWidget = undefined;
                        if (cellWidget.containerWidget instanceof page_1.TableRowWidget) {
                            rowWidget = cellWidget.containerWidget;
                        }
                        var tableWidget = undefined;
                        if (cellWidget.containerWidget.containerWidget instanceof page_1.TableWidget) {
                            tableWidget = cellWidget.containerWidget.containerWidget;
                        }
                        if (!ej2_base_1.isNullOrUndefined(rowWidget) && !ej2_base_1.isNullOrUndefined(tableWidget)) {
                            topCellSpacing = cellWidget.ownerRow.rowIndex === 0 ? cellSpacing : cellSpacing / 2;
                            if (cellWidget.ownerRow.rowIndex + rowSpan === cellWidget.ownerTable.childWidgets.length) {
                                bottomCellSpacing = cellSpacing;
                            }
                            else {
                                bottomCellSpacing = cellSpacing / 2;
                            }
                        }
                    }
                    if ((!ej2_base_1.isNullOrUndefined(lineWidget) && lineWidget.paragraph.x <= point.x
                        && lineWidget.paragraph.x + lineWidget.width >= point.x
                        && lineWidget.paragraph.y <= point.y && this.getTop(lineWidget) + lineWidget.height >= point.y)
                        || (!ej2_base_1.isNullOrUndefined(cellWidget) && cellWidget.x - cellWidget.margin.left - leftCellSpacing <= point.x
                            && cellWidget.x + cellWidget.width + cellWidget.margin.right + rightCellSpacing >= point.x
                            && cellWidget.y - cellWidget.margin.top - topCellSpacing <= point.y
                            && cellWidget.y + cellWidget.height + cellWidget.margin.bottom + bottomCellSpacing >= point.y)) {
                        break;
                    }
                }
            }
            return lineWidget;
        };
        Selection.prototype.getLineWidgetRowWidget = function (widget, point) {
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var cellSpacing = 0;
                cellSpacing = editor_helper_1.HelperMethods.convertPointToPixel(widget.ownerTable.tableFormat.cellSpacing);
                var leftCellSpacing = 0;
                var rightCellSpacing = 0;
                if (cellSpacing > 0) {
                    leftCellSpacing = widget.childWidgets[i].columnIndex === 0 ? cellSpacing : cellSpacing / 2;
                    rightCellSpacing = widget.childWidgets[i].cellIndex === widget.childWidgets[i].ownerRow.childWidgets.length - 1 ? cellSpacing : cellSpacing / 2;
                }
                if (widget.childWidgets[i].x -
                    widget.childWidgets[i].margin.left - leftCellSpacing <= point.x && (widget.childWidgets[i].x +
                    widget.childWidgets[i].width) + widget.childWidgets[i].margin.right + rightCellSpacing >= point.x) {
                    return this.getLineWidgetCellWidget(widget.childWidgets[i], point);
                }
            }
            var lineWidget = undefined;
            if (widget.childWidgets.length > 0) {
                if (widget.childWidgets[0].x <= point.x) {
                    lineWidget = this.getLineWidgetCellWidget(widget.childWidgets[widget.childWidgets.length - 1], point);
                }
                else {
                    lineWidget = this.getLineWidgetCellWidget(widget.childWidgets[0], point);
                }
            }
            return lineWidget;
        };
        Selection.prototype.getFirstBlock = function (cell) {
            if (cell.childWidgets.length > 0) {
                return cell.childWidgets[0];
            }
            return undefined;
        };
        Selection.prototype.highlightCellWidget = function (widget) {
            var widgets = [];
            if (widget.previousSplitWidget || widget.nextSplitWidget) {
                widgets = widget.getSplitWidgets();
            }
            else {
                widgets.push(widget);
            }
            for (var i = 0; i < widgets.length; i++) {
                widget = widgets[i];
                this.clearChildSelectionHighlight(widget);
                this.createHighlightBorderInsideTable(widget);
            }
        };
        Selection.prototype.clearSelectionHighlight = function (widget) {
            if (this.selectedWidgets.containsKey(widget)) {
                this.removeSelectionHighlight(widget);
                this.selectedWidgets.remove(widget);
            }
        };
        Selection.prototype.getLineWidgetCellWidget = function (widget, point) {
            for (var i = 0; i < widget.childWidgets.length; i++) {
                if (widget.childWidgets[i].y <= point.y
                    && (widget.childWidgets[i].y + widget.childWidgets[i].height) >= point.y) {
                    if (widget.childWidgets[i] instanceof page_1.ParagraphWidget) {
                        return this.getLineWidgetParaWidget(widget.childWidgets[i], point);
                    }
                    else {
                        return this.getLineWidgetTableWidget(widget.childWidgets[i], point);
                    }
                }
            }
            var lineWidget = undefined;
            if (widget.childWidgets.length > 0) {
                if (widget.childWidgets[0].y <= point.y) {
                    if (widget.childWidgets[widget.childWidgets.length - 1] instanceof page_1.ParagraphWidget) {
                        lineWidget = this.getLineWidgetParaWidget(widget.childWidgets[widget.childWidgets.length - 1], point);
                    }
                    else {
                        lineWidget = this.getLineWidgetTableWidget(widget.childWidgets[0], point);
                    }
                }
            }
            return lineWidget;
        };
        Selection.prototype.updateTextPosition = function (widget, point) {
            var caretPosition = point;
            var element = undefined;
            var index = 0;
            var isImageSelected = false;
            if (this.owner.enableHeaderAndFooter) {
                var headerFooterWidget = this.start.paragraph.bodyWidget;
                if (headerFooterWidget.headerFooterType.indexOf('Header') != -1) {
                    this.comparePageWidthAndMargins(headerFooterWidget.page.headerWidget, headerFooterWidget.page);
                }
                else {
                    this.comparePageWidthAndMargins(headerFooterWidget.page.footerWidget, headerFooterWidget.page);
                }
            }
            var isImageSelectedObj = this.updateTextPositionIn(widget, element, index, point, false);
            if (!ej2_base_1.isNullOrUndefined(isImageSelectedObj)) {
                element = isImageSelectedObj.element;
                index = isImageSelectedObj.index;
                caretPosition = isImageSelectedObj.caretPosition;
                isImageSelected = isImageSelectedObj.isImageSelected;
                this.isImageSelected = isImageSelected;
            }
            if (isImageSelected) {
                this.selectInternal(widget, element, index, caretPosition);
                if (index === 0) {
                    this.extendForward();
                }
                else {
                    this.extendBackward();
                }
            }
            else {
                this.selectInternal(widget, element, index, caretPosition);
            }
        };
        Selection.prototype.updateTextPositionIn = function (widget, inline, index, caretPosition, includeParagraphMark) {
            var isImageSelected = false;
            var top = this.getTop(widget);
            var left = widget.paragraph.x;
            var elementValues = this.getFirstElement(widget, left);
            var element = elementValues.element;
            var isRtlText = false;
            var isParaBidi = false;
            left = elementValues.left;
            var children = widget.renderedElements;
            if (ej2_base_1.isNullOrUndefined(element)) {
                var topMargin = 0;
                var bottomMargin = 0;
                var size = this.getParagraphMarkSize(widget.paragraph, topMargin, bottomMargin);
                topMargin = size.topMargin;
                bottomMargin = size.bottomMargin;
                var selectParaMark = this.documentHelper.mouseDownOffset.y >= top && this.documentHelper.mouseDownOffset.y < top + widget.height ? (this.documentHelper.mouseDownOffset.x < left + size.width) : true;
                if (selectParaMark && includeParagraphMark && caretPosition.x > left + size.width / 2) {
                    left += size.width;
                    if (children.length > 0) {
                        inline = children[children.length - 1];
                        index = inline.length;
                    }
                    index++;
                }
                else if (widget.paragraph.isEmpty() && widget.paragraph.bidi) {
                    left += size.width;
                }
                caretPosition = new editor_helper_1.Point(left, topMargin > 0 ? top + topMargin : top);
            }
            else {
                if (!ej2_base_1.isNullOrUndefined(element)) {
                    if (caretPosition.x > left + element.margin.left || (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline')) {
                        var isInInline = false;
                        if (widget.paragraph.floatingElements.length > 0) {
                            isInInline = this.documentHelper.checkPointIsInLine(widget, caretPosition);
                        }
                        for (var i = children.indexOf(element); i < children.length; i++) {
                            element = children[i];
                            if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline') {
                                if (this.documentHelper.isInShapeBorder(element, caretPosition) &&
                                    !this.documentHelper.isSelectionChangedOnMouseMoved && !isInInline) {
                                    left = element.x;
                                    top = element.y;
                                    break;
                                }
                                continue;
                            }
                            var isCurrentParaBidi = false;
                            if (element instanceof page_1.ListTextElementBox || element instanceof page_1.TextElementBox) {
                                isCurrentParaBidi = element.line.paragraph.paragraphFormat.bidi;
                            }
                            if (caretPosition.x < left + element.margin.left + element.width + element.padding.left || i === children.length - 1
                                || ((children[i + 1] instanceof page_1.ListTextElementBox) && isCurrentParaBidi)) {
                                break;
                            }
                            left += element.margin.left + element.width + element.padding.left;
                        }
                        if (element instanceof page_1.TextElementBox) {
                            isRtlText = element.isRightToLeft;
                            isParaBidi = element.line.paragraph.paragraphFormat.bidi;
                        }
                        if (caretPosition.x > left + element.margin.left + element.width + element.padding.left) {
                            index = element instanceof page_1.TextElementBox ? element.length : 1;
                            if (isRtlText && isParaBidi) {
                                index = 0;
                            }
                            if ((element instanceof page_1.TextElementBox && (element.text !== "\v" && element.text !== '\f' && element.text !== String.fromCharCode(14))) || includeParagraphMark) {
                                left += element.margin.left + element.width + element.padding.left;
                            }
                        }
                        else if (element instanceof page_1.TextElementBox) {
                            if (element instanceof page_1.TextElementBox && isRtlText) {
                                left += element.width + element.padding.left;
                            }
                            var x = 0;
                            if (isRtlText) {
                                x = (left + element.margin.left) - caretPosition.x;
                            }
                            else {
                                x = caretPosition.x - left - element.margin.left - element.padding.left;
                            }
                            left += (element.margin.left + element.padding.left);
                            var prevWidth = 0;
                            var charIndex = 0;
                            for (var i = 1; i <= element.length; i++) {
                                var width = 0;
                                if (i === element.length) {
                                    width = element.width + element.padding.left;
                                }
                                else {
                                    width = this.documentHelper.textHelper.getWidth(element.text.substr(0, i), element.characterFormat, element.scriptType);
                                    element.trimEndWidth = width;
                                }
                                if (x < width || i === element.length) {
                                    var charWidth = width - prevWidth;
                                    if (x - prevWidth > charWidth / 2) {
                                        if (isRtlText) {
                                            left -= width;
                                        }
                                        else {
                                            left += width;
                                        }
                                        charIndex = i;
                                    }
                                    else {
                                        if (isRtlText) {
                                            left -= prevWidth;
                                        }
                                        else {
                                            left += prevWidth;
                                        }
                                        charIndex = i - 1;
                                        if (i === 1 && element !== children[0] && !(children[0] instanceof page_1.ShapeBase &&
                                            children[0].textWrappingStyle !== 'Inline')) {
                                            var curIndex = children.indexOf(element);
                                            if (!(children[curIndex - 1] instanceof page_1.ListTextElementBox) && !isRtlText) {
                                                element = children[curIndex - 1];
                                                if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline' && charIndex == 0 && !ej2_base_1.isNullOrUndefined(element.previousElement)) {
                                                    element = children[children.indexOf(element) - 1];
                                                }
                                                charIndex = element instanceof page_1.TextElementBox ? element.length : 1;
                                            }
                                        }
                                    }
                                    break;
                                }
                                prevWidth = width;
                            }
                            index = charIndex;
                        }
                        else {
                            isImageSelected = element instanceof page_1.ImageElementBox || element instanceof page_1.ShapeElementBox;
                            if (caretPosition.x - left - element.margin.left > element.width / 2) {
                                index = 1;
                                left += (element.margin.left + element.width + element.padding.left);
                            }
                            else if (element !== children[0] && !isImageSelected) {
                                var curIndex = children.indexOf(element);
                                if (!(children[curIndex - 1] instanceof page_1.ListTextElementBox)) {
                                    element = children[curIndex - 1];
                                    index = element instanceof page_1.TextElementBox ? element.length : 1;
                                }
                            }
                        }
                        if (element instanceof page_1.TextElementBox && (element.text === '\v' || element.text === '\f' || element.text === String.fromCharCode(14))) {
                            index = 0;
                        }
                    }
                    else {
                        isRtlText = element.isRightToLeft;
                        isParaBidi = element.line.paragraph.paragraphFormat.bidi;
                        if (element instanceof page_1.TextElementBox && (isParaBidi || isRtlText) && caretPosition.x < left + element.margin.left + element.width + element.padding.left) {
                            index = this.getTextLength(element.line, element) + element.length;
                        }
                        else {
                            index = this.getTextLength(element.line, element);
                        }
                        left += element.margin.left;
                    }
                    if (element instanceof page_1.TextElementBox) {
                        top += element.margin.top > 0 ? element.margin.top : 0;
                    }
                    else {
                        var textMetrics = this.documentHelper.textHelper.getHeight(element.characterFormat);
                        var height = element.height;
                        if (element instanceof page_1.BookmarkElementBox && !this.documentHelper.layout.hasValidElement(element.line.paragraph)) {
                            height = textMetrics.Height;
                        }
                        top += element.margin.top + height - textMetrics.BaselineOffset;
                    }
                    inline = element;
                    if (inline instanceof page_1.FieldElementBox && inline.fieldType === 2 && !ej2_base_1.isNullOrUndefined(inline.fieldBegin)) {
                        inline = inline.fieldBegin;
                        index = 0;
                    }
                    if (inline instanceof page_1.EditRangeEndElementBox) {
                        index = 0;
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline.previousElement) && inline.previousElement instanceof page_1.ShapeBase && inline.previousElement.textWrappingStyle !== 'Inline' && index == 0) {
                        inline = inline.previousElement;
                    }
                    var inlineObj = this.validateTextPosition(inline, index);
                    inline = inlineObj.element;
                    index = inlineObj.index;
                    var isParagraphEnd = ej2_base_1.isNullOrUndefined(inline.nextNode) && index === inline.length;
                    var isLineEnd = inline.line.isEndsWithLineBreak
                        && inline instanceof page_1.TextElementBox && inline.text === '\v';
                    if (includeParagraphMark && inline.nextNode instanceof page_1.FieldElementBox && index === inline.length) {
                        isParagraphEnd = this.isLastRenderedInline(inline, index);
                    }
                    if (includeParagraphMark && isParagraphEnd || isLineEnd) {
                        var width = 0;
                        if (isParagraphEnd) {
                            width = this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
                            var selectParaMark = this.documentHelper.mouseDownOffset.y >= top && this.documentHelper.mouseDownOffset.y < top + widget.height ? (this.documentHelper.mouseDownOffset.x < left + width) : true;
                            if (selectParaMark && caretPosition.x > left + width / 2) {
                                left += width;
                                index = inline.length + 1;
                            }
                        }
                        else if (isLineEnd) {
                            width = element.width + element.padding.left;
                            left += width;
                        }
                    }
                    caretPosition = new editor_helper_1.Point(left, top);
                }
            }
            return {
                'element': inline,
                'index': index,
                'caretPosition': caretPosition,
                'isImageSelected': isImageSelected
            };
        };
        Selection.prototype.checkAllFloatingElements = function (widget, caretPosition) {
            var bodyWidget;
            var isShapeSelected = false;
            var isInShapeBorder = false;
            var floatElement;
            if (!ej2_base_1.isNullOrUndefined(widget)) {
                bodyWidget = widget.paragraph.bodyWidget;
                isShapeSelected = false;
                isInShapeBorder = false;
                for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                    if (bodyWidget.floatingElements[i] instanceof page_1.TableWidget) {
                        continue;
                    }
                    floatElement = bodyWidget.floatingElements[i];
                    if (caretPosition.x < floatElement.x + floatElement.margin.left + floatElement.width && caretPosition.x > floatElement.x
                        && caretPosition.y < floatElement.y + floatElement.margin.top + floatElement.height && caretPosition.y > floatElement.y) {
                        isShapeSelected = true;
                        if (this.documentHelper.isInShapeBorder(floatElement, caretPosition)) {
                            isInShapeBorder = true;
                        }
                        break;
                    }
                }
            }
            return {
                'element': floatElement,
                'caretPosition': caretPosition,
                'isShapeSelected': isShapeSelected,
                'isInShapeBorder': isInShapeBorder
            };
        };
        Selection.prototype.getTextLength = function (widget, element) {
            var length = 0;
            var renderedElement = widget.renderedElements;
            var count = renderedElement.indexOf(element);
            if (renderedElement.length > 0 && renderedElement[0] instanceof page_1.ListTextElementBox) {
                if (renderedElement[1] instanceof page_1.ListTextElementBox) {
                    count -= 2;
                }
                else {
                    count -= 1;
                }
            }
            for (var i = 1; i < count; i++) {
                length += renderedElement[i].length;
            }
            return length;
        };
        Selection.prototype.getLeft = function (widget) {
            var left = widget.paragraph.x;
            var paragraphFormat = widget.paragraph.paragraphFormat;
            if (this.isParagraphFirstLine(widget) && !paragraphFormat.bidi && !(paragraphFormat.textAlignment === 'Right')) {
                left += editor_helper_1.HelperMethods.convertPointToPixel(paragraphFormat.firstLineIndent);
            }
            var renderedElements = widget.renderedElements;
            for (var i = 0; i < renderedElements.length; i++) {
                var element = renderedElements[i];
                if (element instanceof page_1.ListTextElementBox && !paragraphFormat.bidi) {
                    if (i === 0) {
                        left += element.margin.left + element.width;
                    }
                    else {
                        left += element.width;
                    }
                }
                else {
                    left += element.margin.left;
                    break;
                }
            }
            return left;
        };
        Selection.prototype.getTop = function (widget) {
            var top = widget.paragraph.y;
            var count = widget.paragraph.childWidgets.indexOf(widget);
            for (var i = 0; i < count; i++) {
                var line = widget.paragraph.childWidgets[i];
                top = (top + line.height + line.marginTop);
            }
            top += widget.marginTop;
            return top;
        };
        Selection.prototype.getFirstElement = function (widget, left) {
            var firstLineIndent = 0;
            if (this.isParagraphFirstLine(widget) && !widget.paragraph.paragraphFormat.bidi) {
                firstLineIndent = editor_helper_1.HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.firstLineIndent);
            }
            left += firstLineIndent;
            var element = undefined;
            var renderedChild = widget.renderedElements;
            for (var i = 0; i < renderedChild.length; i++) {
                element = renderedChild[i];
                if (element instanceof page_1.ListTextElementBox || element instanceof page_1.CommentCharacterElementBox) {
                    if (widget.paragraph.paragraphFormat.bidi) {
                        left += element.margin.left;
                        element = undefined;
                        break;
                    }
                    left += element.margin.left + element.width;
                    element = undefined;
                }
                else {
                    break;
                }
            }
            return { 'element': element, 'left': left };
        };
        Selection.prototype.getIndexInInline = function (elementBox) {
            var indexInInline = 0;
            if (elementBox instanceof page_1.TextElementBox) {
                var count = elementBox.line.children.indexOf(elementBox);
                for (var i = 0; i < count; i++) {
                    var element = elementBox.line.children[i];
                    if (element instanceof page_1.FieldElementBox || element instanceof page_1.ListTextElementBox) {
                        continue;
                    }
                    indexInInline += element.length;
                }
            }
            return indexInInline;
        };
        Selection.prototype.isParagraphFirstLine = function (widget) {
            if (ej2_base_1.isNullOrUndefined(widget.paragraph.previousSplitWidget) &&
                widget === widget.paragraph.firstChild) {
                return true;
            }
            return false;
        };
        Selection.prototype.isParagraphLastLine = function (widget) {
            if (ej2_base_1.isNullOrUndefined(widget.paragraph.nextSplitWidget)
                && widget === widget.paragraph.lastChild) {
                return true;
            }
            return false;
        };
        Selection.prototype.getWidth = function (widget, includeParagraphMark) {
            var width = 0;
            var paraFormat = widget.paragraph.paragraphFormat;
            if (this.isParagraphFirstLine(widget) && !paraFormat.bidi) {
                width += editor_helper_1.HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
            }
            for (var i = 0; i < widget.children.length; i++) {
                var elementBox = widget.children[i];
                if (elementBox instanceof page_1.ShapeBase && elementBox.textWrappingStyle !== 'Inline') {
                    continue;
                }
                width += (elementBox.margin.left + elementBox.width + elementBox.padding.left);
            }
            if (includeParagraphMark && widget.paragraph.childWidgets.indexOf(widget) === widget.paragraph.childWidgets.length - 1
                && ej2_base_1.isNullOrUndefined(widget.paragraph.nextSplitWidget)) {
                width += this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
            }
            return width;
        };
        Selection.prototype.getLeftInternal = function (widget, elementBox, index) {
            var left = widget.paragraph.x;
            var paraFormat = widget.paragraph.paragraphFormat;
            if (this.isParagraphFirstLine(widget) && !paraFormat.bidi) {
                left += editor_helper_1.HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.firstLineIndent);
            }
            var renderedWidget = widget.renderedElements;
            var count = renderedWidget.indexOf(elementBox);
            if ((renderedWidget.length === 1 && renderedWidget[0] instanceof page_1.ListTextElementBox) || (renderedWidget.length === 2
                && renderedWidget[0] instanceof page_1.ListTextElementBox && renderedWidget[1] instanceof page_1.ListTextElementBox)) {
                count = renderedWidget.length;
            }
            var isFieldCode = false;
            for (var i = 0; i < count; i++) {
                var widgetInternal = renderedWidget[i];
                if (widgetInternal instanceof page_1.FieldElementBox && widgetInternal.fieldType === 2) {
                    isFieldCode = false;
                }
                if (isFieldCode) {
                    continue;
                }
                if (widgetInternal instanceof page_1.ShapeBase && widgetInternal.textWrappingStyle !== 'Inline') {
                    continue;
                }
                if (i === 1 && widgetInternal instanceof page_1.ListTextElementBox) {
                    left += widgetInternal.width;
                }
                else if (widgetInternal instanceof page_1.TabElementBox && elementBox === widgetInternal) {
                    left += widgetInternal.margin.left;
                }
                else {
                    left += widgetInternal.margin.left + widgetInternal.width + widgetInternal.padding.left;
                }
                if (widgetInternal instanceof page_1.FieldElementBox && widgetInternal.fieldType === 0) {
                    isFieldCode = true;
                }
            }
            var isRtlText = false;
            var isParaBidi = widget.paragraph.bidi;
            if (!ej2_base_1.isNullOrUndefined(elementBox)) {
                isRtlText = elementBox.characterRange === index_2.CharacterRangeType.RightToLeft;
                isParaBidi = elementBox.line.paragraph.paragraphFormat.bidi;
                left += (elementBox.margin.left + elementBox.padding.left);
                if (elementBox instanceof page_1.ShapeBase && !ej2_base_1.isNullOrUndefined(elementBox.nextElement)) {
                    left += (elementBox.nextElement.margin.left + elementBox.nextElement.padding.left);
                }
                if (isRtlText || (this.documentHelper.moveCaretPosition === 1 && !isRtlText && isParaBidi)) {
                    left += elementBox.width;
                }
            }
            var width = 0;
            if (elementBox instanceof page_1.TextElementBox) {
                if ((this.documentHelper.moveCaretPosition !== 0) && (isParaBidi || isRtlText)) {
                    if ((isRtlText && isParaBidi && this.documentHelper.moveCaretPosition === 2)
                        || (isRtlText && !isParaBidi && this.documentHelper.moveCaretPosition === 1)) {
                        left -= elementBox.width;
                    }
                    this.documentHelper.moveCaretPosition = 0;
                    return left;
                }
                if (index === elementBox.length && !isRtlText) {
                    left += elementBox.width;
                }
                else if (index > elementBox.length) {
                    width = this.documentHelper.textHelper.getParagraphMarkWidth(elementBox.line.paragraph.characterFormat);
                    if (isRtlText) {
                        left -= elementBox.width + width;
                    }
                    else {
                        left += elementBox.width + width;
                    }
                }
                else {
                    if (index === elementBox.length && isRtlText && paraFormat.textAlignment === 'Justify') {
                        width = elementBox.width;
                    }
                    else {
                        width = this.documentHelper.textHelper.getWidth(elementBox.text.substr(0, index), elementBox.characterFormat, elementBox.scriptType);
                    }
                    if (isRtlText) {
                        left -= width;
                    }
                    else {
                        left += width;
                    }
                }
                this.documentHelper.moveCaretPosition = 0;
            }
            else if (index > 0) {
                if (!ej2_base_1.isNullOrUndefined(elementBox) && !(elementBox instanceof page_1.ListTextElementBox)) {
                    if (!(elementBox instanceof page_1.ShapeBase && elementBox.textWrappingStyle !== 'Inline')) {
                        left += elementBox.width;
                    }
                    if (index === 2) {
                        var paragraph = elementBox.line.paragraph;
                        left += this.documentHelper.textHelper.getParagraphMarkWidth(paragraph.characterFormat);
                    }
                }
                else {
                    left += this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
                }
            }
            return left;
        };
        Selection.prototype.getLineStartLeft = function (widget) {
            var left = widget.paragraph.x;
            var paragraphFormat = widget.paragraph.paragraphFormat;
            if (this.isParagraphFirstLine(widget) && !paragraphFormat.bidi) {
                left += editor_helper_1.HelperMethods.convertPointToPixel(paragraphFormat.firstLineIndent);
            }
            if (widget.children.length > 0) {
                left += widget.children[0].margin.left;
            }
            return left;
        };
        Selection.prototype.updateTextPositionWidget = function (widget, point, textPosition, includeParagraphMark) {
            var caretPosition = point;
            var inline = undefined;
            var index = 0;
            var updatePositionObj;
            updatePositionObj = this.updateTextPositionIn(widget, inline, index, caretPosition, includeParagraphMark);
            inline = updatePositionObj.element;
            index = updatePositionObj.index;
            caretPosition = updatePositionObj.caretPosition;
            textPosition.setPositionForSelection(widget, inline, index, caretPosition);
        };
        Selection.prototype.clearSelectionHighlightLineWidget = function (widget) {
            if (!ej2_base_1.isNullOrUndefined(this.owner) && this.selectedWidgets.length > 0) {
                this.clearSelectionHighlight(this);
            }
        };
        Selection.prototype.getFirstElementInternal = function (widget) {
            var element = undefined;
            var childLen = widget.children.length;
            for (var i = 0; i < childLen; i++) {
                element = widget.children[i];
                if (element instanceof page_1.ListTextElementBox) {
                    element = undefined;
                }
                else {
                    break;
                }
            }
            return element;
        };
        Selection.prototype.selectRange = function (startPosition, endPosition, isBookmark) {
            this.start.setPositionInternal(startPosition);
            this.end.setPositionInternal(endPosition);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true, true, isBookmark);
        };
        Selection.prototype.selectParagraphInternal = function (paragraph, positionAtStart) {
            var line;
            if (!ej2_base_1.isNullOrUndefined(paragraph) && !ej2_base_1.isNullOrUndefined(paragraph.firstChild)) {
                line = paragraph.firstChild;
                if (positionAtStart) {
                    this.start.setPosition(line, positionAtStart);
                }
                else {
                    var endOffset = line.getEndOffset();
                    this.start.setPositionParagraph(line, endOffset);
                }
            }
            this.end.setPositionInternal(this.start);
            this.upDownSelectionLength = this.start.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.setPositionForBlock = function (block, selectFirstBlock) {
            var position;
            if (block instanceof page_1.TableWidget) {
                if (selectFirstBlock) {
                    block = this.documentHelper.getFirstParagraphInFirstCell(block);
                }
                else {
                    block = this.documentHelper.getLastParagraphInLastCell(block);
                }
            }
            if (block instanceof page_1.ParagraphWidget) {
                position = new selection_helper_1.TextPosition(this.owner);
                if (selectFirstBlock) {
                    position.setPosition(block.firstChild, true);
                }
                else {
                    var line = block.lastChild;
                    position.setPositionParagraph(line, line.getEndOffset());
                }
            }
            return position;
        };
        Selection.prototype.selectContent = function (textPosition, clearMultiSelection) {
            if (ej2_base_1.isNullOrUndefined(textPosition)) {
                throw new Error('textPosition is undefined.');
            }
            this.start.setPositionInternal(textPosition);
            this.end.setPositionInternal(textPosition);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.selectInternal = function (lineWidget, element, index, physicalLocation) {
            this.start.setPositionForSelection(lineWidget, element, index, physicalLocation);
            this.end.setPositionInternal(this.start);
            this.upDownSelectionLength = physicalLocation.x;
            this.fireSelectionChanged(true);
        };
        Selection.prototype.selects = function (lineWidget, offset, skipSelectionChange) {
            this.documentHelper.clearSelectionHighlight();
            this.start.setPositionForLineWidget(lineWidget, offset);
            this.end.setPositionInternal(this.start);
            if (!skipSelectionChange) {
                this.fireSelectionChanged(true);
            }
        };
        Selection.prototype.selectPosition = function (startPosition, endPosition) {
            if (ej2_base_1.isNullOrUndefined(startPosition) || ej2_base_1.isNullOrUndefined(endPosition)) {
                throw new Error('TextPosition cannot be undefined');
            }
            if (ej2_base_1.isNullOrUndefined(startPosition.paragraph)
                || startPosition.offset > this.getParagraphLength(startPosition.paragraph) + 1) {
                throw new Error('Start TextPosition is not valid.');
            }
            if (ej2_base_1.isNullOrUndefined(endPosition.paragraph)
                || endPosition.offset > this.getParagraphLength(endPosition.paragraph) + 1) {
                throw new Error('End TextPosition is not valid.');
            }
            if (startPosition.isAtSamePosition(endPosition)) {
                this.selectRange(startPosition, startPosition);
            }
            else {
                if (startPosition.isExistBefore(endPosition)) {
                    endPosition.validateForwardFieldSelection(startPosition.getHierarchicalIndexInternal(), endPosition.getHierarchicalIndexInternal());
                }
                else {
                    startPosition.validateForwardFieldSelection(endPosition.getHierarchicalIndexInternal(), startPosition.getHierarchicalIndexInternal());
                }
                this.selectRange(startPosition, endPosition);
            }
        };
        Selection.prototype.fireSelectionChanged = function (isSelectionChanged, isKeyBoardNavigation, isBookmark) {
            if (!this.isEmpty) {
                if (this.isForward) {
                    this.start.updatePhysicalPosition(true);
                    this.end.updatePhysicalPosition(false);
                }
                else {
                    this.start.updatePhysicalPosition(false);
                    this.end.updatePhysicalPosition(true);
                }
            }
            if (this.isModifyingSelectionInternally) {
                return;
            }
            if (this.documentHelper.isFormFillProtectedMode && isSelectionChanged && !this.isFormatUpdated && !this.documentHelper.isTextFormEmpty && !this.owner.documentHelper.layout.isRelayout) {
                this.currentFormField = this.getCurrentFormField();
            }
            if (!this.skipFormatRetrieval) {
                this.retrieveCurrentFormatProperties();
            }
            this.documentHelper.clearSelectionHighlight();
            this.hideToolTip();
            if (this.owner.isLayoutEnabled && !this.owner.isShiftingEnabled) {
                this.highlightSelection(true, isBookmark);
            }
            if (this.documentHelper.restrictEditingPane.isShowRestrictPane && !this.skipEditRangeRetrieval) {
                this.documentHelper.restrictEditingPane.updateUserInformation();
            }
            if (isSelectionChanged) {
                if (this.start.paragraph.isInHeaderFooter && !this.owner.enableHeaderAndFooter) {
                    this.owner.enableHeaderAndFooter = true;
                }
                else if (!this.start.paragraph.isInHeaderFooter && this.owner.enableHeaderAndFooter) {
                    this.owner.enableHeaderAndFooter = false;
                }
                this.owner.fireSelectionChange();
            }
            if (this.owner.enableAutoFocus) {
                this.documentHelper.updateFocus();
            }
            if (this.documentHelper.isFormFillProtectedMode && isSelectionChanged) {
                this.triggerFormFillEvent(isKeyBoardNavigation);
                this.previousSelectedFormField = this.currentFormField;
            }
            if (this.owner.rulerHelper && this.owner.documentEditorSettings && this.owner.documentEditorSettings.showRuler &&
                !this.owner.isReadOnlyMode) {
                this.owner.rulerHelper.updateRuler(this.owner, false);
            }
        };
        Selection.prototype.retrieveCurrentFormatProperties = function () {
            this.isRetrieveFormatting = true;
            var startPosition = this.start;
            var endPosition = this.end;
            if (!this.isForward) {
                startPosition = this.end;
                endPosition = this.start;
            }
            this.retrieveImageFormat(startPosition, endPosition);
            this.retrieveCharacterFormat(startPosition, endPosition);
            this.retrieveParagraphFormat(startPosition, endPosition);
            this.retrieveSectionFormat(startPosition, endPosition);
            this.retrieveTableFormat(startPosition, endPosition);
            this.isRetrieveFormatting = false;
            this.setCurrentContextType();
        };
        Selection.prototype.retrieveImageFormat = function (start, end) {
            var image;
            if (start.currentWidget === end.currentWidget && start.offset + 1 === end.offset) {
                var elementInfo = end.currentWidget.getInline(end.offset, 0);
                image = elementInfo.element;
                var index = elementInfo.index;
                if (image instanceof page_1.ImageElementBox) {
                    var startOffset = start.currentWidget.getOffset(image, 0);
                    if (startOffset !== start.offset) {
                        image = undefined;
                    }
                }
            }
            if (image instanceof page_1.ImageElementBox) {
                this.imageFormat.copyImageFormat(image);
            }
            else {
                this.imageFormat.clearImageFormat();
            }
        };
        Selection.prototype.getPreviousContextType = function (isElement) {
            var contextType;
            var start = this.start;
            if (start.offset > 0) {
                var element = start.currentWidget.getInline(start.offset, 0).element;
                if (isElement) {
                    element = element.previousElement;
                }
                else {
                    element = start.currentWidget.getInline(start.offset - 1, 0).element;
                }
                contextType = this.getContextElement(element);
                return contextType;
            }
            return undefined;
        };
        Selection.prototype.getNextContextType = function (isElement) {
            var contextType;
            var start = this.start;
            var element = start.currentWidget.getInline(start.offset, 0).element;
            if (isElement && element.nextElement) {
                element = element.nextElement;
            }
            else {
                element = start.currentWidget.getInline(start.offset + 1, 0).element;
            }
            contextType = this.getContextElement(element);
            return contextType;
        };
        Selection.prototype.getContextElement = function (element) {
            if (element instanceof page_1.TextElementBox) {
                return 'Text';
            }
            else if (element instanceof page_1.FieldElementBox || element instanceof page_1.FieldTextElementBox) {
                return 'Field';
            }
            else if (element instanceof page_1.BookmarkElementBox) {
                return 'Bookmark';
            }
            else if (element instanceof page_1.ImageElementBox) {
                return 'Image';
            }
            else if (element instanceof page_1.ShapeElementBox) {
                return 'Shape';
            }
            else if (element instanceof page_1.CommentElementBox || element instanceof page_1.CommentCharacterElementBox) {
                return 'Comment';
            }
            else if (element instanceof page_1.ListTextElementBox) {
                return 'List';
            }
            else if (element instanceof page_1.EditRangeStartElementBox || element instanceof page_1.EditRangeEndElementBox) {
                return 'EditRange';
            }
            else {
                return undefined;
            }
        };
        Selection.prototype.setCurrentContextType = function () {
            var contextIsinImage = this.imageFormat.image ? true : false;
            var contextIsinTable = (ej2_base_1.isNullOrUndefined(this.tableFormat) || ej2_base_1.isNullOrUndefined(this.tableFormat.table)) ? false : true;
            var style = this.start.paragraph.paragraphFormat.baseStyle;
            if (style instanceof index_3.WParagraphStyle && style.name.toLowerCase().indexOf('toc') === 0) {
                var tocField = this.getTocFieldInternal();
                if (!ej2_base_1.isNullOrUndefined(tocField)) {
                    this.contextTypeInternal = 'TableOfContents';
                    return;
                }
            }
            var currentRevision = this.getCurrentRevision();
            if (!ej2_base_1.isNullOrUndefined(currentRevision) && this.owner.showRevisions) {
                this.owner.trackChangesPane.currentSelectedRevision = currentRevision[0];
                if (ej2_base_1.isNullOrUndefined(this.owner.documentHelper.currentSelectedComment)) {
                    this.owner.commentReviewPane.selectReviewTab('Changes');
                }
                this.owner.notify('reviewPane', { comment: this.owner.showComments, changes: true, isUserClosed: false });
            }
            else if (!ej2_base_1.isNullOrUndefined(this.owner.trackChangesPane.currentSelectedRevision)) {
                this.owner.trackChangesPane.currentSelectedRevision = undefined;
            }
            if (this.start.paragraph.isInHeaderFooter) {
                var isInHeader = this.start.paragraph.bodyWidget.headerFooterType.indexOf('Header') !== -1;
                if (contextIsinTable) {
                    if (contextIsinImage) {
                        this.contextTypeInternal = isInHeader ? 'HeaderTableImage' : 'FooterTableImage';
                    }
                    else {
                        this.contextTypeInternal = isInHeader ? 'HeaderTableText' : 'FooterTableText';
                    }
                }
                else {
                    if (contextIsinImage) {
                        this.contextTypeInternal = isInHeader ? 'HeaderImage' : 'FooterImage';
                    }
                    else {
                        this.contextTypeInternal = isInHeader ? 'HeaderText' : 'FooterText';
                    }
                }
            }
            else {
                if (contextIsinTable) {
                    this.contextTypeInternal = contextIsinImage ? 'TableImage' : 'TableText';
                }
                else {
                    this.contextTypeInternal = contextIsinImage ? 'Image' : 'Text';
                }
            }
        };
        Selection.prototype.addItemRevisions = function (currentItem, isFromAccept) {
            for (var i = 0; i < currentItem.revisions.length; i++) {
                var currentRevision = currentItem.revisions[i];
                this.selectRevision(currentRevision);
                if (isFromAccept) {
                    currentRevision.accept();
                }
                else {
                    currentRevision.reject();
                }
            }
        };
        Selection.prototype.hasRevisions = function () {
            if (this.getCurrentRevision()) {
                return true;
            }
            return false;
        };
        Selection.prototype.getCurrentRevision = function () {
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            var elementInfo = start.currentWidget.getInline(start.offset, 0);
            var currentElement = elementInfo.element;
            var startPara = start.paragraph;
            var nextOffsetElement = start.currentWidget.getInline(start.offset + 1, 0).element;
            var eleEndPosition;
            if (currentElement && currentElement === nextOffsetElement) {
                var offset = currentElement.line.getOffset(currentElement, (currentElement.length));
                eleEndPosition = new selection_helper_1.TextPosition(this.owner);
                eleEndPosition.setPositionParagraph(currentElement.line, offset);
                if (end.offset === eleEndPosition.offset && !ej2_base_1.isNullOrUndefined(currentElement.nextElement)) {
                    return undefined;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(currentElement) && currentElement.revisions.length > 0) {
                return currentElement.revisions;
            }
            if (startPara.isInsideTable) {
                var cellWidget = startPara.associatedCell;
                if (!ej2_base_1.isNullOrUndefined(cellWidget.ownerRow) && cellWidget.ownerRow.rowFormat.revisions.length > 0) {
                    return cellWidget.ownerRow.rowFormat.revisions;
                }
            }
            if (end.offset > end.paragraph.getLength()) {
                if (end.paragraph.characterFormat.revisions.length > 0) {
                    return end.paragraph.characterFormat.revisions;
                }
            }
            return undefined;
        };
        Selection.prototype.processLineRevisions = function (linewidget, isFromAccept) {
            for (var i = 0; i < linewidget.children.length; i++) {
                var element = linewidget.children[i];
                if (element.revisions.length > 0) {
                    this.addItemRevisions(element, isFromAccept);
                }
            }
        };
        Selection.prototype.handleAcceptReject = function (isFromAccept) {
            if (this.isEmpty) {
                var elementInfo = this.start.currentWidget.getInline((this.start.offset + 1), 0);
                var currentElement = elementInfo.element;
                var startPara = this.start.paragraph;
                if (!ej2_base_1.isNullOrUndefined(currentElement) && currentElement.revisions.length > 0) {
                    this.addItemRevisions(currentElement, isFromAccept);
                }
                if (startPara.isInsideTable) {
                    var cellWidget = startPara.associatedCell;
                    if (!ej2_base_1.isNullOrUndefined(cellWidget)) {
                        if (cellWidget.ownerRow.rowFormat.revisions.length > 0) {
                            this.addItemRevisions(cellWidget.ownerRow.rowFormat, isFromAccept);
                        }
                    }
                    else if (!startPara.isEmpty()) {
                        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                            var paraWidget = cellWidget.childWidgets[i];
                            for (var lineIndex = void 0; lineIndex < paraWidget.childWidgets.length; lineIndex++) {
                                var linewidget = paraWidget.childWidgets[lineIndex];
                                this.processLineRevisions(linewidget, isFromAccept);
                            }
                        }
                    }
                }
            }
            else {
                var revisions = this.getselectedRevisionElements();
                for (var i = 0; i < revisions.length; i++) {
                    this.acceptReject(revisions[i], isFromAccept);
                }
            }
        };
        Selection.prototype.acceptReject = function (currentRevision, toAccept) {
            this.selectRevision(currentRevision);
            if (toAccept) {
                currentRevision.accept();
            }
            else {
                currentRevision.reject();
            }
        };
        Selection.prototype.getselectedRevisionElements = function () {
            var revisionCollec = [];
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            for (var i = 0; i < this.selectedWidgets.length; i++) {
                var currentWidget = this.selectedWidgets.keys[i];
                if (currentWidget instanceof page_1.LineWidget) {
                    revisionCollec = this.getSelectedLineRevisions(currentWidget, start, end, revisionCollec);
                }
                else if (currentWidget instanceof page_1.TableCellWidget) {
                    if (currentWidget.ownerRow.rowFormat.revisions.length > 0) {
                        revisionCollec = this.addRevisionsCollec(currentWidget.ownerRow.rowFormat.revisions, revisionCollec);
                    }
                    for (var i_3 = 0; i_3 < currentWidget.childWidgets.length; i_3++) {
                        var paraWidget = currentWidget.childWidgets[i_3];
                        for (var lineIndex = 0; lineIndex < paraWidget.childWidgets.length; lineIndex++) {
                            var linewidget = paraWidget.childWidgets[lineIndex];
                            revisionCollec = this.getSelectedLineRevisions(linewidget, start, end, revisionCollec);
                        }
                    }
                }
            }
            return revisionCollec;
        };
        Selection.prototype.getSelectedLineRevisions = function (currentWidget, start, end, elements) {
            if (currentWidget.paragraph.characterFormat.revisions.length > 0) {
                elements = this.addRevisionsCollec(currentWidget.paragraph.characterFormat.revisions, elements);
            }
            for (var j = 0; j < currentWidget.children.length; j++) {
                var currentElement = currentWidget.children[j];
                var offset = currentElement.line.getOffset(currentElement, 0);
                var eleStartPosition = new selection_helper_1.TextPosition(this.owner);
                eleStartPosition.setPositionParagraph(currentElement.line, offset);
                offset = currentElement.line.getOffset(currentElement, (currentElement.length));
                var eleEndPosition = new selection_helper_1.TextPosition(this.owner);
                eleEndPosition.setPositionParagraph(currentElement.line, offset);
                if (((eleEndPosition.isExistAfter(start) && eleEndPosition.isExistBefore(end))
                    || (eleStartPosition.isExistAfter(start) && eleStartPosition.isExistBefore(end))
                    || eleStartPosition.isAtSamePosition(start)
                    || (start.isExistAfter(eleStartPosition) && end.isExistBefore(eleEndPosition))) && currentElement.revisions.length > 0) {
                    elements = this.addRevisionsCollec(currentElement.revisions, elements);
                }
            }
            return elements;
        };
        Selection.prototype.addRevisionsCollec = function (element, revisCollec) {
            for (var i = 0; i < element.length; i++) {
                if (revisCollec.indexOf(element[i]) === -1) {
                    revisCollec.push(element[i]);
                }
            }
            return revisCollec;
        };
        Selection.prototype.retrieveTableFormat = function (start, end) {
            var tableAdv = this.getTable(start, end);
            if (!ej2_base_1.isNullOrUndefined(tableAdv)) {
                this.tableFormat.table = tableAdv;
                this.tableFormat.copyFormat(tableAdv.tableFormat);
                this.retrieveCellFormat(start, end);
                this.retrieveRowFormat(start, end);
            }
            else {
                this.tableFormat.clearFormat();
            }
        };
        Selection.prototype.retrieveCellFormat = function (start, end) {
            if (start.paragraph.isInsideTable && end.paragraph.isInsideTable) {
                this.cellFormat.copyFormat(start.paragraph.associatedCell.cellFormat);
                this.getCellFormat(start.paragraph.associatedCell.ownerTable, start, end);
            }
            else {
                this.cellFormat.clearCellFormat();
            }
        };
        Selection.prototype.retrieveRowFormat = function (start, end) {
            if (start.paragraph.isInsideTable && end.paragraph.isInsideTable) {
                this.rowFormat.copyFormat(start.paragraph.associatedCell.ownerRow.rowFormat);
                this.getRowFormat(start.paragraph.associatedCell.ownerTable, start, end);
            }
            else {
                this.rowFormat.clearRowFormat();
            }
        };
        Selection.prototype.getCellFormat = function (table, start, end) {
            if (start.paragraph.associatedCell.equals(end.paragraph.associatedCell)) {
                return;
            }
            var isStarted = false;
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                if (row === start.paragraph.associatedCell.ownerRow) {
                    isStarted = true;
                }
                if (isStarted) {
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        var cell = row.childWidgets[j];
                        if (this.isCellSelected(cell, start, end)) {
                            this.cellFormat.combineFormat(cell.cellFormat);
                        }
                        if (cell === end.paragraph.associatedCell) {
                            this.cellFormat.combineFormat(cell.cellFormat);
                            return;
                        }
                    }
                }
            }
        };
        Selection.prototype.getRowFormat = function (table, start, end) {
            var tableRow = start.paragraph.associatedCell.ownerRow;
            if (tableRow === end.paragraph.associatedCell.ownerRow) {
                return;
            }
            for (var i = table.childWidgets.indexOf(tableRow) + 1; i < table.childWidgets.length; i++) {
                var tempTableRow = table.childWidgets[i];
                this.rowFormat.combineFormat(tempTableRow.rowFormat);
                if (tempTableRow === end.paragraph.associatedCell.ownerRow) {
                    return;
                }
            }
        };
        Selection.prototype.getTable = function (startPosition, endPosition) {
            if (!ej2_base_1.isNullOrUndefined(startPosition.paragraph.associatedCell) && !ej2_base_1.isNullOrUndefined(endPosition.paragraph.associatedCell)) {
                var startTable = startPosition.paragraph.associatedCell.ownerTable;
                var endTable = startPosition.paragraph.associatedCell.ownerTable;
                if (startTable === endTable) {
                    return startTable;
                }
                else {
                    if (startTable.contains(startPosition.paragraph.associatedCell)) {
                        return startTable;
                    }
                    else if (endTable.contains(startPosition.paragraph.associatedCell)) {
                        return endTable;
                    }
                    else if (!startTable.isInsideTable || !endTable.isInsideTable) {
                        return undefined;
                    }
                    else {
                        do {
                            startTable = startTable.associatedCell.ownerTable;
                            if (startTable === endTable || startTable.contains(endTable.associatedCell)) {
                                return startTable;
                            }
                            else if (endTable.contains(startTable.associatedCell)) {
                                return endTable;
                            }
                        } while (!ej2_base_1.isNullOrUndefined(startTable.associatedCell));
                    }
                }
            }
            return undefined;
        };
        Selection.prototype.getContainerWidget = function (block) {
            var bodyWidget;
            if (block.containerWidget instanceof page_1.TextFrame) {
                bodyWidget = block.containerWidget.containerShape.line.paragraph.bodyWidget;
            }
            else if (block.containerWidget instanceof page_1.BlockContainer) {
                if (!ej2_base_1.isNullOrUndefined(block.containerWidget.containerWidget) && block.containerWidget.containerWidget instanceof page_1.FootNoteWidget) {
                    bodyWidget = block.containerWidget.containerWidget;
                }
                else {
                    bodyWidget = block.containerWidget;
                }
            }
            else {
                bodyWidget = block.containerWidget;
                while (!(bodyWidget instanceof page_1.BlockContainer)) {
                    if (bodyWidget instanceof page_1.TextFrame) {
                        bodyWidget = bodyWidget.containerShape.line.paragraph;
                    }
                    bodyWidget = bodyWidget.containerWidget;
                }
            }
            return bodyWidget;
        };
        Selection.prototype.retrieveSectionFormat = function (start, end) {
            var startParaSection = this.getContainerWidget(start.paragraph);
            var endParaSection = this.getContainerWidget(end.paragraph);
            if (!ej2_base_1.isNullOrUndefined(startParaSection)) {
                this.sectionFormat.copyFormat(startParaSection.sectionFormat);
                var startPageIndex = this.documentHelper.pages.indexOf(startParaSection.page);
                var endPageIndex = this.documentHelper.pages.indexOf(endParaSection.page);
                for (var i = startPageIndex + 1; i <= endPageIndex; i++) {
                    this.sectionFormat.combineFormat(this.documentHelper.pages[i].bodyWidgets[0].sectionFormat);
                }
            }
        };
        Selection.prototype.retrieveParagraphFormat = function (start, end) {
            this.getParagraphFormatForSelection(start.paragraph, this, start, end);
        };
        Selection.prototype.getParagraphFormatForSelection = function (paragraph, selection, start, end) {
            if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
                || start.paragraph.associatedCell !== end.paragraph.associatedCell
                || this.isCellSelected(start.paragraph.associatedCell, start, end))) {
                this.getParagraphFormatInternalInCell(start.paragraph.associatedCell, start, end);
            }
            else {
                this.getParagraphFormatInternalInParagraph(paragraph, start, end);
                if (end.paragraph === paragraph) {
                    return;
                }
                var block = this.getNextRenderedBlock(paragraph);
                if (!ej2_base_1.isNullOrUndefined(block)) {
                    this.getParagraphFormatInternalInBlock(block, start, end);
                }
            }
        };
        Selection.prototype.getParagraphsInSelection = function () {
            var selection = this.owner.selection;
            var selectedWidgets = selection.selectedWidgets.keys;
            var paragraphsInSelection = [];
            if (selection.isEmpty || selection.start.paragraph === selection.end.paragraph) {
                return [selection.start.paragraph];
            }
            for (var i = 0; i < selectedWidgets.length; i++) {
                var widget = selectedWidgets[i];
                if (paragraphsInSelection.indexOf(widget.paragraph) === -1) {
                    paragraphsInSelection.push(widget.paragraph);
                }
            }
            return paragraphsInSelection;
        };
        Selection.prototype.getParagraphFormatInternalInParagraph = function (paragraph, start, end) {
            if (start.paragraph === paragraph) {
                this.paragraphFormat.copyFormat(paragraph.paragraphFormat);
            }
            else {
                this.paragraphFormat.combineFormat(paragraph.paragraphFormat);
            }
        };
        Selection.prototype.getParagraphFormatInternalInBlock = function (block, start, end) {
            if (block instanceof page_1.ParagraphWidget) {
                this.getParagraphFormatInternalInParagraph(block, start, end);
                if (end.paragraph === block) {
                    return;
                }
                var para = this.getNextRenderedBlock(block);
                if (!ej2_base_1.isNullOrUndefined(para)) {
                    this.getParagraphFormatInternalInBlock(para, start, end);
                }
            }
            else {
                this.getParagraphFormatInternalInTable(block, start, end);
            }
        };
        Selection.prototype.getParagraphFormatInternalInTable = function (table, start, end) {
            for (var i = 0; i < table.childWidgets.length; i++) {
                var tableRow = table.childWidgets[i];
                for (var j = 0; j < tableRow.childWidgets.length; j++) {
                    this.getParagraphFormatInCell(tableRow.childWidgets[j]);
                }
                if (end.paragraph.isInsideTable && this.containsRow(tableRow, end.paragraph.associatedCell)) {
                    return;
                }
            }
            var block = this.getNextRenderedBlock(table);
            this.getParagraphFormatInternalInBlock(block, start, end);
        };
        Selection.prototype.getParagraphFormatInCell = function (cell) {
            for (var i = 0; i < cell.childWidgets.length; i++) {
                this.getParagraphFormatInBlock(cell.childWidgets[i]);
            }
        };
        Selection.prototype.getParagraphFormatInBlock = function (block) {
            if (block instanceof page_1.ParagraphWidget) {
                this.getParagraphFormatInParagraph(block);
            }
            else {
                this.getParagraphFormatInTable(block);
            }
        };
        Selection.prototype.getParagraphFormatInTable = function (tableAdv) {
            for (var i = 0; i < tableAdv.childWidgets.length; i++) {
                var tableRow = tableAdv.childWidgets[i];
                for (var j = 0; j < tableRow.childWidgets.length; j++) {
                    this.getParagraphFormatInCell(tableRow.childWidgets[j]);
                }
            }
        };
        Selection.prototype.getParagraphFormatInParagraph = function (paragraph) {
            if (this.start.paragraph === paragraph) {
                this.paragraphFormat.copyFormat(paragraph.paragraphFormat);
            }
            else {
                this.paragraphFormat.combineFormat(paragraph.paragraphFormat);
            }
        };
        Selection.prototype.getParagraphFormatInternalInCell = function (cellAdv, start, end) {
            if (end.paragraph.isInsideTable) {
                var containerCell = this.getContainerCellOf(cellAdv, end.paragraph.associatedCell);
                if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                    var startCell = this.getSelectedCell(cellAdv, containerCell);
                    var endCell = this.getSelectedCell(end.paragraph.associatedCell, containerCell);
                    if (this.containsCell(containerCell, end.paragraph.associatedCell)) {
                        if (this.isCellSelected(containerCell, start, end)) {
                            this.getParagraphFormatInCell(containerCell);
                        }
                        else {
                            if (startCell === containerCell) {
                                this.getParagraphFormatInternalInParagraph(start.paragraph, start, end);
                                if (end.paragraph === start.paragraph) {
                                    return;
                                }
                                var block = this.getNextRenderedBlock(start.paragraph);
                                if (!ej2_base_1.isNullOrUndefined(block)) {
                                    this.getParagraphFormatInternalInBlock(block, start, end);
                                }
                            }
                            else {
                                this.getParagraphFormatInRow(startCell.ownerRow, start, end);
                            }
                        }
                    }
                    else {
                        this.getParaFormatForCell(containerCell.ownerTable, containerCell, endCell);
                    }
                }
                else {
                    this.getParagraphFormatInRow(containerCell.ownerRow, start, end);
                }
            }
            else {
                var cell = this.getContainerCell(cellAdv);
                this.getParagraphFormatInRow(cell.ownerRow, start, end);
            }
        };
        Selection.prototype.getParaFormatForCell = function (table, startCell, endCell) {
            var startCellIn = this.getCellLeft(startCell.ownerRow, startCell);
            var endCellIn = startCellIn + startCell.cellFormat.cellWidth;
            var endCellLeft = this.getCellLeft(endCell.ownerRow, endCell);
            var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
            if (startCellIn > endCellLeft) {
                startCellIn = endCellLeft;
            }
            if (endCellIn < endCellRight) {
                endCellIn = endCellRight;
            }
            if (startCellIn > this.upDownSelectionLength) {
                startCellIn = this.upDownSelectionLength;
            }
            if (startCellIn < this.upDownSelectionLength) {
                startCellIn = this.upDownSelectionLength;
            }
            var count = table.childWidgets.indexOf(endCell.ownerRow);
            for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
                var tableRow = table.childWidgets[i];
                for (var j = 0; j < tableRow.childWidgets.length; j++) {
                    var cell = tableRow.childWidgets[j];
                    var left = this.getCellLeft(tableRow, cell);
                    if (editor_helper_1.HelperMethods.round(startCellIn, 2) <= editor_helper_1.HelperMethods.round(left, 2)
                        && editor_helper_1.HelperMethods.round(left, 2) < editor_helper_1.HelperMethods.round(endCellIn, 2)) {
                        this.getParagraphFormatInCell(cell);
                    }
                }
            }
        };
        Selection.prototype.getParagraphFormatInRow = function (tableRow, start, end) {
            for (var i = tableRow.rowIndex; i < tableRow.ownerTable.childWidgets.length; i++) {
                var row = tableRow.ownerTable.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    this.getParagraphFormatInCell(row.childWidgets[j]);
                }
                if (end.paragraph.isInsideTable && this.containsRow(row, end.paragraph.associatedCell)) {
                    return;
                }
            }
            var block = this.getNextRenderedBlock(tableRow.ownerTable);
            this.getParagraphFormatInternalInBlock(block, start, end);
        };
        Selection.prototype.retrieveCharacterFormat = function (start, end) {
            this.characterFormat.copyFormat(start.paragraph.characterFormat);
            if (start.paragraph.isEmpty()) {
                this.characterFormat.copyFormat(start.paragraph.characterFormat, this.documentHelper.textHelper.getFontNameToRender(0, start.paragraph.characterFormat));
            }
            if (start.paragraph === end.paragraph && start.currentWidget.isLastLine()
                && start.offset === this.getLineLength(start.currentWidget) && start.offset + 1 === end.offset) {
                return;
            }
            var para = start.paragraph;
            if (start.paragraph === end.paragraph && this.isSelectList) {
                var listLevel = this.getListLevel(start.paragraph);
                if (listLevel && listLevel.characterFormat.uniqueCharacterFormat) {
                    this.characterFormat.copyFormat(listLevel.characterFormat);
                }
                return;
            }
            if (start.offset === this.getParagraphLength(para) && !this.isEmpty) {
                para = this.getNextParagraphBlock(para);
            }
            while (!ej2_base_1.isNullOrUndefined(para) && para !== end.paragraph && para.isEmpty()) {
                para = this.getNextParagraphBlock(para);
            }
            var offset = para === start.paragraph ? start.offset : 0;
            var indexInInline = 0;
            if (!ej2_base_1.isNullOrUndefined(para) && !para.isEmpty()) {
                var position = new selection_helper_1.TextPosition(this.owner);
                var elemInfo = start.currentWidget.getInline(offset, indexInInline);
                var physicalLocation = this.getPhysicalPositionInternal(start.currentWidget, offset, true);
                position.setPositionForSelection(start.currentWidget, elemInfo.element, elemInfo.index, physicalLocation);
                this.getCharacterFormatForSelection(para, this, position, end);
            }
        };
        Selection.prototype.getCharacterFormatForSelection = function (paragraph, selection, startPosition, endPosition) {
            if (startPosition.paragraph instanceof page_1.ParagraphWidget && startPosition.paragraph.isInsideTable
                && (!endPosition.paragraph.isInsideTable
                    || startPosition.paragraph.associatedCell !== endPosition.paragraph.associatedCell
                    || this.isCellSelected(startPosition.paragraph.associatedCell, startPosition, endPosition))) {
                this.getCharacterFormatInTableCell(startPosition.paragraph.associatedCell, selection, startPosition, endPosition);
            }
            else {
                this.getCharacterFormat(paragraph, startPosition, endPosition);
            }
        };
        Selection.prototype.getCharacterFormatForTableRow = function (tableRowAdv, start, end) {
            for (var i = tableRowAdv.rowIndex; i < tableRowAdv.ownerTable.childWidgets.length; i++) {
                var tableRow = tableRowAdv.ownerTable.childWidgets[i];
                for (var j = 0; j < tableRow.childWidgets.length; j++) {
                    this.getCharacterFormatForSelectionCell(tableRow.childWidgets[j], start, end);
                }
                if (end.paragraph.isInsideTable && this.containsRow(tableRow, end.paragraph.associatedCell)) {
                    return;
                }
            }
            var block = this.getNextRenderedBlock(tableRowAdv.ownerTable);
            this.getCharacterFormatForBlock(block, start, end);
        };
        Selection.prototype.getCharacterFormatInTableCell = function (tableCell, selection, start, end) {
            if (end.paragraph.isInsideTable) {
                var containerCell = this.getContainerCellOf(tableCell, end.paragraph.associatedCell);
                if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                    var startCell = this.getSelectedCell(tableCell, containerCell);
                    var endCell = this.getSelectedCell(end.paragraph.associatedCell, containerCell);
                    if (this.containsCell(containerCell, end.paragraph.associatedCell)) {
                        if (this.isCellSelected(containerCell, start, end)) {
                            this.getCharacterFormatForSelectionCell(containerCell, start, end);
                        }
                        else {
                            if (startCell === containerCell) {
                                this.getCharacterFormat(start.paragraph, start, end);
                            }
                            else {
                                this.getCharacterFormatForTableRow(startCell.ownerRow, start, end);
                            }
                        }
                    }
                    else {
                        this.getCharacterFormatInternalInTable(containerCell.ownerTable, containerCell, endCell, start, end);
                    }
                }
                else {
                    this.getCharacterFormatForTableRow(containerCell.ownerRow, start, end);
                }
            }
            else {
                var cell = this.getContainerCell(tableCell);
                this.getCharacterFormatForTableRow(cell.ownerRow, start, end);
            }
        };
        Selection.prototype.getCharacterFormatInternalInTable = function (table, startCell, endCell, startPosition, endPosition) {
            var startIn = this.getCellLeft(startCell.ownerRow, startCell);
            var endIn = startIn + startCell.cellFormat.cellWidth;
            var endCellLeft = this.getCellLeft(endCell.ownerRow, endCell);
            var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
            if (startIn > endCellLeft) {
                startIn = endCellLeft;
            }
            if (endIn < endCellRight) {
                endIn = endCellRight;
            }
            if (startIn > this.upDownSelectionLength) {
                startIn = this.upDownSelectionLength;
            }
            if (endIn < this.upDownSelectionLength) {
                endIn = this.upDownSelectionLength;
            }
            var count = table.childWidgets.indexOf(endCell.ownerRow);
            for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
                var row = table.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    var left = this.getCellLeft(row, cell);
                    if (editor_helper_1.HelperMethods.round(startIn, 2) <= editor_helper_1.HelperMethods.round(left, 2) &&
                        editor_helper_1.HelperMethods.round(left, 2) < editor_helper_1.HelperMethods.round(endIn, 2)) {
                        this.getCharacterFormatForSelectionCell(cell, startPosition, endPosition);
                    }
                }
            }
        };
        Selection.prototype.getCharacterFormat = function (paragraph, start, end) {
            if (paragraph !== start.paragraph && paragraph !== end.paragraph && !paragraph.isEmpty()) {
                this.getCharacterFormatInternal(paragraph, this);
                if (!this.characterFormat.canRetrieveNextCharacterFormat())
                    return;
            }
            if (end.paragraph === paragraph && start.paragraph !== paragraph && end.offset === 0) {
                return;
            }
            var startOffset = 0;
            var length = this.getParagraphLength(paragraph);
            if (paragraph === start.paragraph) {
                startOffset = start.offset;
                var isUpdated = this.setCharacterFormat(paragraph, start, end, length);
                if (isUpdated) {
                    return;
                }
            }
            var startLineWidget = paragraph.childWidgets.indexOf(start.currentWidget) !== -1 ?
                paragraph.childWidgets.indexOf(start.currentWidget) : 0;
            var endLineWidget = paragraph.childWidgets.indexOf(end.currentWidget) !== -1 ?
                paragraph.childWidgets.indexOf(end.currentWidget) : paragraph.childWidgets.length - 1;
            var endOffset = end.offset;
            if (paragraph !== end.paragraph) {
                endOffset = length;
            }
            var isFieldStartSelected = false;
            for (var i = startLineWidget; i <= endLineWidget; i++) {
                var lineWidget = paragraph.childWidgets[i];
                if (i !== startLineWidget) {
                    startOffset = this.getStartLineOffset(lineWidget);
                }
                if (lineWidget === end.currentWidget) {
                    endOffset = end.offset;
                }
                else {
                    endOffset = this.getLineLength(lineWidget);
                }
                var count = 0;
                for (var j = 0; j < lineWidget.children.length; j++) {
                    var inline = lineWidget.children[j];
                    if (inline instanceof page_1.ListTextElementBox) {
                        continue;
                    }
                    if (startOffset >= count + inline.length) {
                        count += inline.length;
                        continue;
                    }
                    if (inline instanceof page_1.FieldElementBox && inline.fieldType === 0
                        && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline)) {
                        var nextInline = ej2_base_1.isNullOrUndefined(inline.fieldEnd) ?
                            inline.fieldBegin : inline.fieldEnd;
                        j--;
                        do {
                            this.characterFormat.combineFormat(inline.characterFormat);
                            count += inline.length;
                            inline = inline.nextNode;
                            i++;
                            j++;
                        } while (!ej2_base_1.isNullOrUndefined(inline) && inline !== nextInline);
                        continue;
                    }
                    if (inline instanceof page_1.TextElementBox || inline instanceof page_1.FieldElementBox) {
                        this.characterFormat.combineFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                    }
                    if (ej2_base_1.isNullOrUndefined(inline) || endOffset <= count + inline.length) {
                        break;
                    }
                    count += inline.length;
                }
            }
            if (end.paragraph === paragraph) {
                return;
            }
            var block = this.getNextRenderedBlock(paragraph);
            if (!ej2_base_1.isNullOrUndefined(block)) {
                this.getCharacterFormatForBlock(block, start, end);
            }
        };
        Selection.prototype.setCharacterFormat = function (para, startPos, endPos, length) {
            var index = 0;
            var startOffset = startPos.offset;
            var inlineAndIndex = startPos.currentWidget.getInline(startOffset, index);
            index = inlineAndIndex.index;
            var inline = inlineAndIndex.element;
            if (ej2_base_1.isNullOrUndefined(inline)) {
                var currentLineIndex = startPos.paragraph.childWidgets.indexOf(startPos.currentWidget);
                if (startPos.currentWidget.previousLine) {
                    inline = startPos.currentWidget.previousLine.children[startPos.currentWidget.previousLine.children.length - 1];
                    this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                    return true;
                }
            }
            if (startOffset < length) {
                if (this.isEmpty) {
                    if (inline instanceof page_1.TextElementBox || (inline instanceof page_1.FieldElementBox
                        && (inline.fieldType === 0 || inline.fieldType === 1))) {
                        var previousNode = this.getPreviousTextElement(inline);
                        if (startOffset === 0 && previousNode) {
                            inline = previousNode;
                        }
                        this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                    }
                    else {
                        if (!ej2_base_1.isNullOrUndefined(this.getPreviousTextElement(inline))) {
                            var element = this.getPreviousTextElement(inline);
                            this.characterFormat.copyFormat(element.characterFormat, this.documentHelper.textHelper.getFontNameToRender(element.scriptType, inline.characterFormat));
                        }
                        else if (!ej2_base_1.isNullOrUndefined(this.getNextTextElement(inline))) {
                            var element = this.getNextTextElement(inline);
                            this.characterFormat.copyFormat(element.characterFormat, this.documentHelper.textHelper.getFontNameToRender(element.scriptType, inline.characterFormat));
                        }
                        else {
                            this.characterFormat.copyFormat(para.characterFormat);
                        }
                    }
                    return true;
                }
                else {
                    if (index === inline.length && !ej2_base_1.isNullOrUndefined(inline.nextNode)) {
                        this.characterFormat.copyFormat(this.getNextValidCharacterFormat(inline), this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                    }
                    else if (inline instanceof page_1.TextElementBox) {
                        this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                    }
                    else if (inline instanceof page_1.FieldElementBox) {
                        this.characterFormat.copyFormat(this.getNextValidCharacterFormatOfField(inline));
                    }
                }
            }
            else {
                if (length === endPos.offset) {
                    if (inline instanceof page_1.TextElementBox || inline instanceof page_1.FieldElementBox) {
                        this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                    }
                    else if (!ej2_base_1.isNullOrUndefined(inline)) {
                        inline = this.getPreviousTextElement(inline);
                        if (!ej2_base_1.isNullOrUndefined(inline)) {
                            this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                        }
                    }
                    else {
                        this.characterFormat.copyFormat(para.characterFormat);
                    }
                    return true;
                }
            }
            return false;
        };
        Selection.prototype.getCharacterFormatForBlock = function (block, start, end) {
            if (block instanceof page_1.ParagraphWidget) {
                this.getCharacterFormat(block, start, end);
            }
            else {
                this.getCharacterFormatInTable(block, start, end);
            }
        };
        Selection.prototype.getCharacterFormatInTable = function (table, start, end) {
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    this.getCharacterFormatForSelectionCell(row.childWidgets[j], start, end);
                }
                if (end.paragraph.isInsideTable && this.containsRow(row, end.paragraph.associatedCell)) {
                    return;
                }
            }
            var blockAdv = this.getNextRenderedBlock(table);
            this.getCharacterFormatForBlock(blockAdv, start, end);
        };
        Selection.prototype.getCharacterFormatForSelectionCell = function (cell, start, end) {
            for (var i = 0; i < cell.childWidgets.length; i++) {
                this.getCharacterFormatForBlock(cell.childWidgets[i], start, end);
            }
        };
        Selection.prototype.getCharacterFormatInternal = function (paragraph, selection) {
            for (var i = 0; i < paragraph.childWidgets.length; i++) {
                var linewidget = paragraph.childWidgets[i];
                for (var j = 0; j < linewidget.children.length; j++) {
                    var element = linewidget.children[j];
                    if (!(element instanceof page_1.ImageElementBox || element instanceof page_1.FieldElementBox || element instanceof page_1.ListTextElementBox)) {
                        selection.characterFormat.combineFormat(element.characterFormat);
                    }
                }
            }
        };
        Selection.prototype.getNextValidCharacterFormat = function (inline) {
            var startInline = this.getNextTextElement(inline);
            if (ej2_base_1.isNullOrUndefined(startInline)) {
                return inline.characterFormat;
            }
            var fieldBegin = undefined;
            if (startInline instanceof page_1.FieldElementBox) {
                if (fieldBegin.fieldType === 0) {
                    fieldBegin = startInline;
                }
            }
            if (ej2_base_1.isNullOrUndefined(fieldBegin)) {
                return startInline.characterFormat;
            }
            else {
                return this.getNextValidCharacterFormatOfField(fieldBegin);
            }
        };
        Selection.prototype.getNextValidCharacterFormatOfField = function (fieldBegin) {
            var startInline = fieldBegin;
            if (editor_helper_1.HelperMethods.isLinkedFieldCharacter(fieldBegin)) {
                if (ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                    startInline = fieldBegin.fieldEnd;
                }
                else {
                    startInline = fieldBegin.fieldSeparator;
                }
            }
            var nextValidInline = undefined;
            if (!ej2_base_1.isNullOrUndefined(startInline.nextNode)) {
                nextValidInline = this.getNextValidElement(startInline.nextNode);
            }
            if (ej2_base_1.isNullOrUndefined(nextValidInline)) {
                return startInline.characterFormat;
            }
            return nextValidInline.characterFormat;
        };
        Selection.prototype.checkCursorIsInSelection = function (widget, point) {
            if (ej2_base_1.isNullOrUndefined(this.start) || this.isEmpty || ej2_base_1.isNullOrUndefined(widget)) {
                return false;
            }
            var isSelected = false;
            do {
                if (this.selectedWidgets.containsKey(widget)) {
                    var top_4 = void 0;
                    var left = void 0;
                    if (widget instanceof page_1.LineWidget) {
                        top_4 = this.owner.selection.getTop(widget);
                        left = this.owner.selection.getLeft(widget);
                    }
                    else {
                        top_4 = widget.y;
                        left = widget.x;
                    }
                    var widgetInfo = this.selectedWidgets.get(widget);
                    if (widgetInfo instanceof selection_helper_1.SelectionWidgetInfo) {
                        isSelected = widgetInfo.left <= point.x && top_4 <= point.y &&
                            top_4 + widget.height >= point.y && widgetInfo.left + widgetInfo.width >= point.x;
                    }
                    else {
                        var widgetIn = widgetInfo;
                        for (var j = 0; j < widgetIn.length; j++) {
                            if (widgetIn[j] instanceof selection_helper_1.SelectionWidgetInfo) {
                                isSelected = widgetIn[j].left <= point.x && top_4 <= point.y &&
                                    top_4 + widget.height >= point.y && widgetIn[j].left + widgetIn[j].width >= point.x;
                                if (isSelected) {
                                    break;
                                }
                            }
                        }
                    }
                }
                widget = (widget instanceof page_1.LineWidget) ? widget.paragraph : widget.containerWidget;
            } while (!ej2_base_1.isNullOrUndefined(widget) && !isSelected);
            return isSelected;
        };
        Selection.prototype.copySelectionParagraphFormat = function () {
            var format = new index_3.WParagraphFormat();
            this.paragraphFormat.copyToFormat(format);
            return format;
        };
        Selection.prototype.getHyperlinkDisplayText = function (paragraph, fieldSeparator, fieldEnd, isNestedField, format) {
            var para = paragraph;
            if (para !== fieldEnd.line.paragraph) {
                isNestedField = true;
                return { displayText: '<<Selection in Document>>', 'isNestedField': isNestedField, 'format': format };
            }
            var displayText = '';
            var lineIndex = para.childWidgets.indexOf(fieldSeparator.line);
            var index = para.childWidgets[lineIndex].children.indexOf(fieldSeparator);
            for (var j = lineIndex; j < para.childWidgets.length; j++) {
                var lineWidget = para.childWidgets[j];
                if (j !== lineIndex) {
                    index = -1;
                }
                for (var i = index + 1; i < lineWidget.children.length; i++) {
                    var inline = lineWidget.children[i];
                    if (inline === fieldEnd) {
                        return { 'displayText': displayText, 'isNestedField': isNestedField, 'format': format };
                    }
                    if (inline instanceof page_1.TextElementBox) {
                        displayText += inline.text;
                        format = inline.characterFormat;
                    }
                    else if (inline instanceof page_1.FieldElementBox) {
                        if (inline instanceof page_1.FieldElementBox && inline.fieldType === 0
                            && !ej2_base_1.isNullOrUndefined(inline.fieldEnd)) {
                            if (ej2_base_1.isNullOrUndefined(inline.fieldSeparator)) {
                                index = lineWidget.children.indexOf(inline.fieldEnd);
                            }
                            else {
                                index = lineWidget.children.indexOf(inline.fieldSeparator);
                            }
                        }
                    }
                    else {
                        isNestedField = true;
                        return { 'displayText': '<<Selection in Document>>', 'isNestedField': isNestedField, 'format': format };
                    }
                }
            }
            return { 'displayText': displayText, 'isNestedField': isNestedField, 'format': format };
        };
        Selection.prototype.navigateHyperLinkOnEvent = function (cursorPoint, isTouchInput) {
            var _this = this;
            var widget = this.documentHelper.getLineWidget(cursorPoint);
            if (!ej2_base_1.isNullOrUndefined(widget)) {
                var hyperLinkField = this.getHyperLinkFieldInCurrentSelection(widget, cursorPoint);
                if (!ej2_base_1.isNullOrUndefined(hyperLinkField)) {
                    this.documentHelper.updateTextPositionForSelection(cursorPoint, 1);
                    this.fireRequestNavigate(hyperLinkField);
                    setTimeout(function () {
                        if (_this.viewer) {
                            _this.documentHelper.isTouchInput = isTouchInput;
                            _this.documentHelper.updateFocus();
                            _this.documentHelper.isTouchInput = false;
                        }
                    });
                }
            }
        };
        Selection.prototype.getLinkText = function (fieldBegin, copyAddress) {
            var hyperlink = new selection_helper_1.Hyperlink(fieldBegin, this);
            var link = hyperlink.navigationLink;
            var screenTip = hyperlink.screenTip;
            if (copyAddress) {
                if (hyperlink.localReference.length > 0) {
                    if (hyperlink.localReference[0] === '_' && (ej2_base_1.isNullOrUndefined(link) || link.length === 0)) {
                        link = 'Current Document';
                    }
                    else {
                        if (hyperlink.isCrossRef) {
                            link += hyperlink.localReference;
                        }
                        else {
                            link += '#' + hyperlink.localReference;
                        }
                    }
                }
                hyperlink.destroy();
                return link;
            }
            else {
                hyperlink.destroy();
                return screenTip;
            }
        };
        Selection.prototype.setHyperlinkContentToToolTip = function (fieldBegin, widget, xPos, isFormField) {
            if (fieldBegin) {
                if (this.owner.contextMenuModule &&
                    this.owner.contextMenuModule.contextMenuInstance.element.style.display === 'block') {
                    return;
                }
                if (!this.toolTipElement) {
                    this.toolTipElement = ej2_base_1.createElement('div', { className: 'e-de-tooltip' });
                    this.documentHelper.viewerContainer.appendChild(this.toolTipElement);
                    this.screenTipElement = ej2_base_1.createElement('p');
                    this.toolTipElement.appendChild(this.screenTipElement);
                    this.toolTipTextElement = ej2_base_1.createElement('p', { styles: 'font-weight:bold' });
                    this.toolTipElement.appendChild(this.toolTipTextElement);
                }
                this.toolTipElement.style.display = 'block';
                var l10n = new ej2_base_1.L10n('documenteditor', this.owner.defaultLocale);
                l10n.setLocale(this.owner.locale);
                var toolTipText = l10n.getConstant('Click to follow link');
                if (this.owner.useCtrlClickToFollowHyperlink) {
                    if (this.documentHelper.isIosDevice) {
                        toolTipText = 'Command+' + toolTipText;
                    }
                    else {
                        toolTipText = 'Ctrl+' + toolTipText;
                    }
                }
                var linkText = this.getScreenTipText(fieldBegin);
                if (isFormField) {
                    var helpText = fieldBegin.formFieldData.helpText;
                    if (ej2_base_1.isNullOrUndefined(helpText) || helpText === '') {
                        return;
                    }
                    this.screenTipElement.innerText = helpText;
                }
                else {
                    this.screenTipElement.innerText = linkText;
                    this.toolTipTextElement.innerText = toolTipText;
                }
                var position = this.getTooltipPosition(fieldBegin.line, xPos, this.toolTipElement, false);
                this.showToolTip(position.x, position.y);
                if (!ej2_base_1.isNullOrUndefined(this.toolTipField) && fieldBegin !== this.toolTipField) {
                    this.toolTipObject.position = { X: position.x, Y: position.y };
                }
                this.toolTipObject.show();
                this.toolTipField = fieldBegin;
            }
            else {
                this.hideToolTip();
            }
        };
        Selection.prototype.getScreenTipText = function (fieldBegin) {
            var hyperlink = new selection_helper_1.Hyperlink(fieldBegin, this);
            if (!hyperlink.screenTip && !hyperlink.localReference) {
                return hyperlink.navigationLink;
            }
            else if (hyperlink.screenTip) {
                return hyperlink.screenTip;
            }
            else {
                return hyperlink.localReference;
            }
        };
        Selection.prototype.setFootnoteContentToToolTip = function (footnote, widget, xPos) {
            if (footnote) {
                if (this.owner.contextMenuModule.contextMenuInstance.element.style.display === 'block' &&
                    this.owner.contextMenuModule) {
                    return;
                }
                if (!this.toolTipElement) {
                    this.toolTipElement = ej2_base_1.createElement('div', { className: 'e-de-tooltip' });
                    this.documentHelper.viewerContainer.appendChild(this.toolTipElement);
                }
                this.toolTipElement.style.display = 'block';
                var ln = new ej2_base_1.L10n('documenteditor', this.owner.defaultLocale);
                ln.setLocale(this.owner.locale);
                var toolTipText = void 0;
                if (footnote.footnoteType === 'Endnote') {
                    toolTipText = ln.getConstant('Click to View/Edit Endnote');
                }
                else if (footnote.footnoteType === 'Footnote') {
                    toolTipText = ln.getConstant('Click to View/Edit Footnote');
                }
                this.toolTipElement.innerHTML = '<b>' + toolTipText + '</b>';
                var positions = this.getTooltipPosition(footnote.line, xPos, this.toolTipElement, false);
                this.showToolTip(positions.x, positions.y);
                if (!ej2_base_1.isNullOrUndefined(this.toolTipField)) {
                    this.toolTipObject.position = { X: positions.x, Y: positions.y };
                }
                this.toolTipObject.show();
            }
            else {
                this.hideToolTip();
            }
        };
        Selection.prototype.setLockInfoTooptip = function (widget, xPos, user) {
            if (widget) {
                if (this.owner.contextMenuModule &&
                    this.owner.contextMenuModule.contextMenuInstance.element.style.display === 'block') {
                    return;
                }
                var toolTipElement = this.toolTipElement;
                if (!this.toolTipElement) {
                    toolTipElement = ej2_base_1.createElement('div', { className: 'e-de-tooltip' });
                    this.documentHelper.viewerContainer.appendChild(toolTipElement);
                    this.toolTipElement = toolTipElement;
                }
                toolTipElement.style.display = 'block';
                var l10n = new ej2_base_1.L10n('documenteditor', this.owner.defaultLocale);
                l10n.setLocale(this.owner.locale);
                var toolTipInfo = l10n.getConstant('This region is locked by');
                toolTipElement.innerHTML = toolTipInfo + ' <b>' + user + '</b>';
                var position = this.getTooltipPosition(widget, xPos, toolTipElement, false);
                this.showToolTip(position.x, position.y);
                if (!ej2_base_1.isNullOrUndefined(this.toolTipField) && user !== this.toolTipField) {
                    this.toolTipObject.position = { X: position.x, Y: position.y };
                }
                this.toolTipObject.show();
                this.toolTipField = user;
            }
            else {
                this.hideToolTip();
            }
        };
        Selection.prototype.getTooltipPosition = function (widget, xPos, toolTipElement, isFormField) {
            var widgetTop = this.getTop(widget) * this.documentHelper.zoomFactor;
            var page = this.getPage(widget.paragraph);
            var containerWidth = this.documentHelper.viewerContainer.getBoundingClientRect().width + this.documentHelper.viewerContainer.scrollLeft;
            var left = page.boundingRectangle.x + xPos * this.documentHelper.zoomFactor;
            if ((left + toolTipElement.clientWidth + 10) > containerWidth) {
                left = left - ((toolTipElement.clientWidth - (containerWidth - left)) + 15);
            }
            var offsetHeight = !isFormField ? toolTipElement.offsetHeight : 0;
            var top = this.getPageTop(page) + (widgetTop - offsetHeight);
            top = top > this.documentHelper.viewerContainer.scrollTop ? top : top + widget.height + offsetHeight;
            return new editor_helper_1.Point(left, top);
        };
        Selection.prototype.createPasteElement = function (top, left) {
            var items;
            var locale = new ej2_base_1.L10n('documenteditor', this.owner.defaultLocale);
            locale.setLocale(this.owner.locale);
            switch (this.currentPasteAction) {
                case 'DefaultPaste':
                    items = [
                        {
                            text: locale.getConstant('Keep source formatting'),
                            iconCss: 'e-icons e-de-paste-source'
                        },
                        {
                            text: locale.getConstant('Match destination formatting'),
                            iconCss: 'e-icons e-de-paste-merge'
                        },
                        {
                            text: locale.getConstant('Text only'),
                            iconCss: 'e-icons e-de-paste-text'
                        }
                    ];
                    break;
                case 'TextOnly':
                    items = [
                        {
                            text: locale.getConstant('Text only'),
                            iconCss: 'e-icons e-de-paste-text'
                        }
                    ];
                    break;
                case 'InsertAsColumns':
                case 'OverwriteCells':
                case 'InsertAsRows':
                    items = [
                        {
                            text: locale.getConstant('NestTable'),
                            iconCss: 'e-icons e-de-paste-nested-table'
                        },
                        {
                            text: locale.getConstant('InsertAsRows'),
                            iconCss: 'e-icons e-de-paste-row'
                        }
                    ];
                    if (this.currentPasteAction === 'InsertAsColumns') {
                        var obj = {
                            text: locale.getConstant('InsertAsColumns'),
                            iconCss: 'e-icons e-de-paste-column'
                        };
                        items.unshift(obj);
                    }
                    else if (this.currentPasteAction === 'OverwriteCells') {
                        var obj = {
                            text: locale.getConstant('OverwriteCells'),
                            iconCss: 'e-icons e-de-paste-overwrite-cells'
                        };
                        items.splice(2, 0, obj);
                    }
                    break;
            }
            if (!this.pasteElement) {
                this.pasteElement = ej2_base_1.createElement('div', { className: 'e-de-tooltip' });
                this.documentHelper.viewerContainer.appendChild(this.pasteElement);
                var splitButtonEle = ej2_base_1.createElement('button', { id: this.owner.containerId + '_iconsplitbtn' });
                this.pasteElement.appendChild(splitButtonEle);
                this.pasteDropDwn = new ej2_splitbuttons_1.DropDownButton({
                    items: items, iconCss: 'e-icons e-de-paste', select: this.pasteOptions
                });
                this.pasteDropDwn.appendTo(splitButtonEle);
            }
            else {
                this.pasteDropDwn.items = items;
            }
            this.pasteElement.style.display = 'block';
            this.pasteElement.style.position = 'absolute';
            this.pasteElement.style.left = left;
            this.pasteElement.style.top = top;
            this.pasteDropDwn.dataBind();
        };
        Selection.prototype.showToolTip = function (x, y) {
            if (!this.toolTipObject) {
                this.toolTipObject = new ej2_popups_1.Popup(this.toolTipElement, {
                    height: 'auto',
                    width: 'auto',
                    relateTo: this.documentHelper.viewerContainer.parentElement,
                    position: { X: x, Y: y }
                });
            }
        };
        Selection.prototype.hideToolTip = function () {
            this.toolTipField = undefined;
            if (this.toolTipObject) {
                this.toolTipElement.style.display = 'none';
                this.toolTipObject.hide();
                this.toolTipObject.destroy();
                this.toolTipObject = undefined;
            }
        };
        Selection.prototype.getHyperLinkFieldInCurrentSelection = function (widget, cursorPosition, isFormField) {
            var inline = undefined;
            var top = this.getTop(widget);
            var lineStartLeft = this.getLineStartLeft(widget);
            var leftIndent = editor_helper_1.HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.leftIndent);
            var rightIndent = editor_helper_1.HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.rightIndent);
            if (cursorPosition.y < top || cursorPosition.y > top + widget.height
                || cursorPosition.x < lineStartLeft || cursorPosition.x > lineStartLeft + widget.paragraph.width + leftIndent + rightIndent) {
                return undefined;
            }
            var left = widget.paragraph.x;
            var elementValues = this.getFirstElement(widget, left);
            left = elementValues.left;
            var element = elementValues.element;
            if (ej2_base_1.isNullOrUndefined(element)) {
                var width = this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
                if (cursorPosition.x <= lineStartLeft + width || cursorPosition.x >= lineStartLeft + width) {
                    var checkedFields = [];
                    var field = this.getHyperLinkFields(widget.paragraph, checkedFields, false, isFormField);
                    checkedFields = [];
                    checkedFields = undefined;
                    return field;
                }
            }
            else {
                var renderedChild = widget.renderedElements;
                if (cursorPosition.x > left + element.margin.left) {
                    for (var i = renderedChild.indexOf(element); i < renderedChild.length; i++) {
                        element = renderedChild[i];
                        if (cursorPosition.x < left + element.margin.left + element.width || i === renderedChild.length - 1) {
                            break;
                        }
                        left += element.margin.left + element.width;
                    }
                }
                inline = element;
                var width = element.margin.left + element.width;
                if (ej2_base_1.isNullOrUndefined(inline.nextNode)) {
                    width += this.documentHelper.textHelper.getParagraphMarkWidth(inline.line.paragraph.characterFormat);
                }
                if (cursorPosition.x <= left + width) {
                    var checkedFields = [];
                    var field = this.getHyperLinkFieldInternal(inline.line.paragraph, inline, checkedFields, false, isFormField);
                    checkedFields = [];
                    checkedFields = undefined;
                    return field;
                }
            }
            return undefined;
        };
        Selection.prototype.getFootNoteElementInCurrentSelection = function (lineWidget, position) {
            var inline = undefined;
            var top = this.getTop(lineWidget);
            var lineStartInLeft = this.getLineStartLeft(lineWidget);
            if (position.y < top || position.y > top + lineWidget.height
                || position.x < lineStartInLeft
                || position.x > lineStartInLeft + lineWidget.paragraph.width) {
                return undefined;
            }
            var leftLength = lineWidget.paragraph.x;
            var elementValues = this.getFirstElement(lineWidget, leftLength);
            leftLength = elementValues.left;
            var element = elementValues.element;
            if (ej2_base_1.isNullOrUndefined(element)) {
                var width = this.documentHelper.textHelper.getParagraphMarkWidth(lineWidget.paragraph.characterFormat);
                if (position.x <= lineStartInLeft + width || position.x >= lineStartInLeft + width) {
                    var inlineObj = this.documentHelper.selection.start.currentWidget.getInline(this.documentHelper.selection.start.offset, 0);
                    var footNote = inlineObj.element;
                    if (footNote instanceof page_1.FootnoteElementBox) {
                        return footNote;
                    }
                    else {
                        return undefined;
                    }
                }
            }
            else {
                if (position.x > leftLength + element.margin.left) {
                    for (var i = lineWidget.children.indexOf(element); i < lineWidget.children.length; i++) {
                        element = lineWidget.children[i];
                        if (position.x < leftLength + element.margin.left + element.width || i === lineWidget.children.length - 1) {
                            break;
                        }
                        leftLength += element.margin.left + element.width;
                    }
                }
                if (element instanceof page_1.FootnoteElementBox) {
                    inline = element;
                }
                var width = element.margin.left + element.width;
                if (ej2_base_1.isNullOrUndefined(element.nextNode)) {
                    width += this.documentHelper.textHelper.getParagraphMarkWidth(element.line.paragraph.characterFormat);
                }
                if (position.x <= leftLength + width) {
                    return inline;
                }
            }
            return undefined;
        };
        Selection.prototype.getHyperlinkField = function (isRetrieve) {
            if (ej2_base_1.isNullOrUndefined(this.end)) {
                return undefined;
            }
            var index = 0;
            var selection = this.documentHelper.selection;
            var start = selection.start;
            var end = selection.end;
            if (!selection.isForward) {
                start = selection.end;
                end = selection.start;
                ;
            }
            var currentInline = this.end.currentWidget.getInline(end.offset, index);
            index = currentInline.index;
            var inline = currentInline.element;
            var checkedFields = [];
            var field = undefined;
            if (ej2_base_1.isNullOrUndefined(inline)) {
                field = this.getHyperLinkFields(this.end.paragraph, checkedFields, isRetrieve);
            }
            else if (this.documentHelper.isFormFillProtectedMode && inline instanceof page_1.BookmarkElementBox
                && inline.previousNode instanceof page_1.FieldElementBox && inline.previousNode.fieldType === 1) {
                field = undefined;
            }
            else {
                var paragraph = inline.line.paragraph;
                field = this.getHyperLinkFieldInternal(paragraph, inline, checkedFields, isRetrieve, false);
            }
            checkedFields = [];
            return field;
        };
        Selection.prototype.getHyperLinkFields = function (paragraph, checkedFields, isRetrieve, checkFormField) {
            for (var i = 0; i < this.documentHelper.fields.length; i++) {
                if (checkedFields.indexOf(this.documentHelper.fields[i]) !== -1 || ej2_base_1.isNullOrUndefined(this.documentHelper.fields[i].fieldSeparator)) {
                    continue;
                }
                else {
                    checkedFields.push(this.documentHelper.fields[i]);
                }
                var field = this.getFieldCode(this.documentHelper.fields[i]);
                field = field.trim().toLowerCase();
                var isParagraph = this.paragraphIsInFieldResult(this.documentHelper.fields[i], paragraph);
                if ((isRetrieve || (!isRetrieve && field.match('hyperlink '))) && isParagraph) {
                    return this.documentHelper.fields[i];
                }
                if (isParagraph && checkFormField && this.documentHelper.fields[i].formFieldData) {
                    return this.documentHelper.fields[i];
                }
                if ((isRetrieve || (!isRetrieve && field.match('ref '))) && isParagraph) {
                    return this.documentHelper.fields[i];
                }
            }
            return undefined;
        };
        Selection.prototype.getHyperLinkFieldInternal = function (paragraph, inline, fields, isRetrieve, checkFormField) {
            for (var i = 0; i < this.documentHelper.fields.length; i++) {
                if (fields.indexOf(this.documentHelper.fields[i]) !== -1 || ej2_base_1.isNullOrUndefined(this.documentHelper.fields[i].fieldSeparator)) {
                    continue;
                }
                else {
                    fields.push(this.documentHelper.fields[i]);
                }
                var fieldCode = this.getFieldCode(this.documentHelper.fields[i]);
                fieldCode = fieldCode.trim().toLowerCase();
                var fieldBegin = this.documentHelper.fields[i];
                var fieldEnd = fieldBegin.fieldEnd;
                if (isRetrieve && fieldBegin.nextNode instanceof page_1.BookmarkElementBox && fieldBegin.nextNode.reference) {
                    fieldEnd = fieldBegin.nextNode.reference;
                }
                var isInline = (this.inlineIsInFieldResult(fieldBegin, fieldEnd, fieldBegin.fieldSeparator, inline, isRetrieve) || this.isImageField());
                if ((isRetrieve || (!isRetrieve && fieldCode.match('hyperlink '))) && isInline) {
                    return this.documentHelper.fields[i];
                }
                if (isInline && checkFormField && this.documentHelper.fields[i].formFieldData) {
                    return this.documentHelper.fields[i];
                }
                if ((isRetrieve || (!isRetrieve && fieldCode.match('ref '))) && isInline) {
                    return this.documentHelper.fields[i];
                }
            }
            if (paragraph.containerWidget instanceof page_1.BodyWidget && !(paragraph instanceof page_1.HeaderFooterWidget)) {
                return this.getHyperLinkFieldInternal(paragraph.containerWidget, inline, fields, isRetrieve, checkFormField);
            }
            return undefined;
        };
        Selection.prototype.getBlock = function (currentIndex) {
            if (currentIndex === '' || ej2_base_1.isNullOrUndefined(currentIndex)) {
                return undefined;
            }
            var index = { index: currentIndex };
            var page = this.start.getPage(index);
            var bodyIndex = index.index.indexOf(';');
            var value = index.index.substring(0, bodyIndex);
            index.index = index.index.substring(bodyIndex).replace(';', '');
            var bodyWidget = page.bodyWidgets[parseInt(value, 10)];
            return this.getBlockInternal(bodyWidget, index.index);
        };
        Selection.prototype.getBlockInternal = function (widget, position) {
            if (position === '' || ej2_base_1.isNullOrUndefined(position)) {
                return undefined;
            }
            var index = position.indexOf(';');
            var value = position.substring(0, index);
            position = position.substring(index).replace(';', '');
            var node = widget;
            index = parseInt(value, 10);
            if (index >= 0 && index < widget.childWidgets.length) {
                var child = widget.childWidgets[(index)];
                if (position.indexOf(';') >= 0) {
                    if (child instanceof page_1.ParagraphWidget) {
                        if (position.indexOf(';') >= 0) {
                            position = '0';
                        }
                        return child;
                    }
                    if (child instanceof page_1.BlockWidget) {
                        var blockObj = this.getBlockInternal(child, position);
                        return blockObj;
                    }
                }
                else {
                    return child;
                }
            }
            else {
                return node;
            }
            return node;
        };
        Selection.prototype.inlineIsInFieldResult = function (fieldBegin, fieldEnd, fieldSeparator, inline, isRetrieve) {
            if (!ej2_base_1.isNullOrUndefined(fieldEnd) && !ej2_base_1.isNullOrUndefined(fieldSeparator)) {
                if (this.isExistBeforeInline(fieldSeparator, inline)) {
                    return this.isExistAfterInline(fieldEnd, inline, isRetrieve);
                }
            }
            return false;
        };
        Selection.prototype.paragraphIsInFieldResult = function (fieldBegin, paragraph) {
            if (!ej2_base_1.isNullOrUndefined(fieldBegin.fieldEnd) && !ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                var fieldParagraph = fieldBegin.fieldSeparator.line.paragraph;
                if (fieldBegin.fieldSeparator.line.paragraph === paragraph
                    || this.isExistBefore(fieldParagraph, paragraph)) {
                    var currentParagraph = fieldBegin.fieldEnd.line.paragraph;
                    return (currentParagraph !== paragraph && this.isExistAfter(fieldParagraph, paragraph));
                }
            }
            return false;
        };
        Selection.prototype.isImageField = function () {
            if (this.start.paragraph.isEmpty() || this.end.paragraph.isEmpty()) {
                return false;
            }
            var startPosition = this.start;
            var endPosition = this.end;
            if (!this.isForward) {
                startPosition = this.end;
                endPosition = this.start;
            }
            var indexInInline = 0;
            var inlineInfo = startPosition.paragraph.getInline(startPosition.offset, indexInInline);
            var inline = inlineInfo.element;
            indexInInline = inlineInfo.index;
            if (indexInInline === inline.length) {
                inline = this.getNextRenderedElementBox(inline, indexInInline);
            }
            inlineInfo = endPosition.paragraph.getInline(endPosition.offset, indexInInline);
            var endInline = inlineInfo.element;
            indexInInline = inlineInfo.index;
            if (inline instanceof page_1.FieldElementBox && inline.fieldType === 0
                && endInline instanceof page_1.FieldElementBox && endInline.fieldType === 1 && inline.fieldSeparator) {
                var fieldValue = inline.fieldSeparator.nextNode;
                if (fieldValue instanceof page_1.ImageElementBox && fieldValue.nextNode === endInline) {
                    return true;
                }
            }
            return false;
        };
        Selection.prototype.isFormField = function () {
            var inline = this.currentFormField;
            if (inline instanceof page_1.FieldElementBox && inline.formFieldData) {
                return true;
            }
            return false;
        };
        Selection.prototype.isReferenceField = function (field) {
            if (ej2_base_1.isNullOrUndefined(field)) {
                field = this.getHyperlinkField(true);
            }
            if (field) {
                var fieldCode = this.getFieldCode(field);
                fieldCode = fieldCode.toLowerCase();
                if (field instanceof page_1.FieldElementBox && fieldCode.match('ref ')) {
                    return true;
                }
            }
            return false;
        };
        Selection.prototype.isInlineFormFillMode = function (field) {
            if (this.documentHelper.isInlineFormFillProtectedMode) {
                field = ej2_base_1.isNullOrUndefined(field) ? this.currentFormField : field;
                if (ej2_base_1.isNullOrUndefined(field)) {
                    field = this.getCurrentFormField();
                }
                if (field) {
                    if (field.formFieldData instanceof page_1.TextFormField && field.formFieldData.type === 'Text') {
                        return true;
                    }
                }
            }
            return false;
        };
        Selection.prototype.getFormFieldType = function (formField) {
            if (ej2_base_1.isNullOrUndefined(formField)) {
                formField = this.currentFormField;
            }
            if (formField instanceof page_1.FieldElementBox) {
                if (formField.formFieldData instanceof page_1.TextFormField) {
                    return 'Text';
                }
                else if (formField.formFieldData instanceof page_1.CheckBoxFormField) {
                    return 'CheckBox';
                }
                else if (formField.formFieldData instanceof page_1.DropDownFormField) {
                    return 'DropDown';
                }
            }
            return undefined;
        };
        Selection.prototype.getCurrentFormField = function (checkFieldResult) {
            var field;
            if (checkFieldResult || this.documentHelper.isFormFillProtectedMode && this.owner.documentEditorSettings.formFieldSettings &&
                this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Inline') {
                for (var i = 0; i < this.documentHelper.formFields.length; i++) {
                    var formField = this.documentHelper.formFields[i];
                    var start = this.start;
                    var end = this.end;
                    if (!this.isForward) {
                        start = this.end;
                        end = this.start;
                    }
                    if (editor_helper_1.HelperMethods.isLinkedFieldCharacter(formField)) {
                        var offset = formField.fieldSeparator.line.getOffset(formField.fieldSeparator, 1);
                        var fieldStart = new selection_helper_1.TextPosition(this.owner);
                        fieldStart.setPositionParagraph(formField.fieldSeparator.line, offset);
                        var fieldEndElement = formField.fieldEnd;
                        offset = fieldEndElement.line.getOffset(fieldEndElement, 0);
                        var fieldEnd = new selection_helper_1.TextPosition(this.owner);
                        fieldEnd.setPositionParagraph(fieldEndElement.line, offset);
                        if ((start.isExistAfter(fieldStart) || start.isAtSamePosition(fieldStart))
                            && (end.isExistBefore(fieldEnd) || end.isAtSamePosition(fieldEnd))) {
                            field = formField;
                            break;
                        }
                    }
                }
            }
            else {
                field = this.getHyperlinkField(true);
            }
            if (field instanceof page_1.FieldElementBox && field.fieldType === 0 && !ej2_base_1.isNullOrUndefined(field.formFieldData)) {
                return field;
            }
            return undefined;
        };
        Selection.prototype.getCurrentTextFrame = function () {
            var container = this.start.paragraph.containerWidget;
            do {
                if (container instanceof page_1.TextFrame) {
                    return container;
                }
                if (container) {
                    container = container.containerWidget;
                }
            } while (container);
            return null;
        };
        Selection.prototype.isTableSelected = function (isNested) {
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            if (ej2_base_1.isNullOrUndefined(start.paragraph.associatedCell) ||
                ej2_base_1.isNullOrUndefined(end.paragraph.associatedCell)) {
                return false;
            }
            var table = start.paragraph.associatedCell.ownerTable.getSplitWidgets();
            var firstParagraph = this.getFirstBlockInFirstCell(table[0]);
            var lastParagraph = this.getLastBlockInLastCell(table[table.length - 1]);
            if (isNested) {
                var nestedTable = lastParagraph.associatedCell.ownerTable;
                while (nestedTable.containerWidget instanceof page_1.TableCellWidget) {
                    nestedTable = nestedTable.containerWidget.ownerTable;
                }
                lastParagraph = this.getLastBlockInLastCell(nestedTable);
            }
            return start.paragraph.associatedCell.equals(firstParagraph.associatedCell) &&
                end.paragraph.associatedCell.equals(lastParagraph.associatedCell)
                && (!firstParagraph.associatedCell.equals(lastParagraph.associatedCell) || (start.offset === 0
                    && end.offset === this.getLineLength(lastParagraph.lastChild) + 1));
        };
        Selection.prototype.selectListText = function () {
            var lineWidget = this.documentHelper.selectionLineWidget;
            var endOffset = '0';
            var selectionIndex = lineWidget.getHierarchicalIndex(endOffset);
            var startPosition = this.getTextPosition(selectionIndex);
            var endPosition = this.getTextPosition(selectionIndex);
            this.isSelectList = true;
            this.selectRange(startPosition, endPosition);
            this.isSelectList = false;
            this.highlightListText(this.documentHelper.selectionLineWidget);
            this.contextTypeInternal = 'List';
        };
        Selection.prototype.highlightListText = function (linewidget) {
            var width = linewidget.children[0].width;
            var left = this.documentHelper.getLeftValue(linewidget);
            var top = linewidget.paragraph.y;
            this.createHighlightBorder(linewidget, width, left, top, false);
            this.documentHelper.isListTextSelected = true;
        };
        Selection.prototype.updateImageSize = function (imageFormat) {
            this.owner.isShiftingEnabled = true;
            var startPosition = this.start;
            var endPosition = this.end;
            if (!this.isForward) {
                startPosition = this.end;
                endPosition = this.start;
            }
            var inline = null;
            var index = 0;
            var paragraph = startPosition.paragraph;
            if (paragraph === endPosition.paragraph
                && startPosition.offset + 1 === endPosition.offset) {
                var inlineObj = paragraph.getInline(endPosition.offset, index);
                inline = inlineObj.element;
                index = inlineObj.index;
            }
            if (inline instanceof page_1.ImageElementBox || inline instanceof page_1.ShapeElementBox) {
                var width = inline.width;
                var height = inline.height;
                var alternateText = inline.alternateText;
                inline.width = imageFormat.width;
                inline.height = imageFormat.height;
                inline.alternateText = imageFormat.alternatetext;
                imageFormat.width = width;
                imageFormat.height = height;
                imageFormat.alternatetext = alternateText;
                if (paragraph !== null && paragraph.containerWidget !== null && this.owner.editorModule) {
                    var lineIndex = paragraph.childWidgets.indexOf(inline.line);
                    var elementIndex = inline.line.children.indexOf(inline);
                    this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex);
                    this.highlightSelection(false);
                }
            }
        };
        Selection.prototype.getSelectedCellsInTable = function (table, startCell, endCell) {
            var startColumnIndex = startCell.columnIndex;
            var endColumnIndex = endCell.columnIndex + endCell.cellFormat.columnSpan - 1;
            var startRowindex = startCell.ownerRow.index;
            var endRowIndex = endCell.ownerRow.index;
            var cells = [];
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                if (row.index >= startRowindex && row.index <= endRowIndex) {
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        var cell = row.childWidgets[j];
                        if (cell.columnIndex >= startColumnIndex && cell.columnIndex <= endColumnIndex) {
                            cells.push(cell);
                        }
                    }
                }
                if (row.index > endRowIndex) {
                    break;
                }
            }
            return cells;
        };
        Selection.prototype.copy = function () {
            if (this.isEmpty) {
                return;
            }
            this.copySelectedContent(false);
        };
        Selection.prototype.copySelectedContent = function (isCut) {
            if (ej2_base_1.isNullOrUndefined(this.owner.sfdtExportModule)) {
                return;
            }
            this.copyToClipboard(this.getHtmlContent());
            if (isCut && this.owner.editorModule) {
                this.owner.editorModule.handleCut(this);
            }
            if (this.owner.enableAutoFocus) {
                this.documentHelper.updateFocus();
            }
        };
        Selection.prototype.writeSfdt = function () {
            var startPosition = this.start;
            var endPosition = this.end;
            if (!this.isForward) {
                startPosition = this.end;
                endPosition = this.start;
            }
            return (this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), startPosition.currentWidget, startPosition.offset, endPosition.currentWidget, endPosition.offset, true));
        };
        Selection.prototype.getHtmlContent = function () {
            var documentContent = this.writeSfdt();
            if (this.owner.editorModule) {
                this.owner.editorModule.copiedData = JSON.stringify(documentContent);
            }
            var isOptimizedSfdt = this.owner.documentEditorSettings.optimizeSfdt;
            return this.htmlWriter.writeHtml(documentContent, isOptimizedSfdt);
        };
        Selection.prototype.copyToClipboard = function (htmlContent) {
            window.getSelection().removeAllRanges();
            var isMobileDeviceOrInternetExplorer = /Android|Windows Phone|iPhone|Trident|webOS/i.test(navigator.userAgent);
            var shadowRoot;
            var div = document.createElement('div');
            div.style.left = '-10000px';
            div.style.top = '-10000px';
            div.style.position = 'relative';
            div.innerHTML = htmlContent;
            if (!isMobileDeviceOrInternetExplorer) {
                shadowRoot = document.createElement('div');
                var shadowDOM = shadowRoot.attachShadow({ mode: 'open' });
                shadowDOM.appendChild(div);
                document.body.appendChild(shadowRoot);
            }
            else {
                document.body.appendChild(div);
            }
            if (navigator !== undefined && navigator.userAgent.indexOf('Firefox') !== -1) {
                div.contentEditable = 'true';
            }
            var range = document.createRange();
            range.selectNodeContents(div);
            window.getSelection().addRange(range);
            var copySuccess = false;
            try {
                copySuccess = document.execCommand('copy');
            }
            catch (e) {
            }
            finally {
                window.getSelection().removeAllRanges();
                div.parentNode.removeChild(div);
                if (!isMobileDeviceOrInternetExplorer) {
                    shadowRoot.parentNode.removeChild(shadowRoot);
                }
            }
            return copySuccess;
        };
        Selection.prototype.showCaret = function () {
            var page = !ej2_base_1.isNullOrUndefined(this.documentHelper.currentPage) ? this.documentHelper.currentPage : this.documentHelper.currentRenderingPage;
            if (ej2_base_1.isNullOrUndefined(page) || this.documentHelper.isRowOrCellResizing || (this.owner.enableImageResizerMode && this.owner.imageResizerModule.isImageResizerVisible && !this.owner.imageResizerModule.isShapeResize)) {
                return;
            }
            var left = page.boundingRectangle.x;
            var right;
            if (this.viewer instanceof index_1.PageLayoutViewer) {
                right = page.boundingRectangle.width * this.documentHelper.zoomFactor + left;
            }
            else {
                right = page.boundingRectangle.width - this.owner.viewer.padding.right - this.documentHelper.scrollbarWidth;
            }
            if (!this.owner.enableImageResizerMode || (!this.owner.imageResizerModule.isImageResizerVisible || this.owner.imageResizerModule.isShapeResize)) {
                if (this.isHideSelection(this.start.paragraph)) {
                    this.caret.style.display = 'none';
                }
                else if (this.isEmpty && (!this.owner.isReadOnly || this.owner.enableCursorOnReadOnly || this.isInlineFormFillMode())) {
                    var caretLeft = parseInt(this.caret.style.left.replace('px', ''), 10);
                    if (caretLeft < left || caretLeft > right) {
                        this.caret.style.display = 'none';
                    }
                    else {
                        this.caret.style.display = 'block';
                    }
                }
                else if (this.isImageSelected && !this.owner.enableImageResizerMode) {
                    this.caret.style.display = 'block';
                }
                else {
                    if (this.caret.style.display === 'block' || ej2_base_1.isNullOrUndefined(this)) {
                        if (!this.documentHelper.isComposingIME) {
                            this.caret.style.display = 'none';
                        }
                    }
                }
            }
            if (!ej2_base_1.isNullOrUndefined(this) && this.documentHelper.isTouchInput && !this.owner.isReadOnlyMode) {
                var caretStartLeft = parseInt(this.documentHelper.touchStart.style.left.replace('px', ''), 10) + 14;
                var caretEndLeft = parseInt(this.documentHelper.touchEnd.style.left.replace('px', ''), 10) + 14;
                var page_2 = this.getSelectionPage(this.start);
                if (page_2) {
                    if (caretEndLeft < left || caretEndLeft > right) {
                        this.documentHelper.touchEnd.style.display = 'none';
                    }
                    else {
                        this.documentHelper.touchEnd.style.display = 'block';
                    }
                    if (!this.isEmpty) {
                        left = page_2.boundingRectangle.x;
                        right = page_2.boundingRectangle.width * this.documentHelper.zoomFactor + left;
                    }
                    if (caretStartLeft < left || caretStartLeft > right) {
                        this.documentHelper.touchStart.style.display = 'none';
                    }
                    else {
                        this.documentHelper.touchStart.style.display = 'block';
                    }
                }
            }
            else {
                this.documentHelper.touchStart.style.display = 'none';
                this.documentHelper.touchEnd.style.display = 'none';
            }
        };
        Selection.prototype.setEditableDivCaretPosition = function (index) {
            this.documentHelper.editableDiv.focus();
            var child = this.documentHelper.editableDiv.childNodes[this.documentHelper.editableDiv.childNodes.length - 1];
            if (child) {
                var range = document.createRange();
                range.setStart(child, index);
                range.collapse(true);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        };
        Selection.prototype.initCaret = function () {
            this.caret = ej2_base_1.createElement('div', {
                styles: 'position:absolute',
                className: 'e-de-blink-cursor e-de-cursor-animation'
            });
            this.caret.style.display = 'none';
            this.owner.documentHelper.viewerContainer.appendChild(this.caret);
        };
        Selection.prototype.updateCaretPosition = function () {
            var caretPosition = this.end.location;
            var page = this.getSelectionPage(this.end);
            if (page && !ej2_base_1.isNullOrUndefined(this.caret)) {
                this.caret.style.left = page.boundingRectangle.x + (Math.round(caretPosition.x) * this.documentHelper.zoomFactor) + 'px';
                var caretInfo = this.updateCaretSize(this.owner.selection.end);
                var topMargin = caretInfo.topMargin;
                var viewer = this.viewer;
                var pageTop = (page.boundingRectangle.y - viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1)) * this.documentHelper.zoomFactor + viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1);
                this.caret.style.top = pageTop + (Math.round(caretPosition.y + topMargin) * this.documentHelper.zoomFactor) + 'px';
                if (this.owner.selection.characterFormat.baselineAlignment === 'Subscript') {
                    this.caret.style.top = parseFloat(this.caret.style.top) + (parseFloat(this.caret.style.height) / 2) + 'px';
                }
                if (this.documentHelper.isTouchInput || this.documentHelper.touchStart.style.display !== 'none') {
                    this.documentHelper.touchStart.style.left = page.boundingRectangle.x + (Math.round(caretPosition.x) * this.documentHelper.zoomFactor - 14) + 'px';
                    this.documentHelper.touchStart.style.top = pageTop + ((caretPosition.y + caretInfo.height) * this.documentHelper.zoomFactor) + 'px';
                    this.documentHelper.touchEnd.style.left = page.boundingRectangle.x + (Math.round(caretPosition.x) * this.documentHelper.zoomFactor - 14) + 'px';
                    this.documentHelper.touchEnd.style.top = pageTop + ((caretPosition.y + caretInfo.height) * this.documentHelper.zoomFactor) + 'px';
                }
            }
            this.showHidePasteOptions(this.caret.style.top, this.caret.style.left);
        };
        Selection.prototype.showHidePasteOptions = function (top, left) {
            if (ej2_base_1.Browser.isIE) {
                return;
            }
            if (this.isViewPasteOptions) {
                if (this.pasteElement && this.pasteElement.style.display === 'block') {
                    return;
                }
                this.createPasteElement(top, left);
            }
            else if (this.pasteElement) {
                this.pasteElement.style.display = 'none';
                if (!ej2_base_1.isNullOrUndefined(this.owner.editor)) {
                    this.owner.editor.isHtmlPaste = false;
                }
            }
        };
        Selection.prototype.getRect = function (position) {
            var caretPosition = position.location;
            var page = this.getSelectionPage(position);
            if (page) {
                var documentHelper = this.owner.documentHelper;
                var left = page.boundingRectangle.x + (Math.round(caretPosition.x) * documentHelper.zoomFactor);
                var pageGap = this.viewer.pageGap;
                var pageTop = (page.boundingRectangle.y - pageGap * (page.index + 1)) * documentHelper.zoomFactor + pageGap * (page.index + 1);
                var top_5 = pageTop + (Math.round(caretPosition.y) * documentHelper.zoomFactor);
                return new editor_helper_1.Point(left, top_5);
            }
            return new editor_helper_1.Point(0, 0);
        };
        Selection.prototype.getSelectionPage = function (position) {
            var lineWidget = this.getLineWidgetInternal(position.currentWidget, position.offset, true);
            if (lineWidget) {
                return this.getPage(lineWidget.paragraph);
            }
            return undefined;
        };
        Selection.prototype.updateCaretSize = function (textPosition, skipUpdate) {
            var topMargin = 0;
            var isItalic = false;
            var caret;
            var index = 0;
            var caretHeight = 0;
            if (this.characterFormat.italic) {
                isItalic = this.characterFormat.italic;
            }
            if (textPosition.paragraph.isEmpty()) {
                var paragraph = textPosition.paragraph;
                var bottomMargin = 0;
                var paragraphInfo = this.getParagraphMarkSize(paragraph, topMargin, bottomMargin);
                topMargin = paragraphInfo.topMargin;
                bottomMargin = paragraphInfo.bottomMargin;
                var height = paragraphInfo.height;
                caretHeight = topMargin < 0 ? topMargin + height : height;
                if (!skipUpdate) {
                    this.caret.style.height = caretHeight * this.documentHelper.zoomFactor + 'px';
                }
                topMargin = 0;
            }
            else {
                var inlineInfo = textPosition.currentWidget.getInline(textPosition.offset, index);
                index = inlineInfo.index;
                var inline = inlineInfo.element;
                if (!ej2_base_1.isNullOrUndefined(inline)) {
                    caret = this.getCaretHeight(inline, index, inline.characterFormat, true, topMargin, isItalic);
                    caretHeight = caret.height;
                    if (!skipUpdate) {
                        this.caret.style.height = caret.height * this.documentHelper.zoomFactor + 'px';
                    }
                }
            }
            if (!skipUpdate) {
                if (isItalic) {
                    this.caret.style.transform = 'rotate(13deg)';
                }
                else {
                    this.caret.style.transform = '';
                }
            }
            return {
                'topMargin': topMargin,
                'height': caretHeight
            };
        };
        Selection.prototype.updateCaretToPage = function (startPosition, endPage) {
            if (!ej2_base_1.isNullOrUndefined(endPage)) {
                this.documentHelper.selectionEndPage = endPage;
                if (this.owner.selection.isEmpty) {
                    this.documentHelper.selectionStartPage = endPage;
                }
                else {
                    var startLineWidget = this.getLineWidgetParagraph(startPosition.offset, startPosition.paragraph.childWidgets[0]);
                    var startPage = this.getPage(startLineWidget.paragraph);
                    if (!ej2_base_1.isNullOrUndefined(startPage)) {
                        this.documentHelper.selectionStartPage = startPage;
                    }
                }
            }
            if (this.owner.enableAutoFocus) {
                this.checkForCursorVisibility();
            }
        };
        Selection.prototype.getCaretBottom = function (textPosition, isEmptySelection) {
            var bottom = textPosition.location.y;
            if (textPosition.paragraph.isEmpty()) {
                var paragraph = textPosition.paragraph;
                var topMargin = 0;
                var bottomMargin = 0;
                var sizeInfo = this.getParagraphMarkSize(paragraph, topMargin, bottomMargin);
                topMargin = sizeInfo.topMargin;
                bottomMargin = sizeInfo.bottomMargin;
                bottom += sizeInfo.height;
                bottom += topMargin;
                if (!isEmptySelection) {
                    bottom += bottomMargin;
                }
            }
            else {
                var index = 0;
                var inlineInfo = textPosition.paragraph.getInline(textPosition.offset, index);
                var inline = inlineInfo.element;
                index = inlineInfo.index;
                var topMargin = 0;
                var isItalic = false;
                var caretHeightInfo = this.getCaretHeight(inline, index, inline.characterFormat, false, topMargin, isItalic);
                topMargin = caretHeightInfo.topMargin;
                isItalic = caretHeightInfo.isItalic;
                bottom += caretHeightInfo.height;
                if (isEmptySelection) {
                    bottom -= editor_helper_1.HelperMethods.convertPointToPixel(this.documentHelper.layout.getAfterSpacing(textPosition.paragraph));
                }
            }
            return bottom;
        };
        Selection.prototype.checkForCursorVisibility = function () {
            this.showCaret();
        };
        Selection.prototype.onKeyDownInternal = function (event, ctrl, shift, alt) {
            var key = event.which || event.keyCode;
            this.owner.focusIn();
            if (ctrl && !shift && !alt) {
                this.documentHelper.isControlPressed = true;
                switch (key) {
                    case 35:
                        this.handleControlEndKey();
                        break;
                    case 36:
                        this.handleControlHomeKey();
                        break;
                    case 37:
                        this.handleControlLeftKey();
                        break;
                    case 38:
                        this.handleControlUpKey();
                        break;
                    case 39:
                        this.handleControlRightKey();
                        break;
                    case 40:
                        this.handleControlDownKey();
                        break;
                    case 65:
                        this.owner.selection.selectAll();
                        break;
                    case 67:
                        event.preventDefault();
                        this.copy();
                        break;
                    case 70:
                        event.preventDefault();
                        if (!ej2_base_1.isNullOrUndefined(this.owner.optionsPaneModule)) {
                            this.owner.optionsPaneModule.showHideOptionsPane(true);
                        }
                        break;
                }
            }
            else if (shift && !ctrl && !alt) {
                this.documentHelper.isCompleted = false;
                switch (key) {
                    case 33:
                        event.preventDefault();
                        this.handlePageUpPageDownKey(false, shift);
                        break;
                    case 34:
                        event.preventDefault();
                        this.handlePageUpPageDownKey(true, shift);
                        break;
                    case 35:
                        this.handleShiftEndKey();
                        event.preventDefault();
                        break;
                    case 36:
                        this.handleShiftHomeKey();
                        event.preventDefault();
                        break;
                    case 37:
                        this.handleShiftLeftKey();
                        event.preventDefault();
                        break;
                    case 38:
                        this.handleShiftUpKey();
                        event.preventDefault();
                        break;
                    case 39:
                        this.handleShiftRightKey();
                        event.preventDefault();
                        break;
                    case 40:
                        this.handleShiftDownKey();
                        event.preventDefault();
                        break;
                }
            }
            else if (shift && ctrl && !alt) {
                switch (key) {
                    case 32:
                        this.owner.editor.insertText(String.fromCharCode(160));
                        break;
                    case 35:
                        this.handleControlShiftEndKey();
                        break;
                    case 36:
                        this.handleControlShiftHomeKey();
                        break;
                    case 37:
                        this.handleControlShiftLeftKey();
                        break;
                    case 38:
                        this.handleControlShiftUpKey();
                        break;
                    case 39:
                        this.handleControlShiftRightKey();
                        break;
                    case 40:
                        this.handleControlShiftDownKey();
                        break;
                    case 56:
                        this.owner.toggleShowHiddenMarksInternal();
                        break;
                }
            }
            else {
                switch (key) {
                    case 33:
                        event.preventDefault();
                        this.handlePageUpPageDownKey(false, shift);
                        break;
                    case 34:
                        event.preventDefault();
                        this.handlePageUpPageDownKey(true, shift);
                        break;
                    case 35:
                        this.handleEndKey();
                        event.preventDefault();
                        break;
                    case 36:
                        this.handleHomeKey();
                        event.preventDefault();
                        break;
                    case 37:
                        this.handleLeftKey();
                        event.preventDefault();
                        break;
                    case 38:
                        this.handleUpKey();
                        event.preventDefault();
                        break;
                    case 39:
                        this.handleRightKey();
                        event.preventDefault();
                        break;
                    case 40:
                        this.handleDownKey();
                        event.preventDefault();
                        break;
                }
            }
            if (this.isFormField() && !(this.documentHelper.isDocumentProtected)) {
                var formField = this.getCurrentFormField(true);
                if (formField && formField.formFieldData instanceof page_1.DropDownFormField) {
                    formField = (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 40) ? formField : formField.nextElement instanceof page_1.BookmarkElementBox ? formField.nextElement.reference : formField.fieldEnd;
                    var index = event.keyCode === 39 ? 1 : 0;
                    var offset = formField.line.getOffset(formField, index);
                    var point = this.getPhysicalPositionInternal(formField.line, offset, false);
                    this.selectInternal(formField.line, formField, index, point);
                }
            }
            if (!this.owner.isReadOnlyMode || this.documentHelper.isCommentOnlyMode || this.isInlineFormFillMode()) {
                this.owner.editorModule.onKeyDownInternal(event, ctrl, shift, alt);
            }
            else if (this.documentHelper.isDocumentProtected && this.documentHelper.protectionType === 'FormFieldsOnly') {
                if (event.keyCode === 9 || event.keyCode === 32) {
                    this.owner.editorModule.onKeyDownInternal(event, ctrl, shift, alt);
                }
            }
            if (this.owner.searchModule) {
                if (!ej2_base_1.isNullOrUndefined(this.owner.searchModule.searchHighlighters) && this.owner.searchModule.searchHighlighters.length > 0) {
                    this.owner.searchModule.searchResults.clear();
                }
            }
            if (event.keyCode === 27 || event.which === 27) {
                if (!ej2_base_1.isNullOrUndefined(this.owner.optionsPaneModule)) {
                    this.owner.optionsPaneModule.showHideOptionsPane(false);
                    this.documentHelper.updateFocus();
                }
                if (this.owner.enableHeaderAndFooter) {
                    this.disableHeaderFooter();
                }
            }
        };
        Selection.prototype.checkAndEnableHeaderFooter = function (point, pagePoint) {
            var page = this.documentHelper.currentPage;
            if (this.isCursorInsidePageRect(point, page)) {
                if (this.isCursorInHeaderRegion(point, page)) {
                    if (this.owner.enableHeaderAndFooter) {
                        return false;
                    }
                    return this.enableHeadersFootersRegion(page.headerWidget, page);
                }
                if (this.isCursorInFooterRegion(point, page)) {
                    if (this.owner.enableHeaderAndFooter) {
                        return false;
                    }
                    return this.enableHeadersFootersRegion(page.footerWidget, page);
                }
            }
            if (this.owner.enableHeaderAndFooter) {
                this.owner.enableHeaderAndFooter = false;
                this.documentHelper.updateTextPositionForSelection(pagePoint, 1);
                return true;
            }
            return false;
        };
        Selection.prototype.isCursorInsidePageRect = function (point, page) {
            if ((this.viewer.containerLeft + point.x) >= page.boundingRectangle.x &&
                (this.viewer.containerLeft + point.x) <= (page.boundingRectangle.x + (page.boundingRectangle.width * this.documentHelper.zoomFactor)) && this.viewer instanceof index_1.PageLayoutViewer) {
                return true;
            }
            else if ((this.viewer.containerLeft + point.x) >= page.boundingRectangle.x &&
                (this.viewer.containerLeft + point.x) <= (page.boundingRectangle.x + page.boundingRectangle.width)) {
                return true;
            }
            return false;
        };
        Selection.prototype.isCursorInHeaderRegion = function (point, page) {
            if (this.viewer instanceof index_1.PageLayoutViewer) {
                var pageTop = this.getPageTop(page);
                var headerHeight = 0;
                var header = page.headerWidget;
                if (header) {
                    headerHeight = (header.y + header.height);
                }
                var isEmpty = header.isEmpty && !this.owner.enableHeaderAndFooter;
                var topMargin = editor_helper_1.HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.topMargin);
                var pageHeight = editor_helper_1.HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.pageHeight);
                var height = isEmpty ? topMargin : Math.min(Math.max(headerHeight, topMargin), pageHeight / 100 * 40);
                height = height * this.documentHelper.zoomFactor;
                if ((this.viewer.containerTop + point.y) >= pageTop && (this.viewer.containerTop + point.y) <= pageTop + height) {
                    return true;
                }
            }
            return false;
        };
        Selection.prototype.isCursorInFooterRegion = function (point, page) {
            if (this.viewer instanceof index_1.PageLayoutViewer) {
                var pageRect = page.boundingRectangle;
                var pageTop = this.getPageTop(page);
                var pageBottom = pageTop + (pageRect.height * this.documentHelper.zoomFactor);
                var footerDistance = editor_helper_1.HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.footerDistance);
                var footerHeight = 0;
                if (page.footerWidget) {
                    footerHeight = page.footerWidget.height;
                }
                var bottomMargin = editor_helper_1.HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.bottomMargin);
                var isEmpty = page.footerWidget.isEmpty && !this.owner.enableHeaderAndFooter;
                var height = pageRect.height;
                if (isEmpty) {
                    height = (height - bottomMargin) * this.documentHelper.zoomFactor;
                }
                else {
                    height = (height - Math.min(pageRect.height / 100 * 40, Math.max(footerHeight + footerDistance, bottomMargin))) * this.documentHelper.zoomFactor;
                }
                if ((this.viewer.containerTop + point.y) <= pageBottom && (this.viewer.containerTop + point.y) >= pageTop + height) {
                    return true;
                }
            }
            return false;
        };
        Selection.prototype.enableHeadersFootersRegion = function (widget, page) {
            if (this.viewer instanceof index_1.PageLayoutViewer) {
                this.owner.enableHeaderAndFooter = true;
                widget.page = page;
                this.comparePageWidthAndMargins(widget, page);
                this.updateTextPositionForBlockContainer(widget);
                this.shiftBlockOnHeaderFooterEnableDisable();
                return true;
            }
            return false;
        };
        Selection.prototype.comparePageWidthAndMargins = function (parentHFWidget, page) {
            var headerFooterType = parentHFWidget.headerFooterType;
            var currentHFWidget;
            var isHeader = headerFooterType.indexOf('Header') != -1;
            var isRelayout = false;
            if (isHeader) {
                currentHFWidget = page.headerWidgetIn;
            }
            else {
                currentHFWidget = page.footerWidgetIn;
            }
            if (!ej2_base_1.isNullOrUndefined(currentHFWidget)) {
                var parentSectionFormat = parentHFWidget.sectionFormat;
                var currentSectionFormat = currentHFWidget.sectionFormat;
                if (!ej2_base_1.isNullOrUndefined(parentSectionFormat) && !ej2_base_1.isNullOrUndefined(currentSectionFormat)) {
                    if (isHeader) {
                        if (parentHFWidget.width != currentHFWidget.width || parentSectionFormat.headerDistance != currentSectionFormat.headerDistance) {
                            isRelayout = true;
                        }
                    }
                    else {
                        if (parentHFWidget.width != currentHFWidget.width || parentSectionFormat.footerDistance != currentSectionFormat.footerDistance) {
                            isRelayout = true;
                        }
                    }
                }
                if (isRelayout) {
                    this.owner.viewer.updateHFClientArea(parentHFWidget.sectionFormat, isHeader);
                    parentHFWidget = this.documentHelper.layout.layoutHeaderFooterItems(this.owner.viewer, parentHFWidget);
                }
            }
        };
        Selection.prototype.shiftBlockOnHeaderFooterEnableDisable = function () {
            for (var i = 0; i < this.documentHelper.headersFooters.length; i++) {
                var headerFooter = this.documentHelper.headersFooters[i];
                var bodywidget = this.getBodyWidgetInternal(i, 0);
                if (ej2_base_1.isNullOrUndefined(bodywidget)) {
                    continue;
                }
                var sectionFormat = bodywidget.sectionFormat;
                for (var _i = 0, _a = Object.keys(headerFooter); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var widget = headerFooter[key];
                    if (widget.isEmpty) {
                        this.owner.editor.shiftPageContent(widget.headerFooterType, sectionFormat);
                    }
                }
            }
        };
        Selection.prototype.updateTextPositionForBlockContainer = function (widget) {
            var block = widget.firstChild;
            if (block instanceof page_1.TableWidget) {
                block = this.getFirstBlockInFirstCell(block);
                if (block instanceof page_1.TableWidget) {
                    block = this.getFirstBlockInFirstCell(block);
                }
            }
            this.selectParagraphInternal(block, true);
        };
        Selection.prototype.disableHeaderFooter = function () {
            var page = this.getPage(this.start.paragraph);
            this.updateTextPositionForBlockContainer(page.bodyWidgets[0]);
            this.owner.enableHeaderAndFooter = false;
            this.shiftBlockOnHeaderFooterEnableDisable();
        };
        Selection.prototype.clear = function () {
            if (this.editRegionHighlighters) {
                this.editRegionHighlighters.clear();
            }
            this.editRangeCollection = [];
            if (this.selectedWidgets) {
                this.selectedWidgets.clear();
            }
        };
        Selection.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.contextTypeInternal)) {
                this.contextTypeInternal = undefined;
            }
            if (this.pasteDropDwn) {
                this.pasteDropDwn.destroy();
                this.pasteDropDwn = undefined;
            }
            this.caret = undefined;
            this.contextTypeInternal = undefined;
            this.upDownSelectionLength = undefined;
            this.owner = undefined;
            this.upDownSelectionLength = undefined;
            this.isSkipLayouting = undefined;
            this.isImageSelected = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper)) {
                this.documentHelper = undefined;
            }
            this.contextTypeInternal = undefined;
            this.isRetrieveFormatting = undefined;
            if (this.characterFormatIn) {
                this.characterFormatIn.destroy();
            }
            this.characterFormatIn = undefined;
            if (this.paragraphFormatIn) {
                this.paragraphFormatIn.destroy();
            }
            this.paragraphFormatIn = undefined;
            if (this.sectionFormatIn) {
                this.sectionFormatIn.destroy();
            }
            this.sectionFormatIn = undefined;
            if (this.tableFormatIn) {
                this.tableFormatIn.destroy();
            }
            this.tableFormatIn = undefined;
            if (this.cellFormatIn) {
                this.cellFormatIn.destroy();
            }
            this.cellFormatIn = undefined;
            if (this.rowFormatIn) {
                this.rowFormatIn.destroy();
            }
            this.rowFormatIn = undefined;
            this.imageFormatInternal = undefined;
            this.skipFormatRetrieval = undefined;
            this.startInternal = undefined;
            this.endInternal = undefined;
            this.htmlWriterIn = undefined;
            this.toolTipElement = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.toolTipObject)) {
                this.toolTipObject.destroy();
            }
            this.toolTipField = undefined;
            this.isMoveDownOrMoveUp = undefined;
            this.pasteElement = undefined;
            this.currentPasteAction = undefined;
            this.isViewPasteOptions = undefined;
            this.skipEditRangeRetrieval = undefined;
            this.editPosition = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.selectedWidgets)) {
                this.selectedWidgets.destroy();
            }
            this.isHighlightEditRegionIn = undefined;
            this.isHighlightFormFields = undefined;
            this.editRangeCollection = [];
            this.editRangeCollection = undefined;
            this.isHightlightEditRegionInternal = undefined;
            this.isCurrentUser = undefined;
            this.isHighlightNext = undefined;
            this.hightLightNextParagraph = undefined;
            this.isWebLayout = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.editRegionHighlighters)) {
                this.editRegionHighlighters.destroy();
            }
            if (!ej2_base_1.isNullOrUndefined(this.formFieldHighlighters)) {
                this.formFieldHighlighters.destroy();
            }
            this.isCellPrevSelected = undefined;
            this.currentFormField = undefined;
        };
        Selection.prototype.getCellsToSelect = function (table, columnFirst, columnLast, bookmark) {
            var rows = table.childWidgets;
            if (ej2_base_1.isNullOrUndefined(bookmark.paragraph.associatedCell) || !ej2_base_1.isNullOrUndefined(bookmark.reference) && ej2_base_1.isNullOrUndefined(bookmark.reference.paragraph.associatedCell)) {
                return undefined;
            }
            var startRowIndex = bookmark.paragraph.associatedCell.ownerRow.rowIndex;
            var endRowIndex = bookmark.reference.paragraph.associatedCell.ownerRow.rowIndex;
            var cellArray = [];
            for (var i = startRowIndex; i <= endRowIndex; i++) {
                var row = rows[i];
                for (var j = columnFirst; j <= columnLast; j++) {
                    var cell = row.childWidgets[j];
                    if (!ej2_base_1.isNullOrUndefined(cell)) {
                        cellArray.push(cell);
                    }
                }
            }
            return cellArray;
        };
        Selection.prototype.selectBookmarkInTable = function (bookmark) {
            this.documentHelper.clearSelectionHighlight();
            var columnFirst = parseInt(bookmark.properties['columnFirst']);
            var columnLast = parseInt(bookmark.properties['columnLast']);
            var table = bookmark.paragraph.associatedCell.ownerTable;
            var cellArray = this.getCellsToSelect(table, columnFirst, columnLast, bookmark);
            if (!ej2_base_1.isNullOrUndefined(cellArray)) {
                for (var i = 0; i < cellArray.length; i++) {
                    this.highlightCellWidget(cellArray[i]);
                }
            }
        };
        Selection.prototype.navigateBookmark = function (name, moveToStart, excludeBookmarkStartEnd) {
            var bookmarks = this.documentHelper.bookmarks;
            if (bookmarks.containsKey(name)) {
                var bookmrkElmnt = bookmarks.get(name);
                if (!ej2_base_1.isNullOrUndefined(bookmrkElmnt.properties)) {
                    this.selectBookmarkInTable(bookmrkElmnt);
                }
                else {
                    var offset = bookmrkElmnt.line.getOffset(bookmrkElmnt, 0);
                    if (excludeBookmarkStartEnd) {
                        offset++;
                    }
                    var startPosition = new selection_helper_1.TextPosition(this.owner);
                    startPosition.setPositionParagraph(bookmrkElmnt.line, offset);
                    if (moveToStart) {
                        this.documentHelper.selection.selectRange(startPosition, startPosition, true);
                    }
                    else {
                        var bookmrkEnd = bookmrkElmnt.reference;
                        if (bookmrkElmnt.reference && bookmrkElmnt.reference.line.paragraph.bodyWidget == null) {
                            bookmrkEnd = bookmrkElmnt;
                        }
                        var endoffset = bookmrkEnd.line.getOffset(bookmrkEnd, 1);
                        if (bookmrkEnd instanceof page_1.BookmarkElementBox && !excludeBookmarkStartEnd) {
                            if (!ej2_base_1.isNullOrUndefined(bookmrkEnd.properties)) {
                                if (bookmrkEnd.properties['isAfterParagraphMark']) {
                                    endoffset = bookmrkEnd.line.getOffset(bookmrkEnd, 1);
                                }
                            }
                        }
                        if (excludeBookmarkStartEnd) {
                            endoffset--;
                        }
                        var endPosition = new selection_helper_1.TextPosition(this.owner);
                        endPosition.setPositionParagraph(bookmrkEnd.line, endoffset);
                        this.documentHelper.selection.selectRange(startPosition, endPosition, true);
                    }
                }
            }
        };
        Selection.prototype.selectBookmark = function (name, excludeBookmarkStartEnd) {
            this.navigateBookmark(name, undefined, excludeBookmarkStartEnd);
        };
        Selection.prototype.getTocField = function () {
            var paragraph = this.start.paragraph;
            var tocPara = undefined;
            while ((paragraph !== undefined && this.isTocStyle(paragraph))) {
                tocPara = paragraph;
                paragraph = paragraph.previousRenderedWidget;
            }
            if (tocPara !== undefined) {
                var lineWidget = tocPara.childWidgets[0];
                if (lineWidget !== undefined) {
                    return lineWidget.children[0];
                }
            }
            return undefined;
        };
        Selection.prototype.isTocStyle = function (paragraph) {
            var style = paragraph.paragraphFormat.baseStyle;
            return (style !== undefined && (style.name.toLowerCase().indexOf('toc') !== -1));
        };
        Selection.prototype.isTOC = function () {
            var info = this.getParagraphInfo(this.start);
            var para = info.paragraph;
            for (var i = 0; i < para.childWidgets[0].children.length; i++) {
                var element = para.childWidgets[0].children[i];
                if (element instanceof page_1.FieldElementBox) {
                    var fieldCode = this.owner.selection.getFieldCode(element);
                    if (fieldCode.match('TOC ') || fieldCode.match('Toc')) {
                        return true;
                    }
                }
                else {
                    continue;
                }
            }
            return false;
        };
        Selection.prototype.getElementsForward = function (lineWidget, startElement, endElement, bidi) {
            if (ej2_base_1.isNullOrUndefined(startElement)) {
                return undefined;
            }
            var elements = [];
            var elementIndex = lineWidget.children.indexOf(startElement);
            while (elementIndex >= 0) {
                for (var i = elementIndex; i < lineWidget.children.length; i++) {
                    var inlineElement = lineWidget.children[i];
                    if (inlineElement.line === lineWidget) {
                        if (inlineElement === endElement) {
                            elements.push(inlineElement);
                            elementIndex = -1;
                            break;
                        }
                        else {
                            elements.push(inlineElement);
                        }
                    }
                    else {
                        elementIndex = -1;
                        break;
                    }
                }
                elementIndex = -1;
            }
            return elements.length === 0 ? undefined : elements;
        };
        Selection.prototype.getElementsBackward = function (lineWidget, startElement, endElement, bidi) {
            var elements = [];
            while (bidi && startElement && startElement.previousElement && (!startElement.isRightToLeft
                || startElement instanceof page_1.TextElementBox && this.documentHelper.textHelper.isRTLText(startElement.text))) {
                startElement = startElement.previousElement;
            }
            var elementIndex = lineWidget.children.indexOf(startElement);
            while (elementIndex >= 0) {
                for (var i = elementIndex; i > -1 && i < lineWidget.children.length; bidi ? i++ : i--) {
                    var inlineElement = lineWidget.children[i];
                    if (inlineElement.line === lineWidget) {
                        elements.push(inlineElement);
                    }
                    else {
                        elementIndex = -1;
                        break;
                    }
                }
                elementIndex = -1;
            }
            return elements;
        };
        Selection.prototype.navigatePreviousComment = function () {
            this.commentNavigateInternal(false);
        };
        Selection.prototype.navigateNextComment = function () {
            this.commentNavigateInternal(true);
        };
        Selection.prototype.commentNavigateInternal = function (next) {
            if (!this.documentHelper.currentSelectedComment) {
                if (this.documentHelper.comments.length === 0) {
                    return;
                }
                this.documentHelper.currentSelectedComment = this.documentHelper.comments[0];
            }
            if (this.documentHelper.currentSelectedComment) {
                var comments = this.documentHelper.comments;
                var comment = this.documentHelper.currentSelectedComment;
                var index = comments.indexOf(comment);
                if (next) {
                    comment = (index === (comments.length - 1)) ? comments[0] : comments[index + 1];
                }
                else {
                    comment = index === 0 ? comments[comments.length - 1] : comments[index - 1];
                }
                this.documentHelper.currentSelectedComment = comment;
                this.selectComment(comment);
            }
        };
        Selection.prototype.navigatePreviousRevision = function () {
            this.revisionNavigateInternal(false);
        };
        Selection.prototype.navigateNextRevision = function () {
            this.revisionNavigateInternal(true);
        };
        Selection.prototype.revisionNavigateInternal = function (next) {
            if (!this.documentHelper.currentSelectedRevisionInternal) {
                if (this.documentHelper.owner.revisions.length === 0) {
                    return;
                }
                this.documentHelper.currentSelectedRevision = this.documentHelper.owner.revisions.get(0);
            }
            if (this.documentHelper.currentSelectedRevision) {
                var revisions = this.documentHelper.owner.revisions.changes;
                var revision = this.documentHelper.currentSelectedRevision;
                var index = revisions.indexOf(revision);
                if (next) {
                    revision = (index === (revisions.length - 1)) ? revisions[0] : revisions[index + 1];
                }
                else {
                    revision = index === 0 ? revisions[revisions.length - 1] : revisions[index - 1];
                }
                this.documentHelper.currentSelectedRevision = revision;
                this.selectRevision(revision);
            }
            this.owner.trackChangesPane.currentSelectedRevision = this.documentHelper.currentSelectedRevision;
        };
        Selection.prototype.selectComment = function (comment) {
            if (!ej2_base_1.isNullOrUndefined(comment)) {
                var startPosition = this.getElementPosition(comment.commentStart, true).startPosition;
                var endPosition = this.getElementPosition(comment.commentEnd, false).startPosition;
                if (this.owner.commentReviewPane) {
                    this.owner.commentReviewPane.selectComment(comment);
                }
                this.selectPosition(startPosition, endPosition);
            }
        };
        Selection.prototype.selectRevision = function (revision) {
            if (!ej2_base_1.isNullOrUndefined(revision) && revision.range.length > 0) {
                var firstElement = revision.range[0];
                var lastElement = revision.range[revision.range.length - 1];
                if (firstElement instanceof index_1.WRowFormat) {
                    var rowWidget = firstElement.ownerBase;
                    var firstCell = rowWidget.childWidgets[0];
                    var lastCell = rowWidget.childWidgets[rowWidget.childWidgets.length - 1];
                    var firstPara = this.getFirstParagraph(firstCell);
                    var lastPara = this.getLastParagraph(lastCell);
                    this.start.setPosition(firstPara.firstChild, true);
                    this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                    this.selectPosition(this.start, this.end);
                }
                else if (firstElement && lastElement) {
                    var startPosition = new selection_helper_1.TextPosition(this.owner);
                    var offset = 0;
                    if (firstElement instanceof index_3.WCharacterFormat) {
                        var currentPara = firstElement.ownerBase;
                        if (currentPara.childWidgets.length > 1) {
                            offset = this.getParagraphLength(currentPara) - this.getParagraphLength(currentPara, currentPara.lastChild);
                        }
                        else {
                            offset = currentPara.getLength();
                        }
                        startPosition.setPositionParagraph(currentPara.lastChild, offset);
                    }
                    else {
                        offset = firstElement.line.getOffset(firstElement, 0);
                        var line = firstElement.line;
                        if (line.isFirstLine()) {
                            for (var i = 0; i < line.children.length; i++) {
                                if (firstElement === line.children[i] && line.children[i] instanceof page_1.TextElementBox) {
                                    offset = 0;
                                    break;
                                }
                                else if (line.children[i] instanceof page_1.TextElementBox) {
                                    break;
                                }
                            }
                        }
                        startPosition.setPositionForLineWidget(firstElement.line, offset);
                    }
                    var endPosition = new selection_helper_1.TextPosition(this.owner);
                    if (lastElement instanceof index_3.WCharacterFormat) {
                        var currentPara = lastElement.ownerBase;
                        var splittedWidgets = currentPara.getSplitWidgets();
                        currentPara = splittedWidgets[splittedWidgets.length - 1];
                        if (currentPara.isEndsWithPageBreak || currentPara.isEndsWithColumnBreak) {
                            this.owner.trackChangesPane.isTrackingPageBreak = true;
                        }
                        if (currentPara.childWidgets.length > 1) {
                            offset = this.getParagraphLength(currentPara) - this.getParagraphLength(currentPara, currentPara.lastChild);
                        }
                        else {
                            offset = currentPara.getLength();
                        }
                        endPosition.setPositionParagraph(currentPara.lastChild, offset + 1);
                    }
                    else {
                        offset = lastElement.line.getOffset(lastElement, 0) + lastElement.length;
                        if (this.isTOC()) {
                            offset += 1;
                        }
                        endPosition.setPositionForLineWidget(lastElement.line, offset);
                    }
                    var curentPosition = startPosition.clone();
                    if (!startPosition.isExistBefore(endPosition)) {
                        startPosition = endPosition;
                        endPosition = curentPosition;
                    }
                    this.selectPosition(startPosition, endPosition);
                }
            }
        };
        Selection.prototype.selectTableRevision = function (revision) {
            if (!ej2_base_1.isNullOrUndefined(revision) && revision[0].range.length > 0) {
                var firstElementTable = revision[0].range[0];
                var lastElementTable = revision[revision.length - 1].range[0];
                if (firstElementTable instanceof index_1.WRowFormat) {
                    var firstRowWidget = firstElementTable.ownerBase;
                    var firstCell = firstRowWidget.childWidgets[0];
                    var secondRowWidget = lastElementTable.ownerBase;
                    var lastCell = secondRowWidget.childWidgets[secondRowWidget.childWidgets.length - 1];
                    var firstPara = this.getFirstParagraph(firstCell);
                    var lastPara = this.getLastParagraph(lastCell);
                    this.start.setPosition(firstPara.firstChild, true);
                    this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                    this.selectPosition(this.start, this.end);
                }
            }
        };
        Selection.prototype.updateEditRangeCollection = function () {
            if (this.editRangeCollection.length > 0) {
                this.editRangeCollection = [];
            }
            var editRangeStart;
            var everyOneArea;
            if (!this.documentHelper.isDocumentProtected) {
                for (var i = 0; i < this.documentHelper.editRanges.length; i++) {
                    var user = this.documentHelper.editRanges.keys[i];
                    editRangeStart = this.documentHelper.editRanges.get(user);
                    for (var j = 0; j < editRangeStart.length; j++) {
                        this.editRangeCollection.push(editRangeStart[j]);
                    }
                }
            }
            else {
                if (this.documentHelper.editRanges.containsKey(this.owner.currentUser)) {
                    editRangeStart = this.documentHelper.editRanges.get(this.owner.currentUser);
                    for (var j = 0; j < editRangeStart.length; j++) {
                        this.editRangeCollection.push(editRangeStart[j]);
                    }
                }
                if (this.documentHelper.editRanges.containsKey('Everyone')) {
                    var user = 'Everyone';
                    everyOneArea = this.documentHelper.editRanges.get(user);
                    for (var j = 0; j < everyOneArea.length; j++) {
                        this.editRangeCollection.push(everyOneArea[j]);
                    }
                }
            }
        };
        Selection.prototype.onHighlight = function () {
            if (this.isHighlightEditRegion) {
                this.highlightEditRegion();
            }
            else {
                this.unHighlightEditRegion();
            }
            this.viewer.renderVisiblePages();
        };
        Selection.prototype.highlightEditRegion = function () {
            this.updateEditRangeCollection();
            if (this.owner.enableLockAndEdit) {
                this.viewer.updateScrollBars();
                return;
            }
            if (!this.isHighlightEditRegion) {
                this.unHighlightEditRegion();
                return;
            }
            this.isHightlightEditRegionInternal = true;
            if (ej2_base_1.isNullOrUndefined(this.editRegionHighlighters)) {
                this.editRegionHighlighters = new dictionary_1.Dictionary();
            }
            this.editRegionHighlighters.clear();
            for (var j = 0; j < this.editRangeCollection.length; j++) {
                this.highlightEditRegionInternal(this.editRangeCollection[j]);
            }
            this.isHightlightEditRegionInternal = false;
            this.viewer.updateScrollBars();
        };
        Selection.prototype.highlightFormFields = function () {
            if (ej2_base_1.isNullOrUndefined(this.formFieldHighlighters)) {
                this.formFieldHighlighters = new dictionary_1.Dictionary();
            }
            this.formFieldHighlighters.clear();
            var formFields = this.documentHelper.formFields;
            if (!ej2_base_1.isNullOrUndefined(formFields) && formFields.length > 0) {
                for (var i = 0; i < formFields.length; i++) {
                    var formField = formFields[i];
                    if (editor_helper_1.HelperMethods.isLinkedFieldCharacter(formField)) {
                        var offset = formField.line.getOffset(formField, 0);
                        var startPosition = new selection_helper_1.TextPosition(this.owner);
                        startPosition.setPositionParagraph(formField.line, offset);
                        var endElement = formField.fieldEnd;
                        offset = endElement.line.getOffset(endElement, 1);
                        var endPosition = new selection_helper_1.TextPosition(this.owner);
                        endPosition.setPositionParagraph(endElement.line, offset);
                        this.isHighlightFormFields = true;
                        this.highlight(startPosition.paragraph, startPosition, endPosition);
                        if (this.isHighlightNext) {
                            this.highlightNextBlock(this.hightLightNextParagraph, startPosition, endPosition);
                            this.isHighlightNext = false;
                            this.hightLightNextParagraph = undefined;
                        }
                    }
                }
                this.isHighlightFormFields = false;
                this.viewer.updateScrollBars();
            }
        };
        Selection.prototype.unHighlightEditRegion = function () {
            if (!ej2_base_1.isNullOrUndefined(this.editRegionHighlighters)) {
                this.editRegionHighlighters.clear();
                this.editRegionHighlighters = undefined;
            }
            this.isHightlightEditRegionInternal = false;
        };
        Selection.prototype.highlightEditRegionInternal = function (editRangeStart) {
            var positionInfo = this.getPosition(editRangeStart);
            var startPosition = positionInfo.startPosition;
            var endPosition = positionInfo.endPosition;
            this.isCurrentUser = true;
            this.highlightEditRegions(editRangeStart, startPosition, endPosition);
            this.isCurrentUser = false;
        };
        Selection.prototype.showAllEditingRegion = function () {
            if (this.editRangeCollection.length === 0) {
                this.updateEditRangeCollection();
            }
            this.documentHelper.clearSelectionHighlight();
            for (var j = 0; j < this.editRangeCollection.length; j++) {
                var editRangeStart = this.editRangeCollection[j];
                var positionInfo = this.getPosition(editRangeStart);
                var startPosition = positionInfo.startPosition;
                var endPosition = positionInfo.endPosition;
                this.highlightEditRegions(editRangeStart, startPosition, endPosition);
            }
        };
        Selection.prototype.highlightEditRegions = function (editRangeStart, startPosition, endPosition) {
            if (!editRangeStart.line.paragraph.isInsideTable
                || (editRangeStart.line.paragraph.isInsideTable && !editRangeStart.editRangeEnd.line.paragraph.isInsideTable) || editRangeStart.columnFirst === -1) {
                this.highlight(editRangeStart.line.paragraph, startPosition, endPosition);
                if (this.isHighlightNext) {
                    this.highlightNextBlock(this.hightLightNextParagraph, startPosition, endPosition);
                    this.isHighlightNext = false;
                    this.hightLightNextParagraph = undefined;
                }
            }
            else {
                var row = editRangeStart.line.paragraph.associatedCell.ownerRow;
                var cell = row.childWidgets[editRangeStart.columnFirst];
                if (cell) {
                    for (var i = 0; i < cell.childWidgets.length; i++) {
                        if (cell.childWidgets[i] instanceof page_1.ParagraphWidget) {
                            this.highlight(cell.childWidgets[i], startPosition, endPosition);
                            if (this.isHighlightNext) {
                                this.highlightNextBlock(this.hightLightNextParagraph, startPosition, endPosition);
                                this.isHighlightNext = false;
                                this.hightLightNextParagraph = undefined;
                            }
                        }
                    }
                }
            }
        };
        Selection.prototype.navigateToNextEditingRegion = function () {
            var editRange = this.getEditRangeStartElement();
            if (this.editRangeCollection.length > 0) {
                this.sortEditRangeCollection();
                var length_2 = this.editRangeCollection.length;
                var index = length_2;
                if (!ej2_base_1.isNullOrUndefined(editRange)) {
                    index = this.editRangeCollection.indexOf(editRange);
                }
                var editRangeStart = index < length_2 - 1 ?
                    this.editRangeCollection[index + 1] : this.editRangeCollection[0];
                var positionInfo = this.getPosition(editRangeStart);
                var startPosition = positionInfo.startPosition;
                var endPosition = positionInfo.endPosition;
                this.selectRange(startPosition, endPosition);
            }
        };
        Selection.prototype.sortEditRangeCollection = function () {
            for (var i = this.editRangeCollection.length - 1; i >= 0; i--) {
                for (var j = 1; j <= i; j++) {
                    var nextPosition = this.getPosition(this.editRangeCollection[j - 1]).startPosition;
                    var firstPosition = this.getPosition(this.editRangeCollection[j]).startPosition;
                    if (nextPosition.isExistAfter(firstPosition)) {
                        var temp = this.editRangeCollection[j - 1];
                        this.editRangeCollection[j - 1] = this.editRangeCollection[j];
                        this.editRangeCollection[j] = temp;
                    }
                }
            }
        };
        Selection.prototype.toggleEditingRegionHighlight = function () {
            this.isHighlightEditRegion = !this.isHighlightEditRegion;
        };
        Selection.prototype.getEditRangeStartElement = function () {
            for (var i = 0; i < this.editRangeCollection.length; i++) {
                var editStart = this.editRangeCollection[i];
                var position = this.getPosition(editStart);
                var start = position.startPosition;
                var end = position.endPosition;
                if ((this.start.isExistAfter(start) || this.start.isAtSamePosition(start))
                    && (this.end.isExistBefore(end) || this.end.isAtSamePosition(end))) {
                    return editStart;
                }
            }
            return undefined;
        };
        Selection.prototype.isSelectionInEditRegion = function () {
            if (!this.documentHelper.isDocumentProtected) {
                return false;
            }
            return this.checkSelectionIsAtEditRegion();
        };
        Selection.prototype.checkSelectionIsAtEditRegion = function (start, end) {
            if (ej2_base_1.isNullOrUndefined(start) && ej2_base_1.isNullOrUndefined(end)) {
                start = this.start;
                end = this.end;
                if (!this.isForward) {
                    start = this.end;
                    end = this.start;
                }
            }
            for (var i = 0; i < this.editRangeCollection.length; i++) {
                var editRangeStart = this.editRangeCollection[i];
                if (!editRangeStart.line.paragraph.isInsideTable
                    || (editRangeStart.line.paragraph.isInsideTable && !editRangeStart.editRangeEnd.line.paragraph.isInsideTable)
                    || editRangeStart.columnFirst === -1) {
                    if (this.isSelectionInsideEditRange(editRangeStart, start, end)) {
                        return true;
                    }
                }
                else {
                    if (editRangeStart.paragraph.isInsideTable && editRangeStart.editRangeEnd &&
                        editRangeStart.editRangeEnd.line.paragraph.isInsideTable) {
                        var editRangeRow = editRangeStart.paragraph.associatedCell.ownerRow;
                        var startCell = start.paragraph.associatedCell;
                        var endCell = end.paragraph.associatedCell;
                        if (!ej2_base_1.isNullOrUndefined(startCell) && !ej2_base_1.isNullOrUndefined(endCell)) {
                            if (editRangeRow.equals(startCell.ownerRow) && editRangeRow.equals(endCell.ownerRow)
                                && startCell.index >= editRangeStart.columnFirst && startCell.index <= editRangeStart.columnLast) {
                                if (this.isEmpty && startCell.index === editRangeStart.line.paragraph.associatedCell.index) {
                                    if (this.isSelectionInsideEditRange(editRangeStart, start, end)) {
                                        return true;
                                    }
                                }
                                else if (!this.isCellSelected(startCell, start, end)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        };
        Selection.prototype.isEditRangeCellSelected = function (start, end) {
            if (ej2_base_1.isNullOrUndefined(start) && ej2_base_1.isNullOrUndefined(end)) {
                start = this.start;
                end = this.end;
                if (!this.isForward) {
                    start = this.end;
                    end = this.start;
                }
            }
            for (var i = 0; i < this.editRangeCollection.length; i++) {
                var editRangeStart = this.editRangeCollection[i];
                if (editRangeStart.paragraph.isInsideTable && editRangeStart.editRangeEnd &&
                    editRangeStart.editRangeEnd.line.paragraph.isInsideTable) {
                    var startCell = start.paragraph.associatedCell;
                    var endCell = end.paragraph.associatedCell;
                    var editRangeCell = editRangeStart.paragraph.associatedCell;
                    if (!ej2_base_1.isNullOrUndefined(startCell) && !ej2_base_1.isNullOrUndefined(endCell)) {
                        if (startCell.index >= editRangeStart.columnFirst && startCell.index <= editRangeStart.columnLast) {
                            if (this.isCellSelected(editRangeCell, start, end)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        Selection.prototype.isSelectionInsideEditRange = function (editRangeStart, start, end) {
            var positionInfo = this.getPosition(editRangeStart);
            var startPosition = positionInfo.startPosition;
            var endPosition = positionInfo.endPosition;
            if ((start.isExistAfter(startPosition) || start.isAtSamePosition(startPosition))
                && (end.isExistBefore(endPosition) || end.isAtSamePosition(endPosition))) {
                return true;
            }
            return false;
        };
        Selection.prototype.getPosition = function (element) {
            var offset = element.line.getOffset(element, 1);
            var startPosition = new selection_helper_1.TextPosition(this.owner);
            startPosition.setPositionParagraph(element.line, offset);
            var endElement;
            if (element instanceof page_1.EditRangeStartElementBox) {
                endElement = element.editRangeEnd;
            }
            else if (element instanceof page_1.ContentControl) {
                endElement = element.reference;
            }
            else if (element instanceof page_1.BookmarkElementBox) {
                endElement = element.reference;
            }
            else if (element instanceof page_1.CommentCharacterElementBox) {
                endElement = element.comment.commentEnd;
            }
            var endPosition;
            if (!ej2_base_1.isNullOrUndefined(endElement.line)) {
                offset = endElement.line.getOffset(endElement, 1);
                endPosition = new selection_helper_1.TextPosition(this.owner);
                endPosition.setPositionParagraph(endElement.line, offset);
            }
            else {
                endPosition = startPosition.clone();
            }
            return { 'startPosition': startPosition, 'endPosition': endPosition };
        };
        Selection.prototype.checkContentControlLocked = function (checkFormat) {
            this.owner.editorModule.isXmlMapped = false;
            for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
                var contentControlStart = this.documentHelper.contentControlCollection[i];
                var position = this.getPosition(contentControlStart);
                var cCstart = position.startPosition;
                var cCend = position.endPosition;
                var start = this.start;
                var end = this.end;
                if (!this.isForward) {
                    start = this.end;
                    end = this.start;
                }
                if (ej2_base_1.isNullOrUndefined(checkFormat)) {
                    var cCStartInsideSelction = ((cCstart.isExistAfter(start) || cCstart.isAtSamePosition(start)) && (cCstart.isExistBefore(end) || cCstart.isAtSamePosition(end)));
                    var cCEndInsideSelction = ((cCend.isExistAfter(start) || cCend.isAtSamePosition(start)) && (cCend.isExistBefore(end) || cCend.isAtSamePosition(end)));
                    if (cCStartInsideSelction && cCEndInsideSelction) {
                        if (contentControlStart.contentControlProperties.lockContentControl) {
                            this.owner.trigger(index_2.contentControlEvent);
                            return true;
                        }
                        return false;
                    }
                    if ((cCStartInsideSelction) || (cCEndInsideSelction)) {
                        if (!(cCstart.isAtSamePosition(start) || cCend.isAtSamePosition(start)) && (contentControlStart.contentControlProperties.lockContentControl || contentControlStart.contentControlProperties.lockContents)) {
                            return true;
                        }
                    }
                }
                if ((start.isExistAfter(cCstart) || start.isAtSamePosition(cCstart))
                    && (end.isExistBefore(cCend) || end.isAtSamePosition(cCend))) {
                    if (contentControlStart.contentControlProperties.xmlMapping
                        && contentControlStart.contentControlProperties.xmlMapping.isMapped) {
                        this.owner.editorModule.isXmlMapped = true;
                    }
                    if (contentControlStart.contentControlProperties.lockContents) {
                        this.owner.trigger(index_2.contentControlEvent);
                        return true;
                    }
                    else if (ej2_base_1.isNullOrUndefined(checkFormat)
                        && (contentControlStart.contentControlProperties.type === 'CheckBox'
                            || contentControlStart.contentControlProperties.type === 'ComboBox'
                            || contentControlStart.contentControlProperties.type === 'DropDownList'
                            || contentControlStart.contentControlProperties.type === 'Date')) {
                        this.owner.trigger(index_2.contentControlEvent);
                        return true;
                    }
                }
            }
            return false;
        };
        Selection.prototype.getElementPosition = function (element, isEnd) {
            var offset = element.line.getOffset(element, isEnd ? 0 : 1);
            var startPosition = new selection_helper_1.TextPosition(this.owner);
            startPosition.setPositionParagraph(element.line, offset);
            return { 'startPosition': startPosition, 'endPosition': undefined };
        };
        Selection.prototype.updateRefField = function (field) {
            if (ej2_base_1.isNullOrUndefined(field)) {
                field = this.getHyperlinkField(true);
            }
            if (!ej2_base_1.isNullOrUndefined(field)) {
                if (!this.isReferenceField(field)) {
                    return;
                }
                var fieldCode = this.getFieldCode(field).replace(/\s+/g, ' ');
                fieldCode = fieldCode.trim();
                if (fieldCode.toLowerCase().indexOf('ref') === 0) {
                    var code = fieldCode.split(' ');
                    if (code.length > 1) {
                        var bookmarkId = code[1];
                        if (this.documentHelper.bookmarks.containsKey(bookmarkId)) {
                            var start = this.start;
                            var end = this.end;
                            if (!this.isForward) {
                                start = this.end;
                                end = this.start;
                            }
                            var bookmarkStart = this.documentHelper.bookmarks.get(bookmarkId);
                            var bookmarkEnd = bookmarkStart.reference;
                            var previousNode = bookmarkStart.previousNode;
                            if ((ej2_base_1.isNullOrUndefined(previousNode) || !(previousNode instanceof page_1.FieldElementBox))
                                && bookmarkEnd && bookmarkEnd.previousNode instanceof page_1.FieldElementBox
                                && bookmarkEnd.previousNode.fieldType === 1
                                && !ej2_base_1.isNullOrUndefined(bookmarkEnd.previousNode.fieldBegin)
                                && !ej2_base_1.isNullOrUndefined(bookmarkEnd.previousNode.fieldBegin.formFieldData)) {
                                bookmarkStart = bookmarkEnd.previousNode.fieldBegin.fieldSeparator;
                                bookmarkEnd = bookmarkEnd.previousNode.fieldBegin.fieldEnd;
                            }
                            else if (previousNode instanceof page_1.FieldElementBox && previousNode.fieldType === 0
                                && !ej2_base_1.isNullOrUndefined(previousNode.formFieldData)) {
                                bookmarkStart = previousNode.fieldSeparator;
                                bookmarkEnd = previousNode.fieldEnd;
                            }
                            var offset = bookmarkStart.line.getOffset(bookmarkStart, 1);
                            start.setPositionParagraph(bookmarkStart.line, offset);
                            end.setPositionParagraph(bookmarkEnd.line, bookmarkEnd.line.getOffset(bookmarkEnd, 0));
                            var documentContent = this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), start.currentWidget, start.offset, end.currentWidget, end.offset, false, true);
                            var startElement = field.fieldSeparator;
                            var endElement = field.fieldEnd;
                            start.setPositionParagraph(startElement.line, startElement.line.getOffset(startElement, 1));
                            end.setPositionParagraph(endElement.line, endElement.line.getOffset(endElement, 0));
                            this.owner.editor.pasteContents(documentContent);
                        }
                    }
                }
            }
        };
        Selection.prototype.footnoteReferenceElement = function (start, end, inline) {
            var container = this.getContainerWidget(start.paragraph);
            var count = 0;
            if (container instanceof page_1.FootNoteWidget) {
                var footNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
                for (var i = 0; i < this.documentHelper.pages.length; i++) {
                    count = 0;
                    var page = this.documentHelper.pages[i];
                    for (var j = 0; j < page.bodyWidgets.length; j++) {
                        var bodyWidget = page.bodyWidgets[j];
                        for (var k = 0; k < bodyWidget.childWidgets.length; k++) {
                            var paragraph = bodyWidget.childWidgets[k];
                            if (paragraph instanceof page_1.TableWidget) {
                                for (var tr = 0; tr < paragraph.childWidgets.length; tr++) {
                                    var tablerow = paragraph.childWidgets[tr];
                                    for (var tc = 0; tc < tablerow.childWidgets.length; tc++) {
                                        var tablecell = tablerow.childWidgets[tc];
                                        for (var para = 0; para < tablecell.childWidgets.length; para++) {
                                            var paragr = tablecell.childWidgets[para];
                                            for (var line = 0; line < paragr.childWidgets.length; line++) {
                                                var lines = paragr.childWidgets[line];
                                                count = 0;
                                                if (!ej2_base_1.isNullOrUndefined(lines.children)) {
                                                    for (var m = 0; m < lines.children.length; m++) {
                                                        var child = lines.children[m];
                                                        count += child.length;
                                                        if (child instanceof page_1.FootnoteElementBox && child === footNoteElement) {
                                                            start.setPositionParagraph(lines, count - 1);
                                                            end.setPositionParagraph(lines, count);
                                                            this.selectRange(start, end);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                for (var l = 0; l < paragraph.childWidgets.length; l++) {
                                    var lines = paragraph.childWidgets[l];
                                    count = 0;
                                    if (!ej2_base_1.isNullOrUndefined(lines.children)) {
                                        for (var m = 0; m < lines.children.length; m++) {
                                            var child = lines.children[m];
                                            count += child.length;
                                            if (child instanceof page_1.FootnoteElementBox && child === footNoteElement) {
                                                start.setPositionParagraph(lines, count - 1);
                                                end.setPositionParagraph(lines, count);
                                                this.selectRange(start, end);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        Selection.prototype.getAbsolutePositionFromRelativePosition = function (textPosition) {
            var startPosition;
            if (typeof textPosition == 'string') {
                startPosition = this.getTextPosBasedOnLogicalIndex(textPosition);
            }
            else {
                startPosition = textPosition;
            }
            var paragraphInfo = this.getParagraphInfo(startPosition);
            var positionInfo = { position: 0, done: false };
            this.getPositionInfoForHeaderFooter(paragraphInfo, positionInfo);
            if (!positionInfo.done) {
            }
            return positionInfo.position;
        };
        Selection.prototype.getPositionInfoForBodyContent = function (paragraphInfo, positionInfo, blockWidget, tableBlock) {
            var block = !ej2_base_1.isNullOrUndefined(blockWidget) ? blockWidget : this.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
            positionInfo.position += this.getBlockIndex(block, paragraphInfo, positionInfo, tableBlock);
            return positionInfo;
        };
        Selection.prototype.getPositionInfoForHeaderFooter = function (paragraphInfo, positionInfo, tableBlock) {
            positionInfo = this.getPositionInfoForBodyContent(paragraphInfo, positionInfo, undefined, tableBlock);
            if (!positionInfo.done) {
                this.getBlockIndexFromHeaderFooter(paragraphInfo, positionInfo, tableBlock);
            }
            return positionInfo;
        };
        Selection.prototype.getBlockIndexFromHeaderFooter = function (paragraphInfo, positionInfo, tableBlock) {
            var headersFooters = this.documentHelper.headersFooters;
            for (var _i = 0, headersFooters_1 = headersFooters; _i < headersFooters_1.length; _i++) {
                var headerFooter = headersFooters_1[_i];
                for (var i = 0; i < 6; i++) {
                    var currentHeaderFooter = headerFooter[i];
                    if (currentHeaderFooter) {
                        positionInfo.position += this.getBlockIndex(currentHeaderFooter.childWidgets[0], paragraphInfo, positionInfo, tableBlock);
                        if (positionInfo.done) {
                            return positionInfo;
                        }
                    }
                    else {
                        positionInfo.position += 1;
                    }
                }
            }
            return positionInfo;
        };
        Selection.prototype.getBlockIndex = function (block, paragraphInfo, positionInfo, tableBlock) {
            var position = 0;
            var fieldResult = { length: 0 };
            do {
                if (block instanceof page_1.ParagraphWidget && !ej2_base_1.isNullOrUndefined(paragraphInfo) && !ej2_base_1.isNullOrUndefined(paragraphInfo.paragraph) && paragraphInfo.paragraph.equals(block)) {
                    position += 1;
                    var elementInfo = block.getInline(paragraphInfo.offset, 0);
                    position += this.getBlockOffsetByElement(paragraphInfo, block, elementInfo.element, elementInfo.index, fieldResult);
                    if (this.isEndOffset && this.end.offset === this.getLineLength(this.end.currentWidget) + 1) {
                        position += 1;
                    }
                    positionInfo.done = true;
                    break;
                }
                position = this.getBlockLength(paragraphInfo, block, position, positionInfo, true, tableBlock, fieldResult);
                if (positionInfo.done) {
                    break;
                }
                if (!ej2_base_1.isNullOrUndefined(block)) {
                    if (block.containerWidget instanceof page_1.BodyWidget && block.containerWidget.containerWidget instanceof page_1.FootNoteWidget) {
                        var nextBlock = block.getSplitWidgets().pop().nextRenderedWidget;
                        if (!ej2_base_1.isNullOrUndefined(nextBlock) && block.containerWidget !== nextBlock.containerWidget) {
                            break;
                        }
                        else {
                            block = nextBlock;
                        }
                    }
                    else {
                        block = block.getSplitWidgets().pop().nextRenderedWidget;
                    }
                }
            } while (block);
            return position;
        };
        Selection.prototype.getBlockTotalLength = function (block, targetBlock, positionInfo, tableBlock, fieldResult) {
            var offset = 0;
            var isDropdown = false;
            var splittedWidget = block.getSplitWidgets();
            for (var i = 0; i < splittedWidget.length; i++) {
                for (var j = 0; j < splittedWidget[i].childWidgets.length; j++) {
                    var line = splittedWidget[i].childWidgets[j];
                    for (var k = 0; k < line.children.length; k++) {
                        var element = line.children[k];
                        if (element instanceof page_1.ListTextElementBox) {
                            continue;
                        }
                        if (element instanceof page_1.ShapeElementBox || element instanceof page_1.FootnoteElementBox) {
                            if (element instanceof page_1.ShapeElementBox) {
                                if (element.textFrame.childWidgets.length > 0) {
                                    offset += this.getBlockIndex(element.textFrame.childWidgets[0], targetBlock, positionInfo, undefined);
                                }
                            }
                            else {
                                offset += this.getBlockIndex(element.bodyWidget.childWidgets[0], targetBlock, positionInfo, undefined);
                            }
                            if (positionInfo.done) {
                                return offset;
                            }
                        }
                        if (element instanceof page_1.FieldElementBox && element.fieldType == 0 && element.formFieldData instanceof page_1.DropDownFormField) {
                            isDropdown = true;
                        }
                        if (isDropdown && element instanceof page_1.FieldElementBox && element.fieldType == 1) {
                            if (element.previousNode instanceof page_1.TextElementBox) {
                                fieldResult.length += element.previousNode.length;
                                isDropdown = false;
                            }
                        }
                        offset += element.length;
                    }
                }
            }
            return offset;
        };
        Selection.prototype.getBlockLength = function (paragraphInfo, block, position, completed, skipShapeElement, tableBlock, fieldResult) {
            if (paragraphInfo && block instanceof page_1.ParagraphWidget && !ej2_base_1.isNullOrUndefined(paragraphInfo.paragraph) && paragraphInfo.paragraph.equals(block)) {
                position += 1;
                var elementInfo = block.getInline(paragraphInfo.offset, 0);
                position += this.getBlockOffsetByElement(paragraphInfo, block, elementInfo.element, elementInfo.index, fieldResult);
                if (this.isEndOffset && block.isInsideTable && block.associatedCell.lastChild.equals(block) && paragraphInfo.offset === this.getParagraphLength(block) + 1) {
                    position += 1;
                }
                completed.done = true;
                return position;
            }
            if (block instanceof page_1.ParagraphWidget) {
                position += 1;
                if (!skipShapeElement) {
                    position += (block.getTotalLength());
                }
                else {
                    position += this.getBlockTotalLength(block, paragraphInfo, completed, tableBlock, fieldResult);
                }
            }
            else if (block instanceof page_1.TableWidget) {
                position += 1;
                if (!ej2_base_1.isNullOrUndefined(tableBlock)) {
                    if (tableBlock instanceof page_1.TableWidget) {
                        if (tableBlock.equals(block)) {
                            completed.done = true;
                            return position;
                        }
                    }
                }
                var row = block.firstChild;
                while (row) {
                    position += 1;
                    if (!ej2_base_1.isNullOrUndefined(tableBlock)) {
                        if (tableBlock instanceof page_1.TableRowWidget) {
                            if (tableBlock.equals(row)) {
                                completed.done = true;
                                return position;
                            }
                        }
                    }
                    var cell = row.firstChild;
                    while (cell) {
                        position += 1;
                        if (!ej2_base_1.isNullOrUndefined(tableBlock)) {
                            if (tableBlock instanceof page_1.TableCellWidget) {
                                if (tableBlock.equals(cell)) {
                                    completed.done = true;
                                    return position;
                                }
                            }
                        }
                        var childBlock = cell.firstChild;
                        while (childBlock) {
                            position = this.getBlockLength(paragraphInfo, childBlock, position, completed, skipShapeElement, tableBlock, fieldResult);
                            if (completed.done) {
                                return position;
                            }
                            childBlock = childBlock.getSplitWidgets().pop().nextRenderedWidget;
                        }
                        cell = cell.nextWidget;
                    }
                    row = row.getSplitWidgets().pop().nextRenderedWidget;
                }
            }
            return position;
        };
        Selection.prototype.calculateCellLength = function (cell) {
            var block = cell.firstChild;
            var position = 0;
            var completed = { "done": false };
            var paragraphInfo = { 'paragraph': null, 'offset': 0 };
            while (block) {
                position = this.getBlockLength(paragraphInfo, block, position, completed, true, undefined, undefined);
                block = block.getSplitWidgets().pop().nextRenderedWidget;
            }
            return position;
        };
        Selection.prototype.getBlockOffsetByElement = function (paragraphInfo, block, targetElement, elementIndex, fieldResult) {
            var offset = 0;
            var isDropdown = false;
            var splittedWidget = block.getSplitWidgets();
            for (var i = 0; i < splittedWidget.length; i++) {
                for (var j = 0; j < splittedWidget[i].childWidgets.length; j++) {
                    var line = splittedWidget[i].childWidgets[j];
                    for (var k = 0; k < line.children.length; k++) {
                        var element = line.children[k];
                        if (element instanceof page_1.ListTextElementBox) {
                            continue;
                        }
                        if (element instanceof page_1.FieldElementBox && element.fieldType == 0 && element.formFieldData instanceof page_1.DropDownFormField) {
                            isDropdown = true;
                        }
                        if (isDropdown && element instanceof page_1.FieldElementBox && element.fieldType == 1) {
                            if (element.previousNode instanceof page_1.TextElementBox) {
                                fieldResult.length += element.previousNode.length;
                                isDropdown = false;
                            }
                        }
                        if (element === targetElement) {
                            return offset + elementIndex;
                        }
                        if (element instanceof page_1.ShapeElementBox || element instanceof page_1.FootnoteElementBox) {
                            if (element instanceof page_1.ShapeElementBox) {
                                if (element.textFrame.childWidgets.length > 0) {
                                    for (var m = 0; m < element.textFrame.childWidgets.length; m++) {
                                        offset = this.getBlockLength(paragraphInfo, element.textFrame.childWidgets[m], offset, { done: false }, false, undefined, undefined);
                                    }
                                }
                            }
                            else {
                                if (element.bodyWidget.childWidgets.length > 0) {
                                    for (var m = 0; m < element.bodyWidget.childWidgets.length; m++) {
                                        offset = this.getBlockLength(paragraphInfo, element.bodyWidget.childWidgets[m], offset, { done: false }, false, undefined, undefined);
                                    }
                                }
                            }
                        }
                        offset += element.length;
                    }
                }
            }
            return offset;
        };
        Selection.prototype.getTableRelativeValue = function (startPosition, endPosition) {
            if (startPosition.currentWidget.paragraph.isInsideTable) {
                if (this.isTableSelected()) {
                    return 3;
                }
                else if (this.isRowSelect() && endPosition.paragraph.isInsideTable && startPosition.paragraph.associatedCell.ownerTable.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                    return 2;
                }
                else {
                    var table = startPosition.paragraph.associatedCell.ownerTable.getSplitWidgets();
                    var firstParagraph = this.getFirstBlockInFirstCell(table[0]);
                    if (startPosition.paragraph.associatedCell.equals(firstParagraph.associatedCell)) {
                        if (endPosition.paragraph.isInsideTable) {
                            if (!startPosition.paragraph.associatedCell.ownerTable.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                                var length_3 = this.isRowSelect() ? 2 : 3;
                                var table_1 = startPosition.paragraph.associatedCell.ownerTable;
                                while (table_1.containerWidget instanceof page_1.TableCellWidget) {
                                    length_3 += 3;
                                    table_1 = table_1.containerWidget.ownerTable;
                                    if (table_1.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                                        break;
                                    }
                                }
                                return length_3;
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            return 3;
                        }
                    }
                    else {
                        if (endPosition.currentWidget.paragraph.isInsideTable) {
                            if (!startPosition.paragraph.associatedCell.ownerTable.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                                return 2;
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            return 2;
                        }
                    }
                }
            }
            return 0;
        };
        Selection.prototype.isRowSelect = function () {
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            if (ej2_base_1.isNullOrUndefined(start.paragraph.associatedCell) ||
                ej2_base_1.isNullOrUndefined(end.paragraph.associatedCell) || start.paragraph.associatedCell.equals(end.paragraph.associatedCell) || this.isTableSelected(true)) {
                return false;
            }
            var endTable = end.paragraph.associatedCell.ownerTable;
            var isRowSelect = false;
            if (endTable.containerWidget instanceof page_1.TableCellWidget) {
                while (endTable.containerWidget instanceof page_1.TableCellWidget) {
                    endTable = endTable.containerWidget.ownerTable;
                    for (var i = 0; i < endTable.childWidgets.length; i++) {
                        var row_1 = endTable.childWidgets[i];
                        if (row_1.childWidgets[row_1.childWidgets.length - 1].equals(endTable.containerWidget)) {
                            isRowSelect = true;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < endTable.childWidgets.length; i++) {
                    var row_2 = endTable.childWidgets[i];
                    if (row_2.childWidgets[row_2.childWidgets.length - 1].equals(end.paragraph.associatedCell)) {
                        isRowSelect = true;
                    }
                }
            }
            var row = start.paragraph.associatedCell.ownerRow.getSplitWidgets();
            var firstcell;
            if (row[0].childWidgets.length > 0) {
                firstcell = row[0].childWidgets[0];
            }
            return start.paragraph.associatedCell.equals(firstcell) && isRowSelect;
        };
        return Selection;
    }());
    exports.Selection = Selection;
});
