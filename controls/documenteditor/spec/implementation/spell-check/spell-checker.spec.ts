import { DocumentEditorContainer, SpellChecker } from '../../../src/index';
import { createElement } from '@syncfusion/ej2-base';

describe('SpellChecker', () => {
    let spellChecker: SpellChecker;
    let container: DocumentEditorContainer;
    let element: HTMLElement;
    let mockXHR: { open: jasmine.Spy, setRequestHeader: jasmine.Spy, send: jasmine.Spy, onreadystatechange: any, readyState: number, status: number, response: string };

    beforeEach(() => {
        mockXHR = {
            open: jasmine.createSpy('open'),
            setRequestHeader: jasmine.createSpy('setRequestHeader'),
            send: jasmine.createSpy('send'),
            onreadystatechange: null,
            readyState: 4,
            status: 200,
            response: 'response'
        };

        spyOn(window, 'XMLHttpRequest').and.callFake(() => mockXHR);
    });

    [
        ['spellCheck', 'SpellCheck', null],
        ['spellCheck', 'spell-check', 'spell-check'],
        ['spellCheckByPage', 'SpellCheckByPage', null],
        ['spellCheckByPage', 'spell-check-by-page', 'spell-check-by-page'],
    ].forEach(([action, expectedPath, path]: [string, string, string?]) => {
        beforeEach(() => {
            element = createElement('div');
            document.body.appendChild(element);
            container = new DocumentEditorContainer({
                serverActionSettings: path ? {
                    [action]: path,
                } : {},
                serviceUrl: 'https://example.com/',
                enableSpellCheck: true,
            });
            container.appendTo(element);
            spellChecker = container.documentEditor.spellChecker;
            spellChecker.enableOptimizedSpellCheck = true;
            spellChecker.allowSpellCheckAndSuggestion = true;
        });

        afterEach((done) => {
            container.destroy();
            document.body.removeChild(element);
            document.body.innerHTML = '';
            element = undefined;
            container = undefined;
            setTimeout(function () {
                done();
            }, 1000);
        });

        it('should call spell checker', (done) => {
            console.log('should call spell checker with action: ' + action + ', path: ' + expectedPath);
            const isByPage = action === 'spellCheckByPage';
            spellChecker.callSpellChecker(1, 'word', true, true, false, isByPage).then((result: any) => {
                expect(mockXHR.open).toHaveBeenCalledWith(
                    'POST',
                    jasmine.stringMatching('https://example.com/' + expectedPath),
                    true);
                expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
                expect(mockXHR.send).toHaveBeenCalled();
                expect(result).toBe('response');
                done();
            });

            // Simulate successful HTTP request
            mockXHR.onreadystatechange();
        });

        it('should handle HTTP request failure', (done) => {
            console.log('should handle HTTP request failure with action: ' + action + ', path: ' + expectedPath);
            const isByPage = action === 'spellCheckByPage';
            spellChecker.callSpellChecker(1, 'word', true, true, true, isByPage).catch((error: any) => {
                expect(error).toBe('response');
                done();
            });

            // Simulate failed HTTP request
            mockXHR.status = 500;
            mockXHR.onreadystatechange();
        });
    });
});