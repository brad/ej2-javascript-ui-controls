define(["require", "exports", "@syncfusion/ej2-base", "../../base/dictionary", "../../base/types", "../editor/editor-helper", "../format/index", "../list/list-level", "./page", "./viewer", "./text-helper"], function (require, exports, ej2_base_1, dictionary_1, types_1, editor_helper_1, index_1, list_level_1, page_1, viewer_1, text_helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CHECK_BOX_FACTOR = 1.35;
    var Layout = (function () {
        function Layout(documentHelper) {
            this.islayoutFootnote = false;
            this.isMultiColumnDoc = false;
            this.allowLayout = true;
            this.isReplaceAll = false;
            this.isTextFormat = false;
            this.isSectionBreakCont = false;
            this.isReplacingAll = false;
            this.footHeight = 0;
            this.existFootnoteHeight = 0;
            this.isfootMove = false;
            this.footnoteHeight = 0;
            this.isTableFootNote = false;
            this.isRelayout = false;
            this.isRelayoutneed = false;
            this.isOverlapFloatTable = false;
            this.isInitialLoad = true;
            this.isInsertFormField = false;
            this.fieldBegin = undefined;
            this.maxTextHeight = 0;
            this.maxBaseline = 0;
            this.maxTextBaseline = 0;
            this.isFieldCode = false;
            this.isRtlFieldCode = false;
            this.isRTLLayout = false;
            this.currentCell = undefined;
            this.isFootnoteContentChanged = false;
            this.isEndnoteContentChanged = false;
            this.keepWithNext = false;
            this.is2013Justification = false;
            this.nextElementToLayout = undefined;
            this.endNoteHeight = 0;
            this.isMultiColumnSplit = false;
            this.skipUpdateContainerWidget = false;
            this.isIFfield = false;
            this.isLayoutWhole = false;
            this.isBidiReLayout = false;
            this.defaultTabWidthPixel = 48;
            this.isRelayoutFootnote = false;
            this.isRelayoutOverlap = false;
            this.skipRelayoutOverlap = false;
            this.isWrapText = false;
            this.isYPositionUpdated = false;
            this.isXPositionUpdated = false;
            this.hasFloatingElement = false;
            this.isFootNoteLayoutStart = false;
            this.wrapPosition = [];
            this.shiftedFloatingItemsFromTable = [];
            this.isDocumentContainsRtl = false;
            this.layoutedFootnoteElement = [];
            this.documentHelper = documentHelper;
        }
        Layout.prototype.isSameStyle = function (currentParagraph, isAfterSpacing) {
            var nextOrPrevSibling = undefined;
            if (isAfterSpacing) {
                if (currentParagraph.nextWidget instanceof page_1.ParagraphWidget) {
                    nextOrPrevSibling = currentParagraph.nextWidget;
                }
            }
            else {
                if (currentParagraph.previousWidget instanceof page_1.ParagraphWidget) {
                    nextOrPrevSibling = currentParagraph.previousWidget;
                }
            }
            if (ej2_base_1.isNullOrUndefined(nextOrPrevSibling)) {
                if (currentParagraph.paragraphFormat.contextualSpacing && (currentParagraph.isInsideTable ? (!this.documentHelper.allowSpaceOfSameStyleInTable || this.documentHelper.compatibilityMode === 'Word2013') : false)) {
                    if (currentParagraph.index === 0) {
                        nextOrPrevSibling = this.updateFirstParagraphSpacingBasedOnContextualSpacing(currentParagraph, isAfterSpacing);
                    }
                    else if (currentParagraph.index === currentParagraph.associatedCell.childWidgets.length - 1) {
                        nextOrPrevSibling = this.updateLastParagraphSpacingBasedOnContextualSpacing(currentParagraph);
                        if (nextOrPrevSibling === currentParagraph) {
                            return true;
                        }
                    }
                }
                if (ej2_base_1.isNullOrUndefined(nextOrPrevSibling)) {
                    return false;
                }
            }
            if (nextOrPrevSibling instanceof page_1.ParagraphWidget && currentParagraph.paragraphFormat.baseStyle === nextOrPrevSibling.paragraphFormat.baseStyle) {
                if (currentParagraph.paragraphFormat.listFormat.listId >= 0 && nextOrPrevSibling.paragraphFormat.listFormat.listId >= 0) {
                    if (!currentParagraph.paragraphFormat.contextualSpacing) {
                        if (isAfterSpacing && currentParagraph.paragraphFormat.spaceAfterAuto) {
                            return true;
                        }
                        else if (!isAfterSpacing && currentParagraph.paragraphFormat.spaceBeforeAuto) {
                            return true;
                        }
                    }
                }
                return currentParagraph.paragraphFormat.contextualSpacing;
            }
            return false;
        };
        Layout.prototype.updateFirstParagraphSpacingBasedOnContextualSpacing = function (paragraph, isAfterSpacing) {
            var ownerCell = paragraph.associatedCell;
            var ownerRow = ownerCell.ownerRow;
            var ownerTable = ownerRow.ownerTable;
            var nextOrPrevSibling;
            if (isAfterSpacing) {
                nextOrPrevSibling = ej2_base_1.isNullOrUndefined(paragraph.nextRenderedWidget) ? (!ej2_base_1.isNullOrUndefined(ownerCell.nextRenderedWidget) ? ownerCell.nextRenderedWidget.firstChild : undefined) : paragraph.nextRenderedWidget;
            }
            else {
                nextOrPrevSibling = ej2_base_1.isNullOrUndefined(paragraph.previousRenderedWidget) ? (!ej2_base_1.isNullOrUndefined(ownerCell.previousRenderedWidget) ? ownerCell.previousRenderedWidget.firstChild : undefined) : paragraph.previousRenderedWidget;
            }
            if (ownerCell.index === 0 && paragraph.index === 0) {
                if (ownerRow.index === 0) {
                    if (ownerTable.isInsideTable && ownerTable.index == 0) {
                        nextOrPrevSibling = this.checkOwnerTablePrevItem(ownerTable, paragraph);
                    }
                    else {
                        var ownerTablePrevSibling = ownerTable.previousRenderedWidget;
                        return ownerTablePrevSibling;
                    }
                }
                else {
                    return nextOrPrevSibling;
                }
            }
            else if (paragraph.index === 0 && !isAfterSpacing) {
                var prevCell = ownerRow.childWidgets[ownerCell.index - 1];
                var prevCelllastItem = prevCell.childWidgets[prevCell.childWidgets.length - 1];
                if (prevCelllastItem instanceof page_1.TableWidget && paragraph.paragraphFormat.baseStyle.name === "Normal" && paragraph.paragraphFormat.listFormat.listId < 0) {
                    return paragraph;
                }
            }
            return nextOrPrevSibling;
        };
        Layout.prototype.updateLastParagraphSpacingBasedOnContextualSpacing = function (paragraph) {
            var ownerCell = paragraph.associatedCell;
            var ownerRow = ownerCell.ownerRow;
            var nextCellFirstItem;
            if (ownerCell.index === ownerRow.childWidgets.length - 1 && paragraph.index === ownerCell.childWidgets.length - 1) {
                if (paragraph.paragraphFormat.baseStyle.name === "Normal" && paragraph.paragraphFormat.listFormat.listId < 0) {
                    return paragraph;
                }
            }
            else if (paragraph.index === ownerCell.childWidgets.length - 1) {
                var nextCell = ownerRow.childWidgets[ownerCell.index + 1];
                nextCellFirstItem = nextCell.firstChild;
                while (nextCellFirstItem instanceof page_1.TableWidget) {
                    nextCellFirstItem = nextCellFirstItem.childWidgets[0].childWidgets[0].childWidgets[0];
                }
            }
            return nextCellFirstItem;
        };
        Layout.prototype.checkOwnerTablePrevItem = function (ownerTable, paragraph) {
            var row = ownerTable.associatedCell.ownerRow;
            var prevSibling;
            if (row.index > 0) {
                if (paragraph.paragraphFormat.baseStyle.name === "Normal" && paragraph.paragraphFormat.listFormat.listId < 0) {
                    return paragraph;
                }
            }
            else {
                if (row.ownerTable.isInsideTable && row.ownerTable.index === 0) {
                    this.checkOwnerTablePrevItem(row.ownerTable, paragraph);
                }
                else {
                    var prevSibling_1 = row.ownerTable.previousRenderedWidget;
                    return prevSibling_1;
                }
            }
            return prevSibling;
        };
        Object.defineProperty(Layout.prototype, "viewer", {
            get: function () {
                return this.documentHelper.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        Layout.prototype.layout = function () {
        };
        Layout.prototype.destroy = function () {
            this.documentHelper = undefined;
            this.value = undefined;
            this.allowLayout = undefined;
            this.isInitialLoad = undefined;
            this.fieldBegin = undefined;
            this.maxTextHeight = undefined;
            this.maxBaseline = undefined;
            this.maxTextBaseline = undefined;
            this.isFieldCode = undefined;
            this.footnoteHeight = undefined;
            this.isMultiColumnDoc = undefined;
            this.isIFfield = undefined;
        };
        Layout.prototype.layoutItems = function (sections, isReLayout, isContinuousSection) {
            var _this = this;
            var page;
            var height = 0;
            var width = 0;
            for (var i = 0; i < sections.length; i++) {
                var section = sections[i];
                if (section.sectionFormat.numberOfColumns > 1) {
                    this.isMultiColumnDoc = true;
                }
                var nextSection = sections[i + 1];
                this.viewer.columnLayoutArea.setColumns(section.sectionFormat);
                var lastpage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
                var bodyWidget = void 0;
                if (!ej2_base_1.isNullOrUndefined(lastpage) && !ej2_base_1.isNullOrUndefined(lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1]) && lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].childWidgets.length === 0 && !ej2_base_1.isNullOrUndefined(lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].previousSplitWidget)) {
                    bodyWidget = lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].previousSplitWidget;
                }
                if (i > 0 && !ej2_base_1.isNullOrUndefined(bodyWidget) && !ej2_base_1.isNullOrUndefined(bodyWidget.lastChild) && !(bodyWidget.lastChild instanceof page_1.TableWidget) && ((this.documentHelper.compatibilityMode === 'Word2013' && bodyWidget.lastChild.isEndsWithPageBreak || bodyWidget.lastChild.isEndsWithColumnBreak)) && lastpage.bodyWidgets[0].childWidgets.length === 0) {
                    var removedPages = this.documentHelper.pages.splice(this.documentHelper.pages.length - 1, 1);
                    removedPages[0].destroy();
                    lastpage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
                }
                if ((i === 0 && !isContinuousSection) || (i !== 0 && (ej2_base_1.isNullOrUndefined(section.sectionFormat.breakCode) || section.sectionFormat.breakCode === 'NewPage' || height !== section.sectionFormat.pageHeight || width !== section.sectionFormat.pageWidth || (!ej2_base_1.isNullOrUndefined(lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].lastChild) && lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].lastChild.isEndsWithPageBreak)))) {
                    page = this.viewer.createNewPage(section);
                }
                else {
                    var clientY = this.documentHelper.viewer.clientActiveArea.y;
                    var clientHeight = this.documentHelper.viewer.clientActiveArea.height;
                    if (isContinuousSection) {
                        var section_1 = this.getBodyWidget(lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1], true);
                        var height_1 = this.getNextWidgetHeight(section_1);
                        this.viewer.updateClientArea(section_1, section_1.page);
                        clientHeight = this.viewer.clientActiveArea.height - (height_1 - this.viewer.clientActiveArea.y);
                        clientY = height_1;
                        isContinuousSection = false;
                    }
                    page = lastpage;
                    page.bodyWidgets.push(section);
                    page.bodyWidgets[page.bodyWidgets.length - 1].page = page;
                    this.documentHelper.viewer.updateClientArea(section, page);
                    this.documentHelper.viewer.clientActiveArea.y = clientY;
                    this.documentHelper.viewer.clientActiveArea.height = clientHeight;
                }
                height = section.sectionFormat.pageHeight;
                width = section.sectionFormat.pageWidth;
                this.addBodyWidget(this.viewer.clientActiveArea, section);
                if (this.documentHelper.pages.length > 1) {
                    var pageIndex = 0;
                    for (var i_1 = 0; i_1 < this.documentHelper.pages.length; i_1++) {
                        var prevPage = this.documentHelper.pages[i_1];
                        var prevSectionIndex = prevPage.sectionIndex;
                        var index = section.index;
                        if (prevSectionIndex > index || prevPage === page) {
                            break;
                        }
                        pageIndex++;
                    }
                    if (pageIndex < this.documentHelper.pages.length - 1) {
                        this.documentHelper.insertPage(pageIndex, page);
                    }
                }
                this.layoutSection(section, 0, nextSection);
            }
            if (!isReLayout) {
                this.layoutComments(this.documentHelper.comments);
            }
            this.updateFieldElements();
            if (this.documentHelper.owner.layoutType === 'Pages') {
                this.layoutEndNoteElement();
            }
            setTimeout(function () {
                if (_this.documentHelper) {
                    _this.documentHelper.isScrollHandler = true;
                    _this.documentHelper.clearContent();
                    _this.viewer.updateScrollBars();
                    _this.documentHelper.isScrollHandler = false;
                    _this.isInitialLoad = false;
                }
            }, 50);
        };
        Layout.prototype.layoutComments = function (comments) {
            if (!ej2_base_1.isNullOrUndefined(comments)) {
                this.viewer.owner.commentReviewPane.layoutComments();
            }
        };
        Layout.prototype.layoutSection = function (section, index, nextSection) {
            var block = section.firstChild;
            var nextBlock;
            var prevBlock;
            do {
                if (block instanceof page_1.TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                    && !block.tableFormat.allowAutoFit) {
                    block.calculateGrid();
                }
                if (!ej2_base_1.isNullOrUndefined(block)) {
                    this.viewer.updateClientAreaForBlock(block, true, undefined, true);
                    var bodyIndex = block.containerWidget.indexInOwner;
                    nextBlock = this.layoutBlock(block, index);
                    index = 0;
                    this.viewer.updateClientAreaForBlock(block, false);
                    prevBlock = block;
                    block = nextBlock;
                }
            } while (block);
            block = section.firstChild;
            if (this.viewer instanceof viewer_1.PageLayoutViewer && section.sectionFormat.numberOfColumns > 1 && !ej2_base_1.isNullOrUndefined(nextSection) && nextSection.sectionFormat.breakCode === 'NoBreak' && (section.sectionFormat.breakCode === 'NoBreak' || (section.sectionIndex === section.page.bodyWidgets[0].sectionIndex))) {
                if (this.getColumnBreak(section)) {
                    var splittedSection = section.getSplitWidgets();
                    var bodyWidget = splittedSection[splittedSection.length - 1];
                    if (!ej2_base_1.isNullOrUndefined(section.page.nextPage)) {
                        this.splitBodyWidgetBasedOnColumn(bodyWidget);
                    }
                    else {
                        var firstBody = this.getBodyWidget(bodyWidget, true);
                        this.viewer.updateClientArea(firstBody, firstBody.page);
                        var height = this.getNextWidgetHeight(firstBody);
                        this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                        this.viewer.clientActiveArea.y = height;
                    }
                }
                else {
                    if (!ej2_base_1.isNullOrUndefined(section.page.nextPage)) {
                        section = this.documentHelper.pages[this.documentHelper.pages.length - 1].bodyWidgets[0];
                    }
                    this.splitBodyWidgetBasedOnColumn(section);
                }
            }
            var page;
            if (block && block.bodyWidget && block.bodyWidget.page) {
                page = block.bodyWidget.page;
            }
            while (page) {
                if (page.footnoteWidget) {
                    this.layoutfootNote(page.footnoteWidget);
                    page = page.nextPage;
                }
                else {
                    page = page.nextPage;
                }
            }
            page = undefined;
            block = undefined;
        };
        Layout.prototype.reLayoutMultiColumn = function (section, isFirstBlock) {
            this.isInitialLoad = true;
            section = section.getSplitWidgets()[0];
            this.combineMultiColumnForRelayout(section);
            if (section.sectionFormat.numberOfColumns > 1) {
                this.isMultiColumnDoc = true;
            }
            this.isMultiColumnSplit = false;
            var previousSection = section.previousRenderedWidget;
            var nextSection = section.nextRenderedWidget;
            var isUpdatedClientArea = false;
            if (!isFirstBlock && !ej2_base_1.isNullOrUndefined(section.firstChild) && section.firstChild instanceof page_1.ParagraphWidget && section.y !== section.firstChild.y) {
                section.y = section.firstChild.y;
            }
            if (isFirstBlock && nextSection && section.page !== nextSection.page && section.firstChild instanceof page_1.ParagraphWidget) {
                var paragraph = section.firstChild;
                var lineHeight = 0;
                if (paragraph.isEmpty()) {
                    lineHeight = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat).Height;
                }
                else {
                    var firstLine = paragraph.childWidgets[0];
                    lineHeight = this.getMaxElementHeight(firstLine);
                }
                var previousBlock = paragraph.previousRenderedWidget;
                if (section.y === this.viewer.clientActiveArea.y && lineHeight > this.viewer.clientActiveArea.height) {
                    previousBlock = ej2_base_1.isNullOrUndefined(previousBlock) ? paragraph : previousBlock;
                    this.moveBlocksToNextPage(previousBlock);
                    this.viewer.columnLayoutArea.setColumns(section.sectionFormat);
                    this.viewer.updateClientArea(section, section.page);
                    isUpdatedClientArea = true;
                }
            }
            else if (!ej2_base_1.isNullOrUndefined(previousSection) && previousSection.page !== section.page && section.firstChild instanceof page_1.ParagraphWidget && previousSection.lastChild instanceof page_1.ParagraphWidget) {
                var previousParagraph = previousSection.lastChild;
                var paragraph = section.firstChild;
                if (section instanceof page_1.BodyWidget && previousSection.lastChild && previousParagraph instanceof page_1.ParagraphWidget && previousSection.sectionFormat.breakCode === 'NoBreak' && section.page.index !== previousSection.page.index && section.index !== previousSection.index) {
                    var bodyWidget = previousSection;
                    if (bodyWidget.sectionFormat.columns.length > 1) {
                        bodyWidget = this.getBodyWidget(bodyWidget, true);
                    }
                    var bottom = editor_helper_1.HelperMethods.round((this.getNextWidgetHeight(bodyWidget) + paragraph.height), 2);
                    if (!previousSection.lastChild.isEndsWithPageBreak && !previousSection.lastChild.isEndsWithColumnBreak
                        && bottom <= editor_helper_1.HelperMethods.round(this.viewer.clientActiveArea.bottom, 2)) {
                        var page = previousSection.page;
                        var nextPage = section.page;
                        for (var j = 0; j < nextPage.bodyWidgets.length; j++) {
                            var nextBodyWidget = nextPage.bodyWidgets[j];
                            nextPage.bodyWidgets.splice(nextPage.bodyWidgets.indexOf(nextBodyWidget), 1);
                            page.bodyWidgets.splice(page.bodyWidgets.length, 0, nextBodyWidget);
                            nextBodyWidget.page = page;
                            j--;
                        }
                        section.y = this.viewer.clientActiveArea.y;
                        this.documentHelper.removeEmptyPages();
                    }
                }
            }
            if (!isUpdatedClientArea) {
                this.viewer.columnLayoutArea.setColumns(section.sectionFormat);
                this.viewer.updateClientArea(section, section.page);
                this.viewer.clientActiveArea.height -= section.y - this.viewer.clientActiveArea.y;
                this.viewer.clientActiveArea.y = section.y;
            }
            this.addBodyWidget(this.viewer.clientActiveArea, section);
            this.clearBlockWidget(section.childWidgets, true, true, true);
            this.reLayoutMultiColumBlock(section, nextSection);
            this.isInitialLoad = false;
            var splitSections = section.getSplitWidgets();
            var lastSection = splitSections[splitSections.length - 1];
            var firstBody = this.getBodyWidget(lastSection, true);
            this.viewer.updateClientArea(firstBody, firstBody.page);
            var height = this.getNextWidgetHeight(firstBody);
            this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
            this.viewer.clientActiveArea.y = height;
            if (!ej2_base_1.isNullOrUndefined(lastSection) && !ej2_base_1.isNullOrUndefined(lastSection.nextRenderedWidget)) {
                nextSection = lastSection.nextRenderedWidget;
                var clientY = this.documentHelper.viewer.clientActiveArea.y;
                var clientHeight = this.documentHelper.viewer.clientActiveArea.height;
                this.documentHelper.viewer.updateClientArea(nextSection, nextSection.page);
                this.documentHelper.viewer.clientActiveArea.y = clientY;
                this.documentHelper.viewer.clientActiveArea.height = clientHeight;
                this.documentHelper.blockToShift = nextSection.firstChild;
            }
            if (ej2_base_1.isNullOrUndefined(lastSection.nextRenderedWidget) ||
                (!ej2_base_1.isNullOrUndefined(lastSection.nextRenderedWidget) && lastSection.sectionFormat.breakCode !== 'NoBreak' && lastSection.nextRenderedWidget.sectionFormat.pageHeight !== lastSection.sectionFormat.pageHeight && lastSection.nextRenderedWidget.sectionFormat.pageWidth !== lastSection.sectionFormat.pageWidth)) {
                this.documentHelper.blockToShift = undefined;
            }
        };
        Layout.prototype.combineMultiColumnForRelayout = function (section) {
            var splitSections = section.getSplitWidgets();
            var firstSection = splitSections[0];
            section = splitSections[splitSections.length - 1];
            while (section !== firstSection) {
                var prevSection = section.previousRenderedWidget;
                var isPreviousSplit = false;
                for (var i = 0; i < section.childWidgets.length; i++) {
                    if (section.childWidgets[i] instanceof page_1.BlockWidget && !ej2_base_1.isNullOrUndefined(section.childWidgets[i].previousSplitWidget)
                        && !ej2_base_1.isNullOrUndefined(section.childWidgets[i].previousSplitWidget.previousSplitWidget)
                        && section.childWidgets[i].previousSplitWidget.bodyWidget.page !== section.childWidgets[i].previousSplitWidget.previousSplitWidget.bodyWidget.page) {
                        isPreviousSplit = true;
                    }
                    if ((section.childWidgets[i] instanceof page_1.BlockWidget && !ej2_base_1.isNullOrUndefined(section.childWidgets[i].previousSplitWidget) && section.childWidgets[i].previousSplitWidget.bodyWidget.page === section.childWidgets[i].bodyWidget.page && !isPreviousSplit)) {
                        section.childWidgets[i].combineWidget(this.viewer);
                        if (prevSection.lastChild instanceof page_1.TableWidget) {
                            this.updateCellHeightInCombinedTable(prevSection.lastChild);
                        }
                        i--;
                        continue;
                    }
                    prevSection.childWidgets.push(section.childWidgets[i]);
                    section.childWidgets[i].containerWidget = prevSection;
                    section.childWidgets[i].containerWidget.page = prevSection.page;
                    section.childWidgets.splice(0, 1);
                    i--;
                }
                section = section.previousRenderedWidget;
            }
            this.documentHelper.removeEmptyPages();
        };
        Layout.prototype.reLayoutMultiColumBlock = function (section, nextSection) {
            var block = section.firstChild;
            var nextBlock;
            do {
                if (block instanceof page_1.TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                    && !block.tableFormat.allowAutoFit) {
                    block.calculateGrid();
                }
                if (!ej2_base_1.isNullOrUndefined(block)) {
                    this.viewer.updateClientAreaForBlock(block, true, undefined, true);
                    nextBlock = this.layoutBlock(block, 0);
                    this.viewer.updateClientAreaForBlock(block, false);
                    block = nextBlock;
                }
            } while (block && section.getSplitWidgets().indexOf(block.bodyWidget) !== -1);
            block = section.firstChild;
            if (this.viewer instanceof viewer_1.PageLayoutViewer && section.sectionFormat.numberOfColumns > 1 && !ej2_base_1.isNullOrUndefined(nextSection) && nextSection.sectionFormat.breakCode === 'NoBreak' && (section.sectionFormat.breakCode === 'NoBreak' || (section.sectionIndex === section.page.bodyWidgets[0].sectionIndex))) {
                var splittedSection = section.getSplitWidgets();
                var bodyWidget = splittedSection[splittedSection.length - 1];
                if (this.getColumnBreak(section)) {
                    if (section.page !== bodyWidget.page) {
                        this.splitBodyWidgetBasedOnColumn(bodyWidget);
                    }
                    else {
                        var firstBody = this.getBodyWidget(bodyWidget, true);
                        this.viewer.updateClientArea(firstBody, firstBody.page);
                        var height = this.getNextWidgetHeight(firstBody);
                        this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                        this.viewer.clientActiveArea.y = height;
                    }
                }
                else if (!ej2_base_1.isNullOrUndefined(section.page.nextPage)) {
                    this.splitBodyWidgetBasedOnColumn(bodyWidget);
                }
            }
        };
        Layout.prototype.splitBodyWidgetBasedOnColumn = function (section) {
            section = this.getBodyWidget(section, true);
            var firstSection = section;
            this.isMultiColumnSplit = true;
            if (!this.isInitialLoad && section.sectionFormat.equalWidth) {
                var previousStartIndex = this.documentHelper.selection.startOffset;
                var previousEndIndex = this.documentHelper.selection.endOffset;
                this.combineMultiColumn(section);
                this.layoutMultiColumnBody(section, false);
                if (previousStartIndex !== this.documentHelper.selection.startOffset) {
                    this.documentHelper.selection.select(previousStartIndex, previousEndIndex);
                }
            }
            this.combineMultiColumn(section);
            var lineCountInfo = this.getCountOrLine(section, undefined, undefined, true);
            var totalHeight = lineCountInfo.lineCount;
            var lineToBeSplit = Math.round(totalHeight / section.sectionFormat.numberOfColumns);
            while (section) {
                var lineCountInfo_1 = this.getCountOrLine(section, lineToBeSplit, true, false);
                var line = lineCountInfo_1.lineWidget;
                var lineIndexInCell = lineCountInfo_1.lineCount;
                if (!ej2_base_1.isNullOrUndefined(line)) {
                    if (line.paragraph.containerWidget instanceof page_1.BodyWidget) {
                        this.moveToNextLine(line, true, line.indexInOwner);
                    }
                    else if (line.paragraph.containerWidget instanceof page_1.TableCellWidget) {
                        var table = [line.paragraph.containerWidget.ownerTable];
                        var rows = [line.paragraph.containerWidget.ownerRow];
                        var index = line.paragraph.containerWidget.index;
                        if (table[table.length - 1].isInsideTable) {
                            table[table.length - 1] = this.getParentTable(table[table.length - 1]);
                            rows[rows.length - 1] = this.getParentRow(rows[rows.length - 1]);
                        }
                        this.updateWidgetsToTable(table, rows, rows[rows.length - 1], false, lineIndexInCell, index, true);
                        var tableWidget = table[table.length - 1];
                        var rowWidget = rows[rows.length - 1];
                        var nextRow = rowWidget.nextRenderedWidget;
                        while (nextRow) {
                            this.clearRowWidget(nextRow, true, true, false);
                            nextRow = this.layoutRow(table, nextRow);
                            nextRow = nextRow.nextRenderedWidget;
                        }
                        if (!ej2_base_1.isNullOrUndefined(tableWidget.nextRenderedWidget) && section.sectionFormat.equalWidth) {
                            this.documentHelper.blockToShift = tableWidget.nextRenderedWidget;
                            this.documentHelper.layout.shiftLayoutedItems(false);
                        }
                    }
                    var firstBody = this.getBodyWidget(line.paragraph.bodyWidget, true);
                    var lastBody = this.getBodyWidget(firstBody, false);
                    if (!firstBody.sectionFormat.equalWidth && lastBody.sectionFormat.numberOfColumns - 1 === lastBody.columnIndex) {
                        var nonEqualBody = firstBody;
                        var initialCount = (this.getCountOrLine(firstBody)).lineCount;
                        this.layoutMultiColumnBody(nonEqualBody, true);
                        var finalCount = (this.getCountOrLine(firstBody)).lineCount;
                        if (initialCount !== finalCount) {
                            this.splitBodyWidgetBasedOnColumn(firstBody);
                        }
                    }
                    this.viewer.updateClientArea(firstBody, firstBody.page);
                    var height = this.getNextWidgetHeight(firstBody);
                    this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                    this.viewer.clientActiveArea.y = height;
                    this.viewer.clientArea.y = this.viewer.clientActiveArea.y;
                    this.viewer.clientArea.height = this.viewer.clientActiveArea.height;
                }
                section = section.nextRenderedWidget;
                if (!ej2_base_1.isNullOrUndefined(section) && section.columnIndex === section.sectionFormat.numberOfColumns - 1) {
                    break;
                }
            }
            this.isMultiColumnSplit = false;
            if (!this.isInitialLoad) {
                section = this.getBodyWidget(firstSection, false);
                if (!ej2_base_1.isNullOrUndefined(section.nextRenderedWidget)) {
                    this.documentHelper.blockToShift = section.nextRenderedWidget.firstChild;
                }
            }
        };
        Layout.prototype.getColumnBreak = function (section) {
            var firstBody = this.getBodyWidget(section, true);
            if (firstBody.sectionFormat.numberOfColumns <= 1) {
                return false;
            }
            while (firstBody) {
                if (firstBody.lastChild instanceof page_1.ParagraphWidget && firstBody.lastChild.isEndsWithColumnBreak) {
                    return true;
                }
                if (ej2_base_1.isNullOrUndefined(firstBody.nextRenderedWidget) || firstBody.index !== firstBody.nextRenderedWidget.index) {
                    break;
                }
                firstBody = firstBody.nextRenderedWidget;
            }
            return false;
        };
        Layout.prototype.layoutMultiColumnBody = function (nonEqualBody, updatePosition) {
            var skipPosition = false;
            while (nonEqualBody) {
                if (!skipPosition) {
                    this.viewer.updateClientArea(nonEqualBody, nonEqualBody.page);
                    this.viewer.clientActiveArea.height -= nonEqualBody.y - this.viewer.clientActiveArea.y;
                    if (nonEqualBody instanceof page_1.FootNoteWidget) {
                        this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                        this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                    }
                    else {
                        this.viewer.clientActiveArea.y = nonEqualBody.y;
                    }
                }
                skipPosition = updatePosition ? false : true;
                for (var i = 0; i < nonEqualBody.childWidgets.length; i++) {
                    var block = nonEqualBody.childWidgets[i];
                    if (block instanceof page_1.TableWidget) {
                        this.clearTableWidget(block, true, true, true);
                    }
                    this.viewer.updateClientAreaForBlock(block, true);
                    this.layoutBlock(block, 0);
                    this.viewer.updateClientAreaForBlock(block, false);
                }
                if (nonEqualBody.columnIndex === nonEqualBody.sectionFormat.numberOfColumns - 1 || (!ej2_base_1.isNullOrUndefined(nonEqualBody.nextRenderedWidget) && nonEqualBody.sectionIndex !== nonEqualBody.nextRenderedWidget.sectionIndex)) {
                    break;
                }
                nonEqualBody = nonEqualBody.nextRenderedWidget;
            }
        };
        Layout.prototype.getNextWidgetHeight = function (body) {
            var height = 0;
            var updatedHeight = 0;
            while (body && body.childWidgets.length > 0) {
                height = body.lastChild.height;
                if (body.lastChild instanceof page_1.TableWidget) {
                    height = this.getHeight(body.lastChild);
                }
                height += body.lastChild.y;
                if (height > updatedHeight) {
                    updatedHeight = height;
                }
                if (!ej2_base_1.isNullOrUndefined(body) && body.columnIndex === body.sectionFormat.numberOfColumns - 1 || body.sectionFormat.numberOfColumns === 0 || (!ej2_base_1.isNullOrUndefined(body.nextRenderedWidget) && body.sectionIndex !== body.nextRenderedWidget.sectionIndex)) {
                    break;
                }
                body = body.nextRenderedWidget;
            }
            return updatedHeight;
        };
        Layout.prototype.getHeight = function (block) {
            var height = 0;
            for (var i = 0; i < block.childWidgets.length; i++) {
                height += block.childWidgets[i].height;
            }
            return height;
        };
        Layout.prototype.getCountOrLine = function (section, lineToBeSplit, isSplit, getHeight) {
            var totalNoOflines = 0;
            var line;
            var count = 0;
            var skip = false;
            var maxHeight = 0;
            var lineIndexInCell = 0;
            var splitCountLine;
            var lineMargin = 0;
            while (section) {
                for (var i = 0; i < section.childWidgets.length; i++) {
                    var block = section.childWidgets[i];
                    if (block instanceof page_1.ParagraphWidget) {
                        for (var j = 0; j < block.childWidgets.length; j++) {
                            var lineWidget = block.childWidgets[j];
                            lineMargin = 0;
                            if (!ej2_base_1.isNullOrUndefined(lineWidget.margin)) {
                                lineMargin = lineWidget.margin.top + lineWidget.margin.bottom;
                            }
                            if (!isSplit) {
                                totalNoOflines++;
                                maxHeight += lineWidget.height - lineMargin;
                            }
                            else {
                                maxHeight += lineWidget.height - lineMargin;
                                if (Math.round(lineToBeSplit) < Math.round(maxHeight)) {
                                    line = block.childWidgets[j];
                                    skip = true;
                                    count = 0;
                                    break;
                                }
                                else {
                                    count++;
                                }
                            }
                        }
                    }
                    else if (block instanceof page_1.TableWidget) {
                        splitCountLine = this.getCountOrLineTable(block, lineToBeSplit, isSplit, maxHeight, false, getHeight);
                        if (getHeight) {
                            maxHeight += splitCountLine.lineCount;
                        }
                        else if (!isSplit) {
                            totalNoOflines += splitCountLine.lineCount;
                        }
                        else if (ej2_base_1.isNullOrUndefined(splitCountLine.lineWidget)) {
                            maxHeight = splitCountLine.lineCount;
                        }
                        else {
                            line = splitCountLine.lineWidget;
                            lineIndexInCell = splitCountLine.lineCount;
                            skip = true;
                        }
                    }
                    if (skip && isSplit) {
                        break;
                    }
                }
                if (skip && isSplit) {
                    break;
                }
                if (!ej2_base_1.isNullOrUndefined(section.nextRenderedWidget) && section.index !== section.nextRenderedWidget.index) {
                    break;
                }
                section = section.nextRenderedWidget;
            }
            if (getHeight) {
                return { lineWidget: undefined, lineCount: maxHeight };
            }
            else if (!isSplit) {
                return { lineWidget: undefined, lineCount: totalNoOflines };
            }
            else {
                return { lineWidget: line, lineCount: lineIndexInCell };
            }
        };
        Layout.prototype.getCountOrLineTable = function (block, lineToBeSplit, isSplit, maxSplitHeight, isNested, getHeight) {
            var lineIndexInCell = 0;
            var skip = false;
            var line;
            var totalNoOflines = 0;
            var totalHeight = 0;
            var minCount = 0;
            var maxCount = 0;
            var minHeight = 0;
            var maxHeight = 0;
            var splitCountLine;
            for (var i = 0; i < block.childWidgets.length; i++) {
                var row = block.childWidgets[i];
                var minCountCell = void 0;
                var maxCountCell = void 0;
                minCount = 0;
                maxCount = 0;
                minHeight = 0;
                maxHeight = 0;
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        var blocks = cell.childWidgets[k];
                        if (blocks instanceof page_1.ParagraphWidget && blocks.childWidgets.length > 0) {
                            for (var l = 0; l < blocks.childWidgets.length; l++) {
                                minCount++;
                                minCountCell = cell;
                                minHeight += blocks.childWidgets[l].height;
                            }
                        }
                        else {
                            splitCountLine = this.getCountOrLineTable(blocks, lineToBeSplit, isSplit, maxSplitHeight, true, getHeight);
                            minCount += splitCountLine.lineCount;
                            minHeight += splitCountLine.lineCount;
                        }
                    }
                    if (maxCount < minCount) {
                        maxCount = minCount;
                    }
                    if (maxHeight < minHeight) {
                        maxHeight = minHeight;
                        maxCountCell = minCountCell;
                    }
                    minCount = 0;
                    minHeight = 0;
                }
                if (!isSplit || isNested) {
                    totalNoOflines = totalNoOflines + maxCount;
                    totalHeight += maxHeight;
                }
                else {
                    var countInCell = 0;
                    for (var i_2 = 0; i_2 < maxCountCell.childWidgets.length; i_2++) {
                        var blocks = maxCountCell.childWidgets[i_2];
                        if (blocks instanceof page_1.ParagraphWidget) {
                            for (var j = 0; j < blocks.childWidgets.length; j++) {
                                maxSplitHeight += blocks.childWidgets[j].height;
                                if (Math.round(lineToBeSplit) < Math.round(maxSplitHeight)) {
                                    line = blocks.childWidgets[j];
                                    skip = true;
                                    maxSplitHeight = 0;
                                    lineIndexInCell = countInCell;
                                    break;
                                }
                                else {
                                    countInCell++;
                                }
                                if (skip && isSplit) {
                                    break;
                                }
                            }
                        }
                        else {
                            splitCountLine = this.getCountOrLineTable(blocks, lineToBeSplit, isSplit, maxSplitHeight, false, getHeight);
                            if (ej2_base_1.isNullOrUndefined(splitCountLine.lineWidget)) {
                                countInCell += splitCountLine.lineCount;
                                maxSplitHeight += blocks.height;
                            }
                            else {
                                skip = true;
                                maxSplitHeight = 0;
                                line = splitCountLine.lineWidget;
                                countInCell += splitCountLine.lineCount;
                                lineIndexInCell = countInCell;
                                break;
                            }
                        }
                        if (skip && isSplit) {
                            break;
                        }
                    }
                }
                maxCount = 0;
                if (skip && isSplit) {
                    break;
                }
            }
            if (getHeight) {
                return { lineWidget: undefined, lineCount: totalHeight };
            }
            else if (!isSplit) {
                return { lineWidget: undefined, lineCount: totalNoOflines };
            }
            else if (isSplit && ej2_base_1.isNullOrUndefined(line) && isNested) {
                return { lineWidget: undefined, lineCount: totalNoOflines };
            }
            else if (isSplit && ej2_base_1.isNullOrUndefined(line) && !isNested) {
                return { lineWidget: undefined, lineCount: maxSplitHeight };
            }
            else {
                return { lineWidget: line, lineCount: lineIndexInCell };
            }
        };
        Layout.prototype.combineMultiColumn = function (section) {
            section = this.getBodyWidget(section, false);
            while (section && section.columnIndex !== 0) {
                var prevSection = section.previousRenderedWidget;
                if (prevSection.lastChild instanceof page_1.ParagraphWidget && prevSection.lastChild.isEndsWithColumnBreak) {
                    break;
                }
                var isPreviousSplit = false;
                for (var i = 0; i < section.childWidgets.length; i++) {
                    if (section.childWidgets[i] instanceof page_1.BlockWidget && !ej2_base_1.isNullOrUndefined(section.childWidgets[i].previousSplitWidget)
                        && !ej2_base_1.isNullOrUndefined(section.childWidgets[i].previousSplitWidget.previousSplitWidget)
                        && section.childWidgets[i].previousSplitWidget.bodyWidget.page !== section.childWidgets[i].previousSplitWidget.previousSplitWidget.bodyWidget.page) {
                        isPreviousSplit = true;
                    }
                    if ((section.childWidgets[i] instanceof page_1.BlockWidget && !ej2_base_1.isNullOrUndefined(section.childWidgets[i].previousSplitWidget) && section.childWidgets[i].previousSplitWidget.bodyWidget.page === section.childWidgets[i].bodyWidget.page && !isPreviousSplit)) {
                        section.childWidgets[i].combineWidget(this.viewer);
                        if (prevSection.lastChild instanceof page_1.TableWidget) {
                            this.updateCellHeightInCombinedTable(prevSection.lastChild);
                        }
                        i--;
                        continue;
                    }
                    prevSection.childWidgets.push(section.childWidgets[i]);
                    section.childWidgets[i].containerWidget = prevSection;
                    section.childWidgets[i].containerWidget.page = prevSection.page;
                    section.childWidgets.splice(0, 1);
                    i--;
                }
                section = section.previousRenderedWidget;
            }
            this.documentHelper.removeEmptyPages();
        };
        Layout.prototype.updateCellHeightInCombinedTable = function (tableWidget) {
            var maxCellHeight = 0;
            var minCellHeight = 0;
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var row = tableWidget.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        minCellHeight += cell.childWidgets[k].height;
                    }
                    if (minCellHeight > maxCellHeight) {
                        maxCellHeight = minCellHeight;
                    }
                    minCellHeight = 0;
                    for (var a = 0; a < row.childWidgets.length; a++) {
                        row.childWidgets[a].height = maxCellHeight;
                    }
                }
                maxCellHeight = 0;
            }
        };
        Layout.prototype.layoutHeaderFooter = function (section, viewer, page) {
            var headerFooterWidget = viewer.getCurrentPageHeaderFooter(section, true);
            if (headerFooterWidget) {
                var parentHeader = headerFooterWidget;
                if (ej2_base_1.isNullOrUndefined(headerFooterWidget.page)) {
                    headerFooterWidget.page = page;
                    headerFooterWidget.height = 0;
                    this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
                    viewer.updateHFClientArea(section.sectionFormat, true);
                    this.layoutHeaderFooterItems(viewer, headerFooterWidget);
                }
                headerFooterWidget = parentHeader.clone();
                headerFooterWidget.parentHeaderFooter = parentHeader;
                this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
                var header = headerFooterWidget;
                header.page = page;
                header.height = 0;
                this.updateRevisionsToHeaderFooter(header, page);
                viewer.updateHFClientArea(section.sectionFormat, true);
                page.headerWidget = this.layoutHeaderFooterItems(viewer, header);
                if (section.sectionFormat.topMargin < page.boundingRectangle.bottom && page.headerWidget.floatingElements.length > 0 && page.headerWidget.floatingElements[0].textWrappingStyle !== "Behind") {
                    page.headerWidget = this.shiftItemsForVerticalAlignment(header);
                }
            }
            headerFooterWidget = viewer.getCurrentPageHeaderFooter(section, false);
            if (headerFooterWidget) {
                var parentHeader = headerFooterWidget;
                if (ej2_base_1.isNullOrUndefined(headerFooterWidget.page)) {
                    headerFooterWidget.page = page;
                    headerFooterWidget.height = 0;
                    this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
                    viewer.updateHFClientArea(section.sectionFormat, false);
                    this.layoutHeaderFooterItems(viewer, headerFooterWidget);
                }
                headerFooterWidget = parentHeader.clone();
                headerFooterWidget.parentHeaderFooter = parentHeader;
                this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
                var footer = headerFooterWidget;
                footer.page = page;
                footer.height = 0;
                viewer.updateHFClientArea(section.sectionFormat, false);
                this.updateRevisionsToHeaderFooter(footer, page);
                page.footerWidget = this.layoutHeaderFooterItems(viewer, footer);
            }
        };
        Layout.prototype.shiftItemsForVerticalAlignment = function (headerWidget) {
            var floatingElements = headerWidget.floatingElements;
            for (var i = 0; i < floatingElements.length; i++) {
                var floatingItem = floatingElements[i];
                var verticalOrigin = floatingItem.verticalOrigin;
                var paragraph = floatingItem.paragraph;
                if (verticalOrigin === 'Margin' && !paragraph.isInsideTable) {
                    var yPosition = floatingItem.verticalPosition;
                    if (yPosition != 0) {
                        yPosition += this.viewer.clientActiveArea.y;
                        var diff = yPosition - floatingItem.y;
                        floatingItem.y = yPosition;
                        if (floatingItem instanceof page_1.ShapeElementBox) {
                            for (var j = 0; j < floatingItem.textFrame.childWidgets.length; j++) {
                                var block = floatingItem.textFrame.childWidgets[j];
                                if (block instanceof page_1.ParagraphWidget) {
                                    block.y = block.y + diff;
                                }
                            }
                        }
                    }
                }
            }
            return headerWidget;
        };
        Layout.prototype.updateHeaderFooterToParent = function (node) {
            var sectionIndex = node.page.sectionIndex;
            var typeIndex = this.viewer.getHeaderFooter(node.headerFooterType);
            var clone = node.clone();
            this.documentHelper.headersFooters[sectionIndex][typeIndex] = clone;
            for (var j = 0; j < clone.childWidgets.length; j++) {
                var child = clone.childWidgets[j];
                if (child instanceof page_1.TableWidget) {
                    this.clearTableWidget(child, false, true);
                }
            }
            return clone;
        };
        Layout.prototype.updateRevisionsToHeaderFooter = function (clone, page) {
            var childWidge = clone.childWidgets;
            if (clone instanceof page_1.HeaderFooterWidget && childWidge.length > 0) {
                for (var i = 0; i < childWidge.length; i++) {
                    if (childWidge[i].childWidgets.length > 0) {
                        var lineWidge = childWidge[i].childWidgets;
                        for (var j = 0; j < lineWidge.length; j++) {
                            var childrens = lineWidge[j].children;
                            if (childrens) {
                                for (var k = 0; k < childrens.length; k++) {
                                    if (childrens[k].removedIds.length > 0) {
                                        var removeId = childrens[k].removedIds;
                                        for (var l = 0; l < removeId.length; l++) {
                                            var revision = this.documentHelper.revisionsInternal.get(removeId[l]);
                                            childrens[k].revisions[l] = revision;
                                            this.updateRevisionRange(revision, page);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        Layout.prototype.updateRevisionRange = function (revision, page) {
            for (var i = 0; i < revision.range.length; i++) {
                var inline = revision.range[i];
                if (!inline.line.paragraph.bodyWidget.page) {
                    inline.line.paragraph.bodyWidget.page = page;
                }
            }
        };
        Layout.prototype.linkFieldInHeaderFooter = function (widget) {
            var firstChild = widget.firstChild;
            do {
                if (firstChild instanceof page_1.ParagraphWidget) {
                    this.linkFieldInParagraph(firstChild);
                }
                else {
                    this.linkFieldInTable(firstChild);
                }
            } while (firstChild = firstChild.nextWidget);
        };
        Layout.prototype.linkFieldInParagraph = function (widget) {
            for (var j = 0; j < widget.childWidgets.length; j++) {
                var line = widget.childWidgets[j];
                for (var i = 0; i < line.children.length; i++) {
                    var element = line.children[i];
                    if (element instanceof page_1.FieldElementBox && (element.fieldType !== 0 || (element.fieldType === 0 &&
                        this.documentHelper.fields.indexOf(element) === -1))) {
                        element.linkFieldCharacter(this.documentHelper);
                    }
                    if (element instanceof page_1.FieldTextElementBox &&
                        !ej2_base_1.isNullOrUndefined(element.previousElement) &&
                        element.previousElement instanceof page_1.FieldElementBox &&
                        element.fieldBegin !== element.previousElement.fieldBegin) {
                        element.fieldBegin = element.previousElement.fieldBegin;
                    }
                    if (element instanceof page_1.ShapeElementBox) {
                        var firstBlock = element.textFrame.firstChild;
                        if (firstBlock) {
                            do {
                                if (firstBlock instanceof page_1.ParagraphWidget) {
                                    this.linkFieldInParagraph(firstBlock);
                                }
                                else {
                                    this.linkFieldInTable(firstBlock);
                                }
                            } while (firstBlock = firstBlock.nextWidget);
                        }
                    }
                    else if (element instanceof page_1.CommentCharacterElementBox) {
                        var comment = this.getCommentById(this.documentHelper.comments, element.commentId);
                        if (!ej2_base_1.isNullOrUndefined(comment)) {
                            if (element.commentType === 0) {
                                comment.commentStart = element;
                            }
                            else {
                                comment.commentEnd = element;
                            }
                            element.comment = comment;
                        }
                    }
                }
            }
        };
        Layout.prototype.getCommentById = function (commentsCollection, commentId) {
            for (var i = 0; i < commentsCollection.length; i++) {
                var comment = commentsCollection[i];
                if (comment.commentId === commentId) {
                    return comment;
                }
            }
            return undefined;
        };
        Layout.prototype.linkFieldInTable = function (widget) {
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var row = widget.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        var block = cell.childWidgets[k];
                        if (block instanceof page_1.ParagraphWidget) {
                            this.linkFieldInParagraph(block);
                        }
                        else {
                            this.linkFieldInTable(block);
                        }
                    }
                }
            }
        };
        Layout.prototype.layoutHeaderFooterItems = function (viewer, widget) {
            this.viewer.updateClientAreaLocation(widget, viewer.clientActiveArea);
            if (widget.childWidgets.length === 0) {
                var pargaraph = new page_1.ParagraphWidget();
                var line = new page_1.LineWidget(pargaraph);
                pargaraph.childWidgets.push(line);
                widget.childWidgets.push(pargaraph);
                pargaraph.containerWidget = widget;
            }
            this.linkFieldInHeaderFooter(widget);
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var block = widget.childWidgets[i];
                if (block instanceof page_1.TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                    && !block.tableFormat.allowAutoFit && !block.isGridUpdated) {
                    block.calculateGrid();
                }
                viewer.updateClientAreaForBlock(block, true);
                this.layoutBlock(block, 0);
                viewer.updateClientAreaForBlock(block, false);
            }
            var type = widget.headerFooterType;
            if (type === 'OddFooter' || type === 'EvenFooter' || type === 'FirstPageFooter') {
                this.shiftChildLocation(viewer.clientArea.y - viewer.clientActiveArea.y, widget);
            }
            return widget;
        };
        Layout.prototype.shiftChildLocation = function (shiftTop, bodyWidget) {
            var widgetTop = bodyWidget.y + shiftTop;
            var footerMaxHeight = bodyWidget.page.boundingRectangle.height - (bodyWidget.page.boundingRectangle.height / 100) * 40;
            widgetTop = Math.max(widgetTop, footerMaxHeight);
            shiftTop = widgetTop - bodyWidget.y;
            var childTop = bodyWidget.y = widgetTop;
            for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
                var childWidget = bodyWidget.childWidgets[i];
                if (childWidget instanceof page_1.ParagraphWidget) {
                    childWidget.x = childWidget.x;
                    childWidget.y = i === 0 ? childWidget.y + shiftTop : childTop;
                    childTop += childWidget.height;
                    for (var j = 0; j < childWidget.childWidgets.length; j++) {
                        var widget = childWidget.childWidgets[j];
                        for (var k = 0; k < widget.children.length; k++) {
                            var element = widget.children[k];
                            if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== "Inline") {
                                if (element.verticalOrigin === "Paragraph" || element.verticalOrigin === "Line") {
                                    element.y = childWidget.y + element.verticalPosition;
                                }
                                else {
                                    var position = this.getFloatingItemPoints(element);
                                    element.y = position.y;
                                }
                                if (element instanceof page_1.ShapeElementBox) {
                                    var topMargin = element.textFrame.marginTop;
                                    this.updateChildLocationForCellOrShape(element.y + topMargin, element);
                                }
                            }
                        }
                    }
                }
                else {
                    this.shiftChildLocationForTableWidget(childWidget, shiftTop);
                    childTop += childWidget.height;
                }
            }
        };
        Layout.prototype.shiftChildLocationForTableWidget = function (tableWidget, shiftTop) {
            tableWidget.y = tableWidget.y + shiftTop;
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var childWidget = tableWidget.childWidgets[i];
                if (childWidget instanceof page_1.TableRowWidget) {
                    this.shiftChildLocationForTableRowWidget(childWidget, shiftTop);
                }
            }
        };
        Layout.prototype.shiftChildLocationForTableRowWidget = function (rowWidget, shiftTop) {
            rowWidget.y = rowWidget.y + shiftTop;
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                this.shiftChildLocationForTableCellWidget(rowWidget.childWidgets[i], shiftTop);
            }
        };
        Layout.prototype.shiftChildLocationForTableCellWidget = function (cellWidget, shiftTop) {
            cellWidget.y = cellWidget.y + shiftTop;
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                if (cellWidget.childWidgets[i] instanceof page_1.ParagraphWidget) {
                    cellWidget.childWidgets[i].x = cellWidget.childWidgets[i].x;
                    cellWidget.childWidgets[i].y = cellWidget.childWidgets[i].y + shiftTop;
                }
                else {
                    this.shiftChildLocationForTableWidget(cellWidget.childWidgets[i], shiftTop);
                }
            }
        };
        Layout.prototype.layoutBlock = function (block, index, isUpdatedList) {
            var nextBlock;
            if (block instanceof page_1.ParagraphWidget) {
                block.splitTextRangeByScriptType(0);
                block.splitLtrAndRtlText(0);
                block.combineconsecutiveRTL(0);
                nextBlock = this.layoutParagraph(block, index, isUpdatedList);
                var nextBlockToLayout = this.checkAndRelayoutPreviousOverlappingBlock(block);
                if (nextBlockToLayout) {
                    nextBlock = nextBlockToLayout;
                }
            }
            else {
                nextBlock = this.layoutTable(block, index);
                this.checkAndRelayoutPreviousOverlappingBlock(block);
                this.updateTableYPositionBasedonTextWrap(nextBlock);
            }
            return nextBlock.nextRenderedWidget;
        };
        Layout.prototype.updateTableYPositionBasedonTextWrap = function (table) {
            var _this = this;
            if (!ej2_base_1.isNullOrUndefined(table.bodyWidget) && !(table.containerWidget instanceof page_1.TextFrame)) {
                var tableY_1 = table.y;
                var tableRect_1 = new page_1.Rect(table.x, table.y, table.width, table.height);
                table.bodyWidget.floatingElements.forEach(function (shape) {
                    if (shape instanceof page_1.ShapeElementBox && !shape.paragraph.isInsideTable) {
                        var shapeRect = new page_1.Rect(shape.x, shape.y, shape.width, shape.height);
                        var considerShape = (shape.textWrappingStyle === 'TopAndBottom' || shape.textWrappingStyle === 'Square');
                        if (considerShape && tableRect_1.isIntersecting(shapeRect)) {
                            table.y = shape.y + shape.height + shape.distanceBottom;
                            _this.updateChildLocationForTable(table.y, table);
                            var height = table.y - tableY_1;
                            _this.viewer.cutFromTop(_this.viewer.clientActiveArea.y + height);
                        }
                    }
                });
            }
        };
        Layout.prototype.checkAndRelayoutPreviousOverlappingBlock = function (block) {
            if (!(block.containerWidget instanceof page_1.TextFrame) && !this.isRelayoutOverlap) {
                var preivousBlock = block.previousWidget;
                if (block instanceof page_1.ParagraphWidget) {
                    if (block.floatingElements.length > 0) {
                        var height = 0;
                        for (var i = 0; i < block.floatingElements.length; i++) {
                            var element = block.floatingElements[i];
                            if (element.textWrappingStyle === 'InFrontOfText' || element.textWrappingStyle === 'Behind' || element.textWrappingStyle === 'Inline') {
                                continue;
                            }
                            var shapeRect = new page_1.Rect(element.x, element.y, element.width, element.height);
                            while (preivousBlock) {
                                if (block.isInsideTable && height > this.viewer.clientArea.height) {
                                    this.startOverlapWidget = undefined;
                                    this.endOverlapWidget = undefined;
                                    break;
                                }
                                if (preivousBlock instanceof page_1.ParagraphWidget) {
                                    var paraRect = new page_1.Rect(preivousBlock.x, preivousBlock.y, preivousBlock.width, preivousBlock.height);
                                    if (shapeRect.isIntersecting(paraRect) &&
                                        this.startOverlapWidget !== preivousBlock) {
                                        this.startOverlapWidget = preivousBlock;
                                        this.endOverlapWidget = block;
                                    }
                                }
                                height += preivousBlock.height;
                                preivousBlock = preivousBlock.previousWidget;
                            }
                            preivousBlock = block.previousWidget;
                        }
                    }
                    else {
                        var widget = block.getSplitWidgets();
                        if (widget) {
                            return widget[widget.length - 1];
                        }
                    }
                }
                else {
                    var table = block;
                    if (!table.wrapTextAround) {
                        return table;
                    }
                    var tableRect = new page_1.Rect(table.x, table.y, table.getTableCellWidth(), table.height);
                    while (preivousBlock) {
                        if (preivousBlock instanceof page_1.ParagraphWidget) {
                            var blockRect = new page_1.Rect(preivousBlock.x, preivousBlock.y, preivousBlock.width, preivousBlock.height);
                            if (tableRect.isIntersecting(blockRect) &&
                                this.startOverlapWidget !== preivousBlock) {
                                this.startOverlapWidget = preivousBlock;
                                this.endOverlapWidget = block;
                            }
                        }
                        preivousBlock = preivousBlock.previousWidget;
                    }
                    preivousBlock = block.previousWidget;
                }
                if (this.startOverlapWidget) {
                    this.isRelayoutOverlap = true;
                    this.skipRelayoutOverlap = true;
                    this.layoutStartEndBlocks(this.startOverlapWidget, block);
                    this.isRelayoutOverlap = false;
                    this.skipRelayoutOverlap = false;
                }
                this.startOverlapWidget = undefined;
                this.endOverlapWidget = undefined;
            }
            return block;
        };
        Layout.prototype.addParagraphWidget = function (area, paragraphWidget) {
            if (paragraphWidget.isEmpty() && !ej2_base_1.isNullOrUndefined(paragraphWidget.paragraphFormat) &&
                (paragraphWidget.paragraphFormat.textAlignment === 'Center' || paragraphWidget.paragraphFormat.textAlignment === 'Right'
                    || (paragraphWidget.paragraphFormat.textAlignment === 'Justify' && paragraphWidget.paragraphFormat.bidi))
                && paragraphWidget.paragraphFormat.listFormat.listId === -1) {
                this.updateXPositionForEmptyParagraph(area, paragraphWidget);
                paragraphWidget.y = area.y;
            }
            else {
                if (this.viewer.clientActiveArea.width <= 0 && this.viewer instanceof viewer_1.WebLayoutViewer) {
                    paragraphWidget.x = this.previousPara;
                }
                else {
                    paragraphWidget.x = area.x;
                    this.previousPara = paragraphWidget.x;
                }
                paragraphWidget.width = area.width;
                paragraphWidget.y = area.y;
                paragraphWidget.clientX = undefined;
                if (paragraphWidget.hasOwnProperty('absoluteXPosition')) {
                    delete paragraphWidget['absoluteXPosition'];
                }
            }
            return paragraphWidget;
        };
        Layout.prototype.updateXPositionForEmptyParagraph = function (area, paragraph) {
            if (paragraph.isEmpty() && !ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat)) {
                var width = this.documentHelper.textHelper.getParagraphMarkWidth(paragraph.characterFormat);
                paragraph.clientX = area.x;
                var left = area.x;
                paragraph['absoluteXPosition'] = { 'width': area.width, 'x': area.x };
                if (paragraph.paragraphFormat.textAlignment === 'Center') {
                    left += (area.width - width) / 2;
                }
                else {
                    left += area.width - width;
                }
                paragraph.width = width;
                paragraph.x = left;
            }
        };
        Layout.prototype.addLineWidget = function (paragraphWidget) {
            var line = undefined;
            line = new page_1.LineWidget(paragraphWidget);
            line.width = paragraphWidget.width;
            paragraphWidget.childWidgets.push(line);
            line.paragraph = paragraphWidget;
            return line;
        };
        Layout.prototype.isFirstElementWithPageBreak = function (paragraphWidget) {
            var isPageBreak = false;
            if (this.viewer instanceof viewer_1.PageLayoutViewer) {
                var lineWidget = paragraphWidget.childWidgets[0];
                if (lineWidget) {
                    var element = lineWidget.children[0];
                    while (element) {
                        if (element instanceof page_1.BookmarkElementBox && element.name.indexOf('_') >= 0) {
                            element = element.nextElement;
                            continue;
                        }
                        if (element instanceof page_1.TextElementBox && (element.text === '\f' || element.text === String.fromCharCode(14))) {
                            isPageBreak = true;
                        }
                        break;
                    }
                }
            }
            return isPageBreak;
        };
        Layout.prototype.layoutfootNote = function (footnote) {
            if (this.documentHelper.owner.layoutType === 'Pages') {
                var clientActiveArea = this.viewer.clientActiveArea.clone();
                var clientArea = this.viewer.clientArea.clone();
                if (footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1 && !this.isInitialLoad) {
                    this.updateColumnIndex(footnote.bodyWidgets[0], false);
                    this.layoutMultiColumnBody(footnote.bodyWidgets[0], true);
                }
                if (footnote.footNoteType === 'Endnote' && footnote.bodyWidgets[0].sectionFormat.numberOfColumns > 1) {
                    if (!this.isInitialLoad) {
                        this.updateColumnIndex(footnote.bodyWidgets[0], false);
                    }
                    this.layoutMultiColumnBody(footnote.bodyWidgets[0], true);
                    this.viewer.clientActiveArea = clientActiveArea;
                }
                var clientWidth = 0;
                if (footnote.sectionFormat.columns.length > 1 && footnote.footNoteType === 'Footnote') {
                    this.viewer.updateClientArea(footnote, footnote.page);
                    clientWidth = this.viewer.clientActiveArea.width;
                }
                if (footnote.footNoteType === 'Footnote') {
                    this.viewer.updateFootnoteClientArea(footnote.sectionFormat, footnote);
                    if (footnote.sectionFormat.columns.length > 1) {
                        this.viewer.clientActiveArea.width = clientWidth;
                        this.viewer.clientArea.width = clientWidth;
                    }
                }
                footnote.height = 0;
                var block = void 0;
                var height = 0;
                this.isRelayoutFootnote = false;
                var index = 0;
                if (this.viewer instanceof viewer_1.PageLayoutViewer && footnote.bodyWidgets.length > 0 && ((footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1) || (footnote.footNoteType === 'Endnote' && footnote.bodyWidgets[0].sectionFormat.columns.length > 1))) {
                    this.splitFootNoteWidgetBasedOnColumn(footnote.bodyWidgets[0]);
                }
                var footBody = footnote.bodyWidgets[0];
                var clientX = 0;
                for (var i = 0; i < footnote.bodyWidgets.length; i++) {
                    if (footnote.bodyWidgets[i].columnIndex !== footBody.columnIndex && ((footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1) || (footnote.footNoteType === 'Endnote' && footnote.bodyWidgets[i].sectionFormat.columns.length > 1))) {
                        this.viewer.updateClientArea(footnote.bodyWidgets[i], footnote.bodyWidgets[i].page);
                        clientWidth = this.viewer.clientActiveArea.width;
                        clientX = this.viewer.clientActiveArea.x;
                        if (footnote.footNoteType === 'Footnote') {
                            this.viewer.updateFootnoteClientArea(footnote.sectionFormat, footnote);
                        }
                        this.viewer.clientActiveArea.x = clientX;
                        this.viewer.clientArea.x = clientX;
                        this.viewer.clientActiveArea.width = clientWidth;
                        this.viewer.clientArea.width = clientWidth;
                        this.viewer.cutFromTop(footnote.y + height);
                    }
                    if (i === 0) {
                        var newPara = new page_1.ParagraphWidget();
                        newPara.characterFormat = new index_1.WCharacterFormat();
                        newPara.paragraphFormat = new index_1.WParagraphFormat();
                        newPara.index = 0;
                        var lineWidget = new page_1.LineWidget(newPara);
                        newPara.childWidgets.push(lineWidget);
                        height = this.documentHelper.textHelper.getParagraphMarkSize(newPara.characterFormat).Height;
                        footnote.height += height;
                        footnote.y = this.viewer.clientActiveArea.y;
                        if (footnote.footNoteType === 'Endnote') {
                            this.viewer.updateClientArea(footnote.bodyWidgets[i], footnote.bodyWidgets[i].page, true);
                        }
                        this.viewer.cutFromTop(footnote.y + height);
                        footnote.margin = new page_1.Margin(0, height, 0, 0);
                    }
                    for (var j = 0; j < footnote.bodyWidgets[i].childWidgets.length; j++) {
                        block = footnote.bodyWidgets[i].childWidgets[j];
                        block.index = index;
                        index++;
                        block.containerWidget = footnote.bodyWidgets[i];
                        block.containerWidget.page = footnote.page;
                        block.containerWidget.containerWidget = footnote;
                        this.viewer.updateClientAreaForBlock(block, true);
                        if (block instanceof page_1.TableWidget) {
                            this.clearTableWidget(block, true, true, true);
                            this.isRelayoutFootnote = true;
                            this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                            this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                        }
                        this.layoutBlock(block, 0);
                        if (footnote.footNoteType === 'Footnote' && footnote.bodyWidgets[i].columnIndex === footBody.columnIndex) {
                            footnote.height += block.height;
                        }
                        this.viewer.updateClientAreaForBlock(block, false);
                    }
                    footBody = footnote.bodyWidgets[i];
                }
                if (footnote.sectionFormat.columns.length > 1) {
                    var footHeight = this.getFootNoteBodyHeight(footnote.bodyWidgets[0]);
                    footnote.height = footHeight + height;
                }
                if (footnote.footNoteType === 'Footnote') {
                    this.shiftChildWidgetInFootnote(footnote);
                }
                if (footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1 && footnote.page.bodyWidgets[footnote.page.bodyWidgets.length - 1].sectionFormat.columns.length > 1) {
                    var section = this.getBodyWidget(footnote.page.bodyWidgets[footnote.page.bodyWidgets.length - 1], true);
                    var height_2 = this.getNextWidgetHeight(section);
                    if (height_2 > footnote.y) {
                        this.footnoteHeight = footnote.height;
                        this.layoutMultiColumnBody(section, true);
                    }
                }
                this.viewer.clientActiveArea = clientActiveArea;
                this.viewer.clientArea = clientArea;
                if (!this.islayoutFootnote) {
                    if (this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height > footnote.y) {
                        this.viewer.clientActiveArea.height -= footnote.height;
                        var sub = (this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height - footnote.y);
                        this.viewer.clientActiveArea.height -= sub;
                    }
                }
            }
            this.footnoteHeight = 0;
            return footnote;
        };
        Layout.prototype.getFootNoteBodyHeight = function (section) {
            var height = 0;
            while (section) {
                if (section.columnIndex !== 0) {
                    break;
                }
                for (var i = 0; i < section.childWidgets.length; i++) {
                    height += section.childWidgets[i].height;
                }
                section = section.nextRenderedWidget;
            }
            return height;
        };
        Layout.prototype.splitFootNoteWidgetBasedOnColumn = function (section) {
            var lineCountInfo = this.getCountOrLine(section, undefined, undefined, true);
            var totalHeight = lineCountInfo.lineCount;
            var lineToBeSplit = Math.round(totalHeight / section.sectionFormat.numberOfColumns);
            while (section) {
                var lineCountInfo_2 = this.getCountOrLine(section, lineToBeSplit, true, false);
                var clientActiveArea = this.viewer.clientActiveArea.clone();
                var clientArea = this.viewer.clientArea.clone();
                if (lineCountInfo_2.lineWidget.paragraph.indexInOwner === 0 && lineCountInfo_2.lineWidget.indexInOwner === 0) {
                    this.updateColumnIndex(lineCountInfo_2.lineWidget.paragraph.bodyWidget, true);
                }
                else {
                    this.splitParagraph(lineCountInfo_2.lineWidget.paragraph, lineCountInfo_2.lineWidget.indexInOwner, undefined);
                    var nextBody = this.moveBlocksToNextPage(lineCountInfo_2.lineWidget.paragraph.previousRenderedWidget);
                    this.viewer.clientActiveArea = clientActiveArea;
                    this.viewer.clientArea = clientArea;
                    if (!ej2_base_1.isNullOrUndefined(nextBody.nextRenderedWidget)) {
                        this.updateColumnIndex(nextBody.nextRenderedWidget, true);
                    }
                }
                if (lineCountInfo_2.lineWidget.paragraph.bodyWidget.columnIndex === lineCountInfo_2.lineWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns - 1) {
                    break;
                }
                section = section.nextRenderedWidget;
            }
        };
        Layout.prototype.updateColumnIndex = function (section, increase) {
            while (section) {
                if (increase) {
                    section.columnIndex++;
                }
                else {
                    section.columnIndex = 0;
                }
                section = section.nextRenderedWidget;
            }
        };
        Layout.prototype.shiftChildWidgetInFootnote = function (footnote) {
            var page = footnote.page;
            var yPosition = footnote.y - footnote.height;
            if (page.bodyWidgets[0].childWidgets.length === 1 && page.bodyWidgets[0].firstChild) {
                var startY = page.bodyWidgets[0].firstChild.y;
                var bodyWidgetHeight = this.getBodyWidgetHeight(page.bodyWidgets[0]);
                if (yPosition < startY + bodyWidgetHeight) {
                    yPosition = startY + bodyWidgetHeight;
                }
            }
            footnote.y = yPosition;
            yPosition += footnote.margin.top;
            var multiColumnY = yPosition;
            var columnBody = footnote.bodyWidgets[0];
            for (var i = 0; i < footnote.bodyWidgets.length; i++) {
                if (footnote.bodyWidgets[i].columnIndex !== columnBody.columnIndex) {
                    yPosition = multiColumnY;
                }
                columnBody = footnote.bodyWidgets[i];
                for (var j = 0; j < footnote.bodyWidgets[i].childWidgets.length; j++) {
                    var childWidget = footnote.bodyWidgets[i].childWidgets[j];
                    if (childWidget instanceof page_1.ParagraphWidget) {
                        childWidget.y = yPosition;
                        yPosition += childWidget.height;
                    }
                    else {
                        this.shiftChildLocationForTableWidget(childWidget, yPosition - childWidget.y);
                        yPosition += childWidget.height;
                    }
                }
            }
        };
        Layout.prototype.getBodyWidgetHeight = function (bodyWidget) {
            var height = 0;
            for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
                height += bodyWidget.childWidgets[i].height;
            }
            return height;
        };
        Layout.prototype.checkParaHasField = function (paragraph) {
            var hasField = false;
            for (var i = 0; i < paragraph.childWidgets.length; i++) {
                var lineWidget = paragraph.childWidgets[i];
                for (var j = 0; j < lineWidget.children.length; j++) {
                    var element = lineWidget.children[j];
                    if (element instanceof page_1.FieldElementBox && (element.fieldType === 2 || element.fieldType === 1)) {
                        if (this.documentHelper.fieldStacks.length > 0 && element.fieldBegin === this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1]) {
                            hasField = true;
                            break;
                        }
                    }
                }
            }
            return hasField;
        };
        Layout.prototype.checkTableHasField = function (table) {
            var hasField = false;
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        var block = cell.childWidgets[k];
                        if (block instanceof page_1.ParagraphWidget) {
                            hasField = this.checkParaHasField(block);
                        }
                        else {
                            hasField = this.checkTableHasField(block);
                        }
                        if (hasField) {
                            break;
                        }
                    }
                }
            }
            return hasField;
        };
        Layout.prototype.layoutParagraph = function (paragraph, lineIndex, isUpdatedList) {
            if (this.isFieldCode && !this.checkParaHasField(paragraph)) {
                paragraph.isFieldCodeBlock = true;
                return paragraph;
            }
            this.addParagraphWidget(this.viewer.clientActiveArea, paragraph);
            var isListLayout = true;
            var isFirstElmIsparagraph = this.isFirstElementWithPageBreak(paragraph);
            if (!isFirstElmIsparagraph) {
                this.layoutListItems(paragraph, isUpdatedList);
                isListLayout = false;
            }
            if (paragraph.isEmpty()) {
                this.layoutEmptyLineWidget(paragraph, true);
            }
            else {
                var line = lineIndex < paragraph.childWidgets.length ?
                    paragraph.childWidgets[lineIndex] : undefined;
                if (!this.isRelayoutOverlap && !(paragraph.containerWidget instanceof page_1.TextFrame)) {
                    this.layoutFloatElements(paragraph);
                }
                while (line instanceof page_1.LineWidget) {
                    if (paragraph !== line.paragraph && line.indexInOwner === 0 && isListLayout) {
                        if (line.previousLine.isEndsWithColumnBreak) {
                            this.viewer.updateClientAreaForBlock(paragraph, true);
                            this.layoutListItems(line.paragraph);
                            this.viewer.updateClientAreaForBlock(paragraph, false);
                        }
                        else {
                            this.layoutListItems(line.paragraph);
                        }
                    }
                    if (line.isFirstLine() && ej2_base_1.isNullOrUndefined(this.fieldBegin)) {
                        if (!ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat)) {
                            var firstLineIndent = -editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
                            this.viewer.updateClientWidth(firstLineIndent);
                        }
                    }
                    line.marginTop = 0;
                    line = this.layoutLine(line, 0);
                    paragraph = line.paragraph;
                    line = line.nextLine;
                }
            }
            this.updateWidgetToPage(this.viewer, paragraph);
            paragraph.isLayouted = true;
            paragraph.isFieldCodeBlock = false;
            return paragraph;
        };
        Layout.prototype.clearLineMeasures = function () {
            this.maxBaseline = 0;
            this.maxTextBaseline = 0;
            this.maxTextHeight = 0;
        };
        Layout.prototype.layoutFloatElements = function (paragraph) {
            var _this = this;
            paragraph.floatingElements.forEach(function (shape) {
                if (shape instanceof page_1.ShapeBase && shape.textWrappingStyle !== 'Inline') {
                    if (!_this.isRelayoutOverlap) {
                        _this.layoutShape(shape);
                    }
                }
            });
        };
        Layout.prototype.layoutShape = function (element) {
            if (element instanceof page_1.ShapeElementBox && element.isHorizontalRule) {
                return;
            }
            if (element.textWrappingStyle !== 'Inline') {
                var position = this.getFloatingItemPoints(element);
                element.x = position.x;
                element.y = position.y;
                if (!element.paragraph.isInsideTable && element.paragraph.indexInOwner !== 0 && element.verticalPosition >= 0 && Math.round(element.paragraph.y) >= Math.round(element.y) && this.viewer.clientArea.bottom <= element.y + element.height && (element.verticalOrigin == "Line" || element.verticalOrigin == "Paragraph") && element.textWrappingStyle !== "InFrontOfText" && element.textWrappingStyle !== "Behind") {
                    this.moveToNextPage(this.viewer, element.line);
                    this.updateShapeBaseLocation(element.line.paragraph);
                }
                var bodyWidget = element.paragraph.bodyWidget;
                if (bodyWidget.floatingElements.indexOf(element) === -1) {
                    bodyWidget.floatingElements.push(element);
                    bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
                }
                if (element.paragraph.floatingElements.indexOf(element) === -1) {
                    element.paragraph.floatingElements.push(element);
                }
            }
            else {
                if (element.width === 0 && element.widthScale !== 0) {
                    var containerWidth = editor_helper_1.HelperMethods.convertPointToPixel(element.line.paragraph.getContainerWidth());
                    element.width = (containerWidth / 100) * element.widthScale;
                }
            }
            var clientArea = this.viewer.clientArea;
            var clientActiveArea = this.viewer.clientActiveArea;
            if (element instanceof page_1.ShapeElementBox) {
                var blocks = element.textFrame.childWidgets;
                this.viewer.updateClientAreaForTextBoxShape(element, true);
                for (var i = 0; i < blocks.length; i++) {
                    var block = blocks[i];
                    this.viewer.updateClientAreaForBlock(block, true);
                    if (block instanceof page_1.TableWidget) {
                        this.clearTableWidget(block, true, true);
                    }
                    this.layoutBlock(block, 0);
                    this.viewer.updateClientAreaForBlock(block, false);
                }
            }
            this.viewer.clientActiveArea = clientActiveArea;
            this.viewer.clientArea = clientArea;
        };
        Layout.prototype.moveElementFromNextLine = function (line) {
            var nextLine = line.nextLine;
            if (nextLine && !line.paragraph.bodyWidget.sectionFormat.equalWidth && line.paragraph.bodyWidget.columnIndex !== nextLine.paragraph.bodyWidget.columnIndex) {
                nextLine = undefined;
            }
            while (nextLine instanceof page_1.LineWidget) {
                if (nextLine.children.length > 0) {
                    var element = nextLine.children.splice(0, 1)[0];
                    line.children.push(element);
                    element.line = line;
                    break;
                }
                else {
                    if (nextLine.paragraph.childWidgets.length === 1) {
                        nextLine.paragraph.destroy();
                    }
                    else {
                        nextLine.paragraph.childWidgets.splice(nextLine.paragraph.childWidgets.indexOf(nextLine), 1);
                    }
                    nextLine = line.nextLine;
                }
            }
        };
        Layout.prototype.layoutLine = function (line, count) {
            var paragraph = line.paragraph;
            if (line.children.length === 0) {
                this.moveElementFromNextLine(line);
            }
            var element = line.children[count];
            var isNotEmptyField = true;
            if (element instanceof page_1.FieldElementBox && line.children[line.children.length - 1] instanceof page_1.FieldElementBox) {
                isNotEmptyField = false;
                for (var i = 0; i < line.children.length; i++) {
                    if (line.children[i].fieldType == 2 && line.children[i].nextElement != undefined && !(line.children[i].nextElement instanceof page_1.FieldElementBox)) {
                        isNotEmptyField = true;
                        break;
                    }
                }
            }
            this.clearLineMeasures();
            line.marginTop = 0;
            var bodyIndex = paragraph.bodyWidget.indexInOwner;
            var lineIndex = line.indexInOwner;
            while (element instanceof page_1.ElementBox) {
                element.padding.left = 0;
                if (!isNotEmptyField) {
                    this.layoutElement(element, paragraph, true);
                    isNotEmptyField = true;
                }
                else {
                    this.layoutElement(element, paragraph);
                }
                line = element.line;
                if (element instanceof page_1.TextElementBox) {
                    var textElement = element;
                    if (!ej2_base_1.isNullOrUndefined(textElement.errorCollection) && textElement.errorCollection.length > 0) {
                        textElement.ischangeDetected = true;
                    }
                }
                if (!this.isRTLLayout) {
                    var lineIndex_1 = paragraph.childWidgets.indexOf(element.line);
                    if (lineIndex_1 > 0 && this.hasFloatingElement) {
                        this.hasFloatingElement = false;
                        if (paragraph.bodyWidget.floatingElements.length > 0 && element instanceof page_1.TextElementBox && !(paragraph.containerWidget instanceof page_1.TableCellWidget)) {
                            element = paragraph.childWidgets[lineIndex_1].children[0];
                        }
                    }
                    else {
                        this.hasFloatingElement = false;
                        if (this.is2013Justification && !ej2_base_1.isNullOrUndefined(this.nextElementToLayout)) {
                            element = this.nextElementToLayout;
                        }
                        else {
                            element = element.nextElement;
                            if (element instanceof page_1.TextElementBox && element.text.indexOf(" ") == 0 && element.text.length > 2) {
                                if (ej2_base_1.isNullOrUndefined(element.nextElement) && element.text.trim().length > 0) {
                                    element.text = element.text.substring(1, element.text.length);
                                    var elementIndex = element.line.children.indexOf(element);
                                    element.line.children.splice(elementIndex, 1);
                                    var textElement = new page_1.TextElementBox();
                                    textElement.text = " ";
                                    textElement.line = element.line;
                                    textElement.characterFormat.copyFormat(element.characterFormat);
                                    if (element.revisions.length > 0) {
                                        for (var m = 0; m < element.revisions.length; m++) {
                                            var revision = element.revisions[m];
                                            textElement.revisions.push(revision);
                                            var rangeIndex = revision.range.indexOf(element);
                                            if (rangeIndex < 0) {
                                                revision.range.push(textElement);
                                            }
                                            else {
                                                revision.range.splice(rangeIndex, 0, textElement);
                                            }
                                        }
                                    }
                                    element.line.children.splice(elementIndex, 0, textElement);
                                    element.line.children.splice(elementIndex + 1, 0, element);
                                    element = textElement;
                                }
                            }
                        }
                        this.nextElementToLayout = undefined;
                    }
                }
                else {
                    element = undefined;
                    this.isRTLLayout = false;
                }
            }
            return line;
        };
        Layout.prototype.layoutElement = function (element, paragraph, isEmptyField) {
            if ((element.isPageBreak && paragraph.isInHeaderFooter) || (element instanceof page_1.ShapeElementBox && element.isHorizontalRule)) {
                return;
            }
            var line = element.line;
            var text = '';
            var index = element.indexInOwner;
            if (this.viewer.owner.editor && this.viewer.owner.editorHistory && this.viewer.owner.editorHistory.isRedoing && !ej2_base_1.isNullOrUndefined(element.paragraph.containerWidget.footNoteReference) && this.viewer.owner.enableTrackChanges && element.removedIds.length > 0) {
                this.viewer.owner.editor.constructRevisionFromID(element, true);
            }
            if (element instanceof page_1.FieldElementBox) {
                if (element.fieldType === 0) {
                    if (this.documentHelper.fields.indexOf(element) === -1) {
                        this.documentHelper.fields.push(element);
                    }
                    if (!ej2_base_1.isNullOrUndefined(element.formFieldData) &&
                        this.documentHelper.formFields.indexOf(element) === -1 && !this.isInsertFormField) {
                        this.documentHelper.formFields.push(element);
                    }
                }
                this.layoutFieldCharacters(element);
                if (element.line.isLastLine() && ej2_base_1.isNullOrUndefined(element.nextNode) && !this.isFieldCode) {
                    this.moveToNextLine(line);
                }
                else if (ej2_base_1.isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                    this.moveElementFromNextLine(line);
                    if (element.line.isLastLine() && ej2_base_1.isNullOrUndefined(element.nextNode) && !this.isFieldCode) {
                        if (element.fieldType !== 2 && ej2_base_1.isNullOrUndefined(element.fieldSeparator)) {
                            this.layoutEmptyLineWidget(paragraph, false, element.line);
                        }
                        this.moveToNextLine(line);
                    }
                }
                else if (ej2_base_1.isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width === 0) {
                    this.moveToNextLine(line);
                    if (line.paragraph.lastChild === line && !ej2_base_1.isNullOrUndefined(line.nextLine) &&
                        this.viewer.clientActiveArea.height >= 0) {
                        this.moveFromNextPage(line);
                    }
                }
                else if (isEmptyField) {
                    var textHelper = this.documentHelper.textHelper.getHeight(paragraph.characterFormat);
                    element.height = textHelper.Height;
                }
                return;
            }
            if (element instanceof page_1.ListTextElementBox || this.isFieldCode || element instanceof page_1.BookmarkElementBox ||
                element instanceof page_1.EditRangeEndElementBox || element instanceof page_1.EditRangeStartElementBox
                || element instanceof page_1.ContentControl ||
                (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline')) {
                if (element instanceof page_1.BookmarkElementBox) {
                    if (element.bookmarkType === 0 && !this.documentHelper.bookmarks.containsKey(element.name)) {
                        this.documentHelper.bookmarks.add(element.name, element);
                        if (!ej2_base_1.isNullOrUndefined(element.properties)) {
                            var columnFirst = parseInt(element.properties["columnFirst"]);
                            if (element.paragraph.isInsideTable) {
                                var row_1 = element.paragraph.associatedCell.ownerRow;
                                var cell = row_1.getCellUsingColumnIndex(row_1.rowIndex, columnFirst);
                                if (!ej2_base_1.isNullOrUndefined(cell)) {
                                    cell.isRenderBookmarkStart = true;
                                }
                            }
                        }
                    }
                    else if (element.bookmarkType === 1 && this.documentHelper.bookmarks.containsKey(element.name)) {
                        var bookmrkElement = this.documentHelper.bookmarks.get(element.name);
                        if (ej2_base_1.isNullOrUndefined(bookmrkElement.reference)
                            || ej2_base_1.isNullOrUndefined(bookmrkElement.reference.paragraph)
                            || ej2_base_1.isNullOrUndefined(bookmrkElement.reference.paragraph.bodyWidget)) {
                            bookmrkElement.reference = element;
                            element.reference = bookmrkElement;
                        }
                        if (ej2_base_1.isNullOrUndefined(bookmrkElement.properties)) {
                            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.selection) && this.documentHelper.selection.isRenderBookmarkAtEnd(bookmrkElement.reference)) {
                                var row = bookmrkElement.reference.paragraph.associatedCell.ownerRow;
                                row.isRenderBookmarkEnd = true;
                            }
                        }
                        else {
                            if (!ej2_base_1.isNullOrUndefined(element.paragraph.associatedCell)) {
                                var lastPara = this.documentHelper.selection.getLastParagraph(element.paragraph.associatedCell);
                                var lastLine = lastPara.lastChild;
                                if (!ej2_base_1.isNullOrUndefined(lastLine)) {
                                    var lastElement = lastLine.children[lastLine.children.length - 1];
                                    if (lastElement == element) {
                                        var columnLast = parseInt(element.reference.properties['columnLast']);
                                        var endRow = element.paragraph.associatedCell.ownerRow;
                                        var endCell = undefined;
                                        var cellIndex = columnLast;
                                        while (ej2_base_1.isNullOrUndefined(endCell) && cellIndex > -1) {
                                            endCell = endRow.getCellUsingColumnIndex(endRow.rowIndex, cellIndex);
                                            if (ej2_base_1.isNullOrUndefined(endCell)) {
                                                cellIndex--;
                                            }
                                        }
                                        if (!ej2_base_1.isNullOrUndefined(endCell)) {
                                            endCell.isRenderBookmarkEnd = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (element.bookmarkType === 0 && this.documentHelper.bookmarks.containsKey(element.name)) {
                        if (ej2_base_1.isNullOrUndefined(element.reference)) {
                            this.documentHelper.bookmarks.remove(element.name);
                        }
                        if (!ej2_base_1.isNullOrUndefined(element.properties)) {
                            var columnFirst = parseInt(element.properties["columnFirst"]);
                            if (element.paragraph.isInsideTable) {
                                var row_2 = element.paragraph.associatedCell.ownerRow;
                                var cell = row_2.getCellUsingColumnIndex(row_2.rowIndex, columnFirst);
                                if (!ej2_base_1.isNullOrUndefined(cell)) {
                                    cell.isRenderBookmarkStart = true;
                                }
                            }
                        }
                    }
                }
                if (element instanceof page_1.EditRangeStartElementBox || element instanceof page_1.EditRangeEndElementBox) {
                    if (element instanceof page_1.EditRangeStartElementBox && (this.documentHelper.owner.currentUser === element.user || (element.group === "Everyone" && element.user === ""))) {
                        if (element.columnFirst != -1 && element.columnLast != -1) {
                            var row_3 = element.paragraph.associatedCell.ownerRow;
                            var cell = row_3.getCellUsingColumnIndex(row_3.rowIndex, element.columnFirst);
                            if (!ej2_base_1.isNullOrUndefined(cell)) {
                                cell.isRenderEditRangeStart = true;
                                row_3.editRangeID.add(element.editRangeId, element);
                            }
                        }
                    }
                    else if (element instanceof page_1.EditRangeEndElementBox && (this.documentHelper.owner.currentUser === element.editRangeStart.user || (element.editRangeStart.group === "Everyone" && element.editRangeStart.user === ""))) {
                        if (element.editRangeStart.columnFirst != -1 && element.editRangeStart.columnLast != -1) {
                            var row_4 = element.paragraph.associatedCell.ownerRow;
                            if (row_4.editRangeID.containsKey(element.editRangeStart.editRangeId)) {
                                var cell = row_4.getCellUsingColumnIndex(row_4.rowIndex, element.editRangeStart.columnFirst);
                                if (!ej2_base_1.isNullOrUndefined(cell)) {
                                    if (cell.isRenderEditRangeStart) {
                                        cell.isRenderEditRangeEnd = true;
                                    }
                                }
                            }
                            else {
                                var table = element.paragraph.associatedCell.ownerTable;
                                for (var i = row_4.rowIndex - 1; i >= 0; i--) {
                                    var previousRow = table.childWidgets[i];
                                    if (previousRow.editRangeID.containsKey(element.editRangeStart.editRangeId)) {
                                        var previousCell = previousRow.getCellUsingColumnIndex(previousRow.rowIndex, element.editRangeStart.columnFirst);
                                        if (!ej2_base_1.isNullOrUndefined(previousCell)) {
                                            if (previousCell.isRenderEditRangeStart) {
                                                previousCell.isRenderEditRangeEnd = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline' && paragraph.floatingElements.indexOf(element) == -1) {
                    if (element instanceof page_1.ShapeElementBox) {
                        if (paragraph.floatingElements.indexOf(element) === -1) {
                            paragraph.floatingElements.push(element);
                        }
                        if (paragraph.bodyWidget.floatingElements.indexOf(element) === -1) {
                            paragraph.bodyWidget.floatingElements.push(element);
                        }
                    }
                }
                if (element instanceof page_1.ContentControl && this.documentHelper.contentControlCollection.indexOf(element) === -1) {
                    if (element.type === 0) {
                        this.documentHelper.contentControlCollection.push(element);
                    }
                    else if (element.type === 1) {
                        var endPage = element.paragraph.bodyWidget.page;
                        for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
                            var cCStart = this.documentHelper.contentControlCollection[i];
                            var isInHeaderFooter = cCStart.line.paragraph.isInHeaderFooter;
                            if (isInHeaderFooter && element.contentControlProperties === cCStart.contentControlProperties
                                && endPage === cCStart.line.paragraph.bodyWidget.page) {
                                element.reference = cCStart;
                                cCStart.reference = element;
                            }
                            else if (!isInHeaderFooter && element.contentControlProperties === cCStart.contentControlProperties) {
                                element.reference = cCStart;
                                cCStart.reference = element;
                            }
                        }
                    }
                }
                if (ej2_base_1.isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                    this.moveElementFromNextLine(line);
                }
                if (element.line.isLastLine() && ej2_base_1.isNullOrUndefined(element.nextElement)) {
                    if (this.hasValidElement(line.paragraph) && !paragraph.isContainsShapeAlone()) {
                        this.moveToNextLine(line);
                    }
                    else if (!this.isInitialLoad && !this.hasValidElement(line.paragraph) && line.paragraph.paragraphFormat.bidi && line.paragraph.paragraphFormat.listFormat.listId !== -1) {
                        this.moveToNextLine(line);
                    }
                    else {
                        this.layoutEmptyLineWidget(line.paragraph, false, line, false);
                    }
                }
                return;
            }
            if (element instanceof page_1.TextElementBox && element.characterFormat.highlightColor != "NoColor" && element.text.trim() != "" && element.text != element.text.trim()) {
                var firstLine = paragraph.firstChild;
                var lastLine = paragraph.lastChild;
                if (!ej2_base_1.isNullOrUndefined(firstLine) && firstLine instanceof page_1.LineWidget && firstLine.children.length > 0 && element === firstLine.children[0]) {
                    editor_helper_1.HelperMethods.splitSpaceInTextElementBox(element, true);
                }
                if (!ej2_base_1.isNullOrUndefined(lastLine) && lastLine instanceof page_1.LineWidget && lastLine.children.length > 0 && element === lastLine.children[lastLine.children.length - 1]) {
                    editor_helper_1.HelperMethods.splitSpaceInTextElementBox(element, false);
                }
            }
            var width = element.width;
            if (element instanceof page_1.FieldTextElementBox && !this.isTocField(element.fieldBegin)) {
                text = this.documentHelper.getFieldResult(element.fieldBegin, element.paragraph.bodyWidget.page);
                if (text !== '') {
                    element.text = text;
                }
                else {
                    text = element.text;
                }
            }
            else if (element instanceof page_1.FootnoteElementBox) {
                text = this.startAt(element, text);
                if (text !== '') {
                    element.text = text;
                }
            }
            else if (element instanceof page_1.TextElementBox) {
                if (!ej2_base_1.isNullOrUndefined(element.paragraph.containerWidget.footNoteReference)
                    && element.line.isFirstLine()
                    && element.paragraph.index === 0
                    && element.indexInOwner === 0
                    && !this.documentHelper.owner.editor.handleEnterKey) {
                    element.text = element.paragraph.containerWidget.footNoteReference.text;
                }
                this.checkAndSplitTabOrLineBreakCharacter(element.text, element);
                text = element.text;
            }
            if (element instanceof page_1.TextElementBox) {
                width = this.documentHelper.textHelper.getTextSize(element, element.characterFormat);
                if (element.text === '\t') {
                    width = this.getTabWidth(paragraph, this.viewer, index, line, element);
                    element.width = width;
                }
                else if (element.text === String.fromCharCode(31) || element.text === String.fromCharCode(14)) {
                    element.width = width = 0;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
                !(element instanceof page_1.ShapeElementBox && element.textWrappingStyle == 'Inline') && !(paragraph.containerWidget instanceof page_1.TextFrame && !(element instanceof page_1.CommentCharacterElementBox)) &&
                !(paragraph.containerWidget instanceof page_1.TableCellWidget && paragraph.containerWidget.ownerTable.containerWidget instanceof page_1.TextFrame)) {
                this.adjustPosition(element, element.line.paragraph.bodyWidget);
            }
            if (this.viewer instanceof viewer_1.PageLayoutViewer &&
                ((element instanceof page_1.ShapeElementBox && element.textWrappingStyle === 'Inline') || !(element instanceof page_1.ShapeElementBox))
                && this.viewer.clientActiveArea.height < element.height && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
                if ((element instanceof page_1.TextElementBox && element.text !== '\f' && element.text !== String.fromCharCode(14)) || !(element instanceof page_1.TextElementBox)) {
                    this.moveToNextPage(this.viewer, line);
                }
                if (element instanceof page_1.FieldTextElementBox) {
                    this.updateFieldText(element);
                }
                if (element.previousElement &&
                    ((element.previousElement instanceof page_1.ShapeElementBox && element.previousElement.textWrappingStyle === 'Inline') ||
                        !(element.previousElement instanceof page_1.ShapeElementBox))) {
                    this.cutClientWidth(element.previousElement);
                }
            }
            if (element instanceof page_1.ShapeElementBox && element.textWrappingStyle === 'Inline') {
                if (paragraph.floatingElements.indexOf(element) === -1) {
                    paragraph.floatingElements.push(element);
                }
                if (element.width > this.viewer.clientActiveArea.width) {
                    this.splitElementForClientArea(paragraph, element);
                    this.checkLineWidgetWithClientArea(line, element);
                }
                this.layoutShape(element);
            }
            if (element instanceof page_1.FootnoteElementBox && (!element.isLayout || this.isLayoutWhole) && this.documentHelper.owner.layoutType === 'Pages') {
                this.layoutFootEndNoteElement(element);
            }
            if (element instanceof page_1.FootnoteElementBox) {
                if (this.isfootMove) {
                    this.moveToNextPage(this.viewer, element.line);
                    if (element.previousElement &&
                        ((element.previousElement instanceof page_1.ShapeElementBox && element.previousElement.textWrappingStyle === 'Inline') ||
                            !(element.previousElement instanceof page_1.ShapeElementBox))) {
                        this.cutClientWidth(element.previousElement);
                    }
                    this.isfootMove = false;
                }
                if (paragraph.paragraphFormat.keepWithNext && paragraph.paragraphFormat.keepLinesTogether && !(!element.isLayout || this.isLayoutWhole)) {
                    if (!ej2_base_1.isNullOrUndefined(paragraph.bodyWidget.page.footnoteWidget) && paragraph.bodyWidget.page.footnoteWidget.y !== 0 && paragraph.bodyWidget.page.footnoteWidget.y < this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height) {
                        var findDiff = this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height - paragraph.bodyWidget.page.footnoteWidget.y;
                        this.viewer.clientActiveArea.height -= findDiff;
                    }
                }
            }
            if (parseFloat(width.toFixed(4)) <= parseFloat(this.viewer.clientActiveArea.width.toFixed(4)) || !this.viewer.textWrap) {
                this.addElementToLine(paragraph, element);
                if (ej2_base_1.isNullOrUndefined(element.nextElement) && !element.line.isLastLine()) {
                    var nextLine = element.line.nextLine;
                    var nextElement = nextLine.children[0];
                    if (nextElement instanceof page_1.TextElementBox && nextElement.text.indexOf(" ") == 0) {
                        this.moveElementFromNextLine(line);
                    }
                }
                if (ej2_base_1.isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                    this.moveElementFromNextLine(line);
                }
                else if (!element.line.isLastLine() && ej2_base_1.isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width === 0) {
                    this.moveToNextLine(line);
                    if (line.paragraph.lastChild === line && this.viewer.clientActiveArea.height >= 0) {
                        this.moveFromNextPage(line);
                    }
                }
            }
            else if (element instanceof page_1.TextElementBox) {
                if (element.text === '\t') {
                    var currentLine = element.line;
                    var isElementMoved = false;
                    if (element.indexInOwner !== 0 && element instanceof page_1.TabElementBox) {
                        isElementMoved = true;
                        this.addSplittedLineWidget(currentLine, currentLine.children.indexOf(element) - 1);
                    }
                    else {
                        if (this.isWrapText && this.viewer.clientActiveArea.x + this.viewer.clientActiveArea.width === this.viewer.clientActiveArea.right) {
                            this.isWrapText = false;
                        }
                        this.addSplittedLineWidget(currentLine, currentLine.children.indexOf(element));
                    }
                    this.moveToNextLine(currentLine);
                    if (currentLine.paragraph.bodyWidget.floatingElements.length > 0 && isElementMoved) {
                        this.nextElementToLayout = element;
                        this.hasFloatingElement = true;
                        return;
                    }
                    else {
                        element.width = this.getTabWidth(paragraph, this.viewer, index, element.line, element);
                        if (isElementMoved) {
                            this.addElementToLine(paragraph, element);
                            if (ej2_base_1.isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0
                                && !element.line.isLastLine()) {
                                this.moveElementFromNextLine(element.line);
                            }
                        }
                    }
                }
                else {
                    do {
                        line = element.line;
                        if (!(element.previousElement instanceof page_1.FieldElementBox && element.previousElement.fieldType == 2
                            && !ej2_base_1.isNullOrUndefined(element.previousElement.fieldBeginInternal)
                            && element.previousElement.fieldBeginInternal.formFieldData instanceof page_1.DropDownFormField)) {
                            this.splitTextForClientArea(line, element, element.text, element.trimEndWidth, element.characterFormat);
                        }
                        this.checkLineWidgetWithClientArea(line, element);
                        if (element instanceof page_1.FieldTextElementBox && !this.isInitialLoad) {
                            this.updateFieldText(element);
                        }
                        if (element.line !== line && !ej2_base_1.isNullOrUndefined(this.nextElementToLayout) && this.is2013Justification) {
                            return;
                        }
                    } while (element.line !== line && this.cutClientWidth(element));
                }
            }
            else {
                do {
                    line = element.line;
                    this.splitElementForClientArea(paragraph, element);
                    this.checkLineWidgetWithClientArea(line, element);
                    if (element instanceof page_1.FieldTextElementBox) {
                        this.updateFieldText(element);
                    }
                } while (element.line !== line && this.cutClientWidth(element));
            }
            var contentControl;
            if (!ej2_base_1.isNullOrUndefined(element.nextNode) && element.nextNode instanceof page_1.ContentControl) {
                contentControl = element.nextNode;
            }
            if ((text === '\v' || text === '\f' || text === '\r' || text === String.fromCharCode(14)) && !contentControl) {
                var elementIndex = line.children.indexOf(element);
                if (elementIndex > -1) {
                    this.addSplittedLineWidget(line, elementIndex);
                }
            }
            if (element.line.isLastLine() && ej2_base_1.isNullOrUndefined(element.nextElement) || text === '\v' || text === '\f' || text === '\r' || text === String.fromCharCode(14)) {
                if (this.isXPositionUpdated) {
                    this.isXPositionUpdated = false;
                    return;
                }
                this.moveToNextLine(element.line);
                if (text === '\v' && ej2_base_1.isNullOrUndefined(element.nextNode)) {
                    this.layoutEmptyLineWidget(paragraph, true, line, true);
                }
                else if ((text === '\f' || text === String.fromCharCode(14)) && this.viewer instanceof viewer_1.PageLayoutViewer && !(element.line.paragraph.containerWidget instanceof page_1.TableCellWidget)) {
                    var isRTLLayout = this.isRTLLayout;
                    this.isRTLLayout = false;
                    if (ej2_base_1.isNullOrUndefined(element.nextNode) || element.nextNode instanceof page_1.ContentControl) {
                        if (text === String.fromCharCode(14)) {
                            this.moveToNextPage(this.viewer, element.line.nextLine, false);
                            this.layoutEmptyLineWidget(element.line.nextLine.paragraph, false, element.line.nextLine, true);
                        }
                        else {
                            this.moveToNextPage(this.viewer, element.line, true);
                        }
                    }
                    else if (!ej2_base_1.isNullOrUndefined(element.line.nextLine)) {
                        this.moveToNextPage(this.viewer, element.line.nextLine, false);
                    }
                    this.isRTLLayout = isRTLLayout;
                }
            }
            this.isXPositionUpdated = false;
        };
        Layout.prototype.adjustPosition = function (element, bodyWidget) {
            var clientArea = this.viewer.clientActiveArea;
            var previousLeft = this.viewer.clientActiveArea.x;
            var previousTop = this.viewer.clientActiveArea.y;
            var previousWidth = this.viewer.clientActiveArea.width;
            var adjustedRect = this.adjustClientAreaBasedOnTextWrap(element, new page_1.Rect(clientArea.x, clientArea.y, clientArea.width, clientArea.height));
            this.viewer.clientActiveArea.width = adjustedRect.width;
            var wrapDiff = this.viewer.clientActiveArea.x - previousLeft;
            element.padding.left = wrapDiff > 0 ? wrapDiff : 0;
            if (previousWidth !== this.viewer.clientActiveArea.width) {
                var wrapPos = new editor_helper_1.WrapPosition(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.width);
                this.updateWrapPosition(wrapPos);
            }
            if (this.viewer.clientActiveArea.width === 0) {
                this.isWrapText = false;
            }
            if (this.isYPositionUpdated) {
                if (element.line.isFirstLine()) {
                    if (!ej2_base_1.isNullOrUndefined(element.line.paragraph.associatedCell)) {
                        var previousRenderedWidget = element.line.paragraph.previousRenderedWidget;
                        if (!ej2_base_1.isNullOrUndefined(previousRenderedWidget)) {
                            element.line.paragraph.associatedCell.height += (this.viewer.clientActiveArea.y - previousRenderedWidget.y + previousRenderedWidget.height);
                        }
                        else {
                            element.line.paragraph.associatedCell.height += (this.viewer.clientActiveArea.y - previousTop);
                        }
                    }
                    element.line.paragraph.y = this.viewer.clientActiveArea.y;
                }
                else if (element.line.children[0] === element) {
                    element.line.marginTop += (this.viewer.clientActiveArea.y - previousTop);
                }
                if (element.line.paragraph.containerWidget instanceof page_1.HeaderFooterWidget) {
                    element.line.paragraph.containerWidget.height += (this.viewer.clientActiveArea.y - previousTop);
                }
                if (!(element instanceof page_1.ListTextElementBox)) {
                    this.isYPositionUpdated = false;
                }
            }
        };
        Layout.prototype.updateWrapPosition = function (wrapPos) {
            for (var i = 0; i < this.wrapPosition.length; i++) {
                var previousWrapPos = this.wrapPosition[i];
                if (Math.abs(previousWrapPos.right - wrapPos.right) > 1) {
                    continue;
                }
                else {
                    return;
                }
            }
            this.wrapPosition.push(wrapPos);
        };
        Layout.prototype.isFirstitemInPage = function (element, yposition) {
            if (!element.line.paragraph.isInHeaderFooter && Math.round(yposition) === this.viewer.clientArea.y) {
                return true;
            }
            return false;
        };
        Layout.prototype.isTextFitBelow = function (rect, top, element) {
            return false;
        };
        Layout.prototype.isNeedToWrapForSquareTightAndThrough = function (bodyWidget, elementBox, wrapOwnerIndex, wrapItemIndex, textWrappingStyle, textWrappingBounds, allowOverlap, wrapCollectionIndex, floatingEntity, isTextRangeInTextBox, rect, width, height) {
            return (bodyWidget.floatingElements.length > 0
                && wrapOwnerIndex !== wrapCollectionIndex
                && wrapItemIndex !== wrapCollectionIndex
                && textWrappingStyle !== 'Inline'
                && textWrappingStyle !== 'Behind'
                && textWrappingStyle !== 'TopAndBottom'
                && textWrappingStyle !== 'InFrontOfText'
                && (Math.round((rect.y + height)) > Math.round(textWrappingBounds.y) ||
                    this.isTextFitBelow(textWrappingBounds, rect.y + height, floatingEntity))
                && Math.round(rect.y) < Math.round((textWrappingBounds.y + textWrappingBounds.height))
                && !(allowOverlap && (isTextRangeInTextBox || ((elementBox instanceof page_1.ImageElementBox)
                    && elementBox.textWrappingStyle !== 'Inline' && elementBox.allowOverlap))));
        };
        Layout.prototype.isNeedToWrapForSquareTightAndThroughForTable = function (container, table, wrapIndex, wrapItemIndex, wrappingStyle, textWrappingBounds, allowOverlap, wrapCollectionIndex, floatingElemnt, isInTextBox, rect, width, height) {
            return (container.floatingElements.length > 0 && wrapIndex !== wrapCollectionIndex
                && wrapItemIndex !== wrapCollectionIndex && wrappingStyle !== 'Inline'
                && wrappingStyle !== 'Behind' && wrappingStyle !== 'TopAndBottom'
                && wrappingStyle !== 'InFrontOfText'
                && ((Math.round(rect.y + height) >= Math.round(textWrappingBounds.y)
                    && Math.round(rect.y) < Math.round(textWrappingBounds.bottom))
                    || Math.round(rect.y + height) <= Math.round(textWrappingBounds.bottom)
                        && Math.round(rect.y + height) >= Math.round(textWrappingBounds.y))
                && !(allowOverlap && (isInTextBox)));
        };
        Layout.prototype.isNeedToWrapLeafWidget = function (pargaraph, elementBox) {
            var IsNeedToWrap = true;
            return (pargaraph.bodyWidget.floatingElements.length > 0
                && (IsNeedToWrap || pargaraph.associatedCell)
                && !(elementBox instanceof page_1.ShapeBase && (elementBox.textWrappingStyle === 'InFrontOfText' || elementBox.textWrappingStyle === 'Behind')));
        };
        Layout.prototype.getMinWidth = function (currTextRange, width, height, rect) {
            var text = currTextRange.text;
            var split = text.split(' ');
            if (text !== '' && text.trim() === ''
                && currTextRange && currTextRange.line.paragraph
                && currTextRange.previousNode && currTextRange.nextNode
                && currTextRange.line.paragraph.isEmpty) {
                split = [''];
            }
            var minwidth = this.documentHelper.textHelper.measureText(split[0], currTextRange.characterFormat, currTextRange.scriptType).Width;
            var nextSibling = this.getNextSibling(currTextRange);
            if (split.length === 1 && nextSibling) {
                var nextSiblingText = nextSibling.text;
                minwidth += this.getNextTextRangeWidth(nextSibling, nextSiblingText, width, height, rect);
            }
            return minwidth;
        };
        Layout.prototype.getNextTextRangeWidth = function (nextSiblingTextRange, nextSiblingText, width, height, rect) {
            var nextsibling = nextSiblingTextRange;
            var sizeNext = new page_1.Rect(0, 0, 0, 0);
            var isNextSiblingSizeNeedToBeMeasure = this.isNextSibligSizeNeedToBeMeasure(sizeNext, nextSiblingTextRange, rect, width, height);
            while (isNextSiblingSizeNeedToBeMeasure
                && this.isLeafWidgetNextSiblingIsTextRange(nextsibling)
                && width + sizeNext.width < rect.width) {
                nextsibling = this.getNextSibling(nextsibling);
                if (!this.isNextSibligSizeNeedToBeMeasure(sizeNext, nextsibling, rect, width, height)) {
                    break;
                }
                nextSiblingText += nextsibling.text;
            }
            return sizeNext.width;
        };
        Layout.prototype.isLeafWidgetNextSiblingIsTextRange = function (textRange) {
            var nextSiblingTextRange = this.getNextSibling(textRange);
            if (nextSiblingTextRange && nextSiblingTextRange instanceof page_1.TextElementBox) {
                return true;
            }
            return false;
        };
        Layout.prototype.isNextSibligSizeNeedToBeMeasure = function (sizeNext, nextSiblingwidget, rect, width, height) {
            var text = null;
            var nextSiblingTextRange = nextSiblingwidget;
            if (nextSiblingTextRange) {
                text = nextSiblingTextRange.text;
                if (text.indexOf(' ') !== -1 || (text.indexOf('-') !== -1 || (text.indexOf('_') !== -1)
                    && ((width + sizeNext.width + (this.documentHelper.textHelper.measureText(text.split('-')[0], nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType)).Width) < rect.width))
                    || ((nextSiblingTextRange).text === '\t')) {
                    var elementWidth = nextSiblingTextRange.width;
                    if (text !== text.split(' ')[0]) {
                        elementWidth = this.documentHelper.textHelper.measureText(text.split(' ')[0], nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType).Width;
                    }
                    if ((width + sizeNext.width + elementWidth) > rect.width && text.indexOf('-')) {
                        if (text !== text.split('-')[0] + '-') {
                            elementWidth = this.documentHelper.textHelper.measureText(text.split('-')[0] + '-', nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType).Width;
                        }
                    }
                    sizeNext.width += elementWidth;
                    return false;
                }
                else {
                    if (nextSiblingTextRange.text.length > 0) {
                        var textInfo = this.documentHelper.textHelper.measureText(nextSiblingTextRange.text, nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType);
                        sizeNext.height += textInfo.Height;
                        sizeNext.width += textInfo.Width;
                    }
                }
            }
            return true;
        };
        Layout.prototype.isNeedDoIntermediateWrapping = function (remainingClientWidth, textWrappingStyle, rect, width, paragraph, textWrappingBounds, leafWidget, minwidth, minimumWidthRequired) {
            return (((remainingClientWidth > minimumWidthRequired)
                && (((Math.round(rect.width) <= Math.round(minwidth)
                    || (rect.width < width && leafWidget.paragraph.isInsideTable))
                    && textWrappingStyle !== 'Left'
                    && textWrappingStyle !== 'Largest')
                    || textWrappingStyle === 'Right'
                    || (rect.width < remainingClientWidth && textWrappingStyle === 'Largest')))
                || ((Math.round(textWrappingBounds.x - paragraph.x + paragraph.leftIndent) < minimumWidthRequired
                    || (leafWidget instanceof page_1.TextElementBox && this.isFloatingItemOnLeft(rect, minwidth, textWrappingBounds)))
                    && (textWrappingStyle !== 'Left' || remainingClientWidth < minimumWidthRequired)));
        };
        Layout.prototype.isFloatingItemOnLeft = function (rect, minWidth, bounds) {
            return false;
        };
        Layout.prototype.getNextSibling = function (currentElementBox) {
            var nextSibling = currentElementBox.nextNode;
            var isFieldCode = false;
            while (nextSibling) {
                if ((nextSibling instanceof page_1.FieldElementBox) || (nextSibling instanceof page_1.BookmarkElementBox) || isFieldCode || nextSibling instanceof page_1.ListTextElementBox) {
                    if (nextSibling instanceof page_1.FieldElementBox) {
                        if (nextSibling.fieldType === 0) {
                            isFieldCode = true;
                        }
                        else if (nextSibling.fieldType === 2) {
                            isFieldCode = false;
                        }
                    }
                }
                else if (nextSibling instanceof page_1.TextElementBox) {
                    break;
                }
                nextSibling = nextSibling.nextNode;
            }
            return nextSibling;
        };
        Layout.prototype.adjustClientAreaBasedOnTextWrap = function (elementBox, rect) {
            var ownerPara = elementBox.line.paragraph;
            var bodyWidget = ownerPara.bodyWidget;
            var yValue = 0;
            var layouter = this.viewer;
            var yposition = rect.y;
            var isFirstItem = this.isFirstitemInPage(elementBox, yposition);
            if (isFirstItem) {
                yValue = yposition;
            }
            isFirstItem = ej2_base_1.isNullOrUndefined(ownerPara.previousWidget);
            if (this.isNeedToWrapLeafWidget(ownerPara, elementBox)) {
                var clientLayoutArea = layouter.clientArea;
                bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
                bodyWidget.floatingElements.sort(function (a, b) { return a.x - b.x; });
                for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                    var floatingItem = bodyWidget.floatingElements[i];
                    var allowOverlap = false;
                    if (floatingItem instanceof page_1.ShapeBase) {
                        allowOverlap = floatingItem.allowOverlap;
                    }
                    else {
                        allowOverlap = floatingItem.positioning.allowOverlap;
                    }
                    if (ownerPara.isInsideTable) {
                        if (floatingItem instanceof page_1.TableWidget && !floatingItem.isInsideTable) {
                            continue;
                        }
                    }
                    if (this.isRelayout && !this.isRelayoutOverlap &&
                        this.viewer.documentHelper.selection.isExistAfter(floatingItem instanceof page_1.TableWidget ? floatingItem : floatingItem.line.paragraph, elementBox.line.paragraph)
                        || this.isRelayout && this.isRelayoutOverlap && this.viewer.documentHelper.selection.isExistAfter(floatingItem instanceof page_1.TableWidget ? floatingItem : floatingItem.line.paragraph, this.endOverlapWidget)) {
                        continue;
                    }
                    var xPosition = floatingItem.x;
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
                    var textWrappingStyle = floatingItem instanceof page_1.TableWidget ? 'Square' : floatingItem.textWrappingStyle;
                    var textWrappingType = floatingItem instanceof page_1.TableWidget ? 'Both' : floatingItem.textWrappingType;
                    var minimumWidthRequired = 24;
                    var bottom = layouter.clientArea.y + floatingItem.height;
                    if (!(clientLayoutArea.x > (textWrappingBounds.right + minimumWidthRequired) || clientLayoutArea.right < textWrappingBounds.x - minimumWidthRequired)) {
                        if (this.isNeedToWrapForSquareTightAndThrough(bodyWidget, elementBox, -1, -1, textWrappingStyle, textWrappingBounds, allowOverlap, 1, floatingItem, false, rect, elementBox.width, elementBox.height)) {
                            var rightIndent = 0;
                            var leftIndent = 0;
                            var listLeftIndent = 0;
                            var firstLineIndent = editor_helper_1.HelperMethods.convertPointToPixel(elementBox.paragraph.paragraphFormat.firstLineIndent);
                            var paragraphLeftIndent = editor_helper_1.HelperMethods.convertPointToPixel(ownerPara.paragraphFormat.leftIndent);
                            var paragarphRightIndent = editor_helper_1.HelperMethods.convertPointToPixel(ownerPara.paragraphFormat.rightIndent);
                            firstLineIndent = ((elementBox.indexInOwner === 0 && elementBox.line.isFirstLine()) && firstLineIndent > 0) ? firstLineIndent : 0;
                            var currTextRange = elementBox instanceof page_1.TextElementBox || elementBox instanceof page_1.ListTextElementBox ? elementBox : null;
                            var containerWidget = floatingItem instanceof page_1.TableWidget ? floatingItem.containerWidget : floatingItem.line.paragraph.containerWidget;
                            var isnewline = false;
                            if (elementBox.line.paragraph) {
                                if (rect.x >= textWrappingBounds.x && textWrappingType !== 'Left') {
                                    rightIndent = paragarphRightIndent;
                                }
                                if (rect.x < textWrappingBounds.x && textWrappingType !== 'Right') {
                                    leftIndent = paragraphLeftIndent;
                                }
                                var listFormat = ownerPara.paragraphFormat.listFormat;
                                var listLevel = this.getListLevel(listFormat.list, listFormat.listLevelNumber);
                                if (rect.x === (clientLayoutArea.x + paragraphLeftIndent)
                                    && listFormat && listFormat.baseStyle
                                    && listLevel && listLevel.paragraphFormat.leftIndent !== 0) {
                                    listLeftIndent = paragraphLeftIndent;
                                    isnewline = true;
                                }
                            }
                            var border = 0;
                            var isBorderValueZero = false;
                            var table = void 0;
                            var borderThickness = 0;
                            var tableHorizontalPosition = void 0;
                            if (floatingItem instanceof page_1.TableWidget) {
                                table = floatingItem;
                                tableHorizontalPosition = floatingItem.positioning.horizontalAlignment;
                                border = this.getMaximumRightCellBorderWidth(floatingItem);
                                isBorderValueZero = this.getDefaultBorderSpacingValue(border, isBorderValueZero, tableHorizontalPosition);
                                borderThickness = floatingItem.tableFormat.borders.left.lineWidth / 2;
                            }
                            if (rect.x + borderThickness >= textWrappingBounds.x && rect.x < textWrappingBounds.right && textWrappingType !== 'Left') {
                                rect.width = rect.width - (textWrappingBounds.right - rect.x) - rightIndent;
                                this.isWrapText = true;
                                var isEntityFitInCurrentLine = true;
                                if (!ej2_base_1.isNullOrUndefined(table)) {
                                    minimumWidthRequired = this.getMinimumWidthRequiredForTable(isBorderValueZero, tableHorizontalPosition, border);
                                }
                                if (!isEntityFitInCurrentLine || Math.round(rect.width) < minimumWidthRequired || (rect.width < elementBox.width && elementBox.text === '\t')
                                    || (textWrappingBounds.x < ownerPara.x + paragraphLeftIndent)) {
                                    rect.width = this.viewer.clientArea.right - textWrappingBounds.right - (isnewline ? listLeftIndent : 0);
                                    var minwidth = 0;
                                    if (!ej2_base_1.isNullOrUndefined(currTextRange)) {
                                        minwidth = this.getMinWidth(elementBox, elementBox.width, elementBox.height, rect);
                                    }
                                    else {
                                        minwidth = elementBox.width;
                                    }
                                    if (Math.round(rect.width) < minimumWidthRequired || rect.width < minwidth) {
                                        if (isEntityFitInCurrentLine && (textWrappingBounds.x - (ownerPara.x + ownerPara.leftIndent)) > minimumWidthRequired
                                            && (this.viewer.clientArea.right - textWrappingBounds.right) > minimumWidthRequired) {
                                            rect.width = 0;
                                        }
                                        else {
                                            var topMarginValue = 0;
                                            var isPositionsUpdated = false;
                                            if (!isPositionsUpdated) {
                                                this.isYPositionUpdated = true;
                                                rect.width = this.viewer.clientArea.width;
                                                rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                                rect.y = textWrappingBounds.bottom + topMarginValue;
                                            }
                                        }
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                        this.isWrapText = false;
                                    }
                                    else {
                                        var xposition = rect.x;
                                        rect.x = textWrappingBounds.right + (isnewline ? listLeftIndent : 0) + firstLineIndent;
                                        rect.width -= firstLineIndent;
                                        if (textWrappingStyle === 'Square' && rect.width < 0 && elementBox.width > 0) {
                                            var topMarginValue = 0;
                                            this.isYPositionUpdated = true;
                                            rect.width = this.viewer.clientArea.width;
                                            rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                            rect.y = textWrappingBounds.bottom + topMarginValue;
                                            rect.x = xposition;
                                        }
                                        else {
                                        }
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                    }
                                }
                                else {
                                    var xposition = rect.x;
                                    rect.x = textWrappingBounds.right + (isnewline ? listLeftIndent : 0) + firstLineIndent;
                                    rect.width = this.viewer.clientArea.right - textWrappingBounds.right - (isnewline ? listLeftIndent : 0) - firstLineIndent;
                                    if (textWrappingStyle === 'Square' && rect.width < 0 && elementBox.width > 0) {
                                        var topMarginValue = 0;
                                        this.isYPositionUpdated = true;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                        rect.y = textWrappingBounds.bottom + topMarginValue;
                                        rect.x = xposition;
                                    }
                                    this.isWrapText = true;
                                    this.viewer.updateClientAreaForTextWrap(rect);
                                }
                            }
                            else if (textWrappingBounds.x >= rect.x && rect.right > textWrappingBounds.x) {
                                rect.width = textWrappingBounds.x - rect.x - rightIndent;
                                var remainingClientWidth = this.viewer.clientArea.right - textWrappingBounds.right;
                                remainingClientWidth = remainingClientWidth > 0 ? remainingClientWidth : 0;
                                this.isWrapText = true;
                                var isUpdateClientArea = false;
                                var minwidth = 0;
                                if (!ej2_base_1.isNullOrUndefined(currTextRange)) {
                                    minwidth = this.getMinWidth(currTextRange, elementBox.width, elementBox.height, rect);
                                }
                                else {
                                    minwidth = elementBox.width;
                                }
                                if (!ej2_base_1.isNullOrUndefined(table)) {
                                    minimumWidthRequired = this.getMinimumWidthRequiredForTable(isBorderValueZero, tableHorizontalPosition, border);
                                }
                                if (this.isNeedDoIntermediateWrapping(remainingClientWidth, textWrappingType, rect, elementBox.width, elementBox.paragraph, textWrappingBounds, elementBox, minwidth, minimumWidthRequired)) {
                                    var leftMinimumWidthRequired = 24;
                                    rect.width = remainingClientWidth;
                                    this.isWrapText = true;
                                    if (rect.x + minwidth > textWrappingBounds.x || textWrappingType === 'Right' || clientLayoutArea.x > textWrappingBounds.x - leftMinimumWidthRequired) {
                                        rect.x = textWrappingBounds.right;
                                        if (rect.width > minwidth || textWrappingType === 'Right') {
                                            this.viewer.updateClientAreaForTextWrap(rect);
                                        }
                                        else if (rect.width < minwidth && elementBox.line.children[0] !== elementBox && textWrappingType === 'Both' && floatingItem instanceof page_1.ShapeBase) {
                                            this.viewer.updateClientAreaForTextWrap(rect);
                                            isUpdateClientArea = true;
                                        }
                                    }
                                    if ((rect.width < minimumWidthRequired && !(minwidth < remainingClientWidth && ('Tight' === textWrappingStyle)))
                                        || (rect.width < minwidth && Math.round(rect.right) === Math.round(this.viewer.clientArea.right)
                                            && textWrappingType === 'Both')) {
                                        var rect1 = textWrappingBounds;
                                        if (Math.round(rect.x) === Math.round(bodyWidget.sectionFormat.leftMargin + ownerPara.paragraphFormat.leftIndent)) {
                                            var topMarginValue = 0;
                                            rect.y = rect1.bottom + topMarginValue;
                                            this.isYPositionUpdated = true;
                                            rect.width = this.viewer.clientArea.width;
                                            rect.height = rect.height - (rect1.height + topMarginValue);
                                            this.viewer.updateClientAreaForTextWrap(rect);
                                            this.isWrapText = false;
                                        }
                                        else if (!isUpdateClientArea && Math.round(rect.right) >= Math.round(this.viewer.clientArea.right) && textWrappingType === 'Both') {
                                            var topMarginValue = 0;
                                            rect.y = rect1.bottom + topMarginValue;
                                            rect.width = this.viewer.clientArea.width;
                                            rect.height = rect.height - (rect1.height + topMarginValue);
                                            rect.x = this.viewer.clientArea.x + leftIndent;
                                            this.viewer.updateClientAreaForTextWrap(rect);
                                            this.isYPositionUpdated = true;
                                            this.isWrapText = false;
                                        }
                                        else {
                                            rect.width = 0;
                                            this.viewer.updateClientAreaForTextWrap(rect);
                                        }
                                    }
                                }
                                else {
                                    if ((elementBox.line.isFirstLine() && elementBox.indexInOwner === 0 || remainingClientWidth === 0 && elementBox.line.children[0] === elementBox) && textWrappingStyle === 'Square'
                                        && Math.round(rect.width) <= Math.round(minwidth)
                                        && ownerPara.containerWidget === containerWidget) {
                                        rect.x = clientLayoutArea.x;
                                        rect.y = textWrappingBounds.bottom;
                                        rect.width = clientLayoutArea.width;
                                        rect.height -= (textWrappingBounds.bottom - rect.y);
                                        this.isYPositionUpdated = true;
                                    }
                                    else if (Math.round(rect.width) <= Math.round(minwidth) && Math.round(rect.x - leftIndent) !== Math.round(this.viewer.clientArea.x)) {
                                        rect.width = 0;
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect);
                                }
                            }
                            if (textWrappingType !== 'Both') {
                                this.isWrapText = false;
                            }
                        }
                    }
                }
            }
            return rect;
        };
        Layout.prototype.adjustClientAreaBasedOnTextWrapForTable = function (table, rect) {
            if (ej2_base_1.isNullOrUndefined(table.containerWidget) || ej2_base_1.isNullOrUndefined(table.bodyWidget)) {
                return rect;
            }
            var bodyWidget = table.bodyWidget;
            var yValue = 0;
            var layouter = this.viewer;
            var yposition = rect.y;
            var isFirstItem = ej2_base_1.isNullOrUndefined(table.previousWidget);
            if (isFirstItem) {
                yValue = yposition;
            }
            if (bodyWidget.floatingElements.length > 0) {
                var clientLayoutArea = layouter.clientActiveArea;
                bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
                bodyWidget.floatingElements.sort(function (a, b) { return a.x - b.x; });
                for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                    var floatingElement = bodyWidget.floatingElements[i];
                    var allowOverlap = false;
                    if (floatingElement instanceof page_1.ShapeBase) {
                        allowOverlap = floatingElement.allowOverlap;
                    }
                    else {
                        allowOverlap = floatingElement.positioning.allowOverlap;
                    }
                    if (table.isInsideTable) {
                        if (floatingElement instanceof page_1.TableWidget && !floatingElement.isInsideTable) {
                            continue;
                        }
                    }
                    if (floatingElement instanceof page_1.TableWidget && floatingElement.wrapTextAround && floatingElement.positioning.allowOverlap) {
                        if (table.wrapTextAround && table.positioning.allowOverlap) {
                            continue;
                        }
                    }
                    var tableWidth = table.getTableCellWidth();
                    var isShape = floatingElement instanceof page_1.ShapeBase;
                    var distanceLeft = isShape ? floatingElement.distanceLeft : floatingElement.positioning.distanceLeft;
                    var distanceTop = isShape ? floatingElement.distanceTop : floatingElement.positioning.distanceTop;
                    var distanceRight = isShape ? floatingElement.distanceRight : floatingElement.positioning.distanceRight;
                    var distanceBottom = isShape ? floatingElement.distanceBottom : floatingElement.positioning.distanceBottom;
                    var width = isShape ? floatingElement.width : floatingElement.getTableCellWidth();
                    var wrappingBounds = new page_1.Rect(floatingElement.x - distanceLeft, floatingElement.y - distanceTop, width + distanceLeft + distanceRight, floatingElement.height + distanceTop + distanceBottom);
                    var textWrappingStyle = floatingElement instanceof page_1.TableWidget ? 'Square' : floatingElement.textWrappingStyle;
                    var textWrappingType = floatingElement instanceof page_1.TableWidget ? 'Both' : floatingElement.textWrappingType;
                    var minimumWidthRequired = 24;
                    var tableHeight = table.childWidgets.length > 0 ? table.childWidgets[0].rowFormat.height : 0;
                    var lastNestedTable = this.getNestedTable(table);
                    var characterFormat = lastNestedTable.firstChild.firstChild.firstChild.characterFormat;
                    var size = this.documentHelper.textHelper.measureText(" ", characterFormat);
                    if (tableHeight < size.Height) {
                        tableHeight = size.Height;
                    }
                    if (!(clientLayoutArea.x > (wrappingBounds.right + minimumWidthRequired) || clientLayoutArea.right < wrappingBounds.x - minimumWidthRequired)) {
                        if (this.isNeedToWrapForSquareTightAndThroughForTable(bodyWidget, table, -1, -1, textWrappingStyle, wrappingBounds, allowOverlap, 1, floatingElement, false, rect, tableWidth, tableHeight)) {
                            if (rect.x >= wrappingBounds.x && rect.x < wrappingBounds.right && textWrappingType !== 'Left') {
                                rect.width = rect.width - (wrappingBounds.right - rect.x);
                                this.isWrapText = true;
                                var isEntityFitInCurrentLine = true;
                                if (!isEntityFitInCurrentLine || Math.round(rect.width) < minimumWidthRequired || (rect.width < tableWidth)
                                    || (wrappingBounds.x < table.x)) {
                                    rect.width = this.viewer.clientArea.right - wrappingBounds.right;
                                    var minwidth = tableWidth;
                                    if (Math.round(rect.width) < minimumWidthRequired || rect.width < minwidth) {
                                        if (isEntityFitInCurrentLine && (wrappingBounds.x - (table.x)) > minimumWidthRequired
                                            && (this.viewer.clientArea.right - wrappingBounds.right) > minimumWidthRequired) {
                                            rect.width = 0;
                                        }
                                        else {
                                            var topMarginValue = 0;
                                            var isPositionsUpdated = false;
                                            if (!isPositionsUpdated) {
                                                this.isYPositionUpdated = true;
                                                rect.width = this.viewer.clientArea.width;
                                                rect.height -= (wrappingBounds.bottom + topMarginValue - rect.y);
                                                rect.y = wrappingBounds.bottom + topMarginValue;
                                            }
                                        }
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                        this.isWrapText = false;
                                    }
                                    else {
                                        var xposition = rect.x;
                                        rect.x = wrappingBounds.right;
                                        if (textWrappingStyle === 'Square' && rect.width < 0 && tableWidth > 0) {
                                            var marginTop = 0;
                                            this.isYPositionUpdated = true;
                                            rect.height -= (wrappingBounds.bottom + marginTop - rect.y);
                                            rect.width = this.viewer.clientArea.width;
                                            rect.y = wrappingBounds.bottom + marginTop;
                                            rect.x = xposition;
                                        }
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                    }
                                }
                                else {
                                    var xposition = rect.x;
                                    rect.x = wrappingBounds.right + table.firstChild.firstChild.leftMargin;
                                    rect.width = this.viewer.clientArea.right - wrappingBounds.right;
                                    if (textWrappingStyle === 'Square' && rect.width < 0 && tableWidth > 0) {
                                        var topMarginValue = 0;
                                        this.isYPositionUpdated = true;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height -= (wrappingBounds.bottom + topMarginValue - rect.y);
                                        rect.y = wrappingBounds.bottom + topMarginValue;
                                        rect.x = xposition;
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect);
                                }
                            }
                        }
                    }
                }
            }
            return rect;
        };
        Layout.prototype.getNestedTable = function (tableWidget) {
            var table = tableWidget;
            while (table.firstChild.firstChild.firstChild instanceof page_1.TableWidget) {
                table = table.firstChild.firstChild.firstChild;
            }
            return table;
        };
        Layout.prototype.startAt = function (element, text) {
            if (element.footnoteType === 'Footnote') {
                this.startat = element.paragraph.bodyWidget.sectionFormat.initialFootNoteNumber;
                text = this.getFootEndNote(element.paragraph.bodyWidget.sectionFormat.footNoteNumberFormat, this.documentHelper.footnoteCollection.indexOf(element) + this.startat);
            }
            else {
                this.startat = element.paragraph.bodyWidget.sectionFormat.initialEndNoteNumber;
                text = this.getFootEndNote(element.paragraph.bodyWidget.sectionFormat.endnoteNumberFormat, this.documentHelper.endnoteCollection.indexOf(element) + this.startat);
            }
            return text;
        };
        Layout.prototype.layoutFootEndNoteElement = function (element) {
            this.isFootnoteContentChanged = true;
            var footnote;
            var positionchanged = false;
            var footIndex = this.documentHelper.footnoteCollection.indexOf(element);
            var insertIndex = 1;
            this.islayoutFootnote = true;
            var isFitted;
            var clientArea = new page_1.Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
            var clientActiveArea = new page_1.Rect(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.y, this.viewer.clientActiveArea.width, this.viewer.clientActiveArea.height);
            var bodyWidget = element.paragraph.bodyWidget;
            var isCreated = false;
            var height = 0;
            if (bodyWidget.page.footnoteWidget) {
                for (var j = 0; j < bodyWidget.page.footnoteWidget.bodyWidgets.length; j++) {
                    insertIndex = bodyWidget.page.footnoteWidget.bodyWidgets.length;
                    var currentIndex = this.documentHelper.footnoteCollection.indexOf((bodyWidget.page.footnoteWidget.bodyWidgets[j]).footNoteReference);
                    if (currentIndex > footIndex) {
                        if (currentIndex - footIndex === 1) {
                            insertIndex = j;
                            positionchanged = true;
                            break;
                        }
                    }
                }
            }
            element.isLayout = true;
            if (element.footnoteType === 'Footnote') {
                if (bodyWidget.page.footnoteWidget && bodyWidget.page.footnoteWidget instanceof page_1.FootNoteWidget) {
                    footnote = bodyWidget.page.footnoteWidget;
                }
                else {
                    isCreated = true;
                    footnote = new page_1.FootNoteWidget();
                    footnote.footNoteType = 'Footnote';
                    footnote.page = bodyWidget.page;
                    var newParagraph = new page_1.ParagraphWidget();
                    newParagraph.characterFormat = new index_1.WCharacterFormat();
                    newParagraph.paragraphFormat = new index_1.WParagraphFormat();
                    newParagraph.index = 0;
                    var lineWidget = new page_1.LineWidget(newParagraph);
                    newParagraph.childWidgets.push(lineWidget);
                    height = this.documentHelper.textHelper.getParagraphMarkSize(newParagraph.characterFormat).Height;
                    footnote.margin = new page_1.Margin(0, height, 0, 0);
                }
                this.isFootNoteLayoutStart = true;
                if (isCreated) {
                    bodyWidget.page.footnoteWidget = footnote;
                }
                var body = element.bodyWidget;
                this.viewer.updateClientArea(footnote, footnote.page);
                this.viewer.clientArea.y = clientArea.y;
                this.viewer.clientActiveArea.y = clientActiveArea.y;
                for (var i = 0; i < element.bodyWidget.childWidgets.length; i++) {
                    var block = element.bodyWidget.childWidgets[i];
                    block.containerWidget = body;
                    body.page = bodyWidget.page;
                    body.sectionFormat = footnote.sectionFormat;
                    block.containerWidget.containerWidget = footnote;
                    this.viewer.updateClientAreaForBlock(block, true);
                    if (block instanceof page_1.TableWidget) {
                        this.clearTableWidget(block, true, true);
                    }
                    this.layoutBlock(block, 0);
                    height += block.height;
                    block.y = 0;
                    this.viewer.updateClientAreaForBlock(block, false);
                    body.height += block.height;
                }
                if (footnote.sectionFormat.columns.length > 1 && !(footnote.bodyWidgets.length === 0 && body.childWidgets.length <= 1 && body.childWidgets[0].childWidgets.length <= 1)) {
                    height = (height / footnote.sectionFormat.numberOfColumns);
                }
                this.isFootNoteLayoutStart = false;
                isFitted = false;
                if (height >= clientActiveArea.height) {
                    this.isfootMove = true;
                }
                if (positionchanged) {
                    footnote.bodyWidgets.splice(insertIndex, 0, body);
                }
                else {
                    footnote.bodyWidgets.push(body);
                }
                if (element.line.paragraph.isInsideTable) {
                    var table = this.getParentTable(element.line.paragraph.associatedCell.ownerTable);
                    if (ej2_base_1.isNullOrUndefined(table.footnoteElement)) {
                        table.footnoteElement = [];
                    }
                    if (table.footnoteElement.indexOf(element) == -1) {
                        table.footnoteElement.push(element);
                        this.layoutedFootnoteElement.push(element);
                    }
                }
                footnote.height += height;
                isFitted = true;
                this.viewer.clientActiveArea = clientActiveArea;
                this.viewer.clientActiveArea.height -= height;
                this.footnoteHeight += height;
                this.viewer.clientArea = clientArea;
            }
            return isFitted;
        };
        Layout.prototype.layoutEndNoteElement = function () {
            var totalPage = this.documentHelper.pages.length;
            if (this.documentHelper.endnoteCollection.length > 0) {
                var foot = void 0;
                var endNote = void 0;
                var isCreated = void 0;
                var lastPage = this.documentHelper.pages[totalPage - 1];
                var bodyWidget = lastPage.bodyWidgets[0];
                var lastSection = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
                if (this.viewer instanceof viewer_1.PageLayoutViewer && lastSection.sectionFormat.numberOfColumns > 1) {
                    var firstSection = this.getBodyWidget(lastSection, true);
                    this.splitBodyWidgetBasedOnColumn(firstSection);
                }
                for (var i = 0; i < this.documentHelper.endnoteCollection.length; i++) {
                    foot = this.documentHelper.endnoteCollection[i];
                    if (bodyWidget.page.endnoteWidget instanceof page_1.FootNoteWidget && bodyWidget.page.endnoteWidget.footNoteType === 'Endnote') {
                        endNote = bodyWidget.page.endnoteWidget;
                    }
                    else {
                        isCreated = true;
                        endNote = new page_1.FootNoteWidget();
                        endNote.footNoteType = 'Endnote';
                        endNote.page = bodyWidget.page;
                    }
                    var body = foot.bodyWidget;
                    body.page = endNote.page;
                    for (var j = 0; j < foot.bodyWidget.childWidgets.length; j++) {
                        var block = foot.bodyWidget.childWidgets[j];
                        block.containerWidget = body;
                        block.containerWidget.containerWidget = endNote;
                    }
                    if (endNote.bodyWidgets.indexOf(body) === -1) {
                        endNote.bodyWidgets.push(body);
                        body.sectionFormat = endNote.page.bodyWidgets[endNote.page.bodyWidgets.length - 1].sectionFormat;
                    }
                    if (isCreated) {
                        bodyWidget.page.endnoteWidget = endNote;
                    }
                }
                this.layoutfootNote(endNote);
            }
        };
        Layout.prototype.hasValidElement = function (paragraph) {
            var line = paragraph.firstChild;
            if (line && !ej2_base_1.isNullOrUndefined(this.documentHelper.selection)) {
                var elementBox = line.children[0];
                while (elementBox) {
                    if (elementBox instanceof page_1.FieldElementBox) {
                        elementBox = this.documentHelper.selection.getNextValidElementForField(elementBox);
                        if (!ej2_base_1.isNullOrUndefined(elementBox) && !elementBox.line.paragraph.equals(paragraph)) {
                            return false;
                        }
                    }
                    if (elementBox instanceof page_1.TextElementBox || elementBox instanceof page_1.ImageElementBox) {
                        return true;
                    }
                    if (!ej2_base_1.isNullOrUndefined(elementBox)) {
                        elementBox = elementBox.nextNode;
                    }
                }
            }
            return false;
        };
        Layout.prototype.updateFieldText = function (element) {
            var text = this.documentHelper.getFieldResult(element.fieldBegin, element.paragraph.bodyWidget.page);
            if (text !== '') {
                element.text = text;
                this.documentHelper.textHelper.getTextSize(element, element.characterFormat);
            }
        };
        Layout.prototype.checkLineWidgetWithClientArea = function (line, element) {
            if (line !== element.line || element.line === line && ej2_base_1.isNullOrUndefined(element.nextElement)
                && !element.line.isLastLine()) {
                this.moveToNextLine(line);
                if (this.documentHelper.compatibilityMode !== 'Word2013' && this.isOverlapFloatTable) {
                    var table = void 0;
                    if (element.line.paragraph.previousRenderedWidget instanceof page_1.TableWidget && element.line.paragraph.previousRenderedWidget.wrapTextAround) {
                        table = element.line.paragraph.previousRenderedWidget;
                        this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                            editor_helper_1.HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
                    }
                    this.viewer.clientActiveArea.x += line.paragraph.leftIndent;
                    this.isOverlapFloatTable = false;
                }
                if (line !== element.line) {
                    this.isRTLLayout = false;
                }
            }
            if (element.line !== line && this.viewer instanceof viewer_1.PageLayoutViewer
                && this.viewer.clientActiveArea.height < element.height &&
                this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
                this.moveToNextPage(this.viewer, element.line);
            }
            else if (element.line === line && ej2_base_1.isNullOrUndefined(element.nextElement)
                && line.paragraph.lastChild === line && !line.isLastLine() && this.viewer.clientActiveArea.height >= 0) {
                this.moveFromNextPage(line);
            }
        };
        Layout.prototype.checkAndSplitTabOrLineBreakCharacter = function (text, element) {
            var char = ['\t', '\v', '\f'];
            var index = editor_helper_1.HelperMethods.indexOfAny(text, char);
            if (index > -1) {
                var character = text[index];
                if ((character === '\t' && text !== '\t') || (character === '\v' && text !== '\v')
                    || (character === '\f' && text !== '\f')) {
                    this.splitByLineBreakOrTab(this.viewer, element, index, character);
                }
            }
        };
        Layout.prototype.moveFromNextPage = function (line) {
            var nextLine = line.nextLine;
            if (nextLine && line.paragraph.childWidgets.indexOf(nextLine) === -1) {
                var splittedParagraph = nextLine.paragraph;
                nextLine.paragraph.childWidgets.splice(nextLine.indexInOwner, 1);
                line.paragraph.childWidgets.push(nextLine);
                nextLine.paragraph = line.paragraph;
                if (splittedParagraph.childWidgets.length === 0) {
                    splittedParagraph.destroy();
                }
                else {
                }
            }
        };
        Layout.prototype.cutClientWidth = function (currentElement) {
            if (this.is2013Justification) {
                return false;
            }
            this.clearLineMeasures();
            var line = currentElement.line;
            line.marginTop = 0;
            var width = 0;
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                width += element.width;
                if (currentElement === element) {
                    break;
                }
            }
            var splitCurrentWidget = this.viewer.clientActiveArea.width - width < 0;
            var paragarph = currentElement.line.paragraph;
            var bodyWidget = paragarph.bodyWidget;
            if (bodyWidget && bodyWidget.floatingElements.length > 0) {
                this.hasFloatingElement = true;
                this.isXPositionUpdated = true;
                return false;
            }
            if (!splitCurrentWidget) {
                this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + width);
                if (currentElement.line.paragraph.paragraphFormat.textAlignment === 'Justify' &&
                    currentElement instanceof page_1.TextElementBox) {
                    this.splitTextElementWordByWord(currentElement);
                }
                if (ej2_base_1.isNullOrUndefined(currentElement.nextElement) && this.viewer.clientActiveArea.width > 0
                    && !currentElement.line.isLastLine()) {
                    this.moveElementFromNextLine(line);
                }
            }
            else if (currentElement.previousElement) {
                this.cutClientWidth(currentElement.previousElement);
            }
            return splitCurrentWidget;
        };
        Layout.prototype.layoutFieldCharacters = function (element) {
            if (element.fieldType === 0) {
                if (!ej2_base_1.isNullOrUndefined(element.formFieldData) && this.isInitialLoad) {
                    this.checkAndUpdateFieldData(element);
                }
                if (!this.isFieldCode && (!ej2_base_1.isNullOrUndefined(element.fieldEnd) || element.hasFieldEnd)) {
                    if (this.documentHelper.fieldStacks.indexOf(element) === -1) {
                        this.documentHelper.fieldStacks.push(element);
                    }
                    if (this.isRelayout) {
                        var fieldCode = editor_helper_1.HelperMethods.trimEnd(this.documentHelper.selection.getFieldCode(element));
                        this.isIFfield = editor_helper_1.HelperMethods.startsWith(fieldCode, 'IF');
                    }
                    this.isFieldCode = true;
                    element.hasFieldEnd = true;
                }
            }
            else if (this.documentHelper.fieldStacks.length > 0) {
                if (element.fieldType === 2) {
                    var field = this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1];
                    if (field.fieldSeparator === element && (!ej2_base_1.isNullOrUndefined(field.fieldEnd) || field.hasFieldEnd)) {
                        this.isFieldCode = false;
                    }
                }
                else {
                    var field = this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1];
                    if (element === field.fieldEnd) {
                        this.documentHelper.fieldStacks.pop();
                        this.isFieldCode = false;
                        this.isIFfield = false;
                    }
                }
            }
        };
        Layout.prototype.checkAndUpdateFieldData = function (fieldBegin) {
            if (fieldBegin.hasFieldEnd && !ej2_base_1.isNullOrUndefined(fieldBegin.fieldEnd)) {
                if (ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                    var seperator = new page_1.FieldElementBox(2);
                    seperator.fieldBegin = fieldBegin;
                    seperator.fieldEnd = fieldBegin.fieldEnd;
                    seperator.line = fieldBegin.line;
                    fieldBegin.line.children.splice(fieldBegin.fieldEnd.indexInOwner, 0, seperator);
                    fieldBegin.fieldSeparator = seperator;
                    fieldBegin.fieldEnd.fieldSeparator = seperator;
                }
                var previousNode = fieldBegin.fieldEnd.previousNode;
                if (previousNode instanceof page_1.FieldElementBox && previousNode.fieldType === 2) {
                    var formFieldData = fieldBegin.formFieldData;
                    if (formFieldData instanceof page_1.CheckBoxFormField) {
                        var checkBoxTextElement = new page_1.TextElementBox();
                        checkBoxTextElement.line = fieldBegin.line;
                        var index = fieldBegin.line.children.indexOf(fieldBegin.fieldEnd);
                        fieldBegin.line.children.splice(index, 0, checkBoxTextElement);
                        checkBoxTextElement.characterFormat.copyFormat(fieldBegin.characterFormat);
                        if (formFieldData.checked) {
                            checkBoxTextElement.text = String.fromCharCode(9745);
                        }
                        else {
                            checkBoxTextElement.text = String.fromCharCode(9744);
                        }
                        if (formFieldData.sizeType !== 'Auto') {
                            checkBoxTextElement.characterFormat.fontSize = formFieldData.size * CHECK_BOX_FACTOR;
                        }
                        else {
                            checkBoxTextElement.characterFormat.fontSize = checkBoxTextElement.characterFormat.fontSize * CHECK_BOX_FACTOR;
                        }
                    }
                    else if (formFieldData instanceof page_1.DropDownFormField) {
                        var dropDownTextElement = new page_1.TextElementBox();
                        dropDownTextElement.characterFormat.copyFormat(fieldBegin.characterFormat);
                        dropDownTextElement.line = fieldBegin.line;
                        if (formFieldData.dropdownItems.length > 0) {
                            dropDownTextElement.text = formFieldData.dropdownItems[formFieldData.selectedIndex];
                        }
                        else {
                            dropDownTextElement.text = this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5);
                        }
                        var index = fieldBegin.line.children.indexOf(fieldBegin.fieldEnd);
                        fieldBegin.line.children.splice(index, 0, dropDownTextElement);
                    }
                }
            }
        };
        Layout.prototype.layoutEmptyLineWidget = function (paragraph, isEmptyLine, line, isShiftEnter) {
            this.clearLineMeasures();
            var paraFormat = paragraph.paragraphFormat;
            var subWidth = 0;
            var whiteSpaceCount = 0;
            isShiftEnter = ej2_base_1.isNullOrUndefined(isShiftEnter) ? false : isShiftEnter;
            var borders = paraFormat.borders;
            var canRenderParagraphBorders = this.documentHelper.canRenderBorder(paragraph);
            var paragraphMarkSize = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat);
            var maxHeight = paragraphMarkSize.Height;
            var beforeSpacing = this.getBeforeSpacing(paragraph);
            var lineWidget;
            if (paragraph.childWidgets.length > 0 && !isShiftEnter) {
                this.isUpdateMarginForCurrentLine(line);
                lineWidget = paragraph.childWidgets[0];
                if (lineWidget.children.length > 0) {
                    if ((paraFormat.bidi || this.isContainsRtl(lineWidget))) {
                        this.shiftElementsForRTLLayouting(lineWidget, paraFormat.bidi);
                    }
                    var isParagraphStart = lineWidget.isFirstLine();
                    var isParagraphEnd = lineWidget.isLastLine();
                    var firstLineIndent = 0;
                    if (isParagraphStart) {
                        beforeSpacing = this.getBeforeSpacing(paragraph);
                        firstLineIndent = editor_helper_1.HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
                    }
                    var textAlignment = paraFormat.textAlignment;
                    if (textAlignment !== 'Left' && this.viewer.textWrap
                        && (!(textAlignment === 'Justify' && isParagraphEnd)
                            || (textAlignment === 'Justify' && paraFormat.bidi))) {
                        var getWidthAndSpace = this.getSubWidth(lineWidget, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
                        subWidth = getWidthAndSpace[0].subWidth;
                        whiteSpaceCount = getWidthAndSpace[0].spaceCount;
                    }
                }
            }
            else {
                lineWidget = isEmptyLine ? this.addLineWidget(paragraph) : line;
            }
            if (!ej2_base_1.isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
                !(paragraph.containerWidget instanceof page_1.TextFrame) && !(paragraph.containerWidget instanceof page_1.TableCellWidget && paragraph.containerWidget.ownerTable.containerWidget instanceof page_1.TextFrame)) {
                var elementBox = new page_1.TextElementBox();
                elementBox.line = lineWidget;
                lineWidget.children.push(elementBox);
                elementBox.text = '¶';
                elementBox.characterFormat = paragraph.characterFormat;
                elementBox.width = this.documentHelper.textHelper.getTextSize(elementBox, elementBox.characterFormat);
                this.adjustPosition(elementBox, paragraph.bodyWidget);
                paragraph.x += elementBox.padding.left;
                if (isEmptyLine) {
                    this.checkInbetweenShapeOverlap(lineWidget);
                }
                lineWidget.children.splice(elementBox.indexInOwner, 1);
            }
            if (this.viewer instanceof viewer_1.PageLayoutViewer
                && this.viewer.clientActiveArea.height < beforeSpacing + maxHeight
                && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y
                && !(lineWidget.isFirstLine() && ej2_base_1.isNullOrUndefined(lineWidget.paragraph.previousWidget)) && !paragraph.isSectionBreak) {
                this.moveToNextPage(this.viewer, lineWidget);
            }
            var lineSpacing = this.getLineSpacing(paragraph, maxHeight);
            if (!isNaN(this.maxTextHeight)
                && maxHeight < this.maxTextHeight) {
                maxHeight = this.maxTextHeight;
            }
            var topMargin = 0;
            var bottomMargin = 0;
            var leftMargin = 0;
            var height = maxHeight;
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
                topMargin += lineSpacing - (topMargin + height + bottomMargin);
            }
            else if (lineSpacing > topMargin + height + bottomMargin) {
                topMargin += lineSpacing - (topMargin + height + bottomMargin);
            }
            topMargin += beforeSpacing;
            bottomMargin += editor_helper_1.HelperMethods.convertPointToPixel(this.getAfterSpacing(paragraph));
            if (borders.top.lineStyle != 'None') {
                if (lineWidget.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                    topMargin += editor_helper_1.HelperMethods.convertPointToPixel(borders.top.lineWidth + borders.top.space);
                }
            }
            if (borders.bottom.lineStyle != 'None') {
                if (lineWidget.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                    bottomMargin += editor_helper_1.HelperMethods.convertPointToPixel(borders.bottom.lineWidth + borders.bottom.space);
                }
            }
            var renderedElements = lineWidget.renderedElements;
            for (var i = 0; i < renderedElements.length; i++) {
                var element = renderedElements[i];
                if (i === 0 && element instanceof page_1.ListTextElementBox || (paragraph.paragraphFormat.bidi && renderedElements[renderedElements.length - 1] instanceof page_1.ListTextElementBox)) {
                    var textAlignment = paragraph.paragraphFormat.textAlignment;
                    if (textAlignment === 'Right') {
                        leftMargin = subWidth;
                    }
                    else if (textAlignment === 'Center') {
                        leftMargin = subWidth / 2;
                    }
                    element.margin = new page_1.Margin(leftMargin, topMargin, 0, bottomMargin);
                    element.line = lineWidget;
                    lineWidget.height = topMargin + height + bottomMargin;
                    break;
                }
            }
            lineWidget.margin = new page_1.Margin(0, topMargin, 0, bottomMargin);
            lineWidget.height = topMargin + height + bottomMargin;
            this.adjustPositionBasedOnTopAndBottom(lineWidget);
            if (ej2_base_1.isNullOrUndefined(paragraph.nextRenderedWidget) && paragraph.isInsideTable
                && paragraph.previousRenderedWidget instanceof page_1.TableWidget && paragraph.childWidgets.length == 1) {
                lineWidget.height = 0;
            }
            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + lineWidget.height);
            this.wrapPosition = [];
        };
        Layout.prototype.isUpdateMarginForCurrentLine = function (line) {
            var isUpdate = true;
            if (!ej2_base_1.isNullOrUndefined(line) && !line.isFirstLine()) {
                for (var i = 0; i < line.children.length; i++) {
                    if (!(line.children[i] instanceof page_1.EditRangeStartElementBox || line.children[i] instanceof page_1.EditRangeEndElementBox)) {
                        isUpdate = false;
                        break;
                    }
                }
                if (isUpdate) {
                    line.margin = new page_1.Margin(0, 0, 0, 0);
                }
            }
        };
        Layout.prototype.adjustPositionBasedOnTopAndBottom = function (lineWidget) {
            if (!ej2_base_1.isNullOrUndefined(lineWidget.paragraph.bodyWidget) && !ej2_base_1.isNullOrUndefined(lineWidget.paragraph.bodyWidget.page.headerWidget)
                && lineWidget.paragraph.bodyWidget.page.headerWidget.floatingElements.length > 0
                && lineWidget.paragraph === lineWidget.paragraph.bodyWidget.childWidgets[0]
                && lineWidget.indexInOwner === 0) {
                this.checkInbetweenShapeOverlap(lineWidget, lineWidget.paragraph.bodyWidget.page.headerWidget.floatingElements);
            }
        };
        Layout.prototype.layoutListItems = function (paragraph, isUpdatedList) {
            if (!this.isFieldCode) {
                if (!ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat)
                    && !ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat.listFormat)
                    && !ej2_base_1.isNullOrUndefined(this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId)) &&
                    paragraph.paragraphFormat.listFormat.listLevelNumber >= 0
                    && paragraph.paragraphFormat.listFormat.listLevelNumber < 9 && !isUpdatedList) {
                    this.clearListElementBox(paragraph);
                    this.layoutList(paragraph, this.documentHelper);
                }
                else if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId === -1) {
                    this.clearListElementBox(paragraph);
                }
            }
        };
        Layout.prototype.layoutList = function (paragraph, documentHelper) {
            var list = documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
            var listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
            var currentListLevel = this.getListLevel(list, listLevelNumber);
            if (ej2_base_1.isNullOrUndefined(currentListLevel) || ej2_base_1.isNullOrUndefined(currentListLevel.numberFormat)) {
                return;
            }
            var lineWidget = paragraph.childWidgets[0];
            if (ej2_base_1.isNullOrUndefined(lineWidget)) {
                lineWidget = new page_1.LineWidget(paragraph);
                paragraph.childWidgets.push(lineWidget);
            }
            var element = new page_1.ListTextElementBox(currentListLevel, false);
            element.line = lineWidget;
            if (currentListLevel.listLevelPattern === 'Bullet') {
                element.text = currentListLevel.numberFormat;
                this.updateListValues(list, listLevelNumber);
            }
            else {
                element.text = this.getListNumber(paragraph.paragraphFormat.listFormat);
            }
            if (currentListLevel.numberFormat === '') {
                return;
            }
            this.viewer.updateClientWidth(-editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent));
            if (this.documentHelper.isIosDevice) {
                var text = element.text;
                text = text === String.fromCharCode(61623) ? String.fromCharCode(9679) : text === String.fromCharCode(61551) + String.fromCharCode(32) ? String.fromCharCode(9675) : text;
                if (text !== element.text) {
                    element.text = text;
                }
            }
            documentHelper.textHelper.updateTextSize(element, paragraph);
            var moveToNextPage;
            if (this.viewer instanceof viewer_1.PageLayoutViewer
                && this.viewer.clientActiveArea.height < element.height && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
                moveToNextPage = true;
            }
            this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
            var previousElement = element;
            lineWidget.children.splice(0, 0, element);
            if (currentListLevel.followCharacter !== 'None') {
                element = new page_1.ListTextElementBox(currentListLevel, true);
                if (currentListLevel.followCharacter === 'Tab') {
                    element.text = '\t';
                    var index = lineWidget.children.indexOf(element);
                    var tabWidth = this.getTabWidth(paragraph, this.viewer, index, lineWidget, element);
                    documentHelper.textHelper.updateTextSize(element, paragraph);
                    element.width = tabWidth;
                }
                else {
                    element.text = ' ';
                    documentHelper.textHelper.updateTextSize(element, paragraph);
                }
                this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
                lineWidget.children.splice(1, 0, element);
                element.line = lineWidget;
            }
            if (!ej2_base_1.isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
                !(previousElement instanceof page_1.ShapeElementBox) && !(paragraph.containerWidget instanceof page_1.TextFrame)) {
                this.adjustPosition(previousElement, previousElement.line.paragraph.bodyWidget);
                if (this.isYPositionUpdated) {
                    if (this.viewer.clientActiveArea.width > (previousElement.width + element.width)) {
                        this.viewer.clientActiveArea.width -= (previousElement.width + element.width);
                    }
                    this.isYPositionUpdated = false;
                }
            }
            if (moveToNextPage) {
                this.moveToNextPage(this.viewer, lineWidget, undefined, true);
                this.cutClientWidth(element);
                this.hasFloatingElement = false;
                this.isXPositionUpdated = false;
                return;
            }
            if (currentListLevel.followCharacter !== 'None') {
                this.viewer.updateClientWidth(editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent));
            }
        };
        Layout.prototype.addBodyWidget = function (area, widget) {
            var bodyWidget;
            if (widget) {
                bodyWidget = widget;
            }
            else {
                bodyWidget = new page_1.BodyWidget();
            }
            bodyWidget.width = area.width;
            bodyWidget.x = area.x;
            bodyWidget.y = area.y;
            return bodyWidget;
        };
        Layout.prototype.addListLevels = function (abstractList) {
            for (var i = abstractList.levels.length; i < 9; i++) {
                var listLevel = new list_level_1.WListLevel(abstractList);
                var val = i % 3;
                if (abstractList.levels[0].listLevelPattern === 'Bullet') {
                    listLevel.listLevelPattern = 'Bullet';
                    listLevel.numberFormat = val === 0 ? String.fromCharCode(61623) : val === 1 ? String.fromCharCode(61551) + String.fromCharCode(32) : String.fromCharCode(61607);
                    listLevel.characterFormat.fontFamily = listLevel.numberFormat === String.fromCharCode(61607) ? 'Wingdings' : 'Symbol';
                }
                else {
                    listLevel.listLevelPattern = this.getListLevelPattern(val);
                    listLevel.numberFormat = '%' + (i + 1).toString() + '.';
                    listLevel.startAt = 1;
                    listLevel.restartLevel = i;
                }
                listLevel.paragraphFormat = new index_1.WParagraphFormat(undefined);
                listLevel.paragraphFormat.leftIndent = 48 * (i + 1);
                listLevel.paragraphFormat.firstLineIndent = -24;
                abstractList.levels.push(listLevel);
            }
        };
        Layout.prototype.addSplittedLineWidget = function (lineWidget, elementIndex, splittedElementBox) {
            var index = elementIndex;
            if (this.isWrapText) {
                if (!ej2_base_1.isNullOrUndefined(splittedElementBox)) {
                    lineWidget.children.splice(index + 1, 0, splittedElementBox);
                    splittedElementBox.line = lineWidget;
                }
                return;
            }
            var columneBreak = false;
            var paragraph = lineWidget.paragraph;
            var movedElementBox = [];
            var lineIndex = paragraph.childWidgets.indexOf(lineWidget);
            if (!ej2_base_1.isNullOrUndefined(splittedElementBox)) {
                movedElementBox.push(splittedElementBox);
            }
            var newLineWidget = undefined;
            var previousElement = lineWidget.children[index];
            if (previousElement instanceof page_1.CommentCharacterElementBox && previousElement.commentType === 0 && index != 0) {
                index = index - 1;
            }
            else if (previousElement.isColumnBreak && ej2_base_1.isNullOrUndefined(previousElement.nextNode)) {
                columneBreak = true;
            }
            for (var i = index + 1; i < lineWidget.children.length; i++) {
                movedElementBox.push(lineWidget.children[i]);
            }
            if (movedElementBox.length > 0 || columneBreak) {
                if (lineIndex === paragraph.childWidgets.length - 1) {
                    newLineWidget = new page_1.LineWidget(paragraph);
                }
                else {
                    newLineWidget = paragraph.childWidgets[lineIndex + 1];
                }
                for (var j = 0; j < movedElementBox.length; j++) {
                    movedElementBox[j].line = newLineWidget;
                }
                if (movedElementBox.length > 0) {
                    lineWidget.children.splice(index + 1, lineWidget.children.length - 1);
                    if (!ej2_base_1.isNullOrUndefined(lineWidget.layoutedElements) && lineWidget.layoutedElements.length > 0) {
                        lineWidget.layoutedElements.splice(index + 1, lineWidget.layoutedElements.length - 1);
                    }
                    newLineWidget.children = movedElementBox.concat(newLineWidget.children);
                }
                if (paragraph.childWidgets.indexOf(newLineWidget) === -1) {
                    paragraph.childWidgets.splice(lineIndex + 1, 0, newLineWidget);
                }
            }
        };
        Layout.prototype.addElementToLine = function (paragraph, element) {
            if (!(element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline')) {
                if (this.isWrapText) {
                    this.isWrapText = false;
                    this.viewer.clientActiveArea.width = this.viewer.clientArea.right - this.viewer.clientActiveArea.x;
                }
                this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
            }
            if (paragraph.paragraphFormat.textAlignment === 'Justify' && element instanceof page_1.TextElementBox) {
                this.splitTextElementWordByWord(element);
            }
        };
        Layout.prototype.splitElementForClientArea = function (paragraph, element) {
            if (element.line.children.length > 0) {
                var previousElement = element.previousElement;
                var index = element.indexInOwner;
                if (element.line.children.length > 1) {
                    if (previousElement && this.viewer.clientActiveArea.x !== this.viewer.clientArea.x) {
                        index -= 1;
                    }
                }
                this.addSplittedLineWidget(element.line, index);
            }
        };
        Layout.prototype.splitByWord = function (lineWidget, paragraph, elementBox, text, width, characterFormat) {
            var index = this.getSplitIndexByWord(this.viewer.clientActiveArea.width, text, width, characterFormat, elementBox.scriptType);
            if (index > 0 && index < elementBox.length) {
                var indexOf = lineWidget.children.indexOf(elementBox);
                var splittedElementBox = new page_1.TextElementBox();
                text = text.substring(index);
                splittedElementBox.text = text;
                if (text[0] === ' ') {
                    var prevLength = text.length;
                    text = editor_helper_1.HelperMethods.trimStart(text);
                    index += prevLength - text.length;
                }
                splittedElementBox.characterFormat.copyFormat(elementBox.characterFormat);
                splittedElementBox.width = this.documentHelper.textHelper.getWidth(splittedElementBox.text, characterFormat, splittedElementBox.scriptType);
                splittedElementBox.trimEndWidth = splittedElementBox.width;
                splittedElementBox.characterRange = elementBox.characterRange;
                elementBox.text = elementBox.text.substr(0, index);
                elementBox.width = this.documentHelper.textHelper.getWidth(elementBox.text, elementBox.characterFormat, elementBox.scriptType);
                elementBox.trimEndWidth = this.documentHelper.textHelper.getWidth(editor_helper_1.HelperMethods.trimEnd(elementBox.text), elementBox.characterFormat, elementBox.scriptType);
                if (elementBox.revisions.length > 0) {
                    this.updateRevisionForSplittedElement(elementBox, splittedElementBox, true);
                    splittedElementBox.isMarkedForRevision = elementBox.isMarkedForRevision;
                }
                splittedElementBox.height = elementBox.height;
                splittedElementBox.baselineOffset = elementBox.baselineOffset;
                this.splitErrorCollection(elementBox, splittedElementBox);
                this.addSplittedLineWidget(lineWidget, indexOf, splittedElementBox);
                this.addElementToLine(paragraph, elementBox);
                if (elementBox.width === 0) {
                    lineWidget.children.splice(indexOf, 1);
                }
            }
        };
        Layout.prototype.splitErrorCollection = function (elementBox, splittedBox) {
            if (elementBox.errorCollection.length > 0) {
                var errorCollection = [];
                var ignoreItems = elementBox.ignoreOnceItems;
                for (var i = 0; i < elementBox.errorCollection.length; i++) {
                    errorCollection.push(elementBox.errorCollection[i]);
                }
                for (var j = 0; j < elementBox.errorCollection.length; j++) {
                    var index = elementBox.text.indexOf(elementBox.errorCollection[j].text);
                    var textElement = elementBox.errorCollection[j];
                    if (index < 0) {
                        errorCollection.splice(0, 1);
                        splittedBox.errorCollection.push(textElement);
                    }
                    else if (splittedBox.text.indexOf(textElement.text) > 0) {
                        splittedBox.errorCollection.push(textElement);
                    }
                }
                splittedBox.ignoreOnceItems = ignoreItems;
                elementBox.ignoreOnceItems = [];
                elementBox.errorCollection = errorCollection;
            }
        };
        Layout.prototype.splitByCharacter = function (lineWidget, textElement, text, width, characterFormat) {
            var paragraph = lineWidget.paragraph;
            var atleastSpacing = paragraph.paragraphFormat.lineSpacingType === 'AtLeast' ? paragraph.paragraphFormat.afterSpacing : 0;
            var index = this.getTextSplitIndexByCharacter(this.viewer.clientArea.width, this.viewer.clientActiveArea.width, text, width, characterFormat, textElement.scriptType);
            if (index === 0 && textElement.previousNode instanceof page_1.ImageElementBox && textElement.previousNode.textWrappingType === "Right") {
                return;
            }
            else if (index === 0 && !ej2_base_1.isNullOrUndefined(textElement) && textElement.length > 0 && (Math.max(textElement.height, atleastSpacing) <= this.viewer.clientArea.height)
                && this.viewer.clientActiveArea.width === 0 && lineWidget.children.indexOf(textElement) === 0) {
                index = 1;
            }
            var splitWidth = 0;
            if (index < textElement.length) {
                splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.substring(0, index), characterFormat, textElement.scriptType);
                text = text.substring(index);
            }
            if (splitWidth > this.viewer.clientActiveArea.width && textElement.indexInOwner > 0) {
                this.addSplittedLineWidget(lineWidget, textElement.indexInOwner - 1);
                return;
            }
            var indexOf = lineWidget.children.indexOf(textElement);
            if (index < textElement.length) {
                var splittedElement = new page_1.TextElementBox();
                splittedElement.text = text;
                splittedElement.errorCollection = textElement.errorCollection;
                textElement.text = textElement.text.substr(0, index);
                splittedElement.characterFormat.copyFormat(textElement.characterFormat);
                splittedElement.width = this.documentHelper.textHelper.getWidth(splittedElement.text, characterFormat, splittedElement.scriptType);
                splittedElement.trimEndWidth = splittedElement.width;
                splittedElement.characterRange = textElement.characterRange;
                textElement.width = this.documentHelper.textHelper.getWidth(textElement.text, characterFormat, textElement.scriptType);
                textElement.trimEndWidth = textElement.width;
                splittedElement.height = textElement.height;
                splittedElement.baselineOffset = textElement.baselineOffset;
                lineWidget.children.splice(textElement.indexInOwner + 1, 0, splittedElement);
                if (textElement.revisions.length > 0) {
                    this.updateRevisionForSplittedElement(textElement, splittedElement, index > 0);
                    splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
                }
                this.addElementToLine(paragraph, textElement);
                this.addSplittedLineWidget(lineWidget, indexOf);
                if (textElement.width === 0) {
                    lineWidget.children.splice(indexOf, 1);
                }
            }
            else {
                this.addSplittedLineWidget(lineWidget, indexOf);
                this.addElementToLine(paragraph, textElement);
            }
        };
        Layout.prototype.updateRevisionForSplittedElement = function (item, splittedElement, isSplitted, isJustify) {
            if (item.revisions.length > 0) {
                for (var i = 0; i < item.revisions.length; i++) {
                    var currentRevision = item.revisions[i];
                    if (isSplitted) {
                        splittedElement.revisions.push(currentRevision);
                        var rangeIndex = currentRevision.range.indexOf(item);
                        if (rangeIndex < 0) {
                            currentRevision.range.push(splittedElement);
                        }
                        else {
                            if (isJustify) {
                                currentRevision.range.splice(rangeIndex, 0, splittedElement);
                            }
                            else {
                                currentRevision.range.splice(rangeIndex + 1, 0, splittedElement);
                            }
                        }
                    }
                    else {
                        var rangeIndex = currentRevision.range.indexOf(item);
                        currentRevision.range.splice(rangeIndex, 1);
                        currentRevision.range.splice(rangeIndex, 0, splittedElement);
                        splittedElement.revisions.push(currentRevision);
                    }
                }
            }
        };
        Layout.prototype.splitTextElementWordByWord = function (textElement) {
            var lineWidget = textElement.line;
            var indexOf = lineWidget.children.indexOf(textElement);
            var startIndex = indexOf;
            var paddingLeft = textElement.padding.left;
            textElement.padding.left = 0;
            var text = textElement.text;
            var format;
            var characterUptoWs = text.trim().indexOf(' ');
            if (characterUptoWs >= 0) {
                lineWidget.children.splice(indexOf, 1);
                format = textElement.characterFormat;
                var index = textElement.length - editor_helper_1.HelperMethods.trimStart(text).length;
                while (index < textElement.length) {
                    index = this.getTextIndexAfterSpace(text, index);
                    if (index === 0 || index === textElement.length) {
                        break;
                    }
                    if (index < textElement.length) {
                        var splittedElement = new page_1.TextElementBox();
                        var splittedText = text.substring(0, index);
                        text = text.substring(index);
                        if (text.substring(0, 1) === ' ') {
                            index += text.length - editor_helper_1.HelperMethods.trimStart(text).length;
                        }
                        splittedElement.text = splittedText;
                        splittedElement.characterFormat.copyFormat(textElement.characterFormat);
                        splittedElement.line = lineWidget;
                        splittedElement.width = this.documentHelper.textHelper.getWidth(splittedElement.text, format, splittedElement.scriptType);
                        splittedElement.trimEndWidth = splittedElement.width;
                        splittedElement.height = textElement.height;
                        splittedElement.baselineOffset = textElement.baselineOffset;
                        splittedElement.characterRange = textElement.characterRange;
                        lineWidget.children.splice(indexOf, 0, splittedElement);
                        if (textElement.revisions.length > 0) {
                            this.updateRevisionForSplittedElement(textElement, splittedElement, index > 0, true);
                            splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
                        }
                        textElement.text = text;
                        textElement.width = this.documentHelper.textHelper.getWidth(textElement.text, textElement.characterFormat, textElement.scriptType);
                        textElement.trimEndWidth = textElement.width;
                        if (textElement.width === 0 && lineWidget.children.indexOf(textElement) !== -1) {
                            lineWidget.children.splice(lineWidget.children.indexOf(textElement), 1);
                        }
                        index = 0;
                        indexOf++;
                    }
                }
                textElement.text = text;
                lineWidget.children.splice(indexOf, 0, textElement);
            }
            lineWidget.children[startIndex].padding.left = paddingLeft;
        };
        Layout.prototype.isSplitByHyphen = function (element, text) {
            if (!ej2_base_1.isNullOrUndefined(element.previousElement)) {
                if (element.previousElement instanceof page_1.TextElementBox || element.previousElement instanceof page_1.ListTextElementBox) {
                    var test = element.previousElement.text;
                    return (text.substring(0, 1) === '-') && (test.substring(test.length - 1, test.length) !== ' ');
                }
            }
            return (text.substring(0, 1) === '-');
        };
        Layout.prototype.splitTextForClientArea = function (lineWidget, element, text, width, characterFormat) {
            var paragraph = lineWidget.paragraph;
            var isSplitByWord = true;
            var index = -1;
            if (!(text.substring(0, 1) === ' ') && !this.isSplitByHyphen(element, text)) {
                var textWidth = width;
                var characterUptoWS = 0;
                characterUptoWS = editor_helper_1.HelperMethods.trimEnd(text).indexOf(' ') + 1;
                if (characterUptoWS == 0) {
                    characterUptoWS = editor_helper_1.HelperMethods.trimEnd(text).indexOf('-') + 1;
                }
                index = characterUptoWS;
                if (index > 0) {
                    textWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.slice(0, index), characterFormat, element.scriptType);
                }
                if (this.viewer.clientActiveArea.width < textWidth && !this.documentHelper.textHelper.isUnicodeText(text, element.scriptType)
                    && !this.isWordFittedByJustification(element, textWidth)) {
                    isSplitByWord = this.checkPreviousElement(lineWidget, lineWidget.children.indexOf(element));
                    if (isSplitByWord) {
                        return;
                    }
                }
            }
            else {
                index = 1;
            }
            if (width <= this.viewer.clientActiveArea.width) {
                this.addElementToLine(paragraph, element);
            }
            else if (isSplitByWord && (index > 0 || text.indexOf(' ') !== -1 || text.indexOf('-') !== -1)) {
                this.splitByWord(lineWidget, paragraph, element, text, width, characterFormat);
            }
            else {
                this.splitByCharacter(lineWidget, element, text, width, characterFormat);
            }
        };
        Layout.prototype.splitByLineBreakOrTab = function (viewer, span, index, spiltBy) {
            var inlineIndex = span.line.children.indexOf(span);
            var value = span.text;
            var remainder = value.substring(index);
            var newSpan = spiltBy === '\t' ? new page_1.TabElementBox() : new page_1.TextElementBox();
            newSpan.line = span.line;
            this.updateRevisionForSplittedElement(span, newSpan, true);
            newSpan.characterFormat.copyFormat(span.characterFormat);
            newSpan.characterRange = span.characterRange;
            span.line.children.splice(inlineIndex + 1, 0, newSpan);
            if (index > 0 && remainder.length === 1) {
                newSpan.text = value.substring(index);
                span.text = value.substring(0, index);
            }
            else if (index > 0) {
                newSpan.text = spiltBy;
                var newText = new page_1.TextElementBox();
                newText.line = span.line;
                newText.text = value.substring(index + 1);
                this.updateRevisionForSplittedElement(span, newText, true);
                newText.characterFormat.copyFormat(span.characterFormat);
                newText.characterRange = span.characterRange;
                span.line.children.splice(inlineIndex + 2, 0, newText);
                span.text = value.substring(0, index);
            }
            else if (remainder !== '') {
                newSpan.text = value.substring(index + 1);
                span.text = spiltBy;
            }
        };
        Layout.prototype.moveToNextLine = function (line, isMultiColumnSplit, index) {
            var paragraph = line.paragraph;
            var paraFormat = paragraph.paragraphFormat;
            var isParagraphStart = line.isFirstLine();
            var isParagraphEnd = line.isLastLine();
            var height = 0;
            var maxDescent = 0;
            var afterSpacing = 0;
            var beforeSpacing = 0;
            var lineSpacing = 0;
            var firstLineIndent = 0;
            var borders = paraFormat.borders;
            this.updateLineWidget(line);
            height = this.maxTextHeight;
            maxDescent = height - this.maxTextBaseline;
            var pageIndex = 0;
            var skip2013Justification = false;
            var canRenderParagraphBorders = this.documentHelper.canRenderBorder(paragraph);
            if (paragraph.bodyWidget && !(paragraph.bodyWidget instanceof page_1.HeaderFooterWidget)) {
                pageIndex = this.documentHelper.pages.indexOf(paragraph.bodyWidget.page);
            }
            if (isParagraphStart) {
                beforeSpacing = this.getBeforeSpacing(paragraph, pageIndex);
                firstLineIndent = editor_helper_1.HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
            }
            if (isParagraphEnd) {
                afterSpacing = editor_helper_1.HelperMethods.convertPointToPixel(this.getAfterSpacing(paragraph));
            }
            if ((paraFormat.bidi || this.isContainsRtl(line))) {
                this.shiftElementsForRTLLayouting(line, paraFormat.bidi);
                this.isRTLLayout = true;
            }
            if (isNaN(this.maxTextHeight)) {
                var measurement = this.documentHelper.textHelper.measureText('a', paragraph.characterFormat);
                height = measurement.Height;
                maxDescent = height - measurement.BaselineOffset;
            }
            else {
                height = this.maxTextHeight;
                maxDescent = height - this.maxTextBaseline;
            }
            lineSpacing = this.getLineSpacing(paragraph, height);
            if (paraFormat.lineSpacingType === 'Exactly'
                && lineSpacing < maxDescent + this.maxBaseline) {
                lineSpacing = maxDescent + this.maxBaseline;
            }
            var subWidth = 0;
            var whiteSpaceCount = 0;
            var getWidthAndSpace;
            var textAlignment = paraFormat.textAlignment;
            var totalSpaceCount = 0;
            var trimmedSpaceWidth = 0;
            if (textAlignment !== 'Left' && this.viewer.textWrap && (!(textAlignment === 'Justify' && isParagraphEnd)
                || (textAlignment === 'Justify' && paraFormat.bidi) || (this.is2013Justification && isParagraphEnd))) {
                getWidthAndSpace = this.getSubWidth(line, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
                subWidth = getWidthAndSpace[0].subWidth;
                whiteSpaceCount = getWidthAndSpace[0].spaceCount;
                totalSpaceCount = getWidthAndSpace[0].totalSpaceCount;
                trimmedSpaceWidth = getWidthAndSpace[0].trimmedSpaceWidth;
                skip2013Justification = line.isEndsWithPageBreak || line.isEndsWithColumnBreak || line.isEndsWithLineBreak || line.paragraph.bidi || this.isRTLLayout;
            }
            if (!skip2013Justification && (getWidthAndSpace && getWidthAndSpace.length === 1) && this.viewer.clientActiveArea.width > 0 &&
                !isParagraphEnd && !this.is2013Justification && textAlignment === 'Justify' && this.documentHelper.compatibilityMode === 'Word2013') {
                var availableWidth = this.viewer.clientActiveArea.width;
                var totalSpaceWidth = this.getTotalSpaceWidth(line);
                var averageWidthOfSpace = totalSpaceWidth / totalSpaceCount;
                var avgAvailableLineWidthForSpace = (availableWidth) / totalSpaceCount;
                var diffFactor = (avgAvailableLineWidthForSpace / averageWidthOfSpace) * 100;
                var widthForAdjustment = 0;
                if (diffFactor <= 33) {
                    widthForAdjustment = totalSpaceWidth / 8;
                }
                else {
                    widthForAdjustment = totalSpaceWidth / 4;
                }
                this.viewer.clientActiveArea.x -= widthForAdjustment;
                this.viewer.clientActiveArea.width += widthForAdjustment;
                this.is2013Justification = true;
                if (isMultiColumnSplit) {
                    this.splitParagraphForMultiColumn(line, index);
                }
                else {
                    this.moveElementFromNextLine(line);
                    this.nextElementToLayout = line.children[line.children.length - 1];
                }
                return;
            }
            else {
                if (this.is2013Justification && isParagraphEnd) {
                    if (subWidth > 0) {
                        subWidth = 0;
                        whiteSpaceCount = 0;
                    }
                }
                this.is2013Justification = false;
                this.nextElementToLayout = undefined;
            }
            var addSubWidth = false;
            var wrapIndex = 0;
            var lineSpacingType = paraFormat.lineSpacingType;
            var isStarted = false;
            var children = line.renderedElements;
            var maxElementHeight = 0;
            var maxElementBottomMargin = 0;
            var maxElementTopMargin = 0;
            var elementLeft = this.viewer.clientArea.x;
            for (var i = 0; i < children.length; i++) {
                var topMargin = 0;
                var bottomMargin = 0;
                var leftMargin = 0;
                var elementBox = children[i];
                if (!ej2_base_1.isNullOrUndefined(getWidthAndSpace) && isStarted && elementBox.padding.left > 0 &&
                    (getWidthAndSpace.length > wrapIndex + 1)) {
                    var previousWidth = subWidth;
                    if (textAlignment === "Justify") {
                        previousWidth = subWidth * getWidthAndSpace[wrapIndex].spaceCount;
                    }
                    else if (textAlignment === "Center") {
                        previousWidth = subWidth / 2;
                    }
                    elementBox.padding.left = elementBox.padding.left - previousWidth;
                    var subWidthInfo = getWidthAndSpace[++wrapIndex];
                    subWidth = subWidthInfo.subWidth;
                    whiteSpaceCount = subWidthInfo.spaceCount;
                }
                if (elementBox instanceof page_1.ShapeBase && elementBox.textWrappingStyle !== 'Inline') {
                    continue;
                }
                isStarted = true;
                var alignElements = this.alignLineElements(elementBox, topMargin, bottomMargin, maxDescent, addSubWidth, subWidth, textAlignment, whiteSpaceCount, i === children.length - 1);
                if (textAlignment === "Justify" && elementBox instanceof page_1.ShapeBase && elementBox.textWrappingStyle === 'Inline' && subWidth !== 0) {
                    elementBox.x = elementLeft;
                    if (elementBox instanceof page_1.ShapeElementBox) {
                        for (var i_3 = 0; i_3 < elementBox.textFrame.childWidgets.length; i_3++) {
                            var widget = elementBox.textFrame.childWidgets[i_3];
                            var indent = widget.bidi ? widget.rightIndent : widget.leftIndent;
                            widget.x = elementLeft + editor_helper_1.HelperMethods.convertPointToPixel(indent + elementBox.textFrame.marginLeft);
                        }
                    }
                }
                elementLeft += elementBox.width;
                line.maxBaseLine = this.maxBaseline;
                topMargin = alignElements.topMargin;
                bottomMargin = alignElements.bottomMargin;
                addSubWidth = alignElements.addSubWidth;
                whiteSpaceCount = alignElements.whiteSpaceCount;
                if (lineSpacingType === 'Multiple') {
                    if (lineSpacing > height) {
                        bottomMargin += lineSpacing - height;
                    }
                    else {
                        topMargin += lineSpacing - height;
                    }
                }
                else if (lineSpacingType === 'Exactly') {
                    topMargin += lineSpacing - (topMargin + elementBox.height + bottomMargin);
                }
                else if (lineSpacing > topMargin + elementBox.height + bottomMargin) {
                    topMargin += lineSpacing - (topMargin + elementBox.height + bottomMargin);
                }
                if (pageIndex > 0 && paragraph === paragraph.bodyWidget.childWidgets[0] && this.documentHelper.pages[pageIndex].sectionIndex === this.documentHelper.pages[pageIndex - 1].sectionIndex) {
                    topMargin += 0;
                }
                else {
                    topMargin += beforeSpacing;
                }
                if (borders.top.lineStyle != 'None') {
                    if (line.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                        topMargin += editor_helper_1.HelperMethods.convertPointToPixel(borders.top.lineWidth + borders.top.space);
                    }
                }
                if (borders.bottom.lineStyle != 'None') {
                    if (line.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                        bottomMargin += editor_helper_1.HelperMethods.convertPointToPixel(borders.bottom.lineWidth + borders.bottom.space);
                    }
                }
                bottomMargin += afterSpacing;
                var previousElement = i > 0 ? children[i - 1] : undefined;
                if (i === 0 || (!(elementBox instanceof page_1.ShapeBase && elementBox.textWrappingStyle !== 'Inline') &&
                    previousElement instanceof page_1.ShapeBase && previousElement.textWrappingStyle !== 'Inline' && previousElement.indexInOwner < elementBox.indexInOwner)
                    || elementBox.padding.left > 0) {
                    line.height = topMargin + elementBox.height + bottomMargin;
                    if (textAlignment === 'Right' || (textAlignment === 'Justify' && paraFormat.bidi && (isParagraphEnd || trimmedSpaceWidth < 0))) {
                        if (trimmedSpaceWidth < 0) {
                            leftMargin = trimmedSpaceWidth;
                        }
                        else {
                            leftMargin = subWidth;
                        }
                    }
                    else if (textAlignment === 'Center') {
                        if (subWidth < 0) {
                            leftMargin = subWidth;
                        }
                        else {
                            leftMargin = subWidth / 2;
                        }
                    }
                }
                elementBox.margin = new page_1.Margin(leftMargin, topMargin, 0, bottomMargin);
                elementBox.line = line;
                if (maxElementHeight < elementBox.height) {
                    maxElementHeight = elementBox.height;
                    maxElementBottomMargin = elementBox.margin.bottom;
                    maxElementTopMargin = elementBox.margin.top;
                }
                if (elementBox instanceof page_1.ShapeElementBox && elementBox.textWrappingStyle === "Inline") {
                    if (i !== 0) {
                        elementBox.x += children[0].margin.left;
                        for (var i_4 = 0; i_4 < elementBox.textFrame.childWidgets.length; i_4++) {
                            elementBox.textFrame.childWidgets[i_4].x += children[0].margin.left;
                        }
                    }
                    this.updateShapeYPosition(elementBox);
                }
            }
            line.margin = new page_1.Margin(0, maxElementTopMargin, 0, maxElementBottomMargin);
            this.adjustPositionBasedOnTopAndBottom(line);
            this.checkInbetweenShapeOverlap(line);
            if (!isMultiColumnSplit && line.isLastLine() && line.indexInOwner === 0 && line.paragraph.paragraphFormat.widowControl) {
                var previousSplitWidget = line.paragraph.previousSplitWidget;
                if (!ej2_base_1.isNullOrUndefined(previousSplitWidget) && !previousSplitWidget.isEndsWithPageBreak && !previousSplitWidget.isEndsWithColumnBreak && previousSplitWidget.indexInOwner !== 0) {
                    var startLineIndex = previousSplitWidget.childWidgets.length - 1;
                    if (previousSplitWidget.childWidgets.length === 2) {
                        startLineIndex = 0;
                    }
                    this.splitParagraph(previousSplitWidget, startLineIndex, line.paragraph);
                    this.updateClientAreaForNextBlock(line, line.paragraph);
                }
            }
            else if (isMultiColumnSplit) {
                this.splitParagraphForMultiColumn(line, index);
            }
            if (!isMultiColumnSplit) {
                this.viewer.cutFromTop(this.viewer.clientActiveArea.y + line.height);
            }
            this.wrapPosition = [];
        };
        Layout.prototype.updateShapeYPosition = function (elementBox) {
            if (elementBox.margin.top > 0) {
                elementBox.y += elementBox.margin.top;
                for (var j = 0; j < elementBox.textFrame.childWidgets.length; j++) {
                    elementBox.textFrame.childWidgets[j].y += elementBox.margin.top;
                }
            }
        };
        Layout.prototype.getBodyWidget = function (section, isFirstBody) {
            if (isFirstBody) {
                while (section && section.columnIndex !== 0) {
                    section = section.previousRenderedWidget;
                }
            }
            else {
                while (section) {
                    if (ej2_base_1.isNullOrUndefined(section.nextRenderedWidget) || section.columnIndex === section.sectionFormat.numberOfColumns - 1 || section.index !== section.nextRenderedWidget.index) {
                        break;
                    }
                    section = section.nextRenderedWidget;
                }
            }
            return section;
        };
        Layout.prototype.splitParagraphForMultiColumn = function (line, index) {
            this.splitParagraph(line.paragraph, index, undefined);
            if ((ej2_base_1.isNullOrUndefined(line.paragraph.previousRenderedWidget) && index == 0) ||
                (!ej2_base_1.isNullOrUndefined(line.paragraph.previousRenderedWidget) && line.paragraph.previousRenderedWidget.bodyWidget.sectionIndex !== line.paragraph.bodyWidget.sectionIndex)) {
                this.moveBlocksToNextPage(line.paragraph);
            }
            else {
                this.moveBlocksToNextPage(line.paragraph.previousRenderedWidget);
            }
            this.viewer.updateClientArea(line.paragraph.bodyWidget, line.paragraph.bodyWidget.page);
            this.viewer.clientActiveArea.y = line.paragraph.bodyWidget.y;
            if (line.paragraph.bodyWidget.sectionFormat.equalWidth) {
                var parawidget = line.paragraph;
                this.documentHelper.blockToShift = parawidget;
                this.shiftLayoutedItems(false);
            }
        };
        Layout.prototype.checkInbetweenShapeOverlap = function (line, floatingElements) {
            var _this = this;
            if (!(line.paragraph.containerWidget instanceof page_1.TextFrame) && line.paragraph.bodyWidget) {
                var overlapShape_1;
                var lineY_1 = this.getLineY(line);
                var isInsideTable_1 = line.paragraph.isInsideTable;
                var emptyParaPosition_1 = line.paragraph.y;
                var isFloatingElementPresent_1 = true;
                if (ej2_base_1.isNullOrUndefined(floatingElements)) {
                    isFloatingElementPresent_1 = false;
                    floatingElements = line.paragraph.bodyWidget.floatingElements;
                }
                floatingElements.sort(function (a, b) { return a.y - b.y; });
                floatingElements.forEach(function (shape) {
                    if (isInsideTable_1 && shape.line && !shape.line.paragraph.isInsideTable || ej2_base_1.isNullOrUndefined(shape.line)) {
                        return;
                    }
                    var lineRect;
                    if (shape.textWrappingStyle === 'TopAndBottom' && shape instanceof page_1.ImageElementBox && !line.paragraph.isEmpty()) {
                        lineRect = new page_1.Rect(line.paragraph.x, _this.viewer.clientActiveArea.y, line.paragraph.width, line.children[0].height);
                    }
                    else {
                        lineRect = new page_1.Rect(line.paragraph.x, _this.viewer.clientActiveArea.y, line.paragraph.width, line.height);
                    }
                    var shapeRect = new page_1.Rect(shape.x, shape.y - shape.distanceTop, shape.width, shape.height);
                    if (shape.line && _this.isRelayout && !_this.isRelayoutOverlap && _this.viewer.documentHelper.selection.isExistAfter(shape.line.paragraph, line.paragraph)
                        || _this.isRelayout && _this.isRelayoutOverlap && _this.viewer.documentHelper.selection.isExistAfter(shape.line.paragraph, _this.endOverlapWidget)) {
                        return;
                    }
                    var considerShape = (shape.textWrappingStyle === 'TopAndBottom');
                    var updatedFloatPosition = ((shape.y + shape.height + shape.distanceBottom) - lineY_1);
                    if (overlapShape_1 && considerShape &&
                        overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom + line.height > shape.y - shape.distanceTop &&
                        overlapShape_1.y - overlapShape_1.distanceTop < shape.y - shape.distanceTop &&
                        shape.y + shape.height + shape.distanceBottom > overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom) {
                        overlapShape_1 = shape;
                        if (line.paragraph.isEmpty() && isFloatingElementPresent_1) {
                            line.paragraph.y = emptyParaPosition_1;
                            line.paragraph.y += updatedFloatPosition;
                        }
                        else {
                            line.marginTop = updatedFloatPosition;
                        }
                    }
                    else if (considerShape && !overlapShape_1 && lineRect.isIntersecting(shapeRect)) {
                        overlapShape_1 = shape;
                        if (line.paragraph.isEmpty() && isFloatingElementPresent_1) {
                            line.paragraph.y += updatedFloatPosition;
                        }
                        else {
                            line.marginTop = updatedFloatPosition;
                        }
                    }
                });
                if (overlapShape_1) {
                    this.viewer.cutFromTop(overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom);
                }
                else if (this.isRelayoutOverlap) {
                    line.marginTop = 0;
                }
            }
        };
        Layout.prototype.getLineY = function (line) {
            var para = line.paragraph;
            var lineY = para.y;
            if (!para.isEmpty()) {
                var lineWidget = para.firstChild;
                while (lineWidget !== line) {
                    lineY = lineY + lineWidget.height + lineWidget.marginTop;
                    lineWidget = lineWidget.nextLine;
                }
            }
            return lineY;
        };
        Layout.prototype.updateLineWidget = function (line) {
            var spaceHeight = 0;
            var spaceBaseline = 0;
            var isContainsImage = false;
            var isFieldCode = false;
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof page_1.FieldElementBox && element.fieldType === 2) {
                    isFieldCode = false;
                }
                if (isFieldCode) {
                    continue;
                }
                if (element instanceof page_1.FieldElementBox && element.fieldType === 0) {
                    isFieldCode = true;
                }
                if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline') {
                    continue;
                }
                if (element instanceof page_1.TextElementBox && element.text.replace(/\s+/g, '').length === 0 && element.text !== String.fromCharCode(160)) {
                    if (spaceHeight < element.height) {
                        spaceHeight = element.height;
                        spaceBaseline = element.baselineOffset;
                    }
                    continue;
                }
                if (element instanceof page_1.TextElementBox || element instanceof page_1.ListTextElementBox) {
                    var elementHeight = element.height;
                    var baselineOffset = element.baselineOffset;
                    var isCellContentControl = false;
                    if (element instanceof page_1.TextElementBox && element.isCheckBoxElement && !ej2_base_1.isNullOrUndefined(element.previousNode) && element.previousNode instanceof page_1.ContentControl && (element.previousNode.contentControlWidgetType === 'Cell' || element.previousNode.contentControlWidgetType === 'Inline')) {
                        isCellContentControl = true;
                    }
                    if (element instanceof page_1.TextElementBox && element.isCheckBoxElement && !isCellContentControl) {
                        elementHeight = elementHeight / CHECK_BOX_FACTOR;
                        baselineOffset = baselineOffset / CHECK_BOX_FACTOR;
                    }
                    if (this.maxTextHeight < elementHeight) {
                        this.maxTextHeight = elementHeight;
                        this.maxTextBaseline = baselineOffset;
                    }
                    if (this.maxBaseline < this.maxTextBaseline) {
                        this.maxBaseline = this.maxTextBaseline;
                    }
                }
                else if (this.maxBaseline < element.height) {
                    this.maxBaseline = element.height;
                    if (element instanceof page_1.ImageElementBox) {
                        isContainsImage = true;
                    }
                }
            }
            if (this.maxTextHeight === 0 && spaceHeight !== 0) {
                if (isContainsImage) {
                    this.maxTextHeight = 0;
                    this.maxTextBaseline = 0;
                }
                else {
                    if (line.isLastLine() && this.documentHelper.selection) {
                        var paragraphMarkSize = this.documentHelper.selection.getParagraphMarkSize(line.paragraph, 0, 0);
                        this.maxTextHeight = paragraphMarkSize.height;
                        this.maxTextBaseline = spaceBaseline;
                    }
                    else {
                        this.maxTextHeight = spaceHeight;
                        this.maxTextBaseline = spaceBaseline;
                    }
                    if (this.maxBaseline < this.maxTextBaseline) {
                        this.maxBaseline = this.maxTextBaseline;
                    }
                }
            }
        };
        Layout.prototype.moveToNextPage = function (viewer, line, isPageBreak, isList) {
            if (this.isFootNoteLayoutStart) {
                return;
            }
            var paragraphWidget = line.paragraph;
            var startBlock;
            var startIndex = 0;
            var keepLinesTogether = false;
            var keepWithNext = false;
            if (paragraphWidget && !(!ej2_base_1.isNullOrUndefined(paragraphWidget.containerWidget) && !ej2_base_1.isNullOrUndefined(paragraphWidget.containerWidget.containerWidget) && paragraphWidget.containerWidget.containerWidget instanceof page_1.FootNoteWidget)) {
                var index = 0;
                if (paragraphWidget instanceof page_1.FootNoteWidget) {
                    return;
                }
                if (!ej2_base_1.isNullOrUndefined(line)) {
                    index = paragraphWidget.childWidgets.indexOf(line);
                    if (index !== 0) {
                        if (paragraphWidget.paragraphFormat.keepLinesTogether && !ej2_base_1.isNullOrUndefined(paragraphWidget.previousWidget) && !line.previousLine.isEndsWithColumnBreak) {
                            index = 0;
                            keepLinesTogether = true;
                        }
                        else if (index == 1 && !line.previousLine.isEndsWithPageBreak && !line.previousLine.isEndsWithColumnBreak && paragraphWidget.paragraphFormat.widowControl &&
                            !ej2_base_1.isNullOrUndefined(paragraphWidget.previousWidget)) {
                            index = 0;
                            keepLinesTogether = true;
                        }
                    }
                    if (index > 0 || isPageBreak) {
                        paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
                    }
                    if (index === 0 && !paragraphWidget.isEndsWithPageBreak && !paragraphWidget.isEndsWithColumnBreak) {
                        var blockInfo = this.alignBlockElement(paragraphWidget);
                        if (!ej2_base_1.isNullOrUndefined(blockInfo.node)) {
                            startBlock = blockInfo.node instanceof page_1.TableRowWidget ? this.splitRow(blockInfo.node) : blockInfo.node;
                            startIndex = startBlock instanceof page_1.TableWidget ? 0 : parseInt(blockInfo.position.index, 10);
                            paragraphWidget = startBlock;
                            index = startIndex;
                            keepLinesTogether = false;
                            keepWithNext = true;
                            if (paragraphWidget instanceof page_1.ParagraphWidget) {
                                if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule && !paragraphWidget.paragraphFormat.keepWithNext && !isList) {
                                    this.viewer.owner.editorModule.updateWholeListItems(paragraphWidget);
                                }
                            }
                            else {
                                if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule && !isList) {
                                    this.viewer.owner.editorModule.updateWholeListItems(paragraphWidget);
                                }
                            }
                        }
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(paragraphWidget.bodyWidget) && !ej2_base_1.isNullOrUndefined(paragraphWidget.bodyWidget.containerWidget) && !(paragraphWidget.bodyWidget.containerWidget instanceof page_1.FootNoteWidget) && paragraphWidget.bodyWidget.page.footnoteWidget !== undefined) {
                    this.layoutfootNote(paragraphWidget.bodyWidget.page.footnoteWidget);
                }
                if (this.isMultiColumnSplit) {
                    var nextColumn = this.viewer.columnLayoutArea.getNextColumnByBodyWidget(paragraphWidget.bodyWidget);
                    if (ej2_base_1.isNullOrUndefined(nextColumn)) {
                        return;
                    }
                }
                var prevPage = paragraphWidget.bodyWidget.page;
                if (isPageBreak && index === 0 && !ej2_base_1.isNullOrUndefined(paragraphWidget.bodyWidget.lastChild) && paragraphWidget === paragraphWidget.bodyWidget.lastChild && this.endOverlapWidget) {
                    this.isRelayoutOverlap = false;
                }
                var nextBody = this.moveBlocksToNextPage(paragraphWidget, index === 0, index);
                if (prevPage !== nextBody.page) {
                    this.viewer.updateClientArea(nextBody, nextBody.page);
                }
                this.viewer.updateClientAreaForBlock(paragraphWidget, true);
                if (index > 0) {
                    if (line.isLastLine() && isPageBreak) {
                        return;
                    }
                    var nextParagraph = void 0;
                    if (nextBody.firstChild instanceof page_1.ParagraphWidget && nextBody.firstChild.equals(paragraphWidget)) {
                        nextParagraph = nextBody.firstChild;
                    }
                    else {
                        nextParagraph = new page_1.ParagraphWidget();
                    }
                    nextParagraph = this.moveChildsToParagraph(paragraphWidget, index, nextParagraph);
                    nextParagraph.containerWidget = nextBody;
                    for (var m = 0; m < nextParagraph.floatingElements.length; m++) {
                        var element = nextParagraph.floatingElements[m];
                        if (element.line.paragraph.bodyWidget !== paragraphWidget.bodyWidget && element.textWrappingStyle !== 'Inline') {
                            paragraphWidget.bodyWidget.floatingElements.splice(paragraphWidget.bodyWidget.floatingElements.indexOf(element), 1);
                        }
                    }
                    var footWidget = this.getFootNoteWidgetsOf(nextParagraph);
                    this.moveFootNotesToPage(footWidget, paragraphWidget.bodyWidget, nextBody);
                    paragraphWidget = nextParagraph;
                    this.viewer.clientActiveArea.height -= this.getFootNoteHeight(footWidget);
                }
                else if (!isPageBreak) {
                    paragraphWidget.containerWidget.removeChild(paragraphWidget.indexInOwner);
                    if (paragraphWidget instanceof page_1.ParagraphWidget && paragraphWidget.floatingElements.length > 0) {
                        this.addRemoveFloatElementsFromBody(paragraphWidget, paragraphWidget.containerWidget, false);
                    }
                }
                if (!isPageBreak) {
                    if (nextBody.childWidgets.indexOf(paragraphWidget) === -1) {
                        nextBody.childWidgets.splice(0, 0, paragraphWidget);
                        if (paragraphWidget instanceof page_1.ParagraphWidget && paragraphWidget.floatingElements.length > 0) {
                            this.addRemoveFloatElementsFromBody(paragraphWidget, nextBody, true);
                        }
                    }
                    paragraphWidget.containerWidget = nextBody;
                    this.viewer.updateClientAreaLocation(paragraphWidget, this.viewer.clientActiveArea);
                    if (keepLinesTogether || keepWithNext) {
                        if (paragraphWidget.bodyWidget.page.footnoteWidget) {
                            this.layoutfootNote(paragraphWidget.bodyWidget.page.footnoteWidget);
                        }
                        if (line.paragraph !== paragraphWidget || (paragraphWidget.paragraphFormat.widowControl && this.isImagePresent(paragraphWidget))) {
                            if (paragraphWidget instanceof page_1.TableWidget) {
                                this.clearTableWidget(paragraphWidget, true, true, false);
                            }
                            this.layoutBlock(paragraphWidget, 0, true);
                            viewer.updateClientAreaForBlock(paragraphWidget, false);
                        }
                        var lastBlock = line.paragraph;
                        if (keepWithNext) {
                            var nextBlock = paragraphWidget.nextWidget;
                            if (!ej2_base_1.isNullOrUndefined(nextBlock)) {
                                do {
                                    viewer.updateClientAreaForBlock(nextBlock, true);
                                    if (nextBlock !== lastBlock) {
                                        if (nextBlock instanceof page_1.TableWidget) {
                                            this.clearTableWidget(nextBlock, true, true, false);
                                        }
                                        this.layoutBlock(nextBlock, 0, true);
                                        viewer.updateClientAreaForBlock(nextBlock, false);
                                    }
                                    else {
                                        this.viewer.updateClientAreaLocation(nextBlock, this.viewer.clientActiveArea);
                                        break;
                                    }
                                    nextBlock = nextBlock.nextWidget;
                                } while (nextBlock);
                            }
                        }
                        this.updateClientAreaForNextBlock(line, lastBlock);
                    }
                    if (line.isFirstLine() && line.indexInOwner === 0 && !(line.children[0] instanceof page_1.ListTextElementBox)) {
                        var firstLineIndent = -editor_helper_1.HelperMethods.convertPointToPixel(line.paragraph.paragraphFormat.firstLineIndent);
                        this.viewer.updateClientWidth(firstLineIndent);
                    }
                }
            }
            if (!isPageBreak) {
                this.updateShapeBaseLocation(paragraphWidget);
            }
            if (this.isRelayoutOverlap && this.endOverlapWidget && (!this.skipRelayoutOverlap || (this.endOverlapWidget instanceof page_1.TableWidget && this.endOverlapWidget.wrapTextAround))) {
                var block_1 = this.endOverlapWidget.previousRenderedWidget;
                var para = line.paragraph;
                this.startOverlapWidget = para;
                line = this.endOverlapWidget.childWidgets[0];
                para = line.paragraph;
                while (para) {
                    para.floatingElements.forEach(function (shape) {
                        if (block_1.bodyWidget.floatingElements.indexOf(shape) !== -1 && shape.textWrappingStyle !== 'Inline') {
                            block_1.bodyWidget.floatingElements.splice(block_1.bodyWidget.floatingElements.indexOf(shape), 1);
                            line.paragraph.bodyWidget.floatingElements.push(shape);
                        }
                    });
                    para = para !== this.endOverlapWidget ? para.nextWidget : undefined;
                }
                this.layoutStartEndBlocks(this.startOverlapWidget, this.endOverlapWidget);
                this.startOverlapWidget = undefined;
                this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - this.endOverlapWidget.y;
                this.viewer.clientActiveArea.y = this.endOverlapWidget.y;
            }
        };
        Layout.prototype.isImagePresent = function (paragraph) {
            for (var i = 0; i < paragraph.childWidgets.length; i++) {
                var line = paragraph.childWidgets[i];
                for (var j = 0; j < line.children.length; j++) {
                    if (line.children[j] instanceof page_1.ImageElementBox) {
                        return true;
                    }
                }
            }
            return false;
        };
        Layout.prototype.updateShapeBaseLocation = function (paragraphWidget) {
            if (paragraphWidget instanceof page_1.ParagraphWidget &&
                paragraphWidget.floatingElements.length > 0) {
                for (var m = 0; m < paragraphWidget.floatingElements.length; m++) {
                    var shape = paragraphWidget.floatingElements[m];
                    var position = this.getFloatingItemPoints(shape);
                    shape.y = position.y;
                    shape.x = position.x;
                    if (shape instanceof page_1.ShapeElementBox)
                        this.updateChildLocationForCellOrShape(shape.y, shape);
                }
            }
        };
        Layout.prototype.moveChildsToParagraph = function (srcParagraph, childStartIndex, nextParagraph) {
            nextParagraph = this.addParagraphWidget(this.viewer.clientActiveArea, nextParagraph);
            var insertIndex = 0;
            for (var i = childStartIndex; i < srcParagraph.childWidgets.length; i++) {
                var lineWidget = srcParagraph.childWidgets[i];
                lineWidget.paragraph = nextParagraph;
                nextParagraph.childWidgets.splice(insertIndex, 0, lineWidget);
                lineWidget.paragraph = nextParagraph;
                insertIndex++;
            }
            nextParagraph.paragraphFormat = srcParagraph.paragraphFormat;
            nextParagraph.characterFormat = srcParagraph.characterFormat;
            nextParagraph.index = srcParagraph.index;
            srcParagraph.childWidgets.splice(childStartIndex);
            for (var i = 0; i < srcParagraph.floatingElements.length; i++) {
                var element = srcParagraph.floatingElements[i];
                if (element.line.paragraph !== srcParagraph) {
                    nextParagraph.floatingElements.push(element);
                    srcParagraph.floatingElements.splice(srcParagraph.floatingElements.indexOf(element), 1);
                    i--;
                }
            }
            return nextParagraph;
        };
        Layout.prototype.addRemoveFloatElementsFromBody = function (paragarph, body, add) {
            if (paragarph.floatingElements.length > 0) {
                for (var x = 0; x < paragarph.floatingElements.length; x++) {
                    if (add) {
                        if (body.floatingElements.indexOf(paragarph.floatingElements[x]) === -1 && paragarph.floatingElements[x].textWrappingStyle !== 'Inline') {
                            body.floatingElements.push(paragarph.floatingElements[x]);
                        }
                    }
                    else {
                        if (body.floatingElements.indexOf(paragarph.floatingElements[x]) !== -1) {
                            body.floatingElements.splice(body.floatingElements.indexOf(paragarph.floatingElements[x]), 1);
                        }
                    }
                }
            }
        };
        Layout.prototype.alignBlockElement = function (block) {
            if (block instanceof page_1.ParagraphWidget && (block.isEndsWithPageBreak || block.isEndsWithColumnBreak)) {
                return { node: undefined, position: { index: '' } };
            }
            var startBlock;
            var startIndex = 0;
            var previousBlock = this.getPreviousBlock(block);
            while (previousBlock) {
                if (previousBlock instanceof page_1.ParagraphWidget) {
                    if (!previousBlock.paragraphFormat.keepWithNext || previousBlock.isEndsWithPageBreak || previousBlock.isEndsWithColumnBreak) {
                        break;
                    }
                    startBlock = previousBlock;
                    if (previousBlock.paragraphFormat.keepLinesTogether) {
                        if (ej2_base_1.isNullOrUndefined(this.getPreviousBlock(previousBlock))) {
                            startBlock = undefined;
                        }
                        else {
                            startIndex = 0;
                        }
                    }
                    else {
                        if (ej2_base_1.isNullOrUndefined(this.getPreviousBlock(previousBlock))
                            && previousBlock.childWidgets.length === 1) {
                            startBlock = undefined;
                        }
                        else {
                            if (!previousBlock.paragraphFormat.widowControl) {
                                startIndex = previousBlock.lastChild.indexInOwner;
                            }
                            else {
                                startIndex = previousBlock.lastChild.indexInOwner - 1;
                                if (startIndex === 1 || startIndex < 0) {
                                    startIndex = 0;
                                }
                                if (startIndex !== 0) {
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (previousBlock instanceof page_1.TableRowWidget) {
                    var childWidget = previousBlock.childWidgets[0];
                    if (childWidget.childWidgets.length > 0) {
                        var firstBlock = this.documentHelper.getFirstParagraphInCell(childWidget);
                        if (!firstBlock.paragraphFormat.keepWithNext) {
                            break;
                        }
                        if (firstBlock.paragraphFormat.keepWithNext) {
                            if (ej2_base_1.isNullOrUndefined(this.getPreviousBlock(previousBlock))) {
                                startBlock = undefined;
                            }
                            else {
                                startBlock = previousBlock;
                                startIndex = startBlock.indexInOwner;
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
                previousBlock = this.getPreviousBlock(previousBlock);
            }
            if (!ej2_base_1.isNullOrUndefined(startBlock) && startBlock instanceof page_1.ParagraphWidget && startBlock.indexInOwner === 0 && startBlock.paragraphFormat.keepWithNext && startBlock.paragraphFormat.widowControl) {
                startBlock = block;
            }
            return { node: startBlock, position: { index: startIndex.toString() } };
        };
        Layout.prototype.getPreviousBlock = function (block) {
            var previousBlock;
            if (block instanceof page_1.ParagraphWidget) {
                previousBlock = block.previousWidget;
                if (!this.isInitialLoad && ej2_base_1.isNullOrUndefined(previousBlock) && block.containerWidget instanceof page_1.BodyWidget && !ej2_base_1.isNullOrUndefined(block.containerWidget.previousRenderedWidget) && block.containerWidget.sectionIndex === block.containerWidget.previousRenderedWidget.sectionIndex) {
                    if (!ej2_base_1.isNullOrUndefined(block.previousRenderedWidget) && block.previousRenderedWidget instanceof page_1.ParagraphWidget) {
                        previousBlock = block.previousRenderedWidget;
                    }
                }
            }
            else if (block instanceof page_1.TableRowWidget) {
                previousBlock = block.previousWidget;
                if (ej2_base_1.isNullOrUndefined(previousBlock)) {
                    previousBlock = block.ownerTable.previousWidget;
                }
            }
            if (previousBlock instanceof page_1.TableWidget) {
                previousBlock = previousBlock.lastChild;
            }
            return previousBlock;
        };
        Layout.prototype.splitRow = function (startRow) {
            var table = startRow.ownerTable;
            if (startRow.indexInOwner === 0) {
                return table;
            }
            var newTable = this.createTableWidget(table);
            for (var i = startRow.indexInOwner; i < table.childWidgets.length;) {
                var rowWidget = table.childWidgets.splice(i, 1)[0];
                newTable.childWidgets.push(rowWidget);
                rowWidget.containerWidget = newTable;
                table.height -= rowWidget.height;
                newTable.height += rowWidget.height;
            }
            table.containerWidget.childWidgets.splice(table.indexInOwner + 1, 0, newTable);
            newTable.containerWidget = table.containerWidget;
            return newTable;
        };
        Layout.prototype.splitParagraph = function (paragarph, index, nextParagraph) {
            if (index === 0 && ej2_base_1.isNullOrUndefined(nextParagraph)) {
                return paragarph;
            }
            var isMoveCurrentBlock = false;
            if (ej2_base_1.isNullOrUndefined(nextParagraph)) {
                nextParagraph = new page_1.ParagraphWidget();
                nextParagraph.containerWidget = paragarph.containerWidget;
                paragarph.containerWidget.childWidgets.splice(paragarph.indexInOwner + 1, 0, nextParagraph);
                nextParagraph.paragraphFormat = paragarph.paragraphFormat;
                nextParagraph.characterFormat = paragarph.characterFormat;
                nextParagraph.index = paragarph.index;
            }
            else if (index === 0) {
                isMoveCurrentBlock = true;
                var temp = paragarph;
                paragarph = nextParagraph;
                nextParagraph = temp;
            }
            var insertIndex = 0;
            for (var i = index; i < paragarph.childWidgets.length; i++) {
                var lineWidget = paragarph.childWidgets[i];
                lineWidget.paragraph = nextParagraph;
                if (isMoveCurrentBlock) {
                    nextParagraph.childWidgets.push(lineWidget);
                }
                else {
                    nextParagraph.childWidgets.splice(insertIndex, 0, lineWidget);
                }
                nextParagraph.height += lineWidget.height;
                paragarph.height -= lineWidget.height;
                lineWidget.paragraph = nextParagraph;
                insertIndex++;
            }
            nextParagraph.width = paragarph.width;
            if (isMoveCurrentBlock) {
                nextParagraph.containerWidget.childWidgets.splice(nextParagraph.indexInOwner, 1);
                nextParagraph.y = paragarph.y;
                nextParagraph.x = paragarph.x;
                nextParagraph.containerWidget = paragarph.containerWidget;
                paragarph.containerWidget.childWidgets.unshift(nextParagraph);
            }
            else {
                paragarph.childWidgets.splice(index);
            }
            if (paragarph.childWidgets.length === 0 || isMoveCurrentBlock) {
                paragarph.containerWidget.childWidgets.splice(paragarph.indexInOwner, 1);
            }
            return nextParagraph;
        };
        Layout.prototype.updateClientPositionForBlock = function (block, currentBlock) {
            var startBlock = (block instanceof page_1.TableRowWidget) ? block.ownerTable : block;
            var isClientAreaUpdated = false;
            do {
                this.viewer.updateClientAreaForBlock(startBlock, true);
                if (startBlock instanceof page_1.ParagraphWidget) {
                    if (currentBlock instanceof page_1.ParagraphWidget && currentBlock.equals(startBlock)) {
                        isClientAreaUpdated = true;
                        break;
                    }
                    this.addParagraphWidget(this.viewer.clientActiveArea, startBlock);
                    this.viewer.cutFromTop(this.viewer.clientActiveArea.y + startBlock.height);
                    this.viewer.updateClientAreaForBlock(startBlock, false);
                }
                else if (startBlock instanceof page_1.TableWidget) {
                    if (this.documentHelper.compatibilityMode !== 'Word2013' && !startBlock.isInsideTable) {
                        this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                            editor_helper_1.HelperMethods.convertPointToPixel(startBlock.firstChild.firstChild.leftMargin);
                    }
                    this.addTableWidget(this.viewer.clientActiveArea, [startBlock]);
                    var nextRow = startBlock.firstChild;
                    if (currentBlock instanceof page_1.TableRowWidget && startBlock.equals(currentBlock.ownerTable) && !ej2_base_1.isNullOrUndefined(nextRow)) {
                        do {
                            if (nextRow.equals(currentBlock)) {
                                isClientAreaUpdated = true;
                                break;
                            }
                            this.addTableRowWidget(this.viewer.clientActiveArea, [nextRow]);
                            this.updateChildLocationForRow(this.viewer.clientActiveArea.y, nextRow);
                            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + nextRow.height);
                            startBlock.height += nextRow.height;
                            nextRow = nextRow.nextWidget;
                        } while (nextRow);
                    }
                    else {
                        this.updateChildLocationForTable(startBlock.y, startBlock);
                        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + startBlock.height);
                        this.viewer.updateClientAreaForBlock(startBlock, false);
                    }
                }
                startBlock = startBlock.nextWidget;
            } while (startBlock && !isClientAreaUpdated);
        };
        Layout.prototype.updateClientAreaForNextBlock = function (line, paragraphWidget) {
            for (var m = 0; m < paragraphWidget.childWidgets.length; m++) {
                var child = paragraphWidget.childWidgets[m];
                if (line === child) {
                    break;
                }
                this.updateShapeBaseLocation(paragraphWidget);
                this.checkInbetweenShapeOverlap(child);
                this.viewer.cutFromTop(this.viewer.clientActiveArea.y + child.height);
            }
        };
        Layout.prototype.layoutStartEndBlocks = function (startBlock, endBlock) {
            var block = startBlock;
            this.isOverlapFloatTable = true;
            this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - startBlock.y;
            this.viewer.clientActiveArea.y = startBlock.y;
            var startParagaraph;
            if (startBlock instanceof page_1.TableWidget) {
                startParagaraph = this.documentHelper.getFirstParagraphInFirstCell(startBlock);
            }
            else {
                startParagaraph = startBlock;
            }
            if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
                this.viewer.owner.editorModule.updateWholeListItems(startParagaraph);
            }
            while (block) {
                this.viewer.updateClientAreaForBlock(block, true);
                if (block instanceof page_1.ParagraphWidget) {
                    this.layoutParagraph(block, 0);
                }
                else {
                    this.clearTableWidget(block, true, true, true);
                    this.layoutTable(block, 0);
                }
                this.viewer.updateClientAreaForBlock(block, false);
                var isTableHasParaVerticalOrigin = (!ej2_base_1.isNullOrUndefined(block.nextWidget) && block.nextWidget instanceof page_1.TableWidget && block.nextWidget === endBlock && (block.nextWidget.positioning.verticalOrigin === 'Paragraph'));
                block = block !== endBlock && !isTableHasParaVerticalOrigin ? block.nextWidget : undefined;
            }
        };
        Layout.prototype.alignLineElements = function (element, topMargin, bottomMargin, maxDescent, addSubWidth, subWidth, textAlignment, whiteSpaceCount, isLastElement) {
            if (element.width > 0 && (element instanceof page_1.TextElementBox || element instanceof page_1.ListTextElementBox)) {
                var textElement = element instanceof page_1.TextElementBox ? element : undefined;
                var baselineOffset = element instanceof page_1.TextElementBox ? textElement.baselineOffset : element.baselineOffset;
                topMargin += this.maxBaseline - baselineOffset;
                bottomMargin += maxDescent - (element.height - baselineOffset);
                if (!ej2_base_1.isNullOrUndefined(textElement) && textAlignment === 'Justify' && whiteSpaceCount > 0) {
                    var width = textElement.width;
                    var text = textElement.text;
                    if (!addSubWidth) {
                        text = editor_helper_1.HelperMethods.trimStart(text);
                        addSubWidth = (text.length > 0);
                    }
                    if (addSubWidth) {
                        var spaceCount = text.length - editor_helper_1.HelperMethods.removeSpace(text).length;
                        if (isLastElement) {
                            spaceCount -= text.length - editor_helper_1.HelperMethods.trimEnd(text).length;
                        }
                        if (whiteSpaceCount < spaceCount) {
                            width = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text, textElement.characterFormat, textElement.scriptType);
                            spaceCount = whiteSpaceCount;
                        }
                        if (spaceCount > 0) {
                            textElement.width = width + subWidth * spaceCount;
                            whiteSpaceCount -= spaceCount;
                        }
                    }
                }
            }
            else {
                addSubWidth = true;
                topMargin += this.maxBaseline - element.height;
                bottomMargin += maxDescent;
            }
            return { 'topMargin': topMargin, 'bottomMargin': bottomMargin, 'addSubWidth': addSubWidth, 'whiteSpaceCount': whiteSpaceCount };
        };
        Layout.prototype.updateWidgetToPage = function (viewer, paragraphWidget) {
            if (paragraphWidget.isInsideTable) {
                var cellWidget = paragraphWidget.associatedCell;
                paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
                if (ej2_base_1.isNullOrUndefined(paragraphWidget.associatedCell) || ej2_base_1.isNullOrUndefined(paragraphWidget.associatedCell.ownerRow)
                    || ej2_base_1.isNullOrUndefined(paragraphWidget.associatedCell.ownerRow.rowFormat)) {
                    return;
                }
                if (paragraphWidget.associatedCell.ownerRow.rowFormat.heightType === 'Exactly') {
                    cellWidget.height = editor_helper_1.HelperMethods.convertPointToPixel(paragraphWidget.associatedCell.ownerRow.rowFormat.height);
                }
                else {
                    if ([cellWidget].length <= 1 && paragraphWidget.associatedCell.ownerRow.rowFormat.heightType === 'AtLeast') {
                        cellWidget.height = Math.max(editor_helper_1.HelperMethods.convertPointToPixel(paragraphWidget.associatedCell.ownerRow.rowFormat.height), this.getCellContentHeight(cellWidget));
                    }
                    else {
                        cellWidget.height = cellWidget.height + paragraphWidget.height;
                    }
                }
                paragraphWidget.containerWidget = cellWidget;
            }
            else {
                if (!paragraphWidget.isEndsWithPageBreak && !paragraphWidget.isEndsWithColumnBreak || viewer instanceof viewer_1.WebLayoutViewer) {
                    paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
                }
            }
            if (this.isRelayoutFootnote && paragraphWidget.bodyWidget instanceof page_1.FootNoteWidget) {
                if (!paragraphWidget.isInsideTable) {
                    paragraphWidget.containerWidget.height += paragraphWidget.height;
                }
                this.shiftFootnoteChildLocation(paragraphWidget.bodyWidget, this.viewer);
            }
            if (paragraphWidget.bodyWidget instanceof page_1.HeaderFooterWidget) {
                if (!paragraphWidget.isInsideTable) {
                    paragraphWidget.containerWidget.height += paragraphWidget.height;
                }
                if (this.viewer.owner.enableHeaderAndFooter && paragraphWidget.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
                    this.shiftFooterChildLocation(paragraphWidget.bodyWidget, this.viewer);
                }
            }
            if (viewer instanceof viewer_1.WebLayoutViewer && paragraphWidget.containerWidget instanceof page_1.BodyWidget) {
                paragraphWidget.containerWidget.height += paragraphWidget.height;
            }
        };
        Layout.prototype.shiftFooterChildLocation = function (widget, viewer) {
            var pageHeight = widget.page.bodyWidgets[0].sectionFormat.pageHeight;
            if (widget.headerFooterType.indexOf('Footer') !== -1) {
                var footerDistance = widget.page.bodyWidgets[0].sectionFormat.footerDistance;
                var height = editor_helper_1.HelperMethods.convertPointToPixel(pageHeight - footerDistance);
                var top_1;
                if (widget.y + widget.height > height) {
                    top_1 = height - (widget.y + widget.height);
                }
                else if (widget.y + widget.height < height) {
                    top_1 = (widget.y + widget.height) - height;
                }
                if (!ej2_base_1.isNullOrUndefined(top_1)) {
                    top_1 = height - (widget.y + widget.height);
                    this.shiftChildLocation(top_1, widget);
                    viewer.clientActiveArea.y += top_1;
                }
            }
        };
        Layout.prototype.shiftFootnoteChildLocation = function (widget, viewer) {
            var pageHeight = widget.page.bodyWidgets[0].sectionFormat.pageHeight;
            var footerDistance = widget.page.bodyWidgets[0].sectionFormat.footerDistance;
            var bottomMargin = widget.page.bodyWidgets[0].sectionFormat.bottomMargin;
            var height = editor_helper_1.HelperMethods.convertPointToPixel(pageHeight - bottomMargin);
            var top;
            if (widget.y + widget.height > height) {
                top = height - (widget.y + widget.height);
            }
            else if (widget.y + widget.height < height) {
                top = (widget.y + widget.height) - height;
            }
            if (!ej2_base_1.isNullOrUndefined(top)) {
                top = height - (widget.y + widget.height);
                this.shiftChildLocation(top, widget);
                viewer.clientActiveArea.y += top;
            }
        };
        Layout.prototype.checkPreviousElement = function (line, index) {
            var paragraph = line.paragraph;
            var isSplitByWord = false;
            var lastTextElement = 0;
            for (var i = index - 1; i >= 0; i--) {
                var textElement = line.children[i];
                if (textElement instanceof page_1.TextElementBox && textElement.width > 0) {
                    var text = textElement.text;
                    lastTextElement = i;
                    if (text.length > 0 && (text[text.length - 1] === ' ' || text[text.length - 1] === '-')) {
                        if (i === index - 1) {
                            this.addSplittedLineWidget(line, index - 1);
                            return true;
                        }
                        isSplitByWord = true;
                        break;
                    }
                    else if (text === '\t' || this.documentHelper.textHelper.isUnicodeText(text, textElement.scriptType)) {
                        return false;
                    }
                    else if (text.indexOf(' ') >= 0) {
                        isSplitByWord = true;
                        var index_2 = text.lastIndexOf(' ') + 1;
                        var splittedElement = new page_1.TextElementBox();
                        splittedElement.text = text.substr(index_2);
                        splittedElement.characterFormat.copyFormat(textElement.characterFormat);
                        splittedElement.characterRange = textElement.characterRange;
                        if (textElement.revisions.length > 0) {
                            this.updateRevisionForSplittedElement(textElement, splittedElement, index_2 > 0);
                            splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
                        }
                        textElement.text = text.substr(0, index_2);
                        this.documentHelper.textHelper.getTextSize(splittedElement, textElement.characterFormat);
                        textElement.width -= splittedElement.width;
                        textElement.trimEndWidth = textElement.width;
                        textElement.height = splittedElement.height;
                        if (textElement.width === 0) {
                            line.children.splice(i, 1);
                            if (!ej2_base_1.isNullOrUndefined(line.layoutedElements) && line.layoutedElements.length > 0) {
                                line.layoutedElements.splice(i, 1);
                            }
                        }
                        line.children.splice(i + 1, 0, splittedElement);
                        if (!ej2_base_1.isNullOrUndefined(line.layoutedElements)) {
                            line.layoutedElements.splice(i + 1, 0, splittedElement);
                        }
                        break;
                    }
                }
                else if (!(textElement instanceof page_1.ListTextElementBox || textElement instanceof page_1.FieldElementBox
                    || textElement instanceof page_1.TextElementBox && textElement.width === 0 || textElement instanceof page_1.CommentCharacterElementBox || textElement instanceof page_1.ContentControl)) {
                    lastTextElement = i;
                    isSplitByWord = true;
                    break;
                }
            }
            if (isSplitByWord) {
                lastTextElement++;
                if (lastTextElement < line.children.length) {
                    var splitWidth = 0;
                    for (var i = lastTextElement; i < line.children.length; i++) {
                        splitWidth += line.children[i].width;
                        this.addSplittedLineWidget(line, i - 1);
                        i--;
                    }
                    var is2013Justification = paragraph.paragraphFormat.textAlignment === 'Justify' &&
                        this.documentHelper.compatibilityMode === 'Word2013';
                    if (!is2013Justification) {
                        this.viewer.updateClientWidth(splitWidth);
                    }
                }
            }
            return isSplitByWord;
        };
        Layout.prototype.clearListElementBox = function (paragraph) {
            if (paragraph.childWidgets.length === 0) {
                return;
            }
            var line = paragraph.childWidgets[0];
            if (ej2_base_1.isNullOrUndefined(line.children)) {
                return;
            }
            for (var i = line.children.length - 1; i > 0; i--) {
                if (line.children[i] instanceof page_1.ListTextElementBox) {
                    line.children.splice(i, 1);
                }
                else {
                    break;
                }
            }
            for (var i = 0; i < line.children.length; i++) {
                if (line.children[i] instanceof page_1.ListTextElementBox) {
                    line.children.splice(i, 1);
                    i--;
                }
                else {
                    break;
                }
            }
        };
        Layout.prototype.clearInvalidList = function (list) {
            if (list) {
                if (list.abstractListId === -1 && this.documentHelper.abstractLists.indexOf(list.abstractList) !== -1) {
                    this.documentHelper.abstractLists.splice(this.documentHelper.abstractLists.indexOf(list.abstractList), 1);
                }
                if (list.listId === -1 && this.documentHelper.lists.indexOf(list) !== -1) {
                    this.documentHelper.lists.splice(this.documentHelper.lists.indexOf(list), 1);
                }
            }
        };
        Layout.prototype.getListNumber = function (listFormat, isAutoList) {
            var list = this.documentHelper.getListById(listFormat.listId);
            var levelNumber = listFormat.listLevelNumber;
            var listLevel = this.getListLevel(list, listFormat.listLevelNumber);
            var levelOverride = !ej2_base_1.isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[levelNumber] : undefined;
            if (!ej2_base_1.isNullOrUndefined(levelOverride) && this.documentHelper.renderedLevelOverrides.indexOf(levelOverride) === -1 && ej2_base_1.isNullOrUndefined(levelOverride.overrideListLevel)) {
                this.documentHelper.renderedLevelOverrides.push(levelOverride);
                var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
                if (this.documentHelper.renderedLists.containsKey(abstractList)) {
                    var levels = this.documentHelper.renderedLists.get(abstractList);
                    if (levels.containsKey(levelNumber)) {
                        levels.remove(levelNumber);
                        this.ClearSubListLevelValues(list, abstractList, levelNumber);
                    }
                }
            }
            if (ej2_base_1.isNullOrUndefined(isAutoList)) {
                this.updateListValues(list, levelNumber);
            }
            return this.getListText(list, levelNumber, listLevel);
        };
        Layout.prototype.ClearSubListLevelValues = function (list, abstractList, levelNumber) {
            var levels = this.documentHelper.renderedLists.get(abstractList);
            var levelNumberTemp = levelNumber + 1;
            while (levelNumberTemp < abstractList.levels.length) {
                var listLevel = this.getListLevel(list, levelNumberTemp);
                if (levels.containsKey(levelNumberTemp) && listLevel.restartLevel > levelNumber) {
                    levels.remove(levelNumberTemp);
                }
                levelNumberTemp++;
            }
        };
        Layout.prototype.getListStartValue = function (listLevelNumber, list) {
            var levelOverride = !ej2_base_1.isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[listLevelNumber] : undefined;
            if (!ej2_base_1.isNullOrUndefined(levelOverride) && ej2_base_1.isNullOrUndefined(levelOverride.overrideListLevel)) {
                return levelOverride.startAt;
            }
            var listLevel = this.getListLevel(list, listLevelNumber);
            if (ej2_base_1.isNullOrUndefined(listLevel)) {
                return 0;
            }
            else {
                return listLevel.startAt;
            }
        };
        Layout.prototype.updateListValues = function (list, listLevelNumber) {
            var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
            var currentListLevel = this.getListLevel(list, listLevelNumber);
            if (!this.documentHelper.renderedLists.containsKey(abstractList)) {
                var startVal = new dictionary_1.Dictionary();
                this.documentHelper.renderedLists.add(abstractList, startVal);
                var listLevel = this.getListLevel(list, listLevelNumber);
                for (var i = 0; i <= listLevelNumber; i++) {
                    startVal.add(i, this.getListStartValue(i, list));
                }
            }
            else {
                var levels = this.documentHelper.renderedLists.get(abstractList);
                if (levels.containsKey(listLevelNumber)) {
                    var startAt = levels.get(listLevelNumber);
                    levels.set(listLevelNumber, startAt + 1);
                    var levelNumber = listLevelNumber + 1;
                    while (levelNumber < this.documentHelper.getAbstractListById(list.abstractListId).levels.length) {
                        var listLevel = this.getListLevel(list, levelNumber);
                        if (levels.containsKey(levelNumber) && (listLevel.restartLevel > listLevelNumber || currentListLevel.listLevelPattern === "Bullet")) {
                            levels.remove(levelNumber);
                        }
                        levelNumber++;
                    }
                }
                else {
                    var levelNumber = listLevelNumber;
                    while (!levels.containsKey(levelNumber - 1) && levelNumber > 0) {
                        var listLevel = this.getListLevel(list, levelNumber - 1);
                        levels.add(levelNumber - 1, this.getListStartValue(levelNumber - 1, list));
                        levelNumber--;
                    }
                    var startAt = this.getListStartValue(listLevelNumber, list);
                    levels.add(listLevelNumber, startAt);
                }
            }
        };
        Layout.prototype.getListText = function (listAdv, listLevelNumber, currentListLevel) {
            var listText = currentListLevel.numberFormat;
            if (this.documentHelper.renderedLists.containsKey(this.documentHelper.getAbstractListById(listAdv.abstractListId))) {
                var levels = this.documentHelper.renderedLists.get(this.documentHelper.getAbstractListById(listAdv.abstractListId));
                var keys = levels.keys;
                for (var i = 0; i < keys.length; i++) {
                    var levelNumber = keys[i];
                    var levelKey = '%' + (levelNumber + 1).toString();
                    var listLevel = this.getListLevel(listAdv, levelNumber);
                    var pattern = i < listLevelNumber ? listLevel.listLevelPattern !== 'LeadingZero' ? 'Arabic' : listLevel.listLevelPattern : undefined;
                    if (listText.match(levelKey)) {
                        if (levelNumber > listLevelNumber) {
                            return '';
                        }
                        else if (levels.containsKey(levelNumber) && !ej2_base_1.isNullOrUndefined(listLevel)) {
                            listText = listText.replace(levelKey, this.getListTextListLevel(listLevel, levels.get(levelNumber), currentListLevel.isLegalStyleNumbering ? pattern : undefined));
                        }
                        else {
                            listText = listText.replace(levelKey, '0');
                        }
                    }
                }
            }
            return listText;
        };
        Layout.prototype.getAsLetter = function (number) {
            var quotient = number / 26;
            var remainder = number % 26;
            if (remainder === 0) {
                remainder = 26;
                quotient--;
            }
            var letter = String.fromCharCode(65 - 1 + remainder);
            var listValue = '';
            while (quotient >= 0) {
                listValue = listValue + letter.toString();
                quotient--;
            }
            return listValue;
        };
        Layout.prototype.getListTextListLevel = function (listLevel, listValue, customPattern) {
            switch (!ej2_base_1.isNullOrUndefined(customPattern) ? customPattern : listLevel.listLevelPattern) {
                case 'UpRoman':
                    return this.getAsRoman(listValue).toUpperCase();
                case 'LowRoman':
                    return this.getAsRoman(listValue).toLowerCase();
                case 'UpLetter':
                    return this.getAsLetter(listValue).toUpperCase();
                case 'LowLetter':
                    return this.getAsLetter(listValue).toLowerCase();
                case 'Arabic':
                    return (listValue).toString();
                case 'LeadingZero':
                    return this.getAsLeadingZero(listValue);
                case 'Number':
                    return (listValue).toString();
                case 'OrdinalText':
                    return (listValue).toString();
                case 'Ordinal':
                    return this.getAsOrdinal(listValue, listLevel.characterFormat).toString();
                case 'FarEast':
                    return (listValue).toString();
                case 'Special':
                    return (listValue).toString();
                default:
                    return '';
            }
        };
        Layout.prototype.getFootEndNote = function (numberFormat, value) {
            switch (numberFormat) {
                case 'UpperCaseRoman':
                    return this.getAsRoman(value).toUpperCase();
                case 'LowerCaseRoman':
                    return this.getAsRoman(value).toLowerCase();
                case 'UpperCaseLetter':
                    return this.getAsLetter(value).toUpperCase();
                case 'LowerCaseLetter':
                    return this.getAsLetter(value).toLowerCase();
                default:
                    return (value).toString();
            }
        };
        Layout.prototype.generateNumber = function (number, magnitude, letter) {
            var numberstring = '';
            while (number >= magnitude) {
                number -= magnitude;
                numberstring += letter;
                this.value = number;
            }
            return numberstring.toString();
        };
        Layout.prototype.getAsLeadingZero = function (listValue) {
            if (listValue < 10) {
                return '0' + listValue.toString();
            }
            else {
                return listValue.toString();
            }
        };
        Layout.prototype.getAsRoman = function (number) {
            var retval = '';
            this.value = number;
            retval += this.generateNumber(this.value, 1000, 'M');
            retval += this.generateNumber(this.value, 900, 'CM');
            retval += this.generateNumber(this.value, 500, 'D');
            retval += this.generateNumber(this.value, 400, 'CD');
            retval += this.generateNumber(this.value, 100, 'C');
            retval += this.generateNumber(this.value, 90, 'XC');
            retval += this.generateNumber(this.value, 50, 'L');
            retval += this.generateNumber(this.value, 40, 'XL');
            retval += this.generateNumber(this.value, 10, 'X');
            retval += this.generateNumber(this.value, 9, 'IX');
            retval += this.generateNumber(this.value, 5, 'V');
            retval += this.generateNumber(this.value, 4, 'IV');
            retval += this.generateNumber(this.value, 1, 'I');
            return retval.toString();
        };
        Layout.prototype.getAsOrdinal = function (number, characterFormat) {
            switch (characterFormat.localeIdAscii) {
                case 1069:
                case 8218:
                case 5146:
                case 4122:
                case 1050:
                case 1029:
                case 1061:
                case 1035:
                case 3079:
                case 1031:
                case 5127:
                case 4103:
                case 2055:
                case 1038:
                case 1060:
                case 1055:
                case 1044:
                case 2068:
                case 1045:
                case 6170:
                case 2074:
                    return number.toString() + ".";
                case 2060:
                case 11276:
                case 3084:
                case 9228:
                case 12300:
                case 1036:
                case 15372:
                case 5132:
                case 13324:
                case 6156:
                case 14348:
                case 8204:
                case 10252:
                case 4108:
                    if (number == 1)
                        return number.toString() + "er";
                    else
                        return number.toString() + "e";
                case 2067:
                case 1043:
                    return number.toString() + "e";
                case 1032:
                    return number.toString() + "o";
                case 1040:
                case 2064:
                    return number.toString() + String.fromCharCode(176);
                case 5130:
                case 7178:
                case 12298:
                case 17418:
                case 4106:
                case 1046:
                case 2070:
                case 11274:
                case 16394:
                case 13322:
                case 9226:
                case 18442:
                case 2058:
                case 19466:
                case 6154:
                case 15370:
                case 10250:
                case 20490:
                case 3082:
                case 1034:
                case 21514:
                case 14346:
                case 8202:
                    return number.toString() + String.fromCharCode(186);
                case 1049:
                case 2073:
                    return number.toString() + "-" + String.fromCharCode(1081);
                case 2077:
                case 1053:
                    return this.getOrdinalInSwedish(number);
                case 1027:
                    return this.getOrdinalInCatalan(number);
                case 1030:
                    return this.getOrdinalInDanish(number);
                default:
                    return this.getOrdinalInEnglish(number);
            }
        };
        Layout.prototype.getOrdinalInEnglish = function (number) {
            switch (number % 100) {
                case 11:
                case 12:
                case 13:
                    return number.toString() + "th";
            }
            switch (number % 10) {
                case 1:
                    return number.toString() + "st";
                case 2:
                    return number.toString() + "nd";
                case 3:
                    return number.toString() + "rd";
                default:
                    return number.toString() + "th";
            }
        };
        Layout.prototype.getOrdinalInSwedish = function (number) {
            if (number == 11 || number == 12) {
                return number.toString() + ":e";
            }
            else if ((number % 10) == 1 || (number % 10) == 2) {
                return number.toString() + ":a";
            }
            else
                return number.toString() + ":e";
        };
        Layout.prototype.getOrdinalInCatalan = function (number) {
            switch (number) {
                case 1:
                    return number.toString() + ".";
                case 2:
                    return number.toString() + "n";
                case 3:
                    return number.toString() + "r";
                case 4:
                    return number.toString() + "t";
                case 14:
                    return number.toString() + String.fromCharCode(232) + "h";
                default:
                    return number.toString() + String.fromCharCode(232);
            }
        };
        Layout.prototype.getOrdinalInDanish = function (number) {
            if (number == 0)
                return number.toString() + "te";
            switch (number % 100) {
                case 0:
                    return number.toString() + "ende";
                case 1:
                    return number.toString() + "ste";
                case 2:
                    return number.toString() + "nden";
                case 3:
                    return number.toString() + "dje";
                case 4:
                    return number.toString() + "rde";
                case 5:
                case 6:
                case 11:
                case 12:
                case 30:
                    return number.toString() + "te";
                default:
                    return number.toString() + "nde";
            }
        };
        Layout.prototype.getListLevel = function (list, listLevelNumber) {
            if (!ej2_base_1.isNullOrUndefined(list)) {
                var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
                if (!ej2_base_1.isNullOrUndefined(list) && abstractList.levels.length <= listLevelNumber
                    && listLevelNumber >= 0 && listLevelNumber < 9) {
                    this.addListLevels(abstractList);
                }
                var levelOverrideAdv = undefined;
                var level = false;
                level = (!ej2_base_1.isNullOrUndefined(list.levelOverrides))
                    && !ej2_base_1.isNullOrUndefined((levelOverrideAdv = this.getOverrideListLevel(list.levelOverrides, listLevelNumber)))
                    && (!ej2_base_1.isNullOrUndefined(levelOverrideAdv.overrideListLevel));
                if (level) {
                    if (ej2_base_1.isNullOrUndefined(levelOverrideAdv.startAt)) {
                        levelOverrideAdv.overrideListLevel.startAt = abstractList.levels[listLevelNumber].startAt;
                    }
                    return levelOverrideAdv.overrideListLevel;
                }
                else if (!ej2_base_1.isNullOrUndefined(abstractList) && listLevelNumber >= 0 && listLevelNumber < abstractList.levels.length) {
                    return abstractList.levels[listLevelNumber];
                }
            }
            return undefined;
        };
        Layout.prototype.getOverrideListLevel = function (levelOverrides, listLevelNumber) {
            for (var i = 0; i < levelOverrides.length; i++) {
                if (levelOverrides[i].levelNumber == listLevelNumber)
                    return levelOverrides[i];
            }
            return undefined;
        };
        Layout.prototype.getTabWidth = function (paragraph, viewer, index, lineWidget, element) {
            var fPosition = 0;
            var isCustomTab = false;
            var tabs = paragraph.paragraphFormat.getUpdatedTabs();
            var isList = false;
            var sectionFormat = paragraph.bodyWidget.sectionFormat;
            var leftMargin = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
            var tabBeforeLeftIndent = false;
            if (!ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat.listFormat.listLevel) && !ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat)) {
                var listFormat = paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat;
                if (paragraph.paragraphFormat.leftIndent !== listFormat.leftIndent) {
                    isList = true;
                }
            }
            var clientWidth = 0;
            var clientActiveX = viewer.clientActiveArea.x;
            var firstLineIndent = editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
            var leftIndent = editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.leftIndent);
            if (!ej2_base_1.isNullOrUndefined(element) && lineWidget.isFirstLine()) {
                clientWidth = this.viewer.clientArea.x + firstLineIndent;
                if (isList) {
                    clientActiveX = clientActiveX + firstLineIndent;
                }
            }
            else {
                clientWidth = this.viewer.clientArea.x;
            }
            if (clientActiveX < clientWidth && (this.documentHelper.compatibilityMode !== 'Word2003' || tabs.length === 0)) {
                return viewer.clientArea.x - viewer.clientActiveArea.x;
            }
            var position = viewer.clientActiveArea.x -
                (viewer.clientArea.x - editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.leftIndent));
            for (var i = 0; i < tabs.length; i++) {
                var tabStop = tabs[i];
                var tabStopPosition = editor_helper_1.HelperMethods.convertPointToPixel(tabStop.position);
                if (tabStopPosition < leftIndent) {
                    if (parseFloat(position.toFixed(2)) < parseFloat(tabStopPosition.toFixed(2))) {
                        tabBeforeLeftIndent = true;
                    }
                    else {
                        tabBeforeLeftIndent = false;
                    }
                }
            }
            if (lineWidget.isFirstLine() && leftIndent > 0 && firstLineIndent < 0
                && (element instanceof page_1.ListTextElementBox || !tabBeforeLeftIndent)) {
                if ((viewer.clientArea.x - viewer.clientActiveArea.x) > 0) {
                    return viewer.clientArea.x - viewer.clientActiveArea.x;
                }
                else if (tabs.length === 0 && paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listLevel) {
                    tabs = paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat.tabs;
                }
            }
            var defaultTabWidth = editor_helper_1.HelperMethods.convertPointToPixel(this.documentHelper.defaultTabWidth);
            if (tabs.length === 0 && (position > 0 && defaultTabWidth > Math.round(position) && isList ||
                defaultTabWidth === this.defaultTabWidthPixel && defaultTabWidth > Math.round(position))) {
                return defaultTabWidth - position;
            }
            else {
                var breaked = false;
                if (tabs.length > 0) {
                    for (var i = tabs.length - 1; i > -1; i--) {
                        var tabStop = tabs[i];
                        var tabPosition = editor_helper_1.HelperMethods.convertPointToPixel(tabStop.position);
                        if (!(parseFloat(tabPosition.toFixed(2)) > parseFloat(position.toFixed(2)))) {
                            if (i > 0 && (editor_helper_1.HelperMethods.convertPointToPixel(tabs[i - 1].position) > parseFloat(position.toFixed(2)))) {
                                continue;
                            }
                            if (i != tabs.length - 1) {
                                var tabInfo = this.getJustificationTabWidth(tabs[i + 1], element, lineWidget, paragraph, defaultTabWidth, position, fPosition);
                                defaultTabWidth = tabInfo.defaultTabWidth;
                                fPosition = tabInfo.fPosition;
                                position = tabInfo.position;
                                isCustomTab = true;
                            }
                            breaked = true;
                            break;
                        }
                    }
                    if (!breaked) {
                        var tabJustification = this.getJustificationTabWidth(tabs[0], element, lineWidget, paragraph, defaultTabWidth, position, fPosition);
                        defaultTabWidth = tabJustification.defaultTabWidth;
                        fPosition = tabJustification.fPosition;
                        position = tabJustification.position;
                        isCustomTab = true;
                    }
                }
                if (!isCustomTab) {
                    var diff = parseFloat(((position * 100) % (defaultTabWidth * 100) / 100).toFixed(2));
                    var cnt = (position - diff) / defaultTabWidth;
                    fPosition = (cnt + 1) * defaultTabWidth;
                }
                if (parseFloat(fPosition.toFixed(1)) === parseFloat(position.toFixed(1))) {
                    return defaultTabWidth;
                }
                return (fPosition - position) > 0 ? fPosition - position : defaultTabWidth;
            }
        };
        Layout.prototype.getJustificationTabWidth = function (tab, element, lineWidget, paragraph, defaultTabWidth, position, fPosition) {
            var elementWidth = element ? this.documentHelper.textHelper.getTextSize(element, element.characterFormat) : 0;
            if (tab.tabJustification === 'Left' || tab.tabJustification === 'List') {
                fPosition = editor_helper_1.HelperMethods.convertPointToPixel(tab.position);
                if (element instanceof page_1.TabElementBox) {
                    element.tabLeader = tab.tabLeader;
                    element.tabText = '';
                }
            }
            else {
                var tabWidth = editor_helper_1.HelperMethods.convertPointToPixel(tab.position) - position;
                var width = this.getRightTabWidth(element.indexInOwner + 1, lineWidget, paragraph);
                if (width < tabWidth && tab.tabJustification != 'Decimal') {
                    if (tab.tabJustification === 'Right') {
                        defaultTabWidth = tabWidth - width;
                        var rightIndent = editor_helper_1.HelperMethods.convertPointToPixel(paragraph.rightIndent);
                        var areaWidth = this.viewer.clientActiveArea.width + rightIndent - defaultTabWidth;
                        this.viewer.clientActiveArea.width += rightIndent;
                        if (areaWidth < 0) {
                            defaultTabWidth += areaWidth - width;
                        }
                        else if (width > areaWidth) {
                            defaultTabWidth -= width - areaWidth;
                        }
                    }
                    else {
                        defaultTabWidth = tabWidth - width / 2;
                    }
                }
                else if (tab.tabJustification === 'Center' && (width / 2) < tabWidth) {
                    defaultTabWidth = tabWidth - width / 2;
                }
                else if (tab.tabJustification === 'Decimal') {
                    if (!ej2_base_1.isNullOrUndefined(element.nextElement) && element.nextElement instanceof page_1.TextElementBox) {
                        var nextElement = element.nextElement;
                        if (nextElement.text.indexOf(".") != -1) {
                            var index = nextElement.text.indexOf(".");
                            var text = nextElement.text.substring(0, index);
                            var textWidth = this.documentHelper.textHelper.getWidth(text, nextElement.characterFormat, nextElement.scriptType);
                            defaultTabWidth = tabWidth - textWidth;
                        }
                        else if (width < tabWidth) {
                            defaultTabWidth = tabWidth - width;
                        }
                        else {
                            defaultTabWidth = tabWidth;
                        }
                    }
                    else {
                        defaultTabWidth = tabWidth;
                    }
                }
                else {
                    defaultTabWidth = tab.tabJustification === 'Right' ? 0 : elementWidth;
                }
                fPosition = position;
                if (element instanceof page_1.TabElementBox) {
                    element.tabLeader = tab.tabLeader;
                    element.tabText = '';
                }
            }
            return {
                defaultTabWidth: defaultTabWidth,
                fPosition: fPosition,
                position: position
            };
        };
        Layout.prototype.getRightTabWidth = function (index, lineWidget, paragraph) {
            var width = 0;
            var isFieldCode = false;
            var elementBox = lineWidget.children[index];
            while (elementBox) {
                if ((elementBox instanceof page_1.FieldElementBox) || (elementBox instanceof page_1.BookmarkElementBox) || isFieldCode) {
                    if (elementBox instanceof page_1.FieldElementBox) {
                        if (elementBox.fieldType === 0) {
                            isFieldCode = true;
                        }
                        else if (elementBox.fieldType === 2) {
                            isFieldCode = false;
                        }
                    }
                    elementBox.width = 0;
                }
                else {
                    if (elementBox instanceof page_1.FieldTextElementBox && !this.isTocField(elementBox.fieldBegin)) {
                        var text = this.documentHelper.getFieldResult(elementBox.fieldBegin, elementBox.paragraph.bodyWidget.page);
                        if (text !== '') {
                            elementBox.text = text;
                        }
                    }
                    if (elementBox instanceof page_1.TextElementBox) {
                        this.documentHelper.textHelper.getTextSize(elementBox, elementBox.characterFormat);
                    }
                }
                if (elementBox instanceof page_1.TextElementBox && elementBox.text === '\t') {
                    return width;
                }
                else {
                    width = width + elementBox.width;
                }
                elementBox = elementBox.nextNode;
            }
            return width;
        };
        Layout.prototype.getSplitIndexByWord = function (clientActiveWidth, text, width, characterFormat, scriptType) {
            var index = 0;
            var length = text.length;
            while (index < length) {
                var nextIndex = this.getTextIndexAfterSpace(text, index);
                if (nextIndex === 0 || nextIndex === length) {
                    nextIndex = length - 1;
                }
                var splitWidth = width;
                if ((nextIndex < length - 1 || (nextIndex === length - 1 && text[nextIndex - 1] === ' ')) && index !== nextIndex) {
                    splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.slice(0, nextIndex), characterFormat, scriptType);
                }
                if (splitWidth <= clientActiveWidth) {
                    index = nextIndex;
                }
                else {
                    if (index === 0 && text[0] === ' ') {
                        index = this.getTextIndexAfterSpace(text, 0);
                    }
                    break;
                }
            }
            return index;
        };
        Layout.prototype.getTextSplitIndexByCharacter = function (totalClientWidth, clientActiveAreaWidth, text, width, characterFormat, scriptType) {
            var length = text.length;
            for (var i = 0; i < length; i++) {
                var splitWidth = width;
                if (i + 1 < length) {
                    splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.substring(0, i + 1), characterFormat, scriptType);
                }
                if (splitWidth > clientActiveAreaWidth) {
                    if (i === 0 && splitWidth > totalClientWidth) {
                        return (length > 1 && text[1] === ' ') ? this.getTextIndexAfterSpace(text, 1) : 1;
                    }
                    else if (text[i] === ' ') {
                        return this.getTextIndexAfterSpace(text, i);
                    }
                    return i;
                }
            }
            return 0;
        };
        Layout.prototype.getSubWidth = function (lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd) {
            var width = 0;
            var trimSpace = true;
            var lineText = '';
            var trimmedSpaceWidth = 0;
            var isBidi = lineWidget.paragraph.paragraphFormat.bidi;
            if (this.wrapPosition.length > 0) {
                var subWidths = this.getSubWidthBasedOnTextWrap(lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd);
                if (subWidths.length > 0) {
                    return subWidths;
                }
            }
            var renderElementBox = lineWidget.renderedElements;
            for (var i = renderElementBox.length - 1; i >= 0; i--) {
                var element = renderElementBox[i];
                if (element.width > 0 && element instanceof page_1.TextElementBox) {
                    var elementText = element.text;
                    lineText = elementText + lineText;
                    if (justify && isBidi) {
                        if (elementText === ' ' && i - 1 >= 0 && renderElementBox[i - 1].text === ' ') {
                            trimSpace = true;
                        }
                        else {
                            trimSpace = false;
                        }
                    }
                    if (trimSpace && (elementText.trim() !== '' || elementText === '\t')) {
                        if (editor_helper_1.HelperMethods.endsWith(elementText)) {
                            var widthExcludeSpace = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(elementText, element.characterFormat, element.scriptType);
                            width += widthExcludeSpace;
                            trimmedSpaceWidth += element.width - widthExcludeSpace;
                        }
                        else {
                            width += element.width;
                        }
                        trimSpace = false;
                    }
                    else if (!trimSpace) {
                        width += element.width;
                    }
                    else {
                        trimmedSpaceWidth += element.width;
                    }
                }
                else {
                    lineText = 'a' + lineText;
                    trimSpace = false;
                    if (element instanceof page_1.ShapeBase && element.textWrappingStyle !== 'Inline') {
                        continue;
                    }
                    width += element.width;
                }
                if (!justify) {
                    width = Math.round(width);
                }
                else {
                    width = width;
                }
            }
            var totalSpaceCount = lineText.length - editor_helper_1.HelperMethods.removeSpace(lineText).length;
            lineText = lineText.trim();
            spaceCount = lineText.length - editor_helper_1.HelperMethods.removeSpace(lineText).length;
            var subWidth = (this.viewer.clientArea.width - firstLineIndent - width);
            var totalSubWidth = (this.viewer.clientArea.width - firstLineIndent - (width + trimmedSpaceWidth));
            if (isBidi && justify) {
                if (totalSubWidth < 0) {
                    trimmedSpaceWidth = -trimmedSpaceWidth;
                }
                else {
                    subWidth = totalSubWidth;
                }
            }
            if ((subWidth <= 0 && !this.is2013Justification) || (spaceCount === 0 && justify && !isBidi)) {
                spaceCount = 0;
                subWidth = 0;
            }
            else if (justify) {
                if (!isParagraphEnd && spaceCount > 0 || (isParagraphEnd && this.is2013Justification && spaceCount > 0)) {
                    subWidth = subWidth / spaceCount;
                }
                else {
                    spaceCount = 0;
                }
            }
            else if (trimmedSpaceWidth > 0 && isBidi && isParagraphEnd) {
                subWidth -= trimmedSpaceWidth;
            }
            return [{ 'trimmedSpaceWidth': trimmedSpaceWidth, 'subWidth': subWidth, 'spaceCount': spaceCount, 'totalSpaceCount': totalSpaceCount }];
        };
        Layout.prototype.getSubWidthBasedOnTextWrap = function (lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd) {
            var subWidths = [];
            var width = 0;
            var lineContent = '';
            var wrapIndex = this.wrapPosition.length - 1;
            var trimSpace = true;
            for (var z = lineWidget.children.length - 1; z >= 0; z--) {
                var elementBox = lineWidget.children[z];
                if (elementBox.width > 0 && elementBox instanceof page_1.TextElementBox) {
                    var elementText = elementBox.text;
                    lineContent = elementText + lineContent;
                    if (trimSpace && (elementText.trim() !== '' || elementText === '\t')) {
                        if (editor_helper_1.HelperMethods.endsWith(elementText)) {
                            width += this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(elementText, elementBox.characterFormat, elementBox.scriptType);
                        }
                        else {
                            width += elementBox.width;
                        }
                        trimSpace = false;
                    }
                    else if (!trimSpace) {
                        width += elementBox.width;
                    }
                }
                else {
                    lineContent = 'a' + lineContent;
                    trimSpace = false;
                    if (!(elementBox instanceof page_1.ShapeBase && elementBox.textWrappingStyle !== 'Inline')) {
                        width += elementBox.width;
                    }
                }
                if ((elementBox.padding.left > 0 || z === 0) && (wrapIndex >= 0)) {
                    var wrapPosition = this.wrapPosition[wrapIndex--];
                    while (wrapPosition.width <= 0 && (wrapIndex >= 0)) {
                        wrapPosition = this.wrapPosition[wrapIndex--];
                    }
                    var info = this.getSubWidthInfo(lineWidget, wrapPosition.width, width, lineContent, spaceCount, justify, isParagraphEnd);
                    if (!ej2_base_1.isNullOrUndefined(info)) {
                        width = 0;
                        lineContent = '';
                        subWidths.unshift(info);
                    }
                }
            }
            return subWidths;
        };
        Layout.prototype.isWordFittedByJustification = function (element, nextWordWidth) {
            var line = element.line;
            var paragraph = line.paragraph;
            var paraFormat = paragraph.paragraphFormat;
            var textAlignment = paraFormat.textAlignment;
            var isParagraphEnd = line.isLastLine();
            var firstLineIndent = 0;
            if (line.isFirstLine()) {
                firstLineIndent = editor_helper_1.HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
            }
            var availableLineWidth = this.viewer.clientActiveArea.width;
            if (nextWordWidth != 0 && availableLineWidth >= nextWordWidth / 2) {
                var whiteSpaceCount = 0;
                var widthInfo = void 0;
                var totalSpaceCount = 0;
                if (textAlignment !== 'Left' && this.viewer.textWrap && (!(textAlignment === 'Justify' && isParagraphEnd)
                    || (textAlignment === 'Justify' && paraFormat.bidi) || (this.is2013Justification && isParagraphEnd))) {
                    widthInfo = this.getSubWidth(line, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
                    whiteSpaceCount = widthInfo[0].spaceCount;
                    totalSpaceCount = widthInfo[0].totalSpaceCount;
                }
                if (!ej2_base_1.isNullOrUndefined(widthInfo) && widthInfo.length == 1 && availableLineWidth > 0
                    && textAlignment === 'Justify' && this.documentHelper.compatibilityMode === 'Word2013' && !this.is2013Justification
                    && paraFormat.rightIndent === 0 && paraFormat.leftIndent === 0) {
                    var effectiveWidth = 0;
                    var totalSpaceWidth = this.getTotalSpaceWidth(line, totalSpaceCount);
                    var normalWidth = totalSpaceWidth / totalSpaceCount;
                    var justifyWidth = (availableLineWidth + totalSpaceWidth) / totalSpaceCount;
                    var diffFactor = ((justifyWidth - normalWidth) / normalWidth) * 100;
                    if (diffFactor <= 33) {
                        effectiveWidth = totalSpaceWidth / 8;
                    }
                    else {
                        effectiveWidth = totalSpaceWidth / 4;
                    }
                    if (availableLineWidth + effectiveWidth >= nextWordWidth) {
                        this.viewer.clientActiveArea.x -= effectiveWidth;
                        this.viewer.clientActiveArea.width += effectiveWidth;
                        this.is2013Justification = true;
                        return true;
                    }
                }
            }
            return false;
        };
        Layout.prototype.getTotalSpaceWidth = function (lineWidget, count) {
            var totalSpaceWidth = 0;
            var totalSpaceCount = 0;
            if (lineWidget) {
                for (var i = 0; i < lineWidget.children.length; i++) {
                    var currentWidget = lineWidget.children[i];
                    if (currentWidget instanceof page_1.TextElementBox) {
                        var spaceCount = currentWidget.text.length - editor_helper_1.HelperMethods.removeSpace(currentWidget.text).length;
                        if (spaceCount > 0) {
                            var spaceWidth = this.documentHelper.textHelper.getWidth(' ', currentWidget.characterFormat, currentWidget.scriptType);
                            totalSpaceWidth += spaceCount * spaceWidth;
                            totalSpaceCount += spaceCount;
                        }
                    }
                    if (!ej2_base_1.isNullOrUndefined(count) && totalSpaceCount >= count) {
                        break;
                    }
                }
            }
            return totalSpaceWidth;
        };
        Layout.prototype.getSubWidthInfo = function (lineWidget, lastWrapPositionWidth, width, lineContent, spaceCount, justify, isParagraphEnd) {
            if (lastWrapPositionWidth > 0) {
                var wrappedSubWidth = lastWrapPositionWidth - width;
                lineContent = lineContent.trim();
                spaceCount = lineContent.length - editor_helper_1.HelperMethods.removeSpace(lineContent).length;
                var totalSubWidth = wrappedSubWidth;
                if (totalSubWidth <= 0 || (spaceCount === 0 && justify && !lineWidget.paragraph.paragraphFormat.bidi)) {
                    spaceCount = 0;
                    totalSubWidth = 0;
                }
                else if (justify) {
                    if (!isParagraphEnd && spaceCount > 0) {
                        totalSubWidth = totalSubWidth / spaceCount;
                    }
                    else {
                        spaceCount = 0;
                    }
                }
                return { 'trimmedSpaceWidth': 0, 'subWidth': totalSubWidth, 'spaceCount': spaceCount, 'totalSpaceCount': spaceCount };
            }
            return undefined;
        };
        Layout.prototype.getBeforeSpacing = function (paragraph, pageIndex) {
            var beforeSpacing = 0;
            if (!this.documentHelper.dontUseHtmlParagraphAutoSpacing) {
                var previousBlock = paragraph.previousWidget;
                if (previousBlock instanceof page_1.ParagraphWidget) {
                    var afterSpacing = this.getAfterSpacing(previousBlock);
                    var before = paragraph.paragraphFormat.beforeSpacing;
                    if (paragraph.paragraphFormat.spaceBeforeAuto) {
                        before = 14;
                    }
                    if (afterSpacing < before) {
                        beforeSpacing = before - afterSpacing;
                    }
                }
                else if (previousBlock instanceof page_1.TableWidget) {
                    if (paragraph.paragraphFormat.spaceBeforeAuto) {
                        beforeSpacing = 14;
                    }
                    else {
                        beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                    }
                }
                else {
                    if (pageIndex > 0 && paragraph === paragraph.bodyWidget.childWidgets[0]) {
                        if (this.documentHelper.pages[pageIndex].sectionIndex !== this.documentHelper.pages[pageIndex - 1].sectionIndex) {
                            if (paragraph.paragraphFormat.spaceBeforeAuto) {
                                beforeSpacing = 14;
                            }
                            else {
                                beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                            }
                        }
                    }
                    else {
                        if (paragraph.paragraphFormat.spaceBeforeAuto) {
                            beforeSpacing = 0;
                        }
                        else {
                            beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                        }
                    }
                }
            }
            else {
                beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
            }
            if (this.isSameStyle(paragraph, false)) {
                return 0;
            }
            else {
                return editor_helper_1.HelperMethods.convertPointToPixel(beforeSpacing);
            }
        };
        Layout.prototype.getAfterSpacing = function (paragraph) {
            var afterSpacing = paragraph.paragraphFormat.afterSpacing;
            if (!this.documentHelper.dontUseHtmlParagraphAutoSpacing && paragraph.paragraphFormat.spaceAfterAuto) {
                if (ej2_base_1.isNullOrUndefined(paragraph.nextWidget) && paragraph.isInsideTable) {
                    afterSpacing = 0;
                }
                else {
                    afterSpacing = 14;
                }
            }
            if (this.isSameStyle(paragraph, true)) {
                return 0;
            }
            else {
                return afterSpacing;
            }
        };
        Layout.prototype.getLineSpacing = function (paragraph, maxHeight, alterLineSpacing) {
            if (ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat)) {
                return 0;
            }
            var lineSpacing = 0;
            switch (paragraph.paragraphFormat.lineSpacingType) {
                case 'AtLeast':
                case 'Exactly':
                    lineSpacing = editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.lineSpacing);
                    break;
                default:
                    lineSpacing = paragraph.paragraphFormat.lineSpacing;
                    if (alterLineSpacing) {
                        lineSpacing = lineSpacing - 1;
                    }
                    lineSpacing = lineSpacing * maxHeight;
                    break;
            }
            return lineSpacing;
        };
        Layout.prototype.isParagraphFirstLine = function (paragraph, line) {
            var widget = paragraph;
            if (ej2_base_1.isNullOrUndefined(widget.childWidgets) || widget.childWidgets.indexOf(line) === 0) {
                if (line.children.length > 0 && !ej2_base_1.isNullOrUndefined(paragraph.previousWidget)
                    && paragraph.previousWidget instanceof page_1.ParagraphWidget) {
                    return line.paragraph.index !== paragraph.previousWidget.index;
                }
                return true;
            }
            return false;
        };
        Layout.prototype.isParagraphLastLine = function (element) {
            var paragraph = element.line.paragraph;
            var lastLineWidget = paragraph.childWidgets[paragraph.childWidgets.length - 1];
            var lastInline = lastLineWidget.children[lastLineWidget.children.length - 1];
            if (element === lastInline) {
                return (lastInline instanceof page_1.FieldElementBox) || ((!(lastInline instanceof page_1.TextElementBox && lastInline.text === '\v')));
            }
            return false;
        };
        Layout.prototype.getTextIndexAfterSpace = function (text, startIndex) {
            var length = text.length;
            var index = 0;
            var hyphenIndex = 0;
            index = text.indexOf(' ', startIndex) + 1;
            hyphenIndex = text.indexOf('-', startIndex) + 1;
            if (hyphenIndex == 1) {
                hyphenIndex = text.indexOf('-', (hyphenIndex + 1)) + 1;
            }
            if (hyphenIndex > 0 && index > 0) {
                index = Math.min(index, hyphenIndex);
            }
            else if (hyphenIndex > 0 && index == 0) {
                index = hyphenIndex;
            }
            var nextIndex = index;
            if (nextIndex === 0 || nextIndex === length) {
                return nextIndex;
            }
            while (text[nextIndex] === ' ') {
                nextIndex++;
                if (nextIndex === length) {
                    break;
                }
            }
            return nextIndex;
        };
        Layout.prototype.moveNextWidgetsToTable = function (tableWidget, currentRow, moveFromNext) {
            var rowIndex = currentRow.indexInOwner;
            var currentTable = tableWidget[tableWidget.length - 1];
            if (moveFromNext) {
                rowIndex += 1;
            }
            var nextWidgets = currentRow.containerWidget.childWidgets.splice(rowIndex);
            for (var i = 0; i < nextWidgets.length; i++) {
                currentTable.childWidgets.push(nextWidgets[i]);
                nextWidgets[i].containerWidget = currentTable;
            }
        };
        Layout.prototype.addTableCellWidget = function (cell, area, maxCellMarginTop, maxCellMarginBottom) {
            var prevColumnIndex = 0;
            var cellspace = 0;
            var left = 0;
            var top = maxCellMarginTop;
            var right = 0;
            var bottom = maxCellMarginBottom;
            if (!ej2_base_1.isNullOrUndefined(cell.cellFormat)) {
                if (cell.cellFormat.containsMargins()) {
                    left = ej2_base_1.isNullOrUndefined(cell.cellFormat.leftMargin) ? editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.leftMargin) : editor_helper_1.HelperMethods.convertPointToPixel(cell.cellFormat.leftMargin);
                    right = ej2_base_1.isNullOrUndefined(cell.cellFormat.rightMargin) ? editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.rightMargin) : editor_helper_1.HelperMethods.convertPointToPixel(cell.cellFormat.rightMargin);
                }
                else {
                    if (cell.columnIndex === 0 && cell.ownerRow.rowFormat.hasValue('leftMargin')) {
                        left = editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.leftMargin);
                    }
                    else {
                        left = editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.leftMargin);
                    }
                    if (cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1 &&
                        cell.ownerRow.rowFormat.hasValue('rightMargin')) {
                        right = editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.rightMargin);
                    }
                    else {
                        right = editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.rightMargin);
                    }
                }
            }
            cell.margin = new page_1.Margin(left, top, right, bottom);
            var autofit = cell.ownerTable.tableFormat.allowAutoFit;
            var cellWidth = cell.cellFormat.cellWidth;
            if (cell.cellFormat.preferredWidthType === 'Percent' && cell.cellFormat.preferredWidth !== 0 && cellWidth <= 0) {
                var width = editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.getTableClientWidth(cell.ownerTable.getContainerWidth()));
                cellWidth = cell.ownerTable.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, width, cell);
            }
            cell.width = editor_helper_1.HelperMethods.convertPointToPixel(cellWidth);
            if (!ej2_base_1.isNullOrUndefined(cell.previousWidget)) {
                prevColumnIndex = cell.previousWidget.columnIndex + cell.previousWidget.cellFormat.columnSpan;
            }
            cellspace = !ej2_base_1.isNullOrUndefined(cell.ownerTable) && !ej2_base_1.isNullOrUndefined(cell.ownerTable.tableFormat) ? editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing) : 0;
            var prevSpannedCellWidth = 0;
            if (prevColumnIndex < cell.columnIndex) {
                prevSpannedCellWidth = editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableHolder.getPreviousSpannedCellWidth(prevColumnIndex, cell.columnIndex));
                if (prevColumnIndex === 0) {
                    prevSpannedCellWidth = prevSpannedCellWidth - cellspace / 2;
                }
            }
            cell.x = area.x + prevSpannedCellWidth + cell.margin.left;
            cell.y = area.y + cell.margin.top + cellspace;
            cell.width = cell.width - cell.margin.left - cell.margin.right;
            if (cellspace > 0) {
                cell.x += cellspace;
                if (cell.ownerTable.tableHolder.columns.length === 1) {
                    cell.width -= cellspace * 2;
                }
                else if (cell.columnIndex === 0 || cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1) {
                    cell.width -= ((cellspace * 2) - cellspace / 2);
                }
                else {
                    cell.width -= cellspace;
                }
            }
            var leftBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(page_1.TableCellWidget.getCellLeftBorder(cell).getLineWidth());
            var rightBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(page_1.TableCellWidget.getCellRightBorder(cell).getLineWidth());
            var linestyle = false;
            cell.leftBorderWidth = !cell.ownerTable.isBidiTable ? leftBorderWidth : rightBorderWidth;
            var isLeftStyleNone = (cell.cellFormat.borders.left.lineStyle === 'None');
            var isRightStyleNone = (cell.cellFormat.borders.right.lineStyle === 'None');
            cell.x += (!isLeftStyleNone) ? 0 : (cell.leftBorderWidth > 0) ? 0 : cell.leftBorderWidth;
            cell.width -= (!isLeftStyleNone) ? 0 : (cell.leftBorderWidth > 0) ? 0 : cell.leftBorderWidth;
            var lastCell = !cell.ownerTable.isBidiTable ? cell.cellIndex === cell.ownerRow.childWidgets.length - 1
                : cell.cellIndex === 0;
            if (cellspace > 0 || cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1 ||
                cell.index === cell.containerWidget.childWidgets.length - 1) {
                cell.rightBorderWidth = !cell.ownerTable.isBidiTable ? rightBorderWidth : leftBorderWidth;
                if (!cell.ownerTable.tableFormat.allowAutoFit) {
                    cell.width -= cell.rightBorderWidth;
                }
                if (!this.isInsertTable()) {
                    linestyle = this.checkPreviousMargins(cell.ownerTable);
                }
            }
            cell.margin.right += (isRightStyleNone && !linestyle) ? 0 : (cell.rightBorderWidth);
            if (cell.width < cell.sizeInfo.minimumWidth / 2 && !this.isInitialLoad) {
                cell.width = cell.sizeInfo.minimumWidth / 2;
            }
            return cell;
        };
        Layout.prototype.checkPreviousMargins = function (table) {
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[row.childWidgets.length - 1];
                    if (cell.cellFormat.borders.right.lineStyle !== 'None') {
                        return true;
                    }
                }
            }
            return false;
        };
        Layout.prototype.addWidgetToTable = function (viewer, tableCollection, rowCollection, row, footnotes, endRowWidget, isInitialLayout, startRowIndex, isRepeatRowHeader) {
            var tableWidget = tableCollection[0];
            var index = tableWidget.childWidgets.length;
            var prevWidget = undefined;
            var rowWidgetIndex = rowCollection.indexOf(row);
            var footnoteWidgets = [];
            if (rowWidgetIndex > 0) {
                prevWidget = rowCollection[rowWidgetIndex - 1];
            }
            else if (row.previousRenderedWidget instanceof page_1.TableRowWidget &&
                row.previousRenderedWidget.ownerTable.equals(row.ownerTable)) {
                prevWidget = row.previousRenderedWidget;
            }
            if (!ej2_base_1.isNullOrUndefined(prevWidget)) {
                tableWidget = prevWidget.containerWidget;
                index = tableWidget.childWidgets.indexOf(prevWidget) + 1;
                if (Math.round(row.y) !== Math.round(prevWidget.y + prevWidget.height)) {
                    var prevIndex = tableCollection.indexOf(tableWidget);
                    if (prevIndex + 1 >= tableCollection.length) {
                        this.addTableWidget(viewer.clientActiveArea, tableCollection, true);
                    }
                    tableWidget = tableCollection[prevIndex + 1];
                    index = tableWidget.childWidgets.length;
                }
                if (rowWidgetIndex > 0) {
                    index = 0;
                }
            }
            this.updateRowHeightBySpannedCell(tableWidget, row, index);
            this.updateRowHeightByCellSpacing(tableCollection, row, viewer);
            if (row.containerWidget && row.containerWidget !== tableWidget &&
                row.containerWidget.childWidgets.indexOf(row) !== -1) {
                row.containerWidget.childWidgets.splice(row.containerWidget.childWidgets.indexOf(row), 1);
            }
            if (tableWidget.childWidgets.indexOf(row) === -1) {
                tableWidget.childWidgets.splice(index, 0, row);
                if (isRepeatRowHeader) {
                    tableWidget.bodyWidget.page.repeatHeaderRowTableWidget = true;
                }
            }
            row.containerWidget = tableWidget;
            if (!row.ownerTable.isInsideTable) {
                if (footnotes.length > 0) {
                    if (!ej2_base_1.isNullOrUndefined(footnotes)) {
                        footnoteWidgets = this.getFootnoteBody(footnotes);
                    }
                }
                else {
                    if (!ej2_base_1.isNullOrUndefined(row)) {
                        for (var i = 0; i < row.childWidgets.length; i++) {
                            var cell = row.childWidgets[i];
                            for (var j = 0; j < cell.childWidgets.length; j++) {
                                var footnoteCollection = this.getFootNoteWidgetsOf(cell.childWidgets[j], true);
                                for (var k = 0; k < footnoteCollection.length; k++) {
                                    footnoteWidgets.splice(footnoteWidgets.length, 0, footnoteCollection[k]);
                                }
                            }
                        }
                    }
                }
                if (footnoteWidgets.length > 0 && ej2_base_1.isNullOrUndefined(footnoteWidgets[0].containerWidget)) {
                    this.layoutFootnoteInSplittedRow(row, footnoteWidgets);
                }
                else if (!ej2_base_1.isNullOrUndefined(footnoteWidgets) && footnoteWidgets.length > 0 && row.bodyWidget.previousRenderedWidget !== undefined && startRowIndex !== row.bodyWidget.page.index && footnoteWidgets[0].containerWidget.page.index !== row.bodyWidget.page.index) {
                    this.moveFootNotesToPage(footnoteWidgets, footnoteWidgets[0].containerWidget.page.bodyWidgets[0], row.bodyWidget);
                }
                else if (!this.isInitialLoad && !ej2_base_1.isNullOrUndefined(row.bodyWidget.page.footnoteWidget)) {
                    this.layoutfootNote(row.bodyWidget.page.footnoteWidget);
                }
                footnotes.length = 0;
            }
            tableWidget.height = tableWidget.height + row.height;
            if (this.viewer instanceof viewer_1.PageLayoutViewer) {
                if (!ej2_base_1.isNullOrUndefined(tableWidget.containerWidget)
                    && tableWidget.containerWidget.childWidgets.indexOf(tableWidget) >= 0 &&
                    !(tableWidget.containerWidget instanceof page_1.HeaderFooterWidget)) {
                    tableWidget.containerWidget.height += row.height;
                }
            }
            this.updateHeightForRowWidget(viewer, false, tableCollection, rowCollection, row, false, endRowWidget, isInitialLayout);
            viewer.cutFromTop(row.y + row.height);
            this.viewer.clientActiveArea.height -= this.getFootNoteHeight(footnoteWidgets);
            this.existFootnoteHeight = 0;
        };
        Layout.prototype.layoutFootnoteInSplittedRow = function (row, footnoteWidgets) {
            if (footnoteWidgets && footnoteWidgets.length > 0) {
                if (ej2_base_1.isNullOrUndefined(row.ownerTable.bodyWidget.page.footnoteWidget)) {
                    this.addEmptyFootNoteToBody(row.ownerTable.bodyWidget);
                }
                var footnoteWidget = row.ownerTable.bodyWidget.page.footnoteWidget;
                if (footnoteWidget) {
                    for (var j = 0; j < footnoteWidgets.length; j++) {
                        footnoteWidget.bodyWidgets.push(footnoteWidgets[j]);
                        footnoteWidgets[j].containerWidget = footnoteWidget;
                    }
                    this.layoutfootNote(footnoteWidget);
                }
            }
        };
        Layout.prototype.getFootNoteHeight = function (footnoteWidgets) {
            var height = 0;
            if (Array.isArray(footnoteWidgets)) {
                for (var i = 0; i < footnoteWidgets.length; i++) {
                    height += this.getFootnoteHeightInternal(footnoteWidgets[i]);
                }
            }
            else {
                height = this.getFootnoteHeightInternal(footnoteWidgets);
            }
            return height;
        };
        Layout.prototype.getFootnoteHeightInternal = function (footnoteWidgets) {
            var height = 0;
            for (var i = 0; i < footnoteWidgets.childWidgets.length; i++) {
                height += footnoteWidgets.childWidgets[i].height;
                if (footnoteWidgets.indexInOwner === 0 && i === 0) {
                    height += footnoteWidgets.containerWidget.margin.top;
                }
            }
            return height;
        };
        Layout.prototype.updateRowHeightBySpannedCell = function (tableWidget, row, insertIndex) {
            var rowSpan = 1;
            if (tableWidget.childWidgets.length === 0 || insertIndex === 0) {
                this.updateRowHeight(row, row);
                return;
            }
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cellWidget = row.childWidgets[i];
                rowSpan = (ej2_base_1.isNullOrUndefined(cellWidget) || ej2_base_1.isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan : cellWidget.cellFormat.rowSpan;
                this.updateSpannedRowCollection(rowSpan, row, cellWidget);
            }
            if (!ej2_base_1.isNullOrUndefined(row.ownerTable)) {
                for (var i = 0; i < row.ownerTable.spannedRowCollection.length; i++) {
                    if (row.ownerTable.spannedRowCollection.keys[i] === row.index) {
                        for (var j = 0; j < insertIndex; j++) {
                            var prevRowWidget = tableWidget.childWidgets[j];
                            this.updateRowHeight(prevRowWidget, row);
                        }
                        row.ownerTable.spannedRowCollection.remove(row.ownerTable.spannedRowCollection.keys[i]);
                        break;
                    }
                }
            }
        };
        Layout.prototype.updateRowHeight = function (prevRowWidget, row) {
            var rowIndex = row.index;
            var rowSpan = 1;
            for (var i = 0; i < prevRowWidget.childWidgets.length; i++) {
                var cellWidget = prevRowWidget.childWidgets[i];
                rowSpan = (ej2_base_1.isNullOrUndefined(cellWidget) || ej2_base_1.isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan : cellWidget.cellFormat.rowSpan;
                this.updateSpannedRowCollection(rowSpan, row, cellWidget);
                if (rowIndex - cellWidget.rowIndex === rowSpan - 1) {
                    var mergedCellHeight = cellWidget.y + cellWidget.height + cellWidget.margin.bottom - row.y;
                    if ((row.rowFormat.heightType !== 'Exactly' || (row.rowFormat.heightType === 'Exactly' && row.rowFormat.height > mergedCellHeight)) && row.height < mergedCellHeight) {
                        row.height = mergedCellHeight;
                    }
                }
            }
        };
        Layout.prototype.updateSpannedRowCollection = function (rowSpan, row, cellWidget) {
            if (rowSpan > 1 && !ej2_base_1.isNullOrUndefined(row.ownerTable)) {
                if (!row.ownerTable.spannedRowCollection.containsKey(row.index + rowSpan - 1)) {
                    row.ownerTable.spannedRowCollection.add(row.index + rowSpan - 1, row.index);
                }
            }
        };
        Layout.prototype.updateRowHeightByCellSpacing = function (tableCollection, row, viewer) {
            if (row.ownerTable.tableFormat.cellSpacing > 0) {
                if (tableCollection.length > 1 && row.y === viewer.clientArea.y && viewer instanceof viewer_1.PageLayoutViewer) {
                    row.height = row.height - editor_helper_1.HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.cellSpacing) / 2;
                }
            }
        };
        Layout.prototype.isRowSpanEnd = function (row, viewer) {
            var rowIndex = row.index;
            var rowSpan = 1;
            for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
                var splittedCell = this.documentHelper.splittedCellWidgets[i];
                rowSpan = (ej2_base_1.isNullOrUndefined(splittedCell) || ej2_base_1.isNullOrUndefined(splittedCell.cellFormat)) ? rowSpan : splittedCell.cellFormat.rowSpan;
                if (rowIndex - splittedCell.rowIndex === rowSpan - 1) {
                    return true;
                }
            }
            return false;
        };
        Layout.prototype.isVerticalMergedCellContinue = function (row) {
            var colIndex = 0;
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                if (colIndex < cell.columnIndex) {
                    return true;
                }
                colIndex += cell.cellFormat.columnSpan;
            }
            return colIndex < row.ownerTable.tableHolder.columns.length;
        };
        Layout.prototype.splitWidgets = function (tableRowWidget, viewer, tableCollection, rowCollection, splittedWidget, isLastRow, footNoteCollection, lineIndexInCell, cellIndex, isMultiColumnSplit, isRowSpan) {
            if (!(isMultiColumnSplit && lineIndexInCell === 0) && (this.isFirstLineFitForRow(viewer.clientArea.bottom, tableRowWidget) && tableRowWidget.childWidgets.length > 0)) {
                splittedWidget = this.getSplittedWidgetForRow(viewer.clientArea.bottom, tableCollection, rowCollection, tableRowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, undefined, isRowSpan);
                if (this.documentHelper.splittedCellWidgets.length > 0 || splittedWidget !== tableRowWidget) {
                    if (isLastRow) {
                        for (var i = 0; i < splittedWidget.childWidgets.length; i++) {
                            var cell = splittedWidget.childWidgets[i];
                            if (cell.rowIndex !== splittedWidget.index) {
                                splittedWidget.childWidgets.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    this.insertSplittedCellWidgets(viewer, tableCollection, splittedWidget, tableRowWidget.index - 1);
                }
            }
            else {
                this.insertSplittedCellWidgets(viewer, tableCollection, splittedWidget, tableRowWidget.index - 1);
            }
            return splittedWidget;
        };
        Layout.prototype.getSplittedWidgetForRow = function (bottom, tableCollection, rowCollection, tableRowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count, isRowSpan) {
            var splittedWidget = undefined;
            var rowIndex = tableRowWidget.index;
            this.isRelayoutneed = false;
            var issplit = false;
            var cellHeight = tableRowWidget.height;
            var previousHeight = cellHeight;
            var maximumCellWidgetHeight = 0;
            for (var i = 0; i < tableRowWidget.childWidgets.length; i++) {
                var cellWidget = tableRowWidget.childWidgets[i];
                var splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count);
                if (isMultiColumnSplit && !ej2_base_1.isNullOrUndefined(splittedCell) && splittedCell.childWidgets.length !== 0 && cellHeight > cellWidget.height) {
                    cellHeight = cellWidget.height;
                }
                footNoteCollection = [];
                if (ej2_base_1.isNullOrUndefined(splittedCell) && cellWidget === tableRowWidget.childWidgets[tableRowWidget.childWidgets.length - 1] && this.isVerticalMergedCellContinue(tableRowWidget) && this.isRowSpanEnd(tableRowWidget, this.viewer) && this.documentHelper.splittedCellWidgets.length > 0 && isRowSpan) {
                    splittedWidget = this.getSplittedWidgetForSpannedRow(bottom, tableRowWidget, tableCollection, rowCollection, footNoteCollection);
                    splittedCell = undefined;
                }
                if (!ej2_base_1.isNullOrUndefined(splittedCell)) {
                    if (splittedCell === cellWidget) {
                        return tableRowWidget;
                    }
                    if (cellWidget.height > maximumCellWidgetHeight) {
                        maximumCellWidgetHeight = cellWidget.height;
                    }
                    if (tableRowWidget.childWidgets.indexOf(splittedCell) !== -1) {
                        tableRowWidget.childWidgets.splice(tableRowWidget.childWidgets.indexOf(splittedCell), 1);
                    }
                    tableRowWidget.height -= splittedCell.height;
                    if (i === 0 || tableRowWidget.height < maximumCellWidgetHeight + cellWidget.margin.top + cellWidget.margin.bottom) {
                        tableRowWidget.height = maximumCellWidgetHeight + cellWidget.margin.top + cellWidget.margin.bottom;
                    }
                    if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                        splittedWidget = new page_1.TableRowWidget();
                        splittedWidget.containerWidget = tableRowWidget.containerWidget;
                        splittedWidget.index = tableRowWidget.index;
                        splittedWidget.rowFormat = tableRowWidget.rowFormat;
                        splittedWidget.isRenderBookmarkEnd = tableRowWidget.isRenderBookmarkEnd;
                        this.updateWidgetLocation(tableRowWidget, splittedWidget);
                        rowCollection.push(splittedWidget);
                    }
                    var rowSpan = 1;
                    rowSpan = (ej2_base_1.isNullOrUndefined(splittedCell) || ej2_base_1.isNullOrUndefined(splittedCell.cellFormat)) ? rowSpan : splittedCell.cellFormat.rowSpan;
                    if (rowIndex - splittedCell.rowIndex === rowSpan - 1
                        && splittedWidget.height < splittedCell.height + splittedCell.margin.top + splittedCell.margin.bottom) {
                        splittedWidget.height = splittedCell.height + splittedCell.margin.top + splittedCell.margin.bottom;
                    }
                    else {
                        if (tableRowWidget.rowFormat.heightType === 'Exactly' || (tableRowWidget.rowFormat.heightType === 'AtLeast' &&
                            splittedWidget.height < tableRowWidget.rowFormat.height)) {
                            splittedWidget.height = tableRowWidget.rowFormat.height;
                        }
                    }
                    splittedWidget.childWidgets.push(splittedCell);
                    splittedCell.containerWidget = splittedWidget;
                    this.isRelayoutneed = true;
                    var count_1 = i;
                    while (count_1 > 0 && !issplit) {
                        var cellWidget_1 = tableRowWidget.childWidgets[count_1 - 1];
                        splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget_1, footNoteCollection);
                        splittedWidget.childWidgets.splice(0, 0, splittedCell);
                        splittedCell.containerWidget = splittedWidget;
                        count_1--;
                    }
                    issplit = true;
                }
            }
            if (isMultiColumnSplit && cellHeight !== previousHeight) {
                for (var i = 0; i < tableRowWidget.childWidgets.length; i++) {
                    tableRowWidget.childWidgets[i].height = cellHeight;
                }
                tableRowWidget.height = cellHeight;
            }
            return splittedWidget;
        };
        Layout.prototype.getSplittedWidgetForSpannedRow = function (bottom, tableRowWidget, tableCollection, rowCollection, footNoteCollection) {
            var splittedWidget = undefined;
            var splittedCell = undefined;
            var issplit = false;
            for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
                splittedCell = this.documentHelper.splittedCellWidgets[i];
                if (tableRowWidget.childWidgets.length < splittedCell.index) {
                    break;
                }
                if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                    splittedWidget = new page_1.TableRowWidget();
                    splittedWidget.containerWidget = tableRowWidget.containerWidget;
                    splittedWidget.index = tableRowWidget.index;
                    splittedWidget.rowFormat = tableRowWidget.rowFormat;
                    splittedWidget.isRenderBookmarkEnd = tableRowWidget.isRenderBookmarkEnd;
                    this.updateWidgetLocation(tableRowWidget, splittedWidget);
                    rowCollection.push(splittedWidget);
                }
                splittedWidget.childWidgets.push(splittedCell);
                splittedCell.containerWidget = splittedWidget;
                this.isRelayoutneed = true;
                var count = this.documentHelper.splittedCellWidgets[i].index;
                while (count > 0 && !issplit) {
                    var cellWidget = tableRowWidget.childWidgets[count - 1];
                    splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget, footNoteCollection);
                    splittedWidget.childWidgets.splice(0, 0, splittedCell);
                    splittedCell.containerWidget = splittedWidget;
                    count--;
                }
                issplit = true;
            }
            return splittedWidget;
        };
        Layout.prototype.getFootNoteHeightInLine = function (line) {
            var height = 0;
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof page_1.FootnoteElementBox) {
                    height += this.getFootNoteHeight(element.bodyWidget);
                }
            }
            return height;
        };
        Layout.prototype.getFootnoteFromLine = function (line, footNoteCollection) {
            for (var i = 0; i < line.children.length; i++) {
                if (line.children[i] instanceof page_1.FootnoteElementBox) {
                    footNoteCollection.push(line.children[i]);
                }
            }
        };
        Layout.prototype.updateWidgetsToTable = function (tableWidgets, rowWidgets, row, rearrangeRow, lineIndexInCell, cellIndex, isMultiColumnSplit) {
            var startRowIndex = row.bodyWidget.page.index;
            var rowHeight = this.getRowHeight(row, [row]);
            var viewer = this.viewer;
            var isHeader = row.rowFormat.isHeader;
            var headerRow = undefined;
            var isAllowBreakAcrossPages = row.rowFormat.allowBreakAcrossPages;
            var heightType = row.rowFormat.heightType;
            var cellSpacing = 0;
            var count = 0;
            var tableRowWidget = row;
            var moveRowToNextTable = false;
            var footnoteElements = this.layoutedFootnoteElement;
            var isRepeatRowHeader = false;
            if (tableRowWidget.bodyWidget.page.footnoteWidget !== undefined) {
                this.footHeight = tableRowWidget.bodyWidget.page.footnoteWidget.height;
                if (this.footnoteHeight === 0) {
                    this.footnoteHeight = this.footHeight;
                }
            }
            else {
                this.footHeight = 0;
            }
            if (row.ownerTable.continueHeader && !isHeader) {
                row.ownerTable.continueHeader = false;
            }
            var isInitialLayout = row.ownerTable.isInsideTable;
            var isLastRow = false;
            cellSpacing = (!ej2_base_1.isNullOrUndefined(row.ownerTable) && !ej2_base_1.isNullOrUndefined(row.ownerTable.tableFormat)) ? editor_helper_1.HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.cellSpacing) : 0;
            while (count < rowWidgets.length) {
                count = rowWidgets.length;
                if (this.isRowSpanEnd(row, viewer) && row.rowFormat.heightType === 'Exactly' && this.documentHelper.splittedCellWidgets.length === 1) {
                    this.documentHelper.splittedCellWidgets = [];
                }
                if (!isMultiColumnSplit && (row.ownerTable.isInsideTable || (this.documentHelper.splittedCellWidgets.length === 0 && tableRowWidget.y + tableRowWidget.height + cellSpacing + this.footnoteHeight <= viewer.clientArea.bottom))) {
                    if (this.isVerticalMergedCellContinue(row) && (tableRowWidget.y === viewer.clientArea.y
                        || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight)) {
                        this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.index - 1);
                    }
                    this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements, undefined, isInitialLayout, startRowIndex, isRepeatRowHeader);
                    if (this.documentHelper.splittedCellWidgets.length > 0 && ej2_base_1.isNullOrUndefined(rowWidgets[rowWidgets.length - 1].nextRow)) {
                        count--;
                        isLastRow = true;
                    }
                    isInitialLayout = false;
                }
                else {
                    footnoteElements = [];
                    isInitialLayout = false;
                    if (this.documentHelper.splittedCellWidgets.length > 0 && tableRowWidget.y + tableRowWidget.height + this.footHeight <= viewer.clientArea.bottom) {
                        var isRowSpanEnd = this.isRowSpanEnd(row, viewer);
                        if (!isRowSpanEnd) {
                            if (this.isVerticalMergedCellContinue(row) && (tableRowWidget.y === viewer.clientArea.y
                                || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight)) {
                                this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.indexInOwner - 1);
                            }
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            continue;
                        }
                    }
                    var splittedWidget = tableRowWidget;
                    var tableWidget = tableWidgets[tableWidgets.length - 1];
                    if (isMultiColumnSplit || rowHeight + tableRowWidget.y + this.footHeight > viewer.clientArea.bottom) {
                        if (!isAllowBreakAcrossPages || (isHeader && row.ownerTable.continueHeader) || (heightType === 'AtLeast' && editor_helper_1.HelperMethods.convertPointToPixel(row.rowFormat.height) < viewer.clientArea.bottom)) {
                            if ((heightType === 'AtLeast' && editor_helper_1.HelperMethods.convertPointToPixel(row.rowFormat.height) < viewer.clientActiveArea.height && isAllowBreakAcrossPages) || (heightType !== 'Exactly' && tableRowWidget.y === viewer.clientArea.y) || (heightType === 'Auto' && isAllowBreakAcrossPages)) {
                                splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, lineIndexInCell, cellIndex, isMultiColumnSplit);
                                if (ej2_base_1.isNullOrUndefined(splittedWidget) && tableRowWidget.y === viewer.clientArea.y) {
                                    this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                }
                                else if (ej2_base_1.isNullOrUndefined(splittedWidget) && heightType === 'AtLeast' && tableRowWidget.containerWidget.lastChild !== tableRowWidget) {
                                    splittedWidget = tableRowWidget;
                                }
                            }
                            if (heightType === 'Exactly' && tableRowWidget.y === viewer.clientArea.y) {
                                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                count++;
                            }
                            if (isHeader && row.ownerTable.continueHeader) {
                                row.ownerTable.header = false;
                                row.ownerTable.headerHeight = 0;
                                var pages = undefined;
                                if (viewer instanceof viewer_1.PageLayoutViewer) {
                                    pages = this.documentHelper.pages;
                                }
                                if (!ej2_base_1.isNullOrUndefined(pages)) {
                                    for (var i = 0; i < pages.length; i++) {
                                        if (pages[i].repeatHeaderRowTableWidget && !ej2_base_1.isNullOrUndefined(pages[i].bodyWidgets[0].firstChild) && !(pages[i].bodyWidgets[0].firstChild instanceof page_1.TableWidget && pages[i].bodyWidgets[0].firstChild.header)) {
                                            pages[i].repeatHeaderRowTableWidget = false;
                                            row.ownerTable.continueHeader = false;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if ((heightType === 'Auto' || heightType === 'AtLeast') && isAllowBreakAcrossPages) {
                                if (!(editor_helper_1.HelperMethods.convertPointToPixel(row.rowFormat.height) > viewer.clientArea.bottom) || tableRowWidget.y === viewer.clientArea.y) {
                                    splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, lineIndexInCell, cellIndex, isMultiColumnSplit);
                                    if (ej2_base_1.isNullOrUndefined(splittedWidget) && tableRowWidget.y === viewer.clientArea.y) {
                                        this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                    }
                                }
                            }
                            else if (heightType === 'Exactly' && tableRowWidget.y === viewer.clientArea.y) {
                                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                count++;
                            }
                        }
                    }
                    else {
                        var isInsertSplittedWidgets = false;
                        var headerHeight = 0;
                        if (!ej2_base_1.isNullOrUndefined(tableRowWidget.ownerTable.headerHeight)) {
                            headerHeight = tableRowWidget.ownerTable.headerHeight;
                        }
                        if (this.isVerticalMergedCellContinue(row) && (isAllowBreakAcrossPages ||
                            (isInsertSplittedWidgets = (tableRowWidget.y === viewer.clientArea.y
                                || tableRowWidget.y === this.viewer.clientArea.y + headerHeight)))) {
                            if (isInsertSplittedWidgets) {
                                this.insertSplittedCellWidgets(viewer, tableWidgets, splittedWidget, tableRowWidget.indexInOwner - 1);
                            }
                            else {
                                splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, undefined, undefined, undefined, true);
                                if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                                    isInsertSplittedWidgets = (tableRowWidget.y === viewer.clientArea.y
                                        || tableRowWidget.y === this.viewer.clientArea.y + headerHeight);
                                    if (isInsertSplittedWidgets) {
                                        this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.indexInOwner - 1);
                                        count--;
                                        continue;
                                    }
                                    if (this.isRowSpanEnd(row, viewer)) {
                                        splittedWidget = tableRowWidget;
                                    }
                                }
                            }
                        }
                        else if (isLastRow && !isAllowBreakAcrossPages) {
                            splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements);
                        }
                        else if (this.isRowSpanEnd(row, viewer) && !isAllowBreakAcrossPages) {
                            if (heightType === 'AtLeast' && row.ownerTable.spannedRowCollection.keys.length > 0)
                                splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, lineIndexInCell, cellIndex, isMultiColumnSplit, true);
                            if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            }
                        }
                    }
                    if (!ej2_base_1.isNullOrUndefined(splittedWidget) && (ej2_base_1.isNullOrUndefined(this.documentHelper.owner.editor) || this.documentHelper.owner.editor && !this.documentHelper.owner.editor.isTableInsert) && !(splittedWidget.bodyWidget.containerWidget instanceof page_1.FootNoteWidget)) {
                        if (splittedWidget !== tableRowWidget) {
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements, tableRowWidget.nextRow, undefined, undefined, isRepeatRowHeader);
                            this.updateWidgetsToPage(tableWidgets, rowWidgets, row.ownerTable, rearrangeRow, tableRowWidget.nextRow);
                            var index_3 = tableWidgets.indexOf(tableRowWidget.containerWidget);
                            if (index_3 + 1 >= tableWidgets.length) {
                                this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                            }
                            tableRowWidget = splittedWidget;
                        }
                        else {
                            if (row.index > 0) {
                                this.updateWidgetsToPage(tableWidgets, rowWidgets, row.ownerTable, rearrangeRow, row);
                                if (row.previousRenderedWidget instanceof page_1.TableRowWidget) {
                                    var prevWidget = row.previousRenderedWidget;
                                    if (editor_helper_1.HelperMethods.round(tableRowWidget.y, 2) === editor_helper_1.HelperMethods.round(prevWidget.y + prevWidget.height, 2)) {
                                        var prevIndex = tableWidgets.indexOf(prevWidget.containerWidget);
                                        if (prevIndex + 1 >= tableWidgets.length) {
                                            this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                                        }
                                    }
                                    else {
                                        this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                                    }
                                }
                                else {
                                    this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                                }
                            }
                            else if (heightType === 'Exactly' && rowHeight + tableRowWidget.y + this.footHeight < viewer.clientArea.bottom && tableRowWidget.y >= viewer.clientArea.y) {
                                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                count++;
                                continue;
                            }
                            moveRowToNextTable = true;
                            count--;
                        }
                        tableWidget = tableWidgets[tableWidgets.length - 1];
                        var rowToMove = row;
                        var keepNext = false;
                        var index = row.ownerTable.containerWidget.index;
                        var isTableFirstRow = false;
                        var bodyWidget = void 0;
                        var block = void 0;
                        if (moveRowToNextTable && tableWidgets.length === 1) {
                            block = tableWidgets[tableWidgets.length - 1];
                        }
                        else {
                            block = tableWidgets[tableWidgets.length - 2];
                        }
                        var removeTable = true;
                        if (moveRowToNextTable && rowWidgets.length === 1) {
                            var prev = this.alignBlockElement(row);
                            if (!ej2_base_1.isNullOrUndefined(prev.node)) {
                                var previousRow = prev.node;
                                if (previousRow instanceof page_1.TableRowWidget
                                    && previousRow.indexInOwner === 0) {
                                    if (tableWidgets.length > 1 && tableWidgets[tableWidgets.length - 1].childWidgets.length === 0) {
                                        tableWidgets.pop();
                                        tableWidget = tableWidgets[tableWidgets.length - 1];
                                        tableWidget.height = 0;
                                    }
                                }
                                else if (prev.node instanceof page_1.ParagraphWidget) {
                                    var previousWidget = this.splitParagraph(prev.node, parseInt(prev.position.index, 10));
                                    block = previousWidget;
                                    if (tableWidgets.length > 1 && tableWidgets[tableWidgets.length - 1].childWidgets.length === 0) {
                                        tableWidgets.pop();
                                        tableWidget = tableWidgets[tableWidgets.length - 1];
                                    }
                                    removeTable = false;
                                }
                                if (previousRow instanceof page_1.TableRowWidget) {
                                    isTableFirstRow = previousRow.indexInOwner === 0;
                                    rowToMove = previousRow;
                                    if (!rowToMove.ownerTable.equals(row.ownerTable)) {
                                        block = rowToMove.ownerTable;
                                        removeTable = false;
                                    }
                                }
                                keepNext = true;
                            }
                        }
                        bodyWidget = this.moveBlocksToNextPage(block instanceof page_1.ParagraphWidget ? block.previousWidget :
                            (keepNext && isTableFirstRow) ? !ej2_base_1.isNullOrUndefined(block.previousWidget) ? block.previousWidget : block : block, keepNext);
                        var curretTable = tableWidgets[tableWidgets.length - 1];
                        if (moveRowToNextTable && removeTable) {
                            if (rowToMove.index === 0 && curretTable.containerWidget && curretTable.containerWidget.childWidgets.indexOf(curretTable) !== -1) {
                                curretTable.containerWidget.childWidgets.splice(curretTable.containerWidget.childWidgets.indexOf(curretTable), 1);
                            }
                        }
                        if (removeTable) {
                            if (bodyWidget.childWidgets.indexOf(curretTable) !== -1) {
                                bodyWidget.childWidgets.splice(bodyWidget.childWidgets.indexOf(curretTable), 1);
                            }
                            bodyWidget.childWidgets.unshift(curretTable);
                            this.shiftFloatingItemsFromTable(curretTable, bodyWidget);
                        }
                        curretTable.containerWidget = bodyWidget;
                        if (moveRowToNextTable && rowToMove.index > 0 || rowWidgets.length > 1) {
                            var currentRow = !moveRowToNextTable ? rowWidgets[rowWidgets.length - 2] : rowWidgets[rowWidgets.length - 1];
                            if (keepNext) {
                                currentRow = rowToMove;
                            }
                            this.moveNextWidgetsToTable(tableWidgets, currentRow, !moveRowToNextTable);
                            rowToMove = row;
                        }
                        if (keepNext) {
                            this.updateClientPositionForBlock(removeTable ? curretTable : block, row);
                        }
                        moveRowToNextTable = false;
                        var insertHeaderRow = false;
                        var bottom = this.documentHelper.viewer.clientArea.bottom - tableRowWidget.bottomBorderWidth - cellSpacing;
                        if (rowToMove.ownerTable.header) {
                            splittedWidget.x = splittedWidget.x;
                            splittedWidget.y = this.viewer.clientArea.y + tableWidget.headerHeight;
                            this.updateChildLocationForRow(splittedWidget.y, splittedWidget);
                            insertHeaderRow = this.isFirstLineFitForRow(bottom, splittedWidget);
                        }
                        if (insertHeaderRow && rowToMove.ownerTable.header && !keepNext) {
                            if (viewer instanceof viewer_1.PageLayoutViewer) {
                                tableRowWidget.bodyWidget.page.repeatHeaderRowTableWidget = true;
                                isRepeatRowHeader = true;
                            }
                            viewer.updateClientAreaForBlock(rowToMove.ownerTable, true, tableWidgets);
                            splittedWidget.x = splittedWidget.x;
                            splittedWidget.y = tableWidget.y + rowToMove.ownerTable.headerHeight;
                            var cellspace = cellSpacing / 2;
                            this.updateChildLocationForRow(tableWidget.y + rowToMove.ownerTable.headerHeight - cellspace, splittedWidget, tableWidget.containerWidget);
                        }
                        else {
                            viewer.updateClientAreaForBlock(rowToMove.ownerTable, true, tableWidgets);
                            if (splittedWidget.bodyWidget.sectionFormat.columns.length > 1) {
                                var clientArea = new page_1.Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
                                var clientActiveArea = new page_1.Rect(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.y, this.viewer.clientActiveArea.width, this.viewer.clientActiveArea.height);
                                splittedWidget.x = this.viewer.clientActiveArea.x;
                                splittedWidget.y = this.viewer.clientActiveArea.y;
                                var topMargin = this.getMaxTopCellMargin(splittedWidget);
                                var bottomMargin = this.getMaxBottomCellMargin(splittedWidget);
                                for (var i = 0; i < splittedWidget.childWidgets.length; i++) {
                                    var cell = splittedWidget.childWidgets[i];
                                    cell.height = 0;
                                    this.addTableCellWidget(cell, this.viewer.clientActiveArea, topMargin + splittedWidget.topBorderWidth, bottomMargin + splittedWidget.bottomBorderWidth);
                                    this.viewer.updateClientAreaForCell(cell, true);
                                    for (var j = 0; j < cell.childWidgets.length; j++) {
                                        var block_2 = cell.childWidgets[j];
                                        viewer.updateClientAreaForBlock(block_2, true);
                                        block_2.containerWidget = cell;
                                        this.layoutBlock(block_2, 0);
                                        viewer.updateClientAreaForBlock(block_2, false);
                                    }
                                    this.viewer.updateClientAreaForCell(cell, false);
                                }
                                this.viewer.clientActiveArea = clientActiveArea;
                                this.viewer.clientArea = clientArea;
                            }
                            splittedWidget.x = splittedWidget.x;
                            splittedWidget.y = tableWidget.y;
                            var cellspace = cellSpacing / 2;
                            this.updateChildLocationForRow(tableWidget.y - cellspace, splittedWidget, tableWidget.containerWidget, true);
                        }
                        if (removeTable && this.shiftedFloatingItemsFromTable.length > 0) {
                            for (var i = 0; i < this.shiftedFloatingItemsFromTable.length; i++) {
                                var floatingItem = this.shiftedFloatingItemsFromTable[i];
                                var position = this.getFloatingItemPoints(floatingItem);
                                floatingItem.y = position.y;
                                floatingItem.x = position.x;
                                if (floatingItem instanceof page_1.ShapeElementBox) {
                                    this.updateChildLocationForCellOrShape(floatingItem.y, floatingItem);
                                }
                            }
                            this.shiftedFloatingItemsFromTable = [];
                        }
                    }
                    isLastRow = false;
                }
                if (isHeader) {
                    if (row.ownerTable.continueHeader) {
                        row.ownerTable.header = true;
                        row.ownerTable.headerHeight = rowHeight + row.ownerTable.headerHeight;
                    }
                    headerRow = this.getHeader(row.ownerTable);
                    if (!ej2_base_1.isNullOrUndefined(headerRow) && row.index === headerRow.index) {
                        var headerHeight = this.getHeaderHeight(row.ownerTable, row, rowWidgets);
                        if (headerHeight > row.ownerTable.headerHeight || headerHeight > row.ownerTable.headerHeight) {
                            row.ownerTable.headerHeight = headerHeight;
                        }
                        if (row.ownerTable.headerHeight > viewer.clientArea.height) {
                            row.ownerTable.header = false;
                            row.ownerTable.continueHeader = false;
                            row.ownerTable.headerHeight = 0;
                            var pages = this.documentHelper.pages;
                            for (var i = 0; i < pages.length; i++) {
                                if (pages[i].repeatHeaderRowTableWidget) {
                                    pages[i].repeatHeaderRowTableWidget = false;
                                }
                            }
                        }
                    }
                }
                isMultiColumnSplit = false;
                if (tableWidgets.length > 2 && row.ownerTable.header && tableRowWidget.height < viewer.clientActiveArea.bottom &&
                    !viewer.documentHelper.currentRenderingPage.repeatHeaderRowTableWidget) {
                    viewer.documentHelper.currentRenderingPage.repeatHeaderRowTableWidget = true;
                }
            }
        };
        Layout.prototype.getHeader = function (table) {
            var header = undefined;
            var flag = true;
            table = table.getSplitWidgets()[0];
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                if (row.rowFormat.isHeader) {
                    header = row;
                }
                else {
                    flag = false;
                }
                if (!flag) {
                    break;
                }
            }
            return header;
        };
        Layout.prototype.getHeaderHeight = function (ownerTable, row, rowCollection) {
            var height = 0;
            if (row.ownerTable.childWidgets.length > 0 && ownerTable.childWidgets[0].rowFormat.isHeader) {
                for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                    var row_5 = ownerTable.childWidgets[i];
                    if (row_5.rowFormat.isHeader) {
                        height = height + row_5.height;
                    }
                    else {
                        break;
                    }
                }
            }
            return height;
        };
        Layout.prototype.updateWidgetToRow = function (cell) {
            var rowWidget = cell.ownerRow;
            cell.containerWidget = rowWidget;
            if (!ej2_base_1.isNullOrUndefined(cell.ownerRow) && cell.ownerRow.rowFormat.heightType !== 'Exactly' && editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.height) > 0 && cell.cellIndex === 0) {
                rowWidget.height = rowWidget.height + editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.height);
            }
            if (cell.cellFormat.rowSpan === 1) {
                var cellHeight = void 0;
                if (rowWidget.rowFormat.heightType === 'Exactly') {
                    cellHeight = cell.height + cell.margin.bottom;
                }
                else {
                    cellHeight = cell.height + cell.margin.top + cell.margin.bottom;
                }
                if (rowWidget.height - editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing) < cellHeight) {
                    rowWidget.height = cellHeight + editor_helper_1.HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing);
                }
            }
        };
        Layout.prototype.updateHeightForRowWidget = function (viewer, isUpdateVerticalPosition, tableCollection, rowCollection, rowWidget, isLayouted, endRowWidget, isInitialLayout) {
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                var cellspacing = 0;
                var cellWidget = undefined;
                var childWidget = rowWidget.childWidgets[i];
                cellWidget = childWidget;
                var rowSpan = 1;
                rowSpan = cellWidget.cellFormat.rowSpan;
                cellspacing = editor_helper_1.HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableFormat.cellSpacing);
                if (rowSpan > 1) {
                    var currentRowWidgetIndex = rowWidget.containerWidget.childWidgets.indexOf(rowWidget);
                    var rowSpanWidgetEndIndex = currentRowWidgetIndex + rowSpan - 1 - (rowWidget.index - cellWidget.rowIndex);
                    if (!isInitialLayout && (viewer.clientArea.bottom < cellWidget.y + cellWidget.height + cellWidget.margin.bottom
                        || rowSpanWidgetEndIndex >= currentRowWidgetIndex + 1) && (rowCollection.length === 1
                        || rowCollection.length >= 1 && rowWidget === rowCollection[rowCollection.length - 1])) {
                        this.splitSpannedCellWidget(cellWidget, tableCollection, rowCollection, viewer);
                    }
                    var spanEndRowWidget = rowWidget;
                    if (rowSpanWidgetEndIndex > 0) {
                        if (rowSpanWidgetEndIndex < rowWidget.containerWidget.childWidgets.length) {
                            var childWidget_1 = rowWidget.containerWidget.childWidgets[rowSpanWidgetEndIndex];
                            if (childWidget_1 instanceof page_1.TableRowWidget) {
                                spanEndRowWidget = childWidget_1;
                                if (spanEndRowWidget === endRowWidget) {
                                    spanEndRowWidget = rowWidget;
                                }
                            }
                        }
                        else {
                            spanEndRowWidget = rowWidget.containerWidget.childWidgets[rowWidget.containerWidget.childWidgets.length - 1];
                        }
                    }
                    if (cellWidget.y + cellWidget.height + cellWidget.margin.bottom < spanEndRowWidget.y + spanEndRowWidget.height) {
                        cellWidget.height = spanEndRowWidget.y + spanEndRowWidget.height - cellWidget.y - cellWidget.margin.bottom;
                    }
                    else if (isLayouted && spanEndRowWidget && (spanEndRowWidget.y !== 0 && spanEndRowWidget.height !== 0) && cellWidget.y + cellWidget.height + cellWidget.margin.bottom > spanEndRowWidget.y + spanEndRowWidget.height) {
                        if (spanEndRowWidget.rowFormat.heightType !== 'Exactly' || (spanEndRowWidget.rowFormat.heightType === 'Exactly' && spanEndRowWidget.rowFormat.height > cellWidget.y + cellWidget.height + cellWidget.margin.bottom - spanEndRowWidget.y)) {
                            spanEndRowWidget.height = cellWidget.y + cellWidget.height + cellWidget.margin.bottom - spanEndRowWidget.y;
                        }
                        else {
                            cellWidget.height = (spanEndRowWidget.y - cellWidget.y) + spanEndRowWidget.height;
                        }
                    }
                }
                else {
                    if (cellspacing > 0) {
                        if (tableCollection.length > 1 && rowWidget.y === viewer.clientArea.y && viewer instanceof viewer_1.PageLayoutViewer) {
                            cellspacing = cellspacing / 2;
                        }
                    }
                    cellWidget.height = rowWidget.height - cellWidget.margin.top - cellWidget.margin.bottom - cellspacing;
                }
                this.updateHeightForCellWidget(viewer, tableCollection, rowCollection, cellWidget);
                var widget = rowWidget.containerWidget;
                while (widget.containerWidget instanceof page_1.Widget) {
                    widget = widget.containerWidget;
                }
                var page = undefined;
                if (widget instanceof page_1.BodyWidget) {
                    page = widget.page;
                }
                if ((viewer instanceof viewer_1.PageLayoutViewer && viewer.visiblePages.indexOf(page) !== -1) || isUpdateVerticalPosition) {
                    this.updateCellVerticalPosition(cellWidget, false, cellWidget.ownerTable.isInsideTable);
                }
            }
        };
        Layout.prototype.updateHeightForCellWidget = function (viewer, tableWidget, rowCollection, cellWidget) {
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                if (cellWidget.childWidgets[i] instanceof page_1.TableWidget) {
                    this.updateHeightForTableWidget(tableWidget, rowCollection, cellWidget.childWidgets[i]);
                }
            }
        };
        Layout.prototype.getRowHeight = function (row, rowCollection) {
            var height = 0;
            if (row.rowFormat.heightType === 'Exactly') {
                height = row.rowFormat.height;
            }
            else {
                for (var i = 0; i < rowCollection.length; i++) {
                    if (rowCollection[i] instanceof page_1.TableRowWidget) {
                        height = rowCollection[i].height + height;
                    }
                }
                height = Math.max(height, row.rowFormat.height);
            }
            return height;
        };
        Layout.prototype.splitSpannedCellWidget = function (cellWidget, tableCollection, rowCollection, viewer) {
            var splittedCell = this.getSplittedWidget(viewer.clientArea.bottom, false, tableCollection, rowCollection, cellWidget, undefined, undefined, undefined, undefined, true);
            if (!ej2_base_1.isNullOrUndefined(splittedCell)) {
                this.documentHelper.splittedCellWidgets.push(splittedCell);
                splittedCell.isSplittedCell = true;
            }
        };
        Layout.prototype.insertSplittedCellWidgets = function (viewer, tableCollection, rowWidget, previousRowIndex) {
            if (!ej2_base_1.isNullOrUndefined(rowWidget)) {
                var left = rowWidget.x;
                var tableWidth = 0;
                var cellIndex = 0;
                var cellspace = 0;
                var linestyle = false;
                tableWidth = editor_helper_1.HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableHolder.tableWidth);
                for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                    var cellWidget = rowWidget.childWidgets[i];
                    var isRightStyleNone = (cellWidget.cellFormat.borders.right.lineStyle === 'None');
                    cellspace = !ej2_base_1.isNullOrUndefined(cellWidget.ownerTable) && !ej2_base_1.isNullOrUndefined(cellWidget.ownerTable.tableFormat) ? editor_helper_1.HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableFormat.cellSpacing) : 0;
                    if (Math.round(left) < Math.round(cellWidget.x - cellWidget.margin.left)) {
                        if (this.insertRowSpannedWidget(rowWidget, viewer, left, i)) {
                            i--;
                            continue;
                        }
                        var length_1 = rowWidget.childWidgets.length;
                        this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, i, previousRowIndex);
                        if (length_1 < rowWidget.childWidgets.length) {
                            if (i === cellIndex) {
                                break;
                            }
                            i--;
                            continue;
                        }
                    }
                    left += cellWidget.margin.left + cellWidget.width + cellWidget.margin.right;
                    if (cellspace > 0 || cellWidget.columnIndex === cellWidget.ownerTable.tableHolder.columns.length - 1 ||
                        cellWidget.index === cellWidget.containerWidget.childWidgets.length - 1) {
                        if (!cellWidget.ownerTable.tableFormat.allowAutoFit) {
                            left += cellWidget.rightBorderWidth;
                        }
                        if (!this.isInsertTable()) {
                            linestyle = this.checkPreviousMargins(cellWidget.ownerTable);
                        }
                    }
                    left -= (isRightStyleNone && !linestyle) ? 0 : (cellWidget.rightBorderWidth);
                    cellIndex++;
                    if (i === rowWidget.childWidgets.length - 1 && Math.round(left) < Math.round(rowWidget.x + tableWidth)) {
                        if (this.insertRowSpannedWidget(rowWidget, viewer, left, i + 1)) {
                            continue;
                        }
                        this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, i + 1, previousRowIndex);
                        continue;
                    }
                }
                if ((ej2_base_1.isNullOrUndefined(rowWidget.childWidgets) || rowWidget.childWidgets.length === 0) && this.documentHelper.splittedCellWidgets.length > 0) {
                    for (var j = 0; j < this.documentHelper.splittedCellWidgets.length; j++) {
                        var widget = this.documentHelper.splittedCellWidgets[j];
                        if (Math.round(left) <= Math.round(widget.x - widget.margin.left)) {
                            if (this.insertRowSpannedWidget(rowWidget, viewer, left, j)) {
                                j--;
                                continue;
                            }
                            var count = rowWidget.childWidgets.length;
                            this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, j, previousRowIndex);
                            if (count < rowWidget.childWidgets.length) {
                                j--;
                                continue;
                            }
                        }
                        left += widget.margin.left + widget.width + widget.margin.right;
                        if (j === rowWidget.childWidgets.length - 1 && Math.round(left) <
                            Math.round(rowWidget.x + tableWidth)) {
                            if (this.insertRowSpannedWidget(rowWidget, viewer, left, j + 1)) {
                                continue;
                            }
                            this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, j + 1, previousRowIndex);
                            continue;
                        }
                    }
                }
                if (this.documentHelper.splittedCellWidgets.length > 0) {
                    this.documentHelper.splittedCellWidgets = [];
                }
            }
        };
        Layout.prototype.insertRowSpannedWidget = function (rowWidget, viewer, left, index) {
            var cellSpacing = 0;
            if (rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
                cellSpacing = editor_helper_1.HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
            }
            for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
                var splittedCell = this.documentHelper.splittedCellWidgets[i];
                if (Math.round(left) === Math.round(splittedCell.x - splittedCell.margin.left)) {
                    rowWidget.childWidgets.splice(index, 0, splittedCell);
                    splittedCell.containerWidget = rowWidget;
                    if (splittedCell.height > rowWidget.height) {
                        rowWidget.height = splittedCell.height;
                    }
                    if (splittedCell.y !== rowWidget.y + splittedCell.margin.top + cellSpacing) {
                        this.updateChildLocationForRow(rowWidget.y, rowWidget);
                    }
                    this.documentHelper.splittedCellWidgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        Layout.prototype.insertEmptySplittedCellWidget = function (currentRow, tableCollection, left, index, previousRowIndex) {
            var tableWidget = tableCollection[tableCollection.length - 1];
            var previousRow;
            for (var j = tableCollection.length - 1; j >= 0; j--) {
                var table = tableCollection[j];
                for (var z = table.childWidgets.length - 1; z >= 0; z--) {
                    var row = table.childWidgets[z];
                    if (row.index === previousRowIndex) {
                        previousRow = row;
                        break;
                    }
                }
            }
            if (previousRow) {
                tableWidget = previousRow.ownerTable;
                previousRowIndex = previousRow.indexInOwner;
            }
            for (var i = previousRowIndex; i >= 0; i--) {
                var rowWidget = tableWidget.childWidgets[i];
                var previousLeft = rowWidget.x;
                for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                    var rowSpan = 1;
                    var cellWidget = rowWidget.childWidgets[j];
                    if (Math.round(left) === Math.round(previousLeft)) {
                        rowSpan = (ej2_base_1.isNullOrUndefined(cellWidget) || ej2_base_1.isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan :
                            cellWidget.cellFormat.rowSpan;
                        if (rowSpan > 1) {
                            var emptyCellWidget = this.createCellWidget(cellWidget);
                            currentRow.childWidgets.splice(index, 0, emptyCellWidget);
                            emptyCellWidget.containerWidget = currentRow;
                            this.updateChildLocationForRow(currentRow.y, currentRow);
                            return;
                        }
                    }
                    previousLeft += cellWidget.margin.left + cellWidget.width + cellWidget.margin.right;
                }
            }
        };
        Layout.prototype.getSplittedWidget = function (bottom, splitMinimalWidget, tableCollection, rowCollection, cellWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, nestedCount, splitSpannedCellWidget) {
            var splittedWidget = undefined;
            var footnoteHeight = 0;
            if (isMultiColumnSplit || cellWidget.y + cellWidget.height > bottom - this.footHeight - cellWidget.margin.bottom) {
                for (var i = 0; i < cellWidget.ownerRow.childWidgets.length; i++) {
                    var tableCellWidget = cellWidget.ownerRow.childWidgets[i];
                    if (tableCellWidget.y + tableCellWidget.height < bottom - this.footHeight - tableCellWidget.margin.bottom) {
                        for (var j = 0; j < tableCellWidget.childWidgets.length; j++) {
                            if (tableCellWidget.childWidgets[j] instanceof page_1.ParagraphWidget) {
                                var paragraphWidget = tableCellWidget.childWidgets[j];
                                for (var k = 0; k < paragraphWidget.childWidgets.length; k++) {
                                    var lineWidget = paragraphWidget.childWidgets[k];
                                    var height = this.getFootNoteHeightInLine(lineWidget);
                                    this.existFootnoteHeight += height;
                                    footnoteHeight += height;
                                }
                            }
                        }
                    }
                }
                var count = 0;
                if (cellWidget.ownerTable.isInsideTable) {
                    count = nestedCount;
                }
                var isCellSplit = false;
                for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                    if (cellWidget.childWidgets[i] instanceof page_1.ParagraphWidget) {
                        var paragraphWidget = cellWidget.childWidgets[i];
                        var splittedPara = this.getSplittedWidgetForPara(bottom - cellWidget.margin.bottom, paragraphWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count, isCellSplit);
                        if (isMultiColumnSplit) {
                            count = count + paragraphWidget.childWidgets.length;
                        }
                        if (!ej2_base_1.isNullOrUndefined(splittedPara)) {
                            isCellSplit = true;
                            if (i === 0 && splittedPara === paragraphWidget && !splitSpannedCellWidget) {
                                if (splitMinimalWidget && this.isRelayoutneed) {
                                    splittedWidget = this.createCellWidget(cellWidget);
                                    return splittedWidget;
                                }
                                return cellWidget;
                            }
                            if (cellWidget.childWidgets.indexOf(splittedPara) !== -1) {
                                cellWidget.childWidgets.splice(cellWidget.childWidgets.indexOf(splittedPara), 1);
                                i--;
                            }
                            cellWidget.height -= splittedPara.height;
                            if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                                splittedWidget = this.createCellWidget(cellWidget);
                            }
                            splittedWidget.height += splittedPara.height;
                            splittedWidget.childWidgets.push(splittedPara);
                            splittedPara.containerWidget = splittedWidget;
                        }
                    }
                    else {
                        var tableWidget = cellWidget.childWidgets[i];
                        var tableCol = [tableWidget];
                        if (isMultiColumnSplit || bottom - cellWidget.margin.bottom < tableWidget.y + tableWidget.height) {
                            var tableHeight = tableWidget.height;
                            var splittedTable = this.getSplittedWidgetForTable(bottom - cellWidget.margin.bottom, tableCol, tableWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count);
                            if (ej2_base_1.isNullOrUndefined(splittedTable) &&
                                !(tableWidget.childWidgets[0].rowFormat.allowBreakAcrossPages)) {
                                splittedTable = tableWidget;
                            }
                            if (!ej2_base_1.isNullOrUndefined(splittedTable)) {
                                if (i === 0 && splittedTable === tableWidget) {
                                    return cellWidget;
                                }
                                if (cellWidget.childWidgets.indexOf(splittedTable) !== -1) {
                                    cellWidget.childWidgets.splice(cellWidget.childWidgets.indexOf(splittedTable), 1);
                                    i--;
                                    cellWidget.height -= splittedTable.height;
                                }
                                else {
                                    cellWidget.height -= tableHeight - tableWidget.height;
                                }
                                if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                                    splittedWidget = this.createCellWidget(cellWidget);
                                }
                                splittedWidget.height += splittedTable.height;
                                splittedWidget.childWidgets.push(splittedTable);
                                splittedTable.containerWidget = splittedWidget;
                            }
                        }
                    }
                }
            }
            this.existFootnoteHeight -= footnoteHeight;
            if (ej2_base_1.isNullOrUndefined(splittedWidget) && splitMinimalWidget && this.isRelayoutneed) {
                splittedWidget = this.createCellWidget(cellWidget);
            }
            return splittedWidget;
        };
        Layout.prototype.getListLevelPattern = function (value) {
            switch (value) {
                case 0:
                    return 'Arabic';
                case 1:
                    return 'LowLetter';
                case 2:
                    return 'LowRoman';
                case 3:
                    return 'UpLetter';
                case 4:
                    return 'UpRoman';
                case 5:
                    return 'Ordinal';
                case 6:
                    return 'Number';
                case 7:
                    return 'OrdinalText';
                case 8:
                    return 'LeadingZero';
                case 9:
                    return 'Bullet';
                case 10:
                    return 'FarEast';
                case 11:
                    return 'Special';
                default:
                    return 'None';
            }
        };
        Layout.prototype.createCellWidget = function (cell) {
            var cellWidget = new page_1.TableCellWidget();
            cellWidget.cellFormat = cell.cellFormat;
            cellWidget.index = cell.index;
            cellWidget.rowIndex = cell.rowIndex;
            cellWidget.columnIndex = cell.columnIndex;
            cellWidget.containerWidget = cell.containerWidget;
            this.updateWidgetLocation(cell, cellWidget);
            cellWidget.margin = cell.margin;
            cellWidget.leftBorderWidth = cell.leftBorderWidth;
            cellWidget.rightBorderWidth = cell.rightBorderWidth;
            return cellWidget;
        };
        Layout.prototype.createTableWidget = function (table) {
            var newTable = new page_1.TableWidget();
            if (table.header) {
                newTable.header = table.header;
                newTable.headerHeight = table.headerHeight;
            }
            newTable.index = table.index;
            newTable.tableFormat = table.tableFormat;
            newTable.tableHolder = table.tableHolder;
            newTable.footnoteElement = table.footnoteElement;
            newTable.isGridUpdated = table.isGridUpdated;
            newTable.wrapTextAround = table.wrapTextAround;
            newTable.positioning = table.positioning;
            newTable.isContainInsideTable = table.isContainInsideTable;
            newTable.isBidiTable = table.isBidiTable;
            return newTable;
        };
        Layout.prototype.getSplittedWidgetForPara = function (bottom, paragraphWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count, isCellSplit) {
            var lineBottom = paragraphWidget.y;
            var splittedWidget = undefined;
            var moveEntireBlock = false;
            for (var i = 0; i < paragraphWidget.childWidgets.length; i++) {
                var lineWidget = paragraphWidget.childWidgets[i];
                var height = this.getFootNoteHeightInLine(lineWidget);
                height += this.existFootnoteHeight;
                if (!ej2_base_1.isNullOrUndefined(footNoteCollection)) {
                    for (var j = 0; j < footNoteCollection.length; j++) {
                        height += this.getFootNoteHeight(footNoteCollection[j].bodyWidget);
                    }
                }
                var lineHeight = 0;
                if (lineWidget.children[0] instanceof page_1.ShapeBase) {
                    lineHeight = lineWidget.children[0].height;
                }
                else {
                    lineHeight = lineWidget.height;
                }
                if ((isMultiColumnSplit && count >= lineIndexInCell) || bottom < lineBottom + height + lineHeight || isCellSplit) {
                    if (paragraphWidget.paragraphFormat.keepLinesTogether && (paragraphWidget.index !== 0 ||
                        (paragraphWidget.index === 0 && !ej2_base_1.isNullOrUndefined(paragraphWidget.associatedCell.ownerRow.previousWidget)))) {
                        moveEntireBlock = true;
                        i = 0;
                        lineWidget = paragraphWidget.childWidgets[0];
                    }
                    else if (paragraphWidget.paragraphFormat.widowControl) {
                        if (i === 1) {
                            moveEntireBlock = true;
                            i = 0;
                            lineWidget = paragraphWidget.childWidgets[0];
                        }
                    }
                    if (i === 0) {
                        if (lineWidget.paragraph.containerWidget instanceof page_1.TableCellWidget && !moveEntireBlock && !isMultiColumnSplit) {
                            if (lineWidget.paragraph.containerWidget.y === paragraphWidget.y) {
                                lineBottom += lineWidget.height;
                                continue;
                            }
                        }
                        splittedWidget = paragraphWidget;
                        break;
                    }
                    if (paragraphWidget.childWidgets.indexOf(lineWidget) !== -1) {
                        paragraphWidget.childWidgets.splice(paragraphWidget.childWidgets.indexOf(lineWidget), 1);
                        i--;
                    }
                    paragraphWidget.height -= lineWidget.height;
                    if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                        splittedWidget = new page_1.ParagraphWidget();
                        splittedWidget.characterFormat = paragraphWidget.characterFormat;
                        splittedWidget.paragraphFormat = paragraphWidget.paragraphFormat;
                        splittedWidget.index = paragraphWidget.index;
                        this.updateWidgetLocation(paragraphWidget, splittedWidget);
                        splittedWidget.height = lineWidget.height;
                    }
                    else {
                        splittedWidget.height += lineWidget.height;
                    }
                    splittedWidget.childWidgets.push(lineWidget);
                    lineWidget.paragraph = splittedWidget;
                }
                this.getFootnoteFromLine(lineWidget, footNoteCollection);
                lineBottom += lineWidget.height;
                count++;
            }
            return splittedWidget;
        };
        Layout.prototype.getSplittedWidgetForTable = function (bottom, tableCollection, tableWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count) {
            var rowBottom = tableWidget.y;
            var splittedWidget = undefined;
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var rowWidget = undefined;
                var childWidget = tableWidget.childWidgets[i];
                rowWidget = childWidget;
                var rowHeight = rowWidget.height;
                if (isMultiColumnSplit || bottom < rowBottom + rowHeight || !ej2_base_1.isNullOrUndefined(splittedWidget)) {
                    var splittedRow = undefined;
                    var allowRowBreakAcrossPages = true;
                    if (!ej2_base_1.isNullOrUndefined(rowWidget) && !ej2_base_1.isNullOrUndefined(rowWidget.rowFormat)) {
                        allowRowBreakAcrossPages = rowWidget.rowFormat.allowBreakAcrossPages;
                    }
                    if (allowRowBreakAcrossPages) {
                        splittedRow = (ej2_base_1.isNullOrUndefined(splittedWidget) && this.isFirstLineFitForRow(bottom, rowWidget)) ? this.getSplittedWidgetForRow(bottom, tableCollection, [rowWidget], rowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count) : rowWidget;
                    }
                    else {
                        if ((ej2_base_1.isNullOrUndefined(tableWidget.containerWidget.containerWidget.previousWidget)
                            && this.isFirstLineFitForRow(bottom, rowWidget))
                            || (tableWidget.isInsideTable
                                && !(tableWidget.containerWidget.containerWidget.rowFormat.allowBreakAcrossPages))) {
                            splittedRow = this.getSplittedWidgetForRow(bottom, tableCollection, [rowWidget], rowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count);
                        }
                        else if (!ej2_base_1.isNullOrUndefined(tableWidget.containerWidget.containerWidget.previousWidget)) {
                            splittedRow = rowWidget;
                        }
                    }
                    if (!ej2_base_1.isNullOrUndefined(splittedRow)) {
                        if (i === 0 && splittedRow === rowWidget) {
                            return tableWidget;
                        }
                        if (tableWidget.childWidgets.indexOf(splittedRow) !== -1) {
                            tableWidget.childWidgets.splice(tableWidget.childWidgets.indexOf(splittedRow), 1);
                            i--;
                            tableWidget.height -= splittedRow.height;
                        }
                        else {
                            tableWidget.height -= rowHeight - rowWidget.height;
                        }
                        if (ej2_base_1.isNullOrUndefined(splittedWidget)) {
                            splittedWidget = this.createTableWidget(tableWidget);
                            this.updateWidgetLocation(tableWidget, splittedWidget);
                            splittedWidget.height = splittedRow.height;
                        }
                        else {
                            splittedWidget.height += splittedRow.height;
                        }
                        splittedWidget.childWidgets.push(splittedRow);
                        splittedRow.containerWidget = splittedWidget;
                    }
                }
                rowBottom += rowWidget.height;
            }
            return splittedWidget;
        };
        Layout.prototype.isFirstLineFitForPara = function (bottom, paraWidget) {
            var lineWidget = paraWidget.childWidgets[0];
            var lineHeight = lineWidget.height;
            var height = this.getFootNoteHeightInLine(lineWidget);
            height += this.existFootnoteHeight;
            lineHeight += height;
            var cellwidget = lineWidget.paragraph.containerWidget;
            if (paraWidget.paragraphFormat.keepLinesTogether && Math.floor(cellwidget.containerWidget.y) !== this.viewer.clientArea.y) {
                lineHeight = paraWidget.height;
            }
            if (this.documentHelper.isFirstLineFitInShiftWidgets) {
                if (this.viewer.clientActiveArea.y === this.viewer.clientArea.y && paraWidget.y + lineHeight >= bottom) {
                    return true;
                }
            }
            else if (!cellwidget.ownerTable.isInsideTable && cellwidget.containerWidget.y === this.viewer.clientArea.y
                && paraWidget.y + lineHeight >= bottom) {
                return true;
            }
            return (paraWidget.y + lineHeight <= bottom);
        };
        Layout.prototype.isFirstLineFitForTable = function (bottom, tableWidget) {
            var rowWidget = undefined;
            var isFit = false;
            var childWidget = tableWidget.childWidgets[0];
            rowWidget = childWidget;
            if (!ej2_base_1.isNullOrUndefined(rowWidget)) {
                isFit = this.isFirstLineFitForRow(bottom, rowWidget);
            }
            return isFit;
        };
        Layout.prototype.isFirstLineFitForRow = function (bottom, rowWidget) {
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                var cellWidget = rowWidget.childWidgets[i];
                if (!this.isFirstLineFitForCell(bottom, cellWidget)) {
                    return false;
                }
            }
            return true;
        };
        Layout.prototype.isFirstLineFitForCell = function (bottom, cellWidget) {
            if (cellWidget.childWidgets.length === 0) {
                return true;
            }
            if (cellWidget.childWidgets[0] instanceof page_1.ParagraphWidget) {
                var paraWidget = cellWidget.childWidgets[0];
                return this.isFirstLineFitForPara(bottom - cellWidget.margin.bottom, paraWidget);
            }
            else {
                var tableWidget = cellWidget.childWidgets[0];
                return this.isFirstLineFitForTable(bottom - cellWidget.margin.bottom, tableWidget);
            }
        };
        Layout.prototype.updateWidgetLocation = function (widget, table) {
            table.x = widget.x;
            table.y = widget.y;
            table.width = widget.width;
        };
        Layout.prototype.updateChildLocationForTable = function (top, tableWidget, bodyWidget, updatePosition) {
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var rowWidget = tableWidget.childWidgets[i];
                rowWidget.y = top;
                this.updateChildLocationForRow(top, rowWidget, bodyWidget, updatePosition);
                top += rowWidget.height;
            }
        };
        Layout.prototype.updateChildLocationForRow = function (top, rowWidget, bodyWidget, updatePosition) {
            var spacing = 0;
            if (rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
                spacing = editor_helper_1.HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
            }
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                var cellWidget = rowWidget.childWidgets[i];
                cellWidget.index = cellWidget.cellIndex;
                cellWidget.y = top + cellWidget.margin.top + spacing;
                this.updateChildLocationForCellOrShape(cellWidget.y, cellWidget, bodyWidget, updatePosition);
            }
        };
        Layout.prototype.updateChildLocationForCellOrShape = function (top, widget, bodyWidget, updatePosition, updateShapeYPosition) {
            var container = widget;
            if (widget instanceof page_1.ShapeElementBox) {
                container = widget.textFrame;
            }
            for (var i = 0; i < container.childWidgets.length; i++) {
                var skipHeight = false;
                if (container.childWidgets[i] instanceof page_1.TableWidget && container.childWidgets[i].wrapTextAround
                    && !ej2_base_1.isNullOrUndefined(container.childWidgets[i + 1]) && container.childWidgets[i + 1].y > container.childWidgets[i].y
                    && container.childWidgets[i + 1].y < (container.childWidgets[i].y + container.childWidgets[i].height)) {
                    skipHeight = true;
                }
                if (!ej2_base_1.isNullOrUndefined(container.childWidgets[i].floatingElements) && container.childWidgets[i].floatingElements.length > 0 && updatePosition) {
                    this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - top;
                    this.viewer.clientActiveArea.y = top;
                }
                container.childWidgets[i].x = container.childWidgets[i].x;
                container.childWidgets[i].y = top;
                if (widget instanceof page_1.ShapeElementBox && widget.textWrappingStyle == "Inline" && updateShapeYPosition) {
                    this.updateShapeYPosition(widget);
                }
                if (!ej2_base_1.isNullOrUndefined(bodyWidget) && widget instanceof page_1.TableCellWidget && container.childWidgets[i] instanceof page_1.ParagraphWidget) {
                    var paragraph = container.childWidgets[i];
                    var prevBodyWidgetFloatingElements = widget.ownerTable.bodyWidget.floatingElements;
                    var isRowMovedToNextTable = false;
                    if (widget.ownerTable.bodyWidget === bodyWidget && !ej2_base_1.isNullOrUndefined(widget.ownerTable.previousSplitWidget)) {
                        prevBodyWidgetFloatingElements = widget.ownerTable.previousSplitWidget.bodyWidget.floatingElements;
                        isRowMovedToNextTable = true;
                    }
                    if (paragraph.floatingElements.length > 0) {
                        for (var j = 0; j < paragraph.floatingElements.length; j++) {
                            var element = paragraph.floatingElements[j];
                            var prevClientActiveAreaX = this.viewer.clientActiveArea.x;
                            this.viewer.clientActiveArea.x = element.x;
                            this.layoutShape(element);
                            this.viewer.clientActiveArea.x = prevClientActiveAreaX;
                            if (!ej2_base_1.isNullOrUndefined(paragraph.firstChild)) {
                                var firstLine = paragraph.childWidgets[0];
                                for (var k = 0; k < firstLine.children.length; k++) {
                                    var elementBox = firstLine.children[k];
                                    if (elementBox instanceof page_1.ShapeBase && elementBox.textWrappingStyle == 'Inline') {
                                        this.adjustPosition(elementBox, widget.ownerTable.bodyWidget);
                                        top = paragraph.y;
                                    }
                                }
                            }
                            if (prevBodyWidgetFloatingElements.indexOf(element) > -1 && element.textWrappingStyle !== 'Inline') {
                                if (!isRowMovedToNextTable) {
                                    bodyWidget.floatingElements.push(element);
                                    var previousBodyWidget = bodyWidget.previousSplitWidget;
                                    if (!ej2_base_1.isNullOrUndefined(previousBodyWidget) && previousBodyWidget.floatingElements.indexOf(element) !== -1) {
                                        previousBodyWidget.floatingElements.splice(previousBodyWidget.floatingElements.indexOf(element), 1);
                                    }
                                }
                                if (prevBodyWidgetFloatingElements.indexOf(element) !== -1) {
                                    prevBodyWidgetFloatingElements.splice(prevBodyWidgetFloatingElements.indexOf(element), 1);
                                }
                            }
                        }
                    }
                }
                if (container.childWidgets[i] instanceof page_1.TableWidget) {
                    this.updateChildLocationForTable(top, container.childWidgets[i], bodyWidget, updatePosition);
                }
                if (!skipHeight) {
                    top += container.childWidgets[i].height;
                }
            }
        };
        Layout.prototype.updateCellVerticalPosition = function (cellWidget, isUpdateToTop, isInsideTable) {
            var containerWidget = cellWidget.ownerTable.containerWidget;
            if (containerWidget instanceof page_1.BlockContainer || containerWidget instanceof page_1.TextFrame || isInsideTable) {
                var displacement = this.getDisplacement(cellWidget, isUpdateToTop);
                this.updateCellContentVerticalPosition(cellWidget, displacement, isUpdateToTop);
            }
        };
        Layout.prototype.updateCellContentVerticalPosition = function (cellWidget, displacement, isUpdateToTop) {
            if (displacement === 0) {
                return;
            }
            var location = cellWidget.y + displacement;
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                if (cellWidget.childWidgets[i] instanceof page_1.ParagraphWidget) {
                    var para = cellWidget.childWidgets[i];
                    para.y = location;
                    this.updateShapeInsideCell(para, displacement);
                }
                else {
                    this.updateTableWidgetLocation(cellWidget.childWidgets[i], location, isUpdateToTop);
                }
                location = location + cellWidget.childWidgets[i].height;
            }
        };
        Layout.prototype.updateShapeInsideCell = function (paragraph, displacement) {
            for (var i = 0; i < paragraph.floatingElements.length; i++) {
                var floatElement = paragraph.floatingElements[i];
                floatElement.y += displacement;
                if (floatElement instanceof page_1.ShapeElementBox) {
                    this.updateChildLocationForCellOrShape(floatElement.y, floatElement);
                }
            }
        };
        Layout.prototype.updateTableWidgetLocation = function (tableWidget, location, isUpdateToTop) {
            tableWidget.y = location = location + tableWidget.topBorderWidth;
            var cellSpacing = 0;
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var rowWidget = tableWidget.childWidgets[i];
                rowWidget.y = location;
                for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                    var cellWidget = rowWidget.childWidgets[j];
                    cellWidget.y = location + cellWidget.margin.top + cellSpacing;
                    this.updateCellVerticalPosition(cellWidget, isUpdateToTop, true);
                }
                location = location + rowWidget.height;
            }
            return location;
        };
        Layout.prototype.getDisplacement = function (cellWidget, isUpdateToTop) {
            var rowHeight = 0;
            var rowWidget = cellWidget.containerWidget;
            var padding = cellWidget.margin.top + cellWidget.margin.bottom;
            if (!ej2_base_1.isNullOrUndefined(cellWidget.cellFormat) && cellWidget.cellFormat.rowSpan > 1) {
                rowHeight = cellWidget.height;
            }
            else {
                rowHeight = ((!ej2_base_1.isNullOrUndefined(rowWidget) ? rowWidget.height : 0) - padding);
            }
            var cellContentHeight = this.getCellContentHeight(cellWidget, true);
            var displacement = 0;
            if (rowHeight > cellContentHeight && rowHeight <= this.viewer.clientArea.height) {
                displacement = rowHeight - cellContentHeight;
                if (cellWidget.cellFormat.verticalAlignment === 'Center') {
                    displacement = displacement / 2;
                }
                else if ((cellWidget.cellFormat.verticalAlignment === 'Top' || isUpdateToTop)) {
                    displacement = 0;
                }
            }
            return displacement;
        };
        Layout.prototype.getCellContentHeight = function (cellWidget, isDisplacement) {
            if (ej2_base_1.isNullOrUndefined(cellWidget.childWidgets)) {
                return 0;
            }
            var contentHeight = 0;
            var cellY = cellWidget.y;
            var withShapeContentHeight = 0;
            var withShapeBottom = 0;
            var considerShapeHeight = false;
            var considerAsTop = false;
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                if (cellWidget.childWidgets[i] instanceof page_1.ParagraphWidget) {
                    var para = cellWidget.childWidgets[i];
                    contentHeight += cellWidget.childWidgets[i].height;
                    if (!isDisplacement) {
                        var totalShapeHeight = this.getFloatingItemsHeight(para, cellWidget);
                        contentHeight += totalShapeHeight;
                    }
                    for (var k = 0; k < para.floatingElements.length; k++) {
                        considerShapeHeight = true;
                        var floatElement = para.floatingElements[k];
                        var textWrappingStyle = floatElement.textWrappingStyle;
                        var shapeBottom = floatElement.y + floatElement.height;
                        var paraBottom = para.y + para.height;
                        if ((cellY + cellWidget.containerWidget.height) > shapeBottom && shapeBottom > withShapeBottom) {
                            withShapeContentHeight = Math.abs(cellY - shapeBottom);
                            withShapeBottom = shapeBottom;
                            considerAsTop = false;
                        }
                        else if (shapeBottom > paraBottom && para.x + para.width > floatElement.x && shapeBottom > withShapeBottom
                            && textWrappingStyle !== 'InFrontOfText' && textWrappingStyle !== 'Behind'
                            && (this.documentHelper.compatibilityMode === 'Word2013' || para.floatingElements[k].layoutInCell)) {
                            var height = (withShapeBottom === 0) ? shapeBottom - paraBottom : shapeBottom - withShapeBottom;
                            contentHeight += height;
                            withShapeBottom = shapeBottom;
                        }
                        else {
                            considerAsTop = true;
                        }
                    }
                }
                else {
                    if (this.considerPositionTableHeight(cellWidget, cellWidget.childWidgets[i])) {
                        contentHeight += cellWidget.childWidgets[i].height;
                    }
                }
            }
            if ((cellY + contentHeight) > withShapeBottom) {
                considerShapeHeight = false;
            }
            return (isDisplacement && considerShapeHeight) ? withShapeContentHeight :
                (isDisplacement && considerAsTop ? cellWidget.ownerRow.height : contentHeight);
        };
        Layout.prototype.getFloatingItemsHeight = function (paragraph, cellWidget) {
            var withShapeBottom = 0;
            var totalShapeHeight = 0;
            for (var i = 0; i < paragraph.floatingElements.length; i++) {
                var floatElement = paragraph.floatingElements[i];
                var textWrappingStyle = floatElement.textWrappingStyle;
                var shapeBottom = floatElement.y + floatElement.height;
                var paraBottom = paragraph.y + paragraph.height;
                if (shapeBottom < this.viewer.clientArea.bottom && floatElement.y !== paragraph.y && paraBottom > shapeBottom && paragraph.x + paragraph.width > floatElement.x && shapeBottom > withShapeBottom
                    && textWrappingStyle !== 'InFrontOfText' && textWrappingStyle !== 'Behind' && textWrappingStyle !== 'Inline'
                    && (this.documentHelper.compatibilityMode === 'Word2013' || paragraph.floatingElements[i].layoutInCell)) {
                    var height = (withShapeBottom === 0) ? shapeBottom - cellWidget.y : shapeBottom - withShapeBottom;
                    totalShapeHeight += height;
                    withShapeBottom = shapeBottom;
                }
            }
            return totalShapeHeight;
        };
        Layout.prototype.considerPositionTableHeight = function (cellWidget, nestedWrapTable) {
            if (nestedWrapTable.isLayouted && nestedWrapTable.wrapTextAround) {
                for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                    var blockWidget = cellWidget.childWidgets[i];
                    if (nestedWrapTable !== blockWidget && (blockWidget.y === nestedWrapTable.y
                        || (blockWidget.y + blockWidget.height) < nestedWrapTable.y)) {
                        return false;
                    }
                }
            }
            return true;
        };
        Layout.prototype.getTableLeftBorder = function (borders) {
            if (!ej2_base_1.isNullOrUndefined(borders.left)) {
                return borders.left;
            }
            else {
                var border = new index_1.WBorder(borders);
                border.lineStyle = 'Single';
                border.lineWidth = 0.66;
                return border;
            }
        };
        Layout.prototype.getTableRightBorder = function (borders) {
            if (!ej2_base_1.isNullOrUndefined(borders.right)) {
                return borders.right;
            }
            else {
                var border = new index_1.WBorder(borders);
                border.lineStyle = 'Single';
                border.lineWidth = 0.66;
                return border;
            }
        };
        Layout.prototype.getTableTopBorder = function (borders) {
            if (!ej2_base_1.isNullOrUndefined(borders.top)) {
                return borders.top;
            }
            else {
                var border = new index_1.WBorder(borders);
                border.lineStyle = 'Single';
                border.lineWidth = 0.66;
                return border;
            }
        };
        Layout.prototype.getTableBottomBorder = function (borders) {
            if (!ej2_base_1.isNullOrUndefined(borders.bottom)) {
                return borders.bottom;
            }
            else {
                var border = new index_1.WBorder(borders);
                border.lineStyle = 'Single';
                border.lineWidth = 0.66;
                return border;
            }
        };
        Layout.prototype.getCellDiagonalUpBorder = function (tableCell) {
            var diagonalUpBorder = undefined;
            var cellBorder = undefined;
            cellBorder = tableCell.cellFormat.borders;
            diagonalUpBorder = cellBorder.diagonalUp;
            return diagonalUpBorder;
        };
        Layout.prototype.getCellDiagonalDownBorder = function (tableCell) {
            var diagonalDownBorder = undefined;
            var cellBorder = undefined;
            cellBorder = tableCell.cellFormat.borders;
            diagonalDownBorder = cellBorder.diagonalDown;
            return diagonalDownBorder;
        };
        Layout.prototype.getTableWidth = function (table) {
            var width = 0;
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                var rowWidth = 0;
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    rowWidth += editor_helper_1.HelperMethods.convertPointToPixel(cell.cellFormat.cellWidth);
                }
                if (width < rowWidth) {
                    width = rowWidth;
                }
            }
            return width;
        };
        Layout.prototype.layoutNextItemsBlock = function (blockAdv, viewer, isFootnoteReLayout) {
            var sectionIndex = blockAdv.bodyWidget.sectionIndex;
            var block = blockAdv;
            var splittedWidget = block.getSplitWidgets();
            var nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
            if (ej2_base_1.isNullOrUndefined(nextBlock) || this.documentHelper.blockToShift === block) {
                this.documentHelper.blockToShift = undefined;
            }
            var updateNextBlockList = true;
            while (nextBlock instanceof page_1.BlockWidget && (nextBlock.bodyWidget.sectionIndex === sectionIndex || (nextBlock.bodyWidget.sectionFormat.breakCode === 'NoBreak' && block.bodyWidget.sectionFormat.pageWidth === nextBlock.bodyWidget.sectionFormat.pageWidth && block.bodyWidget.sectionFormat.pageHeight === nextBlock.bodyWidget.sectionFormat.pageHeight))) {
                if (!ej2_base_1.isNullOrUndefined(isFootnoteReLayout) && isFootnoteReLayout && !nextBlock.isLayouted && this.isInitialLoad) {
                    break;
                }
                var currentWidget = undefined;
                var blocks = block.getSplitWidgets();
                currentWidget = blocks[blocks.length - 1];
                block = nextBlock;
                if (this.documentHelper.blockToShift === block) {
                    this.documentHelper.blockToShift = undefined;
                }
                updateNextBlockList = false;
                var nextWidget = undefined;
                nextWidget = block.getSplitWidgets()[0];
                if (this.documentHelper.fieldStacks.length === 0 && !ej2_base_1.isNullOrUndefined(nextWidget) && currentWidget.containerWidget === nextWidget.containerWidget
                    && (editor_helper_1.HelperMethods.round(nextWidget.y, 2) === editor_helper_1.HelperMethods.round(currentWidget.y + currentWidget.height, 2))) {
                    if (!ej2_base_1.isNullOrUndefined(this.documentHelper.blockToShift) || this.documentHelper.owner.editor.isFootnoteElementRemoved) {
                        this.documentHelper.blockToShift = block;
                    }
                    else if (nextWidget.bodyWidget) {
                        var floatingElementLength = nextWidget.bodyWidget.floatingElements.length;
                        if (floatingElementLength > 0 || (floatingElementLength === 0 && ej2_base_1.isNullOrUndefined(this.documentHelper.blockToShift)
                            && nextWidget instanceof page_1.ParagraphWidget && nextWidget.isEmpty() && currentWidget instanceof page_1.TableWidget)) {
                            this.documentHelper.blockToShift = block;
                        }
                    }
                    break;
                }
                updateNextBlockList = true;
                if ((viewer.owner.isShiftingEnabled && this.documentHelper.fieldStacks.length === 0) || this.isIFfield) {
                    this.documentHelper.blockToShift = block;
                    break;
                }
                else if (ej2_base_1.isNullOrUndefined(this.viewer.owner.editorModule) || !this.viewer.owner.editorModule.isInsertingTOC) {
                    block = block.combineWidget(this.viewer);
                    if (currentWidget.containerWidget !== block.containerWidget) {
                        if (!(currentWidget instanceof page_1.ParagraphWidget) ||
                            (currentWidget instanceof page_1.ParagraphWidget) && !currentWidget.isEndsWithPageBreak && !currentWidget.isEndsWithColumnBreak && currentWidget.containerWidget.page !== block.containerWidget.page && !(block.bodyWidget instanceof page_1.BodyWidget && block.bodyWidget.sectionFormat.breakCode === 'NoBreak')) {
                            this.updateContainerWidget(block, currentWidget.containerWidget, currentWidget.indexInOwner + 1, false);
                        }
                    }
                    if (block instanceof page_1.TableWidget) {
                        this.clearTableWidget(block, true, true);
                        block.isGridUpdated = false;
                    }
                    else {
                    }
                    viewer.updateClientAreaForBlock(block, true);
                    if (this.viewer instanceof viewer_1.WebLayoutViewer || block.bodyWidget instanceof page_1.HeaderFooterWidget) {
                        block.containerWidget.height -= block.height;
                    }
                    this.documentHelper.layout.layoutBlock(block, 0);
                    viewer.updateClientAreaForBlock(block, false);
                }
                splittedWidget = nextBlock.getSplitWidgets();
                nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
            }
            if (!viewer.owner.isShiftingEnabled || (this.documentHelper.blockToShift !== block)) {
                this.viewer.owner.editorModule.updateListItemsTillEnd(block, updateNextBlockList);
            }
        };
        Layout.prototype.updateClientAreaForLine = function (startLineWidget) {
            startLineWidget.marginTop = 0;
            var top = this.documentHelper.selection.getTop(startLineWidget);
            var left = this.viewer.clientArea.x;
            this.viewer.cutFromTop(top);
            this.viewer.cutFromLeft(left);
        };
        Layout.prototype.getParentTable = function (block) {
            var widget = block;
            while (widget.containerWidget) {
                if (widget.containerWidget instanceof page_1.BlockContainer || widget.containerWidget instanceof page_1.TextFrame) {
                    return widget;
                }
                widget = widget.containerWidget;
            }
            return undefined;
        };
        Layout.prototype.reLayoutParagraph = function (paragraphWidget, lineIndex, elementBoxIndex, isBidi, isSkip) {
            if (this.isReplaceAll) {
                return;
            }
            this.isRelayout = true;
            if (paragraphWidget.containerWidget instanceof page_1.TextFrame
                && paragraphWidget.containerWidget.containerShape.textWrappingStyle === 'Inline') {
                lineIndex = paragraphWidget.containerWidget.containerShape.line.indexInOwner;
                paragraphWidget = paragraphWidget.containerWidget.containerShape.paragraph;
            }
            isBidi = ej2_base_1.isNullOrUndefined(isBidi) ? false : isBidi;
            this.isRelayout = true;
            if (this.documentHelper.blockToShift === paragraphWidget) {
                this.layoutBodyWidgetCollection(paragraphWidget.index, paragraphWidget.containerWidget, paragraphWidget, false);
                this.isBidiReLayout = true;
            }
            else {
                if (this.isBidiReLayout) {
                    this.isBidiReLayout = false;
                }
            }
            if (paragraphWidget.isInsideTable) {
                this.isBidiReLayout = true;
                if (!this.isReplacingAll) {
                    this.reLayoutTable(paragraphWidget);
                }
                if (this.isFootnoteContentChanged && (!ej2_base_1.isNullOrUndefined(paragraphWidget.bodyWidget)) && !ej2_base_1.isNullOrUndefined(paragraphWidget.bodyWidget.page.footnoteWidget)) {
                    var foot = paragraphWidget.bodyWidget.page.footnoteWidget;
                    this.layoutfootNote(foot);
                }
                this.isBidiReLayout = false;
            }
            else {
                this.reLayoutLine(paragraphWidget, lineIndex, isBidi, isSkip);
            }
            if (paragraphWidget.bodyWidget instanceof page_1.HeaderFooterWidget &&
                paragraphWidget.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
                this.shiftFooterChildLocation(paragraphWidget.bodyWidget, this.viewer);
            }
        };
        Layout.prototype.getParentRow = function (block) {
            var cell = block;
            while (cell.ownerTable !== null && cell.ownerTable.isInsideTable) {
                cell = cell.ownerTable.associatedCell;
            }
            return cell.ownerRow;
        };
        Layout.prototype.reLayoutRow = function (block) {
            if (block instanceof page_1.ParagraphWidget) {
                block = block.associatedCell;
            }
            var currentRow = this.getParentRow(block).getSplitWidgets()[0];
            if (!ej2_base_1.isNullOrUndefined(currentRow) && !currentRow.ownerTable.tableFormat.allowAutoFit) {
                var currentTable = currentRow.ownerTable.getSplitWidgets()[0].combineWidget(this.viewer);
                var startRow = currentRow;
                while (this.isVerticalMergedCellContinue(startRow)) {
                    var previousRow = startRow.previousWidget;
                    if (ej2_base_1.isNullOrUndefined(previousRow)) {
                        break;
                    }
                    startRow = previousRow;
                }
                var bodyWidget = currentTable.containerWidget;
                if (this.viewer instanceof viewer_1.WebLayoutViewer) {
                    bodyWidget.height -= currentTable.height;
                }
                if ((this.viewer.owner.enableHeaderAndFooter || block.isInHeaderFooter) && !(bodyWidget instanceof page_1.TextFrame)) {
                    block.bodyWidget.isEmpty = false;
                    bodyWidget.height -= currentTable.height;
                    this.viewer.updateHeaderFooterClientAreaWithTop(currentTable.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(currentTable), bodyWidget.page);
                }
                else if (bodyWidget instanceof page_1.TextFrame) {
                    this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
                }
                else {
                    this.viewer.updateClientArea(bodyWidget, bodyWidget.page);
                }
                var area = new page_1.Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
                var clientArea = new page_1.Rect(area.x, area.y, area.width, area.height);
                if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
                    var block_3 = this.documentHelper.getFirstParagraphInFirstCell(currentTable);
                    this.viewer.owner.editorModule.updateWholeListItems(block_3);
                }
                this.viewer.updateClientAreaForBlock(currentTable, true);
                this.viewer.cutFromTop(startRow.y);
                this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                currentTable.height = 0;
                do {
                    this.clearRowWidget(currentRow, true, true, true);
                    this.layoutRow([currentTable], currentRow, true);
                    if (startRow === currentRow) {
                        break;
                    }
                    startRow = startRow.nextRow;
                } while (startRow && startRow !== currentRow);
                this.updateChildLocationForTable(currentTable.y, currentTable);
                this.viewer.clientArea = clientArea;
                this.viewer.clientActiveArea = new page_1.Rect(clientArea.x, clientArea.y, clientArea.width, clientArea.height);
                this.viewer.updateClientAreaForBlock(currentTable, true);
                currentTable.x -= currentTable.leftBorderWidth;
                currentTable.y -= currentTable.topBorderWidth;
                this.viewer.cutFromTop(currentTable.y);
                this.shiftTableWidget(currentTable, this.viewer, true);
                this.layoutNextItemsBlock(currentTable, this.viewer);
            }
            else {
                this.currentCell = block;
                this.reLayoutTable(block);
                this.currentCell = undefined;
            }
        };
        Layout.prototype.reLayoutTable = function (block, isFootnoteReLayout) {
            var table = this.getParentTable(block);
            if (table.header) {
                var tableCollection = table.getSplitWidgets();
                for (var i = 1; i < tableCollection.length; i++) {
                    tableCollection[i].bodyWidget.page.repeatHeaderRowTableWidget = false;
                }
            }
            var currentTable = table.combineWidget(this.viewer);
            var bodyWidget = currentTable.containerWidget;
            if (this.viewer instanceof viewer_1.WebLayoutViewer) {
                bodyWidget.height -= currentTable.height;
            }
            if ((this.viewer.owner.enableHeaderAndFooter || block.isInHeaderFooter) && !(bodyWidget instanceof page_1.TextFrame)) {
                block.bodyWidget.isEmpty = false;
                bodyWidget.height -= currentTable.height;
                this.viewer.updateHeaderFooterClientAreaWithTop(table.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(table), bodyWidget.page);
            }
            else if (bodyWidget instanceof page_1.TextFrame) {
                this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
            }
            else {
                this.viewer.updateClientArea(bodyWidget, bodyWidget.page);
            }
            if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
                var block_4 = this.documentHelper.getFirstParagraphInFirstCell(currentTable);
                this.viewer.owner.editorModule.updateWholeListItems(block_4);
            }
            this.viewer.updateClientAreaForBlock(currentTable, true);
            currentTable.x -= currentTable.leftBorderWidth;
            currentTable.y -= currentTable.topBorderWidth;
            var yPos = this.getYPosition(currentTable);
            this.viewer.cutFromTop(yPos);
            this.clearTableWidget(currentTable, true, true, true, true);
            this.isBidiReLayout = true;
            this.layoutBlock(currentTable, 0);
            this.viewer.updateClientAreaForBlock(currentTable, false);
            this.layoutNextItemsBlock(currentTable, this.viewer, isFootnoteReLayout);
        };
        Layout.prototype.getYPosition = function (table) {
            if (table.wrapTextAround) {
                var prevWidget = table.previousWidget;
                while (prevWidget) {
                    if (prevWidget instanceof page_1.ParagraphWidget) {
                        return prevWidget.y + prevWidget.height;
                    }
                    else if (prevWidget instanceof page_1.TableWidget) {
                        if (prevWidget.wrapTextAround) {
                            prevWidget = prevWidget.previousWidget;
                        }
                        else {
                            return prevWidget.y + prevWidget.height;
                        }
                    }
                }
                return this.viewer.clientActiveArea.y;
            }
            return table.y;
        };
        Layout.prototype.clearFootnoteReference = function (table, updateClientHeight) {
            if (table.footnoteElement && table.footnoteElement.length > 0) {
                var startPage = table.bodyWidget.page;
                for (var i = table.footnoteElement.length - 1; i >= 0; i--) {
                    var footnote = table.footnoteElement[i];
                    footnote.isLayout = false;
                    var footNoteWidget = footnote.bodyWidget.containerWidget;
                    if (footNoteWidget && footNoteWidget.bodyWidgets.indexOf(footnote.bodyWidget) !== -1) {
                        var footnoteHeight = this.getFootNoteHeight(footnote.bodyWidget);
                        footNoteWidget.height -= footnoteHeight;
                        footNoteWidget.bodyWidgets.splice(footnote.bodyWidget.indexInOwner, 1);
                        if (updateClientHeight && footNoteWidget.page === startPage) {
                            this.viewer.clientActiveArea.height += footnoteHeight;
                            this.viewer.clientArea.height += footnoteHeight;
                        }
                    }
                    if (footNoteWidget.bodyWidgets.length === 0 && footNoteWidget.page) {
                        footNoteWidget.page.footnoteWidget = undefined;
                    }
                    footnote.bodyWidget.containerWidget = undefined;
                }
                table.footnoteElement = [];
            }
        };
        Layout.prototype.clearTableWidget = function (table, clearPosition, clearHeight, clearGrid, updateClientHeight) {
            table.height = 0;
            if (clearGrid) {
                table.isGridUpdated = false;
            }
            if (clearPosition) {
                table.y = 0;
                table.x = 0;
                if (table.footnoteElement && table.footnoteElement.length > 0) {
                    this.clearFootnoteReference(table, updateClientHeight);
                }
            }
            table.leftBorderWidth = 0;
            table.rightBorderWidth = 0;
            table.topBorderWidth = 0;
            table.bottomBorderWidth = 0;
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                this.clearRowWidget(row, clearPosition, clearHeight, clearGrid);
            }
        };
        Layout.prototype.clearRowWidget = function (row, clearPosition, clearHeight, clearGrid) {
            row.height = 0;
            if (clearPosition) {
                row.y = 0;
                row.x = 0;
            }
            row.topBorderWidth = 0;
            row.bottomBorderWidth = 0;
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                this.clearCellWidget(cell, clearPosition, clearHeight, clearGrid);
            }
        };
        Layout.prototype.clearCellWidget = function (cell, clearPosition, clearHeight, clearGrid) {
            cell.height = 0;
            if (clearPosition) {
                cell.y = 0;
                cell.x = 0;
            }
            cell.leftBorderWidth = 0;
            cell.rightBorderWidth = 0;
            this.clearBlockWidget(cell.childWidgets, clearPosition, clearHeight, clearGrid);
        };
        Layout.prototype.clearBlockWidget = function (blocks, clearPosition, clearHeight, clearGrid) {
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                if (block instanceof page_1.ParagraphWidget) {
                    if (clearPosition) {
                        block.y = 0;
                        block.x = 0;
                    }
                    if (clearHeight) {
                        block.height = 0;
                    }
                }
                else {
                    this.clearTableWidget(block, clearPosition, clearHeight, clearGrid);
                }
            }
        };
        Layout.prototype.layoutBodyWidgetCollection = function (blockIndex, bodyWidget, block, shiftNextWidget, isSkipShifting) {
            if (!ej2_base_1.isNullOrUndefined(block) && block.isFieldCodeBlock) {
                return;
            }
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper.owner)
                && this.documentHelper.owner.isLayoutEnabled) {
                if (bodyWidget instanceof page_1.BlockContainer || bodyWidget instanceof page_1.TextFrame) {
                    var curretBlock = this.checkAndGetBlock(bodyWidget, blockIndex);
                    if (bodyWidget instanceof page_1.BodyWidget && ej2_base_1.isNullOrUndefined(curretBlock) && !ej2_base_1.isNullOrUndefined(bodyWidget.nextRenderedWidget) && bodyWidget.nextRenderedWidget.sectionFormat.breakCode === 'NoBreak') {
                        curretBlock = bodyWidget.nextRenderedWidget.firstChild;
                        bodyWidget = bodyWidget.nextRenderedWidget;
                    }
                    if (ej2_base_1.isNullOrUndefined(curretBlock)) {
                        return;
                    }
                    if (this.viewer instanceof viewer_1.WebLayoutViewer) {
                        curretBlock.containerWidget.height -= curretBlock.height;
                    }
                    if (bodyWidget instanceof page_1.HeaderFooterWidget) {
                        bodyWidget.isEmpty = false;
                        this.viewer.updateHeaderFooterClientAreaWithTop(bodyWidget.sectionFormat, bodyWidget.headerFooterType.indexOf('Header') !== -1, bodyWidget.page);
                        curretBlock.containerWidget.height -= curretBlock.height;
                    }
                    else if (bodyWidget instanceof page_1.TextFrame) {
                        this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true, !shiftNextWidget);
                    }
                    else if (!ej2_base_1.isNullOrUndefined(bodyWidget.containerWidget) && bodyWidget.containerWidget instanceof page_1.FootNoteWidget) {
                        this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                        if (bodyWidget.containerWidget.footNoteType === 'Footnote') {
                            this.isRelayoutFootnote = true;
                            this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                            this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                            this.viewer.clientActiveArea.y = curretBlock.containerWidget.containerWidget.y;
                        }
                        else {
                            this.viewer.cutFromTop(bodyWidget.containerWidget.y);
                            this.layoutfootNote(bodyWidget.containerWidget);
                            return;
                        }
                    }
                    else {
                        if (!ej2_base_1.isNullOrUndefined(bodyWidget.page.footnoteWidget)) {
                            if (bodyWidget.page.footnoteWidget.footNoteType === 'Footnote') {
                                this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                            }
                            else {
                                this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                            }
                        }
                        else {
                            this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                        }
                    }
                    if (blockIndex > 0 || (curretBlock.bodyWidget.sectionFormat.breakCode === 'NoBreak' && curretBlock.bodyWidget.index !== 0 && curretBlock === bodyWidget.firstChild)) {
                        curretBlock = curretBlock.combineWidget(this.viewer);
                        var prevWidget = curretBlock.getSplitWidgets()[0].previousRenderedWidget;
                        if (!ej2_base_1.isNullOrUndefined(prevWidget) && prevWidget.wrapTextAround && !ej2_base_1.isNullOrUndefined(prevWidget.getSplitWidgets()[0].previousRenderedWidget) && prevWidget.y < prevWidget.getSplitWidgets()[0].previousRenderedWidget.y) {
                            prevWidget = prevWidget.getSplitWidgets()[0].previousRenderedWidget;
                        }
                        while (prevWidget instanceof page_1.BlockWidget && prevWidget.isFieldCodeBlock) {
                            prevWidget = prevWidget.getSplitWidgets()[0].previousRenderedWidget;
                        }
                        if (!(ej2_base_1.isNullOrUndefined(prevWidget) || prevWidget instanceof page_1.ParagraphWidget) ||
                            (prevWidget instanceof page_1.ParagraphWidget) && !prevWidget.isEndsWithPageBreak && !prevWidget.isEndsWithColumnBreak) {
                            if (ej2_base_1.isNullOrUndefined(isSkipShifting) && curretBlock.containerWidget !== prevWidget.containerWidget) {
                                var prevBodyWidget = curretBlock.containerWidget;
                                var newBodyWidget = prevWidget.containerWidget;
                                var footWidgets = this.getFootNoteWidgetsOf(curretBlock);
                                this.moveFootNotesToPage(footWidgets, prevBodyWidget, newBodyWidget);
                                if (curretBlock.bodyWidget.sectionFormat.breakCode !== 'NoBreak' || (curretBlock.bodyWidget.index === prevWidget.bodyWidget.index)) {
                                    this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                                    this.updateContainerWidget(curretBlock, newBodyWidget, prevWidget.indexInOwner + 1, false);
                                }
                                else if (curretBlock.bodyWidget.sectionIndex !== prevWidget.bodyWidget.sectionIndex && prevWidget.bodyWidget.sectionFormat.numberOfColumns > 1 && curretBlock.bodyWidget.page === prevWidget.bodyWidget.page) {
                                    var firstBody = this.getBodyWidget(prevWidget.bodyWidget, true);
                                    var height = this.getNextWidgetHeight(firstBody);
                                    this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                                    this.viewer.clientActiveArea.y = height;
                                    this.viewer.clientArea.y = this.viewer.clientActiveArea.y;
                                    this.viewer.clientArea.height = this.viewer.clientActiveArea.height;
                                }
                                else {
                                    this.viewer.updateClientArea(curretBlock.bodyWidget, curretBlock.bodyWidget.page, true);
                                    this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                                }
                            }
                            else {
                                if (prevWidget instanceof page_1.ParagraphWidget && prevWidget.height <= 0 && this.isMultiColumnDoc) {
                                    var prevPara = prevWidget;
                                    this.viewer.updateClientAreaForBlock(prevPara, true);
                                    this.layoutParagraph(prevPara, 0);
                                    this.viewer.updateClientArea(prevPara.bodyWidget, prevPara.bodyWidget.page, true);
                                }
                                this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                            }
                        }
                        else if (prevWidget instanceof page_1.ParagraphWidget && (prevWidget.isEndsWithPageBreak || prevWidget.isEndsWithColumnBreak) &&
                            prevWidget.containerWidget === curretBlock.containerWidget) {
                            this.moveBlocksToNextPage(prevWidget, false);
                        }
                    }
                    var currentParagraph = void 0;
                    curretBlock = curretBlock.combineWidget(this.viewer);
                    if (curretBlock instanceof page_1.TableWidget) {
                        this.clearTableWidget(curretBlock, true, true);
                        curretBlock.isGridUpdated = false;
                        currentParagraph = this.documentHelper.getFirstParagraphInFirstCell(curretBlock);
                    }
                    else {
                        currentParagraph = curretBlock;
                    }
                    if ((this.viewer.owner.isDocumentLoaded) && this.viewer.owner.editorModule) {
                        this.viewer.owner.editorModule.updateWholeListItems(currentParagraph);
                    }
                    this.viewer.updateClientAreaForBlock(curretBlock, true);
                    this.isRelayout = true;
                    this.documentHelper.layout.layoutBlock(curretBlock, 0);
                    this.isRelayout = false;
                    this.viewer.updateClientAreaForBlock(curretBlock, false);
                    if (!ej2_base_1.isNullOrUndefined(bodyWidget.containerWidget) && bodyWidget.containerWidget instanceof page_1.FootNoteWidget) {
                        if (bodyWidget.containerWidget.footNoteType === 'Footnote') {
                            this.layoutfootNote(bodyWidget.containerWidget);
                        }
                    }
                    if (shiftNextWidget) {
                        this.shiftNextWidgets(curretBlock);
                    }
                    else {
                        this.layoutNextItemsBlock(curretBlock, this.viewer);
                    }
                }
                else if (bodyWidget instanceof page_1.TableCellWidget) {
                    var table = this.documentHelper.layout.getParentTable(bodyWidget.ownerTable).getSplitWidgets()[0];
                    this.reLayoutTable(bodyWidget.ownerTable);
                    this.layoutNextItemsBlock(table, this.viewer);
                }
            }
            this.isRelayoutFootnote = false;
        };
        Layout.prototype.checkAndGetBlock = function (containerWidget, blockIndex) {
            if (containerWidget instanceof page_1.TextFrame) {
                return containerWidget.childWidgets[blockIndex];
            }
            else {
                var sectionIndex = containerWidget.indexInOwner;
                if (containerWidget.page.bodyWidgets.length <= 1) {
                    while (containerWidget && containerWidget.indexInOwner === sectionIndex) {
                        if (containerWidget.childWidgets.length > 0 && containerWidget.firstChild.index <= blockIndex &&
                            containerWidget.lastChild.index >= blockIndex) {
                            for (var i = 0; i < containerWidget.childWidgets.length; i++) {
                                var block = containerWidget.childWidgets[i];
                                if (block.index === blockIndex) {
                                    return block;
                                }
                            }
                        }
                        if (containerWidget instanceof page_1.BodyWidget) {
                            containerWidget = containerWidget.nextRenderedWidget;
                        }
                        else {
                            break;
                        }
                    }
                }
                else {
                    while (containerWidget) {
                        if (containerWidget.childWidgets.length > 0) {
                            for (var i = 0; i < containerWidget.childWidgets.length; i++) {
                                var block = containerWidget.childWidgets[i];
                                if (block.index === blockIndex) {
                                    return block;
                                }
                            }
                        }
                        if (containerWidget instanceof page_1.BodyWidget) {
                            containerWidget = containerWidget.nextRenderedWidget;
                        }
                        else {
                            break;
                        }
                    }
                }
            }
            return undefined;
        };
        Layout.prototype.layoutTable = function (table, startIndex) {
            if (this.isFieldCode && !this.checkTableHasField(table)) {
                table.isFieldCodeBlock = true;
                return table;
            }
            table.isBidiTable = table.bidi;
            if (!table.isGridUpdated) {
                table.buildTableColumns();
                table.isGridUpdated = true;
            }
            if (this.documentHelper.compatibilityMode !== 'Word2013'
                && !table.isInsideTable
                && !ej2_base_1.isNullOrUndefined(table.firstChild.firstChild.leftMargin)) {
                this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                    editor_helper_1.HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
            }
            var tableView = [table];
            this.addTableWidget(this.viewer.clientActiveArea, tableView);
            this.viewer.updateClientAreaTopOrLeft(table, true);
            var clientActiveAreaForTableWrap;
            var clientAreaForTableWrap;
            var wrapDiff = 0;
            if (table.wrapTextAround) {
                clientActiveAreaForTableWrap = this.viewer.clientActiveArea.clone();
                clientAreaForTableWrap = this.viewer.clientArea.clone();
                this.updateClientAreaForWrapTable(tableView, table, true, clientActiveAreaForTableWrap, clientAreaForTableWrap);
            }
            else if (!(table.containerWidget instanceof page_1.TextFrame)) {
                this.adjustClientAreaBasedOnTextWrapForTable(table, this.viewer.clientActiveArea);
                if (this.isWrapText) {
                    wrapDiff = this.viewer.clientActiveArea.x - this.viewer.clientArea.x;
                    this.isWrapText = false;
                    table.x = this.viewer.clientActiveArea.x;
                }
            }
            if (table.childWidgets.length > 0) {
                var isHeader = table.childWidgets[0].rowFormat.isHeader;
                table.header = isHeader;
                table.continueHeader = isHeader;
                table.headerHeight = 0;
            }
            var row = table.childWidgets[startIndex];
            var index = tableView.length;
            while (row) {
                row = this.layoutRow(tableView, row);
                row = row.nextRow;
            }
            if (this.documentHelper.viewer instanceof viewer_1.PageLayoutViewer && table.wrapTextAround && (table.positioning.verticalAlignment === 'Bottom' || table.positioning.verticalAlignment === 'Center' || table.positioning.verticalAlignment === 'Outside')) {
                this.updateTableFloatPoints(table);
                this.updateChildLocationForTable(table.y, table);
            }
            this.updateWidgetsToPage(tableView, [], table, true);
            if (wrapDiff > 0) {
                this.viewer.clientArea.x = this.viewer.clientArea.x - wrapDiff;
            }
            var tableWidget = table.getSplitWidgets();
            if (table.wrapTextAround && table.bodyWidget && table.bodyWidget.lastChild !== tableWidget[tableWidget.length - 1]) {
                this.updateClientAreaForWrapTable(tableView, table, false, clientActiveAreaForTableWrap, clientAreaForTableWrap);
            }
            tableView[tableView.length - 1].isLayouted = true;
            tableView[tableView.length - 1].isFieldCodeBlock = false;
            if (this.documentHelper.compatibilityMode !== 'Word2013'
                && !table.isInsideTable
                && !table.wrapTextAround
                && !ej2_base_1.isNullOrUndefined(table.firstChild.firstChild.leftMargin)) {
                this.viewer.clientArea.x = this.viewer.clientArea.x + editor_helper_1.HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
            }
            return tableView[tableView.length - 1];
        };
        Layout.prototype.updateClientAreaForWrapTable = function (tables, table, beforeLayout, clientActiveAreaForTableWrap, clientAreaForTableWrap) {
            if (beforeLayout) {
                if (table.wrapTextAround) {
                    this.updateTableFloatPoints(table);
                    var clienactare = this.viewer.clientActiveArea.clone();
                    var rect = this.adjustClientAreaBasedOnTextWrapForTable(table, this.viewer.clientActiveArea);
                    if (clienactare.x !== rect.x) {
                        table.x = this.viewer.clientActiveArea.x;
                    }
                    if (clienactare.y !== rect.y) {
                        table.y = this.viewer.clientActiveArea.y;
                    }
                }
            }
            else {
                if (table.wrapTextAround && table.bodyWidget) {
                    if (tables.length == 1) {
                        if (!ej2_base_1.isNullOrUndefined(table.previousWidget) || table.isInHeaderFooter || table.isInsideTable) {
                            this.viewer.clientActiveArea = clientActiveAreaForTableWrap.clone();
                            this.viewer.clientArea = clientAreaForTableWrap.clone();
                            var position = table.positioning;
                            if (this.viewer.clientActiveArea.height < table.height && table.width >= this.viewer.clientActiveArea.width && position.verticalAlignment == "None" && position.horizontalAlignment == "Left" && position.horizontalOrigin == "Margin" && position.verticalOrigin == "Margin" && position.horizontalPosition == 0 && position.verticalPosition <= 0) {
                                this.moveBlocksToNextPage(table.previousWidget, false);
                            }
                        }
                        else {
                            this.viewer.updateClientArea(table.bodyWidget, table.bodyWidget.page);
                        }
                        if (table.bodyWidget.floatingElements.indexOf(table) === -1) {
                            table.bodyWidget.floatingElements.push(table);
                        }
                    }
                    else {
                        this.documentHelper.tableLefts.pop();
                        this.viewer.updateClientArea(table.bodyWidget, table.bodyWidget.page);
                        for (var z = 0; z < tables.length; z++) {
                            var bodyWidget = tables[z].bodyWidget;
                            if (!ej2_base_1.isNullOrUndefined(bodyWidget) && bodyWidget.floatingElements.indexOf(tables[z]) === -1) {
                                bodyWidget.floatingElements.push(tables[z]);
                            }
                        }
                        var splittedTable = tables[tables.length - 1];
                        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + splittedTable.height + splittedTable.tableFormat.borders.bottom.lineWidth);
                    }
                }
            }
        };
        Layout.prototype.addTableWidget = function (area, table, create) {
            var tableWidget = table[table.length - 1];
            if (create) {
                tableWidget = this.createTableWidget(tableWidget);
                table.push(tableWidget);
            }
            tableWidget.width = area.width;
            tableWidget.x = area.x;
            tableWidget.y = area.y;
            if (tableWidget.tableFormat.cellSpacing > 0) {
                tableWidget.height = tableWidget.height + editor_helper_1.HelperMethods.convertPointToPixel(tableWidget.tableFormat.cellSpacing);
                if (!tableWidget.isBidiTable) {
                    tableWidget.leftBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(this.getTableLeftBorder(tableWidget.tableFormat.borders).getLineWidth());
                    tableWidget.rightBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(this.getTableRightBorder(tableWidget.tableFormat.borders).getLineWidth());
                }
                else {
                    tableWidget.leftBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(this.getTableRightBorder(tableWidget.tableFormat.borders).getLineWidth());
                    tableWidget.rightBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(this.getTableLeftBorder(tableWidget.tableFormat.borders).getLineWidth());
                }
                tableWidget.topBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(this.getTableTopBorder(tableWidget.tableFormat.borders).getLineWidth());
                tableWidget.bottomBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(this.getTableBottomBorder(tableWidget.tableFormat.borders).getLineWidth());
                tableWidget.x += tableWidget.leftBorderWidth;
                tableWidget.y += tableWidget.topBorderWidth;
                tableWidget.width -= tableWidget.leftBorderWidth;
                tableWidget.width -= tableWidget.rightBorderWidth;
                tableWidget.height += tableWidget.bottomBorderWidth;
            }
            return tableWidget;
        };
        Layout.prototype.updateWidgetsToPage = function (tables, rows, table, rearrangeRow, endRowWidget) {
            var viewer = this.viewer;
            var tableWidget = tables[tables.length - 1];
            if (!table.isInsideTable) {
                for (var i = 0; i < tables.length; i++) {
                    this.updateHeightForTableWidget(tables, rows, tables[i], endRowWidget);
                }
                if (tableWidget.childWidgets.length > 0 && tableWidget.y !== tableWidget.childWidgets[0].y) {
                    tableWidget.y = tableWidget.childWidgets[0].y;
                }
            }
            if (table.isBidiTable && rearrangeRow) {
                for (var i = 0; i < tables.length; i++) {
                    var layoutedTable = tables[i];
                    for (var j = 0; j < layoutedTable.childWidgets.length; j++) {
                        var layoutedRow = layoutedTable.childWidgets[j];
                        layoutedRow.shiftWidgetForRtlTable();
                    }
                }
            }
            if (table.tableFormat.cellSpacing > 0) {
                if (tableWidget.y + tableWidget.height + editor_helper_1.HelperMethods.convertPointToPixel(table.tableFormat.cellSpacing) > viewer.clientArea.bottom && viewer instanceof viewer_1.WebLayoutViewer) {
                    tableWidget.height = tableWidget.height - editor_helper_1.HelperMethods.convertPointToPixel(table.tableFormat.cellSpacing) / 2;
                }
                viewer.cutFromTop(tableWidget.y + tableWidget.height);
            }
            if (this.viewer instanceof viewer_1.WebLayoutViewer) {
                table.containerWidget.height += table.height;
            }
            if (table.bodyWidget instanceof page_1.HeaderFooterWidget && !table.wrapTextAround) {
                table.containerWidget.height += table.height;
                if (this.viewer.owner.enableHeaderAndFooter && table.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
                    this.shiftFooterChildLocation(table.bodyWidget, this.viewer);
                }
            }
        };
        Layout.prototype.updateHeightForTableWidget = function (tables, rows, tableWidget, endRowWidget) {
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var rowWidget = tableWidget.childWidgets[i];
                if (rowWidget === endRowWidget) {
                    break;
                }
                this.updateHeightForRowWidget(this.viewer, true, tables, rows, rowWidget, false, endRowWidget);
            }
        };
        Layout.prototype.layoutRow = function (tableWidget, row, isRowLayout) {
            var isNestedTable = row.ownerTable.isInsideTable;
            if (!isNestedTable) {
                this.updateExistingFootnoteHeight(row);
            }
            var viewer = this.viewer;
            var rowWidgets = [row];
            this.addTableRowWidget(viewer.clientActiveArea, rowWidgets);
            viewer.updateClientAreaForRow(row, true);
            var topMargin = this.getMaxTopCellMargin(row);
            var bottomMargin = this.getMaxBottomCellMargin(row);
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                this.layoutCell(cell, topMargin + row.topBorderWidth, bottomMargin + row.bottomBorderWidth);
            }
            viewer.updateClientAreaForRow(row, false);
            var rows = [row];
            if (!isRowLayout) {
                this.updateWidgetsToTable(tableWidget, rows, row, false);
            }
            if (!isNestedTable) {
                this.layoutedFootnoteElement = [];
            }
            return rows[rows.length - 1];
        };
        Layout.prototype.updateExistingFootnoteHeight = function (row) {
            this.layoutedFootnoteElement = [];
            if (!ej2_base_1.isNullOrUndefined(row.bodyWidget.page.footnoteWidget) && row.bodyWidget.page.footnoteWidget.bodyWidgets.length !== 0) {
                this.existFootnoteHeight = row.bodyWidget.page.footnoteWidget.height;
            }
            else {
                this.existFootnoteHeight = 0;
            }
        };
        Layout.prototype.isIntersecting = function (startPosition, endPosition, adjacentStartPosition, adjacentEndPosition) {
            return ((editor_helper_1.HelperMethods.round(adjacentStartPosition, 2) <= editor_helper_1.HelperMethods.round(startPosition, 2) || editor_helper_1.HelperMethods.round(adjacentStartPosition, 2) < editor_helper_1.HelperMethods.round(endPosition, 2))
                && editor_helper_1.HelperMethods.round(adjacentEndPosition, 2) > editor_helper_1.HelperMethods.round(startPosition, 2));
        };
        Layout.prototype.getAdjacentRowCell = function (cell, cellStartPos, cellEndPos, rowIndex) {
            var adjCells = [];
            var columnLength = cell.ownerTable.tableHolder.columns.length;
            var adjRow = cell.ownerTable.childWidgets[rowIndex];
            if (ej2_base_1.isNullOrUndefined(adjRow)) {
                return adjCells;
            }
            var prevCellEndPos = 0;
            var prevCellEndIndex = 0;
            var colSpan = cell.cellFormat.columnSpan;
            var columnIndex = cell.columnIndex;
            if (adjRow.rowFormat.gridBefore > 0) {
                if (adjRow.rowFormat.gridBefore > columnIndex + colSpan) {
                    return adjCells;
                }
                prevCellEndPos = adjRow.rowFormat.beforeWidth;
                prevCellEndIndex = adjRow.rowFormat.gridBefore;
            }
            for (var i = 0; i < adjRow.childWidgets.length; i++) {
                var adjCell = adjRow.childWidgets[i];
                var adjCellStartPos = adjCell.x - adjCell.margin.left;
                var adjCellEndPos = adjCell.x + adjCell.width + adjCell.margin.right;
                var adjCellEndIndex = adjCell.columnIndex + adjCell.cellFormat.columnSpan;
                if (i == adjRow.childWidgets.length - 1 ||
                    (editor_helper_1.HelperMethods.round(adjCellStartPos, 2) > editor_helper_1.HelperMethods.round(prevCellEndPos, 2)
                        && editor_helper_1.HelperMethods.round(adjCellStartPos, 2) > editor_helper_1.HelperMethods.round(cellStartPos, 2))) {
                    if (i == adjRow.childWidgets.length - 1 && adjRow.rowFormat.gridAfter > 0
                        && adjCellEndIndex + adjRow.rowFormat.gridAfter === columnLength) {
                        return adjCells;
                    }
                    if (this.isIntersecting(cellStartPos, cellEndPos, prevCellEndPos, adjCellStartPos)) {
                        while (colSpan > 0) {
                            var prevRowAdjCell = adjRow.getVerticalMergeStartCell(columnIndex, colSpan);
                            var prevRowAdjCellEndPos = 0;
                            if (!ej2_base_1.isNullOrUndefined(prevRowAdjCell)) {
                                var adjCellColumnSpan = prevRowAdjCell.cellFormat.columnSpan;
                                adjCells.push(prevRowAdjCell);
                                prevRowAdjCellEndPos = prevRowAdjCell.x + prevRowAdjCell.width + prevRowAdjCell.margin.right;
                                cellStartPos = prevRowAdjCellEndPos;
                                prevCellEndIndex = prevRowAdjCell.columnIndex + adjCellColumnSpan;
                                colSpan -= prevCellEndIndex - columnIndex;
                                columnIndex = prevCellEndIndex;
                                if (editor_helper_1.HelperMethods.round(prevRowAdjCellEndPos, 2) >= editor_helper_1.HelperMethods.round(cellEndPos, 2)) {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
                if (this.isIntersecting(cellStartPos, cellEndPos, adjCellStartPos, adjCellEndPos)) {
                    adjCells.push(adjCell);
                    cellStartPos = adjCellEndPos;
                    colSpan -= adjCellEndIndex - columnIndex;
                    columnIndex = adjCellEndIndex;
                }
                if (editor_helper_1.HelperMethods.round(adjCellEndPos, 2) >= editor_helper_1.HelperMethods.round(cellEndPos, 2)) {
                    break;
                }
                prevCellEndPos = adjCellEndPos;
                prevCellEndIndex = adjCellEndIndex;
            }
            return adjCells;
        };
        Layout.prototype.addTableRowWidget = function (area, row) {
            var rowWidget = row[row.length - 1];
            if ((rowWidget.rowFormat.beforeWidth !== 0 || rowWidget.rowFormat.gridBeforeWidth !== 0) && ((this.documentHelper.alignTablesRowByRow) ? rowWidget.ownerTable.tableFormat.tableAlignment === 'Left' : true)) {
                rowWidget.x += (rowWidget.rowFormat.beforeWidth !== 0) ? rowWidget.rowFormat.beforeWidth : rowWidget.rowFormat.gridBeforeWidth;
            }
            else {
                rowWidget.x = area.x;
            }
            rowWidget.y = area.y;
            rowWidget.width = area.width;
            var borderWidth = 0;
            if (!ej2_base_1.isNullOrUndefined(rowWidget.ownerTable) && !ej2_base_1.isNullOrUndefined(rowWidget.ownerTable.tableFormat)
                && rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
                rowWidget.height = rowWidget.height + editor_helper_1.HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
                for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                    if (!ej2_base_1.isNullOrUndefined(rowWidget.childWidgets[j].cellFormat)
                        && !ej2_base_1.isNullOrUndefined(rowWidget.childWidgets[j].cellFormat.borders)) {
                        var width = page_1.TableCellWidget.getCellBottomBorder(rowWidget.childWidgets[j]).getLineWidth();
                        if (width > borderWidth) {
                            borderWidth = width;
                        }
                    }
                }
                rowWidget.bottomBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(borderWidth);
                if (rowWidget.index > 0 && !ej2_base_1.isNullOrUndefined(rowWidget.previousWidget)) {
                    var prevRow = rowWidget.previousWidget;
                    borderWidth = 0;
                    for (var i = 0; i < prevRow.childWidgets.length; i++) {
                        if (!ej2_base_1.isNullOrUndefined(prevRow.childWidgets[i].cellFormat) && !ej2_base_1.isNullOrUndefined(prevRow.childWidgets[i].cellFormat.borders)) {
                            var value = page_1.TableCellWidget.getCellBottomBorder(prevRow.childWidgets[i]).getLineWidth();
                            if (value > borderWidth) {
                                borderWidth = value;
                            }
                        }
                    }
                    rowWidget.topBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(borderWidth);
                }
            }
            if (!ej2_base_1.isNullOrUndefined(rowWidget.childWidgets)) {
                for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                    if (!ej2_base_1.isNullOrUndefined(rowWidget.childWidgets[i].cellFormat) && !ej2_base_1.isNullOrUndefined(rowWidget.childWidgets[i].cellFormat.borders)) {
                        var topBorderWidth = page_1.TableCellWidget.getCellTopBorder(rowWidget.childWidgets[i]).getLineWidth();
                        if (topBorderWidth > borderWidth) {
                            borderWidth = topBorderWidth;
                        }
                    }
                }
            }
            rowWidget.topBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(borderWidth);
            if (!ej2_base_1.isNullOrUndefined(rowWidget.ownerTable) && !ej2_base_1.isNullOrUndefined(rowWidget.ownerTable.tableFormat) && rowWidget.ownerTable.tableFormat.cellSpacing <= 0 && rowWidget.rowIndex === rowWidget.ownerTable.childWidgets.length - 1) {
                for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                    if (!ej2_base_1.isNullOrUndefined(rowWidget.childWidgets[i].cellFormat) && !ej2_base_1.isNullOrUndefined(rowWidget.childWidgets[i].cellFormat.borders)) {
                        var bottomBorderWidth = page_1.TableCellWidget.getCellBottomBorder(rowWidget.childWidgets[i]).getLineWidth();
                        if (bottomBorderWidth > borderWidth) {
                            borderWidth = bottomBorderWidth;
                        }
                    }
                }
                rowWidget.bottomBorderWidth = editor_helper_1.HelperMethods.convertPointToPixel(borderWidth);
            }
            return rowWidget;
        };
        Layout.prototype.getMaxTopCellMargin = function (row) {
            if (ej2_base_1.isNullOrUndefined(row.childWidgets)) {
                return 0;
            }
            var value = 0;
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                var topMargin = 0;
                if (cell.cellFormat.hasValue('topMargin')) {
                    topMargin = editor_helper_1.HelperMethods.convertPointToPixel(cell.cellFormat.topMargin);
                }
                else if (row.rowFormat.hasValue('topMargin')) {
                    topMargin = editor_helper_1.HelperMethods.convertPointToPixel(row.rowFormat.topMargin);
                }
                else {
                    topMargin = editor_helper_1.HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.topMargin);
                }
                if (topMargin > value) {
                    value = topMargin;
                }
            }
            return value;
        };
        Layout.prototype.getMaxBottomCellMargin = function (row) {
            if (ej2_base_1.isNullOrUndefined(row.childWidgets)) {
                return 0;
            }
            var value = 0;
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                var bottomMargin = 0;
                if (cell.cellFormat.hasValue('bottomMargin')) {
                    bottomMargin = editor_helper_1.HelperMethods.convertPointToPixel(cell.cellFormat.bottomMargin);
                }
                else if (row.rowFormat.hasValue('bottomMargin')) {
                    bottomMargin = editor_helper_1.HelperMethods.convertPointToPixel(row.rowFormat.bottomMargin);
                }
                else {
                    bottomMargin = editor_helper_1.HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.bottomMargin);
                }
                if (bottomMargin > value) {
                    value = bottomMargin;
                }
            }
            return value;
        };
        Layout.prototype.layoutCell = function (cell, maxCellMarginTop, maxCellMarginBottom) {
            var viewer = this.viewer;
            this.addTableCellWidget(cell, viewer.clientActiveArea, maxCellMarginTop, maxCellMarginBottom);
            this.updateTopBorders(cell);
            viewer.updateClientAreaForCell(cell, true);
            if (cell.childWidgets.length === 0) {
                var paragraphWidget = new page_1.ParagraphWidget();
                paragraphWidget.characterFormat = new index_1.WCharacterFormat();
                paragraphWidget.paragraphFormat = new index_1.WParagraphFormat();
                paragraphWidget.index = 0;
                var lineWidget = new page_1.LineWidget(paragraphWidget);
                paragraphWidget.childWidgets.push(lineWidget);
                cell.childWidgets.push(paragraphWidget);
                paragraphWidget.paragraphFormat.borders = new index_1.WBorders();
            }
            for (var i = 0; i < cell.childWidgets.length; i++) {
                var block = cell.childWidgets[i];
                viewer.updateClientAreaForBlock(block, true);
                block.containerWidget = cell;
                this.layoutBlock(block, 0);
                viewer.updateClientAreaForBlock(block, false);
            }
            this.updateWidgetToRow(cell);
            viewer.updateClientAreaForCell(cell, false);
        };
        Layout.prototype.isInsertTable = function () {
            if (this.documentHelper.owner.editorHistory && this.documentHelper.owner.editorHistory.currentBaseHistoryInfo && this.documentHelper.owner.editorHistory.currentBaseHistoryInfo.action === 'InsertTable')
                return true;
            else
                return false;
        };
        Layout.prototype.updateTopBorders = function (cell) {
            cell.updatedTopBorders = [];
            if (cell.ownerTable.tableFormat.cellSpacing === 0) {
                var cellTopBorder = cell.cellFormat.borders.top;
                if (!cellTopBorder.isBorderDefined || (cellTopBorder.isBorderDefined
                    && cellTopBorder.lineStyle === 'None' && cellTopBorder.lineWidth === 0 &&
                    cellTopBorder.hasValue('color'))) {
                    cellTopBorder = cell.ownerRow.rowFormat.borders.horizontal;
                }
                if (!cellTopBorder.isBorderDefined) {
                    cellTopBorder = cell.ownerRow.ownerTable.tableFormat.borders.horizontal;
                }
                var cellStartPos = cell.x - cell.margin.left;
                var cellEndPos = cell.x + cell.width + cell.margin.right;
                var adjCells = this.getAdjacentRowCell(cell, cellStartPos, cellEndPos, cell.ownerRow.indexInOwner - 1);
                for (var j = 0; j < adjCells.length; j++) {
                    var adjCell = adjCells[j];
                    var prevCellBottomBorder = adjCell.cellFormat.borders.bottom;
                    if (!prevCellBottomBorder.isBorderDefined || (prevCellBottomBorder.isBorderDefined
                        && prevCellBottomBorder.lineStyle === 'None' && prevCellBottomBorder.lineWidth === 0 &&
                        prevCellBottomBorder.hasValue('color'))) {
                        prevCellBottomBorder = adjCell.ownerRow.rowFormat.borders.horizontal;
                    }
                    if (!prevCellBottomBorder.isBorderDefined) {
                        prevCellBottomBorder = adjCell.ownerRow.ownerTable.tableFormat.borders.horizontal;
                    }
                    var border = void 0;
                    if (cellTopBorder.lineStyle === 'None' || cellTopBorder.lineStyle === 'Cleared') {
                        border = prevCellBottomBorder;
                    }
                    else if (prevCellBottomBorder.lineStyle === 'Cleared' || prevCellBottomBorder.lineStyle === 'None') {
                        border = cellTopBorder;
                    }
                    else {
                        border = cell.getBorderBasedOnPriority(cellTopBorder, prevCellBottomBorder);
                    }
                    var adjCellStartPos = adjCell.x - adjCell.margin.left;
                    var adjCellEndPos = adjCell.x + adjCell.width + adjCell.margin.right;
                    if (j === 0 && cellStartPos < adjCellStartPos) {
                        cell.updatedTopBorders.push({ border: cellTopBorder, width: (adjCellStartPos - cellStartPos) });
                    }
                    if (border) {
                        var width = 0;
                        if (editor_helper_1.HelperMethods.round(adjCellEndPos, 2) === editor_helper_1.HelperMethods.round(cellEndPos, 2) && editor_helper_1.HelperMethods.round(adjCellStartPos, 2) === editor_helper_1.HelperMethods.round(cellStartPos, 2)) {
                            width = cellEndPos - cellStartPos;
                        }
                        else if (editor_helper_1.HelperMethods.round(adjCellStartPos, 2) >= editor_helper_1.HelperMethods.round(cellStartPos, 2) && editor_helper_1.HelperMethods.round(adjCellEndPos, 2) >= editor_helper_1.HelperMethods.round(cellEndPos, 2)) {
                            width = cellEndPos - adjCellStartPos;
                        }
                        else if (editor_helper_1.HelperMethods.round(adjCellStartPos, 2) >= editor_helper_1.HelperMethods.round(cellStartPos, 2) && editor_helper_1.HelperMethods.round(adjCellEndPos, 2) <= editor_helper_1.HelperMethods.round(cellEndPos, 2)) {
                            width = adjCellEndPos - adjCellStartPos;
                        }
                        else if (editor_helper_1.HelperMethods.round(adjCellStartPos, 2) <= editor_helper_1.HelperMethods.round(cellStartPos, 2) && editor_helper_1.HelperMethods.round(adjCellEndPos, 2) <= editor_helper_1.HelperMethods.round(cellEndPos, 2)) {
                            width = adjCellEndPos - cellStartPos;
                        }
                        else if (editor_helper_1.HelperMethods.round(adjCellStartPos, 2) <= editor_helper_1.HelperMethods.round(cellStartPos, 2) && editor_helper_1.HelperMethods.round(adjCellEndPos, 2) >= editor_helper_1.HelperMethods.round(cellEndPos, 2)) {
                            width = cellEndPos - cellStartPos;
                        }
                        else {
                            width = cellEndPos - cellStartPos;
                        }
                        if (width < 0) {
                            width = 0;
                        }
                        cell.updatedTopBorders.push({ border: border, width: width });
                    }
                    if (j === (adjCells.length - 1) && cellEndPos > adjCellEndPos) {
                        cell.updatedTopBorders.push({ border: cellTopBorder, width: (cellEndPos - adjCellEndPos) });
                    }
                }
            }
        };
        Layout.prototype.shiftLayoutedItems = function (reLayout) {
            if (ej2_base_1.isNullOrUndefined(this.documentHelper.blockToShift) || ej2_base_1.isNullOrUndefined(this.documentHelper.blockToShift.containerWidget)) {
                this.documentHelper.blockToShift = undefined;
                this.checkAndShiftEndnote();
                this.documentHelper.removeEmptyPages();
                return;
            }
            var block = this.documentHelper.blockToShift;
            var isColumnBreak = this.getColumnBreak(block.bodyWidget);
            if (!isColumnBreak && this.viewer instanceof viewer_1.PageLayoutViewer && !this.isMultiColumnSplit && block === block.bodyWidget.firstChild && !ej2_base_1.isNullOrUndefined(block.bodyWidget.previousRenderedWidget) && block.bodyWidget.sectionIndex !== block.bodyWidget.previousRenderedWidget.sectionIndex && block.bodyWidget.previousRenderedWidget.sectionFormat.columns.length > 1) {
                var previousBodyWidget = block.bodyWidget.previousRenderedWidget;
                var lastbody = this.getBodyWidget(previousBodyWidget, false);
                if (!ej2_base_1.isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.page === lastbody.nextRenderedWidget.page) {
                    this.splitBodyWidgetBasedOnColumn(previousBodyWidget);
                }
            }
            var isFirstBlock = false;
            var lastPage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
            var lastSection = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
            if ((!isColumnBreak || (reLayout && this.isSectionEndsWithColumnBreak(block.bodyWidget))) && this.viewer instanceof viewer_1.PageLayoutViewer && !this.isMultiColumnSplit && block.bodyWidget.sectionFormat.columns.length > 1) {
                if (block.bodyWidget.columnIndex === 0 && block === block.bodyWidget.firstChild && !ej2_base_1.isNullOrUndefined(block.previousRenderedWidget) && block.bodyWidget.page === block.previousRenderedWidget.bodyWidget.page) {
                    block.bodyWidget.y = this.viewer.clientActiveArea.y;
                }
                isFirstBlock = block === block.bodyWidget.firstChild;
                this.reLayoutMultiColumn(block.bodyWidget, isFirstBlock);
                if (ej2_base_1.isNullOrUndefined(this.documentHelper.blockToShift)) {
                    return;
                }
                block = this.documentHelper.blockToShift;
            }
            var sectionIndex = block.bodyWidget.index;
            this.reLayoutOrShiftWidgets(block, this.viewer);
            var updateNextBlockList = true;
            var splittedWidget = block.getSplitWidgets();
            var nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
            while (nextBlock instanceof page_1.BlockWidget && (nextBlock.bodyWidget.index === sectionIndex || (nextBlock.bodyWidget.sectionFormat.breakCode === 'NoBreak' && block.bodyWidget.sectionFormat.pageWidth === nextBlock.bodyWidget.sectionFormat.pageWidth && block.bodyWidget.sectionFormat.pageHeight === nextBlock.bodyWidget.sectionFormat.pageHeight))) {
                isColumnBreak = this.getColumnBreak(nextBlock.bodyWidget);
                if ((!isColumnBreak || (reLayout && this.isSectionEndsWithColumnBreak(nextBlock.bodyWidget))) && this.viewer instanceof viewer_1.PageLayoutViewer && !this.isMultiColumnSplit && nextBlock.bodyWidget.sectionFormat.columns.length > 1) {
                    if (nextBlock.bodyWidget.columnIndex === 0 && nextBlock === nextBlock.bodyWidget.firstChild && !ej2_base_1.isNullOrUndefined(nextBlock.previousRenderedWidget) && nextBlock.bodyWidget.page === nextBlock.previousRenderedWidget.bodyWidget.page) {
                        nextBlock.bodyWidget.y = this.viewer.clientActiveArea.y;
                    }
                    isFirstBlock = nextBlock === nextBlock.bodyWidget.firstChild;
                    this.reLayoutMultiColumn(nextBlock.bodyWidget, isFirstBlock);
                    if (ej2_base_1.isNullOrUndefined(this.documentHelper.blockToShift)) {
                        return;
                    }
                    nextBlock = this.documentHelper.blockToShift;
                }
                var currentWidget = undefined;
                var blocks = block.getSplitWidgets();
                currentWidget = blocks[blocks.length - 1];
                block = nextBlock;
                updateNextBlockList = false;
                var nextWidget = undefined;
                blocks = block.getSplitWidgets();
                if (block instanceof page_1.ParagraphWidget) {
                    nextWidget = blocks[0];
                }
                else {
                    if (block instanceof page_1.TableWidget) {
                        nextWidget = blocks[0];
                    }
                }
                if (!this.documentHelper.owner.editor.isFootnoteElementRemoved && currentWidget.containerWidget === nextWidget.containerWidget
                    && (editor_helper_1.HelperMethods.round(nextWidget.y, 2) === editor_helper_1.HelperMethods.round(this.viewer.clientActiveArea.y, 2)) &&
                    ej2_base_1.isNullOrUndefined(nextWidget.nextWidget)) {
                    break;
                }
                if (!ej2_base_1.isNullOrUndefined(currentWidget.floatingElements)) {
                }
                updateNextBlockList = true;
                if (!block.isFieldCodeBlock) {
                    this.reLayoutOrShiftWidgets(block, this.viewer);
                }
                if (this.keepWithNext) {
                    block = this.documentHelper.blockToShift;
                    this.keepWithNext = false;
                }
                if (!this.isMultiColumnSplit && isColumnBreak && block.bodyWidget.sectionFormat.numberOfColumns > 1 && block.bodyWidget.nextWidget && block.nextRenderedWidget && block.bodyWidget.index !== block.nextRenderedWidget.bodyWidget.index) {
                    var clientY = this.viewer.clientActiveArea.y;
                    var clientHeight = this.viewer.clientActiveArea.height;
                    this.viewer.updateClientArea(block.bodyWidget.nextWidget, block.bodyWidget.nextWidget.page);
                    this.viewer.clientActiveArea.height = clientHeight;
                    this.viewer.clientActiveArea.y = clientY;
                }
                if (this.isMultiColumnSplit && block.bodyWidget.sectionFormat.numberOfColumns > 1 && block === block.bodyWidget.lastChild && !ej2_base_1.isNullOrUndefined(block.bodyWidget.nextRenderedWidget) && block.bodyWidget.sectionIndex !== block.bodyWidget.nextRenderedWidget.sectionIndex && block.bodyWidget.page === block.bodyWidget.nextRenderedWidget.page) {
                    return;
                }
                splittedWidget = block.getSplitWidgets();
                nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
            }
            if (this.viewer.owner.editorModule) {
                this.viewer.owner.editorModule.updateListItemsTillEnd(block, updateNextBlockList);
            }
            this.documentHelper.blockToShift = undefined;
            var viewer = this.viewer;
            if (viewer.owner.editor.isFootnoteElementRemoved) {
                var lastPage_1 = this.documentHelper.pages[this.documentHelper.pages.length - 1];
                var lastChild = lastPage_1.bodyWidgets[lastPage_1.bodyWidgets.length - 1];
                var endNote = lastPage_1.endnoteWidget;
                if (!ej2_base_1.isNullOrUndefined(endNote)) {
                    var clientArea = this.viewer.clientArea.clone();
                    var clientActiveArea = this.viewer.clientActiveArea.clone();
                    var lastPageLastPara = lastChild.childWidgets[lastChild.childWidgets.length - 1];
                    var y = lastPageLastPara.y + lastPageLastPara.height;
                    this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - y;
                    this.viewer.clientActiveArea.x = this.viewer.clientArea.x;
                    this.viewer.clientActiveArea.width = this.viewer.clientArea.width;
                    this.viewer.clientActiveArea.y = y;
                    this.layoutfootNote(endNote);
                    this.viewer.clientArea = clientArea;
                    this.viewer.clientActiveArea = clientActiveArea;
                }
            }
            this.documentHelper.removeEmptyPages();
            this.updateFieldElements();
            var firstPage = this.documentHelper.pages[0];
            if (firstPage.bodyWidgets[0].sectionIndex > 0) {
                var page = firstPage;
                do {
                    this.documentHelper.layout.layoutHeaderFooter(page.bodyWidgets[0], this.viewer, page);
                    page = page.nextPage;
                } while (page);
                while (firstPage.bodyWidgets[0].sectionIndex > 0) {
                    this.documentHelper.owner.editor.updateSectionIndex(undefined, firstPage.bodyWidgets[0], false);
                }
            }
            if ((!this.documentHelper.owner.enableLockAndEdit || !reLayout) && !this.isMultiColumnSplit) {
                viewer.updateScrollBars();
            }
            if (!(block.bodyWidget instanceof page_1.FootNoteWidget) && !this.isRelayoutFootnote && block.bodyWidget.page.endnoteWidget) {
                this.layoutfootNote(block.bodyWidget.page.endnoteWidget);
            }
        };
        Layout.prototype.isSectionEndsWithColumnBreak = function (section) {
            if (!ej2_base_1.isNullOrUndefined(section) && section.childWidgets.length > 0 && section.lastChild instanceof page_1.ParagraphWidget) {
                var paragraph = section.lastChild;
                return paragraph.isEndsWithColumnBreak;
            }
            return false;
        };
        Layout.prototype.checkAndShiftEndnote = function () {
            if (this.documentHelper.owner.selection) {
                var endBlock = this.documentHelper.owner.selection.end.paragraph;
                if (endBlock.isInsideTable) {
                    endBlock = this.getParentTable(endBlock);
                }
                if (!endBlock.isInHeaderFooter && !(endBlock.bodyWidget.containerWidget instanceof page_1.FootNoteWidget) && ej2_base_1.isNullOrUndefined(endBlock.nextRenderedWidget)) {
                    if (!(endBlock.bodyWidget instanceof page_1.FootNoteWidget) && !this.isRelayoutFootnote
                        && endBlock.bodyWidget.page.endnoteWidget) {
                        this.layoutfootNote(endBlock.bodyWidget.page.endnoteWidget);
                    }
                }
            }
        };
        Layout.prototype.updateFieldElements = function () {
            for (var i = 0; i < this.documentHelper.fields.length; i++) {
                var fieldBegin = this.documentHelper.fields[i];
                if (this.viewer instanceof viewer_1.PageLayoutViewer || (this.viewer instanceof viewer_1.WebLayoutViewer && !(fieldBegin.line.paragraph.bodyWidget instanceof page_1.HeaderFooterWidget))) {
                    if (!ej2_base_1.isNullOrUndefined(this.documentHelper.selection)) {
                        var fieldCode = this.documentHelper.selection.getFieldCode(fieldBegin);
                        if (!ej2_base_1.isNullOrUndefined(fieldCode) && (fieldCode.toLowerCase().match('numpages') || fieldCode.toLowerCase().match('sectionpages')) && !ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                            var textElement = fieldBegin.fieldSeparator.nextNode;
                            if (!ej2_base_1.isNullOrUndefined(textElement)) {
                                var prevPageNum = textElement.text;
                                textElement.text = this.documentHelper.pages.length.toString();
                                var paragraph = fieldBegin.line.paragraph;
                                if (!ej2_base_1.isNullOrUndefined(paragraph.bodyWidget) && !ej2_base_1.isNullOrUndefined(paragraph.bodyWidget.page)
                                    && prevPageNum !== textElement.text) {
                                    var lineIndex = paragraph.childWidgets.indexOf(fieldBegin.line);
                                    var elementIndex = fieldBegin.line.children.indexOf(textElement);
                                    if (paragraph.isInsideTable) {
                                        this.reLayoutParagraph(paragraph, lineIndex, elementIndex);
                                    }
                                    else {
                                        this.reLayoutLine(paragraph, lineIndex, false, false, true);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        Layout.prototype.reLayoutOrShiftWidgets = function (blockAdv, viewer) {
            var block = blockAdv;
            var isRealyoutList = false;
            if (this.isNeedToRelayout(blockAdv.bodyWidget)) {
                if (!this.isMultiColumnSplit) {
                    this.updateContainerForTable(block, viewer);
                }
                if (block instanceof page_1.TableWidget) {
                    block = block.combineWidget(this.viewer);
                    this.clearTableWidget(block, true, true, true);
                }
                viewer.updateClientAreaForBlock(block, true);
                this.isRelayout = true;
                this.layoutBlock(block, 0);
                this.isRelayout = false;
                viewer.updateClientAreaForBlock(block, false);
                isRealyoutList = true;
            }
            else {
                this.shiftWidgetsBlock(block, viewer);
            }
            var index = this.documentHelper.pages.indexOf(block.bodyWidget.page);
            if (index > 0 && block === block.bodyWidget.childWidgets[0] && block instanceof page_1.ParagraphWidget) {
                var val = block.bodyWidget.childWidgets[0].childWidgets[0].children;
                for (var i = 0; i < val.length; i++) {
                    var element = val[i];
                    if (element.margin.top > 0 && element.margin.top === this.getBeforeSpacing(element.paragraph)) {
                        element.margin.top -= this.getBeforeSpacing(element.paragraph);
                    }
                }
            }
            if (this.viewer.owner.editorModule && !isRealyoutList) {
                this.viewer.owner.editorModule.updateRenderedListItems(block);
            }
            if (!this.isRelayoutFootnote && block.bodyWidget.page.footnoteWidget) {
                this.layoutfootNote(block.bodyWidget.page.footnoteWidget);
            }
        };
        Layout.prototype.isNeedToRelayout = function (bodyWidget) {
            for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                var floatElement = bodyWidget.floatingElements[i];
                if (floatElement instanceof page_1.TableWidget || (floatElement instanceof page_1.ShapeBase &&
                    (floatElement.textWrappingStyle === 'Square' || floatElement.textWrappingStyle === 'TopAndBottom'))) {
                    return true;
                }
            }
            return false;
        };
        Layout.prototype.shiftWidgetsBlock = function (block, viewer) {
            if (block instanceof page_1.ParagraphWidget) {
                this.shiftWidgetsForPara(block, viewer);
            }
            else if (block instanceof page_1.TableWidget) {
                this.shiftWidgetsForTable(block, viewer);
            }
        };
        Layout.prototype.shiftWidgetsForPara = function (paragraph, viewer) {
            if (paragraph.height > (viewer.clientArea.height + viewer.clientArea.y) && !this.documentHelper.owner.enableHeaderAndFooter) {
                return;
            }
            var bodywid = paragraph.bodyWidget;
            var prevBodyObj = this.getBodyWidgetOfPreviousBlock(paragraph, 0);
            var prevBodyWidget = prevBodyObj.bodyWidget;
            var index = prevBodyObj.index;
            var prevWidget = undefined;
            var skipFootNoteHeight = false;
            var isSkip = true;
            for (var i = 0; i < paragraph.getSplitWidgets().length; i++) {
                var widget = paragraph.getSplitWidgets()[i];
                var firstBody = this.getBodyWidget(widget.bodyWidget, true);
                if (this.isMultiColumnSplit && widget !== paragraph) {
                    continue;
                }
                if (isSkip && !ej2_base_1.isNullOrUndefined(prevWidget)) {
                    var isPageBreak = prevWidget.lastChild ? prevWidget.lastChild.isEndsWithPageBreak : false;
                    var isColumnBreak = prevWidget.lastChild ? prevWidget.lastChild.isEndsWithColumnBreak : false;
                    this.shiftToPreviousWidget(widget, viewer, prevWidget, isPageBreak, isColumnBreak);
                    this.updateFloatingElementPosition(prevWidget);
                    if ((ej2_base_1.isNullOrUndefined(widget.childWidgets) || widget.childWidgets.length === 0) && !isPageBreak && !isColumnBreak) {
                        i--;
                        continue;
                    }
                    prevWidget = undefined;
                    if (prevBodyWidget !== widget.containerWidget) {
                        prevBodyWidget = widget.containerWidget;
                        if (isPageBreak) {
                            viewer.updateClientAreaByWidget(widget);
                        }
                    }
                }
                var footWidget = [];
                if (!skipFootNoteHeight) {
                    footWidget = this.getFootNoteWidgetsOf(widget);
                }
                skipFootNoteHeight = false;
                if (this.isFitInClientArea(widget, viewer, footWidget) || this.isMultiColumnSplit) {
                    if (this.keepWithNext) {
                        this.updateClientPositionForBlock(widget.containerWidget.firstChild, widget);
                        this.keepWithNext = false;
                    }
                    prevWidget = widget;
                    viewer.updateClientAreaForBlock(widget, true);
                    if (widget.isEmpty() && !ej2_base_1.isNullOrUndefined(widget.paragraphFormat) &&
                        (widget.paragraphFormat.textAlignment === 'Center' || widget.paragraphFormat.textAlignment === 'Right'
                            || (widget.paragraphFormat.textAlignment === 'Justify' && widget.paragraphFormat.bidi))
                        && widget.paragraphFormat.listFormat.listId === -1) {
                        this.updateXPositionForEmptyParagraph(viewer.clientActiveArea, widget);
                    }
                    else {
                        widget.x = viewer.clientActiveArea.x;
                    }
                    viewer.updateClientAreaForBlock(widget, false);
                    widget.y = viewer.clientActiveArea.y;
                    this.updateFloatingElementPosition(widget);
                    viewer.cutFromTop(viewer.clientActiveArea.y + widget.height);
                    if (!ej2_base_1.isNullOrUndefined(prevBodyWidget) && prevBodyWidget !== widget.containerWidget && !this.isMultiColumnSplit) {
                        index++;
                        if (!prevBodyWidget.lastChild.isEndsWithPageBreak && !prevBodyWidget.lastChild.isEndsWithColumnBreak) {
                            this.updateContainerWidget(widget, prevBodyWidget, index, true, footWidget);
                        }
                        if (footWidget.length > 0) {
                            if (prevBodyWidget.page.footnoteWidget) {
                                for (var k = 0; k < footWidget.length; k++) {
                                    if (prevBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footWidget[k]) === -1 && widget.bodyWidget.page.index != footWidget[k].page.index) {
                                        prevBodyWidget.page.footnoteWidget.bodyWidgets.push(footWidget[k]);
                                        prevBodyWidget.page.footnoteWidget.height += footWidget[k].height;
                                    }
                                }
                            }
                        }
                    }
                    else if (widget.containerWidget instanceof page_1.BodyWidget && widget.containerWidget.firstChild === widget && widget.previousRenderedWidget && widget.previousRenderedWidget instanceof page_1.ParagraphWidget && widget.previousRenderedWidget.containerWidget.sectionFormat.breakCode == 'NoBreak' && widget.containerWidget.page.index !== widget.previousRenderedWidget.containerWidget.page.index && widget.containerWidget.index !== widget.previousRenderedWidget.containerWidget.index) {
                        var bodyWidget = widget.previousRenderedWidget.bodyWidget;
                        var breakCode = bodyWidget.sectionFormat.breakCode;
                        if (bodyWidget.sectionFormat.columns.length > 1) {
                            bodyWidget = this.getBodyWidget(bodyWidget, true);
                        }
                        if (!ej2_base_1.isNullOrUndefined(bodyWidget.previousRenderedWidget) && bodyWidget.sectionFormat.breakCode === 'NoBreak'
                            && bodyWidget.previousRenderedWidget.sectionFormat.breakCode == 'NewPage'
                            && bodyWidget.page.index === bodyWidget.previousRenderedWidget.page.index) {
                            breakCode = bodyWidget.previousRenderedWidget.sectionFormat.breakCode;
                        }
                        var bottom = editor_helper_1.HelperMethods.round((this.getNextWidgetHeight(bodyWidget) + widget.height), 2);
                        if (!widget.previousRenderedWidget.containerWidget.lastChild.isEndsWithPageBreak && !widget.previousRenderedWidget.containerWidget.lastChild.isEndsWithColumnBreak
                            && bottom <= editor_helper_1.HelperMethods.round(this.viewer.clientActiveArea.bottom, 2) && breakCode === 'NoBreak') {
                            var page = widget.previousRenderedWidget.bodyWidget.page;
                            var nextPage = widget.containerWidget.page;
                            for (var j = 0; j < nextPage.bodyWidgets.length; j++) {
                                var nextBodyWidget = nextPage.bodyWidgets[j];
                                nextPage.bodyWidgets.splice(nextPage.bodyWidgets.indexOf(nextBodyWidget), 1);
                                page.bodyWidgets.splice(page.bodyWidgets.length, 0, nextBodyWidget);
                                nextBodyWidget.page = page;
                                j--;
                            }
                            widget.containerWidget.y = this.viewer.clientActiveArea.y;
                            this.documentHelper.removeEmptyPages();
                        }
                    }
                    if (!this.isInitialLoad && isSkip && widget.bodyWidget.sectionFormat.columns.length > 1 && widget === widget.bodyWidget.firstChild && (!ej2_base_1.isNullOrUndefined(firstBody.previousWidget)
                        && firstBody.page === firstBody.previousWidget.page)) {
                        this.viewer.updateClientArea(widget.bodyWidget, widget.bodyWidget.page);
                        firstBody = this.getBodyWidget(firstBody.previousWidget, true);
                        var height = this.getNextWidgetHeight(firstBody);
                        widget.bodyWidget.y = height;
                        this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                        this.viewer.clientActiveArea.y = height;
                        isSkip = false;
                        i--;
                    }
                    if (((widget.isEndsWithPageBreak && !this.isPageBreakInsideField(widget)) || widget.isEndsWithColumnBreak) && this.viewer instanceof viewer_1.PageLayoutViewer) {
                        var nextBodyWidget = this.createOrGetNextBodyWidget(prevBodyWidget, this.viewer);
                        nextBodyWidget = this.moveBlocksToNextPage(widget, true);
                        viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                    }
                }
                else {
                    var previousBlock = widget.previousRenderedWidget;
                    var isPageBreak = false;
                    var isColumnBreak = false;
                    if (previousBlock instanceof page_1.ParagraphWidget && previousBlock.isEndsWithPageBreak &&
                        this.viewer instanceof viewer_1.PageLayoutViewer) {
                        isPageBreak = true;
                    }
                    if (previousBlock instanceof page_1.ParagraphWidget && previousBlock.isEndsWithColumnBreak &&
                        this.viewer instanceof viewer_1.PageLayoutViewer) {
                        isColumnBreak = true;
                    }
                    var isSplittedToNewPage = this.splitWidget(widget, viewer, prevBodyWidget, index + 1, isPageBreak, footWidget, isColumnBreak);
                    this.updateFloatingElementPosition(widget);
                    prevWidget = undefined;
                    if (prevBodyWidget !== widget.containerWidget) {
                        prevBodyWidget = widget.containerWidget;
                        i--;
                        if (footWidget.length > 0) {
                            skipFootNoteHeight = true;
                        }
                    }
                    index = prevBodyWidget.childWidgets.indexOf(widget);
                    if (isSplittedToNewPage) {
                        prevBodyWidget = paragraph.getSplitWidgets()[i + 1].containerWidget;
                    }
                }
            }
            this.skipUpdateContainerWidget = false;
        };
        Layout.prototype.updateFloatingElementPosition = function (widget) {
            if (widget.floatingElements.length > 0) {
                for (var k = 0; k < widget.floatingElements.length; k++) {
                    var shape = widget.floatingElements[k];
                    var topMargin = 0;
                    if (shape instanceof page_1.ShapeElementBox && shape.textWrappingStyle === 'Inline') {
                        var lineIndex = shape.line.indexInOwner;
                        var lineHeight = 0;
                        topMargin = editor_helper_1.HelperMethods.convertPointToPixel(shape.textFrame.marginTop);
                        for (var k_1 = 0; k_1 < lineIndex; k_1++) {
                            if (!ej2_base_1.isNullOrUndefined(widget.childWidgets[k_1])) {
                                lineHeight += widget.childWidgets[k_1].height;
                            }
                        }
                        shape.y = widget.y + lineHeight;
                    }
                    else {
                        var position = this.getFloatingItemPoints(shape);
                        shape.y = position.y;
                        shape.x = position.x;
                    }
                    if (shape instanceof page_1.ShapeElementBox) {
                        this.updateChildLocationForCellOrShape(shape.y + topMargin, shape, undefined, false, true);
                    }
                }
            }
        };
        Layout.prototype.isPageBreakInsideField = function (widget) {
            var isPageBreakInsideField = false;
            var isFieldElement = false;
            var height = 0;
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var line = widget.childWidgets[i];
                height += line.height;
                for (var j = 0; j < line.children.length; j++) {
                    var element = line.children[j];
                    if (element instanceof page_1.FieldElementBox) {
                        if (element.fieldType === 0) {
                            isFieldElement = true;
                        }
                        else if (element.fieldType === 2 || element.fieldType === 1) {
                            isFieldElement = false;
                        }
                    }
                    if (!isFieldElement && element.text === '\f') {
                        isPageBreakInsideField = false;
                    }
                    else {
                        isPageBreakInsideField = true;
                    }
                }
            }
            if (isPageBreakInsideField && widget.height === 0) {
                this.viewer.cutFromTop(this.viewer.clientActiveArea.y + height);
            }
            return isPageBreakInsideField;
        };
        Layout.prototype.getFootNotesOfBlock = function (widget, footnoteElements) {
            if (ej2_base_1.isNullOrUndefined(footnoteElements)) {
                footnoteElements = [];
            }
            if (widget.childWidgets.length > 0) {
                for (var j = 0; j < this.documentHelper.footnoteCollection.length; j++) {
                    if (this.documentHelper.footnoteCollection[j].line.paragraph === widget) {
                        footnoteElements.push(this.documentHelper.footnoteCollection[j]);
                    }
                }
            }
            return footnoteElements;
        };
        Layout.prototype.getFootNotesWidgetsInLine = function (line) {
            var footnoteElements = [];
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof page_1.FootnoteElementBox) {
                    footnoteElements.push(element);
                }
            }
            return this.getFootNoteWidgetsBy(line.paragraph, footnoteElements);
        };
        Layout.prototype.getFootNoteWidgetsBy = function (widget, footnoteElements) {
            var footWidgets = [];
            if (widget.bodyWidget.page.footnoteWidget) {
                for (var i = 0; i < widget.bodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                    for (var j = 0; j < footnoteElements.length; j++) {
                        if ((widget.bodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                            footWidgets.push(widget.bodyWidget.page.footnoteWidget.bodyWidgets[i]);
                        }
                    }
                }
            }
            if (footWidgets.length === 0 && (!ej2_base_1.isNullOrUndefined(widget.previousRenderedWidget) && widget.previousRenderedWidget.bodyWidget.page.footnoteWidget)) {
                for (var i = 0; i < widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                    for (var j = 0; j < footnoteElements.length; j++) {
                        if ((widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                            footWidgets.push(widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets[i]);
                        }
                    }
                }
            }
            else if (!ej2_base_1.isNullOrUndefined(widget.bodyWidget.previousRenderedWidget) && widget.bodyWidget.previousRenderedWidget.page.footnoteWidget) {
                for (var i = 0; i < widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                    for (var j = 0; j < footnoteElements.length; j++) {
                        if ((widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                            footWidgets.push(widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets[i]);
                        }
                    }
                }
            }
            else if (!ej2_base_1.isNullOrUndefined(widget.bodyWidget.nextRenderedWidget) && widget.bodyWidget.nextRenderedWidget.page.footnoteWidget) {
                for (var i = 0; i < widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                    for (var j = 0; j < footnoteElements.length; j++) {
                        if ((widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                            footWidgets.push(widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets[i]);
                        }
                    }
                }
            }
            return footWidgets;
        };
        Layout.prototype.getFootNoteWidgetsOf = function (widget, isShifting) {
            var footnoteWidgets = [];
            var footnoteElements = [];
            if (widget instanceof page_1.TableWidget) {
                for (var k_2 = 0; k_2 < widget.childWidgets.length; k_2++) {
                    var row = widget.childWidgets[k_2];
                    for (var i = 0; i < row.childWidgets.length; i++) {
                        var cell = row.childWidgets[i];
                        for (var x = 0; x < cell.childWidgets.length; x++) {
                            var block = cell.childWidgets[x];
                            footnoteElements = this.getFootNotesOfBlock(block, footnoteElements);
                            var blockfootnoteWidgets = this.getFootNoteWidgetsBy(block, footnoteElements);
                            for (var f = 0; f < blockfootnoteWidgets.length; f++) {
                                if (footnoteWidgets.indexOf(blockfootnoteWidgets[f]) === -1) {
                                    footnoteWidgets.push(blockfootnoteWidgets[f]);
                                }
                            }
                        }
                    }
                }
            }
            else {
                footnoteElements = this.getFootNotesOfBlock(widget);
                if (footnoteElements.length > 0) {
                    footnoteWidgets = this.getFootNoteWidgetsBy(widget, footnoteElements);
                }
                if (isShifting && footnoteWidgets.length === 0) {
                    for (var k = 0; k < footnoteElements.length; k++) {
                        footnoteWidgets.push(footnoteElements[k].bodyWidget);
                    }
                }
            }
            return footnoteWidgets;
        };
        Layout.prototype.getFootNodeWidgetsToShiftToPage = function (paragraph) {
            var splittedWidgets = paragraph.getSplitWidgets();
            var footNoteWidgets = [];
            var toBodyWidget = paragraph.containerWidget;
            var fromBodyWidget;
            for (var i = 0; i < splittedWidgets.length; i++) {
                var footWidgets = this.getFootNoteWidgetsOf(splittedWidgets[i]);
                for (var j = 0; j < footWidgets.length; j++) {
                    fromBodyWidget = footWidgets[j].containerWidget;
                    if (toBodyWidget !== fromBodyWidget) {
                        footNoteWidgets.push(footWidgets[j]);
                    }
                }
            }
            return { 'footNoteWidgets': footNoteWidgets, 'fromBodyWidget': fromBodyWidget, 'toBodyWidget': toBodyWidget };
        };
        Layout.prototype.shiftTableWidget = function (table, viewer, isClearHeight) {
            if (isClearHeight === void 0) { isClearHeight = false; }
            var tables = [table];
            this.addTableWidget(this.viewer.clientActiveArea, tables);
            this.viewer.updateClientAreaTopOrLeft(table, true);
            var clientActiveAreaForTableWrap;
            var clientAreaForTableWrap;
            if (table.wrapTextAround) {
                clientActiveAreaForTableWrap = this.viewer.clientActiveArea.clone();
                clientAreaForTableWrap = this.viewer.clientArea.clone();
                this.updateClientAreaForWrapTable(tables, table, true, clientActiveAreaForTableWrap, clientAreaForTableWrap);
            }
            var row = table.childWidgets[0];
            while (row) {
                row = this.shiftRowWidget(tables, row, isClearHeight);
                row = row.nextRow;
            }
            this.updateWidgetsToPage(tables, [], table, true);
            if (table.wrapTextAround && table.bodyWidget) {
                this.updateClientAreaForWrapTable(tables, table, false, clientActiveAreaForTableWrap, clientAreaForTableWrap);
            }
            return tables[tables.length - 1];
        };
        Layout.prototype.shiftRowWidget = function (tables, row, isClearHeight) {
            if (isClearHeight === void 0) { isClearHeight = false; }
            var viewer = this.viewer;
            if (isClearHeight) {
                row.height = 0;
            }
            var isNestedTable = row.ownerTable.isInsideTable;
            if (!isNestedTable) {
                this.updateExistingFootnoteHeight(row);
            }
            var rows = [row];
            this.addTableRowWidget(viewer.clientActiveArea, rows);
            viewer.updateClientAreaForRow(row, true);
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                if (isClearHeight) {
                    cell.height = 0;
                }
                this.shiftCellWidget(cell, this.getMaxTopCellMargin(row) + row.topBorderWidth, this.getMaxBottomCellMargin(row) + row.bottomBorderWidth, isClearHeight);
            }
            viewer.updateClientAreaForRow(row, false);
            if (!isNestedTable) {
                var footheight = this.footnoteHeight;
                this.updateFootnoteToBody(row, this.layoutedFootnoteElement);
                this.footnoteHeight = footheight;
            }
            this.updateWidgetsToTable(tables, rows, row, false);
            if (!isNestedTable) {
                this.layoutedFootnoteElement = [];
            }
            return rows[rows.length - 1];
        };
        Layout.prototype.updateFootnoteToBody = function (row, footnoteElements) {
            this.layoutFootnoteInSplittedRow(row, this.getFootnoteBody(footnoteElements));
            if (ej2_base_1.isNullOrUndefined(row.ownerTable.footnoteElement)) {
                row.ownerTable.footnoteElement = [];
            }
            for (var i = 0; i < footnoteElements.length; i++) {
                row.ownerTable.footnoteElement.push(footnoteElements[i]);
            }
        };
        Layout.prototype.getFootnoteBody = function (footnoteElements) {
            var footnoteWidgets = [];
            for (var i = 0; i < footnoteElements.length; i++) {
                footnoteWidgets.push(footnoteElements[i].bodyWidget);
            }
            return footnoteWidgets;
        };
        Layout.prototype.shiftCellWidget = function (cell, maxCellMarginTop, maxCellMarginBottom, isClearHeight) {
            if (ej2_base_1.isNullOrUndefined(isClearHeight)) {
                isClearHeight = false;
            }
            var viewer = this.viewer;
            this.addTableCellWidget(cell, viewer.clientActiveArea, maxCellMarginTop, maxCellMarginBottom);
            var clientHeight = this.viewer.clientActiveArea.height;
            viewer.updateClientAreaForCell(cell, true);
            for (var i = 0; i < cell.childWidgets.length; i++) {
                var block = cell.childWidgets[i];
                viewer.updateClientAreaForBlock(block, true);
                if (block instanceof page_1.ParagraphWidget) {
                    this.shiftParagraphWidget(block);
                }
                else {
                    this.shiftTableWidget(block, viewer, isClearHeight);
                }
                viewer.updateClientAreaForBlock(block, false);
            }
            this.updateWidgetToRow(cell);
            viewer.updateClientAreaForCell(cell, false);
            if (!cell.ownerTable.isInsideTable) {
                this.viewer.clientActiveArea.height = clientHeight;
            }
        };
        Layout.prototype.shiftParagraphWidget = function (paragraph) {
            this.addParagraphWidget(this.viewer.clientActiveArea, paragraph);
            if (paragraph.floatingElements.length > 0) {
                for (var k = 0; k < paragraph.floatingElements.length; k++) {
                    var shape = paragraph.floatingElements[k];
                    var topMargin = 0;
                    if (shape instanceof page_1.ShapeElementBox && shape.textWrappingStyle === 'Inline') {
                        var lineIndex = shape.line.indexInOwner;
                        var lineHeight = 0;
                        topMargin = editor_helper_1.HelperMethods.convertPointToPixel(shape.textFrame.marginTop);
                        for (var k_3 = 0; k_3 < lineIndex; k_3++) {
                            lineHeight += paragraph.childWidgets[k_3].height;
                        }
                        shape.y = paragraph.y + lineHeight;
                    }
                    else {
                        var position = this.getFloatingItemPoints(shape);
                        shape.y = position.y;
                        shape.x = position.x;
                    }
                    if (shape instanceof page_1.ShapeElementBox) {
                        this.updateChildLocationForCellOrShape(shape.y + topMargin, shape);
                    }
                }
            }
            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + paragraph.height);
            var footnoteCollection = this.getFootNoteWidgetsOf(paragraph, true);
            for (var i = 0; i < footnoteCollection.length; i++) {
                this.layoutedFootnoteElement.push(footnoteCollection[i].footNoteReference);
            }
            this.footnoteHeight += this.getFootNoteHeight(footnoteCollection);
            this.updateWidgetToPage(this.viewer, paragraph);
        };
        Layout.prototype.updateContainerForTable = function (block, viewer) {
            var prevObj = this.getBodyWidgetOfPreviousBlock(block, 0);
            var prevBodyWidget = prevObj.bodyWidget;
            var index = prevObj.index;
            var isPageBreak = prevBodyWidget.lastChild.lastChild.isEndsWithPageBreak;
            var isColumnBreak = prevBodyWidget.lastChild.lastChild.isEndsWithColumnBreak;
            if (prevBodyWidget !== block.containerWidget) {
                if (!isPageBreak && !isColumnBreak) {
                    this.updateContainerWidget(block, prevBodyWidget, index + 1, true);
                }
                else {
                    viewer.updateClientArea(block.bodyWidget, block.bodyWidget.page);
                }
            }
            if (block.isInHeaderFooter || this.viewer instanceof viewer_1.WebLayoutViewer) {
                block.containerWidget.height -= block.height;
            }
        };
        Layout.prototype.shiftWidgetsForTable = function (table, viewer) {
            this.updateContainerForTable(table, viewer);
            this.viewer.updateClientAreaForBlock(table, true);
            var tempClientAreaX = this.viewer.clientArea.x;
            if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
                this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                    editor_helper_1.HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
            }
            this.updateVerticalPositionToTop(table, true);
            var combinedTable = table.combineWidget(this.viewer);
            this.documentHelper.layout.updateChildLocationForTable(combinedTable.y, combinedTable);
            this.clearTableWidget(combinedTable, true, false, false, true);
            this.shiftTableWidget(combinedTable, this.viewer);
            this.updateVerticalPositionToTop(table, false);
            if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
                this.viewer.clientArea.x = tempClientAreaX;
            }
            this.viewer.updateClientAreaForBlock(table, false);
        };
        Layout.prototype.updateVerticalPositionToTop = function (table, isUpdateTop) {
            for (var i = 0; i < table.getSplitWidgets().length; i++) {
                var tablewidget = table.getSplitWidgets()[i];
                for (var j = 0; j < tablewidget.childWidgets.length; j++) {
                    var rowWidget = tablewidget.childWidgets[j];
                    for (var k = 0; k < rowWidget.childWidgets.length; k++) {
                        var cellWidget = rowWidget.childWidgets[k];
                        this.documentHelper.layout.updateCellVerticalPosition(cellWidget, isUpdateTop, false);
                    }
                }
            }
        };
        Layout.prototype.splitWidget = function (paragraphWidget, viewer, previousBodyWidget, index, isPageBreak, footWidget, isColumnBreak) {
            var firstLine = paragraphWidget.childWidgets[0];
            var keepLinesTogether = (paragraphWidget.paragraphFormat.keepLinesTogether && (this.viewer.clientActiveArea.y !== this.viewer.clientArea.y));
            var maxElementHeight = keepLinesTogether ? paragraphWidget.height : this.getMaxElementHeight(firstLine);
            var paragraphView = paragraphWidget.getSplitWidgets();
            var nextBodyWidget = paragraphWidget.containerWidget;
            maxElementHeight = this.getMaximumLineHeightToSplit(paragraphWidget, maxElementHeight, viewer);
            var footNoteInFirstLine = this.getFootNotesWidgetsInLine(firstLine);
            if (ej2_base_1.isNullOrUndefined(paragraphWidget.previousWidget) && footNoteInFirstLine.length > 0) {
                for (var i = 0; i < footNoteInFirstLine.length; i++) {
                    for (var j = 0; j < footNoteInFirstLine[i].childWidgets.length; j++) {
                        maxElementHeight += footNoteInFirstLine[i].childWidgets[j].height;
                    }
                }
            }
            if (viewer.clientActiveArea.height >= maxElementHeight && !isPageBreak && !isColumnBreak) {
                var splittedWidget = undefined;
                var widgetIndex = paragraphView.indexOf(paragraphWidget);
                if (widgetIndex < (paragraphView.length - 1)) {
                    splittedWidget = paragraphView[widgetIndex + 1];
                    nextBodyWidget = splittedWidget.containerWidget;
                }
                else {
                    splittedWidget = new page_1.ParagraphWidget();
                    splittedWidget.index = paragraphWidget.index;
                    splittedWidget.characterFormat = paragraphWidget.characterFormat;
                    splittedWidget.paragraphFormat = paragraphWidget.paragraphFormat;
                    splittedWidget.width = paragraphWidget.width;
                    splittedWidget.x = paragraphWidget.x;
                    splittedWidget.y = paragraphWidget.y;
                    paragraphView.push(splittedWidget);
                }
                if (previousBodyWidget !== paragraphWidget.containerWidget && !this.skipUpdateContainerWidget) {
                    this.updateContainerWidget(paragraphWidget, previousBodyWidget, index, true);
                }
                for (var i = paragraphWidget.childWidgets.length - 1; i > 0; i--) {
                    var line = paragraphWidget.childWidgets[i];
                    if (this.isFitInClientArea(paragraphWidget, viewer, undefined)) {
                        if (splittedWidget.childWidgets.length === 1) {
                            this.updateParagraphWidgetInternal(line, splittedWidget, 0);
                            this.skipUpdateContainerWidget = true;
                        }
                        break;
                    }
                    else {
                        var line_1 = paragraphWidget.childWidgets[i];
                        this.updateParagraphWidgetInternal(line_1, splittedWidget, 0);
                    }
                }
                if (ej2_base_1.isNullOrUndefined(splittedWidget.containerWidget) && splittedWidget.childWidgets.length > 0) {
                    var y = viewer.clientActiveArea.y;
                    var clientArea = new page_1.Rect(viewer.clientArea.x, viewer.clientArea.y, viewer.clientArea.width, viewer.clientArea.height);
                    var activeArea = new page_1.Rect(viewer.clientActiveArea.x, viewer.clientActiveArea.y, viewer.clientActiveArea.width, viewer.clientActiveArea.height);
                    var prevPage = paragraphWidget.bodyWidget.page;
                    nextBodyWidget = this.moveBlocksToNextPage(paragraphWidget, false, -1);
                    splittedWidget.containerWidget = nextBodyWidget;
                    nextBodyWidget.childWidgets.splice(0, 0, splittedWidget);
                    if (prevPage !== nextBodyWidget.page) {
                        nextBodyWidget.height += splittedWidget.height;
                        if (nextBodyWidget != previousBodyWidget) {
                            this.moveFootNotesToPage(footWidget, previousBodyWidget, nextBodyWidget);
                        }
                        if (nextBodyWidget.childWidgets.length === 1 && nextBodyWidget.firstChild instanceof page_1.ParagraphWidget &&
                            nextBodyWidget.firstChild.equals(paragraphWidget)) {
                            paragraphWidget.y = y;
                            return true;
                        }
                        else {
                            viewer.clientArea = clientArea;
                            viewer.clientActiveArea = activeArea;
                        }
                    }
                    else {
                        if (paragraphWidget.x !== paragraphWidget.containerWidget.x) {
                            paragraphWidget.x = paragraphWidget.containerWidget.x;
                        }
                        paragraphWidget.y = y;
                        viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                        splittedWidget = this.addParagraphWidget(this.viewer.clientActiveArea, splittedWidget);
                        return true;
                    }
                }
            }
            else {
                var startBlock = void 0;
                var keepWithNext = false;
                viewer.columnLayoutArea.setColumns(previousBodyWidget.sectionFormat);
                nextBodyWidget = this.createOrGetNextBodyWidget(previousBodyWidget, this.viewer);
                var blockInfo = this.alignBlockElement(paragraphWidget);
                if (!this.isInitialLoad && !ej2_base_1.isNullOrUndefined(blockInfo.node) && !paragraphWidget.isEndsWithPageBreak && !paragraphWidget.isEndsWithColumnBreak) {
                    startBlock = blockInfo.node instanceof page_1.TableRowWidget ? this.splitRow(blockInfo.node) : blockInfo.node;
                    if (startBlock.containerWidget instanceof page_1.BodyWidget && startBlock.containerWidget.firstChild !== startBlock) {
                        paragraphWidget = startBlock;
                        keepWithNext = true;
                        if (!ej2_base_1.isNullOrUndefined(paragraphWidget.nextRenderedWidget) && paragraphWidget.nextRenderedWidget instanceof page_1.ParagraphWidget) {
                            this.keepWithNext = true;
                            this.documentHelper.blockToShift = paragraphWidget.nextRenderedWidget;
                        }
                    }
                }
                if (paragraphWidget.containerWidget !== nextBodyWidget || keepWithNext) {
                    var prevPage = paragraphWidget.bodyWidget.page;
                    nextBodyWidget = this.moveBlocksToNextPage(paragraphWidget, true);
                    if (previousBodyWidget !== nextBodyWidget) {
                        viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                        this.updateContainerWidget(paragraphWidget, nextBodyWidget, 0, true);
                        this.addParagraphWidget(this.viewer.clientActiveArea, paragraphWidget);
                        this.moveFootNotesToPage(footWidget, previousBodyWidget, nextBodyWidget);
                    }
                    if (previousBodyWidget.page === nextBodyWidget.page) {
                        if (previousBodyWidget === nextBodyWidget) {
                            viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                            return false;
                        }
                        return true;
                    }
                }
            }
            if (previousBodyWidget === paragraphWidget.containerWidget) {
                if (paragraphWidget.x !== paragraphWidget.containerWidget.x) {
                    paragraphWidget.x = paragraphWidget.containerWidget.x;
                }
                paragraphWidget.y = viewer.clientActiveArea.y;
                viewer.cutFromTop(viewer.clientActiveArea.y + paragraphWidget.height);
            }
            else {
                viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
            }
            return false;
        };
        Layout.prototype.getMaximumLineHeightToSplit = function (paragraphWidget, maxElementHeight, viewer) {
            if (viewer.clientActiveArea.height >= maxElementHeight && !paragraphWidget.paragraphFormat.keepLinesTogether &&
                paragraphWidget.paragraphFormat.widowControl && !ej2_base_1.isNullOrUndefined(paragraphWidget.previousWidget) &&
                ej2_base_1.isNullOrUndefined(paragraphWidget.previousSplitWidget)) {
                var paragraphHeight = paragraphWidget.height;
                for (var m = paragraphWidget.childWidgets.length - 1; m >= 0; m--) {
                    var lastLine = paragraphWidget.childWidgets[m];
                    var lineHeight = this.getMaxElementHeight(lastLine);
                    if (lastLine.height > lineHeight) {
                        paragraphHeight -= lastLine.height - lineHeight;
                    }
                    if (viewer.clientActiveArea.height >= paragraphHeight) {
                        if (m === 0) {
                            maxElementHeight = paragraphWidget.height;
                        }
                        break;
                    }
                    paragraphHeight -= (lastLine).height;
                }
            }
            return maxElementHeight;
        };
        Layout.prototype.moveFootNotesToPage = function (footnoteWidgets, fromBodyWidget, toBodyWidget) {
            if (footnoteWidgets.length > 0 && fromBodyWidget.page.footnoteWidget && fromBodyWidget.page !== toBodyWidget.page) {
                var footNoteIndex = -1;
                var footNoteWidget = void 0;
                var insertIndex = 0;
                var check = false;
                for (var k = 0; k < footnoteWidgets.length; k++) {
                    footNoteWidget = footnoteWidgets[k];
                    footNoteIndex = fromBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footNoteWidget);
                    if (footNoteIndex >= 0) {
                        if (toBodyWidget.page.footnoteWidget === undefined) {
                            this.addEmptyFootNoteToBody(toBodyWidget);
                        }
                        for (var i = 0; i < toBodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                            var body = (toBodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference;
                            if (body === (footNoteWidget).footNoteReference) {
                                check = true;
                            }
                        }
                        fromBodyWidget.page.footnoteWidget.bodyWidgets.splice(footNoteIndex, 1);
                        if (toBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footNoteWidget) < 0 && !check) {
                            var childLength = toBodyWidget.page.footnoteWidget.bodyWidgets.length;
                            var fromPage = this.documentHelper.pages.indexOf(fromBodyWidget.page);
                            var toPage = this.documentHelper.pages.indexOf(toBodyWidget.page);
                            footNoteWidget.containerWidget = toBodyWidget.page.footnoteWidget;
                            footNoteWidget.page = toBodyWidget.page;
                            if (fromPage > toPage) {
                                toBodyWidget.page.footnoteWidget.bodyWidgets.push(footNoteWidget);
                                insertIndex++;
                            }
                            else {
                                toBodyWidget.page.footnoteWidget.bodyWidgets.splice(insertIndex++, 0, footNoteWidget);
                            }
                            toBodyWidget.page.footnoteWidget.height += footNoteWidget.height;
                        }
                        fromBodyWidget.page.footnoteWidget.height -= footNoteWidget.height;
                    }
                }
                if (fromBodyWidget.page.footnoteWidget && fromBodyWidget.page.footnoteWidget.bodyWidgets.length === 0) {
                    fromBodyWidget.page.footnoteWidget = undefined;
                }
                if (fromBodyWidget.page.footnoteWidget !== undefined) {
                    this.layoutfootNote(fromBodyWidget.page.footnoteWidget);
                }
                if (toBodyWidget.page.footnoteWidget !== undefined) {
                    this.layoutfootNote(toBodyWidget.page.footnoteWidget);
                }
            }
        };
        Layout.prototype.addEmptyFootNoteToBody = function (bodyWidget) {
            var footnoteWidget = new page_1.FootNoteWidget();
            footnoteWidget.footNoteType = 'Footnote';
            footnoteWidget.page = bodyWidget.page;
            var newParagraph = new page_1.ParagraphWidget();
            newParagraph.characterFormat = new index_1.WCharacterFormat();
            newParagraph.paragraphFormat = new index_1.WParagraphFormat();
            newParagraph.index = 0;
            var lineWidget = new page_1.LineWidget(newParagraph);
            newParagraph.childWidgets.push(lineWidget);
            footnoteWidget.height = this.documentHelper.textHelper.getParagraphMarkSize(newParagraph.characterFormat).Height;
            footnoteWidget.margin = new page_1.Margin(0, footnoteWidget.height, 0, 0);
            bodyWidget.page.footnoteWidget = footnoteWidget;
        };
        Layout.prototype.getMaxElementHeight = function (lineWidget) {
            var height = 0;
            if (lineWidget.children.length === 0 || ((lineWidget.children.length === 1 && lineWidget.children[0] instanceof page_1.ListTextElementBox) || (lineWidget.children.length === 2 && lineWidget.children[0] instanceof page_1.ListTextElementBox && lineWidget.children[1] instanceof page_1.ListTextElementBox))) {
                var topMargin = 0;
                var bottomMargin = 0;
                height = this.documentHelper.selection.getParagraphMarkSize(lineWidget.paragraph, topMargin, bottomMargin).height;
                height += topMargin;
                if (lineWidget.children.length > 0) {
                    var element = lineWidget.children[0];
                    if (height < element.margin.top + element.height) {
                        height = element.margin.top + element.height;
                    }
                }
            }
            else {
                for (var i = 0; i < lineWidget.children.length; i++) {
                    var element = lineWidget.children[i];
                    if (height < element.margin.top + element.height) {
                        height = element.margin.top + element.height;
                    }
                }
            }
            return height;
        };
        Layout.prototype.createOrGetNextBodyWidget = function (bodyWidget, viewer) {
            viewer.columnLayoutArea.setColumns(bodyWidget.sectionFormat);
            var nextColumn = viewer.columnLayoutArea.getNextColumnByBodyWidget(bodyWidget);
            if (!ej2_base_1.isNullOrUndefined(nextColumn)) {
                var nextColumnBody = this.createOrGetNextColumnBody(bodyWidget);
                return nextColumnBody;
            }
            var nextBodyWidget = undefined;
            var pageIndex = 0;
            pageIndex = this.documentHelper.pages.indexOf(bodyWidget.page);
            var page = undefined;
            var index = undefined;
            index = bodyWidget.index;
            if (pageIndex === this.documentHelper.pages.length - 1
                || this.documentHelper.pages[pageIndex + 1].sectionIndex !== index) {
                var currentWidget = new page_1.BodyWidget();
                currentWidget.sectionFormat = bodyWidget.sectionFormat;
                currentWidget.index = bodyWidget.index;
                page = viewer.createNewPage(currentWidget);
                if (this.documentHelper.pages[pageIndex + 1].sectionIndex !== index) {
                    this.documentHelper.insertPage(pageIndex + 1, page);
                }
                nextBodyWidget = page.bodyWidgets[0];
            }
            else {
                page = this.documentHelper.pages[pageIndex + 1];
                nextBodyWidget = page.bodyWidgets[0];
            }
            return nextBodyWidget;
        };
        Layout.prototype.isFitInClientArea = function (paragraphWidget, viewer, blocks) {
            var lastLine = paragraphWidget.childWidgets[paragraphWidget.childWidgets.length - 1];
            var height = paragraphWidget.height;
            var maxElementHeight = this.getMaxElementHeight(lastLine);
            if (lastLine.height > maxElementHeight) {
                height -= lastLine.height - maxElementHeight;
            }
            var footHeight = 0;
            if (!ej2_base_1.isNullOrUndefined(blocks)) {
                if (blocks.length > 0) {
                    if (blocks[0].containerWidget instanceof page_1.FootNoteWidget) {
                        footHeight = blocks[0].containerWidget.margin.top;
                    }
                    for (var k = 0; k < blocks.length; k++) {
                        for (var l = 0; l < blocks[k].childWidgets.length; l++) {
                            footHeight += blocks[k].childWidgets[l].height;
                        }
                    }
                }
            }
            return viewer.clientActiveArea.height >= height + footHeight;
        };
        Layout.prototype.isLineInFootNote = function (line, footNotes) {
            for (var i = 0; i < footNotes.length; i++) {
                if (footNotes[i].line === line) {
                    return true;
                }
            }
            return false;
        };
        Layout.prototype.shiftToPreviousWidget = function (paragraphWidget, viewer, previousWidget, isPageBreak, isColumnBreak) {
            var fromBodyWidget = paragraphWidget.containerWidget;
            var toBodyWidget = previousWidget.containerWidget;
            var footNotes = [];
            var footNoteWidgets = [];
            if (toBodyWidget !== fromBodyWidget) {
                footNotes = this.getFootNotesOfBlock(paragraphWidget);
            }
            for (var i = 0; i < paragraphWidget.childWidgets.length; i++) {
                var line = paragraphWidget.childWidgets[i];
                var maxElementHeight = this.getMaxElementHeight(line);
                if (this.isLineInFootNote(line, footNotes)) {
                    var footWidget = this.getFootNoteWidgetsBy(line.paragraph, footNotes);
                    var height = 0;
                    for (var m = 0; m < footWidget.length; m++) {
                        var footContent = footWidget[m];
                        for (var n = 0; n < footContent.childWidgets.length; n++) {
                            height += footContent.childWidgets[n].height;
                        }
                    }
                    if (footWidget.length > 0 && footWidget[0].containerWidget) {
                        height += footWidget[0].containerWidget.margin.top;
                    }
                    maxElementHeight += height;
                }
                if (viewer.clientActiveArea.height >= maxElementHeight && !isPageBreak && !isColumnBreak) {
                    if (footNotes.length > 0 && this.isLineInFootNote(line, footNotes)) {
                        footNoteWidgets = footNoteWidgets.concat(this.getFootNoteWidgetsBy(line.paragraph, footNotes));
                    }
                    this.updateParagraphWidgetInternal(line, previousWidget, previousWidget.childWidgets.length);
                    i--;
                    viewer.cutFromTop(viewer.clientActiveArea.y + line.height);
                    if (ej2_base_1.isNullOrUndefined(paragraphWidget.childWidgets)) {
                        break;
                    }
                }
                else {
                    var bodyWidget = previousWidget.containerWidget;
                    viewer.updateClientArea(bodyWidget, bodyWidget.page);
                    var newBodyWidget = this.createOrGetNextBodyWidget(bodyWidget, viewer);
                    if (paragraphWidget.containerWidget !== newBodyWidget) {
                        newBodyWidget = this.moveBlocksToNextPage(paragraphWidget, true);
                    }
                    if (bodyWidget !== newBodyWidget) {
                        footNotes = this.getFootNotesOfBlock(paragraphWidget);
                        if (footNotes.length > 0) {
                            footNoteWidgets = footNoteWidgets.concat(this.getFootNoteWidgetsBy(paragraphWidget, footNotes));
                            toBodyWidget = newBodyWidget;
                        }
                        this.updateContainerWidget(paragraphWidget, newBodyWidget, 0, true);
                    }
                    viewer.updateClientArea(newBodyWidget, newBodyWidget.page);
                    break;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(footNoteWidgets) && footNoteWidgets.length > 0 && fromBodyWidget.page.footnoteWidget
                && fromBodyWidget != toBodyWidget) {
                this.moveFootNotesToPage(footNoteWidgets, fromBodyWidget, toBodyWidget);
            }
        };
        Layout.prototype.updateParagraphWidgetInternal = function (lineWidget, newParagraphWidget, index) {
            if (!ej2_base_1.isNullOrUndefined(lineWidget.paragraph)) {
                lineWidget.paragraph.childWidgets.splice(lineWidget.paragraph.childWidgets.indexOf(lineWidget), 1);
                lineWidget.paragraph.height -= lineWidget.height;
                if (!ej2_base_1.isNullOrUndefined(lineWidget.paragraph.containerWidget)) {
                    lineWidget.paragraph.containerWidget.height -= lineWidget.height;
                }
                if (ej2_base_1.isNullOrUndefined(lineWidget.paragraph.childWidgets) || lineWidget.paragraph.childWidgets.length === 0) {
                    lineWidget.paragraph.destroyInternal(this.viewer);
                }
            }
            if (!ej2_base_1.isNullOrUndefined(lineWidget.paragraph) && lineWidget.paragraph.floatingElements.length > 0) {
                this.shiftFloatingElements(lineWidget, newParagraphWidget);
            }
            newParagraphWidget.childWidgets.splice(index, 0, lineWidget);
            lineWidget.paragraph = newParagraphWidget;
            newParagraphWidget.height += lineWidget.height;
            if (!ej2_base_1.isNullOrUndefined(newParagraphWidget.containerWidget)) {
                newParagraphWidget.containerWidget.height += lineWidget.height;
            }
        };
        Layout.prototype.shiftFloatingElements = function (lineWidget, newParagraphWidget) {
            for (var i = 0; i < lineWidget.children.length; i++) {
                if (lineWidget.children[i] instanceof page_1.ShapeElementBox && lineWidget.children[i].textWrappingStyle === 'Inline') {
                    var index = lineWidget.paragraph.floatingElements.indexOf(lineWidget.children[i]);
                    if (index >= 0) {
                        lineWidget.paragraph.floatingElements.splice(index, 1);
                        newParagraphWidget.floatingElements.splice(index, 0, lineWidget.children[i]);
                    }
                }
            }
        };
        Layout.prototype.shiftNextWidgets = function (blockAdv) {
            var block = blockAdv;
            while (block.nextWidget instanceof page_1.BlockWidget) {
                block = block.nextWidget;
                if (this.viewer instanceof viewer_1.PageLayoutViewer && !this.isMultiColumnSplit && block.bodyWidget.sectionFormat.columns.length > 1) {
                    var lastbody = this.getBodyWidget(block.bodyWidget, false);
                    if ((!ej2_base_1.isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.page === lastbody.nextRenderedWidget.page)) {
                        this.splitBodyWidgetBasedOnColumn(block.bodyWidget);
                        break;
                    }
                }
                this.reLayoutOrShiftWidgets(block, this.viewer);
            }
        };
        Layout.prototype.updateContainerWidget = function (widget, bodyWidget, index, destroyAndScroll, footWidget) {
            if (widget.containerWidget && widget.containerWidget.containerWidget instanceof page_1.FootNoteWidget) {
                return;
            }
            var previousWidget = widget.containerWidget;
            if (!ej2_base_1.isNullOrUndefined(widget.containerWidget)) {
                widget.containerWidget.childWidgets.splice(widget.containerWidget.childWidgets.indexOf(widget), 1);
                widget.containerWidget.height -= bodyWidget.height;
                if ((ej2_base_1.isNullOrUndefined(widget.containerWidget.childWidgets) || widget.containerWidget.childWidgets.length === 0)
                    && widget.containerWidget instanceof page_1.BodyWidget && widget.containerWidget !== bodyWidget && destroyAndScroll) {
                    var page = widget.containerWidget.page;
                    if (this.documentHelper.pages[this.documentHelper.pages.length - 1] === page &&
                        this.viewer.visiblePages.indexOf(page) !== -1) {
                        this.documentHelper.scrollToBottom();
                    }
                    if (ej2_base_1.isNullOrUndefined(page.nextPage) || page.nextPage.bodyWidgets[0].index !== widget.containerWidget.index) {
                        var section = widget.containerWidget;
                        if (!ej2_base_1.isNullOrUndefined(section.nextRenderedWidget) && section.nextRenderedWidget.sectionFormat.columns.length > 1) {
                            section.nextRenderedWidget.columnIndex = section.columnIndex;
                        }
                        widget.containerWidget.destroyInternal(this.viewer);
                    }
                }
            }
            bodyWidget.childWidgets.splice(index, 0, widget);
            if (widget instanceof page_1.ParagraphWidget && !ej2_base_1.isNullOrUndefined(widget.floatingElements)) {
                for (var i = 0; i < widget.floatingElements.length; i++) {
                    var shape = widget.floatingElements[i];
                    if (shape.textWrappingStyle !== 'Inline') {
                        bodyWidget.floatingElements.push(shape);
                        widget.bodyWidget.floatingElements.splice(widget.bodyWidget.floatingElements.indexOf(shape), 1);
                        bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
                    }
                }
            }
            if (widget instanceof page_1.TableWidget && widget.wrapTextAround
                && widget.bodyWidget.floatingElements.indexOf(widget) !== -1) {
                widget.bodyWidget.floatingElements.splice(widget.bodyWidget.floatingElements.indexOf(widget), 1);
            }
            bodyWidget.height += bodyWidget.height;
            widget.containerWidget = bodyWidget;
            if (previousWidget && previousWidget.page && previousWidget.page.footnoteWidget && footWidget && footWidget.length > 0) {
                this.moveFootNotesToPage(footWidget, previousWidget, bodyWidget);
            }
        };
        Layout.prototype.getBodyWidgetOfPreviousBlock = function (block, index) {
            index = 0;
            var prevBodyWidget = undefined;
            var previousBlock = block.previousRenderedWidget;
            prevBodyWidget = (previousBlock && previousBlock.containerWidget.equals(block.containerWidget)) ?
                previousBlock.containerWidget : block.containerWidget;
            index = previousBlock && previousBlock.containerWidget.equals(block.containerWidget) ?
                prevBodyWidget.childWidgets.indexOf(previousBlock) : block.containerWidget.childWidgets.indexOf(block);
            return { bodyWidget: prevBodyWidget, index: index };
        };
        Layout.prototype.moveBlocksToNextPage = function (block, moveFootnoteFromLastBlock, childStartIndex, sectionBreakContinuous) {
            var body = block.bodyWidget;
            this.viewer.columnLayoutArea.setColumns(body.sectionFormat);
            var nextColumn = this.viewer.columnLayoutArea.getNextColumnByBodyWidget(block.bodyWidget);
            var nextPage = undefined;
            var nextBody = undefined;
            if (!ej2_base_1.isNullOrUndefined(nextColumn) && !(block instanceof page_1.ParagraphWidget && block.isEndsWithPageBreak)) {
                nextBody = this.moveToNextColumnByBodyWidget(block, childStartIndex);
                nextBody.columnIndex = nextColumn.index;
                nextBody.y = block.bodyWidget.y;
                this.viewer.updateClientArea(nextBody, nextBody.page);
                this.viewer.clientActiveArea.height -= nextBody.y - this.viewer.clientActiveArea.y;
                this.viewer.clientActiveArea.y = nextBody.y;
                if (block.bodyWidget.sectionFormat.columns.length > 1) {
                    var columnIndex = block.bodyWidget.columnIndex;
                    var columnWidth = block.bodyWidget.x + block.bodyWidget.sectionFormat.columns[columnIndex].width + block.bodyWidget.sectionFormat.columns[columnIndex].space;
                    for (var j = 0; j < block.bodyWidget.floatingElements.length; j++) {
                        if (block.bodyWidget.floatingElements[j] instanceof page_1.ShapeElementBox && columnWidth < block.bodyWidget.floatingElements[j].x + block.bodyWidget.floatingElements[j].width) {
                            nextBody.floatingElements.push(block.bodyWidget.floatingElements[j]);
                        }
                    }
                }
            }
            if (ej2_base_1.isNullOrUndefined(nextBody)) {
                var insertPage = false;
                var page = body.page;
                var pageIndex = page.index + 1;
                if (this.documentHelper.pages.length > pageIndex) {
                    nextPage = this.documentHelper.pages[pageIndex];
                    if (!ej2_base_1.isNullOrUndefined(nextPage) && nextPage.bodyWidgets.length !== 0 && body.sectionFormat.pageHeight === nextPage.bodyWidgets[0].sectionFormat.pageHeight && body.sectionFormat.pageWidth === nextPage.bodyWidgets[0].sectionFormat.pageWidth && body.sectionFormat.breakCode === 'NoBreak') {
                        if (nextPage.bodyWidgets[0].index === body.index) {
                            nextBody = nextPage.bodyWidgets[0];
                            this.viewer.updateClientArea(nextBody, nextBody.page);
                        }
                        else {
                            nextBody = this.createSplitBody(body);
                            nextPage.bodyWidgets.splice(0, 0, nextBody);
                            nextBody.page = nextPage;
                            this.viewer.updateClientArea(nextBody, nextBody.page);
                            nextBody.y = this.viewer.clientActiveArea.y;
                        }
                    }
                    else if (nextPage.bodyWidgets.length === 0 || !body.equals(nextPage.bodyWidgets[0])) {
                        nextPage = undefined;
                        insertPage = true;
                    }
                    else {
                        nextBody = nextPage.bodyWidgets[0];
                        this.viewer.updateClientArea(nextBody, nextBody.page);
                    }
                }
                if (ej2_base_1.isNullOrUndefined(nextPage)) {
                    nextBody = this.createSplitBody(body);
                    if ((((this.documentHelper.owner.editorHistory &&
                        this.documentHelper.owner.editorHistory.isRedoing && this.documentHelper.owner.editorHistory.currentBaseHistoryInfo &&
                        this.documentHelper.owner.editorHistory.currentBaseHistoryInfo.action === 'SectionBreakContinuous')) && block.bodyWidget.sectionFormat.breakCode === 'NoBreak')
                        || sectionBreakContinuous) {
                    }
                    else {
                        nextPage = this.viewer.createNewPage(nextBody, pageIndex);
                        this.viewer.updateClientArea(nextBody, nextBody.page);
                        nextBody.y = this.viewer.clientActiveArea.y;
                    }
                    if (insertPage && !ej2_base_1.isNullOrUndefined(nextPage)) {
                        this.documentHelper.insertPage(pageIndex, nextPage);
                    }
                    this.clearLineMeasures();
                }
                if (nextPage) {
                    do {
                        var lastBody = body.page.bodyWidgets[body.page.bodyWidgets.length - 1];
                        if (this.isSectionBreakCont || body === lastBody || body.containerWidget instanceof page_1.FootNoteWidget) {
                            break;
                        }
                        body.page.bodyWidgets.splice(body.page.bodyWidgets.indexOf(lastBody), 1);
                        nextPage.bodyWidgets.splice(1, 0, lastBody);
                        lastBody.page = nextPage;
                    } while (true);
                }
            }
            if (this.isTextFormat) {
                var index = body.childWidgets.indexOf(block);
                var child = body.childWidgets.slice(index);
                body.childWidgets.splice(index);
                for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
                    var obj = child_1[_i];
                    nextBody.childWidgets.push(obj);
                    obj.containerWidget = nextBody;
                }
            }
            else {
                do {
                    var lastBlock = void 0;
                    if (body.lastChild instanceof page_1.FootNoteWidget) {
                        lastBlock = body.lastChild.previousWidget;
                    }
                    else {
                        lastBlock = body.lastChild;
                    }
                    if (moveFootnoteFromLastBlock) {
                        var footWidget = this.getFootNoteWidgetsOf(lastBlock);
                        this.moveFootNotesToPage(footWidget, body, nextBody);
                    }
                    if (block === lastBlock) {
                        break;
                    }
                    body.childWidgets.splice(body.childWidgets.indexOf(lastBlock), 1);
                    nextBody.childWidgets.splice(0, 0, lastBlock);
                    if (lastBlock instanceof page_1.TableWidget && (body.floatingElements.indexOf(lastBlock) !== -1)) {
                        body.floatingElements.splice(body.floatingElements.indexOf(lastBlock), 1);
                    }
                    if (lastBlock instanceof page_1.ParagraphWidget && lastBlock.floatingElements.length > 0) {
                        for (var m = 0; m < lastBlock.floatingElements.length; m++) {
                            if (body.floatingElements.indexOf(lastBlock.floatingElements[m]) !== -1 && lastBlock.floatingElements[m].textWrappingStyle !== 'Inline') {
                                body.floatingElements.splice(body.floatingElements.indexOf(lastBlock.floatingElements[m]), 1);
                                nextBody.floatingElements.push(lastBlock.floatingElements[m]);
                            }
                        }
                    }
                    lastBlock.containerWidget = nextBody;
                    nextBody.height += lastBlock.height;
                } while (true);
            }
            return nextBody;
        };
        Layout.prototype.createSplitBody = function (body) {
            var newBody = this.addBodyWidget(this.viewer.clientActiveArea);
            newBody.sectionFormat = body.sectionFormat;
            newBody.index = body.index;
            return newBody;
        };
        Layout.prototype.createOrGetNextColumnBody = function (fromBody) {
            var nextColumnBody;
            if (fromBody.nextRenderedWidget && fromBody.columnIndex + 1 === fromBody.nextRenderedWidget.columnIndex) {
                nextColumnBody = fromBody.nextRenderedWidget;
            }
            if (ej2_base_1.isNullOrUndefined(nextColumnBody)) {
                nextColumnBody = new page_1.BodyWidget();
                nextColumnBody.sectionFormat = fromBody.sectionFormat;
                nextColumnBody.index = fromBody.index;
                nextColumnBody.page = fromBody.page;
                nextColumnBody.y = fromBody.y;
                if (fromBody.containerWidget instanceof page_1.FootNoteWidget) {
                    fromBody.containerWidget.bodyWidgets.splice(fromBody.containerWidget.bodyWidgets.indexOf(fromBody) + 1, 0, nextColumnBody);
                    nextColumnBody.containerWidget = fromBody.containerWidget;
                }
                else {
                    fromBody.page.bodyWidgets.splice(fromBody.page.bodyWidgets.indexOf(fromBody) + 1, 0, nextColumnBody);
                }
            }
            return nextColumnBody;
        };
        Layout.prototype.moveToNextColumnByBodyWidget = function (block, childStartIndex) {
            var fromBody = block.containerWidget;
            var nextColumnBody = this.createOrGetNextColumnBody(fromBody);
            return nextColumnBody;
        };
        Layout.prototype.reLayoutLine = function (paragraph, lineIndex, isBidi, isSkip, isSkipList) {
            if (!this.documentHelper.owner.editor.isFootnoteElementRemoved) {
                this.isFootnoteContentChanged = false;
            }
            if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule && !isSkipList) {
                this.viewer.owner.editorModule.updateWholeListItems(paragraph);
            }
            var lineWidget;
            if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1) {
                lineWidget = paragraph.getSplitWidgets()[0].firstChild;
            }
            else {
                lineWidget = paragraph.childWidgets[lineIndex];
            }
            var lineToLayout;
            if (paragraph.containerWidget instanceof page_1.BodyWidget && paragraph.containerWidget.sectionFormat.numberOfColumns > 1 && paragraph.containerWidget.sectionFormat.equalWidth) {
                lineToLayout = lineWidget.previousLine;
            }
            if (ej2_base_1.isNullOrUndefined(lineToLayout)) {
                lineToLayout = lineWidget;
            }
            if (this.allowLayout) {
                lineToLayout.paragraph.splitTextRangeByScriptType(lineToLayout.indexInOwner);
                lineToLayout.paragraph.splitLtrAndRtlText(lineToLayout.indexInOwner);
                lineToLayout.paragraph.combineconsecutiveRTL(lineToLayout.indexInOwner);
            }
            var bodyWidget = paragraph.containerWidget;
            bodyWidget.height -= paragraph.height;
            if ((this.viewer.owner.enableHeaderAndFooter || paragraph.isInHeaderFooter) && !(bodyWidget instanceof page_1.TextFrame)) {
                paragraph.bodyWidget.isEmpty = false;
                this.viewer.updateHeaderFooterClientAreaWithTop(paragraph.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(paragraph), bodyWidget.page);
            }
            else if (bodyWidget instanceof page_1.TextFrame) {
                this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
            }
            else {
                this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
            }
            this.viewer.updateClientAreaForBlock(paragraph, true);
            if (!ej2_base_1.isNullOrUndefined(paragraph.containerWidget) && !ej2_base_1.isNullOrUndefined(paragraph.containerWidget.containerWidget) && paragraph.containerWidget.containerWidget instanceof page_1.FootNoteWidget) {
                var y = paragraph.bodyWidget.containerWidget.y;
                this.viewer.cutFromTop(y);
                this.documentHelper.owner.editor.isFootNoteInsert = true;
                this.layoutfootNote(paragraph.containerWidget.containerWidget);
                this.documentHelper.owner.editor.isFootNoteInsert = false;
                return;
            }
            else if (lineToLayout.paragraph.isEmpty()) {
                this.viewer.cutFromTop(paragraph.y);
                this.layoutParagraph(paragraph, 0);
            }
            else {
                this.updateClientAreaForLine(lineToLayout);
                this.layoutListItems(lineToLayout.paragraph);
                if (lineToLayout.isFirstLine() && !ej2_base_1.isNullOrUndefined(paragraph.paragraphFormat)) {
                    var firstLineIndent = -editor_helper_1.HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
                    this.viewer.updateClientWidth(firstLineIndent);
                }
                do {
                    lineToLayout = this.layoutLine(lineToLayout, 0);
                    paragraph = lineToLayout.paragraph;
                    lineToLayout = lineToLayout.nextLine;
                } while (lineToLayout);
                this.updateWidgetToPage(this.viewer, paragraph);
                this.viewer.updateClientAreaForBlock(paragraph, false);
            }
            this.layoutNextItemsBlock(paragraph, this.viewer);
            var prevWidget = paragraph.getSplitWidgets()[0].previousRenderedWidget;
            if (!ej2_base_1.isNullOrUndefined(prevWidget) && !paragraph.isEndsWithPageBreak && !paragraph.isEndsWithColumnBreak && (!(prevWidget instanceof page_1.ParagraphWidget) ||
                (prevWidget instanceof page_1.ParagraphWidget) && !prevWidget.isEndsWithPageBreak && !prevWidget.isEndsWithColumnBreak)) {
                this.viewer.cutFromTop(paragraph.y + paragraph.height);
                if (paragraph.containerWidget !== prevWidget.containerWidget && !ej2_base_1.isNullOrUndefined(prevWidget.containerWidget)) {
                    var prevBodyWidget = paragraph.containerWidget;
                    var newBodyWidget_1 = prevWidget.containerWidget;
                    var footWidgets = this.getFootNoteWidgetsOf(paragraph);
                    if (!ej2_base_1.isNullOrUndefined(newBodyWidget_1.page.footnoteWidget)) {
                        this.moveFootNotesToPage(footWidgets, newBodyWidget_1, prevBodyWidget);
                    }
                }
            }
            var page = this.documentHelper.pages.length;
            var lastPage = this.documentHelper.pages[page - 1];
            var foot;
            var newBodyWidget = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
            if ((this.documentHelper.owner.editor.isFootnoteElementRemoved || this.isFootnoteContentChanged)
                && !ej2_base_1.isNullOrUndefined(paragraph.bodyWidget.page.footnoteWidget)) {
                foot = paragraph.bodyWidget.page.footnoteWidget;
                this.layoutfootNote(foot);
            }
            if (!ej2_base_1.isNullOrUndefined(this.viewer.owner.editorHistory) && this.viewer.owner.editorHistory.isRedoing && !ej2_base_1.isNullOrUndefined(newBodyWidget.page.endnoteWidget)) {
                this.isEndnoteContentChanged = true;
            }
            if ((this.documentHelper.owner.editor.isEndnoteElementRemoved || this.isEndnoteContentChanged)
                && !ej2_base_1.isNullOrUndefined(newBodyWidget.page.endnoteWidget)) {
                foot = newBodyWidget.page.endnoteWidget;
                var clientArea = this.viewer.clientArea.clone();
                var clientActiveArea = this.viewer.clientActiveArea.clone();
                var lastPageLastPara = newBodyWidget.childWidgets[newBodyWidget.childWidgets.length - 1];
                var y = lastPageLastPara.y + lastPageLastPara.height;
                this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - y;
                this.viewer.clientActiveArea.x = this.viewer.clientArea.x;
                this.viewer.clientActiveArea.width = this.viewer.clientArea.width;
                this.viewer.clientActiveArea.y = y;
                this.layoutfootNote(foot);
                this.viewer.clientArea = clientArea;
                this.viewer.clientActiveArea = clientActiveArea;
            }
            if (!ej2_base_1.isNullOrUndefined(this.viewer.owner.editorHistory) && this.viewer.owner.editorHistory.isRedoing) {
                this.isEndnoteContentChanged = false;
            }
        };
        Layout.prototype.isContainsRtl = function (lineWidget) {
            if (this.viewer.documentHelper.isSelectionChangedOnMouseMoved && !this.isDocumentContainsRtl) {
                return false;
            }
            var isContainsRTL = false;
            for (var i = 0; i < lineWidget.children.length; i++) {
                if (lineWidget.children[i] instanceof page_1.TextElementBox) {
                    isContainsRTL = lineWidget.children[i].characterFormat.bidi || lineWidget.children[i].characterFormat.bdo === 'RTL'
                        || this.documentHelper.textHelper.isRTLText(lineWidget.children[i].text);
                    if (isContainsRTL) {
                        if (!this.isDocumentContainsRtl) {
                            this.isDocumentContainsRtl = isContainsRTL;
                        }
                        break;
                    }
                }
            }
            return isContainsRTL;
        };
        Layout.prototype.shiftElementsForRTLLayouting = function (line, paraBidi) {
            var textRangeBidi = this.hasTextRangeBidi(line);
            if (this.isContainsRTLText(line) || paraBidi || textRangeBidi) {
                var characterRangeTypes = [];
                var lineElementsBidiValues = [];
                for (var i = 0; i < line.children.length; i++) {
                    var element = line.children[i];
                    if (element instanceof page_1.TextElementBox && element.height > 0 && !(element.isPageBreak) && element.text !== '\v') {
                        var textRange = element;
                        lineElementsBidiValues.push(textRange.characterFormat.bidi);
                        if (textRange.text == "\t") {
                            characterRangeTypes.push(types_1.CharacterRangeType.Tab);
                        }
                        else {
                            characterRangeTypes.push(textRange.characterRange);
                        }
                        element.isRightToLeft = characterRangeTypes[characterRangeTypes.length - 1] == types_1.CharacterRangeType.RightToLeft;
                    }
                    else if (element instanceof page_1.CommentCharacterElementBox
                        || element instanceof page_1.BookmarkElementBox || element instanceof page_1.EditRangeStartElementBox
                        || element instanceof page_1.EditRangeEndElementBox || element instanceof page_1.ContentControl
                        || element instanceof page_1.FieldElementBox) {
                        var isStartMark = this.isStartMarker(element);
                        var isEndMark = this.isEndMarker(element);
                        if (isStartMark && i < line.children.length - 1) {
                            var nextltWidget = this.getNextValidWidget(i + 1, line);
                            if (!ej2_base_1.isNullOrUndefined(nextltWidget) && (nextltWidget instanceof page_1.TextElementBox)
                                && nextltWidget.height > 0) {
                                var textRange = nextltWidget;
                                lineElementsBidiValues.push(textRange.characterFormat.bidi);
                                if (nextltWidget.text === '\t') {
                                    characterRangeTypes.push(types_1.CharacterRangeType.Tab);
                                }
                                else {
                                    characterRangeTypes.push(textRange.characterRange);
                                }
                            }
                            else {
                                lineElementsBidiValues.push(false);
                                characterRangeTypes.push(types_1.CharacterRangeType.LeftToRight);
                            }
                        }
                        else if (!isEndMark && i > 0) {
                            lineElementsBidiValues.push(lineElementsBidiValues[lineElementsBidiValues.length - 1]);
                            characterRangeTypes.push(characterRangeTypes[characterRangeTypes.length - 1]);
                        }
                        else {
                            lineElementsBidiValues.push(false);
                            characterRangeTypes.push(types_1.CharacterRangeType.LeftToRight);
                        }
                    }
                    else if (element instanceof page_1.ListTextElementBox && paraBidi) {
                        lineElementsBidiValues.push(paraBidi);
                        characterRangeTypes.push(types_1.CharacterRangeType.RightToLeft);
                    }
                    else {
                        lineElementsBidiValues.push(false);
                        characterRangeTypes.push(types_1.CharacterRangeType.LeftToRight);
                    }
                }
                var rtlStartIndex = -1;
                var isPrevLTRText = undefined;
                for (var i = 0; i < characterRangeTypes.length; i++) {
                    if (i + 1 < lineElementsBidiValues.length
                        && lineElementsBidiValues[i] != lineElementsBidiValues[i + 1]) {
                        if (rtlStartIndex != -1) {
                            this.updateCharacterRange(line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                            rtlStartIndex = -1;
                        }
                        isPrevLTRText = null;
                        continue;
                    }
                    if (i > 0 && i != characterRangeTypes.length - 1
                        && characterRangeTypes[i] == types_1.CharacterRangeType.WordSplit && lineElementsBidiValues[i]
                        && characterRangeTypes[i - 1] == types_1.CharacterRangeType.Number && lineElementsBidiValues[i - 1]
                        && characterRangeTypes[i + 1] == types_1.CharacterRangeType.Number && lineElementsBidiValues[i + 1]
                        && this.isNumberNonReversingCharacter(line.children[i])) {
                        characterRangeTypes[i] = types_1.CharacterRangeType.Number;
                    }
                    else if (characterRangeTypes[i] == types_1.CharacterRangeType.RightToLeft || characterRangeTypes[i] == types_1.CharacterRangeType.LeftToRight
                        || characterRangeTypes[i] == types_1.CharacterRangeType.Number && rtlStartIndex != -1
                        || (ej2_base_1.isNullOrUndefined(isPrevLTRText) || !isPrevLTRText) && lineElementsBidiValues[i]) {
                        if (rtlStartIndex == -1 && characterRangeTypes[i] != types_1.CharacterRangeType.LeftToRight) {
                            rtlStartIndex = i;
                        }
                        else if (rtlStartIndex == -1) {
                            if (characterRangeTypes[i] == types_1.CharacterRangeType.LeftToRight) {
                                isPrevLTRText = true;
                            }
                            else if (characterRangeTypes[i] == types_1.CharacterRangeType.RightToLeft) {
                                isPrevLTRText = false;
                            }
                            continue;
                        }
                        else if (characterRangeTypes[i] == types_1.CharacterRangeType.LeftToRight) {
                            this.updateCharacterRange(line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                            rtlStartIndex = characterRangeTypes[i] == types_1.CharacterRangeType.RightToLeft
                                || characterRangeTypes[i] == types_1.CharacterRangeType.Number && rtlStartIndex != -1 ? i : -1;
                        }
                    }
                    if (characterRangeTypes[i] == types_1.CharacterRangeType.LeftToRight) {
                        isPrevLTRText = true;
                    }
                    else if (characterRangeTypes[i] == types_1.CharacterRangeType.RightToLeft) {
                        isPrevLTRText = false;
                    }
                }
                if (rtlStartIndex != -1 && rtlStartIndex < characterRangeTypes.length - 1) {
                    this.updateCharacterRange(line, characterRangeTypes.length - 1, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                    rtlStartIndex = -1;
                }
                if (characterRangeTypes.length != line.children.length) {
                    throw new Error("Splitted Widget count mismatch while reordering layouted child widgets of a line");
                }
                var reorderedWidgets = this.reorderElements(line, characterRangeTypes, lineElementsBidiValues, paraBidi);
                lineElementsBidiValues.length = 0;
                characterRangeTypes.length = 0;
                if (line.children.length > 0) {
                    line.layoutedElements = reorderedWidgets;
                }
            }
            return paraBidi;
        };
        Layout.prototype.isNumberNonReversingCharacter = function (element) {
            if (element instanceof page_1.TextElementBox) {
                var textRange = element;
                if (textRange.characterFormat.hasValueWithParent('localeIdBidi')) {
                    var ch = textRange.text.charCodeAt(0);
                    if ((ch == 47 && !this.isNumberReverseLangForSlash(textRange.characterFormat.localeIdBidi))
                        || ((ch == 35 || ch == 36 || ch == 37 || ch == 43 || ch == 45) && !this.isNumberReverseLangForOthers(textRange.characterFormat.localeIdBidi))
                        || (ch == 44 || ch == 46 || ch == 58 || ch == 1548)) {
                        return true;
                    }
                }
                else {
                    return text_helper_1.TextHelper.isNumberNonReversingCharacter(textRange.text, textRange.characterFormat.bidi);
                }
            }
            return false;
        };
        Layout.prototype.isNumberReverseLangForSlash = function (lang) {
            return (this.isNumberReverseLangForOthers(lang) || lang == 6145 || lang == 1164 || lang == 1125 ||
                lang == 1120 || lang == 1123 || lang == 1065 || lang == 2137 ||
                lang == 1114 || lang == 1119 || lang == 1152 || lang == 1056);
        };
        Layout.prototype.isNumberReverseLangForOthers = function (lang) {
            return (lang == 14337 || lang == 15361 || lang == 5121 || lang == 3073 || lang == 2049 ||
                lang == 11265 || lang == 13313 || lang == 12289 || lang == 4097 || lang == 8193 ||
                lang == 16385 || lang == 1025 || lang == 10241 || lang == 7169 || lang == 9217);
        };
        Layout.prototype.isStartMarker = function (element) {
            if (element instanceof page_1.CommentCharacterElementBox) {
                return element.commentType === 0;
            }
            else if (element instanceof page_1.BookmarkElementBox) {
                return element.bookmarkType === 0;
            }
            else if (element instanceof page_1.EditRangeStartElementBox) {
                return true;
            }
            else if (element instanceof page_1.ContentControl) {
                return element.type === 0;
            }
            else if (element instanceof page_1.FieldElementBox) {
                return element.fieldType === 0;
            }
            return false;
        };
        Layout.prototype.isEndMarker = function (element) {
            if (element instanceof page_1.CommentCharacterElementBox) {
                return element.commentType === 1;
            }
            else if (element instanceof page_1.BookmarkElementBox) {
                return element.bookmarkType === 1;
            }
            else if (element instanceof page_1.EditRangeStartElementBox) {
                return true;
            }
            else if (element instanceof page_1.ContentControl) {
                return element.type === 1;
            }
            else if (element instanceof page_1.FieldElementBox) {
                return element.fieldType === 1;
            }
            return false;
        };
        Layout.prototype.getNextValidWidget = function (startIndex, layoutedWidgets) {
            for (var i = startIndex; i < layoutedWidgets.children.length; i++) {
                var element = layoutedWidgets.children[i];
                if (element instanceof page_1.CommentCharacterElementBox
                    || element instanceof page_1.BookmarkElementBox || element instanceof page_1.EditRangeStartElementBox
                    || element instanceof page_1.EditRangeEndElementBox || element instanceof page_1.ContentControl
                    || element instanceof page_1.FieldElementBox) {
                    continue;
                }
                else {
                    return element[i];
                }
            }
            return null;
        };
        Layout.prototype.hasTextRangeBidi = function (line) {
            for (var i = 0; i < line.children.length; i++) {
                var elementBox = line.children[i];
                if (elementBox instanceof page_1.TextElementBox) {
                    var textRange = elementBox;
                    if (textRange.characterFormat.bidi) {
                        return true;
                    }
                }
            }
            return false;
        };
        Layout.prototype.isContainsRTLText = function (line) {
            var documentHelper = line.paragraph.bodyWidget.page.documentHelper;
            var textHelper = documentHelper.textHelper;
            var isContainsRTL = false;
            for (var i = 0; i < line.children.length; i++) {
                if (line.children[i] instanceof page_1.TextElementBox) {
                    isContainsRTL = line.children[i].characterFormat.bidi || line.children[i].characterFormat.bidi == true
                        || textHelper.isRTLText(line.children[i].text);
                    if (isContainsRTL)
                        break;
                }
            }
            return isContainsRTL;
        };
        Layout.prototype.updateCharacterRange = function (line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes) {
            var endIndex = i;
            if (!lineElementsBidiValues[i]) {
                if (characterRangeTypes[i] === types_1.CharacterRangeType.LeftToRight) {
                    endIndex--;
                }
                for (var j = endIndex; j >= rtlStartIndex; j--) {
                    if (characterRangeTypes[j] != types_1.CharacterRangeType.WordSplit) {
                        endIndex = j;
                        break;
                    }
                }
            }
            for (var j = rtlStartIndex; j <= endIndex; j++) {
                if (characterRangeTypes[j] == types_1.CharacterRangeType.WordSplit) {
                    characterRangeTypes[j] = types_1.CharacterRangeType.RightToLeft | types_1.CharacterRangeType.WordSplit;
                    var previousIndex = j - 1;
                    var nextIndex = j + 1;
                    if (previousIndex >= 0 && nextIndex < characterRangeTypes.length
                        && characterRangeTypes[previousIndex] == types_1.CharacterRangeType.RightToLeft
                        && (characterRangeTypes[nextIndex] == types_1.CharacterRangeType.RightToLeft || characterRangeTypes[nextIndex] == types_1.CharacterRangeType.Number)
                        && line.children[j] instanceof page_1.TextElementBox) {
                        var textRange = line.children[j];
                        if (textRange.characterFormat.fontFamilyBidi == "Times New Roman") {
                            var charArray = textRange.text.split("");
                            var reverseArray = charArray.reverse();
                            var joinArray = reverseArray.join("");
                            textRange.text = joinArray;
                        }
                    }
                }
            }
        };
        Layout.prototype.reorderElements = function (line, characterRangeTypes, listElementsBidiValues, paraBidi) {
            var insertIndex = 0, lastItemIndexWithoutRTLFlag = -1, consecutiveRTLCount = 0, consecutiveNumberCount = 0;
            var reorderedElements = [];
            var prevCharType = types_1.CharacterRangeType.LeftToRight;
            var prevBidi = false;
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                var textElement = element;
                textElement.characterRange = characterRangeTypes[i];
                var isRTLText = (textElement.characterRange & types_1.CharacterRangeType.RightToLeft) == types_1.CharacterRangeType.RightToLeft || textElement.characterRange == types_1.CharacterRangeType.Number;
                var isBidi = listElementsBidiValues[i];
                if (characterRangeTypes[i] == types_1.CharacterRangeType.Tab) {
                    if (paraBidi) {
                        insertIndex = 0;
                        lastItemIndexWithoutRTLFlag = -1;
                        consecutiveRTLCount = 0;
                        prevCharType = types_1.CharacterRangeType.LeftToRight;
                        prevBidi = false;
                        reorderedElements.splice(insertIndex, 0, element);
                        continue;
                    }
                    else if (isBidi) {
                        isBidi = false;
                    }
                }
                if (i > 0 && prevBidi != isBidi) {
                    if (paraBidi) {
                        insertIndex = 0;
                        lastItemIndexWithoutRTLFlag = -1;
                        consecutiveRTLCount = 0;
                    }
                    else {
                        lastItemIndexWithoutRTLFlag = reorderedElements.length - 1;
                    }
                    consecutiveNumberCount = 0;
                }
                if (!isBidi && !isRTLText) {
                    if (paraBidi) {
                        if (consecutiveRTLCount > 0 && prevBidi == isBidi) {
                            insertIndex += consecutiveRTLCount;
                        }
                        reorderedElements.splice(insertIndex, 0, element);
                        insertIndex++;
                    }
                    else {
                        reorderedElements.push(element);
                        insertIndex = i + 1;
                    }
                    consecutiveRTLCount = 0;
                    lastItemIndexWithoutRTLFlag = paraBidi ? insertIndex - 1 : reorderedElements.length - 1;
                }
                else if (isRTLText || (isBidi && textElement.characterRange == types_1.CharacterRangeType.WordSplit
                    && (prevCharType == types_1.CharacterRangeType.RightToLeft || this.isInsertWordSplitToLeft(characterRangeTypes, listElementsBidiValues, i)))) {
                    consecutiveRTLCount++;
                    insertIndex = lastItemIndexWithoutRTLFlag + 1;
                    if (textElement.characterRange == types_1.CharacterRangeType.Number) {
                        if (prevCharType == types_1.CharacterRangeType.Number) {
                            insertIndex += consecutiveNumberCount;
                        }
                        consecutiveNumberCount++;
                    }
                    reorderedElements.splice(insertIndex, 0, element);
                }
                else {
                    reorderedElements.splice(insertIndex, 0, element);
                    insertIndex++;
                    consecutiveRTLCount = 0;
                }
                if (textElement.characterRange != types_1.CharacterRangeType.Number) {
                    consecutiveNumberCount = 0;
                }
                if (textElement.characterRange != types_1.CharacterRangeType.WordSplit) {
                    prevCharType = textElement.characterRange;
                }
                prevBidi = isBidi;
            }
            return reorderedElements;
        };
        Layout.prototype.isInsertWordSplitToLeft = function (characterRangeTypes, lineElementsBidiValues, elementIndex) {
            for (var i = elementIndex + 1; i < characterRangeTypes.length; i++) {
                if ((characterRangeTypes[i] & types_1.CharacterRangeType.RightToLeft) == types_1.CharacterRangeType.RightToLeft) {
                    return true;
                }
                else if (characterRangeTypes[i] == types_1.CharacterRangeType.LeftToRight) {
                    if (lineElementsBidiValues[i]) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            return true;
        };
        Layout.prototype.shiftLayoutFloatingItems = function (paragraph) {
            for (var i = 0; i < paragraph.floatingElements.length; i++) {
                var element = paragraph.floatingElements[i];
                var position = this.getFloatingItemPoints(element);
                var height = position.y - element.y;
                element.x = position.x;
                element.y = position.y;
                if (element instanceof page_1.ShapeElementBox) {
                    for (var j = 0; j < element.textFrame.childWidgets.length; j++) {
                        var block = element.textFrame.childWidgets[j];
                        if (block instanceof page_1.ParagraphWidget) {
                            block.y = block.y + height;
                        }
                        else if (block instanceof page_1.TableWidget) {
                            this.shiftChildLocationForTableWidget(block, height);
                        }
                    }
                }
            }
        };
        Layout.prototype.getFloatingItemPoints = function (floatElement) {
            var paragraph = floatElement.line.paragraph;
            var sectionFormat = paragraph.bodyWidget.sectionFormat;
            var indentX = 0;
            var indentY = 0;
            if (paragraph) {
                var leftMargin = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                var rightMargin = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.rightMargin);
                var topMargin = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                var bottomMargin = sectionFormat.bottomMargin > 0 ? editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.bottomMargin) : 48;
                var headerDistance = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.headerDistance);
                var footerDistance = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.footerDistance);
                var pageWidth = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth);
                var pageHeight = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageHeight);
                var pageClientWidth = pageWidth - (leftMargin + rightMargin);
                var pageClientHeight = pageHeight - topMargin - bottomMargin;
                if (paragraph.isInHeaderFooter && sectionFormat.topMargin <= 0) {
                    topMargin = Math.abs(topMargin) > 0 ? Math.abs(topMargin)
                        : editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.headerDistance) + (paragraph.height);
                }
                else {
                    topMargin = topMargin > 0 ? topMargin : 48;
                }
                if (!paragraph.isInHeaderFooter && topMargin < this.viewer.clientArea.y) {
                    topMargin = this.viewer.clientArea.y;
                }
                var mIsYPositionUpdated = false;
                var textWrapStyle = 'InFrontOfText';
                var isLayoutInCell = false;
                var vertOrigin = floatElement.verticalOrigin;
                var horzOrigin = floatElement.horizontalOrigin;
                var horzAlignment = floatElement.horizontalAlignment;
                var vertAlignment = floatElement.verticalAlignment;
                var verticalPercent = floatElement.verticalRelativePercent;
                var horizontalPercent = floatElement.horizontalRelativePercent;
                var shapeHeight = floatElement.height;
                var shapeWidth = floatElement.width;
                var vertPosition = floatElement.verticalPosition;
                var horzPosition = floatElement.horizontalPosition;
                var layoutInCell = floatElement.layoutInCell;
                var heightPercent = floatElement.heightRelativePercent;
                var widthPercent = floatElement.widthRelativePercent;
                var autoShape = void 0;
                if (floatElement instanceof page_1.ShapeElementBox) {
                    autoShape = floatElement.autoShapeType;
                }
                if (paragraph.isInsideTable && layoutInCell) {
                    isLayoutInCell = true;
                    indentY = this.getVerticalPosition(floatElement, vertPosition, vertOrigin, textWrapStyle);
                    indentX = this.getHorizontalPosition(floatElement.width, floatElement, horzAlignment, horzOrigin, horzPosition, textWrapStyle, paragraph.associatedCell.cellFormat.cellWidth);
                }
                else {
                    if (this.documentHelper.viewer instanceof viewer_1.WebLayoutViewer) {
                        switch (vertOrigin) {
                            case 'Line':
                                indentY = this.documentHelper.selection.getTop(floatElement.line);
                                break;
                            default:
                                indentY = this.viewer.clientActiveArea.y;
                                break;
                        }
                        switch (horzOrigin) {
                            case 'Character':
                                indentX = this.viewer.clientActiveArea.x;
                                break;
                            default:
                                switch (horzAlignment) {
                                    case 'Center':
                                        indentX = (this.viewer.clientArea.width / 2) - (floatElement.width / 2);
                                        break;
                                    default:
                                        indentX = this.viewer.clientArea.x;
                                        break;
                                }
                                break;
                        }
                    }
                    else {
                        if (mIsYPositionUpdated) {
                            indentY = this.viewer.clientArea.y;
                        }
                        else {
                            switch (vertOrigin) {
                                case 'Page':
                                case 'TopMargin':
                                    indentY = vertPosition;
                                    switch (vertAlignment) {
                                        case 'Top':
                                            indentY = vertPosition;
                                            break;
                                        case 'Center':
                                            if (vertOrigin === 'TopMargin') {
                                                indentY = (topMargin - shapeHeight) / 2;
                                            }
                                            else {
                                                if (heightPercent > 0 && widthPercent > 0) {
                                                    indentY = (pageHeight - (pageHeight) * (heightPercent / 100)) / 2;
                                                    floatElement.height = (pageHeight) * (heightPercent / 100);
                                                }
                                                else {
                                                    indentY = (pageHeight - shapeHeight) / 2;
                                                }
                                            }
                                            break;
                                        case 'Outside':
                                        case 'Bottom':
                                            if (vertOrigin === 'Page' && vertAlignment === 'Bottom') {
                                                indentY = pageHeight - shapeHeight;
                                            }
                                            else {
                                                if (vertOrigin === 'TopMargin') {
                                                    indentY = (topMargin - shapeHeight);
                                                }
                                                else if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                                    indentY = pageHeight - shapeHeight - footerDistance / 2;
                                                }
                                                else {
                                                    indentY = headerDistance / 2;
                                                }
                                            }
                                            break;
                                        case 'Inside':
                                            if (vertOrigin === 'Page') {
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                    indentY = pageHeight - shapeHeight - footerDistance / 2;
                                                }
                                                else {
                                                    indentY = headerDistance / 2;
                                                }
                                            }
                                            else {
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                    indentY = ((topMargin - shapeHeight) / 2 - headerDistance);
                                                }
                                            }
                                            break;
                                        case 'None':
                                            if (Math.abs(verticalPercent) <= 1000) {
                                                indentY = pageHeight * (verticalPercent / 100);
                                            }
                                            else {
                                                indentY = vertPosition;
                                            }
                                            break;
                                    }
                                    break;
                                case 'Line':
                                    indentY = vertPosition;
                                    switch (vertAlignment) {
                                        case 'Inside':
                                        case 'Top':
                                            indentY = this.viewer.clientActiveArea.y;
                                            break;
                                        case 'Center':
                                            indentY = this.viewer.clientActiveArea.y - shapeHeight / 2;
                                            break;
                                        case 'Outside':
                                        case 'Bottom':
                                            indentY = this.viewer.clientActiveArea.y - shapeHeight;
                                            break;
                                        case 'None':
                                            indentY = Math.round(paragraph.y) + vertPosition;
                                            break;
                                    }
                                    break;
                                case 'BottomMargin':
                                    indentY = vertPosition;
                                    switch (vertAlignment) {
                                        case 'Inside':
                                        case 'Top':
                                            indentY = (pageHeight - bottomMargin);
                                            break;
                                        case 'Center':
                                            indentY = pageHeight - bottomMargin + ((bottomMargin - shapeHeight) / 2);
                                            break;
                                        case 'Outside':
                                        case 'Bottom':
                                            if (paragraph.bodyWidget.page.index + 1 % 2 !== 0 && vertAlignment === 'Outside') {
                                                indentY = pageHeight - bottomMargin;
                                            }
                                            else {
                                                indentY = pageHeight - shapeHeight;
                                            }
                                            break;
                                        case 'None':
                                            indentY = pageHeight - bottomMargin + vertPosition;
                                            break;
                                    }
                                    break;
                                case 'InsideMargin':
                                case 'OutsideMargin':
                                    indentY = vertPosition;
                                    switch (vertAlignment) {
                                        case 'Inside':
                                            if (vertOrigin === 'InsideMargin') {
                                                if (vertOrigin === 'InsideMargin' && paragraph.bodyWidget.page.index + 1 % 2 === 0) {
                                                    indentY = pageHeight - shapeHeight;
                                                }
                                                else {
                                                    indentY = 0;
                                                }
                                            }
                                            else {
                                                indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin : topMargin - shapeHeight;
                                            }
                                            break;
                                        case 'Top':
                                            if (vertOrigin === 'InsideMargin') {
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                    indentY = pageHeight - bottomMargin;
                                                }
                                                else {
                                                    indentY = 0;
                                                }
                                            }
                                            else {
                                                indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin : 0;
                                            }
                                            break;
                                        case 'Center':
                                            if (vertOrigin === 'OutsideMargin') {
                                                indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin + (bottomMargin - shapeHeight) / 2 : (topMargin - shapeHeight) / 2;
                                            }
                                            else {
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                    indentY = pageHeight - bottomMargin + (bottomMargin - shapeHeight) / 2;
                                                }
                                                else {
                                                    indentY = (topMargin - shapeHeight) / 2;
                                                }
                                            }
                                            break;
                                        case 'Outside':
                                            if (vertOrigin === 'InsideMargin') {
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                    indentY = (pageHeight - bottomMargin);
                                                }
                                                else {
                                                    indentY = (topMargin - shapeHeight);
                                                }
                                            }
                                            else {
                                                indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? topMargin - shapeHeight : pageHeight - bottomMargin;
                                            }
                                            break;
                                        case 'Bottom':
                                            if (vertOrigin === 'OutsideMargin') {
                                                indentY = (paragraph.bodyWidget.page.index + 1) !== 0 ? pageHeight - shapeHeight : topMargin - shapeHeight;
                                            }
                                            else {
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                    indentY = pageHeight - shapeHeight;
                                                }
                                                else {
                                                    indentY = topMargin - shapeHeight;
                                                }
                                            }
                                            break;
                                        case 'None':
                                            break;
                                    }
                                    break;
                                case 'Paragraph':
                                    var space = 0;
                                    indentY = Math.round(paragraph.y) + space + vertPosition;
                                    break;
                                case 'Margin':
                                    if (paragraph.isInHeaderFooter && headerDistance > topMargin) {
                                        indentY = (headerDistance + (paragraph.height)) + vertPosition;
                                    }
                                    else {
                                        indentY = topMargin + vertPosition;
                                    }
                                    switch (vertAlignment) {
                                        case 'Top':
                                            indentY = topMargin;
                                            break;
                                        case 'Center':
                                            indentY = topMargin + (pageClientHeight - shapeHeight) / 2;
                                            break;
                                        case 'Outside':
                                        case 'Bottom':
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                                indentY = topMargin + pageClientHeight - shapeHeight;
                                            }
                                            else {
                                                indentY = topMargin;
                                            }
                                            break;
                                        case 'Inside':
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = topMargin + pageClientHeight - shapeHeight;
                                            }
                                            else {
                                                indentY = topMargin;
                                            }
                                            break;
                                        case 'None':
                                            break;
                                    }
                                    break;
                                default:
                                    indentY = this.viewer.clientArea.y - vertPosition;
                                    break;
                            }
                        }
                        if (paragraph && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind' &&
                            vertOrigin === 'Paragraph' && shapeWidth >= pageWidth) {
                            indentX = 0;
                        }
                        else {
                            switch (horzOrigin) {
                                case 'Page':
                                    indentX = horzPosition;
                                    switch (horzAlignment) {
                                        case 'Center':
                                            if (isLayoutInCell) {
                                                indentX = (paragraph.associatedCell.cellFormat.cellWidth - shapeWidth) / 2;
                                            }
                                            else {
                                                if (heightPercent > 0 && widthPercent > 0) {
                                                    indentX = (pageWidth - (pageWidth) * (widthPercent / 100)) / 2;
                                                    floatElement.width = (pageWidth) * (widthPercent / 100);
                                                }
                                                else {
                                                    indentX = (pageWidth - shapeWidth) / 2;
                                                }
                                            }
                                            break;
                                        case 'Left':
                                            indentX = 0;
                                            break;
                                        case 'Outside':
                                        case 'Right':
                                            if (isLayoutInCell) {
                                                indentX = paragraph.associatedCell.cellFormat.cellWidth - shapeWidth;
                                            }
                                            else {
                                                indentX = pageWidth - shapeWidth;
                                            }
                                            break;
                                        case 'None':
                                            if (isLayoutInCell) {
                                                indentX = paragraph.associatedCell.x + horzPosition;
                                            }
                                            else if (floatElement instanceof page_1.ShapeElementBox) {
                                                indentX = horzPosition;
                                            }
                                            else {
                                                indentX = horzPosition;
                                            }
                                            break;
                                    }
                                    if (indentX < 0 && isLayoutInCell) {
                                        indentX = paragraph.associatedCell.x;
                                    }
                                    break;
                                case 'Column':
                                    var isXPositionUpated = false;
                                    if (this.viewer.clientActiveArea.x < paragraph.x) {
                                        indentX = paragraph.x + horzPosition;
                                    }
                                    else {
                                        if ((textWrapStyle === 'InFrontOfText' || textWrapStyle === 'Behind')) {
                                            if (!(floatElement.paragraph.isInsideTable) && ((autoShape === 'StraightConnector' || autoShape === 'Rectangle') || floatElement instanceof page_1.ImageElementBox)) {
                                                isXPositionUpated = true;
                                                indentX = horzPosition + paragraph.bodyWidget.x;
                                            }
                                            else {
                                                indentX = paragraph.x + horzPosition;
                                            }
                                        }
                                        else {
                                            indentX = this.viewer.clientActiveArea.x + horzPosition;
                                        }
                                    }
                                    if (textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind'
                                        && Math.round(indentX + shapeWidth) > Math.round(pageWidth) && shapeWidth < pageWidth) {
                                        indentX = (pageWidth - shapeWidth);
                                    }
                                    if (paragraph.paragraphFormat.leftIndent && !isXPositionUpated) {
                                        var leftIndent = editor_helper_1.HelperMethods.convertPointToPixel(paragraph.leftIndent);
                                        indentX -= leftIndent;
                                    }
                                    switch (horzAlignment) {
                                        case 'Center':
                                            indentX = this.viewer.clientActiveArea.x + (this.viewer.clientActiveArea.width - shapeWidth) / 2;
                                            break;
                                        case 'Left':
                                            indentX = this.viewer.clientActiveArea.x;
                                            break;
                                        case 'Right':
                                            indentX = this.viewer.clientActiveArea.x + this.viewer.clientActiveArea.width - shapeWidth;
                                            break;
                                        case 'None':
                                            break;
                                    }
                                    break;
                                case 'Margin':
                                    if (paragraph.bodyWidget) {
                                        indentX = leftMargin + horzPosition;
                                        switch (horzAlignment) {
                                            case 'Center':
                                                indentX = leftMargin + (pageClientWidth - shapeWidth) / 2;
                                                break;
                                            case 'Left':
                                                indentX = leftMargin;
                                                break;
                                            case 'Outside':
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                                    indentX = leftMargin + pageClientWidth - shapeWidth;
                                                }
                                                break;
                                            case 'Right':
                                                indentX = leftMargin + pageClientWidth - shapeWidth;
                                                break;
                                            case 'Inside':
                                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                    indentX = leftMargin + pageClientWidth - shapeWidth;
                                                }
                                                break;
                                            case 'None':
                                                break;
                                        }
                                    }
                                    else {
                                        indentX = this.viewer.clientArea.x + horzPosition;
                                    }
                                    break;
                                case 'Character':
                                    if (horzAlignment === 'Right' || horzAlignment === 'Center') {
                                        indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                    }
                                    else {
                                        indentX = this.viewer.clientArea.x + horzPosition;
                                    }
                                    break;
                                case 'LeftMargin':
                                    indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                    break;
                                case 'RightMargin':
                                    indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                    break;
                                case 'InsideMargin':
                                    if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                        indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                    }
                                    else {
                                        indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                    }
                                    break;
                                case 'OutsideMargin':
                                    if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                        indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                    }
                                    else {
                                        indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                    }
                                    break;
                                default:
                                    indentX = this.viewer.clientArea.x + horzPosition;
                                    break;
                            }
                        }
                        if (paragraph && textWrapStyle !== 'InFrontOfText'
                            && textWrapStyle !== 'Behind' && vertOrigin === 'Paragraph' && pageWidth < indentX + shapeWidth) {
                            indentX = pageWidth - shapeWidth;
                        }
                    }
                }
                if (paragraph && (vertOrigin === 'Paragraph' || vertOrigin === 'Line') && floatElement.textWrappingStyle !== "InFrontOfText" && floatElement.textWrappingStyle !== "Behind") {
                    if (this.documentHelper.compatibilityMode === 'Word2013') {
                        if (!paragraph.isInHeaderFooter) {
                            if (indentY + floatElement.height > this.viewer.clientArea.bottom) {
                                indentY = this.viewer.clientArea.bottom - floatElement.height;
                            }
                            if (indentY < sectionFormat.topMargin) {
                                indentY = sectionFormat.topMargin;
                            }
                        }
                    }
                }
            }
            return new editor_helper_1.Point(indentX, indentY);
        };
        Layout.prototype.getLeftMarginHorizPosition = function (leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle) {
            var indentX = horzPosition;
            switch (horzAlignment) {
                case 'Center':
                    indentX = (leftMargin - shapeWidth) / 2;
                    break;
                case 'Left':
                    indentX = 0;
                    break;
                case 'Right':
                    indentX = leftMargin - shapeWidth;
                    break;
                case 'None':
                    break;
            }
            if (indentX < 0 && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind') {
                indentX = 0;
            }
            return indentX;
        };
        Layout.prototype.getRightMarginHorizPosition = function (pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle) {
            var xPosition = pageWidth - rightMargin;
            var indentX = xPosition + horzPosition;
            switch (horzAlignment) {
                case 'Center':
                    indentX = xPosition + (rightMargin - shapeWidth) / 2;
                    break;
                case 'Left':
                    indentX = xPosition;
                    break;
                case 'Right':
                    indentX = pageWidth - shapeWidth;
                    break;
                case 'None':
                    break;
            }
            if ((indentX < 0 || indentX + shapeWidth > pageWidth) && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind') {
                indentX = pageWidth - shapeWidth;
            }
            return indentX;
        };
        Layout.prototype.getVerticalPosition = function (paraItem, vertPosition, vertOrigin, textWrapStyle) {
            var paragraph = paraItem.line.paragraph;
            var shape = paraItem;
            var indentY = 0;
            var topMargin = paragraph.associatedCell.y;
            switch (vertOrigin) {
                case 'Page':
                case 'Margin':
                case 'TopMargin':
                case 'InsideMargin':
                case 'BottomMargin':
                case 'OutsideMargin':
                    indentY = topMargin + vertPosition;
                    break;
                case 'Line':
                case 'Paragraph':
                    var space = 0;
                    indentY = paragraph.y + vertPosition + space;
                    if (shape.textWrappingStyle == "Square") {
                        indentY = indentY >= 0 ? indentY : paragraph.associatedCell.y;
                    }
                    break;
                default:
                    indentY = this.viewer.clientActiveArea.y + vertPosition;
                    break;
            }
            return indentY;
        };
        Layout.prototype.getHorizontalPosition = function (width, paraItem, horzAlignment, horzOrigin, horzPosition, textWrapStyle, cellWid) {
            var indentX = 0;
            var paragraph = paraItem.line.paragraph;
            var cell = paragraph.associatedCell;
            var cellWidth = cellWid - cell.leftMargin - cell.rightMargin;
            var cellInnerWidth = cell.cellFormat.cellWidth;
            var marginLeft = cell.x;
            var pageLeft = marginLeft - cell.leftMargin;
            switch (horzOrigin) {
                case 'Page':
                    {
                        indentX = horzPosition;
                        switch (horzAlignment) {
                            case 'Center':
                                indentX = pageLeft + (cellWidth - width) / 2;
                                break;
                            case 'Left':
                                indentX = pageLeft;
                                break;
                            case 'Right':
                                indentX = pageLeft + (cellWidth - width);
                                break;
                            case 'None':
                                indentX = pageLeft + horzPosition;
                                break;
                        }
                    }
                    break;
                case 'Column':
                case 'Margin':
                    {
                        switch (horzAlignment) {
                            case 'Center':
                                indentX = marginLeft + (cellInnerWidth - width) / 2;
                                break;
                            case 'Left':
                                indentX = marginLeft;
                                break;
                            case 'Right':
                                indentX = marginLeft + (cellInnerWidth - width);
                                break;
                            case 'None':
                                indentX = marginLeft + horzPosition;
                                break;
                        }
                    }
                    break;
                default:
                    {
                        indentX = marginLeft + horzPosition;
                    }
                    break;
            }
            return indentX;
        };
        Layout.prototype.updateTableFloatPoints = function (table) {
            if (table.wrapTextAround) {
                var tableTotalWidth = table.getTableCellWidth();
                var position = table.positioning;
                var sectionFormat = table.bodyWidget.sectionFormat;
                if (this.documentHelper.viewer instanceof viewer_1.WebLayoutViewer) {
                    if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Page' || position.horizontalOrigin === 'Column') {
                        if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                            this.viewer.clientActiveArea.x = this.viewer.clientArea.width - tableTotalWidth;
                        }
                        else {
                            this.viewer.clientActiveArea.x = this.viewer.clientArea.x;
                        }
                    }
                }
                else {
                    if (!(table.containerWidget instanceof page_1.TextFrame) && !table.isInsideTable) {
                        if (position.verticalOrigin === 'Page') {
                            if (position.verticalAlignment === 'Top') {
                                this.viewer.clientActiveArea.y = 0;
                            }
                            else if (position.verticalAlignment === 'Inside') {
                                this.viewer.clientActiveArea.y = 0;
                            }
                            else if (ej2_base_1.isNullOrUndefined(position.verticalAlignment) || position.verticalAlignment === 'None') {
                                this.viewer.clientActiveArea.y = editor_helper_1.HelperMethods.convertPointToPixel(position.verticalPosition);
                            }
                        }
                        else if (position.verticalOrigin === 'Margin') {
                            if (position.verticalAlignment === 'Top') {
                                this.viewer.clientActiveArea.y = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                            }
                            else if (position.verticalAlignment === 'Inside') {
                                this.viewer.clientActiveArea.y = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                            }
                            else if (Math.round(position.verticalPosition) != 0 && !ej2_base_1.isNullOrUndefined(sectionFormat.topMargin)) {
                                this.viewer.clientActiveArea.y = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.topMargin + position.verticalPosition);
                            }
                            else {
                                this.viewer.clientActiveArea.y = editor_helper_1.HelperMethods.convertPointToPixel(position.verticalPosition);
                            }
                        }
                        else if (position.verticalOrigin === 'Paragraph') {
                            if (ej2_base_1.isNullOrUndefined(position.verticalAlignment) || position.verticalAlignment === 'None') {
                                this.viewer.clientActiveArea.y += editor_helper_1.HelperMethods.convertPointToPixel(position.verticalPosition);
                            }
                        }
                        if (position.horizontalOrigin === 'Page') {
                            if (position.horizontalAlignment === 'Left') {
                                this.viewer.clientActiveArea.x = 0;
                            }
                            else if (position.horizontalAlignment === 'Inside') {
                                this.viewer.clientActiveArea.x = 0;
                            }
                            else if (position.horizontalAlignment === 'Right') {
                                this.viewer.clientActiveArea.x = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth;
                            }
                            else if (position.horizontalAlignment === 'Outside') {
                                this.viewer.clientActiveArea.x = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth;
                            }
                            else if (position.horizontalAlignment === 'Center') {
                                this.viewer.clientActiveArea.x = (editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth) / 2;
                            }
                        }
                        else if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Column') {
                            if (position.horizontalAlignment === 'Left') {
                                this.viewer.clientActiveArea.x = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                                if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
                                    this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                                        editor_helper_1.HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
                                }
                            }
                            else if (position.horizontalAlignment === 'Inside') {
                                this.viewer.clientActiveArea.x = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                            }
                            else if (position.horizontalAlignment === 'Right') {
                                this.viewer.clientActiveArea.x = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth)
                                    - (editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.rightMargin) + tableTotalWidth);
                            }
                            else if (position.horizontalAlignment === 'Outside') {
                                this.viewer.clientActiveArea.x = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth)
                                    - (editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.rightMargin) + tableTotalWidth);
                            }
                            else if (position.horizontalAlignment === 'Center') {
                                this.viewer.clientActiveArea.x = editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.leftMargin)
                                    + (editor_helper_1.HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.rightMargin - sectionFormat.leftMargin) - tableTotalWidth) / 2;
                            }
                        }
                        if (Math.round(position.horizontalPosition) > 0) {
                            this.viewer.clientActiveArea.x += editor_helper_1.HelperMethods.convertPointToPixel(position.horizontalPosition);
                        }
                    }
                    else if (table.isInsideTable) {
                        var ownerCell = table.containerWidget;
                        var cellFormat = ownerCell.cellFormat;
                        if (position.verticalOrigin === 'Page') {
                            this.viewer.clientActiveArea.y = ownerCell.y;
                            this.viewer.clientActiveArea.y += editor_helper_1.HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                        else if (position.verticalOrigin === 'Margin') {
                            this.viewer.clientActiveArea.y += editor_helper_1.HelperMethods.convertPointToPixel(position.verticalPosition);
                            if (this.viewer.clientActiveArea.y < ownerCell.y || position.verticalAlignment === 'Top') {
                                this.viewer.clientActiveArea.y = ownerCell.y;
                            }
                        }
                        else {
                            if (this.viewer.clientActiveArea.y + editor_helper_1.HelperMethods.convertPointToPixel(position.verticalPosition) < ownerCell.y) {
                                this.viewer.clientActiveArea.y = ownerCell.y;
                            }
                            else {
                                this.viewer.clientActiveArea.y += editor_helper_1.HelperMethods.convertPointToPixel(position.verticalPosition);
                            }
                        }
                        if (position.horizontalOrigin === 'Page') {
                            if (position.horizontalAlignment === 'Left' || position.horizontalAlignment === 'Inside') {
                                this.viewer.clientActiveArea.x = ownerCell.x;
                            }
                            else if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                                this.viewer.clientActiveArea.x = ((ownerCell.x + cellFormat.preferredWidth) - tableTotalWidth);
                            }
                        }
                        else if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Column') {
                            if (position.horizontalAlignment === 'Left' || position.horizontalAlignment === 'Inside') {
                                this.viewer.clientActiveArea.x = (ownerCell.x + ownerCell.leftMargin);
                            }
                            else if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                                this.viewer.clientActiveArea.x = ((ownerCell.x + cellFormat.preferredWidth)
                                    - (tableTotalWidth + ownerCell.rightMargin));
                            }
                        }
                        if (Math.round(position.horizontalPosition) > 0) {
                            this.viewer.clientActiveArea.x = ownerCell.x;
                            if (position.horizontalOrigin === 'Margin') {
                                this.viewer.clientActiveArea.x += ownerCell.leftMargin;
                            }
                            this.viewer.clientActiveArea.x += editor_helper_1.HelperMethods.convertPointToPixel(position.horizontalPosition);
                        }
                        if (position.horizontalAlignment === 'Center') {
                            this.viewer.clientActiveArea.x = (cellFormat.preferredWidth / 2) - (tableTotalWidth / 2);
                        }
                    }
                }
            }
            table.x = this.viewer.clientActiveArea.x;
            table.y = this.viewer.clientActiveArea.y;
        };
        Layout.prototype.isTocField = function (element) {
            if (element instanceof page_1.FieldElementBox) {
                var nextElement = element.nextNode;
                if (element instanceof page_1.FieldElementBox && element.fieldType === 0 && nextElement instanceof page_1.TextElementBox
                    && nextElement.text.trim().toLowerCase().indexOf('toc') !== -1) {
                    return true;
                }
            }
            return false;
        };
        Layout.prototype.getTotalColumnSpan = function (row) {
            var tableRow = row;
            var totalColumnSpan = 0;
            for (var i = 0; i < tableRow.childWidgets.length; i++) {
                totalColumnSpan += tableRow.childWidgets[i].cellFormat.columnSpan;
            }
            return totalColumnSpan;
        };
        Layout.prototype.getMaximumRightCellBorderWidth = function (table) {
            var highestBorderSize = 0;
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                var cell = row.childWidgets[row.childWidgets.length - 1];
                var cellBorder = cell.cellFormat.borders.right.lineWidth;
                if (highestBorderSize < cellBorder) {
                    highestBorderSize = cellBorder;
                }
            }
            return highestBorderSize;
        };
        Layout.prototype.getDefaultBorderSpacingValue = function (border, isBorderValueZero, tableHorizontalPosition) {
            if (border == 0) {
                if (this.documentHelper.compatibilityMode != 'Word2013' && tableHorizontalPosition == 'Center') {
                    border = 1.5;
                }
                else {
                    border = 0.75;
                }
                return true;
            }
            return isBorderValueZero;
        };
        Layout.prototype.getMinimumWidthRequiredForTable = function (isBorderValueZero, tableHorizontalPosition, border) {
            var minimumWidthRequired = 0;
            if (this.documentHelper.compatibilityMode == 'Word2013') {
                if (tableHorizontalPosition == 'Center') {
                    if (isBorderValueZero) {
                        minimumWidthRequired = 18.5 + Math.round(0.75 / 2);
                    }
                    else {
                        minimumWidthRequired = 18.5 + Math.round(border / 2);
                    }
                }
                else {
                    if (isBorderValueZero) {
                        minimumWidthRequired = 18.5 + 0.75;
                    }
                    else {
                        minimumWidthRequired = 18.5 + border;
                    }
                }
            }
            else {
                if (tableHorizontalPosition == 'Center') {
                    if (isBorderValueZero) {
                        minimumWidthRequired = 19.25;
                    }
                    else {
                        minimumWidthRequired = 18.5 + (border / 2);
                    }
                }
                else {
                    if (border == 0.25) {
                        minimumWidthRequired = 18.5;
                    }
                    else {
                        minimumWidthRequired = 19.3;
                    }
                }
            }
            return editor_helper_1.HelperMethods.convertPointToPixel(minimumWidthRequired);
        };
        Layout.prototype.shiftFloatingItemsFromTable = function (table, bodyWidget) {
            if (table.containerWidget instanceof page_1.BodyWidget) {
                for (var i = 0; i < table.containerWidget.floatingElements.length; i++) {
                    var shape = table.containerWidget.floatingElements[i];
                    if (!(shape instanceof page_1.TableWidget) && shape.paragraph.containerWidget instanceof page_1.TableCellWidget
                        && shape.paragraph.containerWidget.ownerTable.containerWidget.ownerTable == table) {
                        bodyWidget.floatingElements.push(table.containerWidget.floatingElements[i]);
                        table.containerWidget.floatingElements.splice(table.containerWidget.floatingElements.indexOf(table.containerWidget.floatingElements[i]), 1);
                        this.shiftedFloatingItemsFromTable.push(shape);
                        i--;
                    }
                }
            }
        };
        return Layout;
    }());
    exports.Layout = Layout;
});
