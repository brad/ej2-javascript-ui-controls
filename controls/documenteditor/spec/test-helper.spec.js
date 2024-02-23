define(["require", "exports", "../src/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestHelper = (function () {
        function TestHelper() {
        }
        Object.defineProperty(TestHelper, "containerCanvas", {
            get: function () {
                if (TestHelper.c1 === undefined) {
                    var documentHelper = new index_1.DocumentHelper(undefined);
                    TestHelper.c1 = documentHelper.containerCanvasIn;
                    documentHelper.destroy();
                }
                return TestHelper.c1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestHelper, "selectionCanvas", {
            get: function () {
                if (TestHelper.c2 === undefined) {
                    var documentHelper = new index_1.DocumentHelper(undefined);
                    TestHelper.c2 = documentHelper.selectionCanvasIn;
                    documentHelper.destroy();
                }
                return TestHelper.c2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestHelper, "pageCanvas", {
            get: function () {
                if (TestHelper.c3 === undefined) {
                    var documentHelper = new index_1.DocumentHelper(undefined);
                    TestHelper.c3 = documentHelper.render.pageCanvasIn;
                    documentHelper.destroy();
                }
                return TestHelper.c3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestHelper, "pageSelectionCanvas", {
            get: function () {
                if (TestHelper.c4 === undefined) {
                    var documentHelper = new index_1.DocumentHelper(undefined);
                    TestHelper.c4 = documentHelper.render.selectionCanvasIn;
                    documentHelper.destroy();
                }
                return TestHelper.c4;
            },
            enumerable: true,
            configurable: true
        });
        return TestHelper;
    }());
    TestHelper.c1 = undefined;
    TestHelper.c2 = undefined;
    TestHelper.c3 = undefined;
    TestHelper.c4 = undefined;
    exports.TestHelper = TestHelper;
});
