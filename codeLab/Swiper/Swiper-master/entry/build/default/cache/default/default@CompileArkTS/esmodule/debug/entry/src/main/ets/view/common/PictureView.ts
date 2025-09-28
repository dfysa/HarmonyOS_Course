if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PictureView_Params {
    photos?: PictureItem;
}
import { PictureItem } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/PictureItem";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
export class PictureView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.photos = new PictureItem();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PictureView_Params) {
        if (params.photos !== undefined) {
            this.photos = params.photos;
        }
    }
    updateStateVars(params: PictureView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private photos: PictureItem;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(CommonConstants.FULL_HEIGHT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.photos.image);
            Image.borderRadius(CommonConstants.BORDER_RADIUS);
            Image.height(CommonConstants.WIDTH_PICTURE);
            Image.onClick(() => {
                this.getUIContext().getRouter().pushUrl({ url: CommonConstants.PLAY_PAGE });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.photos.name);
            Text.width(CommonConstants.PAGE_WIDTH);
            Text.fontSize(CommonConstants.FONT_SIZE_PHOTO_NAME);
            Text.fontWeight(CommonConstants.FONT_WEIGHT_NORMAL);
            Text.margin({ top: CommonConstants.TOP_NAME });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.photos.description);
            Text.width(CommonConstants.PAGE_WIDTH);
            Text.fontSize(CommonConstants.FONT_SIZE_DESCRIPTION);
            Text.fontWeight(CommonConstants.FONT_WEIGHT_LIGHT);
            Text.opacity({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Text.margin({ top: CommonConstants.TOP_DESCRIPTION, bottom: CommonConstants.BOTTOM_TEXT });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
