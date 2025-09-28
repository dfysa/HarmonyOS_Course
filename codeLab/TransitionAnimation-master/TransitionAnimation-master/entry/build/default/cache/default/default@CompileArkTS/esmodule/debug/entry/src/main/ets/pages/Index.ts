if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    navPageInfos?: NavPathStack;
}
import { ROUTES } from "@bundle:com.huawei.transitionanimation/entry/ets/constants/CommonConstants";
import type { Route } from "@bundle:com.huawei.transitionanimation/entry/ets/constants/CommonConstants";
import { CustomNavigationTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/CustomNavigationTransition";
import { ComponentTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/ComponentTransition";
import { NavigationTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/NavigationTransition";
import { LongTakeTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/longtaketransition/LongTakeTransition";
import { GeometryTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/geometrytransition/GeometryTransition";
import { GeometryTransitionDetail } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/geometrytransition/GeometryTransitionDetail";
import { CustomTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/utils/CustomNavigationUtil";
import type { AnimateCallback } from "@bundle:com.huawei.transitionanimation/entry/ets/utils/CustomNavigationUtil";
import { ModalTransition } from "@bundle:com.huawei.transitionanimation/entry/ets/pages/ModalTransition";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__navPageInfos = new ObservedPropertyObjectPU(new NavPathStack(), this, "navPageInfos");
        this.addProvidedVar("navPageInfos", this.__navPageInfos, false);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.navPageInfos !== undefined) {
            this.navPageInfos = params.navPageInfos;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__navPageInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__navPageInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __navPageInfos: ObservedPropertyObjectPU<NavPathStack>;
    get navPageInfos() {
        return this.__navPageInfos.get();
    }
    set navPageInfos(newValue: NavPathStack) {
        this.__navPageInfos.set(newValue);
    }
    go(route: Route) {
        if (!route.to) {
            return;
        }
        this.navPageInfos.pushPath({
            name: route.to,
            param: route.title
        });
    }
    navPageMap(name: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'NavigationTransition') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new NavigationTransition(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 44, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "NavigationTransition" });
                    }
                });
            }
            else if (name === 'CustomNavigationTransition') {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CustomNavigationTransition(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 46, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "CustomNavigationTransition" });
                    }
                });
            }
            else if (name === 'ComponentTransition') {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ComponentTransition(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 48, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ComponentTransition" });
                    }
                });
            }
            else if (name === 'GeometryTransition') {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GeometryTransition(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 50, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "GeometryTransition" });
                    }
                });
            }
            else if (name === 'GeometryTransitionDetail') {
                this.ifElseBranchUpdateFunction(4, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GeometryTransitionDetail(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 52, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "GeometryTransitionDetail" });
                    }
                });
            }
            else if (name === 'LongTakeTransition') {
                this.ifElseBranchUpdateFunction(5, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LongTakeTransition(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 54, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LongTakeTransition" });
                    }
                });
            }
            else if (name === 'ModalTransition') {
                this.ifElseBranchUpdateFunction(6, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ModalTransition(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 56, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ModalTransition" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(7, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.navPageInfos, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.hideToolBar(true);
            Navigation.mode(NavigationMode.Stack);
            Navigation.navDestination({ builder: this.navPageMap.bind(this) });
            Navigation.backgroundColor('#F1F3F5');
            Navigation.customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
                // Retrieve animation object for the source (from) and destination (to) navigation views
                const fromParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(from.navDestinationId || '');
                const toParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(to.navDestinationId || '');
                CustomTransition.getInstance().operation = operation;
                if (!fromParam.animation && !toParam.animation) {
                    return undefined;
                }
                // Implement the NavigationAnimatedTransition protocol
                const customAnimation: NavigationAnimatedTransition = {
                    timeout: 1000,
                    transition: (transitionProxy: NavigationTransitionProxy) => {
                        fromParam.animation && fromParam.animation(transitionProxy);
                        toParam.animation && toParam.animation(transitionProxy);
                    }
                };
                return customAnimation;
            });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({
                top: 56,
                bottom: 16,
                left: 16,
                right: 16
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.huawei.transitionanimation", "moduleName": "entry" });
            Text.fontSize(30);
            Text.lineHeight(40);
            Text.fontWeight(700);
            Text.margin({
                top: 8,
                bottom: 8
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const route = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(route.title);
                    Button.width('100%');
                    Button.margin({ top: 12 });
                    Button.onClick(() => {
                        this.go(route);
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, ROUTES, forEachItemGenFunction, (route: Route) => route.to, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huawei.transitionanimation", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
