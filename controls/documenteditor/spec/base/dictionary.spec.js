define(["require", "exports", "../../src/document-editor/base/dictionary"], function (require, exports, dictionary_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Dictionary API testing', function () {
        it('item count', function () {
            console.log('item count');
            var dictionary = new dictionary_1.Dictionary();
            dictionary.add(1, 1);
            dictionary.add(2, 2);
            dictionary.add(2, 2);
            expect(dictionary.length).toBe(2);
            expect(dictionary.keys.length).toBe(2);
            expect(dictionary.get(1)).toBe(1);
            expect(function () { dictionary.get(undefined); }).toThrowError();
            expect(function () { dictionary.get(undefined); }).toThrowError();
            expect(function () { dictionary.add(undefined, 2); }).toThrowError();
            dictionary.clear();
            expect(dictionary.add(2, 2)).toBe(1);
        });
        it('Set value in Dictionary', function () {
            console.log('Set value in Dictionary');
            var dictionary = new dictionary_1.Dictionary();
            dictionary.add(1, 1);
            dictionary.add(2, 2);
            dictionary.set(2, 5);
            expect(dictionary.values.length).toBe(2);
            expect(dictionary.get(2)).toBe(5);
            expect(function () { dictionary.set(undefined, 3); }).toThrowError();
            expect(function () { dictionary.set(5, 3); }).toThrowError();
            expect(function () { dictionary.remove(undefined); }).toThrowError();
            expect(function () { dictionary.remove(10); }).toThrowError();
            dictionary.remove(2);
            expect(dictionary.get(10)).toBeUndefined();
        });
        it('Set value in Dictionary', function () {
            console.log('Set value in Dictionary');
            var dictionary = new dictionary_1.Dictionary();
            dictionary.add(1, 1);
            dictionary.add(2, 2);
            dictionary.set(2, 5);
            expect(dictionary.containsKey(2)).toBe(true);
            expect(function () { dictionary.containsKey(undefined); }).toThrowError();
            expect(dictionary.containsKey(6)).toBe(false);
        });
    });
});
