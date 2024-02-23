var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../base/dictionary", "../list/abstract-list", "../list/level-override", "../format/index", "./layout", "./render", "@syncfusion/ej2-base", "./page", "./page", "../editor/editor-helper", "./text-helper", "@syncfusion/ej2-base", "../index", "./zooming", "@syncfusion/ej2-popups", "../../base/index", "../restrict-editing/restrict-editing-pane", "../dialogs/form-field-popup", "../track-changes/track-changes-pane", "../themes/themes", "../../base/constants", "../../base/index"], function (require, exports, dictionary_1, abstract_list_1, level_override_1, index_1, layout_1, render_1, ej2_base_1, page_1, page_2, editor_helper_1, text_helper_1, ej2_base_2, index_2, zooming_1, ej2_popups_1, index_3, restrict_editing_pane_1, form_field_popup_1, track_changes_pane_1, themes_1, constants_1, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DocumentHelper = (function () {
        function DocumentHelper(owner) {
            var _this = this;
            this.isCompleted = true;
            this.isSelectionCompleted = true;
            this.scrollbarWidth = 0;
            this.isWebPrinting = false;
            this.isHeaderFooter = false;
            this.currentPage = undefined;
            this.selectionStartPageIn = undefined;
            this.selectionEndPageIn = undefined;
            this.fieldStacks = [];
            this.showRevision = false;
            this.splittedCellWidgets = [];
            this.tableLefts = [];
            this.tapCount = 0;
            this.timer = -1;
            this.isTimerStarted = false;
            this.isFirstLineFitInShiftWidgets = false;
            this.preZoomFactor = 0;
            this.preDifference = -1;
            this.fieldEndParagraph = undefined;
            this.fieldToLayout = undefined;
            this.backgroundColor = '#FFFFFF';
            this.isMouseDown = false;
            this.isMouseEntered = false;
            this.scrollMoveTimer = 0;
            this.isSelectionChangedOnMouseMoved = false;
            this.isControlPressed = false;
            this.isTouchInput = false;
            this.isTouchMoved = false;
            this.useTouchSelectionMark = false;
            this.touchDownOnSelectionMark = 0;
            this.isComposingIME = false;
            this.lastComposedText = '';
            this.isCompositionStart = false;
            this.isCompositionUpdated = false;
            this.isCompositionCanceled = false;
            this.isCompositionEnd = false;
            this.prefix = '';
            this.suffix = '';
            this.fields = [];
            this.heightInfoCollection = {};
            this.defaultTabWidth = 36;
            this.dontUseHtmlParagraphAutoSpacing = false;
            this.allowSpaceOfSameStyleInTable = false;
            this.alignTablesRowByRow = false;
            this.compatibilityMode = 'Word2013';
            this.lists = [];
            this.comments = [];
            this.authors = new dictionary_1.Dictionary();
            this.revisionsInternal = new dictionary_1.Dictionary();
            this.commentUserOptionId = 1;
            this.abstractLists = [];
            this.styles = new index_1.WStyles();
            this.stylesMap = new dictionary_1.Dictionary();
            this.preDefinedStyles = undefined;
            this.isRowOrCellResizing = false;
            this.endBookmarksUpdated = [];
            this.formFields = [];
            this.isMouseDownInFooterRegion = false;
            this.pageFitTypeIn = 'None';
            this.fieldCollection = [];
            this.isPageField = false;
            this.mouseDownOffset = new editor_helper_1.Point(0, 0);
            this.zoomFactorInternal = 1;
            this.moveCaretPosition = 0;
            this.isTextInput = false;
            this.isTextFormEmpty = false;
            this.isScrollHandler = false;
            this.triggerElementsOnLoading = false;
            this.triggerSpellCheck = false;
            this.restrictFormatting = false;
            this.protectionType = 'NoProtection';
            this.isDocumentProtected = false;
            this.hashValue = '';
            this.saltValue = '';
            this.userCollection = [];
            this.cachedPages = [];
            this.skipScrollToPosition = false;
            this.isIosDevice = false;
            this.isMobileDevice = false;
            this.isFormFilling = false;
            this.themes = new themes_1.Themes();
            this.hasThemes = false;
            this.footnotes = new page_1.Footnote();
            this.endnotes = new page_1.Footnote();
            this.isFootnoteWidget = false;
            this.isDragStarted = false;
            this.isMouseDownInSelection = false;
            this.isBookmarkInserted = true;
            this.isAutoResizeCanStart = false;
            this.onTextInput = function (event) {
                if (!_this.isComposingIME) {
                    event.preventDefault();
                    var text = event.data;
                    _this.owner.editor.handleTextInput(text);
                }
            };
            this.compositionStart = function () {
                if (!ej2_base_1.Browser.isDevice && !_this.owner.isReadOnlyMode) {
                    _this.isComposingIME = true;
                    _this.positionEditableTarget();
                    if (_this.owner.editorHistory) {
                        _this.owner.editor.initComplexHistory('IMEInput');
                    }
                }
                _this.isCompositionStart = true;
            };
            this.compositionUpdated = function () {
                if (_this.isComposingIME && !_this.owner.isReadOnlyMode) {
                    setTimeout(function () {
                        _this.owner.editor.insertIMEText(_this.getEditableDivTextContent(), true);
                    }, 0);
                }
                _this.isCompositionUpdated = true;
            };
            this.compositionEnd = function (event) {
                if (_this.isComposingIME && !_this.owner.isReadOnlyMode) {
                    var text = _this.getEditableDivTextContent();
                    if (text !== '') {
                        _this.owner.editor.insertIMEText(text, false);
                    }
                    _this.isComposingIME = false;
                    _this.lastComposedText = '';
                    _this.iframe.setAttribute('style', 'pointer-events:none;position:absolute;left:' + _this.owner.viewer.containerLeft + 'px;top:' + _this.owner.viewer.containerTop + 'px;outline:none;background-color:transparent;width:0px;height:0px;overflow:hidden');
                    _this.editableDiv.innerHTML = '';
                    if (_this.owner.editorHistory) {
                        if (text !== '') {
                            _this.owner.editor.isSkipOperationsBuild = true;
                        }
                        _this.owner.editorHistory.updateComplexHistory();
                        if (text === '') {
                            _this.owner.editor.isSkipOperationsBuild = true;
                            _this.owner.editorHistory.undo();
                            _this.owner.editorHistory.redoStack.pop();
                        }
                        _this.owner.editor.isSkipOperationsBuild = false;
                    }
                }
                event.preventDefault();
                _this.isCompositionUpdated = false;
                _this.isCompositionEnd = true;
            };
            this.onImageResizer = function (args) {
                if (!ej2_base_2.isNullOrUndefined(_this.owner) && !ej2_base_2.isNullOrUndefined(_this.owner.imageResizerModule) &&
                    _this.owner.imageResizerModule.isImageResizerVisible && _this.owner.imageResizerModule.isImageResizing) {
                    if (args instanceof MouseEvent) {
                        _this.onMouseUpInternal(args);
                    }
                    else if (args instanceof TouchEvent) {
                        _this.onTouchUpInternal(args);
                    }
                }
                if (_this.scrollMoveTimer) {
                    _this.isMouseEntered = true;
                    clearInterval(_this.scrollMoveTimer);
                }
            };
            this.onKeyPressInternal = function (event) {
                var key = event.which || event.keyCode;
                _this.triggerElementsOnLoading = false;
                var ctrl = (event.ctrlKey || event.metaKey) ? true : ((key === 17) ? true : false);
                var alt = event.altKey ? event.altKey : ((key === 18) ? true : false);
                if (ej2_base_1.Browser.isIE && alt && ctrl) {
                    ctrl = false;
                }
                if (ctrl && event.key === 'v' || ctrl && event.key === 'a' || (ctrl || (_this.isControlPressed && ej2_base_1.Browser.isIE)) && event.key === 'p') {
                    if (ej2_base_1.Browser.isIE) {
                        _this.isControlPressed = false;
                    }
                    return;
                }
                if (!_this.owner.isReadOnlyMode || (_this.selection && _this.selection.isInlineFormFillMode())) {
                    var key_1 = event.keyCode || event.charCode;
                    var char = '';
                    if (key_1) {
                        char = String.fromCharCode(key_1);
                    }
                    else if (event.key) {
                        char = event.key;
                    }
                    if (char !== ' ' && char !== '\r' && char !== '\b' && char !== String.fromCharCode(27) && !ctrl) {
                        _this.owner.editorModule.handleTextInput(char);
                    }
                    else if (char === ' ') {
                        _this.triggerSpellCheck = true;
                        _this.owner.editorModule.handleTextInput(' ');
                        _this.triggerSpellCheck = false;
                    }
                    event.preventDefault();
                }
                _this.owner.focusIn();
            };
            this.onTextInputInternal = function (event) {
                if (!_this.owner.isReadOnlyMode) {
                    _this.owner.editorModule.onTextInputInternal();
                }
                else {
                    _this.editableDiv.innerText = '';
                }
            };
            this.onPaste = function (event) {
                if ((!_this.owner.isReadOnlyMode && _this.owner.editor.canEditContentControl) || _this.selection.isInlineFormFillMode()) {
                    _this.owner.editorModule.pasteInternal(event);
                }
                _this.editableDiv.innerText = '';
                event.preventDefault();
            };
            this.onFocusOut = function () {
                if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                    if (_this.owner.contextMenuModule && _this.owner.contextMenuModule.contextMenuInstance &&
                        _this.owner.contextMenuModule.contextMenuInstance.element.style.display === 'block') {
                        return;
                    }
                    _this.selection.hideCaret();
                }
            };
            this.updateFocus = function () {
                if (_this.owner.enableCollaborativeEditing && _this.owner.editor.isRemoteAction) {
                    return;
                }
                if (!ej2_base_2.isNullOrUndefined(_this.currentSelectedComment) && !_this.owner.commentReviewPane.commentPane.isEditMode) {
                    if (_this.owner.commentReviewPane && _this.owner.commentReviewPane.commentPane.isEditMode) {
                        _this.owner.commentReviewPane.commentPane.selectComment(_this.currentSelectedComment);
                    }
                    _this.selection.hideCaret();
                    return;
                }
                if (_this.selection && !(_this.isMobileDevice && _this.owner.isReadOnly)) {
                    if (navigator !== undefined && !ej2_base_1.Browser.isDevice && !ej2_base_1.Browser.isIE && !navigator.userAgent.match('Edge')
                        && !ej2_base_2.isNullOrUndefined(_this.iframe)) {
                        _this.iframe.focus();
                    }
                    if (!ej2_base_2.isNullOrUndefined(_this.editableDiv)) {
                        _this.editableDiv.focus();
                    }
                    _this.selection.showCaret();
                }
            };
            this.scrollHandler = function () {
                if (_this.scrollTimer) {
                    clearTimeout(_this.scrollTimer);
                }
                _this.clearContent();
                _this.isScrollHandler = true;
                if (!ej2_base_1.Browser.isDevice && !_this.isComposingIME) {
                    _this.iframe.style.top = _this.owner.viewer.containerTop + 'px';
                    _this.iframe.style.left = _this.owner.viewer.containerLeft + 'px';
                }
                if (_this.owner.hRuler) {
                    var hRuler = document.getElementById(_this.owner.element.id + ('_hRulerBottom'));
                    hRuler.style.top = _this.viewerContainer.scrollTop + 'px';
                    var markIndicator = document.getElementById(_this.owner.element.id + ('_markIndicator'));
                    if (markIndicator) {
                        markIndicator.style.top = _this.viewerContainer.scrollTop + 'px';
                    }
                }
                if (_this.owner.vRuler) {
                    var vRuler = document.getElementById(_this.owner.element.id + ('_vRulerBottom'));
                    vRuler.style.left = _this.viewerContainer.scrollLeft + 'px';
                    var markIndicator = document.getElementById(_this.owner.element.id + ('_markIndicator'));
                    if (markIndicator) {
                        markIndicator.style.left = _this.viewerContainer.scrollLeft + 'px';
                    }
                }
                if (_this.owner.rulerHelper && !ej2_base_2.isNullOrUndefined(_this.owner.rulerHelper.vRulerBottom)) {
                    _this.owner.rulerHelper.vRulerBottom.style.height = _this.pageContainer.offsetHeight + 'px';
                }
                _this.owner.viewer.updateScrollBars();
                var vtHeight = _this.owner.viewer.containerTop + _this.visibleBounds.height - (_this.owner.viewer.padding.top + _this.owner.viewer.padding.bottom);
                if (vtHeight > _this.pageContainer.offsetHeight) {
                    _this.viewerContainer.scrollTop = _this.owner.viewer.containerTop - (vtHeight - _this.pageContainer.offsetHeight);
                }
                if (_this.owner.viewer instanceof PageLayoutViewer && !ej2_base_2.isNullOrUndefined(_this.owner)) {
                    _this.owner.fireViewChange();
                }
                _this.isScrollHandler = false;
                _this.scrollTimer = setTimeout(function () {
                    if (!_this.isScrollHandler && !ej2_base_2.isNullOrUndefined(_this.owner) && _this.owner.isSpellCheck) {
                        _this.isScrollToSpellCheck = true;
                        _this.owner.viewer.updateScrollBars();
                    }
                }, 200);
            };
            this.onWindowResize = function () {
                if (_this.resizeTimer) {
                    clearTimeout(_this.resizeTimer);
                }
                _this.resizeTimer = setTimeout(function () {
                    if (!ej2_base_2.isNullOrUndefined(_this.owner) && !ej2_base_2.isNullOrUndefined(_this.owner.element)) {
                        _this.updateViewerSize();
                        if (_this.owner.rulerHelper && _this.owner.documentEditorSettings && _this.owner.documentEditorSettings.showRuler) {
                            _this.owner.rulerHelper.updateRuler(_this.owner, true);
                        }
                        _this.clearContent();
                        _this.owner.viewer.updateScrollBars();
                        if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                            _this.selection.updateCaretPosition();
                        }
                        _this.updateTouchMarkPosition();
                        if (_this.owner.contextMenuModule && _this.owner.contextMenuModule.contextMenuInstance) {
                            _this.owner.contextMenuModule.contextMenuInstance.close();
                        }
                        if (_this.resizeTimer) {
                            clearTimeout(_this.resizeTimer);
                        }
                    }
                }, 200);
            };
            this.onContextMenu = function (event) {
                if (_this.owner.contextMenuModule) {
                    if (_this.isMouseDown) {
                        _this.isMouseDown = false;
                    }
                    _this.owner.contextMenuModule.onContextMenuInternal(event);
                    _this.updateFocus();
                }
            };
            this.onMouseDownInternal = function (event) {
                var target = event.target;
                _this.owner.focusIn();
                if ((!ej2_base_2.isNullOrUndefined(target) && target !== _this.viewerContainer) || _this.owner.isTableMarkerDragging || _this.isTouchInput ||
                    event.offsetX > (_this.visibleBounds.width - (_this.visibleBounds.width - _this.viewerContainer.clientWidth))
                    || event.offsetY > (_this.visibleBounds.height - (_this.visibleBounds.height - _this.viewerContainer.clientHeight))) {
                    return;
                }
                _this.isFootnoteWidget = false;
                if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                    _this.updateCursor(event);
                    if (_this.formFillPopup) {
                        _this.formFillPopup.hidePopup();
                    }
                    if (_this.isLeftButtonPressed(event) && !_this.owner.isReadOnlyMode && _this.owner.enableImageResizerMode && !ej2_base_2.isNullOrUndefined(_this.owner.imageResizerModule.selectedResizeElement)) {
                        if (_this.selection.isInShape) {
                            var textFram = _this.owner.selection.getCurrentTextFrame();
                            var shape = textFram.containerShape;
                            _this.selection.selectShape(shape);
                        }
                        _this.owner.imageResizerModule.isImageResizing = true;
                    }
                    event.preventDefault();
                    if (!_this.isTouchInput) {
                        _this.selection.hideCaret();
                    }
                    var cursorPoint = new editor_helper_1.Point(event.offsetX, event.offsetY);
                    var touchPoint = _this.owner.viewer.findFocusedPage(cursorPoint, true, true);
                    _this.mouseDownOffset.x = touchPoint.x;
                    _this.mouseDownOffset.y = touchPoint.y;
                    _this.isMouseDownInFooterRegion = _this.selection.isCursorInsidePageRect(cursorPoint, _this.currentPage) && _this.selection.isCursorInFooterRegion(cursorPoint, _this.currentPage);
                    _this.isSelectionChangedOnMouseMoved = false;
                    if (!_this.owner.isReadOnlyMode && (_this.owner.editorModule.tableResize.isInCellResizerArea(touchPoint) ||
                        _this.owner.editorModule.tableResize.isInRowResizerArea(touchPoint))) {
                        _this.selection.hideCaret();
                        _this.isMouseDown = true;
                        _this.isSelectionChangedOnMouseMoved = false;
                        if (_this.isLeftButtonPressed(event)) {
                            _this.owner.editorModule.tableResize.startingPoint.x = touchPoint.x;
                            _this.owner.editorModule.tableResize.startingPoint.y = touchPoint.y;
                            _this.owner.editorModule.tableResize.handleResize(touchPoint);
                        }
                        return;
                    }
                    if (event.ctrlKey) {
                        _this.isControlPressed = true;
                    }
                    if (_this.owner.selection.isEmpty) {
                        _this.useTouchSelectionMark = false;
                    }
                    var widget = _this.getLineWidget(touchPoint);
                    if (event.which === 3 && !_this.owner.selection.isEmpty
                        && _this.selection.checkCursorIsInSelection(widget, touchPoint)) {
                        event.preventDefault();
                        return;
                    }
                    if (_this.owner && _this.owner.documentEditorSettings && _this.owner.documentEditorSettings.allowDragAndDrop &&
                        !_this.owner.selection.isEmpty
                        && _this.selection.checkCursorIsInSelection(widget, touchPoint)) {
                        _this.isMouseDownInSelection = true;
                    }
                    _this.isTouchInput = false;
                    _this.isMouseDown = true;
                    _this.updateFocus();
                    _this.timer = setTimeout(function () {
                        _this.tapCount++;
                        if (_this.tapCount > 1) {
                            _this.tapCount = 1;
                        }
                        if (!_this.isScrollHandler && !ej2_base_2.isNullOrUndefined(_this.owner) && _this.owner.isSpellCheck) {
                            _this.isScrollToSpellCheck = true;
                            _this.owner.viewer.updateScrollBars();
                        }
                    }, 100);
                }
            };
            this.onMouseMoveInternal = function (event) {
                if (!ej2_base_2.isNullOrUndefined(event.target) && event.target !== _this.viewerContainer || _this.owner.isTableMarkerDragging) {
                    return;
                }
                event.preventDefault();
                if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                    if (!_this.owner.isReadOnlyMode && _this.owner.enableImageResizerMode
                        && _this.owner.imageResizerModule.isImageResizing) {
                        if (!_this.owner.imageResizerModule.isImageMoveToNextPage) {
                            _this.owner.imageResizerModule.handleImageResizingOnMouse(event);
                        }
                        return;
                    }
                    var cursorPoint = new editor_helper_1.Point(event.offsetX, event.offsetY);
                    var touchPoint = _this.owner.viewer.findFocusedPage(cursorPoint, !_this.owner.enableHeaderAndFooter);
                    var widget = _this.getLineWidget(touchPoint);
                    if (_this.isMouseDown) {
                        if (!ej2_base_2.isNullOrUndefined(_this.currentPage)) {
                            var xPosition = touchPoint.x;
                            var yPosition = touchPoint.y;
                            if (!_this.owner.isReadOnlyMode && _this.isRowOrCellResizing) {
                                var table = _this.owner.editorModule.tableResize.currentResizingTable;
                                var startPosition = _this.selection.setPositionForBlock(table, true);
                                var endPosition = _this.selection.setPositionForBlock(table, false);
                                if (!(_this.owner.documentHelper.isDocumentProtected) || _this.selection.checkSelectionIsAtEditRegion(startPosition, endPosition)) {
                                    _this.owner.editorModule.tableResize.handleResizing(touchPoint);
                                }
                            }
                            else {
                                if ((!_this.isDragStarted
                                    && _this.isMouseDownInSelection
                                    && _this.isLeftButtonPressed(event)
                                    && !_this.owner.selection.isEmpty
                                    && _this.selection.checkCursorIsInSelection(widget, touchPoint)) || (!_this.owner.isReadOnlyMode && _this.owner.enableImageResizerMode && !_this.isDragStarted && _this.isLeftButtonPressed(event) && !_this.owner.selection.isEmpty && !ej2_base_2.isNullOrUndefined(widget) && _this.owner.imageResizerModule.selectedImageWidget.containsKey(widget) && !_this.owner.imageResizerModule.isImageResizing)) {
                                    _this.isDragStarted = true;
                                    _this.isMouseDownInSelection = false;
                                    if (_this.selection.isForward) {
                                        _this.dragStartParaInfo = _this.selection.getParagraphInfo(_this.selection.start);
                                        _this.dragEndParaInfo = _this.selection.getParagraphInfo(_this.selection.end);
                                    }
                                    else {
                                        _this.dragStartParaInfo = _this.selection.getParagraphInfo(_this.selection.end);
                                        _this.dragEndParaInfo = _this.selection.getParagraphInfo(_this.selection.start);
                                    }
                                    _this.selection.caret.classList.remove("e-de-cursor-animation");
                                }
                                if (!(_this.isTouchInput || _this.isSelectionChangedOnMouseMoved || _this.touchDownOnSelectionMark > 0 || _this.isDragStarted)) {
                                    _this.updateTextPositionForSelection(touchPoint, 1);
                                }
                                if (_this.isLeftButtonPressed(event) && !_this.isDragStarted) {
                                    event.preventDefault();
                                    var touchY = yPosition;
                                    var textPosition = _this.owner.selection.end;
                                    var touchPoint_1 = new editor_helper_1.Point(xPosition, touchY);
                                    if (!_this.owner.enableImageResizerMode || !_this.owner.imageResizerModule.isImageResizerVisible
                                        || _this.owner.imageResizerModule.isShapeResize) {
                                        _this.isCompleted = false;
                                        _this.owner.selection.moveTextPosition(touchPoint_1, textPosition);
                                    }
                                    _this.isSelectionChangedOnMouseMoved = true;
                                }
                                if (_this.isDragStarted && _this.isLeftButtonPressed(event)) {
                                    _this.autoScrollOnSelection(cursorPoint);
                                    _this.selection.updateTextPosition(widget, touchPoint);
                                }
                            }
                        }
                        _this.selection.checkForCursorVisibility();
                    }
                    if (!_this.isRowOrCellResizing && !_this.isSelectionChangedOnMouseMoved) {
                        _this.updateCursor(event);
                    }
                    if (_this.isRowOrCellResizing) {
                        _this.selection.hideCaret();
                    }
                }
            };
            this.onMouseLeaveInternal = function (event) {
                event.preventDefault();
                var cursorPoint = new editor_helper_1.Point(event.offsetX, event.offsetY);
                if (_this.isMouseDown) {
                    var viewerTop = _this.viewerContainer.scrollTop;
                    clearInterval(_this.scrollMoveTimer);
                    if (event.offsetY + viewerTop > viewerTop) {
                        _this.scrollMoveTimer = setInterval(function () {
                            _this.scrollForwardOnSelection(cursorPoint);
                        }, 100);
                    }
                    else {
                        _this.scrollMoveTimer = setInterval(function () {
                            _this.scrollBackwardOnSelection(cursorPoint);
                        }, 100);
                    }
                    if (_this.isMouseEntered) {
                        _this.isMouseEntered = false;
                    }
                }
                if (_this.isDragStarted) {
                    _this.selection.hideCaret();
                    if (_this.scrollMoveTimer) {
                        clearInterval(_this.scrollMoveTimer);
                        _this.scrollMoveTimer = 0;
                    }
                }
            };
            this.onMouseEnterInternal = function (event) {
                if (!_this.isMouseEntered) {
                    _this.owner.viewer.updateScrollBars();
                }
                _this.isMouseEntered = true;
                if (_this.scrollMoveTimer) {
                    clearInterval(_this.scrollMoveTimer);
                }
                if (!_this.isLeftButtonPressed(event) && _this.isDragStarted) {
                    if (!_this.selection.caret.classList.contains("e-de-cursor-animation")) {
                        _this.selection.caret.classList.add("e-de-cursor-animation");
                    }
                    _this.isDragStarted = false;
                }
                if (!_this.isLeftButtonPressed(event) && _this.isMouseDown) {
                    _this.onMouseUpInternal(event);
                }
            };
            this.onDoubleTap = function (event) {
                _this.owner.focusIn();
                if (!ej2_base_2.isNullOrUndefined(event.target) && event.target !== _this.viewerContainer) {
                    return;
                }
                if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                    _this.isTouchInput = false;
                    var cursorPoint = new editor_helper_1.Point(event.offsetX, event.offsetY);
                    var touchPoint = _this.owner.viewer.findFocusedPage(cursorPoint, true);
                    if (_this.selection.checkAndEnableHeaderFooter(cursorPoint, _this.owner.viewer.findFocusedPage(cursorPoint, true))) {
                        return;
                    }
                    var widget = _this.getLineWidget(touchPoint);
                    var formField = _this.selection.getHyperLinkFieldInCurrentSelection(widget, touchPoint, true);
                    if (ej2_base_2.isNullOrUndefined(formField)) {
                        formField = _this.selection.getCurrentFormField();
                    }
                    if (!_this.isDocumentProtected && _this.owner.enableFormField) {
                        var formatType = _this.selection.getFormFieldType(formField);
                        if (formatType) {
                            if (formatType.toString() !== '') {
                                _this.selection.selectField(formField);
                            }
                            switch (formatType) {
                                case 'Text':
                                    _this.owner.textFormFieldDialogModule.show();
                                    break;
                                case 'CheckBox':
                                    _this.owner.checkBoxFormFieldDialogModule.show();
                                    break;
                                case 'DropDown':
                                    _this.owner.dropDownFormFieldDialogModule.show();
                                    break;
                            }
                        }
                    }
                    else if (_this.isDocumentProtected && formField && formField.formFieldData instanceof page_1.TextFormField
                        && formField.formFieldData.type === 'Text') {
                        _this.selection.selectField();
                    }
                    var startPosition = _this.selection.start.clone();
                    var endPosition = _this.selection.end.clone();
                    var inlineObj = startPosition.currentWidget.getInline(startPosition.offset, 0);
                    var inline = inlineObj.element;
                    if (_this.owner.layoutType === 'Pages') {
                        if (inline instanceof page_1.FootnoteElementBox) {
                            if (inline.footnoteType === 'Footnote') {
                                var footnotes = _this.currentPage.footnoteWidget;
                                var i = void 0;
                                for (i = 0; i <= footnotes.bodyWidgets.length; i++) {
                                    var footnoteText = (footnotes.bodyWidgets[i]).footNoteReference;
                                    if (inline.text === footnoteText.text) {
                                        break;
                                    }
                                }
                                startPosition.setPositionParagraph(footnotes.bodyWidgets[i].childWidgets[0].childWidgets[0], 0);
                                endPosition.setPositionParagraph(footnotes.bodyWidgets[i].childWidgets[0].childWidgets[0], 0);
                                _this.selection.selectRange(startPosition, endPosition);
                            }
                            else {
                                var endnotes = _this.pages[_this.pages.length - 1].endnoteWidget;
                                var i = void 0;
                                if (!ej2_base_2.isNullOrUndefined(endnotes)) {
                                    for (i = 0; i <= endnotes.childWidgets.length; i++) {
                                        var endnoteText = (endnotes.bodyWidgets[i]).footNoteReference;
                                        if (inline.text === endnoteText.text) {
                                            break;
                                        }
                                    }
                                }
                                startPosition.setPositionParagraph(endnotes.bodyWidgets[i].childWidgets[0].childWidgets[0], 0);
                                endPosition.setPositionParagraph(endnotes.bodyWidgets[i].childWidgets[0].childWidgets[0], 0);
                                _this.selection.selectRange(startPosition, endPosition);
                            }
                        }
                        else {
                            if (inline instanceof page_1.TextElementBox && (_this.selection.isinEndnote || _this.selection.isinFootnote)) {
                                _this.selection.footnoteReferenceElement(startPosition, endPosition, inline);
                            }
                        }
                    }
                    if (_this.selection.isEmpty && !ej2_base_2.isNullOrUndefined(_this.currentPage) && !ej2_base_2.isNullOrUndefined(_this.owner.selection.start)) {
                        _this.owner.selection.selectCurrentWord();
                        _this.selection.checkForCursorVisibility();
                        _this.tapCount = 2;
                    }
                }
            };
            this.onMouseUpInternal = function (event) {
                if (!ej2_base_2.isNullOrUndefined(event.target) && event.target !== _this.viewerContainer || _this.owner.isTableMarkerDragging) {
                    return;
                }
                event.preventDefault();
                _this.isListTextSelected = false;
                var cursorPoint = new editor_helper_1.Point(event.offsetX, event.offsetY);
                var touchPoint = _this.owner.viewer.findFocusedPage(cursorPoint, true);
                if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                    var tapCount = 1;
                    if (!ej2_base_1.Browser.isIE) {
                        if (event.detail > 2) {
                            tapCount = event.detail;
                        }
                    }
                    else {
                        tapCount = _this.tapCount;
                    }
                    if (_this.isRowOrCellResizing) {
                        _this.owner.editorModule.tableResize.updateResizingHistory(touchPoint);
                    }
                    if (_this.isMouseDown && !_this.isSelectionChangedOnMouseMoved
                        && !ej2_base_2.isNullOrUndefined(_this.currentPage) && !ej2_base_2.isNullOrUndefined(_this.owner.selection.start)
                        && (!_this.owner.enableImageResizerMode || !_this.owner.imageResizerModule.isImageResizing)) {
                        if (_this.touchDownOnSelectionMark === 0 && !_this.isRowOrCellResizing) {
                            var isShiftKeyPressed = event.shiftKey;
                            if (isShiftKeyPressed) {
                                var textPosition = _this.owner.selection.end;
                                _this.owner.selection.moveTextPosition(touchPoint, textPosition);
                            }
                            else {
                                _this.updateTextPositionForSelection(touchPoint, tapCount);
                            }
                            if (ej2_base_1.Browser.isIE && tapCount === 2) {
                                _this.selection.checkAndEnableHeaderFooter(cursorPoint, touchPoint);
                            }
                        }
                        _this.selection.checkForCursorVisibility();
                        if (!ej2_base_2.isNullOrUndefined(_this.currentSelectedComment) && _this.owner.commentReviewPane
                            && !_this.owner.commentReviewPane.commentPane.isEditMode) {
                            _this.currentSelectedComment = undefined;
                        }
                    }
                    var isCtrlkeyPressed = _this.isIosDevice ? event.metaKey : event.ctrlKey;
                    if (!ej2_base_2.isNullOrUndefined(_this.currentPage) && !ej2_base_2.isNullOrUndefined(_this.owner.selection.start)
                        && (_this.owner.selection.isEmpty || _this.owner.selection.isImageSelected) &&
                        (((isCtrlkeyPressed && _this.owner.useCtrlClickToFollowHyperlink ||
                            !_this.owner.useCtrlClickToFollowHyperlink) && _this.isLeftButtonPressed(event) === true))) {
                        _this.selection.navigateHyperLinkOnEvent(touchPoint, false);
                    }
                    if (_this.isMouseDown && _this.isLeftButtonPressed(event) && _this.isDocumentProtected
                        && _this.protectionType === 'FormFieldsOnly' && _this.selection) {
                        var widget = _this.getLineWidget(touchPoint);
                        var formField = _this.selection.getHyperLinkFieldInCurrentSelection(widget, touchPoint, true);
                        if (ej2_base_2.isNullOrUndefined(formField)) {
                            formField = _this.selection.getCurrentFormField(true);
                        }
                        if (formField && formField.formFieldData && formField.formFieldData.enabled && !_this.selection.isInlineFormFillMode(formField)) {
                            var data = { 'fieldName': formField.formFieldData.name };
                            if (formField.formFieldData instanceof page_1.TextFormField) {
                                data.value = formField.resultText;
                            }
                            else if (formField.formFieldData instanceof page_1.CheckBoxFormField) {
                                data.value = formField.formFieldData.checked;
                            }
                            else {
                                data.value = formField.formFieldData.selectedIndex;
                            }
                            data.isCanceled = false;
                            if (_this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Popup' && _this.selection.previousSelectedFormField !== _this.selection.getCurrentFormField()) {
                                _this.owner.trigger(index_3.beforeFormFieldFillEvent, data);
                            }
                            else {
                                _this.owner.trigger(index_3.beforeFormFieldFillEvent, data);
                            }
                            if (!data.isCanceled) {
                                if (_this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Popup' && !(formField.formFieldData instanceof page_1.CheckBoxFormField)
                                    || (formField.formFieldData instanceof page_1.TextFormField && !(formField.formFieldData.type === 'Text'))
                                    || formField.formFieldData instanceof page_1.DropDownFormField) {
                                    _this.formFillPopup.showPopUp(formField);
                                }
                                else {
                                    _this.owner.editor.toggleCheckBoxFormField(formField);
                                    data.value = formField.formFieldData.checked;
                                    data.isCanceled = false;
                                    _this.owner.trigger(index_3.afterFormFieldFillEvent, data);
                                }
                            }
                        }
                        if (!formField && _this.isFormFillProtectedMode) {
                            _this.selection.navigateToNextFormField();
                        }
                    }
                    else if (_this.isMouseDown) {
                        if (_this.formFields.length > 0) {
                            var formField = _this.selection.getCurrentFormField(true);
                            if (formField && formField.formFieldData instanceof page_1.TextFormField) {
                                _this.selection.selectField();
                            }
                            else if (_this.isLeftButtonPressed(event) && formField && formField.formFieldData instanceof page_1.DropDownFormField) {
                                var offset = formField.line.getOffset(formField, 0);
                                var point = _this.selection.getPhysicalPositionInternal(formField.line, offset, false);
                                _this.selection.selectInternal(formField.line, formField, 0, point);
                            }
                        }
                        if (_this.isSelectionChangedOnMouseMoved) {
                            _this.selection.fireSelectionChanged(true);
                        }
                    }
                    if (!_this.owner.isReadOnlyMode && _this.isSelectionInListText(touchPoint)) {
                        _this.selection.selectListText();
                    }
                    if (!_this.owner.isReadOnlyMode && _this.owner.enableImageResizerMode && _this.owner.imageResizerModule.isImageResizing) {
                        _this.owner.imageResizerModule.mouseUpInternal();
                        _this.scrollToPosition(_this.owner.selection.start, _this.owner.selection.end);
                        _this.owner.imageResizerModule.isImageResizing = false;
                    }
                    if (_this.owner.enableImageResizerMode && _this.owner.imageResizerModule.isImageResizerVisible && !ej2_base_2.isNullOrUndefined(_this.selection.caret)) {
                        _this.selection.caret.style.display = 'none';
                    }
                    if (_this.isDragStarted) {
                        _this.moveSelectedContent();
                    }
                    if (_this.isMouseDown) {
                        _this.updateFocus();
                    }
                    _this.isMouseDownInSelection = false;
                    _this.isMouseDown = false;
                    _this.isFootnoteWidget = false;
                    _this.isSelectionChangedOnMouseMoved = false;
                    _this.isTouchInput = false;
                    _this.useTouchSelectionMark = true;
                    _this.isControlPressed = false;
                    if (_this.isListTextSelected) {
                        _this.selection.hideCaret();
                    }
                    if (_this.owner.enableImageResizerMode) {
                        var imageResizer = _this.owner.imageResizerModule;
                        imageResizer.isImageResizing = false;
                        imageResizer.isImageMoveToNextPage = false;
                        imageResizer.leftValue = undefined;
                        imageResizer.topValue = undefined;
                    }
                    _this.isMouseDownInFooterRegion = false;
                }
                if (_this.selection) {
                    _this.selection.isCellPrevSelected = false;
                }
            };
            this.onTouchStartInternal = function (event) {
                if (_this.selection) {
                    _this.isTouchMoved = false;
                    _this.isCompositionStart = false;
                    _this.isCompositionEnd = false;
                    _this.isCompositionUpdated = false;
                    _this.isCompositionCanceled = true;
                    _this.isTouchInput = true;
                    if (_this.isTimerStarted) {
                        if (_this.tapCount === 1) {
                            _this.tapCount = 2;
                        }
                        else {
                            _this.tapCount = 3;
                            _this.isTimerStarted = false;
                        }
                    }
                    else {
                        _this.isTimerStarted = true;
                        _this.tapCount = 1;
                    }
                    if (event.touches.length === 1) {
                        _this.zoomX = event.touches[0].clientX;
                        _this.zoomY = event.touches[0].clientY;
                        if (_this.owner.selection.isEmpty) {
                            _this.useTouchSelectionMark = false;
                        }
                        _this.isMouseDown = true;
                        _this.isSelectionChangedOnMouseMoved = false;
                        var point = void 0;
                        if (_this.isMouseDown) {
                            point = _this.getTouchOffsetValue(event);
                        }
                        point = _this.owner.viewer.findFocusedPage(point, true, true);
                        if (_this.owner.enableImageResizerMode) {
                            var resizeObj = _this.owner.imageResizerModule.getImagePointOnTouch(point);
                            _this.owner.imageResizerModule.selectedResizeElement = resizeObj.selectedElement;
                        }
                        if (_this.owner.enableImageResizerMode && !ej2_base_2.isNullOrUndefined(_this.owner.imageResizerModule.selectedResizeElement)) {
                            _this.owner.imageResizerModule.isImageResizing = true;
                        }
                        if (ej2_base_1.Browser.isDevice) {
                            _this.editableDiv.contentEditable = _this.owner.isReadOnlyMode ? 'false' : 'true';
                        }
                        var x = _this.owner.selection.end.location.x;
                        var y = _this.selection.getCaretBottom(_this.owner.selection.end, _this.owner.selection.isEmpty) + 9;
                        _this.touchDownOnSelectionMark = ((point.y <= y && point.y >= y - 20 || point.y >= y && point.y <= y + 20)
                            && (point.x <= x && point.x >= x - 20 || point.x >= x && point.x <= x + 20)) ? 1 : 0;
                        if (!_this.owner.selection.isEmpty && _this.touchDownOnSelectionMark === 0) {
                            x = _this.owner.selection.start.location.x;
                            y = _this.selection.getCaretBottom(_this.owner.selection.start, false) + 9;
                            _this.touchDownOnSelectionMark = ((point.y <= y && point.y >= y - 20 || point.y >= y && point.y <= y + 20)
                                && (point.x <= x && point.x >= x - 20 || point.x >= x && point.x <= x + 20)) ? 2 : 0;
                        }
                    }
                    if (!ej2_base_2.isNullOrUndefined(_this.owner.contextMenuModule) && _this.owner.contextMenuModule.contextMenuInstance) {
                        _this.owner.contextMenuModule.contextMenuInstance.close();
                    }
                    if (_this.touchDownOnSelectionMark || event.touches.length > 1) {
                        event.preventDefault();
                    }
                    _this.longTouchTimer = setTimeout(_this.onLongTouch, 500, event);
                    _this.timer = setTimeout(function () {
                        _this.isTimerStarted = false;
                    }, 200);
                    _this.owner.focusIn();
                }
            };
            this.onLongTouch = function (event) {
                if (ej2_base_2.isNullOrUndefined(_this.owner) || ej2_base_2.isNullOrUndefined(_this.viewerContainer) || _this.isTouchMoved || event.touches.length !== 1) {
                    return;
                }
                var point = _this.getTouchOffsetValue(event);
                var pointRelToPage = _this.owner.viewer.findFocusedPage(point, true);
                var selStart = _this.selection.start;
                var selEnd = _this.selection.end;
                var updateSel = false;
                if (!_this.selection.isForward) {
                    selStart = _this.selection.end;
                    selEnd = _this.selection.start;
                }
                var selStartPt = selStart.location;
                var selEndPt = selEnd.location;
                if (selStart.currentWidget !== selEnd.currentWidget) {
                    updateSel = !(pointRelToPage.x >= selStartPt.x && pointRelToPage.x <= selEndPt.x)
                        && !(pointRelToPage.y >= selStartPt.y && pointRelToPage.y <= selEndPt.y);
                }
                else {
                    updateSel = !(pointRelToPage.x >= selStartPt.x && pointRelToPage.x <= selEndPt.x)
                        || !(pointRelToPage.y >= selStartPt.y && pointRelToPage.y <= selEndPt.y);
                }
                if (event.changedTouches.length === 1 && updateSel) {
                    _this.updateSelectionOnTouch(point, pointRelToPage);
                    _this.isMouseDown = false;
                    _this.touchDownOnSelectionMark = 0;
                    _this.useTouchSelectionMark = true;
                    _this.isSelectionChangedOnMouseMoved = false;
                }
                if (_this.selection.isEmpty) {
                    _this.selection.selectCurrentWord();
                }
                if (!ej2_base_2.isNullOrUndefined(_this.owner.contextMenuModule) && _this.owner.contextMenuModule.contextMenuInstance) {
                    _this.owner.contextMenuModule.onContextMenuInternal(event);
                }
            };
            this.onTouchMoveInternal = function (event) {
                _this.isTouchMoved = true;
                var touch = event.touches;
                var cursorPoint;
                if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                    if (_this.owner.editorModule && _this.owner.enableImageResizerMode && _this.owner.imageResizerModule.isImageResizing) {
                        event.preventDefault();
                        if (!_this.owner.imageResizerModule.isImageMoveToNextPage) {
                            _this.owner.imageResizerModule.handleImageResizingOnTouch(event);
                            _this.selection.caret.style.display = 'none';
                        }
                        return;
                    }
                    if (_this.isMouseDown) {
                        cursorPoint = _this.getTouchOffsetValue(event);
                        var touchPoint = _this.owner.viewer.findFocusedPage(cursorPoint, true);
                        if (_this.touchDownOnSelectionMark > 0) {
                            _this.isCompleted = false;
                            event.preventDefault();
                            var touchY = touchPoint.y;
                            var textPosition = _this.owner.selection.end;
                            var touchPointer = void 0;
                            if (touchPoint.y <= 26) {
                                touchY -= touchPoint.y < 0 ? 0 : touchPoint.y + 0.5;
                            }
                            else {
                                touchY -= 36.5;
                            }
                            textPosition = _this.touchDownOnSelectionMark === 2 ? _this.selection.start : _this.selection.end;
                            touchPoint = new editor_helper_1.Point(touchPoint.x, touchY);
                            _this.owner.selection.moveTextPosition(touchPoint, textPosition);
                            _this.isSelectionChangedOnMouseMoved = true;
                        }
                        _this.selection.checkForCursorVisibility();
                        _this.updateTouchMarkPosition();
                    }
                }
                if (touch.length > 1) {
                    event.preventDefault();
                    _this.isMouseDown = false;
                    _this.zoomX = (touch[0].clientX + touch[1].clientX) / 2;
                    _this.zoomY = (touch[0].clientY + touch[1].clientY) / 2;
                    var currentDiff = Math.sqrt(Math.pow((touch[0].clientX - touch[1].clientX), 2) + Math.pow((touch[0].clientY - touch[1].clientY), 2));
                    if (_this.preDifference > -1) {
                        if (currentDiff > _this.preDifference) {
                            _this.onPinchOutInternal(event);
                        }
                        else if (currentDiff < _this.preDifference) {
                            _this.onPinchInInternal(event);
                        }
                    }
                    else if (_this.zoomFactor < 2) {
                        if (_this.preDifference !== -1) {
                            if (currentDiff > _this.preDifference) {
                                _this.onPinchInInternal(event);
                            }
                        }
                    }
                    else if (_this.preDifference === -1) {
                        if (_this.zoomFactor > 2) {
                            if (currentDiff > _this.preDifference) {
                                _this.onPinchInInternal(event);
                            }
                        }
                    }
                    _this.preDifference = currentDiff;
                }
                if (_this.longTouchTimer) {
                    clearTimeout(_this.longTouchTimer);
                    _this.longTouchTimer = undefined;
                }
            };
            this.onTouchUpInternal = function (event) {
                if (!ej2_base_2.isNullOrUndefined(_this.selection)) {
                    var point = _this.getTouchOffsetValue(event);
                    var touchPoint = _this.owner.viewer.findFocusedPage(point, true);
                    if (event.changedTouches.length === 1) {
                        if (!_this.isTouchMoved || (_this.owner.enableImageResizerMode && _this.owner.imageResizerModule.isImageResizing)) {
                            _this.updateSelectionOnTouch(point, touchPoint);
                            if (!ej2_base_2.isNullOrUndefined(_this.currentPage) && !ej2_base_2.isNullOrUndefined(_this.selection.start)
                                && !_this.isSelectionChangedOnMouseMoved && (_this.selection.isEmpty ||
                                _this.selection.isImageField() && (!_this.owner.enableImageResizerMode ||
                                    _this.owner.enableImageResizerMode && !_this.owner.imageResizerModule.isImageResizing))) {
                                _this.selection.navigateHyperLinkOnEvent(touchPoint, true);
                            }
                        }
                        if (_this.isSelectionChangedOnMouseMoved) {
                            _this.selection.fireSelectionChanged(true);
                        }
                        _this.isMouseDown = false;
                        _this.touchDownOnSelectionMark = 0;
                        _this.useTouchSelectionMark = true;
                        _this.isSelectionChangedOnMouseMoved = false;
                    }
                    if (_this.owner.enableImageResizerMode && _this.owner.imageResizerModule.isImageResizing) {
                        _this.owner.imageResizerModule.mouseUpInternal();
                        _this.owner.imageResizerModule.isImageResizing = false;
                        _this.owner.imageResizerModule.isImageMoveToNextPage = false;
                        _this.scrollToPosition(_this.owner.selection.start, _this.owner.selection.end);
                    }
                    if (_this.owner.enableImageResizerMode && _this.owner.imageResizerModule.isImageResizerVisible && _this.isTouchInput) {
                        _this.touchStart.style.display = 'none';
                        _this.touchEnd.style.display = 'none';
                    }
                    event.preventDefault();
                }
                _this.preDifference = -1;
                _this.isTouchInput = false;
                if (_this.longTouchTimer) {
                    clearTimeout(_this.longTouchTimer);
                    _this.longTouchTimer = undefined;
                }
                if (!_this.isTimerStarted) {
                    _this.tapCount = 1;
                }
                if (_this.isListTextSelected) {
                    _this.selection.hideCaret();
                }
                _this.owner.focusIn();
            };
            this.onKeyUpInternal = function (event) {
                if (ej2_base_1.Browser.isDevice && event.target === _this.editableDiv) {
                    if (window.getSelection().anchorOffset !== _this.prefix.length) {
                        _this.selection.setEditableDivCaretPosition(_this.editableDiv.innerText.length);
                    }
                }
                if (event.ctrlKey || (event.keyCode === 17 || event.which === 17)) {
                    _this.isControlPressed = false;
                }
            };
            this.onKeyDownInternal = function (event) {
                if (!ej2_base_2.isNullOrUndefined(event.target) && event.target !== _this.editableDiv) {
                    return;
                }
                _this.owner.focusIn();
                var isHandled = false;
                var keyEventArgs = { 'event': event, 'isHandled': false, source: _this.owner };
                _this.owner.trigger(index_3.keyDownEvent, keyEventArgs);
                if (keyEventArgs.isHandled) {
                    return;
                }
                var key = event.which || event.keyCode;
                var ctrl = (event.ctrlKey || event.metaKey) ? true : ((key === 17) ? true : false);
                var shift = event.shiftKey ? event.shiftKey : ((key === 16) ? true : false);
                var alt = event.altKey ? event.altKey : ((key === 18) ? true : false);
                if (ctrl && !shift && !alt) {
                    switch (key) {
                        case 80:
                            event.preventDefault();
                            _this.owner.print();
                            isHandled = true;
                            break;
                        case 83:
                            event.preventDefault();
                            _this.owner.save(_this.owner.documentName === '' ? 'sample' : _this.owner.documentName, 'Sfdt');
                            isHandled = true;
                            break;
                    }
                }
                if (!isHandled && !ej2_base_2.isNullOrUndefined(_this.selection)) {
                    _this.selection.onKeyDownInternal(event, ctrl, shift, alt);
                }
                if (isHandled) {
                    event.preventDefault();
                }
                _this.timer = setTimeout(function () {
                    if (!_this.isScrollHandler && !ej2_base_2.isNullOrUndefined(_this.owner) && _this.owner.isSpellCheck) {
                        _this.isScrollToSpellCheck = true;
                        _this.owner.viewer.updateScrollBars();
                    }
                }, 100);
            };
            this.owner = owner;
            this.pages = [];
            this.lists = [];
            this.abstractLists = [];
            this.render = new render_1.Renderer(this);
            this.characterFormat = new index_1.WCharacterFormat(this);
            this.themeFontLanguage = new index_1.WCharacterFormat(this);
            this.paragraphFormat = new index_1.WParagraphFormat(this);
            this.renderedLists = new dictionary_1.Dictionary();
            this.renderedLevelOverrides = [];
            this.headersFooters = [];
            this.styles = new index_1.WStyles();
            this.stylesMap = new dictionary_1.Dictionary();
            if (this.owner) {
                this.L10n = new ej2_base_1.L10n('documenteditor', this.owner.defaultLocale);
                this.L10n.setLocale(this.owner.locale);
            }
            this.preDefinedStyles = new dictionary_1.Dictionary();
            this.initalizeStyles();
            this.bookmarks = new dictionary_1.Dictionary();
            this.editRanges = new dictionary_1.Dictionary();
            this.isIosDevice = typeof window !== 'undefined' ? /Mac|iPad|iPod/i.test(navigator.userAgent) : false;
            this.isMobileDevice = typeof window !== 'undefined' ? /Android|Windows Phone|webOS/i.test(navigator.userAgent) : false;
            this.formFillPopup = new form_field_popup_1.FormFieldPopUp(this.owner);
            this.customXmlData = new dictionary_1.Dictionary();
            this.contentControlCollection = [];
            this.footnoteCollection = [];
            this.endnoteCollection = [];
            this.themes = new themes_1.Themes();
            this.images = new dictionary_1.Dictionary();
        }
        Object.defineProperty(DocumentHelper.prototype, "visibleBounds", {
            get: function () {
                return this.visibleBoundsIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "viewer", {
            get: function () {
                return this.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "containerCanvas", {
            get: function () {
                if (ej2_base_2.isNullOrUndefined(this.containerCanvasIn)) {
                    this.containerCanvasIn = document.createElement('canvas');
                    this.containerCanvasIn.getContext('2d').save();
                }
                if (!ej2_base_2.isNullOrUndefined(this.pageContainer)
                    && this.containerCanvasIn.parentElement !== this.pageContainer) {
                    this.pageContainer.appendChild(this.containerCanvasIn);
                }
                return this.containerCanvasIn;
            },
            enumerable: true,
            configurable: true
        });
        DocumentHelper.prototype.openTextFile = function (text) {
            this.layout.isTextFormat = true;
            var arr = [];
            text = text.replace(/\r\n/g, '\n');
            arr = text.split('\n');
            var widget = [];
            var bodyWidget = new page_2.BodyWidget();
            bodyWidget.sectionFormat = new index_1.WSectionFormat(bodyWidget);
            bodyWidget.childWidgets = widget;
            var paragraph1 = new page_1.ParagraphWidget();
            var line1 = new page_2.LineWidget(paragraph1);
            for (var i = 0; i < arr.length; i++) {
                if (i === arr.length - 1 && arr[i].length === 0) {
                    paragraph1.childWidgets.push(line1);
                    paragraph1.containerWidget = bodyWidget;
                    bodyWidget.childWidgets.push(paragraph1);
                    continue;
                }
                var paragraph = new page_1.ParagraphWidget();
                var line = new page_2.LineWidget(paragraph);
                if (arr[i].length > 0) {
                    var singleLineLength = 90;
                    if (arr[i].length > singleLineLength) {
                        var start = 0;
                        var increment = singleLineLength;
                        var split = void 0;
                        var lineLength = (arr[i].length / singleLineLength) + 1;
                        var count = 0;
                        while (count < lineLength) {
                            if (lineLength - 1 != count) {
                                split = arr[i].substring(start, increment);
                            }
                            else {
                                increment = arr[i].length % singleLineLength;
                                split = arr[i].substring(start, increment);
                            }
                            var textElement = new page_1.TextElementBox();
                            textElement.text = split;
                            line.children.push(textElement);
                            textElement.line = line;
                            count++;
                            increment += singleLineLength;
                            start += singleLineLength;
                        }
                    }
                    else {
                        var textElement = new page_1.TextElementBox();
                        textElement.text = arr[i];
                        line.children.push(textElement);
                        textElement.line = line;
                    }
                }
                paragraph.childWidgets.push(line);
                paragraph.containerWidget = bodyWidget;
                bodyWidget.childWidgets.push(paragraph);
            }
            this.onDocumentChanged([bodyWidget], {});
            this.layout.isTextFormat = false;
        };
        Object.defineProperty(DocumentHelper.prototype, "selectionCanvas", {
            get: function () {
                if (ej2_base_2.isNullOrUndefined(this.selectionCanvasIn)) {
                    this.selectionCanvasIn = document.createElement('canvas');
                    this.selectionCanvas.getContext('2d').save();
                }
                if (!ej2_base_2.isNullOrUndefined(this.pageContainer)
                    && this.selectionCanvasIn.parentElement !== this.pageContainer) {
                    this.pageContainer.appendChild(this.selectionCanvasIn);
                }
                return this.selectionCanvasIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "containerContext", {
            get: function () {
                return this.containerCanvas.getContext('2d');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "selectionContext", {
            get: function () {
                return this.selectionCanvas.getContext('2d');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "currentRenderingPage", {
            get: function () {
                if (this.pages.length === 0) {
                    return undefined;
                }
                return this.pages[this.pages.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "zoomFactor", {
            get: function () {
                return this.zoomFactorInternal;
            },
            set: function (value) {
                if (this.zoomFactorInternal !== value) {
                    this.preZoomFactor = this.zoomFactor;
                    this.zoomFactorInternal = value;
                    this.zoomModule.setZoomFactor();
                    this.owner.zoomFactor = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "selection", {
            get: function () {
                return this.owner.selection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "selectionStartPage", {
            get: function () {
                return this.selectionStartPageIn;
            },
            set: function (value) {
                this.selectionStartPageIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "selectionEndPage", {
            get: function () {
                return this.selectionEndPageIn;
            },
            set: function (value) {
                this.selectionEndPageIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "dialog", {
            get: function () {
                if (!this.dialogInternal) {
                    this.initDialog(this.owner.enableRtl);
                }
                return this.dialogInternal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "dialog2", {
            get: function () {
                if (!this.dialogInternal2) {
                    this.initDialog2(this.owner.enableRtl);
                }
                return this.dialogInternal2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "dialog3", {
            get: function () {
                if (!this.dialogInternal3) {
                    this.initDialog3(this.owner.enableRtl);
                }
                return this.dialogInternal3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "currentSelectedComment", {
            get: function () {
                return this.currentSelectedCommentInternal;
            },
            set: function (value) {
                if (this.owner && this.owner.commentReviewPane) {
                    this.owner.commentReviewPane.previousSelectedComment = this.currentSelectedCommentInternal;
                }
                this.currentSelectedCommentInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "currentSelectedRevision", {
            get: function () {
                return this.currentSelectedRevisionInternal;
            },
            set: function (value) {
                this.currentSelectedRevisionInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "isInlineFormFillProtectedMode", {
            get: function () {
                return this.isFormFillProtectedMode && this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Inline';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "isFormFillProtectedMode", {
            get: function () {
                return this.isDocumentProtected && this.protectionType === 'FormFieldsOnly';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "isCommentOnlyMode", {
            get: function () {
                return this.isDocumentProtected && this.protectionType === 'CommentsOnly';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentHelper.prototype, "isTrackedOnlyMode", {
            get: function () {
                return this.isDocumentProtected && this.protectionType === 'RevisionsOnly';
            },
            enumerable: true,
            configurable: true
        });
        DocumentHelper.prototype.initalizeStyles = function () {
            this.preDefinedStyles.add('Normal', '{"type":"Paragraph","name":"Normal","next":"Normal"}');
            this.preDefinedStyles.add('Heading 1', '{"type":"Paragraph","name":"Heading 1","basedOn":"Normal","next":"Normal","link":"Heading 1 Char","characterFormat":{"fontSize":16.0,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"paragraphFormat":{"leftIndent":0.0,"rightIndent":0.0,"firstLineIndent":0.0,"beforeSpacing":12.0,"afterSpacing":0.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left","outlineLevel":"Level1"}}');
            this.preDefinedStyles.add('Heading 2', '{"type":"Paragraph","name":"Heading 2","basedOn":"Normal","next":"Normal","link":"Heading 2 Char","characterFormat":{"fontSize":13.0,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"paragraphFormat":{"leftIndent":0.0,"rightIndent":0.0,"firstLineIndent":0.0,"beforeSpacing":2.0,"afterSpacing":0.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left","outlineLevel":"Level2"}}');
            this.preDefinedStyles.add('Heading 3', '{"type":"Paragraph","name":"Heading 3","basedOn":"Normal","next":"Normal","link":"Heading 3 Char","characterFormat":{"fontSize":12.0,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"paragraphFormat":{"leftIndent":0.0,"rightIndent":0.0,"firstLineIndent":0.0,"beforeSpacing":2.0,"afterSpacing":0.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left","outlineLevel":"Level3"}}');
            this.preDefinedStyles.add('Heading 4', '{"type":"Paragraph","name":"Heading 4","basedOn":"Normal","next":"Normal","link":"Heading 4 Char","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"paragraphFormat":{"leftIndent":0.0,"rightIndent":0.0,"firstLineIndent":0.0,"beforeSpacing":2.0,"afterSpacing":0.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left","outlineLevel":"Level4"}}');
            this.preDefinedStyles.add('Heading 5', '{"type":"Paragraph","name":"Heading 5","basedOn":"Normal","next":"Normal","link":"Heading 5 Char","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"paragraphFormat":{"leftIndent":0.0,"rightIndent":0.0,"firstLineIndent":0.0,"beforeSpacing":2.0,"afterSpacing":0.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left","outlineLevel":"Level5"}}');
            this.preDefinedStyles.add('Heading 6', '{"type":"Paragraph","name":"Heading 6","basedOn":"Normal","next":"Normal","link":"Heading 6 Char","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"paragraphFormat":{"leftIndent":0.0,"rightIndent":0.0,"firstLineIndent":0.0,"beforeSpacing":2.0,"afterSpacing":0.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left","outlineLevel":"Level6"}}');
            this.preDefinedStyles.add('Default Paragraph Font', '{"type":"Character","name":"Default Paragraph Font"}');
            this.preDefinedStyles.add('Heading 1 Char', '{"type":"Character","name":"Heading 1 Char","basedOn":"Default Paragraph Font","characterFormat":{"fontSize":16.0,"fontFamily":"Calibri Light","fontColor":"#2F5496"}}');
            this.preDefinedStyles.add('Heading 2 Char', '{"type":"Character","name":"Heading 2 Char","basedOn":"Default Paragraph Font","characterFormat":{"fontSize":13.0,"fontFamily":"Calibri Light","fontColor":"#2F5496"}}');
            this.preDefinedStyles.add('Heading 3 Char', '{"type":"Character","name":"Heading 3 Char","basedOn":"Default Paragraph Font","characterFormat":{"fontSize":12.0,"fontFamily":"Calibri Light","fontColor": "#1F3763"}}');
            this.preDefinedStyles.add('Heading 4 Char', '{"type":"Character","name":"Heading 4 Char","basedOn":"Default Paragraph Font","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"}}');
            this.preDefinedStyles.add('Heading 5 Char', '{"type":"Character","name":"Heading 5 Char","basedOn":"Default Paragraph Font","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"}}');
            this.preDefinedStyles.add('Heading 6 Char', '{"type":"Character","name":"Heading 6 Char","basedOn":"Default Paragraph Font","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"}}');
            this.preDefinedStyles.add('Hyperlink', '{"type":"Character","name":"Hyperlink","basedOn":"Default Paragraph Font","next":"Normal","characterFormat":{"fontColor":"#0563C1","underline": "Single"}}');
            this.preDefinedStyles.add('TOC 1', '{"type":"Paragraph","name":"TOC 1","basedOn":"Normal","next":"Normal","paragraphFormat":{"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 2', '{"type":"Paragraph","name":"TOC 2","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :11.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 3', '{"type":"Paragraph","name":"TOC 3","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :22.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 4', '{"type":"Paragraph","name":"TOC 4","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :33.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 5', '{"type":"Paragraph","name":"TOC 5","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :44.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 6', '{"type":"Paragraph","name":"TOC 6","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :55.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 7', '{"type":"Paragraph","name":"TOC 7","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :66.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 8', '{"type":"Paragraph","name":"TOC 8","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :77.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('TOC 9', '{"type":"Paragraph","name":"TOC 9","basedOn":"Normal","next":"Normal","paragraphFormat":{"leftIndent" :88.0,"afterSpacing":5.0}}');
            this.preDefinedStyles.add('Header', '{"type":"Paragraph","name":"Header","basedOn":"Normal","next":"Header","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple"}}');
            this.preDefinedStyles.add('Footer', '{"type":"Paragraph","name":"Footer","basedOn":"Normal","next":"Footer","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple"}}');
        };
        DocumentHelper.prototype.clearDocumentItems = function () {
            if (this.owner.editor) {
                this.owner.editor.clear();
            }
            if (this.owner.search) {
                this.owner.search.clearSearchHighlight();
            }
            if (this.owner.selection) {
                this.owner.selection.clear();
            }
            this.editRanges.clear();
            this.headersFooters = [];
            this.fields = [];
            this.formFields = [];
            this.currentSelectedComment = undefined;
            this.currentSelectedRevision = undefined;
            for (var i = 0; i < this.comments.length; i++) {
                var commentStart = this.comments[i].commentStart;
                if (commentStart) {
                    commentStart.destroy();
                }
            }
            this.comments = [];
            this.bookmarks.clear();
            this.endBookmarksUpdated = [];
            this.styles.clear();
            this.stylesMap.clear();
            if (this.pages && this.pages.length > 0) {
                for (var i = 0; i < this.pages.length; i++) {
                    var page = this.pages[i];
                    page.componentDestroy();
                }
                this.pages = [];
            }
            this.authors.clear();
            this.revisionsInternal.clear();
            this.owner.revisions.clear();
            this.characterFormat.clearFormat();
            this.themeFontLanguage.clearFormat();
            this.paragraphFormat.clearFormat();
            if (this.owner.trackChangesPane) {
                this.owner.trackChangesPane.clear();
            }
            this.setDefaultCharacterValue(this.characterFormat);
            this.setDefaultParagraphValue(this.paragraphFormat);
            if (this.owner.commentReviewPane) {
                this.owner.commentReviewPane.clear();
            }
            this.isHeaderFooter = false;
            this.defaultTabWidth = 36;
            this.isDocumentProtected = false;
            this.protectionType = 'NoProtection';
            this.restrictFormatting = false;
            this.hashValue = '';
            this.saltValue = '';
            this.userCollection = [];
            if (this.formFillPopup) {
                this.formFillPopup.hidePopup();
            }
            this.customXmlData.clear();
            this.images.clear();
            this.contentControlCollection = [];
            this.backgroundColor = '#FFFFFF';
            this.endnotes.clear();
            this.footnotes.clear();
            this.footnoteCollection = [];
            this.endnoteCollection = [];
            if (this.lists && this.lists.length > 0) {
                for (var i = 0; i < this.lists.length; i++) {
                    var list = this.lists[i];
                    list.clear();
                }
            }
            this.lists = [];
            this.abstractLists = [];
            this.themes = new themes_1.Themes();
            this.hasThemes = false;
        };
        DocumentHelper.prototype.setDefaultDocumentFormat = function () {
            this.owner.parser.parseCharacterFormat(0, this.owner.characterFormat, this.characterFormat);
            this.owner.parser.parseParagraphFormat(0, this.owner.paragraphFormat, this.paragraphFormat);
        };
        DocumentHelper.prototype.setDefaultCharacterValue = function (characterFormat) {
            characterFormat.bold = false;
            characterFormat.italic = false;
            characterFormat.fontFamily = 'Calibri';
            characterFormat.fontSize = 11;
            characterFormat.underline = 'None';
            characterFormat.strikethrough = 'None';
            characterFormat.fontSizeBidi = 11;
            characterFormat.fontFamilyBidi = 'Calibri';
            characterFormat.baselineAlignment = 'Normal';
            characterFormat.highlightColor = 'NoColor';
            characterFormat.fontColor = '#00000000';
            characterFormat.allCaps = false;
        };
        DocumentHelper.prototype.setDefaultParagraphValue = function (paragraphFormat) {
            paragraphFormat.leftIndent = 0;
            paragraphFormat.rightIndent = 0;
            paragraphFormat.firstLineIndent = 0;
            paragraphFormat.textAlignment = 'Left';
            paragraphFormat.beforeSpacing = 0;
            paragraphFormat.afterSpacing = 0;
            paragraphFormat.lineSpacing = 1;
            paragraphFormat.lineSpacingType = 'Multiple';
            paragraphFormat.bidi = false;
            paragraphFormat.keepWithNext = false;
            paragraphFormat.keepLinesTogether = false;
            paragraphFormat.widowControl = true;
            paragraphFormat.outlineLevel = 'BodyText';
        };
        DocumentHelper.prototype.getAbstractListById = function (id, isNsid) {
            if (ej2_base_2.isNullOrUndefined(this.abstractLists)) {
                return undefined;
            }
            for (var i = 0; i < this.abstractLists.length; i++) {
                var abstractList = this.abstractLists[i];
                if (!ej2_base_2.isNullOrUndefined(abstractList)) {
                    if (isNsid && abstractList.nsid === id) {
                        return abstractList;
                    }
                    else if (abstractList.abstractListId === id) {
                        return abstractList;
                    }
                }
            }
            return undefined;
        };
        DocumentHelper.prototype.getListById = function (id, isNsid) {
            if (ej2_base_2.isNullOrUndefined(this.lists)) {
                return undefined;
            }
            for (var i = 0; i < this.lists.length; i++) {
                var list = this.lists[i];
                if (!ej2_base_2.isNullOrUndefined(list)) {
                    if (isNsid && list.nsid === id) {
                        return list;
                    }
                    else if (list.listId === id) {
                        return list;
                    }
                }
            }
            return undefined;
        };
        DocumentHelper.getListLevelNumber = function (listLevel) {
            if (listLevel.ownerBase instanceof level_override_1.WLevelOverride) {
                return listLevel.ownerBase.levelNumber;
            }
            else if (listLevel.ownerBase instanceof abstract_list_1.WAbstractList && !ej2_base_2.isNullOrUndefined(listLevel.ownerBase.levels)) {
                return listLevel.ownerBase.levels.indexOf(listLevel);
            }
            else {
                return -1;
            }
        };
        DocumentHelper.prototype.getImageString = function (image) {
            var base64ImageString = this.images.get(parseInt(image.imageString));
            var imageStr;
            if (image.isMetaFile && editor_helper_1.HelperMethods.formatClippedString(base64ImageString[0]).extension !== ".svg") {
                imageStr = base64ImageString[1];
            }
            else if (editor_helper_1.HelperMethods.formatClippedString(base64ImageString[0]).extension === ".tif") {
                imageStr = base64ImageString[1];
            }
            else {
                imageStr = base64ImageString[0];
            }
            return imageStr;
        };
        DocumentHelper.prototype.addBase64StringInCollection = function (image) {
            return __awaiter(this, void 0, void 0, function () {
                var key, addToCollection, base64ImageString, i, imageStringCol;
                return __generator(this, function (_a) {
                    key = this.images.length;
                    addToCollection = true;
                    base64ImageString = [];
                    for (i = 0; i < this.images.length; i++) {
                        imageStringCol = this.images.get(i);
                        if (image.isMetaFile && image.metaFileImageString === imageStringCol[0]) {
                            key = i;
                            addToCollection = false;
                            break;
                        }
                        else if (image.imageString === imageStringCol[0]) {
                            key = i;
                            addToCollection = false;
                            break;
                        }
                    }
                    if (addToCollection) {
                        if (image.isMetaFile) {
                            base64ImageString.push(image.metaFileImageString);
                            base64ImageString.push(image.imageString === "" ? image.metaFileImageString : image.imageString);
                        }
                        else {
                            base64ImageString.push(image.imageString);
                        }
                        this.images.add(this.images.length, base64ImageString);
                    }
                    if (image.isMetaFile) {
                        image.metaFileImageString = key.toString();
                    }
                    image.imageString = key.toString();
                    return [2];
                });
            });
        };
        DocumentHelper.prototype.getBookmarks = function (includeHidden) {
            var bookmarks = [];
            for (var i = 0; i < this.bookmarks.keys.length; i++) {
                var bookmark = this.bookmarks.keys[i];
                if (includeHidden || bookmark.indexOf('_') !== 0) {
                    bookmarks.push(bookmark);
                }
            }
            return bookmarks;
        };
        DocumentHelper.prototype.selectComment = function (comment) {
            var _this = this;
            if (this.owner.selection && this.owner.commentReviewPane) {
                this.owner.showComments = true;
                setTimeout(function () {
                    if (_this.owner && _this.owner.selection) {
                        _this.owner.selection.selectComment(comment);
                    }
                });
            }
        };
        DocumentHelper.prototype.showComments = function (show) {
            if (this.owner && show && this.owner.enableComment) {
                var eventArgs = { type: 'Comment' };
                this.owner.trigger(index_3.beforePaneSwitchEvent, eventArgs);
            }
            this.owner.commentReviewPane.reviewTab.hideTab(0, false);
            this.owner.commentReviewPane.reviewTab.hideTab(1, false);
            this.owner.commentReviewPane.showHidePane(show && this.owner.enableComment, 'Comments');
        };
        DocumentHelper.prototype.showRevisions = function (show) {
            var isCommentTabVisible = false;
            this.showRevision = show;
            if (this.owner && show) {
                var eventArgs = { type: 'comment' };
                this.owner.trigger(index_3.beforePaneSwitchEvent, eventArgs);
            }
            if (!show && this.owner.showComments) {
                this.owner.commentReviewPane.reviewTab.hideTab(0, false);
                this.owner.commentReviewPane.showHidePane(true, 'Comments');
            }
            else {
                this.owner.commentReviewPane.showHidePane(show, 'Changes');
                if (!this.owner.enableComment) {
                    isCommentTabVisible = true;
                }
                this.showRevision = false;
            }
            if (show) {
                this.owner.trackChangesPane.enableDisableButton(!this.owner.isReadOnly && !this.isDocumentProtected);
            }
        };
        DocumentHelper.prototype.initializeComponents = function () {
            var element = this.owner.element;
            if (ej2_base_2.isNullOrUndefined(element)) {
                return;
            }
            this.optionsPaneContainer = ej2_base_1.createElement('div', {
                className: 'e-documenteditor-optionspane'
            });
            this.optionsPaneContainer.contentEditable = 'false';
            element.appendChild(this.optionsPaneContainer);
            var isRtl = this.owner.enableRtl;
            var viewerContainerStyle;
            if (isRtl) {
                viewerContainerStyle = 'direction:ltr;';
            }
            this.viewerContainer = ej2_base_1.createElement('div', { id: this.owner.containerId + '_viewerContainer' });
            this.viewerContainer.style.cssText = 'position:relative;backgroundColor:#FBFBFB;overflow:auto;' + viewerContainerStyle;
            this.optionsPaneContainer.appendChild(this.viewerContainer);
            this.viewerContainer.tabIndex = -1;
            this.viewerContainer.style.outline = 'none';
            this.pageContainer = ej2_base_1.createElement('div', { id: this.owner.containerId + '_pageContainer', className: 'e-de-background' });
            this.viewerContainer.appendChild(this.pageContainer);
            this.pageContainer.style.top = '0px';
            this.pageContainer.style.left = '0px';
            this.pageContainer.style.position = 'relative';
            this.pageContainer.style.pointerEvents = 'none';
            if (ej2_base_1.Browser.isDevice) {
                this.createEditableDiv(element);
            }
            else {
                this.createEditableIFrame();
            }
            if (this.owner.enableImageResizerMode) {
                this.owner.imageResizerModule.initializeImageResizer();
            }
            this.updateViewerSizeInternal(element);
            this.layout = new layout_1.Layout(this);
            this.textHelper = new text_helper_1.TextHelper(this);
            this.zoomModule = new zooming_1.Zoom(this);
            this.initTouchEllipse();
            this.wireEvent();
            this.restrictEditingPane = new restrict_editing_pane_1.RestrictEditing(this);
            this.owner.commentReviewPane = new index_2.CommentReviewPane(this.owner);
            this.owner.trackChangesPane = new track_changes_pane_1.TrackChangesPane(this.owner, this.owner.commentReviewPane);
            ej2_popups_1.createSpinner({ target: this.owner.element, cssClass: 'e-spin-overlay' });
        };
        DocumentHelper.prototype.measureScrollbarWidth = function (element) {
            var parentDiv = document.createElement('div');
            parentDiv.setAttribute('style', 'visibility:hidden;overflow:scroll');
            element.appendChild(parentDiv);
            var childDiv = document.createElement('div');
            parentDiv.appendChild(childDiv);
            this.scrollbarWidth = (parentDiv.getBoundingClientRect().width - childDiv.getBoundingClientRect().width);
            parentDiv.parentNode.removeChild(parentDiv);
        };
        DocumentHelper.prototype.createEditableDiv = function (element) {
            this.editableDiv = document.createElement('div');
            this.editableDiv.contentEditable = this.owner.isReadOnlyMode ? 'false' : 'true';
            this.editableDiv.style.position = 'fixed';
            this.editableDiv.style.left = '-150em';
            this.editableDiv.style.width = '100%';
            this.editableDiv.style.height = '100%';
            this.editableDiv.id = element.id + '_editableDiv';
            document.body.appendChild(this.editableDiv);
        };
        DocumentHelper.prototype.createEditableIFrame = function () {
            this.iframe = ej2_base_1.createElement('iframe', {
                attrs: {
                    'scrolling': 'no',
                    'title': 'Document Editor',
                    'style': 'pointer-events:none;position:absolute;left:0px;top:0px;outline:none;background-color:transparent;width:0px;height:0px;overflow:hidden',
                    'tabindex': "0"
                },
                className: 'e-de-text-target'
            });
            this.viewerContainer.appendChild(this.iframe);
            this.initIframeContent();
        };
        DocumentHelper.prototype.initIframeContent = function () {
            var style = 'background-color:transparent;width:100%;height:100%;padding: 0px; margin: 0px;';
            var innerHtml = '<!DOCTYPE html>'
                + '<html lang="' + this.owner.locale + '"><head></head>'
                + '<body spellcheck="false" style=' + style + ' >'
                + '<div contenteditable="true" style=' + style + '></div>'
                + '</body>'
                + '</html>';
            if (!ej2_base_2.isNullOrUndefined(this.iframe.contentDocument)) {
                this.iframe.contentDocument.open();
                this.iframe.contentDocument.write(innerHtml);
                this.iframe.contentDocument.close();
                this.editableDiv = this.iframe.contentDocument.body.children[0];
            }
        };
        DocumentHelper.prototype.wireEvent = function () {
            if (!ej2_base_2.isNullOrUndefined(this.selection)) {
                this.selection.initCaret();
            }
            this.wireInputEvents();
            if (!ej2_base_2.isNullOrUndefined(this.iframe)) {
                this.iframe.addEventListener('load', this.onIframeLoad.bind(this));
            }
            this.viewerContainer.addEventListener('scroll', this.scrollHandler);
            this.viewerContainer.addEventListener('mousedown', this.onMouseDownInternal);
            this.viewerContainer.addEventListener('keydown', this.onKeyDownInternal);
            this.viewerContainer.addEventListener('mousemove', this.onMouseMoveInternal);
            this.viewerContainer.addEventListener('mouseleave', this.onMouseLeaveInternal);
            this.viewerContainer.addEventListener('mouseenter', this.onMouseEnterInternal);
            this.viewerContainer.addEventListener('contextmenu', this.onContextMenu);
            this.viewerContainer.addEventListener('dblclick', this.onDoubleTap);
            this.viewerContainer.addEventListener('mouseup', this.onMouseUpInternal);
            window.addEventListener('resize', this.onWindowResize);
            window.addEventListener('keyup', this.onKeyUpInternal);
            window.addEventListener('mouseup', this.onImageResizer);
            window.addEventListener('touchend', this.onImageResizer);
            this.viewerContainer.addEventListener('touchstart', this.onTouchStartInternal);
            this.viewerContainer.addEventListener('touchmove', this.onTouchMoveInternal);
            this.viewerContainer.addEventListener('touchend', this.onTouchUpInternal);
            if (navigator !== undefined && navigator.userAgent.match('Firefox')) {
                this.viewerContainer.addEventListener('DOMMouseScroll', this.zoomModule.onMouseWheelInternal);
            }
            this.viewerContainer.addEventListener('mousewheel', this.zoomModule.onMouseWheelInternal);
            this.editableDiv.addEventListener('focus', this.updateFocus);
        };
        DocumentHelper.prototype.wireInputEvents = function () {
            if (ej2_base_2.isNullOrUndefined(this.editableDiv)) {
                return;
            }
            this.editableDiv.addEventListener('paste', this.onPaste);
            if (!ej2_base_1.Browser.isDevice) {
                this.editableDiv.addEventListener('keypress', this.onKeyPressInternal);
                if (ej2_base_1.Browser.info.name === 'chrome') {
                    this.editableDiv.addEventListener('textInput', this.onTextInput);
                }
            }
            else {
                this.editableDiv.addEventListener('input', this.onTextInputInternal);
            }
            this.editableDiv.addEventListener('blur', this.onFocusOut);
            this.editableDiv.addEventListener('keydown', this.onKeyDownInternal);
            this.editableDiv.addEventListener('compositionstart', this.compositionStart);
            this.editableDiv.addEventListener('compositionupdate', this.compositionUpdated);
            this.editableDiv.addEventListener('compositionend', this.compositionEnd);
        };
        DocumentHelper.prototype.onIframeLoad = function () {
            if (!ej2_base_2.isNullOrUndefined(this.iframe) && this.iframe.contentDocument.body.children.length === 0) {
                this.initIframeContent();
                this.wireInputEvents();
            }
        };
        DocumentHelper.prototype.getEditableDivTextContent = function () {
            return this.editableDiv.textContent;
        };
        DocumentHelper.prototype.updateAuthorIdentity = function () {
            var revisions = this.owner.revisions.changes;
            for (var i = 0; i < revisions.length; i++) {
                this.getAuthorColor(revisions[i].author);
            }
        };
        DocumentHelper.prototype.getAvatar = function (userInfo, userName, comment, revision) {
            var author;
            var userinitial;
            if (!ej2_base_2.isNullOrUndefined(comment)) {
                author = comment.author;
                userinitial = comment.initial;
            }
            else {
                author = revision.author;
            }
            if (!ej2_base_2.isNullOrUndefined(author)) {
                var avatarDiv = ej2_base_1.createElement('div', { className: 'e-de-cmt-avatar' });
                var avatar = ej2_base_1.createElement('div', { className: 'e-de-ff-cmt-avatar' });
                avatar.style.backgroundColor = this.owner.documentHelper.getAuthorColor(author);
                if (userinitial === '' || ej2_base_2.isNullOrUndefined(userinitial)) {
                    var authorName = author.split(' ');
                    var initial = authorName[0].charAt(0);
                    if (authorName.length > 1) {
                        initial += authorName[authorName.length - 1][0];
                    }
                    avatar.innerText = initial.toUpperCase();
                }
                else {
                    if (userinitial.length > 2) {
                        avatar.innerText = userinitial.substring(0, 2);
                    }
                    else {
                        avatar.innerText = userinitial;
                    }
                }
                avatarDiv.appendChild(avatar);
                avatarDiv.appendChild(userName);
                userInfo.appendChild(avatarDiv);
            }
        };
        DocumentHelper.prototype.getAuthorColor = function (author) {
            if (this.authors.containsKey(author)) {
                return this.authors.get(author);
            }
            var color;
            if (this.authors.length === 0) {
                color = '#b5082e';
            }
            else {
                color = this.generateRandomColor();
            }
            this.authors.add(author, color);
            return color;
        };
        DocumentHelper.prototype.generateRandomColor = function () {
            var userColors = ['#b5082e',
                '#2e97d3',
                '#bb00ff',
                '#f37e43',
                '#03a60b',
                '#881824',
                '#e09a2b',
                '#50565e'];
            return userColors[(this.authors.length % 8)];
        };
        DocumentHelper.prototype.positionEditableTarget = function () {
            var point = this.selection.getRect(this.selection.start);
            var page = this.selection.getSelectionPage(this.selection.start);
            var sectionFormat = page.bodyWidgets[0].sectionFormat;
            var left = page.boundingRectangle.x + (editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin) * this.zoomFactor);
            var top = point.y;
            var pageWidth = sectionFormat.pageWidth - sectionFormat.leftMargin - sectionFormat.rightMargin;
            var iframeStyle = 'left:' + left + 'px;';
            iframeStyle += 'top:' + top + 'px;';
            iframeStyle += 'width:' + (editor_helper_1.HelperMethods.convertPointToPixel(pageWidth) * this.zoomFactor) + 'px;';
            iframeStyle += 'height:250px;outline-style:none;position:absolute';
            this.iframe.setAttribute('style', iframeStyle);
            var style = 'background-color:transparent;width:100%;height:250px;padding: 0px; margin: 0px;';
            style += 'text-indent:' + (point.x - left) + 'px;';
            style += 'color:transparent;pointer-events:none;outline-style:none;';
            style += 'font-size:' + (editor_helper_1.HelperMethods.convertPointToPixel(this.selection.characterFormat.fontSize) * this.zoomFactor) + 'px;';
            style += 'font-family' + this.selection.characterFormat.fontFamily + ';';
            style += 'overflow:hidden;text-decoration:none;white-space:normal;';
            this.editableDiv.setAttribute('style', style);
        };
        DocumentHelper.prototype.initDialog = function (isRtl) {
            if (!this.dialogInternal) {
                this.dialogTarget1 = ej2_base_1.createElement('div', { className: 'e-de-dlg-target' });
                this.dialogTarget1.contentEditable = 'false';
                document.body.appendChild(this.dialogTarget1);
                if (isRtl) {
                    this.dialogTarget1.classList.add('e-de-rtl');
                }
                this.dialogInternal = new ej2_popups_1.Dialog({
                    target: this.owner.documentEditorSettings.popupTarget, showCloseIcon: true,
                    allowDragging: true, enableRtl: isRtl, visible: false,
                    width: '1px', isModal: true, position: { X: 'center', Y: 'center' }, zIndex: this.owner.zIndex + 20,
                    animationSettings: { effect: 'None' }
                });
                this.dialogInternal.isStringTemplate = true;
                this.dialogInternal.open = this.selection.hideCaret;
                this.dialogInternal.beforeClose = this.updateFocus;
                this.dialogInternal.appendTo(this.dialogTarget1);
            }
        };
        DocumentHelper.prototype.initDialog3 = function (isRtl) {
            if (!this.dialogInternal3) {
                this.dialogTarget3 = ej2_base_1.createElement('div', { className: 'e-de-dlg-target' });
                this.dialogTarget3.contentEditable = 'false';
                document.body.appendChild(this.dialogTarget3);
                if (isRtl) {
                    this.dialogTarget3.classList.add('e-de-rtl');
                }
                this.dialogInternal3 = new ej2_popups_1.Dialog({
                    target: this.owner.documentEditorSettings.popupTarget, showCloseIcon: true,
                    allowDragging: true, enableRtl: isRtl, visible: false,
                    width: '1px', isModal: true, position: { X: 'center', Y: 'center' }, zIndex: this.owner.zIndex,
                    animationSettings: { effect: 'None' }
                });
                this.dialogInternal3.isStringTemplate = true;
                this.dialogInternal3.open = this.selection.hideCaret;
                this.dialogInternal3.beforeClose = this.updateFocus;
                this.dialogInternal3.appendTo(this.dialogTarget3);
            }
        };
        DocumentHelper.prototype.hideDialog = function () {
            this.dialog.hide();
            this.updateFocus();
        };
        DocumentHelper.prototype.initDialog2 = function (isRtl) {
            if (!this.dialogInternal2) {
                this.dialogTarget2 = ej2_base_1.createElement('div', { className: 'e-de-dlg-target' });
                this.dialogTarget2.contentEditable = 'false';
                document.body.appendChild(this.dialogTarget2);
                if (isRtl) {
                    this.dialogTarget2.classList.add('e-de-rtl');
                }
                this.dialogInternal2 = new ej2_popups_1.Dialog({
                    target: this.owner.documentEditorSettings.popupTarget, showCloseIcon: true,
                    allowDragging: true, enableRtl: isRtl, visible: false,
                    width: '1px', isModal: true, position: { X: 'center', Y: 'Top' }, zIndex: this.owner.zIndex + 10
                });
                this.dialogInternal2.isStringTemplate = true;
                this.dialogInternal2.appendTo(this.dialogTarget2);
            }
        };
        DocumentHelper.prototype.getBase64 = function (base64String, width, height) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve, reject) {
                            var imageString = '';
                            var drawImage = new Image();
                            drawImage.onload = function () {
                                var displayPixelRatio = Math.max(1, window.devicePixelRatio || 1);
                                var draw = document.createElement('canvas');
                                draw.width = width * displayPixelRatio;
                                draw.height = height * displayPixelRatio;
                                var context = draw.getContext('2d');
                                context.scale(displayPixelRatio, displayPixelRatio);
                                context.drawImage(drawImage, 0, 0, width, height);
                                imageString = draw.toDataURL('image/png', 1);
                                resolve(imageString);
                            };
                            if (base64String && (editor_helper_1.HelperMethods.startsWith(base64String, 'http://') || editor_helper_1.HelperMethods.startsWith(base64String, 'https://'))) {
                                fetch(base64String)
                                    .then(function (response) { return response.blob(); })
                                    .then(function (blob) {
                                    return new Promise(function (resolve, reject) {
                                        var reader = new FileReader();
                                        reader.onloadend = function () { return resolve(reader.result); };
                                        reader.onerror = reject;
                                        reader.readAsDataURL(blob);
                                    });
                                })
                                    .then(function (dataUrl) {
                                    drawImage.src = dataUrl;
                                });
                            }
                        })];
                });
            });
        };
        DocumentHelper.prototype.clearContent = function () {
            this.containerContext.clearRect(0, 0, this.containerCanvas.width, this.containerCanvas.height);
            this.selectionContext.clearRect(0, 0, this.selectionCanvas.width, this.selectionCanvas.height);
            if (this.pageContainer) {
                var commentMarkElement = this.pageContainer.getElementsByClassName('e-de-cmt-mark');
                for (var i = 0; i < commentMarkElement.length; i++) {
                    commentMarkElement[i].style.display = 'none';
                }
            }
            if (this.pageContainer) {
                var editRangeStart = this.pageContainer.getElementsByClassName('e-de-lock-mark');
                for (var i = 0; i < editRangeStart.length; i++) {
                    editRangeStart[i].style.display = 'none';
                }
            }
        };
        DocumentHelper.prototype.onDocumentChanged = function (sections, iOps) {
            var _this = this;
            this.clearContent();
            if (this.owner.editorModule) {
                this.owner.editorModule.tocStyles = {};
                this.owner.editorModule.tocBookmarkId = 0;
            }
            this.heightInfoCollection = {};
            this.owner.isDocumentLoaded = false;
            this.viewer.columnLayoutArea.clear();
            this.layout.isDocumentContainsRtl = false;
            this.layout.isMultiColumnDoc = false;
            this.updateAuthorIdentity();
            for (var i = 0; i < this.pages.length; i++) {
                for (var j = 0; j < this.pages[i].bodyWidgets.length; j++) {
                    this.pages[i].bodyWidgets[j].destroy();
                }
            }
            this.pages = [];
            if (!ej2_base_2.isNullOrUndefined(this.renderedLists)) {
                this.renderedLists.clear();
            }
            if (!ej2_base_2.isNullOrUndefined(this.renderedLevelOverrides)) {
                this.renderedLevelOverrides = [];
            }
            if (!ej2_base_2.isNullOrUndefined(this.owner.editorHistory)) {
                this.owner.editorHistory.destroy();
            }
            this.owner.isDocumentLoaded = true;
            this.layout.isInitialLoad = true;
            this.layout.footHeight = 0;
            this.layout.footnoteHeight = 0;
            this.layout.layoutItems(sections, false);
            if (this.owner.selection) {
                this.selection.previousSelectedFormField = undefined;
                if (this.formFields.length > 0) {
                    this.owner.selection.highlightFormFields();
                }
                this.owner.selection.editRangeCollection = [];
                this.owner.selection.selectRange(this.owner.documentStart, this.owner.documentStart);
                if (this.isDocumentProtected && this.protectionType == 'FormFieldsOnly') {
                    this.owner.selection.navigateToNextFormField();
                }
                if (this.isDocumentProtected) {
                    this.restrictEditingPane.showHideRestrictPane(true);
                }
            }
            if (this.owner.enableCollaborativeEditing && this.owner.collaborativeEditingHandlerModule && this.owner.enableEditor) {
                this.owner.editor.isRemoteAction = true;
                this.owner.editor.isIncrementalSave = true;
                if (iOps && !ej2_base_2.isNullOrUndefined(iOps[index_4.incrementalOps[0]])
                    && !ej2_base_2.isNullOrUndefined(iOps[index_4.incrementalOps[0]].length > 0)) {
                    for (var k = 0; k < iOps[index_4.incrementalOps[0]].length; k++) {
                        this.owner.collaborativeEditingHandlerModule.applyRemoteAction('action', iOps[index_4.incrementalOps[0]][k]);
                    }
                }
                this.owner.editor.isRemoteAction = false;
                this.owner.editor.isIncrementalSave = false;
                this.owner.selection.selectRange(this.owner.documentStart, this.owner.documentStart);
            }
            if (this.owner.optionsPaneModule) {
                this.owner.optionsPaneModule.showHideOptionsPane(false);
            }
            if (this.restrictEditingPane.restrictPane && !this.isDocumentProtected) {
                this.restrictEditingPane.showHideRestrictPane(false);
            }
            if (!ej2_base_2.isNullOrUndefined(this.owner.selection) && this.owner.selection.isViewPasteOptions) {
                this.owner.selection.isViewPasteOptions = false;
                this.owner.selection.showHidePasteOptions(undefined, undefined);
            }
            this.owner.fireDocumentChange();
            setTimeout(function () {
                if (!ej2_base_2.isNullOrUndefined(_this.owner) && _this.owner.showRevisions) {
                    _this.showRevisions(true);
                }
            });
        };
        DocumentHelper.prototype.initTouchEllipse = function () {
            var style = 'height: 30px;width: 30px;position: absolute;background-color: transparent;margin: 0px;padding: 0px;z-index:5';
            var ellipse = ' height: 12px;width: 12px;border-radius: 50%;background-color: white;position: absolute;margin: 0px 6px 0px 6px;border-width: 2px;border-style: solid;border-color: #000000;box-sizing: unset;';
            this.touchStart = ej2_base_1.createElement('div', { className: 'e-touch-ellipse', styles: style });
            var start = ej2_base_1.createElement('div', { styles: ellipse });
            this.touchEnd = ej2_base_1.createElement('div', { className: 'e-touch-ellipse', styles: style });
            this.touchStart.style.display = 'none';
            var end = ej2_base_1.createElement('div', { styles: ellipse });
            this.touchStart.appendChild(start);
            this.touchEnd.appendChild(end);
            this.touchEnd.style.display = 'none';
            this.viewerContainer.appendChild(this.touchStart);
            this.viewerContainer.appendChild(this.touchEnd);
        };
        DocumentHelper.prototype.updateTouchMarkPosition = function () {
            if (this.touchStart.style.display !== 'none' && !ej2_base_2.isNullOrUndefined(this.selection)) {
                if (!this.selection.isEmpty) {
                    var y = this.selection.getCaretBottom(this.selection.start, false);
                    var page = this.selection.getPage(this.selection.start.paragraph);
                    var pageTop = (page.boundingRectangle.y - (this.owner.viewer.pageGap * (this.pages.indexOf(page) + 1)) * this.zoomFactor + this.owner.viewer.pageGap * (this.pages.indexOf(page) + 1));
                    this.touchStart.style.left = page.boundingRectangle.x + (Math.round(this.selection.start.location.x) * this.zoomFactor - 14) + 'px';
                    this.touchStart.style.top = pageTop + ((y) * this.zoomFactor) + 'px';
                    if (!this.selection.isEmpty) {
                        y = this.selection.getCaretBottom(this.selection.end, false);
                        page = this.selection.getPage(this.selection.end.paragraph);
                    }
                    this.touchEnd.style.left = page.boundingRectangle.x + (Math.round(this.selection.end.location.x) * this.zoomFactor - 14) + 'px';
                    this.touchEnd.style.top = pageTop + (y * this.zoomFactor) + 'px';
                }
                else {
                    this.selection.updateCaretPosition();
                }
            }
        };
        DocumentHelper.prototype.autoScrollOnSelection = function (cursorPoint) {
            var _this = this;
            if (this.scrollMoveTimer && (cursorPoint.y <= 0 || cursorPoint.y > 50 || cursorPoint.y < (this.viewerContainer.offsetHeight - 50))) {
                clearInterval(this.scrollMoveTimer);
                this.scrollMoveTimer = 0;
            }
            else if (cursorPoint.y < 60) {
                clearInterval(this.scrollMoveTimer);
                this.scrollMoveTimer = setInterval(function () {
                    _this.viewerContainer.scrollTop -= 20;
                    setTimeout(function () {
                        var touchPoint = _this.owner.viewer.findFocusedPage(cursorPoint, !_this.owner.enableHeaderAndFooter);
                        var widget = _this.getLineWidget(touchPoint);
                        _this.selection.updateTextPosition(widget, touchPoint);
                    }, 200);
                }, 200);
            }
            else if (cursorPoint.y > (this.viewerContainer.offsetHeight - 70)) {
                clearInterval(this.scrollMoveTimer);
                this.scrollMoveTimer = setInterval(function () {
                    _this.viewerContainer.scrollTop += 20;
                    setTimeout(function () {
                        var touchPoint = _this.owner.viewer.findFocusedPage(cursorPoint, !_this.owner.enableHeaderAndFooter);
                        var widget = _this.getLineWidget(touchPoint);
                        _this.selection.updateTextPosition(widget, touchPoint);
                    }, 200);
                }, 200);
            }
        };
        DocumentHelper.prototype.scrollForwardOnSelection = function (cursorPoint) {
            if (this.viewerContainer) {
                this.viewerContainer.scrollTop = this.viewerContainer.scrollTop + 200;
                var touchPoint = this.owner.viewer.findFocusedPage(cursorPoint, !this.owner.enableHeaderAndFooter);
                var textPosition = this.owner.selection.end;
                if (!this.owner.enableImageResizerMode || !this.owner.imageResizerModule.isImageResizerVisible
                    || this.owner.imageResizerModule.isShapeResize) {
                    this.skipScrollToPosition = true;
                    this.owner.selection.moveTextPosition(touchPoint, textPosition, true);
                }
            }
        };
        DocumentHelper.prototype.scrollBackwardOnSelection = function (cursorPoint) {
            this.viewerContainer.scrollTop = this.viewerContainer.scrollTop - 200;
            var touchPoint = this.owner.viewer.findFocusedPage(cursorPoint, !this.owner.enableHeaderAndFooter);
            var textPosition = this.owner.selection.end;
            if (!this.owner.enableImageResizerMode || !this.owner.imageResizerModule.isImageResizerVisible
                || this.owner.imageResizerModule.isShapeResize) {
                this.skipScrollToPosition = true;
                this.owner.selection.moveTextPosition(touchPoint, textPosition, true);
            }
        };
        DocumentHelper.prototype.moveSelectedContent = function () {
            this.isDragStarted = false;
            var dropSelectionStartParaInfo = this.selection.getParagraphInfo(this.selection.start);
            var dropSelectionEndParaInfo = this.selection.getParagraphInfo(this.selection.end);
            var dropSelectionStartParaIndex = this.selection.getHierarchicalIndex(dropSelectionStartParaInfo.paragraph, dropSelectionStartParaInfo.offset.toString());
            var dropSelectionEndParaIndex = this.selection.getHierarchicalIndex(dropSelectionEndParaInfo.paragraph, dropSelectionEndParaInfo.offset.toString());
            var dropSelectionStartPos = this.selection.getTextPosBasedOnLogicalIndex(dropSelectionStartParaIndex);
            var dropSelectionEndPos = this.selection.getTextPosBasedOnLogicalIndex(dropSelectionEndParaIndex);
            var dragOnSelectionStartParaIndex = this.selection.getHierarchicalIndex(this.dragStartParaInfo.paragraph, this.dragStartParaInfo.offset.toString());
            var dragOnSelectionEndParaIndex = this.selection.getHierarchicalIndex(this.dragEndParaInfo.paragraph, this.dragEndParaInfo.offset.toString());
            var dragOnSelectionStartPos = this.selection.getTextPosBasedOnLogicalIndex(dragOnSelectionStartParaIndex);
            var dragOnSelectionEndPos = this.selection.getTextPosBasedOnLogicalIndex(dragOnSelectionEndParaIndex);
            if (dropSelectionStartPos.isExistBefore(dragOnSelectionStartPos)
                || dropSelectionEndPos.isExistAfter(dragOnSelectionEndPos)) {
                this.owner.editor.initComplexHistory('DragAndDropContent');
                this.selection.start = dragOnSelectionStartPos;
                this.selection.end = dragOnSelectionEndPos;
                var isEnableLocalPasteTrue = this.owner.enableLocalPaste;
                if (!isEnableLocalPasteTrue) {
                    this.owner.enableLocalPaste = true;
                }
                var dropExtraOffset = this.dragEndParaInfo.paragraph.getLength();
                var hasNewLineChar = false;
                if (dropExtraOffset < this.dragEndParaInfo.offset
                    || !this.dragStartParaInfo.paragraph.equals(this.dragEndParaInfo.paragraph)) {
                    hasNewLineChar = true;
                }
                this.owner.editor.cut();
                if (this.dragEndParaInfo.paragraph.equals(dropSelectionStartParaInfo.paragraph)
                    && this.dragEndParaInfo.offset < dropSelectionStartParaInfo.offset
                    && !this.owner.enableTrackChanges) {
                    dropExtraOffset -= this.dragEndParaInfo.paragraph.getLength();
                    dropSelectionStartParaInfo.offset -= dropExtraOffset;
                    dropSelectionEndParaInfo.offset -= dropExtraOffset;
                    dropSelectionStartParaIndex = this.selection.getHierarchicalIndex(dropSelectionStartParaInfo.paragraph, dropSelectionStartParaInfo.offset.toString());
                    dropSelectionEndParaIndex = this.selection.getHierarchicalIndex(dropSelectionEndParaInfo.paragraph, dropSelectionEndParaInfo.offset.toString());
                }
                if (!hasNewLineChar || !this.dragEndParaInfo.paragraph.equals(dropSelectionEndParaInfo.paragraph)) {
                    dropSelectionStartParaIndex = this.selection.getHierarchicalIndex(dropSelectionStartParaInfo.paragraph, dropSelectionStartParaInfo.offset.toString());
                    dropSelectionEndParaIndex = this.selection.getHierarchicalIndex(dropSelectionEndParaInfo.paragraph, dropSelectionEndParaInfo.offset.toString());
                }
                dropSelectionStartPos = this.selection.getTextPosBasedOnLogicalIndex(dropSelectionStartParaIndex);
                dropSelectionEndPos = this.selection.getTextPosBasedOnLogicalIndex(dropSelectionEndParaIndex);
                this.selection.start = dropSelectionStartPos;
                this.selection.end = dropSelectionEndPos;
                this.owner.editor.copiedTextContent = '';
                this.owner.editor.paste();
                if (!isEnableLocalPasteTrue) {
                    this.owner.enableLocalPaste = false;
                }
                this.owner.editorHistory.updateComplexHistory();
            }
            else {
                this.owner.selection.selectPosition(dragOnSelectionStartPos, dragOnSelectionEndPos);
            }
            this.dragStartParaInfo = undefined;
            this.dragEndParaInfo = undefined;
            this.selection.caret.classList.add("e-de-cursor-animation");
        };
        DocumentHelper.prototype.isSelectionInListText = function (cursorPoint) {
            var widget = this.getLineWidget(cursorPoint);
            if (!ej2_base_2.isNullOrUndefined(widget) && widget.children[0] instanceof page_1.ListTextElementBox) {
                var left = this.getLeftValue(widget);
                var width = widget.children[0].width;
                var height = widget.children[0].height;
                if (this.isInsideRect(left, widget.paragraph.y, width, height, cursorPoint)) {
                    this.selectionLineWidget = widget;
                    return true;
                }
            }
            return false;
        };
        DocumentHelper.prototype.isInShapeBorder = function (floatElement, cursorPoint) {
            if (!ej2_base_2.isNullOrUndefined(floatElement)) {
                var width = floatElement.width;
                var height = floatElement.height;
                if (this.isInsideRect(floatElement.x - floatElement.margin.left, floatElement.y - floatElement.margin.top, width, height, cursorPoint)) {
                    if (floatElement instanceof page_1.ImageElementBox) {
                        return true;
                    }
                    else if (floatElement instanceof page_1.ShapeElementBox) {
                        var lineWidth = floatElement.lineFormat.weight;
                        if (!(this.isInsideRect(floatElement.x + lineWidth, floatElement.y + lineWidth + floatElement.textFrame.marginTop, width - (lineWidth * 2), height - ((lineWidth * 2) + floatElement.textFrame.marginTop + floatElement.textFrame.marginBottom), cursorPoint))) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        DocumentHelper.prototype.isInsideRect = function (x, y, width, height, touchPoint) {
            if ((touchPoint.x > x && touchPoint.x <= x + width) && (touchPoint.y > y && touchPoint.y <= y + height)) {
                return true;
            }
            return false;
        };
        DocumentHelper.prototype.getLeftValue = function (widget) {
            var left = widget.paragraph.x;
            var paragraphFormat = widget.paragraph.paragraphFormat;
            if (this.selection.isParagraphFirstLine(widget)) {
                if (paragraphFormat.textAlignment === 'Right') {
                    left -= editor_helper_1.HelperMethods.convertPointToPixel(paragraphFormat.firstLineIndent);
                    left -= editor_helper_1.HelperMethods.convertPointToPixel(paragraphFormat.leftIndent);
                }
                else {
                    left += editor_helper_1.HelperMethods.convertPointToPixel(paragraphFormat.firstLineIndent);
                }
            }
            var element = widget.children[0];
            if (element instanceof page_1.ListTextElementBox) {
                left += element.margin.left;
            }
            return left;
        };
        DocumentHelper.prototype.isLeftButtonPressed = function (event) {
            this.isTouchInput = false;
            var button = event.which || event.button;
            return button === 1;
        };
        DocumentHelper.prototype.updateSelectionOnTouch = function (point, touchPoint) {
            this.zoomX = undefined;
            this.zoomY = undefined;
            if (this.isMouseDown && !this.isSelectionChangedOnMouseMoved && !ej2_base_2.isNullOrUndefined(this.currentPage) && !ej2_base_2.isNullOrUndefined(this.owner.selection.start)) {
                if (!ej2_base_2.isNullOrUndefined(this.currentSelectedComment) && this.owner.commentReviewPane
                    && !this.owner.commentReviewPane.commentPane.isEditMode) {
                    this.currentSelectedComment = undefined;
                }
                if (this.touchDownOnSelectionMark === 0) {
                    this.updateTextPositionForSelection(new editor_helper_1.Point(touchPoint.x, touchPoint.y), this.tapCount);
                    if (this.tapCount === 2) {
                        this.selection.checkAndEnableHeaderFooter(point, touchPoint);
                    }
                }
                if (this.owner.selection.isEmpty) {
                    this.selection.updateCaretPosition();
                }
                this.selection.checkForCursorVisibility();
            }
        };
        DocumentHelper.prototype.getTouchOffsetValue = function (event) {
            var targetElement = this.viewerContainer;
            var offset = targetElement.getBoundingClientRect();
            var touchOffsetValues = event.touches[0];
            if (ej2_base_2.isNullOrUndefined(touchOffsetValues)) {
                touchOffsetValues = event.changedTouches[0];
            }
            var offsetX = touchOffsetValues.pageX - offset.left;
            var offsetY = touchOffsetValues.pageY - offset.top;
            return new editor_helper_1.Point(offsetX, offsetY);
        };
        DocumentHelper.prototype.onPinchInInternal = function (event) {
            this.preZoomFactor = this.zoomFactor;
            var updatedZoomFactor = this.zoomFactor - 0.01;
            if (updatedZoomFactor < 5 && updatedZoomFactor > 2) {
                updatedZoomFactor = updatedZoomFactor - 0.01;
            }
            if (updatedZoomFactor < 0.1) {
                updatedZoomFactor = 0.1;
            }
            this.zoomFactor = updatedZoomFactor;
        };
        DocumentHelper.prototype.onPinchOutInternal = function (event) {
            this.preZoomFactor = this.zoomFactor;
            var updatedZoomFactor = this.zoomFactor + 0.01;
            if (updatedZoomFactor > 2) {
                updatedZoomFactor = updatedZoomFactor + 0.01;
            }
            if (updatedZoomFactor > 5) {
                updatedZoomFactor = 5;
            }
            this.zoomFactor = updatedZoomFactor;
        };
        DocumentHelper.prototype.getPageWidth = function (page) {
            var width = page.boundingRectangle.width;
            return width;
        };
        DocumentHelper.prototype.removePage = function (page) {
            if (this.currentPage === page) {
                this.currentPage = undefined;
            }
            if (page.headerWidgetIn) {
                page.headerWidgetIn.page = undefined;
            }
            if (page.footerWidgetIn) {
                page.footerWidgetIn.page = undefined;
            }
            var index = this.pages.indexOf(page);
            if (index > -1) {
                this.pages.splice(index, 1);
            }
            if (!ej2_base_2.isNullOrUndefined(this.owner.viewer.visiblePages)) {
                if ((this.owner.viewer.visiblePages).indexOf(page) > -1) {
                    var pageIndex = (this.owner.viewer.visiblePages).indexOf(page);
                    (this.owner.viewer.visiblePages).splice(pageIndex, 1);
                }
            }
            var height = 0;
            for (var i = 0; i < this.pages.length; i++) {
                height = height + this.pages[i].boundingRectangle.height;
            }
            height -= page.boundingRectangle.height + 20;
            var top = 20;
            if (index > 0) {
                top += this.pages[index - 1].boundingRectangle.bottom;
            }
            if (index !== -1) {
                for (var i = index; i < this.pages.length; i++) {
                    page = this.pages[i];
                    page.boundingRectangle = new page_1.Rect(page.boundingRectangle.x, top, page.boundingRectangle.width, page.boundingRectangle.height);
                    top = page.boundingRectangle.bottom + 20;
                    if (!ej2_base_2.isNullOrUndefined(page.bodyWidgets[0].firstChild) && !(page.bodyWidgets[0].firstChild instanceof page_2.TableWidget && page.bodyWidgets[0].firstChild.header)) {
                        page.repeatHeaderRowTableWidget = false;
                    }
                }
            }
        };
        DocumentHelper.prototype.updateViewerSize = function () {
            var _this = this;
            var element = this.owner.getDocumentEditorElement();
            this.updateViewerSizeInternal(element);
            this.owner.viewer.updateScrollBars();
            if (this.owner.viewer instanceof WebLayoutViewer && (!ej2_base_2.isNullOrUndefined(this.owner)) && (!ej2_base_2.isNullOrUndefined(element))) {
                if (this.resizerTimer) {
                    clearTimeout(this.resizerTimer);
                }
                this.resizerTimer = setTimeout(function () {
                    if (!ej2_base_2.isNullOrUndefined(_this.owner)) {
                        var currentVisibleWidth = void 0;
                        if (!ej2_base_2.isNullOrUndefined(_this.visibleBounds)) {
                            currentVisibleWidth = _this.visibleBounds.width;
                        }
                        else {
                            currentVisibleWidth = 0;
                        }
                        if (ej2_base_2.isNullOrUndefined(_this.owner.viewer.preVisibleWidth)) {
                            _this.owner.viewer.preVisibleWidth = 0;
                        }
                        if ((!ej2_base_2.isNullOrUndefined(_this.visibleBounds) && (currentVisibleWidth !== _this.owner.viewer.preVisibleWidth))) {
                            _this.owner.editorModule.layoutWholeDocument();
                            _this.owner.viewer.preVisibleWidth = currentVisibleWidth;
                        }
                        if (_this.resizerTimer) {
                            clearTimeout(_this.resizerTimer);
                        }
                    }
                }, 50);
            }
            if (!ej2_base_2.isNullOrUndefined(this.selection)) {
                this.selection.updateCaretPosition();
            }
        };
        DocumentHelper.prototype.triggerAutoResizeInterval = function () {
            var _this = this;
            var timer = 0;
            var element = this.owner.element;
            var args = { cancel: false };
            this.owner.notify(constants_1.beforeAutoResize, args);
            if (!ej2_base_2.isNullOrUndefined(args.element)) {
                element = args.element;
            }
            element.style.visibility = 'hidden';
            ej2_popups_1.showSpinner(element);
            var counter = 0;
            var internal = this.owner.documentEditorSettings.autoResizeSettings.interval;
            if (this.isAutoResizeCanStart) {
                timer = setInterval(function () {
                    counter++;
                    var tempRect = _this.owner.element.getBoundingClientRect();
                    if (tempRect.width !== 0 && tempRect.height !== 0) {
                        _this.isAutoResizeCanStart = false;
                        var args_1 = { cancel: false };
                        _this.owner.notify(constants_1.internalAutoResize, args_1);
                        clearInterval(timer);
                        if (!args_1.cancel) {
                            _this.owner.resize();
                        }
                        ej2_popups_1.hideSpinner(element);
                        element.style.visibility = 'visible';
                    }
                    else if (counter > _this.owner.documentEditorSettings.autoResizeSettings.iterationCount) {
                        clearInterval(timer);
                        ej2_popups_1.hideSpinner(element);
                        element.style.visibility = 'visible';
                    }
                }, internal);
            }
            else {
                ej2_popups_1.hideSpinner(element);
                element.style.visibility = 'visible';
            }
        };
        DocumentHelper.prototype.updateViewerSizeInternal = function (element) {
            if (!ej2_base_2.isNullOrUndefined(element)) {
                var rect = element.getBoundingClientRect();
                if (rect.width === 0 && rect.height === 0) {
                    this.isAutoResizeCanStart = true;
                }
                else {
                    this.isAutoResizeCanStart = false;
                }
                var width = 0;
                var height = 0;
                height = rect.height > 0 ? rect.height : 200;
                var restrictPaneRect = this.restrictEditingPane && this.restrictEditingPane.isShowRestrictPane ?
                    this.restrictEditingPane.restrictPane.getBoundingClientRect() : undefined;
                var optionsRect = this.owner.optionsPaneModule && this.owner.optionsPaneModule.isOptionsPaneShow ?
                    this.owner.optionsPaneModule.optionsPane.getBoundingClientRect() : undefined;
                var commentPane = this.owner.commentReviewPane && this.owner.commentReviewPane.parentPaneElement ?
                    this.owner.commentReviewPane.parentPaneElement.getBoundingClientRect() : undefined;
                if (restrictPaneRect || optionsRect || commentPane) {
                    var paneWidth = restrictPaneRect ? restrictPaneRect.width : 0;
                    paneWidth += optionsRect ? optionsRect.width : 0;
                    paneWidth += commentPane ? commentPane.width : 0;
                    width = (rect.width - paneWidth) > 0 ? (rect.width - paneWidth) : 200;
                }
                else {
                    width = rect.width > 0 ? rect.width : 200;
                }
                this.viewerContainer.style.height = height.toString() + 'px';
                this.viewerContainer.style.width = Math.ceil(width) + 'px';
                this.visibleBoundsIn = new page_1.Rect(0, 0, width, height);
                this.containerCanvas.width = width;
                this.containerCanvas.height = height;
                this.selectionCanvas.width = width;
                this.selectionCanvas.height = height;
                this.measureScrollbarWidth(element);
            }
        };
        DocumentHelper.prototype.insertPage = function (index, page) {
            if (this.pages.indexOf(page) > -1) {
                this.pages.splice(this.pages.indexOf(page), 1);
            }
            this.pages.splice(index, 0, page);
            var top = 20;
            if (index > 0) {
                top += this.pages[index - 1].boundingRectangle.bottom;
            }
            for (var i = index; i < this.pages.length; i++) {
                page = this.pages[i];
                page.boundingRectangle = new page_1.Rect(page.boundingRectangle.x, top, page.boundingRectangle.width, page.boundingRectangle.height);
                top = page.boundingRectangle.bottom + 20;
            }
        };
        DocumentHelper.prototype.updateTextPositionForSelection = function (cursorPoint, tapCount) {
            var widget = this.getLineWidget(cursorPoint);
            if (!ej2_base_2.isNullOrUndefined(widget)) {
                this.selection.updateTextPosition(widget, cursorPoint);
            }
            if (tapCount > 1) {
                this.isMouseDown = false;
                this.useTouchSelectionMark = false;
                if (this.pages.length === 0) {
                    return;
                }
                if (!ej2_base_2.isNullOrUndefined(this.currentPage) && !ej2_base_2.isNullOrUndefined(this.owner.selection.start)) {
                    if (tapCount % 2 === 0) {
                        this.owner.selection.selectCurrentWord();
                    }
                    else if (!this.isDragStarted) {
                        this.owner.selection.selectParagraph();
                    }
                }
            }
        };
        DocumentHelper.prototype.scrollToPosition = function (startPosition, endPosition, skipCursorUpdate, isBookmark) {
            if (this.skipScrollToPosition || this.isWebPrinting || (this.owner.editor && this.owner.editor.isRemoteAction)) {
                this.skipScrollToPosition = false;
                return;
            }
            if (this.owner.enableImageResizerMode && this.owner.imageResizerModule.isImageResizing
                || this.isMouseDownInFooterRegion || this.isRowOrCellResizing) {
                return;
            }
            var lineWidget = this.selection.getLineWidgetInternal(endPosition.currentWidget, endPosition.offset, true);
            if (ej2_base_2.isNullOrUndefined(lineWidget)) {
                return;
            }
            var top = this.selection.getTop(lineWidget);
            if (this.isMouseDown) {
                var prevLineWidget = this.selection.getLineWidgetInternal(endPosition.currentWidget, endPosition.offset, false);
                var prevTop = this.selection.getTop(prevLineWidget);
                if (prevLineWidget !== lineWidget && endPosition.location.y >= prevTop) {
                    lineWidget = prevLineWidget;
                }
            }
            var height = lineWidget.height;
            var endPage = this.selection.getPage(lineWidget.paragraph);
            this.currentPage = endPage;
            var x = 0;
            var y = 0;
            var horizontalWidth = 0;
            var isPageLayout = this.owner.viewer instanceof PageLayoutViewer;
            var pageLayout = this.owner.viewer;
            if (ej2_base_2.isNullOrUndefined(endPage)) {
                return;
            }
            var pageWidth = endPage.boundingRectangle.width;
            x = (this.visibleBounds.width - pageWidth * this.zoomFactor) / 2;
            if (x < 30) {
                x = 30;
            }
            y = endPage.boundingRectangle.y * this.zoomFactor + (this.pages.indexOf(endPage) + 1) * this.owner.viewer.pageGap * (1 - this.zoomFactor);
            var scrollTop = this.owner.viewer.containerTop;
            var scrollLeft = this.owner.viewer.containerLeft;
            var pageHeight = this.visibleBounds.height;
            var caretInfo = this.selection.updateCaretSize(this.owner.selection.end, true);
            var topMargin = caretInfo.topMargin;
            var caretHeight = caretInfo.height;
            x += (endPosition.location.x) * this.zoomFactor;
            y += (endPosition.location.y + topMargin) * this.zoomFactor;
            if (!isBookmark) {
                if ((scrollTop + 20) > y) {
                    this.viewerContainer.scrollTop = (y - 10);
                }
                else if (scrollTop + pageHeight < y + caretHeight) {
                    this.viewerContainer.scrollTop = y + caretHeight - pageHeight + 10;
                }
            }
            else {
                this.viewerContainer.scrollTop = y - 96;
            }
            if (!skipCursorUpdate) {
                this.selection.updateCaretToPage(startPosition, endPage);
            }
            var scrollBarWidth = this.viewerContainer.offsetWidth - this.viewerContainer.clientWidth;
            if (scrollLeft > x) {
                this.viewerContainer.scrollLeft = x - (this.pageContainer.offsetWidth / 100) * 20;
            }
            else if (scrollLeft + this.visibleBounds.width < x + scrollBarWidth) {
                this.viewerContainer.scrollLeft = scrollLeft + (this.pageContainer.offsetWidth / 100) * 15 + scrollBarWidth;
                while (x < this.owner.viewer.containerWidth && this.viewerContainer.scrollLeft + this.visibleBounds.width < x + scrollBarWidth) {
                    this.viewerContainer.scrollLeft = this.viewerContainer.scrollLeft + (this.pageContainer.offsetWidth / 100) * 15 + scrollBarWidth;
                }
            }
        };
        DocumentHelper.prototype.getLineWidget = function (cursorPoint) {
            return this.getLineWidgetInternal(cursorPoint, false);
        };
        DocumentHelper.prototype.getLineWidgetInternal = function (cursorPoint, isMouseDragged) {
            var widget = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.currentPage)) {
                var childWidgets = void 0;
                if (this.owner.enableHeaderAndFooter) {
                    var page = this.currentPage;
                    var pageBottom = page.boundingRectangle.height;
                    var headerHeight = Math.max((page.headerWidget.y + page.headerWidget.height), editor_helper_1.HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.topMargin)) * this.zoomFactor;
                    var footerDistance = editor_helper_1.HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.footerDistance);
                    var footerHeight = (page.boundingRectangle.height -
                        Math.max(page.footerWidget.height + footerDistance, footerDistance * 2));
                    if (isMouseDragged) {
                        if (this.isBlockInHeader(this.selection.start.paragraph)) {
                            childWidgets = this.currentPage.headerWidget;
                        }
                        else {
                            childWidgets = this.currentPage.footerWidget;
                        }
                    }
                    else {
                        if (cursorPoint.y <= pageBottom && cursorPoint.y >= footerHeight) {
                            childWidgets = this.currentPage.footerWidget;
                        }
                        else if ((cursorPoint.y) >= 0 && (cursorPoint.y) <= headerHeight) {
                            childWidgets = this.currentPage.headerWidget;
                        }
                    }
                    if (ej2_base_2.isNullOrUndefined(childWidgets)) {
                        return undefined;
                    }
                    var shapeElementInfo = this.checkFloatingItems(childWidgets, cursorPoint, isMouseDragged);
                    if (shapeElementInfo.isShapeSelected) {
                        if (shapeElementInfo.isInShapeBorder) {
                            return shapeElementInfo.element.line;
                        }
                        return this.selection.getLineWidgetBodyWidget(shapeElementInfo.element.textFrame, cursorPoint);
                    }
                    else {
                        return this.selection.getLineWidgetBodyWidget(childWidgets, cursorPoint);
                    }
                }
                else {
                    var shapeInfo = undefined;
                    var behindShapeInfo = undefined;
                    for (var i = 0; i < this.currentPage.bodyWidgets.length; i++) {
                        var bodyWidget = this.currentPage.bodyWidgets[i];
                        shapeInfo = this.checkFloatingItems(bodyWidget, cursorPoint, isMouseDragged, false);
                        behindShapeInfo = this.checkFloatingItems(bodyWidget, cursorPoint, isMouseDragged, true);
                        if (shapeInfo.isShapeSelected || behindShapeInfo.isShapeSelected) {
                            break;
                        }
                    }
                    if (shapeInfo.isShapeSelected && !this.isEmptyShape(shapeInfo)) {
                        if (shapeInfo.isInShapeBorder) {
                            return shapeInfo.element.line;
                        }
                        if (shapeInfo.element instanceof page_1.ShapeElementBox) {
                            widget = this.selection.getLineWidgetBodyWidget(shapeInfo.element.textFrame, cursorPoint);
                        }
                    }
                    else if (isMouseDragged && this.isFootnoteWidget) {
                        if (this.selection.start.paragraph.bodyWidget.footNoteReference !== undefined && this.selection.start.paragraph.bodyWidget.containerWidget instanceof page_1.FootNoteWidget && this.selection.start.paragraph.bodyWidget.containerWidget.footNoteType === 'Footnote') {
                            return this.selection.getLineWidgetBodyWidget(this.currentPage.footnoteWidget, cursorPoint);
                        }
                        else if (this.selection.start.paragraph.bodyWidget.footNoteReference !== undefined &&
                            this.selection.start.paragraph.bodyWidget.containerWidget instanceof page_1.FootNoteWidget
                            && this.selection.start.paragraph.bodyWidget.containerWidget.footNoteType === 'Endnote') {
                            return this.selection.getLineWidgetBodyWidget(this.currentPage.endnoteWidget, cursorPoint);
                        }
                    }
                    else {
                        if (!isMouseDragged && this.currentPage.footnoteWidget && this.isInFootnoteWidget(this.currentPage.footnoteWidget, cursorPoint)) {
                            widget = this.selection.getLineWidgetBodyWidget(this.currentPage.footnoteWidget, cursorPoint);
                            if (widget) {
                                this.isFootnoteWidget = true;
                            }
                        }
                        else if (!isMouseDragged && this.currentPage.endnoteWidget &&
                            this.isInFootnoteWidget(this.currentPage.endnoteWidget, cursorPoint)) {
                            widget = this.selection.getLineWidgetBodyWidget(this.currentPage.endnoteWidget, cursorPoint);
                            if (widget) {
                                this.isFootnoteWidget = true;
                            }
                        }
                        else {
                            for (var i_1 = 0; i_1 < this.currentPage.bodyWidgets.length; i_1++) {
                                var bodyWidget_1 = this.currentPage.bodyWidgets[i_1];
                                if (i_1 < this.currentPage.bodyWidgets.length - 1) {
                                    if (cursorPoint.x <= bodyWidget_1.x + bodyWidget_1.width) {
                                        widget = this.selection.getLineWidgetBodyWidget(bodyWidget_1, cursorPoint, true);
                                        if (!ej2_base_2.isNullOrUndefined(widget) && widget.paragraph.y <= cursorPoint.y
                                            && (widget.paragraph.y + widget.paragraph.height) >= cursorPoint.y) {
                                            this.isFootnoteWidget = false;
                                            break;
                                        }
                                    }
                                }
                                if (cursorPoint.x > bodyWidget_1.x + bodyWidget_1.width && this.layout.getNextWidgetHeight(bodyWidget_1) >= cursorPoint.y && bodyWidget_1.y <= cursorPoint.y) {
                                    if (ej2_base_2.isNullOrUndefined(bodyWidget_1.nextRenderedWidget) || !(this.layout.getNextWidgetHeight(bodyWidget_1.nextRenderedWidget) >= cursorPoint.y && bodyWidget_1.nextRenderedWidget.y <= cursorPoint.y)) {
                                        widget = this.selection.getLineWidgetBodyWidget(bodyWidget_1, cursorPoint, true);
                                        if (!ej2_base_2.isNullOrUndefined(widget) && widget.paragraph.y <= cursorPoint.y
                                            && (widget.paragraph.y + widget.paragraph.height) >= cursorPoint.y) {
                                            this.isFootnoteWidget = false;
                                            break;
                                        }
                                    }
                                }
                                if (i_1 == this.currentPage.bodyWidgets.length - 1) {
                                    widget = this.selection.getLineWidgetBodyWidget(bodyWidget_1, cursorPoint, true);
                                    if (!ej2_base_2.isNullOrUndefined(widget) && widget.paragraph.y <= cursorPoint.y
                                        && (widget.paragraph.y + widget.paragraph.height) >= cursorPoint.y) {
                                        this.isFootnoteWidget = false;
                                        break;
                                    }
                                }
                                if (cursorPoint.x < bodyWidget_1.x && i_1 < this.currentPage.bodyWidgets.length - 1) {
                                    widget = this.selection.getLineWidgetBodyWidget(bodyWidget_1, cursorPoint, true);
                                    if (!ej2_base_2.isNullOrUndefined(widget) && widget.paragraph.y <= cursorPoint.y
                                        && (widget.paragraph.y + widget.paragraph.height) >= cursorPoint.y) {
                                        this.isFootnoteWidget = false;
                                        break;
                                    }
                                    else if (!ej2_base_2.isNullOrUndefined(widget) && i_1 === this.currentPage.bodyWidgets.length - 1) {
                                        this.isFootnoteWidget = false;
                                        break;
                                    }
                                }
                            }
                        }
                        var inlineShapeInfo = this.checkInlineShapeItems(widget, cursorPoint, isMouseDragged);
                        if (inlineShapeInfo.isShapeSelected) {
                            if (inlineShapeInfo.isInShapeBorder) {
                                return inlineShapeInfo.element.line;
                            }
                            if (inlineShapeInfo.element instanceof page_1.ShapeElementBox) {
                                widget = this.selection.getLineWidgetBodyWidget(inlineShapeInfo.element.textFrame, cursorPoint);
                            }
                        }
                        else if (!this.checkPointIsInLine(widget, cursorPoint) && behindShapeInfo.isShapeSelected) {
                            if (behindShapeInfo.isInShapeBorder) {
                                return behindShapeInfo.element.line;
                            }
                            if (behindShapeInfo.element instanceof page_1.ShapeElementBox) {
                                widget = this.selection.getLineWidgetBodyWidget(behindShapeInfo.element.textFrame, cursorPoint);
                            }
                        }
                    }
                }
            }
            return widget;
        };
        DocumentHelper.prototype.checkInlineShapeItems = function (widget, cursorPoint, isMouseDragged) {
            var isInShape = false;
            var isInShapeBorder = false;
            var floatingElement;
            var selectionInShape = this.selection.isInShape;
            var isMouseDraggedInShape = isMouseDragged && selectionInShape;
            if (!ej2_base_2.isNullOrUndefined(widget) && widget.children.length > 0) {
                if (isMouseDraggedInShape) {
                    var textFrame = this.owner.selection.getCurrentTextFrame();
                    if (textFrame) {
                        floatingElement = textFrame.containerShape;
                        isInShape = true;
                    }
                }
                else {
                    for (var i = 0; i < widget.children.length; i++) {
                        if (!(widget.children[i] instanceof page_1.ShapeElementBox && widget.children[i].textWrappingStyle === 'Inline')) {
                            continue;
                        }
                        floatingElement = widget.children[i];
                        if (cursorPoint.x < floatingElement.x + floatingElement.margin.left + floatingElement.width &&
                            cursorPoint.x > floatingElement.x && cursorPoint.y < floatingElement.y + floatingElement.margin.top +
                            floatingElement.height && cursorPoint.y > floatingElement.y) {
                            isInShape = true;
                            if (this.isInShapeBorder(floatingElement, cursorPoint)) {
                                isInShapeBorder = true;
                            }
                            break;
                        }
                    }
                    if (isMouseDragged && !selectionInShape) {
                        isInShape = false;
                    }
                }
            }
            return {
                'element': floatingElement,
                'caretPosition': cursorPoint,
                'isInShapeBorder': isInShapeBorder,
                'isShapeSelected': isInShape
            };
        };
        DocumentHelper.prototype.checkPointIsInLine = function (widget, cursorPoint) {
            if (!ej2_base_2.isNullOrUndefined(widget) && widget.children.length > 0) {
                var element = void 0;
                var left = widget.paragraph.x;
                var top_1 = this.selection.getTop(widget);
                for (var i = widget.children.indexOf(widget.children[0]); i < widget.children.length; i++) {
                    element = widget.children[i];
                    if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline') {
                        continue;
                    }
                    if (cursorPoint.x < left + element.margin.left + element.width + element.padding.left
                        && cursorPoint.x > left && cursorPoint.y < top_1 + widget.height && cursorPoint.y > top_1) {
                        return true;
                    }
                    left += element.margin.left + element.width + element.padding.left;
                }
            }
            return false;
        };
        DocumentHelper.prototype.isInFootnoteWidget = function (footnoteWidget, point) {
            for (var i = 0; i < footnoteWidget.bodyWidgets.length; i++) {
                for (var j = 0; j < footnoteWidget.bodyWidgets[i].childWidgets.length; j++) {
                    var childWidget = footnoteWidget.bodyWidgets[i].childWidgets[j];
                    if (childWidget instanceof page_1.Widget && childWidget.y <= point.y
                        && (childWidget.y + childWidget.height) >= point.y) {
                        return true;
                    }
                }
            }
            return false;
        };
        DocumentHelper.prototype.checkFloatingItems = function (blockContainer, cursorPoint, isMouseDragged, isBehind) {
            var isInShape = false;
            var isInShapeBorder = false;
            var floatElement;
            var selectionInShape = this.selection.isInShape;
            var isMouseDraggedInShape = isMouseDragged && selectionInShape;
            if (blockContainer.floatingElements.length > 0) {
                var page = this.currentPage;
                blockContainer.floatingElements.sort(function (a, b) {
                    if (a instanceof page_2.TableWidget || b instanceof page_2.TableWidget) {
                        return 0;
                    }
                    else {
                        return a.zOrderPosition - b.zOrderPosition;
                    }
                });
                if (isMouseDraggedInShape) {
                    var textFrame = this.owner.selection.getCurrentTextFrame();
                    if (textFrame) {
                        floatElement = textFrame.containerShape;
                        isInShape = true;
                    }
                }
                else {
                    for (var i = blockContainer.floatingElements.length - 1; i >= 0; i--) {
                        if (blockContainer.floatingElements[i] instanceof page_2.TableWidget
                            || (!ej2_base_2.isNullOrUndefined(isBehind) && isBehind ? blockContainer.floatingElements[i].textWrappingStyle !== 'Behind' : blockContainer.floatingElements[i].textWrappingStyle === 'Behind')) {
                            continue;
                        }
                        floatElement = blockContainer.floatingElements[i];
                        if (cursorPoint.x < floatElement.x + floatElement.margin.left + floatElement.width &&
                            cursorPoint.x > floatElement.x && cursorPoint.y < floatElement.y + floatElement.margin.top +
                            floatElement.height && cursorPoint.y > floatElement.y) {
                            isInShape = true;
                            if (this.isInShapeBorder(floatElement, cursorPoint)) {
                                isInShapeBorder = true;
                            }
                            break;
                        }
                    }
                    if (isMouseDragged && !selectionInShape) {
                        isInShape = false;
                    }
                }
            }
            return {
                'element': floatElement,
                'caretPosition': cursorPoint,
                'isShapeSelected': isInShape,
                'isInShapeBorder': isInShapeBorder
            };
        };
        DocumentHelper.prototype.isBlockInHeader = function (block) {
            while (!(block.containerWidget instanceof page_1.HeaderFooterWidget)) {
                if (!block.containerWidget) {
                    return false;
                }
                block = block.containerWidget;
                if (block instanceof page_1.TextFrame) {
                    block = block.containerShape.paragraph;
                }
            }
            return block.containerWidget.headerFooterType.indexOf('Header') !== -1;
        };
        DocumentHelper.prototype.clearSelectionHighlight = function () {
            var canClear = true;
            canClear = (!this.isControlPressed || !this.isMouseDown);
            if (this.owner.selection.clearSelectionHighlightInSelectedWidgets()) {
                this.selectionContext.clearRect(0, 0, this.selectionCanvas.width, this.selectionCanvas.height);
            }
        };
        DocumentHelper.prototype.removeEmptyPages = function () {
            var scrollToLastPage = false;
            var pageIndex = this.selection.startPage - 1;
            for (var j = 0; j < this.pages.length; j++) {
                var page = this.pages[j];
                for (var i = 0; i < page.bodyWidgets.length; i++) {
                    if (page.bodyWidgets.length === 0 || page.bodyWidgets[i].childWidgets.length === 0) {
                        if (page.bodyWidgets.length >= 1) {
                            var startindex = page.bodyWidgets.indexOf(page.bodyWidgets[i]);
                            page.bodyWidgets.splice(startindex, 1);
                            i--;
                        }
                    }
                }
                if (page.bodyWidgets.length <= 0) {
                    if (j === this.pages.length - 1 && this.owner.viewer instanceof PageLayoutViewer && this.owner.viewer.visiblePages.indexOf(this.pages[j]) !== -1) {
                        scrollToLastPage = true;
                    }
                    this.removePage(this.pages[j]);
                    j--;
                }
            }
            if (!ej2_base_2.isNullOrUndefined(this.pages[pageIndex])) {
                var page = this.pages[pageIndex];
                if (page.headerWidget) {
                    page.headerWidget.page = page;
                }
                if (page.footerWidget) {
                    page.footerWidget.page = page;
                }
            }
            if (scrollToLastPage) {
                this.scrollToBottom();
            }
        };
        DocumentHelper.prototype.scrollToBottom = function () {
            if (this.selection.start.paragraph && this.selection.start.paragraph.bodyWidget) {
                var page = this.selection.start.paragraph.bodyWidget.page;
                var containerHeight = this.visibleBounds.height;
                this.viewerContainer.scrollTop = page.boundingRectangle.bottom - containerHeight;
            }
        };
        DocumentHelper.prototype.getFieldResult = function (fieldBegin, page) {
            if (!ej2_base_2.isNullOrUndefined(page) && !ej2_base_2.isNullOrUndefined(this.selection) && !ej2_base_2.isNullOrUndefined(fieldBegin)) {
                var fieldCode = this.selection.getFieldCode(fieldBegin);
                var fieldCodes = fieldCode.split('\*');
                var fieldCategory = fieldCodes[0].replace(/[^\w\s]/gi, '').trim().toLowerCase();
                var fieldPattern = '';
                if (fieldCodes.length > 1) {
                    if (fieldCodes[1] !== ' MERGEFORMAT') {
                        fieldPattern = fieldCodes[1].replace(/[^\w\s]/gi, '').trim();
                    }
                }
                if (fieldPattern == '') {
                    fieldPattern = page.bodyWidgets[0].sectionFormat.pageNumberStyle;
                }
                if (fieldCategory.indexOf(' ') !== -1) {
                    fieldCategory = fieldCategory.split(' ')[0];
                }
                switch (fieldCategory) {
                    case 'page':
                        if (page.bodyWidgets[0].sectionFormat.restartPageNumbering && page.sectionIndex !== 0) {
                            var currentSectionIndex_1 = page.sectionIndex;
                            var previousPage = page.previousPage;
                            if (currentSectionIndex_1 !== previousPage.sectionIndex && previousPage.bodyWidgets[previousPage.bodyWidgets.length - 1].sectionIndex !== currentSectionIndex_1) {
                                page.currentPageNum = (page.bodyWidgets[0].sectionFormat.pageStartingNumber);
                                return this.getFieldText(fieldPattern, page.currentPageNum);
                            }
                            if (previousPage.currentPageNum === 1 && currentSectionIndex_1 !== previousPage.sectionIndex) {
                                previousPage.currentPageNum = (page.bodyWidgets[0].sectionFormat.pageStartingNumber);
                            }
                            page.currentPageNum = previousPage.currentPageNum + 1;
                            return this.getFieldText(fieldPattern, page.currentPageNum);
                        }
                        else if (page.bodyWidgets[0].sectionFormat.restartPageNumbering && page.sectionIndex === 0) {
                            page.currentPageNum = page.bodyWidgets[0].sectionFormat.pageStartingNumber + page.index;
                            return this.getFieldText(fieldPattern, page.currentPageNum);
                        }
                        if (!ej2_base_2.isNullOrUndefined(page.previousPage) && page.previousPage.bodyWidgets[0].sectionFormat.restartPageNumbering && page.previousPage.bodyWidgets[page.previousPage.bodyWidgets.length - 1].sectionIndex !== page.sectionIndex) {
                            page.currentPageNum = page.previousPage.currentPageNum + 1;
                        }
                        else {
                            page.currentPageNum = page.index + 1;
                        }
                        return this.getFieldText(fieldPattern, page.currentPageNum);
                    case 'numpages':
                        return this.getFieldText(fieldPattern, page.documentHelper.pages.length);
                    case 'sectionpages':
                        var currentSectionIndex = page.sectionIndex;
                        var currentPageCount = 0;
                        for (var i = 0; i < page.documentHelper.pages.length; i++) {
                            if (page.documentHelper.pages[i].sectionIndex === currentSectionIndex) {
                                currentPageCount++;
                            }
                            else if (currentPageCount !== 0) {
                                break;
                            }
                        }
                        return this.getFieldText(fieldPattern, currentPageCount);
                    default:
                        break;
                }
            }
            return '';
        };
        DocumentHelper.prototype.getFieldText = function (pattern, value) {
            switch (pattern) {
                case 'ALPHABETIC':
                    return this.layout.getAsLetter(value).toUpperCase();
                case 'alphabetic':
                    return this.layout.getAsLetter(value).toLowerCase();
                case 'roman':
                    return this.layout.getAsRoman(value).toLowerCase();
                case 'ROMAN':
                    return this.layout.getAsRoman(value).toUpperCase();
                case 'RomanUpper':
                    return this.layout.getAsRoman(value).toUpperCase();
                case 'RomanLower':
                    return this.layout.getAsRoman(value).toLowerCase();
                case 'LetterUpper':
                    return this.layout.getAsLetter(value).toUpperCase();
                case 'LetterLower':
                    return this.layout.getAsLetter(value).toLowerCase();
                default:
                    return value.toString();
            }
        };
        DocumentHelper.prototype.isEmptyShape = function (shape) {
            var isEmpty = true;
            if (shape.element instanceof page_1.ImageElementBox) {
                return isEmpty;
            }
            var textFrame = shape.element.textFrame;
            if (textFrame.childWidgets.length === 0) {
                return isEmpty;
            }
            else {
                return false;
            }
        };
        DocumentHelper.prototype.destroy = function () {
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.unWireEvent();
            }
            if (this.styles) {
                this.styles.destroy();
                this.styles = undefined;
            }
            if (this.stylesMap) {
                this.stylesMap.destroy();
                this.stylesMap = undefined;
            }
            if (this.characterFormat) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            if (this.themeFontLanguage) {
                this.themeFontLanguage.destroy();
                this.themeFontLanguage = undefined;
            }
            if (this.paragraphFormat) {
                this.paragraphFormat.destroy();
                this.paragraphFormat = undefined;
            }
            if (this.pages && this.pages.length > 0) {
                for (var i = 0; i < this.pages.length; i++) {
                    var page = this.pages[i];
                    page.componentDestroy();
                }
                this.pages = [];
            }
            this.pages = undefined;
            if (this.lists && this.lists.length > 0) {
                for (var i = 0; i < this.lists.length; i++) {
                    var list = this.lists[i];
                    list.destroy();
                }
                this.lists = [];
            }
            this.lists = undefined;
            if (this.formFillPopup) {
                this.formFillPopup.destroy();
                this.formFillPopup = undefined;
            }
            this.L10n = undefined;
            this.currentPage = undefined;
            this.selectionStartPageIn = undefined;
            this.selectionEndPageIn = undefined;
            this.fieldStacks = [];
            this.fieldStacks = undefined;
            this.splittedCellWidgets = [];
            this.splittedCellWidgets = undefined;
            this.fields = [];
            this.fields = undefined;
            this.abstractLists = [];
            this.abstractLists = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.renderedLists.destroy();
            }
            this.renderedLists = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.authors.destroy();
            }
            this.authors = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.revisionsInternal.destroy();
            }
            this.revisionsInternal = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.preDefinedStyles.destroy();
            }
            this.preDefinedStyles = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.bookmarks.destroy();
            }
            this.bookmarks = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.editRanges.destroy();
            }
            this.editRanges = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.customXmlData.destroy();
            }
            if (!ej2_base_2.isNullOrUndefined(this.owner)) {
                this.images.destroy();
            }
            this.customXmlData = undefined;
            this.images = undefined;
            this.blockToShift = undefined;
            this.cachedPages = [];
            this.cachedPages = undefined;
            if (this.comments && this.comments.length > 0) {
                for (var i = 0; i < this.comments.length; i++) {
                    var comment = this.comments[i];
                    comment.destroy();
                }
                this.comments = [];
            }
            this.comments = undefined;
            this.compositionEnd = undefined;
            this.compositionStart = undefined;
            this.compositionUpdated = undefined;
            this.contentControlCollection = [];
            this.contentControlCollection = undefined;
            this.renderedLevelOverrides = [];
            this.renderedLevelOverrides = undefined;
            this.headersFooters = [];
            this.headersFooters = undefined;
            this.listParagraphs = [];
            this.listParagraphs = undefined;
            this.formFields = [];
            this.formFields = undefined;
            this.fieldCollection = [];
            this.fieldCollection = undefined;
            this.userCollection = [];
            this.userCollection = undefined;
            if (this.footnotes) {
                this.footnotes.componentDestroy();
                this.footnotes = undefined;
            }
            if (this.endnotes) {
                this.endnotes.componentDestroy();
                this.endnotes = undefined;
            }
            if (this.zoomModule) {
                this.zoomModule.destroy();
                this.zoomModule = undefined;
            }
            this.footnoteCollection = [];
            this.footnoteCollection = undefined;
            this.endnoteCollection = [];
            this.endnoteCollection = undefined;
            if (this.restrictEditingPane) {
                this.restrictEditingPane.destroy();
                this.restrictEditingPane = undefined;
            }
            if (this.layout) {
                this.layout.destroy();
            }
            this.layout = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.render)) {
                this.render.destroy();
            }
            this.render = undefined;
            if (this.dialogInternal) {
                this.dialogInternal.destroy();
            }
            this.dialogInternal = undefined;
            if (this.dialogInternal2) {
                this.dialogInternal2.destroy();
                this.dialogInternal2 = undefined;
            }
            if (this.dialogInternal3) {
                this.dialogInternal3.destroy();
                this.dialogInternal3 = undefined;
            }
            if (this.dialogTarget1 && this.dialogTarget1.parentElement) {
                this.dialogTarget1.parentElement.removeChild(this.dialogTarget1);
            }
            this.dialogTarget1 = undefined;
            if (this.dialogTarget2 && this.dialogTarget2.parentElement) {
                this.dialogTarget2.parentElement.removeChild(this.dialogTarget2);
            }
            this.dialogTarget2 = undefined;
            if (this.dialogTarget3 && this.dialogTarget3.parentElement) {
                this.dialogTarget3.parentElement.removeChild(this.dialogTarget3);
            }
            this.dialogTarget3 = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.touchStart)) {
                this.touchStart.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.touchStart.parentElement)) {
                    this.touchStart.parentElement.removeChild(this.touchStart);
                }
            }
            this.touchStart = undefined;
            if (this.textHelper) {
                this.textHelper.destroy();
            }
            this.textHelper = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.touchEnd)) {
                this.touchEnd.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.touchEnd.parentElement)) {
                    this.touchEnd.parentElement.removeChild(this.touchEnd);
                }
            }
            this.touchEnd = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.containerCanvasIn)) {
                this.containerCanvasIn.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.containerCanvasIn.parentElement)) {
                    this.containerCanvasIn.parentElement.removeChild(this.containerCanvasIn);
                }
            }
            this.containerCanvasIn = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.selectionCanvasIn)) {
                this.selectionCanvasIn.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.selectionCanvasIn.parentElement)) {
                    this.selectionCanvasIn.parentElement.removeChild(this.selectionCanvasIn);
                }
            }
            this.selectionCanvasIn = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.editableDiv)) {
                this.editableDiv.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.editableDiv.parentElement)) {
                    this.editableDiv.parentElement.removeChild(this.editableDiv);
                }
            }
            this.editableDiv = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.pageContainer)) {
                this.pageContainer.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.pageContainer.parentElement)) {
                    this.pageContainer.parentElement.removeChild(this.pageContainer);
                }
            }
            this.pageContainer = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.viewerContainer)) {
                this.viewerContainer.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.viewerContainer.parentElement)) {
                    this.viewerContainer.parentElement.removeChild(this.viewerContainer);
                }
            }
            if (!ej2_base_2.isNullOrUndefined(this.iframe)) {
                this.iframe.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.iframe.parentElement)) {
                    this.iframe.parentElement.removeChild(this.iframe);
                }
                this.iframe = undefined;
            }
            if (this.optionsPaneContainer) {
                this.optionsPaneContainer.innerHTML = '';
                if (!ej2_base_2.isNullOrUndefined(this.optionsPaneContainer.parentElement)) {
                    this.optionsPaneContainer.parentElement.removeChild(this.optionsPaneContainer);
                }
            }
            this.optionsPaneContainer = undefined;
            this.visibleBoundsIn = undefined;
            this.mouseDownOffset = undefined;
            this.viewerContainer = undefined;
            this.currentPage = undefined;
            this.selectionStartPageIn = undefined;
            this.selectionEndPageIn = undefined;
            this.currentSelectedCommentInternal = undefined;
            this.currentSelectedRevisionInternal = undefined;
            this.owner = undefined;
            this.heightInfoCollection = undefined;
        };
        DocumentHelper.prototype.unWireEvent = function () {
            this.viewerContainer.removeEventListener('scroll', this.scrollHandler);
            this.viewerContainer.removeEventListener('mousedown', this.onMouseDownInternal);
            this.viewerContainer.removeEventListener('mousemove', this.onMouseMoveInternal);
            if (!ej2_base_1.Browser.isDevice) {
                this.editableDiv.removeEventListener('keypress', this.onKeyPressInternal);
                if (ej2_base_1.Browser.info.name === 'chrome') {
                    this.editableDiv.removeEventListener('textInput', this.onTextInput);
                }
            }
            else {
                this.editableDiv.removeEventListener('input', this.onTextInputInternal);
            }
            this.editableDiv.removeEventListener('paste', this.onPaste);
            this.viewerContainer.removeEventListener('contextmenu', this.onContextMenu);
            this.editableDiv.removeEventListener('blur', this.onFocusOut);
            this.editableDiv.removeEventListener('keydown', this.onKeyDownInternal);
            this.editableDiv.removeEventListener('compositionstart', this.compositionStart);
            this.editableDiv.removeEventListener('compositionupdate', this.compositionUpdated);
            this.editableDiv.removeEventListener('compositionend', this.compositionEnd);
            this.viewerContainer.removeEventListener('mouseup', this.onMouseUpInternal);
            if (!ej2_base_2.isNullOrUndefined(this.iframe)) {
                this.iframe.removeEventListener('load', this.onIframeLoad);
            }
            this.viewerContainer.removeEventListener('dblclick', this.onDoubleTap);
            window.removeEventListener('resize', this.onWindowResize);
            window.removeEventListener('keyup', this.onKeyUpInternal);
            window.removeEventListener('mouseup', this.onImageResizer);
            window.removeEventListener('touchend', this.onImageResizer);
            if (navigator !== undefined && navigator.userAgent.match('Firefox')) {
                this.viewerContainer.removeEventListener('DOMMouseScroll', this.zoomModule.onMouseWheelInternal);
            }
            this.viewerContainer.removeEventListener('mousewheel', this.zoomModule.onMouseWheelInternal);
        };
        DocumentHelper.prototype.updateCursor = function (event) {
            var hyperlinkField = undefined;
            var footnoteElement = undefined;
            var div = this.viewerContainer;
            var point = new editor_helper_1.Point(event.offsetX, event.offsetY);
            var touchPoint = this.owner.viewer.findFocusedPage(point, true);
            var widget = this.getLineWidget(touchPoint);
            var widgetInfo;
            var left;
            var top;
            var editor = !this.owner.isReadOnlyMode ? this.owner.editorModule : undefined;
            var isRowResize = editor ? editor.tableResize.isInRowResizerArea(touchPoint) : false;
            var isCellResize = editor ? editor.tableResize.isInCellResizerArea(touchPoint) : false;
            var floatItemInfo = this.selection.checkAllFloatingElements(widget, touchPoint);
            var resizePosition = '';
            if (this.owner.enableImageResizerMode) {
                var resizeObj = this.owner.imageResizerModule.getImagePoint(touchPoint);
                this.owner.imageResizerModule.selectedResizeElement = resizeObj.selectedElement;
                resizePosition = resizeObj.resizePosition;
            }
            var lineLeft = 0;
            var formField = undefined;
            var referenceField = undefined;
            var isInInline = this.checkPointIsInLine(widget, touchPoint);
            if (!ej2_base_2.isNullOrUndefined(widget)) {
                lineLeft = this.selection.getLineStartLeft(widget);
                hyperlinkField = this.selection.getHyperLinkFieldInCurrentSelection(widget, touchPoint);
                if (ej2_base_2.isNullOrUndefined(hyperlinkField)) {
                    formField = this.selection.getHyperLinkFieldInCurrentSelection(widget, touchPoint, true);
                }
                if (!ej2_base_2.isNullOrUndefined(hyperlinkField)) {
                    var code = this.selection.getFieldCode(hyperlinkField);
                    if (code.toLowerCase().indexOf('ref ') === 0 && !code.match('\\h')) {
                        hyperlinkField = undefined;
                    }
                }
                widgetInfo = this.selection.updateTextPositionIn(widget, undefined, 0, touchPoint, true);
                left = this.selection.getLeft(widget);
                top = this.selection.getTop(widget);
                if (ej2_base_2.isNullOrUndefined(hyperlinkField) && !ej2_base_2.isNullOrUndefined(formField) && this.isDocumentProtected &&
                    this.protectionType === 'FormFieldsOnly' && !this.isFormFilling) {
                    this.selection.setHyperlinkContentToToolTip(formField, widget, touchPoint.x, true);
                }
                else {
                    this.selection.setHyperlinkContentToToolTip(hyperlinkField, widget, touchPoint.x, false);
                }
                if (formField) {
                    var isInlineFormFillMode = (formField.formFieldData instanceof page_1.TextFormField) && formField.formFieldData.type === 'Text';
                    if (this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Inline' && isInlineFormFillMode) {
                        formField = undefined;
                    }
                }
                if (this.owner.enableLockAndEdit) {
                    var isLocked = false;
                    var block = widget.paragraph;
                    if (block.isInsideTable) {
                        block = this.layout.getParentTable(block);
                    }
                    if (block.locked && block.lockedBy !== this.owner.currentUser) {
                        isLocked = true;
                    }
                    var sectionFormat = widget.paragraph.bodyWidget.sectionFormat;
                    var pageWidth = sectionFormat.pageWidth - sectionFormat.rightMargin - sectionFormat.leftMargin;
                    pageWidth = editor_helper_1.HelperMethods.convertPointToPixel(pageWidth) * this.zoomFactor;
                    if (this.viewer instanceof WebLayoutViewer) {
                        pageWidth = (this.visibleBounds.width - (this.viewer.padding.right * 5)) / this.zoomFactor;
                    }
                    if (isLocked && touchPoint.x >= lineLeft && touchPoint.x < lineLeft + pageWidth) {
                        this.selection.setLockInfoTooptip(widget, touchPoint.x, block.lockedBy);
                    }
                    else {
                        this.selection.setLockInfoTooptip(undefined, touchPoint.x, '');
                    }
                }
            }
            if (!ej2_base_2.isNullOrUndefined(widget)) {
                if (ej2_base_2.isNullOrUndefined(footnoteElement) && this.owner.layoutType == 'Pages') {
                    footnoteElement = this.selection.getFootNoteElementInCurrentSelection(widget, touchPoint);
                    if (footnoteElement instanceof page_1.FootnoteElementBox) {
                        this.selection.setFootnoteContentToToolTip(footnoteElement, widget, touchPoint.x);
                    }
                }
            }
            var isCtrlkeyPressed = this.isIosDevice ? event.metaKey : event.ctrlKey;
            if ((!ej2_base_2.isNullOrUndefined(hyperlinkField) && (isCtrlkeyPressed &&
                this.owner.useCtrlClickToFollowHyperlink || !this.owner.useCtrlClickToFollowHyperlink)) || formField) {
                if (!ej2_base_2.isNullOrUndefined(formField)) {
                    if (this.isFormFillProtectedMode) {
                        div.style.cursor = 'default';
                    }
                }
                else {
                    div.style.cursor = 'pointer';
                }
                return;
            }
            else if (touchPoint.x >= lineLeft &&
                event.offsetX < (this.visibleBounds.width - (this.visibleBounds.width - this.viewerContainer.clientWidth)) &&
                event.offsetY < (this.visibleBounds.height - (this.visibleBounds.height - this.viewerContainer.clientHeight))) {
                if (this.selection.isEmpty) {
                    div.style.cursor = 'text';
                }
                else {
                    div.style.cursor = this.selection.checkCursorIsInSelection(widget, touchPoint) ? 'default' : 'text';
                }
            }
            else {
                div.style.cursor = 'default';
            }
            if (!ej2_base_2.isNullOrUndefined(resizePosition) && resizePosition !== '') {
                if (!this.owner.imageResizerModule.isShapeResize || this.owner.imageResizerModule.isShapeResize && resizePosition !== 'move') {
                    div.style.cursor = resizePosition;
                }
            }
            else if (!ej2_base_2.isNullOrUndefined(widgetInfo) && widgetInfo.isImageSelected && left < touchPoint.x && top < touchPoint.y &&
                left + widget.width > touchPoint.x && top + widget.height > touchPoint.y) {
                div.style.cursor = 'move';
            }
            if (isRowResize) {
                div.style.cursor = 'row-resize';
            }
            else if (isCellResize) {
                div.style.cursor = 'col-resize';
            }
            if (floatItemInfo.isInShapeBorder && !isInInline) {
                div.style.cursor = 'all-scroll';
            }
        };
        DocumentHelper.prototype.updateDialogTabHeight = function (dialogElement, targetElement) {
            var header = dialogElement.getElementsByClassName('e-dlg-header-content')[0];
            var contentElement = dialogElement.getElementsByClassName('e-dlg-content')[0];
            var footer = dialogElement.getElementsByClassName('e-footer-content')[0];
            var contentStyle = getComputedStyle(contentElement);
            var dialogStyle = getComputedStyle(dialogElement);
            var paddingTop = parseInt(contentStyle.paddingTop, 10);
            var paddingBottom = parseInt(contentStyle.paddingBottom, 10);
            var paddingVertical = (isNaN(paddingTop) ? 0 : paddingTop) + (isNaN(paddingBottom) ? 0 : paddingBottom);
            var borderTop = parseInt(dialogStyle.borderTop, 10);
            var borderBottom = parseInt(dialogStyle.borderBottom, 10);
            var borderVertical = (isNaN(borderTop) ? 0 : borderTop) + (isNaN(borderBottom) ? 0 : borderBottom);
            var contentHeight = dialogElement.offsetHeight - (header.offsetHeight + footer.offsetHeight + paddingVertical + borderVertical);
            targetElement.style.height = contentHeight + 'px';
            var paddingLeft = parseInt(contentStyle.paddingLeft, 10);
            var paddingRight = parseInt(contentStyle.paddingRight, 10);
            var paddingHorizontal = (isNaN(paddingLeft) ? 0 : paddingLeft) + (isNaN(paddingRight) ? 0 : paddingRight);
            var borderLeft = parseInt(dialogStyle.borderLeft, 10);
            var borderRight = parseInt(dialogStyle.borderRight, 10);
            var borderHorizontal = (isNaN(borderLeft) ? 0 : borderLeft) + (isNaN(borderRight) ? 0 : borderRight);
            var contentWidth = dialogElement.offsetWidth - (paddingHorizontal + borderHorizontal);
            return contentWidth;
        };
        DocumentHelper.prototype.canRenderBorder = function (paragraph) {
            var skipTopBorder = false;
            var skipBottomBorder = false;
            var isSamePreviousBorder;
            var isSameNextBorder;
            var isSameTopBorder;
            var isSameBottomBorder;
            var isSameLeftBorder;
            var isSameRightBorder;
            var previousBlock = paragraph.previousRenderedWidget;
            var nextBlock = paragraph.nextRenderedWidget;
            var paragraphX = this.getParagraphLeftPosition(paragraph);
            var previousBlockX = 0;
            var nextBlockX = 0;
            if (!ej2_base_2.isNullOrUndefined(previousBlock) && previousBlock instanceof page_1.ParagraphWidget) {
                previousBlockX = this.getParagraphLeftPosition(previousBlock);
            }
            if (!ej2_base_2.isNullOrUndefined(nextBlock) && nextBlock instanceof page_1.ParagraphWidget) {
                nextBlockX = this.getParagraphLeftPosition(nextBlock);
            }
            if (!ej2_base_2.isNullOrUndefined(previousBlock) && previousBlock instanceof page_1.ParagraphWidget && paragraphX === previousBlockX) {
                isSameTopBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.top, previousBlock.paragraphFormat.borders.top);
                isSameBottomBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.bottom, previousBlock.paragraphFormat.borders.bottom);
                isSameLeftBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.left, previousBlock.paragraphFormat.borders.left);
                isSameRightBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.right, previousBlock.paragraphFormat.borders.right);
                if (isSameTopBorder && isSameBottomBorder && isSameLeftBorder && isSameRightBorder
                    && !ej2_base_2.isNullOrUndefined(previousBlock.paragraphFormat.borders.horizontal) && previousBlock.paragraphFormat.borders.horizontal.lineStyle === 'None') {
                    skipTopBorder = true;
                }
            }
            if (!ej2_base_2.isNullOrUndefined(nextBlock) && nextBlock instanceof page_1.ParagraphWidget && (paragraphX === nextBlockX || (this.owner.documentHelper.layout.isInitialLoad && this.skipBottomBorder(paragraph, nextBlock)))) {
                isSameTopBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.top, nextBlock.paragraphFormat.borders.top);
                isSameBottomBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.bottom, nextBlock.paragraphFormat.borders.bottom);
                isSameLeftBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.left, nextBlock.paragraphFormat.borders.left);
                isSameRightBorder = this.checkEqualBorder(paragraph.paragraphFormat.borders.right, nextBlock.paragraphFormat.borders.right);
                if (isSameBottomBorder && isSameTopBorder && isSameLeftBorder && isSameRightBorder) {
                    skipBottomBorder = true;
                }
            }
            return {
                'skipTopBorder': skipTopBorder,
                'skipBottomBorder': skipBottomBorder
            };
        };
        DocumentHelper.prototype.checkEqualBorder = function (source, dest) {
            if (!ej2_base_2.isNullOrUndefined(source) && !ej2_base_2.isNullOrUndefined(dest)) {
                return source.isEqualFormat(dest);
            }
            else {
                if (ej2_base_2.isNullOrUndefined(source) && ej2_base_2.isNullOrUndefined(dest)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        DocumentHelper.prototype.getParagraphLeftPosition = function (paragraphWidget) {
            var hangingIndent = 0;
            var startX = 0;
            if (paragraphWidget.paragraphFormat.firstLineIndent < 0) {
                hangingIndent = editor_helper_1.HelperMethods.convertPointToPixel(Math.abs(paragraphWidget.paragraphFormat.firstLineIndent));
                hangingIndent = parseFloat(hangingIndent.toFixed(5));
            }
            if (paragraphWidget.isEmpty() && ((paragraphWidget.paragraphFormat.textAlignment !== 'Left' && paragraphWidget.paragraphFormat.textAlignment !== 'Justify')
                || (paragraphWidget.paragraphFormat.textAlignment === 'Justify' && paragraphWidget.paragraphFormat.bidi))) {
                startX = paragraphWidget.clientX > hangingIndent ? paragraphWidget.clientX - hangingIndent : paragraphWidget.clientX;
                return startX;
            }
            else {
                startX = paragraphWidget.x > hangingIndent ? paragraphWidget.x - hangingIndent : paragraphWidget.x;
                return startX;
            }
        };
        DocumentHelper.prototype.skipBottomBorder = function (paragraph, nextWidget) {
            var currentIndent = 0;
            var previousIndent = 0;
            if (paragraph.paragraphFormat.leftIndent === nextWidget.paragraphFormat.leftIndent) {
                return true;
            }
            else {
                currentIndent = paragraph.paragraphFormat.firstLineIndent < 0 ? Math.abs(paragraph.paragraphFormat.firstLineIndent) : 0;
                previousIndent = nextWidget.paragraphFormat.firstLineIndent < 0 ? Math.abs(nextWidget.paragraphFormat.firstLineIndent) : 0;
                currentIndent = paragraph.paragraphFormat.leftIndent > currentIndent ? paragraph.paragraphFormat.leftIndent - currentIndent : 0;
                previousIndent = nextWidget.paragraphFormat.leftIndent > previousIndent ? nextWidget.paragraphFormat.leftIndent - previousIndent : 0;
                if (currentIndent === previousIndent) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        DocumentHelper.prototype.isPageInVisibleBound = function (page, pageTop) {
            var height = this.visibleBounds.height;
            var vertical = this.viewerContainer.scrollTop;
            var pageH = page.boundingRectangle.height * this.zoomFactor;
            var isTopFit = pageTop >= vertical && pageTop <= vertical + height;
            var isBottomFit = pageTop + pageH >= vertical && pageTop + pageH <= vertical + height;
            var isMiddleFit = pageTop <= vertical && pageTop + pageH >= vertical + height;
            return isTopFit || isBottomFit || isMiddleFit;
        };
        DocumentHelper.prototype.getFirstParagraphInCell = function (cell) {
            var firstBlock = cell.childWidgets[0];
            if (firstBlock instanceof page_1.ParagraphWidget) {
                return firstBlock;
            }
            else {
                return this.getFirstParagraphInFirstCell(firstBlock);
            }
        };
        DocumentHelper.prototype.getFirstParagraphInFirstCell = function (table) {
            if (!ej2_base_2.isNullOrUndefined(table.childWidgets) && table.childWidgets.length > 0) {
                var firstRow = table.childWidgets[0];
                var cell = firstRow.childWidgets[0];
                var block = cell.childWidgets[0];
                return this.getFirstParagraphBlock(block);
            }
            return undefined;
        };
        DocumentHelper.prototype.getLastParagraphInLastCell = function (table) {
            if (!ej2_base_2.isNullOrUndefined(table.childWidgets) && table.childWidgets.length > 0) {
                var lastrow = table.lastChild;
                var lastcell = lastrow.lastChild;
                var lastBlock = lastcell.lastChild;
                return this.getLastParagraphBlock(lastBlock);
            }
            return undefined;
        };
        DocumentHelper.prototype.getFirstParagraphBlock = function (block) {
            if (block instanceof page_1.ParagraphWidget) {
                return block;
            }
            else if (block instanceof page_2.TableWidget) {
                return this.getFirstParagraphInFirstCell(block);
            }
            return undefined;
        };
        DocumentHelper.prototype.getLastParagraphBlock = function (block) {
            if (block instanceof page_1.ParagraphWidget) {
                return block;
            }
            else if (block instanceof page_2.TableWidget) {
                return this.getLastParagraphInLastCell(block);
            }
            return undefined;
        };
        DocumentHelper.prototype.getLastParagraphInFirstRow = function (table) {
            if (table.childWidgets.length > 0) {
                var row = table.firstChild;
                var lastcell = row.lastChild;
                var lastBlock = lastcell.lastChild;
                return this.getLastParagraphBlock(lastBlock);
            }
            return undefined;
        };
        DocumentHelper.prototype.getFirstParagraphInLastRow = function (table) {
            if (table.childWidgets.length > 0) {
                var lastRow = table.childWidgets[table.childWidgets.length - 1];
                var lastCell = lastRow.childWidgets[0];
                var lastBlock = lastCell.childWidgets[0];
                return this.getFirstParagraphBlock(lastBlock);
            }
            return undefined;
        };
        DocumentHelper.prototype.addToStylesMap = function (style) {
            var returnStyle = {};
            var returnStyleObject = {};
            var paraIcon = 'e-list-icon e-de-listview-icon e-de-e-paragraph-style-mark e-icons';
            var charIcon = 'e-list-icon e-de-listview-icon e-de-e-character-style-mark e-icons';
            var linkedIcon = 'e-list-icon e-de-listview-icon e-de-e-linked-style-mark e-icons';
            if (!ej2_base_2.isNullOrUndefined(style)) {
                var styleName = this.owner ? this.L10n.getConstant(style.name) : style.name;
                returnStyle.StyleName = (styleName === '') ? style.name : styleName;
                if (style.type == "Paragraph") {
                    returnStyleObject.paragraphFormat = {};
                    editor_helper_1.HelperMethods.writeParagraphFormat(returnStyleObject.paragraphFormat, true, style.paragraphFormat);
                }
                returnStyleObject.characterFormat = {};
                editor_helper_1.HelperMethods.writeCharacterFormat(returnStyleObject.characterFormat, true, style.characterFormat);
                returnStyle.Style = this.parseStyle(JSON.stringify(returnStyleObject));
                if (!ej2_base_2.isNullOrUndefined(style.type)) {
                    returnStyle.type = style.type;
                    if (returnStyle.type == "Paragraph" && !ej2_base_2.isNullOrUndefined(style.link)) {
                        returnStyle.type = "Linked";
                    }
                }
                if (returnStyle.type == "Paragraph") {
                    returnStyle.IconClass = paraIcon;
                }
                else if (returnStyle.type == "Character") {
                    returnStyle.IconClass = charIcon;
                }
                else {
                    returnStyle.IconClass = linkedIcon;
                }
                if (this.stylesMap.get(returnStyle.type)) {
                    this.stylesMap.get(returnStyle.type).push(returnStyle);
                }
                else {
                    this.stylesMap.add(returnStyle.type, [returnStyle]);
                }
            }
        };
        DocumentHelper.prototype.parseStyle = function (style) {
            var domStyle = '';
            var styleObj = JSON.parse(style);
            var textDecoration = '';
            if (!ej2_base_2.isNullOrUndefined(styleObj.characterFormat.baselineAlignment) && styleObj.characterFormat.baselineAlignment !== 'Normal') {
                var vAlign = '';
                switch (styleObj.characterFormat.baselineAlignment) {
                    case 'Superscript':
                        vAlign = 'super';
                        break;
                    case 'Subscript':
                        vAlign = 'sub';
                        break;
                }
                if (vAlign.length > 1) {
                    domStyle += 'vertical-align:' + vAlign + ';';
                }
            }
            if (!ej2_base_2.isNullOrUndefined(styleObj.characterFormat.underline) && styleObj.characterFormat.underline !== 'None') {
                textDecoration += 'underline ';
            }
            if (!ej2_base_2.isNullOrUndefined(styleObj.characterFormat.strikethrough) && styleObj.characterFormat.strikethrough !== 'None') {
                textDecoration += 'line-through ';
            }
            if (!ej2_base_2.isNullOrUndefined(styleObj.characterFormat.fontSize)) {
                domStyle += 'font-size:' + styleObj.characterFormat.fontSize + 'px;';
            }
            if (!ej2_base_2.isNullOrUndefined(styleObj.characterFormat.fontFamily)) {
                domStyle += 'font-family:' + styleObj.characterFormat.fontFamily + ';';
            }
            if (!ej2_base_2.isNullOrUndefined(styleObj.characterFormat.bold) && styleObj.characterFormat.bold) {
                domStyle += 'font-weight:bold;';
            }
            if (!ej2_base_2.isNullOrUndefined(styleObj.characterFormat.italic) && styleObj.characterFormat.italic) {
                domStyle += 'font-style:italic;';
            }
            if (textDecoration.length > 1) {
                domStyle += 'text-decoration:' + textDecoration + ';';
            }
            return domStyle;
        };
        return DocumentHelper;
    }());
    exports.DocumentHelper = DocumentHelper;
    var LayoutViewer = (function () {
        function LayoutViewer(owner) {
            this.visiblePages = [];
            this.padding = new page_1.Padding(10, 10, 30, 10);
            this.textWrap = true;
            this.pageFitTypeIn = 'None';
            this.containerTop = 0;
            this.containerWidth = 0;
            this.containerLeft = 0;
            this.owner = owner;
            this.columnLayoutArea = new ColumnLayout(this);
        }
        Object.defineProperty(LayoutViewer.prototype, "documentHelper", {
            get: function () {
                return this.owner.documentHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayoutViewer.prototype, "pageFitType", {
            get: function () {
                return this.pageFitTypeIn;
            },
            set: function (value) {
                this.pageFitTypeIn = value;
                this.onPageFitTypeChanged(this.pageFitTypeIn);
            },
            enumerable: true,
            configurable: true
        });
        LayoutViewer.prototype.updateClientArea = function (bodyWidget, page, isReLayout) {
            var sectionFormat;
            if (!ej2_base_2.isNullOrUndefined(bodyWidget)) {
                sectionFormat = bodyWidget.sectionFormat;
                this.columnLayoutArea.setColumns(sectionFormat);
            }
            var width = 0;
            var height = 0;
            if (this instanceof WebLayoutViewer) {
                var top_2 = 0;
                width = (this.documentHelper.visibleBounds.width - (this.padding.right * 4) - (this.padding.left * 2)) / this.documentHelper.zoomFactor;
                if (width < 0) {
                    width = 0;
                }
                height = Number.POSITIVE_INFINITY;
                this.clientArea = new page_1.Rect(this.padding.left / this.documentHelper.zoomFactor, top_2, width, height);
                this.clientActiveArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
            }
            else {
                var top_3 = 0;
                var headerDistance = 48;
                var footerDistance = 48;
                var pageHeight = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageHeight);
                var bottomMargin = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.bottomMargin);
                if (!ej2_base_2.isNullOrUndefined(sectionFormat)) {
                    top_3 = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                    headerDistance = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.headerDistance);
                    footerDistance = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.footerDistance);
                }
                var isEmptyWidget = false;
                if (!ej2_base_2.isNullOrUndefined(page.headerWidget)) {
                    isEmptyWidget = page.headerWidget.isEmpty;
                    if (top_3 >= 0) {
                        if (!isEmptyWidget || isEmptyWidget && this.owner.enableHeaderAndFooter) {
                            top_3 = Math.min(Math.max(headerDistance + page.headerWidget.height, top_3), pageHeight / 100 * 40);
                        }
                    }
                    else {
                        top_3 = Math.abs(top_3);
                    }
                }
                var bottom = 0.667 + bottomMargin;
                if (!ej2_base_2.isNullOrUndefined(page.footerWidget)) {
                    isEmptyWidget = page.footerWidget.isEmpty;
                    var footnoteHeight = !ej2_base_2.isNullOrUndefined(page.footnoteWidget) ? page.footnoteWidget.height : 0;
                    footnoteHeight = Math.min(footnoteHeight, ((pageHeight - top_3 - bottom) / 100 * 90));
                    if (bottom >= 0) {
                        if (!isEmptyWidget || isEmptyWidget && this.owner.enableHeaderAndFooter) {
                            bottom = 0.667 + Math.min(pageHeight / 100 * 40, Math.max(footerDistance + page.footerWidget.height, bottomMargin));
                        }
                    }
                    else {
                        bottom = Math.abs(bottom);
                    }
                    bottom += footnoteHeight;
                }
                if (!ej2_base_2.isNullOrUndefined(sectionFormat)) {
                    width = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.leftMargin - sectionFormat.rightMargin);
                    height = pageHeight - top_3 - bottom;
                }
                if (width < 0) {
                    width = 0;
                }
                var clientArea = new page_1.Rect(editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin), top_3, width, pageHeight - top_3 - bottom);
                if (page.footnoteWidget && isReLayout && !this.documentHelper.owner.editor.isFootNote) {
                    if (page.footnoteWidget.y !== 0 && this.clientArea.y + this.clientArea.height > page.footnoteWidget.y) {
                        var sub = (this.clientArea.y + this.clientArea.height - page.footnoteWidget.y);
                        this.clientArea.height -= sub / 2;
                    }
                }
                if (bodyWidget.page.bodyWidgets[0].columnIndex !== 0) {
                    this.owner.editor.updateColumnIndex(bodyWidget, false);
                }
                this.setClientArea(bodyWidget, clientArea);
                this.clientActiveArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
            }
        };
        LayoutViewer.prototype.setClientArea = function (bodyWidget, clientArea) {
            this.clientArea = this.columnLayoutArea.getColumnBoundsByBodyWidget(bodyWidget, clientArea);
            bodyWidget.x = this.clientArea.x;
            bodyWidget.width = this.clientArea.width;
        };
        LayoutViewer.prototype.updateClientAreaTopOrLeft = function (tableWidget, beforeLayout) {
            if (beforeLayout) {
                this.clientActiveArea.y = this.clientActiveArea.y + tableWidget.topBorderWidth;
                this.clientActiveArea.x = this.clientActiveArea.x + tableWidget.leftBorderWidth;
            }
        };
        LayoutViewer.prototype.updateClientAreaForTable = function (tableWidget) {
            this.clientActiveArea.x = this.clientArea.x = tableWidget.x;
            this.clientActiveArea.width = this.clientArea.width = tableWidget.width;
        };
        LayoutViewer.prototype.updateClientAreaForRow = function (row, beforeLayout) {
            var tableWidget = row.ownerTable;
            if (beforeLayout) {
            }
            else {
                this.clientActiveArea.x = this.clientArea.x = tableWidget.x;
                this.clientActiveArea.width = this.clientArea.width = tableWidget.width;
                this.clientArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
                this.clientActiveArea = new page_1.Rect(this.clientActiveArea.x, this.clientActiveArea.y, this.clientActiveArea.width, this.clientActiveArea.height);
            }
        };
        LayoutViewer.prototype.updateClientAreaForCell = function (cell, beforeLayout) {
            var rowWidget = cell.ownerRow;
            var cellWidget = cell;
            if (beforeLayout) {
                this.clientActiveArea.x = this.clientArea.x = cellWidget.x;
                this.clientActiveArea.y = cellWidget.y;
                this.clientActiveArea.width = this.clientArea.width = cellWidget.width > 0 ? cellWidget.width : 0;
                if (this instanceof PageLayoutViewer) {
                    this.clientActiveArea.height = Number.POSITIVE_INFINITY;
                }
                this.clientArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
                this.clientActiveArea = new page_1.Rect(this.clientActiveArea.x, this.clientActiveArea.y, this.clientActiveArea.width, this.clientActiveArea.height);
            }
            else {
                this.clientActiveArea.x = this.clientArea.x = cellWidget.x + cellWidget.width + cellWidget.margin.right;
                if (rowWidget.x + rowWidget.width - this.clientArea.x < 0) {
                    this.clientActiveArea.width = this.clientArea.width = 0;
                }
                else {
                    this.clientActiveArea.width = this.clientArea.width = rowWidget.x + rowWidget.width - this.clientArea.x;
                }
                this.clientActiveArea.y = cellWidget.y - cellWidget.margin.top - editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing);
                if (!cell.ownerTable.isInsideTable) {
                    this.clientActiveArea.height = this.clientArea.bottom - rowWidget.y > 0 ? this.clientArea.bottom - rowWidget.y : 0;
                    if (!cell.ownerTable.wrapTextAround && this.documentHelper.layout.existFootnoteHeight > 0) {
                        var updateHeight = this.clientActiveArea.height - this.documentHelper.layout.existFootnoteHeight;
                        this.clientActiveArea.height = updateHeight < 0 ? 0 : updateHeight;
                    }
                }
                this.clientArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
                this.clientActiveArea = new page_1.Rect(this.clientActiveArea.x, this.clientActiveArea.y, this.clientActiveArea.width, this.clientActiveArea.height);
            }
        };
        LayoutViewer.prototype.updateClientAreaForTextBoxShape = function (textBox, beforeLayout, shiftNextWidget) {
            if (textBox.textWrappingStyle === 'Inline' && !shiftNextWidget) {
                textBox.y = this.clientActiveArea.y;
                textBox.x = this.clientActiveArea.x;
            }
            if (beforeLayout) {
                var marginLeft = editor_helper_1.HelperMethods.convertPointToPixel(textBox.textFrame.marginLeft);
                var marginRight = editor_helper_1.HelperMethods.convertPointToPixel(textBox.textFrame.marginRight);
                var marginTop = editor_helper_1.HelperMethods.convertPointToPixel(textBox.textFrame.marginTop);
                var marginBottom = editor_helper_1.HelperMethods.convertPointToPixel(textBox.textFrame.marginBottom);
                var width = textBox.width;
                var height = Number.POSITIVE_INFINITY;
                this.clientArea = new page_1.Rect(textBox.x + marginLeft, textBox.y + marginTop, width - marginLeft - marginRight, height - marginTop - marginBottom);
                this.clientActiveArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
            }
        };
        LayoutViewer.prototype.updateClientAreaByWidgetFootNote = function (widget) {
            this.clientArea.x = widget.x;
            this.clientArea.y = widget.y;
            this.clientActiveArea.x = widget.x;
            this.clientActiveArea.y = widget.y;
        };
        LayoutViewer.prototype.updateClientAreaForTextWrap = function (area) {
            this.clientActiveArea = new page_1.Rect(area.x, area.y, area.width, area.height);
        };
        LayoutViewer.prototype.updateBoundsBasedOnTextWrap = function (bottom) {
            var diff = bottom - this.clientActiveArea.y;
            this.clientActiveArea.y = bottom;
            this.clientActiveArea.height = this.clientActiveArea.height - diff;
        };
        LayoutViewer.prototype.updateBoundsBasedOnTextWrapTable = function (bottom) {
            var diff = bottom - this.clientArea.y;
            this.clientArea.y = bottom;
            this.clientArea.height = this.clientArea.height - diff;
            this.clientActiveArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
        };
        LayoutViewer.prototype.updateClientAreaByWidget = function (widget) {
            this.clientArea.x = widget.x;
            this.clientArea.y = widget.y;
            this.clientActiveArea.x = widget.x;
            this.clientActiveArea.y = widget.y;
        };
        LayoutViewer.prototype.updateClientAreaLocation = function (widget, area) {
            widget.x = area.x;
            widget.y = area.y;
            widget.width = area.width;
        };
        LayoutViewer.prototype.updateClientAreaForBlock = function (block, beforeLayout, tableCollection, updateYPosition) {
            var leftIndent = editor_helper_1.HelperMethods.convertPointToPixel(block.leftIndent);
            var rightIndent = editor_helper_1.HelperMethods.convertPointToPixel(block.rightIndent);
            var bidi = block.bidi;
            var width = 0;
            if (beforeLayout) {
                if (block instanceof page_2.TableWidget && tableCollection) {
                    var tableWidget = tableCollection[0];
                    if (block.bodyWidget.sectionFormat.columns.length <= 1) {
                        this.clientActiveArea.x = this.clientArea.x = tableWidget.x;
                        this.clientActiveArea.width = this.clientArea.width = tableWidget.width;
                    }
                    tableWidget = tableCollection[tableCollection.length - 1];
                    tableWidget.x = this.clientActiveArea.x;
                    tableWidget.y = this.clientActiveArea.y;
                }
                else {
                    if (block instanceof page_2.TableWidget && !ej2_base_2.isNullOrUndefined(block.tableFormat)) {
                        if (!block.isGridUpdated) {
                            block.buildTableColumns();
                            block.isGridUpdated = true;
                        }
                        var tableAlignment = this.tableAlignmentForBidi(block, bidi);
                        if (tableAlignment !== 'Left') {
                            var tableWidth = 0;
                            tableWidth = editor_helper_1.HelperMethods.convertPointToPixel(block.tableHolder.getTotalWidth(0));
                            tableWidth = tableWidth === 0 ? block.tableHolder.tableWidth === 0 ?
                                block.getTableClientWidth(block.getOwnerWidth(false)) : block.tableHolder.tableWidth : tableWidth;
                            if (this.owner.editor && this.owner.editor.tableResize.currentResizingTable === block
                                && this.owner.editor.tableResize.resizerPosition === 0) {
                                tableWidth = editor_helper_1.HelperMethods.convertPointToPixel(block.tableHolder.tableWidth);
                            }
                            if (tableAlignment === 'Center') {
                                if (!this.documentHelper.isRowOrCellResizing) {
                                    tableWidth = block.getTableCellWidth();
                                }
                                leftIndent = (this.clientArea.width - tableWidth) / 2;
                            }
                            else {
                                leftIndent = this.clientArea.width - tableWidth;
                            }
                            if (bidi) {
                                leftIndent = leftIndent - editor_helper_1.HelperMethods.convertPointToPixel(block.leftIndent);
                                rightIndent = leftIndent;
                            }
                            if (!block.isInsideTable) {
                            }
                            this.documentHelper.tableLefts.push(leftIndent);
                        }
                    }
                    width = this.clientArea.width - (leftIndent + editor_helper_1.HelperMethods.convertPointToPixel(block.rightIndent));
                    var x = this.clientArea.x + (bidi ? rightIndent : leftIndent);
                    width = width > 0 ? width : 0;
                    this.clientActiveArea.x = this.clientArea.x = x;
                    this.clientActiveArea.width = this.clientArea.width = width;
                    if (updateYPosition) {
                        this.updateParagraphYPositionBasedonTextWrap(block, new page_1.Rect(this.clientActiveArea.x, this.clientActiveArea.y, this.clientActiveArea.width, this.clientActiveArea.height));
                    }
                }
            }
            else {
                if (block instanceof page_2.TableWidget && !ej2_base_2.isNullOrUndefined(block.tableFormat)) {
                    var tableAlignment = this.tableAlignmentForBidi(block, bidi);
                    if (!block.isGridUpdated) {
                        block.buildTableColumns();
                        block.isGridUpdated = true;
                    }
                    if (tableAlignment !== 'Left' && this.documentHelper.tableLefts.length > 0) {
                        leftIndent = this.documentHelper.tableLefts.pop();
                        if (bidi) {
                            rightIndent = leftIndent;
                        }
                    }
                }
                width = this.clientArea.width + leftIndent + editor_helper_1.HelperMethods.convertPointToPixel(block.rightIndent);
                var x = this.clientArea.x - (bidi ? rightIndent : leftIndent);
                width = width > 0 ? width : 0;
                this.clientActiveArea.x = this.clientArea.x = x;
                this.clientActiveArea.width = this.clientArea.width = width;
            }
            this.clientArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
            this.clientActiveArea = new page_1.Rect(this.clientActiveArea.x, this.clientActiveArea.y, this.clientActiveArea.width, this.clientActiveArea.height);
        };
        LayoutViewer.prototype.updateParagraphYPositionBasedonTextWrap = function (block, rect) {
            var bodyWidget = block.bodyWidget;
            var clientLayoutArea = this.clientActiveArea;
            if (bodyWidget && bodyWidget.floatingElements.length > 0 && block instanceof page_1.ParagraphWidget && !(block.containerWidget instanceof page_1.TextFrame)
                && !block.isInsideTable && !(block.containerWidget instanceof page_1.FootNoteWidget)) {
                var isWord2013 = this.documentHelper.compatibilityMode === 'Word2013';
                var paragraph = block;
                var isEmptyPara = paragraph.isEmpty();
                var paragraphHeight = paragraph.height;
                if (paragraphHeight === 0) {
                    paragraphHeight = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat).Height;
                }
                if (((!paragraph.isInHeaderFooter || paragraph.isInsideTable)
                    || isWord2013)) {
                    var yposition = rect.y;
                    var isFirstItemBottomPositionUpdated = false;
                    bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
                    bodyWidget.floatingElements.sort(function (a, b) { return a.x - b.x; });
                    var previousItem = paragraph.previousRenderedWidget;
                    if (previousItem && (previousItem instanceof page_2.TableWidget) && previousItem.wrapTextAround
                        && !isEmptyPara && !paragraph.isContainsShapeAlone() && isWord2013 && rect.y < previousItem.y) {
                        rect.y = previousItem.y;
                    }
                    for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                        var floatingItem = bodyWidget.floatingElements[i];
                        var isInsideHeaderFooter = false;
                        if (floatingItem instanceof page_1.ShapeBase) {
                            isInsideHeaderFooter = floatingItem.paragraph.isInHeaderFooter;
                        }
                        else {
                            isInsideHeaderFooter = floatingItem.bodyWidget instanceof page_1.HeaderFooterWidget ? true : false;
                        }
                        if (paragraph.isInsideTable) {
                            if (floatingItem instanceof page_2.TableWidget && !floatingItem.isInsideTable) {
                                continue;
                            }
                        }
                        var textWrappingBounds = this.getTextWrappingBound(floatingItem);
                        var textWrappingStyle = floatingItem instanceof page_2.TableWidget ? 'Square' : floatingItem.textWrappingStyle;
                        var textWrappingType = floatingItem instanceof page_2.TableWidget ? 'Both' : floatingItem.textWrappingType;
                        var minimumWidthRequired = 24;
                        if (!(clientLayoutArea.x > (textWrappingBounds.right + minimumWidthRequired) || clientLayoutArea.right < textWrappingBounds.x - minimumWidthRequired)) {
                            if ((((rect.y + (floatingItem instanceof page_2.TableWidget && !isEmptyPara && paragraph.floatingElements.length === 0 ? paragraphHeight : paragraph.height) > textWrappingBounds.y
                                || isFirstItemBottomPositionUpdated) && rect.y < (textWrappingBounds.bottom))) && textWrappingStyle !== 'Inline'
                                && textWrappingStyle !== 'TopAndBottom' && textWrappingStyle !== 'InFrontOfText'
                                && textWrappingStyle !== 'Behind') {
                                var rightIndent = 0;
                                var paragarphRightIndent = editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.rightIndent);
                                var firstLineIndent = editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
                                firstLineIndent = ((!isEmptyPara && paragraph.childWidgets[0].isFirstLine()) && firstLineIndent > 0) ? firstLineIndent : 0;
                                if (rect.x >= textWrappingBounds.x && textWrappingType !== 'Left') {
                                    rightIndent = paragarphRightIndent;
                                }
                                rightIndent = rightIndent < 0 ? rightIndent : 0;
                                if (rect.x < textWrappingBounds.x && rect.x > textWrappingBounds.x && textWrappingType !== 'Left') {
                                    if (rect.right > textWrappingBounds.x) {
                                        rect.width = rect.width - (rect.right - textWrappingBounds.right);
                                    }
                                    if (rect.width < minimumWidthRequired) {
                                        if (isWord2013 || !((floatingItem instanceof page_2.TableWidget) && previousItem === floatingItem)) {
                                            this.updateBoundsBasedOnTextWrap(textWrappingBounds.bottom);
                                            rect = this.clientActiveArea;
                                        }
                                        if ((!isEmptyPara && paragraph.childWidgets[0].isFirstLine() || isEmptyPara) && isWord2013 ? true : !isInsideHeaderFooter) {
                                            paragraph.y = this.clientActiveArea.y;
                                        }
                                    }
                                    else {
                                        rect.x = textWrappingBounds.right;
                                    }
                                }
                                else if (rect.x >= textWrappingBounds.x && rect.x < textWrappingBounds.right) {
                                    rect.width = rect.width - (textWrappingBounds.right - rect.x) - rightIndent;
                                    if (rect.width < minimumWidthRequired || isFirstItemBottomPositionUpdated) {
                                        rect.width = this.clientActiveArea.right - textWrappingBounds.right - rightIndent;
                                        var isPositionsUpdated = false;
                                        if (rect.width < minimumWidthRequired || isFirstItemBottomPositionUpdated) {
                                            if (this.clientActiveArea.x + minimumWidthRequired < textWrappingBounds.x) {
                                                var tempBounds = this.getIntersectingItemBounds(bodyWidget.floatingElements, floatingItem, yposition);
                                                if (!ej2_base_2.isNullOrUndefined(tempBounds) && tempBounds.bottom <= textWrappingBounds.bottom) {
                                                    this.updateBoundsBasedOnTextWrap(tempBounds.bottom);
                                                    rect = this.clientActiveArea;
                                                    isPositionsUpdated = true;
                                                    paragraph.x = tempBounds.x;
                                                }
                                            }
                                            if ((isWord2013) && !isPositionsUpdated) {
                                                if (floatingItem instanceof page_2.TableWidget && previousItem === floatingItem) {
                                                    this.updateBoundsBasedOnTextWrapTable(textWrappingBounds.bottom);
                                                }
                                                else {
                                                    this.updateBoundsBasedOnTextWrap(textWrappingBounds.bottom);
                                                }
                                                rect = this.clientActiveArea;
                                            }
                                            if ((!isEmptyPara && paragraph.childWidgets[0].isFirstLine() || isEmptyPara) && isWord2013 ? true : !isInsideHeaderFooter) {
                                                paragraph.y = this.clientActiveArea.y;
                                            }
                                        }
                                        else {
                                            rect.x = textWrappingBounds.right;
                                        }
                                    }
                                    else {
                                        rect.x = textWrappingBounds.right;
                                    }
                                }
                                else if (textWrappingBounds.x > rect.x && rect.right > textWrappingBounds.x) {
                                    rect.width = textWrappingBounds.x - rect.x;
                                    if (rect.width < minimumWidthRequired) {
                                        rect.width = this.clientActiveArea.right - textWrappingBounds.right - rightIndent;
                                        if (rect.width < minimumWidthRequired) {
                                            if (isWord2013 || !((floatingItem instanceof page_2.TableWidget) && previousItem === floatingItem)) {
                                                this.updateBoundsBasedOnTextWrap(textWrappingBounds.bottom);
                                                rect = this.clientActiveArea;
                                            }
                                            if ((!isEmptyPara && paragraph.childWidgets[0].isFirstLine() || isEmptyPara) && isWord2013 ? true : !isInsideHeaderFooter) {
                                                paragraph.y = this.clientActiveArea.y;
                                            }
                                        }
                                        else {
                                            rect.x = textWrappingBounds.right;
                                        }
                                    }
                                }
                            }
                            else if ((bodyWidget.floatingElements.length > 0 && ((rect.y >= (textWrappingBounds.y) && rect.y < (textWrappingBounds.bottom))
                                || ((rect.y + paragraphHeight >= textWrappingBounds.y) && (rect.y + paragraphHeight < (textWrappingBounds.bottom))))
                                && textWrappingStyle === 'TopAndBottom')) {
                                if (isWord2013 || !((floatingItem instanceof page_2.TableWidget) && previousItem === floatingItem)) {
                                    this.updateBoundsBasedOnTextWrap(textWrappingBounds.bottom);
                                    if (!isWord2013 && (!isEmptyPara && paragraph.childWidgets[0].isFirstLine() || isEmptyPara)) {
                                        isFirstItemBottomPositionUpdated = true;
                                    }
                                }
                                if ((!isEmptyPara && paragraph.childWidgets[0].isFirstLine() || isEmptyPara) && isWord2013 ? true : !isInsideHeaderFooter) {
                                    paragraph.y = this.clientActiveArea.y;
                                }
                            }
                        }
                    }
                }
            }
        };
        LayoutViewer.prototype.getIntersectingItemBounds = function (floatingElements, intersectedfloatingItem, yPosition) {
            var floatingItem = this.getMinBottomFloatingItem(floatingElements, this.getIntersectingFloatingItems(floatingElements, intersectedfloatingItem, yPosition));
            if (!ej2_base_2.isNullOrUndefined(floatingItem)) {
                var floatingItemBound = this.getTextWrappingBound(floatingItem);
                return floatingItemBound;
            }
            return undefined;
        };
        LayoutViewer.prototype.getMinBottomFloatingItem = function (floatingElements, fItems) {
            var minBottomItemIndex = -1;
            var minBottom = Number.MAX_VALUE;
            var skippedCount = 0;
            floatingElements.sort(function (a, b) { return a.x - b.x; });
            for (var i = 0; i < fItems.length; i++) {
                var floatingItem = floatingElements[i];
                var item = this.getTextWrappingBound(floatingItem);
                if (minBottom > item.bottom) {
                    if (floatingItem && fItems.indexOf(floatingItem) + 1 < fItems.length) {
                        skippedCount++;
                    }
                    else {
                        minBottom = item.bottom;
                        minBottomItemIndex = fItems.indexOf(floatingItem);
                    }
                }
            }
            return minBottomItemIndex - skippedCount == 0 ? fItems[minBottomItemIndex] : null;
        };
        LayoutViewer.prototype.getIntersectingFloatingItems = function (floatingElements, intersectedfloatingItem, yPosition) {
            var fItems = [];
            for (var i = 0; i < floatingElements.length; i++) {
                {
                    var floatingItem = floatingElements[i];
                    var itemTextWrapBound = this.getTextWrappingBound(floatingItem);
                    var intersectItemTextWrapBound = this.getTextWrappingBound(intersectedfloatingItem);
                    if (yPosition <= itemTextWrapBound.bottom
                        && intersectItemTextWrapBound.bottom >= itemTextWrapBound.bottom
                        && itemTextWrapBound.right > this.clientActiveArea.x
                        && itemTextWrapBound.x < intersectItemTextWrapBound.x)
                        fItems.push(floatingItem);
                }
            }
            return fItems;
        };
        LayoutViewer.prototype.getTextWrappingBound = function (floatingItem) {
            var distanceLeft = 0;
            var distanceTop = 0;
            var distanceRight = 0;
            var distanceBottom = 0;
            var width = 0;
            if (floatingItem instanceof page_1.ShapeBase) {
                distanceLeft = floatingItem.distanceLeft;
                distanceTop = floatingItem.distanceTop;
                distanceRight = floatingItem.distanceRight;
                distanceBottom = floatingItem.distanceBottom;
                width = floatingItem.width;
            }
            else {
                width = floatingItem.getTableCellWidth();
                distanceLeft = floatingItem.positioning.distanceLeft;
                distanceTop = floatingItem.positioning.distanceTop;
                distanceRight = floatingItem.positioning.distanceRight;
                distanceBottom = floatingItem.positioning.distanceBottom;
            }
            var textWrappingBounds = new page_1.Rect(floatingItem.x - distanceLeft, floatingItem.y - distanceTop, width + distanceLeft + distanceRight, floatingItem.height + distanceTop + distanceBottom);
            return textWrappingBounds;
        };
        LayoutViewer.prototype.tableAlignmentForBidi = function (block, bidi) {
            var tableAlignment = block.tableFormat.tableAlignment;
            if (bidi) {
                if (tableAlignment === 'Left') {
                    tableAlignment = 'Right';
                }
                else if (tableAlignment === 'Right') {
                    tableAlignment = 'Left';
                }
            }
            return tableAlignment;
        };
        LayoutViewer.prototype.cutFromLeft = function (x) {
            if (x < this.clientActiveArea.x) {
                x = this.clientActiveArea.x;
            }
            if (x > this.clientActiveArea.right && this.textWrap) {
                x = this.clientActiveArea.right;
            }
            this.clientActiveArea.width = this.clientActiveArea.right > x ? this.clientActiveArea.right - x : 0;
            this.clientActiveArea.x = x;
        };
        LayoutViewer.prototype.cutFromTop = function (y) {
            if (y < this.clientActiveArea.y) {
                y = this.clientActiveArea.y;
            }
            if (y > this.clientActiveArea.bottom) {
                y = this.clientActiveArea.bottom;
            }
            this.clientActiveArea.height = this.clientActiveArea.bottom - y;
            this.clientActiveArea.x = this.clientArea.x;
            this.clientActiveArea.width = this.clientArea.width;
            this.clientActiveArea.y = y;
        };
        LayoutViewer.prototype.updateClientWidth = function (width) {
            this.clientActiveArea.x -= width;
            if (this.clientActiveArea.width + width > 0) {
                this.clientActiveArea.width += width;
            }
            else {
                this.clientActiveArea.width = 0;
            }
        };
        LayoutViewer.prototype.findFocusedPage = function (currentPoint, updateCurrentPage, updateHeaderFooterPage) {
            var point = new editor_helper_1.Point(currentPoint.x, currentPoint.y);
            point.x += this.documentHelper.viewerContainer.scrollLeft;
            point.y += this.documentHelper.viewerContainer.scrollTop;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                var page = this.documentHelper.pages[i];
                var pageTop = (page.boundingRectangle.y - this.pageGap * (i + 1)) * this.documentHelper.zoomFactor + this.pageGap * (i + 1);
                var pageHeight = (page.boundingRectangle.height * this.documentHelper.zoomFactor) + this.pageGap;
                var pageLeft = page.boundingRectangle.x;
                var pageRight = void 0;
                if (this instanceof PageLayoutViewer) {
                    pageRight = ((page.boundingRectangle.right - pageLeft) * this.documentHelper.zoomFactor) + pageLeft;
                }
                else {
                    pageRight = page.boundingRectangle.right + pageLeft;
                }
                if (pageTop <= point.y && pageTop + pageHeight >= point.y) {
                    if (updateCurrentPage) {
                        this.documentHelper.currentPage = page;
                        if (updateHeaderFooterPage) {
                            if (!ej2_base_2.isNullOrUndefined(page.headerWidget)) {
                                page.headerWidget.page = page;
                            }
                            if (!ej2_base_2.isNullOrUndefined(page.footerWidget)) {
                                page.footerWidget.page = page;
                            }
                        }
                    }
                    point.y = (point.y - (pageTop)) / this.documentHelper.zoomFactor;
                    if (point.x > pageRight) {
                        point.x = page.boundingRectangle.right;
                    }
                    else if (point.x < pageLeft) {
                        point.x = 0;
                    }
                    else {
                        point.x = (point.x - pageLeft) / this.documentHelper.zoomFactor;
                    }
                    return point;
                }
            }
            return point;
        };
        LayoutViewer.prototype.getPageHeightAndWidth = function (height, width, viewerWidth, viewerHeight) {
            height = 0;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                height = height + this.documentHelper.pages[i].boundingRectangle.height;
            }
            width = 0;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                if (width < this.documentHelper.pages[i].boundingRectangle.width) {
                    width = this.documentHelper.pages[i].boundingRectangle.width;
                }
            }
            viewerWidth = this.documentHelper.visibleBounds.width;
            viewerHeight = this.documentHelper.visibleBounds.height;
            return {
                'height': height,
                'width': width,
                'viewerWidth': viewerWidth,
                'viewerHeight': viewerHeight
            };
        };
        LayoutViewer.prototype.renderVisiblePages = function () {
            if (ej2_base_2.isNullOrUndefined(this.visiblePages) || this.visiblePages.length < 1) {
                return;
            }
            this.documentHelper.clearContent();
            for (var i = 0; i < this.visiblePages.length; i++) {
                var page = this.visiblePages[i];
                var width = page.boundingRectangle.width * this.documentHelper.zoomFactor;
                var height = page.boundingRectangle.height * this.documentHelper.zoomFactor;
                var x = page.boundingRectangle.x;
                var y = (page.boundingRectangle.y - this.pageGap * (i + 1)) * this.documentHelper.zoomFactor + this.pageGap * (i + 1);
                this.owner.viewer.renderPage(page, x, y, width, height);
            }
        };
        LayoutViewer.prototype.handleZoom = function () {
            var prevScaleFactor = this.documentHelper.preZoomFactor;
            var page = null;
            var verticalHeight = 0;
            var scrollToPosition = false;
            if (this.documentHelper.selection && ej2_base_2.isNullOrUndefined(this.documentHelper.zoomX && ej2_base_2.isNullOrUndefined(this.documentHelper.zoomY))) {
                var x = 0;
                var y = 0;
                var endPage = this.documentHelper.selection.getPage(this.documentHelper.selection.end.currentWidget.paragraph);
                x = (this.documentHelper.visibleBounds.width - endPage.boundingRectangle.width * prevScaleFactor) / 2;
                if (x < 30) {
                    x = 30;
                }
                y = endPage.boundingRectangle.y * prevScaleFactor + (this.documentHelper.pages.indexOf(endPage) + 1) * this.pageGap * (1 - prevScaleFactor);
                var caretInfo = this.documentHelper.selection.updateCaretSize(this.owner.selection.end, true);
                var topMargin = caretInfo.topMargin;
                var caretHeight = caretInfo.height;
                x += (this.documentHelper.selection.end.location.x) * prevScaleFactor;
                y += (this.documentHelper.selection.end.location.y + topMargin) * prevScaleFactor;
                if (x >= this.containerLeft && x <= this.documentHelper.visibleBounds.width &&
                    y >= this.containerTop && y <= this.containerTop + this.documentHelper.visibleBounds.height) {
                    scrollToPosition = true;
                }
            }
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                verticalHeight = verticalHeight + this.documentHelper.pages[i].boundingRectangle.height;
            }
            var horizontalWidth = 0;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                if (horizontalWidth < this.documentHelper.pages[i].boundingRectangle.width) {
                    horizontalWidth = this.documentHelper.pages[i].boundingRectangle.width;
                }
            }
            var height = (verticalHeight * this.documentHelper.zoomFactor + (this.documentHelper.pages.length + 1) * this.pageGap * (1 - this.documentHelper.zoomFactor)) - this.documentHelper.visibleBounds.height;
            var horWidth = horizontalWidth * this.documentHelper.zoomFactor - this.documentHelper.visibleBounds.width;
            if (this.documentHelper.visibleBounds.width - horizontalWidth * this.documentHelper.zoomFactor < 60) {
                horWidth += 60;
            }
            if (height > 0) {
                var value = this.containerTop;
                if (this.visiblePages.length > 0) {
                    page = this.visiblePages[0];
                    var prevPageTop = (page.boundingRectangle.y - (page.index + 1) * this.pageGap) * prevScaleFactor + (page.index + 1) * this.pageGap;
                    var zoomY = this.documentHelper.zoomY;
                    if (ej2_base_2.isNullOrUndefined) {
                        zoomY = this.documentHelper.visibleBounds.height / 2;
                    }
                    var prevY = value + zoomY;
                    while (prevY > prevPageTop + (page.boundingRectangle.height * prevScaleFactor)) {
                        var pageIndex = page.index + 1;
                        if (pageIndex === this.documentHelper.pages.length) {
                            break;
                        }
                        page = this.documentHelper.pages[pageIndex];
                        prevPageTop = (page.boundingRectangle.y - (page.index + 1) * this.pageGap) * prevScaleFactor + (page.index + 1) * this.pageGap;
                    }
                    var currentY = (page.boundingRectangle.y - (page.index + 1) * this.pageGap) * this.documentHelper.zoomFactor + (page.index + 1) * this.pageGap
                        + ((prevY - prevPageTop) < 0 ? prevY - prevPageTop : (prevY - prevPageTop) * (this.documentHelper.zoomFactor / prevScaleFactor));
                    value = currentY - zoomY;
                    zoomY = this.documentHelper.visibleBounds.height / 2;
                }
                this.documentHelper.viewerContainer.scrollTop = value;
            }
            else {
                this.documentHelper.viewerContainer.scrollTop = 0;
            }
            if (horWidth > 0) {
                var value = this.containerLeft;
                if (this.visiblePages.length > 0) {
                    if (page === null) {
                        page = this.visiblePages[0];
                    }
                    var zoomX = this.documentHelper.zoomX;
                    if (ej2_base_2.isNullOrUndefined(zoomX)) {
                        zoomX = this.documentHelper.visibleBounds.width / 2;
                    }
                    var prevValue = (page.boundingRectangle.width * prevScaleFactor) / page.boundingRectangle.width;
                    var prevX = value + zoomX;
                    var currentX = page.boundingRectangle.x
                        + ((prevX - page.boundingRectangle.x) < 0 ? prevX - page.boundingRectangle.x : (prevX - page.boundingRectangle.x) * (this.documentHelper.zoomFactor / prevValue));
                    value = currentX - zoomX;
                    zoomX = this.documentHelper.visibleBounds.width / 2;
                }
                this.documentHelper.viewerContainer.scrollLeft = value;
            }
            else {
                this.documentHelper.viewerContainer.scrollLeft = 0;
            }
            this.updateScrollBars();
            if (scrollToPosition) {
                this.documentHelper.scrollToPosition(this.documentHelper.selection.start, this.documentHelper.selection.end);
            }
            if (this instanceof WebLayoutViewer) {
                this.owner.editorModule.layoutWholeDocument();
            }
        };
        LayoutViewer.prototype.updateCanvasWidthAndHeight = function (viewerWidth, viewerHeight, containerHeight, containerWidth, width, height) {
            if (this instanceof PageLayoutViewer) {
                if (this.documentHelper.visibleBounds.width !== this.documentHelper.viewerContainer.clientWidth) {
                    viewerWidth -= (this.documentHelper.visibleBounds.width - this.documentHelper.viewerContainer.clientWidth);
                }
                else if (containerHeight > viewerHeight) {
                    viewerWidth -= this.documentHelper.viewerContainer.offsetWidth - this.documentHelper.viewerContainer.clientWidth;
                }
            }
            else {
                if (containerHeight > viewerHeight) {
                    viewerWidth -= this.documentHelper.scrollbarWidth;
                    containerWidth -= this.documentHelper.scrollbarWidth;
                }
            }
            if (containerWidth > viewerWidth) {
                viewerHeight -= this.documentHelper.scrollbarWidth;
            }
            width = containerWidth > viewerWidth ? containerWidth : viewerWidth;
            height = containerHeight > viewerHeight ? containerHeight : viewerHeight;
            if (parseInt(this.documentHelper.pageContainer.style.width.replace('px', ''), 10) !== width ||
                parseInt(this.documentHelper.pageContainer.style.height.replace('px', ''), 10) !== width) {
                this.documentHelper.pageContainer.style.width = width.toString() + 'px';
                this.documentHelper.pageContainer.style.height = height.toString() + 'px';
            }
            var displayPixelRatio = Math.max(1, window.devicePixelRatio || 1);
            if (this.documentHelper.containerCanvas.width !== Math.floor(viewerWidth * displayPixelRatio)
                || this.documentHelper.containerCanvas.height !== Math.floor(viewerHeight * displayPixelRatio)) {
                this.documentHelper.containerCanvas.width = viewerWidth * displayPixelRatio;
                this.documentHelper.containerCanvas.height = viewerHeight * displayPixelRatio;
                this.documentHelper.containerCanvas.style.width = viewerWidth + 'px';
                this.documentHelper.containerCanvas.style.height = viewerHeight + 'px';
                this.documentHelper.containerContext.scale(displayPixelRatio, displayPixelRatio);
                this.documentHelper.selectionCanvas.width = viewerWidth * displayPixelRatio;
                this.documentHelper.selectionCanvas.height = viewerHeight * displayPixelRatio;
                this.documentHelper.selectionCanvas.style.width = viewerWidth + 'px';
                this.documentHelper.selectionCanvas.style.height = viewerHeight + 'px';
                this.documentHelper.selectionContext.scale(displayPixelRatio, displayPixelRatio);
            }
            return {
                'height': height,
                'width': width,
                'viewerWidth': viewerWidth,
                'viewerHeight': viewerHeight,
                'containerHeight': containerHeight,
                'containerWidth': containerWidth
            };
        };
        LayoutViewer.prototype.updateScrollBarPosition = function (containerWidth, containerHeight, viewerWidth, viewerHeight, width, height) {
            this.owner.viewer.containerTop = this.documentHelper.viewerContainer.scrollTop;
            this.owner.viewer.containerWidth = containerWidth;
            this.documentHelper.containerCanvas.style.position = 'absolute';
            this.documentHelper.containerCanvas.style.top = this.owner.viewer.containerTop.toString() + 'px';
            this.documentHelper.selectionCanvas.style.position = 'absolute';
            this.documentHelper.selectionCanvas.style.top = this.owner.viewer.containerTop.toString() + 'px';
            this.owner.viewer.containerLeft = this.documentHelper.viewerContainer.scrollLeft;
            this.documentHelper.containerCanvas.style.left = this.owner.viewer.containerLeft + 'px';
            this.documentHelper.selectionCanvas.style.left = this.owner.viewer.containerLeft + 'px';
        };
        LayoutViewer.prototype.destroy = function () {
            this.clientArea = undefined;
            this.clientActiveArea = undefined;
        };
        LayoutViewer.prototype.componentDestroy = function () {
            this.clientArea = undefined;
            this.clientActiveArea = undefined;
            this.owner = undefined;
        };
        return LayoutViewer;
    }());
    exports.LayoutViewer = LayoutViewer;
    var PageLayoutViewer = (function (_super) {
        __extends(PageLayoutViewer, _super);
        function PageLayoutViewer(owner) {
            var _this = _super.call(this, owner) || this;
            _this.pageLeft = 30;
            _this.owner = owner;
            return _this;
        }
        Object.defineProperty(PageLayoutViewer.prototype, "pageGap", {
            get: function () {
                return this.owner.pageGap;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageLayoutViewer.prototype, "documentHelper", {
            get: function () {
                return this.owner.documentHelper;
            },
            enumerable: true,
            configurable: true
        });
        PageLayoutViewer.prototype.createNewPage = function (section, index) {
            var viewer = this;
            var yPos = this.pageGap;
            if (this.documentHelper.pages.length > 0) {
                yPos = this.documentHelper.pages[this.documentHelper.pages.length - 1].boundingRectangle.bottom + this.pageGap;
            }
            var page = new page_1.Page(this.documentHelper);
            this.updatePageBoundingRectangle(section, page, yPos);
            if (ej2_base_2.isNullOrUndefined(index)) {
                this.documentHelper.pages.push(page);
            }
            else {
                this.documentHelper.pages.splice(index, 0, page);
            }
            page.bodyWidgets.push(section);
            page.bodyWidgets[page.bodyWidgets.length - 1].page = page;
            this.updateClientArea(section, page);
            this.documentHelper.layout.layoutHeaderFooter(section, viewer, page);
            this.updateClientArea(section, page);
            this.documentHelper.layout.footnoteHeight = 0;
            return page;
        };
        PageLayoutViewer.prototype.updatePageBoundingRectangle = function (section, page, yPosition) {
            var pageWidth = !ej2_base_2.isNullOrUndefined(section.sectionFormat) ? editor_helper_1.HelperMethods.convertPointToPixel(section.sectionFormat.pageWidth) : 816;
            var pageHeight = !ej2_base_2.isNullOrUndefined(section.sectionFormat) ? editor_helper_1.HelperMethods.convertPointToPixel(section.sectionFormat.pageHeight) : 1056;
            var xPos = (this.documentHelper.visibleBounds.width - pageWidth * this.documentHelper.zoomFactor) / 2;
            if (xPos < this.pageLeft) {
                xPos = this.pageLeft;
            }
            page.boundingRectangle = new page_1.Rect(xPos, yPosition, pageWidth, pageHeight);
        };
        PageLayoutViewer.prototype.onPageFitTypeChanged = function (pageFitType) {
            var width = this.documentHelper.visibleBounds.width;
            var height = this.documentHelper.visibleBounds.height;
            var section = this.visiblePages[0].bodyWidgets[0];
            var pageWidth = editor_helper_1.HelperMethods.convertPointToPixel(section.sectionFormat.pageWidth);
            var pageHeight = editor_helper_1.HelperMethods.convertPointToPixel(section.sectionFormat.pageHeight);
            switch (pageFitType) {
                case 'FitOnePage':
                    if (height > 0 && pageHeight > 0) {
                        var zoomFactor = (this.documentHelper.visibleBounds.height - 2 * this.pageGap - (this.pageGap - 2)) / pageHeight;
                        if (zoomFactor === this.documentHelper.zoomFactor) {
                            if (!ej2_base_2.isNullOrUndefined(this.owner.selection) && !ej2_base_2.isNullOrUndefined(this.owner.selection.start) &&
                                !ej2_base_2.isNullOrUndefined(this.owner.selection.end)) {
                                this.documentHelper.scrollToPosition(this.owner.selection.start, this.owner.selection.end);
                            }
                        }
                        else {
                            this.documentHelper.zoomFactor = zoomFactor;
                        }
                    }
                    break;
                case 'FitPageWidth':
                    if (width > 0 && pageWidth > 0) {
                        this.documentHelper.zoomFactor = (this.documentHelper.visibleBounds.width - 80) / pageWidth;
                    }
                    break;
                default:
                    this.documentHelper.zoomFactor = 100 / 100;
                    break;
            }
        };
        PageLayoutViewer.prototype.getCurrentPageHeaderFooter = function (section, isHeader) {
            return this.getCurrentHeaderFooter(this.getHeaderFooterType(section, isHeader), section.index);
        };
        PageLayoutViewer.prototype.getHeaderFooterType = function (section, isHeader) {
            var type;
            type = isHeader ? 'OddHeader' : 'OddFooter';
            var page = section.page;
            if (section.sectionFormat.differentFirstPage && (ej2_base_2.isNullOrUndefined(page.previousPage) || (!ej2_base_2.isNullOrUndefined(page.previousPage) && page.sectionIndex !== page.previousPage.sectionIndex && page.previousPage.bodyWidgets[page.previousPage.bodyWidgets.length - 1].sectionIndex !== page.bodyWidgets[0].sectionIndex))) {
                type = isHeader ? 'FirstPageHeader' : 'FirstPageFooter';
            }
            else if (section.sectionFormat.differentOddAndEvenPages && (page.index + 1) % 2 === 0) {
                type = isHeader ? 'EvenHeader' : 'EvenFooter';
            }
            return type;
        };
        PageLayoutViewer.prototype.getCurrentHeaderFooter = function (type, sectionIndex) {
            if (this.documentHelper.headersFooters[sectionIndex]) {
                var index = this.getHeaderFooter(type);
                var headerFooter = this.documentHelper.headersFooters[sectionIndex][index];
                if (!headerFooter) {
                    var currentSecIndex = sectionIndex > 0 ? sectionIndex - 1 : sectionIndex;
                    while (!headerFooter && currentSecIndex !== -1) {
                        headerFooter = this.documentHelper.headersFooters[currentSecIndex][index];
                        currentSecIndex--;
                    }
                    if (!headerFooter) {
                        headerFooter = this.createHeaderFooterWidget(type);
                        headerFooter.isEmpty = true;
                    }
                    if (sectionIndex == 0) {
                        this.documentHelper.headersFooters[sectionIndex][index] = headerFooter;
                    }
                }
                return headerFooter;
            }
            else if (sectionIndex > 0) {
                return this.getCurrentHeaderFooter(type, sectionIndex - 1);
            }
            return undefined;
        };
        PageLayoutViewer.prototype.createHeaderFooterWidget = function (type) {
            var headerFooter = new page_1.HeaderFooterWidget(type);
            var paragraph = new page_1.ParagraphWidget();
            paragraph.childWidgets.push(new page_2.LineWidget(paragraph));
            var style;
            if (type.indexOf('Header') !== -1) {
                style = this.documentHelper.styles.findByName('Header');
            }
            else {
                style = this.documentHelper.styles.findByName('Footer');
            }
            paragraph.paragraphFormat.baseStyle = style;
            paragraph.paragraphFormat.listFormat.baseStyle = style;
            headerFooter.childWidgets.push(paragraph);
            paragraph.containerWidget = headerFooter;
            return headerFooter;
        };
        PageLayoutViewer.prototype.getHeaderFooter = function (type) {
            switch (type) {
                case 'OddHeader':
                    return 0;
                case 'OddFooter':
                    return 1;
                case 'EvenHeader':
                    return 2;
                case 'EvenFooter':
                    return 3;
                case 'FirstPageHeader':
                    return 4;
                case 'FirstPageFooter':
                    return 5;
            }
        };
        PageLayoutViewer.prototype.updateHFClientArea = function (sectionFormat, isHeader) {
            var width = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.leftMargin - sectionFormat.rightMargin);
            if (width < 0) {
                width = 0;
            }
            if (isHeader) {
                this.clientArea = new page_1.Rect(editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin), editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.headerDistance), width, Number.POSITIVE_INFINITY);
            }
            else {
                this.clientArea = new page_1.Rect(editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin), editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageHeight - sectionFormat.footerDistance), width, Number.POSITIVE_INFINITY);
            }
            this.clientActiveArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, this.clientArea.height);
        };
        PageLayoutViewer.prototype.updateHeaderFooterClientAreaWithTop = function (sectionFormat, isHeader, page) {
            this.updateHFClientArea(sectionFormat, isHeader);
            if (!isHeader) {
                if (page.footerWidget.y < this.clientActiveArea.y) {
                    this.clientActiveArea.y = page.footerWidget.y;
                    this.clientActiveArea.height = Number.POSITIVE_INFINITY;
                }
            }
        };
        PageLayoutViewer.prototype.updateFootnoteClientArea = function (sectionFormat, footnote, footNoteType, para) {
            var width = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.leftMargin - sectionFormat.rightMargin);
            var left = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
            var bottomMargin = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.bottomMargin);
            var footerDistance = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.footerDistance);
            var top = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageHeight) - Math.max(footerDistance + footnote.page.footerWidget.height, bottomMargin);
            this.clientArea = new page_1.Rect(left, top, width, Number.POSITIVE_INFINITY);
            this.clientActiveArea = new page_1.Rect(this.clientArea.x, this.clientArea.y, this.clientArea.width, Number.POSITIVE_INFINITY);
        };
        PageLayoutViewer.prototype.scrollToPage = function (pageIndex) {
            var top = 0;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                top = this.documentHelper.pages[i].boundingRectangle.y - (this.pageGap / 2);
                if (i === pageIndex) {
                    break;
                }
            }
            this.documentHelper.viewerContainer.scrollTop = top;
            this.updateScrollBars();
        };
        PageLayoutViewer.prototype.updateScrollBars = function () {
            var updatePositionObj;
            updatePositionObj = this.getPageHeightAndWidth(0, 0, 0, 0);
            var containerWidth = (updatePositionObj.width * this.documentHelper.zoomFactor) + (this.pageLeft * 2);
            var containerHeight = (updatePositionObj.height * this.documentHelper.zoomFactor) + (this.documentHelper.pages.length + 1) * this.pageGap;
            var updateObj;
            updateObj = this.updateCanvasWidthAndHeight(updatePositionObj.viewerWidth, updatePositionObj.viewerHeight, containerHeight, containerWidth, updatePositionObj.width, updatePositionObj.height);
            containerHeight = updateObj.containerHeight;
            containerWidth = updateObj.containerWidth;
            this.documentHelper.containerContext.globalAlpha = 1;
            this.documentHelper.selectionContext.globalAlpha = 0.4;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                var left = (updateObj.width - this.documentHelper.pages[i].boundingRectangle.width * this.documentHelper.zoomFactor) / 2;
                if (left > this.pageLeft) {
                    this.documentHelper.pages[i].boundingRectangle = new page_1.Rect(left, this.documentHelper.pages[i].boundingRectangle.y, this.documentHelper.pages[i].boundingRectangle.width, this.documentHelper.pages[i].boundingRectangle.height);
                }
                else {
                    this.documentHelper.pages[i].boundingRectangle = new page_1.Rect(this.pageLeft, this.documentHelper.pages[i].boundingRectangle.y, this.documentHelper.pages[i].boundingRectangle.width, this.documentHelper.pages[i].boundingRectangle.height);
                }
            }
            this.updateScrollBarPosition(containerWidth, containerHeight, updateObj.viewerWidth, updateObj.viewerHeight, updateObj.width, updateObj.height);
            this.updateVisiblePages();
            this.documentHelper.isScrollToSpellCheck = false;
        };
        PageLayoutViewer.prototype.updateVisiblePages = function () {
            this.visiblePages = [];
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                var page = this.documentHelper.pages[i];
                var y = (page.boundingRectangle.y - this.pageGap * (i + 1)) * this.documentHelper.zoomFactor + this.pageGap * (i + 1);
                var left = page.boundingRectangle.x;
                if (this.documentHelper.isPageInVisibleBound(page, y)) {
                    this.addVisiblePage(page, left, y);
                }
            }
        };
        PageLayoutViewer.prototype.addVisiblePage = function (page, x, y) {
            var _this = this;
            var width = page.boundingRectangle.width * this.documentHelper.zoomFactor;
            var height = page.boundingRectangle.height * this.documentHelper.zoomFactor;
            if (this.owner.enableImageResizerMode && this.owner.imageResizerModule.currentPage !== undefined && this.owner.imageResizerModule.currentPage === page && this.owner.imageResizerModule.isImageResizerVisible) {
                this.owner.imageResizerModule.setImageResizerPositions(x, y, width, height);
            }
            this.visiblePages.push(page);
            if (this.documentHelper.owner.isSpellCheck && this.documentHelper.owner.spellChecker.enableOptimizedSpellCheck && (this.owner.documentHelper.triggerElementsOnLoading || this.owner.documentHelper.isScrollHandler) && (this.documentHelper.cachedPages.indexOf(page.index) < 0 || this.owner.editor.isPasteContentCheck)) {
                this.owner.documentHelper.cachedPages.push(page.index);
                var content = void 0;
                if (this.owner.editor.isPasteContentCheck) {
                    content = !ej2_base_2.isNullOrUndefined(this.owner.editor.copiedTextContent) ? this.owner.editor.copiedTextContent : '';
                }
                else {
                    content = this.documentHelper.owner.spellChecker.getPageContent(page);
                }
                if (content.trim().length > 0) {
                    page.allowNextPageRendering = false;
                    if (!ej2_base_2.isNullOrUndefined(this.owner) && !ej2_base_2.isNullOrUndefined(this.owner.spellChecker)) {
                        this.owner.spellChecker.updateUniqueWords(editor_helper_1.HelperMethods.getSpellCheckData(content));
                    }
                    this.owner.spellChecker.callSpellChecker(this.owner.spellChecker.languageID, content, true, false, false, true).then(function (data) {
                        var jsonObject = JSON.parse(data);
                        if (!ej2_base_2.isNullOrUndefined(_this.owner) && !ej2_base_2.isNullOrUndefined(_this.owner.spellChecker)) {
                            _this.owner.spellChecker.updateUniqueWords(jsonObject.SpellCollection);
                        }
                        page.allowNextPageRendering = true;
                        _this.documentHelper.triggerElementsOnLoading = true;
                        _this.documentHelper.triggerSpellCheck = true;
                        _this.documentHelper.triggerElementsOnLoading = true;
                        _this.renderPage(page, x, y, width, height);
                        _this.documentHelper.triggerSpellCheck = false;
                        _this.documentHelper.triggerElementsOnLoading = false;
                    });
                }
                else {
                    this.renderPage(page, x, y, width, height);
                }
            }
            else {
                this.renderPage(page, x, y, width, height);
            }
        };
        PageLayoutViewer.prototype.renderPage = function (page, x, y, width, height) {
            this.documentHelper.render.renderWidgets(page, x - this.owner.viewer.containerLeft, y - this.owner.viewer.containerTop, width, height);
        };
        return PageLayoutViewer;
    }(LayoutViewer));
    exports.PageLayoutViewer = PageLayoutViewer;
    var WebLayoutViewer = (function (_super) {
        __extends(WebLayoutViewer, _super);
        function WebLayoutViewer(owner) {
            var _this = _super.call(this, owner) || this;
            _this.visiblePages = [];
            _this.owner = owner;
            return _this;
        }
        Object.defineProperty(WebLayoutViewer.prototype, "documentHelper", {
            get: function () {
                return this.owner.documentHelper;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebLayoutViewer.prototype, "pageGap", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        WebLayoutViewer.prototype.createNewPage = function (section, index) {
            var page;
            var yPos = 0;
            var x = 10;
            if (this.documentHelper.pages.length > 0) {
                yPos = this.documentHelper.pages[this.documentHelper.pages.length - 1].boundingRectangle.bottom;
            }
            page = new page_1.Page(this.documentHelper);
            if (this.documentHelper.pages.length === 0) {
                page.boundingRectangle = new page_1.Rect(x, yPos, this.documentHelper.visibleBounds.width, this.documentHelper.visibleBounds.height);
            }
            else {
                page.boundingRectangle = new page_1.Rect(x, yPos - 20, this.documentHelper.visibleBounds.width, this.documentHelper.visibleBounds.height);
            }
            this.documentHelper.pages.push(page);
            this.updateClientArea(undefined, page);
            page.bodyWidgets.push(section);
            page.bodyWidgets[page.bodyWidgets.length - 1].page = page;
            return page;
        };
        WebLayoutViewer.prototype.onPageFitTypeChanged = function (pageFitType) {
            this.documentHelper.zoomFactor = 1;
        };
        WebLayoutViewer.prototype.scrollToPage = function (pageIndex) {
            this.updateScrollBars();
        };
        WebLayoutViewer.prototype.getContentHeight = function () {
            var height = 0;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                var page = this.documentHelper.pages[i];
                if (i === 0) {
                    height += this.padding.top;
                    page.boundingRectangle.y = this.padding.top;
                }
                else {
                    page.boundingRectangle.y = this.documentHelper.pages[i - 1].boundingRectangle.bottom;
                }
                page.boundingRectangle.height = page.bodyWidgets[0].height;
                height += page.bodyWidgets[0].height;
                if (i === this.documentHelper.pages.length - 1) {
                    height += this.padding.bottom;
                }
            }
            return height;
        };
        WebLayoutViewer.prototype.getContentWidth = function () {
            var width = this.documentHelper.visibleBounds.width;
            var currentWidth = width;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                var page = this.documentHelper.pages[i];
                for (var j = 0; j < page.bodyWidgets[0].childWidgets.length; j++) {
                    if (page.bodyWidgets[0].childWidgets[j] instanceof page_2.TableWidget) {
                        var tableWidget = page.bodyWidgets[0].childWidgets[j];
                        var tableWidth = editor_helper_1.HelperMethods.convertPointToPixel(tableWidget.getTableWidth()) *
                            this.documentHelper.zoomFactor + this.padding.left * 4 + this.padding.right * 4
                            + page.boundingRectangle.x;
                        if (currentWidth < tableWidth) {
                            width = tableWidth;
                            currentWidth = tableWidth;
                        }
                    }
                }
                page.boundingRectangle.width = width;
            }
            return width;
        };
        WebLayoutViewer.prototype.updateScrollBars = function () {
            var updatePositionObj;
            updatePositionObj = this.getPageHeightAndWidth(0, 0, 0, 0);
            var containerWidth = this.getContentWidth() * this.documentHelper.zoomFactor + this.padding.left + this.padding.right;
            var containerHeight = this.getContentHeight() * this.documentHelper.zoomFactor + this.padding.top + this.padding.bottom;
            var updateObj;
            updateObj = this.updateCanvasWidthAndHeight(updatePositionObj.viewerWidth, updatePositionObj.viewerHeight, containerHeight, containerWidth, updatePositionObj.width, updatePositionObj.height);
            this.documentHelper.containerContext.globalAlpha = 1;
            this.documentHelper.selectionContext.globalAlpha = 0.4;
            this.updateScrollBarPosition(containerWidth, containerHeight, updateObj.viewerWidth, updateObj.viewerHeight, updateObj.width, updateObj.height);
            this.updateVisiblePages();
            this.documentHelper.isScrollToSpellCheck = false;
        };
        WebLayoutViewer.prototype.updateVisiblePages = function () {
            this.visiblePages = [];
            var page;
            var y;
            var height = this.documentHelper.visibleBounds.height;
            var vertical = this.documentHelper.viewerContainer.scrollTop;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                page = this.documentHelper.pages[i];
                y = (page.boundingRectangle.y) * this.documentHelper.zoomFactor;
                var pageH = page.boundingRectangle.height * this.documentHelper.zoomFactor;
                var isTopFit = y >= vertical && y <= vertical + height;
                var isBottomFit = y + pageH >= vertical && y + pageH <= vertical + height;
                var isMiddleFit = y <= vertical && y + pageH >= vertical + height;
                if (isTopFit || isBottomFit || isMiddleFit) {
                    this.addVisiblePage(page, this.padding.left, y);
                }
            }
        };
        WebLayoutViewer.prototype.addVisiblePage = function (page, x, y) {
            var _this = this;
            var width = this.getContentWidth();
            var height = this.getContentHeight() * this.documentHelper.zoomFactor + this.padding.top + this.padding.bottom;
            if (this.owner.enableImageResizerMode && this.owner.imageResizerModule.currentPage !== undefined && this.owner.imageResizerModule.currentPage === page && this.owner.imageResizerModule.isImageResizerVisible) {
                this.owner.imageResizerModule.setImageResizerPositions(x, y, width, height);
            }
            this.visiblePages.push(page);
            if (this.documentHelper.owner.isSpellCheck && this.documentHelper.owner.spellChecker.enableOptimizedSpellCheck && (this.owner.documentHelper.triggerElementsOnLoading || this.owner.documentHelper.isScrollHandler) && (this.documentHelper.cachedPages.indexOf(page.index) < 0 || this.owner.editor.isPasteContentCheck)) {
                this.owner.documentHelper.cachedPages.push(page.index);
                var contentlen = void 0;
                if (this.owner.editor.isPasteContentCheck) {
                    contentlen = !ej2_base_2.isNullOrUndefined(this.owner.editor.copiedTextContent) ? this.owner.editor.copiedTextContent : '';
                }
                else {
                    contentlen = this.documentHelper.owner.spellChecker.getPageContent(page);
                }
                if (contentlen.trim().length > 0) {
                    page.allowNextPageRendering = false;
                    if (!ej2_base_2.isNullOrUndefined(this.owner) && !ej2_base_2.isNullOrUndefined(this.owner.spellChecker)) {
                        this.owner.spellChecker.updateUniqueWords(editor_helper_1.HelperMethods.getSpellCheckData(contentlen));
                    }
                    this.owner.spellChecker.callSpellChecker(this.owner.spellChecker.languageID, contentlen, true, false, false, true).then(function (data) {
                        var jsonObj = JSON.parse(data);
                        if (!ej2_base_2.isNullOrUndefined(_this.owner) && !ej2_base_2.isNullOrUndefined(_this.owner.spellChecker)) {
                            _this.owner.spellChecker.updateUniqueWords(jsonObj.SpellCollection);
                        }
                        page.allowNextPageRendering = true;
                        _this.owner.documentHelper.triggerSpellCheck = true;
                        _this.owner.documentHelper.triggerElementsOnLoading = true;
                        _this.renderPage(page, x, y, width, height);
                        _this.owner.documentHelper.triggerSpellCheck = false;
                        _this.owner.documentHelper.triggerElementsOnLoading = false;
                    });
                }
                else {
                    this.renderPage(page, x, y, width, height);
                }
            }
            else {
                this.renderPage(page, x, y, width, height);
            }
        };
        WebLayoutViewer.prototype.renderPage = function (page, x, y, width, height) {
            this.documentHelper.render.renderWidgets(page, x - this.owner.viewer.containerLeft, y - this.owner.viewer.containerTop, width, height);
        };
        return WebLayoutViewer;
    }(LayoutViewer));
    exports.WebLayoutViewer = WebLayoutViewer;
    var ColumnLayout = (function () {
        function ColumnLayout(viewer) {
            this.viewerIn = viewer;
            this.clear();
        }
        Object.defineProperty(ColumnLayout.prototype, "currentIndex", {
            get: function () {
                return this.currentIndexIn;
            },
            set: function (value) {
                if (value >= 0) {
                    this.currentIndexIn = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ColumnLayout.prototype, "columnCount", {
            get: function () {
                var colCount;
                if (!ej2_base_2.isNullOrUndefined(this.columnIn)) {
                    colCount = this.numberOfColumnsIn;
                }
                colCount = colCount > 0 ? colCount : 1;
                return colCount;
            },
            enumerable: true,
            configurable: true
        });
        ColumnLayout.prototype.setColumns = function (sectionFormat) {
            this.pageWidth = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.leftMargin - sectionFormat.rightMargin);
            this.numberOfColumnsIn = sectionFormat.numberOfColumns;
            if (!ej2_base_2.isNullOrUndefined(sectionFormat.columns)) {
                var columns = sectionFormat.columns;
                var columnList = [];
                for (var i = 0; i < sectionFormat.numberOfColumns; i++) {
                    var space = this.defaultSpaceIn;
                    var width = 0;
                    if (!ej2_base_2.isNullOrUndefined(columns) && columns.length > 0) {
                        space = columns[i].space;
                        width = columns[i].width;
                    }
                    var col = this.getColumnObj(width, space, sectionFormat.numberOfColumns, sectionFormat.equalWidth);
                    col.index = i;
                    columnList.push(col);
                }
                this.columnIn = columnList;
            }
        };
        ColumnLayout.prototype.clear = function () {
            this.currentIndexIn = 0;
            this.defaultSpaceIn = 36;
            this.columnIn = null;
            this.pageWidth = 0;
        };
        ColumnLayout.prototype.reset = function () {
            this.currentIndex = 0;
        };
        ColumnLayout.prototype.getColumnBounds = function (bodyWidget, clientArea) {
            var colIndex = this.currentIndexIn;
            return this.getColumnBoundsByIndex(colIndex, clientArea);
        };
        ColumnLayout.prototype.getColumnBoundsByBodyWidget = function (bodyWidget, clientArea) {
            var colIndex = bodyWidget.columnIndex;
            return this.getColumnBoundsByIndex(colIndex, clientArea);
        };
        ColumnLayout.prototype.getNextColumnByBodyWidget = function (bodyWidget) {
            var colIndex = bodyWidget.columnIndex;
            var nextColumn = this.getColumnByIndex(colIndex + 1);
            return nextColumn;
        };
        ColumnLayout.prototype.getColumnByIndex = function (index) {
            if (index >= 0 && index < this.columnCount && !ej2_base_2.isNullOrUndefined(this.columnIn) && this.columnIn.length > 0) {
                return this.columnIn[index];
            }
            return undefined;
        };
        ColumnLayout.prototype.getColumnObj = function (colWidth, colSpace, noOfCols, isEqualWidth) {
            var totalSpace = (noOfCols - 1) * colSpace;
            var colObj = new index_1.WColumnFormat();
            if ((isEqualWidth || colWidth === 0) && !ej2_base_2.isNullOrUndefined(this.pageWidth)) {
                colWidth = (this.pageWidth - totalSpace) / noOfCols;
            }
            colObj.width = colWidth;
            colObj.space = colSpace;
            return colObj;
        };
        ColumnLayout.prototype.getColumnBoundsByIndex = function (colIndex, clientArea) {
            var colRect = new page_1.Rect(clientArea.x, clientArea.y, clientArea.width, clientArea.height);
            if (colIndex >= 0 && this.columnIn.length > 0) {
                var curColumn = void 0;
                var prevColumn = void 0;
                if (!ej2_base_2.isNullOrUndefined(this.columnIn[colIndex])) {
                    curColumn = this.getColumnByIndex(colIndex);
                    colRect.width = curColumn.width;
                    for (var i = 0; i < colIndex; i++) {
                        prevColumn = this.columnIn[i];
                        colRect.x += prevColumn.width;
                        colRect.x += prevColumn.space;
                    }
                }
            }
            return colRect;
        };
        return ColumnLayout;
    }());
    exports.ColumnLayout = ColumnLayout;
});
