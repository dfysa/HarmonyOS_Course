if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CustomNavigationTransition_Params {
    translateY?: string;
    navDestinationId?: string;
}
import { CustomTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/utils/CustomNavigationUtil";
export class CustomNavigationTransition extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__translateY = new ObservedPropertySimplePU('0', this, "translateY");
        this.navDestinationId = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomNavigationTransition_Params) {
        if (params.translateY !== undefined) {
            this.translateY = params.translateY;
        }
        if (params.navDestinationId !== undefined) {
            this.navDestinationId = params.navDestinationId;
        }
    }
    updateStateVars(params: CustomNavigationTransition_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__translateY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__translateY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __translateY: ObservedPropertySimplePU<string>;
    get translateY() {
        return this.__translateY.get();
    }
    set translateY(newValue: string) {
        this.__translateY.set(newValue);
    }
    private navDestinationId: string;
    enterAnimation(transitionProxy: NavigationTransitionProxy) {
        this.translateY = '100%';
        this.getUIContext().animateTo({
            duration: 600,
            onFinish: () => {
                transitionProxy.finishTransition();
            }
        }, () => {
            this.translateY = '0';
        });
    }
    exitAnimation(transitionProxy: NavigationTransitionProxy) {
        this.getUIContext().animateTo({
            duration: 600,
            onFinish: () => {
                transitionProxy.finishTransition();
            }
        }, () => {
            this.translateY = '100%';
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => { }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/CustomNavigationTransition" });
            NavDestination.backgroundImage({ "id": 16777239, "type": 20000, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
            NavDestination.backgroundImageSize(ImageSize.Cover);
            NavDestination.translate({ y: this.translateY });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.navDestinationId = context.navDestinationId!;
                // Register a custom transition animation object
                CustomTransition.getInstance().registerNavParam(this.navDestinationId, 2000, (transitionProxy: NavigationTransitionProxy) => {
                    // Check the current navigation operation type
                    if (CustomTransition.getInstance().operation === NavigationOperation.PUSH) {
                        // Execute the enter animation for the PUSH operation
                        this.enterAnimation(transitionProxy);
                    }
                    else if (CustomTransition.getInstance().operation === NavigationOperation.POP) {
                        // Execute the exit animation for the POP operation
                        this.exitAnimation(transitionProxy);
                    }
                });
            });
            NavDestination.onDisAppear(() => {
                CustomTransition.getInstance().unRegisterNavParam(this.navDestinationId);
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
