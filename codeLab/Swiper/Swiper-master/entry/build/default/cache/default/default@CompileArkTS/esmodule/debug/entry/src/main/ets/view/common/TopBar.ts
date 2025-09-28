if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TopBar_Params {
    index?: number;
    tabArray?: Array<TopBarItem>;
}
import type { TopBarItem } from '../../viewmodel/TopBarItem';
import { initializeOnStartup } from "@bundle:com.example.swiperarkts/entry/ets/viewmodel/TopBarViewModel";
import { CommonConstants } from "@bundle:com.example.swiperarkts/entry/ets/common/constants/CommonConstant";
export class TopBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__index = new SynchedPropertySimpleTwoWayPU(params.index, this, "index");
        this.tabArray = initializeOnStartup();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TopBar_Params) {
        if (params.tabArray !== undefined) {
            this.tabArray = params.tabArray;
        }
    }
    updateStateVars(params: TopBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // Double binding of index values to achieve linkage effect.
    private __index: SynchedPropertySimpleTwoWayPU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private tabArray: Array<TopBarItem>;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: CommonConstants.SPACE_TOP_BAR });
            Row.margin({ left: CommonConstants.ADS_LEFT });
            Row.width(CommonConstants.FULL_WIDTH);
            Row.height(CommonConstants.TOP_BAR_HEIGHT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.name);
                    Text.fontSize(this.index === item.id ? CommonConstants.FONT_SIZE_CHECKED : CommonConstants.FONT_SIZE_UNCHECKED);
                    Text.fontColor(Color.Black);
                    Text.textAlign(TextAlign.Center);
                    Text.fontWeight(this.index === item.id ? FontWeight.Bold : FontWeight.Regular);
                    Text.onClick(() => {
                        this.index = item.id;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabArray, forEachItemGenFunction, (item: TopBarItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
