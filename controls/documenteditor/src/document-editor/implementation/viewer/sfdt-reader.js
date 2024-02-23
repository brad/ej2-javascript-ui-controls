define(["require", "exports", "@syncfusion/ej2-base", "../list/list", "../list/list-level", "../list/abstract-list", "../list/level-override", "../format/index", "../format/index", "./page", "../editor/editor-helper", "../../base/dictionary", "@syncfusion/ej2-office-chart", "../track-changes/track-changes", "../index", "../../index"], function (require, exports, ej2_base_1, list_1, list_level_1, abstract_list_1, level_override_1, index_1, index_2, page_1, editor_helper_1, dictionary_1, ej2_office_chart_1, track_changes_1, index_3, index_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SfdtReader = (function () {
        function SfdtReader(documentHelper) {
            this.documentHelper = undefined;
            this.commentStarts = undefined;
            this.commentEnds = undefined;
            this.commentsCollection = undefined;
            this.revisionCollection = undefined;
            this.isPageBreakInsideTable = false;
            this.referedRevisions = [];
            this.isParseHeader = false;
            this.footnotes = undefined;
            this.endnotes = undefined;
            this.keywordIndex = undefined;
            this.themes = undefined;
            this.isCutPerformed = false;
            this.isPaste = false;
            this.isHtmlPaste = false;
            this.documentHelper = documentHelper;
            this.editableRanges = new dictionary_1.Dictionary();
        }
        Object.defineProperty(SfdtReader.prototype, "isPasting", {
            get: function () {
                return this.viewer && this.viewer.owner.isPastingContent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SfdtReader.prototype, "viewer", {
            get: function () {
                return this.documentHelper.owner.viewer;
            },
            enumerable: true,
            configurable: true
        });
        SfdtReader.prototype.convertJsonToDocument = function (json, incrementalOperations) {
            this.commentStarts = new dictionary_1.Dictionary();
            this.commentEnds = new dictionary_1.Dictionary();
            this.commentsCollection = new dictionary_1.Dictionary();
            this.revisionCollection = new dictionary_1.Dictionary();
            this.referedRevisions = [];
            this.keywordIndex = 0;
            this.footnotes = new page_1.Footnote();
            this.endnotes = new page_1.Footnote();
            var sections = [];
            var jsonObject = editor_helper_1.HelperMethods.getSfdtDocument(json);
            if (!ej2_base_1.isNullOrUndefined(jsonObject.optimizeSfdt) && jsonObject.optimizeSfdt) {
                this.keywordIndex = 1;
            }
            if (ej2_base_1.isNullOrUndefined(jsonObject[index_4.characterFormatProperty[this.keywordIndex]])) {
                this.parseCharacterFormat(0, this.viewer.owner.characterFormat, this.documentHelper.characterFormat);
            }
            else {
                this.parseCharacterFormat(this.keywordIndex, jsonObject[index_4.characterFormatProperty[this.keywordIndex]], this.documentHelper.characterFormat);
            }
            if (ej2_base_1.isNullOrUndefined(jsonObject[index_4.paragraphFormatProperty[this.keywordIndex]])) {
                this.parseParagraphFormat(0, this.viewer.owner.paragraphFormat, this.documentHelper.paragraphFormat);
            }
            else {
                this.parseParagraphFormat(this.keywordIndex, jsonObject[index_4.paragraphFormatProperty[this.keywordIndex]], this.documentHelper.paragraphFormat);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.themeFontLanguagesProperty[this.keywordIndex]])) {
                this.parseCharacterFormat(this.keywordIndex, jsonObject[index_4.themeFontLanguagesProperty[this.keywordIndex]], this.documentHelper.themeFontLanguage);
            }
            this.parseDocumentProtection(jsonObject);
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.defaultTabWidthProperty[this.keywordIndex]])) {
                this.documentHelper.defaultTabWidth = jsonObject[index_4.defaultTabWidthProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.trackChangesProperty[this.keywordIndex]])) {
                this.documentHelper.owner.enableTrackChanges = editor_helper_1.HelperMethods.parseBoolValue(jsonObject[index_4.trackChangesProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.doNotUseHTMLParagraphAutoSpacingProperty[this.keywordIndex]])) {
                this.documentHelper.dontUseHtmlParagraphAutoSpacing = editor_helper_1.HelperMethods.parseBoolValue(jsonObject[index_4.doNotUseHTMLParagraphAutoSpacingProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.allowSpaceOfSameStyleInTableProperty[this.keywordIndex]])) {
                this.documentHelper.allowSpaceOfSameStyleInTable = editor_helper_1.HelperMethods.parseBoolValue(jsonObject[index_4.allowSpaceOfSameStyleInTableProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.alignTablesRowByRowProperty[this.keywordIndex]])) {
                this.documentHelper.alignTablesRowByRow = editor_helper_1.HelperMethods.parseBoolValue(jsonObject[index_4.alignTablesRowByRowProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.backgroundProperty[this.keywordIndex]])) {
                this.documentHelper.backgroundColor = this.getColor(jsonObject[index_4.backgroundProperty[this.keywordIndex]][index_4.colorProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.compatibilityModeProperty[this.keywordIndex]])) {
                this.documentHelper.compatibilityMode = this.getCompatibilityMode(jsonObject[index_4.compatibilityModeProperty[this.keywordIndex]]);
                if (!ej2_base_1.isNullOrUndefined(this.documentHelper.owner.documentSettings)) {
                    this.documentHelper.owner.documentSettings.compatibilityMode = this.getCompatibilityMode(jsonObject[index_4.compatibilityModeProperty[this.keywordIndex]]);
                }
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.abstractListsProperty[this.keywordIndex]])) {
                this.parseAbstractList(jsonObject, this.documentHelper.abstractLists);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.listsProperty[this.keywordIndex]])) {
                this.parseList(jsonObject, this.documentHelper.lists);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.stylesProperty[this.keywordIndex]])) {
                this.parseStyles(jsonObject, this.documentHelper.styles);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.commentsProperty[this.keywordIndex]])) {
                this.parseComments(jsonObject, this.documentHelper.comments);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.revisionsProperty[this.keywordIndex]])) {
                this.parseRevisions(jsonObject, this.viewer.owner.revisionsInternal.changes);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.imagesProperty[this.keywordIndex]])) {
                this.parseImages(jsonObject[index_4.imagesProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.sectionsProperty[this.keywordIndex]])) {
                this.parseSections(jsonObject[index_4.sectionsProperty[this.keywordIndex]], sections);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.customXmlProperty[this.keywordIndex]])) {
                this.parseCustomXml(jsonObject);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.formFieldShadingProperty[this.keywordIndex]])) {
                this.documentHelper.owner.documentEditorSettings.formFieldSettings.applyShading = editor_helper_1.HelperMethods.parseBoolValue(jsonObject[index_4.formFieldShadingProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.footnotesProperty[this.keywordIndex]])) {
                this.parseFootnotes(jsonObject[index_4.footnotesProperty[this.keywordIndex]], this.documentHelper.footnotes);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.endnotesProperty[this.keywordIndex]])) {
                this.parseEndtnotes(jsonObject[index_4.endnotesProperty[this.keywordIndex]], this.documentHelper.endnotes);
            }
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.themesProperty[this.keywordIndex]])) {
                this.parseThemes(jsonObject[index_4.themesProperty[this.keywordIndex]], this.documentHelper.themes);
            }
            this.generalizeRevisions();
            this.removeUnmappedBookmark();
            if (!ej2_base_1.isNullOrUndefined(jsonObject[index_4.incrementalOps[0]])) {
                incrementalOperations[index_4.incrementalOps[0]] = (jsonObject[index_4.incrementalOps[0]]);
            }
            return sections;
        };
        SfdtReader.prototype.removeUnmappedBookmark = function () {
            var bookmarkKeys = this.documentHelper.bookmarks.keys;
            var endBookmark = this.documentHelper.endBookmarksUpdated;
            for (var i = 0; i < bookmarkKeys.length; i++) {
                if (endBookmark.indexOf(bookmarkKeys[i]) === -1) {
                    var bookmark = this.documentHelper.bookmarks.get(bookmarkKeys[i]);
                    if (bookmark) {
                        bookmark.line.children.splice(bookmark.line.children.indexOf(bookmark), 1);
                    }
                    this.documentHelper.bookmarks.remove(bookmarkKeys[i]);
                }
            }
            this.documentHelper.endBookmarksUpdated = [];
        };
        SfdtReader.prototype.generalizeRevisions = function () {
            var _this = this;
            var tempRevisionCollection = new dictionary_1.Dictionary();
            var tempRevisons = [];
            this.referedRevisions.forEach(function (element) {
                var revision = _this.documentHelper.revisionsInternal.get(element);
                if (tempRevisons.indexOf(revision) === -1) {
                    tempRevisons.push(revision);
                    tempRevisionCollection.add(element, revision);
                }
            });
            this.viewer.owner.revisionsInternal.changes = tempRevisons;
            this.documentHelper.revisionsInternal = tempRevisionCollection;
        };
        SfdtReader.prototype.parseFootnotes = function (data, footnote) {
            if (!ej2_base_1.isNullOrUndefined(data[index_4.separatorProperty[this.keywordIndex]])) {
                this.parseBody(data[index_4.separatorProperty[this.keywordIndex]], footnote.separator);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.continuationNoticeProperty[this.keywordIndex]])) {
                this.parseBody(data[index_4.continuationNoticeProperty[this.keywordIndex]], footnote.continuationNotice);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.continuationSeparatorProperty[this.keywordIndex]])) {
                this.parseBody(data[index_4.continuationSeparatorProperty[this.keywordIndex]], footnote.continuationSeparator);
            }
        };
        SfdtReader.prototype.parseImages = function (data) {
            for (var img in data) {
                if (Array.isArray(data["" + img])) {
                    this.documentHelper.images.add(parseInt(img), data["" + img]);
                }
                else {
                    var images = [];
                    images.push(data["" + img]);
                    this.documentHelper.images.add(parseInt(img), images);
                }
            }
        };
        SfdtReader.prototype.parseEndtnotes = function (data, endnote) {
            if (!ej2_base_1.isNullOrUndefined(data[index_4.separatorProperty[this.keywordIndex]])) {
                this.parseBody(data[index_4.separatorProperty[this.keywordIndex]], endnote.separator);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.continuationNoticeProperty[this.keywordIndex]])) {
                this.parseBody(data[index_4.continuationNoticeProperty[this.keywordIndex]], endnote.continuationNotice);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.continuationSeparatorProperty[this.keywordIndex]])) {
                this.parseBody(data[index_4.continuationSeparatorProperty[this.keywordIndex]], endnote.continuationSeparator);
            }
        };
        SfdtReader.prototype.parseCustomXml = function (data) {
            for (var i = 0; i < data[index_4.customXmlProperty[this.keywordIndex]].length; i++) {
                var xmlData = data[index_4.customXmlProperty[this.keywordIndex]][i];
                if (!this.revisionCollection.containsKey(xmlData[index_4.itemIDProperty[this.keywordIndex]])) {
                    this.documentHelper.customXmlData.add(xmlData[index_4.itemIDProperty[this.keywordIndex]], xmlData[index_4.xmlProperty[this.keywordIndex]]);
                }
            }
        };
        SfdtReader.prototype.parseDocumentProtection = function (data) {
            if (!ej2_base_1.isNullOrUndefined(data[index_4.formattingProperty[this.keywordIndex]])) {
                this.documentHelper.restrictFormatting = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.formattingProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.enforcementProperty[this.keywordIndex]])) {
                this.documentHelper.isDocumentProtected = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.enforcementProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.protectionTypeProperty[this.keywordIndex]])) {
                this.documentHelper.protectionType = this.getProtectionType(data[index_4.protectionTypeProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.hashValueProperty[this.keywordIndex]])) {
                this.documentHelper.hashValue = data[index_4.hashValueProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.saltValueProperty[this.keywordIndex]])) {
                this.documentHelper.saltValue = data[index_4.saltValueProperty[this.keywordIndex]];
            }
        };
        SfdtReader.prototype.parseStyles = function (data, styles) {
            for (var i = 0; i < data[index_4.stylesProperty[this.keywordIndex]].length; i++) {
                var editor = this.documentHelper.owner.editor;
                if ((!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) || ej2_base_1.isNullOrUndefined(this.documentHelper.styles.findByName(data[index_4.stylesProperty[this.keywordIndex]][i][index_4.nameProperty[this.keywordIndex]]))) {
                    this.parseStyle(data, data[index_4.stylesProperty[this.keywordIndex]][i], styles);
                }
            }
        };
        SfdtReader.prototype.parseRevisions = function (data, revisions) {
            for (var i = 0; i < data[index_4.revisionsProperty[this.keywordIndex]].length; i++) {
                var revisionData = data[index_4.revisionsProperty[this.keywordIndex]][i];
                if (!ej2_base_1.isNullOrUndefined(revisionData[index_4.revisionIdProperty[this.keywordIndex]]) && !ej2_base_1.isNullOrUndefined(revisionData[index_4.revisionTypeProperty[this.keywordIndex]])) {
                    var revision = this.parseRevision(revisionData);
                    var revisionCheck = true;
                    if (!this.documentHelper.owner.sfdtExportModule.copyWithTrackChange && this.isPaste) {
                        if (this.getRevisionType(revisionData[index_4.revisionTypeProperty[this.keywordIndex]]) === 'Insertion' && this.isPaste && this.documentHelper.owner.enableTrackChanges) {
                            var editor = this.documentHelper.owner.editor;
                            if (!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) {
                                this.documentHelper.owner.editor.revisionData.push(this.documentHelper.owner.editor.getMarkerData(undefined, undefined, revision));
                            }
                            continue;
                        }
                        else {
                            if (!this.revisionCollection.containsKey(revisionData[index_4.revisionIdProperty[this.keywordIndex]])) {
                                this.revisionCollection.add(revisionData[index_4.revisionIdProperty[this.keywordIndex]], revision);
                            }
                        }
                    }
                    else {
                        this.revisionCollection.add(revisionData[index_4.revisionIdProperty[this.keywordIndex]], revision);
                    }
                    for (var j = 0; j < revisions.length; j++) {
                        if (revisions[j].revisionID === revision.revisionID) {
                            revisionCheck = false;
                        }
                    }
                    if (revisionCheck) {
                        revisions.push(revision);
                    }
                }
            }
            this.documentHelper.revisionsInternal = this.revisionCollection;
            if (this.documentHelper.owner.sfdtExportModule) {
                this.documentHelper.owner.sfdtExportModule.copyWithTrackChange = false;
            }
        };
        SfdtReader.prototype.parseRevision = function (data) {
            if (!ej2_base_1.isNullOrUndefined(data)) {
                var revision = new track_changes_1.Revision(this.viewer.owner, data[index_4.authorProperty[this.keywordIndex]], data[index_4.dateProperty[this.keywordIndex]]);
                revision.revisionID = data[index_4.revisionIdProperty[this.keywordIndex]];
                revision.revisionType = this.getRevisionType(data[index_4.revisionTypeProperty[this.keywordIndex]]);
                return revision;
            }
            else {
                return undefined;
            }
        };
        SfdtReader.prototype.checkAndApplyRevision = function (keyIndex, inline, item) {
            if (!ej2_base_1.isNullOrUndefined(inline[index_4.revisionIdsProperty[keyIndex]]) && inline[index_4.revisionIdsProperty[keyIndex]].length > 0) {
                for (var i = 0; i < inline[index_4.revisionIdsProperty[keyIndex]].length; i++) {
                    var id = inline[index_4.revisionIdsProperty[keyIndex]][i];
                    if (this.revisionCollection.containsKey(id)) {
                        this.referedRevisions.push(id);
                        var revision = this.revisionCollection.get(id);
                        if (!(item instanceof index_1.WParagraphFormat)) {
                            revision.range.push(item);
                        }
                        item.revisions.push(revision);
                    }
                }
            }
        };
        SfdtReader.prototype.parseComments = function (data, comments) {
            var count = 0;
            for (var i = 0; i < data[index_4.commentsProperty[this.keywordIndex]].length; i++) {
                var commentData = data[index_4.commentsProperty[this.keywordIndex]][i];
                var commentElement = undefined;
                commentElement = this.parseComment(commentData, commentElement);
                while (count < commentData[index_4.replyCommentsProperty[this.keywordIndex]].length) {
                    var replyComment = undefined;
                    replyComment = this.parseComment(commentData[index_4.replyCommentsProperty[this.keywordIndex]][count], replyComment);
                    replyComment.ownerComment = commentElement;
                    replyComment.isReply = true;
                    commentElement.replyComments.push(replyComment);
                    this.commentsCollection.add(replyComment.commentId, replyComment);
                    count++;
                }
                this.commentsCollection.add(commentElement.commentId, commentElement);
                comments.push(commentElement);
                count = 0;
            }
        };
        SfdtReader.prototype.parseComment = function (commentData, commentElement) {
            commentElement = new page_1.CommentElementBox(commentData[index_4.dateProperty[this.keywordIndex]]);
            commentElement.author = commentData[index_4.authorProperty[this.keywordIndex]];
            commentElement.initial = commentData[index_4.initialProperty[this.keywordIndex]];
            commentElement.commentId = commentData[index_4.commentIdProperty[this.keywordIndex]];
            commentElement.isResolved = editor_helper_1.HelperMethods.parseBoolValue(commentData[index_4.doneProperty[this.keywordIndex]]);
            commentElement.text = this.parseCommentText(commentData[index_4.blocksProperty[this.keywordIndex]]);
            return commentElement;
        };
        SfdtReader.prototype.parseCommentText = function (blocks) {
            var text = '';
            for (var i = 0; i < blocks.length; i++) {
                if (i !== 0) {
                    text += '\n';
                }
                for (var j = 0; j < blocks[i][index_4.inlinesProperty[this.keywordIndex]].length; j++) {
                    text = text + blocks[i][index_4.inlinesProperty[this.keywordIndex]][j][index_4.textProperty[this.keywordIndex]];
                }
            }
            return text;
        };
        SfdtReader.prototype.parseStyle = function (data, style, styles, resetKeyIndex) {
            var wStyle;
            var keyIndex = 0;
            var editor = this.documentHelper.owner.editor;
            if (!ej2_base_1.isNullOrUndefined(resetKeyIndex) && resetKeyIndex) {
                keyIndex = this.keywordIndex;
                this.keywordIndex = 0;
            }
            if (!ej2_base_1.isNullOrUndefined(style[index_4.typeProperty[this.keywordIndex]])) {
                if (this.getStyleType(style[index_4.typeProperty[this.keywordIndex]]) === 'Paragraph') {
                    wStyle = new index_2.WParagraphStyle();
                    wStyle.type = 'Paragraph';
                }
                if (this.getStyleType(style[index_4.typeProperty[this.keywordIndex]]) === 'Character') {
                    wStyle = new index_2.WCharacterStyle();
                    wStyle.type = 'Character';
                }
                if (!ej2_base_1.isNullOrUndefined(style[index_4.nameProperty[this.keywordIndex]])) {
                    wStyle.name = style[index_4.nameProperty[this.keywordIndex]];
                }
                styles.push(wStyle);
                if (!ej2_base_1.isNullOrUndefined(style[index_4.basedOnProperty[this.keywordIndex]])) {
                    var basedOn = void 0;
                    if (!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) {
                        basedOn = this.documentHelper.styles.findByName(style[index_4.basedOnProperty[this.keywordIndex]]);
                    }
                    else {
                        basedOn = styles.findByName(style[index_4.basedOnProperty[this.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(basedOn)) {
                        if (basedOn.type === wStyle.type && basedOn.name !== wStyle.name) {
                            wStyle.basedOn = basedOn;
                        }
                    }
                    else {
                        var basedStyle = this.getStyle(style[index_4.basedOnProperty[this.keywordIndex]], data);
                        var styleString = void 0;
                        if (!ej2_base_1.isNullOrUndefined(basedStyle) && this.getStyleType(basedStyle[index_4.typeProperty[this.keywordIndex]]) === wStyle.type) {
                            styleString = basedStyle;
                        }
                        else {
                            if (wStyle.type === 'Paragraph') {
                                styleString = JSON.parse('{"type":"Paragraph","name":"Normal","next":"Normal"}');
                            }
                            else {
                                styleString = JSON.parse('{"type": "Character","name": "Default Paragraph Font"}');
                            }
                        }
                        this.parseStyle(data, styleString, styles);
                        if (!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) {
                            wStyle.basedOn = this.documentHelper.styles.findByName(styleString[index_4.nameProperty[this.keywordIndex]]);
                        }
                        else {
                            wStyle.basedOn = styles.findByName(styleString[index_4.nameProperty[this.keywordIndex]]);
                        }
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(style[index_4.linkProperty[this.keywordIndex]])) {
                    var link = styles.findByName(style[index_4.linkProperty[this.keywordIndex]]);
                    var linkStyle = this.getStyle(style[index_4.linkProperty[this.keywordIndex]], data);
                    if (!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) {
                        link = this.documentHelper.styles.findByName(style[index_4.linkProperty[this.keywordIndex]]);
                    }
                    var styleString = void 0;
                    if (ej2_base_1.isNullOrUndefined(link)) {
                        if (ej2_base_1.isNullOrUndefined(linkStyle)) {
                            var charaStyle = {};
                            charaStyle.characterFormat = style[index_4.characterFormatProperty[this.keywordIndex]];
                            charaStyle.name = style[index_4.nameProperty[this.keywordIndex]] + ' Char';
                            charaStyle.type = 'Character';
                            charaStyle.basedOn = style[index_4.basedOnProperty[this.keywordIndex]] === 'Normal' ? 'Default Paragraph Font' : (style[index_4.basedOnProperty[this.keywordIndex]] + ' Char');
                            styleString = charaStyle;
                        }
                        else {
                            styleString = linkStyle;
                        }
                        this.parseStyle(data, styleString, styles);
                        if (!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) {
                            wStyle.link = ej2_base_1.isNullOrUndefined(this.documentHelper.styles.findByName(styleString.name)) ? style[index_4.linkProperty[this.keywordIndex]] : this.documentHelper.styles.findByName(styleString.name);
                        }
                        else {
                            wStyle.link = ej2_base_1.isNullOrUndefined(styles.findByName(styleString.name)) ? style[index_4.linkProperty[this.keywordIndex]] : styles.findByName(styleString.name);
                        }
                    }
                    else {
                        wStyle.link = link;
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(style[index_4.characterFormatProperty[this.keywordIndex]])) {
                    this.parseCharacterFormat(this.keywordIndex, style[index_4.characterFormatProperty[this.keywordIndex]], wStyle.characterFormat);
                }
                if (!ej2_base_1.isNullOrUndefined(style[index_4.paragraphFormatProperty[this.keywordIndex]])) {
                    this.parseParagraphFormat(this.keywordIndex, style[index_4.paragraphFormatProperty[this.keywordIndex]], wStyle.paragraphFormat);
                }
                if (!ej2_base_1.isNullOrUndefined(style[index_4.nextProperty[this.keywordIndex]])) {
                    if (style[index_4.nextProperty[this.keywordIndex]] === style[index_4.nameProperty[this.keywordIndex]]) {
                        wStyle.next = wStyle;
                    }
                    else {
                        var next = void 0;
                        if (!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) {
                            next = this.documentHelper.styles.findByName(style[index_4.nextProperty[this.keywordIndex]]);
                        }
                        else {
                            next = styles.findByName(style[index_4.nextProperty[this.keywordIndex]]);
                        }
                        if (!ej2_base_1.isNullOrUndefined(next) && next.type === wStyle.type) {
                            wStyle.next = next;
                        }
                        else {
                            var nextStyleString = this.getStyle(style[index_4.nextProperty[this.keywordIndex]], data);
                            if (!ej2_base_1.isNullOrUndefined(nextStyleString)) {
                                this.parseStyle(data, nextStyleString, styles);
                                if (!ej2_base_1.isNullOrUndefined(editor) && editor.isRemoteAction) {
                                    wStyle.next = this.documentHelper.styles.findByName(nextStyleString.name);
                                }
                                else {
                                    wStyle.next = styles.findByName(nextStyleString.name);
                                }
                            }
                            else {
                                wStyle.next = wStyle;
                            }
                        }
                    }
                }
            }
            if (!ej2_base_1.isNullOrUndefined(resetKeyIndex) && resetKeyIndex) {
                this.keywordIndex = keyIndex;
            }
            if (!ej2_base_1.isNullOrUndefined(wStyle)) {
                this.documentHelper.addToStylesMap(wStyle);
            }
        };
        SfdtReader.prototype.getStyle = function (name, data) {
            for (var i = 0; i < data[index_4.stylesProperty[this.keywordIndex]].length; i++) {
                if (data[index_4.stylesProperty[this.keywordIndex]][i][index_4.nameProperty[this.keywordIndex]] === name) {
                    return data[index_4.stylesProperty[this.keywordIndex]][i];
                }
            }
            return undefined;
        };
        SfdtReader.prototype.parseAbstractList = function (data, abstractLists) {
            for (var i = 0; i < data[index_4.abstractListsProperty[this.keywordIndex]].length; i++) {
                var abstractList = new abstract_list_1.WAbstractList();
                var abstract = data[index_4.abstractListsProperty[this.keywordIndex]][i];
                if (!ej2_base_1.isNullOrUndefined(abstract)) {
                    if (!ej2_base_1.isNullOrUndefined(abstract[index_4.abstractListIdProperty[this.keywordIndex]])) {
                        abstractList.abstractListId = abstract[index_4.abstractListIdProperty[this.keywordIndex]];
                    }
                    if (!ej2_base_1.isNullOrUndefined(abstract[index_4.nsidProperty])) {
                        abstractList.nsid = abstract[index_4.nsidProperty];
                    }
                    else {
                        abstractList.nsid = editor_helper_1.HelperMethods.generateUniqueId(undefined, abstractLists);
                    }
                    if (!ej2_base_1.isNullOrUndefined(abstract[index_4.levelsProperty[this.keywordIndex]])) {
                        for (var j = 0; j < abstract[index_4.levelsProperty[this.keywordIndex]].length; j++) {
                            var level = abstract[index_4.levelsProperty[this.keywordIndex]][j];
                            if (!ej2_base_1.isNullOrUndefined(level)) {
                                var listLevel = this.parseListLevel(level, abstractList);
                                abstractList.levels.push(listLevel);
                            }
                        }
                    }
                }
                abstractLists.push(abstractList);
            }
        };
        SfdtReader.prototype.parseListLevel = function (data, owner) {
            var listLevel = new list_level_1.WListLevel(owner);
            if (this.getListLevelPattern(data[index_4.listLevelPatternProperty[this.keywordIndex]]) === 'Bullet') {
                listLevel.listLevelPattern = 'Bullet';
                listLevel.numberFormat = !ej2_base_1.isNullOrUndefined(data[index_4.numberFormatProperty[this.keywordIndex]]) ? data[index_4.numberFormatProperty[this.keywordIndex]] : '';
            }
            else {
                listLevel.listLevelPattern = this.getListLevelPattern(data[index_4.listLevelPatternProperty[this.keywordIndex]]);
                listLevel.startAt = data[index_4.startAtProperty[this.keywordIndex]];
                listLevel.numberFormat = !ej2_base_1.isNullOrUndefined(data[index_4.numberFormatProperty[this.keywordIndex]]) ? data[index_4.numberFormatProperty[this.keywordIndex]] : '';
                if (data[index_4.restartLevelProperty[this.keywordIndex]] >= 0) {
                    listLevel.restartLevel = data[index_4.restartLevelProperty[this.keywordIndex]];
                }
                else {
                    listLevel.restartLevel = data[index_4.levelNumberProperty[this.keywordIndex]];
                }
            }
            listLevel.isLegalStyleNumbering = !ej2_base_1.isNullOrUndefined(data[index_4.isLegalStyleNumberingProperty[this.keywordIndex]]) ? editor_helper_1.HelperMethods.parseBoolValue(data[index_4.isLegalStyleNumberingProperty[this.keywordIndex]]) : false;
            listLevel.followCharacter = this.getFollowCharacterType(data[index_4.followCharacterProperty[this.keywordIndex]]);
            this.parseCharacterFormat(this.keywordIndex, data[index_4.characterFormatProperty[this.keywordIndex]], listLevel.characterFormat);
            this.parseParagraphFormat(this.keywordIndex, data[index_4.paragraphFormatProperty[this.keywordIndex]], listLevel.paragraphFormat);
            return listLevel;
        };
        SfdtReader.prototype.parseList = function (data, listCollection) {
            for (var i = 0; i < data[index_4.listsProperty[this.keywordIndex]].length; i++) {
                var list = new list_1.WList();
                var lists = data[index_4.listsProperty[this.keywordIndex]][i];
                if (!ej2_base_1.isNullOrUndefined(lists[index_4.abstractListIdProperty[this.keywordIndex]])) {
                    list.abstractListId = lists[index_4.abstractListIdProperty[this.keywordIndex]];
                    list.abstractList = this.documentHelper.getAbstractListById(lists[index_4.abstractListIdProperty[this.keywordIndex]]);
                }
                listCollection.push(list);
                if (!ej2_base_1.isNullOrUndefined(lists[index_4.listIdProperty[this.keywordIndex]])) {
                    list.listId = lists[index_4.listIdProperty[this.keywordIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(lists[index_4.nsidProperty])) {
                    list.nsid = lists[index_4.nsidProperty];
                }
                else {
                    list.nsid = list.abstractList.nsid;
                }
                if (lists.hasOwnProperty(index_4.levelOverridesProperty[this.keywordIndex])) {
                    this.parseLevelOverride(lists[index_4.levelOverridesProperty[this.keywordIndex]], list);
                }
            }
        };
        SfdtReader.prototype.parseLevelOverride = function (data, list) {
            if (ej2_base_1.isNullOrUndefined(data)) {
                return;
            }
            for (var i = 0; i < data.length; i++) {
                var levelOverrides = new level_override_1.WLevelOverride();
                var levelOverride = data[i];
                levelOverrides.startAt = levelOverride[index_4.startAtProperty[this.keywordIndex]];
                levelOverrides.levelNumber = levelOverride[index_4.levelNumberProperty[this.keywordIndex]];
                if (!ej2_base_1.isNullOrUndefined(levelOverride[index_4.overrideListLevelProperty[this.keywordIndex]])) {
                    levelOverrides.overrideListLevel = this.parseListLevel(levelOverride[index_4.overrideListLevelProperty[this.keywordIndex]], levelOverrides);
                }
                list.levelOverrides.push(levelOverrides);
            }
        };
        SfdtReader.prototype.parseSections = function (data, sections) {
            for (var i = 0; i < data.length; i++) {
                var section = new page_1.BodyWidget();
                section.sectionFormat = new index_1.WSectionFormat(section);
                section.index = i;
                var item = data[i];
                var breakCode = '';
                var nextItem = data[i + 1];
                var sectionFormat = nextItem && nextItem[index_4.sectionFormatProperty[this.keywordIndex]] ? nextItem[index_4.sectionFormatProperty[this.keywordIndex]] : undefined;
                breakCode = sectionFormat && sectionFormat[index_4.breakCodeProperty[this.keywordIndex]] ? sectionFormat[index_4.breakCodeProperty[this.keywordIndex]] : 'NewPage';
                if (!ej2_base_1.isNullOrUndefined(item[index_4.sectionFormatProperty[this.keywordIndex]])) {
                    this.parseSectionFormat(this.keywordIndex, item[index_4.sectionFormatProperty[this.keywordIndex]], section.sectionFormat);
                }
                if (ej2_base_1.isNullOrUndefined(item[index_4.headersFootersProperty[this.keywordIndex]])) {
                    item[index_4.headersFootersProperty[this.keywordIndex]] = {};
                }
                this.documentHelper.headersFooters.push(this.parseHeaderFooter(item[index_4.headersFootersProperty[this.keywordIndex]], this.documentHelper.headersFooters));
                this.isParseHeader = false;
                this.parseTextBody(item[index_4.blocksProperty[this.keywordIndex]], section, i + 1 < data.length, breakCode);
                for (var i_1 = 0; i_1 < section.childWidgets.length; i_1++) {
                    section.childWidgets[i_1].containerWidget = section;
                }
                sections.push(section);
            }
        };
        SfdtReader.prototype.parseHeaderFooter = function (data, headersFooters) {
            this.isParseHeader = true;
            var hfs = {};
            if (!ej2_base_1.isNullOrUndefined(data[index_4.headerProperty[this.keywordIndex]])) {
                var oddHeader = new page_1.HeaderFooterWidget('OddHeader');
                hfs[0] = oddHeader;
                this.parseTextBody(data[index_4.headerProperty[this.keywordIndex]][index_4.blocksProperty[this.keywordIndex]], oddHeader);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.footerProperty[this.keywordIndex]])) {
                var oddFooter = new page_1.HeaderFooterWidget('OddFooter');
                hfs[1] = oddFooter;
                this.parseTextBody(data[index_4.footerProperty[this.keywordIndex]][index_4.blocksProperty[this.keywordIndex]], oddFooter);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.evenHeaderProperty[this.keywordIndex]])) {
                var evenHeader = new page_1.HeaderFooterWidget('EvenHeader');
                hfs[2] = evenHeader;
                this.parseTextBody(data[index_4.evenHeaderProperty[this.keywordIndex]][index_4.blocksProperty[this.keywordIndex]], evenHeader);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.evenFooterProperty[this.keywordIndex]])) {
                var evenFooter = new page_1.HeaderFooterWidget('EvenFooter');
                hfs[3] = evenFooter;
                this.parseTextBody(data[index_4.evenFooterProperty[this.keywordIndex]][index_4.blocksProperty[this.keywordIndex]], evenFooter);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.firstPageHeaderProperty[this.keywordIndex]])) {
                var firstPageHeader = new page_1.HeaderFooterWidget('FirstPageHeader');
                hfs[4] = firstPageHeader;
                this.parseTextBody(data[index_4.firstPageHeaderProperty[this.keywordIndex]][index_4.blocksProperty[this.keywordIndex]], firstPageHeader);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.firstPageFooterProperty[this.keywordIndex]])) {
                var firstPageFooter = new page_1.HeaderFooterWidget('FirstPageFooter');
                hfs[5] = firstPageFooter;
                this.parseTextBody(data[index_4.firstPageFooterProperty[this.keywordIndex]][index_4.blocksProperty[this.keywordIndex]], firstPageFooter);
            }
            return hfs;
        };
        SfdtReader.prototype.parseTextBody = function (data, section, isSectionBreak, breakCode) {
            this.parseBody(data, section.childWidgets, section, isSectionBreak, undefined, undefined, breakCode);
        };
        SfdtReader.prototype.addCustomStyles = function (data) {
            if (!ej2_base_1.isNullOrUndefined(data[index_4.stylesProperty[this.keywordIndex]])) {
                for (var i = 0; i < data[index_4.stylesProperty[this.keywordIndex]].length; i++) {
                    var style = this.documentHelper.styles.findByName(data[index_4.stylesProperty[this.keywordIndex]][i][index_4.nameProperty[this.keywordIndex]]);
                    if (style === undefined) {
                        this.parseStyle(data, data[index_4.stylesProperty[this.keywordIndex]][i], this.documentHelper.styles);
                    }
                }
            }
        };
        SfdtReader.prototype.parseBody = function (data, blocks, container, isSectionBreak, contentControlProperties, styles, breakCode) {
            if (!ej2_base_1.isNullOrUndefined(data)) {
                for (var i = 0; i < data.length; i++) {
                    var block = data[i];
                    var hasValidElmts = false;
                    if (block.hasOwnProperty(index_4.inlinesProperty[this.keywordIndex])) {
                        var writeInlineFormat = false;
                        var paragraph = new page_1.ParagraphWidget();
                        paragraph.characterFormat = new index_1.WCharacterFormat(paragraph);
                        paragraph.paragraphFormat = new index_1.WParagraphFormat(paragraph);
                        if (block[index_4.inlinesProperty[this.keywordIndex]].length > 0) {
                            hasValidElmts = this.parseParagraph(block[index_4.inlinesProperty[this.keywordIndex]], paragraph, writeInlineFormat);
                        }
                        if (!(isSectionBreak && block === data[data.length - 1] && block[index_4.inlinesProperty[this.keywordIndex]].length === 0 && !hasValidElmts)) {
                            this.parseCharacterFormat(this.keywordIndex, block[index_4.characterFormatProperty[this.keywordIndex]], paragraph.characterFormat);
                            this.parseParagraphFormat(this.keywordIndex, block[index_4.paragraphFormatProperty[this.keywordIndex]], paragraph.paragraphFormat);
                            var styleObj = void 0;
                            var styleName = 'Normal';
                            var isParaHasStyleName = false;
                            if (!ej2_base_1.isNullOrUndefined(block[index_4.paragraphFormatProperty[this.keywordIndex]]) && !ej2_base_1.isNullOrUndefined(block[index_4.paragraphFormatProperty[this.keywordIndex]][index_4.styleNameProperty[this.keywordIndex]])) {
                                styleName = block[index_4.paragraphFormatProperty[this.keywordIndex]][index_4.styleNameProperty[this.keywordIndex]];
                                isParaHasStyleName = true;
                            }
                            styleObj = this.documentHelper.styles.findByName(styleName, 'Paragraph');
                            if (!ej2_base_1.isNullOrUndefined(styleObj)) {
                                if (this.isPaste && styles && isParaHasStyleName) {
                                    for (var j = 0; j < styles.length; j++) {
                                        if (styles[j][index_4.nameProperty[this.keywordIndex]] === styleName) {
                                            var fontColor = styles[j][index_4.characterFormatProperty[this.keywordIndex]];
                                            if (ej2_base_1.isNullOrUndefined(fontColor) || fontColor[index_4.fontColorProperty[this.keywordIndex]] !== styleObj.characterFormat.fontColor) {
                                                var charFormat = new index_1.WCharacterFormat();
                                                this.parseCharacterFormat(this.keywordIndex, styles[j][index_4.characterFormatProperty[this.keywordIndex]], charFormat);
                                                styleObj.characterFormat.copyFormat(charFormat);
                                                break;
                                            }
                                        }
                                    }
                                }
                                paragraph.paragraphFormat.applyStyle(styleObj);
                            }
                            blocks.push(paragraph);
                        }
                        else if (isSectionBreak && data.length === 1) {
                            blocks.push(paragraph);
                        }
                        else if (isSectionBreak && block === data[data.length - 1] && block[index_4.inlinesProperty[this.keywordIndex]].length === 0 && !hasValidElmts && breakCode != 'NoBreak') {
                            var dataIndex = data.indexOf(block);
                            var previousData = data[dataIndex - 1];
                            if (!ej2_base_1.isNullOrUndefined(previousData) && previousData.hasOwnProperty(index_4.rowsProperty[this.keywordIndex])) {
                                blocks.push(paragraph);
                                paragraph.isSectionBreak = true;
                            }
                        }
                        paragraph.index = blocks.length - 1;
                        paragraph.containerWidget = container;
                    }
                    else if (block.hasOwnProperty(index_4.rowsProperty[this.keywordIndex])) {
                        this.parseTable(block, blocks, blocks.length, container);
                    }
                    else if (block.hasOwnProperty(index_4.contentControlPropertiesProperty[this.keywordIndex])) {
                        var blockStartContentControl = new page_1.ContentControl('Block');
                        var blockEndContentControl = new page_1.ContentControl('Block');
                        this.parseContentControlProperties(block[index_4.contentControlPropertiesProperty[this.keywordIndex]], blockStartContentControl.contentControlProperties);
                        blockEndContentControl.contentControlProperties = blockStartContentControl.contentControlProperties;
                        blockStartContentControl.type = 0;
                        blockEndContentControl.type = 1;
                        this.parseBody(block[index_4.blocksProperty[this.keywordIndex]], blocks, container, isSectionBreak, blockStartContentControl.contentControlProperties);
                        for (var j = 0; j < 2; j++) {
                            var para = (blocks.length < block[index_4.blocksProperty[this.keywordIndex]].length) ? blocks[0] : j === 0 ? blocks[blocks.length - block[index_4.blocksProperty[this.keywordIndex]].length] : blocks[blocks.length - 1];
                            var blockWidget = void 0;
                            if (para instanceof page_1.ParagraphWidget) {
                                blockWidget = para;
                            }
                            else if (para instanceof page_1.TableWidget) {
                                if (j === 0) {
                                    blockWidget = para.firstChild.firstChild.firstChild;
                                }
                                else {
                                    var cell = para.lastChild.lastChild;
                                    blockWidget = cell.lastChild;
                                }
                            }
                            if (!ej2_base_1.isNullOrUndefined(blockWidget) && blockWidget.childWidgets.length === 0) {
                                var lineWidget = new page_1.LineWidget(blockWidget);
                                blockWidget.childWidgets.push(lineWidget);
                            }
                            if (j === 0) {
                                blockWidget.firstChild.children.splice(0, 0, blockStartContentControl);
                                blockStartContentControl.line = blockWidget.firstChild;
                            }
                            else {
                                blockWidget.lastChild.children.push(blockEndContentControl);
                                blockEndContentControl.line = blockWidget.lastChild;
                            }
                        }
                    }
                    if (!ej2_base_1.isNullOrUndefined(contentControlProperties)) {
                        blocks[blocks.length - 1].contentControlProperties = contentControlProperties;
                    }
                }
            }
        };
        SfdtReader.prototype.parseTable = function (block, blocks, index, section) {
            var table = new page_1.TableWidget();
            table.index = index;
            if (!ej2_base_1.isNullOrUndefined(block[index_4.tableFormatProperty[this.keywordIndex]])) {
                this.parseTableFormat(block[index_4.tableFormatProperty[this.keywordIndex]], table.tableFormat, this.keywordIndex);
            }
            table.tableFormat.title = block[index_4.titleProperty[this.keywordIndex]];
            table.tableFormat.description = block[index_4.descriptionProperty[this.keywordIndex]];
            this.parseTablePositioning(block, table);
            for (var i = 0; i < block[index_4.rowsProperty[this.keywordIndex]].length; i++) {
                var row = new page_1.TableRowWidget();
                row.rowFormat = new index_1.WRowFormat(row);
                var tableRow = block[index_4.rowsProperty[this.keywordIndex]][i];
                if (!ej2_base_1.isNullOrUndefined(tableRow[index_4.contentControlPropertiesProperty[this.keywordIndex]])) {
                    row.contentControlProperties = new page_1.ContentControlProperties('Row');
                    this.parseContentControlProperties(tableRow[index_4.contentControlPropertiesProperty[this.keywordIndex]], row.contentControlProperties);
                }
                if (tableRow.hasOwnProperty(index_4.rowFormatProperty[this.keywordIndex])) {
                    this.parseRowFormat(tableRow[index_4.rowFormatProperty[this.keywordIndex]], row.rowFormat, this.keywordIndex);
                    row.index = i;
                    for (var j = 0; j < tableRow[index_4.cellsProperty[this.keywordIndex]].length; j++) {
                        var cell = new page_1.TableCellWidget();
                        cell.cellFormat = new index_1.WCellFormat(cell);
                        var tableCell = tableRow[index_4.cellsProperty[this.keywordIndex]][j];
                        if (!ej2_base_1.isNullOrUndefined(tableCell[index_4.contentControlPropertiesProperty[this.keywordIndex]])) {
                            cell.contentControlProperties = new page_1.ContentControlProperties('Cell');
                            this.parseContentControlProperties(tableCell[index_4.contentControlPropertiesProperty[this.keywordIndex]], cell.contentControlProperties);
                        }
                        row.childWidgets.push(cell);
                        cell.containerWidget = row;
                        cell.index = j;
                        cell.rowIndex = i;
                        cell.columnIndex = j;
                        if (tableCell.hasOwnProperty(index_4.cellFormatProperty[this.keywordIndex])) {
                            this.parseCellFormat(tableCell[index_4.cellFormatProperty[this.keywordIndex]], cell.cellFormat, this.keywordIndex);
                        }
                        var item = tableCell[index_4.blocksProperty[this.keywordIndex]];
                        for (var k = 0; k < item.length; k++) {
                            if (item[k].hasOwnProperty([index_4.rowsProperty[this.keywordIndex]])) {
                                table.isContainInsideTable = true;
                            }
                        }
                        this.isPageBreakInsideTable = true;
                        this.parseTextBody(tableCell[index_4.blocksProperty[this.keywordIndex]], cell, false);
                        if (!ej2_base_1.isNullOrUndefined(cell.contentControlProperties)) {
                            var cellStartContentControl = new page_1.ContentControl('Cell');
                            var cellEndContentControl = new page_1.ContentControl('Cell');
                            cellStartContentControl.contentControlProperties = cell.contentControlProperties;
                            cellEndContentControl.contentControlProperties = cell.contentControlProperties;
                            cellStartContentControl.type = 0;
                            cellEndContentControl.type = 1;
                            if (cell.firstChild.childWidgets.length === 0) {
                                var lineWidget = new page_1.LineWidget(cell.firstChild);
                                cell.firstChild.childWidgets.push(lineWidget);
                            }
                            cellStartContentControl.line = cell.firstChild.firstChild;
                            cell.firstChild.firstChild.children.splice(0, 0, cellStartContentControl);
                            if (cell.lastChild.childWidgets.length === 0) {
                                var lineWidget = new page_1.LineWidget(cell.lastChild);
                                cell.lastChild.childWidgets.push(lineWidget);
                            }
                            cellEndContentControl.line = cell.lastChild.lastChild;
                            cell.lastChild.lastChild.children.push(cellEndContentControl);
                        }
                        if (!ej2_base_1.isNullOrUndefined(row.contentControlProperties)) {
                            if (row.firstChild === cell) {
                                var rowStartContentControl = new page_1.ContentControl('Row');
                                rowStartContentControl.contentControlProperties = row.contentControlProperties;
                                rowStartContentControl.type = 0;
                                if (cell.firstChild.childWidgets.length === 0) {
                                    var lineWidget = new page_1.LineWidget(cell.firstChild);
                                    cell.firstChild.childWidgets.push(lineWidget);
                                }
                                rowStartContentControl.line = cell.firstChild.firstChild;
                                cell.firstChild.firstChild.children.splice(0, 0, rowStartContentControl);
                            }
                            else if (row.lastChild === cell) {
                                var rowEndContentControl = new page_1.ContentControl('Row');
                                rowEndContentControl.contentControlProperties = row.contentControlProperties;
                                rowEndContentControl.type = 1;
                                if (cell.lastChild.childWidgets.length === 0) {
                                    var lineWidget = new page_1.LineWidget(cell.lastChild);
                                    cell.lastChild.childWidgets.push(lineWidget);
                                }
                                rowEndContentControl.line = cell.lastChild.lastChild;
                                cell.lastChild.lastChild.children.push(rowEndContentControl);
                            }
                        }
                        this.isPageBreakInsideTable = false;
                    }
                }
                table.childWidgets.push(row);
                row.containerWidget = table;
            }
            table.containerWidget = section;
            blocks.push(table);
            table.isGridUpdated = false;
        };
        SfdtReader.prototype.parseTablePositioning = function (block, table) {
            table.wrapTextAround = !ej2_base_1.isNullOrUndefined(block[index_4.wrapTextAroundProperty[this.keywordIndex]]) ? editor_helper_1.HelperMethods.parseBoolValue(block[index_4.wrapTextAroundProperty[this.keywordIndex]]) : false;
            if (table.wrapTextAround) {
                table.positioning = new page_1.TablePosition();
                table.positioning.allowOverlap = editor_helper_1.HelperMethods.parseBoolValue(block[index_4.positioningProperty[this.keywordIndex]][index_4.allowOverlapProperty[this.keywordIndex]]);
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceBottomProperty[this.keywordIndex]])) {
                    table.positioning.distanceBottom = editor_helper_1.HelperMethods.convertPointToPixel(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceBottomProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceLeftProperty[this.keywordIndex]])) {
                    table.positioning.distanceLeft = editor_helper_1.HelperMethods.convertPointToPixel(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceLeftProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceRightProperty[this.keywordIndex]])) {
                    table.positioning.distanceRight = editor_helper_1.HelperMethods.convertPointToPixel(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceRightProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceTopProperty[this.keywordIndex]])) {
                    table.positioning.distanceTop = editor_helper_1.HelperMethods.convertPointToPixel(block[index_4.positioningProperty[this.keywordIndex]][index_4.distanceTopProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.verticalAlignmentProperty[this.keywordIndex]])) {
                    table.positioning.verticalAlignment = this.getTableVerticalPosition(block[index_4.positioningProperty[this.keywordIndex]][index_4.verticalAlignmentProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.verticalOriginProperty[this.keywordIndex]])) {
                    table.positioning.verticalOrigin = this.getTableVerticalRelation(block[index_4.positioningProperty[this.keywordIndex]][index_4.verticalOriginProperty[this.keywordIndex]]);
                }
                table.positioning.verticalPosition = block[index_4.positioningProperty[this.keywordIndex]][index_4.verticalPositionProperty[this.keywordIndex]];
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.horizontalAlignmentProperty[this.keywordIndex]])) {
                    table.positioning.horizontalAlignment = this.getTableHorizontalPosition(block[index_4.positioningProperty[this.keywordIndex]][index_4.horizontalAlignmentProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.positioningProperty[this.keywordIndex]][index_4.horizontalOriginProperty[this.keywordIndex]])) {
                    table.positioning.horizontalOrigin = this.getTableHorizontalRelation(block[index_4.positioningProperty[this.keywordIndex]][index_4.horizontalOriginProperty[this.keywordIndex]]);
                }
                table.positioning.horizontalPosition = block[index_4.positioningProperty[this.keywordIndex]][index_4.horizontalPositionProperty[this.keywordIndex]];
            }
        };
        SfdtReader.prototype.parseRowGridValues = function (data, rowFormat, keyIndex) {
            if (!ej2_base_1.isNullOrUndefined(data[index_4.gridBeforeProperty[keyIndex]])) {
                rowFormat.gridBefore = data[index_4.gridBeforeProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.gridBeforeWidthProperty[keyIndex]])) {
                rowFormat.gridBeforeWidth = data[index_4.gridBeforeWidthProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.gridBeforeWidthTypeProperty[keyIndex]])) {
                rowFormat.gridBeforeWidthType = this.getWidthType(data[index_4.gridBeforeWidthTypeProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.gridAfterProperty[keyIndex]])) {
                rowFormat.gridAfter = data[index_4.gridAfterProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.gridAfterWidthProperty[keyIndex]])) {
                rowFormat.gridAfterWidth = data[index_4.gridAfterWidthProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.gridAfterWidthTypeProperty[keyIndex]])) {
                rowFormat.gridAfterWidthType = this.getWidthType(data[index_4.gridAfterWidthTypeProperty[keyIndex]]);
            }
        };
        SfdtReader.prototype.parseContentControlProperties = function (wContentControlProperties, contentControlProperties) {
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.lockContentControlProperty[this.keywordIndex]])) {
                contentControlProperties.lockContentControl = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.lockContentControlProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.lockContentsProperty[this.keywordIndex]])) {
                contentControlProperties.lockContents = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.lockContentsProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.tagProperty[this.keywordIndex]])) {
                contentControlProperties.tag = wContentControlProperties[index_4.tagProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.colorProperty[this.keywordIndex]])) {
                contentControlProperties.color = wContentControlProperties[index_4.colorProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.titleProperty[this.keywordIndex]])) {
                contentControlProperties.title = wContentControlProperties[index_4.titleProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.appearanceProperty[this.keywordIndex]])) {
                contentControlProperties.appearance = this.getContentControlAppearance(wContentControlProperties[index_4.appearanceProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.typeProperty[this.keywordIndex]])) {
                contentControlProperties.type = this.getContentControlType(wContentControlProperties[index_4.typeProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.hasPlaceHolderTextProperty[this.keywordIndex]])) {
                contentControlProperties.hasPlaceHolderText = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.hasPlaceHolderTextProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.multiLineProperty[this.keywordIndex]])) {
                contentControlProperties.multiline = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.multiLineProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.isTemporaryProperty[this.keywordIndex]])) {
                contentControlProperties.isTemporary = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.isTemporaryProperty[this.keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.characterFormatProperty[this.keywordIndex]])) {
                this.parseCharacterFormat(this.keywordIndex, wContentControlProperties[index_4.characterFormatProperty[this.keywordIndex]], contentControlProperties.characterFormat);
            }
            if (contentControlProperties.type === 'CheckBox') {
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.isCheckedProperty[this.keywordIndex]])) {
                    contentControlProperties.isChecked = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.isCheckedProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.uncheckedStateProperty[this.keywordIndex]])) {
                    contentControlProperties.uncheckedState = new page_1.CheckBoxState();
                    contentControlProperties.uncheckedState.font = wContentControlProperties[index_4.uncheckedStateProperty[this.keywordIndex]][index_4.fontProperty[this.keywordIndex]];
                    contentControlProperties.uncheckedState.value = wContentControlProperties[index_4.uncheckedStateProperty[this.keywordIndex]][index_4.valueProperty[this.keywordIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.checkedStateProperty[this.keywordIndex]])) {
                    contentControlProperties.checkedState = new page_1.CheckBoxState();
                    contentControlProperties.checkedState.font = wContentControlProperties[index_4.checkedStateProperty[this.keywordIndex]][index_4.fontProperty[this.keywordIndex]];
                    contentControlProperties.checkedState.value = wContentControlProperties[index_4.checkedStateProperty[this.keywordIndex]][index_4.valueProperty[this.keywordIndex]];
                }
            }
            else if (contentControlProperties.type === 'Date') {
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.dateCalendarTypeProperty[this.keywordIndex]])) {
                    contentControlProperties.dateCalendarType = this.getDateCalendarType(wContentControlProperties[index_4.dateCalendarTypeProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.dateStorageFormatProperty[this.keywordIndex]])) {
                    contentControlProperties.dateStorageFormat = this.getDateStorageFormat(wContentControlProperties[index_4.dateStorageFormatProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.dateDisplayLocaleProperty[this.keywordIndex]])) {
                    contentControlProperties.dateDisplayLocale = wContentControlProperties[index_4.dateDisplayLocaleProperty[this.keywordIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.dateDisplayFormatProperty[this.keywordIndex]])) {
                    contentControlProperties.dateDisplayFormat = wContentControlProperties[index_4.dateDisplayFormatProperty[this.keywordIndex]];
                }
            }
            else if (contentControlProperties.type === 'ComboBox' || contentControlProperties.type === 'DropDownList') {
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.contentControlListItemsProperty[this.keywordIndex]])) {
                    for (var i = 0; i < wContentControlProperties[index_4.contentControlListItemsProperty[this.keywordIndex]].length; i++) {
                        var contentControlListItem = new page_1.ContentControlListItems();
                        contentControlListItem.displayText = wContentControlProperties[index_4.contentControlListItemsProperty[this.keywordIndex]][i][index_4.displayTextProperty[this.keywordIndex]];
                        contentControlListItem.value = wContentControlProperties[index_4.contentControlListItemsProperty[this.keywordIndex]][i][index_4.valueProperty[this.keywordIndex]];
                        contentControlProperties.contentControlListItems.push(contentControlListItem);
                    }
                }
            }
            if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]])) {
                contentControlProperties.xmlMapping = new page_1.XmlMapping();
                contentControlProperties.xmlMapping.isMapped = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.isMappedProperty[this.keywordIndex]]);
                contentControlProperties.xmlMapping.isWordMl = editor_helper_1.HelperMethods.parseBoolValue(wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.isWordMlProperty[this.keywordIndex]]);
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.prefixMappingProperty[this.keywordIndex]])) {
                    contentControlProperties.xmlMapping.prefixMapping = wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.prefixMappingProperty[this.keywordIndex]];
                }
                contentControlProperties.xmlMapping.xPath = wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.xPathProperty[this.keywordIndex]];
                contentControlProperties.xmlMapping.storeItemId = wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.storeItemIdProperty[this.keywordIndex]];
                if (!ej2_base_1.isNullOrUndefined(wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.customXmlPartProperty[this.keywordIndex]])) {
                    contentControlProperties.xmlMapping.customXmlPart = new page_1.CustomXmlPart();
                    contentControlProperties.xmlMapping.customXmlPart.id = wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.customXmlPartProperty[this.keywordIndex]][index_4.idProperty[this.keywordIndex]];
                    contentControlProperties.xmlMapping.customXmlPart.xml = wContentControlProperties[index_4.xmlMappingProperty[this.keywordIndex]][index_4.customXmlPartProperty[this.keywordIndex]][index_4.xmlProperty[this.keywordIndex]];
                }
            }
        };
        SfdtReader.prototype.parseSymbol = function (fieldCode, lineWidget) {
            var code = fieldCode.split(' ');
            var indexOf = code.indexOf('SYMBOL');
            if (indexOf !== -1) {
                var characterCode = code[indexOf + 1];
                var textElement = new page_1.TextElementBox();
                textElement.characterFormat = new index_1.WCharacterFormat(textElement);
                textElement.text = String.fromCharCode(parseInt(characterCode));
                var fontIndex = code.indexOf('\\f');
                if (fontIndex !== -1) {
                    var fontName = "";
                    for (var j = fontIndex + 1; j < code.length; j++) {
                        if (code[j] === '\\s') {
                            break;
                        }
                        fontName += code[j] + ' ';
                    }
                    if (fontName !== null) {
                        fontName = fontName.replace(/"/g, '');
                        fontName = fontName.trim();
                        textElement.characterFormat.fontFamily = fontName;
                    }
                }
                var sizeIndex = code.indexOf('\\s');
                if (sizeIndex !== -1) {
                    textElement.characterFormat.fontSize = parseInt(code[sizeIndex + 1]);
                }
                textElement.line = lineWidget;
                lineWidget.children.push(textElement);
            }
        };
        SfdtReader.prototype.parseParagraph = function (data, paragraph, writeInlineFormat, lineWidget) {
            var _this = this;
            var isContentControl = false;
            if (ej2_base_1.isNullOrUndefined(lineWidget)) {
                lineWidget = new page_1.LineWidget(paragraph);
            }
            else {
                isContentControl = true;
            }
            var hasValidElmts = false;
            var revision;
            var trackChange = this.viewer.owner.enableTrackChanges;
            var count = 0;
            var isCreateTextEleBox = false;
            var isCreateField = false;
            var fieldCode = undefined;
            var _loop_1 = function (i) {
                var inline = data[i];
                isCreateTextEleBox = false;
                if (inline.hasOwnProperty([index_4.fieldTypeProperty[this_1.keywordIndex]])) {
                    if (inline[index_4.fieldTypeProperty[this_1.keywordIndex]] === 2) {
                        count = i;
                    }
                    if (inline[index_4.fieldTypeProperty[this_1.keywordIndex]] === 1 && count + 1 === i) {
                        isCreateTextEleBox = true;
                        count = 0;
                    }
                }
                if (isCreateTextEleBox && this_1.documentHelper.isPageField) {
                    var textElement = new page_1.FieldTextElementBox();
                    textElement.characterFormat = new index_1.WCharacterFormat(textElement);
                    textElement.text = "";
                    textElement.line = lineWidget;
                    lineWidget.children.push(textElement);
                    hasValidElmts = true;
                    i--;
                    return out_i_1 = i, "continue";
                }
                else if (isCreateTextEleBox && !ej2_base_1.isNullOrUndefined(fieldCode) && fieldCode.indexOf('SYMBOL') !== -1) {
                    this_1.parseSymbol(fieldCode, lineWidget);
                    fieldCode = undefined;
                    isCreateTextEleBox = false;
                }
                if (inline.hasOwnProperty(index_4.textProperty[this_1.keywordIndex]) || inline.hasOwnProperty(index_4.breakClearTypeProperty[this_1.keywordIndex])) {
                    var textElement = undefined;
                    if (this_1.documentHelper.isPageField) {
                        textElement = new page_1.FieldTextElementBox();
                        textElement.fieldBegin = this_1.documentHelper.fieldStacks[this_1.documentHelper.fieldStacks.length - 1];
                    }
                    else if (inline[index_4.textProperty[this_1.keywordIndex]] === '\t') {
                        textElement = new page_1.TabElementBox();
                    }
                    else if (inline[index_4.textProperty[this_1.keywordIndex]] === '\f' && this_1.isPageBreakInsideTable) {
                        return out_i_1 = i, "continue";
                    }
                    else {
                        if (inline.hasOwnProperty(index_4.breakClearTypeProperty[this_1.keywordIndex])) {
                            textElement = new page_1.BreakElementBox();
                            textElement.breakClearType = this_1.getBreakClearType(inline[index_4.breakClearTypeProperty[this_1.keywordIndex]]);
                        }
                        else {
                            textElement = new page_1.TextElementBox();
                        }
                    }
                    textElement.characterFormat = new index_1.WCharacterFormat(textElement);
                    this_1.parseCharacterFormat(this_1.keywordIndex, inline[index_4.characterFormatProperty[this_1.keywordIndex]], textElement.characterFormat, writeInlineFormat);
                    this_1.applyCharacterStyle(inline, textElement);
                    textElement.text = textElement instanceof page_1.BreakElementBox ? "\v" : inline[index_4.textProperty[this_1.keywordIndex]];
                    fieldCode = textElement.text;
                    if (this_1.isHtmlPaste && (textElement instanceof page_1.TextElementBox || textElement instanceof page_1.BreakElementBox)) {
                        var previousElement = void 0;
                        if (lineWidget.children.length > 0) {
                            previousElement = lineWidget.children[lineWidget.children.length - 1];
                        }
                        if (this_1.documentHelper.textHelper.isRTLText(textElement.text)) {
                            textElement.characterFormat.bidi = true;
                            if (previousElement instanceof page_1.TextElementBox && previousElement.text === ' ') {
                                previousElement.characterFormat.bidi = true;
                            }
                        }
                        else if (textElement.text === ' ' && previousElement && previousElement.characterFormat.bidi) {
                            textElement.characterFormat.bidi = true;
                        }
                    }
                    if (this_1.documentHelper.owner.parser.isPaste && !(this_1.isCutPerformed)) {
                        if (!ej2_base_1.isNullOrUndefined(inline[index_4.revisionIdsProperty[this_1.keywordIndex]])) {
                            for (var j = 0; j < inline[index_4.revisionIdsProperty[this_1.keywordIndex]].length; j++) {
                                if (this_1.revisionCollection.containsKey(inline[index_4.revisionIdsProperty[this_1.keywordIndex]][j])) {
                                    if (trackChange) {
                                        revision = this_1.revisionCollection.get(inline[index_4.revisionIdsProperty[this_1.keywordIndex]][j]);
                                    }
                                    if (!ej2_base_1.isNullOrUndefined(revision) && !ej2_base_1.isNullOrUndefined(lineWidget.children[i - 1].revisions[j]) && ((!trackChange) || (trackChange && (revision.revisionType === 'Deletion')))) {
                                        if (revision.revisionID === inline[index_4.revisionIdsProperty[this_1.keywordIndex]][j]) {
                                            inline[index_4.revisionIdsProperty[this_1.keywordIndex]][j] = lineWidget.children[i - 1].revisions[j].revisionID;
                                            this_1.checkAndApplyRevision(this_1.keywordIndex, inline, textElement);
                                            continue;
                                        }
                                    }
                                    if (!trackChange) {
                                        revision = this_1.documentHelper.revisionsInternal.get(inline[index_4.revisionIdsProperty[this_1.keywordIndex]][j]);
                                    }
                                    this_1.documentHelper.owner.editorModule.insertRevision(textElement, revision.revisionType, revision.author);
                                    inline[index_4.revisionIdsProperty[this_1.keywordIndex]][j] = textElement.revisions[j].revisionID;
                                }
                            }
                        }
                    }
                    else {
                        this_1.checkAndApplyRevision(this_1.keywordIndex, inline, textElement);
                    }
                    textElement.line = lineWidget;
                    var lineChildren = lineWidget.children;
                    var lastIndex = lineChildren.length - 1;
                    while (lineChildren.length > 0
                        && lineChildren[lastIndex] instanceof page_1.BookmarkElementBox
                        && !ej2_base_1.isNullOrUndefined(lineChildren[lastIndex].properties)
                        && lineChildren[lastIndex].properties['isAfterParagraphMark'] === true) {
                        lastIndex--;
                    }
                    if (lastIndex !== lineChildren.length - 1) {
                        lineChildren.splice(lastIndex + 1, 0, textElement);
                    }
                    else {
                        lineChildren.push(textElement);
                    }
                    if (textElement instanceof page_1.TextElementBox && textElement.text.length > 90) {
                        editor_helper_1.HelperMethods.splitWordByMaxLength(textElement, lineWidget, true);
                    }
                    hasValidElmts = true;
                }
                else if (inline.hasOwnProperty(index_4.footnoteTypeProperty[this_1.keywordIndex])) {
                    var footnoteElement = new page_1.FootnoteElementBox();
                    footnoteElement.line = lineWidget;
                    footnoteElement.footnoteType = this_1.getFootnoteType(inline[index_4.footnoteTypeProperty[this_1.keywordIndex]]);
                    if (footnoteElement.footnoteType === 'Footnote') {
                        this_1.documentHelper.footnoteCollection.push(footnoteElement);
                    }
                    else {
                        this_1.documentHelper.endnoteCollection.push(footnoteElement);
                    }
                    footnoteElement.symbolCode = inline[index_4.symbolCodeProperty[this_1.keywordIndex]];
                    footnoteElement.symbolFontName = inline[index_4.symbolFontNameProperty[this_1.keywordIndex]];
                    footnoteElement.customMarker = inline[index_4.customMarkerProperty[this_1.keywordIndex]];
                    footnoteElement.characterFormat = new index_1.WCharacterFormat(footnoteElement);
                    this_1.parseCharacterFormat(this_1.keywordIndex, inline[index_4.characterFormatProperty[this_1.keywordIndex]], footnoteElement.characterFormat, writeInlineFormat);
                    this_1.applyCharacterStyle(inline, footnoteElement);
                    this_1.parseBody(inline[index_4.blocksProperty[this_1.keywordIndex]], footnoteElement.bodyWidget.childWidgets, footnoteElement.bodyWidget, false);
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, footnoteElement);
                    lineWidget.children.push(footnoteElement);
                    hasValidElmts = true;
                }
                else if (inline.hasOwnProperty(index_4.chartTypeProperty[this_1.keywordIndex])) {
                    if (this_1.documentHelper.owner.editor) {
                        this_1.documentHelper.owner.editor.chartType = true;
                    }
                    var chartElement = new page_1.ChartElementBox();
                    chartElement.title = inline[index_4.chartTitleProperty[this_1.keywordIndex]];
                    chartElement.type = inline[index_4.chartTypeProperty[this_1.keywordIndex]];
                    chartElement.chartGapWidth = inline[index_4.gapWidthProperty[this_1.keywordIndex]];
                    chartElement.chartOverlap = inline[index_4.overlapProperty[this_1.keywordIndex]];
                    this_1.parseChartTitleArea(inline[index_4.chartTitleAreaProperty[this_1.keywordIndex]], chartElement.chartTitleArea);
                    this_1.parseChartArea(inline[index_4.chartAreaProperty[this_1.keywordIndex]], chartElement.chartArea);
                    this_1.parseChartArea(inline[index_4.plotAreaProperty[this_1.keywordIndex]], chartElement.chartPlotArea);
                    this_1.parseChartLegend(inline[index_4.chartLegendProperty[this_1.keywordIndex]], chartElement.chartLegend);
                    this_1.parseChartData(inline, chartElement);
                    this_1.parseChartCategoryAxis(inline[index_4.chartPrimaryCategoryAxisProperty[this_1.keywordIndex]], chartElement.chartPrimaryCategoryAxis);
                    this_1.parseChartCategoryAxis(inline[index_4.chartPrimaryValueAxisProperty[this_1.keywordIndex]], chartElement.chartPrimaryValueAxis);
                    if (inline[index_4.chartDataTableProperty[this_1.keywordIndex]] != null) {
                        this_1.parseChartDataTable(inline[index_4.chartDataTableProperty[this_1.keywordIndex]], chartElement.chartDataTable);
                    }
                    chartElement.line = lineWidget;
                    lineWidget.children.push(chartElement);
                    chartElement.height = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.heightProperty[this_1.keywordIndex]]);
                    chartElement.width = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.widthProperty[this_1.keywordIndex]]);
                    var officeChart = new ej2_office_chart_1.ChartComponent();
                    officeChart.chartRender(inline, this_1.keywordIndex);
                    chartElement.officeChart = officeChart;
                    officeChart.chart.appendTo(chartElement.targetElement);
                    hasValidElmts = true;
                }
                else if (inline.hasOwnProperty(index_4.imageStringProperty[this_1.keywordIndex])) {
                    var image_1 = new page_1.ImageElementBox(editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.isInlineImageProperty[this_1.keywordIndex]]));
                    image_1.isMetaFile = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.isMetaFileProperty[this_1.keywordIndex]]);
                    image_1.isCompressed = inline[index_4.isCompressedProperty[this_1.keywordIndex]];
                    image_1.metaFileImageString = inline[index_4.metaFileImageStringProperty[this_1.keywordIndex]];
                    image_1.characterFormat = new index_1.WCharacterFormat(image_1);
                    image_1.line = lineWidget;
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, image_1);
                    lineWidget.children.push(image_1);
                    var imageString = editor_helper_1.HelperMethods.formatClippedString(inline[index_4.imageStringProperty[this_1.keywordIndex]]).formatClippedString;
                    var isValidImage = this_1.validateImageUrl(imageString);
                    if (!isValidImage) {
                        image_1.imageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAADgAADY2Njl5eVcXFxjY2NZWVl/f3+wsLCmpqb4+PiioqKpqam7u7vV1dX2uLj2wsLhFRXzpKT3vb30sbHhCwv74+P40dH+9vbkIyO2trbBwcHLy8tsbGycnJz529v4zMzrbGzlLS3qZmblNzfrdXXoRkbvi4vvgYHlHh7CZsBOAAADpUlEQVR4nO3da1faQBSF4ekAUQlUEFs14AXxVv7/D6yaQiZx5mSEYXF2ut+PNKzyyK5diYDmR9czx34AB49C/CjE759w3jvvWr15Tdgz3atXE54f++EcIArxoxA/CvGjED8K8aMQPwrxoxA/CvGLEeZ9jPJdhfk4GyCUjb3ECGE/Q6m/q3DwfudjP0ERZYN9hKdn2hvd3+0jHJz5/kBVuTk96bbQUEjhYR9ckiikUH8UUqg/CinUH4UU6o9CCvVHIYX6o5BC/VFIof4opFB/FFKoPwop1B+FFOqPQgrjyxfjVC38Lxk9tnAxGqZqdKtSOE4GHA5/fuNJpDCtcNHbv4VqYYqPLjgfUViPQgrjozA2CptRSGF8/59w+Wrt+rr1btNna1cPzg0wwuXavncxabnX7PfHYYXzlYARvlobQZyUR9mXm+1NMEK7SSLONgcVV9vb8IQXv4J3KSeKKlxXxNCzONkeYp8AV3p9UT1+P3FWHVAsq5thhGZSEb1DrSZq7dS5HUdoLiuBZ6jORG3tCwAkNJfCUJ2Jrqe1P0ESCkMNTdSACYNDDU7UoAkDQw1P1MAJvUMVJmrwhJ6hShM1gMIvQxUnahCFjaHKEzWQQneoxR95ogZTWBuqPFEDKnSHKk/UoArdoYoTNbDC5lBDEzW4QjMpYiZqgIXG/S76JhwHK5zVVipcnkIVuv/RW/HyFKhwYhuFr6NiCmdNoDBUSGFjovJQEYXuRN9ahwoorJ8uSZenPsMTNk+X2q6jwgm/ntHL11HhhL4zenmoYEL/Gb04VCxh6KKTNFQoYfiikzBUJKF00Sk8VCChfF00OFQcYdt10dBQYYRT5xn0n9G7Q0X8GfCzNNEyZ6iPgD/HlydaVg11DfhajJaJlm2HugIUrlomWrYZKuJKHz6vHhbSM/hROdRnxNe1meuXYvW0DB6+aflYrB7dlzDiCM3N1dVN6GDhMCDhjlHYjEIK46MwNgqbUUhhfJ/vA07wO8N1vw94ONo/3e/lTpVOYfc/UyG//ZmqW52fi/FuTNW3/lZ+eguF+qOQQv1RSKH+KKRQfxRSqD8KKdQfhRTqj0IK9UchhfqjkEL9UUih/iikUH8UUqg/CmXh6Hsv3jlK+wnvD/vgkrSHMMuyu1P9ZdmuwnycDQYn+svG3n9KEUKT9zHyf6+IEWJHIX4U4kchfhTiRyF+FOJHIX4U4kchfnVhijeZa6sunCf4ZdPamteEHY5C/CjEr/vCv0ec0g+AtS1QAAAAAElFTkSuQmCC';
                    }
                    else {
                        if (this_1.isPaste && !ej2_base_1.isNullOrUndefined(this_1.documentHelper.owner.editor.pasteImageIndex)) {
                            image_1.imageString = this_1.documentHelper.owner.editor.pasteImageIndex.get(inline[index_4.imageStringProperty[this_1.keywordIndex]]);
                        }
                        else {
                            image_1.imageString = inline[index_4.imageStringProperty[this_1.keywordIndex]];
                        }
                    }
                    var imgStrValue = parseInt(inline[index_4.imageStringProperty[this_1.keywordIndex]]);
                    if (imgStrValue.toString() === "NaN" ? true : false) {
                        this_1.documentHelper.addBase64StringInCollection(image_1);
                    }
                    image_1.width = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.widthProperty[this_1.keywordIndex]]);
                    image_1.height = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.heightProperty[this_1.keywordIndex]]);
                    var imgStr = this_1.documentHelper.getImageString(image_1);
                    if (!ej2_base_1.isNullOrUndefined(imgStr) && (editor_helper_1.HelperMethods.startsWith(imgStr, 'http://') || editor_helper_1.HelperMethods.startsWith(imgStr, 'https://'))) {
                        image_1.element.crossOrigin = 'Anonymous';
                        this_1.viewer.documentHelper.getBase64(imgStr, image_1.width, image_1.height).then(function (imageUrlString) {
                            _this.viewer.documentHelper.images.get(parseInt(image_1.imageString))[1] = imageUrlString;
                        });
                        imgStr += "?t=" + new Date().getTime();
                    }
                    image_1.element.src = imgStr;
                    image_1.top = inline[index_4.topProperty[this_1.keywordIndex]];
                    image_1.left = inline[index_4.leftProperty[this_1.keywordIndex]];
                    image_1.bottom = inline[index_4.bottomProperty[this_1.keywordIndex]];
                    image_1.right = inline[index_4.rightProperty[this_1.keywordIndex]];
                    image_1.cropHeightScale = inline[index_4.getImageHeightProperty[this_1.keywordIndex]];
                    image_1.cropWidthScale = inline[index_4.getImageWidthProperty[this_1.keywordIndex]];
                    image_1.name = inline[index_4.nameProperty[this_1.keywordIndex]];
                    image_1.alternateText = inline[index_4.alternativeTextProperty[this_1.keywordIndex]];
                    image_1.title = inline[index_4.titleProperty[this_1.keywordIndex]];
                    image_1.visible = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.visibleProperty[this_1.keywordIndex]]);
                    image_1.widthScale = inline[index_4.widthScaleProperty[this_1.keywordIndex]];
                    image_1.heightScale = inline[index_4.heightScaleProperty[this_1.keywordIndex]];
                    image_1.verticalPosition = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.verticalPositionProperty[this_1.keywordIndex]]);
                    image_1.verticalOrigin = this_1.getVerticalOrigin(inline[index_4.verticalOriginProperty[this_1.keywordIndex]]);
                    image_1.verticalAlignment = this_1.getShapeVerticalAlignment(inline[index_4.verticalAlignmentProperty[this_1.keywordIndex]]);
                    image_1.horizontalPosition = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.horizontalPositionProperty[this_1.keywordIndex]]);
                    image_1.horizontalOrigin = this_1.getHorizontalOrigin(inline[index_4.horizontalOriginProperty[this_1.keywordIndex]]);
                    image_1.horizontalAlignment = this_1.getShapeHorizontalAlignment(inline[index_4.horizontalAlignmentProperty[this_1.keywordIndex]]);
                    image_1.allowOverlap = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.allowOverlapProperty[this_1.keywordIndex]]);
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.textWrappingStyleProperty[this_1.keywordIndex]])) {
                        image_1.textWrappingStyle = this_1.getTextWrappingStyle(inline[index_4.textWrappingStyleProperty[this_1.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.textWrappingTypeProperty[this_1.keywordIndex]])) {
                        image_1.textWrappingType = this_1.getTextWrappingType(inline[index_4.textWrappingTypeProperty[this_1.keywordIndex]]);
                    }
                    image_1.isBelowText = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.belowTextProperty[this_1.keywordIndex]]);
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceBottomProperty[this_1.keywordIndex]])) {
                        image_1.distanceBottom = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceBottomProperty[this_1.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceLeftProperty[this_1.keywordIndex]])) {
                        image_1.distanceLeft = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceLeftProperty[this_1.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceRightProperty[this_1.keywordIndex]])) {
                        image_1.distanceRight = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceRightProperty[this_1.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceTopProperty[this_1.keywordIndex]])) {
                        image_1.distanceTop = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceTopProperty[this_1.keywordIndex]]);
                    }
                    image_1.zOrderPosition = inline[index_4.zOrderPositionProperty[this_1.keywordIndex]];
                    image_1.layoutInCell = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.layoutInCellProperty[this_1.keywordIndex]]);
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.topProperty[this_1.keywordIndex]]) && inline[index_4.topProperty[this_1.keywordIndex]] !== 0 ||
                        !ej2_base_1.isNullOrUndefined(inline[index_4.bottomProperty[this_1.keywordIndex]]) && inline[index_4.bottomProperty[this_1.keywordIndex]] !== 0 ||
                        !ej2_base_1.isNullOrUndefined(inline[index_4.leftProperty[this_1.keywordIndex]]) && inline[index_4.leftProperty[this_1.keywordIndex]] !== 0 ||
                        !ej2_base_1.isNullOrUndefined(inline[index_4.rightProperty[this_1.keywordIndex]]) && inline[index_4.rightProperty[this_1.keywordIndex]] !== 0) {
                        image_1.isCrop = true;
                    }
                    if (this_1.getTextWrappingStyle(image_1.textWrappingStyle) !== 'Inline') {
                        paragraph.floatingElements.push(image_1);
                    }
                    this_1.parseCharacterFormat(this_1.keywordIndex, inline[index_4.characterFormatProperty[this_1.keywordIndex]], image_1.characterFormat);
                    hasValidElmts = true;
                }
                else if (inline.hasOwnProperty(index_4.hasFieldEndProperty[this_1.keywordIndex]) || (inline.hasOwnProperty(index_4.fieldTypeProperty[this_1.keywordIndex]) && inline[index_4.fieldTypeProperty[this_1.keywordIndex]] === 0)) {
                    isCreateField = true;
                    var fieldBegin = new page_1.FieldElementBox(0);
                    this_1.parseCharacterFormat(this_1.keywordIndex, inline[index_4.characterFormatProperty[this_1.keywordIndex]], fieldBegin.characterFormat, writeInlineFormat);
                    this_1.applyCharacterStyle(inline, fieldBegin);
                    fieldBegin.fieldCodeType = inline.fieldCodeType;
                    fieldBegin.hasFieldEnd = inline[index_4.hasFieldEndProperty[this_1.keywordIndex]];
                    if (inline.hasOwnProperty(index_4.formFieldDataProperty[this_1.keywordIndex])) {
                        var formFieldData = void 0;
                        formFieldData = this_1.parseFormFieldData(this_1.keywordIndex, inline, formFieldData);
                        fieldBegin.formFieldData = formFieldData;
                        this_1.documentHelper.formFields.push(fieldBegin);
                    }
                    this_1.documentHelper.fieldStacks.push(fieldBegin);
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, fieldBegin);
                    fieldBegin.line = lineWidget;
                    this_1.documentHelper.fields.push(fieldBegin);
                    lineWidget.children.push(fieldBegin);
                }
                else if (inline.hasOwnProperty([index_4.fieldTypeProperty[this_1.keywordIndex]])) {
                    var field = undefined;
                    if (inline[index_4.fieldTypeProperty[this_1.keywordIndex]] === 2 || (inline[index_4.fieldTypeProperty[this_1.keywordIndex]] === 1 && isCreateField)) {
                        field = new page_1.FieldElementBox(2);
                        this_1.parseCharacterFormat(this_1.keywordIndex, inline[index_4.characterFormatProperty[this_1.keywordIndex]], field.characterFormat, writeInlineFormat);
                        this_1.checkAndApplyRevision(this_1.keywordIndex, inline, field);
                        this_1.fieldSeparator = field;
                        if (this_1.documentHelper.fieldStacks.length > 0) {
                            field.fieldBegin = this_1.documentHelper.fieldStacks[this_1.documentHelper.fieldStacks.length - 1];
                            field.fieldBegin.fieldSeparator = field;
                            var lineWidgetCount = lineWidget.children.length;
                            if (lineWidgetCount >= 2) {
                                var fieldTextElement = this_1.containsFieldBegin(lineWidget);
                                if (!ej2_base_1.isNullOrUndefined(fieldTextElement) && fieldTextElement instanceof page_1.TextElementBox && (fieldTextElement.text.match('PAGE') || fieldTextElement.text.match('page'))) {
                                    var textField = fieldTextElement.text.replace(/^\s+/g, '');
                                    if (!textField.startsWith('HYPERLINK')) {
                                        this_1.documentHelper.isPageField = true;
                                    }
                                }
                            }
                        }
                        if (inline[index_4.fieldTypeProperty[this_1.keywordIndex]] === 1 && isCreateField) {
                            i--;
                            count = i;
                        }
                        isCreateField = false;
                    }
                    else if (inline[index_4.fieldTypeProperty[this_1.keywordIndex]] === 1) {
                        field = new page_1.FieldElementBox(1);
                        this_1.parseCharacterFormat(this_1.keywordIndex, inline[index_4.characterFormatProperty[this_1.keywordIndex]], field.characterFormat, writeInlineFormat);
                        this_1.applyCharacterStyle(inline, field);
                        this_1.checkAndApplyRevision(this_1.keywordIndex, inline, field);
                        if (this_1.documentHelper.fieldStacks.length > 0) {
                            field.fieldBegin = this_1.documentHelper.fieldStacks[this_1.documentHelper.fieldStacks.length - 1];
                            field.fieldBegin.fieldEnd = field;
                        }
                        if (!ej2_base_1.isNullOrUndefined(field.fieldBegin) && field.fieldBegin.fieldSeparator) {
                            field.fieldSeparator = field.fieldBegin.fieldSeparator;
                            field.fieldBegin.fieldSeparator.fieldEnd = field;
                            hasValidElmts = true;
                        }
                        this_1.documentHelper.fieldStacks.splice(this_1.documentHelper.fieldStacks.length - 1, 1);
                        this_1.fieldSeparator = undefined;
                        this_1.documentHelper.isPageField = false;
                        this_1.documentHelper.fieldCollection.push(field.fieldBegin);
                        fieldCode = undefined;
                    }
                    field.line = lineWidget;
                    lineWidget.children.push(field);
                }
                else if (inline.hasOwnProperty([index_4.bookmarkTypeProperty[this_1.keywordIndex]])) {
                    var bookmark = undefined;
                    bookmark = new page_1.BookmarkElementBox(inline[index_4.bookmarkTypeProperty[this_1.keywordIndex]]);
                    bookmark.name = inline[index_4.nameProperty[this_1.keywordIndex]];
                    bookmark.properties = inline[index_4.propertiesProperty[this_1.keywordIndex]];
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.propertiesProperty[this_1.keywordIndex]])) {
                        if (!ej2_base_1.isNullOrUndefined(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterParagraphMarkProperty[this_1.keywordIndex]])) {
                            bookmark.properties['isAfterParagraphMark'] = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterParagraphMarkProperty[this_1.keywordIndex]]);
                        }
                        if (!ej2_base_1.isNullOrUndefined(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterTableMarkProperty[this_1.keywordIndex]])) {
                            bookmark.properties['isAfterTableMark'] = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterTableMarkProperty[this_1.keywordIndex]]);
                        }
                        if (!ej2_base_1.isNullOrUndefined(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterRowMarkProperty[this_1.keywordIndex]])) {
                            bookmark.properties['isAfterRowMark'] = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterRowMarkProperty[this_1.keywordIndex]]);
                        }
                        if (!ej2_base_1.isNullOrUndefined(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterCellMarkProperty[this_1.keywordIndex]])) {
                            bookmark.properties['isAfterCellMark'] = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.isAfterCellMarkProperty[this_1.keywordIndex]]);
                        }
                        if (!ej2_base_1.isNullOrUndefined(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.columnFirstProperty[this_1.keywordIndex]])) {
                            bookmark.properties['columnFirst'] = inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.columnFirstProperty[this_1.keywordIndex]];
                        }
                        if (!ej2_base_1.isNullOrUndefined(inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.columnLastProperty[this_1.keywordIndex]])) {
                            bookmark.properties['columnLast'] = inline[index_4.propertiesProperty[this_1.keywordIndex]][index_4.columnLastProperty[this_1.keywordIndex]];
                        }
                    }
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, bookmark);
                    lineWidget.children.push(bookmark);
                    bookmark.line = lineWidget;
                    if (!this_1.isParseHeader || this_1.isPaste) {
                        if (inline[index_4.bookmarkTypeProperty[this_1.keywordIndex]] === 0) {
                            var isAdd = this_1.isPaste && !this_1.documentHelper.bookmarks.containsKey(bookmark.name);
                            if (!this_1.isPaste || isAdd) {
                                this_1.documentHelper.bookmarks.add(bookmark.name, bookmark);
                            }
                            else if (!isAdd) {
                                lineWidget.children.splice(lineWidget.children.indexOf(bookmark), 1);
                            }
                        }
                        else if (inline[index_4.bookmarkTypeProperty[this_1.keywordIndex]] === 1) {
                            if (this_1.documentHelper.bookmarks.containsKey(bookmark.name)) {
                                var bookmarkStart = this_1.documentHelper.bookmarks.get(bookmark.name);
                                var isConsider = this_1.isPaste && ej2_base_1.isNullOrUndefined(bookmarkStart.reference);
                                if (!this_1.isPaste || isConsider) {
                                    bookmarkStart.reference = bookmark;
                                    bookmark.reference = bookmarkStart;
                                    this_1.documentHelper.endBookmarksUpdated.push(bookmark.name);
                                }
                                else if (!isConsider) {
                                    lineWidget.children.splice(lineWidget.children.indexOf(bookmark), 1);
                                }
                            }
                        }
                    }
                    if (bookmark.name.indexOf('_') !== 0) {
                        hasValidElmts = true;
                    }
                }
                else if (inline.hasOwnProperty([index_4.editRangeIdProperty[this_1.keywordIndex]])) {
                    if (inline.hasOwnProperty(index_4.editableRangeStartProperty[this_1.keywordIndex])) {
                        var permEnd = new page_1.EditRangeEndElementBox();
                        if (this_1.editableRanges.containsKey(inline[index_4.editRangeIdProperty[this_1.keywordIndex]])) {
                            var start = this_1.editableRanges.get(inline[index_4.editRangeIdProperty[this_1.keywordIndex]]);
                            permEnd.editRangeStart = start;
                            start.editRangeEnd = permEnd;
                            if (!ej2_base_1.isNullOrUndefined(inline[index_4.editRangeIdProperty[this_1.keywordIndex]])) {
                                permEnd.editRangeId = inline[index_4.editRangeIdProperty[this_1.keywordIndex]];
                            }
                            this_1.editableRanges.remove(inline[index_4.editRangeIdProperty[this_1.keywordIndex]]);
                        }
                        lineWidget.children.push(permEnd);
                        permEnd.line = lineWidget;
                    }
                    else {
                        var permStart = this_1.parseEditableRangeStart(inline);
                        lineWidget.children.push(permStart);
                        permStart.line = lineWidget;
                        if (!this_1.editableRanges.containsKey(inline[index_4.editRangeIdProperty[this_1.keywordIndex]])) {
                            this_1.editableRanges.add(inline[index_4.editRangeIdProperty[this_1.keywordIndex]], permStart);
                        }
                    }
                    hasValidElmts = true;
                }
                else if (inline.hasOwnProperty([index_4.commentIdProperty[this_1.keywordIndex]])) {
                    var commentID = inline[index_4.commentIdProperty[this_1.keywordIndex]];
                    var commentStart = undefined;
                    var comment = void 0;
                    if (this_1.commentStarts.containsKey(commentID)) {
                        commentStart = this_1.commentStarts.get(commentID);
                    }
                    var commentEnd = undefined;
                    if (this_1.commentEnds.containsKey(commentID)) {
                        commentEnd = this_1.commentEnds.get(commentID);
                    }
                    if (inline.hasOwnProperty([index_4.commentCharacterTypeProperty[this_1.keywordIndex]])) {
                        if (inline[index_4.commentCharacterTypeProperty[this_1.keywordIndex]] === 0) {
                            var commentStartElement = new page_1.CommentCharacterElementBox(0);
                            commentStartElement.commentId = commentID;
                            if (!this_1.commentStarts.containsKey(commentID)) {
                                this_1.commentStarts.add(commentID, commentStartElement);
                            }
                            commentStartElement.line = lineWidget;
                            lineWidget.children.push(commentStartElement);
                            comment = this_1.commentsCollection.get(commentID);
                            if (!ej2_base_1.isNullOrUndefined(comment)) {
                                comment.commentStart = commentStartElement;
                                commentStartElement.comment = comment;
                            }
                        }
                        else {
                            var commentEndElement = new page_1.CommentCharacterElementBox(1);
                            commentEndElement.commentId = commentID;
                            if (!this_1.commentEnds.containsKey(commentID)) {
                                this_1.commentEnds.add(commentID, commentEndElement);
                            }
                            commentEndElement.line = lineWidget;
                            lineWidget.children.push(commentEndElement);
                            comment = this_1.commentsCollection.get(commentID);
                            if (!ej2_base_1.isNullOrUndefined(comment)) {
                                comment.commentEnd = commentEndElement;
                                commentEndElement.comment = comment;
                            }
                        }
                        if (!ej2_base_1.isNullOrUndefined(comment) && comment.isReply) {
                            if (ej2_base_1.isNullOrUndefined(comment.ownerComment.commentStart)) {
                                comment.ownerComment.commentStart = comment.commentStart;
                            }
                            if (ej2_base_1.isNullOrUndefined(comment.ownerComment.commentEnd)) {
                                comment.ownerComment.commentEnd = comment.commentEnd;
                            }
                        }
                    }
                }
                else if (inline.hasOwnProperty([index_4.shapeIdProperty[this_1.keywordIndex]])) {
                    var shape = new page_1.ShapeElementBox();
                    shape.shapeId = inline[index_4.shapeIdProperty[this_1.keywordIndex]];
                    shape.name = inline[index_4.nameProperty[this_1.keywordIndex]];
                    shape.alternateText = inline[index_4.alternativeTextProperty[this_1.keywordIndex]];
                    shape.title = inline[index_4.titleProperty[this_1.keywordIndex]];
                    shape.visible = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.visibleProperty[this_1.keywordIndex]]);
                    shape.width = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.widthProperty[this_1.keywordIndex]]);
                    shape.height = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.heightProperty[this_1.keywordIndex]]);
                    if (shape.height === 0) {
                        shape.isZeroHeight = true;
                    }
                    shape.widthScale = inline[index_4.widthScaleProperty[this_1.keywordIndex]];
                    shape.heightScale = inline[index_4.heightScaleProperty[this_1.keywordIndex]];
                    shape.verticalPosition = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.verticalPositionProperty[this_1.keywordIndex]]);
                    shape.verticalOrigin = this_1.getVerticalOrigin(inline[index_4.verticalOriginProperty[this_1.keywordIndex]]);
                    shape.verticalAlignment = this_1.getShapeVerticalAlignment(inline[index_4.verticalAlignmentProperty[this_1.keywordIndex]]);
                    shape.verticalRelativePercent = inline[index_4.verticalRelativePercentProperty[this_1.keywordIndex]];
                    shape.horizontalPosition = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.horizontalPositionProperty[this_1.keywordIndex]]);
                    shape.horizontalOrigin = this_1.getHorizontalOrigin(inline[index_4.horizontalOriginProperty[this_1.keywordIndex]]);
                    shape.horizontalAlignment = this_1.getShapeHorizontalAlignment(inline[index_4.horizontalAlignmentProperty[this_1.keywordIndex]]);
                    shape.horizontalRelativePercent = inline[index_4.horizontalRelativePercentProperty[this_1.keywordIndex]];
                    shape.heightRelativePercent = inline[index_4.heightRelativePercentProperty[this_1.keywordIndex]];
                    shape.widthRelativePercent = inline[index_4.widthRelativePercentProperty[this_1.keywordIndex]];
                    shape.zOrderPosition = inline[index_4.zOrderPositionProperty[this_1.keywordIndex]];
                    shape.allowOverlap = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.allowOverlapProperty[this_1.keywordIndex]]);
                    shape.textWrappingStyle = this_1.getTextWrappingStyle(inline[index_4.textWrappingStyleProperty[this_1.keywordIndex]]);
                    shape.textWrappingType = this_1.getTextWrappingType(inline[index_4.textWrappingTypeProperty[this_1.keywordIndex]]);
                    shape.isBelowText = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.belowTextProperty[this_1.keywordIndex]]);
                    shape.isHorizontalRule = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.horizontalRuleProperty[this_1.keywordIndex]]);
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceBottomProperty[this_1.keywordIndex]])) {
                        shape.distanceBottom = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceBottomProperty[this_1.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceLeftProperty[this_1.keywordIndex]])) {
                        shape.distanceLeft = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceLeftProperty[this_1.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceRightProperty[this_1.keywordIndex]])) {
                        shape.distanceRight = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceRightProperty[this_1.keywordIndex]]);
                    }
                    if (!ej2_base_1.isNullOrUndefined(inline[index_4.distanceTopProperty[this_1.keywordIndex]])) {
                        shape.distanceTop = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.distanceTopProperty[this_1.keywordIndex]]);
                    }
                    shape.layoutInCell = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.layoutInCellProperty[this_1.keywordIndex]]);
                    shape.lockAnchor = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.lockAnchorProperty[this_1.keywordIndex]]);
                    shape.autoShapeType = this_1.getAutoShapeType(inline[index_4.autoShapeTypeProperty[this_1.keywordIndex]]);
                    if (inline.hasOwnProperty(index_4.lineFormatProperty[this_1.keywordIndex])) {
                        var lineFormat = new page_1.LineFormat();
                        lineFormat.line = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.lineFormatProperty[this_1.keywordIndex]][index_4.lineProperty[this_1.keywordIndex]]);
                        lineFormat.lineFormatType = this_1.getLineFormatType(inline[index_4.lineFormatProperty[this_1.keywordIndex]][index_4.lineFormatTypeProperty[this_1.keywordIndex]]);
                        lineFormat.color = inline[index_4.lineFormatProperty[this_1.keywordIndex]][index_4.colorProperty[this_1.keywordIndex]];
                        lineFormat.weight = inline[index_4.lineFormatProperty[this_1.keywordIndex]][index_4.weightProperty[this_1.keywordIndex]];
                        lineFormat.dashStyle = this_1.getLineDashStyle(inline[index_4.lineFormatProperty[this_1.keywordIndex]][index_4.lineStyleProperty[this_1.keywordIndex]]);
                        shape.lineFormat = lineFormat;
                    }
                    if (inline.hasOwnProperty(index_4.fillFormatProperty[this_1.keywordIndex])) {
                        var fillFormat = new page_1.FillFormat();
                        fillFormat.color = inline[index_4.fillFormatProperty[this_1.keywordIndex]][index_4.colorProperty[this_1.keywordIndex]];
                        fillFormat.fill = editor_helper_1.HelperMethods.parseBoolValue(inline[index_4.fillFormatProperty[this_1.keywordIndex]][index_4.fillProperty[this_1.keywordIndex]]);
                        shape.fillFormat = fillFormat;
                    }
                    if (inline.hasOwnProperty(index_4.textFrameProperty[this_1.keywordIndex])) {
                        var textFrame = new page_1.TextFrame();
                        textFrame.textVerticalAlignment = this_1.getTextVerticalAlignment(inline[index_4.textFrameProperty[this_1.keywordIndex]][index_4.textVerticalAlignmentProperty[this_1.keywordIndex]]);
                        textFrame.marginLeft = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.textFrameProperty[this_1.keywordIndex]][index_4.leftMarginProperty[this_1.keywordIndex]]);
                        textFrame.marginRight = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.textFrameProperty[this_1.keywordIndex]][index_4.rightMarginProperty[this_1.keywordIndex]]);
                        textFrame.marginTop = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.textFrameProperty[this_1.keywordIndex]][index_4.topMarginProperty[this_1.keywordIndex]]);
                        textFrame.marginBottom = editor_helper_1.HelperMethods.convertPointToPixel(inline[index_4.textFrameProperty[this_1.keywordIndex]][index_4.bottomMarginProperty[this_1.keywordIndex]]);
                        this_1.parseBody(inline[index_4.textFrameProperty[this_1.keywordIndex]][index_4.blocksProperty[this_1.keywordIndex]], textFrame.childWidgets, textFrame);
                        shape.textFrame = textFrame;
                        textFrame.containerShape = shape;
                    }
                    shape.line = lineWidget;
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, shape);
                    lineWidget.children.push(shape);
                    paragraph.floatingElements.push(shape);
                }
                else if (inline.hasOwnProperty(index_4.contentControlPropertiesProperty[this_1.keywordIndex])) {
                    var inlineStartContentControl = new page_1.ContentControl('Inline');
                    var inlineEndContentControl = new page_1.ContentControl('Inline');
                    this_1.parseContentControlProperties(inline[index_4.contentControlPropertiesProperty[this_1.keywordIndex]], inlineStartContentControl.contentControlProperties);
                    inlineEndContentControl.contentControlProperties = inlineStartContentControl.contentControlProperties;
                    inlineStartContentControl.line = lineWidget;
                    inlineEndContentControl.line = lineWidget;
                    inlineStartContentControl.type = 0;
                    inlineEndContentControl.type = 1;
                    lineWidget.children.push(inlineStartContentControl);
                    this_1.parseParagraph(inline[index_4.inlinesProperty[this_1.keywordIndex]], paragraph, writeInlineFormat, lineWidget);
                    var element = lineWidget.children[lineWidget.children.length - 1];
                    while (!(element instanceof page_1.ContentControl)) {
                        element.contentControlProperties = inlineStartContentControl.contentControlProperties;
                        element = element.previousElement;
                    }
                    lineWidget.children.push(inlineEndContentControl);
                    hasValidElmts = true;
                }
                out_i_1 = i;
            };
            var this_1 = this, out_i_1;
            for (var i = 0; i < data.length; i++) {
                _loop_1(i);
                i = out_i_1;
            }
            this.isCutPerformed = false;
            if (!isContentControl) {
                paragraph.childWidgets.push(lineWidget);
            }
            return hasValidElmts;
        };
        SfdtReader.prototype.parseFormFieldData = function (keywordIndex, sourceData, formFieldData) {
            if (formFieldData instanceof page_1.TextFormField || formFieldData instanceof page_1.CheckBoxFormField || formFieldData instanceof page_1.DropDownFormField) {
                if (formFieldData instanceof page_1.CheckBoxFormField) {
                    formFieldData.sizeType = sourceData.sizeType;
                    formFieldData.size = sourceData.size;
                    formFieldData.defaultValue = sourceData.defaultValue;
                    formFieldData.checked = sourceData.checked;
                }
                else if (formFieldData instanceof page_1.TextFormField) {
                    formFieldData.type = sourceData.type;
                    formFieldData.maxLength = sourceData.maxLength;
                    formFieldData.defaultValue = sourceData.defaultValue;
                    formFieldData.format = sourceData.format;
                }
                else {
                    formFieldData.dropdownItems = sourceData.dropdownItems;
                    formFieldData.selectedIndex = sourceData.selectedIndex;
                }
                formFieldData.name = sourceData.name;
                formFieldData.enabled = sourceData.enabled;
                formFieldData.helpText = sourceData.helpText;
                formFieldData.statusText = sourceData.statusText;
            }
            else {
                if (sourceData[index_4.formFieldDataProperty[keywordIndex]].hasOwnProperty(index_4.textInputProperty[keywordIndex])) {
                    formFieldData = new page_1.TextFormField();
                    formFieldData.type = this.getTextFormFieldType(sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.textInputProperty[keywordIndex]][index_4.typeProperty[keywordIndex]]);
                    formFieldData.maxLength = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.textInputProperty[keywordIndex]][index_4.maxLengthProperty[keywordIndex]];
                    formFieldData.defaultValue = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.textInputProperty[keywordIndex]][index_4.defaultValueProperty[keywordIndex]];
                    formFieldData.format = this.getTextFormFieldFormat(sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.textInputProperty[keywordIndex]][index_4.formatProperty[keywordIndex]]);
                }
                else if (sourceData[index_4.formFieldDataProperty[keywordIndex]].hasOwnProperty(index_4.checkBoxProperty[keywordIndex])) {
                    formFieldData = new page_1.CheckBoxFormField();
                    formFieldData.sizeType = this.getCheckBoxSizeType(sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.checkBoxProperty[keywordIndex]][index_4.sizeTypeProperty[keywordIndex]]);
                    formFieldData.size = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.checkBoxProperty[keywordIndex]][index_4.sizeProperty[keywordIndex]];
                    formFieldData.defaultValue = editor_helper_1.HelperMethods.parseBoolValue(sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.checkBoxProperty[keywordIndex]][index_4.defaultValueProperty[keywordIndex]]);
                    formFieldData.checked = editor_helper_1.HelperMethods.parseBoolValue(sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.checkBoxProperty[keywordIndex]][index_4.checkedProperty[keywordIndex]]);
                }
                else {
                    formFieldData = new page_1.DropDownFormField();
                    formFieldData.dropdownItems = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.dropDownListProperty[keywordIndex]][index_4.dropDownItemsProperty[keywordIndex]];
                    formFieldData.selectedIndex = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.dropDownListProperty[keywordIndex]][index_4.selectedIndexProperty[keywordIndex]];
                }
                formFieldData.name = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.nameProperty[keywordIndex]];
                formFieldData.enabled = editor_helper_1.HelperMethods.parseBoolValue(sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.enabledProperty[keywordIndex]]);
                formFieldData.helpText = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.helpTextProperty[keywordIndex]];
                formFieldData.statusText = sourceData[index_4.formFieldDataProperty[keywordIndex]][index_4.statusTextProperty[keywordIndex]];
            }
            return formFieldData;
        };
        SfdtReader.prototype.applyCharacterStyle = function (inline, elementbox) {
            if (!ej2_base_1.isNullOrUndefined(inline[index_4.characterFormatProperty[this.keywordIndex]]) && !ej2_base_1.isNullOrUndefined(inline[index_4.characterFormatProperty[this.keywordIndex]][index_4.styleNameProperty[this.keywordIndex]])) {
                var charStyle = this.documentHelper.styles.findByName(inline[index_4.characterFormatProperty[this.keywordIndex]][index_4.styleNameProperty[this.keywordIndex]], 'Character');
                elementbox.characterFormat.applyStyle(charStyle);
            }
        };
        SfdtReader.prototype.parseEditableRangeStart = function (data) {
            var permStart = new page_1.EditRangeStartElementBox();
            if (!ej2_base_1.isNullOrUndefined(data[index_4.columnFirstProperty[this.keywordIndex]])) {
                permStart.columnFirst = data[index_4.columnFirstProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.columnLastProperty[this.keywordIndex]])) {
                permStart.columnLast = data[index_4.columnLastProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.editRangeIdProperty[this.keywordIndex]])) {
                permStart.editRangeId = data[index_4.editRangeIdProperty[this.keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.userProperty[this.keywordIndex]])) {
                permStart.user = data[index_4.userProperty[this.keywordIndex]];
                if (this.documentHelper.userCollection.indexOf(permStart.user) === -1) {
                    this.documentHelper.userCollection.push(permStart.user);
                }
                this.addEditRangeCollection(permStart.user, permStart);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.groupProperty[this.keywordIndex]]) && data[index_4.groupProperty[this.keywordIndex]] !== '') {
                permStart.group = data[index_4.groupProperty[this.keywordIndex]];
                permStart.group = permStart.group === 'everyone' ? 'Everyone' : permStart.group;
                if (this.documentHelper.userCollection.indexOf(permStart.group) === -1) {
                    this.documentHelper.userCollection.push(permStart.group);
                }
                this.addEditRangeCollection(permStart.group, permStart);
            }
            return permStart;
        };
        SfdtReader.prototype.addEditRangeCollection = function (name, permStart) {
            if (this.documentHelper.editRanges.containsKey(name)) {
                var editStartCollection = this.documentHelper.editRanges.get(name);
                editStartCollection.push(permStart);
            }
            else {
                var newEditStartCollection = [];
                newEditStartCollection.push(permStart);
                this.documentHelper.editRanges.add(name, newEditStartCollection);
            }
        };
        SfdtReader.prototype.parseChartTitleArea = function (titleArea, chartTitleArea) {
            chartTitleArea.chartfontName = titleArea[index_4.fontNameProperty[this.keywordIndex]];
            chartTitleArea.chartFontSize = titleArea[index_4.fontSizeProperty[this.keywordIndex]];
            this.parseChartDataFormat(titleArea[index_4.dataFormatProperty[this.keywordIndex]], chartTitleArea.dataFormat);
            this.parseChartLayout(titleArea[index_4.layoutProperty[this.keywordIndex]], chartTitleArea.layout);
        };
        SfdtReader.prototype.parseChartDataFormat = function (format, dataFormat) {
            dataFormat.fill.color = format[index_4.fillProperty[this.keywordIndex]][index_4.foreColorProperty[this.keywordIndex]];
            dataFormat.fill.rgb = format[index_4.fillProperty[this.keywordIndex]][index_4.rgbProperty[this.keywordIndex]];
            dataFormat.line.color = format[index_4.lineProperty[this.keywordIndex]][index_4.colorProperty[this.keywordIndex]];
            dataFormat.line.rgb = format[index_4.lineProperty[this.keywordIndex]][index_4.rgbProperty[this.keywordIndex]];
        };
        SfdtReader.prototype.parseChartLayout = function (layout, chartLayout) {
            chartLayout.chartLayoutLeft = layout[index_4.layoutXProperty[this.keywordIndex]];
            chartLayout.chartLayoutTop = layout[index_4.layoutYProperty[this.keywordIndex]];
        };
        SfdtReader.prototype.parseChartLegend = function (legend, chartLegend) {
            chartLegend.chartLegendPostion = legend[index_4.positionProperty[this.keywordIndex]];
            this.parseChartTitleArea(legend[index_4.chartTitleAreaProperty[this.keywordIndex]], chartLegend.chartTitleArea);
        };
        SfdtReader.prototype.parseChartCategoryAxis = function (categoryAxis, primaryAxis) {
            primaryAxis.categoryAxisType = categoryAxis[index_4.categoryTypeProperty[this.keywordIndex]];
            primaryAxis.categoryNumberFormat = categoryAxis[index_4.numberFormatProperty[this.keywordIndex]];
            primaryAxis.interval = categoryAxis[index_4.majorUnitProperty[this.keywordIndex]];
            primaryAxis.axisFontSize = categoryAxis[index_4.fontSizeProperty[this.keywordIndex]];
            primaryAxis.axisFontName = categoryAxis[index_4.fontNameProperty[this.keywordIndex]];
            primaryAxis.max = categoryAxis[index_4.maximumValueProperty[this.keywordIndex]];
            primaryAxis.min = categoryAxis[index_4.minimumValueProperty[this.keywordIndex]];
            primaryAxis.majorGridLines = editor_helper_1.HelperMethods.parseBoolValue(categoryAxis[index_4.hasMajorGridLinesProperty[this.keywordIndex]]);
            primaryAxis.minorGridLines = editor_helper_1.HelperMethods.parseBoolValue(categoryAxis[index_4.hasMinorGridLinesProperty[this.keywordIndex]]);
            primaryAxis.majorTick = categoryAxis[index_4.majorTickMarkProperty[this.keywordIndex]];
            primaryAxis.minorTick = categoryAxis[index_4.minorTickMarkProperty[this.keywordIndex]];
            primaryAxis.tickPosition = categoryAxis[index_4.tickLabelPositionProperty[this.keywordIndex]];
            primaryAxis.categoryAxisTitle = categoryAxis[index_4.chartTitleProperty[this.keywordIndex]];
            if (categoryAxis[index_4.chartTitleProperty[this.keywordIndex]] != null) {
                this.parseChartTitleArea(categoryAxis[index_4.chartTitleAreaProperty[this.keywordIndex]], primaryAxis.chartTitleArea);
            }
        };
        SfdtReader.prototype.parseChartDataTable = function (dataTable, chartDataTable) {
            chartDataTable.showSeriesKeys = editor_helper_1.HelperMethods.parseBoolValue(dataTable[index_4.showSeriesKeysProperty[this.keywordIndex]]);
            chartDataTable.hasHorzBorder = editor_helper_1.HelperMethods.parseBoolValue(dataTable[index_4.hasHorizontalBorderProperty[this.keywordIndex]]);
            chartDataTable.hasVertBorder = editor_helper_1.HelperMethods.parseBoolValue(dataTable[index_4.hasVerticalBorderProperty[this.keywordIndex]]);
            chartDataTable.hasBorders = editor_helper_1.HelperMethods.parseBoolValue(dataTable[index_4.hasBordersProperty[this.keywordIndex]]);
        };
        SfdtReader.prototype.parseChartArea = function (area, chartArea) {
            chartArea.chartForeColor = area[index_4.foreColorProperty[this.keywordIndex]];
        };
        SfdtReader.prototype.parseChartData = function (inline, chart) {
            for (var i = 0; i < inline[index_4.chartCategoryProperty[this.keywordIndex]].length; i++) {
                var chartCategory = new page_1.ChartCategory();
                var xData = inline[index_4.chartCategoryProperty[this.keywordIndex]][i];
                if (xData.hasOwnProperty(index_4.categoryXNameProperty[this.keywordIndex])) {
                    chartCategory.xName = xData[index_4.categoryXNameProperty[this.keywordIndex]];
                }
                for (var j = 0; j < xData[index_4.chartDataProperty[this.keywordIndex]].length; j++) {
                    var chartData = new page_1.ChartData();
                    var yData = xData[index_4.chartDataProperty[this.keywordIndex]][j];
                    chartData.yAxisValue = yData[index_4.yValueProperty[this.keywordIndex]];
                    if (inline[index_4.chartTypeProperty[this.keywordIndex]] === 'Bubble') {
                        chartData.bubbleSize = yData[index_4.sizeProperty[this.keywordIndex]];
                    }
                    chartCategory.chartData.push(chartData);
                }
                chart.chartCategory.push(chartCategory);
            }
            this.parseChartSeries(inline, chart);
        };
        SfdtReader.prototype.parseChartSeries = function (inline, chart) {
            var chartType = inline[index_4.chartTypeProperty[this.keywordIndex]];
            var isPieType = (chartType === 'Pie' || chartType === 'Doughnut');
            for (var i = 0; i < inline[index_4.chartSeriesProperty[this.keywordIndex]].length; i++) {
                var chartSeries = new page_1.ChartSeries();
                var xData = inline[index_4.chartSeriesProperty[this.keywordIndex]][i];
                if (xData.hasOwnProperty(index_4.seriesNameProperty[this.keywordIndex])) {
                    chartSeries.seriesName = xData[index_4.seriesNameProperty[this.keywordIndex]];
                    if (isPieType) {
                        if (xData.hasOwnProperty(index_4.firstSliceAngleProperty[this.keywordIndex])) {
                            chartSeries.firstSliceAngle = xData[index_4.firstSliceAngleProperty[this.keywordIndex]];
                        }
                        if (chartType === 'Doughnut') {
                            chartSeries.doughnutHoleSize = xData[index_4.holeSizeProperty[this.keywordIndex]];
                        }
                    }
                    if (xData.hasOwnProperty(index_4.dataLabelProperty[this.keywordIndex])) {
                        this.parseChartDataLabels(xData[index_4.dataLabelProperty[this.keywordIndex]], chartSeries);
                    }
                    if (xData.hasOwnProperty(index_4.seriesFormatProperty[this.keywordIndex])) {
                        var seriesFormat = new page_1.ChartSeriesFormat();
                        var format = xData[index_4.seriesFormatProperty[this.keywordIndex]];
                        seriesFormat.markerStyle = format[index_4.markerStyleProperty[this.keywordIndex]];
                        seriesFormat.markerColor = format[index_4.markerColorProperty[this.keywordIndex]];
                        seriesFormat.numberValue = format[index_4.markerSizeProperty[this.keywordIndex]];
                        chartSeries.seriesFormat = seriesFormat;
                    }
                    if (xData.hasOwnProperty(index_4.errorBarProperty[this.keywordIndex])) {
                        var errorBar = chartSeries.errorBar;
                        errorBar.errorType = xData[index_4.errorBarProperty[this.keywordIndex]][index_4.typeProperty[this.keywordIndex]];
                        errorBar.errorDirection = xData[index_4.errorBarProperty[this.keywordIndex]][index_4.directionProperty[this.keywordIndex]];
                        errorBar.errorEndStyle = xData[index_4.errorBarProperty[this.keywordIndex]][index_4.endStyleProperty[this.keywordIndex]];
                        errorBar.numberValue = xData[index_4.errorBarProperty[this.keywordIndex]][index_4.numberValueProperty[this.keywordIndex]];
                    }
                    if (xData.hasOwnProperty(index_4.trendLinesProperty[this.keywordIndex])) {
                        this.parseChartTrendLines(xData[index_4.trendLinesProperty[this.keywordIndex]], chartSeries);
                    }
                    this.parseChartSeriesDataPoints(xData[index_4.dataPointsProperty[this.keywordIndex]], chartSeries);
                }
                chart.chartSeries.push(chartSeries);
            }
        };
        SfdtReader.prototype.parseChartDataLabels = function (dataLabels, series) {
            var dataLabel = new page_1.ChartDataLabels();
            dataLabel.labelPosition = dataLabels[index_4.positionProperty[this.keywordIndex]];
            dataLabel.fontName = dataLabels[index_4.fontNameProperty[this.keywordIndex]];
            dataLabel.fontColor = dataLabels[index_4.fontColorProperty[this.keywordIndex]];
            dataLabel.fontSize = dataLabels[index_4.fontSizeProperty[this.keywordIndex]];
            dataLabel.isLegendKey = editor_helper_1.HelperMethods.parseBoolValue(dataLabels[index_4.isLegendKeyProperty[this.keywordIndex]]);
            dataLabel.isBubbleSize = editor_helper_1.HelperMethods.parseBoolValue(dataLabels[index_4.isBubbleSizeProperty[this.keywordIndex]]);
            dataLabel.isCategoryName = editor_helper_1.HelperMethods.parseBoolValue(dataLabels[index_4.isCategoryNameProperty[this.keywordIndex]]);
            dataLabel.isSeriesName = editor_helper_1.HelperMethods.parseBoolValue(dataLabels[index_4.isSeriesNameProperty[this.keywordIndex]]);
            dataLabel.isValue = editor_helper_1.HelperMethods.parseBoolValue(dataLabels[index_4.isValueProperty[this.keywordIndex]]);
            dataLabel.isPercentage = editor_helper_1.HelperMethods.parseBoolValue(dataLabels[index_4.isPercentageProperty[this.keywordIndex]]);
            dataLabel.isLeaderLines = editor_helper_1.HelperMethods.parseBoolValue(dataLabels[index_4.isLeaderLinesProperty[this.keywordIndex]]);
            series.dataLabels = dataLabel;
        };
        SfdtReader.prototype.parseChartSeriesDataPoints = function (dataPoints, series) {
            for (var i = 0; i < dataPoints.length; i++) {
                var chartFormat = new page_1.ChartDataFormat();
                this.parseChartDataFormat(dataPoints[i], chartFormat);
                series.chartDataFormat.push(chartFormat);
            }
        };
        SfdtReader.prototype.parseChartTrendLines = function (trendLines, series) {
            for (var i = 0; i < trendLines.length; i++) {
                var data = trendLines[i];
                var trendLine = new page_1.ChartTrendLines();
                trendLine.trendLineName = data[index_4.nameProperty[this.keywordIndex]];
                trendLine.trendLineType = data[index_4.typeProperty[this.keywordIndex]];
                trendLine.forwardValue = data[index_4.forwardProperty[this.keywordIndex]];
                trendLine.backwardValue = data[index_4.backwardProperty[this.keywordIndex]];
                trendLine.interceptValue = data[index_4.interceptProperty[this.keywordIndex]];
                trendLine.isDisplayEquation = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.isDisplayEquationProperty[this.keywordIndex]]);
                trendLine.isDisplayRSquared = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.isDisplayRSquaredProperty[this.keywordIndex]]);
                series.trendLines.push(trendLine);
            }
        };
        SfdtReader.prototype.parseTableFormat = function (sourceFormat, tableFormat, keywordIndex) {
            this.parseBorders(keywordIndex, sourceFormat[index_4.bordersProperty[keywordIndex]], tableFormat.borders);
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.allowAutoFitProperty[keywordIndex]])) {
                tableFormat.allowAutoFit = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.allowAutoFitProperty[keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.cellSpacingProperty[keywordIndex]])) {
                tableFormat.cellSpacing = sourceFormat[index_4.cellSpacingProperty[keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.leftMarginProperty[keywordIndex]])) {
                tableFormat.leftMargin = sourceFormat[index_4.leftMarginProperty[keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.topMarginProperty[keywordIndex]])) {
                tableFormat.topMargin = sourceFormat[index_4.topMarginProperty[keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.rightMarginProperty[keywordIndex]])) {
                tableFormat.rightMargin = sourceFormat[index_4.rightMarginProperty[keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bottomMarginProperty[keywordIndex]])) {
                tableFormat.bottomMargin = sourceFormat[index_4.bottomMarginProperty[keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.leftIndentProperty[keywordIndex]])) {
                tableFormat.leftIndent = sourceFormat[index_4.leftIndentProperty[keywordIndex]];
            }
            this.parseShading(sourceFormat[index_4.shadingProperty[keywordIndex]], tableFormat.shading, keywordIndex);
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.tableAlignmentProperty[keywordIndex]])) {
                tableFormat.tableAlignment = this.getTableAlignment(sourceFormat[index_4.tableAlignmentProperty[keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.preferredWidthProperty[keywordIndex]])) {
                tableFormat.preferredWidth = sourceFormat[index_4.preferredWidthProperty[keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.preferredWidthTypeProperty[keywordIndex]])) {
                tableFormat.preferredWidthType = this.getWidthType(sourceFormat[index_4.preferredWidthTypeProperty[keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bidiProperty[keywordIndex]])) {
                tableFormat.bidi = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.bidiProperty[keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.horizontalPositionAbsProperty[keywordIndex]])) {
                tableFormat.horizontalPositionAbs = this.getHorizontalPositionAbs(sourceFormat[index_4.horizontalPositionAbsProperty[keywordIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.horizontalPositionProperty[keywordIndex]])) {
                tableFormat.horizontalPosition = sourceFormat[index_4.horizontalPositionProperty[keywordIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.styleNameProperty[keywordIndex]])) {
                tableFormat.styleName = sourceFormat[index_4.styleNameProperty[keywordIndex]];
            }
        };
        SfdtReader.prototype.parseCellFormat = function (sourceFormat, cellFormat, keyIndex) {
            if (!ej2_base_1.isNullOrUndefined(sourceFormat)) {
                this.parseBorders(keyIndex, sourceFormat[index_4.bordersProperty[keyIndex]], cellFormat.borders);
                if (!sourceFormat.isSamePaddingAsTable) {
                    this.parseCellMargin(sourceFormat, cellFormat, keyIndex);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.cellWidthProperty[keyIndex]])) {
                    cellFormat.cellWidth = sourceFormat[index_4.cellWidthProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.columnSpanProperty[keyIndex]])) {
                    cellFormat.columnSpan = sourceFormat[index_4.columnSpanProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.rowSpanProperty[keyIndex]])) {
                    cellFormat.rowSpan = sourceFormat[index_4.rowSpanProperty[keyIndex]];
                }
                this.parseShading(sourceFormat[index_4.shadingProperty[keyIndex]], cellFormat.shading, keyIndex);
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.verticalAlignmentProperty[keyIndex]])) {
                    cellFormat.verticalAlignment = this.getCellVerticalAlignment(sourceFormat[index_4.verticalAlignmentProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.preferredWidthTypeProperty[keyIndex]])) {
                    cellFormat.preferredWidthType = this.getWidthType(sourceFormat[index_4.preferredWidthTypeProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.preferredWidthProperty[keyIndex]])) {
                    cellFormat.preferredWidth = sourceFormat[index_4.preferredWidthProperty[keyIndex]];
                }
            }
        };
        SfdtReader.prototype.parseCellMargin = function (sourceFormat, cellFormat, keyIndex) {
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.leftMarginProperty[keyIndex]])) {
                cellFormat.leftMargin = sourceFormat[index_4.leftMarginProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.rightMarginProperty[keyIndex]])) {
                cellFormat.rightMargin = sourceFormat[index_4.rightMarginProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.topMarginProperty[keyIndex]])) {
                cellFormat.topMargin = sourceFormat[index_4.topMarginProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bottomMarginProperty[keyIndex]])) {
                cellFormat.bottomMargin = sourceFormat[index_4.bottomMarginProperty[keyIndex]];
            }
        };
        SfdtReader.prototype.parseRowFormat = function (sourceFormat, rowFormat, keyIndex) {
            if (!ej2_base_1.isNullOrUndefined(sourceFormat)) {
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.allowBreakAcrossPagesProperty[keyIndex]])) {
                    rowFormat.allowBreakAcrossPages = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.allowBreakAcrossPagesProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.isHeaderProperty[keyIndex]])) {
                    rowFormat.isHeader = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.isHeaderProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.heightTypeProperty[keyIndex]])) {
                    rowFormat.heightType = this.getHeightType(sourceFormat[index_4.heightTypeProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.heightProperty[keyIndex]])) {
                    rowFormat.height = sourceFormat[index_4.heightProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.leftMarginProperty[keyIndex]])) {
                    rowFormat.leftMargin = sourceFormat[index_4.leftMarginProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.topMarginProperty[keyIndex]])) {
                    rowFormat.topMargin = sourceFormat[index_4.topMarginProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.rightMarginProperty[keyIndex]])) {
                    rowFormat.rightMargin = sourceFormat[index_4.rightMarginProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bottomMarginProperty[keyIndex]])) {
                    rowFormat.bottomMargin = sourceFormat[index_4.bottomMarginProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.leftIndentProperty[keyIndex]])) {
                    rowFormat.leftIndent = sourceFormat[index_4.leftIndentProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.revisionIdsProperty[keyIndex]]) && sourceFormat[index_4.revisionIdsProperty[keyIndex]].length > 0) {
                    this.checkAndApplyRevision(keyIndex, sourceFormat, rowFormat);
                }
                this.parseRowGridValues(sourceFormat, rowFormat, keyIndex);
                this.parseBorders(keyIndex, sourceFormat[index_4.bordersProperty[keyIndex]], rowFormat.borders);
            }
        };
        SfdtReader.prototype.parseBorders = function (keyIndex, sourceBorders, destBorder) {
            if (!ej2_base_1.isNullOrUndefined(sourceBorders)) {
                destBorder.isParsing = true;
                this.parseBorder(keyIndex, sourceBorders[index_4.leftProperty[keyIndex]], destBorder.left);
                this.parseBorder(keyIndex, sourceBorders[index_4.rightProperty[keyIndex]], destBorder.right);
                this.parseBorder(keyIndex, sourceBorders[index_4.topProperty[keyIndex]], destBorder.top);
                this.parseBorder(keyIndex, sourceBorders[index_4.bottomProperty[keyIndex]], destBorder.bottom);
                this.parseBorder(keyIndex, sourceBorders[index_4.verticalProperty[keyIndex]], destBorder.vertical);
                this.parseBorder(keyIndex, sourceBorders[index_4.horizontalProperty[keyIndex]], destBorder.horizontal);
                this.parseBorder(keyIndex, sourceBorders[index_4.diagonalDownProperty[keyIndex]], destBorder.diagonalDown);
                this.parseBorder(keyIndex, sourceBorders[index_4.diagonalUpProperty[keyIndex]], destBorder.diagonalUp);
                destBorder.isParsing = false;
            }
        };
        SfdtReader.prototype.parseBorder = function (keyIndex, sourceBorder, destBorder) {
            if (!ej2_base_1.isNullOrUndefined(sourceBorder)) {
                if (!ej2_base_1.isNullOrUndefined(sourceBorder[index_4.colorProperty[keyIndex]])) {
                    destBorder.color = this.getColor(sourceBorder[index_4.colorProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceBorder[index_4.lineStyleProperty[keyIndex]])) {
                    destBorder.lineStyle = this.getLineStyle(sourceBorder[index_4.lineStyleProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceBorder[index_4.lineWidthProperty[keyIndex]])) {
                    destBorder.lineWidth = sourceBorder[index_4.lineWidthProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceBorder[index_4.hasNoneStyleProperty[keyIndex]])) {
                    destBorder.hasNoneStyle = editor_helper_1.HelperMethods.parseBoolValue(sourceBorder[index_4.hasNoneStyleProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceBorder[index_4.spaceProperty[keyIndex]])) {
                    destBorder.space = sourceBorder[index_4.spaceProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceBorder[index_4.shadowProperty[keyIndex]])) {
                    destBorder.shadow = editor_helper_1.HelperMethods.parseBoolValue(sourceBorder[index_4.shadowProperty[keyIndex]]);
                }
            }
        };
        SfdtReader.prototype.parseShading = function (sourceShading, destShading, keyIndex) {
            if (!ej2_base_1.isNullOrUndefined(sourceShading)) {
                if (!ej2_base_1.isNullOrUndefined(sourceShading[index_4.backgroundColorProperty[keyIndex]])) {
                    destShading.backgroundColor = this.getColor(sourceShading[index_4.backgroundColorProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceShading[index_4.foregroundColorProperty[keyIndex]])) {
                    destShading.foregroundColor = this.getColor(sourceShading[index_4.foregroundColorProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceShading[index_4.textureProperty[keyIndex]]) || !ej2_base_1.isNullOrUndefined(sourceShading.textureStyle)) {
                    destShading.textureStyle = !ej2_base_1.isNullOrUndefined(sourceShading[index_4.textureProperty[keyIndex]]) ? this.getTextureStyle(sourceShading[index_4.textureProperty[keyIndex]]) : this.getTextureStyle(sourceShading.textureStyle);
                }
            }
        };
        SfdtReader.prototype.parseCharacterFormat = function (keyIndex, sourceFormat, characterFormat, writeInlineFormat) {
            if (!ej2_base_1.isNullOrUndefined(sourceFormat)) {
                if (writeInlineFormat && sourceFormat.hasOwnProperty(index_4.inlineFormatProperty[keyIndex])) {
                    this.parseCharacterFormat(keyIndex, sourceFormat.inlineFormat, characterFormat);
                    return;
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.baselineAlignmentProperty[keyIndex]])) {
                    characterFormat.baselineAlignment = this.getBaseAlignment(sourceFormat[index_4.baselineAlignmentProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.underlineProperty[keyIndex]])) {
                    characterFormat.underline = this.getUnderline(sourceFormat[index_4.underlineProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.strikethroughProperty[keyIndex]])) {
                    characterFormat.strikethrough = this.getStrikethrough(sourceFormat[index_4.strikethroughProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontSizeProperty[keyIndex]])) {
                    sourceFormat[index_4.fontSizeProperty[keyIndex]] = parseFloat(sourceFormat[index_4.fontSizeProperty[keyIndex]]);
                    var number = sourceFormat[index_4.fontSizeProperty[keyIndex]] * 10;
                    if (number % 10 !== 0) {
                        number = sourceFormat[index_4.fontSizeProperty[keyIndex]].toFixed(1) * 10;
                        if (number % 5 === 0) {
                            sourceFormat[index_4.fontSizeProperty[keyIndex]] = sourceFormat[index_4.fontSizeProperty[keyIndex]].toFixed(1);
                        }
                        else {
                            sourceFormat[index_4.fontSizeProperty[keyIndex]] = Math.round(sourceFormat[index_4.fontSizeProperty[keyIndex]]);
                        }
                    }
                    var fontSize = parseFloat(sourceFormat[index_4.fontSizeProperty[keyIndex]]);
                    characterFormat.fontSize = fontSize < 0 ? 0 : fontSize;
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyProperty[keyIndex]])) {
                    if (sourceFormat[index_4.fontFamilyProperty[keyIndex]].indexOf('"') !== -1) {
                        sourceFormat[index_4.fontFamilyProperty[keyIndex]] = sourceFormat[index_4.fontFamilyProperty[keyIndex]].replace('"', '');
                    }
                    characterFormat.fontFamily = sourceFormat[index_4.fontFamilyProperty[keyIndex]];
                    if (ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyFarEastProperty[keyIndex]])) {
                        characterFormat.fontFamilyFarEast = sourceFormat[index_4.fontFamilyProperty[keyIndex]];
                    }
                    if (ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyAsciiProperty[keyIndex]])) {
                        characterFormat.fontFamilyAscii = sourceFormat[index_4.fontFamilyProperty[keyIndex]];
                    }
                    if (ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyNonFarEastProperty[keyIndex]])) {
                        characterFormat.fontFamilyNonFarEast = sourceFormat[index_4.fontFamilyProperty[keyIndex]];
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.boldProperty[keyIndex]])) {
                    characterFormat.bold = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.boldProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.italicProperty[keyIndex]])) {
                    characterFormat.italic = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.italicProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.highlightColorProperty[keyIndex]])) {
                    characterFormat.highlightColor = this.getHighlightColor(sourceFormat[index_4.highlightColorProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontColorProperty[keyIndex]])) {
                    characterFormat.fontColor = this.getColor(sourceFormat[index_4.fontColorProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bidiProperty[keyIndex]])) {
                    characterFormat.bidi = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.bidiProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bdoProperty[keyIndex]])) {
                    characterFormat.bdo = this.getBiDirectionalOverride(sourceFormat[index_4.bdoProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontSizeBidiProperty[keyIndex]])) {
                    characterFormat.fontSizeBidi = sourceFormat[index_4.fontSizeBidiProperty[keyIndex]] < 0 ? 0 : sourceFormat[index_4.fontSizeBidiProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyBidiProperty[keyIndex]])) {
                    if (sourceFormat[index_4.fontFamilyBidiProperty[keyIndex]].indexOf('"') !== -1) {
                        sourceFormat[index_4.fontFamilyBidiProperty[keyIndex]] = sourceFormat[index_4.fontFamilyBidiProperty[keyIndex]].replace('"', '');
                    }
                    characterFormat.fontFamilyBidi = sourceFormat[index_4.fontFamilyBidiProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.boldBidiProperty[keyIndex]])) {
                    characterFormat.boldBidi = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.boldBidiProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.italicBidiProperty[keyIndex]])) {
                    characterFormat.italicBidi = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.italicBidiProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.revisionIdsProperty[keyIndex]]) && sourceFormat[index_4.revisionIdsProperty[keyIndex]].length > 0) {
                    this.checkAndApplyRevision(keyIndex, sourceFormat, characterFormat);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.allCapsProperty[keyIndex]])) {
                    characterFormat.allCaps = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.allCapsProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.localeIdBidiProperty[keyIndex]])) {
                    characterFormat.localeIdBidi = sourceFormat[index_4.localeIdBidiProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.localeIdProperty[keyIndex]])) {
                    characterFormat.localeIdAscii = sourceFormat[index_4.localeIdProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.localeIdFarEastProperty[keyIndex]])) {
                    characterFormat.localeIdFarEast = sourceFormat[index_4.localeIdFarEastProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.complexScriptProperty[keyIndex]])) {
                    characterFormat.complexScript = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.complexScriptProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyFarEastProperty[keyIndex]])) {
                    if (sourceFormat[index_4.fontFamilyFarEastProperty[keyIndex]].indexOf('"') !== -1) {
                        sourceFormat[index_4.fontFamilyFarEastProperty[keyIndex]] = sourceFormat[index_4.fontFamilyFarEastProperty[keyIndex]].replace('"', '');
                    }
                    characterFormat.fontFamilyFarEast = sourceFormat[index_4.fontFamilyFarEastProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyAsciiProperty[keyIndex]])) {
                    if (sourceFormat[index_4.fontFamilyAsciiProperty[keyIndex]].indexOf('"') !== -1) {
                        sourceFormat[index_4.fontFamilyAsciiProperty[keyIndex]] = sourceFormat[index_4.fontFamilyAsciiProperty[keyIndex]].replace('"', '');
                    }
                    characterFormat.fontFamilyAscii = sourceFormat[index_4.fontFamilyAsciiProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontFamilyNonFarEastProperty[keyIndex]])) {
                    if (sourceFormat[index_4.fontFamilyNonFarEastProperty[keyIndex]].indexOf('"') !== -1) {
                        sourceFormat[index_4.fontFamilyNonFarEastProperty[keyIndex]] = sourceFormat[index_4.fontFamilyNonFarEastProperty[keyIndex]].replace('"', '');
                    }
                    characterFormat.fontFamilyNonFarEast = sourceFormat[index_4.fontFamilyNonFarEastProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.characterSpacingProperty[keyIndex]])) {
                    characterFormat.characterSpacing = sourceFormat[index_4.characterSpacingProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.scalingProperty[keyIndex]])) {
                    characterFormat.scaling = sourceFormat[index_4.scalingProperty[keyIndex]];
                }
            }
        };
        SfdtReader.prototype.getColor = function (color) {
            var convertColor = color;
            return convertColor || '#ffffff';
        };
        SfdtReader.prototype.parseThemes = function (sourceFormat, themes) {
            this.parseFontScheme(sourceFormat[index_4.fontSchemeProperty[this.keywordIndex]], themes);
        };
        SfdtReader.prototype.parseFontScheme = function (sourceFormat, themes) {
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontSchemeNameProperty[this.keywordIndex]]))
                themes.fontScheme.fontSchemeName = sourceFormat[index_4.fontSchemeNameProperty[this.keywordIndex]];
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.majorFontSchemeProperty[this.keywordIndex]])) {
                this.parseMajorMinorFontScheme(sourceFormat[index_4.majorFontSchemeProperty[this.keywordIndex]], themes.fontScheme.majorFontScheme);
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.minorFontSchemeProperty[this.keywordIndex]])) {
                this.parseMajorMinorFontScheme(sourceFormat[index_4.minorFontSchemeProperty[this.keywordIndex]], themes.fontScheme.minorFontScheme);
            }
        };
        SfdtReader.prototype.parseMajorMinorFontScheme = function (sourceFormat, majorMinor) {
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontTypefaceProperty[this.keywordIndex]]) && Object.keys(sourceFormat[index_4.fontTypefaceProperty[this.keywordIndex]]).length > 0) {
                var keys = Object.keys(sourceFormat[index_4.fontTypefaceProperty[this.keywordIndex]]);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    majorMinor.fontTypeface.add(key, sourceFormat[index_4.fontTypefaceProperty[this.keywordIndex]][key]);
                }
                this.documentHelper.hasThemes = true;
            }
            if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.fontSchemeListProperty[this.keywordIndex]]) && sourceFormat[index_4.fontSchemeListProperty[this.keywordIndex]].length > 0) {
                for (var j = 0; j < sourceFormat[index_4.fontSchemeListProperty[this.keywordIndex]].length; j++) {
                    var data = sourceFormat[index_4.fontSchemeListProperty[this.keywordIndex]][j];
                    var fontList = new index_3.FontSchemeStruct();
                    fontList.name = !ej2_base_1.isNullOrUndefined(data.fontName) ? data[index_4.fontNameProperty[this.keywordIndex]] : data[index_4.nameProperty[this.keywordIndex]];
                    fontList.typeface = !ej2_base_1.isNullOrUndefined(data.fontTypeface) ? data.fontTypeface : data[index_4.typefaceProperty[this.keywordIndex]];
                    fontList.panose = !ej2_base_1.isNullOrUndefined(data.pnose) ? data.pnose : data[index_4.panoseProperty[this.keywordIndex]];
                    majorMinor.fontSchemeList.push(fontList);
                }
                this.documentHelper.hasThemes = true;
            }
        };
        SfdtReader.prototype.parseParagraphFormat = function (keyIndex, sourceFormat, paragraphFormat) {
            if (!ej2_base_1.isNullOrUndefined(sourceFormat)) {
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bordersProperty[keyIndex]])) {
                    this.parseBorders(keyIndex, sourceFormat[index_4.bordersProperty[keyIndex]], paragraphFormat.borders);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.bidiProperty[keyIndex]])) {
                    paragraphFormat.bidi = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.bidiProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.leftIndentProperty[keyIndex]])) {
                    paragraphFormat.leftIndent = sourceFormat[index_4.leftIndentProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.rightIndentProperty[keyIndex]])) {
                    paragraphFormat.rightIndent = sourceFormat[index_4.rightIndentProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.firstLineIndentProperty[keyIndex]])) {
                    paragraphFormat.firstLineIndent = sourceFormat[index_4.firstLineIndentProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.afterSpacingProperty[keyIndex]])) {
                    paragraphFormat.afterSpacing = sourceFormat[index_4.afterSpacingProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.beforeSpacingProperty[keyIndex]])) {
                    paragraphFormat.beforeSpacing = sourceFormat[index_4.beforeSpacingProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.spaceBeforeAutoProperty[keyIndex]])) {
                    paragraphFormat.spaceBeforeAuto = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.spaceBeforeAutoProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.spaceAfterAutoProperty[keyIndex]])) {
                    paragraphFormat.spaceAfterAuto = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.spaceAfterAutoProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.lineSpacingProperty[keyIndex]])) {
                    paragraphFormat.lineSpacing = sourceFormat[index_4.lineSpacingProperty[keyIndex]];
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.lineSpacingTypeProperty[keyIndex]])) {
                    paragraphFormat.lineSpacingType = this.getLineSpacingType(sourceFormat[index_4.lineSpacingTypeProperty[keyIndex]]);
                }
                else {
                    if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.lineSpacingProperty[keyIndex]])) {
                        paragraphFormat.lineSpacingType = 'Multiple';
                    }
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.textAlignmentProperty[keyIndex]])) {
                    paragraphFormat.textAlignment = this.getTextAlignment(sourceFormat[index_4.textAlignmentProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.outlineLevelProperty[keyIndex]])) {
                    paragraphFormat.outlineLevel = this.getOutlineLevel(sourceFormat[index_4.outlineLevelProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.contextualSpacingProperty[keyIndex]])) {
                    paragraphFormat.contextualSpacing = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.contextualSpacingProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.keepWithNextProperty[keyIndex]])) {
                    paragraphFormat.keepWithNext = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.keepWithNextProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.keepLinesTogetherProperty[keyIndex]])) {
                    paragraphFormat.keepLinesTogether = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.keepLinesTogetherProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(sourceFormat[index_4.widowControlProperty[keyIndex]])) {
                    paragraphFormat.widowControl = editor_helper_1.HelperMethods.parseBoolValue(sourceFormat[index_4.widowControlProperty[keyIndex]]);
                }
                paragraphFormat.listFormat = new index_1.WListFormat(paragraphFormat);
                if (sourceFormat.hasOwnProperty(index_4.listFormatProperty[keyIndex])) {
                    this.parseListFormat(keyIndex, sourceFormat, paragraphFormat.listFormat);
                }
                if (sourceFormat.hasOwnProperty(index_4.tabsProperty[keyIndex])) {
                    this.parseTabStop(keyIndex, sourceFormat[index_4.tabsProperty[keyIndex]], paragraphFormat.tabs);
                }
            }
        };
        SfdtReader.prototype.parseListFormat = function (keyIndex, block, listFormat) {
            if (!ej2_base_1.isNullOrUndefined(block[index_4.listFormatProperty[keyIndex]])) {
                if (!ej2_base_1.isNullOrUndefined(block[index_4.listFormatProperty[keyIndex]][index_4.listIdProperty[keyIndex]])) {
                    listFormat.listId = block[index_4.listFormatProperty[keyIndex]][index_4.listIdProperty[keyIndex]];
                    listFormat.list = this.documentHelper.getListById(block[index_4.listFormatProperty[keyIndex]][index_4.listIdProperty[keyIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.listFormatProperty[keyIndex]][index_4.nsidProperty])) {
                    listFormat.nsid = block[index_4.listFormatProperty[keyIndex]][index_4.nsidProperty];
                }
                else if (!ej2_base_1.isNullOrUndefined(listFormat.list)) {
                    listFormat.nsid = listFormat.list.nsid;
                }
                if (!ej2_base_1.isNullOrUndefined(block[index_4.listFormatProperty[keyIndex]][index_4.listLevelNumberProperty[keyIndex]])) {
                    listFormat.listLevelNumber = block[index_4.listFormatProperty[keyIndex]][index_4.listLevelNumberProperty[keyIndex]];
                }
            }
        };
        SfdtReader.prototype.parseSectionFormat = function (keyIndex, data, sectionFormat) {
            if (!ej2_base_1.isNullOrUndefined(data[index_4.pageWidthProperty[keyIndex]])) {
                sectionFormat.pageWidth = data[index_4.pageWidthProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.pageHeightProperty[keyIndex]])) {
                sectionFormat.pageHeight = data[index_4.pageHeightProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.leftMarginProperty[keyIndex]])) {
                sectionFormat.leftMargin = data[index_4.leftMarginProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.topMarginProperty[keyIndex]])) {
                sectionFormat.topMargin = data[index_4.topMarginProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.rightMarginProperty[keyIndex]])) {
                sectionFormat.rightMargin = data[index_4.rightMarginProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.bottomMarginProperty[keyIndex]])) {
                sectionFormat.bottomMargin = data[index_4.bottomMarginProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.headerDistanceProperty[keyIndex]])) {
                sectionFormat.headerDistance = data[index_4.headerDistanceProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.footerDistanceProperty[keyIndex]])) {
                sectionFormat.footerDistance = data[index_4.footerDistanceProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.differentFirstPageProperty[keyIndex]])) {
                sectionFormat.differentFirstPage = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.differentFirstPageProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.differentOddAndEvenPagesProperty[keyIndex]])) {
                sectionFormat.differentOddAndEvenPages = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.differentOddAndEvenPagesProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.bidiProperty[keyIndex]])) {
                sectionFormat.bidi = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.bidiProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.restartPageNumberingProperty[keyIndex]])) {
                sectionFormat.restartPageNumbering = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.restartPageNumberingProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.pageStartingNumberProperty[keyIndex]])) {
                sectionFormat.pageStartingNumber = data[index_4.pageStartingNumberProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.endnoteNumberFormatProperty[keyIndex]])) {
                sectionFormat.endnoteNumberFormat = this.getFootEndNoteNumberFormat(data[index_4.endnoteNumberFormatProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.footNoteNumberFormatProperty[keyIndex]])) {
                sectionFormat.footNoteNumberFormat = this.getFootEndNoteNumberFormat(data[index_4.footNoteNumberFormatProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.restartIndexForFootnotesProperty[keyIndex]])) {
                sectionFormat.restartIndexForFootnotes = this.getFootnoteRestartIndex(data[index_4.restartIndexForFootnotesProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.restartIndexForEndnotesProperty[keyIndex]])) {
                sectionFormat.restartIndexForEndnotes = this.getFootnoteRestartIndex(data[index_4.restartIndexForEndnotesProperty[keyIndex]]);
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.initialFootNoteNumberProperty[keyIndex]])) {
                sectionFormat.initialFootNoteNumber = data[index_4.initialFootNoteNumberProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.initialEndNoteNumberProperty[keyIndex]])) {
                sectionFormat.initialEndNoteNumber = data[index_4.initialEndNoteNumberProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.pageNumberStyleProperty[keyIndex]])) {
                sectionFormat.pageNumberStyle = data[index_4.pageNumberStyleProperty[keyIndex]];
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.columnsProperty[keyIndex]]) && !ej2_base_1.isNullOrUndefined(data[index_4.numberOfColumnsProperty[keyIndex]]) && data[index_4.numberOfColumnsProperty[keyIndex]] > 1) {
                sectionFormat.numberOfColumns = data[index_4.numberOfColumnsProperty[keyIndex]];
                sectionFormat.equalWidth = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.equalWidthProperty[keyIndex]]);
                sectionFormat.lineBetweenColumns = editor_helper_1.HelperMethods.parseBoolValue(data[index_4.lineBetweenColumnsProperty[keyIndex]]);
                if (data[index_4.columnsProperty[keyIndex]]) {
                    for (var i = 0; i < data[index_4.columnsProperty[keyIndex]].length; i++) {
                        var newCol = new index_1.WColumnFormat();
                        newCol.width = editor_helper_1.HelperMethods.convertPointToPixel(data[index_4.columnsProperty[keyIndex]][i][index_4.widthProperty[keyIndex]]);
                        newCol.space = editor_helper_1.HelperMethods.convertPointToPixel(data[index_4.columnsProperty[keyIndex]][i][index_4.spaceProperty[keyIndex]]);
                        newCol.index = i;
                        sectionFormat.columns.push(newCol);
                    }
                }
            }
            if (!ej2_base_1.isNullOrUndefined(data[index_4.breakCodeProperty[keyIndex]])) {
                sectionFormat.breakCode = data[index_4.breakCodeProperty[keyIndex]];
            }
        };
        SfdtReader.prototype.parseColumns = function (wCols, columns) {
            columns = [];
            if (wCols) {
                for (var i = 0; i < wCols.length; i++) {
                    var newCol = new index_1.WColumnFormat();
                    newCol.width = editor_helper_1.HelperMethods.convertPointToPixel(wCols[i][index_4.widthProperty[this.keywordIndex]]);
                    newCol.space = editor_helper_1.HelperMethods.convertPointToPixel(wCols[i][index_4.spaceProperty[this.keywordIndex]]);
                    newCol.index = i;
                    columns.push(newCol);
                }
            }
        };
        SfdtReader.prototype.parseTabStop = function (keyIndex, wTabs, tabs) {
            if (wTabs) {
                for (var i = 0; i < wTabs.length; i++) {
                    var tab = wTabs[i];
                    if (Object.keys(tab).length > 0) {
                        var tabStop = new index_2.WTabStop();
                        tabStop.position = tab[index_4.positionProperty[keyIndex]];
                        tabStop.tabLeader = this.getTabLeader(tab[index_4.tabLeaderProperty[keyIndex]]);
                        tabStop.deletePosition = tab[index_4.deletePositionProperty[keyIndex]];
                        tabStop.tabJustification = this.getTabJustification(tab[index_4.tabJustificationProperty[keyIndex]]);
                        tabs.push(tabStop);
                    }
                }
            }
        };
        SfdtReader.prototype.validateImageUrl = function (imagestr) {
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            imagestr = imagestr.replace(/[^A-Za-z0-9\+\/\=]/g, '');
            var totalLength = imagestr.length * 3 / 4;
            if (imagestr.charAt(imagestr.length - 1) === keyStr.charAt(64)) {
                totalLength--;
            }
            if (imagestr.charAt(imagestr.length - 2) === keyStr.charAt(64)) {
                totalLength--;
            }
            if (totalLength % 1 !== 0) {
                return false;
            }
            return true;
        };
        SfdtReader.prototype.containsFieldBegin = function (line) {
            var element = undefined;
            for (var i = line.children.length - 1; i >= 0; i--) {
                element = line.children[i];
                if (element instanceof page_1.FieldElementBox && element.hasFieldEnd && element.nextElement instanceof page_1.TextElementBox) {
                    return element.nextElement;
                }
                else if (element instanceof page_1.FieldElementBox) {
                    return undefined;
                }
            }
            return element;
        };
        SfdtReader.prototype.getBaseAlignment = function (baselineAlignment) {
            switch (baselineAlignment) {
                case 0:
                    return 'Normal';
                case 1:
                    return 'Superscript';
                case 2:
                    return 'Subscript';
                default:
                    return baselineAlignment;
            }
        };
        SfdtReader.prototype.getUnderline = function (underline) {
            switch (underline) {
                case 0:
                    return 'None';
                case 1:
                    return 'Single';
                case 2:
                    return 'Words';
                case 3:
                    return 'Double';
                case 4:
                    return 'Dotted';
                case 5:
                    return 'Thick';
                case 6:
                    return 'Dash';
                case 7:
                    return 'DashLong';
                case 8:
                    return 'DotDash';
                case 9:
                    return 'DotDotDash';
                case 10:
                    return 'Wavy';
                case 11:
                    return 'DottedHeavy';
                case 12:
                    return 'DashHeavy';
                case 13:
                    return 'DashLongHeavy';
                case 14:
                    return 'DotDashHeavy';
                case 15:
                    return 'DotDotDashHeavy';
                case 16:
                    return 'WavyHeavy';
                case 17:
                    return 'WavyDouble';
                default:
                    return underline;
            }
        };
        SfdtReader.prototype.getStrikethrough = function (strikethrough) {
            switch (strikethrough) {
                case 0:
                    return 'None';
                case 1:
                    return 'SingleStrike';
                case 2:
                    return 'DoubleStrike';
                default:
                    return strikethrough;
            }
        };
        SfdtReader.prototype.getHighlightColor = function (highlightColor) {
            switch (highlightColor) {
                case 0:
                    return 'NoColor';
                case 1:
                    return 'Yellow';
                case 2:
                    return 'BrightGreen';
                case 3:
                    return 'Turquoise';
                case 4:
                    return 'Pink';
                case 5:
                    return 'Blue';
                case 6:
                    return 'Red';
                case 7:
                    return 'DarkBlue';
                case 8:
                    return 'Teal';
                case 9:
                    return 'Green';
                case 10:
                    return 'Violet';
                case 11:
                    return 'DarkRed';
                case 12:
                    return 'DarkYellow';
                case 13:
                    return 'Gray50';
                case 14:
                    return 'Gray25';
                case 15:
                    return 'Black';
                default:
                    return highlightColor;
            }
        };
        SfdtReader.prototype.getLineSpacingType = function (lineSpacingType) {
            switch (lineSpacingType) {
                case 0:
                    return 'Multiple';
                case 1:
                    return 'AtLeast';
                case 2:
                    return 'Exactly';
                default:
                    return lineSpacingType;
            }
        };
        SfdtReader.prototype.getOutlineLevel = function (outlineLevel) {
            switch (outlineLevel) {
                case 0:
                    return 'BodyText';
                case 1:
                    return 'Level1';
                case 2:
                    return 'Level2';
                case 3:
                    return 'Level3';
                case 4:
                    return 'Level4';
                case 5:
                    return 'Level5';
                case 6:
                    return 'Level6';
                case 7:
                    return 'Level7';
                case 8:
                    return 'Level8';
                case 9:
                    return 'Level9';
                default:
                    return outlineLevel;
            }
        };
        SfdtReader.prototype.getTextAlignment = function (textAlignment) {
            switch (textAlignment) {
                case 0:
                    return 'Left';
                case 1:
                    return 'Center';
                case 2:
                    return 'Right';
                case 3:
                    return 'Justify';
                default:
                    return textAlignment;
            }
        };
        SfdtReader.prototype.getWidthType = function (widthType) {
            switch (widthType) {
                case 0:
                    return 'Auto';
                case 1:
                    return 'Percent';
                case 2:
                    return 'Point';
                default:
                    return widthType;
            }
        };
        SfdtReader.prototype.getTableAlignment = function (tableAlignment) {
            switch (tableAlignment) {
                case 0:
                    return 'Left';
                case 1:
                    return 'Center';
                case 2:
                    return 'Right';
                default:
                    return tableAlignment;
            }
        };
        SfdtReader.prototype.getLineStyle = function (lineStyle) {
            switch (lineStyle) {
                case 0:
                    return 'Single';
                case 1:
                    return 'None';
                case 2:
                    return 'Dot';
                case 3:
                    return 'DashSmallGap';
                case 4:
                    return 'DashLargeGap';
                case 5:
                    return 'DashDot';
                case 6:
                    return 'DashDotDot';
                case 7:
                    return 'Double';
                case 8:
                    return 'Triple';
                case 9:
                    return 'ThinThickSmallGap';
                case 10:
                    return 'ThickThinSmallGap';
                case 11:
                    return 'ThinThickThinSmallGap';
                case 12:
                    return 'ThinThickMediumGap';
                case 13:
                    return 'ThickThinMediumGap';
                case 14:
                    return 'ThinThickThinMediumGap';
                case 15:
                    return 'ThinThickLargeGap';
                case 16:
                    return 'ThickThinLargeGap';
                case 17:
                    return 'ThinThickThinLargeGap';
                case 18:
                    return 'SingleWavy';
                case 19:
                    return 'DoubleWavy';
                case 20:
                    return 'DashDotStroked';
                case 21:
                    return 'Emboss3D';
                case 22:
                    return 'Engrave3D';
                case 23:
                    return 'Outset';
                case 24:
                    return 'Inset';
                case 25:
                    return 'Thick';
                case 26:
                    return 'Cleared';
                default:
                    return lineStyle;
            }
        };
        SfdtReader.prototype.getTextureStyle = function (textureStyle) {
            switch (textureStyle) {
                case 0:
                    return 'TextureNone';
                case 1:
                    return 'Texture2Pt5Percent';
                case 2:
                    return 'Texture5Percent';
                case 3:
                    return 'Texture7Pt5Percent';
                case 4:
                    return 'Texture10Percent';
                case 5:
                    return 'Texture12Pt5Percent';
                case 6:
                    return 'Texture15Percent';
                case 7:
                    return 'Texture17Pt5Percent';
                case 8:
                    return 'Texture20Percent';
                case 9:
                    return 'Texture22Pt5Percent';
                case 10:
                    return 'Texture25Percent';
                case 11:
                    return 'Texture27Pt5Percent';
                case 12:
                    return 'Texture30Percent';
                case 13:
                    return 'Texture32Pt5Percent';
                case 14:
                    return 'Texture35Percent';
                case 15:
                    return 'Texture37Pt5Percent';
                case 16:
                    return 'Texture40Percent';
                case 17:
                    return 'Texture42Pt5Percent';
                case 18:
                    return 'Texture45Percent';
                case 19:
                    return 'Texture47Pt5Percent';
                case 20:
                    return 'Texture50Percent';
                case 21:
                    return 'Texture52Pt5Percent';
                case 22:
                    return 'Texture55Percent';
                case 23:
                    return 'Texture57Pt5Percent';
                case 24:
                    return 'Texture60Percent';
                case 25:
                    return 'Texture62Pt5Percent';
                case 26:
                    return 'Texture65Percent';
                case 27:
                    return 'Texture67Pt5Percent';
                case 28:
                    return 'Texture70Percent';
                case 29:
                    return 'Texture72Pt5Percent';
                case 30:
                    return 'Texture75Percent';
                case 31:
                    return 'Texture77Pt5Percent';
                case 32:
                    return 'Texture80Percent';
                case 33:
                    return 'Texture82Pt5Percent';
                case 34:
                    return 'Texture85Percent';
                case 35:
                    return 'Texture87Pt5Percent';
                case 36:
                    return 'Texture90Percent';
                case 37:
                    return 'Texture92Pt5Percent';
                case 38:
                    return 'Texture95Percent';
                case 39:
                    return 'Texture97Pt5Percent';
                case 40:
                    return 'TextureSolid';
                case 41:
                    return 'TextureDarkHorizontal';
                case 42:
                    return 'TextureDarkVertical';
                case 43:
                    return 'TextureDarkDiagonalDown';
                case 44:
                    return 'TextureDarkDiagonalUp';
                case 45:
                    return 'TextureDarkCross';
                case 46:
                    return 'TextureDarkDiagonalCross';
                case 47:
                    return 'TextureHorizontal';
                case 48:
                    return 'TextureVertical';
                case 49:
                    return 'TextureDiagonalDown';
                case 50:
                    return 'TextureDiagonalUp';
                case 51:
                    return 'TextureCross';
                case 52:
                    return 'TextureDiagonalCross';
                default:
                    return textureStyle;
            }
        };
        SfdtReader.prototype.getHeightType = function (heightType) {
            switch (heightType) {
                case 0:
                    return 'AtLeast';
                case 1:
                    return 'Exactly';
                default:
                    return heightType;
            }
        };
        SfdtReader.prototype.getCellVerticalAlignment = function (cellVerticalAlignment) {
            switch (cellVerticalAlignment) {
                case 0:
                    return 'Top';
                case 1:
                    return 'Center';
                case 2:
                    return 'Bottom';
                default:
                    return cellVerticalAlignment;
            }
        };
        SfdtReader.prototype.getListLevelPattern = function (listLevelPattern) {
            switch (listLevelPattern) {
                case 0:
                    return 'None';
                case 1:
                case 13:
                case 'KanjiDigit':
                    return 'Arabic';
                case 2:
                    return 'UpRoman';
                case 3:
                    return 'LowRoman';
                case 4:
                    return 'UpLetter';
                case 5:
                    return 'LowLetter';
                case 6:
                    return 'Ordinal';
                case 7:
                    return 'Number';
                case 8:
                    return 'OrdinalText';
                case 9:
                    return 'LeadingZero';
                case 10:
                    return 'Bullet';
                case 11:
                    return 'FarEast';
                case 12:
                    return 'Special';
                default:
                    return listLevelPattern;
            }
        };
        SfdtReader.prototype.getFollowCharacterType = function (followCharacterType) {
            switch (followCharacterType) {
                case 0:
                    return 'Tab';
                case 1:
                    return 'Space';
                case 2:
                    return 'None';
                default:
                    return followCharacterType;
            }
        };
        SfdtReader.prototype.getStyleType = function (styleType) {
            switch (styleType) {
                case 0:
                    return 'Paragraph';
                case 1:
                    return 'Character';
                default:
                    return styleType;
            }
        };
        SfdtReader.prototype.getProtectionType = function (protectionType) {
            switch (protectionType) {
                case 0:
                    return 'NoProtection';
                case 1:
                    return 'ReadOnly';
                case 2:
                    return 'FormFieldsOnly';
                case 3:
                    return 'CommentsOnly';
                case 4:
                    return 'RevisionsOnly';
                default:
                    return protectionType;
            }
        };
        SfdtReader.prototype.getRevisionType = function (revisionType) {
            switch (revisionType) {
                case 1:
                    return 'Insertion';
                case 2:
                    return 'Deletion';
                case 3:
                    return 'MoveTo';
                case 4:
                    return 'MoveFrom';
                default:
                    return revisionType;
            }
        };
        SfdtReader.prototype.getFootnoteType = function (footnoteType) {
            switch (footnoteType) {
                case 0:
                    return 'Footnote';
                case 1:
                    return 'Endnote';
                default:
                    return footnoteType;
            }
        };
        SfdtReader.prototype.getFootnoteRestartIndex = function (footnoteRestartIndex) {
            switch (footnoteRestartIndex) {
                case 0:
                    return 'DoNotRestart';
                case 1:
                    return 'RestartForEachSection';
                case 2:
                    return 'RestartForEachPage';
                default:
                    return footnoteRestartIndex;
            }
        };
        SfdtReader.prototype.getFootEndNoteNumberFormat = function (footEndNoteNumberFormat) {
            switch (footEndNoteNumberFormat) {
                case 0:
                    return 'Arabic';
                case 1:
                    return 'UpperCaseRoman';
                case 2:
                    return 'LowerCaseRoman';
                case 3:
                    return 'UpperCaseLetter';
                case 4:
                    return 'LowerCaseLetter';
                default:
                    return footEndNoteNumberFormat;
            }
        };
        SfdtReader.prototype.getBiDirectionalOverride = function (biDirectionalOverride) {
            switch (biDirectionalOverride) {
                case 0:
                    return 'None';
                case 1:
                    return 'LTR';
                case 2:
                    return 'RTL';
                default:
                    return biDirectionalOverride;
            }
        };
        SfdtReader.prototype.getBreakClearType = function (breakClearType) {
            switch (breakClearType) {
                case 0:
                    return 'None';
                case 1:
                    return 'Left';
                case 2:
                    return 'Right';
                case 3:
                    return 'All';
                default:
                    return breakClearType;
            }
        };
        SfdtReader.prototype.getTextVerticalAlignment = function (textVerticalAlignment) {
            switch (textVerticalAlignment) {
                case 0:
                    return 'Top';
                case 1:
                    return 'Center';
                case 2:
                    return 'Bottom';
                default:
                    return textVerticalAlignment;
            }
        };
        SfdtReader.prototype.getShapeVerticalAlignment = function (shapeVerticalAlignment) {
            switch (shapeVerticalAlignment) {
                case 0:
                    return 'None';
                case 1:
                    return 'Top';
                case 2:
                    return 'Center';
                case 3:
                    return 'Bottom';
                case 4:
                    return 'Inline';
                case 5:
                    return 'Inside';
                case 6:
                    return 'Outside';
                default:
                    return shapeVerticalAlignment;
            }
        };
        SfdtReader.prototype.getShapeHorizontalAlignment = function (shapeHorizontalAlignment) {
            switch (shapeHorizontalAlignment) {
                case 0:
                    return 'None';
                case 1:
                    return 'Center';
                case 2:
                    return 'Inside';
                case 3:
                    return 'Left';
                case 4:
                    return 'Outside';
                case 5:
                    return 'Right';
                default:
                    return shapeHorizontalAlignment;
            }
        };
        SfdtReader.prototype.getVerticalOrigin = function (verticalOrigin) {
            switch (verticalOrigin) {
                case 0:
                    return 'Paragraph';
                case 1:
                    return 'BottomMargin';
                case 2:
                    return 'InsideMargin';
                case 3:
                    return 'Line';
                case 4:
                    return 'Margin';
                case 5:
                    return 'OutsideMargin';
                case 6:
                    return 'Page';
                case 7:
                    return 'TopMargin';
                default:
                    return verticalOrigin;
            }
        };
        SfdtReader.prototype.getHorizontalOrigin = function (horizontalOrigin) {
            switch (horizontalOrigin) {
                case 0:
                    return 'Column';
                case 1:
                    return 'Character';
                case 2:
                    return 'InsideMargin';
                case 3:
                    return 'LeftMargin';
                case 4:
                    return 'Margin';
                case 5:
                    return 'OutsideMargin';
                case 6:
                    return 'Page';
                case 7:
                    return 'RightMargin';
                default:
                    return horizontalOrigin;
            }
        };
        SfdtReader.prototype.getTableVerticalRelation = function (tableRelation) {
            switch (tableRelation) {
                case 0:
                    return 'Paragraph';
                case 1:
                    return 'Margin';
                case 2:
                    return 'Page';
                default:
                    return tableRelation;
            }
        };
        SfdtReader.prototype.getTableHorizontalRelation = function (tableRelation) {
            switch (tableRelation) {
                case 0:
                    return 'Column';
                case 1:
                    return 'Margin';
                case 2:
                    return 'Page';
                default:
                    return tableRelation;
            }
        };
        SfdtReader.prototype.getTableVerticalPosition = function (tableVerticalPosition) {
            switch (tableVerticalPosition) {
                case 0:
                    return 'None';
                case 1:
                    return 'Top';
                case 2:
                    return 'Center';
                case 3:
                    return 'Bottom';
                case 4:
                    return 'Inside';
                case 5:
                    return 'Outside';
                default:
                    return tableVerticalPosition;
            }
        };
        SfdtReader.prototype.getTableHorizontalPosition = function (tableHorizontalPosition) {
            switch (tableHorizontalPosition) {
                case 0:
                    return 'Left';
                case 1:
                    return 'Center';
                case 2:
                    return 'Inside';
                case 3:
                    return 'Outside';
                case 4:
                    return 'Right';
                default:
                    return tableHorizontalPosition;
            }
        };
        SfdtReader.prototype.getLineDashStyle = function (lineDashStyle) {
            switch (lineDashStyle) {
                case 0:
                    return 'Solid';
                case 1:
                    return 'Dash';
                case 2:
                    return 'DashDot';
                case 3:
                    return 'DashDotDot';
                case 4:
                    return 'DashDotGEL';
                case 5:
                    return 'DashGEL';
                case 6:
                    return 'Dot';
                case 7:
                    return 'DotGEL';
                case 8:
                    return 'LongDashDotDotGEL';
                case 9:
                    return 'LongDashDotGEL';
                case 10:
                    return 'LongDashGEL';
                default:
                    return lineDashStyle;
            }
        };
        SfdtReader.prototype.getHorizontalPositionAbs = function (horizontalPositionAbs) {
            switch (horizontalPositionAbs) {
                case 0:
                    return 'Left';
                case 1:
                    return 'Center';
                case 2:
                    return 'Right';
                case 3:
                    return 'Inside';
                case 4:
                    return 'Outside';
                default:
                    return horizontalPositionAbs;
            }
        };
        SfdtReader.prototype.getTabJustification = function (tabJustification) {
            switch (tabJustification) {
                case 0:
                    return 'Left';
                case 1:
                    return 'Bar';
                case 2:
                    return 'Center';
                case 3:
                    return 'Decimal';
                case 4:
                    return 'List';
                case 5:
                    return 'Right';
                default:
                    return tabJustification;
            }
        };
        SfdtReader.prototype.getTabLeader = function (tabLeader) {
            switch (tabLeader) {
                case 0:
                    return 'None';
                case 1:
                    return 'Single';
                case 2:
                    return 'Dot';
                case 3:
                    return 'Hyphen';
                case 4:
                    return 'Underscore';
                default:
                    return tabLeader;
            }
        };
        SfdtReader.prototype.getTextFormFieldType = function (textFormFieldType) {
            switch (textFormFieldType) {
                case 0:
                    return 'Text';
                case 1:
                    return 'Number';
                case 2:
                    return 'Date';
                case 3:
                    return 'Calculation';
                default:
                    return textFormFieldType;
            }
        };
        SfdtReader.prototype.getTextFormFieldFormat = function (textFormFieldFormat) {
            switch (textFormFieldFormat) {
                case 0:
                    return 'None';
                case 1:
                    return 'FirstCapital';
                case 2:
                    return 'Lowercase';
                case 3:
                    return 'Uppercase';
                case 4:
                    return 'Titlecase';
                default:
                    return textFormFieldFormat;
            }
        };
        SfdtReader.prototype.getCheckBoxSizeType = function (checkBoxSizeType) {
            switch (checkBoxSizeType) {
                case 0:
                    return 'Auto';
                case 1:
                    return 'Exactly';
                default:
                    return checkBoxSizeType;
            }
        };
        SfdtReader.prototype.getContentControlAppearance = function (contentControlAppearance) {
            switch (contentControlAppearance) {
                case 1:
                    return 'BoundingBox';
                case 2:
                    return 'Hidden';
                case 3:
                    return 'Tags';
                default:
                    return contentControlAppearance;
            }
        };
        SfdtReader.prototype.getContentControlType = function (contentControlType) {
            switch (contentControlType) {
                case 0:
                    return 'RichText';
                case 1:
                    return 'BuildingBlockGallery';
                case 2:
                    return 'CheckBox';
                case 3:
                    return 'ComboBox';
                case 4:
                    return 'Date';
                case 5:
                    return 'DropDownList';
                case 6:
                    return 'Group';
                case 7:
                    return 'Picture';
                case 8:
                    return 'RepeatingSection';
                case 9:
                    return 'Text';
                default:
                    return contentControlType;
            }
        };
        SfdtReader.prototype.getDateCalendarType = function (dateCalendarType) {
            switch (dateCalendarType) {
                case 0:
                    return 'Gregorian';
                case 1:
                    return 'GregorianArabic';
                case 2:
                    return 'GregorianEnglish';
                case 3:
                    return 'GregorianMiddleEastFrench';
                case 4:
                    return 'GregorianTransliteratedEnglish';
                case 5:
                    return 'GregorianTransliteratedFrench';
                case 6:
                    return 'Hebrew';
                case 7:
                    return 'Hijri';
                case 8:
                    return 'Japan';
                case 9:
                    return 'Korean';
                case 10:
                    return 'Saka';
                case 11:
                    return 'Taiwan';
                case 12:
                    return 'Thai';
                default:
                    return dateCalendarType;
            }
        };
        SfdtReader.prototype.getDateStorageFormat = function (dateStorageFormat) {
            switch (dateStorageFormat) {
                case 1:
                    return 'DateStorageDate';
                case 2:
                    return 'DateStorageDateTime';
                case 3:
                    return 'DateStorageText';
                default:
                    return dateStorageFormat;
            }
        };
        SfdtReader.prototype.getTextWrappingStyle = function (textWrappingStyle) {
            switch (textWrappingStyle) {
                case 0:
                    return 'Inline';
                case 1:
                    return 'InFrontOfText';
                case 2:
                    return 'Square';
                case 3:
                    return 'TopAndBottom';
                case 4:
                    return 'Behind';
                default:
                    return textWrappingStyle;
            }
        };
        SfdtReader.prototype.getTextWrappingType = function (textWrappingType) {
            switch (textWrappingType) {
                case 0:
                    return 'Both';
                case 1:
                    return 'Left';
                case 2:
                    return 'Right';
                case 3:
                    return 'Largest';
                default:
                    return textWrappingType;
            }
        };
        SfdtReader.prototype.getCompatibilityMode = function (compatibilityMode) {
            switch (compatibilityMode) {
                case 0:
                    return 'Word2013';
                case 1:
                    return 'Word2003';
                case 2:
                    return 'Word2007';
                case 3:
                    return 'Word2010';
                default:
                    return compatibilityMode;
            }
        };
        SfdtReader.prototype.getLineFormatType = function (lineFormatType) {
            switch (lineFormatType) {
                case 0:
                    return 'Solid';
                case 1:
                    return 'Patterned';
                case 2:
                    return 'Gradient';
                case 3:
                    return 'None';
                default:
                    return lineFormatType;
            }
        };
        SfdtReader.prototype.getAutoShapeType = function (autoShapeType) {
            switch (autoShapeType) {
                case 1:
                    return 'Rectangle';
                case 2:
                    return 'RoundedRectangle';
                case 3:
                    return 'StraightConnector';
                default:
                    return autoShapeType;
            }
        };
        SfdtReader.prototype.destroy = function () {
            if (this.footnotes) {
                this.footnotes.destroy();
            }
            this.footnotes = undefined;
            if (this.endnotes) {
                this.endnotes.destroy();
            }
            this.endnotes = undefined;
            if (this.editableRanges) {
                this.editableRanges.destroy();
            }
            this.editableRanges = undefined;
            if (this.commentEnds) {
                this.commentEnds.destroy();
            }
            this.commentEnds = undefined;
            if (this.commentStarts) {
                this.commentStarts.destroy();
            }
            this.commentStarts = undefined;
            if (this.commentsCollection) {
                this.commentsCollection.destroy();
            }
            this.commentsCollection = undefined;
            if (this.revisionCollection) {
                this.revisionCollection.destroy();
            }
            this.revisionCollection = undefined;
            this.documentHelper = undefined;
            this.keywordIndex = undefined;
        };
        return SfdtReader;
    }());
    exports.SfdtReader = SfdtReader;
});
