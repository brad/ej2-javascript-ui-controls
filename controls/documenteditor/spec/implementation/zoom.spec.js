define(["require", "exports", "../../src/document-editor/document-editor", "@syncfusion/ej2-base", "../../src/document-editor/implementation/viewer/zooming", "../test-helper.spec"], function (require, exports, document_editor_1, ej2_base_1, zooming_1, test_helper_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Zoom constructor and Possible value checking - 1', function () {
        var editor;
        var zoomModule;
        var documentHelper;
        beforeAll(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor();
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterAll(function (done) {
            editor.documentHelper.zoomFactor = 1;
            editor.destroy();
            editor = undefined;
            zoomModule = undefined;
            document.body.removeChild(document.getElementById('container'));
            document.body.innerHTML = '';
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Zoomfactor with possible value As 1 checking', function () {
            console.log('Zoomfactor with possible value As 1 checking');
            editor.documentHelper.zoomFactor = 1;
            expect(editor.documentHelper.zoomFactor).toBe(1);
        });
        it('Zoomfactor with possible value as 0 checking', function (done) {
            console.log('Zoomfactor with possible value as 0 checking');
            editor.documentHelper.zoomFactor = 0;
            setTimeout(function () {
                expect(editor.documentHelper.zoomFactor).toBe(0.1);
                done();
            }, 100);
        });
        it('Zoomfactor with possible value greater than 5 checking', function (done) {
            console.log('Zoomfactor with possible value greater than 5 checking');
            editor.documentHelper.zoomFactor = 5.1;
            setTimeout(function () {
                expect(editor.documentHelper.zoomFactor).toBe(5);
                done();
            }, 100);
        });
        it('Zoomfactor with possible value as 3 checking', function (done) {
            console.log('Zoomfactor with possible value as 3 checking');
            editor.documentHelper.zoomFactor = 3;
            setTimeout(function () {
                expect(editor.documentHelper.zoomFactor).toBe(3);
                done();
            }, 100);
        });
    });
    describe('Zoom Module- Mouse wheel event testing-1', function () {
        var editor;
        var zoomModule;
        beforeEach(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor();
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
        });
        afterEach(function (done) {
            editor.documentHelper.zoomFactor = 1;
            editor.destroy();
            editor = undefined;
            zoomModule = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Mouse Wheel Event with control pressed false', function (done) {
            console.log('Mouse Wheel Event with control pressed false');
            var event = { pageX: 250, pageY: 120, preventDefault: function () { }, ctrlKey: true, deltaY: -1 };
            editor.documentHelper.zoomModule.onMouseWheelInternal(event);
            setTimeout(function () {
                expect(editor.documentHelper.zoomFactor).toBe(1.1);
                done();
            }, 100);
        });
        it('Mouse Wheel Event with control pressed true with zoomactor negative', function () {
            console.log('Mouse Wheel Event with control pressed true with zoomactor negative');
            editor.documentHelper.zoomFactor = -0.1;
            var event = { pageX: 250, pageY: 120, preventDefault: function () { }, ctrlKey: true, deltaY: 0 };
            editor.documentHelper.zoomModule.onMouseWheelInternal(event);
            expect(editor.documentHelper.zoomFactor).toBe(0.1);
        });
        it('Mouse Wheel Event with control pressed true with zoom factor 1', function () {
            console.log('Mouse Wheel Event with control pressed true with zoom factor 1');
            var event = { pageX: 250, pageY: 120, preventDefault: function () { }, ctrlKey: true, deltaY: 0 };
            editor.documentHelper.zoomModule.onMouseWheelInternal(event);
            expect(editor.documentHelper.zoomFactor).toBe(0.9);
        });
    });
    describe('Zoom Module- Mouse wheel event testing-2', function () {
        var editor;
        var originalTimeout;
        var documentHelper;
        var zoomModule;
        beforeEach(function () {
            editor = undefined;
            var ele = ej2_base_1.createElement('div', { id: 'container' });
            document.body.appendChild(ele);
            editor = new document_editor_1.DocumentEditor();
            editor.documentHelper.containerCanvasIn = test_helper_spec_1.TestHelper.containerCanvas;
            editor.documentHelper.selectionCanvasIn = test_helper_spec_1.TestHelper.selectionCanvas;
            editor.documentHelper.render.pageCanvasIn = test_helper_spec_1.TestHelper.pageCanvas;
            editor.documentHelper.render.selectionCanvasIn = test_helper_spec_1.TestHelper.pageSelectionCanvas;
            editor.appendTo('#container');
            documentHelper = editor.documentHelper;
        });
        afterEach(function (done) {
            editor.documentHelper.zoomFactor = 1;
            editor.destroy();
            editor = undefined;
            zoomModule = undefined;
            document.body.removeChild(document.getElementById('container'));
            setTimeout(function () {
                done();
            }, 1000);
        });
        it('Mouse Wheel Event with control pressed false', function () {
            console.log('Mouse Wheel Event with control pressed false');
            var event = { pageX: 250, pageY: 120, preventDefault: function () { }, ctrlKey: false, deltaY: 5 };
            editor.documentHelper.zoomModule.onMouseWheelInternal(event);
            expect(editor.documentHelper.zoomFactor).toBe(1);
        });
        it('Mouse Wheel Event with control pressed true with zoomfactor 6', function () {
            console.log('Mouse Wheel Event with control pressed true with zoomfactor 6');
            zoomModule = new zooming_1.Zoom(editor.documentHelper);
            editor.documentHelper.zoomFactor = 6;
            var event = { pageX: 250, pageY: 120, preventDefault: function () { }, ctrlKey: true, deltaY: -1 };
            zoomModule.onMouseWheelInternal(event);
            expect(editor.documentHelper.zoomFactor).toBe(5);
        });
        it('Mouse Wheel Event with control pressed true with pageX large', function () {
            console.log('Mouse Wheel Event with control pressed true with pageX large');
            var event = { pageX: 5000, pageY: 120, preventDefault: function () { }, ctrlKey: true, deltaY: 5 };
            editor.documentHelper.zoomModule.onMouseWheelInternal(event);
            expect(editor.documentHelper.zoomFactor).toBe(1);
        });
    });
});
