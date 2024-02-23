define(["require", "exports", "@syncfusion/ej2-compression", "@syncfusion/ej2-file-utils", "@syncfusion/ej2-base", "../index", "../../index", "../../index"], function (require, exports, ej2_compression_1, ej2_file_utils_1, ej2_base_1, index_1, index_2, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WordExport = (function () {
        function WordExport() {
            this.customXMLItemsPath = 'customXml/item';
            this.customXMLItemsPropspath = 'customXml/itemProps';
            this.itemPropsPath = 'itemProps';
            this.documentPath = 'word/document.xml';
            this.stylePath = 'word/styles.xml';
            this.chartPath = 'word/charts';
            this.numberingPath = 'word/numbering.xml';
            this.settingsPath = 'word/settings.xml';
            this.headerPath = 'word/header';
            this.footerPath = 'word/footer';
            this.imagePath = 'word/media/image';
            this.footnotesPath = 'word/footnotes.xml';
            this.endnotesPath = 'word/endnotes.xml';
            this.appPath = 'docProps/app.xml';
            this.corePath = 'docProps/core.xml';
            this.contentTypesPath = '[Content_Types].xml';
            this.defaultEmbeddingPath = 'word/embeddings/';
            this.commentsPath = 'word/comments.xml';
            this.commentsExtendedPath = 'word/commentsExtended.xml';
            this.themePath = 'word/theme/theme1.xml';
            this.generalRelationPath = '_rels/.rels';
            this.wordRelationPath = 'word/_rels/document.xml.rels';
            this.customXMLRelPath = 'customXml/_rels/item';
            this.excelRelationPath = 'xl/_rels/workbook.xml.rels';
            this.footnotesRelationPath = 'word/_rels/footnotes.xml.rels';
            this.endnotesRelationPath = 'word/_rels/endnotes.xml.rels';
            this.headerRelationPath = 'word/_rels/header';
            this.footerRelationPath = 'word/_rels/footer';
            this.xmlContentType = 'application/xml';
            this.fontContentType = 'application/vnd.openxmlformats-officedocument.obfuscatedFont';
            this.documentContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml';
            this.TemplateContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml';
            this.settingsContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml';
            this.commentsContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml';
            this.commentsExContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml';
            this.endnoteContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml';
            this.footerContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml';
            this.footnoteContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml';
            this.headerContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml';
            this.numberingContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml';
            this.stylesContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml';
            this.webSettingsContentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml';
            this.appContentType = 'application/vnd.openxmlformats-officedocument.extended-properties+xml';
            this.coreContentType = 'application/vnd.openxmlformats-package.core-properties+xml';
            this.customContentType = 'application/vnd.openxmlformats-officedocument.custom-properties+xml';
            this.customXmlContentType = 'application/vnd.openxmlformats-officedocument.customXmlProperties+xml';
            this.relationContentType = 'application/vnd.openxmlformats-package.relationships+xml';
            this.chartsContentType = 'application/vnd.openxmlformats-officedocument.drawingml.chart+xml';
            this.themeContentType = 'application/vnd.openxmlformats-officedocument.theme+xml';
            this.tableStyleContentType = 'application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml';
            this.chartColorStyleContentType = 'application/vnd.ms-office.chartcolorstyle+xml';
            this.commentsRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments';
            this.commentsExRelType = 'http://schemas.microsoft.com/office/2011/relationships/commentsExtended';
            this.settingsRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings';
            this.endnoteRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes';
            this.footerRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer';
            this.footnoteRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes';
            this.headerRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/header';
            this.documentRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument';
            this.numberingRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering';
            this.stylesRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles';
            this.chartRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart';
            this.ThemeRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme';
            this.fontRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/font';
            this.tableStyleRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles';
            this.coreRelType = 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties';
            this.appRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties';
            this.customRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties';
            this.imageRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image';
            this.hyperlinkRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink';
            this.controlRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/control';
            this.packageRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/package';
            this.customXmlRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml';
            this.customUIRelType = 'http://schemas.microsoft.com/office/2006/relationships/ui/extensibility';
            this.attachedTemplateRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/attachedTemplate';
            this.chartColorStyleRelType = 'http://schemas.microsoft.com/office/2011/relationships/chartColorStyle';
            this.wNamespace = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
            this.wpNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing';
            this.pictureNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/picture';
            this.aNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/main';
            this.a14Namespace = 'http://schemas.microsoft.com/office/drawing/2010/main';
            this.svgNamespace = 'http://schemas.microsoft.com/office/drawing/2016/SVG/main';
            this.rNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
            this.rpNamespace = 'http://schemas.openxmlformats.org/package/2006/relationships';
            this.vNamespace = 'urn:schemas-microsoft-com:vml';
            this.oNamespace = 'urn:schemas-microsoft-com:office:office';
            this.xmlNamespace = 'http://www.w3.org/XML/1998/namespace';
            this.w10Namespace = 'urn:schemas-microsoft-com:office:word';
            this.cpNamespace = 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties';
            this.dcNamespace = 'http://purl.org/dc/elements/1.1/';
            this.docPropsNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties';
            this.veNamespace = 'http://schemas.openxmlformats.org/markup-compatibility/2006';
            this.mNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/math';
            this.wneNamespace = 'http://schemas.microsoft.com/office/word/2006/wordml';
            this.customPropsNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/custom-properties';
            this.vtNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes';
            this.chartNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/chart';
            this.slNamespace = 'http://schemas.openxmlformats.org/schemaLibrary/2006/main';
            this.dtNamespace = 'uuid:C2F41010-65B3-11d1-A29F-00AA00C14882';
            this.wmlNamespace = 'http://schemas.microsoft.com/office/word/2003/wordml';
            this.w14Namespace = 'http://schemas.microsoft.com/office/word/2010/wordml';
            this.wpCanvasNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas';
            this.wpDrawingNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing';
            this.wpGroupNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingGroup';
            this.wpInkNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingInk';
            this.wpShapeNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingShape';
            this.w15Namespace = 'http://schemas.microsoft.com/office/word/2012/wordml';
            this.diagramNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/diagram';
            this.eNamespace = 'http://schemas.microsoft.com/office/2006/encryption';
            this.pNamespace = 'http://schemas.microsoft.com/office/2006/keyEncryptor/password';
            this.certNamespace = 'http://schemas.microsoft.com/office/2006/keyEncryptor/certificate';
            this.cxNamespace = 'http://schemas.microsoft.com/office/drawing/2014/chartex';
            this.c15Namespace = 'http://schemas.microsoft.com/office/drawing/2015/06/chart';
            this.c7Namespace = 'http://schemas.microsoft.com/office/drawing/2007/8/2/chart';
            this.csNamespace = 'http://schemas.microsoft.com/office/drawing/2012/chartStyle';
            this.spreadSheetNamespace = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
            this.spreadSheet9 = 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/main';
            this.cRelationshipsTag = 'Relationships';
            this.cRelationshipTag = 'Relationship';
            this.cIdTag = 'Id';
            this.cTypeTag = 'Type';
            this.cTargetTag = 'Target';
            this.cUserShapesTag = 'userShapes';
            this.cExternalData = 'externalData';
            this.twipsInOnePoint = 20;
            this.twentiethOfPoint = 20;
            this.borderMultiplier = 8;
            this.percentageFactor = 50;
            this.emusPerPoint = 12700;
            this.cConditionalTableStyleTag = 'tblStylePr';
            this.cTableFormatTag = 'tblPr';
            this.cTowFormatTag = 'trPr';
            this.cCellFormatTag = 'tcPr';
            this.cParagraphFormatTag = 'pPr';
            this.cCharacterFormatTag = 'rPr';
            this.packageType = 'http://schemas.microsoft.com/office/2006/xmlPackage';
            this.relsPartPath = '/_rels/.rels';
            this.documentRelsPartPath = '/word/_rels/document.xml.rels';
            this.webSettingsPath = '/word/webSettings.xml';
            this.wordMLDocumentPath = '/word/document.xml';
            this.wordMLStylePath = '/word/styles.xml';
            this.wordMLNumberingPath = '/word/numbering.xml';
            this.wordMLSettingsPath = '/word/settings.xml';
            this.wordMLHeaderPath = '/word/header';
            this.wordMLFooterPath = '/word/footer';
            this.wordMLCommentsPath = '/word/comments.xml';
            this.wordMLImagePath = '/word/media/image';
            this.wordMLFootnotesPath = '/word/footnotes.xml';
            this.wordMLEndnotesPath = '/word/endnotes.xml';
            this.wordMLAppPath = '/docProps/app.xml';
            this.wordMLCorePath = '/docProps/core.xml';
            this.wordMLCustomPath = '/docProps/custom.xml';
            this.wordMLFontTablePath = '/word/fontTable.xml';
            this.wordMLChartsPath = '/word/charts/';
            this.wordMLDefaultEmbeddingPath = '/word/embeddings/';
            this.wordMLEmbeddingPath = '/word/embeddings/';
            this.wordMLDrawingPath = '/word/drawings/';
            this.wordMLThemePath = '/word/theme/theme1.xml';
            this.wordMLFontsPath = '/word/fonts/';
            this.wordMLDiagramPath = '/word/diagrams/';
            this.wordMLControlPath = '/word/activeX/';
            this.wordMLVbaProject = '/vbaProject.bin';
            this.wordMLVbaData = '/vbaData.xml';
            this.wordMLVbaProjectPath = '/word/vbaProject.bin';
            this.wordMLVbaDataPath = '/word/vbaData.xml';
            this.wordMLWebSettingsPath = '/word/webSettings.xml';
            this.wordMLCustomItemProp1Path = '/customXml/itemProps1.xml';
            this.wordMLFootnoteRelPath = '/word/_rels/footnotes.xml.rels';
            this.wordMLEndnoteRelPath = '/word/_rels/endnotes.xml.rels';
            this.wordMLSettingsRelPath = '/word/_rels/settings.xml.rels';
            this.wordMLNumberingRelPath = '/word/_rels/numbering.xml.rels';
            this.wordMLFontTableRelPath = '/word/_rels/fontTable.xml.rels';
            this.wordMLCustomXmlPropsRelType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps';
            this.wordMLControlRelType = 'http://schemas.microsoft.com/office/2006/relationships/activeXControlBinary';
            this.wordMLDiagramContentType = 'application/vnd.ms-office.drawingml.diagramDrawing+xml';
            this.dsNamespace = 'http://schemas.openxmlformats.org/officeDocument/2006/customXml';
            this.excelFiles = undefined;
            this.lastSection = false;
            this.mRelationShipID = 0;
            this.cRelationShipId = 0;
            this.eRelationShipId = 0;
            this.efRelationShipId = 0;
            this.mDocPrID = 1;
            this.chartCount = 0;
            this.seriesCount = 0;
            this.chartStringCount = 0;
            this.mDifferentFirstPage = false;
            this.mBookmarks = undefined;
            this.mComments = [];
            this.revisions = [];
            this.customXMLProps = [];
            this.paraID = 0;
            this.commentParaID = 0;
            this.commentParaIDInfo = {};
            this.isInsideComment = false;
            this.commentId = {};
            this.currentCommentId = 0;
            this.trackChangesId = 0;
            this.prevRevisionIds = [];
            this.isRevisionContinuous = false;
            this.isBookmarkAtEnd = false;
            this.isBookmarkAtRowEnd = false;
            this.keywordIndex = undefined;
            this.isHeaderFooter = false;
            this.isSerializeFootEndNote = undefined;
            this.containerWidth = 0;
        }
        WordExport.prototype.getModuleName = function () {
            return 'WordExport';
        };
        Object.defineProperty(WordExport.prototype, "bookmarks", {
            get: function () {
                if (ej2_base_1.isNullOrUndefined(this.mBookmarks)) {
                    this.mBookmarks = [];
                }
                return this.mBookmarks;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "documentImages", {
            get: function () {
                if (this.mDocumentImages === undefined) {
                    this.mDocumentImages = new index_2.Dictionary();
                }
                return this.mDocumentImages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "svgImages", {
            get: function () {
                if (this.mSvgImages === undefined) {
                    this.mSvgImages = new index_2.Dictionary();
                }
                return this.mSvgImages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "externalImages", {
            get: function () {
                if (this.mExternalLinkImages === undefined) {
                    this.mExternalLinkImages = new index_2.Dictionary();
                }
                return this.mExternalLinkImages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "headerFooterImages", {
            get: function () {
                if (this.mHeaderFooterImages === undefined) {
                    this.mHeaderFooterImages = new index_2.Dictionary();
                }
                return this.mHeaderFooterImages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "headerFooterSvgImages", {
            get: function () {
                if (this.mHeaderFooterSvgImages === undefined) {
                    this.mHeaderFooterSvgImages = new index_2.Dictionary();
                }
                return this.mHeaderFooterSvgImages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "documentCharts", {
            get: function () {
                if (this.mDocumentCharts === undefined) {
                    this.mDocumentCharts = new index_2.Dictionary();
                }
                return this.mDocumentCharts;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "headersFooters", {
            get: function () {
                if (this.mHeaderFooterColl === undefined) {
                    this.mHeaderFooterColl = new index_2.Dictionary();
                }
                return this.mHeaderFooterColl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordExport.prototype, "endnotesFootnotes", {
            get: function () {
                if (this.mFootEndnotesColl === undefined) {
                    this.mFootEndnotesColl = new index_2.Dictionary();
                }
                return this.mFootEndnotesColl;
            },
            enumerable: true,
            configurable: true
        });
        WordExport.prototype.save = function (documentHelper, fileName, formatType) {
            var _this = this;
            this.fileName = fileName;
            this.serialize(documentHelper, formatType);
            var excelFiles = this.serializeExcelFiles();
            if (excelFiles && excelFiles.length > 0) {
                Promise.all(excelFiles).then(function () {
                    _this.saveInternal(fileName, formatType);
                });
            }
            else {
                this.saveInternal(fileName, formatType);
            }
            this.close();
        };
        WordExport.prototype.saveInternal = function (fileName, formatType) {
            if (formatType == 'Docx') {
                this.mArchive.save(fileName + '.docx').then(function (mArchive) {
                    mArchive.destroy();
                });
            }
            else if (formatType == 'Dotx') {
                this.mArchive.save(fileName + '.dotx').then(function (mArchive) {
                    mArchive.destroy();
                });
            }
        };
        WordExport.prototype.saveAsBlob = function (documentHelper, formatType) {
            var _this = this;
            this.serialize(documentHelper, formatType);
            var excelFiles = this.serializeExcelFiles();
            return new Promise(function (resolve, reject) {
                if (excelFiles.length > 0) {
                    Promise.all(excelFiles).then(function () {
                        _this.mArchive.saveAsBlob().then(function (blob) {
                            _this.mArchive.destroy();
                            blob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                            resolve(blob);
                        });
                    });
                }
                else {
                    _this.mArchive.saveAsBlob().then(function (blob) {
                        _this.mArchive.destroy();
                        blob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                        resolve(blob);
                    });
                }
            });
        };
        WordExport.prototype.serializeExcelFiles = function () {
            var _this = this;
            var excelFiles = this.excelFiles;
            var files = [];
            if (excelFiles && excelFiles.length > 0) {
                var _loop_1 = function (i) {
                    var fileName = excelFiles.keys[parseInt(i.toString(), 10)];
                    var excelFile = excelFiles.get(fileName);
                    var excelPromise = excelFile.saveAsBlob();
                    files.push(excelPromise);
                    excelPromise.then(function (blob) {
                        var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(blob, fileName);
                        _this.mArchive.addItem(zipArchiveItem);
                    });
                };
                for (var i = 0; i < excelFiles.length; i++) {
                    _loop_1(i);
                }
                this.excelFiles.clear();
            }
            return files;
        };
        WordExport.prototype.saveExcel = function () {
            var xlsxPath = this.defaultEmbeddingPath + 'Microsoft_Excel_Worksheet' + this.chartCount + '.xlsx';
            this.excelFiles.add(xlsxPath, this.mArchiveExcel);
            this.mArchiveExcel = undefined;
        };
        WordExport.prototype.destroy = function () {
            this.clearDocument();
            this.mRelationShipID = undefined;
            this.mDocPrID = undefined;
            this.mDifferentFirstPage = undefined;
            this.fileName = undefined;
            this.imageRelationIds = undefined;
            this.svgImageRelationIds = undefined;
            if (this.mArchive) {
                this.mArchive.destroy();
                this.mArchive = undefined;
            }
            if (this.mArchiveExcel) {
                this.mArchiveExcel.destroy();
                this.mArchiveExcel = undefined;
            }
        };
        WordExport.prototype.serialize = function (documentHelper, formatType) {
            this.keywordIndex = documentHelper.owner.documentEditorSettings.optimizeSfdt ? 1 : 0;
            var document = documentHelper.owner.sfdtExportModule.write(this.keywordIndex);
            this.setDocument(document);
            this.mComments = documentHelper.comments;
            this.mCustomXML = documentHelper.customXmlData;
            this.mImages = documentHelper.images;
            this.revisions = documentHelper.owner.revisions.changes;
            this.mArchive = new ej2_compression_1.ZipArchive();
            this.mArchive.compressionLevel = 'Normal';
            this.commentParaIDInfo = {};
            this.commentParaID = 0;
            this.currentCommentId = 0;
            this.commentId = {};
            this.mVerticalMerge = new index_2.Dictionary();
            this.mGridSpans = new index_2.Dictionary();
            this.imageRelationIds = new index_2.Dictionary();
            this.svgImageRelationIds = new index_2.Dictionary();
            var contenttype;
            this.serializeDocument();
            this.serializeStyles();
            this.serializeNumberings();
            this.serializeComments();
            this.serializeCommentsExtended();
            this.serializeThemes();
            this.serializeSettings();
            this.serializeCoreProperties();
            this.serializeAppProperties();
            this.serializeFontTable(contenttype);
            this.serializeSettingsRelation();
            this.serializeHeaderFooters();
            this.serializeFootnotes();
            this.serializeEndnotes();
            this.serializeDocumentRelations();
            this.serializeGeneralRelations();
            this.serializeContentTypes(contenttype, formatType);
            this.clearDocument();
        };
        WordExport.prototype.setDocument = function (document, keyindex) {
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = keyindex;
            }
            this.document = document;
            this.mSections = document[index_3.sectionsProperty[this.keywordIndex]];
            this.mLists = document[index_3.listsProperty[this.keywordIndex]];
            this.mAbstractLists = document[index_3.abstractListsProperty[this.keywordIndex]];
            this.defCharacterFormat = document[index_3.characterFormatProperty[this.keywordIndex]];
            this.defParagraphFormat = document[index_3.paragraphFormatProperty[this.keywordIndex]];
            this.defaultTabWidthValue = document[index_3.defaultTabWidthProperty[this.keywordIndex]];
            this.themeFontLang = document[index_3.themeFontLanguagesProperty[this.keywordIndex]];
            this.dontUseHtmlParagraphAutoSpacing = index_1.HelperMethods.parseBoolValue(document[index_3.doNotUseHTMLParagraphAutoSpacingProperty[this.keywordIndex]]);
            this.mStyles = document[index_3.stylesProperty[this.keywordIndex]];
            this.mThemes = document[index_3.themesProperty[this.keywordIndex]];
            this.formatting = index_1.HelperMethods.parseBoolValue(document[index_3.formattingProperty[this.keywordIndex]]);
            this.enforcement = index_1.HelperMethods.parseBoolValue(document[index_3.enforcementProperty[this.keywordIndex]]);
            this.hashValue = document[index_3.hashValueProperty[this.keywordIndex]];
            this.saltValue = document[index_3.saltValueProperty[this.keywordIndex]];
            this.protectionType = document[index_3.protectionTypeProperty[this.keywordIndex]];
            this.formFieldShading = index_1.HelperMethods.parseBoolValue(document[index_3.formFieldShadingProperty[this.keywordIndex]]);
            this.trackChanges = index_1.HelperMethods.parseBoolValue(document[index_3.trackChangesProperty[this.keywordIndex]]);
            this.compatibilityMode = document[index_3.compatibilityModeProperty[this.keywordIndex]];
            this.allowSpaceOfSameStyleInTable = index_1.HelperMethods.parseBoolValue(document[index_3.allowSpaceOfSameStyleInTableProperty[this.keywordIndex]]);
        };
        WordExport.prototype.clearDocument = function () {
            this.section = undefined;
            this.lastSection = undefined;
            this.blockOwner = undefined;
            this.paragraph = undefined;
            this.table = undefined;
            this.row = undefined;
            this.headerFooter = undefined;
            this.commentParaIDInfo = {};
            this.commentParaID = 0;
            this.currentCommentId = 0;
            this.commentId = {};
            this.document = undefined;
            this.mSections = undefined;
            this.mLists = undefined;
            this.mAbstractLists = undefined;
            this.defCharacterFormat = undefined;
            this.defParagraphFormat = undefined;
            this.defaultTabWidthValue = undefined;
            this.trackChanges = undefined;
            this.customXMLProps = [];
            this.mRelationShipID = 0;
            this.eRelationShipId = 0;
            this.cRelationShipId = 0;
            this.efRelationShipId = 0;
            this.mDocPrID = 1;
            this.chartCount = 0;
            this.keywordIndex = undefined;
            this.mDifferentFirstPage = false;
            if (this.mHeaderFooterColl) {
                this.mHeaderFooterColl.destroy();
                this.mHeaderFooterColl = undefined;
            }
            if (this.mVerticalMerge) {
                this.mVerticalMerge.destroy();
                this.mVerticalMerge = undefined;
            }
            if (this.mGridSpans) {
                this.mGridSpans.destroy();
                this.mGridSpans = undefined;
            }
            if (this.mDocumentImages) {
                this.mDocumentImages.destroy();
                this.mDocumentImages = undefined;
            }
            if (this.mSvgImages) {
                this.mSvgImages.destroy();
                this.mSvgImages = undefined;
            }
            if (this.mExternalLinkImages) {
                this.mExternalLinkImages.destroy();
                this.mExternalLinkImages = undefined;
            }
            if (this.mHeaderFooterImages) {
                this.mHeaderFooterImages.destroy();
                this.mHeaderFooterImages = undefined;
            }
            if (this.mHeaderFooterSvgImages) {
                this.mHeaderFooterSvgImages.destroy();
                this.mHeaderFooterSvgImages = undefined;
            }
            if (this.mDocumentCharts) {
                this.mDocumentCharts.destroy();
                this.mDocumentCharts = undefined;
            }
            if (this.mFootEndnotesColl) {
                this.mFootEndnotesColl.destroy();
                this.mFootEndnotesColl = undefined;
            }
        };
        WordExport.prototype.serializeDocument = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w', 'document', this.wNamespace);
            this.writeCommonAttributeStrings(writer);
            writer.writeStartElement('w', 'background', this.wNamespace);
            writer.writeAttributeString('w', 'color', undefined, this.getColor(this.document[index_3.backgroundProperty[this.keywordIndex]][index_3.colorProperty[this.keywordIndex]]));
            writer.writeEndElement();
            this.serializeDocumentBody(writer);
            writer.writeEndElement();
            var archiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.documentPath);
            this.mArchive.addItem(archiveItem);
        };
        WordExport.prototype.writeCommonAttributeStrings = function (writer) {
            writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
            this.writeCustom(writer);
            writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
            writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
            writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
            writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
            this.writeDup(writer);
            writer.writeAttributeString('xmlns', 'wne', undefined, this.wneNamespace);
            writer.writeAttributeString('xmlns', 'wps', undefined, this.wpShapeNamespace);
            writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15 wp14');
        };
        WordExport.prototype.writeDup = function (writer) {
            writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
            writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
            writer.writeAttributeString('xmlns', 'wpg', undefined, this.wpGroupNamespace);
            writer.writeAttributeString('xmlns', 'wpi', undefined, this.wpInkNamespace);
        };
        WordExport.prototype.writeCustom = function (writer) {
            writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
            writer.writeAttributeString('xmlns', 'o', undefined, this.oNamespace);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('xmlns', 'm', undefined, this.mNamespace);
            writer.writeAttributeString('xmlns', 'v', undefined, this.vNamespace);
        };
        WordExport.prototype.serializeDocumentBody = function (writer) {
            writer.writeStartElement(undefined, 'body', this.wNamespace);
            var count = this.document[index_3.sectionsProperty[this.keywordIndex]].length;
            for (var i = 0; i < count; i++) {
                this.section = this.document[index_3.sectionsProperty[this.keywordIndex]][parseInt(i.toString(), 10)];
                this.lastSection = i === count - 1;
                this.containerWidth = this.section[index_3.sectionFormatProperty[this.keywordIndex]][index_3.pageWidthProperty[this.keywordIndex]] - (this.section[index_3.sectionFormatProperty[this.keywordIndex]][index_3.leftMarginProperty[this.keywordIndex]] + this.section[index_3.sectionFormatProperty[this.keywordIndex]][index_3.rightMarginProperty[this.keywordIndex]]);
                this.serializeSection(writer, this.section, i === count - 1);
                this.section = undefined;
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeSection = function (writer, section, last) {
            this.blockOwner = section;
            if (!ej2_base_1.isNullOrUndefined(section[index_3.blocksProperty[this.keywordIndex]])) {
                this.serializeBodyItems(writer, section[index_3.blocksProperty[this.keywordIndex]], last);
            }
            if (last) {
                this.serializeSectionProperties(writer, section);
            }
            this.blockOwner = undefined;
        };
        WordExport.prototype.serializeComments = function () {
            if (this.mComments.length === 0 || (this.mComments.length === 1 && this.mComments[0].text === '')) {
                return;
            }
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w', 'comments', this.wNamespace);
            this.serializeCommentCommonAttribute(writer);
            this.serializeCommentInternal(writer, this.mComments);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.commentsPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeThemes = function () {
            if (!ej2_base_1.isNullOrUndefined(this.mThemes)) {
                var writer = new ej2_file_utils_1.XmlWriter();
                writer.writeStartElement('a', 'theme', this.aNamespace);
                writer.writeAttributeString(undefined, 'name', undefined, 'Office Theme');
                writer.writeStartElement(undefined, 'themeElements', this.aNamespace);
                writer.writeRaw('<a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000" /></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF" /></a:lt1><a:dk2><a:srgbClr val="44546A" /></a:dk2><a:lt2><a:srgbClr val="E7E6E6" /></a:lt2><a:accent1><a:srgbClr val="4472C4" /></a:accent1><a:accent2><a:srgbClr val="ED7D31" /></a:accent2><a:accent3><a:srgbClr val="A5A5A5" /></a:accent3><a:accent4><a:srgbClr val="FFC000" /></a:accent4><a:accent5><a:srgbClr val="5B9BD5" /></a:accent5><a:accent6><a:srgbClr val="70AD47" /></a:accent6><a:hlink><a:srgbClr val="0563C1" /></a:hlink><a:folHlink><a:srgbClr val="954F72" /></a:folHlink></a:clrScheme>');
                writer.writeStartElement(undefined, 'fontScheme', this.aNamespace);
                writer.writeAttributeString(undefined, 'name', undefined, this.mThemes[index_3.fontSchemeNameProperty[this.keywordIndex]]);
                writer.writeStartElement(undefined, 'majorFont', this.aNamespace);
                for (var i = 0; i < this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.majorFontSchemeProperty[this.keywordIndex]][index_3.fontSchemeListProperty[this.keywordIndex]].length; i++) {
                    var theme = this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.majorFontSchemeProperty[this.keywordIndex]][index_3.fontSchemeListProperty[this.keywordIndex]][parseInt(i.toString(), 10)];
                    this.themeFont(writer, theme);
                }
                var keys = Object.keys(this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.majorFontSchemeProperty[this.keywordIndex]][index_3.fontTypefaceProperty[this.keywordIndex]]);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    this.themeType(writer, key, this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.majorFontSchemeProperty[this.keywordIndex]][index_3.fontTypefaceProperty[this.keywordIndex]]["" + key]);
                }
                writer.writeEndElement();
                writer.writeStartElement(undefined, 'minorFont', this.aNamespace);
                for (var i = 0; i < this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.minorFontSchemeProperty[this.keywordIndex]][index_3.fontSchemeListProperty[this.keywordIndex]].length; i++) {
                    var theme = this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.minorFontSchemeProperty[this.keywordIndex]][index_3.fontSchemeListProperty[this.keywordIndex]][parseInt(i.toString(), 10)];
                    this.themeFont(writer, theme);
                }
                keys = Object.keys(this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.minorFontSchemeProperty[this.keywordIndex]][index_3.fontTypefaceProperty[this.keywordIndex]]);
                for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                    var key = keys_2[_a];
                    this.themeType(writer, key, this.mThemes[index_3.fontSchemeProperty[this.keywordIndex]][index_3.minorFontSchemeProperty[this.keywordIndex]][index_3.fontTypefaceProperty[this.keywordIndex]]["" + key]);
                }
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeStartElement(undefined, 'fmtScheme', this.aNamespace);
                writer.writeAttributeString(undefined, 'name', undefined, 'Office');
                writer.writeRaw('<a:fillStyleLst><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000" /><a:satMod val="105000" /><a:tint val="67000" /></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000" /><a:satMod val="103000" /><a:tint val="73000" /></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000" /><a:satMod val="109000" /><a:tint val="81000" /></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0" /></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000" /><a:lumMod val="102000" /><a:tint val="94000" /></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000" /><a:lumMod val="100000" /><a:shade val="100000" /></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000" /><a:satMod val="120000" /><a:shade val="78000" /></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0" /></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:prstDash val="solid" /><a:miter lim="800000" /></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:prstDash val="solid" /><a:miter lim="800000" /></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:prstDash val="solid" /><a:miter lim="800000" /></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst /></a:effectStyle><a:effectStyle><a:effectLst /></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000" /></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr" /></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000" /><a:satMod val="170000" /></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000" /><a:satMod val="150000" /><a:shade val="98000" /><a:lumMod val="102000" /></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000" /><a:satMod val="130000" /><a:shade val="90000" /><a:lumMod val="103000" /></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000" /><a:satMod val="120000" /></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0" /></a:gradFill></a:bgFillStyleLst>');
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeEndElement();
                var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.themePath);
                this.mArchive.addItem(zipArchiveItem);
            }
        };
        WordExport.prototype.themeFont = function (writer, theme) {
            if (theme[index_3.nameProperty[this.keywordIndex]] == 'latin' || theme[index_3.nameProperty[this.keywordIndex]] == 'ea' || theme[index_3.nameProperty[this.keywordIndex]] == 'cs') {
                writer.writeStartElement(undefined, theme[index_3.nameProperty[this.keywordIndex]], this.aNamespace);
                writer.writeAttributeString(undefined, 'typeface', undefined, theme[index_3.typefaceProperty[this.keywordIndex]]);
                writer.writeAttributeString(undefined, 'panose', undefined, theme[index_3.panoseProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
        };
        WordExport.prototype.themeType = function (writer, script, typeFace) {
            writer.writeStartElement(undefined, 'font', this.aNamespace);
            writer.writeAttributeString(undefined, 'script', undefined, script);
            writer.writeAttributeString(undefined, 'typeface', undefined, typeFace);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeCommentCommonAttribute = function (writer) {
            writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
            writer.writeAttributeString('xmlns', 'cx', undefined, this.cxNamespace);
            writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
            writer.writeAttributeString('xmlns', 'o', undefined, this.oNamespace);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('xmlns', 'm', undefined, this.mNamespace);
            writer.writeAttributeString('xmlns', 'v', undefined, this.vNamespace);
            writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
            writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
            writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
            writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
            writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
            writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
            writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
        };
        WordExport.prototype.serializeCommentInternal = function (writer, comments) {
            for (var i = 0; i < comments.length; i++) {
                var comment = comments[parseInt(i.toString(), 10)];
                writer.writeStartElement('w', 'comment', this.wNamespace);
                writer.writeAttributeString('w', 'id', this.wNamespace, this.commentId[comment.commentId].toString());
                if (comment.author && comment.author !== ' ') {
                    writer.writeAttributeString('w', 'author', this.wNamespace, comment.author);
                }
                if (comment.date) {
                    writer.writeAttributeString('w', 'date', this.wNamespace, comment.date);
                }
                if (comment.initial && comment.initial !== '') {
                    writer.writeAttributeString('w', 'initials', this.wNamespace, comment.initial);
                }
                var blocks = this.retrieveCommentText(comment.text);
                for (var k = 0; k < blocks.length; k++) {
                    this.isInsideComment = true;
                    this.commentParaID++;
                    this.serializeBodyItem(writer, blocks[parseInt(k.toString(), 10)], true);
                    this.isInsideComment = false;
                }
                if (blocks.length === 0) {
                    this.isInsideComment = true;
                    this.commentParaID++;
                }
                this.commentParaIDInfo[comment.commentId] = this.commentParaID;
                this.isInsideComment = false;
                writer.writeEndElement();
                if (comment.replyComments.length > 0) {
                    this.serializeCommentInternal(writer, comment.replyComments);
                }
            }
        };
        WordExport.prototype.retrieveCommentText = function (text) {
            var blocks = [];
            var multiText = text.split('\n');
            while (multiText.length > 0) {
                var block = {};
                block[index_3.inlinesProperty[this.keywordIndex]] = [];
                var inlines = {};
                inlines[index_3.textProperty[this.keywordIndex]] = multiText[0];
                block[index_3.inlinesProperty[this.keywordIndex]].push(inlines);
                blocks.push(block);
                multiText.splice(0, 1);
            }
            return blocks;
        };
        WordExport.prototype.serializeCommentsExtended = function () {
            if (this.mComments.length === 0 || (this.mComments.length === 1 && this.mComments[0].text === '')) {
                return;
            }
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w15', 'commentsEx', this.wNamespace);
            this.serializeCommentCommonAttribute(writer);
            this.serializeCommentsExInternal(writer, this.mComments, false);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.commentsExtendedPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeCommentsExInternal = function (writer, comments, isReply) {
            for (var i = 0; i < comments.length; i++) {
                var comment = comments[parseInt(i.toString(), 10)];
                writer.writeStartElement('w15', 'commentEx', this.wNamespace);
                var syncParaID = this.commentParaIDInfo[comment.commentId];
                if (isReply) {
                    var paraID = this.commentParaIDInfo[comment.ownerComment.commentId];
                    writer.writeAttributeString('w15', 'paraIdParent', this.wNamespace, paraID.toString());
                }
                writer.writeAttributeString('w15', 'paraId', this.wNamespace, syncParaID.toString());
                var val = comment.done ? 1 : 0;
                writer.writeAttributeString('w15', 'done', this.wNamespace, val.toString());
                writer.writeEndElement();
                if (comment.replyComments.length > 0) {
                    this.serializeCommentsExInternal(writer, comment.replyComments, true);
                }
            }
        };
        WordExport.prototype.serializeSectionProperties = function (writer, section) {
            if (!ej2_base_1.isNullOrUndefined(this.document.optimizeSfdt)) {
                this.keywordIndex = this.document.optimizeSfdt ? 1 : 0;
            }
            writer.writeStartElement('w', 'sectPr', this.wNamespace);
            if (section[index_3.headersFootersProperty[this.keywordIndex]]) {
                this.serializeHFReference(writer, section[index_3.headersFootersProperty[this.keywordIndex]]);
            }
            if (section[index_3.sectionFormatProperty[this.keywordIndex]][index_3.breakCodeProperty[this.keywordIndex]] === 'NoBreak') {
                this.serializeSectionType(writer, 'continuous');
            }
            else {
                this.serializeSectionType(writer, 'nextPage');
            }
            this.serializePageSetup(writer, section[index_3.sectionFormatProperty[this.keywordIndex]]);
            this.serializeColumns(writer, section[index_3.sectionFormatProperty[this.keywordIndex]]);
            this.serializeFootNotesPr(writer, section[index_3.sectionFormatProperty[this.keywordIndex]]);
            this.serializeEndNotesPr(writer, section[index_3.sectionFormatProperty[this.keywordIndex]]);
            if (section[index_3.sectionFormatProperty[this.keywordIndex]] !== undefined && index_1.HelperMethods.parseBoolValue(section[index_3.sectionFormatProperty[this.keywordIndex]][index_3.differentFirstPageProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'titlePg', this.wNamespace);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(section[index_3.sectionFormatProperty[this.keywordIndex]]) && index_1.HelperMethods.parseBoolValue(section[index_3.sectionFormatProperty[this.keywordIndex]][index_3.bidiProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'bidi', this.wNamespace);
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeFootNotesPr = function (writer, section) {
            if (section[index_3.footNoteNumberFormatProperty[this.keywordIndex]] || section[index_3.restartIndexForFootnotesProperty[this.keywordIndex]]) {
                writer.writeStartElement(undefined, 'footnotePr', this.wNamespace);
                writer.writeStartElement(undefined, 'pos', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, 'pageBottom');
                writer.writeEndElement();
                if (section[index_3.footNoteNumberFormatProperty[this.keywordIndex]] !== undefined) {
                    writer.writeStartElement(undefined, 'numFmt', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberFormat(section[index_3.footNoteNumberFormatProperty[this.keywordIndex]]));
                    writer.writeEndElement();
                }
                if (section[index_3.restartIndexForFootnotesProperty[this.keywordIndex]] !== undefined) {
                    writer.writeStartElement(undefined, 'numRestart', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberRestart(section[index_3.restartIndexForFootnotesProperty[this.keywordIndex]]));
                    writer.writeEndElement();
                }
                if (section[index_3.initialFootNoteNumberProperty[this.keywordIndex]] !== undefined) {
                    writer.writeStartElement(undefined, 'numStart', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, (section[index_3.initialFootNoteNumberProperty[this.keywordIndex]]).toString());
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.getFootNoteNumberFormat = function (numberFormat) {
            var patternType;
            switch (numberFormat) {
                case 'UpperCaseRoman':
                case 1:
                    patternType = 'upperRoman';
                    break;
                case 'LowerCaseRoman':
                case 2:
                    patternType = 'lowerRoman';
                    break;
                case 'UpperCaseLetter':
                case 3:
                    patternType = 'upperLetter';
                    break;
                case 'LowerCaseLetter':
                case 4:
                    patternType = 'lowerLetter';
                    break;
                default:
                    patternType = 'decimal';
                    break;
            }
            return patternType;
        };
        WordExport.prototype.getFootNoteNumberRestart = function (numberRestart) {
            switch (numberRestart) {
                case 'RestartForEachSection ':
                case 1:
                    return 'eachSect';
                case 'RestartForEachPage':
                case 2:
                    return 'eachPage';
                default:
                    return 'continuous';
            }
        };
        WordExport.prototype.getPageNumberFormat = function (numberFormat) {
            var patternType;
            switch (numberFormat) {
                case 'RomanUpper':
                    patternType = 'upperRoman';
                    break;
                case 'RomanLower':
                    patternType = 'lowerRoman';
                    break;
                case 'LetterUpper':
                    patternType = 'upperLetter';
                    break;
                case 'LetterLower':
                    patternType = 'lowerLetter';
                    break;
                default:
                    patternType = 'Arabic';
                    break;
            }
            return patternType;
        };
        WordExport.prototype.serializeEndNotesPr = function (writer, section) {
            if (section[index_3.endnoteNumberFormatProperty[this.keywordIndex]] || section[index_3.restartIndexForEndnotesProperty[this.keywordIndex]]) {
                writer.writeStartElement(undefined, 'endnotePr', this.wNamespace);
                writer.writeStartElement(undefined, 'pos', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, 'docEnd');
                writer.writeEndElement();
                if (section[index_3.endnoteNumberFormatProperty[this.keywordIndex]] !== undefined) {
                    writer.writeStartElement(undefined, 'numFmt', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberFormat(section[index_3.endnoteNumberFormatProperty[this.keywordIndex]]));
                    writer.writeEndElement();
                }
                if (section[index_3.restartIndexForEndnotesProperty[this.keywordIndex]] !== undefined) {
                    writer.writeStartElement(undefined, 'numRestart', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getFootNoteNumberRestart(section[index_3.restartIndexForEndnotesProperty[this.keywordIndex]]));
                    writer.writeEndElement();
                }
                if (section[index_3.initialEndNoteNumberProperty[this.keywordIndex]] !== undefined) {
                    writer.writeStartElement(undefined, 'numStart', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, (section[index_3.initialEndNoteNumberProperty[this.keywordIndex]]).toString());
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeColumns = function (writer, sectionFormat) {
            if (sectionFormat[index_3.numberOfColumnsProperty[this.keywordIndex]] !== undefined && sectionFormat[index_3.numberOfColumnsProperty[this.keywordIndex]] > 1) {
                writer.writeStartElement(undefined, 'cols', this.wNamespace);
                writer.writeAttributeString(undefined, 'num', this.wNamespace, sectionFormat[index_3.numberOfColumnsProperty[this.keywordIndex]].toString());
                if (index_1.HelperMethods.parseBoolValue(sectionFormat[index_3.lineBetweenColumnsProperty[this.keywordIndex]])) {
                    writer.writeAttributeString(undefined, 'sep', this.wNamespace, '1');
                }
                if (index_1.HelperMethods.parseBoolValue(sectionFormat[index_3.equalWidthProperty[this.keywordIndex]])) {
                    writer.writeAttributeString(undefined, 'equalWidth', this.wNamespace, '1');
                }
                else {
                    writer.writeAttributeString(undefined, 'equalWidth', this.wNamespace, '0');
                    if (sectionFormat[index_3.columnsProperty[this.keywordIndex]] !== undefined && sectionFormat[index_3.columnsProperty[this.keywordIndex]].length > 0) {
                        for (var i = 0; i < sectionFormat[index_3.columnsProperty[this.keywordIndex]].length; i++) {
                            writer.writeStartElement(undefined, 'col', this.wNamespace);
                            writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(sectionFormat[index_3.columnsProperty[this.keywordIndex]][parseInt(i.toString(), 10)][index_3.widthProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
                            writer.writeAttributeString(undefined, 'space', this.wNamespace, this.roundToTwoDecimal(sectionFormat[index_3.columnsProperty[this.keywordIndex]][parseInt(i.toString(), 10)][index_3.spaceProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
                            writer.writeEndElement();
                        }
                    }
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializePageSetup = function (writer, pageSetup) {
            if (pageSetup !== undefined) {
                this.serializePageSize(writer, pageSetup);
                this.serializePageMargins(writer, pageSetup);
                this.serializePageNumberType(writer, pageSetup);
            }
            if (index_1.HelperMethods.parseBoolValue(pageSetup[index_3.restartPageNumberingProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'pgNumType', this.wNamespace);
                writer.writeAttributeString(undefined, 'start', this.wNamespace, pageSetup[index_3.pageStartingNumberProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
            }
            writer.writeStartElement(undefined, 'pgBorders', this.wNamespace);
            writer.writeEndElement();
        };
        WordExport.prototype.serializePageSize = function (writer, pageSetup) {
            writer.writeStartElement(undefined, 'pgSz', this.wNamespace);
            writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(pageSetup[index_3.pageWidthProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
            writer.writeAttributeString(undefined, 'h', this.wNamespace, this.roundToTwoDecimal(pageSetup[index_3.pageHeightProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
            writer.writeEndElement();
        };
        WordExport.prototype.serializePageMargins = function (writer, pageSetup) {
            writer.writeStartElement(undefined, 'pgMar', this.wNamespace);
            var marginValue = Math.round(pageSetup[index_3.topMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
            writer.writeAttributeString(undefined, 'top', this.wNamespace, marginValue.toString());
            marginValue = Math.round(pageSetup[index_3.rightMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
            writer.writeAttributeString(undefined, 'right', this.wNamespace, marginValue.toString());
            marginValue = Math.round(pageSetup[index_3.bottomMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
            writer.writeAttributeString(undefined, 'bottom', this.wNamespace, marginValue.toString());
            marginValue = Math.round(pageSetup[index_3.leftMarginProperty[this.keywordIndex]] * this.twentiethOfPoint);
            writer.writeAttributeString(undefined, 'left', this.wNamespace, marginValue.toString());
            writer.writeAttributeString(undefined, 'header', this.wNamespace, this.roundToTwoDecimal(pageSetup[index_3.headerDistanceProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
            writer.writeAttributeString(undefined, 'footer', this.wNamespace, this.roundToTwoDecimal(pageSetup[index_3.footerDistanceProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
            writer.writeAttributeString(undefined, 'gutter', this.wNamespace, '0');
            writer.writeEndElement();
        };
        WordExport.prototype.serializePageNumberType = function (writer, pageSetup) {
            if (pageSetup[index_3.pageNumberStyleProperty[this.keywordIndex]] !== undefined) {
                writer.writeStartElement(undefined, 'pgNumType', this.wNamespace);
                writer.writeAttributeString(undefined, 'fmt', this.wNamespace, this.getPageNumberFormat(pageSetup[index_3.pageNumberStyleProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeSectionType = function (writer, sectionBreakCode) {
            writer.writeStartElement('w', 'type', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, sectionBreakCode);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeHFReference = function (writer, headersFooters) {
            var hfId = '';
            if (headersFooters !== undefined) {
                this.mDifferentFirstPage = index_1.HelperMethods.parseBoolValue(this.section[index_3.sectionFormatProperty[this.keywordIndex]][index_3.differentOddAndEvenPagesProperty[this.keywordIndex]]);
                var hf = headersFooters[index_3.firstPageHeaderProperty[this.keywordIndex]];
                if (hf && hf[index_3.blocksProperty[this.keywordIndex]] && hf[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                    writer.writeStartElement(undefined, 'headerReference', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'first');
                    hfId = this.getNextRelationShipID();
                    writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                    this.addHeaderFooter(hf, 'FirstPageHeader', hfId);
                    writer.writeEndElement();
                }
                hf = headersFooters[index_3.firstPageFooterProperty[this.keywordIndex]];
                if (hf && hf[index_3.blocksProperty[this.keywordIndex]] && hf[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                    writer.writeStartElement(undefined, 'footerReference', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'first');
                    hfId = this.getNextRelationShipID();
                    writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                    this.addHeaderFooter(hf, 'FirstPageFooter', hfId);
                    writer.writeEndElement();
                }
                hf = headersFooters[index_3.evenHeaderProperty[this.keywordIndex]];
                if (hf && hf[index_3.blocksProperty[this.keywordIndex]] && hf[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                    writer.writeStartElement(undefined, 'headerReference', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'even');
                    hfId = this.getNextRelationShipID();
                    writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                    this.addHeaderFooter(hf, 'EvenHeader', hfId);
                    writer.writeEndElement();
                }
                hf = headersFooters[index_3.evenFooterProperty[this.keywordIndex]];
                if (hf && hf[index_3.blocksProperty[this.keywordIndex]] && hf[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                    writer.writeStartElement(undefined, 'footerReference', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'even');
                    hfId = this.getNextRelationShipID();
                    writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                    this.addHeaderFooter(hf, 'EvenFooter', hfId);
                    writer.writeEndElement();
                }
                hf = headersFooters[index_3.headerProperty[this.keywordIndex]];
                if (hf && hf[index_3.blocksProperty[this.keywordIndex]] && hf[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                    writer.writeStartElement(undefined, 'headerReference', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'default');
                    hfId = this.getNextRelationShipID();
                    writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                    this.addHeaderFooter(hf, 'OddHeader', hfId);
                    writer.writeEndElement();
                }
                hf = headersFooters[index_3.footerProperty[this.keywordIndex]];
                if (hf && hf[index_3.blocksProperty[this.keywordIndex]] && hf[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                    writer.writeStartElement(undefined, 'footerReference', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'default');
                    hfId = this.getNextRelationShipID();
                    writer.writeAttributeString(undefined, 'id', this.rNamespace, hfId);
                    this.addHeaderFooter(hf, 'OddFooter', hfId);
                    writer.writeEndElement();
                }
            }
        };
        WordExport.prototype.addHeaderFooter = function (hf, hfType, id) {
            var hfColl = new index_2.Dictionary();
            this.headersFooters.add(hfType, hfColl);
            this.headersFooters.get(hfType).add(id, hf);
        };
        WordExport.prototype.serializeBodyItems = function (writer, blockCollection, isLastSection) {
            for (var i = 0; i < blockCollection.length; i++) {
                this.serializeBodyItem(writer, blockCollection[parseInt(i.toString(), 10)], isLastSection);
            }
        };
        WordExport.prototype.serializeContentControl = function (writer, contentControlItem, item, isLastSection, inlines) {
            if (ej2_base_1.isNullOrUndefined(contentControlItem)) {
                throw new Error('contentCOntrol should not be undefined');
            }
            writer.writeStartElement('w', 'sdt', this.wNamespace);
            writer.writeStartElement(undefined, 'sdtPr', this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(contentControlItem)) {
                this.serializeContentProperties(writer, contentControlItem, item, isLastSection, inlines);
            }
        };
        WordExport.prototype.serializeContentProperties = function (writer, contentProperties, items, isLastSection, inlines) {
            var repeatSdt = undefined;
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.titleProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'alias', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, contentProperties[index_3.titleProperty[this.keywordIndex]]);
                writer.writeEndElement();
                writer.writeStartElement(undefined, 'tag', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, contentProperties[index_3.tagProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.characterFormatProperty[this.keywordIndex]])) {
                this.serializeCharacterFormat(writer, items[index_3.contentControlPropertiesProperty[this.keywordIndex]][index_3.characterFormatProperty[this.keywordIndex]]);
            }
            if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.lockContentsProperty[this.keywordIndex]]) || index_1.HelperMethods.parseBoolValue(contentProperties[index_3.lockContentControlProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'lock', this.wNamespace);
                if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.lockContentControlProperty[this.keywordIndex]]) && index_1.HelperMethods.parseBoolValue(contentProperties[index_3.lockContentsProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'sdtContentLocked');
                }
                else if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.lockContentControlProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'sdtLocked');
                }
                else if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.lockContentsProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'contentLocked');
                }
                writer.writeEndElement();
            }
            if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.hasPlaceHolderTextProperty[this.keywordIndex]]) && ej2_base_1.isNullOrUndefined(repeatSdt)) {
                writer.writeStartElement('w', 'placeholder', undefined);
                writer.writeAttributeString('w', 'docPart', this.wNamespace, undefined);
                writer.writeEndElement();
                writer.writeStartElement('w', 'showingPlcHdr', undefined);
                writer.writeEndElement();
            }
            if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.isTemporaryProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'temporary', undefined);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.appearanceProperty[this.keywordIndex]])) {
                writer.writeStartElement('w15', 'appearance', undefined);
                writer.writeAttributeString('w15', 'val', undefined, this.keywordIndex == 1 ? this.getContentControlAppearance(contentProperties[index_3.appearanceProperty[this.keywordIndex]]).toLowerCase() : contentProperties[index_3.appearanceProperty[this.keywordIndex]].toLowerCase());
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.colorProperty[this.keywordIndex]])) {
                writer.writeStartElement('w15', 'color', undefined);
                writer.writeAttributeString('w', 'val', undefined, this.getColor(contentProperties[index_3.colorProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.multiLineProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'text', this.wNamespace);
                writer.writeAttributeString('w', 'multiLine', this.wNamespace, '1');
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.xmlMappingProperty[this.keywordIndex]])) {
                if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.xmlMappingProperty[this.keywordIndex]][index_3.isMappedProperty[this.keywordIndex]])) {
                    writer.writeStartElement('w', 'dataBinding', this.wNamespace);
                    writer.writeAttributeString('w', 'xpath', undefined, contentProperties[index_3.xmlMappingProperty[this.keywordIndex]][index_3.xPathProperty[this.keywordIndex]]);
                    writer.writeAttributeString('w', 'storeItemID', undefined, contentProperties[index_3.xmlMappingProperty[this.keywordIndex]][index_3.storeItemIdProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
            }
            if (contentProperties.picture) {
                writer.writeStartElement('w', 'picture', this.wNamespace);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.uncheckedStateProperty[this.keywordIndex]] || contentProperties[index_3.checkedStateProperty[this.keywordIndex]])) {
                writer.writeStartElement('w14', 'checkbox', undefined);
                if (index_1.HelperMethods.parseBoolValue(contentProperties[index_3.isCheckedProperty[this.keywordIndex]])) {
                    writer.writeStartElement('w14', 'checked', undefined);
                    writer.writeAttributeString('w14', 'val', undefined, '1');
                    writer.writeEndElement();
                }
                else {
                    writer.writeStartElement('w14', 'checked', undefined);
                    writer.writeAttributeString('w14', 'val', undefined, '0');
                    writer.writeEndElement();
                }
                if (contentProperties[index_3.uncheckedStateProperty[this.keywordIndex]]) {
                    writer.writeStartElement('w14', 'uncheckedState', undefined);
                    writer.writeAttributeString('w14', 'val', undefined, this.toUnicode(contentProperties[index_3.uncheckedStateProperty[this.keywordIndex]][index_3.valueProperty[this.keywordIndex]]));
                    writer.writeAttributeString('w14', 'font', undefined, (contentProperties[index_3.uncheckedStateProperty[this.keywordIndex]][index_3.fontProperty[this.keywordIndex]]));
                    writer.writeEndElement();
                }
                if (contentProperties[index_3.checkedStateProperty[this.keywordIndex]]) {
                    writer.writeStartElement('w14', 'checkedState', undefined);
                    writer.writeAttributeString('w14', 'val', undefined, this.toUnicode(contentProperties[index_3.checkedStateProperty[this.keywordIndex]][index_3.valueProperty[this.keywordIndex]]));
                    writer.writeAttributeString('w14', 'font', undefined, contentProperties[index_3.checkedStateProperty[this.keywordIndex]][index_3.fontProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.contentControlListItemsProperty[this.keywordIndex]]) && contentProperties[index_3.typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 5 : 'DropDownList')) {
                var dropDownLists = contentProperties[index_3.contentControlListItemsProperty[this.keywordIndex]];
                writer.writeStartElement(undefined, 'dropDownList', this.wNamespace);
                this.serializeContentControlList(writer, dropDownLists);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.contentControlListItemsProperty[this.keywordIndex]]) && contentProperties[index_3.typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 3 : 'ComboBox')) {
                var comboList = contentProperties[index_3.contentControlListItemsProperty[this.keywordIndex]];
                writer.writeStartElement(undefined, 'comboBox', this.wNamespace);
                this.serializeContentControlList(writer, comboList);
                writer.writeEndElement();
            }
            this.serializeContentControlDate(writer, contentProperties);
            if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.typeProperty[this.keywordIndex]])) {
                if (contentProperties[index_3.typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 7 : 'Picture')) {
                    writer.writeStartElement(undefined, 'picture', this.wNamespace);
                    writer.writeEndElement();
                }
            }
            writer.writeEndElement();
            writer.writeStartElement('w', 'sdtContent', this.wNamespace);
            if (inlines) {
                return;
            }
            if (items.hasOwnProperty(index_3.blocksProperty[this.keywordIndex]) && (ej2_base_1.isNullOrUndefined(items[index_3.cellFormatProperty[this.keywordIndex]]))) {
                for (var i = 0; i < items[index_3.blocksProperty[this.keywordIndex]].length; i++) {
                    var block = items[index_3.blocksProperty[this.keywordIndex]][i];
                    if (block.hasOwnProperty(index_3.inlinesProperty[this.keywordIndex])) {
                        this.paragraph = block;
                        this.serializeParagraph(writer, block, isLastSection);
                        this.paragraph = undefined;
                    }
                    else if (block.hasOwnProperty(index_3.rowFormatProperty[this.keywordIndex])) {
                        var mVerticalMerge = new index_2.Dictionary();
                        this.serializeRow(writer, block, mVerticalMerge);
                    }
                    else if (block.hasOwnProperty(index_3.contentControlPropertiesProperty[this.keywordIndex])) {
                        this.serializeContentControl(writer, block[index_3.contentControlPropertiesProperty[this.keywordIndex]], block, isLastSection);
                    }
                    else {
                        var table = block;
                        this.serializeTable(writer, table);
                    }
                }
            }
            else if (items.hasOwnProperty(index_3.rowFormatProperty[this.keywordIndex])) {
                if (items[index_3.cellsProperty[this.keywordIndex]].length > 0) {
                    var mVerticalMerge = new index_2.Dictionary();
                    this.serializeRow(writer, items, mVerticalMerge);
                }
            }
            else if (items.hasOwnProperty(index_3.cellFormatProperty[this.keywordIndex])) {
                var mVerticalMerge = new index_2.Dictionary();
                this.serializeCell(writer, items, mVerticalMerge);
            }
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.toUnicode = function (code) {
            var charCode = code.charCodeAt(0);
            return charCode.toString(16);
        };
        WordExport.prototype.serializeContentControlList = function (writer, lists) {
            for (var i = 0; i < lists.length; i++) {
                writer.writeStartElement(undefined, 'listItem', this.wNamespace);
                if (!ej2_base_1.isNullOrUndefined(lists[i][index_3.displayTextProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'displayText', this.wNamespace, lists[i][index_3.displayTextProperty[this.keywordIndex]]);
                }
                writer.writeAttributeString('w', 'value', this.wNamespace, lists[i][index_3.valueProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeContentParagraph = function (writer, items) {
            for (var i = 0; i < items[index_3.blocksProperty[this.keywordIndex]].length; i++) {
                var blocks = items[index_3.blocksProperty[this.keywordIndex]][i];
                if (blocks.hasOwnProperty(index_3.inlinesProperty[this.keywordIndex])) {
                    for (var j = 0; j < blocks[index_3.inlinesProperty[this.keywordIndex]].length; j++) {
                        var inlines = blocks[index_3.inlinesProperty[this.keywordIndex]][j];
                        if (!ej2_base_1.isNullOrUndefined(inlines[index_3.characterFormatProperty[this.keywordIndex]])) {
                            this.serializeCharacterFormat(writer, inlines[index_3.characterFormatProperty[this.keywordIndex]]);
                        }
                    }
                }
            }
        };
        WordExport.prototype.serializeContentControlDate = function (writer, contentProperties) {
            if (contentProperties[index_3.typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 4 : 'Date')) {
                writer.writeStartElement('w', 'date', this.wNamespace);
                if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.dateCalendarTypeProperty[this.keywordIndex]])) {
                    writer.writeStartElement('w', 'calender', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 ? this.getDateCalendarType(contentProperties[index_3.dateCalendarTypeProperty[this.keywordIndex]]) : contentProperties[index_3.dateCalendarTypeProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.dateDisplayLocaleProperty[this.keywordIndex]])) {
                    writer.writeStartElement('w', 'lid', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, contentProperties[index_3.dateDisplayLocaleProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.dateStorageFormatProperty[this.keywordIndex]])) {
                    writer.writeStartElement('w', 'storeMappedDataAs', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 ? this.getDateStorageFormat(contentProperties[index_3.dateStorageFormatProperty[this.keywordIndex]]) : contentProperties[index_3.dateStorageFormatProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                if (!ej2_base_1.isNullOrUndefined(contentProperties[index_3.dateDisplayFormatProperty[this.keywordIndex]])) {
                    writer.writeStartElement('w', 'dateFormat', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, contentProperties[index_3.dateDisplayFormatProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeBodyItem = function (writer, item, isLastSection) {
            if (ej2_base_1.isNullOrUndefined(item)) {
                throw new Error('BodyItem should not be undefined');
            }
            if (item.hasOwnProperty(index_3.contentControlPropertiesProperty[this.keywordIndex])) {
                this.serializeContentControl(writer, item[index_3.contentControlPropertiesProperty[this.keywordIndex]], item, isLastSection);
            }
            else if (item.hasOwnProperty(index_3.inlinesProperty[this.keywordIndex])) {
                this.paragraph = item;
                this.serializeParagraph(writer, item, isLastSection);
                this.paragraph = undefined;
            }
            else {
                var table = item;
                for (var i = 0; i < table[index_3.rowsProperty[this.keywordIndex]].length; i++) {
                    if (table[index_3.rowsProperty[this.keywordIndex]][i][index_3.cellsProperty[this.keywordIndex]].length > 0) {
                        this.serializeTable(writer, table);
                        break;
                    }
                }
                var sec = this.blockOwner;
                if (!isLastSection && sec.hasOwnProperty(index_3.sectionFormatProperty[this.keywordIndex])
                    && sec[index_3.blocksProperty[this.keywordIndex]].indexOf(table) === sec[index_3.blocksProperty[this.keywordIndex]].length - 1) {
                    writer.writeStartElement('w', 'p', this.wNamespace);
                    writer.writeStartElement(undefined, 'pPr', this.wNamespace);
                    this.serializeSectionProperties(writer, sec);
                    writer.writeEndElement();
                    writer.writeEndElement();
                }
            }
        };
        WordExport.prototype.serializeParagraph = function (writer, paragraph, isLastSection) {
            if (ej2_base_1.isNullOrUndefined(paragraph)) {
                throw new Error('Paragraph should not be undefined');
            }
            if (!ej2_base_1.isNullOrUndefined(this.document.optimizeSfdt)) {
                this.keywordIndex = this.document.optimizeSfdt ? 1 : 0;
            }
            writer.writeStartElement('w', 'p', this.wNamespace);
            if (this.isInsideComment) {
                writer.writeAttributeString('w14', 'paraId', undefined, this.commentParaID.toString());
            }
            writer.writeStartElement(undefined, 'pPr', this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(paragraph[index_3.paragraphFormatProperty[this.keywordIndex]])) {
                this.serializeParagraphFormat(writer, paragraph[index_3.paragraphFormatProperty[this.keywordIndex]], paragraph);
            }
            if (!ej2_base_1.isNullOrUndefined(paragraph[index_3.characterFormatProperty[this.keywordIndex]])) {
                this.serializeCharacterFormat(writer, paragraph[index_3.characterFormatProperty[this.keywordIndex]]);
            }
            var sec = this.blockOwner;
            if (!isLastSection && sec.hasOwnProperty(index_3.sectionFormatProperty[this.keywordIndex])
                && sec[index_3.blocksProperty[this.keywordIndex]].indexOf(paragraph) === sec[index_3.blocksProperty[this.keywordIndex]].length - 1) {
                this.serializeSectionProperties(writer, sec);
            }
            writer.writeEndElement();
            this.prevRevisionIds = [];
            this.serializeParagraphItems(writer, paragraph[index_3.inlinesProperty[this.keywordIndex]]);
            if (!this.isBookmarkAtEnd && !this.isBookmarkAtRowEnd) {
                writer.writeEndElement();
            }
            this.isBookmarkAtEnd = false;
        };
        WordExport.prototype.serializeRevisionStart = function (writer, item, previousNode) {
            if (item.hasOwnProperty(index_3.revisionIdsProperty[this.keywordIndex])) {
                if (!ej2_base_1.isNullOrUndefined(previousNode) && previousNode.hasOwnProperty(index_3.bookmarkTypeProperty[this.keywordIndex]) && (previousNode[index_3.bookmarkTypeProperty[this.keywordIndex]] === 0 && !(previousNode[index_3.nameProperty[this.keywordIndex]].indexOf('_Toc') >= 0) && ej2_base_1.isNullOrUndefined(item[index_3.revisionIdsProperty[this.keywordIndex]]))) {
                    return;
                }
                var ids = item[index_3.revisionIdsProperty[this.keywordIndex]];
                for (var i = 0; i < ids.length; i++) {
                    var revision = this.retrieveRevision(ids[i]);
                    if (revision.revisionType === 'Insertion') {
                        this.serializeTrackChanges(writer, 'ins', revision.author, revision.date);
                    }
                    if (revision.revisionType === 'Deletion') {
                        this.serializeTrackChanges(writer, 'del', revision.author, revision.date);
                    }
                }
            }
        };
        WordExport.prototype.serializeTrackChanges = function (writer, type, author, date) {
            writer.writeStartElement('w', type, this.wNamespace);
            writer.writeAttributeString('w', 'id', this.wNamespace, (this.trackChangesId++).toString());
            if (author != "Unknown") {
                writer.writeAttributeString('w', 'author', this.wNamespace, author);
            }
            writer.writeAttributeString('w', 'date', this.wNamespace, date);
        };
        WordExport.prototype.retrieveRevision = function (id) {
            var matchedRevisions = [];
            for (var i = 0; i < this.revisions.length; i++) {
                if (this.revisions[i].revisionID === id) {
                    return this.revisions[i];
                }
            }
            return undefined;
        };
        WordExport.prototype.serializeParagraphItems = function (writer, paraItems, keyindex) {
            if (ej2_base_1.isNullOrUndefined(paraItems)) {
                throw new Error('Paragraph should not be undefined');
            }
            var inlines;
            var previousNode = undefined;
            var isContinueOverride = false;
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = keyindex;
            }
            for (var i = 0; i < paraItems.length; i++) {
                var item = paraItems[i];
                if (item.hasOwnProperty(index_3.contentControlPropertiesProperty[this.keywordIndex])) {
                    inlines = true;
                    this.serializeContentControl(writer, item[index_3.contentControlPropertiesProperty[this.keywordIndex]], item, undefined, inlines);
                    this.serializeParagraphItems(writer, item[index_3.inlinesProperty[this.keywordIndex]]);
                }
                if (item.hasOwnProperty(index_3.inlinesProperty[this.keywordIndex])) {
                    this.serializeParagraphItems(writer, item);
                }
                this.serializeRevisionStart(writer, item, previousNode);
                var isBdo = false;
                if (item[index_3.characterFormatProperty[this.keywordIndex]]) {
                    isBdo = !ej2_base_1.isNullOrUndefined(item[index_3.characterFormatProperty[this.keywordIndex]][index_3.bdoProperty[this.keywordIndex]]) && item[index_3.characterFormatProperty[this.keywordIndex]][index_3.bdoProperty[this.keywordIndex]] !== 0;
                    if (isBdo && !isContinueOverride) {
                        this.serializeBiDirectionalOverride(writer, item[index_3.characterFormatProperty[this.keywordIndex]]);
                        isContinueOverride = true;
                    }
                }
                if (isContinueOverride && !isBdo) {
                    writer.writeEndElement();
                    isContinueOverride = false;
                }
                if (item.hasOwnProperty(index_3.fieldTypeProperty[this.keywordIndex])) {
                    this.serializeFieldCharacter(writer, item);
                }
                else if (item.hasOwnProperty(index_3.imageStringProperty[this.keywordIndex])) {
                    this.serializePicture(writer, item);
                }
                else if (item.hasOwnProperty(index_3.shapeIdProperty[this.keywordIndex])) {
                    var currentParargaph = this.paragraph;
                    this.serializeShape(writer, item);
                    this.paragraph = currentParargaph;
                }
                else if (item.hasOwnProperty(index_3.bookmarkTypeProperty[this.keywordIndex])) {
                    this.serializeBookMark(writer, item);
                }
                else if (item.hasOwnProperty(index_3.editRangeIdProperty[this.keywordIndex])) {
                    this.serializeEditRange(writer, item);
                }
                else if (item.hasOwnProperty(index_3.chartTypeProperty[this.keywordIndex])) {
                    this.chart = item;
                    this.serializeChart(writer, item);
                    this.serializeChartStructure();
                }
                else if (item.hasOwnProperty(index_3.commentCharacterTypeProperty[this.keywordIndex])) {
                    this.serializeComment(writer, item);
                }
                else if (item.hasOwnProperty(index_3.footnoteTypeProperty[this.keywordIndex])) {
                    this.serializeEFReference(writer, item);
                }
                else {
                    this.serializeTextRange(writer, item, previousNode);
                }
                this.serializeRevisionEnd(writer, item, previousNode);
                previousNode = item;
                if (inlines) {
                    writer.writeEndElement();
                    writer.writeEndElement();
                    inlines = false;
                }
            }
            if (isContinueOverride) {
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeEFReference = function (writer, item) {
            var efId = '';
            var ef = item[index_3.blocksProperty[this.keywordIndex]];
            if (item[index_3.footnoteTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Footnote')) {
                writer.writeStartElement(undefined, 'r', this.wNamespace);
                this.serializeCharacterFormat(writer, item[index_3.characterFormatProperty[this.keywordIndex]]);
                writer.writeStartElement(undefined, 'footnoteReference', this.wNamespace);
                if (this.document[index_3.footnotesProperty[this.keywordIndex]][index_3.continuationNoticeProperty[this.keywordIndex]] && this.efRelationShipId === 0) {
                    this.efRelationShipId = 1;
                }
                efId = this.getEFNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.wNamespace, efId);
                this.addFootnotesEndnotes(ef, 'footnote', efId);
                writer.writeEndElement();
                writer.writeEndElement();
            }
            else {
                writer.writeStartElement(undefined, 'r', this.wNamespace);
                this.serializeCharacterFormat(writer, item[index_3.characterFormatProperty[this.keywordIndex]]);
                writer.writeStartElement(undefined, 'endnoteReference', this.wNamespace);
                efId = this.getEFNextRelationShipID();
                writer.writeAttributeString(undefined, 'id', this.wNamespace, efId);
                this.addFootnotesEndnotes(ef, 'endnote', efId);
                writer.writeEndElement();
                writer.writeEndElement();
            }
        };
        WordExport.prototype.addFootnotesEndnotes = function (ef, efType, id) {
            var efColl = new index_2.Dictionary();
            this.endnotesFootnotes.add(efType, efColl);
            this.endnotesFootnotes.get(efType).add(id, ef);
        };
        WordExport.prototype.serializeEndnotesFootnote = function (writer, efType) {
            if (this.endnotesFootnotes.length === 0) {
                return;
            }
            var endnoteFootnotePath;
            var endnoteFootnoteRelsPath;
            if (!this.endnotesFootnotes.containsKey(efType)) {
                return;
            }
            var efColl = this.endnotesFootnotes.get(efType);
            var ef = undefined;
            for (var i = 0; i < efColl.keys.length; i++) {
                var id = efColl.keys[i];
                ef = efColl.get(id);
                if (efType === 'endnote') {
                    endnoteFootnotePath = this.endnotesPath;
                    endnoteFootnoteRelsPath = this.endnotesRelationPath;
                    this.serializeInlineEndnotes(writer, ef, id);
                }
                else {
                    endnoteFootnotePath = this.footnotesPath;
                    endnoteFootnoteRelsPath = this.footnotesRelationPath;
                    this.serializeInlineFootnotes(writer, ef, id);
                }
            }
        };
        WordExport.prototype.serializeInlineEndnotes = function (writer, endNote, id) {
            this.isSerializeFootEndNote = "Endnote";
            this.endNoteFootnote = endNote;
            var owner = this.blockOwner;
            this.blockOwner = endNote;
            writer.writeStartElement('w', 'endnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'id', this.wNamespace, id);
            this.serializeBodyItems(writer, endNote, true);
            writer.writeEndElement();
            this.blockOwner = owner;
            this.endNoteFootnote = undefined;
            this.isSerializeFootEndNote = undefined;
        };
        WordExport.prototype.serializeInlineFootnotes = function (writer, footNote, id) {
            this.isSerializeFootEndNote = "Footnote";
            this.endNoteFootnote = footNote;
            var owner = this.blockOwner;
            this.blockOwner = footNote;
            writer.writeStartElement('w', 'footnote', this.wNamespace);
            writer.writeAttributeString(undefined, 'id', this.wNamespace, id);
            this.serializeBodyItems(writer, footNote, true);
            writer.writeEndElement();
            this.blockOwner = owner;
            this.endNoteFootnote = undefined;
            this.isSerializeFootEndNote = undefined;
        };
        WordExport.prototype.writeEFCommonAttributes = function (writer) {
            writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
            writer.writeAttributeString('xmlns', 'cx', undefined, this.cxNamespace);
            writer.writeAttributeString('xmlns', 'aink', undefined, 'http://schemas.microsoft.com/office/drawing/2016/ink');
            writer.writeAttributeString('xmlns', 'am3d', undefined, 'http://schemas.microsoft.com/office/drawing/2017/,odel3d');
            this.writeCustom(writer);
            writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
            writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
            writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
            this.writeDup(writer);
            writer.writeAttributeString('xmlns', 'wne', undefined, this.wneNamespace);
            writer.writeAttributeString('xmlns', 'wps', undefined, this.wpShapeNamespace);
            writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
        };
        WordExport.prototype.serializeFootnotes = function () {
            if (ej2_base_1.isNullOrUndefined(this.document[index_3.footnotesProperty[this.keywordIndex]])) {
                return;
            }
            else {
                var writer = new ej2_file_utils_1.XmlWriter();
                writer.writeStartElement('w', 'footnotes', this.wNamespace);
                this.writeEFCommonAttributes(writer);
                writer.writeStartElement('w', 'footnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'separator');
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
                this.serializeBodyItems(writer, this.document[index_3.footnotesProperty[this.keywordIndex]][index_3.separatorProperty[this.keywordIndex]], true);
                writer.writeEndElement();
                writer.writeStartElement('w', 'footnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationSeparator');
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
                this.serializeBodyItems(writer, this.document[index_3.footnotesProperty[this.keywordIndex]][index_3.continuationSeparatorProperty[this.keywordIndex]], true);
                writer.writeEndElement();
                if (this.document[index_3.footnotesProperty[this.keywordIndex]][index_3.continuationNoticeProperty[this.keywordIndex]]) {
                    writer.writeStartElement('w', 'footnote', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationNotice');
                    writer.writeAttributeString(undefined, 'id', this.wNamespace, '1');
                    this.serializeBodyItems(writer, this.document[index_3.footnotesProperty[this.keywordIndex]][index_3.continuationNoticeProperty[this.keywordIndex]], true);
                    writer.writeEndElement();
                }
                this.serializeEndnotesFootnote(writer, 'footnote');
                writer.writeEndElement();
                var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.footnotesPath);
                this.mArchive.addItem(zipArchiveItem);
            }
        };
        WordExport.prototype.serializeEndnotes = function () {
            if (ej2_base_1.isNullOrUndefined(this.document[index_3.endnotesProperty[this.keywordIndex]])) {
                return;
            }
            else {
                var writer = new ej2_file_utils_1.XmlWriter();
                writer.writeStartElement('w', 'endnotes', this.wNamespace);
                this.writeEFCommonAttributes(writer);
                writer.writeStartElement('w', 'endnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'separator');
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
                this.serializeBodyItems(writer, this.document[index_3.endnotesProperty[this.keywordIndex]][index_3.separatorProperty[this.keywordIndex]], true);
                writer.writeEndElement();
                writer.writeStartElement('w', 'endnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationSeparator');
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
                this.serializeBodyItems(writer, this.document[index_3.endnotesProperty[this.keywordIndex]][index_3.continuationSeparatorProperty[this.keywordIndex]], true);
                writer.writeEndElement();
                if (this.document[index_3.endnotesProperty[this.keywordIndex]][index_3.continuationNoticeProperty[this.keywordIndex]]) {
                    writer.writeStartElement('w', 'endnote', this.wNamespace);
                    writer.writeAttributeString(undefined, 'type', this.wNamespace, 'continuationNotice');
                    writer.writeAttributeString(undefined, 'id', this.wNamespace, '1');
                    this.serializeBodyItems(writer, this.document[index_3.endnotesProperty[this.keywordIndex]][index_3.continuationNoticeProperty[this.keywordIndex]], true);
                    writer.writeEndElement();
                }
                this.serializeEndnotesFootnote(writer, 'endnote');
                writer.writeEndElement();
                var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.endnotesPath);
                this.mArchive.addItem(zipArchiveItem);
            }
        };
        WordExport.prototype.serializeRevisionEnd = function (writer, item, previousNode) {
            if (item.hasOwnProperty(index_3.revisionIdsProperty[this.keywordIndex])) {
                if (!ej2_base_1.isNullOrUndefined(previousNode) && previousNode.hasOwnProperty(index_3.fieldTypeProperty[this.keywordIndex]) && (previousNode[index_3.fieldTypeProperty[this.keywordIndex]] === 0 && item[index_3.textProperty[this.keywordIndex]].indexOf('TOC') >= 0)) {
                    return;
                }
                for (var i = 0; i < item[index_3.revisionIdsProperty[this.keywordIndex]].length; i++) {
                    var revision = this.retrieveRevision(item[index_3.revisionIdsProperty[this.keywordIndex]][i]);
                    if (revision.revisionType === 'Insertion' || revision.revisionType === 'Deletion') {
                        writer.writeEndElement();
                    }
                }
            }
        };
        WordExport.prototype.serializeComment = function (writer, comment) {
            if (!(this.mComments.length === 1 && this.mComments[0].text === '')) {
                if (comment[index_3.commentCharacterTypeProperty[this.keywordIndex]] === 0) {
                    writer.writeStartElement('w', 'commentRangeStart', this.wNamespace);
                }
                else if (comment[index_3.commentCharacterTypeProperty[this.keywordIndex]] === 1) {
                    writer.writeStartElement('w', 'commentRangeEnd', this.wNamespace);
                }
                var commentId = this.commentId[comment[index_3.commentIdProperty[this.keywordIndex]]];
                if (ej2_base_1.isNullOrUndefined(commentId)) {
                    commentId = this.commentId[comment[index_3.commentIdProperty[this.keywordIndex]]] = this.currentCommentId++;
                }
                writer.writeAttributeString('w', 'id', this.wNamespace, commentId.toString());
                writer.writeEndElement();
                if (comment[index_3.commentCharacterTypeProperty[this.keywordIndex]] === 1) {
                    this.serializeCommentItems(writer, commentId);
                }
            }
        };
        WordExport.prototype.serializeCommentItems = function (writer, commentId) {
            writer.writeStartElement('w', 'r', this.wNamespace);
            writer.writeStartElement('w', 'commentReference', this.wNamespace);
            writer.writeAttributeString('w', 'id', this.wNamespace, commentId.toString());
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeBiDirectionalOverride = function (writer, characterFormat) {
            writer.writeStartElement(undefined, 'bdo', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 ? this.getBiDirectionalOverride(characterFormat[index_3.bdoProperty[this.keywordIndex]]).toLowerCase() : characterFormat[index_3.bdoProperty[this.keywordIndex]].toLowerCase());
        };
        WordExport.prototype.serializeEditRange = function (writer, editElement) {
            if (editElement.hasOwnProperty(index_3.editableRangeStartProperty[this.keywordIndex])) {
                writer.writeStartElement('w', 'permEnd', this.wNamespace);
            }
            else {
                writer.writeStartElement('w', 'permStart', this.wNamespace);
                if (editElement[index_3.userProperty[this.keywordIndex]] && editElement[index_3.userProperty[this.keywordIndex]] !== '') {
                    writer.writeAttributeString('w', 'ed', this.wNamespace, editElement[index_3.userProperty[this.keywordIndex]]);
                }
                if (editElement[index_3.groupProperty[this.keywordIndex]] && editElement[index_3.groupProperty[this.keywordIndex]] !== '') {
                    writer.writeAttributeString('w', 'edGrp', this.wNamespace, editElement[index_3.groupProperty[this.keywordIndex]].toLowerCase());
                }
                if (editElement[index_3.columnFirstProperty[this.keywordIndex]] && editElement[index_3.columnFirstProperty[this.keywordIndex]] !== -1) {
                    writer.writeAttributeString('w', 'colFirst', this.wNamespace, editElement[index_3.columnFirstProperty[this.keywordIndex]].toString());
                }
                if (editElement[index_3.columnLastProperty[this.keywordIndex]] && editElement[index_3.columnLastProperty[this.keywordIndex]] !== -1) {
                    writer.writeAttributeString('w', 'colLast', this.wNamespace, editElement[index_3.columnLastProperty[this.keywordIndex]].toString());
                }
            }
            writer.writeAttributeString('w', 'id', this.wNamespace, editElement[index_3.editRangeIdProperty[this.keywordIndex]]);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeBookMark = function (writer, bookmark) {
            var bookmarkId = this.getBookmarkId(bookmark[index_3.nameProperty[this.keywordIndex]]);
            var bookmarkName = bookmark[index_3.nameProperty[this.keywordIndex]];
            if (bookmark[index_3.bookmarkTypeProperty[this.keywordIndex]] === 0) {
                writer.writeStartElement('w', 'bookmarkStart', this.wNamespace);
                writer.writeAttributeString('w', 'name', this.wNamespace, bookmarkName);
                if (!ej2_base_1.isNullOrUndefined(bookmark[index_3.propertiesProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'colFirst', this.wNamespace, bookmark[index_3.propertiesProperty[this.keywordIndex]][index_3.columnFirstProperty[this.keywordIndex]].toString());
                    writer.writeAttributeString('w', 'colLast', this.wNamespace, bookmark[index_3.propertiesProperty[this.keywordIndex]][index_3.columnLastProperty[this.keywordIndex]].toString());
                }
            }
            else if (bookmark[index_3.bookmarkTypeProperty[this.keywordIndex]] === 1) {
                if (!ej2_base_1.isNullOrUndefined(bookmark[index_3.propertiesProperty[this.keywordIndex]]) && !this.isBookmarkAtEnd && !this.isBookmarkAtRowEnd) {
                    if (index_1.HelperMethods.parseBoolValue(bookmark[index_3.propertiesProperty[this.keywordIndex]][index_3.isAfterParagraphMarkProperty[this.keywordIndex]])) {
                        writer.writeEndElement();
                        this.isBookmarkAtEnd = true;
                    }
                    else if (index_1.HelperMethods.parseBoolValue(bookmark[index_3.propertiesProperty[this.keywordIndex]][index_3.isAfterRowMarkProperty[this.keywordIndex]])) {
                        writer.writeEndElement();
                        writer.writeEndElement();
                        writer.writeEndElement();
                        this.isBookmarkAtRowEnd = true;
                    }
                }
                writer.writeStartElement('w', 'bookmarkEnd', this.wNamespace);
            }
            writer.writeAttributeString('w', 'id', this.wNamespace, bookmarkId.toString());
            writer.writeEndElement();
        };
        WordExport.prototype.getBookmarkId = function (name) {
            var index = this.bookmarks.indexOf(name);
            if (index < 0) {
                index = this.bookmarks.length;
                this.bookmarks.push(name);
            }
            return index;
        };
        WordExport.prototype.serializePicture = function (writer, image) {
            if (image[index_3.widthProperty[this.keywordIndex]] >= 0 && image[index_3.heightProperty[this.keywordIndex]] >= 0) {
                writer.writeStartElement(undefined, 'r', this.wNamespace);
                this.serializeCharacterFormat(writer, image[index_3.characterFormatProperty[this.keywordIndex]]);
                this.serializeDrawing(writer, image);
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeShape = function (writer, item) {
            if (item[index_3.widthProperty[this.keywordIndex]] >= 0 && item[index_3.heightProperty[this.keywordIndex]] >= 0) {
                writer.writeStartElement(undefined, 'r', this.wNamespace);
                this.serializeCharacterFormat(writer, item[index_3.characterFormatProperty[this.keywordIndex]]);
                if (item[index_3.horizontalRuleProperty[this.keywordIndex]] > 0) {
                    this.serializeHorizontalRule(writer, item);
                }
                else {
                    this.serializeDrawing(writer, item);
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeHorizontalRule = function (writer, shape) {
            writer.writeStartElement(undefined, 'pict', this.wNamespace);
            writer.writeStartElement('v', 'rect', undefined);
            var cx = Math.round(shape[index_3.widthProperty[this.keywordIndex]]);
            var cy = Math.round(shape[index_3.heightProperty[this.keywordIndex]]);
            writer.writeAttributeString(undefined, 'style', undefined, 'width:' + cx.toString() + ';height:' + cy.toString());
            if (shape[index_3.horizontalAlignmentProperty[this.keywordIndex]] > 0) {
                var horAlig = this.keywordIndex == 1 ? this.getShapeHorizontalAlignment(shape[index_3.horizontalAlignmentProperty[this.keywordIndex]]) : shape[index_3.horizontalAlignmentProperty[this.keywordIndex]].toString();
                writer.writeAttributeString('o', 'hralign', undefined, horAlig.toLowerCase());
            }
            writer.writeAttributeString('o', 'hrstd', undefined, 't');
            writer.writeAttributeString('o', 'hr', undefined, 't');
            writer.writeAttributeString(undefined, 'fillcolor', undefined, this.getColor(shape[index_3.fillFormatProperty[this.keywordIndex]][index_3.colorProperty[this.keywordIndex]]));
            writer.writeAttributeString(undefined, 'stroked', undefined, 'f');
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeDrawing = function (writer, draw) {
            writer.writeStartElement(undefined, 'drawing', this.wNamespace);
            if (draw.hasOwnProperty(index_3.chartTypeProperty[this.keywordIndex])) {
                this.serializeInlineCharts(writer, draw);
            }
            else {
                if (draw[index_3.textWrappingStyleProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Inline')) {
                    this.serializeInlinePictureAndShape(writer, draw);
                }
                else {
                    this.serializeWrappingPictureAndShape(writer, draw);
                }
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeWrappingPictureAndShape = function (writer, picture) {
            if (!ej2_base_1.isNullOrUndefined(this.document.optimizeSfdt)) {
                this.keywordIndex = this.document.optimizeSfdt ? 1 : 0;
            }
            writer.writeStartElement('wp', 'anchor', this.wpNamespace);
            this.serializePictureAndShapeDistance(writer, picture);
            writer.writeAttributeString(undefined, 'simplePos', undefined, '0');
            writer.writeAttributeString(undefined, 'relativeHeight', undefined, picture[index_3.zOrderPositionProperty[this.keywordIndex]] ? Math.abs(picture[index_3.zOrderPositionProperty[this.keywordIndex]]).toString() : '0');
            var behindText = (picture[index_3.textWrappingStyleProperty[this.keywordIndex]] && picture[index_3.textWrappingStyleProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 4 : 'Behind'));
            writer.writeAttributeString(undefined, 'behindDoc', undefined, behindText ? '1' : '0');
            var lockAnchor = this.keywordIndex == 1 ? !ej2_base_1.isNullOrUndefined(picture[index_3.lockAnchorProperty[this.keywordIndex]]) ? picture[index_3.lockAnchorProperty[this.keywordIndex]].toString() : '0' : (picture[index_3.lockAnchorProperty[this.keywordIndex]]) ? '1' : '0';
            writer.writeAttributeString(undefined, 'locked', undefined, lockAnchor);
            var layoutcell = this.keywordIndex == 1 ? !ej2_base_1.isNullOrUndefined(picture[index_3.layoutInCellProperty[this.keywordIndex]]) ? picture[index_3.layoutInCellProperty[this.keywordIndex]].toString() : '0' : (picture[index_3.layoutInCellProperty[this.keywordIndex]]) ? '1' : '0';
            writer.writeAttributeString(undefined, 'layoutInCell', undefined, layoutcell);
            var allowOverlap = this.keywordIndex == 1 ? !ej2_base_1.isNullOrUndefined(picture[index_3.allowOverlapProperty[this.keywordIndex]]) ? picture[index_3.allowOverlapProperty[this.keywordIndex]].toString() : '0' : (picture[index_3.allowOverlapProperty[this.keywordIndex]]) ? '1' : '0';
            writer.writeAttributeString(undefined, 'allowOverlap', undefined, allowOverlap);
            writer.writeStartElement('wp', 'simplePos', this.wpNamespace);
            writer.writeAttributeString(undefined, 'x', undefined, '0');
            writer.writeAttributeString(undefined, 'y', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('wp', 'positionH', this.wpNamespace);
            var horizontalOrigin = this.keywordIndex == 1 ? this.getHorizontalOrigin(picture[index_3.horizontalOriginProperty[this.keywordIndex]]) : picture[index_3.horizontalOriginProperty[this.keywordIndex]].toString();
            writer.writeAttributeString(undefined, 'relativeFrom', undefined, index_1.HelperMethods.formatText("firstlower", horizontalOrigin));
            if (picture[index_3.horizontalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'None')) {
                writer.writeStartElement('wp', 'posOffset', this.wpNamespace);
                var horPos = Math.round(picture[index_3.horizontalPositionProperty[this.keywordIndex]] * this.emusPerPoint);
                writer.writeString(horPos.toString());
                writer.writeEndElement();
            }
            else {
                writer.writeStartElement('wp', 'align', this.wpNamespace);
                var horAlig = this.keywordIndex == 1 ? this.getShapeHorizontalAlignment(picture[index_3.horizontalAlignmentProperty[this.keywordIndex]]) : picture[index_3.horizontalAlignmentProperty[this.keywordIndex]].toString();
                writer.writeString(horAlig.toLowerCase());
                writer.writeEndElement();
            }
            writer.writeEndElement();
            writer.writeStartElement('wp', 'positionV', this.wpNamespace);
            var verticalOrigin = this.keywordIndex == 1 ? this.getVerticalOrigin(picture[index_3.verticalOriginProperty[this.keywordIndex]]) : picture[index_3.verticalOriginProperty[this.keywordIndex]].toString();
            writer.writeAttributeString(undefined, 'relativeFrom', undefined, index_1.HelperMethods.formatText("firstlower", verticalOrigin));
            if (picture[index_3.verticalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'None')) {
                writer.writeStartElement('wp', 'posOffset', this.wpNamespace);
                var vertPos = Math.round(picture[index_3.verticalPositionProperty[this.keywordIndex]] * this.emusPerPoint);
                writer.writeString(vertPos.toString());
                writer.writeEndElement();
            }
            else {
                writer.writeStartElement('wp', 'align', this.wpNamespace);
                var verAlig = this.keywordIndex == 1 ? this.getShapeVerticalAlignment(picture[index_3.verticalAlignmentProperty[this.keywordIndex]]) : picture[index_3.verticalAlignmentProperty[this.keywordIndex]];
                writer.writeString(verAlig.toLowerCase());
                writer.writeEndElement();
            }
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'extent', this.wpNamespace);
            var cx = Math.round(picture[index_3.widthProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
            var cy = Math.round(picture[index_3.heightProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
            writer.writeEndElement();
            if (!ej2_base_1.isNullOrUndefined(picture[index_3.imageStringProperty[this.keywordIndex]])) {
                this.serializeShapeWrapStyle(writer, picture);
                this.serializeDrawingGraphics(writer, picture);
            }
            else {
                this.serializeShapeDrawingGraphics(writer, picture);
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeInlinePictureAndShape = function (writer, draw) {
            writer.writeStartElement(undefined, 'inline', this.wpNamespace);
            this.writeDefaultDistAttribute(writer);
            writer.writeStartElement(undefined, 'extent', this.wpNamespace);
            var cx = Math.round(draw[index_3.widthProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
            var cy = Math.round(draw[index_3.heightProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
            writer.writeEndElement();
            if (!ej2_base_1.isNullOrUndefined(draw[index_3.imageStringProperty[this.keywordIndex]])) {
                this.serializeShapeWrapStyle(writer, draw);
                this.serializeDrawingGraphics(writer, draw);
            }
            else {
                this.serializeShapeDrawingGraphics(writer, draw);
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializePictureAndShapeDistance = function (writer, draw) {
            var top = draw[index_3.distanceTopProperty[this.keywordIndex]] ? Math.round(draw[index_3.distanceTopProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '0';
            writer.writeAttributeString(undefined, 'distT', undefined, top);
            var bottom = draw[index_3.distanceBottomProperty[this.keywordIndex]] ? Math.round(draw[index_3.distanceBottomProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '0';
            writer.writeAttributeString(undefined, 'distB', undefined, bottom);
            var left = draw[index_3.distanceLeftProperty[this.keywordIndex]] ? Math.round(draw[index_3.distanceLeftProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '114300';
            writer.writeAttributeString(undefined, 'distL', undefined, left);
            var right = draw[index_3.distanceRightProperty[this.keywordIndex]] ? Math.round(draw[index_3.distanceRightProperty[this.keywordIndex]] * this.emusPerPoint).toString() : '114300';
            writer.writeAttributeString(undefined, 'distR', undefined, right);
        };
        WordExport.prototype.writeDefaultDistAttribute = function (writer) {
            writer.writeAttributeString(undefined, 'distT', undefined, '0');
            writer.writeAttributeString(undefined, 'distB', undefined, '0');
            writer.writeAttributeString(undefined, 'distL', undefined, '0');
            writer.writeAttributeString(undefined, 'distR', undefined, '0');
        };
        WordExport.prototype.serializeInlineCharts = function (writer, item) {
            writer.writeStartElement(undefined, 'inline', this.wpNamespace);
            this.writeDefaultDistAttribute(writer);
            writer.writeStartElement(undefined, 'extent', this.wpNamespace);
            var cx = Math.round(item[index_3.widthProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
            var cy = Math.round(item[index_3.heightProperty[this.keywordIndex]] * this.emusPerPoint);
            writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'effectExtent', this.wpNamespace);
            writer.writeAttributeString(undefined, 'l', undefined, '0');
            writer.writeAttributeString(undefined, 't', undefined, '0');
            writer.writeAttributeString(undefined, 'r', undefined, '0');
            writer.writeAttributeString(undefined, 'b', undefined, '0');
            writer.writeEndElement();
            this.serializeDrawingGraphicsChart(writer, item);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeDrawingGraphicsChart = function (writer, chart) {
            var id = '';
            id = this.updatechartId(chart);
            writer.writeStartElement('wp', 'docPr', this.wpNamespace);
            writer.writeAttributeString(undefined, 'id', undefined, (this.mDocPrID++).toString());
            writer.writeAttributeString(undefined, 'name', undefined, this.getNextChartName());
            writer.writeEndElement();
            writer.writeStartElement('wp', 'cNvGraphicFramePr', this.wpNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'graphic', this.aNamespace);
            writer.writeStartElement('a', 'graphicData', this.aNamespace);
            writer.writeAttributeString(undefined, 'uri', undefined, this.chartNamespace);
            writer.writeStartElement('c', 'chart', this.chartNamespace);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('r', 'id', undefined, id);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.getBase64ImageString = function (image) {
            var base64ImageString = !ej2_base_1.isNullOrUndefined(image[index_3.metaFileImageStringProperty[this.keywordIndex]]) ? this.mImages.get(parseInt(image[index_3.metaFileImageStringProperty[this.keywordIndex]])) : this.mImages.get(parseInt(image[index_3.imageStringProperty[this.keywordIndex]]));
            var imageString = base64ImageString[index_1.HelperMethods.parseBoolValue(image[index_3.isMetaFileProperty[this.keywordIndex]]) ? 1 : 0];
            var index = (this.startsWith(imageString, "https://") || this.startsWith(imageString, "http://") || this.startsWith(imageString, "file://")) ? 1 : 0;
            var metaFileImageString = base64ImageString[index];
            return { imageString: imageString, metaFileImageString: metaFileImageString };
        };
        WordExport.prototype.getNextChartName = function () {
            return 'Chart' + (++this.chartCount);
        };
        WordExport.prototype.serializeChart = function (writer, chart) {
            writer.writeStartElement('w', 'r', this.wNamespace);
            this.serializeCharacterFormat(writer, chart[index_3.characterFormatProperty[this.keywordIndex]]);
            this.serializeDrawing(writer, chart);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartStructure = function () {
            this.serializeChartXML();
            this.serializeChartColors();
            this.serializeChartExcelData();
            this.serializeChartRelations();
            this.chart = undefined;
            this.saveExcel();
        };
        WordExport.prototype.serializeChartXML = function () {
            var chartPath = '';
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('c', 'chartSpace', this.chartNamespace);
            writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('xmlns', 'c16r2', undefined, this.c15Namespace);
            this.serializeChartData(writer, this.chart);
            writer.writeStartElement('c', 'externalData', this.chartNamespace);
            writer.writeAttributeString('r', 'id', undefined, 'rId1');
            writer.writeStartElement('c', 'autoUpdate', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            chartPath = this.chartPath + '/chart' + this.chartCount + '.xml';
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, chartPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeChartColors = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            var colorPath = '';
            writer.writeStartElement('cs', 'colorStyle', this.csNamespace);
            writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
            writer.writeAttributeString(undefined, 'meth', undefined, 'cycle');
            writer.writeAttributeString(undefined, 'id', undefined, '10');
            this.serializeChartColor(writer);
            colorPath = this.chartPath + '/colors' + this.chartCount + '.xml';
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, colorPath);
            this.mArchive.addItem(zipArchiveItem);
            colorPath = '';
        };
        WordExport.prototype.serializeChartColor = function (writer) {
            for (var i = 1; i <= 6; i++) {
                writer.writeStartElement('a', 'schemeClr', this.aNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'accent' + i);
                writer.writeEndElement();
            }
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '60000');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '80000');
            writer.writeEndElement();
            writer.writeStartElement('a', 'lumOff', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '20000');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '80000');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '60000');
            writer.writeEndElement();
            writer.writeStartElement('a', 'lumOff', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '40000');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '50000');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '70000');
            writer.writeEndElement();
            writer.writeStartElement('a', 'lumOff', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '30000');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '70000');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('cs', 'variation', this.csNamespace);
            writer.writeStartElement('a', 'lumMod', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '50000');
            writer.writeEndElement();
            writer.writeStartElement('a', 'lumOff', this.aNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '50000');
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartExcelData = function () {
            if (ej2_base_1.isNullOrUndefined(this.excelFiles)) {
                this.excelFiles = new index_2.Dictionary();
            }
            this.mArchiveExcel = new ej2_compression_1.ZipArchive();
            this.mArchiveExcel.compressionLevel = 'Normal';
            var type = this.chart[index_3.chartTypeProperty[this.keywordIndex]];
            var isScatterType = (type === 'Scatter_Markers' || type === 'Bubble');
            this.serializeWorkBook();
            this.serializeSharedString(isScatterType);
            this.serializeExcelContentTypes();
            this.serializeExcelData(isScatterType);
            this.serializeExcelStyles();
            this.serializeExcelRelation();
            this.serializeExcelGeneralRelations();
            this.chartStringCount = 0;
        };
        WordExport.prototype.serializeWorkBook = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            var workbookPath = 'xl/workbook.xml';
            this.resetExcelRelationShipId();
            writer.writeStartElement(undefined, 'workbook', undefined);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
            writer.writeStartElement(undefined, 'sheets', undefined);
            writer.writeStartElement(undefined, 'sheet', undefined);
            writer.writeAttributeString(undefined, 'name', undefined, 'Sheet1');
            writer.writeAttributeString(undefined, 'sheetId', undefined, '1');
            writer.writeAttributeString('r', 'id', undefined, this.getNextExcelRelationShipID());
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, workbookPath);
            this.mArchiveExcel.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeExcelStyles = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            var stylePath = 'xl/styles.xml';
            writer.writeStartElement(undefined, 'styleSheet', undefined);
            writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
            writer.writeAttributeString('mc', 'Ignorable', undefined, 'x14ac');
            writer.writeAttributeString('xmlns', 'x14ac', undefined, 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac');
            writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, stylePath);
            this.mArchiveExcel.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeExcelData = function (isScatterType) {
            var sheetPath = '';
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement(undefined, 'worksheet', undefined);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('xmlns', 'x14', undefined, this.spreadSheet9);
            writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
            writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
            this.serializeExcelSheet(writer, isScatterType);
            writer.writeEndElement();
            sheetPath = 'xl/worksheets' + '/sheet1.xml';
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, sheetPath);
            this.mArchiveExcel.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeSharedString = function (isScatterType) {
            var chart = this.chart;
            var writer = new ej2_file_utils_1.XmlWriter();
            var sharedStringPath = '';
            var chartSharedString = [];
            var type = this.chart[index_3.chartTypeProperty[this.keywordIndex]];
            var seriesLength = chart[index_3.chartSeriesProperty[this.keywordIndex]].length;
            for (var column = 0; column < seriesLength; column++) {
                var series = chart[index_3.chartSeriesProperty[this.keywordIndex]][column];
                var seriesName = series[index_3.seriesNameProperty[this.keywordIndex]];
                var isString = seriesName.match(/[a-z]/i);
                if (isScatterType && column === 0) {
                    chartSharedString.push('X-Values');
                }
                if (isString) {
                    chartSharedString.push(series[index_3.seriesNameProperty[this.keywordIndex]]);
                    this.chartStringCount++;
                }
            }
            if (type === 'Bubble') {
                chartSharedString.push('Size');
            }
            for (var row = 0; row < chart[index_3.chartCategoryProperty[this.keywordIndex]].length; row++) {
                var category = chart[index_3.chartCategoryProperty[this.keywordIndex]][row];
                var format = chart[index_3.chartPrimaryCategoryAxisProperty[this.keywordIndex]][index_3.numberFormatProperty[this.keywordIndex]];
                var categoryName = category[index_3.categoryXNameProperty[this.keywordIndex]];
                var isString = categoryName.match(/[a-z]/i);
                if (isString || format === 'm/d/yyyy') {
                    chartSharedString.push(category[index_3.categoryXNameProperty[this.keywordIndex]]);
                    this.chartStringCount++;
                }
            }
            var uniqueCount = this.chartStringCount + 1;
            writer.writeStartElement(undefined, 'sst', undefined);
            writer.writeAttributeString('xmlns', undefined, undefined, this.spreadSheetNamespace);
            writer.writeAttributeString(undefined, 'count', undefined, uniqueCount.toString());
            writer.writeAttributeString(undefined, 'uniqueCount', undefined, uniqueCount.toString());
            for (var i = 0; i <= chartSharedString.length; i++) {
                writer.writeStartElement(undefined, 'si', undefined);
                writer.writeStartElement(undefined, 't', undefined);
                if (i !== chartSharedString.length) {
                    writer.writeString(chartSharedString[i]);
                }
                else if (!isScatterType) {
                    writer.writeAttributeString('xml', 'space', this.xmlNamespace, 'preserve');
                    writer.writeString(' ');
                }
                writer.writeEndElement();
                writer.writeEndElement();
            }
            writer.writeEndElement();
            sharedStringPath = 'xl/sharedStrings' + '.xml';
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, sharedStringPath);
            this.mArchiveExcel.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeExcelSheet = function (writer, isScatterType) {
            var chart = this.chart;
            var type = 's';
            var isBubbleType = (chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Bubble');
            var bubbleLength;
            var categoryLength = chart[index_3.chartCategoryProperty[this.keywordIndex]].length + 1;
            var format = chart[index_3.chartPrimaryCategoryAxisProperty[this.keywordIndex]][index_3.numberFormatProperty[this.keywordIndex]];
            var seriesLength = chart[index_3.chartSeriesProperty[this.keywordIndex]].length + 1;
            if (isBubbleType) {
                bubbleLength = seriesLength;
                seriesLength = seriesLength + 1;
            }
            var category = undefined;
            var series = undefined;
            var count = 0;
            writer.writeStartElement(undefined, 'sheetData', undefined);
            for (var row = 0; row < categoryLength; row++) {
                writer.writeStartElement(undefined, 'row', undefined);
                writer.writeAttributeString(undefined, 'r', undefined, (row + 1).toString());
                for (var column = 0; column < seriesLength; column++) {
                    var alphaNumeric = String.fromCharCode('A'.charCodeAt(0) + column) + (row + 1).toString();
                    writer.writeStartElement(undefined, 'c', undefined);
                    writer.writeAttributeString(undefined, 'r', undefined, alphaNumeric);
                    if (row !== 0 && column === 0) {
                        category = chart[index_3.chartCategoryProperty[this.keywordIndex]][row - 1];
                        var categoryName = category[index_3.categoryXNameProperty[this.keywordIndex]];
                        var isString = categoryName.match(/[a-z]/i);
                        if (ej2_base_1.isNullOrUndefined(isString) && format === 'm/d/yyyy') {
                            type = 's';
                        }
                        else if (!isString || isScatterType) {
                            type = 'n';
                        }
                        else {
                            type = 's';
                        }
                    }
                    else if (row === 0 && column !== 0 && column !== (bubbleLength)) {
                        series = chart[index_3.chartSeriesProperty[this.keywordIndex]][column - 1];
                        var seriesName = series[index_3.seriesNameProperty[this.keywordIndex]];
                        var isString = seriesName.match(/[a-z]/i);
                        if (!isString) {
                            type = 'n';
                        }
                        else {
                            type = 's';
                        }
                    }
                    else if (row === 0 && isBubbleType && column === (bubbleLength)) {
                        type = 's';
                    }
                    else if (row === 0 && column === 0) {
                        type = 's';
                    }
                    else {
                        type = 'n';
                    }
                    writer.writeAttributeString(undefined, 't', undefined, type);
                    writer.writeStartElement(undefined, 'v', undefined);
                    if (row === 0 && column === 0 && !isScatterType) {
                        writer.writeString(this.chartStringCount.toString());
                    }
                    else if (type === 's' && count < this.chartStringCount) {
                        writer.writeString(count.toString());
                        count++;
                    }
                    else if (row !== 0 && type !== 's' && column === 0 && column !== (bubbleLength)) {
                        writer.writeString(category[index_3.categoryXNameProperty[this.keywordIndex]]);
                    }
                    else if (column !== 0 && type !== 's' && row === 0 && column !== (bubbleLength)) {
                        writer.writeString(series[index_3.seriesNameProperty[this.keywordIndex]]);
                    }
                    else if (column !== 0 && column !== (bubbleLength)) {
                        var data = category[index_3.chartDataProperty[this.keywordIndex]][column - 1];
                        var yValue = data[index_3.yValueProperty[this.keywordIndex]];
                        writer.writeString(yValue.toString());
                    }
                    else if (isBubbleType && column === (bubbleLength)) {
                        var data = category[index_3.chartDataProperty[this.keywordIndex]][column - 2];
                        var size = data[index_3.sizeProperty[this.keywordIndex]];
                        writer.writeString(size.toString());
                    }
                    writer.writeEndElement();
                    writer.writeEndElement();
                    type = '';
                }
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeExcelContentTypes = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement(undefined, 'Types', 'http://schemas.openxmlformats.org/package/2006/content-types');
            this.serializeDefaultContentType(writer, 'xml', this.xmlContentType);
            this.serializeDefaultContentType(writer, 'rels', this.relationContentType);
            this.serializeOverrideContentType(writer, 'xl/styles.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml');
            this.serializeOverrideContentType(writer, 'xl/workbook.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml');
            this.serializeOverrideContentType(writer, 'xl/sharedStrings.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml');
            this.serializeOverrideContentType(writer, 'xl/worksheets/sheet1.xml', 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml');
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.contentTypesPath);
            this.mArchiveExcel.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeExcelRelation = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            this.resetExcelRelationShipId();
            var worksheetType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet';
            var sharedStringType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings';
            writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
            this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), worksheetType, 'worksheets/sheet1.xml');
            this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), this.stylesRelType, 'styles.xml');
            this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), sharedStringType, 'sharedStrings.xml');
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.excelRelationPath);
            this.mArchiveExcel.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeExcelGeneralRelations = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            this.resetExcelRelationShipId();
            writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
            this.serializeRelationShip(writer, this.getNextExcelRelationShipID(), this.documentRelType, 'xl/workbook.xml');
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.generalRelationPath);
            this.mArchiveExcel.addItem(zipArchiveItem);
        };
        WordExport.prototype.getNextExcelRelationShipID = function () {
            return 'rId' + (++this.eRelationShipId);
        };
        WordExport.prototype.getNextChartRelationShipID = function () {
            return 'rId' + (++this.cRelationShipId);
        };
        WordExport.prototype.serializeChartData = function (writer, chart) {
            writer.writeStartElement('c', 'date1904', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'lang', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'en-US');
            writer.writeEndElement();
            writer.writeStartElement('c', 'roundedCorners', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('mc', 'AlternateContent', this.veNamespace);
            writer.writeStartElement('mc', 'Choice', this.veNamespace);
            writer.writeAttributeString('xmlns', 'c14', undefined, this.c7Namespace);
            writer.writeAttributeString(undefined, 'Requires', undefined, 'c14');
            writer.writeStartElement('c14', 'style', undefined);
            writer.writeAttributeString(undefined, 'val', undefined, '102');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('mc', 'Fallback', this.veNamespace);
            writer.writeStartElement('c', 'style', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '2');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('c', 'chart', this.chartNamespace);
            if (!ej2_base_1.isNullOrUndefined(this.chart[index_3.chartTitleProperty[this.keywordIndex]])) {
                writer.writeStartElement('c', 'title', this.chartNamespace);
                this.serializeTextProperties(writer, this.chart[index_3.chartTitleAreaProperty[this.keywordIndex]], this.chart[index_3.chartTitleProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            this.serializeChartPlotArea(writer, chart);
            writer.writeEndElement();
            this.serializeShapeProperties(writer, 'D9D9D9', true);
            writer.writeStartElement('c', 'txPr', this.chartNamespace);
            writer.writeAttributeString('xmlns', 'c', undefined, this.chartNamespace);
            writer.writeStartElement('a', 'bodyPr', this.aNamespace);
            writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'lstStyle', this.aNamespace);
            writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'p', this.aNamespace);
            writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
            writer.writeStartElement('a', 'pPr', this.aNamespace);
            writer.writeStartElement('a', 'defRPr', this.aNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('a', 'endParaRPr', this.aNamespace);
            writer.writeAttributeString(undefined, 'lang', undefined, 'en-US');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartPlotArea = function (writer, chart) {
            writer.writeStartElement('c', 'autoTitleDeleted', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'plotArea', this.chartNamespace);
            writer.writeStartElement('c', 'layout', this.chartNamespace);
            writer.writeEndElement();
            var serializationChartType = this.chartType(chart);
            var isPieTypeSerialization = (serializationChartType === 'pieChart' || serializationChartType === 'doughnutChart');
            var isScatterType = (serializationChartType === 'scatterChart' || serializationChartType === 'bubbleChart');
            writer.writeStartElement('c', serializationChartType, this.chartNamespace);
            if (serializationChartType === 'barChart') {
                var barDiv = '';
                if (chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Column_Clustered' || chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Column_Stacked'
                    || chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Column_Stacked_100') {
                    barDiv = 'col';
                }
                else {
                    barDiv = 'bar';
                }
                writer.writeStartElement('c', 'barDir', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, barDiv);
                writer.writeEndElement();
            }
            if (!isPieTypeSerialization && !isScatterType) {
                var grouping = this.chartGrouping(chart[index_3.chartTypeProperty[this.keywordIndex]]);
                writer.writeStartElement('c', 'grouping', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, grouping);
                writer.writeEndElement();
            }
            if (serializationChartType === 'scatterChart') {
                writer.writeStartElement('c', 'scatterStyle', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'marker');
                writer.writeEndElement();
            }
            writer.writeStartElement('c', 'varyColors', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            var valueSheet = '';
            for (var i = 0; i < chart[index_3.chartSeriesProperty[this.keywordIndex]].length; i++) {
                var series = chart[index_3.chartSeriesProperty[this.keywordIndex]][i];
                this.seriesCount = i;
                writer.writeStartElement('c', 'ser', this.chartNamespace);
                writer.writeStartElement('c', 'idx', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, i.toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'order', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, i.toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'tx', this.chartNamespace);
                writer.writeStartElement('c', 'strRef', this.chartNamespace);
                writer.writeStartElement('c', 'f', this.chartNamespace);
                var alphaNumeric = String.fromCharCode('B'.charCodeAt(0) + i);
                valueSheet = 'Sheet1!$' + alphaNumeric;
                writer.writeString(valueSheet + '$1');
                valueSheet = valueSheet + '$2:$' + alphaNumeric + '$';
                writer.writeEndElement();
                writer.writeStartElement('c', 'strCache', this.chartNamespace);
                writer.writeStartElement('c', 'ptCount', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '1');
                writer.writeEndElement();
                writer.writeStartElement('c', 'pt', this.chartNamespace);
                writer.writeAttributeString(undefined, 'idx', undefined, '0');
                writer.writeStartElement('c', 'v', this.chartNamespace);
                writer.writeString(series[index_3.seriesNameProperty[this.keywordIndex]]);
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeEndElement();
                if (chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Pie' || chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Doughnut') {
                    this.parseChartDataPoint(writer, series);
                    writer.writeStartElement('c', 'explosion', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'val', undefined, '0');
                    writer.writeEndElement();
                }
                else if (!isScatterType) {
                    this.parseChartSeriesColor(writer, series[index_3.dataPointsProperty[this.keywordIndex]], serializationChartType);
                }
                if (serializationChartType === 'scatterChart') {
                    var fillColor = series[index_3.dataPointsProperty[this.keywordIndex]][0][index_3.fillProperty[this.keywordIndex]][index_3.foreColorProperty[this.keywordIndex]];
                    writer.writeStartElement('c', 'marker', this.chartNamespace);
                    writer.writeStartElement('c', 'symbol', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'val', undefined, 'circle');
                    writer.writeEndElement();
                    writer.writeStartElement('c', 'size', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'val', undefined, '5');
                    writer.writeEndElement();
                    this.serializeShapeProperties(writer, fillColor, false);
                    writer.writeEndElement();
                }
                if (series[index_3.dataLabelProperty[this.keywordIndex]]) {
                    this.parseChartDataLabels(writer, series[index_3.dataLabelProperty[this.keywordIndex]]);
                }
                if (series[index_3.trendLinesProperty[this.keywordIndex]]) {
                    this.parseChartTrendLines(writer, series);
                }
                if (series[index_3.errorBarProperty[this.keywordIndex]]) {
                    this.serializeChartErrorBar(writer, series);
                }
                if (serializationChartType === 'scatterChart') {
                    this.serializeDefaultShapeProperties(writer);
                }
                else if (serializationChartType === 'bubbleChart') {
                    this.serializeShapeProperties(writer, series[index_3.dataPointsProperty[this.keywordIndex]][i][index_3.fillProperty[this.keywordIndex]][index_3.foreColorProperty[this.keywordIndex]], false);
                }
                var categoryType = 'cat';
                var categoryRef = 'strRef';
                var cacheType = 'strCache';
                if (serializationChartType === 'scatterChart') {
                    categoryType = 'xVal';
                    categoryRef = 'numRef';
                    cacheType = 'numCache';
                }
                writer.writeStartElement('c', categoryType, this.chartNamespace);
                writer.writeStartElement('c', categoryRef, this.chartNamespace);
                this.serializeChartCategory(writer, chart, cacheType);
                writer.writeEndElement();
                writer.writeEndElement();
                this.serializeChartValue(writer, valueSheet, serializationChartType);
                writer.writeEndElement();
            }
            writer.writeStartElement('c', 'dLbls', this.chartNamespace);
            if (isPieTypeSerialization) {
                writer.writeStartElement('c', 'dLblPos', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'bestFit');
                writer.writeEndElement();
            }
            writer.writeStartElement('c', 'showLegendKey', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'showVal', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'showCatName', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'showSerName', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'showPercent', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'showBubbleSize', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'showLeaderLines', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '1');
            writer.writeEndElement();
            writer.writeEndElement();
            if (isPieTypeSerialization) {
                var series = this.chart[index_3.chartSeriesProperty[this.keywordIndex]][0];
                var sliceAngle = 0;
                var holeSize = 0;
                if (series.hasOwnProperty(index_3.firstSliceAngleProperty[this.keywordIndex])) {
                    sliceAngle = series[index_3.firstSliceAngleProperty[this.keywordIndex]];
                }
                writer.writeStartElement('c', 'firstSliceAng', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, sliceAngle.toString());
                writer.writeEndElement();
                if (chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Doughnut') {
                    holeSize = series[index_3.holeSizeProperty[this.keywordIndex]];
                    writer.writeStartElement('c', 'holeSize', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'val', undefined, holeSize.toString());
                    writer.writeEndElement();
                }
            }
            if (serializationChartType !== 'lineChart' && !isScatterType) {
                writer.writeStartElement('c', 'gapWidth', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, this.chart[index_3.gapWidthProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'overlap', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, this.chart[index_3.overlapProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
            }
            else if (serializationChartType !== 'bubbleChart') {
                writer.writeStartElement('c', 'smooth', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '0');
                writer.writeEndElement();
            }
            if (serializationChartType === 'bubbleChart') {
                writer.writeStartElement('c', 'sizeRepresents', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'area');
                writer.writeEndElement();
            }
            var type = this.chart[index_3.chartTypeProperty[this.keywordIndex]];
            if (!isPieTypeSerialization) {
                writer.writeStartElement('c', 'axId', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '335265000');
                writer.writeEndElement();
                writer.writeStartElement('c', 'axId', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '335263360');
                writer.writeEndElement();
            }
            writer.writeEndElement();
            var isStackedPercentage = (type === 'Column_Stacked_100' || type === 'Area_Stacked_100' ||
                type === 'Bar_Stacked_100' || type === 'Line_Stacked_100' || type === 'Line_Markers_Stacked_100');
            var format = this.chart[index_3.chartPrimaryCategoryAxisProperty[this.keywordIndex]][index_3.chartTypeProperty[this.keywordIndex]];
            if (!isPieTypeSerialization) {
                this.serializeCategoryAxis(writer, format, isStackedPercentage);
                this.serializeValueAxis(writer, format, isStackedPercentage);
            }
            if (this.chart.hasOwnProperty(index_3.chartDataTableProperty[this.keywordIndex])) {
                var dataTable = this.chart[index_3.chartDataTableProperty[this.keywordIndex]];
                var showHorzBorder = 0;
                var showVertBorder = 0;
                var showOutline = 0;
                var showKeys = 0;
                if (index_1.HelperMethods.parseBoolValue(dataTable[index_3.showSeriesKeysProperty[this.keywordIndex]])) {
                    showKeys = 1;
                }
                if (index_1.HelperMethods.parseBoolValue(dataTable[index_3.hasHorizontalBorderProperty[this.keywordIndex]])) {
                    showHorzBorder = 1;
                }
                if (index_1.HelperMethods.parseBoolValue(dataTable[index_3.hasVerticalBorderProperty[this.keywordIndex]])) {
                    showVertBorder = 1;
                }
                if (index_1.HelperMethods.parseBoolValue(dataTable[index_3.hasBordersProperty[this.keywordIndex]])) {
                    showOutline = 1;
                }
                writer.writeStartElement('c', 'dTable', this.chartNamespace);
                writer.writeStartElement('c', 'showHorzBorder', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, showHorzBorder.toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'showVertBorder', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, showVertBorder.toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'showOutline', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, showOutline.toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'showKeys', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, showKeys.toString());
                writer.writeEndElement();
                writer.writeEndElement();
            }
            this.serializeDefaultShapeProperties(writer);
            writer.writeEndElement();
            if (!ej2_base_1.isNullOrUndefined(this.chart[index_3.chartLegendProperty[this.keywordIndex]][index_3.positionProperty[this.keywordIndex]])) {
                this.serializeChartLegend(writer);
            }
            writer.writeStartElement('c', 'plotVisOnly', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '1');
            writer.writeEndElement();
            writer.writeStartElement('c', 'dispBlanksAs', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'gap');
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartLegend = function (writer) {
            var legendPosition = this.chartLegendPosition(this.chart[index_3.chartLegendProperty[this.keywordIndex]]);
            var title = this.chart[index_3.chartLegendProperty[this.keywordIndex]][index_3.chartTitleAreaProperty[this.keywordIndex]];
            var fill = title[index_3.dataFormatProperty[this.keywordIndex]][index_3.fillProperty[this.keywordIndex]][index_3.foreColorProperty[this.keywordIndex]];
            writer.writeStartElement('c', 'legend', this.chartNamespace);
            writer.writeStartElement('c', 'legendPos', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, legendPosition);
            writer.writeEndElement();
            writer.writeStartElement('c', 'overlay', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            this.serializeDefaultShapeProperties(writer);
            writer.writeStartElement('c', 'txPr', this.chartNamespace);
            writer.writeStartElement('a', 'bodyPr', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'lstStyle', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'p', this.aNamespace);
            this.serializeChartTitleFont(writer, title[index_3.fontSizeProperty[this.keywordIndex]], fill, title[index_3.fontNameProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartErrorBar = function (writer, series) {
            var errorBar = series[index_3.errorBarProperty[this.keywordIndex]];
            var errorBarValueType = this.errorBarValueType(errorBar[index_3.typeProperty[this.keywordIndex]]);
            var endStyle = 0;
            if (errorBar[index_3.endStyleProperty[this.keywordIndex]] !== 'Cap') {
                endStyle = 1;
            }
            writer.writeStartElement('c', 'errBars', this.chartNamespace);
            writer.writeStartElement('c', 'errBarType', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, errorBar[index_3.directionProperty[this.keywordIndex]].toLowerCase());
            writer.writeEndElement();
            writer.writeStartElement('c', 'errValType', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, errorBarValueType);
            writer.writeEndElement();
            writer.writeStartElement('c', 'noEndCap', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, endStyle.toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'val', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, errorBar[index_3.numberValueProperty[this.keywordIndex]].toString());
            writer.writeEndElement();
            this.serializeShapeProperties(writer, '595959', true);
            writer.writeEndElement();
        };
        WordExport.prototype.errorBarValueType = function (type) {
            var valueType = '';
            switch (type) {
                case 'StandardError':
                    valueType = 'stdErr';
                    break;
                case 'StandardDeviation':
                    valueType = 'stdDev';
                    break;
                case 'Percentage':
                    valueType = 'percentage';
                    break;
                case 'Fixed':
                    valueType = 'fixedVal';
                    break;
                default:
                    valueType = 'stdErr';
                    break;
            }
            return valueType;
        };
        WordExport.prototype.serializeCategoryAxis = function (writer, format, isStackedPercentage) {
            var axisType = 'catAx';
            var formatCode = this.chart[index_3.chartPrimaryCategoryAxisProperty[this.keywordIndex]][index_3.numberFormatProperty[this.keywordIndex]];
            var type = this.chart[index_3.chartTypeProperty[this.keywordIndex]];
            var isScatterType = (type === 'Scatter_Markers' || type === 'Bubble');
            if (format === 'Time') {
                axisType = 'dateAx';
            }
            if (isScatterType) {
                axisType = 'valAx';
            }
            writer.writeStartElement('c', axisType, this.chartNamespace);
            writer.writeStartElement('c', 'axId', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '335265000');
            writer.writeEndElement();
            this.serializeAxis(writer, '335263360', this.chart[index_3.chartPrimaryCategoryAxisProperty[this.keywordIndex]], formatCode, isStackedPercentage);
            if (!isScatterType) {
                writer.writeStartElement('c', 'auto', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '1');
                writer.writeEndElement();
                writer.writeStartElement('c', 'lblAlgn', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'ctr');
                writer.writeEndElement();
                writer.writeStartElement('c', 'lblOffset', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '100');
                writer.writeEndElement();
            }
            if (format === 'Time') {
                writer.writeStartElement('c', 'baseTimeUnit', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'days');
                writer.writeEndElement();
            }
            else if (this.chart[index_3.chartTypeProperty[this.keywordIndex]] !== 'Bubble') {
                writer.writeStartElement('c', 'noMultiLvlLbl', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '0');
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeValueAxis = function (writer, format, isStackedPercentage) {
            var valueAxis = this.chart[index_3.chartPrimaryValueAxisProperty[this.keywordIndex]];
            var crossBetween = 'between';
            if (format === 'Time') {
                crossBetween = 'midCat';
            }
            writer.writeStartElement('c', 'valAx', this.chartNamespace);
            writer.writeStartElement('c', 'axId', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '335263360');
            writer.writeEndElement();
            this.serializeAxis(writer, '335265000', valueAxis, 'General', isStackedPercentage);
            writer.writeStartElement('c', 'crossBetween', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, crossBetween);
            writer.writeEndElement();
            if (valueAxis[index_3.majorUnitProperty[this.keywordIndex]] !== 0 && !isStackedPercentage) {
                writer.writeStartElement('c', 'majorUnit', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, valueAxis[index_3.majorUnitProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeAxis = function (writer, axisID, axis, formatCode, isStackedPercentage) {
            var majorTickMark = 'none';
            var minorTickMark = 'none';
            var tickLabelPosition = 'nextTo';
            writer.writeStartElement('c', 'scaling', this.chartNamespace);
            writer.writeStartElement('c', 'orientation', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'minMax');
            writer.writeEndElement();
            if (axis[index_3.maximumValueProperty[this.keywordIndex]] !== 0 && !isStackedPercentage) {
                writer.writeStartElement('c', 'max', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, axis[index_3.maximumValueProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'min', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, axis[index_3.minimumValueProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
            }
            writer.writeEndElement();
            writer.writeStartElement('c', 'delete', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('c', 'axPos', this.chartNamespace);
            if (axisID === '335265000') {
                writer.writeAttributeString(undefined, 'val', undefined, 'l');
            }
            else {
                writer.writeAttributeString(undefined, 'val', undefined, 'b');
            }
            writer.writeEndElement();
            if (index_1.HelperMethods.parseBoolValue(axis[index_3.hasMajorGridLinesProperty[this.keywordIndex]])) {
                writer.writeStartElement('c', 'majorGridlines', this.chartNamespace);
                this.serializeShapeProperties(writer, 'D9D9D9', true);
                writer.writeEndElement();
            }
            if (index_1.HelperMethods.parseBoolValue(axis[index_3.hasMinorGridLinesProperty[this.keywordIndex]])) {
                writer.writeStartElement('c', 'minorGridlines', this.chartNamespace);
                this.serializeShapeProperties(writer, 'F2F2F2', true);
                writer.writeEndElement();
            }
            if (axis[index_3.chartTitleProperty[this.keywordIndex]]) {
                writer.writeStartElement('c', 'title', this.chartNamespace);
                this.serializeTextProperties(writer, axis[index_3.chartTitleAreaProperty[this.keywordIndex]], axis[index_3.chartTitleProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            writer.writeStartElement('c', 'numFmt', this.chartNamespace);
            writer.writeAttributeString(undefined, 'formatCode', undefined, formatCode);
            writer.writeAttributeString(undefined, 'sourceLinked', undefined, '1');
            writer.writeEndElement();
            writer.writeStartElement('c', 'majorTickMark', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, majorTickMark);
            writer.writeEndElement();
            writer.writeStartElement('c', 'minorTickMark', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, minorTickMark);
            writer.writeEndElement();
            writer.writeStartElement('c', 'tickLblPos', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, tickLabelPosition);
            writer.writeEndElement();
            if (this.chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Bubble') {
                this.serializeShapeProperties(writer, 'BFBFBF', true);
            }
            else {
                this.serializeDefaultShapeProperties(writer);
            }
            writer.writeStartElement('c', 'txPr', this.chartNamespace);
            writer.writeStartElement('a', 'bodyPr', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'p', this.aNamespace);
            this.serializeChartTitleFont(writer, axis[index_3.fontSizeProperty[this.keywordIndex]], '595959', axis[index_3.fontNameProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('c', 'crossAx', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, axisID);
            writer.writeEndElement();
            writer.writeStartElement('c', 'crosses', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, 'autoZero');
            writer.writeEndElement();
        };
        WordExport.prototype.parseChartTrendLines = function (writer, series) {
            for (var i = 0; i < series[index_3.trendLinesProperty[this.keywordIndex]].length; i++) {
                var data = series[index_3.trendLinesProperty[this.keywordIndex]][i];
                var type = this.chartTrendLineType(data[index_3.typeProperty[this.keywordIndex]]);
                var dispRSqr = 0;
                var dispEq = 0;
                if (index_1.HelperMethods.parseBoolValue(data[index_3.isDisplayEquationProperty[this.keywordIndex]])) {
                    dispEq = 1;
                }
                else if (index_1.HelperMethods.parseBoolValue(data[index_3.isDisplayRSquaredProperty[this.keywordIndex]])) {
                    dispRSqr = 1;
                }
                var solidFill = series[index_3.dataPointsProperty[this.keywordIndex]][i];
                writer.writeStartElement('c', 'trendline', this.chartNamespace);
                writer.writeStartElement('c', 'spPr', this.chartNamespace);
                writer.writeStartElement('a', 'ln', this.aNamespace);
                writer.writeAttributeString(undefined, 'w', undefined, '19050');
                this.serializeChartSolidFill(writer, solidFill[index_3.fillProperty[this.keywordIndex]][index_3.foreColorProperty[this.keywordIndex]], false);
                writer.writeStartElement('a', 'prstDash', this.aNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'sysDot');
                writer.writeEndElement();
                writer.writeStartElement('a', 'round', this.aNamespace);
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeStartElement('c', 'trendlineType', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, type);
                writer.writeEndElement();
                writer.writeStartElement('c', 'forward', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, data[index_3.forwardProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'backward', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, data[index_3.backwardProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
                if (data[index_3.interceptProperty[this.keywordIndex]] !== 'NaN') {
                    writer.writeStartElement('c', 'intercept', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'val', undefined, data[index_3.interceptProperty[this.keywordIndex]].toString());
                    writer.writeEndElement();
                }
                writer.writeStartElement('c', 'dispRSqr', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, dispRSqr.toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'dispEq', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, dispEq.toString());
                writer.writeEndElement();
                writer.writeEndElement();
            }
        };
        WordExport.prototype.chartTrendLineType = function (type) {
            var trendlineType = '';
            switch (type) {
                case 'Linear':
                    trendlineType = 'linear';
                    break;
                case 'Exponential':
                    trendlineType = 'exp';
                    break;
            }
            return trendlineType;
        };
        WordExport.prototype.parseChartDataLabels = function (writer, dataLabels) {
            var position = '';
            var dataLabelPosition = dataLabels[index_3.positionProperty[this.keywordIndex]];
            var isLegendKey = 0;
            var isBubbleSize = 0;
            var isCategoryName = 0;
            var isSeriesName = 0;
            var isValue = 0;
            var isPercentage = 0;
            var isLeaderLines = 0;
            switch (dataLabelPosition) {
                case 'Center':
                    position = 'ctr';
                    break;
                case 'Left':
                    position = 'l';
                    break;
                case 'Right':
                    position = 'r';
                    break;
                case 'Outside':
                    position = 'outEnd';
                    break;
                case 'BestFit':
                    position = 'bestFit';
                    break;
                case 'Bottom':
                case 'OutsideBase':
                    position = 'inBase';
                    break;
                case 'Inside':
                    position = 'inEnd';
                    break;
                case 'Above':
                    position = 't';
                    break;
                case 'Below':
                    position = 'b';
                    break;
                default:
                    position = 'Automatic';
                    break;
            }
            writer.writeStartElement('c', 'dLbls', this.chartNamespace);
            this.serializeDefaultShapeProperties(writer);
            writer.writeStartElement('c', 'txPr', this.chartNamespace);
            writer.writeStartElement('a', 'bodyPr', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'lstStyle', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'p', this.aNamespace);
            this.serializeChartTitleFont(writer, dataLabels[index_3.fontSizeProperty[this.keywordIndex]], dataLabels[index_3.fontColorProperty[this.keywordIndex]], dataLabels[index_3.fontNameProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeEndElement();
            if (index_1.HelperMethods.parseBoolValue(dataLabels[index_3.isLegendKeyProperty[this.keywordIndex]])) {
                isLegendKey = 1;
            }
            else if (index_1.HelperMethods.parseBoolValue(dataLabels[index_3.isBubbleSizeProperty[this.keywordIndex]])) {
                isBubbleSize = 1;
            }
            else if (index_1.HelperMethods.parseBoolValue(dataLabels[index_3.isCategoryNameProperty[this.keywordIndex]])) {
                isCategoryName = 1;
            }
            else if (index_1.HelperMethods.parseBoolValue(dataLabels[index_3.isSeriesNameProperty[this.keywordIndex]])) {
                isSeriesName = 1;
            }
            else if (index_1.HelperMethods.parseBoolValue(dataLabels[index_3.isValueProperty[this.keywordIndex]])) {
                isValue = 1;
            }
            else if (index_1.HelperMethods.parseBoolValue(dataLabels[index_3.isPercentageProperty[this.keywordIndex]])) {
                isPercentage = 1;
            }
            else if (index_1.HelperMethods.parseBoolValue(dataLabels[index_3.isLeaderLinesProperty[this.keywordIndex]])) {
                isLeaderLines = 1;
            }
            if (position !== 'Automatic') {
                writer.writeStartElement('c', 'dLblPos', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, position);
                writer.writeEndElement();
            }
            writer.writeStartElement('c', 'showLegendKey', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, isLegendKey.toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'showVal', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, isValue.toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'showCatName', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, isCategoryName.toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'showSerName', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, isSeriesName.toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'showPercent', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, isPercentage.toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'showBubbleSize', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, isBubbleSize.toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'showLeaderLines', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, isLeaderLines.toString());
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeShapeProperties = function (writer, color, isLine) {
            var chartType = this.chart[index_3.chartTypeProperty[this.keywordIndex]];
            var isScatterType = (chartType === 'Scatter_Markers' || chartType === 'Bubble');
            writer.writeStartElement('c', 'spPr', this.chartNamespace);
            if (!isScatterType || isLine) {
                writer.writeStartElement('a', 'ln', this.aNamespace);
                writer.writeAttributeString(undefined, 'w', undefined, '9525');
                this.serializeChartSolidFill(writer, color, false);
                writer.writeStartElement('a', 'prstDash', this.aNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, 'solid');
                writer.writeEndElement();
                writer.writeStartElement('a', 'round', this.aNamespace);
                writer.writeEndElement();
                writer.writeEndElement();
            }
            else if (chartType === 'Scatter_Markers') {
                this.serializeChartSolidFill(writer, color, false);
                this.serializeDefaultLineProperties(writer);
            }
            else if (chartType === 'Bubble') {
                this.serializeChartSolidFill(writer, color, true);
                this.serializeDefaultLineProperties(writer);
            }
            writer.writeStartElement('a', 'effectLst', this.aNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeDefaultShapeProperties = function (writer) {
            writer.writeStartElement('c', 'spPr', this.chartNamespace);
            writer.writeStartElement('a', 'noFill', this.aNamespace);
            writer.writeEndElement();
            this.serializeDefaultLineProperties(writer);
            writer.writeStartElement('a', 'effectLst', this.aNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeDefaultLineProperties = function (writer) {
            writer.writeStartElement('a', 'ln', this.aNamespace);
            writer.writeStartElement('a', 'noFill', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'round', this.aNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeTextProperties = function (writer, title, chartTitleName) {
            var fill = title[index_3.dataFormatProperty[this.keywordIndex]][index_3.fillProperty[this.keywordIndex]][index_3.foreColorProperty[this.keywordIndex]];
            var fontSize = title[index_3.fontSizeProperty[this.keywordIndex]] * 100;
            writer.writeStartElement('c', 'tx', this.chartNamespace);
            writer.writeStartElement('c', 'rich', this.chartNamespace);
            writer.writeStartElement('a', 'bodyPr', this.aNamespace);
            writer.writeAttributeString(undefined, 'rot', undefined, '0');
            writer.writeAttributeString(undefined, 'vert', undefined, 'horz');
            writer.writeEndElement();
            writer.writeStartElement('a', 'lstStyle', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'p', this.aNamespace);
            this.serializeChartTitleFont(writer, title[index_3.fontSizeProperty[this.keywordIndex]], fill, title[index_3.fontNameProperty[this.keywordIndex]]);
            writer.writeStartElement('a', 'r', this.aNamespace);
            writer.writeStartElement('a', 'rPr', this.aNamespace);
            writer.writeAttributeString(undefined, 'lang', undefined, 'en-US');
            writer.writeAttributeString(undefined, 'b', undefined, '0');
            writer.writeAttributeString(undefined, 'sz', undefined, fontSize.toString());
            writer.writeAttributeString(undefined, 'baseline', undefined, '0');
            this.serializeChartSolidFill(writer, fill, false);
            this.serializeFont(writer, title[index_3.fontNameProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeStartElement('a', 't', this.aNamespace);
            writer.writeString(chartTitleName);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('c', 'layout', this.chartNamespace);
            writer.writeEndElement();
            writer.writeStartElement('c', 'overlay', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, '0');
            writer.writeEndElement();
            this.serializeDefaultShapeProperties(writer);
            writer.writeStartElement('c', 'txPr', this.chartNamespace);
            writer.writeStartElement('a', 'bodyPr', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'lstStyle', this.aNamespace);
            writer.writeEndElement();
            writer.writeStartElement('a', 'p', this.aNamespace);
            writer.writeEndElement();
            this.serializeChartTitleFont(writer, title[index_3.fontSizeProperty[this.keywordIndex]], fill, title[index_3.fontNameProperty[this.keywordIndex]]);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartTitleFont = function (writer, fontSize, fill, fontName) {
            var fontSizeCalc = fontSize * 100;
            writer.writeStartElement('a', 'pPr', this.aNamespace);
            writer.writeStartElement('a', 'defRPr', this.aNamespace);
            writer.writeAttributeString(undefined, 'lang', undefined, 'en-US');
            writer.writeAttributeString(undefined, 'b', undefined, '0');
            writer.writeAttributeString(undefined, 'sz', undefined, fontSizeCalc.toString());
            writer.writeAttributeString(undefined, 'baseline', undefined, '0');
            this.serializeChartSolidFill(writer, fill, false);
            this.serializeFont(writer, fontName);
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartSolidFill = function (writer, fill, isSeriesFill) {
            writer.writeStartElement('a', 'solidFill', this.aNamespace);
            writer.writeStartElement('a', 'srgbClr', this.aNamespace);
            if (fill !== '000000') {
                writer.writeAttributeString(undefined, 'val', undefined, fill);
            }
            else {
                writer.writeAttributeString(undefined, 'val', undefined, '595959');
            }
            if (this.chart[index_3.chartTypeProperty[this.keywordIndex]] === 'Bubble' && isSeriesFill) {
                writer.writeStartElement('a', 'alpha', this.aNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '75000');
                writer.writeEndElement();
            }
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeFont = function (writer, fontName) {
            writer.writeStartElement('a', 'latin', this.aNamespace);
            writer.writeAttributeString(undefined, 'typeface', undefined, fontName);
            writer.writeEndElement();
            writer.writeStartElement('a', 'ea', this.aNamespace);
            writer.writeAttributeString(undefined, 'typeface', undefined, fontName);
            writer.writeEndElement();
            writer.writeStartElement('a', 'cs', this.aNamespace);
            writer.writeAttributeString(undefined, 'typeface', undefined, fontName);
            writer.writeEndElement();
        };
        WordExport.prototype.parseChartSeriesColor = function (writer, dataPoints, chartType) {
            for (var i = 0; i < dataPoints.length; i++) {
                var data = dataPoints[i];
                writer.writeStartElement('c', 'spPr', this.chartNamespace);
                if (chartType === 'lineChart') {
                    writer.writeStartElement('a', 'ln', this.aNamespace);
                    writer.writeAttributeString(undefined, 'w', undefined, '28575');
                    writer.writeAttributeString(undefined, 'cap', undefined, 'rnd');
                }
                if (chartType !== 'lineChart') {
                    this.serializeChartSolidFill(writer, this.getColor(data[index_3.fillProperty[this.keywordIndex]][index_3.rgbProperty[this.keywordIndex]]), true);
                }
                else {
                    this.serializeChartSolidFill(writer, data[index_3.lineProperty[this.keywordIndex]][index_3.colorProperty[this.keywordIndex]], true);
                }
                if (chartType !== 'lineChart') {
                    writer.writeStartElement('a', 'ln', this.aNamespace);
                    writer.writeStartElement('a', 'noFill', this.aNamespace);
                    writer.writeEndElement();
                }
                writer.writeStartElement('a', 'round', this.aNamespace);
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeStartElement('a', 'effectLst', this.aNamespace);
                writer.writeEndElement();
                writer.writeEndElement();
                if (chartType === 'lineChart') {
                    var symbolType = 'none';
                    var size = 0;
                    if (this.chart[index_3.chartSeriesProperty[this.keywordIndex]][i].hasOwnProperty(index_3.seriesFormatProperty[this.keywordIndex])) {
                        symbolType = this.chart[index_3.chartSeriesProperty[this.keywordIndex]][i][index_3.seriesFormatProperty[this.keywordIndex]][index_3.markerStyleProperty[this.keywordIndex]];
                        size = this.chart[index_3.chartSeriesProperty[this.keywordIndex]][i][index_3.seriesFormatProperty[this.keywordIndex]][index_3.markerSizeProperty[this.keywordIndex]];
                    }
                    writer.writeStartElement('c', 'marker', this.chartNamespace);
                    writer.writeStartElement('c', 'symbol', this.chartNamespace);
                    writer.writeAttributeString(undefined, 'val', undefined, symbolType.toLowerCase());
                    writer.writeEndElement();
                    if (this.chart[index_3.chartSeriesProperty[this.keywordIndex]][i].hasOwnProperty(index_3.seriesFormatProperty[this.keywordIndex])) {
                        writer.writeStartElement('c', 'size', this.chartNamespace);
                        writer.writeAttributeString(undefined, 'val', undefined, size.toString());
                        writer.writeEndElement();
                    }
                    writer.writeEndElement();
                }
            }
        };
        WordExport.prototype.parseChartDataPoint = function (writer, series) {
            var dataPoints = series[index_3.dataPointsProperty[this.keywordIndex]];
            var points = [];
            for (var j = 0; j < dataPoints.length; j++) {
                points.push(dataPoints[j]);
                writer.writeStartElement('c', 'dPt', this.chartNamespace);
                writer.writeStartElement('c', 'idx', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, j.toString());
                writer.writeEndElement();
                writer.writeStartElement('c', 'bubble3D', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '0');
                writer.writeEndElement();
                this.parseChartSeriesColor(writer, points, this.chart[index_3.chartTypeProperty[this.keywordIndex]]);
                writer.writeEndElement();
                points = [];
            }
        };
        WordExport.prototype.serializeChartCategory = function (writer, chart, cacheType) {
            var chartCategory = chart[index_3.chartCategoryProperty[this.keywordIndex]];
            var chartCategoryCount = chartCategory.length;
            writer.writeStartElement('c', 'f', this.chartNamespace);
            writer.writeString('Sheet1!$A$2:$A$' + (chartCategoryCount + 1).toString());
            writer.writeEndElement();
            writer.writeStartElement('c', cacheType, this.chartNamespace);
            if (cacheType === 'numCache') {
                writer.writeStartElement('c', 'formatCode', this.chartNamespace);
                writer.writeString('General');
                writer.writeEndElement();
            }
            writer.writeStartElement('c', 'ptCount', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, chartCategoryCount.toString());
            writer.writeEndElement();
            for (var i = 0; i < chartCategory.length; i++) {
                var category = chartCategory[i];
                writer.writeStartElement('c', 'pt', this.chartNamespace);
                writer.writeAttributeString(undefined, 'idx', undefined, i.toString());
                writer.writeStartElement('c', 'v', this.chartNamespace);
                if (category[index_3.categoryXNameProperty[this.keywordIndex]] !== '') {
                    writer.writeString(category[index_3.categoryXNameProperty[this.keywordIndex]]);
                }
                writer.writeEndElement();
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeChartValue = function (writer, valueSheet, chartType) {
            var isScatterType = (chartType === 'scatterChart' || chartType === 'bubbleChart');
            var valueType = 'val';
            if (isScatterType) {
                valueType = 'yVal';
            }
            this.serializeChartYValue(writer, valueType, valueSheet);
            if (chartType === 'bubbleChart') {
                valueType = 'bubbleSize';
                valueSheet = 'Sheet1!$C$2:$C$';
                this.serializeChartYValue(writer, valueType, valueSheet);
            }
            if (chartType === 'lineChart' || chartType === 'scatterChart') {
                writer.writeStartElement('c', 'smooth', this.chartNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, '0');
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeChartYValue = function (writer, valueType, valueSheet) {
            var chart = this.chart;
            var chartCategory = chart[index_3.chartCategoryProperty[this.keywordIndex]];
            var chartCategoryCount = chartCategory.length;
            writer.writeStartElement('c', valueType, this.chartNamespace);
            writer.writeStartElement('c', 'numRef', this.chartNamespace);
            writer.writeStartElement('c', 'f', this.chartNamespace);
            writer.writeString(valueSheet + (chartCategoryCount + 1).toString());
            writer.writeEndElement();
            writer.writeStartElement('c', 'numCache', this.chartNamespace);
            writer.writeStartElement('c', 'formatCode', this.chartNamespace);
            writer.writeString('General');
            writer.writeEndElement();
            writer.writeStartElement('c', 'ptCount', this.chartNamespace);
            writer.writeAttributeString(undefined, 'val', undefined, chartCategoryCount.toString());
            writer.writeEndElement();
            for (var j = 0; j < chartCategoryCount; j++) {
                var category = chartCategory[j];
                for (var k = 0; k < category[index_3.chartDataProperty[this.keywordIndex]].length; k++) {
                    if (k === this.seriesCount) {
                        var chartData = category[index_3.chartDataProperty[this.keywordIndex]][this.seriesCount];
                        writer.writeStartElement('c', 'pt', this.chartNamespace);
                        writer.writeAttributeString(undefined, 'idx', undefined, j.toString());
                        writer.writeStartElement('c', 'v', this.chartNamespace);
                        if (valueType !== 'bubbleSize') {
                            writer.writeString(chartData[index_3.yValueProperty[this.keywordIndex]].toString());
                        }
                        else {
                            writer.writeString(chartData[index_3.sizeProperty[this.keywordIndex]].toString());
                        }
                        writer.writeEndElement();
                        writer.writeEndElement();
                    }
                }
            }
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.chartType = function (chart) {
            var chartType = chart[index_3.chartTypeProperty[this.keywordIndex]];
            switch (chartType) {
                case 'Pie':
                    chartType = 'pieChart';
                    break;
                case 'Doughnut':
                    chartType = 'doughnutChart';
                    break;
                case 'Scatter_Markers':
                    chartType = 'scatterChart';
                    break;
                case 'Bubble':
                    chartType = 'bubbleChart';
                    break;
            }
            if (chartType === 'Area' || chartType === 'Area_Stacked' || chartType === 'Area_Stacked_100') {
                chartType = 'areaChart';
            }
            if (chartType === 'Bar_Stacked_100' || chartType === 'Bar_Stacked' || chartType === 'Bar_Clustered' ||
                chartType === 'Column_Clustered' || chartType === 'Column_Stacked' || chartType === 'Column_Stacked_100') {
                chartType = 'barChart';
            }
            if (chartType === 'Line' || chartType === 'Line_Markers' || chartType === 'Line_Markers_Stacked' || chartType === 'Line_Stacked'
                || chartType === 'Line_Markers_Stacked_100' || chartType === 'Line_Stacked_100') {
                chartType = 'lineChart';
            }
            return chartType;
        };
        WordExport.prototype.chartGrouping = function (type) {
            var grouping = 'standard';
            if (type === 'Bar_Stacked' || type === 'Column_Stacked' || type === 'Area_Stacked'
                || type === 'Line_Stacked' || type === 'Line_Markers_Stacked') {
                grouping = 'stacked';
            }
            else if (type === 'Bar_Stacked_100' || type === 'Column_Stacked_100' ||
                type === 'Area_Stacked_100' || type === 'Line_Stacked_100' ||
                type === 'Line_Markers_Stacked_100') {
                grouping = 'percentStacked';
            }
            else if (type === 'Bar_Clustered' || type === 'Column_Clustered') {
                grouping = 'clustered';
            }
            return grouping;
        };
        WordExport.prototype.chartLegendPosition = function (chart) {
            var legendPosition = chart[index_3.positionProperty[this.keywordIndex]];
            switch (legendPosition) {
                case 'Top':
                    legendPosition = 't';
                    break;
                case 'Bottom':
                    legendPosition = 'b';
                    break;
                case 'Left':
                    legendPosition = 'l';
                    break;
                case 'Right':
                    legendPosition = 'r';
                    break;
                case 'Corner':
                    legendPosition = 'tr';
                    break;
                default:
                    legendPosition = 'b';
                    break;
            }
            return legendPosition;
        };
        WordExport.prototype.updatechartId = function (chart) {
            var id = '';
            if (id === '') {
                id = this.addChartRelation(this.documentCharts, chart);
            }
            return id;
        };
        WordExport.prototype.addChartRelation = function (chartCollection, chart) {
            var relationId = '';
            relationId = this.getNextRelationShipID();
            chartCollection.add(relationId, chart);
            return relationId;
        };
        WordExport.prototype.startsWith = function (sourceString, startString) {
            return startString.length > 0 && sourceString.substring(0, startString.length) === startString;
        };
        WordExport.prototype.serializeShapeDrawingGraphics = function (writer, shape) {
            var val = shape[index_3.autoShapeTypeProperty[this.keywordIndex]];
            var id = shape[index_3.shapeIdProperty[this.keywordIndex]];
            this.serializeShapeWrapStyle(writer, shape);
            writer.writeStartElement('wp', 'docPr', this.wpNamespace);
            writer.writeAttributeString(undefined, 'id', undefined, (this.mDocPrID++).toString());
            writer.writeAttributeString(undefined, 'name', undefined, shape[index_3.nameProperty[this.keywordIndex]]);
            writer.writeAttributeString(undefined, 'title', undefined, shape[index_3.titleProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeStartElement('a', 'graphic', this.aNamespace);
            writer.writeStartElement('a', 'graphicData', this.aNamespace);
            writer.writeAttributeString(undefined, 'uri', undefined, this.wpShapeNamespace);
            writer.writeStartElement('wps', 'wsp', this.wpShapeNamespace);
            writer.writeStartElement('wps', 'cNvCnPr', this.wpShapeNamespace);
            writer.writeStartElement('a', 'cxnSpLocks', this.aNamespace);
            writer.writeAttributeString(undefined, 'noChangeShapeType', undefined, '1');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('wps', 'spPr', this.wpShapeNamespace);
            writer.writeAttributeString(undefined, 'bwMode', undefined, 'auto');
            writer.writeStartElement('a', 'xfrm', this.aNamespace);
            writer.writeStartElement('a', 'off', this.aNamespace);
            writer.writeAttributeString(undefined, 'x', undefined, '0');
            writer.writeAttributeString(undefined, 'y', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('a', 'ext', this.aNamespace);
            var cx = Math.round((shape[index_3.widthProperty[this.keywordIndex]] * this.emusPerPoint));
            writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
            var cy = Math.round((shape[index_3.heightProperty[this.keywordIndex]] * this.emusPerPoint));
            writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('a', 'prstGeom', this.aNamespace);
            if (val === (this.keywordIndex == 1 ? 3 : 'StraightConnector')) {
                writer.writeAttributeString(undefined, 'prst', undefined, 'straightConnector1');
            }
            else if (val === (this.keywordIndex == 1 ? 2 : 'RoundedRectangle')) {
                writer.writeAttributeString(undefined, 'prst', undefined, 'roundRect');
            }
            else {
                writer.writeAttributeString(undefined, 'prst', undefined, 'rect');
            }
            writer.writeStartElement('a', 'avLst', this.aNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
            if (shape[index_3.fillFormatProperty[this.keywordIndex]] && shape[index_3.fillFormatProperty[this.keywordIndex]][index_3.colorProperty[this.keywordIndex]] && index_1.HelperMethods.parseBoolValue(shape[index_3.fillFormatProperty[this.keywordIndex]][index_3.fillProperty[this.keywordIndex]])) {
                writer.writeStartElement('a', 'solidFill', this.aNamespace);
                writer.writeStartElement('a', 'srgbClr', this.aNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, this.getColor(shape[index_3.fillFormatProperty[this.keywordIndex]][index_3.colorProperty[this.keywordIndex]]));
                writer.writeEndElement();
                writer.writeEndElement();
            }
            else {
                writer.writeStartElement('a', 'noFill', this.aNamespace);
                writer.writeEndElement();
            }
            var lineWeight = shape[index_3.lineFormatProperty[this.keywordIndex]][index_3.weightProperty[this.keywordIndex]] ? shape[index_3.lineFormatProperty[this.keywordIndex]][index_3.weightProperty[this.keywordIndex]] * this.emusPerPoint : this.emusPerPoint;
            writer.writeStartElement('a', 'ln', this.aNamespace);
            writer.writeAttributeString(undefined, 'w', undefined, Math.round(lineWeight).toString());
            if ((!ej2_base_1.isNullOrUndefined(shape[index_3.lineFormatProperty[this.keywordIndex]][index_3.lineFormatTypeProperty[this.keywordIndex]]) && shape[index_3.lineFormatProperty[this.keywordIndex]][index_3.lineFormatTypeProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 3 : 'None'))
                && index_1.HelperMethods.parseBoolValue(shape[index_3.lineFormatProperty[this.keywordIndex]][index_3.lineProperty[this.keywordIndex]])) {
                writer.writeStartElement('a', 'solidFill', this.aNamespace);
                writer.writeStartElement('a', 'srgbClr', this.aNamespace);
                writer.writeAttributeString(undefined, 'val', undefined, this.getColor(shape[index_3.lineFormatProperty[this.keywordIndex]][index_3.colorProperty[this.keywordIndex]]));
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeStartElement('a', 'round', this.aNamespace);
                writer.writeEndElement();
                writer.writeStartElement('a', 'headEnd', this.aNamespace);
                writer.writeEndElement();
                writer.writeStartElement('a', 'tailEnd', this.aNamespace);
                writer.writeEndElement();
            }
            else {
                writer.writeStartElement('a', 'noFill', this.aNamespace);
                writer.writeEndElement();
            }
            writer.writeEndElement();
            writer.writeEndElement();
            if (val === (this.keywordIndex == 1 ? 1 : 'Rectangle') || val === (this.keywordIndex == 1 ? 2 : 'RoundedRectangle')) {
                writer.writeStartElement('wps', 'txbx', this.wpShapeNamespace);
                writer.writeStartElement(undefined, 'txbxContent', this.wNamespace);
                this.serializeBodyItems(writer, shape[index_3.textFrameProperty[this.keywordIndex]][index_3.blocksProperty[this.keywordIndex]], true);
                writer.writeEndElement();
                writer.writeEndElement();
            }
            writer.writeStartElement('wps', 'bodyPr', this.wpShapeNamespace);
            if (!ej2_base_1.isNullOrUndefined(shape[index_3.textFrameProperty[this.keywordIndex]])) {
                var margin = void 0;
                if (shape[index_3.textFrameProperty[this.keywordIndex]][index_3.leftMarginProperty[this.keywordIndex]] >= 0) {
                    margin = Math.round(shape[index_3.textFrameProperty[this.keywordIndex]][index_3.leftMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                    writer.writeAttributeString(undefined, 'lIns', undefined, margin);
                }
                if (shape[index_3.textFrameProperty[this.keywordIndex]][index_3.topMarginProperty[this.keywordIndex]] >= 0) {
                    margin = Math.round(shape[index_3.textFrameProperty[this.keywordIndex]][index_3.topMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                    writer.writeAttributeString(undefined, 'tIns', undefined, margin);
                }
                if (shape[index_3.textFrameProperty[this.keywordIndex]][index_3.rightMarginProperty[this.keywordIndex]] >= 0) {
                    margin = Math.round(shape[index_3.textFrameProperty[this.keywordIndex]][index_3.rightMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                    writer.writeAttributeString(undefined, 'rIns', undefined, margin);
                }
                if (shape[index_3.textFrameProperty[this.keywordIndex]][index_3.bottomMarginProperty[this.keywordIndex]] >= 0) {
                    margin = Math.round(shape[index_3.textFrameProperty[this.keywordIndex]][index_3.bottomMarginProperty[this.keywordIndex]] * this.emusPerPoint).toString();
                    writer.writeAttributeString(undefined, 'bIns', undefined, margin);
                }
                if (shape[index_3.textFrameProperty[this.keywordIndex]][index_3.textVerticalAlignmentProperty[this.keywordIndex]]) {
                    var vert = void 0;
                    if (this.keywordIndex == 1) {
                        vert = index_1.HelperMethods.getTextVerticalAlignment(shape[index_3.textFrameProperty[this.keywordIndex]][index_3.textVerticalAlignmentProperty[this.keywordIndex]]).toString().toLowerCase();
                    }
                    else {
                        vert = shape[index_3.textFrameProperty[this.keywordIndex]][index_3.textVerticalAlignmentProperty[this.keywordIndex]].toString().toLowerCase();
                    }
                    writer.writeAttributeString(undefined, 'anchor', undefined, this.getTextVerticalAlignmentProperty(vert));
                }
                writer.writeAttributeString(undefined, 'anchorCtr', undefined, '0');
            }
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.getTextVerticalAlignmentProperty = function (vert) {
            switch (vert) {
                case 'top':
                    return 't';
                case 'middle':
                case 'center':
                    return 'ctr';
                case 'bottom':
                    return 'b';
                default:
                    return vert;
            }
        };
        WordExport.prototype.serializeShapeWrapStyle = function (writer, shape) {
            var wrappingStyle = this.keywordIndex == 1 ? this.getTextWrappingStyle(shape[index_3.textWrappingStyleProperty[this.keywordIndex]]) : shape[index_3.textWrappingStyleProperty[this.keywordIndex]];
            if (wrappingStyle !== 'Inline') {
                var textWrappingStyle = 'wrapNone';
                if (wrappingStyle && wrappingStyle !== 'InFrontOfText' && wrappingStyle !== 'Behind') {
                    textWrappingStyle = 'wrap' + wrappingStyle;
                    if (wrappingStyle === 'Tight') {
                        textWrappingStyle = 'wrap' + 'Square';
                    }
                }
                writer.writeStartElement('wp', textWrappingStyle, this.wpNamespace);
                if (wrappingStyle && wrappingStyle !== 'InFrontOfText' && wrappingStyle !== 'Behind' &&
                    !ej2_base_1.isNullOrUndefined(shape[index_3.textWrappingTypeProperty[this.keywordIndex]])) {
                    var wrapType = this.keywordIndex == 1 ? this.getTextWrappingType(shape[index_3.textWrappingTypeProperty[this.keywordIndex]]) : shape[index_3.textWrappingTypeProperty[this.keywordIndex]] === 'Both' ? 'bothSides' : shape[index_3.textWrappingTypeProperty[this.keywordIndex]].toLowerCase();
                    writer.writeAttributeString(undefined, 'wrapText', undefined, wrapType);
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeDrawingGraphics = function (writer, picture) {
            var id = '';
            var format;
            var imageStringInfo = this.getBase64ImageString(picture);
            var imageString = imageStringInfo.imageString;
            if (index_1.HelperMethods.parseBoolValue(picture[index_3.isMetaFileProperty[this.keywordIndex]])) {
                format = index_1.HelperMethods.formatClippedString(imageStringInfo.metaFileImageString).extension;
                if (format !== '.svg') {
                    imageString = imageStringInfo.metaFileImageString;
                }
            }
            id = this.updateShapeId(picture, false);
            writer.writeStartElement('wp', 'docPr', this.wpNamespace);
            writer.writeAttributeString(undefined, 'id', undefined, (this.mDocPrID++).toString());
            if (!ej2_base_1.isNullOrUndefined(picture[index_3.alternativeTextProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'descr', undefined, picture[index_3.alternativeTextProperty[this.keywordIndex]]);
            }
            writer.writeAttributeString(undefined, 'name', undefined, !ej2_base_1.isNullOrUndefined(picture[index_3.nameProperty[this.keywordIndex]]) ? picture[index_3.nameProperty[this.keywordIndex]] : '');
            if (!ej2_base_1.isNullOrUndefined(picture[index_3.titleProperty[this.keywordIndex]]))
                writer.writeAttributeString(undefined, 'title', undefined, picture[index_3.titleProperty[this.keywordIndex]]);
            writer.writeEndElement();
            writer.writeStartElement('a', 'graphic', this.aNamespace);
            writer.writeStartElement('a', 'graphicData', this.aNamespace);
            writer.writeAttributeString(undefined, 'uri', undefined, this.pictureNamespace);
            writer.writeStartElement('pic', 'pic', this.pictureNamespace);
            writer.writeStartElement('pic', 'nvPicPr', this.pictureNamespace);
            writer.writeStartElement('pic', 'cNvPr', this.pictureNamespace);
            writer.writeAttributeString(undefined, 'id', undefined, '0');
            writer.writeAttributeString(undefined, 'name', undefined, '');
            writer.writeAttributeString(undefined, 'descr', undefined, '');
            writer.writeEndElement();
            writer.writeStartElement('pic', 'cNvPicPr', this.pictureNamespace);
            writer.writeStartElement('a', 'picLocks', this.aNamespace);
            writer.writeAttributeString(undefined, 'noChangeAspect', undefined, '1');
            writer.writeAttributeString(undefined, 'noChangeArrowheads', undefined, '1');
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('pic', 'blipFill', this.pictureNamespace);
            writer.writeStartElement('a', 'blip', this.aNamespace);
            if (this.startsWith(imageString, 'data:image')) {
                writer.writeAttributeString('r', 'embed', this.rNamespace, id);
            }
            else {
                if (this.documentImages.containsKey(id)) {
                    this.documentImages.remove(id);
                    this.externalImages.add(id, imageString);
                    writer.writeAttributeString(undefined, 'link', this.rNamespace, id);
                    if (!ej2_base_1.isNullOrUndefined(imageStringInfo.metaFileImageString) && (this.startsWith(imageString, "https://") || this.startsWith(imageString, "http://") || this.startsWith(imageString, "file://"))) {
                        var newRId = this.getNextRelationShipID();
                        this.documentImages.add(newRId, imageStringInfo.metaFileImageString);
                        writer.writeAttributeString('r', 'embed', this.rNamespace, newRId);
                    }
                }
            }
            if (format === '.svg') {
                this.serializeBlipExtensions(writer, picture);
            }
            writer.writeEndElement();
            if (!ej2_base_1.isNullOrUndefined(picture[index_3.topProperty[this.keywordIndex]]) && picture[index_3.topProperty[this.keywordIndex]] !== 0 ||
                !ej2_base_1.isNullOrUndefined(picture[index_3.bottomProperty[this.keywordIndex]]) && picture[index_3.bottomProperty[this.keywordIndex]] !== 0 ||
                !ej2_base_1.isNullOrUndefined(picture[index_3.leftProperty[this.keywordIndex]]) && picture[index_3.leftProperty[this.keywordIndex]] !== 0 ||
                !ej2_base_1.isNullOrUndefined(picture[index_3.rightProperty[this.keywordIndex]]) && picture[index_3.rightProperty[this.keywordIndex]] !== 0) {
                writer.writeStartElement('a', 'srcRect', this.aNamespace);
                var l = Math.round(picture[index_3.leftProperty[this.keywordIndex]] * 1000);
                writer.writeAttributeString(undefined, 'l', undefined, l.toString());
                var t = Math.round(picture[index_3.topProperty[this.keywordIndex]] * 1000);
                writer.writeAttributeString(undefined, 't', undefined, t.toString());
                var r = Math.round(picture[index_3.rightProperty[this.keywordIndex]] * 1000);
                writer.writeAttributeString(undefined, 'r', undefined, r.toString());
                var b = Math.round(picture[index_3.bottomProperty[this.keywordIndex]] * 1000);
                writer.writeAttributeString(undefined, 'b', undefined, b.toString());
                writer.writeEndElement();
            }
            writer.writeStartElement('a', 'stretch', this.aNamespace);
            writer.writeStartElement('a', 'fillRect', this.aNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('pic', 'spPr', this.pictureNamespace);
            writer.writeAttributeString(undefined, 'bwMode', undefined, 'auto');
            writer.writeStartElement('a', 'xfrm', this.aNamespace);
            writer.writeStartElement('a', 'off', this.aNamespace);
            writer.writeAttributeString(undefined, 'x', undefined, '0');
            writer.writeAttributeString(undefined, 'y', undefined, '0');
            writer.writeEndElement();
            writer.writeStartElement('a', 'ext', this.aNamespace);
            var cx = Math.round((picture[index_3.widthProperty[this.keywordIndex]] * this.emusPerPoint));
            writer.writeAttributeString(undefined, 'cx', undefined, cx.toString());
            var cy = Math.round((picture[index_3.heightProperty[this.keywordIndex]] * this.emusPerPoint));
            writer.writeAttributeString(undefined, 'cy', undefined, cy.toString());
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('a', 'prstGeom', this.aNamespace);
            writer.writeAttributeString(undefined, 'prst', undefined, 'rect');
            writer.writeStartElement('a', 'avLst', this.aNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeBlipExtensions = function (writer, picture) {
            writer.writeStartElement('a', 'extLst', this.aNamespace);
            writer.writeStartElement('a', "ext", this.aNamespace);
            writer.writeAttributeString(undefined, 'uri', undefined, '{96DAC541-7B7A-43D3-8B79-37D633B846F1}');
            writer.writeStartElement("asvg", "svgBlip", this.svgNamespace);
            var id = this.updateShapeId(picture, true);
            writer.writeAttributeString("r", "embed", undefined, id);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.updateShapeId = function (picture, isSvgData) {
            var id = '';
            var tOwner = this.paragraph;
            if (this.headerFooter) {
                id = this.updateHFImageRels(this.headerFooter, picture, isSvgData);
            }
            else {
                if (id === '') {
                    if (tOwner.hasOwnProperty(index_3.sectionFormatProperty[this.keywordIndex]) || tOwner.hasOwnProperty(index_3.inlinesProperty[this.keywordIndex])) {
                        id = this.addImageRelation(!isSvgData ? this.documentImages : this.svgImages, picture, isSvgData);
                    }
                }
            }
            return id;
        };
        WordExport.prototype.addImageRelation = function (imageCollection, image, isSvgData) {
            var relationId = '';
            var index = isSvgData ? this.svgImageRelationIds.keys.indexOf(parseInt(image[index_3.imageStringProperty[this.keywordIndex]])) : this.imageRelationIds.keys.indexOf(parseInt(image[index_3.imageStringProperty[this.keywordIndex]]));
            if (index < 0 || this.isHeaderFooter) {
                relationId = this.getNextRelationShipID();
                isSvgData ? this.svgImageRelationIds.add(parseInt(image[index_3.imageStringProperty[this.keywordIndex]]), relationId) : this.imageRelationIds.add(parseInt(image[index_3.imageStringProperty[this.keywordIndex]]), relationId);
            }
            else {
                relationId = isSvgData ? this.svgImageRelationIds.get(parseInt(image[index_3.imageStringProperty[this.keywordIndex]])) : this.imageRelationIds.get(parseInt(image[index_3.imageStringProperty[this.keywordIndex]]));
            }
            imageCollection.add(relationId, image);
            return relationId;
        };
        WordExport.prototype.updateHFImageRels = function (hf, image, isSvgImage) {
            var id = '';
            var headerId = '';
            var types = this.headersFooters.keys;
            for (var i = 0; i < types.length; i++) {
                var hfColl = this.headersFooters.get(types[i]);
                var hfKeys = hfColl.keys;
                for (var j = 0; j < hfKeys.length; j++) {
                    if (hfColl.get(hfKeys[j]) === hf) {
                        headerId = hfKeys[j];
                        var headerImages = void 0;
                        if (isSvgImage) {
                            if (this.headerFooterSvgImages.containsKey(headerId)) {
                                headerImages = this.headerFooterSvgImages.get(headerId);
                                id = this.addImageRelation(headerImages, image, true);
                            }
                            else {
                                headerImages = new index_2.Dictionary();
                                id = this.addImageRelation(headerImages, image, true);
                                this.headerFooterSvgImages.add(headerId, headerImages);
                            }
                        }
                        else {
                            if (this.headerFooterImages.containsKey(headerId)) {
                                headerImages = this.headerFooterImages.get(headerId);
                                id = this.addImageRelation(headerImages, image, false);
                            }
                            else {
                                headerImages = new index_2.Dictionary();
                                id = this.addImageRelation(headerImages, image, false);
                                this.headerFooterImages.add(headerId, headerImages);
                            }
                        }
                    }
                }
            }
            return id;
        };
        WordExport.prototype.serializeTable = function (writer, table) {
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = 0;
            }
            if (table[index_3.rowsProperty[this.keywordIndex]].length <= 0) {
                return;
            }
            var owner = this.table;
            this.table = table;
            writer.writeStartElement(undefined, 'tbl', this.wNamespace);
            var tableFormat = table[index_3.rowsProperty[this.keywordIndex]][0][index_3.rowFormatProperty[this.keywordIndex]];
            this.serializeTableFormat(writer, tableFormat, table);
            this.serializeTableGrid(writer, table);
            var mVerticalMerge = new index_2.Dictionary();
            var mHorizontalMerge = new index_2.Dictionary();
            var cellFormats = new index_2.Dictionary();
            var rows = table[index_3.rowsProperty[this.keywordIndex]];
            if (rows.length > 0) {
                for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                    var row = rows[rowIndex];
                    if (row[index_3.cellsProperty[this.keywordIndex]].length > 0) {
                        if (row.hasOwnProperty(index_3.contentControlPropertiesProperty[this.keywordIndex])) {
                            this.serializeContentControl(writer, row[index_3.contentControlPropertiesProperty[this.keywordIndex]], row);
                            continue;
                        }
                        var owner_1 = this.row;
                        this.row = row;
                        writer.writeStartElement(undefined, 'tr', this.wNamespace);
                        this.serializeRowFormat(writer, row);
                        var cells = row[index_3.cellsProperty[this.keywordIndex]];
                        var cellLength = cells.length;
                        var prevColIndex = 0;
                        for (var i = 0; i < cellLength; i++) {
                            var cell = cells[i];
                            var columnIndex = cell[index_3.columnIndexProperty[this.keywordIndex]];
                            if (cell.hasOwnProperty(index_3.contentControlPropertiesProperty[this.keywordIndex])) {
                                this.serializeContentControl(writer, cell[index_3.contentControlPropertiesProperty[this.keywordIndex]], cell);
                                continue;
                            }
                            var cellFormat = cell[index_3.cellFormatProperty[this.keywordIndex]];
                            if ((columnIndex - prevColIndex) > 0) {
                                var checkIndex = i === 0 ? 0 : (prevColIndex + 1);
                                for (var k = checkIndex; k < columnIndex; k++) {
                                    if (mVerticalMerge.containsKey(k)) {
                                        var format = this.getMergeCellFormat(cellFormat, cellFormats.get(k), k < cell[index_3.columnIndexProperty[this.keywordIndex]]);
                                        this.serializeTableCell(writer, cell, format, false);
                                        mVerticalMerge.set(k, mVerticalMerge.get(k) - 1);
                                        if (mVerticalMerge.get(k) === 1) {
                                            mVerticalMerge.remove(k);
                                            cellFormats.remove(k);
                                            if (mHorizontalMerge.containsKey(k)) {
                                                mHorizontalMerge.remove(k);
                                            }
                                        }
                                        if (mHorizontalMerge.containsKey(k)) {
                                            prevColIndex += mHorizontalMerge.get(k) - 1;
                                            k += mHorizontalMerge.get(k);
                                            if (k > 0) {
                                                k--;
                                            }
                                        }
                                    }
                                }
                            }
                            prevColIndex = columnIndex;
                            if (cellFormat[index_3.rowSpanProperty[this.keywordIndex]] > 1) {
                                mVerticalMerge.add(columnIndex, cellFormat[index_3.rowSpanProperty[this.keywordIndex]]);
                                cellFormats.add(columnIndex, cellFormat);
                            }
                            this.serializeTableCell(writer, cell, cellFormat, true);
                            if (cellFormat[index_3.columnSpanProperty[this.keywordIndex]] > 1 && cellFormat[index_3.rowSpanProperty[this.keywordIndex]] > 1) {
                                mHorizontalMerge.add(columnIndex, cellFormat[index_3.columnSpanProperty[this.keywordIndex]]);
                            }
                            for (var j = columnIndex + 1;; j++) {
                                if (mVerticalMerge.containsKey(j)) {
                                    var mergeFormat = this.getMergeCellFormat(cellFormat, cellFormats.get(j), j < cell[index_3.columnIndexProperty[this.keywordIndex]]);
                                    this.serializeTableCell(writer, cell, mergeFormat, false);
                                    mVerticalMerge.set(j, mVerticalMerge.get(j) - 1);
                                    prevColIndex++;
                                    if (mVerticalMerge.get(j) === 1) {
                                        mVerticalMerge.remove(j);
                                        cellFormats.remove(j);
                                        if (mHorizontalMerge.containsKey(j)) {
                                            mHorizontalMerge.remove(j);
                                        }
                                    }
                                    if (mHorizontalMerge.containsKey(j)) {
                                        prevColIndex += mHorizontalMerge.get(j) - 1;
                                        j += mHorizontalMerge.get(j);
                                    }
                                }
                                else if (!(i === (cellLength - 1) && j < table[index_3.columnCountProperty[this.keywordIndex]])) {
                                    break;
                                }
                            }
                        }
                        if (!this.isBookmarkAtRowEnd) {
                            writer.writeEndElement();
                        }
                        this.isBookmarkAtRowEnd = false;
                        this.row = owner_1;
                    }
                }
            }
            writer.writeEndElement();
            this.table = owner;
        };
        WordExport.prototype.getMergeCellFormat = function (cellFormat, mergedCellFormat, before) {
            var format = mergedCellFormat;
            if (before) {
                format[index_3.bordersProperty[this.keywordIndex]][index_3.rightProperty[this.keywordIndex]] = cellFormat[index_3.bordersProperty[this.keywordIndex]][index_3.leftProperty[this.keywordIndex]];
            }
            else {
                format[index_3.bordersProperty[this.keywordIndex]][index_3.leftProperty[this.keywordIndex]] = cellFormat[index_3.bordersProperty[this.keywordIndex]][index_3.rightProperty[this.keywordIndex]];
            }
            return format;
        };
        WordExport.prototype.serializeTableCell = function (xmlWriter, cell, cellFormat, mergeStart) {
            var owner = this.blockOwner;
            this.blockOwner = cell;
            xmlWriter.writeStartElement(undefined, 'tc', this.wNamespace);
            xmlWriter.writeStartElement(undefined, 'tcPr', this.wNamespace);
            this.serializeCellWidth(xmlWriter, cellFormat);
            this.serializeCellMargins(xmlWriter, cellFormat);
            xmlWriter.writeStartElement(undefined, 'tcBorders', this.wNamespace);
            this.serializeBorders(xmlWriter, cellFormat[index_3.bordersProperty[this.keywordIndex]], 8, false);
            xmlWriter.writeEndElement();
            this.serializeShading(xmlWriter, cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.shadingProperty[this.keywordIndex]]);
            this.serializeTableCellDirection(xmlWriter, cellFormat);
            this.serializeCellVerticalAlign(xmlWriter, cellFormat[index_3.verticalAlignmentProperty[this.keywordIndex]]);
            if (cellFormat[index_3.columnSpanProperty[this.keywordIndex]] > 1) {
                var num = cellFormat[index_3.columnSpanProperty[this.keywordIndex]];
                xmlWriter.writeStartElement(undefined, 'gridSpan', this.wNamespace);
                xmlWriter.writeAttributeString('w', 'val', this.wNamespace, num.toString());
                xmlWriter.writeEndElement();
            }
            if (cellFormat[index_3.rowSpanProperty[this.keywordIndex]] > 1) {
                xmlWriter.writeStartElement(undefined, 'vMerge', this.wNamespace);
                xmlWriter.writeAttributeString('w', 'val', this.wNamespace, mergeStart ? 'restart' : 'continue');
                xmlWriter.writeEndElement();
            }
            xmlWriter.writeEndElement();
            if (cell && cell[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                var itemIndex = 0;
                var item = undefined;
                while (itemIndex < cell[index_3.blocksProperty[this.keywordIndex]].length) {
                    item = cell[index_3.blocksProperty[this.keywordIndex]][itemIndex];
                    this.serializeBodyItem(xmlWriter, item, false);
                    itemIndex += 1;
                }
            }
            else {
                xmlWriter.writeStartElement(undefined, 'p', this.wNamespace);
                xmlWriter.writeStartElement(undefined, 'pPr', this.wNamespace);
                xmlWriter.writeStartElement(undefined, 'pStyle', this.wNamespace);
                xmlWriter.writeAttributeString('w', 'val', this.wNamespace, 'Normal');
                xmlWriter.writeEndElement();
                xmlWriter.writeEndElement();
                xmlWriter.writeEndElement();
            }
            if (!this.isBookmarkAtRowEnd) {
                xmlWriter.writeEndElement();
            }
            this.blockOwner = owner;
        };
        WordExport.prototype.serializeTableGrid = function (writer, table) {
            writer.writeStartElement(undefined, 'tblGrid', this.wNamespace);
            if (table[index_3.gridProperty[this.keywordIndex]].length !== 0) {
                this.serializeGridColumns(writer, table[index_3.gridProperty[this.keywordIndex]]);
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeTableRows = function (writer, rows) {
            var mVerticalMerge = new index_2.Dictionary();
            if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row[index_3.cellsProperty[this.keywordIndex]].length > 0) {
                        if (row.hasOwnProperty(index_3.contentControlPropertiesProperty[this.keywordIndex])) {
                            this.serializeContentControl(writer, row[index_3.contentControlPropertiesProperty[this.keywordIndex]], row);
                            continue;
                        }
                        this.serializeRow(writer, row, mVerticalMerge);
                    }
                }
            }
        };
        WordExport.prototype.serializeRow = function (writer, row, mVerticalMerge) {
            var owner = this.row;
            this.row = row;
            writer.writeStartElement(undefined, 'tr', this.wNamespace);
            this.serializeRowFormat(writer, row);
            this.serializeCells(writer, row[index_3.cellsProperty[this.keywordIndex]], mVerticalMerge);
            writer.writeEndElement();
            this.row = owner;
        };
        WordExport.prototype.serializeRowFormat = function (writer, row) {
            this.serializeRowMargins(writer, row[index_3.rowFormatProperty[this.keywordIndex]]);
            writer.writeStartElement(undefined, 'trPr', this.wNamespace);
            if (row[index_3.rowFormatProperty[this.keywordIndex]][index_3.heightProperty[this.keywordIndex]] > 0) {
                writer.writeStartElement(undefined, 'trHeight', this.wNamespace);
                if (row[index_3.rowFormatProperty[this.keywordIndex]][index_3.heightTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Exactly')) {
                    writer.writeAttributeString('w', 'hRule', this.wNamespace, 'exact');
                }
                else if (row[index_3.rowFormatProperty[this.keywordIndex]][index_3.heightTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'AtLeast')) {
                    writer.writeAttributeString('w', 'hRule', this.wNamespace, 'atLeast');
                }
                var height = this.roundToTwoDecimal(row[index_3.rowFormatProperty[this.keywordIndex]][index_3.heightProperty[this.keywordIndex]] * this.twentiethOfPoint).toString();
                writer.writeAttributeString('w', 'val', this.wNamespace, height);
                writer.writeEndElement();
            }
            var rowFormat = row[index_3.rowFormatProperty[this.keywordIndex]];
            var gridBefore = rowFormat[index_3.gridBeforeProperty[this.keywordIndex]];
            if (gridBefore > 0) {
                writer.writeStartElement(undefined, 'gridBefore', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, gridBefore.toString());
                writer.writeEndElement();
            }
            var gridAfter = rowFormat[index_3.gridAfterProperty[this.keywordIndex]];
            if (gridAfter > 0) {
                writer.writeStartElement(undefined, 'gridAfter', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, gridAfter.toString());
                writer.writeEndElement();
            }
            if (gridBefore > 0) {
                writer.writeStartElement(undefined, 'wBefore', this.wNamespace);
                switch (rowFormat[index_3.gridBeforeWidthTypeProperty[this.keywordIndex]]) {
                    case 'Percent':
                    case 1:
                        var width = this.roundToTwoDecimal(rowFormat[index_3.gridBeforeWidthProperty[this.keywordIndex]] * this.percentageFactor).toString();
                        writer.writeAttributeString('w', 'w', this.wNamespace, width);
                        writer.writeAttributeString('w', 'type', this.wNamespace, 'pct');
                        break;
                    case 'Point':
                    case 2:
                        var pointWidth = this.roundToTwoDecimal(rowFormat[index_3.gridBeforeWidthProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                        writer.writeAttributeString('w', 'w', this.wNamespace, pointWidth);
                        writer.writeAttributeString('w', 'type', this.wNamespace, 'dxa');
                        break;
                }
                writer.writeEndElement();
            }
            if (gridAfter > 0) {
                writer.writeStartElement(undefined, 'wAfter', this.wNamespace);
                switch (rowFormat[index_3.gridAfterWidthTypeProperty[this.keywordIndex]]) {
                    case 'Percent':
                    case 1:
                        var width = this.roundToTwoDecimal(rowFormat[index_3.gridAfterWidthProperty[this.keywordIndex]] * this.percentageFactor).toString();
                        writer.writeAttributeString('w', 'val', this.wNamespace, width);
                        writer.writeAttributeString('w', 'type', this.wNamespace, 'pct');
                        break;
                    case 'Point':
                    case 2:
                        var pointWidth = this.roundToTwoDecimal(rowFormat[index_3.gridAfterWidthProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                        writer.writeAttributeString('w', 'val', this.wNamespace, pointWidth);
                        writer.writeAttributeString('w', 'type', this.wNamespace, 'dxa');
                        break;
                }
                writer.writeEndElement();
            }
            if (!index_1.HelperMethods.parseBoolValue(rowFormat[index_3.allowBreakAcrossPagesProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'cantSplit', this.wNamespace);
                writer.writeEndElement();
            }
            if (index_1.HelperMethods.parseBoolValue(rowFormat[index_3.isHeaderProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'tblHeader', this.wNamespace);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(rowFormat[index_3.revisionIdsProperty[this.keywordIndex]]) && rowFormat[index_3.revisionIdsProperty[this.keywordIndex]].length > 0) {
                this.serializeRevisionStart(writer, rowFormat, undefined);
                this.serializeRevisionEnd(writer, rowFormat, undefined);
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeCells = function (writer, cells, mVerticalMerge) {
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].hasOwnProperty(index_3.contentControlPropertiesProperty[this.keywordIndex])) {
                    this.serializeContentControl(writer, cells[i][index_3.contentControlPropertiesProperty[this.keywordIndex]], cells[i]);
                    continue;
                }
                this.serializeCell(writer, cells[i], mVerticalMerge);
            }
        };
        WordExport.prototype.serializeCell = function (writer, cell, mVerticalMerge) {
            var owner = this.blockOwner;
            this.blockOwner = cell;
            writer.writeStartElement(undefined, 'tc', this.wNamespace);
            mVerticalMerge = this.serializeCellFormat(writer, cell[index_3.cellFormatProperty[this.keywordIndex]], true, true, mVerticalMerge);
            if (cell[index_3.blocksProperty[this.keywordIndex]].length > 0) {
                var itemIndex = 0;
                var item = undefined;
                while (itemIndex < cell[index_3.blocksProperty[this.keywordIndex]].length) {
                    item = cell[index_3.blocksProperty[this.keywordIndex]][itemIndex];
                    this.serializeBodyItem(writer, item, false);
                    itemIndex += 1;
                }
            }
            else {
                writer.writeStartElement(undefined, 'p', this.wNamespace);
                writer.writeStartElement(undefined, 'pPr', this.wNamespace);
                writer.writeStartElement(undefined, 'pStyle', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, 'Normal');
                writer.writeEndElement();
                writer.writeEndElement();
                writer.writeEndElement();
            }
            writer.writeEndElement();
            var increment = 1;
            if (mVerticalMerge.containsKey((cell[index_3.columnIndexProperty[this.keywordIndex]] + cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.columnSpanProperty[this.keywordIndex]] - 1) + increment) && this.row[index_3.cellsProperty[this.keywordIndex]].length === 1) {
                var length_1 = mVerticalMerge.keys[mVerticalMerge.keys.length - 1];
                while (increment <= length_1) {
                    increment = this.createCellForMerge(writer, cell, mVerticalMerge, increment);
                    increment++;
                }
            }
            else {
                this.createCellForMerge(writer, cell, mVerticalMerge, increment);
            }
            this.blockOwner = owner;
        };
        WordExport.prototype.createCellForMerge = function (writer, cell, mVerticalMerge, increment) {
            while (mVerticalMerge.containsKey((cell[index_3.columnIndexProperty[this.keywordIndex]] + cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.columnSpanProperty[this.keywordIndex]] - 1) + increment)
                && (((this.row[index_3.cellsProperty[this.keywordIndex]].indexOf(cell) === this.row[index_3.cellsProperty[this.keywordIndex]].length - 1) || this.row[index_3.cellsProperty[this.keywordIndex]].indexOf(cell) === cell[index_3.columnIndexProperty[this.keywordIndex]]))
                && cell.nextNode === undefined) {
                var collKey = (cell[index_3.columnIndexProperty[this.keywordIndex]] + cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.columnSpanProperty[this.keywordIndex]] - 1) + increment;
                writer.writeStartElement(undefined, 'tc', this.wNamespace);
                var endProperties = true;
                if (!ej2_base_1.isNullOrUndefined(this.spanCellFormat)) {
                    endProperties = false;
                    mVerticalMerge = this.serializeCellFormat(writer, this.spanCellFormat, false, endProperties, mVerticalMerge);
                }
                else {
                    writer.writeStartElement(undefined, 'tcPr', this.wNamespace);
                    endProperties = false;
                }
                this.serializeColumnSpan(collKey, writer);
                writer.writeStartElement(undefined, 'vMerge', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, 'continue');
                writer.writeEndElement();
                if (ej2_base_1.isNullOrUndefined(this.spanCellFormat)) {
                    writer.writeStartElement(undefined, 'tcBorders', this.wNamespace);
                    this.serializeBorders(writer, cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.bordersProperty[this.keywordIndex]], 8, false);
                    writer.writeEndElement();
                }
                if (!endProperties) {
                    writer.writeEndElement();
                }
                mVerticalMerge = this.checkMergeCell(collKey, mVerticalMerge);
                writer.writeStartElement('w', 'p', this.wNamespace);
                writer.writeEndElement();
                writer.writeEndElement();
                increment++;
            }
            return increment;
        };
        WordExport.prototype.serializeCellFormat = function (writer, cellFormat, ensureMerge, endProperties, mVerticalMerge) {
            var cell = this.blockOwner;
            var tf = this.table[index_3.tableFormatProperty[this.keywordIndex]];
            var rf = this.row[index_3.rowFormatProperty[this.keywordIndex]];
            writer.writeStartElement(undefined, 'tcPr', this.wNamespace);
            this.serializeCellWidth(writer, cellFormat);
            this.serializeCellMargins(writer, cellFormat);
            if (ensureMerge) {
                mVerticalMerge = this.serializeCellMerge(writer, cellFormat, mVerticalMerge);
                this.serializeGridSpan(writer, cell);
            }
            writer.writeStartElement(undefined, 'tcBorders', this.wNamespace);
            this.serializeBorders(writer, cellFormat[index_3.bordersProperty[this.keywordIndex]], 8, false);
            writer.writeEndElement();
            this.serializeShading(writer, cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.shadingProperty[this.keywordIndex]]);
            this.serializeTableCellDirection(writer, cellFormat);
            this.serializeCellVerticalAlign(writer, cellFormat[index_3.verticalAlignmentProperty[this.keywordIndex]]);
            if (endProperties) {
                writer.writeEndElement();
            }
            return mVerticalMerge;
        };
        WordExport.prototype.serializeCellWidth = function (writer, cf) {
            writer.writeStartElement(undefined, 'tcW', this.wNamespace);
            if (cf[index_3.preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Percent')) {
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'pct');
                writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(cf[index_3.preferredWidthProperty[this.keywordIndex]] * this.percentageFactor).toString());
            }
            else if (cf[index_3.preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Auto')) {
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'auto');
                writer.writeAttributeString(undefined, 'w', this.wNamespace, '0');
            }
            else {
                writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal(cf[index_3.preferredWidthProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeCellMerge = function (writer, cellFormat, mVerticalMerge) {
            var cell = this.blockOwner;
            var isserialized = false;
            var collKey;
            var currentIndex = cell[index_3.columnIndexProperty[this.keywordIndex]];
            var cellIndex = this.row[index_3.cellsProperty[this.keywordIndex]].indexOf(cell);
            var prevIndex = cellIndex > 0 ? this.row[index_3.cellsProperty[this.keywordIndex]][cellIndex - 1][index_3.columnIndexProperty[this.keywordIndex]] : cell[index_3.columnIndexProperty[this.keywordIndex]];
            if (cell[index_3.columnIndexProperty[this.keywordIndex]] === cellIndex) {
                collKey = cell[index_3.columnIndexProperty[this.keywordIndex]];
                isserialized = true;
            }
            else {
                isserialized = false;
            }
            if (!isserialized) {
                if (cellIndex === 0) {
                    currentIndex = cell[index_3.columnIndexProperty[this.keywordIndex]];
                    prevIndex = -1;
                }
                for (var i = prevIndex; i < currentIndex; i++) {
                    collKey = prevIndex + 1;
                    prevIndex += 1;
                    if (collKey === 0 && mVerticalMerge.containsKey(collKey)) {
                        mVerticalMerge = this.createMerge(writer, collKey, cell, mVerticalMerge);
                    }
                }
            }
            if (cellFormat[index_3.rowSpanProperty[this.keywordIndex]] > 1) {
                writer.writeStartElement(undefined, 'vMerge', this.wNamespace);
                this.spanCellFormat = cellFormat;
                mVerticalMerge.add(collKey, cellFormat[index_3.rowSpanProperty[this.keywordIndex]] - 1);
                if (cellFormat[index_3.columnSpanProperty[this.keywordIndex]] > 1) {
                    this.mGridSpans.add(collKey, cellFormat[index_3.columnSpanProperty[this.keywordIndex]]);
                }
                writer.writeAttributeString('w', 'val', this.wNamespace, 'restart');
                writer.writeEndElement();
            }
            else if (mVerticalMerge.containsKey(collKey) && isserialized) {
                mVerticalMerge = this.createMerge(writer, collKey, cell, mVerticalMerge);
            }
            return mVerticalMerge;
        };
        WordExport.prototype.createMerge = function (writer, collKey, cell, mVerticalMerge) {
            this.serializeColumnSpan(collKey, writer);
            writer.writeStartElement(undefined, 'vMerge', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, 'continue');
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'tcBorders', this.wNamespace);
            this.serializeBorders(writer, cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.bordersProperty[this.keywordIndex]], 8, false);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement('w', 'p', this.wNamespace);
            writer.writeEndElement();
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'tc', this.wNamespace);
            writer.writeStartElement(undefined, 'tcPr', this.wNamespace);
            this.serializeCellWidth(writer, cell[index_3.cellFormatProperty[this.keywordIndex]]);
            mVerticalMerge = this.checkMergeCell(collKey, mVerticalMerge);
            return mVerticalMerge;
        };
        WordExport.prototype.serializeColumnSpan = function (collKey, writer) {
            if (this.mGridSpans.keys.length > 0 && this.mGridSpans.containsKey(collKey)) {
                writer.writeStartElement(undefined, 'gridSpan', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, this.mGridSpans.get(collKey).toString());
                writer.writeEndElement();
            }
        };
        WordExport.prototype.checkMergeCell = function (collKey, mVerticalMerge) {
            if ((mVerticalMerge.get(collKey) - 1) === 0) {
                mVerticalMerge.remove(collKey);
                this.spanCellFormat = undefined;
                if (this.mGridSpans.keys.length > 0 && this.mGridSpans.containsKey(collKey)) {
                    this.mGridSpans.remove(collKey);
                }
            }
            else {
                mVerticalMerge.set(collKey, mVerticalMerge.get(collKey) - 1);
            }
            return mVerticalMerge;
        };
        WordExport.prototype.serializeGridSpan = function (writer, cell) {
            if (cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.columnSpanProperty[this.keywordIndex]] > 1) {
                var num = cell[index_3.cellFormatProperty[this.keywordIndex]][index_3.columnSpanProperty[this.keywordIndex]];
                writer.writeStartElement(undefined, 'gridSpan', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, num.toString());
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeTableCellDirection = function (writer, cellFormat) {
        };
        WordExport.prototype.serializeCellVerticalAlign = function (writer, alignment) {
            writer.writeStartElement(undefined, 'vAlign', this.wNamespace);
            switch (alignment) {
                case 'Center':
                case 1:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'center');
                    break;
                case 'Bottom':
                case 2:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'bottom');
                    break;
                default:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'top');
                    break;
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeGridColumns = function (writer, grid) {
            for (var i = 0, count = grid.length; i < count; i++) {
                var gridValue = Math.round(grid[i] * 20);
                writer.writeStartElement(undefined, 'gridCol', this.wNamespace);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, gridValue.toString());
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeTableFormat = function (writer, format, table) {
            writer.writeStartElement(undefined, 'tblPr', this.wNamespace);
            this.serializeTablePositioning(writer, table);
            this.serializeTableWidth(writer, table);
            this.serializeTableAlignment(writer, table[index_3.tableFormatProperty[this.keywordIndex]]);
            this.serializeCellSpacing(writer, table[index_3.tableFormatProperty[this.keywordIndex]]);
            this.serializeTableIndentation(writer, table[index_3.tableFormatProperty[this.keywordIndex]]);
            this.serializeTableMargins(writer, table[index_3.tableFormatProperty[this.keywordIndex]]);
            this.serializeTableBorders(writer, table[index_3.tableFormatProperty[this.keywordIndex]]);
            this.serializeShading(writer, table[index_3.tableFormatProperty[this.keywordIndex]][index_3.shadingProperty[this.keywordIndex]]);
            if (index_1.HelperMethods.parseBoolValue(table[index_3.tableFormatProperty[this.keywordIndex]][index_3.bidiProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'bidiVisual', this.wNamespace);
                writer.writeEndElement();
            }
            this.serializeTblLayout(writer, table[index_3.tableFormatProperty[this.keywordIndex]]);
            if (!ej2_base_1.isNullOrUndefined(table)) {
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeTablePositioning = function (writer, table) {
            if (index_1.HelperMethods.parseBoolValue(table[index_3.wrapTextAroundProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'tblpPr', this.wNamespace);
                if (table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceLeftProperty[this.keywordIndex]] > 0) {
                    var left = Math.round(table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceLeftProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'leftFromText', this.wNamespace, left);
                }
                if (table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceRightProperty[this.keywordIndex]] > 0) {
                    var right = Math.round(table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceRightProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'rightFromText', this.wNamespace, right);
                }
                if (table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceTopProperty[this.keywordIndex]] > 0) {
                    var top_1 = Math.round(table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceTopProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'topFromText', this.wNamespace, top_1);
                }
                if (table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceBottomProperty[this.keywordIndex]] > 0) {
                    var bottom = Math.round(table[index_3.positioningProperty[this.keywordIndex]][index_3.distanceBottomProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'bottomFromText', this.wNamespace, bottom);
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalOriginProperty[this.keywordIndex]])) {
                    var verticalOrigin = table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalOriginProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Paragraph') ? 'text' : this.keywordIndex == 1 ? this.getTableVerticalRelation(table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalOriginProperty[this.keywordIndex]]).toLowerCase() : this.getTableVerticalRelation(this.getTableVerticalRelationEnumValue(table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalOriginProperty[this.keywordIndex]])).toLowerCase();
                    writer.writeAttributeString('w', 'vertAnchor', this.wNamespace, verticalOrigin);
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalOriginProperty[this.keywordIndex]]) && table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalOriginProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'Column')) {
                    var horizontalOrigin = this.keywordIndex == 1 ? this.getTableHorizontalRelation(table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalOriginProperty[this.keywordIndex]]).toLowerCase() : table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalOriginProperty[this.keywordIndex]].toLowerCase();
                    writer.writeAttributeString('w', 'horzAnchor', this.wNamespace, horizontalOrigin);
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalAlignmentProperty[this.keywordIndex]]) && table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalAlignmentProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'Left')) {
                    var horizontalAlignment = this.keywordIndex == 1 ? this.getTableHorizontalAlignment(table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalAlignmentProperty[this.keywordIndex]]) : table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalAlignmentProperty[this.keywordIndex]].toLowerCase();
                    writer.writeAttributeString('w', 'tblpXSpec', this.wNamespace, horizontalAlignment);
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalAlignmentProperty[this.keywordIndex]]) && table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalAlignmentProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'None')) {
                    var verticalAlignment = this.keywordIndex == 1 ? this.getTableVerticalAlignment(table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalAlignmentProperty[this.keywordIndex]]) : table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalAlignmentProperty[this.keywordIndex]].toLowerCase();
                    writer.writeAttributeString('w', 'tblpYSpec', this.wNamespace, verticalAlignment);
                }
                if (((!ej2_base_1.isNullOrUndefined(table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalAlignmentProperty[this.keywordIndex]]) && table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Left'))
                    || !table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalAlignmentProperty[this.keywordIndex]])
                    && table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalPositionProperty[this.keywordIndex]] > 0) {
                    var horizontalPosition = Math.round(table[index_3.positioningProperty[this.keywordIndex]][index_3.horizontalPositionProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'tblpX', this.wNamespace, horizontalPosition);
                }
                if (!ej2_base_1.isNullOrUndefined(table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalAlignmentProperty[this.keywordIndex]]) && table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalAlignmentProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'None')) {
                    var verticalPosition = Math.round(table[index_3.positioningProperty[this.keywordIndex]][index_3.verticalPositionProperty[this.keywordIndex]] * this.twipsInOnePoint).toString();
                    writer.writeAttributeString('w', 'tblpY', this.wNamespace, verticalPosition);
                }
                writer.writeEndElement();
                if (!index_1.HelperMethods.parseBoolValue(table[index_3.positioningProperty[this.keywordIndex]][index_3.allowOverlapProperty[this.keywordIndex]])) {
                    writer.writeStartElement('w', 'tblOverlap', this.wNamespace);
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'never');
                    writer.writeEndElement();
                }
            }
            if (!ej2_base_1.isNullOrUndefined(table[index_3.descriptionProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'tblDescription', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, table[index_3.descriptionProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(table[index_3.titleProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'tblCaption', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, table[index_3.titleProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeTableMargins = function (writer, format) {
            this.serializeMargins(writer, format, 'tblCellMar');
        };
        WordExport.prototype.serializeRowMargins = function (writer, format) {
            writer.writeStartElement(undefined, 'tblPrEx', this.wNamespace);
            writer.writeStartElement(undefined, 'tblBorders', this.wNamespace);
            this.serializeBorders(writer, format[index_3.bordersProperty[this.keywordIndex]], 8, false);
            writer.writeEndElement();
            this.serializeMargins(writer, format, 'tblCellMar');
            writer.writeEndElement();
        };
        WordExport.prototype.serializeCellMargins = function (writer, format) {
            this.serializeMargins(writer, format, 'tcMar');
        };
        WordExport.prototype.serializeMargins = function (writer, format, tag) {
            writer.writeStartElement(undefined, tag, this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(format[index_3.topMarginProperty[this.keywordIndex]])) {
                var topMargin = Math.round(format[index_3.topMarginProperty[this.keywordIndex]] * 20);
                writer.writeStartElement(undefined, 'top', this.wNamespace);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, topMargin.toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(format[index_3.leftMarginProperty[this.keywordIndex]])) {
                var leftMargin = Math.round(format[index_3.leftMarginProperty[this.keywordIndex]] * 20);
                writer.writeStartElement(undefined, 'left', this.wNamespace);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, leftMargin.toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(format[index_3.bottomMarginProperty[this.keywordIndex]])) {
                var bottomMargin = Math.round(format[index_3.bottomMarginProperty[this.keywordIndex]] * 20);
                writer.writeStartElement(undefined, 'bottom', this.wNamespace);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, bottomMargin.toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(format[index_3.rightMarginProperty[this.keywordIndex]])) {
                var rightMargin = Math.round(format[index_3.rightMarginProperty[this.keywordIndex]] * 20);
                writer.writeStartElement(undefined, 'right', this.wNamespace);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, rightMargin.toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeShading = function (writer, format) {
            writer.writeStartElement(undefined, 'shd', this.wNamespace);
            if (format[index_3.backgroundColorProperty[this.keywordIndex]] && format[index_3.backgroundColorProperty[this.keywordIndex]] !== 'empty') {
                writer.writeAttributeString(undefined, 'fill', this.wNamespace, this.getColor(format[index_3.backgroundColorProperty[this.keywordIndex]]));
            }
            else {
                writer.writeAttributeString(undefined, 'fill', this.wNamespace, 'auto');
            }
            if (format[index_3.foregroundColorProperty[this.keywordIndex]] === 'empty' || ej2_base_1.isNullOrUndefined(format[index_3.foregroundColorProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'color', this.wNamespace, 'auto');
            }
            else {
                writer.writeAttributeString(undefined, 'color', this.wNamespace, this.getColor(format[index_3.foregroundColorProperty[this.keywordIndex]]));
            }
            if (!ej2_base_1.isNullOrUndefined(format[index_3.textureProperty[this.keywordIndex]])) {
                writer.writeAttributeString('w', 'val', this.wNamespace, this.getTextureStyle(format[index_3.textureProperty[this.keywordIndex]]));
            }
            writer.writeEndElement();
        };
        WordExport.prototype.getTextureStyle = function (textureStyle) {
            switch (textureStyle) {
                case 'Texture5Percent':
                case 'Texture2Pt5Percent':
                case 'Texture7Pt5Percent':
                case 1:
                case 2:
                case 3:
                    return 'pct5';
                case 'Texture10Percent':
                case 4:
                    return 'pct10';
                case 'Texture12Pt5Percent':
                case 5:
                    return 'pct12';
                case 'Texture15Percent':
                case 'Texture17Pt5Percent':
                case 6:
                case 7:
                    return 'pct15';
                case 'Texture20Percent':
                case 'Texture22Pt5Percent':
                case 8:
                case 9:
                    return 'pct20';
                case 'Texture25Percent':
                case 'Texture27Pt5Percent':
                case 10:
                case 11:
                    return 'pct25';
                case 'Texture30Percent':
                case 'Texture32Pt5Percent':
                case 12:
                case 13:
                    return 'pct30';
                case 'Texture35Percent':
                case 14:
                    return 'pct35';
                case 'Texture37Pt5Percent':
                case 15:
                    return 'pct37';
                case 'Texture40Percent':
                case 'Texture42Pt5Percent':
                case 16:
                case 17:
                    return 'pct40';
                case 'Texture45Percent':
                case 'Texture47Pt5Percent':
                case 18:
                case 19:
                    return 'pct45';
                case 'Texture50Percent':
                case 'Texture52Pt5Percent':
                case 20:
                case 21:
                    return 'pct50';
                case 'Texture55Percent':
                case 'Texture57Pt5Percent':
                case 22:
                case 23:
                    return 'pct55';
                case 'Texture60Percent':
                case 24:
                    return 'pct60';
                case 'Texture62Pt5Percent':
                case 25:
                    return 'pct62';
                case 'Texture65Percent':
                case 'Texture67Pt5Percent':
                case 26:
                case 27:
                    return 'pct65';
                case 'Texture70Percent':
                case 'Texture72Pt5Percent':
                case 28:
                case 29:
                    return 'pct70';
                case 'Texture75Percent':
                case 'Texture77Pt5Percent':
                case 30:
                case 31:
                    return 'pct75';
                case 'Texture80Percent':
                case 'Texture82Pt5Percent':
                case 32:
                case 33:
                    return 'pct80';
                case 'Texture85Percent':
                case 34:
                    return 'pct85';
                case 'Texture87Pt5Percent':
                case 35:
                    return 'pct87';
                case 'Texture90Percent':
                case 'Texture92Pt5Percent':
                case 36:
                case 37:
                    return 'pct90';
                case 'Texture95Percent':
                case 'Texture97Pt5Percent':
                case 38:
                case 39:
                    return 'pct95';
                case 40:
                    return 'solid';
                case 'TextureCross':
                    return 'thinHorzCross';
                case 'TextureDarkCross':
                    return 'horzCross';
                case 'TextureDarkDiagonalCross':
                    return 'diagCross';
                case 'TextureDarkDiagonalDown':
                    return 'reverseDiagStripe';
                case 'TextureDarkDiagonalUp':
                    return 'diagStripe';
                case 'TextureDarkHorizontal':
                case 41:
                    return 'horzStripe';
                case 'TextureDarkVertical':
                case 42:
                    return 'vertStripe';
                case 43:
                    return 'reverseDiagStripe';
                case 44:
                    return 'diagStripe';
                case 45:
                    return 'horzCross';
                case 46:
                    return 'diagCross';
                case 'TextureDiagonalCross':
                    return 'thinDiagCross';
                case 'TextureDiagonalDown':
                    return 'thinReverseDiagStripe';
                case 'TextureDiagonalUp':
                    return 'thinDiagStripe';
                case 'TextureHorizontal':
                case 47:
                    return 'thinHorzStripe';
                case 'TextureSolid':
                    return 'solid';
                case 'TextureVertical':
                case 48:
                    return 'thinVertStripe';
                case 49:
                    return 'thinReverseDiagStripe';
                case 50:
                    return 'thinDiagStripe';
                case 51:
                    return 'thinHorzCross';
                case 52:
                    return 'thinDiagCross';
                default:
                    return 'clear';
            }
        };
        WordExport.prototype.serializeParagraphBorders = function (writer, formatPara) {
            var borders = formatPara[index_3.bordersProperty[this.keywordIndex]];
            if (ej2_base_1.isNullOrUndefined(borders)) {
                return;
            }
            writer.writeStartElement(undefined, 'pBdr', this.wNamespace);
            this.serializeBorders(writer, formatPara[index_3.bordersProperty[this.keywordIndex]], 8, true);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeTableBorders = function (writer, format) {
            var borders = format[index_3.bordersProperty[this.keywordIndex]];
            if (ej2_base_1.isNullOrUndefined(borders)) {
                return;
            }
            writer.writeStartElement(undefined, 'tblBorders', this.wNamespace);
            this.serializeBorders(writer, format[index_3.bordersProperty[this.keywordIndex]], 8, false);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeBorders = function (writer, borders, multipler, isParagraphBorder) {
            this.serializeBorder(writer, borders[index_3.topProperty[this.keywordIndex]], 'top', multipler);
            this.serializeBorder(writer, borders[index_3.leftProperty[this.keywordIndex]], 'left', multipler);
            this.serializeBorder(writer, borders[index_3.bottomProperty[this.keywordIndex]], 'bottom', multipler);
            this.serializeBorder(writer, borders[index_3.rightProperty[this.keywordIndex]], 'right', multipler);
            if (isParagraphBorder) {
                this.serializeBorder(writer, borders[index_3.horizontalProperty[this.keywordIndex]], 'between', multipler);
                this.serializeBorder(writer, borders[index_3.verticalProperty[this.keywordIndex]], 'bar', multipler);
            }
            else {
                this.serializeBorder(writer, borders[index_3.horizontalProperty[this.keywordIndex]], 'insideH', multipler);
                this.serializeBorder(writer, borders[index_3.verticalProperty[this.keywordIndex]], 'insideV', multipler);
                this.serializeBorder(writer, borders[index_3.diagonalDownProperty[this.keywordIndex]], 'tl2br', multipler);
                this.serializeBorder(writer, borders[index_3.diagonalUpProperty[this.keywordIndex]], 'tr2bl', multipler);
            }
        };
        WordExport.prototype.serializeTblLayout = function (writer, format) {
            if (!index_1.HelperMethods.parseBoolValue(format[index_3.allowAutoFitProperty[this.keywordIndex]]) || format[index_3.preferredWidthProperty[this.keywordIndex]] > this.containerWidth) {
                writer.writeStartElement(undefined, 'tblLayout', this.wNamespace);
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'fixed');
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeBorder = function (writer, border, tagName, multiplier) {
            var borderStyle = border[index_3.lineStyleProperty[this.keywordIndex]];
            var sz = ((border[index_3.lineWidthProperty[this.keywordIndex]] ? border[index_3.lineWidthProperty[this.keywordIndex]] : 0) * multiplier);
            var space = border[index_3.spaceProperty[this.keywordIndex]] ? border[index_3.spaceProperty[this.keywordIndex]] : 0;
            if (borderStyle === (this.keywordIndex == 1 ? 26 : 'Cleared')) {
                writer.writeStartElement(undefined, tagName, this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, 'nil');
                writer.writeEndElement();
                return;
            }
            else if (((borderStyle === (this.keywordIndex == 1 ? 1 : 'None') || ej2_base_1.isNullOrUndefined(borderStyle)) && !index_1.HelperMethods.parseBoolValue(border[index_3.hasNoneStyleProperty[this.keywordIndex]])) || (sz < 0 && !index_1.HelperMethods.parseBoolValue(border[index_3.hasNoneStyleProperty[this.keywordIndex]]))) {
                return;
            }
            writer.writeStartElement(undefined, tagName, this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, this.getBorderStyle(borderStyle));
            if (border[index_3.colorProperty[this.keywordIndex]]) {
                writer.writeAttributeString(undefined, 'color', this.wNamespace, this.getColor(border[index_3.colorProperty[this.keywordIndex]]));
            }
            writer.writeAttributeString(undefined, 'sz', this.wNamespace, this.roundToTwoDecimal(sz).toString());
            writer.writeAttributeString(undefined, 'space', this.wNamespace, space.toString());
            if (index_1.HelperMethods.parseBoolValue(border[index_3.shadowProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'shadow', this.wNamespace, 'on');
            }
            writer.writeEndElement();
        };
        WordExport.prototype.getBorderStyle = function (borderStyle) {
            switch (borderStyle) {
                case 'Cleared':
                    return 'cleared';
                case 'None':
                case 1:
                    return 'None';
                case 'DashSmallGap':
                    return 'dashSmallGap';
                case 'Triple':
                    return 'triple';
                case 'Dot':
                case 2:
                    return 'dotted';
                case 3:
                    return 'dashSmallGap';
                case 'DashDot':
                    return 'dotDash';
                case 'DashLargeGap':
                case 4:
                    return 'dashed';
                case 5:
                    return 'dotDash';
                case 'DashDotDot':
                case 6:
                    return 'dotDotDash';
                case 'Double':
                case 7:
                    return 'double';
                case 8:
                    return 'triple';
                case 'ThinThickSmallGap':
                case 9:
                    return 'thinThickSmallGap';
                case 'ThickThinSmallGap':
                case 10:
                    return 'thickThinSmallGap';
                case 'ThinThickThinSmallGap':
                case 11:
                    return 'thinThickThinSmallGap';
                case 'ThickThinMediumGap':
                case 12:
                    return 'thickThinMediumGap';
                case 'ThinThickMediumGap':
                case 13:
                    return 'thinThickMediumGap';
                case 'ThinThickThinMediumGap':
                case 14:
                    return 'thinThickThinMediumGap';
                case 'ThickThinLargeGap':
                    return 'thickThinLargeGap';
                case 'ThinThickLargeGap':
                case 15:
                    return 'thinThickLargeGap';
                case 16:
                    return 'thickThinLargeGap';
                case 'ThinThickThinLargeGap':
                case 17:
                    return 'thinThickThinLargeGap';
                case 'Thick':
                    return 'thick';
                case 'SingleWavy':
                case 18:
                    return 'wave';
                case 'DoubleWavy':
                case 19:
                    return 'doubleWave';
                case 'DashDotStroked':
                case 20:
                    return 'dashDotStroked';
                case 'Engrave3D':
                    return 'threeDEngrave';
                case 'Emboss3D':
                case 21:
                    return 'threeDEmboss';
                case 22:
                    return 'threeDEngrave';
                case 'Outset':
                case 23:
                    return 'outset';
                case 'Inset':
                case 24:
                    return 'inset';
                case 25:
                    return 'thick';
                case 26:
                    return 'cleared';
                default:
                    return 'single';
            }
        };
        WordExport.prototype.serializeTableIndentation = function (writer, format) {
            if (!ej2_base_1.isNullOrUndefined(format[index_3.leftIndentProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'tblInd', this.wNamespace);
                var tableIndent = Math.round(format[index_3.leftIndentProperty[this.keywordIndex]] * this.twipsInOnePoint);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, tableIndent.toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeCellSpacing = function (writer, format) {
            if (!ej2_base_1.isNullOrUndefined(format[index_3.cellSpacingProperty[this.keywordIndex]]) && format[index_3.cellSpacingProperty[this.keywordIndex]] > 0) {
                writer.writeStartElement(undefined, 'tblCellSpacing', this.wNamespace);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, this.roundToTwoDecimal((format[index_3.cellSpacingProperty[this.keywordIndex]] / 2) * this.twentiethOfPoint).toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeTableWidth = function (writer, table) {
            writer.writeStartElement(undefined, 'tblW', this.wNamespace);
            if (table[index_3.tableFormatProperty[this.keywordIndex]][index_3.preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Percent')) {
                var tableWidth = Math.round(table[index_3.tableFormatProperty[this.keywordIndex]][index_3.preferredWidthProperty[this.keywordIndex]] * this.percentageFactor);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, tableWidth.toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'pct');
            }
            else if (table[index_3.tableFormatProperty[this.keywordIndex]][index_3.preferredWidthTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Point')) {
                var tableWidth = Math.round(table[index_3.tableFormatProperty[this.keywordIndex]][index_3.preferredWidthProperty[this.keywordIndex]] * this.twipsInOnePoint);
                writer.writeAttributeString(undefined, 'w', this.wNamespace, tableWidth.toString());
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'dxa');
            }
            else {
                writer.writeAttributeString(undefined, 'w', this.wNamespace, '0');
                writer.writeAttributeString(undefined, 'type', this.wNamespace, 'auto');
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeTableAlignment = function (writer, format) {
            writer.writeStartElement(undefined, 'jc', this.wNamespace);
            switch (format[index_3.tableAlignmentProperty[this.keywordIndex]]) {
                case 'Right':
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'right');
                    break;
                case 'Center':
                case 1:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'center');
                    break;
                case 2:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'right');
                    break;
                default:
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'left');
                    break;
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeFieldCharacter = function (writer, field) {
            writer.writeStartElement(undefined, 'r', this.wNamespace);
            this.serializeCharacterFormat(writer, field[index_3.characterFormatProperty[this.keywordIndex]]);
            writer.writeStartElement(undefined, 'fldChar', this.wNamespace);
            var type = field[index_3.fieldTypeProperty[this.keywordIndex]] === 0 ? 'begin'
                : field[index_3.fieldTypeProperty[this.keywordIndex]] === 1 ? 'end' : 'separate';
            writer.writeAttributeString(undefined, 'fldCharType', this.wNamespace, type);
            if (type === 'begin' && !ej2_base_1.isNullOrUndefined(field[index_3.formFieldDataProperty[this.keywordIndex]])) {
                var formFieldData = field[index_3.formFieldDataProperty[this.keywordIndex]];
                writer.writeStartElement(undefined, 'ffData', this.wNamespace);
                writer.writeStartElement(undefined, 'name', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[index_3.nameProperty[this.keywordIndex]]);
                writer.writeEndElement();
                writer.writeStartElement(undefined, 'enabled', this.wNamespace);
                writer.writeEndElement();
                if (formFieldData.hasOwnProperty(index_3.textInputProperty[this.keywordIndex])) {
                    writer.writeStartElement(undefined, 'textInput', this.wNamespace);
                    var type_1 = this.keywordIndex == 1 ? this.getTextFormFieldType(formFieldData[index_3.textInputProperty[this.keywordIndex]][index_3.typeProperty[this.keywordIndex]]) : formFieldData[index_3.textInputProperty[this.keywordIndex]][index_3.typeProperty[this.keywordIndex]].toString();
                    if (type_1 === 'Number' || 'Date') {
                        writer.writeStartElement(undefined, 'type', this.wNamespace);
                        writer.writeAttributeString(undefined, 'val', this.wNamespace, type_1 == 'Calculation' ? 'calculated' : type_1.toLowerCase());
                        writer.writeEndElement();
                    }
                    writer.writeStartElement(undefined, 'default', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[index_3.textInputProperty[this.keywordIndex]][index_3.defaultValueProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                    writer.writeStartElement(undefined, 'format', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, this.keywordIndex == 1 && type_1 === 'Text' ? this.getTextFormFieldFormat(formFieldData[index_3.textInputProperty[this.keywordIndex]][index_3.formatProperty[this.keywordIndex]]) : formFieldData[index_3.textInputProperty[this.keywordIndex]][index_3.formatProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                    writer.writeEndElement();
                }
                else if (formFieldData.hasOwnProperty(index_3.checkBoxProperty[this.keywordIndex])) {
                    writer.writeStartElement(undefined, 'checkBox', this.wNamespace);
                    if (formFieldData[index_3.checkBoxProperty[this.keywordIndex]][index_3.sizeTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Auto')) {
                        writer.writeStartElement(undefined, 'sizeAuto', this.wNamespace);
                        writer.writeEndElement();
                    }
                    else {
                        writer.writeStartElement(undefined, 'size', this.wNamespace);
                        writer.writeAttributeString(undefined, 'val', this.wNamespace, this.roundToTwoDecimal(formFieldData[index_3.checkBoxProperty[this.keywordIndex]][index_3.sizeProperty[this.keywordIndex]] * 2).toString());
                        writer.writeEndElement();
                    }
                    writer.writeStartElement(undefined, 'defalut', this.wNamespace);
                    writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[index_3.checkBoxProperty[this.keywordIndex]][index_3.defaultValueProperty[this.keywordIndex]] ? '1' : '0');
                    writer.writeEndElement();
                    if (formFieldData[index_3.checkBoxProperty[this.keywordIndex]][index_3.checkedProperty[this.keywordIndex]]) {
                        writer.writeStartElement(undefined, 'checked', this.wNamespace);
                        writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[index_3.checkBoxProperty[this.keywordIndex]][index_3.checkedProperty[this.keywordIndex]] ? '1' : '0');
                        writer.writeEndElement();
                    }
                    writer.writeEndElement();
                }
                else {
                    writer.writeStartElement(undefined, 'ddList', this.wNamespace);
                    if (formFieldData[index_3.dropDownListProperty[this.keywordIndex]][index_3.selectedIndexProperty[this.keywordIndex]] !== 0) {
                        writer.writeStartElement(undefined, 'result', this.wNamespace);
                        writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[index_3.dropDownListProperty[this.keywordIndex]][index_3.selectedIndexProperty[this.keywordIndex]].toString());
                        writer.writeEndElement();
                    }
                    for (var i = 0; i < formFieldData[index_3.dropDownListProperty[this.keywordIndex]][index_3.dropDownItemsProperty[this.keywordIndex]].length; i++) {
                        writer.writeStartElement(undefined, 'listEntry', this.wNamespace);
                        writer.writeAttributeString(undefined, 'val', this.wNamespace, formFieldData[index_3.dropDownListProperty[this.keywordIndex]][index_3.dropDownItemsProperty[this.keywordIndex]][i].toString());
                        writer.writeEndElement();
                    }
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
            writer.writeEndElement();
            writer.writeEndElement();
            if (field[index_3.fieldTypeProperty[this.keywordIndex]] === 0 && field[index_3.fieldTypeProperty[this.keywordIndex]] === 'FieldFormTextInput') {
                writer.writeStartElement('w', 'r', this.wNamespace);
                writer.writeStartElement(undefined, 'instrText', this.wNamespace);
                writer.writeAttributeString('xml', 'space', this.xmlNamespace, 'preserve');
                writer.writeString('FORMTEXT');
                writer.writeEndElement();
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeTextRange = function (writer, span, previousNode, efType) {
            writer.writeStartElement('w', 'r', this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(span[index_3.characterFormatProperty[this.keywordIndex]])) {
                this.serializeCharacterFormat(writer, span[index_3.characterFormatProperty[this.keywordIndex]]);
            }
            if (span[index_3.textProperty[this.keywordIndex]] === '\t') {
                writer.writeElementString(undefined, 'tab', this.wNamespace, undefined);
            }
            else if (span[index_3.textProperty[this.keywordIndex]] === '\v') {
                writer.writeElementString(undefined, 'br', this.wNamespace, undefined);
            }
            else if (!ej2_base_1.isNullOrUndefined(span[index_3.breakClearTypeProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'br', this.wNamespace);
                writer.writeAttributeString('w', 'type', this.wNamespace, "textWrapping");
                writer.writeAttributeString('w', 'clear', this.wNamespace, this.getBreakClearType(span[index_3.breakClearTypeProperty[this.keywordIndex]]).toString().toLowerCase());
                writer.writeEndElement();
            }
            else if (span[index_3.textProperty[this.keywordIndex]] === '\f') {
                writer.writeStartElement(undefined, 'br', this.wNamespace);
                writer.writeAttributeString('w', 'type', this.wNamespace, 'page');
                writer.writeEndElement();
            }
            else if (span[index_3.textProperty[this.keywordIndex]] === '\r') {
                writer.writeStartElement('w', 'cr', this.wNamespace);
                writer.writeEndElement();
            }
            else if (span[index_3.textProperty[this.keywordIndex]] === String.fromCharCode(14)) {
                writer.writeStartElement(undefined, 'br', this.wNamespace);
                writer.writeAttributeString('w', 'type', this.wNamespace, 'column');
                writer.writeEndElement();
            }
            else if (encodeURI(span[index_3.textProperty[this.keywordIndex]]) === '%02') {
                writer.writeStartElement(undefined, 'footnoteRef', this.wNamespace);
                writer.writeEndElement();
            }
            else if (encodeURI(span[index_3.textProperty[this.keywordIndex]]) === '%02' && efType === 'endnote') {
                writer.writeStartElement(undefined, 'endnoteRef', this.wNamespace);
                writer.writeEndElement();
            }
            else if (encodeURI(span[index_3.textProperty[this.keywordIndex]]) === '%03') {
                writer.writeStartElement(undefined, 'separator', this.wNamespace);
                writer.writeEndElement();
            }
            else if (encodeURI(span[index_3.textProperty[this.keywordIndex]]) === '%04') {
                writer.writeStartElement(undefined, 'continuationSeparator', this.wNamespace);
                writer.writeEndElement();
            }
            else {
                var isDeleteText = this.retrieveDeleteRevision(span);
                var isField = !ej2_base_1.isNullOrUndefined(previousNode)
                    && previousNode.hasOwnProperty(index_3.fieldTypeProperty[this.keywordIndex]) && previousNode[index_3.fieldTypeProperty[this.keywordIndex]] !== 2;
                var localName = isField ? isDeleteText ? 'delInstrText' : 'instrText' : isDeleteText ? 'delText' : 't';
                writer.writeStartElement(undefined, localName, this.wNamespace);
                writer.writeAttributeString('xml', 'space', this.xmlNamespace, 'preserve');
                writer.writeString(span[index_3.textProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.retrieveDeleteRevision = function (span) {
            if (span.hasOwnProperty(index_3.revisionIdsProperty[this.keywordIndex])) {
                if (span[index_3.revisionIdsProperty[this.keywordIndex]].length > 0) {
                    for (var i = 0; i < span[index_3.revisionIdsProperty[this.keywordIndex]].length; i++) {
                        if (this.retrieveRevision(span[index_3.revisionIdsProperty[this.keywordIndex]][i]).revisionType === 'Deletion') {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        WordExport.prototype.serializeParagraphFormat = function (writer, paragraphFormat, paragraph, keyindex) {
            if (ej2_base_1.isNullOrUndefined(paragraphFormat)) {
                return;
            }
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = keyindex;
            }
            this.serializeParagraphBorders(writer, paragraphFormat);
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.styleNameProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'pStyle', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, paragraphFormat[index_3.styleNameProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(paragraph)) {
                this.serializeListFormat(writer, paragraph[index_3.paragraphFormatProperty[this.keywordIndex]][index_3.listFormatProperty[this.keywordIndex]]);
            }
            else {
                this.serializeListFormat(writer, paragraphFormat[index_3.listFormatProperty[this.keywordIndex]]);
            }
            if (index_1.HelperMethods.parseBoolValue(paragraphFormat[index_3.bidiProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'bidi', this.wNamespace);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.keepWithNextProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'keepNext', this.wNamespace);
                if (!index_1.HelperMethods.parseBoolValue(paragraphFormat[index_3.keepWithNextProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, '0');
                }
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.keepLinesTogetherProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'keepLines', this.wNamespace);
                if (!index_1.HelperMethods.parseBoolValue(paragraphFormat[index_3.keepLinesTogetherProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, '0');
                }
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.outlineLevelProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'outlineLvl', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, this.getOutlineLevelValue(paragraphFormat[index_3.outlineLevelProperty[this.keywordIndex]]).toString());
                writer.writeEndElement();
            }
            this.serializeParagraphSpacing(writer, paragraphFormat);
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.contextualSpacingProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'contextualSpacing', this.wNamespace);
                if (!index_1.HelperMethods.parseBoolValue(paragraphFormat[index_3.contextualSpacingProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, '0');
                }
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.widowControlProperty[this.keywordIndex]])) {
                writer.writeStartElement('w', 'widowControl', this.wNamespace);
                if (index_1.HelperMethods.parseBoolValue(paragraphFormat[index_3.widowControlProperty[this.keywordIndex]])) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, '1');
                }
                else {
                    writer.writeAttributeString('w', 'val', this.wNamespace, '0');
                }
                writer.writeEndElement();
            }
            this.serializeIndentation(writer, paragraphFormat);
            this.serializeParagraphAlignment(writer, paragraphFormat[index_3.textAlignmentProperty[this.keywordIndex]], index_1.HelperMethods.parseBoolValue(paragraphFormat[index_3.bidiProperty[this.keywordIndex]]));
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.tabsProperty[this.keywordIndex]]) && paragraphFormat[index_3.tabsProperty[this.keywordIndex]].length > 0) {
                this.serializeTabs(writer, paragraphFormat[index_3.tabsProperty[this.keywordIndex]]);
            }
        };
        WordExport.prototype.getOutlineLevelValue = function (outlineLvl) {
            if (this.keywordIndex == 1) {
                if (outlineLvl > 0) {
                    return outlineLvl - 1;
                }
            }
            else {
                if (outlineLvl.toString().indexOf('Level') !== -1) {
                    var lvlNumber = parseInt(outlineLvl.toString().substring(5), 10);
                    if (lvlNumber > 0) {
                        return lvlNumber - 1;
                    }
                }
            }
            return 9;
        };
        WordExport.prototype.serializeTabs = function (writer, tabStops) {
            writer.writeStartElement('w', 'tabs', this.wNamespace);
            for (var i = 0; i < tabStops.length; i++) {
                this.serializeTab(writer, tabStops[i]);
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeTab = function (writer, tabStop) {
            var position = 0;
            writer.writeStartElement('w', 'tab', this.wNamespace);
            if (tabStop[index_3.positionProperty[this.keywordIndex]] === 0 && tabStop[index_3.deletePositionProperty[this.keywordIndex]] !== 0) {
                position = tabStop[index_3.deletePositionProperty[this.keywordIndex]] * this.twentiethOfPoint;
                writer.writeAttributeString('w', 'val', this.wNamespace, 'clear');
            }
            else {
                position = tabStop[index_3.positionProperty[this.keywordIndex]] * this.twentiethOfPoint;
                writer.writeAttributeString('w', 'val', this.wNamespace, this.getTabJustification(tabStop[index_3.tabJustificationProperty[this.keywordIndex]]));
            }
            if (!ej2_base_1.isNullOrUndefined(tabStop[index_3.tabLeaderProperty[this.keywordIndex]]) && (tabStop[index_3.tabLeaderProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'None'))) {
                writer.writeAttributeString('w', 'leader', this.wNamespace, this.getTabLeader(tabStop[index_3.tabLeaderProperty[this.keywordIndex]]));
            }
            if (!isNaN(position)) {
                writer.writeAttributeString('w', 'pos', this.wNamespace, position.toString() + '');
            }
            writer.writeEndElement();
        };
        WordExport.prototype.getTextWrappingType = function (textWrappingType) {
            switch (textWrappingType) {
                case 0:
                    return 'bothSides';
                case 1:
                    return 'left';
                case 2:
                    return 'right';
                case 3:
                    return 'largest';
                default:
                    return 'bothSides';
            }
        };
        WordExport.prototype.getTextWrappingStyle = function (textWrappingStyle) {
            switch (textWrappingStyle) {
                case 1:
                    return 'InFrontOfText';
                case 2:
                    return 'Square';
                case 3:
                    return 'TopAndBottom';
                case 4:
                    return 'Behind';
                default:
                    return 'Inline';
            }
        };
        WordExport.prototype.getDateStorageFormat = function (dateStorageFormat) {
            switch (dateStorageFormat) {
                case 2:
                    return 'DateStorageDateTime';
                case 3:
                    return 'DateStorageText';
                default:
                    return 'DateStorageDate';
            }
        };
        WordExport.prototype.getDateCalendarType = function (dateCalendarType) {
            switch (dateCalendarType) {
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
                    return 'Gregorian';
            }
        };
        WordExport.prototype.getContentControlAppearance = function (contentControlAppearance) {
            switch (contentControlAppearance) {
                case 2:
                    return 'Hidden';
                case 3:
                    return 'Tags';
                default:
                    return 'BoundingBox';
            }
        };
        WordExport.prototype.getTextFormFieldFormat = function (textFormFieldFormat) {
            switch (textFormFieldFormat) {
                case 1:
                    return 'FirstCapital';
                case 2:
                    return 'Lowercase';
                case 3:
                    return 'Uppercase';
                case 4:
                    return 'Titlecase';
                default:
                    return 'None';
            }
        };
        WordExport.prototype.getTextFormFieldType = function (textFormFieldType) {
            switch (textFormFieldType) {
                case 1:
                    return 'Number';
                case 2:
                    return 'Date';
                case 3:
                    return 'Calculation';
                default:
                    return 'Text';
            }
        };
        WordExport.prototype.getTabLeader = function (tabLeader) {
            switch (tabLeader) {
                case 'Dot':
                case 2:
                    return 'dot';
                case 'Hyphen':
                case 3:
                    return 'hyphen';
                case 'Underscore':
                case 4:
                    return 'underscore';
                default:
                    return 'none';
            }
        };
        WordExport.prototype.getTabJustification = function (tabJustification) {
            switch (tabJustification) {
                case 'Bar':
                case 0:
                    return 'left';
                case 1:
                    return 'bar';
                case 'Center':
                case 2:
                    return 'center';
                case 'Decimal':
                case 3:
                    return 'decimal';
                case 'Left':
                    return 'left';
                case 'List':
                case 4:
                    return 'num';
                case 'Right':
                case 5:
                    return 'right';
                default:
                    return 'clear';
            }
        };
        WordExport.prototype.getTableVerticalAlignment = function (tableVerticalPosition) {
            switch (tableVerticalPosition) {
                case 1:
                    return 'top';
                case 2:
                    return 'center';
                case 3:
                    return 'bottom';
                case 4:
                    return 'inside';
                case 5:
                    return 'outside';
                default:
                    return 'none';
            }
        };
        WordExport.prototype.getTableHorizontalAlignment = function (tableHorizontalPosition) {
            switch (tableHorizontalPosition) {
                case 1:
                    return 'center';
                case 2:
                    return 'inside';
                case 3:
                    return 'outside';
                case 4:
                    return 'right';
                default:
                    return 'left';
            }
        };
        WordExport.prototype.getTableVerticalRelationEnumValue = function (tableRelation) {
            switch (tableRelation) {
                case 'Paragraph':
                    return 0;
                case 'Margin':
                    return 1;
                case 'Page':
                    return 2;
                default:
                    return 0;
            }
        };
        WordExport.prototype.getTableVerticalRelation = function (tableRelation) {
            switch (tableRelation) {
                case 1:
                    return 'Margin';
                case 2:
                    return 'Page';
                default:
                    return 'Paragraph';
            }
        };
        WordExport.prototype.getTableHorizontalRelation = function (tableRelation) {
            switch (tableRelation) {
                case 1:
                    return 'Margin';
                case 2:
                    return 'Page';
                default:
                    return 'Column';
            }
        };
        WordExport.prototype.getVerticalOrigin = function (verticalOrigin) {
            switch (verticalOrigin) {
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
                    return 'Paragraph';
            }
        };
        WordExport.prototype.getHorizontalOrigin = function (horizontalOrigin) {
            switch (horizontalOrigin) {
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
                    return 'Column';
            }
        };
        WordExport.prototype.getShapeVerticalAlignment = function (shapeVerticalAlignment) {
            switch (shapeVerticalAlignment) {
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
                    return 'None';
            }
        };
        WordExport.prototype.getShapeHorizontalAlignment = function (shapeHorizontalAlignment) {
            switch (shapeHorizontalAlignment) {
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
                    return 'None';
            }
        };
        WordExport.prototype.getBiDirectionalOverride = function (biDirectionalOverride) {
            switch (biDirectionalOverride) {
                case 1:
                    return 'LTR';
                case 2:
                    return 'RTL';
                default:
                    return 'None';
            }
        };
        WordExport.prototype.getBreakClearType = function (breakClearType) {
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
        WordExport.prototype.serializeListFormat = function (writer, lf) {
            if (!ej2_base_1.isNullOrUndefined(lf[index_3.listIdProperty[this.keywordIndex]]) || !ej2_base_1.isNullOrUndefined(lf[index_3.listLevelNumberProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'numPr', this.wNamespace);
                if (!ej2_base_1.isNullOrUndefined(lf[index_3.listLevelNumberProperty[this.keywordIndex]]) && lf[index_3.listLevelNumberProperty[this.keywordIndex]] !== -1) {
                    writer.writeStartElement(undefined, 'ilvl', this.wNamespace);
                    writer.writeAttributeString('w', 'val', this.wNamespace, lf[index_3.listLevelNumberProperty[this.keywordIndex]].toString());
                    writer.writeEndElement();
                }
                if (!ej2_base_1.isNullOrUndefined(lf[index_3.listIdProperty[this.keywordIndex]])) {
                    writer.writeStartElement(undefined, 'numId', this.wNamespace);
                    var listId = (lf[index_3.listIdProperty[this.keywordIndex]] + 1).toString();
                    writer.writeAttributeString('w', 'val', this.wNamespace, listId);
                    writer.writeEndElement();
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeParagraphAlignment = function (writer, txtAlignment, isBidi) {
            if (!ej2_base_1.isNullOrUndefined(txtAlignment)) {
                writer.writeStartElement(undefined, 'jc', this.wNamespace);
                var alignment = void 0;
                switch (txtAlignment) {
                    case 'Center':
                    case 1:
                        alignment = 'center';
                        break;
                    case 'Right':
                    case 2:
                        alignment = 'right';
                        break;
                    case 'Justify':
                    case 3:
                        alignment = 'both';
                        break;
                    default:
                        alignment = 'left';
                        break;
                }
                writer.writeAttributeString('w', 'val', this.wNamespace, alignment);
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeParagraphSpacing = function (writer, paragraphFormat) {
            writer.writeStartElement(undefined, 'spacing', this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.beforeSpacingProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'before', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[index_3.beforeSpacingProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.spaceBeforeAutoProperty[this.keywordIndex]])) {
                var value = this.keywordIndex == 1 ? paragraphFormat[index_3.spaceBeforeAutoProperty[this.keywordIndex]].toString() : (paragraphFormat[index_3.spaceBeforeAutoProperty[this.keywordIndex]]) ? "1" : "0";
                writer.writeAttributeString(undefined, 'beforeAutospacing', this.wNamespace, value);
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.afterSpacingProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'after', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[index_3.afterSpacingProperty[this.keywordIndex]] * this.twentiethOfPoint).toString());
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.spaceAfterAutoProperty[this.keywordIndex]])) {
                var value = this.keywordIndex == 1 ? paragraphFormat[index_3.spaceAfterAutoProperty[this.keywordIndex]].toString() : (paragraphFormat[index_3.spaceAfterAutoProperty[this.keywordIndex]]) ? "1" : "0";
                writer.writeAttributeString(undefined, 'afterAutospacing', this.wNamespace, value);
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.lineSpacingProperty[this.keywordIndex]])) {
                var lineSpacingValue = (paragraphFormat[index_3.lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'AtLeast') || paragraphFormat[index_3.lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Exactly')) ? this.roundToTwoDecimal(paragraphFormat[index_3.lineSpacingProperty[this.keywordIndex]] * this.twentiethOfPoint) : this.roundToTwoDecimal(paragraphFormat[index_3.lineSpacingProperty[this.keywordIndex]] * 240);
                writer.writeAttributeString(undefined, 'line', this.wNamespace, lineSpacingValue.toString());
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.lineSpacingTypeProperty[this.keywordIndex]])) {
                var lineSpacingType = 'auto';
                if (paragraphFormat[index_3.lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'AtLeast')) {
                    lineSpacingType = 'atLeast';
                }
                else if (paragraphFormat[index_3.lineSpacingTypeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 2 : 'Exactly')) {
                    lineSpacingType = 'exact';
                }
                writer.writeAttributeString(undefined, 'lineRule', this.wNamespace, lineSpacingType);
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeIndentation = function (writer, paragraphFormat) {
            writer.writeStartElement(undefined, 'ind', this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.leftIndentProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'left', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[index_3.leftIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.rightIndentProperty[this.keywordIndex]])) {
                writer.writeAttributeString(undefined, 'right', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[index_3.rightIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
            }
            if (!ej2_base_1.isNullOrUndefined(paragraphFormat[index_3.firstLineIndentProperty[this.keywordIndex]])) {
                if (paragraphFormat[index_3.firstLineIndentProperty[this.keywordIndex]] < 0) {
                    writer.writeAttributeString(undefined, 'hanging', this.wNamespace, this.roundToTwoDecimal(-1 * paragraphFormat[index_3.firstLineIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
                }
                else {
                    writer.writeAttributeString(undefined, 'firstLine', this.wNamespace, this.roundToTwoDecimal(paragraphFormat[index_3.firstLineIndentProperty[this.keywordIndex]] * this.twipsInOnePoint).toString());
                }
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeCustomXMLMapping = function (customXML, writer) {
            if (customXML.length > 0) {
                var keys = customXML.keys;
                for (var i = 0; i < keys.length; i++) {
                    var customXmlWriter = new ej2_file_utils_1.XmlWriter();
                    customXmlWriter.writeStartElement(undefined, 'Relationships', this.rpNamespace);
                    var xmlData = this.mCustomXML.get(keys[i]);
                    var itemID = keys[i];
                    var id = this.getNextRelationShipID();
                    var fileIndex = i + 1;
                    var itemPath = this.createXMLItem(xmlData, id, fileIndex);
                    var itemPropsPath = this.createXMLItemProps(itemID, fileIndex);
                    this.serializeRelationShip(writer, id, this.customXmlRelType, '../' + itemPath);
                    this.customXMLRelation(customXmlWriter, fileIndex, itemPropsPath);
                    customXmlWriter.writeEndElement();
                    var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(customXmlWriter.buffer, this.customXMLRelPath + fileIndex + '.xml.rels');
                    this.mArchive.addItem(zipArchiveItem);
                }
            }
        };
        WordExport.prototype.customXMLRelation = function (writer, fileIndex, itemPropsPath) {
            this.serializeRelationShip(writer, 'rId1', this.wordMLCustomXmlPropsRelType, itemPropsPath);
        };
        WordExport.prototype.createXMLItem = function (xmlData, id, fileIndex) {
            var xmlBlob = new Blob([xmlData], { type: 'text/plain' });
            var itemPath = this.customXMLItemsPath + fileIndex + '.xml';
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(xmlBlob, itemPath);
            this.mArchive.addItem(zipArchiveItem);
            return itemPath;
        };
        WordExport.prototype.createXMLItemProps = function (itemID, fileIndex) {
            var writer = new ej2_file_utils_1.XmlWriter();
            var customitemPropsPath = this.customXMLItemsPropspath + fileIndex + '.xml';
            var itemPropsPath = this.itemPropsPath + fileIndex + '.xml';
            writer.writeStartElement('ds', 'datastoreItem', this.wNamespace);
            writer.writeAttributeString('ds', 'itemID', undefined, itemID);
            writer.writeAttributeString('xmlns', 'ds', undefined, this.dsNamespace);
            writer.writeEndElement();
            this.customXMLProps.push(customitemPropsPath);
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, customitemPropsPath);
            this.mArchive.addItem(zipArchiveItem);
            return itemPropsPath;
        };
        WordExport.prototype.serializeStyles = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w', 'styles', this.wNamespace);
            writer.writeAttributeString('xmlns', 'mc', undefined, this.veNamespace);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('xmlns', 'w', undefined, this.wNamespace);
            writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
            writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
            writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
            this.serializeDefaultStyles(writer);
            this.serializeDocumentStyles(writer);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.stylePath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeDefaultStyles = function (writer) {
            writer.writeStartElement(undefined, 'docDefaults', this.wNamespace);
            writer.writeStartElement(undefined, 'rPrDefault', this.wNamespace);
            this.serializeCharacterFormat(writer, this.defCharacterFormat);
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'pPrDefault', this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(this.defParagraphFormat)) {
                writer.writeStartElement(undefined, 'pPr', this.wNamespace);
                this.serializeParagraphFormat(writer, this.defParagraphFormat, undefined);
                writer.writeEndElement();
            }
            writer.writeEndElement();
            writer.writeEndElement();
        };
        WordExport.prototype.serializeDocumentStyles = function (writer) {
            for (var i = 0; i < this.mStyles.length; i++) {
                var style = this.mStyles[i];
                writer.writeStartElement(undefined, 'style', this.wNamespace);
                var type = style[index_3.typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Paragraph') ? 'paragraph' : 'character';
                writer.writeAttributeString('w', 'type', this.wNamespace, type);
                writer.writeAttributeString('w', 'styleId', this.wNamespace, style[index_3.nameProperty[this.keywordIndex]]);
                writer.writeStartElement(undefined, 'name', this.wNamespace);
                var list = ["TOC 1", "TOC 2", "TOC 3", "TOC 4", "TOC 5", "TOC 6", "TOC 7", "TOC 8", "TOC 9"];
                if (list.indexOf(style[index_3.nameProperty[this.keywordIndex]]) != -1) {
                    writer.writeAttributeString('w', 'val', this.wNamespace, style[index_3.nameProperty[this.keywordIndex]].toLowerCase());
                }
                else {
                    writer.writeAttributeString('w', 'val', this.wNamespace, style[index_3.nameProperty[this.keywordIndex]]);
                }
                writer.writeEndElement();
                if (!ej2_base_1.isNullOrUndefined(style[index_3.basedOnProperty[this.keywordIndex]])) {
                    writer.writeStartElement(undefined, 'basedOn', this.wNamespace);
                    writer.writeAttributeString('w', 'val', this.wNamespace, style[index_3.basedOnProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                if (!ej2_base_1.isNullOrUndefined(style[index_3.nextProperty[this.keywordIndex]])) {
                    writer.writeStartElement(undefined, 'next', this.wNamespace);
                    writer.writeAttributeString('w', 'val', this.wNamespace, style[index_3.nextProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                if (!ej2_base_1.isNullOrUndefined(style[index_3.linkProperty[this.keywordIndex]])) {
                    writer.writeStartElement(undefined, 'link', this.wNamespace);
                    writer.writeAttributeString('w', 'val', this.wNamespace, style[index_3.linkProperty[this.keywordIndex]]);
                    writer.writeEndElement();
                }
                if (style[index_3.typeProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Paragraph')) {
                    writer.writeStartElement(undefined, 'pPr', this.wNamespace);
                    this.serializeParagraphFormat(writer, style[index_3.paragraphFormatProperty[this.keywordIndex]], undefined);
                    writer.writeEndElement();
                }
                this.serializeCharacterFormat(writer, style[index_3.characterFormatProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeCharacterFormat = function (writer, characterFormat) {
            if (ej2_base_1.isNullOrUndefined(this.keywordIndex)) {
                this.keywordIndex = 0;
            }
            writer.writeStartElement(undefined, 'rPr', this.wNamespace);
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.styleNameProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'rStyle', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, characterFormat[index_3.styleNameProperty[this.keywordIndex]]);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontFamilyProperty[this.keywordIndex]]) || !ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontFamilyBidiProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'rFonts', this.wNamespace);
                if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontFamilyAsciiProperty[this.keywordIndex]])) {
                    var key = index_1.HelperMethods.isThemeFont(characterFormat[index_3.fontFamilyAsciiProperty[this.keywordIndex]]) ? 'asciiTheme' : 'ascii';
                    writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[index_3.fontFamilyAsciiProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontFamilyFarEastProperty[this.keywordIndex]])) {
                    var key = index_1.HelperMethods.isThemeFont(characterFormat[index_3.fontFamilyFarEastProperty[this.keywordIndex]]) ? 'eastAsiaTheme' : 'eastAsia';
                    writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[index_3.fontFamilyFarEastProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontFamilyNonFarEastProperty[this.keywordIndex]])) {
                    var key = index_1.HelperMethods.isThemeFont(characterFormat[index_3.fontFamilyNonFarEastProperty[this.keywordIndex]]) ? 'hAnsiTheme' : 'hAnsi';
                    writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[index_3.fontFamilyNonFarEastProperty[this.keywordIndex]]);
                }
                if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontFamilyBidiProperty[this.keywordIndex]])) {
                    var key = index_1.HelperMethods.isThemeFont(characterFormat[index_3.fontFamilyBidiProperty[this.keywordIndex]]) ? 'cstheme' : 'cs';
                    writer.writeAttributeString(undefined, key, this.wNamespace, characterFormat[index_3.fontFamilyBidiProperty[this.keywordIndex]]);
                }
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.boldProperty[this.keywordIndex]])) {
                this.serializeBoolProperty(writer, 'b', index_1.HelperMethods.parseBoolValue(characterFormat[index_3.boldProperty[this.keywordIndex]]));
            }
            if (index_1.HelperMethods.parseBoolValue(characterFormat[index_3.boldBidiProperty[this.keywordIndex]])) {
                this.serializeBoolProperty(writer, 'bCs', index_1.HelperMethods.parseBoolValue(characterFormat[index_3.boldBidiProperty[this.keywordIndex]]));
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.italicProperty[this.keywordIndex]])) {
                this.serializeBoolProperty(writer, 'i', index_1.HelperMethods.parseBoolValue(characterFormat[index_3.italicProperty[this.keywordIndex]]));
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.italicBidiProperty[this.keywordIndex]])) {
                this.serializeBoolProperty(writer, 'iCs', index_1.HelperMethods.parseBoolValue(characterFormat[index_3.italicBidiProperty[this.keywordIndex]]));
            }
            if (index_1.HelperMethods.parseBoolValue(characterFormat[index_3.bidiProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'rtl', this.wNamespace);
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.allCapsProperty[this.keywordIndex]])) {
                this.serializeBoolProperty(writer, 'caps', index_1.HelperMethods.parseBoolValue(characterFormat[index_3.allCapsProperty[this.keywordIndex]]));
            }
            if (index_1.HelperMethods.parseBoolValue(characterFormat[index_3.complexScriptProperty[this.keywordIndex]])) {
                this.serializeBoolProperty(writer, 'cs', index_1.HelperMethods.parseBoolValue(characterFormat[index_3.complexScriptProperty[this.keywordIndex]]));
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.strikethroughProperty[this.keywordIndex]])) {
                switch (characterFormat[index_3.strikethroughProperty[this.keywordIndex]]) {
                    case 'SingleStrike':
                    case 1:
                        this.serializeBoolProperty(writer, 'strike', true);
                        break;
                    case 'DoubleStrike':
                    case 2:
                        this.serializeBoolProperty(writer, 'dstrike', true);
                        break;
                    default:
                        this.serializeBoolProperty(writer, 'strike', false);
                        this.serializeBoolProperty(writer, 'dstrike', false);
                        break;
                }
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontColorProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'color', this.wNamespace);
                if (characterFormat[index_3.fontColorProperty[this.keywordIndex]] === 'empty' || characterFormat[index_3.fontColorProperty[this.keywordIndex]] === '#00000000') {
                    writer.writeAttributeString('w', 'val', this.wNamespace, 'auto');
                }
                else {
                    writer.writeAttributeString('w', 'val', this.wNamespace, this.getColor(characterFormat[index_3.fontColorProperty[this.keywordIndex]]));
                }
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontSizeProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'sz', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, this.roundToTwoDecimal(characterFormat[index_3.fontSizeProperty[this.keywordIndex]] * 2).toString());
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.characterSpacingProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'spacing', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, (characterFormat[index_3.characterSpacingProperty[this.keywordIndex]] * 20).toString());
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.scalingProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'w', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, (characterFormat[index_3.scalingProperty[this.keywordIndex]]).toString());
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.fontSizeBidiProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'szCs', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, this.roundToTwoDecimal(characterFormat[index_3.fontSizeBidiProperty[this.keywordIndex]] * 2).toString());
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.highlightColorProperty[this.keywordIndex]]) && characterFormat[index_3.highlightColorProperty[this.keywordIndex]] !== (this.keywordIndex == 1 ? 0 : 'NoColor')) {
                writer.writeStartElement(undefined, 'highlight', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, this.getHighlightColor(characterFormat[index_3.highlightColorProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.revisionIdsProperty[this.keywordIndex]]) && characterFormat[index_3.revisionIdsProperty[this.keywordIndex]].length > 0) {
                this.serializeRevisionStart(writer, characterFormat, undefined);
                this.serializeRevisionEnd(writer, characterFormat, undefined);
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.underlineProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'u', this.wNamespace);
                writer.writeAttributeString('w', 'val', this.wNamespace, this.getUnderlineStyle(characterFormat[index_3.underlineProperty[this.keywordIndex]]));
                writer.writeEndElement();
            }
            if (!ej2_base_1.isNullOrUndefined(characterFormat[index_3.baselineAlignmentProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'vertAlign', this.wNamespace);
                switch (characterFormat[index_3.baselineAlignmentProperty[this.keywordIndex]]) {
                    case 'Superscript':
                    case 1:
                        writer.writeAttributeString('w', 'val', this.wNamespace, 'superscript');
                        break;
                    case 'Subscript':
                    case 2:
                        writer.writeAttributeString('w', 'val', this.wNamespace, 'subscript');
                        break;
                    default:
                        writer.writeAttributeString('w', 'val', this.wNamespace, 'baseline');
                        break;
                }
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.getColor = function (color) {
            if (color.length > 0) {
                if (color[0] === '#') {
                    color = color.substr(1);
                }
                if (color.length > 6) {
                    color = color.substr(0, 6);
                }
            }
            return color;
        };
        WordExport.prototype.getUnderlineStyle = function (underlineStyle) {
            switch (underlineStyle) {
                case 'None':
                case 0:
                    return 'none';
                case 'Single':
                case 1:
                    return 'single';
                case 'Words':
                case 2:
                    return 'words';
                case 'Double':
                case 3:
                    return 'double';
                case 'Dotted':
                case 4:
                    return 'dotted';
                case 'Thick':
                case 5:
                    return 'thick';
                case 6:
                    return 'dash';
                case 'DashLong':
                case 7:
                    return 'dashLong';
                case 'DotDash':
                case 8:
                    return 'dotDash';
                case 'DotDotDash':
                case 9:
                    return 'dotDotDash';
                case 'Wavy':
                case 10:
                    return 'wave';
                case 'DottedHeavy':
                case 11:
                    return 'dottedHeavy';
                case 'DashHeavy':
                case 12:
                    return 'dashedHeavy';
                case 'DashLongHeavy':
                case 13:
                    return 'dashLongHeavy';
                case 'DotDashHeavy':
                case 14:
                    return 'dashDotHeavy';
                case 'DotDotDashHeavy':
                case 15:
                    return 'dashDotDotHeavy';
                case 'WavyHeavy':
                case 16:
                    return 'wavyHeavy';
                case 'WavyDouble':
                case 17:
                    return 'wavyDouble';
                default:
                    return 'dash';
            }
        };
        WordExport.prototype.getHighlightColor = function (highlight) {
            switch (highlight) {
                case 'BrightGreen':
                case 2:
                    return 'green';
                case 'Turquoise':
                case 3:
                    return 'cyan';
                case 'Pink':
                case 4:
                    return 'magenta';
                case 'Blue':
                case 5:
                    return 'blue';
                case 'Red':
                case 6:
                    return 'red';
                case 'DarkBlue':
                case 7:
                    return 'darkBlue';
                case 'Teal':
                case 8:
                    return 'darkCyan';
                case 'Green':
                case 9:
                    return 'darkGreen';
                case 'Violet':
                case 10:
                    return 'darkMagenta';
                case 'DarkRed':
                case 11:
                    return 'darkRed';
                case 'DarkYellow':
                case 12:
                    return 'darkYellow';
                case 'Gray50':
                case 13:
                    return 'darkGray';
                case 'Gray25':
                case 14:
                    return 'lightGray';
                case 'Black':
                case 15:
                    return 'black';
                default:
                    return 'yellow';
            }
        };
        WordExport.prototype.serializeBoolProperty = function (writer, tag, value) {
            writer.writeStartElement(undefined, tag, this.wNamespace);
            if (!value) {
                writer.writeAttributeString(undefined, 'val', this.wNamespace, '0');
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeNumberings = function () {
            if (this.document[index_3.listsProperty[this.keywordIndex]].length === 0) {
                return;
            }
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w', 'numbering', this.wNamespace);
            this.writeCommonAttributeStrings(writer);
            this.serializeAbstractListStyles(writer, this.document[index_3.abstractListsProperty[this.keywordIndex]]);
            this.serializeListInstances(writer, this.document[index_3.listsProperty[this.keywordIndex]]);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.numberingPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeAbstractListStyles = function (writer, listStyles) {
            for (var i = 0; i < listStyles.length; i++) {
                var abstractList = listStyles[i];
                writer.writeStartElement(undefined, 'abstractNum', this.wNamespace);
                writer.writeAttributeString(undefined, 'abstractNumId', this.wNamespace, abstractList[index_3.abstractListIdProperty[this.keywordIndex]].toString());
                writer.writeStartElement(undefined, 'nsid', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, this.generateHex());
                writer.writeEndElement();
                for (var ilvl = 0, cnt = abstractList[index_3.levelsProperty[this.keywordIndex]].length; ilvl < cnt; ilvl++) {
                    this.serializeListLevel(writer, abstractList[index_3.levelsProperty[this.keywordIndex]][ilvl], ilvl);
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeListInstances = function (writer, listStyles) {
            for (var i = 0; i < listStyles.length; i++) {
                var list = listStyles[i];
                writer.writeStartElement(undefined, 'num', this.wNamespace);
                writer.writeAttributeString(undefined, 'numId', this.wNamespace, (list[index_3.listIdProperty[this.keywordIndex]] + 1).toString());
                writer.writeStartElement(undefined, 'abstractNumId', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, list[index_3.abstractListIdProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
                for (var lvl = 0, cnt = list[index_3.levelOverridesProperty[this.keywordIndex]].length; lvl < cnt; lvl++) {
                    this.serializeLevelOverrides(writer, list[index_3.levelOverridesProperty[this.keywordIndex]][lvl], list[index_3.levelOverridesProperty[this.keywordIndex]][lvl][index_3.levelNumberProperty[this.keywordIndex]]);
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.generateHex = function () {
            return (Math.floor(Math.random() * (4000000000 - 270000000)) + 270000000).toString(16).toUpperCase();
        };
        WordExport.prototype.roundToTwoDecimal = function (num) {
            return Math.round(num);
        };
        WordExport.prototype.serializeListLevel = function (writer, listLevel, levelIndex) {
            writer.writeStartElement(undefined, 'lvl', this.wNamespace);
            writer.writeAttributeString(undefined, 'ilvl', this.wNamespace, levelIndex.toString());
            if (!ej2_base_1.isNullOrUndefined(listLevel[index_3.isLegalStyleNumberingProperty[this.keywordIndex]]) && listLevel[index_3.isLegalStyleNumberingProperty[this.keywordIndex]]) {
                writer.writeElementString(undefined, 'isLgl', this.wNamespace, undefined);
            }
            writer.writeStartElement(undefined, 'start', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, listLevel[index_3.startAtProperty[this.keywordIndex]].toString());
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'numFmt', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, this.getLevelPattern(listLevel[index_3.listLevelPatternProperty[this.keywordIndex]]));
            writer.writeEndElement();
            this.serializeLevelFollow(writer, listLevel);
            this.serializeLevelText(writer, listLevel, levelIndex + 1);
            writer.writeStartElement(undefined, 'pPr', this.wNamespace);
            this.serializeParagraphFormat(writer, listLevel[index_3.paragraphFormatProperty[this.keywordIndex]], undefined);
            writer.writeEndElement();
            this.serializeCharacterFormat(writer, listLevel[index_3.characterFormatProperty[this.keywordIndex]]);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeLevelOverrides = function (writer, listLevel, levelIndex) {
            writer.writeStartElement(undefined, 'lvlOverride', this.wNamespace);
            writer.writeAttributeString(undefined, 'ilvl', this.wNamespace, levelIndex.toString());
            if (!ej2_base_1.isNullOrUndefined(listLevel[index_3.overrideListLevelProperty[this.keywordIndex]]))
                this.serializeListLevel(writer, listLevel[index_3.overrideListLevelProperty[this.keywordIndex]], levelIndex);
            if (!ej2_base_1.isNullOrUndefined(listLevel[index_3.startAtProperty[this.keywordIndex]])) {
                writer.writeStartElement(undefined, 'startOverride', this.wNamespace);
                writer.writeAttributeString(undefined, 'val', this.wNamespace, listLevel[index_3.startAtProperty[this.keywordIndex]].toString());
                writer.writeEndElement();
            }
            writer.writeEndElement();
        };
        WordExport.prototype.getLevelPattern = function (levelPattern) {
            var patternType;
            switch (levelPattern) {
                case 'None':
                case 0:
                    patternType = 'none';
                    break;
                case 'Arabic':
                case 1:
                    patternType = 'decimal';
                    break;
                case 'UpRoman':
                case 2:
                    patternType = 'upperRoman';
                    break;
                case 'LowRoman':
                case 3:
                    patternType = 'lowerRoman';
                    break;
                case 'UpLetter':
                case 4:
                    patternType = 'upperLetter';
                    break;
                case 'LowLetter':
                case 5:
                    patternType = 'lowerLetter';
                    break;
                case 'Ordinal':
                case 6:
                    patternType = 'ordinal';
                    break;
                case 'Number':
                case 7:
                    patternType = 'cardinalText';
                    break;
                case 'OrdinalText':
                case 8:
                    patternType = 'ordinalText';
                    break;
                case 'LeadingZero':
                case 9:
                    patternType = 'decimalZero';
                    break;
                case 'FarEast':
                case 11:
                    patternType = 'aiueoFullWidth';
                    break;
                case 'Special':
                case 12:
                    patternType = 'russianLower';
                    break;
                default:
                    patternType = 'bullet';
                    break;
            }
            return patternType;
        };
        WordExport.prototype.serializeLevelText = function (writer, listLevel, lvlIndex) {
            writer.writeStartElement(undefined, 'lvlText', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, (listLevel[index_3.numberFormatProperty[this.keywordIndex]]));
            writer.writeEndElement();
        };
        WordExport.prototype.serializeLevelFollow = function (writer, listLevel) {
            var fc;
            if (listLevel[index_3.followCharacterProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 0 : 'Tab')) {
                fc = 'tab';
            }
            else if (listLevel[index_3.followCharacterProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 1 : 'Space')) {
                fc = 'space';
            }
            else {
                fc = 'nothing';
            }
            writer.writeStartElement(undefined, 'suff', this.wNamespace);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, fc);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeThemeFontLang = function (writer) {
            var isLanguageIdBi = this.themeFontLang[index_3.localeIdBidiProperty[this.keywordIndex]] > 0;
            var isLanguageId = this.themeFontLang[index_3.localeIdProperty[this.keywordIndex]] > 0;
            var isLanguageIdFarEast = this.themeFontLang[index_3.localeIdFarEastProperty[this.keywordIndex]] > 0;
            if (isLanguageId || isLanguageIdFarEast || isLanguageIdBi) {
                writer.writeStartElement('w', 'themeFontLang', undefined);
                if (isLanguageId) {
                    var ascii = index_2.LocaleId[this.themeFontLang[index_3.localeIdProperty[this.keywordIndex]]];
                    writer.writeAttributeString('w', 'val', undefined, ascii.replace('_', '-'));
                }
                if (isLanguageIdBi) {
                    var bidi = index_2.LocaleId[this.themeFontLang[index_3.localeIdBidiProperty[this.keywordIndex]]];
                    writer.writeAttributeString('w', 'bidi', undefined, bidi.replace('_', '-'));
                }
                if (isLanguageIdFarEast) {
                    var farEast = index_2.LocaleId[this.themeFontLang[index_3.localeIdFarEastProperty[this.keywordIndex]]];
                    writer.writeAttributeString('w', 'eastAsia', undefined, farEast.replace('_', '-'));
                }
                writer.writeEndElement();
            }
        };
        WordExport.prototype.serializeDocumentProtectionSettings = function (writer) {
            writer.writeStartElement('w', 'documentProtection', this.wNamespace);
            if (this.formatting) {
                writer.writeAttributeString('w', 'formatting', this.wNamespace, '1');
            }
            if (this.protectionType && this.protectionType !== 0) {
                var editMode = void 0;
                switch (this.protectionType) {
                    case 'ReadOnly':
                    case 1:
                        editMode = 'readOnly';
                        break;
                    case 'FormFieldsOnly':
                    case 2:
                        editMode = 'forms';
                        break;
                    case 'CommentsOnly':
                    case 3:
                        editMode = 'comments';
                        break;
                    case 'RevisionsOnly':
                    case 4:
                        editMode = 'trackedChanges';
                        break;
                }
                writer.writeAttributeString('w', 'edit', this.wNamespace, editMode);
            }
            writer.writeAttributeString('w', 'cryptProviderType', this.wNamespace, 'rsaAES');
            writer.writeAttributeString('w', 'cryptAlgorithmClass', this.wNamespace, 'hash');
            writer.writeAttributeString('w', 'cryptAlgorithmType', this.wNamespace, 'typeAny');
            writer.writeAttributeString('w', 'cryptAlgorithmSid', this.wNamespace, '14');
            writer.writeAttributeString('w', 'cryptSpinCount', this.wNamespace, '100000');
            if (this.enforcement) {
                writer.writeAttributeString('w', 'enforcement', this.wNamespace, '1');
            }
            if (this.hashValue) {
                writer.writeAttributeString('w', 'hash', this.wNamespace, this.hashValue);
            }
            if (this.saltValue) {
                writer.writeAttributeString('w', 'salt', this.wNamespace, this.saltValue);
            }
            writer.writeEndElement();
        };
        WordExport.prototype.serializeSettings = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w', 'settings', this.wNamespace);
            this.writeCustom(writer);
            writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
            writer.writeAttributeString('xmlns', 'w14', undefined, this.w14Namespace);
            writer.writeAttributeString('xmlns', 'w15', undefined, this.w15Namespace);
            writer.writeAttributeString('xmlns', 'sl', undefined, this.slNamespace);
            writer.writeAttributeString('mc', 'Ignorable', undefined, 'w14 w15');
            this.serializeDocumentProtectionSettings(writer);
            writer.writeStartElement('w', 'zoom', this.wNamespace);
            writer.writeAttributeString('w', 'val', this.wNamespace, 'none');
            writer.writeAttributeString('w', 'percent', this.wNamespace, '100');
            writer.writeEndElement();
            this.serializeThemeFontLang(writer);
            writer.writeStartElement(undefined, 'displayBackgroundShape', this.wNamespace);
            writer.writeEndElement();
            writer.writeStartElement(undefined, 'defaultTabStop', this.wNamespace);
            var tabWidth = Math.round(this.defaultTabWidthValue * this.twipsInOnePoint);
            writer.writeAttributeString(undefined, 'val', this.wNamespace, tabWidth.toString());
            writer.writeEndElement();
            if (this.trackChanges) {
                writer.writeStartElement(undefined, 'trackRevisions', this.wNamespace);
                writer.writeEndElement();
            }
            if (this.mDifferentFirstPage) {
                writer.writeStartElement(undefined, 'evenAndOddHeaders', this.wNamespace);
                writer.writeEndElement();
            }
            if (!this.formFieldShading) {
                writer.writeStartElement(undefined, 'doNotShadeFormData', this.wNamespace);
                writer.writeEndElement();
            }
            writer.writeStartElement(undefined, 'compat', this.wNamespace);
            if (this.dontUseHtmlParagraphAutoSpacing) {
                this.serializeBoolProperty(writer, 'doNotUseHTMLParagraphAutoSpacing', this.dontUseHtmlParagraphAutoSpacing);
            }
            if (this.allowSpaceOfSameStyleInTable) {
                this.serializeBoolProperty(writer, 'allowSpaceOfSameStyleInTable', this.allowSpaceOfSameStyleInTable);
            }
            writer.writeStartElement(undefined, 'compatSetting', this.wNamespace);
            writer.writeAttributeString(undefined, 'name', this.wNamespace, 'compatibilityMode');
            writer.writeAttributeString(undefined, 'uri', this.wNamespace, 'http://schemas.microsoft.com/office/word');
            var compatValue = this.keywordIndex === 1 ? index_1.HelperMethods.getCompatibilityModeValue(this.compatibilityMode) : index_1.HelperMethods.getCompatibilityModeValue(this.getCompatibilityModeEnumValue(this.compatibilityMode.toString()));
            writer.writeAttributeString(undefined, 'val', this.wNamespace, compatValue);
            writer.writeEndElement();
            writer.writeEndElement();
            if (this.document[index_3.footnotesProperty[this.keywordIndex]]) {
                writer.writeStartElement(undefined, 'footnotePr', this.wNamespace);
                writer.writeStartElement(undefined, 'footnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
                writer.writeEndElement();
                writer.writeStartElement(undefined, 'footnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
                writer.writeEndElement();
                writer.writeEndElement();
            }
            if (this.document[index_3.endnotesProperty[this.keywordIndex]]) {
                writer.writeStartElement(undefined, 'endnotePr', this.wNamespace);
                writer.writeStartElement(undefined, 'endnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '-1');
                writer.writeEndElement();
                writer.writeStartElement(undefined, 'endnote', this.wNamespace);
                writer.writeAttributeString(undefined, 'id', this.wNamespace, '0');
                writer.writeEndElement();
                writer.writeEndElement();
            }
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.settingsPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeCoreProperties = function () {
        };
        WordExport.prototype.serializeAppProperties = function () {
        };
        WordExport.prototype.serializeFontTable = function (contentType) {
        };
        WordExport.prototype.serializeSettingsRelation = function () {
        };
        WordExport.prototype.getCompatibilityModeEnumValue = function (compatibilityMode) {
            switch (compatibilityMode) {
                case 'Word2013':
                    return 0;
                case 'Word2003':
                    return 1;
                case 'Word2007':
                    return 2;
                case 'Word2010':
                    return 3;
            }
        };
        WordExport.prototype.serializeHeaderFooters = function () {
            this.isHeaderFooter = true;
            this.serializeHeaderFooter('EvenFooter');
            this.serializeHeaderFooter('EvenHeader');
            this.serializeHeaderFooter('FirstPageFooter');
            this.serializeHeaderFooter('FirstPageHeader');
            this.serializeHeaderFooter('OddFooter');
            this.serializeHeaderFooter('OddHeader');
            this.isHeaderFooter = false;
        };
        WordExport.prototype.serializeHeaderFooter = function (hfType) {
            if (this.headersFooters.length === 0) {
                return;
            }
            var headerFooterPath;
            var headerFooterRelsPath;
            if (!this.headersFooters.containsKey(hfType)) {
                return;
            }
            var hfColl = this.headersFooters.get(hfType);
            var hf = undefined;
            for (var i = 0; i < hfColl.keys.length; i++) {
                var id = hfColl.keys[i];
                hf = hfColl.get(id);
                if (hfType === 'EvenHeader' || hfType === 'FirstPageHeader' ||
                    hfType === 'OddHeader') {
                    headerFooterPath = this.headerPath + id.replace('rId', '') + '.xml';
                    headerFooterRelsPath = this.headerRelationPath + id.replace('rId', '') + '.xml.rels';
                    this.serializeHeader(hf, id, headerFooterPath, headerFooterRelsPath);
                }
                else {
                    headerFooterPath = this.footerPath + id.replace('rId', '') + '.xml';
                    headerFooterRelsPath = this.footerRelationPath + id.replace('rId', '') + '.xml.rels';
                    this.serializeFooter(hf, id, headerFooterPath, headerFooterRelsPath);
                }
            }
        };
        WordExport.prototype.serializeHeader = function (header, id, headerFooterPath, headerFooterRelsPath) {
            this.headerFooter = header;
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w', 'hdr', this.wNamespace);
            this.writeHFCommonAttributes(writer);
            var owner = this.blockOwner;
            this.blockOwner = header;
            this.serializeBodyItems(writer, header[index_3.blocksProperty[this.keywordIndex]], true);
            this.blockOwner = owner;
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, headerFooterPath);
            this.mArchive.addItem(zipArchiveItem);
            this.serializeHFRelations(id, headerFooterRelsPath);
            this.headerFooter = undefined;
        };
        WordExport.prototype.serializeHFRelations = function (hfId, headerFooterRelsPath) {
            var hasHFImage = this.headerFooterImages.containsKey(hfId);
            if (hasHFImage) {
                var writer = new ej2_file_utils_1.XmlWriter();
                writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
                this.serializeImagesRelations(this.headerFooterImages.get(hfId), writer, false);
                if (this.headerFooterSvgImages.containsKey(hfId)) {
                    this.serializeSvgImageRelation(this.headerFooterSvgImages.get(hfId), writer);
                }
                writer.writeEndElement();
                var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, headerFooterRelsPath);
                this.mArchive.addItem(zipArchiveItem);
            }
            else {
                return;
            }
        };
        WordExport.prototype.writeHFCommonAttributes = function (writer) {
            writer.writeAttributeString('xmlns', 'v', undefined, this.vNamespace);
            writer.writeAttributeString('xmlns', 'w10', undefined, this.w10Namespace);
            writer.writeAttributeString('xmlns', 'o', undefined, this.oNamespace);
            writer.writeAttributeString('xmlns', 've', undefined, this.veNamespace);
            writer.writeAttributeString('xmlns', 'r', undefined, this.rNamespace);
            writer.writeAttributeString('xmlns', 'm', undefined, this.mNamespace);
            writer.writeAttributeString('xmlns', 'wne', undefined, this.wneNamespace);
            writer.writeAttributeString('xmlns', 'a', undefined, this.aNamespace);
            writer.writeAttributeString('xmlns', 'pic', undefined, this.pictureNamespace);
            writer.writeAttributeString('xmlns', 'wp', undefined, this.wpNamespace);
            writer.writeAttributeString('xmlns', 'wpc', undefined, this.wpCanvasNamespace);
            writer.writeAttributeString('xmlns', 'wp14', undefined, this.wpDrawingNamespace);
            this.writeDup(writer);
            writer.writeAttributeString('xmlns', 'wps', undefined, this.wpShapeNamespace);
            writer.writeAttributeString('ve', 'Ignorable', undefined, 'w14 w15 wp14');
        };
        WordExport.prototype.serializeFooter = function (footer, id, headerFooterPath, headerFooterRelsPath) {
            this.headerFooter = footer;
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement('w', 'ftr', this.wNamespace);
            this.writeHFCommonAttributes(writer);
            this.serializeBodyItems(writer, footer[index_3.blocksProperty[this.keywordIndex]], true);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, headerFooterPath);
            this.mArchive.addItem(zipArchiveItem);
            this.serializeHFRelations(id, headerFooterRelsPath);
        };
        WordExport.prototype.serializeDocumentRelations = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
            this.serializeRelationShip(writer, this.getNextRelationShipID(), this.stylesRelType, 'styles.xml');
            this.serializeRelationShip(writer, this.getNextRelationShipID(), this.settingsRelType, 'settings.xml');
            if (this.document[index_3.endnotesProperty[this.keywordIndex]]) {
                this.serializeRelationShip(writer, this.getNextRelationShipID(), this.endnoteRelType, 'endnotes.xml');
            }
            if (this.document[index_3.footnotesProperty[this.keywordIndex]]) {
                this.serializeRelationShip(writer, this.getNextRelationShipID(), this.footnoteRelType, 'footnotes.xml');
            }
            if (this.mComments.length > 0) {
                if (!(this.mComments.length === 1 && this.mComments[0].text === '')) {
                    this.serializeRelationShip(writer, this.getNextRelationShipID(), this.commentsRelType, 'comments.xml');
                    this.serializeRelationShip(writer, this.getNextRelationShipID(), this.commentsExRelType, 'commentsExtended.xml');
                }
            }
            if (!ej2_base_1.isNullOrUndefined(this.mThemes)) {
                this.serializeRelationShip(writer, this.getNextRelationShipID(), this.ThemeRelType, 'theme/theme1.xml');
            }
            if (this.document[index_3.listsProperty[this.keywordIndex]].length > 0) {
                this.serializeRelationShip(writer, this.getNextRelationShipID(), this.numberingRelType, 'numbering.xml');
            }
            this.serializeHeaderFooterRelations(writer);
            this.serializeImagesRelations(this.documentImages, writer, false);
            this.serializeSvgImageRelation(this.svgImages, writer);
            this.serializeCustomXMLMapping(this.mCustomXML, writer);
            this.serializeChartDocumentRelations(this.documentCharts, writer);
            this.serializeExternalLinkImages(writer);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.wordRelationPath);
            this.mArchive.addItem(zipArchiveItem);
            this.headerFooter = undefined;
        };
        WordExport.prototype.serializeChartDocumentRelations = function (charts, writer) {
            if (charts.length > 0) {
                var keys = charts.keys;
                for (var i = 1; i <= keys.length; i++) {
                    this.serializeRelationShip(writer, keys[i - 1], this.chartRelType, 'charts/chart' + i + '.xml');
                }
            }
        };
        WordExport.prototype.serializeChartRelations = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            this.resetChartRelationShipId();
            writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
            var chartColorPath = 'colors' + this.chartCount + '.xml';
            var chartRelationPath = this.chartPath + '/_rels/chart' + this.chartCount + '.xml.rels';
            var chartExcelPath = '../embeddings/Microsoft_Excel_Worksheet' + this.chartCount + '.xlsx';
            this.serializeRelationShip(writer, this.getNextChartRelationShipID(), this.packageRelType, chartExcelPath);
            this.serializeRelationShip(writer, this.getNextChartRelationShipID(), this.chartColorStyleRelType, chartColorPath);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, chartRelationPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeImagesRelations = function (images, writer, isSvg) {
            if (images.length > 0) {
                var imagePath = '';
                var base64ImageString = void 0;
                var keys = images.keys;
                for (var i = 0; i < keys.length; i++) {
                    var mImage = images.get(keys[i]);
                    var imageStringInfo = void 0;
                    if (typeof mImage === 'string' && this.startsWith(mImage, 'data')) {
                        base64ImageString = mImage;
                    }
                    else {
                        imageStringInfo = this.getBase64ImageString(mImage);
                        base64ImageString = imageStringInfo.imageString;
                        if (index_1.HelperMethods.parseBoolValue(mImage[index_3.isMetaFileProperty[this.keywordIndex]])) {
                            var format = index_1.HelperMethods.formatClippedString(imageStringInfo.metaFileImageString).extension;
                            if (format !== '.svg' || isSvg) {
                                base64ImageString = imageStringInfo.metaFileImageString;
                            }
                        }
                    }
                    if (ej2_base_1.isNullOrUndefined(base64ImageString)) {
                        imagePath = this.imagePath + '/0.jpeg';
                        this.serializeRelationShip(writer, keys[i], this.imageRelType, imagePath.replace('word/', ''));
                    }
                    else {
                        var imageInfo = index_1.HelperMethods.formatClippedString(base64ImageString);
                        var extension = imageInfo.extension;
                        var formatClippedString = imageInfo.formatClippedString;
                        imagePath = this.imagePath + keys[i] + extension;
                        this.serializeRelationShip(writer, keys[i], this.imageRelType, imagePath.replace('word/', ''));
                        var imageBlob = void 0;
                        if (this.startsWith(base64ImageString, 'data:image/svg+xml;utf8,')) {
                            imageBlob = new Blob([formatClippedString]);
                        }
                        else {
                            imageBlob = new Blob([this.encodedString(formatClippedString)]);
                        }
                        var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(imageBlob, imagePath);
                        this.mArchive.addItem(zipArchiveItem);
                    }
                }
            }
        };
        WordExport.prototype.serializeSvgImageRelation = function (svgImages, writer) {
            this.serializeImagesRelations(svgImages, writer, true);
        };
        WordExport.prototype.encodedString = function (input) {
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var chr1;
            var chr2;
            var chr3;
            var encode1;
            var encode2;
            var encode3;
            var encode4;
            var count = 0;
            var resultIndex = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
            var totalLength = input.length * 3 / 4;
            if (input.charAt(input.length - 1) === keyStr.charAt(64)) {
                totalLength--;
            }
            if (input.charAt(input.length - 2) === keyStr.charAt(64)) {
                totalLength--;
            }
            if (totalLength % 1 !== 0) {
                throw new Error('Invalid base64 input, bad content length.');
            }
            var output = new Uint8Array(totalLength | 0);
            while (count < input.length) {
                encode1 = keyStr.indexOf(input.charAt(count++));
                encode2 = keyStr.indexOf(input.charAt(count++));
                encode3 = keyStr.indexOf(input.charAt(count++));
                encode4 = keyStr.indexOf(input.charAt(count++));
                chr1 = (encode1 << 2) | (encode2 >> 4);
                chr2 = ((encode2 & 15) << 4) | (encode3 >> 2);
                chr3 = ((encode3 & 3) << 6) | encode4;
                output[resultIndex++] = chr1;
                if (encode3 !== 64) {
                    output[resultIndex++] = chr2;
                }
                if (encode4 !== 64) {
                    output[resultIndex++] = chr3;
                }
            }
            return output;
        };
        WordExport.prototype.serializeExternalLinkImages = function (writer) {
            var imagePath = '';
            var keys = this.externalImages.keys;
            for (var i = 0; i < this.externalImages.keys.length; i++) {
                this.serializeRelationShip(writer, keys[i], this.imageRelType, this.externalImages.get(keys[i]));
            }
        };
        WordExport.prototype.serializeHeaderFooterRelations = function (writer) {
            this.serializeHFRelation(writer, 'EvenFooter');
            this.serializeHFRelation(writer, 'EvenHeader');
            this.serializeHFRelation(writer, 'FirstPageFooter');
            this.serializeHFRelation(writer, 'FirstPageHeader');
            this.serializeHFRelation(writer, 'OddFooter');
            this.serializeHFRelation(writer, 'OddHeader');
        };
        WordExport.prototype.serializeHFRelation = function (writer, hfType) {
            var headerFooterPath = '';
            var relType;
            if (!this.headersFooters.containsKey(hfType)) {
                return;
            }
            var hfColl = this.headersFooters.get(hfType);
            for (var i = 0; i < hfColl.keys.length; i++) {
                var id = hfColl.keys[i];
                if (hfType === 'EvenHeader' || hfType === 'FirstPageHeader' ||
                    hfType === 'OddHeader') {
                    headerFooterPath = 'header' + id.replace('rId', '') + '.xml';
                    relType = this.headerRelType;
                }
                else {
                    headerFooterPath = 'footer' + id.replace('rId', '') + '.xml';
                    relType = this.footerRelType;
                }
                this.serializeRelationShip(writer, id, relType, headerFooterPath);
            }
        };
        WordExport.prototype.serializeRelationShip = function (writer, relationshipID, relationshipType, targetPath) {
            writer.writeStartElement(undefined, 'Relationship', undefined);
            writer.writeAttributeString(undefined, 'Id', undefined, relationshipID);
            writer.writeAttributeString(undefined, 'Type', undefined, relationshipType);
            writer.writeAttributeString(undefined, 'Target', undefined, targetPath.replace('\\', '/').replace('\v', ''));
            if (relationshipType === this.hyperlinkRelType || this.startsWith(targetPath, 'http://') || this.startsWith(targetPath, 'https://') || this.startsWith(targetPath, 'file:///')) {
                writer.writeAttributeString(undefined, 'TargetMode', undefined, 'External');
            }
            writer.writeEndElement();
        };
        WordExport.prototype.getNextRelationShipID = function () {
            return 'rId' + (++this.mRelationShipID);
        };
        WordExport.prototype.getEFNextRelationShipID = function () {
            return (++this.efRelationShipId).toString();
        };
        WordExport.prototype.serializeGeneralRelations = function () {
            var writer = new ej2_file_utils_1.XmlWriter();
            this.resetRelationShipID();
            writer.writeStartElement(undefined, 'Relationships', this.rpNamespace);
            this.serializeRelationShip(writer, this.getNextRelationShipID(), this.documentRelType, this.documentPath);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.generalRelationPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeContentTypes = function (contentType, formatType) {
            var writer = new ej2_file_utils_1.XmlWriter();
            writer.writeStartElement(undefined, 'Types', 'http://schemas.openxmlformats.org/package/2006/content-types');
            this.serializeDefaultContentType(writer, 'rels', this.relationContentType);
            this.serializeDefaultContentType(writer, 'xml', this.xmlContentType);
            if (this.documentImages.length > 0 || this.externalImages.length > 0 || this.headerFooterImages.length > 0) {
                this.serializeDefaultContentType(writer, 'png', 'image/png');
                this.serializeDefaultContentType(writer, 'bmp', 'image/bmp');
                this.serializeDefaultContentType(writer, 'emf', 'image/x-emf');
                this.serializeDefaultContentType(writer, 'wmf', 'image/x-wmf');
                this.serializeDefaultContentType(writer, 'gif', 'image/gif');
                this.serializeDefaultContentType(writer, 'ico', 'image/x-icon');
                this.serializeDefaultContentType(writer, 'tif', 'image/tiff');
                this.serializeDefaultContentType(writer, 'tiff', 'image/tiff');
                this.serializeDefaultContentType(writer, 'jpeg', 'image/jpeg');
                this.serializeDefaultContentType(writer, 'jpg', 'image/jpeg');
                this.serializeDefaultContentType(writer, 'svg', 'image/svg+xml');
            }
            if (formatType == 'Docx') {
                this.serializeOverrideContentType(writer, this.documentPath, this.documentContentType);
            }
            else if (formatType == 'Dotx') {
                this.serializeOverrideContentType(writer, this.documentPath, this.TemplateContentType);
            }
            this.serializeOverrideContentType(writer, this.numberingPath, this.numberingContentType);
            this.serializeOverrideContentType(writer, this.stylePath, this.stylesContentType);
            this.serializeOverrideContentType(writer, this.settingsPath, this.settingsContentType);
            this.serializeOverrideContentType(writer, this.commentsPath, this.commentsContentType);
            this.serializeOverrideContentType(writer, this.themePath, this.themeContentType);
            this.serializeOverrideContentType(writer, this.commentsExtendedPath, this.commentsExContentType);
            if (this.chartCount > 0) {
                var count = 1;
                this.serializeDefaultContentType(writer, 'xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                while (count <= this.chartCount) {
                    this.serializeOverrideContentType(writer, 'word/charts/chart' + count + '.xml', this.chartsContentType);
                    this.serializeOverrideContentType(writer, 'word/charts/colors' + count + '.xml', this.chartColorStyleContentType);
                    count++;
                }
            }
            if (this.customXMLProps.length > 0) {
                for (var i = 0; i < this.customXMLProps.length; i++) {
                    this.serializeOverrideContentType(writer, this.customXMLProps[i], this.customXmlContentType);
                }
            }
            this.serializeHFContentTypes(writer);
            this.SerializeEFContentTypes(writer);
            writer.writeEndElement();
            var zipArchiveItem = new ej2_compression_1.ZipArchiveItem(writer.buffer, this.contentTypesPath);
            this.mArchive.addItem(zipArchiveItem);
        };
        WordExport.prototype.serializeHFContentTypes = function (writer) {
            this.serializeHeaderFootersContentType(writer, 'EvenFooter');
            this.serializeHeaderFootersContentType(writer, 'EvenHeader');
            this.serializeHeaderFootersContentType(writer, 'FirstPageFooter');
            this.serializeHeaderFootersContentType(writer, 'FirstPageHeader');
            this.serializeHeaderFootersContentType(writer, 'OddFooter');
            this.serializeHeaderFootersContentType(writer, 'OddHeader');
        };
        WordExport.prototype.serializeHeaderFootersContentType = function (writer, headerFooterType) {
            var contentType;
            var partName;
            if (!this.headersFooters.containsKey(headerFooterType)) {
                return;
            }
            var hfColl = this.headersFooters.get(headerFooterType);
            for (var i = 0; i < hfColl.keys.length; i++) {
                var id = hfColl.keys[i];
                if (headerFooterType === 'EvenHeader' || headerFooterType === 'FirstPageHeader' ||
                    headerFooterType === 'OddHeader') {
                    partName = this.headerPath + id.replace('rId', '') + '.xml';
                    contentType = this.headerContentType;
                }
                else {
                    partName = this.footerPath + id.replace('rId', '') + '.xml';
                    contentType = this.footerContentType;
                }
                this.serializeOverrideContentType(writer, partName, contentType);
            }
        };
        WordExport.prototype.SerializeEFContentTypes = function (writer) {
            this.serializeEFContentType(writer);
        };
        WordExport.prototype.serializeEFContentType = function (writer) {
            var contentType;
            var partName;
            partName = this.endnotesPath;
            contentType = this.endnoteContentType;
            this.serializeOverrideContentType(writer, partName, contentType);
            partName = this.footnotesPath;
            contentType = this.footnoteContentType;
            this.serializeOverrideContentType(writer, partName, contentType);
        };
        WordExport.prototype.serializeOverrideContentType = function (writer, partName, contentType) {
            writer.writeStartElement(undefined, 'Override', undefined);
            writer.writeAttributeString(undefined, 'PartName', undefined, '/' + partName.replace('\\', '/'));
            writer.writeAttributeString(undefined, 'ContentType', undefined, contentType);
            writer.writeEndElement();
        };
        WordExport.prototype.serializeDefaultContentType = function (writer, extension, contentType) {
            writer.writeStartElement(undefined, 'Default', undefined);
            writer.writeAttributeString(undefined, 'Extension', undefined, extension);
            writer.writeAttributeString(undefined, 'ContentType', undefined, contentType);
            writer.writeEndElement();
        };
        WordExport.prototype.resetRelationShipID = function () {
            this.mRelationShipID = 0;
        };
        WordExport.prototype.resetExcelRelationShipId = function () {
            this.eRelationShipId = 0;
        };
        WordExport.prototype.resetChartRelationShipId = function () {
            this.cRelationShipId = 0;
        };
        WordExport.prototype.close = function () {
        };
        return WordExport;
    }());
    exports.WordExport = WordExport;
});
