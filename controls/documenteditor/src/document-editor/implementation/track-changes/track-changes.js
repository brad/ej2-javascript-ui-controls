define(["require", "exports", "@syncfusion/ej2-base", "../viewer/page", "../format/character-format", "../format/row-format", "../../base/index"], function (require, exports, ej2_base_1, page_1, character_format_1, row_format_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Revision = (function () {
        function Revision(documentHelper, author, date) {
            this.author = null;
            this.date = null;
            this.range = [];
            this.revisionID = '';
            this.isContentRemoved = false;
            this.isTableRevision = false;
            this.canSkipTableItems = false;
            this.skipUnLinkElement = false;
            this.author = author;
            if (ej2_base_1.isNullOrUndefined(this.author)) {
                this.author = "Unknown";
            }
            this.date = date;
            this.owner = documentHelper;
        }
        Revision.prototype.handleAcceptReject = function (isFromAccept) {
            this.owner.selection.selectRevision(this);
            var selection = this.owner.selection;
            var startPos = selection.start;
            var endPos = selection.end;
            if (!selection.start.isExistBefore(selection.end)) {
                startPos = selection.end;
                endPos = selection.start;
            }
            var blockInfo = selection.getParagraphInfo(startPos);
            this.owner.editor.initHistory(isFromAccept ? 'Accept Change' : 'Reject Change');
            this.owner.editorHistory.currentBaseHistoryInfo.markerData.push(this.owner.editor.getMarkerData(undefined, undefined, this));
            if (this.revisionType === 'Deletion') {
                blockInfo = selection.getParagraphInfo(this.owner.selection.start);
                selection.editPosition = this.owner.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            }
            else {
                selection.editPosition = this.owner.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            }
            this.owner.editor.updateInsertPosition();
            this.isContentRemoved = false;
            this.canSkipTableItems = false;
            this.skipUnLinkElement = false;
            if (this.revisionType === 'Insertion' || this.revisionType === 'Deletion' || this.revisionType === 'MoveFrom' || this.revisionType === 'MoveTo') {
                this.owner.isShiftingEnabled = true;
                var rangeIndex = 0;
                while (this.range.length > 0) {
                    if (this.range[rangeIndex] instanceof page_1.ElementBox || this.range[rangeIndex] instanceof character_format_1.WCharacterFormat || this.range[rangeIndex] instanceof row_format_1.WRowFormat) {
                        if (this.range[rangeIndex] instanceof page_1.BookmarkElementBox && isFromAccept && this.revisionType === 'Deletion') {
                            var inline = this.range[rangeIndex];
                            if (this.owner.documentHelper.bookmarks.containsKey(inline.name)) {
                                this.owner.documentHelper.bookmarks.remove(inline.name);
                            }
                        }
                        var moveToNextItem = this.unlinkRangeItem(this.range[rangeIndex], this, isFromAccept, startPos, endPos);
                        if (moveToNextItem) {
                            rangeIndex++;
                        }
                        else {
                            rangeIndex = 0;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            this.isTableRevision = false;
            if (this.isContentRemoved) {
                var textPosition = selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
                this.owner.selection.selectContent(textPosition, true);
                this.owner.editor.updateEndPosition();
            }
            else {
                selection.selectRange(startPos, endPos);
                this.owner.editor.updateHistoryPosition(endPos, false);
            }
            if (this.owner.editorHistory && this.owner.editorHistory.currentBaseHistoryInfo.action !== 'BackSpace') {
                this.owner.editorHistory.currentBaseHistoryInfo.removedNodes.reverse();
            }
            if (this.owner.editorHistory) {
                if (this.owner.trackChangesPane.isTrackingPageBreak) {
                    this.owner.editorHistory.currentBaseHistoryInfo.action = 'TrackingPageBreak';
                }
                var editorHistory = this.owner.editorHistory;
                if (editorHistory.currentHistoryInfo && (editorHistory.currentHistoryInfo.action === 'Accept All' || editorHistory.currentHistoryInfo.action === 'Reject All')) {
                    if (this.owner.documentHelper.blockToShift) {
                        this.owner.documentHelper.layout.shiftLayoutedItems(false);
                    }
                }
                editorHistory.updateHistory();
            }
            this.owner.editor.reLayout(this.owner.selection);
            if (blockInfo.paragraph.isInHeaderFooter) {
                this.owner.editor.updateHeaderFooterWidget();
            }
        };
        Revision.prototype.handleGroupAcceptReject = function (isAccept) {
            if (this.owner.trackChangesPane.tableRevisions.containsKey(this)) {
                this.owner.editor.initComplexHistory(isAccept ? 'Accept All' : 'Reject All');
                var groupingAcceptReject = this.owner.trackChangesPane.tableRevisions.get(this);
                for (var i = groupingAcceptReject.length - 1; i >= 0; i--) {
                    if (isAccept) {
                        groupingAcceptReject[i].handleAcceptReject(true);
                    }
                    else {
                        groupingAcceptReject[i].handleAcceptReject(false);
                    }
                }
                if (this.owner.editorHistory) {
                    this.owner.editorHistory.updateComplexHistory();
                }
            }
        };
        Revision.prototype.accept = function () {
            var eventArgs = { author: this.author, cancel: false, revisionType: this.revisionType, actionType: 'Accept' };
            this.owner.trigger(index_1.revisionActionEvent, eventArgs);
            if (eventArgs.cancel) {
                return;
            }
            if (!this.owner.documentHelper.isTrackedOnlyMode) {
                if (!this.owner.revisions.skipGroupAcceptReject && this.range[0] instanceof row_format_1.WRowFormat
                    && this.owner.trackChangesPane.tableRevisions.containsKey(this)) {
                    this.handleGroupAcceptReject(true);
                }
                else {
                    this.handleAcceptReject(true);
                }
            }
        };
        Revision.prototype.reject = function () {
            var eventArgs = { author: this.author, cancel: false, revisionType: this.revisionType, actionType: 'Reject' };
            this.owner.trigger(index_1.revisionActionEvent, eventArgs);
            if (eventArgs.cancel) {
                return;
            }
            if (!this.owner.documentHelper.isTrackedOnlyMode) {
                if (!this.owner.revisions.skipGroupAcceptReject && this.range[0] instanceof row_format_1.WRowFormat
                    && this.owner.trackChangesPane.tableRevisions.containsKey(this)) {
                    this.handleGroupAcceptReject(false);
                }
                else {
                    this.handleAcceptReject(false);
                }
            }
        };
        Revision.prototype.unlinkRangeItem = function (item, revision, isFromAccept, start, end) {
            if (this.isTableRevision) {
                this.removeRangeRevisionForItem(item);
                if (revision.range.length === 0) {
                    this.owner.revisions.remove(revision);
                }
                return false;
            }
            var removeChanges = (!ej2_base_1.isNullOrUndefined(isFromAccept)) && ((revision.revisionType === 'MoveFrom' || revision.revisionType === 'Deletion') && isFromAccept) || ((revision.revisionType === 'Insertion' || revision.revisionType === 'MoveTo') && !isFromAccept);
            if (this.owner.selection.isTOC()) {
                if (removeChanges) {
                    this.owner.editor.deleteSelectedContents(this.owner.selection, true);
                    if (revision.range.length === 0) {
                        this.owner.revisions.remove(revision);
                    }
                    this.isContentRemoved = true;
                    this.owner.editorHistory.currentBaseHistoryInfo.action = 'BackSpace';
                }
                else {
                    while (this.range.length > 0) {
                        var currentElement = this.range[0];
                        this.removeRangeRevisionForItem(currentElement);
                        if (revision.range.length === 0) {
                            this.owner.revisions.remove(revision);
                        }
                    }
                    this.owner.editor.addRemovedNodes(this.revisionID);
                    this.owner.editorHistory.currentBaseHistoryInfo.action = 'AcceptTOC';
                }
                return false;
            }
            if (item instanceof page_1.ElementBox && !this.canSkipTableItems) {
                if (removeChanges) {
                    if (!this.skipeElementRemoval(item)) {
                        this.owner.editor.addRemovedNodes(item.clone());
                    }
                    else {
                        this.skipUnLinkElement = true;
                        return true;
                    }
                }
                else {
                    this.owner.editorHistory.currentBaseHistoryInfo.action = 'ClearRevisions';
                    this.updateRevisionID();
                    this.removeRevisionFromPara(start, end);
                    this.owner.trackChangesPane.isTrackingPageBreak = false;
                }
            }
            else if (!this.canSkipTableItems && (item instanceof character_format_1.WCharacterFormat) && (!removeChanges)) {
                this.owner.editorHistory.currentBaseHistoryInfo.action = 'ClearRevisions';
                this.updateRevisionID();
                this.removeRevisionFromPara(start, end);
            }
            else if (item instanceof row_format_1.WRowFormat && !removeChanges) {
                this.isTableRevision = true;
                var tableWidget = item.ownerBase.ownerTable;
                var currentRow = item.ownerBase;
                this.owner.editorHistory.currentBaseHistoryInfo.action = 'RemoveRowTrack';
                this.owner.editor.cloneTableToHistoryInfo(tableWidget);
            }
            removeChanges = removeChanges && !this.canSkipTableItems;
            if (item instanceof page_1.ElementBox && removeChanges) {
                var currentPara = item.line.paragraph;
                this.removeRevisionItemsFromRange(item);
                if (item instanceof page_1.FootnoteElementBox) {
                    if (item.footnoteType === 'Footnote') {
                        this.owner.editor.removeFootnote(item);
                    }
                }
                this.removeItem(item);
                this.isContentRemoved = true;
                this.owner.documentHelper.layout.reLayoutParagraph(currentPara, 0, 0);
                if (ej2_base_1.isNullOrUndefined(currentPara.childWidgets)) {
                    var textPosition = this.owner.selection.getTextPosBasedOnLogicalIndex(this.owner.selection.editPosition);
                    this.owner.selection.selectContent(textPosition, true);
                }
            }
            else if (item instanceof character_format_1.WCharacterFormat && removeChanges) {
                this.isContentRemoved = true;
                this.skipUnLinkElement = false;
                this.removeRevisionItemsFromRange(item);
                if (revision.range.length === 1) {
                    this.owner.editor.deleteSelectedContents(this.owner.selection, true);
                }
                else {
                    this.owner.editor.deleteSelectedContents(this.owner.selection, true);
                    this.removeRevisionFromPara(start, end);
                    var rangeIndex = revision.range.indexOf(item);
                    revision.range.splice(rangeIndex, 1);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
                    while (this.range.length > 0) {
                        this.removeRangeRevisionForItem(this.range[0]);
                    }
                }
                this.owner.editorHistory.currentBaseHistoryInfo.action = 'BackSpace';
                this.owner.editorHistory.currentBaseHistoryInfo.isAcceptOrReject = isFromAccept ? 'Accept' : 'Reject';
            }
            else if (item instanceof row_format_1.WRowFormat && removeChanges) {
                var tableWidget = item.ownerBase.ownerTable;
                tableWidget = tableWidget.combineWidget(this.owner.viewer);
                var currentRow = item.ownerBase;
                this.removeRevisionItemsFromRange(item);
                this.owner.editorHistory.currentBaseHistoryInfo.action = 'DeleteCells';
                this.owner.editor.cloneTableToHistoryInfo(tableWidget);
                this.owner.editor.removeDeletedCellRevision(currentRow);
                this.isContentRemoved = true;
                tableWidget.removeChild(tableWidget.childWidgets.indexOf(currentRow));
                this.canSkipTableItems = true;
                this.owner.editor.removeFieldInBlock(currentRow);
                this.owner.editor.removeFieldInBlock(currentRow, true);
                this.owner.editor.removeFieldInBlock(currentRow, undefined, true);
                currentRow.destroy();
                if (tableWidget.childWidgets.length === 0) {
                    this.owner.selection.editPosition = this.owner.selection.getHierarchicalIndex(tableWidget, '0');
                    this.owner.editor.removeBlock(tableWidget);
                    tableWidget.destroy();
                }
                else {
                    this.owner.editor.updateTable(tableWidget, true);
                }
            }
            if (!(item instanceof row_format_1.WRowFormat) || !removeChanges) {
                if (!this.skipUnLinkElement) {
                    this.removeRangeRevisionForItem(item);
                }
            }
            if (revision.range.length === 0) {
                this.owner.revisions.remove(revision);
            }
            return false;
        };
        Revision.prototype.removeRevisionFromPara = function (start, end) {
            var blockInfo = this.owner.selection.getParagraphInfo(start);
            var endBlockInfo = this.owner.selection.getParagraphInfo(end);
            var para = blockInfo.paragraph;
            while (para instanceof page_1.ParagraphWidget) {
                if (para.characterFormat.revisions.length > 0) {
                    for (var i = 0; i < para.characterFormat.revisions.length; i++) {
                        if (para.characterFormat.revisions[i].range.length === 0) {
                            var revisionIndex = para.characterFormat.revisions.indexOf(para.characterFormat.revisions[i]);
                            para.characterFormat.revisions.splice(revisionIndex, 1);
                            i--;
                        }
                    }
                }
                if (endBlockInfo.paragraph === para) {
                    para = undefined;
                }
                else {
                    para = para.nextWidget;
                }
            }
        };
        Revision.prototype.updateRevisionID = function () {
            this.owner.editor.addRemovedNodes(this.revisionID);
            while (this.range.length > 0) {
                this.removeRangeRevisionForItem(this.range[0]);
            }
        };
        Revision.prototype.removeRevisionItemsFromRange = function (item) {
            if (item.revisions.length > 0) {
                for (var revisionIndex = 0; revisionIndex < item.revisions.length; revisionIndex++) {
                    var currentRevision = item.revisions[revisionIndex];
                    if (this.revisionID !== currentRevision.revisionID) {
                        var rangeIndex = currentRevision.range.indexOf(item);
                        item.revisions[revisionIndex].range.splice(rangeIndex, 1);
                        this.owner.trackChangesPane.updateCurrentTrackChanges(item.revisions[revisionIndex]);
                    }
                    if (currentRevision.range.length === 0) {
                        this.owner.revisions.remove(currentRevision);
                    }
                }
            }
        };
        Revision.prototype.removeRangeRevisionForItem = function (item) {
            var revisionIndex = item.revisions.indexOf(this);
            if (revisionIndex >= 0) {
                item.revisions.splice(revisionIndex, 1);
                var rangeIndex = this.range.indexOf(item);
                this.range.splice(rangeIndex, 1);
                this.owner.trackChangesPane.updateCurrentTrackChanges(this);
            }
        };
        Revision.prototype.skipeElementRemoval = function (element) {
            var elementPara = element.paragraph;
            if (elementPara.characterFormat.revisions.length > 0) {
                for (var i = 0; i < elementPara.characterFormat.revisions.length; i++) {
                    var currentRevision = elementPara.characterFormat.revisions[i];
                    var rangeIndex = currentRevision.range.indexOf(element);
                    if (rangeIndex >= 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        Revision.prototype.removeRevisionFromRow = function (row) {
            this.owner.editor.unlinkRangeFromRevision(row.rowFormat);
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cellWidget = row.childWidgets[i];
                this.owner.editor.removeRevisionForCell(cellWidget, false);
            }
        };
        Revision.prototype.removeItem = function (element) {
            var paraWidget = element.line.paragraph;
            this.owner.editor.unLinkFieldCharacter(element);
            var elementIndex = element.line.children.indexOf(element);
            element.line.children.splice(elementIndex, 1);
            var paraFloatingElementIndex = element.line.paragraph.floatingElements.indexOf(element);
            element.line.paragraph.floatingElements.splice(paraFloatingElementIndex, 1);
            var blockFloatingElementIndex = element.line.paragraph.bodyWidget.floatingElements.indexOf(element);
            if (blockFloatingElementIndex > -1) {
                element.line.paragraph.bodyWidget.floatingElements.splice(blockFloatingElementIndex, 1);
            }
            this.owner.editor.removeEmptyLine(paraWidget);
        };
        Revision.prototype.canSkipCloning = function () {
            if (!ej2_base_1.isNullOrUndefined(this.owner) && this.owner.editorHistory && this.owner.editorHistory.currentBaseHistoryInfo) {
                var baseHistoryInfo = this.owner.editorHistory.currentBaseHistoryInfo;
                if (baseHistoryInfo.action === 'DeleteCells') {
                    return true;
                }
            }
            return false;
        };
        Revision.prototype.destroy = function () {
            this.author = undefined;
            this.revisionType = undefined;
            this.revisionID = undefined;
            this.date = undefined;
            this.range = [];
            this.range = undefined;
            this.owner = undefined;
        };
        Revision.prototype.clone = function () {
            if (this.canSkipCloning()) {
                return this;
            }
            var revision = new Revision(undefined, this.author, this.date);
            revision.revisionID = this.revisionID;
            revision.revisionType = this.revisionType;
            return revision;
        };
        Revision.cloneRevisions = function (revisions) {
            var clonedRevisions = [];
            for (var i = 0; i < revisions.length; i++) {
                clonedRevisions.push(revisions[i].revisionID);
            }
            return clonedRevisions;
        };
        return Revision;
    }());
    exports.Revision = Revision;
    var RevisionCollection = (function () {
        function RevisionCollection(owner) {
            this.changes = [];
            this.skipGroupAcceptReject = false;
            this.owner = owner;
        }
        RevisionCollection.prototype.get = function (index) {
            if (index >= this.changes.length || index < 0) {
                throw new ReferenceError('Provided index is not within the range');
            }
            return this.changes[index];
        };
        Object.defineProperty(RevisionCollection.prototype, "length", {
            get: function () {
                return this.changes.length;
            },
            enumerable: true,
            configurable: true
        });
        RevisionCollection.prototype.remove = function (revision) {
            if (ej2_base_1.isNullOrUndefined(revision) || this.changes.indexOf(revision) < 0) {
                return;
            }
            this.changes.splice(this.changes.indexOf(revision), 1);
            if (this.owner.trackChangesPane.revisions.indexOf(revision) !== -1) {
                var index = this.owner.trackChangesPane.revisions.indexOf(revision);
                var removeChild = !(this.owner.trackChangesPane.tableRevisions.containsKey(revision) && (this.owner.trackChangesPane.tableRevisions.get(revision))[(this.owner.trackChangesPane.tableRevisions.get(revision)).length - 1] !== revision);
                var changesSingleView = this.owner.trackChangesPane.changes.get(revision);
                if (removeChild) {
                    this.owner.trackChangesPane.changesInfoDiv.removeChild(changesSingleView.outerSingleDiv);
                }
                this.owner.trackChangesPane.revisions.splice(index, 1);
                this.owner.trackChangesPane.changes.remove(revision);
                if (this.owner.trackChangesPane.renderedChanges.containsKey(revision)) {
                    this.owner.trackChangesPane.renderedChanges.remove(revision);
                }
                if (this.owner.trackChangesPane.tableRevisions.containsKey(revision)) {
                    this.owner.trackChangesPane.tableRevisions.remove(revision);
                }
            }
        };
        RevisionCollection.prototype.acceptAll = function () {
            if (!this.owner.isReadOnly && !this.owner.documentHelper.isTrackedOnlyMode) {
                this.handleRevisionCollection(true);
            }
        };
        RevisionCollection.prototype.rejectAll = function () {
            if (!this.owner.isReadOnly && !this.owner.documentHelper.isTrackedOnlyMode) {
                this.handleRevisionCollection(false);
            }
        };
        RevisionCollection.prototype.handleRevisionCollection = function (isfromAcceptAll, changes) {
            this.skipGroupAcceptReject = true;
            var selection = this.owner.selection;
            var startPos = selection.start;
            var endPos = selection.end;
            var revisionCollec = changes ? changes : this.changes;
            if (revisionCollec.length <= 0) {
                return;
            }
            if (!selection.start.isExistBefore(selection.end)) {
                startPos = selection.end;
                endPos = selection.start;
            }
            startPos = startPos.clone();
            endPos = endPos.clone();
            if (isfromAcceptAll) {
                this.owner.editor.initComplexHistory('Accept All');
            }
            else {
                this.owner.editor.initComplexHistory('Reject All');
            }
            while (revisionCollec.length > 0) {
                if (isfromAcceptAll) {
                    revisionCollec[0].accept();
                }
                else {
                    revisionCollec[0].reject();
                }
                if (changes) {
                    revisionCollec.splice(0, 1);
                }
                if (this.owner.enableHeaderAndFooter) {
                    this.owner.editor.updateHeaderFooterWidget();
                }
            }
            if (!ej2_base_1.isNullOrUndefined(selection.editPosition)) {
                var textPosition = selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
                this.owner.selection.selectContent(textPosition, true);
            }
            if (this.owner.editorHistory) {
                this.owner.editorHistory.updateComplexHistory();
                if (ej2_base_1.isNullOrUndefined(selection.editPosition)) {
                    this.owner.editorHistory.undoStack.pop();
                }
            }
            this.owner.editor.isSkipOperationsBuild = true;
            this.owner.editor.reLayout(this.owner.selection, false);
            this.owner.editor.isSkipOperationsBuild = false;
            this.skipGroupAcceptReject = false;
        };
        RevisionCollection.prototype.clear = function () {
            this.changes = [];
        };
        RevisionCollection.prototype.destroy = function () {
            if (this.changes) {
                for (var i = 0; i < this.changes.length; i++) {
                    var revision = this.changes[i];
                    revision.destroy();
                }
                this.changes = [];
            }
            this.changes = undefined;
            this.owner = undefined;
        };
        return RevisionCollection;
    }());
    exports.RevisionCollection = RevisionCollection;
});
