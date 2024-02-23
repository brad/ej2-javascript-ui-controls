define(["require", "exports", "../../../src/index", "@syncfusion/ej2-base"], function (require, exports, index_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('SpellChecker', function () {
        var spellChecker;
        var container;
        var element;
        var mockXHR;
        beforeEach(function () {
            mockXHR = {
                open: jasmine.createSpy('open'),
                setRequestHeader: jasmine.createSpy('setRequestHeader'),
                send: jasmine.createSpy('send'),
                onreadystatechange: null,
                readyState: 4,
                status: 200,
                response: 'response'
            };
            spyOn(window, 'XMLHttpRequest').and.callFake(function () { return mockXHR; });
        });
        [
            ['spellCheck', 'SpellCheck', null],
            ['spellCheck', 'spell-check', 'spell-check'],
            ['spellCheckByPage', 'SpellCheckByPage', null],
            ['spellCheckByPage', 'spell-check-by-page', 'spell-check-by-page'],
        ].forEach(function (_a) {
            var action = _a[0], expectedPath = _a[1], path = _a[2];
            beforeEach(function () {
                element = ej2_base_1.createElement('div');
                document.body.appendChild(element);
                container = new index_1.DocumentEditorContainer({
                    serverActionSettings: path ? (_a = {},
                        _a[action] = path,
                        _a) : {},
                    serviceUrl: 'https://example.com/',
                    enableSpellCheck: true,
                });
                container.appendTo(element);
                spellChecker = container.documentEditor.spellChecker;
                spellChecker.enableOptimizedSpellCheck = true;
                spellChecker.allowSpellCheckAndSuggestion = true;
                var _a;
            });
            afterEach(function (done) {
                container.destroy();
                document.body.removeChild(element);
                document.body.innerHTML = '';
                element = undefined;
                container = undefined;
                setTimeout(function () {
                    done();
                }, 1000);
            });
            it('should call spell checker', function (done) {
                console.log('should call spell checker with action: ' + action + ', path: ' + expectedPath);
                var isByPage = action === 'spellCheckByPage';
                spellChecker.callSpellChecker(1, 'word', true, true, false, isByPage).then(function (result) {
                    expect(mockXHR.open).toHaveBeenCalledWith('POST', jasmine.stringMatching('https://example.com/' + expectedPath), true);
                    expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
                    expect(mockXHR.send).toHaveBeenCalled();
                    expect(result).toBe('response');
                    done();
                });
                mockXHR.onreadystatechange();
            });
            it('should handle HTTP request failure', function (done) {
                console.log('should handle HTTP request failure with action: ' + action + ', path: ' + expectedPath);
                var isByPage = action === 'spellCheckByPage';
                spellChecker.callSpellChecker(1, 'word', true, true, true, isByPage).catch(function (error) {
                    expect(error).toBe('response');
                    done();
                });
                mockXHR.status = 500;
                mockXHR.onreadystatechange();
            });
        });
    });
});
