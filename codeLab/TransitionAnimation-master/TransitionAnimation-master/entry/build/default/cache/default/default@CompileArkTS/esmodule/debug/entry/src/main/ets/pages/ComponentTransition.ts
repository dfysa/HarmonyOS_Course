if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ComponentTransition_Params {
    isShow?: boolean;
    appearEffect?;
    disappearEffect?;
}
import { getResourceString } from "@bundle:com.huawei.transitionanimation/entry/ets/utils/commonUtil";
export class ComponentTransition extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isShow = new ObservedPropertySimplePU(false, this, "isShow");
        this.appearEffect = TransitionEffect.scale({ x: 0, y: 0 }).combine(TransitionEffect.OPACITY);
        this.disappearEffect = TransitionEffect.rotate({ x: 0, y: 1, z: 0, angle: 360 }).combine(TransitionEffect.OPACITY);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ComponentTransition_Params) {
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.appearEffect !== undefined) {
            this.appearEffect = params.appearEffect;
        }
        if (params.disappearEffect !== undefined) {
            this.disappearEffect = params.disappearEffect;
        }
    }
    updateStateVars(params: ComponentTransition_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isShow: ObservedPropertySimplePU<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private appearEffect;
    private disappearEffect;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding(16);
                    Column.height('100%');
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isShow) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
                                __Image__TransitionEleStyles();
                                Image.transition(TransitionEffect.asymmetric(this.appearEffect, this.disappearEffect));
                            }, Image);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
                    __Image__TransitionEleStyles();
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel({ "id": 16777219, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
                    Button.width('100%');
                    Button.onClick(() => {
                        this.getUIContext().animateTo({ duration: 600 }, () => {
                            this.isShow = !this.isShow;
                        });
                    });
                }, Button);
                Button.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ComponentTransition" });
            NavDestination.title(getResourceString({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" }, this.getUIContext().getHostContext()!));
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __Image__TransitionEleStyles(): void {
    Image.objectFit(ImageFit.Fill);
    Image.borderRadius(20);
    Image.margin({ bottom: 20 });
    Image.height(120);
    Image.width('100%');
}
