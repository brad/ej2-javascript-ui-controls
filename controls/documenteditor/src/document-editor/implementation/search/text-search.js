define(["require", "exports", "../../base/dictionary", "@syncfusion/ej2-base", "../selection/selection-helper", "../viewer/page", "../../base/index"], function (require, exports, dictionary_1, ej2_base_1, selection_helper_1, page_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextSearch = (function () {
        function TextSearch(owner) {
            this.wordBefore = '\\b';
            this.wordAfter = '\\b';
            this.owner = owner;
            this.documentHelper = this.owner.documentHelper;
        }
        TextSearch.prototype.find = function (pattern, findOption) {
            return this.findNext(pattern, findOption, '0;0;0');
        };
        TextSearch.prototype.findNext = function (pattern, findOption, hierarchicalPosition) {
            if (typeof pattern === 'string') {
                pattern = this.stringToRegex(pattern, findOption);
            }
            if (hierarchicalPosition === undefined) {
                hierarchicalPosition = '0;0;0';
            }
            this.owner.searchModule.textSearchResults.clearResults();
            var results = this.owner.searchModule.textSearchResults;
            this.findDocument(results, pattern, true, findOption, hierarchicalPosition);
            return results.length > 0, results.currentSearchResult;
        };
        TextSearch.prototype.stringToRegex = function (textToFind, option) {
            if (textToFind.indexOf('\\') > -1) {
                textToFind = textToFind.split('\\').join('\\\\');
            }
            if (textToFind.indexOf('(') > -1 || textToFind.indexOf(')') > -1 || textToFind.indexOf('.') > -1 || textToFind.indexOf('[') > -1
                || textToFind.indexOf(']') > -1 || textToFind.indexOf('$') > -1 || textToFind.indexOf('{') > -1
                || textToFind.indexOf('}') > -1 || textToFind.indexOf('*') > -1 || textToFind.indexOf('|') > -1
                || textToFind.indexOf('^') > -1 || textToFind.indexOf('?') > -1) {
                var text = '';
                for (var i = 0; i < textToFind.length; i++) {
                    if (textToFind[parseInt(i.toString(), 10)] === '(' || textToFind[parseInt(i.toString(), 10)] === ')' || textToFind[parseInt(i.toString(), 10)] === '.' || textToFind[parseInt(i.toString(), 10)] === '['
                        || textToFind[parseInt(i.toString(), 10)] === ']' || textToFind[parseInt(i.toString(), 10)] === '$' || textToFind[parseInt(i.toString(), 10)] === '{' || textToFind[parseInt(i.toString(), 10)] === '}'
                        || textToFind[parseInt(i.toString(), 10)] === '*' || textToFind[parseInt(i.toString(), 10)] === '|' || textToFind[parseInt(i.toString(), 10)] === '^' || textToFind[parseInt(i.toString(), 10)] === '?') {
                        text += '\\' + textToFind[parseInt(i.toString(), 10)];
                    }
                    else {
                        text += textToFind[parseInt(i.toString(), 10)];
                    }
                }
                textToFind = text;
            }
            if (option === 'WholeWord' || option === 'CaseSensitiveWholeWord') {
                textToFind = this.wordBefore + textToFind + this.wordAfter;
            }
            return RegExp(textToFind, (option === 'CaseSensitive' || option === 'CaseSensitiveWholeWord') ? 'g' : 'ig');
        };
        TextSearch.prototype.isPatternEmpty = function (pattern) {
            var wordEmpty = this.wordBefore + this.wordAfter;
            var patternRegExp = pattern.toString();
            return (patternRegExp.length === 0 || patternRegExp === wordEmpty);
        };
        TextSearch.prototype.findAll = function (pattern, findOption, hierarchicalPosition) {
            if (typeof pattern === 'string') {
                pattern = this.stringToRegex(pattern, findOption);
            }
            if (hierarchicalPosition === undefined) {
                hierarchicalPosition = '0;0;0';
            }
            this.owner.searchModule.textSearchResults.clearResults();
            var results = this.owner.searchModule.textSearchResults;
            this.findDocument(results, pattern, false, findOption, hierarchicalPosition);
            if (results.length > 0 && results.currentIndex < 0) {
                results.currentIndex = 0;
            }
            if (!ej2_base_1.isNullOrUndefined(results.currentSearchResult)) {
                var eventArgs = { source: this.documentHelper.owner };
                this.documentHelper.owner.trigger(index_1.searchResultsChangeEvent, eventArgs);
                return results;
            }
            return undefined;
        };
        TextSearch.prototype.getElementInfo = function (inlineElement, indexInInline, includeNextLine, pattern, findOption, isFirstMatch, results, selectionEnd, isSpellCheck) {
            var inlines = inlineElement;
            var stringBuilder = '';
            var spans = new dictionary_1.Dictionary();
            var previousElementCount = 0;
            do {
                if (inlineElement instanceof page_1.TextElementBox && (!ej2_base_1.isNullOrUndefined(inlineElement.text) && inlineElement.text !== '')) {
                    spans.add(inlineElement, isSpellCheck ? stringBuilder.length + previousElementCount : stringBuilder.length);
                    previousElementCount = 0;
                    if (inlineElement === inlines) {
                        stringBuilder = stringBuilder + (inlineElement.text.substring(indexInInline));
                    }
                    else {
                        stringBuilder = stringBuilder + (inlineElement.text);
                    }
                }
                else if (inlineElement instanceof page_1.FieldElementBox) {
                    var fieldBegin = inlineElement;
                    if (!ej2_base_1.isNullOrUndefined(fieldBegin.fieldEnd)) {
                        inlineElement = ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator) ? fieldBegin.fieldEnd : fieldBegin.fieldSeparator;
                    }
                }
                else if (inlineElement instanceof page_1.ShapeElementBox && !ej2_base_1.isNullOrUndefined(inlineElement.textFrame) && inlineElement.textFrame.childWidgets.length > 0) {
                    this.findInlineText(inlineElement.textFrame, pattern, findOption, isFirstMatch, results, selectionEnd);
                }
                if (!(inlineElement instanceof page_1.TextElementBox)) {
                    previousElementCount += inlineElement.length;
                }
                if (!ej2_base_1.isNullOrUndefined(inlineElement) && ej2_base_1.isNullOrUndefined(inlineElement.nextNode)) {
                    break;
                }
                if (!ej2_base_1.isNullOrUndefined(inlineElement)) {
                    if ((!ej2_base_1.isNullOrUndefined(includeNextLine) && !includeNextLine)) {
                        var elementBoxes = inlineElement.line.children;
                        var length_1 = inlineElement.line.children.length;
                        if (elementBoxes.indexOf(inlineElement) < length_1 - 1) {
                            inlineElement = inlineElement.nextNode;
                        }
                        else {
                            inlineElement = undefined;
                            break;
                        }
                    }
                    else {
                        inlineElement = inlineElement.nextNode;
                    }
                }
            } while (true);
            var text = stringBuilder.toString();
            return { elementsWithOffset: spans, fullText: text };
        };
        TextSearch.prototype.updateMatchedTextLocation = function (matches, results, textInfo, indexInInline, inlines, isFirstMatch, selectionEnd, startPosition) {
            for (var i = 0; i < matches.length; i++) {
                var match = matches[parseInt(i.toString(), 10)];
                var isMatched = void 0;
                if (!(ej2_base_1.isNullOrUndefined(startPosition)) && match.index < startPosition) {
                    continue;
                }
                var result = results.addResult();
                var spanKeys = textInfo.keys;
                for (var j = 0; j < spanKeys.length; j++) {
                    var span = spanKeys[parseInt(j.toString(), 10)];
                    var startIndex = textInfo.get(span);
                    var spanLength = span.length;
                    if (span === inlines) {
                        spanLength -= indexInInline;
                    }
                    if (ej2_base_1.isNullOrUndefined(result.start) && match.index < startIndex + spanLength) {
                        var index = match.index - startIndex;
                        if (span === inlines) {
                            index += indexInInline;
                        }
                        var offset = (span.line).getOffset(span, index);
                        result.start = this.getTextPosition(span.line, offset.toString());
                        result.start.location = this.owner.selection.getPhysicalPositionInternal(span.line, offset, true);
                        result.start.setPositionParagraph(span.line, offset);
                    }
                    if (match.index + match[0].length <= startIndex + spanLength) {
                        var index = (match.index + match[0].length) - startIndex;
                        if (span === inlines) {
                            index += indexInInline;
                        }
                        var offset = (span.line).getOffset(span, index);
                        result.end = this.getTextPosition(span.line, offset.toString());
                        result.end.location = this.owner.selection.getPhysicalPositionInternal(span.line, offset, true);
                        result.end.setPositionParagraph(span.line, offset);
                        isMatched = true;
                        break;
                    }
                }
                if (isFirstMatch) {
                    results.currentIndex = 0;
                    break;
                }
                else if (results.currentIndex < 0 && !ej2_base_1.isNullOrUndefined(selectionEnd) && (selectionEnd.isExistBefore(result.start) ||
                    selectionEnd.isAtSamePosition(result.start))) {
                    results.currentIndex = results.indexOf(result);
                }
                if (!ej2_base_1.isNullOrUndefined(startPosition) && isMatched) {
                    break;
                }
            }
        };
        TextSearch.prototype.findDocument = function (results, pattern, isFirstMatch, findOption, hierachicalPosition) {
            if (this.isPatternEmpty(pattern)) {
                return;
            }
            if (findOption === undefined) {
                findOption = 'None';
            }
            var inline = undefined;
            var selectionEnd = undefined;
            if (hierachicalPosition !== undefined) {
                selectionEnd = this.owner.selection.end;
            }
            if (hierachicalPosition !== undefined && isFirstMatch && selectionEnd !== undefined && selectionEnd.paragraph !== undefined) {
                if (selectionEnd.paragraph instanceof page_1.ParagraphWidget) {
                    var indexInInline = 0;
                    var inlineElement = selectionEnd.currentWidget.getInline(this.owner.selection.start.offset, indexInInline);
                    inline = inlineElement.element;
                    indexInInline = inlineElement.index;
                    if (!ej2_base_1.isNullOrUndefined(inline)) {
                        var nextParagraphWidget = undefined;
                        nextParagraphWidget = this.findInline(inline, pattern, findOption, indexInInline, isFirstMatch, results, selectionEnd);
                        while (results.length === 0 && !ej2_base_1.isNullOrUndefined(nextParagraphWidget)) {
                            while (!ej2_base_1.isNullOrUndefined(nextParagraphWidget) && nextParagraphWidget.childWidgets.length === 0) {
                                nextParagraphWidget = this.owner.selection.getNextParagraph(nextParagraphWidget.containerWidget);
                            }
                            if (ej2_base_1.isNullOrUndefined(nextParagraphWidget)) {
                                break;
                            }
                            var lineWidget = nextParagraphWidget.childWidgets[0];
                            if (lineWidget.children[0] instanceof page_1.ListTextElementBox) {
                                inline = (lineWidget.children[2] instanceof page_1.TextElementBox) ? lineWidget.children[2] : undefined;
                            }
                            else {
                                inline = lineWidget.children[0];
                            }
                            if (ej2_base_1.isNullOrUndefined(inline)) {
                                break;
                            }
                            nextParagraphWidget = this.findInline(inline, pattern, findOption, 0, isFirstMatch, results, selectionEnd);
                        }
                        if (results.length > 0) {
                            return;
                        }
                    }
                }
            }
            var section;
            section = this.documentHelper.pages[0].bodyWidgets[0];
            while (!ej2_base_1.isNullOrUndefined(section) && section.childWidgets.length === 0) {
                section = section.nextWidget;
            }
            if (ej2_base_1.isNullOrUndefined(section) || section.childWidgets.length === 0) {
                return;
            }
            this.findInlineText(section, pattern, findOption, isFirstMatch, results, selectionEnd);
            var headerFootersColletion = this.documentHelper.headersFooters;
            for (var i = 0; i < headerFootersColletion.length; i++) {
                var headerFooters = headerFootersColletion[parseInt(i.toString(), 10)];
                if (headerFooters) {
                    for (var index in headerFooters) {
                        var headerFooter = headerFooters[parseInt(index.toString(), 10)];
                        if (!ej2_base_1.isNullOrUndefined(headerFooter) && !ej2_base_1.isNullOrUndefined(headerFooter.page)) {
                            this.findInlineText(headerFooter, pattern, findOption, isFirstMatch, results, selectionEnd);
                        }
                    }
                }
            }
            var endNoteCollection = this.documentHelper.endnoteCollection;
            for (var i = 0; i < endNoteCollection.length; i++) {
                var endNote = endNoteCollection[parseInt(i.toString(), 10)];
                if (endNote) {
                    if (!ej2_base_1.isNullOrUndefined(endNote) && !ej2_base_1.isNullOrUndefined(endNote.bodyWidget.page)) {
                        this.findInlineText(endNote.bodyWidget, pattern, findOption, isFirstMatch, results, selectionEnd);
                    }
                }
            }
            var footNoteCollection = this.documentHelper.footnoteCollection;
            for (var i = 0; i < footNoteCollection.length; i++) {
                var footNote = footNoteCollection[parseInt(i.toString(), 10)];
                if (footNote) {
                    if (!ej2_base_1.isNullOrUndefined(footNote) && !ej2_base_1.isNullOrUndefined(footNote.bodyWidget.page)) {
                        this.findInlineText(footNote.bodyWidget, pattern, findOption, isFirstMatch, results, selectionEnd);
                    }
                }
            }
            if (isFirstMatch && !ej2_base_1.isNullOrUndefined(results) && results.length > 0) {
                return;
            }
        };
        TextSearch.prototype.findInlineText = function (section, pattern, findOption, isFirstMatch, results, selectionEnd) {
            var paragraphWidget = this.owner.documentHelper.getFirstParagraphBlock(section.childWidgets[0]);
            while (!ej2_base_1.isNullOrUndefined(paragraphWidget) && paragraphWidget.childWidgets.length === 1 && paragraphWidget.childWidgets[0].children.length === 0) {
                paragraphWidget = this.owner.selection.getNextParagraphBlock(paragraphWidget);
            }
            while (!ej2_base_1.isNullOrUndefined(paragraphWidget) && paragraphWidget.childWidgets.length > 0) {
                var inlineElement = paragraphWidget.childWidgets[0];
                var inlineEle = inlineElement.children[0];
                if (ej2_base_1.isNullOrUndefined(inlineEle)) {
                    break;
                }
                this.findInline(inlineEle, pattern, findOption, 0, isFirstMatch, results, selectionEnd);
                paragraphWidget = this.owner.selection.getNextParagraphBlock(paragraphWidget);
                while (!ej2_base_1.isNullOrUndefined(paragraphWidget) && (paragraphWidget.childWidgets.length === 1) && paragraphWidget.childWidgets[0].children.length === 0) {
                    paragraphWidget = this.owner.selection.getNextParagraphBlock(paragraphWidget);
                }
            }
            if (isFirstMatch && !ej2_base_1.isNullOrUndefined(results) && results.length > 0) {
                return;
            }
        };
        TextSearch.prototype.findInline = function (inlineElement, pattern, option, indexInInline, isFirstMatch, results, selectionEnd) {
            var inlines = inlineElement;
            var textInfo = this.getElementInfo(inlineElement, indexInInline, undefined, pattern, option, isFirstMatch, results, selectionEnd);
            var text = textInfo.fullText;
            var matches = [];
            var spans = textInfo.elementsWithOffset;
            var matchObject;
            while (!ej2_base_1.isNullOrUndefined(matchObject = pattern.exec(text))) {
                matches.push(matchObject);
            }
            this.updateMatchedTextLocation(matches, results, spans, indexInInline, inlines, isFirstMatch, selectionEnd);
            if (isFirstMatch) {
                return undefined;
            }
            var paragraphWidget = this.owner.selection.getNextParagraphBlock(inlineElement.line.paragraph);
            return paragraphWidget;
        };
        TextSearch.prototype.getTextPosition = function (lineWidget, hierarchicalIndex) {
            var textPosition = new selection_helper_1.TextPosition(this.owner);
            var index = textPosition.getHierarchicalIndex(lineWidget, hierarchicalIndex);
            textPosition.setPositionForCurrentIndex(index);
            return textPosition;
        };
        return TextSearch;
    }());
    exports.TextSearch = TextSearch;
    var SearchWidgetInfo = (function () {
        function SearchWidgetInfo(left, width) {
            this.leftInternal = 0;
            this.widthInternal = 0;
            this.leftInternal = left;
            this.widthInternal = width;
        }
        Object.defineProperty(SearchWidgetInfo.prototype, "left", {
            get: function () {
                return this.leftInternal;
            },
            set: function (value) {
                this.leftInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchWidgetInfo.prototype, "width", {
            get: function () {
                return this.widthInternal;
            },
            set: function (value) {
                this.widthInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        return SearchWidgetInfo;
    }());
    exports.SearchWidgetInfo = SearchWidgetInfo;
});
