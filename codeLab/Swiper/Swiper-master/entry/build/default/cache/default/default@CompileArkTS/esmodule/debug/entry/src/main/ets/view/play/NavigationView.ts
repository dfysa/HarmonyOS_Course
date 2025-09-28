if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NavigationView_Params {
}
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
export class NavigationView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NavigationView_Params) {
    }
    updateStateVars(params: NavigationView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: CommonConstants.SPACE_NAVIGATION });
            Row.position({ x: CommonConstants.LEFT_POSITION, y: CommonConstants.START_POSITION });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777248, "type": 20000, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Image.width(CommonConstants.WIDTH_BACK_ICON);
            Image.height(CommonConstants.HEIGHT_BACK_ICON);
            Image.objectFit(ImageFit.Contain);
            Image.onClick(() => {
                this.getUIContext().getRouter().back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Text.fontSize(CommonConstants.FONT_SIZE_TITLE);
            Text.fontWeight(CommonConstants.FONT_WEIGHT_BOLD);
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.margin(CommonConstants.MARGIN_PLAY_PAGE);
            Text.lineHeight(CommonConstants.LINE_HEIGHT_NAVIGATION);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
