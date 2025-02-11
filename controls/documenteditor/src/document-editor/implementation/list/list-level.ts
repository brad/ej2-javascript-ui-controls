import { Dictionary } from '../../base/dictionary';
import { ListLevelPattern, FollowCharacterType } from '../../base/types';
import { WUniqueFormat } from '../../base/unique-format';
import { WUniqueFormats } from '../../base/unique-formats';
import { WCharacterFormat } from '../format/character-format';
import { WParagraphFormat } from '../format/paragraph-format';
import { WAbstractList } from './abstract-list';
import { WLevelOverride } from './level-override';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * @private
 */
export class WListLevel {
    public static dotBullet: string = String.fromCharCode(61623);
    public static squareBullet: string = String.fromCharCode(61607); //Symbol font \u25aa.
    public static arrowBullet: string = String.fromCharCode(10148);
    public static circleBullet: string = String.fromCharCode(61551) + String.fromCharCode(32);

    private uniqueListLevel: WUniqueFormat = undefined;
    private static uniqueListLevels: WUniqueFormats = new WUniqueFormats();
    private static uniqueFormatType: number = 9;

    public paragraphFormat: WParagraphFormat = undefined;
    public characterFormat: WCharacterFormat = undefined;
    public ownerBase: WAbstractList | WLevelOverride;
    public get listLevelPattern(): ListLevelPattern {
        return this.getPropertyValue('listLevelPattern') as ListLevelPattern;
    }
    public set listLevelPattern(listLevelPattern: ListLevelPattern) {
        this.setPropertyValue('listLevelPattern', listLevelPattern);
    }
    public get followCharacter(): FollowCharacterType {
        return this.getPropertyValue('followCharacter') as FollowCharacterType;
    }
    public set followCharacter(followCharacter: FollowCharacterType) {
        this.setPropertyValue('followCharacter', followCharacter);
    }
    public get startAt(): number {
        return this.getPropertyValue('startAt') as number;
    }
    public set startAt(startAt: number) {
        this.setPropertyValue('startAt', startAt);
    }
    public get numberFormat(): string {
        return this.getPropertyValue('numberFormat') as string;
    }
    public set numberFormat(numberFormat: string) {
        this.setPropertyValue('numberFormat', numberFormat);
    }
    public get restartLevel(): number {
        return this.getPropertyValue('restartLevel') as number;
    }
    public set restartLevel(restartLevel: number) {
        this.setPropertyValue('restartLevel', restartLevel);
    }
    /**
     * Gets the boolean that specifies that the format for the numbering at this level should be in the decimal format.
     */
    public get isLegalStyleNumbering(): boolean {
        return this.getPropertyValue('isLegalStyleNumbering') as boolean;
    }
    /**
     * Sets the boolean that specifies that the format for the numbering at this level should be in the decimal format.
     */
    public set isLegalStyleNumbering(isLegalStyleNumbering: boolean) {
        this.setPropertyValue('isLegalStyleNumbering', isLegalStyleNumbering);
    }

