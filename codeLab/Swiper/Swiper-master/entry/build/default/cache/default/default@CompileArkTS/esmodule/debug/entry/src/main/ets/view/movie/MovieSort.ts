if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MovieSort_Params {
    photos?: Array<PictureItem>;
}
import type { PictureItem } from '../../viewmodel/PictureItem';
import { initializePictures } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/PictureViewModel";
import { PictureType } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/PictureConstants";
import { PictureView } from "@bundle:com.example.swiperarkts/entry/ets/view/common/PictureView";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
export class MovieSort extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__photos = new ObservedPropertyObjectPU(initializePictures(PictureType.LATEST), this, "photos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MovieSort_Params) {
        if (params.photos !== undefined) {
            this.photos = params.photos;
        }
    }
    updateStateVars(params: MovieSort_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__photos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__photos.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Text.width(CommonConstants.WIDTH_SORT);
            Text.margin({ top: CommonConstants.MARGIN_TOP_SORT, bottom: CommonConstants.MARGIN_BOTTOM_SORT });
            Text.fontSize(CommonConstants.FONT_SIZE_SORT_TITLE);
            Text.fontWeight(CommonConstants.FONT_WEIGHT_NORMAL);
            Text.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate(CommonConstants.THREE_COLUMNS);
            Grid.rowsTemplate(CommonConstants.THREE_ROWS);
            Grid.columnsGap(CommonConstants.GAP_COLUMNS);
            Grid.rowsGap(CommonConstants.GAP_COLUMNS);
            Grid.width(CommonConstants.PAGE_WIDTH);
            Grid.height(CommonConstants.WIDTH_MOVIE_SORT);
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
                                    let componentCall = new PictureView(this, { photos: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/movie/MovieSort.ets", line: 41, col: 13 });
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
