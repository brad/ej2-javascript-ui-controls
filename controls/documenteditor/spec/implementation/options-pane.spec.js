define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../test-helper.spec", "../../src/index", "../../src/document-editor/implementation/search/index"], function (require, exports, document_editor_1, ej2_base_1, ej2_base_2, test_helper_spec_1, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getEventObject(eventType, eventName) {
        var event = document.createEvent(eventType);
        event.initEvent(eventName, true, true);
        var object = ej2_base_2.extend({}, event);
        object.preventDefault = function () { return true; };
        return object;
    }
    describe('Close Options pane support testing', function () {
        var editor = undefined;
        var optionsPane;
        var documentHelper;
        ;
        var keydown = getEventObject('KeyboardEvent', 'keydown');
        beforeEach(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            document_editor_1.DocumentEditor.Inject(index_1.OptionsPane, index_2.Search);
            editor = new document_editor_1.DocumentEditor({ enableOptionsPane: true, enableSelection: true, isReadOnly: false, enableSearch: true });
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            optionsPane = editor.optionsPaneModule;
        });
        afterEach(function (done) {
            document.body.removeChild(document.getElementById('container'));
            editor.destroy();
            optionsPane.destroy();
            editor = undefined;
            documentHelper = undefined;
            setTimeout(function () {
                done();
            }, 500);
        });
        it('destroy method validation1', function () {
            console.log('destroy method validation1');
            optionsPane.searchText = undefined;
            optionsPane.resultsText = undefined;
            optionsPane.messageDivText = undefined;
            optionsPane.destroy();
        });
    });
});
