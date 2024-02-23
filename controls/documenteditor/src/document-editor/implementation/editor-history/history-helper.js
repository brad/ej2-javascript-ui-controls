define(["require", "exports", "../viewer/page"], function (require, exports, page_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModifiedLevel = (function () {
        function ModifiedLevel(owner, modified) {
            this.ownerListLevelIn = undefined;
            this.modifiedListLevelIn = undefined;
            this.ownerListLevel = owner;
            this.modifiedListLevel = modified;
        }
        Object.defineProperty(ModifiedLevel.prototype, "ownerListLevel", {
            get: function () {
                return this.ownerListLevelIn;
            },
            set: function (value) {
                this.ownerListLevelIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModifiedLevel.prototype, "modifiedListLevel", {
            get: function () {
                return this.modifiedListLevelIn;
            },
            set: function (value) {
                this.modifiedListLevelIn = value;
            },
            enumerable: true,
            configurable: true
        });
        ModifiedLevel.prototype.destroy = function () {
            this.ownerListLevel = undefined;
            this.modifiedListLevel = undefined;
        };
        return ModifiedLevel;
    }());
    exports.ModifiedLevel = ModifiedLevel;
    var ModifiedParagraphFormat = (function () {
        function ModifiedParagraphFormat(ownerFormat, modifiedFormat) {
            this.ownerFormatIn = undefined;
            this.modifiedFormatIn = undefined;
            this.ownerFormat = ownerFormat;
            this.modifiedFormat = modifiedFormat;
        }
        Object.defineProperty(ModifiedParagraphFormat.prototype, "ownerFormat", {
            get: function () {
                return this.ownerFormatIn;
            },
            set: function (value) {
                this.ownerFormatIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModifiedParagraphFormat.prototype, "modifiedFormat", {
            get: function () {
                return this.modifiedFormatIn;
            },
            set: function (value) {
                this.modifiedFormatIn = value;
            },
            enumerable: true,
            configurable: true
        });
        ModifiedParagraphFormat.prototype.destroy = function () {
            if (this.modifiedFormat) {
                this.modifiedFormat.destroy();
            }
            this.modifiedFormat = undefined;
            this.ownerFormat = undefined;
        };
        return ModifiedParagraphFormat;
    }());
    exports.ModifiedParagraphFormat = ModifiedParagraphFormat;
    var RowHistoryFormat = (function () {
        function RowHistoryFormat(table, startingPoint, rowFormat, owner) {
            this.startingPoint = startingPoint;
            this.rowFormat = rowFormat;
            this.rowHeightType = rowFormat.heightType;
            this.tableHierarchicalIndex = owner.selection.getHierarchicalIndex(table, '0');
        }
        RowHistoryFormat.prototype.revertChanges = function (isRedo, owner, table) {
            var currentRowHeightType = this.rowFormat.heightType;
            var row = table.childWidgets[this.rowFormat.ownerBase.index];
            owner.editorModule.tableResize.updateRowHeight(row, isRedo ? this.displacement : (-this.displacement));
            owner.documentHelper.layout.reLayoutTable(table);
            if (this.rowFormat.heightType !== this.rowHeightType) {
                this.rowFormat.heightType = this.rowHeightType;
            }
            this.rowHeightType = currentRowHeightType;
        };
        return RowHistoryFormat;
    }());
    exports.RowHistoryFormat = RowHistoryFormat;
    var TableHistoryInfo = (function () {
        function TableHistoryInfo(table, owner) {
            this.tableHolder = new page_1.WTableHolder();
            this.tableFormat = new TableFormatHistoryInfo();
            this.rows = [];
            this.owner = owner;
            this.copyProperties(table);
        }
        TableHistoryInfo.prototype.copyProperties = function (table) {
            if (table.tableHolder) {
                this.tableHolder = table.tableHolder.clone();
            }
            if (table.tableFormat) {
                this.tableFormat.leftIndent = table.tableFormat.leftIndent;
                this.tableFormat.preferredWidth = table.tableFormat.preferredWidth;
                this.tableFormat.preferredWidthType = table.tableFormat.preferredWidthType;
                this.tableFormat.allowAutoFit = table.tableFormat.allowAutoFit;
            }
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[parseInt(i.toString(), 10)];
                var rowFormat = new RowFormatHistoryInfo();
                rowFormat.gridBefore = row.rowFormat.gridBefore;
                rowFormat.gridBeforeWidth = row.rowFormat.gridBeforeWidth;
                rowFormat.gridBeforeWidthType = row.rowFormat.gridBeforeWidthType;
                rowFormat.gridAfter = row.rowFormat.gridAfter;
                rowFormat.gridAfterWidth = row.rowFormat.gridAfterWidth;
                rowFormat.gridAfterWidthType = row.rowFormat.gridAfterWidthType;
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[parseInt(j.toString(), 10)];
                    var cellFormat = new CellFormatHistoryInfo();
                    cellFormat.columnIndex = cell.columnIndex;
                    cellFormat.columnSpan = cell.cellFormat.columnSpan;
                    cellFormat.preferredWidth = cell.cellFormat.preferredWidth;
                    cellFormat.preferredWidthType = cell.cellFormat.preferredWidthType;
                    rowFormat.cells.push(cellFormat);
                }
                this.rows.push(rowFormat);
            }
            this.tableHierarchicalIndex = this.owner.selection.getHierarchicalIndex(table, '0');
        };
        TableHistoryInfo.prototype.destroy = function () {
            this.tableHierarchicalIndex = undefined;
            if (this.tableHolder) {
                this.tableHolder.destroy();
                this.tableHolder = undefined;
            }
            if (this.tableFormat) {
                this.tableFormat = null;
            }
            if (this.rows) {
                this.rows = [];
                this.rows = undefined;
            }
        };
        return TableHistoryInfo;
    }());
    exports.TableHistoryInfo = TableHistoryInfo;
    var TableFormatHistoryInfo = (function () {
        function TableFormatHistoryInfo() {
        }
        return TableFormatHistoryInfo;
    }());
    exports.TableFormatHistoryInfo = TableFormatHistoryInfo;
    var RowFormatHistoryInfo = (function () {
        function RowFormatHistoryInfo() {
            this.cells = [];
        }
        return RowFormatHistoryInfo;
    }());
    exports.RowFormatHistoryInfo = RowFormatHistoryInfo;
    var CellFormatHistoryInfo = (function () {
        function CellFormatHistoryInfo() {
        }
        return CellFormatHistoryInfo;
    }());
    exports.CellFormatHistoryInfo = CellFormatHistoryInfo;
    var CellHistoryFormat = (function () {
        function CellHistoryFormat(point) {
            this.startingPoint = point;
        }
        return CellHistoryFormat;
    }());
    exports.CellHistoryFormat = CellHistoryFormat;
});
