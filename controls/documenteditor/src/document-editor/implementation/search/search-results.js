define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SearchResults = (function () {
        function SearchResults(search) {
            this.searchModule = search;
        }
        Object.defineProperty(SearchResults.prototype, "length", {
            get: function () {
                return this.searchModule.textSearchResults.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SearchResults.prototype, "index", {
            get: function () {
                return this.searchModule.textSearchResults.currentIndex;
            },
            set: function (value) {
                if (this.length === 0 || value < 0 || value > this.searchModule.textSearchResults.length - 1) {
                    return;
                }
                this.searchModule.textSearchResults.currentIndex = value;
                this.navigate();
            },
            enumerable: true,
            configurable: true
        });
        SearchResults.prototype.getTextSearchResultsOffset = function () {
            var index = [];
            var searchIndex;
            for (var i = 0; i < this.searchModule.textSearchResults.innerList.length; i++) {
                searchIndex = this.getOffset(this.searchModule.textSearchResults.innerList[parseInt(i.toString(), 10)]);
                index.push(searchIndex);
            }
            return index;
        };
        SearchResults.prototype.getOffset = function (innerList) {
            var start = innerList.start;
            var end = innerList.end;
            var blockInfo = this.searchModule.documentHelper.owner.selection.getParagraphInfo(start);
            var startIndex = this.searchModule.documentHelper.owner.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            blockInfo = this.searchModule.documentHelper.owner.selection.getParagraphInfo(end);
            var endIndex = this.searchModule.documentHelper.owner.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            return { 'startOffset': startIndex, 'endOffset': endIndex };
        };
        SearchResults.prototype.getModuleName = function () {
            return 'SearchResults';
        };
        SearchResults.prototype.replace = function (textToReplace) {
            if (this.index === -1) {
                return;
            }
            this.searchModule.replaceInternal(textToReplace);
        };
        SearchResults.prototype.replaceAll = function (textToReplace) {
            if (this.index === -1) {
                return;
            }
            this.searchModule.replaceAllInternal(textToReplace);
        };
        SearchResults.prototype.navigate = function () {
            this.searchModule.navigate(this.searchModule.textSearchResults.currentSearchResult);
            this.searchModule.highlight(this.searchModule.textSearchResults);
        };
        SearchResults.prototype.clear = function () {
            this.searchModule.textSearchResults.clearResults();
            this.searchModule.clearSearchHighlight();
            this.searchModule.viewer.renderVisiblePages();
        };
        return SearchResults;
    }());
    exports.SearchResults = SearchResults;
});
