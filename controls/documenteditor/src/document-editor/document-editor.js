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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-file-utils", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./index", "./implementation/spell-check/spell-checker", "./implementation/dialogs/spellCheck-dialog", "./index", "./implementation/index", "./implementation/dialogs/form-field-text-dialog", "./implementation/dialogs/form-field-drop-down-dialog", "./implementation/track-changes/track-changes", "./implementation/dialogs/notes-dialog", "./implementation/viewer/page", "./base/constants", "./index", "./implementation/dialogs/columns-dialog", "@syncfusion/ej2-compression", "./implementation/dialogs/tab-dialog", "./implementation/utility/dom-util"], function (require, exports, ej2_base_1, ej2_base_2, ej2_file_utils_1, index_1, index_2, index_3, index_4, index_5, index_6, index_7, index_8, index_9, index_10, index_11, index_12, index_13, index_14, index_15, index_16, index_17, index_18, spell_checker_1, spellCheck_dialog_1, index_19, index_20, form_field_text_dialog_1, form_field_drop_down_dialog_1, track_changes_1, notes_dialog_1, page_1, constants_1, index_21, columns_dialog_1, ej2_compression_1, tab_dialog_1, dom_util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DocumentEditorSettings = (function (_super) {
        __extends(DocumentEditorSettings, _super);
        function DocumentEditorSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DocumentEditorSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], DocumentEditorSettings.prototype, "popupTarget", void 0);
    __decorate([
        ej2_base_1.Property('#FFE97F')
    ], DocumentEditorSettings.prototype, "searchHighlightColor", void 0);
    __decorate([
        ej2_base_1.Property(['Algerian', 'Arial', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Courier New', 'Georgia', 'Impact', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Symbol', 'Times New Roman', 'Verdana', 'Wingdings'])
    ], DocumentEditorSettings.prototype, "fontFamilies", void 0);
    __decorate([
        ej2_base_1.Property({ shadingColor: '#cfcfcf', applyShading: true, selectionColor: '#cccccc', formFillingMode: 'Popup' })
    ], DocumentEditorSettings.prototype, "formFieldSettings", void 0);
    __decorate([
        ej2_base_1.Property({ interval: 2000, itertationCount: 5 })
    ], DocumentEditorSettings.prototype, "autoResizeSettings", void 0);
    __decorate([
        ej2_base_1.Property({ roomName: '', editableRegionColor: '#22b24b', lockedRegionColor: '#f44336' })
    ], DocumentEditorSettings.prototype, "collaborativeEditingSettings", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], DocumentEditorSettings.prototype, "printDevicePixelRatio", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorSettings.prototype, "enableOptimizedTextMeasuring", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorSettings.prototype, "allowDragAndDrop", void 0);
    __decorate([
        ej2_base_1.Property(32767)
    ], DocumentEditorSettings.prototype, "maximumRows", void 0);
    __decorate([
        ej2_base_1.Property(63)
    ], DocumentEditorSettings.prototype, "maximumColumns", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorSettings.prototype, "showHiddenMarks", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorSettings.prototype, "showBookmarks", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorSettings.prototype, "highlightEditableRanges", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditorSettings.prototype, "optimizeSfdt", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditorSettings.prototype, "showRuler", void 0);
    exports.DocumentEditorSettings = DocumentEditorSettings;
    var DocumentSettings = (function (_super) {
        __extends(DocumentSettings, _super);
        function DocumentSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DocumentSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Word2013')
    ], DocumentSettings.prototype, "compatibilityMode", void 0);
    exports.DocumentSettings = DocumentSettings;
    var AutoResizeSettings = (function (_super) {
        __extends(AutoResizeSettings, _super);
        function AutoResizeSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AutoResizeSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(2000)
    ], AutoResizeSettings.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], AutoResizeSettings.prototype, "iterationCount", void 0);
    exports.AutoResizeSettings = AutoResizeSettings;
    var DocumentEditor = DocumentEditor_1 = (function (_super) {
        __extends(DocumentEditor, _super);
        function DocumentEditor(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.enableHeaderFooterIn = false;
            _this.isShiftingEnabled = false;
            _this.isLayoutEnabled = true;
            _this.isPastingContent = false;
            _this.isOnIndent = false;
            _this.isTableMarkerDragging = false;
            _this.startXPosition = 0;
            _this.parser = undefined;
            _this.disableHistoryIn = false;
            _this.documentSettingOps = [];
            _this.skipSettingsOps = false;
            _this.isSettingOp = false;
            _this.findResultsList = undefined;
            _this.tablePropertiesDialogModule = undefined;
            _this.bordersAndShadingDialogModule = undefined;
            _this.cellOptionsDialogModule = undefined;
            _this.tableOptionsDialogModule = undefined;
            _this.paragraphDialogModule = undefined;
            _this.imageResizerModule = undefined;
            _this.createdTriggered = false;
            _this.defaultLocale = {
                'Table': 'Table',
                'Row': 'Row',
                'Cell': 'Cell',
                'Ok': 'OK',
                'Apply': 'Apply',
                'Alt Text': 'Alt Text',
                'Title': 'Title',
                'Description': 'Description',
                'Cancel': 'Cancel',
                'Size': 'Size',
                'Preferred Width': 'Preferred width',
                'Points': 'Points',
                'Percent': 'Percent',
                'Measure in': 'Measure in',
                'Alignment': 'Alignment',
                'Left': 'Left',
                'Center': 'Center',
                'Right': 'Right',
                'Decimal': 'Decimal',
                'Bar': 'Bar',
                'Justify': 'Justify',
                'Indent from left': 'Indent from left',
                'Borders and Shading': 'Borders and Shading',
                'Options': 'Options',
                'Specify height': 'Specify height',
                'At least': 'At least',
                'Exactly': 'Exactly',
                'Row height is': 'Row height is',
                'Allow row to break across pages': 'Allow row to break across pages',
                'Repeat as header row at the top of each page': 'Repeat as header row at the top of each page',
                'Vertical alignment': 'Vertical alignment',
                'Top': 'Top',
                'Bottom': 'Bottom',
                'Default cell margins': 'Default cell margins',
                'Default cell spacing': 'Default cell spacing',
                'Allow spacing between cells': 'Allow spacing between cells',
                'Cell margins': 'Cell margins',
                'Same as the whole table': 'Same as the whole table',
                'Borders': 'Borders',
                'None': 'None',
                'Style': 'Style',
                'Width': 'Width',
                'Height': 'Height',
                'Letter': 'Letter',
                '1, 2, 3, ...': '1, 2, 3, ...',
                'a, b, c, ...': 'a, b, c, ...',
                'A, B, C, ...': 'A, B, C, ...',
                'I, II, III, ...': 'I, II, III, ...',
                'i, ii, iii, ...': 'i, ii, iii, ...',
                'Tabloid': 'Tabloid',
                'Legal': 'Legal',
                'Statement': 'Statement',
                'Executive': 'Executive',
                'A3': 'A3',
                'A4': 'A4',
                'A5': 'A5',
                'B4': 'B4',
                'B5': 'B5',
                'Custom Size': 'Custom size',
                'Different odd and even': 'Different odd and even',
                'Different first page': 'Different first page',
                'From edge': 'From edge',
                'Header': 'Header',
                'Footer': 'Footer',
                'First Page Header': 'First Page Header',
                'First Page Footer': 'First Page Footer',
                'Even Page Header': 'Even Page Header',
                'Even Page Footer': 'Even Page Footer',
                'Odd Page Header': 'Odd Page Header',
                'Odd Page Footer': 'Odd Page Footer',
                'Same as Previous': 'Same as Previous',
                'Section': 'Section',
                'Margin': 'Margins',
                'Paper': 'Paper',
                'Layout': 'Layout',
                'Orientation': 'Orientation',
                'Landscape': 'Landscape',
                'Portrait': 'Portrait',
                'Show page numbers': 'Show page numbers',
                'Right align page numbers': 'Right align page numbers',
                'Nothing': 'Nothing',
                'Tab leader': 'Tab leader',
                'Leader': 'Leader',
                'Show levels': 'Show levels',
                'Use hyperlinks instead of page numbers': 'Use hyperlinks instead of page numbers',
                'Build table of contents from': 'Build table of contents from',
                'Styles': 'Styles',
                'Available styles': 'Available styles',
                'TOC level': 'TOC level',
                'Heading': 'Heading',
                'Heading 1': 'Heading 1',
                'Heading 2': 'Heading 2',
                'Heading 3': 'Heading 3',
                'Heading 4': 'Heading 4',
                'Heading 5': 'Heading 5',
                'Heading 6': 'Heading 6',
                'List Paragraph': 'List Paragraph',
                'Normal': 'Normal',
                'Outline levels': 'Outline levels',
                'Table entry fields': 'Table entry fields',
                'Modify': 'Modify',
                'Color': 'Color',
                'Setting': 'Setting',
                'Box': 'Box',
                'All': 'All',
                'Custom': 'Custom',
                'Preview': 'Preview',
                'Shading': 'Shading',
                'Fill': 'Fill',
                'Apply To': 'Apply to',
                'Table Properties': 'Table Properties',
                'Cell Options': 'Cell Options',
                'Table Options': 'Table Options',
                'Insert Table': 'Insert Table',
                'Number of columns': 'Number of columns',
                'Number of rows': 'Number of rows',
                'Text to display': 'Text to display',
                'ScreenTip text': 'ScreenTip text',
                'Address': 'Address',
                'Insert Hyperlink': 'Insert Hyperlink',
                'Edit Hyperlink': 'Edit Hyperlink',
                'Insert': 'Insert',
                'General': 'General',
                'Indentation': 'Indentation',
                'Before text': 'Before text',
                'Special': 'Special',
                'First line': 'First line',
                'Hanging': 'Hanging',
                'After text': 'After text',
                'By': 'By',
                'Before': 'Before',
                'Line Spacing': 'Line spacing',
                'After': 'After',
                'At': 'At',
                'Multiple': 'Multiple',
                'Spacing': 'Spacing',
                'Define new Multilevel list': 'Define new Multilevel list',
                'List level': 'List level',
                'Choose level to modify': 'Choose level to modify',
                'Level': 'Level',
                'Number format': 'Number format',
                'Number style for this level': 'Number style for this level',
                'Enter formatting for number': 'Enter formatting for number',
                'Start at': 'Start at',
                'Restart list after': 'Restart list after',
                'Position': 'Position',
                'Text indent at': 'Text indent at',
                'Aligned at': 'Aligned at',
                'Follow number with': 'Follow number with',
                'Tab character': 'Tab character',
                'Space': 'Space',
                'Arabic': 'Arabic',
                'UpRoman': 'UpRoman',
                'LowRoman': 'LowRoman',
                'UpLetter': 'UpLetter',
                'LowLetter': 'LowLetter',
                'Number': 'Number',
                'Leading zero': 'Leading zero',
                'Bullet': 'Bullet',
                'Ordinal': 'Ordinal',
                'Ordinal Text': 'Ordinal Text',
                'For East': 'For East',
                'No Restart': 'No Restart',
                'Font': 'Font',
                'Font style': 'Font style',
                'Underline style': 'Underline style',
                'Font color': 'Font color',
                'Effects': 'Effects',
                'Strikethrough': 'Strikethrough',
                'Superscript': 'Superscript',
                'Subscript': 'Subscript',
                'Double strikethrough': 'Double strikethrough',
                'Regular': 'Regular',
                'Bold': 'Bold',
                'Italic': 'Italic',
                'Cut': 'Cut',
                'Copy': 'Copy',
                'Paste': 'Paste',
                'Hyperlink': 'Hyperlink',
                'Open Hyperlink': 'Open Hyperlink',
                'Copy Hyperlink': 'Copy Hyperlink',
                'Remove Hyperlink': 'Remove Hyperlink',
                'Paragraph': 'Paragraph',
                'Linked Style': 'Linked(Paragraph and Character)',
                'Character': 'Character',
                'Merge Cells': 'Merge Cells',
                'Insert Above': 'Insert Above',
                'Insert Below': 'Insert Below',
                'Insert Left': 'Insert Left',
                'Insert Right': 'Insert Right',
                'Delete': 'Delete',
                'Delete Table': 'Delete Table',
                'Delete Row': 'Delete Row',
                'Delete Column': 'Delete Column',
                'File Name': 'File Name',
                'Format Type': 'Format Type',
                'Save': 'Save',
                'Navigation': 'Navigation',
                'Results': 'Results',
                'Replace': 'Replace',
                'Replace All': 'Replace All',
                'We replaced all': 'We replaced all',
                'Find': 'Find',
                'No matches': 'No matches',
                'All Done': 'All Done',
                'Result': 'Result',
                'of': 'of',
                'instances': 'instances',
                'with': 'with',
                'Click to follow link': 'Click to follow link',
                'Continue Numbering': 'Continue Numbering',
                'Bookmark name': 'Bookmark name',
                'Tab': 'Tab',
                'Tab stop position': 'Tab stop position',
                'Close': 'Close',
                'Restart At': 'Restart At',
                'Properties': 'Properties',
                'Name': 'Name',
                'Style type': 'Style type',
                'Style based on': 'Style based on',
                'Style for following paragraph': 'Style for following paragraph',
                'Formatting': 'Formatting',
                'Numbering and Bullets': 'Numbering and Bullets',
                'Numbering': 'Numbering',
                'Update Field': 'Update Field',
                'Edit Field': 'Edit Field',
                'Bookmark': 'Bookmark',
                'Page Setup': 'Page Setup',
                'No bookmarks found': 'No bookmarks found',
                'Number format tooltip information': 'Single-level number format: </br>[PREFIX]%[LEVELNUMBER][SUFFIX]</br>'
                    + 'For example, "Chapter %1." will display numbering like</br>Chapter 1. Item</br>Chapter 2. Item</br>…'
                    + '</br>Chapter N. Item</br>'
                    + '</br>Multilevel number format:</br>[PREFIX]%[LEVELNUMBER][SUFFIX]+[PREFIX]%[LEVELNUMBER][SUFFIX]'
                    + '</br>For example, "%1.%2." will display numbering like</br>1.1. Item</br>1.2. Item</br>…</br>1.N. Item',
                'Format': 'Format',
                'Create New Style': 'Create New Style',
                'Modify Style': 'Modify Style',
                'New': 'New',
                'InsertFootnote': 'InsertFootnote',
                'InsertEndnote': 'InsertEndnote',
                'Footnote': 'Footnote',
                'Endnote': 'Endnote',
                'Notes Options': 'Notes Options',
                'Bullets': 'Bullets',
                'Use bookmarks': 'Use bookmarks',
                'Table of Contents': 'Table of Contents',
                'AutoFit': 'AutoFit',
                'AutoFit to Contents': 'AutoFit to Contents',
                'AutoFit to Window': 'AutoFit to Window',
                'Fixed Column Width': 'Fixed Column Width',
                'Reset': 'Reset',
                'Match case': 'Match case',
                'Whole words': 'Whole words',
                'Add': 'Add',
                'Go To': 'Go To',
                'Search for': 'Search for',
                'Replace with': 'Replace with',
                'TOC 1': 'TOC 1',
                'TOC 2': 'TOC 2',
                'TOC 3': 'TOC 3',
                'TOC 4': 'TOC 4',
                'TOC 5': 'TOC 5',
                'TOC 6': 'TOC 6',
                'TOC 7': 'TOC 7',
                'TOC 8': 'TOC 8',
                'TOC 9': 'TOC 9',
                'Right-to-left': 'Right-to-left',
                'Left-to-right': 'Left-to-right',
                'Direction': 'Direction',
                'Table direction': 'Table direction',
                'Indent from right': 'Indent from right',
                "Contextual Spacing": "Don't add space between paragraphs of the same style",
                "Password Mismatch": "The password don't match",
                'Restrict Editing': 'Restrict Editing',
                'Formatting restrictions': 'Formatting restrictions',
                'Allow formatting': 'Allow formatting',
                'Editing restrictions': 'Editing restrictions',
                'Read only': 'Read only',
                'Exceptions Optional': 'Exceptions (optional)',
                'Select Part Of Document And User': 'Select parts of the document and choose users who are allowed to freely edit them.',
                'Everyone': 'Everyone',
                'More users': 'More users',
                'Add Users': 'Add Users',
                'Enforcing Protection': 'Yes, Start Enforcing Protection',
                'Start Enforcing Protection': 'Start Enforcing Protection',
                'Enter User': 'Enter User',
                'Users': 'Users',
                'Enter new password': 'Enter new password',
                'Reenter new password to confirm': 'Reenter new password to confirm',
                'Your permissions': 'Your permissions',
                'Protected Document': 'This document is protected from unintentional editing.',
                'FormFieldsOnly': 'You may only fill in forms in this region.',
                'CommentsOnly': 'You may only insert comments into this region.',
                'ReadOnlyProtection': 'You may edit in this region.',
                'Stop Protection': 'Stop Protection',
                'Password': 'Password',
                'Spelling Editor': 'Spelling Editor',
                'Spelling': 'Spelling',
                'Spell Check': 'Spell Check',
                'Underline errors': 'Underline errors',
                'Ignore': 'Ignore',
                'Ignore All': 'Ignore All',
                'Add to Dictionary': 'Add to Dictionary',
                'Change': 'Change',
                'Change All': 'Change All',
                'Suggestions': 'Suggestions',
                'The password is incorrect': 'The password is incorrect',
                'Error in establishing connection with web server': 'Error in establishing connection with web server',
                'Highlight the regions I can edit': 'Highlight the regions I can edit',
                'Show All Regions I Can Edit': 'Show All Regions I Can Edit',
                'Find Next Region I Can Edit': 'Find Next Region I Can Edit',
                'Keep source formatting': 'Keep source formatting',
                'Match destination formatting': 'Match destination formatting',
                'InsertAsRows': 'Insert as New Rows',
                'InsertAsColumns': 'Insert as New Columns',
                'OverwriteCells': 'Overwrite Cells',
                'NestTable': 'Nest Table',
                'Text only': 'Text only',
                'Comments': 'Comments',
                'Type your comment': 'Type your comment',
                'Post': 'Post',
                'Reply': 'Reply',
                'New Comment': 'New Comment',
                'Edit': 'Edit',
                'Resolve': 'Resolve',
                'Reopen': 'Reopen',
                'No comments in this document': 'No comments in this document',
                'more': 'more',
                'Type your comment here': 'Type your comment here',
                'Next Comment': 'Next Comment',
                'Previous Comment': 'Previous Comment',
                'Un-posted comments': 'Un-posted comments',
                'Discard Comment': 'Added comments not posted. If you continue, that comment will be discarded.',
                'No Headings': 'No Heading Found!',
                'Add Headings': 'This document has no headings. Please add headings and try again.',
                'More Options': 'More Options',
                'Click to see this comment': 'Click to see this comment',
                'Form Fields': 'Form Fields',
                'Text Form': 'Text Form',
                'Check Box': 'Check Box',
                'Drop Down Form Field': 'Drop Down Form Field',
                'Dropdown items': 'Drop-down items',
                'Items in dropdown list': 'Items in drop-down list',
                'ADD': 'ADD',
                'REMOVE': 'REMOVE',
                'Field settings': 'Field settings',
                'Tooltip': 'Tooltip',
                'Dropdown enabled': 'Drop-down enabled',
                'Check Box Form Field': 'Check Box Form Field',
                'Check box size': 'Check box size',
                'Auto': 'Auto',
                'Default value': 'Default value',
                'Not checked': 'Not checked',
                'Checked': 'Checked',
                'Check box enabled': 'Check box enabled',
                'Text Form Field': 'Text Form Field',
                'Type': 'Type',
                'Default text': 'Default text',
                'Maximum length': 'Maximum length',
                'Text format': 'Text format',
                'Fillin enabled': 'Fill-in enabled',
                'Default number': 'Default number',
                'Default date': 'Default date',
                'Date format': 'Date format',
                'Merge Track': 'This action wont be marked as change. Do you want to continue?',
                'UnTrack': 'Cannot be tracked !',
                'Accept': 'Accept',
                'Reject': 'Reject',
                'Previous Changes': 'Previous Changes',
                'Next Changes': 'Next Changes',
                'Inserted': 'Inserted',
                'Deleted': 'Deleted',
                'Move From': 'Move From',
                'Move To': 'Move To',
                'Changes': 'Changes',
                'Accept all': 'Accept all',
                'Reject all': 'Reject all',
                'No changes': 'No changes',
                'Accept Changes': 'Accept Changes',
                'Reject Changes': 'Reject Changes',
                'User': 'User',
                'View': 'View',
                'Insertion': 'Insertion',
                'Deletion': 'Deletion',
                'All caps': 'All caps',
                'This region is locked by': 'This region is locked by',
                'Lock': 'Lock',
                'Unlock': 'Unlock',
                'Already locked': 'Selected or part of region is already locked by another user',
                'Click to View/Edit Footnote': 'Click to View/Edit Footnote',
                'Click to View/Edit Endnote': 'Click to View/Edit Endnote',
                'Multiple Comment': 'Please post your comment',
                'No suggestions': 'No suggestions',
                'More Suggestion': 'More Suggestion',
                'Ignore Once': 'Ignore Once',
                'Keep With Next': 'Keep with next',
                'Keep Lines Together': 'Keep lines together',
                'WidowControl': 'Widow/Orphan control',
                'Indents and Spacing': 'Indents and Spacing',
                'Line and Page Breaks': 'Line and Page Breaks',
                'Pagination': 'Pagination',
                'Single': 'Single',
                'DashSmallGap': 'DashSmallGap',
                'DashDot': 'DashDot',
                'Double': 'Double',
                'ThinThickSmallGap': 'ThinThickSmallGap',
                'ThickThinSmallGap': 'ThickThinSmallGap',
                'ThickThinMediumGap': 'ThickThinMediumGap',
                'ThickThinLargeGap': 'ThickThinLargeGap',
                'SingleWavy': 'SingleWavy',
                'DoubleWavy': 'DoubleWavy',
                'Inset': 'Inset',
                'DashLargeGap': 'DashLargeGap',
                'Dot': 'Dot',
                'DashDotDot': 'DashDotDot',
                'Triple': 'Triple',
                'ThinThickThinSmallGap': 'ThinThickThinSmallGap',
                'ThinThickThinMediumGap': 'ThinThickThinMediumGap',
                'ThinThickThinLargeGap': 'ThinThickThinLargeGap',
                'DashDotStroked': 'DashDotStroked',
                'Engrave3D': 'Engrave3D',
                'Thick': 'Thick',
                'Outset': 'Outset',
                'Emboss3D': 'Emboss3D',
                'ThinThickLargeGap': 'ThinThickLargeGap',
                'ThinThickMediumGap': 'ThinThickMediumGap',
                'Number of rows must be between': 'Number of rows must be between',
                'Number of columns must be between': 'Number of columns must be between',
                'and': 'and',
                'Unlimited': 'Unlimited',
                'Regular text': 'Regular text',
                'Date': 'Date',
                'Uppercase': 'Uppercase',
                'Lowercase': 'Lowercase',
                'FirstCapital': 'FirstCapital',
                'TitleCase': 'Titlecase',
                'Filling in forms': 'Filling in forms',
                'px': 'px',
                'Tracked changes': 'Tracked changes',
                'TrackChangesOnly': 'You may edit in this region, but all change will be tracked.',
                'RemovedIgnoreExceptions': 'If you make this change in document protection, Word will ignore all the exceptions in this document.',
                'RemovedIgnore': 'Do you want to remove the ignored exceptions?',
                'Information': 'Information',
                'Yes': 'Yes',
                'No': 'No',
                'Page Break': 'Page Break',
                'Column Break': 'Column Break',
                'Section Break Next Page': 'Section Break (Next Page)',
                'Section Break Continuous': 'Section Break (Continuous)',
                'Unsupported format': 'The file format you have selected isn\'t supported. Please choose valid format.',
                'One': 'One',
                'Two': 'Two',
                'Three': 'Three',
                'Presets': 'Presets',
                'Columns': 'Columns',
                'Split your text into two or more columns': 'Split your text into two or more columns',
                'Line between column': 'Line between column',
                'Width and Spacing': 'Width and Spacing',
                'Equal column width': 'Equal column width',
                'Column': 'Column',
                'Paste Content Dialog': 'Due to browser’s security policy, paste from system clipboard is restricted. Alternatively use the keyboard shortcut',
                'Paste Content CheckBox': 'Don’t show again',
                'BookMarkList': 'List of bookmarks in the document',
                'TabMarkList': 'List of tab stops in the paragraph',
                'Default tab stops': 'Default tab stops',
                'Tab stops to be cleared': 'Tab stops to be cleared',
                'Tabs': 'Tabs',
                'Set': 'Set',
                'Clear': 'Clear',
                'Clear All': 'Clear All',
                'Discard': 'Discard',
                'The top/bottom margins are too large for the page height in some sections.': 'The top/bottom margins are too large for the page height in some sections.',
                'Column width cannot be less than 36 pt.': 'Column width cannot be less than 36 pt.',
                'Left and right margins.': 'Settings you chose for the left and right margins, column spacing, or pargraph indents are too large for the page width in same secitions.',
                'Left Indent': 'Left Indent',
                'Right Indent': 'Right Indent',
                'Hanging Indent': 'Hanging Indent',
                'First Line Indent': 'First Line Indent',
                'Left Margin': 'Left Margin',
                'Right Margin': 'Right Margin',
                'Top Margin': 'Top Margin',
                'Bottom Margin': 'Bottom Margin',
                'Left Tab': 'Left Tab',
                'Right Tab': 'Right Tab',
                'Center Tab': 'Center Tab',
                'Decimal Tab': 'Decimal Tab',
                'Bar Tab': 'Bar Tab',
                'Move Table Column': 'Move Table Column',
            };
            _this.initHelper();
            return _this;
        }
        Object.defineProperty(DocumentEditor.prototype, "enableHeaderAndFooter", {
            get: function () {
                return this.enableHeaderFooterIn;
            },
            set: function (value) {
                this.enableHeaderFooterIn = value;
                if (!value && this.selection && this.selection.isWebLayout) {
                    this.selection.isWebLayout = false;
                }
                this.viewer.updateScrollBars();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "pageCount", {
            get: function () {
                if (!this.isDocumentLoaded || ej2_base_2.isNullOrUndefined(this.viewer) || this.viewer instanceof index_1.WebLayoutViewer) {
                    return 1;
                }
                return this.documentHelper.pages.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "selection", {
            get: function () {
                return this.selectionModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "editor", {
            get: function () {
                return this.editorModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "editorHistory", {
            get: function () {
                return this.editorHistoryModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "search", {
            get: function () {
                return this.searchModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "contextMenu", {
            get: function () {
                return this.contextMenuModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "spellCheckDialog", {
            get: function () {
                return this.spellCheckDialogModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "spellChecker", {
            get: function () {
                return this.spellCheckerModule;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "containerId", {
            get: function () {
                return this.element.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "isDocumentLoaded", {
            get: function () {
                return this.isDocumentLoadedIn;
            },
            set: function (value) {
                this.isDocumentLoadedIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "isDocumentEmpty", {
            get: function () {
                if (this.documentHelper.pages.length == 1) {
                    var firstPage = this.documentHelper.pages[0];
                    var headerWidget = firstPage.headerWidget;
                    var footerWidget = firstPage.footerWidget;
                    var isHeaderEmpty = true;
                    var isFooterEmpty = true;
                    if (!ej2_base_2.isNullOrUndefined(headerWidget) && !ej2_base_2.isNullOrUndefined(headerWidget.firstChild)) {
                        if (!(headerWidget.firstChild instanceof index_3.ParagraphWidget) || !headerWidget.firstChild.isEmpty()) {
                            isHeaderEmpty = false;
                        }
                    }
                    if (!ej2_base_2.isNullOrUndefined(footerWidget) && !ej2_base_2.isNullOrUndefined(footerWidget.firstChild)) {
                        if (!(footerWidget.firstChild instanceof index_3.ParagraphWidget) || !footerWidget.firstChild.isEmpty()) {
                            isFooterEmpty = false;
                        }
                    }
                    if (isHeaderEmpty && isFooterEmpty) {
                        var firstBodywidget = firstPage.bodyWidgets[0];
                        if (ej2_base_2.isNullOrUndefined(firstBodywidget.nextWidget)) {
                            var firstChild = firstBodywidget.firstChild;
                            if (firstChild instanceof index_3.ParagraphWidget
                                && firstChild.isEmpty()
                                && ej2_base_2.isNullOrUndefined(firstChild.nextWidget)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "revisions", {
            get: function () {
                if (ej2_base_2.isNullOrUndefined(this.revisionsInternal)) {
                    this.revisionsInternal = new track_changes_1.RevisionCollection(this);
                }
                return this.revisionsInternal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "enableHistoryMode", {
            get: function () {
                return this.enableEditorHistory && !ej2_base_2.isNullOrUndefined(this.editorHistoryModule);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "documentStart", {
            get: function () {
                if (!ej2_base_2.isNullOrUndefined(this.selectionModule)) {
                    return this.selection.getDocumentStart();
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "documentEnd", {
            get: function () {
                if (!ej2_base_2.isNullOrUndefined(this.selectionModule)) {
                    return this.selection.getDocumentEnd();
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "isReadOnlyMode", {
            get: function () {
                return this.isReadOnly || ej2_base_2.isNullOrUndefined(this.editorModule)
                    || ej2_base_2.isNullOrUndefined(this.selectionModule) || !ej2_base_2.isNullOrUndefined(this.editor) && this.editor.restrictEditing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "isSpellCheck", {
            get: function () {
                return this.enableSpellCheck && this.spellChecker.enableSpellCheck;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentEditor.prototype, "enableImageResizerMode", {
            get: function () {
                return this.enableImageResizer && !ej2_base_2.isNullOrUndefined(this.imageResizerModule);
            },
            enumerable: true,
            configurable: true
        });
        DocumentEditor.prototype.preRender = function () {
            var _this = this;
            if (this.documentEditorSettings && this.documentEditorSettings.enableOptimizedTextMeasuring) {
                DocumentEditor_1.Inject(index_21.Optimized);
            }
            else {
                DocumentEditor_1.Inject(index_21.Regular);
            }
            this.findResultsList = [];
            setTimeout(function () {
                if (ej2_base_2.isNullOrUndefined(_this.documentEditorSettings.popupTarget)) {
                    _this.documentEditorSettings.popupTarget = document.body;
                }
            }, 0);
            if (!ej2_base_2.isNullOrUndefined(this.element) && this.element.id === '') {
                this.element.id = index_21.HelperMethods.getUniqueElementId();
            }
            if (this.refreshing) {
                this.initHelper();
            }
        };
        DocumentEditor.prototype.initHelper = function () {
            this.documentHelper = new index_19.DocumentHelper(this);
            if (this.layoutType === 'Pages') {
                this.viewer = new index_1.PageLayoutViewer(this);
            }
            else {
                this.viewer = new index_1.WebLayoutViewer(this);
            }
            this.parser = new index_5.SfdtReader(this.documentHelper);
        };
        DocumentEditor.prototype.render = function () {
            if (!ej2_base_2.isNullOrUndefined(this.element)) {
                var container = this.element;
                container.style.minHeight = '200px';
                container.style.minWidth = '200px';
                if (this.height !== '') {
                    this.element.style.height = ej2_base_1.formatUnit(this.height);
                }
                if (this.width !== '') {
                    this.element.style.width = ej2_base_1.formatUnit(this.width);
                }
            }
            this.textMeasureHelper = (this.optimizedModule) ? this.optimizedModule : this.regularModule;
            if (ej2_base_2.isNullOrUndefined(this.textMeasureHelper)) {
                this.textMeasureHelper = new index_21.Optimized(this.documentHelper);
            }
            this.documentHelper.initializeComponents();
            this.openBlank();
            this.renderComplete();
            this.renderRulers();
            this.createdTriggered = true;
        };
        DocumentEditor.prototype.renderRulers = function () {
            this.rulerHelper = new dom_util_1.RulerHelper();
            this.rulerContainer = this.rulerHelper.renderOverlapElement(this);
            this.rulerHelper.renderRuler(this, true);
            this.rulerHelper.renderRuler(this, false);
            this.rulerHelper.renderRulerMarkerIndicatorElement(this);
            this.rulerHelper.createIndicatorLines(this);
            this.showHideRulers();
        };
        DocumentEditor.prototype.showHideRulers = function () {
            if (this.rulerHelper && this.documentEditorSettings && !ej2_base_2.isNullOrUndefined(!this.documentEditorSettings.showRuler)) {
                var showRuler = this.documentEditorSettings.showRuler && !this.isReadOnlyMode;
                this.rulerHelper.hideTabStopSwitch(showRuler);
                this.rulerHelper.hideRulerBottom(showRuler);
                if (this.vRuler) {
                    this.vRuler.showHideRuler(showRuler);
                }
                if (this.hRuler) {
                    this.hRuler.showHideRuler(showRuler);
                }
            }
        };
        DocumentEditor.prototype.getModuleName = function () {
            return 'DocumentEditor';
        };
        DocumentEditor.prototype.onPropertyChanged = function (model, oldProp) {
            var _this = this;
            for (var _i = 0, _a = Object.keys(model); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'enableTrackChanges':
                        this.notify(constants_1.trackChanges, model);
                        this.getSettingData('enableTrackChanges', model.enableTrackChanges);
                        if (this.documentHelper.isTrackedOnlyMode && !model.enableTrackChanges) {
                            this.enableTrackChanges = true;
                        }
                        break;
                    case 'autoResizeOnVisibilityChange':
                        if (model.autoResizeOnVisibilityChange) {
                            this.documentHelper.triggerAutoResizeInterval();
                        }
                        break;
                    case 'zoomFactor':
                        if (this.viewer && oldProp.zoomFactor !== model.zoomFactor) {
                            this.documentHelper.zoomFactor = model.zoomFactor;
                            if (this.rulerHelper && this.documentEditorSettings && this.documentEditorSettings.showRuler) {
                                this.rulerHelper.updateRuler(this, true);
                            }
                        }
                        break;
                    case 'layoutType':
                        if (this.selection && this.selection.isWebLayout) {
                            break;
                        }
                        this.viewer.destroy();
                        if (this.layoutType === 'Pages') {
                            this.viewer = new index_1.PageLayoutViewer(this);
                        }
                        else {
                            if (this.enableHeaderAndFooter === true) {
                                this.selection.closeHeaderFooter();
                            }
                            this.viewer = new index_1.WebLayoutViewer(this);
                        }
                        var paragraph = this.selection.start.paragraph;
                        if (paragraph.containerWidget instanceof page_1.FootNoteWidget) {
                            this.selection.clearSelectionHighlightInSelectedWidgets();
                            this.selection.selectContent(this.documentStart, true);
                        }
                        this.editor.layoutWholeDocument(true);
                        setTimeout(function () {
                            _this.fireViewChange();
                        }, 200);
                        break;
                    case 'locale':
                        this.localizeDialogs();
                        break;
                    case 'isReadOnly':
                        if (!ej2_base_2.isNullOrUndefined(this.optionsPaneModule) && this.optionsPaneModule.isOptionsPaneShow) {
                            this.optionsPaneModule.showHideOptionsPane(false);
                            this.documentHelper.updateFocus();
                        }
                        if (this.showComments) {
                            this.commentReviewPane.showHidePane(true, 'Comments');
                        }
                        this.commentReviewPane.enableDisableItems();
                        this.trackChangesPane.enableDisableButton(!this.isReadOnly && !this.documentHelper.isDocumentProtected);
                        this.showHideRulers();
                        break;
                    case 'currentUser':
                    case 'userColor':
                        if (this.selection && this.documentHelper.isDocumentProtected) {
                            this.selection.highlightEditRegion();
                        }
                        this.viewer.updateScrollBars();
                        break;
                    case 'pageGap':
                    case 'pageOutline':
                        this.viewer.updateScrollBars();
                        break;
                    case 'zIndex':
                        if (this.documentHelper.dialog) {
                            this.documentHelper.dialog.zIndex = model.zIndex + 10;
                        }
                        if (this.documentHelper.dialog2) {
                            this.documentHelper.dialog2.zIndex = model.zIndex;
                        }
                        break;
                    case 'showComments':
                        if (this.viewer && model.showComments !== oldProp.showComments) {
                            this.documentHelper.showComments(model.showComments);
                        }
                        this.viewer.updateScrollBars();
                        break;
                    case 'enableRtl':
                        this.localizeDialogs(model.enableRtl);
                        break;
                    case 'enableComment':
                        if (this.viewer && this.showComments) {
                            this.showComments = this.showComments ? this.enableComment : false;
                            this.documentHelper.showComments(model.enableComment);
                        }
                        this.viewer.updateScrollBars();
                        break;
                    case 'showRevisions':
                        if (this.isReadOnly || this.documentHelper.isDocumentProtected) {
                            this.documentHelper.showRevisions(false);
                        }
                        else if (this.viewer) {
                            this.documentHelper.showRevisions(model.showRevisions);
                        }
                        this.viewer.updateScrollBars();
                        break;
                    case 'documentSettings':
                        if (!ej2_base_2.isNullOrUndefined(model.documentSettings.compatibilityMode)) {
                            var oldValue = oldProp.documentSettings.compatibilityMode;
                            var newValue = model.documentSettings.compatibilityMode;
                            if ((oldValue == "Word2013" && newValue != "Word2013") || (oldValue != "Word2013" && newValue == "Word2013")) {
                                if (this.documentHelper.compatibilityMode !== newValue) {
                                    this.documentHelper.compatibilityMode = newValue;
                                    this.editor.layoutWholeDocument(true);
                                }
                            }
                        }
                        this.viewer.updateScrollBars();
                        break;
                    case 'documentEditorSettings':
                        if (!ej2_base_2.isNullOrUndefined(model.documentEditorSettings.enableOptimizedTextMeasuring)) {
                            this.documentHelper.heightInfoCollection = {};
                            if (model.documentEditorSettings.enableOptimizedTextMeasuring) {
                                this.textMeasureHelper = this.optimizedModule;
                            }
                            else {
                                this.textMeasureHelper = this.regularModule;
                            }
                            this.viewer.updateScrollBars();
                        }
                        if ((!ej2_base_2.isNullOrUndefined(model.documentEditorSettings.showHiddenMarks) && (model.documentEditorSettings.showHiddenMarks !== oldProp.documentEditorSettings.showHiddenMarks))
                            || (!ej2_base_2.isNullOrUndefined(model.documentEditorSettings.showBookmarks) && (model.documentEditorSettings.showBookmarks !== oldProp.documentEditorSettings.showBookmarks))) {
                            this.viewer.updateScrollBars();
                        }
                        if (!ej2_base_2.isNullOrUndefined(model.documentEditorSettings.highlightEditableRanges)) {
                            if (this.documentHelper && this.documentHelper.restrictEditingPane) {
                                this.documentHelper.restrictEditingPane.highlightCheckBox.checked = model.documentEditorSettings.highlightEditableRanges;
                            }
                        }
                        if (!ej2_base_2.isNullOrUndefined(model.documentEditorSettings.showRuler)) {
                            this.showHideRulers();
                            if (model.documentEditorSettings.showRuler) {
                                this.rulerHelper.updateRuler(this, true);
                            }
                        }
                        break;
                    case 'height':
                        this.element.style.height = ej2_base_1.formatUnit(this.height);
                        this.resize();
                        break;
                    case 'width':
                        this.element.style.width = ej2_base_1.formatUnit(this.width);
                        this.resize();
                        break;
                    case 'enableAutoFocus':
                        this.enableAutoFocus = model.enableAutoFocus;
                        break;
                }
            }
        };
        DocumentEditor.prototype.localizeDialogs = function (enableRtl) {
            if (this.locale !== '') {
                var l10n = new ej2_base_2.L10n('documenteditor', this.defaultLocale);
                l10n.setLocale(this.locale);
                if (!ej2_base_2.isNullOrUndefined(enableRtl)) {
                    this.documentHelper.dialog.enableRtl = enableRtl;
                    this.documentHelper.dialog2.enableRtl = enableRtl;
                }
                if (this.optionsPaneModule) {
                    this.optionsPaneModule.initOptionsPane(l10n, enableRtl);
                }
                if (this.paragraphDialogModule) {
                    this.paragraphDialogModule.initParagraphDialog(l10n);
                }
                if (this.footNotesDialogModule) {
                    this.footNotesDialogModule.notesDialog(l10n, enableRtl);
                }
                if (this.pageSetupDialogModule) {
                    this.pageSetupDialogModule.initPageSetupDialog(l10n, enableRtl);
                }
                if (this.columnsDialogModule) {
                    this.columnsDialogModule.initColumnsDialog(l10n, enableRtl);
                }
                if (this.fontDialogModule) {
                    this.fontDialogModule.initFontDialog(l10n, enableRtl);
                }
                if (this.hyperlinkDialogModule) {
                    this.hyperlinkDialogModule.initHyperlinkDialog(l10n, enableRtl);
                }
                if (this.contextMenuModule) {
                    this.contextMenuModule.contextMenuInstance.destroy();
                    this.contextMenuModule.initContextMenu(l10n, enableRtl);
                }
                if (this.listDialogModule) {
                    this.listDialogModule.initListDialog(l10n, enableRtl);
                }
                if (this.tablePropertiesDialogModule) {
                    this.tablePropertiesDialogModule.initTablePropertyDialog(l10n, enableRtl);
                }
                if (this.bordersAndShadingDialogModule) {
                    this.bordersAndShadingDialogModule.initBordersAndShadingsDialog(l10n, enableRtl);
                }
                if (this.cellOptionsDialogModule) {
                    this.cellOptionsDialogModule.initCellMarginsDialog(l10n, enableRtl);
                }
                if (this.tableOptionsDialogModule) {
                    this.tableOptionsDialogModule.initTableOptionsDialog(l10n, enableRtl);
                }
                if (this.tableDialogModule) {
                    this.tableDialogModule.initTableDialog(l10n);
                }
                if (this.styleDialogModule) {
                    this.styleDialogModule.initStyleDialog(l10n, enableRtl);
                }
                if (this.tabDialogModule) {
                    this.tabDialogModule.initTabsDialog(l10n, enableRtl);
                }
                if (this.tableOfContentsDialogModule) {
                    this.tableOfContentsDialogModule.initTableOfContentDialog(l10n, enableRtl);
                }
                if (this.commentReviewPane && this.commentReviewPane.parentPaneElement) {
                    if (this.enableRtl) {
                        ej2_base_1.classList(this.commentReviewPane.parentPaneElement, ['e-rtl'], []);
                    }
                    else {
                        ej2_base_1.classList(this.commentReviewPane.parentPaneElement, [], ['e-rtl']);
                    }
                }
            }
        };
        DocumentEditor.prototype.setDefaultCharacterFormat = function (characterFormat) {
            this.characterFormat = JSON.parse(index_21.HelperMethods.sanitizeString(JSON.stringify(characterFormat)));
            this.documentHelper.setDefaultDocumentFormat();
            if (!ej2_base_2.isNullOrUndefined(this.selection)) {
                this.selection.retrieveCurrentFormatProperties();
            }
        };
        DocumentEditor.prototype.setDefaultParagraphFormat = function (paragraphFormat) {
            this.paragraphFormat = JSON.parse(index_21.HelperMethods.sanitizeString(JSON.stringify(paragraphFormat)));
            this.documentHelper.setDefaultDocumentFormat();
            if (!ej2_base_2.isNullOrUndefined(this.selection)) {
                this.selection.retrieveCurrentFormatProperties();
            }
        };
        DocumentEditor.prototype.setDefaultSectionFormat = function (sectionFormat) {
            this.sectionFormat = JSON.parse(index_21.HelperMethods.sanitizeString(JSON.stringify(sectionFormat)));
            this.documentHelper.setDefaultDocumentFormat();
            if (!ej2_base_2.isNullOrUndefined(this.selection)) {
                this.selection.retrieveCurrentFormatProperties();
            }
        };
        DocumentEditor.prototype.getPersistData = function () {
            return 'documenteditor';
        };
        DocumentEditor.prototype.clearPreservedCollectionsInViewer = function () {
            if (this.viewer instanceof index_1.LayoutViewer) {
                this.documentHelper.clearDocumentItems();
            }
        };
        DocumentEditor.prototype.getDocumentEditorElement = function () {
            return this.element;
        };
        DocumentEditor.prototype.fireContentChange = function () {
            if (this.enableEditor && this.editor.isIncrementalSave) {
                return;
            }
            if (this.enableLockAndEdit && this.collaborativeEditingModule) {
                this.collaborativeEditingModule.saveContent();
            }
            var eventArgs = { source: this };
            if (this.enableCollaborativeEditing) {
                eventArgs.operations = [];
                if (this.isSettingOp) {
                    eventArgs.operations = this.documentSettingOps;
                    this.documentSettingOps = [];
                    this.isSettingOp = false;
                }
                else {
                    if (!ej2_base_2.isNullOrUndefined(this.editorHistory)) {
                        if (!ej2_base_2.isNullOrUndefined(this.editorHistory.currentHistoryInfo) && this.editorHistory.currentHistoryInfo.action != 'ApplyStyle' && this.editorHistory.currentHistoryInfo.action != 'TableMarginsSelection' && this.editorHistory.currentHistoryInfo.action != 'CellMarginsSelection') {
                            if (this.editorHistory.currentHistoryInfo.action === 'IMEInput') {
                                eventArgs.operations = this.editorHistory.currentHistoryInfo.getActionInfo();
                            }
                        }
                        else if (!ej2_base_2.isNullOrUndefined(this.editorHistory.lastOperation)) {
                            var history_1 = this.editorHistory.lastOperation;
                            if (history_1.action === 'IMEInput') {
                                eventArgs.operations = history_1.getActionInfo(true);
                            }
                            else {
                                eventArgs.operations = history_1.getActionInfo();
                            }
                        }
                        if (this.enableTrackChanges && eventArgs.operations.length > 0) {
                            for (var i = 0; i < eventArgs.operations.length; i++) {
                                if (ej2_base_2.isNullOrUndefined(eventArgs.operations[i].markerData)) {
                                    eventArgs.operations[i].markerData = {};
                                }
                                eventArgs.operations[i].markerData.author = this.currentUser;
                            }
                        }
                    }
                }
            }
            this.trigger(constants_1.contentChangeEvent, eventArgs);
        };
        DocumentEditor.prototype.fireDocumentChange = function () {
            if (this.enableLockAndEdit && this.enableEditor) {
                this.editor.enforceProtection('', false, true);
            }
            var eventArgs = { source: this };
            this.trigger(constants_1.documentChangeEvent, eventArgs);
        };
        DocumentEditor.prototype.fireSelectionChange = function () {
            if (this.enableEditor && this.editor.isIncrementalSave) {
                return;
            }
            if (!this.documentHelper.isCompositionStart && ej2_base_2.Browser.isDevice && this.editorModule) {
                this.editorModule.predictText();
            }
            var eventArgs = { source: this, isCompleted: this.documentHelper.isCompleted };
            this.trigger(constants_1.selectionChangeEvent, eventArgs);
            this.documentHelper.isSelectionCompleted = this.documentHelper.isCompleted;
            this.documentHelper.isCompleted = true;
        };
        DocumentEditor.prototype.fireZoomFactorChange = function () {
            var eventArgs = { source: this };
            this.trigger(constants_1.zoomFactorChangeEvent, eventArgs);
            this.notify(constants_1.internalZoomFactorChange, eventArgs);
        };
        DocumentEditor.prototype.fireBeformFieldFill = function () {
            var eventArgs = {};
            this.trigger(constants_1.beforeFieldFillEvent, eventArgs);
        };
        DocumentEditor.prototype.fireAfterFormFieldFill = function () {
            var eventArgs = {};
            this.trigger(constants_1.afterFieldFillEvent, eventArgs);
        };
        DocumentEditor.prototype.fireServiceFailure = function (eventArgs) {
            this.trigger(constants_1.serviceFailureEvent, eventArgs);
        };
        DocumentEditor.prototype.fireViewChange = function () {
            if (this.viewer && this.documentHelper.pages.length > 0) {
                if (this.viewer.visiblePages.length > 0) {
                    var pages = this.viewer.visiblePages;
                    var eventArgs = {
                        startPage: pages[0].index + 1,
                        endPage: pages[pages.length - 1].index + 1,
                        source: this
                    };
                    this.trigger(constants_1.viewChangeEvent, eventArgs);
                    this.notify(constants_1.internalviewChangeEvent, eventArgs);
                }
            }
        };
        DocumentEditor.prototype.fireCustomContextMenuSelect = function (item) {
            var eventArgs = { id: item };
            this.trigger(constants_1.customContextMenuSelectEvent, eventArgs);
        };
        DocumentEditor.prototype.fireCustomContextMenuBeforeOpen = function (item) {
            var eventArgs = { ids: item };
            this.trigger(constants_1.customContextMenuBeforeOpenEvent, eventArgs);
        };
        DocumentEditor.prototype.showParagraphDialog = function (paragraphFormat) {
            if (this.paragraphDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.paragraphDialogModule.show(paragraphFormat);
            }
        };
        DocumentEditor.prototype.showPageSetupDialog = function () {
            if (this.pageSetupDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.pageSetupDialogModule.show();
            }
        };
        DocumentEditor.prototype.showColumnsDialog = function () {
            if (this.columnsDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.columnsDialogModule.show();
            }
        };
        DocumentEditor.prototype.showFootNotesDialog = function () {
            if (this.footNotesDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.footNotesDialogModule.show();
            }
        };
        DocumentEditor.prototype.showFontDialog = function (characterFormat) {
            if (this.fontDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.fontDialogModule.showFontDialog(characterFormat);
            }
        };
        DocumentEditor.prototype.showCellOptionsDialog = function () {
            if (this.cellOptionsDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.cellOptionsDialogModule.show();
            }
        };
        DocumentEditor.prototype.showTableOptionsDialog = function () {
            if (this.tableOptionsDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.tableOptionsDialogModule.show();
            }
        };
        DocumentEditor.prototype.showTableDialog = function () {
            if (this.tableDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.tableDialogModule.show();
            }
        };
        DocumentEditor.prototype.showTableOfContentsDialog = function () {
            if (this.tableOfContentsDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.tableOfContentsDialogModule.show();
            }
        };
        DocumentEditor.prototype.showStyleDialog = function () {
            if (this.styleDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.styleDialogModule.show();
            }
        };
        DocumentEditor.prototype.showHyperlinkDialog = function () {
            if (this.hyperlinkDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.hyperlinkDialogModule.show();
            }
        };
        DocumentEditor.prototype.showBookmarkDialog = function () {
            if (this.bookmarkDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.bookmarkDialogModule.show();
            }
        };
        DocumentEditor.prototype.showStylesDialog = function () {
            if (this.stylesDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.stylesDialogModule.show();
            }
        };
        DocumentEditor.prototype.showListDialog = function () {
            if (this.listDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.listDialogModule.showListDialog();
            }
        };
        DocumentEditor.prototype.showTablePropertiesDialog = function () {
            if (this.tablePropertiesDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.tablePropertiesDialogModule.show();
            }
        };
        DocumentEditor.prototype.showBordersAndShadingDialog = function () {
            if (this.bordersAndShadingDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.bordersAndShadingDialogModule.show();
            }
        };
        DocumentEditor.prototype.requiredModules = function () {
            var modules = [];
            if (this.enableCollaborativeEditing) {
                modules.push({
                    member: 'CollaborativeEditingHandler', args: [this]
                });
            }
            if (this.enableLockAndEdit) {
                modules.push({
                    member: 'CollaborativeEditing', args: [this]
                });
            }
            if (this.enablePrint) {
                modules.push({
                    member: 'Print', args: []
                });
            }
            if (this.enableSfdtExport || this.enableWordExport || this.enableTextExport || this.enableSelection || this.enableEditor) {
                modules.push({
                    member: 'SfdtExport', args: [this.documentHelper]
                });
            }
            if (this.enableWordExport) {
                modules.push({
                    member: 'WordExport', args: []
                });
            }
            if (this.enableTextExport) {
                modules.push({
                    member: 'TextExport', args: []
                });
            }
            if (this.enableSelection || this.enableSearch || this.enableEditor) {
                modules.push({
                    member: 'Selection', args: [this]
                });
                if (this.enableContextMenu) {
                    modules.push({
                        member: 'ContextMenu', args: [this.documentHelper]
                    });
                }
            }
            if (this.enableSearch) {
                modules.push({
                    member: 'Search', args: [this]
                });
                if (this.enableOptionsPane) {
                    modules.push({
                        member: 'OptionsPane', args: [this.documentHelper]
                    });
                }
            }
            if (this.documentEditorSettings && this.documentEditorSettings.enableOptimizedTextMeasuring) {
                DocumentEditor_1.Inject(index_21.Optimized);
                modules.push({ member: 'Optimized', args: [this.documentHelper] });
            }
            else {
                DocumentEditor_1.Inject(index_21.Regular);
                modules.push({ member: 'Regular', args: [this.documentHelper] });
            }
            if (this.enableEditor) {
                modules.push({
                    member: 'Editor', args: [this.documentHelper]
                });
                if (this.enableImageResizer) {
                    modules.push({
                        member: 'ImageResizer', args: [this, this.documentHelper]
                    });
                }
                if (this.enableEditorHistory) {
                    modules.push({
                        member: 'EditorHistory', args: [this]
                    });
                }
                if (this.enableHyperlinkDialog) {
                    modules.push({
                        member: 'HyperlinkDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableTableDialog) {
                    modules.push({
                        member: 'TableDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableBookmarkDialog) {
                    modules.push({
                        member: 'BookmarkDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableTableOfContentsDialog) {
                    modules.push({
                        member: 'TableOfContentsDialog', args: [this.documentHelper]
                    });
                }
                if (this.enablePageSetupDialog) {
                    modules.push({
                        member: 'PageSetupDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableColumnsDialog) {
                    modules.push({
                        member: 'ColumnsDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableFootnoteAndEndnoteDialog) {
                    modules.push({
                        member: 'FootNotesDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableStyleDialog) {
                    modules.push({
                        member: 'StylesDialog', args: [this.documentHelper]
                    });
                    modules.push({
                        member: 'StyleDialog', args: [this.documentHelper]
                    });
                    modules.push({
                        member: 'BulletsAndNumberingDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableListDialog) {
                    modules.push({
                        member: 'ListDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableParagraphDialog) {
                    modules.push({
                        member: 'ParagraphDialog', args: [this.documentHelper]
                    });
                    modules.push({
                        member: 'TabDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableFontDialog) {
                    modules.push({
                        member: 'FontDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableTablePropertiesDialog) {
                    modules.push({
                        member: 'TablePropertiesDialog', args: [this.documentHelper]
                    });
                    modules.push({
                        member: 'CellOptionsDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableBordersAndShadingDialog) {
                    modules.push({
                        member: 'BordersAndShadingDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableTableOptionsDialog) {
                    modules.push({
                        member: 'TableOptionsDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableSpellCheck) {
                    modules.push({
                        member: 'SpellChecker', args: [this.documentHelper]
                    });
                    modules.push({
                        member: 'SpellCheckDialog', args: [this.documentHelper]
                    });
                }
                if (this.enableFormField) {
                    modules.push({
                        member: 'TextFormFieldDialog', args: [this]
                    });
                    modules.push({
                        member: 'DropDownFormFieldDialog', args: [this]
                    });
                    modules.push({
                        member: 'CheckBoxFormFieldDialog', args: [this]
                    });
                }
            }
            return modules;
        };
        DocumentEditor.prototype.open = function (sfdtText) {
            if (!ej2_base_2.isNullOrUndefined(this.viewer)) {
                this.clearPreservedCollectionsInViewer();
                this.documentHelper.userCollection.push('Everyone');
                this.documentHelper.lists = [];
                this.documentHelper.abstractLists = [];
                this.documentHelper.styles = new index_8.WStyles();
                this.documentHelper.cachedPages = [];
                this.clearSpellCheck();
                if (this.isSpellCheck) {
                    if (this.isSpellCheck && !this.spellChecker.enableOptimizedSpellCheck) {
                        this.documentHelper.triggerElementsOnLoading = true;
                        this.documentHelper.triggerSpellCheck = true;
                    }
                }
                if (!ej2_base_2.isNullOrUndefined(sfdtText) && this.viewer) {
                    var incrementalOps = {};
                    this.documentHelper.setDefaultDocumentFormat();
                    this.documentHelper.onDocumentChanged(this.parser.convertJsonToDocument(sfdtText, incrementalOps), incrementalOps);
                    if (this.editorModule) {
                        this.editorModule.intializeDefaultStyles();
                    }
                }
                if (this.isSpellCheck) {
                    if (this.isSpellCheck && !this.spellChecker.enableOptimizedSpellCheck) {
                        this.documentHelper.triggerElementsOnLoading = false;
                        this.documentHelper.triggerSpellCheck = false;
                    }
                }
            }
        };
        DocumentEditor.prototype.scrollToPage = function (pageNumber) {
            if (ej2_base_2.isNullOrUndefined(this.viewer) || pageNumber < 1 || pageNumber > this.documentHelper.pages.length) {
                return false;
            }
            this.viewer.scrollToPage(pageNumber - 1);
            return true;
        };
        DocumentEditor.prototype.enableAllModules = function () {
            this.enablePrint = this.enableSfdtExport = this.enableWordExport = this.enableTextExport
                = this.enableSelection = this.enableContextMenu = this.enableSearch = this.enableOptionsPane
                    = this.enableEditor = this.enableImageResizer = this.enableEditorHistory
                        = this.enableHyperlinkDialog = this.enableTableDialog = this.enableBookmarkDialog
                            = this.enableTableOfContentsDialog = this.enableFootnoteAndEndnoteDialog
                                = this.enablePageSetupDialog = this.enableStyleDialog
                                    = this.enableListDialog = this.enableParagraphDialog = this.enableFontDialog
                                        = this.enableTablePropertiesDialog = this.enableBordersAndShadingDialog
                                            = this.enableTableOptionsDialog = this.enableSpellCheck = this.enableComment
                                                = this.enableFormField = this.enableColumnsDialog = true;
            DocumentEditor_1.Inject(index_2.Print, index_15.SfdtExport, index_11.WordExport, index_12.TextExport, index_6.Selection, index_9.Search, index_7.Editor, index_14.ImageResizer, index_7.EditorHistory, index_13.ContextMenu, index_10.OptionsPane, index_16.HyperlinkDialog, index_16.TableDialog, notes_dialog_1.NotesDialog, index_16.BookmarkDialog, index_16.TableOfContentsDialog, index_17.PageSetupDialog, index_17.StyleDialog, index_17.ListDialog, index_17.ParagraphDialog, tab_dialog_1.TabDialog, index_1.BulletsAndNumberingDialog, index_17.FontDialog, index_18.TablePropertiesDialog, index_18.BordersAndShadingDialog, index_18.TableOptionsDialog, index_18.CellOptionsDialog, index_16.StylesDialog, spell_checker_1.SpellChecker, spellCheck_dialog_1.SpellCheckDialog, index_20.CheckBoxFormFieldDialog, form_field_text_dialog_1.TextFormFieldDialog, form_field_drop_down_dialog_1.DropDownFormFieldDialog, columns_dialog_1.ColumnsDialog);
        };
        DocumentEditor.prototype.resize = function (width, height) {
            if (this.element) {
                if (!ej2_base_2.isNullOrUndefined(width) && width > 200) {
                    this.element.style.width = width + 'px';
                }
                if (!ej2_base_2.isNullOrUndefined(height) && height > 200) {
                    this.element.style.height = height + 'px';
                }
                if (this.viewer) {
                    this.documentHelper.updateViewerSize();
                }
                if (this.trackChangesPane.toolbar) {
                    this.trackChangesPane.toolbar.refreshOverflow();
                }
            }
            if (this.rulerHelper && this.documentEditorSettings && this.documentEditorSettings.showRuler) {
                this.rulerHelper.updateRuler(this, false);
            }
        };
        DocumentEditor.prototype.getFormFieldNames = function () {
            var formFieldNames = [];
            var formFields = this.documentHelper.formFields;
            for (var i = 0; i < formFields.length; i++) {
                if (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '') {
                    formFieldNames.push(formFields[parseInt(i.toString(), 10)].formFieldData.name);
                }
            }
            return formFieldNames;
        };
        DocumentEditor.prototype.getFormFieldInfo = function (name) {
            name = index_21.HelperMethods.sanitizeString(name);
            var formFields = this.documentHelper.formFields;
            for (var i = 0; i < formFields.length; i++) {
                if ((formFields[parseInt(i.toString(), 10)].formFieldData.name === name) && (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '')) {
                    return formFields[parseInt(i.toString(), 10)].formFieldData.getFormFieldInfo();
                }
            }
            return undefined;
        };
        DocumentEditor.prototype.setFormFieldInfo = function (name, formFieldInfo) {
            name = index_21.HelperMethods.sanitizeString(name);
            var formFields = this.documentHelper.formFields;
            for (var i = 0; i < formFields.length; i++) {
                if ((formFields[parseInt(i.toString(), 10)].formFieldData.name === name) && (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '')) {
                    var currentField = formFields[parseInt(i.toString(), 10)];
                    if (this.selection) {
                        this.selection.selectFieldInternal(currentField);
                        if (this.editor) {
                            this.editor.setFormField(currentField, formFieldInfo);
                        }
                    }
                    return;
                }
            }
        };
        DocumentEditor.prototype.resetFormFields = function (name) {
            if (!ej2_base_2.isNullOrUndefined(name)) {
                name = index_21.HelperMethods.sanitizeString(name);
            }
            var formFields = this.documentHelper.formFields;
            for (var i = 0; i < formFields.length; i++) {
                if (ej2_base_2.isNullOrUndefined(name) || name === formFields[parseInt(i.toString(), 10)].formFieldData.name) {
                    if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof index_20.TextFormField) {
                        this.editor.updateFormField(formFields[parseInt(i.toString(), 10)], formFields[parseInt(i.toString(), 10)].formFieldData.defaultValue, true);
                    }
                    else if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof index_20.CheckBoxFormField) {
                        this.editor.toggleCheckBoxFormField(formFields[parseInt(i.toString(), 10)], true, formFields[parseInt(i.toString(), 10)].formFieldData.defaultValue);
                    }
                    else if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof index_20.DropDownFormField) {
                        this.editor.updateFormField(formFields[parseInt(i.toString(), 10)], 0, true);
                    }
                }
            }
        };
        DocumentEditor.prototype.importFormData = function (formData) {
            var formField = this.documentHelper.formFields;
            for (var i = 0; i < formData.length; i++) {
                var formFieldData = formData[parseInt(i.toString(), 10)];
                var fieldName = formFieldData.fieldName;
                for (var j = 0; j < formField.length; j++) {
                    if (formField[parseInt(j.toString(), 10)].formFieldData.name === fieldName) {
                        if (formField[parseInt(j.toString(), 10)].formFieldData instanceof index_20.CheckBoxFormField) {
                            this.editor.toggleCheckBoxFormField(formField[parseInt(j.toString(), 10)], true, formFieldData.value);
                        }
                        else if (formField[parseInt(j.toString(), 10)].formFieldData instanceof index_20.TextFormField) {
                            this.editor.updateFormField(formField[parseInt(j.toString(), 10)], formFieldData.value);
                        }
                        else if (formField[parseInt(j.toString(), 10)].formFieldData instanceof index_20.DropDownFormField) {
                            this.editor.updateFormField(formField[parseInt(j.toString(), 10)], formFieldData.value);
                        }
                    }
                }
            }
        };
        DocumentEditor.prototype.exportFormData = function () {
            var data = [];
            var formField = this.documentHelper.formFields;
            for (var i = 0; i < formField.length; i++) {
                if (formField[parseInt(i.toString(), 10)].formFieldData.name !== '') {
                    var formData = { fieldName: '', value: '' };
                    formData.fieldName = formField[parseInt(i.toString(), 10)].formFieldData.name;
                    if (formField[parseInt(i.toString(), 10)].formFieldData instanceof index_20.CheckBoxFormField) {
                        formData.value = formField[parseInt(i.toString(), 10)].formFieldData.checked;
                    }
                    else if (formField[parseInt(i.toString(), 10)].formFieldData instanceof index_20.TextFormField) {
                        var resultText = '';
                        if (this.documentHelper.isInlineFormFillProtectedMode) {
                            resultText = this.editorModule.getFieldResultText(formField[parseInt(i.toString(), 10)]);
                        }
                        else {
                            resultText = formField[parseInt(i.toString(), 10)].resultText;
                        }
                        var rex = RegExp(this.documentHelper.textHelper.getEnSpaceCharacter(), 'gi');
                        if (resultText.replace(rex, '') === '') {
                            resultText = '';
                        }
                        formData.value = resultText;
                    }
                    else if (formField[parseInt(i.toString(), 10)].formFieldData instanceof index_20.DropDownFormField) {
                        formData.value = formField[parseInt(i.toString(), 10)].formFieldData.selectedIndex;
                    }
                    data.push(formData);
                }
            }
            return data;
        };
        DocumentEditor.prototype.updateFields = function () {
            for (var i = 0; i < this.documentHelper.fields.length; i++) {
                var field = this.documentHelper.fields[parseInt(i.toString(), 10)];
                var code = this.selection.getFieldCode(field);
                if (code.toLowerCase().trim().indexOf('ref ') === 0) {
                    var fieldPara = field.line.paragraph;
                    if (!ej2_base_2.isNullOrUndefined(fieldPara)
                        && !ej2_base_2.isNullOrUndefined(this.selection)
                        && !ej2_base_2.isNullOrUndefined(this.selection.getPage(fieldPara))) {
                        this.selection.updateRefField(field);
                    }
                }
            }
        };
        DocumentEditor.prototype.focusIn = function () {
            if (this.viewer) {
                this.documentHelper.updateFocus();
            }
        };
        DocumentEditor.prototype.fitPage = function (pageFitType) {
            if (ej2_base_2.isNullOrUndefined(pageFitType)) {
                pageFitType = 'None';
            }
            if (this.viewer) {
                this.viewer.pageFitType = pageFitType;
            }
        };
        DocumentEditor.prototype.exportAsImage = function (pageNumber, format) {
            if (ej2_base_2.isNullOrUndefined(this.viewer)) {
                throw new Error('Invalid operation.');
            }
            if (this.printModule) {
                var mimeType = format === 'Png' ? 'image/png' : 'image/jpeg';
                return this.printModule.exportAsImage(this.documentHelper, pageNumber, mimeType);
            }
            return undefined;
        };
        DocumentEditor.prototype.exportAsPath = function (pageNumber) {
            if (!ej2_base_2.isNullOrUndefined(pageNumber) && pageNumber <= this.documentHelper.pages.length && pageNumber >= 1) {
                var printPage = this.documentHelper.pages[(pageNumber - 1)];
                this.documentHelper.render.isExporting = true;
                this.documentHelper.render.renderWidgets(printPage, 0, 0, 0, 0);
                var imageData = this.documentHelper.render.pageCanvas.toDataURL();
                this.documentHelper.render.pageCanvas.getContext("2d").renderedPath = "";
                this.documentHelper.render.isExporting = false;
                return imageData;
            }
            return undefined;
        };
        DocumentEditor.prototype.print = function (printWindow) {
            if (ej2_base_2.isNullOrUndefined(this.viewer)) {
                throw new Error('Invalid operation.');
            }
            if (this.printModule) {
                if (this.layoutType === 'Continuous') {
                    this.documentHelper.isWebPrinting = true;
                    this.viewer = new index_1.PageLayoutViewer(this);
                    this.editor.layoutWholeDocument();
                    this.printModule.print(this.documentHelper, printWindow);
                    this.viewer = new index_1.WebLayoutViewer(this);
                    this.editor.layoutWholeDocument();
                    this.documentHelper.isWebPrinting = false;
                }
                else {
                    this.printModule.print(this.documentHelper, printWindow);
                }
            }
            else {
                throw new Error('Invalid operation. Print is not enabled.');
            }
        };
        DocumentEditor.prototype.serialize = function () {
            var json = '';
            if (this.enableSfdtExport && this.sfdtExportModule instanceof index_15.SfdtExport) {
                json = this.sfdtExportModule.serialize();
            }
            else {
                throw new Error('Invalid operation. Sfdt export is not enabled.');
            }
            return json;
        };
        DocumentEditor.prototype.save = function (fileName, formatType) {
            var _this = this;
            if (!ej2_base_2.isNullOrUndefined(fileName)) {
                fileName = index_21.HelperMethods.sanitizeString(fileName);
            }
            fileName = fileName || 'Untitled';
            if (ej2_base_2.isNullOrUndefined(this.documentHelper)) {
                throw new Error('Invalid operation.');
            }
            if (formatType === 'Docx' || formatType === 'Dotx' && this.wordExportModule) {
                if (this.wordExportModule) {
                    this.documentHelper.owner.sfdtExportModule.isWordExport = true;
                    this.wordExportModule.save(this.documentHelper, fileName, formatType);
                    this.documentHelper.owner.sfdtExportModule.isWordExport = false;
                }
            }
            else if (formatType === 'Txt' && this.textExportModule) {
                this.textExportModule.save(this.documentHelper, fileName);
            }
            else if (formatType === 'Sfdt' && this.enableSfdtExport && this.sfdtExportModule) {
                if (this.documentEditorSettings.optimizeSfdt) {
                    var jsonString = this.serialize();
                    var blob = new Blob([jsonString], {
                        type: 'application/json'
                    });
                    var archiveItem = new ej2_compression_1.ZipArchiveItem(blob, "sfdt");
                    var mArchive = new ej2_compression_1.ZipArchive();
                    mArchive.addItem(archiveItem);
                    mArchive.saveAsBlob().then(function (blob) {
                        _this.zipArchiveBlobToSfdtFile(blob, fileName);
                    });
                }
                else {
                    var jsonString = this.serialize();
                    var blob = new Blob([jsonString], {
                        type: 'application/json'
                    });
                    ej2_file_utils_1.Save.save(fileName + '.sfdt', blob);
                }
            }
            else {
                throw new Error('Invalid operation. Specified export is not enabled.');
            }
        };
        DocumentEditor.prototype.zipArchiveBlobToSfdtFile = function (blob, fileName) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function () {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(',')[1];
                var jsonString = {};
                jsonString.sfdt = base64;
                var blob = new Blob([JSON.stringify(jsonString)], {
                    type: 'application/json'
                });
                ej2_file_utils_1.Save.save(fileName + '.sfdt', blob);
            };
        };
        ;
        DocumentEditor.prototype.saveAsBlob = function (formatType) {
            var _this = this;
            if (ej2_base_2.isNullOrUndefined(this.viewer)) {
                throw new Error('Invalid operation');
            }
            return new Promise(function (resolve) {
                if ((formatType === 'Docx' || formatType === 'Dotx') && _this.wordExportModule) {
                    resolve(_this.wordExportModule.saveAsBlob(_this.documentHelper, formatType));
                }
                else if (formatType === 'Txt' && _this.textExportModule) {
                    resolve(_this.textExportModule.saveAsBlob(_this.documentHelper));
                }
                else if (formatType === 'Sfdt' && _this.enableSfdtExport && _this.sfdtExportModule) {
                    if (_this.documentEditorSettings.optimizeSfdt) {
                        _this.sfdtExportModule.saveAsBlob(_this.documentHelper).then(function (blob) {
                            _this.getBase64StringFromBlob(blob).then(function (base64) {
                                var jsonString = {};
                                jsonString.sfdt = base64;
                                var blob = new Blob([JSON.stringify(jsonString)], {
                                    type: 'application/json'
                                });
                                resolve(blob);
                            });
                        });
                    }
                    else {
                        resolve(_this.sfdtExportModule.saveAsBlobNonOptimized(_this.documentHelper));
                    }
                }
            });
        };
        DocumentEditor.prototype.getBase64StringFromBlob = function (blob) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function () {
                    var dataUrl = reader.result;
                    var base64 = dataUrl.split(',')[1];
                    resolve(base64);
                };
            });
        };
        DocumentEditor.prototype.openBlank = function () {
            var sections = [];
            sections.push(this.createNewBodyWidget());
            var hfs = this.parser.parseHeaderFooter({ header: {}, footer: {}, evenHeader: {}, evenFooter: {}, firstPageHeader: {}, firstPageFooter: {} }, undefined);
            if (this.viewer) {
                this.clearPreservedCollectionsInViewer();
                this.documentHelper.userCollection.push('Everyone');
                this.documentHelper.cachedPages = [];
                this.clearSpellCheck();
                this.documentHelper.setDefaultDocumentFormat();
                this.documentHelper.headersFooters.push(hfs);
                if (this.editorModule) {
                    this.editorModule.intializeDefaultStyles();
                    var style = this.documentHelper.styles.findByName('Normal');
                    for (var i = 0; i < sections.length; i++) {
                        var paragraph = sections[parseInt(i.toString(), 10)].childWidgets[0];
                        paragraph.paragraphFormat.baseStyle = style;
                        paragraph.paragraphFormat.listFormat.baseStyle = style;
                    }
                }
                this.documentHelper.onDocumentChanged(sections, {});
            }
        };
        DocumentEditor.prototype.getStyleNames = function (styleType) {
            if (this.viewer) {
                return this.documentHelper.styles.getStyleNames(styleType);
            }
            return [];
        };
        DocumentEditor.prototype.getStyles = function (styleType) {
            if (this.viewer) {
                return this.documentHelper.styles.getStyles(styleType);
            }
            return [];
        };
        DocumentEditor.prototype.getBookmarks = function () {
            var bookmarks = [];
            if (this.viewer) {
                bookmarks = this.documentHelper.getBookmarks(true);
            }
            return bookmarks;
        };
        DocumentEditor.prototype.showDialog = function (dialogType) {
            switch (dialogType) {
                case 'Hyperlink':
                    this.showHyperlinkDialog();
                    break;
                case 'Table':
                    this.showTableDialog();
                    break;
                case 'Bookmark':
                    this.showBookmarkDialog();
                    break;
                case 'TableOfContents':
                    this.showTableOfContentsDialog();
                    break;
                case 'PageSetup':
                    this.showPageSetupDialog();
                    break;
                case 'Columns':
                    this.showColumnsDialog();
                    break;
                case 'List':
                    this.showListDialog();
                    break;
                case 'Styles':
                    this.showStylesDialog();
                    break;
                case 'Style':
                    this.showStyleDialog();
                    break;
                case 'Paragraph':
                    this.showParagraphDialog();
                    break;
                case 'Font':
                    this.showFontDialog();
                    break;
                case 'TableProperties':
                    this.showTablePropertiesDialog();
                    break;
                case 'BordersAndShading':
                    this.showBordersAndShadingDialog();
                    break;
                case 'TableOptions':
                    this.showTableOptionsDialog();
                    break;
                case 'SpellCheck':
                    this.showSpellCheckDialog();
                    break;
            }
        };
        DocumentEditor.prototype.toggleShowHiddenMarksInternal = function () {
            this.documentEditorSettings.showHiddenMarks = !this.documentEditorSettings.showHiddenMarks;
            this.notify(constants_1.internalDocumentEditorSettingsChange, this.documentEditorSettings);
        };
        DocumentEditor.prototype.showOptionsPane = function () {
            if (!ej2_base_2.isNullOrUndefined(this.optionsPaneModule) && !ej2_base_2.isNullOrUndefined(this.viewer)) {
                this.optionsPaneModule.showHideOptionsPane(true);
            }
        };
        DocumentEditor.prototype.showRestrictEditingPane = function (show) {
            show = ej2_base_2.isNullOrUndefined(show) ? true : show;
            if (this.documentHelper && this.documentHelper.restrictEditingPane) {
                this.documentHelper.restrictEditingPane.showHideRestrictPane(show);
            }
        };
        DocumentEditor.prototype.showSpellCheckDialog = function () {
            if (this.spellCheckDialogModule && this.spellChecker) {
                var element = this.spellChecker.retriveText();
                if (!ej2_base_2.isNullOrUndefined(element)) {
                    this.spellCheckDialogModule.show(element.text, element.element);
                }
            }
        };
        DocumentEditor.prototype.showTabDialog = function () {
            if (this.tabDialogModule && !this.isReadOnlyMode && this.viewer) {
                this.tabDialogModule.show();
            }
        };
        DocumentEditor.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.destroyDependentModules();
            if (!ej2_base_2.isNullOrUndefined(this.documentHelper)) {
                this.documentHelper.destroy();
            }
            if (this.viewer) {
                this.viewer.componentDestroy();
            }
            this.viewer = undefined;
            if (!ej2_base_2.isNullOrUndefined(this.element)) {
                this.element.classList.remove('e-documenteditor');
                this.element.innerHTML = '';
            }
            if (!this.refreshing) {
                this.element = undefined;
            }
            if (this.parser) {
                this.parser.destroy();
                this.parser = undefined;
            }
            if (this.revisionsInternal) {
                this.revisionsInternal.destroy();
                this.revisionsInternal = undefined;
            }
            this.findResultsList = [];
            this.findResultsList = undefined;
            this.documentHelper = undefined;
        };
        DocumentEditor.prototype.updateStyle = function (styleInCollection, style) {
            if (!ej2_base_2.isNullOrUndefined(this.styleDialogModule)) {
                var type = style.type == 'Paragraph' ? !ej2_base_2.isNullOrUndefined(style.link) ? 'Linked Style' : 'Paragraph' : 'Character';
                styleInCollection.type = this.styleDialogModule.getTypeValue(type);
                styleInCollection.basedOn = style.basedOn;
                if (type === 'Paragraph' || type === 'Linked Style') {
                    styleInCollection.next = style.next;
                    styleInCollection.characterFormat.copyFormat(style.characterFormat);
                    var oldListId = styleInCollection.paragraphFormat.listFormat.listId;
                    styleInCollection.paragraphFormat.copyFormat(style.paragraphFormat);
                    styleInCollection.link = style.link;
                    if (!ej2_base_2.isNullOrUndefined(oldListId) && oldListId > -1) {
                        var list = this.documentHelper.getListById(oldListId);
                        if (!ej2_base_2.isNullOrUndefined(list)) {
                            this.documentHelper.lists.splice(this.documentHelper.lists.indexOf(list), 1);
                        }
                    }
                }
                else if (type === 'Character') {
                    styleInCollection.characterFormat.copyFormat(style.characterFormat);
                }
                styleInCollection.name = style.name;
            }
        };
        DocumentEditor.prototype.createNewBodyWidget = function () {
            var section = new index_3.BodyWidget();
            section.index = 0;
            section.sectionFormat = new index_4.WSectionFormat(section);
            if (this.sectionFormat) {
                this.parser.parseSectionFormat(0, this.sectionFormat, section.sectionFormat);
            }
            var paragraph = new index_3.ParagraphWidget();
            paragraph.index = 0;
            paragraph.paragraphFormat = new index_4.WParagraphFormat(paragraph);
            paragraph.characterFormat = new index_4.WCharacterFormat(paragraph);
            section.childWidgets.push(paragraph);
            paragraph.containerWidget = section;
            return section;
        };
        DocumentEditor.prototype.clearSpellCheck = function () {
            if (!ej2_base_2.isNullOrUndefined(this.spellChecker)) {
                if (!ej2_base_2.isNullOrUndefined(this.spellChecker.errorWordCollection)) {
                    this.spellChecker.errorWordCollection.clear();
                }
                if (!ej2_base_2.isNullOrUndefined(this.spellChecker.uniqueWordsCollection)) {
                    this.spellChecker.uniqueWordsCollection.clear();
                }
            }
        };
        DocumentEditor.prototype.getStyleData = function (name, listId) {
            if (!this.enableCollaborativeEditing) {
                return;
            }
            this.isSettingOp = true;
            var operation;
            if (!ej2_base_2.isNullOrUndefined(name) && !ej2_base_2.isNullOrUndefined(this.documentHelper.owner.sfdtExportModule)) {
                var style = this.documentHelper.styles.findByName(name);
                if (!ej2_base_2.isNullOrUndefined(style)) {
                    var keyIndex = this.documentHelper.owner.sfdtExportModule.keywordIndex;
                    this.documentHelper.owner.sfdtExportModule.keywordIndex = 1;
                    var styleData = this.documentHelper.owner.sfdtExportModule.writeStyle(style);
                    var styleObject = {
                        "optimizeSfdt": true,
                        "sty": [styleData]
                    };
                    if (this.editor.isLinkedStyle(style.name)) {
                        var linkedStyle = this.documentHelper.styles.findByName(style.name + ' Char');
                        var linkedStyleData = this.documentHelper.owner.sfdtExportModule.writeStyle(linkedStyle);
                        styleObject.sty.push(linkedStyleData);
                    }
                    if (!ej2_base_2.isNullOrUndefined(listId) && listId > -1) {
                        var list = this.documentHelper.getListById(listId);
                        styleObject[index_19.listsProperty[1]] = [];
                        styleObject[index_19.listsProperty[1]].push(this.sfdtExportModule.writeList(list));
                        styleObject[index_19.abstractListsProperty[1]] = [];
                        styleObject[index_19.abstractListsProperty[1]].push(this.sfdtExportModule.writeAbstractList(list.abstractList));
                    }
                    this.documentHelper.owner.sfdtExportModule.keywordIndex = keyIndex;
                    if (!ej2_base_2.isNullOrUndefined(style)) {
                        operation = {
                            action: 'Update',
                            styleData: JSON.stringify(styleObject)
                        };
                        this.documentSettingOps.push(operation);
                    }
                }
            }
            this.fireContentChange();
        };
        DocumentEditor.prototype.getSettingData = function (name, value, hashValue, saltValue, protectionType) {
            if (!this.enableCollaborativeEditing) {
                return;
            }
            this.isSettingOp = true;
            var protectionData;
            var operation;
            if (name === 'protection') {
                protectionData = {
                    saltValue: saltValue,
                    hashValue: hashValue,
                    protectionType: protectionType
                };
                operation = {
                    text: name,
                    protectionData: protectionData
                };
            }
            else {
                operation = {
                    text: name,
                    enableTrackChanges: value
                };
            }
            if (!this.skipSettingsOps) {
                this.documentSettingOps.push(operation);
                this.fireContentChange();
            }
            this.skipSettingsOps = false;
            this.isSettingOp = false;
        };
        DocumentEditor.prototype.destroyDependentModules = function () {
            if (this.printModule) {
                this.printModule.destroy();
                this.printModule = undefined;
            }
            if (this.sfdtExportModule) {
                this.sfdtExportModule.destroy();
                this.sfdtExportModule = undefined;
            }
            if (this.optionsPaneModule) {
                this.optionsPaneModule.destroy();
                this.optionsPaneModule = undefined;
            }
            if (this.commentReviewPane) {
                this.commentReviewPane.destroy();
                this.commentReviewPane = undefined;
            }
            if (this.trackChangesPane) {
                this.trackChangesPane.destroy();
                this.trackChangesPane = undefined;
            }
            if (!ej2_base_2.isNullOrUndefined(this.hyperlinkDialogModule)) {
                this.hyperlinkDialogModule.destroy();
                this.hyperlinkDialogModule = undefined;
            }
            if (this.searchModule) {
                this.searchModule.destroy();
                this.searchModule = undefined;
            }
            if (this.contextMenuModule) {
                this.contextMenuModule.componentDestroy();
                this.contextMenuModule = undefined;
            }
            if (this.editorModule) {
                this.editorModule.destroy();
                this.editorModule = undefined;
            }
            if (this.selectionModule) {
                this.selectionModule.destroy();
                this.selectionModule = undefined;
            }
            if (this.editorHistoryModule) {
                this.editorHistoryModule.destroy();
                this.editorHistoryModule = undefined;
            }
            if (!ej2_base_2.isNullOrUndefined(this.paragraphDialogModule)) {
                this.paragraphDialogModule.destroy();
                this.paragraphDialogModule = undefined;
            }
            if (this.tabDialogModule) {
                this.tabDialogModule.destroy();
                this.tabDialogModule = undefined;
            }
            if (this.pageSetupDialogModule) {
                this.pageSetupDialogModule.destroy();
                this.pageSetupDialogModule = undefined;
            }
            if (this.columnsDialogModule) {
                this.columnsDialogModule.destroy();
                this.columnsDialogModule = undefined;
            }
            if (this.footNotesDialogModule) {
                this.footNotesDialogModule.destroy();
                this.footNotesDialogModule = undefined;
            }
            if (this.fontDialogModule) {
                this.fontDialogModule.destroy();
                this.fontDialogModule = undefined;
            }
            if (this.listDialogModule) {
                this.listDialogModule.destroy();
                this.listDialogModule = undefined;
            }
            if (this.imageResizerModule) {
                this.imageResizerModule.destroy();
                this.imageResizerModule = undefined;
            }
            if (this.tablePropertiesDialogModule) {
                this.tablePropertiesDialogModule.destroy();
                this.tablePropertiesDialogModule = undefined;
            }
            if (this.bordersAndShadingDialogModule) {
                this.bordersAndShadingDialogModule.destroy();
                this.bordersAndShadingDialogModule = undefined;
            }
            if (this.cellOptionsDialogModule) {
                this.cellOptionsDialogModule.destroy();
                this.cellOptionsDialogModule = undefined;
            }
            if (this.tableOptionsDialogModule) {
                this.tableOptionsDialogModule.destroy();
                this.tableOptionsDialogModule = undefined;
            }
            if (this.tableDialogModule) {
                this.tableDialogModule.destroy();
                this.tableDialogModule = undefined;
            }
            if (this.bookmarkDialogModule) {
                this.bookmarkDialogModule.destroy();
                this.bookmarkDialogModule = undefined;
            }
            if (this.styleDialogModule) {
                this.styleDialogModule.destroy();
                this.styleDialogModule = undefined;
            }
            if (this.textExportModule) {
                this.textExportModule.destroy();
                this.textExportModule = undefined;
            }
            if (this.wordExportModule) {
                this.wordExportModule.destroy();
                this.wordExportModule = undefined;
            }
            if (this.tableOfContentsDialogModule) {
                this.tableOfContentsDialogModule.destroy();
                this.tableOfContentsDialogModule = undefined;
            }
            if (this.spellCheckerModule) {
                this.spellCheckerModule.destroy();
                this.spellCheckerModule = undefined;
            }
            if (this.checkBoxFormFieldDialogModule) {
                this.checkBoxFormFieldDialogModule.destroy();
                this.checkBoxFormFieldDialogModule = undefined;
            }
            if (this.dropDownFormFieldDialogModule) {
                this.dropDownFormFieldDialogModule.destroy();
                this.dropDownFormFieldDialogModule = undefined;
            }
            if (this.textFormFieldDialogModule) {
                this.textFormFieldDialogModule.destroy();
                this.textFormFieldDialogModule = undefined;
            }
            if (this.spellCheckDialogModule) {
                this.spellCheckDialogModule.destroy();
                this.spellCheckDialogModule = undefined;
            }
            if (this.stylesDialogModule) {
                this.stylesDialogModule.destroy();
                this.stylesDialogModule = undefined;
            }
            if (this.optimizedModule) {
                this.optimizedModule.destroy();
                this.optimizedModule = undefined;
            }
            if (this.regularModule) {
                this.regularModule.destroy();
                this.regularModule = undefined;
            }
        };
        return DocumentEditor;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableCollaborativeEditing", void 0);
    __decorate([
        ej2_base_1.Property('KeepSourceFormatting')
    ], DocumentEditor.prototype, "defaultPasteOption", void 0);
    __decorate([
        ej2_base_1.Property('Pages')
    ], DocumentEditor.prototype, "layoutType", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], DocumentEditor.prototype, "currentUser", void 0);
    __decorate([
        ej2_base_1.Property('#FFFF00')
    ], DocumentEditor.prototype, "userColor", void 0);
    __decorate([
        ej2_base_1.Property(20)
    ], DocumentEditor.prototype, "pageGap", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], DocumentEditor.prototype, "documentName", void 0);
    __decorate([
        ej2_base_1.Property('100%')
    ], DocumentEditor.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('200px')
    ], DocumentEditor.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], DocumentEditor.prototype, "serviceUrl", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], DocumentEditor.prototype, "zoomFactor", void 0);
    __decorate([
        ej2_base_1.Property(2000)
    ], DocumentEditor.prototype, "zIndex", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditor.prototype, "isReadOnly", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enablePrint", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableSelection", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableEditor", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableEditorHistory", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableSfdtExport", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableWordExport", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditor.prototype, "enableAutoFocus", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableTextExport", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableOptionsPane", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableContextMenu", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableHyperlinkDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableBookmarkDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableTableOfContentsDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableSearch", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableParagraphDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableListDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableTablePropertiesDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableBordersAndShadingDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableFootnoteAndEndnoteDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableColumnsDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enablePageSetupDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableStyleDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableFontDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableTableOptionsDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableTableDialog", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableImageResizer", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableSpellCheck", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableComment", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableTrackChanges", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditor.prototype, "enableFormField", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "acceptTab", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DocumentEditor.prototype, "useCtrlClickToFollowHyperlink", void 0);
    __decorate([
        ej2_base_1.Property('#000000')
    ], DocumentEditor.prototype, "pageOutline", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableCursorOnReadOnly", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableLocalPaste", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "enableLockAndEdit", void 0);
    __decorate([
        ej2_base_1.Complex({}, DocumentEditorSettings)
    ], DocumentEditor.prototype, "documentEditorSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, DocumentSettings)
    ], DocumentEditor.prototype, "documentSettings", void 0);
    __decorate([
        ej2_base_1.Property({ systemClipboard: 'SystemClipboard', spellCheck: 'SpellCheck', restrictEditing: 'RestrictEditing', canLock: 'CanLock', getPendingActions: 'GetPendingActions' })
    ], DocumentEditor.prototype, "serverActionSettings", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], DocumentEditor.prototype, "headers", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "showComments", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "showRevisions", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DocumentEditor.prototype, "autoResizeOnVisibilityChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "documentChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "viewChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "zoomFactorChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "selectionChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "requestNavigate", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "contentChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "keyDown", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "searchResultsChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "created", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "destroyed", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "customContextMenuSelect", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "customContextMenuBeforeOpen", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "beforePaneSwitch", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "commentBegin", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "commentEnd", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "beforeFileOpen", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "commentDelete", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "beforeAcceptRejectChanges", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "beforeCommentAction", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "trackChange", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "beforeFormFieldFill", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "serviceFailure", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "afterFormFieldFill", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "actionComplete", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "contentControl", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DocumentEditor.prototype, "beforeXmlHttpRequestSend", void 0);
    DocumentEditor = DocumentEditor_1 = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], DocumentEditor);
    exports.DocumentEditor = DocumentEditor;
    var ServerActionSettings = (function (_super) {
        __extends(ServerActionSettings, _super);
        function ServerActionSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ServerActionSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('SystemClipboard')
    ], ServerActionSettings.prototype, "systemClipboard", void 0);
    __decorate([
        ej2_base_1.Property('SpellCheck')
    ], ServerActionSettings.prototype, "spellCheck", void 0);
    __decorate([
        ej2_base_1.Property('RestrictEditing')
    ], ServerActionSettings.prototype, "restrictEditing", void 0);
    __decorate([
        ej2_base_1.Property('CanLock')
    ], ServerActionSettings.prototype, "canLock", void 0);
    __decorate([
        ej2_base_1.Property('GetPendingActions')
    ], ServerActionSettings.prototype, "getPendingActions", void 0);
    exports.ServerActionSettings = ServerActionSettings;
    var FormFieldSettings = (function (_super) {
        __extends(FormFieldSettings, _super);
        function FormFieldSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FormFieldSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('#cfcfcf')
    ], FormFieldSettings.prototype, "shadingColor", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], FormFieldSettings.prototype, "applyShading", void 0);
    __decorate([
        ej2_base_1.Property('#cccccc')
    ], FormFieldSettings.prototype, "selectionColor", void 0);
    __decorate([
        ej2_base_1.Property('Popup')
    ], FormFieldSettings.prototype, "formFillingMode", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], FormFieldSettings.prototype, "formattingExceptions", void 0);
    exports.FormFieldSettings = FormFieldSettings;
    var CollaborativeEditingSettings = (function (_super) {
        __extends(CollaborativeEditingSettings, _super);
        function CollaborativeEditingSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CollaborativeEditingSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], CollaborativeEditingSettings.prototype, "roomName", void 0);
    __decorate([
        ej2_base_1.Property('#22b24b')
    ], CollaborativeEditingSettings.prototype, "editableRegionColor", void 0);
    __decorate([
        ej2_base_1.Property('#f44336')
    ], CollaborativeEditingSettings.prototype, "lockedRegionColor", void 0);
    __decorate([
        ej2_base_1.Property(3000)
    ], CollaborativeEditingSettings.prototype, "saveTimeout", void 0);
    exports.CollaborativeEditingSettings = CollaborativeEditingSettings;
    var ContainerServerActionSettings = (function (_super) {
        __extends(ContainerServerActionSettings, _super);
        function ContainerServerActionSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ContainerServerActionSettings;
    }(ServerActionSettings));
    __decorate([
        ej2_base_1.Property('Import')
    ], ContainerServerActionSettings.prototype, "import", void 0);
    exports.ContainerServerActionSettings = ContainerServerActionSettings;
    var DocumentEditor_1;
});