    public constructor(node: WAbstractList | WLevelOverride) {
        if (node instanceof WAbstractList) {
            this.ownerBase = node as WAbstractList;
        } else {
            this.ownerBase = node as WLevelOverride;
        }
        this.characterFormat = new WCharacterFormat(undefined);
        this.paragraphFormat = new WParagraphFormat(undefined);
    }
    /* eslint-disable */
    public getPropertyValue(property: string): Object {
        const propertyType: number = WUniqueFormat.getPropertyType(WListLevel.uniqueFormatType, property);
        if (!isNullOrUndefined(this.uniqueListLevel) && this.uniqueListLevel.propertiesHash.containsKey(propertyType)) {
            return this.uniqueListLevel.propertiesHash.get(propertyType);
        }
        return WListLevel.getPropertyDefaultValue(property);
    }
    public setPropertyValue(property: string, value: Object): void {
        if (isNullOrUndefined(value) || value === '') {
            value = WListLevel.getPropertyDefaultValue(property);
        }
        if (isNullOrUndefined(this.uniqueListLevel)) {
            this.initializeUniqueWListLevel(property, value);
        } else {
            const propertyType: number = WUniqueFormat.getPropertyType(this.uniqueListLevel.uniqueFormatType, property);
            if (this.uniqueListLevel.propertiesHash.containsKey(propertyType) &&
                this.uniqueListLevel.propertiesHash.get(propertyType) === value) {  //Do nothing, since no change in property value and return
                return;
            }
            this.uniqueListLevel = WListLevel.uniqueListLevels.updateUniqueFormat(this.uniqueListLevel, property, value);
        }
    }
    public initializeUniqueWListLevel(property: string, propValue: object): void {
        const uniqueListLevelTemp: Dictionary<number, object> = new Dictionary<number, object>();
        this.addUniqueWListLevel('listLevelPattern', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('startAt', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('followCharacter', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('numberFormat', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('restartLevel', property, propValue, uniqueListLevelTemp);
        this.addUniqueWListLevel('isLegalStyleNumbering', property, propValue, uniqueListLevelTemp);
        this.uniqueListLevel = WListLevel.uniqueListLevels.addUniqueFormat(uniqueListLevelTemp, WListLevel.uniqueFormatType);
    }

    public addUniqueWListLevel(property: string, modifiedProperty: string, propValue: object, uniqueCharFormatTemp: Dictionary<number, object>): void {
        let propertyType: number;
        propertyType = WUniqueFormat.getPropertyType(WListLevel.uniqueFormatType, property);
        if (property === modifiedProperty) {
            uniqueCharFormatTemp.add(propertyType, propValue);
        } else {
            uniqueCharFormatTemp.add(propertyType, WListLevel.getPropertyDefaultValue(property));
        }
    }
    public static getPropertyDefaultValue(property: string): Object {
        /* eslint-disable */
        let value: any = undefined;
        switch (property) {
        case 'listLevelPattern':
            value = 'Arabic';
            break;
        case 'startAt':
            value = 0;
            break;
        case 'followCharacter':
            value = 'Tab';
            break;
        case 'numberFormat':
            value = '';
            break;
        case 'restartLevel':
            value = 0;
            break;
        case 'isLegalStyleNumbering':
            value = false;
            break;
        }
        return value;
        /* eslint-enable */
    }
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    public destroy(): void {
        if (!isNullOrUndefined(this.uniqueListLevel)) {
            WListLevel.uniqueListLevels.remove(this.uniqueListLevel);
        }
        this.uniqueListLevel = undefined;
        if (!isNullOrUndefined(this.characterFormat)) {
            this.characterFormat.destroy();
            this.characterFormat = undefined;
        }
        if (!isNullOrUndefined(this.paragraphFormat)) {
            this.paragraphFormat.destroy();
            this.paragraphFormat = undefined;
        }
    }
    /**
     * @private
     */
    public clearFormat(): void {
        if (!isNullOrUndefined(this.uniqueListLevel)) {
            WListLevel.uniqueListLevels.remove(this.uniqueListLevel);
        }
        this.uniqueListLevel = undefined;
        if (this.characterFormat) {
            this.characterFormat.clearFormat();
        }
        this.characterFormat = undefined;
        if (this.paragraphFormat) {
            this.paragraphFormat.clearFormat();
        }
        this.paragraphFormat = undefined;
    }
    public static clear(): void {
        this.uniqueListLevels.clear();
    }
    public clone(node: WAbstractList | WLevelOverride): WListLevel {
        const listLevel: WListLevel = new WListLevel(node);
        listLevel.paragraphFormat = this.paragraphFormat.cloneFormat();
        listLevel.characterFormat = this.characterFormat.cloneFormat();
        if (this.uniqueListLevel) {
            listLevel.uniqueListLevel = this.uniqueListLevel;
            listLevel.uniqueListLevel.referenceCount++;
        }
        return listLevel;
    }
}
