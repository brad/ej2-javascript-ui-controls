define(["require", "exports", "../../src/index", "../../src/index"], function (require, exports, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Image format validation', function () {
        it('Image format constructor validation', function () {
            console.log('Image format constructor validation');
            var image = new index_1.ImageElementBox(false);
            image.height = 100;
            image.width = 75;
            var imageFormat = new index_2.ImageSizeInfo(image);
            expect(imageFormat.height).toBe(100);
            expect(imageFormat.width).toBe(75);
        });
        it('Image format destroy validation', function () {
            console.log('Image format destroy validation');
            var image = new index_1.ImageElementBox(false);
            image.width = 10;
            image.height = 10;
            var imageFormat = new index_2.ImageSizeInfo(image);
            imageFormat.destroy();
            expect(imageFormat.width).toBe(undefined);
        });
    });
});
