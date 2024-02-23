define(["require", "exports", "../index", "./../../index", "../../base/dictionary", "../viewer/page", "@syncfusion/ej2-base"], function (require, exports, index_1, index_2, dictionary_1, page_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpellChecker = (function () {
        function SpellChecker(documentHelper) {
            this.langIDInternal = 0;
            this.enableSpellCheckInternal = true;
            this.uniqueSpelledWords = {};
            this.spellSuggestionInternal = true;
            this.uniqueKey = '';
            this.removeUnderlineInternal = false;
            this.uniqueWordsCountInternal = 15000;
            this.performOptimizedCheck = true;
            this.documentHelper = documentHelper;
            this.errorWordCollection = new dictionary_1.Dictionary();
            this.uniqueWordsCollection = new dictionary_1.Dictionary();
            this.errorSuggestions = new dictionary_1.Dictionary();
            this.ignoreAllItems = [];
            this.uniqueSpelledWords = {};
            this.textSearchResults = new index_1.TextSearchResults(this.documentHelper.owner);
            this.uniqueKey = this.documentHelper.owner.element.id + '_' + this.createGuid();
        }
        SpellChecker.prototype.getModuleName = function () {
            return 'SpellChecker';
        };
        Object.defineProperty(SpellChecker.prototype, "enableOptimizedSpellCheck", {
            get: function () {
                return this.performOptimizedCheck;
            },
            set: function (value) {
                this.performOptimizedCheck = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpellChecker.prototype, "uniqueWordsCount", {
            get: function () {
                return ej2_base_1.isNullOrUndefined(this.uniqueWordsCountInternal) ? 0 : this.uniqueWordsCountInternal;
            },
            set: function (value) {
                this.uniqueWordsCountInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpellChecker.prototype, "languageID", {
            get: function () {
                return ej2_base_1.isNullOrUndefined(this.langIDInternal) ? 0 : this.langIDInternal;
            },
            set: function (value) {
                this.langIDInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpellChecker.prototype, "allowSpellCheckAndSuggestion", {
            get: function () {
                return this.spellSuggestionInternal;
            },
            set: function (value) {
                this.spellSuggestionInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpellChecker.prototype, "removeUnderline", {
            get: function () {
                return this.removeUnderlineInternal;
            },
            set: function (value) {
                this.removeUnderlineInternal = value;
                this.documentHelper.owner.editor.reLayout(this.documentHelper.selection);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpellChecker.prototype, "enableSpellCheck", {
            get: function () {
                return this.enableSpellCheckInternal;
            },
            set: function (value) {
                this.enableSpellCheckInternal = value;
                this.documentHelper.owner.editor.reLayout(this.documentHelper.selection);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpellChecker.prototype, "viewer", {
            get: function () {
                return this.documentHelper.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        SpellChecker.prototype.manageReplace = function (content, dialogElement) {
            this.documentHelper.triggerSpellCheck = true;
            var exactText = '';
            var elementInfo;
            if (!ej2_base_1.isNullOrUndefined(dialogElement) && dialogElement instanceof page_1.ErrorTextElementBox) {
                var exactText_1 = dialogElement.text;
                this.documentHelper.selection.start = dialogElement.start.clone();
                this.documentHelper.selection.end = dialogElement.end.clone();
                if (content !== 'Ignore Once') {
                    content = this.manageSpecialCharacters(exactText_1, content);
                    this.documentHelper.owner.editor.insertTextInternal(content, true);
                    this.documentHelper.selection.start.setPositionInternal(this.documentHelper.selection.end);
                    this.documentHelper.clearSelectionHighlight();
                    return;
                }
                else {
                    this.currentContextInfo = { 'text': exactText_1, 'element': dialogElement };
                }
            }
            if (!ej2_base_1.isNullOrUndefined(this.currentContextInfo) && this.currentContextInfo.element && content !== 'Ignore Once') {
                var elementBox = this.currentContextInfo.element;
                exactText = this.currentContextInfo.element.text;
                this.documentHelper.selection.start = elementBox.start.clone();
                this.documentHelper.selection.end = elementBox.end.clone();
            }
            else {
                this.handleReplace(content);
            }
            if (content !== 'Ignore Once') {
                this.documentHelper.owner.editor.insertTextInternal(content, true);
                if (!ej2_base_1.isNullOrUndefined(this.currentContextInfo)) {
                    this.removeErrorsFromCollection(this.currentContextInfo);
                }
                this.documentHelper.selection.start.setPositionInternal(this.documentHelper.selection.end);
                this.documentHelper.clearSelectionHighlight();
            }
            this.documentHelper.triggerSpellCheck = false;
        };
        SpellChecker.prototype.handleReplace = function (content) {
            var startPosition = this.documentHelper.selection.start;
            var offset = startPosition.offset;
            var startIndex = 0;
            var startInlineObj = startPosition.currentWidget.getInline(offset, startIndex, false, true);
            var startOffset = startInlineObj.element.line.getOffset(startInlineObj.element, 0) + startInlineObj.element.length;
            if (startOffset === offset) {
                this.retrieveExactElementInfo(startInlineObj);
            }
            var exactText = startInlineObj.element.text;
            var startPattern = new RegExp('^[#\\@\\!\\~\\$\\%\\^\\&\\*\\(\\)\\-\\_\\+\\=\\{\\}\\[\\]\\:\\;\\"\'\\,\\<\\.\\>\\/\\?\\`\\s]+', 'g');
            var matches = [];
            var matchInfo;
            while (!ej2_base_1.isNullOrUndefined(matchInfo = startPattern.exec(exactText))) {
                matches.push(matchInfo);
            }
            if (content === 'Ignore Once') {
                this.handleIgnoreOnce(startInlineObj);
                return;
            }
            startPosition.offset = offset - startInlineObj.index;
            if (!ej2_base_1.isNullOrUndefined(matches) && matches.length > 0) {
                startPosition.offset += matches[0].toString().length;
            }
            startPosition.location = this.documentHelper.owner.selection.getPhysicalPositionInternal(startPosition.currentWidget, startPosition.offset, true);
            startPosition = this.documentHelper.owner.searchModule.textSearch.getTextPosition(startPosition.currentWidget, startPosition.offset.toString());
            startPosition.setPositionParagraph(startPosition.currentWidget, startPosition.offset);
            var index = (startPosition.offset + startInlineObj.element.length) - startPosition.offset;
            var endOffset = startPosition.currentWidget.getOffset(startInlineObj.element, index);
            var lineWidget = startPosition.currentWidget;
            var endPattern = new RegExp('[#\\@\\!\\~\\$\\%\\^\\&\\*\\(\\)\\-\\_\\+\\=\\{\\}\\[\\]\\:\\;\\"\'\\,\\<\\.\\>\\/\\?\\s\\`]+$', 'g');
            matches = [];
            while (!ej2_base_1.isNullOrUndefined(matchInfo = endPattern.exec(exactText))) {
                matches.push(matchInfo);
            }
            if (!ej2_base_1.isNullOrUndefined(matches) && matches.length > 0) {
                endOffset -= matches[0].toString().length;
            }
            this.documentHelper.selection.end = this.documentHelper.owner.searchModule.textSearch.getTextPosition(lineWidget, endOffset.toString());
            this.documentHelper.selection.end.location = this.documentHelper.owner.selection.getPhysicalPositionInternal(startPosition.currentWidget, endOffset, true);
            this.documentHelper.selection.end.setPositionParagraph(lineWidget, endOffset);
            this.currentContextInfo = { 'element': startInlineObj.element, 'text': startInlineObj.element.text };
        };
        SpellChecker.prototype.retrieveExactElementInfo = function (startInlineObj) {
            var nextElement = startInlineObj.element.nextElement;
            if (!ej2_base_1.isNullOrUndefined(nextElement) && nextElement instanceof page_1.TextElementBox) {
                var nextTextElBox = nextElement;
                if (nextTextElBox.text.trim() != "") {
                    startInlineObj.element = nextElement;
                }
            }
        };
        SpellChecker.prototype.handleIgnoreOnce = function (startInlineObj) {
            var textElement = startInlineObj.element;
            var exactText = '';
            if (!ej2_base_1.isNullOrUndefined(this.currentContextInfo) && this.currentContextInfo.element) {
                exactText = this.currentContextInfo.element.text;
            }
            else {
                exactText = textElement.text;
            }
            exactText = this.manageSpecialCharacters(exactText, undefined, true);
            if (textElement.ignoreOnceItems.indexOf(exactText) === -1) {
                textElement.ignoreOnceItems.push(exactText);
            }
            this.documentHelper.owner.editor.reLayout(this.documentHelper.selection);
        };
        SpellChecker.prototype.handleIgnoreAllItems = function (contextElement) {
            var contextItem = (!ej2_base_1.isNullOrUndefined(contextElement)) ? contextElement : this.retriveText();
            var retrievedText = this.manageSpecialCharacters(contextItem.text, undefined, true);
            if (this.ignoreAllItems.indexOf(retrievedText) === -1) {
                this.ignoreAllItems.push(retrievedText);
                this.removeErrorsFromCollection(contextItem);
                this.documentHelper.triggerSpellCheck = true;
                this.documentHelper.owner.editor.reLayout(this.documentHelper.selection);
                this.documentHelper.triggerSpellCheck = false;
                this.documentHelper.clearSelectionHighlight();
            }
        };
        SpellChecker.prototype.handleAddToDictionary = function (contextElement) {
            var _this = this;
            var contextItem = (!ej2_base_1.isNullOrUndefined(contextElement)) ? contextElement : this.retriveText();
            var retrievedText = this.manageSpecialCharacters(contextItem.text, undefined, true);
            this.callSpellChecker(this.languageID, retrievedText, false, false, true).then(function (data) {
                _this.documentHelper.triggerSpellCheck = true;
                _this.removeErrorsFromCollection(contextItem);
                _this.ignoreAllItems.push(retrievedText);
                _this.documentHelper.owner.editor.reLayout(_this.documentHelper.selection, true);
                _this.documentHelper.triggerSpellCheck = false;
            });
        };
        SpellChecker.prototype.manageSpecialCharacters = function (exactText, replaceText, isRemove) {
            if (!ej2_base_1.isNullOrUndefined(exactText)) {
                if (ej2_base_1.isNullOrUndefined(replaceText)) {
                    replaceText = exactText;
                }
                var pattern = new RegExp('^[#\\@\\!\\$\\%\\^\\&\\*\\(\\)\\-\\_\\+\\=\\{\\}\\[\\]\\:\\;\\"\\”\'\\,\\<\\.\\>\\/\\?\\`\\s\\’]+', 'g');
                var matches = [];
                var matchInfo = void 0;
                while (!ej2_base_1.isNullOrUndefined(matchInfo = pattern.exec(exactText))) {
                    matches.push(matchInfo);
                }
                if (matches.length > 0) {
                    for (var i = 0; i < matches.length; i++) {
                        var match = matches[i];
                        replaceText = (!isRemove) ? match[0] + replaceText : replaceText.replace(match[0], '');
                    }
                }
                var endPattern = new RegExp('[#\\@\\!\\$\\%\\^\\&\\*\\(\\)\\-\\_\\+\\=\\{\\}\\[\\]\\:\\;\\"\\”\'\\,\\<\\.\\>\\/\\?\\s\\`\\’]+$', 'g');
                matches = [];
                while (!ej2_base_1.isNullOrUndefined(matchInfo = endPattern.exec(replaceText))) {
                    matches.push(matchInfo);
                }
                if (matches.length > 0) {
                    for (var i = 0; i < matches.length; i++) {
                        var match = matches[i];
                        replaceText = (!isRemove) ? replaceText + match[0] : replaceText.slice(0, match.index);
                    }
                }
            }
            return replaceText;
        };
        SpellChecker.prototype.removeErrorsFromCollection = function (contextItem) {
            if (!ej2_base_1.isNullOrUndefined(contextItem.text) && this.errorWordCollection.containsKey(contextItem.text)) {
                var textElement = this.errorWordCollection.get(contextItem.text);
                if (textElement.indexOf(contextItem.element) >= 0) {
                    textElement.splice(0, 1);
                }
                if (textElement.length === 0) {
                    this.errorWordCollection.remove(contextItem.text);
                }
            }
        };
        SpellChecker.prototype.retriveText = function () {
            var exactText;
            var currentElement;
            if (!ej2_base_1.isNullOrUndefined(this.currentContextInfo) && this.currentContextInfo.element) {
                currentElement = this.currentContextInfo.element;
                exactText = this.currentContextInfo.element.text;
                this.documentHelper.selection.start = currentElement.start.clone();
                this.documentHelper.selection.end = currentElement.end.clone();
            }
            else {
                var startPosition = this.documentHelper.selection.start;
                var offset = startPosition.offset;
                var startIndex = 0;
                var startInlineObj = startPosition.currentWidget.getInline(offset, startIndex);
                currentElement = startInlineObj.element;
                exactText = startInlineObj.element.text;
            }
            return { 'text': exactText, 'element': currentElement };
        };
        SpellChecker.prototype.handleSuggestions = function (allsuggestions) {
            this.spellCheckSuggestion = [];
            if (allsuggestions.length === 0) {
                this.spellCheckSuggestion.push(this.documentHelper.owner.contextMenu.locale.getConstant('Add to Dictionary'));
            }
            else {
                allsuggestions = (allsuggestions.length > 3) ? this.constructInlineMenu(allsuggestions) : allsuggestions;
                this.spellCheckSuggestion.push(this.documentHelper.owner.contextMenu.locale.getConstant('Add to Dictionary'));
            }
            var spellSuggestion = [];
            if (this.spellCheckSuggestion.length > 0) {
                for (var _i = 0, _a = this.spellCheckSuggestion; _i < _a.length; _i++) {
                    var str = _a[_i];
                    spellSuggestion.push({
                        text: str,
                        id: this.documentHelper.owner.element.id + '_contextmenu_otherSuggestions_spellcheck_' + (str === this.documentHelper.owner.contextMenu.locale.getConstant('Add to Dictionary') ? 'Add to Dictionary' : str),
                        iconCss: ''
                    });
                }
            }
            return spellSuggestion;
        };
        SpellChecker.prototype.checktextElementHasErrors = function (text, element, left) {
            var hasError = false;
            var erroElements = [];
            text = text.replace(/[\s]+/g, '');
            if (!ej2_base_1.isNullOrUndefined(element.errorCollection) && element.errorCollection.length > 0) {
                if (!this.documentHelper.isScrollHandler && (element.ischangeDetected || element.paragraph.isChangeDetected)) {
                    this.updateStatusForGlobalErrors(element.errorCollection, element);
                    element.errorCollection = [];
                    element.ischangeDetected = true;
                    return { 'errorFound': hasError, 'elements': erroElements };
                }
                for (var i = 0; i < element.errorCollection.length; i++) {
                    if (this.handleErrorCollection(element.errorCollection[i])) {
                        hasError = true;
                        erroElements.push(element.errorCollection[i]);
                    }
                }
            }
            else if (!this.documentHelper.isScrollHandler && element.paragraph.isChangeDetected) {
                element.ischangeDetected = true;
            }
            else if (!element.ischangeDetected && this.handleErrorCollection(element)) {
                hasError = true;
                erroElements.push(element);
            }
            return { 'errorFound': hasError, 'elements': erroElements };
        };
        SpellChecker.prototype.updateStatusForGlobalErrors = function (erroElements, parentElement) {
            if (erroElements.length > 0) {
                for (var i = 0; i < erroElements.length; i++) {
                    var exactText = this.manageSpecialCharacters(erroElements[i].text, undefined, true);
                    if (this.errorWordCollection.containsKey(exactText)) {
                        var elements = this.errorWordCollection.get(exactText);
                        for (var j = 0; j < elements.length; j++) {
                            if (elements[j] instanceof page_1.ErrorTextElementBox && elements[j] === erroElements[i]) {
                                elements[j].ischangeDetected = true;
                                elements[j].start.offset = parentElement.line.getOffset(parentElement.istextCombined ? this.getCombinedElement(parentElement) : parentElement, 0);
                                elements[j].line = parentElement.line;
                                break;
                            }
                        }
                    }
                }
            }
        };
        SpellChecker.prototype.handleErrorCollection = function (errorInElement) {
            var errors = this.errorWordCollection;
            var exactText = this.manageSpecialCharacters(errorInElement.text, undefined, true);
            if (errors.containsKey(exactText) && errorInElement.length > 1) {
                var ignoreAllIndex = this.ignoreAllItems.indexOf(exactText);
                if (ignoreAllIndex > -1) {
                    if (errors.containsKey(exactText)) {
                        errors.remove(exactText);
                    }
                    return false;
                }
                return true;
            }
            return false;
        };
        SpellChecker.prototype.constructInlineMenu = function (inlineSuggestion) {
            for (var i = inlineSuggestion.length - 1; i > 0; i--) {
                if (inlineSuggestion.length > 3) {
                    this.spellCheckSuggestion.push(inlineSuggestion[i]);
                    inlineSuggestion.pop();
                }
            }
            return inlineSuggestion;
        };
        SpellChecker.prototype.findCurretText = function () {
            var insertPosition = this.documentHelper.selection.start;
            var element;
            var inlineObj = insertPosition.currentWidget.getInline(this.documentHelper.selection.start.offset, 0);
            var text;
            if (!ej2_base_1.isNullOrUndefined(inlineObj.element)) {
                if (!ej2_base_1.isNullOrUndefined(inlineObj.element.errorCollection) && inlineObj.element.errorCollection.length > 0) {
                    for (var i = 0; i < inlineObj.element.errorCollection.length; i++) {
                        var errorElement = inlineObj.element.errorCollection[i];
                        if (errorElement.start.location.x <= insertPosition.location.x && errorElement.end.location.x >= insertPosition.location.x) {
                            text = errorElement.text;
                            element = errorElement;
                            break;
                        }
                    }
                }
                else {
                    text = inlineObj.element.text;
                }
                if (text === ' ') {
                    inlineObj = insertPosition.currentWidget.getInline(this.documentHelper.selection.start.offset + 1, 0);
                    text = inlineObj.element.text;
                }
            }
            return { 'text': text, 'element': element };
        };
        SpellChecker.prototype.addErrorCollection = function (text, elementToCompare, suggestions) {
            text = this.manageSpecialCharacters(text, undefined, true);
            if (this.errorWordCollection.containsKey(text)) {
                var errorElements = this.errorWordCollection.get(text);
                if (elementToCompare instanceof page_1.ErrorTextElementBox) {
                    if (!this.compareErrorTextElement(elementToCompare, errorElements)) {
                        errorElements.push(elementToCompare);
                    }
                }
                else if (elementToCompare instanceof page_1.TextElementBox) {
                    if (!this.compareTextElement(elementToCompare, errorElements)) {
                        errorElements.push(elementToCompare);
                    }
                }
            }
            else {
                if (!ej2_base_1.isNullOrUndefined(suggestions) && suggestions.length > 0) {
                    this.errorSuggestions.add(text, suggestions);
                }
                this.errorWordCollection.add(text, [elementToCompare]);
                if (!this.uniqueWordsCollection.containsKey(text)) {
                    this.uniqueWordsCollection.add(text, true);
                }
            }
        };
        SpellChecker.prototype.addCorrectWordCollection = function (text) {
            text = this.manageSpecialCharacters(text, undefined, true);
            if (!this.uniqueWordsCollection.containsKey(text)) {
                this.uniqueWordsCollection.add(text, false);
            }
        };
        SpellChecker.prototype.isInUniqueWords = function (text) {
            text = text.replace(/[\s]+/g, '');
            return this.uniqueWordsCollection.containsKey(text);
        };
        SpellChecker.prototype.isErrorWord = function (text) {
            text = text.replace(/[\s]+/g, '');
            return this.uniqueWordsCollection.get(text);
        };
        SpellChecker.prototype.isCorrectWord = function (text) {
            text = text.replace(/[\s]+/g, '');
            return !this.uniqueWordsCollection.get(text);
        };
        SpellChecker.prototype.compareErrorTextElement = function (errorElement, errorCollection) {
            var copyElement = [];
            var isChanged = false;
            for (var i = 0; i < errorCollection.length; i++) {
                copyElement.push(errorCollection[i]);
            }
            var length = errorCollection.length;
            for (var i = 0; i < length; i++) {
                if (copyElement[i] instanceof page_1.ErrorTextElementBox) {
                    if (copyElement[i].ischangeDetected) {
                        var exactText = this.manageSpecialCharacters(copyElement[i].text, undefined, true);
                        isChanged = true;
                        this.removeErrorsFromCollection({ 'element': copyElement[i], 'text': exactText });
                    }
                    else {
                        var currentElement = copyElement[i];
                        if (errorElement.start.offset === currentElement.start.offset && errorElement.end.offset === currentElement.end.offset) {
                            return true;
                        }
                    }
                }
            }
            if (isChanged) {
                this.errorWordCollection.add(this.manageSpecialCharacters(errorElement.text, undefined, true), [errorElement]);
            }
            return false;
        };
        SpellChecker.prototype.compareTextElement = function (errorElement, errorCollection) {
            for (var i = 0; i < errorCollection.length; i++) {
                if (errorCollection[i] instanceof page_1.TextElementBox) {
                    var currentElement = errorCollection[i];
                    if (currentElement === errorElement) {
                        return true;
                    }
                }
            }
            return false;
        };
        SpellChecker.prototype.handleWordByWordSpellCheck = function (jsonObject, elementBox, left, top, underlineY, baselineAlignment, isSamePage) {
            if (jsonObject.HasSpellingError && isSamePage) {
                this.addErrorCollection(elementBox.text, elementBox, jsonObject.Suggestions);
                var backgroundColor = (elementBox.line.paragraph.containerWidget instanceof page_1.TableCellWidget) ? elementBox.line.paragraph.containerWidget.cellFormat.shading.backgroundColor : this.documentHelper.backgroundColor;
                this.documentHelper.render.renderWavyLine(elementBox, left, top, underlineY, '#FF0000', 'Single', baselineAlignment, backgroundColor);
                elementBox.isSpellChecked = true;
            }
            else {
                this.addCorrectWordCollection(elementBox.text);
                elementBox.isSpellChecked = true;
            }
        };
        SpellChecker.prototype.checkElementCanBeCombined = function (elementBox, underlineY, beforeIndex, callSpellChecker, textToCombine, isNext, isPrevious, canCombine) {
            var currentText = ej2_base_1.isNullOrUndefined(textToCombine) ? '' : textToCombine;
            var isCombined = ej2_base_1.isNullOrUndefined(canCombine) ? false : canCombine;
            var checkPrevious = !ej2_base_1.isNullOrUndefined(isPrevious) ? isPrevious : true;
            var checkNext = !ej2_base_1.isNullOrUndefined(isNext) ? isNext : true;
            var combinedElements = [];
            var line = this.documentHelper.selection.getLineWidget(elementBox, 0);
            var index = line.children.indexOf(elementBox);
            var prevText = elementBox.text;
            combinedElements.push(elementBox);
            var difference = (isPrevious) ? 0 : 1;
            var prevCombined = false;
            var isPrevField = false;
            if (elementBox.text !== '\v') {
                if (checkPrevious) {
                    var textElement = undefined;
                    for (var i = index - difference; i >= 0; i--) {
                        textElement = line.children[i];
                        if (textElement instanceof page_1.TextElementBox && !isPrevField) {
                            if (prevText.indexOf(' ') !== 0 && textElement.text.lastIndexOf(' ') !== textElement.text.length - 1) {
                                prevCombined = !ej2_base_1.isNullOrUndefined(textToCombine) ? true : false;
                                currentText = textElement.text + currentText;
                                prevText = textElement.text;
                                isPrevField = false;
                                combinedElements.push(textElement);
                                isCombined = true;
                            }
                            else if (!ej2_base_1.isNullOrUndefined(textElement)) {
                                textElement = textElement.nextElement;
                                break;
                            }
                        }
                        else if (textElement instanceof page_1.FieldElementBox && textElement.fieldType !== 1) {
                            isPrevField = true;
                        }
                    }
                    var currentElement = (isCombined) ? textElement : elementBox;
                    if (this.lookThroughPreviousLine(currentText, prevText, currentElement, underlineY, beforeIndex)) {
                        return true;
                    }
                }
                if (isPrevious) {
                    currentText = (prevCombined) ? currentText : elementBox.text + currentText;
                }
                else {
                    currentText += elementBox.text;
                }
                isPrevField = false;
                var nextText = elementBox.text;
                if (checkNext) {
                    var canCombine_1 = false;
                    var element = undefined;
                    for (var i = index + 1; i < line.children.length; i++) {
                        element = line.children[i];
                        if (element instanceof page_1.TextElementBox && !isPrevField) {
                            if (nextText.lastIndexOf(' ') !== nextText.length - 1 && element.text.indexOf(' ') !== 0) {
                                currentText += element.text;
                                nextText = element.text;
                                isPrevField = false;
                                combinedElements.push(element);
                                canCombine_1 = true;
                                isCombined = true;
                            }
                            else if (!ej2_base_1.isNullOrUndefined(element)) {
                                element = element.previousElement;
                                break;
                            }
                        }
                        else if (element instanceof page_1.FieldElementBox && element.fieldType !== 2) {
                            isPrevField = true;
                        }
                    }
                    var currentElement = (canCombine_1) ? element : elementBox;
                    if (currentElement.text !== '\f' && currentElement.text !== String.fromCharCode(14) && this.lookThroughNextLine(currentText, prevText, currentElement, underlineY, beforeIndex)) {
                        return true;
                    }
                }
            }
            if (isCombined && callSpellChecker && !this.checkCombinedElementsBeIgnored(combinedElements, currentText)) {
                this.handleCombinedElements(elementBox, currentText, underlineY, beforeIndex);
            }
            return isCombined;
        };
        SpellChecker.prototype.lookThroughPreviousLine = function (currentText, prevText, currentElement, underlineY, beforeIndex) {
            if (!ej2_base_1.isNullOrUndefined(currentElement) && currentElement.indexInOwner === 0 && !ej2_base_1.isNullOrUndefined(currentElement.line.previousLine)) {
                var previousLine = currentElement.line.previousLine;
                var index = previousLine.children.length - 1;
                if (!ej2_base_1.isNullOrUndefined(previousLine.children[index]) && previousLine.children[index] instanceof page_1.TextElementBox) {
                    var firstElement = previousLine.children[index];
                    if (!ej2_base_1.isNullOrUndefined(currentElement.text)) {
                        if (currentElement.text.indexOf(' ') !== 0 && firstElement.text.lastIndexOf(' ') !== firstElement.text.length - 1) {
                            currentText = (currentText.length > 0) ? currentText : prevText;
                            this.checkElementCanBeCombined(firstElement, underlineY, beforeIndex, true, currentText, false, true, true);
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        SpellChecker.prototype.lookThroughNextLine = function (currentText, prevText, elementBox, underlineY, beforeIndex) {
            if (elementBox instanceof page_1.TextElementBox && !ej2_base_1.isNullOrUndefined(elementBox) && elementBox.indexInOwner === elementBox.line.children.length - 1 && !ej2_base_1.isNullOrUndefined(elementBox.line.nextLine)) {
                var nextLine = elementBox.line.nextLine;
                if (!ej2_base_1.isNullOrUndefined(nextLine.children[0]) && nextLine.children[0] instanceof page_1.TextElementBox) {
                    var firstElement = nextLine.children[0];
                    if (elementBox.text.lastIndexOf(' ') !== elementBox.text.length - 1 && firstElement.text.indexOf(' ') !== 0) {
                        currentText = (currentText.length > 0) ? currentText : prevText;
                        this.checkElementCanBeCombined(firstElement, underlineY, beforeIndex, true, currentText, true, false, true);
                        return true;
                    }
                }
            }
            return false;
        };
        SpellChecker.prototype.handleCombinedElements = function (elementBox, currentText, underlineY, beforeIndex) {
            elementBox.istextCombined = true;
            var splittedText = currentText.split(/[\s]+/);
            if (this.ignoreAllItems.indexOf(currentText) === -1 && elementBox instanceof page_1.TextElementBox && elementBox.ignoreOnceItems.indexOf(currentText) === -1) {
                if (splittedText.length > 1) {
                    for (var i = 0; i < splittedText.length; i++) {
                        var currentText_1 = splittedText[i];
                        currentText_1 = this.manageSpecialCharacters(currentText_1, undefined, true);
                        this.documentHelper.render.handleUnorderedElements(currentText_1, elementBox, underlineY, i, 0, i === splittedText.length - 1, beforeIndex);
                    }
                }
                else {
                    currentText = this.manageSpecialCharacters(currentText, undefined, true);
                    this.documentHelper.render.handleUnorderedElements(currentText, elementBox, underlineY, 0, 0, true, beforeIndex);
                }
            }
        };
        SpellChecker.prototype.checkArrayHasSameElement = function (errorCollection, elementToCheck) {
            for (var i = 0; i < errorCollection.length; i++) {
                var errorText = errorCollection[i];
                if ((errorText.start.location.x === elementToCheck.start.location.x) && (errorText.start.location.y === elementToCheck.start.location.y)) {
                    return true;
                }
            }
            return false;
        };
        SpellChecker.prototype.handleSplitWordSpellCheck = function (jsonObject, currentText, elementBox, isSamePage, underlineY, iteration, markIndex, isLastItem) {
            if (jsonObject.HasSpellingError && elementBox.text !== ' ' && isSamePage) {
                var matchResults = this.getMatchedResultsFromElement(elementBox, currentText);
                markIndex = (elementBox.istextCombined) ? elementBox.line.getOffset(this.getCombinedElement(elementBox), 0) : markIndex;
                this.documentHelper.owner.searchModule.textSearch.updateMatchedTextLocation(matchResults.matches, matchResults.textResults, matchResults.elementInfo, 0, elementBox, false, null, markIndex);
                this.handleMatchedResults(matchResults.textResults, elementBox, underlineY, iteration, jsonObject.Suggestions, isLastItem);
            }
            else {
                this.addCorrectWordCollection(currentText);
                if (isLastItem) {
                    elementBox.isSpellChecked = true;
                }
            }
            this.updateUniqueWords([{ Text: currentText, HasSpellError: jsonObject.HasSpellingError }]);
        };
        SpellChecker.prototype.handleMatchedResults = function (results, elementBox, wavyLineY, index, suggestions, isLastItem) {
            if (results.length === 0 && isLastItem) {
                elementBox.isSpellChecked = true;
                return;
            }
            for (var i = 0; i < results.length; i++) {
                var span = this.createErrorElementWithInfo(results.innerList[i], elementBox);
                var color = '#FF0000';
                if (!ej2_base_1.isNullOrUndefined(elementBox.errorCollection) && !this.checkArrayHasSameElement(elementBox.errorCollection, span)) {
                    elementBox.errorCollection.splice(index, 0, span);
                }
                this.addErrorCollection(span.text, span, suggestions);
                var backgroundColor = (elementBox.line.paragraph.containerWidget instanceof page_1.TableCellWidget) ? elementBox.paragraph.containerWidget.cellFormat.shading.backgroundColor : this.documentHelper.backgroundColor;
                var para = elementBox.line.paragraph;
                var lineY = para.y;
                for (var i_1 = 0; i_1 < para.childWidgets.length; i_1++) {
                    if (para.childWidgets[i_1] == elementBox.line)
                        break;
                    lineY += para.childWidgets[i_1].height;
                }
                if (elementBox.isRightToLeft) {
                    this.documentHelper.render.renderWavyLine(span, span.end.location.x, lineY, wavyLineY, color, 'Single', elementBox.characterFormat.baselineAlignment, backgroundColor);
                }
                else {
                    this.documentHelper.render.renderWavyLine(span, span.start.location.x, lineY, wavyLineY, color, 'Single', elementBox.characterFormat.baselineAlignment, backgroundColor);
                }
                if (isLastItem) {
                    elementBox.isSpellChecked = true;
                }
            }
        };
        SpellChecker.prototype.callSpellChecker = function (languageID, word, checkSpelling, checkSuggestion, addWord, isByPage) {
            var _this = this;
            var spellchecker = this;
            return new Promise(function (resolve, reject) {
                if (!ej2_base_1.isNullOrUndefined(_this)) {
                    var httpRequest_1 = new XMLHttpRequest();
                    var service_1 = _this.documentHelper.owner.serviceUrl + _this.documentHelper.owner.serverActionSettings.spellCheck;
                    service_1 = (isByPage) ? service_1 + 'ByPage' : service_1;
                    httpRequest_1.open('POST', service_1, true);
                    httpRequest_1.setRequestHeader('Content-Type', 'application/json');
                    _this.setCustomHeaders(httpRequest_1);
                    var spellCheckData = { LanguageID: languageID, TexttoCheck: word, CheckSpelling: checkSpelling, CheckSuggestion: checkSuggestion, AddWord: addWord };
                    var httprequestEventArgs = { serverActionType: 'SpellCheck', headers: _this.documentHelper.owner.headers, timeout: 0, cancel: false, withCredentials: false };
                    _this.documentHelper.owner.trigger(index_2.beforeXmlHttpRequestSend, httprequestEventArgs);
                    if (!httprequestEventArgs.cancel) {
                        httpRequest_1.send(JSON.stringify(spellCheckData));
                    }
                    httpRequest_1.onreadystatechange = function () {
                        if (httpRequest_1.readyState === 4) {
                            if (httpRequest_1.status === 200 || httpRequest_1.status === 304) {
                                resolve(httpRequest_1.response);
                            }
                            else {
                                var result = {
                                    name: 'onFailure',
                                    status: httpRequest_1.status,
                                    statusText: httpRequest_1.responseText,
                                    url: service_1
                                };
                                if (!ej2_base_1.isNullOrUndefined(spellchecker.documentHelper)) {
                                    spellchecker.documentHelper.owner.fireServiceFailure(result);
                                }
                                reject(httpRequest_1.response);
                            }
                        }
                    };
                }
            });
        };
        SpellChecker.prototype.setCustomHeaders = function (httpRequest) {
            for (var i = 0; i < this.documentHelper.owner.headers.length; i++) {
                var header = this.documentHelper.owner.headers[i];
                for (var _i = 0, _a = Object.keys(header); _i < _a.length; _i++) {
                    var key = _a[_i];
                    httpRequest.setRequestHeader(key, header[key]);
                }
            }
        };
        SpellChecker.prototype.checkForNextError = function () {
            if (!ej2_base_1.isNullOrUndefined(this.viewer)) {
                var errorWords = this.errorWordCollection;
                if (errorWords.length > 0) {
                    for (var i = 0; i < errorWords.length; i++) {
                        var errorElements = errorWords.get(errorWords.keys[i]);
                        for (var j = 0; j < errorElements.length; j++) {
                            if (errorElements[j] instanceof page_1.ErrorTextElementBox && !errorElements[j].ischangeDetected) {
                                this.updateErrorElementTextBox(errorWords.keys[i], errorElements[j]);
                            }
                            else if (errorElements[j] instanceof page_1.TextElementBox) {
                                var matchResults = this.getMatchedResultsFromElement(errorElements[j]);
                                var results = matchResults.textResults;
                                var markIndex = (errorElements[j].ischangeDetected) ? errorElements[j].start.offset : errorElements[j].line.getOffset(errorElements[j], 0);
                                this.documentHelper.owner.searchModule.textSearch.updateMatchedTextLocation(matchResults.matches, results, matchResults.elementInfo, 0, errorElements[j], false, null, markIndex);
                                for (var i_2 = 0; i_2 < results.length; i_2++) {
                                    var element = this.createErrorElementWithInfo(results.innerList[i_2], errorElements[j]);
                                    this.updateErrorElementTextBox(element.text, element);
                                    break;
                                }
                            }
                            break;
                        }
                        break;
                    }
                }
                else {
                    this.documentHelper.clearSelectionHighlight();
                }
            }
        };
        SpellChecker.prototype.createErrorElementWithInfo = function (result, errorElement) {
            var element = new page_1.ErrorTextElementBox();
            element.text = result.text;
            element.start = result.start;
            element.end = result.end;
            element.height = errorElement.height;
            element.canTrigger = errorElement.canTrigger;
            element.characterFormat.copyFormat(errorElement.characterFormat);
            element.width = Math.abs(element.start.location.x - element.end.location.x);
            return element;
        };
        SpellChecker.prototype.getMatchedResultsFromElement = function (errorElement, currentText) {
            var line = errorElement.line;
            var pattern = this.documentHelper.owner.searchModule.textSearch.stringToRegex((ej2_base_1.isNullOrUndefined(currentText)) ? errorElement.text : currentText, 'CaseSensitive');
            this.textSearchResults.clearResults();
            var results = this.textSearchResults;
            var textLineInfo = this.documentHelper.owner.searchModule.textSearch.getElementInfo(line.children[0], 0, false, undefined, undefined, undefined, undefined, undefined, true);
            var text = textLineInfo.fullText;
            var matches = [];
            var spans = textLineInfo.elementsWithOffset;
            var matchObject;
            while (!ej2_base_1.isNullOrUndefined(matchObject = pattern.exec(text))) {
                if (spans.containsKey(errorElement)) {
                    matchObject.index = spans.get(errorElement);
                }
                matches.push(matchObject);
            }
            return { 'matches': matches, 'elementInfo': spans, 'textResults': results };
        };
        SpellChecker.prototype.updateErrorElementTextBox = function (error, errorElement) {
            var element = errorElement;
            this.documentHelper.clearSelectionHighlight();
            this.documentHelper.selection.start = element.start.clone();
            this.documentHelper.selection.end = element.end.clone();
            this.documentHelper.selection.highlight(errorElement.start.paragraph, errorElement.start, errorElement.end);
            this.documentHelper.owner.spellCheckDialog.updateSuggestionDialog(error, element);
        };
        SpellChecker.prototype.getWhiteSpaceCharacterInfo = function (elementBox) {
            var text = elementBox.text;
            var characterFormat = elementBox.characterFormat;
            var matchedText = [];
            var width = 0;
            var length = 0;
            matchedText = text.match(/[\s]+/);
            if (!ej2_base_1.isNullOrUndefined(matchedText) && matchedText.length > 0) {
                for (var i = 0; i < matchedText.length; i++) {
                    width += this.documentHelper.textHelper.getWidth(matchedText[i], characterFormat, elementBox.scriptType);
                    length += matchedText[i].length;
                }
            }
            return { 'width': width, 'wordLength': length, 'isBeginning': (!ej2_base_1.isNullOrUndefined(matchedText) && matchedText.index === 0) };
        };
        SpellChecker.prototype.getSpecialCharactersInfo = function (elementBox) {
            var text = elementBox.text;
            var characterFormat = elementBox.characterFormat;
            var matchedText = [];
            var beginingwidth = 0;
            var endWidth = 0;
            var length = 0;
            matchedText = text.match(/^[\#\@\!\~\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\:\;\"\'\,\<\.\>\/\?\`]*/);
            for (var i = 0; i < matchedText.length; i++) {
                if (!ej2_base_1.isNullOrUndefined(matchedText[i]) && matchedText[i].length > 0) {
                    beginingwidth = this.documentHelper.textHelper.getWidth(matchedText[i], characterFormat, elementBox.scriptType);
                }
                length = matchedText.length;
            }
            matchedText = text.match(/[\#\@\!\~\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\:\;\"\'\,\<\.\>\/\?\`]*$/);
            for (var i = 0; i < matchedText.length; i++) {
                if (!ej2_base_1.isNullOrUndefined(matchedText[i]) && matchedText[i].length > 0) {
                    endWidth = this.documentHelper.textHelper.getWidth(matchedText[i], characterFormat, elementBox.scriptType);
                }
                length = matchedText.length;
            }
            return { 'beginningWidth': beginingwidth, 'endWidth': endWidth, 'wordLength': length };
        };
        SpellChecker.prototype.getCombinedElement = function (element) {
            var prevElement = element;
            while (!ej2_base_1.isNullOrUndefined(element) && element instanceof page_1.TextElementBox && element.istextCombined) {
                prevElement = element;
                element = element.previousElement;
            }
            return prevElement;
        };
        SpellChecker.prototype.checkCombinedElementsBeIgnored = function (elements, exactText) {
            exactText = this.manageSpecialCharacters(exactText, undefined, true);
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].ignoreOnceItems.indexOf(exactText) !== -1) {
                    return true;
                }
            }
            return false;
        };
        SpellChecker.prototype.updateSplittedElementError = function (currentElement, splittedElement) {
            var errorCount = currentElement.errorCollection.length;
            if (errorCount > 0) {
                var errorCollection = [];
                for (var i = 0; i < errorCount; i++) {
                    errorCollection.push(currentElement.errorCollection[i]);
                }
                for (var i = 0; i < errorCount; i++) {
                    if (currentElement.text.indexOf(errorCollection[i].text) === -1) {
                        splittedElement.ischangeDetected = true;
                        currentElement.errorCollection.splice(0, 1);
                    }
                }
            }
        };
        SpellChecker.prototype.getPageContent = function (page) {
            var content = '';
            if (this.documentHelper.owner.sfdtExportModule) {
                var sfdtExport = this.documentHelper.owner.sfdtExportModule;
                var index = sfdtExport.keywordIndex;
                sfdtExport.keywordIndex = 0;
                sfdtExport.Initialize();
                var document_1 = sfdtExport.writePage(page);
                sfdtExport.keywordIndex = index;
                if (this.documentHelper.owner.textExportModule) {
                    var textExport = this.documentHelper.owner.textExportModule;
                    textExport.pageContent = '';
                    textExport.setDocument(document_1);
                    textExport.writeInternal();
                    content = textExport.pageContent;
                }
            }
            return content;
        };
        SpellChecker.prototype.updateUniqueWords = function (spelledWords) {
            if (!ej2_base_1.isNullOrUndefined(localStorage.getItem(this.uniqueKey))) {
                this.uniqueSpelledWords = JSON.parse(localStorage.getItem(this.uniqueKey));
            }
            this.uniqueSpelledWords = this.uniqueSpelledWords || {};
            var totalCount = spelledWords.length + Object.keys(this.uniqueSpelledWords).length;
            if (totalCount <= this.uniqueWordsCount) {
                for (var i = 0; i < spelledWords.length; i++) {
                    this.checkForUniqueWords(spelledWords[i]);
                }
            }
            localStorage.setItem(this.uniqueKey, JSON.stringify(this.uniqueSpelledWords));
            this.uniqueSpelledWords = {};
        };
        SpellChecker.prototype.checkForUniqueWords = function (spellData) {
            var identityMatched = this.uniqueSpelledWords[spellData.Text];
            if (!identityMatched) {
                this.uniqueSpelledWords[spellData.Text] = spellData.HasSpellError;
            }
        };
        SpellChecker.prototype.clearCache = function () {
            if (!ej2_base_1.isNullOrUndefined(localStorage.getItem(this.uniqueKey))) {
                localStorage.removeItem(this.uniqueKey);
            }
        };
        SpellChecker.prototype.createGuid = function () {
            var dateTime = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
                var randNo = (dateTime + Math.random() * 16) % 16 | 0;
                dateTime = Math.floor(dateTime / 16);
                return (char === 'x' ? randNo : (randNo & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
        SpellChecker.prototype.checkSpellingInPageInfo = function (wordToCheck) {
            var hasError = false;
            var elementPresent = false;
            var uniqueWords = JSON.parse(localStorage.getItem(this.uniqueKey));
            if (!ej2_base_1.isNullOrUndefined(uniqueWords)) {
                if (!ej2_base_1.isNullOrUndefined(uniqueWords[wordToCheck])) {
                    return { hasSpellError: uniqueWords[wordToCheck], isElementPresent: true };
                }
            }
            return { hasSpellError: hasError, isElementPresent: elementPresent };
        };
        SpellChecker.prototype.destroy = function () {
            this.errorWordCollection = undefined;
            this.ignoreAllItems = undefined;
            this.errorSuggestions = undefined;
            this.uniqueWordsCollection = undefined;
            this.uniqueSpelledWords = {};
            this.textSearchResults = undefined;
            if (!ej2_base_1.isNullOrUndefined(localStorage.getItem(this.uniqueKey))) {
                localStorage.removeItem(this.uniqueKey);
            }
            this.documentHelper = undefined;
        };
        return SpellChecker;
    }());
    exports.SpellChecker = SpellChecker;
});
