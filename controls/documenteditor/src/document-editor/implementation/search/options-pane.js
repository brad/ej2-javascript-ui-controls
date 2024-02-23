define(["require", "exports", "@syncfusion/ej2-base", "../editor/editor-helper", "@syncfusion/ej2-buttons", "@syncfusion/ej2-navigations"], function (require, exports, ej2_base_1, editor_helper_1, ej2_buttons_1, ej2_navigations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OptionsPane = (function () {
        function OptionsPane(documentHelper) {
            var _this = this;
            this.isOptionsPaneShow = false;
            this.findOption = 'None';
            this.matchCase = undefined;
            this.wholeWord = undefined;
            this.searchText = 'Navigation';
            this.resultsText = 'Results';
            this.messageDivText = 'No matches';
            this.replaceButtonText = 'Replace';
            this.replaceAllButtonText = 'Replace All';
            this.focusedIndex = -1;
            this.focusedElement = [];
            this.isOptionsPane = true;
            this.replacePaneText = 'Replace';
            this.findPaneText = 'Find';
            this.matchDivReplaceText = 'No matches';
            this.tabInstance = undefined;
            this.isReplace = false;
            this.searchOptionChange = function () {
                _this.clearSearchResultItems();
                _this.documentHelper.owner.searchModule.clearSearchHighlight();
                var inputText = _this.searchInput.value;
                if (inputText === '') {
                    return;
                }
                var pattern = _this.documentHelper.owner.searchModule.textSearch.stringToRegex(inputText, _this.findOption);
                var endSelection = _this.documentHelper.selection.end;
                var selectionIndex = endSelection.getHierarchicalIndexInternal();
                _this.results = _this.documentHelper.owner.searchModule.textSearch.findAll(pattern, _this.findOption, selectionIndex);
                if (_this.results != null && _this.results.length > 0) {
                    _this.navigateSearchResult(false);
                }
                else {
                    _this.viewer.renderVisiblePages();
                    _this.messageDiv.innerHTML = _this.localeValue.getConstant('No matches');
                    _this.resultContainer.style.display = 'block';
                    _this.resultsListBlock.style.display = 'none';
                    _this.clearFocusElement();
                    _this.resultsListBlock.innerHTML = '';
                }
            };
            this.onEnableDisableReplaceButton = function () {
                if (_this.searchInput.value.length !== 0) {
                    _this.replaceButton.disabled = false;
                    _this.replaceAllButton.disabled = false;
                }
                else {
                    _this.replaceButton.disabled = true;
                    _this.replaceAllButton.disabled = true;
                }
            };
            this.onKeyDownOnOptionPane = function (event) {
                if (event.keyCode === 9) {
                    event.preventDefault();
                    var focusIndex = undefined;
                    if (event.shiftKey) {
                        focusIndex = (_this.focusedIndex === 0 || ej2_base_1.isNullOrUndefined(_this.focusedIndex)) ?
                            _this.focusedElement.length - 1 : _this.focusedIndex - 1;
                    }
                    else {
                        focusIndex = (_this.focusedElement.length - 1 === _this.focusedIndex || ej2_base_1.isNullOrUndefined(_this.focusedIndex)) ?
                            0 : _this.focusedIndex + 1;
                    }
                    var element = _this.focusedElement[focusIndex];
                    element.focus();
                    if (element instanceof HTMLInputElement) {
                        element.select();
                    }
                    _this.focusedIndex = focusIndex;
                    if (element instanceof HTMLLIElement) {
                        _this.scrollToPosition(element);
                    }
                }
                else if (event.keyCode === 13) {
                    _this.hideMatchDiv();
                    if (event.target !== _this.searchInput && event.target !== _this.closeButton) {
                        event.preventDefault();
                        var index = _this.focusedElement.indexOf(event.target);
                        if (index !== -1) {
                            var list = _this.focusedElement[index];
                            list.click();
                            list.focus();
                            _this.focusedIndex = index;
                        }
                    }
                }
                else if (event.keyCode === 40 || event.keyCode === 38) {
                    if (_this.resultsListBlock.style.display !== 'none') {
                        var index = void 0;
                        var element = void 0;
                        if (event.keyCode === 40) {
                            if (_this.focusedIndex > 7) {
                                if (_this.focusedIndex + 1 < _this.focusedElement.length) {
                                    element = _this.focusedElement[_this.focusedIndex + 1];
                                    element.focus();
                                    _this.focusedIndex = _this.focusedIndex + 1;
                                }
                            }
                            else {
                                index = (_this.focusedElement.length - _this.resultsListBlock.children.length) + _this.results.currentIndex + 1;
                                if (index < _this.focusedElement.length) {
                                    element = _this.focusedElement[index];
                                    element.focus();
                                    _this.focusedIndex = index;
                                }
                            }
                        }
                        else {
                            if (_this.focusedIndex > 6) {
                                index = _this.focusedIndex - 1;
                                element = _this.focusedElement[index];
                                element.focus();
                                _this.focusedIndex = index;
                            }
                        }
                    }
                }
            };
            this.onReplaceButtonClick = function () {
                var optionsPane = _this.optionsPane;
                var findText = _this.searchInput.value;
                var replaceText = _this.replaceWith.value;
                var results = _this.documentHelper.owner.searchModule.textSearchResults;
                if (findText !== '' && !ej2_base_1.isNullOrUndefined(findText)) {
                    if (_this.documentHelper.owner.selection != null) {
                        var selectionText = _this.documentHelper.owner.selection.text;
                        if (!_this.documentHelper.owner.selection.isEmpty) {
                            if (_this.documentHelper.owner.selection.isForward) {
                                _this.documentHelper.owner.selection.selectContent(_this.documentHelper.owner.selection.start, true);
                            }
                            else {
                                _this.documentHelper.owner.selection.selectContent(_this.documentHelper.owner.selection.end, true);
                            }
                        }
                        if (!ej2_base_1.isNullOrUndefined(results) && !ej2_base_1.isNullOrUndefined(results.currentSearchResult)) {
                            var result = results.currentSearchResult;
                            _this.documentHelper.owner.searchModule.navigate(result);
                            if (result.text === selectionText) {
                                var replace = ej2_base_1.isNullOrUndefined(replaceText) ? '' : replaceText;
                                _this.documentHelper.owner.searchModule.replace(replace, result, results);
                                var pattern = _this.documentHelper.owner.searchModule.textSearch.stringToRegex(findText, _this.findOption);
                                var endSelection = _this.documentHelper.selection.end;
                                var index = endSelection.getHierarchicalIndexInternal();
                                _this.results = _this.documentHelper.owner.searchModule.textSearch.findAll(pattern, _this.findOption, index);
                                if (!ej2_base_1.isNullOrUndefined(_this.results) && !ej2_base_1.isNullOrUndefined(_this.results.currentSearchResult)) {
                                    _this.documentHelper.owner.searchModule.navigate(_this.results.currentSearchResult);
                                }
                                else {
                                    _this.messageDiv.style.display = 'block';
                                    _this.messageDiv.innerHTML = _this.localeValue.getConstant(_this.matchDivReplaceText);
                                }
                                _this.documentHelper.owner.findResultsList = [];
                                if (!ej2_base_1.isNullOrUndefined(_this.results) && _this.results.innerList.length > 0) {
                                    _this.navigateSearchResult(true);
                                }
                                else {
                                    _this.resultsListBlock.innerHTML = '';
                                }
                            }
                            else {
                                _this.documentHelper.owner.search.findAll(findText, _this.findOption);
                            }
                        }
                        else {
                            _this.documentHelper.owner.search.findAll(findText, _this.findOption);
                            _this.messageDiv.style.display = 'block';
                            _this.messageDiv.innerHTML = _this.localeValue.getConstant(_this.matchDivReplaceText);
                        }
                    }
                }
            };
            this.onReplaceAllButtonClick = function () {
                _this.replaceAll();
                _this.resultsListBlock.style.display = 'none';
                _this.messageDiv.innerHTML = '';
                _this.documentHelper.updateFocus();
            };
            this.searchIconClickInternal = function () {
                var inputElement = document.getElementById(_this.documentHelper.owner.containerId + '_option_search_text_box');
                var text = inputElement.value;
                if (text === '') {
                    return;
                }
                _this.hideMatchDiv();
                if (_this.searchIcon.classList.contains('e-de-op-search-close-icon')) {
                    _this.searchIcon.classList.add('e-de-op-search-icon');
                    _this.searchIcon.classList.remove('e-de-op-search-close-icon');
                    inputElement.value = '';
                    _this.messageDiv.innerHTML = _this.localeValue.getConstant('No matches');
                    _this.resultContainer.style.display = 'block';
                    _this.resultsListBlock.style.display = 'none';
                    _this.matchDiv.style.display = 'none';
                    _this.occurrenceDiv.style.display = 'none';
                    _this.onEnableDisableReplaceButton();
                    _this.clearFocusElement();
                    _this.resultsListBlock.innerHTML = '';
                    _this.clearSearchResultItems();
                    _this.documentHelper.owner.searchModule.clearSearchHighlight();
                    _this.viewer.renderVisiblePages();
                    return;
                }
                if (_this.searchIcon.classList.contains('e-de-op-search-icon') && text.length >= 1) {
                    _this.searchIcon.classList.add('e-de-op-search-close-icon');
                    _this.searchIcon.classList.remove('e-de-op-search-icon');
                    _this.onEnableDisableReplaceButton();
                }
                _this.clearSearchResultItems();
                _this.documentHelper.owner.searchModule.clearSearchHighlight();
                var patterns = _this.documentHelper.owner.searchModule.textSearch.stringToRegex(text, _this.findOption);
                var endSelection = _this.documentHelper.selection.end;
                var index = endSelection.getHierarchicalIndexInternal();
                _this.results = _this.documentHelper.owner.searchModule.textSearch.findAll(patterns, _this.findOption, index);
                if (_this.results != null && _this.results.length > 0) {
                    var start = _this.results.innerList[_this.results.currentIndex].start;
                    var end = _this.results.innerList[_this.results.currentIndex].end;
                    _this.documentHelper.scrollToPosition(start, end, true);
                    _this.navigateSearchResult(false);
                    _this.getMessageDivHeight();
                    var height = _this.isOptionsPane ? 215 : 292;
                    var resultsContainerHeight = _this.optionsPane.offsetHeight - _this.findTab.offsetHeight;
                    _this.resultsListBlock.style.height = resultsContainerHeight + 'px';
                }
                else {
                    _this.messageDiv.innerHTML = _this.localeValue.getConstant('No matches');
                    _this.resultContainer.style.display = 'block';
                    _this.resultsListBlock.style.display = 'none';
                    _this.clearFocusElement();
                    _this.resultsListBlock.innerHTML = '';
                }
            };
            this.navigateNextResultButtonClick = function () {
                if (document.getElementById(_this.documentHelper.owner.containerId + '_list_box_container') != null &&
                    document.getElementById(_this.documentHelper.owner.containerId + '_list_box_container').style.display !== 'none') {
                    var selectionEnd = _this.documentHelper.owner.selection.end;
                    var nextResult = void 0;
                    var currentIndex = 0;
                    if (selectionEnd.isExistAfter(_this.results.currentSearchResult.start)) {
                        currentIndex = _this.results.currentIndex;
                    }
                    for (var i = currentIndex; i < _this.results.length; i++) {
                        var result = _this.results.innerList[i];
                        if (selectionEnd.isExistBefore(result.start) || selectionEnd.isAtSamePosition(result.start)) {
                            nextResult = result;
                            _this.results.currentIndex = i;
                            break;
                        }
                    }
                    if (ej2_base_1.isNullOrUndefined(nextResult)) {
                        _this.results.currentIndex = 0;
                        nextResult = _this.results.innerList[0];
                    }
                    _this.messageDiv.innerHTML = _this.localeValue.getConstant('Result') + ' ' + (_this.results.currentIndex + 1) + ' ' + _this.localeValue.getConstant('of') + ' ' + _this.resultsListBlock.children.length;
                    _this.updateListItems(nextResult);
                    _this.focusedIndex = _this.focusedElement.indexOf(_this.navigateToNextResult);
                }
            };
            this.navigatePreviousResultButtonClick = function () {
                if (document.getElementById(_this.documentHelper.owner.containerId + '_list_box_container') != null &&
                    document.getElementById(_this.documentHelper.owner.containerId + '_list_box_container').style.display !== 'none') {
                    var previousResult = void 0;
                    var selectionStart = _this.documentHelper.owner.selection.start;
                    var currentIndex = _this.results.currentIndex;
                    if (selectionStart.isExistAfter(_this.results.currentSearchResult.start)) {
                        currentIndex = _this.results.length - 1;
                    }
                    for (var i = currentIndex; i >= 0; i--) {
                        var result = _this.results.innerList[i];
                        if (selectionStart.isExistAfter(result.start) || _this.documentHelper.owner.selection.end.isAtSamePosition(result.start)) {
                            previousResult = result;
                            _this.results.currentIndex = i;
                            break;
                        }
                    }
                    if (ej2_base_1.isNullOrUndefined(previousResult)) {
                        _this.results.currentIndex = _this.results.length - 1;
                        previousResult = _this.results.innerList[_this.results.currentIndex];
                    }
                    _this.messageDiv.innerHTML = _this.localeValue.getConstant('Result') + ' ' + (_this.results.currentIndex + 1) + ' ' + _this.localeValue.getConstant('of') + ' ' + _this.resultsListBlock.children.length;
                    _this.updateListItems(previousResult);
                    _this.focusedIndex = _this.focusedElement.indexOf(_this.navigateToPreviousResult);
                }
            };
            this.onKeyDown = function (event) {
                var code = event.which || event.keyCode;
                if (code === 13 && event.keyCode !== 9 && event.keyCode !== 40) {
                    event.preventDefault();
                    _this.findDiv.style.height = '';
                    _this.onKeyDownInternal();
                }
                else if (code === 8 && (_this.searchInput.value.length === 0)) {
                    _this.resultContainer.style.display = 'block';
                }
                else if (event.keyCode !== 9 && event.keyCode !== 40 && event.keyCode !== 27) {
                    _this.documentHelper.owner.searchModule.clearSearchHighlight();
                    _this.clearSearchResultItems();
                    _this.viewer.renderVisiblePages();
                    _this.resultsListBlock.style.display = 'none';
                    _this.messageDiv.innerHTML = _this.localeValue.getConstant('No matches');
                    _this.resultContainer.style.display = 'none';
                    _this.clearFocusElement();
                    _this.resultsListBlock.innerHTML = '';
                    if (_this.searchIcon.classList.contains('e-de-op-search-close-icon')) {
                        _this.searchIcon.classList.add('e-de-op-search-icon');
                        _this.searchIcon.classList.remove('e-de-op-search-close-icon');
                    }
                }
                else if (code === 27 && event.keyCode === 27) {
                    _this.showHideOptionsPane(false);
                    _this.documentHelper.updateFocus();
                }
            };
            this.close = function () {
                _this.clearFocusElement();
                _this.showHideOptionsPane(false);
                _this.resultsListBlock.innerHTML = '';
                _this.focusedIndex = 1;
                _this.isOptionsPane = true;
                _this.documentHelper.updateFocus();
            };
            this.resultListBlockClick = function (args) {
                var currentlist = args.target;
                var element = _this.resultsListBlock.children;
                var index = 0;
                for (var i = 0; i < element.length; i++) {
                    var list_1 = element[i];
                    if (list_1.classList.contains('e-de-search-result-hglt')) {
                        list_1.classList.remove('e-de-search-result-hglt');
                        list_1.children[0].classList.remove('e-de-op-search-word-text');
                        list_1.classList.add('e-de-search-result-item');
                    }
                }
                var list;
                for (var i = 0; i < element.length; i++) {
                    if (currentlist === element[i]) {
                        index = i;
                        list = element[i];
                        if (list.classList.contains('e-de-search-result-item')) {
                            list.classList.remove('e-de-search-result-item');
                            list.classList.add('e-de-search-result-hglt');
                            list.children[0].classList.add('e-de-op-search-word-text');
                            _this.focusedIndex = _this.focusedElement.indexOf(list);
                        }
                    }
                }
                var currentelement = _this.results.innerList[index];
                _this.results.currentIndex = index;
                _this.messageDiv.innerHTML = _this.localeValue.getConstant('Result') + ' ' + (index + 1) + ' ' + _this.localeValue.getConstant('of') + ' ' + _this.resultsListBlock.children.length;
                _this.documentHelper.owner.searchModule.navigate(currentelement);
                _this.documentHelper.owner.searchModule.highlight(_this.results);
                if (list) {
                    list.focus();
                }
            };
            this.documentHelper = documentHelper;
        }
        Object.defineProperty(OptionsPane.prototype, "viewer", {
            get: function () {
                return this.documentHelper.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        OptionsPane.prototype.getModuleName = function () {
            return 'OptionsPane';
        };
        OptionsPane.prototype.initOptionsPane = function (localeValue, isRtl) {
            var viewer = this.viewer;
            this.localeValue = localeValue;
            this.optionsPane = ej2_base_1.createElement('div', { className: 'e-de-op', styles: 'display:none;' });
            this.optionsPane.addEventListener('keydown', this.onKeyDownOnOptionPane);
            this.findTab = ej2_base_1.createElement('div', { id: this.documentHelper.owner.containerId + '_findTabDiv', className: 'e-de-op-tab' });
            this.optionsPane.appendChild(this.findTab);
            this.searchDiv = ej2_base_1.createElement('div', {
                className: 'e-de-op-header',
                innerHTML: localeValue.getConstant(this.searchText)
            });
            this.findTab.appendChild(this.searchDiv);
            this.closeButton = ej2_base_1.createElement('button', {
                className: 'e-de-op-close-button e-de-close-icon e-de-op-icon-btn e-btn e-flat e-icon-btn', id: 'close',
                attrs: { type: 'button' }
            });
            this.closeButton.setAttribute('aria-label', localeValue.getConstant('Close'));
            this.findTab.appendChild(this.closeButton);
            var closeSpan = ej2_base_1.createElement('span', { className: 'e-de-op-close-icon e-de-close-icon e-btn-icon e-icons' });
            this.closeButton.appendChild(closeSpan);
            this.focusedElement.push(this.closeButton);
            var tabDiv = ej2_base_1.createElement('div');
            this.findTab.appendChild(tabDiv);
            this.findTabButton = ej2_base_1.createElement('div', { innerHTML: localeValue.getConstant(this.findPaneText) });
            this.replaceTabButton = ej2_base_1.createElement('div', { innerHTML: localeValue.getConstant(this.replacePaneText) });
            var items = [
                { header: { text: this.findTabButton } },
                { header: { text: this.replaceTabButton } }
            ];
            this.tabInstance = new ej2_navigations_1.Tab({ items: items, enableRtl: isRtl, selected: this.selectedTabItem.bind(this) });
            this.tabInstance.isStringTemplate = true;
            this.tabInstance.appendTo(tabDiv);
            this.findTabContentDiv = ej2_base_1.createElement('div', { className: 'e-de-search-tab-content' });
            this.findTab.appendChild(this.findTabContentDiv);
            this.searchTextBoxContainer = ej2_base_1.createElement('div', { className: 'e-input-group e-de-op-input-group' });
            this.findTabContentDiv.appendChild(this.searchTextBoxContainer);
            this.searchInput = ej2_base_1.createElement('input', { className: 'e-input e-de-search-input', id: this.documentHelper.owner.containerId + '_option_search_text_box', attrs: { placeholder: localeValue.getConstant('Search for') } });
            this.searchTextBoxContainer.appendChild(this.searchInput);
            this.searchIcon = ej2_base_1.createElement('span', {
                className: 'e-de-op-icon e-de-op-search-icon e-input-group-icon e-icon',
                id: this.documentHelper.owner.containerId + '_search-icon'
            });
            this.searchIcon.tabIndex = 0;
            this.searchTextBoxContainer.appendChild(this.searchIcon);
            this.focusedElement.push(this.searchIcon);
            this.navigateToPreviousResult = ej2_base_1.createElement('span', { className: 'e-de-op-icon e-de-op-nav-btn e-arrow-up e-spin-up e-btn-icon e-icon e-input-group-icon' });
            this.navigateToPreviousResult.tabIndex = 0;
            this.searchTextBoxContainer.appendChild(this.navigateToPreviousResult);
            this.focusedElement.push(this.navigateToPreviousResult);
            this.navigateToNextResult = ej2_base_1.createElement('span', { className: 'e-de-op-icon e-de-op-nav-btn e-arrow-down e-spin-down e-btn-icon e-icon e-input-group-icon' });
            this.navigateToNextResult.tabIndex = 0;
            this.searchTextBoxContainer.appendChild(this.navigateToNextResult);
            this.focusedElement.push(this.navigateToNextResult);
            var div = ej2_base_1.createElement('div', { className: 'e-de-op-more-less' });
            this.matchInput = ej2_base_1.createElement('input', {
                attrs: { type: 'checkbox' },
                id: this.documentHelper.owner.containerId + '_matchCase'
            });
            div.appendChild(this.matchInput);
            this.matchCase = new ej2_buttons_1.CheckBox({ label: localeValue.getConstant('Match case'), enableRtl: isRtl, checked: false, change: this.matchChange.bind(this) });
            this.matchCase.appendTo(this.matchInput);
            this.focusedElement.push(this.matchInput);
            this.matchInput.tabIndex = 0;
            var wholeWordLabel;
            if (isRtl) {
                wholeWordLabel = '_e-de-rtl';
            }
            else {
                wholeWordLabel = '_e-de-ltr';
            }
            this.wholeInput = ej2_base_1.createElement('input', {
                attrs: { type: 'checkbox' },
                id: this.documentHelper.owner.containerId + '_wholeWord' + wholeWordLabel
            });
            div.appendChild(this.wholeInput);
            this.wholeWord = new ej2_buttons_1.CheckBox({ label: localeValue.getConstant('Whole words'), enableRtl: isRtl, checked: false, change: this.wholeWordsChange.bind(this) });
            this.wholeWord.appendTo(this.wholeInput);
            this.focusedElement.push(this.wholeInput);
            this.wholeInput.tabIndex = 0;
            this.findTab.appendChild(div);
            this.replaceTabContentDiv = ej2_base_1.createElement('div', { className: 'e-de-op-replacetabcontentdiv', styles: 'display:none;' });
            this.findTab.appendChild(this.replaceTabContentDiv);
            this.createReplacePane(isRtl);
            this.resultContainer = ej2_base_1.createElement('div', { styles: 'width:85%;display:block;', className: 'e-de-op-result-container' });
            this.findTab.appendChild(this.resultContainer);
            this.messageDiv = ej2_base_1.createElement('div', { className: this.documentHelper.owner.containerId + '_messageDiv e-de-op-msg', innerHTML: this.localeValue.getConstant(this.messageDivText), id: this.documentHelper.owner.containerId + '_search_status' });
            this.resultContainer.appendChild(this.messageDiv);
            var resultDiv = ej2_base_1.createElement('div', { id: this.documentHelper.owner.containerId + '_resultDiv' });
            this.optionsPane.appendChild(resultDiv);
            this.findDiv = ej2_base_1.createElement('div', { className: 'findDiv', styles: 'display:block;' });
            resultDiv.appendChild(this.findDiv);
            this.resultsListBlock = ej2_base_1.createElement('div', { id: this.documentHelper.owner.containerId + '_list_box_container', styles: 'display:none;width:270px;list-style:none;padding-right:5px;overflow:auto;', className: 'e-de-result-list-block' });
            this.findDiv.appendChild(this.resultsListBlock);
            this.onWireEvents();
            if (isRtl) {
                this.optionsPane.classList.add('e-de-rtl');
                this.closeButton.classList.add('e-de-rtl');
                this.searchDiv.classList.add('e-de-rtl');
            }
        };
        OptionsPane.prototype.createReplacePane = function (isRtl) {
            this.replaceDiv = ej2_base_1.createElement('div');
            this.replaceTabContentDiv.appendChild(this.replaceDiv);
            this.replaceWith = ej2_base_1.createElement('input', {
                className: 'e-de-op-replacewith e-input',
                attrs: { placeholder: this.localeValue.getConstant('Replace with') }
            });
            this.replaceDiv.appendChild(this.replaceWith);
            var replaceButtonDivTextAlign;
            var replaceButtonMargin;
            if (isRtl) {
                replaceButtonDivTextAlign = 'text-align:left';
                replaceButtonMargin = 'margin-left:10px';
            }
            else {
                replaceButtonDivTextAlign = 'text-align:right';
                replaceButtonMargin = 'margin-right:10px';
            }
            var replaceButtonDiv = ej2_base_1.createElement('div', { styles: replaceButtonDivTextAlign, className: 'e-de-op-dlg-footer' });
            this.replaceDiv.appendChild(replaceButtonDiv);
            this.replaceButton = ej2_base_1.createElement('button', {
                className: 'e-control e-btn e-flat e-replace',
                styles: replaceButtonMargin,
                innerHTML: this.localeValue.getConstant(this.replaceButtonText),
                attrs: { type: 'button' }
            });
            replaceButtonDiv.appendChild(this.replaceButton);
            this.replaceButton.setAttribute('aria-label', this.localeValue.getConstant(this.replaceButtonText));
            this.replaceAllButton = ej2_base_1.createElement('button', {
                className: 'e-control e-btn e-flat e-replaceall',
                innerHTML: this.localeValue.getConstant(this.replaceAllButtonText),
                attrs: { type: 'button' }
            });
            replaceButtonDiv.appendChild(this.replaceAllButton);
            this.replaceAllButton.setAttribute('aria-label', this.localeValue.getConstant(this.replaceAllButtonText));
            this.matchDiv = ej2_base_1.createElement('div', { styles: 'display:none;padding-top:10px;' });
            this.replaceDiv.appendChild(this.matchDiv);
            var emptyDiv6 = ej2_base_1.createElement('div', { className: 'e-de-op-search-replacediv' });
            this.replaceDiv.appendChild(emptyDiv6);
            this.occurrenceDiv = ej2_base_1.createElement('div', { styles: 'display:none;' });
            this.replaceDiv.appendChild(this.occurrenceDiv);
        };
        OptionsPane.prototype.selectedTabItem = function (args) {
            var contentParent = this.findTab.getElementsByClassName('e-content').item(0);
            if (args.previousIndex !== args.selectedIndex) {
                var previousTab = contentParent.children[0];
                var nextTab = contentParent.children[1];
                var element = previousTab.firstElementChild;
                if (element) {
                    if (element.parentElement) {
                        element.parentElement.removeChild(element);
                    }
                    nextTab.appendChild(element);
                }
            }
            var selectedElement = contentParent.children[0];
            if (!ej2_base_1.isNullOrUndefined(selectedElement)) {
                if (args.selectedIndex === 0) {
                    this.isOptionsPane = true;
                    this.onFindPane();
                }
                else {
                    this.isOptionsPane = false;
                    this.onReplacePane();
                }
            }
        };
        OptionsPane.prototype.navigateSearchResult = function (navigate) {
            if (navigate) {
                this.documentHelper.owner.searchModule.navigate(this.results.innerList[this.results.currentIndex]);
            }
            this.documentHelper.owner.searchModule.highlight(this.results);
            this.documentHelper.owner.searchModule.addFindResultView(this.results);
            this.resultsListBlock.style.display = 'block';
            this.resultContainer.style.display = 'block';
            var lists = this.documentHelper.owner.findResultsList;
            var text = '';
            for (var i = 0; i < lists.length; i++) {
                text += lists[i];
            }
            var resultsContainerHeight = this.optionsPane.offsetHeight - this.findTab.offsetHeight;
            this.resultsListBlock.style.height = resultsContainerHeight + 'px';
            this.clearFocusElement();
            this.resultsListBlock.innerHTML = text;
            for (var i = 0; i < this.resultsListBlock.children.length; i++) {
                this.focusedElement.push(this.resultsListBlock.children[i]);
            }
            var currentIndexValue = this.results.currentIndex;
            this.messageDiv.innerHTML = this.localeValue.getConstant('Result') + ' ' + (currentIndexValue + 1) + ' ' + this.localeValue.getConstant('of') + ' ' + this.resultsListBlock.children.length;
            var listElement = this.resultsListBlock.children[currentIndexValue];
            if (listElement.classList.contains('e-de-search-result-item')) {
                listElement.classList.remove('e-de-search-result-item');
                listElement.classList.add('e-de-search-result-hglt');
                listElement.children[0].classList.add('e-de-op-search-word-text');
                this.scrollToPosition(listElement);
            }
        };
        OptionsPane.prototype.wholeWordsChange = function () {
            if (this.matchInput.checked && this.wholeInput.checked) {
                this.findOption = 'CaseSensitiveWholeWord';
            }
            else if (this.matchInput.checked && !(this.wholeInput.checked)) {
                this.findOption = 'CaseSensitive';
            }
            else if (!(this.matchInput.checked) && this.wholeInput.checked) {
                this.findOption = 'WholeWord';
            }
            else {
                this.findOption = 'None';
            }
            this.searchOptionChange();
        };
        OptionsPane.prototype.matchChange = function () {
            if (this.matchInput.checked && this.wholeInput.checked) {
                this.findOption = 'CaseSensitiveWholeWord';
            }
            else if (!(this.matchInput.checked) && this.wholeInput.checked) {
                this.findOption = 'WholeWord';
            }
            else if (this.matchInput.checked && !(this.wholeInput.checked)) {
                this.findOption = 'CaseSensitive';
            }
            else {
                this.findOption = 'None';
            }
            var resultsContainerHeight = this.optionsPane.offsetHeight - this.findTab.offsetHeight;
            this.resultsListBlock.style.height = resultsContainerHeight + 'px';
            this.searchOptionChange();
        };
        OptionsPane.prototype.onWireEvents = function () {
            this.searchIcon.addEventListener('click', this.searchIconClickInternal);
            this.navigateToNextResult.addEventListener('click', this.navigateNextResultButtonClick);
            this.navigateToPreviousResult.addEventListener('click', this.navigatePreviousResultButtonClick);
            this.searchInput.addEventListener('keydown', this.onKeyDown);
            this.searchInput.addEventListener('keyup', this.onEnableDisableReplaceButton);
            this.resultsListBlock.addEventListener('click', this.resultListBlockClick);
            this.closeButton.addEventListener('click', this.close);
            this.replaceButton.addEventListener('click', this.onReplaceButtonClick);
            this.replaceAllButton.addEventListener('click', this.onReplaceAllButtonClick);
        };
        OptionsPane.prototype.onKeyDownInternal = function () {
            var inputElement = document.getElementById(this.documentHelper.owner.containerId + '_option_search_text_box');
            if (ej2_base_1.isNullOrUndefined(inputElement)) {
                return;
            }
            inputElement.blur();
            var text = inputElement.value;
            if (text === '') {
                return;
            }
            if (text.length >= 1 && this.searchIcon.classList.contains('e-de-op-search-icon')) {
                this.searchIcon.classList.add('e-de-op-search-close-icon');
                this.searchIcon.classList.remove('e-de-op-search-icon');
            }
            var height = this.isOptionsPane ? 215 : 292;
            this.clearSearchResultItems();
            this.documentHelper.owner.searchModule.clearSearchHighlight();
            var pattern = this.documentHelper.owner.searchModule.textSearch.stringToRegex(text, this.findOption);
            var endSelection = this.documentHelper.selection.end;
            var index = endSelection.getHierarchicalIndexInternal();
            this.results = this.documentHelper.owner.searchModule.textSearch.findAll(pattern, this.findOption, index);
            var results = this.results;
            if (ej2_base_1.isNullOrUndefined(results)) {
                this.viewer.renderVisiblePages();
            }
            if (results != null && results.length > 0) {
                if ((this.focusedElement.indexOf(this.navigateToPreviousResult) === -1) && this.isOptionsPane) {
                    this.focusedElement.push(this.navigateToPreviousResult);
                }
                if ((this.focusedElement.indexOf(this.navigateToNextResult) === -1) && this.isOptionsPane) {
                    this.focusedElement.push(this.navigateToNextResult);
                }
                this.documentHelper.owner.searchModule.navigate(this.results.innerList[this.results.currentIndex]);
                this.documentHelper.owner.searchModule.highlight(results);
                this.documentHelper.owner.searchModule.addFindResultView(results);
                this.resultContainer.style.display = 'block';
                this.resultsListBlock.style.display = 'block';
                var resultsContainerHeight = this.optionsPane.offsetHeight - this.findTab.offsetHeight;
                this.resultsListBlock.style.height = resultsContainerHeight + 'px';
                var list = this.documentHelper.owner.findResultsList;
                var text_1 = '';
                this.clearFocusElement();
                this.resultsListBlock.innerHTML = '';
                for (var i = 0; i < list.length; i++) {
                    text_1 += list[i];
                }
                this.resultsListBlock.innerHTML = text_1;
                for (var i = 0; i < this.resultsListBlock.children.length; i++) {
                    this.focusedElement.push(this.resultsListBlock.children[i]);
                }
                var lists = this.resultsListBlock.children;
                var currentIndex = this.results.currentIndex;
                this.messageDiv.innerHTML = this.localeValue.getConstant('Result') + ' ' + (currentIndex + 1) + ' ' + this.localeValue.getConstant('of') + ' ' + this.resultsListBlock.children.length;
                var listElement = this.resultsListBlock.children[currentIndex];
                if (listElement.classList.contains('e-de-search-result-item')) {
                    listElement.classList.remove('e-de-search-result-item');
                    listElement.classList.add('e-de-search-result-hglt');
                    listElement.children[0].classList.add('e-de-op-search-word-text');
                }
                this.navigateToNextResult.focus();
                this.focusedIndex = this.focusedElement.indexOf(this.navigateToNextResult);
                this.getMessageDivHeight();
            }
            else {
                this.messageDiv.innerHTML = this.localeValue.getConstant('No matches');
                this.resultContainer.style.display = 'block';
                this.resultsListBlock.style.display = 'none';
                this.clearFocusElement();
                this.resultsListBlock.innerHTML = '';
            }
        };
        OptionsPane.prototype.onFindPane = function () {
            this.replaceDiv.style.display = 'none';
            this.occurrenceDiv.style.display = 'none';
            if (!ej2_base_1.isNullOrUndefined(this.results) && this.results.length === 0) {
                this.resultsListBlock.innerHTML = '';
                this.resultsListBlock.style.display = 'none';
                this.messageDiv.innerHTML = this.localeValue.getConstant('No matches');
            }
            var height = this.isOptionsPane ? 215 : 292;
            var resultsContainerHeight = this.optionsPane.offsetHeight - (this.findTab.offsetHeight - this.replaceTabContentDiv.offsetHeight);
            this.resultsListBlock.style.height = resultsContainerHeight + 'px';
            this.replaceTabContentDiv.style.display = 'none';
            this.findDiv.style.display = 'block';
            this.messageDiv.style.display = 'block';
            this.focusedElement = [];
            this.focusedElement.push(this.closeButton, this.searchInput, this.searchIcon, this.navigateToPreviousResult, this.navigateToNextResult, this.matchInput, this.wholeInput);
            this.focusedIndex = 1;
            this.searchInput.select();
            this.getMessageDivHeight();
        };
        OptionsPane.prototype.getMessageDivHeight = function () {
            if (!this.isOptionsPane && this.messageDiv.classList.contains('e-de-op-msg')) {
                this.messageDiv.classList.add('e-de-op-replace-messagediv');
                this.messageDiv.classList.remove('e-de-op-msg');
            }
            else if (this.isOptionsPane && this.messageDiv.classList.contains('e-de-op-replace-messagediv')) {
                this.messageDiv.classList.add('e-de-op-msg');
                this.messageDiv.classList.remove('e-de-op-replace-messagediv');
            }
        };
        OptionsPane.prototype.onReplacePane = function () {
            this.findDiv.style.display = 'block';
            this.replaceDiv.style.display = 'block';
            this.replaceTabContentDiv.style.display = 'block';
            var height = this.isOptionsPane ? 215 : 292;
            var resultsContainerHeight = this.optionsPane.offsetHeight - this.findTab.offsetHeight;
            this.resultsListBlock.style.height = resultsContainerHeight + 'px';
            this.isOptionsPane = false;
            if (this.searchInput.value.length !== 0) {
                this.replaceButton.disabled = false;
                this.replaceAllButton.disabled = false;
            }
            else {
                this.replaceButton.disabled = true;
                this.replaceAllButton.disabled = true;
            }
            this.focusedElement = [];
            this.focusedElement.push(this.closeButton, this.searchInput, this.searchIcon, this.navigateToPreviousResult, this.navigateToNextResult, this.matchInput, this.wholeInput, this.replaceWith, this.replaceButton, this.replaceAllButton);
            this.focusedIndex = 1;
            if (this.searchInput.value === '') {
                this.searchInput.select();
            }
            else {
                this.replaceWith.select();
            }
            this.getMessageDivHeight();
        };
        OptionsPane.prototype.replaceAll = function () {
            var optionsPane = this.optionsPane;
            var findText = this.searchInput.value;
            var replaceText = this.replaceWith.value;
            if (findText !== '' && !ej2_base_1.isNullOrUndefined(findText)) {
                var pattern = this.documentHelper.owner.searchModule.textSearch.stringToRegex(findText, this.findOption);
                var endSelection = this.documentHelper.selection.end;
                var index = endSelection.getHierarchicalIndexInternal();
                var results = this.documentHelper.owner.searchModule.textSearch.findAll(pattern, this.findOption, index);
                var replace = ej2_base_1.isNullOrUndefined(replaceText) ? '' : replaceText;
                var count = ej2_base_1.isNullOrUndefined(results) ? 0 : results.length;
                this.documentHelper.owner.searchModule.replaceAll(replace, results);
                this.documentHelper.layout.isReplacingAll = false;
                this.matchDiv.style.display = 'block';
                this.matchDiv.innerHTML = this.localeValue.getConstant('All Done') + '!';
                this.occurrenceDiv.style.display = 'block';
                this.occurrenceDiv.innerHTML = this.localeValue.getConstant('We replaced all') + ' ' + count + ' ' + this.localeValue.getConstant('instances') + ' ' + this.localeValue.getConstant('of') + ' "' + findText + '" ' + this.localeValue.getConstant('with') + ' "' + replaceText + '" ';
            }
        };
        OptionsPane.prototype.hideMatchDiv = function () {
            this.matchDiv.style.display = 'none';
            this.occurrenceDiv.style.display = 'none';
        };
        OptionsPane.prototype.updateListItems = function (textSearchResult) {
            var searchElements = this.resultsListBlock.getElementsByClassName('e-de-search-result-hglt');
            for (var j = 0; j < searchElements.length; j++) {
                var list = searchElements[j];
                ej2_base_1.classList(list, ['e-de-search-result-item'], ['e-de-search-result-hglt']);
                ej2_base_1.classList(list.children[0], [], ['e-de-op-search-word-text']);
            }
            var listElement = this.resultsListBlock.children[this.results.currentIndex];
            ej2_base_1.classList(listElement, ['e-de-search-result-hglt'], ['e-de-search-result-item']);
            ej2_base_1.classList(listElement.children[0], ['e-de-op-search-word-text'], []);
            this.scrollToPosition(listElement);
            this.documentHelper.owner.searchModule.navigate(textSearchResult);
            this.documentHelper.owner.searchModule.highlight(this.results);
        };
        OptionsPane.prototype.scrollToPosition = function (list) {
            var rect = list.getBoundingClientRect();
            var top;
            if (rect.top > 0) {
                top = rect.top - list.parentElement.getBoundingClientRect().top;
                if ((list.parentElement.offsetHeight - top) <= list.offsetHeight) {
                    if (Math.ceil(top + list.offsetHeight) === list.parentElement.scrollHeight) {
                        list.parentElement.scrollTop = top;
                    }
                    list.parentElement.scrollTop = list.parentElement.scrollTop + (list.parentElement.offsetHeight / 100) * 30;
                }
                else if (top < 0) {
                    list.parentElement.scrollTop = list.parentElement.scrollTop - (list.parentElement.offsetHeight / 100) * 30;
                }
            }
            else {
                list.parentElement.scrollTop = 0;
            }
        };
        OptionsPane.prototype.clearFocusElement = function () {
            for (var i = 0; i < this.resultsListBlock.children.length; i++) {
                var index = this.focusedElement.indexOf(this.resultsListBlock.children[i]);
                if (index !== -1) {
                    this.focusedElement.splice(index, 1);
                }
            }
            this.focusedIndex = 1;
        };
        OptionsPane.prototype.showHideOptionsPane = function (show) {
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.owner.selectionModule)) {
                if (show) {
                    this.localeValue = new ej2_base_1.L10n('documenteditor', this.documentHelper.owner.defaultLocale);
                    this.localeValue.setLocale(this.documentHelper.owner.locale);
                    if (ej2_base_1.isNullOrUndefined(this.optionsPane)) {
                        this.initOptionsPane(this.localeValue, this.documentHelper.owner.enableRtl);
                        var isRtl = this.documentHelper.owner.enableRtl;
                        var optionsPaneContainerStyle = void 0;
                        if (isRtl) {
                            optionsPaneContainerStyle = 'display:inline-flex;direction:rtl;';
                        }
                        else {
                            optionsPaneContainerStyle = 'display:inline-flex;';
                        }
                        this.documentHelper.optionsPaneContainer.setAttribute('style', optionsPaneContainerStyle);
                        this.documentHelper.optionsPaneContainer.insertBefore(this.documentHelper.owner.optionsPaneModule.optionsPane, this.documentHelper.viewerContainer);
                    }
                    this.optionsPane.style.display = 'block';
                    if (this.documentHelper.owner.isReadOnlyMode) {
                        this.tabInstance.hideTab(1);
                    }
                    else {
                        this.tabInstance.hideTab(1, false);
                    }
                    if (this.isReplace && !this.documentHelper.owner.isReadOnlyMode) {
                        this.tabInstance.select(1);
                        this.isReplace = false;
                        this.isOptionsPane = false;
                    }
                    else {
                        this.tabInstance.select(0);
                    }
                    this.searchDiv.innerHTML = this.localeValue.getConstant(this.searchText);
                    this.isOptionsPaneShow = true;
                    var textBox = document.getElementById(this.documentHelper.owner.getDocumentEditorElement().id + '_option_search_text_box');
                    var selectedText = this.documentHelper.owner.selection.text;
                    if (!ej2_base_1.isNullOrUndefined(selectedText)) {
                        var char = ['\v', '\r'];
                        var index = editor_helper_1.HelperMethods.indexOfAny(selectedText, char);
                        selectedText = index < 0 ? selectedText : selectedText.substring(0, index);
                    }
                    textBox.value = selectedText;
                    textBox.select();
                    this.messageDiv.innerHTML = '';
                    if (this.searchIcon.classList.contains('e-de-op-search-close-icon')) {
                        this.searchIcon.classList.add('e-de-op-search-icon');
                        this.searchIcon.classList.remove('e-de-op-search-close-icon');
                    }
                    this.documentHelper.selection.caret.style.display = 'none';
                    this.focusedIndex = 1;
                    this.focusedElement = [];
                    if (this.isOptionsPane) {
                        this.focusedElement.push(this.closeButton, this.searchInput, this.searchIcon, this.navigateToPreviousResult, this.navigateToNextResult, this.matchInput, this.wholeInput);
                    }
                    else {
                        this.focusedElement.push(this.closeButton, this.searchInput, this.searchIcon, this.navigateToPreviousResult, this.navigateToNextResult, this.matchInput, this.wholeInput, this.replaceWith, this.replaceButton, this.replaceAllButton);
                    }
                    this.documentHelper.updateViewerSize();
                }
                else {
                    if (!ej2_base_1.isNullOrUndefined(this.optionsPane)) {
                        this.clearSearchResultItems();
                        if (!ej2_base_1.isNullOrUndefined(this.documentHelper.owner.searchModule)) {
                            this.documentHelper.owner.searchModule.clearSearchHighlight();
                        }
                        this.isOptionsPaneShow = false;
                        var resultListBox = document.getElementById(this.documentHelper.owner.containerId + '_list_box_container');
                        var message = document.getElementById(this.documentHelper.owner.containerId + '_search_status');
                        if (!ej2_base_1.isNullOrUndefined(resultListBox) && !ej2_base_1.isNullOrUndefined(message)) {
                            resultListBox.style.display = 'none';
                            this.clearFocusElement();
                            resultListBox.innerHTML = '';
                            message.innerHTML = this.localeValue.getConstant('No matches');
                        }
                    }
                    this.documentHelper.updateViewerSize();
                    if (!ej2_base_1.isNullOrUndefined(this.optionsPane)) {
                        if (this.optionsPane.style.display !== 'none') {
                            this.documentHelper.selection.updateCaretPosition();
                            this.optionsPane.style.display = 'none';
                        }
                    }
                    if (this.documentHelper.owner.enableAutoFocus) {
                        this.documentHelper.updateFocus();
                    }
                    if (this.documentHelper.owner.enableAutoFocus) {
                        this.documentHelper.selection.caret.style.display = 'block';
                    }
                }
            }
        };
        OptionsPane.prototype.clearSearchResultItems = function () {
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.owner.findResultsList)) {
                this.documentHelper.owner.findResultsList = [];
            }
        };
        OptionsPane.prototype.destroy = function () {
            if (this.optionsPane) {
                this.optionsPane.innerHTML = '';
                this.optionsPane = undefined;
            }
            if (this.resultsListBlock) {
                this.resultsListBlock.innerHTML = '';
                this.resultsListBlock = undefined;
            }
            if (this.messageDiv) {
                this.messageDiv.innerHTML = '';
                this.messageDiv = undefined;
            }
            if (this.resultContainer) {
                this.resultContainer.innerHTML = '';
            }
            this.resultContainer = undefined;
            if (this.searchInput) {
                this.searchInput.value = '';
                this.searchInput = undefined;
            }
            if (this.searchDiv) {
                this.searchDiv.innerHTML = '';
                this.searchDiv = undefined;
            }
            if (this.searchTextBoxContainer) {
                this.searchTextBoxContainer.innerHTML = '';
                this.searchTextBoxContainer = undefined;
            }
            if (this.replaceWith) {
                this.replaceWith.innerHTML = '';
                this.replaceWith = undefined;
            }
            if (this.findDiv) {
                this.findDiv.innerHTML = '';
                this.findDiv = undefined;
            }
            if (this.replaceButton) {
                this.replaceButton.innerHTML = '';
                this.replaceButton = undefined;
            }
            if (this.replaceAllButton) {
                this.replaceAllButton.innerHTML = '';
                this.replaceAllButton = undefined;
            }
            if (this.matchInput) {
                this.matchInput.innerHTML = '';
                this.matchCase = undefined;
            }
            if (this.wholeInput) {
                this.wholeInput.innerHTML = '';
                this.wholeWord = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.results)) {
                this.results.destroy();
            }
            if (this.focusedElement) {
                this.focusedElement = [];
            }
            this.focusedElement = undefined;
            this.destroyInternal();
            this.documentHelper = undefined;
        };
        OptionsPane.prototype.destroyInternal = function () {
            if (this.searchText) {
                this.searchText = undefined;
            }
            if (this.resultsText) {
                this.resultsText = undefined;
            }
            if (this.messageDivText) {
                this.messageDivText = undefined;
            }
            if (this.replaceButtonText) {
                this.replaceButtonText = undefined;
            }
            if (this.replaceAllButtonText) {
                this.replaceAllButtonText = undefined;
            }
        };
        return OptionsPane;
    }());
    exports.OptionsPane = OptionsPane;
});
