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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../document-editor/document-editor", "./properties-pane/header-footer-pane", "./properties-pane/image-properties-pane", "./properties-pane/table-of-content-pane", "./properties-pane/table-properties-pane", "./properties-pane/status-bar", "@syncfusion/ej2-popups", "../document-editor/base/constants", "../index", "@syncfusion/ej2-base", "@syncfusion/ej2-popups"], function (require, exports, ej2_base_1, ej2_base_2, document_editor_1, header_footer_pane_1, image_properties_pane_1, table_of_content_pane_1, table_properties_pane_1, status_bar_1, ej2_popups_1, constants_1, index_1, ej2_base_3, ej2_popups_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DocumentEditorContainer = (function (_super) {
        __extends(DocumentEditorContainer, _super);
        function DocumentEditorContainer(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.previousContext = '';
            _this.showHeaderProperties = true;
            _this.defaultLocale = {
                'New': 'New',
                'Insert Footnote': 'Insert Footnote',
                'Insert Endnote': 'Insert Endnote',
                'Footnote Tooltip': 'Insert Footnote (Alt+Ctrl+F).',
                'Endnote Tooltip': 'Insert Endnote (Alt+Ctrl+D).',
                'Open': 'Open',
                'Undo': 'Undo',
                'Redo': 'Redo',
                'Image': 'Image',
                'Table': 'Table',
                'Link': 'Link',
                'Bookmark': 'Bookmark',
                'Table of Contents': 'Table of Contents',
                'HEADING - - - - 1': 'HEADING - - - - 1',
                'HEADING - - - - 2': 'HEADING - - - - 2',
                'HEADING - - - - 3': 'HEADING - - - - 3',
                'Header': 'Header',
                'Footer': 'Footer',
                'Page Setup': 'Page Setup',
                'Page Number': 'Page Number',
                'Break': 'Break',
                'Find': 'Find',
                'Local Clipboard': 'Local Clipboard',
                'Restrict Editing': 'Restrict Editing',
                'Upload from computer': 'Upload from computer',
                'By URL': 'By URL',
                'Page': 'Page',
                'Show properties pane': 'Show properties pane',
                'Hide properties pane': 'Hide properties pane',
                'Next Page': 'Next Page',
                'Continuous': 'Continuous',
                'Header And Footer': 'Header & Footer',
                'Options': 'Options',
                'Levels': 'Levels',
                'Different First Page': 'Different First Page',
                'Different header and footer for odd and even pages': 'Different header and footer for odd and even pages.',
                'Different Odd And Even Pages': 'Different Odd & Even Pages',
                'Different header and footer for first page': 'Different header and footer for first page.',
                'Position': 'Position',
                'Header from Top': 'Header from Top',
                'Footer from Bottom': 'Footer from Bottom',
                'Distance from top of the page to top of the header': 'Distance from top of the page to top of the header.',
                'Distance from bottom of the page to bottom of the footer': 'Distance from bottom of the page to bottom of the footer.',
                'Aspect ratio': 'Aspect ratio',
                'W': 'W',
                'H': 'H',
                'Width': 'Width',
                'Height': 'Height',
                'Text': 'Text',
                'Paragraph': 'Paragraph',
                'Fill': 'Fill',
                'Fill color': 'Fill color',
                'Border Style': 'Border Style',
                'Outside borders': 'Outside borders',
                'All borders': 'All borders',
                'Inside borders': 'Inside borders',
                'Left border': 'Left border',
                'Inside vertical border': 'Inside vertical border',
                'Right border': 'Right border',
                'Top border': 'Top border',
                'Inside horizontal border': 'Inside horizontal border',
                'Bottom border': 'Bottom border',
                'Border color': 'Border color',
                'Border width': 'Border width',
                'Cell': 'Cell',
                'Merge cells': 'Merge cells',
                'Insert Or Delete': 'Insert / Delete',
                'Insert columns to the left': 'Insert columns to the left',
                'Insert columns to the right': 'Insert columns to the right',
                'Insert rows above': 'Insert rows above',
                'Insert rows below': 'Insert rows below',
                'Delete rows': 'Delete rows',
                'Delete columns': 'Delete columns',
                'Cell Margin': 'Cell Margin',
                'Top': 'Top',
                'Bottom': 'Bottom',
                'Left': 'Left',
                'Right': 'Right',
                'Align Text': 'Align Text',
                'Align top': 'Align top',
                'Align bottom': 'Align bottom',
                'Align center': 'Align center',
                'Number of heading or outline levels to be shown in table of contents': 'Number of heading or outline levels to be shown in table of contents.',
                'Show page numbers': 'Show page numbers',
                'Show page numbers in table of contents': 'Show page numbers in table of contents.',
                'Right align page numbers': 'Right align page numbers',
                'Right align page numbers in table of contents': 'Right align page numbers in table of contents.',
                'Use hyperlinks': 'Use hyperlinks',
                'Use hyperlinks instead of page numbers': 'Use hyperlinks instead of page numbers.',
                'Font': 'Font',
                'Font Size': 'Font Size',
                'Font color': 'Font color',
                'Text highlight color': 'Text highlight color',
                'Clear all formatting': 'Clear all formatting',
                'Bold Tooltip': 'Bold (Ctrl+B)',
                'Italic Tooltip': 'Italic (Ctrl+I)',
                'Underline Tooltip': 'Underline (Ctrl+U)',
                'Strikethrough': 'Strikethrough',
                'Superscript Tooltip': 'Superscript (Ctrl+Shift++)',
                'Subscript Tooltip': 'Subscript (Ctrl+=)',
                'Align left Tooltip': 'Align left (Ctrl+L)',
                'Center Tooltip': 'Center (Ctrl+E)',
                'Align right Tooltip': 'Align right (Ctrl+R)',
                'Justify Tooltip': 'Justify (Ctrl+J)',
                'Decrease indent': 'Decrease indent',
                'Increase indent': 'Increase indent',
                'Line spacing': 'Line spacing',
                'Bullets': 'Bullets',
                'Numbering': 'Numbering',
                'Styles': 'Styles',
                'Manage Styles': 'Manage Styles',
                'of': 'of',
                'Fit one page': 'Fit one page',
                'Spell Check': 'Spell Check',
                'Spelling': 'Spelling',
                'Underline errors': 'Underline errors',
                'Fit page width': 'Fit page width',
                'Update': 'Update',
                'Cancel': 'Cancel',
                'Insert': 'Insert',
                'No Border': 'No Border',
                'Create a new document': 'Create a new document.',
                'Open a document': 'Open a document.',
                'Undo Tooltip': 'Undo the last operation (Ctrl+Z).',
                'Redo Tooltip': 'Redo the last operation (Ctrl+Y).',
                'Insert inline picture from a file': 'Insert inline picture from a file.',
                'Insert a table into the document': 'Insert a table into the document',
                'Create Hyperlink': 'Create a link in your document for quick access to web pages and files (Ctrl+K).',
                'Insert a bookmark in a specific place in this document': 'Insert a bookmark in a specific place in this document.',
                'Provide an overview of your document by adding a table of contents': 'Provide an overview of your document by adding a table of contents.',
                'Add or edit the header': 'Add or edit the header.',
                'Add or edit the footer': 'Add or edit the footer.',
                'Open the page setup dialog': 'Open the page setup dialog.',
                'Add page numbers': 'Add page numbers.',
                'Find Text': 'Find text in the document (Ctrl+F).',
                'Toggle between the internal clipboard and system clipboard': 'Toggle between the internal clipboard and system clipboard.</br>' +
                    'Access to system clipboard through script is denied due to browsers security policy. Instead, </br>' +
                    ' 1. You can enable internal clipboard to cut, copy and paste within the component.</br>' +
                    ' 2. You can use the keyboard shortcuts (Ctrl+X, Ctrl+C and Ctrl+V) to cut, copy and paste with system clipboard.',
                'Current Page Number': 'The current page number in the document. Click or tap to navigate specific page.',
                'Read only': 'Read only',
                'Protections': 'Protections',
                'Error in establishing connection with web server': 'Error in establishing connection with web server',
                'Single': 'Single',
                'Double': 'Double',
                'New comment': 'New comment',
                'Comments': 'Comments',
                'Print layout': 'Print layout',
                'Web layout': 'Web layout',
                'Form Fields': 'Form Fields',
                'Text Form': 'Text Form',
                'Check Box': 'Check Box',
                'DropDown': 'Drop-Down',
                'Update Fields': 'Update Fields',
                'Update cross reference fields': 'Update cross reference fields',
                'Track Changes': 'Keep track of the changes made in the document',
                'TrackChanges': 'Track Changes',
                'AllCaps': 'AllCaps',
                'Change case Tooltip': 'Change case',
                'UPPERCASE': 'UPPERCASE',
                'No color': 'No color',
                'Top margin': 'Top margin',
                'Bottom margin': 'Bottom margin',
                'Left margin': 'Left margin',
                'Right margin': 'Right margin',
                'Normal': 'Normal',
                'Heading': 'Heading',
                'Heading 1': 'Heading 1',
                'Heading 2': 'Heading 2',
                'Heading 3': 'Heading 3',
                'Heading 4': 'Heading 4',
                'Heading 5': 'Heading 5',
                'Heading 6': 'Heading 6',
                'ZoomLevelTooltip': 'Zoom level. Click or tap to open the Zoom options.',
                'None': 'None',
                'Borders': 'Borders',
                'ShowHiddenMarks Tooltip': 'Show the hidden characters like spaces, tab, paragraph marks, and breaks.(Ctrl + *)',
                'Columns': 'Columns',
                'Column': 'Column',
                'Page Breaks': 'Page Breaks',
                'Section Breaks': 'Section Breaks',
                'Link to Previous': 'Link to Previous',
                'Link to PreviousTooltip': 'Link this section with previous section header or footer',
                'Alternate Text': 'Alternate Text',
                'The address of this site is not valid. Check the address and try again.': 'The address of this site is not valid. Check the address and try again.',
                'OK': 'OK',
                'Information': 'Information'
            };
            return _this;
        }
        Object.defineProperty(DocumentEditorContainer.prototype, "documentEditor", {
            get: function () {
                return this.documentEditorInternal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditorContainer.prototype, "toolbar", {
            get: function () {
                return this.toolbarModule;
            },
            enumerable: true,
            configurable: true
        });
        DocumentEditorContainer.prototype.getModuleName = function () {
            return 'DocumentEditorContainer';
        };
        DocumentEditorContainer.prototype.onPropertyChanged = function (newModel, oldModel) {
            for (var _i = 0, _a = Object.keys(newModel); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'restrictEditing':
                        this.restrictEditingToggleHelper(newModel.restrictEditing);
                        break;
                    case 'showPropertiesPane':
                        this.showHidePropertiesPane(newModel.showPropertiesPane);
                        break;
                    case 'enableTrackChanges':
                        if (this.documentEditor.documentHelper.isTrackedOnlyMode && !newModel.enableTrackChanges && newModel.enableTrackChanges !== this.enableTrackChanges) {
                            this.enableTrackChanges = true;
                        }
                        if (this.documentEditor) {
                            this.documentEditor.enableTrackChanges = newModel.enableTrackChanges;
                            if (this.toolbarModule) {
                                this.toolbarModule.toggleTrackChanges(newModel.enableTrackChanges);
                            }
                            if (this.documentEditor.enableTrackChanges) {
                                this.documentEditor.documentHelper.showRevision = true;
                            }
                            this.documentEditor.resize();
                        }
                        break;
                    case 'enableLocalPaste':
                        if (this.documentEditor) {
                            this.documentEditor.enableLocalPaste = newModel.enableLocalPaste;
                        }
                        break;
                    case 'serviceUrl':
                        if (this.documentEditor) {
                            this.documentEditor.serviceUrl = newModel.serviceUrl;
                        }
                        break;
                    case 'serverActionSettings':
                        if (this.documentEditor) {
                            this.setserverActionSettings();
                        }
                        break;
                    case 'zIndex':
                        if (this.documentEditor) {
                            this.documentEditor.zIndex = newModel.zIndex;
                        }
                        break;
                    case 'headers':
                        if (this.documentEditor) {
                            this.documentEditor.headers = newModel.headers;
                        }
                        break;
                    case 'locale':
                    case 'enableRtl':
                        this.refresh();
                        break;
                    case 'enableComment':
                        if (this.documentEditor) {
                            this.documentEditor.enableComment = newModel.enableComment;
                        }
                        if (this.toolbarModule) {
                            this.toolbarModule.enableDisableInsertComment(newModel.enableComment);
                        }
                        break;
                    case 'enableSpellCheck':
                        if (this.documentEditor) {
                            this.documentEditor.enableSpellCheck = newModel.enableSpellCheck;
                        }
                        break;
                    case 'documentSettings':
                        if (this.documentEditor) {
                            this.documentEditor.documentSettings.compatibilityMode = this.documentSettings.compatibilityMode;
                        }
                        break;
                    case 'documentEditorSettings':
                        if (this.documentEditor) {
                            this.customizeDocumentEditorSettings();
                        }
                        if (!ej2_base_1.isNullOrUndefined(newModel.documentEditorSettings.fontFamilies)) {
                            var fontFamilyValue = newModel.documentEditorSettings.fontFamilies;
                            this.refreshFontFamilies(fontFamilyValue);
                        }
                        break;
                    case 'toolbarItems':
                        if (this.toolbarModule) {
                            this.toolbarModule.reInitToolbarItems(newModel.toolbarItems);
                        }
                        break;
                    case 'currentUser':
                        if (this.documentEditor) {
                            this.documentEditor.currentUser = newModel.currentUser;
                        }
                        break;
                    case 'userColor':
                        if (this.documentEditor) {
                            this.documentEditor.userColor = newModel.userColor;
                        }
                        break;
                    case 'layoutType':
                        if (this.documentEditor) {
                            this.documentEditor.layoutType = newModel.layoutType;
                            if (newModel.layoutType === 'Continuous') {
                                this.statusBar.togglePageLayout();
                            }
                            else {
                                this.statusBar.toggleWebLayout();
                            }
                        }
                        break;
                    case 'enableToolbar':
                        this.createToolbarContainer(this.enableRtl, true);
                        if (newModel.enableToolbar && this.toolbarModule) {
                            this.toolbarModule.initToolBar(this.toolbarItems);
                            this.toolbarModule.enableDisableInsertComment(this.enableComment);
                            this.toolbarModule.toggleTrackChanges(this.enableTrackChanges);
                        }
                        if (this.documentEditor) {
                            this.documentEditor.resize();
                        }
                        break;
                    case 'height':
                        this.element.style.height = ej2_base_1.formatUnit(this.height);
                        if (this.documentEditor) {
                            this.documentEditor.resize();
                        }
                        this.resize();
                        break;
                    case 'width':
                        this.element.style.width = ej2_base_1.formatUnit(this.width);
                        if (this.documentEditor) {
                            this.documentEditor.resize();
                        }
                        break;
                    case 'enableAutoFocus':
                        if (this.documentEditor) {
                            this.documentEditor.enableAutoFocus = newModel.enableAutoFocus;
                        }
                        break;
                    case 'autoResizeOnVisibilityChange':
                        if (this.documentEditor) {
                            this.documentEditor.autoResizeOnVisibilityChange = newModel.autoResizeOnVisibilityChange;
                        }
                        break;
                }
            }
        };
        DocumentEditorContainer.prototype.preRender = function () {
            this.localObj = new ej2_base_1.L10n('documenteditorcontainer', this.defaultLocale, this.locale);
            if (!ej2_base_1.isNullOrUndefined(this.element) && this.element.id === '') {
                this.element.id = index_1.HelperMethods.getUniqueElementId();
            }
            this.initContainerElement();
        };
        DocumentEditorContainer.prototype.render = function () {
            if (this.toolbarModule) {
                this.toolbarModule.initToolBar(this.toolbarItems);
                this.toolbarModule.enableDisableInsertComment(this.enableComment);
            }
            if (this.height !== '') {
                this.element.style.height = ej2_base_1.formatUnit(this.height);
            }
            if (this.width !== '') {
                this.element.style.width = ej2_base_1.formatUnit(this.width);
            }
            this.element.style.minHeight = '320px';
            this.initializeDocumentEditor();
            if (this.restrictEditing) {
                this.restrictEditingToggleHelper(this.restrictEditing);
            }
            this.headerFooterProperties = new header_footer_pane_1.HeaderFooterProperties(this, this.enableRtl);
            this.imageProperties = new image_properties_pane_1.ImageProperties(this, this.enableRtl);
            this.tocProperties = new table_of_content_pane_1.TocProperties(this, this.enableRtl);
            this.tableProperties = new table_properties_pane_1.TableProperties(this, this.imageProperties, this.enableRtl);
            this.statusBar = new status_bar_1.StatusBar(this.statusBarElement, this);
            ej2_popups_1.createSpinner({ target: this.containerTarget, cssClass: 'e-spin-overlay' });
            this.setserverActionSettings();
            this.renderComplete();
        };
        DocumentEditorContainer.prototype.restrictEditingToggleHelper = function (restrictEditing) {
            this.documentEditor.isReadOnly = restrictEditing;
            if (this.toolbarModule) {
                this.toolbarModule.enableDisableToolBarItem(!restrictEditing, false);
                this.toolbarModule.toggleRestrictEditing(restrictEditing);
            }
            this.showPropertiesPane = !restrictEditing;
            this.showHidePropertiesPane(!restrictEditing);
            this.documentEditor.trackChangesPane.enableDisableButton(!restrictEditing && !this.documentEditor.documentHelper.isDocumentProtected);
        };
        DocumentEditorContainer.prototype.setFormat = function () {
            if (this.characterFormat && this.documentEditor) {
                this.documentEditor.setDefaultCharacterFormat(this.characterFormat);
            }
            if (this.paragraphFormat && this.documentEditor) {
                this.documentEditor.setDefaultParagraphFormat(this.paragraphFormat);
            }
            if (this.sectionFormat && this.documentEditor) {
                this.documentEditor.setDefaultSectionFormat(this.sectionFormat);
            }
        };
        DocumentEditorContainer.prototype.setserverActionSettings = function () {
            if (this.serviceUrl) {
                this.documentEditor.serviceUrl = index_1.HelperMethods.sanitizeString(this.serviceUrl);
            }
            if (this.serverActionSettings.spellCheck) {
                this.documentEditor.serverActionSettings.spellCheck = index_1.HelperMethods.sanitizeString(this.serverActionSettings.spellCheck);
            }
            if (this.serverActionSettings.restrictEditing) {
                this.documentEditor.serverActionSettings.restrictEditing = index_1.HelperMethods.sanitizeString(this.serverActionSettings.restrictEditing);
            }
            if (this.serverActionSettings.systemClipboard) {
                this.documentEditor.serverActionSettings.systemClipboard = index_1.HelperMethods.sanitizeString(this.serverActionSettings.systemClipboard);
            }
            if (this.headers) {
                this.documentEditor.headers = JSON.parse(index_1.HelperMethods.sanitizeString(JSON.stringify(this.headers)));
            }
        };
        DocumentEditorContainer.prototype.customizeDocumentEditorSettings = function () {
            if (this.documentEditorSettings.formFieldSettings) {
                var settings = this.documentEditorSettings.formFieldSettings;
                var documentEditor = this.documentEditor;
                if (!ej2_base_1.isNullOrUndefined(settings.applyShading)) {
                    documentEditor.documentEditorSettings.formFieldSettings.applyShading = settings.applyShading;
                }
                if (!ej2_base_1.isNullOrUndefined(settings.formFillingMode)) {
                    documentEditor.documentEditorSettings.formFieldSettings.formFillingMode = settings.formFillingMode;
                }
                if (!ej2_base_1.isNullOrUndefined(settings.formattingExceptions)) {
                    documentEditor.documentEditorSettings.formFieldSettings.formattingExceptions = settings.formattingExceptions;
                }
                if (!ej2_base_1.isNullOrUndefined(settings.selectionColor)) {
                    documentEditor.documentEditorSettings.formFieldSettings.selectionColor = settings.selectionColor;
                }
                if (!ej2_base_1.isNullOrUndefined(settings.shadingColor)) {
                    documentEditor.documentEditorSettings.formFieldSettings.shadingColor = settings.shadingColor;
                }
            }
            if (this.documentEditorSettings.searchHighlightColor) {
                this.documentEditor.documentEditorSettings.searchHighlightColor = index_1.HelperMethods.sanitizeString(this.documentEditorSettings.searchHighlightColor);
            }
            if (this.documentEditorSettings.fontFamilies) {
                this.documentEditor.documentEditorSettings.fontFamilies = JSON.parse(index_1.HelperMethods.sanitizeString(JSON.stringify(this.documentEditorSettings.fontFamilies)));
            }
            if (this.documentEditorSettings.collaborativeEditingSettings) {
                this.documentEditor.documentEditorSettings.collaborativeEditingSettings = this.documentEditorSettings.collaborativeEditingSettings;
            }
            if (this.documentEditorSettings.printDevicePixelRatio) {
                this.documentEditor.documentEditorSettings.printDevicePixelRatio = this.documentEditorSettings.printDevicePixelRatio;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.enableOptimizedTextMeasuring)) {
                this.documentEditor.documentEditorSettings.enableOptimizedTextMeasuring = this.documentEditorSettings.enableOptimizedTextMeasuring;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.maximumRows)) {
                this.documentEditor.documentEditorSettings.maximumRows = this.documentEditorSettings.maximumRows;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.maximumColumns)) {
                this.documentEditor.documentEditorSettings.maximumColumns = this.documentEditorSettings.maximumColumns;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.showHiddenMarks)) {
                this.documentEditor.documentEditorSettings.showHiddenMarks = this.documentEditorSettings.showHiddenMarks;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.showBookmarks)) {
                this.documentEditor.documentEditorSettings.showBookmarks = this.documentEditorSettings.showBookmarks;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.highlightEditableRanges)) {
                this.documentEditor.documentEditorSettings.highlightEditableRanges = this.documentEditorSettings.highlightEditableRanges;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.allowDragAndDrop)) {
                this.documentEditor.documentEditorSettings.allowDragAndDrop = this.documentEditorSettings.allowDragAndDrop;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.optimizeSfdt)) {
                this.documentEditor.documentEditorSettings.optimizeSfdt = this.documentEditorSettings.optimizeSfdt;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.autoResizeSettings)) {
                this.documentEditor.documentEditorSettings.autoResizeSettings = this.documentEditorSettings.autoResizeSettings;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.showRuler)) {
                this.documentEditor.documentEditorSettings.showRuler = this.documentEditorSettings.showRuler;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings.popupTarget)) {
                this.documentEditor.documentEditorSettings.popupTarget = this.documentEditorSettings.popupTarget;
            }
        };
        DocumentEditorContainer.prototype.getPersistData = function () {
            return 'documenteditor-container';
        };
        DocumentEditorContainer.prototype.requiredModules = function () {
            var modules = [];
            if (this.enableToolbar) {
                modules.push({
                    member: 'toolbar', args: [this]
                });
            }
            return modules;
        };
        DocumentEditorContainer.prototype.initContainerElement = function () {
            var isRtl = this.enableRtl;
            this.containerTarget = this.createElement('div', { className: 'e-de-ctn' });
            this.containerTarget.contentEditable = 'false';
            this.createToolbarContainer(isRtl);
            var propertiesPaneContainerBorder;
            if (!isRtl) {
                propertiesPaneContainerBorder = 'e-de-pane';
            }
            else {
                propertiesPaneContainerBorder = 'e-de-pane-rtl';
            }
            this.propertiesPaneContainer = this.createElement('div', { className: propertiesPaneContainerBorder, styles: 'display:none' });
            this.editorContainer.appendChild(this.propertiesPaneContainer);
            this.containerTarget.appendChild(this.editorContainer);
            this.statusBarElement = this.createElement('div', { className: 'e-de-status-bar' });
            if (isRtl) {
                this.statusBarElement.style.direction = 'rtl';
            }
            this.containerTarget.appendChild(this.statusBarElement);
            this.element.appendChild(this.containerTarget);
        };
        DocumentEditorContainer.prototype.createToolbarContainer = function (isRtl, isCustom) {
            if (ej2_base_1.isNullOrUndefined((this.editorContainer))) {
                this.editorContainer = this.createElement('div', { className: 'e-de-tool-ctnr-properties-pane' + (isRtl ? ' e-de-ctnr-rtl' : '') });
            }
            if (this.enableToolbar) {
                this.toolbarContainer = this.createElement('div', { className: 'e-de-ctnr-toolbar' + (isRtl ? ' e-de-ctnr-rtl' : '') });
                if (isCustom) {
                    this.containerTarget.insertBefore(this.toolbarContainer, this.containerTarget.firstChild);
                }
                else {
                    this.containerTarget.appendChild(this.toolbarContainer);
                }
                this.editorContainer.classList.remove('e-de-ctnr-properties-pane');
                this.editorContainer.classList.add('e-de-tool-ctnr-properties-pane');
            }
            else {
                this.editorContainer.classList.remove('e-de-tool-ctnr-properties-pane');
                this.editorContainer.classList.add('e-de-ctnr-properties-pane');
            }
        };
        DocumentEditorContainer.prototype.initializeDocumentEditor = function () {
            var id = this.element.id + '_editor';
            var documentEditorTarget = this.createElement('div', { id: id, styles: 'width:100%;height:100%' });
            this.documentEditorInternal = new document_editor_1.DocumentEditor({
                isReadOnly: false, enableRtl: this.enableRtl,
                selectionChange: this.onSelectionChange.bind(this),
                contentChange: this.onContentChange.bind(this),
                documentChange: this.onDocumentChange.bind(this),
                requestNavigate: this.onRequestNavigate.bind(this),
                viewChange: this.onViewChange.bind(this),
                customContextMenuSelect: this.onCustomContextMenuSelect.bind(this),
                customContextMenuBeforeOpen: this.onCustomContextMenuBeforeOpen.bind(this),
                beforePaneSwitch: this.onBeforePaneSwitch.bind(this),
                commentBegin: this.onCommentBegin.bind(this),
                commentEnd: this.onCommentEnd.bind(this),
                commentDelete: this.onCommentDelete.bind(this),
                beforeAcceptRejectChanges: this.onBeforeAcceptRejectChanges.bind(this),
                beforeCommentAction: this.onCommentAction.bind(this),
                trackChange: this.onTrackChange.bind(this),
                serviceFailure: this.fireServiceFailure.bind(this),
                beforeXmlHttpRequestSend: this.beforeXmlHttpSend.bind(this),
                locale: this.locale,
                acceptTab: true,
                zIndex: this.zIndex,
                enableLocalPaste: this.enableLocalPaste,
                layoutType: this.layoutType,
                pageOutline: '#E0E0E0',
                currentUser: this.currentUser,
                userColor: this.userColor,
                height: '100%',
                width: '100%',
                enableTrackChanges: this.enableTrackChanges,
                showRevisions: true,
                showComments: true,
                enableLockAndEdit: this.enableLockAndEdit,
                enableAutoFocus: this.enableAutoFocus
            });
            this.wireEvents();
            this.customizeDocumentEditorSettings();
            this.documentEditor.enableAllModules();
            this.documentEditor.enableComment = this.enableComment;
            this.editorContainer.insertBefore(documentEditorTarget, this.editorContainer.firstChild);
            this.setFormat();
            this.documentEditor.appendTo(documentEditorTarget);
            this.documentEditor.resize();
        };
        DocumentEditorContainer.prototype.wireEvents = function () {
            this.documentEditor.on(constants_1.internalZoomFactorChange, this.onZoomFactorChange, this);
            this.documentEditor.on(constants_1.internalviewChangeEvent, this.onViewChange, this);
            this.documentEditor.on(constants_1.protectionTypeChangeEvent, this.showPropertiesPaneOnSelection, this);
            this.documentEditor.on(constants_1.internalDocumentEditorSettingsChange, this.updateShowHiddenMarks, this);
            this.documentEditor.on(constants_1.internalStyleCollectionChange, this.updateStyleCollection, this);
            this.documentEditor.on(constants_1.internalAutoResize, this.triggerAutoResize, this);
            this.documentEditor.on(constants_1.beforeAutoResize, this.onBeforeAutoResize, this);
            this.documentEditor.on(constants_1.trackChanges, this.onEnableTrackChanges, this);
        };
        DocumentEditorContainer.prototype.onEnableTrackChanges = function (model) {
            if (model.enableTrackChanges !== this.enableTrackChanges) {
                this.enableTrackChanges = model.enableTrackChanges;
            }
        };
        DocumentEditorContainer.prototype.triggerAutoResize = function (args) {
            args.cancel = true;
            this.resize();
        };
        DocumentEditorContainer.prototype.onBeforeAutoResize = function (args) {
            args.element = this.element;
        };
        DocumentEditorContainer.prototype.unWireEvents = function () {
            if (ej2_base_1.isNullOrUndefined(this.documentEditor)) {
                return;
            }
            else {
                if (this.documentEditor.isDestroyed) {
                    return;
                }
            }
            this.documentEditor.off(constants_1.internalZoomFactorChange, this.onZoomFactorChange);
            this.documentEditor.off(constants_1.internalviewChangeEvent, this.onViewChange);
            this.documentEditor.off(constants_1.protectionTypeChangeEvent, this.showPropertiesPaneOnSelection);
            this.documentEditor.off(constants_1.internalDocumentEditorSettingsChange, this.updateShowHiddenMarks);
            this.documentEditor.off(constants_1.internalStyleCollectionChange, this.updateStyleCollection);
        };
        DocumentEditorContainer.prototype.onCommentBegin = function () {
            if (this.toolbarModule) {
                this.toolbarModule.enableDisableInsertComment(false);
            }
        };
        DocumentEditorContainer.prototype.onCommentEnd = function () {
            if (this.toolbarModule) {
                this.toolbarModule.enableDisableInsertComment(true && this.enableComment);
            }
        };
        DocumentEditorContainer.prototype.beforeXmlHttpSend = function (args) {
            this.trigger(constants_1.beforeXmlHttpRequestSend, args);
        };
        DocumentEditorContainer.prototype.onCommentDelete = function (args) {
            this.trigger(constants_1.commentDeleteEvent, args);
        };
        DocumentEditorContainer.prototype.onBeforeAcceptRejectChanges = function (args) {
            this.trigger(constants_1.revisionActionEvent, args);
        };
        DocumentEditorContainer.prototype.onCommentAction = function (args) {
            this.trigger(constants_1.beforeCommentActionEvent, args);
        };
        DocumentEditorContainer.prototype.onTrackChange = function (args) {
            this.trigger(constants_1.trackChangeEvent, args);
            if (this.toolbarModule) {
                this.toolbarModule.toggleTrackChanges(args.isTrackChangesEnabled);
            }
        };
        DocumentEditorContainer.prototype.onBeforePaneSwitch = function (args) {
            this.trigger(constants_1.beforePaneSwitchEvent, args);
        };
        DocumentEditorContainer.prototype.fireServiceFailure = function (eventArgs) {
            this.trigger(constants_1.serviceFailureEvent, eventArgs);
        };
        DocumentEditorContainer.prototype.showHidePropertiesPane = function (show) {
            if (this.showPropertiesPane) {
                this.showPropertiesPaneOnSelection();
            }
            this.propertiesPaneContainer.style.display = show ? 'block' : 'none';
            if (this.toolbarModule) {
                this.toolbarModule.propertiesPaneButton.element.style.opacity = show ? '1' : '0.5';
            }
            this.documentEditor.resize();
        };
        DocumentEditorContainer.prototype.updateStyleCollection = function () {
            if (!ej2_base_1.isNullOrUndefined(this.tableProperties) && !ej2_base_1.isNullOrUndefined(this.tableProperties.tableTextProperties) && !ej2_base_1.isNullOrUndefined(this.tableProperties.tableTextProperties.paragraph)) {
                this.tableProperties.tableTextProperties.paragraph.updateStyleNames();
            }
        };
        DocumentEditorContainer.prototype.resize = function (width, height) {
            if (this.element) {
                if (ej2_base_1.isNullOrUndefined(height) && this.element && this.element.parentElement) {
                    height = this.element.parentElement.clientHeight;
                }
                if (ej2_base_1.isNullOrUndefined(width) && this.element && this.element.parentElement) {
                    width = this.element.parentElement.clientWidth;
                }
                if (!ej2_base_1.isNullOrUndefined(width) && width > 200) {
                    this.width = width.toString();
                    this.element.style.width = width + 'px';
                }
                if (!ej2_base_1.isNullOrUndefined(height) && height > 200) {
                    this.height = height.toString();
                    this.element.style.height = height + 'px';
                }
                if (this.documentEditor) {
                    this.documentEditor.resize();
                }
                if (this.toolbarModule) {
                    this.toolbarModule.toolbar.refreshOverflow();
                }
                if (this.showPropertiesPane && this.tableProperties) {
                    this.tableProperties.updateTabContainerHeight();
                }
            }
        };
        DocumentEditorContainer.prototype.refreshFontFamilies = function (fontFamilies) {
            if (!ej2_base_1.isNullOrUndefined(this.tableProperties) && !ej2_base_1.isNullOrUndefined(this.tableProperties.tableTextProperties) && !ej2_base_1.isNullOrUndefined(this.tableProperties.tableTextProperties.text)) {
                var text = this.tableProperties.tableTextProperties.text;
                text.fontFamily.refresh();
                for (var i = 0; i < fontFamilies.length; i++) {
                    var fontValue = fontFamilies[i];
                    var fontStyleValue = { 'FontName': fontValue, 'FontValue': fontValue };
                    text.fontFamily.addItem(fontStyleValue, i);
                }
            }
        };
        DocumentEditorContainer.prototype.onContentChange = function (args) {
            if (this.toolbarModule) {
                this.toolbarModule.enableDisableUndoRedo();
            }
            if (this.statusBar) {
                this.statusBar.updatePageCount();
            }
            var eventArgs = { source: this, operations: args.operations };
            this.trigger(constants_1.contentChangeEvent, eventArgs);
        };
        DocumentEditorContainer.prototype.onDocumentChange = function () {
            this.enableTrackChanges = this.documentEditor.enableTrackChanges;
            if (!ej2_base_1.isNullOrUndefined(this.documentSettings) && !ej2_base_1.isNullOrUndefined(this.documentEditor)
                && !ej2_base_1.isNullOrUndefined(this.documentEditor.documentSettings)) {
                this.documentSettings.compatibilityMode = this.documentEditor.documentSettings.compatibilityMode;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentEditorSettings) && !ej2_base_1.isNullOrUndefined(this.documentEditorSettings.fontFamilies)) {
                var fontFamilyValue = this.documentEditorSettings.fontFamilies;
                this.refreshFontFamilies(fontFamilyValue);
            }
            if (this.toolbarModule) {
                this.toolbarModule.isCommentEditing = false;
                this.toolbarModule.enableDisableInsertComment(true);
                this.toolbarModule.enableDisableUndoRedo();
            }
            if (this.statusBar) {
                this.statusBar.updatePageCount();
            }
            var eventArgs = { source: this };
            this.trigger(constants_1.documentChangeEvent, eventArgs);
            this.updateStyleCollection();
        };
        DocumentEditorContainer.prototype.onSelectionChange = function () {
            var _this = this;
            setTimeout(function () {
                _this.showPropertiesPaneOnSelection();
                var eventArgs = { source: _this, isCompleted: _this.documentEditor.documentHelper.isSelectionCompleted };
                _this.trigger(constants_1.selectionChangeEvent, eventArgs);
                _this.documentEditor.documentHelper.isSelectionCompleted = true;
            });
        };
        DocumentEditorContainer.prototype.onZoomFactorChange = function () {
            if (this.statusBar) {
                this.statusBar.updateZoomContent();
            }
        };
        DocumentEditorContainer.prototype.updateShowHiddenMarks = function (settings) {
            this.documentEditorSettings.showHiddenMarks = settings.showHiddenMarks;
            this.tableProperties.tableTextProperties.paragraph.toggleHiddenMarks();
        };
        DocumentEditorContainer.prototype.onRequestNavigate = function (args) {
            if (args.linkType !== 'Bookmark') {
                var navLink = args.navigationLink;
                var link = ej2_base_3.SanitizeHtmlHelper.sanitize(navLink);
                if (args.localReference.length > 0) {
                    link += '#' + args.localReference;
                }
                if (navLink.substring(0, 8) === 'file:///'
                    || (navLink.substring(0, 7) === 'http://' && navLink.length > 7)
                    || (navLink.substring(0, 8) === 'https://' && navLink.length > 8)
                    || (navLink.substring(0, 4) === 'www.' && navLink.length > 4)
                    || (navLink.substring(0, 7) === 'mailto:' && navLink.length > 7)) {
                    window.open(link);
                }
                else {
                    ej2_popups_2.DialogUtility.alert({
                        title: this.localObj.getConstant("Information"),
                        content: this.localObj.getConstant("The address of this site is not valid. Check the address and try again."),
                        okButton: { text: this.localObj.getConstant("OK") },
                        closeOnEscape: true,
                    });
                }
                args.isHandled = true;
            }
        };
        DocumentEditorContainer.prototype.onViewChange = function (args) {
            if (this.statusBar) {
                this.statusBar.updatePageNumberOnViewChange(args);
            }
        };
        DocumentEditorContainer.prototype.onCustomContextMenuSelect = function (args) {
            this.trigger(constants_1.customContextMenuSelectEvent, args);
        };
        DocumentEditorContainer.prototype.onCustomContextMenuBeforeOpen = function (args) {
            this.trigger(constants_1.customContextMenuBeforeOpenEvent, args);
        };
        DocumentEditorContainer.prototype.showPropertiesPaneOnSelection = function () {
            if (((this.restrictEditing) && !this.showPropertiesPane) || ej2_base_1.isNullOrUndefined(this.tableProperties)) {
                return;
            }
            var isProtectedDocument = this.documentEditor.documentHelper.protectionType !== 'NoProtection';
            var allowFormatting = isProtectedDocument && this.documentEditor.documentHelper.restrictFormatting;
            var isSelectionInProtectecRegion = this.documentEditor.editor.restrictEditing;
            if (isProtectedDocument) {
                if (this.toolbarModule) {
                    this.toolbarModule.enableDisableToolBarItem(!isSelectionInProtectecRegion, true);
                }
                this.tableProperties.enableDisableElements(!allowFormatting && !isSelectionInProtectecRegion);
                this.tocProperties.enableDisableElements(!isSelectionInProtectecRegion);
                this.headerFooterProperties.enableDisableElements(!isSelectionInProtectecRegion);
                this.imageProperties.enableDisableElements(!isSelectionInProtectecRegion);
            }
            else {
                var isReadOnly = !this.documentEditor.isReadOnly;
                if (this.toolbarModule) {
                    this.toolbarModule.enableDisableToolBarItem(isReadOnly, true || this.showPropertiesPane);
                }
                this.tableProperties.enableDisableElements(true);
                this.tocProperties.enableDisableElements(true);
                this.headerFooterProperties.enableDisableElements(true);
                this.imageProperties.enableDisableElements(true);
            }
            var currentContext = this.documentEditor.selection.contextType;
            var isInHeaderFooter = currentContext.indexOf('Header') >= 0
                || currentContext.indexOf('Footer') >= 0;
            if (!isInHeaderFooter) {
                this.showHeaderProperties = true;
            }
            if (!this.showPropertiesPane) {
                this.showHidePropertiesPane(false);
                this.propertiesPaneContainer.style.display = 'none';
            }
            else {
                this.propertiesPaneContainer.style.display = 'block';
                if (isInHeaderFooter && this.showHeaderProperties) {
                    this.showProperties('headerfooter');
                }
                else if (currentContext.indexOf('List') >= 0 || currentContext.indexOf('Text') >= 0
                    && currentContext.indexOf('Table') < 0) {
                    this.showProperties('text');
                }
                else if (currentContext.indexOf('Image') >= 0) {
                    this.showProperties('image');
                }
                else if (currentContext.indexOf('TableOfContents') >= 0) {
                    this.showProperties('toc');
                }
                else if (currentContext.indexOf('Table') >= 0) {
                    this.showProperties('table');
                }
            }
            this.previousContext = this.documentEditor.selection.contextType;
            if (this.toolbarModule && this.toolbarModule.toolbar) {
                this.toolbarModule.enableDisableInsertComment(!this.documentEditor.enableHeaderAndFooter && this.enableComment && !this.documentEditor.isReadOnlyMode && !this.documentEditor.selection.isinFootnote && !this.documentEditor.selection.isinEndnote);
            }
        };
        DocumentEditorContainer.prototype.showProperties = function (property) {
            if (this.toolbarModule && property !== 'headerfooter' && property !== 'toc') {
                this.toolbarModule.enableDisablePropertyPaneButton(true);
            }
            this.tableProperties.showTableProperties((property === 'table' || property === 'text'), property);
            this.imageProperties.showImageProperties(property === 'image');
            this.headerFooterProperties.showHeaderFooterPane(property === 'headerfooter');
            this.tocProperties.showTocPane(property === 'toc');
        };
        DocumentEditorContainer.prototype.setDefaultCharacterFormat = function (characterFormat) {
            this.characterFormat = characterFormat;
            this.setFormat();
        };
        DocumentEditorContainer.prototype.setDefaultParagraphFormat = function (paragraphFormat) {
            this.paragraphFormat = paragraphFormat;
            this.setFormat();
        };
        DocumentEditorContainer.prototype.setDefaultSectionFormat = function (sectionFormat) {
            this.sectionFormat = sectionFormat;
            this.setFormat();
        };
        DocumentEditorContainer.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.element) {
                if (!this.refreshing) {
                    this.element.classList.remove('e-documenteditorcontainer');
                }
                this.element.innerHTML = '';
            }
            if (!this.refreshing) {
                this.element = undefined;
                this.paragraphFormat = undefined;
                this.sectionFormat = undefined;
                this.characterFormat = undefined;
            }
            if (this.toolbarContainer && this.toolbarContainer.parentElement) {
                this.toolbarContainer.innerHTML = '';
                this.toolbarContainer.parentElement.removeChild(this.toolbarContainer);
            }
            this.toolbarContainer = undefined;
            if (this.documentEditorInternal) {
                this.unWireEvents();
                this.documentEditorInternal.destroy();
                this.documentEditorInternal = undefined;
            }
            if (this.headerFooterProperties) {
                this.headerFooterProperties.destroy();
            }
            this.headerFooterProperties = undefined;
            if (this.imageProperties) {
                this.imageProperties.destroy();
            }
            this.imageProperties = undefined;
            if (this.tocProperties) {
                this.tocProperties.destroy();
            }
            this.tocProperties = undefined;
            if (this.tableProperties) {
                this.tableProperties.destroy();
            }
            this.tableProperties = undefined;
            if (this.statusBar) {
                this.statusBar.destroy();
            }
            if (this.propertiesPaneContainer && this.propertiesPaneContainer.parentElement) {
                this.propertiesPaneContainer.innerHTML = '';
                this.propertiesPaneContainer.parentElement.removeChild(this.propertiesPaneContainer);
            }
            this.propertiesPaneContainer = undefined;
            if (this.editorContainer && this.editorContainer.parentElement) {
                this.editorContainer.innerHTML = '';
                this.editorContainer.parentElement.removeChild(this.editorContainer);
            }
            if (this.statusBarElement && this.statusBarElement.parentElement) {
                this.statusBarElement.innerHTML = '';
                this.statusBarElement.parentElement.removeChild(this.statusBarElement);
            }
            if (this.containerTarget && this.containerTarget.parentElement) {
                this.containerTarget.innerHTML = '';
                this.containerTarget.parentElement.removeChild(this.containerTarget);
            }
            this.containerTarget = undefined;
            this.statusBarElement = undefined;
            this.editorContainer = undefined;
            this.statusBar = undefined;
            this.previousContext = undefined;
        };
        return DocumentEditorContainer;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorContainer.prototype, "showPropertiesPane", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorContainer.prototype, "enableToolbar", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorContainer.prototype, "restrictEditing", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorContainer.prototype, "enableSpellCheck", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorContainer.prototype, "enableTrackChanges", void 0);
    __decorate([
        ej2_base_1.Property('Pages')
    ], DocumentEditorContainer.prototype, "layoutType", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], DocumentEditorContainer.prototype, "currentUser", void 0);
    __decorate([
        ej2_base_1.Property('#FFFF00')
    ], DocumentEditorContainer.prototype, "userColor", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorContainer.prototype, "enableLocalPaste", void 0);
    __decorate([
        ej2_base_1.Property()
    ], DocumentEditorContainer.prototype, "serviceUrl", void 0);
    __decorate([
        ej2_base_1.Property(2000)
    ], DocumentEditorContainer.prototype, "zIndex", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorContainer.prototype, "enableCsp", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorContainer.prototype, "enableComment", void 0);
    __decorate([
        ej2_base_1.Property('100%')
    ], DocumentEditorContainer.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('320px')
    ], DocumentEditorContainer.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorContainer.prototype, "enableAutoFocus", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorContainer.prototype, "enableLockAndEdit", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorContainer.prototype, "autoResizeOnVisibilityChange", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "created", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "destroyed", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "contentChange", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "selectionChange", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "documentChange", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "toolbarClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "customContextMenuSelect", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "customContextMenuBeforeOpen", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "beforePaneSwitch", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "commentDelete", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "beforeAcceptRejectChanges", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "beforeCommentAction", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "serviceFailure", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "trackChange", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "contentControl", void 0);
    __decorate([
        ej2_base_2.Event()
    ], DocumentEditorContainer.prototype, "beforeXmlHttpRequestSend", void 0);
    __decorate([
        ej2_base_1.Complex({}, document_editor_1.DocumentEditorSettings)
    ], DocumentEditorContainer.prototype, "documentEditorSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, document_editor_1.DocumentSettings)
    ], DocumentEditorContainer.prototype, "documentSettings", void 0);
    __decorate([
        ej2_base_1.Property({ import: 'Import', systemClipboard: 'SystemClipboard', spellCheck: 'SpellCheck', restrictEditing: 'RestrictEditing', canLock: 'CanLock', getPendingActions: 'GetPendingActions' })
    ], DocumentEditorContainer.prototype, "serverActionSettings", void 0);
    __decorate([
        ej2_base_1.Property(['New', 'Open', 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields'])
    ], DocumentEditorContainer.prototype, "toolbarItems", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], DocumentEditorContainer.prototype, "headers", void 0);
    DocumentEditorContainer = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], DocumentEditorContainer);
    exports.DocumentEditorContainer = DocumentEditorContainer;
});
