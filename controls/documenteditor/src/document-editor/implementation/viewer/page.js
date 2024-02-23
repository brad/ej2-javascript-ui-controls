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
define(["require", "exports", "../format/index", "../../base/types", "../format/index", "@syncfusion/ej2-base", "../../base/dictionary", "../editor/editor-helper", "./viewer", "../track-changes/track-changes"], function (require, exports, index_1, types_1, index_2, ej2_base_1, dictionary_1, editor_helper_1, viewer_1, track_changes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Rect = (function () {
        function Rect(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Object.defineProperty(Rect.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Rect.prototype.isIntersecting = function (currentBound) {
            if (currentBound.y > this.bottom || this.y > currentBound.bottom ||
                currentBound.x > this.right || this.x > currentBound.right) {
                return false;
            }
            return true;
        };
        Rect.prototype.clone = function () {
            return new Rect(this.x, this.y, this.width, this.height);
        };
        return Rect;
    }());
    exports.Rect = Rect;
    var Padding = (function () {
        function Padding(right, left, top, bottom) {
            this.right = 10;
            this.left = 10;
            this.top = 10;
            this.bottom = 10;
            this.right = right;
            this.left = left;
            this.top = top;
            this.bottom = bottom;
        }
        return Padding;
    }());
    exports.Padding = Padding;
    var Margin = (function () {
        function Margin(leftMargin, topMargin, rightMargin, bottomMargin) {
            this.left = leftMargin;
            this.top = topMargin;
            this.right = rightMargin;
            this.bottom = bottomMargin;
        }
        Margin.prototype.clone = function () {
            return new Margin(this.left, this.top, this.right, this.bottom);
        };
        Margin.prototype.destroy = function () {
            this.left = undefined;
            this.right = undefined;
            this.top = undefined;
            this.bottom = undefined;
        };
        return Margin;
    }());
    exports.Margin = Margin;
    var Widget = (function () {
        function Widget() {
            this.childWidgets = [];
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.index = 0;
        }
        Object.defineProperty(Widget.prototype, "indexInOwner", {
            get: function () {
                if (this instanceof BodyWidget && this.page) {
                    if (this.containerWidget instanceof FootNoteWidget) {
                        return this.containerWidget.bodyWidgets.indexOf(this);
                    }
                    else {
                        return this.page.bodyWidgets.indexOf(this);
                    }
                }
                else if (this.containerWidget && this.containerWidget.childWidgets) {
                    return this.containerWidget.childWidgets.indexOf(this);
                }
                else if (this instanceof FootNoteWidget) {
                    return 0;
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "firstChild", {
            get: function () {
                return this.childWidgets.length > 0 ? this.childWidgets[0] : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "lastChild", {
            get: function () {
                if (this.childWidgets) {
                    return this.childWidgets.length > 0 ?
                        this.childWidgets[this.childWidgets.length - 1] : undefined;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "previousWidget", {
            get: function () {
                var widget = this;
                var index = this.indexInOwner;
                if (widget instanceof BodyWidget) {
                    widget = index > 0 ? widget.page.bodyWidgets[index - 1] : undefined;
                }
                else {
                    widget = index > 0 ? widget.containerWidget.childWidgets[index - 1] : undefined;
                }
                return widget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "nextWidget", {
            get: function () {
                var widget = this;
                var index = this.indexInOwner;
                if (index === -1) {
                    return undefined;
                }
                if (widget instanceof BodyWidget) {
                    widget = index < widget.page.bodyWidgets.length - 1 ?
                        widget.page.bodyWidgets[index + 1] : undefined;
                }
                else {
                    widget = index < widget.containerWidget.childWidgets.length - 1 ?
                        widget.containerWidget.childWidgets[index + 1] : undefined;
                }
                return widget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "previousRenderedWidget", {
            get: function () {
                var widget = this;
                var index = this.indexInOwner;
                if (index < 0) {
                    return undefined;
                }
                if (widget instanceof BodyWidget) {
                    if (index > 0 && !(widget.containerWidget instanceof FootNoteWidget)) {
                        widget = widget.page.bodyWidgets[index - 1];
                    }
                    else if ((widget.containerWidget instanceof FootNoteWidget) && !widget.page.documentHelper.owner.editor.removeEditRange) {
                        if (index <= 0) {
                            return undefined;
                        }
                        widget = widget.containerWidget.bodyWidgets[index - 1];
                    }
                    else {
                        var page = widget.page.previousPage;
                        widget = page && page.bodyWidgets.length > 0 ? page.bodyWidgets[page.bodyWidgets.length - 1] : undefined;
                    }
                }
                else if (widget instanceof FootNoteWidget) {
                    var page = widget.page;
                    while (page.previousPage) {
                        page = page.previousPage;
                        widget = page.footnoteWidget;
                        if (!ej2_base_1.isNullOrUndefined(widget)) {
                            break;
                        }
                    }
                }
                else {
                    if (index > 0) {
                        widget = widget.containerWidget.childWidgets[index - 1];
                    }
                    else {
                        var previousContainer = undefined;
                        if (widget.containerWidget instanceof TableCellWidget) {
                            previousContainer = widget.containerWidget.getPreviousSplitWidget();
                        }
                        else if (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget &&
                            widget.containerWidget.containerWidget.footNoteType === 'Endnote') {
                            previousContainer = widget.containerWidget.previousWidget ? widget.containerWidget.previousWidget : widget.containerWidget.previousRenderedWidget;
                        }
                        else if (!(widget.containerWidget instanceof TableRowWidget
                            || widget.containerWidget instanceof HeaderFooterWidget || (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget))) {
                            previousContainer = widget.containerWidget.previousRenderedWidget;
                        }
                        while (previousContainer && previousContainer.childWidgets.length === 0) {
                            previousContainer = previousContainer.previousRenderedWidget;
                            if (ej2_base_1.isNullOrUndefined(previousContainer)) {
                                break;
                            }
                        }
                        widget = previousContainer && previousContainer.constructor === widget.containerWidget.constructor ?
                            previousContainer.lastChild : undefined;
                    }
                }
                return widget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "nextRenderedWidget", {
            get: function () {
                var widget = this;
                var index = this.indexInOwner;
                if (index < 0) {
                    return undefined;
                }
                if (widget instanceof BodyWidget) {
                    if (index < widget.page.bodyWidgets.length - 1 && !(widget.containerWidget instanceof FootNoteWidget)) {
                        widget = widget.page.bodyWidgets[index + 1];
                    }
                    else if (widget.containerWidget instanceof FootNoteWidget) {
                        if (index >= widget.containerWidget.bodyWidgets.length - 1 && !widget.page.documentHelper.owner.editor.removeEditRange) {
                            return undefined;
                        }
                        widget = widget.containerWidget.bodyWidgets[index + 1];
                    }
                    else if (widget.page.allowNextPageRendering) {
                        var page = widget.page.nextPage;
                        widget = page && page.bodyWidgets.length > 0 ? page.bodyWidgets[0] : undefined;
                    }
                    else {
                        widget = undefined;
                    }
                }
                else if (widget instanceof FootNoteWidget) {
                    var page = widget.page;
                    while (page.allowNextPageRendering && page.nextPage) {
                        page = page.nextPage;
                        widget = page.footnoteWidget;
                        if (!ej2_base_1.isNullOrUndefined(widget)) {
                            break;
                        }
                    }
                }
                else {
                    if (index < widget.containerWidget.childWidgets.length - 1) {
                        widget = widget.containerWidget.childWidgets[index + 1];
                    }
                    else {
                        var nextContainer = undefined;
                        if (widget.containerWidget instanceof TableCellWidget) {
                            nextContainer = widget.containerWidget.getNextSplitWidget();
                        }
                        else if (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget &&
                            widget.containerWidget.containerWidget.footNoteType === 'Endnote') {
                            nextContainer = widget.containerWidget.nextWidget ? widget.containerWidget.nextWidget : widget.containerWidget.nextRenderedWidget;
                        }
                        else if (!(widget.containerWidget instanceof TableRowWidget
                            || widget.containerWidget instanceof HeaderFooterWidget || (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget))) {
                            nextContainer = widget.containerWidget.nextRenderedWidget;
                        }
                        while (nextContainer && nextContainer.childWidgets.length === 0 && !(nextContainer instanceof TableCellWidget)) {
                            nextContainer = nextContainer.nextRenderedWidget;
                            if (ej2_base_1.isNullOrUndefined(nextContainer)) {
                                break;
                            }
                        }
                        widget = nextContainer && nextContainer.constructor === widget.containerWidget.constructor ?
                            nextContainer.firstChild : undefined;
                    }
                }
                return widget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "previousSplitWidget", {
            get: function () {
                var widget = this;
                if (widget instanceof TableCellWidget) {
                    return widget.getPreviousSplitWidget();
                }
                else {
                    var previous = widget.previousRenderedWidget;
                    if (widget instanceof BodyWidget && previous instanceof BodyWidget && widget.equals(previous)) {
                        return previous;
                    }
                    else if (previous instanceof BlockWidget && widget.index === previous.index && widget.equals(previous)) {
                        return previous;
                    }
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "nextSplitWidget", {
            get: function () {
                var widget = this;
                if (widget instanceof TableCellWidget) {
                    return widget.getNextSplitWidget();
                }
                else {
                    var next = widget.nextRenderedWidget;
                    if (widget instanceof BodyWidget && next instanceof BodyWidget && widget.equals(next)) {
                        return next;
                    }
                    else if (next instanceof BlockWidget && widget.index === next.index && widget.equals(next)) {
                        return next;
                    }
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype.getPreviousSplitWidgets = function () {
            var widgets = [];
            var widget = this.previousSplitWidget;
            while (widget) {
                widgets.unshift(widget);
                widget = widget.previousSplitWidget;
                if (widget && widget == widget.previousSplitWidget) {
                    break;
                }
            }
            return widgets;
        };
        Widget.prototype.getSplitWidgets = function () {
            var widgets = this.getPreviousSplitWidgets();
            var widget = this;
            while (widget) {
                widgets.push(widget);
                widget = widget.nextSplitWidget;
            }
            return widgets;
        };
        Widget.prototype.combineWidget = function (viewer) {
            var root = this;
            var widgets = this.getSplitWidgets();
            if (widgets.length > 1) {
                root = widgets.shift();
                while (widgets.length > 0) {
                    var splitWidget = widgets.shift();
                    root.combine(splitWidget, viewer);
                }
            }
            if (root instanceof TableWidget) {
                root.combineRows(viewer);
            }
            return root;
        };
        Widget.prototype.combine = function (widget, viewer) {
            if (widget.childWidgets.length > 0) {
                var lastChild = this.lastChild;
                if (lastChild instanceof TableWidget) {
                    lastChild.combineWidget(viewer);
                }
                else {
                    var firstChild = widget.firstChild;
                    if (!(widget instanceof TableWidget) && lastChild instanceof Widget && firstChild instanceof Widget &&
                        lastChild.index === firstChild.index) {
                        lastChild.combine(widget.childWidgets.shift(), viewer);
                    }
                }
                this.addWidgets(widget.childWidgets);
                widget.childWidgets = [];
            }
            widget.destroyInternal(viewer);
        };
        Widget.prototype.addWidgets = function (childWidgets) {
            while (childWidgets.length > 0) {
                var widget = childWidgets.shift();
                if (widget instanceof LineWidget && this instanceof ParagraphWidget) {
                    widget.paragraph = this;
                    this.height += widget.height;
                }
                else if (widget instanceof Widget) {
                    var lastChild = this.lastChild;
                    widget.containerWidget = this;
                    widget.y = lastChild instanceof Widget ? lastChild.y + lastChild.height : this.y;
                    this.height += widget.height;
                }
                if (widget instanceof TableRowWidget) {
                    var previousRow = this.childWidgets[this.childWidgets.length - 1];
                    for (var i = 0; i < previousRow.childWidgets.length; i++) {
                        var previousCell = previousRow.childWidgets[i];
                        if (previousCell.cellFormat.rowSpan > 1) {
                            for (var j = 0; j < widget.childWidgets.length; j++) {
                                var currentCell = widget.childWidgets[j];
                                if (currentCell.columnIndex === previousCell.columnIndex && currentCell.isSplittedCell && currentCell.cellFormat.rowSpan === previousCell.cellFormat.rowSpan) {
                                    for (var k = 0; k < currentCell.childWidgets.length; k++) {
                                        var block = currentCell.childWidgets[k];
                                        currentCell.childWidgets.splice(block.indexInOwner, 1);
                                        previousCell.childWidgets.push(block);
                                        block.containerWidget = previousCell;
                                        k--;
                                    }
                                    currentCell.ownerRow.childWidgets.splice(currentCell.indexInOwner, 1);
                                    currentCell.containerWidget = undefined;
                                    j--;
                                }
                            }
                        }
                    }
                }
                this.childWidgets.push(widget);
            }
        };
        Widget.prototype.removeChild = function (index) {
            if (index > -1 && index < this.childWidgets.length) {
                this.childWidgets.splice(index, 1);
            }
        };
        Widget.prototype.destroy = function () {
            if (this.childWidgets) {
                while (this.childWidgets.length > 0) {
                    var child = this.childWidgets.pop();
                    if (child instanceof LineWidget || child instanceof Widget) {
                        child.destroy();
                    }
                }
            }
            this.childWidgets = undefined;
            if (this.containerWidget) {
                this.containerWidget.removeChild(this.indexInOwner);
            }
            this.containerWidget = undefined;
            this.margin = undefined;
            this.x = undefined;
            this.y = undefined;
            this.width = undefined;
            this.height = undefined;
            this.index = undefined;
        };
        Widget.prototype.componentDestroy = function () {
            if (this.childWidgets) {
                while (this.childWidgets.length > 0) {
                    var child = this.childWidgets.pop();
                    if (child instanceof LineWidget || child instanceof Widget) {
                        child.componentDestroy();
                    }
                }
            }
            this.childWidgets = undefined;
            if (this.margin) {
                this.margin.destroy();
            }
            this.margin = undefined;
            this.x = undefined;
            this.y = undefined;
            this.width = undefined;
            this.height = undefined;
            this.index = undefined;
            this.containerWidget = undefined;
        };
        return Widget;
    }());
    exports.Widget = Widget;
    var BlockContainer = (function (_super) {
        __extends(BlockContainer, _super);
        function BlockContainer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.floatingElements = [];
            _this.footNoteReference = undefined;
            _this.sectionFormatIn = undefined;
            _this.columnIndex = 0;
            return _this;
        }
        Object.defineProperty(BlockContainer.prototype, "sectionFormat", {
            get: function () {
                var container = this;
                if (container instanceof BodyWidget) {
                    return container.sectionFormatIn;
                }
                else if (container.page && !ej2_base_1.isNullOrUndefined(container.page.bodyWidgets)) {
                    return container.page.bodyWidgets[0].sectionFormat;
                }
                return undefined;
            },
            set: function (value) {
                if (this instanceof BodyWidget) {
                    this.sectionFormatIn = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockContainer.prototype, "sectionIndex", {
            get: function () {
                var container = this;
                var index = 0;
                if (container instanceof BodyWidget) {
                    index = container.index;
                }
                else if (container.page) {
                    index = container.page.bodyWidgets[0].index;
                }
                return index;
            },
            enumerable: true,
            configurable: true
        });
        BlockContainer.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
            var documentHelper = undefined;
            var node = this;
            if (node instanceof BodyWidget) {
                hierarchicalIndex = node.index + ';' + hierarchicalIndex;
            }
            else if (node instanceof FootNoteWidget) {
                if (node.footNoteType === 'Footnote') {
                    hierarchicalIndex = 'FN' + ';' + hierarchicalIndex;
                }
                else {
                    hierarchicalIndex = 'EN' + ';' + hierarchicalIndex;
                }
            }
            else {
                if (node.headerFooterType.indexOf('Header') !== -1) {
                    hierarchicalIndex = 'H' + ';' + hierarchicalIndex;
                }
                else {
                    hierarchicalIndex = 'F' + ';' + hierarchicalIndex;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(node.page)) {
                documentHelper = this.page.documentHelper;
                var pageIndex = documentHelper.pages.indexOf(this.page);
                return pageIndex + ';' + hierarchicalIndex;
            }
            return hierarchicalIndex;
        };
        BlockContainer.prototype.componentDestroy = function () {
            if (this.sectionFormatIn) {
                this.sectionFormatIn.destroy();
            }
            this.sectionFormatIn = undefined;
            this.floatingElements = [];
            this.removedHeaderFooters = [];
            this.footNoteReference = undefined;
            this.page = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return BlockContainer;
    }(Widget));
    exports.BlockContainer = BlockContainer;
    var BodyWidget = (function (_super) {
        __extends(BodyWidget, _super);
        function BodyWidget() {
            return _super.call(this) || this;
        }
        BodyWidget.prototype.equals = function (widget) {
            return widget instanceof BodyWidget && widget.sectionFormat === this.sectionFormat;
        };
        BodyWidget.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
            var documentHelper = undefined;
            var node = this;
            if (node.containerWidget instanceof FootNoteWidget) {
                hierarchicalIndex = node.containerWidget.bodyWidgets.indexOf(node) + ';' + hierarchicalIndex;
                if (node.containerWidget.footNoteType === 'Footnote') {
                    hierarchicalIndex = 'FN' + ';' + hierarchicalIndex;
                }
                else {
                    hierarchicalIndex = 'EN' + ';' + hierarchicalIndex;
                }
            }
            else {
                if (this.page && this.page.bodyWidgets.indexOf(this) !== -1) {
                    hierarchicalIndex = this.page.bodyWidgets.indexOf(this) + ';' + hierarchicalIndex;
                }
                else {
                    hierarchicalIndex = node.index + ';' + hierarchicalIndex;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(node.page)) {
                documentHelper = this.page.documentHelper;
                var pageIndex = documentHelper.pages.indexOf(this.page);
                return pageIndex + ';' + hierarchicalIndex;
            }
            return hierarchicalIndex;
        };
        BodyWidget.prototype.getTableCellWidget = function (touchPoint) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                if (this.childWidgets[i] instanceof TableWidget) {
                    var childWidget = this.childWidgets[i];
                    var tableWidth = 0;
                    if (childWidget.wrapTextAround) {
                        tableWidth = childWidget.getTableCellWidth();
                    }
                    if (!(childWidget.wrapTextAround) && childWidget.y <= touchPoint.y && (childWidget.y + childWidget.height) >= touchPoint.y) {
                        return childWidget.getTableCellWidget(touchPoint);
                    }
                    if ((childWidget.wrapTextAround &&
                        (childWidget.x <= touchPoint.x && (childWidget.x + tableWidth) >= touchPoint.x &&
                            childWidget.y <= touchPoint.y && (childWidget.y + childWidget.height) >= touchPoint.y))) {
                        return childWidget.getTableCellWidget(touchPoint);
                    }
                }
            }
            var tableCellWidget = undefined;
            if (this.childWidgets.length > 0) {
                if (this.childWidgets[0].y <= touchPoint.y) {
                    tableCellWidget = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(touchPoint);
                }
                else {
                    tableCellWidget = this.childWidgets[0].getTableCellWidget(touchPoint);
                }
            }
            return tableCellWidget;
        };
        BodyWidget.prototype.destroyInternal = function (viewer) {
            var height = this.height;
            if (!ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                for (var n = 0; n < this.childWidgets.length; n++) {
                    var chilgWidget = this.childWidgets[n];
                    if (chilgWidget instanceof ParagraphWidget) {
                        chilgWidget.destroyInternal(viewer);
                    }
                    else {
                        chilgWidget.destroyInternal(viewer);
                    }
                    if (ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                        break;
                    }
                    n--;
                }
                this.childWidgets = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.page)) {
                var index = this.indexInOwner;
                if (this.indexInOwner > -1) {
                    this.page.bodyWidgets.splice(index, 1);
                    if (this.page.bodyWidgets.length === 0) {
                        this.page.destroy();
                    }
                    else if ((this instanceof HeaderFooterWidget)
                        && this.page.headerWidget === this) {
                        this.page.headerWidget = undefined;
                    }
                    else if ((this instanceof HeaderFooterWidget)
                        && this.page.footerWidget === this) {
                        this.page.footerWidget = undefined;
                    }
                    this.page = undefined;
                }
            }
            this.destroy();
        };
        BodyWidget.prototype.destroy = function () {
            this.sectionFormatIn = undefined;
            if (this.page && this.page.headerWidgetIn) {
                this.page.headerWidgetIn.page = undefined;
            }
            if (this.page && this.page.footerWidgetIn) {
                this.page.footerWidgetIn.page = undefined;
            }
            this.page = undefined;
            _super.prototype.destroy.call(this);
        };
        BodyWidget.prototype.componentDestroy = function () {
            _super.prototype.componentDestroy.call(this);
        };
        return BodyWidget;
    }(BlockContainer));
    exports.BodyWidget = BodyWidget;
    var HeaderFooterWidget = (function (_super) {
        __extends(HeaderFooterWidget, _super);
        function HeaderFooterWidget(type) {
            var _this = _super.call(this) || this;
            _this.isEmpty = false;
            _this.headerFooterType = type;
            return _this;
        }
        HeaderFooterWidget.prototype.getTableCellWidget = function (point) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                if (this.childWidgets[i] instanceof TableWidget) {
                    var child = this.childWidgets[i];
                    var tableWidth = 0;
                    if (child.wrapTextAround) {
                        tableWidth = child.getTableCellWidth();
                    }
                    if (!(child.wrapTextAround) && child.y <= point.y && (child.y + child.height) >= point.y) {
                        return child.getTableCellWidget(point);
                    }
                    if ((child.wrapTextAround &&
                        (child.x <= point.x && (child.x + tableWidth) >= point.x &&
                            child.y <= point.y && (child.y + child.height) >= point.y))) {
                        return child.getTableCellWidget(point);
                    }
                }
            }
            var tableCell = undefined;
            if (this.childWidgets.length > 0) {
                if (this.childWidgets[0].y <= point.y) {
                    tableCell = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(point);
                }
                else {
                    tableCell = this.childWidgets[0].getTableCellWidget(point);
                }
            }
            return tableCell;
        };
        HeaderFooterWidget.prototype.equals = function (widget) {
            return widget instanceof HeaderFooterWidget
                && widget.containerWidget === this.containerWidget;
        };
        HeaderFooterWidget.prototype.clone = function () {
            var headerFooter = new HeaderFooterWidget(this.headerFooterType);
            for (var i = 0; i < this.childWidgets.length; i++) {
                var block = this.childWidgets[i].clone();
                headerFooter.childWidgets.push(block);
                block.index = i;
                block.containerWidget = headerFooter;
            }
            headerFooter.isEmpty = this.isEmpty;
            headerFooter.x = this.x;
            headerFooter.y = this.y;
            headerFooter.height = 0;
            headerFooter.width = 0;
            return headerFooter;
        };
        HeaderFooterWidget.prototype.destroyInternal = function (viewer) {
            this.page = undefined;
            _super.prototype.destroy.call(this);
        };
        HeaderFooterWidget.prototype.componentDestroy = function () {
            _super.prototype.componentDestroy.call(this);
            this.parentHeaderFooter = undefined;
        };
        return HeaderFooterWidget;
    }(BlockContainer));
    exports.HeaderFooterWidget = HeaderFooterWidget;
    var BlockWidget = (function (_super) {
        __extends(BlockWidget, _super);
        function BlockWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isLayouted = false;
            _this.isFieldCodeBlock = false;
            _this.locked = false;
            _this.lockedBy = '';
            return _this;
        }
        Object.defineProperty(BlockWidget.prototype, "bodyWidget", {
            get: function () {
                var widget = this;
                while (widget.containerWidget) {
                    if (widget.containerWidget instanceof TextFrame) {
                        var paragraph = widget.containerWidget.containerShape.line.paragraph;
                        if (paragraph) {
                            return paragraph.bodyWidget;
                        }
                    }
                    else if (widget.containerWidget instanceof BlockContainer) {
                        return widget.containerWidget;
                    }
                    widget = widget.containerWidget;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockWidget.prototype, "leftIndent", {
            get: function () {
                var blockAdv = this;
                if (blockAdv instanceof ParagraphWidget && blockAdv.paragraphFormat instanceof index_2.WParagraphFormat) {
                    return blockAdv.paragraphFormat.leftIndent;
                }
                else if (blockAdv instanceof TableWidget && blockAdv.tableFormat instanceof index_1.WTableFormat) {
                    return blockAdv.tableFormat.leftIndent;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockWidget.prototype, "rightIndent", {
            get: function () {
                var blockAdv = this;
                if (blockAdv instanceof ParagraphWidget && blockAdv.paragraphFormat instanceof index_2.WParagraphFormat) {
                    return blockAdv.paragraphFormat.rightIndent;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockWidget.prototype, "isInsideTable", {
            get: function () {
                return this.containerWidget instanceof TableCellWidget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockWidget.prototype, "isInHeaderFooter", {
            get: function () {
                return this.bodyWidget instanceof HeaderFooterWidget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlockWidget.prototype, "associatedCell", {
            get: function () {
                if (this.containerWidget instanceof TableCellWidget) {
                    return this.containerWidget;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        BlockWidget.prototype.isPageBreak = function () {
            var isPageBreak = false;
            if (this instanceof ParagraphWidget) {
                var paragraph = this;
                if (paragraph != null && paragraph.childWidgets.length === 1 &&
                    paragraph.firstChild.children.length === 1) {
                    var pageBreak = paragraph.firstChild.children[0];
                    isPageBreak = pageBreak.isPageBreak;
                }
            }
            return isPageBreak;
        };
        BlockWidget.prototype.isColumnBreak = function () {
            var isColumnBreak = false;
            if (this instanceof ParagraphWidget) {
                var paragraph = this;
                if (paragraph != null && paragraph.childWidgets.length === 1 &&
                    paragraph.firstChild.children.length === 1) {
                    var columnBreak = paragraph.firstChild.children[0];
                    isColumnBreak = columnBreak.isColumnBreak;
                }
            }
            return isColumnBreak;
        };
        BlockWidget.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
            var node = this;
            hierarchicalIndex = node.containerWidget.childWidgets.indexOf(node) + ';' + hierarchicalIndex;
            if (!ej2_base_1.isNullOrUndefined(node.containerWidget)) {
                if (node.containerWidget instanceof TextFrame) {
                    return node.containerWidget.getHierarchicalIndex(hierarchicalIndex);
                }
                else if (node.containerWidget instanceof BlockWidget) {
                    return node.containerWidget.getHierarchicalIndex(hierarchicalIndex);
                }
                else if (node.containerWidget instanceof BlockContainer) {
                    hierarchicalIndex = node.containerWidget.getHierarchicalIndex(hierarchicalIndex);
                }
            }
            return hierarchicalIndex;
        };
        BlockWidget.prototype.getIndex = function () {
            if (this instanceof ParagraphWidget || this instanceof TableWidget) {
                return this.containerWidget.childWidgets.indexOf(this);
            }
            else if (this instanceof TableRowWidget) {
                return this.ownerTable.childWidgets.indexOf(this);
            }
            else if (this instanceof TableCellWidget) {
                return this.ownerRow.childWidgets.indexOf(this);
            }
            return 0;
        };
        BlockWidget.prototype.getContainerWidth = function () {
            if (this.isInsideTable) {
                var block = this;
                if ((block instanceof TableWidget) && block.tableFormat.preferredWidthType === 'Auto' && this.associatedCell.ownerTable.isGridUpdated) {
                    var containerWidth = 0;
                    var columnSpan = this.associatedCell.cellFormat.columnSpan;
                    var columnIndex = this.associatedCell.columnIndex;
                    for (var i = 0; i < columnSpan; i++) {
                        containerWidth += this.associatedCell.ownerTable.tableHolder.columns[columnIndex].preferredWidth;
                        columnIndex++;
                    }
                    if (containerWidth > 0) {
                        return containerWidth;
                    }
                }
                return this.associatedCell.getCellWidth(this);
            }
            if (this.containerWidget instanceof TextFrame) {
                var shape = this.containerWidget.containerShape;
                return editor_helper_1.HelperMethods.convertPixelToPoint(shape.width) - editor_helper_1.HelperMethods.convertPixelToPoint(shape.textFrame.marginLeft)
                    - editor_helper_1.HelperMethods.convertPixelToPoint(shape.textFrame.marginRight);
            }
            else {
                var bodyWidget = this.bodyWidget;
                var sectionFormat = bodyWidget.sectionFormat;
                var padding = 0;
                if (!ej2_base_1.isNullOrUndefined(bodyWidget.page) && !ej2_base_1.isNullOrUndefined(bodyWidget.page.documentHelper) &&
                    bodyWidget.page.documentHelper.compatibilityMode !== 'Word2013' && !this.isInsideTable && this instanceof TableWidget) {
                    var firstRow = this.firstChild;
                    padding = firstRow.firstChild.leftMargin + (firstRow).lastChild.rightMargin;
                }
                if (bodyWidget instanceof BodyWidget && sectionFormat.columns.length > 1) {
                    var colIndex = bodyWidget.columnIndex;
                    return editor_helper_1.HelperMethods.convertPixelToPoint(sectionFormat.columns[colIndex].width);
                }
                else {
                    return sectionFormat.pageWidth - (sectionFormat.leftMargin + sectionFormat.rightMargin) + padding;
                }
            }
        };
        Object.defineProperty(BlockWidget.prototype, "bidi", {
            get: function () {
                if (this instanceof ParagraphWidget && this.paragraphFormat instanceof index_2.WParagraphFormat) {
                    return this.paragraphFormat.bidi;
                }
                if (this instanceof TableWidget && this.tableFormat instanceof index_1.WTableFormat) {
                    return this.tableFormat.bidi;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        BlockWidget.prototype.componentDestroy = function () {
            _super.prototype.componentDestroy.call(this);
            this.contentControlProperties = undefined;
        };
        return BlockWidget;
    }(Widget));
    exports.BlockWidget = BlockWidget;
    var FootNoteWidget = (function (_super) {
        __extends(FootNoteWidget, _super);
        function FootNoteWidget() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bodyWidgets = [];
            return _this;
        }
        FootNoteWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
            throw new Error('Method not implemented.');
        };
        FootNoteWidget.prototype.getTableCellWidget = function (point) {
            return undefined;
        };
        FootNoteWidget.prototype.equals = function (widget) {
            return widget instanceof FootNoteWidget
                && widget.containerWidget === this.containerWidget;
        };
        FootNoteWidget.prototype.clone = function () {
            var footNote = new FootNoteWidget();
            for (var i = 0; i < this.childWidgets.length; i++) {
                var block = this.childWidgets[i].clone();
                footNote.childWidgets.push(block);
                block.index = i;
                block.containerWidget = footNote;
            }
            footNote.block = this.block;
            return footNote;
        };
        FootNoteWidget.prototype.destroyInternal = function (viewer) {
            this.block = undefined;
            _super.prototype.destroy.call(this);
        };
        FootNoteWidget.prototype.componentDestroy = function () {
            if (this.bodyWidgets && this.bodyWidgets.length > 0) {
                for (var i = 0; i < this.bodyWidgets.length; i++) {
                    var bodyWidget = this.bodyWidgets[i];
                    bodyWidget.componentDestroy();
                }
                this.bodyWidgets = [];
            }
            this.bodyWidgets = undefined;
            this.block = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return FootNoteWidget;
    }(BlockContainer));
    exports.FootNoteWidget = FootNoteWidget;
    var ParagraphWidget = (function (_super) {
        __extends(ParagraphWidget, _super);
        function ParagraphWidget() {
            var _this = _super.call(this) || this;
            _this.isSectionBreak = false;
            _this.isChangeDetected = false;
            _this.clientX = undefined;
            _this.floatingElements = [];
            _this.paragraphFormat = new index_2.WParagraphFormat(_this);
            _this.characterFormat = new index_2.WCharacterFormat(_this);
            return _this;
        }
        Object.defineProperty(ParagraphWidget.prototype, "isEndsWithPageBreak", {
            get: function () {
                if (this.childWidgets.length > 0) {
                    return this.lastChild.isEndsWithPageBreak;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParagraphWidget.prototype, "isEndsWithColumnBreak", {
            get: function () {
                if (this.childWidgets.length > 0) {
                    return this.lastChild.isEndsWithColumnBreak;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ParagraphWidget.prototype.equals = function (widget) {
            return widget instanceof ParagraphWidget && widget.paragraphFormat === this.paragraphFormat;
        };
        ParagraphWidget.prototype.isContainsShapeAlone = function () {
            var containsShape = false;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var lineWidget = this.childWidgets[i];
                for (var j = 0; j < lineWidget.children.length; j++) {
                    var inline = lineWidget.children[j];
                    if (!(inline instanceof ShapeBase) || (inline instanceof ShapeBase && inline.textWrappingStyle === 'Inline')) {
                        return false;
                    }
                    else {
                        containsShape = true;
                    }
                }
            }
            return containsShape ? true : false;
        };
        ParagraphWidget.prototype.isEmpty = function () {
            if (ej2_base_1.isNullOrUndefined(this.childWidgets) || this.childWidgets.length === 0) {
                return true;
            }
            for (var j = 0; j < this.childWidgets.length; j++) {
                var inlineElement = this.childWidgets[j];
                for (var i = 0; i < inlineElement.children.length; i++) {
                    var inline = inlineElement.children[i];
                    if (inline.length === 0) {
                        continue;
                    }
                    if (inline instanceof TextElementBox || inline instanceof ImageElementBox || inline instanceof BookmarkElementBox
                        || inline instanceof EditRangeEndElementBox || inline instanceof EditRangeStartElementBox
                        || inline instanceof ChartElementBox || inline instanceof ShapeElementBox
                        || inline instanceof ContentControl
                        || (inline instanceof FieldElementBox && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline))) {
                        return false;
                    }
                }
            }
            return true;
        };
        ParagraphWidget.prototype.getInline = function (offset, indexInInline) {
            var inline = undefined;
            var count = 0;
            var isStarted = false;
            var splittedWidget = this.getSplitWidgets();
            for (var k = 0; k < splittedWidget.length; k++) {
                var widget = splittedWidget[k];
                for (var j = 0; j < widget.childWidgets.length; j++) {
                    var line = widget.childWidgets[j];
                    for (var i = 0; i < line.children.length; i++) {
                        inline = line.children[i];
                        if (inline instanceof ListTextElementBox) {
                            continue;
                        }
                        if (!isStarted && (inline instanceof TextElementBox || inline instanceof ImageElementBox
                            || inline instanceof ShapeElementBox
                            || inline instanceof BookmarkElementBox || inline instanceof FieldElementBox
                            && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inline))
                            || inline instanceof ChartElementBox) {
                            isStarted = true;
                        }
                        if (isStarted && offset <= count + inline.length) {
                            indexInInline = (offset - count);
                            return { 'element': inline, 'index': indexInInline };
                        }
                        count += inline.length;
                    }
                }
            }
            if (offset > count) {
                indexInInline = ej2_base_1.isNullOrUndefined(inline) ? offset : inline.length;
            }
            return { 'element': inline, 'index': indexInInline };
        };
        ParagraphWidget.prototype.getLength = function () {
            var length = 0;
            if (ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                return length;
            }
            for (var j = 0; j < this.childWidgets.length; j++) {
                var line = this.childWidgets[j];
                for (var i = 0; i < line.children.length; i++) {
                    var element = line.children[i];
                    if (element instanceof ListTextElementBox) {
                        continue;
                    }
                    length += element.length;
                }
            }
            return length;
        };
        ParagraphWidget.prototype.getTotalLength = function () {
            var offset = 0;
            var splittedWidget = this.getSplitWidgets();
            for (var i = 0; i < splittedWidget.length; i++) {
                offset += splittedWidget[i].getLength();
            }
            return offset;
        };
        ParagraphWidget.prototype.getTableCellWidget = function (point) {
            return undefined;
        };
        ParagraphWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
            minimumWordWidth = editor_helper_1.HelperMethods.convertPointToPixel(minimumWordWidth);
            maximumWordWidth = editor_helper_1.HelperMethods.convertPointToPixel(maximumWordWidth);
            if (this.childWidgets.length > 0) {
                var element = this.childWidgets[0].children[0];
                var text = '';
                var elements = new dictionary_1.Dictionary();
                var imageWidths = [];
                do {
                    if (element instanceof TextElementBox && element.text !== '') {
                        elements.add(element, text.length);
                        text += (element.text);
                    }
                    else if (element instanceof FieldElementBox && element.fieldType === 0) {
                        var fieldBegin = element;
                        if (!ej2_base_1.isNullOrUndefined(fieldBegin.fieldEnd)) {
                            element = ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator) ? fieldBegin.fieldEnd : fieldBegin.fieldSeparator;
                        }
                    }
                    else if (element instanceof ImageElementBox) {
                        imageWidths.push(element.width);
                    }
                    if (ej2_base_1.isNullOrUndefined(element) || ej2_base_1.isNullOrUndefined(element.nextNode)) {
                        break;
                    }
                    element = element.nextNode;
                } while (true);
                var pattern = new RegExp('\\b\\w+\\b', 'g');
                var matches = [];
                var matchInfo = void 0;
                while (!ej2_base_1.isNullOrUndefined(matchInfo = pattern.exec(text))) {
                    matches.push(matchInfo);
                }
                for (var i = 0; i < matches.length; i++) {
                    var match = matches[i];
                    var width = 0;
                    text = '';
                    var matchedValue = '';
                    var wordStartIndex = 0;
                    var wordEndIndex = match.index;
                    var index = match.index;
                    for (var j = 0; j < elements.keys.length; j++) {
                        var span = elements.keys[j];
                        var startIndex = elements.get(span);
                        var spanLength = span.length;
                        if (index <= startIndex + spanLength) {
                            wordStartIndex = index - startIndex;
                            if (match.index + match[0].length <= startIndex + spanLength) {
                                wordEndIndex = (match.index + match[0].length) - (startIndex + wordStartIndex);
                            }
                            else {
                                wordEndIndex = spanLength - wordStartIndex;
                                index += wordEndIndex;
                            }
                            text = span.text.substring(wordStartIndex, wordStartIndex + wordEndIndex);
                            matchedValue = matchedValue + text;
                        }
                        if (text !== '') {
                            width += this.bodyWidget.page.documentHelper.textHelper.getWidth(text, span.characterFormat, span.scriptType);
                        }
                        if (matchedValue === match[0]) {
                            break;
                        }
                    }
                    if (width !== 0) {
                        if (minimumWordWidth === 0 || width > minimumWordWidth) {
                            minimumWordWidth = width;
                        }
                    }
                }
                var imageWidth = 0;
                if (imageWidths.length > 0) {
                    imageWidth = Math.max.apply(null, imageWidths);
                }
                if (minimumWordWidth === 0 || imageWidth > minimumWordWidth) {
                    minimumWordWidth = imageWidth;
                }
                var maximum = this.measureParagraph();
                if (maximumWordWidth === 0 || maximum > maximumWordWidth) {
                    maximumWordWidth = maximum;
                }
            }
            return {
                'maximumWordWidth': editor_helper_1.HelperMethods.convertPixelToPoint(maximumWordWidth),
                'minimumWordWidth': editor_helper_1.HelperMethods.convertPixelToPoint(minimumWordWidth)
            };
        };
        ParagraphWidget.prototype.measureParagraph = function () {
            var width = 0;
            var element = this.childWidgets[0].children[0];
            do {
                if (element instanceof TextElementBox && element.text !== '') {
                    width += this.bodyWidget.page.documentHelper.textHelper.getWidth(element.text, element.characterFormat, element.scriptType);
                }
                else if (element instanceof FieldElementBox && element.fieldType === 0) {
                    var fieldBegin = element;
                    if (fieldBegin.fieldEnd != null) {
                        element = ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator) ? fieldBegin.fieldEnd : fieldBegin.fieldSeparator;
                    }
                }
                else if (element instanceof ImageElementBox) {
                    width += element.width;
                }
                if (ej2_base_1.isNullOrUndefined(element) || ej2_base_1.isNullOrUndefined(element.nextNode)) {
                    break;
                }
                element = element.nextNode;
            } while (true);
            if (this.leftIndent > 0) {
                width += this.leftIndent;
            }
            if (this.rightIndent > 0) {
                width += this.rightIndent;
            }
            return width;
        };
        ParagraphWidget.prototype.isArabicChar = function (character) {
            return ((character >= String.fromCharCode(1536) && character <= String.fromCharCode(1791))
                || (character >= String.fromCharCode(1872) && character <= String.fromCharCode(1919))
                || (character >= String.fromCharCode(2208) && character <= String.fromCharCode(2303))
                || (character >= String.fromCharCode(64336) && character <= String.fromCharCode(65023))
                || (character >= String.fromCharCode(65136) && character <= String.fromCharCode(65279)));
        };
        ParagraphWidget.prototype.isHebrewChar = function (character) {
            return ((character >= String.fromCharCode(1424) && character <= String.fromCharCode(1535))
                || (character >= String.fromCharCode(64285) && character <= String.fromCharCode(64335)));
        };
        ParagraphWidget.prototype.isHindiChar = function (character) {
            return ((character >= String.fromCharCode(2304) && character <= String.fromCharCode(2431))
                || (character >= String.fromCharCode(43232) && character <= String.fromCharCode(43263))
                || (character >= String.fromCharCode(7376) && character <= String.fromCharCode(7423)));
        };
        ParagraphWidget.prototype.isKoreanChar = function (character) {
            return ((character >= String.fromCharCode(44032) && character <= String.fromCharCode(55203))
                || (character >= String.fromCharCode(4352) && character <= String.fromCharCode(4607))
                || (character >= String.fromCharCode(12592) && character <= String.fromCharCode(12687))
                || (character >= String.fromCharCode(43360) && character <= String.fromCharCode(43391))
                || (character >= String.fromCharCode(55216) && character <= String.fromCharCode(55295))
                || (character >= String.fromCharCode(44032) && character <= String.fromCharCode(55215)));
        };
        ParagraphWidget.prototype.isJapanese = function (character) {
            return ((character >= String.fromCharCode(12448) && character <= String.fromCharCode(12543))
                || (character >= String.fromCharCode(12352) && character <= String.fromCharCode(12447)));
        };
        ParagraphWidget.prototype.isThaiCharacter = function (character) {
            return (character >= String.fromCharCode(3584) && character <= String.fromCharCode(3711));
        };
        ParagraphWidget.prototype.isChineseChar = function (character) {
            return ((character >= String.fromCharCode(19968) && character <= String.fromCharCode(40959))
                || (character >= String.fromCharCode(13312) && character <= String.fromCharCode(19903))
                || (character >= String.fromCharCode(55360) && character <= String.fromCharCode(55401))
                || (character >= String.fromCharCode(56320) && character <= String.fromCharCode(57055))
                || (character >= String.fromCharCode(43360) && character <= String.fromCharCode(43391))
                || (character >= String.fromCharCode(65280) && character <= String.fromCharCode(65519))
                || (character >= String.fromCharCode(12288) && character <= String.fromCharCode(12351)));
        };
        ParagraphWidget.prototype.getFontScriptType = function (inputCharacter) {
            if (this.isHindiChar(inputCharacter))
                return types_1.FontScriptType.Hindi;
            else if (this.isKoreanChar(inputCharacter))
                return types_1.FontScriptType.Korean;
            else if (this.isJapanese(inputCharacter))
                return types_1.FontScriptType.Japanese;
            else if (this.isChineseChar(inputCharacter))
                return types_1.FontScriptType.Chinese;
            else if (this.isArabicChar(inputCharacter))
                return types_1.FontScriptType.Arabic;
            else if (this.isHebrewChar(inputCharacter))
                return types_1.FontScriptType.Hebrew;
            else if (this.isThaiCharacter(inputCharacter))
                return types_1.FontScriptType.Thai;
            else
                return types_1.FontScriptType.English;
        };
        ParagraphWidget.prototype.splitTextByFontScriptType = function (inputText, fontScriptTypes) {
            var splittedText = [];
            if (ej2_base_1.isNullOrUndefined(inputText)
                || (!ej2_base_1.isNullOrUndefined(inputText) && inputText === '')) {
                return splittedText;
            }
            var text = '';
            var prevCharacterType = types_1.FontScriptType.English;
            var currCharacterType = types_1.FontScriptType.English;
            var surrogateRegex = /[\uD800-\uDFFF]/;
            for (var i = 0; i < inputText.length; i++) {
                if (inputText[i] != String.fromCharCode(32) && !surrogateRegex.test(inputText[i])) {
                    currCharacterType = this.getFontScriptType(inputText[i]);
                }
                if (text != '' && currCharacterType !== prevCharacterType) {
                    splittedText.push(text);
                    fontScriptTypes.push(prevCharacterType);
                    text = '';
                }
                text += inputText[i];
                prevCharacterType = currCharacterType;
            }
            if (text != '') {
                splittedText.push(text);
                fontScriptTypes.push(currCharacterType);
                text = '';
            }
            return splittedText;
        };
        ParagraphWidget.prototype.splitTextRangeByScriptType = function (lineIndex) {
            var isField = false;
            var iIncrementer = 1;
            if (this.childWidgets.length > 0) {
                var lineWidget = this.childWidgets[lineIndex];
                for (var i = lineIndex + 1; i < this.childWidgets.length; i++) {
                    var nextLineWidget = this.childWidgets[i];
                    for (var m = 0; m < nextLineWidget.children.length; m++) {
                        var element = nextLineWidget.children[m];
                        lineWidget.children.push(element);
                        element.line = lineWidget;
                    }
                    this.childWidgets.splice(i, 1);
                    i--;
                }
                for (var i = 0; i < lineWidget.children.length; i += iIncrementer) {
                    var elementBox = lineWidget.children[i];
                    iIncrementer = 1;
                    var textElement = undefined;
                    if (elementBox instanceof TextElementBox) {
                        textElement = elementBox;
                    }
                    if (elementBox instanceof FieldElementBox && elementBox.fieldType == 0) {
                        isField = true;
                    }
                    else if (elementBox instanceof FieldElementBox && elementBox.fieldType === 2) {
                        isField = false;
                    }
                    if (textElement != undefined && !isField) {
                        var fontScriptTypes = [];
                        var splitedTextCollection = this.splitTextByFontScriptType(textElement.text, fontScriptTypes);
                        if (splitedTextCollection.length > 1) {
                            for (var j = 0; j < splitedTextCollection.length; j++) {
                                var text = splitedTextCollection[j];
                                if (j > 0) {
                                    var clonedtextElement = textElement.clone();
                                    clonedtextElement.text = text;
                                    clonedtextElement.scriptType = fontScriptTypes[j];
                                    lineWidget.children.splice(i + j, 0, clonedtextElement);
                                    clonedtextElement.line = lineWidget;
                                    iIncrementer++;
                                    if (textElement.revisions.length > 0) {
                                        this.updateTextElementInRevisionRange(textElement, clonedtextElement);
                                    }
                                }
                                else {
                                    textElement.text = text;
                                    textElement.scriptType = fontScriptTypes[j];
                                }
                            }
                        }
                        else if (splitedTextCollection.length > 0) {
                            textElement.scriptType = fontScriptTypes[0];
                        }
                        fontScriptTypes.length = 0;
                    }
                }
            }
        };
        ParagraphWidget.prototype.splitLtrAndRtlText = function (lineIndex) {
            var isPrevLTRText = { value: null };
            var iIncrementer = 1;
            var hasRTLCharacter = { value: null };
            var characterRangeTypes = [];
            var isField = false;
            var documentHelper = this.bodyWidget.page.documentHelper;
            var textHelper = documentHelper.textHelper;
            if (this.childWidgets.length > 0) {
                var lineWidget = this.childWidgets[lineIndex];
                for (var i = 0; i < lineWidget.children.length; i += iIncrementer) {
                    var elementBox = lineWidget.children[i];
                    iIncrementer = 1;
                    var textElement = undefined;
                    if (elementBox instanceof TextElementBox) {
                        textElement = elementBox;
                    }
                    if (elementBox instanceof FieldElementBox && elementBox.fieldType == 0) {
                        isField = true;
                    }
                    else if (elementBox instanceof FieldElementBox && elementBox.fieldType === 2) {
                        isField = false;
                    }
                    if (textElement != undefined && !isField) {
                        var text = textElement.text;
                        var isTextBidi = textElement.characterFormat.bidi;
                        var isRTLLang = false;
                        var charTypeIndex = characterRangeTypes.length;
                        if (isTextBidi) {
                            isRTLLang = textHelper.isRightToLeftLanguage(elementBox.characterFormat.localeIdBidi);
                        }
                        var splitedTextCollection = textHelper.splitTextByConsecutiveLtrAndRtl(text, isTextBidi, isRTLLang, characterRangeTypes, isPrevLTRText, hasRTLCharacter);
                        if (splitedTextCollection.length > 1) {
                            for (var j = 0; j < splitedTextCollection.length; j++) {
                                text = splitedTextCollection[j];
                                if (j > 0) {
                                    var clonedTextElement = textElement.clone();
                                    clonedTextElement.text = text;
                                    clonedTextElement.characterRange = characterRangeTypes[j + charTypeIndex];
                                    lineWidget.children.splice(i + j, 0, clonedTextElement);
                                    clonedTextElement.line = lineWidget;
                                    iIncrementer++;
                                    if (textElement.revisions.length > 0) {
                                        this.updateTextElementInRevisionRange(textElement, clonedTextElement);
                                    }
                                }
                                else {
                                    textElement.text = text;
                                    textElement.characterRange = characterRangeTypes[charTypeIndex];
                                }
                            }
                        }
                        else if (splitedTextCollection.length > 0) {
                            textElement.characterRange = characterRangeTypes[charTypeIndex];
                        }
                    }
                }
                characterRangeTypes.length = 0;
            }
        };
        ParagraphWidget.prototype.updateTextElementInRevisionRange = function (inline, splittedElementBox) {
            for (var i = 0; i < inline.revisions.length; i++) {
                var revision = inline.revisions[i];
                var inlineIndex = revision.range.indexOf(inline);
                revision.range.splice(inlineIndex + 1, 0, splittedElementBox);
                splittedElementBox.revisions.push(revision);
                splittedElementBox.removedIds = [];
            }
        };
        ParagraphWidget.prototype.combineconsecutiveRTL = function (lineIndex) {
            var isField = false;
            var documentHelper = this.bodyWidget.page.documentHelper;
            var textHelper = documentHelper.textHelper;
            for (var j = lineIndex; j < this.childWidgets.length; j++) {
                var lineWidget = this.childWidgets[j];
                for (var i = 0; i <= lineWidget.children.length - 2; i++) {
                    var elementBox = lineWidget.children[i];
                    if (elementBox instanceof FieldElementBox && elementBox.fieldType === 0) {
                        isField = true;
                    }
                    else if (elementBox instanceof FieldElementBox && elementBox.fieldType === 2) {
                        isField = false;
                    }
                    if (!isField && elementBox instanceof TextElementBox && lineWidget.children[i + 1] instanceof TextElementBox) {
                        var currentTxtRange = elementBox;
                        var nextTxtRange = lineWidget.children[i + 1];
                        if (((currentTxtRange.characterFormat.complexScript && currentTxtRange.scriptType == nextTxtRange.scriptType) || (currentTxtRange.characterFormat.bidi && currentTxtRange.scriptType !== types_1.FontScriptType.Hebrew
                            && currentTxtRange.characterRange == types_1.CharacterRangeType.RightToLeft && nextTxtRange.characterRange == types_1.CharacterRangeType.RightToLeft)) &&
                            currentTxtRange.text.length > 0 && nextTxtRange.text.length > 0 &&
                            !textHelper.isWordSplitChar(currentTxtRange.text[currentTxtRange.text.length - 1]) && !textHelper.isWordSplitChar(nextTxtRange.text[0])
                            && currentTxtRange.characterFormat.isEqualFormat(nextTxtRange.characterFormat) && this.compareRevisions(currentTxtRange.revisions, nextTxtRange.revisions)) {
                            currentTxtRange.text = currentTxtRange.text + nextTxtRange.text;
                            lineWidget.children.splice(i + 1, 1);
                            i--;
                        }
                        else if (currentTxtRange.characterRange == types_1.CharacterRangeType.RightToLeft && nextTxtRange.characterRange == types_1.CharacterRangeType.RightToLeft &&
                            currentTxtRange.text.length > 0 && nextTxtRange.text.length > 0 &&
                            textHelper.isWordSplitChar(currentTxtRange.text[currentTxtRange.text.length - 1]) && textHelper.isWordSplitChar(nextTxtRange.text[0])
                            && currentTxtRange.characterFormat.isEqualFormat(nextTxtRange.characterFormat) && this.compareRevisions(currentTxtRange.revisions, nextTxtRange.revisions)) {
                            currentTxtRange.text = currentTxtRange.text + nextTxtRange.text;
                            lineWidget.children.splice(i + 1, 1);
                            i--;
                        }
                    }
                }
            }
        };
        ParagraphWidget.prototype.compareRevisions = function (revisionA, revisionB) {
            if (revisionA.length !== revisionB.length) {
                return false;
            }
            for (var i = 0; i < revisionA.length; i++) {
                if (revisionA[i] !== revisionB[i]) {
                    return false;
                }
            }
            return true;
        };
        ParagraphWidget.prototype.clone = function () {
            var paragraph = new ParagraphWidget();
            paragraph.paragraphFormat.copyFormat(this.paragraphFormat);
            paragraph.characterFormat.copyFormat(this.characterFormat);
            for (var i = 0; i < this.childWidgets.length; i++) {
                var line = this.childWidgets[i];
                var cloneLine = line.clone();
                paragraph.childWidgets.push(cloneLine);
                for (var j = 0; j < cloneLine.children.length; j++) {
                    var element = cloneLine.children[j];
                    if ((element instanceof ImageElementBox && element.textWrappingStyle !== 'Inline') || element instanceof ShapeElementBox) {
                        paragraph.floatingElements.push(element);
                    }
                }
                cloneLine.paragraph = paragraph;
            }
            paragraph.x = this.x;
            paragraph.y = this.y;
            paragraph.height = this.height;
            paragraph.width = this.width;
            paragraph['absoluteXPosition'] = ej2_base_1.isNullOrUndefined(this['absoluteXPosition']) ? undefined : { 'width': this['absoluteXPosition']['width'], 'x': this['absoluteXPosition']['x'] };
            if (this.contentControlProperties) {
                paragraph.contentControlProperties = this.contentControlProperties;
            }
            return paragraph;
        };
        ParagraphWidget.prototype.destroyInternal = function (viewer) {
            var height = this.height;
            if (!ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                for (var i = 0; i < this.childWidgets.length; i++) {
                    var widget = this.childWidgets[i];
                    widget.destroy();
                    if (this.childWidgets.length === 1 && ej2_base_1.isNullOrUndefined(this.childWidgets[0].children)) {
                        this.childWidgets = undefined;
                    }
                    if (ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                        break;
                    }
                    i--;
                }
                this.childWidgets = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.containerWidget) && !ej2_base_1.isNullOrUndefined(this.containerWidget.childWidgets)
                && this.containerWidget.childWidgets.indexOf(this) !== -1) {
                this.containerWidget.childWidgets.splice(this.containerWidget.childWidgets.indexOf(this), 1);
                this.containerWidget.height -= height;
                this.containerWidget = undefined;
            }
            if (this.hasOwnProperty('absoluteXPosition')) {
                delete this['absoluteXPosition'];
            }
            this.destroy();
        };
        ParagraphWidget.prototype.destroy = function () {
            this.paragraphFormat = undefined;
            this.characterFormat = undefined;
            _super.prototype.destroy.call(this);
        };
        ParagraphWidget.prototype.componentDestroy = function () {
            if (this.paragraphFormat) {
                this.paragraphFormat.destroy();
            }
            this.paragraphFormat = undefined;
            if (this.characterFormat) {
                this.characterFormat.destroy();
            }
            this.characterFormat = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return ParagraphWidget;
    }(BlockWidget));
    exports.ParagraphWidget = ParagraphWidget;
    var TablePosition = (function () {
        function TablePosition() {
        }
        TablePosition.prototype.clone = function () {
            var positioning = new TablePosition();
            positioning.allowOverlap = this.allowOverlap;
            positioning.distanceTop = this.distanceTop;
            positioning.distanceRight = this.distanceRight;
            positioning.distanceLeft = this.distanceLeft;
            positioning.distanceBottom = this.distanceBottom;
            positioning.verticalAlignment = this.verticalAlignment;
            positioning.verticalOrigin = this.verticalOrigin;
            positioning.verticalPosition = this.verticalPosition;
            positioning.horizontalAlignment = this.horizontalAlignment;
            positioning.horizontalOrigin = this.horizontalOrigin;
            positioning.horizontalPosition = this.horizontalPosition;
            return positioning;
        };
        return TablePosition;
    }());
    exports.TablePosition = TablePosition;
    var TableWidget = (function (_super) {
        __extends(TableWidget, _super);
        function TableWidget() {
            var _this = _super.call(this) || this;
            _this.flags = 0;
            _this.leftMargin = 0;
            _this.topMargin = 0;
            _this.rightMargin = 0;
            _this.bottomMargin = 0;
            _this.isDefaultFormatUpdated = false;
            _this.isContainInsideTable = false;
            _this.footnoteElement = [];
            _this.margin = new Margin(_this.leftMargin, _this.topMargin, _this.rightMargin, _this.bottomMargin);
            _this.leftBorderWidth = 0;
            _this.rightBorderWidth = 0;
            _this.topBorderWidth = 0;
            _this.bottomBorderWidth = 0;
            _this.tableFormat = new index_1.WTableFormat(_this);
            _this.tableHolder = new WTableHolder();
            _this.spannedRowCollection = new dictionary_1.Dictionary();
            return _this;
        }
        Object.defineProperty(TableWidget.prototype, "isGridUpdated", {
            get: function () {
                return ((this.flags & 0x4) >> 2) !== 0;
            },
            set: function (value) {
                this.flags = ((this.flags & 0xFB) | ((value ? 1 : 0) << 2));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWidget.prototype, "continueHeader", {
            get: function () {
                return ((this.flags & 0x2) >> 1) !== 0;
            },
            set: function (value) {
                this.flags = ((this.flags & 0xFD) | ((value ? 1 : 0) << 1));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWidget.prototype, "header", {
            get: function () {
                return (this.flags & 0x1) !== 0;
            },
            set: function (value) {
                this.flags = ((this.flags & 0xFE) | (value ? 1 : 0));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableWidget.prototype, "isBidiTable", {
            get: function () {
                return ((this.flags & 0x10) >> 4) !== 0;
            },
            set: function (value) {
                this.flags = ((this.flags & 0xEF) | ((value ? 1 : 0) << 4));
            },
            enumerable: true,
            configurable: true
        });
        TableWidget.prototype.equals = function (widget) {
            return widget instanceof TableWidget && widget.tableFormat === this.tableFormat;
        };
        TableWidget.prototype.combineRows = function (viewer) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                if (row.childWidgets.length === 0) {
                    row.destroy();
                    i--;
                }
                else {
                    row.combineCells(viewer);
                }
            }
        };
        TableWidget.prototype.contains = function (tableCell) {
            if (this.equals(tableCell.ownerTable)) {
                return true;
            }
            while (tableCell.ownerTable.isInsideTable) {
                if (this.equals(tableCell.ownerTable)) {
                    return true;
                }
                tableCell = tableCell.ownerTable.associatedCell;
            }
            return this.equals(tableCell.ownerTable);
        };
        TableWidget.prototype.getOwnerWidth = function (isBasedOnViewer) {
            var width = this.getContainerWidth();
            width = width - this.leftIndent - this.rightIndent;
            return width >= 0 ? width : 0;
        };
        TableWidget.prototype.getTableWidth = function () {
            var width = 0;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var rowWidth = 0;
                var row = this.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    rowWidth += row.childWidgets[j].cellFormat.cellWidth;
                }
                if (width < rowWidth) {
                    width = rowWidth;
                }
            }
            return width;
        };
        TableWidget.prototype.getTableCellWidth = function () {
            var width = 0;
            for (var k = 0; k < this.childWidgets.length; k++) {
                var rowWidth = 0;
                var rowWidget = this.childWidgets[k];
                for (var m = 0; m < rowWidget.childWidgets.length; m++) {
                    var cellWidget = rowWidget.childWidgets[m];
                    var cellWidth = cellWidget.width;
                    if (cellWidth === 0) {
                        cellWidth = cellWidget.cellFormat.cellWidth;
                        if (cellWidth > cellWidget.cellFormat.preferredWidth &&
                            cellWidget.cellFormat.preferredWidth !== 0 && cellWidget.cellFormat.preferredWidthType !== 'Percent') {
                            cellWidth = cellWidget.cellFormat.preferredWidth;
                        }
                        cellWidth = editor_helper_1.HelperMethods.convertPointToPixel(cellWidth - (cellWidget.margin.left + cellWidget.margin.right));
                    }
                    rowWidth += (cellWidth + cellWidget.margin.left + cellWidget.margin.right);
                }
                if (width < rowWidth) {
                    width = rowWidth;
                }
            }
            return width;
        };
        TableWidget.prototype.getTableClientWidth = function (clientWidth) {
            var tableWidth = clientWidth;
            if (this.tableFormat.preferredWidthType === 'Point'
                && this.tableFormat.preferredWidth > 0) {
                tableWidth = this.tableFormat.preferredWidth;
            }
            else {
                if (this.tableFormat.preferredWidthType === 'Percent'
                    && this.tableFormat.preferredWidth > 0) {
                    tableWidth = tableWidth * this.tableFormat.preferredWidth / 100;
                }
            }
            return tableWidth;
        };
        TableWidget.prototype.getCellWidth = function (preferredWidth, preferredWidthType, containerWidth, cell) {
            var cellWidth = preferredWidth;
            if (preferredWidthType === 'Percent') {
                cellWidth = (preferredWidth * containerWidth) / 100;
            }
            else if (preferredWidthType === 'Point') {
                cellWidth = preferredWidth;
            }
            else if (!ej2_base_1.isNullOrUndefined(cell)) {
                cellWidth = this.getMinimumPreferredWidth(cell);
            }
            return cellWidth;
        };
        TableWidget.prototype.getMinimumPreferredWidth = function (cell) {
            var defaultWidth = 0;
            if (cell.cellFormat.preferredWidth === 0 && cell.cellFormat.cellWidth !== 0) {
                defaultWidth = cell.cellFormat.cellWidth;
            }
            else {
                defaultWidth = cell.getMinimumPreferredWidth();
            }
            return defaultWidth;
        };
        TableWidget.prototype.fitCellsToClientArea = function (clientWidth) {
            var tableWidth = this.getTableWidth();
            var factor = clientWidth / tableWidth;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                row.rowFormat.gridAfterWidth *= factor;
                row.rowFormat.gridBeforeWidth *= factor;
                for (var j = 0; j < row.childWidgets.length; j++) {
                    row.childWidgets[j].cellFormat.cellWidth *= factor;
                    row.childWidgets[j].cellFormat.preferredWidth *= factor;
                }
            }
        };
        TableWidget.prototype.getTableCellWidget = function (point) {
            var tableCellWidget = undefined;
            for (var i = 0; i < this.childWidgets.length; i++) {
                if (this.childWidgets[i].y <= point.y
                    && (this.childWidgets[i].y + this.childWidgets[i].height) >= point.y) {
                    tableCellWidget = this.childWidgets[i].getTableCellWidget(point);
                    break;
                }
            }
            return tableCellWidget;
        };
        TableWidget.prototype.calculateGrid = function (isInsertRow) {
            var tempGrid = [];
            var tempSpanDecimal = [];
            var spannedCells = [];
            var containerWidth = this.getOwnerWidth(true);
            var tableWidth = this.getTableClientWidth(containerWidth);
            this.tableCellInfo = new dictionary_1.Dictionary();
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                var rowCellInfo = new dictionary_1.Dictionary();
                var rowFormat = row.rowFormat;
                var cellWidth = 0;
                var columnSpan = row.rowFormat.gridBefore;
                var currOffset = 0;
                if (tempGrid.indexOf(currOffset) < 0) {
                    tempGrid.push(currOffset);
                    tempSpanDecimal.push(currOffset);
                }
                cellWidth = this.getCellWidth(rowFormat.gridBeforeWidth, rowFormat.gridBeforeWidthType, tableWidth, null);
                currOffset += cellWidth;
                var startOffset = parseFloat(currOffset.toFixed(2));
                if (tempGrid.indexOf(startOffset) < 0) {
                    tempGrid.push(startOffset);
                    tempSpanDecimal.push(currOffset);
                }
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < spannedCells.length; k++) {
                        if (spannedCells[k].columnIndex < columnSpan) {
                            continue;
                        }
                        var rowSpan = spannedCells[k].cellFormat.rowSpan;
                        var removeSpannedCell = true;
                        if (spannedCells[k].columnIndex > columnSpan) {
                            {
                                removeSpannedCell = false;
                                if (j === row.childWidgets.length - 1 && row.rowFormat.gridAfter > 0) {
                                    cellWidth = this.getCellWidth(spannedCells[k].cellFormat.preferredWidth, spannedCells[k].cellFormat.preferredWidthType, tableWidth, null);
                                    currOffset += cellWidth;
                                }
                            }
                        }
                        else {
                            cellWidth = this.getCellWidth(spannedCells[k].cellFormat.preferredWidth, spannedCells[k].cellFormat.preferredWidthType, tableWidth, null);
                            currOffset += cellWidth;
                            columnSpan = spannedCells[k].columnIndex + spannedCells[k].cellFormat.columnSpan;
                        }
                        if (!removeSpannedCell && j === row.childWidgets.length - 1) {
                            removeSpannedCell = true;
                        }
                        if (removeSpannedCell && i - spannedCells[k].ownerRow.rowIndex === rowSpan - 1) {
                            spannedCells.splice(k, 1);
                            k--;
                        }
                    }
                    if (cell.cellFormat.rowSpan > 1) {
                        if (spannedCells.length === 0 || spannedCells[spannedCells.length - 1].columnIndex <= columnSpan) {
                            spannedCells.push(cell);
                        }
                        else {
                            for (var m = spannedCells.length; m > 0; m--) {
                                if (spannedCells[m - 1].columnIndex > columnSpan) {
                                    spannedCells.splice(m - 1, 0, cell);
                                }
                            }
                        }
                    }
                    if (!rowCellInfo.containsKey(cell.cellIndex)) {
                        rowCellInfo.add(cell.cellIndex, parseFloat((currOffset - startOffset).toFixed(2)));
                    }
                    columnSpan += cell.cellFormat.columnSpan;
                    cellWidth = this.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, tableWidth, null);
                    currOffset += cellWidth;
                    var offset = parseFloat(currOffset.toFixed(2));
                    if (tempGrid.indexOf(offset) < 0) {
                        tempGrid.push(offset);
                        tempSpanDecimal.push(currOffset);
                    }
                    if (j === row.childWidgets.length - 1 && rowFormat.gridAfter > 0) {
                        cellWidth = this.getCellWidth(rowFormat.gridAfterWidth, 'Point', tableWidth, null);
                        currOffset += cellWidth;
                        if (tempGrid.indexOf(parseFloat(currOffset.toFixed(2))) < 0) {
                            tempGrid.push(parseFloat(currOffset.toFixed(2)));
                            tempSpanDecimal.push(currOffset);
                        }
                        columnSpan += rowFormat.gridAfter;
                    }
                    if (!this.tableCellInfo.containsKey(row.rowIndex)) {
                        this.tableCellInfo.add(row.rowIndex, rowCellInfo);
                    }
                }
            }
            tempGrid.sort(function (a, b) { return a - b; });
            tempSpanDecimal.sort(function (a, b) { return a - b; });
            if (this.tableHolder.columns.length > 0 && (tempGrid.length - 1 !== this.tableHolder.columns.length || isInsertRow)) {
                this.updateColumnSpans(tempGrid, tableWidth, tempSpanDecimal);
            }
            this.tableCellInfo.clear();
            this.tableCellInfo = undefined;
        };
        TableWidget.prototype.updateColumnSpans = function (tempGrid, containerWidth, tempSpan) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                if (row.rowFormat.gridBeforeWidth >= 0) {
                    row.rowFormat.gridBefore = row.getGridCount(tempGrid, undefined, -1, containerWidth, tempSpan);
                }
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    var columnSpan = row.getGridCount(tempGrid, cell, cell.getIndex(), containerWidth, tempSpan);
                    if (columnSpan > 0 && cell.cellFormat.columnSpan !== columnSpan) {
                        cell.cellFormat.columnSpan = columnSpan;
                    }
                }
                if (row.rowFormat.gridAfterWidth >= 0) {
                    row.rowFormat.gridAfter = row.getGridCount(tempGrid, undefined, row.childWidgets.length, containerWidth, tempSpan);
                }
            }
        };
        TableWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
            this.checkTableColumns();
            var isAllColumnHasPointWidth = this.tableHolder.isAllColumnHasPointWidthType();
            var tableWidth = isAllColumnHasPointWidth ? this.tableHolder.getTotalWidth(0) : this.tableHolder.getTotalWidth(1);
            if (tableWidth > minimumWordWidth) {
                minimumWordWidth = tableWidth;
            }
            if (!isAllColumnHasPointWidth) {
                tableWidth = this.tableHolder.getTotalWidth(2);
            }
            if (tableWidth > maximumWordWidth) {
                maximumWordWidth = tableWidth;
            }
            return { 'minimumWordWidth': minimumWordWidth, 'maximumWordWidth': maximumWordWidth };
        };
        TableWidget.prototype.checkTableColumns = function () {
            if (this.isGridUpdated) {
                return;
            }
            var isAutoFit = this.isAutoFit();
            if (isAutoFit || this.tableHolder.columns.length === 0) {
                this.buildTableColumns();
            }
            this.isGridUpdated = false;
        };
        TableWidget.prototype.isAutoFit = function () {
            var bodyWidget = this.bodyWidget;
            if (!ej2_base_1.isNullOrUndefined(bodyWidget) && !ej2_base_1.isNullOrUndefined(bodyWidget.page)) {
                return bodyWidget.page.documentHelper.layout.getParentTable(this).tableFormat.allowAutoFit;
            }
            return false;
        };
        TableWidget.prototype.buildTableColumns = function () {
            if (this.isGridUpdated) {
                return;
            }
            this.tableHolder.resetColumns();
            var containerWidth = 0;
            var tableWidth = 0;
            var rowSpannedCells = [];
            var isAutoWidth = this.tableFormat.preferredWidthType === 'Auto';
            var isAutoFit = this.tableFormat.allowAutoFit;
            if (((!ej2_base_1.isNullOrUndefined(this.bodyWidget.page)) && this.bodyWidget.page.viewer instanceof viewer_1.WebLayoutViewer && isAutoFit && !this.isInsideTable && !(this.containerWidget instanceof TextFrame))) {
                containerWidth = editor_helper_1.HelperMethods.convertPixelToPoint(this.bodyWidget.page.viewer.clientArea.width - this.bodyWidget.page.viewer.padding.right * 3);
            }
            else {
                containerWidth = this.getOwnerWidth(true);
            }
            containerWidth = (this.tableFormat.preferredWidth > containerWidth) ? this.tableFormat.preferredWidth : containerWidth;
            var isZeroWidth = (isAutoWidth && this.tableFormat.preferredWidth === 0 && !isAutoFit);
            tableWidth = this.getTableClientWidth(containerWidth);
            var pageContainerWidth = this.getContainerWidth();
            if (isZeroWidth && !this.isDefaultFormatUpdated && isAutoFit) {
                this.splitWidthToTableCells(tableWidth, isZeroWidth);
            }
            var hasSpannedCells = false;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                var rowFormat = row.rowFormat;
                var columnSpan = 0;
                var cellWidth = 0;
                var sizeInfo = new ColumnSizeInfo();
                var offset = 0;
                if (rowFormat.gridBefore > 0 && (row.rowFormat.beforeWidth !== 0 || row.rowFormat.gridBeforeWidth !== 0) && ((this.bodyWidget.page.documentHelper.alignTablesRowByRow) ? row.ownerTable.tableFormat.tableAlignment === 'Left' : true)) {
                    cellWidth = this.getCellWidth(rowFormat.gridBeforeWidth, row.rowFormat.gridAfterWidthType, tableWidth, null);
                    sizeInfo.minimumWidth = cellWidth;
                    this.tableHolder.addColumns(columnSpan, columnSpan = rowFormat.gridBefore, cellWidth, sizeInfo, offset = cellWidth, 'Point');
                }
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    if (cell.cellFormat.rowSpan > 1 || cell.cellFormat.columnSpan > 1) {
                        hasSpannedCells = true;
                    }
                    if (rowSpannedCells.length === 0) {
                        cell.columnIndex = columnSpan;
                    }
                    for (var k = 0; k < rowSpannedCells.length; k++) {
                        var rowSpannedCell = rowSpannedCells[k];
                        if (rowSpannedCell.columnIndex < columnSpan) {
                            cell.columnIndex = columnSpan;
                            continue;
                        }
                        var rowSpan = 1;
                        var removeSpannedCell = true;
                        rowSpan = rowSpannedCell.cellFormat.rowSpan;
                        if (rowSpannedCell.columnIndex > columnSpan) {
                            cell.columnIndex = columnSpan;
                            removeSpannedCell = false;
                        }
                        else {
                            sizeInfo = rowSpannedCell.getCellSizeInfo(isAutoFit);
                            cellWidth = this.getCellWidth(rowSpannedCell.cellFormat.preferredWidth, rowSpannedCell.cellFormat.preferredWidthType, tableWidth, rowSpannedCell);
                            if (this.tableHolder.columns.length > 0) {
                                this.tableHolder.addColumns(columnSpan, columnSpan = this.tableHolder.columns.indexOf(rowSpannedCell.ownerColumn) + rowSpannedCell.cellFormat.columnSpan, cellWidth, sizeInfo, offset += cellWidth, cell.cellFormat.preferredWidthType);
                                cell.columnIndex = columnSpan;
                            }
                            else {
                                this.tableHolder.addColumns(columnSpan, columnSpan = rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan, cellWidth, sizeInfo, offset += cellWidth, cell.cellFormat.preferredWidthType);
                                cell.columnIndex = columnSpan;
                            }
                        }
                        if (!removeSpannedCell && j === row.childWidgets.length - 1) {
                            removeSpannedCell = true;
                        }
                        if (removeSpannedCell && i - rowSpannedCell.ownerRow.rowIndex === rowSpan - 1) {
                            rowSpannedCells.splice(k, 1);
                            k--;
                        }
                    }
                    if (cell.cellFormat.rowSpan > 1) {
                        if (rowSpannedCells.length === 0 || rowSpannedCells[rowSpannedCells.length - 1].columnIndex <= columnSpan) {
                            rowSpannedCells.push(cell);
                        }
                        else {
                            var insertIndex = 0;
                            for (var m = rowSpannedCells.length; m > 0; m--) {
                                if (rowSpannedCells[m - 1].columnIndex > columnSpan) {
                                    insertIndex = m - 1;
                                }
                            }
                            rowSpannedCells.splice(insertIndex, 0, cell);
                        }
                    }
                    sizeInfo = cell.getCellSizeInfo(isAutoFit);
                    cellWidth = this.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, tableWidth, cell);
                    this.tableHolder.addColumns(columnSpan, columnSpan += cell.cellFormat.columnSpan, cellWidth, sizeInfo, offset += cellWidth, cell.cellFormat.preferredWidthType);
                    if (j === row.childWidgets.length - 1 && rowFormat.gridAfterWidth > 0) {
                        cellWidth = this.getCellWidth(rowFormat.gridAfterWidth, 'Point', tableWidth, null);
                        sizeInfo.minimumWordWidth = sizeInfo.maximumWordWidth = sizeInfo.minimumWidth = cellWidth;
                        this.tableHolder.addColumns(columnSpan, columnSpan += rowFormat.gridAfter, cellWidth, sizeInfo, offset += cellWidth, 'Point');
                    }
                }
            }
            if (isZeroWidth && !this.isDefaultFormatUpdated) {
                this.isDefaultFormatUpdated = true;
            }
            this.tableHolder.validateColumnWidths();
            if (isAutoFit) {
                this.tableHolder.autoFitColumn(containerWidth, tableWidth, isAutoWidth, this.isInsideTable, isAutoFit, hasSpannedCells, this.leftIndent + this.rightIndent, pageContainerWidth);
            }
            else {
                this.tableHolder.fitColumns(containerWidth, tableWidth, isAutoWidth, isAutoFit, this.leftIndent + this.rightIndent);
            }
            this.setWidthToCells(tableWidth, isAutoWidth);
        };
        TableWidget.prototype.setWidthToCells = function (tableWidth, isAutoWidth) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var rw = this.childWidgets[i];
                var rowFormat = rw.rowFormat;
                if (rowFormat.gridBefore > 0) {
                    rowFormat.beforeWidth = this.tableHolder.getCellWidth(0, rowFormat.gridBefore, tableWidth);
                }
                for (var j = 0; j < rw.childWidgets.length; j++) {
                    var cell = rw.childWidgets[j];
                    cell.cellFormat.cellWidth = this.tableHolder.getCellWidth(cell.columnIndex, cell.cellFormat.columnSpan, tableWidth);
                }
                if (rowFormat.gridAfter > 0) {
                    rowFormat.afterWidth = this.tableHolder.getCellWidth(0, rowFormat.gridAfter, tableWidth);
                }
            }
        };
        TableWidget.prototype.updateProperties = function (updateAllowAutoFit, currentSelectedTable, autoFitBehavior) {
            if (updateAllowAutoFit) {
                this.tableFormat.allowAutoFit = autoFitBehavior !== 'FixedColumnWidth';
            }
            if (this !== currentSelectedTable) {
                currentSelectedTable.updateProperties(false, currentSelectedTable, autoFitBehavior);
                return;
            }
            if (autoFitBehavior === 'FixedColumnWidth') {
                this.tableFormat.preferredWidth = 0;
                this.tableFormat.preferredWidthType = 'Auto';
                for (var i = 0; i < this.childWidgets.length; i++) {
                    var rowWidget = this.childWidgets[i];
                    for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                        var cellWidget = rowWidget.childWidgets[j];
                        cellWidget.cellFormat.preferredWidthType = 'Point';
                        cellWidget.cellFormat.preferredWidth = cellWidget.cellFormat.cellWidth;
                    }
                }
            }
            else if (autoFitBehavior === 'FitToWindow') {
                var tableWidth = this.tableHolder.getTotalWidth(0);
                this.tableFormat.leftIndent = 0;
                this.tableFormat.preferredWidth = 100;
                this.tableFormat.preferredWidthType = 'Percent';
                for (var i = 0; i < this.childWidgets.length; i++) {
                    var row = this.childWidgets[i];
                    for (var z = 0; z < row.childWidgets.length; z++) {
                        var cell = row.childWidgets[z];
                        if (cell.cellFormat.preferredWidthType !== 'Percent') {
                            cell.cellFormat.preferredWidthType = 'Percent';
                            cell.cellFormat.preferredWidth = (cell.cellFormat.cellWidth / tableWidth) * 100;
                        }
                    }
                }
            }
            else {
                this.tableFormat.preferredWidth = 0;
                this.tableFormat.preferredWidthType = 'Auto';
                for (var i = 0; i < this.childWidgets.length; i++) {
                    var row = this.childWidgets[i];
                    row.rowFormat.beforeWidth = 0;
                    row.rowFormat.gridBefore = 0;
                    row.rowFormat.gridBeforeWidth = 0;
                    row.rowFormat.gridBeforeWidthType = 'Auto';
                    row.rowFormat.afterWidth = 0;
                    row.rowFormat.gridAfter = 0;
                    row.rowFormat.gridAfterWidth = 0;
                    row.rowFormat.gridAfterWidthType = 'Auto';
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        var cell = row.childWidgets[j];
                        cell.cellFormat.preferredWidth = 0;
                        cell.cellFormat.preferredWidthType = 'Auto';
                    }
                }
            }
        };
        TableWidget.prototype.getMaxRowWidth = function (clientWidth) {
            var width = 0;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                var rowWidth = 0;
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    rowWidth += this.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, clientWidth, cell);
                }
                if (width < rowWidth) {
                    width = rowWidth;
                }
            }
            return width;
        };
        TableWidget.prototype.updateWidth = function (dragValue) {
            var totalPreferredWidth = this.tableHolder.getTotalWidth(0);
            var ownerWidth = this.getOwnerWidth(true);
            var containerWidth = this.getTableClientWidth(ownerWidth);
            if (containerWidth <= totalPreferredWidth) {
                if (this.tableFormat.preferredWidthType === 'Auto') {
                    this.tableFormat.preferredWidthType = 'Point';
                }
            }
            if (this.tableFormat.preferredWidthType !== 'Auto') {
                if (this.tableFormat.preferredWidthType === 'Point') {
                    this.tableFormat.preferredWidth = this.getMaxRowWidth(containerWidth);
                }
                else {
                    var value = (totalPreferredWidth / ownerWidth) * 100;
                    this.tableFormat.preferredWidth = value;
                }
            }
        };
        TableWidget.prototype.convertPointToPercent = function (tablePreferredWidth, ownerWidth) {
            var value = 0;
            value = (tablePreferredWidth / ownerWidth) * 100;
            value = Math.round(value);
            return value < 100 ? value : 100;
        };
        TableWidget.prototype.updateChildWidgetLeft = function (left) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var rowWidget = this.childWidgets[i];
                rowWidget.x = left;
                rowWidget.updateChildWidgetLeft(left);
            }
        };
        TableWidget.prototype.shiftWidgetsForRtlTable = function (clientArea, tableWidget) {
            var clientAreaX = tableWidget.x;
            var clientAreaRight = clientArea.right;
            var cellSpace = 0;
            if (tableWidget.tableFormat && tableWidget.tableFormat.cellSpacing > 0) {
                cellSpace = tableWidget.tableFormat.cellSpacing;
            }
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var rowWidget = tableWidget.childWidgets[i];
                var rowX = rowWidget.x;
                var left = clientAreaRight - (rowX - clientAreaX);
                for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                    var cellWidget = rowWidget.childWidgets[j];
                    left = left -
                        (cellWidget.width + cellWidget.margin.left + cellWidget.margin.right - cellWidget.rightBorderWidth + cellSpace);
                    cellWidget.updateWidgetLeft(left + cellWidget.margin.left);
                }
            }
        };
        TableWidget.prototype.clone = function () {
            var table = new TableWidget();
            table.tableHolder = this.tableHolder.clone();
            table.tableFormat.copyFormat(this.tableFormat);
            if (this.wrapTextAround) {
                table.wrapTextAround = this.wrapTextAround;
                table.positioning = this.positioning.clone();
            }
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i].clone();
                table.childWidgets.push(row);
                row.containerWidget = table;
                row.index = i;
            }
            table.x = this.x;
            table.y = this.y;
            table.height = this.height;
            table.width = this.width;
            table.containerWidget = this.containerWidget;
            if (this.contentControlProperties) {
                table.contentControlProperties = this.contentControlProperties;
            }
            return table;
        };
        TableWidget.getTableOf = function (node) {
            if (node instanceof index_2.WBorders) {
                var row = TableRowWidget.getRowOf(node);
                if (!ej2_base_1.isNullOrUndefined(row)) {
                    return row.ownerTable;
                }
                else if (node.ownerBase instanceof index_1.WTableFormat && node.ownerBase.ownerBase instanceof TableWidget) {
                    return node.ownerBase.ownerBase;
                }
                else {
                    return undefined;
                }
            }
            return undefined;
        };
        TableWidget.prototype.fitChildToClientArea = function () {
            var clientWidth = this.getContainerWidth();
            if (Math.round(clientWidth) < Math.round(this.getTableWidth())) {
                this.fitCellsToClientArea(clientWidth);
            }
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        if (cell.childWidgets[k] instanceof TableWidget) {
                            cell.childWidgets[k].fitChildToClientArea();
                        }
                    }
                }
            }
        };
        TableWidget.prototype.getColumnCellsForSelection = function (startCell, endCell) {
            var cells = [];
            var start = startCell.columnIndex;
            var end = endCell.columnIndex + endCell.cellFormat.columnSpan;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    var columnIndex = cell.columnIndex;
                    var columnSpan = cell.cellFormat.columnSpan;
                    if ((columnIndex + columnSpan > start && columnIndex + columnSpan < end) || (columnIndex > start && columnIndex < end)) {
                        if (cells.indexOf(cell) < 0) {
                            cells.push(cell);
                        }
                    }
                    else if ((columnIndex > start && columnIndex < end && columnIndex + columnSpan < end)
                        || (columnIndex < start && columnIndex + columnSpan > end)) {
                        if (cells.indexOf(cell) < 0) {
                            cells.push(cell);
                        }
                    }
                    else if (columnIndex === start || columnIndex + columnSpan === end) {
                        if (cells.indexOf(cell) < 0) {
                            cells.push(cell);
                        }
                    }
                }
            }
            return cells;
        };
        TableWidget.prototype.splitWidthToTableCells = function (tableClientWidth, isZeroWidth) {
            for (var row = 0; row < this.childWidgets.length; row++) {
                this.childWidgets[row].splitWidthToRowCells(tableClientWidth, isZeroWidth);
            }
        };
        TableWidget.prototype.insertTableRowsInternal = function (tableRows, startIndex, isInsertRow) {
            for (var i = tableRows.length - 1; i >= 0; i--) {
                var row = tableRows.splice(i, 1)[0];
                row.containerWidget = this;
                this.childWidgets.splice(startIndex, 0, row);
            }
            this.updateRowIndex(startIndex);
            this.isGridUpdated = false;
            if (isInsertRow) {
                this.calculateGrid(true);
                this.buildTableColumns();
            }
            this.isGridUpdated = true;
        };
        TableWidget.prototype.updateRowIndex = function (startIndex) {
            for (var i = startIndex; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                row.index = i;
                for (var j = 0; j < row.childWidgets.length; j++) {
                    row.childWidgets[j].index = j;
                    row.childWidgets[j].rowIndex = row.rowIndex;
                }
                startIndex++;
            }
        };
        TableWidget.prototype.getCellStartOffset = function (cell) {
            var offset = 0;
            if (cell && this.tableCellInfo) {
                if (this.tableCellInfo.containsKey(cell.ownerRow.rowIndex)) {
                    var rowCellInfo = this.tableCellInfo.get(cell.ownerRow.rowIndex);
                    if (rowCellInfo.containsKey(cell.cellIndex)) {
                        offset = rowCellInfo.get(cell.cellIndex);
                    }
                }
            }
            return offset;
        };
        TableWidget.prototype.destroyInternal = function (viewer) {
            var height = this.height;
            if (!ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                for (var j = 0; j < this.childWidgets.length; j++) {
                    var widget = undefined;
                    var childWidget = this.childWidgets[j];
                    widget = childWidget;
                    if (!ej2_base_1.isNullOrUndefined(widget)) {
                        widget.destroyInternal(viewer);
                    }
                    if (ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                        break;
                    }
                    j--;
                }
                this.childWidgets = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.containerWidget)) {
                if (this.containerWidget instanceof BodyWidget) {
                    if (this.containerWidget.floatingElements.indexOf(this) !== -1) {
                        this.containerWidget.floatingElements.splice(this.containerWidget.floatingElements.indexOf(this), 1);
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(this.containerWidget.childWidgets)) {
                    if (this.containerWidget.childWidgets.indexOf(this) !== -1) {
                        this.containerWidget.childWidgets.splice(this.containerWidget.childWidgets.indexOf(this), 1);
                    }
                    this.containerWidget.height -= height;
                }
                this.containerWidget = undefined;
            }
            this.destroy();
        };
        TableWidget.prototype.destroy = function () {
            this.tableFormat = undefined;
            if (this.spannedRowCollection) {
                this.spannedRowCollection.destroy();
            }
            this.spannedRowCollection = undefined;
            this.tableHolder = undefined;
            this.flags = undefined;
            this.leftMargin = undefined;
            this.topMargin = undefined;
            this.rightMargin = undefined;
            this.bottomMargin = undefined;
            this.headerHeight = undefined;
            this.isDefaultFormatUpdated = undefined;
            _super.prototype.destroy.call(this);
        };
        TableWidget.prototype.componentDestroy = function () {
            if (this.tableFormat) {
                this.tableFormat.destroy();
            }
            this.tableFormat = undefined;
            if (this.spannedRowCollection) {
                this.spannedRowCollection.destroy();
            }
            this.spannedRowCollection = undefined;
            if (this.tableHolder) {
                this.tableHolder.destroy();
            }
            this.tableHolder = undefined;
            this.flags = undefined;
            this.leftMargin = undefined;
            this.topMargin = undefined;
            this.rightMargin = undefined;
            this.bottomMargin = undefined;
            this.headerHeight = undefined;
            this.isDefaultFormatUpdated = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return TableWidget;
    }(BlockWidget));
    exports.TableWidget = TableWidget;
    var TableRowWidget = (function (_super) {
        __extends(TableRowWidget, _super);
        function TableRowWidget() {
            var _this = _super.call(this) || this;
            _this.isRenderBookmarkEnd = false;
            _this.topBorderWidth = 0;
            _this.bottomBorderWidth = 0;
            _this.rowFormat = new index_1.WRowFormat(_this);
            _this.editRangeID = new dictionary_1.Dictionary();
            return _this;
        }
        Object.defineProperty(TableRowWidget.prototype, "rowIndex", {
            get: function () {
                if (this.containerWidget) {
                    return this.containerWidget.childWidgets.indexOf(this);
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableRowWidget.prototype, "ownerTable", {
            get: function () {
                if (this.containerWidget instanceof TableWidget) {
                    return this.containerWidget;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableRowWidget.prototype, "nextRow", {
            get: function () {
                var index = this.indexInOwner;
                if (index > -1 && index < this.ownerTable.childWidgets.length - 1) {
                    return this.ownerTable.childWidgets[index + 1];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        TableRowWidget.prototype.equals = function (widget) {
            return widget instanceof TableRowWidget && widget.rowFormat === this.rowFormat;
        };
        TableRowWidget.prototype.combineCells = function (viewer) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var cell = this.childWidgets[i];
                cell.combineWidget(viewer);
                if (!ej2_base_1.isNullOrUndefined(cell.cellFormat) && cell.cellFormat.rowSpan === 1) {
                    var cellHeight = cell.height + cell.margin.top + cell.margin.bottom;
                    if ((this.height - this.ownerTable.tableFormat.cellSpacing) < cell.height) {
                        this.height = this.ownerTable.tableFormat.cellSpacing + cell.height;
                    }
                }
                else if (ej2_base_1.isNullOrUndefined(cell.cellFormat)) {
                    i--;
                }
            }
        };
        TableRowWidget.getRowOf = function (node) {
            if (node instanceof index_2.WBorders) {
                var cell = TableCellWidget.getCellOf(node);
                if (!ej2_base_1.isNullOrUndefined(cell)) {
                    return cell.ownerRow;
                }
                else if (node.ownerBase instanceof index_1.WRowFormat && node.ownerBase.ownerBase instanceof TableRowWidget) {
                    return node.ownerBase.ownerBase;
                }
                else {
                    return undefined;
                }
            }
            return undefined;
        };
        TableRowWidget.prototype.getCell = function (rowIndex, cellIndex) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var cell = this.childWidgets[i];
                if (cell.rowIndex === rowIndex && cell.index === cellIndex) {
                    return cell;
                }
            }
            return undefined;
        };
        TableRowWidget.prototype.getCellUsingColumnIndex = function (rowIndex, columnIndex) {
            var cell;
            for (var i = 0; i < this.childWidgets.length; i++) {
                cell = this.childWidgets[i];
                if (cell.rowIndex === rowIndex && cell.columnIndex === columnIndex) {
                    return cell;
                }
            }
            cell = this.getCell(rowIndex, columnIndex);
            if (!ej2_base_1.isNullOrUndefined(cell)) {
                return cell;
            }
            return undefined;
        };
        TableRowWidget.prototype.splitWidthToRowCells = function (tableClientWidth, isZeroWidth) {
            var cells = this.childWidgets;
            var cellWidth = tableClientWidth / cells.length;
            for (var cell = 0; cell < cells.length; cell++) {
                if (isZeroWidth && cells[cell].cellFormat.preferredWidth === 0) {
                    cells[cell].cellFormat.preferredWidth = cellWidth;
                    this.ownerTable.isDefaultFormatUpdated = false;
                }
                else if (isZeroWidth) {
                    this.ownerTable.isDefaultFormatUpdated = true;
                    break;
                }
                else {
                    cells[cell].cellFormat.preferredWidth = cellWidth;
                }
            }
        };
        TableRowWidget.prototype.getGridCount = function (tableGrid, cell, index, containerWidth, tempSpan) {
            var prevOffset = 0;
            var width = 0;
            var ownerTable = this.ownerTable;
            var rowFormat = this.rowFormat;
            if (index === -1) {
                width = ownerTable.getCellWidth(rowFormat.gridBeforeWidth, rowFormat.gridBeforeWidthType, containerWidth, null);
            }
            else {
                prevOffset += ownerTable.getCellWidth(rowFormat.gridBeforeWidth, rowFormat.gridBeforeWidthType, containerWidth, null);
                if (index >= 0) {
                    prevOffset += ownerTable.getCellStartOffset(cell);
                }
                if (index < this.childWidgets.length) {
                    width = ownerTable.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, containerWidth, null);
                }
                else {
                    width = ownerTable.getCellWidth(rowFormat.gridAfterWidth, rowFormat.gridAfterWidthType, containerWidth, null);
                }
            }
            var tabIndex = tableGrid.indexOf(prevOffset);
            var tabGrid = tempSpan[tabIndex];
            var gridEndIndex;
            var gridStartIndex = this.getOffsetIndex(tableGrid, prevOffset);
            var gridWidth = parseFloat((width + prevOffset).toFixed(2));
            var gridDecimalWidth = parseFloat((width + tabGrid).toFixed(2));
            if (gridDecimalWidth !== gridWidth && !ej2_base_1.isNullOrUndefined(tabGrid)) {
                gridEndIndex = this.getOffsetIndex(tableGrid, tabGrid + width);
            }
            else {
                gridEndIndex = this.getOffsetIndex(tableGrid, prevOffset + width);
            }
            return gridEndIndex - gridStartIndex;
        };
        TableRowWidget.prototype.getOffsetIndex = function (tableGrid, offset) {
            offset = parseFloat(offset.toFixed(2));
            var index = 0;
            if (tableGrid.indexOf(offset) >= 0) {
                index = tableGrid.indexOf(offset);
            }
            else {
                for (var i = 0; i < tableGrid.length; i++) {
                    if (tableGrid[i] > offset) {
                        return i;
                    }
                }
                index = tableGrid.length - 1;
            }
            return index;
        };
        TableRowWidget.prototype.getCellOffset = function (index, containerWidth) {
            var prevOffset = 0;
            var ownerTable = this.ownerTable;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var cellFormat = this.childWidgets[i].cellFormat;
                if (i === index) {
                    break;
                }
                prevOffset += ownerTable.getCellWidth(cellFormat.preferredWidth, cellFormat.preferredWidthType, containerWidth, null);
            }
            return prevOffset;
        };
        TableRowWidget.prototype.updateRowBySpannedCells = function () {
            var rowSpannedCells = this.getPreviousRowSpannedCells();
            var currentRowIndex = this.rowIndex;
            for (var i = 0; i < rowSpannedCells.length; i++) {
                var spannedCell = rowSpannedCells[i];
                var rowSpanEnd = spannedCell.ownerRow.rowIndex + spannedCell.cellFormat.rowSpan - 1;
                if (rowSpanEnd >= currentRowIndex) {
                    spannedCell.cellFormat.rowSpan -= 1;
                }
            }
        };
        TableRowWidget.prototype.getPreviousRowSpannedCells = function (include) {
            var rowSpannedCells = [];
            var row = include ? this : this.previousWidget;
            while (!ej2_base_1.isNullOrUndefined(row)) {
                for (var i = 0; i < row.childWidgets.length; i++) {
                    var cell = row.childWidgets[i];
                    if (cell.cellFormat.rowSpan > 1) {
                        rowSpannedCells.splice(0, 0, cell);
                    }
                }
                row = row.previousWidget;
            }
            return rowSpannedCells;
        };
        TableRowWidget.prototype.isCellsHaveSameWidthUnit = function () {
            if (this.childWidgets.length > 0) {
                var firstCellWidthUnit = this.childWidgets[0].cellFormat.preferredWidthType;
                for (var i = 1; i < this.childWidgets.length; i++) {
                    var cell = this.childWidgets[i];
                    if (firstCellWidthUnit != cell.cellFormat.preferredWidthType) {
                        return false;
                    }
                }
            }
            return true;
        };
        TableRowWidget.prototype.updateUniformWidthUnitForCells = function () {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var cell = this.childWidgets[i];
                cell.cellFormat.preferredWidthType = "Point";
                cell.cellFormat.preferredWidth = cell.cellFormat.cellWidth;
            }
        };
        TableRowWidget.prototype.getTableCellWidget = function (point) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var x = Math.round(this.childWidgets[i].x);
                if (x - this.childWidgets[i].margin.left - 1 <= point.x
                    && (x + this.childWidgets[i].width) >= point.x) {
                    return this.childWidgets[i];
                }
                else if (i === this.childWidgets.length - 1
                    && (this.childWidgets[i].x + this.childWidgets[i].width) + 1 <= point.x) {
                    return this.childWidgets[i];
                }
            }
            var cellWidget = undefined;
            if (this.childWidgets.length > 0) {
                if (this.childWidgets[0].x <= point.x) {
                    cellWidget = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(point);
                }
                else {
                    cellWidget = this.childWidgets[0].getTableCellWidget(point);
                }
            }
            return cellWidget;
        };
        TableRowWidget.prototype.getCellWidget = function (columnIndex, columnSpan) {
            var tableHolder = this.ownerTable.tableHolder;
            var index = tableHolder.getValidColumnIndex(columnIndex);
            if (index > columnIndex) {
                columnSpan -= index - columnIndex;
                columnIndex = index;
            }
            var colIndex = 0;
            if (this.rowFormat.gridBefore > 0) {
                colIndex += this.rowFormat.gridBefore;
            }
            for (var i = 0; i < this.childWidgets.length; i++) {
                var cell = this.childWidgets[i];
                var colSpan = cell.cellFormat.columnSpan;
                if (colIndex < cell.columnIndex && (colIndex <= columnIndex || colIndex < columnIndex + columnSpan)
                    && cell.columnIndex > columnIndex) {
                    return null;
                }
                if ((cell.columnIndex <= columnIndex || cell.columnIndex < columnIndex + columnSpan)
                    && cell.columnIndex + colSpan > columnIndex) {
                    return cell;
                }
                else if (cell.columnIndex > columnIndex) {
                    break;
                }
                colIndex += colSpan;
            }
            return null;
        };
        TableRowWidget.prototype.getVerticalMergeStartCell = function (columnIndex, columnSpan) {
            var columns = this.ownerTable.tableHolder.columns;
            if (this.rowFormat.gridBefore > 0 && this.rowFormat.gridBefore > columnIndex + columnSpan) {
                return null;
            }
            var matchedCell = this.getCellWidget(columnIndex, columnSpan);
            if (!ej2_base_1.isNullOrUndefined(matchedCell)) {
                return matchedCell;
            }
            if (columnIndex + this.rowFormat.gridAfter === columns.length) {
                return null;
            }
            var cell;
            var previousRow = this.previousWidget;
            if (!ej2_base_1.isNullOrUndefined(previousRow)) {
                cell = previousRow.getVerticalMergeStartCell(columnIndex, columnSpan);
            }
            if (!ej2_base_1.isNullOrUndefined(cell) && cell.cellFormat.rowSpan > 1 && this.index === cell.rowIndex + cell.cellFormat.rowSpan - 1) {
                return cell;
            }
            return null;
        };
        TableRowWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
            return { 'minimumWordWidth': minimumWordWidth, 'maximumWordWidth': maximumWordWidth };
        };
        TableRowWidget.prototype.destroyInternal = function (viewer) {
            var height = this.height;
            if (!ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                for (var i = 0; i < this.childWidgets.length; i++) {
                    var widget = this.childWidgets[i];
                    widget.destroyInternal(viewer);
                    if (ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                        break;
                    }
                    i--;
                }
                this.childWidgets = undefined;
            }
            if (!ej2_base_1.isNullOrUndefined(this.containerWidget)) {
                if (!ej2_base_1.isNullOrUndefined(this.containerWidget.childWidgets)) {
                    this.containerWidget.childWidgets.splice(this.containerWidget.childWidgets.indexOf(this), 1);
                    if ((ej2_base_1.isNullOrUndefined(this.containerWidget.childWidgets) || this.containerWidget.childWidgets.length === 0)
                        && this.containerWidget instanceof TableWidget) {
                        this.containerWidget.destroyInternal(viewer);
                    }
                    else if (this.containerWidget.containerWidget instanceof BodyWidget) {
                        this.containerWidget.containerWidget.height -= height;
                    }
                    this.containerWidget.height -= height;
                }
            }
            this.destroy();
        };
        TableRowWidget.prototype.clone = function () {
            var row = new TableRowWidget();
            row.rowFormat.copyFormat(this.rowFormat);
            row.topBorderWidth = this.topBorderWidth;
            row.bottomBorderWidth = this.bottomBorderWidth;
            row.isRenderBookmarkEnd = this.isRenderBookmarkEnd;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var cell = this.childWidgets[i].clone();
                row.childWidgets.push(cell);
                cell.containerWidget = row;
                cell.index = i;
                cell.rowIndex = this.rowIndex;
            }
            row.x = this.x;
            row.y = this.y;
            row.height = this.height;
            row.width = this.width;
            if (this.contentControlProperties) {
                row.contentControlProperties = this.contentControlProperties;
            }
            return row;
        };
        TableRowWidget.prototype.updateChildWidgetLeft = function (left) {
            var spacing = 0;
            if (this.ownerTable.tableFormat.cellSpacing > 0) {
                spacing = this.ownerTable.tableFormat.cellSpacing;
            }
            for (var i = 0; i < this.childWidgets.length; i++) {
                var cellWidget = this.childWidgets[i];
                left += spacing + cellWidget.margin.left;
                cellWidget.x = left;
                cellWidget.updateChildWidgetLeft(cellWidget.x);
                left += cellWidget.width + cellWidget.margin.right;
            }
        };
        TableRowWidget.prototype.shiftWidgetForRtlTable = function () {
            var tableWidget = this.ownerTable;
            var clientAreaX = tableWidget.x;
            var cellSpace = 0;
            var tableWidth = 0;
            if (tableWidget.tableFormat != null && tableWidget.tableFormat.cellSpacing > 0) {
                cellSpace = tableWidget.tableFormat.cellSpacing;
            }
            tableWidth = editor_helper_1.HelperMethods.convertPointToPixel(tableWidget.getTableWidth());
            var rowX = this.x;
            var clientAreaRight = clientAreaX + tableWidth;
            var left = clientAreaRight - (rowX - clientAreaX);
            var prevSpannedCellWidth = 0;
            for (var j = 0; j < this.childWidgets.length; j++) {
                var cellWidget = this.childWidgets[j];
                var prevColumnIndex = 0;
                if (!ej2_base_1.isNullOrUndefined(cellWidget.previousWidget)) {
                    prevColumnIndex = cellWidget.previousWidget.columnIndex + cellWidget.previousWidget.cellFormat.columnSpan;
                }
                if (prevColumnIndex < cellWidget.columnIndex) {
                    prevSpannedCellWidth = editor_helper_1.HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableHolder.getPreviousSpannedCellWidth(prevColumnIndex, cellWidget.columnIndex));
                    if (prevColumnIndex === 0) {
                        prevSpannedCellWidth = prevSpannedCellWidth - cellSpace / 2;
                    }
                }
                left = left - (cellWidget.width + cellWidget.margin.left + cellWidget.margin.right + cellSpace);
                cellWidget.updateWidgetLeft(left + cellWidget.margin.left - prevSpannedCellWidth);
            }
        };
        TableRowWidget.prototype.destroy = function () {
            this.rowFormat = undefined;
            this.topBorderWidth = undefined;
            this.bottomBorderWidth = undefined;
            _super.prototype.destroy.call(this);
        };
        TableRowWidget.prototype.componentDestroy = function () {
            if (this.rowFormat) {
                this.rowFormat.destroy();
            }
            this.rowFormat = undefined;
            this.topBorderWidth = undefined;
            this.bottomBorderWidth = undefined;
            this.isRenderBookmarkEnd = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return TableRowWidget;
    }(BlockWidget));
    exports.TableRowWidget = TableRowWidget;
    var TableCellWidget = (function (_super) {
        __extends(TableCellWidget, _super);
        function TableCellWidget() {
            var _this = _super.call(this) || this;
            _this.rowIndex = -1;
            _this.sizeInfoInternal = new ColumnSizeInfo();
            _this.updatedTopBorders = [];
            _this.isRenderBookmarkStart = false;
            _this.isRenderBookmarkEnd = false;
            _this.isRenderEditRangeStart = false;
            _this.isRenderEditRangeEnd = false;
            _this.isSplittedCell = false;
            _this.margin = new Margin(_this.leftMargin, _this.topMargin, _this.rightMargin, _this.bottomMargin);
            _this.leftBorderWidth = 0;
            _this.rightBorderWidth = 0;
            _this.cellFormat = new index_1.WCellFormat(_this);
            return _this;
        }
        Object.defineProperty(TableCellWidget.prototype, "ownerColumn", {
            get: function () {
                return this.ownerTable.tableHolder.columns[this.columnIndex];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "leftMargin", {
            get: function () {
                if (this.cellFormat && this.cellFormat.containsMargins()) {
                    return this.cellFormat.leftMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('leftMargin')) {
                    return this.ownerRow.rowFormat.leftMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerTable) && !ej2_base_1.isNullOrUndefined(this.ownerTable.tableFormat)) {
                    return this.ownerTable.tableFormat.leftMargin;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "topMargin", {
            get: function () {
                if (this.cellFormat && this.cellFormat.containsMargins()) {
                    return this.cellFormat.topMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('topMargin')) {
                    return this.ownerRow.rowFormat.topMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerTable) && !ej2_base_1.isNullOrUndefined(this.ownerTable.tableFormat)) {
                    return this.ownerTable.tableFormat.topMargin;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "rightMargin", {
            get: function () {
                if (this.cellFormat && this.cellFormat.containsMargins()) {
                    return this.cellFormat.rightMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('rightMargin')) {
                    return this.ownerRow.rowFormat.rightMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerTable) && !ej2_base_1.isNullOrUndefined(this.ownerTable.tableFormat)) {
                    return this.ownerTable.tableFormat.rightMargin;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "bottomMargin", {
            get: function () {
                if (this.cellFormat && this.cellFormat.containsMargins()) {
                    return this.cellFormat.bottomMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('bottomMargin')) {
                    return this.ownerRow.rowFormat.bottomMargin;
                }
                else if (!ej2_base_1.isNullOrUndefined(this.ownerTable) && !ej2_base_1.isNullOrUndefined(this.ownerTable.tableFormat)) {
                    return this.ownerTable.tableFormat.bottomMargin;
                }
                else {
                    return 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "cellIndex", {
            get: function () {
                if (this.ownerRow) {
                    return this.ownerRow.childWidgets.indexOf(this);
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "ownerTable", {
            get: function () {
                if (this.containerWidget instanceof TableRowWidget) {
                    return this.containerWidget.ownerTable;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "ownerRow", {
            get: function () {
                return this.containerWidget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableCellWidget.prototype, "sizeInfo", {
            get: function () {
                return this.sizeInfoInternal;
            },
            enumerable: true,
            configurable: true
        });
        TableCellWidget.prototype.equals = function (widget) {
            return widget instanceof TableCellWidget && widget.cellFormat === this.cellFormat;
        };
        TableCellWidget.prototype.getContainerTable = function () {
            var table = this.ownerTable;
            while (table instanceof TableWidget && table.associatedCell instanceof TableCellWidget) {
                table = table.associatedCell.getContainerTable();
            }
            return table;
        };
        TableCellWidget.prototype.getPreviousSplitWidget = function () {
            if (this.containerWidget instanceof TableRowWidget) {
                var row = this.containerWidget;
                do {
                    row = row.previousRenderedWidget;
                    if (ej2_base_1.isNullOrUndefined(row) || row.index < this.rowIndex) {
                        break;
                    }
                    var previousCell = row.getCell(this.rowIndex, this.index);
                    if (previousCell && this.equals(previousCell)) {
                        return previousCell;
                    }
                } while (row);
            }
            return undefined;
        };
        TableCellWidget.prototype.getNextSplitWidget = function () {
            var rowSpan = this.cellFormat.rowSpan;
            if (this.containerWidget instanceof TableRowWidget) {
                var row = this.containerWidget;
                do {
                    row = row.nextRenderedWidget;
                    if (ej2_base_1.isNullOrUndefined(row) || row.index > this.rowIndex + rowSpan) {
                        break;
                    }
                    var nextCell = row.getCell(this.rowIndex, this.index);
                    if (nextCell && this.equals(nextCell)) {
                        return nextCell;
                    }
                } while (row);
            }
            return undefined;
        };
        TableCellWidget.prototype.getTableCellWidget = function (point) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                if (this.childWidgets[i].y <= point.y
                    && (this.childWidgets[i].y + this.childWidgets[i].height) >= point.y) {
                    return this.childWidgets[i].getTableCellWidget(point);
                }
            }
            var tableCellWidget = undefined;
            if (this.childWidgets.length > 0) {
                if (this.childWidgets[0].y <= point.y) {
                    tableCellWidget = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(point);
                }
                else {
                    tableCellWidget = this.childWidgets[0].getTableCellWidget(point);
                }
            }
            return tableCellWidget;
        };
        TableCellWidget.prototype.updateWidth = function (preferredWidth) {
            if (this.cellFormat.preferredWidthType === 'Point') {
                this.cellFormat.preferredWidth = preferredWidth;
            }
            else if (this.cellFormat.preferredWidthType === 'Percent') {
                this.cellFormat.preferredWidth = this.convertPointToPercent(preferredWidth);
            }
            this.cellFormat.cellWidth = preferredWidth;
        };
        TableCellWidget.prototype.getCellWidth = function (block) {
            var ownerTable = this.ownerTable;
            var containerWidth = ownerTable ? ownerTable.getTableClientWidth(ownerTable.getOwnerWidth(true)) : 0;
            var cellWidth = containerWidth;
            var leftMargin = !ej2_base_1.isNullOrUndefined(this.leftMargin) ? this.leftMargin : 0;
            var rightMargin = !ej2_base_1.isNullOrUndefined(this.rightMargin) ? this.rightMargin : 0;
            if (ownerTable && ownerTable.tableFormat.preferredWidthType === 'Auto' && ownerTable.tableFormat.allowAutoFit) {
                if (this.cellFormat.preferredWidth === 0) {
                    cellWidth = containerWidth;
                }
                else {
                    cellWidth = this.cellFormat.preferredWidth - leftMargin - rightMargin;
                }
            }
            else if (this.cellFormat.preferredWidthType === 'Percent') {
                cellWidth = (this.cellFormat.preferredWidth * containerWidth) / 100 - leftMargin - rightMargin;
            }
            else if (this.cellFormat.preferredWidthType === 'Point') {
                if (block instanceof TableWidget && block.tableFormat.preferredWidthType === 'Percent') {
                    cellWidth = this.cellFormat.cellWidth - leftMargin - rightMargin;
                }
                else {
                    cellWidth = this.cellFormat.preferredWidth - leftMargin - rightMargin;
                }
            }
            return cellWidth;
        };
        TableCellWidget.prototype.convertPointToPercent = function (cellPreferredWidth) {
            var value = 0;
            var clientWidth = this.ownerTable.getOwnerWidth(true);
            var tableWidth = this.ownerTable.getTableClientWidth(clientWidth);
            value = (cellPreferredWidth / tableWidth) * 100;
            value = Math.round(value);
            return value < 100 ? value : 100;
        };
        TableCellWidget.getCellLeftBorder = function (tableCell) {
            var leftBorder = undefined;
            var cellBorder = tableCell.cellFormat.borders;
            var rowBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
            var tableBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
            if (!ej2_base_1.isNullOrUndefined(cellBorder.left)) {
                leftBorder = cellBorder.left;
            }
            if (ej2_base_1.isNullOrUndefined(leftBorder)) {
                leftBorder = tableCell.getLeftBorderToRenderByHierarchy(leftBorder, rowBorders, tableBorders);
            }
            if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
                leftBorder = tableCell.getLeftBorderToRenderByHierarchy(leftBorder, rowBorders, tableBorders);
            }
            else {
                var prevCell = this.getPreviousCell(tableCell);
                leftBorder = tableCell.getPreviousCellLeftBorder(leftBorder, prevCell);
            }
            if (ej2_base_1.isNullOrUndefined(leftBorder)) {
                leftBorder = new index_2.WBorder(tableCell.cellFormat.borders);
            }
            return leftBorder;
        };
        TableCellWidget.getPreviousCell = function (tableCell) {
            var prevCell = undefined;
            if (!ej2_base_1.isNullOrUndefined(tableCell.previousWidget)) {
                var cell = tableCell.previousWidget;
                if (cell.columnIndex + cell.cellFormat.columnSpan === tableCell.columnIndex) {
                    prevCell = cell;
                }
            }
            return prevCell;
        };
        TableCellWidget.prototype.getLeftBorderWidth = function () {
            var borderWidth = 0;
            if (this.cellFormat !== null && this.cellFormat.borders !== null) {
                borderWidth = TableCellWidget.getCellLeftBorder(this).getLineWidth();
            }
            return borderWidth;
        };
        TableCellWidget.prototype.getRightBorderWidth = function () {
            var borderWidth = 0;
            var ownerTable = this.ownerTable;
            if (this.cellFormat !== null && this.cellFormat.borders !== null) {
                borderWidth = TableCellWidget.getCellRightBorder(this).getLineWidth();
            }
            return borderWidth;
        };
        TableCellWidget.prototype.getCellSpacing = function () {
            var actualCellSpacing = this.ownerTable && this.ownerTable.tableFormat ? this.ownerTable.tableFormat.cellSpacing : 0;
            var cellSpacingToLayout = actualCellSpacing;
            if (this.ownerRow.childWidgets.length === 1) {
                cellSpacingToLayout = actualCellSpacing * 2;
            }
            else if (this.cellIndex === 0 || this.cellIndex === this.ownerRow.childWidgets.length - 1) {
                cellSpacingToLayout = actualCellSpacing + (actualCellSpacing / 2);
            }
            else {
                cellSpacingToLayout = actualCellSpacing;
            }
            return cellSpacingToLayout;
        };
        TableCellWidget.prototype.getCellSizeInfo = function (isAutoFit) {
            var isSetWidth = true;
            var layout = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.bodyWidget) && !ej2_base_1.isNullOrUndefined(this.bodyWidget.page)) {
                if (!ej2_base_1.isNullOrUndefined(this.bodyWidget.page.documentHelper)) {
                    layout = this.bodyWidget.page.documentHelper.layout;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(layout) && !ej2_base_1.isNullOrUndefined(layout.currentCell)) {
                isSetWidth = false;
                if (this === layout.currentCell) {
                    isSetWidth = true;
                }
            }
            if (isSetWidth && !this.sizeInfo.hasMinimumWidth) {
                this.sizeInfo.minimumWidth = this.getMinimumPreferredWidth();
            }
            if (isAutoFit) {
                if (isSetWidth && !this.sizeInfo.hasMinimumWordWidth) {
                    var size = this.getMinimumAndMaximumWordWidth(0, 0);
                    this.sizeInfo.minimumWordWidth = size.minimumWordWidth + this.sizeInfo.minimumWidth;
                    this.sizeInfo.maximumWordWidth = size.maximumWordWidth + this.sizeInfo.minimumWidth;
                }
            }
            var sizeInfo = new ColumnSizeInfo();
            sizeInfo.minimumWidth = this.sizeInfo.minimumWidth;
            sizeInfo.minimumWordWidth = this.sizeInfo.minimumWordWidth;
            sizeInfo.maximumWordWidth = this.sizeInfo.maximumWordWidth;
            return sizeInfo;
        };
        TableCellWidget.prototype.getMinimumPreferredWidth = function () {
            var defaultWidth = this.leftMargin + this.rightMargin + this.getLeftBorderWidth() + this.getRightBorderWidth() + this.getCellSpacing();
            return defaultWidth;
        };
        TableCellWidget.prototype.getPreviousCellLeftBorder = function (leftBorder, previousCell) {
            if ((ej2_base_1.isNullOrUndefined(previousCell) || (!ej2_base_1.isNullOrUndefined(leftBorder) && (leftBorder.lineStyle === 'None' && !leftBorder.hasNoneStyle)))) {
                if (!ej2_base_1.isNullOrUndefined(leftBorder) && !(leftBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    leftBorder = this.getLeftBorderToRenderByHierarchy(leftBorder, TableRowWidget.getRowOf(leftBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(leftBorder.ownerBase).tableFormat.borders);
                }
            }
            if (ej2_base_1.isNullOrUndefined(previousCell)) {
                return leftBorder;
            }
            else {
                var prevCellRightBorder = undefined;
                if (!ej2_base_1.isNullOrUndefined(previousCell.cellFormat.borders) && !ej2_base_1.isNullOrUndefined(previousCell.cellFormat.borders.right) && previousCell.cellFormat.borders.right.lineStyle !== 'None') {
                    prevCellRightBorder = previousCell.cellFormat.borders.right;
                }
                if (!ej2_base_1.isNullOrUndefined(prevCellRightBorder) && prevCellRightBorder.lineStyle !== 'None') {
                    return this.getBorderBasedOnPriority(prevCellRightBorder, leftBorder);
                }
                else if (!ej2_base_1.isNullOrUndefined(leftBorder) && !(leftBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    return this.getLeftBorderToRenderByHierarchy(leftBorder, TableRowWidget.getRowOf(leftBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(leftBorder.ownerBase).tableFormat.borders);
                }
            }
            return leftBorder;
        };
        TableCellWidget.prototype.getBorderBasedOnPriority = function (border, adjacentBorder) {
            if (ej2_base_1.isNullOrUndefined(border)) {
                return adjacentBorder;
            }
            else if (ej2_base_1.isNullOrUndefined(adjacentBorder)) {
                return border;
            }
            var borderWeight = border.getBorderWeight();
            var adjacentBorderWeight = adjacentBorder.getBorderWeight();
            if (borderWeight === adjacentBorderWeight) {
                var borderPriority = border.getPrecedence();
                var adjacentBorderPriority = adjacentBorder.getPrecedence();
                if (borderPriority === adjacentBorderPriority) {
                    var borderColInRGB = editor_helper_1.HelperMethods.convertHexToRgb(border.color);
                    var R1 = borderColInRGB.r;
                    var G1 = borderColInRGB.g;
                    var B1 = borderColInRGB.b;
                    var adjacentBorderColInRGB = editor_helper_1.HelperMethods.convertHexToRgb(adjacentBorder.color);
                    var R2 = adjacentBorderColInRGB.r;
                    var G2 = adjacentBorderColInRGB.g;
                    var B2 = adjacentBorderColInRGB.b;
                    var borderBrightness = (R1 + B1 + (2 * G1));
                    var adjacentBorderBrightness = (R2 + B2 + (2 * G2));
                    if (borderBrightness === adjacentBorderBrightness) {
                        borderBrightness = (B1 + (2 * G1));
                        adjacentBorderBrightness = (B2 + (2 * G2));
                        if (borderBrightness === adjacentBorderBrightness) {
                            if (G1 === G2) {
                                return border;
                            }
                            else if (G1 > G2) {
                                return adjacentBorder;
                            }
                            else {
                                return border;
                            }
                        }
                        else if (borderBrightness > adjacentBorderBrightness) {
                            return adjacentBorder;
                        }
                        else {
                            return border;
                        }
                    }
                    else if (borderBrightness > adjacentBorderBrightness) {
                        return adjacentBorder;
                    }
                    else {
                        return border;
                    }
                }
                else if (borderPriority > adjacentBorderPriority) {
                    return border;
                }
                else {
                    return adjacentBorder;
                }
            }
            else if (borderWeight > adjacentBorderWeight) {
                return border;
            }
            else {
                return adjacentBorder;
            }
        };
        TableCellWidget.prototype.getLeftBorderToRenderByHierarchy = function (leftBorder, rowBorders, tableBorders) {
            var ownerCell = TableCellWidget.getCellOf(leftBorder.ownerBase);
            if (!ej2_base_1.isNullOrUndefined(ownerCell)) {
                var isFirstCell = false;
                if (ownerCell.columnIndex === 0 || (ownerCell.cellIndex === 0 && ownerCell.ownerRow.rowFormat.gridBefore > 0)) {
                    isFirstCell = true;
                }
                if ((!ej2_base_1.isNullOrUndefined(leftBorder) && leftBorder.lineStyle === 'None' && !(leftBorder.isBorderDefined && leftBorder.lineWidth !== 0)) || ej2_base_1.isNullOrUndefined(leftBorder)) {
                    if (isFirstCell) {
                        leftBorder = rowBorders.left;
                        if ((!ej2_base_1.isNullOrUndefined(leftBorder) && leftBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(leftBorder)) {
                            leftBorder = tableBorders.left;
                        }
                    }
                    else {
                        leftBorder = rowBorders.vertical;
                        if ((!ej2_base_1.isNullOrUndefined(leftBorder) && leftBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(leftBorder)) {
                            leftBorder = tableBorders.vertical;
                        }
                    }
                }
            }
            return leftBorder;
        };
        TableCellWidget.getCellRightBorder = function (tableCell) {
            var rightBorder = undefined;
            var cellBorder = tableCell.cellFormat.borders;
            var rowBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
            var tableBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
            if (!ej2_base_1.isNullOrUndefined(cellBorder.right)) {
                rightBorder = cellBorder.right;
            }
            if (ej2_base_1.isNullOrUndefined(rightBorder)) {
                rightBorder = tableCell.getRightBorderToRenderByHierarchy(rightBorder, rowBorders, tableBorders);
            }
            if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
                rightBorder = tableCell.getRightBorderToRenderByHierarchy(rightBorder, rowBorders, tableBorders);
            }
            else {
                var nextCell = this.getNextCell(tableCell);
                rightBorder = tableCell.getAdjacentCellRightBorder(rightBorder, nextCell);
            }
            if (ej2_base_1.isNullOrUndefined(rightBorder)) {
                rightBorder = new index_2.WBorder(tableCell.cellFormat.borders);
            }
            return rightBorder;
        };
        TableCellWidget.getNextCell = function (tableCell) {
            var nextCell = undefined;
            var columnSpan = tableCell.cellFormat.columnSpan;
            if (!ej2_base_1.isNullOrUndefined(tableCell.nextWidget)) {
                var cell = tableCell.nextWidget;
                if (tableCell.columnIndex + columnSpan === cell.columnIndex) {
                    nextCell = cell;
                }
            }
            return nextCell;
        };
        TableCellWidget.prototype.getAdjacentCellRightBorder = function (rightBorder, nextCell) {
            if (ej2_base_1.isNullOrUndefined(nextCell) || (!ej2_base_1.isNullOrUndefined(rightBorder) && (rightBorder.lineStyle === 'None' && !rightBorder.hasNoneStyle))) {
                if (!ej2_base_1.isNullOrUndefined(rightBorder) && !(rightBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    rightBorder = this.getRightBorderToRenderByHierarchy(rightBorder, TableRowWidget.getRowOf(rightBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(rightBorder.ownerBase).tableFormat.borders);
                }
            }
            if (ej2_base_1.isNullOrUndefined(nextCell)) {
                return rightBorder;
            }
            else {
                var nextCellLeftBorder = undefined;
                if (!ej2_base_1.isNullOrUndefined(nextCell.cellFormat.borders) && !ej2_base_1.isNullOrUndefined(nextCell.cellFormat.borders.left) && nextCell.cellFormat.borders.left.lineStyle !== 'None') {
                    nextCellLeftBorder = nextCell.cellFormat.borders.left;
                }
                if (!ej2_base_1.isNullOrUndefined(nextCellLeftBorder) && nextCellLeftBorder.lineStyle !== 'None') {
                    return this.getBorderBasedOnPriority(rightBorder, nextCellLeftBorder);
                }
                else if (!ej2_base_1.isNullOrUndefined(rightBorder) && !(rightBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    return this.getRightBorderToRenderByHierarchy(rightBorder, TableRowWidget.getRowOf(rightBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(rightBorder.ownerBase).tableFormat.borders);
                }
            }
            return rightBorder;
        };
        TableCellWidget.prototype.getRightBorderToRenderByHierarchy = function (rightBorder, rowBorders, tableBorders) {
            var ownerCell = TableCellWidget.getCellOf(rightBorder.ownerBase);
            if (!ej2_base_1.isNullOrUndefined(ownerCell)) {
                var isLastCell = false;
                if ((ownerCell.columnIndex + ownerCell.cellFormat.columnSpan) === ownerCell.ownerTable.tableHolder.columns.length
                    || (ownerCell.cellIndex === ownerCell.ownerRow.childWidgets.length - 1)) {
                    isLastCell = true;
                }
                if ((!ej2_base_1.isNullOrUndefined(rightBorder) && rightBorder.lineStyle === 'None' && !(rightBorder.isBorderDefined && rightBorder.lineWidth !== 0)) || ej2_base_1.isNullOrUndefined(rightBorder)) {
                    if (isLastCell) {
                        rightBorder = rowBorders.right;
                        if ((!ej2_base_1.isNullOrUndefined(rightBorder) && rightBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(rightBorder)) {
                            rightBorder = tableBorders.right;
                        }
                    }
                    else {
                        rightBorder = rowBorders.vertical;
                        if ((!ej2_base_1.isNullOrUndefined(rightBorder) && rightBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(rightBorder)) {
                            rightBorder = tableBorders.vertical;
                        }
                    }
                }
            }
            return rightBorder;
        };
        TableCellWidget.getCellTopBorder = function (tableCell) {
            var topBorder = undefined;
            var cellBorder = tableCell.cellFormat.borders;
            var rowBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
            var tableBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
            if (!ej2_base_1.isNullOrUndefined(cellBorder.top)) {
                topBorder = cellBorder.top;
            }
            if (ej2_base_1.isNullOrUndefined(topBorder)) {
                topBorder = tableCell.getTopBorderToRenderByHierarchy(topBorder, rowBorders, tableBorders);
            }
            if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
                topBorder = tableCell.getTopBorderToRenderByHierarchy(topBorder, rowBorders, tableBorders);
            }
            else {
                var prevTopCell = tableCell.getTopAdjacentCell();
                topBorder = tableCell.getPreviousCellTopBorder(topBorder, prevTopCell);
            }
            if (ej2_base_1.isNullOrUndefined(topBorder)) {
                topBorder = new index_2.WBorder(tableCell.cellFormat.borders);
            }
            return topBorder;
        };
        TableCellWidget.prototype.getTopAdjacentCell = function () {
            var previousRow = this.ownerRow.previousWidget;
            var cell;
            if (!ej2_base_1.isNullOrUndefined(previousRow)) {
                cell = previousRow.getVerticalMergeStartCell(this.columnIndex, this.cellFormat.columnSpan);
            }
            return cell;
        };
        TableCellWidget.prototype.getPreviousCellTopBorder = function (topBorder, previousTopCell) {
            if (ej2_base_1.isNullOrUndefined(previousTopCell) || (!ej2_base_1.isNullOrUndefined(topBorder) && (topBorder.lineStyle === 'None' && !topBorder.hasNoneStyle))) {
                if (!ej2_base_1.isNullOrUndefined(topBorder) && !(topBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    topBorder = this.getTopBorderToRenderByHierarchy(topBorder, TableRowWidget.getRowOf(topBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(topBorder.ownerBase).tableFormat.borders);
                }
            }
            if (ej2_base_1.isNullOrUndefined(previousTopCell)) {
                return topBorder;
            }
            else {
                var prevTopCellBottomBorder = undefined;
                if (!ej2_base_1.isNullOrUndefined(previousTopCell.cellFormat.borders) && !ej2_base_1.isNullOrUndefined(previousTopCell.cellFormat.borders.bottom)) {
                    prevTopCellBottomBorder = this.getBottomBorderToRenderByHierarchy(previousTopCell.cellFormat.borders.bottom, previousTopCell.ownerRow.rowFormat.borders, previousTopCell.ownerTable.tableFormat.borders);
                }
                if (!ej2_base_1.isNullOrUndefined(prevTopCellBottomBorder) && prevTopCellBottomBorder.lineStyle !== 'None') {
                    return this.getBorderBasedOnPriority(topBorder, prevTopCellBottomBorder);
                }
                else if (!ej2_base_1.isNullOrUndefined(topBorder) && !(topBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    return this.getTopBorderToRenderByHierarchy(topBorder, TableRowWidget.getRowOf(topBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(topBorder.ownerBase).tableFormat.borders);
                }
            }
            return topBorder;
        };
        TableCellWidget.prototype.getTopBorderToRenderByHierarchy = function (topBorder, rowBorders, tableBorders) {
            var ownerCell = TableCellWidget.getCellOf(topBorder.ownerBase);
            if (!ej2_base_1.isNullOrUndefined(ownerCell)) {
                var isFirstRow = ej2_base_1.isNullOrUndefined(ownerCell.ownerRow.previousWidget);
                if ((!ej2_base_1.isNullOrUndefined(topBorder) && topBorder.lineStyle === 'None' && !(topBorder.isBorderDefined && topBorder.lineWidth !== 0)) || ej2_base_1.isNullOrUndefined(topBorder)) {
                    if (isFirstRow) {
                        topBorder = rowBorders.top;
                        if ((!ej2_base_1.isNullOrUndefined(topBorder) && topBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(topBorder)) {
                            topBorder = tableBorders.top;
                        }
                    }
                    else {
                        topBorder = rowBorders.horizontal;
                        if ((!ej2_base_1.isNullOrUndefined(topBorder) && topBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(topBorder)) {
                            topBorder = tableBorders.horizontal;
                        }
                    }
                }
            }
            return topBorder;
        };
        TableCellWidget.getCellBottomBorder = function (tableCell) {
            var bottomBorder = undefined;
            var cellBorder = tableCell.cellFormat.borders;
            var rowBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
            var tableBorders = !ej2_base_1.isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
            if (!ej2_base_1.isNullOrUndefined(cellBorder.bottom)) {
                bottomBorder = cellBorder.bottom;
            }
            if (ej2_base_1.isNullOrUndefined(bottomBorder)) {
                bottomBorder = tableCell.getBottomBorderToRenderByHierarchy(bottomBorder, rowBorders, tableBorders);
            }
            if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
                bottomBorder = tableCell.getBottomBorderToRenderByHierarchy(bottomBorder, rowBorders, tableBorders);
            }
            else {
                var nextBottomCell = undefined;
                var nextRow = undefined;
                var rowSpan = tableCell.cellFormat.rowSpan;
                if (rowSpan === 1) {
                    nextRow = tableCell.ownerRow.nextWidget;
                }
                else if (rowSpan > 1) {
                    var row = tableCell.containerWidget;
                    do {
                        row = row.nextWidget;
                        if (ej2_base_1.isNullOrUndefined(row)) {
                            break;
                        }
                        else if (row.index === tableCell.rowIndex + rowSpan) {
                            nextRow = row;
                            break;
                        }
                    } while (row);
                }
                if (!ej2_base_1.isNullOrUndefined(nextRow)) {
                    nextBottomCell = nextRow.getCellWidget(tableCell.columnIndex, tableCell.cellFormat.columnSpan);
                }
                bottomBorder = tableCell.getAdjacentCellBottomBorder(bottomBorder, nextBottomCell);
            }
            if (ej2_base_1.isNullOrUndefined(bottomBorder)) {
                bottomBorder = new index_2.WBorder(tableCell.cellFormat.borders);
            }
            return bottomBorder;
        };
        TableCellWidget.prototype.getAdjacentCellBottomBorder = function (bottomBorder, nextBottomCell) {
            if (ej2_base_1.isNullOrUndefined(nextBottomCell) || (!ej2_base_1.isNullOrUndefined(bottomBorder) && (bottomBorder.lineStyle === 'None' && !bottomBorder.hasNoneStyle))) {
                if (!ej2_base_1.isNullOrUndefined(bottomBorder) && !(bottomBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    bottomBorder = this.getBottomBorderToRenderByHierarchy(bottomBorder, TableRowWidget.getRowOf(bottomBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(bottomBorder.ownerBase).tableFormat.borders);
                }
            }
            if (ej2_base_1.isNullOrUndefined(nextBottomCell)) {
                return bottomBorder;
            }
            else {
                var prevBottomCellTopBorder = undefined;
                if (!ej2_base_1.isNullOrUndefined(nextBottomCell.cellFormat.borders) && !ej2_base_1.isNullOrUndefined(nextBottomCell.cellFormat.borders.top) && nextBottomCell.cellFormat.borders.top.lineStyle !== 'None') {
                    prevBottomCellTopBorder = nextBottomCell.cellFormat.borders.top;
                }
                if (!ej2_base_1.isNullOrUndefined(prevBottomCellTopBorder) && prevBottomCellTopBorder.lineStyle !== 'None') {
                    return this.getBorderBasedOnPriority(bottomBorder, prevBottomCellTopBorder);
                }
                else if (!ej2_base_1.isNullOrUndefined(bottomBorder) && !(bottomBorder.ownerBase.ownerBase instanceof index_1.WTableFormat)) {
                    return this.getBottomBorderToRenderByHierarchy(bottomBorder, TableRowWidget.getRowOf(bottomBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(bottomBorder.ownerBase).tableFormat.borders);
                }
            }
            return bottomBorder;
        };
        TableCellWidget.prototype.getBottomBorderToRenderByHierarchy = function (bottomBorder, rowBorders, tableBorders) {
            var ownerCell = TableCellWidget.getCellOf(bottomBorder.ownerBase);
            if (!ej2_base_1.isNullOrUndefined(ownerCell)) {
                var isLastRow = ej2_base_1.isNullOrUndefined(ownerCell.ownerRow.nextWidget);
                if ((!ej2_base_1.isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle === 'None' && !(bottomBorder.isBorderDefined && bottomBorder.lineWidth !== 0)) || ej2_base_1.isNullOrUndefined(bottomBorder)) {
                    if (isLastRow) {
                        bottomBorder = rowBorders.bottom;
                        if ((!ej2_base_1.isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(bottomBorder)) {
                            bottomBorder = tableBorders.bottom;
                        }
                    }
                    else {
                        bottomBorder = rowBorders.horizontal;
                        if ((!ej2_base_1.isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle === 'None') || ej2_base_1.isNullOrUndefined(bottomBorder)) {
                            bottomBorder = tableBorders.horizontal;
                        }
                    }
                }
            }
            return bottomBorder;
        };
        TableCellWidget.getCellOf = function (node) {
            if (node instanceof index_2.WBorders) {
                if (node.ownerBase instanceof index_1.WCellFormat && node.ownerBase.ownerBase instanceof TableCellWidget) {
                    return node.ownerBase.ownerBase;
                }
                else {
                    return undefined;
                }
            }
            return undefined;
        };
        TableCellWidget.prototype.updateWidgetLeft = function (x) {
            this.x = x;
            this.updateChildWidgetLeft(x);
        };
        TableCellWidget.prototype.updateChildWidgetLeft = function (left) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                this.childWidgets[i].x = left;
                if (this.childWidgets[i] instanceof TableWidget) {
                    var tableWidget = this.childWidgets[i];
                    tableWidget.updateChildWidgetLeft(left);
                    if (tableWidget.isBidiTable) {
                        var clientArea = new Rect(tableWidget.x, tableWidget.y, tableWidget.width, tableWidget.height);
                        tableWidget.shiftWidgetsForRtlTable(clientArea, tableWidget);
                    }
                }
            }
        };
        TableCellWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var block = this.childWidgets[i];
                var widthInfo = block.getMinimumAndMaximumWordWidth(minimumWordWidth, maximumWordWidth);
                minimumWordWidth = widthInfo.minimumWordWidth;
                maximumWordWidth = widthInfo.maximumWordWidth;
            }
            return { 'minimumWordWidth': minimumWordWidth, 'maximumWordWidth': maximumWordWidth };
        };
        TableCellWidget.prototype.destroyInternal = function (viewer) {
            if (!ej2_base_1.isNullOrUndefined(this.childWidgets)) {
                for (var i = 0; i < this.childWidgets.length; i++) {
                    var widget = this.childWidgets[i];
                    if (widget instanceof ParagraphWidget) {
                        widget.destroyInternal(viewer);
                    }
                    else {
                        widget.destroyInternal(viewer);
                    }
                    i--;
                }
                this.childWidgets = undefined;
                if (!ej2_base_1.isNullOrUndefined(viewer.documentHelper.selection)) {
                    if (viewer.documentHelper.selection.selectedWidgets.containsKey(this)) {
                        viewer.documentHelper.selection.selectedWidgets.remove(this);
                    }
                }
            }
            this.destroy();
        };
        TableCellWidget.prototype.clone = function () {
            var cell = new TableCellWidget();
            cell.cellFormat.copyFormat(this.cellFormat);
            for (var i = 0; i < this.childWidgets.length; i++) {
                var block = this.childWidgets[i].clone();
                cell.childWidgets.push(block);
                block.containerWidget = cell;
                block.index = i;
            }
            cell.leftBorderWidth = this.leftBorderWidth;
            cell.rightBorderWidth = this.rightBorderWidth;
            cell.isRenderBookmarkEnd = this.isRenderBookmarkEnd;
            cell.isRenderBookmarkStart = this.isRenderBookmarkStart;
            if (this.margin) {
                cell.margin = this.margin.clone();
            }
            cell.columnIndex = this.columnIndex;
            cell.x = this.x;
            cell.y = this.y;
            cell.height = this.height;
            cell.width = this.width;
            if (this.contentControlProperties) {
                cell.contentControlProperties = this.contentControlProperties;
            }
            return cell;
        };
        TableCellWidget.prototype.destroy = function () {
            this.cellFormat = undefined;
            this.rowIndex = undefined;
            this.columnIndex = undefined;
            this.isSplittedCell = undefined;
            _super.prototype.destroy.call(this);
        };
        TableCellWidget.prototype.componentDestroy = function () {
            if (this.cellFormat) {
                this.cellFormat.destroy();
            }
            this.cellFormat = undefined;
            this.contentControlProperties = undefined;
            this.rowIndex = undefined;
            this.columnIndex = undefined;
            this.isRenderBookmarkStart = undefined;
            this.isRenderBookmarkEnd = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return TableCellWidget;
    }(BlockWidget));
    exports.TableCellWidget = TableCellWidget;
    var LineWidget = (function () {
        function LineWidget(paragraphWidget) {
            this.children = [];
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.marginTop = 0;
            this.maxBaseLine = 0;
            this.paragraph = paragraphWidget;
        }
        Object.defineProperty(LineWidget.prototype, "renderedElements", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.layoutedElements)) {
                    return this.layoutedElements;
                }
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineWidget.prototype, "indexInOwner", {
            get: function () {
                if (this.paragraph && this.paragraph.childWidgets) {
                    return this.paragraph.childWidgets.indexOf(this);
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineWidget.prototype, "nextLine", {
            get: function () {
                var paragraph = this.paragraph;
                var lineIndex = this.indexInOwner;
                if (lineIndex <= paragraph.childWidgets.length - 2) {
                    return paragraph.childWidgets[lineIndex + 1];
                }
                else if (paragraph.nextSplitWidget) {
                    var line = paragraph.nextSplitWidget.firstChild;
                    if (line instanceof LineWidget && line.paragraph.equals(this.paragraph)) {
                        return line;
                    }
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineWidget.prototype, "previousLine", {
            get: function () {
                var paragraph = this.paragraph;
                var lineIndex = this.indexInOwner;
                var splitParagraph = paragraph.previousSplitWidget;
                if (lineIndex > 0) {
                    return paragraph.childWidgets[lineIndex - 1];
                }
                else if (splitParagraph instanceof ParagraphWidget) {
                    var line = splitParagraph.lastChild;
                    if (line instanceof LineWidget && line.paragraph.equals(this.paragraph)) {
                        return line;
                    }
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineWidget.prototype, "isEndsWithPageBreak", {
            get: function () {
                if (this.children.length > 0) {
                    var lastElement = this.children[this.children.length - 1];
                    if (lastElement instanceof TextElementBox) {
                        return lastElement.isPageBreak;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineWidget.prototype, "isEndsWithColumnBreak", {
            get: function () {
                if (this.children.length > 0) {
                    var lastElement = this.children[this.children.length - 1];
                    if (lastElement instanceof TextElementBox) {
                        return lastElement.isColumnBreak;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineWidget.prototype, "isEndsWithLineBreak", {
            get: function () {
                if (this.children.length > 0) {
                    var lastElement = this.children[this.children.length - 1];
                    if (lastElement instanceof TextElementBox) {
                        return lastElement.text === '\v';
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        LineWidget.prototype.isFirstLine = function () {
            var index = this.indexInOwner;
            if (index > -1 && (this.paragraph.previousSplitWidget === undefined || (this.paragraph.previousSplitWidget instanceof ParagraphWidget && (this.paragraph.previousSplitWidget.isEndsWithColumnBreak || this.paragraph.previousSplitWidget.isEndsWithPageBreak)))) {
                return index === 0;
            }
            return false;
        };
        LineWidget.prototype.isLastLine = function () {
            var index = this.indexInOwner;
            if (index > -1 && this.paragraph.nextSplitWidget === undefined) {
                return index === this.paragraph.childWidgets.length - 1;
            }
            return false;
        };
        LineWidget.prototype.getOffset = function (inline, index) {
            if (ej2_base_1.isNullOrUndefined(inline)) {
                return index;
            }
            var textIndex = index;
            var line = inline.line;
            for (var i = 0; i < line.children.length; i++) {
                var inlineElement = line.children[i];
                if (inline === inlineElement) {
                    break;
                }
                if (inlineElement instanceof ListTextElementBox) {
                    continue;
                }
                textIndex += inlineElement.length;
            }
            return textIndex;
        };
        LineWidget.prototype.getEndOffset = function () {
            var startOffset = 0;
            var count = 0;
            for (var i = 0; i < this.children.length; i++) {
                var inlineElement = this.children[i];
                if (inlineElement.length === 0) {
                    continue;
                }
                if (inlineElement instanceof ListTextElementBox) {
                    continue;
                }
                if (inlineElement instanceof TextElementBox || inlineElement instanceof CommentCharacterElementBox
                    || inlineElement instanceof EditRangeStartElementBox || inlineElement instanceof ImageElementBox
                    || inlineElement instanceof EditRangeEndElementBox || inlineElement instanceof BookmarkElementBox
                    || inlineElement instanceof ContentControl || (inlineElement instanceof FieldElementBox
                    && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inlineElement))) {
                    startOffset = count + inlineElement.length;
                }
                count += inlineElement.length;
            }
            return startOffset;
        };
        LineWidget.prototype.getInline = function (offset, indexInInline, bidi, isInsert, isSpellCheck) {
            bidi = ej2_base_1.isNullOrUndefined(bidi) ? this.paragraph.bidi : bidi;
            var inlineElement = undefined;
            var count = 0;
            var isStarted = false;
            if (this.children.length === 0) {
                if (this.previousLine) {
                    var elementBox = this.previousLine.children[this.previousLine.children.length - 1];
                    if (elementBox instanceof TextElementBox && elementBox.text === '\v') {
                        inlineElement = this.previousLine.children[this.previousLine.children.length - 1];
                        indexInInline = 1;
                        return { 'element': inlineElement, 'index': indexInInline };
                    }
                }
            }
            for (var i = 0; i < this.children.length; i++) {
                inlineElement = this.children[i];
                if (inlineElement instanceof ListTextElementBox) {
                    continue;
                }
                if (!isStarted && (inlineElement instanceof TextElementBox || inlineElement instanceof ImageElementBox
                    || inlineElement instanceof ShapeElementBox || inlineElement instanceof ContentControl
                    || inlineElement instanceof BookmarkElementBox || inlineElement instanceof EditRangeEndElementBox
                    || inlineElement instanceof EditRangeStartElementBox || inlineElement instanceof CommentCharacterElementBox
                    || inlineElement instanceof FieldElementBox
                        && editor_helper_1.HelperMethods.isLinkedFieldCharacter(inlineElement))) {
                    isStarted = true;
                }
                if (isStarted && offset <= count + inlineElement.length) {
                    if (inlineElement instanceof TextElementBox && (inlineElement.text === ' ' && inlineElement.revisions.length === 0 && isInsert && !isSpellCheck)) {
                        var currentElement = this.getNextTextElement(this, i + 1);
                        inlineElement = !ej2_base_1.isNullOrUndefined(currentElement) ? currentElement : inlineElement;
                        indexInInline = ej2_base_1.isNullOrUndefined(currentElement) ? (offset - count) : 0;
                        return { 'element': inlineElement, 'index': indexInInline };
                    }
                    else if (offset === count + inlineElement.length && this.children[i + 1] instanceof FootnoteElementBox) {
                        return { 'element': this.children[i + 1], 'index': indexInInline };
                    }
                    else {
                        indexInInline = (offset - count);
                    }
                    return { 'element': inlineElement, 'index': indexInInline };
                }
                count += inlineElement.length;
            }
            if (offset > count) {
                indexInInline = ej2_base_1.isNullOrUndefined(inlineElement) ? offset : inlineElement.length;
            }
            return { 'element': inlineElement, 'index': indexInInline };
        };
        LineWidget.prototype.getNextTextElement = function (line, index) {
            if (index < line.children.length - 1 && line.children[index]) {
                return line.children[index];
            }
            return null;
        };
        LineWidget.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
            var node = this;
            hierarchicalIndex = node.paragraph.childWidgets.indexOf(node) + ';' + hierarchicalIndex;
            if (node.paragraph instanceof BlockWidget) {
                return node.paragraph.getHierarchicalIndex(hierarchicalIndex);
            }
            return hierarchicalIndex;
        };
        LineWidget.prototype.clone = function () {
            var line = new LineWidget(undefined);
            for (var j = 0; j < this.children.length; j++) {
                var element = this.children[j];
                var clone = element.clone();
                line.children.push(clone);
                clone.line = line;
            }
            line.width = this.width;
            line.height = this.height;
            if (!ej2_base_1.isNullOrUndefined(this.margin)) {
                line.margin = this.margin.clone();
            }
            return line;
        };
        LineWidget.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.children)) {
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].destroy();
                }
                this.children = [];
            }
            this.children = undefined;
            if (this.paragraph) {
                this.paragraph.removeChild(this.indexInOwner);
            }
            this.paragraph = undefined;
            this.x = undefined;
            this.y = undefined;
            this.width = undefined;
        };
        LineWidget.prototype.componentDestroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.children)) {
                for (var i = 0; i < this.children.length; i++) {
                    var elementBox = this.children[i];
                    elementBox.componentDestroy();
                }
                this.children = [];
            }
            this.children = undefined;
            this.paragraph = undefined;
            this.layoutedElements = [];
            this.layoutedElements = undefined;
            this.x = undefined;
            this.y = undefined;
            this.width = undefined;
            this.height = undefined;
        };
        return LineWidget;
    }());
    exports.LineWidget = LineWidget;
    var ElementBox = (function () {
        function ElementBox() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.margin = new Margin(0, 0, 0, 0);
            this.padding = new Margin(0, 0, 0, 0);
            this.characterFormat = undefined;
            this.isRightToLeft = false;
            this.canTrigger = false;
            this.ischangeDetected = false;
            this.isVisible = false;
            this.isSpellChecked = false;
            this.revisions = [];
            this.canTrack = false;
            this.removedIds = [];
            this.isMarkedForRevision = false;
            this.characterRange = undefined;
            this.characterFormat = new index_2.WCharacterFormat(this);
            this.margin = new Margin(0, 0, 0, 0);
        }
        Object.defineProperty(ElementBox.prototype, "isPageBreak", {
            get: function () {
                if (this instanceof TextElementBox) {
                    return this.text === '\f';
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "isColumnBreak", {
            get: function () {
                if (this instanceof TextElementBox) {
                    return this.text === String.fromCharCode(14);
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "isValidNodeForTracking", {
            get: function () {
                if (this instanceof BookmarkElementBox || this instanceof CommentCharacterElementBox || this instanceof EditRangeStartElementBox || this instanceof EditRangeEndElementBox || this instanceof ContentControl) {
                    return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "isCheckBoxElement", {
            get: function () {
                var element = this;
                if (element instanceof TextElementBox && !ej2_base_1.isNullOrUndefined(element.text)) {
                    return element.text === String.fromCharCode(9745) || element.text === String.fromCharCode(9744);
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ElementBox.prototype.linkFieldCharacter = function (documentHelper) {
            if (!(this instanceof FieldElementBox)) {
                return;
            }
            if (this.fieldType === 0) {
                var fieldBegin = this;
                if (ej2_base_1.isNullOrUndefined(fieldBegin.fieldEnd)) {
                    this.linkFieldTraversingForward(this.line, fieldBegin, fieldBegin);
                    if (documentHelper.fields.indexOf(fieldBegin) === -1) {
                        documentHelper.fields.push(fieldBegin);
                    }
                    if (!ej2_base_1.isNullOrUndefined(fieldBegin.formFieldData) &&
                        documentHelper.formFields.indexOf(fieldBegin) === -1 && !documentHelper.layout.isInsertFormField) {
                        documentHelper.formFields.push(fieldBegin);
                    }
                }
            }
            else if (this.fieldType === 2) {
                var fieldSeparator = this;
                if (ej2_base_1.isNullOrUndefined(fieldSeparator.fieldBegin)) {
                    this.linkFieldTraversingBackwardSeparator(this.line, fieldSeparator, fieldSeparator);
                }
                if (!ej2_base_1.isNullOrUndefined(fieldSeparator.fieldBegin)) {
                    fieldSeparator.fieldBegin.fieldSeparator = fieldSeparator;
                    var isFieldEnd = this.linkFieldTraversingForward(this.line, fieldSeparator.fieldBegin, fieldSeparator);
                    if (ej2_base_1.isNullOrUndefined(fieldSeparator.fieldEnd) && isFieldEnd) {
                        fieldSeparator.fieldEnd = fieldSeparator.fieldBegin.fieldEnd;
                    }
                    if (fieldSeparator.fieldEnd) {
                        fieldSeparator.fieldEnd.fieldSeparator = fieldSeparator;
                    }
                }
            }
            else {
                var fieldEnd = this;
                if (ej2_base_1.isNullOrUndefined(fieldEnd.fieldBegin)) {
                    this.linkFieldTraversingBackward(this.line, fieldEnd, fieldEnd);
                }
            }
        };
        ElementBox.prototype.linkFieldTraversingBackward = function (line, fieldEnd, previousNode) {
            var k = line.children.length - 1;
            if (line.children.indexOf(previousNode) > -1) {
                k = line.children.indexOf(previousNode) - 1;
            }
            for (var j = k; j >= 0; j--) {
                var childNode = line.children[j];
                if (childNode instanceof FieldElementBox) {
                    if (childNode.fieldType === 0) {
                        if (ej2_base_1.isNullOrUndefined(childNode.fieldEnd)) {
                            fieldEnd.fieldBegin = childNode;
                            if (ej2_base_1.isNullOrUndefined(childNode.fieldEnd)) {
                                childNode.fieldEnd = fieldEnd;
                            }
                            if (fieldEnd.fieldSeparator && ej2_base_1.isNullOrUndefined(fieldEnd.fieldSeparator.fieldBegin)) {
                                fieldEnd.fieldSeparator.fieldBegin = childNode;
                                if (ej2_base_1.isNullOrUndefined(childNode.fieldSeparator)) {
                                    childNode.fieldSeparator = fieldEnd.fieldSeparator;
                                }
                            }
                            return !ej2_base_1.isNullOrUndefined(fieldEnd.fieldBegin);
                        }
                    }
                    else if (childNode.fieldType === 2 && ej2_base_1.isNullOrUndefined(childNode.fieldEnd)) {
                        fieldEnd.fieldSeparator = childNode;
                        childNode.fieldEnd = fieldEnd;
                        if (!ej2_base_1.isNullOrUndefined(childNode.fieldBegin)) {
                            fieldEnd.fieldBegin = childNode.fieldBegin;
                        }
                    }
                }
            }
            if (line.previousLine) {
                this.linkFieldTraversingBackward(line.previousLine, fieldEnd, this);
            }
            else if (line.paragraph.previousRenderedWidget instanceof ParagraphWidget
                && line.paragraph.previousRenderedWidget.childWidgets.length > 0) {
                var prevParagraph = line.paragraph.previousRenderedWidget;
                this.linkFieldTraversingBackward(prevParagraph.childWidgets[prevParagraph.childWidgets.length - 1], fieldEnd, this);
            }
            return true;
        };
        ElementBox.prototype.linkFieldTraversingForward = function (line, fieldBegin, previousNode) {
            var i = 0;
            if (line.children.indexOf(previousNode) > -1) {
                i = line.children.indexOf(previousNode) + 1;
            }
            for (var j = i; j < line.children.length; j++) {
                var node = line.children[j];
                if (node instanceof FieldElementBox) {
                    if (node.fieldType === 1) {
                        if (ej2_base_1.isNullOrUndefined(node.fieldBegin)) {
                            fieldBegin.fieldEnd = node;
                        }
                        if (fieldBegin.fieldEnd && ej2_base_1.isNullOrUndefined(fieldBegin.fieldEnd.fieldBegin)) {
                            fieldBegin.fieldEnd.fieldBegin = fieldBegin;
                        }
                        return true;
                    }
                    else if (ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator)) {
                        if (node.fieldType === 2 && ej2_base_1.isNullOrUndefined(node.fieldBegin)) {
                            fieldBegin.fieldSeparator = node;
                            if (fieldBegin.fieldSeparator && ej2_base_1.isNullOrUndefined(fieldBegin.fieldSeparator.fieldBegin)) {
                                fieldBegin.fieldSeparator.fieldBegin = fieldBegin;
                            }
                            if (!ej2_base_1.isNullOrUndefined(node.fieldEnd)) {
                                fieldBegin.fieldEnd = node.fieldEnd;
                                fieldBegin.fieldSeparator.fieldEnd = fieldBegin.fieldEnd;
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
            if (line.nextLine) {
                this.linkFieldTraversingForward(line.nextLine, fieldBegin, this);
            }
            else if (line.paragraph.nextRenderedWidget instanceof ParagraphWidget
                && line.paragraph.nextRenderedWidget.childWidgets.length > 0) {
                this.linkFieldTraversingForward(line.paragraph.nextRenderedWidget.childWidgets[0], fieldBegin, this);
            }
            else if (line.paragraph.nextRenderedWidget instanceof TableWidget) {
                var tableWidget = line.paragraph.nextRenderedWidget;
                tableWidget = tableWidget.getSplitWidgets().pop();
                if (!ej2_base_1.isNullOrUndefined(tableWidget.nextRenderedWidget) && tableWidget.nextRenderedWidget instanceof ParagraphWidget && tableWidget.nextRenderedWidget.childWidgets.length > 0) {
                    this.linkFieldTraversingForward(tableWidget.nextRenderedWidget.childWidgets[0], fieldBegin, this);
                }
            }
            return true;
        };
        ElementBox.prototype.linkFieldTraversingBackwardSeparator = function (line, fieldSeparator, previousNode) {
            var index = line.children.length - 1;
            if (line.children.indexOf(previousNode) > -1) {
                index = line.children.indexOf(previousNode) - 1;
            }
            for (var i = index; i >= 0; i--) {
                var childElement = line.children[i];
                if (childElement instanceof FieldElementBox) {
                    if (childElement instanceof FieldElementBox && childElement.fieldType === 0) {
                        if (ej2_base_1.isNullOrUndefined(childElement.fieldSeparator)) {
                            fieldSeparator.fieldBegin = childElement;
                        }
                        return !ej2_base_1.isNullOrUndefined(fieldSeparator.fieldBegin);
                    }
                }
            }
            if (line.previousLine) {
                this.linkFieldTraversingBackwardSeparator(line.previousLine, fieldSeparator, this);
            }
            else if (line.paragraph.previousRenderedWidget instanceof ParagraphWidget
                && line.paragraph.previousRenderedWidget.childWidgets.length > 0) {
                line = line.paragraph.previousRenderedWidget.childWidgets[line.paragraph.previousRenderedWidget.childWidgets.length - 1];
                this.linkFieldTraversingBackwardSeparator(line, fieldSeparator, this);
            }
            else {
                return true;
            }
            return true;
        };
        Object.defineProperty(ElementBox.prototype, "length", {
            get: function () {
                return this.getLength();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "indexInOwner", {
            get: function () {
                return this.line instanceof LineWidget && this.line.children ? this.line.children.indexOf(this) : -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "previousElement", {
            get: function () {
                var index = this.indexInOwner;
                if (index > 0 && index < this.line.children.length) {
                    return this.line.children[index - 1];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "nextElement", {
            get: function () {
                var index = this.indexInOwner;
                if (index > -1 && index < this.line.children.length - 1) {
                    return this.line.children[index + 1];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "nextNode", {
            get: function () {
                var index = this.line.children.indexOf(this);
                var lineIndex = this.line.paragraph.childWidgets.indexOf(this.line);
                if (index < this.line.children.length - 1) {
                    return this.line.children[index + 1];
                }
                else if (lineIndex < this.line.paragraph.childWidgets.length - 1) {
                    return this.line.paragraph.childWidgets[lineIndex + 1].children[0];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "nextValidNodeForTracking", {
            get: function () {
                var elementBox = this;
                while (!ej2_base_1.isNullOrUndefined(elementBox) && (elementBox instanceof BookmarkElementBox || elementBox instanceof CommentCharacterElementBox || elementBox instanceof EditRangeStartElementBox || elementBox instanceof EditRangeEndElementBox || elementBox instanceof ContentControl)) {
                    elementBox = elementBox.nextNode;
                }
                return elementBox;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "previousValidNodeForTracking", {
            get: function () {
                var elementBox = this;
                while (!ej2_base_1.isNullOrUndefined(elementBox) && (elementBox instanceof BookmarkElementBox || elementBox instanceof CommentCharacterElementBox || elementBox instanceof EditRangeStartElementBox || elementBox instanceof EditRangeEndElementBox || elementBox instanceof ContentControl)) {
                    elementBox = elementBox.previousNode;
                }
                return elementBox;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "previousNode", {
            get: function () {
                var index = this.line.children.indexOf(this);
                var lineIndex = this.line.paragraph.childWidgets.indexOf(this.line);
                if (index > 0) {
                    return this.line.children[index - 1];
                }
                else if (lineIndex > 0) {
                    var lineWidget = this.line.paragraph.childWidgets[lineIndex - 1];
                    return lineWidget.children[lineWidget.children.length - 1];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBox.prototype, "paragraph", {
            get: function () {
                if (this.line) {
                    return this.line.paragraph;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        ElementBox.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.line) && this.line.children && this.line.children.indexOf(this) > -1) {
                var index = this.line.children.indexOf(this);
                this.line.children.splice(index, 1);
            }
            this.line = undefined;
            if (this.characterFormat) {
                this.characterFormat.destroy();
            }
            this.characterFormat = undefined;
            if (this.margin) {
                this.margin.destroy();
            }
            this.margin = undefined;
            this.x = undefined;
            this.y = undefined;
            this.width = undefined;
            this.height = undefined;
        };
        ElementBox.prototype.componentDestroy = function () {
            if (this.characterFormat) {
                this.characterFormat.destroy();
            }
            this.characterFormat = undefined;
            if (this.margin) {
                this.margin.destroy();
            }
            this.margin = undefined;
            if (this.padding) {
                this.padding.destroy();
            }
            this.padding = undefined;
            this.contentControlProperties = undefined;
            this.line = undefined;
            this.x = undefined;
            this.y = undefined;
            this.width = undefined;
            this.height = undefined;
        };
        return ElementBox;
    }());
    ElementBox.objectCharacter = String.fromCharCode(65532);
    exports.ElementBox = ElementBox;
    var FieldElementBox = (function (_super) {
        __extends(FieldElementBox, _super);
        function FieldElementBox(type) {
            var _this = _super.call(this) || this;
            _this.fieldType = 0;
            _this.fieldCodeType = '';
            _this.hasFieldEnd = false;
            _this.fieldBeginInternal = undefined;
            _this.fieldSeparatorInternal = undefined;
            _this.fieldEndInternal = undefined;
            _this.fieldType = type;
            return _this;
        }
        Object.defineProperty(FieldElementBox.prototype, "fieldBegin", {
            get: function () {
                return this.fieldBeginInternal;
            },
            set: function (field) {
                this.fieldBeginInternal = field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FieldElementBox.prototype, "fieldSeparator", {
            get: function () {
                return this.fieldSeparatorInternal;
            },
            set: function (field) {
                this.fieldSeparatorInternal = field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FieldElementBox.prototype, "fieldEnd", {
            get: function () {
                return this.fieldEndInternal;
            },
            set: function (field) {
                this.fieldEndInternal = field;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FieldElementBox.prototype, "resultText", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.formFieldData) && this.fieldType === 0 &&
                    !ej2_base_1.isNullOrUndefined(this.fieldSeparator) && !ej2_base_1.isNullOrUndefined(this.fieldEnd)) {
                    var textElement = this.fieldSeparator.nextElement;
                    var text = '';
                    do {
                        if (textElement instanceof TextElementBox) {
                            text += textElement.text;
                        }
                        textElement = textElement.nextNode;
                        if (textElement === this.fieldEnd) {
                            break;
                        }
                    } while (textElement);
                    return text;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        FieldElementBox.prototype.getLength = function () {
            return 1;
        };
        FieldElementBox.prototype.clone = function () {
            var field = new FieldElementBox(this.fieldType);
            if (this.fieldType === 0 && !ej2_base_1.isNullOrUndefined(this.formFieldData)) {
                field.formFieldData = this.formFieldData.clone();
            }
            field.characterFormat.copyFormat(this.characterFormat);
            if (this.margin) {
                field.margin = this.margin.clone();
            }
            field.width = this.width;
            field.height = this.height;
            if (!ej2_base_1.isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
                if (this.revisions.length > 0) {
                    for (var i = 0; i < this.revisions.length; i++) {
                        var revision = this.revisions[i];
                        field.revisions.push(revision.clone());
                    }
                }
            }
            else {
                if (this.revisions.length > 0) {
                    field.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
                }
                else {
                    field.removedIds = this.removedIds.slice();
                }
            }
            field.fieldCodeType = this.fieldCodeType;
            return field;
        };
        FieldElementBox.prototype.destroy = function () {
            this.fieldType = undefined;
            this.hasFieldEnd = undefined;
            this.fieldBeginInternal = undefined;
            this.fieldEndInternal = undefined;
            this.fieldSeparatorInternal = undefined;
            _super.prototype.destroy.call(this);
        };
        FieldElementBox.prototype.componentDestroy = function () {
            if (this.formFieldData) {
                this.formFieldData.destroy();
            }
            this.formFieldData = undefined;
            this.fieldCodeType = undefined;
            this.fieldBeginInternal = undefined;
            this.fieldEndInternal = undefined;
            this.fieldSeparatorInternal = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return FieldElementBox;
    }(ElementBox));
    exports.FieldElementBox = FieldElementBox;
    var FormField = (function () {
        function FormField() {
            this.name = '';
            this.enabled = true;
            this.helpText = '';
            this.statusText = '';
        }
        FormField.prototype.destroy = function () {
            this.name = undefined;
            this.helpText = undefined;
            this.statusText = undefined;
        };
        return FormField;
    }());
    exports.FormField = FormField;
    var TextFormField = (function (_super) {
        __extends(TextFormField, _super);
        function TextFormField() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 'Text';
            _this.maxLength = 0;
            _this.defaultValue = '';
            _this.format = '';
            return _this;
        }
        TextFormField.prototype.clone = function () {
            var textForm = new TextFormField();
            textForm.type = this.type;
            textForm.name = this.name;
            textForm.enabled = this.enabled;
            textForm.helpText = this.helpText;
            textForm.statusText = this.statusText;
            textForm.maxLength = this.maxLength;
            textForm.defaultValue = this.defaultValue;
            textForm.format = this.format;
            return textForm;
        };
        TextFormField.prototype.getFormFieldInfo = function () {
            var textFormField = {
                defaultValue: this.defaultValue,
                enabled: this.enabled,
                format: this.format,
                helpText: this.helpText,
                maxLength: this.maxLength,
                type: this.type,
                name: this.name
            };
            return textFormField;
        };
        TextFormField.prototype.copyFieldInfo = function (info) {
            if (!ej2_base_1.isNullOrUndefined(info.defaultValue)) {
                this.defaultValue = info.defaultValue;
            }
            if (!ej2_base_1.isNullOrUndefined(info.enabled)) {
                this.enabled = info.enabled;
            }
            if (!ej2_base_1.isNullOrUndefined(info.format)) {
                this.format = info.format;
            }
            if (!ej2_base_1.isNullOrUndefined(info.helpText)) {
                this.helpText = info.helpText;
            }
            if (!ej2_base_1.isNullOrUndefined(info.maxLength)) {
                this.maxLength = info.maxLength;
            }
            if (!ej2_base_1.isNullOrUndefined(info.type)) {
                this.type = info.type;
            }
        };
        TextFormField.prototype.destroy = function () {
            this.format = undefined;
            this.defaultValue = undefined;
            _super.prototype.destroy.call(this);
        };
        return TextFormField;
    }(FormField));
    exports.TextFormField = TextFormField;
    var CheckBoxFormField = (function (_super) {
        __extends(CheckBoxFormField, _super);
        function CheckBoxFormField() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sizeType = 'Auto';
            _this.size = 11;
            _this.defaultValue = false;
            _this.checked = false;
            return _this;
        }
        CheckBoxFormField.prototype.clone = function () {
            var checkBoxForm = new CheckBoxFormField();
            checkBoxForm.name = this.name;
            checkBoxForm.enabled = this.enabled;
            checkBoxForm.helpText = this.helpText;
            checkBoxForm.statusText = this.statusText;
            checkBoxForm.sizeType = this.sizeType;
            checkBoxForm.size = this.size;
            checkBoxForm.defaultValue = this.defaultValue;
            checkBoxForm.checked = this.checked;
            return checkBoxForm;
        };
        CheckBoxFormField.prototype.getFormFieldInfo = function () {
            var checkBoxFormField = {
                defaultValue: this.defaultValue,
                enabled: this.enabled,
                helpText: this.helpText,
                size: this.size,
                sizeType: this.sizeType,
                name: this.name
            };
            return checkBoxFormField;
        };
        CheckBoxFormField.prototype.copyFieldInfo = function (info) {
            if (!ej2_base_1.isNullOrUndefined(info.defaultValue)) {
                this.defaultValue = info.defaultValue;
                this.checked = info.defaultValue;
            }
            if (!ej2_base_1.isNullOrUndefined(info.enabled)) {
                this.enabled = info.enabled;
            }
            if (!ej2_base_1.isNullOrUndefined(info.size)) {
                this.size = info.size;
            }
            if (!ej2_base_1.isNullOrUndefined(info.helpText)) {
                this.helpText = info.helpText;
            }
            if (!ej2_base_1.isNullOrUndefined(info.sizeType)) {
                this.sizeType = info.sizeType;
            }
        };
        CheckBoxFormField.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return CheckBoxFormField;
    }(FormField));
    exports.CheckBoxFormField = CheckBoxFormField;
    var DropDownFormField = (function (_super) {
        __extends(DropDownFormField, _super);
        function DropDownFormField() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dropdownItems = [];
            _this.selectedIndex = 0;
            return _this;
        }
        DropDownFormField.prototype.clone = function () {
            var dropDown = new DropDownFormField();
            dropDown.name = this.name;
            dropDown.enabled = this.enabled;
            dropDown.helpText = this.helpText;
            dropDown.statusText = this.statusText;
            dropDown.dropdownItems = this.dropdownItems.slice();
            dropDown.selectedIndex = this.selectedIndex;
            return dropDown;
        };
        DropDownFormField.prototype.getFormFieldInfo = function () {
            var dropDownFormField = {
                dropdownItems: this.dropdownItems.slice(),
                enabled: this.enabled,
                helpText: this.helpText,
                name: this.name
            };
            return dropDownFormField;
        };
        DropDownFormField.prototype.copyFieldInfo = function (info) {
            if (!ej2_base_1.isNullOrUndefined(info.dropdownItems)) {
                this.dropdownItems = info.dropdownItems;
            }
            if (!ej2_base_1.isNullOrUndefined(info.enabled)) {
                this.enabled = info.enabled;
            }
            if (!ej2_base_1.isNullOrUndefined(info.helpText)) {
                this.helpText = info.helpText;
            }
        };
        DropDownFormField.prototype.destroy = function () {
            this.dropdownItems = [];
            this.dropdownItems = undefined;
            _super.prototype.destroy.call(this);
        };
        return DropDownFormField;
    }(FormField));
    exports.DropDownFormField = DropDownFormField;
    var TextElementBox = (function (_super) {
        __extends(TextElementBox, _super);
        function TextElementBox() {
            var _this = _super.call(this) || this;
            _this.baselineOffset = 0;
            _this.text = '';
            _this.trimEndWidth = 0;
            _this.ignoreOnceItems = [];
            _this.istextCombined = false;
            _this.scriptType = types_1.FontScriptType.English;
            _this.renderedFontFamily = undefined;
            _this.errorCollection = [];
            return _this;
        }
        TextElementBox.prototype.getLength = function () {
            return this.text ? this.text.length : 0;
        };
        TextElementBox.prototype.clone = function () {
            var textEle = new TextElementBox();
            textEle.characterFormat.copyFormat(this.characterFormat);
            textEle.text = this.text;
            if (this.margin) {
                textEle.margin = this.margin.clone();
            }
            textEle.baselineOffset = this.baselineOffset;
            if (!ej2_base_1.isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
                if (this.revisions.length > 0) {
                    for (var i = 0; i < this.revisions.length; i++) {
                        var revision = this.revisions[i];
                        textEle.revisions.push(revision.clone());
                    }
                }
            }
            else {
                if (this.revisions.length > 0) {
                    textEle.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
                }
                else {
                    textEle.removedIds = this.removedIds.slice();
                }
            }
            textEle.width = this.width;
            textEle.height = this.height;
            if (this.contentControlProperties) {
                textEle.contentControlProperties = this.contentControlProperties;
            }
            return textEle;
        };
        TextElementBox.prototype.destroy = function () {
            this.text = undefined;
            _super.prototype.destroy.call(this);
        };
        TextElementBox.prototype.componentDestroy = function () {
            this.text = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return TextElementBox;
    }(ElementBox));
    exports.TextElementBox = TextElementBox;
    var Footnote = (function () {
        function Footnote() {
            this.separator = [];
            this.continuationNotice = [];
            this.continuationSeparator = [];
        }
        Footnote.prototype.clear = function () {
            if (this.separator) {
                for (var i = 0; i < this.separator.length; i++) {
                    var bodyWidget = this.separator[i];
                    bodyWidget.destroy();
                }
                this.separator = [];
            }
            if (this.continuationSeparator) {
                for (var i = 0; i < this.continuationSeparator.length; i++) {
                    var bodyWidget = this.continuationSeparator[i];
                    bodyWidget.destroy();
                }
                this.continuationSeparator = [];
            }
            if (this.continuationNotice) {
                for (var i = 0; i < this.continuationNotice.length; i++) {
                    var bodyWidget = this.continuationNotice[i];
                    bodyWidget.destroy();
                }
                this.continuationNotice = [];
            }
        };
        Footnote.prototype.destroy = function () {
            this.separator = [];
            this.continuationSeparator = [];
            this.continuationNotice = [];
        };
        Footnote.prototype.componentDestroy = function () {
            if (this.separator) {
                for (var i = 0; i < this.separator.length; i++) {
                    var bodyWidget = this.separator[i];
                    bodyWidget.componentDestroy();
                }
                this.separator = [];
            }
            this.separator = undefined;
            if (this.continuationSeparator) {
                for (var i = 0; i < this.continuationSeparator.length; i++) {
                    var bodyWidget = this.continuationSeparator[i];
                    bodyWidget.componentDestroy();
                }
                this.continuationSeparator = [];
            }
            this.continuationSeparator = undefined;
            if (this.continuationNotice) {
                for (var i = 0; i < this.continuationNotice.length; i++) {
                    var bodyWidget = this.continuationNotice[i];
                    bodyWidget.componentDestroy();
                }
                this.continuationNotice = [];
            }
            this.continuationNotice = undefined;
        };
        return Footnote;
    }());
    exports.Footnote = Footnote;
    var FootnoteElementBox = (function (_super) {
        __extends(FootnoteElementBox, _super);
        function FootnoteElementBox() {
            var _this = _super.call(this) || this;
            _this.isLayout = false;
            _this.bodyWidget = new BodyWidget();
            _this.bodyWidget.footNoteReference = _this;
            return _this;
        }
        FootnoteElementBox.prototype.clone = function () {
            var span = new FootnoteElementBox();
            span.text = this.text;
            span.characterFormat.copyFormat(this.characterFormat);
            span.height = this.height;
            span.footnoteType = this.footnoteType;
            span.width = this.width;
            span.symbolCode = this.symbolCode;
            span.bodyWidget.childWidgets = this.bodyWidget.childWidgets;
            span.bodyWidget.page = this.bodyWidget.page;
            if (this.margin) {
                span.margin = this.margin.clone();
            }
            return span;
        };
        FootnoteElementBox.prototype.getLength = function () {
            return 1;
        };
        FootnoteElementBox.prototype.destroy = function () {
            this.symbolCode = '';
            this.symbolFontName = '';
            this.customMarker = '';
        };
        FootnoteElementBox.prototype.componentDestroy = function () {
            if (this.characterFormat) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            this.symbolCode = '';
            this.symbolFontName = '';
            this.customMarker = '';
            if (this.bodyWidget) {
                this.bodyWidget.componentDestroy();
            }
            this.bodyWidget = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return FootnoteElementBox;
    }(TextElementBox));
    exports.FootnoteElementBox = FootnoteElementBox;
    var ErrorTextElementBox = (function (_super) {
        __extends(ErrorTextElementBox, _super);
        function ErrorTextElementBox() {
            var _this = _super.call(this) || this;
            _this.startIn = undefined;
            _this.endIn = undefined;
            return _this;
        }
        Object.defineProperty(ErrorTextElementBox.prototype, "start", {
            get: function () {
                return this.startIn;
            },
            set: function (value) {
                this.startIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ErrorTextElementBox.prototype, "end", {
            get: function () {
                return this.endIn;
            },
            set: function (value) {
                this.endIn = value;
            },
            enumerable: true,
            configurable: true
        });
        ErrorTextElementBox.prototype.destroy = function () {
            this.start = undefined;
            this.end = undefined;
        };
        ErrorTextElementBox.prototype.componentDestroy = function () {
            if (this.startIn) {
                this.startIn.destroy();
            }
            this.startIn = undefined;
            if (this.endIn) {
                this.endIn.destroy();
            }
            this.endIn = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return ErrorTextElementBox;
    }(TextElementBox));
    exports.ErrorTextElementBox = ErrorTextElementBox;
    var FieldTextElementBox = (function (_super) {
        __extends(FieldTextElementBox, _super);
        function FieldTextElementBox() {
            var _this = _super.call(this) || this;
            _this.fieldText = '';
            return _this;
        }
        Object.defineProperty(FieldTextElementBox.prototype, "text", {
            get: function () {
                return this.fieldText;
            },
            set: function (value) {
                this.fieldText = value;
            },
            enumerable: true,
            configurable: true
        });
        FieldTextElementBox.prototype.clone = function () {
            var fieldSpan = new FieldTextElementBox();
            fieldSpan.characterFormat.copyFormat(this.characterFormat);
            fieldSpan.fieldBegin = this.fieldBegin;
            fieldSpan.text = this.text;
            if (this.margin) {
                fieldSpan.margin = this.margin.clone();
            }
            if (!ej2_base_1.isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
                if (this.revisions.length > 0) {
                    for (var i = 0; i < this.revisions.length; i++) {
                        var revisionChanges = this.revisions[i];
                        fieldSpan.revisions.push(revisionChanges.clone());
                    }
                }
            }
            else {
                if (this.revisions.length > 0) {
                    fieldSpan.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
                }
                else {
                    fieldSpan.removedIds = this.removedIds.slice();
                }
            }
            fieldSpan.width = this.width;
            fieldSpan.height = this.height;
            return fieldSpan;
        };
        FieldTextElementBox.prototype.componentDestroy = function () {
            this.fieldText = undefined;
            this.fieldBegin = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return FieldTextElementBox;
    }(TextElementBox));
    exports.FieldTextElementBox = FieldTextElementBox;
    var TabElementBox = (function (_super) {
        __extends(TabElementBox, _super);
        function TabElementBox() {
            var _this = _super.call(this) || this;
            _this.tabText = '';
            _this.tabLeader = 'None';
            return _this;
        }
        TabElementBox.prototype.destroy = function () {
            this.tabText = undefined;
            this.tabLeader = undefined;
        };
        TabElementBox.prototype.componentDestroy = function () {
            this.tabText = undefined;
            this.tabLeader = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        TabElementBox.prototype.clone = function () {
            var tabSpan = new TabElementBox();
            tabSpan.characterFormat.copyFormat(this.characterFormat);
            tabSpan.tabText = this.tabText;
            tabSpan.tabLeader = this.tabLeader;
            tabSpan.text = this.text;
            if (this.margin) {
                tabSpan.margin = this.margin.clone();
            }
            tabSpan.width = this.width;
            tabSpan.height = this.height;
            if (!ej2_base_1.isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
                if (this.revisions.length > 0) {
                    for (var i = 0; i < this.revisions.length; i++) {
                        var revision = this.revisions[i];
                        tabSpan.revisions.push(revision.clone());
                    }
                }
            }
            else {
                if (this.revisions.length > 0) {
                    tabSpan.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
                }
                else {
                    tabSpan.removedIds = this.removedIds.slice();
                }
            }
            return tabSpan;
        };
        return TabElementBox;
    }(TextElementBox));
    exports.TabElementBox = TabElementBox;
    var BookmarkElementBox = (function (_super) {
        __extends(BookmarkElementBox, _super);
        function BookmarkElementBox(type) {
            var _this = _super.call(this) || this;
            _this.bookmarkTypeIn = 0;
            _this.refereneceIn = undefined;
            _this.nameIn = '';
            _this.bookmarkTypeIn = type;
            return _this;
        }
        Object.defineProperty(BookmarkElementBox.prototype, "bookmarkType", {
            get: function () {
                return this.bookmarkTypeIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BookmarkElementBox.prototype, "properties", {
            get: function () {
                return this.propertiesIn;
            },
            set: function (properties) {
                this.propertiesIn = properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BookmarkElementBox.prototype, "name", {
            get: function () {
                return this.nameIn;
            },
            set: function (name) {
                this.nameIn = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BookmarkElementBox.prototype, "reference", {
            get: function () {
                return this.refereneceIn;
            },
            set: function (reference) {
                this.refereneceIn = reference;
            },
            enumerable: true,
            configurable: true
        });
        BookmarkElementBox.prototype.getLength = function () {
            return 1;
        };
        BookmarkElementBox.prototype.destroy = function () {
            this.name = undefined;
            this.reference = undefined;
            this.bookmarkTypeIn = undefined;
        };
        BookmarkElementBox.prototype.componentDestroy = function () {
            this.name = undefined;
            this.reference = undefined;
            this.bookmarkTypeIn = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        BookmarkElementBox.prototype.clone = function () {
            var span = new BookmarkElementBox(this.bookmarkType);
            span.name = this.name;
            span.reference = this.reference;
            span.properties = this.properties;
            if (this.margin) {
                span.margin = this.margin.clone();
            }
            if (this.revisions.length > 0) {
                span.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
            }
            else {
                span.removedIds = this.removedIds.slice();
            }
            span.width = this.width;
            span.height = this.height;
            if (this.contentControlProperties) {
                span.contentControlProperties = this.contentControlProperties;
            }
            return span;
        };
        return BookmarkElementBox;
    }(ElementBox));
    exports.BookmarkElementBox = BookmarkElementBox;
    var ContentControl = (function (_super) {
        __extends(ContentControl, _super);
        function ContentControl(widgetType) {
            var _this = _super.call(this) || this;
            _this.contentControlWidgetType = widgetType;
            _this.contentControlProperties = new ContentControlProperties(widgetType);
            return _this;
        }
        ContentControl.prototype.getLength = function () {
            return 1;
        };
        ContentControl.prototype.clone = function () {
            var span = new ContentControl(this.contentControlWidgetType);
            span.characterFormat.copyFormat(this.characterFormat);
            span.contentControlProperties = this.contentControlProperties;
            span.contentControlWidgetType = this.contentControlWidgetType;
            if (this.margin) {
                span.margin = this.margin.clone();
            }
            if (!ej2_base_1.isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
                if (this.revisions.length > 0) {
                    for (var i = 0; i < this.revisions.length; i++) {
                        var revisionChange = this.revisions[i];
                        span.revisions.push(revisionChange.clone());
                    }
                }
            }
            else {
                if (this.revisions.length > 0) {
                    span.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
                }
                else {
                    span.removedIds = this.removedIds.slice();
                }
            }
            span.type = this.type;
            span.width = this.width;
            span.height = this.height;
            span.reference = this.reference;
            return span;
        };
        ContentControl.prototype.destroy = function () {
            this.contentControlProperties = undefined;
            this.contentControlWidgetType = undefined;
            _super.prototype.destroy.call(this);
        };
        ContentControl.prototype.componentDestroy = function () {
            if (this.contentControlProperties) {
                this.contentControlProperties.destroy();
                this.contentControlProperties = undefined;
            }
            this.contentControlWidgetType = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return ContentControl;
    }(ElementBox));
    exports.ContentControl = ContentControl;
    var ContentControlProperties = (function () {
        function ContentControlProperties(widgetType) {
            this.contentControlListItems = [];
            this.contentControlWidgetType = widgetType;
            this.characterFormat = new index_2.WCharacterFormat();
        }
        ContentControlProperties.prototype.destroy = function () {
            if (this.characterFormat) {
                this.characterFormat.destroy();
                this.characterFormat = undefined;
            }
            if (this.xmlMapping) {
                this.xmlMapping.destroy();
                this.xmlMapping = undefined;
            }
            this.lockContentControl = undefined;
            this.lockContents = undefined;
            this.tag = undefined;
            this.color = undefined;
            this.title = undefined;
            this.appearance = undefined;
            this.type = undefined;
            this.hasPlaceHolderText = undefined;
            this.multiline = undefined;
            this.isTemporary = undefined;
            this.isChecked = undefined;
            this.dateCalendarType = undefined;
            this.dateStorageFormat = undefined;
            this.dateDisplayLocale = undefined;
            this.dateDisplayFormat = undefined;
        };
        ContentControlProperties.prototype.clone = function () {
            var span = new ContentControlProperties(this.contentControlWidgetType);
            span.lockContentControl = this.lockContentControl;
            span.lockContents = this.lockContents;
            span.tag = this.tag;
            span.color = this.color;
            span.title = this.title;
            span.appearance = this.appearance;
            span.type = this.type;
            span.hasPlaceHolderText = this.hasPlaceHolderText;
            span.multiline = this.multiline;
            span.isTemporary = this.isTemporary;
            span.isChecked = this.isChecked;
            span.dateCalendarType = this.dateCalendarType;
            span.dateStorageFormat = this.dateStorageFormat;
            span.dateDisplayLocale = this.dateDisplayLocale;
            span.dateDisplayFormat = this.dateDisplayFormat;
            if (this.contentControlListItems.length > 0) {
                for (var i = 0; i < this.contentControlListItems.length; i++) {
                    span.contentControlListItems.push(this.contentControlListItems[i].clone());
                }
            }
            if (this.checkedState) {
                span.checkedState = this.checkedState.clone();
            }
            if (this.uncheckedState) {
                span.uncheckedState = this.uncheckedState.clone();
            }
            if (this.xmlMapping) {
                span.xmlMapping = this.xmlMapping.clone();
            }
            return span;
        };
        return ContentControlProperties;
    }());
    exports.ContentControlProperties = ContentControlProperties;
    var ContentControlListItems = (function () {
        function ContentControlListItems() {
        }
        ContentControlListItems.prototype.destroy = function () {
            this.displayText = undefined;
            this.value = undefined;
        };
        ContentControlListItems.prototype.clone = function () {
            var span = new ContentControlListItems();
            span.displayText = this.displayText;
            span.value = this.value;
            return span;
        };
        return ContentControlListItems;
    }());
    exports.ContentControlListItems = ContentControlListItems;
    var CheckBoxState = (function () {
        function CheckBoxState() {
        }
        CheckBoxState.prototype.destroy = function () {
            this.font = undefined;
            this.value = undefined;
        };
        CheckBoxState.prototype.clone = function () {
            var span = new CheckBoxState();
            span.font = this.font;
            span.value = this.value;
            return span;
        };
        return CheckBoxState;
    }());
    exports.CheckBoxState = CheckBoxState;
    var XmlMapping = (function () {
        function XmlMapping() {
        }
        XmlMapping.prototype.destroy = function () {
            this.isMapped = undefined;
            this.isWordMl = undefined;
            this.prefixMapping = undefined;
            this.xPath = undefined;
            this.storeItemId = undefined;
            this.customXmlPart = undefined;
        };
        XmlMapping.prototype.clone = function () {
            var span = new XmlMapping();
            span.isMapped = this.isMapped;
            span.isWordMl = this.isWordMl;
            span.prefixMapping = this.prefixMapping;
            span.xPath = this.xPath;
            span.storeItemId = this.storeItemId;
            if (this.customXmlPart) {
                span.customXmlPart = this.customXmlPart.clone();
            }
            return span;
        };
        return XmlMapping;
    }());
    exports.XmlMapping = XmlMapping;
    var CustomXmlPart = (function () {
        function CustomXmlPart() {
        }
        CustomXmlPart.prototype.destroy = function () {
            this.id = undefined;
            this.xml = undefined;
        };
        CustomXmlPart.prototype.clone = function () {
            var span = new CustomXmlPart();
            span.id = this.id;
            span.xml = this.xml;
            return span;
        };
        return CustomXmlPart;
    }());
    exports.CustomXmlPart = CustomXmlPart;
    var ShapeCommon = (function (_super) {
        __extends(ShapeCommon, _super);
        function ShapeCommon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = '';
            _this.alternateText = '';
            _this.title = '';
            return _this;
        }
        ShapeCommon.prototype.getLength = function () {
            return 1;
        };
        ShapeCommon.prototype.clone = function () {
            var shape = new ShapeElementBox();
            return shape;
        };
        return ShapeCommon;
    }(ElementBox));
    exports.ShapeCommon = ShapeCommon;
    var ShapeBase = (function (_super) {
        __extends(ShapeBase, _super);
        function ShapeBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.verticalPosition = 0;
            _this.horizontalPosition = 0;
            _this.textWrappingStyle = 'Inline';
            _this.distanceBottom = 0;
            _this.distanceLeft = 0;
            _this.distanceRight = 0;
            _this.distanceTop = 0;
            return _this;
        }
        return ShapeBase;
    }(ShapeCommon));
    exports.ShapeBase = ShapeBase;
    var ShapeElementBox = (function (_super) {
        __extends(ShapeElementBox, _super);
        function ShapeElementBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShapeElementBox.prototype.clone = function () {
            var shape = new ShapeElementBox();
            shape.characterFormat.copyFormat(this.characterFormat);
            shape.x = this.x;
            shape.y = this.y;
            shape.width = this.width;
            shape.height = this.height;
            shape.shapeId = this.shapeId;
            shape.name = this.name;
            shape.alternateText = this.alternateText;
            shape.title = this.title;
            shape.widthScale = this.widthScale;
            shape.heightScale = this.heightScale;
            shape.visible = this.visible;
            shape.verticalPosition = this.verticalPosition;
            shape.verticalAlignment = this.verticalAlignment;
            shape.verticalOrigin = this.verticalOrigin;
            shape.verticalRelativePercent = this.verticalRelativePercent;
            shape.horizontalPosition = this.horizontalPosition;
            shape.horizontalAlignment = this.horizontalAlignment;
            shape.horizontalOrigin = this.horizontalOrigin;
            shape.horizontalRelativePercent = this.horizontalRelativePercent;
            shape.heightRelativePercent = this.heightRelativePercent;
            shape.widthRelativePercent = this.widthRelativePercent;
            shape.zOrderPosition = this.zOrderPosition;
            shape.allowOverlap = this.allowOverlap;
            shape.textWrappingStyle = this.textWrappingStyle;
            shape.textWrappingType = this.textWrappingType;
            shape.distanceBottom = this.distanceBottom;
            shape.distanceLeft = this.distanceLeft;
            shape.distanceRight = this.distanceRight;
            shape.distanceTop = this.distanceTop;
            shape.layoutInCell = this.layoutInCell;
            shape.lockAnchor = this.lockAnchor;
            shape.autoShapeType = this.autoShapeType;
            if (this.lineFormat) {
                shape.lineFormat = this.lineFormat.clone();
            }
            if (this.fillFormat) {
                shape.fillFormat = this.fillFormat.clone();
            }
            if (this.textFrame) {
                shape.textFrame = this.textFrame.clone();
                shape.textFrame.containerShape = shape;
            }
            if (this.margin) {
                shape.margin = this.margin.clone();
            }
            if (!ej2_base_1.isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
                if (this.revisions.length > 0) {
                    for (var i = 0; i < this.revisions.length; i++) {
                        var revision = this.revisions[i];
                        shape.revisions.push(revision.clone());
                    }
                }
            }
            else {
                if (this.revisions.length > 0) {
                    shape.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
                }
                else {
                    shape.removedIds = this.removedIds.slice();
                }
            }
            return shape;
        };
        return ShapeElementBox;
    }(ShapeBase));
    exports.ShapeElementBox = ShapeElementBox;
    var TextFrame = (function (_super) {
        __extends(TextFrame, _super);
        function TextFrame() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.marginLeft = 0;
            _this.marginRight = 0;
            _this.marginTop = 0;
            _this.marginBottom = 0;
            return _this;
        }
        TextFrame.prototype.equals = function () {
            return false;
        };
        TextFrame.prototype.destroyInternal = function () {
        };
        TextFrame.prototype.getHierarchicalIndex = function (index) {
            var line = this.containerShape.line;
            var offset = line.getOffset(this.containerShape, 0).toString();
            return line.getHierarchicalIndex(offset);
        };
        TextFrame.prototype.getTableCellWidget = function () {
            return undefined;
        };
        TextFrame.prototype.clone = function () {
            var textFrame = new TextFrame();
            textFrame.textVerticalAlignment = this.textVerticalAlignment;
            textFrame.marginBottom = this.marginBottom;
            textFrame.marginLeft = this.marginLeft;
            textFrame.marginRight = this.marginRight;
            textFrame.marginTop = this.marginTop;
            for (var i = 0; i < this.childWidgets.length; i++) {
                var block = this.childWidgets[i].clone();
                textFrame.childWidgets.push(block);
                block.index = i;
                block.containerWidget = textFrame;
            }
            return textFrame;
        };
        return TextFrame;
    }(Widget));
    exports.TextFrame = TextFrame;
    var LineFormat = (function () {
        function LineFormat() {
        }
        LineFormat.prototype.clone = function () {
            var lineFormat = new LineFormat();
            lineFormat.lineFormatType = this.lineFormatType;
            lineFormat.color = this.color;
            lineFormat.weight = this.weight;
            lineFormat.dashStyle = this.dashStyle;
            lineFormat.line = this.line;
            return lineFormat;
        };
        return LineFormat;
    }());
    exports.LineFormat = LineFormat;
    var FillFormat = (function () {
        function FillFormat() {
        }
        FillFormat.prototype.clone = function () {
            var fillFormat = new FillFormat();
            fillFormat.color = this.color;
            fillFormat.fill = this.fill;
            return fillFormat;
        };
        return FillFormat;
    }());
    exports.FillFormat = FillFormat;
    var ImageElementBox = (function (_super) {
        __extends(ImageElementBox, _super);
        function ImageElementBox(isInlineImage) {
            var _this = _super.call(this) || this;
            _this.imageStr = '';
            _this.imgElement = undefined;
            _this.isInlineImageIn = true;
            _this.crop = false;
            _this.left = 0;
            _this.top = 0;
            _this.right = 0;
            _this.bottom = 0;
            _this.isMetaFile = false;
            _this.isCompressed = false;
            _this.isInlineImageIn = isInlineImage;
            return _this;
        }
        Object.defineProperty(ImageElementBox.prototype, "isCrop", {
            get: function () {
                return this.crop;
            },
            set: function (value) {
                this.crop = value;
                if (value) {
                    var right = 0;
                    var bottom = 0;
                    if (this.left !== 0) {
                        this.cropX = (this.left * this.cropWidthScale) / 100;
                    }
                    else {
                        this.cropX = 0;
                    }
                    if (this.top !== 0) {
                        this.cropY = (this.top * this.cropHeightScale) / 100;
                    }
                    else {
                        this.cropY = 0;
                    }
                    if (this.right !== 0) {
                        right = (this.right * this.cropWidthScale) / 100;
                    }
                    if (this.bottom !== 0) {
                        bottom = (this.bottom * this.cropHeightScale) / 100;
                    }
                    this.cropWidth = (this.cropWidthScale - (this.cropX + right));
                    this.cropHeight = (this.cropHeightScale - (this.cropY + bottom));
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageElementBox.prototype, "isInlineImage", {
            get: function () {
                return this.isInlineImageIn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageElementBox.prototype, "element", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.imgElement)) {
                    this.imgElement = document.createElement('img');
                }
                return this.imgElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageElementBox.prototype, "length", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageElementBox.prototype, "imageString", {
            get: function () {
                return this.imageStr;
            },
            set: function (value) {
                this.imageStr = value;
            },
            enumerable: true,
            configurable: true
        });
        ImageElementBox.prototype.getLength = function () {
            return 1;
        };
        ImageElementBox.prototype.clone = function () {
            var image = new ImageElementBox(this.isInlineImage);
            image.characterFormat.copyFormat(this.characterFormat);
            image.imageString = this.imageString;
            image.element.src = this.element.src;
            image.isMetaFile = this.isMetaFile;
            image.isCompressed = this.isCompressed;
            image.metaFileImageString = this.metaFileImageString;
            image.width = this.width;
            image.height = this.height;
            image.top = this.top;
            image.left = this.left;
            image.bottom = this.bottom;
            image.right = this.right;
            image.cropHeightScale = this.cropHeightScale;
            image.cropWidthScale = this.cropWidthScale;
            image.cropX = this.cropX;
            image.cropY = this.cropY;
            image.isCrop = this.isCrop;
            if (this.margin) {
                image.margin = this.margin.clone();
            }
            if (!ej2_base_1.isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
                if (this.revisions.length > 0) {
                    for (var i = 0; i < this.revisions.length; i++) {
                        var revision = this.revisions[i];
                        image.revisions.push(revision.clone());
                    }
                }
            }
            else {
                if (this.revisions.length > 0) {
                    image.removedIds = track_changes_1.Revision.cloneRevisions(this.revisions);
                }
                else {
                    image.removedIds = this.removedIds.slice();
                }
            }
            image.name = this.name;
            image.alternateText = this.alternateText;
            image.title = this.title;
            image.visible = this.visible;
            image.widthScale = this.widthScale;
            image.heightScale = this.heightScale;
            image.verticalPosition = this.verticalPosition;
            image.verticalOrigin = this.verticalOrigin;
            image.verticalAlignment = this.verticalAlignment;
            image.horizontalPosition = this.horizontalPosition;
            image.horizontalOrigin = this.horizontalOrigin;
            image.horizontalAlignment = this.horizontalAlignment;
            image.allowOverlap = this.allowOverlap;
            image.textWrappingStyle = this.textWrappingStyle;
            image.textWrappingType = this.textWrappingType;
            image.layoutInCell = this.layoutInCell;
            image.zOrderPosition = this.zOrderPosition;
            return image;
        };
        ImageElementBox.prototype.destroy = function () {
            this.imgElement = undefined;
            this.imageString = undefined;
            this.isInlineImageIn = undefined;
            _super.prototype.destroy.call(this);
        };
        return ImageElementBox;
    }(ShapeBase));
    exports.ImageElementBox = ImageElementBox;
    var ListTextElementBox = (function (_super) {
        __extends(ListTextElementBox, _super);
        function ListTextElementBox(listLevel, isListFollowCharacter) {
            var _this = _super.call(this) || this;
            _this.baselineOffset = 0;
            _this.trimEndWidth = 0;
            _this.isFollowCharacter = false;
            _this.listLevel = listLevel;
            _this.isFollowCharacter = isListFollowCharacter;
            return _this;
        }
        ListTextElementBox.prototype.getLength = function () {
            return this.text ? this.text.length : 0;
        };
        ListTextElementBox.prototype.clone = function () {
            var list = new ListTextElementBox(this.listLevel, this.isFollowCharacter);
            list.text = this.text;
            list.baselineOffset = this.baselineOffset;
            if (this.margin) {
                list.margin = this.margin.clone();
            }
            list.width = this.width;
            list.height = this.height;
            return list;
        };
        ListTextElementBox.prototype.destroy = function () {
            this.text = undefined;
            _super.prototype.destroy.call(this);
        };
        return ListTextElementBox;
    }(ElementBox));
    exports.ListTextElementBox = ListTextElementBox;
    var EditRangeEndElementBox = (function (_super) {
        __extends(EditRangeEndElementBox, _super);
        function EditRangeEndElementBox() {
            var _this = _super.call(this) || this;
            _this.editRangeStart = undefined;
            _this.editRangeId = -1;
            return _this;
        }
        EditRangeEndElementBox.prototype.getLength = function () {
            return 1;
        };
        EditRangeEndElementBox.prototype.destroy = function () {
            this.editRangeStart = undefined;
        };
        EditRangeEndElementBox.prototype.clone = function () {
            var end = new EditRangeEndElementBox();
            end.editRangeStart = this.editRangeStart;
            end.editRangeId = this.editRangeId;
            return end;
        };
        return EditRangeEndElementBox;
    }(ElementBox));
    exports.EditRangeEndElementBox = EditRangeEndElementBox;
    var EditRangeStartElementBox = (function (_super) {
        __extends(EditRangeStartElementBox, _super);
        function EditRangeStartElementBox() {
            var _this = _super.call(this) || this;
            _this.columnFirst = -1;
            _this.columnLast = -1;
            _this.user = '';
            _this.group = '';
            _this.editRangeId = -1;
            return _this;
        }
        EditRangeStartElementBox.prototype.getLength = function () {
            return 1;
        };
        EditRangeStartElementBox.prototype.renderLockMark = function (currentUser, locale) {
            if (ej2_base_1.isNullOrUndefined(this.editRangeMark)) {
                var user = currentUser === this.user ? 'you' : this.user;
                this.editRangeMark = document.createElement('div');
                this.editRangeMark.style.display = 'none';
                this.editRangeMark.classList.add('e-de-lock-mark');
                var span = document.createElement('span');
                span.className = 'e-icons e-de-ctnr-lock';
                this.editRangeMark.appendChild(span);
                this.editRangeMark.title = locale.getConstant('This region is locked by') + ' ' + user;
            }
            if (this.line && ej2_base_1.isNullOrUndefined(this.editRangeMark.parentElement)) {
                var documentHelper = this.line.paragraph.bodyWidget.page.documentHelper;
                documentHelper.pageContainer.appendChild(this.editRangeMark);
            }
        };
        EditRangeStartElementBox.prototype.removeEditRangeMark = function () {
            if (this.editRangeMark) {
                this.editRangeMark.parentElement.removeChild(this.editRangeMark);
                this.editRangeMark = undefined;
            }
        };
        EditRangeStartElementBox.prototype.destroy = function () {
            this.user = undefined;
            this.columnFirst = undefined;
            this.columnLast = undefined;
        };
        EditRangeStartElementBox.prototype.clone = function () {
            var start = new EditRangeStartElementBox();
            start.columnFirst = this.columnFirst;
            start.columnLast = this.columnLast;
            start.user = this.user;
            start.group = this.group;
            start.editRangeEnd = this.editRangeEnd;
            start.editRangeId = this.editRangeId;
            return start;
        };
        return EditRangeStartElementBox;
    }(ElementBox));
    exports.EditRangeStartElementBox = EditRangeStartElementBox;
    var ChartElementBox = (function (_super) {
        __extends(ChartElementBox, _super);
        function ChartElementBox() {
            var _this = _super.call(this) || this;
            _this.chartTitle = '';
            _this.chartType = '';
            _this.chartElement = undefined;
            _this.chartCategory = [];
            _this.chartSeries = [];
            _this.chartArea = new ChartArea();
            _this.chartPlotArea = new ChartArea();
            _this.chartTitleArea = new ChartTitleArea();
            _this.chartLegend = new ChartLegend();
            _this.chartPrimaryCategoryAxis = new ChartCategoryAxis();
            _this.chartPrimaryValueAxis = new ChartCategoryAxis();
            _this.chartDataTable = new ChartDataTable();
            return _this;
        }
        ChartElementBox.prototype.getLength = function () {
            return 1;
        };
        Object.defineProperty(ChartElementBox.prototype, "title", {
            get: function () {
                return this.chartTitle;
            },
            set: function (value) {
                this.chartTitle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartElementBox.prototype, "type", {
            get: function () {
                return this.chartType;
            },
            set: function (value) {
                this.chartType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartElementBox.prototype, "chartGapWidth", {
            get: function () {
                return this.gapWidth;
            },
            set: function (value) {
                this.gapWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartElementBox.prototype, "chartOverlap", {
            get: function () {
                return this.overlap;
            },
            set: function (value) {
                this.overlap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartElementBox.prototype, "targetElement", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.div)) {
                    this.div = ej2_base_1.createElement('div');
                }
                return this.div;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartElementBox.prototype, "officeChart", {
            get: function () {
                return this.officeChartInternal;
            },
            set: function (value) {
                if (value) {
                    this.officeChartInternal = value;
                    this.officeChartInternal.chart.loaded = this.onChartLoaded.bind(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        ChartElementBox.prototype.onChartLoaded = function () {
            var _this = this;
            this.officeChart.convertChartToImage(this.officeChart.chart, this.width, this.height).then(function (dataURL) {
                _this.imageString = dataURL;
                _this.element.src = dataURL;
            });
        };
        ChartElementBox.prototype.clone = function () {
            var chart = new ChartElementBox();
            chart.chartTitle = this.chartTitle;
            chart.chartType = this.chartType;
            chart.height = this.height;
            chart.width = this.width;
            chart.gapWidth = this.gapWidth;
            chart.overlap = this.overlap;
            for (var i = 0; i < this.chartCategory.length; i++) {
                var chartCategory = this.chartCategory[i].clone();
                chart.chartCategory.push(chartCategory);
            }
            for (var i = 0; i < this.chartSeries.length; i++) {
                var series = this.chartSeries[i].clone();
                chart.chartSeries.push(series);
            }
            chart.chartArea = this.chartArea.clone();
            chart.chartPlotArea = this.chartPlotArea.clone();
            chart.chartLegend = this.chartLegend.clone();
            chart.chartTitleArea = this.chartTitleArea.clone();
            chart.chartPrimaryCategoryAxis = this.chartPrimaryCategoryAxis.clone();
            chart.chartPrimaryValueAxis = this.chartPrimaryValueAxis.clone();
            chart.chartDataTable = this.chartDataTable.clone();
            return chart;
        };
        ChartElementBox.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.officeChartInternal) {
                this.officeChartInternal.chart.loaded = undefined;
                this.officeChartInternal.destroy();
                this.officeChartInternal = undefined;
            }
            if (this.div) {
                this.div = undefined;
            }
            this.chartTitle = undefined;
            this.chartType = undefined;
            this.chartArea = undefined;
            this.chartPlotArea = undefined;
            this.chartCategory = [];
            this.chartSeries = [];
            this.chartTitleArea = undefined;
            this.chartLegend = undefined;
            this.chartPrimaryCategoryAxis = undefined;
            this.chartPrimaryValueAxis = undefined;
            this.chartDataTable = undefined;
            this.chartElement = undefined;
        };
        return ChartElementBox;
    }(ImageElementBox));
    exports.ChartElementBox = ChartElementBox;
    var ChartArea = (function () {
        function ChartArea() {
        }
        Object.defineProperty(ChartArea.prototype, "chartForeColor", {
            get: function () {
                return this.foreColor;
            },
            set: function (value) {
                this.foreColor = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartArea.prototype.clone = function () {
            var chart = new ChartArea();
            chart.foreColor = this.foreColor;
            return chart;
        };
        ChartArea.prototype.destroy = function () {
            this.foreColor = undefined;
        };
        return ChartArea;
    }());
    exports.ChartArea = ChartArea;
    var ChartCategory = (function () {
        function ChartCategory() {
            this.categoryXName = '';
            this.chartData = [];
        }
        Object.defineProperty(ChartCategory.prototype, "xName", {
            get: function () {
                return this.categoryXName;
            },
            set: function (value) {
                this.categoryXName = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartCategory.prototype.clone = function () {
            var chart = new ChartCategory();
            chart.categoryXName = this.categoryXName;
            for (var i = 0; i < this.chartData.length; i++) {
                var chartData = this.chartData[i].clone();
                chart.chartData.push(chartData);
            }
            return chart;
        };
        ChartCategory.prototype.destroy = function () {
            this.categoryXName = undefined;
            this.chartData = [];
        };
        return ChartCategory;
    }());
    exports.ChartCategory = ChartCategory;
    var ChartData = (function () {
        function ChartData() {
        }
        Object.defineProperty(ChartData.prototype, "yAxisValue", {
            get: function () {
                return this.yValue;
            },
            set: function (value) {
                this.yValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartData.prototype, "xAxisValue", {
            get: function () {
                return this.xValue;
            },
            set: function (value) {
                this.xValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartData.prototype, "bubbleSize", {
            get: function () {
                return this.size;
            },
            set: function (value) {
                this.size = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartData.prototype.clone = function () {
            var chart = new ChartData();
            chart.yValue = this.yValue;
            chart.xValue = this.xValue;
            chart.size = this.size;
            return chart;
        };
        ChartData.prototype.destroy = function () {
            this.xValue = undefined;
            this.yValue = undefined;
            this.size = undefined;
        };
        return ChartData;
    }());
    exports.ChartData = ChartData;
    var ChartLegend = (function () {
        function ChartLegend() {
            this.chartTitleArea = new ChartTitleArea();
        }
        Object.defineProperty(ChartLegend.prototype, "chartLegendPostion", {
            get: function () {
                return this.legendPostion;
            },
            set: function (value) {
                this.legendPostion = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartLegend.prototype.clone = function () {
            var chart = new ChartLegend();
            chart.legendPostion = this.legendPostion;
            chart.chartTitleArea = this.chartTitleArea.clone();
            return chart;
        };
        ChartLegend.prototype.destroy = function () {
            this.legendPostion = undefined;
            this.chartTitleArea = undefined;
        };
        return ChartLegend;
    }());
    exports.ChartLegend = ChartLegend;
    var ChartSeries = (function () {
        function ChartSeries() {
            this.chartDataFormat = [];
            this.trendLines = [];
            this.errorBar = new ChartErrorBar();
            this.dataLabels = new ChartDataLabels();
            this.seriesFormat = new ChartSeriesFormat();
        }
        Object.defineProperty(ChartSeries.prototype, "seriesName", {
            get: function () {
                return this.name;
            },
            set: function (value) {
                this.name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "firstSliceAngle", {
            get: function () {
                return this.sliceAngle;
            },
            set: function (value) {
                this.sliceAngle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartSeries.prototype, "doughnutHoleSize", {
            get: function () {
                return this.holeSize;
            },
            set: function (value) {
                this.holeSize = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartSeries.prototype.clone = function () {
            var chart = new ChartSeries();
            chart.name = this.name;
            chart.sliceAngle = this.sliceAngle;
            chart.holeSize = this.holeSize;
            chart.errorBar = this.errorBar.clone();
            chart.dataLabels = this.dataLabels.clone();
            chart.seriesFormat = this.seriesFormat.clone();
            for (var i = 0; i < this.chartDataFormat.length; i++) {
                var format = (this.chartDataFormat[i].clone());
                chart.chartDataFormat.push(format);
            }
            for (var i = 0; i < this.trendLines.length; i++) {
                var trendLine = (this.trendLines[i].clone());
                chart.trendLines.push(trendLine);
            }
            return chart;
        };
        ChartSeries.prototype.destroy = function () {
            this.name = undefined;
            this.errorBar = undefined;
            this.trendLines = undefined;
            this.chartDataFormat = [];
        };
        return ChartSeries;
    }());
    exports.ChartSeries = ChartSeries;
    var ChartErrorBar = (function () {
        function ChartErrorBar() {
        }
        Object.defineProperty(ChartErrorBar.prototype, "errorType", {
            get: function () {
                return this.type;
            },
            set: function (value) {
                this.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartErrorBar.prototype, "errorDirection", {
            get: function () {
                return this.direction;
            },
            set: function (value) {
                this.direction = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartErrorBar.prototype, "errorEndStyle", {
            get: function () {
                return this.endStyle;
            },
            set: function (value) {
                this.endStyle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartErrorBar.prototype, "numberValue", {
            get: function () {
                return this.errorValue;
            },
            set: function (value) {
                this.errorValue = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartErrorBar.prototype.clone = function () {
            var chart = new ChartErrorBar();
            chart.type = this.type;
            chart.errorDirection = this.errorDirection;
            chart.endStyle = this.endStyle;
            chart.errorValue = this.errorValue;
            return chart;
        };
        ChartErrorBar.prototype.destroy = function () {
            this.type = undefined;
            this.errorDirection = undefined;
            this.endStyle = undefined;
        };
        return ChartErrorBar;
    }());
    exports.ChartErrorBar = ChartErrorBar;
    var ChartSeriesFormat = (function () {
        function ChartSeriesFormat() {
        }
        Object.defineProperty(ChartSeriesFormat.prototype, "markerStyle", {
            get: function () {
                return this.style;
            },
            set: function (value) {
                this.style = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartSeriesFormat.prototype, "markerColor", {
            get: function () {
                return this.color;
            },
            set: function (value) {
                this.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartSeriesFormat.prototype, "numberValue", {
            get: function () {
                return this.size;
            },
            set: function (value) {
                this.size = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartSeriesFormat.prototype.clone = function () {
            var chart = new ChartSeriesFormat();
            chart.style = this.style;
            chart.color = this.color;
            chart.size = this.size;
            return chart;
        };
        ChartSeriesFormat.prototype.destroy = function () {
            this.style = undefined;
            this.color = undefined;
            this.size = undefined;
        };
        return ChartSeriesFormat;
    }());
    exports.ChartSeriesFormat = ChartSeriesFormat;
    var ChartDataLabels = (function () {
        function ChartDataLabels() {
        }
        Object.defineProperty(ChartDataLabels.prototype, "labelPosition", {
            get: function () {
                return this.position;
            },
            set: function (value) {
                this.position = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "fontName", {
            get: function () {
                return this.name;
            },
            set: function (value) {
                this.name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "fontColor", {
            get: function () {
                return this.color;
            },
            set: function (value) {
                this.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "fontSize", {
            get: function () {
                return this.size;
            },
            set: function (value) {
                this.size = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "isLegendKey", {
            get: function () {
                return this.isLegend;
            },
            set: function (value) {
                this.isLegend = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "isBubbleSize", {
            get: function () {
                return this.isBubble;
            },
            set: function (value) {
                this.isBubble = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "isCategoryName", {
            get: function () {
                return this.isCategory;
            },
            set: function (value) {
                this.isCategory = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "isSeriesName", {
            get: function () {
                return this.isSeries;
            },
            set: function (value) {
                this.isSeries = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "isValue", {
            get: function () {
                return this.isValueEnabled;
            },
            set: function (value) {
                this.isValueEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "isPercentage", {
            get: function () {
                return this.isPercentageEnabled;
            },
            set: function (value) {
                this.isPercentageEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataLabels.prototype, "isLeaderLines", {
            get: function () {
                return this.showLeaderLines;
            },
            set: function (value) {
                this.showLeaderLines = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartDataLabels.prototype.clone = function () {
            var chart = new ChartDataLabels();
            chart.position = this.position;
            chart.name = this.name;
            chart.color = this.color;
            chart.size = this.size;
            chart.isBubble = this.isBubble;
            chart.isLegend = this.isLegend;
            chart.isCategory = this.isCategory;
            chart.isSeries = this.isSeries;
            chart.isValueEnabled = this.isValueEnabled;
            chart.isPercentageEnabled = this.isPercentageEnabled;
            chart.showLeaderLines = this.showLeaderLines;
            return chart;
        };
        ChartDataLabels.prototype.destroy = function () {
            this.position = undefined;
        };
        return ChartDataLabels;
    }());
    exports.ChartDataLabels = ChartDataLabels;
    var ChartTrendLines = (function () {
        function ChartTrendLines() {
        }
        Object.defineProperty(ChartTrendLines.prototype, "trendLineType", {
            get: function () {
                return this.type;
            },
            set: function (value) {
                this.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartTrendLines.prototype, "trendLineName", {
            get: function () {
                return this.name;
            },
            set: function (value) {
                this.name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartTrendLines.prototype, "interceptValue", {
            get: function () {
                return this.intercept;
            },
            set: function (value) {
                this.intercept = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartTrendLines.prototype, "forwardValue", {
            get: function () {
                return this.forward;
            },
            set: function (value) {
                this.forward = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartTrendLines.prototype, "backwardValue", {
            get: function () {
                return this.backward;
            },
            set: function (value) {
                this.backward = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartTrendLines.prototype, "isDisplayRSquared", {
            get: function () {
                return this.displayRSquared;
            },
            set: function (value) {
                this.displayRSquared = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartTrendLines.prototype, "isDisplayEquation", {
            get: function () {
                return this.displayEquation;
            },
            set: function (value) {
                this.displayEquation = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartTrendLines.prototype.clone = function () {
            var chart = new ChartTrendLines();
            chart.type = this.type;
            chart.name = this.name;
            chart.forward = this.forward;
            chart.backward = this.backward;
            chart.intercept = this.intercept;
            chart.displayEquation = this.displayEquation;
            chart.displayRSquared = this.displayRSquared;
            return chart;
        };
        ChartTrendLines.prototype.destroy = function () {
            this.type = undefined;
            this.name = undefined;
            this.forward = undefined;
            this.backward = undefined;
        };
        return ChartTrendLines;
    }());
    exports.ChartTrendLines = ChartTrendLines;
    var ChartTitleArea = (function () {
        function ChartTitleArea() {
            this.dataFormat = new ChartDataFormat();
            this.layout = new ChartLayout();
        }
        Object.defineProperty(ChartTitleArea.prototype, "chartfontName", {
            get: function () {
                return this.fontName;
            },
            set: function (value) {
                this.fontName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartTitleArea.prototype, "chartFontSize", {
            get: function () {
                return this.fontSize;
            },
            set: function (value) {
                this.fontSize = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartTitleArea.prototype.clone = function () {
            var chart = new ChartTitleArea();
            chart.fontName = this.fontName;
            chart.fontSize = this.fontSize;
            chart.dataFormat = this.dataFormat.clone();
            chart.layout = this.layout.clone();
            return chart;
        };
        ChartTitleArea.prototype.destroy = function () {
            this.fontName = undefined;
            this.fontSize = undefined;
            this.dataFormat = undefined;
            this.layout = undefined;
        };
        return ChartTitleArea;
    }());
    exports.ChartTitleArea = ChartTitleArea;
    var ChartDataFormat = (function () {
        function ChartDataFormat() {
            this.fill = new ChartFill();
            this.line = new ChartFill();
        }
        ChartDataFormat.prototype.clone = function () {
            var chart = new ChartDataFormat();
            chart.fill = this.fill.clone();
            chart.line = this.line.clone();
            return chart;
        };
        ChartDataFormat.prototype.destroy = function () {
            this.fill = undefined;
            this.line = undefined;
        };
        return ChartDataFormat;
    }());
    exports.ChartDataFormat = ChartDataFormat;
    var ChartFill = (function () {
        function ChartFill() {
        }
        Object.defineProperty(ChartFill.prototype, "color", {
            get: function () {
                return this.fillColor;
            },
            set: function (value) {
                this.fillColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartFill.prototype, "rgb", {
            get: function () {
                return this.fillRGB;
            },
            set: function (value) {
                this.fillRGB = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartFill.prototype.clone = function () {
            var chart = new ChartFill();
            chart.fillColor = this.fillColor;
            chart.fillRGB = this.fillRGB;
            return chart;
        };
        ChartFill.prototype.destroy = function () {
            this.fillColor = undefined;
            this.fillRGB = undefined;
        };
        return ChartFill;
    }());
    exports.ChartFill = ChartFill;
    var ChartLayout = (function () {
        function ChartLayout() {
        }
        Object.defineProperty(ChartLayout.prototype, "chartLayoutLeft", {
            get: function () {
                return this.layoutX;
            },
            set: function (value) {
                this.layoutX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartLayout.prototype, "chartLayoutTop", {
            get: function () {
                return this.layoutY;
            },
            set: function (value) {
                this.layoutY = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartLayout.prototype.clone = function () {
            var chart = new ChartLayout();
            chart.layoutX = this.layoutX;
            chart.layoutY = this.layoutY;
            return chart;
        };
        ChartLayout.prototype.destroy = function () {
            this.layoutX = undefined;
            this.layoutY = undefined;
        };
        return ChartLayout;
    }());
    exports.ChartLayout = ChartLayout;
    var ChartCategoryAxis = (function () {
        function ChartCategoryAxis() {
            this.chartTitleArea = new ChartTitleArea();
        }
        Object.defineProperty(ChartCategoryAxis.prototype, "majorTick", {
            get: function () {
                return this.majorTickMark;
            },
            set: function (value) {
                this.majorTickMark = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "minorTick", {
            get: function () {
                return this.minorTickMark;
            },
            set: function (value) {
                this.minorTickMark = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "tickPosition", {
            get: function () {
                return this.tickLabelPostion;
            },
            set: function (value) {
                this.tickLabelPostion = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "minorGridLines", {
            get: function () {
                return this.hasMinorGridLines;
            },
            set: function (value) {
                this.hasMinorGridLines = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "majorGridLines", {
            get: function () {
                return this.hasMajorGridLines;
            },
            set: function (value) {
                this.hasMajorGridLines = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "interval", {
            get: function () {
                return this.majorUnit;
            },
            set: function (value) {
                this.majorUnit = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "max", {
            get: function () {
                return this.maximumValue;
            },
            set: function (value) {
                this.maximumValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "min", {
            get: function () {
                return this.minimumValue;
            },
            set: function (value) {
                this.minimumValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "categoryAxisTitle", {
            get: function () {
                return this.title;
            },
            set: function (value) {
                this.title = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "categoryAxisType", {
            get: function () {
                return this.categoryType;
            },
            set: function (value) {
                this.categoryType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "categoryNumberFormat", {
            get: function () {
                return this.numberFormat;
            },
            set: function (value) {
                this.numberFormat = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "axisFontSize", {
            get: function () {
                return this.fontSize;
            },
            set: function (value) {
                this.fontSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartCategoryAxis.prototype, "axisFontName", {
            get: function () {
                return this.fontName;
            },
            set: function (value) {
                this.fontName = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartCategoryAxis.prototype.clone = function () {
            var chart = new ChartCategoryAxis();
            chart.title = this.title;
            chart.categoryType = this.categoryType;
            chart.numberFormat = this.numberFormat;
            chart.fontSize = this.fontSize;
            chart.fontName = this.fontName;
            chart.hasMajorGridLines = this.hasMajorGridLines;
            chart.hasMinorGridLines = this.hasMinorGridLines;
            chart.minimumValue = this.minimumValue;
            chart.maximumValue = this.maximumValue;
            chart.majorUnit = this.majorUnit;
            chart.majorTickMark = this.majorTickMark;
            chart.minorTickMark = this.minorTickMark;
            chart.tickLabelPostion = this.tickLabelPostion;
            chart.chartTitleArea = this.chartTitleArea.clone();
            return chart;
        };
        ChartCategoryAxis.prototype.destroy = function () {
            this.title = undefined;
            this.categoryType = undefined;
            this.numberFormat = undefined;
            this.chartTitleArea = undefined;
            this.minimumValue = undefined;
            this.maximumValue = undefined;
            this.fontSize = undefined;
            this.fontName = undefined;
            this.majorUnit = undefined;
            this.majorTickMark = undefined;
            this.minorTickMark = undefined;
            this.tickLabelPostion = undefined;
        };
        return ChartCategoryAxis;
    }());
    exports.ChartCategoryAxis = ChartCategoryAxis;
    var ChartDataTable = (function () {
        function ChartDataTable() {
        }
        Object.defineProperty(ChartDataTable.prototype, "showSeriesKeys", {
            get: function () {
                return this.isSeriesKeys;
            },
            set: function (value) {
                this.isSeriesKeys = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataTable.prototype, "hasHorzBorder", {
            get: function () {
                return this.isHorzBorder;
            },
            set: function (value) {
                this.isHorzBorder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataTable.prototype, "hasVertBorder", {
            get: function () {
                return this.isVertBorder;
            },
            set: function (value) {
                this.isVertBorder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChartDataTable.prototype, "hasBorders", {
            get: function () {
                return this.isBorders;
            },
            set: function (value) {
                this.isBorders = value;
            },
            enumerable: true,
            configurable: true
        });
        ChartDataTable.prototype.clone = function () {
            var chart = new ChartDataTable();
            chart.isSeriesKeys = this.isSeriesKeys;
            chart.isHorzBorder = this.isHorzBorder;
            chart.isVertBorder = this.isVertBorder;
            chart.isBorders = this.isBorders;
            return chart;
        };
        ChartDataTable.prototype.destroy = function () {
            this.isSeriesKeys = undefined;
            this.isHorzBorder = undefined;
            this.isVertBorder = undefined;
            this.isBorders = undefined;
        };
        return ChartDataTable;
    }());
    exports.ChartDataTable = ChartDataTable;
    var CommentCharacterElementBox = (function (_super) {
        __extends(CommentCharacterElementBox, _super);
        function CommentCharacterElementBox(type) {
            var _this = _super.call(this) || this;
            _this.commentType = 0;
            _this.commentId = '';
            _this.commentType = type;
            return _this;
        }
        Object.defineProperty(CommentCharacterElementBox.prototype, "comment", {
            get: function () {
                return this.commentInternal;
            },
            set: function (value) {
                this.commentInternal = value;
            },
            enumerable: true,
            configurable: true
        });
        CommentCharacterElementBox.prototype.getLength = function () {
            return 1;
        };
        CommentCharacterElementBox.prototype.clone = function () {
            var comment = new CommentCharacterElementBox(this.commentType);
            comment.commentId = this.commentId;
            comment.commentType = this.commentType;
            return comment;
        };
        CommentCharacterElementBox.prototype.renderCommentMark = function (topPosition, leftPosition) {
            var documentHelper = this.line.paragraph.bodyWidget.page.documentHelper;
            var commentMarkDictionary = documentHelper.render.commentMarkDictionary;
            if (this.commentType === 0 && ej2_base_1.isNullOrUndefined(this.commentMark)) {
                this.commentMark = document.createElement('div');
                this.commentMark.style.display = 'none';
                this.commentMark.classList.add('e-de-cmt-mark');
                var span = document.createElement('span');
                span.classList.add('e-icons');
                span.classList.add('e-de-cmt-mark-icon');
                this.commentMark.appendChild(span);
            }
            if (this.line && ej2_base_1.isNullOrUndefined(this.commentMark.parentElement)) {
                documentHelper.pageContainer.appendChild(this.commentMark);
                this.commentMark.addEventListener('click', this.selectComment.bind(this));
            }
            var positionOverlap = false;
            var overlapKey;
            for (var index = 0; index < commentMarkDictionary.length; index++) {
                if (this.elementsOverlap(commentMarkDictionary.keys[index], topPosition, leftPosition)) {
                    positionOverlap = true;
                    overlapKey = commentMarkDictionary.keys[index];
                    break;
                }
            }
            if (positionOverlap) {
                var ifNotPresent = true;
                for (var index = 0; index < commentMarkDictionary.get(overlapKey).length; index++) {
                    if (commentMarkDictionary.get(overlapKey)[index] === this) {
                        ifNotPresent = false;
                        break;
                    }
                }
                if (ifNotPresent) {
                    commentMarkDictionary.get(overlapKey).push(this);
                }
            }
            else {
                commentMarkDictionary.add(this.commentMark, [this]);
            }
            for (var index = 0; index < commentMarkDictionary.length; index++) {
                var element = commentMarkDictionary.keys[index];
                if (commentMarkDictionary.get(element).length == 1) {
                    if (commentMarkDictionary.get(element)[0].commentMark) {
                        if (commentMarkDictionary.get(element)[0].commentMark.firstElementChild.classList.contains('e-de-multi-cmt-mark')) {
                            ej2_base_1.classList(commentMarkDictionary.get(element)[0].commentMark.firstElementChild, ['e-de-cmt-mark-icon'], ['e-de-multi-cmt-mark']);
                        }
                    }
                }
                if (commentMarkDictionary.get(element).length > 1) {
                    for (var z = 0; z < commentMarkDictionary.get(element).length; z++) {
                        if (commentMarkDictionary.get(element)[z].commentMark) {
                            if (commentMarkDictionary.get(element)[z].commentMark.firstElementChild.classList.contains('e-de-cmt-mark-icon')) {
                                ej2_base_1.classList(commentMarkDictionary.get(element)[z].commentMark.firstElementChild, ['e-de-multi-cmt-mark'], ['e-de-cmt-mark-icon']);
                            }
                        }
                    }
                }
            }
        };
        CommentCharacterElementBox.prototype.elementsOverlap = function (elementOne, top, left) {
            var width = elementOne.offsetWidth;
            var height = elementOne.offsetHeight;
            var elementOneTop = parseFloat(elementOne.style.top);
            var elementOneLeft = parseFloat(elementOne.style.left);
            var elementOneBottom = elementOneTop + height;
            var elementOneRight = elementOneLeft + width;
            var elementTwoTop = parseFloat(top);
            var elementTwoLeft = parseFloat(left);
            var elementTwoBottom = elementTwoTop + height;
            var elementTwoRight = elementTwoLeft + width;
            return !(elementOneTop > elementTwoBottom ||
                elementOneRight < elementTwoLeft ||
                elementOneBottom < elementTwoTop ||
                elementOneLeft > elementTwoRight);
        };
        CommentCharacterElementBox.prototype.selectComment = function () {
            var documentHelper = this.line.paragraph.bodyWidget.page.documentHelper;
            var commentMarkDictionary = documentHelper.render.commentMarkDictionary;
            var topPosition = this.commentMark.style.top;
            var leftPosition = this.commentMark.style.left;
            var currentIndex = 0;
            var navigationArray = [];
            for (var index = 0; index < commentMarkDictionary.keys.length; index++) {
                if (this.elementsOverlap(commentMarkDictionary.keys[index], topPosition, leftPosition)) {
                    navigationArray = commentMarkDictionary.get(commentMarkDictionary.keys[index]);
                    break;
                }
            }
            if (!documentHelper.owner.documentHelper.currentSelectedComment) {
                currentIndex = 0;
            }
            else {
                for (var index = 0; index < navigationArray.length; index++) {
                    if (navigationArray[index].comment === documentHelper.owner.documentHelper.currentSelectedComment) {
                        currentIndex = index;
                        break;
                    }
                }
                if (currentIndex < (navigationArray.length - 1)) {
                    currentIndex += 1;
                }
                else {
                    currentIndex = 0;
                }
            }
            if (documentHelper.owner) {
                if (!documentHelper.owner.commentReviewPane.commentPane.isEditMode) {
                    documentHelper.selectComment(navigationArray[currentIndex].comment);
                }
                else {
                    documentHelper.owner.showComments = true;
                }
            }
        };
        CommentCharacterElementBox.prototype.removeCommentMark = function () {
            if (this.commentMark && this.commentMark.parentElement) {
                this.commentMark.removeEventListener('click', this.selectComment.bind(this));
                this.commentMark.parentElement.removeChild(this.commentMark);
            }
        };
        CommentCharacterElementBox.prototype.destroy = function () {
            if (this.commentMark) {
                this.removeCommentMark();
            }
            this.commentMark = undefined;
            this.commentInternal = undefined;
            this.commentId = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return CommentCharacterElementBox;
    }(ElementBox));
    exports.CommentCharacterElementBox = CommentCharacterElementBox;
    var CommentElementBox = (function (_super) {
        __extends(CommentElementBox, _super);
        function CommentElementBox(date) {
            var _this = _super.call(this, 0) || this;
            _this.authorIn = '';
            _this.initialIn = '';
            _this.done = false;
            _this.textIn = '';
            _this.isReply = false;
            _this.ownerComment = undefined;
            _this.createdDate = date;
            _this.replyComments = [];
            return _this;
        }
        Object.defineProperty(CommentElementBox.prototype, "commentStart", {
            get: function () {
                return this.commentStartIn;
            },
            set: function (value) {
                this.commentStartIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommentElementBox.prototype, "commentEnd", {
            get: function () {
                return this.commentEndIn;
            },
            set: function (value) {
                this.commentEndIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommentElementBox.prototype, "author", {
            get: function () {
                return this.authorIn;
            },
            set: function (value) {
                this.authorIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommentElementBox.prototype, "initial", {
            get: function () {
                return this.initialIn;
            },
            set: function (value) {
                this.initialIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommentElementBox.prototype, "isResolved", {
            get: function () {
                return this.done;
            },
            set: function (value) {
                this.done = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommentElementBox.prototype, "date", {
            get: function () {
                return this.createdDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CommentElementBox.prototype, "text", {
            get: function () {
                return this.textIn;
            },
            set: function (value) {
                this.textIn = value;
            },
            enumerable: true,
            configurable: true
        });
        CommentElementBox.prototype.getLength = function () {
            return 1;
        };
        CommentElementBox.prototype.clone = function () {
            var comment = new CommentElementBox(this.date);
            comment.author = this.author;
            comment.initial = this.initial;
            comment.commentId = this.commentId;
            comment.replyComments = this.replyComments;
            comment.isResolved = this.isResolved;
            comment.text = this.text;
            return comment;
        };
        CommentElementBox.prototype.destroy = function () {
            if (this.replyComments && this.replyComments.length > 0) {
                for (var i = 0; i < this.replyComments.length; i++) {
                    var replyComment = this.replyComments[i];
                    replyComment.destroy();
                }
                this.replyComments = [];
            }
            this.replyComments = undefined;
            if (this.commentStartIn) {
                this.commentStartIn.destroy();
                this.commentStartIn = undefined;
            }
            if (this.commentEndIn) {
                this.commentEndIn.destroy();
                this.commentEndIn = undefined;
            }
            this.commentId = undefined;
            this.createdDate = undefined;
            this.initialIn = undefined;
            this.textIn = undefined;
            this.authorIn = undefined;
            this.ownerComment = undefined;
            _super.prototype.destroy.call(this);
        };
        return CommentElementBox;
    }(CommentCharacterElementBox));
    exports.CommentElementBox = CommentElementBox;
    var Page = (function () {
        function Page(documentHelper) {
            this.boundingRectangle = new Rect(96, 96, 816, 1056);
            this.repeatHeaderRowTableWidget = false;
            this.bodyWidgets = [];
            this.headerWidgetIn = undefined;
            this.footerWidgetIn = undefined;
            this.footnoteWidget = undefined;
            this.endnoteWidget = undefined;
            this.currentPageNum = 1;
            this.allowNextPageRendering = true;
            this.documentHelper = documentHelper;
        }
        Object.defineProperty(Page.prototype, "headerWidget", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.headerWidgetIn)) {
                    if (this.headerWidgetIn.parentHeaderFooter) {
                        return this.headerWidgetIn.parentHeaderFooter;
                    }
                }
                return this.headerWidgetIn;
            },
            set: function (value) {
                this.headerWidgetIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "footerWidget", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.footerWidgetIn)) {
                    if (this.footerWidgetIn.parentHeaderFooter) {
                        return this.footerWidgetIn.parentHeaderFooter;
                    }
                }
                return this.footerWidgetIn;
            },
            set: function (value) {
                this.footerWidgetIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "index", {
            get: function () {
                if (this.documentHelper) {
                    return this.documentHelper.pages.indexOf(this);
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "previousPage", {
            get: function () {
                var index = this.index;
                if (index > 0) {
                    return this.documentHelper.pages[index - 1];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "nextPage", {
            get: function () {
                var index = this.index;
                if (index < this.documentHelper.pages.length - 1) {
                    return this.documentHelper.pages[index + 1];
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "sectionIndex", {
            get: function () {
                if (this.bodyWidgets.length > 0) {
                    return this.bodyWidgets[0].index;
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Page.prototype, "viewer", {
            get: function () {
                return this.documentHelper.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        Page.prototype.destroy = function () {
            if (this.headerWidget && this.headerWidget.page === this) {
                this.headerWidget.page = undefined;
            }
            if (this.footerWidget && this.footerWidget.page === this) {
                this.footerWidget.page = undefined;
            }
            if (this.headerWidgetIn && !ej2_base_1.isNullOrUndefined(this.headerWidgetIn.parentHeaderFooter)) {
                if (this.viewer && this.documentHelper.owner.editor) {
                    this.documentHelper.owner.editor.removeFieldInWidget(this.headerWidgetIn);
                    this.documentHelper.owner.editor.removeFieldInWidget(this.headerWidgetIn, false, true);
                }
                this.headerWidgetIn.destroy();
                this.headerWidget = undefined;
            }
            if (this.footerWidgetIn && !ej2_base_1.isNullOrUndefined(this.footerWidgetIn.parentHeaderFooter)) {
                if (this.viewer && this.documentHelper.owner.editor) {
                    this.documentHelper.owner.editor.removeFieldInWidget(this.footerWidgetIn);
                    this.documentHelper.owner.editor.removeFieldInWidget(this.footerWidgetIn, false, true);
                }
                this.footerWidgetIn.destroy();
                this.footerWidgetIn = undefined;
            }
            this.bodyWidgets = [];
            this.bodyWidgets = undefined;
            if (!ej2_base_1.isNullOrUndefined(this.documentHelper)) {
                if (!ej2_base_1.isNullOrUndefined(this.documentHelper.pages)) {
                    this.documentHelper.removePage(this);
                }
            }
            this.documentHelper = undefined;
        };
        Page.prototype.componentDestroy = function () {
            if (this.headerWidgetIn) {
                this.headerWidgetIn.componentDestroy();
                this.headerWidgetIn = undefined;
            }
            if (this.footerWidgetIn) {
                this.footerWidgetIn.componentDestroy();
                this.footerWidgetIn = undefined;
            }
            if (this.bodyWidgets) {
                for (var i = 0; i < this.bodyWidgets.length; i++) {
                    var bodyWidget = this.bodyWidgets[i];
                    bodyWidget.componentDestroy();
                }
                this.bodyWidgets = [];
                this.bodyWidgets = undefined;
            }
            this.documentHelper = undefined;
        };
        return Page;
    }());
    exports.Page = Page;
    var WTableHolder = (function () {
        function WTableHolder() {
            this.tableColumns = [];
            this.tableWidth = 0;
        }
        Object.defineProperty(WTableHolder.prototype, "columns", {
            get: function () {
                return this.tableColumns;
            },
            enumerable: true,
            configurable: true
        });
        WTableHolder.prototype.resetColumns = function () {
            for (var i = 0; i < this.tableColumns.length; i++) {
                this.tableColumns[i].destroy();
            }
            this.tableColumns = [];
        };
        WTableHolder.prototype.getPreviousSpannedCellWidth = function (previousColumnIndex, curColumnIndex) {
            var width = 0;
            for (var i = previousColumnIndex; i < curColumnIndex; i++) {
                width += this.tableColumns[i].preferredWidth;
            }
            return width;
        };
        WTableHolder.prototype.addColumns = function (currentColumnIndex, columnSpan, width, sizeInfo, offset, preferredWidthType) {
            for (var i = this.columns.length; i < columnSpan; i++) {
                this.columns.push(new WColumn());
            }
            var availableWidth = 0;
            for (var j = currentColumnIndex; j < columnSpan; j++) {
                availableWidth += this.columns[j].preferredWidth;
            }
            var gridSpan = columnSpan - currentColumnIndex;
            if (!(gridSpan > 1) && availableWidth < width) {
                this.columns[columnSpan - 1].preferredWidth += (width - availableWidth);
            }
            if (sizeInfo.minimumWordWidth > this.columns[columnSpan - 1].minimumWordWidth) {
                this.columns[columnSpan - 1].minimumWordWidth = sizeInfo.minimumWordWidth;
            }
            if (sizeInfo.maximumWordWidth > this.columns[columnSpan - 1].maximumWordWidth) {
                this.columns[columnSpan - 1].maximumWordWidth = sizeInfo.maximumWordWidth;
            }
            if (sizeInfo.minimumWidth > this.columns[columnSpan - 1].minimumWidth) {
                this.columns[columnSpan - 1].minimumWidth = sizeInfo.minimumWidth;
            }
            if (offset > this.columns[columnSpan - 1].endOffset) {
                this.columns[columnSpan - 1].endOffset = offset;
            }
            this.columns[columnSpan - 1].widthType = preferredWidthType;
        };
        WTableHolder.prototype.getTotalWidth = function (type) {
            var width = 0;
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                width += type === 0 ? column.preferredWidth :
                    type === 1 ? column.minimumWordWidth :
                        type === 2 ? column.maximumWordWidth : column.minimumWidth;
            }
            return width;
        };
        WTableHolder.prototype.isFitColumns = function (containerWidth, preferredTableWidth, isAutoWidth) {
            var totalColumnWidth = this.getTotalWidth(0);
            if (isAutoWidth) {
                this.tableWidth = preferredTableWidth > totalColumnWidth ? totalColumnWidth : preferredTableWidth;
            }
            else {
                this.tableWidth = preferredTableWidth;
            }
            if (totalColumnWidth !== this.tableWidth) {
                var factor = this.tableWidth / totalColumnWidth;
                factor = isNaN(factor) || factor === Infinity ? 1 : factor;
                for (var i = 0; i < this.columns.length; i++) {
                    var column = this.columns[i];
                    if (factor * column.preferredWidth < column.minWidth) {
                        return false;
                    }
                }
                return true;
            }
            else {
                return true;
            }
        };
        WTableHolder.prototype.isAllColumnHasPointWidthType = function () {
            var isPointWidthType = true;
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].widthType != 'Point') {
                    isPointWidthType = false;
                }
            }
            return isPointWidthType;
        };
        WTableHolder.prototype.autoFitColumn = function (containerWidth, preferredTableWidth, isAuto, isNestedTable, isAutoFit, hasSpannedCells, indent, pageContainerWidth) {
            var maxTotal = 0;
            var minTotal = 0;
            var remainingWidthTotal = 0;
            var isAllColumnPointWidth = true;
            var minWidthExceedCellWidth = 0;
            var columnIndexCollection = [];
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                if (column.minimumWordWidth === 0 && column.maximumWordWidth === 0 && column.minWidth === 0) {
                    column.minimumWordWidth = column.preferredWidth;
                    column.maximumWordWidth = column.preferredWidth;
                    column.minWidth = column.preferredWidth;
                }
                if (column.widthType !== 'Point') {
                    isAllColumnPointWidth = false;
                }
                var difference = 0;
                maxTotal += column.preferredWidth > column.maximumWordWidth ? column.preferredWidth : column.maximumWordWidth;
                minTotal += column.preferredWidth > column.minimumWordWidth ? column.preferredWidth : column.minimumWordWidth;
                var preferred = column.preferredWidth === 0 ? column.minimumWordWidth : column.preferredWidth > column.minimumWordWidth ? column.preferredWidth : column.minimumWordWidth;
                difference = column.maximumWordWidth - preferred;
                remainingWidthTotal += difference > 0 ? difference : 0;
                if (column.preferredWidth < column.minimumWordWidth) {
                    minWidthExceedCellWidth += column.minimumWordWidth - column.preferredWidth;
                }
                else {
                    columnIndexCollection.push(i);
                }
            }
            if (maxTotal <= preferredTableWidth) {
                for (var i = 0; i < this.columns.length; i++) {
                    var column = this.columns[i];
                    if (column.widthType === 'Point') {
                        if (column.preferredWidth < column.minimumWordWidth) {
                            column.preferredWidth = column.minimumWordWidth;
                        }
                        continue;
                    }
                    if (column.preferredWidth < column.maximumWordWidth) {
                        column.preferredWidth = column.maximumWordWidth;
                    }
                }
                if (!isAuto) {
                    this.fitColumns(containerWidth, preferredTableWidth, isAuto, isAutoFit);
                }
            }
            else {
                var totalPreferredWidth = this.getTotalWidth(0);
                if (isAllColumnPointWidth && !hasSpannedCells) {
                    if (minTotal > containerWidth) {
                        if (containerWidth > totalPreferredWidth) {
                            minWidthExceedCellWidth -= (containerWidth - (totalPreferredWidth));
                        }
                        if (columnIndexCollection.length > 0 && minWidthExceedCellWidth > 0) {
                            var averageWidth = minWidthExceedCellWidth / columnIndexCollection.length;
                            for (var i = 0; i < this.columns.length; i++) {
                                var column = this.columns[i];
                                if (columnIndexCollection.indexOf(i) === -1) {
                                    column.preferredWidth = column.minimumWordWidth;
                                }
                                else {
                                    column.preferredWidth = (column.preferredWidth - averageWidth);
                                }
                            }
                            totalPreferredWidth = this.getTotalWidth(0);
                        }
                    }
                }
                if (!isAuto) {
                    var considerMinAsTableWidth = false;
                    if ((preferredTableWidth < minTotal && minTotal + (ej2_base_1.isNullOrUndefined(indent) ? 0 : indent) < containerWidth)) {
                        considerMinAsTableWidth = true;
                    }
                    this.fitColumns(containerWidth, considerMinAsTableWidth ? minTotal : preferredTableWidth, isAuto, isAutoFit);
                    return;
                }
                if (minTotal <= preferredTableWidth || minTotal <= containerWidth) {
                    var availableWidth = containerWidth > preferredTableWidth ? containerWidth : preferredTableWidth;
                    availableWidth = availableWidth - minTotal;
                    for (var i = 0; i < this.columns.length; i++) {
                        var column = this.columns[i];
                        if (column.widthType === 'Point') {
                            continue;
                        }
                        if (column.preferredWidth === 0) {
                            column.preferredWidth = column.minimumWordWidth;
                        }
                        else {
                            if (column.preferredWidth < column.minimumWordWidth) {
                                column.preferredWidth = column.minimumWordWidth;
                            }
                        }
                        var difference = column.maximumWordWidth - column.preferredWidth;
                        difference = difference > 0 ? difference : 0;
                        var factor = availableWidth * (difference / remainingWidthTotal);
                        column.preferredWidth += isNaN(factor) ? 0 : factor;
                    }
                }
                else {
                    var totalMinimumWordWidth = this.getTotalWidth(1);
                    var totalMinWidth = this.getTotalWidth(3);
                    if (totalMinWidth > 2112) {
                        var cellWidth = 2112 / this.columns.length;
                        for (var i = 0; i < this.columns.length; i++) {
                            this.columns[i].preferredWidth = cellWidth;
                        }
                    }
                    else {
                        var availableWidth = 0;
                        if (((totalMinWidth < containerWidth) && ((containerWidth - totalMinWidth) >= 1) && !isAllColumnPointWidth)
                            || (isAllColumnPointWidth && !hasSpannedCells && totalMinimumWordWidth > containerWidth)) {
                            availableWidth = containerWidth - totalMinWidth;
                            for (var i = 0; i < this.columns.length; i++) {
                                var column = this.columns[i];
                                var factor = availableWidth * column.minimumWordWidth / totalMinimumWordWidth;
                                factor = isNaN(factor) ? 0 : factor;
                                column.preferredWidth = (column.minimumWidth == 0 ? 1 : column.minimumWidth) + factor;
                            }
                        }
                        else if (totalPreferredWidth > containerWidth) {
                            var factor = containerWidth / totalPreferredWidth;
                            for (var i = 0; i < this.columns.length; i++) {
                                var column = this.columns[i];
                                column.preferredWidth = column.preferredWidth * factor;
                            }
                        }
                    }
                }
            }
            this.tableWidth = this.getTotalWidth(0);
        };
        WTableHolder.prototype.getValidColumnIndex = function (index) {
            var endOffset = 0;
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                if (i < index) {
                    endOffset = column.endOffset;
                }
                else if (endOffset === column.endOffset) {
                    index++;
                }
                else {
                    break;
                }
            }
            return index;
        };
        WTableHolder.prototype.fitColumns = function (containerWidth, preferredTableWidth, isAutoWidth, isAutoFit, indent) {
            if (ej2_base_1.isNullOrUndefined(indent)) {
                indent = 0;
            }
            var totalColumnWidth = this.getTotalWidth(0);
            if (isAutoWidth) {
                totalColumnWidth -= indent;
            }
            if (isAutoWidth) {
                this.tableWidth = totalColumnWidth;
            }
            else {
                this.tableWidth = preferredTableWidth;
            }
            if (totalColumnWidth !== this.tableWidth) {
                var factor = this.tableWidth / totalColumnWidth;
                factor = isNaN(factor) || factor === Infinity ? 1 : factor;
                for (var i = 0; i < this.columns.length; i++) {
                    var column = this.columns[i];
                    if (column.widthType === 'Percent' && !isAutoWidth && !isAutoFit && totalColumnWidth > this.tableWidth) {
                        if (i !== 0 && column.endOffset > this.tableWidth) {
                            var totalCellWidth = this.getCellWidth(0, i + 1, preferredTableWidth);
                            if (totalCellWidth > this.tableWidth) {
                                column.preferredWidth -= (totalCellWidth - this.tableWidth);
                                if (column.preferredWidth === 0 || column.preferredWidth < column.minimumWidth) {
                                    column.preferredWidth = column.minimumWidth > 0 ? column.minimumWidth : 1;
                                    this.columns[0].preferredWidth -= column.preferredWidth;
                                }
                            }
                        }
                    }
                    else {
                        column.preferredWidth = factor * column.preferredWidth;
                    }
                }
            }
        };
        WTableHolder.prototype.getCellWidth = function (columnIndex, columnSpan, preferredTableWidth) {
            var width = 0;
            for (var i = 0; i < columnSpan; i++) {
                width += this.tableColumns[i + columnIndex].preferredWidth;
            }
            return width;
        };
        WTableHolder.prototype.validateColumnWidths = function () {
            for (var i = 0; i < this.columns.length; i++) {
                if (i === 0) {
                    if (this.columns[i].preferredWidth !== this.columns[i].endOffset) {
                        this.columns[i].preferredWidth = this.columns[i].endOffset;
                    }
                }
                else {
                    if (this.columns[i - 1].endOffset + this.columns[i].preferredWidth < this.columns[i].endOffset) {
                        if (this.columns[i - 1].endOffset === 0) {
                            this.columns[i].preferredWidth = this.columns[i].endOffset - this.getPreviousValidOffset(i - 2);
                        }
                        else {
                            this.columns[i].preferredWidth = this.columns[i].endOffset - this.columns[i - 1].endOffset;
                        }
                    }
                }
            }
        };
        WTableHolder.prototype.getPreviousValidOffset = function (columnIndex) {
            for (var j = columnIndex; j >= 0; j--) {
                if (this.columns[j].endOffset !== 0) {
                    return this.columns[j].endOffset;
                }
            }
            return 0;
        };
        WTableHolder.prototype.clone = function () {
            var tableHolder = new WTableHolder();
            tableHolder.tableWidth = this.tableWidth;
            for (var i = 0; i < this.columns.length; i++) {
                tableHolder.columns.push(this.columns[i].clone());
            }
            return tableHolder;
        };
        WTableHolder.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.tableColumns)) {
                for (var i = 0; i < this.tableColumns.length; i++) {
                    var column = this.tableColumns[i];
                    column.destroy();
                }
            }
            this.tableColumns = [];
            this.tableColumns = undefined;
            this.tableWidth = undefined;
        };
        return WTableHolder;
    }());
    exports.WTableHolder = WTableHolder;
    var WColumn = (function () {
        function WColumn() {
            this.preferredWidth = 0;
            this.minWidth = 0;
            this.maxWidth = 0;
            this.endOffset = 0;
            this.minimumWordWidth = 0;
            this.maximumWordWidth = 0;
            this.minimumWidth = 0;
        }
        WColumn.prototype.clone = function () {
            var column = new WColumn();
            column.preferredWidth = this.preferredWidth;
            column.minWidth = this.minWidth;
            column.maxWidth = this.maxWidth;
            return column;
        };
        WColumn.prototype.destroy = function () {
            this.preferredWidth = undefined;
            this.minWidth = undefined;
            this.maxWidth = undefined;
        };
        return WColumn;
    }());
    exports.WColumn = WColumn;
    var ColumnSizeInfo = (function () {
        function ColumnSizeInfo() {
            this.minimumWordWidth = 0;
            this.maximumWordWidth = 0;
            this.minimumWidth = 0;
            this.hasMinimumWidth = false;
            this.hasMinimumWordWidth = false;
            this.hasMaximumWordWidth = false;
        }
        return ColumnSizeInfo;
    }());
    exports.ColumnSizeInfo = ColumnSizeInfo;
    var CommentEditInfo = (function () {
        function CommentEditInfo() {
        }
        return CommentEditInfo;
    }());
    exports.CommentEditInfo = CommentEditInfo;
    var BreakElementBox = (function (_super) {
        __extends(BreakElementBox, _super);
        function BreakElementBox() {
            return _super.call(this) || this;
        }
        BreakElementBox.prototype.clone = function () {
            var breakElement = _super.prototype.clone.call(this);
            breakElement.breakClearType = this.breakClearType;
            return breakElement;
        };
        BreakElementBox.prototype.destroy = function () {
            this.breakClearType = undefined;
            _super.prototype.destroy.call(this);
        };
        BreakElementBox.prototype.componentDestroy = function () {
            this.breakClearType = undefined;
            _super.prototype.componentDestroy.call(this);
        };
        return BreakElementBox;
    }(TextElementBox));
    exports.BreakElementBox = BreakElementBox;
    var TabStopListInfo = (function () {
        function TabStopListInfo() {
        }
        return TabStopListInfo;
    }());
    exports.TabStopListInfo = TabStopListInfo;
});
