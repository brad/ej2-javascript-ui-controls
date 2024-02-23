define(["require", "exports", "../format/index", "../list/list", "../list/abstract-list", "../list/list-level", "@syncfusion/ej2-base"], function (require, exports, index_1, list_1, abstract_list_1, list_level_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ListViewModel = (function () {
        function ListViewModel() {
            this.listIn = undefined;
            this.levelNumberIn = undefined;
            this.dialog = undefined;
            this.levelNumber = 0;
        }
        Object.defineProperty(ListViewModel.prototype, "levelNumber", {
            get: function () {
                return this.levelNumberIn;
            },
            set: function (value) {
                this.levelNumberIn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListViewModel.prototype, "list", {
            get: function () {
                return this.listIn;
            },
            set: function (value) {
                if (ej2_base_1.isNullOrUndefined(value)) {
                    this.createList();
                }
                else {
                    this.listIn = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListViewModel.prototype, "listLevel", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.list) && this.levelNumber >= 0 && this.levelNumber < 9) {
                    if (!ej2_base_1.isNullOrUndefined(this.dialog.documentHelper.getAbstractListById(this.list.abstractListId))) {
                        if (this.dialog.documentHelper.getAbstractListById(this.list.abstractListId).levels.length <= this.levelNumber) {
                            this.dialog.documentHelper.layout.addListLevels(this.list.abstractList);
                        }
                        return this.dialog.documentHelper.getAbstractListById(this.list.abstractListId).levels[this.levelNumber];
                    }
                    else {
                        this.dialog.documentHelper.lists.push(this.list);
                        var abstractList = this.list.abstractList;
                        if (!this.list.abstractList) {
                            abstractList = new abstract_list_1.WAbstractList();
                            abstractList.abstractListId = this.list.abstractListId;
                        }
                        this.dialog.documentHelper.abstractLists.push(abstractList);
                        abstractList = this.dialog.documentHelper.getAbstractListById(this.list.abstractListId);
                        if (abstractList.levels.length <= this.levelNumber) {
                            this.dialog.documentHelper.layout.addListLevels(this.list.abstractList);
                        }
                        return abstractList.levels[this.levelNumber];
                    }
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListViewModel.prototype, "listLevelPattern", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.listLevel)) {
                    return this.listLevel.listLevelPattern;
                }
                return 'Arabic';
            },
            set: function (value) {
                if (!ej2_base_1.isNullOrUndefined(this.listLevel)) {
                    this.listLevel.listLevelPattern = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListViewModel.prototype, "followCharacter", {
            get: function () {
                if (!ej2_base_1.isNullOrUndefined(this.listLevel)) {
                    return this.listLevel.followCharacter;
                }
                return 'None';
            },
            set: function (value) {
                if (!ej2_base_1.isNullOrUndefined(this.listLevel)) {
                    this.listLevel.followCharacter = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        ListViewModel.prototype.createList = function () {
            this.list = new list_1.WList();
            this.list.listId = this.dialog.documentHelper.lists.length + 1;
            var abstractList = new abstract_list_1.WAbstractList();
            abstractList.abstractListId = this.dialog.documentHelper.abstractLists.length + 1;
            this.list.abstractListId = abstractList.abstractListId;
            this.list.abstractList = abstractList;
            this.dialog.documentHelper.lists.push(this.list);
            var listLevel = new list_level_1.WListLevel(abstractList);
            listLevel.paragraphFormat = new index_1.WParagraphFormat(listLevel);
            listLevel.paragraphFormat.leftIndent = 48;
            listLevel.paragraphFormat.firstLineIndent = -24;
            listLevel.characterFormat = new index_1.WCharacterFormat(listLevel);
            listLevel.numberFormat = '%1.';
            listLevel.startAt = 1;
            abstractList.levels.push(listLevel);
            this.dialog.documentHelper.abstractLists.push(abstractList);
        };
        ListViewModel.prototype.addListLevels = function () {
            if (!ej2_base_1.isNullOrUndefined(this.list) && !ej2_base_1.isNullOrUndefined(this.list.abstractListId)) {
                for (var i = this.dialog.documentHelper.getAbstractListById(this.list.abstractListId).levels.length; i < 9; i++) {
                    var listLevelAdv = new list_level_1.WListLevel(this.dialog.documentHelper.getAbstractListById(this.list.abstractListId));
                    listLevelAdv.characterFormat = new index_1.WCharacterFormat(listLevelAdv);
                    listLevelAdv.paragraphFormat = new index_1.WParagraphFormat(listLevelAdv);
                    listLevelAdv.paragraphFormat.leftIndent = (i + 1) * 48;
                    listLevelAdv.paragraphFormat.firstLineIndent = -24;
                    listLevelAdv.numberFormat = '%' + (i + 1).toString() + '.';
                    listLevelAdv.listLevelPattern = 'Arabic';
                    listLevelAdv.followCharacter = 'Tab';
                    listLevelAdv.startAt = 1;
                    listLevelAdv.restartLevel = i;
                    (this.dialog.documentHelper).getAbstractListById(this.list.abstractListId).levels.push(listLevelAdv);
                }
            }
        };
        ListViewModel.prototype.destroy = function () {
            if (this.dialog && this.listIn) {
                this.dialog.documentHelper.layout.clearInvalidList(this.listIn);
            }
            this.listIn = undefined;
            this.levelNumberIn = undefined;
            this.listLevelPattern = undefined;
        };
        return ListViewModel;
    }());
    exports.ListViewModel = ListViewModel;
});
