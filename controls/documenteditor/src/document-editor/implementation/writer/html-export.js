define(["require", "exports", "@syncfusion/ej2-base", "../editor/editor-helper", "../../index"], function (require, exports, ej2_base_1, editor_helper_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HtmlExport = (function () {
        function HtmlExport() {
            this.document = undefined;
            this.prevListLevel = undefined;
            this.isOrdered = undefined;
            this.keywordIndex = undefined;
            this.fieldCheck = 0;
        }
        HtmlExport.prototype.writeHtml = function (document, isOptimizeSfdt) {
            this.keywordIndex = isOptimizeSfdt ? 1 : 0;
            this.document = document;
            var html = '';
            if (document.hasOwnProperty(index_1.imagesProperty[this.keywordIndex])) {
                this.serializeImages(document[index_1.imagesProperty[this.keywordIndex]]);
            }
            for (var i = 0; i < document[index_1.sectionsProperty[this.keywordIndex]].length; i++) {
                html += this.serializeSection(document[index_1.sectionsProperty[this.keywordIndex]][i]);
            }
            return html;
        };
        HtmlExport.prototype.serializeImages = function (data) {
            this.images = new index_1.Dictionary();
            for (var img in data) {
                if (Array.isArray(data["" + img])) {
                    this.images.add(parseInt(img), data["" + img]);
                }
                else {
                    var images = [];
                    images.push(data["" + img]);
                    this.images.add(parseInt(img), images);
                }
            }
        };
        HtmlExport.prototype.serializeSection = function (section) {
            var string = '';
            for (var i = 0; i < section[index_1.blocksProperty[this.keywordIndex]].length; i++) {
                var block = section[index_1.blocksProperty[this.keywordIndex]][i];
                if (block.hasOwnProperty(index_1.inlinesProperty[this.keywordIndex])) {
                    string += this.serializeParagraph(block);
                }
                else if (block.hasOwnProperty(index_1.blocksProperty[this.keywordIndex])) {
                    string += this.serializeSection(block);
                }
                else {
                    string += this.closeList();
                    string += this.serializeTable(block);
                }
            }
            string += this.closeList();
            this.prevListLevel = undefined;
            this.isOrdered = undefined;
            return string;
        };
        HtmlExport.prototype.serializeParagraph = function (paragraph) {
            var blockStyle = '';
            var isList = false;
            var isPreviousList = false;
            if (!ej2_base_1.isNullOrUndefined(this.prevListLevel)) {
                isPreviousList = true;
            }
            var tagAttributes = [];
            var listLevel = undefined;
            if (!ej2_base_1.isNullOrUndefined(paragraph[index_1.paragraphFormatProperty[this.keywordIndex]][index_1.listFormatProperty[this.keywordIndex]])) {
                listLevel = this.getListLevel(paragraph);
                if (!isPreviousList) {
                    this.prevListLevel = listLevel;
                }
                if (this.prevListLevel !== listLevel) {
                    isPreviousList = false;
                }
                this.prevListLevel = listLevel;
            }
            if (!isPreviousList) {
                blockStyle += this.closeList();
            }
            if (!ej2_base_1.isNullOrUndefined(listLevel)) {
                isList = true;
            }
            if (isList && !isPreviousList) {
                blockStyle += this.getHtmlList(listLevel, paragraph[index_1.paragraphFormatProperty[this.keywordIndex]][index_1.listFormatProperty[this.keywordIndex]][index_1.listLevelNumberProperty[this.keywordIndex]]);
            }
            tagAttributes.push('style="' + this.serializeParagraphStyle(paragraph, '', isList) + ';' + 'white-space:pre' + '"');
            if (isList) {
                blockStyle += this.createAttributesTag('li', tagAttributes);
            }
            else {
                this.prevListLevel = undefined;
                this.isOrdered = undefined;
                blockStyle += this.createAttributesTag(this.getStyleName(paragraph[index_1.paragraphFormatProperty[this.keywordIndex]][index_1.styleNameProperty[this.keywordIndex]]), tagAttributes);
            }
            if (paragraph[index_1.inlinesProperty[this.keywordIndex]].length === 0) {
                blockStyle += '&nbsp';
            }
            else {
                blockStyle = this.serializeInlines(paragraph, blockStyle);
            }
            if (isList) {
                blockStyle += this.endTag('li');
                if (blockStyle.indexOf('<ul') > -1) {
                    this.isOrdered = false;
                }
                else if (blockStyle.indexOf('<ol') > -1) {
                    this.isOrdered = true;
                }
            }
            else {
                blockStyle += this.endTag(this.getStyleName(paragraph[index_1.paragraphFormatProperty[this.keywordIndex]][index_1.styleNameProperty[this.keywordIndex]]));
            }
            return blockStyle;
        };
        HtmlExport.prototype.closeList = function () {
            var blockStyle = '';
            if (!ej2_base_1.isNullOrUndefined(this.isOrdered)) {
                if (this.isOrdered) {
                    blockStyle = this.endTag('ol');
                }
                else {
                    blockStyle = this.endTag('ul');
                }
                this.isOrdered = undefined;
            }
            return blockStyle;
        };
        HtmlExport.prototype.getListLevel = function (paragraph) {
            var listLevel = undefined;
            var list = undefined;
            for (var i = 0; i < this.document[index_1.listsProperty[this.keywordIndex]].length; i++) {
                if (this.document[index_1.listsProperty[this.keywordIndex]][i][index_1.listIdProperty[this.keywordIndex]] === paragraph[index_1.paragraphFormatProperty[this.keywordIndex]][index_1.listFormatProperty[this.keywordIndex]][index_1.listIdProperty[this.keywordIndex]]) {
                    list = this.document[index_1.listsProperty[this.keywordIndex]][i];
                    break;
                }
            }
            if (list) {
                for (var j = 0; j < this.document[index_1.abstractListsProperty[this.keywordIndex]].length; j++) {
                    if (this.document[index_1.abstractListsProperty[this.keywordIndex]][j][index_1.abstractListIdProperty[this.keywordIndex]] === list[index_1.abstractListIdProperty[this.keywordIndex]]) {
                        var levelNumber = paragraph[index_1.paragraphFormatProperty[this.keywordIndex]][index_1.listFormatProperty[this.keywordIndex]][index_1.listLevelNumberProperty[this.keywordIndex]];
                        listLevel = this.document[index_1.abstractListsProperty[this.keywordIndex]][j][index_1.levelsProperty[this.keywordIndex]][levelNumber];
                        break;
                    }
                }
            }
            return listLevel;
        };
        HtmlExport.prototype.getHtmlList = function (listLevel, levelNumer) {
            var html = '';
            if (listLevel[index_1.listLevelPatternProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 10 : 'Bullet')) {
                html += '<ul type="';
                switch (levelNumer) {
                    case 0:
                        html += 'disc';
                        listLevel[index_1.characterFormatProperty[this.keywordIndex]][index_1.fontFamilyProperty[this.keywordIndex]] = 'Symbol';
                        break;
                    case 1:
                        html += 'circle';
                        listLevel[index_1.characterFormatProperty[this.keywordIndex]][index_1.fontFamilyProperty[this.keywordIndex]] = 'Symbol';
                        break;
                    case 2:
                        html += 'square';
                        listLevel[index_1.characterFormatProperty[this.keywordIndex]][index_1.fontFamilyProperty[this.keywordIndex]] = 'Wingdings';
                        break;
                    default:
                        html += 'disc';
                        listLevel[index_1.characterFormatProperty[this.keywordIndex]][index_1.fontFamilyProperty[this.keywordIndex]] = 'Symbol';
                        break;
                }
                html += '">';
            }
            else {
                html += '<ol type="';
                switch (listLevel[index_1.listLevelPatternProperty[this.keywordIndex]]) {
                    case 'UpRoman':
                    case 2:
                        html += 'I';
                        break;
                    case 'LowRoman':
                    case 3:
                        html += 'i';
                        break;
                    case 'UpLetter':
                    case 4:
                        html += 'A';
                        break;
                    case 'LowLetter':
                    case 5:
                        html += 'a';
                        break;
                    default:
                        html += '1';
                        break;
                }
                html += '" start="' + listLevel[index_1.startAtProperty[this.keywordIndex]].toString() + '">';
            }
            return html;
        };
        HtmlExport.prototype.serializeInlines = function (paragraph, blockStyle) {
            var inline = undefined;
            var i = 0;
            while (paragraph[index_1.inlinesProperty[this.keywordIndex]].length > i) {
                inline = paragraph[index_1.inlinesProperty[this.keywordIndex]][i];
                if (inline.hasOwnProperty(index_1.inlinesProperty[this.keywordIndex])) {
                    blockStyle += this.serializeContentInlines(inline, blockStyle);
                    i++;
                    continue;
                }
                if (inline.hasOwnProperty(index_1.imageStringProperty[this.keywordIndex])) {
                    blockStyle += this.serializeImageContainer(inline);
                }
                else if (inline.hasOwnProperty(index_1.fieldTypeProperty[this.keywordIndex])) {
                    if (inline[index_1.fieldTypeProperty[this.keywordIndex]] === 0) {
                        var fieldCode = paragraph[index_1.inlinesProperty[this.keywordIndex]][i + 1];
                        if (ej2_base_1.isNullOrUndefined(fieldCode[index_1.textProperty[this.keywordIndex]])) {
                            fieldCode = paragraph[index_1.inlinesProperty[this.keywordIndex]][i + 2];
                        }
                        if (!ej2_base_1.isNullOrUndefined(fieldCode) && !ej2_base_1.isNullOrUndefined(fieldCode[index_1.textProperty[this.keywordIndex]]) &&
                            (fieldCode[index_1.textProperty[this.keywordIndex]].indexOf('TOC') >= 0 || fieldCode[index_1.textProperty[this.keywordIndex]].indexOf('HYPERLINK') >= 0)) {
                            this.fieldCheck = 1;
                            var tagAttributes = [];
                            tagAttributes.push('style="' + this.serializeInlineStyle(inline[index_1.characterFormatProperty[this.keywordIndex]]) + '"');
                            blockStyle += this.createAttributesTag('a', tagAttributes);
                        }
                        else {
                            this.fieldCheck = undefined;
                        }
                    }
                    else if (inline[index_1.fieldTypeProperty[this.keywordIndex]] === 2) {
                        if (!ej2_base_1.isNullOrUndefined(this.fieldCheck)) {
                            this.fieldCheck = 2;
                        }
                        else {
                            this.fieldCheck = 0;
                        }
                    }
                    else {
                        if (!ej2_base_1.isNullOrUndefined(this.fieldCheck) && this.fieldCheck !== 0) {
                            blockStyle += this.endTag('a');
                        }
                        this.fieldCheck = 0;
                    }
                }
                else {
                    var text = ej2_base_1.isNullOrUndefined(inline[index_1.textProperty[this.keywordIndex]]) ? '' : inline[index_1.textProperty[this.keywordIndex]];
                    if (inline.hasOwnProperty(index_1.bookmarkTypeProperty[this.keywordIndex])) {
                        switch (inline[index_1.bookmarkTypeProperty[this.keywordIndex]]) {
                            case 0:
                                blockStyle += '<a name=' + inline[index_1.nameProperty[this.keywordIndex]] + '>';
                                break;
                            case 1:
                                blockStyle += '</a>';
                                break;
                        }
                    }
                    if (this.fieldCheck === 0) {
                        blockStyle += this.serializeSpan(text, inline[index_1.characterFormatProperty[this.keywordIndex]]);
                    }
                    if (this.fieldCheck === 1) {
                        var hyperLink = text.replace(/"/g, '');
                        blockStyle += ' href= \"' + hyperLink.replace('HYPERLINK', '').trim();
                        blockStyle += '\"';
                        blockStyle += '>';
                    }
                    if (this.fieldCheck === 2) {
                        blockStyle += this.serializeSpan(text, inline[index_1.characterFormatProperty[this.keywordIndex]]);
                    }
                }
                i++;
            }
            return blockStyle;
        };
        HtmlExport.prototype.serializeContentInlines = function (inline, inlineStyle) {
            inlineStyle += this.serializeInlines(inline, inlineStyle);
            return inlineStyle;
        };
        HtmlExport.prototype.serializeSpan = function (spanText, characterFormat) {
            var spanClass = '';
            if (spanText.indexOf('\v') !== -1) {
                spanClass += '<br>';
                return spanClass.toString();
            }
            else if (spanText.indexOf('\f') !== -1) {
                spanClass += '<br style = "page-break-after:always;"/>';
                return spanClass.toString();
            }
            var tagAttributes = [];
            this.serializeInlineStyle(characterFormat);
            tagAttributes.push('style="' + this.serializeInlineStyle(characterFormat) + '"');
            spanClass += this.createAttributesTag('span', tagAttributes);
            var text = this.decodeHtmlNames(spanText.toString());
            spanClass += text;
            spanClass += this.endTag('span');
            return spanClass.toString();
        };
        HtmlExport.prototype.getStyleName = function (style) {
            switch (style) {
                case 'Heading 1':
                    return 'h1';
                case 'Heading 2':
                    return 'h2';
                case 'Heading 3':
                    return 'h3';
                case 'Heading 4':
                    return 'h4';
                case 'Heading 5':
                    return 'h5';
                default:
                    return 'p';
            }
        };
        HtmlExport.prototype.serializeImageContainer = function (image) {
            var imageStyle = '';
            var tagAttributes = [];
            this.serializeInlineStyle(image[index_1.characterFormatProperty[this.keywordIndex]]);
            var imageSource = '';
            if (!ej2_base_1.isNullOrUndefined(image[index_1.imageStringProperty[this.keywordIndex]])) {
                var base64ImageString = this.images.get(parseInt(image[index_1.imageStringProperty[this.keywordIndex]]));
                imageSource = base64ImageString[editor_helper_1.HelperMethods.parseBoolValue(image[index_1.isMetaFileProperty[this.keywordIndex]]) ? 1 : 0];
            }
            var width = editor_helper_1.HelperMethods.convertPointToPixel(image[index_1.widthProperty[this.keywordIndex]]);
            var height = editor_helper_1.HelperMethods.convertPointToPixel(image[index_1.heightProperty[this.keywordIndex]]);
            tagAttributes.push('width="' + width.toString() + '"');
            tagAttributes.push('height="' + height.toString() + '"');
            tagAttributes.push('src="' + imageSource + '"');
            imageStyle += this.createAttributesTag('img', tagAttributes);
            imageStyle += (this.endTag('img'));
            return imageStyle.toString();
        };
        HtmlExport.prototype.serializeCell = function (cell, row) {
            var blockStyle = '';
            var tagAttributes = [];
            var cellHtml = '';
            tagAttributes = [];
            if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]])) {
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.shadingProperty[this.keywordIndex]][index_1.backgroundColorProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.shadingProperty[this.keywordIndex]][index_1.backgroundColorProperty[this.keywordIndex]] !== 'empty') {
                    tagAttributes.push('bgcolor="' + editor_helper_1.HelperMethods.getColor(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.shadingProperty[this.keywordIndex]][index_1.backgroundColorProperty[this.keywordIndex]]) + '"');
                }
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.columnSpanProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.columnSpanProperty[this.keywordIndex]] > 1) {
                    tagAttributes.push('colspan="' + cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.columnSpanProperty[this.keywordIndex]].toString() + '"');
                }
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.rowSpanProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.rowSpanProperty[this.keywordIndex]] > 1) {
                    tagAttributes.push('rowspan="' + cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.rowSpanProperty[this.keywordIndex]].toString() + '"');
                }
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.cellWidthProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.cellWidthProperty[this.keywordIndex]] !== 0) {
                    var cellWidth = editor_helper_1.HelperMethods.convertPointToPixel(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.cellWidthProperty[this.keywordIndex]]);
                    tagAttributes.push('width="' + cellWidth.toString() + '"');
                }
                var cellAlignment = ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.verticalAlignmentProperty[this.keywordIndex]]) ? 'top' :
                    this.convertVerticalAlignment(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.verticalAlignmentProperty[this.keywordIndex]]);
                tagAttributes.push('valign="' + cellAlignment + '"');
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.leftMarginProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.leftMarginProperty[this.keywordIndex]] !== 0) {
                    cellHtml += ('padding-left:' + cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.leftMarginProperty[this.keywordIndex]].toString() + 'pt;');
                }
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.rightMarginProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.rightMarginProperty[this.keywordIndex]] !== 0) {
                    cellHtml += ('padding-right:' + cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.rightMarginProperty[this.keywordIndex]].toString() + 'pt;');
                }
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.topMarginProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.topMarginProperty[this.keywordIndex]] !== 0) {
                    cellHtml += ('padding-top:' + cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.topMarginProperty[this.keywordIndex]].toString() + 'pt;');
                }
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.bottomMarginProperty[this.keywordIndex]]) && cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.bottomMarginProperty[this.keywordIndex]] !== 0) {
                    cellHtml += ('padding-bottom:' + cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.bottomMarginProperty[this.keywordIndex]].toString() + 'pt;');
                }
                if (!ej2_base_1.isNullOrUndefined(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]])) {
                    cellHtml += this.serializeCellBordersStyle(cell[index_1.cellFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]], row);
                }
            }
            if (cellHtml.length !== 0) {
                tagAttributes.push('style="' + cellHtml + '"');
            }
            blockStyle += (this.createAttributesTag('td', tagAttributes));
            for (var k = 0; k < cell[index_1.blocksProperty[this.keywordIndex]].length; k++) {
                var block = cell[index_1.blocksProperty[this.keywordIndex]][k];
                if (block.hasOwnProperty(index_1.rowsProperty[this.keywordIndex])) {
                    blockStyle += this.serializeTable(block);
                }
                else {
                    blockStyle += this.serializeParagraph(block);
                }
            }
            blockStyle += (this.endTag('td'));
            return blockStyle;
        };
        HtmlExport.prototype.convertVerticalAlignment = function (cellVerticalAlignment) {
            switch (cellVerticalAlignment) {
                case 'Center':
                case 1:
                    return 'middle';
                case 'Bottom':
                case 2:
                    return 'bottom';
                default:
                    return 'top';
            }
        };
        HtmlExport.prototype.serializeTable = function (table) {
            var html = '';
            html += this.createTableStartTag(table);
            for (var j = 0; j < table[index_1.rowsProperty[this.keywordIndex]].length; j++) {
                html += this.serializeRow(table[index_1.rowsProperty[this.keywordIndex]][j]);
            }
            html += this.createTableEndTag();
            return html;
        };
        HtmlExport.prototype.serializeRow = function (row) {
            var html = '';
            html += this.createRowStartTag(row);
            for (var k = 0; k < row[index_1.cellsProperty[this.keywordIndex]].length; k++) {
                html += this.serializeCell(row[index_1.cellsProperty[this.keywordIndex]][k], row);
            }
            return html;
        };
        HtmlExport.prototype.serializeParagraphStyle = function (paragraph, className, isList, keywordIndex) {
            var paragraphClass = '';
            var editor;
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = keywordIndex;
            }
            if (paragraph[index_1.inlinesProperty[this.keywordIndex]].length > 0) {
                paragraphClass += this.serializeCharacterFormat(paragraph[index_1.characterFormatProperty[this.keywordIndex]]);
            }
            var isEmptyLine = false;
            if (paragraph[index_1.inlinesProperty[this.keywordIndex]].length == 0) {
                isEmptyLine = true;
            }
            paragraphClass += this.serializeCharacterFormat(paragraph[index_1.characterFormatProperty[this.keywordIndex]], isEmptyLine);
            paragraphClass += this.serializeParagraphFormat(paragraph[index_1.paragraphFormatProperty[this.keywordIndex]], isList);
            return paragraphClass;
        };
        HtmlExport.prototype.serializeInlineStyle = function (characterFormat) {
            return this.serializeCharacterFormat(characterFormat);
        };
        HtmlExport.prototype.serializeTableBorderStyle = function (borders) {
            var borderStyle = '';
            var border = {};
            border = borders[index_1.leftProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'left');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-left-style:none;');
            }
            border = borders[index_1.topProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'top');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-top-style:none;');
            }
            border = borders[index_1.rightProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'right');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-right-style:none;');
            }
            border = borders[index_1.bottomProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'bottom');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-bottom-style:none;');
            }
            return borderStyle;
        };
        HtmlExport.prototype.serializeCellBordersStyle = function (borders, row) {
            var borderStyle = '';
            var border = {};
            border = borders[index_1.leftProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'left');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-left-style:none;');
            }
            else if (!ej2_base_1.isNullOrUndefined(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.leftProperty[this.keywordIndex]])) {
                border = row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.leftProperty[this.keywordIndex]];
                if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                    border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                    border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                    borderStyle += this.serializeBorderStyle(border, 'left');
                }
            }
            border = borders[index_1.topProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'top');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-top-style:none;');
            }
            else if (!ej2_base_1.isNullOrUndefined(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.topProperty[this.keywordIndex]])) {
                border = row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.topProperty[this.keywordIndex]];
                if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                    border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                    border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                    borderStyle += this.serializeBorderStyle(border, 'top');
                }
            }
            border = borders[index_1.rightProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'right');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-right-style:none;');
            }
            else if (!ej2_base_1.isNullOrUndefined(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.rightProperty[this.keywordIndex]])) {
                border = row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.rightProperty[this.keywordIndex]];
                if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                    border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                    border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                    borderStyle += this.serializeBorderStyle(border, 'right');
                }
            }
            border = borders[index_1.bottomProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                borderStyle += this.serializeBorderStyle(border, 'bottom');
            }
            else if (!ej2_base_1.isNullOrUndefined(border) && editor_helper_1.HelperMethods.parseBoolValue(border[index_1.hasNoneStyleProperty[this.keywordIndex]])) {
                borderStyle += ('border-bottom-style:none;');
            }
            else if (!ej2_base_1.isNullOrUndefined(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.bottomProperty[this.keywordIndex]])) {
                border = row[index_1.rowFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]][index_1.bottomProperty[this.keywordIndex]];
                if (!ej2_base_1.isNullOrUndefined(border) && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 1 : 'None') && border[index_1.lineStyleProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                    border[index_1.colorProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]]) ? "#000000" : border[index_1.colorProperty[this.keywordIndex]];
                    border[index_1.lineWidthProperty[this.keywordIndex]] = ej2_base_1.isNullOrUndefined(border[index_1.lineWidthProperty[this.keywordIndex]]) ? 0.5 : border[index_1.lineWidthProperty[this.keywordIndex]];
                    borderStyle += this.serializeBorderStyle(border, 'bottom');
                }
            }
            return borderStyle;
        };
        HtmlExport.prototype.serializeBorderStyle = function (border, borderPosition) {
            var borderStyle = '';
            borderStyle += ('border-' + borderPosition + '-style:' + this.convertBorderLineStyle(border[index_1.lineStyleProperty[this.keywordIndex]]));
            borderStyle += ';';
            if (border[index_1.lineWidthProperty[this.keywordIndex]] > 0) {
                borderStyle += ('border-' + borderPosition + '-width:' + border[index_1.lineWidthProperty[this.keywordIndex]].toString() + 'pt;');
            }
            if (!ej2_base_1.isNullOrUndefined(border[index_1.colorProperty[this.keywordIndex]])) {
                borderStyle += ('border-' + borderPosition + '-color:' + editor_helper_1.HelperMethods.getColor(border[index_1.colorProperty[this.keywordIndex]]) + ';');
            }
            return borderStyle;
        };
        HtmlExport.prototype.convertBorderLineStyle = function (lineStyle) {
            switch (lineStyle) {
                case 'Single':
                case 0:
                    return 'solid';
                case 'None':
                case 1:
                    return 'none';
                case 'Dot':
                case 2:
                    return 'dotted';
                case 'DashSmallGap':
                case 'DashLargeGap':
                case 'DashDot':
                case 'DashDotDot':
                case 3:
                case 4:
                case 5:
                case 6:
                    return 'dashed';
                case 'Double':
                case 'Triple':
                case 'ThinThickSmallGap':
                case 'ThickThinSmallGap':
                case 'ThinThickThinSmallGap':
                case 'ThinThickMediumGap':
                case 'ThickThinMediumGap':
                case 'ThinThickThinMediumGap':
                case 'ThinThickLargeGap':
                case 'ThickThinLargeGap':
                case 'ThinThickThinLargeGap':
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    return 'double';
                case 'SingleWavy':
                case 18:
                    return 'solid';
                case 'DoubleWavy':
                case 19:
                    return 'double';
                case 'DashDotStroked':
                case 20:
                    return 'solid';
                case 'Emboss3D':
                case 21:
                    return 'ridge';
                case 'Engrave3D':
                case 22:
                    return 'groove';
                case 'Outset':
                case 23:
                    return 'outset';
                case 'Inset':
                case 24:
                    return 'inset';
                default:
                    return 'solid';
            }
        };
        HtmlExport.prototype.serializeCharacterFormat = function (characterFormat, isEmptyLine) {
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_1.inlineFormatProperty[this.keywordIndex]])) {
                return this.serializeCharacterFormat(characterFormat[index_1.inlineFormatProperty[this.keywordIndex]], isEmptyLine);
            }
            var propertyValue;
            var charStyle = '';
            charStyle += 'font-weight';
            charStyle += ':';
            charStyle += editor_helper_1.HelperMethods.parseBoolValue(characterFormat[index_1.boldProperty[this.keywordIndex]]) ? 'bold' : 'normal';
            charStyle += ';';
            charStyle += 'font-style';
            charStyle += ':';
            if (editor_helper_1.HelperMethods.parseBoolValue(characterFormat[index_1.italicProperty[this.keywordIndex]])) {
                charStyle += 'italic';
            }
            else {
                charStyle += 'normal';
            }
            charStyle += ';';
            charStyle += this.serializeTextDecoration(characterFormat);
            if (characterFormat[index_1.baselineAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Superscript') || characterFormat[index_1.baselineAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Subscript')) {
                charStyle += 'vertical-align';
                charStyle += ':';
                charStyle += characterFormat[index_1.baselineAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Superscript') ? 'super' : 'sub';
                charStyle += ';';
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_1.highlightColorProperty[this.keywordIndex]]) && characterFormat[index_1.highlightColorProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'NoColor') && !isEmptyLine) {
                charStyle += 'background-color';
                charStyle += ':';
                charStyle += this.keywordIndex == 1 ? this.getHighlightColorCode(characterFormat[index_1.highlightColorProperty[this.keywordIndex]]) : editor_helper_1.HelperMethods.getHighlightColorCode(characterFormat.highlightColor.toString());
                charStyle += ';';
            }
            propertyValue = characterFormat[index_1.fontColorProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                charStyle += 'color';
                charStyle += ':';
                charStyle += editor_helper_1.HelperMethods.getColor(propertyValue);
                charStyle += ';';
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_1.allCapsProperty[this.keywordIndex]]) && editor_helper_1.HelperMethods.parseBoolValue(characterFormat[index_1.allCapsProperty[this.keywordIndex]])) {
                charStyle += 'text-transform';
                charStyle += ':';
                charStyle += 'uppercase';
                charStyle += ';';
            }
            propertyValue = characterFormat[index_1.fontSizeProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                charStyle += 'font-size';
                charStyle += ':';
                charStyle += propertyValue.toString();
                charStyle += 'pt';
                charStyle += ';';
            }
            propertyValue = characterFormat[index_1.fontFamilyProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                charStyle += 'font-family';
                charStyle += ':';
                charStyle += propertyValue.toString();
                charStyle += ';';
            }
            propertyValue = characterFormat[index_1.characterSpacingProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                charStyle += 'letter-spacing';
                charStyle += ':';
                charStyle += propertyValue.toString();
                charStyle += 'pt';
                charStyle += ';';
            }
            propertyValue = characterFormat[index_1.scalingProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                charStyle += 'transform:scaleX(';
                charStyle += (propertyValue / 100).toString();
                charStyle += ')';
                charStyle += ';';
            }
            return charStyle.toString();
        };
        HtmlExport.prototype.serializeTextDecoration = function (characterFormat) {
            var charStyle = 'text-decoration:';
            var value = '';
            if (characterFormat[index_1.strikethroughProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'SingleStrike') || characterFormat[index_1.strikethroughProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'DoubleStrike')) {
                value += 'line-through ';
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_1.underlineProperty[this.keywordIndex]]) && characterFormat[index_1.underlineProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'None')) {
                value += 'underline';
            }
            if (value.length > 1) {
                value = charStyle + value + ';';
            }
            return value;
        };
        HtmlExport.prototype.serializeParagraphFormat = function (paragraphFormat, isList, keywordIndex) {
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = keywordIndex;
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_1.inlineFormatProperty[this.keywordIndex]])) {
                return this.serializeParagraphFormat(paragraphFormat[index_1.inlineFormatProperty[this.keywordIndex]], isList);
            }
            var propertyValue;
            var paraStyle = '';
            propertyValue = this.getTextAlignment(paragraphFormat[index_1.textAlignmentProperty[this.keywordIndex]]);
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                paraStyle += 'text-align:' + propertyValue.toLowerCase() + ';';
            }
            propertyValue = paragraphFormat[index_1.beforeSpacingProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                paraStyle += 'margin-top:' + propertyValue.toString() + 'pt; ';
            }
            propertyValue = paragraphFormat[index_1.rightIndentProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                paraStyle += 'margin-right:' + propertyValue.toString() + 'pt; ';
            }
            propertyValue = paragraphFormat[index_1.afterSpacingProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                paraStyle += 'margin-bottom:' + propertyValue.toString() + 'pt; ';
            }
            propertyValue = paragraphFormat[index_1.leftIndentProperty[this.keywordIndex]];
            if (isList) {
                propertyValue = 0;
            }
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                paraStyle += 'margin-left:' + propertyValue.toString() + 'pt; ';
            }
            propertyValue = paragraphFormat[index_1.firstLineIndentProperty[this.keywordIndex]];
            if (isList) {
                propertyValue = 0;
            }
            if (!ej2_base_1.isNullOrUndefined(propertyValue) && propertyValue !== 0) {
                paraStyle += 'text-indent:' + propertyValue.toString() + 'pt;';
            }
            propertyValue = paragraphFormat[index_1.lineSpacingProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(propertyValue)) {
                if (paragraphFormat[index_1.lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Multiple')) {
                    propertyValue = Math.round(propertyValue * 10) / 10;
                }
                else {
                    propertyValue = propertyValue.toString() + 'pt;';
                }
                paraStyle += 'line-height:' + propertyValue;
            }
            return paraStyle.toString();
        };
        HtmlExport.prototype.createAttributesTag = function (tagValue, localProperties) {
            var sb = '';
            sb += '<';
            sb += tagValue;
            for (var i = 0; i < localProperties.length; i++) {
                sb += ' ';
                sb += localProperties[i];
            }
            if (tagValue !== 'a') {
                sb += '>';
            }
            return sb;
        };
        HtmlExport.prototype.createTag = function (tagValue) {
            var s = '';
            s += '<';
            s += tagValue;
            s += '>';
            return s;
        };
        HtmlExport.prototype.endTag = function (tagValue) {
            var sb = '';
            sb += '<';
            sb += '/';
            sb += tagValue;
            sb += '>';
            return sb;
        };
        HtmlExport.prototype.createTableStartTag = function (table) {
            var blockStyle = '';
            var tableStyle = '';
            var tagAttributes = [];
            if (!ej2_base_1.isNullOrUndefined(table[index_1.tableFormatProperty[this.keywordIndex]])) {
                if (!ej2_base_1.isNullOrUndefined(table[index_1.tableFormatProperty[this.keywordIndex]][index_1.shadingProperty[this.keywordIndex]]) && !ej2_base_1.isNullOrUndefined(table[index_1.tableFormatProperty[this.keywordIndex]][index_1.shadingProperty[this.keywordIndex]][index_1.backgroundColorProperty[this.keywordIndex]]) && table[index_1.tableFormatProperty[this.keywordIndex]][index_1.shadingProperty[this.keywordIndex]][index_1.backgroundColorProperty[this.keywordIndex]] !== 'empty') {
                    tagAttributes.push('bgcolor="' + editor_helper_1.HelperMethods.getColor(table[index_1.tableFormatProperty[this.keywordIndex]][index_1.shadingProperty[this.keywordIndex]][index_1.backgroundColorProperty[this.keywordIndex]]) + '"');
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_1.tableFormatProperty[this.keywordIndex]][index_1.cellSpacingProperty[this.keywordIndex]]) && table[index_1.tableFormatProperty[this.keywordIndex]][index_1.cellSpacingProperty[this.keywordIndex]] > 0) {
                    tagAttributes.push('cellspacing="' + (((table[index_1.tableFormatProperty[this.keywordIndex]][index_1.cellSpacingProperty[this.keywordIndex]] * 72) / 96) * 2).toString() + '"');
                }
                else {
                    tableStyle += ('border-collapse:collapse;');
                }
                tagAttributes.push('cellpadding="' + '0"');
                if (!ej2_base_1.isNullOrUndefined(table[index_1.tableFormatProperty[this.keywordIndex]][index_1.leftIndentProperty[this.keywordIndex]]) && table[index_1.tableFormatProperty[this.keywordIndex]][index_1.leftIndentProperty[this.keywordIndex]] !== 0 &&
                    table[index_1.tableFormatProperty[this.keywordIndex]][index_1.tableAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Left')) {
                    tableStyle += 'margin-left:' + (table[index_1.tableFormatProperty[this.keywordIndex]][index_1.leftIndentProperty[this.keywordIndex]].toString() + 'pt;');
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_1.tableFormatProperty[this.keywordIndex]])) {
                    tableStyle += this.serializeTableWidth(table[index_1.tableFormatProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_1.tableFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]])) {
                    tableStyle += this.serializeTableBorderStyle(table[index_1.tableFormatProperty[this.keywordIndex]][index_1.bordersProperty[this.keywordIndex]]);
                }
            }
            if (tableStyle.length !== 0) {
                tagAttributes.push('style="', tableStyle.toString() + '"');
            }
            return blockStyle += (this.createAttributesTag('table', tagAttributes));
        };
        HtmlExport.prototype.serializeTableWidth = function (tableFormat) {
            var width = '';
            switch (tableFormat[index_1.preferredWidthTypeProperty[this.keywordIndex]]) {
                case 'Percent':
                case 1:
                    width += 'width: ' + tableFormat[index_1.preferredWidthProperty[this.keywordIndex]].toString() + '%;';
                    break;
                case 'Point':
                case 2:
                    width += 'width: ' + tableFormat[index_1.preferredWidthProperty[this.keywordIndex]].toString() + 'pt;';
                    break;
                case 'Auto':
                case 0:
                    width += 'width: auto;';
                    break;
            }
            return width;
        };
        HtmlExport.prototype.getHighlightColorCode = function (highlightColor) {
            var color = '#ffffff';
            switch (highlightColor) {
                case 1:
                    color = '#ffff00';
                    break;
                case 2:
                    color = '#00ff00';
                    break;
                case 3:
                    color = '#00ffff';
                    break;
                case 4:
                    color = '#ff00ff';
                    break;
                case 5:
                    color = '#0000ff';
                    break;
                case 6:
                    color = '#ff0000';
                    break;
                case 7:
                    color = '#000080';
                    break;
                case 8:
                    color = '#008080';
                    break;
                case 9:
                    color = '#008000';
                    break;
                case 10:
                    color = '#800080';
                    break;
                case 11:
                    color = '#800000';
                    break;
                case 12:
                    color = '#808000';
                    break;
                case 13:
                    color = '#808080';
                    break;
                case 14:
                    color = '#c0c0c0';
                    break;
                case 15:
                    color = '#000000';
                    break;
            }
            return color;
        };
        HtmlExport.prototype.getTextAlignment = function (textAlignment) {
            switch (textAlignment) {
                case 1:
                    return 'Center';
                case 2:
                    return 'Right';
                case 3:
                    return 'Justify';
                default:
                    return 'Left';
            }
        };
        HtmlExport.prototype.createTableEndTag = function () {
            var blockStyle = '';
            blockStyle += (this.endTag('table'));
            return blockStyle;
        };
        HtmlExport.prototype.createRowStartTag = function (row) {
            var blockStyle = '';
            var tagAttributes = [];
            if (editor_helper_1.HelperMethods.parseBoolValue(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.isHeaderProperty[this.keywordIndex]])) {
                blockStyle += (this.createTag('thead'));
            }
            if (!ej2_base_1.isNullOrUndefined(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.heightProperty[this.keywordIndex]]) && row[index_1.rowFormatProperty[this.keywordIndex]][index_1.heightProperty[this.keywordIndex]] > 0) {
                var height = editor_helper_1.HelperMethods.convertPointToPixel(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.heightProperty[this.keywordIndex]]);
                tagAttributes.push('height="' + height + '"');
            }
            return blockStyle + this.createAttributesTag('tr', tagAttributes);
        };
        HtmlExport.prototype.createRowEndTag = function (row) {
            var blockStyle = '';
            blockStyle += (this.endTag('tr'));
            if (editor_helper_1.HelperMethods.parseBoolValue(row[index_1.rowFormatProperty[this.keywordIndex]][index_1.isHeaderProperty[this.keywordIndex]])) {
                blockStyle += (this.endTag('thead'));
            }
            return blockStyle;
        };
        HtmlExport.prototype.decodeHtmlNames = function (text) {
            if (text === '\t') {
                return '&emsp;';
            }
            text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            var splittedText = text.split(' ');
            var htmlText = '';
            if (splittedText.length > 0) {
                htmlText = splittedText[0];
                for (var i = 0; i < splittedText.length - 1; i++) {
                    htmlText += ' ' + splittedText[i + 1];
                }
            }
            return htmlText;
        };
        return HtmlExport;
    }());
    exports.HtmlExport = HtmlExport;
});
