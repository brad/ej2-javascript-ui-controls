define(["require", "exports", "../../src/index", "@syncfusion/ej2-base", "./../test-helper.spec", "../../src/document-editor/base/ajax-helper", "../../src/document-editor/implementation/text-helper/regular", "./../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, index_1, ej2_base_1, test_helper_spec_1, ajax_helper_1, regular_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Header Ajax value checking', function () {
        var editor;
        beforeAll(function () {
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new index_1.DocumentEditor({});
            index_1.DocumentEditor.Inject(regular_1.Regular);
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo("#container");
        });
        afterAll(function (done) {
            editor.destroy();
            document.body.removeChild(document.getElementById('container'));
            editor = undefined;
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('header value checking', function () {
            console.log('header value checking');
            editor.headers = [{ "syncfusion": "true" }];
            var httpRequest = new ajax_helper_1.XmlHttpRequestHandler();
            httpRequest.customHeaders = editor.headers;
            var httprequestEventArgs = { serverActionType: 'Import', headers: editor.headers, timeout: 0, cancel: false, withCredentials: true };
            var formObject = {};
            expect(function () {
                httpRequest.send(formObject, httprequestEventArgs);
                expect(httpRequest.xmlHttpRequest.withCredentials).toEqual(true);
                console.log(httpRequest.xmlHttpRequest.getAllResponseHeaders());
            }).not.toThrowError();
        });
    });
});
