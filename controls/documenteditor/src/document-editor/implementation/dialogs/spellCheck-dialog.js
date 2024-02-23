define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-buttons", "@syncfusion/ej2-lists", "../viewer/page", "@syncfusion/ej2-popups"], function (require, exports, ej2_base_1, ej2_buttons_1, ej2_lists_1, page_1, ej2_popups_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpellCheckDialog = (function () {
        function SpellCheckDialog(documentHelper) {
            var _this = this;
            this.selectHandler = function (args) {
                _this.selectedText = args.text;
            };
            this.onCancelButtonClick = function () {
                _this.documentHelper.clearSelectionHighlight();
                _this.documentHelper.hideDialog();
            };
            this.onIgnoreClicked = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.elementBox)) {
                    ej2_popups_1.showSpinner(_this.documentHelper.dialog.element);
                    _this.parent.spellChecker.manageReplace('Ignore Once', _this.elementBox);
                    _this.removeErrors();
                    _this.parent.spellChecker.checkForNextError();
                    ej2_popups_1.hideSpinner(_this.documentHelper.dialog.element);
                }
            };
            this.onIgnoreAllClicked = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.elementBox)) {
                    ej2_popups_1.showSpinner(_this.documentHelper.dialog.element);
                    var text = _this.elementBox.text;
                    _this.parent.spellChecker.handleIgnoreAllItems({ element: _this.elementBox, text: text });
                    _this.parent.spellChecker.checkForNextError();
                    ej2_popups_1.hideSpinner(_this.documentHelper.dialog.element);
                }
            };
            this.addToDictClicked = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.elementBox)) {
                    ej2_popups_1.showSpinner(_this.documentHelper.dialog.element);
                    _this.parent.spellChecker.handleAddToDictionary({ element: _this.elementBox, text: _this.elementBox.text });
                    if (_this.parent.spellChecker.errorWordCollection.containsKey(_this.errorText)) {
                        _this.parent.spellChecker.errorWordCollection.remove(_this.errorText);
                    }
                    _this.parent.spellChecker.checkForNextError();
                    _this.documentHelper.hideDialog();
                }
            };
            this.changeButtonClicked = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.selectedText)) {
                    _this.isSpellChecking = true;
                    ej2_popups_1.showSpinner(_this.documentHelper.dialog.element);
                    _this.parent.spellChecker.manageReplace(_this.selectedText, _this.elementBox);
                    _this.removeErrors();
                    _this.parent.spellChecker.checkForNextError();
                    ej2_popups_1.hideSpinner(_this.documentHelper.dialog.element);
                }
            };
            this.changeAllButtonClicked = function () {
                if (!ej2_base_1.isNullOrUndefined(_this.selectedText)) {
                    _this.isSpellChecking = true;
                    ej2_popups_1.showSpinner(_this.documentHelper.dialog.element);
                    var elements = _this.parent.spellChecker.errorWordCollection.get(_this.errorText);
                    for (var i = 0; i < elements.length; i++) {
                        if (elements[i] instanceof page_1.ErrorTextElementBox && !elements[i].ischangeDetected) {
                            _this.parent.spellChecker.manageReplace(_this.selectedText, elements[i]);
                        }
                        else if (elements[i] instanceof page_1.TextElementBox) {
                            var matchResults = _this.parent.spellChecker.getMatchedResultsFromElement(elements[i]);
                            var results = matchResults.textResults;
                            var markIndex = (elements[i].ischangeDetected) ?
                                elements[i].start.offset : elements[i].line.getOffset(elements[i], 0);
                            _this.parent.searchModule.textSearch.updateMatchedTextLocation(matchResults.matches, results, matchResults.elementInfo, 0, elements[i], false, null, markIndex);
                            for (var j = 0; j < results.length; j++) {
                                var element = _this.parent.spellChecker.createErrorElementWithInfo(results.innerList[j], elements[i]);
                                _this.parent.spellChecker.manageReplace(_this.selectedText, element);
                            }
                        }
                    }
                    if (_this.parent.spellChecker.errorWordCollection.containsKey(_this.errorText)) {
                        _this.parent.spellChecker.errorWordCollection.remove(_this.errorText);
                    }
                    _this.parent.spellChecker.checkForNextError();
                    _this.documentHelper.hideDialog();
                    ej2_popups_1.hideSpinner(_this.documentHelper.dialog.element);
                }
            };
            this.documentHelper = documentHelper;
            ej2_popups_1.createSpinner({ target: this.documentHelper.dialog.element, cssClass: 'e-spin-overlay' });
        }
        Object.defineProperty(SpellCheckDialog.prototype, "parent", {
            get: function () {
                return this.documentHelper.owner;
            },
            enumerable: true,
            configurable: true
        });
        SpellCheckDialog.prototype.getModuleName = function () {
            return 'SpellCheckDialog';
        };
        SpellCheckDialog.prototype.removeErrors = function () {
            if (!ej2_base_1.isNullOrUndefined(this.errorText) && this.parent.spellChecker.errorWordCollection.containsKey(this.errorText)) {
                var textElement = this.parent.spellChecker.errorWordCollection.get(this.errorText);
                textElement.splice(0, 1);
                if (textElement.length === 0) {
                    this.parent.spellChecker.errorWordCollection.remove(this.errorText);
                }
            }
            if (this.parent.spellChecker.errorWordCollection.length === 0) {
                this.documentHelper.hideDialog();
            }
        };
        SpellCheckDialog.prototype.show = function (error, elementbox) {
            this.target = undefined;
            this.localValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            this.localValue.setLocale(this.documentHelper.owner.locale);
            if (!this.target) {
                this.updateSuggestionDialog(error, elementbox);
            }
        };
        SpellCheckDialog.prototype.updateSuggestionDialog = function (error, elementBox) {
            var _this = this;
            this.elementBox = elementBox;
            var suggestions;
            if (this.isSpellChecking) {
                this.parent.spellChecker.callSpellChecker(this.parent.spellChecker.languageID, error, false, true).then(function (data) {
                    var jsonObject = JSON.parse(data);
                    suggestions = jsonObject.Suggestions;
                    _this.isSpellChecking = false;
                    _this.handleRetrievedSuggestion(error, suggestions);
                });
            }
            else {
                error = this.parent.spellChecker.manageSpecialCharacters(error, undefined, true);
                suggestions = this.parent.spellChecker.errorSuggestions.containsKey(error) ?
                    this.parent.spellChecker.errorSuggestions.get(error) : [];
                this.handleRetrievedSuggestion(error, suggestions);
            }
        };
        SpellCheckDialog.prototype.handleRetrievedSuggestion = function (error, suggestions) {
            error = this.parent.spellChecker.manageSpecialCharacters(error, undefined, true);
            this.initSpellCheckDialog(this.localValue, error, suggestions);
            if (this.documentHelper.selection.caret.style.display !== 'none') {
                this.documentHelper.selection.caret.style.display = 'none';
            }
            this.documentHelper.dialog.header = this.localValue.getConstant('Spelling Editor');
            this.documentHelper.dialog.height = 'auto';
            this.documentHelper.dialog.width = 'auto';
            this.documentHelper.dialog.content = this.target;
            this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
            this.documentHelper.dialog.buttons = [{
                    click: this.onCancelButtonClick,
                    buttonModel: { content: this.localValue.getConstant('Cancel'), cssClass: 'e-control e-flat', isPrimary: true }
                }];
            this.documentHelper.dialog.dataBind();
            this.documentHelper.dialog.show();
            ej2_popups_1.hideSpinner(this.documentHelper.dialog.element);
        };
        SpellCheckDialog.prototype.initSpellCheckDialog = function (localValue, error, suggestion, isRtl) {
            var id = this.documentHelper.owner.containerId + '_add_SpellCheck';
            this.target = ej2_base_1.createElement('div', { id: id, className: 'e-de-insert-spellchecker' });
            this.errorText = error;
            var textContainer = ej2_base_1.createElement('div', {
                className: 'e-de-dlg-sub-header', innerHTML: localValue.getConstant('Spelling')
            });
            this.target.appendChild(textContainer);
            var spellContainer = ej2_base_1.createElement('div', { className: 'e-de-spellcheck-error-container' });
            var listviewDiv = ej2_base_1.createElement('div', { className: 'e-de-dlg-spellcheck-listview' });
            spellContainer.appendChild(listviewDiv);
            this.spellingListView = new ej2_lists_1.ListView({
                dataSource: [error],
                cssClass: 'e-dlg-spellcheck-listitem'
            });
            this.spellingListView.appendTo(listviewDiv);
            var buttonDiv = ej2_base_1.createElement('div', { className: 'e-de-spellcheck-btncontainer' });
            spellContainer.appendChild(buttonDiv);
            var ignoreButtonElement = ej2_base_1.createElement('button', { innerHTML: localValue.getConstant('Ignore') });
            buttonDiv.appendChild(ignoreButtonElement);
            ignoreButtonElement.setAttribute('aria-label', localValue.getConstant('Ignore'));
            var ignorebutton = new ej2_buttons_1.Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
            ignorebutton.appendTo(ignoreButtonElement);
            ignoreButtonElement.addEventListener('click', this.onIgnoreClicked);
            var ignoreAllButtonElement = ej2_base_1.createElement('button', { innerHTML: localValue.getConstant('Ignore All') });
            ignoreAllButtonElement.setAttribute('aria-label', localValue.getConstant('Ignore All'));
            buttonDiv.appendChild(ignoreAllButtonElement);
            var ignoreAllbutton = new ej2_buttons_1.Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
            ignoreAllbutton.appendTo(ignoreAllButtonElement);
            ignoreAllButtonElement.addEventListener('click', this.onIgnoreAllClicked);
            var addDictButtonElement = ej2_base_1.createElement('button', { innerHTML: localValue.getConstant('Add to Dictionary') });
            addDictButtonElement.setAttribute('aria-label', localValue.getConstant('Add to Dictionary'));
            buttonDiv.appendChild(addDictButtonElement);
            var addDictButton = new ej2_buttons_1.Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
            addDictButton.appendTo(addDictButtonElement);
            addDictButtonElement.addEventListener('click', this.addToDictClicked);
            this.target.appendChild(spellContainer);
            var suggestionDiv = ej2_base_1.createElement('div', {
                className: 'e-de-dlg-sub-header', innerHTML: localValue.getConstant('Suggestions')
            });
            this.target.appendChild(suggestionDiv);
            var suggestionContainer = ej2_base_1.createElement('div', { className: 'e-de-spellcheck-suggestion-container' });
            this.target.appendChild(suggestionContainer);
            var suggestListDiv = ej2_base_1.createElement('div', { className: 'e-de-dlg-spellcheck-listview' });
            suggestListDiv.setAttribute('aria-label', localValue.getConstant('Suggestions'));
            suggestionContainer.appendChild(suggestListDiv);
            this.suggestionListView = new ej2_lists_1.ListView({
                dataSource: suggestion,
                cssClass: 'e-dlg-spellcheck-listitem'
            });
            this.suggestionListView.appendTo(suggestListDiv);
            this.suggestionListView.addEventListener('select', this.selectHandler);
            var suggestBtnContainder = ej2_base_1.createElement('div', { className: 'e-de-spellcheck-btncontainer' });
            suggestionContainer.appendChild(suggestBtnContainder);
            var changeButtonElement = ej2_base_1.createElement('button', { innerHTML: localValue.getConstant('Change') });
            changeButtonElement.setAttribute('aria-label', localValue.getConstant('Change'));
            suggestBtnContainder.appendChild(changeButtonElement);
            var changeButton = new ej2_buttons_1.Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
            changeButton.appendTo(changeButtonElement);
            changeButtonElement.addEventListener('click', this.changeButtonClicked);
            var changeAllButtonElement = ej2_base_1.createElement('button', { innerHTML: localValue.getConstant('Change All') });
            changeAllButtonElement.setAttribute('aria-label', localValue.getConstant('Change All'));
            suggestBtnContainder.appendChild(changeAllButtonElement);
            var changeAllbutton = new ej2_buttons_1.Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
            changeAllbutton.appendTo(changeAllButtonElement);
            changeAllButtonElement.addEventListener('click', this.changeAllButtonClicked);
            if (ej2_base_1.isNullOrUndefined(suggestion) || suggestion.length === 0) {
                changeButton.disabled = true;
                changeAllbutton.disabled = true;
            }
        };
        SpellCheckDialog.prototype.destroy = function () {
            if (this.target) {
                this.target.remove();
                this.target = undefined;
            }
            if (this.elementBox) {
                this.elementBox.destroy();
                this.elementBox = undefined;
            }
            this.documentHelper = undefined;
            if (this.spellingListView) {
                this.spellingListView.destroy();
                this.spellingListView = undefined;
            }
            if (this.suggestionListView) {
                this.suggestionListView.destroy();
                this.suggestionListView = undefined;
            }
        };
        return SpellCheckDialog;
    }());
    exports.SpellCheckDialog = SpellCheckDialog;
});
