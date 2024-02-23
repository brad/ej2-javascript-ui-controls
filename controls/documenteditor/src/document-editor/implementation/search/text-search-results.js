define(["require", "exports", "@syncfusion/ej2-base", "./text-search-result"], function (require, exports, ej2_base_1, text_search_result_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextSearchResults = (function () {
        function TextSearchResults(owner) {
            this.currentIndex = -1;
            this.owner = owner;
        }
        Object.defineProperty(TextSearchResults.prototype, "length", {
            get: function () {
                if (this.innerList === undefined) {
                    return 0;
                }
                return this.innerList.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextSearchResults.prototype, "currentSearchResult", {
            get: function () {
                if (this.innerList === undefined || this.currentIndex < 0 || this.currentIndex >= this.length) {
                    return undefined;
                }
                return this.innerList[this.currentIndex];
            },
            enumerable: true,
            configurable: true
        });
        TextSearchResults.prototype.addResult = function () {
            var textSearchResult = new text_search_result_1.TextSearchResult(this.owner);
            if (ej2_base_1.isNullOrUndefined(this.innerList)) {
                this.innerList = [];
            }
            this.innerList.push(textSearchResult);
            return textSearchResult;
        };
        TextSearchResults.prototype.clearResults = function () {
            this.currentIndex = -1;
            if (!ej2_base_1.isNullOrUndefined(this.innerList)) {
                for (var i = this.innerList.length - 1; i >= 0; i--) {
                    this.innerList[parseInt(i.toString(), 10)].destroy();
                    this.innerList.splice(i, 1);
                }
            }
        };
        TextSearchResults.prototype.indexOf = function (result) {
            if (ej2_base_1.isNullOrUndefined(this.innerList)) {
                return -1;
            }
            return this.innerList.indexOf(result);
        };
        TextSearchResults.prototype.destroy = function () {
            if (!ej2_base_1.isNullOrUndefined(this.innerList)) {
                this.clearResults();
            }
            this.innerList = undefined;
        };
        return TextSearchResults;
    }());
    exports.TextSearchResults = TextSearchResults;
});
