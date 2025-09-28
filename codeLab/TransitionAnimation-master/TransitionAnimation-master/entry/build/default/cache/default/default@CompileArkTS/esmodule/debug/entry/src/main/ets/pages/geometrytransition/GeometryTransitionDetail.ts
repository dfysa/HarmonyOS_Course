if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GeometryTransitionDetail_Params {
    navPageInfos?: NavPathStack;
}
import { GEOMETRY_TRANSITION_ID } from "@bundle:com.huawei.transitionanimation/entry/ets/constants/CommonConstants";
import { getResourceString } from "@bundle:com.huawei.transitionanimation/entry/ets/utils/commonUtil";
export class GeometryTransitionDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPageInfos = this.initializeConsume("navPageInfos", "navPageInfos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GeometryTransitionDetail_Params) {
    }
    updateStateVars(params: GeometryTransitionDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __navPageInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get navPageInfos() {
        return this.__navPageInfos.get();
    }
    set navPageInfos(newValue: NavPathStack) {
        this.__navPageInfos.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777239, "type": 20000, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
                    Image.width('100%');
                    Image.height('60%');
                    Image.margin({ top: 12 });
                    Image.geometryTransition(GEOMETRY_TRANSITION_ID);
                }, Image);
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/geometrytransition/GeometryTransitionDetail" });
            NavDestination.transition(TransitionEffect.OPACITY);
            NavDestination.backgroundColor('#F1F3F5');
            NavDestination.title(getResourceString({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" }, this.getUIContext().getHostContext()!));
            NavDestination.onBackPressed(() => {
                this.getUIContext().animateTo({ duration: 600 }, () => {
                    this.navPageInfos.pop(false);
                });
                return true;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
