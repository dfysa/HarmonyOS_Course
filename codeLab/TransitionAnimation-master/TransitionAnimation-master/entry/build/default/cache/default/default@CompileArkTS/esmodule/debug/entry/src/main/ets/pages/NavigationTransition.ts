if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NavigationTransition_Params {
}
export class NavigationTransition extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NavigationTransition_Params) {
    }
    updateStateVars(params: NavigationTransition_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => { }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/NavigationTransition" });
            NavDestination.backgroundImage({ "id": 16777239, "type": 20000, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
            NavDestination.backgroundImageSize(ImageSize.Cover);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
