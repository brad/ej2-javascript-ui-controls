define(["require", "exports", "../../base/dictionary", "@syncfusion/ej2-base", "../selection/selection-helper", "../viewer/page", "./text-search", "../search/text-search", "../search/text-search-results", "./search-results", "../../base/index"], function (require, exports, dictionary_1, ej2_base_1, selection_helper_1, page_1, text_search_1, text_search_2, text_search_results_1, search_results_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Search = (function () {
        function Search(owner) {
            this.searchHighlighters = undefined;
            this.owner = owner;
            this.searchHighlighters = new dictionary_1.Dictionary();
            this.textSearch = new text_search_2.TextSearch(this.owner);
            this.textSearchResults = new text_search_results_1.TextSearchResults(this.owner);
            this.searchResultsInternal = new search_results_1.SearchResults(this);
        }
        Object.defineProperty(Search.prototype, "viewer", {
            get: function () {
                return this.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Search.prototype, "searchResults", {
            get: function () {
                return this.searchResultsInternal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Search.prototype, "documentHelper", {
            get: function () {
                return this.owner.documentHelper;
            },
            enumerable: true,
            configurable: true
        });
        Search.prototype.getModuleName = function () {
            return 'Search';
        };
        Search.prototype.find = function (text, findOptions) {
            if (ej2_base_1.isNullOrUndefined(findOptions)) {
                findOptions = 'None';
            }
            var result = this.textSearch.find(text, findOptions);
            if (!ej2_base_1.isNullOrUndefined(result)) {
                this.navigate(result);
            }
        };
        Search.prototype.findAll = function (text, findOptions) {
            if (ej2_base_1.isNullOrUndefined(text || text === '')) {
                return;
            }
            if (ej2_base_1.isNullOrUndefined(findOptions)) {
                findOptions = 'None';
            }
            var results = this.textSearch.findAll(text, findOptions);
            if (!ej2_base_1.isNullOrUndefined(results) && results.length > 0) {
                this.navigate(results.innerList[results.currentIndex]);
                this.highlight(results);
            }
        };
        Search.prototype.replace = function (replaceText, result, results) {
            if (ej2_base_1.isNullOrUndefined(this.viewer.owner) || this.viewer.owner.isReadOnlyMode || !this.viewer.owner.editorModule.canEditContentControl || ej2_base_1.isNullOrUndefined(results)) {
                return 0;
            }
            if (!ej2_base_1.isNullOrUndefined(this.viewer)) {
                this.clearSearchHighlight();
            }
            this.navigate(result);
            var endPosition = this.documentHelper.selection.start;
            if (this.owner.enableTrackChanges && this.documentHelper.selection.start.currentWidget) {
                var inline = undefined;
                var inlineElement = this.documentHelper.selection.end.currentWidget.getInline(this.owner.selection.start.offset, 0);
                inline = inlineElement.element;
                if (inline.revisions.length > 0) {
                    this.isRepalceTracking = true;
                }
            }
            var index = results.indexOf(result);
            if (index < 0) {
                return 0;
            }
            this.owner.editorModule.insertTextInternal(replaceText, true);
            var endTextPosition = result.end;
            var startPosition = new selection_helper_1.TextPosition(this.viewer.owner);
            if (endTextPosition.currentWidget.children.length === 0) {
                var linewidget = endTextPosition.currentWidget.paragraph.childWidgets[0];
                startPosition.setPositionParagraph(linewidget, endPosition.offset - replaceText.length);
            }
            else {
                startPosition.setPositionParagraph(endTextPosition.currentWidget, endPosition.offset - replaceText.length);
            }
            this.documentHelper.selection.selectRange(endPosition, startPosition);
            var eventArgs = { source: this.viewer.owner };
            this.viewer.owner.trigger(index_1.searchResultsChangeEvent, eventArgs);
            return 1;
        };
        Search.prototype.replaceInternal = function (textToReplace, findOptions) {
            if ((textToReplace === '' || ej2_base_1.isNullOrUndefined(textToReplace))) {
                return;
            }
            if (ej2_base_1.isNullOrUndefined(findOptions)) {
                findOptions = 'None';
            }
            var textToFind = this.textSearchResults.currentSearchResult.text;
            var pattern = this.viewer.owner.searchModule.textSearch.stringToRegex(textToFind, findOptions);
            var index = this.owner.selection.end.getHierarchicalIndexInternal();
            var result = this.viewer.owner.searchModule.textSearch.findNext(pattern, findOptions, index);
            if (!ej2_base_1.isNullOrUndefined(result)) {
                this.navigate(result);
                this.textSearchResults.addResult();
                this.textSearchResults.innerList[0] = result;
                this.replace(textToReplace, result, this.textSearchResults);
                index = this.owner.selection.end.getHierarchicalIndexInternal();
                result = this.textSearch.findNext(textToFind, findOptions, index);
                if (result) {
                    this.textSearchResults.addResult();
                    this.textSearchResults.innerList[0] = result;
                    this.navigate(result);
                }
            }
        };
        Search.prototype.replaceAll = function (replaceText, results) {
            this.documentHelper.layout.isReplacingAll = true;
            if (ej2_base_1.isNullOrUndefined(this.viewer.owner) || this.viewer.owner.isReadOnlyMode || ej2_base_1.isNullOrUndefined(results)) {
                return 0;
            }
            if (this.owner.editorHistory) {
                this.owner.editorHistory.initComplexHistory(this.owner.selection, 'ReplaceAll');
            }
            var count = results.length;
            this.viewer.owner.isLayoutEnabled = false;
            var text = results.innerList[0].text;
            for (var i = count - 1; i >= 0; i--) {
                var result = results.innerList[parseInt(i.toString(), 10)];
                if (result.start.currentWidget.children.length === 0) {
                    results = this.textSearch.findAll(text);
                    i = results.length;
                }
                else {
                    this.navigate(result);
                    if (this.viewer.owner.isReadOnlyMode || !this.viewer.owner.editorModule.canEditContentControl) {
                        continue;
                    }
                    var allowLayout = true;
                    if (i > 0) {
                        var previousResult = results.innerList[i - 1];
                        if (previousResult.start.paragraph.equals(result.start.paragraph)) {
                            allowLayout = false;
                        }
                    }
                    this.owner.editorModule.insertTextInternal(replaceText, true, undefined, allowLayout);
                    result.destroy();
                }
            }
            if (this.owner.editorHistory && !ej2_base_1.isNullOrUndefined(this.owner.editorHistory.currentHistoryInfo)) {
                this.owner.editorHistory.updateComplexHistory();
            }
            else {
                this.owner.editorModule.updateComplexWithoutHistory(2);
            }
            this.searchResults.clear();
            this.documentHelper.layout.isReplacingAll = false;
            return count;
        };
        Search.prototype.replaceAllInternal = function (textToReplace, findOptions) {
            if (ej2_base_1.isNullOrUndefined(textToReplace)) {
                return;
            }
            if (ej2_base_1.isNullOrUndefined(findOptions)) {
                findOptions = 'None';
            }
            if (this.textSearchResults.length > 0) {
                this.navigate(this.textSearchResults.innerList[this.textSearchResults.currentIndex]);
                this.highlight(this.textSearchResults);
                this.replaceAll(textToReplace, this.textSearchResults);
            }
        };
        Search.prototype.navigate = function (textSearchResult) {
            if (textSearchResult) {
                var start = textSearchResult.start;
                var end = textSearchResult.end;
                if (!ej2_base_1.isNullOrUndefined(this.owner) && !ej2_base_1.isNullOrUndefined(this.owner.selection) && !ej2_base_1.isNullOrUndefined(start) &&
                    !ej2_base_1.isNullOrUndefined(end) && !ej2_base_1.isNullOrUndefined(start.paragraph) && !ej2_base_1.isNullOrUndefined(end.paragraph)) {
                    this.owner.selection.selectRange(start, end);
                    this.documentHelper.updateFocus();
                }
            }
        };
        Search.prototype.highlight = function (textSearchResults) {
            this.searchHighlighters = new dictionary_1.Dictionary();
            for (var i = 0; i < textSearchResults.innerList.length; i++) {
                var result = textSearchResults.innerList[parseInt(i.toString(), 10)];
                this.highlightResult(result);
            }
            this.viewer.renderVisiblePages();
        };
        Search.prototype.highlightResult = function (result) {
            this.highlightSearchResult(result.start.paragraph, result.start, result.end);
        };
        Search.prototype.highlightSearchResult = function (paragraph, start, end) {
            var selectionStartIndex = 0;
            var selectionEndIndex = 0;
            var startElement = null;
            var endElement = null;
            var lineWidget = this.documentHelper.selection.getStartLineWidget(paragraph, start, startElement, selectionStartIndex);
            selectionStartIndex = lineWidget.index;
            startElement = lineWidget.element;
            var startLineWidget = startElement ? startElement.line : paragraph.childWidgets[0];
            var endLine = this.documentHelper.selection.getEndLineWidget(end, endElement, selectionEndIndex);
            selectionEndIndex = endLine.index;
            endElement = endLine.element;
            var endLineWidget = endElement ? endElement.line :
                end.paragraph.childWidgets[end.paragraph.childWidgets.length - 1];
            var top = this.documentHelper.selection.getTop(startLineWidget);
            var left = this.documentHelper.selection.getLeftInternal(startLineWidget, startElement, selectionStartIndex);
            if (!ej2_base_1.isNullOrUndefined(startLineWidget) && startLineWidget === endLineWidget) {
                var right = this.documentHelper.selection.getLeftInternal(endLineWidget, endElement, selectionEndIndex);
                var isRtlText = false;
                if (endElement instanceof page_1.TextElementBox) {
                    isRtlText = endElement.isRightToLeft;
                }
                var width = 0;
                width = Math.abs(right - left);
                if (!isRtlText && startElement instanceof page_1.TextElementBox) {
                    isRtlText = startElement.isRightToLeft;
                }
                if (isRtlText || paragraph.bidi) {
                    var elementBox = this.documentHelper.selection.getElementsForward(startLineWidget, startElement, endElement, paragraph.bidi);
                    if (elementBox && elementBox.length > 1) {
                        for (var i = 0; i < elementBox.length; i++) {
                            var element = elementBox[i];
                            var elementIsRTL = false;
                            var index = element instanceof page_1.TextElementBox ? element.length : 1;
                            if (element === startElement) {
                                left = this.documentHelper.selection.getLeftInternal(startLineWidget, element, selectionStartIndex);
                                right = this.documentHelper.selection.getLeftInternal(startLineWidget, element, index);
                            }
                            else if (element === endElement) {
                                left = this.documentHelper.selection.getLeftInternal(startLineWidget, element, 0);
                                right = this.documentHelper.selection.getLeftInternal(startLineWidget, element, selectionEndIndex);
                            }
                            else {
                                left = this.documentHelper.selection.getLeftInternal(startLineWidget, element, 0);
                                right = this.documentHelper.selection.getLeftInternal(startLineWidget, element, index);
                            }
                            if (element instanceof page_1.TextElementBox) {
                                elementIsRTL = element.isRightToLeft;
                            }
                            width = Math.abs(right - left);
                            this.createHighlightBorder(startLineWidget, width, elementIsRTL ? right : left, top);
                        }
                    }
                    else {
                        this.createHighlightBorder(startLineWidget, width, isRtlText ? right : left, top);
                    }
                }
                else {
                    this.createHighlightBorder(startLineWidget, width, left, top);
                }
            }
            else {
                if (!ej2_base_1.isNullOrUndefined(startLineWidget)) {
                    if (paragraph !== startLineWidget.paragraph) {
                        paragraph = startLineWidget.paragraph;
                    }
                    var width = this.documentHelper.selection.getWidth(startLineWidget, true) - (left - startLineWidget.paragraph.x);
                    if (paragraph.bidi || (startElement instanceof page_1.TextElementBox && startElement.isRightToLeft)) {
                        var right = 0;
                        var elementCollection = this.documentHelper.selection.getElementsForward(startLineWidget, startElement, endElement, paragraph.bidi);
                        if (elementCollection) {
                            var elementIsRTL = false;
                            for (var i = 0; i < elementCollection.length; i++) {
                                var element = elementCollection[i];
                                var index = element instanceof page_1.TextElementBox ? element.length : 1;
                                right = this.documentHelper.selection.getLeftInternal(startLineWidget, element, index);
                                elementIsRTL = false;
                                if (element === startElement) {
                                    left = this.documentHelper.selection.getLeftInternal(startLineWidget, element, selectionStartIndex);
                                }
                                else {
                                    left = this.documentHelper.selection.getLeftInternal(startLineWidget, element, 0);
                                }
                                if (element instanceof page_1.TextElementBox) {
                                    elementIsRTL = element.isRightToLeft;
                                }
                                width = Math.abs(right - left);
                                this.createHighlightBorder(startLineWidget, width, elementIsRTL ? right : left, top);
                            }
                        }
                    }
                    else {
                        this.createHighlightBorder(startLineWidget, width, left, top);
                    }
                    var lineIndex = startLineWidget.paragraph.childWidgets.indexOf(startLineWidget);
                    for (var i = 0; i < paragraph.childWidgets.length; i++) {
                        if (paragraph === startLineWidget.paragraph) {
                            lineIndex += 1;
                        }
                        this.highlightSearchResultParaWidget(paragraph, lineIndex, endLineWidget, endElement, selectionEndIndex);
                        if (paragraph === endLineWidget.paragraph) {
                            return;
                        }
                        else {
                            lineIndex = 0;
                        }
                    }
                }
            }
        };
        Search.prototype.createHighlightBorder = function (lineWidget, width, left, top) {
            var findHighLight = this.addSearchHighlightBorder(lineWidget);
            var page = this.viewer.owner.selection.getPage(lineWidget.paragraph);
            var pageTop = page.boundingRectangle.y;
            var pageLeft = page.boundingRectangle.x;
            findHighLight.left = Math.ceil(left);
            top = Math.ceil(top);
            findHighLight.width = Math.floor(width);
            var height = Math.floor(lineWidget.height);
            var context = this.documentHelper.containerContext;
        };
        Search.prototype.addSearchHighlightBorder = function (lineWidget) {
            var highlighters = undefined;
            var collection = this.searchHighlighters;
            if (collection.containsKey(lineWidget)) {
                highlighters = collection.get(lineWidget);
            }
            else {
                highlighters = [];
                collection.add(lineWidget, highlighters);
            }
            var searchHighlight = new text_search_1.SearchWidgetInfo(0, 0);
            highlighters.push(searchHighlight);
            return searchHighlight;
        };
        Search.prototype.highlightSearchResultParaWidget = function (widget, startIndex, endLine, endElement, endIndex) {
            var top = 0;
            var width = 0;
            var isRtlText = false;
            for (var j = startIndex; j < widget.childWidgets.length; j++) {
                var lineWidget = widget.childWidgets[j];
                if (j === startIndex) {
                    top = this.documentHelper.selection.getTop(lineWidget);
                }
                var left = this.documentHelper.selection.getLeft(lineWidget);
                if (endElement instanceof page_1.TextElementBox) {
                    isRtlText = endElement.isRightToLeft;
                }
                if (lineWidget === endLine) {
                    var right = 0;
                    if (isRtlText || widget.bidi) {
                        var elementBox = this.documentHelper.selection.getElementsBackward(lineWidget, endElement, endElement, widget.bidi);
                        for (var i = 0; i < elementBox.length; i++) {
                            var element = elementBox[i];
                            var elementIsRTL = false;
                            left = this.documentHelper.selection.getLeftInternal(lineWidget, element, 0);
                            if (element === endElement) {
                                right = this.documentHelper.selection.getLeftInternal(lineWidget, element, endIndex);
                            }
                            else {
                                var index = element instanceof page_1.TextElementBox ? element.length : 1;
                                right = this.documentHelper.selection.getLeftInternal(lineWidget, element, index);
                            }
                            if (element instanceof page_1.TextElementBox) {
                                elementIsRTL = element.isRightToLeft;
                            }
                            width = Math.abs(right - left);
                            this.createHighlightBorder(lineWidget, width, elementIsRTL ? right : left, top);
                        }
                        return;
                    }
                    else {
                        right = this.documentHelper.selection.getLeftInternal(endLine, endElement, endIndex);
                        width = Math.abs(right - left);
                        this.createHighlightBorder(lineWidget, width, isRtlText ? right : left, top);
                        return;
                    }
                }
                else {
                    width = this.documentHelper.selection.getWidth(lineWidget, true) - (left - widget.x);
                    this.createHighlightBorder(lineWidget, width, left, top);
                    top += lineWidget.height;
                }
            }
        };
        Search.prototype.addSearchResultItems = function (result) {
            if (ej2_base_1.isNullOrUndefined(result) || result === '') {
                return;
            }
            if (ej2_base_1.isNullOrUndefined(this.owner.findResultsList)) {
                this.owner.findResultsList = [];
            }
            this.owner.findResultsList.push(result);
        };
        Search.prototype.addFindResultView = function (textSearchResults) {
            for (var i = 0; i < textSearchResults.innerList.length; i++) {
                var result = textSearchResults.innerList[i];
                this.addFindResultViewForSearch(result);
            }
        };
        Search.prototype.addFindResultViewForSearch = function (result) {
            if (result.start != null && result.end != null && result.start.paragraph != null && result.end.paragraph != null) {
                var prefixText = void 0;
                var suffixtext = void 0;
                var currentText = void 0;
                var startIndex = 0;
                var inlineObj = result.start.currentWidget.getInline(result.start.offset, startIndex);
                var inline = inlineObj.element;
                startIndex = inlineObj.index;
                var prefix = '';
                var lastIndex = 0;
                if (inline instanceof page_1.FieldElementBox) {
                    var elementInfo = this.owner.selection.getRenderedInline(inline, startIndex);
                    if (elementInfo.element.nextNode instanceof page_1.TextElementBox) {
                        inline = elementInfo.element.nextNode;
                        startIndex = elementInfo.index;
                    }
                    else {
                        inline = elementInfo.element;
                        startIndex = elementInfo.index;
                    }
                }
                var boxObj = this.owner.selection.getElementBoxInternal(inline, startIndex);
                var box = boxObj.element;
                startIndex = boxObj.index;
                if (box != null) {
                    if (box instanceof page_1.TextElementBox && startIndex > 0) {
                        prefix = box.text.substring(0, startIndex);
                    }
                    var boxIndex = box.line.children.indexOf(box);
                    lastIndex = prefix.lastIndexOf(' ');
                    while (lastIndex < 0 && boxIndex > 0 && box.line.children[boxIndex - 1] instanceof page_1.TextElementBox) {
                        prefix = box.line.children[boxIndex - 1].text + prefix;
                        boxIndex--;
                        lastIndex = prefix.lastIndexOf(' ');
                    }
                }
                var shiftIndex = prefix.lastIndexOf('\v');
                if (shiftIndex > 0) {
                    prefix = prefix.substring(0, shiftIndex);
                }
                else {
                    lastIndex = prefix.lastIndexOf(' ');
                    prefixText = lastIndex < 0 ? prefix : prefix.substring(lastIndex + 1);
                }
                currentText = result.text;
                var endIndex = 0;
                var endInlineObj = result.end.currentWidget.getInline(result.end.offset, endIndex);
                var endInline = endInlineObj.element;
                endIndex = endInlineObj.index;
                suffixtext = '';
                if (boxObj != null) {
                    boxObj = this.owner.selection.getElementBoxInternal(endInline, endIndex);
                    box = boxObj.element;
                    endIndex = boxObj.index;
                }
                if (box != null) {
                    if (box instanceof page_1.TextElementBox && endIndex < box.length) {
                        suffixtext = box.text.substring(endIndex);
                    }
                    var boxIndex = box.line.children.indexOf(box);
                    while (boxIndex + 1 < box.line.children.length && (box.line.children[boxIndex + 1] instanceof page_1.TextElementBox) || (box.line.children[boxIndex + 1] instanceof page_1.FieldElementBox)) {
                        if (box.line.children[boxIndex + 1] instanceof page_1.FieldElementBox) {
                            boxIndex = boxIndex + 2;
                        }
                        else {
                            suffixtext = suffixtext + box.line.children[boxIndex + 1].text;
                            boxIndex = boxIndex + 1;
                        }
                    }
                }
                lastIndex = suffixtext.lastIndexOf(' ');
                suffixtext = suffixtext === '\v' ? suffixtext = '' : suffixtext;
                var headerFooterString = '';
                var listElement = '';
                var containerWidget = result.start.paragraph.containerWidget;
                var type = containerWidget instanceof page_1.HeaderFooterWidget ? containerWidget.headerFooterType : '';
                if (type.indexOf('Header') != -1) {
                    headerFooterString = '<span class="e-de-header-footer-list">' + 'Header' + ': ' + '</span>';
                }
                else if (type.indexOf('Footer') != -1) {
                    listElement = '<li tabindex=0 class="e-de-search-result-item e-de-op-search-txt">' + headerFooterString + prefix + '<span class="e-de-op-search-word" style="pointer-events:none">' + result.text + '</span>' + suffixtext + '</li>';
                    headerFooterString = '<span class="e-de-header-footer-list">' + 'Footer' + ': ' + '</span>';
                }
                listElement = '<li tabindex=0 class="e-de-search-result-item e-de-op-search-txt">' + headerFooterString + prefix + '<span class="e-de-op-search-word" style="pointer-events:none">' + result.text + '</span>' + suffixtext + '</li>';
                this.addSearchResultItems(listElement);
            }
        };
        Search.prototype.clearSearchHighlight = function () {
            if (!ej2_base_1.isNullOrUndefined(this.searchHighlighters)) {
                this.searchHighlighters.clear();
                this.searchHighlighters = undefined;
            }
            var eventArgs = { source: this.viewer.owner };
            this.viewer.owner.trigger(index_1.searchResultsChangeEvent, eventArgs);
        };
        Search.prototype.destroy = function () {
            if (this.textSearchResults) {
                this.textSearchResults.destroy();
            }
            this.textSearchResults = undefined;
            this.owner = undefined;
        };
        return Search;
    }());
    exports.Search = Search;
});
