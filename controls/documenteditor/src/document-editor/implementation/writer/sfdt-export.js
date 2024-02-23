define(["require", "exports", "../format/paragraph-format", "../format/index", "../viewer/page", "../viewer/page", "@syncfusion/ej2-base", "../editor/editor-helper", "@syncfusion/ej2-compression", "../../index"], function (require, exports, paragraph_format_1, index_1, page_1, page_2, ej2_base_1, editor_helper_1, ej2_compression_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SfdtExport = (function () {
        function SfdtExport(documentHelper) {
            this.startLine = undefined;
            this.endLine = undefined;
            this.endOffset = undefined;
            this.endCell = undefined;
            this.startColumnIndex = undefined;
            this.endColumnIndex = undefined;
            this.lists = undefined;
            this.document = undefined;
            this.writeInlineStyles = undefined;
            this.blockContent = false;
            this.startContent = false;
            this.multipleLineContent = false;
            this.nestedContent = false;
            this.editRangeId = -1;
            this.selectedCommentsId = [];
            this.selectedRevisionId = [];
            this.nestedBlockContent = false;
            this.nestedBlockEnabled = false;
            this.blocks = [];
            this.contentInline = [];
            this.isContentControl = false;
            this.isBlockClosed = true;
            this.isWriteInlinesFootNote = false;
            this.isWriteEndFootNote = false;
            this.iscommentInsert = true;
            this.keywordIndex = undefined;
            this.isExport = true;
            this.isWordExport = false;
            this.isPartialExport = false;
            this.checkboxOrDropdown = false;
            this.copyWithTrackChange = false;
            this.documentHelper = documentHelper;
        }
        Object.defineProperty(SfdtExport.prototype, "viewer", {
            get: function () {
                return this.documentHelper.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SfdtExport.prototype, "owner", {
            get: function () {
                return this.documentHelper.owner;
            },
            enumerable: true,
            configurable: true
        });
        SfdtExport.prototype.getModuleName = function () {
            return 'SfdtExport';
        };
        SfdtExport.prototype.clear = function () {
            this.writeInlineStyles = undefined;
            this.startLine = undefined;
            this.endLine = undefined;
            this.lists = undefined;
            this.document = undefined;
            this.endCell = undefined;
            this.startColumnIndex = undefined;
            this.endColumnIndex = undefined;
            this.selectedCommentsId = [];
            this.selectedRevisionId = [];
            this.startBlock = undefined;
            this.endBlock = undefined;
            this.isPartialExport = false;
            this.keywordIndex = undefined;
        };
        SfdtExport.prototype.serialize = function () {
            return this.seralizeInternal(this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0);
        };
        SfdtExport.prototype.seralizeInternal = function (index) {
            return JSON.stringify(this.write(index));
        };
        SfdtExport.prototype.saveAsBlobNonOptimized = function (documentHelper) {
            var sfdt = new Blob([this.serialize()], { type: 'text/plain' });
            return new Promise(function (resolve, reject) {
                resolve(sfdt);
            });
        };
        SfdtExport.prototype.saveAsBlob = function (documentHelper) {
            var jsonString = this.serialize();
            var blob = new Blob([jsonString], {
                type: 'application/json'
            });
            var archiveItem = new ej2_compression_1.ZipArchiveItem(blob, "sfdt");
            var mArchive = new ej2_compression_1.ZipArchive();
            mArchive.addItem(archiveItem);
            return mArchive.saveAsBlob();
        };
        SfdtExport.prototype.updateEditRangeId = function () {
            var index = -1;
            for (var i = 0; i < this.documentHelper.editRanges.keys.length; i++) {
                var keys = this.documentHelper.editRanges.keys;
                for (var j = 0; j < keys[i].length; j++) {
                    var editRangeStart = this.documentHelper.editRanges.get(keys[i]);
                    for (var z = 0; z < editRangeStart.length; z++) {
                        index++;
                        editRangeStart[z].editRangeId = index;
                        editRangeStart[z].editRangeEnd.editRangeId = index;
                    }
                }
            }
        };
        SfdtExport.prototype.write = function (index, line, startOffset, endLine, endOffset, writeInlineStyles, isExport) {
            if (writeInlineStyles) {
                this.writeInlineStyles = true;
            }
            if (!ej2_base_1.isNullOrUndefined(index)) {
                this.keywordIndex = index;
            }
            else {
                this.keywordIndex = this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0;
            }
            this.Initialize();
            this.updateEditRangeId();
            if (line instanceof page_1.LineWidget && endLine instanceof page_1.LineWidget) {
                this.isExport = false;
                if (!ej2_base_1.isNullOrUndefined(isExport)) {
                    this.isExport = isExport;
                }
                var startPara = line.paragraph;
                var endPara = endLine.paragraph;
                if (this.isPartialExport) {
                    this.startBlock = this.getParentBlock(startPara);
                    this.endBlock = this.getParentBlock(endPara);
                }
                var startCell = startPara.associatedCell;
                var endCell = endPara.associatedCell;
                var bodyWidget = startPara.bodyWidget;
                var section = this.createSection(line.paragraph.bodyWidget);
                this.document[index_2.sectionsProperty[this.keywordIndex]].push(section);
                var selectionStartCell = startCell;
                var selectionEndCell = endCell;
                if (startCell instanceof page_1.TableCellWidget) {
                    selectionStartCell = this.getParentCell(selectionStartCell);
                }
                if (endCell instanceof page_1.TableCellWidget) {
                    selectionEndCell = this.getParentCell(selectionEndCell);
                }
                var isSameCell = selectionStartCell instanceof page_1.TableCellWidget && selectionEndCell instanceof page_1.TableCellWidget
                    && selectionStartCell.equals(selectionEndCell);
                if (isSameCell || ej2_base_1.isNullOrUndefined(endCell)) {
                    this.startLine = line;
                    this.endLine = endLine;
                    this.endOffset = endOffset;
                }
                else {
                    if (startCell instanceof page_1.TableCellWidget) {
                        var startTable = startCell.getContainerTable();
                        var endTable = endCell.getContainerTable();
                        if (startTable.tableFormat === endTable.tableFormat) {
                            this.endCell = endCell;
                            if (this.endCell.ownerTable !== startCell.ownerTable && startCell.ownerTable.associatedCell
                                && startCell.ownerTable.associatedCell.ownerTable === this.endCell.ownerTable &&
                                (startCell.ownerTable.associatedCell.childWidgets.indexOf(startCell.ownerTable) === 0)) {
                                startCell = startCell.ownerTable.associatedCell;
                            }
                            this.endColumnIndex = this.endCell.columnIndex + this.endCell.cellFormat.columnSpan;
                            this.startColumnIndex = startCell.columnIndex;
                        }
                    }
                    else {
                        this.endCell = endCell;
                    }
                }
                var nextBlock = void 0;
                if ((isSameCell && !this.isPartialExport) || ej2_base_1.isNullOrUndefined(startCell)) {
                    var paragraph = this.createParagraph(line.paragraph);
                    section[index_2.blocksProperty[this.keywordIndex]].push(paragraph);
                    var lastBlock = line.paragraph;
                    nextBlock = this.writeParagraph(line.paragraph, paragraph, section[index_2.blocksProperty[this.keywordIndex]], line.indexInOwner, startOffset);
                    if (this.isPartialExport) {
                        nextBlock = this.getNextBlock(nextBlock, lastBlock);
                        section = this.document[index_2.sectionsProperty[this.keywordIndex]][this.document[index_2.sectionsProperty[this.keywordIndex]].length - 1];
                    }
                    while (nextBlock) {
                        lastBlock = nextBlock;
                        nextBlock = this.writeBlock(nextBlock, 0, section[index_2.blocksProperty[this.keywordIndex]]);
                        if (this.isPartialExport && ej2_base_1.isNullOrUndefined(nextBlock)) {
                            nextBlock = this.getNextBlock(nextBlock, lastBlock);
                            section = this.document[index_2.sectionsProperty[this.keywordIndex]][this.document[index_2.sectionsProperty[this.keywordIndex]].length - 1];
                        }
                    }
                }
                else {
                    if (ej2_base_1.isNullOrUndefined(endCell) && startCell.ownerTable.associatedCell) {
                        var startTable = startCell.getContainerTable();
                        var lastRow = startTable.childWidgets[startTable.childWidgets.length - 1];
                        var endCell_1 = lastRow.childWidgets[lastRow.childWidgets.length - 1];
                        if (endCell_1.ownerTable !== startCell.ownerTable && startCell.ownerTable.associatedCell
                            && (startCell.ownerTable.associatedCell.childWidgets.indexOf(startCell.ownerTable) === 0)) {
                            while (startCell.ownerTable !== endCell_1.ownerTable) {
                                startCell = startCell.ownerTable.associatedCell;
                            }
                        }
                        this.endColumnIndex = endCell_1.columnIndex + endCell_1.cellFormat.columnSpan;
                        this.startColumnIndex = startCell.columnIndex;
                    }
                    var table = this.createTable(startCell.ownerTable);
                    section[index_2.blocksProperty[this.keywordIndex]].push(table);
                    var lastBlock = startCell.ownerTable;
                    nextBlock = this.writeTable(startCell.ownerTable, table, startCell.ownerRow.indexInOwner, section[index_2.blocksProperty[this.keywordIndex]]);
                    if (this.isPartialExport) {
                        nextBlock = this.getNextBlock(nextBlock, lastBlock);
                        section = this.document[index_2.sectionsProperty[this.keywordIndex]][this.document[index_2.sectionsProperty[this.keywordIndex]].length - 1];
                    }
                    while (nextBlock) {
                        lastBlock = nextBlock;
                        nextBlock = this.writeBlock(nextBlock, 0, section[index_2.blocksProperty[this.keywordIndex]]);
                        if (this.isPartialExport) {
                            nextBlock = this.getNextBlock(nextBlock, lastBlock);
                            section = this.document[index_2.sectionsProperty[this.keywordIndex]][this.document[index_2.sectionsProperty[this.keywordIndex]].length - 1];
                        }
                    }
                }
            }
            else {
                this.isExport = true;
                if (this.documentHelper.pages.length > 0) {
                    var page = this.documentHelper.pages[0];
                    this.writePage(page);
                }
            }
            this.document[index_2.backgroundProperty[this.keywordIndex]] = (_a = {}, _a[index_2.colorProperty[this.keywordIndex]] = this.documentHelper.backgroundColor, _a);
            this.writeStyles(this.documentHelper);
            this.writeLists(this.documentHelper);
            this.writeComments(this.documentHelper);
            this.writeRevisions(this.documentHelper);
            this.writeCustomXml(this.documentHelper);
            this.writeImages(this.documentHelper);
            this.footnotes(this.documentHelper);
            this.endnotes(this.documentHelper);
            var doc = this.document;
            this.clear();
            return doc;
            var _a;
        };
        SfdtExport.prototype.getNextBlock = function (nextBlock, lastBlock) {
            if (ej2_base_1.isNullOrUndefined(nextBlock) && this.isPartialExport && this.endBlock
                && !this.endBlock.equals(lastBlock)) {
                nextBlock = lastBlock.getSplitWidgets().pop().nextRenderedWidget;
                if (nextBlock && lastBlock.bodyWidget.index !== nextBlock.bodyWidget.index) {
                    var section = this.createSection(nextBlock.bodyWidget);
                    this.document[index_2.sectionsProperty[this.keywordIndex]].push(section);
                }
                else {
                    nextBlock = undefined;
                }
            }
            return nextBlock;
        };
        SfdtExport.prototype.Initialize = function () {
            this.lists = [];
            this.document = {};
            this.document.optimizeSfdt = this.owner.documentEditorSettings.optimizeSfdt;
            this.document[index_2.sectionsProperty[this.keywordIndex]] = [];
            this.document[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(this.documentHelper.characterFormat);
            this.document[index_2.paragraphFormatProperty[this.keywordIndex]] = this.writeParagraphFormat(this.documentHelper.paragraphFormat);
            this.document[index_2.themeFontLanguagesProperty[this.keywordIndex]] = this.writeCharacterFormat(this.documentHelper.themeFontLanguage);
            this.document[index_2.defaultTabWidthProperty[this.keywordIndex]] = this.documentHelper.defaultTabWidth;
            this.document[index_2.trackChangesProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(this.owner.enableTrackChanges, this.keywordIndex);
            this.document[index_2.enforcementProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(this.documentHelper.isDocumentProtected, this.keywordIndex);
            this.document[index_2.hashValueProperty[this.keywordIndex]] = this.documentHelper.hashValue;
            this.document[index_2.saltValueProperty[this.keywordIndex]] = this.documentHelper.saltValue;
            this.document[index_2.formattingProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(this.documentHelper.restrictFormatting, this.keywordIndex);
            this.document[index_2.protectionTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getProtectionTypeEnumValue(this.documentHelper.protectionType) : this.documentHelper.protectionType;
            this.document[index_2.doNotUseHTMLParagraphAutoSpacingProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(this.documentHelper.dontUseHtmlParagraphAutoSpacing, this.keywordIndex);
            this.document[index_2.formFieldShadingProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(this.documentHelper.owner.documentEditorSettings.formFieldSettings.applyShading, this.keywordIndex);
            this.document[index_2.compatibilityModeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getCompatibilityModeEnumValue(this.documentHelper.compatibilityMode) : this.documentHelper.compatibilityMode;
            this.document[index_2.allowSpaceOfSameStyleInTableProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(this.documentHelper.allowSpaceOfSameStyleInTable, this.keywordIndex);
            if (this.documentHelper.hasThemes) {
                this.document[index_2.themesProperty[this.keywordIndex]] = this.writeThemes(this.documentHelper.themes);
            }
        };
        SfdtExport.prototype.writePage = function (page) {
            if (page.bodyWidgets.length > 0) {
                var nextBlock = page.bodyWidgets[0];
                do {
                    nextBlock = this.writeBodyWidget(nextBlock, 0);
                } while (!ej2_base_1.isNullOrUndefined(nextBlock));
            }
            return this.document;
        };
        SfdtExport.prototype.writeBodyWidget = function (bodyWidget, index) {
            if (!(bodyWidget instanceof page_1.BodyWidget)) {
                return undefined;
            }
            var section = this.createSection(bodyWidget);
            this.document[index_2.sectionsProperty[this.keywordIndex]].push(section);
            this.writeHeaderFooters(this.documentHelper.headersFooters[bodyWidget.index], section);
            var firstBlock = bodyWidget.childWidgets[index];
            if (ej2_base_1.isNullOrUndefined(firstBlock) && bodyWidget.nextRenderedWidget) {
                firstBlock = bodyWidget.nextRenderedWidget.childWidgets[index];
            }
            do {
                firstBlock = this.writeBlock(firstBlock, 0, section[index_2.blocksProperty[this.keywordIndex]]);
            } while (firstBlock);
            var next = bodyWidget;
            do {
                bodyWidget = next;
                next = next.nextRenderedWidget;
                if (ej2_base_1.isNullOrUndefined(next) && !ej2_base_1.isNullOrUndefined(bodyWidget.page.nextPage) && !ej2_base_1.isNullOrUndefined(bodyWidget.page.nextPage)) {
                    next = bodyWidget.page.nextPage.bodyWidgets[0];
                }
            } while (next instanceof page_1.BodyWidget && next.index === bodyWidget.index);
            var islastEmptyParagraph;
            if (!ej2_base_1.isNullOrUndefined(bodyWidget.lastChild) && bodyWidget.lastChild instanceof page_1.ParagraphWidget) {
                islastEmptyParagraph = bodyWidget.lastChild.isEmpty();
                if (bodyWidget.lastChild.isSectionBreak && !ej2_base_1.isNullOrUndefined(bodyWidget.lastChild.previousRenderedWidget) && bodyWidget.lastChild.previousRenderedWidget instanceof page_1.TableWidget) {
                    islastEmptyParagraph = false;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(next) && next instanceof page_1.BodyWidget && bodyWidget.sectionIndex !== next.sectionIndex && islastEmptyParagraph && !this.isWordExport) {
                var paragraph = {};
                paragraph[index_2.inlinesProperty[this.keywordIndex]] = [];
                section[index_2.blocksProperty[this.keywordIndex]].push(paragraph);
            }
            return next;
        };
        SfdtExport.prototype.writeHeaderFooters = function (hfs, section) {
            if (ej2_base_1.isNullOrUndefined(hfs)) {
                return;
            }
            var headersFooters = section[index_2.headersFootersProperty[this.keywordIndex]];
            if (!(ej2_base_1.isNullOrUndefined(hfs[0]) || hfs[0].isEmpty)) {
                headersFooters[index_2.headerProperty[this.keywordIndex]] = this.writeHeaderFooter(hfs[0]);
                if (JSON.stringify(headersFooters[index_2.headerProperty[this.keywordIndex]]) == "{}") {
                    delete headersFooters[index_2.headerProperty[this.keywordIndex]];
                }
            }
            if (!(ej2_base_1.isNullOrUndefined(hfs[1]) || hfs[1].isEmpty)) {
                headersFooters[index_2.footerProperty[this.keywordIndex]] = this.writeHeaderFooter(hfs[1]);
                if (JSON.stringify(headersFooters[index_2.footerProperty[this.keywordIndex]]) == "{}") {
                    delete headersFooters[index_2.footerProperty[this.keywordIndex]];
                }
            }
            if (!(ej2_base_1.isNullOrUndefined(hfs[2]) || hfs[2].isEmpty)) {
                headersFooters[index_2.evenHeaderProperty[this.keywordIndex]] = this.writeHeaderFooter(hfs[2]);
                if (JSON.stringify(headersFooters[index_2.evenHeaderProperty[this.keywordIndex]]) == "{}") {
                    delete headersFooters[index_2.evenHeaderProperty[this.keywordIndex]];
                }
            }
            if (!(ej2_base_1.isNullOrUndefined(hfs[3]) || hfs[3].isEmpty)) {
                headersFooters[index_2.evenFooterProperty[this.keywordIndex]] = this.writeHeaderFooter(hfs[3]);
                if (JSON.stringify(headersFooters[index_2.evenFooterProperty[this.keywordIndex]]) == "{}") {
                    delete headersFooters[index_2.evenFooterProperty[this.keywordIndex]];
                }
            }
            if (!(ej2_base_1.isNullOrUndefined(hfs[4]) || hfs[4].isEmpty)) {
                headersFooters[index_2.firstPageHeaderProperty[this.keywordIndex]] = this.writeHeaderFooter(hfs[4]);
                if (JSON.stringify(headersFooters[index_2.firstPageHeaderProperty[this.keywordIndex]]) == "{}") {
                    delete headersFooters[index_2.firstPageHeaderProperty[this.keywordIndex]];
                }
            }
            if (!(ej2_base_1.isNullOrUndefined(hfs[5]) || hfs[5].isEmpty)) {
                headersFooters[index_2.firstPageFooterProperty[this.keywordIndex]] = this.writeHeaderFooter(hfs[5]);
                if (JSON.stringify(headersFooters[index_2.firstPageFooterProperty[this.keywordIndex]]) == "{}") {
                    delete headersFooters[index_2.firstPageFooterProperty[this.keywordIndex]];
                }
            }
        };
        SfdtExport.prototype.writeHeaderFooter = function (widget) {
            if (ej2_base_1.isNullOrUndefined(widget) || widget.isEmpty) {
                return undefined;
            }
            var headerFooter = {};
            if (widget && widget.childWidgets && widget.childWidgets.length > 0) {
                headerFooter[index_2.blocksProperty[this.keywordIndex]] = [];
                var firstBlock = widget.firstChild;
                do {
                    firstBlock = this.writeBlock(firstBlock, 0, headerFooter[index_2.blocksProperty[this.keywordIndex]]);
                } while (firstBlock);
            }
            return headerFooter;
        };
        SfdtExport.prototype.createSection = function (bodyWidget) {
            var section = {};
            section[index_2.sectionFormatProperty[this.keywordIndex]] = {};
            section[index_2.sectionFormatProperty[this.keywordIndex]] = this.writeSectionFormat(bodyWidget.sectionFormat, section[index_2.sectionFormatProperty[this.keywordIndex]], this.keywordIndex);
            section[index_2.blocksProperty[this.keywordIndex]] = [];
            section[index_2.headersFootersProperty[this.keywordIndex]] = {};
            return section;
        };
        SfdtExport.prototype.writeSectionFormat = function (sectionFormat, section, keywordIndex) {
            section[index_2.pageWidthProperty[keywordIndex]] = sectionFormat.pageWidth;
            section[index_2.pageHeightProperty[keywordIndex]] = sectionFormat.pageHeight;
            section[index_2.leftMarginProperty[keywordIndex]] = sectionFormat.leftMargin;
            section[index_2.rightMarginProperty[keywordIndex]] = sectionFormat.rightMargin;
            section[index_2.topMarginProperty[keywordIndex]] = sectionFormat.topMargin;
            section[index_2.bottomMarginProperty[keywordIndex]] = sectionFormat.bottomMargin;
            section[index_2.headerDistanceProperty[keywordIndex]] = sectionFormat.headerDistance;
            section[index_2.footerDistanceProperty[keywordIndex]] = sectionFormat.footerDistance;
            section[index_2.differentFirstPageProperty[keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(sectionFormat.differentFirstPage, keywordIndex);
            section[index_2.differentOddAndEvenPagesProperty[keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(sectionFormat.differentOddAndEvenPages, keywordIndex);
            section[index_2.bidiProperty[keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(sectionFormat.bidi, keywordIndex);
            if (!ej2_base_1.isNullOrUndefined(sectionFormat.breakCode)) {
                section[index_2.breakCodeProperty[keywordIndex]] = sectionFormat.breakCode;
            }
            if (sectionFormat.restartPageNumbering) {
                section[index_2.restartPageNumberingProperty[keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(sectionFormat.restartPageNumbering, keywordIndex);
                section[index_2.pageStartingNumberProperty[keywordIndex]] = sectionFormat.pageStartingNumber;
            }
            section[index_2.endnoteNumberFormatProperty[keywordIndex]] = keywordIndex == 1 ? this.getFootEndNoteNumberFormatEnumValue(sectionFormat.endnoteNumberFormat) : sectionFormat.endnoteNumberFormat;
            section[index_2.footNoteNumberFormatProperty[keywordIndex]] = keywordIndex == 1 ? this.getFootEndNoteNumberFormatEnumValue(sectionFormat.footNoteNumberFormat) : sectionFormat.footNoteNumberFormat;
            section[index_2.restartIndexForFootnotesProperty[keywordIndex]] = keywordIndex == 1 ? this.getFootnoteRestartIndexEnumValue(sectionFormat.restartIndexForFootnotes) : sectionFormat.restartIndexForFootnotes;
            section[index_2.restartIndexForEndnotesProperty[keywordIndex]] = keywordIndex == 1 ? this.getFootnoteRestartIndexEnumValue(sectionFormat.restartIndexForEndnotes) : sectionFormat.restartIndexForEndnotes;
            section[index_2.initialFootNoteNumberProperty[keywordIndex]] = sectionFormat.initialFootNoteNumber;
            section[index_2.initialEndNoteNumberProperty[keywordIndex]] = sectionFormat.initialEndNoteNumber;
            if (!ej2_base_1.isNullOrUndefined(sectionFormat.pageNumberStyle)) {
                section[index_2.pageNumberStyleProperty[keywordIndex]] = sectionFormat.pageNumberStyle;
            }
            if (!ej2_base_1.isNullOrUndefined(sectionFormat.columns) && !ej2_base_1.isNullOrUndefined(sectionFormat.numberOfColumns && sectionFormat.numberOfColumns > 1)) {
                var cols = sectionFormat.columns;
                section[index_2.numberOfColumnsProperty[keywordIndex]] = sectionFormat.numberOfColumns;
                section[index_2.equalWidthProperty[keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(sectionFormat.equalWidth, keywordIndex);
                section[index_2.lineBetweenColumnsProperty[keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(sectionFormat.lineBetweenColumns, keywordIndex);
                section[index_2.columnsProperty[keywordIndex]] = [];
                for (var i = 0; i < cols.length; i++) {
                    var newCol = {};
                    newCol[index_2.widthProperty[keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(cols[i].width);
                    newCol[index_2.spaceProperty[keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(cols[i].space);
                    section[index_2.columnsProperty[keywordIndex]].push(newCol);
                }
            }
            return section;
        };
        SfdtExport.prototype.writeBlock = function (widget, index, blocks) {
            if (!(widget instanceof page_2.BlockWidget)) {
                return undefined;
            }
            if (widget instanceof page_1.ParagraphWidget) {
                if (widget.hasOwnProperty('contentControlProperties') && widget.contentControlProperties.type !== 'BuildingBlockGallery') {
                    var block = this.blockContentControl(widget);
                    this.blockContent = false;
                    if (!ej2_base_1.isNullOrUndefined(block) && (this.isBlockClosed || !this.nestedBlockContent)) {
                        this.nestedBlockEnabled = false;
                        blocks.push(block);
                        this.blocks = [];
                    }
                    return this.nextBlock;
                }
                else {
                    var paragraph = this.createParagraph(widget);
                    blocks.push(paragraph);
                    return this.writeParagraph(widget, paragraph, blocks);
                }
            }
            else {
                var tableWidget = widget;
                if (tableWidget.hasOwnProperty('contentControlProperties') && tableWidget.contentControlProperties.type !== 'BuildingBlockGallery') {
                    var block = this.tableContentControl(tableWidget);
                    if (!ej2_base_1.isNullOrUndefined(block) && this.isBlockClosed) {
                        blocks.push(block);
                    }
                    return this.nextBlock;
                }
                var table = this.createTable(tableWidget);
                blocks.push(table);
                return this.writeTable(tableWidget, table, 0, blocks);
            }
        };
        SfdtExport.prototype.writeParagraphs = function (widget) {
            var blocks = this.blocks;
            var child = widget.childWidgets[0];
            var firstElement = child.children[0];
            var secondElement = child.children[1];
            if (firstElement instanceof page_1.ListTextElementBox || secondElement instanceof page_1.ListTextElementBox) {
                firstElement = child.children[2];
                secondElement = child.children[3];
            }
            if (!ej2_base_1.isNullOrUndefined(widget.contentControlProperties)
                && widget.containerWidget instanceof page_1.TableCellWidget
                && !ej2_base_1.isNullOrUndefined(widget.containerWidget.containerWidget)
                && !ej2_base_1.isNullOrUndefined(widget.containerWidget.containerWidget.containerWidget.contentControlProperties)) {
                blocks = [];
            }
            if (this.nestedBlockEnabled) {
                blocks = [];
            }
            if ((firstElement instanceof page_1.ContentControl && secondElement instanceof page_1.ContentControl && !this.nestedBlockContent) || (this.blockContent && firstElement instanceof page_1.ContentControl && !this.nestedBlockContent)) {
                var nestedBlocks = false;
                if (secondElement instanceof page_1.ContentControl) {
                    if (secondElement.contentControlWidgetType === 'Block') {
                        nestedBlocks = true;
                    }
                }
                if ((nestedBlocks || (this.blockContent && firstElement instanceof page_1.ContentControl && !this.nestedBlockContent && firstElement.type === 0 && secondElement instanceof page_1.ContentControl && firstElement.contentControlWidgetType === 'Block'))) {
                    this.nestedBlockContent = true;
                    this.nestedBlockEnabled = true;
                    var block = this.blockContentControl(widget);
                    if (!ej2_base_1.isNullOrUndefined(block)) {
                        this.blocks.push(block);
                    }
                }
                else {
                    var paragraph = this.createParagraph(widget);
                    blocks.push(paragraph);
                    this.nextBlock = this.writeParagraph(widget, paragraph, blocks);
                }
            }
            else {
                var paragraph = this.createParagraph(widget);
                blocks.push(paragraph);
                this.nextBlock = this.writeParagraph(widget, paragraph, blocks);
            }
            if (!this.nestedBlockContent && this.nestedBlockEnabled) {
                this.nestedBlockEnabled = false;
            }
            return blocks;
        };
        SfdtExport.prototype.contentControlProperty = function (contentControlPropertie) {
            var contentControlProperties = {};
            var contentControlListItems = [];
            contentControlProperties[index_2.lockContentControlProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.lockContentControl, this.keywordIndex);
            contentControlProperties[index_2.lockContentsProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.lockContents, this.keywordIndex);
            contentControlProperties[index_2.tagProperty[this.keywordIndex]] = contentControlPropertie.tag;
            contentControlProperties[index_2.colorProperty[this.keywordIndex]] = contentControlPropertie.color;
            contentControlProperties[index_2.titleProperty[this.keywordIndex]] = contentControlPropertie.title;
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.appearance)) {
                contentControlProperties[index_2.appearanceProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getContentControlAppearanceEnumValue(contentControlPropertie.appearance) : contentControlPropertie.appearance;
            }
            contentControlProperties[index_2.typeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getContentControlTypeEnumValue(contentControlPropertie.type) : contentControlPropertie.type;
            contentControlProperties[index_2.hasPlaceHolderTextProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.hasPlaceHolderText, this.keywordIndex);
            contentControlProperties[index_2.multiLineProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.multiline, this.keywordIndex);
            contentControlProperties[index_2.isTemporaryProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.isTemporary, this.keywordIndex);
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.isChecked)) {
                contentControlProperties[index_2.isCheckedProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.isChecked, this.keywordIndex);
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.uncheckedState)) {
                contentControlProperties[index_2.uncheckedStateProperty[this.keywordIndex]] = this.tounCheckedState(contentControlPropertie.uncheckedState);
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.checkedState)) {
                contentControlProperties[index_2.checkedStateProperty[this.keywordIndex]] = this.toCheckedState(contentControlPropertie.checkedState);
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.dateCalendarType)) {
                contentControlProperties[index_2.dateCalendarTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getDateCalendarTypeEnumValue(contentControlPropertie.dateCalendarType) : contentControlPropertie.dateCalendarType;
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.dateStorageFormat)) {
                contentControlProperties[index_2.dateStorageFormatProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getDateStorageFormatEnumValue(contentControlPropertie.dateStorageFormat) : contentControlPropertie.dateStorageFormat;
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.dateDisplayLocale)) {
                contentControlProperties[index_2.dateDisplayLocaleProperty[this.keywordIndex]] = contentControlPropertie.dateDisplayLocale;
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.dateDisplayFormat)) {
                contentControlProperties[index_2.dateDisplayFormatProperty[this.keywordIndex]] = contentControlPropertie.dateDisplayFormat;
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.xmlMapping)) {
                var xmlMapping = {};
                var customXmlPart = {};
                xmlMapping[index_2.isMappedProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.xmlMapping.isMapped, this.keywordIndex);
                xmlMapping[index_2.isWordMlProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(contentControlPropertie.xmlMapping.isWordMl, this.keywordIndex);
                if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.xmlMapping.prefixMapping)) {
                    xmlMapping[index_2.prefixMappingProperty[this.keywordIndex]] = contentControlPropertie.xmlMapping.prefixMapping;
                }
                xmlMapping[index_2.xPathProperty[this.keywordIndex]] = contentControlPropertie.xmlMapping.xPath;
                xmlMapping[index_2.storeItemIdProperty[this.keywordIndex]] = contentControlPropertie.xmlMapping.storeItemId;
                if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.xmlMapping.customXmlPart)) {
                    customXmlPart[index_2.idProperty[this.keywordIndex]] = contentControlPropertie.xmlMapping.customXmlPart.id;
                    customXmlPart[index_2.xmlProperty[this.keywordIndex]] = contentControlPropertie.xmlMapping.customXmlPart.xml;
                    xmlMapping[index_2.customXmlPartProperty[this.keywordIndex]] = customXmlPart;
                }
                contentControlProperties[index_2.xmlMappingProperty[this.keywordIndex]] = xmlMapping;
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.characterFormat)) {
                contentControlProperties[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(contentControlPropertie.characterFormat);
            }
            if (!ej2_base_1.isNullOrUndefined(contentControlPropertie.contentControlListItems)) {
                for (var i = 0; i < contentControlPropertie.contentControlListItems.length; i++) {
                    var listItems = {};
                    listItems[index_2.displayTextProperty[this.keywordIndex]] = contentControlPropertie.contentControlListItems[i].displayText;
                    listItems[index_2.valueProperty[this.keywordIndex]] = contentControlPropertie.contentControlListItems[i].value;
                    contentControlListItems.push(listItems);
                }
            }
            contentControlProperties[index_2.contentControlListItemsProperty[this.keywordIndex]] = contentControlListItems;
            return contentControlProperties;
        };
        SfdtExport.prototype.tounCheckedState = function (state) {
            var unCheckedState = {};
            unCheckedState[index_2.fontProperty[this.keywordIndex]] = state.font;
            unCheckedState[index_2.valueProperty[this.keywordIndex]] = state.value;
            return unCheckedState;
        };
        SfdtExport.prototype.toCheckedState = function (state) {
            var checkedState = {};
            checkedState[index_2.fontProperty[this.keywordIndex]] = state.font;
            checkedState[index_2.valueProperty[this.keywordIndex]] = state.value;
            return checkedState;
        };
        SfdtExport.prototype.blockContentControl = function (widget) {
            var block = {};
            if (widget.childWidgets.length === 0) {
                this.nextBlock = widget.nextWidget;
                return undefined;
            }
            block[index_2.blocksProperty[this.keywordIndex]] = this.writeParagraphs(widget);
            if (!ej2_base_1.isNullOrUndefined(this.nextBlock)) {
                if (widget.contentControlProperties === this.nextBlock.contentControlProperties) {
                    this.isBlockClosed = false;
                    this.nestedBlockContent = true;
                    return this.blocks = block[index_2.blocksProperty[this.keywordIndex]];
                }
                else {
                    this.isBlockClosed = true;
                }
            }
            else {
                this.isBlockClosed = true;
            }
            if (!ej2_base_1.isNullOrUndefined(block[index_2.blocksProperty[this.keywordIndex]])) {
                var child = widget.childWidgets[0];
                var firstChild = child.children[0];
                var secondChild = child.children[1];
                if (firstChild instanceof page_1.ListTextElementBox || secondChild instanceof page_1.ListTextElementBox) {
                    firstChild = child.children[2];
                    secondChild = child.children[3];
                }
                if ((firstChild instanceof page_1.ContentControl && secondChild instanceof page_1.ContentControl && !this.nestedBlockContent) || (this.blockContent && firstChild instanceof page_1.ContentControl && !this.nestedBlockContent)) {
                    if (!(secondChild instanceof page_1.ContentControl)) {
                        block[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(firstChild.contentControlProperties);
                        return block;
                    }
                    else if (secondChild.contentControlWidgetType === 'Block') {
                        block[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(secondChild.contentControlProperties);
                    }
                    else {
                        block[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(widget.contentControlProperties);
                    }
                }
                else {
                    block[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(widget.contentControlProperties);
                }
                return block;
            }
        };
        SfdtExport.prototype.tableContentControl = function (tableWidget) {
            var block = {};
            block[index_2.blocksProperty[this.keywordIndex]] = this.tableContentControls(tableWidget);
            if (!ej2_base_1.isNullOrUndefined(this.nextBlock)) {
                if (tableWidget.contentControlProperties === this.nextBlock.contentControlProperties) {
                    this.isBlockClosed = false;
                    return this.blocks = block[index_2.blocksProperty[this.keywordIndex]];
                }
                else {
                    this.isBlockClosed = true;
                }
            }
            block[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(tableWidget.contentControlProperties);
            return block;
        };
        SfdtExport.prototype.tableContentControls = function (tableWidget) {
            var blocks = [];
            if (!this.isBlockClosed) {
                blocks = this.blocks;
            }
            var table = this.createTable(tableWidget);
            blocks.push(table);
            this.nextBlock = this.writeTable(tableWidget, table, 0, blocks);
            return blocks;
        };
        SfdtExport.prototype.writeParagraph = function (paragraphWidget, paragraph, blocks, lineIndex, start) {
            if (ej2_base_1.isNullOrUndefined(lineIndex)) {
                lineIndex = 0;
            }
            if (ej2_base_1.isNullOrUndefined(start)) {
                start = 0;
            }
            var next = paragraphWidget;
            while (next instanceof page_1.ParagraphWidget) {
                if (this.writeLines(next, lineIndex, start, paragraph[index_2.inlinesProperty[this.keywordIndex]])) {
                    return undefined;
                }
                lineIndex = 0;
                start = 0;
                paragraphWidget = next;
                next = paragraphWidget.nextSplitWidget;
            }
            next = paragraphWidget.nextRenderedWidget;
            if (this.documentHelper.owner.layoutType !== 'Continuous' && ej2_base_1.isNullOrUndefined(next) && paragraphWidget.containerWidget instanceof page_1.BodyWidget &&
                !ej2_base_1.isNullOrUndefined(paragraphWidget.containerWidget.page.nextPage) &&
                !ej2_base_1.isNullOrUndefined(paragraphWidget.containerWidget.page.nextPage.bodyWidgets)) {
                next = paragraphWidget.containerWidget.page.nextPage.bodyWidgets[0].childWidgets[0];
            }
            if (this.isExport) {
                return (next instanceof page_2.BlockWidget && paragraphWidget.containerWidget.index === next.containerWidget.index) ? next : undefined;
            }
            else {
                return next;
            }
        };
        SfdtExport.prototype.writeInlines = function (paragraph, line, inlines) {
            this.contentInline = [];
            var lineWidget = line;
            var isformField = false;
            for (var i = 0; i < lineWidget.children.length; i++) {
                var element = lineWidget.children[i];
                if (this.isExport && this.checkboxOrDropdown) {
                    if (isformField && element instanceof page_1.TextElementBox) {
                        continue;
                    }
                    if (element instanceof page_1.FieldElementBox && element.fieldType === 2) {
                        isformField = true;
                    }
                }
                if (element instanceof page_1.ListTextElementBox) {
                    continue;
                }
                if (element instanceof page_1.FootnoteElementBox) {
                    inlines.push(this.writeInlinesFootNote(paragraph, element, line, inlines));
                    continue;
                }
                if (element instanceof page_1.ContentControl || this.startContent || this.blockContent) {
                    this.writeInlinesContentControl(element, line, inlines, i);
                }
                else {
                    var inline = this.writeInline(element);
                    if (!ej2_base_1.isNullOrUndefined(inline)) {
                        inlines.push(inline);
                    }
                }
                if (this.isExport && element instanceof page_1.FieldElementBox && element.fieldType === 1) {
                    isformField = false;
                    this.checkboxOrDropdown = false;
                }
            }
        };
        SfdtExport.prototype.inlineContentControl = function (element, nextElement, inlines) {
            var inline = {};
            var nestedContentInline = [];
            if (!ej2_base_1.isNullOrUndefined(inlines)) {
                if (this.nestedContent) {
                    inlines = inlines[inlines.length - 1][index_2.inlinesProperty[this.keywordIndex]];
                    if (inlines[inlines.length - 1][index_2.inlinesProperty[this.keywordIndex]] == undefined) {
                        inlines[inlines.length - 1][index_2.inlinesProperty[this.keywordIndex]] = [];
                    }
                    inline = this.inlineContentControls(element, inlines[inlines.length - 1][index_2.inlinesProperty[this.keywordIndex]]);
                    var nestedContentinline = this.nestedContentProperty(nextElement, inlines[inlines.length - 1]);
                    if (!ej2_base_1.isNullOrUndefined(nestedContentinline)) {
                        this.contentInline.push(inline);
                        nestedContentInline = [];
                    }
                }
                else {
                    this.inlineContentControls(element, inlines[inlines.length - 1][index_2.inlinesProperty[this.keywordIndex]]);
                }
            }
            else {
                if (this.nestedContent) {
                    inline[index_2.inlinesProperty[this.keywordIndex]] = this.inlineContentControls(element, undefined, nestedContentInline);
                    var nestedContentinline = this.nestedContentProperty(nextElement, inline);
                    if (!ej2_base_1.isNullOrUndefined(nestedContentinline) || this.multipleLineContent) {
                        this.contentInline.push(inline);
                        nestedContentInline = [];
                    }
                }
                else {
                    inline[index_2.inlinesProperty[this.keywordIndex]] = this.inlineContentControls(element, this.contentInline);
                }
            }
            if (nextElement instanceof page_1.ContentControl && nextElement.type === 1 && !this.nestedContent) {
                if (this.multipleLineContent && !ej2_base_1.isNullOrUndefined(inlines)) {
                    inlines[inlines.length - 1][index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(nextElement.contentControlProperties);
                    this.multipleLineContent = false;
                    return;
                }
                else {
                    inline[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(nextElement.contentControlProperties);
                }
                return inline;
            }
            else if (this.startContent) {
                this.multipleLineContent = true;
                return inline;
            }
        };
        SfdtExport.prototype.nestedContentProperty = function (nextElement, inline, inlines) {
            if (!ej2_base_1.isNullOrUndefined(nextElement)) {
                if (nextElement.type === 1) {
                    inline[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(nextElement.contentControlProperties);
                    return inline;
                }
                else if (this.startContent) {
                    this.multipleLineContent = true;
                    return inline;
                }
            }
            else if (this.startContent) {
                this.multipleLineContent = true;
                return inline;
            }
        };
        SfdtExport.prototype.inlineContentControls = function (element, contentInline, nestedContentInline) {
            var inline = this.writeInline(element);
            if (!ej2_base_1.isNullOrUndefined(nestedContentInline)) {
                nestedContentInline.push(inline);
                return nestedContentInline;
            }
            contentInline.push(inline);
            return contentInline;
        };
        SfdtExport.prototype.writeInline = function (element) {
            var inline = {};
            if (element.removedIds.length > 0) {
                for (var i = 0; i < element.removedIds.length; i++) {
                    element.revisions[i] = this.documentHelper.revisionsInternal.get(element.removedIds[i]);
                }
            }
            inline[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(element.characterFormat);
            if (element instanceof page_1.FieldElementBox) {
                inline[index_2.fieldTypeProperty[this.keywordIndex]] = element.fieldType;
                if (element.fieldType === 0) {
                    inline[index_2.hasFieldEndProperty[this.keywordIndex]] = element.hasFieldEnd;
                    if (element.formFieldData) {
                        inline[index_2.formFieldDataProperty[this.keywordIndex]] = {};
                        inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.nameProperty[this.keywordIndex]] = element.formFieldData.name;
                        inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.enabledProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.formFieldData.enabled, this.keywordIndex);
                        inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.helpTextProperty[this.keywordIndex]] = element.formFieldData.helpText;
                        inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.statusTextProperty[this.keywordIndex]] = element.formFieldData.statusText;
                        if (element.formFieldData instanceof page_1.TextFormField) {
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.textInputProperty[this.keywordIndex]] = {};
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.textInputProperty[this.keywordIndex]][index_2.typeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTextFormFieldTypeEnumValue(element.formFieldData.type) : element.formFieldData.type;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.textInputProperty[this.keywordIndex]][index_2.maxLengthProperty[this.keywordIndex]] = element.formFieldData.maxLength;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.textInputProperty[this.keywordIndex]][index_2.defaultValueProperty[this.keywordIndex]] = element.formFieldData.defaultValue;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.textInputProperty[this.keywordIndex]][index_2.formatProperty[this.keywordIndex]] = this.keywordIndex == 1 && element.formFieldData.type === 'Text' ? this.getTextFormFieldFormatEnumValue(element.formFieldData.format) : element.formFieldData.format;
                        }
                        else if (element.formFieldData instanceof page_1.CheckBoxFormField) {
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.checkBoxProperty[this.keywordIndex]] = {};
                            this.checkboxOrDropdown = true;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.checkBoxProperty[this.keywordIndex]][index_2.sizeTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getCheckBoxSizeTypeEnumValue(element.formFieldData.sizeType) : element.formFieldData.sizeType;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.checkBoxProperty[this.keywordIndex]][index_2.sizeProperty[this.keywordIndex]] = element.formFieldData.size;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.checkBoxProperty[this.keywordIndex]][index_2.defaultValueProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.formFieldData.defaultValue, this.keywordIndex);
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.checkBoxProperty[this.keywordIndex]][index_2.checkedProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.formFieldData.checked, this.keywordIndex);
                        }
                        else {
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.dropDownListProperty[this.keywordIndex]] = {};
                            this.checkboxOrDropdown = true;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.dropDownListProperty[this.keywordIndex]][index_2.dropDownItemsProperty[this.keywordIndex]] = element.formFieldData.dropdownItems;
                            inline[index_2.formFieldDataProperty[this.keywordIndex]][index_2.dropDownListProperty[this.keywordIndex]][index_2.selectedIndexProperty[this.keywordIndex]] = element.formFieldData.selectedIndex;
                        }
                    }
                }
                if (element.fieldCodeType && element.fieldCodeType !== '') {
                    inline.fieldCodeType = element.fieldCodeType;
                }
            }
            else if (element instanceof page_1.ChartElementBox) {
                this.writeChart(element, inline);
            }
            else if (element instanceof page_1.ImageElementBox) {
                inline[index_2.imageStringProperty[this.keywordIndex]] = element.imageString;
                inline[index_2.metaFileImageStringProperty[this.keywordIndex]] = element.metaFileImageString;
                inline[index_2.isMetaFileProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.isMetaFile, this.keywordIndex);
                inline[index_2.isCompressedProperty[this.keywordIndex]] = element.isCompressed;
                inline[index_2.widthProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.width);
                inline[index_2.heightProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.height);
                if (element.isCrop) {
                    inline[index_2.bottomProperty[this.keywordIndex]] = element.bottom;
                    inline[index_2.rightProperty[this.keywordIndex]] = element.right;
                    inline[index_2.leftProperty[this.keywordIndex]] = element.left;
                    inline[index_2.topProperty[this.keywordIndex]] = element.top;
                    inline[index_2.getImageWidthProperty[this.keywordIndex]] = element.cropWidthScale;
                    inline[index_2.getImageHeightProperty[this.keywordIndex]] = element.cropHeightScale;
                }
                inline[index_2.nameProperty[this.keywordIndex]] = element.name;
                inline[index_2.alternativeTextProperty[this.keywordIndex]] = element.alternateText;
                inline[index_2.titleProperty[this.keywordIndex]] = element.title;
                inline[index_2.visibleProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.visible, this.keywordIndex);
                inline[index_2.widthScaleProperty[this.keywordIndex]] = element.widthScale;
                inline[index_2.heightScaleProperty[this.keywordIndex]] = element.heightScale;
                inline[index_2.verticalPositionProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.verticalPosition);
                inline[index_2.verticalOriginProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getVerticalOriginEnumValue(element.verticalOrigin) : element.verticalOrigin;
                inline[index_2.verticalAlignmentProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getShapeVerticalAlignmentEnumValue(element.verticalAlignment) : element.verticalAlignment;
                inline[index_2.horizontalPositionProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.horizontalPosition);
                inline[index_2.horizontalOriginProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getHorizontalOriginEnumValue(element.horizontalOrigin) : element.horizontalOrigin;
                inline[index_2.horizontalAlignmentProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getShapeHorizontalAlignmentEnumValue(element.horizontalAlignment) : element.horizontalAlignment;
                inline[index_2.allowOverlapProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.allowOverlap, this.keywordIndex);
                inline[index_2.textWrappingStyleProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTextWrappingStyleEnumValue(element.textWrappingStyle) : element.textWrappingStyle;
                inline[index_2.textWrappingTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTextWrappingTypeEnumValue(element.textWrappingType) : element.textWrappingType;
                inline[index_2.belowTextProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.isBelowText, this.keywordIndex);
                if (!ej2_base_1.isNullOrUndefined(element.distanceBottom)) {
                    inline[index_2.distanceBottomProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceBottom);
                }
                if (!ej2_base_1.isNullOrUndefined(element.distanceLeft)) {
                    inline[index_2.distanceLeftProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceLeft);
                }
                if (!ej2_base_1.isNullOrUndefined(element.distanceRight)) {
                    inline[index_2.distanceRightProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceRight);
                }
                if (!ej2_base_1.isNullOrUndefined(element.distanceTop)) {
                    inline[index_2.distanceTopProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceTop);
                }
                inline[index_2.layoutInCellProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.layoutInCell, this.keywordIndex);
                inline[index_2.zOrderPositionProperty[this.keywordIndex]] = element.zOrderPosition;
            }
            else if (element instanceof page_1.BookmarkElementBox) {
                inline[index_2.bookmarkTypeProperty[this.keywordIndex]] = element.bookmarkType;
                inline[index_2.nameProperty[this.keywordIndex]] = element.name;
                if (!ej2_base_1.isNullOrUndefined(element.properties)) {
                    var properties = {};
                    if (!ej2_base_1.isNullOrUndefined(element.properties['isAfterParagraphMark'])) {
                        properties[index_2.isAfterParagraphMarkProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.properties['isAfterParagraphMark'], this.keywordIndex);
                    }
                    if (!ej2_base_1.isNullOrUndefined(element.properties['isAfterTableMark'])) {
                        properties[index_2.isAfterTableMarkProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.properties['isAfterTableMark'], this.keywordIndex);
                    }
                    if (!ej2_base_1.isNullOrUndefined(element.properties['isAfterRowMark'])) {
                        properties[index_2.isAfterRowMarkProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.properties['isAfterRowMark'], this.keywordIndex);
                    }
                    if (!ej2_base_1.isNullOrUndefined(element.properties['isAfterCellMark'])) {
                        properties[index_2.isAfterCellMarkProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.properties['isAfterCellMark'], this.keywordIndex);
                    }
                    if (!ej2_base_1.isNullOrUndefined(element.properties['columnFirst'])) {
                        properties[index_2.columnFirstProperty[this.keywordIndex]] = element.properties['columnFirst'];
                    }
                    if (!ej2_base_1.isNullOrUndefined(element.properties['columnLast'])) {
                        properties[index_2.columnLastProperty[this.keywordIndex]] = element.properties['columnLast'];
                    }
                    inline[index_2.propertiesProperty[this.keywordIndex]] = properties;
                }
            }
            else if (element instanceof page_1.BreakElementBox) {
                inline[index_2.breakClearTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? editor_helper_1.HelperMethods.getBreakClearType(element.breakClearType) : element.breakClearType;
            }
            else if (element instanceof page_1.TextElementBox) {
                var elementText = element.text;
                if (!this.isWriteEndFootNote && (ej2_base_1.isNullOrUndefined(this.owner.editorModule) || !this.owner.editorModule.isPaste)) {
                    elementText = editor_helper_1.HelperMethods.removeInvalidXmlChars(elementText);
                }
                if (this.isWriteInlinesFootNote
                    && element.indexInOwner === 0
                    && element.line.indexInOwner === 0
                    && element.paragraph.indexInOwner == 0
                    && editor_helper_1.HelperMethods.checkTextFormat(elementText)) {
                    elementText = "\u0002";
                }
                if (elementText.indexOf(String.fromCharCode(30)) !== -1) {
                    inline[index_2.textProperty[this.keywordIndex]] = elementText.replace(/\u001e/g, '-');
                }
                else if (elementText.indexOf(String.fromCharCode(31)) !== -1) {
                    inline[index_2.textProperty[this.keywordIndex]] = elementText.replace(/\u001f/g, '');
                }
                else if (element.revisions.length !== 0) {
                    if (!this.isExport && this.owner.enableTrackChanges && !this.isPartialExport) {
                        this.copyWithTrackChange = true;
                        for (var x = 0; x < element.revisions.length; x++) {
                            var revision = element.revisions[x];
                            if (this.selectedRevisionId.indexOf(revision.revisionID) === -1) {
                                this.selectedRevisionId.push(revision.revisionID);
                            }
                            if (element.revisions[x].revisionType !== 'Deletion') {
                                inline[index_2.textProperty[this.keywordIndex]] = elementText;
                            }
                        }
                    }
                    else {
                        inline[index_2.textProperty[this.keywordIndex]] = elementText;
                    }
                }
                else {
                    inline[index_2.textProperty[this.keywordIndex]] = elementText;
                }
            }
            else if (element instanceof page_1.EditRangeStartElementBox) {
                if (element.user !== '') {
                    inline[index_2.userProperty[this.keywordIndex]] = element.user;
                }
                inline[index_2.groupProperty[this.keywordIndex]] = element.group;
                inline[index_2.columnFirstProperty[this.keywordIndex]] = element.columnFirst;
                inline[index_2.columnLastProperty[this.keywordIndex]] = element.columnLast;
                inline[index_2.editRangeIdProperty[this.keywordIndex]] = element.editRangeId.toString();
            }
            else if (element instanceof page_1.EditRangeEndElementBox) {
                inline[index_2.editableRangeStartProperty[this.keywordIndex]] = {};
                inline[index_2.editableRangeStartProperty[this.keywordIndex]][index_2.userProperty[this.keywordIndex]] = element.editRangeStart.user;
                inline[index_2.editableRangeStartProperty[this.keywordIndex]][index_2.groupProperty[this.keywordIndex]] = element.editRangeStart.group;
                inline[index_2.editableRangeStartProperty[this.keywordIndex]][index_2.columnFirstProperty[this.keywordIndex]] = element.editRangeStart.columnFirst;
                inline[index_2.editableRangeStartProperty[this.keywordIndex]][index_2.columnLastProperty[this.keywordIndex]] = element.editRangeStart.columnLast;
                inline[index_2.editRangeIdProperty[this.keywordIndex]] = element.editRangeId.toString();
            }
            else if (element instanceof page_1.CommentCharacterElementBox) {
                if (this.iscommentInsert) {
                    if (!this.isExport && element.commentType === 0) {
                        this.selectedCommentsId.push(element.commentId);
                    }
                    inline[index_2.commentCharacterTypeProperty[this.keywordIndex]] = element.commentType;
                    inline[index_2.commentIdProperty[this.keywordIndex]] = element.commentId;
                }
                else {
                    return undefined;
                }
            }
            else if (element instanceof page_1.ShapeElementBox) {
                this.writeShape(element, inline);
            }
            else {
                inline = undefined;
            }
            this.writeInlineRevisions(inline, element);
            return inline;
        };
        SfdtExport.prototype.writeInlineRevisions = function (inline, element) {
            if ((element.revisions.length > 0) && (this.isExport || !this.isExport && !this.owner.enableTrackChanges)) {
                inline[index_2.revisionIdsProperty[this.keywordIndex]] = [];
                for (var x = 0; x < element.revisions.length; x++) {
                    if (this.selectedRevisionId.indexOf(element.revisions[x].revisionID) === -1) {
                        this.selectedRevisionId.push(element.revisions[x].revisionID);
                    }
                    inline[index_2.revisionIdsProperty[this.keywordIndex]].push(element.revisions[x].revisionID);
                }
            }
        };
        SfdtExport.prototype.writeShape = function (element, inline) {
            inline[index_2.shapeIdProperty[this.keywordIndex]] = element.shapeId;
            inline[index_2.nameProperty[this.keywordIndex]] = element.name;
            inline[index_2.alternativeTextProperty[this.keywordIndex]] = element.alternateText;
            inline[index_2.titleProperty[this.keywordIndex]] = element.title;
            inline[index_2.visibleProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.visible, this.keywordIndex);
            inline[index_2.widthProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.width);
            inline[index_2.heightProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.height);
            if (element.isZeroHeight) {
                inline[index_2.heightProperty[this.keywordIndex]] = 0;
            }
            else {
                inline[index_2.heightProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.height);
            }
            inline[index_2.widthScaleProperty[this.keywordIndex]] = element.widthScale;
            inline[index_2.heightScaleProperty[this.keywordIndex]] = element.heightScale;
            inline[index_2.verticalPositionProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.verticalPosition);
            inline[index_2.verticalOriginProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getVerticalOriginEnumValue(element.verticalOrigin) : element.verticalOrigin;
            inline[index_2.verticalAlignmentProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getShapeVerticalAlignmentEnumValue(element.verticalAlignment) : element.verticalAlignment;
            inline[index_2.verticalRelativePercentProperty[this.keywordIndex]] = element.verticalRelativePercent;
            inline[index_2.horizontalPositionProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.horizontalPosition);
            inline[index_2.horizontalOriginProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getHorizontalOriginEnumValue(element.horizontalOrigin) : element.horizontalOrigin;
            inline[index_2.horizontalAlignmentProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getShapeHorizontalAlignmentEnumValue(element.horizontalAlignment) : element.horizontalAlignment;
            inline[index_2.horizontalRelativePercentProperty[this.keywordIndex]] = element.horizontalRelativePercent;
            inline[index_2.heightRelativePercentProperty[this.keywordIndex]] = element.heightRelativePercent;
            inline[index_2.widthRelativePercentProperty[this.keywordIndex]] = element.widthRelativePercent;
            inline[index_2.zOrderPositionProperty[this.keywordIndex]] = element.zOrderPosition;
            inline[index_2.allowOverlapProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.allowOverlap, this.keywordIndex);
            inline[index_2.textWrappingStyleProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTextWrappingStyleEnumValue(element.textWrappingStyle) : element.textWrappingStyle;
            inline[index_2.textWrappingTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTextWrappingTypeEnumValue(element.textWrappingType) : element.textWrappingType;
            inline[index_2.belowTextProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.isBelowText, this.keywordIndex);
            inline[index_2.horizontalRuleProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.isHorizontalRule, this.keywordIndex);
            if (!ej2_base_1.isNullOrUndefined(element.distanceBottom)) {
                inline[index_2.distanceBottomProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceBottom);
            }
            if (!ej2_base_1.isNullOrUndefined(element.distanceLeft)) {
                inline[index_2.distanceLeftProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceLeft);
            }
            if (!ej2_base_1.isNullOrUndefined(element.distanceRight)) {
                inline[index_2.distanceRightProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceRight);
            }
            if (!ej2_base_1.isNullOrUndefined(element.distanceTop)) {
                inline[index_2.distanceTopProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.distanceTop);
            }
            inline[index_2.layoutInCellProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.layoutInCell, this.keywordIndex);
            inline[index_2.lockAnchorProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.lockAnchor, this.keywordIndex);
            inline[index_2.autoShapeTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getAutoShapeTypeEnumValue(element.autoShapeType) : element.autoShapeType;
            if (element.fillFormat) {
                inline[index_2.fillFormatProperty[this.keywordIndex]] = {};
                inline[index_2.fillFormatProperty[this.keywordIndex]][index_2.colorProperty[this.keywordIndex]] = element.fillFormat.color;
                inline[index_2.fillFormatProperty[this.keywordIndex]][index_2.fillProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.fillFormat.fill, this.keywordIndex);
            }
            if (element.lineFormat) {
                inline[index_2.lineFormatProperty[this.keywordIndex]] = {};
                inline[index_2.lineFormatProperty[this.keywordIndex]][index_2.lineFormatTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getLineFormatTypeEnumValue(element.lineFormat.lineFormatType) : element.lineFormat.lineFormatType;
                inline[index_2.lineFormatProperty[this.keywordIndex]][index_2.colorProperty[this.keywordIndex]] = element.lineFormat.color;
                inline[index_2.lineFormatProperty[this.keywordIndex]][index_2.weightProperty[this.keywordIndex]] = element.lineFormat.weight;
                inline[index_2.lineFormatProperty[this.keywordIndex]][index_2.lineStyleProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getLineDashStyleEnumValue(element.lineFormat.dashStyle) : element.lineFormat.dashStyle;
                inline[index_2.lineFormatProperty[this.keywordIndex]][index_2.lineProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(element.lineFormat.line, this.keywordIndex);
            }
            if (element.textFrame) {
                inline[index_2.textFrameProperty[this.keywordIndex]] = {};
                inline[index_2.textFrameProperty[this.keywordIndex]][index_2.textVerticalAlignmentProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTextVerticalAlignmentEnumValue(element.textFrame.textVerticalAlignment) : element.textFrame.textVerticalAlignment;
                inline[index_2.textFrameProperty[this.keywordIndex]][index_2.leftMarginProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.textFrame.marginLeft);
                inline[index_2.textFrameProperty[this.keywordIndex]][index_2.rightMarginProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.textFrame.marginRight);
                inline[index_2.textFrameProperty[this.keywordIndex]][index_2.topMarginProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.textFrame.marginTop);
                inline[index_2.textFrameProperty[this.keywordIndex]][index_2.bottomMarginProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.textFrame.marginBottom);
                inline[index_2.textFrameProperty[this.keywordIndex]][index_2.blocksProperty[this.keywordIndex]] = [];
                for (var j = 0; j < element.textFrame.childWidgets.length; j++) {
                    var textFrameBlock = element.textFrame.childWidgets[j];
                    if (textFrameBlock.hasOwnProperty('contentControlProperties') && !ej2_base_1.isNullOrUndefined(element.paragraph) && (element.paragraph.hasOwnProperty('contentControlProperties'))) {
                        this.blocks = [];
                    }
                    this.writeBlock(textFrameBlock, 0, inline[index_2.textFrameProperty[this.keywordIndex]][index_2.blocksProperty[this.keywordIndex]]);
                }
            }
        };
        SfdtExport.prototype.writeChart = function (element, inline) {
            inline[index_2.chartLegendProperty[this.keywordIndex]] = {};
            inline[index_2.chartTitleAreaProperty[this.keywordIndex]] = {};
            inline[index_2.chartAreaProperty[this.keywordIndex]] = {};
            inline[index_2.plotAreaProperty[this.keywordIndex]] = {};
            inline[index_2.chartCategoryProperty[this.keywordIndex]] = [];
            inline[index_2.chartSeriesProperty[this.keywordIndex]] = [];
            inline[index_2.chartPrimaryCategoryAxisProperty[this.keywordIndex]] = {};
            inline[index_2.chartPrimaryValueAxisProperty[this.keywordIndex]] = {};
            this.writeChartTitleArea(element.chartTitleArea, inline[index_2.chartTitleAreaProperty[this.keywordIndex]]);
            this.writeChartArea(element.chartArea, inline[index_2.chartAreaProperty[this.keywordIndex]]);
            this.writeChartArea(element.chartPlotArea, inline[index_2.plotAreaProperty[this.keywordIndex]]);
            this.writeChartCategory(element, inline[index_2.chartCategoryProperty[this.keywordIndex]]);
            this.createChartSeries(element, inline[index_2.chartSeriesProperty[this.keywordIndex]]);
            this.writeChartLegend(element.chartLegend, inline[index_2.chartLegendProperty[this.keywordIndex]]);
            this.writeChartCategoryAxis(element.chartPrimaryCategoryAxis, inline[index_2.chartPrimaryCategoryAxisProperty[this.keywordIndex]]);
            this.writeChartCategoryAxis(element.chartPrimaryValueAxis, inline[index_2.chartPrimaryValueAxisProperty[this.keywordIndex]]);
            if (element.chartDataTable.showSeriesKeys !== undefined) {
                inline[index_2.chartDataTableProperty[this.keywordIndex]] = {};
                this.writeChartDataTable(element.chartDataTable, inline[index_2.chartDataTableProperty[this.keywordIndex]]);
            }
            inline[index_2.chartTitleProperty[this.keywordIndex]] = element.title;
            inline[index_2.chartTypeProperty[this.keywordIndex]] = element.type;
            inline[index_2.gapWidthProperty[this.keywordIndex]] = element.chartGapWidth;
            inline[index_2.overlapProperty[this.keywordIndex]] = element.chartOverlap;
            inline[index_2.heightProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.height);
            inline[index_2.widthProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(element.width);
        };
        SfdtExport.prototype.writeChartTitleArea = function (titleArea, chartTitleArea) {
            chartTitleArea[index_2.fontNameProperty[this.keywordIndex]] = titleArea.chartfontName;
            chartTitleArea[index_2.fontSizeProperty[this.keywordIndex]] = titleArea.chartFontSize;
            chartTitleArea[index_2.layoutProperty[this.keywordIndex]] = {};
            chartTitleArea[index_2.dataFormatProperty[this.keywordIndex]] = this.writeChartDataFormat(titleArea.dataFormat);
            this.writeChartLayout(titleArea.layout, chartTitleArea[index_2.layoutProperty[this.keywordIndex]]);
        };
        SfdtExport.prototype.writeChartDataFormat = function (format) {
            var chartDataFormat = {};
            chartDataFormat[index_2.fillProperty[this.keywordIndex]] = {};
            chartDataFormat[index_2.lineProperty[this.keywordIndex]] = {};
            if (!ej2_base_1.isNullOrUndefined(format.fill.color)) {
                if (format.fill.color.length > 6) {
                    chartDataFormat[index_2.fillProperty[this.keywordIndex]][index_2.foreColorProperty[this.keywordIndex]] = format.fill.color.substring(2);
                }
                else {
                    chartDataFormat[index_2.fillProperty[this.keywordIndex]][index_2.foreColorProperty[this.keywordIndex]] = format.fill.color;
                }
            }
            chartDataFormat[index_2.fillProperty[this.keywordIndex]][index_2.rgbProperty[this.keywordIndex]] = format.fill.rgb;
            chartDataFormat[index_2.lineProperty[this.keywordIndex]][index_2.colorProperty[this.keywordIndex]] = format.line.color;
            chartDataFormat[index_2.lineProperty[this.keywordIndex]][index_2.rgbProperty[this.keywordIndex]] = format.line.rgb;
            return chartDataFormat;
        };
        SfdtExport.prototype.writeChartLayout = function (layout, chartLayout) {
            chartLayout[index_2.layoutXProperty[this.keywordIndex]] = layout.chartLayoutLeft;
            chartLayout[index_2.layoutYProperty[this.keywordIndex]] = layout.chartLayoutTop;
        };
        SfdtExport.prototype.writeChartArea = function (area, chartArea) {
            chartArea[index_2.foreColorProperty[this.keywordIndex]] = area.chartForeColor;
        };
        SfdtExport.prototype.writeChartLegend = function (legend, chartLegend) {
            chartLegend[index_2.positionProperty[this.keywordIndex]] = legend.chartLegendPostion;
            chartLegend[index_2.chartTitleAreaProperty[this.keywordIndex]] = {};
            this.writeChartTitleArea(legend.chartTitleArea, chartLegend[index_2.chartTitleAreaProperty[this.keywordIndex]]);
        };
        SfdtExport.prototype.writeChartCategoryAxis = function (categoryAxis, primaryCategoryAxis) {
            primaryCategoryAxis[index_2.chartTitleProperty[this.keywordIndex]] = categoryAxis.categoryAxisTitle;
            primaryCategoryAxis[index_2.chartTitleAreaProperty[this.keywordIndex]] = {};
            this.writeChartTitleArea(categoryAxis.chartTitleArea, primaryCategoryAxis[index_2.chartTitleAreaProperty[this.keywordIndex]]);
            primaryCategoryAxis[index_2.categoryTypeProperty[this.keywordIndex]] = categoryAxis.categoryAxisType;
            primaryCategoryAxis[index_2.fontSizeProperty[this.keywordIndex]] = categoryAxis.axisFontSize;
            primaryCategoryAxis[index_2.fontNameProperty[this.keywordIndex]] = categoryAxis.axisFontName;
            primaryCategoryAxis[index_2.numberFormatProperty[this.keywordIndex]] = categoryAxis.categoryNumberFormat;
            primaryCategoryAxis[index_2.maximumValueProperty[this.keywordIndex]] = categoryAxis.max;
            primaryCategoryAxis[index_2.minimumValueProperty[this.keywordIndex]] = categoryAxis.min;
            primaryCategoryAxis[index_2.majorUnitProperty[this.keywordIndex]] = categoryAxis.interval;
            primaryCategoryAxis[index_2.hasMajorGridLinesProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(categoryAxis.majorGridLines, this.keywordIndex);
            primaryCategoryAxis[index_2.hasMinorGridLinesProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(categoryAxis.minorGridLines, this.keywordIndex);
            primaryCategoryAxis[index_2.majorTickMarkProperty[this.keywordIndex]] = categoryAxis.majorTick;
            primaryCategoryAxis[index_2.minorTickMarkProperty[this.keywordIndex]] = categoryAxis.minorTick;
            primaryCategoryAxis[index_2.tickLabelPositionProperty[this.keywordIndex]] = categoryAxis.tickPosition;
        };
        SfdtExport.prototype.writeChartDataTable = function (chartDataTable, dataTable) {
            dataTable[index_2.showSeriesKeysProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(chartDataTable.showSeriesKeys, this.keywordIndex);
            dataTable[index_2.hasHorizontalBorderProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(chartDataTable.hasHorzBorder, this.keywordIndex);
            dataTable[index_2.hasVerticalBorderProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(chartDataTable.hasVertBorder, this.keywordIndex);
            dataTable[index_2.hasBordersProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(chartDataTable.hasBorders, this.keywordIndex);
        };
        SfdtExport.prototype.writeChartCategory = function (element, chartCategory) {
            var data = element.chartCategory;
            chartCategory[index_2.chartDataProperty[this.keywordIndex]] = [];
            for (var i = 0; i < data.length; i++) {
                var xData = data[i];
                var categories = this.createChartCategory(xData, element.chartType);
                chartCategory.push(categories);
            }
        };
        SfdtExport.prototype.createChartCategory = function (data, type) {
            var chartCategory = {};
            chartCategory[index_2.chartDataProperty[this.keywordIndex]] = [];
            this.writeChartData(data, chartCategory[index_2.chartDataProperty[this.keywordIndex]], type);
            chartCategory[index_2.categoryXNameProperty[this.keywordIndex]] = data.categoryXName;
            return chartCategory;
        };
        SfdtExport.prototype.writeChartData = function (element, chartData, type) {
            var data = element.chartData;
            for (var i = 0; i < data.length; i++) {
                var yData = data[i];
                var yCategory = this.createChartData(yData, type);
                chartData.push(yCategory);
            }
        };
        SfdtExport.prototype.createChartData = function (data, type) {
            var chartData = {};
            chartData[index_2.yValueProperty[this.keywordIndex]] = data.yValue;
            if (type === 'Bubble') {
                chartData[index_2.sizeProperty[this.keywordIndex]] = data.size;
            }
            return chartData;
        };
        SfdtExport.prototype.createChartSeries = function (element, chartSeries) {
            var data = element.chartSeries;
            var type = element.chartType;
            for (var i = 0; i < data.length; i++) {
                var yData = data[i];
                var series = this.writeChartSeries(yData, type);
                chartSeries.push(series);
            }
        };
        SfdtExport.prototype.writeChartSeries = function (series, type) {
            var isPieType = (type === 'Pie' || type === 'Doughnut');
            var chartSeries = {};
            var errorBar = {};
            var errorBarData = series.errorBar;
            chartSeries[index_2.dataPointsProperty[this.keywordIndex]] = [];
            chartSeries[index_2.seriesNameProperty[this.keywordIndex]] = series.seriesName;
            if (isPieType) {
                if (!ej2_base_1.isNullOrUndefined(series.firstSliceAngle)) {
                    chartSeries[index_2.firstSliceAngleProperty[this.keywordIndex]] = series.firstSliceAngle;
                }
                if (type === 'Doughnut') {
                    chartSeries[index_2.holeSizeProperty[this.keywordIndex]] = series.doughnutHoleSize;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(series.dataLabels.labelPosition)) {
                var dataLabel = this.writeChartDataLabels(series.dataLabels);
                chartSeries[index_2.dataLabelProperty[this.keywordIndex]] = dataLabel;
            }
            if (!ej2_base_1.isNullOrUndefined(series.seriesFormat.markerStyle)) {
                var seriesFormat = {};
                var format = series.seriesFormat;
                seriesFormat[index_2.markerStyleProperty[this.keywordIndex]] = format.markerStyle;
                seriesFormat[index_2.markerSizeProperty[this.keywordIndex]] = format.numberValue;
                seriesFormat[index_2.markerColorProperty[this.keywordIndex]] = format.markerColor;
                chartSeries[index_2.seriesFormatProperty[this.keywordIndex]] = seriesFormat;
            }
            if (!ej2_base_1.isNullOrUndefined(errorBarData.type)) {
                errorBar[index_2.typeProperty[this.keywordIndex]] = errorBarData.type;
                errorBar[index_2.directionProperty[this.keywordIndex]] = errorBarData.direction;
                errorBar[index_2.endStyleProperty[this.keywordIndex]] = errorBarData.endStyle;
                errorBar[index_2.numberValueProperty[this.keywordIndex]] = errorBarData.numberValue;
                chartSeries[index_2.errorBarProperty[this.keywordIndex]] = errorBar;
            }
            if (series.trendLines.length > 0) {
                chartSeries[index_2.trendLinesProperty[this.keywordIndex]] = [];
                for (var i = 0; i < series.trendLines.length; i++) {
                    var trendLine = this.writeChartTrendLines(series.trendLines[i]);
                    chartSeries[index_2.trendLinesProperty[this.keywordIndex]].push(trendLine);
                }
            }
            for (var i = 0; i < series.chartDataFormat.length; i++) {
                var format = this.writeChartDataFormat(series.chartDataFormat[i]);
                chartSeries[index_2.dataPointsProperty[this.keywordIndex]].push(format);
            }
            return chartSeries;
        };
        SfdtExport.prototype.writeChartDataLabels = function (dataLabels) {
            var dataLabel = {};
            dataLabel[index_2.positionProperty[this.keywordIndex]] = dataLabels.position;
            dataLabel[index_2.fontNameProperty[this.keywordIndex]] = dataLabels.fontName;
            dataLabel[index_2.fontColorProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertArgbToRgb(dataLabels.fontColor);
            dataLabel[index_2.fontSizeProperty[this.keywordIndex]] = dataLabels.fontSize;
            dataLabel[index_2.isLegendKeyProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(dataLabels.isLegendKey, this.keywordIndex);
            dataLabel[index_2.isBubbleSizeProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(dataLabels.isBubbleSize, this.keywordIndex);
            dataLabel[index_2.isCategoryNameProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(dataLabels.isCategoryName, this.keywordIndex);
            dataLabel[index_2.isSeriesNameProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(dataLabels.isSeriesName, this.keywordIndex);
            dataLabel[index_2.isValueProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(dataLabels.isValue, this.keywordIndex);
            dataLabel[index_2.isPercentageProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(dataLabels.isPercentage, this.keywordIndex);
            dataLabel[index_2.isLeaderLinesProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(dataLabels.isLeaderLines, this.keywordIndex);
            return dataLabel;
        };
        SfdtExport.prototype.writeChartTrendLines = function (trendLines) {
            var trendLine = {};
            trendLine[index_2.nameProperty[this.keywordIndex]] = trendLines.trendLineName;
            trendLine[index_2.typeProperty[this.keywordIndex]] = trendLines.trendLineType;
            trendLine[index_2.forwardProperty[this.keywordIndex]] = trendLines.forwardValue;
            trendLine[index_2.backwardProperty[this.keywordIndex]] = trendLines.backwardValue;
            trendLine[index_2.interceptProperty[this.keywordIndex]] = trendLines.interceptValue;
            trendLine[index_2.isDisplayEquationProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(trendLines.isDisplayEquation, this.keywordIndex);
            trendLine[index_2.isDisplayRSquaredProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(trendLines.isDisplayRSquared, this.keywordIndex);
            return trendLine;
        };
        SfdtExport.prototype.writeLines = function (paragraph, lineIndex, offset, inlines) {
            var startIndex = lineIndex;
            var endParagraph = this.endLine instanceof page_1.LineWidget && this.endLine.paragraph === paragraph;
            var endIndex = endParagraph ? this.endLine.indexInOwner : paragraph.childWidgets.length - 1;
            for (var i = startIndex; i <= endIndex; i++) {
                var child = paragraph.childWidgets[i];
                if (this.endLine === child || (lineIndex === i && offset !== 0)) {
                    this.writeLine(child, (this.startLine !== this.endLine && child !== this.startLine) ? 0 : offset, inlines);
                }
                else {
                    this.writeInlines(paragraph, child, inlines);
                }
            }
            return endParagraph;
        };
        SfdtExport.prototype.writeLine = function (line, offset, inlines) {
            this.contentInline = [];
            var isContentStarted = false;
            var contentControl = false;
            var isEnd = line === this.endLine;
            var lineWidget = line;
            var started = false;
            var ended = false;
            var length = 0;
            for (var j = 0; j < lineWidget.children.length; j++) {
                var element = lineWidget.children[j];
                if (element instanceof page_1.ListTextElementBox) {
                    continue;
                }
                var inline = undefined;
                length += element.length;
                started = length > offset;
                if (element instanceof page_1.ContentControl) {
                    if (!started) {
                        isContentStarted = element.type === 0 ? true : false;
                    }
                    contentControl = true;
                }
                if (element instanceof page_1.TextElementBox && element.hasOwnProperty('contentControlProperties') && started && !contentControl) {
                    isContentStarted = true;
                }
                if (element instanceof page_1.ContentControl) {
                    if (isContentStarted) {
                        if (element.type === 1) {
                            isContentStarted = false;
                        }
                    }
                    if (contentControl) {
                        if (element.type === 1) {
                            contentControl = false;
                        }
                    }
                }
                ended = isEnd && length >= this.endOffset;
                if (!started || isContentStarted) {
                    continue;
                }
                if (element instanceof page_1.ContentControl || this.startContent || this.blockContent) {
                    if (ended) {
                        this.startContent = false;
                        break;
                    }
                    this.writeInlinesContentControl(element, line, inlines, j);
                    continue;
                }
                inline = this.writeInline(element);
                if (!ej2_base_1.isNullOrUndefined(inline)) {
                    inlines[inlines.length] = inline;
                    if (length > offset || ended) {
                        if (inline.hasOwnProperty(index_2.textProperty[this.keywordIndex])) {
                            var startIndex = length - element.length;
                            var indexInInline = offset - startIndex;
                            var endIndex = ended ? this.endOffset - startIndex : element.length;
                            inline[index_2.textProperty[this.keywordIndex]] = inline[index_2.textProperty[this.keywordIndex]].substring(indexInInline, endIndex);
                        }
                        offset = -1;
                    }
                }
                if (ended) {
                    break;
                }
            }
        };
        SfdtExport.prototype.writeInlinesFootNote = function (paragraph, element, line, inlines) {
            this.isWriteInlinesFootNote = true;
            var inline = {};
            inline[index_2.footnoteTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getFootnoteTypeEnumValue(element.footnoteType) : element.footnoteType;
            inline[index_2.characterFormatProperty[this.keywordIndex]] = {};
            inline[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(element.characterFormat);
            inline[index_2.blocksProperty[this.keywordIndex]] = [];
            for (var i = 0; i < element.bodyWidget.childWidgets.length; i++) {
                this.writeBlock(element.bodyWidget.childWidgets[i], 0, inline[index_2.blocksProperty[this.keywordIndex]]);
            }
            inline[index_2.symbolCodeProperty[this.keywordIndex]] = element.symbolCode;
            inline[index_2.symbolFontNameProperty[this.keywordIndex]] = element.symbolFontName;
            inline[index_2.customMarkerProperty[this.keywordIndex]] = element.customMarker;
            this.writeInlineRevisions(inline, element);
            this.isWriteInlinesFootNote = false;
            return inline;
        };
        SfdtExport.prototype.writeInlinesContentControl = function (element, lineWidget, inlines, i) {
            if (element instanceof page_1.ContentControl) {
                if (element.contentControlWidgetType === 'Block') {
                    this.isBlockClosed = false;
                    if (this.blockContent && element.type === 0) {
                        this.nestedBlockContent = true;
                        return true;
                    }
                    else if (this.nestedBlockContent && element.type === 1) {
                        this.nestedBlockContent = false;
                        return true;
                    }
                    this.blockContent = (element.type === 0) ? true : false;
                    if (lineWidget.children[i - 1] instanceof page_1.ContentControl) {
                        if (lineWidget.children[i - 1].contentControlWidgetType === 'Block') {
                            this.blockContent = true;
                        }
                    }
                    if (!this.blockContent) {
                        this.isBlockClosed = true;
                    }
                    return true;
                }
            }
            if (element instanceof page_1.ContentControl) {
                if (this.startContent && element.type === 0) {
                    this.nestedContent = true;
                    return true;
                }
                else if (this.startContent && this.nestedContent) {
                    var inline = {};
                    inline[index_2.inlinesProperty[this.keywordIndex]] = this.contentInline;
                    if (this.contentInline.length > 0) {
                        var nestedContent = this.nestedContentProperty(lineWidget.children[i + 1], inline);
                        inlines.push(nestedContent);
                        this.contentInline = [];
                    }
                    if (this.multipleLineContent) {
                        inline = inlines[inlines.length - 1];
                        this.nestedContentProperty(lineWidget.children[i + 1], inline);
                        this.multipleLineContent = false;
                    }
                    this.nestedContent = false;
                    return true;
                }
                this.contentType = element.contentControlWidgetType;
                this.startContent = (element.type === 0) ? true : false;
                return true;
            }
            if (this.startContent && ((this.contentType === 'Inline'))) {
                if (this.multipleLineContent) {
                    this.inlineContentControl(element, lineWidget.children[i + 1], inlines);
                    this.contentInline = [];
                }
                else {
                    var contentinline = this.inlineContentControl(element, lineWidget.children[i + 1]);
                    if (!ej2_base_1.isNullOrUndefined(contentinline)) {
                        if (this.nestedContent && this.multipleLineContent) {
                            var inline = {};
                            inline[index_2.inlinesProperty[this.keywordIndex]] = this.contentInline;
                            inlines.push(inline);
                            this.contentInline = [];
                        }
                        else {
                            inlines.push(contentinline);
                            this.contentInline = [];
                            return false;
                        }
                    }
                }
            }
            else {
                var inline = this.writeInline(element);
                if (!ej2_base_1.isNullOrUndefined(inline)) {
                    inlines.push(inline);
                }
            }
        };
        SfdtExport.prototype.createParagraph = function (paragraphWidget) {
            var paragraph = {};
            var isParaSelected = false;
            var isListPara = false;
            if (this.documentHelper.selection && !this.documentHelper.selection.isEmpty && !this.isExport) {
                var endPos = this.documentHelper.selection.end;
                if (!this.documentHelper.selection.isForward) {
                    endPos = this.documentHelper.selection.start;
                }
                var lastLine = endPos.paragraph.childWidgets[endPos.paragraph.childWidgets.length - 1];
                isListPara = !ej2_base_1.isNullOrUndefined(paragraphWidget.paragraphFormat.listFormat.list);
                isParaSelected = this.documentHelper.selection.isParagraphLastLine(lastLine) && endPos.currentWidget === lastLine
                    && (endPos.offset === this.documentHelper.selection.getLineLength(lastLine) + 1 || (!(paragraphWidget.indexInOwner == endPos.paragraph.indexInOwner) && isListPara));
            }
            else {
                isParaSelected = true;
            }
            paragraph[index_2.paragraphFormatProperty[this.keywordIndex]] = this.writeParagraphFormat(isParaSelected ? paragraphWidget.paragraphFormat : new paragraph_format_1.WParagraphFormat(paragraphWidget));
            paragraph[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(isParaSelected ? paragraphWidget.characterFormat : new index_1.WCharacterFormat(paragraphWidget));
            paragraph[index_2.inlinesProperty[this.keywordIndex]] = [];
            return paragraph;
        };
        SfdtExport.prototype.writeCharacterFormat = function (format, isInline) {
            var characterFormat = {};
            editor_helper_1.HelperMethods.writeCharacterFormat(characterFormat, isInline, format, this.keywordIndex);
            characterFormat[index_2.boldBidiProperty[this.keywordIndex]] = isInline ? editor_helper_1.HelperMethods.getBoolInfo(format.boldBidi, this.keywordIndex) : format.getValue('boldBidi');
            characterFormat[index_2.italicBidiProperty[this.keywordIndex]] = isInline ? editor_helper_1.HelperMethods.getBoolInfo(format.italicBidi, this.keywordIndex) : format.getValue('italicBidi');
            characterFormat[index_2.fontSizeBidiProperty[this.keywordIndex]] = isInline ? format.fontSizeBidi : format.getValue('fontSizeBidi');
            if (format.revisions.length > 0) {
                characterFormat[index_2.revisionIdsProperty[this.keywordIndex]] = [];
                for (var x = 0; x < format.revisions.length; x++) {
                    characterFormat[index_2.revisionIdsProperty[this.keywordIndex]].push(format.revisions[x].revisionID);
                }
            }
            if (this.writeInlineStyles && !isInline) {
                characterFormat[index_2.inlineFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(format, true);
            }
            return characterFormat;
        };
        SfdtExport.prototype.writeParagraphFormat = function (format, isInline) {
            var paragraphFormat = {};
            this.keywordIndex = ej2_base_1.isNullOrUndefined(this.keywordIndex) ? 0 : this.keywordIndex;
            editor_helper_1.HelperMethods.writeParagraphFormat(paragraphFormat, isInline, format, this.keywordIndex);
            paragraphFormat[index_2.listFormatProperty[this.keywordIndex]] = this.writeListFormat(format.listFormat, isInline);
            paragraphFormat[index_2.tabsProperty[this.keywordIndex]] = this.writeTabs(format.tabs);
            if (this.writeInlineStyles && !isInline) {
                paragraphFormat[index_2.inlineFormatProperty[this.keywordIndex]] = this.writeParagraphFormat(format, true);
            }
            return paragraphFormat;
        };
        SfdtExport.prototype.writeThemes = function (source) {
            var themes = {};
            themes[index_2.fontSchemeProperty[this.keywordIndex]] = {};
            themes[index_2.fontSchemeProperty[this.keywordIndex]][index_2.fontSchemeNameProperty[this.keywordIndex]] = source.fontScheme.fontSchemeName;
            themes[index_2.fontSchemeProperty[this.keywordIndex]][index_2.majorFontSchemeProperty[this.keywordIndex]] = this.writeMajorMinorFontScheme(source.fontScheme.majorFontScheme);
            themes[index_2.fontSchemeProperty[this.keywordIndex]][index_2.minorFontSchemeProperty[this.keywordIndex]] = this.writeMajorMinorFontScheme(source.fontScheme.minorFontScheme);
            return themes;
        };
        SfdtExport.prototype.writeMajorMinorFontScheme = function (source) {
            var majorMinorFontScheme = {};
            majorMinorFontScheme[index_2.fontSchemeListProperty[this.keywordIndex]] = this.writeFontSchemeList(source.fontSchemeList);
            var keys = source.fontTypeface.keys;
            var fontTypeface = {};
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                fontTypeface[key] = source.fontTypeface.get(key);
            }
            majorMinorFontScheme[index_2.fontTypefaceProperty[this.keywordIndex]] = fontTypeface;
            return majorMinorFontScheme;
        };
        SfdtExport.prototype.writeFontSchemeList = function (source) {
            var _this = this;
            var fontSchemeStructs = [];
            source.forEach(function (val) {
                var schemeStruct = {};
                schemeStruct[index_2.nameProperty[_this.keywordIndex]] = val.name;
                schemeStruct[index_2.typefaceProperty[_this.keywordIndex]] = val.typeface;
                schemeStruct[index_2.panoseProperty[_this.keywordIndex]] = val.panose;
                fontSchemeStructs.push(schemeStruct);
            });
            return fontSchemeStructs;
        };
        SfdtExport.prototype.writeTabs = function (tabStops) {
            if (ej2_base_1.isNullOrUndefined(tabStops) || tabStops.length < 1) {
                return undefined;
            }
            var tabs = [];
            for (var i = 0; i < tabStops.length; i++) {
                var tabStop = tabStops[i];
                var tab = {};
                tab[index_2.positionProperty[this.keywordIndex]] = tabStop.position;
                tab[index_2.deletePositionProperty[this.keywordIndex]] = tabStop.deletePosition;
                tab[index_2.tabJustificationProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTabJustificationEnumValue(tabStop.tabJustification) : tabStop.tabJustification;
                tab[index_2.tabLeaderProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTabLeaderEnumValue(tabStop.tabLeader) : tabStop.tabLeader;
                tabs.push(tab);
            }
            return tabs;
        };
        SfdtExport.prototype.writeListFormat = function (format, isInline) {
            var listFormat = {};
            var listIdValue = format.getValue('listId');
            if (!ej2_base_1.isNullOrUndefined(listIdValue)) {
                listFormat[index_2.listIdProperty[this.keywordIndex]] = listIdValue;
                if (ej2_base_1.isNullOrUndefined(this.lists)) {
                    this.lists = [];
                }
                if (this.lists.indexOf(format.listId) < 0) {
                    this.lists.push(format.listId);
                }
            }
            var listLevelNumber = format.getValue('listLevelNumber');
            if (!ej2_base_1.isNullOrUndefined(listLevelNumber)) {
                listFormat[index_2.listLevelNumberProperty[this.keywordIndex]] = listLevelNumber;
            }
            var nsid = format.getValue('nsid');
            if (!ej2_base_1.isNullOrUndefined(nsid)) {
                listFormat[index_2.nsidProperty] = nsid;
            }
            return listFormat;
        };
        SfdtExport.prototype.writeTable = function (tableWidget, table, index, blocks) {
            var widget = tableWidget.childWidgets[index];
            if (widget instanceof page_1.TableRowWidget) {
                if (this.writeRow(widget, table[index_2.rowsProperty[this.keywordIndex]])) {
                    return undefined;
                }
            }
            var next = tableWidget;
            do {
                tableWidget = next;
                next = tableWidget.nextSplitWidget;
            } while (next instanceof page_2.BlockWidget);
            next = tableWidget.nextRenderedWidget;
            return (next instanceof page_2.BlockWidget && next.containerWidget.index === tableWidget.containerWidget.index) ? next : undefined;
        };
        SfdtExport.prototype.writeRow = function (rowWidget, rows) {
            var next = rowWidget;
            do {
                rowWidget = next;
                next = this.writeRowInternal(next, rows);
                if (rowWidget === next) {
                    return true;
                }
            } while (next instanceof page_1.TableRowWidget);
            return false;
        };
        SfdtExport.prototype.writeRowInternal = function (rowWidget, rows) {
            if (!(rowWidget instanceof page_1.TableRowWidget)) {
                return rowWidget;
            }
            if (!rowWidget.isCellsHaveSameWidthUnit()) {
                rowWidget.updateUniformWidthUnitForCells();
            }
            var row = this.createRow(rowWidget);
            rows.push(row);
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                var widget = rowWidget.childWidgets[i];
                if (widget instanceof page_1.TableCellWidget) {
                    if (rowWidget.index === widget.rowIndex
                        && (ej2_base_1.isNullOrUndefined(this.startColumnIndex) || widget.columnIndex >= this.startColumnIndex)
                        && (ej2_base_1.isNullOrUndefined(this.endColumnIndex) || widget.columnIndex < this.endColumnIndex)) {
                        if (this.writeCell(widget, row[index_2.cellsProperty[this.keywordIndex]])) {
                            return rowWidget;
                        }
                    }
                }
            }
            var next = rowWidget;
            do {
                rowWidget = next;
                next = rowWidget.nextRenderedWidget;
                if (!ej2_base_1.isNullOrUndefined(rowWidget.ownerTable.bodyWidget) && next && ((rowWidget.ownerTable.index !== next.ownerTable.index &&
                    rowWidget.ownerTable.bodyWidget.sectionIndex === next.ownerTable.bodyWidget.sectionIndex)
                    || rowWidget.ownerTable.bodyWidget.sectionIndex !== next.ownerTable.bodyWidget.sectionIndex)) {
                    next = undefined;
                }
            } while (next instanceof page_1.TableRowWidget && next.index === rowWidget.index);
            return next;
        };
        SfdtExport.prototype.writeCell = function (cellWidget, cells) {
            var cell = this.createCell(cellWidget);
            cells.push(cell);
            var firstBlock = cellWidget.firstChild;
            do {
                firstBlock = this.writeBlock(firstBlock, 0, cell[index_2.blocksProperty[this.keywordIndex]]);
            } while (firstBlock);
            return this.endCell instanceof page_1.TableCellWidget ? this.endCell.cellFormat === cellWidget.cellFormat : false;
        };
        SfdtExport.prototype.createTable = function (tableWidget) {
            var table = {};
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = 0;
            }
            table[index_2.rowsProperty[this.keywordIndex]] = [];
            table[index_2.gridProperty[this.keywordIndex]] = [];
            for (var i = 0; i < tableWidget.tableHolder.columns.length; i++) {
                table[index_2.gridProperty[this.keywordIndex]][i] = tableWidget.tableHolder.columns[i].preferredWidth;
            }
            table[index_2.tableFormatProperty[this.keywordIndex]] = this.writeTableFormat(tableWidget.tableFormat, this.keywordIndex);
            table[index_2.descriptionProperty[this.keywordIndex]] = tableWidget.tableFormat.description;
            table[index_2.titleProperty[this.keywordIndex]] = tableWidget.tableFormat.title;
            table[index_2.columnCountProperty[this.keywordIndex]] = tableWidget.tableHolder.columns.length;
            this.writeTablePositioning(table, tableWidget);
            return table;
        };
        SfdtExport.prototype.writeTablePositioning = function (table, tableWidget) {
            if (tableWidget.wrapTextAround) {
                table[index_2.wrapTextAroundProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(tableWidget.wrapTextAround, this.keywordIndex);
                table[index_2.positioningProperty[this.keywordIndex]] = {};
                table[index_2.positioningProperty[this.keywordIndex]][index_2.allowOverlapProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(tableWidget.positioning.allowOverlap, this.keywordIndex);
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.distanceBottom)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.distanceBottomProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(tableWidget.positioning.distanceBottom);
                }
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.distanceLeft)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.distanceLeftProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(tableWidget.positioning.distanceLeft);
                }
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.distanceRight)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.distanceRightProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(tableWidget.positioning.distanceRight);
                }
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.distanceTop)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.distanceTopProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.convertPixelToPoint(tableWidget.positioning.distanceTop);
                }
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.verticalAlignment)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.verticalAlignmentProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTableVerticalPositionEnumValue(tableWidget.positioning.verticalAlignment) : tableWidget.positioning.verticalAlignment;
                }
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.verticalOrigin)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.verticalOriginProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTableVerticalRelationEnumValue(tableWidget.positioning.verticalOrigin) : tableWidget.positioning.verticalOrigin;
                }
                table[index_2.positioningProperty[this.keywordIndex]][index_2.verticalPositionProperty[this.keywordIndex]] = tableWidget.positioning.verticalPosition;
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.horizontalAlignment)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.horizontalAlignmentProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTableHorizontalPositionEnumValue(tableWidget.positioning.horizontalAlignment) : tableWidget.positioning.horizontalAlignment;
                }
                if (!ej2_base_1.isNullOrUndefined(tableWidget.positioning.horizontalOrigin)) {
                    table[index_2.positioningProperty[this.keywordIndex]][index_2.horizontalOriginProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getTableHorizontalRelationEnumValue(tableWidget.positioning.horizontalOrigin) : tableWidget.positioning.horizontalOrigin;
                }
                table[index_2.positioningProperty[this.keywordIndex]][index_2.horizontalPositionProperty[this.keywordIndex]] = tableWidget.positioning.horizontalPosition;
            }
        };
        SfdtExport.prototype.createRow = function (rowWidget) {
            var row = {};
            row[index_2.cellsProperty[this.keywordIndex]] = [];
            row[index_2.rowFormatProperty[this.keywordIndex]] = this.writeRowFormat(rowWidget.rowFormat, this.keywordIndex);
            if (rowWidget.hasOwnProperty('contentControlProperties')) {
                row[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(rowWidget.contentControlProperties);
            }
            return row;
        };
        SfdtExport.prototype.createCell = function (cellWidget) {
            var cell = {};
            cell[index_2.blocksProperty[this.keywordIndex]] = [];
            cell[index_2.cellFormatProperty[this.keywordIndex]] = this.writeCellFormat(cellWidget.cellFormat, this.keywordIndex);
            cell[index_2.columnIndexProperty[this.keywordIndex]] = cellWidget.columnIndex;
            if (cellWidget.hasOwnProperty('contentControlProperties')) {
                cell[index_2.contentControlPropertiesProperty[this.keywordIndex]] = this.contentControlProperty(cellWidget.contentControlProperties);
            }
            return cell;
        };
        SfdtExport.prototype.writeShading = function (wShading, keyIndex) {
            var shading = {};
            shading[index_2.backgroundColorProperty[keyIndex]] = wShading.hasValue('backgroundColor') ? wShading.backgroundColor : undefined;
            shading[index_2.foregroundColorProperty[keyIndex]] = wShading.hasValue('foregroundColor') ? wShading.foregroundColor : undefined;
            shading[index_2.textureProperty[keyIndex]] = wShading.hasValue('textureStyle') ?
                keyIndex == 1 ? this.getTextureStyleEnumValue(wShading.textureStyle) : wShading.textureStyle : undefined;
            return shading;
        };
        SfdtExport.prototype.writeBorders = function (wBorders, keyIndex) {
            var borders = {};
            borders[index_2.topProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.top, keyIndex);
            borders[index_2.leftProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.left, keyIndex);
            borders[index_2.rightProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.right, keyIndex);
            borders[index_2.bottomProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.bottom, keyIndex);
            borders[index_2.diagonalDownProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.diagonalDown, keyIndex);
            borders[index_2.diagonalUpProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.diagonalUp, keyIndex);
            borders[index_2.horizontalProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.horizontal, keyIndex);
            borders[index_2.verticalProperty[keyIndex]] = editor_helper_1.HelperMethods.writeBorder(wBorders.vertical, keyIndex);
            return borders;
        };
        SfdtExport.prototype.writeCellFormat = function (wCellFormat, keyIndex) {
            var cellFormat = {};
            cellFormat[index_2.bordersProperty[keyIndex]] = this.writeBorders(wCellFormat.borders, keyIndex);
            cellFormat[index_2.shadingProperty[keyIndex]] = this.writeShading(wCellFormat.shading, keyIndex);
            cellFormat[index_2.topMarginProperty[keyIndex]] = wCellFormat.hasValue('topMargin') ? wCellFormat.topMargin : undefined;
            cellFormat[index_2.rightMarginProperty[keyIndex]] = wCellFormat.hasValue('rightMargin') ? wCellFormat.rightMargin : undefined;
            cellFormat[index_2.leftMarginProperty[keyIndex]] = wCellFormat.hasValue('leftMargin') ? wCellFormat.leftMargin : undefined;
            cellFormat[index_2.bottomMarginProperty[keyIndex]] = wCellFormat.hasValue('bottomMargin') ? wCellFormat.bottomMargin : undefined;
            cellFormat[index_2.preferredWidthProperty[keyIndex]] = wCellFormat.hasValue('preferredWidth') ? wCellFormat.preferredWidth : undefined;
            cellFormat[index_2.preferredWidthTypeProperty[keyIndex]] = wCellFormat.hasValue('preferredWidthType') ? keyIndex == 1 ? this.getWidthTypeEnumValue(wCellFormat.preferredWidthType) : wCellFormat.preferredWidthType : undefined;
            cellFormat[index_2.cellWidthProperty[keyIndex]] = wCellFormat.hasValue('cellWidth') ? wCellFormat.cellWidth : undefined;
            cellFormat[index_2.columnSpanProperty[keyIndex]] = wCellFormat.columnSpan;
            cellFormat[index_2.rowSpanProperty[keyIndex]] = wCellFormat.rowSpan;
            cellFormat[index_2.verticalAlignmentProperty[keyIndex]] = wCellFormat.hasValue('verticalAlignment') ? keyIndex == 1 ? this.getCellVerticalAlignmentEnumValue(wCellFormat.verticalAlignment) : wCellFormat.verticalAlignment : undefined;
            return cellFormat;
        };
        SfdtExport.prototype.writeRowFormat = function (wRowFormat, keyIndex) {
            var rowFormat = {};
            var revisionIds = [];
            this.assignRowFormat(rowFormat, wRowFormat, keyIndex);
            for (var j = 0; j < wRowFormat.revisions.length; j++) {
                rowFormat[index_2.revisionIdsProperty[keyIndex]] = this.writeRowRevisions(wRowFormat.revisions[j], revisionIds);
            }
            return rowFormat;
        };
        SfdtExport.prototype.assignRowFormat = function (rowFormat, wRowFormat, keyIndex) {
            rowFormat[index_2.heightProperty[keyIndex]] = wRowFormat.hasValue('height') ? wRowFormat.height : undefined;
            rowFormat[index_2.allowBreakAcrossPagesProperty[keyIndex]] = wRowFormat.hasValue('allowBreakAcrossPages') ? editor_helper_1.HelperMethods.getBoolInfo(wRowFormat.allowBreakAcrossPages, this.keywordIndex) : undefined;
            rowFormat[index_2.heightTypeProperty[keyIndex]] = wRowFormat.hasValue('heightType') ? this.keywordIndex == 1 ? this.getHeighTypeEnumValue(wRowFormat.heightType) : wRowFormat.heightType : undefined;
            rowFormat[index_2.isHeaderProperty[keyIndex]] = wRowFormat.hasValue('isHeader') ? editor_helper_1.HelperMethods.getBoolInfo(wRowFormat.isHeader, this.keywordIndex) : undefined;
            rowFormat[index_2.bordersProperty[keyIndex]] = this.writeBorders(wRowFormat.borders, keyIndex);
            rowFormat[index_2.gridBeforeProperty[keyIndex]] = wRowFormat.gridBefore;
            rowFormat[index_2.gridBeforeWidthProperty[keyIndex]] = wRowFormat.hasValue('gridBeforeWidth') ? wRowFormat.gridBeforeWidth : undefined;
            rowFormat[index_2.gridBeforeWidthTypeProperty[keyIndex]] = wRowFormat.hasValue('gridBeforeWidthType') ? this.keywordIndex == 1 ? this.getWidthTypeEnumValue(wRowFormat.gridBeforeWidthType) : wRowFormat.gridBeforeWidthType : undefined;
            rowFormat[index_2.gridAfterProperty[keyIndex]] = wRowFormat.gridAfter;
            rowFormat[index_2.gridAfterWidthProperty[keyIndex]] = wRowFormat.hasValue('gridAfterWidth') ? wRowFormat.gridAfterWidth : undefined;
            rowFormat[index_2.gridAfterWidthTypeProperty[keyIndex]] = wRowFormat.hasValue('gridAfterWidthType') ? this.keywordIndex == 1 ? this.getWidthTypeEnumValue(wRowFormat.gridAfterWidthType) : wRowFormat.gridAfterWidthType : undefined;
            rowFormat[index_2.leftMarginProperty[keyIndex]] = wRowFormat.hasValue('leftMargin') ? wRowFormat.leftMargin : undefined;
            rowFormat[index_2.topMarginProperty[keyIndex]] = wRowFormat.hasValue('topMargin') ? wRowFormat.topMargin : undefined;
            rowFormat[index_2.rightMarginProperty[keyIndex]] = wRowFormat.hasValue('rightMargin') ? wRowFormat.rightMargin : undefined;
            rowFormat[index_2.bottomMarginProperty[keyIndex]] = wRowFormat.hasValue('bottomMargin') ? wRowFormat.bottomMargin : undefined;
            rowFormat[index_2.leftIndentProperty[keyIndex]] = wRowFormat.hasValue('leftIndent') ? wRowFormat.leftIndent : undefined;
        };
        SfdtExport.prototype.writeRowRevisions = function (wrevisions, revisionIds) {
            if (this.selectedRevisionId.indexOf(wrevisions.revisionID) === -1) {
                this.selectedRevisionId.push(wrevisions.revisionID);
            }
            revisionIds.push(wrevisions.revisionID);
            return revisionIds;
        };
        SfdtExport.prototype.writeTableFormat = function (wTableFormat, keyIndex) {
            var tableFormat = {};
            tableFormat[index_2.bordersProperty[keyIndex]] = this.writeBorders(wTableFormat.borders, keyIndex);
            tableFormat[index_2.shadingProperty[keyIndex]] = this.writeShading(wTableFormat.shading, keyIndex);
            tableFormat[index_2.cellSpacingProperty[keyIndex]] = wTableFormat.hasValue('cellSpacing') ? wTableFormat.cellSpacing : undefined;
            tableFormat[index_2.leftIndentProperty[keyIndex]] = wTableFormat.hasValue('leftIndent') ? wTableFormat.leftIndent : undefined;
            tableFormat[index_2.tableAlignmentProperty[keyIndex]] = wTableFormat.hasValue('tableAlignment') ? this.keywordIndex == 1 ? this.getTableAlignmentEnumValue(wTableFormat.tableAlignment) : wTableFormat.tableAlignment : undefined;
            tableFormat[index_2.topMarginProperty[keyIndex]] = wTableFormat.hasValue('topMargin') ? wTableFormat.topMargin : undefined;
            tableFormat[index_2.rightMarginProperty[keyIndex]] = wTableFormat.hasValue('rightMargin') ? wTableFormat.rightMargin : undefined;
            tableFormat[index_2.leftMarginProperty[keyIndex]] = wTableFormat.hasValue('leftMargin') ? wTableFormat.leftMargin : undefined;
            tableFormat[index_2.bottomMarginProperty[keyIndex]] = wTableFormat.hasValue('bottomMargin') ? wTableFormat.bottomMargin : undefined;
            tableFormat[index_2.preferredWidthProperty[keyIndex]] = wTableFormat.hasValue('preferredWidth') ? wTableFormat.preferredWidth : undefined;
            tableFormat[index_2.preferredWidthTypeProperty[keyIndex]] = wTableFormat.hasValue('preferredWidthType') ? this.keywordIndex == 1 ? this.getWidthTypeEnumValue(wTableFormat.preferredWidthType) : wTableFormat.preferredWidthType : undefined;
            tableFormat[index_2.bidiProperty[keyIndex]] = wTableFormat.hasValue('bidi') ? editor_helper_1.HelperMethods.getBoolInfo(wTableFormat.bidi, this.keywordIndex) : undefined;
            tableFormat[index_2.allowAutoFitProperty[keyIndex]] = wTableFormat.hasValue('allowAutoFit') ? editor_helper_1.HelperMethods.getBoolInfo(wTableFormat.allowAutoFit, this.keywordIndex) : undefined;
            tableFormat[index_2.styleNameProperty[keyIndex]] = !ej2_base_1.isNullOrUndefined(wTableFormat.styleName) ? wTableFormat.styleName : undefined;
            return tableFormat;
        };
        SfdtExport.prototype.footnotes = function (documentHelper) {
            this.isWriteEndFootNote = true;
            for (var i = 0; i < documentHelper.footnotes.separator.length; i++) {
                this.seprators(documentHelper);
            }
            this.isWriteEndFootNote = false;
        };
        SfdtExport.prototype.seprators = function (documentHelper) {
            if (documentHelper.footnotes.separator.length > 0) {
                this.document[index_2.footnotesProperty[this.keywordIndex]] = {};
                this.document[index_2.footnotesProperty[this.keywordIndex]][index_2.separatorProperty[this.keywordIndex]] = [];
                for (var i = 0; i < documentHelper.footnotes.separator.length; i++) {
                    this.writeBlock(documentHelper.footnotes.separator[i], 0, this.document[index_2.footnotesProperty[this.keywordIndex]][index_2.separatorProperty[this.keywordIndex]]);
                }
            }
            if (documentHelper.footnotes.continuationSeparator.length > 0) {
                this.document[index_2.footnotesProperty[this.keywordIndex]][index_2.continuationSeparatorProperty[this.keywordIndex]] = [];
                for (var i = 0; i < documentHelper.footnotes.continuationSeparator.length; i++) {
                    this.writeBlock(documentHelper.footnotes.continuationSeparator[i], 0, this.document[index_2.footnotesProperty[this.keywordIndex]][index_2.continuationSeparatorProperty[this.keywordIndex]]);
                }
            }
            if (documentHelper.footnotes.continuationNotice.length > 0) {
                this.document[index_2.footnotesProperty[this.keywordIndex]][index_2.continuationNoticeProperty[this.keywordIndex]] = [];
                for (var i = 0; i < documentHelper.footnotes.continuationNotice.length; i++) {
                    this.writeBlock(documentHelper.footnotes.continuationNotice[i], 0, this.document[index_2.footnotesProperty[this.keywordIndex]][index_2.continuationNoticeProperty[this.keywordIndex]]);
                }
            }
        };
        SfdtExport.prototype.endnotes = function (documentHelper) {
            this.isWriteEndFootNote = true;
            for (var i = 0; i < this.documentHelper.endnotes.separator.length; i++) {
                this.endnoteSeparator(documentHelper);
            }
            this.isWriteEndFootNote = false;
        };
        SfdtExport.prototype.endnoteSeparator = function (documentHelper) {
            if (documentHelper.endnotes.separator.length > 0) {
                this.document[index_2.endnotesProperty[this.keywordIndex]] = {};
                this.document[index_2.endnotesProperty[this.keywordIndex]][index_2.separatorProperty[this.keywordIndex]] = [];
                for (var i = 0; i < documentHelper.endnotes.separator.length; i++) {
                    this.writeBlock(documentHelper.endnotes.separator[i], 0, this.document[index_2.endnotesProperty[this.keywordIndex]][index_2.separatorProperty[this.keywordIndex]]);
                }
            }
            if (documentHelper.endnotes.continuationSeparator.length > 0) {
                this.document[index_2.endnotesProperty[this.keywordIndex]][index_2.continuationSeparatorProperty[this.keywordIndex]] = [];
                for (var i = 0; i < documentHelper.endnotes.continuationSeparator.length; i++) {
                    this.writeBlock(documentHelper.endnotes.continuationSeparator[i], 0, this.document[index_2.endnotesProperty[this.keywordIndex]][index_2.continuationSeparatorProperty[this.keywordIndex]]);
                }
            }
            if (documentHelper.endnotes.continuationNotice.length > 0) {
                this.document[index_2.endnotesProperty[this.keywordIndex]][index_2.continuationNoticeProperty[this.keywordIndex]] = [];
                for (var i = 0; i < documentHelper.endnotes.continuationNotice.length; i++) {
                    this.writeBlock(documentHelper.endnotes.continuationNotice[i], 0, this.document[index_2.endnotesProperty[this.keywordIndex]][index_2.continuationNoticeProperty[this.keywordIndex]]);
                }
            }
        };
        SfdtExport.prototype.writeStyles = function (documentHelper) {
            var styles = [];
            this.document[index_2.stylesProperty[this.keywordIndex]] = [];
            for (var i = 0; i < documentHelper.styles.length; i++) {
                this.document[index_2.stylesProperty[this.keywordIndex]].push(this.writeStyle(documentHelper.styles.getItem(i)));
            }
        };
        SfdtExport.prototype.writeStyle = function (style) {
            var wStyle = {};
            wStyle[index_2.nameProperty[this.keywordIndex]] = style.name;
            if (style.type === 'Paragraph') {
                wStyle[index_2.typeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getStyleTypeEnumValue(style.type) : style.type;
                wStyle[index_2.paragraphFormatProperty[this.keywordIndex]] = this.writeParagraphFormat(style.paragraphFormat);
                wStyle[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(style.characterFormat);
            }
            if (style.type === 'Character') {
                wStyle[index_2.typeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getStyleTypeEnumValue(style.type) : style.type;
                wStyle[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(style.characterFormat);
            }
            if (!ej2_base_1.isNullOrUndefined(style.basedOn)) {
                wStyle[index_2.basedOnProperty[this.keywordIndex]] = style.basedOn.name;
            }
            if (!ej2_base_1.isNullOrUndefined(style.link)) {
                wStyle[index_2.linkProperty[this.keywordIndex]] = style.link.name;
            }
            if (!ej2_base_1.isNullOrUndefined(style.next)) {
                wStyle[index_2.nextProperty[this.keywordIndex]] = style.next.name;
            }
            return wStyle;
        };
        SfdtExport.prototype.writeRevisions = function (documentHelper) {
            this.document[index_2.revisionsProperty[this.keywordIndex]] = [];
            for (var i = 0; i < documentHelper.owner.revisions.changes.length; i++) {
                if (this.isExport ||
                    (!this.isExport && !this.owner.enableTrackChanges && this.selectedRevisionId.indexOf(documentHelper.owner.revisions.changes[i].revisionID) !== -1)) {
                    this.document[index_2.revisionsProperty[this.keywordIndex]].push(this.writeRevision(documentHelper.owner.revisions.changes[i]));
                }
            }
        };
        SfdtExport.prototype.writeRevision = function (revisions) {
            var revision = {};
            revision[index_2.authorProperty[this.keywordIndex]] = revisions.author;
            revision[index_2.dateProperty[this.keywordIndex]] = revisions.date;
            revision[index_2.revisionTypeProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getRevisionTypeEnumValue(revisions.revisionType) : revisions.revisionType;
            revision[index_2.revisionIdProperty[this.keywordIndex]] = revisions.revisionID;
            return revision;
        };
        SfdtExport.prototype.writeComments = function (documentHelper) {
            this.document[index_2.commentsProperty[this.keywordIndex]] = [];
            for (var i = 0; i < documentHelper.comments.length; i++) {
                if (this.isExport ||
                    (!this.isExport && this.selectedCommentsId.indexOf(this.documentHelper.comments[i].commentId) !== -1)) {
                    this.document[index_2.commentsProperty[this.keywordIndex]].push(this.writeComment(this.documentHelper.comments[i]));
                }
            }
        };
        SfdtExport.prototype.writeCustomXml = function (documentHelper) {
            this.document[index_2.customXmlProperty[this.keywordIndex]] = [];
            for (var i = 0; i < documentHelper.customXmlData.length; i++) {
                var customXml = {};
                var key = documentHelper.customXmlData.keys[i];
                customXml[index_2.itemIDProperty[this.keywordIndex]] = key;
                var xmlValue = this.documentHelper.customXmlData.get(key);
                customXml[index_2.xmlProperty[this.keywordIndex]] = xmlValue;
                this.document[index_2.customXmlProperty[this.keywordIndex]].push(customXml);
            }
        };
        SfdtExport.prototype.writeImages = function (documentHelper) {
            var _this = this;
            this.document[index_2.imagesProperty[this.keywordIndex]] = {};
            documentHelper.images.keys.forEach(function (key) {
                var base64ImageString = _this.documentHelper.images.get(key);
                _this.document[index_2.imagesProperty[_this.keywordIndex]][key] = base64ImageString;
            });
        };
        SfdtExport.prototype.writeComment = function (comments) {
            var comment = {};
            comment[index_2.commentIdProperty[this.keywordIndex]] = comments.commentId;
            comment[index_2.authorProperty[this.keywordIndex]] = comments.author;
            comment[index_2.dateProperty[this.keywordIndex]] = comments.date;
            comment[index_2.blocksProperty[this.keywordIndex]] = [];
            comment[index_2.blocksProperty[this.keywordIndex]].push(this.commentInlines(comments.text));
            comment[index_2.doneProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(comments.isResolved, this.keywordIndex);
            comment[index_2.replyCommentsProperty[this.keywordIndex]] = [];
            for (var i = 0; i < comments.replyComments.length; i++) {
                comment[index_2.replyCommentsProperty[this.keywordIndex]].push(this.writeComment(comments.replyComments[i]));
            }
            return comment;
        };
        SfdtExport.prototype.commentInlines = function (ctext) {
            var blocks = {};
            blocks[index_2.inlinesProperty[this.keywordIndex]] = [];
            var inlines = {};
            inlines[index_2.textProperty[this.keywordIndex]] = ctext;
            blocks[index_2.inlinesProperty[this.keywordIndex]].push(inlines);
            return blocks;
        };
        SfdtExport.prototype.writeLists = function (documentHelper) {
            var abstractLists = [];
            this.document[index_2.listsProperty[this.keywordIndex]] = [];
            for (var i = 0; i < documentHelper.lists.length; i++) {
                var list = documentHelper.lists[i];
                if (this.lists.indexOf(list.listId) > -1) {
                    this.document[index_2.listsProperty[this.keywordIndex]].push(this.writeList(list));
                    if (abstractLists.indexOf(list.abstractListId) < 0) {
                        abstractLists.push(list.abstractListId);
                    }
                }
            }
            this.document[index_2.abstractListsProperty[this.keywordIndex]] = [];
            for (var i = 0; i < documentHelper.abstractLists.length; i++) {
                var abstractList = documentHelper.abstractLists[i];
                if (abstractLists.indexOf(abstractList.abstractListId) > -1) {
                    this.document[index_2.abstractListsProperty[this.keywordIndex]].push(this.writeAbstractList(abstractList));
                }
            }
        };
        SfdtExport.prototype.writeAbstractList = function (wAbstractList) {
            var abstractList = {};
            abstractList[index_2.abstractListIdProperty[this.keywordIndex]] = wAbstractList.abstractListId;
            abstractList[index_2.nsidProperty] = wAbstractList.nsid;
            abstractList[index_2.levelsProperty[this.keywordIndex]] = [];
            for (var i = 0; i < wAbstractList.levels.length; i++) {
                abstractList[index_2.levelsProperty[this.keywordIndex]][i] = this.writeListLevel(wAbstractList.levels[i]);
            }
            return abstractList;
        };
        SfdtExport.prototype.writeList = function (wList) {
            var list = {};
            if (!ej2_base_1.isNullOrUndefined(wList)) {
                list[index_2.abstractListIdProperty[this.keywordIndex]] = wList.abstractListId;
                list[index_2.levelOverridesProperty[this.keywordIndex]] = [];
                for (var i = 0; i < wList.levelOverrides.length; i++) {
                    list[index_2.levelOverridesProperty[this.keywordIndex]].push(this.writeLevelOverrides(wList.levelOverrides[i]));
                }
                list[index_2.listIdProperty[this.keywordIndex]] = wList.listId;
                list[index_2.nsidProperty] = wList.nsid;
            }
            return list;
        };
        SfdtExport.prototype.writeLevelOverrides = function (wlevel) {
            var levelOverrides = {};
            levelOverrides[index_2.levelNumberProperty[this.keywordIndex]] = wlevel.levelNumber;
            if (wlevel.overrideListLevel) {
                levelOverrides[index_2.overrideListLevelProperty[this.keywordIndex]] = this.writeListLevel(wlevel.overrideListLevel);
            }
            levelOverrides[index_2.startAtProperty[this.keywordIndex]] = wlevel.startAt;
            return levelOverrides;
        };
        SfdtExport.prototype.writeListLevel = function (wListLevel) {
            var listLevel = {};
            listLevel[index_2.characterFormatProperty[this.keywordIndex]] = this.writeCharacterFormat(wListLevel.characterFormat);
            listLevel[index_2.paragraphFormatProperty[this.keywordIndex]] = this.writeParagraphFormat(wListLevel.paragraphFormat);
            listLevel[index_2.isLegalStyleNumberingProperty[this.keywordIndex]] = editor_helper_1.HelperMethods.getBoolInfo(wListLevel.isLegalStyleNumbering, this.keywordIndex);
            listLevel[index_2.followCharacterProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getFollowCharacterType(wListLevel.followCharacter) : wListLevel.followCharacter;
            listLevel[index_2.listLevelPatternProperty[this.keywordIndex]] = this.keywordIndex == 1 ? this.getListLevelPatternEnumValue(wListLevel.listLevelPattern) : wListLevel.listLevelPattern;
            listLevel[index_2.numberFormatProperty[this.keywordIndex]] = wListLevel.numberFormat;
            listLevel[index_2.restartLevelProperty[this.keywordIndex]] = wListLevel.restartLevel;
            listLevel[index_2.startAtProperty[this.keywordIndex]] = wListLevel.startAt;
            return listLevel;
        };
        SfdtExport.prototype.getParentBlock = function (widget) {
            if (widget.isInsideTable) {
                widget = this.owner.documentHelper.layout.getParentTable(widget);
            }
            return widget;
        };
        SfdtExport.prototype.getParentCell = function (cell) {
            while (cell.ownerTable.isInsideTable) {
                cell = cell.ownerTable.associatedCell;
            }
            return cell;
        };
        SfdtExport.prototype.getWidthTypeEnumValue = function (widthType) {
            switch (widthType) {
                case 'Auto':
                    return 0;
                case 'Percent':
                    return 1;
                case 'Point':
                    return 2;
            }
        };
        SfdtExport.prototype.getTableAlignmentEnumValue = function (tableAlignment) {
            switch (tableAlignment) {
                case 'Left':
                    return 0;
                case 'Center':
                    return 1;
                case 'Right':
                    return 2;
            }
        };
        SfdtExport.prototype.getTextureStyleEnumValue = function (textureStyle) {
            switch (textureStyle) {
                case 'TextureNone':
                    return 0;
                case 'Texture2Pt5Percent':
                    return 1;
                case 'Texture5Percent':
                    return 2;
                case 'Texture7Pt5Percent':
                    return 3;
                case 'Texture10Percent':
                    return 4;
                case 'Texture12Pt5Percent':
                    return 5;
                case 'Texture15Percent':
                    return 6;
                case 'Texture17Pt5Percent':
                    return 7;
                case 'Texture20Percent':
                    return 8;
                case 'Texture22Pt5Percent':
                    return 9;
                case 'Texture25Percent':
                    return 10;
                case 'Texture27Pt5Percent':
                    return 11;
                case 'Texture30Percent':
                    return 12;
                case 'Texture32Pt5Percent':
                    return 13;
                case 'Texture35Percent':
                    return 14;
                case 'Texture37Pt5Percent':
                    return 15;
                case 'Texture40Percent':
                    return 16;
                case 'Texture42Pt5Percent':
                    return 17;
                case 'Texture45Percent':
                    return 18;
                case 'Texture47Pt5Percent':
                    return 19;
                case 'Texture50Percent':
                    return 20;
                case 'Texture52Pt5Percent':
                    return 21;
                case 'Texture55Percent':
                    return 22;
                case 'Texture57Pt5Percent':
                    return 23;
                case 'Texture60Percent':
                    return 24;
                case 'Texture62Pt5Percent':
                    return 25;
                case 'Texture65Percent':
                    return 26;
                case 'Texture67Pt5Percent':
                    return 27;
                case 'Texture70Percent':
                    return 28;
                case 'Texture72Pt5Percent':
                    return 29;
                case 'Texture75Percent':
                    return 30;
                case 'Texture77Pt5Percent':
                    return 31;
                case 'Texture80Percent':
                    return 32;
                case 'Texture82Pt5Percent':
                    return 33;
                case 'Texture85Percent':
                    return 34;
                case 'Texture87Pt5Percent':
                    return 35;
                case 'Texture90Percent':
                    return 36;
                case 'Texture92Pt5Percent':
                    return 37;
                case 'Texture95Percent':
                    return 38;
                case 'Texture97Pt5Percent':
                    return 39;
                case 'TextureSolid':
                    return 40;
                case 'TextureDarkHorizontal':
                    return 41;
                case 'TextureDarkVertical':
                    return 42;
                case 'TextureDarkDiagonalDown':
                    return 43;
                case 'TextureDarkDiagonalUp':
                    return 44;
                case 'TextureDarkCross':
                    return 45;
                case 'TextureDarkDiagonalCross':
                    return 46;
                case 'TextureHorizontal':
                    return 47;
                case 'TextureVertical':
                    return 48;
                case 'TextureDiagonalDown':
                    return 49;
                case 'TextureDiagonalUp':
                    return 50;
                case 'TextureCross':
                    return 51;
                case 'TextureDiagonalCross':
                    return 52;
            }
        };
        SfdtExport.prototype.getHeighTypeEnumValue = function (heightType) {
            switch (heightType) {
                case 'AtLeast':
                    return 0;
                case 'Exactly':
                    return 1;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getCellVerticalAlignmentEnumValue = function (cellVerticalAlignment) {
            switch (cellVerticalAlignment) {
                case 'Top':
                    return 0;
                case 'Center':
                    return 1;
                case 'Bottom':
                    return 2;
            }
        };
        SfdtExport.prototype.getListLevelPatternEnumValue = function (listLevelPattern) {
            switch (listLevelPattern) {
                case 'None':
                    return 0;
                case 'KanjiDigit':
                case 'Arabic':
                    return 1;
                case 'UpRoman':
                    return 2;
                case 'LowRoman':
                    return 3;
                case 'UpLetter':
                    return 4;
                case 'LowLetter':
                    return 5;
                case 'Ordinal':
                    return 6;
                case 'Number':
                    return 7;
                case 'OrdinalText':
                    return 8;
                case 'LeadingZero':
                    return 9;
                case 'Bullet':
                    return 10;
                case 'FarEast':
                    return 11;
                case 'Special':
                    return 12;
            }
        };
        SfdtExport.prototype.getStyleTypeEnumValue = function (styleType) {
            switch (styleType) {
                case 'Paragraph':
                    return 0;
                case 'Character':
                    return 1;
            }
        };
        SfdtExport.prototype.getProtectionTypeEnumValue = function (protectionType) {
            switch (protectionType) {
                case 'NoProtection':
                    return 0;
                case 'ReadOnly':
                    return 1;
                case 'FormFieldsOnly':
                    return 2;
                case 'CommentsOnly':
                    return 3;
                case 'RevisionsOnly':
                    return 4;
            }
        };
        SfdtExport.prototype.getRevisionTypeEnumValue = function (revisionType) {
            switch (revisionType) {
                case 'Insertion':
                    return 1;
                case 'Deletion':
                    return 2;
                case 'MoveTo':
                    return 3;
                case 'MoveFrom':
                    return 4;
            }
        };
        SfdtExport.prototype.getFootnoteTypeEnumValue = function (footnoteType) {
            switch (footnoteType) {
                case 'Footnote':
                    return 0;
                case 'Endnote':
                    return 1;
            }
        };
        SfdtExport.prototype.getFootnoteRestartIndexEnumValue = function (footnoteRestartIndex) {
            switch (footnoteRestartIndex) {
                case 'DoNotRestart':
                    return 0;
                case 'RestartForEachSection':
                    return 1;
                case 'RestartForEachPage':
                    return 2;
            }
        };
        SfdtExport.prototype.getFootEndNoteNumberFormatEnumValue = function (footEndNoteNumberFormat) {
            switch (footEndNoteNumberFormat) {
                case 'Arabic':
                    return 0;
                case 'UpperCaseRoman':
                    return 1;
                case 'LowerCaseRoman':
                    return 2;
                case 'UpperCaseLetter':
                    return 3;
                case 'LowerCaseLetter':
                    return 4;
            }
        };
        SfdtExport.prototype.getTextVerticalAlignmentEnumValue = function (textVerticalAlignment) {
            switch (textVerticalAlignment) {
                case 'Top':
                    return 0;
                case 'Center':
                    return 1;
                case 'Bottom':
                    return 2;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getShapeVerticalAlignmentEnumValue = function (shapeVerticalAlignment) {
            switch (shapeVerticalAlignment) {
                case 'None':
                    return 0;
                case 'Top':
                    return 1;
                case 'Center':
                    return 2;
                case 'Bottom':
                    return 3;
                case 'Inline':
                    return 4;
                case 'Inside':
                    return 5;
                case 'Outside':
                    return 6;
            }
        };
        SfdtExport.prototype.getShapeHorizontalAlignmentEnumValue = function (shapeHorizontalAlignment) {
            switch (shapeHorizontalAlignment) {
                case 'None':
                    return 0;
                case 'Center':
                    return 1;
                case 'Inside':
                    return 2;
                case 'Left':
                    return 3;
                case 'Outside':
                    return 4;
                case 'Right':
                    return 5;
            }
        };
        SfdtExport.prototype.getVerticalOriginEnumValue = function (verticalOrigin) {
            switch (verticalOrigin) {
                case 'Paragraph':
                    return 0;
                case 'BottomMargin':
                    return 1;
                case 'InsideMargin':
                    return 2;
                case 'Line':
                    return 3;
                case 'Margin':
                    return 4;
                case 'OutsideMargin':
                    return 5;
                case 'Page':
                    return 6;
                case 'TopMargin':
                    return 7;
            }
        };
        SfdtExport.prototype.getHorizontalOriginEnumValue = function (horizontalOrigin) {
            switch (horizontalOrigin) {
                case 'Column':
                    return 0;
                case 'Character':
                    return 1;
                case 'InsideMargin':
                    return 2;
                case 'LeftMargin':
                    return 3;
                case 'Margin':
                    return 4;
                case 'OutsideMargin':
                    return 5;
                case 'Page':
                    return 6;
                case 'RightMargin':
                    return 7;
            }
        };
        SfdtExport.prototype.getTableVerticalRelationEnumValue = function (tableRelation) {
            switch (tableRelation) {
                case 'Paragraph':
                    return 0;
                case 'Margin':
                    return 1;
                case 'Page':
                    return 2;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getTableHorizontalRelationEnumValue = function (tableRelation) {
            switch (tableRelation) {
                case 'Column':
                    return 0;
                case 'Margin':
                    return 1;
                case 'Page':
                    return 2;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getTableVerticalPositionEnumValue = function (tableVerticalPosition) {
            switch (tableVerticalPosition) {
                case 'None':
                    return 0;
                case 'Top':
                    return 1;
                case 'Center':
                    return 2;
                case 'Bottom':
                    return 3;
                case 'Inside':
                    return 4;
                case 'Outside':
                    return 5;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getTableHorizontalPositionEnumValue = function (tableHorizontalPosition) {
            switch (tableHorizontalPosition) {
                case 'Left':
                    return 0;
                case 'Center':
                    return 1;
                case 'Inside':
                    return 2;
                case 'Outside':
                    return 3;
                case 'Right':
                    return 4;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getLineDashStyleEnumValue = function (lineDashStyle) {
            switch (lineDashStyle) {
                case 'Solid':
                    return 0;
                case 'Dash':
                    return 1;
                case 'DashDot':
                    return 2;
                case 'DashDotDot':
                    return 3;
                case 'DashDotGEL':
                    return 4;
                case 'DashGEL':
                    return 5;
                case 'Dot':
                    return 6;
                case 'DotGEL':
                    return 7;
                case 'LongDashDotDotGEL':
                    return 8;
                case 'LongDashDotGEL':
                    return 9;
                case 'LongDashGEL':
                    return 10;
            }
        };
        SfdtExport.prototype.getHorizontalPositionAbsEnumValue = function (horizontalPositionAbs) {
            switch (horizontalPositionAbs) {
                case 'Left':
                    return 0;
                case 'Center':
                    return 1;
                case 'Right':
                    return 2;
                case 'Inside':
                    return 3;
                case 'Outside':
                    return 4;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getTabJustificationEnumValue = function (tabJustification) {
            switch (tabJustification) {
                case 'Left':
                    return 0;
                case 'Bar':
                    return 1;
                case 'Center':
                    return 2;
                case 'Decimal':
                    return 3;
                case 'List':
                    return 4;
                case 'Right':
                    return 5;
            }
        };
        SfdtExport.prototype.getTabLeaderEnumValue = function (tabLeader) {
            switch (tabLeader) {
                case 'None':
                    return 0;
                case 'Single':
                    return 1;
                case 'Dot':
                    return 2;
                case 'Hyphen':
                    return 3;
                case 'Underscore':
                    return 4;
            }
        };
        SfdtExport.prototype.getTextFormFieldTypeEnumValue = function (textFormFieldType) {
            switch (textFormFieldType) {
                case 'Text':
                    return 0;
                case 'Number':
                    return 1;
                case 'Date':
                    return 2;
                case 'Calculation':
                    return 3;
            }
        };
        SfdtExport.prototype.getTextFormFieldFormatEnumValue = function (textFormFieldFormat) {
            switch (textFormFieldFormat) {
                case 'None':
                    return 0;
                case 'FirstCapital':
                    return 1;
                case 'Lowercase':
                    return 2;
                case 'Uppercase':
                    return 3;
                case 'Titlecase':
                    return 4;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getCheckBoxSizeTypeEnumValue = function (checkBoxSizeType) {
            switch (checkBoxSizeType) {
                case 'Auto':
                    return 0;
                case 'Exactly':
                    return 1;
            }
        };
        SfdtExport.prototype.getContentControlAppearanceEnumValue = function (contentControlAppearance) {
            switch (contentControlAppearance) {
                case 'BoundingBox':
                    return 1;
                case 'Hidden':
                    return 2;
                case 'Tags':
                    return 3;
                default:
                    return 1;
            }
        };
        SfdtExport.prototype.getContentControlTypeEnumValue = function (contentControlType) {
            switch (contentControlType) {
                case 'RichText':
                    return 0;
                case 'BuildingBlockGallery':
                    return 1;
                case 'CheckBox':
                    return 2;
                case 'ComboBox':
                    return 3;
                case 'Date':
                    return 4;
                case 'DropDownList':
                    return 5;
                case 'Group':
                    return 6;
                case 'Picture':
                    return 7;
                case 'RepeatingSection':
                    return 8;
                case 'Text':
                    return 9;
            }
        };
        SfdtExport.prototype.getDateCalendarTypeEnumValue = function (dateCalendarType) {
            switch (dateCalendarType) {
                case 'Gregorian':
                    return 0;
                case 'GregorianArabic':
                    return 1;
                case 'GregorianEnglish':
                    return 2;
                case 'GregorianMiddleEastFrench':
                    return 3;
                case 'GregorianTransliteratedEnglish':
                    return 4;
                case 'GregorianTransliteratedFrench':
                    return 5;
                case 'Hebrew':
                    return 6;
                case 'Hijri':
                    return 7;
                case 'Japan':
                    return 8;
                case 'Korean':
                    return 9;
                case 'Saka':
                    return 10;
                case 'Taiwan':
                    return 11;
                case 'Thai':
                    return 12;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getDateStorageFormatEnumValue = function (dateStorageFormat) {
            switch (dateStorageFormat) {
                case 'DateStorageDate':
                    return 1;
                case 'DateStorageDateTime':
                    return 2;
                case 'DateStorageText':
                    return 3;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getTextWrappingStyleEnumValue = function (textWrappingStyle) {
            switch (textWrappingStyle) {
                case 'Inline':
                    return 0;
                case 'InFrontOfText':
                    return 1;
                case 'Square':
                    return 2;
                case 'TopAndBottom':
                    return 3;
                case 'Behind':
                    return 4;
                default:
                    return 0;
            }
        };
        SfdtExport.prototype.getTextWrappingTypeEnumValue = function (textWrappingType) {
            switch (textWrappingType) {
                case 'Both':
                    return 0;
                case 'Left':
                    return 1;
                case 'Right':
                    return 2;
                case 'Largest':
                    return 3;
            }
        };
        SfdtExport.prototype.getCompatibilityModeEnumValue = function (compatibilityMode) {
            switch (compatibilityMode) {
                case 'Word2013':
                    return 0;
                case 'Word2003':
                    return 1;
                case 'Word2007':
                    return 2;
                case 'Word2010':
                    return 3;
            }
        };
        SfdtExport.prototype.getLineFormatTypeEnumValue = function (lineFormatType) {
            switch (lineFormatType) {
                case 'Solid':
                    return 0;
                case 'Patterned':
                    return 1;
                case 'Gradient':
                    return 2;
                case 'None':
                    return 3;
            }
        };
        SfdtExport.prototype.getAutoShapeTypeEnumValue = function (autoShapeType) {
            switch (autoShapeType) {
                case 'Rectangle':
                    return 1;
                case 'RoundedRectangle':
                    return 2;
                case 'StraightConnector':
                    return 3;
                default:
                    return 1;
            }
        };
        SfdtExport.prototype.getFollowCharacterType = function (followCharacterType) {
            switch (followCharacterType) {
                case 'Tab':
                    return 0;
                case 'Space':
                    return 1;
                case 'None':
                    return 2;
            }
        };
        SfdtExport.prototype.destroy = function () {
            this.lists = undefined;
            this.endLine = undefined;
            this.startLine = undefined;
            this.endOffset = undefined;
            this.documentHelper = undefined;
        };
        return SfdtExport;
    }());
    exports.SfdtExport = SfdtExport;
});
