if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Banner_Params {
    index?: number;
    imageArray?: Array<PictureItem>;
    swiperController?: SwiperController;
    dotIndicator?: DotIndicator;
}
import type { PictureItem } from '../../viewmodel/PictureItem';
import { PictureType } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/PictureConstants";
import { initializePictures, startPlay, stopPlay } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/PictureViewModel";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
/**
 * text style.
 *
 * @param fontSize Font size.
 * @param fontWeight Font weight.
 */
function __Text__textStyle(fontSize: number, fontWeight: number): void {
    Text.fontSize(fontSize);
    Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
    Text.fontWeight(fontWeight);
}
export class Banner extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.imageArray = [];
        this.swiperController = new SwiperController();
        this.dotIndicator = new DotIndicator();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Banner_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.imageArray !== undefined) {
            this.imageArray = params.imageArray;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.dotIndicator !== undefined) {
            this.dotIndicator = params.dotIndicator;
        }
    }
    updateStateVars(params: Banner_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // Change the index value through a scheduled task to perform a round robin.
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private imageArray: Array<PictureItem>;
    private swiperController: SwiperController;
    private dotIndicator: DotIndicator;
    aboutToAppear() {
        this.dotIndicator.selectedColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
        // Data Initialization.
        this.imageArray = initializePictures(PictureType.BANNER);
        // Turn on scheduled task.
        startPlay(this.swiperController);
    }
    aboutToDisappear() {
        stopPlay();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.swiperController);
            Swiper.width(CommonConstants.PAGE_WIDTH);
            Swiper.height(CommonConstants.HEIGHT_BANNER);
            Swiper.index(this.index);
            Swiper.indicator(this.dotIndicator);
            Swiper.duration(CommonConstants.DURATION_ADS);
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.TopStart });
                    Stack.height(CommonConstants.FULL_HEIGHT);
                    Stack.width(CommonConstants.FULL_WIDTH);
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.image);
                    Image.objectFit(ImageFit.Fill);
                    Image.height(CommonConstants.FULL_HEIGHT);
                    Image.width(CommonConstants.FULL_WIDTH);
                    Image.borderRadius(CommonConstants.BORDER_RADIUS);
                    Image.align(Alignment.Center);
                    Image.onClick(() => {
                        this.getUIContext().getRouter().pushUrl({ url: CommonConstants.PLAY_PAGE });
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.height(CommonConstants.HEIGHT_CAROUSEL_TITLE);
                    Column.margin({ top: CommonConstants.TOP_ADS, left: CommonConstants.ADS_LEFT });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
                    __Text__textStyle(CommonConstants.FONT_SIZE_DESCRIPTION, CommonConstants.FONT_WEIGHT_LIGHT);
                    Text.opacity({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
                    Text.margin({ bottom: CommonConstants.BOTTOM_TEXT });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.name);
                    __Text__textStyle(CommonConstants.FONT_SIZE_TITLE, CommonConstants.FONT_WEIGHT_BOLD);
                }, Text);
                Text.pop();
                Column.pop();
                Stack.pop();
            };
            this.forEachUpdateFunction(elmtId, this.imageArray, forEachItemGenFunction, (item: PictureItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
