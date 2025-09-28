if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PictureSort_Params {
    photos?: Array<PictureItem>;
    sortName?: Resource;
    initType?: string;
}
import type { PictureItem } from '../../viewmodel/PictureItem';
import { initializePictures } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/PictureViewModel";
import { PictureView } from "@bundle:com.example.swiperarkts/entry/ets/view/common/PictureView";
import { PictureType } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/PictureConstants";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
/**
 * text style.
 *
 * @param fontSize Font size.
 * @param fontWeight Font weight.
 */
function __Text__textStyle(fontSize: number, fontWeight: number): void {
    Text.fontSize(fontSize);
    Text.fontWeight(fontWeight);
    Text.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
}
export class PictureSort extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__photos = new ObservedPropertyObjectPU([], this, "photos");
        this.__sortName = new ObservedPropertyObjectPU({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" }, this, "sortName");
        this.initType = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PictureSort_Params) {
        if (params.photos !== undefined) {
            this.photos = params.photos;
        }
        if (params.sortName !== undefined) {
            this.sortName = params.sortName;
        }
        if (params.initType !== undefined) {
            this.initType = params.initType;
        }
    }
    updateStateVars(params: PictureSort_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__photos.purgeDependencyOnElmtId(rmElmtId);
        this.__sortName.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__photos.aboutToBeDeleted();
        this.__sortName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __photos: ObservedPropertyObjectPU<Array<PictureItem>>;
    get photos() {
        return this.__photos.get();
    }
    set photos(newValue: Array<PictureItem>) {
        this.__photos.set(newValue);
    }
    private __sortName: ObservedPropertyObjectPU<Resource>;
    get sortName() {
        return this.__sortName.get();
    }
    set sortName(newValue: Resource) {
        this.__sortName.set(newValue);
    }
    private initType: string;
    aboutToAppear() {
        if (PictureType.RECENTLY === this.initType) {
            this.sortName = { "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" };
            this.photos = initializePictures(PictureType.RECENTLY);
        }
        else {
            this.sortName = { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" };
            this.photos = initializePictures(PictureType.PHOTO);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.WIDTH_SORT);
            Row.margin({ top: CommonConstants.MARGIN_TOP_SORT, bottom: CommonConstants.MARGIN_BOTTOM_SORT });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.sortName);
            Text.width(CommonConstants.WIDTH_SORT_NAME);
            __Text__textStyle(CommonConstants.FONT_SIZE_SORT_TITLE, CommonConstants.FONT_WEIGHT_NORMAL);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Text.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
            Text.textAlign(TextAlign.End);
            __Text__textStyle(CommonConstants.FONT_SIZE_PHOTO_NAME, CommonConstants.FONT_WEIGHT_LIGHT);
            Text.lineHeight(CommonConstants.LINE_HEIGHT_MORE);
            Text.opacity({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate(CommonConstants.TWO_COLUMNS);
            Grid.rowsTemplate(CommonConstants.TWO_ROWS);
            Grid.columnsGap(CommonConstants.GAP_COLUMNS);
            Grid.rowsGap(CommonConstants.GAP_COLUMNS);
            Grid.width(CommonConstants.PAGE_WIDTH);
            Grid.height(CommonConstants.HEIGHT_GRID);
            Grid.margin({ bottom: CommonConstants.MARGIN_BOTTOM_GRID });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new PictureView(this, { photos: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/all/PictureSort.ets", line: 73, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            photos: item
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "PictureView" });
                        }
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.photos, forEachItemGenFunction, (item: PictureItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
