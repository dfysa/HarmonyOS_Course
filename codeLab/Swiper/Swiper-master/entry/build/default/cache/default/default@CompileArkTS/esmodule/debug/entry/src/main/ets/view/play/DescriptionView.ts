if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DescriptionView_Params {
}
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
/**
 * text style.
 * @param fontSize Font size.
 * @param fonWeight Font weight.
 */
function __Text__textStyle(fontSize: number, fonWeight: number): void {
    Text.fontSize(fontSize);
    Text.fontWeight(fonWeight);
    Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
    Text.textAlign(TextAlign.Center);
    Text.margin(CommonConstants.MARGIN_PLAY_PAGE);
}
export class DescriptionView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DescriptionView_Params) {
    }
    updateStateVars(params: DescriptionView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(CommonConstants.HEIGHT_DESCRIPTION);
            Column.width(CommonConstants.WIDTH_PLAY);
            Column.alignItems(HorizontalAlign.Start);
            Column.offset({ y: CommonConstants.OFFSET_DESCRIPTION_Y });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            __Text__textStyle(CommonConstants.FONT_SIZE_SORT_TITLE, CommonConstants.FONT_WEIGHT_NORMAL);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
            __Text__textStyle(CommonConstants.FONT_SIZE_PHOTO_NAME, CommonConstants.FONT_WEIGHT_LIGHT);
            Text.opacity({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.swiperarkts", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
